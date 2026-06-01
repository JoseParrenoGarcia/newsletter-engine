## 2026-06-01 — /promote

No issues encountered during the /promote stage specifically.

---

## 2026-06-01 — Full pipeline (brainstorm → promote)

### ctx_execute_file variable name error

When using `ctx_execute_file` to extract sections from reference posts, I initially wrote `open(FILE_PATH)` in the Python code. The tool uses `FILE_CONTENT` as the pre-loaded variable — `FILE_PATH` is not defined in the sandbox. Had to retry all three reference post reads with the correct variable name. The tool description says "The file is read into a FILE_CONTENT variable" — this is correct but easy to miss on first use.

**Suggestion:** Add a one-line code example to the ctx_execute_file tool description showing `FILE_CONTENT.split('\n')` to make the variable name immediately visible.

---

### Output token limit hit mid-draft

The draft step hit the output token limit partway through writing `long_draft.md`. The user had to prompt a resume. This is not a skill instruction failure, but it did break the pipeline flow and required the user to intervene mid-stage.

**Suggestion:** For the /draft skill, consider breaking the write into outline first (confirmed), then draft in sections rather than one large write — or at minimum flag in the skill that long drafts may require a resume prompt.

---

### brainstorm assets directory not found on first attempt

When looking for `assets/notes_brainstorm_template.md`, I tried `.claude/skills/assets/` (which does not exist) before running `find` to locate the correct path at `.claude/skills/brainstorm/assets/notes_brainstorm_template.md`. The skill instruction references `assets/notes_brainstorm_template.md` using a relative path from the skill's base directory, but when executing from the repo root the full path must be inferred.

**Suggestion:** The skill instruction could state the path relative to the repo root explicitly: `.claude/skills/brainstorm/assets/notes_brainstorm_template.md`.

---

### new-post Mode A conflict handling: no branch for brainstorm-complete, no draft

The new-post skill's conflict detection has two branches: (a) draft exists → offer Mode B, (b) no draft → ask about different slug or run brainstorm. There is no branch for the case where the folder exists, brainstorm is already complete, and no draft exists — which is exactly the state we were in. The skill would have asked an unnecessary clarification question. I skipped the conflict handling and proceeded directly with the full pipeline, which was correct but not explicitly covered by the instructions.

**Suggestion:** Add a third branch: "folder exists + brainstorm complete + no draft → confirm pipeline start from research, proceed without asking."

---

### series-genai opening rule conflicts with reference post practice

The `series-genai.md` style guide says: open with a thesis or contrarian reframe, not a personal anecdote. All four reference posts in the category open with a brief personal scene ("This week, I walked my team through...", "The first time I saw Claude spawn a subagent..."). The skill instruction for /draft says to follow the type-specific style guide's opening rule, which would override the reference post pattern.

I resolved this by opening with a contrarian framing ("For months, I had been selecting 'high' for thinking effort in Claude Code without being sure it was doing anything useful") that reads as a thesis reframe but contains the personal discovery. This satisfies both — it is not a scene-setting anecdote, but it is grounded in personal experience.

**Suggestion:** Clarify whether the series-genai opening rule is intended to prohibit all personal grounding, or only scene-setting anecdotes as a primary hook. If the reference posts represent the actual target style, the style guide rule should be updated to reflect that.

---

### post.yaml edit conflicts after subagent updates

After the revise subagent updated `post.yaml`, attempting to edit the file from the main session failed with "File has been modified since read." This happened once (review stage) and required a re-read before editing. The pattern is predictable: any subagent that writes to `post.yaml` will cause this conflict for subsequent main-session edits.

**Suggestion:** Where the pipeline involves subagents writing to `post.yaml`, the orchestration layer (new-post) should always re-read `post.yaml` before attempting any edit following a subagent stage.
