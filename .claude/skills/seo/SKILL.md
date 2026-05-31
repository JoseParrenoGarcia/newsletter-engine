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

---

## SEO execution

Spawn a subagent using the Agent tool with the following prompt (substitute `POST_FOLDER` with the resolved folder path before spawning):

> Run SEO analysis for the post at `POST_FOLDER`.
>
> **Step 1 — Read inputs**
> Read in full:
> - `POST_FOLDER/long_draft.md` — required
> - `POST_FOLDER/post.yaml` — optional; fields used: `slug`, `working_title`, `thesis`, `target_audience`, `topics_to_cover`, `topics_to_exclude`, `target_reading_time_minutes`. Skip gracefully on any null or empty field.
> - `POST_FOLDER/research_brief.md` — optional; used for external link quality assessment
>
> **Step 2 — Extract keywords**
> Identify the primary keyword and up to 5 secondary keywords.
> - Primary keyword: the single most searchable phrase that captures the post's core topic. Should be 2-4 words. Prefer phrases a reader would type into Google.
> - Secondary keywords: 3-5 supporting phrases that cover related sub-topics in the draft.
> - Inputs: thesis and topics_to_cover from post.yaml, recurring terms in the draft, terms in headings and opening/closing paragraphs.
> - If `topics_to_exclude` is set, do not suggest any overlapping term.
>
> **Step 3 — Analyse the draft**
> Work through each assessment area. Full definitions for each area are in `.claude/skills/seo/references/assessment-processes.md` — load that file. Assessment areas: meta description, URL slug, H1 recommendation, H2/H3 structure review, AI discoverability (question-format headings, answer blocks, links in answer zone — scored X / total H2s), keyword placement checklist (5 positions, scored out of 5), readability assessment, content quality signals.
>
> **Step 4 — Generate title variants**
> Produce 5 titles, one per style. For each, write a suggested subtitle (1 sentence, ≤120 chars). Style definitions and guardrails are in `.claude/skills/seo/references/title-styles.md` — load that file.
>
> **Step 5 — Identify Quick Wins**
> Select the top 3 changes with the most impact on discoverability or click-through on Medium. Be specific — name the exact change, not a category.
> Good: "Add the primary keyword 'Claude Code skills' to the first paragraph (currently absent from the opening 200 words)"
> Bad: "Improve keyword placement"
>
> **Step 6 — Write `seo_brief.md`**
> Write to `POST_FOLDER/seo_brief.md` using the template at `.claude/skills/seo/assets/seo_brief_template.md` — load that template now and fill every section. Do not omit any section.
>
> **Step 7 — Update `post.yaml`**
> If `post.yaml` exists, update:
> ```yaml
> artefacts:
>   seo_brief: seo_brief.md
> stages:
>   seo:
>     status: complete
>     completed_at: <today YYYY-MM-DD>
> ```
>
> **Step 8 — Return summary**
> Return:
> - Keyword placement score (X/5) and which positions are missing
> - AI discoverability score (X / total H2s) and the top flag (question format / answer block / links)
> - Overall readability verdict (one sentence)
> - Recommended title variant and why (one sentence)
> - The single highest-impact Quick Win

Once the subagent completes, tell Jose the summary it returned.
