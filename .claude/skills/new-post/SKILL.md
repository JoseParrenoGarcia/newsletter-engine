---
name: new-post
description: Create a new post folder with the standard template and kick off the brainstorm session. Chains the full pipeline unattended when requested. Use --from-draft to run only the post-draft stages on an existing draft.
argument-hint: "[slug or --from-draft posts/<slug>/ — optional]"
disable-model-invocation: true
---

Two entry modes depending on `$ARGUMENTS`:

- **No argument or a plain slug** → Mode A: new post from scratch
- **`--from-draft posts/<slug>/`** → Mode B: run post-draft stages on an existing draft

---

## Mode A — New post from scratch

### Step 1 — Determine the slug

If `$ARGUMENTS` is a plain string (not `--from-draft`), use it as the slug. Apply these rules:
- Lowercase
- Replace spaces and special characters with hyphens
- Remove punctuation
- Collapse multiple hyphens to one
- Example: `"My GenAI post idea"` → `my-genai-post-idea`

If no argument is provided, ask:
> "What would you like to call this post? I'll use your answer to create a folder slug — or give me a rough working title and I'll derive one."

Wait for the answer, then derive the slug and confirm:
> "I'll create `posts/my-genai-post-idea/` — does that look right?"

### Step 2 — Check for conflicts

If `posts/<slug>/` already exists:

Check whether `posts/<slug>/long_draft.md` exists and is not a placeholder:
- **Draft exists** → say: "A folder at `posts/<slug>/` already exists and it has a draft. Do you want to run post-draft stages on it (SEO → revise → promote)? Or start fresh with a different slug?" — if yes, switch to Mode B with this slug.
- **No draft** → say: "A folder at `posts/<slug>/` already exists. Do you want to continue with a different slug, or open the existing post and run `/brainstorm` on it directly?"

Stop and wait for Jose's answer.

### Step 3 — Create folder and copy template

Create `posts/<slug>/` and populate it:

```
posts/<slug>/
  notes.md                  # copy of templates/notes.md
  post.yaml                 # copy of templates/post.yaml, with slug field pre-filled
  research_brief.md         # copy of templates/placeholder.md
  outline.md                # copy of templates/placeholder.md
  long_draft.md             # copy of templates/placeholder.md
  seo_brief.md              # copy of templates/placeholder.md
  promotion_posts.md        # copy of templates/placeholder.md
```

In the copied `post.yaml`, pre-fill:
```yaml
slug: "<slug>"
```

### Step 4 — Confirm and hand off to brainstorm

Tell Jose:
> "Created `posts/<slug>/`. Starting the brainstorm now."

Then immediately run the `/brainstorm` skill on `posts/<slug>/`.

### Step 5 — After brainstorm — pipeline menu

Once `/brainstorm` has finished and `post.yaml` is written, present:

> "Brainstorm complete. What would you like to do next?
> 1. Run full pipeline (research → draft → seo → revise → promote)
> 2. Run research only
> 3. Stop here — I'll continue later"

**Option 1:** Run the full pipeline — see "Full pipeline execution" section below.

**Option 2:** Run `/research posts/<slug>/` only.

**Option 3:** Exit. Remind Jose they can resume at any point with the relevant skill (e.g. `/research posts/<slug>/`).

---

## Mode B — From existing draft

Triggered by: `/new-post --from-draft posts/<slug>/` OR by the conflict-check branch in Mode A when a draft already exists.

### Step 1 — Locate the post folder

Parse the slug or path from `$ARGUMENTS`. If no path given (just `--from-draft` alone), ask:
> "Which post? Give me the slug (e.g. `claude-code-skills-explained`) or the full path to the post folder."

### Step 2 — Verify draft exists

If `long_draft.md` is missing or is a placeholder, stop:
> "No draft found at `posts/<slug>/long_draft.md`. Run `/draft` first, or use `/new-post <slug>` to start from scratch."

### Step 3 — Report stage status

Read `post.yaml` if it exists and report which stages are already complete:
> "Found draft at `posts/<slug>/`. Stage status:
> - research: complete (2026-03-27)
> - draft: complete (2026-03-27)
> - seo: complete (2026-03-28)
> - revise: pending
> - promote: pending"

### Step 4 — From-draft menu

Present:

> "Which stages do you want to run?
> 1. Run from SEO (seo → revise → promote)
> 2. Run revise + promote only (requires seo_brief.md)
> 3. Run promote only (requires long_draft.md)
> 4. Run a single stage — which one?"

Run the selected stages using the stage-skip logic and decision_log appending described in the sections below.

---

## Full pipeline execution

When the full pipeline is requested (Mode A option 1, or Mode B option 1), run each stage in sequence:

1. `/research posts/<slug>/`
2. `/draft posts/<slug>/` — in pipeline mode (no pause after outline; proceed directly to writing)
3. `/seo posts/<slug>/`
4. `/revise posts/<slug>/`
5. `/promote posts/<slug>/`

After each stage completes, append to `decision_log.md` — see [decision_log format](#decision_log-format) below.

---

## Stage-skip logic

Before running any stage, check `post.yaml`:

- If `stages.<name>.status == complete`: print `⏩ Skipping [stage] — already complete (completed_at: <date>)` and move to the next stage.
- If `post.yaml` is absent: run all stages without stage-skip checks.
- If a stage skill is not yet implemented: print `⏸ [Stage] not yet available — stopping here.` and exit cleanly.

Apply this logic for every stage in the sequence, regardless of how the pipeline was invoked.

---

## decision_log format

`decision_log.md` lives at `posts/<slug>/decision_log.md`. Append after each stage (do not overwrite):

```markdown
## <YYYY-MM-DD> — <stage name>

- <1-line summary of what the stage did>
- <any flags: gaps found, stages skipped, quality issues raised>
- Artefact written: <path>
```

Example of a full-pipeline log:

```markdown
## 2026-03-28 — brainstorm
- Created post.yaml: thesis set, target 12 min (3000 words), 2 reference posts linked
- Artefact written: post.yaml

## 2026-03-28 — research
- Validated 2 existing URLs (both active); added 6 new sources via WebSearch
- Artefact written: research_brief.md

## 2026-03-28 — draft
- Word count: 3,247 (~10 min read — within 10% of target)
- Artefact written: long_draft.md

## 2026-03-28 — seo
- Keyword placement: 4/5 (missing: first 100 words); recommended title: curiosity-gap variant
- Artefact written: seo_brief.md

## 2026-03-28 — revise
- Applied 5 changes (3 Quick Wins + 2 keyword gaps); keyword placement 4/5 → 5/5
- Artefacts written: long_draft.md (revised), long_draft_v1.md (backup)

## 2026-03-28 — promote
- Selected sections: Hidden gems, When skills fail, Mental model
- Artefact written: promotion_posts.md
```

If `decision_log.md` does not yet exist, create it with a header:

```markdown
# Decision Log: <slug>

Generated by /new-post pipeline. Each section is appended by the skill that ran.

---
```

Then append the first stage block immediately below.
