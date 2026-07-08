# Review Report: Why "It Worked Once" Is Not Evidence

**Post:** `claude-code-evals-part-1-why-it-worked-once-is-not-evidence`
**Draft reviewed:** `long_draft.md` (iteration 3 — new structure)
**Reviewed:** 2026-07-07

---

## Panel Consensus

| Critic | Covers | Preliminary verdict |
|--------|--------|---------------------|
| Voice & Audience | Voice fidelity, Audience specificity | Ready |
| Structure & Depth | Structural completeness, Section depth | Ready |
| Impact & Argument | Argument build-up, Actionability | Revise first |

**Consensus:** Split 2-1 → Revise first. Deterministic rule triggered: actionability 3/5 requires at least one revision before publish.

---

## Pass 1 — Structural Completeness

| Element | Status | Note |
|---------|--------|------|
| Intro: anecdote → framing → thesis | ✓ | Personal scene opens; explicit thesis before first H2 |
| Subtitle/deck line | ✓ | Deck line present under H1 |
| Preview section (named ##) | ✓ | `## What will we cover in this post?` with 5 lean one-liner bullets |
| Main body H2 sections (5–8) | ✓ | 6 content H2s, all argument-tied |
| Closing thoughts (named ##) | ✓ | `## Closing thoughts` — synthesis of post argument before series pointer |
| Now, I want to hear from you (##) | ~ | Present and distinct, but question 3 is structured as a scaffolded prompt (show an example + ask theirs) — slightly overlong for a CTA section |

**ToC sync check:** All 5 bold phrases match their corresponding H2 headings exactly.

---

## Pass 2 — Voice Fidelity

**Score:** 4/5

**Positive example:**
> "I have watched a recommendation model degrade for six weeks before anyone noticed. The code was unchanged. The pipeline was running."

**Issue (minor):**
> "What will we cover in this post?" — five-bullet preview block exceeds the one-sentence-of-framing maximum (anti-pattern: Excessive preview text). The ToC is a required structural element; the violation is a calibration issue, not a register failure.

**Action:** None — score ≥ 4.

---

## Pass 3 — Argument Build-up / Logical Flow

**Score:** 4/5

**Thesis:**
One successful Claude Code run proves nothing about reliability — the same verification discipline that mature engineering disciplines take for granted (unit tests, MLOps, experimentation) must be installed as a reflex for agentic workflows.

**Weakest point:**
"What will we cover in this post?" stalls momentum between the hook and the first content section — the reader just had the problem framed compellingly; the ToC interrupts rather than propels. Minor; ToC is a required element.

**Action:** None — score ≥ 4.

---

## Pass 4 — Section Depth

**Score:** 4/5

**Shallowest section:**
"What do unit tests, MLOps, and experimentation have in common?" — unit test and experimentation sub-sections describe familiar practices without a reframe specific to agents; the synthesis closes where the reader was already.

**Action:** None — score ≥ 4.

---

## Pass 5 — Actionability

**Score:** 3/5

**Weakest recommendation:**
> "Pick one workflow you already rely on. Write three bullet points describing what a correct run looks like — not what it outputs, but what makes the output correct. That is your eval seed." — directionally useful but stops short of showing how to derive the criteria. A tech lead who has never written an eval does not know whether to start from failure modes seen, the workflow's stated purpose, or a checklist of output properties. The PR-review example is the most concrete thing in the section but is buried as an illustration rather than the lead recommendation.

**Action:** Reframe the closing guidance as a concrete three-step seed exercise: (1) name one failure you have already seen, (2) invert it into a pass criterion, (3) write the check mechanism. Lead with the PR-review example as the worked model, not a buried illustration.

---

## Pass 6 — Audience Specificity

**Score:** 5/5

**Most generic section:** None. Every worked example (recommendation model drift, experiment design document, PR-review eval seed, Haiku vs Sonnet cost routing) is drawn from DS/ML practitioner contexts.

**Action:** None — score ≥ 4.

---

## Overall

| Dimension | Score |
|-----------|-------|
| Voice fidelity | 4/5 |
| Argument flow | 4/5 |
| Section depth | 4/5 |
| Actionability | 3/5 |
| Audience specificity | 5/5 |
| **Average** | **4.2/5** |

---

## Publish Readiness Verdict

### Revise first

Three review iterations complete. Four of five scored dimensions at 4/5 or better (average 4.2/5). Actionability remains at 3/5 after 3 passes — the engagement section's eval-seed guidance tells the reader *what* to produce but not *how* to derive it, and the PR-review worked example is buried rather than leading. One targeted rewrite of the closing section resolves this.

### Priority actions

1. **Reframe the eval-seed guidance in the closing section as a three-step exercise.** Lead with the PR-review example as a worked model, then give the three steps: (1) name one failure you have already seen, (2) invert it into a pass criterion, (3) write the check mechanism. This gives a tech lead who has never written an eval a concrete starting point, not just a reflection prompt.
