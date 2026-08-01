# Outline: What You Actually Need To Test — Claude Code Evals, Part 2

**Target:** ~15 min read (~3,750 words)

---

## Sections

### Opening / intro (~200 words)
- Callback to Part 1: the A/B test document skill passed. The eval confirmed correct headings, no invented metrics, sound statistical reasoning. Good result.
- Pivot: three other things could have silently failed on the same run — the skill never triggered correctly, it drafted from memory instead of reading `docs/metrics.md`, and it saved the document in the wrong folder.
- Thesis: the final document is only one evaluation surface. The right eval depends on which part of the workflow you are trying to trust.
- Sources: none — series continuity

### Series recap (2-3 bullets)
- "In this series so far" recap per series-genai style guide for later parts
- Sources: n/a (structural)

### Preview section (~100 words)
- Labelled bullets, one per major section
- Sources: n/a (structural)

---

### 1. What does the evaluation map look like? (~350 words)
- Introduce all nine surfaces via summary table — one sentence per surface
- Purpose: give the full landscape before the deep dives; make clear the map is a menu, not a checklist
- Note which three will get deep treatment, why those three matter most for DS/ML readers
- Sources:
  - [Claude Code overview](https://code.claude.com/docs/en/overview)
  - [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

---

### 2. How do you know the right skill or agent triggered? [deep dive] (~900 words)
- Three types of skill eval: trigger evals, execution evals, delta evals
- **Trigger evals**: did the right skill fire for "draft an experiment design doc"? Should it NOT fire for "summarise this Python traceback"? Anchored to the description field as the selection interface (from reference post)
- **Execution evals**: once triggered, did it follow the documented workflow? Load the right template? Produce the expected artefact?
- **Delta evals**: is the output with the skill actually better than without? How do you know the skill helped?
- Agents section: same taxonomy applies — agents are skills spawned in a separate context window; trigger/execution/delta evals carry over directly
- YAML example: one positive trigger eval + one negative trigger eval for the experiment-design skill
- Key teaching point: *A skill can fail to show up, or it can show up and do the wrong thing.*
- Sources:
  - [Extend Claude with skills](https://code.claude.com/docs/en/skills)
  - [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
  - [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

---

### 3. What did the workflow actually do to get there? [deep dive] (~900 words)
- The tracer concept: evaluate the path, not just the destination
- Core question: did it read `docs/metrics.md` before drafting, or generate from memory?
- The Anthropic Engineering eval post nuance: don't enforce strict step ordering (too brittle); check that required tools were used at all — `Read docs/metrics.md` appeared before any `Write` call
- Failure modes this catches: drafted from memory (invented metrics passing format checks), unexpected tool calls, premature `Write` before reading context
- A/B test anchor: the metrics reference is ground truth for approved metrics; a tool-use eval that checks `Read docs/metrics.md` appeared catches the case where format checks pass but grounding failed
- YAML example: `must_read: docs/metrics.md`, `must_not_write_before_reading`
- Key teaching point: *The transcript matters because agents can fail in the middle, even when the final message sounds confident.*
- Sources:
  - [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — transcript definition, required-tool checks, not rigid ordering
  - [Claude Code overview](https://code.claude.com/docs/en/overview)

---

### 4. What state did the workflow leave behind? [deep dive] (~900 words)
- Git diff as an eval: the most underused grading surface in Claude Code
- Core question: did the workflow leave the repository in the expected state?
- A/B test anchor: document should land in `docs/experiments/`, no other files changed, no leftover artifacts (intermediate files, scratch notebooks)
- `git diff --name-only` as a one-line grader; `allowed_paths` / `forbidden_paths` as explicit eval criteria
- SWE-bench reference: the canonical coding agent benchmark grades entirely on repository state — does the patch apply cleanly and do the original tests pass? The whole benchmark is built on this surface.
- Why this catches failures output evals miss: the document can be perfectly formatted and land in the repo root; format checks pass, path check fails
- YAML example: `allowed_paths`, `forbidden_paths`, `git_diff_scope` check
- Key teaching point: *A Claude Code run is not complete when it says "done". It is complete when the repository is in the state you expected.*
- Sources:
  - [SWE-bench](https://arxiv.org/abs/2310.06770) — canonical example of repository state as an eval
  - [Claude Code common workflows](https://code.claude.com/docs/en/common-workflows)
  - [Claude Code best practices](https://code.claude.com/docs/en/best-practices)

---

### 5. What about the other six surfaces? (~500 words)
Light tour — one paragraph each. Order: final output (familiar baseline — keep brief), hooks and commands, subagents, cost and latency, human usefulness. Close with: the map is a menu, not a checklist — not every workflow needs all nine.
- **Final output**: covered in depth in Part 1; the baseline every other surface builds on
- **Hooks and commands**: did the post-write validation hook fire? Did it log correctly? Hooks are control-plane tools, not output-quality tools
- **Subagents**: was delegation useful, bounded, and correctly integrated? Did the main agent use the subagent's result?
- **Cost and latency**: can Haiku produce acceptable experiment documents? Run the same eval set on both models and compare pass rates
- **Human usefulness**: some outputs need judgment; the rubric is the grader
- Sources:
  - [Hooks reference](https://code.claude.com/docs/en/hooks)
  - [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
  - [Claude Code memory](https://code.claude.com/docs/en/memory)
  - [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

---

### Closing thoughts (~250 words)
- Pull back to the A/B test skill: it now has a full evaluation map
- Restate the thesis concretely: nine surfaces, the reader knows which three to start with, the map is usable
- Forward pointer to Part 3: the map is not a suite. Part 3 takes one surface, builds the first case, and turns it into a regression test.
- Sources: synthesis — no external source

### Now, I want to hear from you
- 2-3 targeted questions tied to the post's argument
- Sources: n/a (structural)

---

## References (all sources)
- [Claude Code overview](https://code.claude.com/docs/en/overview)
- [Claude Code memory](https://code.claude.com/docs/en/memory)
- [Extend Claude with skills](https://code.claude.com/docs/en/skills)
- [Hooks reference](https://code.claude.com/docs/en/hooks)
- [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code common workflows](https://code.claude.com/docs/en/common-workflows)
- [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- [Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [SWE-bench — arXiv:2310.06770](https://arxiv.org/abs/2310.06770)
- [Dive into Claude Code — arXiv:2604.14228](https://arxiv.org/abs/2604.14228)
- [Harness Engineering for Agentic AI Coding Tools — arXiv:2602.14690](https://arxiv.org/abs/2602.14690)
