## 2026-07-07 — /research

**Connection drop mid-response:** The research subagent was spawned via `Agent` tool and the connection closed mid-response before it returned. Used `SendMessage` to resume the same agent by ID. The agent had already begun (6 tool calls completed) but had not yet written any files. Resume worked cleanly — no data loss, no duplicate work.

**No other issues.** All 13 URLs in `notes.md` validated successfully, 2 gap-filling searches succeeded on first attempt, all 8 ToC sections covered without a second pass. `post.yaml` and `research_brief.md` written correctly on first write.
