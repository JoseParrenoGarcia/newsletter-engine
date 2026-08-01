# Claude Code Evals Part 3: The AI eval frameworks landscape

*Part 3 of the Claude Code Evals series. [Part 1](../claude-code-evals-part-1-why-it-worked-once-is-not-evidence/long_draft_v1_reviewed.md) covered why you need evals. [Part 2](../claude-code-evals-part-2-what-you-actually-need-to-test/long_draft_final.md) covered what to test.*

---

I was looking at LangSmith's evaluation dashboard last year, trying to figure out what to configure first, and found myself thinking: this looks exactly like that other thing. The exact same structure as the OpenAI Evals README I'd read two weeks earlier. The same structure as the Microsoft eval-guide I'd skimmed the week before that. Same structure as DeepEval's getting started docs.

Task bank. Runner. Grader. Transcript. Baseline comparison.

Five things, every time. Different names, same five things.

I went and read Anthropic's engineering post on evaluating AI agents. They named the same five modules. Their post was written before most of those frameworks released their current architecture. The frameworks hadn't copied Anthropic — they'd all independently arrived at the same place.

That convergence is the point of this post. The AI eval framework space looks fragmented from the outside: a dozen frameworks, three clusters of platforms, competing paradigms, different price points. But the underlying architecture is shared. If you understand the five modules, you can work with any tool, pick the right one for your context, and stop being confused by framework marketing.

The Anthropic architecture is the right place to start — not because Anthropic makes Claude Code, but because the [Anthropic engineering post on demystifying evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) defines the modules most precisely. We'll use it as the spine. Then we'll look at how every other framework maps onto it.

---

## What will we cover in this post?

- **Why do mistakes compound in agentic workflows?** — single-turn evals check one output; agent evals need to check whether a chain of decisions held together. The math of compounding reliability changes what you need to measure.
- **What are the five modules every AI eval framework shares?** — the conceptual DNA that Anthropic named and the entire industry independently rediscovered. A cross-framework mapping table included.
- **Why does the order of your graders matter?** — most teams reach for LLM-as-judge first. This is the expensive, slow, ambiguous choice. The right order is deterministic → programmatic → LLM-as-judge → human, and it matters.
- **How does skill-creator implement these five modules?** — Anthropic's Claude Code-native eval framework, showing how each module maps. Light-to-medium depth; Part 4 goes inside it fully.
- **How does the AI eval framework landscape break down?** — three clusters (code-first open-source, tracing-first, enterprise end-to-end), what each cluster gets right, and where they started from.
- **Which eval approach should Claude Code teams start with?** — a decision tree anchored to where your team actually is, not a feature comparison table.

---

## Why do mistakes compound in agentic workflows?

Claude Code is not a response engine. It reads files, writes code, runs shell commands, calls tools, and spawns subagents that do the same. A single task might involve 30 tool calls across 10 turns. Each of those calls is a decision point. Each decision depends on the ones before it.

This is why evaluating Claude Code is different from evaluating a chatbot.

With a single-turn LLM, you check one output against one criterion. Was the sentiment correctly classified? Did the summary preserve the key facts? These are isolated judgements. A wrong answer on question 5 doesn't corrupt question 6.

In an agentic workflow, a wrong answer on step 5 does corrupt step 6 — because the agent is reading its own previous output and building on it. An incorrect file path in the second tool call means every subsequent read is looking in the wrong place. A misunderstood instruction in the planning step means the entire execution plan is built on a wrong premise.

The Anthropic engineering post on [demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) names this precisely. It introduces two reliability metrics:

- **pass@k** — at least one of k attempts succeeds. Useful for measuring whether a capability exists at all.
- **pass^k** — all k attempts must succeed. Useful for measuring whether a workflow is reliable enough to trust.

The difference matters more than it sounds. If a single step in your workflow has 90% accuracy — which sounds good — a 10-step workflow where every step needs to succeed has 0.9^10 = 35% end-to-end reliability. A Claude Code skill that works 9 times out of 10 in isolation might work only 1 in 3 times as part of a larger pipeline.

That's the problem agent evals exist to catch. You're not measuring whether one step produces good output. You're measuring whether the chain holds.

The research literature confirms this framing. A study of harness engineering across five agentic AI coding tools ([arXiv:2602.14690](https://arxiv.org/abs/2602.14690)) found that the evaluation configurations that matter most are the ones that capture multi-turn trajectory — what happened across the whole session, not just what the final output looked like. Single-output checks miss compounding failures entirely.

This has a direct implication for how you build your eval suite. Your task bank needs realistic multi-step inputs, not one-shot prompts. Your runner needs to capture the full agent trajectory, not just the final response. Your grader needs to check intermediate state — did the agent write to the right file? — not just whether the final answer looks reasonable.

Those three things — task bank, runner, grader — are three of the five modules every eval framework shares. The question is: what are the other two, and what do they all look like in practice?

---

## What are the five modules every AI eval framework shares?

Every AI eval framework shares the same five modules: task bank, runner, graders, transcript, and baseline comparison. I want to lay them out precisely, then show how every other framework maps onto them — because the mapping is the point.

**Module 1 — Task bank.** A collection of test inputs with associated grading criteria. Each entry is the same shape: an input, a grading criterion, and a check. The simplest possible task bank is a spreadsheet with three columns. The most sophisticated is a versioned registry with metadata tags, difficulty ratings, and links to known failure modes. Either way, it's the same thing: a list of "if you give the agent this, here is how we judge the result."

**Module 2 — Runner (eval harness).** The component that executes the tasks in the bank — running the agent against each input and collecting outputs. For multi-step agents, the runner also captures the intermediate trajectory: every tool call, every intermediate response, the full turn-by-turn log. Without the trajectory, you can only evaluate final outputs, which misses compounding errors.

**Module 3 — Grader.** The component that checks outputs against the criteria. This is the module most teams get wrong — I'll give it its own section next. For now: graders exist on a hierarchy, from deterministic checks (cheapest, most reliable) to LLM-as-judge (more flexible, more expensive) to human review (most reliable, slowest, most expensive).

**Module 4 — Transcript/trace.** A durable record of what the agent did — the full session log including tool calls, intermediate outputs, token counts, latency, and cost. This is not the same as the runner output. The runner captures what happened during eval. The transcript module stores it, makes it queryable, and connects it to the grader output so you can answer: "For the tasks where the grader gave a failing score, what did the agent actually do?"

**Module 5 — Baseline comparison.** Running the eval suite against two versions of the agent (or two configurations) and comparing the results. This is how capability evals graduate into regression suites. Without a baseline, you know whether your agent passes today. With a baseline, you know whether it's getting better or worse.

There's a sixth concept worth naming: the **continuous loop**. This is what happens when you automate the cycle: run evals → identify failing tasks → refine the agent or its configuration → run evals again. Anthropic treats this as a separate stage. Not all frameworks name it explicitly, but all support it. Skill-creator makes it concrete.

Now here's the cross-framework mapping. Every major eval tool I looked at for this post implements these five modules. The names differ. The architecture doesn't.

| Module | Anthropic | OpenAI Evals | DeepEval | Microsoft eval-guide | Arize Phoenix |
|---|---|---|---|---|---|
| Task bank | Task bank | YAML registry | EvaluationDataset / LLMTestCase | Test suite + test data strategies | Dataset |
| Runner | Eval harness | Completion Function Protocol | evaluate() / evals_iterator() | Run stage | Eval runner |
| Graders | Grader | Template grader / Model-graded grader | Metric / GEval | Metric catalogue | Evaluator |
| Trace/transcript | Transcript | — | @observe | — | OTel/OpenInference span |
| Baseline comparison | Regression suite | — | Benchmark comparisons | Baseline stage | — |

A few observations on the table:

[OpenAI Evals](https://github.com/openai/evals) makes the task bank and runner structure the most explicit. Eval definitions live in YAML files in a registry. The Completion Function Protocol defines how the runner invokes the agent and collects its output. This architecture is unusually clean for debugging: you can read the YAML and understand exactly what is being tested and how.

[DeepEval](https://deepeval.com/docs/getting-started) inverts the hierarchy — it starts from the grader (the Metric and GEval primitives) and builds up to the test bank (EvaluationDataset). Its `@observe` decorator adds tracing, but as a bolt-on to a framework that started as a grader library. The task bank and runner are fully featured, but the tracing feels secondary.

[Microsoft's eval-guide](https://github.com/microsoft/eval-guide) adds something none of the others name explicitly: a triage distinction between evaluation scopes (prompt-level, RAG-level, agentic-level) with risk tier classification for each. Their five operational stages — Discover → Plan → Generate & Baseline → Run → Interpret & Improve — map onto the five modules, but with explicit guidance on what you should be doing at each stage.

[Arize Phoenix](https://arize.com/docs/phoenix) is the strongest on trace. Its architecture is built on OpenTelemetry (OTLP) with OpenInference semantic conventions — meaning spans are instrument-agnostic and queryable across frameworks. The eval runner and graders are built on top of that tracing layer, which is the reverse of how DeepEval approached it.

The differences are real and they matter for which tool you pick. But the convergence is more important: every team that built an eval framework for AI agents, working independently, produced the same five modules. That's not a coincidence. It's evidence that the architecture is correct.

---

## Why does the order of your graders matter?

Most teams I talk to reach for LLM-as-judge first. They set up a GEval metric with a rubric string, or they wire in GPT-4o as a grader, and they start running evals. This feels like the right call — the output of an AI agent is often natural language or reasoning, which seems hard to check programmatically. LLM-as-judge feels like the natural match.

It's the expensive, slow, and inconsistent choice when used too early.

The right order is:

**1. Deterministic first.** Exact match, regex, JSON schema validation, key presence checks. If you're grading whether an agent wrote the correct file, check whether the file exists. If you're grading whether it produced valid JSON, parse the JSON. These checks cost zero tokens, run in milliseconds, and have no ambiguity. They either pass or they fail. Use them for everything they can answer.

**2. Programmatic second.** Code execution checks — did the generated code actually run? Did it produce the correct output when run against a test input? Did the file it wrote contain the expected function signature? These are still deterministic (no randomness, no LLM), but they require execution rather than text matching. They're cheap and reliable. Use them whenever the grading criterion is checkable by running something.

**3. LLM-as-judge third.** Use this tier only for qualities that genuinely resist deterministic or programmatic checking: tone, reasoning quality, instruction adherence, coherence across a long response, whether a plan addresses the right problem. GEval (DeepEval's criteria-string approach) and Claude as grader are both valid here. But budget for the cost: each graded output incurs a full inference call. And account for inconsistency: LLM graders can disagree with themselves across runs, which means your eval scores carry noise.

**4. Human fourth.** Ground truth. You use human review to calibrate and validate your LLM-as-judge grader — does the LLM grader agree with a human reviewer at a high enough rate to trust it? You also use it to review your failure cases: when the automated grader gives a failing score, is it failing for the right reason? Human review is expensive and slow, which is why it sits at the top of the hierarchy rather than the bottom. It's the highest-quality signal, used sparingly.

The [Anthropic engineering post](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) defines this hierarchy explicitly. [DeepEval's architecture](https://deepeval.com/docs/getting-started) is a useful counter-illustration: it defaults to LLM-as-judge for nearly all metrics, because that's what its GEval primitive supports. The framework is powerful, but if you use it naively, you'll reach for LLM-as-judge on every criterion — including ones a regex or a JSON schema check would handle better, faster, and cheaper.

The practical implication: before you wire in an LLM grader, ask whether there's a programmatic check that would answer the same question. Most of the time, there is — at least partially. A good eval suite uses deterministic checks for 60-80% of its grading criteria, and reserves LLM-as-judge for the 20-40% that genuinely needs it.

That design decision — which tier of grader to use for which criterion — is one of the things skill-creator makes explicit. It's worth seeing how it instantiates the full five-module architecture.

---

## How does skill-creator implement these five modules?

Skill-creator is Anthropic's Claude Code-native eval framework. It ships as a [Claude Code skill](https://code.claude.com/docs/en/skills) — a SKILL.md file that defines the procedure for building and running evals for other Claude Code skills. You don't install a library or configure a platform. You invoke the skill from inside Claude Code and it runs the eval suite using Claude Code itself.

I want to show how it instantiates each of the five modules — not in enough depth to replicate it, but enough to make the architecture concrete. Part 4 goes inside it fully.

**Task bank → `evals.json`.** Skill-creator uses a JSON file as its task bank. Each entry has the same shape: a `task_id`, an `input` (the task the agent will be given), an `expected_output` (what a correct result looks like), and a `grader_ref` (which grader configuration to use). The entries in this file define the full scope of what is being evaluated. If a capability isn't in `evals.json`, it isn't being tested.

**Runner → parallel subagent execution.** The runner is a set of Claude Code subagents. Skill-creator spawns one subagent per task in the eval bank. Each subagent runs the target skill (or the raw agent loop without the skill, for baseline comparison) against the task input and returns the full output. The [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) surfaces a `ResultMessage` with `num_turns`, `usage`, `total_cost_usd`, `session_id`, and `stop_reason` — which feeds directly into the trace module.

**Graders → `grader.md` + assertions.** The grader configuration lives in a `grader.md` file that defines the evaluation criteria. The hierarchy mirrors Anthropic's: deterministic assertions run first (key presence, exact match, JSON validation), then LLM-as-judge criteria for qualities that need semantic evaluation. The assertions are explicit code checks; the LLM-as-judge criteria are natural language rubric items. You choose which tier each criterion lives at when you write the grader.

**Trace/transcript → `timing.json`.** Every eval run produces a `timing.json` file that captures per-task metrics: `total_tokens`, `duration_ms`, cost, and which tasks passed or failed. This is your queryable record of what happened. When a task fails, you look at the timing file to see the token spend and duration — and you look at the subagent's raw output to understand why.

**Baseline comparison → with/without baseline runs.** Skill-creator supports running the same eval bank against two configurations: the skill invocation (with skill) and the raw agent loop (without skill). Comparing the two gives you a direct signal of what the skill is actually contributing. If pass rates are similar, the skill isn't adding value. If pass rates diverge, you know what the skill is doing.

**Continuous loop → iteration-N.** Skill-creator makes the iteration loop explicit. After the first eval run, you examine the failing tasks, refine the skill's description or instructions, and run the eval again. Each run is iteration-N. The loop continues until the pass rate is where you want it, or you've identified a class of failures that require a different kind of intervention.

That's the architecture in six module-to-implementation mappings. Nothing here is unique to Claude Code — the five modules are the same ones every other framework implements. What's different is that skill-creator runs *inside* the tool being evaluated, which means no external infrastructure, no API keys to manage, and no translation layer between the eval environment and the production environment.

The industry frameworks approach this from different starting points. Understanding their clusters helps you know when skill-creator is enough and when you need something else.

---

## How does the AI eval framework landscape break down?

The eval framework space looks crowded when you list the names: OpenAI Evals, DeepEval, Promptfoo, LangSmith, Arize Phoenix, Langfuse, Microsoft AI Foundry, Galileo, Maxim. But the space sorts cleanly into three clusters, each of which arrived at the five-module architecture from a different direction.

### Cluster 1 — Code-first open-source

OpenAI Evals, DeepEval, and Promptfoo all start from the same place: a developer writing test code. The task bank is a YAML file or a Python class. The runner is a library call. The grader is a function or a metric.

[OpenAI Evals](https://github.com/openai/evals) is the most opinionated about structure. Eval definitions live in a YAML registry. The Completion Function Protocol defines a standard interface for running any model against any eval — the architecture separates "what is being tested" from "how it is run" more explicitly than any other open-source framework. It was designed for evaluating model capabilities at scale, and the architecture reflects that: reproducible, version-controlled, auditable.

[DeepEval](https://deepeval.com/docs/getting-started) inverts the priority — it starts from the grader. The `LLMTestCase` is the task bank unit, `evaluate()` is the runner, and `Metric` / `GEval` is where most of the framework's design energy went. Its LLM-as-judge primitives are the most accessible in the open-source space — you define a criteria string and GEval handles the rest. The tracing module (`@observe`) was added later and works, but the framework's strength is in the grading layer, not the trace layer.

Promptfoo occupies a similar position: strong at the task bank and grader level, designed for developers who want to run evals from the command line without infrastructure setup.

What this cluster gets right: low barrier to entry. You can run your first eval in a few hours with no external services. What it trades off: the transcript and baseline comparison modules are weaker out of the box, and scaling to hundreds of evals across multiple models requires building your own reporting layer.

### Cluster 2 — Tracing-first

[Arize Phoenix](https://arize.com/docs/phoenix), LangSmith, and Langfuse all start from observability. They instrument the agent — capturing every span, every tool call, every token — and the eval layer sits on top of that trace layer.

Arize Phoenix's architecture is the most principled in this cluster. It's built on OpenTelemetry (OTLP) with OpenInference semantic conventions. This means the trace data it captures is framework-agnostic — if you're running LangChain, LlamaIndex, or a custom agent loop, Phoenix instruments it the same way. You query spans across frameworks. You run evals against spans. The graders and runners are peers on top of the trace layer, not the other way around.

LangSmith starts from LangChain integration, which gives it deep native support if you're on that stack — traces show up automatically, eval datasets can be built directly from production traces, and the feedback loop from trace to eval to refinement is tightly integrated.

What this cluster gets right: the transcript module is first-class. If you need to understand *why* your agent failed — which tool call was wrong, which intermediate output was malformed — the tracing-first tools surface that most clearly. What it trades off: setup complexity is higher, and the task bank and runner modules feel secondary to the observation layer.

### Cluster 3 — Enterprise end-to-end

Microsoft AI Foundry, Galileo, and Maxim all include the full five-module stack out of the box. They target teams that need audit trails, compliance reporting, multi-model comparison, and managed infrastructure.

[Microsoft's eval-guide](https://github.com/microsoft/eval-guide) documents an architecture that goes beyond the five modules: it adds explicit risk tier classification (which capabilities are high-risk vs low-risk to get wrong) and named test data strategies (synthetic generation, human annotation, production sampling). The five operational stages — Discover → Plan → Generate & Baseline → Run → Interpret & Improve — provide a structured process rather than just a technical framework. It's the most process-complete of the three clusters.

What this cluster gets right: the baseline comparison and reporting modules are the strongest. Running evals across multiple model versions, comparing results, and generating stakeholder-facing reports is where these platforms shine. What it trades off: setup cost is real. Getting from zero to first eval result takes longer than in the code-first cluster. For a small team running one Claude Code workflow, it's usually overkill.

### What the convergence means

All three clusters are now adding agent evaluation, LLM-as-judge, and continuous loops. These used to be differentiators. They're becoming table stakes. The tracing-first tools are adding eval primitives. The code-first tools are adding tracing. The enterprise platforms already have both.

The space is converging on the five-module architecture from three directions simultaneously. That convergence is the strongest evidence that the architecture is correct — not as a design choice, but as a description of what evaluation of agentic systems actually requires.

---

## Which eval approach should Claude Code teams start with?

You don't need to benchmark all nine frameworks to pick one. You need to answer one question: what problem are you actually trying to solve right now?

Here's the decision tree I'd use for a Claude Code team.

**Start here: do you have a Claude Code skill or workflow you want to evaluate?**

If yes — start with skill-creator. It runs inside Claude Code, requires no external setup, and instantiates all five modules natively. You write `evals.json`, you define a `grader.md`, and you run the eval from within the same environment where the skill runs in production. That last point matters more than it sounds: there's no translation layer between "how the agent behaves in the eval environment" and "how it behaves when your team actually uses it." They're the same environment.

Skill-creator won't give you a dashboard. It won't give you a comparison UI or compliance reporting. But it will tell you, reliably and cheaply, whether your skill is getting better or worse across iterations. For most Claude Code teams starting their eval practice, that's the right starting point.

**When to reach outside skill-creator:**

- **You need framework-agnostic tracing across multiple tools:** Arize Phoenix. Its OpenTelemetry foundation means it instruments anything — not just Claude Code skills, but LangChain agents, LlamaIndex pipelines, custom Python loops. If you're running a mixed stack, Phoenix gives you a single queryable trace layer across all of it.

- **You're on LangChain and want deep native integration:** LangSmith. Traces show up automatically. Building eval datasets from production traces is a first-class workflow. The feedback loop from observation to evaluation is tighter than with any other tool if you're already on LangChain.

- **You're on Azure and need audit trails or compliance reporting:** Microsoft AI Foundry. The risk tier classification and multi-model comparison are genuinely useful at enterprise scale. The setup cost is justified when the regulatory or reporting requirement is real.

- **Hallucination detection is your primary concern:** Galileo. Hallucination-specific graders are their core product, not an add-on.

- **You want the fastest open-source Python setup outside of skill-creator:** DeepEval. The GEval primitive makes it quick to define LLM-as-judge criteria. Just remember to use deterministic graders for anything you can check programmatically before reaching for GEval.

**What to skip:** Don't jump to an enterprise platform because the feature list looks comprehensive. The setup cost is real, and it doesn't help you if your eval suite is still empty. The right first eval is simple — three to five tasks, deterministic graders, one LLM-as-judge criterion if genuinely needed. Getting that working teaches you more than reading any platform's documentation. Skill-creator is that starting point.

The [Claude Code best practices guide](https://code.claude.com/docs/en/best-practices) and [common workflows](https://code.claude.com/docs/en/common-workflows) both assume you're building with the full Claude Code feature set — [hooks](https://code.claude.com/docs/en/hooks), [subagents](https://code.claude.com/docs/en/sub-agents), [memory](https://code.claude.com/docs/en/memory). Skill-creator fits naturally into that ecosystem. It's the eval framework that assumes you're already working in Claude Code, because it runs there.

---

## Closing thoughts

The five-module architecture — task bank, runner, graders, transcript, baseline comparison — is not a product. It's a description of what evaluation of agentic systems actually requires. The industry arrived there independently from three directions. Anthropic named it most precisely.

I think the practical implication is this: when you're confused by an eval framework's marketing, map it to the five modules. Where is the task bank? How does the runner capture multi-turn trajectories? Which tier of the grader hierarchy does this framework default to? What does the transcript module store and how do you query it? Those questions cut through the feature tables faster than any comparison guide.

The right eval setup for a Claude Code team is almost always simpler than it looks from the outside. Start with a handful of realistic tasks, deterministic graders for anything binary, one LLM-as-judge criterion for the quality that resists programmatic checking, and a baseline comparison between your last version and the current one. That's the five-module architecture at its minimum viable implementation.

Part 4 goes inside skill-creator — the `evals.json` schema, the `grader.md` format, how to run it, and how to read the output. Part 5 applies it to real Claude Code skills: an A/B testing skill, an analytics workflow, a writing pipeline. If this post gave you the map, those two will show you how to navigate it.

*Continues in Part 4: Dissecting skill-creator — Anthropic's Claude Code-native eval framework*

---

## Now, I want to hear from you

The decision tree in this post assumes you're starting from a Claude Code workflow with at least one skill you want to evaluate. But most teams I talk to are earlier than that — they haven't formalised what "correct" output looks like, so they don't have grading criteria yet.

Here's what I'm curious about:

- **Where are you in the eval adoption curve?** Do you have a task bank today, even an informal one? Or are you still at "we run the agent manually and decide if it looks right"?
- **Which tier of the grader hierarchy do you actually use?** If you've shipped an eval suite, what proportion of your graders are deterministic vs LLM-as-judge? I'd be curious whether the 60-80% deterministic proportion holds in practice.
- **What made you reach for an external platform instead of a simpler starting point?** If you're using LangSmith or Arize or Galileo, was it a technical requirement or an organisational one?

Leave a comment — I read all of them and they directly shape what ends up in Part 4 and Part 5.

---

## References

[Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — Anthropic engineering post defining the five-module eval architecture, eval types, compounding mistakes in agentic workflows, and the pass@k vs pass^k reliability metrics.

[Claude Code Overview](https://code.claude.com/docs/en/overview) — Official documentation for Claude Code as an agentic coding tool: reads codebases, writes files, runs commands, integrates with developer tools.

[OpenAI Evals](https://github.com/openai/evals) — Open-source eval framework using a YAML registry task bank and the Completion Function Protocol runner; includes template and model-graded grader tiers.

[DeepEval — Getting Started](https://deepeval.com/docs/getting-started) — Python eval framework with LLMTestCase task bank, evaluate() runner, GEval LLM-as-judge metric, and @observe tracing decorator.

[Microsoft Eval Guide](https://github.com/microsoft/eval-guide) — Microsoft's open-source evaluation guide covering five operational stages, risk tier classification, and named test data strategies for prompt, RAG, and agentic systems.

[Arize Phoenix](https://arize.com/docs/phoenix) — Open-source observability and evaluation platform built on OpenTelemetry and OpenInference semantic conventions; framework-agnostic span-level tracing with an eval runner on top.

[Extend Claude with Skills](https://code.claude.com/docs/en/skills) — Official documentation for Claude Code skills, the SKILL.md-based extension mechanism that skill-creator uses.

[Agent SDK — Overview](https://code.claude.com/docs/en/agent-sdk/overview) — Anthropic's Python and TypeScript library for programmatic control of the Claude Code agent loop.

[Agent SDK — How the Agent Loop Works](https://code.claude.com/docs/en/agent-sdk/agent-loop) — Documents the ResultMessage surface: num_turns, usage, total_cost_usd, session_id, stop_reason.

[Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems](https://arxiv.org/abs/2604.14228) — arXiv:2604.14228. Analysis of Claude Code's TypeScript source code and architecture; authors: Jiacheng Liu et al. (MBZUAI/UCL).

[Harness Engineering for Agentic AI Coding Tools](https://arxiv.org/abs/2602.14690) — arXiv:2602.14690. Catalog of eight configuration mechanisms across five agentic AI coding tools, focusing on multi-turn trajectory capture for evaluation.

[Claude Code Best Practices](https://code.claude.com/docs/en/best-practices) — Official recommended practices for building with Claude Code's full feature set.

[Claude Code Common Workflows](https://code.claude.com/docs/en/common-workflows) — Documented workflow patterns for Claude Code in production settings.

[Claude Code Hooks](https://code.claude.com/docs/en/hooks) — Documentation for Claude Code's hook system, used in the continuous-loop integration pattern.

[Claude Code Sub-Agents](https://code.claude.com/docs/en/sub-agents) — Documentation for Claude Code's subagent model, which skill-creator uses as its runner.

[Claude Code Memory and CLAUDE.md](https://code.claude.com/docs/en/memory) — Documentation for Claude Code's memory system and CLAUDE.md configuration.
