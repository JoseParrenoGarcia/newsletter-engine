# Why "It Worked Once" Is Not Evidence — Claude Code Evals, Part 1

*Part 1 of 3 — Why one good run is not evidence, and why the same testing discipline that makes software reliable must be applied to Claude Code workflows.*

Since the beginning of 2026, building automation with GenAI has gone from experimental to assumed. If you are anywhere near a technical team, you have built (or have seen in action) at least one workflow, agent or skill. And if you are reading a post about agentic evals, I would bet money you have a folder of markdown files with instructions for your agents and a growing suspicion that something in there is more fragile than it looks.

Let's assume that you have built a skill that generates reports, a workflow that processes tickets, or an agent that reviews pull requests. You tested them and they work. They really work.

But here is a question that rarely gets asked:

---

*How do you know it will work again tomorrow?*

*How do you know this specific workflow, with these specific instructions, against this range of inputs, will produce a correct result on the next run, and the run after that?*

---

Software engineering has an answer to this problem: unit tests.

Machine learning engineering has the same instinct in a different form. You monitor for data drift, track performance degradation, and alert when the world moves underneath the model.

Data science has a version too. You run controlled experiments before trusting that a change actually caused an improvement.

Notice the pattern. Every mature engineering discipline has a practice for answering: *does this actually work, and how would I know if it stopped?*

Now, look at how most people build with Claude Code. A workflow is built. It works on a few runs. The builder moves on. No baseline. No grading criteria. No test cases. If it fails next week, they will debug it manually and wonder whether it was always flaky.

This first post on Claude Code evals is about why evals are the missing quality discipline for agentic workflows and why you should start with evals as a first class citizen.

---

> 📌 **Claude Code evals [1/3]** — Why "It Worked Once" Is Not Evidence *(this post)*
> **Claude Code evals [2/3]** — TITLE
> **Claude Code evals [3/3]** — TITLE *(coming soon!)*

---

## What will we cover in this post?

- **Why does it matter that LLMs are probabilistic?** — one good run is a sample of one from a distribution you have not characterised.
- **What do unit tests, MLOps, and experimentation have in common?** — three disciplines, one shared answer to the same question.
- **What is the equivalent discipline for Claude Code agents?** — a concrete definition of an eval with a worked example.
- **What are the three questions you cannot answer without Claude Code evals?** — the revision problem, the cost problem, and the regression problem.
- **Why are evals a thinking problem before they are an infrastructure problem?** — the reframe that makes a first eval feel achievable.

Let's get started!

---

## Why does it matter that LLMs are probabilistic?

It matters because one successful run tells you almost nothing about the next one.

Language models generate output by sampling from a probability distribution at each token step. To put it simply: given a sequence of words, the model predicts the next most probable word, then the next, then the next. Given "the cat sat on the", most models will predict "mat" or "floor", but not always the same one, and not always with the same confidence. The same logic applies when the sequence is code. Given a half-written function, the model predicts the next most probable token (a variable name, a bracket, a keyword).

*PS: If you want to understand better how LLMs work, check my 5 part series.*

Now, for those who have read a bit more about LLMs, you might bring up the "temperature" parameter. Temperature controls how confident the model needs to be on that token prediction. For example, set it to 0 and the model picks the highest-probability token at each step. That sounds deterministic, but in practice, even zero-temperature runs vary (floating-point arithmetic across distributed hardware introduces small differences that can compound over a long sequence of token choices). The setting reduces variance, but it definitely doesn't eliminate it.

This is super important, because if variance exists, by definition, then you will never be 100% sure of the outputs of your systems if they rely solely on LLMs.

In a [2024 study from Penn State and Amazon](https://arxiv.org/abs/2408.04667), researchers ran 5 LLMs on 8 common tasks, 10 runs each, under supposedly deterministic settings. Accuracy varied by up to 15% across runs for the same model on the same task. The gap between the best and worst possible run for a single model reached 70%. Quoting the paper directly: *"In fact, none of the LLMs consistently delivers repeatable accuracy across all tasks, much less identical output strings."*

*Screenshot from the paper.*

Stop to understand the implications for a second. A 70% possible difference... for the same model, on the same task.

To make this concrete: ask a model to summarise a set of meeting notes and produce a structured list of action items. Run it ten times. On most runs the output will be broadly similar. On some it will be notably better. On others it will miss an item, collapse two into one, or introduce an action item that was not discussed. The underlying task did not change. The prompt did not change. But the output did.

You might argue that newer models released in 2026 would deal with this better, and probably they will. But the point is that if your workflow depends on an LLM model (regardless of intelligence) correctly following a set of instructions, then one successful run tells you very little. Unless the LLM is writing deterministic code that you then execute and test, you are mostly trusting instruction-following behaviour. That behaviour needs evaluation.

---

## What do unit tests, MLOps, and experimentation have in common?

They are all answers to the same question: *does this actually work, and how would I know if it stopped?*

Every mature engineering discipline has developed a practice for moving beyond "it looked fine", and each practice has something to teach about agents. Let's look at some examples that will make the relationship clear.

**Unit tests**

A unit test is a check you write once that runs automatically every time something changes. In plain English: you give a function a known input, define what the correct output should be, and let the test tell you if the code ever stops being correct. No manual inspection required.

The classic example is a pricing function. If it applies a 10% discount, the test sends £100 and checks for £90. That is it. One input, one expected output, one automated check. If someone in the future mistypes something inside the function, the unit test will fail, flagging that the expected behaviour is not being met.

Software engineers write unit tests to control expected behaviours, today and in the future. The practice that emerged from this is test-driven development: write the test before the code, let it fail, then make it pass. The test becomes a living specification of correct behaviour.

**MLOps and data drift**

A machine learning model is not code that either works or does not. It is a function approximator trained on historical data, which means it can degrade silently as the world changes around it, with no error thrown and no alert fired.

I have watched a recommendation model degrade for six weeks before anyone noticed. Only after a product feedback ticket got to us, and we did a closer inspection, we realised that the input distribution of a key feature had shifted, which made the model predictions shift from our expectations (and thus, getting many more cases than expected wrong).

The practice ML teams built in response is monitoring. You define what healthy looks like: the expected distribution of your most important input features, the expected range of your prediction distribution, the performance thresholds that matter for the business. You instrument those signals and alert when they drift past acceptable bounds. ML teams work under the assumption that the world will change, therefore, there is no question around introducing these success criteria to monitor.

**Experimentation**

A product change that looks good in a dashboard is not the same as a product change that caused the improvement. This sounds obvious. It is surprisingly easy to forget under deadline pressure.

Imagine the following. A team ships a new ranking model. Traffic is up. Clicks are up. The instinct is to declare success and move on. But the improvement could be seasonal traffic, a coincident change elsewhere in the product, or sample bias in how the analysis was sliced. Without a controlled A/B experiment — a random split between the old model and the new one, with a pre-agreed success metric and no peeking before the sample size is reached — there is no way to separate cause from correlation.

The discipline around experimentation is strict: you pre-register the hypothesis before you run the experiment, you agree on the success metric before you see the data, and you do not declare a winner until the planned sample size is reached. Teams that skip these steps end up optimising for noise and calling it progress.

---

Three different domains. Three different practices. All solving the same problem.

Agents need the same discipline.

Just because Opus 4.8 and GPT 5.5 seem magic, doesn't mean you should trust the wizard. One thing is if you are simply chatting with LLMs. But another is production grade systems that you need to trust.

If these hard-earned learnings from software engineering, machine learning operations and experimentation have been long established, why isn't the equivalent being talked about for agentic systems?

---

## What is the equivalent discipline for Claude Code agents?

As you have guessed from the title of this post, the equivalent for agents are evals.

We will not cover how to build evals today, but I believe it is the right moment to introduce what they are. I also encourage a read of [Anthropic's engineering post on evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents). From it, we can extract the 3 components that make up an eval.

- **Input:** the task, prompt, file, codebase, ticket, document, or workflow trigger
- **A success criterion:** what must be true for the run to count as correct
- **A check:** the mechanism that decides whether the criterion was met

To make this concrete, take a real example that is relevant to almost anyone working with data teams.

**The task**

Draft an A/B experiment design document for a homepage ranking test.

**Success criteria**

- Contains a clearly stated hypothesis
- Names a primary metric and at least two guardrail metrics
- Includes sample size assumptions
- States launch criteria and rollback criteria
- Does not invent metrics that were not provided as context
- Produces a markdown document with the expected section headings

**Checks**

- Some are deterministic: the expected headings exist, the required sections are present, no invented metrics appear in the output
- Some are model-graded: is the statistical reasoning sound, are the assumptions justified, is the hypothesis falsifiable?
- Some are human-reviewed: is this document useful to the team running the experiment? Would a statistician sign off on it?

**If we focused on the deterministic and model-graded**

Below is not meant to be production-ready code. It is a simplified sketch of what an eval suite for this skill could look like. The important part is not the YAML. The important part is that the task, success criteria, and checks are explicit.

```yaml
eval_suite:
  id: "ab_test_doc_skill_eval"
  description: >
    Evaluates whether the Claude Code skill for drafting A/B experiment
    design documents produces a complete, grounded, and statistically
    sensible markdown document.

  agent_under_test:
    type: "claude_code_skill"
    skill_name: "ab-test-design-doc"
    expected_output_format: "markdown"

  tasks:
    - id: "homepage_ranking_test_basic"
      input:
        prompt: >
          Draft an A/B experiment design document for a homepage ranking test.
          Use only the context provided below. Do not invent extra metrics.

        context:
          product_area: "Homepage ranking"
          change: "Replace the current heuristic ranking with a new personalised ranking model."
          primary_metric: "booking_conversion_rate"
          guardrail_metrics:
            - "page_load_time_p95"
            - "refund_rate"
            - "customer_support_contact_rate"
          population: "logged-in users on web"
          expected_runtime_days: 21
          minimum_detectable_effect: "1.5% relative uplift"
          rollout_plan: "start at 5%, then 25%, then 50%, then 100% if guardrails remain healthy"

      success_criteria:
        deterministic:
          required_headings:
            - "# Experiment Design"
            - "## Hypothesis"
            - "## Experiment Setup"
            - "## Primary Metric"
            - "## Guardrail Metrics"
            - "## Sample Size Assumptions"
            - "## Launch Criteria"
            - "## Rollback Criteria"
            - "## Risks and Caveats"

          required_metric_mentions:
            primary_metric: "booking_conversion_rate"
            guardrail_metrics:
              - "page_load_time_p95"
              - "refund_rate"
              - "customer_support_contact_rate"

          forbidden_invented_metrics:
            - "revenue_per_user"
            - "click_through_rate"
            - "retention_rate"
            - "average_order_value"

        model_graded:
          rubric:
            - name: "hypothesis_quality"
              pass_condition: >
                The hypothesis is specific, falsifiable, and clearly links the
                ranking change to the primary metric.

            - name: "statistical_reasoning"
              pass_condition: >
                The sample size section mentions runtime, minimum detectable
                effect, population, and avoids claiming statistical significance
                before the experiment has run.

            - name: "guardrail_reasoning"
              pass_condition: >
                The guardrail metrics are explained as safety checks, not as
                secondary success metrics.

            - name: "groundedness"
              pass_condition: >
                The document only uses metrics and facts provided in the input
                context. It does not invent additional business metrics,
                thresholds, or experiment results.

      graders:
        - type: "deterministic"
          name: "required_headings_exist"
          checks:
            - "all required_headings are present in the markdown output"

        - type: "deterministic"
          name: "provided_metrics_are_used"
          checks:
            - "primary_metric appears at least once"
            - "each guardrail_metric appears at least once"

        - type: "deterministic"
          name: "no_forbidden_metrics_invented"
          checks:
            - "none of forbidden_invented_metrics appear in the output"

        - type: "llm_rubric"
          name: "experiment_design_quality"
          judge_model: "claude-sonnet"
          rubric_dimensions:
            - "hypothesis_quality"
            - "statistical_reasoning"
            - "guardrail_reasoning"
            - "groundedness"
          scoring:
            scale: "0-3"
            pass_threshold: 2
            require_all_dimensions_to_pass: true

      tracked_metrics:
        - "pass_fail"
        - "llm_rubric_score"
        - "output_tokens"
        - "latency_seconds"
        - "cost_usd"
```

The YAML file does not evaluate anything by itself. In practice, you would have a small eval harness that reads this file, starts Claude Code with the task and context, asks the A/B test document skill to generate the markdown file, and then runs the graders against the result (more on this in future posts).

The important idea is not the tool that runs the eval. The important idea is that the workflow is no longer judged by "I looked at one output and liked it." It is judged against explicit success criteria that can be run again every time the skill, prompt, model, or context changes.

**What would have happened without this eval?**

Now consider what "the skill produced a document" tells you without these criteria. It tells you the workflow completed and you will probably be able to open the document. But it tells you nothing about whether the reasoning was sound, whether the statistical caveats were correct, or whether the output would embarrass someone in a review meeting. The only way to trust this output without evals is, for you as a human, to invest the time of reading through it.

Therefore, think about evals as your trust gate for what good should look like.

---

## What are the three questions you cannot answer without Claude Code evals?

Now that we have understood why evals are important for LLM workflows, let's look at 3 examples on how evals can become useful beyond the quality gate. These will be around:

- Quality
- Cost
- Detection

Let's look at them individually.

**Did this change make the workflow better, or just different?**

Imagine that you wanted to iterate over a skill after noticing it was missing edge cases. Maybe you rewrote the opening section for clarity. Maybe you changed the output format based on feedback. The next run looks better.

But, does it? Without a set of known inputs and grading criteria, you have no way to know whether the revision improved quality across the range of cases the skill handles, or whether it just happened to produce a better result on the one example you were looking at when you made the change. It might handle the edge cases much better, but it also might have degraded the core needs.

**Can I use a cheaper or faster model?**

The [subagents documentation](https://code.claude.com/docs/en/sub-agents) explicitly mentions routing tasks to faster, cheaper models like Haiku as a cost control mechanism. For workflows that run at volume — processing hundreds of documents per day, reviewing every pull request, summarising meeting notes across a team — the cost difference between Haiku and Sonnet is material. Could Haiku handle the summarisation step? Could it classify tickets well enough? Does Sonnet need to touch every part of the workflow, or only the steps that require complex reasoning?

These are empirical questions, not theoretical ones. The answer depends on the task, the instructions, the error tolerance, and the specific ways each model tends to fail. A visual inspection of a few runs will not tell you. Evals let you characterise the quality difference and make the decision with evidence.

In a previous post, I covered "thinking levels" introduced by Anthropic. There was a really cool chart showing how Sonnet 5 was way cheaper than Sonnet 4.6 on cost/task completion at the same level of accuracy.

Can you guess what Anthropic uses to make these claims? Evals. So, if they use it, why are you not?

Without evals, model routing is guesswork.

**Is this failure new, or have we seen it before?**

A workflow fails today. Something in the output is wrong. The immediate question is: was it always doing this, or did something change? Was it the model? Did a recent CLAUDE.md edit introduce a conflict? Did the tool permissions change? Did the upstream data format shift?

Without a regression suite — evals that run on a defined set of cases and report pass or fail — there is no history to consult. You cannot know when the failure was introduced. You cannot verify that your fix actually fixed it rather than just masking it on the one case you tested.

---

## Why are evals a thinking problem before they are an infrastructure problem?

The most common reason teams do not build evals is that they imagine the infrastructure first and get scared.

*"Oh no, we are going to have to build a harness, a test runner, a grading function, YAML configs, an LLM-as-judge prompt, a dashboard…"*

The picture is not wrong. But starting with the infrastructure is the wrong starting point, and it is why evals feel heavier than they are.

The first question is not "which framework should I use?"

It is: *what does a correct run look like?*

Go back to the experiment design document example. A correct run is not "a document was created." A correct run is one where the document contains the right reasoning, the right structure, the right statistical caveats, and avoids dangerous nonsense that a statistician would flag in a review meeting.

I am not going to lie to you: defining that takes thinking and it takes time.

The eval is just the artefact that captures your success criteria. If you have not defined success, no framework will save you.

Buying a test harness before defining correctness is like buying a very expensive measuring tape and refusing to decide what length means.

For the experiment design document skill, writing the eval does not require any framework. It requires three things:

- **Input:** a realistic experiment brief — a product team, a proposed change, a metric they care about
- **Success criteria:** the section headings exist, no invented metrics appear, the statistical caveats are present, the hypothesis is falsifiable
- **Check:** a script that reads the output, confirms the expected structure, and flags violations — plus a model-graded pass for reasoning quality

No YAML. No external service. The difficult part is not the infrastructure. It is sitting down and answering: what does "the skill worked correctly" actually mean?

---

## Now, I want to hear from you!

Think of one Claude Code workflow, skill, or agent that you already trust. Something you have used more than a handful of times and would describe as reliable. Now ask yourself: if a colleague asked you to prove it works — not "it looks good" but measurably, repeatably works — what would you show them?

If the answer is "I would run it and show them the output," that is not proof. That is a demonstration of one run from a distribution you have not characterised.

3 questions to sit with:

1. Which Claude Code workflow do you trust most right now — and have you ever measured it, or are you trusting the story of the good runs?

2. Pick one workflow you already rely on. Write three bullet points describing what a correct run looks like — not what it outputs, but what makes the output correct. That is your eval seed. What would the three bullets say?

3. To make question 2 concrete: here is what the three bullets might look like for a PR-review skill — (1) the review identifies at least one substantive issue, not just style nits; (2) any suggested change includes a reason, not just an instruction; (3) no invented bugs are cited that are not present in the diff. That is an eval seed. What are the three bullets for the workflow you had in mind?

Share your thoughts, examples, or counterpoints in the comments. I would love to read your opinions 👇

---

## Further reading

If you are interested in more content, here is an article capturing it and organising it all by topics!

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
- [Harness Engineering for Agentic AI Coding Tools — arXiv:2602.14690](https://arxiv.org/abs/2602.14690) — systematic study of configuration in five agentic AI coding tools, finding Claude Code users employ the broadest configuration range of any tool examined
