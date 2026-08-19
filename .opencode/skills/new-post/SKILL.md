---
name: new-post
description: "Pipeline orchestrator. Creates a new post folder from the standard template and chains the full pipeline (brainstorm → research → draft → seo → revise → review → promote) with stage-skip logic and a decision_log. DO trigger: when starting a new post from scratch; when running post-draft stages on an existing draft (--from-draft); when the full pipeline needs to run unattended. DO NOT trigger: when a single isolated stage is needed (invoke that skill directly instead). Keywords: new post, pipeline, orchestrator, full pipeline, from-draft, stage-skip, decision_log, brainstorm, template."
license: proprietary
metadata:
  author: jose-parreno-garcia
  version: "1.3"
---

Input: a slug, `--run-all <slug>`, `--from-draft posts/<slug>/`, or `--run-all --from-draft posts/<slug>/`, passed as the skill argument (`postFolder`) or asked for if not given.

`--run-all` is the unattended mode. It selects the full pipeline automatically after folder creation and brainstorm, without presenting the post-brainstorm or from-draft stage-selection menus. Stage guards still apply, and review verdict gates remain active.

Two entry modes depending on the argument given:

- **No argument or a plain slug** → Mode A: new post from scratch
- **`--run-all <slug>`** → Mode A, unattended full pipeline
- **`--from-draft posts/<slug>/`** → Mode B: run post-draft stages on an existing draft
- **`--run-all --from-draft posts/<slug>/`** → Mode B, unattended full pipeline with stage-skip logic

---

## Mode A — New post from scratch

### Step 1 — Determine the slug

If the argument includes `--run-all`, set `run_all=true` and parse the remaining slug argument. If the argument is a plain string (not `--from-draft`), use it as the slug. Apply these rules:
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
- **No draft** → say: "A folder at `posts/<slug>/` already exists. Do you want to continue with a different slug, or open the existing post and run the brainstorm skill on it directly?"

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
  review_report.md          # copy of templates/placeholder.md
  promotion_posts.md        # copy of templates/placeholder.md
```

In the copied `post.yaml`, pre-fill:
```yaml
slug: "<slug>"
```

### Step 4 — Confirm and hand off to brainstorm

Tell Jose:
> "Created `posts/<slug>/`. Starting the brainstorm now."

Then immediately run the brainstorm skill on `posts/<slug>/`.

### Step 5 — After brainstorm — pipeline menu or unattended continuation

Once the brainstorm skill has finished and `post.yaml` is written:

- **If `run_all=true`:** do not present a menu. Continue immediately to **Full pipeline execution** below.
- **Otherwise:** present:

> "Brainstorm complete. What would you like to do next?
> 1. Run full pipeline (research → draft → seo → revise → review → promote)
> 2. Run research only
> 3. Stop here — I'll continue later"

**Option 1:** Run the full pipeline — see "Full pipeline execution" section below.

**Option 2:** Run the research skill on `posts/<slug>/` only.

**Option 3:** Exit. Remind Jose they can resume at any point with the relevant skill (e.g. the research skill on `posts/<slug>/`).

---

## Mode B — From existing draft

Triggered by: this skill invoked with `--from-draft posts/<slug>/` or `--run-all --from-draft posts/<slug>/` OR by the conflict-check branch in Mode A when a draft already exists.

### Step 1 — Locate the post folder

Parse the slug or path from the argument given. If no path given (just `--from-draft` alone), ask:
> "Which post? Give me the slug (e.g. `claude-code-skills-explained`) or the full path to the post folder."

### Step 2 — Verify draft exists

If `long_draft.md` is missing or is a placeholder, stop:
> "No draft found at `posts/<slug>/long_draft.md`. Run the draft skill first, or start this skill with `<slug>` to start from scratch."

### Step 3 — Report stage status

Read `post.yaml` if it exists and report which stages are already complete:
> "Found draft at `posts/<slug>/`. Stage status:
> - research: complete (2026-03-27)
> - draft: complete (2026-03-27)
> - seo: complete (2026-03-28)
> - revise: pending
> - review: pending
> - promote: pending"

### Step 4 — From-draft menu or unattended continuation

If `run_all=true`, do not present the menu. Continue immediately to **Full pipeline execution** below, applying stage-skip logic to the existing draft.

Otherwise present:

> "Which stages do you want to run?
> 1. Run from SEO (seo → revise → review loop → promote)
> 2. Run revise + review loop + promote only (requires seo_brief.md)
> 3. Run promote only (requires long_draft.md)
> 4. Run a single stage — which one?"

**Option 1 execution** — after running seo and revise, apply the review loop:

   **Before each review run:** set `stages.review.status: pending` in `post.yaml` (bypasses the stage guard on re-runs).

   Run the review skill on `posts/<slug>/`.

   After the run, read `review_report.md` and find the `### [verdict]` heading under `## Publish Readiness Verdict`.

   - **If verdict is "Ready":** exit the loop and run the promote skill on `posts/<slug>/`. Then run the index skill on `posts/<slug>/` to append the post to `posts/INDEX.md`.
   - **If verdict is "Revise first" or "Major rework needed"** AND this is run 1 or 2:
     - Read the numbered priority actions under `### Priority actions` in `review_report.md`
     - Apply targeted editorial fixes directly to `long_draft.md`, addressing the priority actions in order of impact. Name the section and what was changed.
     - Append to `decision_log.md`: review iteration number, verdict, what was changed and why.
     - Repeat from the top of the loop.
   - **If verdict is not "Ready" after run 3:** stop. Tell Jose:
     > "The post has gone through 3 review iterations and is still not ready. Final verdict: [verdict]. Remaining priority actions: [list]. Do you want to make manual changes and re-run review, or proceed to promote anyway?"
     Wait for Jose's instruction. Do not run the promote skill automatically.

For all other options, run the selected stages using the stage-skip logic and decision_log appending described in the sections below.

---

## Full pipeline execution

When the full pipeline is requested (Mode A `--run-all` or option 1, or Mode B `--run-all` or option 1), run each stage in sequence:

1. Run the research skill on `posts/<slug>/`
2. Run the draft skill on `posts/<slug>/` — in pipeline mode (no pause after outline; proceed directly to writing). When invoking the draft skill's subagent, explicitly instruct it to write `long_draft.md` incrementally (write the first section, then append per subsequent section) rather than composing the full draft in one response — required regardless of target word count, per the long-form file write discipline in `AGENTS.md`.
3. Run the seo skill on `posts/<slug>/`
4. Run the revise skill on `posts/<slug>/` — when invoking the revise skill's subagent, explicitly instruct it to apply edits incrementally (one edit per change, not batched) rather than reproducing large stretches of revised prose in a single response.
5. Review loop — run up to 3 times:

   **Before each review run:** set `stages.review.status: pending` in `post.yaml` (bypasses the stage guard on re-runs).

   Run the review skill on `posts/<slug>/`.

   After the run, read `review_report.md` and find the `### [verdict]` heading under `## Publish Readiness Verdict`.

   - **If verdict is "Ready":** exit the loop and proceed to step 6.
   - **If verdict is "Revise first" or "Major rework needed"** AND this is run 1 or 2:
     - Read the numbered priority actions under `### Priority actions` in `review_report.md`
     - Apply targeted editorial fixes directly to `long_draft.md`, addressing the priority actions in order of impact. Name the section and what was changed.
     - Append to `decision_log.md`: review iteration number, verdict, what was changed and why.
     - Repeat from the top of the loop.
   - **If verdict is not "Ready" after run 3:** stop. Tell Jose:
     > "The post has gone through 3 review iterations and is still not ready. Final verdict: [verdict]. Remaining priority actions: [list]. Do you want to make manual changes and re-run review, or proceed to promote anyway?"
     Wait for Jose's instruction. Do not run the promote skill automatically.

6. Run the promote skill on `posts/<slug>/` — only if the loop exited with "Ready".
7. Run the index skill on `posts/<slug>/` — append the post to `posts/INDEX.md`.

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

Entry format, full pipeline example, and initialisation instructions are in `.opencode/skills/new-post/references/decision-log-format.md` — load that file when writing to `decision_log.md`.
