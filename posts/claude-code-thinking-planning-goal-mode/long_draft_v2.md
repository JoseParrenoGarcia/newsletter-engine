# You Don't Need Ultrathink. You Need a Plan.

*Why Claude Code's most-hyped setting matters less than the discipline you apply before you prompt*

For months, I had been selecting "high" for thinking effort in Claude Code without being sure it was doing anything useful.

I knew there was a selector. I knew the options went from low to max. I had a vague assumption that "high" was better, the way you might choose the premium fuel option at a rental car counter without fully understanding your engine. But I had no mental model for what I was actually buying — how much more thinking, for what kinds of tasks, at what cost.

That uncertainty started to bother me when I noticed a [quality regression warning](https://www.anthropic.com/engineering/april-23-postmortem) from Anthropic's engineering team in April 2026. They had briefly dropped the default effort level from `high` to `medium` during a model update, and performance degraded visibly enough that they reverted it. That single fact told me these settings are not cosmetic. They map directly to how much the model reasons before acting.

So I went and read the docs properly.

What I found was not a dial. It was three distinct control surfaces — thinking levels, planning mode, and goal mode — each solving a different problem, often confused with one another, and more useful when understood in relation to each other than when treated as independent features.

The key insight: **planning mode is the organising concept**. Thinking levels and model selection are knobs you tune within it. Goal mode extends it to long-running work. Understanding that hierarchy changed how I work, and this post explains why.

---

## What This Post Covers

- **What are Claude Code thinking levels? Budgeted deliberation, not intelligence.** What effort levels actually are, how the values map to different models, and when to stop using "high" by default.
- **What is Claude Code planning mode?** Why agents fail when they act too early, and why plan mode has become my default working posture for anything non-trivial.
- **Planning mode as the umbrella: model, effort, and execution.** How `opusplan` and `/ultraplan` express the same idea in product form — and why model selection makes more sense once you understand planning phases.
- **What is Claude Code goal mode?** How `/goal` works, how it differs from `/loop` and Stop hooks, and why the evaluator mechanism matters.
- **Writing a goal that has a finish line.** The five things every effective goal needs, with weak and strong examples.
- **Does Codex do the same?** A brief comparison showing these controls are converging as a standard across agentic coding tools.
- **When not to use these modes.** High effort is not always better. Plan mode is not always necessary. Goal mode without a verifiable end state is a bad idea.
- **Four practical patterns for combining planning mode and goal mode.** Reusable combinations for common real-world situations.

---

## What Are Claude Code Thinking Levels? Budgeted Deliberation, Not Intelligence

Effort levels sit along what Anthropic calls the [test-time-compute curve](https://www.anthropic.com/engineering/april-23-postmortem). The model can reason before it acts — generating internal steps, evaluating approaches, checking assumptions — and effort levels control how much of that reasoning budget it uses.

More reasoning does not mean smarter output in any guaranteed sense. A model can reason at `max` effort and still get a hard problem wrong. What higher effort buys is more deliberation: more opportunity to catch inconsistencies, compare approaches, and avoid shallow mistakes. **Reasoning effort is budgeted deliberation, not guaranteed correctness.**

The current values depend on the model you're using ([full model config reference](https://code.claude.com/docs/en/model-config)):

| Model | Supported effort levels | Default |
|---|---|---|
| Opus 4.8 | low / medium / high / xhigh / max | high |
| Opus 4.7 | low / medium / high / xhigh / max | xhigh |
| Opus 4.6 | low / medium / high / max | high |
| Sonnet 4.6 | low / medium / high / max | high |

You can change the level mid-session with `/effort <level>` — available since Claude Code [v2.1.76](https://github.com/ThamJiaHe/claude-code-handbook/blob/main/docs/ultrathink-thinking-modes.md).

The cost trade-off is real. Higher effort is slower and consumes more tokens. That matters when you're running many sequential tasks or building workflows where latency compounds. [Anthropic's April 2026 postmortem](https://www.anthropic.com/engineering/april-23-postmortem) noted explicitly that effort levels are the mechanism they expose to set the trade-off between more thinking, lower latency, and fewer usage-limit hits.

The practical rule of thumb: scale effort to reasoning burden, not to perceived task importance.

- `low` — find a file, explain a function, run a known command. The reasoning load is minimal. Low effort is fast and accurate.
- `medium` — standard bug fixes, adding tests, straightforward refactors. The default is well-calibrated for most everyday work.
- `high` / `xhigh` — architecture decisions, multi-file migrations, debugging with an unclear root cause, security-sensitive code, public API changes. These are the cases where shallow reasoning produces mistakes.

You may have seen the word `ultrathink` in the wild — it circulated in the Claude Code community as a [prompt keyword for maximum reasoning](https://github.com/ThamJiaHe/claude-code-handbook/blob/main/docs/ultrathink-thinking-modes.md). It still works as an in-prompt signal. The official surface for this is `/effort max`, but both route to the same place. The community shorthand is not wrong; it is just not the current official framing.

That trade-off — cost against depth — tells you when to use high effort. But it does not tell you what to do with it once you have it. That is where planning mode comes in.

---

## What Is Claude Code Planning Mode?

The most common way coding agents go wrong is not the reasoning. It is the timing.

An agent reads a task description, makes a decision about what to change, and starts editing. It fixes the visible symptom rather than the underlying problem. It modifies the wrong abstraction layer. It refactors a module it has not fully understood yet. By the time you notice, several files have changed and the changes are harder to reason about than the original problem.

Planning mode creates a phase boundary. The agent moves into a mode where it explores and proposes, but does not edit. The flow becomes:

```
inspect → reason → propose plan → wait
```

You see what the agent intends to do before it does anything. You can correct misunderstandings at the cheapest possible moment — before they are baked into code.

[Anthropic's official best practices guide](https://code.claude.com/docs/en/best-practices) describes a four-phase workflow: Explore, Plan, Implement, Verify. Plan mode enforces the boundary between phases two and three. The agent does not move from planning to implementation until you explicitly allow it.

How to use it is simple. In an interactive session:

```
Be sure to think carefully and thoroughly BEFORE making any changes. Investigate the problem first.
```

Or switch explicitly to plan mode:

```
/plan Inspect the authentication service and propose a migration from session cookies to JWTs. List affected modules, risks, and rollback considerations. Do not edit files.
```

The `Ctrl+G` shortcut [opens the proposed plan](https://code.claude.com/docs/en/best-practices) in your editor before Claude proceeds, which means you can annotate, reorder, or discard it before a single file changes.

I have made plan mode my default working posture for anything that touches more than two files, involves architecture, or carries a non-trivial reversal cost. The overhead is one extra exchange. The protection is that I understand what is about to happen before it happens.

The deeper reason planning mode has value is not just the inspection. It changes the question you ask. Without plan mode, the question is: "Did Claude do this correctly?" With plan mode, the question first is: "Is this the right plan?" Those are different questions, and the second one is much easier to answer before files change.

Planning mode also unlocks a cleaner understanding of model and effort choices — because once you separate design from execution, it becomes obvious that they do not need the same resources.

---

## Planning Mode as the Umbrella: Model, Effort, and Execution

If planning and execution are different phases, they can use different configurations. More reasoning during the design phase, lighter execution once the plan is approved and the path is clear.

Claude Code's [`opusplan` model alias](https://code.claude.com/docs/en/model-config) makes this explicit. When you set `/model opusplan`:

- Claude uses **Opus** during plan mode for complex reasoning and architecture decisions
- Claude automatically switches to **Sonnet** during execution for code generation and implementation

The analogy is close enough to be useful: heavier reasoning when choosing the path, more efficient execution once the path is chosen. The senior judgment for design, the competent implementation for the build. The shift between models is automatic — you do not manage it manually.

A second, newer addition is [`/ultraplan`](https://code.claude.com/docs/en/ultraplan), currently in research preview and requiring Claude Code v2.1.91 or later. Ultraplan hands the planning task from the local CLI to a Claude Code web session. Claude drafts the plan in the cloud while your terminal stays free. When the plan is ready, you open it in the browser, comment on specific sections, request revisions, and decide where to execute it — on the web or back in the terminal.

Ultraplan is not the right tool for every planning task. It adds a cloud round-trip and a browser context switch. What it gives you is a richer review surface: you can annotate specific paragraphs, ask for alternatives, and then bring the final plan back to the terminal with a single action. For complex architecture designs, that review depth is worth the extra step.

The common thread across plan mode, `opusplan`, and ultraplan is the same idea applied at different levels: **separate design from execution, and give each phase what it actually needs.**

---

## What Is Claude Code Goal Mode?

A normal prompt hands control back to you when Claude finishes its response. You read the result, decide what to do next, and type again. That loop works well for most tasks. It breaks down when the work is iterative: run tests, inspect failure, patch, rerun, repeat.

For those tasks, the interaction pattern looks like this in practice:

```
"Make the tests pass"
→ [Claude makes changes]
"The tests still fail, try again"
→ [Claude tries again]
"Still failing, look at the imports"
→ [Claude adjusts]
"Now there's a new failure..."
```

You become the scheduler — deciding after every turn whether Claude should continue. Goal mode removes that overhead. The [official Claude Code docs](https://code.claude.com/docs/en/goal) describe it as: set a completion condition, and Claude keeps working across turns until a model evaluator confirms the condition holds.

The mechanism matters here. After each turn, a small fast model checks whether your stated condition is met. If the condition holds, the goal clears and Claude returns control. If it does not, Claude starts another turn automatically — without you prompting it. The loop is `work → check → continue or complete`, not `work → wait → you decide → continue`.

Goal mode [shipped in Claude Code v2.1.139](https://code.claude.com/docs/en/goal) on May 12, 2026, [confirmed on launch day](https://explainx.ai/blog/claude-code-goal-command-long-running-agents-2026).

Three persistent-work modes exist in Claude Code, and they solve different problems:

| Mode | When next turn starts | When it stops |
|---|---|---|
| `/goal` | When the previous turn finishes | When a model confirms the condition holds |
| `/loop` | When a time interval elapses | When you stop it, or Claude decides the work is done |
| Stop hook | When the previous turn finishes | When your own script or prompt decides |

The [comparison in the official docs](https://code.claude.com/docs/en/goal) adds one more useful line: **auto mode removes per-tool prompts; `/goal` removes per-turn prompts.** They are complementary. Auto mode handles tool-level friction; goal mode handles turn-level friction. Together they let Claude work through a substantial task with minimal interruption.

Good use cases for goal mode include tasks where the path is uncertain but the end state is verifiable:

- Making a specific test suite pass
- Reducing benchmark latency below a threshold
- Migrating all call sites until they compile cleanly
- Working through a labelled issue backlog until the queue is empty
- Splitting large files until each is under a size constraint

The common property is that Claude needs to try, observe, and adjust — and the outcome can be confirmed by a concrete check. That confirmation is what the evaluator runs after each turn.

But goal mode is only as useful as the goal you give it. A vague goal produces a vague loop.

---

## Writing a Goal That Actually Has a Finish Line

The most common failure mode with `/goal` is a condition that cannot be evaluated. "Improve code quality" gives the evaluator nothing to test. The loop continues until it times out or you cancel it, and the work produced is whatever Claude guesses "improvement" means.

A well-formed goal has five components:

1. **Outcome** — what should be true when the work is done
2. **Verification surface** — how to confirm it (a command to run, an artefact to check, a metric to hit)
3. **Constraints** — what must not change
4. **Boundaries** — which files, directories, or systems are in scope
5. **Stop condition** — when to halt and report a blocker rather than keep trying

The [OpenAI Codex cookbook](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex) describes the same five components with a clean template:

```
/goal <desired end state> verified by <specific evidence> 
while preserving <constraints>. Only modify <boundaries>. 
If blocked by <condition>, stop and report evidence.
```

This template applies directly to Claude Code's `/goal` — the pattern is tool-agnostic.

**Weak goal:**

```
/goal fix the authentication bug
```

The evaluator has no check to run. "Fixed" is not defined.

**Stronger goal:**

```
/goal Make tests/auth/test_login.py pass on the current branch, 
verified by running pytest tests/auth/test_login.py with exit code 0. 
Preserve the existing public API. Only modify files under src/auth 
and tests/auth. If a test requires external credentials not available 
locally, stop and report which credential and what step failed.
```

The evaluator can now run `pytest tests/auth/test_login.py` after each turn and confirm whether the condition holds. The constraint prevents scope creep. The stop condition prevents an infinite loop on a problem that requires human intervention.

One constraint worth noting: Claude Code's [condition field has a 4,000 character limit](https://code.claude.com/docs/en/goal). That is generous for a well-structured goal — it is only a constraint if you are writing a novel instead of a completion condition.

The underlying principle from the [Codex cookbook](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex) holds: **a goal is not a longer prompt. It is a completion contract.** The agent needs to know what success looks like in terms it can evaluate, not in terms that only make sense to you.

---

## Does Codex Do the Same?

Yes. OpenAI's Codex has [`model_reasoning_effort`](https://developers.openai.com/codex/config-reference) (values: minimal, low, medium, high, xhigh), a `/plan` slash command that switches to plan mode, and a [`/goal` command](https://developers.openai.com/codex/cli/slash-commands) for persistent objectives.

Codex's goal mode [became generally available on May 21, 2026](https://developers.openai.com/codex/changelog) (CLI 0.133.0). Claude Code's `/goal` shipped nine days earlier, on May 12, 2026 (v2.1.139). Both tools arrived at the same three-layer control model within the same two-week window.

Codex adds one configuration detail worth noting: [`plan_mode_reasoning_effort`](https://developers.openai.com/codex/config-reference) is a separate config key, which lets you set a different effort level specifically for plan-mode sessions. Claude Code achieves the same outcome through `opusplan`, which routes plan-mode work to a heavier model automatically.

The point of this comparison is not to declare a winner. The point is that **reasoning effort, plan mode, and goal mode are converging as the standard control surface for agentic coding tools** — not because one team copied the other, but because these are the natural answers to the same underlying problem. If you learn these concepts in Claude Code, you can apply the same mental model to Codex, or to whatever tool arrives next with a different set of product names for the same three ideas.

---

## When Not to Use These Modes

High effort is not the right choice for every task. Plan mode is not the right choice for every task. Goal mode is not the right choice for every task.

**Skip high effort** when the task is simple, the path is obvious, and the output is easy to verify. Using `xhigh` to rename a variable or find a file costs tokens and adds latency for no practical benefit. Match effort to reasoning burden, not to how important the task feels.

**Skip plan mode** when the change is a single line with no ambiguity, you are asking for an explanation rather than an implementation, or the task is so well-defined that there is genuinely only one sensible approach. Plan mode adds a round-trip; do not add it when the round-trip has no value.

**Skip goal mode** when the finish line is vague and you have no verification command. Without a measurable condition, the evaluator cannot confirm completion and the loop either runs indefinitely or terminates on a guess. Also skip it when the task could cause broad unintended changes before a human checkpoint — goal mode reduces turn-by-turn oversight, which is a feature for iterative test repair and a risk for anything touching production infrastructure.

The general principle: use more control when the stakes are higher, not when the task sounds bigger. A well-scoped prompt with medium effort often outperforms a high-effort goal on a task that did not need the complexity.

---

## Four Practical Patterns for Combining Planning Mode and Goal Mode

These are the combinations I reach for most often, with one-line examples of each.

**Pattern 1: Low effort + inspect only**

For exploration and search tasks with no side effects. Fast, cheap, and sufficient.

```
/effort low
Find where the checkout latency benchmark is defined. Return the file path and command. Do not edit anything.
```

**Pattern 2: High effort + plan mode**

For architecture decisions, migrations, or any task where understanding the full scope matters before touching files.

```
/effort xhigh
/plan Inspect the reporting pipeline and propose a migration from pandas to Polars. List affected modules, test strategy, and risks. Do not edit files.
```

**Pattern 3: Plan → review → goal**

The most reliable pattern for substantial work. Spend a turn getting the plan right, then execute it autonomously.

```
/plan Inspect the auth service and propose a JWT migration plan. Include affected files, risks, rollback plan. Do not edit.
```

Review the plan. Then:

```
/goal Implement the approved JWT migration verified by passing tests/auth. Preserve public API. Only touch src/auth and tests/auth. If any test requires external infrastructure, stop and report.
```

**Pattern 4: Goal with strict boundaries**

For iterative work on a well-defined scope where you want Claude to keep going but not wander.

```
/goal Split src/payments/processor.py into focused modules until each file is under 300 lines, all imports updated, and the payment test suite passes. Do not change public API signatures. Do not add dependencies. If any test requires credentials, stop and report.
```

The boundaries in pattern 4 are not optional decoration. They are what keeps "technically successful" work from solving the goal by quietly changing the constraints.

---

## Closing Thoughts

Every Claude Code post in this series has been about the same underlying question: how do you make agent behaviour predictable and useful at scale?

Memory answers that at the session level — what context Claude carries into each conversation. Rules answer it at the project level — what constraints apply where. Skills and agents answer it at the workflow level — what reusable patterns exist and who executes them.

Thinking levels, planning mode, and goal mode answer it at the execution level: **how much should Claude reason, when should it wait, and when should it keep going without being asked?**

These are not power-user features. They are the controls that separate prompt engineering from workflow engineering. A well-scoped prompt with the right effort level and a clear plan will outperform an elaborate chain of clever instructions almost every time.

The shift I'd encourage: stop thinking about these as separate settings to configure, and start thinking about them as questions to answer before every non-trivial task.

How complex is the reasoning? → set effort accordingly  
Is the path known? → if not, plan first  
Does the work need iteration? → write a goal with a finish line

Three questions. Three controls. One more predictable agent.

---

## Now, I want to hear from you

I'm genuinely curious how people are using — or ignoring — these controls in practice.

- Have you found a task where switching from medium to high effort made a noticeable difference? Or one where it made no difference at all? I'd love to understand where the returns actually show up.
- Has plan mode changed how you structure conversations with Claude, or does it still feel like an extra step you skip under time pressure?
- For those using `/goal`: what's the hardest part — writing the verification condition, setting the right boundaries, or knowing when the goal is too broad to work?

Drop a comment or reply — I read everything.

---

## References

[1] [An update on recent Claude Code quality reports — Anthropic Engineering](https://www.anthropic.com/engineering/april-23-postmortem) — Anthropic's April 2026 postmortem explaining that effort levels correspond to points on the test-time-compute curve and that the default level directly affects output quality.

[2] [Claude Code Model Configuration — Claude Code Docs](https://code.claude.com/docs/en/model-config) — Authoritative reference for supported effort levels per model, default values, and the `opusplan` model alias.

[3] [Ultrathink & Thinking Modes — claude-code-handbook](https://github.com/ThamJiaHe/claude-code-handbook/blob/main/docs/ultrathink-thinking-modes.md) — Practitioner guide covering the `/effort` command history, adaptive thinking, and the `ultrathink` community keyword.

[4] [Best practices for Claude Code — Claude Code Docs](https://code.claude.com/docs/en/best-practices) — Official best practices including the four-phase Explore → Plan → Implement → Verify workflow and `Ctrl+G` plan review.

[5] [Plan in the cloud with ultraplan — Claude Code Docs](https://code.claude.com/docs/en/ultraplan) — Official ultraplan documentation: research preview, v2.1.91+ requirement, cloud planning flow and browser review.

[6] [Keep Claude working toward a goal — Claude Code Docs](https://code.claude.com/docs/en/goal) — Authoritative reference for goal mode: evaluator mechanism, three-way comparison table, writing effective conditions, 4,000-character condition limit.

[7] [Claude Code 2.1.139 adds /goal command — ExplainX.ai](https://explainx.ai/blog/claude-code-goal-command-long-running-agents-2026) — Launch-day write-up confirming `/goal` shipped May 12, 2026, with availability matrix and resource tracking details.

[8] [Using Goals in Codex — OpenAI Cookbook](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex) — OpenAI's official goal mode cookbook with the canonical three-slot goal template and strong vs. weak goal examples.

[9] [Configuration Reference — Codex](https://developers.openai.com/codex/config-reference) — Confirms `model_reasoning_effort` (minimal → xhigh) and `plan_mode_reasoning_effort` as valid, current Codex config keys.

[10] [Slash commands in Codex CLI — OpenAI Developers](https://developers.openai.com/codex/cli/slash-commands) — Official Codex CLI slash command reference confirming `/plan` and `/goal` as live commands.

[11] [Changelog — Codex](https://developers.openai.com/codex/changelog) — Confirms Codex goal mode general availability on May 21, 2026, CLI 0.133.0.
