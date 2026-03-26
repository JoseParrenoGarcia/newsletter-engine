---
title: "Data Science in the age of AI (Part 2): If everyone can build a model, what are Data Scientists for?"
subtitle: "Shipping a model is the easy middle step. The hard work happens before and after."
author: Jose Parreño Garcia
published: 2025-10-18
source: https://joseparreogarcia.substack.com/p/value-of-data-science-beyond-model-building
theme: genai-ai
type: series
series: DS in the Age of AI
series_part: 2
---

# Data Science in the age of AI (Part 2): If everyone can build a model, what are Data Scientists for?

*Shipping a model is the easy middle step. The hard work happens before and after.*

*Part 2 of the "Data Science in the Age of AI" series. [Part 1](./part-1-your-job-isnt-to-build-models.md) covered what LLMs have changed for individual data scientists.*

---

## Anyone can build a model… but then what?

Large language models have made it possible for engineers, analysts, and product managers to build a machine learning model without ever touching a data science team. A few prompts, a handful of code snippets, and a working notebook later — they have something that runs.

This week I spoke with an engineer who had built an anomaly detection model for one of the services they manage in their spare time. The goal was simple: generate alerts when unusual patterns appeared in service metrics. Nothing customer-facing, no direct impact on revenue, and a human still in the loop to decide whether to act.

The risks were minimal — and yet, not long ago, even this type of small tool would have needed a data scientist to scope the problem, select the features, and shape the evaluation. Now it didn't.

We should not dismiss this. In many cases, these models will work well enough to pass a quick test. They might even solve the immediate problem, at least on the surface.

**But there is a gap between something that runs and something that delivers value.** Shipping a model is not the same as solving the problem.

---

## What this post covers

- Why a working model is not the same as a working system
- What the real work looks like before and after the model exists
- Where data scientists are still irreplaceable
- Why the risk is not replacement — it's irrelevance

---

## The real work starts after the model is built

Once a model exists, the easy part is over. Turning that model into something that works in production is where much of the effort, risk, and cost actually sits. Production-grade ML systems demand far more than accuracy on a test set:

**Conditions to run it right:**
- Monitoring and alerts to track data drift, performance degradation, and unusual outputs
- Data quality checks on both the training pipeline and the data being fed to the model at inference time

**Knowledge to build it right:**
- Segment-wise debugging to see where the model fails for certain users or markets — this is what makes you stand out as a data scientist, because you don't focus only on high-level metrics
- User behaviour analysis to confirm that model outputs actually influence the product in the intended way

This is not the part that LLMs automate. This is the part that requires someone who understands both the system and the business context.

---

## The real work also happens before the first line of code

Before the model, when the problem is messy and undefined:

- What metric are we actually trying to move, and why?
- Is this a prediction problem, a prioritisation problem, or a classification problem?
- What data do we have, and what biases does it carry?
- What does a failed experiment look like — and how will we know?

These questions cannot be answered by an LLM. They require contextual knowledge of the business, the product, and the users. They require the ability to push back when the question is framed incorrectly.

---

## Where data scientists are still irreplaceable

The parts of the system that are hardest to get right — and that require deep expertise:

1. **Deciding what to build.** When the business problem is ambiguous, data scientists translate it into something testable. That translation is not trivial.

2. **Evaluation design.** Choosing the right metrics, the right test population, the right baseline. Most model failures are failures of evaluation design, not model architecture.

3. **Understanding failure modes.** A model that performs well on average but fails badly on a specific segment is a liability in production. Finding and explaining those failure modes is expert work.

4. **Context for what models know.** In a world of LLM-powered systems, data scientists can lead in shaping what models actually know — the context, the constraints, the domain understanding that makes them useful and trustworthy.

My view: businesses will still need experts to design, build, and maintain these systems. The question is whether data scientists claim that role or get sidelined into low-value work — cleaning up after tools they did not design.

---

## Closing thoughts

If large language models make it possible for almost anyone to build a model, then good. Let them. The more people who can experiment with predictive and generative systems, the more ideas will surface.

But building a model is not the end of the journey. It is the easy middle step.

Data scientists still play a critical role **before** the first line of code is written, when the problem is messy and undefined. We also matter **after** the model exists, when the hard operational work begins.

I don't think AI will replace data scientists. But if data scientists are not careful, the risk is that we will be sidelined into low-value work. **The opportunity is to claim the parts of the system that are hardest to get right.**

*Continues in [Part 3: Prompting is not building AI systems](./part-3-prompting-is-not-building-ai-systems.md)*
