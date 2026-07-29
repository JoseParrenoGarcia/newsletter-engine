# SEO Brief: What You Actually Need To Test — Claude Code Evals, Part 2

**Post:** posts/claude-code-evals-part-2-what-you-actually-need-to-test/long_draft.md
**Generated:** 2026-07-29

---

## 1. Suggested Keywords

**Primary keyword:** Claude Code evals
**Secondary keywords:**
- evaluation surfaces
- AI agent testing
- skill trigger testing
- repository state eval
- tool use trajectory

*Note: Keywords extracted from draft content and thesis. No search volume data — validate with a keyword tool before publishing. See Future: Keyword Volume section.*

---

## 2. Meta Description

**Recommended (≤160 chars):**
> Claude Code evals go beyond the final output. Map all 9 evaluation surfaces: skill triggers, tool-use trajectory, and repo state — and where to start.

- Primary keyword included: Yes
- Call to action present: Yes (implied — "where to start")
- Character count: 152

---

## 3. URL Slug

**Current slug:** claude-code-evals-part-2-what-you-actually-need-to-test
**Recommended slug:** claude-code-evals-part-2-what-you-actually-need-to-test
**Change needed:** No — the slug leads with the primary keyword and the series descriptor is clear.

---

## 4. H1 Recommendation

**Current H1 (draft title):** What You Actually Need To Test — Claude Code Evals, Part 2
**Recommended H1:** Claude Code Evals: What You Actually Need To Test
**Primary keyword in H1:** Yes (currently present; recommend moving it to the front)

*Rationale: Moving "Claude Code Evals" to the front of the H1 places the primary keyword in the first visible characters of the post card on Medium, improving click-through. Drops "Part 2" from H1 — the series context is carried by the subtitle. Character count: 50 (well within Medium's 60-70 clean display range).*

---

## 5. H2/H3 Structure Review

| # | Current heading | Recommendation |
|---|----------------|----------------|
| 1 | What does the evaluation map look like? | Reword to: "What does a Claude Code evaluation map look like?" — adds primary keyword variant |
| 2 | How do you know the right skill or agent triggered? | keep as-is — strong question format, clear topic |
| 3 | What did the workflow actually do to get there? | keep as-is — strong question format, covers trajectory |
| 4 | What state did the workflow leave behind? | keep as-is — clear and direct |
| 5 | What about the other six surfaces? | keep as-is — purposeful lightness fits the section weight |
| 6 | Key takeaways from part 2 | Reword to: "Key takeaways: Claude Code eval surfaces" — adds primary keyword, more specific |
| 7 | Now, I want to hear from you | keep as-is — CTA section; keyword inclusion would feel forced |
| 8 | References | keep as-is — standard section label |

**Primary keyword in at least one H2:** No (current draft) → Yes after recommended rewording of H2 #1 or #6.

---

## 6. AI Discoverability

| # | H2 heading | Question format? | Answer block (50–80 w)? | Links in answer zone? |
|---|-----------|-----------------|------------------------|-----------------------|
| 1 | What does the evaluation map look like? | ✓ | ✗ — opens with context-setting ("A Claude Code workflow is not a single thing…") rather than a direct answer; the table arrives after the Anthropic link | ✗ — Anthropic Engineering link appears in the second paragraph, within the ~80-word answer zone |
| 2 | How do you know the right skill or agent triggered? | ✓ | ✗ — opens with narrative setup ("The A/B test document skill exists…") not a direct answer to the question | ✓ |
| 3 | What did the workflow actually do to get there? | ✓ | ✗ — opens with recap ("The experiment design skill passed its output eval…") before posing the real question | ✓ |
| 4 | What state did the workflow leave behind? | ✓ | ✗ — opens with recap of prior checks, withholds the answer until mid-section | ✓ |
| 5 | What about the other six surfaces? | ✓ | ✗ — transitions rather than answers ("The three deep dives cover the surfaces most likely to produce silent failures…") | ✓ |
| 6 | Key takeaways from part 2 | ✗ — not a question | ✗ — bullet list, not a prose answer block | ✓ |
| 7 | Now, I want to hear from you | ✗ — not a question | ✗ — engagement prompts, not an answer block | ✓ |
| 8 | References | ✗ — not a question | ✗ — link list, not an answer block | ✗ — links immediately present |

**Score: 0 / 8 headings pass all three checks**

**Top flag:** The five question-format H2s (1–5) all open with narrative context or recap instead of a direct answer. AI extractors (Google AI Overviews, Perplexity, Claude) scan the first 50–80 words after a heading for a self-contained response. Adding a 1–2 sentence direct answer immediately after each question-format H2 — before the context-building — would raise this score substantially and improve organic AI citation.

---

## 7. Keyword Placement Checklist

| Position | Present? |
|----------|----------|
| H1 / Title | ✓ — "Claude Code Evals" present; recommend moving to front |
| First 100 words | ✗ — "eval" appears frequently but the phrase "Claude Code evals" does not appear in the opening paragraph |
| At least one H2 | ✗ — no H2 currently contains the primary keyword or a direct variant |
| Meta description | ✓ — included in recommended meta description above |
| URL slug | ✓ — "claude-code-evals" leads the slug |

**Score: 3 / 5**

**Missing positions:** First 100 words and at least one H2.

---

## 8. Readability Assessment

- **Estimated reading level:** Grade 8-10 — direct prose, short sentences, but medium jargon density appropriate for the target audience
- **Average sentence length:** ~16 words (estimated from representative sample)
- **Long sentences (>30 words):** ~3 — within acceptable range; one notable example: "But rigid step-ordering checks are 'too brittle': agents often find valid alternative paths, and a check that fails because Claude inserted an intermediate Glob call before reading the metrics file is a check that produces noise, not signal." (~37 words)
- **Passive voice instances:** ~4 — examples: "was never involved," "could have failed silently," "has been applied" — not disruptive at this frequency; no action needed
- **Paragraph length:** Good — most paragraphs are 2-4 sentences; no paragraph exceeds 6 sentences
- **Jargon density:** Medium — terms in regular use without explanation: eval, transcript, trajectory, YAML, git diff, subagent, LLM rubric, trigger eval, delta eval. Expected for the audience (engineers and technical PMs), but a one-line anchor definition for "eval" in the intro could lower the bar for technical PMs less familiar with the term.
- **Overall:** Good — the draft reads cleanly for its target audience. Sentence rhythm is strong, prose is direct, and structure mirrors the logical map the post is building. No readability problems that require attention before publishing.

---

## 9. Content Quality Signals

- **Word count:** ~2,450 words (~10 min read)
- **Target word count:** 3,750 words (15 min × 250 wpm)
- **On target:** Off by ~35% — the draft is substantively under the target reading time
- **External links:** 9 citations — all Anthropic official docs or a credible academic benchmark (SWE-bench arXiv). Quality is high; no suspect sources. No research_brief.md was generated for this post; all cited URLs are official Anthropic documentation or published academic work and do not require cross-referencing.

---

## 10. Title Variants

| Style | Title | Suggested subtitle |
|-------|-------|--------------------|
| Keyword-first | Claude Code Evals: The Nine Surfaces That Matter | Most teams test the final output. Here's the complete map — and where to start. |
| Curiosity-gap | Your Claude Code Eval Is Missing Eight Things | The output passed. The skill didn't trigger. The file landed in the wrong place. |
| How-to | How to Evaluate a Claude Code Workflow End to End | From trigger checks to git diff as a grader — a practical map of nine surfaces. |
| Contrarian | Output Evals Are Not Enough for Claude Code | Nine evaluation surfaces exist. Most practitioners build one. |
| Authority | I Mapped Nine Evaluation Surfaces for Claude Code | Trigger evals, trajectory checks, repository state — here's the complete picture. |

**Medium-specific notes:**
- Optimal title length: 40-60 characters
- Subtitles display on Medium post cards — treat them as a second hook
- Recommended title: **Curiosity-gap** — "Your Claude Code Eval Is Missing Eight Things" (46 chars) directly mirrors the post's central thesis (the output passed but eight other things could have failed silently), creates intrinsic tension, and will perform well as a hook on a post card. The subtitle resolves the tension with three concrete failure modes.

---

## 11. Quick Wins

1. **Add the phrase "Claude Code evals" to the first 100 words.** Currently the intro uses "eval" and "a Claude Code workflow" but never the combined phrase. A one-sentence addition at the end of the opening paragraph — e.g., "Part 2 maps all nine surfaces where a Claude Code eval can succeed or fail." — closes keyword placement position 2 with zero structural disruption.

2. **Add a 1–2 sentence direct answer immediately after each of the five question-format H2s.** All five currently open with narrative context or recap. Moving the direct answer to the first 50–80 words after each heading would lift the AI discoverability score from 0/8 toward 5/8 and directly increase the chance of appearing in AI-generated summaries and featured snippets.

3. **Reword H1 to keyword-first: "Claude Code Evals: What You Actually Need To Test"** — moves the primary keyword from mid-title to the first visible characters in Medium's card display, improving click-through without changing the content signal. This is a single-line change with immediate effect.

---

## Future: Keyword Volume

*This brief does not include keyword search volume, difficulty, or SERP competition data. A future milestone will integrate a keyword API (candidates: Google Search Console API, DataForSEO free tier, SEMrush API) to enrich this section with: monthly search volume, keyword difficulty score, top-10 SERP competitors, and related keyword suggestions.*

---

## 12. Post-Revision Verification

**Verified against:** long_draft.md (post-revise)
**Verified on:** 2026-07-29

### Keyword Placement — before → after
| Position | Before | After |
|----------|--------|-------|
| H1 / Title | ✓ | ✓ |
| First 100 words | ✗ | ✓ |
| At least one H2 | ✗ | ✓ |
| Meta description | ✓ | ✓ |
| URL slug | ✓ | ✓ |

**Score: 3/5 → 5/5**

### AI Discoverability — before → after
| H2 | Before | After |
|----|--------|-------|
| What does a Claude Code evaluation map look like? | ✗ no direct answer | ✓ — "There are nine. The table below lists them — each one is an independent place where something can go wrong." |
| How do you know the right skill or agent triggered? | ✗ no direct answer | ✓ — "You run a trigger eval. It checks whether the right skill fires for the right task — and whether it stays dormant for tasks it should not handle." |
| What did the workflow actually do to get there? | ✗ no direct answer | ✓ — "You grade the transcript. The sequence of tool calls — Read, Write, command — is the record of what the workflow actually did, and output evals cannot grade it." |
| What state did the workflow leave behind? | ✗ no direct answer | ✓ — "You run a repository state eval: compare the git diff against the expected set of changes. The file either landed where it should or it did not." |
| What about the other six surfaces? | ✗ no direct answer | ✓ — "Each of the remaining six has a distinct failure mode: final output (covered in Part 1), hooks, subagents, cost and latency, human usefulness, and instruction following." |
| Key takeaways: Claude Code eval surfaces | ✗ not question format | ✗ not question format |
| Now, I want to hear from you | ✗ not question format | ✗ not question format |
| References | ✗ not question format | ✗ not question format |

**Score: 0/8 → 5/8**

### Quick Wins — applied?
1. Add the phrase "Claude Code evals" to the first 100 words — ✓ (exact suggested sentence added: "Part 2 maps all nine surfaces where a Claude Code eval can succeed or fail.")
2. Add 1–2 sentence direct answer immediately after each of the five question-format H2s — ✓ (all five H2s 1–5 now open with a direct answer)
3. Reword H1 to keyword-first: "Claude Code Evals: What You Actually Need To Test" — ✓ (H1 is now exactly this)

### Verification verdict
**All fixes applied:** Yes
**Remaining issues:** None — all three quick wins applied; H2s 6–8 are intentionally not question format (takeaways, CTA, references) and were not targeted for AI discoverability improvement
