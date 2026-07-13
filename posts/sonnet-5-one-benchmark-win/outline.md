# Outline: How Sonnet 5 Is Only Good at 1 Thing

**Target:** ~20 min read (~5000 words)

## Sections

### Preview section
- Labelled bullet list — one entry per major content section, bold text matches exact H2 wording
- Sources: n/a (structural)

### 1. What is Claude Sonnet 5's agentic upgrade?
- Covers: effort levels (low/medium/high/xhigh/max), why effort labels aren't comparable across generations (Sonnet 5 medium ≈ Sonnet 4.6 high in observed thinking length), the new tokenizer (~1.0–1.35x more tokens for identical text, ~30% planning estimate), manual sampling controls removed, agent scaffold swap (mini-SWE-agent replacing Terminus-2 after 2.7x more timeouts at xhigh effort on Terminal-Bench).
- Angle: ground the reader in mechanics before any benchmark claim lands — every comparison later in the post depends on knowing effort levels and tokenizers aren't apples-to-apples across generations.
- Sources: [What's new in Claude Sonnet 5 (Simon Willison)](https://simonwillison.net/2026/Jun/30/claude-sonnet-5/) for independent tokenizer quantification (1.4x English, 1.33x Spanish, 1.28x Python, ~flat Mandarin) and confirmation that manual sampling/thinking budget controls are gone; Claude_Sonnet_5_Evidence_Report.md (Anthropic system card facts — effort levels, tokenizer ratio, Terminus-2 timeout swap) — no URL, prose citation only.

### 2. What does Anthropic claim about Sonnet 5's benchmark gains?
- Covers: the launch chart, "most agentic Sonnet" positioning, official deltas on SWE-bench Pro (58.1→63.2), Terminal-Bench 2.1 (67.0→80.4), FrontierCode (15.1→38.8), AutomationBench (5.3→13.5).
- Angle: these are real, large, officially-reported gains — not disputing the numbers, but naming exactly what conditions produced them (five-trial averages, specific harnesses, xhigh/max effort) sets up why "official gain" and "buy at any tier" are different claims.
- Sources: Claude_Sonnet_5_Evidence_Report.md (Anthropic system card, Section 3 and 5.1 tables) — no URL, prose citation only, vendor-attributed explicitly.

### 3. Is Sonnet 5 actually cheaper at matched intelligence tiers?
- Covers: the one comparison that survives scrutiny — Sonnet 4.6 medium vs Sonnet 5 medium at matched intelligence tier, same accuracy for lower cost. Contrast against the "$2.29 per Intelligence Index task, ~2x Sonnet 4.6, ~15% more than Opus 4.8" figure that appears when effort is NOT matched (max effort, ~40% more output tokens, ~3x agentic turns).
- Angle: this is the thesis-supporting claim — narrow, verifiable, real. The contrast between "matched tier = cheaper" and "max effort = pricier than Opus" is the whole methodological point of the piece in miniature.
- Sources: [Claude Sonnet 5: strong agentic performance at a higher cost per task (Artificial Analysis)](https://artificialanalysis.ai/articles/claude-sonnet-5-agentic-cost) — live-fetched, most load-bearing external source; [Claude Sonnet 5 model page (Artificial Analysis)](https://artificialanalysis.ai/models/claude-sonnet-5) — live pricing/Intelligence Index confirmation; Claude_Sonnet_5_Evidence_Report.md for the matched-tier framing and cost equation (cost per successful task = cost per attempt / success probability).

### 4. Contrasting and verifying — where do the mismatched comparisons break down?

#### 4a. What does cost-per-successful-task look like across Sonnet 5's own effort levels?
- Covers: CursorBench cost-per-success table (Sonnet 5 low $2.73 → medium $4.12 → high $5.61 → xhigh $7.09 → max $10.49), success rate rising 47.7%→61.5% while cost rises ~5x; GPT-5.6 Sol High and Opus 4.8 Max both cheaper per expected success than Sonnet 5 Max.
- Angle: explicitly flag CursorBench's current live public version as 3.1 (not 3.2) per research — the evidence report's "3.2" cost table cannot be independently verified against a public leaderboard right now; treat the specific numbers as report-sourced, not independently reproducible today.
- Sources: [CursorBench (Cursor)](https://cursor.com/blog/cursorbench) — confirms methodology and that 3.1 is the current public version; Claude_Sonnet_5_Evidence_Report.md for the specific cost-per-success table.

#### 4b. Why did the online backlash get the comparison wrong too?
- Covers: the "garbage bin" viral cost framing (screenshot-derived, unverifiable via X/Twitter per research — do not cite as confirmed fact) reframed through Zvi Mowshowitz's actual named, non-anecdotal critique (Sonnet 5 underperforms Opus 4.8 and Fable 5 on several benchmarks, "you're going to have to offer a bigger discount than that") while still conceding real niches (speed, cost-efficiency on simple tasks).
- Angle: the backlash and the launch chart commit the same sin in opposite directions — comparing without controlling for effort level or model tier.
- Sources: [Claude Sonnet 5 Is Not Frontier but Has Its Uses (Zvi Mowshowitz)](https://thezvi.substack.com/p/claude-sonnet-5-is-not-frontier-but) — named, credentialed, non-anecdotal counterpoint.

#### 4c. Are the behavioral complaints about Sonnet 5 verified?
- Covers: treat cautiously — the Neowin "won't follow commands, argues with users" report could not be independently verified (403 on every fetch attempt, no substitute report found). Do not present as fact. Fold into a general, explicitly-flagged anecdotal point using the one live corroboration found: a low-engagement Hacker News thread describing Claude's tone as "condescending" in a specific example — flagged as Tier 4/anecdotal, a much narrower and weaker claim than the Neowin one.
- Angle: this is exactly the kind of claim the post's own methodology should reject if it can't verify it — model the discipline it's asking of the reader.
- Sources: [Ask HN: Is it just me or does Claude / Sonnet 5 sound condescending recently?](https://news.ycombinator.com/item?id=48774742) — explicitly flagged Tier 4/anecdotal, single thread, 1 point/2 comments.

#### 4d. What does the coding construction-vs-review split actually show?
- Covers: CodeRabbit's precision/recall trade-off — precision up from ~29% (Sonnet 4.6) to ~38–40% (Sonnet 5), bug-catching recall down from ~63% to ~50–51%; pushing to maximum effort roughly doubled cost without meaningfully recovering recall; CodeRabbit recommends medium effort for most teams.
- Angle: "better at coding" collapses two different tasks (building vs reviewing) into one number — the split is the nuance the launch chart and the backlash both flatten.
- Sources: [Claude Sonnet 5 review: Should you switch? (CodeRabbit)](https://www.coderabbit.ai/blog/claude-sonnet-5-review) — independently validated, concrete precision/recall figures.

### 5. Where does Sonnet 5 genuinely hold up, independent of Anthropic's own harness?
- Covers: agentic coding and tool-use gains confirmed outside Anthropic's own evaluation — CodeRabbit's confirmation of stronger construction and self-testing persistence; Cursor's production-style benchmark (with the 3.1-not-3.2 caveat carried over) showing Sonnet 5 as a strong, if not dominant, coding-agent model at reasonable effort settings.
- Angle: the fair conclusion is narrower than either camp claims — real gain in a specific, well-evidenced lane (sustained agentic coding), not a universal upgrade.
- Sources: [CodeRabbit](https://www.coderabbit.ai/blog/claude-sonnet-5-review) (repeat citation, different angle — construction strength rather than review trade-off); [CursorBench](https://cursor.com/blog/cursorbench) (repeat citation — methodology confirms a real production-style agent harness).

### Closing section — short, not a full section
- Named heading, phrased as a short question to stay consistent with the H2-as-question rule used throughout the post (e.g. "Should you trust a launch chart or a viral tweet?")
- Synthesis: run your own benchmarks at your own effort/task mix; a launch chart and a viral tweet are both measuring someone else's workload under someone else's effort setting.
- Sources: synthesis — no external source (per research_brief and post.yaml, no citation needed for authorial closing thought)

### Now, I want to hear from you
- Named `##` section — `## Now, I want to hear from you`
- 2–4 questions tied to the post's argument (e.g. which effort level readers actually run in production, whether they've measured cost-per-success on their own workload, whether they've caught themselves comparing mismatched tiers)
- Sources: n/a (structural)

---

## ToC Suggestions

None — the fixed ToC from notes.md maps cleanly to research_brief.md sources with no gaps requiring restructuring.
