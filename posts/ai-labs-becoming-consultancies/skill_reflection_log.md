## 2026-06-17 — /draft

### Status at hook fire
The skill paused at Step 3 (standalone mode — outline shown, waiting for Jose's confirmation before writing `long_draft.md`). The full draft has not been written yet. The hook fired at the outline stage, not after draft completion.

### Steps where adaptation was needed

**Reference post subagent returned truncated content.** The subagent tasked with reading three reference posts returned partial content for the `claude-code-agent-teams` post (it started mid-article). The content was sufficient for style calibration but the subagent did not flag the truncation — it presented partial content as if complete. Workaround: accepted the partial content for calibration purposes; the missing opening section of that reference post was not critical since the open-source-models post was the primary style anchor.

**Research files subagent could not return all six files verbatim.** Files 3–6 (each 26–40KB) were acknowledged as read but not reproduced inline — the subagent noted they were "available in session" without actually returning the text. This meant the URL extraction step was necessary as a follow-up subagent call to recover all citable sources. The URL extraction subagent worked cleanly.

**No `research_brief.md` exists — skill assumes one does.** The `/draft` skill instructions reference `research_brief.md` as a required input at Step 4 ("map the most relevant source(s) from `research_brief.md`"). For this post, research was marked complete but the artefact is the six raw `.md` files the user dropped in, not a structured `research_brief.md`. The skill has no explicit fallback for this case. Workaround: read the raw research files directly and extracted URLs via a dedicated subagent. The outline and source mapping were built from that extraction. The skill instruction should document this fallback path or require a `research_brief.md` to exist before proceeding.

### Ambiguous or missing skill instructions

- **Standalone mode Step 3 says "show the outline and wait."** It does not specify what format to present the outline in — whether to paste it inline or reference the file path. Chose to summarise the section structure inline with a flag, which felt right but was an improvisation.
- **The skill says "read every file listed in `reference_posts`"** but does not specify how to handle reference post files that are stubs (the `open-source-models-good-enough.md` file in `reference_posts/` points to the canonical draft rather than containing the post itself). Workaround: read the canonical draft path directly (`posts/open-source-models-good-enough/long_draft_v3.md`).

### Assumptions that held

- The six research files contained sufficient citable URLs to populate the outline without needing any live web fetches.
- `post.yaml` having `research: complete` was an accurate signal — the source material was genuinely research-complete even without a formal `research_brief.md`.

### Nothing else to report for this session fragment — draft not yet written.

## 2026-06-17 — /review

### Steps where adaptation was needed

**Skill invocation happened mid-pipeline, not standalone.** The `/review` skill was invoked as part of a continuous pipeline run (draft → seo → revise → review) rather than as a standalone call after a human review cycle. The skill instructions do not mention this context, but it worked correctly because the inputs (`long_draft.md`, `post.yaml`) were all current.

**`review_report_template.md` had to be read by the main session, not a subagent.** The skill instructions say to write the report using the template, but the template read and the synthesis step were both done in the main session rather than delegated. This was the correct approach — the synthesiser step requires all three critic outputs simultaneously, so it cannot be delegated to a single subagent. The skill instructions are implicit about this but do not state it explicitly.

**Socket error on first revise subagent.** The revise subagent hit a socket connection error on its first invocation (`API Error: The socket connection was closed unexpectedly`). The subagent returned 0 tokens and 3 tool uses, suggesting it failed mid-read. Retried immediately with the same prompt — the second invocation succeeded fully. No data was lost.

### Ambiguous or missing skill instructions

- **Synthesiser step is not a subagent.** The skill says "spawn all 3 agents in parallel" for critics, but the synthesis, verdict logic, and report writing are clearly main-session work. The skill instructions do not explicitly state this separation, which could cause a less careful executor to try to delegate synthesis to a fourth subagent and lose the critic outputs.
- **`review_report_template.md` path is relative.** The skill references `assets/review_report_template.md` without a fully resolved path. The skill's base directory is known from the hook context, but the instructions should use an absolute path or explicitly state the base is `.claude/skills/review/`.
- **Panel verdict logic for a 2/5 actionability score.** The verdict rules say "Major rework needed" if any scored dimension is ≤ 2. The actionability score was 2/5, which technically triggers Major rework. However, the issue was isolated to one section rather than systemic. The instructions have no nuance rule for isolated vs systemic failures at the ≤ 2 threshold. Chose to override to "Revise first" with an explicit note in the report — this felt like the right editorial call, but the instructions should clarify whether a single-dimension ≤ 2 score always forces Major rework or whether isolation matters.

### Assumptions that held

- All three critic agents returned complete outputs without truncation — the post folder was clean and all required files were present.
- The structure-critic correctly identified the subtitle gap (✗) without being told about it — it read the draft independently and caught it.

### No retries required beyond the socket error on revise.
