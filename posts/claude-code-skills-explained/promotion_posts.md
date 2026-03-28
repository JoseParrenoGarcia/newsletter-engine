# Promotional Posts: What the docs don't tell you about Claude Code skills

**Generated:** 2026-03-28
**Draft:** posts/claude-code-skills-explained/long_draft.md

---

## Launch Post

> **Why this post:** Practitioners building with Claude Code skills hit a wall that the documentation doesn't address — this gives them the mental model and design principles to push past it.

🗞️ New post is live! What the docs don't tell you about Claude Code skills

The markdown file is the least important part of a Claude Code skill.

Most practitioners spend 90% of their time on the body instructions. The design decisions that actually determine whether a skill works reliably happen elsewhere.

What's inside:
🔹 The description field is the selection interface — not documentation
🔹 Skills are a three-layer system (metadata / instructions / resources) — each loads at a different time and at a different cost
🔹 Testing skills like code is not optional — it is what prevents silent failure in pipelines

I built a skill for every stage of my newsletter writing pipeline. Here is everything the docs underexplain.

💬 How much time do you spend on the description field vs the instructions? I suspect the ratio is backwards for most people.
👇 [link]

---

## Deep-dive 1: Hidden gems that make skills actually powerful

> **Why this section:** "The description is the selection interface" is the most surprising and actionable insight in the post — it reframes a field most practitioners treat as boilerplate into the most critical part of the skill. Strong standalone claim with immediate practical implications.

Most Claude Code skill failures are not body instruction failures. They are description failures.

By the time the body runs, the wrong skill has already been selected.

Let's break it down:
🔹 The description is not documentation. It is the selection interface.
👉 When Claude has 100+ skills available, it reads names and descriptions to decide which skill to activate — it never reads the body until after selection.
🔹 Failure modes belong in the description, not the body.
👉 "Do NOT trigger when..." in the description prevents wrong-skill activation before any instructions run. Encoding it in the body is already too late.
🔹 Structured output is part of skill design — not an afterthought.
👉 Skills that end with prose cannot be composed. Skills that produce structured output can feed the next stage cleanly, every time.

The xlsx SKILL.md from Anthropic's skills repo is 292 lines. The description alone specifies exactly when to invoke and when not to. That is not verbosity — it is precision engineering.

💬 How much time do you spend writing the description vs the instructions? I suspect the ratio is backwards for most people.
👇 Full breakdown: [link]

---

## Deep-dive 2: When skills are the wrong tool

> **Why this section:** Contrarian framing ("when NOT to use X") consistently outperforms positive framing on social. The anti-patterns are concrete and immediately recognisable — the monolith pattern in particular is something most practitioners have fallen into. High relatability.

The most common Claude Code skill mistake is building one that shouldn't exist.

Not every workflow needs a skill. Using the wrong primitive costs you more than building nothing.

Let's break it down:
🔹 One-off tasks → use a prompt.
👉 Skills carry authoring overhead: frontmatter, testing, maintenance. The investment only pays back when the process recurs.
🔹 Static context → use a rules file.
👉 If the "skill" is a block of reference text with no workflow logic, it belongs in CLAUDE.md. Rules load automatically, require no activation, and do not consume a skill slot.
🔹 The monolith anti-pattern is the worst offender.
👉 A skill that handles research, drafting, SEO, and promotion in one file is not comprehensive — it is un-testable, un-discoverable, and un-maintainable. It selects inconsistently and fails silently in every case it wasn't designed for.

This is where most teams go wrong. They build the monolith because it feels thorough. Then they can't debug it when it breaks.

💬 Have you ever built a skill that was clearly the wrong primitive in hindsight? What tipped you off?
👇 Full post: [link]

---

## Deep-dive 3: The mental model most people miss

> **Why this section:** The three-layer loading architecture is the foundational insight that makes every other design principle in the post make sense. It is concrete, technical, and non-obvious — exactly the kind of insight that performs well with a technical audience who builds things seriously.

A Claude Code skill is not a prompt you saved. It is a layered system with defined loading behaviour.

Once you see the three layers, the non-obvious design choices start making sense.

Let's break it down:
🔹 Metadata — always loaded. ~100 tokens. Every session, every skill, whether used or not.
👉 This is why description quality is not optional: it runs at the cheapest and earliest moment in the chain — before anything else executes.
🔹 Instructions — loaded on activation. The SKILL.md body. Under 5,000 tokens.
👉 Heavy context does not belong here. Style guides, specification documents, lookup tables — those belong in the `references/` directory, loaded on demand.
🔹 Resources — loaded only when needed during execution.
👉 Across a system of 20+ skills, the body-vs-references distinction compounds. Respecting it is how you keep the whole system efficient at scale.

Separation of concerns is not a metaphor here — it is the actual loading model. Most practitioners treating SKILL.md as "just a markdown file" are paying a hidden cost they cannot see.

💬 Are you keeping SKILL.md bodies lean, or loading everything at activation?
👇 Full breakdown: [link]
