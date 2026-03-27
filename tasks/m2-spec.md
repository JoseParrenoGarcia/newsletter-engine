# M2 Spec — Research

**Status:** Draft — awaiting Jose approval
**Date:** 2026-03-27

---

## What we're building

Two things:
1. `/research` skill — reads `post.yaml` + `notes.md`, validates/enriches existing URLs, fills gaps with targeted web searches, writes `research_brief.md`
2. `/new-post` update — after brainstorm completes, prompt Jose to run research only or the full pipeline

---

## 1. `research_brief.md` structure

```markdown
# Research Brief: <working_title>

**Generated:** YYYY-MM-DD

## Summary
[1 paragraph: what was in notes.md coming in (X URLs), how many survived validation,
how many were added via search, which ToC sections remain uncovered]

## Sources

### <Section or concept from rough ToC>
- **[Title](URL)**
  [1-3 sentences: what this source covers and why it's relevant to this section]

### <Next section or concept>
- **[Title](URL)**
  [1-3 sentences]

## Research Gaps
[Sections or concepts where no good source was found after searching.
Flagged for Jose to investigate manually if needed. Omit this section if no gaps.]
```

**Organisation principle:** sources grouped by ToC section/concept, not a flat list. This maps directly to how `/draft` will use them.

---

## 2. `/research` skill

### Inputs
- `post.yaml` — reads: `working_title`, `thesis`, `topics_to_cover`, `topics_to_exclude`, `open_research_questions`, `artefacts.notes`
- `notes.md` — reads: brainstorm summary, rough ToC, any URLs already present

### Stage guard
Check `post.yaml`. If `stages.research.status: complete`, say:
> "Research is already marked complete for this post. Do you want to redo it? This will overwrite `research_brief.md`."
Wait for explicit confirmation before proceeding.

### Process

#### Step 1 — Detect existing URLs
Scan `notes.md` for any URLs (http/https). Collect them as the "incoming list".

If the incoming list is empty, skip to Step 3.

#### Step 2 — Validate and enrich existing URLs
For each URL in the incoming list:
- Fetch the page (rich fetch)
- If the page is unreachable or returns an error: **drop silently** — do not include in output
- If reachable: extract title and write a 1-3 sentence summary of what the source covers and why it is relevant to this post
- Map the source to the most relevant section or concept from the rough ToC

#### Step 3 — Identify gaps
Using the rough ToC from `notes.md` and `open_research_questions` from `post.yaml`, identify which sections or concepts have no source assigned yet.

If all sections are covered and total sources ≤ 10: skip to Step 5.

#### Step 4 — Fill gaps with targeted searches
For each uncovered section or open research question:
- Run a targeted `WebSearch` query
- Select the best result: prefer sources that are specific, credible, and not already represented in the current list
- Fetch the selected URL: if unreachable, try the next result
- Extract title and 1-3 sentence summary
- Add to the source list

**Variety rule:** no more than 2 sources from the same domain. If a domain limit is hit, search for an alternative.

**Cap:** stop when total sources reach 10, even if some ToC sections remain uncovered. Flag uncovered sections in Research Gaps.

#### Step 5 — Write `research_brief.md`
Write to `posts/<slug>/research_brief.md` using the structure defined in section 1.

#### Step 6 — Update `post.yaml`
```yaml
artefacts:
  research_brief: research_brief.md
stages:
  research:
    status: complete
    completed_at: <today YYYY-MM-DD>
```

#### Step 7 — Confirm
Tell Jose:
- How many sources are in the brief
- How many came from notes.md vs found via search
- Any sections in Research Gaps
- Path to `research_brief.md`

---

## 3. `/new-post` update (M2 extension)

After `/brainstorm` completes and `post.yaml` is written, present:

> "Brainstorm complete. What would you like to do next?
> 1. Run research only
> 2. Run full pipeline (research → draft → seo → promote)
> 3. Stop here"

**Option 1:** run `/research` on the post folder.

**Option 2:** run `/research`, then for each subsequent stage check if it is implemented:
- If implemented: run it
- If not yet implemented: say *"[Stage] is not yet available — stopping here."* and exit

**Option 3:** exit cleanly. Jose can resume later with `/research posts/<slug>/`.

This menu stays the same across all milestones. Each milestone ships by making one more option in the "run full pipeline" path actually work.

---

## 4. Files to create / modify

| File | Action |
|---|---|
| `.claude/skills/research/SKILL.md` | New — research skill |
| `.claude/skills/new-post/SKILL.md` | Update — add post-brainstorm menu |

---

## 5. Definition of done

- [ ] `/research` produces a `research_brief.md` with at least 3–5 real, inspectable sources
- [ ] Every source has a working URL (broken links never appear in output)
- [ ] Sources are grouped by ToC section, not a flat list
- [ ] No more than 2 sources from the same domain
- [ ] Uncovered sections appear in Research Gaps, not silently dropped
- [ ] `post.yaml` updated with `research_brief` artefact path and stage complete
- [ ] `/research` works standalone on any post folder with a completed brainstorm
- [ ] `/new-post` presents the pipeline menu after brainstorm and handles unimplemented stages gracefully
- [ ] Stage guard prevents silent overwrites

---

## Open questions (none — ready to build)

All design decisions resolved in brainstorm session on 2026-03-27.
