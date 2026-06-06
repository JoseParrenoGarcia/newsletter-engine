# Claude Code Plugins: How to Build, Version, and Maintain Them

*A practical guide to packaging, distributing, and maintaining Claude Code plugins — from first manifest to controlled rollout.*

---

A plugin is not a new kind of Claude capability. It is a packaging format for capabilities you already have.

That distinction matters because most practitioners encounter plugins and assume they unlock something that standalone configuration cannot. They do not. Every component inside a plugin — skills, agents, hooks, MCP servers, LSP servers, monitors — exists and works identically outside a plugin. What a plugin adds is distribution: a structured, versionable, installable container that other people (or other projects) can use without copying your `.claude/` folder by hand.

Once that framing is clear, the rest of this post becomes straightforward. Plugins solve a coordination and distribution problem. They are the difference between "I shared a folder with you via Slack" and "you installed a versioned package from a registry."

---

## What This Post Covers

- **What plugins actually are** — the six component families, the manifest structure, and why plugins are packaging rather than a new primitive.
- **Building your first plugin** — the scaffold command, directory layout, writing `plugin.json`, and testing locally before any install.
- **Distribution** — source types, installation scopes, marketplace mechanics, and how namespacing works.
- **Versioning** — the two strategies (explicit semver vs commit-SHA), plugin dependencies, and when to pin.
- **Validation and testing** — what `claude plugin validate` catches, `--strict` for CI, and the local marketplace test workflow.
- **Pushing updates** — how auto-update actually works, `/reload-plugins`, and the enterprise controlled-rollout pattern.

---

## What Plugins Actually Are — Primitives vs Packaging

The Claude Code documentation calls plugins "a way to share skills, agents, hooks, and MCP servers across projects and teams." [1] That is accurate and undersells the conceptual point.

Every primitive you build in a standalone `.claude/` folder — a skill, an agent definition, a pre-tool-use hook, an MCP server config — already works as-is. The plugin format does not change what those primitives do. It gives them a home that travels.

A plugin is a directory with a single required file: `.claude-plugin/plugin.json`. Inside that directory, you place whatever components you want to bundle:

- **Skills** — slash-command workflows in `.claude/skills/`
- **Agents** — subagent definitions in `.claude/agents/`
- **Hooks** — event-triggered automations in `.claude/hooks/`
- **MCP servers** — tool providers configured via `.claude/mcp.json`
- **LSP servers** — language service integrations
- **Monitors** — background observation processes

The manifest also supports commands, output styles, themes, executables in a `bin/` directory, a default `settings.json`, and user-configurable options that the installer can set at install time. [2]

The `plugin.json` manifest is where all of this is described and versioned. A minimal manifest looks like:

```json
{
  "name": "my-writing-tools",
  "displayName": "Writing Tools",
  "version": "1.0.0",
  "description": "Skills and hooks for long-form writing workflows.",
  "author": "your-name",
  "keywords": ["writing", "drafting", "newsletter"]
}
```

Optional fields include `repository`, `license`, `dependencies`, and `options`. Unrecognised fields are handled as warnings by the validator — which becomes relevant when using `--strict` mode in CI. [2]

The practical implication of "plugins are packaging": if you are building something for yourself in a single project, a plugin adds nothing. The plugin format pays off when you need distribution — multiple projects, multiple teammates, or external users.

---

## Building Your First Plugin — Directory Structure and Manifest

The scaffold command is the fastest way to get started:

```bash
claude plugin create my-writing-tools --with skill --with hook
```

The `--with` flags specify which component types to scaffold. Running that command produces a directory with the correct layout, placeholder files, and a pre-populated `plugin.json`. [1]

The resulting structure:

```
my-writing-tools/
├── .claude-plugin/
│   └── plugin.json
├── .claude/
│   ├── skills/
│   │   └── draft.md
│   └── hooks/
│       └── pre-tool-use.sh
```

Components live in the same relative paths they would occupy in a regular `.claude/` folder. A skill goes in `.claude/skills/`. An agent goes in `.claude/agents/`. The plugin format does not introduce a new directory convention — it wraps the existing one. [2]

Two environment variables are available inside plugin components at runtime: `CLAUDE_PLUGIN_ROOT` (the directory containing your `plugin.json`) and `CLAUDE_PLUGIN_DATA` (a persistent per-plugin data directory, separate from the plugin source). [2] These are useful when hooks or scripts need to reference files inside the plugin without hardcoding paths.

Once the structure is in place, testing locally requires no installation. Point Claude Code at the directory with `--plugin-dir`:

```bash
claude --plugin-dir ./my-writing-tools
```

The plugin is active for that session only. Skills are available as slash commands. Hooks fire normally. Nothing is written to your user or project settings. [1] This is the right development loop: iterate with `--plugin-dir`, validate before publishing.

Validation catches two categories of issues:

```bash
claude plugin validate ./my-writing-tools
claude plugin validate ./my-writing-tools --strict
```

The base command flags type mismatches that would cause load errors. `--strict` promotes unrecognised-field warnings to errors, making it suitable for CI pipelines where you want clean manifests. [2] Running `--strict` in CI before any publish step prevents mistyped field names from reaching users.

The `/plugin inspect` command (available inside a session) lets you introspect a loaded plugin — useful for confirming that components were discovered correctly after install.

---

## Distribution — Getting Plugins to Users

Once the plugin is tested locally, the question is how users install it. There are five source types: [3]

- **Relative path** — a local directory path. For development and team members who clone the same repo.
- **`github`** — `owner/repo` format, resolved as a GitHub repository. The default install method for public plugins.
- **`url`** — an arbitrary HTTPS URL pointing to a git repository.
- **`git-subdir`** — installs a plugin from a subdirectory of a repository. Used when a single repo contains multiple plugins.
- **`npm`** — an npm package name. For plugins distributed through the npm registry.

Users install a plugin with:

```bash
claude plugin install owner/my-writing-tools
```

### Installation Scopes

Every plugin install targets a scope, which controls which settings layer is updated: [3]

- **user** — available in all of the user's Claude Code sessions, all projects.
- **project** — available only within the current project (written to `.claude/settings.json`).
- **local** — project-level but gitignored (written to `.claude/settings.local.json`).
- **managed** — set by an organisation administrator, typically via MDM or deployment tooling. Users cannot modify managed settings.

The `managed` scope is the enterprise distribution path. An administrator writes a marketplace configuration to the managed settings file, and every user in the organisation picks up the plugins automatically — without needing to install anything manually.

### Marketplace Mechanics

For team or public distribution, the right approach is a marketplace rather than pointing users at a single repository. A marketplace is a `marketplace.json` file hosted on GitHub (or any git provider) that lists available plugins and their sources: [3]

```json
{
  "name": "my-team-plugins",
  "plugins": [
    {
      "name": "writing-tools",
      "source": {
        "type": "github",
        "repo": "my-org/writing-tools"
      }
    }
  ]
}
```

Users add a marketplace once, then install from it by name:

```bash
claude plugin marketplace add https://github.com/my-org/plugin-marketplace
claude plugin install writing-tools@my-team-plugins
```

Anthropic maintains two official marketplaces: `claude-plugins-official` (curated, Anthropic-maintained plugins, auto-available to all users) and `claude-community` (third-party submissions). The community directory lives at [`anthropics/claude-plugins-official`](https://github.com/anthropics/claude-plugins-official) and accepts submissions via a plugin directory submission form. [4]

The `skill-bundle` pattern is worth noting: repositories that contain only skills (no `plugin.json`) can still be listed in a marketplace using this pattern. It is how simpler skill-only distributions avoid the plugin manifest overhead while still participating in marketplace discovery. [4]

---

## Versioning — The Two Strategies and When to Choose

The most non-obvious thing about plugin versioning: **pushing a commit does not trigger an update for users.** What triggers an update is a version bump in `plugin.json` — or, under the commit-SHA strategy, every push. [2]

There are two approaches, and choosing between them is a deliberate policy decision.

### Explicit Semver

Include a `version` field in `plugin.json`. Follow MAJOR.MINOR.PATCH conventions. Maintain a `CHANGELOG.md`. When you are ready to release a new version, bump the version field and push. Claude Code sees the new version and updates users who have auto-update enabled.

Under this strategy, users on a pinned version stay on that version until they explicitly update or you force a bump. This is the right model for plugins used in production workflows where stability matters.

### Commit-SHA Strategy

Omit the `version` field. Claude Code tracks the latest commit SHA. Every push to the repository is treated as a new version. Users always run the latest commit. [2]

This is appropriate for development or for low-stakes plugins where you want changes to propagate without a release process. The tradeoff: there is no stable reference point. If a commit breaks something, all users are immediately affected.

### Plugin Dependencies

When one plugin depends on another, declare it in the `dependencies` array:

```json
{
  "name": "advanced-writing-tools",
  "dependencies": [
    {
      "name": "writing-tools",
      "source": { "type": "github", "repo": "my-org/writing-tools" },
      "version": "~2.1.0"
    }
  ]
}
```

The `{plugin-name}--v{version}` git-tag convention is how Claude Code resolves semver ranges. A repository with tags `writing-tools--v2.0.0`, `writing-tools--v2.1.0`, and `writing-tools--v2.2.0` allows a downstream plugin to pin `~2.1.0` and receive patch updates while staying on the 2.x minor line. [5]

Claude Code resolves and auto-reinstalls missing dependencies via `/reload-plugins` and background auto-update. The dependency resolution happens at install time — users who install `advanced-writing-tools` get its dependencies pulled in automatically.

---

## Validation Before Release — What to Test and How

The validation sequence before any publish step:

**Step 1: Run the validator.**

```bash
claude plugin validate ./my-writing-tools --strict
```

Fix every error. Treat every warning as a potential user-facing failure. `--strict` is the right default for a release check — the base validator's warning-only mode is too permissive for stable distribution. [2]

**Step 2: Test locally with `--plugin-dir`.**

```bash
claude --plugin-dir ./my-writing-tools
```

Manually exercise every skill. Confirm each slash command appears in the suggestions. Trigger hooks and verify they fire. If the plugin includes MCP servers, confirm they start and respond correctly.

**Step 3: Test via a local marketplace.**

```bash
/plugin marketplace add ./local-marketplace
/plugin install my-writing-tools@local-marketplace
```

This simulates the full install path a user will follow. Testing with `--plugin-dir` skips the install mechanism. Testing via a local marketplace catches install-specific issues — missing files, incorrect source references in `plugin.json`, dependency resolution failures. [3]

**Step 4: Inspect post-install.**

```
/plugin inspect
```

Confirms that all declared components were discovered and loaded. Any component missing here is a component that will be silently missing for users.

For CI, the minimal check is `claude plugin validate --strict` on every pull request. More thorough pipelines run an automated install into a scratch project and execute a smoke test for each skill. [2]

---

## Pushing Updates to Users — Auto-Update and Controlled Rollout

Once a plugin is distributed, Claude Code handles updates in the background. When a new version is detected — either a new semver tag or a new commit SHA under the commit strategy — Claude Code queues a reinstall. The update takes effect on the next `/reload-plugins` or session start. [5]

Users can manually trigger a marketplace catalog refresh:

```bash
claude plugin marketplace update --scope user
```

The `--scope` flag targets a specific settings layer. Without it, the command updates the catalog for all scopes. [3]

### Controlled Rollout for Teams

The enterprise pattern for staged rollouts uses two marketplace repositories and managed settings to split users into groups.

Group A receives the `stable` marketplace. Group B receives the `early-access` marketplace. The stable marketplace is updated after a validation period. The early-access marketplace is updated immediately after each release. Neither group installs anything manually — their managed settings file declares the marketplace, and Claude Code handles the rest. [5]

To add a marketplace via managed settings:

```json
{
  "pluginMarketplaces": [
    {
      "url": "https://github.com/my-org/stable-plugins",
      "scope": "managed"
    }
  ]
}
```

One operational detail worth noting: if the last-scope declaration for a marketplace is removed from settings, dependent plugins auto-uninstall on the next sync. [3] This is the clean removal path — no manual cleanup required from users.

---

## Closing Thoughts

The plugin system is a graduation, not a foundation.

Everything in this post assumes you already have working skills, agents, hooks, or MCP configurations. Plugins are what you reach for after those components are stable and you need to share them. The Anthropic documentation describes the recommended arc clearly: iterate as standalone configuration, then package into a plugin once the workflow is proven. [1] Skipping that step — reaching for the plugin format before the underlying components are solid — adds overhead without benefit.

**Plugins pay off under three conditions.** First, when the same configuration needs to live in more than one project. A plugin eliminates the copy-paste problem and gives you a single source of truth with a version history. Second, when distribution across teammates requires reproducibility. Everyone on the team installs the same version; updates propagate through a controlled path rather than a shared folder. Third, when you are building for external users or contributing to the community marketplace, where the install experience matters.

**Plugins add overhead that is not worth it** for solo practitioners maintaining a single project. A well-structured `.claude/` folder with skills, rules, and hooks is entirely sufficient. There is no capability gap between standalone and packaged — only a distribution gap.

The key move this system enables is treating Claude Code configuration the way you treat code: versioned, tested, distributed, and maintained with the same rigour you would apply to any shared library. That shift — from `.claude/` folder to installable, versionable package — is what the plugin format makes possible.

---

## Now, I Want to Hear from You

- Have you found a use case where the standalone `.claude/` approach broke down and plugins were the right fix? What specifically triggered the move?
- If you manage a team using Claude Code, how are you currently sharing configuration? Are you using the managed scope, or something else?
- The commit-SHA versioning strategy trades stability for simplicity. Have you run into a case where that tradeoff went wrong, or do you find it works well for internal tools?

---

## References

[1] [Create plugins — Claude Code Docs](https://code.claude.com/docs/en/plugins) — The official Anthropic guide covering the plugin mental model, the standalone-vs-plugin decision, the `claude plugin create` scaffold, and the `--plugin-dir` local test workflow.

[2] [Plugins reference — Claude Code Docs](https://code.claude.com/docs/en/plugins-reference) — Complete technical reference for the plugin system: all six component families, the full `plugin.json` manifest schema, directory layout, environment variables (`CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`), the `claude plugin validate` command with `--strict` mode, and version management strategies.

[3] [Create and distribute a plugin marketplace — Claude Code Docs](https://code.claude.com/docs/en/plugin-marketplaces) — Full walkthrough for `marketplace.json`, all five plugin source types, installation scopes (user, project, local, managed), the `claude plugin marketplace update` command, managed-settings controlled rollout with JSON examples, and auto-uninstall on scope removal.

[4] [anthropics/claude-plugins-official — GitHub](https://github.com/anthropics/claude-plugins-official) — The official Anthropic plugin directory showing real marketplace structure, the `skill-bundle` pattern, and the community submission workflow.

[5] [Constrain plugin dependency versions — Claude Code Docs](https://code.claude.com/docs/en/plugin-dependencies) — Documents the `dependencies` array in `plugin.json`, the `{plugin-name}--v{version}` git-tag convention for semver range resolution, auto-reinstall behaviour on `/reload-plugins`, and the enterprise pattern of stable vs early-access marketplace channels.
