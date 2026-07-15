# Notes

---

## Brainstorm Summary

The post opens by explaining what Sonnet 5 actually is as a model — the technical and behavioral changes from Sonnet 4.6, including the new effort levels (low/medium/high/xhigh/max), why effort labels aren't comparable across generations (Sonnet 5 medium can resemble Sonnet 4.6 high), the new tokenizer (which inflates token counts ~30% for identical text), and agent scaffold swaps Anthropic made mid-evaluation (mini-SWE-agent replacing Terminus-2 after the latter produced 2.7x more timeouts). This section grounds the reader in mechanics before any benchmark claims are introduced.

From there the post covers what Anthropic claims via its launch benchmark chart — large official gains on SWE-bench Pro, Terminal-Bench 2.1, FrontierCode, and AutomationBench, positioned as "most agentic Sonnet." The post then isolates the one comparison that survives scrutiny cleanly: at matched intelligence tiers (Sonnet 4.6 medium vs Sonnet 5 medium), Sonnet 5 delivers the same accuracy for meaningfully lower cost. This is the thesis-supporting claim — narrow, verifiable, and genuinely useful.

The rest of the post is a contrast-and-verify exercise, broken into H3-level sub-sections by dimension. Independent sources (CursorBench 3.2, Artificial Analysis Intelligence Index) show Sonnet 5's cost-per-successful-task climbing steeply across its own effort levels — at max effort it is often more expensive than Opus 4.8 or GPT-5.6 for similar or better results. Meanwhile online discourse amplifies the negative read: a viral "goes straight into the garbage bin" cost thread (screenshot provided, citing Artificial Analysis's cost-per-Intelligence-Index-task chart), a Neowin report on Sonnet 5 refusing commands and arguing with users, and mixed reactions across X. Much of this discourse — like Anthropic's own launch chart, just in the opposite direction — compares mismatched effort settings or mismatched models rather than controlling for intelligence tier. Both the hype and the backlash commit the same methodological sin.

A fairness section follows, grounded in the detailed evidence report already in the post folder (`Claude_Sonnet_5_Evidence_Report.md`): agentic coding and tool-use gains are real and hold up in independent, non-Anthropic evidence — CodeRabbit's practitioner review, GitHub Copilot's day-one GA adoption, and Cursor's production benchmark all broadly confirm stronger building and persistence, even though the construction-vs-review split reveals nuance (higher review precision, lower bug-catching recall than 4.6).

The post closes briefly — a short closing thought, not a full section — on the practical takeaway: run your own workload-specific benchmarks at your own effort/task mix rather than trusting a launch chart or a viral tweet. Tone matches `open-source-models-good-enough.md` (Jose's highest-performing post to date): pragmatic, data-driven, contrarian but fair to both the hype and the backlash, with a task-taxonomy-style structural spine.

## Rough Table of Contents

- **What Sonnet 5 actually is** — the agentic upgrade and technical mechanics: effort levels, why they aren't comparable across generations, the tokenizer change, agent scaffold swaps.
- **What Anthropic claims** — the launch chart and official benchmark deltas, positioned as the "most agentic Sonnet."
- **The matched-tier cost story** — Sonnet 4.6 medium vs Sonnet 5 medium: same accuracy, real and verifiable cost win.
- **Contrasting and verifying** (H3 sub-sections) — cost-per-successful-task across effort levels; the online backlash and mismatched comparisons; behavioral complaints; the coding construction-vs-review split.
- **Where it's still genuinely worth it** — agentic coding and tool-use gains confirmed by independent, non-Anthropic evidence.
- **Closing thought** — run your own benchmarks; don't trust a launch chart or a viral tweet.

## Source Material Provided by Jose

- `Claude_Sonnet_5_Evidence_Report.md` — full evidence dossier (primary source for the report, already in this post folder)
- Screenshot: "Lisan al Gaib" (@scaling01) tweet, "Sonnet 5 goes straight into the garbage bin," citing Artificial Analysis cost-per-Intelligence-Index-task chart — needs verification against live AA data during /research
- https://www.neowin.net/reports/claude-sonnet-5-wont-follow-commands-argues-with-users-and-tells-them-to-go-to-sleep/
- https://x.com/JulianGoldieSEO/status/2073724006063067533
- https://x.com/davis7/status/2072230052461465765
- https://www.coderabbit.ai/blog/claude-sonnet-5-review
- https://x.com/kimmonismus/status/2072027861385466123
