# M4 Spec — SEO + Titles

**Status:** Complete (2026-03-28)
**Date:** 2026-03-28

---

## What we're building

Two things:
1. `/seo` skill — reads `long_draft.md` (+ `post.yaml` when available), produces `seo_brief.md`
2. `/new-post` update — chain `/seo` after `/draft` in pipeline mode (already stubbed as "not yet available")

---

## 1. Design decisions

### Platform
Medium-first. Title length recommendations, heading structure, and readability targets are calibrated to Medium's reading environment.

### Keyword research
No live keyword API in this milestone. The skill extracts candidate keywords from the draft content and thesis — ranked by prominence and relevance. Search volume data is explicitly out of scope; the brief notes the limitation and references a future API milestone.

### Inputs
- `long_draft.md` — required (the draft to analyse)
- `post.yaml` — optional; read when present. Fields used: `thesis`, `target_audience`, `topics_to_cover`, `topics_to_exclude`, `target_reading_time_minutes`. Gracefully skip any field that is null or empty — do not fail.
- `research_brief.md` — optional; used to assess external link quality

Standalone compatibility: `/seo` must work on any draft, including posts written by Jose outside the pipeline. If no `post.yaml` exists, run on `long_draft.md` alone.

### Title variants
5 options, one per style:
1. **Keyword-first** — primary keyword leads; readable and direct
2. **Curiosity-gap** — withholds the payoff to create intrigue
3. **How-to** — action-oriented; verb-led
4. **Contrarian** — challenges a common assumption
5. **Authority** — result + credibility signal

Each title should also have a suggested subtitle (Medium supports subtitle display).

---

## 2. `seo_brief.md` structure

```markdown
# SEO Brief: <working_title>

**Post:** posts/<slug>/long_draft.md
**Generated:** <YYYY-MM-DD>

---

## 1. Suggested Keywords

**Primary keyword:** <1 keyword phrase — the most prominent, searchable concept in the draft>
**Secondary keywords:**
- <keyword 2>
- <keyword 3>
- <keyword 4>
- <keyword 5>

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

**Current slug:** <from post.yaml, or inferred from folder name>
**Recommended slug:** <short, hyphenated, includes primary keyword>
**Change needed:** Yes / No

---

## 4. H1 Recommendation

**Current H1 (draft title):** <current working_title>
**Recommended H1:** <≤60 chars for Medium; includes primary keyword>
**Primary keyword in H1:** Yes / No

---

## 5. H2/H3 Structure Review

| # | Current heading | Recommendation |
|---|----------------|----------------|
| 1 | <current> | <keep / reword to: "..."> |
| 2 | <current> | <keep / reword to: "..."> |
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

- **Estimated reading level:** <e.g. Grade 9 / Plain English>
- **Average sentence length:** ~<N> words
- **Long sentences (>30 words):** <count> — <list first 3 examples if count > 5>
- **Passive voice instances:** <count> — <list examples if > 3>
- **Paragraph length:** <assessment — most paragraphs 2-4 sentences / some too long / good>
- **Jargon density:** low / medium / high — <note specific terms if high>
- **Overall:** Good / Needs work — <1-2 sentence assessment>

---

## 8. Content Quality Signals

- **Word count:** <actual> (~<estimated reading time> min read)
- **Target word count:** <from post.yaml if set, else n/a>
- **On target:** Yes / Within 10% / Off by <N>%
- **External links:** <count cited in draft> — <quality assessment: e.g. "all from authoritative sources / 2 links appear low-authority">

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
- Optimal Medium title length: 40-60 characters
- Subtitles display on Medium post cards — treat them as a second hook

---

## 10. Quick Wins

Top 3 highest-impact changes before publishing:

1. <specific, actionable change>
2. <specific, actionable change>
3. <specific, actionable change>

---

## Future: Keyword Volume

*This brief does not include keyword search volume, difficulty, or SERP competition data. A future milestone will integrate a keyword API (candidates: Google Search Console API, DataForSEO free tier, SEMrush API) to enrich this section with: monthly search volume, keyword difficulty score, top-10 SERP competitors, and related keyword suggestions.*
```

---

## 3. `/seo` skill

### Inputs
- `long_draft.md` — required
- `post.yaml` — optional
- `research_brief.md` — optional

### Standalone mode
If invoked without a path argument (`/seo` with no `$ARGUMENTS`), ask:
> "Which post do you want to run SEO review on? Give me the slug (e.g. `claude-code-skills-explained`) or the path to the draft file."

### Stage guard
If `post.yaml` exists and `stages.seo.status` is `complete`, say:
> "SEO brief is already marked complete for this post. Do you want to redo it? This will overwrite `seo_brief.md`."
Wait for explicit confirmation.

### Process

#### Step 1 — Load inputs
Read `long_draft.md` in full. If `post.yaml` exists, read it. If `research_brief.md` exists, read it.

#### Step 2 — Extract keywords
Identify the 1 primary keyword and up to 5 secondary keywords. Base this on:
- `thesis` from `post.yaml` (if available)
- `topics_to_cover` from `post.yaml` (if available)
- The most prominent concepts in the draft (frequent, central, in headings)

Exclude any terms in `topics_to_exclude` (if available).

#### Step 3 — Analyse the draft
Run through all checklist sections: meta description, slug, H1, H2/H3 structure, keyword placement, readability, content signals.

#### Step 4 — Generate title variants
Produce 5 titles (one per style) + suggested subtitle for each. All titles must:
- Be ≤70 characters (Medium hard limit)
- Include or strongly imply the primary keyword
- Not be click-bait — each should be accurate to the content

#### Step 5 — Identify Quick Wins
Select the top 3 changes that would have the most impact on discoverability or click-through rate on Medium.

#### Step 6 — Write `seo_brief.md`
Write to the post folder using the structure defined in section 2.

#### Step 7 — Update `post.yaml` (if present)
```yaml
artefacts:
  seo_brief: seo_brief.md
stages:
  seo:
    status: complete
    completed_at: <today YYYY-MM-DD>
```

#### Step 8 — Confirm
Tell Jose:
- SEO score (keyword placement: X/5)
- Overall readability verdict
- Which title variant Claude thinks is strongest and why (1 sentence)
- Top Quick Win

---

## 4. `/new-post` update (M4 extension)

No change needed to `/new-post` skill code. The pipeline menu already reads:
> "for each subsequent stage (seo → promote): if the skill exists and is implemented, run it; if not, say: *"[Stage] is not yet available — stopping here."*"

Once `/seo` exists, the pipeline will chain it automatically.

---

## 5. Files to create / modify

| File | Action |
|---|---|
| `.claude/skills/seo/SKILL.md` | New — SEO skill |
| `tasks/m4-spec.md` | New — this file |

---

## 6. Definition of done

- [ ] `/seo` produces a complete `seo_brief.md` for `claude-code-skills-explained`
- [ ] Keyword placement checklist scores correctly (X/5)
- [ ] 5 title variants present, one per style, each with subtitle
- [ ] Readability assessment present with specific examples (not generic)
- [ ] Quick Wins are specific and actionable — not generic advice
- [ ] Works standalone (no `post.yaml` required)
- [ ] Stage guard prevents silent overwrites
- [ ] Future: Keyword Volume section present
- [ ] `post.yaml` updated when present

---

## Open questions (none — ready to build)

All design decisions resolved on 2026-03-28.
