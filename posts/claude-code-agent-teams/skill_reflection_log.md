## 2026-04-29 — /promote

No issues encountered.

Note: `/promote` did not actually run on this post during this session. The hook appears to have fired based on folder creation alone. At session end, the post was at folder-initialisation stage only — no brainstorm, research, draft, or promote had been executed.

## 2026-04-29 — /promote

- **No issues encountered.** The promote skill ran cleanly. Section selection, launch post, and three deep-dives all produced in one pass. Title sourced from `seo_brief.md` curiosity-gap variant as specified. `post.yaml` updated without incident.
- **One observation:** the skill instructions say to create a `promotion/` directory if it doesn't exist, then write `promotion_posts.md` there. The existing convention in the repo is to write `promotion_posts.md` directly in the post folder (no subdirectory), which is also what `post.yaml → artefacts.promotion_posts` references. The skill instructions and the repo convention are inconsistent. I followed the repo convention (flat in post folder). Worth aligning the skill instructions with the actual artefact path.

---

## 2026-04-29 — /research

- **WebSearch unavailable**: WebSearch returned API errors throughout the subagent run. The skill instructions say to fill gaps via search, but no search was possible. The subagent handled this gracefully by relying solely on the 13 URLs already in notes.md — all ToC sections happened to be covered, so no gaps remained. If the notes had been thinner, this would have been a real problem. The skill instructions have no fallback guidance for when WebSearch is unavailable.
- **5 URLs explicitly dropped**: The out-of-scope URLs (OpenAI, Google ADK, MCP, A2A, Microsoft) were dropped cleanly because `topics_to_exclude` in post.yaml was explicit. This worked well — the stage guard on topics_to_exclude is doing real filtering work and is worth keeping.
- **No other issues**: Validation, enrichment, grouping by ToC section, and post.yaml update all ran as expected.
