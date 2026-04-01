---
name: seo
description: "Analyses long_draft.md to produce seo_brief.md — primary and secondary keywords, meta description, H1/H2 structure review, readability assessment, keyword placement checklist, and 5 title variants. DO trigger: after long_draft.md exists; when keyword optimisation and title options are needed before publishing to Medium or Substack; works on any draft, pipeline or standalone. DO NOT trigger: before a draft exists; for social copy (use /promote); when seo_brief is already complete and no redo is requested. Keywords: SEO, keywords, meta description, title variants, readability, H1, H2, Medium, Substack, seo_brief."
argument-hint: "[posts/<slug>/ — optional, defaults to current directory or asks]"
license: proprietary
compatibility: "Claude Code"
metadata:
  author: jose-parreno-garcia
  version: "1.0"
---

Produce `seo_brief.md` for the post in `$ARGUMENTS` (or ask if no argument is given).

## Before you start

### 1. Locate the post folder

If `$ARGUMENTS` is provided, that is the post folder. Otherwise look for a `post.yaml` or `long_draft.md` in the current directory.

If neither exists, ask:
> "Which post do you want to run SEO review on? Give me the slug (e.g. `claude-code-skills-explained`) or the path to the draft file."

Wait for the answer, then resolve the path.

### 2. Check stage guard

If `post.yaml` exists and `stages.seo.status` is `complete`, say:
> "SEO brief is already marked complete for this post. Do you want to redo it? This will overwrite `seo_brief.md`."

Wait for explicit confirmation before proceeding.

### 3. Verify `long_draft.md` exists

If `long_draft.md` is missing or is a placeholder, stop and say:
> "No draft found at `<path>/long_draft.md`. Run `/draft` first, or point me at the draft file directly."

### 4. Read all inputs silently

- `long_draft.md` — required; read in full
- `post.yaml` — optional; read if present. Fields used: `slug`, `working_title`, `thesis`, `target_audience`, `topics_to_cover`, `topics_to_exclude`, `target_reading_time_minutes`. Skip gracefully on any null or empty field — never fail.
- `research_brief.md` — optional; read if present (used for external link quality assessment)

---

## Step 1 — Extract keywords

Identify the primary keyword and up to 5 secondary keywords.

**Inputs for keyword extraction (use what is available):**
- `thesis` from `post.yaml`
- `topics_to_cover` from `post.yaml`
- The most prominent concepts in `long_draft.md` — recurring terms, terms in headings, terms in the opening and closing paragraphs

**Rules:**
- Primary keyword: the single most searchable phrase that captures the post's core topic. Should be 2-4 words. Prefer phrases a reader would type into Google.
- Secondary keywords: 3-5 supporting phrases that cover related sub-topics in the draft.
- If `topics_to_exclude` is set in `post.yaml`, do not suggest any term that overlaps with those topics.

---

## Step 2 — Analyse the draft

Work through each assessment area before writing anything. Full definitions for each area are in `references/assessment-processes.md` — load that file now.

Assessment areas to complete:
- Meta description
- URL slug
- H1 recommendation
- H2/H3 structure review
- Keyword placement checklist (5 positions, scored out of 5)
- Readability assessment
- Content quality signals

---

## Step 3 — Generate title variants

Produce 5 titles, one per style. For each, also write a suggested subtitle (1 sentence, ≤120 chars).

Style definitions, guardrails, and Medium-specific notes are in `references/title-styles.md` — load that file now.

---

## Step 4 — Identify Quick Wins

Select the top 3 changes that would have the most impact on discoverability or click-through on Medium. Be specific — name the exact change, not a category.

Good: "Add the primary keyword 'Claude Code skills' to the first paragraph (currently absent from the opening 200 words)"
Bad: "Improve keyword placement"

---

## Step 5 — Write `seo_brief.md`

Write to the post folder using the template in `assets/seo_brief_template.md` — load that file now and fill every section. Do not omit any section from the template.

---

## Step 6 — Update `post.yaml`

If `post.yaml` exists, update:

```yaml
artefacts:
  seo_brief: seo_brief.md
stages:
  seo:
    status: complete
    completed_at: <today YYYY-MM-DD>
```

---

## Step 7 — Confirm

Tell Jose:
- Keyword placement score (X/5) and which positions are missing
- Overall readability verdict (one sentence)
- Which title variant Claude recommends and why (one sentence)
- The single highest-impact Quick Win
