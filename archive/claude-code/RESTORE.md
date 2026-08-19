# Restoring Claude Code Runtime

This directory preserves the Claude Code-specific runtime assets removed when the repo migrated to OpenCode as the sole runtime (see issue #52). The portable engine — `AGENTS.md`, `post.yaml`, skill procedures, critic rubrics, style guides, reference posts — was not changed by the migration and needs no restoration.

Use these steps if returning to Claude Code becomes necessary (e.g. for a specific capability OpenCode lacks).

## Steps

1. **Restore settings files:**
   ```
   mkdir -p .claude
   cp archive/claude-code/settings.json .claude/settings.json
   cp archive/claude-code/settings.local.json .claude/settings.local.json
   ```

2. **Restore hooks:**
   ```
   cp -r archive/claude-code/hooks .claude/hooks
   ```
   Re-register them in `.claude/settings.local.json` if the hook registration block was removed (check the `hooks` key in the restored `settings.json`).

3. **Move skills back:**
   ```
   git mv .opencode/skills .claude/skills
   ```

4. **Move agents back and revert frontmatter:**
   ```
   git mv .opencode/agents .claude/agents
   ```
   For each of the three critic files, revert frontmatter to Claude Code format:
   ```yaml
   ---
   name: <agent-name>
   description: "..."
   tools: Read, Glob, Grep
   model: sonnet
   ---
   ```
   (Remove `mode: subagent` and `permission:` block, or keep them — Claude Code ignores unrecognized frontmatter fields, so this step is optional for functionality but recommended for clarity.)

5. **Revert skill frontmatter** in each `.claude/skills/*/SKILL.md`:
   - Restore `compatibility: "Claude Code"`
   - Restore `argument-hint` field
   - Restore `$ARGUMENTS` references in procedure bodies where `postFolder` was substituted

6. **Restore Claude-specific procedure language** in skill bodies:
   - Slash-command references (`/draft`, `/seo`, etc.) in place of "the draft skill", "the seo skill"
   - `Write`/`Edit` tool names in place of "write to file" / "append to file"
   - "Use the Agent tool to spawn" in place of "invoke a subagent"

7. **Extract rules back out of `AGENTS.md`:**
   Recreate `.claude/rules/core-rules.md`, `.claude/rules/maintenance-rules.md`, `.claude/rules/output-limits.md` from the "Rules" section of `AGENTS.md`. Restore Claude-specific language (token cap → "~8192 tokens", `Write`/`Edit` tool names, the `code.claude.com` memory docs reference for path-scoped rules).

8. **Recreate `CLAUDE.md`:**
   ```
   See @AGENTS.md
   ```

9. **Update `.gitignore`:**
   Add back `.claude/settings.local.json`. Remove `archive/claude-code/settings.local.json` if it was added during the migration.

10. **Restore the research skill's MCP dependencies** if needed (context-mode, Chrome DevTools MCP) — check the pre-migration version of `research/SKILL.md` in git history (`git log --all -- '.claude/skills/research/SKILL.md'`) for the exact procedure.

## What does not need restoration

These were never changed by the migration:

- `post.yaml` schema and stage-completion contract
- Skill procedure bodies' substantive logic (only runtime-specific language was rewritten)
- Critic rubrics, scoring passes, and verdict logic
- Style guides, templates, reference posts
- `posts/<slug>/` folder contents and artifacts
