# Post Type: Series (GenAI / Technical)

For multi-part series on GenAI and data science topics. Two series in the corpus: *LLMs Explained* (6 parts, technical) and *Data Science in the Age of AI* (5 parts, strategic). These posts are Jose's most analytical writing — they explain how something works or reframe how the reader should think about their profession.

The universal rules in `voice.md` and `templates/post_template.md` apply to this post type. The following rules extend or override them specifically for series posts.

---

## Opening — thesis, contrarian reframe, or grounded personal moment

Series posts open with a position or a brief personal moment — both are valid, chosen by fit. Unlike management posts, the intellectual argument still has to be the hook; a personal anecdote here is a bridge into that argument, not a story for its own sake. The opening should still land on a line a reader might quote.

- **Thesis declaration:** "Your job isn't to build models; it's to solve problems."
- **Contrarian reframe:** "Prompting is not building AI systems." / "Fine-tuning is not a magic fix."
- **Grounded personal moment:** briefly narrate a real reaction or experience — reading a claim, hitting a problem, noticing a contradiction — that leads directly into the thesis. Keep it tight: a paragraph or two, not a full scene. This works well when the goal is to signal "I went through the same confusion/reaction the reader is having" before making the argument.

**What to avoid:** An anecdote that doesn't connect to the argument within 1-2 paragraphs, or that becomes the emotional focus rather than a bridge into the thesis.

For **Part 1 of a series:** include a "What we will cover in this series" preview section (3–5 labelled bullets from `post_template.md`) immediately after the opening.

For **later parts:** open with a brief "In this series so far" recap (2–4 bullets), then "In this part, we cover...".

---

## Series continuity rules

**Each part must stand alone.** A reader who arrives at Part 4 without reading Parts 1–3 should still follow the argument.

**Re-anchor key concepts without explicit back-references.** Instead of "In Part 2, we explained that...", briefly re-establish the concept as assumed shared knowledge: "The AutoML parallel — where a wave of automation reduced one class of manual work but elevated the value of judgment — applies here too."

**Series summary table at the final part.** The last post should include a table summarising the full arc:

| Part | Topic |
|------|-------|
| 1 | ... |
| N | ... |

**Explicit navigation at the bottom of every post:**
- `*Continues in [Part N+1: Title](./filename.md)*`
- For the final part: a summary of what the series covered, not a link.

---

## Closing choice

Two patterns across the two series — choose based on series register:

1. **Numbered Key Takeaways** (technical series like *LLMs Explained*): explicit `## Key Takeaways from Part N` section. Each item: **bolded label** + one-to-two-sentence explanation.

2. **Closing Thoughts** (strategic/essay series like *DS in the Age of AI*): narrative prose with bolded key phrases embedded mid-paragraph.

Rule: numbered for technical explainers, narrative for strategic/essay series. Never end without synthesis.
