## 2026-05-29 — /promote

**Steps where I had to adapt:**

- The `/promote` skill instruction says to "spawn a subagent" in some skill variants but `/promote` does not — it describes execution steps directly. I ran the skill inline rather than delegating to a subagent. This was consistent with the instruction but different from the pattern used by `/seo`, `/revise`, and `/review`. No issue in practice, but worth noting for consistency if the skill is ever refactored to match the subagent pattern.

- The promotion directory did not exist. The skill instruction says "create the `promotion/` directory if it doesn't exist" — I ran `mkdir -p` before writing the file. This worked cleanly.

**Ambiguous or missing instruction:**

- The skill says to use the "curiosity-gap or authority variant" from `seo_brief.md` for the launch post title. The SEO brief explicitly recommends the Contrarian variant ("You Don't Need GPT-5") for Medium card display, but the selection criteria file says to avoid keyword-first titles and prefer curiosity-gap or authority. These two inputs gave slightly conflicting guidance. I used the curiosity-gap variant ("The 7-Month Gap That Doesn't Matter") for the launch post, treating the section-selection-criteria.md rule as authoritative for social posts. The contrarian variant was noted in the SEO brief summary but not used. If the intent is to always honour the SEO brief's recommended variant regardless of style, the skill instruction should say so explicitly.

**Assumptions that held:**

- Assumed `post.yaml` artefact key for promotion output should be `promotion_posts` pointing to `promotion/promotion_posts.md` (not just `promotion_posts.md`). This matched the path written and the existing artefact pattern.

**No retries or workarounds required.**
