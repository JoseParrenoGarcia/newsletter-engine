# Review Report: What You Actually Need To Test

**Post:** `claude-code-evals-part-2-what-you-actually-need-to-test`
**Draft reviewed:** `long_draft.md`
**Reviewed:** 2026-07-29

---

## Panel Consensus

| Critic | Covers | Preliminary verdict |
|--------|--------|---------------------|
| Voice & Audience | Voice fidelity, Audience specificity | Revise first |
| Structure & Depth | Structural completeness, Section depth | Revise first |
| Impact & Argument | Argument build-up, Actionability | Ready |

**Consensus:** Split 2:1 — Voice & Audience and Structure & Depth both say Revise first; Impact & Argument says Ready. Resolved by verdict logic: two scored dimensions at 3 (voice fidelity, audience specificity) trigger "Revise first" regardless of the Impact critic's assessment.

---

## Pass 1 — Structural Completeness

| Element | Status | Note |
|---------|--------|------|
| Intro: anecdote → framing → thesis | ~ | Strong thesis callback to Part 1 and explicit thesis before first H2, but no personal anecdote; the opening scene is a constructed pedagogical scenario, not a specific personal experience. For series-genai, a brief personal moment is permitted but not required — the thesis-declaration variant is valid; this ~ reflects the absence of a personal bridge that would ground the reader more strongly in Jose's experience. |
| Subtitle/deck line | ✓ | Italicised one-liner immediately under H1; signals series position and scope clearly. |
| Preview section (named ##) | ✓ | "What will we cover in this post?" uses the correct bold-label bullet format with five labelled items, all matching their corresponding H2 headings. |
| Main body H2 sections (5–8) | ~ | Six substantive H2s present (within range). **Note on question-format headings:** the `/draft` skill explicitly requires question-format H2s ("every H2 must be written as a question starting with How, What, Why…") and the `/revise` skill reinforced this for SEO discoverability. The Structure critic flagged these as wrong per `post_template.md` ("noun-phrase or verb-phrase declarations"). This is a conflict between the draft skill's H2 rule and the template's heading rule — the draft skill override takes precedence here. H2 format is not a revision target. |
| Closing thoughts (named ##) | ~ | "Key takeaways from part 2" performs synthesis but uses a bullet-list format; the series-genai style guide specifies numbered key takeaways for technical series — this is actually the correct pattern for this content type. The ~ is retained because the closing does not fully reconnect to the intro's three-failure scenario. |
| Now, I want to hear from you (##) | ✓ | Three specific questions directly tied to the post's surface-prioritisation argument. |

**ToC sync check:** All five bold phrases in `## What will we cover in this post?` match their corresponding H2 headings exactly. No mismatches found.

---

## Pass 2 — Voice Fidelity

**Score:** 3/5

**Positive example:**
> "But none of that matters if it does not run."

**Issues found:**

1. **Self-disclosure deficit** — The entire draft is written in a detached explanatory register. No "I've seen this", "on my team", or "this cost us a week." Jose's voice requires first-person grounding to avoid reading as a polished but generic technical blog post.

2. **Colon reveal** (anti_patterns.md): "The central question for this post is not 'was the output good?' It is: **which part of the workflow are you trying to trust?**" — Exact pattern: tension-building clause, colon, dramatic payoff. Fix: rewrite as a plain declarative sentence.

3. **"Let's get started!"** — AI filler phrase (anti_patterns.md: "let's explore", "let's dive in" family). Remove.

4. **Blockquote misuse** — The series navigation block uses `>` blockquote markup for a self-written structural element. anti_patterns.md: "Blockquotes are for verbatim quotes from named external sources only." Fix: use plain text or a horizontal rule.

**Action:** Add 2–3 first-person self-disclosure moments in the deep-dive sections grounding the A/B test example in lived DS team experience; rewrite the colon reveal as a plain declarative; remove "Let's get started!"; replace the series nav blockquote with plain text.

---

## Pass 3 — Argument Build-up / Logical Flow

**Score:** 4/5

**Thesis (as stated in intro):**
The final document is only one evaluation surface — a Claude Code workflow has at least eight others, and the most dangerous failures are the ones that look like the output passing while the skill trigger, trajectory, or repository state silently failed.

**Weakest point in the argument:**
Transition from "What did the workflow actually do to get there?" to "What state did the workflow leave behind?" — the trajectory section closes on mid-run agent failure, which does not set up file location as the natural next concern; the connection is held by the shared scenario, not by the argument chain.

**Action:** End the trajectory section with "The transcript confirms how the document was built; it does not confirm where it landed" — so the repo state section answers a question the reader already has.

---

## Pass 4 — Section Depth

**Score:** 4/5

**Shallowest section:**
"What does a Claude Code evaluation map look like?" — presents the nine-surface table and the "menu not a checklist" framing clearly, but asserts the three-surface priority for data science without showing the reasoning; a reader with a different workflow has no heuristic to derive which surfaces apply to them.

**Action:** Add 2–3 sentences showing why skills, trajectory, and repo state are the priority three specifically — what property of each surface makes it a silent-failure risk that output checks will miss.

---

## Pass 5 — Actionability

**Score:** 4/5

**Weakest recommendation:**
> "Start with the surfaces where silent failure is most likely for your specific workflow." — meta-advice with no portable decision rule for teams outside the DS / experiment documentation context.

**Action:** Add a two-sentence decision heuristic to the closing: if the workflow writes files → lead with repo state; if it selects among multiple skills → lead with trigger evals; if it reads context before generating → lead with trajectory evals.

---

## Pass 6 — Audience Specificity

**Score:** 3/5

**Most generic section:**
"What about the other six surfaces?" — hooks, subagents, cost and latency, and instruction following are described in entirely generic engineering terms with no DS-specific examples; a frontend or platform engineer could read the section without friction.

**Action:** Add one concrete DS-team example per surface in the six-surfaces section (e.g. a hook eval for a feature-engineering pipeline, a cost eval for routing Haiku vs Sonnet on experiment summaries); anchor at least one moment in Jose's personal experience operating these workflows.

---

## Overall

| Dimension | Score |
|-----------|-------|
| Voice fidelity | 3/5 |
| Argument flow | 4/5 |
| Section depth | 4/5 |
| Actionability | 4/5 |
| Audience specificity | 3/5 |
| **Average** | **3.6/5** |

---

## Publish Readiness Verdict

### Revise first

Two scored dimensions at 3 (voice fidelity and audience specificity): the post lacks Jose's self-disclosing first-person voice almost entirely and the "other six surfaces" section is generic engineering content with no DS-specific grounding.

### Priority actions

1. **Voice + anti-patterns (Sections 2–4):** Add 2–3 first-person self-disclosure moments anchoring the A/B test example in Jose's actual DS team experience; rewrite the colon reveal as a plain declarative; remove "Let's get started!"; convert the series nav blockquote to plain text.

2. **Audience specificity ("What about the other six surfaces?"):** Add one DS-team concrete example per surface and anchor at least one moment in Jose's personal experience — this is the only section a frontend engineer could read without noticing it was written for data practitioners.

3. **Argument + closing ("Key takeaways" + trajectory→repo transition):** Add the two-sentence decision heuristic (writes files → repo state; selects skills → trigger evals; reads context → trajectory) to the closing; add one bridging sentence at the end of the trajectory section pointing toward file location as the remaining open question.
