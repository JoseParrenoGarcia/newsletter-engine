---
name: seo
description: SEO review skill. Analyses long_draft.md to produce seo_brief.md — keyword suggestions, meta description, H1/H2 recommendations, readability assessment, and 5 title variants. Works on any draft, pipeline or standalone.
argument-hint: "[posts/<slug>/ — optional, defaults to current directory or asks]"
disable-model-invocation: true
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

Work through each assessment area before writing anything:

### Meta description
Draft a meta description that:
- Is ≤160 characters
- Includes the primary keyword
- Has a clear call to action or value proposition
- Reads naturally — not keyword-stuffed

### URL slug
Compare the current slug (from `post.yaml` or folder name) against the primary keyword. Recommend a change only if the current slug is significantly weaker (e.g. missing the keyword, too long, contains stop words). If the current slug is good, say "no change needed."

### H1 recommendation
- Medium displays titles up to ~60-70 characters cleanly
- The H1 should include the primary keyword
- Assess the current `working_title` — recommend a tighter version if it is too long, keyword-weak, or generic

### H2/H3 structure review
Read all headings in `long_draft.md`. For each H2/H3:
- Note whether it includes a relevant keyword or is purely descriptive
- Recommend a reword if the heading would benefit from keyword inclusion without sounding forced
- Keep recommendation to "keep as-is" if it is already strong

### Keyword placement checklist
Check each of the 5 positions:
1. H1 / Title — is the primary keyword in `working_title` or your H1 recommendation?
2. First 100 words — does the primary keyword appear in the opening?
3. At least one H2 — does any H2 include the primary keyword or a close variant?
4. Meta description — does your recommended meta description include it?
5. URL slug — does the slug include the primary keyword?

Score: count of ✓ out of 5.

### Readability assessment
Analyse the draft for:
- **Average sentence length**: estimate from a representative sample of 10-15 sentences
- **Long sentences**: sentences over 30 words — count them; list the first 3 if count > 5
- **Passive voice**: count passive constructions; list examples if > 3
- **Paragraph length**: are most paragraphs 2-4 sentences? Flag any paragraph over 6 sentences
- **Jargon density**: are there terms a non-specialist would not know? Rate low/medium/high and list specific terms if medium or high
- **Reading level**: estimate as Plain English / Grade 8-10 / Technical — aim for Plain English or Grade 8-10 for Medium

### Content quality signals
- Count actual words in the draft
- Compare to `target_reading_time_minutes × 250` (if set in `post.yaml`)
- Count external links cited in the draft
- If `research_brief.md` is available: cross-reference cited URLs against it to confirm they are from authoritative sources. If any cited URL is not in `research_brief.md`, flag it.

---

## Step 3 — Generate title variants

Produce 5 titles, one per style. For each, also write a suggested subtitle (1 sentence, ≤120 chars).

**Style definitions:**

| Style | What it does | Example pattern |
|-------|-------------|-----------------|
| Keyword-first | Primary keyword leads; direct and clear | "[Primary keyword]: [what the reader gets]" |
| Curiosity-gap | Withholds the payoff to create intrigue | "What happens when [premise]" / "I [did X]. Here's what I found." |
| How-to | Action-oriented; verb-led | "How to [achieve outcome] [context or constraint]" |
| Contrarian | Challenges a common assumption in the topic area | "You don't need [common thing]. [Alternative]." / "Why [common belief] is wrong" |
| Authority | Result + credibility signal | "I [did X for Y period / built X]. Here's the system." |

**Guardrails for all titles:**
- ≤70 characters (Medium hard limit for clean card display)
- Must be accurate to the content — not click-bait
- Should include or strongly imply the primary keyword
- Must not sound like generic AI output — read them back against the draft's actual voice

---

## Step 4 — Identify Quick Wins

Select the top 3 changes that would have the most impact on discoverability or click-through on Medium. Be specific — name the exact change, not a category.

Good: "Add the primary keyword 'Claude Code skills' to the first paragraph (currently absent from the opening 200 words)"
Bad: "Improve keyword placement"

---

## Step 5 — Write `seo_brief.md`

Write to the post folder using this exact structure:

```
# SEO Brief: <working_title>

**Post:** posts/<slug>/long_draft.md
**Generated:** <YYYY-MM-DD>

---

## 1. Suggested Keywords

**Primary keyword:** <keyword phrase>
**Secondary keywords:**
- <keyword>
- <keyword>
- <keyword>
- <keyword>
- <keyword>

*Note: Keywords extracted from draft content and thesis. No search volume data — validate with a keyword tool before publishing. See Future: Keyword Volume section.*

---

## 2. Meta Description

**Recommended (≤160 chars):**
> <meta description>

- Primary keyword included: Yes / No
- Call to action present: Yes / No
- Character count: <N>

---

## 3. URL Slug

**Current slug:** <slug>
**Recommended slug:** <slug>
**Change needed:** Yes / No

---

## 4. H1 Recommendation

**Current H1 (draft title):** <working_title>
**Recommended H1:** <recommendation>
**Primary keyword in H1:** Yes / No

---

## 5. H2/H3 Structure Review

| # | Current heading | Recommendation |
|---|----------------|----------------|
| 1 | <heading> | keep / reword to: "<new heading>" |
| … | | |

**Primary keyword in at least one H2:** Yes / No

---

## 6. Keyword Placement Checklist

| Position | Present? |
|----------|----------|
| H1 / Title | ✓ / ✗ |
| First 100 words | ✓ / ✗ |
| At least one H2 | ✓ / ✗ |
| Meta description | ✓ / ✗ |
| URL slug | ✓ / ✗ |

**Score: X / 5**

---

## 7. Readability Assessment

- **Estimated reading level:** <Plain English / Grade 8-10 / Technical>
- **Average sentence length:** ~<N> words
- **Long sentences (>30 words):** <count> — <list first 3 if count > 5, else "none / within acceptable range">
- **Passive voice instances:** <count> — <list examples if > 3>
- **Paragraph length:** <assessment>
- **Jargon density:** low / medium / high — <list terms if medium or high>
- **Overall:** Good / Needs work — <1-2 sentence assessment>

---

## 8. Content Quality Signals

- **Word count:** <N> (~<M> min read)
- **Target word count:** <N words / n/a>
- **On target:** Yes / Within 10% / Off by <N>%
- **External links:** <count> — <quality assessment>

---

## 9. Title Variants

| Style | Title | Suggested subtitle |
|-------|-------|--------------------|
| Keyword-first | <title> | <subtitle> |
| Curiosity-gap | <title> | <subtitle> |
| How-to | <title> | <subtitle> |
| Contrarian | <title> | <subtitle> |
| Authority | <title> | <subtitle> |

**Medium-specific notes:**
- Optimal title length: 40-60 characters
- Subtitles display on Medium post cards — treat them as a second hook

---

## 10. Quick Wins

1. <specific, actionable change>
2. <specific, actionable change>
3. <specific, actionable change>

---

## Future: Keyword Volume

*This brief does not include keyword search volume, difficulty, or SERP competition data. A future milestone will integrate a keyword API (candidates: Google Search Console API, DataForSEO free tier, SEMrush API) to enrich this section with: monthly search volume, keyword difficulty score, top-10 SERP competitors, and related keyword suggestions.*
```

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
