# Outline: What you actually need to test — Claude Code evals, Part 2

**Word count target:** 3,000 words (12 min × 250)
**Content type:** series-genai
**Series position:** 2 of 3

---

## Sections

### Series recap (before preview)
- 2–4 bullets: "In this series so far"
- Then: "In this part, we cover..."
- Sources: n/a (structural)

### Preview section
- Labelled bullet list — one entry per major content section
- Sources: n/a (structural)

### 1. Why does evaluating the final output miss most of what can go wrong?
- Core argument: the A/B test document looked correct — but that is one surface out of nine. The document being right does not mean the path to it was right, the right file was written, the right tools were used, or the right skill triggered.
- Key teaching point: final output evals are necessary but not sufficient.
- Example: document passes rubric checks but was saved to the wrong folder; no invented metrics but the skill drafted from memory without reading `docs/metrics.md`.
- Sources: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

### 2. What do repository state evals actually check?
- Core argument: Claude Code writes files, creates artefacts, modifies the repo. The eval environment is the repo, not just the text output.
- What to check: correct path, no unexpected side effects, no extra files created.
- Graders: `git diff --name-only`, path assertions, snapshot comparison.
- Example: document saved to `scratch/` instead of `docs/experiments/`; extra `.bak` file created.
- Sources: [Claude Code overview](https://code.claude.com/docs/en/overview), [Dive into Claude Code — arXiv:2604.14228](https://arxiv.org/abs/2604.14228)

### 3. What does a tool-use eval measure?
- Core argument: Claude Code's quality depends on which tools it calls and in what order. Reading the canonical reference before writing is not guaranteed — it is a testable behaviour.
- What to check: `Read` to `docs/metrics.md` appears before `Write`; no unnecessary tool calls; no drafting from memory when context was available.
- Graders: transcript inspection, tool-call log assertions.
- Example: skill passes final output checks but never read the metrics reference — it invented plausible-sounding metrics.
- Sources: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), [Claude Code best practices](https://code.claude.com/docs/en/best-practices)

### 4. How do you test a trajectory, not just an outcome?
- Core argument: for some workflows, the path is part of the quality bar. A workflow that arrives at the right answer via an unexpected detour may be fragile or expensive.
- What to check: step order, absence of unexpected tool calls, no backtracking loops.
- Graders: trace assertions, event-sequence checks.
- Example: skill read the metrics file twice, ran a shell command mid-draft, then wrote the document — correct output, inefficient and surprising path.
- Sources: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), [Dive into Claude Code — arXiv:2604.14228](https://arxiv.org/abs/2604.14228)

### 5. What are skill evals — and why do they have three distinct forms?
- Core argument: a skill can fail in three independent ways — it fails to trigger, it triggers when it should not, or it triggers and does the wrong thing.
- Three types: trigger eval (did the right skill fire?), negative trigger eval (did the skill stay silent when it should?), execution eval (did the triggered skill produce a correct result?).
- Example: a document-drafting skill triggers on a ticket-classification request; or a refactoring skill stays silent when the user pastes a diff that should invoke it.
- Sources: [Extend Claude with skills](https://code.claude.com/docs/en/skills), [Configuring Agentic AI Coding Tools — arXiv:2602.14690](https://arxiv.org/abs/2602.14690)

### 6. How do you evaluate agent and subagent delegation?
- Core argument: when a task is delegated to a subagent, you have two new failure modes — wrong delegation (wrong subagent, wrong context passed) and bad integration (main agent ignores or misuses the subagent's output).
- What to check: correct subagent triggered, context passed completely, output integrated correctly.
- Graders: agent trace, output comparison.
- Example: statistical reasoning delegated to a subagent; main agent ignores its recommendation and drafts its own assumption set.
- Sources: [Create custom subagents](https://code.claude.com/docs/en/sub-agents)

### 7. What should hook and command evals actually test?
- Core argument: hooks are control-plane tools, not output-quality tools. A hook that silently fails is worse than no hook — you believe the behaviour is enforced when it is not.
- What to check: hook fired, hook produced expected side effect (log written, forbidden action blocked), hook did not block valid actions.
- Key distinction: `CLAUDE.md` instructions are context; hooks are enforcement. Only hooks can guarantee a behaviour regardless of the model's decision.
- Example: post-write hook should log any invented metric names; hook ran but wrote an empty log; silent failure.
- Sources: [Claude Code hooks](https://code.claude.com/docs/en/hooks), [Claude Code memory and CLAUDE.md](https://code.claude.com/docs/en/memory), [On the Use of Agentic Coding Manifests — arXiv:2509.14744](https://arxiv.org/abs/2509.14744)

### 8. Why do cost and latency deserve their own eval surface?
- Core argument: a workflow that passes all quality checks on Sonnet but fails on Haiku is a different kind of failure — not correctness, but economics. Cost/latency evals let you make model routing decisions with evidence.
- What to check: pass rate across models, cost per run, latency distribution, acceptable degradation threshold.
- Example: run the A/B test document eval set on Haiku; compare pass rate vs Sonnet; decide whether the gap justifies the cost difference.
- Sources: [Create custom subagents](https://code.claude.com/docs/en/sub-agents), [Claude Code best practices](https://code.claude.com/docs/en/best-practices)

### 9. When does human usefulness need to sit alongside automated grading?
- Core argument: a document can pass every automated check and still be useless to the team running the experiment. Human usefulness evals close the gap between "technically correct" and "actually helpful".
- What to check: would a statistician sign off on the reasoning? Is the hypothesis falsifiable? Is the sample size justification sound?
- When to use: for high-stakes outputs, for workflows where the failure mode is plausible-but-wrong rather than wrong-format, for calibrating LLM-as-judge rubrics.
- Key teaching point: automated grading checks form; human review checks function.
- Sources: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

### Closing section — Key takeaways from Part 2
- Numbered key takeaways, one per surface cluster
- Bridge to Part 3: now that the map exists, Part 3 shows how to build the suite
- Sources: n/a

### Now, I want to hear from you
- Reflective question to the reader
- Sources: n/a

---

## Source inventory

| Source | Sections |
|--------|----------|
| [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 1, 3, 4, 9 |
| [Claude Code overview](https://code.claude.com/docs/en/overview) | 2 |
| [Dive into Claude Code — arXiv:2604.14228](https://arxiv.org/abs/2604.14228) | 2, 4 |
| [Claude Code best practices](https://code.claude.com/docs/en/best-practices) | 3, 8 |
| [Extend Claude with skills](https://code.claude.com/docs/en/skills) | 5 |
| [Configuring Agentic AI Coding Tools — arXiv:2602.14690](https://arxiv.org/abs/2602.14690) | 5 |
| [Create custom subagents](https://code.claude.com/docs/en/sub-agents) | 6, 8 |
| [Claude Code hooks](https://code.claude.com/docs/en/hooks) | 7 |
| [Claude Code memory and CLAUDE.md](https://code.claude.com/docs/en/memory) | 7 |
| [On the Use of Agentic Coding Manifests — arXiv:2509.14744](https://arxiv.org/abs/2509.14744) | 7 |
