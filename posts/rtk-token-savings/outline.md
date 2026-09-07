# Outline: RTK promises to cut your Claude Code token bill. Does it?

**Target:** ~20 min read (~5,000 words)

**Subtitle:** How command-aware compression works, where the savings actually come from, and why fewer shell-output tokens do not necessarily mean a cheaper coding agent.

---

## Sections

### Preview section
- Labelled bullet list — one entry per major content section
- Sources: n/a (structural)

### 1. The problem: coding agents consume an absurd amount of context
- Start with the problem the reader already recognises. A normal coding session accumulates file contents, search results, Git diffs, test output, compiler output, logs, package-manager output, directory listings, repeated tool results, conversation history.
- Key angle: a surprising amount of this is machine-generated text written for humans, not for LLMs. Some commands are hilariously verbose. Land on the obvious question: if the agent doesn't need every character that `git`, `pytest`, `cargo`, `npm`, or `grep` prints, why send all of it into the context window?
- Do NOT imply yet that filtering this means a cheaper task. Just establish the problem.
- Sources: S01, S08, S09

### 2. What RTK is (and what it is not)
- RTK is not an LLM compression algorithm. It does not summarise logs with another model. It does not rewrite English into compressed language. It does not shrink model output or the conversation.
- RTK is a Rust binary that sits between the shell and the agent. It runs the real command, transforms the output with command-specific logic, and returns a compact representation. The underlying tool is always invoked — RTK is a filter, not an emulator.
- Name the "observability filter" framing here. RTK knows which command produced the output, so it makes command-specific decisions. Contrast this with generic compression: RTK emits ordinary developer text (paths, error messages, counts) rather than asking the model to decode a novel compressed language. That is its architectural strength.
- Brief table: RTK vs response-style compression vs prompt/context compression vs provider caching — what each changes, main advantage, main risk.
- Sources: S01, S03, S04

### 3. How RTK intercepts commands
- This is the technical heart of the first half. Walk through the full interception flow with a diagram.
- **The hook mechanism.** For Claude Code, RTK uses a PreToolUse hook that transparently rewrites eligible Bash commands before the agent sees the result. The agent types `git status`; the hook rewrites it to `rtk git status`; RTK runs the real `git status`, filters the output, and returns the compact form. From the agent's perspective, it issued a normal command and got a result.
- **Diagram: the full interception flow.**
  ```
  Claude Code issues Bash tool call
          ↓
  PreToolUse hook fires
          ↓
  Is this command RTK-eligible?
     ↙              ↘
   Yes              No
    ↓                ↓
  rtk <cmd>     raw command
    ↓
  real CLI executes
    ↓
  command-specific filter
    ↓
  compact output + exit code preserved
          ↓
  Claude Code sees result
  ```
- **What "eligible" means.** RTK supports 100+ commands. Commands outside this list pass through unchanged. Complex shell forms (pipes-to-files, heredocs, substitutions) are often not rewritten. Critically: Claude Code's built-in `Read`, `Grep`, and `Glob` calls do NOT pass through the Bash hook — they bypass it entirely. This is a fundamental ceiling for source-heavy coding workflows.
- **Installation and integration commands.** Cover `rtk init -g` for Claude Code, and briefly name the other integrations (Gemini CLI, Codex, Cursor, Windsurf). Show the verification steps: `rtk --version`, `rtk gain`, `which rtk`. Note the crates.io name collision (Rust Type Kit) and how to detect it.
- Sources: S01, S03, S05, S08

### 4. Inside the filters: what Claude actually sees
- This section should be the most concrete in the post. Per-command before/after examples. Show the raw output, show what RTK passes to Claude Code, name what was removed and why.
- **The filter strategies.** RTK is not one compressor — it is a collection of specialised representations chosen per command family. Walk through each strategy with examples:
  - *Failure focus* (`pytest`, `cargo test`, `npm test`, `go test`): collapse passing tests to a count, keep failures and selected tracebacks. Show before (200 lines, 199 passes, 1 failure) and after (count + failure block).
  - *Field selection* (`git status`, `git log`, `docker ps`): keep essential columns/fields, drop decorative lines, prose advice, blank lines. Show before/after for `git status`.
  - *Grouping* (`grep`, `rg`, `ruff`, compiler errors): group matches/errors by file or rule, remove repeated prefixes. Show before/after for a multi-file grep.
  - *Deduplication* (logs, container logs): collapse repeated lines to one line plus a repetition count. Show before/after for a log with a recurring error.
  - *Structure extraction* (`ls`, `tree`): compact hierarchy with file counts rather than one metadata-heavy line per entry.
  - *Truncation* (large outputs, long lines): limit output length, retain a summary or recovery path.
- **The aggressive read mode.** `rtk read` at "aggressive" level strips function bodies and retains signatures/structure. Show before (full file) and after (signatures only). Name when this is useful (architecture discovery) and when it is dangerous (fixing a subtle implementation bug where the body is the substance).
- **What exit codes do.** RTK preserves the exit code of the underlying command. An `rtk pytest` that finds failures exits non-zero, just as raw pytest would. This is not a detail — it means the agent's error-detection logic is not disrupted.
- **The key mental test.** After showing examples: if a senior engineer saw only the RTK representation, could they choose the same next action as if they saw the raw output? If yes, compression is task-sufficient. If no, the raw information was evidence, not noise.
- Sources: S01, S03, S04, S10, S11

### 5. The recovery system and RTK's own analytics
- RTK is a lossy filter. What happens when the compact output isn't enough?
- **The tee facility.** RTK can save the full raw output of a failed command and include the file path in the compact result. The agent can then read the raw trace without re-executing the command and creating another turn. This is more important than it looks: a good compressor should make the common case cheap without forcing re-execution just to recover detail.
  - Show the config: `[tee] enabled = true, mode = "failures"`.
  - Show what the compact result looks like when tee is active: the agent sees the summary plus a path to the full raw output.
- **Exclusions.** The `exclude_commands` config is an important safety valve. Show the config: `[hooks] exclude_commands = ["curl", "playwright"]`. Name when to use it: commands where raw output is machine-readable by downstream steps, or where an RTK filter has caused local trouble.
- **`rtk gain` — what it measures and what it doesn't.** `rtk gain` shows estimated token savings on RTK-visible command output, using a bytes/4 approximation. It is a compression telemetry tool, not an invoice forecast. Show example output. Then name the gap: it compares compact output against the full raw output it intercepted, while the host agent may already truncate very large tool responses. It cannot see system instructions, file reads, cached context, or model output. High `rtk gain` numbers and flat provider bills are not a contradiction.
- **`rtk session` and `rtk discover`.** `rtk session` shows activation and coverage for the current session — which commands were intercepted and how many. `rtk discover` analyses Claude Code history for missed opportunities (commands that ran but weren't intercepted). These are the right tools for estimating addressable surface before committing to a team rollout.
- Sources: S01, S03, S04, S08

### 6. The economics: why big local savings dilute
- **The ceiling arithmetic.** Suppose shell output is ~3.3% of the total cost of an agent session (cite W&H corpus). RTK compresses that output by 80%. The theoretical first-order saving is roughly 80% × 3.3% = 2.64 percentage points, not 80%. The rest of the session — system instructions, file reads, tool schemas, cached conversation history, model reasoning, generated code, assistant output — is untouched. RTK directly controls only the first transition in the chain: `raw command bytes → RTK-delivered bytes → new model-visible input → repeated cache traffic → turns/output tokens → cost per successful task`.
- Must-have visual: waterfall/composition diagram showing total agent cost = 100%, with tool output highlighted as the ~3.3% RTK-addressable fraction. Then show: 80% of 3.3% ≈ 2.64 percentage points.
- **Agents are loops, not single API calls.** RTK can change the agent trajectory. If RTK hides a line Claude later needs, the agent may run another command, reopen a file, request more context, or reason for another turn. One extra turn can resend a large cached context. 500 tokens saved can cause 8,000 tokens of additional interaction. The compression worked perfectly. The agent became more expensive anyway.
- Scenario visual: Scenario A (useful compression, task completes) vs Scenario B (missing clue → extra turn → context replay → net cost increase).
- Sources: S08, S09

### 7. What happens when independent researchers test RTK?
- The reveal. Use two independent sources as sub-sections.
- **7.1 JetBrains SkillsBench.** Paired-agent benchmark: Claude Code, Claude Sonnet 5, 425 billed trials, 86 tasks, RTK v0.43.0. At low reasoning effort: +7.6% cost, +13.8% more turns, +14.3% more cache reads. At high effort: approximately neutral (+0.1%). Task quality unchanged in both settings. Why: in their 83-transcript replay, only ~33% of Bash calls were rewritable, carrying just under 20% of tool-result characters — a ~3% input-token ceiling even at perfect local compression. The pre-analysis is the most transferable result: estimate the addressable surface before paying for a benchmark.
- **7.2 A larger empirical study finds something subtler.** Weinberger & Hozez (2026): 2,848 provider-billed Claude Code runs, 103 tasks, seven repositories, three models. Shipped RTK v0.44.1: -2.7% in the primary experiment. Holdout interval crossed zero. Opus replications approximately flat. RTK-ML (more aggressive research arm, not stock RTK) was +6.8% more expensive despite removing more tokens — strong evidence that "tokens removed" is not a sufficient performance metric.
- Key reframe: not "RTK does not work." The emerging picture is small average end-to-end savings across broad coding workloads, with larger gains concentrated in specific command-heavy tasks. That is a conditional yes, not a debunking.
- Must-have visual: three-column table — RTK local benchmarks (often very large), JetBrains SkillsBench (~0 / sometimes higher), W&H empirical study (~small positive). Annotate: different measurement surfaces → different numbers.
- Sources: S08, S09

### 8. When can RTK hurt?
- **Failure mode 1 — the missing diagnostic.** RTK removes a line that looked unimportant but contained the clue: one unusual stack-trace frame, a warning on a successful command, ordering of events in concurrent logs.
- **Failure mode 2 — exact edit anchors disappear.** The model needs exact paths, offsets, line references, or values. Cite the SWE-bench-derived experiment: aggressive compression reduced patch applicability from 27/40 to 15/40 (research arm, not stock RTK, but demonstrates the failure class).
- **Failure mode 3 — machine-readable stdout gets transformed.** stdout is both human evidence and a data interface. Another program piping or redirecting the output may not accept the compact representation. Cite the historical grep/wc issue: 83 lines became RTK summaries; a subsequent `wc` no longer measured the original data. Use `rtk proxy` / raw command for anything feeding a parser, redirect, or pipe.
- **Failure mode 4 — parser drift.** RTK understands a command's output format today. The upstream CLI changes. A specialised parser can become incorrect even though the underlying command still works.
- **Failure mode 5 — extra turns erase the saving.** The most economically important failure. Less evidence → uncertainty → another tool call → context replay. Covered mechanically in section 6, illustrated concretely here with a specific example.
- Sources: S08, S09, S12, S13

### 9. The counter-intuitive conclusion: RTK can work perfectly and still save almost nothing
- Short section. Deserves to stand alone.
- Three statements can simultaneously be true: (1) RTK compresses shell output by 70%. (2) Claude solves the task equally well. (3) The total session costs almost exactly the same. There is no contradiction. Shell output simply was not a large enough part of the bill.
- This is probably the single takeaway readers should carry away.
- Sources: synthesis — no external source required

### 10. So should you use RTK? And how?
- **Verdict.** Yes, selectively. Not because of the 70–90% headline — because deterministic output filtering is technically sound, some workflows contain absurd quantities of redundant CLI output, local compression can extend usable context, and the operational cost is low. Expect small average end-to-end cost savings with larger wins in verbose, shell-heavy workflows.
- **Who should use it.** Teams with verbose test suites, linters, build tools, Git history, infrastructure CLIs. Repositories where shell output visibly dominates agent context.
- **Who should be cautious.** Teams whose agents mostly use built-in source reading/search. Workflows that treat stdout as structured data or require byte-exact snippets. E2E, production, security, or concurrency debugging where secondary diagnostics are often the actual clue.
- **Deployment ladder.**
  - Step 1: estimate addressable surface first. Run `rtk discover` on existing transcripts, or sample 20–50 sessions manually. Measure the fraction of tool-result bytes that are both shell-based and RTK-eligible. If it's under ~5%, the economic ceiling is low regardless of compression quality.
  - Step 2: direct command parity checks before full agents. Compare raw vs RTK for success and failure cases on your actual command mix. Grade evidence retention, not just byte reduction.
  - Step 3: start with high-volume verbose commands — test suites, logs, search, builds.
  - Step 4: configure exclusions and tee before widening coverage. Keep escape hatches.
  - Step 5: watch for extra agent turns. If RTK is causing retrieval or retry behaviour, the saving is illusory.
- **How to test.** ~15–20 representative coding tasks, baseline vs treatment, enough repetitions to observe agent variance. Primary KPI: cost per successfully completed task. Guardrails: test pass rate, task completion, turns, wall-clock time, input tokens, cache reads/writes, output tokens. RTK-specific: raw command-output tokens, RTK-visible tokens, compression ratio, commands intercepted, additional recovery calls. Segment by task type — ask which tasks become cheaper and why, not just whether RTK saves tokens on average.
- Sources: S01, S08, S09, S11, S18

### Closing section (heading: "Closing thoughts")
- RTK is one of the more technically defensible ideas in the token-saving space because it targets a domain — CLI output — with lots of known structure and redundancy. The design premise is sound. The ceiling is smaller than the headline implies because the surface it controls is a small fraction of the total agent trajectory.
- The broader lesson: the metric that matters is cost per successfully completed task at held quality. Any optimisation that reduces tokens while increasing turns, retries, or failure rate is moving the wrong number.
- Brief closing thought: tools like RTK are attempting something genuinely useful — increasing the information density of what the model sees, not just making context shorter. That is a better target. But it needs to be measured on your task distribution, not someone else's benchmark.
- Sources: synthesis — no external source required

### Now, I want to hear from you
- Named `##` section — always `## Now, I want to hear from you`
- 2–4 specific questions tied to this post's argument (e.g. what fraction of their agent sessions actually pass through verbose shell commands; whether they've run `rtk discover` and been surprised by the addressable surface; whether they've hit a failure mode where missing evidence caused extra turns; whether `rtk gain` numbers have ever matched their provider bill)
- Sources: n/a (structural)
