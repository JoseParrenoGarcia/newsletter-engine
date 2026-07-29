## 2026-07-29 — /review

**Stuck / had to adapt:**
- The Structure critic flagged question-format H2s as a violation of `post_template.md` ("noun-phrase or verb-phrase declarations"). But the `/draft` skill explicitly mandates question-format H2s for SEO discoverability, and `/revise` reinforced them. These two instructions directly contradict each other. Resolution: treated the draft skill rule as the intentional override and documented the conflict in the review report rather than flagging it as a revision target. There is no guidance in the review skill on how to handle instruction conflicts across skills.

**Ambiguous or missing skill instructions:**
- The review skill says to note "H2 format" conflicts in the ToC sync check, but it has no guidance for when a critic's finding conflicts with an upstream skill rule. The synthesiser step should probably include: "If a structural finding conflicts with an explicit rule from `/draft` or another upstream skill, document the conflict and note which rule takes precedence — do not treat it as a revision target without flagging the contradiction."
- The review report template has no field for cross-skill rule conflicts. Added a note inline in the Pass 1 table, which is the best available location but non-standard.

**Assumptions that turned out wrong:**
- Assumed all three critics would return within a similar time window. The Voice critic took nearly twice as long as the others (~98s vs ~55-71s). No consequence since all three were awaited before synthesis, but worth noting for future parallel critic runs.

**Retries / workarounds:**
- None needed. All three critics returned clean results on first run.

---

## 2026-07-29 — /seo

**Stuck / had to adapt:**
- No issues with execution flow. The subagent ran cleanly end-to-end.

**Ambiguous or missing skill instructions:**
- The skill spawns a subagent to do all the work, so the main session has no visibility into intermediate steps. If the subagent had failed partway through, there is no recovery path described in the skill instructions — the main session would just receive an error or partial return with no guidance on what to retry.

**Assumptions that turned out wrong:**
- No wrong assumptions.

**Retries / workarounds:**
- None needed.

---

## 2026-07-29 — /draft

**Stuck / had to adapt:**
- Hit the output token cap mid-execution during the input-reading phase (reading all style guides + reference posts in one pass). The session was cut before the outline was written. Resumed by reading only the closing section of Part 1's draft (for style calibration) rather than the full draft, which was sufficient.
- The `research_brief` artefact pointer in `post.yaml` was null — research stage was not formally run. The skill instruction handles this case (warn + proceed if `research_brief.md` exists), but in this post the sources lived in `notes.md` rather than a `research_brief.md`. Proceeded using notes directly; worked fine but the warn-path logic in the skill is designed for the opposite case (file exists, stage incomplete) not this one (stage incomplete, no file, sources embedded in notes).

**Ambiguous or missing skill instructions:**
- The outline template (`assets/outline_template.md`) uses `<working_title>` and `<word_count_target>` as placeholders but the instruction says "using the rough Table of Contents from `notes.md` as the fixed structure." The notes ToC was detailed enough that the mapping was straightforward, but there is no explicit instruction for cases where the notes ToC is in a non-standard format (ours was a brainstorm appendix rather than a top-level structured ToC).
- The skill says "Pause or proceed" based on standalone vs pipeline mode. No clear signal in context about which mode was active (no `/new-post` orchestrator present, but also no explicit standalone invocation). Assumed standalone, skipped pause since Jose had explicitly said "move end to end."

**Assumptions that turned out wrong:**
- Initially assumed the `research_brief.md` would exist (research stage appeared complete from notes). It did not — research was captured inline in `notes.md`. No consequence for the draft quality since sources were all present in notes, but the post.yaml stage flag for research remained `pending`, which could confuse a future skill guard check.

**Retries / workarounds:**
- After the token cap hit, broke the remaining work into smaller sequential reads rather than parallel reads. Read style guides and reference posts in two separate calls instead of four parallel calls. This avoided a second cap hit.
- The `long_draft_template.md` references `management.md` patterns in its placeholders (e.g. "[management.md Opening Pattern]") — these are stale references for a `series-genai` post. Applied `series-genai.md` rules instead; the template body is generic enough that this caused no issue, but the template placeholders are misleading.
