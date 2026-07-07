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

# Part 3: Claude Code Evals, Part 3: Building A Tiny Eval Suite That Actually Helps
### 3.3 Why Part 3 Comes Third

Only after the reader has the mental model and the map should the series move into implementation.

Part 3 should answer:

> How do I build my first useful Claude Code eval suite without turning it into enterprise theatre?

The post should be highly practical.

The recommendation should be:

```text
Do not start by evaluating everything.
Start with one workflow that matters.
Collect 5-10 real examples.
Define success and failure.
Automate deterministic checks where possible.
Use judgement checks where necessary.
Compare against a baseline.
Turn repeated failures into regression cases.
```

This is where the series should introduce two worked examples:

1. **An analytics agent eval suite**
2. **A writing-format agent eval suite**

The analytics example speaks directly to data science, analytics, SQL, dbt, and metric-definition workflows.

The writing-format example shows that evals are not only for code. Claude Code workflows often produce documentation, release notes, summaries, experiment write-ups, PR descriptions, stakeholder updates, and structured communication artefacts.

---
## 23. Role Of Part 3 In The Series

Part 3 is the practical implementation post.

This is where the reader moves from "I understand evals" to "I can build my first useful eval suite".

The tone should be pragmatic.

The goal is not to build a perfect eval platform. The goal is to build the smallest useful system that catches real repeated failures.

The central message is:

> A useful eval suite does not need to be huge. It needs to catch the failures that matter.

---

## 25. Core Question For Part 3

> How does someone build their first useful Claude Code eval suite without turning it into enterprise theatre?

---

## 26. Suggested Opening Hook

The fastest way to ruin evals is to start by building an eval platform.

The better starting point is much smaller:

> Pick one workflow that matters. Collect five real examples. Decide what failure means. Automate the obvious checks. Review the rest.

That is enough to move from vibes to evidence.

Possible opening line:

> The first Claude Code eval suite should not be a platform. It should be a small folder of tasks that remember the ways your workflow keeps disappointing you.

---

## 27. Minimal Eval Loop Diagram

```text
Collect real tasks
  |
  v
Define success and failure
  |
  v
Run baseline workflow
  |
  v
Run improved workflow
  |
  v
Grade output + repo state + trajectory
  |
  v
Analyse failures
  |
  v
Turn failures into regression cases
```

---

## 28. Minimal Folder Structure

```text
evals/
  tasks/
    analytics_001.md
    analytics_002.md
    writing_001.md
  expected/
    analytics_001.yaml
    analytics_002.yaml
    writing_001.yaml
  graders/
    check_diff_scope.py
    check_sql_sources.py
    check_required_headings.py
    judge_response.md
  runs/
    baseline/
    with_skill/
    with_subagent/
  results/
    summary.csv
    failures.md
```

This folder structure is deliberately simple.

A first eval suite can start as files, scripts, and a small report. It does not need a dashboard, database, or orchestration framework on day one.

---

## 29. Practical Recipe For Part 3

### 29.1 Step 1: Choose One Workflow

Do not evaluate "Claude Code".

Evaluate one concrete workflow.

#### Good Starting Workflows

- analytics agent,
- PR review agent,
- dbt model generation workflow,
- weekly update writer,
- release note formatter,
- migration assistant,
- bug-fix command,
- safety hook,
- documentation skill,
- experiment-summary agent,
- incident-summary workflow.

#### Good Workflow Choice Criteria

A good first workflow is:

- repeated often,
- costly when wrong,
- visible when it fails,
- small enough to test,
- connected to real work,
- partly automatable,
- likely to benefit from Claude Code.

#### Bad Starting Points

Avoid starting with:

- "evaluate all coding tasks",
- "evaluate all agents",
- "evaluate our whole AI workflow",
- "build a general benchmark for everything",
- "test every possible prompt",
- "score Claude Code globally".

That way lies meetings. Many meetings.

#### Key Message

> Start with one workflow, not one grand theory of agent evaluation.

---

### 29.2 Step 2: Collect Real Examples

Start with real or realistic tasks.

#### Useful Sources

- previous Claude Code sessions,
- failed outputs,
- PR comments,
- bug reports,
- manual corrections,
- repeated Slack requests,
- existing project templates,
- common repository tasks,
- team checklists,
- known failure cases,
- support tickets,
- examples from code review.

#### Task Collection Table

| Source | Example task | Why it is useful |
|---|---|---|
| Failed Claude session | "Fix failing dbt test" | Captures real failure mode |
| PR comment | "Use canonical mart, not raw table" | Encodes team convention |
| Slack request | "Summarise weekly status" | Repeated communication workflow |
| Bug report | "Investigate login timeout" | Real debugging task |
| Manual correction | "Do not invent metrics" | Faithfulness failure |

#### Key Message

> Your eval set should look like the work you actually do, not the work you wish you did.

---

### 29.3 Step 3: Define Success And Failure

For each task, write down what success means.

#### Example

```yaml
id: analytics_003
task: "Create a SQL query for weekly net revenue by market."

success:
  - references the canonical net revenue model
  - saves SQL under analysis/generated/
  - does not query raw payments directly
  - explains any assumptions
  - output is valid SQL

hard_fail:
  - uses raw.payments
  - invents a metric definition
  - writes outside the allowed folder
  - claims the query is validated without running checks
```

#### Why This Matters

This step forces clarity.

If the team cannot define failure, it probably cannot automate the eval yet.

#### Key Message

> Before writing a grader, write down what would disappoint you.

---

### 29.4 Step 4: Separate Deterministic Checks From Judgement Checks

Deterministic checks should do as much work as possible.

#### Deterministic Checks

Examples:

- file exists,
- file path is correct,
- schema is valid,
- tests pass,
- SQL parses,
- output contains required headings,
- forbidden table is not referenced,
- only expected files changed,
- command was run,
- hook fired,
- no temporary files remain,
- JSON output validates,
- markdown structure is correct.

#### Judgement Checks

Examples:

- is the explanation useful?
- is the summary faithful?
- is the code over-engineered?
- does the answer handle uncertainty well?
- would a stakeholder understand the trade-off?
- did the agent make a sensible judgement call?
- are the risks preserved?
- is the prioritisation reasonable?

#### Rule Of Thumb

| Question type | Preferred grader |
|---|---|
| Can a script check it? | Script |
| Is it about syntax or structure? | Script |
| Is it about factual support? | Script plus judge |
| Is it about usefulness or clarity? | Human or LLM judge |
| Is it about subtle domain judgement? | Human review, possibly assisted by LLM |

#### Key Message

> Do not use an LLM judge where a script would be better.

---

### 29.5 Step 5: Build A Tiny Golden Dataset

Start with 5-10 tasks.

Include:

- simple happy path,
- realistic messy case,
- edge case,
- adversarial or tempting wrong path,
- known previous failure,
- should-refuse case,
- should-ask-clarification case,
- task where the right answer is "not enough information".

#### Example Dataset Shape

| Task type | Example | Purpose |
|---|---|---|
| Happy path | Generate SQL from clear metric definition | Confirms basic capability |
| Messy case | Notes contain contradictions | Tests uncertainty handling |
| Edge case | Metric missing from docs | Tests refusal or clarification |
| Previous failure | Claude used raw table | Regression check |
| Tempting wrong path | Raw table has obvious column names | Tests convention following |

#### Key Message

> The goal is not coverage. The goal is usefulness.

---

### 29.6 Step 6: Run The Baseline

Before evaluating an improved workflow, run the current workflow.

#### Possible Baselines

- plain Claude Code,
- Claude Code with current `CLAUDE.md`,
- current skill,
- current subagent,
- current hook setup,
- current slash command,
- manual process,
- previous model version,
- previous prompt version.

#### Why Baselines Matter

Without a baseline, you will not know whether your shiny new skill or agent made things:

- better,
- worse,
- slower,
- more expensive,
- more consistent,
- more brittle,
- or simply different.

#### Key Message

> If you do not measure the current workflow, you cannot know whether the new workflow helped.

---

### 29.7 Step 7: Run The Improved Workflow

Now run the same tasks with the proposed improvement.

#### Possible Improvements

- new skill,
- revised skill description,
- new subagent,
- updated `CLAUDE.md`,
- new hook,
- new slash command,
- stricter output schema,
- better repository instructions,
- new MCP tool,
- narrower permissions,
- better examples,
- improved task template.

#### Compare Outcomes

| Dimension | Baseline | Improved workflow |
|---|---|---|
| Task success | Did it solve the task? | Did success improve? |
| Diff scope | Were files changed correctly? | Did collateral edits reduce? |
| Verification | Were tests run? | Did verification improve? |
| Cost | How expensive was it? | Did cost increase or decrease? |
| Latency | How long did it take? | Was it still usable? |
| Human correction | How much editing was needed? | Did review burden decrease? |

#### Key Message

> The question is not whether the new workflow feels clever. The question is whether it performs better on the tasks that matter.

---

### 29.8 Step 8: Grade Output, State, And Trajectory

For each task, capture:

- final answer,
- files changed,
- commands run,
- tools called,
- tests run,
- final repository state,
- cost,
- latency,
- number of turns,
- judge output,
- human comments,
- pass/fail result,
- failure category.

#### Suggested Result Schema

```yaml
id: analytics_003
workflow: with_revenue_skill
status: fail
scores:
  output_correctness: pass
  repo_state: pass
  tool_use: fail
  uncertainty: pass
hard_failures:
  - did_not_run_validation
metrics:
  turns: 8
  tool_calls: 12
  runtime_seconds: 210
notes: "Generated correct SQL but claimed it was validated without running the parser."
```

#### Key Message

> Do not grade only what Claude says. Grade what Claude changed.

---

### 29.9 Step 9: Analyse First Failures

When something fails, classify the first useful failure.

#### Failure Categories

- misunderstood task,
- used wrong data source,
- edited wrong file,
- skipped test,
- ignored instruction,
- wrong skill trigger,
- wrong subagent delegation,
- hook did not fire,
- answer unsupported by evidence,
- poor recovery after command failure,
- overconfident final response,
- unnecessary complexity,
- insufficient context gathering,
- output format failure,
- cost or latency failure.

#### Example Failure Log

```markdown
## analytics_004 failure

Task: Add a small test for a revenue-model edge case.

Observed behaviour:
Claude added the test file but did not run dbt test.

Failure category:
Missing verification.

Likely fix:
Update CLAUDE.md and the analytics skill to explicitly require the narrowest relevant dbt test after model or test changes.

Regression case:
Keep analytics_004 in the eval suite and require a command matching `dbt test`.
```

#### Key Message

> The goal is not to produce a beautiful dashboard. The goal is to know what to fix next.

---

### 29.10 Step 10: Turn Failures Into Regression Cases

Every repeated failure should become a future eval.

#### Example

Claude once used `raw.payments` instead of the canonical revenue model.

Add a task that tempts it to do that again.

```yaml
id: analytics_regression_raw_payments
task: "Create a query for payment-adjusted weekly revenue."
trap: "The raw.payments table has obvious-looking columns."
expected:
  must_reference:
    - models/marts/finance/fct_net_revenue.sql
  must_not_reference:
    - raw.payments
```

#### Key Message

> Evals are institutional memory for your AI workflows.

---

### 29.11 Step 11: Version Prompts, Skills, Agents, Hooks, And Eval Data

Track changes to:

- `CLAUDE.md`,
- `.claude/rules/`,
- skill files,
- agent files,
- hook scripts,
- slash commands,
- eval tasks,
- grader prompts,
- test data,
- expected outputs,
- model settings,
- permission settings,
- MCP configuration,
- result summaries.

#### Why This Matters

A small wording change can alter behaviour.

Without versioning, you cannot tell whether a regression came from:

- the model,
- the task prompt,
- the skill,
- the hook,
- the subagent,
- the repository state,
- the grader,
- or the environment.

#### Key Message

> If it changes behaviour, version it.

---

### 29.12 Step 12: Decide What Remains Manual

Not everything needs to be automated.

Manual review is fine when:

- the workflow is rare,
- the cost of automation is too high,
- judgement is subtle,
- the output is always human-reviewed anyway,
- the failure mode is not yet clear,
- the risk is high enough to require human sign-off.

#### Key Message

> The goal is not automation theatre. The goal is targeted reliability.

---

# 30. Worked Example 1: Analytics Agent Eval Suite

## 30.1 Why This Example Matters

This example is especially relevant for data science and analytics readers.

Many teams use repositories containing SQL, dbt models, metric definitions, notebooks, Python scripts, dashboards, and project conventions.

Claude Code can help with this work, but the risk is not only that it writes invalid SQL.

The deeper risk is that it writes **plausible but wrong** analysis.

For analytics and data science workflows, plausible-but-wrong answers can be more dangerous than obvious failures.

---

## 30.2 Agent Purpose

The analytics agent answers data questions or creates small analytical artefacts inside a repository containing SQL, dbt models, notebooks, Python scripts, and metric documentation.

The agent must:

- use canonical marts where possible,
- respect metric definitions,
- avoid raw tables unless justified,
- save artefacts in the right place,
- avoid inventing business logic,
- run tests when modifying dbt models,
- explain uncertainty clearly,
- distinguish evidence from assumptions,
- keep the repository clean.

---

## 30.3 Example Repository Structure

```text
analytics-repo/
  CLAUDE.md
  docs/
    metrics.md
    data_sources.md
  models/
    staging/
    marts/
      finance/
        fct_net_revenue.sql
      product/
        fct_search_sessions.sql
  analysis/
    generated/
  notebooks/
  macros/
  tests/
```

---

## 30.4 Example CLAUDE.md Rules

```text
Prefer canonical marts over raw tables.

Use docs/metrics.md as the source of truth for metric definitions.

Save generated SQL under analysis/generated/.

Do not create notebooks unless explicitly requested.

If modifying a dbt model, run the narrowest relevant dbt test.

Do not hand-edit generated documentation.

State assumptions explicitly.

If a metric definition is missing, say so rather than inventing one.
```

---

## 30.5 Example Task Bank

```yaml
- id: analytics_001
  task: "Find the canonical source for net revenue."
  expected:
    must_reference:
      - docs/metrics.md
      - models/marts/finance/fct_net_revenue.sql
    must_not_reference:
      - raw.payments

- id: analytics_002
  task: "Create a SQL query for weekly net revenue by market."
  expected:
    output_path: analysis/generated/
    must_reference:
      - models/marts/finance/fct_net_revenue.sql
    must_not_reference:
      - raw.payments

- id: analytics_003
  task: "Explain why net revenue changed after the latest dbt refactor."
  expected:
    must_inspect:
      - docs/metrics.md
      - models/marts/finance/fct_net_revenue.sql
    checks:
      - analytical_correctness
      - uncertainty_handling
      - no_unsupported_root_cause

- id: analytics_004
  task: "Add a small test for a revenue-model edge case."
  expected:
    must_run:
      - dbt test
    checks:
      - file_scope
      - test_relevance
      - repo_state

- id: analytics_005
  task: "Create a quick notebook showing revenue by market."
  expected:
    behaviour:
      - should avoid notebook unless explicitly necessary
      - should suggest SQL first if sufficient

- id: analytics_006
  task: "Summarise the difference between gross revenue and net revenue."
  expected:
    must_reference:
      - docs/metrics.md
    hard_fail:
      - invents metric definitions
      - presents assumptions as facts

- id: analytics_007
  task: "Create a query for payment-adjusted weekly revenue."
  trap:
    - raw.payments has obvious-looking columns
  expected:
    must_reference:
      - models/marts/finance/fct_net_revenue.sql
    must_not_reference:
      - raw.payments
```

---

## 30.6 Deterministic Checks

Examples:

```text
Did the output file land under analysis/generated/?

Did the SQL reference the canonical mart?

Did the SQL avoid raw.payments?

Did Claude modify only allowed files?

Did Claude run dbt test after changing a dbt model?

Did the repository remain clean apart from expected files?

Did generated SQL parse successfully?

Did the answer cite docs/metrics.md when defining metrics?

Did the output avoid creating a notebook unless explicitly requested?
```

---

## 30.7 Judgement Checks

Examples:

```text
Is the metric definition correct?

Does the explanation avoid unsupported claims?

Does it explain uncertainty?

Would a stakeholder understand the answer?

Is the solution appropriately simple?

Does it distinguish evidence from assumptions?

Does it explain the implications of the result?
```

---

## 30.8 Example Scoring Model

```text
10 points total:

4 points: task correctness
2 points: repository hygiene
2 points: instruction-following
2 points: analytical usefulness

Hard fail if:
- forbidden raw table is used
- metric definition is invented
- files are written outside allowed scope
- tests are skipped after dbt model changes
- final answer claims validation without evidence
```

---

## 30.9 Example Judge Prompt

```text
You are grading an analytics-agent output inside a repository.

Task:
{{task}}

Repository conventions:
{{relevant_claude_md_and_metric_rules}}

Candidate output:
{{output}}

Evidence available:
{{evidence}}

Return JSON with:
- analytical_correctness: pass|fail
- convention_following: pass|fail
- usefulness: pass|fail
- uncertainty_handling: pass|fail
- unsupported_claims: pass|fail
- brief_reason: string

Rules:
- Fail analytical_correctness if the answer contradicts the repository metric definitions.
- Fail convention_following if the output bypasses canonical marts without justification.
- Fail usefulness if a stakeholder would still need to ask a basic follow-up to act on the answer.
- Fail uncertainty_handling if the output hides missing evidence or presents assumptions as facts.
- Fail unsupported_claims if the output states a cause, metric, or result not supported by the provided evidence.
```

---

## 30.10 What This Example Teaches

This example shows that Claude Code evals are not just about whether generated code works.

They also check whether Claude:

- used the right source of truth,
- followed data conventions,
- avoided dangerous shortcuts,
- handled uncertainty honestly,
- ran the right verification,
- and left the repository in a sane state.

This is especially important in data work, where the output can look professional while being analytically wrong.

---

# 31. Worked Example 2: Writing-Format Agent Eval Suite

## 31.1 Why This Example Matters

This example shows that evals are not only for code.

Many Claude Code workflows produce written artefacts inside a repository:

- weekly updates,
- experiment summaries,
- release notes,
- PR descriptions,
- decision memos,
- project documentation,
- incident reports,
- stakeholder updates,
- migration guides.

These outputs have different failure modes from code.

They may be well written but unfaithful.

They may follow the right structure but invent facts.

They may sound polished while hiding risks.

That makes them ideal examples for evals.

---

## 31.2 Agent Purpose

The writing-format agent turns messy notes into structured written artefacts.

The agent must:

- follow the required structure,
- preserve factual faithfulness,
- avoid inventing metrics,
- handle uncertainty,
- keep the right tone,
- preserve risks and blockers,
- write for the intended audience,
- avoid overclaiming,
- distinguish facts from assumptions.

---

## 31.3 Example Input Files

```text
notes/
  raw/
    meeting-notes.md
    slack-summary.md
    metrics-latest.csv
    prs-merged.txt

updates/
  weekly/

styles/
  weekly-update-style.md

CLAUDE.md
```

---

## 31.4 Example Style Rules

```text
Use concise operational prose.

Do not use breathless marketing language.

Do not invent metrics.

Call out uncertainty explicitly.

Use British English.

Keep sections short and scannable.

Preserve important risks and blockers.

Avoid saying a project shipped unless the source notes support that claim.

If metrics are missing, say they are missing.
```

---

## 31.5 Required Output Format

```text
# Weekly update: {{project_name}}

## What shipped

## What changed technically

## Metrics and evidence

## Risks and blockers

## Next week

## Open questions
```

---

## 31.6 Example Task Bank

```yaml
- id: writing_001
  task: "Turn these meeting notes into a weekly update."
  checks:
    - required_headings
    - factual_faithfulness
    - tone

- id: writing_002
  task: "Create a weekly update from contradictory notes."
  checks:
    - uncertainty_handling
    - no_overclaiming
    - open_questions_present

- id: writing_003
  task: "Write an update when metrics are missing."
  checks:
    - no_fabricated_metrics
    - explicit_missing_data_note

- id: writing_004
  task: "Convert engineering notes into stakeholder language."
  checks:
    - faithful_summary
    - reduced_jargon
    - risks_preserved

- id: writing_005
  task: "Generate a PR description from the same source notes."
  checks:
    - format_compliance
    - factual_faithfulness
    - actionability

- id: writing_006
  task: "Summarise an experiment where the result is inconclusive."
  checks:
    - no_false_win_claim
    - uncertainty_handling
    - explains_next_steps

- id: writing_007
  task: "Write a release note from technical notes with no customer impact."
  checks:
    - no_overclaiming
    - audience_appropriate_language
    - preserves_limited_scope
```

---

## 31.7 Deterministic Checks

Examples:

```text
Are all required headings present?

Are headings in the right order?

Is the output saved under updates/weekly/?

Is the output within the agreed length range?

Does the output avoid forbidden phrases?

Does the output mention metrics only when they exist in the source?

Does the output include an Open questions section?

Does the output use British English spelling where applicable?

Does the output avoid banned tone markers?
```

---

## 31.8 Judgement Checks

Examples:

```text
Is the summary faithful to the notes?

Does the tone match the style guide?

Are risks preserved rather than softened?

Does the update distinguish facts from assumptions?

Would the intended audience understand what happened and what matters next?

Does the summary avoid inventing impact?

Does it prioritise the most important information?
```

---

## 31.9 Example Scoring Model

```text
Hard fail if:
- required headings are missing
- metrics are fabricated
- a shipment is claimed without source support
- risks or blockers are hidden
- uncertainty is converted into certainty

Otherwise score:
1 point: format compliance
1 point: factual faithfulness
1 point: tone
1 point: prioritisation
1 point: uncertainty handling
1 point: actionability
```

---

## 31.10 Example Judge Prompt

```text
You are grading a weekly-update agent.

Input materials:
{{source_notes}}

Required format:
{{format_spec}}

Style rules:
{{style_rules}}

Candidate output:
{{output}}

Return JSON:
{
  "faithful_to_sources": "pass|fail",
  "format_compliance": "pass|fail",
  "tone": "pass|fail",
  "actionability": "pass|fail",
  "uncertainty_handled_well": "pass|fail",
  "risks_preserved": "pass|fail",
  "reason": "short explanation"
}

Fail faithfulness if the output states a shipment, metric, decision, or blocker that the notes do not support.

Fail format_compliance if required headings are missing or reordered.

Fail tone if the output sounds promotional, evasive, overconfident, or too vague.

Fail uncertainty_handled_well if missing or contradictory evidence is hidden.

Fail risks_preserved if blockers or risks are softened, omitted, or reframed as resolved without evidence.
```

---

## 31.11 What This Example Teaches

This example shows that evals are not only about tests passing.

For writing agents, the important failures are different:

- fabricated facts,
- missing uncertainty,
- wrong tone,
- broken format,
- softened risks,
- unsupported metrics,
- nice prose that says the wrong thing.

This is valuable because many Claude Code workflows are documentation, communication, analysis, and structured writing workflows inside a repository.

---
# 32. Suggested Visuals Across The Series
## 32.3 Visual For Part 3: Minimal Eval Loop

```text
Collect real tasks
  |
  v
Define success and failure
  |
  v
Run baseline
  |
  v
Run improved workflow
  |
  v
Grade output + repo state + trajectory
  |
  v
Analyse failures
  |
  v
Turn failures into regression cases
```

## 32.4 Visual For Part 3: Tiny Eval Suite Architecture

```text
evals/
  |
  |-- tasks/               # prompts or task specs
  |-- expected/            # expected files, paths, behaviours, constraints
  |-- graders/             # scripts and judge prompts
  |-- runs/                # baseline and experimental runs
  |-- results/             # pass/fail summaries and failure notes
  |-- README.md            # how to run and interpret the suite
```

---
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

### Agentic Education: Using Claude Code to Teach Claude Code

URL: [https://arxiv.org/abs/2604.17460](https://arxiv.org/abs/2604.17460)

Use for:

- Part 3: supporting the idea that practical learning with Claude Code benefits from structured curricula, checks, and repeatable exercises.
- Part 3: showing that hooks, custom skills, and structured test suites appear in Claude Code learning workflows.

Relevant ideas:

- The paper describes a modular curriculum for learning Claude Code.
- It uses hook-based heuristics and a parametrised test suite to enforce structural consistency.
- It discusses advanced Claude Code features such as hooks and custom skills.

---

## 33.3 Community And Industry Context References

### Vox: A non-coder's guide to Claude Code

URL: [https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs](https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs)

Use for:

- Part 1: accessible framing for Claude Code as a bridge between chat-based AI and command-line computer tasks.
- Part 1: motivating cautious experimentation.
- Part 3: explaining why non-code workflows such as writing and structured updates also matter.

Relevant ideas:

- Claude Code can automate file editing, script execution, coding projects, and similar tasks.
- The tool can be powerful but requires clear instructions and caution.

---
# 34. How To Use Sources Inside The Posts

The sources should be integrated as hyperlinks inside the prose.

Example source usage by post:
## 34.3 Part 3 Source Usage

When discussing evals for skills and workflows, link to the skills documentation section on evaluating and iterating on skills.

When discussing repository instructions, link to `CLAUDE.md` documentation and the agentic manifests paper.

When discussing tool invocation and command execution failures, link to empirical research on agentic coding tools and Claude Code architecture.

When discussing analytics-agent examples, link to research on agentic systems and auditability in analytical workflows, where available in the research report.

---
# 35. Final Recommended Narrative Arc

The series should feel like a progression from intuition to practice.
## Part 3: Give The Reader The Shovel

The reader should think:

> I do not need a giant eval platform. I can start with five real examples and a few useful checks.

Part 3 should make the implementation feel practical and achievable.

---
