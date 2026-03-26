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
newsletter-engine/                        (M0)
├── .claude/
│   ├── CLAUDE.md                  # Session context and repo index
│   └── rules/                     # Behavioural rules, auto-loaded
├── README.md
├── reference-docs/
│   ├── prd-v1.md                  # Full product requirements
│   └── milestones-v1.md           # Milestone plan and definitions of done
├── reference_posts/               # Jose's real posts for style grounding
│   ├── series/
│   ├── standalone/
│   └── short_technical/
├── style_guide/                   # Codified voice and per-type structure rules
│   ├── shared/                    # voice.md, anti_patterns.md (all types)
│   └── types/                     # management.md, paper-explainer.md, book-review.md, series-genai.md
└── scratch/                       # Experiments and temporary drafts

                                          (M1+)
├── agents/                        # Agent instruction files (one per skill)
├── templates/                     # Post folder template
└── posts/
    └── <post-slug>/
        ├── post.yaml
        ├── notes.md
        ├── research_brief.md
        ├── outline.md
        ├── long_draft.md
        ├── seo_brief.md
        ├── titles.md
        ├── linkedin_posts.md
        └── substack_promos.md
```

---

## Requirements

| Requirement | Purpose | Install |
|-------------|---------|---------|
| [Claude Code](https://claude.ai/code) | Primary interface | See Claude Code docs |
| `context-mode` MCP | Context window management | See Claude Code MCP docs |
| `WebSearch` tool | Grounded research (M2+) | Built into Claude Code |
| `poppler` | PDF → text conversion for reference post import | `brew install poppler` |

---

## Active Milestone

**M0 — Complete.** Scaffold, reference corpus (31 posts), and style guide all done.
**Next: M1** — `/brainstorm` skill, `post.yaml` schema, and `/draft` stub.
See [reference-docs/milestones-v1.md](reference-docs/milestones-v1.md) for the full plan.
