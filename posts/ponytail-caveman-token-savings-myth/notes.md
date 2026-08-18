# Notes

---

## Brainstorm Summary

Ponytail and Caveman are two Claude Code skills that have built a reputation as effortless, near-magical token savers — the kind of thing people adopt on faith because "everyone raves about them." This post is a mechanics-first debunking-or-vindication piece rather than a straightforward endorsement or takedown: Jose wants to actually understand how each skill works technically, map that onto how Claude Code and LLMs genuinely process context, tool calls, and output tokens, and only then judge whether the reputation is deserved.

The second half of the post does the same scrutiny to the numbers. Both skills publish their own benchmark claims about token savings. Jose wants to compare those self-reported benchmarks against independent, external benchmark evidence — not to assume the skills are lying, but to see whether the methodology and magnitude hold up once tested outside the skill authors' own framing.

The reader is broad within the Claude Code / agentic coding audience: anyone who is token-conscious and has heard the hype, whether they already use these skills or are deciding whether to adopt them. The piece isn't written for people trying to decide between competing skills — it's written for people who assume a magic bullet exists and haven't stopped to check the mechanics or the evidence.

No thesis was fixed at brainstorm time. The working hypothesis space ranged from "the skills genuinely deliver, just not for the reasons claimed" to "the savings are mostly illusory once methodology is accounted for."

Scope is deliberately narrow: only ponytail and caveman, not a broader survey of token-saving skills or patterns. Content type is `series-genai` (mechanics-of-Claude-Code explainer), structural type is standalone. Target reading time: 20 minutes.

---

## Research Findings (from `Ponytail_and_Caveman_Technical_Due_Diligence_Agent_Ready.md`)

The research resolved the open thesis question. Key findings, in order of how the draft should probably use them:

**1. "Ponytail" and "Caveman" are not one mechanism each — they're three, on different channels of the token bill.**
- **Ponytail** is not compression at all. It's a behavioural decision ladder (does this need to exist? → is it already in the codebase? → stdlib? → platform? → existing dependency? → one-liner? → minimum implementation). It changes *what gets built*, not how it's expressed. This is the most defensible of the three mechanisms because its value doesn't depend on token arithmetic — it's an engineering-discipline argument first.
- **Caveman skill** (the original) is pure output-style compression: telegraphic prose, dropped articles/filler/hedging. It explicitly does NOT touch input or reasoning tokens, and the skill itself adds ~1–1.5k input tokens per turn as overhead. Already-terse workloads can go net-negative.
- **Caveman Proxy/Engine** is a separate, newer, more technically ambitious system: content-aware input compression sitting between agent and provider, with a local lossy-but-recoverable store (CCR) and a `caveman_retrieve` recovery path. This is the one with the most interesting mechanism and the least independent validation.

**2. The token bill has 8 channels, and a saving in one can reappear in another:** fresh input, cache write, cache read, reasoning/thinking, output prose, code/patches, tool recovery, image/vision tokens. This is the mental model the post needs before any single-number claim can be judged. The organizing principle for the whole piece: the right unit is not "tokens saved," it's **cost per successfully completed task at held quality**.

**3. Headline vs. independent benchmark, side by side:**

| Mechanism | Self-reported headline | Independent (JetBrains SkillsBench) | Gap |
|---|---|---|---|
| Ponytail (code) | -54% LOC | ~-15% LOC (up to ~-31% on larger builds) | independent effect ~72% smaller |
| Ponytail (cost) | -20% | -10.3% (p=0.004, statistically significant) | roughly half |
| Ponytail (time) | -27% | -11% | smaller but directionally consistent |
| Caveman skill (output tokens) | -65% (10 prose prompts, 22–87% range) | -8.5% (82 paired agentic tasks, forced activation) | independent effect ~13% as large |
| Caveman Proxy (input tokens) | -33.2% (6 pinned fixtures, official only) | *no independent benchmark exists yet* | open evidence gap |

Quality: no detectable quality regression in any of the independent benchmarks (Ponytail: 65 tied/9 worse/6 better; Caveman skill: 64 tied/8 better/10 worse, sign-test p=0.82) — these are real, if smaller, effects, not illusions.

**4. Why headline and independent numbers can both be true:** effect size depends entirely on how much over-build / verbosity / redundancy headroom exists in the *specific task*, not on some universal property of the tool. Ponytail's own benchmark deliberately contains over-build traps (date picker: 404→23 lines). SkillsBench's mixed data/analysis/repair tasks have far less irreducible bloat to cut.

**5. Caveman Proxy's own internal benchmark already shows the content-dependency problem, even before independent scrutiny:** -55.1% on a fraud CSV outlier fixture down to **+9.9%** (compression became *expansion*) on a dashboard HTML fixture. "Compress everything" is contradicted by the vendor's own numbers.

**6. External academic evidence supports the mechanism split, not a blanket verdict on compression:**
- **CAVEWOMAN** (arXiv 2606.24083): output compression often reduces realized cost; naive *linguistic* input compression is frequently lose-lose (~1.15x net cost, worse accuracy) because models compensate for compressed input with longer responses. Caveat: this studies linguistic rewriting, not Caveman Proxy's structural/recoverable compression — related problem, different mechanism.
- **SkillReducer** (arXiv 2603.29919): semantic selection (removing genuinely non-actionable content) beats indiscriminate terseness — 48% description / 39% body compression with *improved* functional quality. This is the more defensible model for what "good compression" looks like, and it maps onto Ponytail's decision ladder and Caveman Proxy's content-aware routing better than onto blanket terseness.

**7. Evidence gap to flag explicitly in the draft:** no independent, broad, paired benchmark exists for Caveman Proxy comparable to the JetBrains tests of the other two. The 33.2% number rests only on the maintainers' own six-fixture CaveBench Wrap suite. Do not present it with the same confidence as the other two headline-vs-independent comparisons.

**8. Practical framing for the verdict section:** none of the three tools should be deployed as an organization-wide default without a local, task-distribution-specific eval — the effects are too heterogeneous. Stacking all three at once confounds attribution (you won't know which mechanism produced a gain or a regression). Ponytail is the "try first" candidate (independent validation, low operational complexity, benefits beyond tokens). Caveman skill is a legitimate but narrow prose-shortening tool — good if you value terser commentary, bad basis for cost budgeting. Caveman Proxy is the most interesting bet technically but the least proven — evaluate, don't default to it.

**Sources worth citing directly in the draft (full list in the research doc's Appendix B):**
- Ponytail official benchmark (18 June 2026 rebuild, documents its own contamination bug) — S03
- JetBrains Ponytail independent benchmark — S06
- JetBrains Caveman independent benchmark — S13
- Caveman CaveBench Wrap (official Proxy benchmark) — S11
- CAVEWOMAN paper — S15
- SkillReducer paper — S16
- Colin Eberhardt / Scott Logic critique of Ponytail's *original* (pre-fix) benchmark — S05 (historical/methodological value only — the maintainers accepted this critique and rebuilt the benchmark; don't use it to dismiss the corrected 18 June result)

## Rough Table of Contents

- **The reputation** — what ponytail and caveman are claimed to do, why the community treats them as easy wins, and the flawed shared assumption ("fewer visible tokens = lower total cost") behind that reputation.
- **How the token bill actually works** — the 8-channel mental model (fresh input, cache write/read, reasoning, output, code, tool recovery, image tokens) and the "cost per successful task at held quality" framing that organizes the rest of the piece.
- **Three mechanisms, not two skills** — Ponytail's decision ladder (behavioural, not compression), Caveman skill's output-style compression (input/reasoning untouched), and Caveman Proxy's input compression with recovery (CCR) — mapped onto the channel model above.
- **The headlines** — each project's self-reported number and how it was measured: Ponytail 54% code reduction, Caveman 65% output-token reduction, Caveman Proxy 33.2% input reduction.
- **The independent check** — JetBrains SkillsBench results for Ponytail (~15% code / 10.3% cost / 11% time) and Caveman skill (8.5% output tokens); why both are real but far smaller than headline; the open evidence gap for Caveman Proxy (no independent benchmark exists).
- **Why both numbers can be true** — effect size tracks task-level over-build/verbosity headroom, not a fixed tool property; Caveman Proxy's own fixtures already show this (-55% to +9.9%) before independent scrutiny even arrives.
- **What the research says about compression generally** — CAVEWOMAN (linguistic input compression often lose-lose) and SkillReducer (semantic selection beats indiscriminate terseness) as the theoretical backdrop.
- **Verdict** — practical, per-tool recommendation: what's proven, what isn't, what to test before adopting any of the three, and why "default it org-wide" isn't supported by the evidence gathered.

