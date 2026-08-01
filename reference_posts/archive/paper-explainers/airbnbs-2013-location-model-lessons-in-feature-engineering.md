---
title: "Airbnb's 2013 Location Model: Lessons in Feature Engineering"
subtitle: "How 1 feature made Airbnb's search smarter — a step-by-step breakdown of their 2013 location relevance model."
author: Jose Parreño Garcia
published: 2025-01-22
source: https://joseparreogarcia.substack.com/p/airbnb-location-feature-engineering
theme: paper-explainers
type: standalone
paper: "Airbnb Tech Blog — Location Relevance (2013)"
paper_source: https://medium.com/airbnb-engineering
---

# Airbnb's 2013 Location Model: Lessons in Feature Engineering

*How 1 feature made Airbnb's search smarter — a step-by-step breakdown of their 2013 location relevance model.*

---

This week I have been reflecting on all the value I have gotten from scientific papers when applied to work. I don't think I will ever write a scientific paper, but I do believe I can share with the Data Science community what I understood from these papers in a more distilled way.

This is why I wanted to share with you my first paper review (actually it was a blog post in The Airbnb Tech Blog) which talks about **location relevance at Airbnb**. If you want to learn how 1 feature made Airbnb's search smarter, tag along with me!

*This is an old blog post, dating back to 2013, and in later years Airbnb have adopted other techniques to measure location relevance.*

---

## The problem: measuring location quality

The location of an accommodation is sometimes as important as the quality of the accommodation itself. Quality is easy to measure — hotel stars, reviews, facilities. But **location is way more difficult to measure.**

Airbnb's challenge: when a user searches for "San Francisco", how do you rank listings not just by distance to the search point, but by the quality and relevance of their location?

---

## Step 1: Why did Euclidean distance fail?

The most naive approach is to rank by straight-line distance from the search centre.

**Euclidean distance failed** because it treated all locations as equally accessible, ignoring:
- Travel demand patterns
- City layouts (bridges, mountains, rivers)
- Actual booking behaviour

This led to misplaced ranking results and poor user experience. A listing technically "close" to the centre might be in an inaccessible or undesirable area.

[Visual: diagram | Airbnb Tech Blog | illustration — map showing how Euclidean distance fails to capture real accessibility in an irregularly-shaped city]

---

## Step 2: Exponential decay model

The next step was more intuitive: **prioritise listings near city centres using exponential decay.**

The idea: give a higher weight to properties close to the centre, with a smooth demotion curve for properties further away. Being close to the centre of town is desirable in most travel contexts, so the model should reflect that.

This worked better than raw distance, but had a key flaw: **cities are not radially distributed**. A simple exponential decay from the centre can't account for bridges, mountains, rivers, or the fact that city supply is often concentrated in non-circular patterns.

[Visual: diagram | Airbnb Tech Blog | chart — exponential decay curve showing location score vs distance from centre]

---

## Step 3: Sigmoid function — combining centrality with supply

The sigmoid function improved on exponential decay by **combining centrality with Airbnb's supply distribution and actual city topography.**

Two specific problems it addressed:

1. **New market expansion:** If Airbnb was expanding to a new location with only outskirt supply, you wouldn't want the model to fully remove or score that supply ultra-low — it's the only option available.

2. **Non-circular cities:** Cities have bridges, mountains, rivers. A simple strong exponential decay can't account for this. The sigmoid curve adapts more gracefully to the actual shape of supply distribution.

Airbnb showed examples of how their supply was distributed in different cities based on distance to the centre, revealing very different shapes from city to city.

[Visual: diagram | Airbnb Tech Blog | heatmaps — supply distribution in different cities showing non-circular patterns]

---

## Step 4: Conditional probability — beyond geography

The sigmoid demotion curve was a good starting point, but still couldn't understand:
- Whether a neighbourhood was dangerous or not
- Whether a neighbourhood lacked public transport
- Whether a neighbourhood was primarily industrial

To improve results, Airbnb drew on **conditional probability**. The core idea: *"If users book a certain neighbourhood a lot when they search for a specific query, then this must be a popular neighbourhood."*

Using the "power of the masses" — implicit signals from actual booking behaviour — to enrich the location score.

When applied, their results showed a **positive uplift in their A/B test**.

[Visual: diagram | Airbnb Tech Blog | heatmap — conditional probability scores for San Francisco, showing popular vs unpopular neighbourhoods]

---

## Step 5: Normalising scores — solving position bias

The conditional probability approach introduced a new problem: **position bias**.

Extreme example: if for an Oakland query, Airbnb only displayed San Francisco listings at the top (due to supply concentration), then by pure bias, most bookings for the Oakland query would come from San Francisco — artificially inflating San Francisco's conditional probability for Oakland searches.

The fix: **normalise the location scores** to account for this bias, ensuring the signal reflects genuine neighbourhood preference rather than an artefact of which listings were shown.

[Visual: diagram | Airbnb Tech Blog | table and chart — before/after normalisation showing position bias correction]

---

## Step 6: The serendipity factor — protecting the long tail

The final step addresses a subtle problem: **conditional probabilities mask out the long tail.**

Airbnb's specific example: the **mushroom dome** — a highly unique accommodation in Aptos, California. What happened was that by tightening normalisation parameters and search queries too much, the mushroom dome disappeared when travellers searched for Santa Cruz, and would only have been found when searching specifically for Aptos.

To fix this, Airbnb combined 2 conditional probability metrics answering 2 complementary questions:

1. When people search for a specific location L(i), what is the probability of booking in city X(i)?
2. When people are booking in city X(i), what is the probability that they searched for a specific location L(i)?

Whilst both questions look similar, the implications of their answers are profound. The first protects against over-scoping (missing unique properties in broader searches). The second protects against under-scoping (surfacing irrelevant properties in narrow searches).

It seems Airbnb combined the scores from step 5 with the ones from step 6 to produce the final location relevance signal.

[Visual: diagram | Airbnb Tech Blog | chart — showing how the two conditional probability metrics interact to protect unique long-tail properties]

---

## Key takeaway

Airbnb did **a lot** of work improving their location relevance signal — not by throwing more features at the problem, but by **engineering one feature extremely well**, step by step.

This highlights the importance of feature engineering. In the world of deep learning, some of this might be learned by the model on its own — but that is a hypothetical possibility, not a guarantee.

The lesson: it is sometimes much, much better to go for a **low number of high-quality features** than to take the "kitchen sink" approach — throwing 100 features and seeing what happens.

Feature engineering is not just a data science chore. It is a form of domain knowledge encoding that can make or break a model's real-world performance.
