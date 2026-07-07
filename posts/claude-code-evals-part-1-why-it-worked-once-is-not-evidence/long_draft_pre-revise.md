# Why "It Worked Once" Is Not Evidence

*Claude Code Evals — Part 1 of 3*

One good run is not evidence. It is a story you told yourself.

Claude Code is not a chat interface. It is an agent that reads your codebase, edits files, runs commands, calls tools, fires hooks, loads memory, and routes work to subagents. When it works, the whole system worked — the model, the instructions, the configuration, the tools, the environment. When it fails, any one of those layers may be the cause. And if you have never built an eval for it, you have no way to distinguish a reliable workflow from a lucky one.

This is the missing discipline. Software engineers do not write tests because they expect their code to fail. They write tests because verification by assumption is not verification at all. That same discipline has not made it into how most people build with agents — and the cost shows up slowly, in workflows that degrade when the prompt is revised, in models that cannot be swapped without a manual inspection, in failures that repeat because no one captured them the first time.

This post is about the why. Not the infrastructure, not the harnesses, not the YAML configs — those come in Parts 2 and 3 of this series. This is about the mental model that makes evals feel necessary rather than optional.

---

## What will we cover in this post?

- **The run that felt like magic.** Why the first impressive Claude Code run is the most dangerous data point you have.
- **Why LLMs are probabilistic, not deterministic.** What the empirical variance data says about "it worked once."
- **The unit test we forgot to write.** The discipline analogy — and why it applies directly to agent workflows.
- **Three questions you cannot answer without evals.** The revision problem, the cost problem, and the regression problem.
- **What Claude Code is actually doing.** Why the unit of trust is the whole workflow, not the final text output.
- **The failures that should have been caught.** Concrete failure modes that are invisible on a single run but obvious in a regression suite.
- **Evals are a thinking problem, not an infrastructure problem.** The reframe — and the forward pointer to Parts 2 and 3.

---

## What is the run that felt like magic?

You ran Claude Code on a real task. Maybe it navigated a codebase you had not explained, found the relevant function, and fixed the bug. Maybe it wrote a script that automated something you had been doing by hand. Maybe it summarised a set of files in a way that would have taken you an hour.

It was impressive. Not "good for an AI" impressive — genuinely impressive. [Bryan Walsh's piece in Vox](https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs) captures this reaction well: Claude Code has a way of prompting extreme responses, partly because it is doing something that looks like competence, not just pattern matching.

That reaction is not wrong. The first run often is good. The problem is what you do with it.

Most people walk away with a feeling of confidence. The workflow is figured out. The agent handles it. They use it again, and it works again — or it mostly works, with a few things to clean up manually. A mental model forms: Claude Code is reliable for this kind of task.

That mental model is built on the wrong foundation. "It worked twice" is still not evidence of reliability. It is evidence of two successful runs. Reliability requires being able to characterise failure as well as success — to know the rate, the conditions, and the specific ways a workflow breaks. Without that, you are trusting the story of the good runs.

---

## Why are LLMs probabilistic, not deterministic?

The architecture is the reason.

Language models generate output token by token, sampling from a probability distribution at each step. Even with temperature set to zero — the so-called "deterministic" setting — the underlying computation involves floating-point arithmetic distributed across hardware, which introduces variation. The setting reduces variance; it does not eliminate it.

A [2024 empirical study from Penn State and Amazon](https://arxiv.org/abs/2408.04667) investigated this directly. Researchers ran five LLMs on eight common tasks, ten runs each, under supposedly deterministic settings. The results:

- Accuracy varied by up to 15% across runs for the same model on the same task
- The gap between the best and worst possible run for a single model reached up to 70%
- None of the five models consistently delivered repeatable accuracy

That 70% figure is not a theoretical maximum. It is a measured outcome on real tasks with real models. The point is not that Claude Code is unreliable — it is that without measurement, you have no idea where on that spectrum your particular workflow sits.

This is what "it worked once" actually means: you have one sample from a distribution you have not characterised. The sample was good. The distribution may be excellent, or it may be volatile. You do not know which.

Evals are how you find out.

---

## What is the unit test we forgot to write?

Software engineers do not write unit tests because they think their code is broken. They write them because the practice of verification is a discipline, and disciplines produce reliability that informal review cannot.

Think about what a unit test actually does. It captures a known input, a known expected output, and a check that the actual output matches. The test does not run once and get deleted. It runs on every change, catching regressions before they reach production. The engineer who wrote the original function may be long gone, but the test remains — a frozen specification of what "correct" looks like.

That is precisely what is missing from most agent workflows.

[Anthropic's own engineering blog post on evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) defines the eval structure: an input, a grading criterion, and a check. The structure is almost identical to a unit test. The conceptual leap is not large — but it requires making the decision that your workflow is the kind of thing that deserves to be tested.

Most teams have not made that decision. The workflow runs. It looks good. No one sits down to write the eval.

[Anthropic's best practices guide](https://code.claude.com/docs/en/best-practices) makes the implication explicit: Claude should always have a verifiable check it can run — tests, a build, a screenshot comparison — rather than relying on "looks done" as the signal that a task is complete. The guide is written about how to design prompts and workflows. But the same logic applies to the team building those workflows. If "looks done" is not acceptable for Claude to use as a completion criterion, why is it acceptable for the team building and evaluating the workflow to use?

The unit test is not difficult to write. The difficult part is deciding it is worth writing.

---

## What are the three questions you cannot answer without evals?

These are not hypothetical concerns. They are questions that come up for any team that builds more than one Claude Code workflow and plans to iterate on it.

**Did this revision make it better, or just different?**

You have a skill — a reusable procedure stored in a SKILL.md file that Claude can invoke. You revised the instructions based on a run that did not go well. The next run looks better. But does it? You changed the prompt, not the task. Without evals — without a set of known inputs and a grading criterion — you have no way to know whether the revision improved performance across the range of cases the skill is meant to handle, or whether it just happened to perform better on the one run you used for the revision.

[The skills documentation](https://code.claude.com/docs/en/skills) describes how skill bodies are loaded only when used, and how they encode reusable procedures. What the documentation does not provide — because it is not a documentation problem — is a way to measure whether a revised skill is better. That is an eval problem.

**Can Haiku replace Sonnet for this task?**

Cost management is a real concern for any team running agents at volume. [The subagents documentation](https://code.claude.com/docs/en/sub-agents) explicitly mentions routing tasks to "faster, cheaper models like Haiku" as a cost control mechanism. Claude Haiku is significantly less expensive than Sonnet or Opus. For workflows that run frequently or at scale, the cost difference is material.

But whether Haiku is good enough for a specific workflow is an empirical question, not a theoretical one. The answer depends on the task, the instructions, the error tolerance, and the specific ways each model tends to fail. A visual inspection of a few runs will not tell you. You need evals — a fixed set of test cases with defined grading criteria — to characterise the quality difference and decide whether the cost saving is worth it.

**Is this failure new, or have we seen it before?**

This is the regression question, and it is the one that bites teams hardest. A workflow that worked last month starts producing errors. Was this a change in the model? A change in the codebase? A change in the tools or configuration? Without a regression suite — evals that run on a defined set of cases and report pass/fail — there is no way to know when a failure was introduced, and no way to verify that a fix actually fixed it.

[Common workflow recipes](https://code.claude.com/docs/en/common-workflows) cover the everyday tasks where Claude Code adds value: exploring codebases, fixing bugs, creating PRs. Each of those is a workflow that will be run repeatedly. Each is a workflow where regressions will happen. The question is whether the team finds out before or after it causes a problem.

---

## What is Claude Code actually doing?

This is the framing that makes the eval case land.

Claude Code is described in [its own overview](https://code.claude.com/docs/en/overview) as an AI-powered coding assistant that reads codebases, edits files, runs commands, and integrates with development tools. That is not a chat interface. It is an agent that acts inside an environment.

When Claude Code runs a workflow, it is doing some combination of the following:

- Loading instructions from CLAUDE.md files at the user, project, and organisation scope
- Reading files in the repository to understand context
- Editing files — sometimes many of them, in non-obvious places
- Running shell commands — builds, tests, linting, git operations
- Calling MCP tools that connect to external services
- Firing hooks at lifecycle points (PreToolUse, PostToolUse, Stop, SessionStart)
- Routing subtasks to subagents with their own context and tool permissions

Each layer is a variable. [Memory configuration](https://code.claude.com/docs/en/memory) determines what Claude knows about your project before it starts. [Settings and permissions](https://code.claude.com/docs/en/settings) determine what it is allowed to do. [Hooks](https://code.claude.com/docs/en/hooks) fire automatically at lifecycle points and can run shell commands, call HTTP endpoints, or prompt Claude — all without the user explicitly triggering them.

An [architectural analysis of Claude Code's public source code](https://arxiv.org/abs/2604.14228) identified the core while-loop, a five-layer compaction pipeline, four extensibility mechanisms, and the subagent orchestration layer. The complexity is real. It is not academic — it is the thing that runs when you invoke a workflow.

A [systematic study of configuration in five agentic AI coding tools](https://arxiv.org/abs/2602.14690) analysed 2,853 GitHub repositories and found that Claude Code users employ the broadest range of configuration mechanisms of any tool examined. Real teams are using hooks, skills, MCP integrations, and custom memory — not just writing prompts.

Evaluating only the final text output of a Claude Code workflow is like testing a function by reading its name. The name might be correct. The function might still be broken. The system under test is the whole workflow — the model, the instructions, the configuration, the tools, the environment — and the only way to know whether it is working correctly is to define what correct looks like and check against it.

---

## What are the failures that should have been caught?

These are not edge cases. They are the kinds of failure that happen in normal use and are invisible until something downstream breaks.

**The hook that fired but did nothing.** A hook is configured to run a validation script after each file write. The hook fires — the PostToolUse event triggers, the hook executes, no error is returned. But the script path was wrong. The validation never ran. The workflow completed successfully. No one noticed until a downstream step failed three hours later. A single run would not catch this. An eval that checks whether the expected side effect occurred would catch it immediately.

**The files edited in the wrong directory.** Claude Code was asked to update a configuration file. It found a file with the right name, updated it, and reported success. The file was in the wrong directory — a duplicate from an older version of the project. The real configuration file was untouched. Visual inspection of the output confirmed a change was made. Only checking the state of the right file would have caught the error.

**The subagent that returned a plausible but incorrect result.** A subagent was delegated a research task. It returned a structured summary that looked authoritative. The sources it cited were real. The claims it made were wrong — plausible extrapolations from the sources, not statements the sources actually made. The result was used downstream. The error propagated. [Anthropic's eval guide](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) names this directly: in agentic workflows, mistakes compound. A grading criterion that checks specific claims against the source material would have caught this at the subagent layer.

**The tests that were skipped because the agent decided they were optional.** A workflow includes a step that runs the test suite before committing. On one run, Claude Code assessed that the tests were not relevant to the changes made and skipped them. The assessment was wrong. The commit introduced a regression. The [best practices guide](https://code.claude.com/docs/en/best-practices) is explicit: "looks done" is not a valid completion criterion. An eval that checks whether the test suite ran and passed would have caught this.

None of these failures requires a complex scenario. They are the normal failure modes of a system with many layers. The reason they are caught late — or not at all — is that the discipline of defining what correct looks like was never applied.

---

## Are evals a thinking problem or an infrastructure problem?

Both, but in the wrong order.

Most people who decide not to build evals imagine the infrastructure first: a harness, a test runner, a grading function, a set of metrics to track. That picture is not wrong — Part 3 of this series will walk through exactly that. But starting with the infrastructure is the wrong starting point, and it is why evals feel harder than they are.

The real work is earlier and simpler. It is sitting down with your workflow and answering: what does a correct run look like? What would I check if I watched it run? What is the difference between "it completed" and "it completed correctly"?

[Anthropic's demystifying evals post](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) defines the eval structure as: an input, a grading criterion, and a check. That is it. The input is the task. The grading criterion is the specification of correct. The check is whatever mechanism you use to verify it. The infrastructure serves the grading criterion — it does not replace it.

The grading criterion requires thinking. Thinking requires attention. And this is where the situation gets pointed: the capability that makes evals feel unnecessary — powerful AI tools that handle complex tasks — is also the thing that encourages outsourcing the thinking that evals require. The more you trust Claude Code to handle things, the less likely you are to sit down and specify what "handled correctly" means.

That is the trap. Evals are not infrastructure. They are a discipline of specification. The cost of skipping them is not paid immediately — it accumulates in the drift between what your workflow does and what you think it does.

---

## What comes next

This post is about the mental model: Claude Code is an acting system, and one good run is not evidence.

Part 2 will give you the map. There are eight distinct surfaces of a Claude Code workflow that can be evaluated — final output, repository state, tool-use trajectory, skill invocation, subagent delegation, hook execution, cost and latency, and human usefulness. Each surface has its own failure modes and its own grading criteria. The right eval depends on which part of the workflow you are trying to trust.

Part 3 will give you the method. A twelve-step recipe for building a first eval suite that actually helps — starting from one workflow, collecting real examples, defining failure, and building small regression cases. The goal is not comprehensiveness. The goal, as the series thesis has it, is to stop being surprised by the same failure twice.

---

## Now, I want to hear from you

What workflow have you built with Claude Code that you trust — but have never tested? What would you need to define as "correct" to write the first eval for it?

---

## References

- [A non-coder's guide to Claude Code — Vox](https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs) — Bryan Walsh's accessible explainer on what Claude Code is and the extreme reactions it prompts
- [Non-Determinism of "Deterministic" LLM Settings — arXiv:2408.04667](https://arxiv.org/abs/2408.04667) — empirical study showing up to 15% accuracy variation per run and 70% best-to-worst gap across five LLMs under deterministic settings
- [Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Anthropic's engineering post defining eval structure, distinguishing eval types, and explaining how mistakes compound in agentic workflows
- [Claude Code best practices — code.claude.com](https://code.claude.com/docs/en/best-practices) — Anthropic's official best practices guide framing verification by discipline rather than by assumption
- [Create custom subagents — code.claude.com](https://code.claude.com/docs/en/sub-agents) — official docs on Claude Code subagents, including model routing to faster/cheaper models for cost control
- [Common workflows — code.claude.com](https://code.claude.com/docs/en/common-workflows) — short recipes for everyday Claude Code tasks, relevant to the iteration and regression problem
- [Extend Claude with skills — code.claude.com](https://code.claude.com/docs/en/skills) — documentation on the skills system and reusable procedures, illustrating the revision-without-measurement problem
- [Claude Code overview — code.claude.com](https://code.claude.com/docs/en/overview) — official overview establishing Claude Code as an acting system that reads, edits, runs, and integrates
- [How Claude remembers your project — code.claude.com](https://code.claude.com/docs/en/memory) — documentation on CLAUDE.md and auto-memory as part of the system under test
- [Claude Code settings and permissions — code.claude.com](https://code.claude.com/docs/en/settings) — four-tier configuration scope system showing the breadth of variables that affect behaviour
- [Hooks reference — code.claude.com](https://code.claude.com/docs/en/hooks) — full reference for the hooks system and its silent failure surface
- [On the Use of Agentic Coding Manifests — arXiv:2509.14744](https://arxiv.org/abs/2509.14744) — empirical study of 253 CLAUDE.md files showing the breadth of real-world configuration practice
- [Dive into Claude Code — arXiv:2604.14228](https://arxiv.org/abs/2604.14228) — architectural analysis of Claude Code identifying the core while-loop, compaction pipeline, and four extensibility mechanisms
- [Harness Engineering for Agentic AI Coding Tools — arXiv:2602.14690](https://arxiv.org/abs/2602.14690) — systematic study of configuration in five agentic AI coding tools, finding Claude Code users employ the broadest configuration range
- [Agentic Education — arXiv:2604.17460](https://arxiv.org/abs/2604.17460) — modular curriculum for Claude Code, evidence of broad adoption and the growing need for systematic quality assessment
