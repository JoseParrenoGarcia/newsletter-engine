# Newsletter Engine

A repo-based, Claude-first writing system for creating blog and newsletter content. Specialised agents handle brainstorming, research, drafting, SEO, and promotion — coordinated by Claude across a predictable folder structure.

---

## Pipeline

```mermaid
flowchart TD
    PDF([PDF]) --> IP["/import-pdf"]
    IP --> RP([reference_posts/])

    NOTES([notes.md]) --> NP

    subgraph NP ["/new-post  ·  stage-skip orchestrator"]
        B["/brainstorm"] --> C["/research"]
        C --> D["/draft"]
        D --> E["/seo"]
        E --> F["/revise"]
        F --> RLOOP

        subgraph RLOOP ["/review  ·  max 3 iterations"]
            direction LR
            G["/review"] --> VRD{Verdict?}
            VRD -- "Not ready · fix + retry" --> G
        end

        VRD -- Ready --> PR["/promote"]
        PR --> IDX["/index"]
    end

    G -.->|spawns| CRITICS(["voice-critic · structure-critic · impact-critic"])
    CRITICS -.->|verdicts| G

    PR --> BUNDLE([promotion_posts.md])
    IDX --> IDXF([posts/INDEX.md])

    classDef skill fill:#4A90D9,stroke:#2C5F8A,color:#fff
    classDef agent fill:#F5A623,stroke:#C47D0E,color:#fff
    class B,C,D,E,F,G,PR,IP,IDX skill
    class CRITICS agent
```

Each skill is independently invocable. `/new-post` chains all stages unattended with stage-skip logic. `/import-pdf` is a standalone utility for importing reference posts.

| Stage | Produces |
|-------|----------|
| `/brainstorm` | `post.yaml` |
| `/research` | `research_brief.md` |
| `/draft` | `outline.md`, `long_draft.md` |
| `/seo` | `seo_brief.md` |
| `/revise` | `long_draft.md` (revised), `long_draft_pre-revise.md` (backup), `seo_brief.md` (section 12 appended) |
| `/review` | `review_report.md` |
| `/promote` | `promotion_posts.md` |
| `/new-post` | `decision_log.md`, `skill_reflection_log.md` (via hooks) |
| `/index` | `posts/INDEX.md` (TOC row appended), `posts/index/<topic>.md` (card appended) |

---

## Repo Structure

```
newsletter-engine/
├── CLAUDE.md                      # Architectural principles, repo index, skill list
├── .claude/
│   ├── rules/                     # Behavioural rules, auto-loaded
│   ├── agents/                    # Critic agent definitions (voice, structure, impact)
│   ├── hooks/                     # Automation hooks (skill-reflector, detect-skill-complete)
│   └── skills/                    # Skill instruction files
│       ├── import-pdf/            # /import-pdf
│       ├── new-post/              # /new-post — full pipeline orchestrator
│       ├── brainstorm/            # /brainstorm
│       ├── research/              # /research
│       ├── draft/                 # /draft
│       ├── seo/                   # /seo
│       ├── revise/                # /revise
│       ├── review/                # /review — multi-agent editorial gate
│       ├── promote/               # /promote
│       └── index/                 # /index — post ledger
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
    ├── INDEX.md                   # TOC only — topic overview for agents (~50 lines)
    ├── index/                     # Per-topic card files (detailed summaries + paths)
    │   ├── claude-code.md
    │   ├── paper-explainers.md
    │   ├── ai-tools-adoption.md
    │   ├── data-science-leadership.md
    │   └── data-science-future-of-work.md
    └── <slug>/
        ├── post.yaml              # Shared state — brainstorm output + pipeline stage flags
        ├── notes.md
        ├── research_brief.md
        ├── outline.md
        ├── long_draft.md
        ├── long_draft_pre-revise.md  # Pre-revision backup (created by /revise)
        ├── seo_brief.md
        ├── review_report.md       # Panel consensus + 6-dimension scores (created by /review)
        ├── promotion_posts.md
        ├── decision_log.md        # Append-only pipeline run log
        └── skill_reflection_log.md  # Appended by skill-reflector hook after each stage
```

---

## Requirements

| Requirement | Purpose | Install |
|-------------|---------|---------|
| [Claude Code](https://claude.ai/code) | Primary interface | See Claude Code docs |
| `context-mode` plugin | Context window management | See Claude Code MCP docs |
| Chrome DevTools MCP | Browser automation for research | Built into Claude Code |
| `rtk` | Token-optimised Bash proxy | See global CLAUDE.md |
| `poppler` | PDF → text conversion for `/import-pdf` | `brew install poppler` |

---

See `CLAUDE.md` for architectural principles.
