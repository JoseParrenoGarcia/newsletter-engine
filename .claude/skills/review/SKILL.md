---
name: review
description: "Editorial quality gate — scores the revised draft against 6 rubric dimensions and produces a publish-readiness verdict. DO trigger: after /revise is complete; before publishing to Substack or Medium. DO NOT trigger: before long_draft.md exists; as a substitute for /revise (SEO-driven revision runs separately). Keywords: review, editorial, rubric, quality, voice, flow, publish, ready, score."
argument-hint: "[posts/<slug>/ — optional, defaults to current directory or asks]"
disable-model-invocation: true
license: proprietary
compatibility: "Claude Code"
metadata:
  author: jose-parreno-garcia
  version: "1.0"
---

Produce `review_report.md` for the post in `$ARGUMENTS` (or ask if no argument is given).

## Before you start

### 1. Locate the post folder
If `$ARGUMENTS` is provided, that is the post folder. Otherwise look for `long_draft.md` in the current directory. If neither exists, stop and ask:
> "Which post do you want to review? Give me the slug (e.g. `claude-code-skills-explained`) or the path to the folder."

### 2. Check stage guard
If `post.yaml` exists and `stages.review.status` is `complete`, say:
> "Review is already marked complete for this post (completed: <date>). Do you want to redo it? This will overwrite `review_report.md`."

Wait for explicit confirmation before proceeding.

### 3. Verify `long_draft.md` exists
If `long_draft.md` is missing or is a placeholder, stop and say:
> "No draft found at `<path>/long_draft.md`. Run `/draft` (and optionally `/revise`) before reviewing."

### 4. Read all inputs silently
Read in full before any analysis:
- `long_draft.md` — required
- `post.yaml` — optional; extract `thesis`, `target_audience`, `content_type`
- Every file listed in `post.yaml → style_guides` — read in full
- `style_guide/shared/anti_patterns.md` — required for Pass 2
- `style_guide/shared/voice.md` — required for Pass 2

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

## Pass 1 — Structural completeness

**Focus:** Is every required structural element present, in the right place, and correctly formatted?

Do not score prose quality here — that is for later passes. Check presence and placement only.

Required elements for management posts:

| Element | What to check |
|---------|---------------|
| Intro: anecdote → framing → thesis | Opens with a specific personal scene; thesis is explicit before the first H2 |
| Subtitle/deck line | An italicised one-liner immediately under the H1 |
| Preview section | Named `##` heading ("What will we cover?" or variant); uses labelled bullet list (`**Bold label.** Explainer.`) |
| Main body H2 sections | 5–8 sections present; headings are noun-phrase or verb-phrase declarations |
| Closing thoughts | Named `##` section (e.g. "Closing thoughts: …"); synthesis prose — not the last paragraphs of a content section |
| Now, I want to hear from you | Named `##` section; 2–4 specific questions tied to the post's argument |

Record ✓, ~, or ✗ and a one-line note for each element.

---

## Pass 2 — Voice fidelity

**Focus:** Does every paragraph sound like Jose, or does any passage slip into generic AI register?

Work through the draft section by section. Cross-reference `anti_patterns.md` explicitly — name the specific pattern if a violation is found.

**Positive voice markers to confirm are present** (from `voice.md`):
- Short declarative sentences that land a point
- Self-disclosing first person ("I've seen this", "In my team", "You can imagine my face…")
- Cultural references or humour used naturally — not forced
- Concrete specifics: numbers, roles, named tools, real scenarios

**Failure modes to catch:**
- Any phrase on the `anti_patterns.md` list
- Hedging language ("it is important to note", "it is worth mentioning", "in today's landscape")
- Abstract claims with no concrete grounding — a paragraph that makes a point anyone could make
- Passages that could appear in any management blog with no change to tone or content

Score 1–5. Cite at least one positive example and flag the worst offending passage (if any). If score ≤ 3, quote the specific phrase or sentence that fails.

---

## Pass 3 — Argument build-up / logical flow

**Focus:** Does the thesis get proven? Does each section earn the next?

Work through the post's argumentative structure:

1. State the thesis from the intro in one sentence.
2. For each H2 section: does it advance the argument toward that thesis, or is it tangential?
3. Check transitions: does the end of each section imply the natural next question? Does the following section answer it directly?
4. Check the closing: does it synthesise the full argument, or just restate a summary?

**Failure modes to catch:**
- A section that could be removed without weakening the argument
- A section that duplicates a point made earlier
- A transition that announces the next topic ("Now let's look at…") rather than earning it
- A closing that doesn't connect back to the opening anecdote or thesis

Score 1–5. Name the weakest transition or the section with the weakest argumentative role. One-line note on why.

---

## Pass 4 — Section depth

**Focus:** Does each section deliver insight and resolution, or does it only describe a problem the reader already knew?

For each H2 section, check:
- Does it move beyond naming the problem to offering a frame, insight, or observation the reader didn't have before?
- Does it close in a way that leaves the reader with something — a realisation, a reframe, a specific implication?

**Failure mode:** A section that spends 3+ paragraphs describing a recognisable problem, then ends without adding any new way to think about it or act on it.

Score 1–5. Call out the shallowest section by name. One line on what it's missing.

---

## Pass 5 — Actionability of practical guidance

**Focus:** Would a tech lead reading this know what to do on Monday morning?

Locate the primary "what to do" section (or equivalent). For each recommendation:
- Is it specific enough to act on, or is it a category of action?
- Is it tied to the specific argument of this post, or could it appear in any AI-and-management article?

**Too specific enough:** "Set a PR size limit — 400 lines as a soft ceiling. Track time-to-review as a weekly metric."
**Too vague:** "Strengthen review systems."

Score 1–5. Quote any recommendation that is too vague and note what specificity is missing. If no practical guidance section exists, mark N/A and note this.

---

## Pass 6 — Audience specificity

**Focus:** Is this post unmistakably written for data science leads and tech leads, or is it generic enough that any engineering blog could publish it?

Check for:
- References to the reader's specific context (data science teams, ML models, A/B tests, production systems, sprint planning)
- Examples that only make sense if you've managed a technical team
- Language that assumes domain knowledge rather than explaining basics
- Personal grounding that connects to Jose's specific experience as a DS lead

**Failure mode:** A post about "software engineering leaders" that never grounds its claims in the DS/ML context — every section could be transplanted to a generic SWE management post with no change.

Score 1–5. If score ≤ 3, identify the section that feels most generic and note what specific grounding is missing.

---

## Publish readiness verdict

Apply this logic deterministically:

- **Ready** — Structural completeness is all ✓ or at most one ~, and all scored dimensions are 4 or 5.
- **Revise first** — Any scored dimension is 3, or two or more structural elements are ~.
- **Major rework needed** — Any scored dimension is ≤ 2, or any structural element is ✗.

State the verdict and write a single-sentence reason.

If verdict is "Revise first" or "Major rework needed", list priority actions (max 3) in descending order of impact. Be specific — name the section or passage, not the category.

---

## Write `review_report.md`

Write to the post folder using the template in `assets/review_report_template.md`.

---

## Update `post.yaml`

If `post.yaml` exists, update:

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
- Overall average score across the 5 scored dimensions (to one decimal place)
- The single lowest-scoring dimension and its score
- Number of priority actions (0 if Ready)
