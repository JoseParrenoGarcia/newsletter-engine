---
title: "How Airbnb Learned Listing Embeddings [Part 1]"
subtitle: "A deep dive into how Airbnb trained listing embeddings for real-time search personalisation — the mechanics, the adaptations, and the results."
author: Jose Parreño Garcia
published: 2026-02-14
source: https://joseparreogarcia.substack.com/p/airbnb-listing-embeddings-part-1
theme: paper-explainers
type: standalone
paper: "Real-time Personalization using Embeddings for Search Ranking at Airbnb"
paper_authors: Mihajlo Grbovic and Haibin Cheng
paper_venue: KDD 2018
---

# How Airbnb Learned Listing Embeddings [Part 1]

*A deep dive into how Airbnb trained listing embeddings for real-time search personalisation — the mechanics, the adaptations, and the results.*

---

## The paper

**"Real-time Personalization using Embeddings for Search Ranking at Airbnb"** by Mihajlo Grbovic and Haibin Cheng, presented at KDD 2018. Publicly available online.

This paper is Part 1 of a 2-part series. This post covers **listing embeddings** — how Airbnb learns a vector representation for each accommodation. Part 2 covers user embeddings and how the two are combined for personalisation.

---

## What will this post cover?

- What listing embeddings are and why they are useful
- How Airbnb framed click sessions as training data (the word2vec analogy)
- The skip-gram formulation and Airbnb's 3 key adaptations
- How cold-start listings are handled
- Offline evaluation results

---

## What are listing embeddings?

An embedding is a **dense vector representation** of an item. The idea is that similar items should end up close together in the vector space, and dissimilar items far apart.

For Airbnb, the goal is: if two listings are frequently clicked together in the same search session, they probably share some quality or intent — they should be close in embedding space. This representation can then be used to:

- Find similar listings
- Personalise search ranking based on a user's browsing history
- Handle cold-start problems for new listings

---

## Training data: click sessions as sentences

Airbnb treated each **search session as an ordered sequence of clicks** — directly analogous to a sentence in natural language processing.

Imagine a traveller clicks listings A, D, and E. That order matters. The hypothesis: listings that appear together in a session tend to be related in some way, even if the relationship is not obvious from metadata alone.

This is the same assumption underlying word embeddings:
- In language: "sweet" and "cake" co-occur far more often than "sweet" and "truck"
- In Airbnb: listings clicked together share implicit intent signal

So: **listings = words, sessions = sentences, proximity in the sequence = context.**

From a session like [A → D → E], the model constructs local training examples using a **sliding window** (window size 5 in the paper). Each clicked listing takes a turn as the "centre" item, and nearby clicked listings become its context. The model learns to make these co-occurrences more likely than arbitrary ones.

**Why skip-gram specifically?**
- Does not require labels
- Works with sparse data
- Focuses on local context (which is what early-session intent looks like)

---

## The base formulation: skip-gram with negative sampling

At a high level, the training objective is simple: *listings that appear together in click sessions should end up close in the embedding space, while unrelated listings should end up far apart.*

Airbnb formalises this with a **skip-gram objective with negative sampling** (Equation 3 in the paper):

For every positive pair (centre listing `l`, context listing `c`):
- The **dot product** of their vectors measures similarity — higher for listings that frequently appear close together
- A **sigmoid function** maps this to a probability-like value between 0 and 1
- **Negative samples** are random listings that did not appear in the session — the model learns to push these away

Geometrically: embeddings of listings clicked together get pulled closer; embeddings of random unrelated listings get pushed apart.

---

## Airbnb's 3 key adaptations

### Adaptation 1: Bookings as a stronger positive signal

Pure click-based training captures exploration behaviour — but clicks and bookings are very different signals. A user might click many listings but book only one.

**Airbnb's solution:** inject the booked listing as a globally positive example, regardless of its position in the session. The booked listing appears as a positive context for *every* other listing in that session — not just its local neighbours.

> *By injecting the booked listing as a stronger positive signal, Airbnb biases the embedding space toward outcomes, not just behaviour. Listings that lead to similar bookings are pulled closer together, even if their click paths differ slightly. This helps the model move beyond "things that look alike" toward "things that convert alike."*

### Adaptation 2: Market-aware negative sampling

In the original skip-gram, negative samples are drawn uniformly from the full vocabulary. In language, this works — random words are almost certainly unrelated. **In travel search, this breaks.**

Most searches are geographically concentrated. A traveller searching for Paris will click Paris listings. If you sample negatives uniformly across all listings, most negatives come from London, Berlin, New York — not from Paris. The model quickly learns an easy rule: "Paris listings should not look like non-Paris listings." That is not wrong, but it is not useful.

What Airbnb needs is a stronger distinction: *"Among listings in Paris, which ones should be preferred?"*

**Airbnb's solution:** add **market-aware negatives** — listings from the same city/market as the positive pair. This forces the model to learn fine-grained within-market distinctions, not just geographic separation.

- **Global negatives** prevent the embedding space from collapsing
- **Market-aware negatives** sharpen distinctions where they actually matter

The result is an embedding geometry that reflects both exploration and intent, and can discriminate meaningfully between listings competing within the same market.

### Adaptation 3: Cold-start — new listings with no history

Everything above relies on interaction data. But **new listings are added to Airbnb constantly** — some for the first time, others after a renovation. From the model's point of view, these listings do not exist yet.

**Airbnb's solution is deliberately simple:** borrow an embedding.

For a new listing, Airbnb finds existing listings that are similar in static metadata (location, price range, accommodation type, other attributes available at creation time). The new listing's embedding is initialised as the **weighted average embedding of its nearest metadata neighbours.**

> *Conceptually, this places the new listing into a sensible region of the embedding space — one that reflects what similar, known listings look like — without requiring any interaction history.*

This is not a permanent assignment. As the listing accumulates interactions, its embedding will be updated through the normal training process.

---

## How the embeddings were validated

### Visual validation — geography as a sanity check

Airbnb projected embeddings onto a map and confirmed that listings clustered by neighbourhood when visualised. This is an important sanity check: if the embedding space has learned something meaningful, geographically proximate listings should be nearby in the vector space.

[Visual: diagram | paper figure | embedding visualisation — listings projected onto a map showing geographic clustering as a sanity check]

### Offline evaluation — ranking accuracy

For each historical search session, Airbnb took the most recently clicked listing and a set of candidate listings including the one eventually booked. Using **cosine similarity** between embeddings, they ranked the candidates and recorded where the booked listing appeared in the ranking.

This was repeated across a large number of search, click, and booking events and aggregated by distance from click to booking. The chart shows results for 3 embedding variants (base skip-gram, + booking signal, + market-aware negatives) — each adaptation measurably improved ranking of the booked listing.

[Visual: chart | paper figure | offline evaluation results — ranking improvement from each embedding adaptation]

### Deployed first in "Similar Listings"

Before touching core search ranking, the embeddings were tested in **Similar Listings** — a feature that recommends alternative accommodations to users browsing a specific listing. This was the proving ground that established trust in the representations before they were applied to more critical surfaces.

---

## Summary

In this post, we walked through how Airbnb built, refined, and shipped listing embeddings as a production system:

1. **Base formulation:** treat click sessions as sentences, listings as words, train skip-gram with negative sampling
2. **Booking signal:** inject booked listing as globally positive to bias toward conversion, not just clicks
3. **Market-aware negatives:** force fine-grained within-market distinctions, not just geographic separation
4. **Cold-start:** new listings borrow embeddings from metadata-similar neighbours

The core mechanics stayed the same throughout. What changed was which interactions were allowed to exert force on the embedding space, and where those forces were applied.

**Key insight:** the quality of a representation learning system depends less on the model architecture and more on what you decide to treat as a signal, what you decide to treat as noise, and how you handle the edge cases that do not fit the standard formulation.

*Part 2 covers user embeddings and how listing + user embeddings are combined for real-time personalisation in search ranking.*
