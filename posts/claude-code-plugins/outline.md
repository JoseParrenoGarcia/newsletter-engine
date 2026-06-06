# Outline: Claude Code Plugins: How to Build, Version, and Maintain Them

**Word count target:** 3,750 words (15 min read)
**Thesis:** Claude Code plugins are not a new capability — they are the packaging and distribution layer for everything you already build with CLAUDE.md, skills, hooks, MCP, and agents. The overhead only makes sense once you understand exactly what problem they solve.

---

## Sections

### Preview section
- "What this post covers" — 5 labelled bullets
- No source needed

### 1. Introduction — The "Copy Folders and Trust Me" Problem
- Why people reach for plugins: the pain of syncing `.claude/` folders across projects and teammates by hand
- Framing: plugins solve a distribution problem, not a capability problem
- Thesis statement: plugins are packaging, not a new primitive
- Sources: [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)

### 2. What Plugins Actually Are — Primitives vs Packaging
- Conceptual distinction: everything in a plugin already exists as a standalone primitive
- Six component families: skills, agents, hooks, MCP servers, LSP servers, monitors
- Also includes: commands, output styles, themes, executables in `bin/`, default `settings.json`, user-configurable options
- The manifest: `.claude-plugin/plugin.json` and its fields
- Key mental model: a plugin is a container, not a programming model
- Sources: [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference), [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)

### 3. Building Your First Plugin — Directory Structure and Manifest
- `claude plugin create` scaffold command with `--with` flags
- The directory layout: where each component type lives, `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`
- Writing `plugin.json`: name, displayName, version, description, author, keywords, repository, license
- Adding a skill to the plugin
- Testing locally with `--plugin-dir` (no install needed)
- `claude plugin validate` and `--strict` mode
- Sources: [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins), [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)

### 4. Distribution — Getting Plugins to Users
- Four source types: relative path, GitHub, git-subdir, npm — and when to use each
- Installation scopes: user, project, local, managed — what they control and why managed matters for teams
- Marketplace mechanics: `marketplace.json`, hosting on GitHub, adding the Anthropic-official and community marketplaces
- Namespacing: how `{plugin-name}--v{version}` git tags enable semver range resolution
- The official directory: `anthropics/claude-plugins-official` — how submissions work and the `skill-bundle` pattern
- Sources: [Create and distribute a plugin marketplace - Claude Code Docs](https://code.claude.com/docs/en/plugin-marketplaces), [anthropics/claude-plugins-official — GitHub](https://github.com/anthropics/claude-plugins-official)

### 5. Versioning — The Two Strategies and When to Choose
- Explicit semver strategy: bumping `version` in `plugin.json` is what triggers updates — pushing commits alone is not enough
- Commit-SHA strategy: omit `version`; users receive every commit automatically
- Semantic versioning with CHANGELOG.md
- Plugin dependencies: `dependencies` array, `{plugin-name}--v{version}` tag convention, downstream pinning with `~2.1.0`
- When to pin vs auto-update — the team tradeoff
- Sources: [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference), [Constrain plugin dependency versions - Claude Code Docs](https://code.claude.com/docs/en/plugin-dependencies)

### 6. Validation Before Release — What to Test and How
- What `claude plugin validate` catches: type mismatches (load errors) vs unrecognised-field warnings
- `--strict` promotes warnings to errors — CI-appropriate mode
- Local test workflow: `/plugin marketplace add ./path` → install from local marketplace → verify behaviour
- `--plugin-dir` as a pre-marketplace alternative
- The `/plugin` inspection command for post-install introspection
- What to actually test: does each component load, do skills trigger correctly, do hooks fire, do MCPs respond
- Sources: [Plugins reference - Claude Code Docs](https://code.claude.com/docs/en/plugins-reference), [Create and distribute a plugin marketplace - Claude Code Docs](https://code.claude.com/docs/en/plugin-marketplaces)

### 7. Pushing Updates to Users — Auto-Update and Controlled Rollout
- Background auto-update: Claude Code reinstalls missing dependencies and picks up new explicit versions on `/reload-plugins`
- `claude plugin marketplace update` — how users refresh their catalog
- `--scope` for targeting a specific settings layer
- Enterprise controlled-rollout pattern: two marketplace repos (stable vs early-access), two user groups via managed settings
- What happens when you remove the last-scope declaration: dependent plugins auto-uninstall
- Sources: [Constrain plugin dependency versions - Claude Code Docs](https://code.claude.com/docs/en/plugin-dependencies), [Create and distribute a plugin marketplace - Claude Code Docs](https://code.claude.com/docs/en/plugin-marketplaces)

### 8. Closing Thoughts — When Plugins Are Worth the Overhead
- Synthesis: the standalone → plugin transition is a packaging decision, not a capability upgrade
- The "iterate as standalone, then package" model
- When plugins pay off: multi-project reuse, team distribution, dependency management
- When they don't: single-project work, solo practitioners who don't distribute
- Sources: [Create plugins - Claude Code Docs](https://code.claude.com/docs/en/plugins)

### Now, I Want to Hear from You
- 3 specific questions tied to the post's argument

### References
- Numbered citations for all sources used
