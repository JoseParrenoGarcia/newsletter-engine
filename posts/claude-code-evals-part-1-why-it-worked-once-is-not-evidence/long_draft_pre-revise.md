# Why "It Worked Once" Is Not Evidence — Claude Code Evals, Part 1

*Part 1 of 3 — Why one good run is not evidence, and why the same testing discipline that makes software reliable must be applied to Claude Code workflows.*

You built a Claude Code workflow. Maybe a skill that generates reports, a pipeline that processes tickets, or an agent that reviews pull requests. It worked. Maybe it worked beautifully — the output was structured, the reasoning was sharp, and you felt something close to relief. This thing actually works.

But here is the question that rarely gets asked: how do you know it will work again tomorrow?

Not "will Claude Code still exist tomorrow." How do you know *this specific workflow*, with *these specific instructions*, against *this range of inputs*, will produce a correct result on the next run, and the run after that?

Software engineering has an answer to this problem: unit tests. You define expected behaviour, encode it in a test, and run it every time something changes. Not because you expect the function to be broken — because verification by discipline is more reliable than verification by assumption.

Machine learning engineering has the same instinct in a different form. You do not trust a model at launch and walk away. You monitor for data drift, track performance degradation, and alert when the world moves underneath the model. The discipline exists because a model that worked last quarter can fail this quarter without anything in the code changing.

Data science has a version too. You run controlled experiments before trusting that a change actually caused an improvement. "More clicks after the change" is not causation. It might be seasonality, sample bias, or noise in a very expensive jacket.

Notice the pattern. Every mature engineering discipline has a practice for answering: *does this actually work, and how would I know if it stopped?*

Now look at how most people build with Claude Code. A workflow is built. It works on a few runs. The builder moves on. No baseline. No grading criteria. No test cases. If it fails next week, they will debug it manually and wonder whether it was always flaky.

This is not a post about how to implement evals. That is Part 3. This is a post about why evals are the missing quality discipline for agentic workflows — the practice that every other engineering domain takes for granted, and that agent builders have not yet installed as a reflex.

---

## What will we cover in this post?

- **Why are LLMs probabilistic even when they look consistent?** Why a token-sampling architecture means "it worked once" is a sample of one from a distribution you have not characterised.
- **What do unit tests, MLOps, and experimentation have in common?** The three engineering disciplines that all answer the same question, and what agents need from each of them.
- **What is the equivalent discipline for agents?** A concrete definition of an eval, grounded in a real example, with a working breakdown of inputs, success criteria, and checks.
- **What are the three questions you cannot answer without evals?** The revision problem, the cost problem, and the regression problem — all practical, all common.
- **Why are evals a thinking problem before they are an infrastructure problem?** The reframe that makes evals feel achievable rather than academic.

---

## Why are LLMs probabilistic even when they look consistent?

Start with how the model works, but only the part that matters for this argument.

Language models generate output token by token. At each step, the model computes a probability distribution over possible next tokens and samples from it. This is not a bug or an implementation quirk — it is the architecture. The model is not retrieving a stored answer. It is generating a likely continuation of the sequence it has seen.

Temperature controls how peaked that distribution is. Set it to zero and the model reliably picks the highest-probability token at each step. That sounds deterministic. In practice, even zero-temperature runs vary — floating-point arithmetic across distributed hardware introduces small differences that can compound over a long sequence of token choices. The setting reduces variance. It does not eliminate it.

Here is what the empirical picture looks like. In a [2024 study from Penn State and Amazon](https://arxiv.org/abs/2408.04667), researchers ran five LLMs on eight common tasks, ten runs each, under supposedly deterministic settings. Accuracy varied by up to 15% across runs for the same model on the same task. The gap between the best and worst possible run for a single model reached 70%. None of the five models delivered consistently repeatable accuracy.

Seventy percent. Not across different models. For the same model, on the same task.

To make this concrete: ask a model to summarise a set of meeting notes and produce a structured list of action items. Run it ten times. On most runs the output will be broadly similar. On some it will be notably better. On others it will miss an item, collapse two into one, or introduce an action item that was not discussed. The underlying task did not change. The prompt did not change. The distribution moved.

The point is not that Claude Code is unreliable. The point is this: if your workflow depends on the model correctly following a set of instructions — generating a document, extracting structured data, making a decision — then one successful run tells you very little. Unless the LLM is writing deterministic code that you then execute and test, you are mostly trusting instruction-following behaviour. That behaviour needs evaluation.

One good run is a sample of one from a distribution you have not characterised. The sample was good. The distribution may be excellent or it may be volatile. You do not know which until you measure.

---

## What do unit tests, MLOps, and experimentation have in common?

They are all answers to the same question: *does this actually work, and how would I know if it stopped?*

The reason this question matters is that intuition and visual inspection are weak signals. They tell you about the runs you observed. They tell you nothing about the runs you did not. Every mature engineering discipline has developed a practice for moving beyond "it looked fine" — and each practice has something to teach about agents.

**Unit tests**

A function takes an input and returns an output. You define what the correct output should be for a given input, write a test that encodes that definition, and run it on every change.

A pricing function that applies a 10% discount should return £90 when given £100. The test does not care whether you believe the function is broken. It runs because the cost of a regression — a future change that silently breaks the discount logic — is higher than the cost of writing the test. The test is the memory of what correct looks like.

The lesson is not about functions. It is about the practice. We do not trust code because it worked once. We trust it because we can repeatedly verify it.

**MLOps and data drift**

A machine learning model can perform well at launch and degrade steadily for reasons that have nothing to do with the code. The input distribution shifts. Customer behaviour changes. Fraud patterns evolve. The model was trained on last year's data. This year's data looks different enough that the model's predictions are increasingly wrong — but the code is unchanged, the pipeline is running, and no alarm has fired.

The discipline MLOps built in response is monitoring: define expected input distributions and performance thresholds, measure them continuously, and alert when the world has moved underneath the model.

The lesson: we do not trust ML models forever. We monitor whether the world has moved underneath them.

**Experimentation**

A product team ships a new ranking model. Traffic is up. Clicks are up. The instinct is to declare success. But without a controlled experiment — a random split between the old model and the new one, with a pre-agreed success metric — the improvement could be seasonal traffic, a coincident change elsewhere in the product, or selection bias in how the analysis was sliced. The world is full of confident decisions made on data that turned out to be noise.

The lesson: we do not trust intuition when the cost of being wrong matters. We test causally.

---

Three different domains. Three different practices. All solving the same problem: replacing the unreliable signal of "looked good" with a repeatable, measurable, historically comparable check.

Agents need the same discipline. Not because they are useless. Because they are useful enough to become infrastructure — and infrastructure that cannot be verified is infrastructure that will eventually fail in ways nobody expected.

---

## What is the equivalent discipline for agents?

Not benchmarks, not leaderboards, not the kind of evaluation that compares GPT-4 against Claude on MMLU. What agents need is something closer to the unit test: a repeatable way to check whether a specific workflow, in your specific context, did what it was supposed to do.

The structure is simple. [Anthropic's own engineering post on evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) defines it as three components:

- **Input:** the task, prompt, file, codebase, ticket, document, or workflow trigger
- **A success criterion:** what must be true for the run to count as correct
- **A check:** the mechanism that decides whether the criterion was met

That is it. An eval is not a framework or a benchmark or a research protocol. It is a stored definition of what a correct run looks like, plus a mechanism to check whether a given run met that definition.

To make this concrete, take a real example that is relevant to almost anyone working with data teams.

*The task:* draft an experiment design document for a homepage ranking test.

*Success criteria:*
- Contains a clearly stated hypothesis
- Names a primary metric and at least two guardrail metrics
- Includes sample size assumptions
- States launch criteria and rollback criteria
- Does not invent metrics that were not provided as context
- Includes at least one statistical caveat (minimum detectable effect, power, or confidence threshold)
- Produces a markdown document with the expected section headings

*Checks:*
- Some are deterministic: the expected headings exist, the required sections are present, no invented metrics appear in the output
- Some are model-graded: is the statistical reasoning sound, are the assumptions justified, is the hypothesis falsifiable?
- Some are human-reviewed: is this document useful to the team running the experiment? Would a statistician sign off on it?

Now consider what "the skill produced a document" tells you without these criteria. It tells you the workflow completed. It tells you something appeared on screen. It tells you nothing about whether the reasoning was sound, whether the statistical caveats were correct, or whether the output would embarrass someone in a review meeting.

An eval is not the workflow. It is the memory of what good looks like.

---

## What are the three questions you cannot answer without evals?

These are not hypothetical. They come up for any team that builds more than one Claude Code workflow and plans to iterate on it.

**Did this change make the workflow better, or just different?**

You revised a skill. Maybe you adjusted the instructions after noticing it was missing edge cases. Maybe you rewrote the opening section for clarity. Maybe you changed the output format based on feedback. The next run looks better.

But does it? You changed the prompt. You did not change the task, the range of inputs, or the definition of correct. Without a set of known inputs and grading criteria, you have no way to know whether the revision improved quality across the range of cases the skill handles, or whether it just happened to produce a better result on the one example you were looking at when you made the change. "Vibes before and after" is not a measurement. Somewhere, a p-value quietly weeps.

This applies every time you edit a prompt, a skill, a CLAUDE.md file, a system instruction, or a tool description. Without evals, you are comparing impressions.

**Can I use a cheaper or faster model?**

[The subagents documentation](https://code.claude.com/docs/en/sub-agents) explicitly mentions routing tasks to faster, cheaper models like Haiku as a cost control mechanism. For workflows that run at volume — processing hundreds of documents per day, reviewing every pull request, summarising meeting notes across a team — the cost difference between Haiku and Sonnet is material. Could Haiku handle the summarisation step? Could it classify tickets well enough? Does Sonnet need to touch every part of the workflow, or only the steps that require complex reasoning?

These are empirical questions, not theoretical ones. The answer depends on the task, the instructions, the error tolerance, and the specific ways each model tends to fail. A visual inspection of a few runs will not tell you. Evals — fixed test cases with defined grading criteria — let you characterise the quality difference and make the decision with evidence.

Without evals, model routing is guesswork.

**Is this failure new, or have we seen it before?**

A workflow fails today. Something in the output is wrong. The immediate question is: was it always doing this, or did something change?

Was it the model? Did a recent CLAUDE.md edit introduce a conflict? Did the tool permissions change? Did the upstream data format shift? Without a regression suite — evals that run on a defined set of cases and report pass or fail — there is no history to consult. You cannot know when the failure was introduced. You cannot verify that your fix actually fixed it rather than just masking it on the one case you tested.

Without evals, you do not have history. You only have vibes with timestamps.

---

## Why are evals a thinking problem before they are an infrastructure problem?

The most common reason teams do not build evals is that they imagine the infrastructure first. A harness. A test runner. A grading function. YAML configs. An LLM-as-judge prompt. A dashboard. The picture is not wrong — Part 3 of this series will walk through exactly that. But starting with the infrastructure is the wrong starting point, and it is why evals feel heavier than they are.

The first question is not "which framework should I use?" It is: *what does a correct run look like?*

Go back to the experiment design document example. A correct run is not "a document was created." A correct run is one where the document contains the right reasoning, the right structure, the right statistical caveats, and avoids dangerous nonsense that a statistician would flag in a review meeting. Defining that takes thinking. It takes familiarity with the task and an honest answer to the question: what would make me trust this output enough to use it?

The eval is just the artefact that captures your success criteria. If you have not defined success, no framework will save you.

Buying a test harness before defining correctness is like buying a very expensive measuring tape and refusing to decide what length means.

The parallel to the other three disciplines is exact. Unit tests require you to know what the function should return before you can write the assertion. ML monitoring requires you to define expected distributions before you can alert on drift. Experimentation requires you to agree on the success metric before you randomise. Evals for agents are no different: the thinking comes first, and the infrastructure serves the thinking.

For the experiment design document skill, writing the eval does not require any framework. It requires three things:

- **Input:** a realistic experiment brief — a product team, a proposed change, a metric they care about
- **Success criteria:** the section headings exist, no invented metrics appear, the statistical caveats are present, the hypothesis is falsifiable
- **Check:** a script that reads the output, confirms the expected structure, and flags violations — plus a model-graded pass for reasoning quality

No YAML. No external service. The difficult part is not the infrastructure. It is sitting down and answering: what does "the skill worked correctly" actually mean?

---

## What Claude Code workflow would you test first?

Think of one Claude Code workflow, skill, or agent that you already trust. Something you have used more than a handful of times and would describe as reliable. Now ask yourself: if a colleague asked you to prove it works — not "it looks good" but measurably, repeatably works — what would you show them?

If the answer is "I would run it and show them the output," that is not proof. That is a demonstration of one run from a distribution you have not characterised.

Three questions to sit with:

1. Which Claude Code workflow do you trust most right now — and have you ever measured it, or are you trusting the story of the good runs?

2. Of the three analogies in this post — unit tests protecting against regression, MLOps monitoring for drift, experimentation requiring causal evidence — which one felt most like a gap in how you currently think about your agent workflows?

3. For a skill you rely on regularly: have you ever written down what a correct run looks like? Not what it produces — what makes that production correct?

---

Part 2 maps the territory. There are distinct surfaces of a Claude Code workflow that can be evaluated — final output, repository state, tool-use trajectory, skill invocation, subagent delegation, hook execution, cost and latency, and human usefulness. Each surface has its own failure modes and its own grading criteria.

Part 3 builds the first suite. A practical recipe starting from one workflow, real test cases, and the failures you have already seen. The goal is not comprehensiveness. The goal is to stop being surprised by the same failure twice.

---

## References

- [Non-Determinism of "Deterministic" LLM Settings — arXiv:2408.04667](https://arxiv.org/abs/2408.04667) — empirical study showing up to 15% accuracy variation per run and a 70% best-to-worst gap across five LLMs under supposedly deterministic settings
- [Demystifying evals for AI agents — Anthropic Engineering](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Anthropic's engineering post defining eval structure (input, grading criterion, check), distinguishing eval types, and explaining how mistakes compound in agentic workflows
- [Claude Code best practices — code.claude.com](https://code.claude.com/docs/en/best-practices) — Anthropic's official best practices guide framing verification by discipline rather than by assumption, and naming "looks done" as an insufficient completion criterion
- [Create custom subagents — code.claude.com](https://code.claude.com/docs/en/sub-agents) — official docs on Claude Code subagents, including model routing to faster and cheaper models for cost control
- [Common workflows — code.claude.com](https://code.claude.com/docs/en/common-workflows) — short recipes for everyday Claude Code tasks, illustrating the range of workflows where iteration and regression are practical concerns
- [Extend Claude with skills — code.claude.com](https://code.claude.com/docs/en/skills) — documentation on the skills system and reusable procedures, relevant to the revision-without-measurement problem
- [Claude Code overview — code.claude.com](https://code.claude.com/docs/en/overview) — official overview establishing Claude Code as an acting system that reads, edits, runs, and integrates with development tools
- [How Claude remembers your project — code.claude.com](https://code.claude.com/docs/en/memory) — documentation on CLAUDE.md and auto-memory as part of the system under test
- [Claude Code settings and permissions — code.claude.com](https://code.claude.com/docs/en/settings) — four-tier configuration scope system showing the breadth of variables that affect behaviour
- [Hooks reference — code.claude.com](https://code.claude.com/docs/en/hooks) — full reference for the hooks system, including the silent failure surface where hooks fire without executing correctly
- [On the Use of Agentic Coding Manifests — arXiv:2509.14744](https://arxiv.org/abs/2509.14744) — empirical study of 253 CLAUDE.md files showing the breadth of real-world configuration practice
- [Dive into Claude Code — arXiv:2604.14228](https://arxiv.org/abs/2604.14228) — architectural analysis of Claude Code identifying the core while-loop, compaction pipeline, and four extensibility mechanisms
- [Harness Engineering for Agentic AI Coding Tools — arXiv:2602.14690](https://arxiv.org/abs/2602.14690) — systematic study of configuration in five agentic AI coding tools, finding Claude Code users employ the broadest configuration range of any tool examined
- [Agentic Education: Using Claude Code to Teach Claude Code — arXiv:2604.17460](https://arxiv.org/abs/2604.17460) — modular curriculum study as evidence of broad Claude Code adoption and growing need for systematic quality assessment
- [A non-coder's guide to Claude Code — Vox](https://www.vox.com/future-perfect/475370/anthropic-claude-code-artificial-intelligence-coder-jobs) — Bryan Walsh's accessible explainer on what Claude Code is and why it prompts strong reactions
