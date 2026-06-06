# Notes: Claude Code Plugins

## Brainstorm Summary

**Core argument:** Plugins are the packaging and lifecycle layer for Claude Code customisation — not a new capability. Once you've built skills, hooks, and CLAUDE.md configs you want to share across projects or with a team, plugins are how you do that properly. The post teaches readers to build one, then operate it like real software.

**Reader:** Experienced Claude Code user. Already knows what skills, hooks, and CLAUDE.md are. Doesn't need hand-holding on basics. Wants to go deeper.

**Tone:** Practical and direct. No fluff. Concrete examples wherever possible.

---

## Key Concepts from Research

### What a plugin actually is
- A self-contained directory of components that extends Claude Code
- Six core component families: skills, agents, hooks, MCP servers, LSP servers, monitors
- Also supports: commands, output styles, themes, executables in `bin/`, default `settings.json`, user-configurable options
- Conceptually a container around existing primitives — not a new programming model
- The manifest is `.claude-plugin/plugin.json`

### When to use a plugin vs standalone config
- Standalone `.claude/` config: single-project customisation, quick experiments, personal workflows
- Plugin: share with team/community, reuse across multiple projects, version and update, distribute via marketplace
- Mental model: "once another repo needs the same setup, package it as a plugin"

### Three install paths
1. Marketplace install: browse `/plugin`, install at user/project/local/managed scope
2. Skills-directory auto-load: any folder with `.claude-plugin/plugin.json` auto-loads as `<name>@skills-dir`
3. `--plugin-dir` flag: local development and testing path

### Marketplace mechanics
- Users add marketplaces from: GitHub shorthand, generic git URL, local path, direct remote URL to `marketplace.json`
- Individual plugins inside a marketplace can come from: relative paths, GitHub repos, git repos, git subdirectories (monorepos), npm packages
- Closer to an internal package registry than a list of prompt files

### Post-install behaviour
- Skills are namespaced: a plugin named `commit-commands` exposes `/commit-commands:commit`
- Plugin copied into local versioned plugin cache
- `/plugin` interface shows: commands, agents, hooks, MCP/LSP servers, context cost, last-updated metadata
- Mid-session install: run `/reload-plugins` to activate without restart

### Maintenance dimensions (the advanced part)
1. **Validation before release** — CI validation, testing the plugin locally before publishing
2. **Versioning** — semantic versioning analogous to sklearn/pandas; pinned sources vs auto-update
3. **Pushing updates to users** — auto-update behaviour, version pinning, controlled propagation paths

---

## Rough Table of Contents

1. **Introduction** — Why plugins exist: the "copy folders and trust me" problem
2. **What plugins actually are** — Primitives vs packaging; the six component families; plugin.json
3. **Building your first plugin** — Directory structure, manifest, adding a skill, testing locally with `--plugin-dir`
4. **Distribution** — Marketplace mechanics (GitHub, git, npm, local); scopes (user/project/local/managed); namespacing
5. **Versioning** — Semantic versioning for plugins; pinning vs auto-update; version policy decisions
6. **Validation before release** — What to test; CI approaches; `/plugin` inspection
7. **Pushing updates to users** — Auto-update propagation; controlled rollout; `/reload-plugins`
8. **Conclusion** — When plugins are worth the overhead vs staying with standalone config
