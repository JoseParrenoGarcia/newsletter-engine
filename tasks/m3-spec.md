# M3 Spec — Draft

**Status:** Complete (2026-03-27)
**Date:** 2026-03-27

---

## What we're building

Three things:
1. `/draft` skill — reads all inputs, produces `outline.md` then `long_draft.md`
2. `post.yaml` schema update — add `target_reading_time_minutes` field
3. `/brainstorm` skill update — ask target reading time during conversation
4. `/new-post` update — extend pipeline menu to chain `/draft` after `/research`

---

## 1. New `post.yaml` field

Add to the Core content section of `post.yaml` (template + brainstorm output):

```yaml
# ── Core content ──────────────────────────────────────────────────────
target_reading_time_minutes: null   # e.g. 10, 15, 20 — set during brainstorm
```

Word count is derived at draft time: `target_reading_time_minutes × 250`.

---

## 2. `/brainstorm` skill update

Near the end of the conversation, when converging on structure, Claude asks:

> "Roughly how long should this be? Give me a reading time — e.g. 10 min, 15 min, 20 min."

Write the answer to `target_reading_time_minutes` in `post.yaml`.

---

## 3. `outline.md` structure

```markdown
# Outline: <working_title>

**Target:** ~<target_reading_time_minutes> min read (~<word_count> words)

## Sections

### 1. <Section name>
- <What this section covers — 1-2 sentences>
- <Key point or angle to make>
- Sources: [<Title>](<url>), [<Title>](<url>)

### 2. <Section name>
- ...
- Sources: ...

[repeat for all sections from the rough ToC]

---

## ToC Suggestions

[Only include this section if the draft process surfaced structural recommendations.
Omit entirely if none.]

- <Suggestion: e.g. "Consider splitting section 3 into two — the anatomy and the hidden gems
  feel like distinct depth levels">
- <Suggestion: ...>
```

Each section entry maps sources from `research_brief.md` to where they will be used. This is the explicit bridge between research and draft — `/draft` reads this mapping when writing prose.

---

## 4. `long_draft.md` structure

```markdown
# <working_title>

[full article prose]

Inline citations use hyperlinked anchor text where natural:
  e.g. "the [agentskills.io specification](url) defines this as..."
  or numbered where anchor text feels forced: "as documented[1]"

---

## References

[1] [Title](url) — 1-sentence description of what this source covers
[2] [Title](url) — 1-sentence description
...
```

All references come from `research_brief.md`. No URLs may appear in the draft that are not in `research_brief.md` — if model knowledge is referenced, it must be prose-only with no invented URL.

---

## 5. `/draft` skill

### Inputs
- `post.yaml` — reads: `working_title`, `thesis`, `target_audience`, `topics_to_cover`,
  `topics_to_exclude`, `target_reading_time_minutes`, `reference_posts`, `style_guides`,
  `artefacts.notes`, `artefacts.research_brief`
- `notes.md` — reads: brainstorm summary, rough Table of Contents
- `research_brief.md` — reads: all sources with summaries, grouped by ToC section
- All files listed in `style_guides` — read in full
- All files listed in `reference_posts` — read in full; extract 2-3 passages per post
  as few-shot style anchors (an opening, a section transition, a closing)

### Stage guard
Check `post.yaml`. If `stages.draft.status` is `complete`, say:
> "Draft is already marked complete for this post. Do you want to redo it? This will overwrite `outline.md` and `long_draft.md`."
Wait for explicit confirmation before proceeding.

### Pre-conditions
- `stages.brainstorm.status` must be `complete` — otherwise stop and direct to `/brainstorm`
- `stages.research.status` must be `complete` — otherwise stop and direct to `/research`
- `target_reading_time_minutes` must be set in `post.yaml` — if null, ask Jose before proceeding

### Process

#### Step 1 — Load and absorb style inputs
Read all style guides and reference posts listed in `post.yaml`.

From each reference post, privately extract:
- One strong opening (how Jose enters a piece)
- One section transition (how Jose moves between ideas)
- One closing passage (how Jose ends)

Do not quote these in the draft. Use them to calibrate voice, rhythm, and structure before writing a single word.

#### Step 2 — Build the outline
Using the rough ToC from `notes.md` as the fixed structure:
- For each section, write 1-2 bullet points on what it covers and the key angle
- Map the most relevant sources from `research_brief.md` to each section
- Calculate approximate word count: `target_reading_time_minutes × 250`
- Note any structural observations as ToC Suggestions (do not act on them — just record)

Write `outline.md` using the structure defined in section 3.

#### Step 3 — Pause or proceed (mode-dependent)

**Standalone mode** (invoked directly as `/draft posts/<slug>/`):
Show Jose the outline and ask:
> "Here's the outline. Does this look right before I write the full draft?"
Wait for confirmation or adjustments before proceeding to Step 4.

**Pipeline mode** (invoked from `/new-post` run-all):
Proceed immediately to Step 4 without pausing.

#### Step 4 — Write `long_draft.md`
Write the full article following `outline.md` section by section.

**Style guardrails (active throughout):**
- Use the extracted reference passages as private anchors for tone and rhythm — not as templates to copy
- No generic AI filler phrases (see `style_guide/shared/anti_patterns.md`)
- Follow structural conventions from the relevant type-specific style guide
- Vary sentence length and paragraph rhythm to match the reference posts
- Each section should feel like it earns the next — no padding to hit word count

**Reference guardrails:**
- Only cite sources from `research_brief.md`
- Prefer inline hyperlinks with natural anchor text
- Use numbered citations `[N]` when anchor text feels forced
- Collect all cited sources in a `## References` section at the end
- If drawing on model knowledge with no citable source: prose only, no URL, no invented citation

#### Step 5 — Update `post.yaml`
```yaml
artefacts:
  outline: outline.md
  long_draft: long_draft.md
stages:
  draft:
    status: complete
    completed_at: <today YYYY-MM-DD>
```

#### Step 6 — Confirm
Tell Jose:
- Approximate word count and estimated reading time
- Number of sources cited from `research_brief.md`
- Any ToC Suggestions captured in `outline.md` (flag these explicitly)
- Any sections where no research source was available (wrote from model knowledge)

---

## 6. `/new-post` update (M3 extension)

Update the pipeline menu option 2 so that after `/research` completes, it proceeds to `/draft` before stopping at the first unimplemented stage.

The menu text does not change — the pipeline just runs one stage further.

---

## 7. Files to create / modify

| File | Action |
|---|---|
| `.claude/skills/draft/SKILL.md` | New — draft skill |
| `.claude/skills/brainstorm/SKILL.md` | Update — ask target reading time |
| `.claude/skills/new-post/SKILL.md` | Update — chain draft after research |
| `templates/post.yaml` | Update — add `target_reading_time_minutes: null` |

---

## 8. Definition of done

- [ ] `/draft` produces a complete `outline.md` and `long_draft.md`
- [ ] Draft follows the rough ToC from `notes.md` strictly — no structural improvisation
- [ ] ToC Suggestions captured separately in `outline.md` when present
- [ ] All cited URLs are from `research_brief.md` — no hallucinated references
- [ ] Inline hyperlinks + numbered `## References` section present
- [ ] Style noticeably closer to Jose's voice than a cold AI draft
- [ ] Word count within ~10% of `target_reading_time_minutes × 250`
- [ ] `post.yaml` updated with both artefact paths and stage complete
- [ ] Standalone mode pauses after outline; pipeline mode runs straight through
- [ ] Stage guard prevents silent overwrites
- [ ] `/brainstorm` now asks target reading time and writes it to `post.yaml`

---

## Open questions (none — ready to build)

All design decisions resolved in brainstorm session on 2026-03-27.
