# Outline: Claude Code Evals Part 3 — The Evaluation Frameworks Landscape

**Target:** ~15 min read (~3,750 words)

---

## Sections

### Preview section — "What will we cover in this post?"
- One bullet per main H2 content section
- Sources: n/a (structural)
- ~100 words

---

### 1. Opening hook (no H2 — body intro)
**Argument:** Anthropic published a precise architecture for how to evaluate AI agents. Every major eval framework — from a GitHub repo with 10k stars to a $50M enterprise platform — independently arrived at the same structure. That convergence is not a coincidence. It means the architecture is right.
**Opening type:** Grounded personal moment → thesis pivot (series-genai style)
**Sources:**
- [Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — conceptual spine
- [Claude Code Overview](https://code.claude.com/docs/en/overview) — Claude Code as an acting system, not a response engine
**Word target:** ~250 words

---

### 2. Why do mistakes compound in agentic workflows?
**Argument:** Single-turn LLM evals check one output against one criterion. Agent evals need to check whether a chain of decisions held together across many steps. An error at step 3 of 10 doesn't fail step 3 — it corrupts steps 4 through 10. This changes what you need to measure.
**Key points:**
- The Anthropic pass@k vs pass^k distinction: if a single step has 90% accuracy, a 10-step workflow has 35% end-to-end reliability
- Claude Code is an acting system — it reads files, runs code, writes to disk, spawns subagents — so eval scope must cover multi-turn trajectories, not single outputs
**Sources:**
- [Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — compounding mistakes, pass@k and pass^k metrics
- [Dive into Claude Code](https://arxiv.org/abs/2604.14228) — arXiv:2604.14228, Claude Code as acting system
- [Harness Engineering for Agentic AI Coding Tools](https://arxiv.org/abs/2602.14690) — arXiv:2602.14690, harness configuration mechanisms
**Word target:** ~350 words

---

### 3. What are the five modules every eval framework shares?
**Argument:** Anthropic named five modules in their engineering post. OpenAI Evals, DeepEval, Microsoft's eval-guide, Arize Phoenix all use different names, but map exactly onto the same five things. The vocabulary is vendor-specific. The architecture is not.

**The five modules:**

| Module | Anthropic name | OpenAI Evals | DeepEval | Microsoft eval-guide | Arize Phoenix |
|--------|---------------|--------------|----------|---------------------|--------------|
| Task bank | Task bank | YAML registry | EvaluationDataset / LLMTestCase | Test suite / test data strategies | Dataset |
| Runner | Eval harness | Completion Function Protocol | evaluate() / evals_iterator() | Run stage | Eval runner |
| Graders | Grader | Template grader / Model-graded grader | Metric / GEval | Metric catalogue | Evaluator |
| Trace/transcript | Transcript | — | @observe | — | OTel/OpenInference span |
| Baseline comparison | Regression suite | — | Benchmark comparisons | Baseline stage | — |

**Note on "continuous loop":** Anthropic adds a 6th concept — the continuous loop that graduates capability evals into regression suites as the agent evolves. Not all frameworks name this explicitly, but all support it. Skill-creator makes it explicit.
**Sources:**
- [Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — canonical five module names
- [OpenAI Evals](https://github.com/openai/evals) — YAML registry + Completion Function Protocol
- [DeepEval](https://deepeval.com/docs/getting-started) — LLMTestCase, evaluate(), GEval, @observe
- [Microsoft Eval Guide](https://github.com/microsoft/eval-guide) — five operational stages, test data strategies
- [Arize Phoenix](https://arize.com/docs/phoenix) — OTel/OpenInference architecture
**Word target:** ~700 words (including table)

---

### 4. Why does the order of your graders matter?
**Argument:** Most teams default to LLM-as-judge first because it feels powerful and flexible. This is backwards. Deterministic graders are cheaper, faster, and unambiguous. The order — deterministic → programmatic → LLM-as-judge → human — is not a fallback chain, it's a cost and precision hierarchy. You escalate only when the lower tier genuinely can't answer the question.

**Key points:**
- Deterministic: exact match, regex, JSON schema validation — zero token cost, no hallucination risk. Use for anything binary.
- Programmatic: code execution checks (does the generated code run? does it produce the right answer?) — still deterministic, but requires execution
- LLM-as-judge: the right tool for qualities that resist deterministic checking (tone, reasoning quality, instruction adherence). Use GEval (criteria string) or a rubric prompt. But it costs money and can be inconsistent across runs.
- Human: ground truth, but expensive and slow. Use to calibrate and validate LLM-as-judge, not as the primary grader.
- DeepEval's default-to-LLM-as-judge approach is the canonical wrong order — powerful but expensive by default for things that could be checked deterministically
**Sources:**
- [Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — three-tier grader hierarchy
- [DeepEval](https://deepeval.com/docs/getting-started) — LLM-as-judge as default via GEval, Metric architecture
**Word target:** ~600 words

---

### 5. How does skill-creator implement these five modules?
**Argument:** Skill-creator is Anthropic's own Claude Code-native eval framework. It doesn't introduce new eval concepts — it instantiates the five modules cleanly. Looking at how it does so makes the architecture tangible. Part 4 dissects it in full; here I just want to show how each module maps.

**Module mapping for skill-creator:**
- Task bank → `evals.json` (JSON array of task objects: `task_id`, `input`, `expected_output`, `grader_ref`)
- Runner → subagent runner (parallel Claude Code subagents, with/without skill invocation)
- Graders → `grader.md` + assertions hierarchy (deterministic first, LLM-as-judge second)
- Trace/transcript → `timing.json` (total_tokens, duration_ms, per-task breakdowns)
- Baseline comparison → with/without baseline run comparison
- Continuous loop → iteration-N loop (eval → refine description → re-eval)

**What this section does not cover:** running it, interpreting results, the description optimisation loop in detail — that is Part 4.
**Sources:**
- [Extend Claude with Skills](https://code.claude.com/docs/en/skills)
- [Agent SDK — Overview](https://code.claude.com/docs/en/agent-sdk/overview)
- [Agent SDK — How the Agent Loop Works](https://code.claude.com/docs/en/agent-sdk/agent-loop) — ResultMessage fields: num_turns, usage, total_cost_usd, session_id, stop_reason
**Word target:** ~600 words

---

### 6. How does the eval tooling landscape break down?
**Argument:** The industry has sorted itself into three clusters. Each cluster arrived at the five modules from a different starting point. The convergence story is what matters — not which cluster wins.

**Three clusters:**
1. **Code-first open-source:** OpenAI Evals, DeepEval, Promptfoo — start from test code and grow upward toward platforms. Strong task bank and grader primitives. Tracing is bolted on (DeepEval's @observe, not native).
2. **Tracing-first:** Arize Phoenix, LangSmith, Langfuse — start from observability and grow downward toward evaluation. Strong transcript/span module. Evals are triggered from traces.
3. **Enterprise end-to-end:** MS AI Foundry, Galileo, Maxim — start from platform and include all modules out of the box. Strongest baseline comparison and reporting. Highest setup cost.

**Convergence observation:** All three clusters are adding agent evaluation, LLM-as-judge, and continuous loops — the things that started as differentiators are becoming table stakes.
**Sources:**
- [OpenAI Evals](https://github.com/openai/evals)
- [DeepEval](https://deepeval.com/docs/getting-started)
- [Arize Phoenix](https://arize.com/docs/phoenix)
- [Microsoft Eval Guide](https://github.com/microsoft/eval-guide)
**Word target:** ~500 words

---

### 7. Which eval approach should Claude Code teams start with?
**Argument:** Decision tree anchored to where a Claude Code team actually is — not a feature comparison table.

**Decision tree:**
1. **Start:** Do you have a Claude Code skill or workflow you want to evaluate?
   - Yes → use skill-creator first. It runs inside Claude Code, costs nothing to set up, and instantiates all five modules natively.
2. **If you need framework-agnostic tracing across multiple tools:** Arize Phoenix (OTel-based, works with anything).
3. **If you're on LangChain or heavy Python stack:** LangSmith (native integration).
4. **If you're on Azure/enterprise and need audit trail + compliance reporting:** MS AI Foundry.
5. **If hallucination detection is the primary concern:** Galileo.
6. **If you need the fastest open-source setup and you're comfortable writing Python tests:** DeepEval.

**What to skip:** Don't skip to an enterprise platform because it looks comprehensive. The setup cost is real. Start with the simplest thing that answers your question — which is usually a handful of deterministic checks and one LLM-as-judge grader. Skill-creator is that starting point for Claude Code teams.
**Sources:**
- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [Microsoft Eval Guide](https://github.com/microsoft/eval-guide)
- [Arize Phoenix](https://arize.com/docs/phoenix)
**Word target:** ~400 words

---

### Closing thoughts
**Argument:** The five-module architecture is not a framework choice — it's a conceptual model you carry regardless of the tool. Once you see it, you stop being confused by eval framework marketing. You start asking the right questions: what goes in your task bank, how does your runner work, which tier of grader are you using, and what does your baseline comparison look like.
**Forward pointer:** Part 4 goes inside skill-creator — the SKILL.md, the evals.json schema, running it, reading the output. Part 5 applies it to real Claude Code skills.
**Word target:** ~150 words

---

### Now, I want to hear from you
3 targeted questions for Claude Code practitioners. ~100 words.

---

### References
All sources cited in the draft, in the format: [Title](url) — 1-sentence description.
~200 words.

---

## ToC Suggestions

None. The rough ToC from notes.md is structurally sound. No additions or reorderings recommended.
