# Claude Code Plugins: How to Build, Version, and Maintain Them

*A practical guide to packaging, distributing, and maintaining Claude Code plugins — from first manifest to controlled rollout.*

---

A plugin is not a new kind of Claude capability. It is a packaging format for capabilities you already have.

That distinction matters because most practitioners encounter plugins and assume they unlock something that standalone configuration cannot. They do not. Every component inside a plugin — skills, agents, hooks, MCP servers, LSP servers, monitors — exists and works identically outside a plugin. What a plugin adds is distribution: a structured, versionable, installable container that other people (or other projects) can use without copying your `.claude/` folder by hand.

Once that framing is clear, the rest of this post becomes straightforward. Plugins solve a coordination and distribution problem. They are the difference between "I shared a folder with you via Slack" and "you installed a versioned package from a registry."

---

## What Does This Post Cover?

- **What are Claude Code plugins?** — the six component families, the manifest structure, and why plugins are packaging rather than a new primitive.
- **How do you build a Claude Code plugin?** — the scaffold command, directory layout, writing `plugin.json`, and testing locally before any install.
- **How do you distribute Claude Code plugins?** — source types, installation scopes, marketplace mechanics, and how namespacing works.
- **How should you version a Claude Code plugin?** — the two strategies (explicit semver vs commit-SHA), plugin dependencies, and when to pin.
- **How do you validate a Claude Code plugin before release?** — what `claude plugin validate` catches, `--strict` for CI, and the local marketplace test workflow.
- **How do you push updates to Claude Code plugin users?** — how auto-update actually works, `/reload-plugins`, and the enterprise controlled-rollout pattern.

---

## What Are Claude Code Plugins? — Primitives vs Packaging

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

The practical implication of "plugins are packaging": if you are building something for yourself in a single project, a plugin adds nothing. The plugin format pays off when you need distribution — multiple projects, multiple teammates, or external users. For a data science team, that might look like packaging a model-evaluation skill that scores LLM outputs against a rubric, so every analyst installs the same version rather than maintaining their own copy. When I first hit the copy-and-paste-your-`.claude`-folder phase of a new project, I knew there had to be a better answer — plugins are it.

---

## How Do You Build a Claude Code Plugin? — Directory Structure and Manifest

The scaffold command is the fastest way to get started. For a writing workflow the plugin is `my-writing-tools`; for a DS or ML team, the same pattern produces an `experiment-tools` plugin that packages skills for running prompt A/B tests, hooks for logging experiment results, and agents for comparing model outputs across projects:

```bash
claude plugin create my-writing-tools --with skill --with hook
claude plugin create experiment-tools --with skill --with hook --with agent
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

The plugin is active for that session only. Skills are available as slash commands. Hooks fire normally. Nothing is written to your user or project settings. [1] This is the right development loop: iterate with `--plugin-dir`, validate before publishing. In this newsletter engine repo, I package skills and hooks as a plugin so any new post folder gets them automatically — the same principle applies if you are building a shared prompt-engineering agent or an `experiment-tools` plugin for your analytics team.

Validation catches two categories of issues:

```bash
claude plugin validate ./my-writing-tools
claude plugin validate ./my-writing-tools --strict
```

The base command flags type mismatches that would cause load errors. `--strict` promotes unrecognised-field warnings to errors, making it suitable for CI pipelines where you want clean manifests. [2] Running `--strict` in CI before any publish step prevents mistyped field names from reaching users.

The `/plugin inspect` command (available inside a session) lets you introspect a loaded plugin — useful for confirming that components were discovered correctly after install.

---

## How Do You Distribute Claude Code Plugins?

Once a Claude Code plugin is tested locally, distribution comes down to two decisions: where to host the plugin source and which installation scope to target. For most public or team plugins, that means a GitHub repository as the source and either the `user` or `project` scope for install. For enterprise rollouts, managed settings handle distribution automatically — no manual install required from users.

There are five source types: [3]

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

The `managed` scope is the enterprise distribution path. An administrator writes a marketplace configuration to the managed settings file, and every user in the organisation picks up the plugins automatically — without needing to install anything manually. This is particularly useful for data teams distributing data-quality hooks that validate dataframe schemas before any pipeline step runs.

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

This is what "distribution" means concretely: a controlled, repeatable path that a copied `.claude/` folder cannot provide. On this project I use `project` scope for the newsletter engine plugin — it stays in source control and every clone gets it, without touching my user-level settings for unrelated projects.

---

## How Should You Version a Claude Code Plugin?

Two strategies cover most cases: explicit semver for production plugins shared with teams, commit-SHA tracking for internal or single-user plugins where you want changes to propagate without a release process. Teams should default to semver — it gives users a stable reference point and makes rollback straightforward. Commit-SHA is only appropriate when stability is not a concern and a broken push affecting all users is an acceptable risk. If your team shares a RAG evaluation workflow as a plugin, a broken commit silently replacing a previously stable rubric is the kind of regression that is hard to diagnose after the fact.

The most non-obvious thing about plugin versioning: **pushing a commit does not trigger an update for users.** I ran into exactly this when I pushed a hook change to an `experiment-tools` plugin and a colleague reported stale behaviour hours later — their session had never picked up the new commit because there was no version bump to detect. What triggers an update is a version bump in `plugin.json` — or, under the commit-SHA strategy, every push. [2] The first time you push a commit and watch a teammate's Claude Code silently update mid-session is enough to convince you that explicit semver is worth the extra step.

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

Claude Code resolves and auto-reinstalls missing dependencies via `/reload-plugins` and background auto-update. The dependency resolution happens at install time — users who install `advanced-writing-tools` get its dependencies pulled in automatically. The same pattern applies in an ML context: if you push a new version of your `experiment-tools` plugin that changes how a hook logs results, teammates running live experiments get a silent schema change mid-session unless you pin the version in any downstream dependency that reads those logs.

---

## How Do You Validate a Claude Code Plugin Before Release?

Each step in the sequence catches a distinct failure class the previous step cannot see — manifest errors, runtime errors, install-path errors, and load-discovery errors respectively. Run them in order.

The validation sequence before any publish step:

**Step 1: Run the validator.**

```bash
claude plugin validate ./my-writing-tools --strict
```

Fix every error. Treat every warning as a potential user-facing failure. `--strict` is the right default for a release check — the base validator's warning-only mode is too permissive for stable distribution. [2] This step catches manifest errors — mistyped field names, missing required fields, and unrecognised keys that would reach users as silent load failures.

**Step 2: Test locally with `--plugin-dir`.**

```bash
claude --plugin-dir ./my-writing-tools
```

Run each slash command and verify the output matches the expected behaviour. Confirm each hook fires by triggering the relevant lifecycle event and checking the log. Run `/plugin inspect` and verify the metadata (version, commands, agents) matches your manifest. If the plugin includes MCP servers, confirm they start and respond correctly. This step catches runtime failures that the validator cannot see — skills that error on invocation, hooks that fire but do nothing, MCP servers that fail to start.

**Step 3: Test via a local marketplace.**

```bash
/plugin marketplace add ./local-marketplace
/plugin install my-writing-tools@local-marketplace
```

This simulates the full install path a user will follow. Step 3 catches install-path failures that `--plugin-dir` masks because it bypasses the install mechanism entirely — missing files, incorrect source references in `plugin.json`, dependency resolution failures. [3]

**Step 4: Inspect post-install.**

```
/plugin inspect
```

Confirms that all declared components were discovered and loaded. Any component missing here is a component that will be silently missing for users. This step catches the gap between what `plugin.json` declares and what Claude Code actually loaded after install.

For CI, the minimal check is `claude plugin validate --strict` on every pull request:

```yaml
- name: Validate plugin manifest
  run: |
    claude plugin validate ./my-plugin --strict
  shell: bash
```

Add this as a PR check step so mistyped fields and missing required keys are caught before the branch merges. More thorough pipelines run an automated install into a scratch project and execute a smoke test for each skill — for example, invoking `/draft` and asserting exit code 0 before treating the skill as verified. [2] The first time I skipped the local marketplace test and went straight to a GitHub install, a missing file reference in `plugin.json` reached two colleagues before I caught it — Step 3 now runs every time.

---

## How Do You Push Updates to Claude Code Plugin Users?

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

If the last-scope declaration for a marketplace is removed from settings, dependent plugins auto-uninstall on the next sync. [3] This is the clean removal path — no manual cleanup required from users. The two-marketplace pattern — `stable` and `early-access` — solved a real rollout problem for me: without it, a single broken push to the newsletter engine plugin hit every project at once; splitting the channels meant I could validate on one before promoting to the other.

---

## Closing Thoughts

The plugin system is a graduation, not a foundation.

Everything in this post assumes you already have working skills, agents, hooks, or MCP configurations. Plugins are what you reach for after those components are stable and you need to share them. The Anthropic documentation describes the recommended arc clearly: iterate as standalone configuration, then package into a plugin once the workflow is proven. [1] Skipping that step — reaching for the plugin format before the underlying components are solid — adds overhead without benefit.

**Plugins pay off under three conditions.** First, when the same configuration needs to live in more than one project. A plugin eliminates the copy-paste problem and gives you a single source of truth with a version history. Second, when distribution across teammates requires reproducibility. Everyone on the team installs the same version; updates propagate through a controlled path rather than a shared folder. Third, when you are building for external users or contributing to the community marketplace, where the install experience matters.

**Plugins add overhead that is not worth it** for a solo data practitioner maintaining a single project. A well-structured `.claude/` folder with skills, rules, and hooks is entirely sufficient. There is no capability gap between standalone and packaged — only a distribution gap. Where the overhead pays off is the DS lead or analytics team lead who needs the same evaluation harness, data-quality hooks, or prompt-engineering agents running consistently across every team member's environment.

The key move this system enables is treating Claude Code configuration the way you treat code: versioned, tested, distributed, and maintained with the same rigour you would apply to any production data pipeline. For a DS team, that means the evaluation harness that scores LLM outputs against a rubric, or the data-quality hooks that validate dataframe schemas before any pipeline step runs, ship to every analyst's environment the same way a library release does — tagged, tested, and rolled back if they break something. That shift — from `.claude/` folder to installable, versionable package — is what the plugin format makes possible.

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
