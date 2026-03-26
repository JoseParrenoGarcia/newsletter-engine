# M1 Spec — Brainstorm + Metadata

**Status:** Draft — awaiting Jose approval
**Date:** 2026-03-26

---

## What we're building

Four things:
1. `post.yaml` schema — shared state contract for every future agent
2. `/brainstorm` skill — conversational session that produces a populated `post.yaml`
3. Post folder template — `posts/<slug>/` with the right files in place
4. `/new-post` stub — creates the folder + kicks off `/brainstorm`

---

## 1. Two-axis post classification

Every post has two independent fields:

| Field | Values | What it means |
|---|---|---|
| `structural_type` | `standalone` \| `short_technical` \| `series` | Format and scope of the post |
| `content_type` | `management` \| `paper-explainer` \| `book-review` \| `series-genai` | Subject area and audience |

These combine freely. Examples:
- A deep essay on a management topic → `standalone × management`
- A series on GenAI → `series × series-genai`
- A quick explainer on a paper → `short_technical × paper-explainer`

The `content_type` drives which style guide is loaded. The `structural_type` drives structural conventions (length, pacing, series position).

---

## 2. `post.yaml` schema

```yaml
# ── Identity ──────────────────────────────────────────────────────────
slug: ""                    # matches the posts/<slug>/ folder name
working_title: ""

# ── Post classification ────────────────────────────────────────────────
structural_type: ""         # standalone | short_technical | series
content_type: ""            # management | paper-explainer | book-review | series-genai
series_name: ""             # only if structural_type: series
series_position: null       # integer (1, 2, 3 …), only if structural_type: series

# ── Core content ──────────────────────────────────────────────────────
thesis: ""                  # the core argument in one sentence
target_audience: ""
topics_to_cover: []
topics_to_exclude: []
open_research_questions: [] # things to verify or look up in the research phase

# ── Brainstorm output ─────────────────────────────────────────────────
brainstorm_summary: ""      # 3–5 sentence summary of what the brainstorm converged on

# ── Style references (confirmed by Jose during brainstorm) ─────────────
reference_posts: []         # paths to reference_posts/ files, e.g.:
                            #   - reference_posts/standalone/management/some-post.md
style_guides:               # always includes shared/ files; type-specific added based on content_type
  - style_guide/shared/voice.md
  - style_guide/shared/anti_patterns.md

# ── Artefacts (paths populated as each stage completes) ───────────────
artefacts:
  notes: notes.md
  research_brief: null      # populated by /research (M2)
  outline: null             # populated by /draft (M3)
  long_draft: null          # populated by /draft (M3)
  seo_brief: null           # populated by /seo (M4)
  promotion_bundle: null    # populated by /promote (M5)

# ── Pipeline stages ───────────────────────────────────────────────────
stages:
  brainstorm:
    status: pending         # pending | complete
    completed_at: null      # ISO 8601 date string when completed
  research:
    status: pending
    completed_at: null
  draft:
    status: pending
    completed_at: null
  seo:
    status: pending
    completed_at: null
  promote:
    status: pending
    completed_at: null
```

---

## 3. `/brainstorm` skill

### Entry conditions
- Can be invoked standalone (`/brainstorm`) or from `/new-post`
- If a `post.yaml` exists in the post folder and `stages.brainstorm.status: complete`, warn Jose and ask for confirmation before overwriting
- If `notes.md` exists and has content, read it silently before the first message
- If `notes.md` is empty or absent, start from a blank slate — no notes required

### Conversation model
- Natural back-and-forth — no structured form, no explicit modes
- Claude asks open questions, listens, builds understanding iteratively
- Goal: arrive at all `post.yaml` fields + a rough table of contents
- Claude should cover (not necessarily as a checklist — organically):
  - What is the post about? What's the core argument or insight?
  - Who is it for? What do they already know?
  - What angles / sub-topics are worth covering?
  - What should be explicitly out of scope?
  - What would need research or verification?
  - What's the structure — is there a logical arc from problem → insight → takeaway?
  - Is this series, standalone, or short? What's the content area?

### End trigger
- **Claude-driven**: when Claude has enough to populate all YAML fields and sketch a rough ToC, it says: *"I think we have enough — shall I write the YAML and summary notes?"*
- **Jose-driven**: Jose can say "let's wrap up" at any point and Claude will work with what it has
- Either path leads to the same output step

### Output (on completion)
**Step 1 — Suggest references, get confirmation:**
- Based on `structural_type` + `content_type`, Claude proposes:
  - 2–4 relevant `reference_posts/` files (by scanning the directory)
  - The appropriate type-specific style guide from `style_guide/types/`
- Jose confirms, rejects, or adjusts

**Step 2 — Write `post.yaml`:**
- All fields populated from the brainstorm
- `stages.brainstorm.status: complete`, `completed_at: <today>`
- `style_guides` includes `shared/voice.md`, `shared/anti_patterns.md`, + the confirmed type guide

**Step 3 — Update `notes.md`:**
- If raw notes existed: preserved as-is at the top
- Append a clearly delimited section:

```
---
## Brainstorm Summary

[3–5 paragraph clean summary of what the brainstorm converged on]

## Rough Table of Contents

[Bullet list of proposed sections with 1-line description each]
```

---

## 4. `/new-post` stub (M1 version)

### What it does
1. Ask Jose for a slug (suggest one if Jose provides a working title)
2. Create `posts/<slug>/` folder
3. Copy the post folder template into it (see section 5)
4. Immediately invoke `/brainstorm`

### What it does NOT do in M1
- No chaining to `/research`, `/draft`, etc. — that's M2–M6
- No pipeline orchestration

### Invocation
```
/new-post [optional-slug]
```

If no slug provided, Claude asks for one or derives from a title Jose mentions.

---

## 5. Post folder template

`posts/<slug>/` contains:

```
posts/<slug>/
  notes.md                  # raw notes / brainstorm input (starts empty)
  post.yaml                 # skeleton with all fields empty (populated by /brainstorm)
  research_brief.md         # placeholder — empty until M2
  outline.md                # placeholder — empty until M3
  long_draft.md             # placeholder — empty until M3
  seo_brief.md              # placeholder — empty until M4
  promotion/
    linkedin.md             # placeholder — empty until M5
    substack_promo.md       # placeholder — empty until M5
```

Placeholder files contain a single comment line:
```
<!-- placeholder: populated by /<skill> -->
```

---

## 6. Files to create

| File | Notes |
|---|---|
| `.claude/skills/brainstorm/SKILL.md` | Brainstorm skill instruction file |
| `.claude/skills/new-post/SKILL.md` | New-post stub skill |
| `templates/post.yaml` | Canonical schema template (copied by /new-post) |
| `templates/notes.md` | Blank notes template |
| `templates/placeholder.md` | Single placeholder line (used for artefact files) |
| `posts/` | Directory (with .gitkeep) |
| `agents/` | Directory (with .gitkeep) — empty for M1, used from M2+ |

---

## 7. Definition of done

- [ ] From a standing start (no notes), `/new-post` creates the folder and `/brainstorm` produces a complete `post.yaml`
- [ ] From existing rough notes, same flow works — notes are preserved and expanded
- [ ] `post.yaml` has all fields populated and is rich enough that a human could continue without asking Jose any more questions
- [ ] `notes.md` ends with a clean brainstorm summary and rough ToC
- [ ] `/brainstorm` works standalone (without `/new-post`) on an existing post folder
- [ ] Shared voice + anti-patterns style guides always appear in `style_guides`; correct type guide added based on `content_type`
- [ ] Reference posts are auto-suggested and Jose-confirmed before being written to YAML
- [ ] Stage guard: if `brainstorm` already complete, Claude warns before overwriting

---

## Open questions (none — ready to build)

All design decisions resolved in brainstorm session on 2026-03-26.
