# Outline: Context-mode: what better context management actually buys you

**Target:** ~15 min read (~3,750 words)

## Sections

### Preview section
- Labelled bullet list — one entry per major content section
- Sources: n/a (structural)

### 1. What does context-mode actually claim to do?
- The vendor framing ("the other half of the context problem"), the six sandbox tools, the "think in code" mental model
- Key angle: separate the claim from the mechanism before judging either — context-mode is an output-side externalisation layer, not a bigger context window
- Sources: [GitHub - mksglu/context-mode](https://github.com/mksglu/context-mode), [Code Mode: the better way to use MCP](https://blog.cloudflare.com/code-mode/) (contrast — input-side vs output-side)

### 2. Why isn't "less context" the same claim as "a smaller bill"?
- Anthropic's context window mechanics, context rot, and prompt caching — cached prefixes still occupy the window; caching changes price, not whether tokens count
- Key angle: this is the conflation the whole post is built to correct, using the same "cost per successfully completed task" framing established in the RTK and Ponytail/Caveman posts
- Sources: [Context windows — Anthropic docs](https://platform.claude.com/docs/en/build-with-claude/context-windows), [Prompt caching — Anthropic docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

### 3. Where does context-mode actually earn its place?
- Large logs, CSV/JSON, multi-file surveys, browser snapshots, documentation queried repeatedly — the project's own fixture benchmark
- Key angle: the maintainers' 95–100% fixture reductions are plausible and real at the component level; they are not proof of an equivalent end-to-end token-bill or task-quality effect
- Sources: [BENCHMARK.md](https://raw.githubusercontent.com/mksglu/context-mode/main/BENCHMARK.md)

### 4. Where does context-mode fall short?
- Small outputs, files about to be edited directly, and — the most important finding from research — external MCP tool calls are not intercepted at all
- Key angle: use the Hacker News empirical test (re5i5tor) confirming the PreToolUse hook only matches Bash/Read/Grep/Glob/WebFetch/WebSearch/Task, not MCP tools — corroborated by the maintainer in-thread
- Sources: [Hacker News discussion](https://news.ycombinator.com/item?id=47193064)

### 5. What happens when you actually test the mechanism on a real file?
- A transparent, self-run A/B on this exact repo: reading the raw research document (57,693 bytes) vs. a two-line script that returns only a structural summary (2,796 bytes) — a 95.2% reduction, matching the shape of the vendor's own fixture numbers
- The catch, demonstrated on the same fixture: the aggregate summary omits a specific fact (a named GitHub issue) entirely; a targeted grep-style query for that same fact returns it exactly, in 1,353 bytes — proving the compute-vs-retrieve distinction with real numbers, not a projection
- Key angle: be explicit that this replicates context-mode's underlying mechanism with a plain script, not the plugin itself — the point is the mechanism, not a vendor-comparable benchmark
- Sources: self-run test (this repo); mechanism description drawn from internal research paper Ch.3, Ch.10

### 6. What breaks, and how do you catch it?
- Hook overhead on small/observe-only calls, wrong-question-right-answer scripts, retrieval misses from lexical search, and the MCP blind spot from Section 4
- Key angle: ground each failure mode in a concrete example already surfaced in research (the git-log-to-commit-count example from Hacker News; the 0.4 KB/13%-savings network fixture from the vendor's own benchmark)
- Sources: [Hacker News discussion](https://news.ycombinator.com/item?id=47193064), [BENCHMARK.md](https://raw.githubusercontent.com/mksglu/context-mode/main/BENCHMARK.md)

### 7. How should you decide when to reach for context-mode?
- A scoped adoption ladder: start with the least surprising routes (large logs/CSVs via aggregate compute, docs via index+search), keep a raw artefact for audit, delay broad Bash/MCP interception until hook overhead is measured, keep host-level sandboxing on regardless
- Key angle: close on the same "measure your own task distribution" verdict used in the RTK and Ponytail/Caveman posts, adapted for context rather than cost
- Sources: internal research paper Ch.11 (synthesis, no new external source)

### Closing section
- Named `##` heading: "Closing thoughts"
- Synthesis: context-mode does one narrow thing well (keep specific large, disposable, or queryable outputs out of the model's working set) and is not a bigger window or an automatic discount
- Sources: synthesis — no external source

### Now, I want to hear from you
- `## Now, I want to hear from you`
- 3 questions tied to the post's argument: whether readers have measured their own context/token delta, whether they've hit the MCP blind spot, whether they've had a summary quietly drop something they needed later
- Sources: n/a (structural)

---

## ToC Suggestions

None — the rough ToC from `notes.md` maps cleanly onto question-format H2s with no structural gaps or overlaps.
