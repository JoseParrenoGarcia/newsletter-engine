# Post Type: Paper Explainer

For posts that break down academic or industry research papers for a technical but non-specialist audience. The Airbnb series (location model, listing embeddings, deep learning search rankings) is the primary corpus reference. The goal is to transfer the intellectual substance of the paper without requiring the reader to read the paper itself.

The universal rules in `voice.md` and `templates/post_template.md` apply to this post type. The following rules extend or override them specifically for paper explainer posts.

---

## Opening — paper attribution first

**Paper attribution → problem framing → why it matters.**

The first paragraph names the paper (title, authors, venue, year). Attribution is the foundation of credibility for this post type. Then immediately establish the problem the paper solves, framed as a question the reader would recognise.

**What to avoid:** Opening with personal anecdote or general context-setting. The paper is the story.

---

## Attribution distinction

Every claim must be attributed as one of three types — and these must never be blurred:

1. **The paper's claim** — what the authors state or demonstrate
2. **Jose's interpretation** — how Jose reads or contextualises the paper's finding
3. **Jose's practitioner observation** — a lesson derived from the paper that applies beyond it

Use framing language to signal which type is in play: "The paper argues...", "My read of this is...", "In my experience..."

---

## 3-level technical depth

For every key concept:

1. **Intuition** — what is this trying to achieve? (always first)
2. **Mechanism** — how does it work?
3. **Implication** — what does this mean for practitioners?

Skip levels only when the audience clearly does not need them. Never show a formula before explaining what it is trying to achieve.

---

## Validation-consciousness

Always acknowledge how results were tested — offline metrics, A/B tests, sanity checks. Do not skip the validation section. Practitioners do not trust claims without evidence; the post should reflect that.
