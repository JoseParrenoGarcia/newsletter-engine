# TabPFN Paper Investigation

Scope note: the uploaded PDF `/Users/joseparreno/Downloads/2605.13986v2.pdf` is **`TabPFN-3: Technical Report` (arXiv:2605.13986v2, 2026)**, not the original 2022 TabPFN v1 paper. The report frequently references earlier TabPFN releases, especially v1, but it does **not** fully restate the original PFN formalism. Where the report is silent or only alludes to earlier work, that is called out explicitly rather than filled in from memory.

## 1. The Core Idea

TabPFN-3 reframes tabular learning as **pretrained in-context inference over a synthetic prior** rather than dataset-specific gradient training: the model reads the training table as context, compresses each row into a fixed-dimensional representation, and predicts test rows in a single forward computation. The report presents this as the current TabPFN family paradigm and explicitly situates it as a continuation of TabPFN v1’s “approximate Bayesian inference in a single forward pass” framing. (Introduction; Section 2 / `sections/01_introduction.tex`, `sections/02_tabpfn3.tex`)

- The problem it solves is scaling tabular foundation-model inference from the earlier TabPFN regimes to substantially larger datasets while preserving the “single forward pass” deployment model.
  - v1 is described as handling about 1,000 rows of clean numerical data.
  - v2 is described as scaling to 10,000 rows with categorical features, missing values, and outliers.
  - v2.5 is described as reaching 100,000 rows and 2,000 features.
  - TabPFN-3’s validated SOTA envelope is a **cell-budget frontier** rather than one fixed point: up to **1M rows at 200 features**, **100k rows at 2,000 features**, or **1k rows at 20,000 features**. (Introduction; Figure “Evolution and performance of the TabPFN model family” / `sections/01_introduction.tex`)

- In the report’s own framing, a prior-data fitted network means:
  - the model is pretrained **offline** on synthetic data sampled from a **structural causal model (SCM) prior**;
  - the weights internalize a generic inference procedure over that prior;
  - downstream “fitting” on a new dataset is replaced by conditioning on the dataset’s training rows at inference time.
  - The report does **not** provide a formal definition of PFN notation or a theorem-level derivation; it assumes the reader knows the earlier TabPFN literature. (Introduction; Section “Synthetic Prior” / `sections/01_introduction.tex`, `sections/02_tabpfn3.tex`)

- In-context learning on tabular data works mechanically as follows in TabPFN-3:
  1. Training and test rows are processed jointly.
  2. Training-row labels are injected into row/cell embeddings.
  3. Feature information is compressed into one fixed-dimensional vector per row.
  4. A row-level transformer lets training rows attend to one another and test rows attend to training rows.
  5. Predictions are decoded from the resulting test-row representations.
  - This is the mechanism the report uses in place of per-dataset weight updates. (Section 2.1 “Architecture”; Section 2.4 “Inference Optimization” / `sections/02_tabpfn3.tex`)

- The report is explicit that TabPFN-3 is still purely synthetic-data-pretrained:
  - “Pretrained exclusively on synthetic data from our prior.”
  - It further claims Thinking mode does not use “LLMs, real data, internet search or any other model besides TabPFN.” (Title block and abstract-style front matter; `main.tex`)

## 2. Architecture

TabPFN-3 is a **three-stage row-compression architecture followed by row-level in-context learning**, plus a task-specific output decoder. It is not described in the report as a standard encoder-only, decoder-only, or encoder-decoder transformer. Instead, it is a hybrid architecture with transformer blocks in each stage and an attention-based retrieval decoder for classification. (Section 2.1; Appendix C / `sections/02_tabpfn3.tex`, `sections/C_architectural_hyperparams.tex`)

- The model feeds training and test rows together.
  - Stage 1 performs **column-wise** feature distribution embedding.
  - Stage 2 performs **row-wise** feature aggregation into a small number of CLS-like vectors.
  - Stage 3 performs **in-context learning over row embeddings**, where train rows attend to train rows and test rows attend to train rows. (Section 2.1 “Architecture” / `sections/02_tabpfn3.tex`)

- The model processes data in three explicit stages.
  - **Stage 1: Feature distribution embedding.**
    - Each feature column is embedded independently with a transformer using inducing-point attention.
    - This stage captures column-level statistics without full cross-row quadratic attention.
    - Hyperparameters: `embed_dim=128`, `feature_group_size=3`, `dist_embed_num_blocks=3`, `dist_embed_num_heads=8`, `dist_embed_num_inducing_points=128`. (Section 2.1; Appendix C / `sections/02_tabpfn3.tex`, `sections/C_architectural_hyperparams.tex`)
  - **Stage 2: Feature aggregation.**
    - Each row gets learned CLS tokens plus its feature embeddings.
    - Non-causal attention within the row distills cross-feature information into a fixed number of vectors.
    - Concatenating those CLS-token states yields one row embedding.
    - Hyperparameters: `feat_agg_num_blocks=3`, `feat_agg_num_heads=8`, `feat_agg_num_cls_tokens=4`, RoPE enabled with base `100000`. (Section 2.1; Appendix C / `sections/02_tabpfn3.tex`, `sections/C_architectural_hyperparams.tex`)
  - **Stage 3: ICL transformer.**
    - The row embedding size is `icl_emsize = 128 * 4 = 512`.
    - The ICL transformer has `24` blocks, `8` query heads, `8` KV heads for train rows, and `1` KV head for test rows.
    - This is the stage whose attention cost scales with rows rather than rows × features. (Section 2.1; Appendix C / `sections/02_tabpfn3.tex`, `sections/C_architectural_hyperparams.tex`)

- The classification head is no longer a fixed-width MLP.
  - TabPFN-3 uses an **attention-based many-class retrieval decoder**:
    - train embeddings are keys,
    - one-hot train labels are values,
    - test embeddings are queries,
    - output probabilities are attention-weighted averages of training labels,
    - logits are `log(clip(p))`.
  - The decoder is non-parametric in class count at decode time, but the checkpoint still imposes a training-time ceiling of **160 classes** via class-bound embedding tensors and decoder value tensors.
  - Decoder hyperparameters: `decoder_num_heads=6`, `decoder_head_dim=64`, `max_num_classes=160`. (Section 2.2 “Many-class Decoder”; Appendix C / `sections/02_tabpfn3.tex`, `sections/C_architectural_hyperparams.tex`)

- The regression head is task-specific and bucketized.
  - The regressor uses a 2-layer MLP decoder with architecture `512 -> 1024 -> 5000`, where `5000` is the number of output buckets for the bar-distribution regression head. (Appendix C / `sections/C_architectural_hyperparams.tex`)

- The report’s model-size numbers are explicit.
  - TabPFN-3 classifier: **53M parameters**
  - TabPFN-3 regressor: **58M parameters**
  - Earlier releases listed for comparison:
    - v1 classifier: **26M**
    - v2 classifier/regressor: **7M / 11M**
    - v2.5 classifier/regressor: **11M / 10M**
    - v2.6 classifier/regressor: **11M / 13M** (Figure “Evolution and performance of the TabPFN model family”; `sections/01_introduction.tex`)

- Special handling is concrete in some places and not documented in others.
  - **Feature order / grouping:** features are grouped into cyclic triplets before embedding, following TabICLv2-style assignment. (Section 2.1 / `sections/02_tabpfn3.tex`)
  - **Missing values:** each `NaN` gets an explicit binary indicator concatenated to the cell value before embedding. The architecture figure also says `NaN/Inf` indicator variables, but the main text only explicitly describes `NaN`; there is no longer explanation of `Inf` handling in the prose. (Figure 2 caption and architecture bullet list / `sections/02_tabpfn3.tex`)
  - **Normalization:** all normalization layers use **RMSNorm**. (Section 2.1 / `sections/02_tabpfn3.tex`)
  - **Length generalization:** Stage 1, Stage 3, and the many-class decoder apply **QASSMax** attention scaling. (Section 2.1 / `sections/02_tabpfn3.tex`)
  - **Categorical vs numerical columns:** this report does **not** provide a low-level implementation breakdown analogous to the TabFM repo’s per-type input paths. It discusses categorical variables in the synthetic prior and mentions native text support in API variants, but it does not spell out a detailed OSS tokenization/embedding path for each data type. (Section 2.5; Section 3.1.3 / `sections/02_tabpfn3.tex`, `sections/03_experimental_results.tex`)

## 3. Synthetic Pretraining

TabPFN-3 is pretrained on **synthetically generated SCM data**, and the report says the final model saw **more than 8 trillion tokens**. The report gives a high-level SCM-generation pipeline and several new prior components, but it does **not** publish the exact sampling distributions, exact dataset-size distributions, or a count of synthetic “tasks” in the style of “N datasets/tasks generated.” (Section 2.5; Figure “Schematic visualization of our SCM prior” / `sections/02_tabpfn3.tex`, `figures/tikz/scm_prior.tex`)

- The synthetic data pipeline is described as a five-step SCM generator.
  1. Sample dataset-level hyperparameters such as number of rows, features, and classes.
  2. Sample a DAG underlying the SCM.
  3. Sample i.i.d. node noise and compute the SCM in topological order using sampled combiner mechanisms and activations.
  4. Choose feature and target variables from the computed SCM.
  5. Apply post-processing to obtain the final synthetic dataset. (Figure `fig:prior`; `figures/tikz/scm_prior.tex`)

- The prior was expanded in eight named ways.
  - richer graph-sampling algorithms;
  - more combiner mechanisms;
  - more expressive categorical-variable handling;
  - better support for high-frequency oscillators;
  - added spatial activations / spatial prior;
  - many-class prior aligned to the new decoder;
  - temporal prior via a discrete-time dynamic SCM;
  - out-of-distribution tasks for extrapolation and shift robustness. (Section 2.5 “Synthetic Prior” / `sections/02_tabpfn3.tex`)

- The exact procedure is **not** fully specified at the granularity your prompt asks for.
  - The report does **not** give the exact distributions used for:
    - number of rows,
    - number of features,
    - number of classes,
    - graph degree / sparsity,
    - noise families,
    - combiner-mechanism probabilities,
    - post-processing transforms.
  - The report also does **not** state how many distinct synthetic tasks/datasets were generated during pretraining.
  - It reports **tokens**, not tasks: “more than 8 trillion tokens.” (Section 2.5; Figure `fig:prior` / `sections/02_tabpfn3.tex`, `figures/tikz/scm_prior.tex`)

- The pretraining objective is only partially specified.
  - The model is trained so that row embeddings of training and test rows support in-context prediction, and the downstream decoders are trained for classification / regression / quantile outputs.
  - The report does **not** give a concise one-line training-loss definition for the full pretraining pipeline in the main text.
  - It does specify output structures:
    - classification uses the many-class retrieval decoder;
    - regression uses a bucketized bar-distribution head;
    - quantile outputs come “all from a single forward pass, with no retraining per quantile level.” (Sections 2.2, 3.2.4, Appendix C / `sections/02_tabpfn3.tex`, `sections/03_experimental_results.tex`, `sections/C_architectural_hyperparams.tex`)

- Why synthetic data instead of real corpora:
  - The report does not provide a dedicated argument section for classic tabular pretraining, but it is explicit in the time-series section that synthetic pretraining avoids contamination and leakage from recirculated real-world series.
  - For the core model, the stated philosophy is to maximize breadth while matching real-world structure through the SCM prior. (Section 2.5; Section 3.2.5 / `sections/02_tabpfn3.tex`, `sections/03_experimental_results.tex`)

## 4. Inference

In TabPFN-3, “single forward pass” means the model performs dataset-specific prediction by **conditioning on training rows inside the forward computation**, not by updating weights. The report explicitly says TabPFN-3 “combines training (fit) and inference (predict) in one forward pass,” and all runtime scaling work in the report is about making that forward computation feasible at larger row counts. (Section 2.4.2 “Fast Inference with a Small KV-cache”; Introduction / `sections/02_tabpfn3.tex`, `sections/01_introduction.tex`)

- Mechanically, train rows become context in two places.
  - During cell embedding, target-aware embeddings are added to the cell embeddings of **training rows**.
  - During Stage 3 ICL, **training-row embeddings attend to one another** and **test-row embeddings attend to training-row embeddings** to produce predictions. (Section 2.1 / `sections/02_tabpfn3.tex`)

- Test rows are processed jointly with train rows, not in a separate fine-tuning loop.
  - The forward pass builds row embeddings for both train and test sets.
  - The classifier then retrieves over the in-context training set using train embeddings as keys and train one-hot labels as values.
  - The report therefore treats prediction as retrieval/attention over context, not optimization on the target dataset. (Section 2.1; Section 2.2 / `sections/02_tabpfn3.tex`)

- The report does not describe any inference-time weight updates.
  - It never discusses gradient descent or checkpoint updates on the target dataset.
  - It repeatedly contrasts TabPFN with tuned baselines by emphasizing **single forward pass**, **fit+predict**, and **cached predict**.
  - The strongest text-grounded reading is that all dataset adaptation happens via context rows, not parameter updates. (Introduction; Section 2.4.2; Section 3.2.4 / `sections/01_introduction.tex`, `sections/02_tabpfn3.tex`, `sections/03_experimental_results.tex`)

- Time and memory complexity are stated qualitatively and in one key asymptotic comparison.
  - Pre-ICL stages materialize an activation proportional to `(n_train + n_test) * n_features * d`. (Section 2.4.1 / `sections/02_tabpfn3.tex`)
  - The ICL stage scales as `n_train^2` **independently of feature count** because feature information has already been compressed into one row vector. (Section 2.4.1 / `sections/02_tabpfn3.tex`)
  - By contrast, TabPFN-2.5’s row attention is described as scaling like `n_features * n_train^2`. (Section 2.4.1 / `sections/02_tabpfn3.tex`)

- The main inference optimizations are concrete.
  - **Row chunking:** exact-equivalent two-phase computation; enabled when `n_train + n_test > 2048`. (Section 2.4.1 / `sections/02_tabpfn3.tex`)
  - **Inducing-point summaries:** 128 inducing points in the distribution embedder. (Section 2.4.1 footnote / `sections/02_tabpfn3.tex`)
  - **Reduced KV cache:** multi-query attention with a single test-side KV head reduces cache size by **8×**. (Section 2.4.2 / `sections/02_tabpfn3.tex`)
  - **Cache size:** **7 GiB per estimator** for 1M-row datasets. (Section 2.4.2 / `sections/02_tabpfn3.tex`)
  - **Latency on H100:** cached predict reaches **0.1 to 3 ms per test point** for batches of 100 test points; at `n_train = 10^6`, both cold `fit+predict` and `fit(build cache)` take about **107 s**. (Section 2.4.2; Figures `fig:kv_cache_h100` and `fig:kv_cache_scaling_h100` / `sections/02_tabpfn3.tex`)

## 5. Benchmark Results

The report’s main public benchmark claims are anchored on **TabArena**, **TALENT**, and **TabSTAR**, with additional internal benchmarks for large-row, many-class, many-feature, and quantile-regression settings. The most exact head-to-head numeric table in the source is the TabArena leaderboard `.tex` file, which gives Elo, win counts, improvability, and train/predict times. (Section 3; leaderboard `.tex` files / `sections/03_experimental_results.tex`, `figures/tabarena_v3/all/leaderboard.tex`, `figures/tabarena_v3/Medium/leaderboard.tex`)

- Benchmarks used:
  - **TabArena:** 51 curated datasets selected from 1,053 candidate datasets; up to 100k rows. (Section 3.1.1 / `sections/03_experimental_results.tex`)
  - **TALENT:** 300 datasets overall; the plotted TabICLv2 evaluation protocol uses 274 datasets after removing 26 development datasets. (Section 3.1.2 / `sections/03_experimental_results.tex`)
  - **TabSTAR:** 50 text-tabular datasets. (Section 3.1.3 / `sections/03_experimental_results.tex`)
  - **Large-row internal benchmark:** 13 datasets total, up to 1M rows and 200 features; 9 classification + 4 regression datasets. (Section 3.2.1 / `sections/03_experimental_results.tex`)
  - **Many-class synthetic benchmark:** 9 datasets derived from TabArena regression tasks by Dirichlet-jittered quantile binning. (Section 3.2.2; Appendix F / `sections/03_experimental_results.tex`, `sections/F_additional_internal_benchmarks.tex`)
  - **Many-features slice:** 6 real-world classification datasets with 102–322 samples and 1,117–22,215 features. (Section 3.2.3 / `sections/03_experimental_results.tex`)

- Exact public TabArena numbers on **all 51 datasets**:
  - **TabPFN-3-Thinking:** Elo **1800**; improvability **4.7%**; train time per 1K **37.69 s**; predict time per 1K **3.26 s**.
  - **AutoGluon 1.5 extreme (4h):** Elo **1695**; improvability **5.7%**; train **289.07 s**; predict **4.03 s**.
  - **TabPFN-3 (default):** Elo **1677**; improvability **6.9%**; train **2.31 s**; predict **0.74 s**.
  - **RealTabPFN-2.5 (tuned+ensembled):** Elo **1602**.
  - **TabICLv2 (default):** Elo **1599**.
  - **CatBoost (tuned+ensembled):** Elo **1420**.
  - **LightGBM (tuned+ensembled):** Elo **1438**.
  - **XGBoost (tuned+ensembled):** Elo **1379**. (TabArena leaderboard table / `figures/tabarena_v3/all/leaderboard.tex`)

- Exact public TabArena numbers on the **largest 15 datasets (10k–100k rows)**:
  - **TabPFN-3-Thinking:** Elo **2146**; improvability **1.3%**; train **15.10 s**; predict **2.15 s**.
  - **AutoGluon 1.5 extreme (4h):** Elo **1907**; improvability **3.4%**.
  - **TabPFN-3 (default):** Elo **1835**; improvability **4.1%**; train **0.83 s**; predict **0.27 s**.
  - **TabICLv2 (default):** Elo **1712**.
  - **CatBoost (tuned+ensembled):** Elo **1625**.
  - **LightGBM (tuned+ensembled):** Elo **1604**.
  - **XGBoost (tuned+ensembled):** Elo **1565**. (TabArena-medium leaderboard table / `figures/tabarena_v3/Medium/leaderboard.tex`)

- The paper’s summary claims for TabArena are numerically specific.
  - TabPFN-3 gains **72 Elo** over Real-TabPFN-2.5 tuned+ensembled on TabArena overall. (Section 3.1.1 / `sections/03_experimental_results.tex`)
  - Thinking mode beats the best non-TabPFN model by **over 200 Elo** on TabArena overall and by **over 420 Elo** on the largest subset. (Section 3.1.1; `main.tex`)
  - Thinking mode beats AutoGluon 1.5 extreme by **over 100 Elo** overall and **220 Elo** on the largest subset, while being about **10× faster**. (Section 3.1.1 / `sections/03_experimental_results.tex`)
  - Win-rate claims:
    - on all TabArena datasets, Thinking mode has **>93%** win rate against tuned+ensembled CatBoost/LightGBM/XGBoost and **69%** against AutoGluon extreme; open-source TabPFN-3 has **>80%** against tuned+ensembled GBTs and **56%** against AutoGluon extreme.
    - on the largest subset, Thinking mode has **>99%** win rate against tuned+ensembled LightGBM and XGBoost, **98%** against CatBoost, and **82%** against AutoGluon extreme. (Section 3.1.1 / `sections/03_experimental_results.tex`)

- Large-row results are strong but less raw-metric-specific.
  - The large-row internal benchmark covers **13 datasets**, **100k–1M rows**, **up to 200 features**.
  - The main claim is that TabPFN-3 beats default and **8-hour-tuned** GBT baselines and TabICLv2 in a single forward pass. (Figure `fig:large_data_all`; Section 3.2.1 / `sections/03_experimental_results.tex`)
  - The appendix gives average-rank details:
    - classification average rank **2.11**;
    - regression average rank **2.25**.
  - The report explicitly says the rank differences to the strongest 8-hour-tuned XGBoost/CatBoost baselines are **not statistically significant** in the critical-difference analysis, even though TabPFN-3 ranks first. (Appendix F, Figures `fig:large_data_cd_cls`, `fig:large_data_cd_reg` / `sections/F_additional_internal_benchmarks.tex`)

- Many-class and many-feature results:
  - Many-class synthetic benchmark:
    - TabPFN-3 normalized ROC-AUC (OvR): **1.00**
    - TabICLv2: **0.89**
    - TabPFN-2.5: **0.83**
    - up to **100 classes** on **9 datasets**. (Section 3.2.2; Figure `fig:many_class_synthetic` / `sections/03_experimental_results.tex`)
  - Many-features slice:
    - 6 datasets,
    - 102–322 samples,
    - 1,117–22,215 features,
    - TabPFN-3 performs strongly, but the paper does **not** provide a compact raw numeric summary table in the main text for direct XGBoost/CatBoost comparison. (Section 3.2.3 / `sections/03_experimental_results.tex`)

- Dataset-size range where the report says TabPFN-3 performs best:
  - validated SOTA frontier: **1M rows / 200 features**, **100k rows / 2k features**, **1k rows / 20k features**. (Figure “Evolution and performance of the TabPFN model family” / `sections/01_introduction.tex`)
  - large-row benchmark focus: **100k–1M rows and <200 features**. (Section 3.2.1 / `sections/03_experimental_results.tex`)

- Where the report itself shows caveats in benchmarking:
  - some strongest large-row differences vs 8h-tuned XGB/CatBoost are not statistically significant;
  - many-class evaluation uses a **synthetic benchmark derived from regression datasets**, not a natural many-class corpus;
  - large-data regression preview for Thinking mode is absent because it does not yet support temporal datasets;
  - some relational comparisons may not be directly comparable because different methods used different evaluation regimes. (Appendix F; Section 3.2.1; relational section / `sections/F_additional_internal_benchmarks.tex`, `sections/03_experimental_results.tex`)

## 6. Limitations Acknowledged by the Authors

The report’s limitations are mostly framed as **validated-regime boundaries, scaling trade-offs, and feature-budget constraints**, not as a general “fails on X” section. The main caveat is that TabPFN-3’s design is optimized along a row/feature trade-off frontier, so it is not claiming uniform dominance for arbitrarily large rows and arbitrarily large feature counts at the same time. (Figure “Evolution and performance of the TabPFN model family”; Section 3.2.1 / `sections/01_introduction.tex`, `sections/03_experimental_results.tex`)

- Context / scale limits:
  - The report claims practical scaling to **1M rows on one H100**, enabled by row chunking and KV-cache reductions. (Front matter; Section 2.4 / `main.tex`, `sections/02_tabpfn3.tex`)
  - It does **not** claim universal support beyond that; 1M rows is the explicit benchmarked large-row target. (Section 3.2.1 / `sections/03_experimental_results.tex`)

- Feature-count limits:
  - The validated large-row regime is **<200 features**.
  - The validated broad frontier also includes **100k rows at 2,000 features** and **1k rows at 20,000 features**, but not arbitrary combinations.
  - Each open-source estimator uses at most **200 input features by default**, so extremely wide datasets are handled by feature-subset ensembling rather than full-feature joint compression. (Figure “Evolution and performance…”; Section 3.2.3 / `sections/01_introduction.tex`, `sections/03_experimental_results.tex`)

- Task / data regimes where performance degrades or trade-offs appear:
  - When **both rows and features are very large**, early feature compression can become a bottleneck; the report explicitly treats large-row and many-feature regimes separately. (Section 3.2.1 / `sections/03_experimental_results.tex`)
  - On high-dimensional, low-sample problems, **Real-TabPFN-2.5 can slightly outperform TabPFN-3 at the same estimator budget**, likely because it uses up to 500 features per estimator and may exploit selected subsets better. (Section 3.2.3 / `sections/03_experimental_results.tex`)
  - Thinking mode did not yet support temporal datasets at the time of writing, so it could not be evaluated on the large-data regression benchmark. (Section 3.2.1 / `sections/03_experimental_results.tex`)

- Computational constraints:
  - Unchunked pre-ICL activations scale with `(rows × features × d)` and can OOM before compute saturation. (Section 2.4.1 / `sections/02_tabpfn3.tex`)
  - KV caching helps online prediction but consumes **7 GiB per estimator** at 1M rows. (Section 2.4.2 / `sections/02_tabpfn3.tex`)
  - Default use of **8 estimators** is only practical because the cache now scales with rows rather than rows × features. (Section 2.4.2 / `sections/02_tabpfn3.tex`)

- Missing details that limit external scrutiny:
  - The report does not publish the exact SCM prior distributions, exact synthetic-task count, or a fully explicit pretraining-loss formulation.
  - The large-data benchmark uses internal datasets whose names are not enumerated in the main text. (Section 2.5; Section 3.2.1 / `sections/02_tabpfn3.tex`, `sections/03_experimental_results.tex`)

## 7. Key Claims the Blog Post Must Get Right

The report makes strong performance claims, but several are carefully scoped. The blog post should preserve those scopes rather than universalizing them. (Front matter; Figure “Evolution and performance…”; Sections 2–3 / `main.tex`, `sections/01_introduction.tex`, `sections/02_tabpfn3.tex`, `sections/03_experimental_results.tex`)

- “Single forward pass” does **not** mean “one forward pass for any size and any modality with zero caveats.”
  - The claim is tied to the released architecture plus chunking / caching optimizations and validated benchmarks.
  - It is strongest for the open-source core model on tabular data, with some additional capabilities only in API variants. (Section 2.4; Section 3.1.3 / `sections/02_tabpfn3.tex`, `sections/03_experimental_results.tex`)

- “Scales to 1M rows” is a **validated envelope claim**, not a blanket statement that any 1M-row tabular problem is solved out of the box.
  - The explicit validated regime is **1M rows with up to 200 features**.
  - The figure caption is precise: larger or different row-feature configurations “may be feasible,” but are **outside the validated SOTA envelope** summarized there. (Figure “Evolution and performance of the TabPFN model family” / `sections/01_introduction.tex`)

- “Outperforms all other models” is benchmark-scoped.
  - On TabArena, the open-source default model beats all others in a forward pass.
  - On large-row internal benchmarks, TabPFN-3 ranks first, but some differences vs tuned XGBoost/CatBoost are **not statistically significant**.
  - Thinking mode’s strongest margins are against **non-TabPFN** methods, not against every TabPFN variant. (Section 3.1.1; Appendix F / `sections/03_experimental_results.tex`, `sections/F_additional_internal_benchmarks.tex`)

- “No other model besides TabPFN” applies specifically to **Thinking mode** and is explicitly qualified.
  - The report says Thinking mode achieves its gains “without using LLMs, real data, internet search or any other model besides TabPFN.”
  - That wording should not be widened into a claim about all TabPFN-3 inference settings. (`main.tex`; Section 2.6 / `sections/02_tabpfn3.tex`)

- “Many-class support” is not literally unbounded.
  - The decoder is non-parametric in class count at decode time, but the released checkpoint has a **hard ceiling of 160 classes** from pretraining-time tensors. (Section 2.2; Appendix C / `sections/02_tabpfn3.tex`, `sections/C_architectural_hyperparams.tex`)

- “Synthetic pretraining” should not be overstated into “fully specified synthetic-data generation.”
  - The report documents the SCM pipeline and major prior extensions, but it does **not** publish exact sampling distributions or task counts.
  - A blog post should avoid pretending the report gives a reproducible generator spec at that granularity. (Section 2.5; Figure `fig:prior` / `sections/02_tabpfn3.tex`, `figures/tikz/scm_prior.tex`)

- “Foundation model” here still means a **tabular prior-driven in-context learner**, not a tabular analogue of a web-scale real-data corpus model.
  - The report’s distinctive claim is exactly the opposite: all pretraining is synthetic and prior-driven. (`main.tex`; Introduction / `sections/01_introduction.tex`)
