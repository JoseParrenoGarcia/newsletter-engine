# Outline: What the docs don't tell you about Claude Code skills

**Target:** ~12 min read (~3,000 words)

---

## Sections

### 1. Skills in one minute (and why they exist)
- Opens with a brief personal frame — encountering skills and realising the docs stop at setup
- Establishes the thesis: skills are a design pattern, not just a feature
- Sets vocabulary for the rest of the post: what a skill is, the problem it solves (repeatability, context efficiency), and where it sits relative to memory, rules, and hooks
- "What this blog will cover" bullet list follows — consistent with the two reference posts
- Sources: [Introducing Agent Skills](https://claude.com/blog/skills)

### 2. The mental model most people miss
- Names the common misunderstanding: most practitioners think of a skill as "a markdown file with instructions" — half right, entirely insufficient
- Introduces the layered system model: metadata (~100 tokens, always loaded), instructions (<5k tokens, loaded on activation), resources (loaded only as required) — these are not incidental implementation details, they are the architecture
- The "virtual machine" framing: skills run inside an isolated environment with filesystem access; this is what enables scripts, selective loading, and reliable execution
- Sources: [Agent Skills Overview — Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

### 3. Anatomy of a skill (beyond the obvious)
- SKILL.md as a playbook: required fields (`name` max 64 chars lowercase/hyphens; `description` max 1024 chars), optional fields (`license`, `compatibility`, `metadata`), and the experimental `allowed-tools` field — exists in the spec, sparse on documentation about how clients enforce it
- The directories that unlock serious capability: `scripts/` for executable code, `references/` for heavy context loaded selectively, `assets/` for supporting files
- Progressive disclosure as the architectural "why" behind `references/`: keeping the main body lean is not a style preference — it is what makes the three-layer loading model work. Heavy context in `references/` only loads when needed; heavy context in SKILL.md loads every activation. SKILL.md under 500 lines is a structural target, not a guideline.
- Concrete reference: the xlsx SKILL.md (292 lines) from the Anthropic skills repo — what a production skill looks like. Notice how the description field handles explicit triggers ("DO trigger when...") and explicit exclusions ("Do NOT trigger when..."). That is not verbosity — it is precision engineering.
- Sources: [Agent Skills Specification — agentskills.io](https://agentskills.io/specification), [xlsx SKILL.md — anthropics/skills](https://github.com/anthropics/skills/blob/main/skills/xlsx/SKILL.md)

### 4. Hidden gems that make skills actually powerful
- The description field is the most underused surface in skill design: among 100+ available skills, description is the ranking signal Claude uses for selection. Most practitioners write a label; it should be written like an API contract — third-person, explicit triggers, explicit exclusions, specific keywords
- Encoding edge cases and failure modes directly in the description rather than hoping the body instructions handle them — selection happens before the body is ever loaded
- Structuring outputs for downstream use: the difference between a skill that produces conversational prose and one that produces parseable, structured output that feeds the next step in a pipeline. Output design is part of skill design.
- Sources: [Skill Authoring Best Practices — Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices), [Claude Skills Cookbook README — anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks/blob/main/skills/README.md)

### 5. The advanced tricks layer
- Scripts for reliability: the core principle is deterministic execution vs generative token output. Scripts handle the parts that need to be exact (file creation, data transformation, API calls); SKILL.md handles the parts that need reasoning. Mixing them is where skills become brittle.
- Design principles for scripts in agentic contexts: no interactive prompts, structured output formats, helpful error messages — not nice-to-haves; the skill cannot stop and ask for clarification
- Composability: skills that chain internally through multi-stage workflows, skills that call other skills — the design principle is narrow over monolithic
- Model routing (observed, not documented): there appears to be a routing behaviour where lighter models scan skill metadata at selection time and heavier models handle execution. No public documentation found for this — presented as observed behaviour, flagged as an open question for readers
- Sources: [Using Scripts in Skills — agentskills.io](https://agentskills.io/skill-creation/using-scripts); model selection = **model knowledge only, no citable source** — flagged in draft

### 6. How skills combine with the rest of the system
- Skills + MCP: the hardware store analogy from the Anthropic blog — MCP is aisles of inventory (data access), skills are employee expertise (workflow logic). Neither alone is sufficient for complex agentic tasks that require both data and repeatable process.
- Skills + subagents: skills define what to do and in what order; subagents provide execution capacity. A skill can orchestrate subagents; a subagent can invoke a skill. These are complementary, not competing.
- The open standard angle: agentskills.io signals cross-platform portability — skills designed to spec should be portable across Claude clients and eventually other agents
- Sources: [Skills explained: How Skills compares to prompts, Projects, MCP, and subagents](https://claude.com/blog/skills-explained), [Extending Claude's capabilities with skills and MCP servers](https://claude.com/blog/extending-claude-capabilities-with-skills-mcp-servers)

### 7. When skills are the wrong tool
- Bridge from Section 6: knowing where skills fit also clarifies where they don't. The integration picture is useful precisely because it has edges.
- One-off tasks: skills have authoring overhead. If you will do something once, a prompt is correct.
- Static context delivery: if the "skill" is just a block of reference text with no workflow logic, it belongs in a CLAUDE.md rules file — loaded for free, no activation overhead
- External data access without MCP: skills that reach out to external APIs directly are fragile and hard to test. MCP handles data access; skills handle what to do with it.
- The "one skill to rule them all" anti-pattern: monolithic skills that try to handle multiple unrelated workflows become unpredictable, un-testable, and un-discoverable. Narrow beats comprehensive.
- Sources: [Skills explained: How Skills compares to prompts, Projects, MCP, and subagents](https://claude.com/blog/skills-explained)

### 8. Practical design principles
- Narrow and discoverable: a skill that does one thing reliably beats one that handles every case generically
- Descriptions written for selection, not documentation: third-person, includes both "what it does" and "when to use it", with specific trigger keywords — because Claude selects skills using the description field
- Separate instructions from heavy context: SKILL.md stays lean; detailed reference material lives in `references/`
- Test like code: design test cases (prompt + expected output + input files), run with-skill vs without-skill comparisons, write assertions, iterate. The eval loop from agentskills.io applies. Skills that are not tested are not trusted.
- Sources: [Skill Authoring Best Practices — Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices), [Evaluating Skill Output Quality — agentskills.io](https://agentskills.io/skill-creation/evaluating-skills)

### 9. Closing thoughts
- Skills as a design pattern: the shift from "writing a prompt" to "building reusable capability" is the same conceptual move software development made from ad-hoc scripts to reusable functions
- The open standard (agentskills.io) signals the direction: skills designed to spec travel across Claude clients and eventually other agents — portability as a first-class property
- Closing crystallisation: one sentence that reframes the whole post
- Sources: [Introducing Agent Skills](https://claude.com/blog/skills) for portability framing; otherwise model knowledge

### 10. Now, I want to hear from you
- 2–3 engagement questions for readers
- Sources: none

