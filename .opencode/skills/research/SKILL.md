---
name: research
description: "Validates existing URLs and fills research gaps with targeted web searches to produce research_brief.md grouped by ToC section. DO trigger: after brainstorm is complete and post.yaml exists; when URLs in notes.md need validation; when sources are needed to support draft sections. DO NOT trigger: before brainstorm is complete; when research is already marked complete and no redo is requested; for tasks that do not involve sourcing external references. Keywords: research, web search, URL validation, sources, research_brief, ToC gaps."
license: proprietary
metadata:
  author: jose-parreno-garcia
  version: "1.2"
---

Input: `posts/<slug>/` path, passed as the skill argument (`postFolder`) or defaulted from the current directory.

Run research for the post in `postFolder` (or the current post folder if none given).

## Before you start

### 1. Locate the post folder
If `postFolder` is provided, that is the post folder. Otherwise look for a `post.yaml` in the current directory. If neither exists, stop and tell Jose to provide a folder path.

### 2. Check stage guard
Read `post.yaml`. If `stages.research.status` is `complete`, say:
> "Research is already marked complete for this post. Do you want to redo it? This will overwrite `research_brief.md`."
Wait for explicit confirmation before proceeding.

### 3. Check brainstorm stage
If `stages.brainstorm.status` is not `complete`, say:
> "Brainstorm has not been completed for this post. Run the brainstorm skill first to produce a `post.yaml` and rough ToC before researching."
Stop.

---

## Research execution

Use the runtime's `webfetch` capability to retrieve known URLs. For open-ended searches, prefer the runtime's native `websearch` capability when available. If `websearch` is unavailable, use `webfetch` against DuckDuckGo Lite at `https://lite.duckduckgo.com/lite/?q=<url-encoded-query>` and parse its numbered results. Do not require context-mode, browser automation, or an MCP-specific search tool.

Invoke a subagent with the following prompt (substitute `POST_FOLDER` with the resolved folder path before invoking):

**Sequential fallback (no subagent capability):** run the same steps directly in the main session against the resolved post folder.

> Run research for the post at `POST_FOLDER`.
>
> **Step 1 — Read inputs**
> Read in full:
> - `POST_FOLDER/post.yaml` — use: `working_title`, `thesis`, `topics_to_cover`, `topics_to_exclude`, `open_research_questions`
> - `POST_FOLDER/notes.md` — use: brainstorm summary, rough Table of Contents, any URLs already present
>
> **Step 2 — Detect existing URLs**
> Scan `notes.md` for any URLs (lines containing `http://` or `https://`). Collect them as the incoming list.
> If `notes.md` contains no URLs, scan all other `.md` files in `POST_FOLDER` for lines containing `http://` or `https://` and add any found URLs to the incoming list. Note which file each URL came from.
> If still no URLs found after scanning all `.md` files, skip to Step 4.
>
> **Step 3 — Validate and enrich existing URLs**
> For each URL in the incoming list:
> - Fetch the page using `webfetch`.
> - If unreachable or returns an error: add it to Dropped Sources with the observed reason. Do not silently discard it.
> - If reachable: inspect the returned page content for the post thesis keywords, extract the page title, write a 1-3 sentence summary of what it covers and why it is relevant to the post's thesis, and map it to the most relevant ToC section.
>
> Keep a running list of: `{ url, title, summary, toc_section }` for surviving sources.
>
> **Step 4 — Identify gaps**
> List every distinct section or concept from the rough ToC in `notes.md`, plus every item in `open_research_questions` from `post.yaml`. For each: check whether at least one surviving source is mapped to it. Sections with no source = gaps list. If no gaps and total sources ≤ 10: skip to Step 6.
>
> **Step 5 — Fill gaps with targeted searches**
> For each item in the gaps list (working through ToC order):
> 1. Formulate a specific search query based on the section/concept and the post's thesis
> 2. Search using native `websearch` if available. Otherwise use `webfetch` against `https://lite.duckduckgo.com/lite/?q=<url-encoded-query>`.
> 3. Parse the numbered DuckDuckGo Lite results when using the fallback. Extract the top 3-5 result URLs and titles.
> 4. If the search call or fallback fetch fails, record the query as an unresolved research gap and continue with the next gap. Never claim a source was found when search failed.
> 5. Scan the results — select the most relevant, credible URL not already in the list.
> 6. Check domain variety: if the selected domain already has 2 sources in the list, skip it and pick the next best result.
> 7. Fetch the selected URL using `webfetch`. If unreachable, try the next result and record dropped URLs with their observed reasons. If reachable, inspect the returned page content to extract the title, write a 1-3 sentence summary, and map it to the gap section.
> 8. Add the verified source to the running list only after the page fetch succeeds.
>
> Hard cap: stop adding new sources via search once 10 have been added via search. Pre-existing validated sources from the post folder do not count toward this cap.
> Variety rule: never exceed 2 sources from the same domain across the entire brief.
>
> **Step 6 — Write `research_brief.md`**
> Write to `POST_FOLDER/research_brief.md`:
>
> ```
> # Research Brief: <working_title>
>
> **Generated:** <today YYYY-MM-DD>
>
> ## Summary
> <1 paragraph: how many URLs were in notes.md, how many survived validation,
> how many were added via search, which sections (if any) remain uncovered>
>
> ## Sources
>
> ### <ToC section or concept name>
> - **[<title>](<url>)**
>   <1-3 sentence summary>
>
> [repeat for all sections that have at least one source]
>
> ## Research Gaps
> <Bullet list of sections with no source. Omit if no gaps.>
>
> ## Dropped Sources
> <Bullet list of URLs that were unreachable during validation, with a one-line reason (e.g. "signup wall", "404", "paywalled"). Omit section if no URLs were dropped.>
> ```
>
> Group sources under the ToC section they were mapped to. If a source is relevant to multiple sections, place it under the most specific one.
>
> **Step 7 — Update `post.yaml`**
> Re-read `post.yaml` from disk immediately before writing — do not use any cached version from earlier in this run. Update only these fields, leaving all other fields exactly as they are:
> ```yaml
> artefacts:
>   research_brief: research_brief.md
> stages:
>   research:
>     status: complete
>     completed_at: <today YYYY-MM-DD>
> ```
>
> **Step 8 — Return summary**
> Return:
> - Total sources (X from post folder files, Y found via search)
> - Any sections in Research Gaps
> - Count of URLs dropped and reasons (e.g. "2 dropped: signup wall, 404")
> - Any search queries that could not be completed, clearly marked as unresolved

Once the subagent completes, tell Jose:
- Total sources and breakdown
- Any Research Gaps
- Path to `research_brief.md`
