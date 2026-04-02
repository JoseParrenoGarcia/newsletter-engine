---
name: review
description: "Editorial quality gate — 3-critic multi-agent debate → 6-dimension rubric + panel consensus + publish readiness verdict. DO trigger: after /revise is complete; before publishing to Substack or Medium. DO NOT trigger: before long_draft.md exists; as a substitute for /revise (SEO-driven revision runs separately). Keywords: review, editorial, rubric, quality, voice, flow, publish, ready, score, multi-agent, debate, critics."
argument-hint: "[posts/<slug>/ — optional, defaults to current directory or asks]"
license: proprietary
compatibility: "Claude Code"
metadata:
  author: jose-parreno-garcia
  version: "2.0"
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
Read in full before spawning any critics:
- `long_draft.md` — required
- `post.yaml` — optional; extract `thesis`, `target_audience`, `content_type`, `style_guides`
- Every file listed in `post.yaml → style_guides` — read in full
- `style_guide/shared/anti_patterns.md` — required for Voice & Audience Critic
- `style_guide/shared/voice.md` — required for Voice & Audience Critic

Note the resolved post folder path, thesis, and style guide paths — you will embed these in each critic's prompt.

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

Spawn all 3 agents **in parallel** using the Agent tool. Do not wait for one to complete before starting the others.

For each agent, substitute:
- `POST_FOLDER` with the resolved post folder path (e.g. `posts/my-post/`)
- `THESIS` with the thesis extracted from `post.yaml`, or `"(not available)"` if absent
- `ANTI_PATTERNS_PATH` with the path to `style_guide/shared/anti_patterns.md`
- `VOICE_PATH` with the path to `style_guide/shared/voice.md`

---

### Agent 1 — Voice & Audience Critic

**Prompt:**

> You are the Voice & Audience Critic for a newsletter post review.
>
> **Post folder:** `POST_FOLDER`
>
> **Your job:** Run 2 scoring passes on `POST_FOLDER/long_draft.md` and return a structured result. Read all required files before scoring.
>
> **Files to read:**
> - `POST_FOLDER/long_draft.md` (required)
> - `ANTI_PATTERNS_PATH`
> - `VOICE_PATH`
>
> ---
>
> ### Pass 2 — Voice Fidelity
>
> **Focus:** Does every paragraph sound like Jose, or does any passage slip into generic AI register?
>
> Work through the draft section by section. Cross-reference `anti_patterns.md` explicitly — name the specific pattern if a violation is found.
>
> **Positive voice markers to confirm are present** (from `voice.md`):
> - Short declarative sentences that land a point
> - Self-disclosing first person ("I've seen this", "In my team", "You can imagine my face…")
> - Cultural references or humour used naturally — not forced
> - Concrete specifics: numbers, roles, named tools, real scenarios
>
> **Failure modes to catch:**
> - Any phrase on the `anti_patterns.md` list
> - Hedging language ("it is important to note", "it is worth mentioning", "in today's landscape")
> - Abstract claims with no concrete grounding — a paragraph that makes a point anyone could make
> - Passages that could appear in any management blog with no change to tone or content
>
> Score 1–5. Cite at least one positive example. Flag the worst offending passage (if any). If score ≤ 3, quote the specific phrase or sentence that fails.
>
> ---
>
> ### Pass 6 — Audience Specificity
>
> **Focus:** Is this post unmistakably written for data science leads and tech leads, or is it generic enough that any engineering blog could publish it?
>
> Check for:
> - Does the framing signal this post is for data practitioners? (examples drawn from DS/ML teams, technical decisions, data work — not generic "leaders" or "managers")
> - Would a data scientist or technical lead reading this feel it was written for them — even if the explanation starts simple?
> - Is the pedagogical approach (building from basics) intentional and appropriate, or does it slide into a generic register that any non-technical manager could have written?
> - Personal grounding: does Jose's specific experience as a DS lead appear anywhere, or is every claim abstract and role-agnostic?
>
> **Failure mode:** A post where the framing, examples, and language could appear verbatim in a sales leadership or retail management blog — nothing signals the reader is a data practitioner.
>
> **Not a failure mode:** A post that builds from first principles or explains something simply. Pedagogical approach is intentional — starting simple for an expert audience is a feature, not a flaw. Do not penalise this.
>
> Score 1–5. If score ≤ 3, identify the section that feels most generic and note what specific grounding is missing.
>
> ---
>
> **Return your result in exactly this format:**
>
> ```
> VOICE_SCORE: [1-5]
> VOICE_POSITIVE_EXAMPLE: [one quoted sentence or phrase]
> VOICE_WORST_OFFENDER: [quoted phrase, or "None"]
> VOICE_ACTION: [one-line fix, or "None — score ≥ 4"]
>
> AUDIENCE_SCORE: [1-5]
> AUDIENCE_GENERIC_SECTION: [section name + one-line note, or "None"]
> AUDIENCE_ACTION: [one-line fix, or "None — score ≥ 4"]
>
> PRELIMINARY_VERDICT: [Ready / Revise first / Major rework needed]
> VERDICT_REASON: [one sentence]
> ```

---

### Agent 2 — Structure & Depth Critic

**Prompt:**

> You are the Structure & Depth Critic for a newsletter post review.
>
> **Post folder:** `POST_FOLDER`
>
> **Your job:** Run 2 scoring passes on `POST_FOLDER/long_draft.md` and return a structured result. Read all required files before scoring.
>
> **Files to read:**
> - `POST_FOLDER/long_draft.md` (required)
> - `POST_FOLDER/post.yaml` (optional — for content_type if present)
>
> ---
>
> ### Pass 1 — Structural Completeness
>
> **Focus:** Is every required structural element present, in the right place, and correctly formatted?
>
> Do not score prose quality here — that is for other passes. Check presence and placement only.
>
> Required elements for management posts:
>
> | Element | What to check |
> |---------|---------------|
> | Intro: anecdote → framing → thesis | Opens with a specific personal scene; thesis is explicit before the first H2 |
> | Subtitle/deck line | An italicised one-liner immediately under the H1 |
> | Preview section | Named `##` heading ("What will we cover?" or variant); uses labelled bullet list (`**Bold label.** Explainer.`) |
> | Main body H2 sections | 5–8 sections present; headings are noun-phrase or verb-phrase declarations |
> | Closing thoughts | Named `##` section (e.g. "Closing thoughts: …"); synthesis prose — not the last paragraphs of a content section |
> | Now, I want to hear from you | Named `##` section; 2–4 specific questions tied to the post's argument |
>
> Record ✓, ~, or ✗ and a one-line note for each element.
>
> ---
>
> ### Pass 4 — Section Depth
>
> **Focus:** Does each section deliver insight and resolution, or does it only describe a problem the reader already knew?
>
> For each H2 section, check:
> - Does it move beyond naming the problem to offering a frame, insight, or observation the reader didn't have before?
> - Does it close in a way that leaves the reader with something — a realisation, a reframe, a specific implication?
>
> **Failure mode:** A section that spends 3+ paragraphs describing a recognisable problem, then ends without adding any new way to think about it or act on it.
>
> Score 1–5. Call out the shallowest section by name. One line on what it's missing.
>
> ---
>
> **Return your result in exactly this format:**
>
> ```
> STRUCT_INTRO: [✓/~/✗] — [one-line note]
> STRUCT_SUBTITLE: [✓/~/✗] — [one-line note]
> STRUCT_PREVIEW: [✓/~/✗] — [one-line note]
> STRUCT_H2_SECTIONS: [✓/~/✗] — [one-line note]
> STRUCT_CLOSING: [✓/~/✗] — [one-line note]
> STRUCT_READER_QUESTIONS: [✓/~/✗] — [one-line note]
>
> DEPTH_SCORE: [1-5]
> DEPTH_SHALLOWEST_SECTION: [section name] — [what it's missing]
> DEPTH_ACTION: [one-line fix, or "None — score ≥ 4"]
>
> PRELIMINARY_VERDICT: [Ready / Revise first / Major rework needed]
> VERDICT_REASON: [one sentence]
> ```

---

### Agent 3 — Impact & Argument Critic

**Prompt:**

> You are the Impact & Argument Critic for a newsletter post review.
>
> **Post folder:** `POST_FOLDER`
> **Thesis:** `THESIS`
>
> **Your job:** Run 2 scoring passes on `POST_FOLDER/long_draft.md` and return a structured result. Read all required files before scoring.
>
> **Files to read:**
> - `POST_FOLDER/long_draft.md` (required)
>
> ---
>
> ### Pass 3 — Argument Build-up / Logical Flow
>
> **Focus:** Does the thesis get proven? Does each section earn the next?
>
> Work through the post's argumentative structure:
>
> 1. State the thesis from the intro in one sentence.
> 2. For each H2 section: does it advance the argument toward that thesis, or is it tangential?
> 3. Check transitions: does the end of each section imply the natural next question? Does the following section answer it directly?
> 4. Check the closing: does it synthesise the full argument, or just restate a summary?
>
> **Failure modes to catch:**
> - A section that could be removed without weakening the argument
> - A section that duplicates a point made earlier
> - A transition that announces the next topic ("Now let's look at…") rather than earning it
> - A closing that doesn't connect back to the opening anecdote or thesis
>
> Score 1–5. Name the weakest transition or the section with the weakest argumentative role. One-line note on why.
>
> ---
>
> ### Pass 5 — Actionability of Practical Guidance
>
> **Focus:** Would a tech lead reading this know what to do on Monday morning?
>
> Locate the primary "what to do" section (or equivalent). For each recommendation:
> - Is it specific enough to act on, or is it a category of action?
> - Is it tied to the specific argument of this post, or could it appear in any AI-and-management article?
>
> **Too specific enough:** "Set a PR size limit — 400 lines as a soft ceiling. Track time-to-review as a weekly metric."
> **Too vague:** "Strengthen review systems."
>
> Score 1–5. Quote any recommendation that is too vague and note what specificity is missing. If no practical guidance section exists, mark N/A and note this.
>
> ---
>
> **Return your result in exactly this format:**
>
> ```
> ARGUMENT_SCORE: [1-5]
> ARGUMENT_THESIS: [one sentence as stated in the intro]
> ARGUMENT_WEAKEST: [section name or transition] — [one-line note]
> ARGUMENT_ACTION: [one-line fix, or "None — score ≥ 4"]
>
> ACTION_SCORE: [1-5 or N/A]
> ACTION_WEAKEST_REC: [quoted recommendation, or "None"]
> ACTION_ACTION: [one-line fix, or "None — score ≥ 4 or N/A"]
>
> PRELIMINARY_VERDICT: [Ready / Revise first / Major rework needed]
> VERDICT_REASON: [one sentence]
> ```

---

## Synthesizer step

Once all 3 critics have returned their results:

### 1. Collect all scores
Extract from the critic outputs:
- Structural completeness: ✓/~/✗ for each of the 6 elements
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

### 3. Apply final verdict logic deterministically:
- **Ready** — Structural completeness is all ✓ or at most one ~, and all scored dimensions are 4 or 5.
- **Revise first** — Any scored dimension is 3, or two or more structural elements are ~.
- **Major rework needed** — Any scored dimension is ≤ 2, or any structural element is ✗.

State the verdict and write a single-sentence reason.

If verdict is "Revise first" or "Major rework needed", list priority actions (max 3) in descending order of impact. Be specific — name the section or passage, not the category. Draw from the critic outputs.

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
- Panel consensus (unanimous or split, one line)
- Overall average score across the 5 scored dimensions (to one decimal place)
- The single lowest-scoring dimension and its score
- Number of priority actions (0 if Ready)
