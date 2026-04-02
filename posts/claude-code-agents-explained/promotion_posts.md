# Promotion Posts: Claude Code agents: what they actually are

---

## Launch Post

> **Why this post:** Most practitioners confuse Claude Code agents with skills or smarter prompts — this post draws the line precisely and shows what each primitive actually does.

🗞️ New post is live! What most people get wrong about Claude Code agents

A Claude Code subagent doesn't run inside your conversation. It runs in its own context window — with its own system prompt, its own tools, its own permissions.

That distinction changes every design decision you'll make.

What's inside:
🔹 Why the word "agents" in Claude Code means four different things — and which one actually matters
🔹 The agents vs skills boundary: same domain, different problem, different primitive
🔹 What the description field is actually doing (it's not documentation — it's the routing interface)

💬 Have you ever reached for a skill when what you actually needed was a subagent — or vice versa? What made the difference obvious?
👇 [link]

---

## Deep-dive 1: Agents vs skills: the confusion everyone runs into

> **Why this section:** The sharpest standalone claim in the post — directly addresses the most common confusion and includes a concrete worked scenario that makes the distinction stick.

Skills and subagents are not the same primitive. They look similar. They both extend what Claude can do. But they solve completely different problems.

Let's break it down:
🔹 A skill loads into your main context → its instructions, templates, and knowledge become part of your active conversation
👉 That's exactly right when you need reusable standards applied throughout a session — but every invocation has a context cost

🔹 A subagent runs in its own context window and returns a summary → your main conversation never accumulates the intermediate work
👉 Reviewing 40 files, running searches, investigating failures — all of it happens elsewhere and you get back a clean result

🔹 The same task reveals the difference → wanting code review standards available throughout a session is a skill; reviewing 40 files without filling your context is a subagent
👉 Same domain. Different problem. The primitive you choose should match the problem, not the domain.

💬 Which one do you default to? Has the wrong choice ever caused a problem you only understood after the fact?
👇 [link]

---

## Deep-dive 2: Best practices for Claude Code subagents

> **Why this section:** Five concrete, distinct practices — each with a clear "why" — and the description-as-routing-interface insight is the kind of non-obvious finding practitioners share.

The description field in a Claude Code subagent is not documentation. It's how Claude decides whether to delegate a task there at all.

Let's break it down:
🔹 Claude reads descriptions to decide when to delegate → it never reads the body before deciding whether to activate the agent
👉 A vague description means inconsistent routing — the agent fires on some tasks and stays silent on others, with no clear explanation

🔹 Tool restriction is a clarity practice, not just a security one → limit what an agent can access and its behaviour becomes predictable and debuggable
👉 An agent that inherits all tools from the main session is an agent you cannot reason about when something goes wrong

🔹 One task per agent is the practitioner consensus → the VoltAgent collection of 100+ specialist agents — TypeScript expert, SQL reviewer, security auditor — contains zero general-purpose ones
👉 Narrow scope makes agents easier to select, test, and replace when requirements change

💬 Has a poorly written description ever caused your agent to route incorrectly — or fail to activate when you expected it to?
👇 [link]

---

## Deep-dive 3: Why Claude Code subagents exist

> **Why this section:** The foundational motivation (context isolation) is the insight most practitioners miss — and framing it as a context management problem reframes how people think about when to use an agent at all.

The main reason to use a Claude Code subagent isn't power or autonomy. It's that context is finite — and filling it with the wrong work makes everything else less reliable.

Let's break it down:
🔹 As a session grows, intermediate work accumulates → file reads, search results, partial analyses all stay in context whether you need them or not
👉 That's not just inefficiency — it degrades Claude's ability to follow instructions as the window fills with noise

🔹 A subagent moves heavy work out of the main thread → it runs in isolation, consumes its own context budget, and returns a summary
👉 You get the result without inheriting the cost of producing it — your main conversation stays lean

🔹 Context engineering is the discipline behind this → not about writing better prompts, but about curating what enters the context window at all times
👉 Subagents are one of the most direct levers available — and most practitioners reach for them only after the context is already full

💬 At what point in a session do you usually notice your context getting noisy? What's your current strategy for managing it?
👇 [link]
