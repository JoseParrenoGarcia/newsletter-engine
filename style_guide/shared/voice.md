# Voice — Universal Rules

These rules apply to every post type. Load this file alongside the relevant `types/` file before drafting.

---

## Register

**Peer-to-peer, not teacher-to-student.** The reader is a fellow data scientist or technical leader — capable, busy, and already experienced. Write as if explaining something to a sharp colleague, not instructing a beginner.

- Do: "If you've ever had to choose between two approaches with no clear winner, this is the framework I use."
- Avoid: "Let me walk you through this concept step by step."

**First-person is natural, not performative.** Use "I" when grounding a claim in lived experience. Avoid "I" when it adds no information ("I think that X is important" → "X is important").

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

**Visual placeholders** = required wherever a diagram, screenshot, or image was referenced or would serve the post. Format:
```
[Visual: <type> | <source> | <role> — description]
```
- Type: `diagram`, `screenshot`, `photo`, `chart`
- Source: `post figure`, `Dall-E`, `Napkin.AI`, `ChatGPT demo`, `Karpathy tutorial`, etc.
- Role: `concept illustration`, `section separator`, `comparison`, etc.

Examples from the corpus:
```
[Visual: diagram | post figure | RLHF process — showing generate → rank → reward model → PPO loop]
[Visual: photo | Dall-E | section separator — image representing trust in a team]
```

---

## Emoji

- **Management and book-review posts:** no emoji anywhere.
- **GenAI/technical series posts:** sparse use acceptable — tables and section navigation markers only. Never in prose.

---

## Length and Scope

Posts are complete thoughts, not comprehensive encyclopaedias. Cover the relevant slice deeply; don't catalogue everything that could be said. A post that leaves the reader with one well-understood idea is better than one that mentions ten ideas superficially.

No hard word count target — match the depth the topic requires. Reference posts range from ~700 words (short series parts) to ~2,500 words (deep management pieces). Aim for the minimum length that does the idea justice.
