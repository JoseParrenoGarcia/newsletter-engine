# SEO Brief: What you actually need to test — Claude Code evals, Part 2

---

## 1. Suggested Keywords

**Primary keyword:** claude code evals
**Secondary keywords:**
- evaluation surfaces claude code
- claude code workflow testing
- how to test claude code skills
- agentic eval surfaces
- tool-use eval trajectory eval

*Note: Keywords extracted from draft content and thesis. No search volume data — validate with a keyword tool before publishing. See Future: Keyword Volume section.*

---

## 2. Meta Description

**Recommended (≤160 chars):**
> Most Claude Code evals check only the final output. This post maps the nine evaluation surfaces your workflow exposes — and why ignoring the other eight hides the real failures.

- Primary keyword included: Yes
- Call to action present: No — descriptive hook; low-friction for a series post
- Character count: 175 — **trim needed.** Suggested shorter version:

> Most Claude Code evals check only the output. Here are the nine evaluation surfaces your workflow exposes — and why the other eight matter.

- Trimmed character count: 143 ✓

---

## 3. URL Slug

**Current slug:** `claude-code-evals-part-2-what-you-actually-need-to-test`
**Assessment:** No change needed. Contains primary keyword `claude-code-evals`, is descriptive, and matches the series pattern from Part 1.

---

## 4. H1 Recommendation

**Current H1 (draft title):** What you actually need to test — Claude Code evals, Part 2
**Recommended H1:** No change needed. Primary keyword `claude code evals` is present; the dash construction front-loads the benefit ("what you actually need to test") while grounding it in the series. Strong as-is.
**Primary keyword in H1:** Yes

---

## 5. H2/H3 Structure Review

The draft uses 13 H2s and no H3s. All 10 substantive content H2s are written in question format — this is a structural strength. The three non-content H2s (Key takeaways, Now I want to hear from you!, References) are conventional section labels.

| # | H2 heading | Assessment |
|---|-----------|-----------|
| 1 | What will we cover in this post? | Keep as-is — standard series orientation section |
| 2 | Why does evaluating the final output miss most of what can go wrong? | Keep as-is — strong, keyword-adjacent ("evaluating"), clear stakes |
| 3 | What do repository state evals actually check? | Keep as-is — "evals" present, concrete |
| 4 | What does a tool-use eval measure? | Keep as-is — "eval" present, direct |
| 5 | How do you test a trajectory, not just an outcome? | Keep as-is — "test" present, contrast is compelling |
| 6 | What are skill evals — and why do they have three distinct forms? | Keep as-is — "evals" present, sub-question adds depth |
| 7 | How do you evaluate agent and subagent delegation? | Keep as-is — "evaluate" present, specificity is good |
| 8 | What should hook and command evals actually test? | Keep as-is — "evals" and "test" present |
| 9 | Why do cost and latency deserve their own eval surface? | Keep as-is — "eval surface" present; strongest keyword variant in any H2 |
| 10 | When does human usefulness need to sit alongside automated grading? | Keep as-is — "automated grading" signals the eval context |
| 11 | Key takeaways from Part 2 | Keep as-is — conventional closing label |
| 12 | Now, I want to hear from you! | Keep as-is — engagement CTA, not a content heading |
| 13 | References | Keep as-is — standard |

No H3s present. The flat H2 structure is appropriate for a long-form explainer where each section addresses one eval surface. Adding H3s is not needed.

---

## 6. AI Discoverability

The draft's all-question H2 structure is excellent for AI extractability. The main drag is links appearing in the answer zone (first ~80 words) of several sections — these reduce AI extractability without any SEO benefit.

| # | H2 heading | Question format? | Answer block (50–80 w)? | Links in answer zone? |
|---|-----------|-----------------|------------------------|-----------------------|
| 1 | What will we cover in this post? | ✓ | ✓ | ✓ (no links) — passes |
| 2 | Why does evaluating the final output miss most of what can go wrong? | ✓ | ✓ | ✗ — link in first 80 words |
| 3 | What do repository state evals actually check? | ✓ | ✓ | ✗ — link in first 80 words |
| 4 | What does a tool-use eval measure? | ✓ | ✓ | ✓ (no links) — passes |
| 5 | How do you test a trajectory, not just an outcome? | ✓ | ✓ | ✓ (no links) — passes |
| 6 | What are skill evals — and why do they have three distinct forms? | ✓ | ✓ | ✗ — link in first 80 words |
| 7 | How do you evaluate agent and subagent delegation? | ✓ | ✓ | ✗ — link in first 80 words |
| 8 | What should hook and command evals actually test? | ✓ | ✓ | ✗ — link in first 80 words |
| 9 | Why do cost and latency deserve their own eval surface? | ✓ | ✓ | ✗ — link in first 80 words |
| 10 | When does human usefulness need to sit alongside automated grading? | ✓ | ✓ | ✓ (no links) — passes |
| 11 | Key takeaways from Part 2 | ✗ | ✓ | ✓ |
| 12 | Now, I want to hear from you! | ✗ | ✓ | ✓ |
| 13 | References | ✗ | ✓ | ✗ |

**Score: 4 / 10 substantive H2s pass all three checks** (counting only H2s 1–10; 11–13 are structural/non-content)

The bottleneck is links in the answer zone of H2s 2, 3, 6, 7, 8, and 9. The fix is mechanical: move inline citations to after the first 80-word block. This would lift the score to 10/10 with no content changes.

---

## 7. Keyword Placement Checklist

| Position | Present? |
|----------|----------|
| H1 / Title | ✓ — "Claude Code evals" in working title |
| First 100 words | ✗ — "eval" variant appears but full phrase "Claude Code evals" does not. The opening is the series recap box, not direct prose. |
| At least one H2 | ✓ — 7 of 10 substantive H2s contain "eval", "evals", or "evaluate" |
| Meta description | ✓ — included in recommended meta description above |
| URL slug | ✓ — "claude-code-evals" in slug |

**Score: 4 / 5**

**Missing position:** First 100 words. The real prose opens with the series recap bullet list, which contains "eval" but not the full phrase "Claude Code evals." The first sentence of `**In this part, we cover:**` is the earliest place to add the phrase naturally.

**Suggested fix:** Change the "In this part, we cover:" sentence to something like: *"In this part, we cover the nine Claude Code evals surfaces that a production workflow exposes — and why the output check is necessary but nowhere near sufficient."*

---

## 8. Readability Assessment

- **Estimated reading level:** Grade 8–10 with technical passages — appropriate for the stated audience (engineers and technical leads)
- **Average sentence length:** ~13–14 words (well within the 15–20 word target; on the shorter side, which aids scannability)
- **Long sentences (>30 words):** 17 — within acceptable range for a 4,700-word technical post; first three are: (1) "They cannot tell you whether the document was saved correctly, whether the right context was read before writing..." (~38 words), (2) "The repo state surface is particularly relevant for skills that have prescribed file-system contracts..." (~33 words), (3) "The invented metrics will surface later — in the analyst's query, when the data engineer cannot find the tracking event..." (~36 words). None break comprehension.
- **Passive voice instances:** ~21 (approximate) — moderate. Examples: "was saved correctly", "is designed", "was introduced". Mostly confined to describing model behaviours and published results, which is conventional. Count is acceptable.
- **Paragraph length:** Good — most paragraphs are 2–4 sentences. ~11 of 113 blocks have more than 6 lines, but many of these are YAML code blocks or bullet lists, not prose paragraphs. No wall-of-text issues.
- **Jargon density:** Medium — terms requiring Claude Code context: transcript assertion, hook, subagent, model routing, eval surface, control-plane eval. All are defined in context within the draft. Appropriate for the target audience; a non-specialist would struggle but the post is not aimed at them.
- **Overall:** Good — the post reads cleanly. Sentence rhythm is varied. The running example (A/B test document skill) provides concrete anchoring throughout. No wall-of-text issues. Jargon is explained on first use.

---

## 9. Content Quality Signals

- **Word count:** 4,738 words (~19 min read)
- **Target word count:** 5,000 words (20 min × 250 wpm)
- **On target:** Within 5% — essentially on target. The slight undershoot is not a concern.
- **External links:** 25 links cited — strong. Sources include Anthropic engineering blog, official Claude Code docs (code.claude.com), and arXiv papers. Some URLs repeat (e.g., the Anthropic demystifying-evals post appears 4 times) — repetition is acceptable given it is the primary reference. Domain variety is good.

---

## 10. Title Variants

| Style | Title | Suggested subtitle |
|-------|-------|--------------------|
| Keyword-first | Claude Code Evals: The Nine Surfaces You're Probably Not Testing | Why checking the output is necessary but not sufficient for production workflows |
| Curiosity-gap | Your Claude Code Eval Is Passing. Here's What It's Missing. | Nine evaluation surfaces — and why the one most teams test first only shows part of the picture |
| How-to | How to Evaluate a Claude Code Workflow Across All Nine Failure Surfaces | A surface-by-surface guide using a real running example |
| Contrarian | The Output Check Isn't Enough. Here Are the Eight Surfaces You're Skipping. | Repository state, tool use, trajectory, cost, latency — and why each catches failures the output test cannot |
| Authority | I Mapped Nine Evaluation Surfaces for Claude Code Workflows. Most Teams Test One. | A structured breakdown of what each eval catches, with a running example throughout |

**Medium-specific notes:**
- Optimal title length: 40–60 characters
- Subtitles display on Medium post cards — treat them as a second hook

---

## 11. Quick Wins

**1. Move inline citations out of the first 80 words of each section (highest impact)**
Sections 2, 3, 6, 7, 8, and 9 all have hyperlinks within their answer zone. This is the single largest drag on AI extractability. Move the citation/link to after the first paragraph (past the ~80-word mark) in each affected section. No content changes required — purely structural repositioning. This lifts the AI discoverability score from 4/10 to 10/10.

**2. Add "Claude Code evals" to the first 100 words of prose**
The opening is currently the series recap bullet list. The phrase "Claude Code evals" appears as a variant but not exactly. Add it explicitly to the "In this part, we cover:" sentence. Suggested: *"In this part, we cover the nine Claude Code evals surfaces that a production workflow exposes — and why the output check is necessary but nowhere near sufficient."* This fixes the one missing keyword placement position (score goes 4/5 → 5/5).

**3. Trim the meta description to ≤160 characters**
The recommended meta description is 175 characters. Trim to: *"Most Claude Code evals check only the output. Here are the nine evaluation surfaces your workflow exposes — and why the other eight matter."* (143 chars). No draft changes needed.

---

## Future: Keyword Volume

No search volume data was available at time of writing. Before publishing, validate the following terms in a keyword tool (e.g. Ahrefs, Semrush, or Google Keyword Planner):

| Term | Why to check |
|------|-------------|
| claude code evals | Primary keyword — confirm search volume and competition |
| claude code evaluation | Likely variant with potentially higher volume |
| how to test claude code | Action-oriented variant — may have higher intent signal |
| agentic eval surfaces | Niche but growing; check trend direction |
| claude code workflow testing | Long-tail; low competition likely |

---

## 12. Post-Revision Verification

**Verified against:** long_draft.md (post-revise)
**Verified on:** 2026-07-08

### Keyword Placement — before → after
| Position | Before | After |
|----------|--------|-------|
| H1 / Title | ✓ | ✓ |
| First 100 words | ✗ | ✓ |
| At least one H2 | ✓ | ✓ |
| Meta description | ✓ | ✓ (not in draft body) |
| URL slug | ✓ | ✓ (not in draft body) |

**Score: 4/5 → 5/5**

Change 1 was applied: the "In this part, we cover:" sentence now reads "In this part, we cover the nine Claude Code evals surfaces that a production workflow exposes — and why the output check is necessary but nowhere near sufficient." The exact phrase "Claude Code evals" is present within the first 100 words of prose.

### AI Discoverability — before → after
| Section | H2 heading | Before | After |
|---------|-----------|--------|-------|
| 2 | Why does evaluating the final output miss most of what can go wrong? | ✗ link in answer zone | ✓ |
| 3 | What do repository state evals actually check? | ✗ link in answer zone | ✓ |
| 6 | What are skill evals — and why do they have three distinct forms? | ✗ link in answer zone | ✓ |
| 7 | How do you evaluate agent and subagent delegation? | ✗ link in answer zone | ✓ |
| 8 | What should hook and command evals actually test? | ✗ link in answer zone | ✓ |
| 9 | Why do cost and latency deserve their own eval surface? | ✗ link in answer zone | ✓ |

**Score: 4/10 → 10/10**

Verification notes per section:
- **Section 2**: Opening sentence now plain text ("Anthropic's engineering post on demystifying evals for AI agents defines an eval as..."). Link reattached at end of section as parenthetical reference.
- **Section 3**: Opening paragraph now plain text ("The official overview describes it as an acting system..."; "Research into Claude Code's design space puts it plainly..."). Both links reattached as a reference note after the "Repository state evals ask:" sentence.
- **Section 6**: Opening sentence now plain text ("The skills documentation describes how Claude uses them..."). Link reattached at end of section.
- **Section 7**: Second sentence of opening now plain text ("The subagents documentation describes subagents as specialised agents..."). The second sentence falls within the first 80 words; it is now link-free. Link reattached at end of section.
- **Section 8**: Both first and second paragraph openers now plain text ("The hooks documentation describes them as..." and "The memory documentation draws the key distinction..."). Both links reattached after the research citation paragraph.
- **Section 9**: Second paragraph now plain text ("The subagents documentation explicitly names routing tasks..."). Link reattached at end of section.

### Quick Wins — applied?
1. Move inline citations out of the first 80 words of each section — ✓ applied (all 6 affected sections revised)
2. Add "Claude Code evals" to the first 100 words of prose — ✓ applied (exact phrase present in "In this part, we cover:" sentence)
3. Trim the meta description to ≤160 characters — ✓ (not in draft body; no draft changes needed)

### Verification verdict
**All fixes applied:** Yes
**Remaining issues:** None
