# Research Brief: Open Source Models Are Good Enough: Stop Overpaying for Intelligence You Don't Need

**Generated:** 2026-06-01

## Summary

`notes.md` contained no hyperlinks — all sources were referenced by name only (Epoch AI, NIST CAISI, LMSYS Chatbot Arena). Zero URLs required validation from notes.md. Ten sources were found via targeted search and fetch across all seven ToC sections. All sections are covered. The only gap from the prior brief — real-world case studies of teams deploying open source in production — is now addressed by the ZenML LLMOps database (457 production case studies). No sections remain uncovered.

## Sources

### Introduction: The gap is real — and mostly irrelevant

- **[CAISI Evaluation of DeepSeek V4 Pro — NIST (May 2026)](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro)**
  NIST's Center for AI Standards and Innovation evaluated DeepSeek V4 Pro across cyber, software engineering, natural sciences, abstract reasoning, and mathematics using nine benchmarks including two non-public evaluations. Key finding: DeepSeek V4's capabilities lag leading US models by approximately 8 months, and it scores lower on uncontaminated benchmarks than on DeepSeek's self-reported evals. Also notes DeepSeek V4 is more cost-efficient than comparable US models on 5 of 7 benchmarks.

### What frontier models are actually better at

- **[How far behind are open models? — Epoch AI (Nov 2024)](https://epoch.ai/blog/open-models-report)**
  Comprehensive analysis comparing open and closed AI models on benchmark performance and training compute from 2018 to mid-2024. Finds open models have lagged closed models by 5–22 months on benchmarks (90% CI), with the lag centring around one year. Training compute lag is approximately 15 months. Notes that Meta's Llama 3.1 405B is the first open model to close the compute gap with GPT-4, and that the lag may be shortening for the most capable open models.

- **[LLM Leaderboard — LM Arena (May 2026)](https://lmarena.ai/leaderboard/text)**
  Human preference leaderboard across 356 models with over 6 million votes. As of May 2026, the top 20 positions are held by proprietary models; the leading open-weight models (DeepSeek V3.2, Qwen3 series) appear around ranks 68–75, with scores of 1424 vs. the #1 frontier score of 1503. Provides live, human-validated evidence of the remaining preference gap between frontier and open models.

- **[LLM Benchmark Leaderboard 2025: MMLU, HumanEval, MATH, and More — Deepest](https://www.deepest.app/blog/llm-benchmark-leaderboard)**
  Regularly updated benchmark table for 20+ major AI models across MMLU, HumanEval, MATH, GPQA, and MT-Bench — with plain-English explanations of what each score actually means. As of April 2026, GPT-5 and Gemini 2.5 Ultra lead across most benchmarks; DeepSeek V3 and Qwen 2.5 lead the open-weight category. On HumanEval, DeepSeek V3 scores 79.4% vs Claude 3.5 Sonnet at 93.7% — a meaningful but not insurmountable gap on standard coding tasks. Also calls out benchmark contamination as a caveat for interpreting any provider-reported scores.

### Task taxonomy: matching model to task

- **[Comparison of AI Models: Intelligence, Performance & Price — Artificial Analysis](https://artificialanalysis.ai/models)**
  Independent benchmarking site comparing 364+ models across intelligence index, speed, latency, and price. Shows a clear tradeoff curve: the highest-intelligence proprietary models cost $5–$30/MTok output, while capable open models on managed inference cost $0.25–$4.50/MTok output. Useful for illustrating that model selection is a spectrum, not a binary frontier/open choice, and for grounding the task taxonomy section.

- **[Open-Source vs Commercial LLMs: The Complete Guide (2026) — SitePoint](https://www.sitepoint.com/opensource-vs-commercial-llms-the-complete-guide-2026/)**
  Practitioner guide covering the 2026 LLM landscape with a 12-step decision framework. Introduces the complexity-tier framing: commodity tasks (summarisation, classification, structured extraction, standard code generation) vs. frontier tasks (complex multi-step reasoning, agentic chains, high-stakes low-volume decisions). Benchmark data shows open-source models (Llama 4 Maverick, DeepSeek-V3) scoring within 3–5 percentage points of GPT-4o on MMLU-Pro and matching it on HumanEval+ Python generation. Persistent gaps appear in GPQA Diamond (complex reasoning) where Claude Opus leads best open-source by 8–12 points. Hybrid routing pattern — frontier for complex tasks, open source for high-volume commodity tasks — is presented as the dominant production strategy.

### The real cost of always using frontier models

- **[Anthropic API Pricing — Claude Docs](https://docs.anthropic.com/en/docs/about-claude/models/overview)**
  Official Anthropic pricing for current Claude models: Claude Opus 4.7 at $5 input / $25 output per MTok; Claude Sonnet 4.6 at $3 / $15 per MTok; Claude Haiku 4.5 at $1 / $5 per MTok. Confirms the high end of frontier inference costs and the tiered structure within a single provider.

- **[OpenAI API Pricing](https://openai.com/api/pricing/)**
  Official OpenAI pricing for current models: GPT-5.5 at $5 input / $30 output per MTok; GPT-5.4 at $2.50 / $15 per MTok; GPT-5.4 mini at $0.75 / $4.50 per MTok. Provides the other major frontier provider's cost baseline for direct comparison.

- **[DeepSeek Models & Pricing — DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing)**
  Official DeepSeek pricing for DeepSeek-V4-Pro: $0.435 input / $0.87 output per MTok (full price $1.74 / $3.48 per MTok). DeepSeek-V4-Flash (lighter model): $0.14 / $0.28 per MTok. Both support 1M context window. Provides the most direct cost comparison between the leading open-weight Chinese model and frontier US alternatives.

- **[Serverless Inference Pricing — Together AI](https://www.together.ai/pricing)**
  Together AI pricing for open-weight models via managed API: DeepSeek V4 Pro at $2.10 input / $4.40 output per MTok; Qwen3.6-Plus at $0.50 / $3.00 per MTok; Llama-based models at $0.10–$0.20 / $0.40–$0.60 per MTok. Represents the US-hosted third-party option for open source inference — more expensive than using DeepSeek's own API but removing the direct vendor dependency on a Chinese provider. Useful for the vendor dependency risk angle.

- **[LLM Pricing 2026: Every Model from $0.01 to $75/1M — PE Collective](https://pecollective.com/blog/llm-pricing-comparison-2026/)**
  Cross-provider pricing table updated April 2026 covering 15+ models with input/output costs per 1M tokens. Notable figures: Claude Opus 4 at $15 input / $75 output; GPT-4o at $2.50 / $10; Llama 4 Maverick (via providers) at $0.20 / $0.60; Llama 4 Scout at $0.10 / $0.25. Contextualises the 10–150x cost differential between top frontier and capable open-weight models in a single scannable table.

### The Chinese open source landscape

- **[Qwen3: Think Deeper, Act Faster — Qwen Team (April 2025)](https://qwenlm.github.io/blog/qwen3/)**
  Official release post for Qwen3, Alibaba's open-weight model family. Flagship Qwen3-235B-A22B achieves competitive benchmark results on coding, math, and general capabilities vs. DeepSeek-R1, o1, o3-mini, and Gemini-2.5-Pro. Eight model sizes released under Apache 2.0 licence (from 0.6B to 235B), making the family accessible for local deployment and self-hosting at various scales.

- **[The Complete Guide to DeepSeek Models: V3, R1, V4 and Beyond — BentoML](https://www.bentoml.com/blog/the-complete-guide-to-deepseek-models-from-v3-to-r1-and-beyond)**
  Editorial overview of the full DeepSeek model family updated April 2026. Covers V3 (671B MoE, trained for ~$5.6M vs. GPT-4's estimated $50–100M), R1 (reasoning model), V3.1, V3.2, and V4. DeepSeek-V3-0324 update outperforms GPT-4.5 on math and coding evaluations. Explains the Mixture-of-Experts architecture that makes training and inference efficient despite the large parameter count. Provides accessible, citable overview of the Chinese open source model trajectory.

### In times of peace, prepare for war (The Vegetius argument)

- **[LLMOps in Production: 457 Case Studies of What Actually Works — ZenML (Jan 2025)](https://www.zenml.io/blog/llmops-in-production-457-case-studies-of-what-actually-works)**
  Synthesis of the world's largest LLMOps case study database (457 entries, 600,000+ words of real implementation detail from 130+ companies). Key patterns relevant to this post: most production teams start with frontier models and migrate high-volume tasks to open source or smaller models once they understand their quality/cost tradeoffs; teams that built evaluation infrastructure early were able to make model-switching decisions confidently and quickly. Directly supports the "start now while there is no pressure" argument by showing the pattern that plays out in practice.

### Concrete first steps

- **[Your AI Product Needs Evals — Hamel Husain](https://hamel.dev/blog/posts/evals/)**
  Practitioner guide to building LLM evaluation systems, grounded in a real-world case study (Rechat's AI assistant Lucy). Argues that the most common failure mode in AI products is not building robust evaluation infrastructure — and that doing so unlocks rapid iteration. Directly applicable to the "start experimenting now" call to action: provides a concrete framework for running side-by-side evaluations on your own tasks before committing to a model.
