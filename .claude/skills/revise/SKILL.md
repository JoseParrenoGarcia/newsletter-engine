---
name: revise
description: SEO revision skill. Reads long_draft.md + seo_brief.md and applies keyword placement, readability fixes, and Quick Wins to produce an improved draft. Works standalone on any draft+brief pair.
argument-hint: "[posts/<slug>/ — optional, defaults to current directory or asks]"
disable-model-invocation: true
---

Apply SEO-driven revisions to the draft in `$ARGUMENTS` (or ask if no argument is given).

## Before you start

### 1. Locate the post folder

If `$ARGUMENTS` is provided, that is the post folder. Otherwise look for `long_draft.md` and `seo_brief.md` in the current directory.

If neither is found, ask:
> "Which post do you want to revise? Give me the slug (e.g. `claude-code-skills-explained`) or the path to the folder."

Wait for the answer, then resolve the path.

### 2. Check stage guard

If `post.yaml` exists and `stages.revise.status` is `complete`, say:
> "Draft revision is already marked complete for this post (completed: <date>). Do you want to redo it? This will overwrite `long_draft.md` and the existing backup."

Wait for explicit confirmation before proceeding.

### 3. Verify both inputs exist

- If `long_draft.md` is missing or is a placeholder, stop and say:
  > "No draft found at `<path>/long_draft.md`. Run `/draft` first."
- If `seo_brief.md` is missing or is a placeholder, stop and say:
  > "No SEO brief found at `<path>/seo_brief.md`. Run `/seo` first."

### 4. Read all inputs silently

- `long_draft.md` — required; read in full
- `seo_brief.md` — required; read in full
- `post.yaml` — optional; read if present. Fields used: `thesis`, `style_guides`. Skip gracefully on any null or empty field.
- Any style guides listed in `post.yaml` — optional; load for voice/tone reference

---

## Step 1 — Parse revision targets from `seo_brief.md`

Extract a concrete, numbered list of changes to apply. Work through these sections in order:

### From section 6 — Keyword placement checklist
For every position marked ✗:
- **H1 / Title** — note the H1 recommendation from section 4; will apply during H1 update
- **First 100 words** — primary keyword must appear in the opening paragraph; plan where to insert it naturally
- **At least one H2** — identify the best H2 to update per section 5 recommendations
- **Meta description** — skip (not in the draft body)
- **URL slug** — skip (not in the draft body)

### From section 10 — Quick Wins
List all 3 Quick Wins verbatim. Each will become a targeted edit.

### From section 7 — Readability issues
Only extract items where the verdict is "needs work":
- Long sentences listed by section 7 — plan to shorten each (break into two sentences or cut a clause)
- Passive voice instances listed — plan to convert to active voice
- Skip any readability item where the overall verdict is "good" or "acceptable"

### From section 5 — H2/H3 structure review
For each heading with a "reword to:" recommendation:
- Apply **only** if the new heading is additive (adds a keyword without changing the meaning)
- Skip if the proposed change would alter the section's intent

---

## Step 2 — Print the revision plan

Before making any changes, print the full list of planned edits:

```
Revision plan for posts/<slug>/long_draft.md
============================================
Changes to apply: <N>

Keyword placement fixes:
1. [First 100 words] Add "Claude Code skills" to opening paragraph — insert after "…"
2. [H2] Reword "Anatomy of a skill" → "Anatomy of a Claude Code skill"

Quick Wins:
3. [Quick Win 1] <exact text from seo_brief>
4. [Quick Win 2] <exact text from seo_brief>
5. [Quick Win 3] <exact text from seo_brief>

Readability fixes:
6. [Sentence length] Break sentence "…" into two
7. [Passive voice] "…is designed to…" → "…does…"

Skipped:
- [H2 reword] "Hidden gems" — proposed change alters meaning, skipped
```

Do not proceed to writing until this list is printed. If zero changes are identified, say:
> "No revisions needed — all Quick Wins and keyword placements are already satisfied. Marking stage complete."
Then jump directly to step 5.

---

## Step 3 — Create backup

Write `long_draft_v1.md` as an exact copy of the current `long_draft.md`. This is the pre-revision backup.

If `long_draft_v1.md` already exists, overwrite it with the current `long_draft.md` before applying any changes.

---

## Step 4 — Apply revisions to `long_draft.md`

Apply every change from the revision plan. Guardrails:

- **Do not restructure sections** — headings stay in the same order; section content stays in the same section
- **Do not add paragraphs** — keyword fixes are clause or phrase insertions, not new content blocks
- **Do not remove content** — shorten long sentences by cutting redundant clauses, not ideas
- **Preserve Jose's voice** — no generic AI filler phrases; no phrases like "it's important to note" or "in conclusion"
- **One change at a time** — apply each planned edit exactly as described; do not improvise additional changes

---

## Step 5 — Update `post.yaml`

If `post.yaml` exists, update:

```yaml
artefacts:
  long_draft_backup: long_draft_v1.md
stages:
  revise:
    status: complete
    completed_at: <today YYYY-MM-DD>
```

---

## Step 6 — Confirm

Tell Jose:
- Total changes applied (N of N planned)
- Keyword placement score before → after (e.g. "4/5 → 5/5")
- Readability verdict before → after (e.g. "Grade 8-10 → Plain English")
- Path of backup: `long_draft_v1.md`
- Any planned changes that were skipped and why (1 line each)
