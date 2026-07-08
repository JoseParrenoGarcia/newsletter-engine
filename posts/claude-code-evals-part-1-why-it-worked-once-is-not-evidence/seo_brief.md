# SEO Brief: Why "It Worked Once" Is Not Evidence

**Post:** Claude Code Evals, Part 1
**Slug:** `claude-code-evals-part-1-why-it-worked-once-is-not-evidence`
**Date:** 2026-07-07

---

## 1. Suggested Keywords

**Primary keyword:** Claude Code evals

**Secondary keywords:**
- LLM agent evaluation
- agent testing discipline
- AI workflow reliability
- Claude Code workflow quality
- agentic eval strategy

*Note: Keywords extracted from draft content and thesis. No search volume data — validate with a keyword tool before publishing. See Future: Keyword Volume section.*

---

## 2. Meta Description

**Recommended (≤160 chars):**
> Claude Code evals are the missing quality discipline for agent builders. Learn why one good run is not evidence — and what to measure instead.

- Primary keyword included: Yes
- Call to action present: Yes ("learn why … and what to measure instead")
- Character count: 150

---

## 3. URL Slug

**Current slug:** `claude-code-evals-part-1-why-it-worked-once-is-not-evidence`

**Assessment:** Keep as-is. The slug leads with "claude-code-evals" — both components of the primary keyword are front-loaded. It is human-readable, and the part number preserves series navigability.

---

## 4. H1 Recommendation

**Current H1:** `Why "It Worked Once" Is Not Evidence — Claude Code Evals, Part 1`

**Recommendation:** Keep as-is. The primary keyword "Claude Code Evals" appears explicitly. The contrarian hook ("It Worked Once" Is Not Evidence) is strong and click-worthy. The part number signals series membership clearly.

---

## 5. H2/H3 Structure Review

| # | Current heading | Recommendation |
|---|----------------|----------------|
| 1 | What will we cover in this post? | Keep as-is — standard ToC preview; keyword not needed here |
| 2 | Why are LLMs probabilistic even when they look consistent? | Keep as-is — strong question format; covers secondary keyword territory ("LLM agent evaluation") |
| 3 | What do unit tests, MLOps, and experimentation have in common? | Keep as-is — "agent testing discipline" anchor; works well without forcing primary keyword |
| 4 | What is the equivalent discipline for agents? | Reword to: "What is the equivalent discipline for Claude Code agents?" — adds "Claude Code" naturally and sets up the evals definition that follows |
| 5 | What are the three questions you cannot answer without evals? | Reword to: "What are the three questions you cannot answer without Claude Code evals?" — inserts primary keyword as a complete phrase; natural and accurate |
| 6 | Why are evals a thinking problem before they are an infrastructure problem? | Keep as-is — "evals" present; reinforces secondary keyword territory |
| 7 | What Claude Code workflow would you test first? | Keep as-is — "Claude Code workflow" strengthens secondary keyword "Claude Code workflow quality"; strong closing call-to-action |

**Primary keyword in at least one H2:** No — "Claude Code evals" as a compound phrase does not appear in any current H2. Applying the reword for H2 #5 above resolves this in one change.

---

## 6. AI Discoverability

| # | H2 heading | Question format? | Answer block (50–80 w)? | Links in answer zone? |
|---|-----------|-----------------|------------------------|-----------------------|
| 1 | What will we cover in this post? | ✓ | ✓ (bullet list is self-contained and direct) | ✗ |
| 2 | Why are LLMs probabilistic even when they look consistent? | ✓ | ✗ → opens with preamble: "Start with how the model works, but only the part that matters for this argument" — context-setting, not a direct answer | ✗ |
| 3 | What do unit tests, MLOps, and experimentation have in common? | ✓ | ✓ (direct one-sentence answer in first line: "They are all answers to the same question…") | ✗ |
| 4 | What is the equivalent discipline for agents? | ✓ | ✓ (direct definition in first two sentences: "Not benchmarks… something closer to the unit test…") | ✓ FLAGGED — link to Anthropic engineering post appears within first 80 words, inside the answer zone |
| 5 | What are the three questions you cannot answer without evals? | ✓ | ✗ → opens with context-setting: "These are not hypothetical. They come up for any team…" — the three questions are deferred to sub-headings | ✗ |
| 6 | Why are evals a thinking problem before they are an infrastructure problem? | ✓ | ✓ (direct explanation starts immediately: "The most common reason teams do not build evals…") | ✗ |
| 7 | What Claude Code workflow would you test first? | ✓ | ✓ (direct prompt to reader from first sentence) | ✗ |

**Score: 4 / 7 headings pass all three checks**

**Top flags:**
1. **H2 #2 — preamble opening.** Replace "Start with how the model works, but only the part that matters for this argument" with the actual answer: e.g. "Language models generate output by sampling from a probability distribution at each token step — which means even zero-temperature runs are not truly deterministic." This makes the section AI-extractable as a standalone answer.
2. **H2 #4 — link inside answer zone.** The Anthropic engineering post hyperlink appears within the first 80 words, inside the three-component definition block. Move the citation to immediately after the bullet list (Input / Success criterion / Check) — this keeps the definition clean for AI extraction without affecting prose quality.
3. **H2 #5 — context-setting opening.** The three questions are only revealed under sub-headings. Add a one-sentence preview in the first 50 words: e.g. "Three questions come up for any team that iterates on Claude Code workflows: revision quality, model routing, and regression detection." This lets the section serve as a direct answer to its own heading.

---

## 7. Keyword Placement Checklist

| Position | Present? |
|----------|----------|
| H1 / Title | ✓ — "Claude Code Evals" appears in the H1 |
| First 100 words | ✓ — "Claude Code Evals, Part 1" appears in the subtitle within the first 100 words |
| At least one H2 | ✗ — "Claude Code evals" as a phrase is absent from all seven H2s |
| Meta description | ✓ — included in recommended meta description above |
| URL slug | ✓ — "claude-code-evals" leads the slug |

**Score: 4 / 5**

**Missing position:** At least one H2. Fix: reword H2 #5 to "What are the three questions you cannot answer without Claude Code evals?" — one targeted change resolves the gap.

---

## 8. Readability Assessment

- **Estimated reading level:** Grade 8–10 — concrete analogies, plain English framing, minimal unexplained jargon; accessible to the stated target audience
- **Average sentence length:** ~16.4 words (sample across full draft)
- **Long sentences (>30 words):** 14 total — within acceptable range for ~3,400 words. Top three:
  - *"How do you know this specific workflow, with these specific instructions, against this range of inputs, will produce a correct result on the next run, and the run after that?"* (37w) — acceptable; deliberate rhetorical layering
  - *"This is a post about why evals are the missing quality discipline for agentic workflows — the practice that every other engineering domain takes for granted, and that agent builders have not yet installed as a reflex."* (37w) — could be split at the em-dash for tighter reading
  - *"Without a set of known inputs and grading criteria, you have no way to know whether the revision improved quality across the range of cases the skill handles, or whether it just happened to produce a better result on the one example you were looking at when you made the change."* (47w) — long but structurally clear; split optional
- **Passive voice instances:** ~13 — low for ~3,400 words; mostly intentional and contextually appropriate (e.g. "was trained", "was introduced", "be tested")
- **Paragraph length:** Most paragraphs are 2–4 sentences. The experiment design example block (H2 #4) uses nested bullet lists for the criteria and checks — correct structure, not a density problem.
- **Jargon density:** Low-medium — terms present: *probabilistic*, *token-sampling*, *MLOps*, *LLM-as-judge*, *regression suite*, *model-graded*. All are either explained in-context or appropriate for the stated audience (engineers and technical PMs comfortable with software engineering concepts).
- **Overall:** Good — the draft reads cleanly for its target audience; sentence variety is strong; no padding or filler sections detected.

---

## 9. Content Quality Signals

- **Word count:** ~3,400 words (~13.6 min read)
- **Target word count:** 15 min × 250 = ~3,750 words
- **On target:** Within 10% (approximately 9% short) — acceptable; the post functions as a framing essay and does not require padding to reach target
- **External links:** 18 in the draft body + References section — high count, all validated. Quality breakdown:
  - 4 arXiv preprints — authoritative for empirical claims (LLM non-determinism, CLAUDE.md practices, architectural analysis)
  - 8 official Claude Code documentation pages (code.claude.com) — primary source, authoritative
  - 1 Anthropic Engineering blog post — authoritative
  - 1 Vox explainer — reputable mainstream press for the opening hook
  - All cited URLs appear in `research_brief.md`; no unvalidated sources detected

---

## 10. Title Variants

| Style | Title | Suggested subtitle |
|-------|-------|--------------------|
| Keyword-first | Claude Code Evals: Why One Good Run Is Not Evidence | The testing discipline every other engineering practice has — and that agent builders are still missing. |
| Curiosity-gap | Why "It Worked Once" Is Not Evidence | You built a Claude Code workflow. It worked. Here is why that tells you almost nothing about reliability. |
| How-to | How to Know If Your Claude Code Workflow Actually Works | A mental model for agent evaluation before you write a single line of eval code. |
| Contrarian | Stop Trusting Your Claude Code Workflows | One successful run is a sample of one from a distribution you have not measured. |
| Authority | I've Built Claude Code Workflows. Here's the Testing Discipline I Was Missing | Why every mature engineering practice has a verification reflex — and agent builders do not yet. |

**Medium-specific notes:**
- Optimal title length: 40–60 characters
- The Curiosity-gap variant is the closest match to the working title and preserves the voice; subtitle carries the series context cleanly
- The Keyword-first variant scores highest for discoverability on Medium search and in AI-generated summaries; recommend for SEO-priority publishing

---

## 11. Quick Wins

1. **Reword H2 #5 to include "Claude Code evals" as a phrase.** Change "What are the three questions you cannot answer without evals?" to "What are the three questions you cannot answer without Claude Code evals?" — one six-word change inserts the primary keyword into a heading, raises the keyword placement score from 4/5 to 5/5, and is already accurate to the section content.

2. **Replace the preamble opening of H2 #2 with a direct answer.** "Start with how the model works, but only the part that matters for this argument" is a meta-comment that delays the answer. Replace it with a direct statement: e.g. "Language models generate output by sampling from a probability distribution at each token step — which means even zero-temperature runs are not truly deterministic." This makes the section AI-extractable as a standalone answer block and raises the AI discoverability score from 4/7 to 5/7.

3. **Move the Anthropic engineering post hyperlink outside the answer zone of H2 #4.** The link currently appears within the first 80 words of the section, inside the three-component definition (Input / Success criterion / Check). Moving the citation to immediately after the bullet list — rather than inline with the introduction — preserves prose quality, keeps the definition block clean for AI extraction, and removes the only link-in-answer-zone flag in the draft.

---

## Future: Keyword Volume

*No search volume data collected at draft time. Before publishing to Medium or Substack, validate:*

- `claude code evals` — likely low volume today; expected to grow with Claude Code adoption; monitor
- `LLM agent evaluation` — broader; more established search volume; consider as alternative primary if "claude code evals" volume is low
- `agent testing` — high-competition adjacent term; useful as secondary
- `AI workflow reliability` — intent-aligned for the target audience; check volume
- `claude code workflow` — variant worth checking for search intent alignment

*If "claude code evals" has very low volume, consider pivoting the primary keyword to "LLM agent evaluation" and using "claude code evals" as a secondary.*

---

## 12. Post-Revision Verification

**Verified against:** long_draft.md (post-revise)
**Verified on:** 2026-07-07

### Keyword Placement — before → after
| Position | Before | After |
|----------|--------|-------|
| H1 / Title | ✓ | ✓ |
| First 100 words | ✓ | ✓ |
| At least one H2 | ✗ | ✓ |
| Meta description | ✓ | ✓ |
| URL slug | ✓ | ✓ |

**Score: 4/5 → 5/5**

### AI Discoverability — before → after
| H2 | Before | After |
|----|--------|-------|
| Why are LLMs probabilistic even when they look consistent? | ✗ not answer-first | ✓ fixed — opens directly with "Language models generate output by sampling from a probability distribution at each token step — which means even zero-temperature runs are not truly deterministic." |
| What is the equivalent discipline for Claude Code agents? | ✗ link in answer zone | ✓ fixed — bullet list appears first; Anthropic link moved to sentence after bullets |
| What are the three questions you cannot answer without Claude Code evals? | ✗ context-setting opening | ✓ fixed — prepended sentence "Three questions come up for any team that iterates on Claude Code workflows: revision quality, model routing, and regression detection." before "These are not hypothetical." |

**Score: 4/7 → 7/7**

### Quick Wins — applied?
1. Reword H2 #5 to include "Claude Code evals" as a phrase — ✓ heading now reads "What are the three questions you cannot answer without Claude Code evals?" and ToC bullet updated to match
2. Replace preamble opening of H2 #2 with direct answer — ✓ old preamble removed; section now opens with direct probabilistic-architecture statement
3. Move Anthropic engineering post hyperlink outside answer zone of H2 #4 — ✓ link moved to after the three-bullet definition block

### Verification verdict
**All fixes applied:** Yes
**Remaining issues:** None
