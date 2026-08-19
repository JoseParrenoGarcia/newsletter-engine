## Launch Post

> **Why this post:** Engineers, PMs, and technical managers are paying frontier prices by default — not by deliberate choice — and most have never tested whether their tasks actually require it.

🗞️ New post is live! The 7-Month Gap That Doesn't Matter

Open source models are behind frontier ones. That is the correct answer. It is also the wrong question.
The benchmark lag is real. For most of what you build, it doesn't matter.

What's inside:
🔹 A 3-tier task taxonomy for matching model to reasoning demand — so you know where frontier intelligence is justified and where it's waste
🔹 The cost math: $250k vs $2,800/year at 10M output tokens/month — same task, different provider
🔹 Why vendor dependency is the second cost no one is calculating — and how to start building optionality before you're forced to

💬 How many of your production AI tasks have you actually tested against an open source alternative — or is the frontier default an assumption you've never challenged?
👇 [link]

---

## Deep-dive 1: A task taxonomy for model selection

> **Why this section:** The 3-tier framework is the most extractable, standalone idea in the post — it gives practitioners an immediate decision tool that works without reading anything else.

The question that matters in AI isn't which model is best. It's what reasoning demand your specific task actually requires.

Let's break it down:
🔹 Low reasoning demand (summarisation, classification, extraction, ticket routing) → open source models match frontier quality on these tasks. The MMLU-Pro gap between leading US and open-weight models is 1.2 points — a difference that rarely shows up in human review.
👉 Most production AI volume sits here, and teams are paying frontier prices for it by default — not because the task requires it.

🔹 Medium reasoning demand (multi-step instructions, complex document synthesis, multi-turn context) → open source is competitive. Gaps appear on edge cases and unusual inputs, not in bulk.
👉 You cannot know where your specific task sits by reading a benchmark. You need your own eval, on your own data. There is no shortcut.

🔹 High reasoning demand (autonomous agents, adversarial tasks, novel multi-step reasoning chains) → frontier models hold a real, task-relevant advantage worth paying for.
👉 The system-level implication: route by tier, not by default. The expensive tier is real — it's just smaller than most stacks treat it.

Most production AI spend is concentrated in the first two tiers. The third tier exists and matters. The mistake is treating everything as if it belongs there.

💬 When you chose your current AI model for a production task, did you classify it by reasoning demand — or pick the most capable option and move on?
👇 [link]

---

## Deep-dive 2: The real cost of defaulting to frontier models

> **Why this section:** Hard numbers with a 90:1 ratio are immediately shareable — and the vendor dependency angle is an insight most practitioners haven't fully priced in.

At 10 million output tokens per month, Claude Opus 4.7 costs $250,000 per year. DeepSeek V4-Flash costs $2,800.
Same task. Different provider.

Let's break it down:
🔹 The raw pricing ratio: frontier models run at $15–30 per million output tokens; capable open-weight models run at $0.28–3.48 per million. The ratio is 4:1 at the conservative end and 90:1 at the top.
👉 For tasks where both models produce acceptable output, the gap isn't a performance tradeoff. It's a pricing premium with no corresponding quality gain.

🔹 Even the like-for-like comparison is stark: Claude Sonnet 4.6 at $15/MTok versus DeepSeek V4-Pro at $3.48/MTok — a 4:1 ratio before any measurable quality difference on most production tasks.
👉 At any serious volume, the frontier-default strategy is expensive by construction — not by necessity.

🔹 There's a second cost that doesn't appear in the pricing table: every inference call to Anthropic or OpenAI is a dependency you don't control. Pricing restructuring, API outages, policy changes, zero negotiating leverage — these happen to every single-provider strategy eventually.
👉 Diversification is table stakes in every other part of infrastructure. Model routing isn't treated the same way yet. It should be.

The cost math isn't subtle. The question is whether you've run it for your own stack.

💬 Have you ever calculated what your AI inference bill would look like if you routed even 30% of your current volume through an open-weight alternative?
👇 [link]

---

## Deep-dive 3: Chinese Open Source Models: DeepSeek, Qwen, and What They Can Do

> **Why this section:** The Apache 2.0 insight is the most underappreciated point in the entire post — it reframes open-weight models from "cheaper API" to "different class of asset entirely."

A model you can run on your own infrastructure is a qualitatively different kind of asset than a model you access via an API.
Most teams haven't fully priced in what that difference means.

Let's break it down:
🔹 DeepSeek V4-Pro: 1M context window, $0.87/MTok output (currently discounted 75%), competitive on knowledge and reasoning benchmarks. Available via US-based providers like Together AI if direct routing raises concerns.
👉 NIST's evaluation documents real gaps on complex software engineering and cyber tasks — but notes that on knowledge Q&A benchmarks, the difference is "not by a wide margin." The gap is task-dependent, not uniform.

🔹 Qwen3: eight model sizes from 0.6B to 235B parameters, all Apache 2.0. The 0.6B runs on a laptop. The 235B runs on a server.
👉 Apache 2.0 is not a minor licensing detail. It means embedding in products without per-token fees, fine-tuning on proprietary data without that data leaving your infrastructure, and deploying in environments with no outbound internet. None of those apply to API-gated models.

🔹 The cadence is accelerating. NIST called Kimi K2 Thinking the most capable PRC-based model at its December 2025 release — it was passed within months. The open-weight frontier is not standing still.
👉 Teams building familiarity with these models now are building a compounding advantage. Teams ignoring them are building a compounding blind spot — and the window to learn without pressure is narrowing.

💬 Have you deployed or evaluated any Apache 2.0 open-weight model in production? What changed — or didn't — about how you thought about model dependencies?
👇 [link]
