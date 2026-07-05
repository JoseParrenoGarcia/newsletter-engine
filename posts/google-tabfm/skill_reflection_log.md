## 2026-07-05 — /review

**Verdict logic edge case: ✗ structural element inflating severity**
The deterministic verdict rule triggered "Major rework needed" because of one ✗ structural element (missing subtitle). The subtitle is a one-line addition, not a structural rework. The rule does not distinguish between a missing subtitle and a missing closing section or missing intro — both trigger the same verdict. The review_report.md includes a clarifying note ("Note: 'Major rework needed' triggered by missing subtitle — substantive work is two targeted additions"), but the skill instruction could add a carve-out: if the only ✗ is a subtitle/deck line, downgrade verdict to "Revise first" unless the subtitle is explicitly required by the type-specific guide.

**Workaround: synthesiser ran in main session**
The skill instruction says to spawn all 3 critics in parallel and then synthesise. The synthesiser step runs in the main session after critics return. This worked cleanly but required manually collecting scores from three background task notifications. No adaptation needed — just noting that the synthesiser is implicitly the main session, not documented explicitly in the skill.

**No other issues.** All three critics returned clean, structured output. The ToC sync check passed without issues. post.yaml was updated correctly after the report was written.

---

## 2026-07-05 — /seo

**No issues encountered.** The SEO subagent ran cleanly. All assessment areas resolved without adaptation. The draft's question-format H2s meant the AI discoverability score was partially pre-satisfied, reducing the revision burden. The contrarian title recommendation was well-matched to the post's thesis — no ambiguity in the title-styles.md guidance.

One observation worth noting for future runs: the draft was 31% over the target word count (6,564 vs 5,000). The SEO brief flagged this under readability but did not prescribe a specific trimming target or which sections to cut. The revise skill would benefit from a concrete word-count delta in the Quick Wins when over-length is flagged — "trim ~1,500 words, primarily from section X" is more actionable than "draft runs over target."

---

## 2026-07-05 — /research

**Adaptation: sources split across two files**
The skill instruction assumes all URLs live in `notes.md`. In this post, the research dossier (`google_tabfm_cleaned.md`) held all 14 URLs and `notes.md` had none. The subagent prompt was manually amended to also scan `google_tabfm_cleaned.md`. The skill instruction could note: "if `notes.md` has no URLs, check for other `.md` files in the post folder that may contain source lists."

**Adaptation: hard cap raised from 10 to 20**
The skill instruction caps sources at 10. The dossier already had 14 URLs before any gap-fill, so the cap was raised in the subagent prompt to 20. The instruction should probably say "hard cap of 10 *new* sources added via search" rather than 10 total, or make the cap configurable based on incoming URL count.

**Two sources unreachable: PriorLabs signup walls**
Both `priorlabs.ai/technical-reports/tabpfn-2-5-model-report` and `priorlabs.ai/technical-reports/tabpfn-3` returned signup walls and were dropped. The subagent handled this correctly per the "drop silently" instruction. No action needed on the skill, but worth noting for the draft stage: these two sources are unavailable and should not be cited.

**No other issues.** Chrome DevTools MCP searches worked cleanly. All 6 gap-fill searches returned usable arXiv papers. No domain variety violations.
