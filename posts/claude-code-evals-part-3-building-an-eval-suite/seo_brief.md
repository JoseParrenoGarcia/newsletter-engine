# SEO Brief: Claude Code Evals Part 3 — The Evaluation Frameworks Landscape

**Post:** posts/claude-code-evals-part-3-building-an-eval-suite/long_draft.md
**Generated:** 2026-08-01

---

## 1. Suggested Keywords

**Primary keyword:** AI eval framework
**Secondary keywords:**
- LLM-as-judge
- AI agent evaluation
- eval frameworks comparison
- Claude Code evals
- grader hierarchy

*Note: Keywords extracted from draft content and thesis. No search volume data — validate with a keyword tool before publishing. See Future: Keyword Volume section.*

---

## 2. Meta Description

**Recommended (≤160 chars):**
> Every AI eval framework — from DeepEval to Azure AI Foundry — implements the same 5 modules. Here's the architecture, a cluster map, and a decision tree.

- Primary keyword included: Yes
- Call to action present: Yes (decision tree)
- Character count: 157

---

## 3. URL Slug

**Current slug:** claude-code-evals-part-3-building-an-eval-suite
**Recommended slug:** claude-code-evals-part-3-building-an-eval-suite
**Change needed:** No

Rationale: "building-an-eval-suite" is a mild mismatch (the post is a landscape post, not a how-to), but changing series slugs risks link rot and breaks the Part 1-5 URL pattern. Keep as-is.

---

## 4. H1 Recommendation

**Current H1 (draft title):** Claude Code Evals Part 3: The Evaluation Frameworks Landscape
**Recommended H1:** Claude Code Evals Part 3: The AI Eval Frameworks Landscape
**Primary keyword in H1:** Yes (after tweak — replace "Evaluation" with "AI Eval")

The current title is 56 chars and clean. Swapping "Evaluation" for "AI Eval" brings the primary keyword in without changing length or readability.

---

## 5. H2/H3 Structure Review

| # | Current heading | Recommendation |
|---|----------------|----------------|
| 1 | What will we cover in this post? | keep as-is — navigational section, not keyword-critical |
| 2 | Why do mistakes compound in agentic workflows? | keep as-is — strong question format, keyword-adjacent |
| 3 | What are the five modules every eval framework shares? | reword to: "What are the five modules every AI eval framework shares?" — adds primary keyword |
| 4 | Why does the order of your graders matter? | keep as-is — strong question format, directly maps to "grader hierarchy" secondary keyword |
| 5 | How does skill-creator implement these five modules? | keep as-is — "Claude Code evals" secondary keyword implied; clear question format |
| 6 | How does the eval tooling landscape break down? | reword to: "How does the AI eval framework landscape break down?" — adds primary keyword |
| 7 | Which eval approach should Claude Code teams start with? | keep as-is — "Claude Code evals" secondary keyword present; good question format |

**Primary keyword in at least one H2:** Yes (after recommended rewording of H2 #3 and H2 #6)

---

## 6. AI Discoverability

| # | H2 heading | Question format? | Answer block (50–80 w)? | Links in answer zone? |
|---|-----------|-----------------|------------------------|-----------------------|
| 1 | What will we cover in this post? | ✓ | ✗ — opens with a bullet list, not a prose answer | ✗ |
| 2 | Why do mistakes compound in agentic workflows? | ✓ | ✓ | ✗ — link to Claude Code docs in sentence 2 |
| 3 | What are the five modules every eval framework shares? | ✓ | ✗ — opens with "I want to lay them out precisely first, then show…" (meta-commentary, not the answer) | ✓ |
| 4 | Why does the order of your graders matter? | ✓ | ✓ — opens directly with "Most teams I talk to reach for LLM-as-judge first. This is the expensive, slow, and inconsistent choice…" | ✓ |
| 5 | How does skill-creator implement these five modules? | ✓ | ✗ — opens with a definition paragraph rather than answering "how" up front | ✗ — link to Claude Code skill docs in sentence 2 |
| 6 | How does the eval tooling landscape break down? | ✓ | ✓ — opens with "The eval framework space looks crowded…But the space sorts cleanly into three clusters" — direct answer | ✓ |
| 7 | Which eval approach should Claude Code teams start with? | ✓ | ✗ — opens with "You don't need to benchmark all nine frameworks" (deflection, not a direct answer) | ✓ |

**Score: 2 / 7 headings pass all three checks**

Top flag: 5 of 7 H2s open with context-setting or meta-commentary rather than a direct answer block. H2 #3 and H2 #5 also have links inside the answer zone that reduce AI extractability.

---

## 7. Keyword Placement Checklist

| Position | Present? |
|----------|----------|
| H1 / Title | ✓ (after recommended H1 tweak) |
| First 100 words | ✗ — opening hook uses "eval tooling", "eval framework" doesn't appear until paragraph 4 |
| At least one H2 | ✓ (after recommended H2 rewording) |
| Meta description | ✓ |
| URL slug | ✗ — slug contains "evals" but not "eval-framework" |

**Score: 3 / 5**

Missing positions: first 100 words, URL slug. URL slug change is not recommended (series continuity). First 100 words is the actionable fix.

---

## 8. Readability Assessment

- **Estimated reading level:** Grade 8-10 for narrative sections; Technical for framework comparison table and cluster descriptions
- **Average sentence length:** ~14–16 words
- **Long sentences (>30 words):** ~4 — within acceptable range; no single sentence is egregiously long. Longest example: "A study of harness engineering across five agentic AI coding tools (arXiv:2602.14690) found that the evaluation configurations that matter most are the ones that capture multi-turn trajectory — what happened across the whole session, not just what the final output looked like." (~45 words)
- **Passive voice instances:** ~3 — within acceptable range. Examples: "was designed", "was written". No systematic passive voice problem.
- **Paragraph length:** Mostly 3–5 sentences. No paragraph over 6 sentences. Good rhythm.
- **Jargon density:** Medium — terms a non-specialist would not know: OpenTelemetry, OTLP, OpenInference semantic conventions, pass@k, pass^k, GEval, Completion Function Protocol, ResultMessage. Appropriate for the stated target audience (data scientists and ML engineers familiar with agents and LLMs). Would need a glossary for a general audience.
- **Overall:** Good — the draft reads cleanly at pace. The jargon is scoped and explained inline. The main readability gap is the context-setting openings on 5 H2s, which slow answer extraction without hurting prose flow.

---

## 9. Content Quality Signals

- **Word count:** ~4,200 words (body, excluding references section)
- **Target word count:** 3,750 (15 min × 250 wpm)
- **On target:** Within 12% — acceptable overshoot; the references section adds length beyond the reading-time estimate
- **External links:** 18 cited in-text — all validated against research_brief.md. No unchecked URLs found. Source quality is high (Anthropic engineering, official docs, arXiv, GitHub repos).

---

## 10. Title Variants

| Style | Title | Suggested subtitle |
|-------|-------|--------------------|
| Keyword-first | AI Eval Frameworks: The Architecture Behind Every Tool | All 9 frameworks implement the same 5 modules. Here's the map and a decision tree. |
| Curiosity-gap | I Read 9 Eval Frameworks. They're All the Same. | The 5-module architecture every tool independently rediscovered — and how to use it. |
| How-to | How to Pick an AI Eval Framework Without the Noise | One decision tree, three clusters, five modules — everything else is marketing. |
| Contrarian | You Don't Need to Compare Eval Frameworks | They converged on the same architecture. Once you see it, the comparison writes itself. |
| Authority | I Mapped 9 Eval Frameworks to 5 Modules. Here's the System. | Anthropic defined the architecture. The industry rediscovered it. Now you can use it. |

**Medium-specific notes:**
- Optimal title length: 40–60 characters
- Subtitles display on Medium post cards — treat them as a second hook
- Recommended variant: **Curiosity-gap** — "I Read 9 Eval Frameworks. They're All the Same." (49 chars). Accurate to the post's central argument, counter-intuitive, and matches the first-person observational voice of the opening hook.

---

## 11. Quick Wins

1. **Add "eval framework" to the first 100 words.** The opening hook (LangSmith anecdote) mentions "eval dashboard" and "five things, every time" but never uses the phrase "eval framework." One sentence revision — e.g., changing "The eval tooling space looks fragmented from the outside" to "The AI eval framework space looks fragmented from the outside" — fixes keyword placement position 2 with zero structural change.

2. **Rewrite the opening of H2 #3 to lead with the answer, not the plan.** Current: "The Anthropic engineering post names five modules. I want to lay them out precisely first, then show how every other framework maps onto them — because the mapping is the point." Suggested fix: open with a one-sentence statement that names all five modules immediately, then explain the plan. This is the highest-traffic H2 (the core argument) and the one AI extractors will read first.

3. **Remove or move the Claude Code docs link from the answer zone of H2 #2.** The link `[Claude Code](https://code.claude.com/docs/en/overview)` appears in the second sentence after the heading. Moving it to a later paragraph (or to the references section) preserves the answer block for AI extraction without affecting reader experience.

---

## Future: Keyword Volume

*This brief does not include keyword search volume, difficulty, or SERP competition data. A future milestone will integrate a keyword API (candidates: Google Search Console API, DataForSEO free tier, SEMrush API) to enrich this section with: monthly search volume, keyword difficulty score, top-10 SERP competitors, and related keyword suggestions.*

---

## 12. Post-Revision Verification

**Revised:** 2026-08-01

### Keyword placement: before → after

| Position | Before | After |
|----------|--------|-------|
| H1 / Title | ✓ (after recommended tweak) | ✓ — "AI eval frameworks landscape" in H1 |
| First 100 words | ✗ | ✓ — "The AI eval framework space looks fragmented from the outside" (paragraph 5, within first 100 words of body) |
| At least one H2 | ✓ (after recommended reword) | ✓ — H2 #3 "What are the five modules every AI eval framework shares?" and H2 #6 "How does the AI eval framework landscape break down?" |
| Meta description | ✓ | ✓ — unchanged, already included primary keyword |
| URL slug | ✗ | ✗ — intentionally skipped (series continuity; no change recommended) |

**Score: 3/5 → 4/5** (URL slug is the remaining ✗; not actionable per brief rationale)

### AI discoverability: before → after

| # | H2 heading | Question format before | Question format after | Answer block before | Answer block after |
|---|-----------|----------------------|----------------------|--------------------|--------------------|
| 1 | What will we cover in this post? | ✓ | ✓ | ✗ | ✗ — not targeted (navigational section) |
| 2 | Why do mistakes compound in agentic workflows? | ✓ | ✓ | ✓ | ✓ — inline link removed from answer zone |
| 3 | What are the five modules every AI eval framework shares? | ✓ | ✓ | ✗ | ✓ — now opens with direct answer naming all five modules |
| 4 | Why does the order of your graders matter? | ✓ | ✓ | ✓ | ✓ |
| 5 | How does skill-creator implement these five modules? | ✓ | ✓ | ✗ | ✗ — not targeted by Quick Wins |
| 6 | How does the AI eval framework landscape break down? | ✓ | ✓ | ✓ | ✓ |
| 7 | Which eval approach should Claude Code teams start with? | ✓ | ✓ | ✗ | ✗ — not targeted by Quick Wins |

**Score: 2/7 → 3/7** (H2 #3 answer block fixed; H2 #5 and H2 #7 remain without direct answer blocks — not in scope for this revision pass)

### Quick wins applied

| # | Quick Win | Applied? | Notes |
|---|-----------|----------|-------|
| 1 | Add "eval framework" to first 100 words | ✓ | Changed "The eval tooling space" → "The AI eval framework space" in paragraph 5 of the intro |
| 2 | Rewrite opening of H2 #3 to lead with the answer | ✓ | Now opens: "Every AI eval framework shares the same five modules: task bank, runner, graders, transcript, and baseline comparison." |
| 3 | Remove Claude Code docs link from answer zone of H2 #2 | ✓ | "[Claude Code](https://code.claude.com/docs/en/overview) is not a response engine" → "Claude Code is not a response engine." Link remains in References section. |

**Quick Wins pass rate: 3/3**

### Verification verdict

All three Quick Wins applied. Keyword placement improved from 3/5 to 4/5 (URL slug is the only remaining miss, intentionally not changed). H1 updated to sentence case with primary keyword present. Two H2s reworded to include primary keyword ("AI eval framework"). AI discoverability improved from 2/7 to 3/7 — H2 #3 now has a direct answer block. Readability was rated "Good" pre-revision with no "needs work" items; no readability changes were required.

**Remaining issues:**
- H2 #5 ("How does skill-creator implement these five modules?") and H2 #7 ("Which eval approach should Claude Code teams start with?") still open without direct answer blocks — both scored ✗ in Section 6 but were not included in Quick Wins. These are candidates for a future revision pass.
- URL slug cannot be improved without breaking series link continuity.
