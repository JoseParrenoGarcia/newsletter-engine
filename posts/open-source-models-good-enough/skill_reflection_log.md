## 2026-06-01 — /research

**Context: skill updated mid-session to replace WebSearch with Chrome DevTools, then run as a live test**

- **Stuck / adapted:** First subagent spawn failed immediately with a socket connection error. No change to the prompt — simply retried and it succeeded. No pattern to diagnose; appeared transient.

- **Ambiguous instruction:** The updated Step 5 tells the subagent to call `new_page` to open DuckDuckGo "or navigate if a page is already open." In practice the subagent had to manage page state across multiple searches (one per gap) without explicit guidance on whether to reuse the same tab or open a new one each time. The subagent handled it correctly but the instruction could be more explicit: reuse the existing DDG tab by filling the search box again rather than opening a new page per query.

- **Wrong assumption:** The original skill assumed `notes.md` would contain URLs to validate (Step 2–3). For this post, notes.md had zero URLs — the subagent correctly skipped to Step 4, but the skill's summary template ("X from notes.md, Y found via search") implies URLs in notes.md is the normal case. Worth noting that pure-search runs (0 existing URLs) are equally valid.

- **Workaround applied:** None beyond the retry above. Chrome DevTools search → snapshot → extract → fetch loop worked on first attempt for all 10 sources.

- **Compatibility line:** Updated from `WebSearch and WebFetch` to `ctx_fetch_and_index and Chrome DevTools MCP`. The skill description field in the frontmatter still references `WebSearch` and `WebFetch` keywords — those should be updated so the skill doesn't get mistrigger-blocked if a future linter checks keyword/compatibility alignment.

## 2026-05-31 — /seo

**Context: redo run on a post that already had a completed seo+revise cycle**
This was a deliberate redo to exercise newly added AI discoverability section. The stage guard correctly flagged the existing complete status; the orchestrator bypassed it based on explicit user instruction without asking again (user had already confirmed intent). No issue, but the skill instructions say to "wait for explicit confirmation" — in this case the user's original request was the confirmation. Skill could clarify whether a redo triggered with an argument counts as pre-confirmed.

**New section (AI discoverability) worked correctly on first run**
The new assessment produced a 0/6 score that surfaced a real gap (no question-format H2s) not flagged by the previous seo_brief.md. The subagent correctly read the updated `assessment-processes.md` and populated the section 6 table without any adaptation needed.

**Revise skill customisation required for long_draft_v2.md**
The revise skill as written always overwrites `long_draft.md` and backs up to `long_draft_v1.md`. Since `long_draft_v1.md` already existed (from the first revise pass), the orchestrator customised the subagent prompt to write output to `long_draft_v2.md` instead. This is a pattern the revise skill doesn't formally support — it has no versioning logic beyond the first backup. Skill could accept a `--output` argument or auto-increment the backup suffix.

**Skipped change: NIST link relocation blocked by guardrail**
Section 6 flagged a link inside the answer zone of H2 #1. The revise subagent correctly skipped it because moving the link would require prose restructuring, which the "do not restructure" guardrail prohibits. Correct behaviour — not a bug — but worth noting that the AI discoverability flag for "links in answer zone" will frequently be skippable when the link is embedded in a citation sentence rather than decorative inline text. The assessment process could note this as a low-priority flag in citation-heavy sections.

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
