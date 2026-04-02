# Notes

---

## Brainstorm Summary

This post is a ground-up explainer of Claude Code subagents for practitioners who are close to the tech but have not yet tried the feature. The reader knows what Claude Code is and has likely used skills or written CLAUDE.md files, but has not yet configured a custom agent. The goal is to guide them to a clear, complete understanding — not to challenge their assumptions or overwhelm them with system design.

The core two-part takeaway shapes the entire post: first, agents are not skills, because they run in an isolated execution context with their own context window, prompt, tools, and permissions — while skills inject reusable knowledge or workflow into the main context; second, one agent is simple and approachable, and while full multi-agent orchestration exists, it belongs in a separate, future post. The tone throughout is calm and precise.

The post opens by clearing the naming fog: in Claude Code, the custom agent primitive is called subagents. Agent teams (multi-session, experimental) and the Claude Agent SDK (external programmable library) are related but distinct, and a short paragraph acknowledges them so the reader is not confused later. From there the post moves to why subagents exist — context isolation is the primary reason, with specialisation and parallelism as secondary — before building the minimal mental model and walking through anatomy and a first working example.

The agents-vs-skills section is the heart of the post. The distinction is not just terminological: skills load knowledge into the main context, subagents run separately and return a summary. This boundary is then extended briefly to MCP, hooks, and CLAUDE.md. The post closes with best practices (description quality, tool restriction, focus, verification), a light touch on agent teams, and a short "when agents are wrong" section that builds trust.

The post is closely related to the existing skills post and the memory/rules posts, but is entirely standalone — there is no series framing, no cross-post navigation, and no assumption that the reader has seen those posts.

## Rough Table of Contents

- **The naming problem: what do people mean by "Claude Code agents"?** — Clears the fog between subagents, agent teams, and Agent SDK; establishes that subagents are the in-product custom agent primitive.
- **Why agents exist at all** — Explains context isolation as the primary motivation, with specialisation and parallelism as secondary; ties to Anthropic's context-engineering framing.
- **The smallest useful mental model** — Defines a subagent as an isolated worker with its own context window, prompt, tools, permissions, and optionally model; keeps it simple before adding anatomy.
- **Your first agent, end to end** — Shows the minimal AGENT.md file with frontmatter, walks through a simple read-only example, explains where the file lives.
- **Agents vs skills: the confusion everyone runs into** — The heart of the post; explains the distinction cleanly and shows how the primitives can also combine.
- **Best practices that actually matter** — Description quality, tool restriction, single focus, verification; sourced from official Anthropic docs.
- **A quick look at agent teams** — Acknowledges multi-session agents, explains when they help, flags experimental status; kept light.
- **When agents are the wrong tool** — Builds trust; covers one-off tasks, static context, and the monolith anti-pattern.
- **Closing thought** — Ties back to the core takeaway: agents are about context and control, not magic.
