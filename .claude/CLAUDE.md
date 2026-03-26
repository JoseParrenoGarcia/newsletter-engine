# Newsletter Engine

A repo-based, Claude-first writing system for creating blog and newsletter content. Claude operates from durable repo files rather than chat memory, coordinating specialised agents across a repeatable content workflow.

**Primary user:** Jose
**Active milestone:** M0 — Complete ✓ | M1 — Complete ✓ | Next: M2

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
| `style_guide/` | Voice, anti-patterns (shared/), plus per-type rules for management, paper-explainer, book-review, series-genai | **Done (M0)** |
| `.claude/agents/` | Custom subagent definitions (one per agent) | M1+ |
| `templates/` | Post folder template (`post.yaml`, `notes.md`, `placeholder.md`) | **Done (M1)** |
| `posts/` | Per-post working folders with artefacts | M1+ |
| `tasks/` | Planning docs, specs, lessons | Active |
| `scratch/` | Experiments, prompt testing, temporary drafts | Ongoing |

---

## Available Skills

| Skill | Description | Status |
|-------|-------------|--------|
| `/import-pdf` | Convert a PDF reference post to clean markdown | **Live (M0)** |
| `/new-post` | Creates post folder + kicks off brainstorm | **Live (M1 stub)** → M6 (full) |
| `/brainstorm` | Interactive brainstorm → `post.yaml` + expanded notes | **Live (M1)** |
| `/research` | Web-grounded research brief | M2 |
| `/draft` | Outline + long-form draft | M3 |
| `/seo` | SEO brief + title variants (any draft) | M4 |
| `/promote` | LinkedIn + Substack bundle (any draft) | M5 |
| `/ideate` | Trend-aware content ideas, standalone | M7 |

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
