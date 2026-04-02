# Review Report: Claude Code agents: what they actually are

**Post:** `claude-code-agents-explained`
**Draft reviewed:** `long_draft.md`
**Reviewed:** 2026-04-01

---

## Panel Consensus

| Critic | Covers | Preliminary verdict |
|--------|--------|---------------------|
| Voice & Audience | Voice fidelity, Audience specificity | Revise first |
| Structure & Depth | Structural completeness, Section depth | Revise first |
| Impact & Argument | Argument build-up, Actionability | Ready |

**Consensus:** Split — 2× Revise first, 1× Ready. Resolved by deterministic rule: Audience specificity score = 2 (≤ 2) triggers **Major rework needed**.

> **Synthesizer note:** The Structure & Depth critic marked `STRUCT_SUBTITLE: ✗` (missing), but the draft does include an italicised deck line immediately under the H1: `*A ground-up guide to subagents — Claude Code's custom subagent primitive…*`. This is corrected to ✓ before applying verdict logic. The subtitle is not a blocking gap.

---

## Pass 1 — Structural Completeness

| Element | Status | Note |
|---------|--------|------|
| Intro: thesis/contrarian reframe | ✓ | Opens with clear contrarian reframe ("That mental model is wrong") and explicit thesis before first H2 |
| Subtitle/deck line | ✓ | Italicised deck line present immediately under H1 (critic error — it IS there) |
| Preview section (named ##) | ✓ | "What this post covers" present with correctly formatted labelled bullets |
| Main body H2 sections (5–8) | ✓ | 8 content H2s; all noun/verb-phrase declarations |
| Closing thoughts (named ##) | ✓ | Dedicated synthesis section; reframes thesis rather than restating content |
| Now, I want to hear from you (##) | ~ | Section present with 3 questions, but all 3 assume active agent usage — readers who haven't tried the feature yet (the stated target audience) have nothing to answer |

---

## Pass 2 — Voice Fidelity

**Score:** 4/5

**Positive example:**
> "Context is finite. That's the starting point."

**Issue (if any):**
> "crucial" — appears as a filler intensifier in one instance (anti_patterns.md: "crucial", "critical" used as filler intensifiers, not specific claims)

**Action:** Scan for "crucial" and "critical"; replace with a specific claim or delete the intensifier.

---

## Pass 3 — Argument Build-up / Logical Flow

**Score:** 4/5

**Thesis (as stated in intro):**
Subagents are not skills — they are isolated execution contexts with their own context window, system prompt, tool access, and permissions; understanding this distinction changes every design decision.

**Weakest point in the argument:**
"A quick look at agent teams" — the section is the one piece the post could remove without weakening the thesis; it introduces an explicitly out-of-scope feature and its closing sentence borrows a doc quote rather than earning a transition to the next section.

**Action:** Either cut the standalone H2 and fold agent teams into a parenthetical in "The naming problem" section (where they are already defined), or close the section with a concrete decision rule in Jose's own words rather than a doc quote.

---

## Pass 4 — Section Depth

**Score:** 4/5

**Shallowest section:**
"A quick look at agent teams" — describes the feature and its tradeoffs accurately but ends on a verbatim doc quote ("If you're running parallel subagents but hitting context limits…") rather than an original frame or portable judgment call.

**Action:** Close the section with a concrete trigger condition in Jose's own words — e.g. "The signal is simple: if your subagents need to talk to each other, you've outgrown them." — so the reader leaves with something earned, not a citation.

---

## Pass 5 — Actionability

**Score:** 4/5

**Weakest recommendation (if any):**
> "Write in specific, behavioural terms. Describe what the agent does and when to use it." — directionally correct but the surrounding prose stays general before revealing the concrete pattern.

**Action:** Promote the template pattern — `"<agent does X>. Use proactively after <trigger>. Do not use for <exclusion>."` — as the lead example before the explanatory prose, so practitioners see the model first.

---

## Pass 6 — Audience Specificity

**Score:** 2/5

**Most generic section:**
"Why Claude Code subagents exist" and "Best practices for Claude Code subagents" — the failing-test-suite investigation scenario, the code-reviewer agent, the TypeScript/SQL/Kubernetes community examples are all valid but connect to no DS/ML context. Every section could appear in a generic SWE blog with zero edits. A data science lead would find nothing that speaks to their specific world: model evaluation pipelines, feature engineering workflows, A/B test orchestration, post-experiment code review, ML pipeline monitoring.

**Action:** Add one DS-specific grounding example — e.g. "a subagent that runs offline model evaluation in an isolated context, keeping evaluation artefacts out of the main session" or "a post-merge reviewer scoped to pipeline code only, with tools restricted to Read and Grep" — so at least one scenario speaks directly to the reader's daily work.

---

## Overall

| Dimension | Score |
|-----------|-------|
| Voice fidelity | 4/5 |
| Argument flow | 4/5 |
| Section depth | 4/5 |
| Actionability | 4/5 |
| Audience specificity | 2/5 |
| **Average** | **3.6/5** |

---

## Publish Readiness Verdict

### Major rework needed

Audience specificity scores 2/5 — the post has no DS/ML-specific grounding and reads as a generic SWE/developer explainer, which misses Jose's core "Senior Data Science Lead" readership.

### Priority actions

1. **[Audience — blocking]** Add at least one DS/ML-specific scenario somewhere in the post — model evaluation subagent, ML pipeline reviewer, feature store investigation — so the reader's context is reflected at least once. One paragraph added to "Why Claude Code subagents exist" or "Your first Claude Code subagent" would address the gap without restructuring anything.

2. **[Reader questions — ~]** Reframe at least one "Now, I want to hear from you" question to include practitioners who haven't tried agents yet — e.g. "What's the task you've been doing manually that feels like it should be delegated to an agent?" — matching the stated target audience.

3. **[Agent teams section — depth]** Close "A quick look at agent teams" with a concrete decision rule in Jose's own words rather than a borrowed doc quote — so the section ends with an earned observation, not a citation.
