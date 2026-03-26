# Maintenance Rules

Apply these after any significant change: new directory added, new agent created, milestone completed, new MCP or skill required.

## Update `.claude/CLAUDE.md`
- Add new directories to the Repo Index table
- Add new skills to the Available Skills table (with the milestone they're introduced in)
- Update the **Active milestone** line at the top
- Add new MCPs or plugins to the Required MCPs table

## Adding new rules files

Rules without `paths` frontmatter load unconditionally every session (same as CLAUDE.md). This is correct for global guardrails like `core-rules.md`.

Use **path-scoped rules** when a rule is only relevant in a specific context — not for everything. Add YAML frontmatter with a `paths` field:

```yaml
---
paths:
  - "posts/**/*.md"
  - "posts/**/*.yaml"
---

# Drafting Rules
- Check post.yaml stage flags before writing any artefact
- ...
```

When to add a new scoped rules file in this project:
- Agent-specific behaviour that only matters inside `posts/` (drafting, research, promotion guardrails)
- Style editing rules that only apply when touching `style_guide/`
- Instruction format rules that only apply when editing files in `agents/`

Global rules (no `paths`) → `.claude/rules/core-rules.md` or a new global file
Context-specific rules (with `paths`) → new file named after the context, e.g. `drafting-rules.md`

Reference: https://code.claude.com/docs/en/memory#path-specific-rules

---

## Update `README.md`
- Keep the repo tree structure current
- Update the pipeline mermaid diagram to reflect active skills in the current milestone
- Update the Requirements table if a new MCP, plugin, or Claude Code skill is needed
