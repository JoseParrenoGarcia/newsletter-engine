# Newsletter Engine

A repo-based writing system for creating blog and newsletter content. The workflow runs from durable repo files rather than chat memory, coordinating specialised agents across a repeatable content pipeline.

**Primary user:** Jose

---

## Architectural Principles

These govern every skill and orchestration design decision:

1. **File-based I/O contracts** — each skill reads from and writes to a predictable set of files. No skill reaches outside its contract. This is what makes both independent and orchestrated invocation possible.
2. **`post.yaml` is the nervous system** — it is the shared state that every skill reads from and appends to. It is not just metadata — it is the message bus.
3. **Every skill is standalone first** — skills like `/seo` and `/promote` must work on any draft, whether produced by the pipeline or written by Jose independently. No skill should require the full pipeline to have run first.
4. **The orchestrator grows incrementally** — `/new-post` chains only what is available at any point. Each milestone extends it. Separation from the individual skills is maintained throughout.
5. **Separation of concerns** — each skill has one job; the orchestrator has one job (sequencing). This enables triggering any step independently or running the full pipeline end-to-end unattended.

---

## What Is Portable Across Agents

These parts of the system are provider-agnostic and should be treated as the real engine:

- The repo layout and file contracts
- `post.yaml` as the shared state and stage ledger
- The artefact files each skill reads and writes
- The style guides, templates, and reference posts
- The procedures written in `.opencode/skills/*/SKILL.md`
- The reviewer personas written in `.opencode/agents/*.md`

If an agent can read markdown files and update repo files, it can operate this system.

---

## What Is Provider-Specific

These parts are convenience wrappers, not the core workflow:

- Claude slash-command invocation such as `/draft` or `/review`
- Claude-native agent spawning and parallel sub-agent execution
- Claude-specific MCPs, hooks, and session ergonomics
- Any instruction that assumes a Claude Code-only tool exists

If a provider lacks one of these capabilities, preserve the intended outcome and execute the same file contract manually.

---

## Canonical File Contracts

For any agent working in this repo, the source of truth is:

- `AGENTS.md` — top-level operating manual
- `.opencode/skills/*/SKILL.md` — executable procedures for each workflow stage
- `.opencode/agents/*.md` — specialist review personas, mainly used by the review skill
- `post.yaml` — shared post state, stage completion, metadata, and artefact pointers
- `templates/`, `style_guide/`, and `reference_posts/` — writing constraints and calibration context
- `posts/<slug>/` — the working directory for each post and all generated artefacts

Agents should prefer updating durable files over returning chat-only results.

---

## How Non-Claude Agents Should Interpret This Repo

If you are not running inside Claude Code:

- Treat each `.opencode/skills/*/SKILL.md` as a procedure to execute directly
- Treat each `.opencode/agents/*.md` as a reusable role prompt or review persona
- Use the file inputs and outputs described by each skill as the contract to follow
- Respect stage guards and overwrite checks described in the skill before writing files
- Update `post.yaml` whenever a skill says to mark a stage complete or register an artefact

The repo structure matters more than the runtime. If the files are updated correctly, the workflow is considered valid.

---

## Fallback Behavior When Native Tools Do Not Exist

Use these defaults when a provider lacks Claude-specific runtime features:

- No slash commands: open the corresponding `SKILL.md` and execute it manually
- No sub-agent primitive: use `.opencode/agents/*.md` as role instructions and run them in the main session
- No parallel agent execution: run critic roles sequentially, then synthesize the results
- No Claude MCP equivalent: continue with local repo files unless the skill truly requires external research
- No hook system: perform the required file updates directly if the workflow depends on them

Do not stop just because a Claude-native convenience is missing. Fall back to the file contract and continue.

---

## Repo Index

| Directory | Purpose |
|-----------|---------|
| `reference_posts/` | Jose's real posts (series, standalone, short_technical) |
| `style_guide/` | Voice, anti-patterns (shared/), per-type rules, promotion_formats.md |
| `.opencode/skills/` | Skill instruction files (one per skill) |
| `.opencode/agents/` | Critic agent definitions invoked by the review skill (voice, structure, impact) |
| `archive/claude-code/` | Retired Claude Code runtime assets (settings, hooks) — see `RESTORE.md` |
| `templates/` | Post folder template (`post.yaml`, `notes.md`, `placeholder.md`) |
| `posts/` | Per-post working folders with artefacts |
| `posts/INDEX.md` | TOC only — read this before brainstorming or ideating to see all covered topics at a glance (cheap, ~50 lines) |
| `posts/index/` | Per-topic card files — read the relevant `<topic>.md` for detailed summaries and paths; do NOT crawl post folders directly |

---

## Available Skills

| Skill | Description |
|-------|-------------|
| `/import-pdf` | Convert a PDF reference post to clean markdown |
| `/new-post` | Full pipeline orchestrator — new post or `--from-draft` mode |
| `/brainstorm` | Interactive brainstorm → `post.yaml` + expanded notes |
| `/research` | Validate + enrich URLs, fill gaps, write `research_brief.md` |
| `/draft` | Style-grounded outline + long-form draft |
| `/seo` | SEO brief + title variants (any draft) |
| `/revise` | SEO-driven draft revision + post-revision SEO verification (any draft + brief pair) |
| `/review` | 3-critic multi-agent debate → 6-dimension rubric + panel consensus + publish readiness verdict |
| `/promote` | LinkedIn + Substack bundle (any draft) |
| `/index` | Append-only post ledger — pipeline posts + reference posts → `posts/INDEX.md` |

---

## Runtime Dependencies And Conveniences

### Portable repo dependencies

These are the only truly required dependencies for the workflow itself:

- Markdown-readable skill, agent, and guide files
- The repo directory structure and file naming conventions
- Ability to read and write files in `posts/<slug>/`
- Ability to update `post.yaml` and stage artefacts predictably

### Provider-specific conveniences

These are helpful in Claude Code but are not required for another agent to operate the repo:

| Tool | Purpose |
|------|---------|
| `context-mode` | Context window management — `ctx_fetch_and_index`, `ctx_execute`, `ctx_search` |
| Chrome DevTools MCP | Browser automation for research gap-filling (DuckDuckGo searches via `new_page`, `fill`, `press_key`) |
| `rtk` | Token-optimised Bash proxy — rewrites all Bash commands transparently via `BASH_ENV` hook |

### Fallback expectation for other agents

If these conveniences are unavailable, continue by reading the repo files directly, performing the skill steps manually, and only skipping capabilities that genuinely require an unavailable external tool.

---

## Retired: Automation Hooks

Earlier versions of this repo ran two Claude Code-specific hooks (`detect-skill-complete.js`, `skill-reflector.js`) that produced a per-post `skill_reflection_log.md` telemetry file after each skill run. These were retired during the OpenCode migration: they were fragile (shared `/tmp` marker, heuristic detection, early triggering) and not workflow-critical — the pipeline already persists authoritative completion state in `post.yaml` and the artefact files themselves.

No replacement mechanism exists. Existing `skill_reflection_log.md` files in completed posts remain as historical artifacts. The retired hook scripts are preserved in `archive/claude-code/hooks/` — see `archive/claude-code/RESTORE.md` if they ever need to be restored.

---

## Rules

Behavioural and maintenance rules that apply every session.

### Content guardrails
- Never hallucinate references, sources, citations, or URLs. Flag uncertainty explicitly.
- No invented authors, books, papers, blog posts, or repos.
- No generic AI filler prose in any drafted content.
- No automatic publishing or irreversible file actions without explicit instruction.

### File handling
- Never read a PDF directly with a file-read tool. Requires `poppler` (see README for setup). Convert first, then work with the text output:
  ```
  pdftotext yourfile.pdf yourfile.txt
  ```
  Then convert the `.txt` to a clean `.md` file. Move the original PDF to `scratch/`.
- Reason: reading a PDF directly costs roughly 30x more tokens than plain text (73,500 vs ~2,400 for a 44-page document).
- When fetching arXiv papers remotely, always use the HTML version URL (`https://arxiv.org/html/<id>`) not the PDF URL (`https://arxiv.org/pdf/<id>`). The PDF URL returns raw binary that indexes as garbage; the HTML version converts cleanly to searchable markdown.

### Workflow guardrails
- Every skill reads from and writes to predictable files only. No side effects outside the post folder.
- Check `post.yaml` stage flags before running a skill. Do not overwrite a completed stage without explicit instruction from Jose.
- Style guides and reference posts are ground truth for tone and structure. Load the files referenced in `post.yaml` before drafting.

### Skill design guardrail
- The seo and promote skills must work on any draft — including posts written by Jose independently, outside the pipeline.

### Long-form file writes
- Most agent runtimes cap output per turn at a fixed token budget. Composing an entire long document (a full draft, a large rewritten section, a big generated report) as text in a single response — before it's written to a file — can exceed that cap and silently lose the write, even though the surrounding narration succeeds.
- Any time a task involves writing or rewriting more than roughly one section's worth of prose (a few hundred words), write incrementally: an initial write for the first chunk, then successive appends/edits for subsequent chunks. Never plan to hold a full long document in one response's output before it lands on disk.
- This applies to any skill or ad-hoc task producing long-form content, not just the drafting pipeline — apply the same incremental-write discipline whenever the task shape resembles "write a long document."

### Maintenance procedures

Apply these after any significant change: new directory added, new agent created, milestone completed, new skill required.

**Update `AGENTS.md`:**
- Add new directories to the Repo Index table
- Add new skills to the Available Skills table
- Add new runtime dependencies to the relevant table

**Update `README.md`:**
- Keep the repo tree structure current
- Update the pipeline diagram to reflect active skills
- Update the Requirements table if a new dependency or skill is needed

**Update `posts/INDEX.md`:**
- After publishing a new post (promote complete), run the index skill to append the new entry
- Do NOT manually edit index entries — the skill owns all content in that file
- If a reference post is added to `reference_posts/`, run the index skill to pick it up
