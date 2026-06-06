# Paper Explainers — Post Cards

> **Agent note:** do NOT read pipeline artefacts or reference post PDFs. Use the `Path` in each card.

---

<!-- slug: ds-star-data-science-agent -->
<a name="ds-star-data-science-agent"></a>
### DS-STAR: How Google Built a Data Science Agent That Actually Works

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Audience** | Data scientists and ML engineers who work with or want to build agentic AI systems |
| **Topics** | `ds-star` `google` `agents` `data-science` `paper-explainer` |
| **Path** | `posts/ds-star-data-science-agent/long_draft.md` |

**Summary:** DS-STAR beats raw Gemini by 32 percentage points on data science benchmarks — not because of a better model, but because of a deterministic seven-module harness connecting every step of the DS lifecycle (Analyzer, Planner, Coder, Debugger, Verifier, Router, Finalyzer). The post is a full technical breakdown: system overview, deep dives into DS-STAR and DS-STAR+ with formulas and algorithms, the prompts Google published in Appendix L, ablation tests, and a worked example report. The central argument is that agent architecture matters more than model choice — a thesis drawn directly from the paper and mapped to real-world Claude Code experience.

---

<!-- path: reference_posts/standalone/paper-explainers/airbnbs-2013-location-model-lessons-in-feature-engineering.md -->
<a name="airbnb-location-model"></a>
### Airbnb's 2013 Location Model: Lessons in Feature Engineering

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Audience** | Data scientists and ML engineers interested in real-world feature engineering decisions |
| **Topics** | `airbnb` `feature-engineering` `paper-explainer` `search-ranking` |
| **Path** | `reference_posts/standalone/paper-explainers/airbnbs-2013-location-model-lessons-in-feature-engineering.md` |

**Summary:** One feature — location quality — made Airbnb's search smarter, and the path to get there is a masterclass in feature engineering. The post walks step by step through the evolution of Airbnb's location model: why Euclidean distance failed, how exponential decay improved it, how a sigmoid function combined centrality with supply, how conditional probability moved beyond geography, how normalisation solved position bias, and how a serendipity factor protected the long tail. The key takeaway is transferable: feature engineering is domain knowledge encoding, and getting it right can matter as much as the model architecture.

---

<!-- path: reference_posts/standalone/paper-explainers/how-airbnb-learned-listing-embeddings-part-1.md -->
<a name="airbnb-listing-embeddings-1"></a>
### How Airbnb Learned Listing Embeddings — Part 1

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Series** | Airbnb Search Personalisation — Part 1 of 2 |
| **Audience** | Data scientists and ML engineers building personalisation or search ranking systems |
| **Topics** | `airbnb` `embeddings` `paper-explainer` `search-ranking` `feature-engineering` |
| **Path** | `reference_posts/standalone/paper-explainers/how-airbnb-learned-listing-embeddings-part-1.md` |

**Summary:** Airbnb trained listing embeddings using Word2Vec applied to booking sessions — treating sequences of clicked listings like sentences and individual listings like words. The post covers the base skip-gram with negative sampling formulation, then Airbnb's three key adaptations that made it work for their domain: booked listing upweighting, global negative sampling, and using explicit positives rather than just session co-occurrence. Validation methodology is covered in detail. Part 2 extends the approach to user embeddings and the full real-time ranking pipeline.

---

<!-- path: reference_posts/standalone/paper-explainers/how-airbnb-learned-to-personalise-search-with-embeddings-part-2.md -->
<a name="airbnb-listing-embeddings-2"></a>
### How Airbnb Learned to Personalise Search with Embeddings — Part 2

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Series** | Airbnb Search Personalisation — Part 2 of 2 |
| **Audience** | Data scientists and ML engineers building personalisation or search ranking systems |
| **Topics** | `airbnb` `embeddings` `paper-explainer` `search-ranking` `feature-engineering` |
| **Path** | `reference_posts/standalone/paper-explainers/how-airbnb-learned-to-personalise-search-with-embeddings-part-2.md` |

**Summary:** User modelling is harder than listing modelling because users book infrequently and their preferences drift over time. Part 2 covers Airbnb's solution: user types and listing types trained on booking sequences with alternating type pairs, so the model learns preference at the type level rather than the individual listing level. Host rejections are incorporated as explicit negative signals. The post traces the full path from embeddings to ranking features to the production ranking pipeline — pragmatic, modular engineering that learns from sparse signals and turns them into measurable user value.

---

<!-- path: reference_posts/standalone/paper-explainers/how-airbnb-optimized-search-rankings-with-deep-learning.md -->
<a name="airbnb-deep-learning-ranking"></a>
### How Airbnb Used Deep Learning to Rank Listings

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Audience** | ML engineers and data scientists working on search ranking or recommendation systems |
| **Topics** | `airbnb` `deep-learning` `search-ranking` `paper-explainer` `feature-engineering` |
| **Path** | `reference_posts/standalone/paper-explainers/how-airbnb-optimized-search-rankings-with-deep-learning.md` |

**Summary:** Airbnb's deep learning ranking paper is as much about what didn't work as what did. The post covers four lessons from their experiments: starting simple with architecture (complexity didn't always help), where embeddings hit their limits, deep learning feature engineering best practices for production systems, and how they approached explainability for a model that stakeholders needed to trust. The recurring theme is that in production ML, understanding failure modes and keeping things interpretable often matters more than maximising offline metrics.

---

<!-- path: reference_posts/standalone/paper-explainers/what-airbnb-discovered-after-launching-deep-learning-model-for-ranking.md -->
<a name="airbnb-deep-learning-post-launch"></a>
### What Airbnb Discovered After Launching Their Deep Learning Model for Ranking

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Audience** | ML engineers and data scientists who have shipped models and want to understand post-launch optimisation |
| **Topics** | `airbnb` `deep-learning` `search-ranking` `paper-explainer` `feature-engineering` |
| **Path** | `reference_posts/standalone/paper-explainers/what-airbnb-discovered-after-launching-deep-learning-model-for-ranking.md` |

**Summary:** Launching a deep learning model is the beginning, not the end. This post covers Airbnb's post-launch discoveries: the user problem reframing ("is cheaper better?" turned out to be the wrong question), why multiple new models failed before ICE plots revealed the real issue, the two-tower architecture that finally solved the price sensitivity problem, the cold start problem for new listings, and how they eliminated position bias from training data. The biggest learning: once a powerful model is in place, further gains come from reframing the problem and improving diagnostics, not from fancier layers.
