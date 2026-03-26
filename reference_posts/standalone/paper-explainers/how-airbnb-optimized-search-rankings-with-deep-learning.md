---
title: "How Airbnb used Deep Learning to rank listings (and what you can learn from it)"
subtitle: "Lessons from Airbnb's AI experiments, including what worked, what failed, and why simplicity often wins."
author: Jose Parreño Garcia
published: 2025-03-29
source: https://joseparreogarcia.substack.com/p/airbnb-ai-search-ranking-lessons
theme: paper-explainers
type: standalone
paper: "Applying Deep Learning to Airbnb Search"
paper_source: arXiv 2018
---

# How Airbnb used Deep Learning to rank listings (and what you can learn from it)

*Lessons from Airbnb's AI experiments, including what worked, what failed, and why simplicity often wins.*

---

This week I came across a fascinating paper from the Airbnb engineering team, where they detail how they used deep learning to rank accommodations on their main search page. I initially thought it would be just another fancy architecture paper — but I was blown away by how practical their real-world lessons are.

One of the things I really enjoyed is that they describe their failures in their journey. Not many companies share these.

---

## The paper

**"Applying Deep Learning to Airbnb Search"** — released on arXiv in 2018. Airbnb's goal, in their own words, was to describe *"the work done in applying neural networks in an attempt to break out of that plateau"* — the plateau being where they had landed after years of applying classical machine learning approaches (GBDT).

**What we will cover:**
1. Start simple with Deep Learning architectures
2. Embeddings are cool, but they can't solve everything
3. Applying deep learning feature engineering best practices
4. Deep Learning explainability (what worked and what didn't)

---

## 1. Start simple with Deep Learning architectures

If you think applying deep learning is just about throwing all your data into TensorFlow and letting it work magic… think again.

When Airbnb first started replacing their Gradient Boosted Decision Tree (GBDT) model with deep learning, they didn't see instant gains. Their first attempts performed no better than GBDT. But instead of giving up (or blindly adding complexity), they iterated through four key experiments.

### What Airbnb tried (and what actually worked)

| Experiment | What They Did | Results |
|------------|--------------|---------|
| **1. Simple NN** | One-hidden-layer NN with same features as GBDT. Optimised for regression loss (point-wise LTR). | 📉 No improvement over GBDT, but proved deep learning could at least match traditional models. |
| **2. LambdaRank NN** | Same NN but optimised for pair-wise ranking (LambdaRank) using nDCG loss. Trained to directly improve rankings rather than predict bookings. | 📈 Significant booking gains! Ranking loss was a better objective than regression. |
| **3. Stacked Models (GBDT + FM + NN)** | Combined GBDT, Factorization Machines (FM), and NN into one massive hybrid model. | ⚠️ Slight booking improvement, but massive complexity. Harder to train, maintain, and deploy. |
| **4. Scaling Up: Bigger NN + More Data** | Same as LambdaRank NN, but with 10x more training data and a deeper NN. | 🚀 Best results! Higher bookings, simpler architecture, easier to maintain. |

[Visual: table | author-generated (Datawrapper) | comparison — 4 experiment results showing experiment 4 as clear winner]

### The key learning

The winning scenario (#4) might sound like just "bigger computers, bigger networks, more data" — but it was smarter than that. Scaling up the NN worked because Airbnb also kept feature engineering simple, focusing on core listing attributes while selectively enriching the model with personalisation signals.

> **"Don't be a hero."**
> Start simple. Validate what works. Scale complexity only when needed.

---

## 2. Embeddings are cool, but they can't solve everything

The rise of neural networks brought a powerful tool: embeddings for high-cardinality features (words in NLP, sparse users in recommender systems).

Airbnb reasoned: *"Listings have unique IDs and it's a high cardinality space. Similar properties should naturally cluster in an embedding space. Why not use embeddings for `property_id`?"*

**The result: complete overfitting.**

Models using embeddings for `property_id` performed amazingly on the training set — and appallingly on the test set. The training/test divergence was extreme.

### Why it happened

Embeddings need massive amounts of data to converge. In NLP and video, data is virtually infinite. But property bookings? **A single listing can only be booked once per day.** Even the most popular properties max out at 365 bookings per year.

That is nowhere near enough data to train a robust embedding model. The network simply memorised patterns instead of generalising.

[Visual: chart | paper figure | overfitting evidence — training vs test curves showing the divergence for property_id embeddings]

> *See? Applying deep learning wasn't so easy after all!*

---

## 3. Applying deep learning feature engineering best practices

Deep learning promises to automate feature engineering — throw in the data and let backpropagation figure out weights and non-linear relationships. However, this only works if you help the NN with good data. Airbnb's framing: *"ensuring the features comply with certain properties so that the NN can do the math effectively by itself."*

Three techniques Airbnb used:

### Feature normalisation

Neural networks struggle when features have wildly different value ranges. If one feature ranges from 0–1 (price ratio) and another from 1,000–10,000 (number of reviews), this causes:

1. **Overpowering gradients** — large-range features dominate the tug-of-war in backpropagation
2. **Slow or unstable training** — uneven weight updates, strange convergence paths
3. **Loss of nuance** — small-range features become afterthoughts, even when they hold important predictive information
4. **Vanishing/exploding activations** — sigmoid/tanh can saturate with extreme inputs

**Industry best practice:** scale everything to a uniform range like `[-1, 1]` or `[0, 1]`, with the median mapped to 0.

### Feature smoothing

Neural networks converge to smoother distributions over time. The problem comes when input features aren't smooth to begin with — this forces the model to work harder.

Airbnb observed this in their 2-layer NN: *"the outputs of the layers get progressively smoother in terms of their distributions."*

For location specifically:
- Raw latitude and longitude don't form a smooth feature space
- Expressing location as offsets from the search centre (lat listing - lat centre) made it more dense, but still not smooth enough
- **Final solution:** take the log of these relative offsets — this compressed large distances while spreading out smaller ones, leading to a smooth, continuous distribution

**How to verify generalisation:** stress-test the model with unseen feature values (e.g. artificially scale up accommodation price by 2x or 3x during evaluation). If the model behaves sensibly on out-of-distribution inputs, the smoothing is working.

[Visual: heatmap | paper figure | before/after — raw lat/long distribution vs log-transformed offset showing smoothness improvement]

### Feature engineering optimised for embeddings — S2 cells for geo-location

Raw latitude and longitude don't capture what travellers actually care about: what is nearby. Is there a metro station? Is it a safe neighbourhood? Are there restaurants, parks, or museums?

**Airbnb's elegant solution** (directly quoting the paper because it deserves it):

> *"We created a new categorical feature by taking the city specified in the query and the level 12 S2 cell corresponding to a listing, then mapping the two together to an integer using a hashing function. For example, given the query 'San Francisco' and a listing near the Embarcadero, we take the S2 cell the listing is situated in (539058204), and hash {'San Francisco', 539058204} → 71829521 to build our categorical feature. These categorical features are then mapped to an embedding, which feeds the NN. During training, the model infers the embedding with back propagation which encodes the location preference for the neighbourhood represented by the S2 cell, given the city query."*

**Why this works:** instead of treating location as a fixed coordinate, the model *learns* patterns in how users search. Someone searching "San Francisco" might favour different neighbourhoods (Union Square vs. Mission vs. Marina). The model discovers these preferences dynamically through backpropagation.

> 💡 *If you want to model location relevance, raw coordinates are rarely enough. Learn the neighbourhood preferences your users actually have.*

---

## 4. Deep Learning explainability

Applying deep learning is one thing. Understanding what happens when you apply it is something completely different.

I cannot stress the importance of trying to explain what your model is doing — not only for your own benefit to keep improving performance, but because stakeholders will either see it as *"I trust the magic box"* or *"This is dark magic and unless I can understand it, I will not trust it."*

### Permutation tests

A simple but powerful method: *"If randomly permuting a feature didn't affect model performance at all, it was a good indication that the model was probably not dependent on it."*

If shuffling a feature's values across examples has no impact on NDCG, that feature is effectively ignored by the model. This is a cheap way to identify dead weight.

### TopBot analysis — Airbnb's custom explainability method

This was developed in-house. Nothing Jose has heard of used anywhere else or open-sourced.

**How it works:**
1. Rank a test set
2. Plot the distribution of a feature for top-ranked vs. bottom-ranked listings
3. If the distributions are similar → the feature isn't playing a major role
4. If the distributions are different → the model is using this feature to drive relevance

**Examples:**
- **Review count** distribution was nearly identical for top vs. bottom-ranked listings → unimportant for ranking
- **Price** distribution was clearly different → the model was pushing more expensive listings toward the bottom

[Visual: chart | paper figure | TopBot example — review count vs price distributions for top vs bottom ranked listings]

---

## Summary

Neural networks are powerful, but making them work in production is a different challenge. Airbnb's journey showed that:

- **Start simple.** Deep learning isn't always better than traditional models right away.
- **Feature engineering still matters.** From normalisation to geo-location embeddings, the right transformations can make or break a model.
- **Embeddings require data.** 365 bookings/year per property is not enough. Match the tool to the data density.
- **Explainability is hard, but necessary.** Permutation tests and TopBot analysis help uncover what the model is really doing.

Deep learning is powerful, but the real magic isn't just in building models — it's in making them work at scale, explaining their decisions, and learning when to keep things simple. **That is the real lesson from Airbnb's journey.**
