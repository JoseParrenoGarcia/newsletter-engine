## 2026-05-02 — /research

**Adaptation: user-provided URL not in notes.md**
The NIST CAISI URL (`https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro`) was provided by Jose in the chat, not in `notes.md`. The skill instruction only says to scan `notes.md` for URLs. The orchestrator injected it into the subagent prompt manually. Skill instruction could explicitly handle "URLs provided by user in chat at research invocation time" as an additional input path.

**Ambiguity: pre-research PDF content vs research stage**
Jose had already done substantial pre-research (a PDF with validated facts and interpretations). The brainstorm skill appended this to `notes.md` as a "Pre-Research" section. The research skill has no instruction for how to treat pre-digested research already in `notes.md` — it only looks for URLs. The subagent correctly focused on finding new sources for gaps, but the distinction between "context notes" and "URL sources to validate" in `notes.md` is not formally defined in the skill.

**No issues with gap-filling or source variety rules.**
The 2-per-domain rule and 10-source cap worked cleanly. All 10 slots were filled without hitting domain conflicts.

## 2026-05-02 — /draft

**Hook fired before draft was written**
The stop hook fired at outline stage, before Jose confirmed and before `long_draft.md` was written. The skill is mid-execution (waiting for outline confirmation in standalone mode). The reflection is being written now but the draft itself has not yet been produced. The hook detects skill invocation end, not logical completion — this creates a false-positive fire on interactive pauses.

**Adaptation: context-mode tools used instead of direct file reads**
The skill instruction says "Read in full" for post.yaml, notes.md, research_brief.md, style guides, and reference posts. With 12 files totalling ~109KB, direct reads would have flooded the context window. Used `ctx_batch_execute` to index all files and `ctx_search` to retrieve relevant sections. This worked correctly but is an adaptation not described in the skill instructions.

**Ambiguity: standalone mode pause wording**
The skill says "Show the outline to Jose" in standalone mode. The outline is 60+ lines — displaying it inline as prose is unwieldy. Opted to present a structured summary with section titles and key angles rather than the raw file content. The raw file is written to disk; the inline summary is what Jose reviews. Skill could clarify whether to show the raw outline or a human-readable summary.

**No issues with source mapping, word count calculation, or style guide application.**
