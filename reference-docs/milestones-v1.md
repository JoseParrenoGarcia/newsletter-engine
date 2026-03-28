# Newsletter Engine — Milestone Plan v1

**Status:** Approved
**Last updated:** 2026-03-27
**Context:** Companion to `prd-v1.md`. Defines the phased build plan, architectural principles, and definition of done for each milestone.

---

## Architectural Principles

Before milestones, these principles govern every build decision:

**1. File-based I/O contracts**
Each agent skill reads from a predictable set of files and writes to a predictable set of files. No agent reaches outside its contract. This is what makes both independent and orchestrated invocation possible.

**2. The metadata YAML is the nervous system**
`post.yaml` inside each post folder is the shared state that every agent reads from and appends to. It is not just metadata — it is the message bus. Getting its schema right in M1 is the most important single design decision in the system.

**3. Every skill is standalone first**
Skills like `/seo` and `/promote` must work on any draft — whether produced by the pipeline or written by Jose independently. No skill should require the full pipeline to have run first.

**4. The orchestrator grows incrementally**
A basic `/new-post` skill exists from M1, initially chaining only what is available at that point. Each subsequent milestone extends it. The full pipeline in M6 is not a new thing — it is the matured version of what started in M1.

**5. Separation of concerns from the start**
Each skill has one job. The orchestrator has one job: sequencing. This mirrors software engineering's separation of concerns principle and is what enables the "both worlds" capability — trigger any step independently, or let the pipeline run end-to-end unattended.

---

## Milestone Overview

| # | Name | Core Capability | Entry Skill |
|---|------|-----------------|-------------|
| M0 | Foundation | Scaffold + style system seeded with real posts | — |
| M1 | Brainstorm + Metadata | Structured brainstorm producing rich `post.yaml` | `/brainstorm` |
| M2 | Research | Web-grounded research brief with real sources | `/research` |
| M3 | Draft | TOC + full structured long-form draft | `/draft` |
| M4 | SEO + Titles | SEO brief + title variants from any draft | `/seo` |
| M5 | Promotion | LinkedIn + Substack bundle from any draft | `/promote` |
| M6 | Full Pipeline | End-to-end run from notes to full bundle | `/new-post` |
| M7 | Content Ideation | Trend-aware topic ideas independent of any post | `/ideate` |

---

## M0 — Foundation

**Goal:** Create the minimum working base that gives Claude enough context and examples to produce non-generic output from day one.

**What to build:**
- Repo directory structure for `reference_posts/`, `style_guide/`, `agents/`, `posts/`, `templates/`
- Import Jose's existing posts (from PDF) into `reference_posts/` as markdown files, organised by type (series, standalone, short_technical)
- Write initial `style_guide/` documents based on reading those real posts — not placeholders
- Write a concise `CLAUDE.md` at repo root that contains minimum required session context and uses file references (not inline content) to point at style guides and reference posts

**What NOT to build:**
- Scaffolding for milestones not yet reached
- Agent instruction files not yet needed
- Template files for post artefacts (that comes in M1)

**Definition of done:**
- Real reference posts are in the repo and readable by Claude
- `CLAUDE.md` loads and gives Claude enough context to know the system's purpose, structure, and style constraints
- A test prompt ("write an intro in Jose's style about topic X") produces output that is noticeably less generic than a cold Claude prompt

---

## M1 — Brainstorm + Metadata ✓ Complete (2026-03-26)


**Goal:** Go from rough notes to a rich, structured `post.yaml` that every subsequent agent can use as its starting point.

**What to build:**
- `/brainstorm` skill that runs an interactive brainstorm session from rough notes
- `post.yaml` schema — the shared state contract for the whole system. Fields to include at minimum:
  - post type (series / standalone / short_technical)
  - working title
  - core argument / thesis
  - target audience
  - key topics to cover
  - key topics to exclude
  - relevant reference posts (pointers to files in `reference_posts/`)
  - relevant style guides (pointers to files in `style_guide/`)
  - open research questions
  - brainstorm summary
  - pipeline stage tracking (which agents have run)
- Post folder template: `posts/<slug>/` with `notes.md`, `post.yaml`, and empty artefact placeholders
- Basic `/new-post` stub that creates the folder and runs `/brainstorm`

**What NOT to build:**
- The research, drafting, or promotion logic — that comes later
- Full pipeline orchestration

**Definition of done:**
- From a set of rough notes, `/brainstorm` produces a completed `post.yaml` with all fields populated
- The YAML is rich enough that a human reading it could continue the workflow without asking Jose any more questions
- The basic `/new-post` creates the folder structure and kicks off brainstorm

---

## M2 — Research ✓ Complete (2026-03-27)


**Goal:** Enrich the topic with grounded, web-sourced supporting material before drafting begins.

**What to build:**
- `/research` skill that reads `post.yaml` and `notes.md`, runs web research, and writes `research_brief.md`
- `research_brief.md` contains: relevant external references (real URLs), key supporting points, suggested inclusions, suggested exclusions, identified gaps in the original notes
- Hallucination guard: all external references must include a URL or be explicitly flagged as "from model knowledge, not verified"
- Update `post.yaml` to mark research stage as complete and point to `research_brief.md`
- Extend `/new-post` to chain `/research` after `/brainstorm`

**What NOT to build:**
- Fact-checking automation
- Deep citation management

**Definition of done:**
- `/research` produces a brief with at least 3–5 real, inspectable external references
- Every reference has a URL or an explicit uncertainty flag
- The brief surfaces at least one angle or point not present in the original notes

---

## M3 — Draft ✓ Complete (2026-03-27)

**Goal:** Generate a structured, styled long-form draft that is materially closer to Jose's voice than a cold AI prompt.

**What to build:**
- `/draft` skill that reads `post.yaml`, `research_brief.md`, `notes.md`, and loads relevant style guides and reference posts specified in `post.yaml`
- Outputs `outline.md` (table of contents + section bullets) and `long_draft.md` (full article)
- Draft follows the structural conventions from `style_guide/` and mirrors tone from the referenced example posts
- Update `post.yaml` to mark draft stage complete and point to both artefacts
- Extend `/new-post` to chain `/draft` after `/research`

**Anti-patterns to explicitly guard against:**
- Generic AI filler phrases
- Inventing references not present in `research_brief.md`
- Ignoring the outline structure mid-draft

**Definition of done:**
- Draft covers all sections in the outline
- Jose's manual editing requirement is noticeably lower than a cold AI draft
- No hallucinated references — everything cited is in `research_brief.md` or flagged as model knowledge

---

## M4 — SEO + Titles ✓ Complete (2026-03-28)

**Goal:** Produce advisory SEO improvements and engagement-optimised title variants without compromising writing quality. Works on any draft, including posts Jose wrote himself.

**What was built:**
- `/seo` skill that reads `long_draft.md` (+ `post.yaml` and `research_brief.md` when available) and writes `seo_brief.md`
- `seo_brief.md` contains: extracted keywords, meta description, URL slug recommendation, H1/H2 structure review, keyword placement checklist (X/5), readability assessment, 5 title variants (one per style), and top 3 Quick Wins
- Title styles: keyword-first, curiosity-gap, how-to, contrarian, authority — each with a suggested subtitle
- Platform: Medium-first (title length limits, readability targets calibrated for Medium)
- Keyword research: extracted from draft content + thesis — no live API; future milestone to add keyword volume via Google Search Console / DataForSEO
- Skill works standalone: `post.yaml` is optional; if absent, runs on `long_draft.md` alone

**Guardrails:**
- No invented keyword trends or fake "search volume" claims — limitation flagged explicitly in brief
- Titles must be accurate to the content — clickbait drift is prohibited
- Stage guard prevents silent overwrites

**Definition of done:**
- `/seo` runs on any draft without needing the full pipeline to have run
- `seo_brief.md` is generated with all sections present
- Keyword placement score (X/5) and readability verdict are specific, not generic
- 5 title variants present with subtitles
- At least one title variant is meaningfully better than the working title

---

## M5 — Promotion ✓ Complete (2026-03-28)

**Goal:** Generate platform-ready promotional posts from any completed draft. Works standalone.

**What was built:**
- `/promote` skill that reads any `long_draft.md` and writes `promotion_posts.md`
- Output: 1 launch post + 3 section deep-dives — copy-paste-ready for LinkedIn and Substack
- Both platforms use the same format (one output file, not separate per-platform)
- Skill loads `style_guide/promotion_formats.md` — codifies two distinct templates:
  - **Launch Post Template:** 🗞️ opener, bold claim, 3 insight bullets, optional credibility line, engagement question, CTA
  - **Final Notes Template (v2):** strong opinionated opening, 3 🔹 bullets with paired 👉 follow-ups, credibility/punchline, engagement question, CTA
- Skill selects the 3 most promotable H2 sections (criteria: standalone claim, concrete example, 3 extractable bullets); prints a 1-line rationale for each selected section
- Skill works standalone: `post.yaml` and `seo_brief.md` are optional inputs

**Guardrails:**
- No reproduction of the full article argument — teasers only
- Each post must be distinct — not the same angle restated
- No "I wrote a blog post about..." framing in any variant
- Deep-dive opening must stand alone — no reference to the article or other sections

**Definition of done:**
- `/promote` runs on any draft without needing the full pipeline ✓
- `promotion/posts.md` is generated with launch post + 3 section deep-dives ✓
- Each post is meaningfully distinct ✓
- Each deep-dive has a `> Why this section:` rationale ✓

---

## M6 — Full Pipeline ✓ Complete (2026-03-28)

**Goal:** A single skill that runs the full workflow end-to-end, unattended, from notes to complete bundle.

**What was built:**
- `/revise` skill — reads `long_draft.md` + `seo_brief.md`; applies keyword placement gaps, Quick Wins, and readability fixes; backs up original as `long_draft_v1.md`; updates `post.yaml`
- `/new-post` full rewrite — two modes:
  - **Mode A (new post):** brainstorm → research → draft → seo → revise → promote, unattended
  - **Mode B (`--from-draft`):** runs post-draft stages (seo → revise → promote) on an existing draft; conflict check in Mode A also triggers Mode B automatically
- Stage-skip logic: reads `post.yaml` flags before each stage; skips completed stages with `⏩` message
- `decision_log.md` appended to the post folder after each stage with a 1-line summary, flags, and artefact path
- `templates/post.yaml` updated with `revise` stage and `long_draft_backup` artefact

**Key design decisions:**
- `/revise` applies only additive SEO changes — no restructuring, no content removal, no new paragraphs; structural changes are advisory-only
- `long_draft_v1.md` backup always created before any revision — preserves the pre-SEO draft
- `decision_log.md` is append-only (not overwritten) — preserves history across incremental pipeline runs

**Definition of done:**
- Jose can run `/new-post` from rough notes and return to a complete artefact bundle ✓
- `--from-draft` mode works for posts written outside the system ✓
- `decision_log.md` is readable and useful for understanding what the pipeline decided ✓
- `/revise` works standalone on any `long_draft.md` + `seo_brief.md` pair ✓

---

## M7 — Content Ideation

**Goal:** An independent agent that helps Jose discover and prioritise new content ideas, not tied to any specific post.

**What to build:**
- `/ideate` skill that takes optional inputs (topic area, recent themes, constraints) and uses web search + existing `reference_posts/` to produce `ideation_output.md`
- Output contains: 8–10 topic ideas, each with a proposed angle, likely audience, why it fits Jose's existing body of work, and a gap analysis (has this been covered before?)
- Entirely standalone — no `posts/` folder needed

**Definition of done:**
- `/ideate` produces a ranked list of ideas with enough context that Jose can pick one and move straight to `/new-post`
- Ideas are grounded in real trends or genuine gaps, not generic suggestions

---

## Out of Scope (for now)

- Publishing automation (Substack, Medium, LinkedIn direct posting)
- GUI or web interface
- Series continuity agent (tracks cross-post progression) — candidate for M8+
- Style evaluation agent (scores draft against style guide) — candidate for M8+
- Fact-checking agent
- Multi-user support
