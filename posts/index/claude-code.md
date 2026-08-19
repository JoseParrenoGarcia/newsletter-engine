# Claude Code — Post Cards

> **Agent note:** do NOT read pipeline artefacts (`research_brief.md`, `outline.md`,
> `seo_brief.md`, `review_report.md`, `promotion_posts.md`). Use the `Path` in each card.

---

<!-- slug: rtk-token-savings -->
<a name="rtk-token-savings"></a>
### RTK promises to cut your Claude Code token bill. Does it?

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Claude Code users and practitioners of agentic coding patterns who are token-conscious and have heard the RTK headline numbers, but haven't verified the mechanics or the economics themselves |
| **Topics** | `claude-code` `cost-optimisation` `skills` `agents` |
| **Path** | `posts/rtk-token-savings/long_draft.md` |

**Summary:** RTK (Rust Token Killer) compresses CLI output before it reaches a coding agent, with headline savings of 60–90% on eligible Bash output. The post works through why those numbers don't translate to equivalent bill reductions: in a 2,848-run empirical corpus, tool outputs were roughly 3.3% of billed cost, so even 80% local compression produces a theoretical ceiling of 2.64 percentage points — and agent-trajectory effects (extra turns, cache replay) can erase even that. Two independent external studies are examined in detail: JetBrains SkillsBench found +7.6% cost at low reasoning effort and +0.1% at high effort (quality unchanged), while Weinberger & Hozez (2026) found −2.7% in their main arm with a holdout interval crossing zero. Five failure modes are covered — missing diagnostics, stripped edit anchors, transformed machine-readable stdout, parser drift, and trajectory expansion — with concrete historical examples for each. The post closes with a five-step deployment ladder anchored to estimating addressable surface first, and frames the correct evaluation metric throughout as cost per successfully completed task at held quality, not tokens removed per command.

---

<!-- slug: claude-code-plugins -->
<a name="claude-code-plugins"></a>
### Claude Code Plugins: How to Build, Version, and Maintain Them

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Experienced Claude Code users who already use skills, hooks, and CLAUDE.md and want to package and share their customisations across projects or with a team |
| **Topics** | `claude-code` `skills` `agents` `hooks` `project-setup` `session-context` |
| **Path** | `posts/claude-code-plugins/long_draft.md` |

**Summary:** Claude Code plugins are not a new capability — they are the packaging and distribution layer for everything you already build with CLAUDE.md, skills, hooks, MCP servers, and agents. The post establishes that framing upfront, then walks through building a plugin from scratch: the scaffold command, directory structure, and writing a `plugin.json` manifest. Distribution mechanics are covered in full — source types, installation scopes, and how namespace prefixing prevents collisions between third-party plugins. The operational sections that most documentation skips are given equal weight: explicit semver vs commit-SHA versioning strategies, plugin dependencies and pinning, running `claude plugin validate` before release, and how auto-update and `/reload-plugins` push changes to users. Closes with the enterprise controlled-rollout pattern for teams that need staged adoption.

---

<!-- path: reference_posts/standalone/genai-ai/how-claude-code-rules-actually-work.md -->
<a name="how-claude-code-rules-actually-work"></a>
### How Claude Code rules actually work

| Field | Value |
|-------|-------|
| **Type** | standalone / genai-ai |
| **Audience** | Developers and technical practitioners using Claude Code in real projects |
| **Topics** | `claude-code` `rules` `claude-md` `session-context` `project-setup` |
| **Path** | `reference_posts/standalone/genai-ai/how-claude-code-rules-actually-work.md` |

**Summary:** Rules in Claude Code are markdown files that Claude discovers and loads automatically at session start — not configuration settings, not code. The post explains the full loading and prioritisation mechanism: how CLAUDE.md and scoped rules files work together, how Claude discovers context it wasn't explicitly pointed at, and how to verify what's actually being loaded. It works through a real data science project to show rules in practice across exploratory and production contexts, and closes with a clear warning about the failure modes that emerge when rules drift out of sync with the codebase they describe.

---

<!-- path: reference_posts/standalone/genai-ai/claude-code-memory-explained-how-it-really-works.md -->
<a name="claude-code-memory-explained"></a>
### You (probably) don't understand Claude Code memory.

| Field | Value |
|-------|-------|
| **Type** | standalone / genai-ai |
| **Audience** | Developers and technical leads building with or configuring Claude Code |
| **Topics** | `claude-code` `memory` `claude-md` `session-context` `project-setup` |
| **Path** | `reference_posts/standalone/genai-ai/claude-code-memory-explained-how-it-really-works.md` |

**Summary:** Claude Code memory is not a database or persistent state — it is a set of markdown files that Claude reads at the start of every session, injected into context before the first message. The post demystifies the full memory hierarchy: global `CLAUDE.md` for user-level defaults, project-level `CLAUDE.md` for repo-specific instructions, and how these layers stack and override each other. It covers what belongs at each level, how to structure project-level files for complex codebases, and real-world examples showing memory in practice. The post ends with a framework for evolving memory files deliberately over time rather than letting them drift into noise.

---

<!-- slug: claude-code-agents-explained -->
<a name="claude-code-agents-explained"></a>
### Claude Code agents: what they actually are

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Practitioners already using Claude Code who want to understand agents properly before using them |
| **Topics** | `claude-code` `agents` `subagents` `context-isolation` `skills` |
| **Path** | `posts/claude-code-agents-explained/long_draft.md` |

**Summary:** Agents in Claude Code are not smarter prompts — they are isolated execution contexts with their own context window, system prompt, tool set, and permissions. The post resolves the naming confusion (subagents vs agent teams vs Agent SDK), explains why agents exist as a primitive (context isolation, specialisation, parallelism), and walks through building a first subagent end to end. The core distinction between agents and skills is given its own section — agents are isolated workers, skills are reusable workflows that run in the main context. Closes with a clear account of when agents are the wrong tool.

---

<!-- slug: claude-code-agent-teams -->
<a name="claude-code-agent-teams"></a>
### Claude Code agent teams: when and how to go multi-agent

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Claude Code practitioners who already understand subagents and want to combine them into coordinated systems |
| **Topics** | `claude-code` `agents` `multi-agent` `orchestrator` `skills` |
| **Path** | `posts/claude-code-agent-teams/long_draft.md` |

**Summary:** Most teams don't need multiple agents yet — the post opens by making that case honestly before explaining when the threshold is genuinely crossed. It covers four team paradigms (orchestrator, sequential pipeline, parallel specialists, swarm), how Claude Code implements them via subagents, skills, hooks, and shared task lists, and the three forms of inter-agent communication. The failure modes section is the most practically useful part: eight ways agent teams break in production, each with a concrete mitigation. Closes with a decision framework for choosing between native managed, DIY, and hybrid architectures.

---

<!-- slug: claude-code-skills-explained -->
<a name="claude-code-skills-explained"></a>
### What the docs don't tell you about Claude Code skills

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Technical practitioners using Claude Code seriously — developers and data scientists who want to go deeper than the docs |
| **Topics** | `claude-code` `skills` `agents` `multi-agent` `project-setup` |
| **Path** | `posts/claude-code-skills-explained/long_draft.md` |

**Summary:** The Claude Code docs explain how to create a skill; they don't explain what makes one good. This post covers the full anatomy of a SKILL.md beyond the obvious frontmatter — progressive disclosure, encoding edge cases, structuring outputs, and using scripts for reliability. The hidden gems section covers the design patterns that turn a skill from a prompt into a repeatable workflow. A dedicated section covers how skills compose with MCP servers and subagents, enabling multi-stage agentic pipelines. Closes with design principles drawn from treating skills as software artefacts that need testing, not just authoring.

---

<!-- slug: claude-code-evals-part-1-why-it-worked-once-is-not-evidence -->
<a name="claude-code-evals-part-1-why-it-worked-once-is-not-evidence"></a>
### Claude Code Evals — Part 1: Why "It Worked Once" Is Not Evidence

| Field | Value |
|-------|-------|
| **Type** | series / series-genai |
| **Series** | Claude Code Evals — Part 1 |
| **Audience** | Engineers, technical managers, and technical PMs building with Claude Code or evaluating agents who have not yet thought seriously about evals |
| **Topics** | `claude-code` `evals` `reliability` `probabilistic` `agent-testing` `iteration` |
| **Path** | `posts/claude-code-evals-part-1-why-it-worked-once-is-not-evidence/long_draft.md` |

**Summary:** Claude Code is not answering questions — it is acting inside an environment, changing files, running commands, and firing hooks. A single impressive run is not evidence of reliability because LLMs are probabilistic: the same prompt produces different outputs across runs, and different outputs across models. This post installs the mental model that is missing before anyone thinks seriously about evals, using the unit-test analogy as its backbone: software engineers test by discipline, not because they believe their code is broken, yet that same discipline disappears the moment they start building agents. It works through three concrete motivators — the iteration problem (how do you know a revised skill improved and not just changed?), the cost management angle (can Haiku replace Sonnet here — a question you cannot answer without data), and the failure modes that surprise teams who skipped this step. The post closes by demystifying what an eval actually is and pointing forward to Parts 2 and 3 for the map and the method.

---

<!-- slug: claude-code-thinking-planning-goal-mode -->
<a name="claude-code-thinking-planning-goal-mode"></a>
### You Don't Need Ultrathink. You Need a Plan.

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Practitioners using or exploring Claude Code who want to understand the mechanics behind reasoning effort, plan mode, and goal mode |
| **Topics** | `claude-code` `planning` `agents` `goal-mode` `multi-agent` |
| **Path** | `posts/claude-code-thinking-planning-goal-mode/long_draft.md` |

**Summary:** Thinking levels, planning mode, and goal mode are three distinct concepts that most practitioners conflate. The post untangles them: thinking levels are budgeted deliberation with a cost/quality/speed trade-off; planning mode is the discipline of separating design from execution before an agent acts; goal mode extends that discipline to long-running autonomous work by specifying a verifiable completion condition. Planning mode is positioned as the umbrella concept — it encapsulates model selection (Opus for planning, Sonnet for execution), effort level, and pre-execution discipline. Closes with four reusable patterns for combining planning mode and goal mode in practice.

<!-- slug: claude-code-evals-part-2-what-you-actually-need-to-test -->
<a name="claude-code-evals-part-2-what-you-actually-need-to-test"></a>
### Claude Code Evals — Part 2: What You Actually Need To Test

| Field | Value |
|-------|-------|
| **Type** | series / series-genai |
| **Series** | Claude Code Evals, Part 2 |
| **Audience** | Engineers, technical managers, and technical PMs who have read Part 1 and want to understand what a complete evaluation picture looks like for a real Claude Code workflow |
| **Topics** | `claude-code` `skills` `agents` `capability-gap` `claude-code` |
| **Path** | `posts/claude-code-evals-part-2-what-you-actually-need-to-test/long_draft_final.md` |

**Summary:** The final document is one of eight evaluation surfaces in a Claude Code workflow — and some of the most dangerous failures look like passing output while skill trigger, tool-use trajectory, and file state all failed silently. The post introduces an evaluation map derived from Anthropic's transcript framing, then goes deep on three surfaces most teams skip: trigger evals (does the right skill fire, and does the wrong skill stay quiet?), trajectory evals (did Claude read the right context file before writing?), and cost evals (did the workflow stay within token and turn budgets?). The transcript is positioned as a free source of evidence — tool calls, file reads, token counts, and turn counts are already there, not requiring new instrumentation. Closes with the honest state of transcript access today: what the Agent SDK exposes, what requires parsing unstable JSONL files, and what is not yet documented.

---

<!-- slug: claude-code-evals-part-3-building-an-eval-suite -->
<a name="claude-code-evals-part-3-building-an-eval-suite"></a>
### Claude Code Evals — Part 3: Anthropic's skill-creator is good enough for your evals

| Field | Value |
|-------|-------|
| **Type** | series / series-genai |
| **Series** | Claude Code Evals, Part 3 |
| **Audience** | Data scientists and ML engineers using Claude Code who want to understand how to actually evaluate their AI workflows; may not have built a formal eval suite before |
| **Topics** | `claude-code` `skills` `agents` `capability-gap` `model-selection` |
| **Path** | `posts/claude-code-evals-part-3-building-an-eval-suite/long_draft.md` |

**Summary:** Every eval framework — from a shell script to Azure AI Foundry — implements the same five modules: task bank, runner, graders, transcript, and baseline comparison. Anthropic named this architecture first in their demystifying evals engineering post; the entire industry independently rediscovered it. The post uses skill-creator (Anthropic's Claude Code-native eval framework) to make each module concrete, with real examples from actual runs: an evals.json task bank with fixture files and discrete expectations, a Grader agent that evaluates each expectation against the execution transcript, and a benchmark.json showing a Haiku vs Sonnet comparison where Haiku outperforms on both pass rate and cost. The framework landscape is then mapped to the same five modules across three clusters — code-first open-source, tracing-first, and enterprise end-to-end — so readers can identify when skill-creator is enough and when to reach for something else. Closes with a decision tree anchored to where a Claude Code team actually is.

---

<!-- slug: ponytail-caveman-token-savings-myth -->
<a name="ponytail-caveman-token-savings-myth"></a>
### Ponytail, Caveman, and the myth of Claude Code token savings

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Claude Code users and practitioners of agentic coding patterns who are token-conscious and have heard the hype around Ponytail/Caveman-style token-saving skills, but haven't verified the mechanics or claims themselves |
| **Topics** | `claude-code` `skills` `cost-optimisation` `model-selection` |
| **Path** | `posts/ponytail-caveman-token-savings-myth/long_draft.md` |

**Summary:** Ponytail and Caveman are both praised as easy Claude Code token savers, but the post argues they're three distinct mechanisms sitting on three different channels of a coding agent's actual token bill — Ponytail's behavioural decision ladder that changes what code gets built, Caveman's original output-style compression, and Caveman Proxy's separate, more ambitious input-compression system with a recoverable local store. It introduces an eight-channel mental model for how a coding-agent session actually spends tokens, then holds each project's self-reported headline (54% code reduction, 65% output-token reduction, 33.2% input reduction) up against independent JetBrains SkillsBench retests, which land at roughly a third or less of the marketed numbers, with no comparable independent check yet for Caveman Proxy. Two academic papers (CAVEWOMAN, SkillReducer) supply the theoretical backdrop for why headline and independent numbers can both be true — effect size tracks task-level headroom, not a fixed tool property. Closes with a per-tool practical verdict and a concrete, scoped self-test protocol readers can run on their own repository instead of trusting either the vendor benchmark or the hype.

---
