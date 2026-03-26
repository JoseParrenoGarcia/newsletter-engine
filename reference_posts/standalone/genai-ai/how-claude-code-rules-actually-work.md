---
title: "How Claude Code rules actually work"
subtitle: "A practical guide to memory, scoped rules, and predictable behaviour in real projects using Claude Code."
author: Jose Parreño Garcia
published: 2026-03-25
source: https://joseparreogarcia.substack.com/p/how-claude-code-rules-actually-work
theme: genai-ai
type: standalone
---

# How Claude Code rules actually work

*A practical guide to memory, scoped rules, and predictable behaviour in real projects using Claude Code.*

---

This week, I spent time setting up Claude Code rules for a personal project.

It seemed straightforward at first. I added a few rules, organised them neatly, and expected Claude to behave more predictably as the project grew. Instead, I started seeing something familiar: behaviour that felt correct in one moment and subtly wrong in the next.

The more I looked into it, the clearer the pattern became. **The problem wasn't Claude. It was my mental model** of how Claude Code memory and rules actually work. I was treating rules like instructions Claude would "remember", rather than context that is discovered, loaded, scoped, and sometimes ignored.

That realisation sent me down a rabbit hole. Why are some rules always loaded? Why do others only apply in certain directories? How do scoped rules actually interact with `CLAUDE.md`? And how can you tell what Claude has actually loaded into memory, instead of assuming?

---

## What this blog will cover

- What Claude Code rules are, and when not to use them
- How Claude discovers, loads, and prioritises rules
- How to use scoped rules deterministically
- How to tell Claude to read context that is not loaded automatically (`@` imports)
- How to verify what Claude is actually loading
- What this looks like in a real data science project
- What can go wrong (and how to notice early)

---

## What Claude Code rules are

In my [previous post](https://joseparreogarcia.substack.com/p/claude-code-memory-explained), I went deep into how Claude Code memory layers work and why the global and project `CLAUDE.md` files matter.

The global `CLAUDE.md` file has a very specific job: defining your working relationship with Claude. It is **not** the place to explain how to build a churn model, write an executive summary, or run deep research.

Those are project-level nuances — they change with context and belong in the project `CLAUDE.md`. But here is where most people get things wrong. Because Claude has this project file, there is a temptation to write every possible project detail there:

- Project context
- Architecture notes
- Coding conventions
- Data constraints
- ML workflows
- Evaluation rules
- Deployment warnings and testing standards

And to an extent, this is correct. But if you do that, you end up with a 1,000-line project description. Problems: context memory bloat, contradicting instructions, difficult maintenance. **The long project file becomes a liability rather than a guide.**

### Claude Code rules come in to provide structure

Rules are **project-scoped memory**, stored as small, modular Markdown files under `.claude/rules/`. They exist to capture how work should be done in this repository, but in a way that is structured, composable, and maintainable.

```
.claude/rules/
├── python-style.md
├── experiments.md
├── data-privacy.md
└── ml/
    ├── training.md
    └── pipelines.md
```

At a high level: **Claude Code rules are a way of decomposing project memory.** Instead of one large file that tries to explain everything, you get smaller, topic-specific files that can evolve independently.

---

## How Claude discovers, loads, and prioritises rules

If you create a `.claude/rules/` directory with 5 rule files in it, what actually happens? Does Claude load all of them at the start of every session? Does it wait and load them intelligently?

The answer is: **it depends on whether the rules are unconditional or path-scoped.**

### Unconditional rules — always loaded

Rules without a `paths:` frontmatter section are loaded unconditionally at the start of every session, alongside `CLAUDE.md`.

**What unconditional rules are good for:**

1. **Baseline coding and quality standards.** Formatting, typing expectations, testing requirements, logging conventions — stable, rarely controversial, apply everywhere in the codebase.

2. **Non-negotiable constraints.** Security requirements, data privacy rules, compliance constraints that must always be respected, no matter which file Claude is working on.

3. **Shared project assumptions.** For example: *"this repository targets batch workloads, not real-time systems"* or *"this project optimises for offline evaluation correctness over iteration speed"*. These shape many downstream decisions.

**What unconditional rules are NOT good for:**
- Step-by-step workflows
- Instructions tied to a specific directory
- ML-specific modelling choices
- Experimental or evolving practices

If a rule only applies when touching a particular part of the codebase, it should not be unconditional. Keeping it unconditional just because it is convenient is how context memory gets fuzzy.

---

### Path-scoped rules — only when needed

Claude Code supports scoped rules through **YAML frontmatter** at the top of a rule file:

```yaml
---
paths:
  - "notebooks/**/*.ipynb"
---

# Notebook rules

- This is exploratory space. Prioritise iteration speed over correctness.
- Do not apply production constraints here.
- Suggest improvements but do not refactor without being asked.
```

The idea is simple: "this rule only applies when you are working on files that match these paths."

Path-scoped rules trigger when Claude reads files matching the pattern — not on every tool use. If you never touch a notebook, the notebook rules never load.

**This is the key primitive for managing context as projects grow.**

Example repo structure:

```
churn-model/
├── CLAUDE.md
├── .claude/
│   └── rules/
│       ├── python-style.md        ← unconditional
│       ├── experiments.md         ← unconditional
│       ├── data-privacy.md        ← unconditional
│       ├── notebooks.md           ← scoped to notebooks/**
│       └── production-ml.md       ← scoped to src/models/** and src/pipelines/**
├── notebooks/
│   ├── 01_eda.ipynb
│   └── 02_feature_ideas.ipynb
└── src/
    ├── features/
    ├── models/
    └── pipelines/
```

---

## How CLAUDE.md and rules work together

Scoped rules and `CLAUDE.md` serve complementary purposes:

- **Scoped rules are deterministic in application** — they prevent local mistakes in specific directories
- **CLAUDE.md is deterministic in expectation** — it prevents global misunderstandings about how to approach work

A concrete example from the churn model project:

```markdown
# How to work in this repository

## Exploratory and experimental work
If you are in notebooks/ or working on a quick experiment:
- Move fast. Iteration speed matters more than production quality here.
- Apply experiments.md and notebooks.md rules.
- Do not apply production model constraints.

## Production ML changes
If you are modifying production model code:
- Expect stricter constraints to apply
- Scoped rules under src/models/ and src/pipelines/ will be active
- Reproducibility, evaluation, and testing are mandatory
```

**If you rely only on scoped rules:** Claude might technically obey constraints while still approaching the task the wrong way — diving into production code when you wanted a design discussion.

**If you rely only on CLAUDE.md:** Claude might understand intent but miss critical guardrails once it starts editing.

**Used together, they close the loop.**

---

## How to tell Claude to read context that is not loaded automatically

Real projects almost always have important context that does not live in `CLAUDE.md` or `.claude/rules/`. Think about:

- `README.md`
- Architecture overviews
- Design documents, RFCs, PRDs
- Experiment summaries
- Runbooks or operational notes

Claude will not load these by default. Unless you explicitly point to them, Claude may never read them at all.

### Explicit context loading with @ imports

When you write `@path/to/file` in your instructions, you are telling Claude to explicitly load that file into the current session context. There is no inference. You are not hinting. You are **instructing**.

*"Before you answer or act, read this."*

This context is **task-scoped, not persistent**. It applies only to the current session. That is precisely why it is useful — you control exactly when external context enters the picture.

---

## How to verify what Claude is actually loading

Never assume Claude is loading what you think it is loading. Always inspect.

Ideally, there would be a command that tells you exactly what Claude has loaded into its session context. Today, that command does not exist. The `/memory` command is a memory management tool, not a diagnostic one.

**Practical workaround: ask Claude directly.**

Ask something like: *"What files and rules have you loaded into context for this session?"* Claude will respond by listing the files it has read, along with additional context such as system files, the current Git branch, and any errors provided.

If a file appears in this list, it is influencing behaviour. If it does not, it is not.

**Treat memory behaviour as something to be verified, not inferred.**

---

## What this looks like in a real data science project

Imagine a typical data science repository: a churn prediction system that started with notebooks, grew into feature pipelines, and now has a production training and scoring setup.

```
churn-model/
├── CLAUDE.md
├── .claude/
│   └── rules/
│       ├── python-style.md
│       ├── experiments.md
│       ├── data-privacy.md
│       ├── notebooks.md
│       └── production-ml.md
├── notebooks/
├── src/
│   ├── features/
│   ├── models/
│   │   └── churn/
│   └── pipelines/
└── tests/
```

**Exploratory phase (notebooks/):** You are testing feature ideas, sanity-checking distributions, iterating quickly. You want Claude to help you reason, prototype, and move fast — not lecture you about production constraints. The `notebooks.md` and `experiments.md` rules load automatically when you are in the right place.

**Transition phase (src/features/, src/models/):** Now reproducibility matters. Data leakage is a risk. Evaluation choices shape decision making. The scoped `production-ml.md` rule activates, bringing stricter constraints into context.

**Production phase (src/pipelines/):** The highest-risk zone. The same scoped rules apply, plus operational caution is encoded explicitly in the project `CLAUDE.md`.

You do not need to remind Claude of this every session. **The rules load automatically when you are in the right place.** This is already a win.

---

## What can go wrong (and how to notice early)

### Rule bloat

As soon as rules prove useful, there is a temptation to add more. The result looks modular, but behaves like a bloated `CLAUDE.md` split across files. Not only does the context window get bloated by unnecessary tokens, but you will likely have rules that contradict each other.

### Confusing or unstable scoping

Path-scoped rules only work as well as the boundaries you choose. If directories move frequently, or if scopes rely on fragile glob patterns, rules may stop applying. **Claude does not warn you when this happens.**

### Silent failures

Claude might appear to "ignore" a rule when in reality the rule was never loaded, never scoped correctly, or overridden by context you did not realise was active. This is where most frustration comes from.

**The antidote to all of this is surprisingly simple: small, reproducible checks.**

When you add or change a rule:
- Open a file that should trigger it and observe behaviour
- Open a file that should not and observe the difference
- Ask Claude explicitly what context it has loaded for the task

If behaviour surprises you, **treat it as a debugging problem, not an intelligence problem.** When you can explain why Claude behaved the way it did, the system is working.

---

## Closing thoughts: why Claude Code rules exist at all

I see Claude Code rules as a response to a very mundane problem: **projects grow.**

What starts as a tidy `CLAUDE.md` quickly becomes a dumping ground. Style preferences, workflows, warnings, edge cases, and historical decisions all accumulate in one place. At some point, the file stops being a guide and starts being a liability.

Rules exist to break that pattern. They let you decompose project memory into smaller, topic-specific pieces. They give you a way to say "this always applies", "this only applies here", and "this only matters for this task" — without repeating yourself every session.

**Don't think rules make Claude smarter.** It's more about making your projects more legible — to Claude, to your team, and to your future self.
