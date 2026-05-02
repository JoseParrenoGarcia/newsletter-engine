# Notes — Claude Code Agent Teams



Source: "Agent teams in Claude and broader multi-agent systems" (research PDF, 2026-04-27)

---

## Executive Summary (from research)

- Most teams should start with **one good agent + good tools + disciplined context management**, then add more agents only when there is a clear need for: separation of context, parallel work, specialised roles, or independent critique.
- Anthropic argues for "simple, composable patterns" over elaborate agent frameworks.
- Agents bring higher cost and compounding error risk.
- Microsoft similarly advises: if a plain function can do the job, it should.

---

## The Anthropic Stack (ladder)

| Surface | Who owns runtime | Multi-agent status | Mental model |
|---|---|---|---|
| Messages API | You | None built in | Raw materials for DIY |
| Claude Agent SDK | Mostly you | Subagents supported; richer patterns still your design | Hybrid: Anthropic loop, your system |
| Claude Managed Agents | Anthropic | Single-agent mature; multiagent separate preview | Hosted harness |
| Managed Agents multiagent | Anthropic | **Research Preview**, access-gated, one level of delegation only | Native but still constrained |
| Claude Code subagents | Claude Code / you as operator | Official feature, but not peer-to-peer teams | Bounded helpers |
| Claude Code agent teams | Claude Code / you as operator | **Experimental**, disabled by default | Human-supervised coordination in the coding product |

Key insight: "Claude has agent teams" is true but incomplete. "Claude has production-grade, general-purpose native multi-agent orchestration across all surfaces" would overstate it.

---

## What is Still Experimental / Preview-Only

- **Claude Code agent teams**: experimental, disabled by default. Known limitations: session resumption, task coordination, shutdown behaviour. Resumed sessions may refer to teammates that no longer exist; task state can lag.
- **Managed Agents multiagent**: Research Preview, access-gated, currently supports **one coordinator level only** (coordinator can call agents, but called agents cannot themselves call further agents).

---

## How Claude Code Teams Relate to Memory / Skills / Hooks / Subagents

- Subagents run inside a single session, report results back to caller.
- Agent teams are separate Claude Code sessions with their own contexts + **shared task list** + **mailbox** for direct teammate messaging.
- Subagents are better when only the result matters; agent teams are better when workers need to share findings, challenge one another, coordinate on their own.
- Subagents can maintain their own auto memory → raises architectural question: which knowledge stays local, which is shared, which is summarised back.

---

## What Managed Agents Changes

- Anthropic provides the harness and infrastructure: managed environment where Claude can read files, run commands, browse, execute code securely.
- Best for: long-running execution, cloud infrastructure, minimal infrastructure burden, stateful sessions.
- Even on Managed Agents, you still control: system prompt, model, custom tools (JSON Schema), context injection via system prompt/files/skills.
- "Anthropic can host the harness, but it cannot magically remove the need for application-level design."

---

## Four General Paradigms

### 1. Central Orchestrator / Planner-Executor
- One lead agent decomposes work, delegates to worker LLMs, synthesises results.
- Use when subtask structure is **not known in advance** but clear top-level ownership is needed.
- Avoid when workflow is already fixed enough to script.
- Main strength: control. Main weakness: orchestrator failure.
- Anthropic Research system uses this pattern.

### 2. Sequential Pipeline
- Agents/stages run in defined order; later stages consume earlier outputs.
- Use when work has natural order (research → synthesis → critique).
- Easiest to explain to a technical audience.
- Main strength: contracts are easier to make explicit. Main weakness: **mistakes cascade**.

### 3. Parallel Specialists / Debate / Red Team
- Multiple agents examine the same task or related subtasks, then vote, critique, or aggregate.
- Use when you care about **robustness more than tidiness**: competing bug hypotheses, adversarial checking, policy critique.
- Avoid for tightly coupled tasks where workers edit the same artefact.
- Main cost: significantly more tokens, aggregation work, risk of false confidence from consensus.

### 4. Swarm / Decentralised / Shared-Context Systems
- Coordination emerges through shared state, threads, messages, or environment changes.
- Use for open-ended exploration, loose collaboration, remote interoperability (e.g. A2A).
- Avoid when you need easy debugging, tight compliance, or simple accountability.
- Hardest to reason about; where "agents" starts to become "distributed systems".

---

## Native vs DIY vs Hybrid

| Dimension | Native managed | DIY | Hybrid |
|---|---|---|---|
| Control | Lowest–medium | Highest | High |
| Reliability | Better OOB for long-running | Whatever you engineer | Often best practical middle ground |
| Flexibility | Lower (preview limits) | Highest | High, bounded by Anthropic's loop |
| Cost | Lower engineering; runtime cost **not** automatically lower | Higher engineering, potentially lower runtime | Moderate on both |
| Portability | Lowest (Managed Agents = direct Claude API only) | Highest | Better than managed |

Practical recommendation: use native managed when infrastructure is the pain; use DIY when topology and policy are the pain; use hybrid when you want Anthropic's loop but don't want to marry your entire architecture to Anthropic's opinion of how the future should look.

---

## Agent Communication Model

### How agents communicate (three forms)
1. **Plain language messages** — flexible but less precise, more failure-prone.
2. **Structured invocation formats** — JSON Schema tool definitions; strict tool use guarantees schema-conformant arguments.
3. **Shared state or artefacts** — most underrated. Subagents write outputs to filesystem/external system and return lightweight references. Avoids "game of telephone".

### When agents communicate (four patterns)
1. **Synchronous calls** — simplest, creates bottlenecks.
2. **Sequential handoffs** — transfer ownership; OpenAI formalises handoffs vs agents-as-tools.
3. **Event-driven / streaming** — better for long-running/async work, harder to debug.
4. **Shared-state polling and checkpoints** — least glamorous, often most robust.

### What agents pass to each other
- Full conversation history → maximises continuity, grows cost + latency + contamination risk.
- Compressed summary → Claude Code subagents do this; often better.
- **Task-specific context and intermediate artefacts** → usually the practical sweet spot. Feature lists in JSON, progress logs, stored reports, code patches.
- Tool outputs, decisions, and error states → what makes agent systems operational rather than theatrical.

### Protocols
- **MCP** = agent-to-tool / agent-to-context infrastructure (JSON-RPC 2.0).
- **A2A** = agent-to-agent infrastructure. Defines Agent Cards, tasks, artifacts, standard bindings (JSON-RPC, gRPC, HTTP+JSON/REST, SSE).
- These solve different layers. Not competitors; complements.

---

## Failure Modes

1. **Coordination drift** — vague delegation causes workers to duplicate searches or miss boundaries. Fix: give each worker explicit objective, expected output, source guidance, task boundaries.
2. **Hallucinated ownership** — one agent assumes another has checked something; nobody has. Fix: explicit completion artefacts, task hooks, end-to-end verification.
3. **Silent intermediate failure** — debugging required full production tracing; top-level session stream is only a condensed view. Fix: instrument traces, inspect worker-level history.
4. **Context bloat and memory pollution** — stale/noisy shared memory degrades entire system. Fix: summarise phases, isolate heavy work in subagents, prefer small focused memory files.
5. **Schema mismatch and brittle prompt contracts** — non-strict tool calls produce incompatible types. Fix: JSON Schema + strict tool mode + narrower agent/tool contracts.
6. **Tool misuse and security failure** — more open environments = more entry points for prompt injection; more tools = more ways for attacker to act. Fix: limit permissions, keep tools scoped, preserve human approval points.
7. **Cost explosion and latency stacking** — agent teams add coordination overhead and use significantly more tokens. Fix: scale effort to task complexity; reserve teams for genuinely parallel work.
8. **Evaluation difficulty** — many internal trajectories can still end in success; evaluating only final prose is "admiring it, not evaluating it". Fix: evaluate whether correct final state was achieved, not whether intended process was followed.

---

## Suggested Blog Post ToC (from research)

1. Why people reach for agent teams too early
2. What an agent actually is (Anthropic's "model directs its own processes and tool use in a loop" framing)
3. The Anthropic stack for agentic systems (ladder from Messages API to agent teams)
4. When one agent stops being enough (real triggers: context isolation, specialisation, parallel search, independent critique, human oversight)
5. The four paradigms of agent teams
6. Native Anthropic features versus building your own (trade-offs as architecture, not ideology)
7. How agent communication actually works (how/when/what framework, then MCP and A2A)
8. Why agent teams fail in production
9. A pragmatic decision framework

---

## Open Research Questions / Wording Cautions

- Anthropic's multi-agent story is still moving quickly. Date-stamp any claims about experimental/preview status.
- Claude Code teams and Managed Agents multiagent are **not the same thing**.
- Anthropic's 90.2% internal performance claim is about their internal research eval on a breadth-first task profile — not a universal law.
- "Anthropic-native" does not always mean "portable Anthropic" (Agent SDK supports Bedrock/Vertex/Azure Foundry; Managed Agents does not).
- Confidence scores are design choices, not protocol defaults.

---

## Source Map (Tier 1)

- Anthropic, Building effective agents — https://www.anthropic.com/research/building-effective-agents
- Claude Code Docs, Orchestrate teams of Claude Code sessions — https://code.claude.com/docs/en/agent-teams
- Claude Code Docs, Create custom subagents + Subagents in the SDK — https://code.claude.com/docs/en/sub-agents
- Claude Code Docs, How Claude remembers your project / Extend Claude with skills / Hooks reference — https://code.claude.com/docs/en/memory
- Anthropic Engineering, How we built our multi-agent research system — https://www.anthropic.com/engineering/multi-agent-research-system
- Claude API Docs, Claude Managed Agents overview + multiagent sessions — https://platform.claude.com/docs/en/managed-agents/overview
- Anthropic Research, Trustworthy agents in practice + Effective harnesses for long-running agents — https://www.anthropic.com/research/trustworthy-agents
- OpenAI, Agents SDK + Orchestration and handoffs + Function calling — https://developers.openai.com/api/docs/guides/agents
- MCP specification + Anthropic MCP launch post — https://modelcontextprotocol.io/specification/2025-03-26
- Google, A2A blog + official A2A docs/specification — https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/
- Google ADK, Multi-agent systems + Events + A2A — https://adk.dev/agents/multi-agents/
- Microsoft Agent Framework + AutoGen docs — https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/
- METR, Red-Teaming Anthropic's Internal Agent Monitoring Systems (Tier 2) — https://metr.org/blog/2026-03-25-red-teaming-anthropic-agent-monitoring/

---

## Brainstorm Summary

This post is the natural follow-on from the subagents post — it picks up at the moment one subagent stops being enough. The core argument is anti-hype: most systems should start with one well-configured agent plus good tools, and only add more agents when there is a specific, nameable reason. The four legitimate triggers are context isolation, specialisation, parallel work, and independent critique.

The post is standalone but assumes the reader has read the subagents post and does not need basic agent concepts re-explained. The reader is a Claude Code practitioner who understands what a subagent is and is now asking: when do I go further, and how? The tone should stay grounded and practitioner-facing — the research document is a reference, not a voice model.

The scope is deliberately focused on Claude Code and provider-agnostic patterns. Cross-provider framework specifics (OpenAI Agents SDK, Google ADK) and protocol deep dives (A2A, MCP) are excluded to keep the post tight. MCP and A2A can be named as labels without detailed explanation. Managed Agents multiagent is also kept brief — it is Research Preview only and too early to be a primary focus.

The failure modes section is a full, prominent section because most posts in this space skip it, and it is where the practical value is. The post closes with a decision framework that treats native-managed vs DIY vs hybrid as architecture trade-offs, not a vendor pitch. Target reading time is 15–17 minutes.

## Rough Table of Contents

- **Why most teams don't need multiple agents yet** — the anti-hype opening; one well-configured agent plus good tools often beats a badly coordinated team.
- **The Anthropic stack, honestly labelled** — the ladder from Messages API to agent teams, with clear maturity markers (what is stable, what is experimental, what is preview-only).
- **When one agent stops being enough** — the four real triggers: context isolation, specialisation, parallel work, independent critique. Each with a concrete example.
- **The four patterns for combining agents** — orchestrator/planner-executor, sequential pipeline, parallel specialists/debate, swarm. Provider-agnostic framing, with Claude Code mappings.
- **How agents communicate** — three forms (plain language, structured invocation, shared artefacts), four timing patterns, and what to actually pass between agents. The shared-artefacts pattern as the underrated sweet spot.
- **Claude Code agent teams in practice** — what the feature actually is (experimental, disabled by default), how it differs from subagents, shared task list + mailbox architecture, relationship to hooks and skills.
- **Why agent teams fail** — eight failure modes with practical mitigations: coordination drift, hallucinated ownership, silent failure, context bloat, schema brittleness, tool misuse, cost explosion, evaluation difficulty.
- **Native vs DIY vs hybrid** — the three-way decision framework as architecture trade-offs, not ideology. When to use each.
