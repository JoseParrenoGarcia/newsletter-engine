# Claude Code Plugins: How to Build, Version, and Maintain Them

*A practical guide to packaging, distributing, and maintaining Claude Code plugins — from first manifest to controlled rollout.*

---

A few months ago, my team had built a solid set of Claude Code plugins for experimentation work — an A/B testing agent that drafts statistical test plans, skills for power calculations and variant analysis, hooks that validate experiment configs before they run, and an MCP server that pulls live experiment data from our internal platform. It worked well. Then other teams noticed.

The data engineering team wanted the experiment config validator. The product analytics team wanted the A/B testing agent. The ML platform team wanted the hooks. Word spread, and suddenly we were fielding the same request from five different directions: *can you share your setup?*

The honest answer was: share how, exactly? We could copy `.md` files into a Slack message. But that is a snapshot in time — the moment they paste it, it diverges from what we are running. It does not include the MCP server configuration or the hooks. And if we update the skills next week, none of them get the improvement unless they repeat the process. For a single team, a shared `.claude/` folder is fine. For distribution across multiple teams with ongoing updates, it breaks immediately.

This is where plugins come in.

A plugin is not a new kind of Claude capability. It is a packaging format for capabilities you already have. Every component inside a plugin — skills, agents, hooks, MCP servers, LSP servers, monitors — exists and works identically outside a plugin. What a plugin adds is distribution: a structured, versionable, installable container that other teams can [install in one command](https://github.com/Postman-Devrel/postman-claude-code-plugin) and receive updates from automatically.

The experimentation plugin we eventually built contains all of it: the A/B testing agent, the statistical skills, the config validation hook, and the MCP server config. Other teams install it from our [internal marketplace](https://github.com/feed-mob/claude-code-marketplace). When we update a skill, they get it on their next session start. No Slack messages, no copy-pasting, no version drift.

That is the problem plugins solve. Everything else in this post is the mechanics of how.

---

## What will we cover in this post?

- **What are Claude Code plugins?** — the six component families, the manifest structure, and why plugins are packaging rather than a new primitive.
- **How do you build a Claude Code plugin?** — the scaffold command, directory layout, writing `plugin.json`, and testing locally before any install.
- **How do you distribute Claude Code plugins?** — source types, installation scopes, marketplace mechanics, and how namespacing works.
- **How should you version a Claude Code plugin?** — the two strategies (explicit semver vs commit-SHA), plugin dependencies, and when to pin.
- **How do you validate a Claude Code plugin before release?** — what `claude plugin validate` catches, `--strict` for CI, and the local marketplace test workflow.
- **How do you push updates to Claude Code plugin users?** — how auto-update actually works, `/reload-plugins`, and the enterprise controlled-rollout pattern.
- **What breaks when building Claude Code plugins in practice?** — the failure modes practitioners hit most often and how to avoid them.

---

## What are Claude Code plugins?

The [Claude Code documentation](https://code.claude.com/docs/en/plugins) calls plugins "a way to share skills, agents, hooks, and MCP servers across projects and teams." That is accurate and undersells the conceptual point.

Every primitive you build in a standalone `.claude/` folder — a skill, an agent definition, a pre-tool-use hook, an MCP server config — already works as-is. The plugin format does not change what those primitives do. It gives them a home that travels.

A plugin is a directory with a single required file: `.claude-plugin/plugin.json`. Inside that directory, you place whatever components you want to bundle:

- **Skills** — slash-command workflows in `.claude/skills/`
- **Agents** — subagent definitions in `.claude/agents/`
- **Hooks** — event-triggered automations in `.claude/hooks/`
- **MCP servers** — tool providers configured via `.claude/mcp.json`
- **LSP servers** — language service integrations
- **Monitors** — background observation processes

The manifest also supports commands, output styles, themes, executables in a `bin/` directory, a default `settings.json`, and [user-configurable options](https://code.claude.com/docs/en/plugins-reference) that the installer can set at install time.

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

Optional fields include `repository`, `license`, `dependencies`, and `options`. [Unrecognised fields are handled as warnings by the validator](https://code.claude.com/docs/en/plugins-reference) — which becomes relevant when using `--strict` mode in CI.

The practical implication of "plugins are packaging": if you are building something for yourself in a single project, a plugin adds nothing. The plugin format pays off when you need distribution — multiple projects, multiple teammates, or external users.

---

## How do you build a Claude Code plugin?

The scaffold command is the fastest way to get started:

```bash
claude plugin create my-writing-tools --with skill --with hook
```

The `--with` flags specify which component types to scaffold. Running that command produces a directory with the [correct layout, placeholder files, and a pre-populated `plugin.json`](https://code.claude.com/docs/en/plugins).

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

Components live in the same relative paths they would occupy in a regular `.claude/` folder. A skill goes in `.claude/skills/`. An agent goes in `.claude/agents/`. [The plugin format does not introduce a new directory convention](https://code.claude.com/docs/en/plugins-reference) — it wraps the existing one.

Real plugins in the wild usually bundle several component types at once. [Postman's plugin repo](https://github.com/Postman-Devrel/postman-claude-code-plugin) combines `.claude-plugin/plugin.json`, `.mcp.json`, commands, skills, and an agent in one package, while [Engram's plugin docs](https://github.com/Gentleman-Programming/engram/blob/main/docs/PLUGINS.md) document a PowerShell hook fallback for locked-down Windows environments.

Two environment variables are available inside plugin components at runtime: [`CLAUDE_PLUGIN_ROOT`](https://code.claude.com/docs/en/plugins-reference) (the directory containing your `plugin.json`) and `CLAUDE_PLUGIN_DATA` (a persistent per-plugin data directory, separate from the plugin source). These are useful when hooks or scripts need to reference files inside the plugin without hardcoding paths.

Once the structure is in place, testing locally requires no installation. Point Claude Code at the directory with `--plugin-dir`:

```bash
claude --plugin-dir ./my-writing-tools
```

The plugin is active for that session only. Skills are available as slash commands. Hooks fire normally. [Nothing is written to your user or project settings.](https://code.claude.com/docs/en/plugins) This is the right development loop: iterate with `--plugin-dir`, validate before publishing.

Validation catches two categories of issues:

```bash
claude plugin validate ./my-writing-tools
claude plugin validate ./my-writing-tools --strict
```

The base command flags type mismatches that would cause load errors. [`--strict` promotes unrecognised-field warnings to errors](https://code.claude.com/docs/en/plugins-reference), making it suitable for CI pipelines where you want clean manifests. Running `--strict` in CI before any publish step prevents mistyped field names from reaching users.

The `/plugin inspect` command (available inside a session) lets you introspect a loaded plugin — useful for confirming that components were discovered correctly after install.

---

## How do you distribute Claude Code plugins?

Once the plugin is tested locally, the question is how users install it. There are [five source types](https://code.claude.com/docs/en/plugin-marketplaces):

- **Relative path** — a local directory path. For development and team members who clone the same repo.
- **`github`** — `owner/repo` format, resolved as a GitHub repository. The default install method for public plugins.
- **`url`** — an arbitrary HTTPS URL pointing to a git repository.
- **`git-subdir`** — installs a plugin from a subdirectory of a repository. Used when a single repo contains multiple plugins.
- **`npm`** — an npm package name. For plugins distributed through the npm registry.

Users install a plugin with:

```bash
claude plugin install owner/my-writing-tools
```

### Installation scopes

Every plugin install targets a [scope, which controls which settings layer is updated](https://code.claude.com/docs/en/plugin-marketplaces):

- **user** — available in all of the user's Claude Code sessions, all projects.
- **project** — available only within the current project (written to `.claude/settings.json`).
- **local** — project-level but gitignored (written to `.claude/settings.local.json`).
- **managed** — set by an organisation administrator, typically via MDM or deployment tooling. Users cannot modify managed settings.

The `managed` scope is the enterprise distribution path. An administrator writes a marketplace configuration to the managed settings file, and every user in the organisation picks up the plugins automatically — without needing to install anything manually.

### Marketplace mechanics

For team or public distribution, the right approach is a [marketplace](https://github.com/wshobson/agents) rather than pointing users at a single repository. A [marketplace is a `marketplace.json` file](https://code.claude.com/docs/en/plugin-marketplaces) hosted on GitHub (or any git provider) that lists available plugins and their sources:

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

Anthropic maintains two official marketplaces: `claude-plugins-official` (curated, Anthropic-maintained plugins, auto-available to all users) and `claude-community` (third-party submissions). The community directory lives at [`anthropics/claude-plugins-official`](https://github.com/anthropics/claude-plugins-official) and accepts submissions via a plugin directory submission form.

The [`skill-bundle` pattern](https://github.com/anthropics/claude-plugins-official) is worth noting: repositories that contain only skills (no `plugin.json`) can still be listed in a marketplace using this pattern. It is how simpler skill-only distributions avoid the plugin manifest overhead while still participating in marketplace discovery.

### What the community has built so far

The ecosystem has already moved beyond a single official directory. Focused catalogs like [Docker's marketplace](https://github.com/docker/claude-plugins), [FeedMob's marketplace](https://github.com/feed-mob/claude-code-marketplace), and [Daniel Rosehill's workflow catalog](https://github.com/danielrosehill/Claude-Code-Plugins) are using the same packaging model for very different distribution goals.

At the larger end, [wshobson/agents](https://github.com/wshobson/agents) ships 84 Claude Code plugins from one marketplace and generates parallel artifacts for Codex CLI, Cursor, OpenCode, Gemini CLI, and Copilot from the same source tree. That is a useful signal about where the packaging layer is heading: plugins are already becoming a cross-agent distribution format, not just a Claude-only convenience.

Specialized marketplaces have emerged too. [Piebald-AI's LSP marketplace](https://github.com/Piebald-AI/claude-code-lsps) exists purely to distribute language-server plugins, which is a good example of the ecosystem fragmenting by workflow rather than by generic "plugin store" logic.

---

## How should you version a Claude Code plugin?

The most non-obvious thing about plugin versioning: **pushing a commit does not trigger an update for users.** What triggers an update is [a version bump in `plugin.json`](https://code.claude.com/docs/en/plugins-reference) — or, under the commit-SHA strategy, every push.

There are two approaches, and choosing between them is a deliberate policy decision.

### Explicit semver

Include a `version` field in `plugin.json`. Follow MAJOR.MINOR.PATCH conventions. Maintain a `CHANGELOG.md`. When you are ready to release a new version, bump the version field and push. Claude Code sees the new version and updates users who have auto-update enabled.

Under this strategy, users on a pinned version stay on that version until they explicitly update or you force a bump. This is the right model for plugins used in production workflows where stability matters.

### Commit-SHA strategy

Omit the `version` field. [Claude Code tracks the latest commit SHA.](https://code.claude.com/docs/en/plugins-reference) Every push to the repository is treated as a new version. Users always run the latest commit.

This is appropriate for development or for low-stakes plugins where you want changes to propagate without a release process. The tradeoff: there is no stable reference point. If a commit breaks something, all users are immediately affected.

### Plugin dependencies

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

The [`{plugin-name}--v{version}` git-tag convention](https://code.claude.com/docs/en/plugin-dependencies) is how Claude Code resolves semver ranges. A repository with tags `writing-tools--v2.0.0`, `writing-tools--v2.1.0`, and `writing-tools--v2.2.0` allows a downstream plugin to pin `~2.1.0` and receive patch updates while staying on the 2.x minor line.

Claude Code resolves and auto-reinstalls missing dependencies via `/reload-plugins` and background auto-update. The dependency resolution happens at install time — users who install `advanced-writing-tools` get its dependencies pulled in automatically.

---

## How do you validate a Claude Code plugin before release?

The validation sequence before any publish step:

**Step 1: Run the validator.**

```bash
claude plugin validate ./my-writing-tools --strict
```

Fix every error. Treat every warning as a potential user-facing failure. [`--strict` is the right default for a release check](https://code.claude.com/docs/en/plugins-reference) — the base validator's warning-only mode is too permissive for stable distribution. That caution is not theoretical: [one community bug report](https://www.reddit.com/r/ClaudeCode/comments/1qkygri/bug_adding_fields_to_pluginjson_silently_breaks/) documents skills and commands breaking silently after an unrecognised field was added to `plugin.json`.

**Step 2: Test locally with `--plugin-dir`.**

```bash
claude --plugin-dir ./my-writing-tools
```

Manually exercise every skill. Confirm each slash command appears in the suggestions. Trigger hooks and verify they fire. If the plugin includes MCP servers, confirm they start and respond correctly. For plugins that wrap external tooling, also verify the runtime assumptions: [Piebald-AI's LSP marketplace](https://github.com/Piebald-AI/claude-code-lsps) has to document per-language binaries and even a patch step to make Claude Code's built-in LSP support usable.

**Step 3: Test via a local marketplace.**

```bash
/plugin marketplace add ./local-marketplace
/plugin install my-writing-tools@local-marketplace
```

This simulates the full install path a user will follow. Testing with `--plugin-dir` skips the install mechanism. [Testing via a local marketplace catches install-specific issues](https://code.claude.com/docs/en/plugin-marketplaces) — missing files, incorrect source references in `plugin.json`, dependency resolution failures.

**Step 4: Inspect post-install.**

```
/plugin inspect
```

Confirms that all declared components were discovered and loaded. Any component missing here is a component that will be silently missing for users.

For CI, the minimal check is `claude plugin validate --strict` on every pull request. [More thorough pipelines run an automated install into a scratch project](https://code.claude.com/docs/en/plugins-reference) and execute a smoke test for each skill.

---

## How do you push updates to Claude Code plugin users?

Once a plugin is distributed, Claude Code handles updates in the background. When a new version is detected — either a new semver tag or a new commit SHA under the commit strategy — [Claude Code queues a reinstall](https://code.claude.com/docs/en/plugin-dependencies). The update takes effect on the next `/reload-plugins` or session start.

Users can manually trigger a marketplace catalog refresh:

```bash
claude plugin marketplace update --scope user
```

The [`--scope` flag targets a specific settings layer](https://code.claude.com/docs/en/plugin-marketplaces). Without it, the command updates the catalog for all scopes.

### Controlled rollout for teams

The enterprise pattern for staged rollouts uses two marketplace repositories and managed settings to split users into groups.

Group A receives the `stable` marketplace. Group B receives the `early-access` marketplace. The stable marketplace is updated after a validation period. The early-access marketplace is updated immediately after each release. Neither group installs anything manually — [their managed settings file declares the marketplace](https://code.claude.com/docs/en/plugin-dependencies), and Claude Code handles the rest.

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

One operational detail worth noting: if the [last-scope declaration for a marketplace is removed from settings, dependent plugins auto-uninstall](https://code.claude.com/docs/en/plugin-marketplaces) on the next sync. This is the clean removal path — no manual cleanup required from users.

---

## What breaks when building Claude Code plugins in practice?

Two community failure modes are worth keeping in mind. One is manifest fragility: [plugin authors have reported](https://www.reddit.com/r/ClaudeCode/comments/1qkygri/bug_adding_fields_to_pluginjson_silently_breaks/) that an unrecognised `plugin.json` field can break skills and commands silently if it slips through.

The other is context bloat. A widely shared [community PSA](https://www.reddit.com/r/ClaudeAI/comments/1rij9tr/psa_your_claude_code_plugins_are_probably_loading/) traced repeated compaction to plugins loading every skill twice, with the practical fix being to audit enabled plugins and disconnect MCP connectors you are not using for the current project.

---

## Closing thoughts

The plugin system is a graduation, not a foundation.

Everything in this post assumes you already have working skills, agents, hooks, or MCP configurations. Plugins are what you reach for after those components are stable and you need to share them. The [Anthropic documentation](https://code.claude.com/docs/en/plugins) describes the recommended arc clearly: iterate as standalone configuration, then package into a plugin once the workflow is proven. Skipping that step — reaching for the plugin format before the underlying components are solid — adds overhead without benefit.

**Plugins pay off under three conditions.** First, when the same configuration needs to live in more than one project. A plugin eliminates the copy-paste problem and gives you a single source of truth with a version history. Second, when distribution across teammates requires reproducibility. Everyone on the team installs the same version; updates propagate through a controlled path rather than a shared folder. Third, when you are building for external users or contributing to the community marketplace, where the install experience matters.

**Plugins add overhead that is not worth it** for solo practitioners maintaining a single project. A well-structured `.claude/` folder with skills, rules, and hooks is entirely sufficient. There is no capability gap between standalone and packaged — only a distribution gap.

The key move this system enables is treating Claude Code configuration the way you treat code: versioned, tested, distributed, and maintained with the same rigour you would apply to any shared library. That shift — from `.claude/` folder to installable, versionable package — is what the plugin format makes possible.

---

## Now, I want to hear from you

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

[6] [Announcing the Postman Plugin for Claude Code — Postman Blog](https://blog.postman.com/announcing-the-postman-plugin-for-claude-code/) — A vendor write-up explaining why Postman packaged its Claude Code integration as a plugin, how it bundles MCP configuration with commands and skills, and the real API workflows it enables.

[7] [Postman Plugin for Claude Code — GitHub](https://github.com/Postman-Devrel/postman-claude-code-plugin) — A real multi-component plugin repo with `.claude-plugin/plugin.json`, `.mcp.json`, commands, skills, and an agent in one package.

[8] [engram/docs/PLUGINS.md — GitHub](https://github.com/Gentleman-Programming/engram/blob/main/docs/PLUGINS.md) — Implementation notes for a real plugin, including PowerShell fallback hooks for locked-down Windows environments.

[9] [docker/claude-plugins — GitHub](https://github.com/docker/claude-plugins) — A focused third-party marketplace repo showing how a company can publish a narrow, domain-specific Claude Code plugin catalog.

[10] [feed-mob/claude-code-marketplace — GitHub](https://github.com/feed-mob/claude-code-marketplace) — A team-run marketplace with real plugin install flows, mixed component types, and a concrete `marketplace.json` structure in the wild.

[11] [wshobson/agents — GitHub](https://github.com/wshobson/agents) — A large community marketplace with 84 Claude Code plugins and a notable cross-harness generation strategy spanning Claude Code, Codex, Cursor, OpenCode, Gemini CLI, and Copilot.

[12] [Piebald-AI/claude-code-lsps — GitHub](https://github.com/Piebald-AI/claude-code-lsps) — A dedicated LSP-plugin marketplace that adds practical evidence about runtime dependencies, validation workflows, and specialized plugin distribution.

[13] [danielrosehill/Claude-Code-Plugins — GitHub](https://github.com/danielrosehill/Claude-Code-Plugins) — A large personal marketplace that organizes plugins by role and workflow, illustrating how the community is curating bundles rather than only one-off plugins.

[14] [[Bug] Adding fields to plugin.json silently breaks skills and commands — Reddit](https://www.reddit.com/r/ClaudeCode/comments/1qkygri/bug_adding_fields_to_pluginjson_silently_breaks/) — A community bug report documenting a real manifest failure mode that reinforces why strict validation matters before release.

[15] [# PSA: Your Claude Code plugins are probably loading every skill TWICE — here's how to check and fix it — Reddit](https://www.reddit.com/r/ClaudeAI/comments/1rij9tr/psa_your_claude_code_plugins_are_probably_loading/) — A community debugging write-up linking duplicated plugin skill loads to context compaction and offering concrete mitigation steps.
