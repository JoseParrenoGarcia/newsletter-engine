---
title: "You (probably) don't understand Claude Code memory."
subtitle: "A practical guide to global, project, and rule-level memory design."
author: Jose Parreño Garcia
published: 2026-02-24
source: https://joseparreogarcia.substack.com/p/claude-code-memory-explained
theme: genai-ai
type: standalone
---

# You (probably) don't understand Claude Code memory.

*A practical guide to global, project, and rule-level memory design.*

---

This week, I walked my team through how I have been using Claude Code in real projects.

The discussion quickly drifted away from prompts and into something more interesting: why Claude sometimes feels incredibly reliable, and other times strangely inconsistent. Almost every example traced back to the same root cause — **a misunderstanding of memory**.

Claude Code memory is powerful, but only if you stop thinking of it as "memory" in the human sense. This post explains the mental model that finally made it click for me.

---

## What this blog will cover

- What is Claude Code memory, really?
- How do memory hierarchies work across global, team, and project levels?
- What belongs in a global `CLAUDE.md` file? (and my personal example)
- How should project-level `CLAUDE.md` files be structured?
- What does this look like in real projects? (two worked examples)
- How should these memory files evolve over time?

---

## What is Claude Code memory, really?

At its simplest, Claude Code memory is **just text**.

More precisely, it is a set of Markdown files that Claude reads every time a new session starts. These files contain instructions that are injected into Claude's context before it ever sees your first message.

That simplicity is important. There is no magic database, no long-term learning, and no mysterious internal state. Claude does not "remember" in a human sense. **It re-reads instructions, every time.**

At a high level, Claude Code memory works like this:
1. Claude starts a new session
2. The relevant memory files are read
3. Their contents are inserted into the prompt context
4. Only then does Claude process your request

Memory is very close to a copy-and-paste operation. This is where many people draw the wrong conclusion:

> *"If this is just text being injected, I should describe everything. Every preference. Every edge case. Every possible interaction."*

That is wrong, for reasons we will cover. The most common effect of this thinking is that people start writing memory files to give Claude "personality." **Personality is the wrong metaphor.**

### Memory is for coordination, not conversation

A better framing: **Claude Code memory defines how Claude behaves as a collaborator, not how it chats.**

When Claude reads memory, it is deciding how to operate:
- Should I propose a plan before acting?
- How much ambiguity is acceptable before I stop and ask?
- Am I allowed to edit files directly?
- Should I prioritise correctness or speed?
- How risky is this change?

These decisions happen before any text is generated. This is why a short, well-designed memory file can feel transformative — and a long, verbose one can feel ignored.

---

## How do memory hierarchies work?

Claude Code memory is not a single file. It is organised as a small hierarchy of Markdown files, each applying at a different scope.

```
~/.claude/
└── CLAUDE.md          ← Global memory (always loaded)

project-repo/
├── CLAUDE.md          ← Project memory (always loaded)
└── .claude/
    └── rules/
        ├── testing.md     ← Applied always or conditionally
        ├── data-viz.md    ← Applied always or conditionally
        └── notebooks.md   ← Path-scoped via `paths:` frontmatter
```

Conceptually, Claude sees this as:

```
Enterprise / User memory
↓
Global CLAUDE.md
↓
Project CLAUDE.md
↓
Project rules (.claude/rules/*.md)
↓
(Conditional rules, if applicable)
↓
Your first message
```

### Are all memory files loaded every time?

When you start a session, Claude Code automatically injects memory files based on this hierarchy, where broader contexts (user) are loaded first and more specific contexts (project) override them:

- The **global CLAUDE.md** is always applied
- The **project CLAUDE.md** is always applied when working inside that repository
- **Modular rules** in `.claude/rules/*.md` are loaded and become part of the project's context — topic-specific (e.g. data-visualisation standards, testing guidelines)
- **Conditional path-scoped rules** only apply when editing certain files via a `paths:` frontmatter section — e.g. rules that only activate when working on Python test files or notebooks
- **`@path/to/import` pointers** let you organise deeper guidance externally while controlling exactly when it becomes part of the loaded context

### Context is finite, even if memory feels free

Because memory is injected as text, every line you add consumes context budget. This is why memory hierarchies exist:

- Global memory should stay **small and stable**
- Project memory should be **focused and scoped**
- Repetition across files is **costly**
- Verbosity compounds quickly across sessions

**You are not writing a wiki. You are shaping behaviour under tight constraints.**

---

## What belongs in a global CLAUDE.md file?

The global `CLAUDE.md` file is the highest-leverage memory file you will write.

The goal is to define **a few stable expectations that will not change from one project** — regardless of what those projects are (content generation, coding, researching, etc).

This is why the global `CLAUDE.md` should feel like a **working contract**. Not documentation, not personality.

### My personal global CLAUDE.md

Here are the key sections I include:

**Relationship and Voice**
```markdown
# Relationship and Voice
- In CLAUDE.md files, avoid pronouns. Use "Jose" and "Claude".
- In normal conversation, use natural language pronouns.
```

**Primary Objective**
```markdown
# Primary Objective
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- Stop and re-plan immediately if something goes sideways — don't keep pushing
```

**Planning and Change Control**
```markdown
# Planning and Change Control
- Before editing: understand what exists, read it, plan the change
- After corrections: update tasks/lessons.md to prevent the same mistake
```

**Communication Style**
```markdown
# Communication Style
- Claude is direct and specific in critique and feedback
- Claude avoids hedging language when making technical recommendations
- Claude uses bullet points for summaries, decisions, and feedback
```

**Defaults for Outputs**
```markdown
# Defaults for Outputs
- When Claude proposes a plan, keep it short (3–7 bullets)
- When Claude provides recommendations, include:
  - what Claude would do
  - why
  - what could go wrong (if relevant)
```

My `CLAUDE.md` file is:
1. ~50 lines long
2. Defines operational behaviour and risk posture
3. Draws a clear line between trivial and non-trivial work
4. Makes feedback useful, not polite or flattering

---

## How should project-level CLAUDE.md files be structured?

If the global `CLAUDE.md` defines how Claude behaves everywhere, the project-level file defines how a **specific repository** works.

A project `CLAUDE.md` is best thought of as **AI onboarding plus an operating manual** — not as a dumping ground for everything you know about the system.

A well-structured project file helps Claude answer:
- What does this system do, at a high level?
- What constraints matter here?
- How is this repo organised?
- How do people typically build, test, and change things?
- What would be dangerous to modify casually?

**It should contain information that materially changes Claude's decisions — not information Claude can easily infer from reading the code.**

### How descriptive should it be?

Brief, explicit, and high-signal. Best practice:
- Short description of the project (a few bullets)
- What matters most (key constraints)
- What is explicitly out of scope
- Where the important directories live

**It is not a good place to maintain an execution plan or a running checklist.** Plans change too often, and memory files should not become fossils.

### Avoiding bloat with .claude/rules/

The most important structural principle: **the root project CLAUDE.md should stay small and stable.**

Anything that is deep, topic-specific, path-specific, or only relevant some of the time, is usually better placed in modular rule files under `.claude/rules/`.

```
project CLAUDE.md → the index
.claude/rules/    → the detail
```

---

## What does this look like in real projects?

### Example 1: A data science project (Customer Churn Prediction Model)

```markdown
## What this project is
- Purpose: train and evaluate models to predict customer churn
- Primary output: offline evaluation results and model comparison
- This is an experimental modelling project, not a production system

## Key constraints
- Never modify the raw data files in data/raw/
- Model artefacts are not treated as final — they are experiments
- If a new dependency is required, Claude explains why and updates lock files

## Repo layout (high level)
- data/raw/        ← immutable source data
- data/processed/  ← output of feature engineering
- src/             ← modelling code
- notebooks/       ← exploratory work

## How to run experiments
[commands here]

## Non-goals
- This project does not include deployment or serving infrastructure
- No A/B testing infrastructure here

## Where deeper rules live
- .claude/rules/modelling.md
- .claude/rules/experiments.md
```

**Why this works for a data science workflow:** It frames the project as experimental (not production-critical). It protects raw data explicitly. It makes clear that model artefacts are not final. It keeps the file focused without over-describing the codebase.

---

### Example 2: A data engineering project (Daily Revenue ETL Pipeline)

```markdown
## What this project is
- Purpose: daily ETL pipeline ingesting raw transaction data → cleaned revenue tables
- This is a production-critical pipeline — data quality errors have downstream business impact

## Key constraints
- Pipelines must be idempotent (per processing date)
- Schema changes are breaking changes
- Historical backfills require explicit approval

## Repo layout (high level)
- pipelines/  ← DAG definitions
- transforms/ ← transformation logic
- schemas/    ← table schemas and migrations

## How to run the pipeline
[commands here]

## Data and schema rules
- Never modify schemas without creating a migration file
- Emit clear logs and basic run metrics (row counts, sanity checks)

## Operational safety rules
- Stop and ask before modifying anything in pipelines/ that affects historical data
- Never optimise for speed at the cost of idempotency

## Where deeper rules live
- .claude/rules/testing.md
- .claude/rules/schema.md
- .claude/rules/backfills.md
```

**Why this works for data engineering:** It frames the project as production-critical — that single statement changes how Claude approaches almost every decision. It elevates invariants (idempotency, schema stability, backfills) to first-class behavioural constraints. It encodes operational caution explicitly.

**What is deliberately missing:** No step-by-step pipeline walkthrough, no historical incident log, no checklist of past migrations. Those artefacts change too often. The purpose is not to teach Claude how the pipeline works line by line — it is to prevent Claude from making dangerous assumptions.

### The key takeaway from both examples

Both projects use a project-level `CLAUDE.md`. Both files are similar in size and structure. **But they encode very different risk profiles.**

That is the real value of project-level memory: it lets the same assistant behave appropriately in fundamentally different contexts.

---

## How should these memory files evolve over time?

**Much less often than you think.**

Both global and project-level memory files are meant to be slow-moving. If you find yourself editing them every week, that is usually a signal that **too much is living in memory**.

### When to update memory

Updating memory makes sense when something fundamentally changes how Claude should behave. Two good triggers:

1. **A repeated correction keeps coming up.** If you find yourself telling Claude the same thing three or four times, it probably belongs in memory.
2. **A risk profile changes.** Experimental code becomes production-critical, or vice versa.

### Additions, not accretion

When memory does evolve, it should usually evolve by **addition and refactoring**, not by accumulation. Good patterns include:

- Moving new detail into `.claude/rules/` rather than expanding the root file
- Splitting a growing section into a focused rule file
- **Removing rules that no longer influence behaviour**

If a memory file only ever grows, it will eventually become harmful. Token bloat is a real problem.

---

## Closing thoughts

Claude Code memory is easy to misunderstand because many people think a machine can simply retain much more memory than a human — and so they chuck everything that comes to mind into the memory files.

**The key idea: memory is not about making Claude sound better. It is about making Claude behave predictably.**

When memory is treated as a working contract rather than a personality description:
- Behaviour becomes consistent across sessions
- Project context stops leaking into unrelated work
- You spend far less time correcting the same mistakes

You do not need clever prompts or long instructions. **You need small, stable rules placed at the right level.**

Once you internalise that, Claude Code memory stops feeling like a mysterious feature and starts feeling like what it really is: **system design in miniature.**
