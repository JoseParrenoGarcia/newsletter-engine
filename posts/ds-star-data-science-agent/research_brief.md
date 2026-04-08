# Research Brief: DS-STAR: How Google Built a Data Science Agent That Actually Works

**Generated:** 2026-04-05

## Summary

`notes.md` contained 3 URLs (arXiv paper, Google Research blog, community GitHub repo). All 3 survived validation and are reachable. 7 additional sources were added via targeted fetches to cover the benchmarks, the prior-art landscape, the data profiling limitation angle, and the Claude Code MCP integration angle. Total: 10 sources. No ToC sections remain fully uncovered, though the "Limitations: why no official open-source release" question has no direct source — it is addressed editorially via the community GitHub listing.

---

## Sources

### Intro — The anecdote / system overview / central thesis

- **[DS-STAR: A state-of-the-art versatile data science agent — Google Research Blog](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/)**
  The official Google Research blog post written by Jinsung Yoon and Jaehyun Nam. Provides an accessible narrative of why DS-STAR was built (complexity of real-world data science workflows), a high-level walkthrough of the system architecture, and benchmark results showing DS-STAR outperforming AutoGen and DA-Agent across DABStep, KramaBench, and DA-Code. Strong source for framing the intro and the system overview section.

### 1. Goal of the paper

- **[DS-STAR: Data Science Agent for Solving Diverse Tasks across Heterogeneous Formats and Open-Ended Queries — arXiv:2509.21825](https://arxiv.org/abs/2509.21825)**
  The primary paper (Google Cloud / KAIST, submitted Sep 2025, revised Feb 2026, v4). Covers the full system: DS-STAR modules (Analyzer, Planner, Coder, Debugger, Verifier, Router, Finalyzer), DS-STAR+ open-ended report generation, all formulas, the full algorithm, ablation tables (Table 4, 5), Appendix G example reports, and Appendix L published prompts. This is the authoritative source for all technical claims in the post.

### 2. System overview — benchmarks used

- **[DABStep: Data Agent Benchmark for Multi-step Reasoning — Hugging Face Blog](https://huggingface.co/blog/dabstep)**
  The benchmark paper from Adyen and Hugging Face that introduced DABStep (450 tasks: 72 easy, 378 hard). Explains the easy/hard level split, why hard tasks require multi-step reasoning across multiple structured datasets and domain-specific knowledge, and why single-shot code generation fails. Essential context for explaining why DS-STAR's hard-level improvement (+32pp) is meaningful.

- **[KramaBench: A Benchmark for AI Systems on Data-to-Insight Pipelines over Data Lakes — arXiv:2506.06541](https://arxiv.org/abs/2506.06541)**
  Introduces KramaBench: 104 challenges spanning 1,700 files, 24 data sources, 6 domains, testing end-to-end AI pipeline design over real data lakes. Benchmarks autonomous data discovery — agents must identify relevant files themselves. Useful for the system overview section to show the breadth of real-world data science complexity DS-STAR is evaluated against.

### 3. DS-STAR deep dive / prior art landscape

- **[Data Interpreter: An LLM Agent For Data Science — arXiv:2402.18679](https://arxiv.org/abs/2402.18679)**
  One of the key prior approaches cited in the DS-STAR paper. Data Interpreter (MetaGPT team, 2024) tackles long-term interconnected data science tasks with dynamic plan rewriting and hierarchical graph dependency tracking. Useful for one sentence of prior-art context showing what came before DS-STAR and what limitations it was built to overcome.

- **[R&D-Agent: An LLM-Agent Framework Towards Autonomous Data Science — arXiv:2505.14738](https://arxiv.org/abs/2505.14738)**
  Microsoft's R&D-Agent (May 2025) — a decoupled MLE framework formalising the data science workflow into two phases and six components, achieving top performance on MLE-Bench (35.1% any medal rate). Useful for the intro or system overview to establish that the agentic data science space is active and competitive, and that structured frameworks consistently beat ad-hoc LLM prompting.

### 5. The prompts / community implementation

- **[JulesLscx/DS-Star — Community GitHub Implementation](https://github.com/JulesLscx/DS-Star)**
  A faithful community re-implementation of the DS-STAR paper (145 stars, 37 forks as of research date). Contains `dsstar.py` (DS_STAR_Agent class with all agent methods), `prompt.yaml` (all raw prompts: analyzer, planner_init, planner_next, coder_init, coder_next, verifier, router, debugger), and `provider.py` (GeminiProvider, OpenAIProvider, OllamaProvider). This is the source to link in Section 5 for readers who want to run the system.

### 9. Cool highlight — model agnostic / limitations open questions

- **[Connect Claude Code to tools via MCP — Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/mcp)**
  Official Claude Code documentation for MCP (Model Context Protocol) — the open standard for connecting Claude to external data sources, databases, business tools, and development environments. Directly relevant to the open research question about integrating DS-STAR patterns with Claude Code via data connectors. Shows how MCP servers expose data and capabilities that a DS-STAR-style harness could consume.

### 10. Limitations — data profiling enhancement

- **[YData-Profiling Documentation](https://docs.profiling.ydata.ai/latest/)**
  Official documentation for `ydata-profiling`, the leading Python package for automated EDA and data quality profiling. Generates comprehensive statistical reports (distributions, correlations, missing values, time-series support) from a single line of code, with support for databases (Oracle, Snowflake, PostgreSQL, S3). Directly relevant to the open research question about whether a tool like this could replace or enhance DS-STAR's Analyzer agent for tabular data.

---

## Research Gaps

- **Why did Google not release an official open-source implementation?** No external source directly answers this. Address editorially in the limitations section (reference the community GitHub as the practical alternative).
- **Does the deterministic Python harness approach scale vs LLM-native orchestration?** No single source found that directly compares the two approaches at scale. The R&D-Agent paper partially addresses this by showing structured frameworks outperform ad-hoc prompting, but a direct benchmark does not exist in the sources collected.
