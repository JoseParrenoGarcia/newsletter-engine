## Launch Post

> **Why this post:** Engineers building with Claude Code have no feedback loop — they trust the first impressive run and have no way to know when things start degrading.

🗞️ New post is live! Stop Trusting Your Claude Code Demos

A single impressive run is not evidence. It is a story you told yourself.

Claude Code is an acting system — it edits files, runs commands, fires hooks, routes to subagents. When it works, the whole stack worked. When it fails, any layer could be the cause. And if you have never measured it, you cannot tell the difference.

What's inside:
🔹 Why LLMs are probabilistic even under "deterministic" settings — and what a 70% best-to-worst gap means for your workflow
🔹 The three questions you cannot answer without evals: did the revision improve it, can a cheaper model handle it, is this failure new?
🔹 Why evals are a thinking problem, not an infrastructure problem — and the one worked example that makes it concrete

I built a workflow that worked twice in a row. Three weeks later it failed in a way I had no way to explain. No baseline. No test. Just a broken output and no idea if it was a regression or luck.

💬 What Claude Code workflow do you trust most — and have you ever tested it?
👇 [link]

---

## Deep-dive 1: What is the unit test we forgot to write?

> **Why this section:** The software-testing analogy reframes evals as discipline rather than overhead — standalone, widely relatable, and immediately actionable for any technical reader.

You test your code every time something changes. You do not test your Claude Code workflows. That gap is a choice you are making, and it has a cost.

The discipline of verification is what separates "I think it works" from "I know it works."

Let's break it down:
🔹 A unit test is: a known input, an expected output, and a check → The eval structure is identical — input, grading criterion, check. The conceptual leap is not large.
👉 The real barrier is not the infrastructure. It is deciding your workflow is the kind of thing that deserves to be tested.
🔹 Data scientists already do this for models → Held-out test sets, benchmark evaluation, offline A/B tests — the discipline already exists in the ML toolkit. Why does it disappear when the "model" is a Claude Code workflow?
👉 Because the output looks plausible. A wrong prediction is obvious. A wrong file edit or a skipped hook is not.
🔹 "Looks done" is not a completion criterion → Anthropic's own best practices guide says Claude should always have a verifiable check to run rather than relying on visual confirmation. The same logic applies to the team building the workflow.
👉 If you would not accept "looks done" from Claude, you should not accept it from yourself when evaluating whether the workflow is reliable.

Most teams have not made the decision to test their agent workflows. The test is not difficult to write. The difficult part is deciding it is worth writing.

💬 Have you ever revised a Claude Code skill or prompt and assumed it got better — without running a single test case to confirm?
👇 [link]

---

## Deep-dive 2: What are the three questions you cannot answer without Claude Code evals?

> **Why this section:** Three concrete, cost-driven questions that every team building with Claude Code will face — immediately recognisable and impossible to dismiss as theoretical.

There are three questions every team building with Claude Code will eventually face. None of them can be answered by running the workflow once and looking at the output.

All three have costs attached to not having an answer.

Let's break it down:
🔹 Did this revision make the workflow better, or just different? → You tweaked the instructions. The next run looks better. But you changed the prompt on a single test case — not across the range of inputs the workflow will actually see.
👉 Without a fixed set of test cases and a grading criterion, you cannot know whether the revision improved performance or shifted it sideways. Every prompt change is a blind bet.
🔹 Can a cheaper model handle this task? → Claude Haiku is materially less expensive than Sonnet. For a data summarisation agent running hundreds of reports per week, the cost difference compounds fast.
👉 Whether Haiku is good enough depends on the task, the instructions, and the error tolerance — none of which you can characterise without evals. A few visual spot-checks will not tell you.
🔹 Is this failure new, or have we seen it before? → A workflow that worked last month starts producing errors. Without a regression suite, you cannot know when the failure was introduced or whether the fix actually fixed it.
👉 This is the question that bites teams hardest — not because it is the hardest to answer, but because the answer requires something you should have built before the failure happened.

None of these are hypothetical concerns. They are the questions that come up after the first few weeks of real use.

💬 Have you ever needed to swap models on a Claude Code workflow for cost reasons — and had no way to know what quality you were trading away?
👇 [link]

---

## Deep-dive 3: What agent failures should Claude Code evals have caught?

> **Why this section:** Four concrete failure scenarios that look like success on a single run — immediately recognisable pain, zero abstraction required.

The most dangerous Claude Code failures are the ones that complete successfully.

The workflow finishes. No error. The output looks right. The failure is invisible until something downstream breaks.

Let's break it down:
🔹 The hook that fired but did nothing → PostToolUse triggers, the hook executes, no error returned. But the script path was wrong. The validation never ran. A single run shows green. An eval that checks for the expected side effect catches it immediately.
👉 Hooks are designed to be invisible when they work. That invisibility is also what makes their failures invisible. You cannot inspect a hook's success by reading the workflow output.
🔹 The files edited in the wrong directory → Claude found a file with the right name, updated it, reported success. It was a duplicate from an older version of the project. The real file was untouched. Visual inspection confirmed a change was made.
👉 "A change was made" and "the right change was made to the right file" are two different claims. Only the second one matters. Only an eval that checks the actual file state can tell them apart.
🔹 The subagent that returned a plausible but incorrect result → The sources were real. The claims were extrapolations, not what the sources said. The result was used downstream and the error propagated.
👉 In agentic workflows, mistakes compound. A grading criterion that checks specific claims against source material catches the error at the subagent layer — before it becomes three layers of downstream wrong.

None of these failures are edge cases. They are the normal failure modes of a multi-layer system where success looks identical to near-success on any single run.

💬 Have you ever had a Claude Code workflow "complete successfully" — and only found out later that what it completed was wrong?
👇 [link]
