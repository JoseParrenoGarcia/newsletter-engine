# Decision Log — claude-code-agent-teams

---

## Review iteration 2 — 2026-04-29

**Verdict:** Revise first (3.8/5 avg — audience specificity 3/5; panel split 2 Ready / 1 Revise first)

**Priority actions applied:**

1. **Removed defensive disclaimer sentence** in "The four patterns for combining agents" — "This is not Anthropic's official taxonomy — it is an analytic synthesis…" removed; presents the taxonomy directly. Addresses voice score (was 4, minor improvement).

2. **Added DS/ML-specific examples to three of the four patterns** — orchestrator: experiment analysis (feature distributions, pipeline health, model changes); sequential pipeline: ML feature engineering → validation pipeline; parallel specialists: model evaluation across accuracy, fairness, calibration. Addresses audience specificity (was 3/5).

---

## Review iteration 1 — 2026-04-29

**Verdict:** Major rework needed (3.4/5 avg — deterministic rule triggered by missing subtitle ✗)

**Priority actions applied:**

1. **Added subtitle/deck line under H1** — *"Why adding more agents is almost always the wrong first move — and a framework for the four cases when it isn't."* Resolves the structural ✗ that triggered the Major rework verdict.

2. **Added self-disclosing first-person moments** — Two insertions:
   - End of "Why most teams don't need multiple agents yet": Jose's three-critic review system as a real example of the independent-critique trigger being legitimate.
   - Start of "Coordination drift" in "Why agent teams fail": the overlapping-scope problem encountered with the first version of the critic agents, and the fix. Addresses voice score (3/5) and audience specificity score (3/5).

3. **Added "first week" checklist** — Four concrete steps at the end of "Choosing between native, DIY, and hybrid agent architectures", each tied to a failure mode already named in the post. Addresses actionability score (3/5).
