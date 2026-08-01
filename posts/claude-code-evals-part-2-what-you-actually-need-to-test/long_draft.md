# Claude Code Evals: What You Actually Need To Test

*Part 2 of 3 — The final document is only one evaluation surface. Here is the full map.*

---

In Part 1, we built an eval for the A/B test document skill. The eval confirmed the document had the right headings, used only the metrics provided in the input, and contained sound statistical reasoning. The skill passed. Part 2 maps all nine surfaces where a Claude Code eval can succeed or fail.

But here is what that eval did not check.

It did not check whether the skill triggered correctly in the first place — or whether a generic completion path ran instead and happened to produce a plausible-looking document. It did not check whether Claude read `docs/metrics.md` before drafting, or whether it generated from memory and got lucky. And it did not check whether the document landed in `docs/experiments/` or somewhere else in the repository entirely.

Three separate things that could have failed silently on the same run. The output would have looked identical.

Part 1 gave the mental model: Claude Code is an acting system, and a single impressive run is not evidence of reliability. Part 2 gives the map — the distinct evaluation surfaces where a Claude Code workflow can succeed or fail, and which ones are worth building evals for first.

The central question for this post is not "was the output good?" It is: **which part of the workflow are you trying to trust?**

---

> 📌 **Claude Code evals [1/3]** — [Why "It Worked Once" Is Not Evidence](../claude-code-evals-part-1-why-it-worked-once-is-not-evidence/long_draft.md)
> **Claude Code evals [2/3]** — What You Actually Need To Test *(this post)*
> **Claude Code evals [3/3]** — Building A Tiny Eval Suite That Actually Helps *(coming soon!)*

---

**In this series so far:**
- Part 1 established why one good run is not evidence — LLMs are probabilistic, Claude Code is an acting system, and the same testing discipline software engineers apply to code must be applied to workflows.
- Part 1 built a first concrete eval for the A/B test document skill: deterministic structure checks plus a model-graded rubric for reasoning quality.

---

## What will we cover in this post?

- **What does a Claude Code evaluation map look like?** — all nine surfaces where a Claude Code workflow can be evaluated, introduced as a reference table before we go deep on three.
- **How do you know the right skill or agent triggered?** — trigger evals, execution evals, and delta evals; how the description field is the selection interface and what that means for testing.
- **What did the workflow actually do to get there?** — the tracer concept; how to check that Claude read the right context file before generating, without enforcing a rigid step sequence.
- **What state did the workflow leave behind?** — git diff as an eval; why the A/B test document passing format checks tells you nothing about where it landed.
- **What about the other six surfaces?** — a light tour of hooks, subagents, cost and latency, and human usefulness.

Let's get started!

---

## What does a Claude Code evaluation map look like?

There are nine. The table below lists them — each one is an independent place where something can go wrong.

A Claude Code workflow is not a single thing that either works or does not. It is a sequence of decisions and actions — which skill or agent runs, what files it reads, what commands it executes, where it writes output, whether the control-plane mechanisms fire — and each of those steps is an independent place where something can go wrong.

The [Anthropic Engineering post on demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) captures this with a useful framing: a transcript is "the complete record of a trial, including outputs, tool calls, reasoning, intermediate results, and any other interactions." The final output is one element of that record. The rest of it is also gradeable.

Here is the full map of evaluation surfaces for a Claude Code workflow:

| Surface | Core question | Example grader |
|---|---|---|
| Final output | Did it produce the right artefact? | Schema checks, LLM rubric |
| Repository state | Did it leave the repo in the expected state? | `git diff --name-only`, path checks |
| Tool use and trajectory | Did it follow an acceptable path? | Transcript checks, required-tool assertions |
| Skills | Did the right skill trigger and execute correctly? | Trigger logs, delta comparison |
| Agents / subagents | Was delegation useful and correctly integrated? | Invocation logs, output comparison |
| Hooks and commands | Did the control-plane mechanisms behave as intended? | Hook logs, side-effect assertions |
| Cost and latency | Was the workflow efficient enough to be useful? | Token counts, runtime, pass-rate by model |
| Human usefulness | Would a subject-matter expert sign off on this? | Calibrated rubric, human review |
| Instruction following | Did `CLAUDE.md` guidance change behaviour as expected? | Before/after comparison, trace review |

Nine surfaces. For most workflows, three or four are the ones that actually matter.

The map is a menu, not a checklist. The right question is not "have I covered all nine?" It is "which of these could fail silently while my output checks pass?" For a data science team using Claude Code to automate experiment documentation, the answer usually points to three: skills, tool use and trajectory, and repository state. Those are the surfaces this post goes deep on.

---

## How do you know the right skill or agent triggered?

You run a trigger eval. It checks whether the right skill fires for the right task — and whether it stays dormant for tasks it should not handle.

The A/B test document skill exists to draft experiment design documents. It knows the required headings, the statistical caveats, the approved metrics list. It was built and tested carefully.

But none of that matters if it does not run.

Claude Code [selects skills based on their description fields](https://code.claude.com/docs/en/skills). The description is read at selection time, before the skill body loads. When you ask Claude to "draft an experiment design doc for the homepage ranking test," Claude reads available skill descriptions and decides which one applies. If the description is too vague, the wrong skill fires. If the description is missing the right trigger keywords, no skill fires and Claude falls back to a generic completion. The document it produces may look fine. The structured workflow you built was never involved.

This is a distinct category of failure — not "the skill ran badly" but "the skill never ran." And it is invisible to output-only graders.

Skill evals break into three types.

**Trigger evals** check whether the right skill fires for the right task. They run the same task prompt against the skill's declared trigger conditions and verify the selection behaviour. A positive trigger eval confirms the skill activates for a task it should handle. A negative trigger eval confirms it does not activate for a task it should not handle.

```yaml
id: skill_trigger_positive_001
skill: experiment-design
task: "Draft an experiment design document for a homepage ranking A/B test. Primary metric: conversion rate. Guardrail metrics: bounce rate, revenue per visit."
expected:
  should_trigger: true
  required_output_sections:
    - Hypothesis
    - Primary metric
    - Guardrail metrics
    - Sample size
    - Launch criteria
    - Rollback criteria

---

id: skill_trigger_negative_001
skill: experiment-design
task: "Summarise this Python traceback and suggest a fix."
expected:
  should_trigger: false
```

The negative trigger eval matters as much as the positive one. A skill that fires for unrelated tasks is a skill that will produce confident, well-formatted garbage.

**Execution evals** check whether the skill, once triggered, follows its documented workflow. Did it load the metrics reference file? Did it use the correct document template? Did it respect the constraint against invented metrics? These are the checks that confirm the skill body is doing what it says it does — not just that it activated.

**Delta evals** answer a question most practitioners never ask: is the output actually better with the skill than without it? Run the same task with the skill enabled and with it disabled. Grade both outputs against the same rubric. If the scores are equivalent, the skill is adding overhead with no return. If the skill consistently outperforms baseline on formatting correctness, metric groundedness, and reasoning quality, that is the evidence that the workflow investment is justified.

The same taxonomy applies to subagents. [Subagents in Claude Code](https://code.claude.com/docs/en/sub-agents) are skills spawned in a separate context window — they have their own system prompt, their own tool access, and their own permissions. The description field plays the same selection role. Trigger evals, execution evals, and delta evals carry over directly. The additional question for agents is whether the main session integrated the result correctly — but the fundamental testing pattern is the same.

A skill can fail to show up, or it can show up and do the wrong thing. Trigger evals catch the first. Execution evals catch the second.

---

## What did the workflow actually do to get there?

You grade the transcript. The sequence of tool calls — Read, Write, command — is the record of what the workflow actually did, and output evals cannot grade it.

The experiment design skill passed its output eval. The document had every required heading. The statistical reasoning was sound. The metrics matched the inputs.

But there is a question the output eval cannot answer: did Claude read `docs/metrics.md` before drafting, or did it generate from memory?

This matters because `docs/metrics.md` is the canonical list of approved experiment metrics for the team. If Claude reads it before drafting, the document is grounded in what the team has actually agreed to use. If Claude skips it and generates from model knowledge, the document will look identical — but it may contain metrics that are not approved, thresholds that are not calibrated, or terminology that does not match the team's conventions. The output eval passes. The document is not usable.

Tool use and trajectory evals grade the path the workflow took, not just where it ended up.

The [Anthropic Engineering eval post](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) draws an important distinction here. There is a natural instinct to check that an agent followed exact steps in a specific order — Read, then Draft, then Write, in that sequence. But rigid step-ordering checks are "too brittle": agents often find valid alternative paths, and a check that fails because Claude inserted an intermediate Glob call before reading the metrics file is a check that produces noise, not signal.

The better check is softer: did the required tool calls appear at all, somewhere in the trajectory, before the key actions that depend on them?

For the A/B test skill, that translates to: did a `Read` call to `docs/metrics.md` appear anywhere in the transcript before the first `Write` call that produced the document? Not necessarily as the first action, not necessarily uninterrupted, but present.

```yaml
id: tool_use_001
task: "Draft an experiment design document for the homepage ranking A/B test."
context_files:
  - docs/metrics.md
  - docs/experiments/template.md
checks:
  - must_read: "docs/metrics.md"
  - must_not_write_before_reading: "docs/metrics.md"
  - must_not_run_command_matching: "rm -rf"
```

The `must_not_write_before_reading` check is the substantive one. It catches the failure mode where Claude starts drafting immediately, generates a plausible document from model knowledge, and then reads the metrics file — producing a transcript where the Read call exists but came too late to influence the output.

This is where the Anthropic Engineering post's framing of the transcript as "the complete record of a trial, including tool calls, reasoning, and intermediate results" becomes operational. You are not grading the final message. You are grading the sequence of actions that produced it.

Other trajectory checks worth building for this skill:
- Did Claude avoid reading files outside the expected scope (no reads of unrelated configuration files or sensitive directories)?
- Did it recover correctly if the first draft failed a validation check, rather than silently returning the failed draft?
- Did it avoid retrying the same failing command more than once?

The transcript matters because agents can fail in the middle, even when the final message sounds confident.

---

## What state did the workflow leave behind?

You run a repository state eval: compare the git diff against the expected set of changes. The file either landed where it should or it did not.

The experiment design document skill ran. The transcript shows `Read docs/metrics.md` before the `Write` call. The output eval passes. The trajectory checks pass.

One question remains: where did the document land?

The expected path is `docs/experiments/ab-test-homepage-ranking-2026-07.md`. But Claude Code has no enforced write constraint unless one is configured. If the skill description does not specify the output path precisely, and the SKILL.md does not enforce it with a check, the document might land in the repository root, in a `tmp/` folder, or alongside the metrics reference file it just read from.

The format checks pass. The path check was never run.

This is the core insight behind repository state evals: a Claude Code run is not complete when it says "done." It is complete when the repository is in the state you expected.

[SWE-bench](https://arxiv.org/abs/2310.06770), the standard benchmark for coding agents, is built entirely on this surface. The grading model is straightforward: apply the agent's patch to the repository, run the original pull request's test suite, and check whether the tests pass. There is no LLM rubric, no format check, no evaluation of the agent's reasoning. The repository is either in the correct state or it is not. SWE-bench's entire evaluation methodology is a repository state check.

The same logic applies to the A/B test document skill. The eval should assert:
- Exactly one new file exists in `docs/experiments/`
- No other paths were changed
- No intermediate files were created and left behind (scratch notebooks, temporary YAML files, draft outputs in the wrong location)
- The repository is clean apart from the expected artefact

```yaml
id: repo_state_001
task: "Draft an experiment design document for the homepage ranking A/B test."
expected_state:
  allowed_paths:
    - docs/experiments/**
  forbidden_paths:
    - "*.tmp"
    - tmp/**
    - scratch/**
    - docs/metrics.md  # reference file — should not be modified
checks:
  - git_diff_scope: allowed_paths only
  - no_files_in_forbidden_paths
  - exactly_one_new_file_created
  - new_file_matches_naming_pattern: "ab-test-*.md"
```

The `git diff --name-only` command is the grader. It lists every file the workflow touched. Anything outside the allowed set is a failure.

This is a grader that requires no LLM and no rubric. It runs in milliseconds. And it catches an entire class of failures — wrong directory, extra artefacts, collateral edits — that output-only evals cannot see.

Two other repository state checks worth adding for this skill:
- Did the workflow accidentally modify `docs/metrics.md`? A skill that reads a reference file should not write back to it.
- Are any generated files present that should have been cleaned up? Some workflows create intermediate outputs as part of their process. A repository state eval confirms the cleanup step ran.

A Claude Code run is not complete when it says "done." It is complete when `git diff` shows exactly what you expected.

---

## What about the other six surfaces?

Each of the remaining six has a distinct failure mode: final output (covered in Part 1), hooks, subagents, cost and latency, human usefulness, and instruction following.

The three deep dives cover the surfaces most likely to produce silent failures in a data science workflow. The remaining six are real, but they demand less immediate attention for most teams getting started.

**Final output evals** were covered in Part 1. They are the baseline — the document exists, has the right structure, passes the graded rubric. Every other surface builds on top of them, not instead of them.

**Hooks and commands** are the control-plane layer. [Hooks in Claude Code](https://code.claude.com/docs/en/hooks) run shell commands before or after Claude Code actions. They can block unsafe writes, validate output, enforce naming conventions. The [memory documentation](https://code.claude.com/docs/en/memory) makes an important distinction: `CLAUDE.md` is context, not enforcement. If a behaviour must be blocked regardless of what Claude decides, a hook is the mechanism. Hook evals check whether a hook fired, whether it produced the expected side effect (a validation log, a blocked action, a written artefact), and whether it handled edge cases without generating false positives. A hook that fires on every write is noisy. A hook that never fires is invisible. Both are failures with no output-level signal.

**Subagent evals** extend the trigger/execution/delta taxonomy from Section 2. The additional dimension is integration: did the main agent use the subagent's result correctly? A subagent that produces a thorough statistical analysis is not useful if the orchestrating agent ignores it and summarises from its own knowledge instead. [Subagent documentation](https://code.claude.com/docs/en/sub-agents) describes delegation as a context management and specialisation tool — the eval question is whether it improved quality, speed, or cost compared to handling the task in the main session.

**Cost and latency evals** answer the model-routing question from Part 1: can Haiku draft acceptable experiment documents instead of Sonnet? The method is simple — run the same eval set against both model configurations and compare pass rates. If Haiku achieves equivalent pass rates at lower cost, the routing decision is justified by data. If quality drops below threshold, you know where the floor is.

**Human usefulness evals** cover the gap that deterministic checks cannot close. Some outputs are technically correct and structurally sound but genuinely not useful — the statistical reasoning is circular, the hypothesis is untestable, the rollback criteria are impossible to operationalise. A calibrated rubric with a human reviewer catches these cases. The [Anthropic Engineering eval post](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) is direct about this: some questions require judgment. The discipline is to reserve human review for the questions scripts cannot answer, rather than using it as a substitute for the checks that can be automated.

**Instruction following evals** check whether `CLAUDE.md` guidance changed behaviour as expected. These are before/after comparisons: add a rule to `CLAUDE.md`, run the same task, verify the output reflects the instruction. They are most useful when a rule change is intended to prevent a recurring failure — and you want evidence that it did.

Not every workflow needs all nine surfaces. A skill that generates a weekly stakeholder summary probably needs output evals and a human usefulness check. A skill that modifies database migration files needs repository state evals and hook evals. The map points you to the surfaces where silent failure is most likely for the specific workflow you are trying to trust.

---

## Key takeaways: Claude Code eval surfaces

**The final document is one surface.** The A/B test skill we built in Part 1 has at least eight others. Some of the most dangerous failures look like the output passing while the skill trigger, the tool-use trajectory, or the repository state all failed silently.

**Skills and agents need trigger evals, execution evals, and delta evals.** The description field is the selection interface. If it is imprecise, the wrong skill fires — and output checks never catch it. Negative trigger evals matter as much as positive ones.

**Trajectory evals check the path, not just the destination.** Did it read the right reference file before drafting? The check is whether the required tool call appeared at all — not whether it appeared in a rigid sequence. The transcript is the record. Grade it.

**Repository state evals catch what output evals cannot see.** Git diff as a grader. Allowed paths, forbidden paths, expected artefacts. SWE-bench — the standard coding agent benchmark — is built entirely on this surface. It is fast, requires no LLM, and catches an entire class of silent failures.

**The map is a menu.** Start with the surfaces where silent failure is most likely for your specific workflow. Three well-chosen evals that run reliably beat nine theoretical checks that never get built.

---

## Now, I want to hear from you

Part 2 maps the surfaces. The decision about where to start depends on the specific workflow you are trying to trust.

- Which surface would catch the failure mode you have actually experienced — a wrong output, a wrong file location, a skill that silently did not trigger?
- If you have Claude Code skills or agents in production, have you ever run a negative trigger eval to confirm they do not activate for unrelated tasks?
- Between trigger evals, trajectory evals, and repository state evals — which one feels most immediately useful for the workflows you are building?

*Continues in [Part 3: Building A Tiny Eval Suite That Actually Helps](../claude-code-evals-part-3-building-a-tiny-eval-suite-that-actually-helps/long_draft.md)*

---

## References

[Claude Code overview](https://code.claude.com/docs/en/overview) — Anthropic's official description of Claude Code as an agentic coding tool that reads codebases, edits files, runs commands, and integrates with development tools.

[Claude Code memory and CLAUDE.md](https://code.claude.com/docs/en/memory) — Documents persistent instructions, auto memory, and the distinction between `CLAUDE.md` as context versus hooks as enforcement.

[Extend Claude with skills](https://code.claude.com/docs/en/skills) — Official documentation for skills: SKILL.md format, description field behaviour, trigger mechanics, troubleshooting for skills not triggering.

[Hooks reference](https://code.claude.com/docs/en/hooks) — Official documentation for Claude Code hooks: pre- and post-action shell commands, enforcement behaviour, and configuration.

[Create custom subagents](https://code.claude.com/docs/en/sub-agents) — Official documentation for subagents: context isolation, specialisation, tool restrictions, and model routing.

[Claude Code common workflows](https://code.claude.com/docs/en/common-workflows) — Examples of repeated development workflows that are natural candidates for eval suites.

[Claude Code best practices](https://code.claude.com/docs/en/best-practices) — Guidance on verification, workflow design, and iterative improvement.

[Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Defines transcripts as the complete trial record including tool calls and intermediate results; covers required-tool checks and why rigid step-ordering checks are too brittle.

[SWE-bench — arXiv:2310.06770](https://arxiv.org/abs/2310.06770) — The standard coding agent benchmark; grades agent solutions by applying a patch to the repository and running the original pull request's test suite — a canonical example of repository state as an evaluation surface.
