# Outline: 5 AI roles every solopreneur, manager, and executive should hire

**Target:** ~20 min read (~5,000 words)

## Sections

### Preview section
- Labelled bullet list — one entry per major content section
- Sources: n/a (structural)

### 1. Introduction — the wrong question
- Most people ask "which AI tools should I use?" — the better question is what roles should those tools play, and who owns the outputs
- Opens with a scene: the feeling of having chatted with AI for months but nothing has changed about how work gets done
- Thesis: the first AI roles worth hiring are not the ones that sound like executives — they are the ones that take the repeatable blocking work off your plate. And when you hire them correctly, they don't diminish your expertise. They redefine what's possible with it.
- Sources: model knowledge only

### 2. Why AI executive titles are the wrong starting point
- "AI CFO," "AI CMO," "AI CEO" — why these names mislead. The title implies the role, but the workflow is what actually gets built
- Naming principle: task-descriptive > executive-sounding ("Sales Research Assistant" vs "AI VP of Sales")
- The real unit of value is a bounded workflow with defined inputs, outputs, and a human gate — not a job title
- Sources: model knowledge only (naming framework from research2.md taxonomy)

### 3. The AI org chart — five departments, one operating system
- The 5-department framing: Intelligence Analyst, Growth Operator, Voice Operator, Builder Partner, Operating Chief of Staff
- Everyone has a version of each department — solopreneurs, managers, executives
- Strategy Sparring introduced as a cross-cutting mode: a reasoning partner for decisions, not a standalone hire
- Sources: model knowledge only

### 4. Before you hire an AI role, write its job description
- The centrepiece mechanic — what separates "I asked ChatGPT to help" from a governed assistant
- Template in full: goal, inputs, allowed sources, allowed tools, forbidden actions, output format, escalation triggers, human owner, review process, quality bar, examples of good and bad outputs
- Walk through the template with the Intelligence Analyst as the worked example
- "A vague agent is a vague employee, except cheaper to create and faster to disappoint"
- Sources: research4.md operating principles

### 5. Department 1 — The Intelligence Analyst
- Market research, competitor tracking, customer insight synthesis
- What it does, what inputs it needs, where it breaks without clear constraints
- Best first workflow: the weekly market memo (what changed, what competitors said, what customers repeated, what assumptions to revisit)
- Human expertise angle: the analyst frames the questions and judges the strategy — the agent finds, clusters, and summarises
- Sources:
  - n8n market research workflow: https://n8n.io/workflows/12236-run-ai-powered-market-research-with-groq-openai-documentero-and-gmail/
  - n8n competitor analysis: https://n8n.io/workflows/6580-generate-ai-powered-competitor-analysis-reports-with-gpt-4-apify-and-google-docs/
  - Relevance AI customer interviews: https://relevanceai.com/templates/customer-interview-synthesis
  - Dovetail customer research: https://dovetail.com/product/ai/

### 6. Department 2 — The Growth Operator
- Sales research and qualification, support triage — two functions under one growth umbrella
- SDR workflow: enrich, score, brief, draft outreach — wait for human approval before any send
- Support triage: classify tickets, escalate angry/legal/billing cases, draft responses for routine queries
- Hard gate: no CRM updates, no external messages, no support replies for sensitive cases without review
- Human expertise angle: judgment on fit, tone, context, and whether this customer is worth more than the deal
- Sources:
  - Clay + Harmonic lead enrichment: https://www.clay.com/
  - Relevance AI lead qualification: https://relevanceai.com/templates/9101-ai-powered-lead-research-and-qualification-using-relevance-ai
  - n8n AI sales assistant: https://n8n.io/workflows/9026-ai-sales-assistant-with-gpt-and-claude-qualify-leads-book-meetings/

### 7. Department 3 — The Voice Operator
- Content drafting, brand voice enforcement, repurposing, publishing pipeline
- The role most solopreneurs already use informally — this section makes it formal and governed
- Inputs that make it work: your best previous writing, a voice guide, banned phrases, audience description, preferred structure
- Output: first draft, critique against voice guide, alternative hooks — human approves publishing
- Human expertise angle: the voice is yours; the operator executes it at scale. The AI cannot decide what you truly believe.
- Sources:
  - OpenAI Custom GPTs: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/custom-gpts
  - n8n content workflow: https://n8n.io/workflows/
  - Make AI content automation: https://www.make.com/en/ai-agents

### 8. Department 4 — The Builder Partner
- Product spec writing, coding partner, QA reviewer
- Strongest and most mature domain — tooling has reached a real threshold
- Non-technical path: spec writing and PRD generation from rough ideas
- Technical path: implement bounded tasks, write tests, open PRs for human review — never autonomous merge or deploy
- Human expertise angle: the builder owns design decisions, architecture, and what ships
- Sources:
  - Claude Code: https://claude.ai/download
  - OpenAI Codex cloud agent: https://openai.com/blog/introducing-the-codex-cloud-agent
  - GitHub Copilot: https://github.com/features/copilot
  - Cursor: https://www.cursor.com/

### 9. Department 5 — The Operating Chief of Staff
- Meeting prep, inbox digest, project change monitoring, stakeholder follow-up drafts
- Most useful when connected to real systems — calendar, email, Slack, docs
- Best first workflow: the morning brief (calendar review, prior context, follow-ups due, draft priorities)
- Caveat: build this gradually. Meeting prep first. Autonomous email drafting much later.
- Human expertise angle: the human still runs the meeting, manages the relationship, and owns the politics
- Sources:
  - Lindy AI chief of staff: https://www.lindy.ai/templates/ai-chief-of-staff
  - Lenny's Newsletter — Webflow CPO AI CoS: https://www.lennysnewsletter.com/p/how-webflows-cpo-built-an-ai-chief
  - n8n meeting prep: https://n8n.io/workflows/meeting-prep-assistant/

### 10. Human-in-the-loop — the real operating model
- Not a bureaucratic check — the actual design principle
- Three tiers: read-only (research, summarisation) → draft (content, specs, briefs) → send/publish/execute (always human-approved)
- The 11 irreversible actions that always need approval
- "Agents prepare, suggest, summarise, and draft. Humans decide, approve, and own the consequences."
- Sources:
  - OpenAI practical guide to building AI agents: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
  - Anthropic building effective agents: https://www.anthropic.com/engineering/building-effective-agents
  - n8n human-in-the-loop tools: https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/
  - WEF AI agent governance: https://www.weforum.org/stories/2025/12/ai-agents-onboarding-governance/

### 11. Redefining the art of the possible
- What changes when all five departments are running
- Not "you work less" — what you can do with your expertise expands
- Per-audience framing: solopreneur acts like a team; manager delegates before headcount; executive sees operating leverage at scale
- The anti-hype close: these tools extend human capability, they don't replace human judgment
- Sources: model knowledge only + research5.md perspective

### 12. Where to start — first hires by audience type
- Solopreneur: Voice Operator + Intelligence Analyst first (lowest risk, highest immediate leverage)
- Manager: Operating Chief of Staff + Growth Operator (delegation before headcount)
- Executive: Intelligence Analyst + Builder Partner (operating leverage at scale)
- One practical first step each
- Sources: model knowledge only

### Closing section
- Named `## Closing thoughts`
- Synthesis: the org chart is an operating system, not a novelty — you still run it, but now it runs better
- Connects back to the opening scene and thesis
- Sources: synthesis — no external source

### Now, I want to hear from you
- Named `## Now, I want to hear from you`
- 3 specific questions tied to the post's argument
- Sources: n/a (structural)
