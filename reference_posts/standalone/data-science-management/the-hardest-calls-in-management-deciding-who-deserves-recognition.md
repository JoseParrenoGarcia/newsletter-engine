---
title: "The hardest calls in management: deciding who deserves recognition"
subtitle: "5 real stories that challenge how we define, evaluate, and reward impact in tech."
author: Jose Parreño Garcia and Rafa Páez
published: 2025-09-27
source: https://joseparreogarcia.substack.com/p/the-hardest-calls-in-management-deciding
theme: data-science-management
type: standalone
---

# The hardest calls in management: deciding who deserves recognition

*5 real stories that challenge how we define, evaluate, and reward impact in tech.*

---

Today's article is one that Rafa Páez and myself wrote a few months ago and published in his newsletter The Engineering Leader.

Rafa Páez is one of my favourite authors and I've had great conversations with him. And as a bonus, he is starting to write more and more about AI through his engineering leadership lens. Make sure you subscribe to his newsletter!

This article tries to dive into a question that most tech leaders face every performance review: **How do you recognise great performance… when it doesn't always look like output?**

This is a genuinely difficult question. How do you evaluate? How do you avoid over-rewarding the most visible work and overlooking the most valuable?

A few months ago, Rafa Páez and I tried to unpack this in a piece we co-wrote for his newsletter. We looked beyond the surface metrics to ask: what does holistic performance really look like for engineers?

If you have ever wrestled with recognising impact across wildly different types of contributions, this one is for you.

---

## What will we cover in this post?

Today, we want to share with you 5 real stories where traditional impact measurement falls short. Each story will challenge a common assumption:

1. **The £1M that wasn't fully recognised.** Why a machine learning improvement that generated £1M in revenue wasn't considered strategic.
2. **The £1M that was recognised (and why context matters).** A parallel example where a similar financial outcome led to much greater recognition.
3. **The problem with recognition-based impact.** How a team that provided company-wide enablement received 10x the visibility but wasn't necessarily creating 10x the impact.
4. **The challenge of measuring slow-moving metrics.** Why long-term improvements often go unrewarded, even when they fundamentally change an organisation's capabilities.
5. **The amplifier effect: impact that multiplies over time.** How a single contributor reshaped engineering standards and de-risked projects without producing a measurable metric.

Let's begin!

---

## Story #1: Flights ranking — the £1M that wasn't fully recognised

*"A £1M revenue boost sounds like a clear win. But what if the path to get there matters as much as the result?"*

One of our data scientists was working on flights ranking, a core component of how we optimise search results for travellers. The goal was to improve how we rank flight options, leading to better user engagement and, ultimately, higher conversion rates.

After months of work, the impact was undeniable: a £1M annual revenue increase. Significant, measurable, and real.

So, why wasn't this a clear-cut recognition case?

**The issue wasn't the outcome. It was how the result was achieved.**

Instead of developing a novel ranking approach or strategically enhancing our model, the senior data scientist relied on brute-force optimisation. The approach itself required persistence, patience, and solid execution — no question. But a senior? The expectation is not just to find a better model, it's to think more strategically about how we get there.

### Recognition vs. long-term strategic growth

This is where the distinction between recognition and career progression becomes important.

**Recognition is deserved.** This person delivered real business value. It's entirely reasonable to acknowledge their effort. A stronger bonus or public appreciation are great ways of doing so.

**But was it a promotion-worthy achievement?** Not necessarily. Strategic, senior-level impact goes beyond just testing variations. It involves pushing boundaries, introducing new frameworks, or fundamentally improving our approach.

If we start promoting based solely on absolute impact, without considering how the impact was achieved, we set the wrong precedent:

- We risk incentivising brute-force, low-leverage solutions instead of encouraging deep problem-solving.
- We signal that optimisation work alone is enough to climb to the next level.
- We fail to differentiate between impact that any capable data scientist could achieve and impact that truly redefines our competitive advantage.

So, the real challenge is to figure out: are we rewarding results, or are we building a culture that encourages the right kind of impact?

---

## Story #2: Hotel ranking — the other £1M, but this time, it was recognised

*"Two teams. Two ranking models. Two £1M revenue boosts. So why was this one seen differently?"*

On the surface, the outcomes look identical. The flights ranking experiment and the hotel ranking project both increased revenue by £1M per year. But the effort, complexity, and long-term impact of the two could not have been more different.

The hotel ranking team had to:
- Design and implement a brand-new ranking system from scratch
- Work cross-functionally with engineers, data scientists, and product teams to get it production-ready
- Integrate machine learning models, heuristics, and operational constraints to ensure accuracy

[Visual: screenshot | Skyscanner product | context illustration — hotel ranking interface showing ranked hotels for travellers]

The heuristics they initially used may not have been more complex than the brute-force approach used in flights ranking. But the difference is they weren't just iterating on a model; **they were creating the entire infrastructure that powered ranking.**

### Same financial impact, but a different kind of work

So why did this team receive more recognition than the flights ranking team? Because absolute impact isn't the only factor. Context matters.

- **Flights Ranking** was an optimisation. They tuned parameters and ran brute-force experiments to squeeze out incremental gains.
- **Hotel Ranking** was an architectural rebuild. They created a new system that didn't just improve one metric — it changed the game entirely.

When evaluating this team's work, ask:

1. **Is this solving a high-leverage problem?** The hotel ranking system improved not just one model but the entire infrastructure, unlocking future enhancements beyond this single £1M win.
2. **Does this scale beyond the immediate project?** The new system can support future features and ML improvements, creating a compounding effect.
3. **Is this work foundational?** Unlike a parameter tweak, this was a major system investment that elevated our ranking capabilities across the company.

In this story, the key element is that we ensured we recognised and rewarded work that raised the bar.

---

## Story #3: Enablement teams — the problem with visibility-based recognition

*"If a team gets 10x more public praise, does that mean they are 10x more impactful?"*

So far, we have examined impact through the lens of measurable business value. But what happens when impact is measured by recognition rather than actual contribution?

This is where **visibility bias** comes into play.

In our data science discipline, we have a centralised enablement team responsible for maintaining and improving our A/B testing statistical engine. As part of their role, they:

- Provide support for teams across the organisation
- Help teams interpret results
- Ensure that our internal experimentation framework is used correctly

Because of their cross-functional nature, they interact with far more teams than a typical data science squad. And since they are often solving urgent, visible problems, they receive a great amount of recognition.

We have an internal "high-5" system where employees can send thank-you notes and public appreciation to colleagues. It's a great tool for celebrating contributions, but if we were to measure impact by sheer number of high-5s, the enablement team would outperform every other team by an order of magnitude.

Does that mean they are 10x more impactful than a team working on core ranking models? Does that mean they should be prioritised for promotions over others who work on complex, but less visible, problems?

Of course not. But this is exactly what happens when we conflate recognition with impact.

### So, how do we know if enablement teams are truly performing?

This doesn't mean the enablement team isn't valuable. Let me be clear: they are. Their role is to amplify the effectiveness of others. But measuring their impact solely by recognition would be like judging an engineer's effectiveness by the number of Slack messages they send.

Instead, a good way of looking at contributions from enablement teams would be:
- Look at the **multiplier effect**: how much do they improve the quality of experimentation across the company?
- What tooling did they ship that helped teams move forward faster?
- Are teams making fewer statistical errors because of their guidance?

The lesson: visibility is not the same as value.

---

## Story #4: The flight price calendar — a 3-year effort with an astonishing result

*"What happens when the most important work is invisible in any single quarter?"*

One of the most complex challenges in flight meta-search is accurately estimating flight prices over time. Imagine a traveller looking at our calendar view, where they can see estimated prices for flights across an entire month or even a full year.

[Visual: screenshot | Skyscanner product | context illustration — calendar view showing estimated flight prices across a month]

Showing prices in a calendar is actually really difficult, even more so being able to fill out the full date grid. Flight prices change constantly, sometimes multiple times per day. We don't always have real-time data for every date, meaning we need to estimate missing prices. Users expect accuracy — if they see a flight for £60 on the calendar but land on a page where it's suddenly £80, they lose trust in our platform.

For years, our coverage accuracy metric hovered at **40%**. Because of that, our calendar view was super sparse, as we didn't want to fill it with prices where we knew that 60% of the time they were wrong.

A dedicated team spent **3 years** improving this system. They developed new estimation techniques to increase accuracy, improved how we pull and refresh pricing data at scale, and fine-tuned coverage algorithms to ensure fewer gaps in the calendar.

And after 3 years of continuous work, they raised the accuracy metric from **40% to 80%**.

### Why this work was at risk of being overlooked

This improvement happened bit by bit, quarter by quarter. No single release made a giant, eye-catching difference overnight. But when you zoom out, the impact is undeniable: 80% accuracy means a dramatically better user experience, users trust the calendar view more, and the foundation is now in place for future improvements.

If we are not intentional, slow-moving improvements like this get ignored because:

1. **We expect impact to be immediate.** Quarterly results dominate decision-making, making it hard to credit work that pays off over years.
2. **Incremental progress is hard to champion.** There's no single "big launch" to point to.
3. **The counterfactual is invisible.** It's hard to visualise what would have happened without this work.

As a manager, ask yourself: are you looking at the full picture, not just quarterly snapshots? Are you recognising compounding improvements, even if they take years? Are you valuing long-term thinking as much as short-term wins?

---

## Story #5: The amplifier effect

*"What if the most valuable work doesn't move a single metric — but makes everything better?"*

We have explored cases where impact was financial, architectural, and incremental. Now let's look at an even harder-to-measure form of impact.

### A data scientist who transformed engineering standards

One of the most impactful people on my team wasn't a senior engineer or a principal scientist. She was a **mid-level data scientist** who saw a problem, took ownership, and quietly reshaped how we worked.

She noticed that our engineering standards for Git repos, data storage, and other core infrastructure were inconsistent. Instead of waiting for someone else to fix it, she took the initiative to improve them. She reached out to senior engineers for guidance, learning how to implement best practices properly. She built a new, standardised approach that the team agreed was the right way forward.

The improvements weren't tied to a specific revenue goal. They weren't even officially on the roadmap. But they made everything smoother, faster, and more maintainable.

Then came the most important part. Instead of moving on to another project, she focused on spreading what she learned:
- She trained 3 other teammates on the new framework
- She ensured no single person was a bottleneck for this knowledge
- She created a standard approach that future projects could build on

### The problem with traditional impact measurement

If you judged her performance by standard metrics, her work didn't show up anywhere:
- She didn't build a new model
- She didn't deliver a direct revenue increase
- She didn't improve an existing KPI

But what she **did** do was de-risk future projects, improve team efficiency, and level up the entire organisation. And as part of our competency framework, she nailed the "expertise" and "build it right" sections for her level. She was accordingly rewarded with a great bonus and more challenges that would set her up on a promotion path.

### Rethinking how we measure impact

> **"Not all impact is measurable. And not all measurable impact is equal."**

The amplifier effect is real. Some of the most valuable contributors on your team are the ones quietly making everything around them better — without a dashboard metric to show for it.

The lesson: if you only reward what you can measure, you will systematically undervalue the people who make your organisation more capable.

---

## Closing thoughts

These 5 stories share a common thread: **traditional impact measurement is incomplete.**

Revenue numbers don't capture the quality of how the work was done. Visibility metrics don't capture actual contribution. And quarterly KPIs don't capture compounding, long-term improvements.

So the next time you're in a performance review, ask yourself:

- Are you rewarding the right kind of impact, or just the most visible kind?
- Are you recognising work that raises the bar, or just work that hits the number?
- Are you seeing the quiet stars on your team — the people whose work makes everything else better?

*And if you're an individual contributor: when have you done work that was celebrated loudly but with questionable long-term value? And how do you balance consistency in your process with flexibility for context?*

A big thanks to Rafa Páez for collaborating on this leadership topic.
