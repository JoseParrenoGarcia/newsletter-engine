---
name: index
description: "Maintains posts/INDEX.md — a ledger of all published pipeline posts and reference posts. Appends only new entries; never regenerates existing ones. DO trigger: after /promote completes for a new post; when a reference post has been added and is not yet indexed. DO NOT trigger: to re-summarise posts already in the index; when no new content has been added. Keywords: index, wiki, post index, table of contents, ledger, content catalogue."
argument-hint: "[posts/<slug>/ to index a specific pipeline post | blank to scan for all unindexed content]"
license: proprietary
compatibility: "Claude Code"
metadata:
  author: jose-parreno-garcia
  version: "1.1"
---

# /index

Append new entries to `posts/INDEX.md`. Entries are written once and never regenerated.

---

## Topic Groups (controlled vocabulary)

All posts must be assigned to exactly one topic group:

- `Claude Code` — skills, memory, agents, rules, planning, anything Claude Code-specific
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

**Reference posts:** find all `.md` files under `reference_posts/` (exclude `.DS_Store`, PDFs). Build a flat list of paths.

If `$ARGUMENTS` specifies a slug or path, restrict the candidate list to that entry only.

---

## Step 2 — Diff against existing index

Read `posts/INDEX.md`. For each candidate:
- Pipeline post: grep for `<!-- slug: <slug> -->`. If found, skip.
- Reference post: grep for `<!-- path: <relative-path> -->`. If found, skip.

Build a delta list of candidates not yet in the index.

If delta is empty, report "Index is up to date — no new entries to add." and stop.

---

## Step 3 — Summarise each new entry

Spawn a subagent for each delta entry (batch by topic group if multiple). Each subagent must:

**For a pipeline post:**
1. Read `posts/<slug>/post.yaml`. Extract: `working_title`, `content_type`, `structural_type`, `series_name`, `series_position`, `thesis`, `target_audience`, `topics_to_cover`.
2. Read `posts/<slug>/long_draft.md`. Skim the H1, H2s, intro, and conclusion.

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

1. Add a new row to the Table of Contents table (do not touch existing rows).
2. Find the correct `## <Topic Group>` section. If it doesn't exist yet, append a new one at the end.
3. Append the entry card inside that section using this format:

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

## Integration with /new-post

After `/promote` marks `stages.promote.status: complete`, `/new-post` automatically invokes `/index posts/<slug>/` to append the new entry.
