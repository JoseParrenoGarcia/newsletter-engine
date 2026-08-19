---
name: review
description: "Editorial quality gate — 3-critic multi-agent debate → 6-dimension rubric + panel consensus + publish readiness verdict. DO trigger: after the revise skill is complete; before publishing to Substack or Medium. DO NOT trigger: before long_draft.md exists; as a substitute for the revise skill (SEO-driven revision runs separately). Keywords: review, editorial, rubric, quality, voice, flow, publish, ready, score, multi-agent, debate, critics."
license: proprietary
metadata:
  author: jose-parreno-garcia
  version: "2.1"
---

Input: `posts/<slug>/` path, passed as the skill argument (`postFolder`) or asked for if not given.

Produce `review_report.md` for the post in `postFolder` (or ask if none given).

## Before you start

### 1. Locate the post folder
If `postFolder` is provided, that is the post folder. Otherwise look for `long_draft.md` in the current directory. If neither exists, stop and ask:
> "Which post do you want to review? Give me the slug (e.g. `claude-code-skills-explained`) or the path to the folder."

### 2. Check stage guard
If `post.yaml` exists and `stages.review.status` is `complete`, say:
> "Review is already marked complete for this post (completed: <date>). Do you want to redo it? This will overwrite `review_report.md`."

Wait for explicit confirmation before proceeding.

### 3. Verify `long_draft.md` exists
If `long_draft.md` is missing or is a placeholder, stop and say:
> "No draft found at `<path>/long_draft.md`. Run the draft skill (and optionally the revise skill) before reviewing."

### 4. Read `post.yaml` silently
Read `post.yaml` if present. Extract:
- `thesis` — pass to Impact & Argument Critic
- Confirm the resolved post folder path

This is all the main session needs. The critic agents read all other files themselves.

---

## Scoring guide

Use these definitions consistently across all passes.

| Score | Meaning |
|-------|---------|
| **5** | Excellent. No meaningful issues. Publishable as-is on this dimension. |
| **4** | Good. Minor issues that don't require fixes before publishing. |
| **3** | Acceptable. Noticeable weaknesses that would benefit from revision. |
| **2** | Weak. Clear failures that should be fixed before publishing. |
| **1** | Poor. Fundamental problem requiring significant rework. |

For structural completeness: **✓** present and correct, **~** present but weak or incomplete, **✗** missing.

---

## Critic agents

Invoke all 3 critic subagents **in parallel** if the runtime supports it. Do not wait for one to complete before starting the others.

**Sequential fallback (no parallel subagent capability):** invoke the three critics one at a time, then synthesize their results using the same rubric and verdict logic.

Use the resolved `POST_FOLDER`, `THESIS` (from `post.yaml`, or `"(not available)"`), and the known paths to the shared style guide files.

---

### Agent 1 — Voice & Audience Critic

Invoke the `voice-critic` subagent with this task prompt (substitute values before invoking):

> Post folder: `POST_FOLDER`
> Anti-patterns path: `style_guide/shared/anti_patterns.md`
> Voice guide path: `style_guide/shared/voice.md`

---

### Agent 2 — Structure & Depth Critic

Invoke the `structure-critic` subagent with this task prompt:

> Post folder: `POST_FOLDER`

---

### Agent 3 — Impact & Argument Critic

Invoke the `impact-critic` subagent with this task prompt:

> Post folder: `POST_FOLDER`
> Thesis: `THESIS`

---

## Synthesizer step

Once all 3 critics have returned their results:

### 1. Collect all scores
Extract from the critic outputs:
- Structural completeness: ✓/~/✗ for each of the 6 elements
- **ToC sync check:** For each bold phrase in the `## What will we cover in this post?` section, verify it matches the exact text of its corresponding H2 heading. Any mismatch is a ✗ structural element. Report mismatches as: `ToC: "phrase" → H2: "actual heading"`. This check runs on every review iteration.
- Voice fidelity score (Pass 2)
- Argument flow score (Pass 3)
- Section depth score (Pass 4)
- Actionability score (Pass 5)
- Audience specificity score (Pass 6)

### 2. Panel verdict
Read each critic's preliminary verdict:
- If all 3 agree → note "Unanimous: [verdict]"
- If 2 agree and 1 differs → note the split and which criterion is decisive (e.g. "Structure & Depth says Major rework due to ✗ structural element — this overrides Voice's 'Revise first' per verdict logic")
- If all 3 differ → apply the deterministic rule directly and note which dimension drove the outcome

### 2a. Cross-skill conflict resolution
Before scoring, check each critic finding against the rules in the draft and revise skills. If a critic flags something that directly conflicts with an explicit rule from an upstream skill (e.g. the structure critic flags question-format H2s as wrong, but the draft skill mandates question-format H2s for SEO), do not treat it as a revision target. Document the conflict in the review report with a note identifying which rule takes precedence (upstream skill rules override template defaults), and exclude it from the priority actions.

### 3. Apply final verdict logic deterministically:
- **Ready** — Structural completeness is all ✓ or at most one ~, and all scored dimensions are 4 or 5.
- **Revise first** — Any scored dimension is 3, or two or more structural elements are ~.
- **Major rework needed** — Any scored dimension is ≤ 2, or any structural element is ✗. If the verdict is triggered solely by a content-signal failure (a scored dimension ≤ 2 with no ✗ structural element), prefix the Priority actions section with: *"Note: verdict triggered by content signal failure — structural rework not required. Apply the priority actions below as targeted additions."*

State the verdict and write a single-sentence reason.

If verdict is "Revise first" or "Major rework needed", list priority actions (max 3) in descending order of impact. Be specific — name the section or passage, not the category. Draw from the critic outputs.

---

## Write `review_report.md`

Write to the post folder using the template in `assets/review_report_template.md`.

---

## Update `post.yaml`

If `post.yaml` exists, update:

Re-read `post.yaml` from disk immediately before writing — do not use any cached version from earlier in this run. Update only these fields, leaving all other fields exactly as they are:

```yaml
artefacts:
  review_report: review_report.md
stages:
  review:
    status: complete
    completed_at: <today YYYY-MM-DD>
```

---

## Confirm

Tell Jose:
- Publish readiness verdict (one word + one sentence reason)
- Panel consensus (unanimous or split, one line)
- Overall average score across the 5 scored dimensions (to one decimal place)
- The single lowest-scoring dimension and its score
- Number of priority actions (0 if Ready)
