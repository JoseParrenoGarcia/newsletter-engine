# Review Report: The model provider is coming for your implementation team

**Post:** `ai-labs-becoming-consultancies`
**Draft reviewed:** `long_draft.md`
**Reviewed:** 2026-06-17

---

## Panel Consensus

| Critic | Covers | Preliminary verdict |
|--------|--------|---------------------|
| Voice & Audience | Voice fidelity, Audience specificity | Revise first |
| Structure & Depth | Structural completeness, Section depth | Ready |
| Impact & Argument | Argument build-up, Actionability | Revise first |

**Consensus:** Split — 2 of 3 say Revise first. The actionability score of 2/5 (Impact & Argument) applies the "Major rework needed" threshold on a single dimension; however, the issue is isolated to one section ("What DS and tech leaders should do") rather than systemic, so the panel consensus lands on Revise first rather than Major rework. The two decisive criteria are actionability and voice fidelity — both need one targeted revision pass.

---

## Pass 1 — Structural Completeness

| Element | Status | Note |
|---------|--------|------|
| Intro: anecdote → framing → thesis | ~ | Opens strong with rhetorical reframing and clear thesis; no personal anecdote or specific scene. Acceptable for series-genai type (thesis-first opening is correct). |
| Subtitle/deck line | ✗ | No italicised deck line under H1. Standard SEO and platform convention — needed for Medium/Substack publishing. |
| Preview section (named ##) | ✓ | Present with correct bold-label bullet format. |
| Main body H2 sections (5–8) | ✓ | Seven substantive sections, all question-format after revise pass, correctly ordered. |
| Closing thoughts (named ##) | ✓ | Named "What the AI deployment wave means for your team" — synthesis prose, not recycled section content. |
| Now, I want to hear from you (##) | ✓ | Three specific questions tied to the post's argument. |

---

## Pass 2 — Voice Fidelity

**Score:** 3/5

**Positive example:**
> "The model works. The organisation does not yet know how to absorb it. Someone has to close that gap."

**Issues:**

1. Self-disclosing first person is almost entirely absent across ~5,000 words. The voice guide requires "I" when grounding a claim in lived experience. The "What DS and tech leaders should do" section is the longest stretch — three recommendations with no first-person grounding, no team scenario, no named challenge from Jose's own experience.

2. The bold-on-full-sentences pattern in the closing section violates anti_patterns.md: bold marks a concept being defined or a key finding stated, not full running sentences for emphasis (e.g. "**What OpenAI and Anthropic are building is the deployment layer...**").

3. Minor transition announcement: "That distinction matters for understanding both what they are targeting and what they are not." — this is a meta-commentary transition per anti_patterns.md. Remove.

**Action:** Add at least two self-disclosing first-person moments — one in the takeaways section grounding a recommendation in something Jose has seen, one earlier in the post to establish personal stake. Rewrite the three bolded full-sentences in the closing to plain prose with the bold stripped.

---

## Pass 3 — Argument Build-up / Logical Flow

**Score:** 4/5

**Thesis (as stated in intro):**
OpenAI and Anthropic have built structured deployment arms targeting large enterprise, regulated industries, and PE-backed portfolios — understanding who they are and are not targeting reveals where the ecosystem is heading and what skills compound for DS and tech leaders.

**Weakest point in the argument:**
"Why does the consulting layer always return?" — the intro already concedes this premise ("they have run into the same wall every major enterprise technology wave runs into"), so the section proves what the reader has already accepted rather than advancing toward new territory. The ERP/RPA/cloud evidence is solid but arrives two sections too late to do argumentative work.

**Action:** Compress the historical pattern section to two paragraphs and relocate the core insight ("capability is not deployment; the consulting layer returns because organisations are complicated") as supporting context inside the "Who are they targeting" section, removing the standalone H2.

---

## Pass 4 — Section Depth

**Score:** 4/5

**Shallowest section:**
"Who are they targeting — and who are they not?" — names the three customer segments clearly but ends on reassurance ("the FDE model is not arriving in your building next quarter") rather than a genuine reframe. Missing: what Anthropic's mid-market carve-out as a GSI-conflict concession reveals about the fragility of its ecosystem strategy — a non-obvious implication the reader could not have drawn from the announcements alone.

**Action:** Add one paragraph extracting the non-obvious implication from Anthropic's mid-market carve-out — specifically, what it reveals about the tension between Anthropic's partner ecosystem and its own deployment ambitions.

---

## Pass 5 — Actionability

**Score:** 2/5

**Weakest recommendation:**
> "Watch what they codify. Watch which patterns become templates. And build the internal version of the operating model before someone else builds the external one for you."

Names a direction but provides no concrete deliverable, no named role, no format, and no starting point a reader could act on this week. All three recommendations follow the same pattern: a directional claim ("watch this", "understand that") with no owner, no cadence, no artefact.

**Action:** Rewrite each of the three takeaways to include at least one concrete, owned action. For example: takeaway 3 could close with — "A useful starting point: run a half-day session with your team to answer three questions in writing: who owns evals when the model updates, who owns prompt version governance, and what the escalation path is when an agent touches a live workflow. Document the answers. That one-page decision log is the beginning of an internal deployment operating model."

---

## Pass 6 — Audience Specificity

**Score:** 4/5

**Most generic section:**
"Why does the consulting layer always return?" — the ERP/RPA/cloud historical pattern is correct but contains no DS-specific grounding. A retail operations lead or an SAP consultant could read this section without modification. Missing: a parallel from how DS teams experienced the analytics-to-production gap before MLOps tooling existed, which is the exact pattern the target reader already lived through.

**Action:** Add one DS-specific analogy inside this section — e.g. how the analytics-to-production gap in DS created the MLOps category — to anchor the historical pattern to what the target reader already knows.

---

## Overall

| Dimension | Score |
|-----------|-------|
| Voice fidelity | 3/5 |
| Argument flow | 4/5 |
| Section depth | 4/5 |
| Actionability | 2/5 |
| Audience specificity | 4/5 |
| **Average** | **3.4/5** |

---

## Publish Readiness Verdict

### Revise first

The analytical core and sourcing are strong, but the practical guidance section reads as directional commentary rather than executable advice, and the near-total absence of first-person voice means the post reads as authoritative enterprise analysis rather than Jose's distinctive peer-level register.

### Priority actions

1. **Rewrite the three takeaways in "What DS and tech leaders should do"** to include concrete, owned actions — at minimum, takeaway 3 needs a specific starting task a reader can do this week (e.g. the half-day decision log session described above).
2. **Add two first-person grounding moments** — one in the takeaways section anchoring a recommendation to something Jose has seen on his team; one earlier (opening or FDE section) to establish personal stake.
3. **Remove the subtitle gap and bold-on-sentences violations** — add a deck line under the H1; strip bold from the three full running sentences in the closing section.
