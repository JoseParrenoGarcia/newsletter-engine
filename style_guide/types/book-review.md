# Post Type: Book Review

For posts reviewing books recommended to data scientists, technical leaders, and people managers. Jose's book reviews are not summaries — they are curated lessons extracted from personal reading, framed as a recommendation from practitioner to peer.

Load alongside `shared/voice.md` and `shared/anti_patterns.md`.

---

## Opening Pattern

**Personal discovery framing → book introduction.**

Two opening patterns appear in the corpus:

1. **Question-based hook:** "Struggling to be a great tech manager? This book has answers for you." — directly addresses the reader's pain point.
2. **Personal discovery declaration:** "The book that finally taught me how to tell stories with data." — frames the review as a personal recommendation.

Both patterns lead immediately into personal context that explains *why Jose read this book* — not a generic book description. The "finally" in Pattern 2 is meaningful: it signals that the book solved a problem Jose had been trying to solve.

**What to avoid:** Starting with the book's publication date, publisher, or author biography. Get to the personal context immediately.

---

## Section Structure

**Personal lessons, not chapter summaries.**

The review is structured around what Jose extracted, not what the book contains. Two frameworks appear in the corpus:

**Option A — Chapter-by-chapter:** Walk through the book's structure, but frame each chapter around one central lesson. Use the book's chapter titles as starting points, not constraints.

**Option B — Learning #1–N scaffolding:** Number the key lessons extracted ("Learning #1:", "Learning #2:"). This works especially well when the book has a non-linear structure or when the lessons transcend individual chapters.

**Sub-section headings** within a chapter or learning: descriptive questions or noun phrases. *Examples: "How to grab and keep your audience's attention", "2 styles to avoid".*

**Quote first, then unpack.** Each major learning or concept is anchored with a direct quote from the book (inline italics, page citation). Jose's analysis and personal application follow the quote, not precede it.

**Before/after transformations** — where the book teaches improvement, show the contrast. *Example: a cluttered chart vs a cleaned version after applying the book's principles.*

---

## Quote Integration

**Format:** *"Quote text from the book."* [page X]

Rules:
- Inline italics, not blockquote format. The blockquote is reserved for standalone attributed quotes from named people; book quotes are inline with page citations.
- Always include the page number — this is what differentiates a verified quote from a paraphrase.
- Direct pulls only — never paraphrase inside quote markers.
- The quote anchors the concept Jose is about to explain. It is evidence, not decoration.

**Example from the corpus:**
*"The first act of people management for many engineers is often unofficial."* [page 11]

---

## Closing Pattern

**Personal prescriptive recommendation with specific reader targeting.**

The closing does two things: names who the book is for, and makes a clear recommendation. It is direct and specific — not a hedge.

**Corpus examples:**
- *"Cole Nussbaumer's 'Storytelling with Data' should be in every data professional's shelf."*
- *"If you had to buy a book to improve your data storytelling skills, this is the one you should read first."*
- *"I strongly recommend those of you in a management role, or aspiring to one, to pick up a copy."*

After the recommendation, close with a numbered summary of the **5 most actionable takeaways** — crisp, one-sentence items the reader can apply immediately.

---

## Formatting

| Element | Rule |
|---------|------|
| `##` headings | Chapter titles or "Learning #N:" section anchors. |
| `###` headings | Sub-sections within a chapter or learning (question-based or noun-phrase). |
| **Bold** | Book concept names and learning labels. |
| Inline italics | Book quotes with page citations: *"quote text"* [page X]. |
| `> Blockquote` | Named external quotes from people cited in the book (not the book's own text). |
| Bullet lists | Actionable takeaways in the closing summary. Occasionally for listing concepts within a chapter. |
| Visual placeholders | Before/after chart comparisons, book cover where relevant. |
| Emoji | None. |

---

## Tone

- **Conversational-expert.** Personal ("I rarely do large presentations") combined with analytical framing of the book's concepts.
- **Retrospective + prescriptive.** "Here's what stuck with me" → "Here's why you should read this."
- **Specific over general.** Not "the book is great" — "the chapter on pre-attentive attributes changed how I build every dashboard."
- **Peer recommendation, not academic critique.** Not a balanced literary analysis — an honest recommendation from one practitioner to another.

---

## Corpus Reference Posts (sampled)

- `reference_posts/standalone/book-reviews/struggling-to-be-a-great-tech-manager-the-managers-path.md`
- `reference_posts/standalone/book-reviews/the-book-that-taught-me-data-storytelling.md`
