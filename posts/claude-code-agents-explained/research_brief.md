# Research Brief: Claude Code agents explained: what they are, how they work, and when to use them

**Generated:** 2026-04-01

## Summary

Notes.md contained 0 URLs. All 6 sources were found via direct fetch of known official URLs and one community repository. All 6 survived validation. Every section of the rough ToC is covered by at least one source. No research gaps remain. WebSearch was unavailable during this session; all sources were fetched directly using known reliable URLs from prior research.

---

## Sources

### The naming problem: what do people mean by "Claude Code agents"?

- **[Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)**
  The official definition of subagents: "specialized AI assistants that handle specific types of tasks. Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions." Also clarifies the distinction between built-in subagents (Explore, Plan, general-purpose) and custom ones, and notes that agent teams handle multi-session coordination as a separate feature.

- **[Orchestrate teams of Claude Code sessions — Claude Code Docs](https://code.claude.com/docs/en/agent-teams)**
  Defines agent teams as distinct from subagents: "Subagents work within a single session; agent teams coordinate across separate sessions." Provides the clearest official boundary between the two primitives.

### Why agents exist at all

- **[Extend Claude Code — Claude Code Docs](https://code.claude.com/docs/en/features-overview)**
  States directly: "Use a subagent when you need context isolation or when your context window is getting full. The subagent might read dozens of files or run extensive searches, but your main conversation only receives a summary." Also covers specialisation and the three secondary benefits: enforce constraints, reuse configurations, control costs by routing to cheaper models.

- **[Effective context engineering for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)**
  Frames context as a finite, degradable resource: "Context engineering is the art and science of curating what will go into the limited context window." Makes the case that as agents run over longer horizons, managing what enters context becomes the central engineering problem — directly justifying why isolated subagent contexts exist.

### The smallest useful mental model

- **[Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)**
  "Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions. When Claude encounters a task that matches a subagent's description, it delegates to that subagent, which works independently and returns results." Also notes: "Subagents receive only this system prompt (plus basic environment details like working directory), not the full Claude Code system prompt."

### Your first agent, end to end

- **[Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)**
  Covers directory locations (`.claude/agents/` for project scope, `~/.claude/agents/` for user scope), the required and optional frontmatter fields (`name`, `description` required; `tools`, `model`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `memory`, `hooks`, `disallowedTools` optional), and example minimal files including a read-only code reviewer pattern. Also notes that `"use proactively"` in a description signals Claude to delegate more readily.

### Agents vs skills: the confusion everyone runs into

- **[Extend Claude Code — Claude Code Docs](https://code.claude.com/docs/en/features-overview)**
  The clearest official comparison: "Skills add reusable knowledge and invocable workflows. Subagents run their own loops in isolated context, returning summaries." Also: "Skills can run in your current conversation or in an isolated context via subagents." Includes the full comparison table across CLAUDE.md, Skills, MCP, Subagents, Agent teams, and Hooks. Notes that the primitives can combine: "A subagent can preload specific skills (`skills:` field). A skill can run in isolated context using `context: fork`."

### Best practices that actually matter

- **[Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)**
  Official best practices: keep agents focused on one task; write detailed descriptions (Claude uses the description to decide when to delegate); use `"use proactively"` phrasing to encourage delegation; restrict tools to only what the agent needs (both for security and focus); use `model: haiku` to control cost for lightweight tasks; set `permissionMode` deliberately.

- **[Extend Claude Code — Claude Code Docs](https://code.claude.com/docs/en/features-overview)**
  Adds: "Every feature you add consumes some of Claude's context. Too much can fill up your context window, but it can also add noise that makes Claude less effective." Practical guidance: don't load everything — use subagents to keep intermediate work out of the main context.

### A quick look at agent teams

- **[Orchestrate teams of Claude Code sessions — Claude Code Docs](https://code.claude.com/docs/en/agent-teams)**
  Defines when agent teams outperform subagents: research and review, parallel module development, debugging with competing hypotheses, cross-layer coordination. Key caveat: "Agent teams add coordination overhead and use significantly more tokens than a single session. They work best when teammates can operate independently." Confirms experimental status and that they are disabled by default.

- **[Extend Claude Code — Claude Code Docs](https://code.claude.com/docs/en/features-overview)**
  "Agent teams are experimental and disabled by default. [...] Use an agent team when teammates need to share findings, challenge each other, and coordinate independently." Identifies the transition point: "If you're running parallel subagents but hitting context limits, or if your subagents need to communicate with each other, agent teams are the natural next step."

### When agents are the wrong tool

- **[Building effective agents — Anthropic Engineering](https://www.anthropic.com/engineering/building-effective-agents)**
  Core principle: "We recommend finding the simplest solution possible, and only increasing complexity when needed. This might mean not building agentic systems at all." Draws the workflows-vs-agents distinction (predefined paths vs dynamic model-driven decision-making) and notes that "for many applications, optimizing single LLM calls with retrieval and in-context examples is usually enough."

### Community patterns (supporting the best practices section)

- **[awesome-claude-code-subagents — VoltAgent / GitHub](https://github.com/VoltAgent/awesome-claude-code-subagents)**
  A community collection of 100+ specialist subagents (language experts, security reviewers, debuggers, infrastructure agents, etc.), showing strong practitioner convergence on many narrow, focused agents rather than general-purpose ones. The collection is explicitly organised by domain and warns that contributed agents are "provided as-is" and should be reviewed before use — a useful signal about operational posture.
