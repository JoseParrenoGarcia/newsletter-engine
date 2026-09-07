# SEO Brief: Context-mode: what better context management actually buys you

**Post:** posts/context-mode-context-window-management/long_draft.md
**Generated:** 2026-09-07

---

## 1. Suggested Keywords

**Primary keyword:** context-mode context window
**Secondary keywords:**
- token cost reduction
- prompt caching
- context rot
- context-mode benchmark
- MCP tool context

*Note: Keywords extracted from draft content and thesis. No search volume data — validate with a keyword tool before publishing. See Future: Keyword Volume section.*

---

## 2. Meta Description

**Recommended (≤160 chars):**
> Context-mode promises a smaller context window — not a smaller bill. Here is the mechanics-first breakdown of what it actually changes.

- Primary keyword included: Yes (partial — "context window" present; "context-mode" present separately in same sentence)
- Call to action present: No — implied value proposition, no explicit CTA verb. Consider adding "Read the breakdown" or similar if a stronger CTA is wanted.
- Character count: 135

---

## 3. URL Slug

**Current slug:** context-mode-context-window-management
**Recommended slug:** context-mode-context-window-management
**Change needed:** No — the current slug already contains the full primary keyword ("context-mode-context-window") plus the disambiguating term "management." No change needed.

---

## 4. H1 Recommendation

**Current H1 (draft title):** Context-mode: what better context management actually buys you
**Recommended H1:** Context-Mode: What It Actually Buys Your Context Window
**Primary keyword in H1:** No (current) / Yes (recommended)

The current H1 contains "context management" but not "context window" — the two are close variants, but the draft's own thesis explicitly treats "context window" and "token bill" as the two axes being pulled apart, so the H1 should say "context window," not the softer "context management." The recommended version is 3 characters shorter (55 vs. 62) and keeps the author's existing "what it actually buys you" phrasing intact.

---

## 5. H2/H3 Structure Review

| # | Current heading | Recommendation |
|---|----------------|----------------|
| 1 | What will we cover in this post? | keep — functions as a ToC, not a keyword target |
| 2 | What does context-mode actually claim to do? | keep — contains primary keyword component "context-mode" |
| 3 | Why isn't "less context" the same claim as "a smaller bill"? | reword to: "Why isn't a smaller context window the same as a smaller bill?" — swaps vague "less context" for the exact primary-keyword term |
| 4 | Where does context-mode actually earn its place? | keep as-is |
| 5 | Where does context-mode fall short? | keep as-is |
| 6 | What happens when you actually test the mechanism on a real file? | keep as-is |
| 7 | What breaks, and how do you catch it? | keep as-is |
| 8 | How should you decide when to reach for context-mode? | keep as-is |
| 9 | Closing thoughts | keep — standard closer, not a keyword target |
| 10 | Now, I want to hear from you | keep — standard CTA closer, not a keyword target |
| 11 | References | keep — standard, not a keyword target |

**Primary keyword in at least one H2:** No — no H2 contains the full phrase "context window" alongside "context-mode." H2 #2 and #8 contain "context-mode" alone; none contain "context window." Reword #3 (above) closes this gap.

---

## 6. AI Discoverability

| # | H2 heading | Question format? | Answer block (50–80 w)? | Links in answer zone? |
|---|-----------|-----------------|------------------------|-----------------------|
| 1 | What will we cover in this post? | ✓ | ✗ — opens straight into a bulleted ToC, not a self-contained prose answer | ✓ (none) |
| 2 | What does context-mode actually claim to do? | ✓ | ✗ — first ~75 words describe Cloudflare's Code Mode as contrast before stating context-mode's own claim → suggested: lead with "Context-mode's core claim is..." before the Code Mode comparison | ✗ — README and Code Mode links sit inside the first 75 words |
| 3 | Why isn't "less context" the same claim as "a smaller bill"? | ✓ | ✗ — first ~70 words define "context window" but don't yet state why it differs from a smaller bill (that lands in the next paragraph) | ✗ — Anthropic context-window doc link sits inside the first 70 words |
| 4 | Where does context-mode actually earn its place? | ✓ | ✗ — first ~55 words describe the benchmark's methodology, not the actual winning use cases (those arrive in the next paragraph) | ✗ — BENCHMARK.md link sits inside the first 55 words |
| 5 | Where does context-mode fall short? | ✓ | ✓ — states both limits (small-payload overhead, files about to be edited) directly and concretely within the first ~80 words | ✓ (none) |
| 6 | What happens when you actually test the mechanism on a real file? | ✓ | ✗ — first ~70 words set up the test's fixture and scope; the actual result (95.2% reduction figure) lands in the next paragraph | ✓ (none) |
| 7 | What breaks, and how do you catch it? | ✓ | ✓ — opens directly with the first concrete failure mode and its source | ✓ (none) |
| 8 | How should you decide when to reach for context-mode? | ✓ | ✓ (lenient) — the framing sentence and adoption-ladder bullets both fall within the answer window and function as a direct answer | ✓ (none) |
| 9 | Closing thoughts | ✗ | n/a | ✓ (none) |
| 10 | Now, I want to hear from you | ✗ | n/a | ✓ (none) |
| 11 | References | ✗ | n/a | ✓ (none) |

**Score: 3 / 11 headings pass all three checks**

**Top flag:** three of the most substantive H2s (#2, #3, #4) open with 50–80 words of comparison or methodology framing — Code Mode's mechanism, Anthropic's context-window definition, the benchmark's data-collection method — before stating the actual answer, and all three embed a source hyperlink inside that same opening window. For an AI answer engine lifting the first paragraph as the extractable answer, it would currently surface the setup (what Code Mode does, how the benchmark was run) rather than the claim itself. Moving the citation link to the end of the paragraph and leading with a one-sentence direct answer would fix all three at once.

---

## 7. Keyword Placement Checklist

| Position | Present? |
|----------|----------|
| H1 / Title | ✗ (current H1 has "context management," not "context window") |
| First 100 words | ✗ (opening paragraph uses "context reduction" and "context-mode," not "context window") |
| At least one H2 | ✗ (no H2 contains "context window"; see Section 5 reword) |
| Meta description | ✓ (recommended description above) |
| URL slug | ✓ (current slug contains the full phrase) |

**Score: 2 / 5**

Missing positions: **H1, first 100 words, and H2 structure.** All three are fixable with the H1 and H2 #3 rewords above, plus adding one sentence naming "context window" explicitly in the opening paragraph (currently it only says "context reduction" and "the context window" — line 9 — but that's past word 100; pull the phrase earlier).

---

## 8. Readability Assessment

- **Estimated reading level:** Technical
- **Average sentence length:** ~31 words (median 28)
- **Long sentences (>30 words):** 45 of ~103 sentences (~44%) — well above the norm. First 3:
  1. "*A mechanics-first look at what context-mode's sandboxed context savings do and don't change — the context window, the token bill, and the two are not the same thing.*" (subtitle, 33 words)
  2. "This post works through why, where context-mode earns its keep despite that gap, where it doesn't, and what happened when I ran its underlying mechanism against a real file in this repo instead of trusting the headline." (37 words)
  3. "Code Mode converts MCP tool *definitions* into a TypeScript API an agent writes code against, so an agent connected to a server exposing thousands of endpoints only carries roughly 1,000 tokens of schema instead of the full tool catalogue." (40 words)
- **Passive voice instances:** ~14 detected, e.g. "are governed by different mechanics," "is governed by a separate mechanism," "are priced at roughly a tenth," "are reported separately," "were measured" — above the >3 threshold but each instance is used to attribute a mechanism to a system (Anthropic's pricing, the benchmark's methodology) rather than to obscure an actor, which is consistent with the technical-explainer register of this series.
- **Paragraph length:** Mostly 3-5 sentences; a handful (lines 29, 37, 53, 65) run 6-7 sentences carrying a single dense argument. Consistent with the established voice in the RTK and Ponytail/Caveman posts in this series — not flagged as an outlier for this content type.
- **Jargon density:** High — `PreToolUse` hook, FTS5/BM25 ranking, `cache_read_input_tokens`/`cache_creation_input_tokens`, SQLite full-text index, prompt-cache lookback window. Appropriate for the stated target audience (Claude Code practitioners already familiar with agentic tooling) but a non-specialist reader would need to look up several terms.
- **Overall:** Needs work for a general Medium audience, appropriate for the stated technical audience — sentence length and jargon density are both high. If the goal is broader Medium discoverability rather than the existing practitioner readership, tightening the 3 long sentences above and glossing `PreToolUse`, FTS5/BM25, and the cache-token field names on first use would meaningfully lower the reading bar without diluting the technical content.

---

## 9. Content Quality Signals

- **Word count:** 3,499 (~14 min read at 250 wpm)
- **Target word count:** 3,750 (15 min × 250 wpm, per `post.yaml`)
- **On target:** Within 10% (93% of target)
- **External links:** 6 unique authoritative sources (GitHub README, Cloudflare Code Mode blog, Anthropic context-windows docs, Anthropic prompt-caching docs, BENCHMARK.md, Hacker News launch thread) plus 1 self-referential link to the author's own prior Substack post (RTK). All 6 external sources are present in `research_brief.md` — none flagged as uncited or unverified.

---

## 10. Title Variants

| Style | Title | Suggested subtitle |
|-------|-------|--------------------|
| Keyword-first | Context-Mode: What It Actually Buys Your Context Window | A mechanics-first look at what shrinks, what doesn't, and why the two aren't the same claim. |
| Curiosity-gap | I Tested Context-Mode's "98% Context Reduction" Claim | Here's what happened when I ran its own trick on a real file in this repo. |
| How-to | How to Tell If Context-Mode Will Actually Help Your Agent | A scoped adoption test for large logs, CSVs, and multi-file surveys — not a blanket yes. |
| Contrarian | Context-Mode Won't Shrink Your Token Bill. Here's What It Does. | A smaller context window and a smaller invoice are not the same promise. |
| Authority | I Ran Context-Mode's Core Trick on My Own Repo. Here's the System. | A two-line script, a real file, and the actual byte-count delta instead of a vendor number. |

**Medium-specific notes:**
- Optimal title length: 40-60 characters
- Subtitles display on Medium post cards — treat them as a second hook

---

## 11. Quick Wins

1. Reword H2 #3 from `Why isn't "less context" the same claim as "a smaller bill"?` to `Why isn't a smaller context window the same as a smaller bill?` — closes the "primary keyword in at least one H2" gap (currently 0/5 on that checklist item) and matches the exact terms Section 2's own opening sentence uses ("context window," "token bill").
2. In sections #2, #3, and #4 (`What does context-mode actually claim to do?`, `Why isn't "less context"...`, `Where does context-mode actually earn its place?`), move the opening source citation link (README, Anthropic context-windows doc, BENCHMARK.md) out of the first 50-80 words and lead with a one-sentence direct answer instead — this alone would raise the AI discoverability score from 3/11 toward 6/11 without changing the argument.
3. Add "context window" explicitly to the opening paragraph (currently the phrase first appears at line 9, past the first-100-word mark — the opening 70 words use "context reduction" instead). A one-clause insertion in the first paragraph (e.g., "...a GitHub repo with an eye-catching context-window number attached...") would close the "first 100 words" keyword-placement gap.

---

## Future: Keyword Volume

*This brief does not include keyword search volume, difficulty, or SERP competition data. A future milestone will integrate a keyword API (candidates: Google Search Console API, DataForSEO free tier, SEMrush API) to enrich this section with: monthly search volume, keyword difficulty score, top-10 SERP competitors, and related keyword suggestions.*

---

## 12. Post-Revision Verification

**Verified against:** long_draft.md (post-revise)
**Verified on:** 2026-09-07

### Keyword Placement — before → after
| Position | Before | After |
|----------|--------|-------|
| H1 / Title | ✗ | ✓ |
| First 100 words | ✗ | ✓ |
| At least one H2 | ✗ | ✓ |
| Meta description | ✓ | ✓ |
| URL slug | ✓ | ✓ |

**Score: 2/5 → 5/5**

### AI Discoverability — before → after
| H2 | Before | After |
|----|--------|-------|
| What will we cover in this post? | ✗ — opens straight into a bulleted ToC, no prose answer | ✗ — unchanged, out of scope (structural ToC, not a keyword target) |
| What does context-mode actually claim to do? | ✗ — first ~75 words describe Code Mode before stating context-mode's own claim; README/Code Mode links inside answer zone | ✓ — leads with a one-sentence direct answer ("Context-mode's core claim is..."); both links moved to the end of the paragraph, well past 80 words |
| Why isn't a smaller context window the same as a smaller bill? | ✗ — first ~70 words define "context window" before stating the distinction; Anthropic doc link inside answer zone | ✓ — leads with the direct claim ("A smaller context window and a smaller bill are governed by separate mechanisms..."); Anthropic doc link moved to end of paragraph |
| Where does context-mode actually earn its place? | ✗ — first ~55 words describe benchmark methodology before naming winning use cases; BENCHMARK.md link inside answer zone | ✓ — leads with the direct claim ("Context-mode earns its place on inputs where an aggregate answer beats raw content..."); BENCHMARK.md link moved to end of paragraph |
| Where does context-mode fall short? | ✓ | ✓ — unchanged |
| What happens when you actually test the mechanism on a real file? | ✗ — first ~70 words set up fixture/scope before the result | ✗ — unchanged, out of scope (no link-placement issue; not named in Quick Win #2) |
| What breaks, and how do you catch it? | ✓ | ✓ — unchanged |
| How should you decide when to reach for context-mode? | ✓ | ✓ — unchanged |
| Closing thoughts | n/a | n/a — unchanged |
| Now, I want to hear from you | n/a | n/a — unchanged |
| References | n/a | n/a — unchanged |

**Score: 3/11 → 6/11**

### Quick Wins — applied?
1. Reword H2 #3 from `Why isn't "less context" the same claim as "a smaller bill"?` to `Why isn't a smaller context window the same as a smaller bill?` — ✓
2. In sections #2, #3, and #4, move the opening source citation link out of the first 50-80 words and lead with a one-sentence direct answer instead — ✓
3. Add "context window" explicitly to the opening paragraph within the first 100 words — ✓

### Verification verdict
**All fixes applied:** Yes
**Remaining issues:** None of the mandated fixes remain outstanding. Two AI-discoverability rows (`What will we cover in this post?` and `What happens when you actually test the mechanism on a real file?`) are still ✗ by design — the first is a structural ToC not a keyword target per Section 5, and the second was not named in Quick Win #2 (no link-placement issue) and was explicitly scoped out of this revision pass.
