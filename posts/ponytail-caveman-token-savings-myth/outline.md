# Outline: Ponytail, Caveman, and the myth of magic token savings

**Target:** ~20 min read (~5,000 words)

## Sections

### Preview section
- Labelled bullet list — one entry per major content section
- Sources: n/a (structural)

### 1. The reputation — why these skills get treated as easy wins
- Ponytail and Caveman have huge star counts (~92k+ and 97,629) and get discussed in the same "token saver" breath. Name the flawed shared assumption: fewer visible tokens = lower total cost. Stars are a popularity signal, not a validation metric.
- Key angle: open on the personal moment of installing one of these on faith, then reframe — the interesting story isn't that they're fake, it's that the headline percentages live at different layers of the agent stack.
- Sources: [Ponytail repository README](https://github.com/DietrichGebert/ponytail/blob/main/README.md), [Caveman GitHub REST metadata](https://api.github.com/repos/JuliusBrussee/caveman), [Star History: DietrichGebert/ponytail](https://www.star-history.com/dietrichgebert/ponytail/), [What's in a GitHub Star?](https://arxiv.org/abs/1811.07643)

### 2. How does the token bill actually work?
- The 8-channel mental model: fresh input, cache write, cache read, reasoning, output prose, code/patches, tool recovery, image/vision tokens. Explain each briefly with how a "saving" in one can backfire by reappearing in another.
- Introduce the organizing principle for the whole piece: minimise cost_per_success at held quality, not raw token deltas.
- Sources: research_brief.md §1.1, §1.2 (no external URL — this is the report's own framework, attribute as "a due-diligence review of both projects' repositories and benchmarks" per voice rules on named attribution)

### 3. Are Ponytail and Caveman actually the same kind of tool?
- No — three distinct mechanisms on three different channels. Ponytail's decision ladder (does this need to exist? → reuse → stdlib → platform → dependency → one-liner → minimum implementation) changes what gets built, not how it's expressed. Caveman skill is output-style compression only — explicitly leaves input/reasoning untouched, adds ~1-1.5k input tokens overhead per turn. Caveman Proxy is a separate, newer system: content-aware input compression with a lossy-but-recoverable local store (CCR) and `caveman_retrieve`.
- Key angle: treating all three as one "token saver" category is itself part of the myth.
- Sources: [Ponytail core SKILL.md](https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail/SKILL.md), [Caveman core SKILL.md](https://github.com/JuliusBrussee/caveman/blob/main/skills/caveman/SKILL.md), [Caveman repository README](https://github.com/JuliusBrussee/caveman/blob/main/README.md)

### 4. What do Ponytail and Caveman claim about themselves?
- Each project's self-reported headline and how it was measured: Ponytail 54% code reduction (12 feature tasks, Haiku 4.5, FastAPI+React repo with deliberate over-build traps), Caveman skill 65% output-token reduction (10 prose prompts, 22–87% range), Caveman Proxy 33.2% provider-input reduction (6 pinned MCP fixtures, 18/18 exact-answer checks).
- Note the earlier flawed Ponytail benchmark and the maintainers' own correction (contamination bug disclosure) — this cuts toward the projects being more credible, not less, since they showed their work.
- Sources: [Ponytail agentic benchmark, 18 June 2026](https://github.com/DietrichGebert/ponytail/blob/main/benchmarks/results/2026-06-18-agentic.md), [Caveman repository README](https://github.com/JuliusBrussee/caveman/blob/main/README.md), [Caveman CaveBench Wrap benchmark](https://github.com/JuliusBrussee/caveman/blob/main/docs/WRAP-BENCHMARK.md), [Colin Eberhardt, "Ponytail? YAGNI!"](https://blog.scottlogic.com/2026/06/16/ponytail-yagni-and-the-problem-with-prompt-benchmarks.html)

### 5. What happens when independent benchmarks retest the same claims?
- JetBrains SkillsBench results side by side with headlines: Ponytail ~15% code / 10.3% cost (p=0.004) / 11% time vs. headline 54%/20%/27%. Caveman skill 8.5% output tokens (forced activation) vs. headline 65%. No detectable quality regression in either independent test.
- Flag explicitly: no comparable independent benchmark exists yet for Caveman Proxy — the 33.2% number rests only on the maintainers' own six-fixture suite. Do not present it with the same confidence as the other two.
- Sources: [JetBrains, "Ponytail Skill for Claude Code: Does It Really Cut Agent Code by 54%?"](https://blog.jetbrains.com/ai/2026/07/ponytail-skill-claude-tested/), [JetBrains, "Does Speaking to Agents Like Cavemen Really Save 65% of Tokens?"](https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/)

### 6. Why can the headline and the independent number both be true?
- Effect size tracks task-level over-build/verbosity headroom, not a fixed tool property. Ponytail's benchmark deliberately contains over-build traps (date picker 404→23 lines); SkillsBench's mixed data/analysis/repair tasks have less irreducible bloat to cut. Caveman Proxy's own fixtures already show the same content-dependency before independent scrutiny even arrives: -55.1% (fraud CSV) down to +9.9%, i.e. compression became expansion (dashboard HTML).
- Key angle: this is the mechanism, not an indictment — it tells you when each tool will and won't work rather than whether it "works."
- Sources: research_brief.md §3.4, §7.1, §7.2 (Ponytail/JetBrains benchmark comparison, CaveBench Wrap fixture table)

### 7. What does the broader compression research say?
- CAVEWOMAN (arXiv 2606.24083): output compression often reduces realized cost, but naive linguistic input compression is frequently lose-lose (~1.15x net cost, worse accuracy) because models compensate for compressed input with longer responses. Caveat this clearly — it studies linguistic rewriting, not Caveman Proxy's structural/recoverable compression; related problem, different mechanism.
- SkillReducer (arXiv 2603.29919): semantic selection (removing genuinely non-actionable content) beats indiscriminate terseness — 48%/39% compression with improved functional quality. This is the model for what "good compression" looks like, and it maps onto Ponytail's decision ladder and Caveman Proxy's content-aware routing better than onto blanket terseness.
- Sources: [CAVEWOMAN: How LLMs Behave Under Linguistic Input and Output Compression](https://arxiv.org/abs/2606.24083), [SkillReducer: Optimizing LLM Agent Skills for Token Efficiency](https://arxiv.org/abs/2603.29919)

### 8. So should you actually use these skills?
- Practical, per-tool verdict: Ponytail — try first (independent validation, low operational complexity, benefits beyond tokens even when savings are small). Caveman skill — legitimate but narrow prose-shortener; good if you value terser commentary, bad basis for cost budgeting. Caveman Proxy — most interesting mechanism, least proven; evaluate on your own high-input workloads, don't default to it.
- State the correct objective function plainly: cost-per-successfully-completed-task at held quality. Note that stacking all three at once confounds attribution — you won't know which mechanism produced a gain or a regression.
- No tool should be an organisation-wide default without a local, task-distribution-specific eval — the effects are too heterogeneous across task types.
- Sources: research_brief.md §9, §9.1, §9.2, §11.4 (decision framework, final ranking table)

### Closing section (heading: "Closing thoughts")
- Named `##` heading
- Synthesis: the myth was never that these skills do nothing — it's that "token saver" collapses three different mechanisms into one number, and that number is always measured somewhere a vendor chose to measure it. Return to the opening personal moment / reframe. Land on: the only benchmark that matters is the one you run on your own task distribution.
- Sources: synthesis — no external source

### Now, I want to hear from you
- Named `##` section — always `## Now, I want to hear from you`
- 2–4 specific questions tied to this post's argument (e.g. which of the three mechanisms they'd actually trust without running their own eval; whether they've measured cost-per-success or just cost-per-attempt; whether they've caught a benchmark quietly measuring the wrong channel)
- Sources: n/a (structural)
