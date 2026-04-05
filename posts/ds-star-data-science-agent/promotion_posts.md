## Launch Post

> **Why this post:** The thesis — that agent architecture outperforms model swapping — is directly provable with a 32-percentage-point benchmark result and is immediately actionable for anyone building data pipelines.

🗞️ New post is live! DS-STAR: How Google Built a Data Science Agent That Actually Works

A 32-percentage-point jump in benchmark performance doesn't come from a better model — it comes from a better harness.
That's the lesson in Google's DS-STAR paper, and it changes how I think about building agentic data science systems.

What's inside:
🔹 Seven focused agents, each doing exactly one thing — and why the Analyzer (data profiling) is the most load-bearing of them all
🔹 The ablation results that act as feature importance for an agent system — strip one component, measure the drop
🔹 Why short, role-specific prompts consistently outperform long, catch-all system prompts in multi-agent pipelines

💬 Have you found that restructuring your pipeline mattered more than upgrading your model? What was the change that moved the needle?
👇 [link]

---

## Deep-dive 1: 3.1 The seven modules

> **Why this section:** The seven-module architecture is the core structural claim of the paper — it's concrete, maps to a clear mental model, and each module generates a distinct extractable insight.

Most data science agents fail because they try to do everything in one prompt.
The Analyzer runs before the Planner even starts — and that ordering is not incidental.

Let's break it down:
🔹 Profile before you plan → The Analyzer executes a Python script against every input file and stores the printed output as a structured description. The Planner never guesses the schema.
👉 Without this step, the Planner is writing a recipe without knowing what's in the fridge — every downstream decision is built on assumption, not evidence.
🔹 One step at a time → The Planner generates a single plan step per round, not a full plan upfront. `planner_init` handles the first step; `planner_next` receives the current plan and prior execution results before generating the next.
👉 In practice, this means errors are isolated. A bad step doesn't corrupt a six-step plan — it gets caught before the next step is generated.
🔹 The Router decides replace or add → When the Verifier flags a step as insufficient, the Router chooses: replace the specific broken step, or append a new one. It never defaults to appending every time.
👉 This is what prevents plan bloat — the system corrects itself at the right level of granularity instead of accumulating fixes on top of broken logic.

This is the clearest case I've seen for decomposition as a reliability strategy, not just an architectural preference.

💬 Have you ever caught a bug in a multi-step pipeline that only showed up because an earlier step silently passed bad data forward?
👇 [link]

---

## Deep-dive 2: 6. Ablation tests

> **Why this section:** Ablation results are the most convincing form of evidence in agent system design — they put numbers on architectural decisions and give practitioners a build order.

The most important step in DS-STAR is not the Verifier, not the Router — it's the one that runs before any planning starts.
Remove the Analyzer, and hard-level accuracy drops from 45.24% to 26.98%. That's the biggest single-component drop in the entire system.

Let's break it down:
🔹 Analyzer removal → the largest performance drop of any component. Hard-level DABStep accuracy falls 18 percentage points — more than removing the Verifier or the Router.
👉 This matters because it tells you where to invest first. If you're building a data science agent and you only have time to implement one thing well, it's the data profiling step, not the code execution loop.
🔹 Router removal (force "Add Step" only) → performance drops on both easy and hard tasks. Without the replace-vs-add decision, the plan accumulates: errors stay in the plan and new steps are appended on top of them.
👉 In real pipelines, this is the difference between a correction and a workaround. Append-only logic produces plans that grow longer and more fragile; replace logic keeps them tight.
🔹 Step-by-step Verifier vs full-plan-then-execute → the full-plan-at-once approach performs worse. Verifying each step independently catches problems before they propagate.
👉 The system-level implication: verification granularity determines error containment. A single final check at the end of a 6-step plan lets 5 compounding errors through.

This is feature importance analysis for an agent system. The ablation table is not just a proof-of-concept — it's a build order.

💬 When you've done a post-mortem on a broken automated pipeline, which step turned out to be the silent failure point — and how far downstream did you find it?
👇 [link]

---

## Deep-dive 3: 5. The prompts behind the data science agent

> **Why this section:** The prompt design reveals the architectural philosophy in its simplest form — short, role-specific, and constraint-enforcing — and is directly replicable by any practitioner.

Every prompt in DS-STAR does exactly one thing. That's not a style choice — it's the mechanism.
Short, role-named prompts constrain agent behaviour more reliably than long system prompts trying to anticipate every edge case.

Let's break it down:
🔹 The Analyzer prompt is four bullet points → handle structured and unstructured data, print column names and samples, output a self-contained runnable script, do not use try/except. Error handling is delegated to the Debugger agent explicitly.
👉 Delegating try/except to another agent isn't laziness — it's an intentional boundary. Swallowing errors in the Analyzer hides failures that the Debugger exists to catch. The prompt enforces the separation.
🔹 The Router prompt constrains output format to a decision, not a discussion → the only valid responses are "Add Step" or "Step 1 ... Step K." No free-text reasoning.
👉 Constrained output formats are not just about parsing — they prevent the model from rationalising a wrong decision. When the only options are structured choices, the agent commits rather than hedges.
🔹 The Verifier prompt asks only for judgment, not revision → it evaluates whether the current step is sufficient. It does not rewrite the plan. Judgment and revision are separate agents with separate prompts.
👉 Mixing judgment and revision in one prompt produces agents that revise when they should flag and flag when they should revise. Separating them makes each role auditable.

Google published all of these prompts in Appendix L. The design is not secret — it's replicable. The hard part is having the discipline to keep each prompt this small.

💬 Have you ever tried splitting a long system prompt into smaller role-specific prompts? Did the behaviour become more or less predictable?
👇 [link]
