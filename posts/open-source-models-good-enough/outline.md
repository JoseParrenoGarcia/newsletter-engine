# Outline: Open Source Models Are Good Enough: Stop Overpaying for Intelligence You Don't Need

**Target:** ~15 min read (~3,750 words)

---

## Sections

### Preview section
- **The gap is real — and mostly irrelevant.** Open source models lag frontier ones by ~7 months on average. But that number hides more than it reveals.
- **Where the gap actually shows up.** Hard multi-step reasoning, complex software engineering, adversarial cyber tasks. The benchmarks are honest about this.
- **The task taxonomy.** A simple framework for classifying your own use cases by reasoning demand — and deciding where the frontier premium is justified.
- **What you are actually paying.** Claude Opus 4.7 at $25/MTok output vs DeepSeek V4-Flash at $0.28/MTok. The cost math compounds fast.
- **The Chinese open source landscape.** DeepSeek V4-Pro and Qwen3: what they can do, where to access them, and why the Apache 2.0 licence matters.
- **Why now is the right time to start.** The Vegetius argument: the teams who experiment today under no pressure are the ones who will adapt fastest when conditions change.
- **Concrete first steps.** One task, one eval framework, one week. How to start without over-engineering it.

---

### 1. Introduction: The gap is real — and mostly irrelevant
- Open with a thesis-first contrarian reframe: state the lag as fact (Epoch AI: average 7 months, 4–14 month range), then immediately ask "so what does that mean for you?"
- The framing problem: the AI industry debates which model tops benchmarks; most practitioners need to decide which model to deploy at 3am when a bug surfaces, or route 50k summaries per day through.
- Thesis: the gap is real, the fear is exaggerated, and the cost of defaulting to frontier models is higher than most teams realise.
- Sources: [CAISI Evaluation of DeepSeek V4-Pro — NIST (May 2026)](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro), [How far behind are open models? — Epoch AI (Nov 2024)](https://epoch.ai/blog/open-models-report)

### 2. What frontier models are actually better at
- Honest account: don't hand-wave the gap away. Frontier models are measurably better at hard multi-step reasoning, complex software engineering (SWE-bench Verified: 66.7 vs 54.8 for best US vs DeepSeek V3.1), adversarial cyber tasks, and tasks requiring nuanced instruction-following across long contexts.
- On human preference (LM Arena), the gap is also real: top 20 are all proprietary; leading open-weight models (DeepSeek V3.2, Qwen3) sit at ranks 68–75, scores ~1424 vs frontier ~1503.
- Key point: the gap is task-dependent, not uniform. MMLU-Pro (knowledge Q&A): 90.2 vs 89.0 — nearly indistinguishable. The benchmark you care about depends on what you build.
- Sources: [LLM Leaderboard — LM Arena (May 2026)](https://lmarena.ai/leaderboard/text), [How far behind are open models? — Epoch AI](https://epoch.ai/blog/open-models-report), [CAISI Evaluation of DeepSeek V4-Pro — NIST](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro)

### 3. Task taxonomy: matching model to task
- A practical 3-tier framework: Low reasoning demand / Medium reasoning demand / High reasoning demand
  - **Low**: summarisation, classification, entity extraction, translation, rewriting, customer support routing, simple Q&A → open source matches frontier closely
  - **Medium**: code review, report generation, structured data extraction from complex docs, multi-turn conversation → open source competitive, gap visible on edge cases
  - **High**: autonomous coding agents on novel repos, complex multi-step reasoning chains, adversarial security tasks, agentic workflows with many tool calls → frontier models hold a measurable advantage
- Key point: the majority of production AI workloads today sit in Low or Medium. Ask: where on this spectrum does your task live?
- Sources: [Comparison of AI Models — Artificial Analysis](https://artificialanalysis.ai/models) (intelligence index vs cost tradeoff curve across 364+ models)

### 4. The real cost of always using frontier models
- Concrete cost comparison (output tokens, which dominate):
  - Claude Opus 4.7: $25/MTok output
  - GPT-5.5: $30/MTok output
  - DeepSeek V4-Pro (direct API): $0.87/MTok output (currently discounted; full price $3.48)
  - DeepSeek V4-Flash: $0.28/MTok output
  - Qwen3.6-Plus via Together AI: $3.00/MTok output
- At 10M output tokens/month (modest production scale): Claude Opus = $250k/year; DeepSeek V4-Flash = $2,800/year. That is not a rounding error.
- Hidden second cost: vendor dependency. All inference rented from two US companies creates a single point of failure — pricing risk, API instability, geopolitical exposure, and no negotiating leverage.
- Key point: the question is not "is the frontier model better?" but "is it better enough, for this task, to justify 10–100x the cost?"
- Sources: [Anthropic API Pricing](https://docs.anthropic.com/en/docs/about-claude/models/overview), [OpenAI API Pricing](https://openai.com/api/pricing/), [DeepSeek Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing), [Serverless Inference Pricing — Together AI](https://www.together.ai/pricing)

### 5. The Chinese open source landscape
- Two models worth knowing:
  - **DeepSeek V4-Pro**: leading PRC-based open-weight model; 1M context window; available via DeepSeek's own API ($0.435/$0.87 input/output per MTok) or via US-based third-party providers like Together AI
  - **Qwen3** (Alibaba): competitive benchmarks on coding, math, and general tasks vs DeepSeek-R1, o1, o3-mini; 8 model sizes from 0.6B to 235B under Apache 2.0 licence — the full range from edge deployment to server-grade
- Apache 2.0 matters: you can run these locally, fine-tune them, ship them in products without per-token fees.
- Note on NIST CAISI follow-up: Kimi K2 Thinking (Dec 2025 evaluation) was the most capable PRC model at release — still behind frontier, but shows the cadence of releases.
- Sources: [DeepSeek Models & Pricing](https://api-docs.deepseek.com/quick_start/pricing), [Qwen3: Think Deeper, Act Faster — Qwen Team](https://qwenlm.github.io/blog/qwen3/)

### 6. In times of peace, prepare for war
- Vegetius quote as the rhetorical spine: the argument is not "switch now"; it is "experiment now, while there is no pressure."
- Three reasons why now is the right time:
  1. **No stakes**: a side-by-side eval on a non-critical task costs almost nothing and surfaces real signal
  2. **The gap is narrowing**: Epoch AI shows the lag has shortened on certain benchmarks; teams that know these models will be positioned when the gap closes further
  3. **Supply chain risk is real**: single-provider dependency on two US companies is a business risk, not just a cost risk — pricing, policy changes, geopolitical disruption
- Teams who have never touched open source models will be caught flat-footed when the conversation moves from "should we?" to "we have to".
- Sources: none — model knowledge and rhetorical argument

### 7. Concrete first steps
- The minimal viable experiment:
  1. Pick one non-critical, high-volume task in your stack (summarisation, classification, or code review)
  2. Route 5–10% of production traffic (or a representative sample) to DeepSeek V4-Flash or Qwen3
  3. Build a simple eval: human review of N=50 outputs + a domain-specific rubric
  4. Compare quality scores and latency; compute the projected cost delta at your current scale
- The eval framework matters more than the model choice: Hamel Husain's guide to building LLM eval systems is the best practical starting point
- If quality is within acceptable bounds: expand the routing. If not: you learned something valuable at near-zero cost.
- Sources: [Your AI Product Needs Evals — Hamel Husain](https://hamel.dev/blog/posts/evals/)

---

### Closing section
- Heading: `## Closing thoughts`
- Narrative prose with bolded key phrases (strategic/essay register — not numbered Key Takeaways)
- Synthesise: the gap is real and documented; for most tasks it is irrelevant; the cost math is not; the right move is deliberate experimentation now
- Connect back to thesis: matching the model to the task is not a compromise — it is the correct engineering decision

### Now, I want to hear from you
- Named `##` section
- 2–3 specific questions tied to the post's argument:
  - Have you run side-by-side evals on open source models? What task, and what surprised you?
  - Which tasks in your stack do you think are genuinely irreplaceable at the frontier level?
  - What is holding your team back from experimenting with open source models today?
