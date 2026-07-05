## 2026-07-05 — /research

**Adaptation: sources split across two files**
The skill instruction assumes all URLs live in `notes.md`. In this post, the research dossier (`google_tabfm_cleaned.md`) held all 14 URLs and `notes.md` had none. The subagent prompt was manually amended to also scan `google_tabfm_cleaned.md`. The skill instruction could note: "if `notes.md` has no URLs, check for other `.md` files in the post folder that may contain source lists."

**Adaptation: hard cap raised from 10 to 20**
The skill instruction caps sources at 10. The dossier already had 14 URLs before any gap-fill, so the cap was raised in the subagent prompt to 20. The instruction should probably say "hard cap of 10 *new* sources added via search" rather than 10 total, or make the cap configurable based on incoming URL count.

**Two sources unreachable: PriorLabs signup walls**
Both `priorlabs.ai/technical-reports/tabpfn-2-5-model-report` and `priorlabs.ai/technical-reports/tabpfn-3` returned signup walls and were dropped. The subagent handled this correctly per the "drop silently" instruction. No action needed on the skill, but worth noting for the draft stage: these two sources are unavailable and should not be cited.

**No other issues.** Chrome DevTools MCP searches worked cleanly. All 6 gap-fill searches returned usable arXiv papers. No domain variety violations.
