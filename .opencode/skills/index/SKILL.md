---
name: index
description: "Maintains posts/INDEX.md — a ledger of all published pipeline posts and reference posts. Appends only new entries; never regenerates existing ones. DO trigger: after the promote skill completes for a new post; when a reference post has been added and is not yet indexed. DO NOT trigger: to re-summarise posts already in the index; when no new content has been added. Keywords: index, wiki, post index, table of contents, ledger, content catalogue."
license: proprietary
metadata:
  author: jose-parreno-garcia
  version: "1.2"
---

# Index skill

Input: `posts/<slug>/` to index a specific pipeline post, passed as the skill argument (`postFolder`) — or blank to scan for all unindexed content.

Append new entries to `posts/INDEX.md`. Entries are written once and never regenerated.

---

## Topic Groups (controlled vocabulary)

All posts must be assigned to exactly one topic group:

- Runtime-specific assets — skills, memory, agents, rules, planning, or other provider-specific material
- `AI Tools & Adoption` — model selection, cost, open source vs frontier, tooling decisions
- `Data Science & Future of Work` — DS workflows, automation impact, career, LLM impact on DS practice
- `Data Science Leadership & Management` — managing DS teams, hiring, feedback, org design
- `Paper Explainers` — research paper breakdowns (Airbnb, Google, academic ML)

---

## Topics taxonomy (controlled tags)

Use kebab-case tags drawn from this list. Add new tags only when none of the existing ones fit:

`capability-gap` `model-selection` `cost-optimisation` `open-source-models` `chinese-models`
`claude-code` `memory` `claude-md` `session-context` `project-setup` `agents` `skills` `rules` `planning` `multi-agent`
`data-science` `llm-impact` `problem-framing` `automation` `career` `feature-engineering` `embeddings` `deep-learning` `search-ranking`
`management` `leadership` `hiring` `feedback` `team-design` `competency-framework`
`paper-explainer` `airbnb` `google` `ds-star` `reinforcement-learning` `fine-tuning`

---

## Step 1 — Build the candidate list

**Pipeline posts:** find all `posts/*/post.yaml` where `stages.promote.status == complete`. Extract the slug from the folder name.

**Reference posts:** find all `.md` files under `reference_posts/` (exclude `.DS_Store`, PDFs, `reference_posts/index.md`, and anything under `reference_posts/archive/`). Build a flat list of paths.

If `postFolder` specifies a slug or path, restrict the candidate list to that entry only.

---

## Step 2 — Diff against existing index

Read `posts/INDEX.md` (TOC only — no need to read per-topic files). Grep the TOC table for:
- Pipeline post: `<!-- slug: <slug> -->` in `posts/index/<topic>.md` OR the anchor `#<slug>` in the TOC table.
- Reference post: `<!-- path: <relative-path> -->` in any `posts/index/<topic>.md`.

Fastest check: scan the TOC table rows in `posts/INDEX.md` for the title or anchor. If found, skip.

Build a delta list of candidates not yet in the index.

If delta is empty, report "Index is up to date — no new entries to add." and stop.

---

## Step 3 — Summarise each new entry

**When invoked from the new-post skill:** the post's content is already in context. Do not re-read `long_draft.md`. Use the `working_title`, `thesis`, `target_audience`, and `topics_to_cover` already available from `post.yaml` to write the summary card directly.

**When invoked standalone:** invoke a subagent for each delta entry (batch by topic group if multiple). Each subagent must:

**Sequential fallback (no subagent capability):** work through each delta entry one at a time in the main session, following the same read/extract steps below.

**For a pipeline post:**
1. Read `posts/<slug>/post.yaml` only. Extract: `working_title`, `content_type`, `structural_type`, `series_name`, `series_position`, `thesis`, `target_audience`, `topics_to_cover`.
2. Do NOT read `long_draft.md` — `post.yaml` has everything needed.

**For a reference post:**
1. Read the `.md` file. Extract: H1 title, all H2 headings, first paragraph, last paragraph.
2. Infer category from folder path (`series/<theme>/<series-name>`, `standalone/<theme>`, `short_technical`) and series name + part number if applicable.

**Fields to return (both types):**
- `title` — exact H1 or working_title
- `topic_group` — one of the five controlled groups above
- `tags` — 3–6 kebab-case tags from the taxonomy
- `audience` — 1 sentence
- `summary` — 3–5 sentences: the central argument, the evidence or structure used, what the reader takes away. Prose, not a section list.
- `series` — series name + part number, or blank
- `type` — e.g. `standalone / genai-ai`, `series / data-science-management`
- `path` — relative path to the canonical draft
- `duplicate` — true if a reference post slug matches an existing pipeline post (pipeline entry takes precedence; skip the reference post)

---

## Step 4 — Append to INDEX.md

For each new entry:

1. Add a new row to the TOC table in `posts/INDEX.md` (do not touch existing rows).
2. Find the correct `posts/index/<topic-group>.md` file. If it doesn't exist yet, create it with a heading and agent note matching the existing files.
3. Append the entry card to that file using this format:

```
<!-- slug: <slug> -->         ← pipeline posts
<!-- path: <relative-path> --> ← reference posts
<a name="<anchor>"></a>
### <title>

| Field | Value |
|-------|-------|
| **Type** | <type> |
| **Series** | <series + part — omit row if blank> |
| **Audience** | <audience> |
| **Topics** | `tag1` `tag2` `tag3` |
| **Path** | `<path>` |

**Summary:** <3–5 sentence prose summary>

---
```

Do not touch any existing content.

---

## Step 5 — Report

Print:
- Entries added (N pipeline, N reference)
- Any duplicates skipped and why
- Any topic group assignments that were ambiguous (flag for Jose to confirm)

---

## Integration with the new-post skill

After the promote skill marks `stages.promote.status: complete`, the new-post skill automatically invokes the index skill on `posts/<slug>/` to append the new entry.
