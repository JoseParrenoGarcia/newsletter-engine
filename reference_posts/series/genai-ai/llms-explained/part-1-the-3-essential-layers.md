---
title: "LLMs explained (Part 1): The 3-layer framework behind ChatGPT & friends"
subtitle: "A practical breakdown of how language models generate text, learn patterns, and improve."
author: Jose Parreño Garcia
published: 2025-04-05
source: https://joseparreogarcia.substack.com/p/how-llms-work-part-1-the-3-essential-layers
theme: genai-ai
type: series
series: LLMs Explained
series_part: 1
inspired_by: "Andrej Karpathy's 'Deep Dive into LLMs like ChatGPT'"
---

# LLMs explained (Part 1): The 3-layer framework behind ChatGPT & friends

*A practical breakdown of how language models generate text, learn patterns, and improve.*

*Part 1 of the "LLMs Explained" series. Inspired by Andrej Karpathy's 3+ hour deep dive into LLMs.*

---

There are two kinds of people in AI: those who think they understand LLMs, and those who have watched a Karpathy deep dive.

If you don't know who Karpathy is: he helped build OpenAI's GPT models, taught at Stanford, and wrote some of the most influential papers on deep learning. Not just brilliant — but able to explain complex ideas to the rest of us. I thought I understood LLMs. Then I watched his video. For the first time, it actually clicked.

This is a series of posts sharing the key takeaways from that tutorial. My goal: distil 3+ hours into something you can absorb in minutes per post.

---

## The 3-layer analogy: predicting house prices

Building an LLM follows the same 3-step logic as any ML model — just much bigger, more expensive, and requiring a ridiculous amount of data and compute. Before the 3 LLM stages, let's map them to something familiar: **predicting house prices**.

1. **Collect data.** House prices, characteristics (bedrooms, year built), neighbourhood features, risk factors.
2. **Build a baseline model.** Captures initial patterns — e.g. price increases with bedrooms, but only for post-1985 builds.
3. **Improve with more sophisticated techniques.** Hyperparameter tuning, better algorithms to handle nuances.

LLMs follow the exact same logic. The techniques are more complex. The fundamentals are identical.

---

## Layer 1: Data collection — the entire internet

LLMs are trained on a massive corpus of text scraped from the internet. The big players (OpenAI, Anthropic) run their own proprietary crawlers. Open-source alternatives like CommonCrawl make this data accessible.

The amount of processing required to clean this data is staggering. HuggingFace's FineWeb dataset — built from CommonCrawl — gives a public example of the cleaning pipeline: deduplication, quality filtering, language detection, content filtering.

The top-tier labs have proprietary versions of all of this. But the goal is the same: **end this phase with a massive amount of high-quality text.**

[Visual: diagram | CommonCrawl / HuggingFace FineWeb | process illustration — cleaning pipeline steps showing data quality score improvements at each stage]

---

## Layer 2: Training the baseline model — gigantic neural network

Once clean data exists, it becomes training material for a baseline LLM. Two steps:

**Step 1 — Tokenization:** Text is converted into numbers. Letters (or combinations of letters) become tokens, because numbers are what the machine understands.

[Visual: diagram | post figure | tokenization example — showing raw text converted to token IDs]

**Step 2 — Training a gigantic neural network:** Billions of parameters, trained to do one thing: **predict the next most likely token** given all the tokens before it.

That's it. The entire training objective is: given this sequence of text, what word comes next?

The transformer architecture (the "T" in GPT) handles the processing. The attention mechanism — the key innovation — lets the model weigh how relevant each previous token is for predicting the current one. This is a black box under the hood, but conceptually: it's pattern recognition at a massive scale.

**The result: a model that sounds coherent but is mostly useless.** It's a glorified autocomplete. Give it a prompt and it continues the text statistically. Ask it a question and it might "answer" by generating the most statistically likely continuation — which is often made-up nonsense.

[Visual: screenshot | post demo | comparison — Llama3 8B baseline model making things up vs DeepSeek fine-tuned model giving a useful answer]

---

## Layer 3: Fine-tuning and guardrails — making it useful

The baseline model needs to be reshaped into something that actually helps users. This is done through:

**Supervised fine-tuning (SFT):** Training on examples of good question-answer pairs, conversation turns, and task completions. This teaches the model *how to behave*, not just how to predict text.

**RLHF (Reinforcement Learning from Human Feedback):** Human raters compare model outputs and rank them. The model is trained to maximise human preference scores. This is what makes a model genuinely helpful, harmless, and honest rather than just statistically coherent.

**Guardrails:** Rules, filters, and safety measures that prevent the model from producing harmful, false, or off-topic outputs.

*We will cover fine-tuning in detail in Part 4 and RLHF in Part 6.*

---

## Key takeaways from Part 1

- **LLMs are not intelligent — they are statistical beasts.** They predict the next most likely word based on vast training data. Think statistics on steroids.
- **Building an LLM follows the same 3-step logic as any ML model:** collect data → train baseline → improve with fine-tuning.
- **Baseline models sound coherent but are mostly useless.** Predicting the next word makes them sound real, but they lack task understanding.
- **Fine-tuning is what makes the difference** between a model that hallucinates and one that actually helps.

*Continues in [Part 2: How LLMs collect and clean training data](./part-2-data-collection-and-cleaning.md)*
