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

# Part 1: Claude Code Evals, Part 1: Why "It Worked Once" Is Not Evidence
### 3.1 Why Part 1 Comes First

Part 1 should establish the core mental model.

The reader needs to understand that Claude Code is not just a model producing text. It is a workflowing system that can operate inside a repository.

That means the object being evaluated is not simply:

```text
model + prompt
```

It is closer to:

```text
model
+ user task
+ repository state
+ CLAUDE.md
+ memory
+ tools
+ permissions
+ MCP servers
+ skills
+ hooks
+ subagents
+ execution environment
+ transcript
+ final output
+ final repository state
```

This is the first conceptual shift.

If readers do not understand this, they will treat evals as answer grading. They will ask, "Was the final response good?" but miss the deeper question: "Did the workflow behave correctly?"
## 6. Role Of Part 1 In The Series

Part 1 is the conceptual foundation.

Its purpose is to explain why Claude Code evals matter and why one successful run is not enough to trust an AI workflow.

The post should make the reader feel the problem before giving them the taxonomy.

The reader should finish Part 1 with a clear mental model:

> Claude Code is not just answering. It is acting inside an environment.

That is why evals need to inspect more than the final answer.

---

## 8. Core Question For Part 1

> What are evals, and why do Claude Code workflows need a different evaluation mindset from normal prompts or unit tests?

---

## 9. Suggested Opening Hook

Start from a familiar experience.

Claude Code solves a bug, writes a useful script, fixes a test, explains a confusing module, or generates a beautiful summary.

It feels magical.

Then the next day, with a very similar task, it edits the wrong files, ignores project conventions, forgets to run tests, over-engineers the solution, or confidently solves the wrong problem.

That is the moment where evals become necessary.

Not because Claude Code is useless.

Because **one good run is not evidence of reliability**.

A possible opening line:

> The first time Claude Code fixes something difficult, it is tempting to trust it. The second time it edits the wrong files with equal confidence, you remember that a demo is not an eval.

---

## 10. Main Argument Of Part 1

```text
Claude Code is not a normal prompt-response system.
It is an agentic workflow system.
Therefore, evals need to test the workflow, not just the final answer.
```

A normal LLM prompt produces an answer.

Claude Code can produce behaviour.

It can:

- inspect the repository,
- read files,
- search code,
- edit code,
- create new files,
- run shell commands,
- call external tools,
- use MCP servers,
- follow `CLAUDE.md`,
- use memory,
- invoke skills,
- delegate to subagents,
- interact with hooks,
- stage commits,
- create pull requests,
- and leave the repository changed.

That means the evaluation target is not just a response.

It is a run.

---

## 11. Section Outline For Part 1

### 11.1 The False Comfort Of One Good Run

#### Purpose

Introduce the emotional and practical reason evals matter.

#### Points To Cover

- Claude Code can produce impressive results.
- Those results can create trust very quickly.
- A single successful run is only anecdotal evidence.
- Agentic tools are stochastic, context-sensitive, and workflow-dependent.
- Small changes in prompt, context, repository state, or instructions can change behaviour.

#### Key Message

> A good run tells you what happened once. An eval tells you what tends to happen.

#### Possible Examples

- Claude fixes one bug cleanly, then breaks a nearby module on the next bug.
- Claude writes a correct SQL query once, then uses a raw table instead of the canonical mart next time.
- Claude follows project conventions once, then ignores them after context compaction.
- Claude produces a good summary once, then fabricates a metric in a later update.

---

### 11.2 What An Eval Actually Is

#### Suggested Definition

> An eval is a repeatable way to test whether an AI system behaves as expected on a task that matters.

#### Components Of An Eval

| Component | Meaning | Claude Code example |
|---|---|---|
| Task | The instruction the system receives | "Fix this bug in the auth module." |
| System under test | The thing being evaluated | Claude Code + model + CLAUDE.md + tools + skills + hooks |
| Environment | The context in which the task runs | Clean checkout of the repository |
| Grader | The method for deciding success or failure | Tests, diff checks, transcript checks, rubric, human review |

#### Example

```text
Task:
Fix this bug in the repository.

System under test:
Claude Code + CLAUDE.md + tools + skills + hooks + subagents.

Environment:
A clean checkout of the repository.

Graders:
- Do the tests pass?
- Were only expected files changed?
- Did Claude follow repository conventions?
- Did it run the relevant verification commands?
- Did it leave the repository in a clean state?
```

#### Key Message

> An eval is not just a score. It is a repeatable test of behaviour.

---

### 11.3 Claude Code Is Different From A Normal Prompt

A normal prompt-response interaction looks like this:

```text
Prompt -> Model -> Answer
```

A Claude Code workflow is closer to this:

```text
User task
  -> Claude Code
  -> Loads repository context and instructions
  -> Reads files
  -> Uses tools
  -> Edits files
  -> Runs commands
  -> Responds to errors
  -> Produces output
  -> Leaves final repository state
```

#### Diagram

```text
User task
  |
  v
Claude Code workflow
  |
  v
Instructions / CLAUDE.md / Memory / Skills / Agents / Hooks / Tools
  |
  v
Repository actions
  |
  v
Final output + transcript + repository state
  |
  v
Graders
```

#### Key Message

> With Claude Code, the final answer is only one artefact produced by the run.

---

### 11.4 The System Under Test Is Bigger Than The Model

Many people implicitly think they are evaluating:

```text
model + prompt
```

But in Claude Code they are often evaluating:

```text
model
+ task wording
+ repository structure
+ CLAUDE.md
+ auto memory
+ slash commands or skills
+ hooks
+ subagents
+ MCP servers
+ permissions
+ local environment
+ package manager
+ test suite
+ git state
+ human review process
```

#### Points To Cover

- A failure may not be caused by the model alone.
- It may be caused by unclear `CLAUDE.md` instructions.
- It may be caused by missing repository conventions.
- It may be caused by a skill description that triggers too broadly.
- It may be caused by a hook that blocks too much or too little.
- It may be caused by missing tests.
- It may be caused by poor task design.

#### Key Message

> If the workflow fails, the model may not be the only thing that failed.

---

### 11.5 Evals Are Not The Same As Unit Tests

Unit tests are essential, but they are narrow.

They usually answer:

> Does this code behave correctly for the cases covered by the tests?

Claude Code evals answer a broader question:

> Did the AI workflow behave correctly while trying to solve the task?

#### Things Unit Tests May Miss

- Claude edited unrelated files.
- Claude ignored naming conventions.
- Claude created unnecessary abstractions.
- Claude skipped the agreed verification workflow.
- Claude used raw data instead of canonical tables.
- Claude produced a good final answer after an unsafe trajectory.
- Claude left temporary files behind.
- Claude solved a nearby but different problem.
- Claude bypassed a skill or command that should have been used.

#### Key Message

> Unit tests are one grader inside a wider eval suite.

---

### 11.6 Evals Are Not The Same As Public Benchmarks

Public benchmarks are useful for understanding general model or agent capability.

But they do not answer whether Claude Code works inside your specific environment.

They do not know:

- your repository structure,
- your metric definitions,
- your internal conventions,
- your preferred libraries,
- your safety boundaries,
- your deployment workflow,
- your communication style,
- your failure history.

| Public benchmark | Private Claude Code eval |
|---|---|
| Tests general capability | Tests your workflow |
| Uses standardised tasks | Uses your tasks |
| Compares models or systems | Improves your setup |
| Produces broad signal | Produces local reliability signal |
| Useful for selection | Useful for iteration |

#### Key Message

> Public benchmarks ask whether a system is capable in general. Your evals ask whether your workflow is reliable in practice.

---

### 11.7 Failure Modes That Motivate Evals

| Failure mode | Example | What an eval might check |
|---|---|---|
| Wrong file edits | Claude changes unrelated modules | Git diff scope |
| Missing verification | Claude edits code but does not run tests | Transcript or command logs |
| Convention drift | Claude ignores project style | Static checks or rubric |
| Wrong data source | Claude queries raw tables instead of canonical marts | SQL source checks |
| Over-engineering | Claude creates abstractions for a small fix | Human or LLM judge |
| Skill miss | Claude does not trigger a relevant skill | Trigger eval |
| Skill overtrigger | Claude invokes skill on unrelated task | Negative trigger eval |
| Bad delegation | Claude sends task to wrong subagent | Agent trace review |
| Hook failure | Unsafe command is not blocked | Simulated unsafe action |
| Messy final state | Temporary files remain | File-system checks |
| Plausible fabrication | Claude invents metrics or decisions | Faithfulness checks |
| Silent reinterpretation | Claude changes the task without saying so | Spec adherence check |

#### Key Message

> The best first evals often come from the failures you have already seen.

---

### 11.8 What A Minimal Claude Code Eval Looks Like

```yaml
id: bugfix_001
task: "Fix the failing login test."
starting_state: "clean checkout at commit abc123"
expected:
  must_change:
    - src/auth/login.py
  must_not_change:
    - src/payments/
    - docs/generated/
checks:
  - tests_pass
  - diff_scope
  - no_temp_files
  - explanation_mentions_root_cause
hard_fail:
  - modifies payment code
  - skips test_execution
  - claims success when tests fail
```

#### Key Message

> A useful eval can be small. It just needs to be repeatable and connected to a real failure mode.

---

## 12. Suggested Ending For Part 1

End by saying that once we stop treating Claude Code as a magic prompt box and start treating it as a workflowing system, the next question becomes obvious:

> What exactly should we evaluate?

Possible final paragraph:

> The shift is small but important. We are not only evaluating whether Claude said the right thing. We are evaluating whether the workflow behaved correctly inside a real environment. Once you see Claude Code that way, the next question becomes much clearer: which parts of the workflow need to be tested?

---

## 13. Part 1 Reader Takeaway

By the end of Part 1, the reader should understand:

- why one successful Claude Code run is not enough,
- why Claude Code evals are broader than prompt evals,
- why unit tests are necessary but insufficient,
- why public benchmarks are useful but not enough,
- why the object being evaluated is the whole workflow,
- and why the final answer is only one part of the evidence.

---
# 32. Suggested Visuals Across The Series
## 32.1 Visual For Part 1: Claude Code As A Workflowing System

```text
User task
  |
  v
Claude Code
  |
  v
Instructions / CLAUDE.md / Memory / Skills / Agents / Hooks / Tools
  |
  v
Repository actions
  |
  v
Final output + transcript + repository state
  |
  v
Graders
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
## 34.1 Part 1 Source Usage

When explaining that Claude Code is not just a prompt-response tool, link to the official Claude Code overview:

> Anthropic describes Claude Code as an agentic coding tool that can read a codebase, edit files, run commands, and integrate with development tools.

When explaining that `CLAUDE.md` matters, link to the memory documentation:

> Project instructions live in `CLAUDE.md`, which Claude reads as context at the start of sessions.

When explaining that agentic coding manifests matter, link to the empirical study of `Claude.md` files:

> This is not just a nice-to-have convention. Research on agentic coding manifests shows that these files commonly encode operational commands, implementation notes, and architecture context.
# 35. Final Recommended Narrative Arc

The series should feel like a progression from intuition to practice.
## Part 1: Make The Reader Feel The Problem

The reader should think:

> I have trusted one good Claude Code run too much.

Part 1 should create the mental shift from final-answer evaluation to workflow evaluation.
