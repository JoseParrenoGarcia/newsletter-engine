# XGBoost is not dead. But tabular foundation models are finally serious.

On June 30, 2026, Google Research published [TabFM](https://research.google/blog/tabfm-tabular-foundation-models/), a tabular foundation model released with a scikit-learn-compatible API, pretrained weights, and a GitHub repo. No paper accompanied the release — the primary public record is the blog post and the code. That detail matters, and we will return to it.

To understand why this release is worth taking seriously, you have to understand what it is pushing against. Tabular data is the format that most practising data scientists actually work with every day — structured rows and columns, mixed types, messy features. For roughly a decade, the algorithm that won on that format, consistently, was gradient-boosted decision trees. XGBoost, LightGBM, CatBoost. Deep learning made repeated advances on images, text, and audio. On tables, it mostly did not. Not for lack of effort, and not because researchers were unaware of the problem. The architectures were built, benchmarked, and published. They just did not reliably beat well-tuned trees in practice.

TabFM is not another "let us apply a transformer to CSV files" attempt. The framing has shifted. The approach is different in kind: pretrain a model across many tasks so it learns a reusable prediction procedure, then at inference time, treat the training rows as context rather than gradient signal. No weights are updated when you call `.fit()`. The model arrives already knowing how to predict — it just reads your data to understand this specific problem.

That shift is the thing worth paying attention to. The question is not whether the idea is novel — it is not, and this post will trace the researchers who built it up. The question is whether it works well enough, in enough real settings, that practitioners should change their default approach. The honest answer is: it depends, and the right move is to benchmark it on your data, not trust a leaderboard.

TabFM packages the field's best ideas into something practitioners can finally try. But calibrated optimism, not hype, is the appropriate response.

---

## What will we cover in this post?

- **Why did gradient-boosted trees dominate tabular ML for so long?** The peer-reviewed evidence for GBDT dominance and the three specific reasons neural networks struggled.
- **Why did early deep learning models for tables mostly fail?** TabNet, TabTransformer, SAINT, FT-Transformer — what went wrong and why.
- **What is a tabular foundation model, and why is the framing different?** The conceptual shift from per-dataset training to in-context learning.
- **How did we get from TabPFN to Google TabFM?** The four-branch family tree and what each branch contributed.
- **How does Google TabFM actually work?** The exact four-stage architecture, what `.fit()` does and does not do, and the training setup.
- **What is TabFM-Ensemble, and why does it matter for reading the benchmark?** Why the headline numbers and the zero-shot numbers are not the same thing.
- **What does the TabArena benchmark evidence actually show for TabFM?** TabArena, independent evaluations, and where the honest gaps are.
- **When should you reach for TabFM, and when should you stick with XGBoost?** A practical framework for the decision.
- **What are the production gotchas you won't find in the blog post?** Hard limits, latency, GPU requirements, and class constraints.
- **What is the right way to evaluate TabFM before trusting it?** Methodology for a disciplined comparison on your own data.
- **Where does tabular ML and foundation model research go from here?** What the trajectory of this field suggests about the next few years.

---

## Why did gradient-boosted trees dominate tabular ML for so long?

This is not folklore — it is a peer-reviewed finding. Grinsztajn et al. (NeurIPS 2022) ran a systematic benchmark across 45 datasets, applied extensive hyperparameter tuning to both tree-based models and neural networks, and found that tree-based methods remained state-of-the-art on medium-sized tabular data. Even setting aside the speed advantage trees have, trees were more accurate.

The [Grinsztajn et al. paper (arXiv 2207.08815)](https://arxiv.org/abs/2207.08815) goes further than just reporting the result. It identifies three structural reasons neural networks struggled on this format:

**Robustness to uninformative features.** Real datasets contain columns that provide no signal for the target — noise variables, proxies, redundant encodings. Decision trees handle these gracefully because splits on uninformative features are not chosen. Neural networks, particularly early tabular architectures, tend to overfit to noise, especially with limited data. Adding regularisation helps, but the benefit is inconsistent.

**Preserving feature orientation.** Trees make axis-aligned splits: is column A greater than threshold T? This is a natural fit for tabular data, where many relationships between features and targets are genuinely piece-wise or threshold-like. Neural networks learn smooth, rotation-invariant functions. That is a strength in vision and language, where rotating a representation does not destroy its meaning. In tabular data, where each column has a fixed, domain-specific interpretation, rotation-invariance is a liability.

**Learning irregular functions.** Tabular targets often depend on the data through highly irregular, non-smooth mappings. A tree ensemble can represent those patterns directly through its split structure. Fitting them with gradient descent on a neural network requires the architecture to carve out the right function class, which takes more data, more regularisation, and more tuning to get right.

These are not incidental findings. They explain why "just add attention" does not automatically improve over a well-tuned LightGBM. The gradient-boosted tree is not some legacy relic — it is precisely the right inductive bias for a large class of real tabular problems. Any new approach needs a concrete answer to each of these three challenges.

---

## Why did early deep learning models for tables mostly fail?

The architectures published between roughly 2019 and 2022 represent serious research. TabNet introduced sparse sequential attention to select features at each decision step. TabTransformer applied self-attention to categorical embeddings. SAINT used inter-sample attention in addition to feature-level attention — it literally attends across rows as well as columns. FT-Transformer, introduced by Gorishniy et al. (NeurIPS 2021), built a clean, well-tuned Transformer adaptation for tabular data and also introduced a strong ResNet baseline.

The [Gorishniy et al. paper (arXiv 2106.11959)](https://arxiv.org/abs/2106.11959) is honest about what it found: FT-Transformer was competitive with the best tree-based methods on some datasets, but no single deep learning architecture was universally superior. Their conclusion — "there is still no universally superior DL model for tabular data" — has aged well. It is still true as a general statement, though the distribution of "some datasets" has improved with newer methods.

Why did these models struggle despite genuine architectural sophistication? The fundamental problem is that tabular columns are heterogeneous in ways that break the assumptions that make transformers work so well in NLP.

In language, a token embedding carries a relatively stable meaning across documents. The word "bank" can mean different things in different sentences, but the token itself is drawn from a consistent vocabulary and its representation can be trained to be general. In tabular data, a column called "value" in one dataset might represent dollars, in another a sensor reading, in a third a count of events. The number 1000 in a revenue column has a completely different statistical relationship to the target than the number 1000 in a latitude column. The same value in the same column across two different tables may mean entirely different things.

This is a deeper problem than semantics. A model trained on one tabular dataset cannot straightforwardly transfer features learned there to another dataset. Each fit starts from scratch. That eliminates the key advantage pretraining provides in NLP: the ability to build shared representations that generalise across tasks.

TabNet, TabTransformer, SAINT, and FT-Transformer are genuinely useful papers. They clarified what was possible with deep learning on tables and set up the benchmarks that later work would beat. But they were still fundamentally per-dataset models — fit, tune, predict — and on most well-tested real datasets, a well-tuned XGBoost was at least competitive and usually faster.

---

## What is a tabular foundation model, and why is the framing different?

The shift that makes tabular foundation models conceptually distinct is not architectural. It is epistemological. The question being answered changed.

The old question was: can we build a better neural network to train on a single tabular dataset?

The new question is: can we pretrain a model across enough synthetic prediction tasks that it arrives at any new dataset already knowing how to predict?

That reframing has a concrete implication. If a model has seen a large enough and diverse enough distribution of prediction problems during pretraining, then when you hand it a new dataset it has never seen, it can treat your training rows as context — examples of the pattern it should generalise — and produce predictions for test rows without ever taking a gradient step on your data.

Here is the difference in practice:

| Traditional ML | Tabular foundation model |
|---|---|
| Fit XGBoost on this dataset | Give the pretrained model the dataset as context |
| Learn parameters per dataset | Keep pretrained weights fixed |
| Tune hyperparameters | Usually no tuning, or much less |
| Feature engineering often required | Model tries to infer useful interactions |
| Predict after training | Predict from train + test context in one pass |

The phrase "single forward pass" refers to this: the model receives labelled training rows and unlabelled test rows together as input. It outputs predictions for the test rows without performing any gradient updates. No backpropagation. No weight change. The inference step and the "learning" step are the same operation — the model reads the training examples and attends to them while producing test predictions.

The model does not "know" your dataset in any stored sense. It does not have a memory that persists between calls. What it has is a learned prediction procedure — a set of weights that, after seeing enough synthetic tasks during pretraining, generalise across datasets well enough to be useful on new ones.

Think of it this way. The traditional approach is like hiring a specialist who trained for years on one domain: strong there, but they need to re-learn from scratch in every new domain. A tabular foundation model is more like a researcher who has worked across dozens of fields — they have not seen your specific problem before, but they have developed a pattern-recognition capacity that transfers. They read your data, identify the structure, and start predicting well without months of domain-specific training.

That analogy has limits. The "pattern recognition" is entirely statistical — the model has no domain knowledge, no understanding of what columns mean, no ability to ask clarifying questions. It cannot reason about causality or business logic. What it has is strong priors over the distribution of tabular prediction problems, built from synthetic data rather than real-world examples. Whether those priors match your specific domain is an empirical question, and "benchmark it yourself" is the only honest answer.

---

## How did we get from TabPFN to Google TabFM?

Four research branches, each addressing a different failure mode: TabPFN proved in-context learning works on tables, TabPFN-2.5/3 pushed the row limit to 50k, TabICL and TabICLv2 replaced expensive full attention with row compression to scale to 100k rows, and TabDPT demonstrated that real tabular pretraining data improves generalisation beyond synthetic-only priors. Google TabFM is not where the story begins — it is where those threads converge, borrowing row compression from TabICL and in-context learning from TabPFN, and packaging the result into an officially supported scikit-learn-compatible release.

### TabPFN — the conceptual breakthrough

The problem TabPFN set out to solve was whether in-context learning was even possible for tabular prediction. Could a model trained on synthetic data do tabular prediction by treating training rows as context?

The answer, published in [Nature (Hollmann et al.)](https://www.nature.com/articles/s41586-024-08328-6), was yes.

TabPFN's architecture processes data in three stages. In the first stage, each feature column is embedded independently using a transformer with inducing-point attention — this captures column-level statistics without requiring quadratic attention over all rows. In the second stage, each row is compressed into a small number of CLS-like vectors, reducing the variable-length feature sequence to a fixed-dimension row embedding. In the third stage, an ICL transformer receives all row embeddings — training and test rows together — and test rows attend to training rows to produce predictions.

The pretraining used more than 8 trillion tokens of synthetic data generated from structural causal models (SCMs). SCMs produce datasets by sampling a directed acyclic graph, computing node values in topological order, and selecting features and targets from the output — this mimics the kind of causal and correlational structure found in real tabular data without using any real-world datasets.

TabPFN worked. On small datasets (up to roughly 10,000 rows), it was competitive with AutoML pipelines in a single forward pass. That is not a small result — it was the first clean proof that the in-context learning paradigm transfers to tables.

The limit was scale. ~10k rows is too small for most production datasets.

### TabPFN-2.5 and TabPFN-3 — scaling the line

The obvious next question was whether the approach could be pushed to larger datasets. TabPFN-2.5 and TabPFN-3 scaled the original architecture to handle up to 50k rows and 2k features. This required the Muon optimiser (replacing AdamW) and scalable softmax in attention to manage memory at larger context lengths.

On TabArena — the most rigorous independent tabular benchmark available — TabPFN-3 in default configuration (single forward pass, no tuning) achieves an Elo of 1673. AutoGluon running a 4-hour ensemble achieves 1695. That is a meaningful gap closed: a single-pass, zero-configuration model matching a heavily-resourced AutoML system to within 1%.

### TabICL and TabICLv2 — making ICL scale

TabPFN's approach has an architectural cost. Running full row/column attention over the entire table is O(T²) in the number of rows. At 10k rows that is manageable; at 100k rows it is not.

[TabICL (Qu et al., ICML 2025)](https://arxiv.org/abs/2502.05564) addressed this by changing the scaling strategy. Instead of running attention over the raw feature matrix, TabICL first encodes each row into a fixed-dimension embedding, then runs the ICL transformer over those row embeddings. This is a much cheaper operation — the cost of building row embeddings is roughly linear in the number of features, and the ICL step then operates on compact vectors rather than full feature sequences.

[TabICLv2 (Qu et al., Feb 2026)](https://arxiv.org/abs/2602.11139) extended this further: a new synthetic data generation engine, the Muon optimiser, and scalable softmax in attention. TabICLv2 without any tuning surpasses RealTabPFN-2.5 (which uses tuning, ensembling, and real-data fine-tuning) on both TabArena and TALENT. It generalises to million-scale datasets within 50GB of GPU memory. The weights are fully open.

This is the architectural idea Google TabFM directly borrows: row compression to fixed-dimension vectors, followed by an ICL transformer over those vectors.

### TabDPT — the real-data branch

A parallel research question ran alongside the scaling work: does pretraining on purely synthetic data generalise well enough?

[TabDPT (Xu et al., NeurIPS 2025)](https://arxiv.org/abs/2410.18164) explored the alternative. It combines ICL-based retrieval augmentation with self-supervised learning on real tabular corpora, rather than purely synthetic SCM data. The finding was that real tabular data does improve downstream generalisation beyond what synthetic-only priors achieve, and that performance scales predictably with both model size and the quantity of pretraining data.

TabDPT represents the "synthetic priors alone may not be enough" branch of the family tree. Google TabFM does not appear to use real tabular pretraining data — the model card states synthetic SCM pretraining, and the generator code is not public. Whether that is a limitation will become clearer as evaluation data accumulates.

### The synthesis

Google TabFM is not a revolution. It is a synthesis. It takes the core in-context learning approach from TabPFN, the row compression + ICL scaling architecture from TabICL, and applies synthetic SCM pretraining — the approach proven across the whole family. Understanding that lineage is understanding why TabFM looks the way it does. It is not a fresh start; it is the field's current best ideas packaged into an official, scikit-learn-compatible release.

---

## How does Google TabFM actually work?

Google TabFM processes a table in four sequential stages: cell embedding (each feature value is embedded alongside its local neighbours), column attention (a Set Transformer captures per-column statistics using inducing-point attention), row attention (cross-feature interactions within each row), and finally row compression plus an ICL transformer (each row is reduced to 8 CLS vectors, then training and test rows attend to each other to produce predictions in one forward pass). No weights are updated during `.fit()` — all learning happened during pretraining on hundreds of millions of synthetic datasets.

The architecture has four stages. What follows is grounded in the released code and model card, not the blog post — the blog post is accurate in spirit but imprecise on detail.

### Stage 1: Cell embedding

Before any attention runs, each feature value is embedded by the `CellEmbedder`. The key detail here is feature grouping. When `feature_group_size=3`, each output feature token is built from a 3-slot local neighbourhood: the feature itself and its shifted neighbours at offsets 0, 1, and 3. Each cell token therefore encodes information from adjacent features, rather than a single scalar.

The number of feature tokens is not increased — the grouping enriches each token before projection. The output is one embedding vector per feature per row, with `embed_dim=256`.

### Stage 2: Column attention

The `ColEmbedding` module then runs independently across each feature column. It reshapes the input so that all rows for one column are processed together, and applies a Set Transformer with inducing-point attention.

The config here is `col_num_blocks=3`, `col_nhead=4`, `col_num_inds=256`. The 256 learned inducing vectors attend to all training rows in that column first; then all row queries attend to the induced summary. This two-step design captures per-column statistics — distribution shape, scale, outliers — without the quadratic cost of full pairwise attention across all rows.

The inducing vectors are shared learned parameters. They act as a compressed column summary the model can condition on. A column containing mostly zeros with occasional large spikes looks different from a column with a stable Gaussian distribution, and this stage encodes that difference explicitly.

After Stage 2, 8 learned CLS tokens are prepended to every row, giving each row `H + 8` tokens (where H is the number of features).

### Stage 3: Row attention

The `RowInteraction` module runs across feature tokens within each row. Config: `row_num_blocks=3`, `row_nhead=8`.

The terminology here requires care. "Row attention" in the TabFM codebase means attention across the feature tokens (columns) within a single row — it is capturing cross-feature interactions, asking which column combinations are informative for the prediction. It is not, at this stage, attention across different rows of the dataset.

The column and row attention alternate. The released model performs column → row → column → row, with 3 blocks in each pass. By the end of these four passes, each row has a rich representation that incorporates both per-column statistics (from column attention) and cross-feature interactions (from row attention).

### Stage 4: Row compression and the ICL transformer

After the alternating attention passes, each row's representation is compressed. The second row-attention pass is configured with `output_full=False`, returning only the 8 CLS token outputs rather than the full feature sequence. Each row is now represented by `row_num_cls=8` fixed vectors — regardless of how many features the dataset has.

These compressed row representations feed into the ICL transformer: `icl_num_blocks=24`, `icl_nhead=8`.

In-context learning happens here. Training rows' CLS vectors attend to each other. Test rows' CLS vectors attend to training rows' CLS vectors. The model reads the pattern in the training examples — the relationship between features and labels — and propagates it to the test rows. Predictions emerge from this attention pattern.

The important point: this attention step is the only place where training labels influence the prediction. The model does not receive labels during Stages 1–3. Only in the ICL transformer do training rows contribute their label information to the test predictions, through the attention mechanism.

### What `.fit()` actually does

When you call `clf.fit(X_train, y_train)`, no gradient computation happens. The foundation model weights are not updated — not a single parameter changes. What `.fit()` actually does is prepare the column encoders (handling categorical features, missing values) and fit numerical scalers. Then the training rows are stored, to be used as context when `.predict()` is called.

The learning — in the deep learning sense of weight updates — happened entirely during pretraining, on hundreds of millions of synthetic SCM-generated datasets. The generator code is not public. The model card describes the pretraining data as "hundreds of millions of dynamically generated synthetic tabular datasets" and specifies separate classification and regression checkpoints, trained with cross-entropy and RMSE loss respectively. Exact parameter count is not published.

### Backends and compatibility

The model ships with both a JAX backend and a PyTorch backend, and the public API is scikit-learn compatible — `TabFMClassifier` and `TabFMRegressor` implement `.fit()`, `.predict()`, and `.predict_proba()`. Both backends produce identical results; the JAX backend tends to be faster on TPUs and JAX-native hardware, while the PyTorch backend will be more familiar to most ML practitioners.

The architecture config imposes hard limits: `max_classes=10` for classification (the model's ICL decoder is bounded by this at training time) and a maximum of 500 features. These are not soft recommendations — they are architectural constraints from the pretrained checkpoint. Exceeding them requires either feature selection before calling `.fit()` or using the ensemble wrapper, which handles some of these limits differently.

---

## What is TabFM-Ensemble, and why does it matter for reading the benchmark?

When you read Google's headline benchmark numbers — the ones showing TabFM ahead of XGBoost and CatBoost on TabArena — you are not looking at a single forward pass of the base model. You are looking at TabFM-Ensemble. That distinction is not buried in a footnote; the blog post does mention it. But it is easy to gloss over, and the implications are worth spelling out.

TabFM-Ensemble is not a different model or a separate checkpoint. It is a wrapper preset built on the same frozen backbone. What changes is the configuration passed to `TabFMClassifier.ensemble()`: 32 estimators, each receiving a shuffled feature order via `FeatureShuffler(method="random")` and varied normalisation across members. Half the members get cross-feature terms appended (`n_feature_crosses="sqrt"` — up to `sqrt(n_cols)` interaction columns), and half get truncated SVD features built from one-hot-encoded categoricals and scaled numerics (`n_svd_features="sqrt"`). Ensemble weights are not uniform — they are learned from out-of-fold predictions by non-negative least squares (`enable_nnls=True`) and blended with uniform weights at `nnls_beta=0.75`. For classification, Platt scaling is applied on binary tasks and vector scaling on multiclass (`binary_calibration_method="platt"`, `multiclass_calibration_method="vector"`). The regression variant uses the same setup minus calibration.

Every one of these components — ensembling, feature augmentation, probability calibration, learned ensemble weighting — is standard, legitimate ML engineering. None of it is exotic. The problem is not that TabFM-Ensemble is unfair. The problem is that "TabFM" in a benchmark headline and "XGBoost default" are not the same level of setup. A fair comparison matches tuning budgets: TabFM-Ensemble vs a well-tuned XGBoost ensemble, not TabFM-Ensemble vs a single XGBoost fit at default hyperparameters.

Keep that in mind when interpreting any number in the next section.

---

## What does the TabArena benchmark evidence actually show for TabFM?

TabArena is the most rigorous public tabular benchmark available right now. It covers 51 curated IID datasets, tests 27+ methods under standardised protocols, and is explicitly living — results update as new methods are added. The paper also introduces BeyondArena, which extends evaluation to temporal and grouped splits rather than the standard IID assumption. That extension matters: strong IID performance does not automatically predict strong performance on time-series or group-based splits. The full methodology is in [Erickson et al. (arXiv 2506.16791)](https://arxiv.org/abs/2506.16791).

The TabArena paper is candid about what drives rankings. Protocol choices — time budget, ensembling configuration, tuning depth — affect final standings as much as architectural differences. A method that looks weak under a one-minute budget can look very competitive given four hours and post-hoc ensembling. This is not a criticism of the benchmark; it is the benchmark doing its job honestly. It means that comparing raw Elo scores across configurations requires knowing which configuration produced which number.

The [AI Multiple independent benchmark](https://aimultiple.com/tabular-models) ran 8 models across 19 datasets with cross-validated folds and produced some of the cleanest third-party numbers available. Across all six size/feature-type regimes it tested, TabFM held the top position, with a mean rank of 1.42 and 15 outright wins. The small-data regime (under 1,000 rows) was the most striking: foundation models occupied the top four slots. In the medium regime (1,000–10,000 rows), TabFM averaged 85.3% ROC-AUC against CatBoost's 83.4%. Even in the large-data regime (above 10,000 rows), TabFM led.

Two honest caveats sit alongside those numbers. First, there is no peer-reviewed TabFM paper at time of writing. The primary evidence for the model's performance comes from Google's own blog post and GitHub repository. That does not make the results wrong — the AI Multiple benchmark is independent confirmation — but it means the claims have not gone through the scrutiny of external reviewers with full access to the training setup and data. Second, TabFM's IID benchmark results tell you nothing about temporal or grouped tasks. BeyondArena extends TabArena to those settings, but TabFM-specific results on that split are not yet widely reported.

The TabArena paper itself is measured in its conclusions: gradient-boosted trees remain strong practical contenders, foundation models show the clearest advantage on smaller datasets, and the gap between the two narrows as data volume grows and tuning budgets expand. That summary matches the independent evidence. Knowing what the benchmark shows is one thing. Knowing whether it applies to your specific dataset is a separate question.

---

## When should you reach for TabFM, and when should you stick with XGBoost?

There is no universal answer, but the evidence points clearly enough that a decision heuristic is defensible.

**TabFM is worth trying first when:**

- Your dataset has under roughly 50,000 rows. The advantage is clearest here and shrinks as row count grows.
- Features are mixed numerical and categorical. TabFM handles this natively without extensive preprocessing pipelines.
- You want a strong baseline quickly, without hyperparameter tuning. A single `TabFMClassifier().fit(X, y)` is a legitimate starting point.
- You are working with thin-data segments where GBDTs cannot fit reliably. The [insurance pricing case from Burning Cost](https://burning-cost.github.io/2026/03/13/insurance-tabpfn/) shows TabPFN (the direct predecessor) working on fewer than 1,000 policy-years — regimes where GLM confidence intervals are too wide to be actionable. The [KU Leuven xG modelling case](https://dtai.cs.kuleuven.be/sports/blog/tabular-foundation-models-for-xg%3A-can-tabpfn-score-without-training/) found TabPFN reaching parity with a converged logistic regression at around 400 training examples.

These are not hypothetical advantages. They correspond to a real domain need: the ability to get a calibrated prediction from a small labelled dataset without extensive model engineering.

**Stick with XGBoost, LightGBM, or CatBoost when:**

- You need CPU-only deployment or inference under 100ms. TabFM requires a GPU and does not meet real-time latency requirements on any dataset of meaningful size.
- Your dataset has millions of rows. Context length grows with training set size; inference cost scales accordingly.
- You have more than 500 features or more than 10 target classes. Both are hard limits in the released checkpoint.
- Your objective function is custom — non-standard losses, monotonic constraints, business-rule adjustments. GBDTs support these directly; TabFM does not.
- Model governance requires interpretability or regulatory explainability. SHAP values on a GBDT are auditable in a way that attention weights on a frozen transformer are not.
- You cannot absorb a 20-plus-minute JAX compile on cold start. That delay is a real operational cost in a pipeline that restarts frequently.
- Compute cost matters. The AI Multiple benchmark put TabFM's total GPU cost at roughly $27 for 19 datasets; TabPFN-3 cost $0.65 for the same run — approximately a 40x difference.

The right frame is not "old vs new." It is cost/benefit with explicit tradeoffs. TabFM trades compute and deployment complexity for less tuning and stronger small-data performance. That trade is worth making on the right problem. It is the wrong trade on a large, production-scale dataset with strict latency requirements.

---

## What are the production gotchas you won't find in the blog post?

The Google TabFM blog post is accurate. It does not lie. It also does not tell you what happens when you install the library and run it on actual data. Here are the concrete numbers.

**Hard feature and class limits.** The wrapper default is `max_num_features=500`, and the model card specifies the model is optimised for tables up to 500 features. The class limit is harder: `TabFMClassifier.fit()` raises an error if the dataset has more than 10 classes. Both constraints come from the pretrained checkpoint's fixed architecture — the ICL decoder was built with a width-10 output head. These are not bugs; they are design decisions. But they are not mentioned in the benchmark numbers, and a multiclass dataset with 15 target categories cannot use this model at all without preprocessing.

**No hard row limit, but GPU memory is the real constraint.** The PyTorch backend's internal chunk sizes were chosen for memory safety on a 40GB GPU running TabArena-scale tasks. Larger datasets will OOM on smaller GPUs. The only mitigation is the `max_num_rows` argument, which subsamples training rows — but subsampling degrades performance precisely in the regime where you have enough data that the model should be competitive with GBDTs.

**JAX cold-start.** The first run on a new machine triggers a compilation step that takes 20 minutes or more. Subsequent runs use a compilation cache and are fast. For a scheduled batch job that runs daily, this is a one-time cost. For an interactive evaluation workflow or a pipeline that spins up fresh containers, it is a recurring overhead that needs to be planned for.

**Inference latency at realistic dataset sizes.** The [AI Multiple benchmark](https://aimultiple.com/tabular-models) reported an average of 173.6 seconds per fold across their 19 datasets. The worst case was 893 seconds on the Adult dataset (48,800 rows). For a batch prediction job run overnight, that is fine. For anything resembling real-time inference, it is not.

**CUDA compatibility.** The AI Multiple team encountered a cuBLAS error on CUDA 12 that required discarding one benchmark run. They worked around it, but CUDA version compatibility is a practical concern when deploying to cloud GPU environments with varying driver versions.

**Compute cost.** The same benchmark run that cost $0.65 using TabPFN-3 cost $27 using TabFM. That is a 40x difference for 19 datasets. Run across hundreds of datasets or in a high-frequency prediction pipeline, that cost structure changes the economics of using foundation models as a default first step.

**No peer-reviewed paper.** The primary evidence for TabFM's performance is [Google's blog](https://research.google/blog/introducing-tabfm-a-zero-shot-foundation-model-for-tabular-data/) and GitHub. The AI Multiple benchmark provides independent confirmation on 19 datasets. But the full training setup — synthetic data generator, pretraining curriculum, exact parameter count — has not been independently scrutinised through formal peer review. That is not disqualifying, but it is a material fact for anyone deciding whether to rely on TabFM in a consequential production system.

---

## What is the right way to evaluate TabFM before trusting it?

The correct response to a new ML tool is not adoption and not dismissal. It is a disciplined comparison on your own data, with matched conditions.

The most common mistake when evaluating tabular foundation models is comparing TabFM-Ensemble against a default XGBoost fit. That comparison is unequal in two directions at once: TabFM-Ensemble has 32 members, calibration, and learned ensemble weights; XGBoost default has none of those. To get an honest read, you need to match configurations — either both default (single model, no tuning) or both ensembled and tuned.

The [Prior Labs benchmarking guide](https://docs.priorlabs.ai/benchmarking) describes a rigorous head-to-head methodology for exactly this comparison. The core steps: stratified k-fold splits (not random), ROC-AUC as the primary metric (PR-AUC for heavily imbalanced data), accuracy excluded as a headline number, and matching time budgets across methods. The same approach applies to TabFM.

Two additional practices matter here. First, test at multiple dataset sizes. TabFM's advantage shrinks as row count grows — a comparison run only on your full dataset may miss the regime where the model is genuinely useful. Plot performance against row count by subsampling your training set at 500, 2,000, 5,000, 20,000 rows and comparing all methods at each size. The crossover point tells you something concrete about your problem.

Second, include inference time and GPU cost in the evaluation, not just accuracy metrics. A model that scores 0.5% higher ROC-AUC but costs 40x more compute and requires a dedicated GPU allocation is a different proposition from one that matches accuracy on CPU at a fraction of the cost. Both numbers belong in the comparison table.

This is precisely what Post 2 in this series will do: a structured evaluation repository running TabFM, TabPFN-3, XGBoost, and LightGBM on real datasets under matched conditions, with timing and cost logged alongside accuracy. The goal is to make the decision heuristic above empirically checkable, not just argued from benchmarks.

---

## Where does tabular ML and foundation model research go from here?

The direction is clear. The pace is not.

Google has announced that TabFM will be available via BigQuery `AI.PREDICT` SQL integration — foundation models moving into enterprise analytics workflows, usable without Python or a dedicated ML infrastructure team. Whether that integration ships on the announced timeline and what its practical performance looks like at BigQuery scale remain to be seen. But the intent signals where the product roadmap is pointing.

The open-source ecosystem is accelerating independently. [Probabl has documented](https://blog.probabl.ai/open-science-flywheel-of-tfms) how TabICLv2 and TabPFN-3 built on each other through shared weights, pretraining code, technical reports, and scikit-learn-compatible APIs — each release extending the reach and capability of the one before. That compounding dynamic is characteristic of healthy research fields, and it is happening faster in tabular ML now than at any previous point.

The practical trajectory for practitioners is probably this: foundation models become the default first-pass baseline in AutoML pipelines. You try them first on any new tabular problem, get a calibrated zero-tuning baseline, and then decide whether the cost/benefit of staying with that baseline — or switching to a tuned GBDT — makes sense for your specific data volume, latency requirements, and compute budget. The decision is not binary and never needs to be.

We are not at "replace GBDTs in production" yet. On large datasets with strict latency requirements, the case for GBDTs remains strong. But on small and medium datasets, the foundation model advantage is real, independently confirmed, and growing. The gap is narrowing on a trajectory that has been consistent across every new release in this family since TabPFN v1.

---

## Closing thoughts: the trees aren't dead yet, but they have company

Gradient-boosted trees dominated tabular ML for roughly a decade because they had the right inductive bias for the format. They still do. The case for XGBoost on a large, clean dataset with adequate labels has not materially weakened. What has changed is the regime where that case no longer applies: small datasets, thin segments, rapid prototyping without hyperparameter tuning. In those regimes, the tabular foundation model family has moved from "interesting research result" to "defensible production choice."

Google TabFM matters not because it invented any of the ideas it uses, but because it packages them into an officially supported, scikit-learn-compatible release. The four-stage architecture — cell embedding, column attention, row attention, ICL transformer — synthesises the best ideas from TabPFN (in-context learning for tables), TabICL (row compression for scalability), and synthetic SCM pretraining (the mechanism that makes zero-shot generalisation possible). That synthesis is now available in three lines of Python, with both JAX and PyTorch backends and a HuggingFace model card.

The right response is calibrated. Try TabFM on small and medium datasets where the evidence is strongest. Benchmark honestly — match tuning budgets, use stratified splits, measure both accuracy and inference cost. Do not conflate TabFM-Ensemble leaderboard numbers with zero-shot single-pass performance; they are different configurations. Keep your GBDTs tuned and ready for the cases they still own.

The thesis of this post was stated in the title. A genuine step forward for tabular ML. Not a revolution. Both halves of that claim are now, I hope, defensible.

---

## Now, I want to hear from you

The argument here rests on benchmark evidence and code inspection — but production ML is full of domain-specific surprises that no benchmark captures.

- Have you tried any tabular foundation models on a real dataset? What did you find — do the benchmark advantages hold in practice for your domain, or does something specific to your data break the expected pattern?
- Where have GBDTs held up for you even against tuned foundation models? I am curious whether the latency and interpretability arguments are as decisive as I think they are, or whether the compute cost is actually the blocker in most production conversations.
- What would change your calculus on production use of TabFM or TabPFN — a peer-reviewed paper, a larger context limit, CPU support, or something else entirely?

---

## References

[TabFM: A zero-shot foundation model for tabular data (Google Research blog, Jun 2026)](https://research.google/blog/introducing-tabfm-a-zero-shot-foundation-model-for-tabular-data/) — the primary source for TabFM architecture, benchmark configuration, and BigQuery integration announcement

[Google TabFM GitHub repository](https://github.com/google-research/tabfm) — official code release; source for TabFM-Ensemble wrapper components, hard limits, and production notes

[Why tree-based models still outperform deep learning on tabular data (Grinsztajn et al., NeurIPS 2022)](https://arxiv.org/abs/2207.08815) — identifies rotational invariance, uninformative features, and irregular target functions as the structural reasons GBDTs beat deep learning on tables

[Revisiting deep learning models for tabular data (Gorishniy et al., NeurIPS 2021)](https://arxiv.org/abs/2106.11959) — introduces FT-Transformer and a strong ResNet baseline; honest conclusion that no single DL architecture was universally superior to trees

[TabPFN: A transformer that solves small tabular classification problems in a second (Hollmann et al., Nature 2024)](https://www.nature.com/articles/s41586-024-08328-6) — establishes in-context learning for tabular prediction; the conceptual breakthrough the whole family builds on

[TabICL: A tabular foundation model for in-context learning on large data (Qu et al., ICML 2025)](https://arxiv.org/abs/2502.05564) — introduces row compression to fixed-dimension embeddings followed by an ICL transformer, enabling scaling to 100k training samples

[TabICLv2: A better, faster, scalable, and open tabular foundation model (Qu et al., Feb 2026)](https://arxiv.org/abs/2602.11139) — extends TabICL with Muon optimiser and scalable softmax; surpasses RealTabPFN-2.5 without tuning; fully open weights

[TabDPT: Scaling tabular foundation models (Xu et al., NeurIPS 2025)](https://arxiv.org/abs/2410.18164) — explores combining ICL with real tabular pretraining data, finding that real data improves generalisation beyond synthetic-only priors

[TabArena: A living benchmark for machine learning on tabular data (Erickson et al., arXiv 2506.16791)](https://arxiv.org/abs/2506.16791) — 51 curated IID datasets, 27+ methods; introduces BeyondArena for temporal and grouped splits; key finding that protocol choice affects rankings as much as architecture

[TabArena GitHub repository (autogluon/tabarena)](https://github.com/autogluon/tabarena) — living benchmark implementation; confirms IID vs BeyondArena split and validation protocol

[Tabular models benchmark: Performance across 19 datasets 2026 (AI Multiple)](https://aimultiple.com/tabular-models) — independent third-party benchmark; 8 models, 19 datasets; provides concrete latency and GPU cost figures including 173.6s average per fold and $27 total GPU cost for TabFM

[CodeSOTA: Tabular machine learning 2026 — TabArena leaderboard](https://codesota.com/tabular-ml) — TabArena Elo tracking; confirms TabFM and AutoGluon 4h ensemble positioning

[Demystifying table foundation models (Gaël Varoquaux, Probabl, Feb 2026)](https://blog.probabl.ai/demystifying-tfms) — practitioner explainer by the researcher whose lab developed TabICL; covers what TFMs are and what they bring versus GBDTs

[Open science is powering the tabular foundation models revolution (Varoquaux & Osborne, Probabl, Jun 2026)](https://blog.probabl.ai/open-science-flywheel-of-tfms) — documents how TabICLv2 and TabPFN-3 built on each other through open weights and scikit-learn APIs

[Benchmarking TabPFN V2 against XGBoost and CatBoost on Kaggle datasets (HumbleBeeAI, Mar 2026)](https://medium.com/@humblebeeai-team/benchmarking-tabpfn-v2-against-xgboost-and-catboost-on-kaggle-datasets-7e199dfd9f77) — independent practitioner benchmark on Kaggle competition datasets; confirms small/medium data advantage and scalability limits

[Prior Labs — Benchmarking TabPFN](https://docs.priorlabs.ai/benchmarking) — step-by-step methodology for head-to-head comparison with XGBoost using ROC-AUC, stratified splits, and matched tuning budgets

[Tabular foundation models for xG: Can TabPFN score without training? (DTAI KU Leuven)](https://dtai.cs.kuleuven.be/sports/blog/tabular-foundation-models-for-xg%3A-can-tabpfn-score-without-training/) — sports analytics case study; TabPFN reaches parity with converged logistic regression at approximately 400 training examples

[Foundation models for thin segments: TabPFN and TabICLv2 in insurance pricing (Burning Cost, Mar 2026)](https://burning-cost.github.io/2026/03/13/insurance-tabpfn/) — actuarial use case; demonstrates the small/thin-data advantage in insurance pricing with fewer than 1,000 policy-years
