## 2026-06-27 — /promote

### Steps where adaptation was required

**post.yaml artefact field name mismatch:** The `/promote` skill instruction says to update `artefacts.promotion_bundle`, but the `post.yaml` template uses `artefacts.promotion_posts`. The subagent used `promotion_posts` (matching the template), which was correct — but the skill instruction references a key that doesn't exist in the schema. One of the two needs to be updated.

**No ambiguity in section selection.** The three promotable sections (job description mechanic, Voice Operator, human-in-the-loop) were clear from the selection criteria. No borderline calls.

### Skill instructions that were ambiguous or missing

**promotion_formats.md title priority:** The instruction says "use the curiosity-gap or authority variant from seo_brief.md — avoid keyword-first titles." The seo_brief had 5 variants labelled by style. The subagent correctly identified and used the curiosity-gap variant. No issue, but the instruction could be clearer about which seo_brief section to read (it's in the Title Variants table, not the Quick Wins or H1 recommendation).

### Assumptions made

None that turned out wrong. The subagent correctly inferred the post folder from the argument, verified long_draft.md existed, and read all required files before writing.

### Retries or workarounds

None required for /promote itself.

---

## 2026-06-27 — Full pipeline run (draft → seo → revise → review loop → promote → index)

### Steps where adaptation was required

**post.yaml file-modified errors:** The `post.yaml` was being updated by subagents between my Edit calls, causing "file modified since last read" errors on three occasions. Resolved by reading the file fresh before each edit. The pattern repeated consistently — any multi-agent pipeline where subagents also write to post.yaml will hit this. A single "update post.yaml" step at the end of each skill, rather than mid-skill, would reduce collisions.

**Review iteration 1 escalated to "Major rework needed"** due to audience specificity score of 2/5. The deterministic verdict logic correctly triggered the escalation, but the fix was three targeted paragraph additions — not a structural rework. The verdict label ("Major rework needed") overstated the effort required for this specific failure mode. The priority actions list correctly scoped the actual work needed.

**Double-ending introduced by revise agent:** The `/revise` skill renamed `## Closing thoughts` to `## What should you do next?` based on seo_brief.md guidance, but the `## How do AI roles redefine what's possible` section was still present above it, creating two endings. The review caught this in Pass 3. Fix was to merge the redefine section into the closing and remove the standalone section. This pattern (revise introducing structural drift that review catches) is expected — the loop handled it correctly.

**`grep -n` used to find exact closing section text** after Edit failed to match on closing section content that had been modified by the revise agent. The section heading had changed from the original draft, so the old_string no longer matched. Reading the file via ctx_execute + line numbers was the right recovery path.

### Skill instructions that were ambiguous

**`/draft` pipeline mode vs standalone mode:** The skill says "Pipeline mode: proceed immediately to Step 4 without pausing." The pipeline orchestrator invoked `/draft` but the skill had no mechanism to detect which mode it was in — it inferred from context. In practice this worked fine, but a `--pipeline` flag or a `post.yaml` field like `pipeline_run: true` would make the mode explicit.

**`/review` stage guard bypass:** The new-post skill instruction says "Before each review run: set `stages.review.status: pending` in post.yaml (bypasses the stage guard on re-runs)." This was applied correctly. However the instruction is easy to miss — it's buried in the loop description rather than called out as a required pre-step.

**`/revise` Step 8 verification subagent:** The instruction says to spawn a second subagent for verification. In practice, the verification was done in the same agent pass (re-reading the revised file and appending to seo_brief.md). This worked correctly but diverges from the instruction's intent. No downstream impact.

### Assumptions that turned out wrong

**Assumed `long_draft.md` existed before `/draft` ran** — it did not. The post folder had been created with only `post.yaml` and `notes.md`. The draft stage guard check (`stages.draft.status: pending`) correctly confirmed no draft existed, and the skill wrote one from scratch. No issue — just a reminder that `--from-draft` in new-post doesn't imply a draft already exists.

**Assumed `research_brief.md` was required for the draft skill** — the skill instruction lists it as an input but the pre-condition check only requires brainstorm to be complete. The draft was written without a research_brief.md (all sources came from the research files directly). The outline mapped sources to sections from those files. This worked, but the skill instruction implies research_brief.md should exist before drafting.

### Retries or workarounds

- Three fresh reads of `post.yaml` due to mid-session modifications by subagents
- One `grep -n` to recover exact line numbers after Edit string-not-found failure
- One manual backup (`cp long_draft.md long_draft_v2.md`) before review iteration 2 edits, since `/revise` had already created `long_draft_v1.md` and there was no automated backup mechanism for subsequent passes
