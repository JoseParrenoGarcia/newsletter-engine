# SEO Brief: Why "It Worked Once" Is Not Evidence

**Post slug:** claude-code-evals-part-1-why-it-worked-once-is-not-evidence
**Date:** 2026-07-07

---

## 1. Suggested Keywords

**Primary keyword:** claude code evals
**Secondary keywords:**
- agent evaluation
- LLM non-determinism
- AI agent reliability
- claude code testing
- eval discipline

*Note: Keywords extracted from draft content and thesis. No search volume data — validate with a keyword tool before publishing. See Future: Keyword Volume section.*

---

## 2. Meta Description

**Recommended (≤160 chars):**
> One good Claude Code run is not evidence. Learn why LLMs are probabilistic and how evals give you the reliability data you're missing.

- Primary keyword included: Yes
- Call to action present: Yes (implicit — "learn why")
- Character count: 137

---

## 3. URL Slug

**Current slug:** claude-code-evals-part-1-why-it-worked-once-is-not-evidence
**Recommended slug:** claude-code-evals-part-1-why-it-worked-once-is-not-evidence
**Change needed:** No

The slug already leads with `claude-code-evals` — the primary keyword is front-loaded and the part number preserves series navigability.

---

## 4. H1 Recommendation

**Current H1:** Why "It Worked Once" Is Not Evidence
**Recommended H1:** Why "It Worked Once" Is Not Evidence — Claude Code Evals, Part 1

**Rationale:** The current H1 is punchy and curiosity-driving but contains neither "claude code" nor "evals". Adding the series label as a subtitle clause brings the primary keyword into the H1 without softening the hook. The subtitle already appears in italics below the H1 in the draft (`*Claude Code Evals — Part 1 of 3*`); merging or reinforcing it in the H1 itself would satisfy the placement check.

---

## 5. H2/H3 Structure Review

| # | Current heading | Recommendation |
|---|----------------|----------------|
| 1 | What will we cover in this post? | keep as-is — navigational; keyword not needed here |
| 2 | What is the run that felt like magic? | keep as-is — strong hook; keyword not needed |
| 3 | Why are LLMs probabilistic, not deterministic? | keep as-is — contains the primary argument signal; good for AI search |
| 4 | What is the unit test we forgot to write? | keep as-is — analogy is the hook; no benefit from forcing a keyword |
| 5 | What are the three questions you cannot answer without evals? | reword to: "What are the three questions you cannot answer without Claude Code evals?" — adds primary keyword naturally |
| 6 | What is Claude Code actually doing? | keep as-is — "Claude Code" present; strong standalone signal |
| 7 | What are the failures that should have been caught? | reword to: "What agent failures should Claude Code evals have caught?" — adds both "agent" and "Claude Code evals" |
| 8 | Are evals a thinking problem or an infrastructure problem? | keep as-is — strong debate framing; keyword "evals" present |
| 9 | What comes next | keep as-is — navigational closer |
| 10 | Now, I want to hear from you | keep as-is — engagement prompt; not a content heading |
| 11 | References | keep as-is |

**Primary keyword in at least one H2:** No (partial: "evals" and "Claude Code" appear separately in different H2s, never together)

---

## 6. AI Discoverability

| # | H2 heading | Question format? | Answer block (50–80 w)? | Links in answer zone? |
|---|-----------|-----------------|------------------------|-----------------------|
| 1 | What will we cover in this post? | ✓ | ✓ (bullet list, direct) | ✗ |
| 2 | What is the run that felt like magic? | ✓ | ✓ (direct narrative) | ✓ FLAGGED — Vox link in first ~80w |
| 3 | Why are LLMs probabilistic, not deterministic? | ✓ | ✓ (direct answer: "The architecture is the reason") | ✓ FLAGGED — arXiv link in first ~80w |
| 4 | What is the unit test we forgot to write? | ✓ | ✓ (direct answer starts immediately) | ✗ |
| 5 | What are the three questions you cannot answer without evals? | ✓ | ✓ (opens with direct answer list) | ✗ |
| 6 | What is Claude Code actually doing? | ✓ | ✓ (opens with framing statement) | ✓ FLAGGED — code.claude.com link in first ~80w |
| 7 | What are the failures that should have been caught? | ✓ | ✓ (direct: "These are not edge cases") | ✗ |
| 8 | Are evals a thinking problem or an infrastructure problem? | ✓ | ✓ (direct: "Both, but in the wrong order") | ✗ |
| 9 | What comes next | ✓ (starts with "What") | ✓ (brief and direct) | ✗ |
| 10 | Now, I want to hear from you | ✗ — not a question heading; suggested rewrite: "What Claude Code workflow would you test first?" | ✓ | ✗ |
| 11 | References | ✗ — non-content section, no rewrite needed | n/a | ✓ (reference list — expected) |

**Score: 7 / 11 headings pass all three checks**

Top flag: Three content H2s (#2, #3, #6) have external links inside the first ~80 words, which reduces AI extractability. Moving those links to after the opening answer paragraph would bring the score to 10/11 at zero cost to prose quality.

---

## 7. Keyword Placement Checklist

| Position | Present? |
|----------|----------|
| H1 / Title | ✗ — "claude code evals" not in current H1; resolved by H1 recommendation above |
| First 100 words | ✓ — "Claude Code" and "evals" both appear in first 100 words (in the subtitle line) |
| At least one H2 | ✗ — "claude code evals" as a phrase does not appear in any H2; "Claude Code" and "evals" appear separately |
| Meta description | ✓ — included in recommended meta description |
| URL slug | ✓ — "claude-code-evals" is the first meaningful segment of the slug |

**Score: 3 / 5**

Missing positions: H1 (fixable with subtitle merge) and at least one H2 (fixable by rewording H2 #5 or #7 per section 5 recommendations).

---

## 8. Readability Assessment

- **Estimated reading level:** Grade 8–10 (clear, direct prose; minimal academic hedging)
- **Average sentence length:** ~16 words (sample of 20 prose sentences)
- **Long sentences (>30 words):** 11 total — within acceptable range given the post length (3,229 words); the longest reach 50–55 words due to bullet-list constructions parsed as single sentences by the splitter. Genuine over-long prose sentences are few.
- **Passive voice instances:** 17 estimated — slightly elevated; examples: "is revised", "be swapped", "is figured", "be tested", "are loaded". None are jarring; all occur in technical explanations where passive is natural. No rewrite required unless a section feels flat.
- **Paragraph length:** 71 paragraphs identified; 3 exceed 6 lines. Paragraph density is well-managed throughout.
- **Jargon density:** Medium — terms present: `probabilistic`, `agentic`, `floating-point`, `temperature`, `subagent`, `regression suite`, `LLM`. All are either defined in-line or familiar to the stated target audience (engineers and technical PMs). No action required.
- **Overall:** Good — the draft reads cleanly at Grade 8–10 level for a technical audience. Sentence length is controlled, paragraphs are short, and the few passive constructions are contextually appropriate.

---

## 9. Content Quality Signals

- **Word count:** 3,229 words (~13 min read)
- **Target word count:** 3,750 words (15 min × 250 wpm)
- **On target:** Within 14% — slightly short of the 15-minute target; acceptable given the post's role as a framing essay (Part 1 of 3) rather than a comprehensive guide.
- **External links:** 31 links cited — strong. Sources include Anthropic engineering blog, official Claude Code documentation (code.claude.com), and three peer-reviewed arXiv papers. All links cross-reference against research_brief.md. Link quality is high and domain variety is good (no over-reliance on a single source).

---

## 10. Title Variants

### 1. Keyword-first
**Title:** Claude Code Evals, Part 1: Why One Good Run Is Not Evidence
**Subtitle:** The probabilistic nature of LLMs means your first impressive result is a data point of one — here's what to do instead.

### 2. Curiosity gap
**Title:** You Ran Claude Code and It Worked. Now What?
**Subtitle:** Why "it worked once" is the most dangerous place to stop — and the discipline that fills the gap.

### 3. Contrarian
**Title:** Stop Trusting Your Claude Code Demos
**Subtitle:** A single impressive run is not reliability data. Here is the mental model that changes how you build.

### 4. Future-perfect
**Title:** After You Add Evals, You Will Never Trust a Single Claude Code Run Again
**Subtitle:** Part 1 of 3: the case for treating agent workflows like software — with tests, not vibes.

### 5. Plain how-to
**Title:** How to Know Whether Your Claude Code Workflow Actually Works
**Subtitle:** The eval discipline that software engineers apply to code — and why it has not reached agents yet.

---

## 11. Quick Wins

1. **Move the external links in H2 sections #2, #3, and #6 to after the first answer paragraph.** Currently, three content sections have hyperlinks within the first ~80 words, which degrades AI extractability. Relocating each link by one paragraph — so it appears after the direct answer block rather than inside it — would raise the AI discoverability score from 7/11 to 10/11 with no rewrite of prose required.

2. **Add "Claude Code evals" as a phrase to at least one H2.** The primary keyword never appears as a compound phrase in any heading. Rewording H2 #5 from "What are the three questions you cannot answer without evals?" to "What are the three questions you cannot answer without Claude Code evals?" inserts the primary keyword in a heading naturally and raises the keyword placement score from 3/5 to 4/5.

3. **Strengthen the H1 by merging the series subtitle into it.** The current H1 ("Why 'It Worked Once' Is Not Evidence") contains neither "Claude Code" nor "evals". The italic subtitle line below it (`*Claude Code Evals — Part 1 of 3*`) does. On Medium, H1 is the article title — fusing or reinforcing the primary keyword in the H1 is the single highest-ROI SEO change for click-through from search results.

---

## Future: Keyword Volume

*No search volume data is available in this brief. Before publishing, validate the following keyword candidates with a tool such as Ahrefs, SEMrush, or Google Search Console:*

- `claude code evals` — likely low volume today; may grow as Claude Code adoption increases
- `agent evaluation` — broader; more search volume but higher competition
- `LLM non-determinism` — technical niche; relevant for the probabilistic section
- `claude code testing` — variant worth checking for search intent alignment
- `AI agent reliability` — broader intent; relevant to the thesis

*If `claude code evals` has very low volume, consider pivoting the primary keyword to `agent evaluation` and using `claude code evals` as a secondary.*

---

## 12. Post-Revision Verification

**Verified against:** long_draft.md (post-revise)
**Verified on:** 2026-07-07

### Keyword Placement — before → after
| Position | Before | After |
|----------|--------|-------|
| H1 / Title | ✗ | ✓ |
| First 100 words | ✓ | ✓ |
| At least one H2 | ✗ | ✓ |
| Meta description | ✓ | ✓ |
| URL slug | ✓ | ✓ |

**Score: 3/5 → 5/5**

### AI Discoverability — before → after
| Check | Before | After |
|-------|--------|-------|
| H2 "Now, I want to hear from you" (question format) | ✗ | ✓ reworded to: "What Claude Code workflow would you test first?" |
| H2 #2 Vox link in first ~80 words | ✗ flagged | ✓ moved — link now appears in paragraph 3, after the direct answer block |
| H2 #3 arXiv link in first ~80 words | ✗ flagged | ✓ moved — link now appears after the bullet list (>80 words in) |
| H2 #6 code.claude.com link in first ~80 words | ✗ flagged | ✓ moved — link now appears after the bullet list, past first 80 words |

**Score: 7/11 → 10/11**

### Quick Wins — applied?
1. Move external links in H2 sections #2, #3, and #6 to after the first answer paragraph — ✓ (all three moved: #2 Vox link to paragraph 3, #3 arXiv link to after bullet list, #6 overview link to after bullet list)
2. Add "Claude Code evals" as a phrase to at least one H2 — ✓ (appears in H2 #5 "What are the three questions you cannot answer without Claude Code evals?" and H2 #7 "What agent failures should Claude Code evals have caught?")
3. Strengthen the H1 by merging the series subtitle into it — ✓ (H1 now reads: "Why 'It Worked Once' Is Not Evidence — Claude Code Evals, Part 1")

### Verification verdict
**All fixes applied:** Yes
**Remaining issues:** None
