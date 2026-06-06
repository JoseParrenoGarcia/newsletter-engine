# Research Brief: Claude Code Plugins: How to Build, Version, and Maintain Them

**Generated:** 2026-06-06

## Summary

No URLs were present in `notes.md`. All 10 sources were found via targeted web searches and direct
fetches of official Anthropic documentation. The four open research questions (complete `plugin.json`
schema, community examples, semver-to-update-behaviour mapping, CI tooling) are all answered by the
official docs. All 8 ToC sections have at least one source. No research gaps remain.

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

## Research Gaps

None. All 8 ToC sections and all 4 open research questions are covered by sourced material.
