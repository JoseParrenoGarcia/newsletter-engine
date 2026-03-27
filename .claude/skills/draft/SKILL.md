---
name: draft
description: Drafting skill. Reads post.yaml, research_brief.md, notes.md, style guides, and reference posts to produce outline.md and long_draft.md. Follows the rough ToC strictly; captures structural suggestions separately.
argument-hint: "[posts/<slug>/ — optional, defaults to current directory]"
disable-model-invocation: true
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
- If `stages.research.status` is not `complete`: stop and say "Run `/research` first."
- If `target_reading_time_minutes` is null in `post.yaml`: ask Jose before proceeding:
  > "What's your target reading time for this post? (e.g. 10 min, 15 min, 20 min)"
  Update `post.yaml` with the answer before continuing.

### 4. Read all inputs silently
Read in full before writing anything:
- `post.yaml` — all fields
- `notes.md` — brainstorm summary and rough Table of Contents
- `research_brief.md` — all sources with summaries, grouped by ToC section
- Every file listed in `post.yaml → style_guides` — read in full
- Every file listed in `post.yaml → reference_posts` — read in full

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

Using the rough Table of Contents from `notes.md` as the fixed structure — do not add, remove, or reorder sections — produce `outline.md`:

```
# Outline: <working_title>

**Target:** ~<target_reading_time_minutes> min read (~<word_count_target> words)

## Sections

### 1. <Section name — from rough ToC>
- <What this section covers — 1-2 sentences>
- <Key point or angle to make>
- Sources: [<Title>](<url>), [<Title>](<url>)

### 2. <Section name>
- <What this section covers>
- <Key angle>
- Sources: [<Title>](<url>)

[repeat for every section in the rough ToC]

---

## ToC Suggestions

[Include this section only if you observe a structural issue worth flagging.
Omit entirely if none. Do NOT act on these — they are for Jose to review.]

- <Suggestion: e.g. "Section 3 covers two distinct ideas — consider splitting into 3a and 3b">
```

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
- Use the extracted style anchors from Step 1 as private calibration. Every section should reflect Jose's rhythm, not a generic AI register.
- Vary sentence length. Short sentences land a point. Longer ones build context or nuance. Mix them.
- No generic AI filler — refer to `style_guide/shared/anti_patterns.md` and actively avoid every pattern listed there.
- Follow the structural conventions in the type-specific style guide for this `content_type`.
- Do not pad to hit word count. If a section is done, it is done. Aim for the target, not a mechanical fill.

### Reference guardrails
- Only use URLs that appear in `research_brief.md`. No exceptions.
- Prefer inline hyperlinks with natural anchor text:
  `[the agentskills.io specification](url) defines this as...`
- Use numbered citations `[N]` when inline anchor text would feel forced:
  `...as documented in the official launch post[1].`
- If drawing on model knowledge with no citable source: write in prose only. No URL, no invented citation, no hedging footnote.
- Collect every cited source in a `## References` section at the end, numbered to match in-text citations:
  `[1] [Title](url) — 1-sentence description of what this source covers`

### Structure of `long_draft.md`
```
# <working_title>

[article prose — section by section per outline.md]

---

## References

[1] [Title](url) — 1-sentence description
[2] [Title](url) — 1-sentence description
...
```

Write `long_draft.md` to the post folder.

---

## Step 5 — Update `post.yaml`

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
