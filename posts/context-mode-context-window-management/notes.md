# Notes

---

## Brainstorm Summary

This post covers context-mode, a tool for managing agentic coding context windows, and continues the same mechanics-first, benchmark-honest pattern Jose has used for RTK and Ponytail/Caveman. Unlike those two posts, which focused on token-cost claims, context-mode's core claim is about context-window management — a related but distinct axis. The post's job is to pull those two apart explicitly: context-mode does not expand the context window and does not automatically cut total cost; what it does is move large-input analysis into a separate sandbox and return only the useful result, keeping the main conversation's context smaller than it would otherwise be.

The reader is a Claude Code practitioner who has heard of context-mode and wants to know where it actually helps rather than assuming it's a universal fix. The pedagogical approach mirrors the earlier posts: explain the mechanism first, then hold it against realistic use cases and a hands-on self-test rather than relying purely on vendor framing. Likely winning cases are large logs, big data files (CSV/JSON), multi-file codebase surveys, and web docs where only a targeted extraction is needed. Likely losing cases are small files and any file the agent is about to edit directly, since editing requires the exact source content, not a summary of it.

Jose has research documentation (a PDF) to provide once the folder scaffold exists. That research needs to be converted via the import-pdf procedure and reviewed to see what independent evidence, if any, exists for context-mode's claims — this is flagged as an open research question rather than assumed. The post closes with a practical decision framework: when context-mode earns its place in a workflow, when it's the wrong tool, and how to self-test on your own repo rather than trusting either the vendor pitch or reflexive skepticism.

## Rough Table of Contents

- **The claim vs. the mechanism** — what context-mode says it does, and what it actually does under the hood (sandboxed execution, summary-back-to-context).
- **Context-window management is not token-cost reduction** — pulling apart the two claims this post's predecessors (RTK, Ponytail/Caveman) covered on the cost side.
- **Where it plausibly wins** — large logs, big data files, multi-file surveys, web docs.
- **Where it's the wrong tool** — small files, files about to be edited, summary fidelity loss.
- **Hands-on A/B test** — reading raw vs. sandboxed on this repo, measuring the actual delta.
- **Failure modes** — what breaks and how to catch it.
- **Practical decision framework** — when to reach for it, when to skip it, how to self-test.
