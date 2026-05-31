# Review Report: Open Source Models Are Good Enough

**Post:** `open-source-models-good-enough`
**Draft reviewed:** `long_draft.md`
**Reviewed:** 2026-05-29

---

## Panel Consensus

| Critic | Covers | Preliminary verdict |
|--------|--------|---------------------|
| Voice & Audience | Voice fidelity, Audience specificity | Revise first |
| Structure & Depth | Structural completeness, Section depth | Revise first |
| Impact & Argument | Argument build-up, Actionability | Ready |

**Consensus:** Split 2-1 — resolved by deterministic rule: structural element ✗ (subtitle deck line missing) overrides the "Ready" from Impact, locking the verdict at Major rework needed per verdict logic.

---

## Pass 1 — Structural Completeness

| Element | Status | Note |
|---------|--------|------|
| Intro: anecdote → framing → thesis | ~ | Opens with a strong inversion ("It is also the wrong question") but lacks a specific personal anecdote or situated scene |
| Subtitle/deck line | ✗ | No italicised deck line immediately under the H1; body prose begins directly |
| Preview section (named ##) | ✓ | "## What will we cover in this post?" present with bold-label bullet list |
| Main body H2 sections (5–8) | ✓ | Six H2 content sections plus Closing and Reader questions |
| Closing thoughts (named ##) | ✓ | "## Closing thoughts" present with synthesis prose |
| Now, I want to hear from you (##) | ~ | Present with 3 questions; third question ("What is holding your team back?") is generic and not tied to the post's task taxonomy or Vegetius framing |

---

## Pass 2 — Voice Fidelity

**Score:** 4/5

**Positive example:**
> "Open source models are behind frontier ones. That is the correct answer. It is also the wrong question."

**Issue:**
> "None of that changes the underlying argument." — bold used as rhetorical emphasis, not to mark a concept being defined or a key finding; violates anti_patterns.md rule: "Bold marks a concept being defined or a key finding — not sentiment."

**Action:** Remove bold from the three closing emphasis sentences; rewrite as plain declarative statements.

---

## Pass 3 — Argument Build-up / Logical Flow

**Score:** 4/5

**Thesis (as stated in intro):**
Open source models lag frontier models by 6–12 months, but that gap is irrelevant for most production tasks; the pragmatic move is to match model to task and start experimenting now.

**Weakest point in the argument:**
"In times of peace, prepare for war" — the vendor-concentration sub-point fully duplicates the argument already made in "The real cost of defaulting to frontier models"; the section restates rather than escalates.

**Action:** Collapse the vendor-concentration sub-point in the Vegetius section; replace with the organisational readiness angle (teams who have already evaluated open source models will adapt fastest when pressure comes).

---

## Pass 4 — Section Depth

**Score:** 4/5

**Shallowest section:**
"In times of peace, prepare for war" — makes three valid points (low learning cost, narrowing gap, vendor concentration) but all three were established in earlier sections; the Vegetius frame repackages prior argument without adding a new insight unique to this section.

**Action:** Add one observation that is only possible in this section — e.g., what specific organisational capability atrophies when teams never build evaluation muscle, or what the internal political cost of being caught unprepared looks like.

---

## Pass 5 — Actionability

**Score:** 4/5

**Weakest recommendation:**
> "build an eval" (Step 3) — specifies what to produce ("a domain-specific rubric with human review of 50 outputs") but not how to structure the rubric; leans on the Hamel Husain external link rather than giving one concrete example dimension.

**Action:** Add one inline example rubric dimension — e.g., "Score each output 1–3 on factual accuracy, format compliance, and no hallucination; flag any output scoring 1 on accuracy as a fail."

---

## Pass 6 — Audience Specificity

**Score:** 3/5

**Most generic section:**
"In times of peace, prepare for war" — all three vendor-risk arguments (low learning cost, narrowing gap, vendor concentration risk) apply equally to a frontend team, a payments team, or a retail ops team; no DS/ML-specific grounding (batch inference pipelines, feature store dependencies, model-serving cost examples, or named practitioner community references beyond Hamel Husain in Step 3).

**Action:** Add one concrete DS/ML anchor per argument in the Vegetius section — for example, reference a batch inference pipeline or model-serving stack where vendor lock-in cost is most acute; and replace "engineers, PMs, and technical managers" in the intro with explicit reference to DS/ML leads or ML platform teams.

---

## Overall

| Dimension | Score |
|-----------|-------|
| Voice fidelity | 4/5 |
| Argument flow | 4/5 |
| Section depth | 4/5 |
| Actionability | 4/5 |
| Audience specificity | 3/5 |
| **Average** | **3.8/5** |

---

## Publish Readiness Verdict

### Major rework needed

The missing subtitle deck line (structural ✗) triggers the deterministic rule, and a scored dimension (audience specificity, 3/5) confirms the call; both are concentrated in a single section — the Vegetius argument — so the rework is narrow but real.

### Priority actions

1. **Add the subtitle deck line** immediately under the H1 — one sentence carrying the SEO signal and the click hook (the recommended Contrarian title variant from `seo_brief.md` provides a ready subtitle).
2. **Rewrite the "In times of peace" section** to add DS/ML-specific grounding (one concrete anchor per argument) and replace the duplicated vendor-concentration point with the organisational readiness angle.
3. **Replace the generic third reader question** with one that ties back to the task taxonomy or the experiment steps — e.g., "Have you run an evaluation on an open source model for a specific task type? What did you learn?"
