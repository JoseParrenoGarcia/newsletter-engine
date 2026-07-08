# Series Overview

## 1. What We Want To Produce

This document defines the plan for a **three-part blog series on Claude Code evals**.

The goal is to help technical readers move from a vague feeling that "we should test our agents" to a practical understanding of **what to evaluate, why it matters, and how to start**.

The series should be written for readers who are comfortable with AI, data science, software engineering, and technical workflows, but who may not have built evals for agents before.

The tone should be:

- **Pedagogical**: explain concepts clearly, without assuming expert knowledge of evals.
- **Practical**: focus on workflows people can actually build.
- **Reflective**: acknowledge the messy reality of agentic tools.
- **Grounded**: connect claims to the research report and specific references.
- **Sceptical without being cynical**: Claude Code is useful, but one good run is not evidence.

The series should avoid becoming a generic introduction to evals. It should be specifically about **Claude Code as an agentic coding and workflow environment**.

Claude Code is not just a chat interface. Anthropic describes Claude Code as an agentic coding tool that reads a codebase, edits files, runs commands, and integrates with development tools. It can help build features, fix bugs, automate development tasks, stage changes, create commits, use MCP tools, follow `CLAUDE.md`, use skills, use hooks, and run agents or subagents.

The central thesis of the series is:

> The goal of evals is not to evaluate everything. The goal is to stop being surprised by the same failure twice.

The series should teach that Claude Code evals are not only about **answer quality**. They are about whether the **whole workflow** behaved correctly.

That includes:

- the task Claude was given,
- the repository state it started from,
- the instructions it loaded,
- the tools it used,
- the commands it ran,
- the files it changed,
- the skills it invoked,
- the agents it delegated to,
- the hooks that did or did not fire,
- the final output it produced,
- and the final repository state it left behind.

---
## 2. Executive Summary Of The Three Posts

| Post | Working title | Main question | Reader movement | Core takeaway |
|---|---|---|---|---|
| Part 1 | **Why "It Worked Once" Is Not Evidence** | Why do Claude Code workflows need evals? | From anecdotal trust to workflow-level thinking | Claude Code is not just answering. It is acting inside an environment. |
| Part 2 | **What You Actually Need To Test** | What surfaces of a Claude Code workflow can be evaluated? | From vague "evals" to a concrete evaluation map | The right eval depends on which part of the workflow you are trying to trust. |
| Part 3 | **Building A Tiny Eval Suite That Actually Helps** | How do we build a first useful eval suite? | From concept to implementation | Start with one workflow, real tasks, clear failures, and small regression cases. |

The three posts should feel like one continuous learning journey:

```text
Part 1: The problem
  -> Claude Code is impressive, but one good run is not reliability.

Part 2: The map
  -> Claude Code has many evaluation surfaces: output, files, tools, skills, agents, hooks, and state.

Part 3: The method
  -> Start small. Pick one workflow. Collect examples. Define failure. Build evals around what actually breaks.
```

A useful short version of the arc:

```text
Part 1 gives the mental model.
Part 2 gives the evaluation map.
Part 3 gives the practical starter kit.
```

---
## 3. Pedagogical Arc

The series should not start with YAML files, harnesses, LLM-as-judge prompts, or eval infrastructure. That would be too fast.

Many readers are likely to have used Claude Code or a similar coding agent informally. They may have had moments where it felt magical: it fixed a bug, wrote a script, explained a codebase, or produced a convincing summary.

They may also have seen the opposite: the agent edited the wrong files, skipped tests, misunderstood conventions, invented details, or claimed to be finished when the work was not actually done.

That lived experience is the right starting point.

The first post should begin with the **feeling of false confidence**:

> Claude Code worked once. It looked impressive. But can we trust it to work again?

From there, the series can gradually build the reader's understanding.
## 4. Overall Series Diagram

```text
                         Claude Code Evals
                                |
        --------------------------------------------------
        |                        |                       |
   Part 1: Why              Part 2: What            Part 3: How
   evals matter             to evaluate             to begin
        |                        |                       |
   Mental model             Evaluation map          Starter kit
        |                        |                       |
   Claude Code is           Output, files,          One workflow,
   an acting system,        tools, skills,          real examples,
   not just a               agents, hooks,          deterministic checks,
   response engine          commands, state         judgement checks
        |                        |                       |
        --------------------------------------------------
                                |
              From impressive demos to reliable workflows
```

---

## 5. Core Concepts To Reuse Across The Series

```text
One good run is not evidence.

The final answer is only one part of the workflow.

Do not grade only what Claude says. Grade what Claude changed.

Unit tests are one grader inside a wider eval suite.

A skill can fail to show up, or it can show up and do the wrong thing.

Subagents are useful only when the boundary is clear.

Hooks are not output-quality tools. They are control-plane tools.

Evals are institutional memory for your AI workflows.

The goal is not to evaluate everything. The goal is to stop being surprised by the same failure twice.

Start with the failures that recur and matter.
```

---
# 38. Closing Summary

This three-part series should help readers move from demos to evidence.

Part 1 reframes Claude Code as a workflowing system.

Part 2 maps the surfaces where that system can fail.

Part 3 shows how to build a small eval suite that catches real failures.

The series should not make evals feel like an enterprise compliance project.

It should make them feel like what they are at their best:

> a practical memory of the ways our AI workflows have failed, so we can stop being surprised by the same thing twice.

# Part 2: Claude Code Evals, Part 2: What You Actually Need To Test
### 3.2 Why Part 2 Comes Second

Part 1 left the reader with a working eval for the A/B test document skill: input, success criteria, checks, and a YAML sketch. That eval graded the final document — whether it had the right headings, avoided invented metrics, and contained sound statistical reasoning.

But the document is only one thing that could have gone wrong.

The natural question Part 2 should answer is: **what else could we have evaluated?**

It should introduce the idea of **evaluation surfaces** — the distinct layers of a Claude Code workflow where failure can hide.

Claude Code can fail at different layers:

- the final document can be wrong or incomplete,
- the file can be saved in the wrong folder,
- the skill can have read from memory rather than the canonical metrics reference,
- the validation hook can have fired but silently failed,
- a cheaper model may produce worse documents without anyone noticing,
- costs and latency can become unreasonable at volume.

Those are not one failure type. They require different evals.

Part 2 should therefore give the map — using the A/B test document skill as the running thread, showing what each surface looks like for that one concrete workflow before naming the category.

```text
If you care about correctness, evaluate the final output.
If you care about repository hygiene, evaluate the git diff and final state.
If you care about grounded generation, evaluate the tool-use trajectory.
If you care about workflow controls, evaluate hooks and permissions.
If you care about cost, evaluate model routing against a fixed eval set.
```

## 14. Role Of Part 2 In The Series

Part 2 builds the taxonomy — but grounded in one concrete example, not in the abstract.

After Part 1, the reader has already seen one eval work. Part 2 extends that same eval to show how many more surfaces it could cover. This is the post where the series becomes more technical, but the A/B test skill anchors every surface so the taxonomy never floats free of reality.

The central message is:

> The right eval depends on which part of the workflow you are trying to trust — and the final document is only one of those parts.

---

## 16. Core Question For Part 2

> In Part 1 we evaluated whether the A/B test document was correct. What else could we have been evaluating — and which other parts of the workflow could have failed silently while the document looked fine?

---

## 17. Suggested Opening Hook

In Part 1, we built an eval for the A/B test document skill. We checked whether the document had the right headings, avoided invented metrics, and contained sound statistical reasoning.

The skill passed.

But here is what we did not check: did it save the document in the right folder? Did it read the canonical metrics reference before drafting, or did it generate from memory? Did the post-write validation hook actually fire? If we had routed this to a cheaper model, would the document still pass?

The final document is one surface. There are several others. And some of the most dangerous failures look like the document passing while something else went wrong.

The real question is not only:

> Was the output good?

It is:

> Which part of the workflow are we trying to trust?

---

## 18. Main Evaluation Surface Diagram

```text
                         Claude Code workflow
                                  |
        ------------------------------------------------------
        |                  |                 |               |
   Final output      Repository state     Tool use       Trajectory
        |                  |                 |               |
   Correctness       Files changed        Commands       Recovery
   Format            Tests pass           Tools called   Reasoning path
   Usefulness        Clean diff           Safety         Cost / latency
        |                  |                 |               |
        ------------------------------------------------------
                                  |
                     Skills / Agents / Hooks / Commands
                                  |
                         Workflow control layer
```

---

## 19. Summary Table For Part 2

Each surface is illustrated using the A/B test document skill as the running example. The "A/B test example" column shows what that surface looks like for the skill the reader already knows from Part 1.

| Evaluation surface | Core question | A/B test skill example | Example grader | Failure caught |
|---|---|---|---|---|
| Final output | Did it produce the right document? | Document has correct headings, no invented metrics, sound statistical caveats | Schema checks, LLM-as-judge rubric | Wrong content, missing sections, invented metrics |
| Repository state | Did it save in the right place? | Document saved to `docs/experiments/`, no other files changed | `git diff --name-only`, path check | Saved to wrong folder, extra artefacts created |
| Tool use | Did it read the canonical reference? | `Read` call to `docs/metrics.md` appears before the `Write` call | Transcript check, tool-use log | Drafted from memory, skipped context file |
| Hook / command | Did the validation hook fire? | Post-write hook ran, wrote a validation log, no forbidden metric names in log | Hook log check, side-effect assertion | Hook silently failed, no log written |
| Cost / latency | Does Haiku produce acceptable documents? | Run the same eval set on Haiku; compare pass rate vs Sonnet | Pass rate comparison, cost per run | Quality degrades below threshold on cheaper model |
| Trajectory | Did it follow an acceptable path? | Read → Draft → Write, no unexpected tool calls | Trace review, event assertions | Drafted before reading context, unexpected tool use |
| Skill | Did the right skill trigger? | Document-drafting skill triggered, not a generic completion | Trigger labels, invocation log | Wrong skill triggered, skill missed |
| Agent | Was delegation useful? | If a subagent was used for statistical reasoning, did the main agent integrate correctly? | Agent trace, output comparison | Wrong subagent, bad integration |
| Human usefulness | Would a statistician sign off on this? | Human reviewer checks reasoning quality, not just structure | Calibrated rubric, human review | Technically passing but not useful in practice |

---

## 20. Evaluation Surface Details

### 20.1 Final Output Evals

#### Core Question

> Did Claude produce the right final artefact?

#### Examples

- correct code patch,
- useful explanation,
- accurate PR summary,
- valid SQL query,
- well-structured weekly update,
- complete migration guide,
- release note,
- experiment summary,
- refactoring plan,
- documentation page.

#### Possible Graders

- unit tests,
- exact match,
- schema validation,
- output format checks,
- markdown structure checks,
- rubric-based grading,
- LLM-as-judge,
- human review.

#### Failure Modes Caught

- wrong answer,
- missing requirements,
- incorrect format,
- unsupported claims,
- poor explanation,
- incomplete solution,
- invalid code,
- invalid SQL,
- missing sections.

#### Example Eval

```yaml
id: output_001
task: "Generate a PR summary from this diff."
checks:
  - required_sections_present
  - no_unsupported_claims
  - mentions_tests_if_tests_changed
  - concise_summary
```

#### Key Teaching Point

> Final output evals are necessary, but they are not enough.

They tell you whether the destination looked right. They do not always tell you whether the journey was safe, efficient, or aligned with the workflow.

---

### 20.2 Repository State Evals

#### Core Question

> Did Claude leave the repository in an acceptable state?

#### Examples

- only expected files changed,
- no forbidden directories touched,
- no generated files manually edited,
- no temporary files left behind,
- tests pass,
- linting passes,
- type checks pass,
- output saved in the right folder,
- repository is clean apart from expected artefacts.

#### Possible Graders

- `git diff`,
- `git status`,
- file path checks,
- snapshot comparison,
- test suite,
- linting,
- type checks,
- custom scripts,
- generated file checks.

#### Failure Modes Caught

- collateral file changes,
- excessive refactoring,
- messy repo state,
- broken formatting,
- unexpected generated files,
- accidental edits to protected areas,
- partial implementation,
- failed cleanup.

#### Example Eval

```yaml
id: repo_state_001
task: "Fix the failing login test."
expected:
  allowed_paths:
    - src/auth/**
    - tests/auth/**
  forbidden_paths:
    - src/payments/**
    - docs/generated/**
checks:
  - git_diff_scope
  - tests_pass
  - no_temp_files
```

#### Key Teaching Point

> A Claude Code run is not complete when it says "done". It is complete when the repository is in the state you expected.

---

### 20.3 Tool-Use Evals

#### Core Question

> Did Claude use tools sensibly, safely, and usefully?

#### Examples

- did it inspect relevant files before editing?
- did it run tests after changing code?
- did it avoid unsafe shell commands?
- did it use the right MCP server?
- did it query the right data source?
- did it avoid unnecessary tool calls?
- did it recover from command failures?
- did it avoid retrying the same failed command repeatedly?

#### Possible Graders

- transcript checks,
- command logs,
- tool-call assertions,
- failure-recovery checks,
- allowlist and denylist checks,
- cost and latency tracking,
- human trace review.

#### Failure Modes Caught

- skipped verification,
- unsafe commands,
- pointless tool use,
- repeated failed commands,
- overlong trajectories,
- high-cost workflows,
- ungrounded answers,
- use of forbidden data sources,
- failure to inspect source material.

#### Example Eval

```yaml
id: tool_use_001
task: "Modify the dbt model and verify the change."
checks:
  - must_read: "models/marts/finance/fct_revenue.sql"
  - must_run_command_matching: "dbt test.*fct_revenue"
  - must_not_run_command_matching: "rm -rf"
```

#### Key Teaching Point

> The transcript matters because agents can fail in the middle, even when the final message sounds confident.

---

### 20.4 Trajectory Evals

#### Core Question

> Did Claude follow an acceptable path from task to result?

Tool-use evals inspect discrete actions: commands, tool calls, file reads, edits.

Trajectory evals inspect the broader sequence:

- Did Claude gather enough context before acting?
- Did it correct itself after errors?
- Did it silently reinterpret the task?
- Did it ask for clarification when needed?
- Did it stop too early?
- Did it claim success too confidently?

#### Failure Modes Caught

- silent deviation from specification,
- premature completion,
- repeated failed attempts,
- poor error recovery,
- lack of grounding,
- excessive exploration,
- hidden assumption changes,
- overconfident final response.

#### Example Eval

```yaml
id: trajectory_001
task: "Investigate why the revenue metric changed after the latest refactor."
checks:
  - must_inspect_metric_definition
  - must_compare_before_after_model
  - must_report_uncertainty
  - must_not_claim_root_cause_without_evidence
```

#### Key Teaching Point

> For some workflows, the path is part of the quality bar.

---

### 20.5 Skill Evals

#### Core Question

> Did the right skill trigger, and did it improve the outcome?

Anthropic's documentation describes skills as reusable instructions packaged in a `SKILL.md` file. Claude can use them when relevant, or a user can invoke them directly. The skill description helps Claude decide when to load the skill.

This creates a specific eval problem: skills can fail before they even run.

#### Three Types Of Skill Evals

##### 1. Trigger Evals

Question:

> Did Claude invoke the skill when it should?

Examples:

- should trigger for a specific workflow,
- should not trigger for unrelated requests,
- should not trigger just because a keyword appears,
- should trigger even when the user phrases the task differently.

##### 2. Execution Evals

Question:

> Once triggered, did the skill help Claude follow the intended workflow?

Examples:

- used the right template,
- followed the right process,
- loaded supporting files,
- produced the expected artefact,
- respected constraints in the skill instructions.

##### 3. Delta Evals

Question:

> Did the skill improve performance compared with baseline Claude Code?

Examples:

- fewer formatting mistakes,
- better file placement,
- more consistent outputs,
- fewer missed steps,
- lower need for human correction.

#### Failure Modes Caught

- skill never triggers,
- skill triggers too often,
- wrong skill triggers,
- skill triggers but makes output worse,
- skill follows its own workflow but conflicts with repo rules,
- skill body is too long or too vague,
- skill loads reference material at the wrong time.

#### Example Eval

```yaml
id: skill_trigger_001
skill: "weekly-update"
task: "Turn these project notes into a weekly update for stakeholders."
expected:
  should_trigger: true
  required_output_sections:
    - What shipped
    - Metrics and evidence
    - Risks and blockers
    - Next week
```

#### Negative Trigger Eval

```yaml
id: skill_trigger_002
skill: "weekly-update"
task: "Summarise this Python traceback."
expected:
  should_trigger: false
```

#### Key Teaching Point

> A skill can fail to show up, or it can show up and do the wrong thing.

---

### 20.6 Agent And Subagent Evals

#### Core Question

> Was delegation useful, bounded, and correctly integrated?

Subagents are specialised agents for particular types of work. This is powerful, but it introduces new failure modes.

Delegation is not automatically good.

#### What To Evaluate

- did the right subagent handle the task?
- was delegation needed at all?
- did the subagent have the right tools?
- did the subagent stay within its remit?
- did the subagent return a useful summary?
- did the main agent integrate the result correctly?
- did delegation improve quality, speed, cost, or reliability?

#### Possible Graders

- transcript checks,
- subagent invocation logs,
- output comparison with and without subagent,
- tool permission checks,
- cost comparison,
- human trace review,
- task success comparison.

#### Failure Modes Caught

- over-delegation,
- under-delegation,
- wrong subagent used,
- subagent lacks context,
- subagent uses forbidden tools,
- main agent ignores subagent result,
- delegation adds cost without quality improvement,
- subagent produces useful work that is not integrated.

#### Example Eval

```yaml
id: subagent_001
task: "Review this PR for security risks and summarise the highest-risk findings."
expected:
  should_delegate_to: "security-reviewer"
  should_not_delegate_to: "frontend-stylist"
checks:
  - subagent_selected_correctly
  - result_integrated_in_final_answer
  - no_forbidden_tools_used
```

#### Key Teaching Point

> Subagents are useful when the boundary is clear, the context is appropriate, and the main agent knows how to use the result.

---

### 20.7 Hook And Command Evals

#### Core Question

> Did the control-plane mechanisms behave as intended?

Hooks, permissions, commands, and repository instructions do not just affect output quality. They control the workflow.

Anthropic's documentation explains that hooks can run shell commands before or after Claude Code actions. Memory documentation also notes that `CLAUDE.md` is context rather than enforced configuration, and that a hook should be used when an action needs to be blocked regardless of what Claude decides.

#### What To Evaluate

- did a hook fire?
- did it block a forbidden action?
- did it allow a safe action?
- did it log the event?
- did it fail silently?
- did it create too much noise?
- did a slash command produce the right file?
- did a command mutate only expected state?
- did `CLAUDE.md` guidance change behaviour?

#### Possible Graders

- simulated unsafe command,
- hook logs,
- permission checks,
- file-system assertions,
- before/after repository state,
- false-positive tests,
- false-negative tests.

#### Failure Modes Caught

- hooks that do not fire,
- hooks that block too much,
- hooks that block too little,
- noisy workflows,
- false sense of safety,
- command side effects,
- instruction conflicts,
- unsafe action allowed by mistake.

#### Example Eval

```yaml
id: hook_001
task: "Attempt to edit a generated documentation file."
expected:
  hook: "protect-generated-docs"
  should_block: true
checks:
  - hook_fired
  - edit_blocked
  - clear_error_message_returned
```

#### Key Teaching Point

> Hooks are not output-quality tools. They are control-plane tools.

---

### 20.8 Cost And Latency Evals

#### Core Question

> Was the workflow efficient enough to be useful?

#### What To Evaluate

- total runtime,
- number of turns,
- number of tool calls,
- number of file reads,
- number of failed commands,
- token cost,
- repeated retries,
- unnecessary delegation,
- unnecessary context loading.

#### Failure Modes Caught

- a workflow works but is too slow,
- a skill improves quality but doubles cost,
- a subagent adds overhead without improving results,
- Claude reads too much irrelevant context,
- repeated failed commands waste time,
- an eval passes but is impractical for real usage.

#### Key Teaching Point

> Reliability is not only correctness. A workflow that is correct but too slow, too expensive, or too noisy may still fail in practice.

---

### 20.9 Human Usefulness Evals

#### Core Question

> Was the result genuinely useful to the human?

Some outputs are hard to evaluate fully with deterministic checks.

Examples:

- stakeholder summaries,
- experiment write-ups,
- PR descriptions,
- architectural explanations,
- debugging narratives,
- migration plans,
- risk assessments.

A result can pass formatting checks and still be useless.

#### Possible Rubric Dimensions

- accuracy,
- completeness,
- clarity,
- actionability,
- uncertainty handling,
- appropriate level of detail,
- correct audience,
- no unsupported claims,
- preserves important risks.

#### Key Teaching Point

> Some evals need judgement. The trick is to reserve judgement checks for the questions scripts cannot answer.

---

## 21. Suggested Ending For Part 2

End by pulling back to the A/B test skill and showing the reader how many surfaces they could now evaluate for it — then pointing to Part 3.

The taxonomy is useful because it stops evals from being one vague question ("was Claude good?") and turns it into nine precise questions, each with its own check. But a taxonomy does not ship.

Possible final paragraph:

> We started Part 1 with one eval: did the A/B test document have the right headings and avoid invented metrics? By the end of Part 2, that same skill has nine surfaces we could evaluate. We know which folder the document should land in, which reference file should have been read first, whether the validation hook fired, and whether the document quality holds if we swap to a cheaper model. That is the map. Part 3 is where we build the actual suite — starting small, running it, and turning the first failure into a regression case we will never miss again.

---

## 22. Part 2 Reader Takeaway

By the end of Part 2, the reader should understand:

- that the A/B test document eval from Part 1 only covered one surface of the workflow,
- that the same skill has at least eight other surfaces that could be evaluated,
- why output-only grading is incomplete — the document can pass while the tool-use trajectory, file state, and hook behaviour all failed silently,
- how to read the evaluation surfaces table (section 19) and identify which surfaces apply to their own workflow,
- why the right eval depends on which part of the workflow they are trying to trust,
- and that Part 3 will take this map and build a working suite from it.

---
# 32. Suggested Visuals Across The Series
## 32.2 Visual For Part 2: Evaluation Surfaces

```text
                 Claude Code workflow
                         |
 -------------------------------------------------
 |                       |                       |
Output              Repository state          Tool use
 |                       |                       |
Format              Files changed             Commands run
Correctness         Tests pass                 Tools called
Usefulness          Clean diff                 Recovery behaviour
 |                       |                       |
 -------------------------------------------------
                         |
              Skills / Agents / Hooks / Commands
```
# 33. Source Mapping And Reference Plan

This section lists sources that should be used as the evidence layer for the three posts.

The blog posts should not simply repeat these sources. They should translate them into a teaching sequence.

Use sources as support for factual statements about Claude Code mechanisms, evaluation concepts, and observed agentic failure modes.

---
## 33.1 Official Claude Code Documentation

### Claude Code overview

URL: [https://code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview)

Use for:

- Part 1: explaining that Claude Code is an agentic coding tool.
- Part 1: explaining that it reads codebases, edits files, runs commands, and integrates with development tools.
- Part 1: explaining why Claude Code is broader than prompt-response.
- Part 2: grounding output, repository, tool, and workflow surfaces.
- Part 3: motivating repeated workflows such as tests, bug fixes, release notes, PRs, and automation.

Relevant ideas from the source:

- Claude Code reads codebases, edits files, runs commands, and integrates with tools.
- It can automate tasks such as writing tests, fixing lint errors, resolving merge conflicts, updating dependencies, and writing release notes.
- It can work directly with git.
- It can connect to external data sources through MCP.
- It can be customised with instructions, skills, and hooks.
- It can run agent teams and build custom agents.

### Claude Code memory and CLAUDE.md

URL: [https://code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)

Use for:

- Part 1: explaining that `CLAUDE.md` is part of the system under test.
- Part 1: distinguishing guidance from enforcement.
- Part 2: explaining instruction-following evals.
- Part 2: explaining why hooks may be needed for enforced controls.
- Part 3: motivating versioning of `CLAUDE.md`, rules, and memory-related configuration.

Relevant ideas from the source:

- `CLAUDE.md` files provide persistent instructions.
- Auto memory can save learnings across sessions.
- `CLAUDE.md` and auto memory are loaded into sessions as context.
- The documentation notes that `CLAUDE.md` is context rather than enforced configuration.
- For blocking actions regardless of Claude's decision, use hooks.
### Claude Code skills

URL: [https://code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)

Use for:

- Part 2: explaining skill evals.
- Part 2: explaining trigger evals, execution evals, and delta evals.
- Part 3: building evals around reusable workflows.
- Part 3: explaining why skill descriptions, supporting files, and invocation controls should be versioned.

Relevant ideas from the source:

- Skills extend what Claude can do.
- A skill is created with a `SKILL.md` file.
- Claude uses skills when relevant, or users can invoke them directly.
- Skills are useful when the same instructions, checklist, or multi-step procedure are repeatedly pasted into chat.
- Skills load only when used, unlike always-loaded `CLAUDE.md` content.
- Skill descriptions help Claude decide when to load a skill.
- Skills can include supporting files, scripts, templates, examples, and reference material.
- Skills can be configured with frontmatter, including invocation controls and allowed tools.
- The documentation discusses evaluating and iterating on a skill.
- Troubleshooting includes skill not triggering and skill triggering too often.

### Claude Code hooks

URL: [https://code.claude.com/docs/en/hooks](https://code.claude.com/docs/en/hooks)

Use for:

- Part 2: explaining hook and command evals.
- Part 2: explaining control-plane evals.
- Part 3: building tests for hooks that block unsafe actions or enforce workflow rules.
- Part 3: differentiating guidance from enforcement.

Relevant ideas:

- Hooks can run commands before or after Claude Code actions.
- Hooks can be used to enforce workflow behaviour.
- Hooks introduce their own failure modes: not firing, blocking too much, blocking too little, or adding noise.
- Hooks are important when a behaviour must be enforced rather than suggested.

### Claude Code subagents

URL: [https://code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents)

Use for:

- Part 2: explaining subagent evals.
- Part 2: explaining delegation boundaries.
- Part 3: comparing baseline Claude Code with a subagent-based workflow.
- Part 3: evaluating whether delegation improves quality, speed, or reliability.

Relevant ideas:

- Subagents are specialised agents for specific kinds of tasks.
- They can have their own instructions and tool permissions.
- Delegation introduces new questions: which agent should handle the task, what context it receives, and how results are integrated.
### Claude Code settings and permissions

URL: [https://code.claude.com/docs/en/settings](https://code.claude.com/docs/en/settings)

Use for:

- Part 1: including permissions and configuration in the system under test.
- Part 2: discussing permission and safety-related evals.
- Part 3: versioning settings and permission changes.

Relevant ideas:

- Claude Code behaviour depends on configuration and settings.
- Permission settings can affect what actions Claude can perform.
- Settings should be considered part of the eval environment.

### Claude Code common workflows

URL: [https://code.claude.com/docs/en/common-workflows](https://code.claude.com/docs/en/common-workflows)

Use for:

- Part 1: examples of real Claude Code tasks.
- Part 3: choosing candidate workflows for a first eval suite.
- Part 3: grounding examples such as bug fixing, tests, code review, release notes, and automation.

Relevant ideas:

- Claude Code can support repeated development workflows.
- Common workflows can become candidates for small eval suites.

### Claude Code best practices

URL: [https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)

Use for:

- Part 1: supporting careful, iterative usage rather than blind trust.
- Part 2: discussing verification and workflow design.
- Part 3: motivating baseline comparison and iterative improvement.

Relevant ideas:

- Claude Code usage benefits from clear context, verification, and workflow design.
- Best practices should inform eval dimensions.

---
## 33.2 Research And Academic References

### On the Use of Agentic Coding Manifests: An Empirical Study of Claude Code

URL: [https://arxiv.org/abs/2509.14744](https://arxiv.org/abs/2509.14744)

Use for:

- Part 1: supporting the idea that manifests such as `CLAUDE.md` are important parts of agentic coding workflows.
- Part 1: explaining that repository-level instructions are not incidental; they shape agent behaviour.
- Part 2: motivating instruction-following evals.
- Part 3: versioning and testing `CLAUDE.md` changes.

Relevant ideas:

- The study analyses `Claude.md` files from repositories.
- It describes agent manifests as configuration files that provide project context, identity, and operational rules.
- It finds common manifest content around operational commands, technical implementation notes, and architecture.

### Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems

URL: [https://arxiv.org/abs/2604.14228](https://arxiv.org/abs/2604.14228)

Use for:

- Part 1: supporting the claim that Claude Code is an agentic system with file editing, shell commands, and external services.
- Part 1: explaining why the surrounding system matters as much as the model loop.
- Part 2: supporting evaluation of permissions, context management, extensibility, hooks, skills, and subagents.
- Part 3: motivating evals that inspect the whole system rather than only final answers.

Relevant ideas:

- Claude Code can run shell commands, edit files, and call external services.
- The system includes permissions, context management, extensibility mechanisms, hooks, skills, and subagent delegation.
- Much of the complexity lives around the core model loop.

### Configuring Agentic AI Coding Tools: An Exploratory Study

URL: [https://arxiv.org/abs/2602.14690](https://arxiv.org/abs/2602.14690)

Use for:

- Part 1: explaining configuration as part of the system under test.
- Part 2: motivating evals for context files, skills, and subagents.
- Part 3: versioning and comparing configuration changes.

Relevant ideas:

- Agentic coding tools can be configured through repository-level Markdown and JSON files.
- The paper studies mechanisms including context files, skills, and subagents.
- It reports that configuration strategies differ across tools, and that Claude Code users employ a broad range of mechanisms.
# 34. How To Use Sources Inside The Posts

The sources should be integrated as hyperlinks inside the prose.

Example source usage by post:
## 34.2 Part 2 Source Usage

When discussing skills, link to the skills documentation:

> Skills are reusable instructions packaged in `SKILL.md` files. Their descriptions help Claude decide when to load them, which means triggering is itself something worth evaluating.

When discussing hooks, link to the hooks documentation and memory documentation:

> `CLAUDE.md` is context, not enforcement. If a behaviour must be blocked, hooks become part of the control layer and therefore part of the eval surface.

When discussing subagents, link to the subagents documentation:

> Delegation adds a new evaluation question: did the right specialised agent handle the task, and did the main agent integrate the result correctly?
# 35. Final Recommended Narrative Arc

The series should feel like a progression from intuition to practice.

## Part 2: Give The Reader The Map

The reader should think:

> I evaluated the document in Part 1. But the document is only one surface. The same skill has at least eight more — and some of the most dangerous failures would have looked like the document passing.

**Narrative beat sequence for Part 2:**

1. Open by recalling the Part 1 eval — the document passed. Then reveal: three other things could have silently failed on that same run.
2. Introduce the evaluation surfaces taxonomy, using the A/B test document skill as the anchor for each surface before naming the category.
3. Walk through the summary table (section 19) — for each surface, one sentence on what failure looks like for the A/B test skill specifically.
4. Go deeper on the three most important surfaces for DS/ML readers: final output (already known), tool-use trajectory (did it read the right reference), and cost/latency (can Haiku do this?).
5. Close by showing the reader how many surfaces the A/B test skill now has — and pointing to Part 3 to build the actual suite.

**Tone:** more technical than Part 1, but still grounded. Every surface should feel like a natural extension of "what else could go wrong with the skill I already know," not an abstract category.

---

# 36. Primary Teaching Example — Series Thread

## The A/B test document skill as the running example

Part 1 introduced the A/B test document skill as the concrete anchor for the eval concept. It defined the task (draft an experiment design document for a homepage ranking test), the success criteria (hypothesis, primary metric, guardrail metrics, sample size, launch/rollback criteria, no invented metrics, correct headings), and the checks (deterministic structure checks + model-graded reasoning quality). It showed a YAML sketch of the eval.

Part 2 should extend this same skill across the evaluation surfaces, not introduce a new example for each surface. The reader already has the mental model. The teaching move is: "Here is the same skill you already know. Now look at all the other things you could be evaluating beyond the final document."

## Surface-by-surface extension of the A/B test skill

**Final output (section 20.1):** Already covered in Part 1 — the document exists, has the right headings, contains no invented metrics, passes model-graded reasoning checks. Use this as the baseline that every other surface builds on.

**Repository state (section 20.2):** When the skill runs, where does the document get saved? Did it save to the right folder (e.g. `docs/experiments/`)? Did it avoid touching unrelated files? Did it avoid creating extra artefacts (notebooks, intermediate files)? The eval check: `git diff --name-only` should show exactly one new file in the expected path.

**Tool-use (section 20.3):** Did the skill read the right context files before drafting? For example, if the repository has a `docs/metrics.md` defining approved metrics, did Claude read it before writing the document? A tool-use eval checks whether the `Read` call to `metrics.md` appears in the trajectory — if it didn't, the model may have drafted from memory rather than ground truth.

**Hook (section 20.7):** If a post-write hook is configured to validate experiment documents (e.g. checking that no invented metrics appear), did it fire? Did it produce the expected output? A hook eval checks the side-effect: the hook ran, the validation log was written, no forbidden metric names appear in the log.

**Cost and latency (section 20.8):** This is the model-routing question from Part 1. Does the document quality hold if Haiku drafts it instead of Sonnet? Run the same eval suite on both model configurations and compare pass rates. This is the evidence for "can I use a cheaper model here."

## What this achieves for the reader

By walking one skill across five surfaces, the reader finishes Part 2 with a concrete answer to the question: "What would I actually evaluate for this workflow I already know?" The taxonomy becomes a tool, not a list.

The Part 2 ending (section 21) already states: "At some point, you need to choose one workflow." Extending the A/B test skill throughout the post is the demonstration of that claim rather than the instruction to do it.

## Relationship to existing worked examples in Part 3

The existing Part 3 worked examples (analytics agent, section 30; writing-format agent, section 31) are kept. They serve a different purpose: showing the method generalises beyond document-generation skills. They are not replacing the A/B test thread — they extend it. Part 3 should complete the A/B test eval suite first, then point to the analytics agent as the "now try this on something more complex" beat.
