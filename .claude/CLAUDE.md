# Newsletter Engine

A repo-based, Claude-first writing system for creating blog and newsletter content. Claude operates from durable repo files rather than chat memory, coordinating specialised agents across a repeatable content workflow.

**Primary user:** Jose
**Active milestone:** M0 — Complete ✓ | M1 — Complete ✓ | M2 — Complete ✓ | M3 — Complete ✓ | M4 — Complete ✓ | M5 — Complete ✓ | M6 — Complete ✓ | M7 — Complete ✓ | M8 — In Progress (ideate pending)

---

## Reference Docs

- `reference-docs/prd-v1.md` — full product requirements and design decisions
- `reference-docs/milestones-v1.md` — milestone plan, definitions of done, architectural principles

---

## Repo Index

| Directory | Purpose | Status |
|-----------|---------|--------|
| `reference-docs/` | PRD, milestones, planning docs | Active |
| `reference_posts/` | Jose's real posts (series, standalone, short_technical) | M0 |
| `style_guide/` | Voice, anti-patterns (shared/), per-type rules, promotion_formats.md | **Done (M0, M5)** |
| `.claude/skills/` | Skill instruction files (one per skill) | M1+ |
| `.claude/agents/` | Critic agent definitions invoked by `/review` (voice, structure, impact) | **Live (M7)** |
| `.claude/hooks/` | Automation hooks: skill-reflector (reflection log), detect-skill-complete | **Live (M7)** |
| `.claude/rules/` | Behavioural guardrails, auto-loaded each session | Active |
| `templates/` | Post folder template (`post.yaml`, `notes.md`, `placeholder.md`) | **Done (M1)** |
| `posts/` | Per-post working folders with artefacts | M1+ |

---

## Available Skills

| Skill | Description | Status |
|-------|-------------|--------|
| `/import-pdf` | Convert a PDF reference post to clean markdown | **Live (M0)** |
| `/new-post` | Full pipeline orchestrator — new post or `--from-draft` mode | **Live (M6 full)** |
| `/brainstorm` | Interactive brainstorm → `post.yaml` + expanded notes | **Live (M1)** |
| `/research` | Validate + enrich URLs, fill gaps, write `research_brief.md` | **Live (M2)** |
| `/draft` | Style-grounded outline + long-form draft | **Live (M3)** |
| `/seo` | SEO brief + title variants (any draft) | **Live (M4)** |
| `/revise` | SEO-driven draft revision (any draft + brief pair) | **Live (M6)** |
| `/review` | 3-critic multi-agent debate → 6-dimension rubric + panel consensus + publish readiness verdict | **Live (M7)** |
| `/promote` | LinkedIn + Substack bundle (any draft) | **Live (M5)** |
| `/ideate` | Trend-aware content ideas, standalone | Pending (M8) |

---

## Required MCPs / Plugins

| Tool | Purpose | Required from |
|------|---------|---------------|
| `context-mode` | Context window management | Now |
| `WebSearch` | Grounded research with real URLs | M2 |

---

## Rules

Behavioural and maintenance rules live in `.claude/rules/` and are loaded automatically:

- `.claude/rules/core-rules.md` — content, workflow, and writing guardrails
- `.claude/rules/maintenance-rules.md` — what to update when significant changes happen
