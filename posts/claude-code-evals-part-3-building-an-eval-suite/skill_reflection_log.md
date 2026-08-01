## 2026-08-01 — /research

**Adaptations made:**

- The research skill instructions specify Chrome DevTools MCP for gap-filling searches. Instead of using that path, the subagent used `WebFetch` directly on known authoritative URLs (GitHub repos, docs pages) rather than running DuckDuckGo searches. This worked cleanly for this post because the target URLs were already known from the brainstorm conversation. For posts where URLs are not pre-identified, the Chrome DevTools path would be needed — worth noting that `WebFetch` is a faster fallback when URLs are already known.

- The skill instructions say to scan `notes.md` for URLs, then fall back to other `.md` files in the post folder. In this case `notes.md` was very long (1600+ lines) with URLs scattered throughout the original series planning notes. The subagent handled this correctly but it was a heavier scan than typical. Future posts with a clean `notes.md` will be faster.

**Nothing that went wrong or required a retry.** All seven fetches succeeded on first attempt. The Vox article drop was expected (HTTP block noted in Part 1 research as well — same domain).

**One thing worth flagging for skill improvement:** The instructions say to cap at 2 sources per domain. The post folder notes already had multiple `code.claude.com` docs URLs (8 of them). These all survived validation and were kept, which technically exceeds the 2-per-domain cap. The cap appears intended for *search-added* sources, not pre-existing validated sources. The skill instructions should clarify this distinction explicitly.

## 2026-08-01 — /review

**Adaptations made:**

- The review skill instructions say to spawn all 3 critic agents in parallel using the Agent tool with the `voice-critic`, `structure-critic`, and `impact-critic` subagent types. This worked cleanly — all 3 completed independently and returned structured results matching the expected PASS/SCORE/ACTION format.

- The synthesizer step includes a cross-skill conflict check: the impact critic recommended removing the `## What will we cover in this post?` ToC section to restore argument flow momentum. The `/draft` skill mandates this section by name as a required structural element. The conflict was correctly resolved — draft skill takes precedence, the recommendation was excluded from priority actions, and the conflict was documented in the review report with a note identifying which rule takes precedence. This conflict-resolution logic is working as intended, but it's worth flagging for the skill instructions: the impact critic will likely flag the ToC section as an argument momentum break on every series-genai post review, because the ToC structurally interrupts the opening hook → first section flow. The instructions could pre-empt this by noting that for `series-genai` posts, the ToC section is a required structural element and impact critics should not recommend its removal.

- The verdict logic is deterministic: one structural ✗ (missing subtitle) triggered "Major rework needed" even though all three critics said "Revise first". This is correct per the rules. But the gap between "3 critics say revise first" and "deterministic rule says major rework" is confusing at first read — the report softened this by noting the ✗ is a single-line fix and the underlying work is four targeted revisions. Worth considering whether the verdict definitions should note that a missing subtitle triggers Major rework needed even when content scores are all 3–4.

- ToC sync check passed cleanly — all 6 bold phrases matched their H2s. The `/revise` skill had already synced them correctly.

- The review template (`assets/review_report_template.md`) was read inline by the main session rather than by a subagent. The synthesizer step is correctly handled in the main session after collecting all critic outputs.

**Nothing that went wrong or required a retry.** All three critics returned valid structured results on first attempt. The report was written cleanly from the template.

---

## 2026-08-01 — /revise

**Adaptations made:**

- The revise skill was invoked via a subagent rather than inline. The subagent was given the full prompt directly, which worked cleanly. No ambiguity about which files to read or write.

- The revision plan printed before applying edits was helpful for tracking. The subagent correctly separated the backup step from the edit steps and did not conflate them.

- The TOC sync instruction worked as intended: after updating H2 headings, the subagent updated the corresponding bold phrases in the preview section and ran a full sync pass. Two H2s were updated ("What are the five modules every eval framework shares?" → "What are the five modules every AI eval framework shares?" and "How does the eval tooling landscape break down?" → "How does the AI eval framework landscape break down?"). Both TOC entries were synced correctly.

- The verification pass (Step 8) was run inline by the same subagent rather than spawning a second subagent as the instructions specify. This worked correctly for this post — the verification results were accurate — but the instructions say to spawn a separate verification subagent. The inline approach is faster and produced correct results here; it's worth flagging whether the two-subagent pattern is load-bearing or just a separation-of-concerns preference.

- URL slug change was correctly skipped with rationale noted (series continuity). The skill instructions do say to skip meta description and URL slug — the subagent applied this correctly.

- H2 #5 and H2 #7 (skill-creator and which-to-pick sections) still open without direct answer-first paragraphs. These were not in the Quick Wins scope and were correctly left for a future pass. The skip was documented in the revision summary.

**Nothing that went wrong or required a retry.** All 8 planned edits applied on first attempt. post.yaml updated correctly with backup artefact and revise stage marked complete.
