# Notes: Google TabFM

> Research dossier: see `google_tabfm_cleaned.md` in this folder — full technical briefing, source trust rankings, family tree, benchmark analysis, and suggested narrative arc.

---

## Brainstorm Summary

This post tells the history and current state of tabular foundation models, culminating in Google TabFM. The core argument is that tabular ML has been stuck under GBDT dominance for years — not because no one tried deep learning, but because early neural approaches (TabNet, FT-Transformer, SAINT, etc.) failed to beat well-tuned trees reliably on real datasets. The shift happened when researchers reframed the problem: instead of training a neural net on one table, pretrain a model across many tasks so it learns a reusable prediction procedure.

TabPFN was the conceptual breakthrough (Nature paper, synthetic pretraining + in-context learning). TabICL made it scale. TabDPT showed real data pretraining helps. Google TabFM combines these ideas — row/column attention from TabPFN, efficient row compression + ICL from TabICL — into an official, scikit-learn-compatible release trained on hundreds of millions of synthetic SCM-generated datasets.

The post contextualises Google's benchmark claims honestly. TabArena is a solid living benchmark, but TabFM-Ensemble (with cross features, SVD, 32-way ensemble, Platt scaling) is not the same thing as pure zero-shot TabFM. No standalone peer-reviewed paper exists at time of writing — Google's own blog and GitHub are the primary sources. That matters for how we frame the evidence.

The honest conclusion: foundation tabular models are now a credible first attempt on small-to-medium datasets, and practitioners should try them. But GBDTs remain strong where cost, latency, interpretability, large data, and production simplicity matter. The reader should leave knowing when to reach for TabFM, when to stick with XGBoost, and why the right move is to benchmark rather than trust leaderboards.

The tone is calibrated optimism with a healthy dose of "don't get burned by hype" — the same stance as the open-source models post, but applied to the tabular space.

## Rough Table of Contents

> Additional deep-dive source material: `tabfm_repo_investigation.md` (architecture, inference, ensemble, caveats from code) and `tabpfn_paper_investigation.md` (TabPFN-3 paper deep-dive) — both in this folder.

- **The old kingdom** — why trees ruled tabular ML; Grinsztajn et al. NeurIPS 2022: across 45 datasets, tree-based models remained SOTA on medium tabular data; three specific reasons NNs struggle: robustness to uninformative features, preserving feature orientation, learning irregular functions
- **The false dawn** — early deep tabular architectures (TabNet, TabTransformer, SAINT, FT-Transformer / Gorishniy et al. NeurIPS 2021); FT-Transformer and ResNet looked strong but no universally superior DL solution emerged; the fundamental problem: heterogeneous columns, varying semantics across datasets, unlike stable token meaning in NLP
- **The reframing** — what a tabular foundation model actually is; in-context learning for tables: pretrain weights fixed, training rows become context not gradient signal, test rows predicted in the same forward pass; the key shift from "train on one dataset" to "learn a prediction algorithm across many datasets"; include the comparison table (XGBoost fit/predict vs TabFM context-based workflow)
- **The family tree** — four branches each solving a different problem:
  - TabPFN: the breakthrough — synthetic SCM pretraining, single forward pass, Nature paper; Stage 1 column-wise embedding, Stage 2 row compression to CLS vectors, Stage 3 ICL over row embeddings; trained on >8 trillion tokens of synthetic data; strong up to ~10k rows
  - TabPFN-2.5/3: scaling the TabPFN line — up to 50k rows/2k features; Muon optimiser, scalable softmax; TabArena Elo 1673 (default, single pass) vs AutoGluon 1695 (4h ensemble)
  - TabICL/v2: making ICL scale — replaces full row/column attention with fixed-dimensional row embeddings + transformer over embeddings; scales to 100k rows, 2k features; Muon optimiser; surpasses RealTabPFN-2.5 on TabArena without tuning; fully open weights
  - TabDPT (NeurIPS 2025): real data pretraining branch — ICL + retrieval + self-supervised learning on real tabular corpora; shows real data improves generalisation beyond synthetic-only priors; scaling behaviour confirmed
- **Google TabFM: what it is and how it works** — exact 4-stage pipeline:
  1. Cell embedding: `CellEmbedder` groups each feature with shifted neighbours (group size 3), enriching each token before projection (`embed_dim=256`)
  2. Column attention (3 blocks, 4 heads, 256 inducing vectors): Set Transformer — inducing vectors attend to training rows per column, then all rows attend to induced summary; captures column-level statistics without full quadratic attention
  3. Row attention (3 blocks, 8 heads): rows attend across feature tokens to capture cross-feature interactions
  4. Row compression + ICL transformer: rows compressed to 8 CLS tokens (`row_num_cls=8`), then 24-block ICL transformer (`icl_num_blocks=24`, 8 heads) where training-row embeddings attend to each other and test-row embeddings attend to training rows
  - Training: hundreds of millions of synthetic SCM datasets; generator code not public; objective: cross-entropy (classification) / RMSE (regression); parameter count not published
  - "Single forward pass" explained precisely: weights never updated on the downstream dataset; training rows are context, not gradient signal; `.fit()` only prepares encoders and scalers
  - scikit-learn compatible; supports classification and regression; JAX and PyTorch backends
- **TabFM vs TabFM-Ensemble** — not a different model; same frozen backbone with wrapper overrides: `n_estimators=32`, feature crosses (√n), SVD features (√n), NNLS weighting, Platt scaling (classification) / vector calibration (multiclass); feature shuffling per member for diversity; normalization diversity across members; this is what Google's headline benchmark numbers use — must be stated clearly
- **The benchmark question** — TabArena: 51 curated IID datasets, 27+ methods, living benchmark; BeyondArena extends to temporal and grouped tasks (TabFM's IID wins do not automatically transfer); AI Multiple independent benchmark (19 datasets): TabFM wins all 6 size/feature-type regimes, mean rank 1.42, 15 outright wins; no peer-reviewed TabFM paper at time of writing — primary sources are Google blog and GitHub only
- **When TabFM wins, when GBDTs still win** — TabFM wins: small/medium data (under ~50k rows), hybrid feature types, low-tuning workflows, fast baselines; cost: ~40× TabPFN-3's compute, datacenter GPU required; GBDTs still win: CPU inference, strict latency, millions of rows, custom objectives/monotonic constraints, interpretability requirements, conservative production governance
- **Gotchas and production caveats** — hard limits: max 500 features, max 10 classes; no hard row limit but designed for 40GB GPU; 20+ minute cold-start JAX compile; inference latency: AI Multiple reports 173.6s average per fold (worst case 893s on 48k-row dataset); cuBLAS bug on CUDA 12 (one run discarded in independent benchmark); $27 GPU cost vs $0.65 for TabPFN-3 on same 19-dataset benchmark; pretraining prior mismatch risk for unusual domains; governance immaturity vs mature GBDT tooling
- **The right stance** — benchmark it yourself with disciplined methodology (stratified splits, matching tuning budgets, ROC-AUC not just accuracy); don't conflate TabFM-Ensemble leaderboard results with zero-shot TabFM; preview what Post 2 will cover (hands-on evaluation)
- **Where this goes** — AutoML default learners, fast baselines, data agents, enterprise analytics (BigQuery AI.PREDICT integration announced); the direction of travel is clear even if not fully there yet
