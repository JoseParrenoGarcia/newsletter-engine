# Notes

---

## Brainstorm Summary

This post is a practical deep-dive into Claude Code skills for practitioners who already know what skills are and want to go deeper. The angle is not "here's how to build your first skill" — it is "here's what the docs don't tell you." The working thesis is that skills are a design pattern, not just a feature, and that the real power lives in non-obvious places: the anatomy of a well-structured skill, the hidden levers in frontmatter and file layout, and the design principles that separate reliable skills from fragile ones.

The post sits thematically alongside two previous posts — one on Claude Code memory, one on Claude Code rules — but stands alone and does not require the reader to have read either. The reader is a technical practitioner (developer, data scientist, engineer) who has encountered skills and wants to level up. The post explicitly excludes data science-specific use cases, which are earmarked for a separate short-form post.

The structure follows the same pattern as the reference posts: open with the problem or the gap (the docs give you the basics, but leave the interesting parts undocumented), build through progressively deeper layers, and close with design principles and a reflective takeaway. The "hidden gems" and "advanced tricks" sections are the heart of the post — the anatomy section sets up the vocabulary needed to appreciate them.

Two open research questions need to be resolved before drafting: whether the `allowed-tools` experimental field behaves as expected in practice, and whether the observed model selection behaviour inside skills (Haiku vs Opus routing) is documented anywhere or purely observed. The agentskills.io open specification is also worth checking for cross-platform design nuances that could add texture.

The post uses a solid set of primary sources (official Anthropic docs, the skills announcement blog posts, the Anthropic skills GitHub repo, and the agentskills.io specification) gathered during brainstorm, which should make the research stage relatively focused.

## Rough Table of Contents

- **Skills in one minute (and why they exist)** — What skills are, the problem they solve (repeatability, consistency), and where they sit relative to memory, rules, and hooks. Sets up vocabulary for the rest of the post.
- **The mental model most people miss** — Skills as layered systems (metadata → instructions → resources → execution), not flat prompts. The shift from prompting to designing behaviour.
- **Anatomy of a skill (beyond the obvious)** — SKILL.md as a playbook, frontmatter fields (required, optional, hidden, experimental), and where real power lives: `scripts/`, `references/`, `assets/`.
- **Hidden gems that make skills actually powerful** — Progressive disclosure done deliberately, encoding edge cases and failure modes, structuring outputs for downstream use, deterministic vs generative design choices.
- **The advanced tricks layer** — Using scripts to anchor reliability, chaining steps internally, calling external tools cleanly, observed model selection behaviour, composability over monoliths.
- **How skills combine with the rest of the system** — Skills + MCP (data access vs workflow logic), skills + subagents (execution vs expertise), skills inside plugins, agentic pipelines.
- **When skills are the wrong tool** — One-off tasks, static context, external data access, complex delegation, the "one skill to rule them all" anti-pattern.
- **Practical design principles** — Narrow and discoverable, descriptions written for selection, separate instructions from heavy context, test like code.
- **Closing thoughts** — Skills as a design pattern; the shift from prompting to building reusable capability; where this is heading.
- **Now, I want to hear from you** — Reader engagement questions.

## Source List (compiled during brainstorm)

### Official Anthropic Documentation
- https://support.claude.com/en/articles/12512176-what-are-skills
- https://support.claude.com/en/articles/12512180-use-skills-in-claude
- https://support.claude.com/en/articles/12512198-how-to-create-custom-skills
- https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices

### Official Anthropic Blog
- https://claude.com/blog/skills
- https://claude.com/blog/skills-explained
- https://claude.com/blog/extending-claude-capabilities-with-skills-mcp-servers

### Official Repositories
- https://github.com/anthropics/skills
- https://github.com/anthropics/skills/blob/main/skills/xlsx/SKILL.md
- https://github.com/anthropics/claude-cookbooks
- https://github.com/anthropics/claude-cookbooks/blob/main/skills/README.md

### Open Specification
- https://agentskills.io/specification
- https://agentskills.io/skill-creation/using-scripts
- https://agentskills.io/skill-creation/evaluating-skills

### Community
- https://github.com/K-Dense-AI/claude-scientific-skills
