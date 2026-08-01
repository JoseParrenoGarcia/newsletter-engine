---
title: "LLMs explained (Part 5): How AI uses tools to reduce hallucinations"
subtitle: "LLMs still make things up. Can web search and code execution fix that?"
author: Jose Parreño Garcia
published: 2025-06-07
source: https://joseparreogarcia.substack.com/p/llms-explained-part-5-how-llms-use-web-search-and-code
theme: genai-ai
type: series
series: LLMs Explained
series_part: 5
---

# LLMs explained (Part 5): How AI uses tools to reduce hallucinations

*LLMs still make things up. Can web search and code execution fix that?*

---

By now, we have covered how LLMs are built, trained, and fine-tuned. But even with all that effort, they still hallucinate. Fine-tuning helps — but it's not enough. The next step in making LLMs more reliable is giving them **tools**.

Two tools in particular: **web search** and **code execution**.

---

## Tool 1: Web search

### Why LLMs need external knowledge

A fine-tuned LLM has a knowledge cutoff. If you ask about recent events, it has two options: make something up, or admit it doesn't know. Neither is ideal.

Web search solves both the static hallucination problem (fabricating facts that are in its training window) and the dynamic knowledge problem (events after the cutoff).

### How web search works under the hood

When a user asks a question that triggers web search, the process is:

1. **Retrieve key passages** — the model extracts important snippets from search results
2. **Basic cleaning** — preprocessing similar to the data cleaning from Part 2, but simpler
3. **Tokenization** — the extracted text is converted into tokens and appended to the context
4. **Synthesise a final answer** — the LLM distils all retrieved data and generates a response

In other words: the LLM takes your input question, expands its context with additional retrieved text, and generates a more informed response. It's doing what you or I would do — opening multiple web pages, skimming them, and summarising the answer instantly.

[Visual: diagram | post figure | RAG/web search schematic — showing question → search → retrieve → tokenize → synthesize → answer flow]

---

## Tool 2: Code execution (Python interpreter)

### Why LLMs struggle with maths

In Part 4, we saw that LLMs fail at simple arithmetic when forced to answer in a single step. The reason: **LLMs are token predictors, not calculators**. They generate text based on probability — they don't actually compute.

When asked to solve a maths problem in one pass, the model needs to predict the exact token sequence of the correct answer in one shot. That is highly improbable unless the specific numbers match something in its training memory.

### Chain of thought: giving the model tokens to think

Allowing the model to generate more tokens before the final answer changes things dramatically. By generating intermediate reasoning steps, the model:

- Builds a longer context window
- Mimics how fine-tuned maths examples were crafted
- Finds similar problems in its training memory to pattern-match from

More tokens = more "thinking time" = higher chance of a correct answer. This is the intuition behind **chain-of-thought prompting**: instead of asking for the answer directly, you ask the model to reason step by step.

But even with multi-token generation, LLMs still aren't calculators — they can still make mistakes.

[Visual: diagram | post figure | comparison — single-pass prediction (wrong) vs multi-token step-by-step reasoning (correct)]

### The Python interpreter solution

The real fix is letting the LLM write and execute code:

1. The model translates the maths problem into Python code
2. A Python interpreter executes the code and returns the result
3. The LLM incorporates the result into its answer

This works because LLMs are very good at **English-to-Python translation** — it's just a language translation problem, and translation is a core strength of language models. The execution is then done by a deterministic interpreter, not by the model itself.

[Visual: screenshot | ChatGPT demo | code execution — showing LLM writing Python to solve a maths problem and executing it correctly]

---

## Key takeaways from Part 5

- **Fine-tuning helps but doesn't eliminate hallucinations.** Tools are needed.
- **Web search** gives LLMs access to real-time and post-cutoff information by expanding the context with retrieved text.
- **Chain-of-thought** improves maths by giving the model tokens to "think" step by step.
- **Python interpreter** lets the model hand off calculation to a deterministic engine — the right tool for exact computation.
- **Tools don't make LLMs smarter — they make them more accurate** by replacing probabilistic guessing with deterministic execution or retrieval.

*Continues in [Part 6: Smarter AI through Reinforcement Learning](./part-6-reinforcement-learning.md)*
