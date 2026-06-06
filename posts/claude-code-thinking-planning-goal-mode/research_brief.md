# Research Brief: Claude Code: thinking levels, planning mode, and goal mode explained

**Generated:** 2026-06-01

## Summary

22 URLs were present in notes.md (all flagged as unvalidated). All 22 survived validation — every URL resolved to live, relevant content. 0 were dropped. No additional search was needed because the existing sources provide full coverage across every ToC section. The Anthropic engineering post (URL 14) directly answers the open research question about why effort defaults changed, and the official docs confirm all key version numbers and config keys cited in the research memo. No sections remain uncovered.

## Sources

### The question that started this (personal hook)

- **[An update on recent Claude Code quality reports — Anthropic Engineering](https://www.anthropic.com/engineering/april-23-postmortem)**
  Anthropic's postmortem on the March–April 2026 quality regression. Directly explains that effort levels sit along the test-time-compute curve and that the product layer chooses which point to expose as the default — the clearest official statement of what effort levels actually are and why they matter. Confirms the default was briefly dropped from `high` to `medium` and then reverted.

### Thinking levels: budgeted deliberation, not intelligence

- **[Claude Code Model Configuration — Claude Code Docs](https://code.claude.com/docs/en/model-config)**
  Authoritative reference for effort level values per model: Opus 4.8/4.7 support `low / medium / high / xhigh / max`; Opus 4.6 / Sonnet 4.6 support `low / medium / high / max`. Defaults: Opus 4.8 → `high`, Opus 4.7 → `xhigh`. Confirms `opusplan` is a live official model alias. Confirms Opus 4.8 requires Claude Code v2.1.154+.

- **[Ultrathink & Thinking Modes — Complete Guide (claude-code-handbook)](https://github.com/ThamJiaHe/claude-code-handbook/blob/main/docs/ultrathink-thinking-modes.md)**
  Practitioner guide covering adaptive thinking, effort levels, the `/effort` command (available since v2.1.76), and the `ultrathink` keyword as community shorthand. Explains adaptive thinking as the underlying mechanism: the model evaluates each request and decides whether and how much to think. Last updated March 2026.

- **[Reasoning Effort Tuning: Minimal to xhigh — Codex Knowledge Base (Daniel Vaughan)](https://codex.danielvaughan.com/2026/03/27/reasoning-effort-tuning/)**
  In-depth practitioner explainer on Codex's `model_reasoning_effort` config key, with a five-level table (minimal → xhigh) showing token cost, speed, and best-use guidance. Confirms `plan_mode_reasoning_effort` is a valid, live Codex config key that overrides effort for `/plan` sessions. March 2026.

### Planning mode: the organising discipline

- **[Best practices for Claude Code — Claude Code Docs](https://code.claude.com/docs/en/best-practices)**
  Official best practices guide with the four-phase workflow (Explore → Plan → Implement → Verify). Directly advocates for plan mode as the separation between exploration and execution, with concrete CLI examples. Uses the `Ctrl+G` shortcut to open the plan in an editor before execution.

- **[Commands — Claude Code Docs](https://code.claude.com/docs/en/commands)**
  Full command reference. Confirms `/plan` switches into plan mode; `/effort` adjusts reasoning level mid-session; `/model` switches model alias. Explains how these compose during a typical workflow.

- **[What Still Works in Claude Code (Nov 2025): Ultrathink, Tab, and Plan Mode — Level Up Coding](https://levelup.gitconnected.com/what-still-works-in-claude-code-nov-2025-ultrathink-tab-and-plan-mode-2ade26f7f45c)**
  Practitioner-written article confirming plan mode behaviour, the `ultrathink` keyword as community shorthand for maximum reasoning, and `Tab` completion in plan mode. Paywalled on Medium but preview is sufficient; confirms these features were live and stable as of November 2025.

### Planning mode as the umbrella (opusplan and ultraplan)

- **[Plan in the cloud with ultraplan — Claude Code Docs](https://code.claude.com/docs/en/ultraplan)**
  Official ultraplan documentation. Confirms ultraplan is in research preview, requires v2.1.91+. Describes the cloud-based planning flow: local CLI hands task to a Claude Code web session in plan mode; user reviews and comments in the browser; plan can be executed on the web or teleported back to the terminal. Not available on Bedrock/Vertex/Foundry.

- **[What's New — Claude Code Docs](https://code.claude.com/docs/en/whats-new)**
  Weekly digest of recent releases. Confirms Opus 4.8 shipped in Week 22 (v2.1.150–157) as new default for Max/Team Premium/Enterprise/API accounts; `/goal` shipped in Week 20 (v2.1.139–142); fast mode and auto mode milestones. Useful for dating features precisely.

- **[Changelog — Claude Code Docs](https://code.claude.com/docs/en/changelog)**
  Full version-by-version changelog mirrored from GitHub. Confirms version dates for `/goal` (v2.1.139, May 12 2026), ultraplan (v2.1.91), Opus 4.8 support (v2.1.154). Good for verifying exact version requirements cited in the post.

- **[Anthropic Claude Code GitHub CHANGELOG.md (raw)](https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md)**
  Raw source for the changelog above. Same content, useful as a canonical Tier 2 reference confirming no discrepancy between the docs-site and the GitHub source.

### Goal mode: the completion contract

- **[Keep Claude working toward a goal — Claude Code Docs](https://code.claude.com/docs/en/goal)**
  Authoritative reference for goal mode. Confirms `/goal` requires v2.1.139+. Explains the three-way comparison table (`/goal` vs `/loop` vs Stop hook). Describes the evaluator mechanism (a small fast model checks the condition after each turn). Covers writing effective conditions: measurable end state, stated check, constraints. Condition limit: 4,000 characters. Turn/time clauses supported.

- **[Claude Code 2.1.139 adds /goal command — ExplainX.ai](https://explainx.ai/blog/claude-code-goal-command-long-running-agents-2026)**
  Launch-day write-up with concrete workflow comparisons (manual iteration vs. `/goal`), availability matrix (interactive mode, `-p` flag, Remote Control), and resource tracking (elapsed time, turns, tokens). Confirms `/goal` shipped May 12, 2026.

### Writing a goal that actually has a finish line

- **[Using Goals in Codex — OpenAI Cookbook](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)**
  OpenAI's official cookbook for goal mode in Codex. Provides the canonical three-slot goal template: `<desired end state> verified by <specific evidence> while preserving <constraints>`. Includes concrete strong vs. weak goal examples. Directly applicable as a cross-tool pattern for the "writing a goal" section.

- **[Codex Goal Mode & Remote Computer Use — ofox.ai](https://ofox.ai/blog/codex-goal-mode-remote-computer-use-2026/)**
  Deep practitioner analysis of Codex goal mode GA (May 21, 2026). Reinforces the three-slot goal template with strong and weak examples, explains the stopping conditions, and covers the goal lifecycle (`/goal pause`, `/goal resume`, `/goal clear`). Good supporting source for the goal-writing section.

### Does Codex do the same?

- **[Slash commands in Codex CLI — OpenAI Developers](https://developers.openai.com/codex/cli/slash-commands)**
  Official Codex CLI slash command reference. Confirms `/plan` and `/goal` are live Codex CLI commands; documents their behaviour alongside other session commands. Shows the same conceptual primitives — plan mode and goal mode — exist in Codex.

- **[Configuration Reference — Codex | OpenAI Developers](https://developers.openai.com/codex/config-reference)**
  Authoritative Codex config reference. Confirms `model_reasoning_effort` (`minimal | low | medium | high | xhigh`) and `plan_mode_reasoning_effort` are valid, current config keys. Covers full config schema — confirms these are official, not community-invented.

- **[Features — Codex CLI | OpenAI Developers](https://developers.openai.com/codex/cli/features)**
  Official feature overview for the Codex CLI. Confirms plan mode and goal mode as named, documented features. Useful for the brief Codex comparison section.

- **[Commands — Codex app | OpenAI Developers](https://developers.openai.com/codex/app/commands)**
  Codex app slash command reference. Confirms `/plan`, `/goal`, and `/review` are available in the Codex app. Notes that `/goal` requires `features.goals = true` in `config.toml` if it doesn't appear. Gives the `use /plan first, then /goal` recommended workflow.

- **[OpenAI Codex /goal: The New Long-Horizon Mode — Kingy AI](https://kingy.ai/ai/openai-codex-goal-the-new-long-horizon-mode-for-agentic-coding/)**
  Practitioner explainer on Codex `/goal`, confirming the same goal-mode pattern (persistent objective, multi-turn autonomy) exists in Codex alongside Claude Code's implementation. Useful light cameo source for the Codex comparison section.

- **[Changelog — Codex | OpenAI Developers](https://developers.openai.com/codex/changelog)**
  Full Codex version changelog. Confirms goal mode GA (May 21, 2026, CLI 0.133.0). Good for dating features in the Codex comparison section.

- **[Releases — openai/codex GitHub](https://github.com/openai/codex/releases)**
  GitHub release notes for the open-source Codex CLI. Latest stable release is 0.135.0 (May 28 2026). Confirms the CLI is actively maintained; useful Tier 2 source for version corroboration.

## Research Gaps

None. All ten ToC sections have at least one source.
