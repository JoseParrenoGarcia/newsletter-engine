# What you actually need to test — Claude Code evals, Part 2

> 📌 **Claude Code evals [1/3]** — [Why "It Worked Once" Is Not Evidence](../claude-code-evals-part-1-why-it-worked-once-is-not-evidence/long_draft.md)
> **Claude Code evals [2/3]** — What you actually need to test *(this post)*
> **Claude Code evals [3/3]** — Building an eval suite *(coming soon!)*

---

**In this series so far:**

- **Part 1** established that "it worked once" is not evidence. Claude Code produces outputs from a distribution, not a deterministic function. A skill that passed last Tuesday may fail next Tuesday on the same input — not because anything changed, but because that is how probabilistic systems behave.
- We introduced the A/B test document skill as our running example: a Claude Code workflow that drafts experiment design documents from a brief and a metrics reference file.
- We built a first eval for it — checking whether the document had the right headings, no invented metrics, and sound statistical reasoning. The skill passed.
- We argued that evals are a thinking problem before they are an infrastructure problem. The first step is knowing what you are testing and why.

**In this part, we cover:** the nine evaluation surfaces that a Claude Code workflow exposes — and why the one most teams test first is necessary but nowhere near sufficient.

---

The A/B test document passed.

Correct headings. No invented metrics. Sound statistical reasoning. By every output-quality measure, the skill worked.

What we did not check: did it save the document in the right folder? Did it read the canonical metrics reference before drafting, or did it generate from memory? Did the post-write validation hook actually fire? If we had routed this to a cheaper model, would the document still pass? A subagent was tasked with checking statistical soundness — did the main agent use its output, or ignore it?

The final document is one surface. There are eight more. And some of the most dangerous failures look like the document passing while something else went wrong.

## What will we cover in this post?

- **Why does evaluating the final output miss most of what can go wrong?** — The case for looking beyond text quality, and why the A/B test document skill is the right lens to make it concrete.
- **What do repository state evals actually check?** — How to verify that the right files landed in the right places with no unexpected side effects.
- **What does a tool-use eval measure?** — Why the sequence of tool calls matters as much as the final answer, and how a correct output can hide an incorrect process.
- **How do you test a trajectory, not just an outcome?** — When the path to the answer is part of the quality bar.
- **What are skill evals — and why do they have three distinct forms?** — The three independent ways a skill can fail, and what each requires to catch.
- **How do you evaluate agent and subagent delegation?** — The two failure modes that only appear when you add a subagent to your workflow.
- **What should hook and command evals actually test?** — Why hooks are control-plane tools, not output-quality tools, and what a silent hook failure looks like.
- **Why do cost and latency deserve their own eval surface?** — How to make model routing decisions with evidence rather than intuition.
- **When does human usefulness need to sit alongside automated grading?** — Where automated checks end and human review begins, and how to calibrate the boundary.

---

## Why does evaluating the final output miss most of what can go wrong?

[Anthropic's engineering post on demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) defines an eval as three things: an input, a grading criterion, and a check. Most teams apply that structure to the output — and that is the right place to start. A document with invented metrics, missing sections, or unsound statistical reasoning has failed, regardless of how it was produced. Final output evals are the most important surface for catching failures that directly affect whoever receives the result.

The limitation is narrow but consequential. Output evals answer exactly one question: did the workflow produce the right content? They cannot tell you whether the document was saved correctly, whether the right context was read before writing, whether a validation step ran, or whether the path Claude took to produce the document was the one you expected.

For the A/B test skill, a solid final output eval looks like this:

```yaml
id: output_001
task: "Draft an A/B test document for this experiment brief."
input:
  brief: "Homepage ranking experiment — primary metric: booking_conversion_rate"
  context_file: "docs/metrics.md"
checks:
  - required_headings_present           # deterministic
  - no_invented_metrics                 # deterministic — cross-reference docs/metrics.md
  - hypothesis_is_falsifiable           # model-graded
  - statistical_reasoning_is_sound      # model-graded
  - sample_size_calculation_present     # deterministic
  - launch_and_rollback_criteria_stated # deterministic
```

The deterministic checks catch structural failures. The model-graded checks catch reasoning failures. Together they give you a reliable signal on content quality.

What they cannot see: whether the document landed in `docs/experiments/` or `scratch/`. Whether the `Read` call to `docs/metrics.md` appeared in the transcript at all. Whether the validation hook produced a log. Whether this same eval set would still pass if Haiku drafted it instead of Sonnet.

Each of those gaps is a distinct surface. Each requires its own check.

## What do repository state evals actually check?

Claude Code is not a text generator. The [official overview](https://code.claude.com/docs/en/overview) describes it as an acting system — one that reads files, writes files, runs commands, and modifies repositories. [Research into Claude Code's design space](https://arxiv.org/abs/2604.14228) puts it plainly: much of the complexity in an agentic coding system lives outside the core model loop. The environment the agent operates in is part of what you are testing.

Repository state evals ask: did the right files land in the right places, with no unexpected side effects?

For the A/B test skill, the expected repo state after a successful run is narrow and specific:

- Exactly one new file, at `docs/experiments/<experiment-name>.md`
- No other files created or modified
- No temporary files or intermediaries left behind
- `docs/metrics.md` unchanged

A grader for this surface needs no LLM. It needs `git diff --name-only` and a path assertion:

```yaml
id: repo_001
task: "Draft an A/B test document for the homepage ranking experiment."
checks:
  - exactly_one_new_file_created
  - new_file_path_matches: "docs/experiments/*.md"
  - no_other_files_modified
  - docs_metrics_md_unchanged
```

This catches a class of failures that output evals cannot see. The document was correctly formatted — but saved to `scratch/experiments/` instead of `docs/experiments/`. The skill created a `.draft` backup it did not clean up. It modified `docs/metrics.md` as a side effect of re-reading it with a write call. All of these produce a passing output check. All of them indicate a broken workflow.

The repo state surface is particularly relevant for skills that have prescribed file-system contracts — anything that generates artefacts, writes to a designated output location, or is expected not to touch certain files. That includes most non-trivial Claude Code skills.

## What does a tool-use eval measure?

The A/B test document skill is supposed to read `docs/metrics.md` before drafting. That file holds the canonical list of approved, instrumented metrics — the ones that actually exist in the tracking layer and are safe to reference in an experiment design.

If the skill skips that read, the output may still look correct. Claude Code knows enough about A/B testing to produce plausible metrics from general knowledge. A model-graded rubric might pass the document. The invented metrics will surface later — in the analyst's query, when the data engineer cannot find the tracking event that was supposed to exist, or when the experiment goes live and the dashboard shows nothing.

Tool-use evals check the process, not just the product. The question is whether the workflow called the right tools, in the right order.

For the A/B test skill:

```yaml
id: tool_001
task: "Draft an A/B test document for the homepage ranking experiment."
checks:
  - read_call_to_docs_metrics_md_before_write    # transcript assertion
  - no_write_before_first_read                    # ordering assertion
  - no_shell_commands_executed_during_draft       # scope assertion
  - write_called_exactly_once                     # idempotency assertion
```

The grader here is the transcript — the log of every tool call Claude made during the run. [Anthropic's eval framing](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) treats this as inspecting the trajectory rather than only the outcome. [Claude Code best practices](https://code.claude.com/docs/en/best-practices) frames it as verification rather than assumption: a workflow should be inspectable, not just trusted.

A skill that consistently produces correct outputs via an incorrect process is fragile in a specific way. It will hold up on inputs where Claude's general knowledge is sufficient — and fail on the inputs where consulting the reference actually matters. Those are exactly the high-stakes inputs where the skill is most needed.

There is a subtler version of this failure worth naming. The skill reads `docs/metrics.md` but reads it after it has already started drafting. The Read call appears in the transcript, so a naive transcript check passes. The ordering assertion catches it. The skill read the reference too late to ground its choices — the document was effectively drafted from memory and then retroactively checked. Depending on the skill's structure, this may or may not matter, but it is not the behaviour the skill was designed to produce, and a tool-use eval is the only way to see it.

## How do you test a trajectory, not just an outcome?

Tool-use evals check whether specific calls happened. Trajectory evals check whether the overall path made sense.

The distinction matters for two reasons. First, a workflow can call all the right tools and still take an unexpected route — reading the same file three times, backtracking after a partial write, spinning through a reasoning loop before settling on an approach. That behaviour does not necessarily produce a wrong output. But it signals fragility, and it has a cost. Second, for workflows where the path constrains correctness — not just efficiency — trajectory is part of the quality bar. A code review skill that produces its summary before reading the diff has failed even if the summary sounds plausible.

For the A/B test skill, the expected trajectory is four steps: read the experiment brief, read `docs/metrics.md`, draft the document internally, write the file. Any significant deviation is worth understanding.

Trajectory evals do not require a rigid sequence assertion for every run. Some variance is normal and acceptable. What they look for is deviation outside a reasonable envelope:

```yaml
id: trajectory_001
task: "Draft an A/B test document for the homepage ranking experiment."
checks:
  - no_repeated_reads_of_same_file
  - write_does_not_precede_read_of_docs_metrics_md
  - no_tool_calls_after_write                      # document was finalized, not reopened
  - total_tool_call_count_within_bounds: [3, 8]
```

[Research into Claude Code's design space](https://arxiv.org/abs/2604.14228) describes how complexity in agentic systems accumulates around the model loop — in the tools called, the context loaded, the sequence of decisions. Trajectory evals measure that complexity and hold it to a standard.

The total tool call bound deserves attention. A skill that reaches the right answer in twelve tool calls when four were sufficient is not broken — but it is expensive and unpredictable. If this skill runs at volume (every pull request, every new experiment brief), that inefficiency compounds. Trajectory evals give you the data to notice before it becomes a cost problem.

## What are skill evals — and why do they have three distinct forms?

Skills in Claude Code are reusable procedures. The [skills documentation](https://code.claude.com/docs/en/skills) describes how Claude uses them when relevant — based on skill descriptions that help Claude decide when to load one. That decision to trigger (or not trigger) is itself a testable behaviour. It is also one of the most commonly missed eval surfaces.

A skill can fail in three independent ways, each requiring a different kind of test.

**Trigger eval: did the right skill fire?**

When a user submits an experiment brief, the document-drafting skill should activate. A trigger eval submits that input and checks whether the skill was invoked:

```yaml
id: skill_trigger_001
input: "Here is the brief for the checkout funnel experiment. Primary metric: add-to-cart rate..."
expected_skill_triggered: "ab-test-document"
```

This fails more than you expect. Skill descriptions can be too narrow, causing the skill to miss inputs that are phrased differently than the description anticipated. Rephrasing the same brief — more formal, less structured, arriving mid-conversation rather than as an opening message — surfaces this brittleness.

**Negative trigger eval: did the skill stay silent when it should?**

An over-broad skill is a different failure mode. If the document-drafting skill triggers on a conceptual question about A/B testing methodology, it has overreached — consuming context and potentially producing output that was not requested.

```yaml
id: skill_neg_trigger_001
input: "Can you walk me through the difference between frequentist and Bayesian A/B testing?"
expected: skill "ab-test-document" NOT triggered
```

Negative trigger evals are often skipped entirely. The assumption is that if the skill triggers correctly on the right inputs, it must be scoped correctly. That assumption fails when skill descriptions are written too broadly, or when the underlying model interprets the description more liberally than the author intended. [Research on configuring agentic coding tools](https://arxiv.org/abs/2602.14690) found that Claude Code users employ a broader range of configuration mechanisms — including skills — than users of any other agentic coding tool examined. The breadth of that configuration creates more surface for over-triggering.

**Execution eval: once triggered, did the skill do the right thing?**

This is the surface most teams test first. It is also the last of the three — a skill that does not trigger correctly never reaches execution. Trigger and negative trigger evals are preconditions. Execution evals are the output-quality checks described in the final output surface, applied specifically to a skill that has been confirmed to have triggered correctly.

The three forms are genuinely independent. A skill can have a reliable trigger and a broken execution. It can pass execution checks on standard inputs and over-trigger on adjacent ones. The only way to characterise a skill's actual behaviour is to test all three.

## How do you evaluate agent and subagent delegation?

Adding a subagent to a workflow introduces two new failure modes that do not exist in single-agent runs.

The [subagents documentation](https://code.claude.com/docs/en/sub-agents) describes subagents as specialised agents with their own instructions, tool permissions, and model configuration. What the subagent receives as context — and what it does not receive — determines the quality of its output. The main agent's ability to integrate that output determines whether the delegation was useful.

**Wrong delegation** happens when the incorrect subagent is selected, or when the right subagent receives incomplete or misleading context. Imagine the A/B test skill delegates statistical review to a stats-review subagent but passes only the experiment brief — not `docs/metrics.md` and not the baseline conversion rate the skill had already loaded. The subagent produces a review against assumptions it had to invent. The output sounds reasonable. The review is not grounded in the actual experiment data.

**Bad integration** happens when the main agent receives the subagent's output and ignores it, contradicts it, or uses it only selectively. This is easy to miss. The subagent ran. The main agent ran. Neither log shows an obvious error. The failure only appears when you compare the subagent's recommendation to what the main agent actually wrote.

```yaml
id: agent_001
task: >
  Draft an A/B test document for the homepage ranking experiment.
  Use the stats-review subagent for sample size validation.
checks:
  - stats_subagent_was_invoked
  - stats_subagent_received_full_experiment_brief        # context completeness
  - stats_subagent_received_docs_metrics_md_reference    # context completeness
  - main_document_sample_size_matches_subagent_output    # integration fidelity
  - main_document_does_not_contradict_subagent_caveats   # integration fidelity
```

The integration checks are the ones most teams skip. The subagent ran, so the delegation is assumed to have worked. But the value of the delegation is not that the subagent ran — it is that the main agent used its output correctly. Those are different things, and they require different checks.

## What should hook and command evals actually test?

Hooks in Claude Code are control-plane tools. The [hooks documentation](https://code.claude.com/docs/en/hooks) describes them as commands that run before or after Claude's actions — a mechanism for enforcing workflow behaviour regardless of what the model decides to do.

The [memory documentation](https://code.claude.com/docs/en/memory) draws the key distinction: a CLAUDE.md instruction saying "do not reference unapproved metrics" is context. Claude will generally follow it. It may not always follow it. For blocking actions regardless of Claude's decision, use hooks.

This distinction has a direct consequence for testing. A CLAUDE.md instruction and a hook that enforce the same behaviour have different failure modes. The instruction fails silently when the model does not follow it — producing an output that looks acceptable but violates the constraint. The hook fails silently when it does not fire — producing an output the hook was supposed to catch, but nothing in the run log indicates the hook was bypassed.

[Research on Claude Code manifests](https://arxiv.org/abs/2509.14744) shows that repository-level configuration — including CLAUDE.md files, rules, and hooks — is central to how teams control agentic workflows in practice. When a hook silently fails, that control disappears without any signal that it has gone.

Hook evals test three distinct things:

**1. Did the hook fire?**

```yaml
id: hook_fire_001
task: "Draft an A/B test document — any content."
checks:
  - hook_post_write_ran             # hook invocation logged
  - hook_log_file_was_written       # side effect exists
```

**2. Did the hook produce the expected side effect on a failing case?**

```yaml
id: hook_enforcement_001
task: >
  Draft an A/B test document. Include 'daily_active_users' as a metric
  (this metric is not in docs/metrics.md and should be flagged).
checks:
  - hook_ran_after_write
  - hook_log_contains_flagged_metric: "daily_active_users"
  - write_was_blocked_or_flagged
```

**3. Did the hook avoid false positives on a passing case?**

```yaml
id: hook_no_false_positive_001
task: >
  Draft a correct A/B test document using only approved metrics.
checks:
  - hook_ran_after_write
  - hook_log_is_empty_or_all_clear
  - write_was_not_blocked
```

The third check is as important as the second. A hook that blocks every write is not functioning — it is broken in the other direction. A hook that produces constant false positives will be disabled or worked around, which is worse than no hook at all.

## Why do cost and latency deserve their own eval surface?

A workflow that passes every quality check on Sonnet is not necessarily a workflow that needs Sonnet.

The [subagents documentation](https://code.claude.com/docs/en/sub-agents) explicitly names routing tasks to faster, cheaper models — like Haiku — as a cost control mechanism. For workflows running at volume, the cost difference is material. A document-drafting skill running on every experiment brief, across an organisation with twenty active experiments per month, costs something. Routing part of that to Haiku — if quality holds — costs considerably less.

Whether quality holds is an empirical question. It depends on the task complexity, the instruction quality, the error tolerance, and the specific ways each model tends to fail at the margins. Intuition is not enough. [Claude Code best practices](https://code.claude.com/docs/en/best-practices) frames this as a workflow design decision: not every step requires the same capability level. The decision should be made with evidence.

Cost and latency evals run the same eval set across model configurations and compare results:

```yaml
eval_comparison:
  eval_set: ab_test_document_evals     # same inputs, same checks
  configurations:
    - model: claude-haiku-4-5
    - model: claude-sonnet-4-6
  metrics:
    - pass_rate_deterministic_checks
    - pass_rate_model_graded_checks
    - median_cost_per_run_usd
    - p95_latency_seconds
  decision_threshold:
    acceptable_quality_degradation: 5%
```

The threshold is a deliberate choice, not a default. Five percent degradation in pass rate means one more failure per twenty runs. Depending on how consequential each failure is, that may be acceptable — or it may not. The eval gives you the number. The decision is yours.

There is a more granular version of this surface worth naming. Rather than routing the entire skill to a cheaper model, you route individual steps. The outline step goes to Haiku. The statistical reasoning step goes to Sonnet. The final format check goes to Haiku. This step-level routing is only possible if you have per-step quality signals — which requires evals at the step level, not just the skill level.

Cost and latency evals also catch a failure mode that has nothing to do with model choice: a skill that takes twice as long as expected because it reads too much irrelevant context, runs unnecessary tool calls, or loops through a reasoning sequence before settling. These are correctness failures disguised as performance failures. They appear in the latency distribution before they appear in the output checks.

## When does human usefulness need to sit alongside automated grading?

Automated grading checks form. It checks whether the required headings are present, whether the metrics are on the approved list, whether the hypothesis uses a falsifiable structure. That work is valuable and should run on every eval.

It does not check whether the document is useful.

Consider a statistician reading the A/B test document after it passes every automated check. The headings are correct. No unapproved metrics. The hypothesis is syntactically falsifiable. And the sample size calculation used the wrong baseline conversion rate — a number from last year's experiment that happened to be the most recent figure in the context window, not the current production baseline. The minimum detectable effect was set to 0.5%, but the experiment's runtime is fourteen days and the traffic allocation is 10% of logged-in users. With those parameters, the experiment is underpowered to detect that effect by a factor of three.

Every automated check passed. The experiment would waste two weeks of engineering time.

Human usefulness evals close the gap between "technically correct" and "actually useful." [Anthropic's eval framing](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) names human review as one component of a well-structured eval harness — not a replacement for automated grading, but the check that catches what automated grading cannot reach.

For the A/B test skill, a human usefulness rubric covers the reasoning layer:

- Is the hypothesis testable with the proposed setup, given the available traffic and timeline?
- Is the sample size calculation grounded in current production baselines, not stale figures?
- Are the guardrail metrics the right ones to monitor for this experiment type?
- Is there anything in the document that would cause downstream problems for the analyst or engineer implementing it?
- Would a senior data scientist sign off on this without changes?

Human review is expensive. It belongs at the boundary of automated confidence — for output types where the failure mode is "plausible but wrong" rather than "wrong format," or where the cost of a passing-but-incorrect document is high. The right calibration is to run automated grading on everything and human review on the subset of outputs where automated confidence is lowest, or where the downstream consequences of failure are highest.

There is also a second role for human usefulness evals: calibrating the model-graded checks themselves. If a human reviewer consistently flags documents that pass the model-graded rubric, the rubric needs updating. Human review is not a fallback — it is a signal that your automated grading has a blind spot.

---

## Key takeaways from Part 2

**1. Final output evals are the starting point, not the complete picture.** They catch content failures — wrong answers, missing sections, invented claims. They cannot catch process failures, path failures, or infrastructure failures. Start here. Do not stop here.

**2. Repository state evals treat the repo as the eval environment.** Claude Code writes files. Testing what was written, where, and what was not touched is a distinct surface from testing the content of what was written. Skills with prescribed file-system contracts need this check.

**3. Tool-use evals catch process failures that correct outputs can hide.** A skill that produces correct outputs by drafting from memory instead of reading the canonical reference is fragile. It will hold up until the inputs are hard enough to require the reference — which are exactly the inputs that matter most.

**4. Trajectory evals hold the path to a standard.** For workflows where route affects correctness, cost, or safety, checking whether the path stayed within an expected envelope is a separate eval from checking whether the final answer was correct.

**5. Skills have three independent failure modes.** Not triggering, triggering too broadly, and executing incorrectly are distinct problems that require distinct eval types. Testing only execution misses the majority of real skill failures.

**6. Subagent delegation introduces two new failure modes.** Wrong delegation and bad integration are only visible when you compare what the subagent produced to what the main agent did with it. Integration fidelity checks are the ones most commonly skipped.

**7. Hook evals test enforcement, not quality.** A hook that silently fails removes the control it was supposed to provide — with no output-level signal that the control is gone. Test that hooks fire, produce the expected side effects, and do not block valid actions.

**8. Cost and latency evals turn model routing into a measured decision.** Without them, routing is intuition. With them, it is a measured trade-off with a defined acceptable degradation threshold.

**9. Human usefulness evals cover what automated grading cannot reach.** For outputs where the failure mode is plausible-but-wrong, human review sits alongside automated grading — not as a replacement, but as the check that closes the gap and calibrates the rubrics.

---

We started Part 1 with one eval: did the A/B test document have the right headings and avoid invented metrics? By the end of Part 2, that same skill has nine surfaces we could evaluate. We know which folder the document should land in, which reference file should have been read before writing, whether the validation hook fired, and whether document quality holds if we swap to a cheaper model. That is the map.

Part 3 is where we build the actual suite — starting small, running it, and turning the first failure we find into a regression case we will never miss again.

*Continues in [Part 3: Building an eval suite — Claude Code evals, Part 3](../claude-code-evals-part-3-building-an-eval-suite/long_draft.md)*

---

## Now, I want to hear from you!

Pick one Claude Code skill or workflow you currently treat as reliable. Work through the nine surfaces from this post and ask yourself: which ones have you actually tested, and which ones are you assuming?

Three questions to sit with:

1. For your most-used Claude Code workflow — if the output looks right but the tool-use transcript shows the skill never read the canonical reference file, would you catch that today? What would you need to add to catch it?

2. Of the nine surfaces covered here, which one surprised you most — the one you had not thought to test before? If you were going to add one new eval check this week, which surface would it cover?

3. Hooks, skills, and subagents each introduce failure modes that do not exist in single-step, single-model runs. If you are using any of these in a workflow you rely on, which surface do you think is most likely to be untested right now — and what would a minimal check for it look like?

Share your thoughts, examples, or counterpoints in the comments. I would love to read your opinions 👇

---

## References

- [Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Anthropic's engineering post defining eval structure, distinguishing eval types, and explaining how mistakes compound in agentic workflows
- [Claude Code overview — code.claude.com](https://code.claude.com/docs/en/overview) — official overview establishing Claude Code as an acting system that reads, edits, runs, and integrates with development tools
- [Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems — arXiv:2604.14228](https://arxiv.org/abs/2604.14228) — systematic study of the Claude Code design space, covering permissions, context management, hooks, skills, and subagents
- [Claude Code best practices — code.claude.com](https://code.claude.com/docs/en/best-practices) — official best practices guide framing verification by discipline rather than assumption
- [Extend Claude with skills — code.claude.com](https://code.claude.com/docs/en/skills) — documentation on the skills system including trigger behaviour, invocation controls, and troubleshooting
- [Configuring Agentic AI Coding Tools: An Exploratory Study — arXiv:2602.14690](https://arxiv.org/abs/2602.14690) — systematic study of configuration in five agentic AI coding tools, finding Claude Code users employ the broadest configuration range examined
- [Create custom subagents — code.claude.com](https://code.claude.com/docs/en/sub-agents) — official docs on subagents, including model routing, specialised instructions, and tool permissions
- [Claude Code hooks — code.claude.com](https://code.claude.com/docs/en/hooks) — documentation on hooks as control-plane tools, covering enforcement vs guidance and hook failure modes
- [How Claude remembers your project — code.claude.com](https://code.claude.com/docs/en/memory) — documentation distinguishing CLAUDE.md as context (guidance) from hooks as enforcement
- [On the Use of Agentic Coding Manifests: An Empirical Study of Claude Code — arXiv:2509.14744](https://arxiv.org/abs/2509.14744) — empirical study of CLAUDE.md files showing how repository-level configuration shapes agent behaviour in practice
