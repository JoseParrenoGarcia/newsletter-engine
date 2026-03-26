# Anti-Patterns — What to Never Produce

These patterns are absent across the entire reference corpus. Each one makes the draft weaker or breaks the voice. Stop and fix before proceeding if any appear.

---

## Attribution failures

**Anonymous authority** — any claim attributed to no one:
- "Research shows that emotional intelligence is the key predictor of leadership success."
- "Studies suggest that 70% of data science projects fail."
- "Experts agree that..."
- "According to some researchers..."

**Fix:** Name the source or remove the claim. If the source cannot be named with confidence, flag it for Jose to verify before publishing.

---

## Generic closings

**Motivational filler** with no specific content:
- "I hope this helps you on your journey."
- "Never stop learning."
- "Keep pushing forward."
- "The key is to keep growing."
- "Together we can build better teams."

**Fix:** Closings should either ask an open reflective question (management posts), give a specific recommendation (book reviews), or summarise numbered key takeaways (technical posts). See the type-specific style guides for closing patterns.

---

## Structural waste

**Excessive preview text** — more than 2 sentences explaining what the post will cover before covering it:
- "In this post, I will walk you through five key traits that separate great managers from mediocre ones. We will explore how trust, communication, and emotional intelligence work together. By the end, you will have a clear framework..."

**Fix:** One sentence of framing maximum. Start the content immediately after.

**Redundant summary** — restating what was just said without adding synthesis:
- "So as we can see, emotional intelligence is important because it helps leaders connect with their teams. In summary, EQ matters."

**Fix:** Summaries must add synthesis, a new framing, or a concrete takeaway — not restatement.

**Heading for every paragraph** — creating a subheading for each short block of text fragments the reading flow. Headings should mark major structural shifts, not label each idea.

**Dramatic two-part headings** — headings that read like clickbait or marketing copy:
- "The Hidden Truth About Data Science Management"
- "Why Everything You Know About LLMs Is Wrong"

**Fix:** Jose's heading style is factual noun-phrase declarations: "Trust: the backbone of a solid relationship", "Step 3: adapting embeddings for multi-type inventory". Descriptive, not dramatic.

**Sentence fragments as style** — using incomplete sentences as a rhetorical device:
- "The result? A broken model."
- "Simple. Effective. Scalable."

**Fix:** Use full sentences. Jose's rhythm comes from sentence length variation, not fragments.

---

## Voice failures

**Passive voice as default register.** Active voice throughout.
- Avoid: "The model was trained on a large dataset."
- Do: "OpenAI trained the model on a large dataset."

**Hedging as a crutch** — qualifying every opinion:
- "I think maybe this could be one possible approach."
- "One could argue that..."
- "It might be worth considering..."
- "Perhaps this is relevant..."

**Fix:** If a claim is Jose's own view, state it directly. If it is genuinely uncertain, say so once clearly, then move on.

---

## Slop sentence structures

These constructions are a signature of AI-generated prose. Remove on sight.

**Contrast structures that add no content:**
- "It isn't just X, it's Y." → State Y directly.
- "X is more than just Y; it's Z." → State Z directly.
- "It wasn't X, it was Y." → State Y directly.
- "This isn't about X — it's about Y." → Same fix.

**Pivot announcements:**
- "This is where X comes in." → Just introduce X.
- "This is exactly where Y becomes important." → Same fix.
- "That's where things get interesting." → Omit; just write the interesting thing.

**Section transition meta-commentary:**
- "Now that we've explored X, let's move on to Y."
- "With that in mind, let's turn to..."
- "Before we get to X, it's worth understanding Y."

**Fix for all of the above:** Remove the meta-sentence. Let the content follow naturally.

---

## Filler language

**Adverb inflation** — adverbs that add no information:
- incredibly, remarkably, absolutely, truly, simply, obviously, clearly, certainly, deeply, surprisingly, neatly

**Dramatic adjectives** — words that overstate importance or novelty:
- amazing, mind-blowing, groundbreaking, paradigm-shifting, transformative, pivotal, paramount, invaluable, outstanding, unprecedented, game-changing

**Hype phrases** — buzzword constructions:
- "a significant leap", "cut through the noise / hype", "fast-paced world", "fast-moving world"
- "thrive in the new landscape", "unlock the real power of", "the real magic happens"
- "recipe for disaster", "the best part is", "must-read"
- "leverage X to Y", "harness the power of", "seamlessly integrates"
- "start from the ground up", "tackle a novel problem"

**Corporate filler verbs** — vague or bureaucratic:
- "endeavour", "embark on", "dive into" (already present as "delve into")

**AI filler phrases** — hallmarks of AI-generated generic prose:
- "delve into", "dive into"
- "it's worth noting that"
- "it's important to understand"
- "fascinating"
- "crucial", "critical" (used as filler intensifiers, not specific claims)
- "in today's world" / "in the modern era" / "in the age of AI" (as an opener, not a specific reference)
- "as we navigate the complexities of..."
- "let's explore", "let's dive in"
- "unpacking"
- "realm", "tapestry", "vibrant ecosystem"

**Essay opener clichés:**
- "In today's fast-paced world..."
- "As we navigate the complexities of..."
- "In conclusion..." (use "Key Takeaways" or a synthesis statement instead)
- "Throughout history..."

**Fix:** Remove or rewrite. Prefer plain, concrete verbs and specific technical terms. If the sentence cannot survive without the filler, the sentence is not saying enough.

---

## Formatting misuse

**Emoji in management or book-review posts.** Absent from the entire management and book-review corpus.

**Bold for emphasis or decoration:**
- "This is **incredibly important** to understand."
- "You should **always** check the data."

Bold marks a concept being defined or a key finding being stated — not sentiment.

**Blockquotes for non-attributed content:**
- Using `>` for callouts, highlighted tips, or self-written emphasis.

Blockquotes are for verbatim quotes from named external sources only.

**Deeply nested lists** — more than 2 levels of indentation. Restructure as prose or flatten.

---

## Accuracy and certainty

**Overstating certainty.** If a fact is genuinely uncertain, either omit it or mark it as uncertain explicitly. Do not present a plausible-sounding claim as established fact.
- Avoid: "Studies have confirmed that..."
- Do: "Goleman's research suggests..." or flag with a note to verify before publishing.

**Invented quotes.** If a quote cannot be verified to a specific source with a page number or URL, it does not go in. No paraphrased quotes presented as verbatim.

**Invented statistics.** No percentages, figures, or data points that cannot be traced to a named source.

**Invented paper titles, book titles, or author names.** If uncertain, flag it — do not guess.

**Acronym expansion.** Write the full phrase on first use: "Large Language Model (LLM)", then use the acronym. Exception: "AI" and "LLM/LLMs" do not need expansion when writing for a data science audience.

---

## Self-check (process rule for drafting agents)

Before presenting any draft:
1. Scan for every banned word and phrase listed in this file. Remove or rewrite.
2. Scan for repeated sentence openings across consecutive paragraphs (e.g. "The model...", "The model...", "The model..."). Vary the structure.
3. Confirm no section starts with a transition meta-sentence ("Now that we've...", "With that in mind...").
4. Confirm no filler sentences that restate rather than advance. Each sentence should add new information.
5. Present the final draft without explaining what was changed. The output should read as a polished product, not a revision log.

