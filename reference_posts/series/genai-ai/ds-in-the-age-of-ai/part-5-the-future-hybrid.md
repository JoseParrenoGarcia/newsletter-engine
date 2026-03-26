---
title: "Data Science in the age of AI (part 5): The future hybrid."
subtitle: "Agents will not replace us. But they will change how we work — and the opportunity is to become more powerful, not redundant."
author: Jose Parreño Garcia
published: 2025-12-27
source: https://joseparreogarcia.substack.com/p/future-hybrid-data-science-ai-agents
theme: genai-ai
type: series
series: DS in the Age of AI
series_part: 5
---

# Data Science in the age of AI (part 5): The future hybrid.

*Agents will not replace us. But they will change how we work — and the opportunity is to become more powerful, not redundant.*

*Part 5 and final part of the "Data Science in the Age of AI" series.*

---

## What this post covers

- What "hybrid systems" really means in practice
- 5 concrete examples of how agents extend data science work
- The mindset shift from builder to architect, coder to coordinator
- Why the future is not solo, but hybrid

---

## What do we mean by hybrid systems?

Think about the moving parts of a modern data science stack. You already have monitoring pipelines, audit logs, feature stores, model explainability, decision dashboards, and business workflows that connect to stakeholders. Each of these is carefully curated based on scientific principles and deep focus (as we discussed in Part 4). **This should not change.**

But what if you could enhance each of these touch points? What if you could create small AI tools or AI agents that plug into these "boxes" with very specific goals?

That is what hybrid means: a classical DS workflow, each step augmented by a companion agent. In all cases, the goal is **amplification, not replacement**. Agents do the repetitive execution and exploration, while the data scientist maintains focus on rigour, judgement, and impact.

---

## 5 examples of future-proof hybrid systems

### Example #1. Experimentation agents

Running trustworthy experiments is one of the most valuable — and most time-consuming — responsibilities of a data scientist. The checklist from Part 4 showed how many small steps are required to avoid false signals: metric selection, power analysis, avoiding peeking, handling multiple comparisons.

An experimentation agent sitting alongside the scientist (or a less technical person) could automatically:

- Review experiment definitions and flag if the primary metric or hypothesis haven't been clearly declared
- Run power calculations based on historical baselines and propose a minimum sample size — not once, but by simulating 25 scenarios across parameter combinations
- Monitor for peeking or early stopping violations during the experiment
- Summarise results at completion, flagging segment anomalies and suggesting follow-up investigations

The data scientist still designs the experiment and interprets the conclusions. The agent ensures the scaffolding is correct.

### Example #2. Monitoring copilots for ML systems

If experimentation is the immune system of product development, monitoring is the immune system of ML in production. Once a model is live, you are no longer protecting against false signals in a controlled test — you are protecting against drift and degradation.

Classical monitoring frameworks cover latency, throughput, error rates, and performance drift across key KPIs. But in practice, monitoring is often limited to the most obvious segments, and alerts are defined narrowly. Anything outside that space risks being invisible until it causes damage.

A monitoring copilot could extend the scientist's reach:

**Administrative checks:**
- Quality assurance on model metadata: are models correctly tagged "Staging" vs "Production"?
- Verification of registration and lineage in the model catalogue (e.g. Unity Catalog in Databricks)

**Performance monitoring:**
- Automatic breakdown of model performance across segments the scientist hasn't explicitly defined
- Flagging of weak signals — not just P0 alerts, but early indicators of emerging issues

The copilot ensures that weak signals do not go unnoticed. Monitoring copilots allow us to scale evaluation across dimensions that no single person could review consistently.

### Example #3. Chatbot interfaces over performance data

One of the most time-consuming parts of being a data scientist is answering recurring performance questions. Most requests are answered through dashboards or ad-hoc queries — often by the data scientist writing SQL or slicing results directly.

A chatbot interface layered on top of performance data changes that dynamic. Imagine an agent wired into your data warehouse and experiment logs, with a predefined set of safe queries and guardrails. A product manager could ask:

- *"How did conversion rate change in Spain last week compared to baseline?"*
- *"Show me the retention split by device type for the last experiment."*

The agent translates the request into SQL, fetches results, and presents them in natural language with a chart.

**Benefits:**
- Stakeholders self-serve without waiting on ad-hoc data pulls
- Weekly review meetings become faster
- Anomaly investigations are quicker, with follow-up questions asked directly in chat
- Data scientists spend less time writing one-off queries and more time interpreting whether results actually matter

**Important caveat:** this needs constraints — cleaned data sources, predefined metrics, strict query templates, and output validation. The role of the data scientist is to design the sandbox: define what questions can be asked, ensure the logic behind each metric is correct, and validate that the agent surfaces trustworthy results.

*(Jose's note: I tried Databricks GenieAI for this. Conceptually promising — you can add metadata to tables, write pre-defined queries as examples, and peer-review outputs. But the product felt very early. Still, the direction is clear.)*

### Example #4. Explainability and insight copilots

Data scientists spend a significant share of time dissecting models — segment by segment, feature by feature — to answer that "why":

- What are the most important features?
- Why is a certain segment showing poor predictive performance?
- How do features correlate with each other?

Explainability techniques already exist: SHAP, PDPs, ICE plots, error breakdowns, lift charts. But using them effectively takes time, and translating them into a story a non-technical audience can follow takes even more. Much of this effort falls on the data scientist manually preparing plots, slides, and narratives.

An explainability copilot could draft the first pass:

- Takes SHAP or PDP inputs as context to understand model behaviour
- Breaks down errors by geography, device, or traffic source — highlighting where the model is weakest
- Compares performance before and after retraining to identify what changed
- Drafts a narrative in plain language: *"Model A improved accuracy in mobile traffic due to Feature X, but performance in Spain declined due to distribution shift in Feature Y."*
- Suggests representative examples or counterfactuals, and generates synthetic data to stress test the model under specific scenarios

### Example #5. Assistants for recommender systems and auction platforms

Some of the most complex systems in data science deal with allocation: recommenders that decide which product to show, or auction systems that decide what bid to place. These systems combine multiple moving parts — predictive models, heuristics, business rules, feedback loops, and performance guardrails. Managing them is full of trade-offs.

AI agents could be built for a proper simulation environment, helping data scientists manage their ML models much better:

- Reviews past system behaviour, explaining why a recommender favoured certain items or why an auction strategy under-delivered in a segment
- Simulates parameter regimes or user personas across multiple combinations, showing how each impacts business KPIs like revenue, margin, or fairness
- Surfaces trade-offs between competing objectives (accuracy vs diversity in recommenders, or ROAS vs coverage in auctions)

A GitHub initiative is already exploring this: recommender AI agents that combine LLM reasoning with in-domain structure, where LLMs serve as the reasoning brain and standard recommender models act as the tools.

---

## The mindset shift for data scientists

The shift ahead is not about whether you can code faster, or spin up another model with fewer lines. That is already being automated. The shift is about **how you design systems** that combine models, rules, people, and agents into something that works reliably in production.

This is less about being the person who builds every component, and more about being the architect who knows how those components fit together.

For many of us, that means moving from:

| From | To |
|------|----|
| Builder | Architect |
| Coder | Coordinator |
| Reporter | Synthesiser of insights |

The endgame is not to hand over decisions to agents. Right now, the goal is to build systems where agents handle the repetitive execution and exploration, while you keep focus on rigour, judgement, and impact.

---

## Closing reflection

Large language models will not replace data scientists. But **agents — well-built, well-integrated agents — will change how we work.**

Think of them as tools that, when paired with scientific judgement and domain context, allow us to:
- Scale rigour
- Broaden monitoring
- Accelerate experimentation
- Surface insights that would otherwise be hidden

The opportunity is to become more powerful, more scalable, and more strategic — to move beyond being the person who writes the code, to being the architect of hybrid systems that can stand the test of real-world complexity.

**That is the future: not solo, but hybrid.**
