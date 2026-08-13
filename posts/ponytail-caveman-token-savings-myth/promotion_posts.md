## Launch Post

> **Why this post:** Speaks directly to anyone using Claude Code who has installed a "token saver" skill on faith — the star count, not the mechanism — and never checked whether the headline number holds up.

🗞️ New post is live! I Checked What Ponytail and Caveman Actually Save. It Wasn't 54%.

"Token saver" is doing a lot of work to flatten three genuinely different mechanisms into one comparable-sounding percentage — and the assumption underneath it (fewer visible tokens = lower total cost) is not a law of how LLMs work.

What's inside:
🔹 Ponytail, Caveman's skill, and Caveman Proxy aren't the same kind of tool — they sit on three different channels of a coding agent's token bill, and only one of them is actually "compression."
🔹 Independent JetBrains benchmarks retested both headline claims. Ponytail's 54% code reduction becomes ~15%. Caveman's 65% output-token reduction becomes 8.5%. Both real, both a fraction of the marketing.
🔹 The right question was never "how many tokens did this save" — it's cost per successfully completed task, because a saving in one channel can silently reappear in another (extra input, extra reasoning, extra recovery calls).

I traced every published benchmark for both projects, plus two academic papers on compression, back to source.

💬 Have you ever installed a "token-saving" skill on the star count alone — without checking which part of your bill it actually touches?
👇 Full post: [link]

---

## Deep-dive 1: How does the token bill actually work?

> **Why this section:** Fully standalone mental model with a clean list structure — works as a post with zero article context, and reframes a concept ("token savings") most Claude Code users think they already understand.

A coding-agent session doesn't have one bill. It has at least eight.

Fresh input, cache writes, cache reads, reasoning tokens, output prose, code, tool recovery calls, even image tokens if you're rendering text to pixels — every one of them is billed or budgeted differently, and a "saving" in one can quietly reappear in another.

Let's break it down:
🔹 "Output tokens fell 65%" and "the task cost 65% less" → these sound like the same claim. They're measuring completely different channels.
👉 A skill can be telling the truth about the first and misleading you about the second, and most people never notice the gap.
🔹 Compress input too aggressively → the model either guesses at what got cut, or spends a tool call retrieving it.
👉 That retrieval is a real cost. It just shows up in a different channel than the one you were watching.
🔹 The right unit isn't "tokens saved" → it's cost per successfully completed task, at held quality.
👉 A run that's 40% cheaper but fails 10% more isn't a saving once you count the retries. This is the only number that actually tells you whether a tool is working.

Most "token saver" benchmarks report one channel and let you assume it's the whole bill.

💬 Have you ever measured cost-per-successful-task on your own workload, or only compared raw token counts before and after?
👇 Full breakdown in the post: [link]

---

## Deep-dive 2: Are Ponytail and Caveman actually the same kind of tool?

> **Why this section:** Sharpest, most counter-intuitive claim in the piece — directly corrects the "they're both token savers" assumption that drives most of the hype, and has a concrete, memorable example (the date picker).

Ponytail and Caveman get lumped into the same category. They're not solving the same problem.

Let's break it down:
🔹 Ponytail isn't compression at all → it's a decision ladder the agent runs before writing any code: does this need to exist, is it already in the codebase, does the platform already solve it.
👉 A generic agent treats "build a date picker" as a component task. Ponytail reframes it as a platform question and can stop at a single HTML input. That's a design decision, not a shorter version of the same code.
🔹 Caveman's original skill only touches output prose → it explicitly leaves input and reasoning untouched, and it adds its own overhead per turn.
👉 It was never claiming to touch your code or your input tokens. The marketing around it implied otherwise.
🔹 Caveman Proxy is a third, separate bet → content-aware input compression with a local recovery store, so the model can retrieve anything it needed that got trimmed.
👉 Recoverable doesn't mean lossless on the first pass — the model still has to notice something's missing before it asks for it back.

Calling all three "token savers" is itself part of the myth.

💬 If someone asked you right now which channel of your token bill Ponytail or Caveman actually touches, could you answer without looking it up?
👇 Full post: [link]

---

## Deep-dive 3: Why can the headline and the independent number both be true?

> **Why this section:** Resolves the apparent contradiction (54% vs. 15%, both "true") that most readers will already be wondering about after seeing the launch post — high shareability because it reframes a "gotcha" into a mechanism.

A 54% headline and a 15% independent result aren't a contradiction. They're the same mechanism pointed at different amounts of the thing it removes.

Let's break it down:
🔹 Effect size was never a fixed property of the tool → it's a property of how much headroom the specific task gives it.
👉 Ponytail's own benchmark deliberately contains over-build traps. A date picker task went from 404 lines to 23. Mixed real-world tasks have far less irreducible bloat to cut.
🔹 Caveman Proxy shows the identical pattern inside its own official numbers → -55% on a fraud-detection CSV, +9.9% on a dashboard HTML fixture.
👉 Compression became expansion on that HTML case. Small or already-compact payloads pay the tool's fixed overhead without getting anything back for it.
🔹 Neither headline is dishonest → both are a ceiling, not an average.
👉 The number you see on a task engineered to showcase the mechanism is not the number you should expect on your own mixed workload.

This is exactly what the academic literature on context compression predicts, too — and it's testable on your own repo in an afternoon.

💬 Have you ever seen a benchmark quietly measure the ceiling case and market it as the average?
👇 Full post, including the academic papers and the self-test protocol: [link]
