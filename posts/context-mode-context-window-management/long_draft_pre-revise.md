# Context-mode: what better context management actually buys you

*A mechanics-first look at what context-mode's sandboxed context savings do and don't change — the context window, the token bill, and the two are not the same thing.*

I read about context-mode the same way I read about RTK and Ponytail before it: a GitHub repo with an eye-catching number attached, this time "98% context reduction," 20,000-plus stars, and a Hacker News launch thread that hit the front page. The pattern was familiar enough that I went looking for the mechanism before I went looking for the number.

What I found is a genuinely different kind of tool than the ones I'd already covered. RTK compresses shell output. Ponytail changes what code gets written. Caveman shortens prose. Context-mode does none of those things. It runs a sandboxed process, keeps the raw output local, and returns a small result to the conversation — while the full data stays queryable in a local database. That is a real architectural idea, and the project's own benchmark numbers for it are plausible.

The claim that needs unpacking is what those numbers actually mean. "98% context reduction" and "cuts your token bill" sound like the same statement. They are not. A context window and a token bill are governed by different mechanics, and a tool can genuinely shrink one without touching the other. This post works through why, where context-mode earns its keep despite that gap, where it doesn't, and what happened when I ran its underlying mechanism against a real file in this repo instead of trusting the headline.

## What will we cover in this post?

- **What does context-mode actually claim to do?** The mechanism behind the headline — sandboxed execution, local indexing, and what "the other half of the context problem" actually means.
- **Why isn't "less context" the same claim as "a smaller bill"?** How Anthropic's own context-window and prompt-caching mechanics show these are related but distinct quantities.
- **Where does context-mode actually earn its place?** The input shapes — large logs, CSVs, multi-file surveys, documentation — where the project's fixture benchmark holds up.
- **Where does context-mode fall short?** Small outputs, files about to be edited, and a specific, independently confirmed blind spot around external MCP tools.
- **What happens when you actually test the mechanism on a real file?** A self-run A/B on a file in this exact repo, with real byte counts instead of a projected estimate.
- **What breaks, and how do you catch it?** The concrete failure modes documented by the maintainer and the community, not hypothetical ones.
- **How should you decide when to reach for context-mode?** A scoped adoption ladder rather than a blanket yes or no.

## What does context-mode actually claim to do?

Context-mode's own [README](https://github.com/mksglu/context-mode) frames itself as "the other half of the context problem," positioned opposite tools like Cloudflare's [Code Mode](https://blog.cloudflare.com/code-mode/), which addresses a different half entirely. Code Mode converts MCP tool *definitions* into a TypeScript API an agent writes code against, so an agent connected to a server exposing thousands of endpoints only carries roughly 1,000 tokens of schema instead of the full tool catalogue. That is an input-side fix — it shrinks what an agent has to know about its tools before it does anything.

Context-mode addresses the other side: what comes back *after* a tool runs. Its core tools are `ctx_execute`, `ctx_execute_file`, `ctx_batch_execute` for running code in a sandbox and returning only stdout, plus `ctx_index`, `ctx_search`, and `ctx_fetch_and_index` for storing content in a local SQLite full-text index and retrieving exact chunks on demand. The README's own instruction to the model is blunt: "think in code." Instead of reading fifty files into context to count functions, the agent writes a script that does the counting and logs only the result. One script call replaces what would otherwise be dozens of raw reads.

That is a coherent idea, and it is not new in spirit — it is the same "compute, don't transcribe" instinct behind any tool that pipes verbose output through a filter before a human or a model reads it. The distinguishing detail is where the filtering happens: not by shortening the prose that comes back, and not by changing what code gets written, but by moving the *reading* itself into a subprocess and returning only what that subprocess decided was worth printing.

Two details in the [README](https://github.com/mksglu/context-mode) matter before going further. First, `ctx_execute` runs in a child process with timeouts and output caps — that is output isolation, not a security sandbox. Code still executes on the machine running the agent, so a malicious repository file or a poisoned page reaching the executor carries real risk, not just a context-management trade-off. Second, context-mode bundles a separate feature that has nothing to do with sandboxing: it captures session events — decisions, rejected approaches, active files, errors — into a local SQLite database, and rebuilds a priority-tiered snapshot before the conversation compacts. That's a second, independent value proposition (session continuity across a long or interrupted session) riding alongside the first (output externalisation), and the two are worth judging separately rather than as one bundled 98% claim.

## Why isn't "less context" the same claim as "a smaller bill"?

Anthropic's own [context window documentation](https://platform.claude.com/docs/en/build-with-claude/context-windows) is worth reading before evaluating any context-management tool, because it draws a line that vendor pitches routinely blur. The context window is "working memory" — everything counted toward it, including cached content, and Anthropic is explicit that more context is not automatically better: accuracy and recall degrade as token count grows, a phenomenon they call context rot. That's the "context" half of the claim, and it is real: a smaller working set can mean a model that reasons better, independent of what it costs.

The "bill" half is governed by a separate mechanism: [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching). Cache reads are priced at roughly a tenth of ordinary input tokens, but — and this is the detail that matters here — a cached prefix still occupies the context window. Caching changes what you pay for those tokens, not whether they count toward the window. The API's usage fields split the two apart explicitly: `cache_read_input_tokens`, `cache_creation_input_tokens`, and `input_tokens` are reported separately precisely because a smaller context window and a smaller bill are not the same event.

This is the same discipline I used in the [RTK post](https://substack.com/@joseparreogarcia): "cost per successfully completed task at held quality" is the only metric that actually settles whether a tool is worth adopting. For context-mode, there's an extra wrinkle on top of that discipline. Anthropic's caching documentation describes a lookback window: a cache write happens only at a declared breakpoint, and a later request can reuse it only if the prefix up to that breakpoint matches exactly, within a limited number of blocks. A hook that intercepts a tool call and injects routing guidance — exactly what context-mode's `PreToolUse` hook does before a WebFetch or a large Bash command — changes the sequence of blocks the platform sees. That doesn't necessarily break the cache, but it's a variable the byte-counter framing skips entirely. A shrink in what enters the conversation is not automatically a shrink in what you're billed, and the only way to know is to read the usage fields — `cache_read_input_tokens`, `cache_creation_input_tokens`, `input_tokens` — on an identical prompt, not to infer it from how many bytes a tool result used to take up.

## Where does context-mode actually earn its place?

The project's own [BENCHMARK.md](https://raw.githubusercontent.com/mksglu/context-mode/main/BENCHMARK.md) is unusually transparent as vendor benchmarks go — it uses captured output from real tools, not synthetic strings, and reports both the raw and post-processing size for every scenario. The two tool families it tests are handled differently, and the difference is the entire design logic of the tool.

`ctx_execute_file`, the "compute and summarise" path, is best suited to data where an aggregate answer is more useful than the raw content: a 56.2 KB Playwright page snapshot becomes 299 bytes; a 45.1 KB nginx access log becomes 155 bytes; an 85.5 KB analytics CSV becomes 222 bytes. Across the fourteen scenarios in this category, 315 KB of raw input became 5.5 KB of context — a 98% reduction. `ctx_index` plus `ctx_search`, the "index and retrieve" path, trades some of that reduction for exactness: documentation scenarios land at 44–93% savings, because the point is returning a code block or API signature verbatim, not a description of it.

Two more scenarios from the same benchmark are worth naming because they show how far the pattern generalises: a 58.9 KB pull of GitHub issues collapses to 1,139 bytes (98%), and a 153-commit git log collapses to 107 bytes (99%). In both cases, the aggregate answer — "how many issues are open," "how many commits touched this file" — genuinely is smaller than the raw listing, and genuinely is what most questions about that data are actually asking for.

Both numbers are genuine at the level they were measured — component-level, author-run, on disclosed fixtures. That is a meaningfully higher evidence bar than most tools in this space clear. It is still not the same claim as an end-to-end agent benchmark. The benchmark doesn't show whether an agent using context-mode solved the same tasks a baseline agent solved, whether it needed more follow-up calls to recover a detail the summary dropped, or whether the final invoice was smaller. Read the numbers as "this is what output externalisation does to fourteen real fixtures," not as "this is what adopting context-mode does to your bill."

## Where does context-mode fall short?

The project's own documentation is candid about the first limit: a 0.4 KB network-request fixture in the benchmark shows only 13% savings, because the fixed cost of spawning a subprocess and writing to SQLite doesn't scale down for small payloads. Files an agent is about to edit are a second, structural limit — editing needs the exact byte content, not a compact description of it, so routing a file-you're-about-to-modify through a summariser just adds a round trip.

The most consequential limit is one I didn't expect going in, and it came from testing the vendor's own claim against community scrutiny rather than from the vendor's documentation. A Hacker News commenter, [re5i5tor, on the project's launch thread](https://news.ycombinator.com/item?id=47193064), did the actual work of checking: they called their own Obsidian MCP server directly, and confirmed by inspecting the code that context-mode's `PreToolUse` hook matches only `Bash|Read|Grep|Glob|WebFetch|WebSearch|Task` — not MCP tool calls. Zero entries showed up in context-mode's FTS5 index for that call, while web-fetch calls in the same session were indexed normally. The maintainer confirmed it directly in the same thread: context-mode "handles the output side" for built-in tools and CLI wrappers, but for third-party MCP tools with their own capabilities, "the MCP author has to apply context-mode's concepts server-side."

That is a real, sourced boundary, not a hypothetical one. If a meaningful share of your context pressure comes from MCP servers rather than Bash, WebFetch, or file reads, context-mode is not currently in that loop at all.

There's a fourth limit worth naming even though it's more of a design critique than a failure: the retrieval side (`ctx_index` plus `ctx_search`) uses SQLite's FTS5 with BM25 ranking — lexical, keyword-based matching, not semantic search. On the same [launch thread](https://news.ycombinator.com/item?id=47193064), commenter blakec pointed out that pure BM25 underperforms on tool output specifically because it mixes structured data (JSON keys, config, IDs) with natural language (comments, error messages) — keyword matching handles the natural-language half well and struggles with the structured half. A query for "authentication failure" won't reliably surface a source that says "credential rejection." That's a real gap for anyone expecting the search side to behave like a semantic assistant rather than a fast, exact, keyword-driven index.

## What happens when you actually test the mechanism on a real file?

Rather than trust the headline number on faith or reject it on faith, I ran a version of the underlying mechanism against a real file already sitting in this post's own folder: the 57,693-byte research document I used to write this article, containing 8,841 words across 58 headings and 44 tables. I want to be precise about what this test is and isn't. I didn't install the context-mode plugin — this replicates its core idea (compute a summary in a script, return only that) with two lines of Python, on one fixture, in one repo. It is a mechanism check, not a vendor-comparable benchmark.

Reading the raw file straight into context costs 57,693 bytes. A short script that walks the document and returns only its heading structure and table count — the same "compute, don't transcribe" idea behind `ctx_execute_file` — returned a 2,796-byte summary: a 95.2% reduction, landing in the same range as the vendor's own fixture numbers.

Then I checked what that reduction actually cost. The 2,796-byte summary contains zero mentions of a specific fact buried in the source document — a paragraph about a community-reported GitHub issue (issue #960, a hook-overhead complaint). It isn't there, because heading structure was the only thing the script was told to extract. A targeted, grep-style query for that exact fact — the "index and retrieve" pattern rather than "compute and summarise" — returned it precisely, in 1,353 bytes. Same file, same underlying idea, two different questions asked of the same sandbox, two very different outcomes for whether the fact you needed made it back into context.

That's the whole tension in one repeatable test: the aggregate path is dramatically smaller and genuinely useless for a question it wasn't asked to answer; the retrieval path is still small and gets the fact right, but only because I knew which fact to ask for.

## What breaks, and how do you catch it?

The failure modes that matter here aren't speculative — they're documented, either by the maintainer's own benchmark or by people who tried to break the claim in public. The vendor's own 0.4 KB / 13%-savings network fixture is a case the project chose to publish itself, which is a point in its favour: it's honest about where the fixed overhead of sandboxing eats the benefit.

The most concrete community-reported failure came from Hacker News commenter [hereme888, on the same launch thread](https://news.ycombinator.com/item?id=47193064): compressing 153 git commits down to a 107-byte result assumes the model wrote the *right* extraction script. If it asks for a commit count when the actual need was specific commit messages, that information isn't wrong — it's gone, and the agent has no signal that anything was dropped unless it thinks to ask again. This is the same shape as the fact I lost in my own heading-only summary above, just with a live git log instead of a static document.

The MCP blind spot from the previous section is the third failure mode, and it's the one most likely to surprise someone who adopts context-mode expecting universal coverage: it is not a universal MCP proxy, and treating it as one will leave you wondering why your MCP-heavy workflow's context usage barely moved.

The fourth is a security consideration rather than a context-quality one, but it belongs on the same list: because `ctx_execute` runs model-generated code in a local child process, anything that can influence what the model writes — a malicious repository file, a poisoned web page, a prompt-injected MCP result — can influence what that script does when it runs. Output isolation limits what comes *back* into the conversation; it doesn't limit what the executed code can *do* on the machine it's running on. That's a reasonable trade-off for a local development tool with sane permissions, and a much less reasonable one if the sandboxing is treated as a security boundary rather than a context-management one.

## How should you decide when to reach for context-mode?

None of this argues against context-mode. It argues against treating "98% context reduction" as a single number that applies uniformly to your workload. A scoped adoption pattern gets you the real benefit without the disappointment:

- Start with `ctx_execute_file` on the input shapes where the fixture benchmark is strongest — large logs, CSVs, build output, and browser snapshots where an aggregate answer genuinely satisfies the question being asked.
- Reach for `ctx_index` plus `ctx_search` when the actual need is documentation, code examples, or anything where an exact snippet matters more than a description of it.
- Keep a raw artefact and a note of what query or script produced the summary, the same audit discipline I'd apply to any lossy transformation — so a wrong extraction is recoverable rather than silently final.
- Don't expect it to touch your MCP-heavy calls. If that's where your context pressure actually lives, this tool isn't currently the fix for it.
- Measure your own delta on your own repository before adopting it as a default, the same rule that applied to RTK and to Ponytail/Caveman. A two-line script and a `wc -c` command, as I used above, is a lower bar than it sounds.
- Judge session continuity on its own merits, separately from the sandboxing debate. Preserving decisions and active-file state across a compaction event is a real, distinct problem from context-window bloat, and a team that mainly wants that feature shouldn't be talked out of it by an argument about MCP interception or lexical retrieval — those objections apply to the sandbox tools, not to the session-event store.
- If you adopt the sandbox tools, adopt the audit habit alongside them from day one rather than retrofitting it later: every compact answer should carry a note of the query or script that produced it, so a wrong extraction is a five-minute fix rather than a silent gap discovered during an incident.

None of this requires trusting either the vendor's number or a reflexive dismissal of it. The test I ran on this repo's own research document took about as long to write as this paragraph did to read.

## Closing thoughts

Context-mode does one narrow thing genuinely well: it keeps specific, large, disposable, or queryable outputs out of a model's working context by running them through a sandbox first. That is a real contribution to context-window management, and the project's own fixture numbers hold up at the level they were measured.

What it doesn't do is expand the window itself, guarantee a smaller bill, or reach every source of context pressure in a session. Those are three separate claims that "98% context reduction" makes sound like one. Split them apart, and what's left is a useful, specific tool for a specific class of input — not a universal fix for context management, and not, on its own, evidence that your next invoice will be smaller.

## Now, I want to hear from you

A few things I'd genuinely like to know from anyone running this in production:

- Have you measured your own context or token delta with context-mode enabled, the way I did with the two-line script above — or has the 98% headline been enough to adopt it on faith?
- Has a summary from `ctx_execute_file` ever quietly dropped a detail you needed two turns later, the way my heading-only summary lost the GitHub issue reference?
- If a meaningful share of your context pressure comes from MCP tool calls rather than Bash, WebFetch, or file reads, has that blind spot actually shown up in your own usage — or is your workload light enough on MCP that it doesn't matter?

Drop a comment or reply — I read everything.

---

## References

[1] [GitHub - mksglu/context-mode](https://github.com/mksglu/context-mode) — the project's own README: architecture, tool list, and the "think in code" framing that anchors its claim.
[2] [Code Mode: the better way to use MCP](https://blog.cloudflare.com/code-mode/) — Cloudflare's contrasting input-side approach, converting MCP tool definitions into a TypeScript API an agent codes against.
[3] [Context windows — Anthropic docs](https://platform.claude.com/docs/en/build-with-claude/context-windows) — primary provider documentation on context window mechanics, context rot, and context awareness.
[4] [Prompt caching — Anthropic docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) — primary provider documentation on cache pricing and why cached tokens still occupy the context window.
[5] [BENCHMARK.md — mksglu/context-mode](https://raw.githubusercontent.com/mksglu/context-mode/main/BENCHMARK.md) — the project's own 21-scenario fixture benchmark, cited throughout for its raw/context size figures.
[6] [MCP server that reduces Claude Code context consumption by 98% — Hacker News](https://news.ycombinator.com/item?id=47193064) — the project's launch discussion, source of the independently confirmed MCP-interception limit and the git-log failure-mode example.
