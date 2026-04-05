# Outline: DS-STAR: How Google Built a Data Science Agent That Actually Works

- **word_count_target:** 5,000 words (20 × 250)
- **structural_type:** standalone
- **content_type:** paper-explainer

---

## Sections

### Intro — The anecdote
- Jose's 2-year background with agentic coding tools; Claude Code impresses for general code tasks but feels thin for serious data science work (p-values, confidence intervals, bias detection, time-series comparisons). That gap is the opening.
- Discovering DS-STAR: paper attribution — "DS-STAR: Data Science Agent for Solving Diverse Tasks across Heterogeneous Formats and Open-Ended Queries" by Jaehyun Nam (KAIST), Jinsung Yoon, Jiefeng Chen, Raj Sinha, and Tomas Pfister (Google Cloud), arXiv:2509.21825, submitted September 2025, revised February 2026 (v4).
- The central thesis surfaced early: DS-STAR works because of its harness, not its model. State the numbers upfront: Gemini 2.5 Pro alone scores 12.70% on hard-level DABStep. DS-STAR + Gemini 2.5 Pro scores 45.24%. The model did not change. The architecture did.
- Sources: [DS-STAR: A state-of-the-art versatile data science agent — Google Research Blog](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/), [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825)

---

### 1. Goal of the paper
- Scope: answer ANY data science question across heterogeneous file formats (CSV, JSON, Markdown, unstructured text, Excel) and open-ended research queries.
- Two benchmarks that prove scope: DABStep (450 tasks, 72 easy / 378 hard, from Adyen and Hugging Face) and KramaBench (104 challenges, up to 1,556 files per domain, 6 domains).
- Why this matters even if your use case is narrower — the architecture choices hold even at smaller scale.
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825), [DABStep: Data Agent Benchmark for Multi-step Reasoning — Hugging Face Blog](https://huggingface.co/blog/dabstep), [KramaBench — arXiv:2506.06541](https://arxiv.org/abs/2506.06541)

---

### 2. System overview
- Two-component system: DS-STAR (well-defined questions → single answer) and DS-STAR+ (open-ended research queries → multi-section report).
- Comparison table: input type, output type, evaluation benchmark, key agents involved for each.
- DS-STAR forms the inner engine of DS-STAR+. DS-STAR+ wraps it with decomposition, synthesis, and refinement.
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825), [DS-STAR Google Research Blog](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/)

---

### 3. DS-STAR deep dive

#### 3.1 The seven modules
- Walk every module in the pipeline order and explain what each one does: ANALYZER → PLANNER → CODER → DEBUGGER → VERIFIER → ROUTER → FINALYZER.
- Fill in the gaps that Figure 1 in the paper leaves implicit: the DEBUGGER sits between the CODER and VERIFIER; the ROUTER is only triggered when the VERIFIER returns "insufficient"; the ROUTER's binary decision is "Add Step" (append a new step) vs "Replace Step K" (overwrite a specific erroneous step).
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825)

#### 3.2 The formulas
- Introduce the paper's parametrized notation and map each formula to the module it drives.
- Chain of outputs: `s_desc` (Analyzer) → feeds PLANNER → `s_plan` → feeds CODER → `s_code` → EXECUTOR runs it → `r` → VERIFIER evaluates → binary verdict `v` → if insufficient: ROUTER produces `w` → PLANNER revises → loop continues → FINALYZER produces final answer `a`.
- Key equations: ANALYZER (Eq 1), PLANNER init (Eq 2), PLANNER next (Eq 3), CODER init (Eq 4), CODER next (Eq 5), VERIFIER (Eq 6), ROUTER (from paper section 3.1).
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825)

#### 3.3 The algorithm
- Walk through Algorithm 1 as a summary — after 3.1 and 3.2, the pseudocode should read like a recap, not new material.
- Phase 1: data profiling (all files analyzed, descriptions stored). Phase 2: iterative plan generation (planner → coder → executor → verifier → router → repeat until sufficient → finalyzer).
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825)

---

### 4. DS-STAR+ deep dive

#### 4.1 High level
- GENERATOR agent decomposes the open-ended query `q` into a set of sub-questions `{f_i}`. Each sub-question is answered independently by DS-STAR. WRITER agent synthesises answers into a report `R`. One refinement round: GENERATOR re-examines the partial report and produces a new set of sub-questions to fill gaps; DS-STAR answers those; WRITER revises `R`.
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825)

#### 4.2 The formulas
- DS-STAR+ notation: `{f_i^k}` = sub-questions at round `k`, `{a_i^k}` = DS-STAR answers, `R` = report. Writer agent is `A_writer`. Generator agent is `A_generator`. Maximum refinement rounds = `K`.
- Equations 8–12 from the paper map directly to the algorithm steps.
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825)

#### 4.3 The algorithm
- Algorithm 2: data profiling → initial sub-question generation → initial report → iterative refinement loop (up to K rounds) → final report.
- Each statement in the report is cited back to the sub-question that grounded it (preventing hallucination).
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825)

---

### 5. The prompts
- Google published all prompts in Appendix L of the paper. They are short, specific, role-named. Show four examples: ANALYZER, PLANNER init, ROUTER, VERIFIER (quoted from the paper/community implementation).
- Argue the point: Google encoded determinism at the prompt level, not just the Python level. Each prompt pins the agent to a narrow task.
- Link to the community implementation: [JulesLscx/DS-Star](https://github.com/JulesLscx/DS-Star) (145 stars, 37 forks; faithful Python re-implementation — not official Google code).
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825), [JulesLscx/DS-Star community implementation](https://github.com/JulesLscx/DS-Star)

---

### 6. Ablation tests
- Table 4 in the paper: removing the ANALYZER drops hard-level DABStep accuracy from 45.24% to 26.98%. Removing the ROUTER and forcing "Add Step only" makes performance worse on both difficulty levels. Step-by-step VERIFIER outperforms full-plan-then-execute on accuracy.
- Frame this as "feature importance for agent systems" — a mental model data scientists use immediately.
- Additional data point from Google Blog: DS-STAR with GPT-5 performed better on easy tasks; Gemini 2.5 Pro version performed better on hard tasks. The same harness; different model strengths.
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825), [DS-STAR Google Research Blog](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/)

---

### 7. More rounds for harder problems
- Short section. Hard tasks require on average 5.6 iterations to reach a sufficient plan; easy tasks require 3.0. More than 50% of easy tasks finish in a single round.
- Takeaway: complexity drives compute. The system does not over-iterate on simple tasks; it adapts.
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825)

---

### 8. Google's example report
- Appendix G, Report 3: "Data Preparation Report for Payment Fee Optimization." Question: generate a comprehensive data preparation report for optimizing payment processing fee calculations — analyze relationships between merchant characteristics, transaction attributes, and fee structures; include data quality issues, feature engineering for fee calculation, and validation of fee rule applicability.
- What the output actually looks like: structured sections, cited sub-questions, data quality flags, feature engineering recommendations. This is what DS-STAR+ produces at the end of its pipeline.
- Sources: [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825)

---

### 9. Model agnostic
- DS-STAR's community implementation (JulesLscx/DS-Star) supports GeminiProvider, OpenAIProvider, OllamaProvider. Works with Gemini 2.5 Pro, GPT-5, DeepSeek-V3, and locally via Ollama (llama3, qwen3-coder).
- Reinforces the thesis: the architecture is the differentiator, not the model. Swap the backbone; the harness holds.
- Sources: [JulesLscx/DS-Star community implementation](https://github.com/JulesLscx/DS-Star), [DS-STAR Google Research Blog](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/)

---

### 10. Limitations
- No official open-source release from Google. What exists is the community re-implementation at JulesLscx/DS-Star.
- Integration with Claude Code: DS-STAR patterns could inform Claude Code workflows via MCP data connectors. [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/mcp) shows the mechanism already exists.
- Open research question: could a more powerful data profiling tool (e.g., ydata-profiling / pandas-profiler) replace or augment the Analyzer to provide richer context for the Planner?
- Sources: [Connect Claude Code to tools via MCP — Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/mcp), [DS-STAR arXiv:2509.21825](https://arxiv.org/abs/2509.21825) — Sources: none for ydata-profiling point — model knowledge only

---

### Closing thoughts
- Synthesise the central thesis: the harness is what Google built. The model was already there.
- Brief teaser: testing DS-STAR on real Kaggle datasets — follow-up post coming.
- "Now, I want to hear from you" — specific reader engagement questions tied to the argument.
- Sources: none — synthesis only

---

## ToC Suggestions

- Section 3 is the densest section in the outline. Sub-sections 3.1, 3.2, 3.3 are deliberately layered (modules → formulas → algorithm) so the algorithm reads as a recap. If any sub-section risks standing alone as unfollowable, consider adding a one-sentence bridge at the end of 3.1 before 3.2 begins. Not a restructuring — a micro-transition.
