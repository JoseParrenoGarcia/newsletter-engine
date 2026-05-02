## Launch Post

> **Why this post:** Practitioners reach for agent teams as a capability upgrade — the post reframes them as a coordination cost and gives the exact four conditions that justify the move.

🗞️ New post is live! Most Teams Using Claude Code Don't Need Agent Teams. Here's When That Changes.

Adding more agents does not make your system more capable. It makes it more distributed — and distributed is a cost, not an upgrade.

What's inside:
🔹 The four specific conditions that justify going multi-agent — and a one-sentence test to check if any of them is actually true
🔹 The four patterns for combining agents (orchestrator, pipeline, parallel specialists, swarm) — with DS-specific examples and the exact failure mode for each
🔹 Eight failure modes that show up in production, sourced from Anthropic's own engineering notes — and the mitigations that actually work

I built this using real systems: a three-agent newsletter review setup and months of watching where the complexity earns its cost and where it just adds friction.

💬 Have you ever added more agents thinking it would make the system smarter, only to end up debugging why agents were duplicating each other's work?
👇 [link]

---

## Deep-dive 1: Why agent teams fail

> **Why this section:** Eight named failure modes sourced from production engineering notes — each one standalone, each one grounded in what actually breaks; the section most multi-agent tutorials skip entirely.

Most multi-agent systems don't fail because the agents are bad. They fail because nobody defined who owns what.

And that's just the first of eight ways they break.

Let's break it down:
🔹 Coordination drift → Vague delegation causes workers to duplicate each other's searches or produce outputs that don't compose
👉 The fix isn't better prompts — it's an explicit scope boundary for each worker: objective, expected output format, source guidance, task limits

🔹 Hallucinated ownership → One agent assumes another has checked something; nobody has; the task gets marked done
👉 In production, this surfaces as confident wrong output — auditable only if you have completion artefacts and end-to-end verification checkpoints

🔹 Silent intermediate failure → The top-level session stream is a condensed view; the actual failure happened two layers down
👉 You can't debug coordination or context bloat without worker-level traces; instrument before the first production run, not after the first outage

The failure modes compound. Coordination drift leads to hallucinated ownership. Hallucinated ownership leads to silent failure. Add context bloat and schema brittleness and you have a system that fails confidently and quietly.

💬 Which of these have you hit in practice? Coordination drift and context bloat are the ones I hear about most often — but I'm curious what actually bites teams first.
👇 [link]

---

## Deep-dive 2: The four patterns for combining agents

> **Why this section:** A provider-agnostic decision taxonomy — each pattern has a clear "use when / avoid when" rule and a named failure mode; practitioners can apply this directly regardless of platform.

There are four ways to combine agents. Most practitioners use one for everything. That's why three of their four use cases perform worse than a single agent would have.

The pattern you pick determines the failure mode you inherit.

Let's break it down:
🔹 Orchestrator/planner-executor → One lead agent decomposes, delegates, synthesises; workers don't talk to each other
👉 Use this when the subtask structure isn't known in advance — for a data team: an orchestrator decomposing a model degradation question across feature distributions, pipeline health, and recent model changes in parallel

🔹 Sequential pipeline → Stages run in fixed order; later stages consume earlier outputs
👉 In practice: mistakes cascade. If the feature extraction stage produces the wrong schema, the validation stage will be confidently wrong at great expense — validation gates between stages are not optional

🔹 Parallel specialists and red team → Multiple agents examine the same task simultaneously, then vote, critique, or aggregate
👉 The token cost is real — Anthropic's research system had to add effort budgets to stop workers fanning out without discipline; this pattern earns its cost only when robustness matters more than tidiness

The swarm pattern (coordination through shared state, no strict leader) is the fourth. It's also where "agents" starts to become "distributed systems" — and that's a different class of problem.

💬 Which pattern have you found yourself defaulting to — and has it created the failure mode it's known for?
👇 [link]

---

## Deep-dive 3: Why most teams don't need multiple agents yet

> **Why this section:** The contrarian opening claim is the most shareable angle in the post — and the four-trigger test is an immediately usable decision instrument that practitioners can apply before their next architecture decision.

A second agent does not make your system smarter. It makes it more distributed.

Distribution is a cost. It adds coordination overhead, multiplies failure modes, and consumes significantly more tokens. Anthropic says this directly in their documentation.

Let's break it down:
🔹 The single-agent ceiling is higher than most people think → A well-configured agent with good tools, a focused system prompt, and clean subagent delegation handles a lot
👉 The ceiling isn't about capability — it's about architecture; you hit it only when one of four specific conditions is true

🔹 The four conditions that justify going multi-agent → Context isolation, specialisation, parallel work, independent critique — not "this is getting complex"
👉 Each condition is architectural, not aspirational; you should be able to point to one specifically before adding a second agent

🔹 The honest test → "Which of the four conditions applies?" If you can't point to one, the single-agent path is still open
👉 I built a three-critic review system because condition four (independent critique) was genuinely true — each agent had to reach its verdict without seeing the others'; that isolation was the product

Most multi-agent systems are built before any of the four conditions are true. The complexity arrives before the problem.

💬 What pushed you to go multi-agent — and looking back, was one of the four conditions actually true, or did it feel like complexity demanded more agents?
👇 [link]
