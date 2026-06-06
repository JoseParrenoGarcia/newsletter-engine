# Outline: Claude Code: thinking levels, planning mode, and goal mode explained

**Target:** ~15 min read (~3,750 words)

## Sections

### Preview section
- Labelled bullet list — one entry per major content section
- Sources: n/a (structural)

### 1. Intro — The Knob I Was Ignoring
- Open with contrarian reframe: I had been clicking "high" for thinking effort without knowing if it helped, cost more, or changed anything. Curiosity about token burn triggered research that revealed three separate controls solving three separate problems.
- Establish thesis: thinking levels, planning mode, and goal mode are not the same thing — and planning mode is the organising concept that makes the other two make sense.
- Sources: [An update on recent Claude Code quality reports — Anthropic Engineering](https://www.anthropic.com/engineering/april-23-postmortem)

### 2. Thinking Levels: Budgeted Deliberation, Not Intelligence
- Explain what effort levels actually are: points on the test-time-compute curve. More effort = more reasoning tokens before acting.
- The supported values per model (Opus 4.8/4.7 vs Opus 4.6/Sonnet 4.6); defaults and why they matter.
- The key insight: higher effort is not more correct, it's more deliberate. A trade-off between cost/speed and depth.
- Concrete examples: low effort for "find the test command", high effort for "diagnose this flaky distributed test".
- Brief note on `ultrathink` as community shorthand for maximum effort — how it maps to the official `/effort` command.
- Sources: [Claude Code Model Configuration](https://code.claude.com/docs/en/model-config), [An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem), [Ultrathink & Thinking Modes — claude-code-handbook](https://github.com/ThamJiaHe/claude-code-handbook/blob/main/docs/ultrathink-thinking-modes.md), [Reasoning Effort Tuning — Daniel Vaughan](https://codex.danielvaughan.com/2026/03/27/reasoning-effort-tuning/)

### 3. Planning Mode: The Organising Discipline
- The failure pattern: agents that act too early. Jump into implementation without understanding the problem. Fix the wrong file. Migrate a system they haven't read.
- Planning mode creates a deliberate phase boundary: inspect → propose → wait. The agent designs before it executes.
- The official four-phase workflow from Claude Code best practices: Explore → Plan → Implement → Verify. Plan mode enforces the boundary between phases 2 and 3.
- Why this has become José's default working practice: it surfaces assumptions, catches misunderstandings early, and makes the agent's reasoning visible before any files change.
- Sources: [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices), [Commands — Claude Code Docs](https://code.claude.com/docs/en/commands)

### 4. Planning Mode as the Umbrella
- The deeper insight: planning mode doesn't just affect behaviour, it changes which model and effort level make sense.
- Introduce `opusplan`: the hybrid alias that routes plan-phase work to Opus (better reasoning) and execution to Sonnet (faster, cheaper). This is the product expression of the idea that designing and building deserve different resources.
- Brief mention of `/ultraplan` (research preview): offloads the planning to a Claude Code web session, freeing the terminal and enabling richer review in the browser.
- Key takeaway: when in doubt, plan mode first. It costs a bit more upfront; it saves a lot of rework.
- Sources: [Claude Code Model Configuration](https://code.claude.com/docs/en/model-config), [Plan in the cloud with ultraplan](https://code.claude.com/docs/en/ultraplan), [What's New — Claude Code Docs](https://code.claude.com/docs/en/whats-new)

### 5. Goal Mode: The Completion Contract
- Introduce the contrast: a normal prompt lifecycle ends when Claude responds. Goal mode keeps Claude working until a verifiable condition holds.
- The evaluator mechanism: after each turn, a small fast model checks whether the condition is met. If not, Claude starts another turn instead of handing back.
- The three-way comparison from official docs: `/goal` (condition-driven), `/loop` (time-driven), Stop hook (script-driven). Each solves a different version of "keep going".
- Good use cases: making a test suite pass, reducing benchmark latency, migrating call sites, working through a labelled issue backlog.
- Sources: [Keep Claude working toward a goal — Claude Code Docs](https://code.claude.com/docs/en/goal), [Claude Code 2.1.139 adds /goal command — ExplainX.ai](https://explainx.ai/blog/claude-code-goal-command-long-running-agents-2026), [What's New — Claude Code Docs](https://code.claude.com/docs/en/whats-new)

### 6. Writing a Goal That Actually Has a Finish Line
- The most common failure mode: goals that have no measurable end state. "Improve code quality" is not a goal. "Make tests/checkout pass, verified by running pytest" is.
- The five ingredients a strong goal needs: outcome, verification surface, constraints, boundaries, stop condition.
- Weak vs strong examples side by side.
- The goal template from the OpenAI Codex cookbook applies directly here: `<desired end state> verified by <specific evidence> while preserving <constraints>` — it's a cross-tool pattern, not Codex-specific.
- Sources: [Using Goals in Codex — OpenAI Cookbook](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex), [Codex Goal Mode & Remote Computer Use — ofox.ai](https://ofox.ai/blog/codex-goal-mode-remote-computer-use-2026/), [Keep Claude working toward a goal — Claude Code Docs](https://code.claude.com/docs/en/goal)

### 7. Does Codex Do the Same?
- Brief section: yes. OpenAI Codex has `model_reasoning_effort` (minimal → xhigh), `/plan`, and `/goal` as first-class CLI features.
- Goal mode became generally available in Codex on May 21, 2026 (CLI 0.133.0). Claude Code's `/goal` shipped May 12, 2026 (v2.1.139). Both tools arrived at the same three-layer control model within days of each other.
- The point is not "who got there first". The point is that reasoning effort + plan mode + goal mode are converging as the standard control surface for agentic coding tools — regardless of which tool you use.
- Sources: [Slash commands in Codex CLI](https://developers.openai.com/codex/cli/slash-commands), [Configuration Reference — Codex](https://developers.openai.com/codex/config-reference), [Changelog — Codex](https://developers.openai.com/codex/changelog), [OpenAI Codex /goal — Kingy AI](https://kingy.ai/ai/openai-codex-goal-the-new-long-horizon-mode-for-agentic-coding/)

### 8. When Not to Use These Modes
- Trust-building section. Not every task needs high effort. Not every task needs plan mode. Not every task needs a goal.
- When to skip high effort: trivial inspection, single-file fixes with obvious solutions, any task you can verify in two seconds.
- When to skip plan mode: the change is one line and the path is clear; you're asking for an explanation, not an implementation.
- When to skip goal mode: the finish line is vague; there's no verification surface; the task could cause broad unintended changes without a human checkpoint.
- Sources: synthesis — no external source required; model knowledge only

### 9. Four Practical Patterns
- Pattern 1: Low effort + inspect. Read-only exploration, fast and cheap.
- Pattern 2: High effort + plan mode. Architecture decisions, migrations, security-sensitive work. Design before a single file changes.
- Pattern 3: Plan → review → goal. The safest pattern for substantial work: get the plan right, then let Claude run it to completion.
- Pattern 4: Goal with strict boundaries. `/goal` with explicit scope constraints (only touch these directories, don't change public API, stop if you need credentials).
- Each pattern gets 2-3 sentences: what it's for and a one-line prompt example.
- Sources: [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices), [Using Goals in Codex — OpenAI Cookbook](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)

### Closing section
- Heading: `## Closing Thoughts`
- Tie back to the series arc: memory defines durable context, rules define scoped behaviour, skills define reusable workflows, hooks define deterministic checks, agents define isolated execution. These three controls — thinking levels, planning mode, goal mode — define when the agent should reason carefully, when it should wait, and when it should keep going.
- The shift from prompt engineering to workflow engineering. Not better magic words. Better control.
- Sources: synthesis — no external source

### Now, I want to hear from you
- Named `##` section
- 3 targeted questions tied to the post's argument
- Sources: n/a (structural)

---

## ToC Suggestions

- Sections 8 and 9 are structurally similar (both "how to apply"). Consider keeping section 8 short (one tight paragraph each, not bullet lists) so it doesn't feel like a second "patterns" section.
- Section 4 (Planning Mode as the Umbrella) touches `opusplan` and `ultraplan` but neither is the main point. Keep both mentions brief — one paragraph each — so the section stays focused on the organising-concept insight.
