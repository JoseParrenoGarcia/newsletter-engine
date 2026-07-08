# Outline: Why "It Worked Once" Is Not Evidence

**Target:** ~15 min read (~3,750 words)

---

## Sections

### Intro
**Purpose:** Open with the thesis. Claude Code is an acting system, not a chat interface. A single impressive run is not evidence of reliability. The discipline we apply to software — write tests — has disappeared from how we build with agents, and that gap has a cost.
**Approximate word count:** 200
**Sources:**
- [A non-coder's guide to Claude Code — Vox](https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs) — grounding the "felt like magic" reaction that makes false confidence so easy

### Preview section
**Heading:** `## What will we cover in this post?`
**Bullets:** 7 sections below
**Approximate word count:** 150

---

### 1. The run that felt like magic
**Purpose:** Set up the false comfort scenario concretely. Claude Code fixed a bug, generated a script, summarised a codebase. It looked impressive. It may even have been impressive. But "impressive once" is not the same as "reliable."
**Approximate word count:** 350
**Sources:**
- [A non-coder's guide to Claude Code — Vox](https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs)

### 2. Why LLMs are probabilistic, not deterministic
**Purpose:** Ground the core claim technically. Same prompt, different run, different output. This is not a quirk — it is the architecture. Introduce the empirical variance data as the anchor.
**Approximate word count:** 400
**Sources:**
- [Non-Determinism of "Deterministic" LLM Settings — arXiv:2408.04667](https://arxiv.org/abs/2408.04667) — up to 15% accuracy variation per run, 70% best-to-worst gap

### 3. The unit test we forgot to write
**Purpose:** The discipline analogy. Software engineers don't write tests because they expect their code to fail — they write tests because the discipline of verification is what separates "I think it works" from "I know it works." That same discipline has not been applied to agents. Why?
**Approximate word count:** 450
**Sources:**
- [Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — eval structure, discipline argument, value compounds over agent lifecycle
- [Claude Code best practices — code.claude.com](https://code.claude.com/docs/en/best-practices) — verification by discipline framing

### 4. Three questions you cannot answer without evals
**Purpose:** Make the cost of not having evals concrete. Three specific questions that matter to any engineer building with Claude Code — and that cannot be answered by running the workflow once and looking at the output.
**Sub-questions:**
- Did this revision make the skill better, or just different?
- Can Haiku handle this task as well as Sonnet?
- Is this failure new, or have we seen it before?
**Approximate word count:** 500
**Sources:**
- [Create custom subagents — code.claude.com](https://code.claude.com/docs/en/sub-agents) — model routing to Haiku for cost
- [Common workflows — code.claude.com](https://code.claude.com/docs/en/common-workflows) — iteration problem
- [Extend Claude with skills — code.claude.com](https://code.claude.com/docs/en/skills) — revision without measurement

### 5. What Claude Code is actually doing
**Purpose:** Reframe the unit of trust. Claude Code is not just answering — it is editing files, running commands, calling tools, firing hooks, loading memory, routing to subagents. The whole workflow is the thing that either worked or didn't. Evaluating only the final text output is like testing a function by reading its name.
**Approximate word count:** 500
**Sources:**
- [Claude Code overview — code.claude.com](https://code.claude.com/docs/en/overview) — acting system framing
- [How Claude remembers your project — code.claude.com](https://code.claude.com/docs/en/memory) — memory as part of the system under test
- [Claude Code settings and permissions — code.claude.com](https://code.claude.com/docs/en/settings) — configuration scope as a variable
- [Hooks reference — code.claude.com](https://code.claude.com/docs/en/hooks) — hooks as silent failure surface
- [Dive into Claude Code — arXiv:2604.14228](https://arxiv.org/abs/2604.14228) — architectural confirmation of system complexity
- [Harness Engineering for Agentic AI Coding Tools — arXiv:2602.14690](https://arxiv.org/abs/2602.14690) — configuration breadth in the wild

### 6. The failures that should have been caught
**Purpose:** Concrete failure-mode scenarios. Not hypothetical — these are the kinds of failures that are invisible on a single run but obvious in a regression suite. Hook fires silently but does nothing. Files edited in the wrong directory. Subagent returned a result that looked correct but wasn't. Tests skipped because the agent decided they were optional.
**Approximate word count:** 450
**Sources:**
- [Claude Code best practices — code.claude.com](https://code.claude.com/docs/en/best-practices) — "looks done" failure mode
- [Hooks reference — code.claude.com](https://code.claude.com/docs/en/hooks) — silent hook failures
- [On the Use of Agentic Coding Manifests — arXiv:2509.14744](https://arxiv.org/abs/2509.14744) — real-world configuration complexity that creates failure surface
- [Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — mistakes compound in agentic workflows

### 7. Evals are a thinking problem, not an infrastructure problem
**Purpose:** The reframe. Most of the work in building evals is deciding what "good" looks like — and that requires human judgment. It is not about YAML configs or LLM-as-judge pipelines. It is about sitting down and thinking through your workflow carefully enough to know what a correct run looks like. That is exactly the thinking we are starting to outsource.
**Approximate word count:** 400
**Sources:**
- [Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — "good evaluations help teams ship more confidently"

### Closing section
**Heading:** `## What comes next`
**Purpose:** Forward pointer to the series. Part 2 will map the evaluation surfaces. Part 3 will show how to build a first eval suite. The goal of this series is not to add complexity — it is to stop being surprised by the same failure twice.
**Approximate word count:** 200
**Sources:** None — model knowledge only

### Now, I want to hear from you
**Purpose:** Invite reflection. What workflow have you built with Claude Code that you trust — but have never tested?
**Approximate word count:** 100

---

## References
All 15 sources from `research_brief.md` mapped above.
