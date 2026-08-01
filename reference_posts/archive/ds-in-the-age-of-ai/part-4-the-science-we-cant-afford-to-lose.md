---
title: "Data Science in the age of AI (part 4): The science we can't afford to lose"
subtitle: "Why rigour, reproducibility, and depth matter more than ever in the age of GenAI."
author: Jose Parreño Garcia
published: 2025-12-06
source: https://joseparreogarcia.substack.com/p/protecting-data-science-rigour-in-genai-era
theme: genai-ai
type: series
series: DS in the Age of AI
series_part: 4
---

# Data Science in the age of AI (part 4): The science we can't afford to lose

*Why rigour, reproducibility, and depth matter more than ever in the age of GenAI.*

*Part 4 of the "Data Science in the Age of AI" series.*

---

This week I reviewed a set of experiments that looked, on the surface, like a success. The problem is that they weren't. And the reason for the mismatch is the speed at which non-technical people are now releasing A/B tests — or not even those — because LLMs increase everyone's prototyping speed.

We have all experienced how LLMs let us produce analysis, prototypes, even statistical tests in minutes. That is remarkable. But it also means it is easier than ever to get something that **looks rigorous without the work that makes it so.**

This is the risk we are running in the GenAI boom. We are sprinting towards results, but skipping the parts of the discipline that made data science valuable in the first place. This post is about those parts — the science we cannot afford to lose.

---

## What is getting lost in the hype

There are parts of the craft that rarely make headlines but form the backbone of trustworthy data science. They are not glamorous, and they do not produce instant demos, but without them the work is fragile.

**Experimentation design and statistical rigour**

If you run 30 A/B tests without proper statistical control, those 30 tests will probably be useless. Or worse, you will make over-optimistic or under-realistic decisions which will cost you money or opportunities to grow. The discipline of setting up a test correctly — choosing metrics upfront, controlling for confounders, deciding on sample sizes before seeing results — is what makes conclusions actionable.

**Interpretability and model understanding**

I have had to explain what our ML models are doing to non-technical stakeholders many times. Not as a chore — I have learnt so much trying to dissect predictive models. It helps the business have higher confidence in our work, and it helps us make more improvements.

What happens when teams copy a model from ChatGPT or a blog post and deploy it? A model can be in production without anyone being able to explain its edge cases or biases. That makes it harder to debug, and far riskier to trust. If you are in financial services, good luck telling a regulator that because ChatGPT moves you faster, explainability has been skipped.

With ML, we already have techniques like ICE plots, partial dependence plots, and SHAP. What will we do when production systems are built on GenAI? We need data scientists developing techniques to better understand and control generative systems.

**Mathematical intuition**

Many new practitioners no longer understand the maths behind the most common ML algorithms. The emphasis has shifted from "what is right for this context" to "what worked for someone else."

I have seen this in interviews. Candidates who cannot explain how a decision tree works, how to regularise different algorithms, what to do with high-cardinality categorical features, or why certain activation functions are used. I don't expect a perfect textbook explanation — I myself can't remember specific formulas — but I do expect a baseline understanding. Without it, data scientists are not much more than configuration managers.

**Data quality and pipeline ownership**

LLM-generated code runs. It produces output. And it is wrong. Every data scientist has had to rework pipelines to handle new data sources with different date formats, key columns that suddenly contained duplicates, upstream schema changes that arrived without warning. These issues are hard enough to catch when you built the pipeline yourself. They are far harder when the code was generated for speed, contains no validation steps, and nobody feels ownership of it.

The risk here is not that we forget these skills entirely. It is that we slowly stop practising them, until they are no longer the reflex they should be.

---

## Why this still matters (and always will)

Just because a tool can produce something fast does not mean it is correct. In data science, **trust cannot be a by-product of speed.** It is earned through correctness, reproducibility, and careful design.

Many of the systems we work on have a high cost of getting things wrong. Pricing engines, search ranking models, recommendation systems, fraud detection — they all have real consequences when they fail. A bad decision in a sandbox prototype might only waste a day. A bad decision in production can erode revenue, damage customer trust, or in some industries, break the law.

**Reproducibility** is non-negotiable. If you cannot re-run an analysis and get the same results, it is not built on scientific foundations. LLMs can draft entire notebooks in minutes — which is why I worry that we are starting to rely on that too much and forgetting about reproducibility. A future you — or a colleague — will have no way of knowing how a result was produced unless all the steps, thinking points, and assumptions are documented.

**Careful design** is what keeps analysis from becoming an exercise in confirmation bias. Without predefined metrics, proper controls, and an understanding of the limits of your data, you can always find a chart that "proves" the point you want.

---

## It is not about doing things slower, but doing them deeper

Rigour is often mistaken for slowness. The goal is to ensure that thinking is deep enough that the result can be trusted.

Think of **rigour as the immune system of data science**. It exists to detect and neutralise bad signals before they cause damage. You can get away without it for a while, just as you can go years without catching a serious illness. But when the wrong pathogen arrives — a flawed experiment, a data pipeline bug, an unnoticed segment bias — that immune system is the only thing standing between a small error and a costly failure.

The irony is that deeper thinking often makes execution faster in the long run:
- The extra day spent defining the right metric saves weeks of misdirected optimisation
- The careful up-front validation of a dataset prevents months of debugging model drift
- The habit of double-checking statistical assumptions means fewer embarrassing reversals when stakeholders ask awkward questions

Take inspiration from Einstein: E=MC² is insultingly simple, but there is an enormous amount of knowledge crammed into that formula. Scientific depth can be simple too.

---

## Why it is more important now, not less

LLMs have made it easier than ever to look competent. With a well-crafted prompt, anyone can generate a convincing experiment write-up, a model pipeline, or a statistical test. On the surface, it can look indistinguishable from the work of an experienced data scientist.

The problem is that **"looks impressive" is not the same as "is correct."** LLMs can produce results that are confidently wrong. Unless you know what to look for, these flaws are easy to miss.

In this environment, scientific thinking becomes the last line of defence. It is the ability to challenge assumptions, question whether a result makes sense in context, and test whether the same conclusion holds under different conditions. It is the habit of asking: *If this is wrong, how would I know?*

When output is cheap, the bottleneck shifts to evaluation. That is where the value of an experienced data scientist **increases**, not decreases. Knowing how to stress-test a model, identify failure modes, and detect spurious signals is what stops bad ideas from making it to production.

---

## What we should defend and evolve

Speed is a gift — it gives us room to test more ideas and respond to new information. But **speed without depth is a liability.**

What we should defend:
- The discipline of experimentation design and analysis
- The standards for evaluation that make a result reproducible and credible
- The audit trails that allow anyone to retrace how a conclusion was reached
- The use of domain knowledge to make trade-offs that a generic approach would miss

What we should evolve is *how* we practise them in a world with LLMs: adapting explainability techniques to generative systems, designing new validation methods for non-deterministic outputs, and integrating automated checks into faster pipelines.

The future of data science will almost certainly include LLMs. They are already changing how we write code, summarise results, and even design experiments. But **they do not remove the need for statisticians, critical thinkers, and careful architects. If anything, they make those roles more central.**

*Continues in [Part 5: The future hybrid](./part-5-the-future-hybrid.md)*
