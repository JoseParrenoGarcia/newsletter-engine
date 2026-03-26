---
title: "How Airbnb learned to personalise search with embeddings [Part 2]"
subtitle: "User types, listing types, host rejections, and how embeddings became real-time ranking features."
author: Jose Parreño Garcia
published: 2026-03-12
source: https://joseparreogarcia.substack.com/p/airbnb-listing-embeddings-part-2
theme: paper-explainers
type: standalone
paper: "Real-time Personalization using Embeddings for Search Ranking at Airbnb"
paper_authors: Mihajlo Grbovic and Haibin Cheng
paper_venue: KDD 2018
---

# How Airbnb learned to personalise search with embeddings [Part 2]

*User types, listing types, host rejections, and how embeddings became real-time ranking features.*

---

This is Part 2 of the Airbnb embeddings series. [Part 1](./how-airbnb-learned-listing-embeddings-part-1.md) covered listing embeddings — how Airbnb trained vector representations of accommodations using click sessions and skip-gram.

Part 2 focuses on the second half of Airbnb's personalisation system: **how guest intent is represented, learned, and used inside a real-time ranking pipeline.**

---

## What will this post cover?

- Why user modelling is fundamentally harder than listing modelling in travel
- How Airbnb avoided user-level sparsity with user types and listing types
- How booking histories were transformed into learnable sequences
- Why host rejections were injected into the embedding space
- From embeddings to behavioural signals in production ranking
- The full ranking pipeline

---

## Why user modelling is harder than listing modelling

In Part 1, listing embeddings worked because **click sessions provide dense interaction data** — users click many listings in a single search session, giving the model rich co-occurrence signal.

Users are the opposite problem:
- **Travellers book infrequently** — maybe 1-2 times per year
- **Many users are partly anonymous** — sessions without login state
- **Histories are short and noisy** — a few bookings spread across years don't tell a coherent story

Classic user embeddings (one vector per user ID) break down under these constraints. The vocabulary is enormous, the sequences are sparse, and the signal is unreliable.

---

## The solution: user types and listing types

Instead of learning one embedding per user, Airbnb introduced **user types** and **listing types** — many-to-one mappings that trade individual precision for learnability, stability, and memory efficiency.

### Listing types

Each listing is discretised into a categorical bucket based on static attributes:

```
Entire Home listing from US, 2 person capacity, 1 bed, 1 bedroom, 1 bathroom,
Average Price Per Night $60.8, Average PPG $29.3, 5 reviews, all 5 stars,
100% New Guest Accept Rate

→ listing_type = US_lt1_pn3_pg3_r3_5s4_c2_b1_bd2_bt2_nu3
```

### User types

Similarly, each user is mapped to a categorical bucket based on observable attributes — location, device, language, profile completeness, booking history statistics:

```
User from San Francisco, MacBook, English, full profile with photo,
83.4% average Guest 5-star rating, 3 past bookings,
average booked listing stats: $52.52 PPG, $31.85 PPGPG, 2.33 capacity, 8.24 reviews

→ user_type = SF_lg1_dt1_fp1_pp1_nb1_ppn2_ppd3_c2_nr3_l5s3_g5s3
```

**Why this works:** many individual users map to the same user type. The space is bounded, shared across many travellers, and grows slowly compared to the user base itself. Crucially, **new users do not introduce new user types** — they are simply mapped to an existing bucket. Cold-start is solved by design.

---

## Training: booking sequences with alternating types

With user types and listing types defined, Airbnb constructs training sequences by **alternating between them**:

```
user_type_A → listing_type_1 → user_type_B → listing_type_2 → ...
```

This allows the skip-gram objective (from Part 1) to work even when individual bookings are rare. The model learns which user types tend to book which listing types, and the resulting embedding space captures both guest preferences and listing characteristics in a **shared vector space**.

Because they share the same space, you can directly compute cosine similarity between a user type vector and a listing type vector — the foundation for personalised ranking.

---

## Host rejections as negative signals

Bookings contain an important piece of information that click sessions do not: **explicit negative feedback from hosts**.

When a host rejects a guest's booking request, it signals a mismatch — the listing was not the right fit for that guest (or vice versa). Airbnb **injected host rejections as negative signals** during training, alongside the positive booking signal.

This shaped the embedding space to not just capture "what works" but also "what fails" — pushing guest types and listing types apart when they historically reject each other.

> *The geometry captured not just what worked, but also what failed.*

---

## From embeddings to ranking features

At inference time, embeddings do not feed directly into the ranking model. They are first **transformed into scalar similarity features**.

### EmbClickSim — short-term intent

During an active search session, Airbnb tracks which listings the user has clicked. For each candidate listing being ranked, they compute the **cosine similarity** between the candidate's listing embedding and the embeddings of recently clicked listings.

This scalar — `EmbClickSim` — captures **short-term intent**: what the user seems to be interested in *right now* in this session.

### EmbBookSim — long-term preference

Similarly, Airbnb computes cosine similarity between the candidate listing's type embedding and the user's type embedding (derived from their booking history). This captures **long-term preference**: what the user has historically tended to book.

These scalars are then injected as features into the main ranking model.

---

## The full ranking pipeline

The final ranking model combines multiple feature families:

| Feature family | Examples |
|----------------|----------|
| Listing features | price, capacity, room type, rejection rate |
| Query features | dates, number of guests, length of stay, lead time |
| User features | historical averages (booked price, guest rating) |
| Cross-features | capacity fit, price difference, rejection probability |
| **Embedding features** | **EmbClickSim, EmbBookSim** (as scalars) |

**The ranking model itself:** a Gradient Boosted Decision Tree (GBDT) trained with a LambdaRank objective. Offline evaluation uses NDCG on held-out search sessions. The model is retrained regularly using the most recent 30 days of data.

**What is notable here is not the sophistication of the ranking model — it is a simple GBDT.** What is notable is the discipline of the system design: embeddings are trained separately, aggregated simply, and injected as first-class features. The ranking model then learns how to combine short-term intent, long-term preference, and classical features — **without any end-to-end black-box optimisation.**

The result is a system that is expressive, scalable, and crucially, **explainable**.

---

## Summary

The full loop, closed:

1. **Listing embeddings** (Part 1): train skip-gram on click sessions, add booking signal, use market-aware negatives, handle cold-start via metadata similarity
2. **User types and listing types** (Part 2): discretise users and listings into manageable buckets, train joint embeddings from booking sequences
3. **Host rejections**: inject as negative signal to capture what fails, not just what succeeds
4. **EmbClickSim + EmbBookSim**: transform embedding geometry into scalar ranking features
5. **GBDT + LambdaRank**: combine all features in a simple, interpretable ranking model

**Key architectural insight:** the system never tries to do everything in one model. Representation learning (embeddings) and decision making (ranking) are deliberately separated. Each step is interpretable. Each can be improved independently.

This is the kind of production machine learning that actually ships — not the elegant end-to-end deep learning system you might design from scratch, but a pragmatic, modular pipeline that learns what it can from sparse, noisy signals and turns it into measurable user value.
