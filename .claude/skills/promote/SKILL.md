---
name: promote
description: Promotion skill. Reads long_draft.md to produce promotion_posts.md — 1 launch post + 3 section deep-dives ready to copy-paste to LinkedIn and Substack. Works on any draft, pipeline or standalone.
argument-hint: "[posts/<slug>/ — optional, defaults to current directory or asks]"
disable-model-invocation: true
---

# /promote

Generate copy-paste-ready promotional posts from any `long_draft.md`.

**Output:** `promotion_posts.md` — 1 launch post + 3 section deep-dives. Use the launch post on day 1 (when the article goes live) and one deep-dive per day after.

---

## Process

### Step 1 — Locate the post folder

If an argument was given (e.g. `/promote posts/my-post/`), use that path.

Otherwise check if the current directory contains a `long_draft.md`.

If neither: ask Jose which post folder to use.

---

### Step 2 — Stage guard

Read `post.yaml` if it exists. If `stages.promote.status` is `complete`, tell Jose:

> "Promotion has already run for this post (completed YYYY-MM-DD). Overwrite?"

Wait for confirmation before proceeding. If `post.yaml` doesn't exist, skip this step.

---

### Step 3 — Verify long_draft.md exists

If `long_draft.md` is missing from the post folder, stop and tell Jose clearly:

> "`long_draft.md` not found in `<path>`. Run `/draft` first or provide the path to a draft."

---

### Step 4 — Read all inputs silently

Read these files without printing their contents:

- `long_draft.md` — required; the article to promote
- `post.yaml` — optional; for working title, thesis, audience
- `seo_brief.md` — optional; for preferred title variant (use the curiosity-gap or authority variant if present — avoid keyword-first titles for social posts)
- `style_guide/promotion_formats.md` — required; the two templates

---

### Step 5 — Select 3 most promotable sections

Scan the H2 sections of `long_draft.md`. Select the 3 sections that best meet all three criteria:

1. **Clear standalone claim** — the section's core idea can be stated as a single provocative sentence without article context
2. **Concrete example or analogy** — the section contains something specific (a pattern, a mechanism, a comparison) that grounds the claim
3. **3 extractable bullet points** — the section has enough substance for three distinct 🔹 insights with paired 👉 follow-ups

Avoid: intro/ToC sections, closing/CTA sections, pure reference lists.

For each selected section, note a 1-line rationale (used in step 8).

---

### Step 6 — Generate the launch post

Follow the Launch Post Template from `style_guide/promotion_formats.md` exactly.

**Title to use** (priority order):
1. If `seo_brief.md` exists: use the curiosity-gap or authority variant from the Title Variants table
2. If `post.yaml` exists: use `working_title`
3. Else: use the H1 from `long_draft.md`

**Bold claim:** restate the article's thesis as a standalone, provocative statement — not a description of what the article contains. Draw from `post.yaml.thesis` if available.

**3 insight bullets:** the 3 most important takeaways from the whole article — one line each. These should be distinct from the section deep-dives.

**Engagement question:** must be relatable and slightly painful — something the audience has genuinely experienced or struggled with.

---

### Step 7 — Generate 3 section deep-dives

For each of the 3 selected sections, follow the Final Notes Template (v2) from `style_guide/promotion_formats.md` exactly.

Rules:
- Opening sentence must stand alone — no references to the article, previous posts, or other sections
- Exactly 3 🔹 bullets, each with a paired 👉 line
- The 👉 lines escalate: why it matters → how it works in reality → system-level implication
- No "as I wrote in my blog post" framing — promote the idea, not the article
- Engagement question must be distinct from the launch post question and from the other deep-dives

---

### Step 8 — Write promotion_posts.md

Create the `promotion/` directory if it doesn't exist. Write `promotion_posts.md` with this structure:

```
## Launch Post

> **Why this post:** [1-line reason the article is worth promoting — audience pain point it addresses]

[launch post content]

---

## Deep-dive 1: [Exact H2 Section Name]

> **Why this section:** [1-line reason it's the most promotable — what makes it stand-alone and shareable]

[deep-dive post content]

---

## Deep-dive 2: [Exact H2 Section Name]

> **Why this section:** [1-line reason]

[deep-dive post content]

---

## Deep-dive 3: [Exact H2 Section Name]

> **Why this section:** [1-line reason]

[deep-dive post content]
```

---

### Step 9 — Update post.yaml (if present)

Add or update these fields:

```yaml
artefacts:
  promotion_bundle: promotion_posts.md
stages:
  promote:
    status: complete
    completed_at: <today YYYY-MM-DD>
```

Leave all other fields untouched.

---

### Step 10 — Confirm

Print a summary:

```
✓ promotion_posts.md written

Sections selected for deep-dives:
1. [Section Name] — [1-line rationale]
2. [Section Name] — [1-line rationale]
3. [Section Name] — [1-line rationale]

Launch post title used: [title]
```

---

## Guardrails

- Do not reproduce the full article argument in any post — teasers only
- Each post (launch + 3 deep-dives) must be meaningfully distinct — not the same angle restated
- No "I wrote a blog post about..." framing in any variant
- Titles in the launch post must be accurate to the content — no clickbait drift
- Do not invent claims not present in the draft
