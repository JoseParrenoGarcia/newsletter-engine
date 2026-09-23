# Context-mode: what it actually buys your context window

*A mechanics-first look at what context-mode's sandboxed context savings do and don't change: the context window, the token bill, and why they aren't the same thing.*

As part of my investigations into reducing token usage in agentic coding workflows, I came across context-mode. I had already written about what RTK, Ponytail and Caveman help with, so I initially assumed context-mode was another tool for shrinking or rewriting what an agent sees. Its headline claim—"98% context reduction"—made it worth investigating, but the number alone did not tell me what was actually being reduced.

What I found is a genuinely different kind of tool than the ones I'd already covered. RTK compresses shell output. Ponytail changes what code gets written. Caveman shortens prose. Context-mode does none of those things. It runs a sandboxed process, keeps the raw output local, and returns a small result to the conversation — while the full data stays queryable in a local database. That is a real architectural idea, and the project's own benchmark numbers for it are plausible.

In this post, I want to understand that architecture before judging the headline. How does context-mode move data outside the main context window? What does the sandbox actually do? When is it better to compute a compact answer, and when should the agent retrieve the original material? Most importantly, where does context-mode genuinely help, and where does the claim become weaker than the number suggests? I will work through the mechanism, the evidence and a small test on a real file in this repository.

## What will we cover in this post?

- **What problem is context-mode trying to solve?** A concrete look at how large browser snapshots, logs and documents consume an agent's context window even when the task needs only a small answer.
- **What does context-mode claim to do for the context window?** The distinction between tool definitions, tool results, assistant output and session state.
- **How does context-mode handle the raw data?** The hooks, local process, SQLite index and the boundary between output isolation and security sandboxing.
- **Which context-mode tools help manage the context window?** The difference between computing a compact answer and retrieving an exact fragment later.
- **Why isn't a smaller context window the same as a smaller bill?** Why context usage, prompt caching and token pricing must be measured separately.
- **Where does context-mode actually earn its place?** The large-input workloads where the project's benchmark supports the mechanism.
- **What happens when you test the mechanism on a real file?** A self-run comparison of raw reading, compact computation and targeted retrieval.
- **Where does context-mode fall short?** The small-input, exact-content and external-MCP cases where the trade-off becomes less attractive.
- **What breaks, and how do you catch it?** Wrong extraction questions, retrieval misses, hook overhead and local execution risks.
- **How should you decide when to reach for context-mode?** A task-based adoption framework rather than a blanket yes or no.

## What problem is context-mode trying to solve?

Context-mode addresses a specific context-window problem: a tool can produce far more data than the agent needs to answer the question. The tool may return a 56 KB browser snapshot, while the agent only needs to know whether a particular button exists.

Without any filtering, the whole result enters the main conversation:

```text
Browser snapshot ──► 56 KB of raw output ──► agent context
```

The snapshot is not necessarily bad data. Most of it is just irrelevant to the question at hand. It occupies working memory, competes with the instructions and files the agent does need, and remains part of the conversation until the platform removes or summarises it.

Context-mode changes the route that data takes:

```text
Raw input ──► local computation or index ──► answer / exact fragment ──► agent context
                  (raw data stays local)
```

That is the basic promise. Context-mode does not make the browser snapshot smaller at its source. It processes the snapshot outside the main conversation and returns only the result that the analysis script or search query produces.

The trade-off is just as important as the saving. The agent sees less because some information has been left out. If the script asks the wrong question, the missing detail may not appear in the result at all. Context-mode therefore exchanges raw visibility for a smaller working set and on-demand retrieval.

## What does context-mode claim to do for the context window?

Context-mode's primary claim is that it keeps bulky tool results out of the agent's main context by processing them locally and returning a compact result. It is not a larger context window, and it is not a guarantee of a smaller token bill.

This places it alongside several related tools, but they operate at different points in the system:

| Layer | What it manages | Example |
|---|---|---|
| Tool definitions | What the agent needs to know before calling a tool | Cloudflare Code Mode |
| Tool results | What enters context after a tool runs | RTK and context-mode |
| Assistant output | What the model writes back to the user | Ponytail / Caveman |
| Session state | What remains available after compaction | Context-mode's session layer |

The distinction matters because “input” and “output” can mean different things here. RTK filters command output. Code Mode reduces the size of the tool surface the model has to understand. Context-mode mainly handles the result side by moving analysis or storage outside the main conversation. Cloudflare's [Code Mode](https://blog.cloudflare.com/code-mode/) is therefore a useful contrast, not an equivalent implementation. Context-mode describes this relationship in its [README](https://github.com/mksglu/context-mode) as addressing “the other half of the context problem.”

### How does context-mode handle the raw data?

In the browser example above, the useful result might be ten lines describing the button the agent is looking for. The other 990 lines still matter as source material, but they do not all need to enter the main conversation. Context-mode handles that trade-off in two ways: it can compute over the raw data and return a small answer, or store the raw data and retrieve selected fragments later.

The word “sandbox” makes this sound more mysterious than it is. It is best understood as a separate local execution path between the agent and the main context window:

```text
Agent context ──► context-mode tool ──► local process or SQLite store
      ▲                                      │
      └──────── compact answer / exact chunk ┘
```

The next questions are therefore practical ones. Is this another Claude session? What actually runs there? Who decides what comes back? And how does context-mode get a normal tool call onto this alternative path?

### What is the context-mode sandbox?

The context-mode sandbox is not another Claude session. There is no second model independently reading the browser snapshot and writing a summary. Context-mode is an MCP server that starts a local child process when the agent invokes one of its execution tools.

That child process runs the code supplied by the agent. Depending on the command, it can read a local file, parse JSON or CSV, inspect a log, call a command-line program or fetch data. The process writes its intended result to standard output, or `stdout`. Context-mode captures that output and sends it back to the main conversation.

```text
Main Claude session
        │ asks context-mode to run code
        ▼
Local child process
        │ reads the 1,000-line snapshot
        │ finds the relevant button
        │ prints ten lines or one compact answer
        ▼
Main Claude session receives only that output
```

The process uses the runtimes and commands available on the host. Context-mode can run supported languages and shell commands, but it does not automatically create a fresh Python virtual environment for every request. Whether a package is available depends on the local installation and runtime configuration.

That distinction matters for both reliability and security. The child process separates intermediate data and output from the conversation, but it does not turn the machine into an isolated hostile-code environment. The code still runs locally and may inherit filesystem access, environment variables or network permissions. A repository instruction, poisoned web page or prompt injection could influence what the model writes and executes. Host-level permissions and tool approvals remain the real security boundary.

### What controls the result returned from the sandbox?

Context-mode does not have a second model making a hidden relevance judgement. In the compute path, the agent writes the analysis code, and the code decides what to print. If the script counts errors, only the count needs to reach the main context. If it prints every matching button and its attributes, that larger result comes back instead.

The output contract is deliberately narrow:

```text
raw files + intermediate calculations ──► stay in the local process
script's stdout                         ──► returns to the main context
```

`ctx_execute` runs inline code. `ctx_execute_file` applies code to a local file. `ctx_batch_execute` combines several independent operations. Context-mode captures their `stdout`, while timeouts and output caps prevent an unbounded process or response from filling the conversation again.

This is why the quality of the returned answer depends on the question encoded in the script. A script that prints “button found” may omit the button's selector, parent element or disabled state. A script that prints only a commit count cannot answer a later question about the commit messages. The reduction is real, but it is not free: the agent has chosen which information to preserve.

The retrieval path makes a different trade-off. `ctx_index` stores the source in a local SQLite database. `ctx_search` later uses that index to return matching chunks. `ctx_fetch_and_index` fetches a web page, stores it and makes it searchable. Here, the agent does not need to predict every useful detail in advance, but retrieval quality depends on the search terms, chunking and ranking.

SQLite also supports a separate session feature. The content store keeps source documents available for later retrieval. The session store records decisions, active files, errors and rejected approaches so context-mode can rebuild a compact snapshot around compaction. These features share local persistence, but they solve different problems: one manages bulky source material; the other manages continuity.

### How does context-mode retrieve information later?

The compute path works well when the main agent already knows what it wants to calculate. For example, it can ask for the number of failed tests in a large log and return only that number.

But sometimes the agent does not know which detail it will need yet. A long documentation page may contain an API signature, an example configuration and an explanation of an edge case. Summarising the page upfront could discard the exact detail needed later.

That is where the retrieval path helps.

`ctx_index` stores source content in a local SQLite full-text index. `ctx_fetch_and_index` can fetch a web page, store it and index it in the same step. The raw content remains available locally rather than entering the main conversation all at once.

Later, the main agent calls `ctx_search` with a query such as:

```text
How do I configure the retry policy?
```

Context-mode searches the local index and returns matching chunks. Those chunks—not the entire original document—then enter the main context.

```text
Full document ──► local SQLite index
                         │
                         │ ctx_search("retry policy")
                         ▼
                 relevant chunks ──► main context
```

This is better understood as external local memory than as memory inside Claude. The document is available to the agent, but it is not continuously occupying the agent's context window. The main agent still controls the reasoning: it decides what to index, when to search and how to interpret the returned text. SQLite performs the retrieval; Claude turns the retrieved evidence into an answer.

The trade-off is different from the compute path. A computed summary can be much smaller, but it may permanently omit a detail that the script was not asked to preserve. Retrieval keeps more of the source available, but it depends on the agent asking a useful query and on the search system finding the right chunk. Context-mode uses SQLite FTS5 and BM25-style lexical ranking, so it searches terms and patterns rather than understanding every conceptual synonym.

The two paths therefore answer different questions:

| Need | Better path |
|---|---|
| “How many errors are in this large log?” | Compute with `ctx_execute_file` |
| “What exact API signature does this document use?” | Retrieve with `ctx_index` and `ctx_search` |
| “What will I need from this document later?” | Index it first, then retrieve relevant chunks on demand |

### What is the intercept mechanism that context-mode uses?

The interception mechanism is a host hook, not a `PostToolUse` filter that waits for every result and rewrites it afterwards. In Claude Code, context-mode registers `PreToolUse` hooks. These run before a tool executes, when the eventual size and contents of the result are still unknown.

That timing gives the hook several possible jobs:

- It can deny or redirect known routes, such as WebFetch or shell commands likely to produce large output.
- It can modify a call or add instructions telling the agent to use a context-mode tool instead.
- It can provide periodic guidance for calls that context-mode recognises but cannot safely transform itself.

For example, the hook may redirect a web-fetch request toward `ctx_fetch_and_index`, allowing the page to be stored and searched locally. For an external MCP tool, the hook can advise the agent to pipe the result through context-mode, but it does not automatically rewrite the external server's response after the call returns.

So the complete path is conditional:

```text
Normal tool call
      │
      ▼
PreToolUse hook
      │
      ├── passthrough: normal result enters context
      ├── redirect: context-mode processes the input
      └── guidance: agent may choose context-mode itself
```

This is the boundary behind the later MCP discussion. Context-mode is not a universal proxy sitting after every tool. It is a set of local tools, supported by hooks that try to route suitable calls toward them before bulky output reaches the main context.

### Which context-mode tools help manage the context window?

The six main tools fall into two groups. The first group computes an answer from raw data. The second group preserves the source and retrieves selected parts later.

| Tool | What it does | How it helps the context window |
|---|---|---|
| `ctx_execute` | Runs an inline script and returns its standard output | Lets the agent compute over bulky data without returning all intermediate output |
| `ctx_execute_file` | Runs analysis code against a local file | Suits logs, CSVs, JSON, test output and large text files |
| `ctx_batch_execute` | Runs several independent commands or searches together | Reduces repeated tool calls and duplicated setup |
| `ctx_index` | Stores content in the local SQLite search index | Keeps the full source available without placing it all in context |
| `ctx_search` | Retrieves matching chunks from indexed content | Returns targeted text instead of the entire document |
| `ctx_fetch_and_index` | Fetches, stores and indexes web content | Avoids repeatedly loading a full web page into the conversation |

The central choice is therefore not “use context-mode or do not use context-mode.” It is “should this input be summarised by computation, or preserved for exact retrieval?” A count of errors in a large log is a good compute question. The exact API signature needed for an edit is a retrieval question. A file the agent is about to modify may need to be read directly.

This distinction also tells us how to interpret the project's headline benchmark numbers. Before asking whether “98% context reduction” means a smaller bill, we first need to ask what was reduced, where the raw data went, and whether the returned result still contained the information the task required.

## Why isn't a smaller context window the same as a smaller bill?

Context-mode can genuinely reduce the amount of data entering the main context. It does not automatically reduce every cost associated with the task. Those are separate claims, and the project's “98% context reduction” headline describes the first one rather than proving the second.

Think back to the browser snapshot. Without context-mode, the agent might receive 56 KB of snapshot data in the main conversation. With `ctx_execute_file`, the local process can inspect those 56 KB and return only “the Submit button exists, and it is enabled.” The raw snapshot was not moved into a second Claude context window. It was read by a local process, so those bytes were never converted into model input tokens in the first place.

```text
Without context-mode
56 KB tool result ──► model input ──► main context

With context-mode
56 KB local file ──► local process ──► small result ──► main context
                                      └─ script + result still use some tokens
```

That is a real context-window benefit. The main agent receives less material to reason over, and the raw input does not consume the same model context that it would have consumed if the tool had returned it directly. Context-mode is not merely moving those 56 KB into another Claude conversation. The executor is a local process, not a second model session.

There are still tokens involved. The main agent must describe the task, choose a context-mode tool, generate a script or query, and read the returned result. If the script needs several attempts, those tool calls and responses also enter the conversation. A small result can therefore cost more overall than reading a small file directly. The saving appears when the raw input is large and the compact result answers the question without requiring many recovery calls.

The context window is best understood as the model's working memory: the material counted as part of the conversation available for the current request. More context is not automatically better. Accuracy and recall can degrade as irrelevant material accumulates, a phenomenon Anthropic calls context rot. A smaller working set can therefore improve reasoning even when the invoice remains unchanged. Anthropic's [context-window documentation](https://platform.claude.com/docs/en/build-with-claude/context-windows) describes this distinction between what the model can currently work with and what a request costs.

The bill is governed by a separate mechanism. [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) can make repeated input cheaper, but cached content still occupies the context window. Caching changes the price of those tokens; it does not make them disappear from the model's working memory. The API reports `cache_read_input_tokens`, `cache_creation_input_tokens` and ordinary `input_tokens` separately because these quantities answer different questions.

Context-mode can reduce future input by preventing a large result from entering the conversation at all. That may reduce billed model input, but it is not guaranteed. The tool call itself has an input and output cost, the agent may need follow-up searches, and a hook may inject routing instructions into the prompt. Local execution also does not eliminate costs charged by an external API or command that the script invokes. The honest claim is narrower: context-mode can avoid sending raw tool output to the model. Whether that produces a smaller invoice depends on the complete task.

This is the same discipline I used in the [RTK post](https://substack.com/@joseparreogarcia): the useful metric is cost per successfully completed task at held quality. For context-mode, compare identical tasks with and without the tool and record the full usage data. Look at `cache_read_input_tokens`, `cache_creation_input_tokens`, `input_tokens`, output tokens, tool-call count and recovery calls. Do not infer a billing reduction from a byte counter alone.

The distinction also matters for prompt caching. Anthropic's caching documentation describes exact prefix matching and a limited lookback window. Context-mode's `PreToolUse` hook can add routing guidance before a WebFetch or large Bash command runs. That may change the sequence of blocks the platform sees, even if the raw payload itself never enters the conversation. It does not necessarily break the cache, but it is another reason to measure usage on identical prompts rather than assume that less visible output means a proportionally smaller bill.

## Where does context-mode actually earn its place?

Context-mode earns its place on inputs where an aggregate answer beats raw content — large logs, CSVs, multi-file surveys, and documentation lookups — and the project's own fixture benchmark tests exactly that split. The benchmark handles two tool families differently, and the difference is the entire design logic of the tool. It is also unusually transparent as vendor benchmarks go: it uses captured output from real tools, not synthetic strings, and reports both the raw and post-processing size for every tested scenario — a level of disclosure documented in [BENCHMARK.md](https://raw.githubusercontent.com/mksglu/context-mode/main/BENCHMARK.md).

`ctx_execute_file`, the "compute and summarise" path, is best suited to data where an aggregate answer is more useful than the raw content: a 56.2 KB Playwright page snapshot becomes 299 bytes; a 45.1 KB nginx access log becomes 155 bytes; an 85.5 KB analytics CSV becomes 222 bytes. Across the fourteen scenarios in this category, 315 KB of raw input became 5.5 KB of context — a 98% reduction. `ctx_index` plus `ctx_search`, the "index and retrieve" path, trades some of that reduction for exactness: documentation scenarios land at 44–93% savings, because the point is returning a code block or API signature verbatim, not a description of it.

Two more scenarios from the same benchmark are worth naming because they show how far the pattern generalises: a 58.9 KB pull of GitHub issues collapses to 1,139 bytes (98%), and a 153-commit git log collapses to 107 bytes (99%). In both cases, the aggregate answer — "how many issues are open," "how many commits touched this file" — genuinely is smaller than the raw listing, and genuinely is what most questions about that data are actually asking for.

Both numbers are genuine at the level they were measured — component-level, author-run, on disclosed fixtures. That is a meaningfully higher evidence bar than most tools in this space clear. It is still not the same claim as an end-to-end agent benchmark. The benchmark doesn't show whether an agent using context-mode solved the same tasks a baseline agent solved, whether it needed more follow-up calls to recover a detail the summary dropped, or whether the final invoice was smaller. Read the numbers as "this is what output externalisation does to fourteen real fixtures," not as "this is what adopting context-mode does to your bill."

## Where does context-mode fall short?

The project's own documentation is candid about the first limit: a 0.4 KB network-request fixture in the benchmark shows only 13% savings, because the fixed cost of spawning a subprocess and writing to SQLite doesn't scale down for small payloads. Files an agent is about to edit are a second, structural limit — editing needs the exact byte content, not a compact description of it, so routing a file-you're-about-to-modify through a summariser just adds a round trip.

The most consequential limit is one I didn't expect going in, and it came from testing the vendor's own claim against community scrutiny rather than from the vendor's documentation. A Hacker News commenter, [re5i5tor, on the project's launch thread](https://news.ycombinator.com/item?id=47193064), did the actual work of checking: they called their own Obsidian MCP server directly, and found that the result was not transformed or added to context-mode's FTS5 index, while web-fetch calls in the same session were indexed normally. The maintainer confirmed the boundary in the same thread: context-mode "handles the output side" for built-in tools and CLI wrappers, but for third-party MCP tools with their own capabilities, "the MCP author has to apply context-mode's concepts server-side."

That is a real, sourced boundary, not a hypothetical one. If a meaningful share of your context pressure comes from MCP servers rather than Bash, WebFetch or file reads, context-mode may remind the agent to use it, but it does not currently transform those MCP results automatically.

There's a fourth limit worth naming even though it's more of a design critique than a failure: the retrieval side (`ctx_index` plus `ctx_search`) uses SQLite's FTS5 with BM25 ranking — lexical, keyword-based matching, not semantic search. On the same [launch thread](https://news.ycombinator.com/item?id=47193064), commenter blakec pointed out that pure BM25 underperforms on tool output specifically because it mixes structured data (JSON keys, config, IDs) with natural language (comments, error messages) — keyword matching handles the natural-language half well and struggles with the structured half. A query for "authentication failure" won't reliably surface a source that says "credential rejection." That's a real gap for anyone expecting the search side to behave like a semantic assistant rather than a fast, exact, keyword-driven index.

## What happens when you actually test the mechanism on a real file?

Rather than trust the headline number on faith or reject it on faith, I ran a version of the underlying mechanism against a real file already sitting in this post's own folder: the 57,693-byte research document I used to write this article, containing 8,841 words across 58 headings and 44 tables. I want to be precise about what this test is and isn't. I didn't install the context-mode plugin — this replicates its core idea (compute a summary in a script, return only that) with two lines of Python, on one fixture, in one repo. It is a mechanism check, not a vendor-comparable benchmark.

Reading the raw file straight into context costs 57,693 bytes. A short script that walks the document and returns only its heading structure and table count — the same "compute, don't transcribe" idea behind `ctx_execute_file` — returned a 2,796-byte summary: a 95.2% reduction, landing in the same range as the vendor's own fixture numbers.

Then I checked what that reduction actually cost. The 2,796-byte summary contains zero mentions of a specific fact buried in the source document — a paragraph about a community-reported GitHub issue (issue #960, a hook-overhead complaint). It isn't there, because heading structure was the only thing the script was told to extract. A targeted, grep-style query for that exact fact — the "index and retrieve" pattern rather than "compute and summarise" — returned it precisely, in 1,353 bytes. Same file, same underlying idea, two different questions asked of the same sandbox, two very different outcomes for whether the fact you needed made it back into context.

That's the whole tension in one repeatable test: the aggregate path is dramatically smaller and genuinely useless for a question it wasn't asked to answer; the retrieval path is still small and gets the fact right, but only because I knew which fact to ask for.

## What breaks, and how do you catch it?

Beyond the small-payload overhead and the MCP blind spot already named above, two further failure modes are worth catching before they cost you something in production.

The most concrete community-reported one came from Hacker News commenter [hereme888, on the same launch thread](https://news.ycombinator.com/item?id=47193064): compressing 153 git commits down to a 107-byte result assumes the model wrote the *right* extraction script. If it asks for a commit count when the actual need was specific commit messages, that information isn't wrong — it's gone, and the agent has no signal that anything was dropped unless it thinks to ask again. This is the same shape as the fact I lost in my own heading-only summary above, just with a live git log instead of a static document.

The second is a security consideration rather than a context-quality one, but it belongs on the same list: because `ctx_execute` runs model-generated code in a local child process, anything that can influence what the model writes — a malicious repository file, a poisoned web page, a prompt-injected MCP result — can influence what that script does when it runs. Output isolation limits what comes *back* into the conversation; it doesn't limit what the executed code can *do* on the machine it's running on. That's a reasonable trade-off for a local development tool with sane permissions, and a much less reasonable one if the sandboxing is treated as a security boundary rather than a context-management one.

## How should you decide when to reach for context-mode?

None of this argues against context-mode. It argues against treating "98% context reduction" as a single number that applies uniformly to your workload. A scoped adoption pattern gets you the real benefit without the disappointment:

- Start with `ctx_execute_file` on the input shapes where the fixture benchmark is strongest — large logs, CSVs, build output, and browser snapshots where an aggregate answer genuinely satisfies the question being asked.
- Reach for `ctx_index` plus `ctx_search` when the actual need is documentation, code examples, or anything where an exact snippet matters more than a description of it.
- Keep a raw artefact and a note of what query or script produced the summary, the same audit discipline I'd apply to any lossy transformation — so a wrong extraction is recoverable rather than silently final.
- Don't expect it to transform your MCP-heavy calls automatically. If that's where your context pressure actually lives, measure whether advisory routing changes the agent's behaviour before treating context-mode as the fix.
- Measure your own delta on your own repository before adopting it as a default, the same rule that applied to RTK and to Ponytail/Caveman. A two-line script and a `wc -c` command, as I used above, is a lower bar than it sounds.
- Judge session continuity on its own merits, separately from the sandboxing debate. Preserving decisions and active-file state across a compaction event is a real, distinct problem from context-window bloat — test whether the SQLite snapshot actually survives a real compaction event on a multi-hour session before trusting it, rather than assuming it works because the sandboxing half does. Those separate objections (MCP interception, lexical retrieval) apply to the sandbox tools, not to the session-event store.
- If you adopt the sandbox tools, adopt the audit habit alongside them from day one rather than retrofitting it later: every compact answer should carry a note of the query or script that produced it, so a wrong extraction is a five-minute fix rather than a silent gap discovered during an incident.

None of this requires trusting either the vendor's number or a reflexive dismissal of it. The test I ran on this repo's own research document took about as long to write as this paragraph did to read.

## Closing thoughts

Context-mode does one narrow thing genuinely well: it keeps specific, large, disposable, or queryable outputs out of a model's working context by running them through a sandbox first. That is a real contribution to context-window management, and the project's own fixture numbers hold up at the level they were measured.

What it doesn't do is expand the window itself, guarantee a smaller bill, or reach every source of context pressure in a session. Those are three separate claims that "98% context reduction" makes sound like one. Split them apart, and what's left is a useful, specific tool for a specific class of input — not a universal fix for context management, and not, on its own, evidence that your next invoice will be smaller.

## Now, I want to hear from you

A few things I'd genuinely like to know from anyone running this in production:

- Have you measured your own context or token delta with context-mode enabled, the way I did with the two-line script above — or has the 98% headline been enough to adopt it on faith?
- Has a summary from `ctx_execute_file` ever quietly dropped a detail you needed two turns later, the way my heading-only summary lost the GitHub issue reference?
- If a meaningful share of your context pressure comes from MCP tool calls rather than Bash, WebFetch or file reads, has the lack of automatic result transformation shown up in your own usage — or is your workload light enough on MCP that it doesn't matter?

Drop a comment or reply — I read everything.

---

## References

[1] [GitHub - mksglu/context-mode](https://github.com/mksglu/context-mode) — the project's own README: architecture, tool list, and the "think in code" framing that anchors its claim.
[2] [Code Mode: the better way to use MCP](https://blog.cloudflare.com/code-mode/) — Cloudflare's contrasting input-side approach, converting MCP tool definitions into a TypeScript API an agent codes against.
[3] [Context windows — Anthropic docs](https://platform.claude.com/docs/en/build-with-claude/context-windows) — primary provider documentation on context window mechanics, context rot, and context awareness.
[4] [Prompt caching — Anthropic docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) — primary provider documentation on cache pricing and why cached tokens still occupy the context window.
[5] [BENCHMARK.md — mksglu/context-mode](https://raw.githubusercontent.com/mksglu/context-mode/main/BENCHMARK.md) — the project's own 21-scenario fixture benchmark, cited throughout for its raw/context size figures.
[6] [MCP server that reduces Claude Code context consumption by 98% — Hacker News](https://news.ycombinator.com/item?id=47193064) — the project's launch discussion, source of the independently confirmed MCP-interception limit and the git-log failure-mode example.
