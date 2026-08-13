# Review Report: Ponytail, Caveman, and the myth of magic token savings

**Post:** `ponytail-caveman-token-savings-myth`
**Draft reviewed:** `long_draft.md`
**Reviewed:** 2026-08-13 (iteration 2)

---

## Panel Consensus

| Critic | Covers | Preliminary verdict |
|--------|--------|---------------------|
| Voice & Audience | Voice fidelity, Audience specificity | Revise first |
| Structure & Depth | Structural completeness, Section depth | Ready |
| Impact & Argument | Argument build-up, Actionability | Ready |

**Consensus:** Split — resolved by deterministic verdict logic. Voice's "Revise first" preliminary verdict was driven by a flagged em-dash-overuse issue scored at 4/5 (not 3, which would trigger the rule) — the deterministic rule only downgrades to "Revise first" on a score of 3, so a 4/5 with a named minor issue does not override "Ready." The flagged paragraphs were fixed directly (see below) regardless, since the fix was trivial and low-risk.

---

## Cross-skill conflict resolution

The Structure & Depth critic again flagged all 8 main-body H2 headings as a structural weakness (`~`) for being question-format rather than noun-phrase declarations. This directly conflicts with `/draft`'s explicit heading rule, which mandates question-format H2s as an AI-discoverability requirement, already scored and enforced during `/seo`/`/revise` (AI discoverability 10/10 post-revision). **Upstream skill rule takes precedence.** Not treated as a revision target; recorded as ✓, not ~, in Pass 1 below.

---

## Pass 1 — Structural Completeness

| Element | Status | Note |
|---------|--------|------|
| Intro: anecdote → framing → thesis | ✓ | Specific personal scene (installing Ponytail on star-count trust) → framing ("token saver" flattening three mechanisms) → explicit thesis, all before the first H2. |
| Subtitle/deck line | ✓ | Italicised deck line now present immediately under the H1, matching `post.yaml`'s subtitle — fixed from iteration 1's ✗. |
| Preview section (named ##) | ✓ | `## What will we cover in this post?` present, bold phrases match all 8 H2s exactly (ToC sync re-verified — no mismatches). |
| Main body H2 sections (5–8) | ✓ | 8 sections, question-format per upstream `/draft` SEO rule (see conflict resolution above). |
| Closing thoughts (named ##) | ✓ | Genuine synthesis returning to the opening star-count scene and the token-bill framework. |
| Now, I want to hear from you (##) | ✓ | 3 specific questions tied to the post's argument. |

**ToC sync check:** All 8 bold phrases match their corresponding H2 headings exactly. No mismatches.

---

## Pass 2 — Voice Fidelity

**Score:** 4/5

**Positive example:**
> "I installed Ponytail the way most people install a Claude Code skill they've seen praised a dozen times on X: I didn't read the mechanism, I read the star count."

**Issue (if any):**
> Two paragraphs (Caveman Proxy claim paragraph, Caveman Proxy verdict paragraph) stacked multiple em dashes as a rhythmic crutch, including one construction nearly identical to `anti_patterns.md`'s own bad example ("...because — as you'll see in a moment — the internal spread..."). Both paragraphs have been rewritten to break the chained clauses into separate sentences — fixed post-critique, prior to finalizing this report.

**Action:** None remaining — fix applied directly to `long_draft.md`.

---

## Pass 3 — Argument Build-up / Logical Flow

**Score:** 5/5

**Thesis (as stated in intro):**
Ponytail, Caveman's original skill, and Caveman Proxy are three distinct mechanisms on different channels of the token bill, and once independent benchmarks replace self-reported headlines, the real savings are far smaller and more conditional than the "token saver" label implies — so the right unit is cost-per-successfully-completed-task, not tokens saved.

**Weakest point in the argument:**
The transition into "So should you use Ponytail or Caveman on Claude Code?" leans slightly on an announcement framing ("brings the whole thing back to a practical question") rather than a fully earned callback, though it does tie to a specific prior thread.

**Action:** None — score ≥ 4.

---

## Pass 4 — Section Depth

**Score:** 5/5

**Shallowest section:**
"What do Ponytail and Caveman claim about themselves?" — the most report-like of the eight sections, but it now closes with an added mid-section reframe (each headline is a self-measured ceiling, not an average) rather than deferring all insight to the transition line — resolves iteration 1's finding.

**Action:** None — score ≥ 4.

---

## Pass 5 — Actionability

**Score:** 5/5

**Weakest recommendation (if any):**
> "Establish each one's effect on your own tasks individually first."

— Now immediately cashed out into a concrete protocol in the same section: 15–20 tasks from the reader's own repository, baseline vs. treatment split, 3–4 repetitions, cost-per-successfully-completed-task and test-suite pass rate as the logged metrics, and an explicit adopt/reject decision rule. Resolves iteration 1's 3/5 finding.

**Action:** None — score ≥ 4.

---

## Pass 6 — Audience Specificity

**Score:** 4/5

**Most generic section (if any):**
None major. The draft is saturated with practitioner-specific grounding (real repos, exact model names, exact line-count deltas, licensing boundaries). Optional-only tightening: no first-person anecdote ties the piece to Jose's own DS-lead usage specifically, though this matches the register of the cited reference posts for this content type and audience.

**Action:** None — score ≥ 4.

---

## Overall

| Dimension | Score |
|-----------|-------|
| Voice fidelity | 4/5 |
| Argument flow | 5/5 |
| Section depth | 5/5 |
| Actionability | 5/5 |
| Audience specificity | 4/5 |
| **Average** | **4.6/5** |

---

## Publish Readiness Verdict

### Ready

Structural completeness is all ✓ (the one iteration-1 ✗ is now fixed) and every scored dimension is 4 or 5 — per the deterministic rule, the post is ready to publish.
