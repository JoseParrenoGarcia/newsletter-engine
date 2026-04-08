# Notes

---

## Brainstorm Summary

Jose came to this paper from a real practitioner need: as a data scientist and heavy Claude Code user (2+ years with agentic coding tools, 1 year as a heavy Claude Code user), he wanted an open-source agentic system capable of serious data science work. Not averages — p-values, confidence intervals, time-series comparisons, bias detection rooted in data quality. That gap is the opening of the post, and it makes the discovery of DS-STAR feel earned rather than arbitrary.

The central thesis is that DS-STAR works because of its harness, not its model. Google used Gemini, but the paper's own ablation results show that removing individual components — especially the Analyzer and the step-by-step Verifier — tanks performance more than swapping models does. Jose draws a direct parallel to Claude Code: it outperforms competitors not because it always has the best frontier model, but because of how the system is wired. This framing is the hook that will resonate with the target audience of data scientists and ML engineers.

The post is a full technical breakdown, structured to layer understanding progressively: high-level system overview → DS-STAR deep dive (modules, formulas, algorithm) → DS-STAR+ deep dive → evidence (ablations, Google's own example report) → practical takeaways. The formula and algorithm sections are explicitly designed to not be scary — they map directly to the diagram and the module explanations that precede them. A reader who reads 3.1 carefully should find 3.2 and 3.3 feel like natural extensions, not new material.

One important pivot from Jose's original notes: Google did not release an official open-source implementation. The GitHub repo at JulesLscx/DS-Star is a faithful community re-implementation (145 stars, 37 forks) and should be referenced and linked as such. In its place, section 5 becomes an analysis of the prompts Google published in Appendix L of the paper — each one is short, focused, and role-specific (Analyzer, Planner, Coder, Verifier, Router, Debugger). This is actually a stronger angle: it shows how Google encoded determinism into the system at the prompt level, not just the Python level.

The post closes with honest limitations — no official code release, open questions around integrating DS-STAR patterns into Claude Code via MCPs or CLI data connectors, and the potential for more powerful data profiling tools like pandas-profiler to enhance the Analyzer. A brief teaser signals a follow-up post testing DS-STAR on real Kaggle datasets.

## Rough Table of Contents

- **Intro — The anecdote**: Jose's search for a serious agentic data science tool; Claude Code impresses but sometimes feels superficial for real DS work; discovering DS-STAR from Google this week.
- **1. Goal of the paper** — Ambitious scope: answer ANY data science question across heterogeneous formats (JSON, CSV, Markdown, unstructured text) and open-ended queries. Why this matters even if you don't need the full power.
- **2. System overview** — Two components: DS-STAR (well-defined questions) and DS-STAR+ (open-ended research reports). A simple diagram or table showing how they relate, what each takes as input, and what each produces.
- **3. DS-STAR deep dive**
  - *3.1 High level*: Walk through every module — Analyzer, Planner, Coder, Debugger, Verifier, Router, Finalyzer. Explain the missing pieces from Figure 1: the Debugger sitting between Coder and Verifier, the binary Router decision (Sufficient/Insufficient), and the Add Step vs Replace Step K logic.
  - *3.2 Formulas*: Introduce the paper's parametrized notation and map each formula to the module it describes. Use a diagram where formula outputs feed into the next module's inputs — show the chain, not just isolated equations.
  - *3.3 Algorithm*: Walk through the full algorithm now that 3.1 and 3.2 have built the mental model. Annotate it with references back to the modules and formulas so it reads as a summary, not a wall of pseudocode.
- **4. DS-STAR+ deep dive** — Same three-layer structure (high level → formulas → algorithm). Covers: open-ended query decomposition into sub-questions, each answered by DS-STAR, writer agent (Gemini 2.5 Pro) synthesising the final report, one refinement round.
- **5. The prompts** — Google published every prompt in Appendix L. They are short, role-specific, and focused. Show selected examples (Analyzer, Planner init, Router, Verifier). Argue this is determinism baked in at the prompt level. Link to the community implementation (JulesLscx/DS-Star) for those who want to run it.
- **6. Ablation tests** — Module importance table (Table 4 in paper). Analyzer is the most critical component. Step-by-step verifier beats full-plan-at-once. Router matters. Frame this as "feature importance for agent systems" — a framing data scientists will immediately recognise.
- **7. More rounds for harder problems** — Short section. The accuracy vs refinement rounds diagram shows hard tasks need ~3 iterations on average; easy tasks often finish in 1. Takeaway: complexity drives compute, not the other way around.
- **8. Google's example: Report 3** — Data preparation report for payment fee optimisation (Appendix G, Question 3). Feature engineering, data quality analysis, validation of fee rule applicability across multiple datasets. Show what a DS-STAR+ output actually looks like in practice.
- **9. Cool highlight — model agnostic** — DS-STAR works with GPT-5, DeepSeek-V3, and Ollama. The harness is model-agnostic. This reinforces the central thesis: it is the architecture, not the model.
- **10. Limitations** — No official Google open-source release. Integration questions: how would this work with Claude Code (MCPs for data access, WebSearch for exploration)? Could pandas-profiler / ydata-profiling replace or enhance the Analyzer for tabular data?
- **Closing note** — Testing DS-STAR on real Kaggle datasets coming in a follow-up post.

## Source Index

All sources have been fetched and indexed in the brainstorm session. Key references for drafting:

| Source | Label for search() | Key content |
|--------|-------------------|-------------|
| Paper (HTML) | `DS-STAR full paper HTML` | Full paper including Section 3 (DS-STAR), Section 4 (experiments), Section 5 (DS-STAR+), Appendix G (example reports), Appendix L (prompts), ablation Tables 4 & 5 |
| Paper (abstract) | `DS-STAR arxiv abstract` | Abstract, authors, metadata |
| GitHub repo | `DS-STAR GitHub repo main` | File structure, README |
| dsstar.py | `DS-STAR dsstar.py source` | DS_STAR_Agent class, all agent methods (plan_next_step, generate_code, verify_plan, route_plan, _debug_code), two-phase execution loop |
| prompt.yaml | `DS-STAR prompt.yaml` | All raw prompts: analyzer, planner_init, planner_next, coder_init, coder_next, verifier, router, debugger |
| Google blog | `DS-STAR Google Research blog` | Accessible summary from the Google Research team |

**Key facts for drafting:**
- Authors: Jaehyun Nam (KAIST), Jinsung Yoon, Jiefeng Chen, Raj Sinha, Tomas Pfister (Google Cloud)
- Benchmarks: DABStep (450 tasks, 72 easy / 378 hard), KramaBench (6 domains, up to 1,556 files), DA-Code (wrangling, ML, EDA), DABStep-Research
- Hard-level DABStep: Gemini 2.5 Pro alone = 12.70% → DS-STAR + Gemini 2.5 Pro = 45.24% (+32pp)
- DS-STAR+ win rate vs DeepAnalyze-8B: >88% (LLM-as-Judge, pairwise, order-swapped)
- DS-STAR agents: ANALYZER, PLANNER, CODER, VERIFIER, ROUTER, DEBUGGER, FINALYZER
- Model support: Gemini, GPT-5, DeepSeek-V3, Ollama (OllamaProvider, OpenAIProvider, GeminiProvider in provider.py)
- Community implementation: https://github.com/JulesLscx/DS-Star (not official)
- Official links: https://arxiv.org/abs/2509.21825 | https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/
