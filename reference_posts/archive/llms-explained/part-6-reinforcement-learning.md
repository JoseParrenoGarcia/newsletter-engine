---
title: "LLMs explained (Part 6): Smarter AI through Reinforcement Learning"
subtitle: "Why fine-tuning is not enough and how reinforcement learning with human feedback shapes smarter models."
author: Jose Parreño Garcia
published: 2025-06-21
source: https://joseparreogarcia.substack.com/p/llms-explained-part-6-smarter-ai-through-reinforcement-learning
theme: genai-ai
type: series
series: LLMs Explained
series_part: 6
---

# LLMs explained (Part 6): Smarter AI through Reinforcement Learning

*Why fine-tuning is not enough and how reinforcement learning with human feedback shapes smarter models.*

*Part 6 and final part of the "LLMs Explained" series.*

---

Throughout this series, we have explored every major phase of building an LLM:
- Collecting and cleaning data
- Training a baseline model and tokenisation
- Fine-tuning to make models more useful
- Reducing hallucinations with tools

Now, in this final part, we go **beyond training**. Fine-tuning gets models far — but it has limits. It cannot teach a model to generalise preferences, adapt to complex human intent, or make better long-term decisions.

That is where **Reinforcement Learning with Human Feedback (RLHF)** comes in.

---

## Why fine-tuning has limits

Supervised fine-tuning (SFT) trains the model on examples with correct answers. For many tasks, this works well. But for open-ended tasks — writing, summarisation, reasoning, conversation — there is **no single correct answer**. Correctness is subjective.

If an LLM generates a summary of an article, some summaries focus on key facts, others on writing style, others introduce biases. There is no fixed label to learn from.

---

## Reinforcement Learning for objective tasks first

Before RLHF, there is a simpler application of reinforcement learning: **tasks with verifiable right/wrong answers**.

For maths problems, code generation, and logical puzzles, the model can generate multiple answers, check them against a verifier (e.g. a Python interpreter, a unit test), and receive a binary reward: correct or incorrect.

This **Reinforcement Fine-Tuning (RFT)** lets the model discover better strategies for arriving at correct answers — beyond just pattern-matching the training examples. It's how models like DeepSeek achieved surprising reasoning improvements without massive compute scaling.

---

## RLHF for open-ended answers

For tasks where correctness is subjective, RLHF introduces **human labellers as verifiers**:

### The 3 RLHF steps

**Step 1: Generate multiple responses**

The LLM is asked to summarise an article or answer an open-ended question. Instead of producing 1 response, it generates several different versions — e.g. 7 different summaries.

**Step 2: Human labellers rank the responses**

Labellers review the responses and score them across multiple dimensions (e.g. clarity, factuality, coherence, helpfulness). They rank responses from best to worst — rather than marking any as strictly "correct" or "incorrect."

**Step 3: Train a reward model, then fine-tune via PPO**

A **reward model** — a separate neural network — is trained to predict human rankings. Given a set of responses, it learns which features make an answer more likely to be ranked highly.

Once the reward model can predict human preferences reliably, it is used to fine-tune the LLM using **Proximal Policy Optimisation (PPO)**. The LLM adjusts itself to maximise the reward model's predicted score, improving responses dynamically over time.

[Visual: diagram | OpenAI ChatGPT paper | RLHF process — showing generate → rank → reward model → PPO fine-tuning loop]

---

## When does RL beat supervised fine-tuning?

There are 4 key scenarios where reinforcement learning outperforms SFT:

1. **Subjective quality tasks** — writing, summarisation, conversation, where human preference varies and no single label captures it
2. **Complex reasoning** — multi-step problems where the model needs to explore strategies, not just recall patterns
3. **Safety and alignment** — teaching models to refuse harmful requests or handle sensitive topics appropriately across diverse contexts
4. **Long-horizon tasks** — agentic settings where the model must make sequences of decisions and receive feedback at the end

[Visual: diagram | post figure | SFT vs RFT vs RLHF comparison — showing how each layer builds on the previous for more adaptive AI]

---

## Key takeaways from Part 6

1. **Fine-tuning has limits; RLHF fills the gaps.** SFT makes LLMs better at following instructions, but it cannot teach models to generalise preferences or adapt to subjective tasks.
2. **RLHF replaces fixed labels with human preference rankings.** A reward model learns to predict what humans prefer, then guides the LLM through reinforcement learning.
3. **PPO is the optimisation algorithm** that adjusts the LLM to maximise the reward model's scores.
4. **When answers are verifiable, RFT is sufficient** — maths, code, logic. When they are not, RLHF is necessary.

---

## Series complete: the full LLM journey

Across 6 parts, we covered every major stage of building a modern LLM:

| Part | Topic |
|------|-------|
| 1 | The 3-layer framework: data → training → fine-tuning |
| 2 | Data collection and cleaning — garbage in, garbage out |
| 3 | Tokenization and baseline training — the probability machine |
| 4 | Fine-tuning — from autocomplete to helpful assistant |
| 5 | Tools — web search and code execution to reduce hallucinations |
| 6 | RLHF — aligning models with human preferences |

From raw internet text to a model that can reason, refuse harmful requests, and synthesise information from the web — that is the journey every modern LLM has taken.

The architecture is largely published. The data pipeline and training runs are the real competitive moats. And understanding this full stack is what makes a data scientist genuinely dangerous with these tools — rather than just a prompt writer hoping for the best.
