# SEO Brief: Claude Code Plugins: How to Build, Version, and Maintain Them

**Post folder:** `posts/claude-code-plugins/`
**Date:** 2026-06-06

---

## 1. Suggested Keywords

**Primary keyword:** `claude code plugins`
**Secondary keywords:**
- `build claude code plugin`
- `claude plugin.json manifest`
- `claude code plugin versioning`
- `distribute claude code plugins`
- `claude plugin marketplace`

*Note: Keywords extracted from draft content and thesis. No search volume data — validate with a keyword tool before publishing.*

---

## 2. Meta Description

**Recommended (≤160 chars):**
> Claude Code plugins are a packaging format, not a new primitive. Learn how to build, version, and distribute them — from first manifest to controlled rollout.

- Primary keyword included: Yes
- Call to action present: Yes (implied — "Learn how to")
- Character count: 159

---

## 3. URL Slug

**Current slug:** `claude-code-plugins`
**Recommended slug:** `claude-code-plugins`
**Change needed:** No — slug contains the primary keyword cleanly.

---

## 4. H1 Recommendation

**Current H1:** `Claude Code Plugins: How to Build, Version, and Maintain Them`
**Assessment:** Strong. Primary keyword leads. Action-oriented subtitle. Keep as-is.
**Recommendation:** Keep as-is.

---

## 5. H2/H3 Structure Review

| # | Current heading | Recommendation |
|---|----------------|----------------|
| 1 | What This Post Covers | keep as-is — serves navigation, not keyword targeting |
| 2 | What Plugins Actually Are — Primitives vs Packaging | reword to: "What Are Claude Code Plugins? — Primitives vs Packaging" |
| 3 | Building Your First Plugin — Directory Structure and Manifest | reword to: "Building Your First Claude Code Plugin — Directory Structure and Manifest" |
| 4 | Distribution — Getting Plugins to Users | keep as-is — "distribution" is a relevant secondary term |
| 5 | Versioning — The Two Strategies and When to Choose | keep as-is |
| 6 | Validation Before Release — What to Test and How | keep as-is |
| 7 | Pushing Updates to Users — Auto-Update and Controlled Rollout | keep as-is |
| 8 | Closing Thoughts | keep as-is — structural heading, not keyword-target |
| 9 | Now, I Want to Hear from You | keep as-is |
| 10 | References | keep as-is |

**Primary keyword in at least one H2:** No (current) → Yes after applying recommendations for H2 #2 and #3.

---

## 6. AI Discoverability

| # | H2 heading | Question format? | Answer block (50–80 w)? | Links in answer zone? |
|---|-----------|-----------------|------------------------|-----------------------|
| 1 | What This Post Covers | ✗ → "What Does This Post Cover?" | ✓ (bullet list is direct and scannable) | ✗ |
| 2 | What Plugins Actually Are — Primitives vs Packaging | ✗ → "What Are Claude Code Plugins? Primitives vs Packaging" | ✓ (opens with a direct definitional statement) | ✗ |
| 3 | Building Your First Plugin — Directory Structure and Manifest | ✗ → "How Do You Build a Claude Code Plugin? Directory Structure and Manifest" | ✓ (opens with scaffold command and rationale) | ✗ |
| 4 | Distribution — Getting Plugins to Users | ✗ → "How Do You Distribute Claude Code Plugins?" | ✗ (opens with a sub-heading rather than an answer block) | ✗ |
| 5 | Versioning — The Two Strategies and When to Choose | ✗ → "How Should You Version a Claude Code Plugin?" | ✗ (opens with sub-heading; no direct answer in first 80 words) | ✗ |
| 6 | Validation Before Release — What to Test and How | ✗ → "How Do You Validate a Claude Code Plugin Before Release?" | ✓ (opens with direct statement of what validate catches) | ✗ |
| 7 | Pushing Updates to Users — Auto-Update and Controlled Rollout | ✗ → "How Do You Push Updates to Claude Code Plugin Users?" | ✓ (opens with clear auto-update mechanics) | ✗ |
| 8 | Closing Thoughts | ✗ (structural — no rewrite needed) | ✓ | ✗ |

**Score: 0 / 8 H2s pass all three checks**

Top flag: No H2 is in question format. Converting 6 of the 8 content H2s to question format is the single highest-leverage AI discoverability improvement.

---

## 7. Keyword Placement Checklist

| Position | Present? |
|----------|----------|
| H1 / Title | ✓ — "Claude Code Plugins" leads the H1 |
| First 100 words | ✓ — "plugins" appears repeatedly; "Claude Code plugins" implied in title context opening |
| At least one H2 | ✗ — no H2 currently contains "claude code plugin" or "claude code plugins" |
| Meta description | ✓ — included in recommended meta description above |
| URL slug | ✓ — `claude-code-plugins` matches primary keyword exactly |

**Score: 4 / 5**

Missing position: at least one H2 — apply reword to H2 #2 or #3 to close this gap.

---

## 8. Readability Assessment

- **Estimated reading level:** Grade 8–10 (technical vocabulary expected and appropriate for the target audience of experienced Claude Code practitioners)
- **Average sentence length:** ~18.9 words — slightly above the plain English target of 15–25; acceptable
- **Long sentences (>30 words):** 18 total — moderately high. Top three to consider trimming:
  - (51w) "They are the difference between 'I shared a folder with you via Slack' and 'you installed a versioned package from a registry' — the same capabilities, but with a deployment model that is auditable, rollback-friendly, and reproducible across environments."
  - (40w) "Every component inside a plugin — skills, agents, hooks, MCP servers, LSP servers, monitors — exists and works identically outside a plugin."
  - (39w) "The Claude Code documentation calls plugins 'a way to share and reuse configuration across projects and teams' — accurate, but the framing undersells what the packaging layer actually gives you."
- **Passive voice instances:** ~13 — slightly elevated but not disruptive. Examples: "is discovered," "are written," "was shared." Acceptable for a technical tutorial.
- **Paragraph length:** Most paragraphs are 2–4 sentences. The Closing Thoughts section has a longer reflective paragraph but it is appropriate for that structural role.
- **Jargon density:** Medium-high — expected for the audience. Key terms: `plugin.json`, `CLAUDE_PLUGIN_ROOT`, `CLAUDE_PLUGIN_DATA`, semver, git-tag convention, MDM, LSP servers, `/reload-plugins`. No glossary needed — terms are explained inline.
- **Overall:** Good — the draft is well-paced for a technical audience; the long-sentence count is the only meaningful readability concern.

---

## 9. Content Quality Signals

- **Word count:** 2,549 words (~10 min read)
- **Target word count:** 3,750 (based on 15 min × 250 wpm)
- **On target:** Off by ~32% short — the draft reads closer to a focused technical reference than a 15-minute narrative guide. Consider expanding the Validation and Pushing Updates sections, or adding a worked example (end-to-end plugin walkthrough) to close the gap.
- **External links:** 5 cited references, all from official Anthropic/Claude Code documentation and the official GitHub repository — high-authority sources, well-matched to the research brief.

---

## 10. Title Variants

| Style | Title | Subtitle |
|-------|-------|----------|
| Keyword-first | **Claude Code Plugins: Build, Version, and Ship Them Right** | A step-by-step guide from first manifest to controlled rollout — covering the parts the docs skip. |
| Curiosity-gap | **Most Claude Code Users Are Just Copying Folders. There's a Better Way.** | Plugins give you versioning, distribution, and rollback — without learning anything new. |
| How-to | **How to Build and Distribute a Claude Code Plugin** | From scaffold to marketplace: directory structure, versioning strategy, and pushing updates to teams. |
| Contrarian | **Claude Code Plugins Don't Add New Capabilities. That's the Point.** | They're a packaging format — and understanding that distinction changes how you build and maintain them. |
| Authority | **I Built a Claude Code Plugin for My Team. Here's the System.** | The complete guide to manifest structure, semver strategy, and controlled rollout — from first commit to production. |

---

## 11. Quick Wins

1. **Reword H2 #2 to a question format and include the primary keyword** — change "What Plugins Actually Are — Primitives vs Packaging" to "What Are Claude Code Plugins? Primitives vs Packaging." This fixes the H2 keyword gap (closes the 4/5 → 5/5 keyword placement score), adds AI discoverability, and improves scannability with no content changes required.

2. **Add an answer block after H2 #4 (Distribution)** — the section currently opens directly with the "Installation Scopes" sub-heading. Add 2–3 sentences before the first H3 that directly answer "how do you distribute a Claude Code plugin?" This is the lowest-effort AI discoverability fix with the highest surface-area impact (the distribution section is the most practically useful for first-time plugin builders).

3. **Convert H2 #5 (Versioning) to question format and add a 60-word answer block** — "How Should You Version a Claude Code Plugin?" followed by a direct recommendation (semver for teams, SHA for single-user projects) closes one of the most searched sub-questions in the topic area and gives AI crawlers a clean extractable answer.

---

## Future: Keyword Volume

*Search volume data not available — no keyword tool connected. Before publishing, validate these terms in Google Search Console, Ahrefs, or Semrush:*

- `claude code plugins` — primary, likely low-volume but high-intent (new feature)
- `build claude code plugin` — how-to intent, worth checking
- `claude plugin.json` — technical long-tail, low volume, high relevance
- `claude code plugin marketplace` — distribution intent

*Prioritise terms that show "people also ask" boxes in Google — those map directly to question-format H2s.*

---

## 12. Post-Revision Verification

**Verified against:** long_draft.md (post-revise)
**Verified on:** 2026-06-06

### Keyword Placement — before → after
| Position | Before | After |
|----------|--------|-------|
| H1 / Title | ✓ | ✓ |
| First 100 words | ✓ | ✓ |
| At least one H2 | ✗ | ✓ — "What Are Claude Code Plugins?" and "How Do You Build a Claude Code Plugin?" both contain primary keyword |
| Meta description | ✓ | ✓ |
| URL slug | ✓ | ✓ |

**Score: 4/5 → 5/5**

### AI Discoverability — before → after
| H2 | Before | After |
|----|--------|-------|
| What Does This Post Cover? | ✗ | ✓ |
| What Are Claude Code Plugins? — Primitives vs Packaging | ✗ | ✓ |
| How Do You Build a Claude Code Plugin? — Directory Structure and Manifest | ✗ | ✓ |
| How Do You Distribute Claude Code Plugins? | ✗ | ✓ |
| How Should You Version a Claude Code Plugin? | ✗ | ✓ |
| How Do You Validate a Claude Code Plugin Before Release? | ✗ | ✓ |
| How Do You Push Updates to Claude Code Plugin Users? | ✗ | ✓ |
| Closing Thoughts | ✗ (structural — no rewrite needed) | ✗ (structural — intentional) |

**Score: 0/8 → 7/8 (the one remaining ✗ is the structural "Closing Thoughts" heading, which the brief flagged as no rewrite needed)**

### Quick Wins — applied?
1. Reword H2 #2 to question format and include primary keyword — ✓ (changed to "What Are Claude Code Plugins? — Primitives vs Packaging")
2. Add answer block after H2 #4 (Distribution) — ✓ (2-sentence block added before "### Installation Scopes")
3. Convert H2 #5 (Versioning) to question format and add 60-word answer block — ✓ (H2 changed to "How Should You Version a Claude Code Plugin?"; 65-word answer block added before sub-headings)

### Verification Verdict
**All fixes applied:** Yes
**Remaining issues:** None — keyword placement 5/5; 7 of 7 content H2s now in question format; all 3 Quick Wins applied.
