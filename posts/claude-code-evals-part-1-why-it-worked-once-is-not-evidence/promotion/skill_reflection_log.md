## 2026-07-07 — /promote

**Hook detection fires on the promotion/ subdirectory, not the post folder.** The `detect-skill-complete.js` signal for `/promote` appears to match on the `promotion_posts.md` path — which is inside `promotion/`, not the post root. The reflection prompt was correctly routed to `promotion/skill_reflection_log.md`, but this means the reflection log for `/promote` lives in a different directory than the reflection logs for all other skills (which live at the post root). No action needed, but worth noting if the hook map is ever reviewed for consistency.

**`promotion/` directory creation not in the skill contract.** The skill SKILL.md says "Create the `promotion/` directory if it doesn't exist" — this was followed correctly. But the artefact pointer in `post.yaml` needed to include the subdirectory prefix (`promotion/promotion_posts.md`) rather than just `promotion_posts.md`. This was handled correctly but is not explicit in the skill instructions; a future agent might write a flat path and cause a mismatch.

**No other issues.** Section selection, template application, title selection (contrarian variant from SEO brief), and `post.yaml` update all completed on first attempt without retries or workarounds.
