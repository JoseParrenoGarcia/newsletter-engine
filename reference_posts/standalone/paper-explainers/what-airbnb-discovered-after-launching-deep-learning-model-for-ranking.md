---
title: "What Airbnb discovered after launching their deep learning model for ranking"
subtitle: "Think launching a deep learning model is hard? Try optimising it. How Airbnb turned post-launch failures into lessons."
author: Jose Parreño Garcia
published: 2025-08-11
source: https://joseparreogarcia.substack.com/p/what-airbnb-discovered-after-launching
theme: paper-explainers
type: standalone
paper: "Improving Deep Learning for Airbnb Search"
paper_source: arXiv 2020
---

# What Airbnb discovered after launching their deep learning model for ranking

*Think launching a deep learning model is hard? Try optimising it. How Airbnb turned post-launch failures into lessons.*

---

This week I'm picking up where we left off with Airbnb's journey into deep learning for search ranking.

In a [previous post](./how-airbnb-optimized-search-rankings-with-deep-learning.md), we looked at their first steps: replacing classic ML + feature engineering with a deep neural net that actually outperformed them. That was a big win. But **what happened after the first model launch?** That's what this second paper explores.

In "Improving Deep Learning for Airbnb Search," the team shares what they tried next: new architectures, debugging techniques, and lessons from A/B tests that flopped. What I found most valuable is how they approached the work — not just by importing fancy models, but by chasing down real user problems and trying to understand what the model was actually doing.

---

## The paper

**"Improving Deep Learning for Airbnb Search"** — arXiv 2020. Releasing a first deep learning model is important, but scaling it and iterating over it is a different challenge.

**What we will cover:**
1. Start with the user problem: "is cheaper better"?
2. Multiple new models were tried. None worked. ICE plots to the rescue.
3. The right price for the trip as part of a two-tower architecture
4. Cold start problem for new listings
5. Eliminating position bias

---

## 1. Start with the user problem: "is cheaper better"?

Airbnb's starting observation: *"a series of successful ranking model launches were not only associated with an increase in bookings, but also a reduction in the average listing price of search results."*

The distribution showed more travellers looking for cheaper prices than were being displayed. The model appeared to be over-displaying expensive listings relative to actual demand.

[Visual: chart | paper figure | distribution — booking price vs displayed price distribution showing cheaper demand vs displayed supply]

So the question became: if cheaper is better, why wasn't the model already surfacing cheaper listings consistently? And if the model was already trying — what was it getting wrong?

---

## 2. Multiple new models were tried. None worked. ICE plots to the rescue.

Airbnb tried several approaches to "force" the DNN to prefer cheaper listings. Each iteration managed to display lower prices — but still wasn't solving the actual user problem.

The issue was buried in the model's internals. DNNs are opaque black boxes. Conventional explainability techniques missed the nuances due to the massive non-linearities in the model.

> *"The DNN was suffering from the tyranny of the majority, focusing on price-quality tradeoffs that were tuned for the most popular locations that dominated bookings."*

When the model was calibrated on high-volume cities, it learned price-quality tradeoffs that didn't transfer to smaller markets.

[Visual: chart | paper figure | per-city analysis — median listing price vs booking price showing big differences across cities]

### ICE plots: why conventional tools failed here

**Partial dependence plots (PDPs)** average the effect of a feature over all inputs. But that assumes the model treats features independently. In a DNN, everything interacts with everything. PDPs flatten out exactly the signal you need.

**ICE plots (Individual Conditional Expectation)** hold everything else constant and vary just one feature — in this case, price. Take a single search, sweep across the price range, record predictions. Repeat for hundreds of searches. Plot the outputs.

> *ICE plots give you a per-listing view of what the model is actually doing. They respect the messy, tangled relationships that deep networks learn.*

This is slower, but sometimes you need to go granular to understand effects.

---

## 3. The right price for the trip: two-tower architecture

After several failed attempts, the team reframed the problem. The model already knew cheaper was better — but only in a very general sense. **What it lacked was the ability to recognise the right price for a specific trip.**

New framing: rather than penalising price directly, could the model learn what an *ideal listing* looks like for a given user and query — and then rank based on closeness to that ideal?

That idea led to the **two-tower architecture**.

### Two towers, one goal

| Tower | What it processes |
|-------|------------------|
| **Query/User tower** | Location, date range, guest count, user history |
| **Listing tower** | Price, amenities, location, reviews |

Each tower produces a vector — a fingerprint representing either the ideal listing (from the user/query side) or an actual listing (from the supply side). The model then ranks by Euclidean distance between these two vectors: booked listings should be pulled closer to the ideal, non-booked ones pushed further away.

**What made it work:**
- Allowed the model to account for local preferences (different price expectations in Delhi vs Paris)
- Implicitly learned the notion of "the right price" instead of hardcoding "cheaper is better"
- Enabled generalisation across tail markets that were underrepresented in training data

### Validation with ICE plots

After training the two-tower model, Airbnb re-ran ICE plots for price. Instead of price scores always going down (cheaper = better), the curves **peaked at specific prices** — a sign the model had learned to identify a price sweet spot depending on context.

In other words: *it was no longer blindly chasing discounts. It had learned relevance.*

[Visual: chart | paper figure | ICE plots before/after — old model (monotone decrease) vs two-tower model (contextual peak)]

---

## 4. Cold start problem for new listings

New listings were at a systematic disadvantage. Airbnb's DNN used engagement features at the listing level — historical click and booking signals. New listings had none of these, so they were penalised at inference time compared to established listings.

**The solution:** predict the missing engagement features.

### How to validate the engagement estimator

The evaluation approach was elegant:
1. You know the real ranking using actual engagement features
2. You score the same listings replacing engagement features with predicted ones
3. Compute the error between true rank and predicted rank, averaged across all samples
4. The estimator with the lower error is the better option (error = 0 means your estimator is as good as real data)

### What prediction algorithm did they use?

**Not an ML one.** They averaged the true engagement features over:
1. Geographically close listings (neighbours)
2. Similar guest capacity (listing attributes)
3. A sliding window to account for seasonality

> *A good old heuristic is always the first best step!*

**Production results:** +14% bookings for newly created listings, with an overall +0.38% bookings improvement — indicating a genuine user experience improvement, not just a redistribution of traffic.

---

## 5. Eliminating position bias

Another subtle bias: listings that appeared higher on the page naturally got more clicks — not because they were better, but because they were easier to spot. Over time, this created a feedback loop: the model learned that high-ranking listings get booked more, so it kept ranking them high.

### The trick: teach it, then take it away

Airbnb's solution was clever and non-intrusive:

1. **During training:** include the listing's position as a feature — let the model learn how position affects bookings
2. **During inference:** always set this feature to zero — every listing is evaluated "as if" it appeared in position 0

This meant the final ranking would not depend on where the listing had previously appeared. Additionally, they applied **dropout** to the position feature during training to prevent the model from becoming too dependent on it.

### Picking the right dropout rate

Airbnb swept through different dropout rates, plotting two curves:
- **NDCG when position = 0:** model behaviour at inference time
- **NDCG when position is kept:** how much the model relies on position during training

The sweet spot: the "elbow" where relying on position starts to give a big advantage, but inference-time relevance hasn't dropped much yet. They settled on **dropout ≈ 0.15**.

[Visual: chart | paper figure | dropout sweep — showing the elbow point where position learning and inference-time relevance are balanced]

---

## Summary

Five takeaways from Airbnb's "Improving Deep Learning for Airbnb Search":

1. **Do not jump to model tweaks — start with the user problem.** Every iteration came from observing real user behaviour: skew towards cheaper listings, uneven performance in tail cities, cold start pain. The model followed the user, not the other way around.

2. **When models get messy, turn to better diagnostics.** Partial dependence plots were not enough. ICE plots — although slower — gave precise, interpretable insight into how price was behaving. Stop guessing, start fixing.

3. **Cheaper is not always better — relevance is.** The two-tower architecture let the model learn what the right listing looked like for each query. It worked not because it forced price down, but because it balanced price with context.

4. **Fix cold start with predictions, not just rules.** Instead of boosting new listings with a static rule, Airbnb predicted what engagement would have been using local averages — a simple heuristic that drove +14% bookings for new listings.

5. **Biases do not always need complex counterfactuals.** To remove position bias, they simply added position as a feature in training and zeroed it out during inference — and regularised it with dropout. Elegant, measurable, and highly effective.

> **Biggest learning:** once you have a powerful model in place, further gains often come not from fancier layers — but from reframing the problem, improving your diagnostics, and embedding user understanding into the architecture itself.
