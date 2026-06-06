## Launch Post

> **Why this post:** Practitioners are using effort level selectors and plan mode without understanding what they actually do — this post gives them the mental model to stop guessing and start configuring deliberately.

🗞️ New post is live! I Used Claude Code's "High" Thinking for Months Without Knowing What It Did

Planning mode is the organising discipline for working with coding agents — thinking levels and goal mode are just knobs you configure within it.
Most people treat these as three separate settings. They're not.

What's inside:
🔹 Reasoning effort is budgeted deliberation, not intelligence — and "high" costs tokens without guaranteeing better output
🔹 Planning mode's real value is changing the question from "did Claude do this correctly?" to "is this the right plan?" — before a single file changes
🔹 A goal is not a longer prompt — it's a completion contract, and without a verification surface the agent has no way to know when it's done

I went from clicking "high" by default and hoping for the best to having a clear system for when to think harder, when to plan first, and when to let Claude keep working until the job is actually finished.

💬 Have you been using "high" thinking effort (or ultrathink) by default without knowing what it's actually doing to your token budget?
👇 [link]

---

## Deep-dive 1: What Is Claude Code Planning Mode?

> **Why this section:** The "agents fail by acting too early" claim is immediately recognisable to anyone who has watched Claude edit the wrong files — strong standalone premise with a concrete mechanism and a clear behaviour change.

The most common way a coding agent fails is not bad reasoning — it's acting too early.

An agent reads the task, decides what to change, and starts editing. It fixes the visible symptom. It modifies the wrong layer. It refactors a module it hasn't read. By the time you notice, several files have changed.

Let's break it down:
🔹 Agents jump to implementation before understanding the problem → Planning mode forces a different sequence: inspect → reason → propose → wait. Claude designs before it executes.
👉 This matters because the cheapest moment to catch a misunderstanding is before any file changes — not after three refactors.

🔹 The practical switch is simple → End your prompt with "Do not edit files." Or use `/plan`. The `Ctrl+G` shortcut opens the proposed plan in your editor before Claude proceeds.
👉 In practice, you see exactly what the agent intends to do. You can annotate it, discard it, or approve it — before a single change is made.

🔹 It changes the question you ask → Without plan mode: "Did Claude do this correctly?" With plan mode: "Is this the right plan?" — asked before implementation, when the answer is still cheap.
👉 The second question is always easier to answer. It's also the one that catches architecture mistakes, wrong assumptions, and scope creep before they compound.

Plan mode is not about slowing down. It's about removing the rework that happens when you skip it.

💬 Have you ever noticed Claude modifying files you didn't expect it to touch? What happened — and would plan mode have caught it?
👇 [link]

---

## Deep-dive 2: Writing a Goal That Actually Has a Finish Line

> **Why this section:** The weak-vs-strong goal examples and the five-ingredient framework are immediately actionable — any reader using /goal can apply these tomorrow, making this the most shareable section in the post.

Most `/goal` commands fail not because the agent gives up — but because the condition can never be verified.

"Fix the authentication bug" is not a goal. It's a wish. The evaluator has nothing to check after each turn, and the loop continues until it times out or guesses.

Let's break it down:
🔹 A goal without a verification surface is just a longer prompt → The agent needs something it can test: a command to run, a metric to hit, an artefact to inspect. Without that, "done" is subjective.
👉 This is why vague goals like "improve code quality" produce unpredictable results — there's no state the evaluator can confirm.

🔹 A strong goal has five components → Outcome, verification surface, constraints, boundaries, stop condition. The canonical template: `<desired end state> verified by <specific evidence> while preserving <constraints>. If blocked, stop and report.`
👉 In practice: "Make tests/auth pass, verified by running pytest tests/auth with exit code 0. Preserve public API. Only touch src/auth. If credentials are missing, stop and report."

🔹 Claude Code's evaluator checks the condition after every turn → A small fast model runs after each response. If the condition holds, the goal clears and control returns to you. If not, Claude starts another turn automatically.
👉 This is the difference between "keep going until I say stop" and "keep going until the work is actually done" — a meaningful distinction when you step away from the keyboard.

The goal template is the same whether you're using Claude Code or Codex. It's a cross-tool pattern — and once you write one good goal, the structure becomes second nature.

💬 What's the hardest part of writing a `/goal` condition — defining the outcome, picking the verification command, or setting the right scope boundaries?
👇 [link]

---

## Deep-dive 3: What Are Claude Code Thinking Levels?

> **Why this section:** "Ultrathink" is overused and misunderstood — reframing it as budgeted deliberation with a cost trade-off challenges a common behaviour and gives practitioners a decision rule they can apply immediately.

"Ultrathink" is not a setting. It's a community shorthand for something the official docs already expose — and most people invoke it without understanding the trade-off.

The result: wasted tokens on tasks that didn't need deep reasoning, and under-investing on tasks that genuinely did.

Let's break it down:
🔹 Effort levels sit on the test-time-compute curve → More effort means more reasoning tokens before the model acts. Not smarter — more deliberate. A model at `max` effort can still get a hard problem wrong.
👉 Anthropic briefly dropped the default from `high` to `medium` in 2026. Performance degraded visibly enough that they reverted it within weeks. These settings are not cosmetic.

🔹 The rule is: scale effort to reasoning burden, not task importance → `low` for find-a-file and explain-a-function. `medium` for standard bug fixes. `high`/`xhigh` for architecture decisions, unclear debugging, public API changes.
👉 High effort on a trivial task costs real tokens and adds real latency for no practical gain. The budget is finite. Spend it where the reasoning complexity actually is.

🔹 `ultrathink` maps to `/effort max` — both work, but `/effort <level>` gives you control → You can switch levels mid-session, set different effort for planning vs execution, and match the reasoning investment to what the task actually demands.
👉 The question to ask before any non-trivial task: "How complex is the reasoning here?" — not "How important does this feel?" Those are different questions, and only one of them guides the right setting.

💬 Have you ever run high effort and noticed no difference — or kept it at medium and been surprised by the result? I'm curious where the real returns show up in practice.
👇 [link]
