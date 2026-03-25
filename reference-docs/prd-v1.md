# Product Requirements Document (PRD)
## Newsletter Engine
**Version:** Draft v0.1  
**Status:** Initial PRD for implementation planning with Claude Code  
**Primary User:** Jose  
**Primary Environment:** Local git repository + VS Code + Claude Code  
**Document Purpose:** Define a reusable, Claude-friendly content system for blog/newsletter ideation, research, drafting, style alignment, and promotional content generation.

---

# 1. Executive Summary

Newsletter Engine is a repo-based, Claude-first writing system designed to help Jose create long-form and short-form written content more efficiently, more consistently, and with much less repetition of instructions.

The system is not intended to replace Jose as a writer. It is intended to act like a small editorial team inside a git repository: specialised agents handle brainstorming, research, structure, drafting, and promotion, while an orchestrator coordinates the workflow and writes outputs into a predictable folder structure.

The primary problem being solved is that the current workflow relies too heavily on one-off AI chats, duplicated threads, uploaded PDFs, repeated guidance, and manually recreated context. Valuable knowledge about tone, structure, expectations, and process is fragmented across conversations rather than encoded in a reusable system.

Newsletter Engine should solve this by:
- storing reference posts, style guides, and workflow instructions in the repo
- allowing Claude to operate from durable files rather than fragile chat memory
- supporting a repeatable flow from rough notes to structured content outputs
- producing a per-post bundle of artefacts such as notes, research brief, outline, long draft, and promotional copy
- keeping Jose in control of the final creative judgement

This PRD is intentionally explicit so Claude Code can use it as an implementation-oriented source of truth.

---

# 2. Product Vision

Build a reusable, repo-based content operating system that helps Jose go from rough ideas and notes to high-quality blog and newsletter outputs, using specialised agents coordinated by Claude.

The long-term vision is to create something that behaves like a small team:
- a thinking partner during ideation
- a researcher that finds references and supporting material
- a structural editor that proposes narrative flow
- a drafter that writes in Jose’s style
- a promotion specialist that repurposes completed content
- an orchestrator that ties all of this together

The system should be portable, reproducible, and easy to rehydrate on a new machine by cloning the repo and reopening it in Claude Code.

---

# 3. Problem Statement

Jose currently uses GenAI, mostly through ChatGPT, to help write newsletters and blog posts. While useful, the workflow is inefficient and fragile because:

1. **Instructions must be repeated frequently**
   - tone preferences
   - blog structure expectations
   - task-specific prompting
   - prior examples
   - promotional formats

2. **Context is trapped inside chats**
   - good conversations are duplicated
   - guidance is spread across many threads
   - PDFs are repeatedly uploaded
   - usable patterns are not systematised

3. **Outputs are fragmented**
   - research may live in one chat
   - draft in another
   - promos elsewhere
   - the workflow is manually stitched together

4. **Drafts often sound unlike Jose**
   - ChatGPT drafts are useful as raw material
   - but often require heavy editing
   - roughly half the text may be rewritten

5. **Research and ideation are not operationalised**
   - brainstorming is useful
   - deep research is useful
   - external references are useful
   - but the workflow is not encoded in a reusable way

6. **There is no durable content system**
   - no standard repo structure
   - no persistent style guide
   - no reusable task layer
   - no orchestrated production flow

The result is a workflow that is helpful but inefficient, repetitive, and overly dependent on manual prompting.

---

# 4. Product Goals

## 4.1 Primary Goals

### Goal 1 — Eliminate repeated instruction-giving
The system should encode reusable instructions, patterns, and workflows so Jose does not need to restate the same preferences every time a new post begins.

### Goal 2 — Improve draft usefulness
Long-form drafts should be significantly more aligned with Jose’s tone, structure, and writing habits than current generic AI drafts.

### Goal 3 — Support full content workflows
The system should handle more than just drafting. It should support:
- ideation
- research
- outline generation
- long-form draft generation
- promotional content generation

### Goal 4 — Increase speed and reproducibility
The system should make it faster to generate high-quality content artefacts while ensuring that the process is consistent across posts.

### Goal 5 — Keep Jose in control
The system should assist rather than replace. Jose should remain the final editor and owner of the writing.

---

## 4.2 Secondary Goals

- Create a durable repo structure that is portable across machines
- Package all outputs for a post in a predictable folder
- Allow interactive brainstorming followed by optional end-to-end generation
- Make it easier to reuse prior writing and learned patterns
- Build an architecture that can scale later into deeper automation and integrations

---

# 5. Non-Goals

The following are explicitly out of scope for the early versions unless later milestones say otherwise:

1. **Fully autonomous publishing**
   - no direct publishing to Substack, Medium, or LinkedIn
   - no automatic posting

2. **Replacing Jose’s writing process entirely**
   - the system is an assistant, not a ghostwriter with final authority

3. **Building a GUI or app in v1**
   - no Streamlit
   - no standalone web interface
   - no dashboard-first experience

4. **Complex external integrations in v1**
   - no Substack login
   - no Medium login
   - no CMS authentication flows
   - no content syncing systems

5. **Perfect style cloning from day one**
   - the goal is strong alignment, not magical identity replication

6. **Generic multi-user productisation**
   - the first versions are optimised for Jose only
   - generalisation to other users is not a current requirement

7. **Heavy autonomous agent spawning in early milestones**
   - the system may later support flexible agent generation
   - but early versions should prioritise clarity and reliability

---

# 6. Primary User

## 6.1 User Profile
Single primary user: Jose

Jose is the sole intended user for the first real version. The system should be optimised around his actual workflow rather than abstract generality.

## 6.2 Key User Needs
Jose needs a system that:
- remembers how he likes to work
- remembers how he likes content structured
- can learn from his best articles
- can act as a thinking partner during ideation
- can perform grounded research
- can generate drafts that sound less generic
- can produce promotional content from completed drafts
- can run inside a repo with Claude Code in VS Code

## 6.3 Why Repo Portability Matters
A major benefit of the git repo approach is that Jose should be able to:
- change laptop
- clone the repo
- reopen in VS Code
- work with Claude again in the same structured environment

This makes repo-based durability a product feature, not merely a technical choice.

---

# 7. Core Success Criteria

The system will be considered successful if it achieves the following:

## 7.1 High-Value Success Criteria

### A. Drafts sound more like Jose
Compared to current AI outputs, drafts should:
- feel less generic
- require significantly less rewriting
- better match Jose’s tone and flow

### B. Instructions do not need to be repeated
Key writing rules, patterns, formats, and preferences should live in durable repo files and reusable agent instructions.

### C. Research becomes more structured
The system should make it easier to move from rough notes to:
- better references
- more coherent structure
- clearer narrative direction

### D. Outputs are bundled cleanly
For a given post, the system should generate a coherent folder of artefacts rather than scattering output across chats.

### E. Workflow speed improves
The system should reduce friction across ideation, outlining, drafting, and promotional repurposing.

## 7.2 Important Constraint on Success
Success does **not** mean removing Jose from the writing loop.  
Success means improving:
- reproducibility
- quality
- speed
while preserving authorship and judgement.

---

# 8. Content Types Supported

Newsletter Engine must support multiple content modes rather than treating all posts as one generic type.

## 8.1 Long-Form Content Types

### Type A — Series-Based Long-Form Posts
Characteristics:
- part of a sequence
- builds on previous articles
- topic continuity matters
- should reflect cumulative progression

Example shape:
- technical educational series
- e.g. posts that build from one ML topic into the next

System implications:
- needs awareness of prior parts
- should preserve conceptual continuity
- should avoid repeating prior posts unnecessarily
- should help identify the “next logical post”

### Type B — Standalone Long-Form Essays
Characteristics:
- not part of a formal series
- often reflective, explanatory, or interpretive
- may simplify technical ideas for non-technical audiences
- may cover leadership, management, data science, AI, papers, or concepts

System implications:
- should optimise for clear narrative framing
- should help select what to include and exclude
- should support grounded references

### Type C — Shorter Technical Explainers
Characteristics:
- still article-like, but more condensed
- focused on tools, plugins, packages, or practical usage
- often:
  - what it is
  - why it matters
  - how to install
  - examples
  - when to use

System implications:
- should keep structure tighter
- should not overinflate content
- should favour practical clarity over essay-style sprawl

---

## 8.2 Promotional Content Types

### Type D — Article-Linked Promotional Posts
Characteristics:
- directly tied to a published or drafted article
- used to drive readers back to the article
- often distributed over multiple days
- can be adapted to Substack and LinkedIn
- should follow known structural templates

System implications:
- should generate several promotional variants
- should tease rather than reproduce the full article
- should preserve Jose’s promotion style
- should support a sequence of posts, not just one

### Type E — Standalone Short Notes
Characteristics:
- not necessarily tied to a full article
- short-form thinking
- can resemble concise social-style notes
- often in the 140–300 character range
- useful for small insights or observations

System implications:
- should support brevity and punchiness
- should not over-structure
- may later become a separate workflow

---

# 9. User Workflow

## 9.1 Current Real Workflow
Jose’s current pattern is:

1. Have a topic in mind
2. Create a rough set of points, often around 10
3. Points may include:
   - copied notes from reading
   - his own thoughts
   - fragments without strong logical order
4. Use AI to brainstorm
5. Use AI or research to find:
   - relevant sources
   - missing angles
   - stronger framing
   - things to exclude
6. Propose a table of contents
7. Define key bullet points within sections
8. Draft the article
9. Create promotional content from the article

This existing process should be mirrored, improved, and operationalised.

---

## 9.2 Target Workflow in Newsletter Engine

### Phase 1 — Initialise Post Workspace
- create new post folder from template
- add notes or ask Claude to capture them
- indicate or select post type if needed

### Phase 2 — Brainstorm
- Claude acts as a thinking partner
- asks follow-up questions
- explores framing
- identifies missing angles
- starts shaping narrative possibilities

### Phase 3 — Research
- use internal model knowledge and/or external research
- gather references
- produce a research brief
- distinguish strong sources from speculative ones

### Phase 4 — Outline
- propose a narrative structure
- create a table of contents
- define bullets per section
- identify what belongs in and out of scope

### Phase 5 — Draft
- generate long-form draft aligned with Jose’s style
- use repo style guide + reference posts + outline + research brief

### Phase 6 — Promote
- generate LinkedIn and Substack promotional content
- create article-linked teasers
- preserve platform-specific conventions

### Phase 7 — Review
- Jose reviews output files
- later interactions may refine specific files or rerun specific stages

---

# 10. Interaction Model

## 10.1 Core Interaction Principle
This is a **Claude-first hybrid system**.

The repo provides:
- structure
- reference content
- prompts/instructions
- templates
- outputs

Claude provides:
- orchestration
- interpretation
- generation
- structured collaboration

## 10.2 Day-to-Day Usage Model
Typical workflow:
1. Jose opens the repo in VS Code
2. Claude Code is available in the workspace
3. Jose creates or copies a new post folder
4. Jose adds notes or asks Claude to help create them
5. Claude uses repo context and relevant skills to progress the workflow
6. Files are written into the post folder
7. Jose reviews outputs and iterates

## 10.3 What This Is Not
- not primarily CLI-first
- not UI-first
- not app-driven
- not hidden prompt engineering in a private chat only

## 10.4 Desired Experience
The system should feel like:
- a structured repo
- with named capabilities
- that Claude can invoke intelligently
- with enough explicit instructions that results are repeatable

---

# 11. Brainstorming Requirements

Brainstorming is not a minor clarifying step. It is a core product capability.

## 11.1 Desired Brainstorming Behaviour
Claude should behave as a true thinking partner, not merely ask a few clarifications and stop.

It should:
- ask follow-up questions
- probe assumptions
- explore tensions and missing angles
- suggest relevant references
- propose narrative flows
- help decide what to include or exclude

## 11.2 Success Conditions for Brainstorming
A brainstorm session is successful when it:
1. helps Jose think better
2. finds useful references
3. proposes a compelling narrative arc

## 11.3 Brainstorming Modes
The system should support at least two modes eventually:

### Exploratory Brainstorm Mode
- more interactive
- more question-heavy
- more open-ended
- used when an idea is still forming

### Convergent Brainstorm Mode
- more structure-focused
- used to turn notes into outline-ready form
- bridges ideation into execution

## 11.4 Important Product Constraint
The brainstorming stage may be interactive, but the rest of the workflow should be able to continue end to end with less intervention.

---

# 12. Research Requirements

## 12.1 Research Inputs
Research may use any of the following:
- Jose’s notes
- Jose’s prior posts
- general model knowledge
- external web research
- supplied links, books, blog posts, repos, papers

## 12.2 Research Outputs
The research stage should produce:
- a structured research brief
- relevant external references where appropriate
- suggestions for:
  - inclusion
  - expansion
  - exclusion
  - reframing
- identified gaps in the original notes

## 12.3 Why Research Matters
Research is not only about finding facts. It also:
- enriches ideas
- sharpens conceptual framing
- helps Jose learn
- stabilises messy thoughts with stronger supporting material

## 12.4 Grounding Principle
If the system cites or relies on external references, those references must be grounded and inspectable. The system should avoid invented citations or soft fabrication.

---

# 13. Drafting Requirements

## 13.1 Drafting Objective
Generate long-form drafts that are materially closer to Jose’s real writing style than generic AI-produced drafts.

## 13.2 Drafting Quality Bar
The drafting agent must optimise for:

### A. Non-generic writing
Avoid:
- generic AI phrasing
- bland filler
- excessive abstraction without substance
- repetitive summarising language

### B. Tone and voice alignment
Drafts should reflect:
- Jose’s tone
- his preferred rhythm
- his style patterns
- his way of framing ideas

### C. Good structure and flow
The article should:
- build coherently
- maintain narrative progression
- have sensible pacing
- avoid reading like disconnected sections

### D. Grounded references
When mentioning:
- authors
- books
- papers
- blog posts
- repos
the draft must not hallucinate. It should use verified or explicitly provided information.

### E. Technical accuracy
When writing technical content, correctness matters.  
The system should favour caution over invention.

## 13.3 Drafting Inputs
The drafting agent should have access to:
- notes
- outline
- research brief
- reference posts
- codified style guides
- post type
- prior series context where relevant

---

# 14. Style and Voice System

The style system is a core differentiator of Newsletter Engine.

## 14.1 Two-Layer Style Architecture

### Layer 1 — Example Corpus
A curated collection of real Jose-written content stored in the repo, such as:
- standout standalone posts
- selected series posts
- structural exemplars
- later, promotional examples

Purpose:
- provide real writing samples
- ground tone and structure
- help Claude learn from concrete examples

### Layer 2 — Codified Style Documents
Explicit repo documents that describe:
- tone
- voice
- structure
- intros
- conclusions
- rhetorical habits
- preferred devices
- banned patterns

Purpose:
- make implicit style explicit
- reduce ambiguity
- improve repeatability
- allow agents to use style rules intentionally

## 14.2 Why Both Layers Are Needed
Examples alone are rich but fuzzy.  
Rules alone are clear but thin.  
Together they create a much stronger style system.

## 14.3 Example Types to Include
Potential folders:
- reference series posts
- reference standalone essays
- reference short technical explainers
- reference promotion examples later

## 14.4 Style Artifacts to Consider
Potential files:
- `voice.md`
- `structure.md`
- `intro_patterns.md`
- `closing_patterns.md`
- `promotion_formats.md`
- `anti_patterns.md`

---

# 15. Guardrails

The following are hard behavioural constraints for the system.

## 15.1 Content Guardrails
- no hallucinated references
- no invented books, authors, papers, repos, or articles
- no generic AI tone where drafting is involved
- no overly corporate writing
- no clickbait title drift unless explicitly requested
- no rewriting Jose’s ideas into something unrecognisable

## 15.2 Workflow Guardrails
- no automatic publishing
- no irreversible actions without explicit review
- no hiding uncertainty when information is unclear
- no blending unsupported claims into grounded sections

## 15.3 Writing Guardrails
The system should prefer:
- clarity over theatrics
- groundedness over confident invention
- helpfulness over verbosity
- structure over noise

---

# 16. Output Packaging

Each post should have a dedicated folder with predictable artefacts.

## 16.1 Default Output Bundle
Suggested structure inside `posts/<post_slug>/`:

- `notes.md`
- `research_brief.md`
- `outline.md`
- `long_draft.md`
- `linkedin_posts.md`
- `substack_promos.md`

## 16.2 Optional Additional Files
Potential later additions:
- `metadata.yaml`
- `decision_log.md`
- `revision_notes.md`
- `source_links.md`
- `series_context.md`

## 16.3 Why Packaging Matters
This structure:
- replaces scattered chat outputs
- makes post work inspectable
- supports revision in future sessions
- enables end-to-end generation with durable artefacts

---

# 17. Post Type Selection

The system should support structured post type selection without requiring manual config editing upfront.

## 17.1 Desired UX
When needed, Claude should ask Jose to choose a post type using a simple guided interaction, similar to an ask-with-options flow.

## 17.2 Supported Initial Types
- series
- standalone
- short_technical

## 17.3 Behaviour
- if the type is obvious from context, Claude may infer it
- if not obvious, Claude should ask
- the selection should influence structure, prompt choice, and generation flow

---

# 18. System Architecture

## 18.1 High-Level Architecture
Newsletter Engine should use:
- an orchestrator
- specialised agents
- shared reference documents
- per-post working folders
- optional decision logs and memory files

## 18.2 Architectural Principle
Prefer specificity of role with orchestration on top.

This means:
- multiple specialised agents are desirable
- each has a clear purpose
- a top-level orchestrator coordinates sequence and handoffs

## 18.3 Why This Matters
Benefits:
- clearer task boundaries
- easier prompt tuning
- easier debugging
- easier scaling later
- more predictable outputs

---

# 19. Agent Model

## 19.1 Agent Design Principles
Each agent should have:
- a clear role
- defined inputs
- defined outputs
- explicit responsibilities
- explicit non-responsibilities
- access only to the repo context it needs where sensible

## 19.2 Initial Agent Set

### 1. Orchestrator Agent
**Purpose:** Coordinate the workflow across agents and files.

**Responsibilities:**
- determine which workflow to run
- ask for missing high-value inputs
- invoke the right specialist agents
- manage sequencing
- write or update output files
- optionally maintain a decision log

**Should not:**
- try to do everything as one giant hidden prompt
- skip style and grounding requirements
- ignore post type distinctions

---

### 2. Brainstorm Agent
**Purpose:** Help shape rough ideas into stronger directions.

**Responsibilities:**
- ask follow-up questions
- challenge gaps
- find missing angles
- suggest framing options
- identify possible narrative arcs
- propose areas for research

**Inputs:**
- notes
- post type
- any prior context

**Outputs:**
- clarified problem framing
- brainstorm summary
- candidate narrative flows
- open questions for research

**Should not:**
- prematurely lock structure too early
- stop after minimal clarification

---

### 3. Research Agent
**Purpose:** Enrich the topic with grounded supporting material.

**Responsibilities:**
- gather relevant references
- summarise useful sources
- identify gaps or unsupported claims
- suggest include/exclude decisions
- help turn messy notes into informed direction

**Inputs:**
- notes
- brainstorm output
- supplied links if any
- prior posts if relevant

**Outputs:**
- research brief
- list of useful references
- suggested additions
- suggested exclusions

**Should not:**
- fabricate citations
- overstate uncertain facts

---

### 4. Outline Agent
**Purpose:** Transform notes and research into structure.

**Responsibilities:**
- produce a table of contents
- define section-level bullet points
- preserve narrative flow
- tune structure based on post type

**Inputs:**
- notes
- brainstorm output
- research brief
- style/structure guidance
- post type

**Outputs:**
- `outline.md`

**Should not:**
- write a full draft unless explicitly instructed
- produce structure disconnected from narrative intent

---

### 5. Drafting Agent
**Purpose:** Generate the long-form article draft.

**Responsibilities:**
- write in Jose’s voice as closely as possible
- use reference posts and style guides
- preserve structure and pacing
- maintain clarity and groundedness

**Inputs:**
- outline
- notes
- research brief
- style guides
- reference posts
- post type
- prior series context if applicable

**Outputs:**
- `long_draft.md`

**Should not:**
- hallucinate references
- default to generic AI prose
- ignore structure conventions

---

### 6. Promotion Agent
**Purpose:** Generate downstream promotional content.

**Responsibilities:**
- create LinkedIn promotional posts
- create Substack promo posts
- support multi-post teaser sequences
- adapt content to known templates

**Inputs:**
- long draft
- promotion format guides
- any platform constraints
- article angle and audience

**Outputs:**
- `linkedin_posts.md`
- `substack_promos.md`

**Should not:**
- merely summarise the article blandly
- reveal the entire article in promo copy
- ignore platform-specific style

---

## 19.3 Later-Phase Agent Candidates
These should not necessarily exist in the earliest milestone but are possible later:

- SEO Agent
- Series Continuity Agent
- Style Evaluation Agent
- Fact-Check Agent
- Repurposing Agent
- Title/Headline Agent
- Editorial Critic Agent
- Learning/Reflection Agent

---

# 20. Orchestration Model

## 20.1 Early Orchestration Strategy
In early versions, orchestration should be lightweight and Claude-driven, not over-engineered.

Possible implementation shapes:
- a main orchestration prompt/instruction file
- a top-level workflow doc
- task templates
- per-post run instructions

## 20.2 Workflow Pattern
Typical orchestrated flow:

1. gather notes and post type
2. optionally brainstorm interactively
3. run research
4. generate outline
5. generate long draft
6. generate promo bundle
7. update decision log or metadata if used

## 20.3 Important Principle
The orchestrator should be explicit and inspectable.  
It should not become an opaque “do everything” blob.

---

# 21. Repository Structure

Below is a proposed repo structure for early versions.

```text
newsletter-engine/
├─ README.md
├─ PRD.md
├─ docs/
│  ├─ architecture.md
│  ├─ workflows.md
│  ├─ milestones.md
│  └─ decisions/
├─ agents/
│  ├─ orchestrator.md
│  ├─ brainstorm_agent.md
│  ├─ research_agent.md
│  ├─ outline_agent.md
│  ├─ drafting_agent.md
│  └─ promotion_agent.md
├─ style_guide/
│  ├─ voice.md
│  ├─ structure.md
│  ├─ intro_patterns.md
│  ├─ closing_patterns.md
│  ├─ promotion_formats.md
│  └─ anti_patterns.md
├─ reference_posts/
│  ├─ series/
│  ├─ standalone/
│  ├─ short_technical/
│  └─ promotional_examples/
├─ templates/
│  ├─ post_template/
│  │  ├─ notes.md
│  │  ├─ research_brief.md
│  │  ├─ outline.md
│  │  ├─ long_draft.md
│  │  ├─ linkedin_posts.md
│  │  ├─ substack_promos.md
│  │  └─ metadata.yaml
│  └─ prompts/
├─ posts/
│  └─ <post_slug>/
└─ scratch/

## 21.1 Folder Purposes

### `agents/`
Agent instructions, role definitions, contracts, and task guidance.

Includes:
- orchestrator
- brainstorming
- research
- outlining
- drafting
- promotion
- SEO

---

### `style_guide/`
Codified writing guidance used repeatedly by drafting, promotion, and SEO layers.

Includes:
- tone and voice
- structure patterns
- intro and closing styles
- promotion formats
- SEO patterns
- anti-patterns

---

### `reference_posts/`
Curated examples written by Jose and manually copied into the repo.

Purpose:
- provide real writing samples
- ground tone and structure
- enable style learning

---

### `templates/post_template/`
Standard artefact structure for each new post.

Purpose:
- enforce consistency
- reduce setup friction
- enable orchestrator to operate predictably

---

### `posts/`
Actual working directories for content generation.

Each post gets:
- its own folder
- its own artefacts
- its own lifecycle

---

### `docs/`
Architecture notes, workflow definitions, milestone tracking, and SEO/editorial guidance.

Includes:
- architecture decisions
- workflow descriptions
- milestone planning
- SEO guidelines

---

### `scratch/`
Optional sandbox space for:
- experiments
- temporary drafts
- prompt testing

---

# 22. Input Contracts

## 22.1 Minimum Input
The system should handle:
- a topic
- rough notes (~10 points)
- non-structured thinking

---

## 22.2 Acceptable Input Types
A post may begin with:
- bullet points
- fragments
- copied notes
- personal reflections
- rough ideas
- optional titles
- optional links
- optional references to past posts

---

## 22.3 Requirement
The system must handle messy input gracefully.  
It should not require a clean or structured brief.

---

# 23. Output Contracts

## 23.1 Notes File (`notes.md`)
Raw input and captured thoughts.

---

## 23.2 Research Brief (`research_brief.md`)
Contains:
- references
- supporting material
- missing angles
- include/exclude guidance

---

## 23.3 Outline (`outline.md`)
Contains:
- table of contents
- section bullets
- narrative flow

---

## 23.4 Long Draft (`long_draft.md`)
Contains:
- full article draft
- structured sections
- transitions
- grounded references

---

## 23.5 SEO Brief (`seo_brief.md`)
Contains:
- title options
- keyword/theme suggestions
- search intent framing
- header improvements
- meta description options

Important:
SEO is **advisory**, not rewriting the article blindly.

---

## 23.6 LinkedIn Posts (`linkedin_posts.md`)
Contains:
- multiple promotional variants
- platform-adapted tone

---

## 23.7 Substack Promos (`substack_promos.md`)
Contains:
- teaser-style posts
- article-linked content

---

# 24. Grounding and Source Handling

## 24.1 General Rule
No hallucinated references. Ever.

---

## 24.2 When Uncertain
The system must:
- flag uncertainty
- avoid fabrication

---

## 24.3 Preferred Pattern
Separate:
- research (fact gathering)
- drafting (writing)

---

## 24.4 SEO Grounding Rule
SEO suggestions must:
- avoid fake “keyword authority”
- avoid invented trends
- remain practical and realistic

---

# 25. Quality Evaluation Framework

## 25.1 Draft Quality
Evaluate:
- tone match
- non-generic writing
- flow
- clarity
- groundedness
- technical correctness

---

## 25.2 Research Quality
Evaluate:
- relevance
- usefulness
- completeness
- honesty about uncertainty

---

## 25.3 Promotion Quality
Evaluate:
- engagement potential
- clarity
- tone alignment
- non-redundancy

---

## 25.4 SEO Quality
Evaluate:
- usefulness of suggestions
- fit to article intent
- non-clickbait quality
- preservation of voice

---

## 25.5 Evaluation Approach
Start with manual review by Jose.  
No need for automation yet.

---

# 26. Milestone Strategy

## 26.1 Philosophy
Each milestone must:
- be usable
- reduce friction
- add one meaningful capability
- avoid overengineering

---

# 27. Proposed Milestones

## Milestone 0 — Foundation

Includes:
- repo structure
- templates
- style guides (initial)
- reference posts (manual)
- agent definitions (draft)

Goal:
Create a working base system.

---

## Milestone 1 — End-to-End Workflow (First Useful Version)

Includes:
- Brainstorm Agent
- Research Agent
- Outline Agent
- Drafting Agent
- Promotion Agent
- Basic Orchestrator
- Output bundle generation

Flow:
notes → research → outline → draft → promos

Goal:
Produce usable outputs from messy notes.

---

## Milestone 2 — Style Fidelity Upgrade

Includes:
- improved style guides
- anti-pattern refinement
- stronger tone alignment
- structure consistency improvements

Goal:
Reduce generic AI feel.

---

## Milestone 3 — Research + Grounding Upgrade

Includes:
- better reference tracking
- clearer research outputs
- optional fact-check logic

Goal:
Improve trust and accuracy.

---

## Milestone 4 — SEO Layer

Includes:
- SEO Agent
- SEO Brief generation
- title suggestions
- header improvements
- meta descriptions

Important:
SEO remains advisory.

Goal:
Improve discoverability without damaging writing quality.

---

## Milestone 5 — Content Expansion

Includes:
- better promo sequences
- repurposing flows
- short-form generation
- title banks

Goal:
Make system more like a content engine.

---

## Milestone 6 — Series Intelligence

Includes:
- series context tracking
- continuity support
- “next article” suggestions

Goal:
Support long-running content series.

---

## Milestone 7 — Integrations (Optional, Late)

Includes:
- Substack ingestion
- Medium ingestion

Goal:
Convenience, not core value.

---

# 28. Requirements by Priority

## Must-Have
- reusable instructions
- structured outputs
- drafting + promotion
- no hallucinations

---

## Should-Have
- SEO suggestions
- better tone alignment
- decision logs

---

## Could-Have
- SEO automation improvements
- fact-checking agent
- repurposing tools

---

## Won’t-Have (Early)
- publishing automation
- UI apps
- heavy integrations