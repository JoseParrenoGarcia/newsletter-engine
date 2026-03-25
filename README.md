# Newsletter Engine

A repo-based, Claude-first writing system for creating blog and newsletter content. Specialised agents handle brainstorming, research, drafting, SEO, and promotion — coordinated by Claude across a predictable folder structure.

---

## Pipeline

```mermaid
graph LR
    A[rough notes] --> B[/brainstorm]
    B --> C[post.yaml]
    C --> D[/research]
    D --> E[research_brief.md]
    E --> F[/draft]
    F --> G[long_draft.md]
    G --> H[/seo]
    G --> I[/promote]
    H --> J[seo_brief.md + titles.md]
    I --> K[linkedin_posts.md + substack_promos.md]
```

Each skill is independently invocable. `/new-post` chains the full pipeline.

---

## Repo Structure

```
newsletter-engine/
├── CLAUDE.md                  # Claude session context and repo index
├── README.md
├── reference-docs/
│   ├── prd-v1.md              # Full product requirements
│   └── milestones-v1.md       # Milestone plan and definitions of done
├── reference_posts/           # Jose's real posts used for style grounding
│   ├── series/
│   ├── standalone/
│   └── short_technical/
├── style_guide/               # Codified voice, structure, and anti-patterns
├── agents/                    # Agent instruction files (one per skill)
├── templates/                 # Post folder template
├── posts/                     # Per-post working folders
│   └── <post-slug>/
│       ├── post.yaml
│       ├── notes.md
│       ├── research_brief.md
│       ├── outline.md
│       ├── long_draft.md
│       ├── seo_brief.md
│       ├── titles.md
│       ├── linkedin_posts.md
│       └── substack_promos.md
└── scratch/                   # Experiments and temporary drafts
```

---

## Requirements

| Requirement | Purpose |
|-------------|---------|
| [Claude Code](https://claude.ai/code) | Primary interface |
| `context-mode` MCP | Context window management |
| `WebSearch` tool | Grounded research (M2+) |

---

## Active Milestone

**M0 — Foundation:** Scaffold + style system seeded with real posts.
See [reference-docs/milestones-v1.md](reference-docs/milestones-v1.md) for the full plan.
