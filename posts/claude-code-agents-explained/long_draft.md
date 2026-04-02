# Claude Code agents: what they actually are

*A ground-up guide to subagents — Claude Code's custom subagent primitive — for practitioners who want to understand the feature before building with it.*

---

Most people encounter Claude Code agents and reach for the nearest available mental model. A skill with extra steps. A smarter prompt. Something that behaves more autonomously because the instructions are written differently.

That mental model is wrong — and it matters that it's wrong. **Subagents** — the actual in-product agent primitive — do not run inside your main conversation. They run in their own context window, with their own system prompt, their own tool access, and their own permissions. They work separately and return a result. Your main conversation never accumulates their intermediate steps.

The distinction sounds subtle. In practice, it changes every design decision: where to put instructions, when to restrict tools, how to phrase descriptions, and when a prompt would have been enough.

This post explains subagents from the ground up — what they are, how to build one, and when they're worth the investment. It assumes you're already using Claude Code and want to understand this feature properly before touching it.

---

## What this post covers

- **The naming fog.** Claude Code uses several "agent" terms that mean different things. Getting this straight first prevents confusion throughout.
- **Why subagents exist.** The core reason isn't capability — it's context management.
- **The mental model that makes everything else click.** What actually happens when Claude delegates to a subagent, and how isolation changes what's possible.
- **Building your first one.** The minimal file, every field that matters, and a concrete walkthrough.
- **Subagents vs skills.** The most important boundary in the Claude Code primitive stack — and what the two look like on the same task.
- **Best practices.** What the description field is actually doing, why tool restriction matters beyond security, and what the practitioner community has converged on.
- **Agent teams.** A quick look at the multi-session layer and when it's worth the tradeoff.
- **When agents are the wrong tool.** The boundaries that keep things maintainable.

---

## The naming problem: what do people mean by "Claude Code agents"?

Before anything else: the word "agents" in Claude Code means at least four different things, and conflating them makes the feature much harder to reason about.

**Claude Code itself is an agentic environment.** Anthropic describes Claude Code as an agentic coding assistant — one that has tools, an execution loop, and the ability to plan and act across multiple steps without waiting to be prompted at each one. That's the baseline. It's already agentic before you configure anything.

**Subagents are the custom in-product agent primitive.** When a practitioner says "I'm building an agent in Claude Code," they almost always mean a subagent: a specialised assistant defined in a Markdown file, running in its own isolated context window. The [official documentation](https://code.claude.com/docs/en/sub-agents) defines them as "specialized AI assistants that handle specific types of tasks. Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions." These live in `.claude/agents/` at the project level or `~/.claude/agents/` at user level. Claude selects them by reading their `description` field against the current task.

**Agent teams are a separate, multi-session feature.** The [agent teams documentation](https://code.claude.com/docs/en/agent-teams) draws this line clearly: "Subagents work within a single session; agent teams coordinate across separate sessions." Agent teams are independent Claude Code instances that communicate via a shared task list and direct peer messaging. They are experimental, disabled by default, and require an environment flag to enable. They are not "more subagents" — they are a different layer of the architecture.

**The Claude Agent SDK is a fourth layer** — the same tools and agent loop that power Claude Code, exposed as a programmable Python and TypeScript library. It exists outside the CLI, for teams building custom agent applications. Not the subject here.

This post is about subagents — the thing most people mean when they say "agents in Claude Code."

---

## Why Claude Code subagents exist

Context is finite. That's the starting point.

Anthropic's [post on context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) frames the problem precisely: "Context engineering is the art and science of curating what will go into the limited context window." Every tool call, every file read, every partial analysis — it all lands in context and stays there. As a session grows, the window fills with intermediate work that was necessary to produce a result but is no longer useful to reference. That noise degrades performance. Claude has less room to work, and more irrelevant content competing for its attention.

Subagents exist to move that problem somewhere else.

The [Extend Claude Code documentation](https://code.claude.com/docs/en/features-overview) states it directly: "The subagent might read dozens of files or run extensive searches, but your main conversation only receives a summary. Since subagent work doesn't consume your main context, this is also useful when you don't need the intermediate work to remain visible."

Here's what that looks like in practice. Imagine you ask Claude to investigate why a test suite is failing. Doing that investigation in the main session means: read 20 files, grep for error patterns, check test configuration, scan recent commits. All of that lands in your context. By the time the investigation is done, you've consumed several thousand tokens of intermediate work — and most of it has no bearing on what you do next. Now do that twice more in the same session.

A subagent changes the shape of that problem. It runs the investigation in its own context window, consuming its own token budget. You get back: "The test failures are caused by a missing environment variable in the CI config. Here are the three affected tests and the fix." Clean. The main thread never absorbed the search cost.

Context isolation is the primary reason. But there are three secondary reasons worth naming:

**Specialisation.** A subagent has its own system prompt. A focused code reviewer with instructions specific to your team's standards is more reliable than a general assistant trying to hold those standards alongside everything else it knows.

**Constraint enforcement.** You can specify exactly which tools a subagent can use. A read-only research agent that cannot write files or run shell commands is a materially different risk profile from the main assistant. The constraints are declared and enforced — not just hoped for.

**Cost control.** Subagents can run on a different model. Routing lightweight tasks to Haiku while the main session runs on Sonnet is a practical cost handle most practitioners don't discover until they've been surprised by their bill.

---

## The smallest useful mental model

An isolated worker.

That's the frame. A subagent gets its own context window. It starts with a custom system prompt you wrote — not the full Claude Code system prompt, not your accumulated conversation history, nothing from the main session. The [official docs](https://code.claude.com/docs/en/sub-agents) are precise about this: "Subagents receive only this system prompt (plus basic environment details like working directory), not the full Claude Code system prompt."

It does work. It returns a result. The main conversation receives that result and continues.

[Visual: diagram | post figure | concept illustration — main agent spawns subagent; subagent runs in isolated context window with its own system prompt; subagent does work; returns summary to main agent; main context stays lean]

Claude Code already includes several built-in subagents: **Explore**, **Plan**, and **general-purpose**. These come configured out of the box and handle broad categories of delegated work. Custom subagents are the ones you define — targeted to your specific workflows.

One thing that surprises most people when they first configure a custom agent: Claude decides when to delegate based entirely on the subagent's `description` field. If the task matches the description, Claude routes to the subagent. If the description is vague, routing is inconsistent. The description isn't documentation for humans — it's the routing interface for the model. This matters enough to come back to in the best practices section.

---

## Your first Claude Code subagent, end to end

A subagent is a Markdown file with YAML frontmatter. That's the entire format.

It lives in one of two places:

- `.claude/agents/` in your project directory — for agents specific to a codebase. Check these into version control so your team can share and improve them.
- `~/.claude/agents/` in your home directory — for personal agents available across all your projects.

Two fields are required: `name` and `description`. Everything else is optional.

Here's a minimal working example — a read-only code reviewer:

```markdown
---
name: code-reviewer
description: Reviews code changes for quality, security, and best practices.
             Use proactively after any significant code change.
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, read the changed files and provide
specific, actionable feedback on code quality, security, and best practices.
Focus on what matters. Don't restate what the code does — say what's wrong
or good about it. Flag security issues first, then logic problems, then style.
```

Let's walk through what each part is doing.

**`name`** is the unique identifier. Lowercase, hyphens only. It's how the agent appears in logs and how Claude refers to it internally.

**`description`** is the most important field. Claude reads this to decide whether to delegate a task here. Write it behaviorally: what the agent does, and when to use it. The phrase "use proactively" is a documented signal[1] — it tells Claude to activate this agent without waiting to be explicitly asked. Leave that phrase out if you want the agent to respond only on direct request.

**`tools`** restricts what this agent can access. This reviewer can read files and search — it cannot edit, run shell commands, or make network calls. That restriction is intentional. A read-only reviewer cannot accidentally modify what it's reviewing. The [official documentation](https://code.claude.com/docs/en/sub-agents) explicitly recommends granting only the tools an agent actually needs, both for security and to make its behaviour predictable.

**`model`** routes this agent to a specific model. Options: `sonnet`, `opus`, `haiku`, or a full model ID like `claude-opus-4-6`. Omit it and the agent defaults to `inherit` — the same model as the main session. For a reviewer that doesn't need the most capable model, setting `model: haiku` reduces cost without sacrificing much.

The body of the file — everything below the frontmatter — becomes the agent's system prompt. It receives this, the working directory, and nothing else from the main session.

The full set of optional frontmatter fields covers more ground than most agents need: `permissionMode` (controls what actions require approval), `maxTurns` (caps the agentic loop), `skills` (preloads specific skills into the agent's context at startup), `mcpServers` (scopes specific MCP servers to this agent), `memory`, `hooks`, and `disallowedTools`. You won't need most of these for a first agent. They become relevant as use cases get more specific.

---

## Agents vs skills: the confusion everyone runs into

This is the distinction that causes the most friction, so it's worth being precise.

The [Extend Claude Code documentation](https://code.claude.com/docs/en/features-overview) states it directly:

- **Skills** add reusable knowledge and invocable workflows.
- **Subagents** run their own loops in isolated context, returning summaries.

The functional difference is about where the work happens. A skill loads into your current conversation — its instructions, templates, and reference files become part of the active context. Claude follows them in the same thread, and every step accumulates in your main window. A subagent runs separately. It does its work, then your main conversation gets back a result.

| | Skills | Subagents |
|---|---|---|
| **What it provides** | Reusable knowledge or workflow logic | Task delegation to an isolated worker |
| **Runs in** | Main conversation context | Own context window |
| **Main context cost** | Skill content is loaded | Only the returned summary |
| **Invoked by** | Slash command or automatic selection | Claude delegating based on description |
| **Best for** | Repeatable workflows, domain knowledge, reference material | Context-heavy investigation, specialist execution, constrained work |

A concrete example makes this easier to see. Say you want to enforce your team's code review standards.

If you want Claude to know those standards throughout a session — apply them when writing code, reference them when making suggestions, flag violations inline — that's a skill. Write the standards once, and Claude loads them into context when relevant. They're available across everything you do in that session.

If you want to review 40 files in one pass without your main context filling up with file reads, intermediate comments, and search results, that's a subagent. You configure a code-reviewer agent. It runs the review in its own context window and returns a structured summary. Your main conversation receives the result, not the work that produced it.

Same domain. Different problem. Different primitive.

The boundary is real, but the two aren't mutually exclusive. A subagent can preload specific skills via the `skills:` frontmatter field — the full skill content gets injected into the subagent's context at startup. A skill can run in isolated context using `context: fork`. The distinction matters for understanding when to reach for which tool. The combination is available once you've understood both.

A sentence that captures it cleanly:

> A skill changes what Claude knows or how it should approach a workflow. A subagent changes who is doing the work, in what context, and with what tools.

---

## Best practices for Claude Code subagents

### The description is the routing interface

This deserves more emphasis than it usually gets.

Claude reads subagent descriptions to decide when to delegate. It does not read the body before making that decision. A vague description means inconsistent routing — the agent fires on some tasks and stays silent on others, with no obvious explanation. The [sub-agents documentation](https://code.claude.com/docs/en/sub-agents) is explicit: Claude uses the description field to decide when to delegate.

Write in specific, behavioural terms. Describe what the agent does and when to use it. Include the kinds of tasks it handles well and, if useful, the kinds it shouldn't handle. The phrase "use proactively after code changes" is a tested pattern — the documentation mentions it specifically as a way to encourage delegation without waiting for an explicit request. Leave it out for agents you want activated only on direct invocation.

One thing to avoid: writing descriptions that describe the agent's identity ("You are an expert code reviewer with 20 years of experience...") rather than its activation conditions. The former belongs in the system prompt. The description is for the routing model, not for the agent itself.

### Restrict tools deliberately

An agent that inherits all tools from the main session is an agent you cannot reason about when something goes wrong. Grant only what the task requires. A code reviewer needs read access — not write access, not shell execution, not network calls. A research agent needs search and fetch — not file editing. A test-runner needs Bash execution — not web access.

Tool restriction is both a security practice and a clarity practice. A narrow tool set makes the agent's behaviour predictable. When the agent fails or produces unexpected output, a short list of possible tools makes diagnosis faster. More importantly, it makes the agent's failure modes finite and knowable.

The `disallowedTools` field lets you inherit the main session's tool set and then remove specific tools — useful when you want "everything except Bash" or "everything except Write."

### One task per agent

The [sub-agents documentation](https://code.claude.com/docs/en/sub-agents) is direct: each subagent should excel at one specific task. An agent with a description like "reviews code, writes tests, updates documentation, and handles deployment checks" has four descriptions competing in one field. Claude will route to it inconsistently, and the system prompt will try to handle four modes of operation simultaneously — none of them as well as a focused agent would.

Narrow the scope. A code reviewer. A test generator. A documentation updater. Three separate files, each with a single clear description. This is easier to maintain, easier to test, and easier to replace when requirements change.

### Use the model field as a cost lever

This is the most commonly ignored field among practitioners who haven't been surprised by their usage costs yet.

Lightweight tasks — formatting checks, boilerplate verification, pattern searches, simple lookups — don't need the full model. Setting `model: haiku` on those agents reduces cost substantially when multiple agents are running in a session. Setting `model: opus` on an agent that needs sustained reasoning over a long context window justifies the cost. The default (`inherit`) means every agent runs on whatever model the main session uses — which is often the most powerful model, applied equally to tasks that don't need it.

### The community signal

The [VoltAgent collection of subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) has catalogued over 100 specialist subagents — language experts, security reviewers, infrastructure agents, debuggers, orchestrators. What's notable isn't the count; it's the structure. Every agent in the collection is narrow. A TypeScript specialist. A SQL expert. A security auditor. A Kubernetes operator. Nothing tries to handle more than one domain.

That's the practitioner consensus after a year of real usage: many focused agents outperform one general-purpose one. The collection also includes an explicit operational note: contributed agents are "provided as-is" and should be reviewed before use. That's the right posture for community-sourced agent definitions — they're a starting point, not a finished configuration.

---

## A quick look at agent teams

Agent teams are worth knowing about, but they're a different feature from subagents — and the distinction matters.

Subagents work within a single session. Your main Claude Code instance spawns them, they do work in isolation, they return results. You orchestrate. Agent teams are independent Claude Code sessions that communicate with each other through a shared task list and direct peer messaging. Each teammate has its own context window, its own session state, and can both assign tasks to and receive tasks from other teammates.

The [agent teams documentation](https://code.claude.com/docs/en/agent-teams) identifies when this pays off: research and review where multiple teammates investigate different angles simultaneously; debugging with competing hypotheses where teammates challenge each other's theories; new modules or features where each teammate owns a separate component without stepping on the others.

The tradeoffs are real. Agent teams add coordination overhead and consume significantly more tokens — each teammate has its own context window, billed independently. They are experimental and disabled by default, requiring an environment variable to enable. Current limitations apply.

The practical signal is simple: as long as your subagents are reporting back to you and don't need to talk to each other, you don't need agent teams. The moment one subagent needs to hand off findings to another, or challenge another's conclusions, that's when the upgrade earns its cost. Until then, subagents are enough.

---

## When agents are the wrong tool

Anthropic's own guidance from the [building effective agents post](https://www.anthropic.com/engineering/building-effective-agents) is worth taking seriously: "We recommend finding the simplest solution possible, and only increasing complexity when needed. This might mean not building agentic systems at all."

That applies directly here. A few scenarios where a subagent adds friction without return:

**One-off tasks.** Subagents carry authoring overhead: naming, description design, tool selection, testing, maintenance. A task you'll do once doesn't warrant any of that. Write a good prompt. The investment in a subagent only returns when the workflow recurs frequently enough to justify maintaining a definition for it.

**When context isn't the problem.** The primary reason to use a subagent is to protect your main context from heavy work. If the task is lightweight, your context window isn't filling up, and you don't need specialised tool restrictions — a subagent is adding indirection with no benefit. A well-written prompt in the main session is faster, simpler, and easier to debug.

**The monolith trap.** One agent trying to cover research, implementation, review, and documentation is not comprehensive — it's untestable and inconsistently selected. When an agent tries to handle multiple unrelated workflows, it fails silently in the cases it wasn't designed for. The shorter and more specific the description, the more reliably it routes.

**When a skill would do.** If what you need is reusable workflow logic or domain knowledge loaded into your main context, a skill is the right primitive. An agent that just runs a set of instructions you could have put in a skill is an agent used for the wrong reason — you've added isolation where you needed availability.

The general principle: reach for the simplest tool that solves the actual problem. Add agents when the problem is specifically about context isolation, specialised constraints, or dedicated execution — not because agents seem more powerful.

---

## Closing thoughts

Subagents are a context management tool and an execution boundary.

That framing matters because most people approach them as a capability upgrade — a way to make Claude do more. The better frame is: a way to make Claude do the right work in the right place. Skills define what Claude knows. Subagents define who does the work, where, and with what constraints.

Once you see that distinction clearly, the whole Claude Code primitive stack starts to make sense as a design. Memory sets always-on context. Rules scope it. Skills load it on demand. Hooks enforce behaviour at lifecycle events. Subagents move work out of the main context entirely. Each primitive solves a different problem. None of them substitutes for the others.

**One agent, configured carefully, is a reasonable afternoon's work.** You don't need an orchestration system to get value from the feature. A focused description, a restricted tool set, a single clear job — that's a subagent that will select reliably and perform consistently. The complexity can grow from there, but it doesn't have to start there.

---

## Now, I want to hear from you

- If you haven't tried subagents yet: what's the task in your current workflow that you'd most want to delegate to an isolated worker? What's stopping you?
- If you have: what was the first task where the context isolation actually mattered — where running it in the main session would have caused a real problem?
- How are you handling tool access in practice — per-agent restriction, or inheriting from the main session and trimming from there?

---

## References

[1] [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents) — Official definition of subagents, supported frontmatter fields, directory locations, delegation behaviour, and best practices including tool restriction and description design.

[2] [Extend Claude Code — Claude Code Docs](https://code.claude.com/docs/en/features-overview) — The clearest official comparison across Claude Code primitives; explains context isolation as the primary reason for subagents; includes skills vs subagents comparison and combination patterns.

[3] [Orchestrate teams of Claude Code sessions — Claude Code Docs](https://code.claude.com/docs/en/agent-teams) — Defines agent teams, explains how they differ from subagents, lists use cases, and documents experimental status and token cost tradeoffs.

[4] [Effective context engineering for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Frames context as a finite, degradable resource and introduces context engineering as the discipline of managing what enters the limited context window.

[5] [Building effective agents — Anthropic Engineering](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic's guidance on when agent systems are warranted; recommends starting simple and distinguishes workflows from agents.

[6] [awesome-claude-code-subagents — VoltAgent / GitHub](https://github.com/VoltAgent/awesome-claude-code-subagents) — A community collection of 100+ specialist subagents demonstrating practitioner convergence on narrow, focused agents organised by domain.
