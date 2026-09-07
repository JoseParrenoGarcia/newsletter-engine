# Research Brief: Context-mode: what better context management actually buys you

**Generated:** 2026-09-07

## Summary

`notes.md` and the imported research artefact (`context-mode-technical-research-paper.md`) contained no fetchable URLs, so all sources in this brief were added via targeted search/fetch against every gap in the rough ToC and both `open_research_questions`. Six external sources were validated: the project's own GitHub README and `BENCHMARK.md` (primary/project-benchmark evidence), Anthropic's context windows and prompt caching documentation (primary provider evidence needed to correctly separate context-window management from token billing), Cloudflare's Code Mode blog post (contrasting input-side design), and the project's Hacker News launch discussion (community signal, including a directly relevant empirical counter-test of the vendor's MCP-interception claim). No sources were dropped. Two topics — the hands-on A/B test and the practical decision framework — have no external source because they are synthesis/self-test work for the draft stage, not research-gap items; both are already scaffolded in the internal research paper's Chapter 10–11 and are noted below rather than left as unresolved gaps.

## Sources

### The claim vs. the mechanism

- **[GitHub - mksglu/context-mode](https://github.com/mksglu/context-mode)**
  The project's own README, positioned as "the other half of the context problem." Describes context-mode as an MCP server + hook system with six sandbox tools (`ctx_execute`, `ctx_execute_file`, `ctx_batch_execute`, `ctx_index`, `ctx_search`, `ctx_fetch_and_index`) plus five meta-tools, installed across 17 client platforms. Directly states the vendor's own framing: "Think in Code" — the model should write an analysis script and log only the result, rather than reading raw data into context. Useful as the primary statement of the claim to test against.

- **[Code Mode: the better way to use MCP](https://blog.cloudflare.com/code-mode/)**
  Cloudflare's blog post introducing Code Mode, which converts MCP tool definitions into a TypeScript API that the agent writes code against inside a V8-isolate sandbox, rather than calling tools directly. Useful as a contrast: Code Mode addresses input-side bloat (tool-definition/schema size), while context-mode primarily addresses output-side bloat (tool-result size) — the two are complementary, not competing, mechanisms, and conflating them would misstate what context-mode actually changes.

### Context-window management is not token-cost reduction

- **[Context windows — Anthropic docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)**
  Primary provider documentation confirming that context window size, "context rot" (accuracy degrading as token count grows), context awareness (`token_budget` tracking), and server-side compaction are governed independently of prompt-cache pricing. Explicitly states that cached prefixes still occupy the context window — caching changes what you pay, not whether tokens count toward the window. This is the authoritative source for the post's core distinction between "fits in context" and "billed input tokens."

- **[Prompt caching — Anthropic docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)**
  Primary provider documentation on cache mechanics: exact-prefix matching, the 20-block lookback window, what invalidates a cache (tool definition changes, thinking-parameter changes, etc.), and the `cache_creation_input_tokens` / `cache_read_input_tokens` / `input_tokens` usage fields needed to actually measure a cost claim. Necessary grounding for the post's warning that a smaller context payload does not automatically mean a smaller bill — hooks or injected guidance blocks that context-mode adds can themselves alter the cached prefix.

### Where it plausibly wins

- **[BENCHMARK.md — mksglu/context-mode](https://raw.githubusercontent.com/mksglu/context-mode/main/BENCHMARK.md)**
  The project's own fixture benchmark (21 scenarios, captured from real tool invocations, not synthetic data). Reports 315 KB of executor inputs reduced to 5.5 KB of returned context (98% savings) and 60.3 KB of indexed documentation reduced to 11 KB across three searches (82% savings), with a full scenario-by-scenario breakdown (Playwright snapshot 56.2 KB→299 B, GitHub issues 58.9 KB→1,139 B, nginx access log 45.1 KB→155 B, analytics CSV 85.5 KB→222 B, a 0.4 KB network-request fixture at only 13% savings). This is project-benchmark evidence, not an independent or end-to-end study — cite accordingly, per the internal research paper's evidence grading.

### Where it's the wrong tool / Failure modes

- **[MCP server that reduces Claude Code context consumption by 98% | Hacker News](https://news.ycombinator.com/item?id=47193064)**
  The project's launch discussion (570 points, 107 comments). Contains the single most important piece of independent evidence found in this research pass: user **re5i5tor** ran an empirical test and confirmed via code inspection that context-mode's `PreToolUse` hook matches only `Bash|Read|Grep|Glob|WebFetch|WebSearch|Task` — calling an MCP tool directly (their own Obsidian MCP) bypasses context-mode entirely, with zero entries appearing in its FTS5 index while web-fetch calls in the same session were indexed normally. The maintainer (**mksglu**) confirmed this directly in the thread: context-mode "doesn't change how MCP tool definitions get loaded into context... it handles the output side... [for] third-party MCP tools with unique capabilities, the MCP author has to apply context-mode's concepts server-side." This independently corroborates the internal research paper's Chapter 4 finding that external MCP results are not rewritten by the hook.
  The same thread contains a second useful failure-mode report from **hereme888**: hooks intercepting all `curl`/`wget`/`WebFetch` calls indiscriminately can force a 200-byte health-check response through the same sandboxing pipeline as a 56 KB snapshot, and compressing 153 git commits to 107 bytes assumes the model wrote the "perfect extraction script" — if it asks for a commit count when the user needed specific commit messages, that information is gone. The maintainer also confirmed in-thread that the mechanism does not break Anthropic's prompt cache, because the raw payload never enters conversation history in the first place (consistent with the Anthropic prompt-caching source above).

## Deferred to draft (no external source needed)

- **Hands-on A/B test** — this is original measurement work Jose will run on this repo during drafting, not a research-gap item. The internal research paper's Chapter 10 ("A rigorous evaluation plan for real workflows") already provides the experimental-arm structure, scenario matrix, and metrics table to design it.
- **Practical decision framework** — synthesis work for the draft, not sourced content. The internal research paper's Chapter 11 ("Practical adoption guidance") already provides the adoption ladder (start with `ctx_execute_file` for large logs/CSVs, keep a raw artefact for audit, delay broad Bash/MCP guidance until hook overhead is measured, keep host-level sandboxing on) this section can draw from directly.

## Research Gaps

None. Every ToC section and both `open_research_questions` items are covered above, either by an external source or by the internal research paper artefact already in this post folder.
