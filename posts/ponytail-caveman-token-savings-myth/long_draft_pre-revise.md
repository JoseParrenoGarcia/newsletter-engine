---
title: Ponytail, Caveman, and the myth of magic token savings
subtitle: Two Claude Code skills everyone raves about, put through independent benchmarks and the actual mechanics of a token bill.
author: Jose Parreño Garcia
published: 2026-08-12
source: https://substack.com/@joseparreogarcia
theme: genai-ai
type: standalone
---

# Ponytail, Caveman, and the myth of magic token savings

I installed Ponytail the way most people install a skill they've seen praised a dozen times on X: I didn't read the mechanism, I read the star count. 92,000-plus stars. Caveman sits at a similar number. Both get discussed in the same breath, in the same threads, under the same label — "token savers" — as if they were interchangeable ways of solving the same problem.

They are not. And the 54% and 65% headline numbers that made both of them famous are not what they look like either.

This post is not a takedown. Both projects encode real, useful ideas, and I'll show you where the evidence supports that. But "token saver" is doing a lot of work to flatten three genuinely different mechanisms into one comparable-sounding percentage, and the assumption sitting underneath all of it — fewer visible tokens means lower total cost — is not a law of how LLMs work. It's a guess that happens to be right sometimes.

## What will we cover in this post?

- **The reputation** — why Ponytail and Caveman get treated as easy wins, and the assumption behind that reputation.
- **How does the token bill actually work?** — the eight channels a coding-agent session spends tokens on, and why a saving in one can quietly reappear in another.
- **Are Ponytail and Caveman actually the same kind of tool?** — three distinct mechanisms, not one category.
- **What do Ponytail and Caveman claim about themselves?** — each project's self-reported headline, and how it was measured.
- **What happens when independent benchmarks retest the same claims?** — the JetBrains numbers, and the one project with no independent check at all.
- **Why can the headline and the independent number both be true?** — this isn't a contradiction, it's a mechanism.
- **What does the broader compression research say?** — two academic papers that back up (and complicate) the pattern.
- **So should you actually use these skills?** — a practical, per-tool verdict.

Let's start with why the reputation formed in the first place.

## The reputation: why these skills get treated as easy wins

Ponytail describes itself as "the lazy senior developer." Before writing any code, the agent is supposed to ask whether the requirement needs to exist at all, whether the codebase already solves it, whether the standard library or platform can do it, and only then write the minimum new code. Caveman's original pitch is simpler still: make the agent talk like a caveman — drop articles, drop filler, drop hedging — and the output gets shorter. Both stories are intuitive enough to spread on their own. Both projects now sit north of 90,000 GitHub stars.

That number is worth pausing on before going anywhere near a benchmark. A [2018 study of what a GitHub star actually signals](https://arxiv.org/abs/1811.07643) found that stars track attention and adoption, not correctness or measured effect size. A star can mean "I use this daily." It can also mean "interesting," "bookmark for later," or "I enjoyed the meme in the README." Ninety-two thousand stars is a strong signal that the *problem* resonates — developers recognise their agents over-building things, and recognise their agents being unnecessarily verbose. It is not ninety-two thousand independent confirmations of a 54% number.

The deeper issue is the assumption riding along with the reputation: that a shorter answer, a shorter diff, or a smaller payload is automatically a cheaper task. That assumption treats a coding-agent session as if it had one bill, denominated in one channel. It doesn't. Before I can tell you whether Ponytail or Caveman earns its reputation, I need to show you what that bill actually looks like — because "fewer tokens" is not one measurement. It's at least eight.

## How does the token bill actually work?

A coding-agent session is not a single prompt followed by a single answer. It's a loop: system instructions, skill text, repository context, tool schemas, tool results, cached history, model reasoning, assistant prose, code edits, sometimes subagents. Each of those lands in a different channel, and each channel is billed — or at least budgeted — differently.

Here are the eight that matter, and how a "saving" in each one can backfire:

- **Fresh input** — a new user message, a new tool result, anything not yet cached. Compress this too aggressively and you can delete a detail the model actually needed; it either guesses or has to retrieve it later.
- **Cache write** — context newly placed into the provider's cache. A transformation that changes the shape of a stable prefix can break cache identity and force a fresh (expensive) write where a cheap cache hit used to happen.
- **Cache read** — replayed history, static instructions, tool schemas. If cache reads dominate a session's invoice, shrinking the output barely moves the total.
- **Reasoning / thinking** — hidden or billed reasoning tokens, depending on the model and provider. A terse or unusual representation of a problem can force the model to reconstruct context internally, which shows up here.
- **Output prose** — explanations, status updates, summaries. This is the one channel Caveman's original skill targets directly. It's easy to measure and, in an agentic coding loop, often a minority of the total spend.
- **Code / patches** — the actual generated files and diffs. This is what Ponytail targets, and it usually can't be shortened arbitrarily without changing what the task actually does.
- **Tool recovery** — follow-up retrieval calls, re-opened files, MCP round-trips. Lossy compression that hides something the model needed can create extra turns, which is more tokens, not fewer.
- **Image / vision tokens** — text rendered as pixels for a vision-capable model. This changes the billing unit entirely rather than making information free.

Two claims that sound identical — "output tokens fell 65%" and "the task cost 65% less" — are talking about completely different things once you see the channel list. A skill can be telling the truth about one and still be misleading about the other.

That's why the right way to judge any of these tools is not "how many tokens did it save." It's a constrained objective: minimise the expected cost of a task, subject to the success rate holding at or near baseline, and to safety failures not increasing. A run that's 40% cheaper but fails 10% more often is not a saving once you count the retries. A shorter patch that passes a narrow test but quietly drops a validation check isn't a saving either — it's a deferred incident.

Cost per successfully completed task, at held quality. That's the unit this whole post is built around, and it's the unit neither headline number is reporting.

With that model in hand, the first thing worth noticing is that Ponytail and Caveman aren't actually solving the same problem — even though the "token saver" label suggests they are.

## Are Ponytail and Caveman actually the same kind of tool?

No. There are three distinct mechanisms here, not two, and they sit on three different channels of the bill I just laid out.

**Ponytail is not compression.** Its [core skill](https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail/SKILL.md) is a decision ladder the agent works through before writing anything: does this need to exist at all? Is it already in the codebase? Does the standard library solve it? Does the native platform solve it? Does an already-installed dependency solve it? Can it be one line? Only then, implement the minimum that works. A date picker is the clean example — a generic coding agent treats "date picker" as a component-building task, while Ponytail reframes it as a platform-capability question and can stop at `<input type="date">`. That's not a shorter representation of the same code. It's a different design decision, made before any code exists. Ponytail's code channel shrinks because less gets built, not because what gets built is compressed.

**Caveman's original skill is output-style compression, and nothing else.** Its [own SKILL.md](https://github.com/JuliusBrussee/caveman/blob/main/skills/caveman/SKILL.md) instructs the model to drop articles, filler, and hedging, use fragments and short synonyms, and skip tool-call narration — while explicitly preserving exact technical terms, code, error strings, and negations. The current [Caveman README](https://github.com/JuliusBrussee/caveman/blob/main/README.md) is unusually candid about the boundary: input and reasoning tokens are untouched, the skill itself adds roughly 1,000–1,500 input tokens of overhead per turn, and an already-terse workload can go net-negative. This is a prose-shortening tool. It was never claiming to touch the code or input channels, whatever the marketing around it implied.

**Caveman Proxy is a separate, more ambitious bet — and it's not really "Caveman" in the sense above.** It sits between the agent and the provider, classifies payloads by content type (JSON, logs, code, diffs, search results, HTML), and applies content-specific compression before anything reaches the model. Crucially, this is lossy compression with a recovery channel: before a transformed payload goes upstream, the original bytes are stored in a local content-addressed store (CCR), and the model can call `caveman_retrieve` if it needs something that got elided. Recoverable doesn't mean lossless on the first pass, though — the model still has to either retain enough to solve the task, or recognise that something's missing and go get it. If a dropped detail is decisive and doesn't look missing, the failure is silent.

Three mechanisms. Three channels. Treating all of them as one "token saver" category — the way the reputation does — is itself part of the myth. It's also why a single number can't summarise any of this, which is exactly the problem with the headlines each project publishes about itself.

## What do Ponytail and Caveman claim about themselves?

Each project has a specific headline, and each headline comes from a specific benchmark worth understanding before comparing it to anything else.

**Ponytail's current claim is a 54% reduction in code.** This number comes from the [18 June 2026 agentic benchmark](https://github.com/DietrichGebert/ponytail/blob/main/benchmarks/results/2026-06-18-agentic.md): twelve feature tickets against a real FastAPI + React repository, run headless on Haiku 4.5, four repetitions, a no-skill baseline, and a separate safety tier. It's worth knowing this wasn't the first version of the benchmark. [Colin Eberhardt at Scott Logic pointed out](https://blog.scottlogic.com/2026/06/16/ponytail-yagni-and-the-problem-with-prompt-benchmarks.html) that the original single-shot benchmark measured a mixture of implementation minimalism and conversational verbosity — the baseline it compared against tended to emit multiple alternatives and explanatory prose, which inflated its line count. On that same benchmark, a plain "follow YAGNI" instruction nearly matched Ponytail's score. The maintainers accepted the critique, rebuilt the benchmark around real agentic sessions, and — in the rebuilt version — even disclosed a contamination bug of their own: an earlier run had Ponytail's SessionStart hook firing in every arm, including the baseline. They found it, fixed the isolation, and published the mistake. That's the kind of disclosure that should make you trust the corrected 54% more, not less, even while treating it as a per-task ceiling rather than an average.

**Caveman's original skill claims a 65% reduction in output tokens.** The [official table](https://github.com/JuliusBrussee/caveman/blob/main/README.md) compares ten prompts against normal verbose replies: an average of 1,214 tokens down to 294, with individual tasks ranging from 22% to 87% reduction. That's a real measurement of response-length reduction on that specific prompt set — it says nothing about end-to-end coding-agent cost, and the README says so itself.

**Caveman Proxy claims a 33.2% reduction in provider-visible input tokens.** This comes from [CaveBench Wrap](https://github.com/JuliusBrussee/caveman/blob/main/docs/WRAP-BENCHMARK.md): six immutable 60–95 KB MCP fixtures, three repetitions per arm, Claude Code 2.1.223 running Sonnet 5, provider-reported usage counters, and an exact semantic JSON oracle for quality. Across 18 direct-versus-Caveman pairs, the wrapped arm used 591,673 input tokens against 885,793 direct — a 33.2% reduction, with all 18 exact-answer checks passing and a case-clustered 95% confidence interval of 14.6% to 48.5%. The benchmark counts recovery calls, includes the skill's own prompt overhead, and explicitly forbids dropping negative or no-op cases from the published results. Those are strong methodological choices, and they matter, because — as you'll see in a moment — the internal spread behind that 33.2% average is doing a lot of the real work.

All three headlines are honestly reported, by benchmarks that improved substantially after early criticism. None of that tells you what happens when someone outside these two repositories runs the same test.

## What happens when independent benchmarks retest the same claims?

JetBrains ran both skills through their own paired-task evaluation suite, SkillsBench, and the gap between headline and independent result is the same shape twice.

**Ponytail on SkillsBench:** [80 paired tasks](https://blog.jetbrains.com/ai/2026/07/ponytail-skill-claude-tested/), Claude Code 2.1.201, Sonnet 5 at medium reasoning, with the treatment ruleset generated from Ponytail's own hook code and every trial audited for contamination. Across the full run: roughly 15% less code, 10.3% lower cost (statistically significant, p=0.004), and 11% lower wall time. Quality showed no detectable difference — 65 of 80 task pairs scored identically, 9 slightly worse, 6 slightly better. That's a null result on quality, not proof of equivalence, and JetBrains is explicit that SkillsBench isn't a security or accessibility suite, so it can't independently confirm Ponytail's "100% safe" claim either. But on cost and code, the independent number is real: about a third of the headline on code, about half on cost.

**Caveman's original skill on SkillsBench:** [82 paired tasks](https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/), with the skill forcibly activated to establish a ceiling. Measured result: 8.5% fewer output tokens. Against a 65% headline, that's roughly a thirteenth as large in relative terms. The reason is compositional, not a flaw in the skill: coding-agent output is dominated by code, diffs, commands, exact error text, and tool interactions — all things Caveman deliberately preserves. Only the narrative layer compresses, and in an agentic loop the narrative layer is a small fraction of what actually gets said. Quality again showed no detectable shift (64 tied, 8 favouring Caveman, 10 favouring baseline; sign-test p=0.82).

**Caveman Proxy has no independent benchmark at all.** I looked for one comparable to the two above and didn't find it. The 33.2% figure rests entirely on the maintainers' own six-fixture CaveBench Wrap suite — well-specified, but narrow: six deterministic large-payload tasks, one model, one harness version, no open-ended repository work. That's not a reason to dismiss it. It's a reason to treat it with less confidence than the other two numbers, which have both been independently retested and both held up at a smaller magnitude. Caveman Proxy's number hasn't been retested by anyone outside the project yet.

Two real, smaller effects and one unverified one. The obvious question is why the smaller, independent numbers don't just mean the headlines were wrong.

## Why can the headline and the independent number both be true?

Because the effect size was never a fixed property of the tool. It's a property of how much headroom the specific task gives it.

Ponytail's own benchmark deliberately contains over-build traps — tasks where a generic agent will construct a custom component and Ponytail will notice the platform already solves it. The published examples are stark: a date picker task went from 404 lines to 23, a colour picker from 287 to 23, a dropzone from 251 to 95. SkillsBench's task mix is different — data analysis, repair, and backend work where the implementation is often already close to irreducible. There's nothing to trim, so Ponytail's decision ladder has nowhere to make a large cut. Both benchmarks are measuring the same mechanism honestly. They're just pointed at different amounts of the thing the mechanism removes.

Caveman Proxy shows the identical pattern inside its own official numbers, before any outside benchmark even gets involved. Its six CaveBench Wrap fixtures range from -55.1% on a fraud-CSV-outlier task down to +9.9% on a dashboard HTML fixture — meaning compression made that payload *larger*. The HTML case had no profitable transform available, but still paid the fixed cost of the proxy's metadata and recovery machinery. That's not an embarrassing edge case the maintainers buried. They published it. It's the actual economics of selective compression: repetitive logs, CSV, and YAML have enough structural redundancy to amortise the overhead. Small or already-compact payloads don't, and "compression" becomes expansion.

None of this makes either headline dishonest. It makes both headlines a ceiling, not an average — the number you'll see on a task engineered to showcase the mechanism, not the number you should expect on your own mixed workload. That distinction is exactly what the broader academic literature on context compression predicts, too.

## What does the broader compression research say?

Two papers, published a few months apart in 2026, back up the mechanism split I've been describing — and sharpen exactly where the risk sits.

The [CAVEWOMAN paper](https://arxiv.org/abs/2606.24083) evaluates eight models across five datasets and five reduction levels, compressing input and output separately. Its headline result is asymmetric: output compression often reduces realised cost, while linguistic input compression is frequently a lose-lose — net cost rising to roughly 1.15x the baseline on their benchmark average, with accuracy deteriorating as compression got more aggressive. The mechanism behind that loss is specific and worth sitting with: models often compensated for compressed input by generating longer responses. The model didn't just fail quietly — it tried to make up for missing context by talking more, which is the exact opposite of what you wanted from compressing it in the first place.

That's strong evidence for the instinct that a terser representation can just shift work into model reconstruction. It shouldn't be applied to Caveman Proxy directly, though — CAVEWOMAN studies *linguistic* input rewriting, where you paraphrase the text itself. Caveman Proxy performs structural, content-aware compression with a byte-exact recovery store behind it. They share the same underlying risk — information loss — but not the same mechanism, and the recovery channel is precisely the thing CAVEWOMAN's setup doesn't have.

The [SkillReducer paper](https://arxiv.org/abs/2603.29919) points at a more encouraging pattern. It analysed 55,315 public skills and found substantial non-actionable content sitting in most of them. A progressive-disclosure approach — removing content that genuinely wasn't doing anything — compressed descriptions by 48% and bodies by 39%, while functional quality *improved* by 2.8%, and the gains transferred across multiple model families. The lesson isn't "less context is better." It's that semantic selection beats indiscriminate terseness. Removing redundant filler helps. Removing information the model actually needs — even if it's grammatically redundant — doesn't.

That reframes the whole comparison. Ponytail's decision ladder and Caveman Proxy's content-aware routing are both attempts at semantic selection — deciding what shouldn't exist, or what's genuinely repetitive, rather than deleting indiscriminately. Caveman's original skill is closer to the CAVEWOMAN risk zone: it removes grammatical structure uniformly, and its own README already tells you where that goes net-negative. The mechanism you're trusting matters more than the percentage on the README.

Which brings the whole thing back to a practical question: given all of this, what should you actually do?

## So should you actually use these skills?

Not as a blanket, organisation-wide default. Every effect I've described here is task-distribution dependent, and none of the three mechanisms has been shown to hold up uniformly across a mixed real-world workload.

**Ponytail is the one I'd try first.** It has the strongest independent validation of the three, its operational overhead is low, and its value doesn't fully depend on the token arithmetic anyway — smaller, less speculative code is a maintainability win even on the tasks where the token savings turn out to be marginal. The risk to watch for is over-minimisation: the skill explicitly tries to protect security, validation, and accessibility work, but "does this need to exist" is a judgment call that can misfire on genuinely non-obvious requirements.

**Caveman's original skill is legitimate but narrow.** If you value terser assistant commentary for readability, it delivers that reliably. Don't budget around the 65% figure — 8.5% output-token reduction is the more honest planning number for an agentic coding workload, and the skill itself adds input overhead that a purely output-token comparison won't show you.

**Caveman Proxy is the most interesting bet and the least proven one.** The mechanism — content-aware compression with a recoverable local store — is a genuinely more sophisticated approach than blanket terseness, and it's the one most aligned with what SkillReducer suggests actually works. But it's also the one with no independent benchmark, an operationally heavier footprint (a local proxy, a recovery store, MCP routing), and a licensing boundary that shifts from MIT to BSL-1.1 once you're past the original skill — worth a quick legal check before you embed it in anything beyond your own usage. Evaluate it specifically on large, repetitive tool-output workloads — logs, JSON, CSV — where the theory of the case is strongest. Don't reach for it on smaller or already-compact payloads; its own benchmark already showed you what happens there.

One more thing worth saying plainly: don't stack all three at once and call the combined result a saving. If you enable Ponytail, Caveman's skill, and Caveman Proxy together and your cost drops 15%, you won't know which mechanism produced the gain — or which one introduced a quality regression you haven't noticed yet. Establish each one's effect on your own tasks individually first. Then, if you want to combine them, test the combination as its own treatment, not an assumed sum of three separate numbers.

The unit that actually answers "should I use this" is the one I introduced back at the token-bill model: cost per successfully completed task, measured on your own workload, at held quality. Neither a vendor benchmark nor an independent one can substitute for that, because neither one is running your tasks.

## Closing thoughts

I went into this expecting to find out whether Ponytail and Caveman were "real" or "hype," and that turned out to be the wrong question. Both are real. Both do roughly what they say, on the tasks they were measured on. The myth was never that these skills do nothing — it's that "token saver" quietly collapsed three different mechanisms, sitting on three different channels of a coding-agent's actual token bill, into one comparable-sounding percentage. Once you separate the layers, the numbers stop looking mysterious and start looking like what they are: a code-minimisation habit, a prose-shortening style, and an input-compression system with a safety net, each with a real but conditional case.

That's a less dramatic story than "90,000 stars can't be wrong" or "it's all marketing." It's also the more useful one, because it tells you something actionable: which of the three mechanisms maps onto your actual workload, and which benchmark — the vendor's, the independent one, or neither — you should trust for it. The one benchmark you should trust most is the one you haven't run yet: your own tasks, your own repository, cost per success, measured before you make any of these a default.

## Now, I want to hear from you

I'm curious how deep people actually go before adopting a skill like this.

- Before installing Ponytail or Caveman, did you check which channel of the token bill it claims to touch — or did the star count do the convincing?
- Have you ever measured cost-per-successfully-completed-task on your own repository, or only compared raw token counts before and after?
- If you've stacked more than one of these tools together, could you actually tell which one produced the change you saw?

Drop a comment or reply — I read everything.

## References

[Ponytail repository README](https://github.com/DietrichGebert/ponytail/blob/main/README.md) — the project's own description, install paths, and current headline claim.

[Ponytail core SKILL.md](https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail/SKILL.md) — the exact decision-ladder rules and safety boundaries the skill encodes.

[Ponytail agentic benchmark, 18 June 2026](https://github.com/DietrichGebert/ponytail/blob/main/benchmarks/results/2026-06-18-agentic.md) — the rebuilt official benchmark, including the disclosed contamination bug from an earlier run.

[Colin Eberhardt, "Ponytail? YAGNI!" (Scott Logic)](https://blog.scottlogic.com/2026/06/16/ponytail-yagni-and-the-problem-with-prompt-benchmarks.html) — the independent critique that led Ponytail's maintainers to rebuild their original benchmark.

[JetBrains, "Ponytail Skill for Claude Code: Does It Really Cut Agent Code by 54%?"](https://blog.jetbrains.com/ai/2026/07/ponytail-skill-claude-tested/) — the independent SkillsBench evaluation of Ponytail.

[Star History: DietrichGebert/ponytail](https://www.star-history.com/dietrichgebert/ponytail/) — third-party star and fork tracking for Ponytail.

[Caveman GitHub REST repository metadata](https://api.github.com/repos/JuliusBrussee/caveman) — exact current star and fork counts for Caveman, sourced directly from the GitHub API.

[Caveman repository README](https://github.com/JuliusBrussee/caveman/blob/main/README.md) — the current architecture description covering the original skill, Caveman Proxy/Engine, and the official output-compression benchmark table.

[Caveman core SKILL.md](https://github.com/JuliusBrussee/caveman/blob/main/skills/caveman/SKILL.md) — the exact output-compression rules and safety/clarity exceptions for the original skill.

[Caveman CaveBench Wrap benchmark](https://github.com/JuliusBrussee/caveman/blob/main/docs/WRAP-BENCHMARK.md) — the official Caveman Proxy benchmark, including the per-fixture breakdown showing the negative HTML case.

[JetBrains, "Does Speaking to Agents Like Cavemen Really Save 65% of Tokens?"](https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/) — the independent SkillsBench evaluation of Caveman's original skill.

[CAVEWOMAN: How LLMs Behave Under Linguistic Input and Output Compression](https://arxiv.org/abs/2606.24083) — the academic study showing linguistic input compression can raise net cost as models compensate with longer responses.

[SkillReducer: Optimizing LLM Agent Skills for Token Efficiency](https://arxiv.org/abs/2603.29919) — the academic study showing semantic selection outperforms indiscriminate compression across a 55,315-skill corpus.

[What's in a GitHub Star?](https://arxiv.org/abs/1811.07643) — the academic paper establishing that GitHub stars are a popularity/attention signal, not a validation metric.

