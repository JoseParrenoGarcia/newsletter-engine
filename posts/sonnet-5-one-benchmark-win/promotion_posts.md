# Promotion Posts — Sonnet 5 Cost Comparison

> **⚠ STALE — superseded 2026-07-15.** This promotion copy was generated against the prior pipeline draft (title: "Sonnet 5's cost story only holds up at matched effort tiers"), which Jose has since fully replaced with his own final Substack draft (title: "Sonnet 5 is only good at one thing (beating Sonnet 4.6)"). The quotes, section references, and framing below no longer match `long_draft.md`. Re-run `/promote` against the final draft before using any of this copy.

## Launch Post

> **Why this post:** Every AI-tooling decision-maker has either shared or seen someone share a Sonnet 5 cost take in the last few weeks — this launch post reframes both sides as the same mistake, which is a scroll-stopping angle for this audience.

🗞️ New post is live! Everyone's Arguing About Sonnet 5's Cost. Almost No One Controlled for This.

Anthropic's launch chart and the internet's backlash are both measuring Sonnet 5's cost the wrong way — and they're making the exact same mistake to get there.

Once you control for the one variable both sides skip, a much narrower and much more useful story shows up.

What's inside:
🔹 Sonnet 5 ships five effort settings, and "effort" isn't comparable across generations — the same label no longer buys the same amount of thinking
🔹 At matched effort tiers, Sonnet 5 is genuinely cheaper for the same accuracy — that's a real, checkable win, and it's the only clean comparison in this entire launch cycle
🔹 Push effort higher and the cost curve bends hard — cost-per-successful-task nearly quadruples for a 14-point accuracy gain, which is where both the hype chart and the backlash quietly live

💬 Have you ever taken a benchmark chart, or a viral "this model is a ripoff" thread, at face value — only to find out later it wasn't measuring what you assumed?
👇 [Link]

---

## Deep-dive 1: Is Sonnet 5 actually cheaper at matched intelligence tiers?

> **Why this section:** This is the thesis-defining section — a clean, standalone claim (matched-tier cost win) with a concrete number ($2.29/task) to contrast it against, and enough structure for three escalating insights.

Match the effort tier before you ask "is it cheaper" — skip that step and you'll get an answer to a different question entirely.

At the same effort setting, Sonnet 5 gets the same accuracy as its predecessor for meaningfully less money. That's the whole claim, and it's narrow on purpose.

Let's break it down:
🔹 Medium effort vs medium effort, same accuracy, lower cost → that's a real, checkable win
👉 It's also the only comparison in the entire launch cycle that both the marketing and the backlash managed to avoid making cleanly
🔹 The viral $2.29-per-task number isn't wrong, it's just describing a different effort setting → higher effort means more output tokens and roughly three times as many agentic turns
👉 Same per-token price, wildly different bill — the cost increase comes entirely from consumption, not from a price hike nobody announced
🔹 A model that checks its own work more will always spend more tokens doing that → the extra spending is worth it at low-to-medium effort and stops being worth it well before max effort
👉 That's not a quirk of one model — it's what happens any time you scale "let the model keep working the problem" without also tracking what each extra pass costs

💬 When was the last time you checked whether a "cheaper" or "more expensive" claim about a model was even comparing the same settings?
👇 [Link]

---

## Deep-dive 2: Where do Sonnet 5 cost comparisons break down?

> **Why this section:** The cost-per-successful-task curve inside this H2 has hard numbers (low $2.73 → max $10.49, 47.7% → 61.5% success) and a genuinely provocative standalone claim: max effort is a bad default, not a bad model.

Max effort isn't the best version of a model — it's usually the most expensive way to buy a small accuracy gain.

Run the same model across its own effort dial and the cost curve bends far sooner than most people assume.

Let's break it down:
🔹 Cost-per-attempt hides the number that actually matters → cost-per-successful-task is cost divided by success rate, and it's the only honest way to compare effort settings
👉 A task that costs $2 per try but only works half the time actually costs about $4 per successful outcome — "cheap" and "cheap when it works" are not the same sentence
🔹 On one production coding-agent benchmark, going from low to max effort buys roughly 14 points of success rate while nearly quadrupling expected cost-per-success → the accuracy curve and the cost curve move at completely different speeds
👉 Past a certain point, a competing model at high effort or a flagship model at max effort can beat the "upgraded" model's own top setting on cost-per-success
🔹 The effort dial traces a real cost-quality frontier, and every frontier has a bend point → past that bend, the next unit of quality gets disproportionately expensive
👉 Whoever sets the default effort level for your production workload is quietly setting your cost-per-success curve too — that's a system design decision, not a model-choice decision

💬 Do you actually know what effort or reasoning setting your production workload defaults to right now — or are you assuming it's the "good" one?
👇 [Link]

---

## Deep-dive 3: What does the coding construction-versus-review split actually show?

> **Why this section:** A sharp, fully self-contained tradeoff — precision up, recall down, with named numbers from an independent practitioner source — that stands on its own without any reference to the rest of the article's argument.

"Better at coding" is doing the work of two completely different claims, and they don't move in the same direction.

Writing code and reviewing someone else's code are different tasks, and treating them as one score erases the tradeoff that actually matters for deciding anything.

Let's break it down:
🔹 On writing code, one independent practitioner review found a real, measurable improvement → more persistence on hard implementations without needing to be re-prompted
👉 That's the kind of gain that shows up directly in how much babysitting an agent needs mid-task, not just in a benchmark score
🔹 On reviewing code, precision went up but recall went down → fewer false alarms, but more real bugs slipping through uncaught
👉 Whether that trade is good for you depends entirely on which is more expensive on your team: chasing a false alarm, or shipping a missed bug
🔹 Pushing to maximum effort didn't fix the recall problem → it roughly doubled review cost without recovering the bugs medium effort was already missing
👉 More compute doesn't rescue a task-shaped mismatch — if a setting is bad at catching bugs, spending more on it just buys a more expensive version of the same miss rate

💬 Would you rather your code review tool miss more real bugs or flag more false alarms — and have you actually picked which failure mode you're optimizing for?
👇 [Link]
