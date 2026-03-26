# Newsletter Engine

A repo-based, Claude-first writing system for creating blog and newsletter content. Claude operates from durable repo files rather than chat memory, coordinating specialised agents across a repeatable content workflow.

**Primary user:** Jose
**Active milestone:** M0 — Foundation

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
| `style_guide/` | Codified voice, structure, intro/closing patterns, anti-patterns | M0 |
| `agents/` | Agent instruction files (one per skill) | M1+ |
| `templates/` | Post folder template and prompt templates | M1 |
| `posts/` | Per-post working folders with artefacts | M1+ |
| `scratch/` | Experiments, prompt testing, temporary drafts | Ongoing |

---

## Available Skills

None yet. Skills are added as milestones complete.

| Skill | Description | Introduced |
|-------|-------------|------------|
| `/new-post` | Orchestrates full or partial pipeline | M1 (stub) → M6 (full) |
| `/brainstorm` | Interactive brainstorm → `post.yaml` | M1 |
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
