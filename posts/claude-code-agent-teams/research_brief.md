# Research Brief: Claude Code agent teams: when and how to go multi-agent

**Generated:** 2026-04-29

## Summary

13 URLs were present in `notes.md` as Tier 1 sources. Of these, 8 were validated and reachable; 5 were deliberately excluded as out-of-scope per `topics_to_exclude` (OpenAI Agents SDK, Google ADK, Microsoft AutoGen, MCP specification, A2A). WebSearch was unavailable during this session (API errors), so no additional sources were found via search. All 8 ToC sections have at least one validated source mapped to them — no gaps remain.

---

## Sources

### Why most teams don't need multiple agents yet

- **[Building effective agents](https://www.anthropic.com/research/building-effective-agents)**
  Anthropic's canonical guide to agentic system design, published Dec 2024. Argues consistently that the most successful implementations use simple, composable patterns rather than complex frameworks, and recommends finding the simplest solution possible before increasing complexity. Primary source for the anti-hype opening and the "when not to use agents" framing.

---

### The Anthropic stack, honestly labelled

- **[Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)**
  Official reference for the Agent SDK — the programmatic layer that wraps Claude Code for automation and embedding. Clarifies that the SDK supports Bedrock, Vertex, and Azure Foundry (unlike Managed Agents), making it the highest-portability tier in the Anthropic stack. Key for the maturity-labelled ladder and the DIY/hybrid framing.

- **[Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)**
  Official docs for Anthropic's hosted agent harness. Confirms the single-agent (mature) vs multiagent (Research Preview, access-gated, one coordinator level only) distinction. Essential for accurate wording on the stack ladder and for the open research questions about preview status.

---

### When one agent stops being enough

- **[Claude Code: Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams)**
  Primary official reference for the Claude Code agent teams feature. Describes the four use cases for agent teams (parallelisable subtasks, separate ownership, debugging with competing hypotheses, cross-layer coordination), explicitly notes that agent teams add coordination overhead and use significantly more tokens, and explains when subagents are the better choice.

---

### The four patterns for combining agents

- **[Building effective agents](https://www.anthropic.com/research/building-effective-agents)**
  (See above.) Also covers the canonical workflow and agent patterns: augmented LLM, prompt chaining, routing, parallelisation, orchestrator-workers, evaluator-optimizer. Maps directly to the post's four-paradigm framework (orchestrator, sequential pipeline, parallel specialists, swarm).

- **[How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)**
  Anthropic Engineering post (Jun 2025) on the production orchestrator-workers pattern inside Claude's Research feature. Explains why parallel subagents facilitate compression of a large context, how each subagent gets separation of concerns, and why a linear pipeline would fail for open-ended tasks. Concrete real-world example of the orchestrator paradigm at scale.

---

### How agents communicate

- **[Claude Code: Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams)**
  (See above.) Contains a dedicated "Context and communication" section: teammates communicate via direct messages (mailbox), a shared task list, and shared files/artefacts. Each teammate has its own context window. Maps directly to the three communication forms and the timing patterns.

- **[Claude Code: Create custom subagents](https://code.claude.com/docs/en/sub-agents)**
  Official subagents reference. Explains the invocation model (subagent receives task, returns result to caller), persistent memory options, and tool scoping — relevant to how information passes between agents in the subagent communication model vs agent teams.

---

### Claude Code agent teams in practice

- **[Claude Code: Orchestrate teams of Claude Code sessions](https://code.claude.com/docs/en/agent-teams)**
  (See above.) Primary source for this section: experimental status (as of 2026-04-29, disabled by default), how to enable, architecture (team config at `~/.claude/teams/{name}/config.json`, task list at `~/.claude/tasks/{name}/`), subagent definitions as reusable roles, hooks for quality gates, and token usage implications.

- **[Claude Code: Store instructions and memories](https://code.claude.com/docs/en/memory)**
  Covers CLAUDE.md, auto memory, skills, and hooks — the four mechanisms that agent teams and subagents inherit and interact with. Relevant for the "how agent teams relate to memory, skills, and hooks" part of this section.

---

### Why agent teams fail

- **[How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)**
  (See above.) Contains engineering lessons from production: end-state evaluation for agents that mutate state, long-horizon conversation management (summarise phases, spawn fresh subagents when context limits approach), and prompt engineering failures that caused coordination issues. Primary source for the evaluation difficulty and context bloat failure modes.

- **[Trustworthy agents in practice](https://www.anthropic.com/research/trustworthy-agents)**
  Anthropic policy post (Apr 2026) on agent risk: prompt injection as a named cyberattack vector, the tension between autonomy and human control, Plan Mode as a mitigation for approval fatigue, and the challenges of subagent delegation chains. Primary source for the tool misuse / prompt injection and human oversight failure modes.

- **[Red-Teaming Anthropic's Internal Agent Monitoring Systems](https://metr.org/blog/2026-03-25-red-teaming-anthropic-agent-monitoring/)**
  METR (Mar 2026) adversarial evaluation of Anthropic's internal agent monitoring. Confirms that novel security vulnerabilities were found even in a well-resourced internal system, and that external adversarial testing is necessary. Supports the security failure mode and the evaluation difficulty mode.

---

### Native vs DIY vs hybrid

- **[Claude Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)**
  (See above.) The SDK is the clearest representation of the hybrid tier: Anthropic's agent loop, full control over system prompts, tools, and permissions, plus multi-cloud portability (Bedrock, Vertex, Azure). Confirms subagent support and the programmatic extension points that DIY/hybrid trade-offs depend on.

- **[Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)**
  (See above.) Represents the native-managed tier: hosted harness, lower engineering overhead, constrained portability, and preview-only multiagent. The trade-off table in notes.md is grounded in what this page confirms about the product's current scope.

---

## Research Gaps

None. All 8 ToC sections have at least one validated source.
