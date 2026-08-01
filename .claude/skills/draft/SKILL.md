---
name: draft
description: "Produces outline.md and long_draft.md from post.yaml, research_brief.md, notes.md, style guides, and reference posts. DO trigger: after brainstorm and research stages are both complete; when a full long-form draft is needed. DO NOT trigger: before brainstorm or research are complete; when the draft already exists and the goal is SEO review or revision (use /seo or /revise); for short edits or single-section rewrites. Keywords: draft, outline, long_draft, writing, article, style guide, voice, reference posts, tone."
argument-hint: "[posts/<slug>/ — optional, defaults to current directory]"
license: proprietary
compatibility: "Claude Code"
metadata:
  author: jose-parreno-garcia
  version: "1.0"
---

Produce `outline.md` and `long_draft.md` for the post in `$ARGUMENTS` (or the current post folder if no argument given).

## Before you start

### 1. Locate the post folder
If `$ARGUMENTS` is provided, that is the post folder. Otherwise look for a `post.yaml` in the current directory. If neither exists, stop and tell Jose to provide a folder path.

### 2. Check stage guard
Read `post.yaml`. If `stages.draft.status` is `complete`, say:
> "Draft is already marked complete for this post. Do you want to redo it? This will overwrite `outline.md` and `long_draft.md`."
Wait for explicit confirmation before proceeding.

### 3. Check pre-conditions
- If `stages.brainstorm.status` is not `complete`: stop and say "Run `/brainstorm` first."
- If `stages.research.status` is not `complete` AND `research_brief.md` does not exist in the post folder: scan `notes.md` for named source URLs. If URLs are present, proceed using `notes.md` as the source layer and note this explicitly in the outline ("Sources drawn from notes.md — no research_brief.md"). If no URLs are found in `notes.md`, warn with "Research stage not complete and no sources found. Proceed with caution." Do not stop in either case. If `research_brief.md` exists, proceed normally regardless of stage status.
- If `target_reading_time_minutes` is null in `post.yaml`: ask Jose before proceeding:
  > "What's your target reading time for this post? (e.g. 10 min, 15 min, 20 min)"
  Update `post.yaml` with the answer before continuing.

### 4. Read all inputs silently

Spawn a subagent to read all input files in parallel and return their full contents. Pass it the post folder path and the list of files to read:
- `post.yaml`
- `notes.md`
- `research_brief.md` (if it exists)
- `templates/post_template.md`
- Every file listed in `post.yaml → style_guides`
- Every file listed in `post.yaml → reference_posts`

The subagent reads all files concurrently and returns their contents in a single structured response. This avoids hitting the response output cap that can occur when reading 6+ large files sequentially in the main session. Once the subagent returns, proceed with all content available in context.

---

## Step 1 — Extract style anchors from reference posts

From each reference post, privately extract exactly three passages:
1. **An opening** — how Jose enters the piece (the first 2-4 paragraphs)
2. **A transition** — how Jose moves between major sections
3. **A closing** — how Jose ends (the final 2-4 paragraphs)

Do not reproduce these in any output. Use them to internalise rhythm, sentence length variation, how Jose handles concrete vs abstract ideas, and how he frames the reader's takeaway. This is the calibration step — everything written after this should sound like someone who has absorbed these patterns.

---

## Step 2 — Build `outline.md`

Calculate: `word_count_target = target_reading_time_minutes × 250`

Using the rough Table of Contents from `notes.md` as the fixed structure — do not add, remove, or reorder sections — produce `outline.md` following the template in `assets/outline_template.md`.

For each section, map the most relevant source(s) from `research_brief.md`. If a section has no matching source, note "Sources: none — model knowledge only".

Write `outline.md` to the post folder.

---

## Step 3 — Pause or proceed

**Standalone mode** (invoked directly as `/draft posts/<slug>/`):
Show the outline to Jose and say:
> "Here's the outline. Does this look right before I write the full draft? Any adjustments to sections or sources?"
Wait for confirmation or changes. If Jose adjusts sections, update `outline.md` before proceeding.

**Pipeline mode** (invoked from `/new-post` with run-all):
Proceed immediately to Step 4 without pausing.

---

## Step 4 — Write `long_draft.md`

Write the full article section by section, following `outline.md` exactly.

### Voice and style guardrails
Apply these throughout — they are not optional:
- **Incremental writing (always):** Never compose the full `long_draft.md` in one response. Write the file section by section — use `Write` for the frontmatter/H1/subtitle/preview section first, then one `Edit` (append) call per subsequent H2 section. Never hold more than one section's worth of prose in a single response — composing the entire draft in one shot risks exceeding the response output cap and losing the write entirely.
- Use the extracted style anchors from Step 1 as private calibration. Every section should reflect Jose's rhythm, not a generic AI register. For `series-genai` posts: default to first-person narration throughout. Use "I" to ground claims in lived experience, frame positions personally ("I don't think this is good practice"), and open sections with the author's own perspective before the analytical argument. Third-person analytical register is a consistent failure mode for this post type.
- Vary sentence length. Short sentences land a point. Longer ones build context or nuance. Mix them.
- No generic AI filler — refer to `style_guide/shared/anti_patterns.md` and actively avoid every pattern listed there.
- **Example grounding:** when a section calls for a concrete example, check `notes.md` first for real examples from Jose's team, setup, or actual experience. Prefer grounded real examples over constructed plausible ones. A real example ("In my team, we are building...") earns reader trust in a way a generic scenario ("imagine a data science team that...") does not. If `notes.md` has no real example for a section, construct a specific plausible one — never a generic placeholder.
- **Structure:** follow the skeleton in `templates/post_template.md` — intro → preview section → main body → closing section → "Now, I want to hear from you". See the type-specific style guide for any overrides.
- **Heading capitalisation:** all H1, H2, and H3 headings must use sentence case — capitalise only the first word and proper nouns. Never use title case (capitalising every word).
- **H2 headings — question format:** every H2 must be written as a question starting with How, What, Why, When, Which, Is, Can, or Should. Include the primary or a secondary keyword in the question where it reads naturally. This is an AI discoverability requirement — descriptive H2s will be flagged by `/seo` and rewritten by `/revise`, so get them right in the draft. Example: `## What are Claude Code plugins?` not `## Claude Code plugin overview`.
- **"What will we cover in this post?" section:** this preview section heading must always be exactly `## What will we cover in this post?` — no variations, no paraphrasing. The bold phrase opening each bullet must match the exact text of the corresponding section H2. These phrases are the SEO anchor for that section — do not paraphrase or shorten them. Format: `**<exact H2 text>** — <one-line description of what the section covers>`.
- **Before writing the opening paragraph:** check the opening rules in the type-specific style guide. `series-genai`: three valid openings — thesis declaration, contrarian reframe, or grounded personal moment (a real team scenario or experience that bridges directly into the thesis). All three are explicitly permitted by the `series-genai` style guide; do not default to thesis-only or exclude the personal moment. `paper-explainer`: open with paper attribution, not anecdote.
- **Explanation depth:** the Register rule in `shared/voice.md` is a tone rule, not a depth rule. For complex or non-obvious concepts, build from first principles. Do not skip scaffolding on the assumption the reader already knows the internals.
- **Transitions:** close each section with a claim or observation that implies the natural next question. Open the following section by answering it directly. Do not use meta-commentary transitions ("Now that we've explored X...").
- Follow the type-specific style guide for all remaining structural conventions (technical depth, formatting, tone).
- Do not pad to hit word count. If a section is done, it is done. Aim for the target, not a mechanical fill.

### Reference guardrails
- Only use URLs that appear in `research_brief.md`. No exceptions.
- **Always use inline hyperlinks** — link the natural anchor phrase in the sentence directly to the source URL:
  `The [scaffold command](url) produces a directory with the correct layout...`
  `...as [documented in the official guide](url).`
- Never use numbered citation markers `[1]`, `[2]` etc. in the prose body. They are harder to read and break the flow.
- If drawing on model knowledge with no citable source: write in prose only. No URL, no invented citation, no hedging footnote.
- Always include a `## References` section at the end listing every cited source:
  `[Title](url) — 1-sentence description of what this source covers`

### Structure of `long_draft.md`
Follow the template in `assets/long_draft_template.md`.

Write `long_draft.md` to the post folder.

---

## Step 5 — Update `post.yaml`

> Re-read `post.yaml` from disk immediately before writing — do not use any cached version from earlier in this run. Update only these fields, leaving all other fields exactly as they are:

```yaml
artefacts:
  outline: outline.md
  long_draft: long_draft.md
stages:
  draft:
    status: complete
    completed_at: <today YYYY-MM-DD>
```

---

## Step 6 — Confirm

Tell Jose:
- Approximate word count and estimated reading time (actual vs target)
- Number of sources cited from `research_brief.md`
- Whether `## ToC Suggestions` is present in `outline.md` — if so, flag it explicitly
- Any sections written from model knowledge only (no research source)
