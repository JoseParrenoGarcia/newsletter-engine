# Review Report: Claude Code agents: what they actually are

**Post:** `claude-code-agents-explained`
**Draft reviewed:** `long_draft.md`
**Reviewed:** 2026-04-02 (iteration 3 — final)

---

## Panel Consensus

| Critic | Covers | Preliminary verdict |
|--------|--------|---------------------|
| Voice & Audience | Voice fidelity, Audience specificity | Ready |
| Structure & Depth | Structural completeness, Section depth | Ready |
| Impact & Argument | Argument build-up, Actionability | Revise first |

**Consensus:** Split 2:1 — Voice & Audience and Structure & Depth say "Ready"; Impact & Argument says "Revise first." Argument flow (3) and Actionability (3) both trigger "Revise first" deterministically regardless of the other two critics.

---

## Pass 1 — Structural Completeness

| Element | Status | Note |
|---------|--------|------|
| Intro: anecdote → framing → thesis | ✓ | Opens with personal scene (newsletter pipeline), moves to framing, thesis explicit before first H2 |
| Subtitle/deck line | ✓ | Italicised deck line present immediately under H1 |
| Preview section (named ##) | ✓ | "What this post covers" with correctly formatted bold-label bullets |
| Main body H2 sections (5–8) | ✓ | 8 H2 sections; all noun/verb-phrase declarations |
| Closing thoughts (named ##) | ✓ | Named section with synthesis prose; not a trailing content paragraph |
| Now, I want to hear from you (##) | ~ | Present with 3 questions; third question ("How are you handling tool access?") is operational rather than argument-tied |

---

## Pass 2 — Voice Fidelity

**Score:** 4/5

**Positive example:**
> "A data quality checker that runs on every pipeline definition. A model validation agent that reads experiment logs and flags regressions. A notebook reviewer that checks for hardcoded credentials and unreproducible cells."

**Issue (if any):**
> "This is the distinction that causes the most friction, so it's worth being precise." — "it's worth being precise" is a soft echo of the anti-pattern "it is worth mentioning"; hedges instead of just being precise.

**Action:** Cut "so it's worth being precise" — open the next sentence directly.

---

## Pass 3 — Argument Build-up / Logical Flow

**Score:** 3/5

**Thesis (as stated in intro):**
Agents are isolated execution contexts with their own context window, prompt, tools, and permissions — distinct from skills — and a single well-configured agent delivers most of the value without requiring multi-agent orchestration.

**Weakest point in the argument:**
"A quick look at agent teams" — the thesis explicitly says "full orchestration belongs in a separate conversation," yet the section spends substantial space on agent teams, diluting the argument's focus and creating a scope contradiction.

**Action:** Cut the agent teams section to a single paragraph with a forward-pointer ("Agent teams are a separate, experimental layer — a future post covers them in detail"), or reframe the thesis to explicitly include them as in-scope.

---

## Pass 4 — Section Depth

**Score:** 4/5

**Shallowest section:**
"A quick look at agent teams" — describes what agent teams are and lists tradeoffs accurately, but the closing heuristic ("the moment one subagent needs to hand off findings to another") is underdeveloped into a concrete decision rule.

**Action:** None — score ≥ 4. Optional: extend with one concrete before/after scenario.

---

## Pass 5 — Actionability

**Score:** 3/5

**Weakest recommendation (if any):**
> "One agent, configured carefully, is a reasonable afternoon's work." — tells the reader how long something takes but gives no concrete starting instruction.

**Action:** Add a minimum-viable-agent recipe immediately following this sentence: create a `.md` file in `.claude/agents/`, write a one-sentence description as a routing rule, restrict tools to 2–3, test with one representative task.

---

## Pass 6 — Audience Specificity

**Score:** 4/5

**Most generic section (if any):**
"Why Claude Code subagents exist" — context-window explanation uses software-engineer framing before DS examples arrive; DS grounding lands late (only in Best Practices and Closing thoughts).

**Action:** None — score ≥ 4. Optional: add one DS-specific sentence early in "Why subagents exist."

---

## Overall

| Dimension | Score |
|-----------|-------|
| Voice fidelity | 4/5 |
| Argument flow | 3/5 |
| Section depth | 4/5 |
| Actionability | 3/5 |
| Audience specificity | 4/5 |
| **Average** | **3.6/5** |

---

## Publish Readiness Verdict

### Revise first

Argument flow (3) and Actionability (3) are below threshold — the "agent teams" section contradicts the thesis's stated scope, and the closing practical guidance stops at framing rather than giving the reader a concrete starting recipe.

### Priority actions

1. **Resolve the agent-teams scope contradiction** — the thesis says full orchestration belongs elsewhere; the section contradicts that by covering agent teams in detail. Either cut to one paragraph with a forward-pointer, or update the thesis scope.
2. **Add a minimum-viable-agent recipe** after "One agent, configured carefully, is a reasonable afternoon's work" — file location, minimum fields, how to test routing. One concrete recipe lifts Actionability off 3.
3. **Cut "so it's worth being precise"** in the Agents vs Skills section — minor voice fix, opens the following sentence more cleanly.
