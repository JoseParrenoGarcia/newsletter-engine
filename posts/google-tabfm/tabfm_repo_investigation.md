# TabFM Repo Investigation

Inspected sources:

- GitHub repo `google-research/tabfm` at commit `65aeeed690b6e7c29dedb9bb21696f9786287533`
- Hugging Face model card `google/tabfm-1.0.0-pytorch`

## 1. Architecture

TabFM v1.0.0 is a four-stage pipeline: cell embedding -> column attention over rows -> row attention over feature tokens -> column attention again -> row attention again -> a final in-context transformer over compressed row representations. The released v1.0.0 config uses `embed_dim=256`, two column-attention passes, two row-attention passes, `row_num_cls=8`, and a 24-block ICL stack. (Source: `tabfm/src/pytorch/model.py`, `tabfm/src/jax/model.py`, `tabfm/src/jax/tabfm_v1_0_0.py`, HF model card section "Model Architecture")

- Alternating row/column attention works as follows.
  - Input features arrive as `X[B, T, H]`, where `T` is rows and `H` is features. The cell embedder first groups each feature with shifted neighbors using offsets `0`, `1`, and `3` when `feature_group_size=3`, so each output feature token is built from a 3-slot local group rather than a single scalar. This grouping does not increase the number of feature tokens; it enriches each token before projection. (Source: `tabfm/src/pytorch/model.py` `CellEmbedder._group`, `tabfm/src/jax/model.py` `CellEmbedder.feature_grouping`)
  - `ColEmbedding` then treats each feature column independently across rows. It reshapes `X[B, T, H, E]` to `src[B*H, T, E]` and applies a Set Transformer with 3 induced self-attention blocks. Each block uses 256 learned inducing vectors: first the inducing vectors attend to training rows in that column, then all row queries attend to the induced summary. This is the first "column attention" pass. (Source: `tabfm/src/pytorch/model.py` `ColEmbedding`, `InducedSelfAttentionBlock`, HF model card section "Model Architecture")
  - After that, 8 learned CLS tokens are prepended to every row, giving `H + 8` tokens per row. `RowInteraction` reshapes to `src[B*T, H+8, E]` and applies a 3-block transformer encoder across tokens within each row. This is the first "row attention" pass, but mechanically it is attention across columns/features inside a row, not across dataset rows. (Source: `tabfm/src/pytorch/model.py` `RowInteraction`, `tabfm/src/jax/model.py` `RowInteraction`)
  - The model then repeats the alternation: a second `ColEmbedding` runs across rows for each token slot, including both the original feature slots and the 8 CLS slots emitted by the first row pass, and a second `RowInteraction` runs across tokens within each row. (Source: `tabfm/src/pytorch/model.py` `TabFM.forward`, `tabfm/src/jax/model.py` `TabFM.__call__`)
  - In total before the ICL stage, the released model performs `column -> row -> column -> row`, with 3 blocks in each column module and 3 blocks in each row module. (Source: `tabfm/src/pytorch/model.py` `TabFM.__init__`, HF config files)

- Row compression is done with learned CLS tokens, not pooling.
  - The model allocates 8 learnable CLS tokens per row (`row_num_cls=8`).
  - The second row-attention module is configured with `output_full=False`, so it returns only the first 8 CLS outputs rather than the full feature-token sequence.
  - Those 8 CLS vectors are flattened into one row representation of size `8 * 256 = 2048`.
  - This compression happens after the second row-attention pass, not immediately after the first one. (Source: `tabfm/src/pytorch/model.py` `RowInteraction`, `TabFM.__init__`, `TabFM.forward`; `tabfm/src/jax/model.py` `RowInteraction`, `TabFM.__call__`)

- The transformer over compressed rows is an encoder stack over row representations, not a decoder.
  - `ICLearning` builds an `Encoder` with 24 blocks, 8 attention heads, model width `2048`, and feed-forward width `8192`.
  - Its input is `reps[B, T, 2048]`, where each row is the concatenated 8-CLS representation from the previous stage.
  - For classification, labels are encoded with `OneHotAndLinear(max_classes=10, d_model=2048)` and the output decoder is `MLP(2048 -> 4096 -> 10)`.
  - For regression, labels are encoded with `MLP(1 -> 4096 -> 2048)` and the output decoder is `MLP(2048 -> 4096 -> 1)`.
  - The implementation uses an encoder-style attention mask that allows all queries to attend only to training rows; it does not use an autoregressive causal mask. The model card calls this stage "causal", but the released code does not implement standard causal masking here. (Source: `tabfm/src/pytorch/model.py` `ICLearning`, `Encoder`; `tabfm/src/jax/model.py` `ICLearning`; HF model card section "Model Architecture")

- Positional encoding, normalization, and special-token details are concrete.
  - RoPE is used only in the row-attention stacks, with `rope_base=100000.0`. Because row attention operates on `src[B*T, H+8, E]`, that RoPE is applied over feature-token position within a row, not over dataset rows. (Source: `tabfm/src/pytorch/model.py` `RowInteraction`, `Encoder`, `RoPE`; `tabfm/src/jax/tabfm_v1_0_0.py`)
  - The ICL transformer sets `rope_base=None`, so it uses no RoPE. The column Set Transformer also uses no positional encoding. (Source: `tabfm/src/pytorch/model.py` `ICLearning`, `SetTransformer`)
  - Normalization is RMSNorm throughout: query/key RMSNorm inside attention heads, RMSNorm before and after attention, RMSNorm before and after FFNs, RMSNorm after column attention, RMSNorm after row attention, and RMSNorm before the ICL decoder head. (Source: `tabfm/src/pytorch/model.py`)
  - The release config uses SwiGLU feed-forwards (`activation="swiglu"`). (Source: HF config files, `tabfm/src/jax/tabfm_v1_0_0.py`)
  - The only special tokens are the 8 learned row-level CLS tokens. There are no BOS/EOS tokens and no learned column-ID tokens in the released code. (Source: `tabfm/src/pytorch/model.py`, `tabfm/src/jax/model.py`)

- Numerical and categorical columns are handled differently at the input layer.
  - The wrapper first ordinal-encodes categorical columns and leaves numeric columns numeric; datetime-like columns are expanded into numeric fields. (Source: `tabfm/src/classifier_and_regressor.py` `TransformToNumerical`, `DatetimeTransformer`)
  - Inside the neural model, the cell embedder uses separate learned Fourier frequency banks for numeric and categorical features: `fourier_frequencies` for numerics and `fourier_frequencies_cat` for categoricals.
  - It also uses separate input projections: `in_linear` for numerics and `in_linear_cat` for categoricals.
  - A boolean `cat_mask` chooses which path each grouped feature slot takes before summing the 3 slots into one feature token. (Source: `tabfm/src/pytorch/model.py` `CellEmbedder`, `tabfm/src/jax/model.py` `CellEmbedder`)

## 2. Training setup

The release ships only inference code and pretrained checkpoints, so most pretraining details are not documented in the repo or the model card. What is explicit is the architecture config and the high-level claim that pretraining used many synthetic SCM-generated datasets. (Source: repo tree, HF model card section "Training Data and Priors")

- Synthetic SCM datasets:
  - The model card says TabFM was trained on "hundreds of millions" of synthetic datasets generated dynamically using structural causal models.
  - The inspected sources do not specify the SCM graph families, number of variables, noise distributions, functional forms, class-balance settings, missingness patterns, or how dataset sizes were sampled.
  - The inspected sources also do not provide the generator code. (Source: HF model card section "Training Data and Priors"; repo tree has no training-data generator module)

- Pretraining objective:
  - The sources do not explicitly document the training objective in the sense of "masked prediction", "autoregressive next token", or "standard supervised label prediction over synthetic tasks".
  - What is exposed is only the release-time task loss selection: the classification checkpoint uses `loss="cross_entropy"` and the regression checkpoint uses `loss="rmse"`.
  - There is no training loop in the repo showing how those losses were used during synthetic pretraining. (Source: `tabfm/src/jax/tabfm_v1_0_0.py`, `tabfm/src/jax/model.py`)

- Model size:
  - The released architecture config is documented: `embed_dim=256`, `col_num_blocks=3`, `col_nhead=4`, `col_num_inds=256`, `row_num_blocks=3`, `row_nhead=8`, `row_num_cls=8`, `icl_num_blocks=24`, `icl_nhead=8`, `ff_factor=4`, `num_freq=32`, `max_classes=10`. (Source: HF config files, `tabfm/src/jax/tabfm_v1_0_0.py`, HF model card section "Model Architecture")
  - The repo and model card do not state an exact parameter count.
  - Because the release mixes JAX source modules and a PyTorch conversion wrapper, and because the sources do not publish an official parameter count, this should be treated as undocumented rather than inferred here. (Source: `tabfm/src/hugging_face/torch_convert.py`, HF model card)

- Training compute and hardware:
  - The inspected sources do not document pretraining hardware, training duration, TPU/GPU counts, or FLOPs.
  - The only concrete hardware note in the code is inference-side: the PyTorch chunk sizes are described as chosen for memory safety on a 40 GB GPU for TabArena-scale tasks. That is an inference implementation note, not a pretraining disclosure. (Source: `tabfm/src/pytorch/model.py` comments above `_ROW_CHUNK_SIZE`; HF model card section "Limitations")

## 3. Inference / forward pass

Calling `.fit()` does preprocessing and ensemble setup, not gradient-based training. Calling `.predict()` or `.predict_proba()` builds a per-estimator table whose first rows are the training set and whose remaining rows are the query rows, then runs the frozen TabFM backbone once per ensemble member. (Source: `tabfm/src/classifier_and_regressor.py`)

- What `.fit()` does for `TabFMClassifier`:
  1. It ordinal-encodes class labels in alphabetical order and checks that `n_classes <= model.max_classes` (`10` for v1.0.0). (Source: `tabfm/src/classifier_and_regressor.py` `TabFMClassifier.fit`)
  2. It converts the feature table to numeric form: categoricals are ordinal-encoded, numerics are imputed, and datetime-like columns are expanded to unix-ns plus `year/month/day/dayofweek`. (Source: `tabfm/src/classifier_and_regressor.py` `TransformToNumerical`)
  3. It creates an `EnsembleGenerator`, which removes constant features, records categorical-column positions, optionally creates cross-feature and SVD-feature pools, fits per-normalization preprocessors, and caches the transformed training data. (Source: `tabfm/src/classifier_and_regressor.py` `EnsembleGenerator.fit`)
  4. It does not update TabFM weights.
  5. If NNLS or calibration is enabled, it additionally runs out-of-fold forward passes during `fit()` to learn ensemble weights and calibration parameters. This makes `fit()` expensive in the ensemble preset even though the base backbone is frozen. (Source: `tabfm/src/classifier_and_regressor.py` `TabFMClassifier.fit`, `predict_oof_proba`, `_fit_calibration`)

- What `.fit()` does for `TabFMRegressor`:
  1. It applies the same feature conversion pipeline.
  2. It standardizes the target with `StandardScaler`.
  3. It fits the same `EnsembleGenerator`, but with `class_shift=False` and `task="regression"`.
  4. If NNLS is enabled, it computes out-of-fold predictions in standardized target space, inverse-transforms them, and fits NNLS ensemble weights. (Source: `tabfm/src/classifier_and_regressor.py` `TabFMRegressor.fit`)

- "Training rows as context" means literal concatenation inside the same tensor sequence.
  - For each ensemble member, the wrapper constructs `X_variant_instance = [X_train_context ; X_test_queries]`.
  - The corresponding `y` tensor contains labels only for the training prefix. Query rows get padded target values (`-100` in the wrappers) and are masked out as unlabeled rows.
  - `train_size` is passed alongside the sequence so the model knows how many leading rows are context rows. (Source: `tabfm/src/classifier_and_regressor.py` `_transform_features`, `_batch_forward`, `_predict_step_pytorch`)

- Mechanically, training and test rows interact in a specific way.
  - In the cell embedder, the label embedding is added only to rows `t < train_size`.
  - In each column-attention block, the inducing vectors summarize only the training rows of a column because the mask is `arange(T) < train_size` on the key/value side.
  - In the ICL transformer, every query row can attend only to training rows; test rows are excluded from the key/value set by the same mask.
  - This means the model is not doing separate cross-attention between a "train memory" tensor and a "test query" tensor. It is using one concatenated row sequence plus a key/value mask that exposes only the labeled training prefix as context.
  - The JAX tests explicitly verify the resulting information flow: perturbing a training row changes all test predictions, while perturbing a test row changes only its own prediction; perturbing a test label changes no predictions. (Source: `tabfm/src/pytorch/model.py` `CellEmbedder.forward`, `ColEmbedding.forward`, `ICLearning.forward`; `tabfm/src/jax/model_test.py`)

- What `.predict_proba()` does for classification:
  1. It transforms test features with the fitted `X_encoder_`.
  2. `ensemble_generator.transform()` appends any fixed cross/SVD pools, concatenates cached train rows with test rows, applies member-specific feature selection/shuffle and preprocessing, and pads all members to the same feature width.
  3. `prepare_ensemble_tensors()` builds `Xs_all[n_estimators, T_total, H_padded]`, `ys_all[n_estimators, T_train]`, `cat_masks_all[n_estimators, H_padded]`, and `ds_all[n_estimators]`, where `ds_all` stores the number of active features before padding.
  4. `_batch_forward()` slices the estimators into batches and calls the frozen model.
  5. The wrapper keeps only the query-row outputs `train_size:orig_seq_len` and only the first `n_classes_` logits from the model's fixed width-10 head.
  6. It undoes any class-label shift that was applied to that ensemble member.
  7. It combines members by either averaging logits then applying temperature-scaled softmax (`average_logits=True`, default) or by averaging/weighting probabilities (`average_logits=False`, used by the ensemble preset).
  8. If calibration is active, it applies Platt scaling or vector scaling after ensemble aggregation.
  9. `predict()` then takes `argmax` and inverse-decodes class IDs back to original labels. (Source: `tabfm/src/classifier_and_regressor.py` `_predict_proba_internal`, `_process_logits`, `predict_proba`, `predict`)

- What `.predict()` does for regression:
  1. It runs the same feature/ensemble construction path.
  2. The backbone returns one scalar per query row in standardized target space.
  3. The wrapper either averages members in standardized space and inverse-transforms once, or inverse-transforms each member first and combines them with NNLS weights.
  4. The final output is on the original target scale. (Source: `tabfm/src/classifier_and_regressor.py` `_predict_internal`, `_combine_predictions`, `predict`)

- Important implementation detail:
  - The scikit-learn wrappers do not use the JAX `prefill()` / `decode()` cache path. They rerun the full concatenated forward for each call to `predict` / `predict_proba`. (Source: `tabfm/src/classifier_and_regressor.py`, `tabfm/src/jax/model.py`)

## 4. TabFM vs TabFM-Ensemble

`TabFM-Ensemble` is not a separate neural architecture or separate pretrained checkpoint. It is a wrapper preset that turns on heavier feature engineering, more aggressive aggregation, and calibration around the same frozen TabFM backbone. (Source: `tabfm/src/classifier_and_regressor.py` `TabFMClassifier.ensemble`, `TabFMRegressor.ensemble`)

- `TabFMClassifier.ensemble(model)` sets these overrides on top of the base classifier defaults.
  - `n_estimators=32`
  - `average_logits=False`, so it aggregates probabilities rather than logits
  - `n_feature_crosses="sqrt"`
  - `n_svd_features="sqrt"`
  - `enable_nnls=True`
  - `binary_calibration_method="platt"`
  - `multiclass_calibration_method="vector"` (Source: `tabfm/src/classifier_and_regressor.py` `TabFMClassifier.ensemble`)

- `TabFMRegressor.ensemble(model)` sets these overrides.
  - `n_estimators=32`
  - `n_feature_crosses="sqrt"`
  - `n_svd_features="sqrt"`
  - `enable_nnls=True` (Source: `tabfm/src/classifier_and_regressor.py` `TabFMRegressor.ensemble`)

- Every concrete component of the ensemble wrapper is visible in code.
  - Feature shuffling: every member gets a shuffled subset/order of active features. If no augmentation/subsampling is enabled, `FeatureShuffler(method="random")` supplies the permutations. (Source: `tabfm/src/classifier_and_regressor.py` `FeatureShuffler`, `EnsembleGenerator._generate_ensemble`)
  - Normalization diversity: members are distributed across normalization pipelines, defaulting to `["none", "power"]` unless overridden. (Source: `tabfm/src/classifier_and_regressor.py` `EnsembleGenerator.fit`)
  - Classification class shifts: for classification, members can be assigned label offsets modulo `n_classes`, and those offsets are undone after prediction. This remains active in the ensemble preset because `class_shift` defaults to `True`. (Source: `tabfm/src/classifier_and_regressor.py` `EnsembleGenerator._generate_ensemble`, `_predict_proba_internal`)
  - Cross features: only non-categorical original features are eligible. The generator samples multiplicative pairs `X[:, i] * X[:, j]` and appends them as extra columns. Under the `"sqrt"` schedule, even-indexed members get no cross features and odd-indexed members get `max(1, int(sqrt(n_cols)))` sampled crosses. (Source: `tabfm/src/classifier_and_regressor.py` `_get_member_n_features_list`, `_append_cross_features`, `EnsembleGenerator.fit`)
  - SVD features: the generator builds a preprocessing pipeline that one-hot encodes categorical columns and standard-scales numeric columns, then fits `TruncatedSVD` on the original features. Extra SVD components are appended as new columns. Under the `"sqrt"` schedule, the same split rule applies: half the members get none, half get `max(1, int(sqrt(n_cols)))` sampled SVD components from the pool. (Source: `tabfm/src/classifier_and_regressor.py` `EnsembleGenerator.fit`, `_append_svd_features`)
  - NNLS weighting: ensemble weights are learned from out-of-fold predictions by non-negative least squares, then blended with uniform weights using `nnls_beta=0.75`. (Source: `tabfm/src/classifier_and_regressor.py` `TabFMClassifier.fit`, `TabFMRegressor.fit`)
  - Calibration: classification-only. Binary uses Platt scaling on log-odds; multiclass uses vector scaling on log-probabilities. Both are regularized with `calibration_lambda=1e-2`. (Source: `tabfm/src/classifier_and_regressor.py` `_fit_calibration`, `_apply_calibration`)

- What is not part of the ensemble preset:
  - It does not enable categorical-value permutation (`permute_categorical` stays `False` unless the caller overrides it).
  - It does not make row subsampling mandatory (`max_num_rows` stays `None` unless overridden).
  - It does not swap to different TabFM weights. (Source: `tabfm/src/classifier_and_regressor.py`)

## 5. Known limitations and caveats

The hard limits in the inspected sources are on output classes and practical memory, not on a fixed row count. The wrappers mitigate memory with batching/chunking and optional subsampling, but they do not change the fact that TabFM reads the full training set as context for each ensemble member. (Source: `tabfm/src/classifier_and_regressor.py`, `tabfm/src/pytorch/model.py`, HF model card section "Limitations")

- Maximum context size:
  - There is a hard class-count limit of 10 for classification. `fit()` raises if the dataset has more than `model.max_classes`. (Source: `tabfm/src/classifier_and_regressor.py` `TabFMClassifier.fit`, HF model card section "Not Intended For")
  - There is no explicit hard row limit in the released wrappers. Context length is simply `n_train + n_test` per ensemble member.
  - There is also no architectural hard feature limit in the core model, but the wrapper defaults to `max_num_features=500`, and the model card says the model is optimized for tables up to 500 features. (Source: `tabfm/src/classifier_and_regressor.py`, HF model card section "Limitations")

- GPU / hardware requirements:
  - The repo supports CPU and GPU backends for both JAX and PyTorch.
  - The sources do not publish a minimum GPU requirement.
  - The PyTorch model comments say its always-on chunk sizes were chosen for memory safety on a 40 GB GPU on TabArena-scale tasks. (Source: `README.md`, `tabfm/src/pytorch/model.py`)

- Inference latency characteristics:
  - Inference cost scales with context rows because all training rows are included in the forward pass for every estimator.
  - The code comments explicitly note that activations grow with `rows * features` and can OOM large tasks.
  - The default `batch_size=1` means ensemble members run serially unless the caller increases it, which lowers memory pressure but increases latency.
  - Classification/regression ensemble fitting can be much slower than base fitting because NNLS/calibration require out-of-fold forward passes over the training set. (Source: `tabfm/src/pytorch/model.py` chunking comments, `tabfm/src/classifier_and_regressor.py`)

- Failure modes / OOD behavior:
  - The model card says performance on specific real-world domains, minority groups, or edge distributions is not fully characterized.
  - It recommends evaluation on held-out data representative of the deployment use case before high-stakes use.
  - The model card also says performance is not guaranteed to match task-specific fine-tuned models on all datasets. (Source: HF model card sections "Ethical Considerations" and "Limitations")

- Source discrepancy worth noting:
  - The model card describes the ICL stage as a "causal transformer", but the released code implements an encoder stack with a train-row key/value mask rather than a standard autoregressive causal mask. For technical writing, the code path is the stronger source for the forward-pass description. (Source: HF model card section "Model Architecture"; `tabfm/src/pytorch/model.py` `ICLearning.forward`, `tabfm/src/jax/model.py` `ICLearning.__call__`)

## 6. Relationship to TabPFN and TabICL

The inspected repo and model card do not explicitly state that TabFM is built on TabPFN or TabICL, and they do not cite either name. (Source: repo-wide search over `google-research/tabfm`, HF model card text)

- There are no occurrences of `TabPFN` or `TabICL` in the README, code, tests, or Hugging Face model card.
- The provided sources do not include an acknowledgements section tying the release to either project.
- The only citation in the model card is a generic `tabfm2026` entry pointing to the Google Research blog post, not to a paper or to TabPFN/TabICL. (Source: HF model card section "Citation")
- Because the inspected sources do not document that relationship, any stronger claim that TabFM differs from or extends TabPFN / TabICL would be speculation and should not be stated as repo-grounded fact.
