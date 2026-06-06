# Plan: SEO Verification Pass After `/revise`

## Context

The current pipeline has a verification gap:

```
draft → seo (scores long_draft.md) → revise (produces revised long_draft.md) → review
```

`/seo` scores the *pre-revision* draft. `/revise` applies the Quick Wins and checklist fixes. But nobody verifies the fixes actually landed in the revised draft. The SEO brief stays as a before-snapshot — the keyword placement score, AI discoverability score, and Quick Wins list all reflect the old draft. The post enters `/review` with no confirmation that SEO improvements were successfully applied.

**Goal:** At the end of `/revise`, spawn a lightweight verification subagent that re-scores only the checklist items from `seo_brief.md` against the revised draft, and appends the results to `seo_brief.md` as a new section. The brief becomes a living document: original analysis at the top, post-revision confirmation at the bottom.

---

## What changes and why

### File to modify: `.claude/skills/revise/SKILL.md`

**Where:** Add a new Step 8 to the subagent prompt, after the existing Step 7 (Return summary). The revise subagent already has all context needed — it knows what changes it planned, what it applied, and where the revised `long_draft.md` lives.

**Why here and not in `/seo`:** The revise subagent is the only agent that knows the full list of planned vs applied edits. Re-running the full `/seo` skill would regenerate `seo_brief.md` from scratch (overwriting the original scores, triggering stage guard checks, re-extracting keywords etc.) — that's too heavy and loses the before/after comparison. A targeted verification pass within `/revise` is the right scope.

---

## Exact new step to add to the revise subagent prompt

Append this as **Step 8** inside the subagent prompt block in `SKILL.md` (after the existing Step 7 — Return summary):

```
**Step 8 — SEO verification pass**
Spawn a second subagent to verify the revisions landed correctly. Pass it POST_FOLDER and the revision plan from Step 3.

The verification subagent must:

1. Read `POST_FOLDER/long_draft.md` (the revised version) in full.
2. Read `POST_FOLDER/seo_brief.md` to extract the original scores for:
   - Section 7 — Keyword Placement Checklist (original score: X/5, positions marked ✗)
   - Section 6 — AI Discoverability (original score: X/total H2s, headings flagged)
   - Section 11 — Quick Wins (the 3 specific changes listed)
3. Re-score each item against `long_draft.md`:
   - For each keyword placement position previously marked ✗: is it now present? ✓ or still ✗?
   - For each H2 previously not in question format: has it been reworded? ✓ or still ✗?
   - For each Quick Win: was it applied? ✓ applied / ✗ not applied / ~ partially applied
4. Append the following section to `POST_FOLDER/seo_brief.md` (do not overwrite existing content):

---

## 12. Post-Revision Verification

**Verified against:** long_draft.md (post-revise)
**Verified on:** <today YYYY-MM-DD>

### Keyword Placement — before → after
| Position | Before | After |
|----------|--------|-------|
| H1 / Title | ✓/✗ | ✓/✗ |
| First 100 words | ✓/✗ | ✓/✗ |
| At least one H2 | ✓/✗ | ✓/✗ |
| Meta description | ✓/✗ | ✓/✗ |
| URL slug | ✓/✗ | ✓/✗ |

**Score: X/5 → Y/5**

### AI Discoverability — before → after
| H2 | Before | After |
|----|--------|-------|
| <heading> | ✗ not question format | ✓ reworded / ✗ unchanged |

**Score: X/total → Y/total**

### Quick Wins — applied?
1. <Quick Win 1 text> — ✓ / ✗ / ~
2. <Quick Win 2 text> — ✓ / ✗ / ~
3. <Quick Win 3 text> — ✓ / ✗ / ~

### Verification verdict
**All fixes applied:** Yes / No
**Remaining issues:** <list any ✗ items, or "None">

---

5. Return the verification summary (before→after scores, any remaining ✗ items).
```

---

## Updated revise subagent Step 7 (minor tweak)

Add one bullet to the existing return summary:

> - SEO verification: keyword placement before → after score, Quick Wins pass rate (N/3), any remaining ✗ items

---

## What the pipeline flow looks like after this change

```
/draft     → long_draft.md (first pass)
/seo       → seo_brief.md (scores long_draft.md, sections 1–11)
/revise    → long_draft.md revised in place (backup: long_draft_v1.md)
             ↳ verification subagent appends section 12 to seo_brief.md
             ↳ seo_brief.md now has: original scores (1–11) + post-revision check (12)
/review    → reads long_draft.md (the verified, revised version)
```

The SEO brief becomes a two-phase document: analysis at the top (what needed fixing), verification at the bottom (confirmation it was fixed). `/review` then runs on a draft that has been confirmed SEO-complete.

---

## What does NOT change

- `/seo` SKILL.md: no changes. It still generates the original brief against `long_draft.md`.
- `seo_brief_template.md`: no changes. Section 12 is appended by the verification subagent, not baked into the template (it only exists after `/revise` runs).
- `post.yaml` stage flags: no new stage. Verification is part of the `revise` stage.
- `/review` SKILL.md: no changes. It already reads `long_draft.md` — now verified.

---

## Verification (how to test end-to-end)

1. Run `/revise posts/claude-code-thinking-planning-goal-mode/` — existing post with both inputs present.
2. Confirm the revise subagent prints its revision plan and summary as before.
3. Confirm the verification subagent spawns after the revision completes.
4. Open `seo_brief.md` — section 12 is appended with before/after scores and Quick Wins status.
5. Confirm sections 1–11 are untouched.
6. If any Quick Win shows ✗, confirm it surfaces in the summary returned to Jose.
