---
title: "LLMs explained (Part 3): From tokens to training — how a baseline LLM learns"
subtitle: "How raw text becomes numbers, why tokenization matters, and what an LLM actually learns when it starts from scratch."
author: Jose Parreño Garcia
published: 2025-05-03
source: https://joseparreogarcia.substack.com/p/llms-explained-part-3-tokenization-training
theme: genai-ai
type: series
series: LLMs Explained
series_part: 3
---

# LLMs explained (Part 3): From tokens to training — how a baseline LLM learns

*How raw text becomes numbers, why tokenization matters, and what an LLM actually learns when it starts from scratch.*

---

How does an LLM go from knowing nothing to generating text? What exactly is it learning? And why do even the largest models start as nothing more than predict-the-next-token machines?

---

## Tokenization: how text becomes data

Machines don't "see" text like we do. When we read *"Albert Einstein was a German-born theoretical physicist who developed the theory of relativity"*, we understand meaning — names, nationalities, scientific concepts. To a computer, this is just a sequence of characters: `A l b e r t …` That format is useless for ML.

**Machines need numbers.** Tokenization converts text into a numerical format where each unique token is assigned a numerical ID.

Tokens can be words, subwords, characters, or combinations. The most widely used method in modern LLMs is **Byte Pair Encoding (BPE)** — used by GPT models. BPE iteratively merges the most frequent pairs of characters or character sequences in the training corpus, balancing efficient representation of common words while handling rare or unknown words through subword splitting.

[Visual: screenshot | TikTokenizer demo | tokenization example — showing text broken into colour-coded tokens with their corresponding IDs]

**Key implication:** more tokens don't necessarily mean better performance. The quality and source of those tokens matters just as much — as we saw in Part 2, GPT-3 trusted Wikipedia sequences more than random internet text.

---

## What a baseline LLM is trained for

**Primary goal:** predict the next token correctly on any sequence. If you think about it, the golden star metric is to become the most perfected autocomplete tool in history.

**Not a goal:** being factual, being helpful, being safe. None of that. Just: what word is most likely to come next?

This is a purely statistical exercise. The model adjusts billions of parameters through backpropagation — comparing its predictions to the actual next token, computing a loss, and nudging the weights in the direction that reduces that loss. Repeat billions of times across the entire training corpus.

[Visual: screenshot | Karpathy tutorial | training progression — showing LLM output at 20 iterations (gibberish) vs 400 iterations (coherent but not factual)]

---

## Where the baseline model works and where it fails

**Where it works:** it regurgitates things from memory surprisingly well. Feeding the model an extract from Wikipedia and asking it to continue often returns text that closely mirrors the original source — because those exact token sequences appeared in training. The model has, in effect, memorised statistical patterns from vast amounts of text.

**Where it fails:** almost everywhere else. It sounds coherent, but it fabricates. Ask it a question and it continues the *statistical pattern of a question being answered* — not the actual answer. It has no concept of truth, no knowledge cutoff awareness, and no ability to say "I don't know."

This is why the baseline model is a necessary foundation but not a useful product.

---

## Training costs are astronomical

The compute required to train frontier LLMs is staggering. The top models are among the most compute-intensive projects in history. Training costs are the product of chip-hours × cloud rental rates — and the numbers run into hundreds of millions of dollars for the largest models.

The implication: until the technology is more democratised, we are in the hands of probably fewer than 20 companies worldwide who have the compute budget and data infrastructure to train frontier models from scratch. This is the real competitive moat — not the architecture, which is largely published — but the data pipeline and the training run.

---

## Key takeaways from Part 3

- **Tokenization is how raw text becomes data.** LLMs don't read words; they process tokens — subword units assigned numerical IDs.
- **BPE is the dominant tokenization method** for GPT-family models, balancing efficiency and handling of rare words.
- **A baseline LLM is a probability machine.** It learns to predict the next token based on statistical patterns in training data — not meaning or reasoning.
- **Baseline models sound coherent but hallucinate freely.** They have no concept of truth — only statistical likelihood.
- **Training costs are enormous** and concentrated among a very small number of organisations.

*Continues in [Part 4: Making LLMs useful through fine-tuning](./part-4-fine-tuning-explained.md)*
