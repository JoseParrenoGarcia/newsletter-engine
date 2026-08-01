# Notes: Claude Code Evals Part 3 — The Evaluation Frameworks Landscape

---

## Brainstorm Summary

Part 3 of the Claude Code Evals series is a conceptual orientation post. It sits between the "why" (Part 1) and "what to test" (Part 2) on one side, and the hands-on deep dives (Parts 4 and 5) on the other. The central argument is that Anthropic defined the architecture for evaluating AI agents — in their demystifying evals engineering post — and the entire eval tooling industry has independently converged on the same five or six modules. That convergence is the evidence that the concepts are right, not vendor-specific.

The post is Anthropic-first. The Anthropic engineering post is the conceptual spine. Skill-creator is the Claude Code-native implementation of those concepts shown at light-to-medium depth. The industry frameworks (LangSmith, OpenAI Evals, DeepEval, MS AI Foundry, Arize Phoenix, Galileo, Maxim) appear as corroboration — each one naming the same module differently. The Lazzeri Medium article is a reference for the enterprise platform deep-dive, not something to replicate.

The opening hook uses the Anthropic-first angle: here is how Anthropic thinks about evaluating agents, and here is why that architecture is correct. The grader hierarchy (deterministic → LLM-as-judge → human) gets its own section because it is the most underappreciated module and the one where most teams get the order wrong. The "how to pick" section is a decision tree anchored to where a Claude Code team actually is — not a feature comparison table.

The series is now five parts. Parts 4 and 5 are forward-pointed at the end of this post: Part 4 dissects skill-creator in detail, Part 5 runs it against real Claude Code skills.

---

## Rough Table of Contents

- **Opening hook** — Anthropic's position: here is how the team building Claude thinks about evaluating agents. The eval structure (input, grading criterion, check) is deceptively simple. The rest of the post explains why it works.
- **Why agent evals compound** — from the Anthropic engineering post: mistakes in agentic workflows compound across steps. This changes what evaluation needs to cover compared to single-turn LLM outputs.
- **The five common modules** — the conceptual DNA shared by every eval framework: (1) task bank, (2) runner, (3) graders, (4) trace/transcript, (5) baseline comparison, (6) continuous loop. Each module named in Anthropic's terms first, then cross-referenced to industry equivalents.
- **The grader hierarchy in depth** — deterministic first, then programmatic, then LLM-as-judge, then human. Why the order matters. Where LLM-as-judge fits and where it does not.
- **Skill-creator: the Claude Code-native implementation** — how skill-creator instantiates each of the five modules: evals.json (task bank), subagent runner, grader.md + assertions (grader hierarchy), timing.json (trace), with/without baseline comparison, iteration-N loop (continuous loop). Enough to show the architecture; Part 4 goes inside it.
- **The industry landscape in three clusters** — brief orientation: code-first open-source (OpenAI Evals, DeepEval, Promptfoo), tracing-first (LangSmith, Arize Phoenix, Langfuse), enterprise end-to-end (MS AI Foundry, Galileo, Maxim). The convergence observation: all three clusters are adding agent evaluation, LLM-as-judge, and continuous loops.
- **How to pick** — decision tree for Claude Code teams: start with what you already have (skill-creator); reach for Arize Phoenix when you need framework-agnostic tracing at scale; LangSmith if LangChain-based; MS AI Foundry if Azure/enterprise; Galileo if hallucination-critical.
- **What comes next** — forward pointer to Part 4 (inside skill-creator) and Part 5 (example runs evaluating real Claude Code skills).

---

## Key Sources (from research_brief.md)

### Anthropic (primary spine)
- **Demystifying evals for AI agents** — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents — five-module structure, eval types, how mistakes compound in agentic workflows
- **Claude Code Agent SDK overview** — https://code.claude.com/docs/en/agent-sdk/overview — officially stable `ResultMessage` fields: `num_turns`, `usage`, `total_cost_usd`, `session_id`, `stop_reason`
- **Claude Code skills** — https://code.claude.com/docs/en/skills
- **Claude Code hooks** — https://code.claude.com/docs/en/hooks
- **Claude Code subagents** — https://code.claude.com/docs/en/sub-agents
- **Claude Code memory** — https://code.claude.com/docs/en/memory
- **Claude Code best practices** — https://code.claude.com/docs/en/best-practices
- **Claude Code common workflows** — https://code.claude.com/docs/en/common-workflows

### Code-first open-source cluster
- **OpenAI Evals GitHub** — https://github.com/openai/evals — YAML task bank, Completion Function Protocol runner, template + model-graded grader hierarchy
- **DeepEval docs** — https://docs.confident-ai.com/docs/getting-started — LLMTestCase as the task bank unit, evaluate() runner, LLM-as-judge primitives, `@observe` for tracing
- **Microsoft eval-guide** — https://github.com/microsoft/eval-guide — adds triage distinction, risk tiers, named test data strategies beyond generic frameworks

### Tracing-first cluster
- **Arize Phoenix docs** — https://docs.arize.com/phoenix — OTel/OpenInference architecture, span-level trace module, agent trajectory evaluation, framework-agnostic

### Enterprise end-to-end cluster
- **Lazzeri PDF** (in post folder) — MS AI Foundry, Copilot Studio, LangSmith, Arize, Galileo, Maxim — full comparative coverage

### Academic / structural support
- **arXiv:2604.14228** — Dive into Claude Code — https://arxiv.org/abs/2604.14228
- **arXiv:2602.14690** — Harness Engineering for Agentic AI Coding Tools — https://arxiv.org/abs/2602.14690
- **arXiv:2509.14744** — On the Use of Agentic Coding Manifests — https://arxiv.org/abs/2509.14744
- **arXiv:2604.17460** — Agentic Education — https://arxiv.org/abs/2604.17460

---

## Topics to Cover

- Anthropic's demystifying evals post as the conceptual spine — the eval structure (input, grading criterion, check) and why agent evals compound mistakes
- The five common modules shared by every eval framework: task bank, runner, graders, trace/transcript, baseline comparison, continuous loop
- The grader hierarchy in depth: deterministic → LLM-as-judge → human, and why most teams get the order wrong
- Skill-creator as the Claude Code-native implementation of these modules (light-to-medium depth — full dissection is Part 4)
- The industry landscape in three clusters: code-first open-source (OpenAI Evals, DeepEval, Promptfoo), tracing-first (LangSmith, Arize Phoenix), enterprise end-to-end (MS AI Foundry, Galileo, Maxim)
- How the industry converged on the same architecture — validating the concepts are right, not vendor-specific
- How to pick: a decision tree anchored to where a Claude Code team actually is
- Forward pointer to Part 4 (skill-creator deep dive) and Part 5 (example runs)

## Topics to Exclude

- Deep feature-by-feature enterprise platform comparison (Lazzeri's article covers this — reference it, don't replicate it)
- Step-by-step tutorial for building an eval suite (that is Part 5)
- The A/B testing skill worked example thread (moved to Part 5)
- Analytics agent and writing-format agent worked examples (moved to Part 5)
- Pricing, SLA, or procurement guidance for eval platforms
