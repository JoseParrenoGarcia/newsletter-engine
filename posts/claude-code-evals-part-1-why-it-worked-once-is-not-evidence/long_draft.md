# Why "It Worked Once" Is Not Evidence — Claude Code Evals, Part 1

*Part 1 of 3 — Why one good run is not evidence, and why the same testing discipline that makes software reliable must be applied to Claude Code workflows.*

One good run is not evidence. It is a story you told yourself.

Claude Code is not a chat interface. It is an agent that reads your codebase, edits files, runs commands, calls tools, fires hooks, loads memory, and routes work to subagents. When it works, the whole system worked — the model, the instructions, the configuration, the tools, the environment. When it fails, any one of those layers may be the cause. And if you have never built an eval for it, you have no way to distinguish a reliable workflow from a lucky one.

This is the missing discipline. Software engineers do not write tests because they expect their code to fail. They write tests because verification by assumption is not verification at all. That same discipline has not made it into how most people build with agents — and the cost shows up slowly, in workflows that degrade when the prompt is revised, in models that cannot be swapped without a manual inspection, in failures that repeat because no one captured them the first time.

This post is about the why. Not the infrastructure, not the harnesses, not the YAML configs — those come in Parts 2 and 3 of this series. This is about the mental model that makes evals feel necessary rather than optional.

---

## What will we cover in this post?

- **What is the run that felt like magic?** Why the first impressive Claude Code run is the most dangerous data point you have.
- **Why are LLMs probabilistic, not deterministic?** What the empirical variance data says about "it worked once."
- **What is Claude Code actually doing?** Why the unit of trust is the whole workflow, not the final text output.
- **What is the unit test we forgot to write?** The discipline analogy — and why it applies directly to agent workflows.
- **What are the three questions you cannot answer without Claude Code evals?** The revision problem, the cost problem, and the regression problem.
- **What agent failures should Claude Code evals have caught?** Concrete failure modes that are invisible on a single run but obvious in a regression suite.
- **Are evals a thinking problem or an infrastructure problem?** The reframe — and the forward pointer to Parts 2 and 3.

---

## What is the run that felt like magic?

You ran Claude Code on a real task. Maybe it navigated a codebase you had not explained, found the relevant function, and fixed the bug. Maybe it wrote a script that automated something you had been doing by hand. Maybe it summarised a set of files in a way that would have taken you an hour.

It was impressive. Not "good for an AI" impressive — genuinely impressive.

I had that feeling with one of the first skills I built for this newsletter pipeline. Claude read a research brief, produced a structured draft that matched the outline almost exactly, and cited every source correctly. I ran it again the next day on a different brief and it worked again. I told myself the skill was solid. I moved on.

Three weeks later, the same skill produced a draft that cited sources it had not been given, missed two of the five required sections, and formatted the output in a completely different structure. Nothing in the skill had changed. The model had not changed. The brief format was identical. I had no way to know whether this was a regression or whether I had been lucky the first two times.

That reaction is not wrong — the first run often is good. The problem is what you do with it. [Bryan Walsh's piece in Vox](https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs) captures the initial response well: Claude Code has a way of prompting extreme reactions, partly because it is doing something that looks like competence, not just pattern matching.

Most people walk away with a feeling of confidence. The workflow is figured out. The agent handles it. They use it again, and it works again — or it mostly works, with a few things to clean up manually. A mental model forms: Claude Code is reliable for this kind of task.

That mental model is built on the wrong foundation. "It worked twice" is still not evidence of reliability. It is evidence of two successful runs. Reliability requires being able to characterise failure as well as success — to know the rate, the conditions, and the specific ways a workflow breaks. Without that, you are trusting the story of the good runs.

There is a name for this. Availability bias makes the runs you remember — the impressive ones — feel more representative than they are. The runs that quietly produced wrong outputs, skipped steps, or silently degraded do not surface unless you built something that would surface them. That something is an eval.

---

## Why are LLMs probabilistic, not deterministic?

The architecture is the reason.

Language models generate output token by token, sampling from a probability distribution at each step. Even with temperature set to zero — the so-called "deterministic" setting — the underlying computation involves floating-point arithmetic distributed across hardware, which introduces variation. The setting reduces variance; it does not eliminate it.

Researchers ran five LLMs on eight common tasks, ten runs each, under supposedly deterministic settings. The results:

- Accuracy varied by up to 15% across runs for the same model on the same task
- The gap between the best and worst possible run for a single model reached up to 70%
- None of the five models consistently delivered repeatable accuracy

A [2024 empirical study from Penn State and Amazon](https://arxiv.org/abs/2408.04667) confirmed these figures directly.

That 70% figure is not a theoretical maximum. It is a measured outcome on real tasks with real models. The point is not that Claude Code is unreliable — it is that without measurement, you have no idea where on that spectrum your particular workflow sits.

This is what "it worked once" actually means: you have one sample from a distribution you have not characterised. The sample was good. The distribution may be excellent, or it may be volatile. You do not know which.

Evals are how you find out.

---

## What is Claude Code actually doing?

Claude Code is not a chat interface — it is an acting system that reads, edits, runs, and integrates, and that scope changes what evaluation means.

When Claude Code runs a workflow, it is doing some combination of the following:

- Loading instructions from CLAUDE.md files at the user, project, and organisation scope
- Reading files in the repository to understand context
- Editing files — sometimes many of them, in non-obvious places
- Running shell commands — builds, tests, linting, git operations
- Calling MCP tools that connect to external services
- Firing hooks at lifecycle points (PreToolUse, PostToolUse, Stop, SessionStart)
- Routing subtasks to subagents with their own context and tool permissions

[Its own overview](https://code.claude.com/docs/en/overview) describes Claude Code as an AI-powered coding assistant that reads codebases, edits files, runs commands, and integrates with development tools — each of those is a variable in the system under test.

Each layer is a variable. [Memory configuration](https://code.claude.com/docs/en/memory) determines what Claude knows about your project before it starts. [Settings and permissions](https://code.claude.com/docs/en/settings) determine what it is allowed to do. [Hooks](https://code.claude.com/docs/en/hooks) fire automatically at lifecycle points and can run shell commands, call HTTP endpoints, or prompt Claude — all without the user explicitly triggering them.

An [architectural analysis of Claude Code's public source code](https://arxiv.org/abs/2604.14228) identified the core while-loop, a five-layer compaction pipeline, four extensibility mechanisms, and the subagent orchestration layer. The complexity is real — it is the thing that runs when you invoke a workflow.

A [systematic study of configuration in five agentic AI coding tools](https://arxiv.org/abs/2602.14690) analysed 2,853 GitHub repositories and found that Claude Code users employ the broadest range of configuration mechanisms of any tool examined. Real teams are using hooks, skills, MCP integrations, and custom memory — not just writing prompts.

Evaluating only the final text output of a Claude Code workflow is like testing a function by reading its name. The name might be correct. The function might still be broken. The system under test is the whole workflow — the model, the instructions, the configuration, the tools, the environment — and the only way to know whether it is working correctly is to define what correct looks like and check against it.

---

## What is the unit test we forgot to write?

Software engineers do not write unit tests because they think their code is broken. They write them because the practice of verification is a discipline, and disciplines produce reliability that informal review cannot.

Data scientists already understand this better than most. When evaluating a machine learning model, you do not run it once and trust the result — you define a held-out test set, fix the evaluation criteria, and measure performance across cases you have not trained on. The discipline exists because "looked right during development" is not a quality standard. That same thinking should apply here.

Think about what a unit test actually does. It captures a known input, a known expected output, and a check that the actual output matches. The test does not run once and get deleted. It runs on every change, catching regressions before they reach production. The engineer who wrote the original function may be long gone, but the test remains — a frozen specification of what "correct" looks like.

That is precisely what is missing from most agent workflows. The workflow runs. It looks good. No one sits down to write the eval.

[Anthropic's own engineering blog post on evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) defines the eval structure: an input, a grading criterion, and a check. The structure is almost identical to a unit test. The conceptual leap is not large — but it requires making the decision that your workflow is the kind of thing that deserves to be tested.

[Anthropic's best practices guide](https://code.claude.com/docs/en/best-practices) makes the implication explicit: Claude should always have a verifiable check it can run — tests, a build, a screenshot comparison — rather than relying on "looks done" as the signal that a task is complete. If "looks done" is not acceptable for Claude to use as a completion criterion, why is it acceptable for the team building and evaluating the workflow to use?

The unit test is not difficult to write. The difficult part is deciding it is worth writing.

---

## What are the three questions you cannot answer without Claude Code evals?

These are not hypothetical concerns. They are questions that come up for any team that builds more than one Claude Code workflow and plans to iterate on it.

**Did this revision make it better, or just different?**

Say you have a feature-extraction skill — a reusable procedure that takes raw data, extracts structured attributes, and writes them to a file. You tweaked the instructions after noticing it was silently skipping edge cases. The next run looks better. But does it? You changed the prompt, not the task. Without evals — without a set of known inputs and a grading criterion — you have no way to know whether the revision improved extraction accuracy across the range of cases the skill handles, or whether it just happened to perform better on the one example you used for the revision.

[The skills documentation](https://code.claude.com/docs/en/skills) describes how skill bodies are loaded only when used, and how they encode reusable procedures. What the documentation does not provide — because it is not a documentation problem — is a way to measure whether a revised skill is better. That is an eval problem.

**Can Haiku replace Sonnet for this task?**

Cost management is a real concern for any team running agents at volume. [The subagents documentation](https://code.claude.com/docs/en/sub-agents) explicitly mentions routing tasks to "faster, cheaper models like Haiku" as a cost control mechanism. Claude Haiku is significantly less expensive than Sonnet or Opus. For workflows that run frequently or at scale — say, a data summarisation agent that processes hundreds of reports per week — the cost difference is material.

But whether Haiku is good enough for a specific workflow is an empirical question, not a theoretical one. The answer depends on the task, the instructions, the error tolerance, and the specific ways each model tends to fail. A visual inspection of a few runs will not tell you. You need evals — a fixed set of test cases with defined grading criteria — to characterise the quality difference and decide whether the cost saving is worth it.

**Is this failure new, or have we seen it before?**

This is the regression question, and it is the one that bites teams hardest. A workflow that worked last month starts producing errors. Was this a change in the model? A change in the codebase? A change in the tools or configuration? Without a regression suite — evals that run on a defined set of cases and report pass/fail — there is no way to know when a failure was introduced, and no way to verify that a fix actually fixed it.

[Common workflow recipes](https://code.claude.com/docs/en/common-workflows) cover the everyday tasks where Claude Code adds value: exploring codebases, fixing bugs, creating PRs. Each of those is a workflow that will be run repeatedly. Each is a workflow where regressions will happen. The question is whether the team finds out before or after it causes a problem.

---

## What agent failures should Claude Code evals have caught?

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

The grading criterion requires thinking. Thinking requires attention. And this is where the situation becomes self-reinforcing: the more capable Claude Code becomes at handling complex tasks, the easier it is to skip the step of specifying what "handled correctly" means. That is what happened with the newsletter pipeline skill I described at the start. The first two runs were good enough that I stopped asking the question.

Take the "hook that fired but did nothing" failure from the previous section. Writing an eval for it does not require a framework. It requires three things:

- **Input:** run the workflow with a known file write that should trigger the validation hook
- **Grading criterion:** the validation script must have executed and produced a log entry with a success flag
- **Check:** read the log file after the run; pass if the expected entry exists, fail otherwise

That is it. No harness. No YAML config. The hard part was not the infrastructure — it was deciding what "the hook ran correctly" actually means, then caring enough to write it down.

Evals are not infrastructure. They are a discipline of specification. The cost of skipping them is not paid immediately — it accumulates in the drift between what your workflow does and what you think it does.

---

## What comes next

Claude Code is not just generating text. It is acting inside an environment with many layers — and a single impressive run tells you that the system worked under those conditions, on that day, on that input. It does not tell you whether it will work tomorrow, whether a revision made it better or just different, or whether you will notice the next time something goes wrong.

Three weeks after my newsletter pipeline skill worked twice, it failed in a way I had no way to explain. No logs. No baseline. No test to run. Just a broken output and no way to know if it was a regression or whether I had been lucky from the start. I had trusted the story of the good runs.

The fix is not complicated. It starts with deciding that your workflow is the kind of thing that deserves to be tested — then sitting down to answer one question: what would a correct run look like?

Part 2 will give you the map. There are eight distinct surfaces of a Claude Code workflow that can be evaluated — final output, repository state, tool-use trajectory, skill invocation, subagent delegation, hook execution, cost and latency, and human usefulness. Each surface has its own failure modes and its own grading criteria.

Part 3 will give you the method. A practical recipe for building a first eval suite — starting from one workflow, real tasks, and the failures you have already seen. The goal is not comprehensiveness. The goal, as the series thesis has it, is to stop being surprised by the same failure twice.

---

## What Claude Code workflow would you test first?

What workflow have you built with Claude Code that you trust — but have never tested?

Here is the harder version: if a colleague asked you to prove that workflow was reliable — not "it looks good" reliable, but measurably reliable — what would you point them at?

And the harder version still: have you ever revised a prompt or a skill and assumed it got better, without running a single test case to confirm it?

If the answer to any of these is "nothing yet," that is where to start. Not with infrastructure. With the question.

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
