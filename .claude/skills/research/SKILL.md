---
name: research
description: Web-grounded research skill. Reads post.yaml and notes.md, validates existing URLs, fills gaps with targeted searches, writes research_brief.md organised by ToC section.
argument-hint: "[posts/<slug>/ — optional, defaults to current directory]"
disable-model-invocation: true
---

Run research for the post in `$ARGUMENTS` (or the current post folder if no argument given).

## Before you start

### 1. Locate the post folder
If `$ARGUMENTS` is provided, that is the post folder. Otherwise look for a `post.yaml` in the current directory. If neither exists, stop and tell Jose to provide a folder path.

### 2. Check stage guard
Read `post.yaml`. If `stages.research.status` is `complete`, say:
> "Research is already marked complete for this post. Do you want to redo it? This will overwrite `research_brief.md`."
Wait for explicit confirmation before proceeding.

### 3. Check brainstorm stage
If `stages.brainstorm.status` is not `complete`, say:
> "Brainstorm has not been completed for this post. Run `/brainstorm` first to produce a `post.yaml` and rough ToC before researching."
Stop.

### 4. Read inputs silently
Read in full before doing anything else:
- `post.yaml` — use: `working_title`, `thesis`, `topics_to_cover`, `topics_to_exclude`, `open_research_questions`
- `notes.md` — use: brainstorm summary, rough Table of Contents, any URLs already present

---

## Research process

### Step 1 — Detect existing URLs
Scan `notes.md` for any URLs (lines containing `http://` or `https://`). Collect them as the incoming list.

Tell Jose:
> "Found X existing URLs in notes.md. Validating them now."

If no URLs found, skip to Step 3.

### Step 2 — Validate and enrich existing URLs
For each URL in the incoming list:
- Fetch the page using the WebFetch tool
- If unreachable or returns an error: **drop silently** — do not include in any output
- If reachable:
  - Extract the page title
  - Write a 1-3 sentence summary: what this source covers and why it is relevant to this post's thesis and topics
  - Map it to the most relevant section or concept from the rough ToC in `notes.md`

Keep a running list of: `{ url, title, summary, toc_section }` for surviving sources.

### Step 3 — Identify gaps
List every distinct section or concept from the rough ToC in `notes.md`, plus every item in `open_research_questions` from `post.yaml`.

For each: check whether at least one surviving source is mapped to it.

Sections with no source = **gaps list**.

If no gaps and total sources ≤ 10: skip to Step 5.

### Step 4 — Fill gaps with targeted searches
For each item in the gaps list (working through ToC order):

1. Formulate a specific `WebSearch` query based on the section/concept and the post's thesis
2. Scan the top results — select the most relevant, credible source not already in the list
3. Check domain variety: if the selected domain already has 2 sources in the list, skip it and pick the next best result
4. Fetch the selected URL:
   - If unreachable: try the next result from the search
   - If reachable: extract title + write 1-3 sentence summary, map to the gap section
5. Add to the running list

**Hard cap:** stop adding sources once the total reaches 10, even if gaps remain. Any remaining uncovered sections go to the Research Gaps output.

**Variety rule:** never exceed 2 sources from the same domain across the entire brief.

### Step 5 — Write `research_brief.md`

Write to `posts/<slug>/research_brief.md`:

```
# Research Brief: <working_title>

**Generated:** <today YYYY-MM-DD>

## Summary
<1 paragraph: how many URLs were in notes.md, how many survived validation,
how many were added via search, which sections (if any) remain uncovered>

## Sources

### <ToC section or concept name>
- **[<title>](<url>)**
  <1-3 sentence summary of what this source covers and why it's relevant here>

### <Next section or concept>
- **[<title>](<url>)**
  <summary>

[repeat for all sections that have at least one source]

## Research Gaps
<Bullet list of sections/concepts where no good source was found.
Omit this section entirely if there are no gaps.>
```

Group sources under the ToC section they were mapped to. If a source is relevant to multiple sections, place it under the most specific one.

### Step 6 — Update `post.yaml`
Update the following fields:

```yaml
artefacts:
  research_brief: research_brief.md
stages:
  research:
    status: complete
    completed_at: <today YYYY-MM-DD>
```

### Step 7 — Confirm
Tell Jose:
- Total sources in the brief (X from notes.md, Y found via search)
- Any sections in Research Gaps
- Path to `research_brief.md`
- Any sources that were in notes.md but dropped (count only, not list — to avoid noise)
