# Research Brief: Claude Code Evals Part 3 — The Evaluation Frameworks Landscape

**Generated:** 2026-08-01

## Summary

13 URLs were present in notes.md (Section 33 source plan). 12 survived validation — the Vox article was blocked by the site. 7 additional sources were fetched to fill gaps identified during gap analysis. All seven ToC sections now have at least one mapped source. No research gaps remain.

---

## Sources

### Opening hook (Anthropic-first angle on agent eval architecture)

- **[Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)**
  Anthropic's engineering post defining the conceptual architecture for evaluating agents: the three-part eval structure (input, grading criterion, check), the five named modules (task bank, eval harness/runner, agent scaffold, grader, transcript), and how capability evals graduate into regression suites. The primary conceptual spine for this post.

- **[Claude Code Overview](https://code.claude.com/docs/en/overview)**
  Official documentation covering Claude Code as an agentic coding tool — reads codebases, edits files, runs commands, integrates with development tools. Grounds the opening argument: Claude Code is an acting system, not a response engine, which is why agent evals differ from single-turn evals.

### Why agent evals compound (Anthropic engineering post)

- **[Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)**
  (Also mapped to Opening hook.) Explicitly states that "mistakes can propagate and compound" across agentic turns. Also introduces the pass@k and pass^k non-determinism metrics — probability of at least one success in k tries vs. probability all k trials succeed — which quantify compounding risk.

- **[Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems](https://arxiv.org/abs/2604.14228)**
  (arXiv:2604.14228) Analyzes Claude Code's TypeScript source to document its architecture. Authors: Jiacheng Liu et al. (MBZUAI/UCL). Shows that complexity lives around the core model loop — permissions, context management, hooks, skills, subagent delegation — supporting the claim that agent evals must cover the surrounding system, not just outputs.

- **[On the Use of Agentic Coding Manifests: An Empirical Study of Claude Code](https://arxiv.org/abs/2509.14744)**
  (arXiv:2509.14744) Analyzes 253 CLAUDE.md files from 242 GitHub repositories. Authors: Chatlatanagulchai et al. (Kasetsart University & NAIST). Finds operational guidance dominates manifests, confirming that CLAUDE.md is part of the system under test rather than incidental configuration.

### The five common modules (task bank, runner, graders, trace/transcript, baseline comparison, continuous loop)

- **[Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)**
  (Primary source.) Defines the five modules by name: task bank (evaluation suite), runner/eval harness (runs tasks concurrently and records steps), agent scaffold (processes inputs and orchestrates tool calls), grader (logic for scoring performance with multiple assertions per task), and transcript (complete record of a trial including outputs, tool calls, reasoning, and intermediate results). Also defines the continuous loop: capability evals graduate into regression suites once saturated.

- **[OpenAI Evals](https://github.com/openai/evals)**
  Code-first OSS implementation of the same architecture. Registry stores eval definitions as YAML files. Completion Function Protocol handles prompt chains and tool-using agents. Eval Templates provide pre-built grading patterns (basic and model-graded). Data flow: JSON input → YAML eval spec → Registry → Completion Function → Grader. Confirms the five-module architecture is not Anthropic-specific.

- **[DeepEval — Getting Started](https://deepeval.com/docs/getting-started)**
  Most-adopted Python eval library (moved from docs.confident-ai.com). Core modules: `LLMTestCase`/`ConversationalTestCase` (task), `EvaluationDataset` (task bank), `evals_iterator()` / `dataset.evaluate()` (runner), `Metric`/`GEval` (grader), `@observe` decorated functions (trace). Almost all metrics are LLM-as-judge; GEval accepts a criteria string and scores 0–1 against a threshold. Cross-validates the module naming in an OSS context.

- **[Arize Phoenix](https://arize.com/docs/phoenix)**
  Open-source observability and evaluation platform (redirects from docs.arize.com/phoenix). Built on OpenTelemetry (OTLP) with OpenInference semantic conventions layered on top. Captures traces at the span level: model calls, retrieval, tool use, and custom logic. Provides LLM-as-judge, code-based checks, and human annotation evaluators stacked together. Auto-instrumentation libraries exist for Python, TypeScript, and Java. Confirms the trace module as the cross-cutting architecture component.

### The grader hierarchy in depth (deterministic → LLM-as-judge → human)

- **[Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)**
  (Primary source.) Defines the three-tier hierarchy with explicit tradeoffs: deterministic/code-based (fast, cheap, reproducible, but brittle to valid variations); LLM-as-judge (flexible, captures nuance, but non-deterministic and needs calibration); human ("gold standard quality," but expensive, slow, and doesn't scale). The grader section of this post should derive the order from these documented tradeoffs.

- **[DeepEval — Getting Started](https://deepeval.com/docs/getting-started)**
  (Also mapped to Five common modules.) Useful contrast: DeepEval defaults to LLM-as-judge for nearly all metrics. GEval's criteria-string approach shows what well-structured LLM-as-judge prompts look like in practice. Useful to cite when discussing why LLM-as-judge needs calibration.

### Skill-creator as Claude Code-native implementation

- **[Extend Claude with Skills](https://code.claude.com/docs/en/skills)**
  Official skills documentation. Skills extend Claude's capabilities via `SKILL.md` files, load only when invoked (not on every session), and can include supporting files, scripts, templates, and examples. Documents the evaluating-and-iterating-on-skills section. The skill-creator skill is the Claude Code-native implementation of the five-module architecture discussed in this post.

- **[Agent SDK — How the Agent Loop Works](https://code.claude.com/docs/en/agent-sdk/agent-loop)**
  The officially documented surface for transcript/trace access. `ResultMessage` carries `total_cost_usd`, `usage`, `num_turns`, and `session_id` — all stable and documented. `stop_reason` (`end_turn`, `max_tokens`, `refusal`) is documented on the same object. No fields are marked unstable. The `max_turns` / `maxTurns` and `max_budget_usd` / `maxBudgetUsd` options cap the loop and map to the baseline-comparison and continuous-loop modules.

- **[Agent SDK — Overview](https://code.claude.com/docs/en/agent-sdk/overview)**
  Overview of the Agent SDK: Python and TypeScript library giving programmatic control over the same agent loop that powers Claude Code. Documents built-in tools, hooks, subagents, MCP, permissions, and sessions. Supports the argument that skill-creator is a first-class Claude Code-native implementation of the five eval modules.

- **[Harness Engineering for Agentic AI Coding Tools: An Exploratory Study](https://arxiv.org/abs/2602.14690)**
  (arXiv:2602.14690, originally listed as "Configuring Agentic AI Coding Tools" — note the title mismatch; the actual title is "Harness Engineering for Agentic AI Coding Tools.") Authors: Galster et al. Catalogs eight configuration mechanisms across five agentic AI coding tools and analyzes 2,853 GitHub repos. Central finding: Context Files dominate; Skills and Subagents see minimal uptake. Useful background for the skill-creator section to acknowledge where most teams currently are.

### The industry landscape in three clusters (code-first OSS, tracing-first, enterprise end-to-end)

- **[OpenAI Evals](https://github.com/openai/evals)**
  (Also mapped to Five common modules.) Code-first OSS cluster representative. Registry-based YAML schema. Community-contributed eval library. Demonstrates the code-first architecture pattern where eval logic lives in Python and configuration lives in YAML.

- **[DeepEval — Getting Started](https://deepeval.com/docs/getting-started)**
  (Also mapped to Five common modules and Grader hierarchy.) Code-first OSS cluster. Most-adopted Python eval library. pytest integration via `deepeval test run`. Confirms the code-first OSS cluster is converging on LLM-as-judge + trace + dataset primitives.

- **[Arize Phoenix](https://arize.com/docs/phoenix)**
  (Also mapped to Five common modules.) Tracing-first cluster representative. OTel/OpenInference architecture. Open source with community-maintained instrumentation libraries. Third-party integrations: Ragas, DeepEval, Cleanlab. Evaluators attach to datasets for automatic re-execution during experiments, enabling regression tracking.

- **[Microsoft Eval Guide](https://github.com/microsoft/eval-guide)**
  Enterprise end-to-end cluster representative (121 stars, MIT license). Five operational stages: Discover → Plan → Generate & Baseline → Run → Interpret & Improve. Adds meaningfully beyond the Lazzeri PDF: architecture-aware eval scoping (prompt-level / RAG / agentic tiers); risk tier classification based on five factors; named test data strategies (Echo for regression/deterministic, Historical Replay for model change comparisons, Synthesized Personas for multi-step workflows); dual failure classification (eval-setup vs. agent-quality root causes); and explicit hard/soft gates with pass-rate targets. The triage distinction between eval-setup vs. agent-quality is not present in generic frameworks.

### How to pick (decision tree for Claude Code teams)

- **[Microsoft Eval Guide](https://github.com/microsoft/eval-guide)**
  (Also mapped to Industry landscape.) The Discover → Plan → Generate & Baseline → Run → Interpret & Improve playbook maps directly to a decision process for Claude Code teams. The architecture-aware scoping tiers (prompt-level / RAG / agentic) are useful as the first branch in the decision tree.

- **[Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)**
  Covers verification patterns (give Claude a check it can run), the plan-then-code workflow, subagent delegation for isolation, and context management. Supports the "start with what you already have" branch of the decision tree — teams already using Claude Code have native tracing in ResultMessage.

- **[Claude Code Common Workflows](https://code.claude.com/docs/en/common-workflows)**
  Documents patterns for debugging, testing, PRs, and automation. Grounds the "how to pick" section in concrete Claude Code workflow types that map to different eval needs.

- **[Claude Code Memory and CLAUDE.md](https://code.claude.com/docs/en/memory)**
  Documents CLAUDE.md persistent instructions and auto memory. Relevant to the decision tree branch: teams with well-structured CLAUDE.md and rules are better positioned to use skill-creator natively before reaching for an external platform.

- **[Claude Code Hooks](https://code.claude.com/docs/en/hooks)**
  Covers hook lifecycle events, configuration schema, and enforcement patterns. Relevant to the decision tree: hooks are the control-plane layer that external eval platforms cannot easily replicate without SDK integration.

- **[Claude Code Sub-Agents](https://code.claude.com/docs/en/sub-agents)**
  Covers specialized subagents with custom system prompts, scoped tool access, and independent permissions. Relevant for the decision tree branch: teams using subagents need trace access at the subagent-result level, which is currently only available natively via the Agent SDK.

- **[Claude Code Settings and Permissions](https://code.claude.com/docs/en/settings)**
  Covers hierarchical settings scopes and permission controls. Relevant to the decision tree: teams in enterprise or regulated environments with strict permission requirements may have constraints that push them toward platform solutions.

- **[Agentic Education: Using Claude Code to Teach Claude Code](https://arxiv.org/abs/2604.17460)**
  (arXiv:2604.17460) Describes a 50-module curriculum with hook-based heuristics and a parametrised test suite. Useful background note: even educational contexts have converged on the same five-module pattern (task bank, runner, deterministic checks, judge prompts, iteration loop).

---

## Research Gaps

None. All seven ToC sections have at least one mapped source.

---

## Dropped Sources

- **https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs** — Blocked: Claude Code is unable to fetch from www.vox.com (HTTP restriction).

---

## Open Research Questions — Resolved

1. **OpenAI Evals YAML schema and module names**: Confirmed. Registry stores eval definitions as YAML files in `evals/registry/`. Data flow: JSON input → YAML eval spec → Registry → Completion Function Protocol → Grader. Module names: Registry (task bank equivalent), Completion Function Protocol (runner/agent scaffold), Eval Templates (grader patterns), model-graded YAML files (LLM-as-judge grader).

2. **Microsoft eval-guide vs. Lazzeri PDF**: The repo adds meaningfully. Unique additions: architecture-aware eval scoping with three tiers (prompt/RAG/agentic), risk tier classification with five factors, named test data strategies (Echo/Historical Replay/Synthesized Personas), dual failure classification distinguishing eval-setup from agent-quality root causes, and explicit hard/soft gates with pass-rate targets. These are not generic framework concepts.

3. **Anthropic Agent SDK transcript/trace access**: Fully documented and stable. `ResultMessage` carries `total_cost_usd`, `usage`, `num_turns`, `session_id`, and `stop_reason`. `max_turns` / `maxTurns` and `max_budget_usd` / `maxBudgetUsd` cap the loop. No fields are marked as unstable. The trace surface is the `ResultMessage` from a completed agent loop run; step-level tool traces are in `AssistantMessage` content blocks during the loop.

4. **DeepEval architecture**: Core primitives: `LLMTestCase` (task), `EvaluationDataset` (task bank), `evals_iterator()` (runner), `Metric`/`GEval` (grader), `@observe` (trace). Nearly all metrics are LLM-as-judge; GEval scores 0–1 against a threshold using a criteria string.

5. **Arize Phoenix**: Open-source, built on OTel (OTLP wire protocol) + OpenInference semantic conventions. Trace module captures model calls, retrieval, tool use, and custom logic at the span level. Evaluators (LLM-as-judge, code-based, human annotation, third-party integrations) attach to datasets for automatic re-execution across experiments.
