# Notes

---

## Brainstorm Summary

The post argues against the default assumption that every AI use case requires the latest frontier model. The framing starts with an acknowledged fact — open source models, particularly Chinese ones like DeepSeek and Qwen, trail US frontier models (GPT-4o, Claude 3.5/3.7, Gemini Ultra) by roughly 6–12 months on capability benchmarks. Jose's provocation is: "so what?" Most organisations are not doing the tasks that require that last 10% of capability. The gap that exists on hard reasoning benchmarks rarely manifests in day-to-day production use cases like summarisation, classification, extraction, code review, or customer support.

The cost angle is real and underappreciated. Renting inference from Anthropic and OpenAI at scale is expensive. Open source models hosted via providers like Together AI, Fireworks, or self-hosted on cloud VMs are meaningfully cheaper for high-volume workloads. The post will give readers a mental model for deciding when the premium is justified and when it is waste.

The structural spine is a task taxonomy: a simple framework that lets readers classify their own use cases by complexity/reasoning demand, and understand where the frontier premium pays off versus where it doesn't. This gives the post practical utility beyond the argument.

The emotional and rhetorical core is the Vegetius quote — "in times of peace, prepare for war." The call to action is not "switch everything to open source today" but rather "start experimenting now, while there is no pressure." Teams that have never evaluated open source models will be caught flat-footed when costs or geopolitical supply chain concerns force the issue. The post ends with concrete first steps.

Tone is pragmatic and pedagogic throughout — Jose is not contrarian for its own sake, but making a reasoned case with data from his research.

## Rough Table of Contents

- **Introduction: The gap is real — and mostly irrelevant** — State the 6–12 month lag as fact, then immediately reframe the question as "so what does that actually mean for your work?"
- **What frontier models are actually better at** — Honest account of where the gap shows up: hard multi-step reasoning, complex coding, nuanced instruction-following. No hand-waving.
- **Task taxonomy: matching model to task** — A simple framework (e.g. low/medium/high reasoning demand) readers can apply to their own use cases.
- **The real cost of always using frontier models** — Cost-per-token comparison, projected spend at scale, and the hidden vendor dependency risk.
- **The Chinese open source landscape** — Brief overview of DeepSeek, Qwen, and others: what they can do, where to access them.
- **In times of peace, prepare for war** — The Vegetius argument: why now is the right time to experiment, before cost pressure or supply chain disruption forces the issue.
- **Concrete first steps** — How to start: pick one non-critical task, run a side-by-side eval, instrument quality metrics. Practical and low-barrier.

---

## Pre-Research: Key Findings from Jose's PDF

Source file: `open-source-models-are-behind-frontier-ones-so-what.pdf` (raw text: `research-raw.txt`)

### The lag number
- **Epoch AI** (primary validated source for the month-lag claim): Chinese AI models have lagged the US frontier by an **average of 7 months** since 2023, with a range of **4–14 months**, using the Epoch Capabilities Index.
- **NIST CAISI** "Evaluation of DeepSeek AI Models" (published 30 September 2025): benchmark comparison of 3 DeepSeek models vs 4 US reference models across 19 benchmarks. Reports performance gaps but does NOT publish a "months behind" conversion — that framing comes from Epoch AI, not CAISI.
- A follow-up NIST CAISI report "Evaluation of Kimi K2 Thinking" (published 12 December 2025) states Kimi K2 Thinking was the most capable PRC-based model at release, while still lagging leading US models.

### Where the gap is large vs small
- **Large gap**: software engineering (SWE-bench Verified: 66.7 US best vs 54.8 DeepSeek V3.1) and cyber tasks.
- **Small gap**: knowledge Q&A benchmarks (MMLU-Pro: 90.2 US best vs 89.0 DeepSeek V3.1 — CAISI calls this "not by a wide margin").
- Retrieval/search orchestration tasks: gap widens again. On LMSYS Chatbot Arena (as of research date), the only open model in the top 28 is Diffbot Small XL at Elo ~1024 vs frontier at 1255+.

### Source attribution note
The "6–8 months behind" claim is well-supported by Epoch AI's public analysis. The CAISI report validates benchmark-level gaps but does not use a month-conversion formula. When drafting, cite Epoch AI for the lag number and CAISI for the benchmark specifics — don't conflate them.

### Gaps still to fill (for /research stage)
- Cost-per-token comparisons (Anthropic/OpenAI vs Together AI / Fireworks / self-hosted)
- Concrete task categories where open source is demonstrably good enough (real-world case studies)
- URLs for Epoch AI report, NIST CAISI reports, LMSYS Chatbot Arena
