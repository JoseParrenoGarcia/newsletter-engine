# Voice — Universal Rules

These rules apply to every post type. Load this file alongside the relevant `types/` file before drafting.

---

## Register

**Warm and pedagogical in method, peer-level in attitude.**

Warm: the register is approachable, self-disclosing, and never cold or authoritative. Pedagogical: ideas are sequenced carefully — each section builds on the last, analogies precede abstractions, and the reader always ends up knowing more than when they started.

Peer-level is a tone constraint, not a depth constraint. Do not water down complex explanations to seem approachable — that is condescension in disguise. Build from first principles when the topic demands it. The rule prohibits lecturing, not careful explanation.

**First-person is natural, not performative.** Use "I" when grounding a claim in lived experience. Avoid "I" when it adds no information ("I think that X is important" → "X is important").

---

## Narrative arc

Every post builds up. The reader's understanding at the end is materially richer than at the start.

Myth-busting and contrarian framing are permitted — but only as a setup device. Name the misconception, then dismantle it in service of the constructive claim that follows. The post always ends on what to think or do, not on what is wrong. A post structured as "everyone gets X wrong" where the whole argument is the demolition is not the pattern.

Sections should feel inevitable — each one answering the natural question the previous section raises. Never leave a section without advancing the argument.

---

## Attribution

**Named sources only.** Every external claim or quote must be attributed to a specific person, book, paper, or company. No anonymous authority.

- Do: *"In his InstructGPT paper, OpenAI defines 'helpful' as..."*
- Do: *"Daniel Goleman's research on EQ identifies five components..."*
- Avoid: "Research shows...", "Studies suggest...", "Experts say...", "According to some..."

If the source cannot be named with confidence, flag uncertainty explicitly: "I am not certain of the original source here — do not publish without verifying."

**Specific over vague.** Page numbers for books, paper titles and venues for academic work, named roles or companies for industry examples.

---

## Explanation Style

**Analogy before abstraction.** Every technical or conceptual idea gets a concrete analogy first, then the technical detail.

- Do: "Think of tokens like Lego bricks — not words, but the smallest units text can be split into. 'Unhelpful' might become 'un', 'help', 'ful'."
- Avoid: "Tokenization is the process of converting text into numerical representations."

**Rhetorical questions are functional.** Use them to introduce the answer about to come — not to create the impression of dialogue.

- Do: "But why skip-gram and not CBOW? The key is directionality."
- Avoid: "Have you ever wondered what makes a great manager? Keep reading to find out!"

**Reader-direct address is permitted.** Addressing the reader as "you" is a legitimate rhetorical device — to anticipate an objection, make a concept land concretely, or signal a shift in stakes. Use sparingly in the body (2–3 moments per post at most).

- Do: "If you have 100 skills available, this distinction becomes a deal-breaker."
- Do: "You could argue that evaluating this is equivalent to evaluating the final output." (objection-anticipation, followed immediately by taking a clear position against it)
- Avoid: sustained second-person narration that reads like a tutorial ("Now you will need to...", "You should always...").

**Exception — closing CTA sections:** the "Now, I want to hear from you" section is intentionally sustained direct address. The 2–3 body limit does not apply to this section. Three reader questions plus a comment invitation is the correct pattern, not a violation.

---

## Sentence Rhythm

Short declarative sentence → 2–3 sentence expansion → short declarative sentence.

Avoid paragraph-length sentences. Avoid stringing three or more clauses with commas. Break complex ideas into separate sentences.

**Example of good rhythm (from LLMs Explained Part 6):**
> "Fine-tuning gets models far — but it has limits. It cannot teach a model to generalise preferences, adapt to complex human intent, or make better long-term decisions. That is where RLHF comes in."

---

## Formatting Rules

**Bold** = concept definition or key finding. One purpose only. Not for emphasis, not for decoration.
- Do: "**Byte Pair Encoding (BPE)** — used by GPT models — iteratively merges the most frequent character pairs."
- Avoid: "This is **really important** to understand."

**Blockquotes** = named attribution only. A direct quote from a named person, book page, or paper. Never used for callouts, highlights, or emphasis.

**Bullet lists** = taxonomies, frameworks, steps. Not for prose that would flow naturally as sentences.

---

## Emoji

- **Management and book-review posts:** no emoji anywhere.
- **GenAI/technical series posts:** sparse use acceptable — tables and section navigation markers only. Never in prose.

---

## Length and Scope

Posts are complete thoughts, not comprehensive encyclopaedias. Cover the relevant slice deeply; don't catalogue everything that could be said. A post that leaves the reader with one well-understood idea is better than one that mentions ten ideas superficially.

No hard word count target — match the depth the topic requires. Reference posts range from ~700 words (short series parts) to ~2,500 words (deep management pieces). Aim for the minimum length that does the idea justice.
