# Newsletter Engine

A repo-based, Claude-first writing system for creating blog and newsletter content. Specialised agents handle brainstorming, research, drafting, SEO, and promotion — coordinated by Claude across a predictable folder structure.

---

## Pipeline

```mermaid
flowchart LR
    A([notes.md]) --> B["/brainstorm"]
    B --> C["/research"]
    C --> D["/draft"]
    D --> E["/seo"]
    E --> F["/revise"]
    F --> G["/promote"]
    G --> H([bundle])
```

Each skill is independently invocable. `/new-post` chains all stages unattended.

| Stage | Produces |
|-------|----------|
| `/brainstorm` | `post.yaml` |
| `/research` | `research_brief.md` |
| `/draft` | `outline.md`, `long_draft.md` |
| `/seo` | `seo_brief.md` |
| `/revise` | `long_draft.md` (revised), `long_draft_v1.md` (backup) |
| `/promote` | `promotion_posts.md` |

---

## Repo Structure

```
newsletter-engine/
├── .claude/
│   ├── CLAUDE.md                  # Session context and repo index
│   ├── rules/                     # Behavioural rules, auto-loaded
│   └── skills/                    # Skill instruction files
│       ├── import-pdf/            # /import-pdf
│       ├── new-post/              # /new-post — full pipeline orchestrator
│       ├── brainstorm/            # /brainstorm
│       ├── research/              # /research
│       ├── draft/                 # /draft
│       ├── seo/                   # /seo
│       ├── revise/                # /revise
│       └── promote/               # /promote
├── reference-docs/
│   ├── prd-v1.md                  # Full product requirements
│   └── milestones-v1.md           # Milestone plan and definitions of done
├── reference_posts/               # Jose's real posts for style grounding
│   ├── series/
│   ├── standalone/
│   └── short_technical/
├── style_guide/
│   ├── shared/                    # voice.md, anti_patterns.md
│   ├── types/                     # Per-type structure rules
│   └── promotion_formats.md       # Launch post + section deep-dive templates
├── templates/                     # post.yaml template, notes.md placeholder
└── posts/
    └── <slug>/
        ├── post.yaml              # Shared state — brainstorm output + pipeline stage flags
        ├── notes.md
        ├── research_brief.md
        ├── outline.md
        ├── long_draft.md
        ├── long_draft_v1.md       # Pre-revision backup (created by /revise)
        ├── seo_brief.md
        ├── promotion_posts.md
        └── decision_log.md        # Append-only pipeline run log
```

---

## Requirements

| Requirement | Purpose | Install |
|-------------|---------|---------|
| [Claude Code](https://claude.ai/code) | Primary interface | See Claude Code docs |
| `context-mode` MCP | Context window management | See Claude Code MCP docs |
| `WebSearch` tool | Grounded research | Built into Claude Code |
| `poppler` | PDF → text conversion for `/import-pdf` | `brew install poppler` |

---

## Milestones

| Milestone | Skill | Status |
|-----------|-------|--------|
| M0 — Foundation | — | ✓ Complete |
| M1 — Brainstorm | `/brainstorm` | ✓ Complete |
| M2 — Research | `/research` | ✓ Complete |
| M3 — Draft | `/draft` | ✓ Complete |
| M4 — SEO | `/seo` | ✓ Complete |
| M5 — Promotion | `/promote` | ✓ Complete |
| M6 — Full Pipeline | `/revise` + `/new-post` | ✓ Complete |
| M7 — Ideation | `/ideate` | Next |

See [reference-docs/milestones-v1.md](reference-docs/milestones-v1.md) for the full plan.
