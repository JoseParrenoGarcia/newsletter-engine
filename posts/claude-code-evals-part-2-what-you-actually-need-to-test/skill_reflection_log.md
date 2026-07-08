## 2026-07-08 — /review

**Steps where I got stuck or had to adapt:**

- The review skill instruction says to apply the verdict logic deterministically: "Any structural element is ✗ → Major rework needed." The subtitle/deck line was ✗, so the deterministic rule overrode the unanimous "Revise first" from all three critics. The skill correctly handles this, but there is a minor ambiguity: the instruction says *prefix* the Priority actions with a note only "if the verdict is triggered solely by a content-signal failure." The subtitle ✗ is a structural element, not a content-signal failure, so no prefix note was needed — but the condition wording is slightly confusing when a structural ✗ is the only trigger. No adaptation required; just worth flagging for clarity.

**Skill instructions that were ambiguous:**

- The ToC sync check in the synthesizer step says "verify each bold phrase matches its corresponding H2 exactly." With 9 bullet points and 9 H2s, there is no instruction for how to map them when the correspondence is not positional (e.g., if bullets are reordered relative to H2s). In this post the order matched exactly, so no issue arose — but the instruction would benefit from a note that the check is positional unless the bullet explicitly names a different section.

**Assumptions that turned out to be wrong:**

- None — all three critics returned structured output in the expected format, all scores were explicit, and the verdict logic applied cleanly.

**Retries, workarounds, improvisation:**

- None. All three critics ran in parallel and completed without error. The synthesizer step was straightforward.

---

## 2026-07-08 — /seo

No issues encountered. The SEO skill ran cleanly via subagent. All assessment areas evaluated, seo_brief.md written, post.yaml updated. The subagent correctly identified the answer-zone citation issue as the highest-impact Quick Win and scored AI discoverability accurately.

---

## 2026-07-08 — /draft

**Steps where I got stuck or had to adapt:**

- The post.yaml was a blank template with no metadata populated. The skill instructions assume `post.yaml` contains content (thesis, audience, series position, target reading time) from a prior brainstorm stage. None of it existed. I inferred all values from `notes.md` and populated the file myself — this worked, but the skill instructions do not mention this fallback path.
- `target_reading_time_minutes` was null. The skill says to ask Jose before proceeding. Jose had already said "happy for you to progress end to end without input", so I inferred 12 minutes from the notes (which described the post as a "full map" of nine surfaces) rather than interrupting. The skill instruction and the user's explicit autonomous-mode request were in tension — the skill won if read literally, but that would have been unhelpful.
- `stages.brainstorm.status` and `stages.research.status` were both `pending` in post.yaml, which would normally trigger the precondition stop. The notes were clearly complete and Jose confirmed they were ready. I proceeded and marked both stages complete retroactively in post.yaml.

**Skill instructions that were ambiguous or missing:**

- The skill says "Check pre-conditions — if `stages.brainstorm.status` is not `complete`, stop." There is no instruction for the case where the notes are complete but post.yaml was never updated after brainstorm. A note like "if notes.md exists and appears complete, proceed and mark stages retroactively" would make this less ambiguous.
- The skill says "if `target_reading_time_minutes` is null, ask Jose." No guidance for pipeline/autonomous mode where Jose has explicitly said not to interrupt. A fallback like "in autonomous mode, infer from notes.md scope and proceed" would help.
- No instruction covers a blank post.yaml. The skill assumes brainstorm already populated the key fields. When it has not, the draft skill has to make its own inferences about thesis, audience, and series position — with no instruction that this is acceptable or how to document it.

**Assumptions that turned out to be wrong:**

- I assumed `series-genai.md` would be under `style_guide/types/`. It was. But the first `ls style_guide/` call showed `style_guide/series-genai.md` at the root, which was a red herring from the output format — the file was actually at `style_guide/types/series-genai.md`.

**Retries, workarounds, improvisation:**

- Hit the output token limit twice during the research/input-gathering phase. Each time I resumed mid-step without restarting the skill. The skill has no instruction for handling context interruptions — I self-recovered by picking up where the cut happened.
- Two `ctx_batch_execute` calls were needed to gather all inputs because the first hit the limit before fetching all style guides and the Part 1 draft. No instruction covers batching strategy for large input sets; I split by dependency order.
