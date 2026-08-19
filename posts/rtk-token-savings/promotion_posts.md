## Launch Post

> **Why this post:** Claude Code practitioners have seen the 60–90% RTK headline and want to know whether it holds up — this post does the arithmetic and surfaces two independent benchmarks that most haven't seen.

🗞️ New post is live! RTK promises to cut your Claude Code token bill. Does it?

RTK can compress your shell output by 70% and your total coding-agent cost can barely move — both statements can be true at the same time, and the math explains exactly why.

Tool outputs are roughly 3.3% of a typical agent's billed cost. 80% of 3.3% is 2.64 percentage points. That's the ceiling, before accounting for the extra turns that lossy compression can trigger.

What's inside:
🔹 The ceiling arithmetic — why big local savings dilute into small bill changes, from a 2,848-run empirical corpus
🔹 Two independent benchmarks — JetBrains SkillsBench (+7.6% at low effort) and Weinberger & Hozez (−2.7% main arm), both with provider-billed agent runs
🔹 A deployment ladder — how to estimate RTK's addressable surface before installing it, and which command families actually move the needle

💬 When you see "60–90% token savings" on a tool README, do you check what the denominator is — or does the number do the convincing?
👇 [link]

---

## Deep-dive 1: Why do big RTK token savings dilute into small bill changes?

> **Why this section:** The ceiling arithmetic is the single most transferable insight in the post — it applies to every token-saving tool, not just RTK, and it's calculable from any session transcript before you spend anything on a benchmark.

Compressing 80% of 3.3% gives you 2.64 percentage points, not 80%.
That's the ceiling for command-output compression on a typical Claude Code session, and it's a first-order calculation — before trajectory effects.

Let's break it down:
🔹 Most of the bill lives in system instructions, cached prefixes, and model reasoning → RTK doesn't touch any of those
👉 Even perfect compression of the one surface RTK controls leaves the dominant cost components completely unchanged
🔹 One extra turn from a compressed result that hid a clue → resends the full cached context prefix
👉 In practice, 500 tokens saved on a tool result can cost 8,000 tokens of additional interaction on the retrieval turn that follows
🔹 RTK's own analytics measure bytes compressed on intercepted commands, not provider-billed end-to-end cost →
👉 High `rtk gain` numbers and a flat invoice are not a contradiction — they are measuring different denominators

Before installing RTK, measure the RTK-addressable share on your own transcripts. If it's under 5%, the economic ceiling is roughly 4 percentage points even with excellent compression.

💬 Have you ever seen your provider invoice match what a token-saving tool predicted? Or is the gap always larger than expected?
👇 [link]

---

## Deep-dive 2: What happens when independent researchers test RTK?

> **Why this section:** Two rigorous external benchmarks both found single-digit cost effects — concrete, named, with confidence intervals — which is the strongest argument for calibrating expectations before adopting RTK.

Independent benchmarks of RTK find single-digit end-to-end cost effects, not tens of percent.
That's not a debunking — it's the result of measuring the right denominator.

Let's break it down:
🔹 JetBrains SkillsBench: 425 billed trials, Claude Sonnet 5, RTK v0.43.0 → +7.6% cost at low reasoning effort, +0.1% at high effort
👉 The culprit at low effort was trajectory expansion — +13.8% more turns, +14.3% more cache reads — not quality degradation; task quality was unchanged in both settings
🔹 Weinberger & Hozez (2026): 2,848 billed runs, seven repositories, three models → −2.7% in the main RTK v0.44.1 arm, holdout interval crosses zero
👉 Their research arm (RTK-ML) removed 38.4% of estimated tool-output tokens but cost rose +6.8% — strong evidence that tokens removed is not a sufficient performance metric
🔹 Both studies pre-measured the addressable surface before running paired benchmarks → JetBrains found only ~20% of tool-result characters were RTK-eligible in real transcripts
👉 That pre-analysis is the most transferable finding: estimate the addressable share on your own transcripts before spending on a benchmark

The RTK README now explicitly says the 60–90% figure applies to eligible Bash output, not the total bill. That's a meaningful correction — and it's consistent with what the benchmarks found.

💬 If you had to estimate what fraction of your Claude Code agent's billed cost comes from shell command output, what would your guess be?
👇 [link]

---

## Deep-dive 3: When can RTK actually hurt?

> **Why this section:** The failure modes are the most actionable part of the post — they tell you exactly which workflows to exclude from RTK before you see a problem, not after.

RTK can do exactly what it was designed to do and still make your agent worse.
That's not a bug report — it's a feature of how context and evidence interact.

Let's break it down:
🔹 Missing diagnostics → RTK removes the one unusual stack frame, warning, or log ordering that was the actual root cause
👉 Failure output is not uniformly redundant — the signal-to-noise ratio changes with every task, and a filter calibrated on average cases will fail on diagnostic edge cases
🔹 Machine-readable stdout gets transformed → a compressed grep output piped to `wc` now counts RTK summaries, not original lines
👉 In Unix, stdout is both human evidence and a data interface — a semantic summariser must know which role it's serving or it breaks the pipe
🔹 Trajectory expansion erases the saving → compact output triggers uncertainty → another tool call → context replay
👉 The economics of this are specific: 500 tokens saved on a tool result, 8,000 tokens spent on the recovery turn — and "RTK worked correctly" and "the task became more expensive" are simultaneously true

For DS and ML workflows: evaluation harness output, data pipeline logs, and model-run diagnostics are high-risk surfaces. The lines that look like noise often aren't.

💬 Have you hit a case where RTK (or any compression tool) hid something your agent needed — and you only found out when the agent went off on a retrieval tangent?
👇 [link]
