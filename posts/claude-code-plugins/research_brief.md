# Research Brief: Claude Code Plugins: How to Build, Version, and Maintain Them

**Generated:** 2026-06-08

## Summary

No URLs were present in `notes.md`. The original brief was grounded in official Anthropic
documentation, which still covers the core mechanics (`plugin.json` schema, versioning semantics,
validation, marketplace structure). A second research pass found enough third-party signal to expand
the brief: real public plugin repos and marketplaces, one substantial practitioner write-up, and a
small but meaningful set of community-reported failure modes. Thin SEO pages that only restated the
docs were discarded.

---

## Sources

### 1. Introduction — Why plugins exist (the "copy folders and trust me" problem)

- **[Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)**
  The official Anthropic guide explaining why plugins exist: they let you share skills, agents, hooks,
  and MCP servers across projects and teams instead of copying `.claude/` folders manually. Covers
  the standalone-vs-plugin decision table and the "iterate as standalone, then package" mental model.

### 2. What plugins actually are — Primitives vs packaging; plugin.json; six component families

- **[Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)**
  Complete technical reference for the plugin system. Documents all six component families (skills,
  agents, hooks, MCP servers, LSP servers, monitors), the full `plugin.json` manifest schema with
  every optional field (`name`, `displayName`, `version`, `description`, `author`, `keywords`,
  `repository`, `license`, `dependencies`, `options`, experimental fields), and how unrecognised
  fields are handled. Directly answers the "complete manifest schema" research question.

### 3. Building your first plugin — Directory structure, manifest, testing locally with `--plugin-dir`

- **[Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)**
  Step-by-step quickstart: creating the plugin directory, writing `plugin.json`, adding a skill,
  and using `--plugin-dir` to test locally without installing. Includes the `claude plugin create`
  scaffold command with `--with` flags for each component type.

- **[Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)**
  Reference for the complete directory layout, file locations for each component type, environment
  variables (`CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`), and the CLI commands used during
  development (`claude plugin validate`, `claude plugin create`, `/plugin inspect`).

### 4. Distribution — Marketplace mechanics; scopes; namespacing

- **[Create and distribute a plugin marketplace - Claude Code Docs](https://code.claude.com/docs/en/plugin-marketplaces)**
  Full walkthrough for creating a `marketplace.json`, hosting on GitHub/git, and distributing to
  users. Documents all five plugin source types (relative path, `github`, `url`, `git-subdir`, `npm`),
  installation scopes (user, project, local, managed), and how managed settings enable enterprise
  rollout. Covers the two official Anthropic marketplaces: `claude-plugins-official` (curated,
  auto-available) and `claude-community` (third-party submissions).

- **[anthropics/claude-plugins-official — GitHub](https://github.com/anthropics/claude-plugins-official)**
  The official Anthropic plugin directory (29.5k stars, 3.2k forks). Shows real marketplace
  structure, the `skill-bundle` pattern for repos without a `plugin.json`, submission workflow via
  the plugin directory submission form, and the distinction between internal (Anthropic-maintained)
  and external (third-party) plugin entries. Directly answers the "community examples" research
  question.

### 5. Versioning — Semantic versioning; pinning vs auto-update; version policy decisions

- **[Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)**
  The version management section documents two strategies: explicit semver (bump `version` in
  `plugin.json` to trigger updates — pushing commits alone is not enough) vs commit-SHA versioning
  (omit `version`; users get every commit). Recommends MAJOR.MINOR.PATCH with CHANGELOG.md.
  Directly answers the "how does semver map to update behaviour" research question.

- **[Constrain plugin dependency versions - Claude Code Docs](https://code.claude.com/docs/en/plugin-dependencies)**
  Explains the `dependencies` array in `plugin.json`, the `{plugin-name}--v{version}` git-tag
  convention for semver ranges, and how Claude Code resolves and auto-reinstalls missing
  dependencies via `/reload-plugins` and background auto-update. Covers the team scenario where
  a downstream plugin pins `~2.1.0` to survive upstream breaking changes.

### 6. Validation before release — What to test; CI approaches; `/plugin` inspection

- **[Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)**
  Documents `claude plugin validate ./my-plugin` and `claude plugin validate ./my-plugin --strict`.
  `--strict` promotes unrecognised-field warnings to errors, making it suitable for CI. The tool
  catches type mismatches (load errors) and likely-typo field names (warnings). Directly answers
  the "CI tooling for plugin validation" research question.

- **[Create and distribute a plugin marketplace - Claude Code Docs](https://code.claude.com/docs/en/plugin-marketplaces)**
  Covers marketplace-level validation (`claude plugin validate .` or `/plugin validate .`), the
  local test workflow (`/plugin marketplace add ./path` → `/plugin install test-plugin@marketplace-name`),
  and using `--plugin-dir` as an alternative pre-install test path. Provides the full testing
  sequence before publishing.

### 7. Pushing updates to users — Auto-update propagation; controlled rollout; `/reload-plugins`

- **[Constrain plugin dependency versions - Claude Code Docs](https://code.claude.com/docs/en/plugin-dependencies)**
  Describes background plugin auto-update behaviour: Claude Code reinstalls missing dependencies
  and picks up new explicit versions on `/reload-plugins`. Covers the enterprise pattern of
  assigning different marketplace channels (stable vs early-access) via managed settings to
  control who receives updates and when.

- **[Create and distribute a plugin marketplace - Claude Code Docs](https://code.claude.com/docs/en/plugin-marketplaces)**
  Documents `claude plugin marketplace update` for users to refresh their marketplace catalog,
  `--scope` for targeting a specific settings layer, and how removing the last-scope declaration
  auto-uninstalls dependent plugins. The managed-settings controlled-rollout pattern (two
  marketplace repos, two user groups) is shown with full JSON examples.

### 8. Conclusion — When plugins are worth the overhead vs staying with standalone config

- **[Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)**
  The standalone-vs-plugin comparison table and decision heuristics provide the direct framing for
  the conclusion: plugins are the right choice when sharing, versioning, or cross-project reuse is
  needed; standalone `.claude/` config is right for personal or single-project use.

---

## Third-Party Sources With Genuine Signal

### 1. Real published plugins and marketplaces

- **[Postman Plugin for Claude Code — GitHub](https://github.com/Postman-Devrel/postman-claude-code-plugin)**
  A real plugin repo with `.claude-plugin/plugin.json`, `.mcp.json`, `commands/`, `skills/`, and
  `agents/` in one package. Adds something the Anthropic docs do not: a concrete example of a
  multi-component production plugin that auto-configures an MCP server and exposes a real command
  surface.

- **[wshobson/agents — GitHub](https://github.com/wshobson/agents)**
  A large community marketplace advertising 84 Claude Code plugins, 192 agents, 156 skills, and
  parallel generation for Codex CLI, Cursor, OpenCode, Gemini CLI, and Copilot. Adds ecosystem
  signal the docs do not cover: plugin publishing is already being used as a cross-harness
  packaging layer, not just a Claude-only distribution mechanism.

- **[feed-mob/claude-code-marketplace — GitHub](https://github.com/feed-mob/claude-code-marketplace)**
  A team-run marketplace with agents, skills, commands, and install instructions via GitHub or
  HTTPS URLs. Adds practical examples of how companies are structuring internal/public marketplaces
  around concrete workflows rather than just shipping single plugins.

- **[docker/claude-plugins — GitHub](https://github.com/docker/claude-plugins)**
  Docker's focused marketplace repo showing a root `.claude-plugin/marketplace.json` and a plugin
  with `.claude-plugin/plugin.json` plus `.mcp.json`. Adds a credible example of a vendor-specific,
  narrow marketplace strategy.

- **[danielrosehill/Claude-Code-Plugins — GitHub](https://github.com/danielrosehill/Claude-Code-Plugins)**
  A very large personal marketplace organized by role and workflow, with install recipes for
  full-stack, AI/ML, sysadmin, creator, and personal-productivity bundles. Adds community pattern
  signal the docs do not cover: users are curating plugin sets as opinionated workflow stacks, not
  just one-off tools.

- **[Piebald-AI/claude-code-lsps — GitHub](https://github.com/Piebald-AI/claude-code-lsps)**
  A dedicated marketplace for LSP plugins across many languages, with contributor workflows and
  runtime setup instructions. Adds practical friction the docs do not surface clearly: some plugin
  categories require external binaries, runtime validation, and additional setup beyond install.

- **[duyet/codex-claude-plugins — GitHub](https://github.com/duyet/codex-claude-plugins)**
  A shared Claude/Codex plugin collection that keeps `.claude-plugin/plugin.json` alongside
  `.codex-plugin/plugin.json` and a Codex marketplace file. Adds evidence that plugin authors are
  already co-packaging across agent environments.

### 2. Practitioner write-ups and hands-on implementation notes

- **[Announcing the Postman Plugin for Claude Code — Postman Blog](https://blog.postman.com/announcing-the-postman-plugin-for-claude-code/)**
  A detailed first-party vendor write-up of why they built a Claude Code plugin, how it works under
  the hood, and the concrete user workflows it enables. Adds practical usage scenarios and packaging
  rationale beyond the Anthropic docs' generic examples.

- **[Plugins Claude Code : Transformer Votre Workflow en 2025 — CC France](https://cc-france.org/blog/plugins-claude-code-transformer-votre-workflow-en-)**
  A practitioner article from the author of WD Framework describing real production use, install
  flow, and claimed gains on a newsletter feature and code review workflow. Adds firsthand adoption
  and workflow framing the official docs do not provide.

- **[engram/docs/PLUGINS.md — GitHub](https://github.com/Gentleman-Programming/engram/blob/main/docs/PLUGINS.md)**
  Implementation notes for a real plugin, including a PowerShell fallback hook for locked-down
  Windows environments. Adds operational detail the docs largely skip: cross-platform enterprise
  constraints and fallback patterns for hook execution.

### 3. Community discussion and failure modes

- **[Made a simple plugin that feeds Claude Code its own documentation — Reddit](https://www.reddit.com/r/ClaudeCode/comments/1qhlrc9/made_a_simple_plugin_that_feeds_claude_code_its/)**
  A plugin author explaining a documentation plugin's install path and why the skill does not flood
  every session with all docs content. Adds a concrete "why build this" example and a practical
  answer to context-pollution concerns.

- **[[Bug] Adding fields to plugin.json silently breaks skills and commands — Reddit](https://www.reddit.com/r/ClaudeCode/comments/1qkygri/bug_adding_fields_to_pluginjson_silently_breaks/)**
  A community bug report documenting a manifest failure mode: unrecognized fields in `plugin.json`
  causing plugin skills and commands to stop working silently. Adds real-world validator/failure
  pressure the official docs do not communicate.

- **[# PSA: Your Claude Code plugins are probably loading every skill TWICE — here's how to check and fix it — Reddit](https://www.reddit.com/r/ClaudeAI/comments/1rij9tr/psa_your_claude_code_plugins_are_probably_loading/)**
  A community debugging post linking plugin duplication to faster context compaction and recommending
  auditing enabled plugins and unused MCP connectors. Adds operational failure-mode and adoption
  pattern signal absent from the docs.

- **[[Guide] Plugins Claude Code: 2 months testing WD Framework in production (85% time gain on Newsletter feature) — Reddit](https://www.reddit.com/r/ClaudeCode/comments/1o4ln5s/guide_plugins_claude_code_2_months_testing_wd/)**
  A plugin author summarizing two months of production use, including package shape, install flow,
  and claimed workflow impact. Adds firsthand practitioner adoption data rather than only platform
  guidance.

---

## Research Gaps

The core mechanics are well documented by Anthropic and now reinforced by community examples. The
remaining gap is not "how do plugins work?" but "which community claims hold up over time?" Most
third-party material is either repo-first (good for concrete examples) or promotional (less useful
for neutral analysis). The strongest third-party signal comes from open repositories and
firsthand bug/adoption reports rather than generic tutorials.
