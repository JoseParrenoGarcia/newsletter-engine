---
name: brainstorm
description: Interactive brainstorm session from rough notes (or nothing) → populated post.yaml + expanded notes.md with rough ToC.
argument-hint: "[posts/<slug>/ — optional, defaults to current directory]"
disable-model-invocation: true
---

Run an interactive brainstorm session for the post in `$ARGUMENTS` (or the current post folder if no argument given).

## Before you start

### 1. Locate the post folder
If `$ARGUMENTS` is provided, that is the post folder. Otherwise look for a `post.yaml` in the current directory. If neither exists, tell Jose to either provide a folder path or run `/new-post` first.

### 2. Check stage guard
Read `post.yaml`. If `stages.brainstorm.status` is `complete`, say:
> "Brainstorm is already marked complete for this post. Do you want to redo it? This will overwrite the existing post.yaml content and brainstorm section in notes.md."
Wait for explicit confirmation before proceeding.

### 3. Read notes silently
If `notes.md` exists and has content beyond the heading, read it fully before sending your first message. Do not mention that you read it — just let it inform your questions.

---

## The brainstorm conversation

This is a natural back-and-forth conversation. Do not present a form or a checklist. Ask questions, listen, build understanding iteratively.

Your goal is to organically cover all of these (in whatever order feels natural):
- What is the post about? What's the core argument or insight Jose wants to make?
- Who is the reader? What do they already know?
- What sub-topics or angles are worth exploring?
- What should be explicitly out of scope or avoided?
- Are there open questions that would need research?
- What's the structural shape — is there a logical arc (problem → insight → takeaway)?
- Is this a standalone essay, a short technical piece, or part of a series?
- What subject area: management, a paper explainer, a book review, or GenAI/ML?
- If series: what is the series name and where does this post sit in the sequence?

Let the conversation breathe. Follow Jose's lead. Ask one or two questions at a time, not five.

### Wrapping up

When you have enough to populate every field in `post.yaml` and sketch a rough table of contents, ask one final question before proposing to wrap up:

> "How long should this be? Give me a reading time — e.g. 10 min, 15 min, 20 min."

Wait for the answer, then say:
> "I think we have enough to write this up. Want me to go ahead and produce the YAML and summary notes?"

Jose can also say "let's wrap up" at any point — work with what you have.

---

## Output

Run the following four steps in order once Jose agrees to wrap up.

### Step 1 — Suggest reference posts
Scan `reference_posts/` for files matching the `content_type` and `structural_type` you've identified. Propose 2–4 relevant posts with a one-line reason for each. Ask Jose to confirm, reject, or substitute.

Example:
> "Based on what we've discussed (standalone × management), here are the reference posts I'd suggest:
> - `reference_posts/standalone/management/how-i-broke-3-myths.md` — similar personal-experience framing
> - `reference_posts/standalone/management/the-5-traits.md` — comparable structural arc
> Does this look right, or would you swap any out?"

### Step 2 — Suggest style guide
Based on `content_type`, add the matching type-specific guide:
- `management` → `style_guide/types/management.md`
- `paper-explainer` → `style_guide/types/paper-explainer.md`
- `book-review` → `style_guide/types/book-review.md`
- `series-genai` → `style_guide/types/series-genai.md`

Confirm with Jose (usually a quick "yes" is enough — just name it).

### Step 3 — Write `post.yaml`
Write a fully populated `post.yaml` to the post folder. All fields must have a value — no empty strings except `series_name` and `series_position` for non-series posts. Include `target_reading_time_minutes` from the answer given during wrap-up.

Set:
- `stages.brainstorm.status: complete`
- `stages.brainstorm.completed_at: <today's date in YYYY-MM-DD>`
- `style_guides` includes `shared/voice.md`, `shared/anti_patterns.md`, and the confirmed type-specific guide
- `reference_posts` contains the confirmed paths

### Step 4 — Update `notes.md`
Append the following section to `notes.md` (after any existing content). Do not modify or delete anything above it.

```
---

## Brainstorm Summary

[3–5 paragraphs capturing the key ideas, framing, and decisions from the brainstorm. Write in plain prose — this will be read by future agents as the source of truth for what the post is about.]

## Rough Table of Contents

[Bullet list of proposed sections. Each bullet: section title + one sentence on what it covers.]
```

---

## After output

Tell Jose:
- Path to the written `post.yaml`
- That `notes.md` has been updated with the summary and rough ToC
- Any fields you were uncertain about (flag them explicitly so Jose can review)
