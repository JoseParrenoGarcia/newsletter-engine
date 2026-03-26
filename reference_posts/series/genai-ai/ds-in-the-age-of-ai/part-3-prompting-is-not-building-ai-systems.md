---
title: "Data Science in the age of AI (part 3): Prompting is not building AI systems"
subtitle: "Prompting is plumbing. The impact comes from designing systems that are reliable, safe, and repeatable."
author: Jose Parreño Garcia
published: 2025-11-15
source: https://joseparreogarcia.substack.com/p/prompting-is-not-building-ai-systems
theme: genai-ai
type: series
series: DS in the Age of AI
series_part: 3
---

# Data Science in the age of AI (part 3): Prompting is not building AI systems

*Prompting is plumbing. The impact comes from designing systems that are reliable, safe, and repeatable.*

*Part 3 of the "Data Science in the Age of AI" series.*

---

## What this post covers

- Playground prompts vs production LLMs — why a clever prompt in a demo is not the same as a reliable feature in production
- Prompting as part of system design — how real LLM systems chain prompts, inject context, integrate tools, and require orchestration
- LLM-specific design constraints — latency, cost, context limits, and evaluation
- How DS skills transfer directly to building robust LLM workflows
- Why prompting is plumbing, and why the impact comes from designing systems

---

## The AutoML parallel — we have been here before

When AutoML first appeared, many believed it would replace data scientists. One click and you had a model. But when those models went into production — or when teams tried to improve offline predictive metrics — the cracks appeared. The hype faded when reality set in. And this is why data scientists are still very much in demand today.

LLMs are now replaying the same cycle, but on steroids. It is easy to get something impressive in a playground:

1. You copy a prompt from Twitter
2. You get a coherent output
3. You show it in a demo
4. Everyone is impressed

What happens next is the hard part. The demo does not generalise. The output is inconsistent. There is no evaluation. There is no versioning. There is no fallback when the model is slow or wrong.

**This is the gap between prompting and building.**

---

## Prompting as part of system design

Real LLM systems are pipelines, not prompts. A worked example — a news article classification and summarisation system:

**1. Ingestion and pre-processing**
Scrape or receive articles. Normalise encoding, strip HTML, detect language, and deduplicate. This is not LLM work — it is data engineering. The LLM has not been called yet.

**2. Classification**
Use a classifier (LLM or classical) to assign each article to a category. Keep the prompt minimal: role, task, output format, examples. Version this prompt like code: `taxonomy_v1.7`.

**3. Summarisation**
Generate a summary. Guardrails: low temperature, token cap, schema checks. Retry once on invalid JSON, then fall back to deterministic regex snippets.

**4. Evaluation and routing**
Schema validation, banned phrase checks, duplication checks — all automated. For a small golden set, use LLM-as-evaluator to track precision and recall over time.

**5. Monitoring and versioning**
Log category distributions, latency, cost, error rates. Tie each deploy to an evaluation report.

By breaking the work into stages, you separate concerns, contain failures, and create clear measurement points. You can swap components — e.g. replace the classifier with a deterministic model for a high-volume feed — without rebuilding the whole pipeline.

> *This is what it means to move from prompt engineer to system orchestrator. The prompt is still important, but it is one cog in a machine that must run safely, repeatedly, and at scale.*

---

## LLM-specific design constraints

**Context window limits**
If a model only supports 16k tokens, you cannot dump a whole document set into it. Even with million-token windows, more is not always better — noise still hurts performance, and cost scales linearly with size. You need to decide what must go in and what can be retrieved on demand.

**Temperature and top-p**
High temperature is useful for brainstorming but introduces instability in production. Low temperature makes outputs more predictable. The trade-off affects consistency and how often you hit guardrails. It needs an evaluator, not a guess.

**Latency**
In a playground, a 5-second response can feel fast. In production, it can be unacceptable. Sub-second requirements need smaller models, pre-computation, caching, or a routing layer that avoids calling the LLM for low-impact cases. **Latency budgets must be defined before you design the prompt chain.**

**Cost per call**
LLMs are metered services. A verbose prompt or excessive chaining can multiply costs at scale. Monitor cost per thousand requests alongside quality.

**Prompt drift and versioning**
LLMs are not deterministic in the way classical models are. If prompts are tweaked without control or versioning, you have no baseline to diagnose regressions. Version prompts like code. Just as you monitor hyperparameters and ML models for performance drift, you will need to monitor prompts and their outputs over time.

**Output guardrails and failover**
Relying on a single API endpoint is asking for trouble. Engineering systems are built on redundancy. LLM systems need the same: guardrails that catch bad or unsafe responses, adversarial probing before launch, and fallback logic when the primary model is slow or fails.

---

## How DS skills transfer directly

| Classical DS | LLM systems |
|--------------|-------------|
| Feature engineering | Context design and prompt construction |
| Pipeline sequencing | Prompt chaining and orchestration |
| Model evaluation | Prompt evaluation, golden sets, LLM-as-judge |
| Performance monitoring | Output monitoring, drift detection, cost tracking |
| A/B testing | Prompt A/B experiments |

A good ML pipeline sequences data preparation, model training, and evaluation. A good LLM pipeline sequences prompts, tool calls, validation steps, and downstream integrations. The discipline is the same. The vocabulary is different.

---

## Closing thoughts

Prompting is plumbing. It is necessary, but it is not the house.

The impact comes from **designing systems that are reliable, safe, and repeatable** — from understanding the constraints, defining the evaluation, building the monitoring, and making deliberate decisions about what goes into context and what stays out.

That is not a new skill. That is data science applied to a new surface.

*Continues in [Part 4: The science we can't afford to lose](./part-4-the-science-we-cant-afford-to-lose.md)*
