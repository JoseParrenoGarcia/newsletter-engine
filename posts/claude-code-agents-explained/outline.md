# Outline: Claude Code agents explained: what they are, how they work, and when to use them

**Target:** ~15 min read (~3,750 words)

## Sections

### Opening (before first H2)
- Contrarian reframe: most people think "agents" in Claude Code = more powerful prompts or fancier skills. They don't. Agents are isolated workers running in separate context windows with their own system prompt, tools, and permissions.
- One sentence on what the post covers and who it's for (readers close to the tech who haven't tried agents yet).
- Sources: n/a (thesis framing)

### Preview section
- Labelled bullet list — one entry per major content section
- Sources: n/a (structural)

### 1. The naming problem: what do people mean by "Claude Code agents"?
- Clears three layers of confusion: Claude Code itself is agentic; the custom in-product primitive is subagents; agent teams and the Agent SDK are separate features
- Establishes "subagent" as the right term for the feature this post is about
- Sources: [Create custom subagents](https://code.claude.com/docs/en/sub-agents), [Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams)

### 2. Why agents exist at all
- Context isolation as the primary reason: subagents keep exploration and file-heavy work out of the main context window; the main conversation receives a summary, not all intermediate steps
- Secondary reasons: specialisation (custom prompt + tool set), cost control (route tasks to cheaper models), constraint enforcement (restrict which tools an agent can use)
- Ties to Anthropic's context engineering framing: context is finite and degrades with noise
- Sources: [Extend Claude Code](https://code.claude.com/docs/en/features-overview), [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

### 3. The smallest useful mental model
- A subagent runs in its own context window; it receives only its own system prompt plus basic environment details (working directory), not the main Claude Code system prompt
- It works independently and returns a result; the main conversation stays clean
- Built-in subagents already exist (Explore, Plan, general-purpose); custom subagents layer on top
- Visual placeholder: diagram of main agent → spawns subagent → subagent works in isolated window → returns summary
- Sources: [Create custom subagents](https://code.claude.com/docs/en/sub-agents)

### 4. Your first agent, end to end
- File location: `.claude/agents/` (project scope) or `~/.claude/agents/` (user scope)
- Minimal file structure: YAML frontmatter + system prompt body
- Required fields: `name`, `description`. Optional: `tools`, `model`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`
- Walk through a concrete minimal example: a read-only code reviewer (shows the value of restricted tools)
- The `"use proactively"` trick: how phrasing the description signals Claude to delegate more readily
- Sources: [Create custom subagents](https://code.claude.com/docs/en/sub-agents)

### 5. Agents vs skills: the confusion everyone runs into
- Core distinction stated cleanly: skills add reusable knowledge or invocable workflows to the current context; subagents run in isolated contexts and return summaries
- Loading difference: a skill loads into your main conversation; a subagent runs separately and keeps the work out of your context
- The primitives can combine: a subagent can preload skills via the `skills:` field; a skill can run in isolated context with `context: fork`
- Brief table: Skills vs Subagents on what it does, when it loads, best for
- Sources: [Extend Claude Code](https://code.claude.com/docs/en/features-overview)

### 6. Best practices that actually matter
- Write the description carefully: Claude uses it to decide when to delegate — vague = inconsistent
- Restrict tools: grant only what the agent needs, both for security and focus
- One task per agent: a subagent trying to do everything will be selected inconsistently
- Control cost deliberately: use `model: haiku` for lightweight tasks
- Community signal: the VoltAgent collection of 100+ specialist agents shows the practitioner consensus — many narrow agents, not one general-purpose one
- Sources: [Create custom subagents](https://code.claude.com/docs/en/sub-agents), [Extend Claude Code](https://code.claude.com/docs/en/features-overview), [awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)

### 7. A quick look at agent teams
- Agent teams are distinct from subagents: subagents report back within one session; agent teams are independent sessions that communicate via a shared task list
- Best for: parallel research, competing debugging hypotheses, cross-layer feature development where teammates can work independently
- Key caveat: experimental, disabled by default, significantly more token cost; only worth it when teammates genuinely need to communicate with each other
- Transition point: if your subagents need to share findings, agent teams are the next step
- Sources: [Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams), [Extend Claude Code](https://code.claude.com/docs/en/features-overview)

### 8. When agents are the wrong tool
- One-off tasks: a prompt is enough; agents carry authoring and maintenance overhead
- When your context is not actually the problem: if the main conversation isn't filling up, a subagent adds complexity with no return
- The monolith trap: one agent designed to "do everything" is un-testable, selects inconsistently, and fails silently
- Anthropic's own framing: start simple; many applications don't need agents at all
- Sources: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

### Closing thoughts
- Synthesis: agents are a context management tool and an execution boundary, not a complexity upgrade
- The underlying shift: once you see the difference between what Claude knows (skills) and who is doing the work and where (agents), the whole primitive stack makes sense
- Sources: synthesis — no external source

### Now, I want to hear from you
- 3 specific questions: what made you first reach for an agent instead of a skill? How are you managing tool access in practice? Has the description field ever surprised you — in either direction?
- Sources: n/a (structural)
