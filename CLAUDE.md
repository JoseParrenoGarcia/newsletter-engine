# Newsletter Engine

A repo-based, Claude-first writing system for creating blog and newsletter content. Claude operates from durable repo files rather than chat memory, coordinating specialised agents across a repeatable content workflow.

**Primary user:** Jose

---

## Architectural Principles

These govern every skill and orchestration design decision:

1. **File-based I/O contracts** — each skill reads from and writes to a predictable set of files. No skill reaches outside its contract. This is what makes both independent and orchestrated invocation possible.
2. **`post.yaml` is the nervous system** — it is the shared state that every skill reads from and appends to. It is not just metadata — it is the message bus.
3. **Every skill is standalone first** — skills like `/seo` and `/promote` must work on any draft, whether produced by the pipeline or written by Jose independently. No skill should require the full pipeline to have run first.
4. **The orchestrator grows incrementally** — `/new-post` chains only what is available at any point. Each milestone extends it. Separation from the individual skills is maintained throughout.
5. **Separation of concerns** — each skill has one job; the orchestrator has one job (sequencing). This enables triggering any step independently or running the full pipeline end-to-end unattended.

---

## Repo Index

| Directory | Purpose |
|-----------|---------|
| `reference_posts/` | Jose's real posts (series, standalone, short_technical) |
| `style_guide/` | Voice, anti-patterns (shared/), per-type rules, promotion_formats.md |
| `.claude/skills/` | Skill instruction files (one per skill) |
| `.claude/agents/` | Critic agent definitions invoked by `/review` (voice, structure, impact) |
| `.claude/hooks/` | Automation hooks: skill-reflector (reflection log), detect-skill-complete |
| `.claude/rules/` | Behavioural guardrails, auto-loaded each session |
| `templates/` | Post folder template (`post.yaml`, `notes.md`, `placeholder.md`) |
| `posts/` | Per-post working folders with artefacts |

---

## Available Skills

| Skill | Description |
|-------|-------------|
| `/import-pdf` | Convert a PDF reference post to clean markdown |
| `/new-post` | Full pipeline orchestrator — new post or `--from-draft` mode |
| `/brainstorm` | Interactive brainstorm → `post.yaml` + expanded notes |
| `/research` | Validate + enrich URLs, fill gaps, write `research_brief.md` |
| `/draft` | Style-grounded outline + long-form draft |
| `/seo` | SEO brief + title variants (any draft) |
| `/revise` | SEO-driven draft revision + post-revision SEO verification (any draft + brief pair) |
| `/review` | 3-critic multi-agent debate → 6-dimension rubric + panel consensus + publish readiness verdict |
| `/promote` | LinkedIn + Substack bundle (any draft) |
| `/ideate` | Trend-aware content ideas, standalone — pending |

---

## Required MCPs / Plugins

| Tool | Purpose |
|------|---------|
| `context-mode` | Context window management — `ctx_fetch_and_index`, `ctx_execute`, `ctx_search` |
| Chrome DevTools MCP | Browser automation for research gap-filling (DuckDuckGo searches via `new_page`, `fill`, `press_key`) |
| `rtk` | Token-optimised Bash proxy — rewrites all Bash commands transparently via `BASH_ENV` hook |

---

## Rules

Behavioural and maintenance rules live in `.claude/rules/` and are loaded automatically:

- `.claude/rules/core-rules.md` — content, workflow, and writing guardrails
- `.claude/rules/maintenance-rules.md` — what to update when significant changes happen
