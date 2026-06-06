## Launch Post
> **Why this post:** Plugins reframe everything Claude Code users already do — packaging, not new capability — and that distinction changes how teams build and maintain them.

🗞️ New post is live! Most Claude Code Users Are Just Copying Folders. There's a Better Way.

Claude Code plugins are not a new capability — they are the packaging and distribution layer for everything you already build with CLAUDE.md, skills, hooks, and agents.
That reframe changes everything about how you build, version, and maintain them.

What's inside:
🔹 What a plugin actually is — the six component families and why wrapping beats copying
🔹 The two versioning strategies — semver vs commit-SHA, and when the wrong choice breaks your team silently
🔹 The four-step validation sequence before any release — and why `--plugin-dir` alone isn't enough

💬 How are you currently sharing Claude Code customisations across projects — copying files, symlinking, or something else entirely?
👇 [link]

---

## Deep-dive 1: What Are Claude Code Plugins? — Primitives vs Packaging
> **Why this section:** The primitives-vs-packaging distinction is a single standalone claim that reframes how experienced Claude Code users think about a system they already use — strong hook, zero prior context required.

A Claude Code plugin is not a new capability. It is a packaging and distribution format for capabilities you already build.

This distinction matters more than it sounds. When you copy your `.claude/` folder across projects, you are doing plugin work manually — without versioning, without install/uninstall mechanics, and with no way to push updates.

Let's break it down:
🔹 Six component families, one wrapper → Skills, agents, hooks, MCP servers, LSP servers, and monitors all live inside a plugin using the same directory paths they would occupy in any `.claude/` folder
👉 Nothing you already know becomes obsolete — the plugin format wraps existing conventions, it does not replace them
🔹 The `plugin.json` manifest is the distribution contract → It declares the plugin name, version, author, dependencies, and which components are included — everything a consuming environment needs to install and load correctly
👉 In practice, a manifest with a missing or mistyped field causes a silent load failure — one the user sees as "skill not available" without knowing why
🔹 Plugins are installable and versionable — folders are neither → Installing from a marketplace pins a version, enables rollback, and lets Claude Code manage updates automatically; a copied folder does none of that
👉 At team scale, the difference between "everyone has the latest prompt rubric" and "everyone has a different version from whenever they last copied the folder" is the difference between a tool and a liability

If you have ever told a teammate "just copy my `.claude/skills/` folder", you have already built the use case for a plugin.

💬 How many times have you ended up with three versions of the same prompt file spread across different projects?
👇 [link]

---

## Deep-dive 2: How Do You Build a Claude Code Plugin? — Directory Structure and Manifest
> **Why this section:** Concrete scaffold commands, a real directory tree, and the `--plugin-dir` local test loop give this section three extractable insights with immediate practical value.

Most tools that claim to have a "zero-config" setup mean "we hid the config from you." Claude Code plugins are genuinely low-friction — the scaffold command produces a working structure in one step.

Let's break it down:
🔹 One scaffold command, correct layout → `claude plugin create my-plugin --with skill --with hook` produces the full directory structure, placeholder files, and a pre-populated `plugin.json` in one step — no manual wiring required
👉 This matters because incorrect directory layout causes load failures that are frustrating to diagnose; starting from the scaffold eliminates that entire category of error
🔹 Test locally without installing → `claude --plugin-dir ./my-plugin` activates the plugin for a single session only — skills appear as slash commands, hooks fire, nothing is written to settings
👉 In practice this means your entire development loop is iterate → test → validate with no install/uninstall overhead and no risk of polluting your global settings
🔹 Two runtime environment variables make path references portable → `CLAUDE_PLUGIN_ROOT` points to the directory containing `plugin.json`; `CLAUDE_PLUGIN_DATA` points to a persistent per-plugin data directory separate from the source
👉 Without these, hooks and scripts hardcode paths that break the moment someone installs the plugin in a different location — these variables are the difference between a plugin that works for you and one that works for anyone

The `--plugin-dir` loop is the part that makes plugin development feel fast. You are never waiting for an install cycle.

💬 What is your current development loop for testing Claude Code customisations before you share them with your team?
👇 [link]

---

## Deep-dive 3: How Do You Validate a Claude Code Plugin Before Release?
> **Why this section:** A four-step sequence with concrete commands, a meaningful distinction between two test modes, and a CI recommendation — three distinct extractable insights, each with a clear real-world failure it prevents.

Shipping a Claude Code plugin without running the full validation sequence is how you discover, in production, that a component silently never loaded.

The validator catches manifest errors. It does not catch install-path failures. Those require a different test entirely.

Let's break it down:
🔹 `--strict` is the right default for release — base mode is too permissive → The base validator flags type mismatches that would cause load errors; `--strict` promotes unrecognised-field warnings to errors, catching likely-typo field names that would otherwise reach users silently
👉 A warning-only failure in a shared plugin means every user on your team gets a degraded experience — and no one gets an error message explaining why
🔹 `--plugin-dir` and a local marketplace test different things → `--plugin-dir` bypasses the install mechanism entirely; testing via a local marketplace (`/plugin marketplace add ./local-marketplace` → `/plugin install my-plugin@local-marketplace`) simulates the exact path a user will follow
👉 Issues that only appear through the install path — missing files, incorrect source references in `plugin.json`, dependency resolution failures — are invisible under `--plugin-dir` alone
🔹 `/plugin inspect` post-install is the final gate → This command confirms that all declared components were discovered and loaded; any component missing here is a component that will be silently missing for users
👉 At scale, "silently missing" compounds: a team of ten people each missing a hook they thought was active is ten separate debugging sessions, none of which point to the plugin manifest

The minimal CI check is `claude plugin validate --strict` on every pull request. That alone eliminates the whole class of manifest errors before they reach users.

💬 Have you ever shipped a tool or config to your team and only found out it was broken when someone else tried to use it?
👇 [link]
