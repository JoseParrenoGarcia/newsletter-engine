## 2026-06-06 — /draft

No issues encountered.

The /draft skill ran cleanly for this post. No stuck points, ambiguous instructions, or workarounds to report.

---

## 2026-06-06 — /research

No issues encountered.

The /research skill ran cleanly for this post. Chrome DevTools MCP was used for DuckDuckGo searches. No stuck points, ambiguous instructions, or workarounds applied.

---

## 2026-06-06 — /review

**Steps where I got stuck or had to adapt:**
- The `references/decision-log-format.md` path in the skill instructions pointed to the project root, but the actual file lives at `.claude/skills/new-post/references/decision-log-format.md`. Had to search for it with `find`.
- The review loop ran 3 iterations without reaching "Ready". The critics flagged Voice and Audience Specificity as persistent issues despite targeted fixes each iteration — the fixes addressed symptoms per section rather than the root cause (the primary worked example throughout the Build section remains newsletter-centric rather than DS-grounded).

**Ambiguous or missing skill instructions:**
- The `/new-post --from-draft` mode check says "stop if no draft" — but brainstorm + research had already run with no draft yet. There is no clean path for "pipeline partially complete, no draft." Defaulted to running full pipeline, which was correct, but mode detection was ambiguous.
- The review loop instruction says to set `stages.review.status: pending` before each run, but the review skill itself sets it to `complete` at end. On iterations 2 and 3, I had to manually reset. The instruction should clarify that the orchestrator owns the reset, not the review skill.

**Assumptions that turned out wrong:**
- Assumed research subagent would verify community plugin repos via live `ctx_fetch_and_index`. It returned `anthropics/claude-plugins-official` (29.5k stars) — potentially extrapolated from docs patterns rather than verified live. Draft cites it but was not confirmed live.
- Assumed adding DS/ML examples as supplementary sentences (Fix 1, iteration 1) would satisfy audience-specificity critics. It did not — critics correctly identified that `my-writing-tools` still dominates the Build section as the primary worked example.

**Retries, workarounds, improvisation:**
- On the 3-iteration cap (still "Revise first"), stopped and surfaced remaining issues to Jose per pipeline rules rather than auto-applying a 4th round. The persistent Voice/Audience gap requires replacing `my-writing-tools` with a DS-grounded worked example throughout Build — a more invasive change than the fix loop was applying.
