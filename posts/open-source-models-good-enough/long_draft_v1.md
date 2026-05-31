# Open Source Models Are Good Enough: Stop Overpaying for Intelligence You Don't Need

Open source models are behind frontier ones. That is the correct answer. It is also the wrong question.

The AI conversation is obsessed with capability rankings. Which model tops the leaderboard this week? Which lab released something that beats the previous benchmark record? These are interesting questions if you work at a frontier lab. For everyone else — the engineers, PMs, and technical managers shipping products — the relevant question is different: which model is good enough for the task I need to do, and what does it cost to run?

[According to Epoch AI's analysis of open and closed models](https://epoch.ai/blog/open-models-report), Chinese open-weight models have lagged US frontier models by an average of 7 months since 2023, with a range of 4 to 14 months. [NIST's Center for AI Standards and Innovation confirmed this directionally](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro) in their May 2026 evaluation of DeepSeek V4-Pro, documenting measurable gaps on software engineering and cyber benchmarks. The gap is real and documented.

And for most of what you build, it does not matter.

Most production AI workloads — summarisation, classification, entity extraction, customer support routing, document Q&A, code review — do not require the last 10% of capability that frontier models provide. They require consistent, fast, correct-enough responses at a price that scales. The default assumption that every task deserves frontier intelligence is costing organisations more than they realise, in money and in a dependency they have not yet noticed.

This post makes the case for a more deliberate approach: match the model to the task, understand where the frontier premium is genuinely justified, and start experimenting with open source models today — not because conditions force it, but because learning takes time and the smart move is to start before you have to.

## What will we cover in this post?

- **The gap is real — here is what it actually looks like.** Honest account of the benchmarks, where frontier models hold a measurable lead, and where the gap narrows to near-irrelevance.
- **A task taxonomy for model selection.** A 3-tier framework for classifying your workloads by reasoning demand — so you can decide where the frontier premium is justified and where it is waste.
- **The real cost of defaulting to frontier models.** Hard cost comparisons across providers, and a second cost most teams overlook: vendor dependency.
- **The Chinese open source landscape.** DeepSeek and Qwen: what they can do, what they cost, and why the Apache 2.0 licence changes the calculus.
- **Why now is the right time to experiment.** The Vegetius argument: the teams that start today, under no pressure, will be the ones who adapt fastest when conditions change.
- **A concrete first experiment.** Four steps. One week. Near-zero risk.

## The gap: what the benchmarks actually show

The benchmarks are honest. On tasks that require sustained multi-step reasoning, complex software engineering, or adversarial security work, frontier models hold a real advantage.

[NIST CAISI's evaluation](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro) compared leading US models against DeepSeek models across 19 benchmarks. On SWE-bench Verified — a test of autonomous software engineering on real GitHub issues — the gap is significant: the best US model scores 66.7; DeepSeek V3.1 scores 54.8. On cyber tasks, the gaps are wider still. These are not manufactured benchmark artefacts. They reflect genuine capability differences on tasks that require reasoning chains that span dozens of steps, coordination across many tools, and recovery from intermediate errors.

[The LM Arena human preference leaderboard](https://lmarena.ai/leaderboard/text), based on 6 million pairwise votes, tells a similar story. As of May 2026, the top 20 positions are held entirely by proprietary models. The leading open-weight models — DeepSeek V3.2 and the Qwen3 series — appear around ranks 68 to 75, with Elo scores of approximately 1,424 against a frontier high of 1,503.

That is the honest account. Now for the part that gets omitted.

On MMLU-Pro, a comprehensive knowledge and reasoning benchmark, the same evaluation shows best US model at 90.2 versus DeepSeek V3.1 at 89.0. NIST itself notes that question-answer style benchmarks show gaps that are "not by a wide margin." [Epoch AI's broader analysis](https://epoch.ai/blog/open-models-report) — covering open and closed models from 2018 to mid-2024 — finds that while the training compute lag is approximately 15 months, the capability gap on certain benchmarks has been shortening as open models improve their efficiency.

The gap is not uniform. It is concentrated in specific task types. Understanding which ones is the entire game.

## A task taxonomy for model selection

The most useful thing you can do before choosing a model is classify the task. Not by domain — not "is this a coding task or a customer support task" — but by reasoning demand. How much multi-step inference, error recovery, and context integration does this task require?

A simple 3-tier framework:

**Low reasoning demand** — the task is largely pattern-matching, extraction, or rewriting. Examples: summarising a document, classifying an email into categories, extracting structured data from a form, translating text, generating a first draft from a brief, routing a customer support ticket. Open source models match frontier performance closely on these tasks. The MMLU-Pro numbers above are the right mental model: a gap of 1.2 points rarely translates into a gap a human reviewer can detect.

**Medium reasoning demand** — the task requires following multi-step instructions, handling ambiguity, or producing outputs that need to be defensible to a domain expert. Examples: reviewing code for correctness (not just style), generating a report that synthesises multiple sources, extracting nuanced information from complex legal or technical documents, holding a coherent multi-turn conversation with context that spans many exchanges. Open source models are competitive here. The gap becomes visible on edge cases — unusual input formats, conflicting instructions, outputs requiring domain judgment. Running your own eval on your own data is the only way to know where your specific task sits.

**High reasoning demand** — the task involves autonomous agents working on novel problems, complex multi-step reasoning chains where intermediate errors compound, adversarial or security-critical tasks, or agentic workflows requiring many tool calls with recovery logic. Examples: an autonomous coding agent working on an unfamiliar large codebase, a research agent that must synthesise and reason across many sources, security analysis or penetration testing. Frontier models hold a real advantage here. The benchmark gaps are large, they are task-relevant, and they show up in production.

[Artificial Analysis benchmarks 364+ models](https://artificialanalysis.ai/models) across an intelligence index, speed, latency, and price. The tradeoff curve is instructive: the highest-intelligence proprietary models cost $5 to $30 per million output tokens; capable open-weight models on managed inference cost $0.25 to $4.50. The intelligence gap between tiers narrows faster than the price gap widens.

Ask the question directly: where on this spectrum does the task you are routing to a frontier model actually sit?

For most teams, the honest answer is that the majority of their production volume is Low or Medium. The High-demand tasks exist, but they are not the bulk of the token spend.

## The real cost of defaulting to frontier models

The cost math is not subtle.

Current output token pricing, as of May 2026:

| Model | Output price per MTok |
|---|---|
| GPT-5.5 (OpenAI) | $30.00 |
| Claude Opus 4.7 (Anthropic) | $25.00 |
| GPT-5.4 (OpenAI) | $15.00 |
| Claude Sonnet 4.6 (Anthropic) | $15.00 |
| DeepSeek V4-Pro (direct API) | $0.87 (discounted until May 2026; full price $3.48) |
| DeepSeek V4-Flash (direct API) | $0.28 |
| Qwen3.6-Plus via Together AI | $3.00 |

Sources: [Anthropic](https://docs.anthropic.com/en/docs/about-claude/models/overview), [OpenAI](https://openai.com/api/pricing/), [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing), [Together AI](https://www.together.ai/pricing).

At 10 million output tokens per month — modest for a team running production summarisation or classification pipelines — Claude Opus 4.7 costs $250,000 per year. DeepSeek V4-Flash costs $2,800 per year. The ratio is approximately 90 to 1.

Even comparing like-for-like against a more capable open model: Claude Sonnet 4.6 at $15/MTok versus DeepSeek V4-Pro at $3.48/MTok (full price, post-discount) is a ratio of roughly 4 to 1. For tasks where both models produce acceptable output, that is not a performance tradeoff — it is a pricing premium with no corresponding quality gain.

There is a second cost that does not appear in the pricing table.

Every inference call routed to Anthropic or OpenAI is a dependency on a single commercial provider. That means pricing risk — providers have raised and restructured prices before. It means API availability risk — outages happen. It means geopolitical exposure — both are US companies, both operate under US policy constraints. And it means negotiating leverage of zero: you are one of millions of customers with no special position.

None of these risks are hypothetical. None of them require the scenario to be extreme. A pricing restructuring that moves Claude Sonnet from $15 to $20/MTok output is a 33% cost increase with no advance notice and no alternative if your stack only knows how to talk to one provider.

Diversification is table stakes in every other part of infrastructure. Model routing is not yet treated the same way. It should be.

## The Chinese open source landscape

Two models are worth knowing in detail.

**DeepSeek V4-Pro** is the current leading open-weight model from the Chinese AI lab DeepSeek. It supports a 1 million token context window. Through DeepSeek's own API, it costs $0.435 per MTok input and $0.87 per MTok output — currently at a 75% discount until the end of May 2026, with full pricing at $1.74/$3.48. For teams with concerns about routing calls to a Chinese provider, US-based providers like Together AI host it at higher prices ($2.10/$4.40 per MTok). [NIST CAISI's evaluation](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro) placed it behind leading US models on software engineering and cyber tasks — but competitive on knowledge and reasoning benchmarks.

**Qwen3** is Alibaba's open-weight model family. The [official release](https://qwenlm.github.io/blog/qwen3/) describes the flagship Qwen3-235B-A22B achieving competitive benchmark results on coding, math, and general capabilities against DeepSeek-R1, o1, o3-mini, and Gemini 2.5 Pro. What makes Qwen3 particularly interesting for deployment decisions is the breadth of the family: eight model sizes from 0.6B to 235B parameters, all released under the Apache 2.0 licence. The 0.6B model runs on a laptop. The 235B model runs on a server. Apache 2.0 means you can deploy locally, fine-tune for your domain, and ship in a commercial product — with no per-token fees and no dependency on an external API.

The Apache 2.0 point matters more than it might initially seem. A model you can run on your own infrastructure is a qualitatively different kind of asset than a model you access via an API. It can be embedded in products without variable cost. It can be fine-tuned on proprietary data without sending that data to a third party. It can be deployed in environments with no outbound internet access. These are not edge cases for enterprises.

A note on cadence: NIST CAISI evaluated Kimi K2 Thinking in December 2025 and called it the most capable PRC-based model at release — while still behind leading US models. New evaluations keep coming. The gap is not standing still.

## In times of peace, prepare for war

Flavius Vegetius Renatus, writing in the fourth century, offered advice that has not dated: *si vis pacem, para bellum*. If you want peace, prepare for war. The military application is obvious. The organisational one is less often articulated.

The teams most affected by a future disruption are the ones who had no exposure to the alternative before the disruption arrived. The teams least affected are the ones who built the capability during the quiet period — not because they anticipated the specific disruption, but because they understood that optionality requires practice.

Three reasons to experiment now, while there is no pressure:

First, **the cost of learning is low when stakes are zero**. A side-by-side evaluation on a non-critical internal task costs almost nothing in time or money. The signal you get — does this model produce acceptable output for this task? — is real. The downside if it fails is nothing. Run the experiment now, on something that does not matter, before you need to run it on something that does.

Second, **the gap is narrowing**. Epoch AI's analysis found that the capability lag between open and closed models has shortened on certain benchmarks as open models improve efficiency. Meta's Llama 3.1 405B was the first open model to close the training compute gap with GPT-4. DeepSeek and Qwen continue to release models that push the frontier of what open weights can do. The teams that understand these models today will not be surprised by what they can do tomorrow.

Third, **vendor concentration is a business risk**. Not just a cost risk. A pricing decision made in San Francisco with no input from you, a policy change driven by a regulatory requirement you did not anticipate, an API outage during a critical customer demo — these are not rare events. They happen to every team that runs a single-provider strategy for long enough. The hedge is not complicated: it is running some fraction of your traffic through a different provider, building the muscle memory of knowing what that involves.

The ask is not to abandon frontier models. It is to build the knowledge and infrastructure to use them selectively — which means knowing what the alternative looks like from the inside.

## Concrete first steps

The minimal viable experiment looks like this.

**Step one: pick one task.** It should be high-volume, non-critical, and currently routed entirely to a frontier model. Summarisation, classification, and simple code review are good starting points. The goal is not to find the hardest task in your stack — it is to find the one where you can learn the most at the lowest risk.

**Step two: route a sample.** Send 5 to 10% of production traffic (or a representative offline sample of 200 to 500 examples) through DeepSeek V4-Flash or a Qwen3 model. Do not change anything else. The experiment should be as controlled as possible.

**Step three: build an eval.** This is the step most teams skip, and it is the most important one. A domain-specific rubric with human review of 50 outputs will tell you more than any benchmark. [Hamel Husain's guide to building LLM evaluation systems](https://hamel.dev/blog/posts/evals/) is the most practical starting point available — it is grounded in a real production case study and focuses on building evaluation infrastructure that survives model changes.

**Step four: compute the delta.** Score quality on both models. Measure latency. Calculate the projected cost difference at your current scale. If quality is within acceptable bounds, the question becomes: is the cost saving worth the operational change? If quality is not acceptable, you have learned something valuable at near-zero cost — and you now know exactly where the gap shows up for your specific task.

One experiment. One week. The outcome is either a cost saving or a precisely located capability gap. Both are useful.

The teams who will be best positioned — when pricing changes, when a vendor makes a policy decision you did not anticipate, when the open-weight models close another 3 benchmark points — are the ones who already know what these models can and cannot do in their own production context.

## Closing thoughts

The benchmark debate will continue. New models will be released. The leaderboards will shuffle. **None of that changes the underlying argument.**

The question that matters for anyone shipping AI products is not which model is best in absolute terms. It is which model is sufficient for this task, reliable enough to deploy, and priced well enough to scale. Those three constraints point in the same direction for most production workloads: open-weight models are already good enough, and the cost difference is not a marginal consideration.

**The gap between frontier and open source is real, task-dependent, and smaller than the pricing gap.** On knowledge tasks and many practical reasoning tasks, the difference is statistically negligible. On complex multi-step agentic tasks and adversarial security work, frontier models hold an advantage worth paying for. Most production AI sits in the first category, not the second.

The cost math is not subtle — it ranges from 4 to 1 to 90 to 1 depending on model pairs. At any serious volume, the frontier-default strategy is expensive. And it is fragile, because every token goes through one of two commercial APIs that you do not control.

**The right move is to start experimenting before you have to.** Not as a grand migration project. As a low-stakes experiment on a single task, this week, that answers a concrete question: what does this open-weight model actually do with my data, on my task, at my quality bar?

Vegetius was writing about armies. The principle generalises. The preparation that protects you is the preparation you did when you did not need it.

## Now, I want to hear from you

- Have you run a side-by-side evaluation of an open-weight model against a frontier model in production? What task did you test, and what surprised you about the results?
- Which tasks in your current stack do you think genuinely require frontier-level capability — and have you tested that assumption, or is it an informed guess?
- What is the main thing holding your team back from experimenting with open source models today?

## References

[1] [How far behind are open models? — Epoch AI (Nov 2024)](https://epoch.ai/blog/open-models-report) — Analysis of open vs closed AI models from 2018 to mid-2024; finds 5–22 month benchmark lag (90% CI), ~15 month training compute lag, with signs of shortening for the most capable open models.

[2] [CAISI Evaluation of DeepSeek V4-Pro — NIST (May 2026)](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro) — NIST benchmark evaluation of DeepSeek V4-Pro against US reference models across 19 benchmarks; documents large gaps on software engineering and cyber tasks, smaller gaps on knowledge Q&A.

[3] [LLM Leaderboard — LM Arena (May 2026)](https://lmarena.ai/leaderboard/text) — Human preference leaderboard across 356 models with 6M+ votes; top 20 positions held by proprietary models as of May 2026.

[4] [Comparison of AI Models: Intelligence, Performance & Price — Artificial Analysis](https://artificialanalysis.ai/models) — Independent benchmarking of 364+ models across intelligence index, speed, latency, and price; documents the tradeoff curve between model capability and inference cost.

[5] [Anthropic API Pricing — Claude Docs](https://docs.anthropic.com/en/docs/about-claude/models/overview) — Official Anthropic pricing for Claude models; Claude Opus 4.7 at $5/$25 per MTok input/output; Claude Sonnet 4.6 at $3/$15 per MTok.

[6] [OpenAI API Pricing](https://openai.com/api/pricing/) — Official OpenAI pricing; GPT-5.5 at $5/$30 per MTok input/output; GPT-5.4 at $2.50/$15 per MTok.

[7] [DeepSeek Models & Pricing — DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing) — DeepSeek V4-Pro at $0.435/$0.87 per MTok input/output (discounted through May 2026; full price $1.74/$3.48); V4-Flash at $0.14/$0.28 per MTok.

[8] [Serverless Inference Pricing — Together AI](https://www.together.ai/pricing) — US-based managed inference for open-weight models; DeepSeek V4-Pro at $2.10/$4.40 per MTok; Qwen3.6-Plus at $0.50/$3.00 per MTok.

[9] [Qwen3: Think Deeper, Act Faster — Qwen Team (April 2025)](https://qwenlm.github.io/blog/qwen3/) — Official Qwen3 release; flagship Qwen3-235B-A22B competitive with leading frontier models on coding and math; 8 model sizes from 0.6B to 235B under Apache 2.0 licence.

[10] [Your AI Product Needs Evals — Hamel Husain](https://hamel.dev/blog/posts/evals/) — Practitioner guide to building LLM evaluation systems; grounded in a real production case study; covers rubric design, human review process, and iteration methodology.
