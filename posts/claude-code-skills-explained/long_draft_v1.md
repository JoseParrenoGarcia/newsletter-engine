# What the docs don't tell you about Claude Code skills

*A practical guide to the anatomy, hidden levers, and design principles that make Claude Code skills reliable.*

---

This month, I finished building a skill for every stage of my newsletter writing pipeline.

The process was straightforward. Each skill is a markdown file. Each one gets invoked with a slash command. And each one — when designed carefully — behaves the same way every time.

What I kept running into was the gap between what the documentation covers and what actually matters. The Anthropic docs tell you how to create a skill. They do not explain why the same instruction produces different results depending on where in the file it lives, or what the description field is actually doing, or why some skills degrade unpredictably as they grow. Those answers are scattered across the official spec, production examples, and a fair amount of direct observation.

That gap is what this post is about.

The central argument: **skills are a design pattern, not just a feature.** Most practitioners treat them as markdown files with instructions. That is half right and entirely insufficient.

This post assumes you have already encountered Claude Code skills and want to go deeper. I will not walk you through creating your first skill. I will cover what the docs underexplain, and what I have found that actually makes skills reliable.

---

## What this blog will cover

- The mental model most practitioners are missing
- The full anatomy of a skill: SKILL.md, frontmatter, and the directories that matter
- The hidden levers that separate reliable skills from fragile ones
- Advanced tricks: scripts, composability, and model routing
- How skills fit with MCP, subagents, and agentic pipelines
- When skills are the wrong tool
- Practical design principles — including how to test skills like code

---

## The mental model most people miss

Most practitioners mentally model a skill as: a markdown file, instructions at the top, maybe some examples. Claude reads it, follows it, done.

That model works until it does not.

The [Agent Skills Overview in the Claude API docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) describes something more precise: a three-layer architecture where different parts of a skill load at different times, at different costs.

**Metadata** — always loaded at startup, approximately 100 tokens. The skill name and description. Claude reads this for every active skill, every session, regardless of whether the skill gets used.

**Instructions** — loaded when the skill is activated, under 5,000 tokens. The SKILL.md body.

**Resources** — loaded only as required during execution. Files in `references/` and `assets/` directories.

These are not incidental implementation details. They are the architecture, and they shape every design decision that follows.

The loading model sits inside a broader isolation model: skills execute inside a virtual machine with filesystem access. That environment is what makes scripts reliable, selective resource loading possible, and skill behaviour consistent across sessions.

The mental model shift: a skill is not a prompt you save. It is a layered system with defined loading behaviour, execution scope, and resource access. Once you see it that way, the non-obvious design choices start making sense.

[Visual: diagram | post figure | concept illustration — three-layer skill loading: metadata (always loaded), instructions (on activation), resources (on demand)]

---

## Anatomy of a skill (beyond the obvious)

The [agentskills.io specification](https://agentskills.io/specification) is the canonical reference for the SKILL.md format. Here is what it covers that the basic how-to articles do not.

### Frontmatter fields

The `name` field has a constraint that matters: maximum 64 characters, lowercase with hyphens only. This is not a style preference — it is how skills are referenced and invoked. Descriptive names that stay within 64 characters and remain readable under a slash command are harder to write than they look.

The `description` field allows up to 1,024 characters. Most practitioners write a sentence. A sentence is not enough — but the full case for why belongs in the next section.

The optional fields: `license`, `compatibility` (environment requirements, up to 500 characters), and arbitrary key-value `metadata`. Then there is `allowed-tools` — marked experimental in the spec, defined as a space-delimited list of pre-approved tools the skill may use. What the spec does not explain is how clients enforce it. This is a known unknown worth flagging if you are building skills for multi-agent contexts where tool access boundaries matter.

### The directories

Three optional directories sit alongside SKILL.md:

- `scripts/` — executable code. Shell scripts, Python files, anything the skill can invoke directly. This is where deterministic execution lives.
- `references/` — heavy context loaded selectively. Design specifications, lookup tables, large reference documents. These load on demand, not at activation.
- `assets/` — supporting files: templates, schemas, example outputs.

The `references/` directory is where the three-layer architecture pays off in practice. Heavy content placed there loads only when the skill needs it during execution. The same content placed in the SKILL.md body loads at every activation. That distinction has a real token cost, and across a system of many skills it compounds.

The practical guideline from the [Anthropic best practices documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices): keep SKILL.md under 500 lines. Treat that as a structural target. When a skill body exceeds it, the question is not "how do I make the prose tighter" — it is "what belongs in `references/`?"

### What a production skill looks like

The [xlsx SKILL.md in the Anthropic skills repository](https://github.com/anthropics/skills/blob/main/skills/xlsx/SKILL.md) is 292 lines and worth reading in full. The description field is long and detailed — explicit triggers ("DO trigger when...") and explicit exclusions ("Do NOT trigger when..."). The body sets strict output standards: zero formula errors, professional formatting conventions throughout.

That is not verbosity. It is precision engineering. And it points directly at the most underused surface in skill design.

---

## Hidden gems that make skills actually powerful

### The description field selects the skill

That sentence deserves weight.

When Claude has 100+ skills available, it reads the metadata layer — names and descriptions — to decide which skill applies. It never reads the body until a skill is selected. Every edge case, trigger condition, and failure mode that lives only in the body instructions is invisible at selection time.

**The description is not documentation. It is the selection interface.**

The [best practices guide](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) is direct about this: write descriptions in third person, include both what the skill does and when to use it, include specific trigger keywords. Description quality becomes a ranking signal as the number of available skills grows.

What that implies in practice: the most important content in a skill file is often the content practitioners spend the least time on.

The xlsx skill's description explains exactly which spreadsheet operations should trigger the skill, which should not, and what the skill guarantees about output quality. A practitioner with 100 skills available will route correctly. A skill without that precision selects inconsistently, regardless of how good the body instructions are.

### Encoding failure modes at the selection layer

A skill that handles only the happy path is a skill waiting to fail.

Explicit exclusions in the description ("Do NOT trigger when...") prevent the skill from being invoked in contexts where it will produce bad output. The failure mode is encoded at the selection layer, before any instructions run. This is categorically different from handling failure modes in the body — by the time the body runs, the wrong skill has already been selected.

### Structuring outputs for downstream use

A skill that ends with prose is harder to compose with than a skill that ends with structured output. If a downstream step — another skill, a script, a human review stage — needs to consume the output, the design should reflect that consumption.

Structured output formats (YAML, JSON, defined markdown sections with predictable headings) make skills composable in ways that conversational output does not. The [Claude Skills Cookbook](https://github.com/anthropics/claude-cookbooks/blob/main/skills/README.md) demonstrates this pattern with real financial workflow examples — each stage produces output that feeds the next cleanly.

Output design is part of skill design. It is not an afterthought.

---

## The advanced tricks layer

### Scripts for reliability

The [agentskills.io scripting guide](https://agentskills.io/skill-creation/using-scripts) draws a distinction most practitioners discover the hard way: some parts of a skill need deterministic execution; other parts need reasoning. Mixing them is where skills become brittle.

Scripts handle the deterministic parts. File creation. Data transformation. API calls where the output format matters. External tool invocations where the parameters need to be exact. These are things that should not vary based on how the model interprets an instruction on a given run.

SKILL.md handles the reasoning parts. What to do with information. How to structure an analysis. Which sections to include. When to ask versus when to proceed.

The design principles for scripts in agentic contexts differ from scripts in interactive use. No interactive prompts — the skill cannot stop and wait for input mid-execution. Structured output formats — the body needs to parse what the script returns. Helpful error messages — when a script fails, the skill needs enough information to surface the failure clearly rather than producing silent bad output. These are not optional quality improvements; they are requirements for a skill that runs unsupervised.

### Composability

Skills are narrow by design. But narrow skills can chain.

A skill can invoke another skill as a step in a larger workflow. A skill can be designed as a building block that gets invoked from within a pipeline. The design principle is composability over monoliths: a system of focused skills that chain cleanly outperforms one skill trying to handle everything. More on why monoliths fail in a later section.

### Model routing (observed, not documented)

There appears to be a routing behaviour where a lighter model scans skill metadata at selection time and a heavier model handles actual skill execution. No public documentation exists for this. It is an observation from working with the system, and no Anthropic source I found confirms or describes the mechanism.

If you are seeing inconsistency between how well skills get selected versus how well they execute — the selection seems reasonable, the execution seems to use more capability — this is a plausible explanation. Treat it as a hypothesis worth holding, not a documented fact.

---

## How skills combine with the rest of the system

The [skills explained blog post](https://claude.com/blog/skills-explained) from Anthropic includes a comparison table across five primitives: Skills, Prompts, Projects, Subagents, and MCP. The table covers persistence, what each contains, when it loads, and best-for scenarios. The two integrations that matter most in practice are skills + MCP and skills + subagents.

### Skills + MCP

The [December 2025 post on extending Claude's capabilities](https://claude.com/blog/extending-claude-capabilities-with-skills-mcp-servers) uses an analogy I find precise: MCP servers are aisles of inventory, skills are employee expertise. MCP gives Claude access to data and tools. Skills give Claude a defined process for using them.

Neither alone is sufficient for real agentic workflows. A skill without MCP has to work with whatever is already in context. MCP without a skill gives Claude data access and no structured process for acting on it. Together, they close the loop: access the right data, apply the right process.

### Skills + subagents

Skills define what to do and in what sequence. Subagents provide execution capacity and domain focus. A research skill can orchestrate a subagent with web access; a subagent can invoke a skill as part of a larger pipeline.

The distinction matters because these two primitives are sometimes conflated. A skill is a reusable set of instructions with defined scope. A subagent is an execution context with tool access. They are different layers. They compose naturally — but combining them well requires understanding what each one is responsible for.

### The open standard

The [original Agent Skills announcement](https://claude.com/blog/skills) notes that agentskills.io was published as an open standard in December 2025. Skills built to spec are designed to be portable across Claude clients and, as the standard matures, across other agent implementations. Portability as a first-class property changes the design calculus: a well-structured skill is not just a Claude Code asset.

---

## When skills are the wrong tool

Knowing where skills fit also clarifies where they do not. The integration picture has edges.

**One-off tasks.** Skills carry authoring overhead: frontmatter, testing, maintenance. If you will do something once, write a prompt. The investment in a skill only returns when the process recurs.

**Static context delivery.** If the "skill" is a block of reference text with no workflow logic, it belongs in a CLAUDE.md rules file. Rules load automatically, require no activation, and do not consume a skill slot. A skill that is purely informational is using the wrong primitive.

**External data access without MCP.** Skills that reach directly into external APIs or databases are fragile — difficult to test, difficult to maintain, and blurring a boundary that exists for a reason. Data access is MCP's job. What to do with the data is the skill's job. Conflating them produces skills that are hard to debug when the data source changes.

**The "one skill to rule them all" anti-pattern.** A monolithic skill that handles research, drafting, SEO optimisation, and promotion in one file is not comprehensive — it is un-testable, un-discoverable, and un-maintainable. When a skill tries to handle multiple unrelated workflows, it selects inconsistently and fails silently in the cases it was not designed for. The [skills explained comparison table](https://claude.com/blog/skills-explained) makes this visible: each primitive in the Claude stack has a defined best-for scenario. Building against those boundaries produces friction that accumulates.

---

## Practical design principles

The [best practices guide](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) and the [evaluation guide from agentskills.io](https://agentskills.io/skill-creation/evaluating-skills) together provide the clearest operational guidance available. These are the principles I apply consistently.

**Narrow and discoverable.** A skill that does one thing reliably is more useful than one that handles many things inconsistently. Narrow scope makes skills easier to select, easier to test, and easier to reason about when they fail.

**Descriptions written for selection.** Write in third person. Include both what the skill does and when to use it. Use specific keywords that reflect how users will naturally describe the task. Treat the 1,024-character limit as design space — not a ceiling to stay comfortably below, but a budget to deploy thoughtfully. The description is the only part of the skill Claude reads before deciding whether to activate it.

**Separate instructions from heavy context.** SKILL.md carries instructions. `references/` carries context. Anything that is reference material rather than workflow logic — style guides, specification documents, lookup tables — belongs in `references/`. Keeping SKILL.md lean preserves the three-layer loading model's efficiency.

**Test like code.** The [agentskills.io evaluation framework](https://agentskills.io/skill-creation/evaluating-skills) treats skills as software artefacts: design test cases (prompt + expected output + any input files), run with-skill and without-skill comparisons, write assertions about the output, grade and iterate. The workspace structure (`evals/evals.json`, `iteration-N/with_skill/without_skill/`) is a concrete pattern worth adopting.

Skills that are not tested are not trusted. That is not a platitude — it is a practical statement about what happens when a skill breaks silently in a pipeline. The eval loop catches regressions. Without it, you find out from the output.

---

## Closing thoughts

Writing a prompt is a conversational act. Building a skill is a design act.

You are defining scope, encoding failure modes, separating instructions from context, structuring outputs for downstream use, and testing the result. These are not prompt engineering skills. They are software design skills applied to a new medium.

The [original Agent Skills announcement](https://claude.com/blog/skills) frames skills as "composable, portable, efficient." The open standard at agentskills.io signals where this is heading: skills designed to spec travel across Claude clients and, as the standard matures, across other agent implementations. A skill you build carefully today in Claude Code could run in a different agent context tomorrow. Portability is a first-class property of the format, not a future capability to be added.

**The underlying shift is this: skills let you stop improvising and start building.** Every time you encode a workflow into a reliable, testable skill, you reduce the gap between "Claude as a capable chat model" and "Claude as a dependable collaborator." That gap is where the real value lives — and closing it is a design problem, not a prompting problem.

---

## Now, I want to hear from you

If you have been building Claude Code skills:

- What is the most non-obvious design decision you have made — and did it hold up?
- Have you hit the "one skill to rule them all" trap? How did you climb back out?
- Are you testing skills systematically, or still finding problems in production?

I am particularly curious about how people are combining skills with MCP in practice. The integration patterns feel like they are still being worked out in the wild — I would like to compare notes.

---

## References

[1] [Introducing Agent Skills](https://claude.com/blog/skills) — Anthropic's original October 2025 launch announcement for Agent Skills; covers composable/portable/efficient framing and the December 2025 note on agentskills.io as an open standard.

[2] [Agent Skills Overview — Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — The most technically precise public source on the three-layer loading architecture (metadata, instructions, resources) with token estimates; also covers the virtual machine execution model.

[3] [Agent Skills Specification — agentskills.io](https://agentskills.io/specification) — The canonical open-standard spec for SKILL.md format; covers all frontmatter fields including the experimental `allowed-tools` field and the `scripts/`, `references/`, `assets/` directory structure.

[4] [xlsx SKILL.md — anthropics/skills](https://github.com/anthropics/skills/blob/main/skills/xlsx/SKILL.md) — A 292-line production Anthropic skill demonstrating real description field design with explicit triggers and exclusions.

[5] [Skill Authoring Best Practices — Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — Covers description writing conventions, naming standards, and the 500-line SKILL.md guideline; includes the insight that description is the selection ranking signal among 100+ skills.

[6] [Claude Skills Cookbook README — anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks/blob/main/skills/README.md) — Practical builder's guide with financial workflow examples demonstrating progressive disclosure and structured output patterns.

[7] [Using Scripts in Skills — agentskills.io](https://agentskills.io/skill-creation/using-scripts) — Definitive guide to scripting inside skills; covers the deterministic vs generative distinction and design principles for scripts in agentic contexts.

[8] [Skills explained: How Skills compares to prompts, Projects, MCP, and subagents](https://claude.com/blog/skills-explained) — Comparison table across five Claude primitives; the clearest source on when skills are not the right tool.

[9] [Extending Claude's capabilities with skills and MCP servers](https://claude.com/blog/extending-claude-capabilities-with-skills-mcp-servers) — The canonical source on the skills + MCP integration; uses the hardware store analogy and real-world workflow examples. Published December 2025.

[10] [Evaluating Skill Output Quality — agentskills.io](https://agentskills.io/skill-creation/evaluating-skills) — Covers the eval loop for skills as software artefacts: test case design, with-skill vs without-skill comparisons, assertions, and iteration workspace structure.
