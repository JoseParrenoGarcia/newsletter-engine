# Promotion Posts: Claude Code agents explained

---

## Launch Post

> **Why this post:** Practitioners using Claude Code collapse skills and agents into the same category — this post draws the line clearly and shows what each primitive actually does.

🗞️ New post is live! What most people get wrong about Claude Code agents

A Claude Code subagent isn't a smarter prompt or a fancier skill. It's an isolated worker running in its own context window — with its own system prompt, its own tools, and its own permissions.

Most practitioners don't see the difference until something breaks in a way they can't explain.

What's inside:
🔹 Why subagents exist — the real answer is context isolation, not capability
🔹 The agents vs skills distinction — and the one concrete scenario that makes it click
🔹 What the description field is actually doing (hint: it's the routing interface, not documentation)

👇 [link]

💬 Have you ever reached for a skill when what you actually needed was a subagent — or the other way around?

---

## Deep-dive 1: Agents vs skills: the confusion everyone runs into

> **Why this section:** Directly addresses the post's core thesis with a concrete worked example; the cleanest standalone claim in the draft.

Skills and subagents are not the same primitive. They solve different problems — and confusing them produces systems that work sometimes and fail in ways that are hard to debug.

Let's break it down:
🔹 A skill loads into your main context → it becomes part of the conversation, available wherever you need it
👉 That's exactly what you want for reusable knowledge or workflow logic — but it means every invocation has a context cost

🔹 A subagent runs in its own context window and returns a summary → 40 file reads, 200 search results, none of it in your main thread
👉 You get the result without inheriting the cost of producing it — that's the entire reason subagents exist

🔹 The two primitives combine deliberately → a subagent can preload a skill; a skill can run in isolated context with `context: fork`
👉 Knowing both clearly is what makes the combination useful — otherwise you're applying a pattern without understanding when it applies

💬 Which one do you reach for by default — skill or subagent? Has the choice ever caused problems you only understood after the fact?
👇 [link]

---

## Deep-dive 2: Best practices for Claude Code subagents

> **Why this section:** Five distinct, concrete practices backed by official docs and community signal — high information density, each bullet stands alone.

The description field in a Claude Code subagent is not documentation. It's the routing interface — and most people treat it like an afterthought.

Let's break it down:
🔹 Claude reads descriptions to decide when to delegate → it never reads the body before deciding whether to activate the agent
👉 A vague description means inconsistent routing — the agent fires sometimes, stays silent at others, with no obvious explanation

🔹 Tool restriction is a clarity practice, not just a security one → limit what an agent can access and its behaviour becomes predictable and debuggable
👉 An agent that inherits all tools from the main session is an agent you cannot reason about when it goes wrong

🔹 One task per agent is the community consensus → the VoltAgent collection of 100+ specialist agents — TypeScript expert, SQL reviewer, security auditor — contains zero general-purpose ones
👉 Narrow scope makes agents easier to select, easier to test, and easier to replace when requirements change

💬 Has a poorly written description ever caused your agent to route incorrectly — or fail to activate when you expected it to?
👇 [link]

---

## Deep-dive 3: Why agents exist at all

> **Why this section:** The motivation behind the feature (context isolation) is the insight most practitioners miss — and it reframes how people think about when to reach for an agent at all.

The main reason to use a Claude Code subagent isn't power or autonomy. It's that context is finite — and filling it with the wrong work makes everything else less reliable.

Let's break it down:
🔹 As a session grows, noise accumulates → file reads, search results, partial analyses — it all stays in context whether you need it or not
👉 That's not just an efficiency problem — it actively degrades Claude's ability to follow instructions as the window fills

🔹 A subagent moves heavy work out of the main thread → it runs in its own context window and returns a summary
👉 Your main conversation stays clean — you get the result without inheriting the cost of producing it

🔹 Context engineering is the discipline behind this → not about writing better prompts, but about curating what enters the context window at all times
👉 Subagents are one of the most direct levers available — and most practitioners reach for them only after the context is already full

💬 At what point in a session do you usually notice your context getting noisy? What's your current strategy for managing it?
👇 [link]
