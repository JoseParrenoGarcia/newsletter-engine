# Research Brief: Why "It Worked Once" Is Not Evidence

**Generated:** 2026-07-07

## Summary

`notes.md` contained 13 unique URLs across two source categories: 8 official Claude Code documentation pages and 5 academic/community references. All 13 were reachable and validated. 2 additional sources were added via targeted search to fill gaps in the LLMs-are-probabilistic section and the unit-test analogy / evals-definition section. Total: 15 sources (13 from post folder, 2 via search). No sections remain uncovered. No URLs were dropped.

---

## Sources

### The run that felt like magic (false comfort scenario)

- **[A non-coder's guide to Claude Code — Vox](https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs)**
  Bryan Walsh's accessible explainer in Vox Future Perfect on what Claude Code is and why it has prompted extreme reactions in the tech community. Useful for grounding the opening hook: the sense of magic that non-specialists and specialists alike experience on first encounter with Claude Code, before any discipline of evaluation sets in.

---

### LLMs are probabilistic, not deterministic

- **[Non-Determinism of "Deterministic" LLM Settings — arXiv:2408.04667](https://arxiv.org/abs/2408.04667)**
  Empirical study investigating non-determinism across five LLMs configured to be deterministic, run on eight common tasks across 10 runs each. Found accuracy variation up to 15% across runs, and a gap between best and worst possible performance of up to 70%. None of the LLMs consistently delivered repeatable accuracy. Directly grounds the post's claim that "it worked once" is not evidence — even under supposedly deterministic settings, outputs vary.

---

### The unit test we forgot to write (discipline analogy)

- **[Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)**
  Anthropic's own engineering post on evaluation for AI agents, published January 2026. Defines the structure of an eval (input → grading logic → output), distinguishes single-turn from multi-turn and agent evals, explains how mistakes propagate and compound in agentic workflows, and argues that good evals help teams ship more confidently instead of catching failures only in production. The most authoritative source available for both the "what an eval is" section and the argument that evals compound value over an agent's lifecycle — the discipline argument.

- **[Claude Code best practices — code.claude.com](https://code.claude.com/docs/en/best-practices)**
  Anthropic's official best practices guide, which frames Claude Code as an agentic coding environment where the user describes goals and Claude autonomously explores, plans, and implements. Emphasises giving Claude a verifiable check (tests, build, screenshot) rather than relying on "looks done" as the only signal. Supports the unit-test analogy: verification by discipline, not by assumption.

---

### Three questions you cannot answer without evals

- **[Create custom subagents — code.claude.com](https://code.claude.com/docs/en/sub-agents)**
  Official docs on Claude Code subagents — specialised agents with their own context, tool permissions, and model. Explicitly mentions routing tasks to "faster, cheaper models like Haiku" to control costs. Directly anchors the cost management question: "Can Haiku replace Sonnet for this task?" requires evals to answer — you cannot know without measuring.

- **[Common workflows — code.claude.com](https://code.claude.com/docs/en/common-workflows)**
  Short recipes for everyday Claude Code development tasks: exploring codebases, fixing bugs, running tests, creating PRs, and automation pipelines. Useful for illustrating the iteration problem — each of these repeated workflows is a candidate where prompt/skill revision may produce a different but not obviously better result.

---

### What Claude Code is actually doing (acting system, not chat interface)

- **[Claude Code overview — code.claude.com](https://code.claude.com/docs/en/overview)**
  Official overview establishing that Claude Code is an AI-powered coding assistant that reads codebases, edits files, runs commands, and integrates with development tools across multiple surfaces (Terminal, VS Code, Desktop, Web, JetBrains). Anchors the "acting system" framing: Claude Code is not answering questions, it is doing things inside an environment.

- **[How Claude remembers your project (CLAUDE.md and memory) — code.claude.com](https://code.claude.com/docs/en/memory)**
  Documents the two persistence mechanisms: CLAUDE.md files (user-written, project/user/org scope) and auto-memory (Claude-written learnings). Relevant to the acting-system section because memory is part of what Claude loads before each session — the instructions it receives are part of the system under test, not just the model.

- **[Claude Code settings and permissions — code.claude.com](https://code.claude.com/docs/en/settings)**
  Documents the four-tier configuration scope system (Managed, User, Project, Local) and all available settings. Relevant to showing how many variables compose the system under test: scope overrides, permission lists, hooks, MCP servers — all of these affect what Claude does, not just the model.

- **[Extend Claude with skills — code.claude.com](https://code.claude.com/docs/en/skills)**
  Documents the skills system — SKILL.md files that give Claude reusable, invocable procedures. Skills bodies load only when used. Directly relevant to the iteration problem: when a skill is revised, there is no built-in mechanism to confirm the revision improved outcomes.

- **[Hooks reference — code.claude.com](https://code.claude.com/docs/en/hooks)**
  Full reference for the hooks system — user-defined shell commands, HTTP endpoints, or LLM prompts that fire automatically at specific lifecycle points (PreToolUse, PostToolUse, Stop, SessionStart, etc.). Hooks are part of the system under test: if a hook fails silently, an eval would catch it; a visual inspection of a single run would not.

- **[On the Use of Agentic Coding Manifests: An Empirical Study of Claude Code — arXiv:2509.14744](https://arxiv.org/abs/2509.14744)**
  Empirical study of 253 CLAUDE.md files from 242 repositories. Finds that manifests typically have shallow hierarchies dominated by operational commands, technical implementation notes, and high-level architecture. Grounds the observation that Claude Code configuration is a real-world engineering practice, not just a prompt — supporting the "system under test is bigger than the model" argument.

- **[Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems — arXiv:2604.14228](https://arxiv.org/abs/2604.14228)**
  Architectural analysis of Claude Code's public source code, identifying the core while-loop, permission system, five-layer compaction pipeline, four extensibility mechanisms (MCP, plugins, skills, hooks), and subagent orchestration. Confirms that the system around the model loop is where most of the complexity lives — directly supporting the thesis that the system under test is bigger than the model.

- **[Harness Engineering for Agentic AI Coding Tools: An Exploratory Study — arXiv:2602.14690](https://arxiv.org/abs/2602.14690)**
  Systematic analysis of configuration mechanisms for five agentic AI coding tools including Claude Code, covering 2,853 GitHub repositories. Finds that Claude Code users employ the broadest range of configuration mechanisms. Relevant background for Part 1's argument that the workflow — not just the model response — is the unit of trust.

- **[Agentic Education: Using Claude Code to Teach Claude Code — arXiv:2604.17460](https://arxiv.org/abs/2604.17460)**
  Study presenting a modular curriculum for learning Claude Code through hands-on project construction, including adaptive scaffolding and hook-based engagement metrics. Relevant as contextual evidence that Claude Code is being adopted broadly enough that systematic quality assessment is becoming a real concern.

---

### The failures that should have been caught (failure modes)

*(Sources from "What Claude Code is actually doing" section above also apply here — particularly the hooks reference and architecture papers for concrete failure-mode examples: hooks that fire silently incorrectly, wrong files edited, subagent delegation errors.)*

- **[Claude Code best practices — code.claude.com](https://code.claude.com/docs/en/best-practices)**
  *(Already listed above.)* The verification section explicitly names the failure mode this post is warning about: without a check Claude can run, "looks done" is the only signal, and every mistake waits for you to notice it.

---

### Evals are a thinking problem, not an infrastructure problem

- **[Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)**
  *(Already listed above.)* The article's framing that "good evaluations help teams ship AI agents more confidently" and that evals' "value compounds over the lifecycle of an agent" supports the argument that the real cost of not having evals is reactive loops — catching issues in production rather than before. The work of deciding what "good" looks like is the design challenge, not the infrastructure.

---

## Research Gaps

None. All eight ToC sections have at least one source mapped to them.

---

## Dropped Sources

None. All 13 URLs from `notes.md` were reachable and returned usable content.
