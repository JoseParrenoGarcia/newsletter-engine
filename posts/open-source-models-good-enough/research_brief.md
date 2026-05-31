# Research Brief: Open Source Models Are Good Enough: Stop Overpaying for Intelligence You Don't Need

**Generated:** 2026-05-02

## Summary

`notes.md` contained no hyperlinks — all sources were referenced by name only (Epoch AI, NIST CAISI, LMSYS Chatbot Arena). One URL was supplied externally (the NIST CAISI report) and validated successfully. Nine additional sources were found via targeted search and fetch. All seven ToC sections are covered. No sections remain uncovered. One open research question — real-world case studies of teams switching to open source — is not covered by a dedicated source; the closest proxy is the Hamel LLM evals guide (which documents a production AI product built on evaluated models) and the Artificial Analysis leaderboard (which surfaces open-weight models alongside frontier ones for direct comparison). A dedicated "team switching" case study was not found in a citable form.

## Sources

### Introduction: The gap is real — and mostly irrelevant

- **[CAISI Evaluation of DeepSeek V4 Pro — NIST (May 2026)](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro)**
  NIST's Center for AI Standards and Innovation evaluated DeepSeek V4 Pro across cyber, software engineering, natural sciences, abstract reasoning, and mathematics using nine benchmarks including two non-public evaluations. Key finding: DeepSeek V4's capabilities lag leading US models by approximately 8 months, and it scores lower on uncontaminated benchmarks than on DeepSeek's self-reported evals. Also notes DeepSeek V4 is more cost-efficient than comparable US models on 5 of 7 benchmarks.

### What frontier models are actually better at

- **[How far behind are open models? — Epoch AI (Nov 2024)](https://epoch.ai/blog/open-models-report)**
  Comprehensive analysis comparing open and closed AI models on benchmark performance and training compute from 2018 to mid-2024. Finds open models have lagged closed models by 5–22 months on benchmarks (90% CI), with the lag centring around one year. Training compute lag is approximately 15 months. Notes that Meta's Llama 3.1 405B is the first open model to close the compute gap with GPT-4, and that the lag may be shortening for the most capable open models.

- **[LLM Leaderboard — LM Arena (May 2026)](https://lmarena.ai/leaderboard/text)**
  Human preference leaderboard across 356 models with over 6 million votes. As of May 2026, the top 20 positions are held by proprietary models; the leading open-weight models (DeepSeek V3.2, Qwen3 series) appear around ranks 68–75, with scores of 1424 vs. the #1 frontier score of 1503. Provides live, human-validated evidence of the remaining preference gap between frontier and open models.

### Task taxonomy: matching model to task

- **[Comparison of AI Models: Intelligence, Performance & Price — Artificial Analysis](https://artificialanalysis.ai/models)**
  Independent benchmarking site comparing 364+ models across intelligence index, speed, latency, and price. Shows a clear tradeoff curve: the highest-intelligence proprietary models cost $5–$30/MTok output, while capable open models on managed inference cost $0.25–$4.50/MTok output. Useful for illustrating that model selection is a spectrum, not a binary frontier/open choice, and for grounding the task taxonomy section.

### The real cost of always using frontier models

- **[Anthropic API Pricing — Claude Docs](https://docs.anthropic.com/en/docs/about-claude/models/overview)**
  Official Anthropic pricing for current Claude models: Claude Opus 4.7 at $5 input / $25 output per MTok; Claude Sonnet 4.6 at $3 / $15 per MTok; Claude Haiku 4.5 at $1 / $5 per MTok. Confirms the high end of frontier inference costs and the tiered structure within a single provider.

- **[OpenAI API Pricing](https://openai.com/api/pricing/)**
  Official OpenAI pricing for current models: GPT-5.5 at $5 input / $30 output per MTok; GPT-5.4 at $2.50 / $15 per MTok; GPT-5.4 mini at $0.75 / $4.50 per MTok. Provides the other major frontier provider's cost baseline for direct comparison.

- **[DeepSeek Models & Pricing — DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing)**
  Official DeepSeek pricing for DeepSeek-V4-Pro: $0.435 input / $0.87 output per MTok (currently at 75% discount until end of May 2026; full price $1.74 / $3.48). DeepSeek-V4-Flash (lighter model): $0.14 / $0.28 per MTok. Both support 1M context window. Provides the most direct cost comparison between the leading open-weight Chinese model and frontier US alternatives.

- **[Serverless Inference Pricing — Together AI](https://www.together.ai/pricing)**
  Together AI pricing for open-weight models via managed API: DeepSeek V4 Pro at $2.10 input / $4.40 output per MTok; Qwen3.6-Plus at $0.50 / $3.00 per MTok; Llama-based models at $0.10–$0.20 / $0.40–$0.60 per MTok. Represents the third-party hosted open source option — more expensive than using DeepSeek's own API but offering a US-based provider alternative. Useful for the vendor dependency risk angle.

### The Chinese open source landscape

- **[Qwen3: Think Deeper, Act Faster — Qwen Team (April 2025)](https://qwenlm.github.io/blog/qwen3/)**
  Official release post for Qwen3, Alibaba's open-weight model family. Flagship Qwen3-235B-A22B achieves competitive benchmark results on coding, math, and general capabilities vs. DeepSeek-R1, o1, o3-mini, and Gemini-2.5-Pro. Eight model sizes released under Apache 2.0 licence (from 0.6B to 235B), making the family accessible for local deployment and self-hosting at various scales.

### Concrete first steps

- **[Your AI Product Needs Evals — Hamel Husain](https://hamel.dev/blog/posts/evals/)**
  Practitioner guide to building LLM evaluation systems, grounded in a real-world case study (Rechat's AI assistant Lucy). Argues that the most common failure mode in AI products is not building robust evaluation infrastructure — and that doing so unlocks rapid iteration. Directly applicable to the "start experimenting now" call to action: provides a concrete framework for running side-by-side evaluations on your own tasks before committing to a model.

## Research Gaps

- **Real-world case studies of teams switching from frontier to open source models in production** — no single citable article documents a named company that switched and measured the outcome. The Hamel evals guide covers the evaluation methodology but not the switching decision specifically. This gap can be addressed in the draft by using the cost math as a proxy argument rather than social proof.
