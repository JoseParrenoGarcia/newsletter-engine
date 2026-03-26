# Post Type: Series (GenAI / Technical)

For multi-part series on GenAI and data science topics. Two series in the corpus: *LLMs Explained* (6 parts, technical) and *Data Science in the Age of AI* (5 parts, strategic). These posts are Jose's most analytical writing — they explain how something works or reframe how the reader should think about their profession.

Load alongside `shared/voice.md` and `shared/anti_patterns.md`.

---

## Opening Pattern

**Thesis statement or contrarian reframe — not anecdote.**

Unlike management posts, series posts open with a position, not a story. The opening sentence should be the kind of line a reader might quote.

Two patterns in the corpus:

1. **Thesis declaration:** "Your job isn't to build models; it's to solve problems." — states the post's central argument directly.
2. **Contrarian reframe:** "Prompting is not building AI systems." / "Fine-tuning is not a magic fix." — names a common misunderstanding before dismantling it.

For **Part 1 of a series:** open with a "What we will cover in this series" bullet list (3–5 items). Gives new readers the roadmap.

For **later parts:** open with a brief "In this series so far" recap (2–4 bullets), then "In this part, we cover...". This makes each post standalone without requiring the reader to have read all prior parts.

**What to avoid:** Opening with personal anecdote. The intellectual argument is the hook. If context is needed, frame it as shared professional experience ("If you've worked with LLMs in production, you've seen this..."), not personal story.

---

## Series Continuity Rules

**Each part must stand alone.** A reader who arrives at Part 4 without reading Parts 1–3 should still follow the argument.

**Re-anchor key concepts without explicit back-references.** Don't write "In Part 2, we explained that...". Instead, briefly re-establish the concept as if it's assumed shared knowledge: "The AutoML parallel — where a wave of automation reduced one class of manual work but elevated the value of judgment — applies here too."

**Series summary table at the final part.** The last post of a series should include a table summarising the full arc:

| Part | Topic |
|------|-------|
| 1 | ... |
| 2 | ... |
| N | ... |

**Explicit navigation at the bottom of every post.** Previous and next links in a consistent format:
- `*Continues in [Part N+1: Title](./filename.md)*`
- For the final part: a summary of what the series covered, not a link.

---

## Structure

**Thesis → Problem framing → Technical explanation → Key Takeaways.**

The structure serves the argument. Every section moves the reader one step closer to understanding the post's central claim. Sections should feel inevitable — each one answering the natural question the previous section raises.

**Rhetorical questions within technical sections** keep accessibility without sacrificing depth:
- "But why skip-gram and not CBOW? The key is directionality."
- "When does RL beat supervised fine-tuning?"

**End section — Key Takeaways or Closing Thoughts.** Two patterns across the two series:

1. **Numbered Key Takeaways** (LLMs Explained — technical series): explicit `## Key Takeaways from Part N` section. Each item has a **bolded label** followed by a one-to-two-sentence explanation.
   > 1. **Fine-tuning has limits; RLHF fills the gaps.** SFT makes LLMs better at following instructions, but it cannot teach models to generalise preferences or adapt to subjective tasks.

2. **Closing Thoughts** (DS in the Age of AI — strategic series): narrative prose with bolded key phrases embedded mid-paragraph. Less structured but still ends on a synthesis, not a motivational platitude.

Use whichever fits the series register — numbered for technical explainers, narrative for strategic/essay series. Never end without synthesis.

---

## Technical Depth

Same principles as paper-explainer posts, adapted for a broader/less specialist audience:

- **Intuition before mechanism.** Explain the "why" before the "what". Never introduce a concept without first establishing why it matters.
- **Analogy as primary tool.** Every technical concept gets a concrete analogy. *"The LLM is a probability machine — not a calculator."* *"Chain-of-thought is giving the model tokens to think with."*
- **No equations.** Unlike paper-explainer posts (which may reference formulas), series posts explain concepts purely through language, analogies, and diagrams.
- **Concrete examples.** Where possible, reference specific real-world cases (OpenAI's InstructGPT, DeepSeek's reasoning improvements, specific Karpathy tutorials).

---

## Formatting

| Element | Rule |
|---------|------|
| `##` headings | Main sections. Descriptive of the concept being explained, not just a label. |
| `###` headings | Sub-sections within a complex technical explanation. |
| **Bold** | Concepts being defined mid-paragraph, and the label in each Key Takeaway item. |
| `> Blockquote` | Named attribution only — direct quotes from papers, researchers, or named sources. |
| Bullet lists | "What we covered so far" series recap, Key Takeaways items (numbered), lists of steps or conditions. |
| Tables | Series summary at end of final part; comparisons between approaches. |
| Visual placeholders | **Mandatory where technical concepts need illustration** — model architectures, process loops, concept comparisons. Strategic/essay-style posts (like DS in the Age of AI) may have fewer or no visuals. LLMs Explained and similar technical series require them throughout. Format: `[Visual: diagram | post figure | RLHF process — showing generate → rank → reward model → PPO loop]`. |
| Emoji | Sparse — acceptable in tables and series navigation markers. Never in prose. |

---

## Tone

- **Advisory + analytical.** The reader is a data professional who needs to understand something in order to adapt or decide. Respect their intelligence.
- **Direct and opinion-driven.** State positions clearly. *"Fighting that reality is a waste of energy."* *"Understanding this full stack is what makes a data scientist genuinely dangerous with these tools — rather than just a prompt writer hoping for the best."*
- **Less self-disclosing than management posts.** First-person is minimal — used for framing ("In my experience working with these systems...") not for extended anecdote.
- **Reader = capable professional who needs to update their mental model**, not a beginner learning from scratch.
- **Slightly inspirational in technical posts** — the closing line of a series often makes a broader point about what understanding this stack enables. Not motivational filler — a substantive observation.

---

## Corpus Reference Posts (sampled)

LLMs Explained series (all 6 parts read during M0):
- `reference_posts/series/genai-ai/llms-explained/part-3-from-tokens-to-training.md`
- `reference_posts/series/genai-ai/llms-explained/part-4-fine-tuning-explained.md`
- `reference_posts/series/genai-ai/llms-explained/part-5-tools-to-reduce-hallucinations.md`
- `reference_posts/series/genai-ai/llms-explained/part-6-reinforcement-learning.md`

DS in the Age of AI series:
- `reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-1-your-job-isnt-to-build-models.md`
- `reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-3-prompting-is-not-building-ai-systems.md`
