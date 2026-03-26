# Post Type: Paper Explainer

For posts that break down academic or industry research papers for a technical but non-specialist audience. The Airbnb series (location model, listing embeddings, deep learning search rankings) is the primary corpus reference. The goal is to transfer the intellectual substance of the paper without requiring the reader to read the paper itself.

Load alongside `shared/voice.md` and `shared/anti_patterns.md`.

---

## Opening Pattern

**Paper attribution → problem framing → why it matters.**

The first paragraph names the paper (title, authors, venue, year). This is not optional — attribution is the foundation of credibility for this post type. Then immediately establish the problem the paper solves, framed as a question the reader would recognise.

**Corpus examples:**
- *"'Real-time Personalization using Embeddings for Search Ranking at Airbnb' by Mihajlo Grbovic and Haibin Cheng, presented at KDD 2018."*
- *"How 1 feature made Airbnb's search smarter — and 6 lessons you can apply to your own models."* (subtitle sets the stakes)

**What to avoid:** Opening with personal anecdote or general context-setting. The paper is the story. Get to it fast.

---

## Section Structure

**Problem → attempted solutions → winning solution → validation → key takeaways.**

For papers with iterative improvements (multiple attempts before the final approach), use a numbered evolution structure:
- Step 1: naive baseline and why it failed
- Step 2: first improvement and its trade-offs
- Step 3: refined solution and its results
- etc.

Each section should answer three questions:
1. What was tried?
2. Why did it succeed or fail?
3. What does this tell us as practitioners?

**Mandatory end sections:**
- **Validation** — how the approach was tested (offline metrics, A/B test, sanity checks). Do not skip this. Readers need to know the results were real.
- **Key Takeaways or Summary** — either a numbered list of 4–6 distilled practitioner lessons ("Key Takeaways"), or a prose "Summary" section that recaps the main findings. The numbered list is the preferred format when the lessons generalise beyond the specific paper; the prose summary is acceptable when the post stays close to the paper's specific results. Never omit this section.
- **Forward link** — if part of a series, explicit link to the next paper at the end.

---

## Technical Depth Management

**Intuition before equation, always.**

Never show a formula before explaining why it exists and what it is trying to achieve. The reader should understand the goal before seeing the mechanism.

- Do: "The formula rewards the model for placing the clicked listing close to the session context — and penalises it for placing unclicked listings nearby."
- Avoid: "The loss function is L = -log σ(v̂ᵀvₚ) - Σ log σ(-v̂ᵀvₙ)"

Equations can be referenced for readers who want to go deeper, but are never the primary explanation vehicle.

**Concrete examples over abstract explanations:**

Every key concept gets a concrete real-world example with specifics:
- "San Francisco has a bridge, a bay, and distinct neighbourhoods separated by water — a model using Euclidean distance would treat those as close; a model trained on actual bookings would not."
- "A session might be: [Manhattan listing clicked → Brooklyn listing clicked → Queens listing declined]. The model treats this like a sentence."

**Analogies to establish intuition:**
- Listings = words, sessions = sentences (word2vec applied to Airbnb)
- Skip-gram: predict the context from the centre word (as opposed to CBOW: predict the centre from context)
- Gradient descent = rolling a ball downhill toward the lowest error point

---

## Formatting

| Element | Rule |
|---------|------|
| `##` headings | Main sections. Describe the concept or step, not just a label ("Step 1: The naive baseline and why it failed", not "Step 1"). |
| `###` headings | Sub-sections for complex sections (e.g. "What Airbnb tried" / "Key learning"). |
| **Bold** | Concept names being defined, and key findings. |
| `> Blockquote` | Direct quotes from the paper itself — preserve verbatim when quoting an author's specific formulation. |
| Bullet lists | "Why X?" reasoning chains, validation metrics, listed techniques. |
| Tables | Experiment comparisons. Emoji indicators in table cells are acceptable (📉📈⚠️🚀) for quick visual scanning. |
| Visual placeholders | **Mandatory.** These posts are diagram-heavy — every model architecture, training loop, and comparison chart needs a placeholder. Format: `[Visual: diagram | post figure | description]`. |
| Emoji | Only in table cells as indicators, not in prose. |

---

## Tone

- **Accessible + authoritative.** Uses everyday language but does not patronise. "Airbnb's elegant solution" is acceptable enthusiasm; "mind-blowing innovation" is not.
- **Problem-solution framing throughout.** Every section moves from "here's what didn't work / what the challenge is" to "here's what they did about it."
- **First-person minimal.** The paper's story is the narrative engine. Jose's editorial voice appears in framing ("This deserves quoting directly") and in the Key Takeaways section where practitioner lessons are distilled.
- **Validation-conscious.** Always acknowledge how the result was tested. Practitioners don't trust results without evidence; the post should reflect that.

---

## Corpus Reference Posts (sampled)

- `reference_posts/standalone/paper-explainers/airbnbs-2013-location-model-lessons-in-feature-engineering.md`
- `reference_posts/standalone/paper-explainers/how-airbnb-learned-listing-embeddings-part-1.md`
- `reference_posts/standalone/paper-explainers/how-airbnb-optimized-search-rankings-with-deep-learning.md`
- `reference_posts/standalone/paper-explainers/how-airbnb-learned-to-personalise-search-with-embeddings-part-2.md`
- `reference_posts/standalone/paper-explainers/what-airbnb-discovered-after-launching-deep-learning-model-for-ranking.md`
