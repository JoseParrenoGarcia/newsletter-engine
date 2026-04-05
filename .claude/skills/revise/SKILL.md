---
name: revise
description: "Applies SEO-driven revisions to long_draft.md based on seo_brief.md — keyword placement, readability fixes, H1/H2 rewording, and Quick Wins. Creates a backup (long_draft_v1.md) before writing changes. DO trigger: after both long_draft.md and seo_brief.md exist; when the draft needs improvement for search and readability. DO NOT trigger: when only one of the two required inputs exists; for general editorial rewrites not driven by an SEO brief; when revise is already complete and no redo is requested. Keywords: revise, revision, SEO, keyword placement, readability, Quick Wins, long_draft, seo_brief."
argument-hint: "[posts/<slug>/ — optional, defaults to current directory or asks]"
license: proprietary
compatibility: "Claude Code"
metadata:
  author: jose-parreno-garcia
  version: "1.0"
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

---

## Revision execution

Spawn a subagent using the Agent tool with the following prompt (substitute `POST_FOLDER` with the resolved folder path before spawning):

> Apply SEO-driven revisions to the draft at `POST_FOLDER`.
>
> **Step 1 — Read inputs**
> Read in full:
> - `POST_FOLDER/long_draft.md` — required
> - `POST_FOLDER/seo_brief.md` — required
> - `POST_FOLDER/post.yaml` — optional; fields used: `thesis`, `style_guides`. Skip gracefully on null/empty fields.
> - Any style guides listed in `post.yaml` — optional; load for voice/tone reference
>
> **Step 2 — Parse revision targets from `seo_brief.md`**
> Extract a concrete, numbered list of changes to apply. Work through these sections in order:
>
> From section 6 — Keyword placement checklist: For every position marked ✗:
> - H1/Title — note the H1 recommendation from section 4
> - First 100 words — plan where to insert the primary keyword naturally
> - At least one H2 — identify the best H2 to update per section 5 recommendations
> - Meta description and URL slug — skip (not in the draft body)
>
> From section 10 — Quick Wins: List all 3 Quick Wins verbatim.
>
> From section 7 — Readability issues: Only extract items where the verdict is "needs work". Plan sentence breaks and passive-to-active voice conversions.
>
> From section 5 — H2/H3 structure review: Apply reword recommendations only if additive (adds a keyword without changing meaning). Skip if the proposed change would alter the section's intent.
>
> **Step 3 — Print revision plan**
> Print the full list of planned edits before making any changes. Format:
> ```
> Revision plan for POST_FOLDER/long_draft.md
> ============================================
> Changes to apply: <N>
> [list each change with category, target text, and planned edit]
> Skipped: [any skipped changes and why]
> ```
> If zero changes are identified, note this and proceed directly to step 5.
>
> **Step 4 — Create backup**
> Write `POST_FOLDER/long_draft_v1.md` as an exact copy of `long_draft.md`. If `long_draft_v1.md` already exists, overwrite it.
>
> **Step 5 — Apply revisions to `long_draft.md`**
> Apply every change from the revision plan. Guardrails:
> - Do not restructure sections — headings stay in the same order
> - Do not add paragraphs — keyword fixes are clause or phrase insertions, not new content blocks
> - Do not remove content — shorten sentences by cutting redundant clauses, not ideas
> - Preserve Jose's voice — no generic AI filler phrases, no "it's important to note" or "in conclusion"
> - One change at a time — apply each planned edit exactly as described; do not improvise
>
> **Step 6 — Update `post.yaml`**
> If `post.yaml` exists, update:
> ```yaml
> artefacts:
>   long_draft_backup: long_draft_v1.md
> stages:
>   revise:
>     status: complete
>     completed_at: <today YYYY-MM-DD>
> ```
>
> **Step 7 — Return summary**
> Return:
> - Total changes applied (N of N planned)
> - Keyword placement score before → after (e.g. "4/5 → 5/5")
> - Readability verdict before → after
> - Any planned changes that were skipped and why (1 line each)

Once the subagent completes, print its revision summary and confirm to Jose.
