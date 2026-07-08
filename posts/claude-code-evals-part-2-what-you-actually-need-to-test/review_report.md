# Review Report: What you actually need to test — Claude Code evals, Part 2

**Post:** `claude-code-evals-part-2-what-you-actually-need-to-test`
**Draft reviewed:** `long_draft.md`
**Reviewed:** 2026-07-08

---

## Panel Consensus

| Critic | Covers | Preliminary verdict |
|--------|--------|---------------------|
| Voice & Audience | Voice fidelity, Audience specificity | Revise first |
| Structure & Depth | Structural completeness, Section depth | Revise first |
| Impact & Argument | Argument build-up, Actionability | Revise first |

**Consensus:** Unanimous: Revise first (all three critics) — overridden to **Major rework needed** by deterministic rule: subtitle/deck line is ✗ (a missing structural element).

---

## Pass 1 — Structural Completeness

| Element | Status | Note |
|---------|--------|------|
| Intro: anecdote → framing → thesis | ~ | Opens with the running-example continuation (A/B test passed); thesis present before first H2; but no first-person anchoring moment — series-genai rules permit this, though it leaves the intro slightly thin |
| Subtitle/deck line | ✗ | No italicised deck line under H1; the block below the title is the series navigation box, not a subtitle |
| Preview section (named ##) | ✓ | "What will we cover in this post?" present with 9 bold-labelled bullets, all matching H2s exactly |
| Main body H2 sections (5–8) | ✓ | 9 content H2s, all in question format, argument builds across surfaces |
| Closing thoughts (named ##) | ~ | "Key takeaways from Part 2" is a numbered list recap; no synthesis prose; no named "Closing thoughts" or "Final thoughts" section — the bridging paragraph before the series link partially fills this role but is not a named section |
| Now, I want to hear from you (##) | ✓ | Present with three specific, argument-tied questions |

**ToC sync:** All 9 bold phrases in the preview section match their corresponding H2 headings exactly. ✓

---

## Pass 2 — Voice Fidelity

**Score:** 3/5

**Positive example:**
> "A skill that reaches the right answer in twelve tool calls when four were sufficient is not broken — but it is expensive and unpredictable."

**Issue:**
> "The integration checks are the ones most teams skip. The subagent ran. The main agent ran. Neither log shows an obvious error." — Technically clean and rhythmically good, but entirely impersonal. The whole draft is written from analytical distance. Not one sentence grounds a claim in Jose's own experience as a DS lead running Claude Code workflows. The voice guide requires first-person anchoring ("I've seen this", "In my team") as a core register signal. Its complete absence across ~5,000 words pulls the score below 4.

**Action:** Add at least two first-person anchors grounding specific claims in lived experience — e.g., a real instance of tool-use failure discovered in Jose's own workflow, or a routing decision made after running a cost/latency comparison.

---

## Pass 3 — Argument Build-up / Logical Flow

**Score:** 4/5

**Thesis (as stated in intro):**
The final document is one surface out of nine — and testing only the output misses the majority of real Claude Code eval failure modes.

**Weakest point in the argument:**
"How do you test a trajectory, not just an outcome?" — The section is real but underdeveloped. The conceptual distinction from tool-use evals ("specific calls happened" vs "overall path made sense") is stated but not fully earned — both sections argue that process matters beyond output. The trajectory section needs to lead with what it uniquely catches that tool-use evals cannot.

**Action:** Open the trajectory section with the two failure modes only trajectory evals catch — efficiency-as-fragility and path-constrains-correctness — before restating the abstract distinction; make the argumentative step feel earned, not incremental.

---

## Pass 4 — Section Depth

**Score:** 4/5

**Shallowest section:**
"How do you test a trajectory, not just an outcome?" — Names the concept and gives a YAML sketch, but stalls at describing what deviation looks like rather than providing a frame for deciding when variance is acceptable vs. a signal worth acting on. The total-tool-call-bound paragraph gestures at cost without landing a concrete threshold heuristic.

**Action:** Add a one-paragraph decision frame for trajectory tolerance — a lightweight rule distinguishing acceptable variance from variance that signals fragility — so the reader leaves with a usable criterion, not just an observation.

---

## Pass 5 — Actionability

**Score:** 3/5

**Weakest recommendation:**
> "The right calibration is to run automated grading on everything and human review on the subset of outputs where automated confidence is lowest, or where the downstream consequences of failure are highest." — Correctly directional, but too vague to act on: no signal for how to identify "automated confidence is lowest," no example of how to triage outputs into the human-review queue, no guidance on realistic human-review volume or cadence.

**Action:** Replace the calibration statement with a concrete decision rule — e.g., "Flag any run where model-graded checks disagree with deterministic checks, or where pass rate on model-graded checks drops below your baseline; queue those for human review. For high-consequence outputs, set a fixed random-sample quota (e.g., 10% per week) regardless of automated pass rate."

---

## Pass 6 — Audience Specificity

**Score:** 4/5

**Most generic section:**
"Why do cost and latency deserve their own eval surface?" — content is correct and grounded in the A/B test example, but framed from a neutral observer position. No DS-lead-specific cost pressure, no reference to Jose's own experience with volume-driven cost decisions on a DS team.

**Action:** None — score ≥ 4, but adding one DS-lead-specific observation (e.g., a real routing decision, cost impact at team scale) would push this to 5.

---

## Overall

| Dimension | Score |
|-----------|-------|
| Voice fidelity | 3/5 |
| Argument flow | 4/5 |
| Section depth | 4/5 |
| Actionability | 3/5 |
| Audience specificity | 4/5 |
| **Average** | **3.6/5** |

---

## Publish Readiness Verdict

### Major rework needed

Triggered by ✗ structural element (missing subtitle/deck line) plus two scored dimensions at 3 (voice fidelity and actionability) — all three are targeted fixes requiring no structural rewriting.

### Priority actions

1. **Add a subtitle/deck line under the H1.** One italicised sentence directly under `# What you actually need to test — Claude Code evals, Part 2` summarising the post's core argument. Example: *"The A/B test document passed every output check. Here are the eight surfaces that went untested."* This resolves the ✗ structural element.

2. **Add two first-person anchors.** Ground at least two claims in Jose's own experience as a DS lead — one in the tool-use or trajectory section (a real failure discovered when inspecting a transcript), one in the cost/latency section (a real routing decision made after running a comparison). This lifts voice fidelity from 3 to 4+.

3. **Sharpen the human-usefulness calibration guidance and the trajectory decision frame.** Replace the vague calibration statement in the human-usefulness section with a concrete triage rule (see Pass 5 action above). In the trajectory section, open with what it uniquely catches vs. tool-use evals, then add a one-paragraph decision frame for when trajectory variance is acceptable vs. a signal to act on (see Pass 3 and Pass 4 actions above). These two edits together lift actionability from 3 to 4+.
