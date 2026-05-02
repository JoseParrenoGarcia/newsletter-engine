# Outline: Claude Code agent teams: when and how to go multi-agent

**Target:** ~17 min read (~4,250 words)

## Sections

### Preview section
- Labelled bullet list — one entry per major content section
- Sources: n/a (structural)

### 1. Why most teams don't need multiple agents yet
- Opens with the contrarian thesis: one well-configured agent plus good tools usually beats a poorly coordinated team of agents.
- Names the failure pattern: reaching for agent teams because they feel more powerful, not because there is a specific problem to solve.
- Sets up the framing for the rest of the post: add agents only when you can name the reason.
- Sources: [Building effective agents](https://www.anthropic.com/research/building-effective-agents)

### 2. The Anthropic stack, honestly labelled
- Walks through the ladder from Messages API → Agent SDK → Managed Agents → agent teams / multiagent, with honest maturity labels.
- Distinguishes what Anthropic owns vs what the developer owns at each tier.
- Explicitly flags Claude Code agent teams (experimental, disabled by default) and Managed Agents multiagent (Research Preview, one coordinator level only).
- Sources: [Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview), [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)

### 3. When one agent stops being enough
- Four specific, nameable triggers: context isolation, specialisation, parallel work, independent critique.
- Each trigger gets a concrete example.
- Makes clear that these are preconditions, not aspirations — reach for teams when you can point to one of these, not before.
- Sources: [Claude Code: Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams)

### 4. The four patterns for combining agents
- Provider-agnostic framing: orchestrator/planner-executor, sequential pipeline, parallel specialists/debate, swarm.
- Each pattern: what it is, when to use it, when to avoid it, main failure mode.
- Claude Code mappings noted for each.
- Sources: [Building effective agents](https://www.anthropic.com/research/building-effective-agents), [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)

### 5. Claude Code agent teams in practice
- What the feature actually is: experimental, disabled by default, how to enable it.
- Architecture: team lead, teammates, shared task list at `~/.claude/tasks/`, mailbox for direct messaging.
- How agent teams differ from subagents — subagents report back; teammates can self-coordinate.
- Relationship to skills, hooks, and memory.
- Sources: [Claude Code: Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams), [Claude Code: Store instructions and memories](https://code.claude.com/docs/en/memory)

### 6. How agents communicate
- Three forms: plain language messages, structured invocation (JSON Schema tool calls), shared state or artefacts.
- Four timing patterns: synchronous calls, sequential handoffs, event-driven, shared-state polling.
- What to pass between agents: the case for task-specific artefacts over full conversation history.
- Sources: [Claude Code: Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams), [Claude Code: Create custom subagents](https://code.claude.com/docs/en/sub-agents)

### 7. Why agent teams fail
- Eight failure modes: coordination drift, hallucinated ownership, silent intermediate failure, context bloat, schema brittleness, tool misuse, cost explosion, evaluation difficulty.
- Each failure mode: what it is, practical mitigation.
- Sources: [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system), [Trustworthy agents in practice](https://www.anthropic.com/research/trustworthy-agents), [Red-Teaming Anthropic's Internal Agent Monitoring Systems](https://metr.org/blog/2026-03-25-red-teaming-anthropic-agent-monitoring/)

### 8. Native vs DIY vs hybrid
- Three-way decision framework as architecture trade-offs, not ideology.
- Native managed: lower engineering overhead, constrained portability, preview multiagent limits.
- DIY: highest control, highest engineering cost.
- Hybrid (Agent SDK): Anthropic's loop + your architecture + multi-cloud portability.
- Opinionated guidance: when each makes sense.
- Sources: [Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview), [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)

### Closing section
- Named `## Closing thoughts`
- Synthesises the argument: the question is not "should I use agent teams?" but "what problem am I actually solving?"
- Connects back to opening thesis.
- Sources: synthesis — no external source

### Now, I want to hear from you
- Named `## Now, I want to hear from you`
- 3 questions tied to the post's argument
- Sources: n/a (structural)
