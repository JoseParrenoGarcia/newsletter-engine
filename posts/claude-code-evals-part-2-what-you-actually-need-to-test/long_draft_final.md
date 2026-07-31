# Claude Code Evals: What You Actually Need To Test

*Part 2 of 3 — The final document is only one evaluation surface. Here is the full map.*

---

This week I want to share a debate my team had: what does it actually mean to evaluate a Claude Code skill?

Most literature out there talks about evaluating the outputs coming out of Claude Code skills or agents. But, there are so many other things that should be considered when evaluating GenAI processes.

I'll give you a personal example. In my team, we are building a centralised plugin to harness an LLM wiki service for our Data Science discipline. That wiki needs to be retrieval-efficient and accurate. So we quickly realised we could not just check whether a response sounded helpful. We needed to know what the LLM actually opened, which skills and tools it used, and where it wrote its output. The concern went well beyond the final answer.

Already in part 1 of this Claude Code evals series we covered the need for evals and we had a super simple example checking aspects of a skill dedicated to building a A/B testing documentation. The example eval we presented confirmed the document had the right headings, used only the metrics provided in the input, and contained sound statistical reasoning.

However, there are plenty of things the eval was not built to check:

- It did not check whether the skill triggered correctly in the first place (many times Claude can decide to simply use its own path and not use a skill).
- It did not check whether Claude read `docs/metrics.md` before drafting, or whether it generated from memory and got lucky.
- And it did not check whether the document landed in `docs/experiments/` or somewhere else in the repository entirely.

As you can see, these 3 example points bring up the need to evaluate what controls do we need for our GenAI skills. Are you interested in the final output format only? Or do you need much more traceability.

Because, if this is the case, then this second post will probably make you consider aspects of your GenAI workflow you hadn't thought about.

---

> 📌 **Claude Code evals [1/3]** — [Why "It Worked Once" Is Not Evidence](../claude-code-evals-part-1-why-it-worked-once-is-not-evidence/long_draft.md)
> **Claude Code evals [2/3]** — What You Actually Need To Test *(this post)*
> **Claude Code evals [3/3]** — Building A Tiny Eval Suite That Actually Helps *(coming soon!)*

---

**In this series so far:**
- Part 1 established why one good run is not evidence — LLMs are probabilistic, Claude Code is an acting system, and the same testing discipline software engineers apply to code must be applied to workflows.
- Part 1 built a first concrete eval for the A/B test document skill: deterministic structure checks plus a model-graded rubric for reasoning quality.

---

> 📌 **Claude Code evals [1/3]** — "It worked once" is not evidence enough.
> 📌 **Claude Code evals [2/3]** — TITLE to be determined
> **Claude Code evals [3/3]** — TITLE *(coming soon!)*

---

## What will we cover in this post?

- **What does a Claude Code evaluation map look like?** — All 8 surfaces where a Claude Code workflow can be evaluated, introduced as a reference table before we go deep on 3.
- **Eval type 1: How do you know the right skill or agent triggered?** — Trigger evals, execution evals, and delta evals; how the description field is the selection interface and what that means for testing.
- **Eval type 2: What did the workflow actually do to get there?** — The tracer concept; how to check that Claude read the right context file before generating, without enforcing a rigid step sequence.
- **Eval type 3: Was the workflow efficient enough to actually use at scale?** — Cost and latency evals; how `n_turns`, `n_tool_calls`, and token counts give you a free efficiency signal from the transcript; and how delta evals answer the model-routing question with data instead of gut feel.
- **What about the other 5 surfaces?** — a light tour of hooks, subagents, cost and latency, and human usefulness.

Let's get started!

---

## What does a Claude Code evaluation map look like?

A Claude Code workflow is not a single thing that either works or does not. It is a sequence of decisions and actions — which skill or agent runs, what files it reads, what commands it executes, where it writes output, whether the control-plane mechanisms fire — and each of those steps is an independent place where something can go wrong.

[Anthropic Engineering post on demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) captures this with a useful framing. Think about a transcript. I am pretty sure everyone is now experiencing Zoom or Teams literally transcribing every single word of an online meeting. Whilst the literal transcription is probably useless in its raw format most cases, the data is there for summarisation.

Then, why not think about needing a transcript for a Claude Code workflow? Why not have "the complete record of a trial, including outputs, tool calls, reasoning, intermediate results, and any other interactions." If you had that to hand, what of things would you like to check and evaluate?

As mentioned in the intro, everyone is focusing on the final output, the final answer that your AI skill is providing. But, the final output is one element of that record.

The rest of it is also gradeable.

<!-- [Image #2: Components of Evaluations for Agents diagram — shows Evaluation harness with Evaluation suite, Task, Graders (deterministic_tests, llm_rubric, state_check, tool_calls), Tracked metrics (n_turns, n_toolcalls, tokens, latency), Trials with Trajectory (messages, tool_calls, reasoning...). Annotated: "Everyone is focused on this" pointing at Outcome / Final environment state, "But what about this???" pointing at the Evaluation suite components. Source: Anthropic's blog] -->

The image above is what I mentally picture as an evaluation map, and you can clearly see how the "outcome" is 1 module amongst all the others that we could be controlling and checking.

Taking the evaluation map, we can pick some of the components and ask ourselves the following questions:

<!-- [Image #4: Table of 8 evaluation surfaces — Surface / Core question / Example grader. Rows: Final output (Did it produce the right artefact? / Schema checks, LLM rubric), Tool use and trajectory (Did it follow an acceptable path? / Transcript checks, required-tool assertions), Skills (Did the right skill trigger and execute correctly? / Trigger logs, delta comparison), Agents/subagents (Was delegation useful and correctly integrated? / Invocation logs, output comparison), Hooks and commands (Did the control-plane mechanisms behave as intended? / Hook logs, side-effect assertions), Cost and latency (Was the workflow efficient enough to be useful? / Token counts, runtime, pass-rate by model), Human usefulness (Would a subject-matter expert sign off on this? / Calibrated rubric, human review), Instruction following (Did CLAUDE.md guidance change behaviour as expected? / Before/after comparison, trace review). Created with Datawrapper.] -->

But, for clarity, the map is a menu, not a checklist.

The right question is not "have I covered all components?"

It is "which of these could fail silently while my output checks pass?"

For a data science team using Claude Code to automate experiment documentation, the answer usually points to three: skills, tool use and trajectory, and cost.

Those are the surfaces this post goes deep on.

---

## How do you know the right skill or agent triggered?

### A short reminder of the A/B testing skill we introduced in part 1

In part 1 we presented a scenario where we wanted to build a Claude Code skill that drafted an A/B experiment design document. The idea was that, as an analytics and data science team, we run multiple A/B experiments over a year, and we would like to:

- Speed the process of compiling documentation.
- Standardise the documentation as everyone around us is looking at A/B testing in a slight different way.
- Enhance the quality of the experimentation analytical learnings.

Therefore, some success criteria would be:

- Contains a clearly stated hypothesis
- Names a primary metric and at least two guardrail metrics
- Includes sample size assumptions
- *States launch criteria and rollback criteria*
- *Does not invent metrics that were not provided as context*
- *Produces a markdown document with the expected section headings*

On purpose, I made some with italics because the bullet points reflect success criteria on an outcome, but as we mentioned in our map, there are many more things to check.

### Eval type 1: How do you know the right skill or agent triggered?

Well, the answer to that question is straightforward in 2 scenarios, but not as straightforward in a really important one.

**Scenario 1: You manually trigger the skill with a slash command.**

If you manually type `/ab_test_doc_skill`, then you are directly forcing the system to use this skill. Of course this is not part of an "eval suite" or "eval harness", but a manual trigger is the first step to anything automatic. If you can action it and it runs, then you know the system can fire the skill.

**Scenario 2: You visually see that Claude Code triggered the command.**

The next scenario is when you didn't action the skill with the slash command, but asking Claude something like "I want to write my A/B testing documentation for the latest experiment", triggers and spawns the skill. You know this because you are literally staring at the screen and see Claude invoking the relevant tool.

The important bit in this scenario is that you are manually evaluating if the Claude Code description is good enough to tell Claude when to use this skill. Claude Code [selects skills based on their description fields](https://code.claude.com/docs/en/skills) (the description in the frontmatter yaml is read into the context window in every session, so Claude knows what skills it has at its disposal). When you ask Claude to "draft an experiment design doc for the homepage ranking test", Claude reads available skill descriptions and decides which one applies. If the description is too vague, the wrong skill fires. If the description is missing the right trigger keywords, no skill fires and Claude falls back to a generic completion.

This is one of the worst failure types: silent regressions from the expected behaviour.

Claude can fall back to a generic completion and produce a good A/B testing doc, but that is not what we want to achieve. Therefore, by manually checking and typing some queries, you can get a sense if the skill fires correctly.

**Scenario 3: "Trigger" evals are the key.**

Trigger evals check whether the right skill fires for the right task. Trigger evals are nothing more than scenario 2, but on steroids. What I mean by this is that you can work with Claude to compile a list of 10-20 questions to check if the A/B testing skill is triggering or not.

- A positive trigger eval confirms the skill activates for a task it should handle.
- A negative trigger eval confirms it does not activate for a task it should not handle.

Negative trigger evals matter as much as the positive ones too, as you don't want Claude firing random skills that, at best, just waste thousands of tokens.

Here are some examples.

```yaml
id: skill_trigger_positive_001
skill: experiment-design
task: "Draft an experiment design document for a homepage ranking A/B test. Primary metric: conversion rate. Guardrail metrics: bounce rate, revenue per visit."
expected:
  should_trigger: true

id: skill_trigger_negative_001
skill: experiment-design
task: "Summarise this Python traceback and suggest a fix."
expected:
  should_trigger: false
```

**Are trigger evals important?**

Well, that depends. If your repo only has 1 skill, Claude will most likely always get the triggering of the skill right.

But, in my case, I don't just have 1 skill. In fact, my Claude space has 10-20 MCPs, 10 plugins that we built for our internal Claude marketplace and specific project skills. It is then crucial for me to make sure that my workflows know when to use the right tool.

---

## What did the workflow actually do during its run?

Now that we know that we can check if the main skill is correctly triggered by Claude, it is interesting to know if Claude followed our skill instructions. You could argue that evaluating this is equivalent to evaluating the final output. In other words, if we have good output evaluations that produce what we want, then either we don't care about how the skill produced it, or, we assume the skill followed the right instructions.

But, I don't think this is good practice.

Going back to the A/B testing skill, imagine that our skill produces documents with the right formatting and with correct statistical reasoning. But how do we know that the document is grounded in the metrics the team actually agreed to use? Or grounded in logics such as "never look at this segment", or, "correct multiple p-values with Bonferroni"?

The only way to be more confident about this, is to evaluate multiple scenarios. For example, imagine that we have several auxiliary artefacts to help us build a good A/B test report:

- A `docs/metrics.md` that defines the important primary and guardrail metrics for our project.
- A `scripts/calculate-proportion-tests.py` or `scripts/calculate-power-analysis.py`.
- An `agent/statistics-reviewer.md` that reviews the output.

The above might be instructions that we have in our main `ab_test_doc_skill` and we want to ensure the instructions are faithfully being followed.

For the A/B test skill, that translates to: did a Read call to `docs/metrics.md` appear anywhere in the transcript before the first Write call that produced the document?

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

Other trajectory checks worth building for this skill:

- Did Claude avoid reading files outside the expected scope (no reads of unrelated configuration files or sensitive directories)?
- Did it recover correctly if the first draft failed a validation check, rather than silently returning the failed draft?
- Did it avoid retrying the same failing command more than once?

This is where the Anthropic Engineering post's framing of the transcript as "the complete record of a trial, including tool calls, reasoning, and intermediate results" becomes operational. You are not grading the final message. You are grading the sequence of actions that produced it.

---

## Was the workflow efficient enough to actually use at scale?

The A/B test document skill works. It triggers correctly. It reads `docs/metrics.md` before writing. The output passes the rubric.

Now imagine your team runs it 50 times a week — one document per experiment, across three squads. At that volume, a skill that quietly consumes 3× more tokens than it needs is not a quality problem. It is a cost problem. And no output eval will catch it.

This is the third surface worth instrumenting for a data science team: cost and latency.

### What the transcript gives you for free

Every Claude Code run produces a transcript. That transcript already contains the raw numbers you need:

- `n_turns` — how many back-and-forth exchanges happened before the skill completed
- `n_tool_calls` — how many Read, Write, Bash, and other tool calls were made
- Token counts — input and output tokens consumed across the run
- Duration — elapsed time from first message to final write

None of these require an LLM grader. They are countable directly from the transcript. A cost eval is nothing more than asserting that those numbers stayed within a budget you defined upfront.

```yaml
id: cost_001
task: "Draft an experiment design document for the homepage ranking A/B test."
checks:
  - max_input_tokens: 8000
  - max_output_tokens: 3000
  - max_tool_calls: 10
  - max_turns: 5
  - max_duration_seconds: 30
```

If the skill exceeds any threshold, the eval fails — not because the document was wrong, but because the workflow was inefficient. A skill that hits `max_tool_calls: 10` probably read the same file twice, or made redundant Bash calls that a tighter SKILL.md instruction would have prevented.

### The model-routing question

Cost evals become especially useful when you are making model selection decisions.

Part 1 of this series introduced the idea that different Claude models carry different cost and capability tradeoffs. The practical question for a data science team is: can a smaller, faster, cheaper model (`haiku`) handle this skill acceptably, or does quality degrade enough to fail the output rubric?

A delta eval answers this directly. Run the same task against two model configurations and compare both the cost metrics and the quality score:

```yaml
id: cost_delta_001
task: "Draft an experiment design document for the homepage ranking A/B test."
variants:
  - model: claude-haiku-4-5
    label: budget
  - model: claude-sonnet-5
    label: standard
checks_per_variant:
  - max_input_tokens: 8000
  - rubric_score_min: 3.5  # from the Part 1 LLM rubric
compare:
  - metric: input_tokens
    expect: budget < standard
  - metric: rubric_score
    expect: budget >= rubric_score_min
```

If `haiku` passes the rubric threshold at a third of the token cost, you have a data-backed case for routing that skill to the cheaper model. If it fails, you know the capability gap is real and the sonnet cost is justified.

This is the kind of decision that teams usually make by gut feel. A cost delta eval makes it a measurement.

### What this catches that output evals miss

A skill can produce a perfect document and still be wasteful. Common patterns that cost evals surface:

- The skill re-reads `docs/metrics.md` on every run even when the file has not changed — a caching or instruction problem, not a quality problem.
- An intermediate reasoning step ballooned `n_turns` from 3 to 9 on complex inputs — the skill works, but it is 3× slower on edge cases.
- A subagent was invoked unnecessarily for a task the main session could have handled — adds latency and tokens without quality benefit.

None of these show up in a format check or an LLM rubric. They only show up when you instrument the run itself.

---

## What about the other five surfaces?

We have gone deep on three: trigger evals, trajectory evals, and cost evals. But the full evaluation map had eight surfaces. Let's do a quick tour of the remaining five — what each one checks and why it matters — so you can decide which ones are worth prioritising for your own workflow.

**Final output evals** — we actually covered these in part 1. They are the baseline. Does the document exist? Does it have the right headings? Does the statistical reasoning hold up? Every other surface in this post builds on top of output evals, not instead of them. If your output eval passes but a trajectory eval fails, something went wrong on the path to a lucky answer.

**Hooks and commands** — think of [hooks](https://code.claude.com/docs/en/hooks) as the guardrails you can wire into Claude Code so that certain things are enforced regardless of what Claude decides to do. For example, you could build a hook that fires every time Claude writes a file and checks that the output path is inside `docs/experiments/` — if it is not, the write is blocked. Hook evals check whether a hook fired when it should have, produced the expected side effect, and did not fire when it should not have. A hook that fires on every write is noisy and annoying. A hook that never fires is invisible and pointless. Both are failures, and neither shows up in an output eval.

**[Subagent](https://code.claude.com/docs/en/sub-agents) evals** — some Claude Code workflows delegate parts of the task to a subagent. In the A/B testing skill, you might have a `statistics-reviewer.md` subagent whose job is to sanity-check the sample size calculation before the document is finalised. Subagent evals check two things: did the subagent actually get called? And did the main workflow use its output? A subagent that produces a thorough review and gets ignored is just wasted tokens. The failure is not in the subagent — it is in the integration.

**Human usefulness evals** — some things you just cannot automate away. A document can pass every format check, every trajectory check, and every cost check, and still be genuinely useless to the person who has to act on it. Maybe the hypothesis is stated so vaguely it could never be falsified. Maybe the rollback criteria say "if performance degrades" without defining what degradation means. A calibrated rubric reviewed by a real data scientist catches these cases. The discipline here is to reserve human review for the questions that scripts cannot answer — not to use it as a substitute for the checks that can be automated.

**Instruction following evals** — these are before/after comparisons. You add a rule to your `CLAUDE.md` or your skill description — say, "always apply Bonferroni correction when testing multiple variants" — and then you run the same task and check whether the output reflects that instruction. Instruction following evals are most useful when a rule change is supposed to prevent a recurring mistake, and you want actual evidence that it did rather than assuming it worked.

---

Not every workflow needs all eight surfaces. A skill that generates a weekly stakeholder summary probably needs output evals and a human usefulness check. A skill that modifies experiment configuration files needs trajectory evals and hook evals. The map is a menu — start with the surfaces where a silent failure would cause the most damage for your specific workflow.

---

## So can you actually access the transcript?

Throughout this post I have been referring to "the transcript" as if it is something you can just pick up and query. Let me be more precise about what that means in practice, because there is a meaningful gap between what Anthropic can observe and what we as users can access today.

### What Anthropic sees

Anthropic runs their own internal evaluation infrastructure against Claude models. They have access to highly structured, deterministic logs — every token, every tool call, every intermediate state, timestamped to the millisecond, queryable across thousands of runs. That is the machinery behind the hundreds of evals they run before each model release. It is not something a user running Claude Code locally has out of the box.

### What we have access to

The good news: Claude Code does write a local transcript for every session. On your machine, at:

```
~/.claude/projects/<your-project-path>/<session-id>.jsonl
```

Each line is a JSON object. The structure looks roughly like this from a real session:

```json
// A tool call (assistant reads a file)
{
  "type": "assistant",
  "message": {
    "model": "claude-sonnet-4-6",
    "content": [
      {
        "type": "tool_use",
        "name": "Read",
        "input": { "file_path": "docs/metrics.md" }
      }
    ],
    "usage": {
      "input_tokens": 3,
      "cache_read_input_tokens": 79079,
      "output_tokens": 175
    }
  },
  "timestamp": "2026-07-31T05:15:12.468Z"
}
```

```json
// A user message (tool result returned to Claude)
{
  "type": "user",
  "message": {
    "role": "user",
    "content": [
      {
        "type": "tool_result",
        "tool_use_id": "toolu_015dkz...",
        "content": "1\t# Metrics\n2\t..."
      }
    ]
  }
}
```

From these files you can, in principle, count tool calls, sum token usage across turns, identify which files were read and in what order, and reconstruct the full sequence of actions for any session.

The catch: Anthropic documents these files as internal and unstable. The schema is not a published API and can change between versions. Scripts that parse these files directly may break on any Claude Code release.

### The documented programmatic path

If you are running Claude Code skills programmatically (not interactively in the terminal), there is a better option. The [Claude Code Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) — available in both Python and TypeScript — runs a skill and returns a `ResultMessage` at the end with:

```python
result = await run_session(prompt="Draft an experiment design document...")

print(result.num_turns)         # number of back-and-forth turns
print(result.usage)             # input_tokens, output_tokens, cache tokens
print(result.total_cost_usd)    # estimated cost for the run
print(result.subtype)           # "success", "error_max_turns", etc.
```

For the CLI, non-interactive mode returns the same data as JSON:

```bash
claude -p "Draft an experiment design document..." --output-format json
```

What is not exposed in either path: duration (no timing field in the documented surface), and tool call count is not a first-class field — you count it yourself from the streamed messages.

### The honest state of things

So the eval YAML I showed earlier in this post:

```yaml
checks:
  - max_input_tokens: 8000
  - max_tool_calls: 10
  - max_turns: 5
  - max_duration_seconds: 30
```

The first three are achievable today with the SDK. `max_turns` maps to `result.num_turns`. `max_input_tokens` maps to `result.usage.input_tokens`. `max_tool_calls` requires counting tool-use blocks from the message stream yourself — doable, just not a one-liner. `max_duration_seconds` is not exposed in any documented interface right now.

I want to investigate this further. In the next post, I'll try running some of these SDK commands against our A/B testing skill and report back on what the eval harness actually looks like in practice — not aspirationally, but from a real run. That is part 3.

---



Before we wrap up, one important clarification: this post has not told you how to actually run any of these evals. We have not talked about eval harnesses, test runners, CI pipelines, or how to wire any of this into your day-to-day workflow. That is intentional — and it is what part 3 is for.

The goal of this post was narrower: to make you think about all the things you could check.

Anthropic runs hundreds of evals on their models and systems. Not ten. Hundreds. They check output quality, tool-use trajectories, cost per task, instruction following, safety properties, latency regressions — across thousands of task variants. That is not because they are paranoid. It is because they know that a system this complex can fail in many different ways simultaneously, and that most of those failures are silent if you are only watching the final answer.

Your A/B testing skill is not a frontier model. But the principle is the same. If you only check the output, you are leaving most of the failure surface completely unmonitored.

So here is what I hope you take away from this post:

- **The final document is one surface out of eight.** A skill can produce a perfectly formatted document while the wrong skill triggered, the right context file was never read, and the output landed in the wrong directory. Output evals catch none of that.
- **Trigger evals are the most overlooked.** As soon as you have more than a handful of skills or tools, the question of whether the right one fires becomes non-trivial. Negative trigger evals — confirming a skill does not fire for unrelated tasks — matter as much as positive ones.
- **The transcript is a free source of evidence.** Tool calls, file reads, token counts, number of turns — all of it is already there. You do not need to instrument anything new to start grading the path, not just the destination.
- **Cost evals are not optional at scale.** If your team runs a skill dozens of times a week, a workflow that quietly consumes 3× more tokens than it needs is a real operational problem. It just does not look like one until you measure it.
- **The map is a menu, not a checklist.** You do not need all eight surfaces on day one. Pick the two or three where a silent failure would hurt your team the most, and start there.

Part 3 will show you how to actually build and run a small eval suite — without needing a dedicated infrastructure team or a PhD in evaluation methodology.

---

## Now, I want to hear from you!

Think of one Claude Code workflow, skill, or agent that you already trust. Something you have used more than a handful of times and would describe as reliable. Now ask yourself: if a colleague asked you to prove it works — not "it looks good" but measurably, repeatably works — what would you show them?

If the answer is "I would run it and show them the output," that is not proof. That is a demonstration of one run from a distribution you have not characterised.

Three questions to sit with:

- Which surface would catch the failure mode you have actually experienced — a wrong output, a wrong file location, a skill that silently did not trigger?
- If you have Claude Code skills or agents in production, have you ever run a negative trigger eval to confirm they do not activate for unrelated tasks?
- Between trigger evals, trajectory evals, and cost evals — which one feels most immediately useful for the workflows you are building?

Share your thoughts in the comments. Concrete examples of what other people are building and evaluating are exactly the kind of thing that makes this series worth writing.

*Part 3 is where we move from map to harness — how to actually build and run a small eval suite without needing a dedicated infrastructure team. Coming soon.*

---

## References

[Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Defines transcripts as the complete trial record including tool calls and intermediate results; introduces the evaluation map framing used throughout this post.

[Extend Claude with skills](https://code.claude.com/docs/en/skills) — Official documentation for skills: SKILL.md format, description field behaviour, trigger mechanics, and troubleshooting for skills not triggering.

[Hooks reference](https://code.claude.com/docs/en/hooks) — Official documentation for Claude Code hooks: pre- and post-action shell commands, enforcement behaviour, and configuration.

[Create custom subagents](https://code.claude.com/docs/en/sub-agents) — Official documentation for subagents: context isolation, specialisation, tool restrictions, and model routing.

[Claude Code memory and CLAUDE.md](https://code.claude.com/docs/en/memory) — Documents persistent instructions and the distinction between `CLAUDE.md` as context versus hooks as enforcement — relevant to the instruction following surface.

[Claude Code Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) — Programmatic interface for running Claude Code skills and retrieving structured run data: turn counts, token usage, cost estimates.
