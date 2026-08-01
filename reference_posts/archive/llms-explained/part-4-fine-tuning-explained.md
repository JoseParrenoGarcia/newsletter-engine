---
title: "LLMs explained (Part 4): Making LLMs actually useful through fine-tuning"
subtitle: "How models go from glorified autocomplete to real-world assistants — and where they still fail."
author: Jose Parreño Garcia
published: 2025-05-17
source: https://joseparreogarcia.substack.com/p/llms-explained-part-4-llm-fine-tuning-how-it-works
theme: genai-ai
type: series
series: LLMs Explained
series_part: 4
---

# LLMs explained (Part 4): Making LLMs actually useful through fine-tuning

*How models go from glorified autocomplete to real-world assistants — and where they still fail.*

---

In Part 3, we saw that a baseline LLM is just a glorified autocomplete machine — it predicts the next token, sounds coherent, and hallucinates freely. Fine-tuning is the process that turns it into something useful.

But fine-tuning isn't a magic fix. So how does it actually work? And where does it still go wrong?

---

## What "helpful" actually means

Rather than assuming what helpful means, OpenAI explicitly defines it in their InstructGPT paper (*"Training language models to follow instructions with human feedback"*). They describe 3 characteristics of how an LLM should behave:

1. **Helpful.** Follow the user's intent, provide concise and clear responses, without unnecessary repetition or assumptions.
2. **Truthful.** Avoid fabricating information, maintain factual accuracy, and correct misleading premises rather than reinforcing them.
3. **Harmless.** Do not generate harmful, biased, or unethical content. Treat all users with fairness and respect.

This is the target. Fine-tuning is how you get there.

---

## Fine-tuning ≠ retraining from scratch

Training the baseline LLM can take months and tens of millions of pounds. We do not want to re-run this exercise to make the model helpful. Instead, fine-tuning uses **transfer learning**.

Think of transfer learning like training a skilled writer to become a legal expert. They already know how to write well (pre-training), but with some focused study in law (fine-tuning), they can specialise in legal writing without relearning basic grammar and vocabulary.

### How it works technically

Inside the neural network, layers have different roles:
- **Early layers (Green)** → learn token embeddings, sentence structure, fundamental syntax
- **Middle layers (Yellow)** → capture higher-order linguistic relationships, grammar, context
- **Later layers (Red)** → specialise in task-specific details — user intent and nuanced meaning

**Fine-tuning freezes the early layers** (preserving general language knowledge) and **updates the later layers** on a new, curated dataset of instruction-response pairs.

The training data format is conversation-like:
```
Human: [question or instruction]
Assistant: [high-quality human-written answer]
```

The model learns — not just from the content of answers, but from the *pattern* of being an assistant: following instructions, clarifying ambiguity, and staying on topic.

[Visual: diagram | post figure | layer freezing — showing which layers are frozen vs updated during fine-tuning]

---

## Where fine-tuning still fails

Fine-tuning is a major improvement over the baseline, but it has clear limits.

**Case 1: Fabrication**

Early fine-tuned LLMs couldn't distinguish what they didn't know. When asked about a completely made-up event, smaller models (like Falcon-7B-Instruct) confidently make up a plausible-sounding answer. Larger, better-trained models (like Llama-3.3-70B-Instruct) have learned to say "I don't know given my knowledge cutoff" — but this is learned behaviour from extensive training, not true understanding.

[Visual: screenshot | post demo | comparison — Falcon-7B fabricating an answer to a made-up event vs Llama-3.3-70B correctly declining]

**Case 2: Basic maths**

It's counterintuitive: models that answer complex philosophical or technical questions competently can fail at simple arithmetic when asked to solve it in one step. This happens because LLMs generate tokens *sequentially* — they don't "calculate", they pattern-match. When forced to produce an answer without intermediate reasoning steps, they often get it wrong.

*Part 5 covers how tools (like code execution) help solve this.*

---

## Key takeaways from Part 4

- **Fine-tuning adapts a pre-trained model** to follow instructions and behave helpfully — without retraining from scratch.
- **Transfer learning** freezes general language knowledge in early layers, then updates later layers on curated instruction-response data.
- **The goal is helpful, truthful, and harmless** — explicitly defined by OpenAI in InstructGPT.
- **Fine-tuning is not a magic fix.** Models can still fabricate, fail at maths, and behave inconsistently.
- **Human feedback is what makes fine-tuning work** — the quality of the human-written training examples directly determines the quality of the fine-tuned model.

*Continues in [Part 5: How LLMs use tools to reduce hallucinations](./part-5-tools-to-reduce-hallucinations.md)*
