---
title: "DS in the age of AI: Your job isn't to build models; it's to solve problems."
subtitle: "LLMs have automated the scaffolding. What remains is the work that actually matters."
author: Jose Parreño Garcia
published: 2025-10-04
source: https://joseparreogarcia.substack.com/p/not-just-code-data-science-llms
theme: genai-ai
type: series
series: DS in the Age of AI
series_part: 1
---

# DS in the age of AI: Your job isn't to build models; it's to solve problems.

*LLMs have automated the scaffolding. What remains is the work that actually matters.*

*Part 1 of the "Data Science in the Age of AI" series.*

---

LLMs have already reshaped what it means to be a data scientist. They have taken the scaffolding — the boilerplate, the translation, the setup — and made it instant. For many, this feels threatening. I see it as an amazing opportunity.

**What we will cover:**
- What LLMs can and can't do for data scientists
- The skills that remain genuinely valuable
- A word of caution for junior data scientists
- Why this shift is an opportunity, not a threat

---

## What LLMs have changed

The tasks that used to consume hours of a data scientist's day:
- Writing standard ML pipeline code
- Converting between data formats
- Generating docstrings and documentation
- Setting up boilerplate feature engineering

These are now instant. LLMs do them well. Fighting that reality is a waste of energy.

But here's what LLMs have also done: they've raised the floor for everyone. Someone with minimal DS experience can now produce something that *looks* like a working ML pipeline in minutes. The output looks competent. It may even run.

**Looking competent and being competent are not the same thing.**

---

## What the real DS work actually looks like

The reality is that after the boilerplate is gone, the real work starts to happen. The skills that now define whether your work lands or gets lost:

**Clear problem framing**
*"What exactly are we trying to improve? Who defines success? Is this a prediction problem or a prioritisation one?"*

**Smart metric selection and segmentation**
You don't just report an uplift. You know to break it down by country, device, acquisition channel — and explain why one segment went backwards.

**Translating business ambiguity into testable hypotheses**
Stakeholder says: *"Make the homepage smarter."* You turn that into: *"Would we like to predict whether a user prefers deals vs discovery and personalise accordingly?"*

**Stakeholder alignment and prioritisation**
When resources are tight, you know how to define feasibility and potential from a Data Science point of view. This is what helps stakeholders align with your decisions and trust you.

These were bonus skills a few years ago. Today, they define the job.

---

## What neither LLMs nor AutoML can do

- Understand *why* a segment is underperforming and what to do about it
- Navigate organisational ambiguity to get a project approved
- Push back on a business question that's framed incorrectly
- Know when a model result is technically correct but practically useless
- Design an experiment that will actually answer the question being asked

These require contextual judgment — accumulated over time, through exposure to real decisions and their consequences. That is what makes a data scientist genuinely valuable.

---

## A word of caution for junior data scientists

If you are early in your career, LLMs can feel like magic. They help you move faster, unblock problems, and build things you might not have known how to start from scratch. That is powerful. But it can also be misleading.

**Just because something works doesn't mean you understand it.** And if you rely too heavily on the LLM to generate your code, you might skip the hard and essential process of learning how to reason through problems yourself.

Be careful not to replace deep understanding with speed of delivery. Common failure modes:

- Using the wrong evaluation metric for the business question
- Including target leakage without realising it
- Ignoring broken segment performance because overall results look good
- Misusing imputation or one-hot encoding in a way that quietly skews results
- Using incorrect transformations for certain distributions
- Assuming that anything returned by an LLM is a best practice (it's often not)

The moment will come when someone asks: *"Why did you choose this model?"* or *"Why is this segment underperforming?"* or *"Can we trust this result in production?"*

You cannot say *"Well, ChatGPT wrote it."*

Treat LLMs like a junior colleague with a fast brain and questionable judgment. Check their work. Ask questions. Read every line before you run it. Try to break it. And when something feels off, dig deeper.

---

## Closing reflection

The job is changing. Not in the future. Right now.

In a world where code is cheap and context is everything, **clarity, judgment, and domain understanding are your competitive advantage.**

So use the machine. Let it make you faster. But don't let it make you passive.

You are not here to write boilerplate.

**You are here to solve problems.**
