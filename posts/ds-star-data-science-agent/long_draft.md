# DS-STAR: How Google Built a Data Science Agent That Actually Works

*How Google's seven-module pipeline beats raw Gemini by 32 percentage points — and what that means for anyone building data science agents.*

I have been using agentic coding tools for about two years. Claude Code for the past year, consistently and seriously — not as a novelty, but as the primary tool for a large share of my day-to-day work. It is genuinely impressive at general-purpose engineering tasks. But I kept running into a friction point whenever I pushed it toward real data science. The kind of analysis where the answer is not a number but a distribution, where the question involves p-values and confidence intervals and bias rooted in data quality, where you need to compare time-series across multiple datasets with heterogeneous formats before you can say anything meaningful at all.

Claude Code would get close. Then it would simplify. It would produce averages when the situation called for a Mann-Whitney test. It would flag a pattern without checking whether the pattern held across the relevant subgroups. It felt like asking a generalist to do specialist work — useful, but not trustworthy enough to stake a conclusion on.

So I went looking. And this week I found the paper I had been waiting for.

"[DS-STAR: Data Science Agent for Solving Diverse Tasks across Heterogeneous Formats and Open-Ended Queries](https://arxiv.org/abs/2509.21825)" by Jaehyun Nam (KAIST), Jinsung Yoon, Jiefeng Chen, Raj Sinha, and Tomas Pfister (Google Cloud). Submitted to arXiv in September 2025, revised February 2026 (v4). The central argument of the paper, which its own ablation results confirm, is that the performance gains come from the architecture — the harness — not from the model. Gemini 2.5 Pro alone scores 12.70% on hard-level DABStep tasks. DS-STAR with Gemini 2.5 Pro scores 45.24%. That is a 32-percentage-point jump. The model did not change. The system around it did.

That framing resonates with me. Claude Code outperforms other AI coding tools not because it always has the best frontier model, but because of how the system is wired. DS-STAR applies the same logic to data science.

---

## What will we cover?

- **Goal of the paper** — what DS-STAR is trying to solve and why existing single-pass approaches fail on real data science tasks
- **How DS-STAR is structured** — the two-component architecture: DS-STAR for well-defined questions and DS-STAR+ for open-ended research
- **DS-STAR deep dive** — the seven modules, their formulas, and the full iterative algorithm
- **DS-STAR+ deep dive** — how the decomposition, writer, and refinement loop extend the inner engine to produce structured reports
- **The prompts behind the agent** — what Google actually published in Appendix L and what the design choices reveal
- **Ablation tests** — which component contributes most to the 32-point performance gain
- **More rounds for harder problems** — how the iteration count scales with task complexity
- **Google's example report** — what DS-STAR+ actually produces on a real payments dataset
- **Model-agnostic properties** — evidence that the gains transfer across model providers
- **Limitations** — no official release, open integration questions, and what the Analyzer still misses

---

## 1. Goal of the paper

The stated goal is ambitious: build a system that can answer any data science question across heterogeneous data formats and open-ended queries. Not a narrow benchmark — any question, any file format.

What makes that hard in practice is not the question. It is the data. Real data science work rarely involves a single clean CSV and a well-specified question. It involves [multiple structured datasets requiring multi-step reasoning](https://huggingface.co/blog/dabstep), domain-specific knowledge baked into the rules, and questions that cannot be answered with a single code generation pass. The DABStep benchmark from Adyen and Hugging Face captures this well: 450 tasks, 72 easy (single dataset, minimal contextual knowledge), and 378 hard (multiple datasets, domain knowledge required, no single-shot solution). The [KramaBench benchmark](https://arxiv.org/abs/2506.06541) extends this further — 104 challenges spanning 1,700 files and 24 data sources across 6 domains, where agents must autonomously discover which files are even relevant.

Both benchmarks are designed to break the approach of "write one code block and submit the answer." That is exactly the approach DS-STAR replaces.

Even if your actual use case is narrower — a single internal database, a well-defined question — the architecture choices here still hold. A system that handles heterogeneous chaos will handle clean data just fine. The reverse is not true.

---

## 2. How the DS-STAR data science agent is structured

DS-STAR is actually two things, built one on top of the other.

| Component | Input | Output | Evaluation benchmark |
|-----------|-------|--------|---------------------|
| **DS-STAR** | Well-defined question + data files | Single answer | DABStep, KramaBench, DA-Code |
| **DS-STAR+** | Open-ended research query + data files | Multi-section data science report | DABStep-Research |

DS-STAR handles questions with a correct answer — "what is the fee difference for merchant X if they switched to MCC code Y?" DS-STAR+ handles research questions — "generate a comprehensive analysis of payment processing fee optimization for these merchants." The output of DS-STAR+ is a structured report, not a scalar answer.

Architecturally, DS-STAR is the inner engine of DS-STAR+. DS-STAR+ decomposes the open-ended query into a set of focused sub-questions, hands each to DS-STAR, and uses a writer agent to synthesise the answers into a report. That report then gets one round of refinement. The design is modular: improve DS-STAR, and DS-STAR+ improves automatically.

The [Google Research blog post](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/) confirms DS-STAR outperforms AutoGen and DA-Agent across all three well-defined benchmarks (DABStep, KramaBench, DA-Code), securing the top rank on the public DABStep leaderboard as of September 2025.

---

## 3. DS-STAR deep dive

### 3.1 The seven modules

DS-STAR comprises seven named agents. Walking them in pipeline order makes the system legible.

**ANALYZER** — The first thing DS-STAR does before any planning is profile every data file it receives. It generates a Python script for each file, executes it, and stores the printed output as a structured description. The prompt is specific: "You are an expert data analyst. Generate a Python code that loads and describes the content of {filename}." If the file is structured, print the column names and a few sample rows. If it is unstructured, print essential content. The output — `s_desc` in the paper's notation — is what every downstream agent works from. Nothing gets planned without this step.

**PLANNER** — Given the data descriptions and the user's question, the Planner generates the first step of an execution plan. Not the full plan at once — one step. This is a deliberate choice, and the ablation results confirm it is the right one. The Planner has two modes: `planner_init` (first step, no prior plan context) and `planner_next` (subsequent steps, given current plan and prior execution results).

**CODER** — Takes the current plan step and generates executable Python code to implement it. Like the Planner, it has two modes: `coder_init` (first code block) and `coder_next` (subsequent blocks, with awareness of prior results). The code is generated as a single self-contained script.

**DEBUGGER** — The Coder's output runs against the actual data files. If execution fails — a syntax error, a missing column, a type mismatch — the Debugger fires. It takes the failed code, the error message, and generates a corrected script. The Debugger is not shown prominently in Figure 1 of the paper, but it is in the algorithm: it sits between the Coder and the Verifier, handling execution failures before they even reach plan evaluation.

**VERIFIER** — After the code runs successfully, the Verifier assesses whether the current plan — all steps executed so far — is sufficient to answer the original question. The verdict `v` is binary: `sufficient` or `insufficient`. Crucially, the Verifier does not just compare the plan to the question. It conditions its judgment on the execution output `r_k` of the latest step: has the result actually been computed correctly, and does it contain what is needed to answer the query?

**ROUTER** — Triggered only when the Verifier returns `insufficient`. The Router looks at the current plan, the question, the execution results, and makes a binary decision: does the plan need a new step added at the end ("Add Step"), or does a specific existing step need to be corrected ("Replace Step K", where K is the step index)? The distinction matters. Adding steps to a plan with a flawed step K just accumulates errors. Replacing it fixes the root cause.

**FINALYZER** — When the Verifier returns `sufficient`, the Finalyzer synthesises all execution outputs into the final answer. It extracts the relevant result from the accumulated execution history and formats it as the response to the original question.

The pipeline is sequential, not parallel. Each agent's output is the next agent's input. Changing any one of them changes what the next one sees.

### 3.2 The formulas

The paper's notation maps directly to the modules above. Reading the formulas as a chain rather than isolated equations makes them straightforward.

The Analyzer runs once per file:

> `s_desc^i = A_analyzer(D_i)` — generates a Python description script for file `D_i`
> `d_i = exec(s_desc^i)` — runs the script; `d_i` is the printed output

The Planner initialises with the data descriptions and the query:

> `s_plan^1 = A_planner(q, {d_i})` — first plan step from question `q` and descriptions `{d_i}`

Subsequent plan steps condition on what has already been executed:

> `s_plan^k = A_planner(q, p_{k-1}, r_{k-1}, {d_i})` — next plan step, given prior cumulative plan `p` and result `r`

The Coder turns the plan step into code:

> `s_code^k = A_coder(s_plan^k, p_{k-1}, r_{k-1}, {d_i})` — code for step `k`

The Executor runs it:

> `r_k = exec(s_code^k)` — execution result (or the Debugger handles the failure)

The Verifier evaluates:

> `v = A_verifier(q, s_k, r_k, {d_i})` — binary: `sufficient` or `insufficient`

If `v = insufficient`, the Router decides how to proceed:

> `w = A_router(p, q, r_k, {d_i})` — either "Add Step" or "Replace Step K"

If "Replace Step K", the Planner re-generates that step with the corrected context. If "Add Step", the Planner generates the next step. The loop continues until the Verifier returns `sufficient`.

Then the Finalyzer:

> `a = A_finalyzer(q, {r_k}, {d_i})` — final answer synthesised from all execution outputs

The chain from `s_desc` to `a` is deterministic at every step. Each formula feeds its output into the next module's inputs. No module is guessing at context it has not been given.

### 3.3 The algorithm

With modules and formulas in place, Algorithm 1 is a straightforward read.

**Phase 1 — Data profiling.** For every file in `D`, run the Analyzer and store the description `d_i`. This is the foundation everything else builds on.

**Phase 2 — Iterative plan generation.**

1. The Planner generates the first plan step from the question and the data descriptions.
2. The Coder generates code for that step.
3. The Executor runs it. If it fails, the Debugger corrects the code and re-runs.
4. The Verifier evaluates the cumulative plan against the execution output. If `sufficient`, jump to step 6.
5. If `insufficient`, the Router decides whether to add a new step or replace step K. Return to step 1 (Planner) with updated context. Repeat up to the maximum iteration limit.
6. The Finalyzer extracts the final answer from accumulated results.

The algorithm reads like a feedback control loop. The Verifier is the sensor. The Router is the controller. The Planner and Coder are the actuators. The loop terminates when the sensor signals "done."

---

## 4. DS-STAR+ deep dive

### 4.1 High level

DS-STAR+ takes an open-ended query — not "what is the fee difference" but "generate a comprehensive analysis of payment processing fee optimization" — and builds a structured report from it.

The first problem is decomposition. A vague query cannot be handed to DS-STAR directly. DS-STAR+ adds a GENERATOR agent that reads the query and the data descriptions and produces a set of focused sub-questions `{f_i}`. Each sub-question is answerable by DS-STAR: it has a defined question and a reference to the relevant data. DS-STAR runs on each one independently and returns answers `{a_i}`.

The WRITER agent then synthesises those sub-question/answer pairs into a structured report `R`. The prompt instructs the Writer to cite each claim back to the sub-question that grounded it — preventing hallucination by making every statement traceable to an executed data query.

One refinement round follows. The GENERATOR re-examines the current draft report alongside the data descriptions and generates a new set of sub-questions targeting what is missing or shallow. DS-STAR answers those. The WRITER revises `R` with the new material.

### 4.2 The formulas

The DS-STAR+ notation extends the DS-STAR chain with a decomposition layer.

Superscript `k` denotes the refinement round. At round 0:

> `{f_i^0} = A_generator(q, {d_i})` — initial sub-questions from query and data descriptions
> `{a_i^0} = DS-STAR({f_i^0}, D)` — DS-STAR answers each sub-question
> `R = A_writer(q, {f_i^0, a_i^0})` — initial report compiled from answers

At refinement round `k`:

> `{f_i^k} = A_generator(q, {d_i}, R)` — new sub-questions, now conditioned on the current draft
> `{a_i^k} = DS-STAR({f_i^k}, D)` — answers to the new sub-questions
> `R ← A_writer(q, R, {f_i^k, a_i^k})` — report updated; Writer is instructed to add information, not rewrite from scratch

The Writer prompt makes this conservative: "Do not modify the given report a lot. Just try to add new information." The refinement augments; it does not overwrite.

### 4.3 The algorithm

Algorithm 2 is a direct translation.

1. Profile all data files (same Analyzer step as DS-STAR).
2. GENERATOR decomposes query into initial sub-questions.
3. DS-STAR answers each sub-question.
4. WRITER compiles initial report.
5. For each refinement round `k = 1` to `K`: GENERATOR produces new sub-questions conditioned on the current report; DS-STAR answers them; WRITER revises.
6. Output: final report `R`.

Pairwise comparison using Gemini 3 Pro as judge found that refined reports were preferred over non-refined baselines in 68% of cases. The refinement loop demonstrably improves both content depth and formatting quality.

---

## 5. The prompts behind the data science agent

Google published every prompt in Appendix L of the paper. Reading them reveals something important: they are short, specific, and role-named. There is no long system prompt trying to pre-solve every edge case. Each prompt does exactly one thing.

The **Analyzer prompt** opens with "You are an expert data analyst." It specifies the task in four bullet points: handle both structured and unstructured data, print essential information including all column names, output a self-contained runnable script, do not use try/except (errors will be debugged separately). That last point is deliberate — it hands error handling to the Debugger agent rather than swallowing failures silently.

The **Router prompt** opens with "You are an expert data analyst. Since current plan is insufficient to answer the question, your task is to decide how to refine the plan." The response format is tightly constrained: either "Add Step" or one of "Step 1 ... Step K." No free-text reasoning. A decision, not a discussion.

The **Verifier prompt** asks the agent to judge whether the current plan step is sufficient to answer the original question, given the execution output. It does not ask the agent to revise the plan — only to judge it. Judgment and revision are separate agents with separate prompts.

The **Planner prompts** (`planner_init` and `planner_next`) are also role-specific. The initial planner receives only the question and data descriptions. Subsequent planner calls receive the full accumulated plan and execution history, so each new step is conditioned on what has already been done and what results it produced.

This is determinism baked in at the prompt level. Google did not build one general agent and hope it would infer the right role. They built seven focused agents, each constrained to its specific responsibility.

For readers who want to run the system: [JulesLscx/DS-Star](https://github.com/JulesLscx/DS-Star) is a faithful community re-implementation (145 stars, 37 forks as of the research date). It contains `dsstar.py` (the full `DS_STAR_Agent` class), `prompt.yaml` (all prompts in text form), and `provider.py` (Gemini, OpenAI, Ollama). This is not the official Google release — there is none — but it is an accurate implementation of the paper.

---

## 6. Ablation tests

Table 4 in the paper answers the question: which component contributes most to DS-STAR's performance? The setup is ablation by removal — strip out one component, measure the drop.

**Remove the Analyzer.** Hard-level DABStep accuracy drops from 45.24% to 26.98%. The single largest drop of any component removal. Without the data descriptions, the Planner is generating steps with no grounding in what the data actually contains. The performance is still better than the 12.70% baseline (a non-agentic framework), which shows the other components still contribute — but the Analyzer is by far the most load-bearing module.

**Remove the Router (force "Add Step" only).** Performance drops on both easy and hard tasks. The Router's ability to replace a flawed step — rather than just appending new steps to a broken plan — is what prevents the system from compounding errors. Without it, the plan accumulates.

**Replace step-by-step VERIFIER with full-plan-then-execute.** The baseline here is: generate the entire plan at once, run all the code, use code execution success as the only verification signal. This performs worse than DS-STAR's step-by-step approach. The step-by-step Verifier catches plan problems at the level of individual steps, before they propagate to the next one.

Data scientists will recognise this framing immediately: this is feature importance analysis for an agent system. Strip out each component and measure the degradation. The Analyzer is the highest-importance feature. The Router is second. The step-by-step Verifier outperforms the full-plan baseline.

One additional observation from the [Google Research blog](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/): DS-STAR with GPT-5 performs better on easy tasks, while DS-STAR with Gemini 2.5 Pro performs better on hard tasks. The same harness; different model strengths revealed. This is not an argument against using a strong model — it is evidence that the harness exposes model strengths rather than averaging them away.

---

## 7. More rounds for harder problems

Hard tasks require an average of 5.6 iterations to reach a sufficient plan. Easy tasks require 3.0 iterations. More than 50% of easy tasks finish in a single round.

The system does not over-iterate on simple problems. It allocates refinement rounds proportionally to the complexity of what it has been asked. An easy question gets one pass. A hard question that requires multi-step reasoning across multiple datasets gets five or six.

This matters practically. Token cost and latency scale with iteration count. A system that terminates early on simple tasks and persists on hard ones is behaving correctly — not because it was told to, but because the Verifier signal drives it.

---

## 8. Google's example report

Appendix G of the paper contains three example DS-STAR+ outputs. Report 3 is the most instructive.

The question: "Generate a comprehensive data preparation report for optimizing payment processing fee calculations. The report should analyze the relationships between merchant characteristics, transaction attributes, and fee structures across multiple datasets. Include analysis of data quality issues, feature engineering for fee calculation, and validation of fee rule applicability."

This is the kind of question a data scientist at a payments company might write at the start of an engagement. The datasets include payments records, merchant data, fee rule tables, acquirer country mappings, and MCC code classifications. The question does not specify which files to use or in which order. DS-STAR+ resolves that through the Analyzer and Generator.

The output covers: feature engineering decisions for fee calculation (which fields to join, which rules apply under which conditions), data quality issues flagged across the datasets (missing values, inconsistent encodings, rule applicability edge cases), and validation of whether the fee rules in the manual can actually be applied to the given data as-is. Each section cites the sub-question and code execution that grounded it.

What this demonstrates is not that DS-STAR+ writes perfect analysis. It is that the structure of the output matches what a senior analyst would produce: grounded claims, flagged quality issues, traceable reasoning. That is the bar the system was designed to meet.

---

## 9. The data science agent is model-agnostic

The paper tests DS-STAR with Gemini 2.5 Pro as the primary model. The community implementation at [JulesLscx/DS-Star](https://github.com/JulesLscx/DS-Star) supports three providers: `GeminiProvider`, `OpenAIProvider`, and `OllamaProvider`. That means GPT-5 via the OpenAI API, DeepSeek-V3 via a compatible endpoint, and local models via Ollama (llama3, qwen3-coder).

The [Google Research blog](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/) confirms that testing with GPT-5 produced "promising results on the DABStep benchmark, indicating the framework's generalizability." The harness is model-agnostic.

This reinforces the central thesis directly. The 32-percentage-point improvement on hard-level DABStep is not a property of Gemini. It is a property of the harness. The Analyzer, the step-by-step Verifier, the Router's replace-vs-add logic — those gains transfer to any model that can follow focused, role-specific prompts. Swap the backbone; the structure holds.

---

## 10. Limitations

Three honest limitations worth naming.

**No official open-source release.** Google has not released an official implementation. [JulesLscx/DS-Star](https://github.com/JulesLscx/DS-Star) is a community re-implementation — faithful and well-documented, but not maintained by the paper authors. Adopting it means you are depending on community code, not Google's.

**Integration with Claude Code is an open problem.** The natural question for Claude Code users is: can DS-STAR patterns be applied within a Claude Code workflow? The [MCP documentation](https://docs.anthropic.com/en/docs/claude-code/mcp) shows that Claude Code can connect to external data sources via Model Context Protocol servers. A DS-STAR-style harness could, in principle, be implemented as a set of MCP tools — Analyzer, Planner, Verifier as separate MCP calls. No one has done this yet in a published, production-tested form.

**The Analyzer is powerful but basic.** The current Analyzer generates a Python script and runs it — essentially a programmatic describe(). Tools like ydata-profiling (formerly pandas-profiling) produce far richer data quality summaries: distribution plots, correlation matrices, missing value heatmaps, categorical encoding warnings. Whether a richer Analyzer context would push performance further is a real research question the paper does not address.

---

## Closing thoughts

The thesis of this post is also the thesis of the paper: DS-STAR works because of its harness.

A 32-percentage-point improvement on hard-level DABStep is not something you get by swapping a weaker model for a stronger one. You get it by building a system that profiles the data before planning, plans one step at a time, verifies each step against execution output, and corrects the specific step that was wrong rather than continuing past it. Seven focused agents, each doing one thing, each constrained by a short and specific prompt.

The insight that sticks with me is the ablation result on the Analyzer. The biggest performance drop comes from removing the step that generates a description of the data files. Not the verifier. Not the router. The description. Before any planning starts, DS-STAR reads the data and builds a model of it. Everything after that is grounded in that model. Skip it, and the rest of the pipeline is planning in the dark.

For anyone thinking about how to build more reliable data science workflows on top of LLMs: the lesson is not to add more capability to one agent. The lesson is to split the work into smaller, verifiable steps — and to make sure the first step is understanding the data.

A follow-up post is coming: I am going to test DS-STAR on real Kaggle datasets and report what it actually produces. How does it handle messier data? What does the Analyzer output look like in practice? Where does the plan loop actually terminate?

**What this means if you're building**

If you are designing a data science agent today, the ablation results give you a clear build order. Start with a dedicated data-profiling step before any planning — run a description pass on every input file and store the output; do not let the LLM guess the schema from column names and hope for the best. Once you have a planning loop, verify each step independently against its execution output rather than only checking whether the final answer looks right — errors that survive one step compound in the next. And build an explicit replace-vs-add decision into your correction logic: when the Verifier flags a step as wrong, the system should decide whether to fix that specific step or append a new one, not default to appending every time. These three choices — profile first, verify per step, correct not just accumulate — account for the largest performance gaps in DS-STAR's own ablations, and they are all replicable without Google's infrastructure.

---

## Now, I want to hear from you

- Have you tried using an LLM agent for real data science work — not just exploratory analysis, but inference, validation, quality assessment? What did it get wrong?
- The ablation result puts the Analyzer as the highest-importance component. Does that match your intuition about where agentic data science systems fail?
- If you could add one module to DS-STAR's pipeline — beyond the seven it already has — what would it be?

---

## References

1. Nam, J., Yoon, J., Chen, J., Sinha, R., & Pfister, T. (2025). [DS-STAR: Data Science Agent for Solving Diverse Tasks across Heterogeneous Formats and Open-Ended Queries](https://arxiv.org/abs/2509.21825). arXiv:2509.21825v4.
2. Yoon, J., & Nam, J. (2025). [DS-STAR: A state-of-the-art versatile data science agent](https://research.google/blog/ds-star-a-state-of-the-art-versatile-data-science-agent/). Google Research Blog.
3. Martin Iglesias et al. (2025). [DABStep: Data Agent Benchmark for Multi-step Reasoning](https://huggingface.co/blog/dabstep). Hugging Face Blog.
4. Lai et al. (2025). [KramaBench: A Benchmark for AI Systems on Data-to-Insight Pipelines over Data Lakes](https://arxiv.org/abs/2506.06541). arXiv:2506.06541.
5. JulesLscx. (2025). [DS-Star: Community implementation of DS-STAR](https://github.com/JulesLscx/DS-Star). GitHub.
6. Anthropic. (2025). [Connect Claude Code to tools via MCP](https://docs.anthropic.com/en/docs/claude-code/mcp). Claude Code documentation.
