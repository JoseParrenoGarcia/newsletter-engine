# Notes

---

## Brainstorm Summary

A standalone Claude Code explainer driven by a personal discovery. José noticed reasoning effort level selectors in Claude Code but had no real intuition for what they did — whether "high" effort was genuinely different from "medium", and whether the token cost was worth it. That curiosity triggered research, which opened into a broader realisation: thinking levels, planning mode, and goal mode are three distinct control surfaces that solve different problems. Conflating them — or treating them as interchangeable magic words — is the source of most vague agent prompting.

The organising insight is that planning mode is the meta-discipline, not just one feature among many. Once you understand planning mode, thinking levels and model selection (Opus vs Sonnet, heavier vs lighter) become knobs you tune within it. The question shifts from "which setting should I pick?" to "am I in design mode or execution mode right now?" Planning has become José's default working practice, and the post makes the case for why that should be the reader's default too.

Goal mode is then the natural extension: what if planning mode kept working toward an outcome without the user having to prompt "continue" repeatedly? The key insight — borrowed directly from the official docs — is that a goal is not background autonomy. It is a scoped completion contract: what should be true when the work is done, how to verify it, what constraints must hold, and when to stop and ask for help.

The Codex comparison is present but deliberately light. A brief section shows that reasoning effort controls, plan mode, and goal mode are emerging as industry-wide primitives — OpenAI Codex has the same three-layer control model under different names. This reinforces the post's main point without turning it into a product comparison.

The research memo attached to this post contains comprehensive source material, safe claims, cautious claims, and a detailed source pack. It should be the primary input for the research stage.

## Rough Table of Contents

- **The question that started this** — José's curiosity about token cost and effort level selectors; the realisation that clicking "medium" or "high" was almost random; the decision to actually read the docs.
- **Thinking levels: budgeted deliberation, not intelligence** — what effort levels actually control; the cost/quality/speed trade-off; concrete examples of low-effort vs high-effort tasks; why higher effort is not a guarantee of correctness.
- **Planning mode: the organising discipline** — why agents fail by acting too early; what plan mode does (inspect → propose → wait); why it should be your default working posture.
- **Planning mode as the umbrella** — how model selection (Opus vs Sonnet), effort levels, and execution mode all live under the planning decision; opusplan as the product expression of this idea; ultraplan as the newest addition (brief).
- **Goal mode: the completion contract** — what goal mode is and why it exists; /goal vs /loop vs Stop hooks (the three-way comparison); the evaluator mechanism in Claude Code.
- **Writing a goal that actually has a finish line** — the six ingredients (outcome, verification surface, constraints, boundaries, iteration policy, stop condition); weak vs strong examples.
- **Does Codex do the same?** — brief comparison of reasoning effort / /plan / /goal in OpenAI Codex; the point is that these primitives are industry-wide, not Claude-specific.
- **When NOT to use these modes** — trust-building section; don't use high effort for trivial tasks; don't use goal mode without a verifiable finish line; don't use plan mode when the change is a single obvious line.
- **Four practical patterns** — low-effort inspect; high-effort plan; plan → review → goal; goal with strict boundaries.
- **Closing: agentic coding is workflow design** — ties back to the series arc (memory, rules, skills, hooks, agents); the shift from "better prompts" to "better control over when the model should think, wait, and keep going".

## Research memo

The full research memo is inlined below. It was produced before brainstorm and contains:
- Executive summary and mental model
- Trust tiers for sources
- Deep dives on Codex and Claude Code features
- Safe claims and cautious claims
- Suggested blog ToC (superseded by the ToC above)
- Source URLs (all unvalidated — validation is a research stage task)

---

# Research memo: Claude Code and Codex thinking levels, planning mode, and goal mode

Last updated: 2026-06-01

## 1) Executive summary

The short version is that both OpenAI Codex and Anthropic Claude Code are moving away from "single prompt, single answer" coding assistants and toward more explicit control surfaces for agentic work.

The three concepts that matter most are:

1. **Thinking / reasoning effort**
2. **Planning mode**
3. **Goal mode**

They sound related, and they are, but they solve different problems.

**Thinking or reasoning effort** controls how much reasoning budget the model should spend. In practical terms, this is the "how hard should the model think?" knob. It trades speed and cost against depth and reliability.

**Planning mode** separates design from execution. It is the "do not code yet; first understand the problem, inspect the repository, and propose a plan" mode.

**Goal mode** gives the agent a persistent completion condition. It is the "keep working until this condition is true, or until you are blocked" mode.

A useful mental model:

```text
Thinking level  = how deeply to reason
Planning mode   = think before editing
Goal mode       = keep going until done
```

The biggest finding is that **OpenAI and Anthropic now expose remarkably similar primitives**, but their product language and defaults differ.

OpenAI Codex uses terms such as `model_reasoning_effort`, `/plan`, and `/goal`. Codex's official docs define Goals as persistent objectives that keep a thread working toward a defined outcome across turns. A Goal gives Codex a completion condition: what should be true, how success should be checked, and what constraints must stay intact. Codex also explicitly positions Goal mode as useful when a task has a clear finish line but an uncertain path.

Anthropic Claude Code uses `/effort`, plan mode, `opusplan`, `ultraplan`, and `/goal`. Claude Code's `/goal` command sets a completion condition, then Claude keeps working across turns until a model evaluator confirms the condition holds. Claude Code also has an explicit hybrid model setting called `opusplan`, where Opus is used for planning and Sonnet for execution.

The conceptual overlap is strong. The implementation details differ.

For the newsletter, the best editorial angle is not "Claude vs Codex, who wins?". That would age badly and invite fan-club nonsense, which is rarely where wisdom lives.

A better angle is:

> Modern coding agents now need separate controls for reasoning depth, planning discipline, and completion persistence.

That gives readers a durable mental model they can apply to Claude Code, Codex, Cursor, Windsurf, Devin-style tools, and whatever arrives next Tuesday morning with a logo and a heroic launch video.

---

## 2) Trust model for the research

### Tier 1: official product documentation

For OpenAI Codex:
- OpenAI Codex CLI features
- OpenAI Codex CLI slash commands
- OpenAI Codex configuration reference
- OpenAI Codex app commands
- OpenAI Codex Goal mode cookbook
- OpenAI Codex changelog
- OpenAI Codex models page

For Anthropic Claude Code:
- Claude Code model configuration
- Claude Code goal mode documentation
- Claude Code commands reference
- Claude Code changelog
- Claude Code "what's new"
- Claude Code ultraplan documentation
- Claude Code best practices
- Anthropic engineering posts on effort levels and Claude Code quality

### Tier 2: official-adjacent / primary repositories
- OpenAI Codex GitHub releases
- Anthropic Claude Code changelog on GitHub

### Tier 3: practitioner blogs, newsletters, community write-ups
- Ofox article on Codex Goal Mode and remote computer use
- Kingy.ai article on Codex `/goal`
- Authority AI Tools article on Codex May 2026 updates
- Daniel Vaughan article on Codex reasoning effort tuning
- ExplainX article on Claude Code `/goal`
- LevelUp / GitConnected article on Claude Code ultrathink, tab, and plan mode
- Claude Code handbook page on thinking modes

---

## 3) The bottom-up mental model

### 3.1 Reasoning effort

Reasoning effort is the compute-depth control. When you increase reasoning effort, you are not changing the task. You are changing the amount of reasoning the model is allowed or encouraged to spend on the task.

Key trade-off:
```text
Lower effort  -> faster, cheaper, less careful
Higher effort -> slower, more expensive, more careful
```

> Reasoning effort is not intelligence. It is budgeted deliberation.

### 3.2 Planning mode

Planning mode exists because many coding mistakes happen before coding starts. Planning mode pushes the agent into a different posture:

```text
inspect -> reason -> propose -> wait
```

Planning mode should be used when you want the model to understand the problem before implementation begins.

### 3.3 Goal mode

A normal prompt lifecycle:
```text
ask -> work -> result -> wait
```

A goal lifecycle:
```text
work -> check -> continue or complete
```

A goal is not simply a longer prompt. It is a completion contract.

A good goal says:
- what should be true when the work is done
- how success should be verified
- what constraints must not be violated
- what boundaries the agent should respect
- when the agent should stop and report a blocker

---

## 4) OpenAI Codex: official doc findings

### Reasoning levels

```toml
model_reasoning_effort = "minimal | low | medium | high | xhigh"
model_reasoning_summary = "auto | concise | detailed | none"
hide_agent_reasoning = true | false
show_raw_agent_reasoning = true | false
plan_mode_reasoning_effort = "none | minimal | low | medium | high | xhigh"
```

### Plan mode

`/plan` or `/plan <prompt>` — switches to plan mode; temporarily unavailable while a task is running.

### Goal mode

`/goal <objective>` — persistent objectives that keep a thread working toward a defined outcome across turns.

Lifecycle: `/goal`, `/goal pause`, `/goal resume`, `/goal clear`

Strong goal pattern from official cookbook:
```text
/goal <desired end state> verified by <specific evidence> while preserving <constraints>. 
Use <allowed inputs, tools, or boundaries>. Between iterations, <iteration policy>. 
If blocked or no valid paths remain, <stop condition>.
```

Goal mode became generally available across app, IDE, and CLI on 2026-05-21. Codex CLI 0.133.0: Goals enabled by default, backed by dedicated storage.

---

## 5) Anthropic Claude Code: official doc findings

### Effort levels

```text
Opus 4.8 and Opus 4.7: low, medium, high, xhigh, max
Opus 4.6 and Sonnet 4.6: low, medium, high, max
```

Defaults: Opus 4.8 → high | Opus 4.7 → xhigh | Opus 4.6 → high | Sonnet 4.6 → high

Effort levels control adaptive reasoning — the model decides whether and how much to think on each step based on task complexity. These correspond to points along the test-time-compute curve.

### opusplan

Hybrid model alias: Opus for planning (complex reasoning and architecture decisions), Sonnet for execution (code generation and implementation). Switches automatically between modes.

### ultraplan (research preview)

Hands planning to a Claude Code web session. Claude drafts the plan in the cloud; the terminal stays free. User can review, comment, revise, then choose where to execute. Launched via `/ultraplan <prompt>`, or by including "ultraplan" in a prompt, or from a local plan approval dialog.

### Goal mode

`/goal` requires Claude Code v2.1.139 or later.

After each turn, a small fast model checks whether the condition holds. If not, Claude starts another turn instead of returning control to the user. Goal clears automatically once condition is met.

Three-way comparison from official docs:
```text
/goal:   next turn starts when previous turn finishes; stops when model confirms condition met
/loop:   next turn starts when time interval elapses; stops when you stop it
Stop hook: next turn starts when previous turn finishes; stops when your script decides
```

Also from official docs:
```text
auto mode removes per-tool prompts
/goal removes per-turn prompts
```

---

## 6) Safe claims for the newsletter

1. Modern coding agents increasingly expose separate controls for reasoning depth, planning, and long-running completion.
2. Thinking levels and planning mode are not the same thing.
3. Goal mode is best understood as a persistent completion contract, not as unlimited autonomy.
4. The strongest goals include a verification surface (tests, benchmarks, build commands).
5. For complex coding work, a strong pattern is plan first, then execute under a goal.
6. Do not use high reasoning effort for everything — it is a trade-off, not a guarantee.

## 7) Claims to treat cautiously

1. "Goal mode can work for days" — technically true per Codex changelog, but needs caveats about budgets and boundaries.
2. "Claude Code and Codex goal modes are equivalent" — similar mental model, different implementation details.
3. "Ultrathink is still the main way to control Claude reasoning" — frame as older/community terminology.
4. "Higher effort always means better output" — it is a trade-off, not a guarantee.

---

## 8) Source URLs (all unvalidated — verify during research stage)

[1] OpenAI Codex Goal Mode Cookbook — https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex
[2] OpenAI Codex CLI Slash Commands — https://developers.openai.com/codex/cli/slash-commands
[3] OpenAI Codex Configuration Reference — https://developers.openai.com/codex/config-reference
[4] OpenAI Codex Changelog — https://developers.openai.com/codex/changelog
[5] OpenAI Codex App Commands — https://developers.openai.com/codex/app/commands
[6] OpenAI Codex CLI Features — https://developers.openai.com/codex/cli/features
[7] Claude Code Model Configuration — https://code.claude.com/docs/en/model-config
[8] Claude Code Goal Mode — https://code.claude.com/docs/en/goal
[9] Claude Code Ultraplan — https://code.claude.com/docs/en/ultraplan
[10] Claude Code Commands — https://code.claude.com/docs/en/commands
[11] Claude Code Changelog — https://code.claude.com/docs/en/changelog
[12] Claude Code What's New — https://code.claude.com/docs/en/whats-new
[13] Claude Code Best Practices — https://code.claude.com/docs/en/best-practices
[14] Anthropic Engineering: Claude Code quality post — https://www.anthropic.com/engineering/april-23-postmortem
[15] OpenAI Codex GitHub Releases — https://github.com/openai/codex/releases
[16] Anthropic Claude Code GitHub Changelog — https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
[17] Daniel Vaughan: Reasoning Effort Tuning — https://codex.danielvaughan.com/2026/03/27/reasoning-effort-tuning/
[18] Ofox: Codex Goal Mode & Remote Computer Use — https://ofox.ai/blog/codex-goal-mode-remote-computer-use-2026/
[19] Kingy.ai: OpenAI Codex /goal — https://kingy.ai/ai/openai-codex-goal-the-new-long-horizon-mode-for-agentic-coding/
[20] ExplainX: Claude Code /goal command — https://explainx.ai/blog/claude-code-goal-command-long-running-agents-2026
[21] LevelUp/GitConnected: What still works in Claude Code — https://levelup.gitconnected.com/what-still-works-in-claude-code-nov-2025-ultrathink-tab-and-plan-mode-2ade26f7f45c
[22] Claude Code Handbook: Ultrathink and thinking modes — https://github.com/ThamJiaHe/claude-code-handbook/blob/main/docs/ultrathink-thinking-modes.md
