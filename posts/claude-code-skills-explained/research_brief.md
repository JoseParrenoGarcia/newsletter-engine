# Research Brief: What the docs don't tell you about Claude Code skills

**Generated:** 2026-03-27

## Summary

18 URLs were present in notes.md. All 18 were reachable and validated. 10 were selected for the brief based on relevance and depth; 8 were dropped (support articles, top-level GitHub repos, and the community scientific-skills repo that are either shallower versions of selected sources or domain-specific). No new searches were required — the brainstorm sources cover the ToC well. One research gap remains: model selection behaviour inside skills (Haiku vs Opus routing) is not documented in any public source found.

**Open research question resolution:**
- `allowed-tools` (experimental): confirmed in the agentskills.io spec as "a space-delimited list of pre-approved tools the skill may use." The spec marks it experimental and lists it in the frontmatter table but provides no further elaboration on how clients enforce it. Worth flagging as a known unknown in the post.
- Model selection (Haiku vs Opus): no documentation found. Purely observed behaviour — flag as such in the post.
- agentskills.io cross-platform nuances: covered well by the spec source (compatibility field, skills-ref validation, portability as open standard).

---

## Sources

### Skills in one minute (and why they exist)

- **[Introducing Agent Skills](https://claude.com/blog/skills)**
  The original Anthropic launch announcement for Agent Skills (October 2025). Establishes the core framing — composable, portable, efficient — and the key design insight: skills load only what's needed when it's needed. Also contains the update note that agentskills.io was published as an open standard for cross-platform portability (December 2025). Useful for the opening framing and for the closing section on where this is heading.

### The mental model most people miss

- **[Agent Skills Overview — Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)**
  The most technically precise public source on skills architecture. Describes the three-level progressive disclosure model with concrete token estimates: metadata (~100 tokens, always loaded at startup), instructions (<5k tokens, loaded on activation), and resources (files loaded only as required). Explains that skills operate inside a virtual machine with filesystem access, which enables the layered loading pattern. Directly relevant to the "skills as layered systems" mental model section.

### Anatomy of a skill (beyond the obvious)

- **[Agent Skills Specification — agentskills.io](https://agentskills.io/specification)**
  The canonical open-standard spec for the SKILL.md format. Covers all frontmatter fields with constraints: `name` (max 64 chars, lowercase/hyphens only), `description` (max 1024 chars), `license`, `compatibility` (environment requirements, max 500 chars), `metadata` (arbitrary key-value), and `allowed-tools` (experimental: space-delimited list of pre-approved tools). Documents the optional `scripts/`, `references/`, and `assets/` directories and the progressive disclosure loading order. This is the primary reference for the anatomy section.

- **[xlsx SKILL.md — anthropics/skills](https://github.com/anthropics/skills/blob/main/skills/xlsx/SKILL.md)**
  A production Anthropic skill (292 lines) showing what a real, battle-tested SKILL.md looks like. The description field is unusually long and detailed, covering explicit trigger cases and explicit exclusions ("Do NOT trigger when..."). The body sets strict output standards (zero formula errors, professional fonts) and uses structured sections. A concrete anatomy reference for what the docs describe abstractly.

### Hidden gems that make skills actually powerful

- **[Skill Authoring Best Practices — Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)**
  The richest single source on non-obvious skill design. Covers description writing (always third person, include both "what" and "when", specific keywords for selection), the naming convention system, and the principle of keeping SKILL.md under 500 lines with heavy reference material moved to separate files. Includes the insight that description is critical for selection among 100+ available skills — a design pressure most practitioners underestimate. Key for the "hidden gems" and "practical design principles" sections.

- **[Claude Skills Cookbook README — anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks/blob/main/skills/README.md)**
  A practical builder's guide with real financial/business examples. Highlights the progressive disclosure architecture as the core efficiency mechanism, demonstrates custom skill development patterns, and links to the engineering blog on equipping agents for the real world. Useful for grounding abstract principles in concrete examples.

### The advanced tricks layer

- **[Using Scripts in Skills — agentskills.io](https://agentskills.io/skill-creation/using-scripts)**
  The definitive guide to scripting inside skills. Covers one-off commands (uvx, pipx, npx, bunx, deno run, go run), self-contained scripts with bundled dependencies, and — most relevant for the post — the design principles for scripts in agentic contexts: avoid interactive prompts, document with --help, write helpful error messages, use structured output. The distinction between deterministic script execution vs generative token output is the core of the "scripts for reliability" angle.

### How skills combine with the rest of the system

- **[Skills explained: How Skills compares to prompts, Projects, MCP, and subagents](https://claude.com/blog/skills-explained)**
  The clearest source on where skills sit in the full Claude stack. Contains a comparison table across five primitives (Skills, Prompts, Projects, Subagents, MCP) covering persistence, what it contains, when it loads, and best-for scenarios. The "Skills vs subagents: when to use what" and "Skills vs MCP: when to use what" sections are directly applicable to the integration section and the "when skills are the wrong tool" section.

- **[Extending Claude's capabilities with skills and MCP servers](https://claude.com/blog/extending-claude-capabilities-with-skills-mcp-servers)**
  The canonical source on the skills + MCP combination. Uses the hardware store analogy (MCP = aisles of inventory, skills = employee expertise) and walks through real-world examples where neither alone is sufficient. Directly applicable to the "Skills + MCP" subsection. Published December 2025, after agentskills.io was open-sourced.

### When skills are the wrong tool

*(see also: blog-skills-explained above — the comparison table covers this directly)*

### Practical design principles

- **[Evaluating Skill Output Quality — agentskills.io](https://agentskills.io/skill-creation/evaluating-skills)**
  The only source that treats skills as software artefacts to be tested. Covers the eval loop: designing test cases (prompt + expected output + input files), running with-skill vs without-skill comparisons, writing assertions, grading outputs, and iterating. The workspace structure (`evals/evals.json`, `iteration-N/with_skill/without_skill/`) directly supports the "test like code" design principle.

---

## Research Gaps

- **Advanced tricks: model selection behaviour (Haiku vs Opus routing)** — No public documentation found. The routing logic Claude uses when deciding which model processes a skill invocation is not described in any Anthropic source, the agentskills.io spec, or community repos. The observed behaviour (potential use of a lighter model for skill selection/metadata loading) should be presented as an observed pattern with no citable source, or flagged as an open question for the reader.
