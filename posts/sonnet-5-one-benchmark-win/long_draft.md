# Sonnet 5 is only good at one thing (beating Sonnet 4.6)

*An article to dissect how much can you trust Anthropic's press release vs the community backlash.*

On the 30th of June, Anthropic released Sonnet 5, and what should have been a launch to get people excited seems to have transformed into quite the opposite. When I read [Anthropic's own release blog](https://www.anthropic.com/news/claude-sonnet-5) say that "Sonnet 5 narrows the gap: its performance is close to that of Opus 4.8, but at lower prices," I thought that at least Anthropic had started to tackle what I believe is the future of LLMs: smaller and cheaper but capable enough models.

But no, the community did not buy Anthropic's release. The amount of backlash I read on Reddit, Substack, and LinkedIn was as if Sonnet 5 was pure garbage. Well, I don't buy that narrative. Now, I also totally disagree with Anthropic's sales pitch putting Sonnet 5 at Opus 4.8 levels.

So, where does this leave us? Is Sonnet 5 a good or a bad model? Or should the question be, is Sonnet 5 a good or a bad model for certain tasks?

That's what I aim to answer in this post. We will cover the actual technical changes implemented in Sonnet 5, dissect Anthropic's launch chart claims, and do a fair comparison against the backlash it received.

## What will we cover in this post?

- **What is Claude Sonnet 5's agentic upgrade?** — what actually changed in the model versus Sonnet 4.6: a new top effort tier, thinking that's now on by default, and the tokenizer swap.
- **What does Anthropic claim about Sonnet 5's benchmark gains?** — the launch chart, the official deltas, and what "most agentic Sonnet" actually means in numbers.
- **Is Sonnet 5 actually cheaper at matched intelligence tiers?** — the one comparison that survives scrutiny: Sonnet 4.6 medium versus Sonnet 5 medium.
- **Where does Sonnet 5 break down?** — the online backlash and the behavioural complaints.
- **Should you trust a launch chart or a viral tweet?** — a short closing thought on what to actually do with all of this.

Let's get started!

## What is Claude Sonnet 5's agentic upgrade?

Sonnet 5's agentic upgrade comes down to three mechanical changes:

1. A new top effort tier
2. Thinking that turns itself on by default
3. A new tokenizer

### What effort levels does Sonnet 5 support that Sonnet 4.6 doesn't?

Let's start with effort levels, because nothing else in this post makes sense without them.

If you are not familiar with what the effort parameter is, then in a summarised way it is a dial for how long the model is allowed to think and act before it has to commit to an answer (more effort means more reasoning tokens, more tool calls, more self-checking passes, and a slower, more expensive response). Low effort is a model trying to get it right on the first attempt. Max effort is a model given permission to inspect, act, test, and revise as many times as it judges useful. If you are interested in knowing more about thinking levels, check my [detailed post about it](https://www.senior-ds-lead.com/p/you-dont-need-thinking-levels-in).

Sonnet 4.6 already had this dial — low, medium, high, and max — so the concept isn't new. What's new is a level Sonnet 4.6 never had at all: xhigh, sitting between high and max, built specifically for long-horizon coding and agentic work that runs for extended stretches. [Anthropic's own effort documentation](https://platform.claude.com/docs/en/build-with-claude/effort) lists xhigh as available on Sonnet 5 but not on Sonnet 4.6 (so it's a genuine new tier).

So, a small extra effort level we can play with in Sonnet 5 to tune our workflows.

### What is adaptive thinking in Sonnet 5?

I think this is a genuine flip. On Sonnet 4.6, a request with no thinking field simply ran without thinking — you literally had to opt in. On Sonnet 5, that same request now thinks by default; you have to explicitly pass `thinking: {type: "disabled"}` to turn it off. Manual extended thinking, where you handed the model a fixed `budget_tokens` and it thought exactly that much, is gone entirely on Sonnet 5 — it still worked (deprecated but functional) on Sonnet 4.6, and now returns an error. The model decides how much to think for itself; you no longer get to hand it a number.

Some people might see this loss of control as something not great, but if we do believe that agents will get smarter in the future, then routing thinking effort should be an LLM problem to handle for most tasks.

### What does it mean for Sonnet 5 to have a new tokenizer?

Sonnet 5 uses a new tokenizer that maps the same text to more tokens than before — Anthropic's own estimate is a range of roughly 1.0 to 1.35 times, with about 30% as a useful planning figure. [Simon Willison ran his own token-counter tests](https://simonwillison.net/2026/Jun/30/claude-sonnet-5/) and got sharper numbers: about 1.4x more tokens for English text, 1.33x for Spanish, 1.28x for Python code, and almost no change for Simplified Mandarin.

*[Chart reference: screenshot from Simon Willison's blog post showing tokenizer comparison — not reproduced here, see the linked source above.]*

At face value, it seems this is worse when comparing Sonnet 4.6 vs Sonnet 5. If we just look at token counts, knowing that the pricing between both versions is the same, then a request just got roughly 40% more expensive.

The tokenizer change also eats into the advertised context window. Sonnet 5's nominal context is still 1 million tokens, same as Sonnet 4.6. But if identical source text now consumes roughly 1.3x as many tokens, then a document that used to fill 769,000 old-token-equivalents of that same 1-million-token window now fills the whole thing. The window is the same size on paper. The amount of your actual document that fits inside it went down. Again, this seems to be something worse.

These are the main changes as per Anthropic's release. I assume more would exist in the internal model training mechanics, but I focused on the official documentation. Now, none of this means much unless we look at the benchmark metrics.

## What does Anthropic claim about Sonnet 5's benchmark gains?

Anthropic positions Sonnet 5 as its most agentic Sonnet, built for advanced coding, long-running agents, and professional work.

### Do Sonnet 5 scores look strong against Sonnet 4.6?

Yes, they do look genuinely strong. Check the launch chart below.

*[Chart reference: Anthropic's launch chart — not reproduced here.]*

On Anthropic's own system-card evaluation:

- Sonnet 5 rises from 58.1% to 63.2% on SWE-bench Pro — a test of fixing real, harder-than-usual GitHub issues across multiple files.
- It rises from 67.0% to 80.4% on Terminal-Bench 2.1, a command-line execution benchmark.
- FrontierCode, which grades real pull-request implementation against held-out tests, jumps from 15.1% to 38.8% — more than double.
- AutomationBench, an enterprise workflow-automation test, goes from 5.3% to 13.5%, also more than double in relative terms even though the absolute numbers stay low.

Those four are worth highlighting because they share a pattern: agentic tasks that reward a model for persisting, checking its own work, and reaching a working end state rather than answering correctly on the first pass. That's consistent with everything the mechanics section just established (more effort, more turns, more self-verification).

### Can we trust Sonnet 5 benchmark scores against Sonnet 4.6?

**A caveat before trusting these numbers at face value.**

Anthropic's own methodology appendix discloses that the Terminal-Bench 2.1 comparison ran Sonnet 5 at xhigh effort against Sonnet 4.6 at high effort. Which means the comparison is not the same tier.

Given that Sonnet 5 medium is disclosed as comparable to Sonnet 4.6 high, and xhigh is a tier Sonnet 4.6 never had access to at all, Anthropic's single biggest headline gain on this chart is built on an effort-level mismatch, not a fair fight between two models running at the same setting.

The appendix also doesn't state the effort settings used for Sonnet 4.6 on the other headline benchmarks at all, but it's reasonable to assume the same pattern may hold there too. Likewise, the effort level for Opus 4.8 isn't mentioned either, but I highly doubt it's on xhigh, given how small the differences are compared to Sonnet 5.

What the chart doesn't tell you at a glance is what any of those gains cost per task, or whether the effort level that produced 80.4% on Terminal-Bench is the effort level you'd actually run in production. Those are the two questions that determine whether "most agentic Sonnet" translates into "the model you should be paying for." The first place to check is the one comparison built specifically to answer it.

## Is Sonnet 5 actually cheaper at matched intelligence tiers?

### Sonnet 5 is better than 4.6 by a substantial amount (on Anthropic benchmarks)

We already saw the benchmarks of Sonnet 5 at xhigh vs Sonnet 4.6 at high above. Let's look at the high-only numbers though. This will make the comparison fairer.

What you can see is the following:

- Pass rates of Sonnet 5 bump to 80% vs Sonnet 4.6, which is around 75%.
- And it does so at a lower cost per task — around $7 vs $25.

*[Chart reference: Anthropic's high-effort-only comparison — not reproduced here.]*

### Independent benchmarks contradict that Sonnet 5 is cheaper than Sonnet 4.6

[Artificial Analysis found](https://artificialanalysis.ai/articles/claude-sonnet-5-agentic-cost) that Sonnet 5 costs $2.29 per task on their Intelligence Index, which is roughly 2x the price of Sonnet 4.6.

*[Chart reference: Artificial Analysis cost-per-task comparison — not reproduced here.]*

It is true that [Artificial Analysis](https://artificialanalysis.ai/models/claude-sonnet-5) is comparing max thinking levels, where Sonnet 5 used roughly 40% more output tokens and around three times as many agentic turns as Sonnet 4.6 based on their benchmarks. This contradicts the cost-per-task chart from Anthropic, because at max levels, Anthropic claims that Sonnet 5 is cheaper than Sonnet 4.6.

So, who do you trust? Probably only your own benchmarks. I guess I sit in the middle. I rarely use max levels and try to run well-spec'd tasks with medium. Therefore, I am fairly confident that Sonnet 5 will be better than Sonnet 4.6 given the price difference reported by Anthropic, but I wouldn't take the cost savings per task at face value.

### Sonnet 5 is more precise at catching bugs than Sonnet 4.6

[CodeRabbit's benchmarks](https://www.coderabbit.ai/blog/claude-sonnet-5-review) show that Sonnet 5 is better as a coding assistant. It does catch fewer bugs than 4.6, but it is more precise. It also adds less noise to PR comments.

As they put it: "In plain terms: switch now if you write or ship real software and want a model that tests its own work and sticks with a hard problem until it's solved. Run it at medium effort and you get most of the upside without the top-tier price."

### Sonnet 5 does get close to Opus 4.8

On max settings, it is definitely close. Both Anthropic's and Artificial Analysis's charts show a really narrow gap in cost per task and in pass rates (or intelligence indexes).

The only thing I would highlight again is that max settings tend to be pretty expensive regardless of the model. So, if we look at other settings, you can see how, despite a cheaper price per million tokens for Sonnet 5, Opus 4.8 matches its cost and intelligence at a low level. But at equal high settings, Sonnet 5 does a decent job.

However, the claim must be repeated: it gets close, but the cost per task is pretty much the same, really. So don't blindly take the banner news without checking what really matters — the money you're spending for what you're getting back.

## Where does Sonnet 5 break down?

When I looked at the numbers above, I was surprised by the amount of backlash the model had. But the fact is, the users are the real test. You can measure everything on benchmarks, but benchmarks can be "gamed" or "overfitted." Also, benchmarks don't fully capture the whole user base's needs.

And, unfortunately for Anthropic, the community did not like it. I recommend [Katie Parrott's blog post](#) on this same topic, and would like to highlight comments from X that she shares in it.

It is clear that Anthropic probably got it very wrong putting Sonnet 5 up as a comparison to Opus 4.8. In my opinion, had they simply made the Sonnet 4.6 comparison, the community take would have been more favourable.

One thing is saying "hey, for the same accuracy, I get a much cheaper cost per task." A very different one is saying that Sonnet 5 max is similar to Opus 4.8 max — because then the community tries it, and it goes badly.

[Bleep.co](#) also talks about how users feel that new safety guardrails are hurting Sonnet 5 relative to previous versions: "Longtime Sonnet users piled on too. Some said older versions, especially Sonnet 4.6, felt faster, smarter, or less censored on everyday prompts. Others complained about higher refusal rates, slower perceived speed, and what they called AI shrinkflation — the sense that each new release delivers less real improvement than the one before."

## Should you trust a launch chart or a viral tweet?

Neither, on its own.

On one side, a launch chart tells you what a vendor's benchmark suite showed at the effort level that produced the biggest number.

On the other, a viral tweet tells you what one person's workload felt like at whatever effort level they happened to be running, usually without saying which one.

Both are real data points, but neither is a substitute for measuring your own workload at your own effort level.

Run the same test on your own tasks, and make it a real procedure rather than a vibe check. Pick 15-20 representative tasks from your actual workload — not a benchmark suite, your workload.

These could be coding tasks or writing tasks. Some can be measured with accuracy numbers; others you can measure with a "liked" or "didn't like." If Sonnet 5 at the matched tier beats your current cost-per-success by a meaningful margin, that's your switch signal. If you have to jump to high effort or above to see a real accuracy gain, price that jump in cost-per-success terms before assuming it's worth it — this post's own evidence says it usually isn't.

The answer might agree with the launch chart. It might agree with the backlash. It will almost certainly disagree with both a little, because your workload isn't Anthropic's benchmark suite, and it isn't a stranger's tweet either.

## Now, I want to hear from you

I'm genuinely curious about your opinions if you are a heavy Claude user and have tried Sonnet 5.

- Which effort level are you actually running in production — and have you checked whether it's the one your cost comparisons assumed?
- Have you measured cost-per-successful-task on your own workload, or only cost-per-attempt?
- Where have you caught a benchmark claim, positive or negative, quietly comparing two different effort levels or model tiers?

Drop a comment or reply — I read everything.

## References

[Introducing Claude Sonnet 5 (Anthropic)](https://www.anthropic.com/news/claude-sonnet-5) — Anthropic's own launch announcement, source of the "narrows the gap... close to that of Opus 4.8" framing quoted in the opening.

[What's new in Claude Sonnet 5 (Simon Willison's Weblog)](https://simonwillison.net/2026/Jun/30/claude-sonnet-5/) — independent verification of the tokenizer change and confirmation that manual sampling controls were removed.

[Effort (Claude API docs)](https://platform.claude.com/docs/en/build-with-claude/effort) — Anthropic's official documentation on effort levels, source of the confirmed "Sonnet 5 medium is comparable to Sonnet 4.6 at high effort" mapping and the xhigh-tier availability.

[Claude Sonnet 5: strong agentic performance at a higher cost per task (Artificial Analysis)](https://artificialanalysis.ai/articles/claude-sonnet-5-agentic-cost) — the live, independent source for the $2.29-per-task figure and the token/turn consumption behind it.

[Claude Sonnet 5 model page and comparison data (Artificial Analysis)](https://artificialanalysis.ai/models/claude-sonnet-5) — live pricing and Intelligence Index confirmation for Sonnet 5.

[Claude Sonnet 5 review: Should you switch? (CodeRabbit)](https://www.coderabbit.ai/blog/claude-sonnet-5-review) — independent practitioner data on the construction-versus-review precision/recall tradeoff.

Katie Parrott's blog post — "Vibe Check: Sonnet 5—A Model Pitched for Everyone Impresses No One." **URL needed** — not provided in the source draft.

Bleep.co — "Claude Sonnet 5 called a useless flop by fans despite near-Opus benchmarks." **URL needed** — not provided in the source draft.
