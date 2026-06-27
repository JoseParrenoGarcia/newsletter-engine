# The New AI Org Chart: Blog Post Structure with Supporting Research URLs

Yes. I think the post should **not** become “here are 8–10 agent templates”. The research supports that many roles exist, but your article will be stronger if it says:

> **Do not build an AI zoo. Build a small AI org chart.**

The research taxonomy recommends 8 roles for breadth, but for a 20-minute Substack collaboration I would compress them into **5 core roles** and treat the rest as extensions. The important move is to make the article feel like **role design**, not a prompt-pack listicle. That is also the clearest gap in the discourse: most content focuses on prompt lists, tool lists, and generic “AI employee” hype, while less content explains how to design AI roles with scope, inputs, outputs, tools, permissions, review, escalation, and cost limits.

**Supporting evidence / URLs to consider:**

- Research dossier angle: role design is underexplored compared with prompt lists and tool lists.
- Anthropic, “Building effective agents”: https://www.anthropic.com/engineering/building-effective-agents
- OpenAI Agents SDK documentation: https://developers.openai.com/api/docs/guides/agents
- Claude Code subagents documentation: https://code.claude.com/docs/en/sub-agents
- n8n AI agents: https://n8n.io/ai-agents/
- OpenAI guardrails and human review: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals

## Recommended angle

**Working title:**  
**The New AI Org Chart: 5 AI Roles Every Founder, Manager, or Solo Builder Should Hire First**

**Core thesis:**  
The next step is not using AI as a chatbot. It is designing **bounded AI roles** that handle repeatable, reviewable work, while humans keep judgement, accountability, taste, relationships, and final decisions.

This aligns strongly with the research: the strongest “hire AI first” pattern is not one giant autonomous agent, but a small set of bounded assistants with clear jobs across research, sales prep, support triage, content, specs, code, meeting prep, and customer synthesis.

**Supporting evidence / URLs to consider:**

- Practical taxonomy of AI roles: market researcher, customer insight analyst, content operator, sales assistant, support triage, product spec writer, coding partner, ops assistant.
- Anthropic, “Building effective agents”: https://www.anthropic.com/engineering/building-effective-agents
- OpenAI Agents SDK documentation: https://developers.openai.com/api/docs/guides/agents
- Relevance AI Workforce: https://relevanceai.com/workforce
- Zapier Agents: https://zapier.com/agents
- n8n workflow library: https://n8n.io/workflows/

## The 5 roles I would use

I would compress the research’s 8-role recommendation into these 5 “departments”:

| Role | Combines | Why it belongs |
|---|---|---|
| **1. The Intelligence Analyst** | Market researcher, competitor researcher, customer insight analyst | Helps people stop building from vibes alone. |
| **2. The Growth Operator** | Sales researcher, lead qualifier, audience analyst, support triage light | Connects AI work to revenue and customers. |
| **3. The Voice Operator** | Content operator, editor, communications assistant | Turns founder/leader thinking into reusable external and internal communication. |
| **4. The Builder Partner** | Product spec writer, coding partner, QA/red-team reviewer | Helps turn ideas into specs, code, tests, and review loops. |
| **5. The Operating Chief of Staff** | Meeting prep, weekly reporting, task/follow-up tracker, stakeholder memory | Reduces coordination drag and context switching. |

Then I would make **The Sceptic / Strategy Sparring Partner** a *mode*, not a separate role.

Why? Because it should appear everywhere: the Intelligence Analyst challenges weak sources, the Voice Operator challenges unclear writing, the Builder Partner challenges scope and risk, and the Operating Chief of Staff challenges priorities. The research also suggests that “strategy sparring” is useful, but mostly as a thinking mode rather than a decision-maker.

**Supporting evidence / URLs to consider:**

- Claude Code subagents documentation: https://code.claude.com/docs/en/sub-agents
- Relevance AI agent marketplace: https://marketplace.relevanceai.com/
- n8n workflow library: https://n8n.io/workflows/
- Lindy template library: https://docs.lindy.ai/fundamentals/lindy-101/templates
- Business Insider, business owners training AI agents to challenge them: https://www.businessinsider.com/business-owners-explain-how-to-train-ai-employees-better-2026-2
- Coconut Consulting, AI sparring partner framework: https://coconutconsulting.ai/your-toughest-critic-should-be-in-your-pocket-the-ai-sparring-partner-framework/

## Proposed 20-minute post structure

### 1. Opening: the wrong question is “which AI tool should I use?”

**Goal:** Set the tone and avoid tool FOMO early.

Notes:

- Start from the current founder/manager anxiety: everyone is seeing agents, subagents, GPTs, Claude Skills, Codex, Cursor rules, n8n flows, Lindy agents, and wondering what they are supposed to build.
- The wrong question is: **“Which tool should I use?”**
- The better question is: **“Which role in my work is currently missing, overloaded, or blocked?”**
- This lets you frame the article as *management design*, not tool shopping.

Possible line:

> The mistake is treating AI like a better search box. The unlock is treating it like a role you need to design, brief, supervise, and improve.

This connects nicely with the podcast transcript: leaders should not just ask AI questions; they should build reusable systems around research, strategy, communication, and operations.

**Supporting evidence / URLs to consider:**

- Claude Projects documentation: https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects
- Claude Skills documentation: https://claude.com/docs/skills/how-to
- Claude Code feature overview: https://code.claude.com/docs/en/features-overview
- ChatGPT Projects documentation: https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt
- Custom GPTs documentation: https://help.openai.com/en/articles/8554407-create-a-custom-gpt
- Codex cloud documentation: https://developers.openai.com/codex/cloud
- Cursor Rules documentation: https://cursor.com/docs/rules
- n8n workflow library: https://n8n.io/workflows/
- Lindy template library: https://docs.lindy.ai/fundamentals/lindy-101/templates

---

### 2. The AI org chart is not about replacing people. It is about designing work.

**Goal:** Establish the philosophical foundation.

Notes:

- Make clear this is not “fire your team and hire bots”.
- The useful metaphor is not replacement. It is **leverage**.
- AI roles should take on the repeatable, sourceable, draftable, reviewable, and context-heavy work that blocks humans from doing higher-judgement work.
- Use your Pareto framing here: **try the 20% of the role that gives 80% of the leverage**.
- A marketing expert is still better than a marketing agent. A lawyer is still better than a legal summary. A data scientist is still better than a SQL-writing chatbot connected to a cursed metrics layer. But that does not excuse doing nothing.

The research is very aligned with this: many examples reduce dependency on a human role, but rarely eliminate it; the pattern is “replace waiting time”, not “replace judgement”.

Possible section idea:

**What AI can do before you hire the human:**

- gather sources
- draft briefs
- summarise customer feedback
- prepare meeting context
- produce first-pass specs
- inspect code
- draft outreach
- classify support issues
- surface risks
- maintain operating rhythm

**What humans still own:**

- judgement
- taste
- relationships
- accountability
- final decisions
- ethical/legal responsibility
- strategy under uncertainty

**Supporting evidence / URLs to consider:**

- TechCrunch, “AI agents could birth the first one-person unicorn, but at what societal cost?”: https://techcrunch.com/2025/02/01/ai-agents-could-birth-the-first-one-person-unicorn-but-at-what-societal-cost/
- The Guardian on Lattice digital workers backlash: https://www.theguardian.com/technology/article/2024/jul/21/ai-digital-workers-employment
- IDC, AI agents as instruments, not co-workers: https://www.idc.com/resource-center/blog/the-future-of-work-ai-agents-as-instruments-no-co-workers/
- World Economic Forum on AI agent onboarding and governance: https://www.weforum.org/stories/2025/12/ai-agents-onboarding-governance/
- Business Insider, company replicated employee’s role with AI agent: https://www.businessinsider.com/company-replicated-employees-role-with-ai-agent-worker-not-worried-2026-6

---

### 3. Before you hire an AI role, write its job description.

**Goal:** Give the article a practical backbone.

This is probably the most distinctive section. The research explicitly identifies **role design** as the underexplored angle: most content gives prompt lists or tool recommendations, but less explains how to design AI roles properly.

Notes:

Introduce a reusable “AI role card”:

```text id="u3xq5f"
Role name:
Mission:
Workflow owned:
Inputs:
Outputs:
Tools:
Permissions:
Human review required when:
Escalates to:
Success metric:
Failure modes:
Cost limit:
Human owner:
```

Explain that this is the difference between:

- “I asked ChatGPT to help with sales”
- “I have a Sales Research Assistant that enriches leads, drafts account briefs, scores fit against my ICP, and never sends outreach without approval”

This section should become the centrepiece of the post. It gives readers something practical to copy.

**Supporting evidence / URLs to consider:**

- Claude Code subagents documentation: https://code.claude.com/docs/en/sub-agents
- Codex `AGENTS.md` guide: https://developers.openai.com/codex/guides/agents-md
- OpenAI Agents SDK guardrails and approvals: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- n8n human-in-the-loop tools: https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/
- Make AI Agents: https://www.make.com/en/ai-agents
- Relevance AI docs: https://relevanceai.com/docs/get-started/introduction
- World Economic Forum on AI agent onboarding and governance: https://www.weforum.org/stories/2025/12/ai-agents-onboarding-governance/

---

### 4. Pick one framework. Do not get FOMO.

**Goal:** Address your Claude Code / framework point.

Notes:

- Say you will use **Claude Code** as the reference implementation because it makes the idea of role files, subagents, instructions, tools, and permissions concrete.
- But be explicit: the framework is not the point.
- A lot of these “agents” are, at their core, **Markdown instructions plus tool access plus scripts plus review gates**.
- Translating the role definition from Claude Code to ChatGPT Projects, Custom GPTs, Codex `AGENTS.md`, Cursor rules, n8n, or Relevance AI is not conceptually hard.
- What matters is the portable role definition.

The research supports this well: reusable AI roles now commonly show up as persistent assistants with instructions, context, and narrow tool scope, across Claude Projects, ChatGPT Projects, Custom GPTs, Claude Skills, Cursor Rules, and Codex `AGENTS.md`. Claude Code is especially useful as the example because it supports `CLAUDE.md`, Skills, subagents, hooks, MCP, permission modes, tool allowlists, and scoped subagent memory.

Suggested visual:

```text id="600d4c"
Portable AI role definition
        ↓
Claude Code subagent / Skill
        ↓
ChatGPT Project / Custom GPT
        ↓
Codex AGENTS.md
        ↓
Cursor Rules
        ↓
n8n / Zapier / Make workflow
```

Key point:

> Do not optimise for the perfect framework. Optimise for a clear role that can survive framework changes.

**Supporting evidence / URLs to consider:**

- Claude Code feature overview: https://code.claude.com/docs/en/features-overview
- Claude Code subagents documentation: https://code.claude.com/docs/en/sub-agents
- Claude Code memory documentation: https://code.claude.com/docs/en/memory
- Claude Skills documentation: https://claude.com/docs/skills/how-to
- OpenAI Codex cloud documentation: https://developers.openai.com/codex/cloud
- Codex `AGENTS.md` guide: https://developers.openai.com/codex/guides/agents-md
- ChatGPT Projects documentation: https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt
- Custom GPTs documentation: https://help.openai.com/en/articles/8554407-create-a-custom-gpt
- Cursor Rules documentation: https://cursor.com/docs/rules
- n8n AI agents: https://n8n.io/ai-agents/
- Zapier Agents: https://zapier.com/agents
- Make AI Agents: https://www.make.com/en/ai-agents
- Relevance AI introduction: https://relevanceai.com/docs/get-started/introduction

---

### 5. Role 1: The Intelligence Analyst

**Human analogue:** market researcher, customer researcher, junior strategy analyst.

**Jobs-to-be-done:**

- research market categories
- map competitors
- monitor pricing/messaging changes
- summarise customer interviews
- cluster support tickets
- extract customer language
- produce source-backed briefs
- surface assumptions and weak evidence

**Best first workflow:**

A weekly memo:

```text id="j96vmt"
What changed in the market this week?
What are competitors saying differently?
What customer pain points repeated?
What assumptions should we revisit?
What sources support this?
```

**Inputs needed:**

- product description
- ICP
- competitor list
- customer interview transcripts
- support tickets
- website links
- previous strategy docs

**Human review point:**

- You must check source quality.
- The agent can summarise and compare, but it should not decide market strategy.
- Require citations. No “industry consensus” nonsense unless it can show receipts.

**Why this role first:**

It is low-risk, highly reusable, and useful before hiring an analyst or strategist. The role taxonomy rates market research, competitive intelligence, and customer insight as strong repeated patterns.

**Supporting evidence / URLs to consider:**

- n8n market research workflow: https://n8n.io/workflows/12236-run-ai-powered-market-research-with-groq-openai-documentero-and-gmail/
- n8n competitor analysis workflow: https://n8n.io/workflows/6580-generate-ai-powered-competitor-analysis-reports-with-gpt-4-apify-and-google-docs/
- Relevance AI Competitive Intelligence Agent: https://marketplace.relevanceai.com/listing/90093b11-abf5-4f20-b0ac-267efd698669
- Dovetail AI Analysis: https://dovetail.com/product/ai-analysis/
- Fivetran product feedback AI platform: https://www.fivetran.com/blog/how-our-product-team-uses-ai-to-manage-customer-feedback-at-scale
- Pluggin customer interview synthesis workflow: https://www.pluggin.ai/workflows/customer-interview-synthesis
- Clay Mistral AI case study: https://www.clay.com/customers/mistral-ai
- Clay Exit Five case study: https://www.clay.com/customers/exit-five

---

### 6. Role 2: The Growth Operator

**Human analogue:** SDR, sales researcher, growth assistant, support triage assistant.

**Jobs-to-be-done:**

- enrich leads
- research accounts
- score fit against ICP
- draft outreach
- prepare call briefs
- classify support tickets
- escalate angry or complex customers
- summarise sales objections
- identify expansion opportunities

**Best first workflow:**

Start with **research and drafting**, not autonomous sending:

```text id="h8eeeo"
For each inbound lead:
1. Research the company.
2. Score fit against ICP.
3. Draft a short account brief.
4. Suggest a personalised first message.
5. Mark confidence and missing information.
6. Wait for human approval.
```

**Inputs needed:**

- ICP
- lead list
- CRM export
- website URLs
- enrichment sources
- outreach examples
- support FAQ
- escalation rules

**Human review point:**

- No external messages without approval.
- No CRM stage updates without review.
- No support replies for billing, legal, angry users, refunds, or reputational risk.

**Why this role matters:**

The strongest real-world evidence in the workflow research appears in sales and GTM operations: lead enrichment, routing, outbound campaigns, TAM mapping, sponsorship targeting, and prioritisation.

This section can be very practical for Daniil’s audience, because founders and solopreneurs care about growth leverage more than yet another abstract “AI agent architecture” diagram.

**Supporting evidence / URLs to consider:**

- Clay Harmonic case study: https://www.clay.com/customers/harmonic
- Clay Rootly case study: https://www.clay.com/customers/rootly
- Clay Lovable case study: https://www.clay.com/customers/lovable
- Clay Mistral AI case study: https://www.clay.com/customers/mistral-ai
- Relevance AI Sales Researcher: https://marketplace.relevanceai.com/agents/sales-researcher
- Relevance AI Outbound BDR Agent: https://relevanceai.com/blog/outbound-bdr-agent-how-relevance-ai-automates-sales-research-and-outreach
- Relevance AI BDR agent docs: https://relevanceai.com/docs/build/agents/agent-examples/bosh-bdr-agent
- n8n AI lead research and qualification: https://n8n.io/workflows/9101-ai-powered-lead-research-and-qualification-using-relevance-ai/
- n8n AI sales assistant with GPT and Claude: https://n8n.io/workflows/9026-ai-sales-assistant-with-gpt-and-claude-qualify-leads-book-meetings/
- Zendesk intelligent triage workflows: https://support.zendesk.com/hc/en-us/articles/5222280338202-Intelligent-triage-use-cases-and-workflows
- Postman customer ticket triage agent: https://www.postman.com/templates/agents/customer-ticket-triage-agent/
- AlexCloudstar solopreneur automation stack: https://www.alexcloudstar.com/blog/solopreneur-automation-stack-2026/

---

### 7. Role 3: The Voice Operator

**Human analogue:** editor, ghostwriter, content operator, communications assistant.

**Jobs-to-be-done:**

- turn rough notes into posts
- repurpose long-form content
- adapt writing for different channels
- enforce style guide
- edit for clarity
- prepare internal updates
- draft investor updates
- create newsletter outlines
- review whether writing sounds like you

**Best first workflow:**

```text id="4u2ibf"
Input:
- rough voice note
- target audience
- intended channel
- previous examples

Output:
- outline
- first draft
- critique against style guide
- sharper version
- 3 alternative hooks
```

**Inputs needed:**

- your best previous writing
- voice guide
- audience description
- banned phrases
- examples of bad AI writing
- preferred structure

**Human review point:**

- Human owns taste.
- Human owns claims.
- Human approves publishing.
- The AI can sound like you, but it cannot decide what you truly believe. Annoying limitation, admittedly.

**Why this role matters:**

The research found content and audience workflows are practical, but the useful versions are not “write my whole newsletter”; they are audience enrichment, first drafts, repurposing, editing, and research synthesis.

This also links strongly to the podcast transcript’s “communication expert” role.

**Supporting evidence / URLs to consider:**

- OpenAI Academy, Custom GPTs: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/custom-gpts
- Custom GPTs documentation: https://help.openai.com/en/articles/8554407-create-a-custom-gpt
- Anthropic Complete Guide to Building Skills for Claude: https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf
- n8n recursive writing and editing agents: https://n8n.io/workflows/3503-generate-written-content-with-gpt-recursive-writing-and-editing-agents/
- Clay Exit Five case study: https://www.clay.com/customers/exit-five
- Lindy Pragmatic case study: https://www.lindy.ai/case-study/pragmatic-transformed-their-consulting
- Anthropic Zapier customer story: https://www.anthropic.com/customers/zapier?continueFlag=21a52cd976eb721b5245e31bc4321331
- Business Insider, solopreneurs using AI for content efficiency: https://www.businessinsider.com/solopreneurs-use-ai-to-boost-content-creation-efficiency-2026-2

---

### 8. Role 4: The Builder Partner

**Human analogue:** product spec writer, junior developer, QA reviewer, red-team reviewer.

**Jobs-to-be-done:**

- turn ideas into PRDs
- define user stories
- create acceptance criteria
- inspect code
- implement bounded tasks
- write tests
- review diffs
- flag security or edge-case risks
- prepare documentation

**Best first workflow:**

```text id="yjrelv"
For a product idea:
1. Interview me for missing context.
2. Write a short PRD.
3. Identify risks and non-goals.
4. Break into implementation tasks.
5. Implement one small task.
6. Run tests.
7. Open a PR or produce a diff.
8. Ask for human review.
```

**Inputs needed:**

- product idea
- constraints
- repo
- tests
- coding standards
- `CLAUDE.md` / `AGENTS.md`
- examples of good PRs
- acceptance criteria

**Human review point:**

- No autonomous merge.
- No production deploy.
- No security-sensitive change without review.
- Tests are helpful; they are not divine judgement tablets.

**Why this role matters:**

Coding agents are one of the clearest “small team acts bigger” roles, because tooling now supports implementation, refactoring, testing, documentation, and app-building tasks. The caveat is exactly where your article can be more credible: review, tests, security checks, and repo-specific instructions remain essential.

This is also where Claude Code works beautifully as the concrete example.

**Supporting evidence / URLs to consider:**

- Anthropic, Claude Code product page: https://www.anthropic.com/product/claude-code
- Claude Code feature overview: https://code.claude.com/docs/en/features-overview
- Claude Code subagents documentation: https://code.claude.com/docs/en/sub-agents
- Anthropic, how YC startups built with Claude Code: https://claude.com/blog/building-companies-with-claude-code
- OpenAI Codex: https://openai.com/codex/
- Codex cloud documentation: https://developers.openai.com/codex/cloud
- Codex `AGENTS.md` guide: https://developers.openai.com/codex/guides/agents-md
- GitHub Copilot cloud agent documentation: https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent
- GitHub Copilot coding agent delegation: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca
- Cursor agent best practices: https://cursor.com/blog/agent-best-practices
- Replit first app docs: https://docs.replit.com/build/your-first-app
- n8n PRD and test scenario generation: https://n8n.io/workflows/8073-generate-prds-and-test-scenarios-with-gptclaude-and-pdf-export/
- ChatPRD: https://www.chatprd.ai/
- Developer Toolkit, Cursor documentation workflows: https://developertoolkit.ai/en/cursor-ide/lessons/documentation/
- GitHub custom agents documentation: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents

---

### 9. Role 5: The Operating Chief of Staff

**Human analogue:** executive assistant, chief of staff, project coordinator, meeting prep assistant.

**Jobs-to-be-done:**

- prepare meeting briefs
- summarise prior context
- track follow-ups
- draft weekly updates
- maintain decision logs
- surface stale tasks
- summarise Slack/email/calendar context
- prepare investor/team updates
- flag operational risks

**Best first workflow:**

Start very narrow:

```text id="2syo19"
Every morning:
1. Review calendar.
2. Summarise meetings.
3. Pull relevant notes from prior conversations.
4. Identify follow-ups due today.
5. Draft suggested priorities.
6. Ask me what changed.
```

**Inputs needed:**

- calendar
- notes
- email/slack summaries
- task tracker
- project docs
- stakeholder list
- weekly goals

**Human review point:**

- Do not let it send sensitive messages.
- Do not let it reschedule important meetings automatically.
- Do not let it act as if it understands politics.
- Let it prepare context; you still manage the relationship.

**Why this role matters:**

Chief-of-staff style agents are a recurring pattern in the real-world workflow research: daily digests, inbox triage, meeting prep, investor updates, stakeholder tracking, and follow-up reminders. The strongest examples connect to existing systems like Slack, email, calendar, CRM, GitHub, finance tools, and docs.

The taxonomy also warns that a full AI Chief of Staff should be built gradually: meeting prep, inbox triage, follow-up tracking, and daily briefings are practical, while broad autonomy across email, calendar, CRM, Slack, and finance is much harder and riskier.

**Supporting evidence / URLs to consider:**

- GitHub, flashlib AI Chief of Staff: https://github.com/flashlib/ai-chief-of-staff
- Anyreach AI Chief of Staff case study: https://blog.anyreach.ai/case-study-how-anyreach-approaches-the-chief-of-staff-function-with-agentic-ai/
- Lindy meeting prep assistant: https://www.lindy.ai/templates/meeting-prep-assistant
- Lindy docs: https://docs.lindy.ai/
- Lindy Rhumbix case study: https://www.lindy.ai/case-study/rhumbix
- Lenny’s Newsletter, Webflow CPO AI chief of staff: https://www.lennysnewsletter.com/p/how-webflows-cpo-built-an-ai-chief
- Granola stakeholder meetings guide: https://www.granola.ai/blog/stakeholder-meetings-ai-notetakers-track-commitments-follow-ups
- ZenML LLMOps database, Outropy AI-powered Chief of Staff: https://www.zenml.io/llmops-database/ai-powered-chief-of-staff-scaling-agent-architecture-from-monolith-to-distributed-system
- Anthropic Dust customer story: https://www.anthropic.com/customers/dust?_bhlid=74b94e44d71e550bc3984cd1641b961df85fad3a

---

### 10. The hidden sixth role: The Sceptic

**Goal:** Add a distinctive, contrarian twist without expanding the main list.

Notes:

- Do not make this a sixth “department”.
- Make it the review layer across every role.
- Every AI role should have a critic mode.
- The Sceptic asks:
  - What evidence is weak?
  - What assumption is hidden?
  - What would make this fail?
  - What source is missing?
  - What should a human review?
  - What could be legally, reputationally, or financially risky?

This links to the research’s point that personal AI councils and advisory teams are emerging, and that agents challenging thinking can be more useful than agents simply producing output.

Potential section title:

**The AI role most people forget: the one that tells you no.**

This is very you. It gives the piece some bite.

**Supporting evidence / URLs to consider:**

- Business Insider, business owners training AI agents to challenge them: https://www.businessinsider.com/business-owners-explain-how-to-train-ai-employees-better-2026-2
- Business Insider, solo founder runs company with 15 AI agents: https://www.businessinsider.com/solo-founder-runs-company-with-15-ai-agents-heres-how-2026-2
- Coconut Consulting, AI sparring partner framework: https://coconutconsulting.ai/your-toughest-critic-should-be-in-your-pocket-the-ai-sparring-partner-framework/
- OpenAI guardrails and human review: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- Anthropic, “Building effective agents”: https://www.anthropic.com/engineering/building-effective-agents
- OWASP LLM06 Excessive Agency: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/

---

### 11. Start with what exists, then tune it yourself.

**Goal:** Include your “try what exists” point.

Notes:

- There are already public Claude Code subagent libraries, Cursor rule libraries, Custom GPTs, n8n templates, Make agents, Lindy templates, and Relevance AI marketplace/workforces.
- Readers should absolutely copy what exists.
- But they should not expect generic templates to fit their business context.
- The value comes from tuning:
  - your examples
  - your workflow
  - your customers
  - your tone
  - your constraints
  - your review rules
  - your failure modes

Possible line:

> Start by copying. Win by calibrating.

This section could include a “how to tune an AI role” checklist:

```text id="4t7h04"
Week 1: Use it manually.
Week 2: Add examples of good and bad output.
Week 3: Add review rules and escalation triggers.
Week 4: Connect tools carefully.
Week 5: Automate only the parts that survived reality.
```

This also supports your “try it yourself” message. The article should push readers to build, not just nod sagely while collecting another AI framework.

**Supporting evidence / URLs to consider:**

- Awesome Claude Code Subagents: https://github.com/VoltAgent/awesome-claude-code-subagents
- Awesome Cursor Rules: https://github.com/tugkanboz/awesome-cursorrules
- OpenAI GPT Store announcement: https://openai.com/index/introducing-the-gpt-store/
- OpenAI Cookbook GPT Actions Library: https://github.com/openai/openai-cookbook/tree/main/examples/chatgpt/gpt_actions_library
- n8n workflow templates: https://n8n.io/workflows/
- Make Library of Agents: https://www.make.com/en/ai-agents
- Lindy template library: https://docs.lindy.ai/fundamentals/lindy-101/templates
- Relevance AI marketplace: https://marketplace.relevanceai.com/
- Relevance AI agent skills repo: https://github.com/RelevanceAI/agent-skills/blob/main/reference/managing-relevance-agents/SKILL.md

---

### 12. Do not automate before you understand the workflow.

**Goal:** The caution section.

Notes:

- Use the podcast transcript’s point: test manually before automating.
- Also use the research’s caution that the most mature workflows are bounded, structured, and repeatable.
- The mature examples have clear triggers, structured data, and low ambiguity: lead enrichment, support triage, weekly reporting, coding loops, and meeting prep.
- This section should prevent the post becoming hype.

Suggested ladder:

```text id="njgxwm"
Level 1: Ask manually.
Level 2: Save reusable instructions.
Level 3: Add examples and context.
Level 4: Add tools/read-only access.
Level 5: Draft actions.
Level 6: Human approval.
Level 7: Limited automation.
Level 8: Continuous monitoring and evals.
```

Then say: most people should stop around levels 4–6 for a while. Very unfashionable. Also correct.

**Supporting evidence / URLs to consider:**

- Anthropic, “Building effective agents”: https://www.anthropic.com/engineering/building-effective-agents
- n8n human-in-the-loop tools: https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/
- n8n human-in-the-loop automation: https://blog.n8n.io/human-in-the-loop-automation/
- OpenAI guardrails and human review: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- Google CX Agent Studio best practices: https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/best-practices
- Clay Harmonic case study: https://www.clay.com/customers/harmonic
- AlexCloudstar solopreneur automation stack: https://www.alexcloudstar.com/blog/solopreneur-automation-stack-2026/
- Anthropic, how YC startups built with Claude Code: https://claude.com/blog/building-companies-with-claude-code

---

### 13. Costs, risks, and the boring bits that make this real.

**Goal:** Add credibility.

Notes:

Bring in three points:

**1. The main cost is not always the subscription.**  
The research notes that cost risk comes from repeated tool use: long context, retries, web search, browser actions, code execution, workflow executions, storage, logs, and human review time.

**2. Use tiered intelligence.**  
Use stronger models to establish quality, then move lower-risk tasks to cheaper models where acceptable. Cheaper models can handle classification, extraction, routing, summarisation, first drafts, and formatting; frontier models are more defensible for final judgement, synthesis, strategy, and complex coding.

**3. Human-in-the-loop is not a slogan.**  
It means explicit review before high-impact actions: payments, customer emails, public posts, CRM changes, production updates, hiring decisions, and legal/financial recommendations.

This section can be short but important. It will make the piece feel practical, not breathless.

**Supporting evidence / URLs to consider:**

- OpenAI API pricing: https://openai.com/api/pricing/
- Anthropic Claude pricing: https://claude.com/pricing
- OpenAI practical guide to building agents: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- OpenAI Codex rate card: https://help.openai.com/en/articles/20001106-codex-rate-card
- Cursor pricing: https://cursor.com/pricing
- GitHub Copilot pricing: https://github.com/features/copilot/plans
- n8n pricing: https://n8n.io/pricing/
- Zapier pricing: https://zapier.com/pricing
- Make pricing: https://www.make.com/en/pricing
- Lindy pricing: https://www.lindy.ai/pricing
- Relevance AI pricing docs: https://relevanceai.com/docs/get-started/pricing
- OWASP LLM06 Excessive Agency: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
- UK NCSC prompt injection guidance: https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- Anthropic, Demystifying evals for AI agents: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- OpenAI, Evaluate agent workflows: https://developers.openai.com/api/docs/guides/agent-evals
- LangSmith evaluation concepts: https://docs.langchain.com/langsmith/evaluation-concepts

---

### 14. How to choose your first AI role

**Goal:** Give readers a decision framework.

Use a scoring matrix.

Score each candidate role from 1–5 on:

| Criterion | Question |
|---|---|
| **Frequency** | Does this happen every day or week? |
| **Pain** | Is this slowing you down? |
| **Repeatability** | Does it follow a pattern? |
| **Reviewability** | Can you quickly check the output? |
| **Risk** | What happens if it is wrong? |
| **Context readiness** | Do you have examples/docs/data? |
| **Tool readiness** | Can it access what it needs safely? |
| **Leverage** | Does solving it unlock other work? |

Then explain:

**Build first:** high frequency, high pain, repeatable, easy to review, low/medium risk.  
**Build later:** high ambiguity, high risk, irreversible actions, poor data, unclear ownership.

This echoes the research’s recommendation that the best first AI roles are repetitive, sourceable, reviewable, bounded, painful enough to matter, and safe enough to delegate.

**Supporting evidence / URLs to consider:**

- Practical taxonomy of AI roles: use as source base from research docs.
- Anthropic, “Building effective agents”: https://www.anthropic.com/engineering/building-effective-agents
- OpenAI practical guide to building agents: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- OpenAI guardrails and human review: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- n8n human-in-the-loop automation: https://blog.n8n.io/human-in-the-loop-automation/
- OWASP LLM06 Excessive Agency: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/

---

### 15. Closing: the new skill is not prompting. It is managing work.

**Goal:** Land the main argument.

Notes:

- The closing should return to the title.
- AI org chart is not a cute diagram of synthetic employees.
- It is a way to decide:
  - what gets noticed
  - what gets drafted
  - what gets checked
  - what gets escalated
  - what gets shipped
  - what gets reviewed
  - what gets learned

The research dossier makes exactly this point: the AI org chart becomes more credible when framed as an operating system for work, not a novelty list of fake job titles.

Possible final idea:

> The founders and managers who win will not be the ones with the most agents. They will be the ones who know which roles to design, what context to give them, where to place human judgement, and when to stop automating.

**Supporting evidence / URLs to consider:**

- McKinsey, “The future of work is agentic”: https://www.mckinsey.com/~/media/mckinsey/business%20functions/people%20and%20organizational%20performance/our%20insights/the%20future%20of%20work%20is%20agentic/the-future-of-work-is-agentic_final.pdf
- Microsoft, “The agentic future: how we are becoming an AI-first Frontier Firm at Microsoft”: https://www.microsoft.com/insidetrack/blog/the-agentic-future-how-were-becoming-an-ai-first-frontier-firm-at-microsoft/
- Asana AI Teammates: https://asana.com/product/ai/ai-teammates
- Asana AI Teammates overview: https://asana.com/resources/ai-teammates-overview
- Anthropic, “Building effective agents”: https://www.anthropic.com/engineering/building-effective-agents
- OpenAI Agents SDK documentation: https://developers.openai.com/api/docs/guides/agents

## Suggested final table of contents

For a 20-minute read, I would use something like this:

```text id="rmq6kr"
Title:
The New AI Org Chart: 5 AI Roles Every Founder, Manager, or Solo Builder Should Hire First

Subtitle:
Not AI employees. Not prompt packs. A practical way to design reusable AI roles that help small teams act bigger without pretending humans no longer matter.

1. The wrong question is “which AI tool should I use?”
2. The AI org chart is not about replacing people. It is about designing work.
3. Before you hire an AI role, write its job description.
4. Pick one framework. Do not get FOMO.
5. Role 1: The Intelligence Analyst
6. Role 2: The Growth Operator
7. Role 3: The Voice Operator
8. Role 4: The Builder Partner
9. Role 5: The Operating Chief of Staff
10. The hidden sixth role: The Sceptic
11. Start with what exists, then tune it yourself.
12. Do not automate before you understand the workflow.
13. Costs, risks, and the boring bits that make this real.
14. How to choose your first AI role.
15. The new skill is not prompting. It is managing work.
```

## My strongest recommendation

Use **5 roles**, not 8.

The research gives you the breadth, but the article needs a clean story. Five roles are memorable, practical, and broad enough for founders, managers, and solopreneurs. Then include the research’s richer 8-role taxonomy as a small table or appendix-style section.

The punchline should be:

> **The first AI roles worth hiring are not the ones that sound most like executives. They are the ones that handle the repeatable work blocking you from doing the real work.**

That line is both practical and nicely anti-hype.

---

# Consolidated reference list from the research docs

## Existing discourse, AI org charts, and AI employees

- TechCrunch — AI agents and the one-person unicorn: https://techcrunch.com/2025/02/01/ai-agents-could-birth-the-first-one-person-unicorn-but-at-what-societal-cost/
- WIRED — All of My Employees Are AI Agents, and So Are My Executives: https://www.wired.com/story/all-my-employees-are-ai-agents-so-are-my-executives/
- Business Insider — Solo founder runs company with 15 AI agents: https://www.businessinsider.com/solo-founder-runs-company-with-15-ai-agents-heres-how-2026-2
- Business Insider — Business owners explain how to train AI employees better: https://www.businessinsider.com/business-owners-explain-how-to-train-ai-employees-better-2026-2
- Business Insider — Company replicated employee’s role with an AI agent: https://www.businessinsider.com/company-replicated-employees-role-with-ai-agent-worker-not-worried-2026-6
- Business Insider — AI agents are turning humans into mini CEOs: https://www.businessinsider.com/ai-agent-managers-vercel-guillermo-rauch-2026-3
- Business Insider — Loop engineering: https://www.businessinsider.com/what-are-loops-ai-engineering-tips-2026-6
- McKinsey — The future of work is agentic: https://www.mckinsey.com/~/media/mckinsey/business%20functions/people%20and%20organizational%20performance/our%20insights/the%20future%20of%20work%20is%20agentic/the-future-of-work-is-agentic_final.pdf
- Microsoft — The agentic future: becoming an AI-first Frontier Firm: https://www.microsoft.com/insidetrack/blog/the-agentic-future-how-were-becoming-an-ai-first-frontier-firm-at-microsoft/
- The Guardian — The world is not quite ready for digital workers: https://www.theguardian.com/technology/article/2024/jul/21/ai-digital-workers-employment
- Lindy — Announcing a new way to create AI employees: https://www.lindy.ai/blog/announcing-a-new-way-to-create-ai-employees
- Marblism AI Employees: https://www.marblism.com/
- Asana AI Teammates: https://asana.com/product/ai/ai-teammates
- Asana AI Teammates overview: https://asana.com/resources/ai-teammates-overview
- Relevance AI Workforce: https://relevanceai.com/workforce

## Tool-native role design and implementation

- Claude Projects documentation: https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects
- Claude Skills documentation: https://claude.com/docs/skills/how-to
- Anthropic Complete Guide to Building Skills for Claude: https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf
- Claude Code feature overview: https://code.claude.com/docs/en/features-overview
- Claude Code subagents documentation: https://code.claude.com/docs/en/sub-agents
- Claude Code memory documentation: https://code.claude.com/docs/en/memory
- Claude connectors overview: https://claude.com/docs/connectors/overview
- Awesome Claude Code Subagents: https://github.com/VoltAgent/awesome-claude-code-subagents
- ChatGPT Projects documentation: https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt
- Custom GPTs documentation: https://help.openai.com/en/articles/8554407-create-a-custom-gpt
- GPT Actions documentation: https://help.openai.com/en/articles/9442513-configuring-actions-in-gpts
- GPT Actions developer documentation: https://developers.openai.com/api/docs/actions/introduction
- OpenAI GPT Store announcement: https://openai.com/index/introducing-the-gpt-store/
- OpenAI Cookbook GPT Actions Library: https://github.com/openai/openai-cookbook/tree/main/examples/chatgpt/gpt_actions_library
- OpenAI Codex: https://openai.com/codex/
- Codex cloud documentation: https://developers.openai.com/codex/cloud
- Codex `AGENTS.md` guide: https://developers.openai.com/codex/guides/agents-md
- OpenAI Agents SDK documentation: https://openai.github.io/openai-agents-python/
- OpenAI Agents SDK tracing: https://openai.github.io/openai-agents-python/tracing/
- GitHub Copilot cloud agent documentation: https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent
- GitHub Copilot coding agent delegation: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca
- GitHub custom agents documentation: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents
- Cursor documentation: https://cursor.com/docs
- Cursor Rules documentation: https://cursor.com/docs/rules
- Cursor agent best practices: https://cursor.com/blog/agent-best-practices
- Awesome Cursor Rules: https://github.com/tugkanboz/awesome-cursorrules
- Windsurf / Cascade memories and rules: https://docs.devin.ai/windsurf/plugins/cascade/memories
- Replit Agent automations: https://docs.replit.com/references/agent/automations
- Replit first app docs: https://docs.replit.com/build/your-first-app

## Workflow and automation platforms

- n8n AI agents: https://n8n.io/ai-agents/
- n8n workflow templates: https://n8n.io/workflows/
- n8n human-in-the-loop tools: https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/
- n8n human-in-the-loop automation: https://blog.n8n.io/human-in-the-loop-automation/
- Zapier Agents: https://zapier.com/agents
- Zapier, AI agents for business automation: https://zapier.com/blog/ai-agents-for-business/
- Zapier, AI agent examples: https://zapier.com/blog/ai-agents-examples/
- Zapier, Zapier Agents guide: https://zapier.com/blog/zapier-agents-guide/
- Zapier, orchestrating Zapier agents: https://zapier.com/blog/orchestrate-zapier-agents/
- Make AI Agents: https://www.make.com/en/ai-agents
- Make AI Agents API documentation: https://developers.make.com/api-documentation/api-reference/ai-agents
- Lindy template library: https://docs.lindy.ai/fundamentals/lindy-101/templates
- Lindy docs: https://docs.lindy.ai/
- Lindy sales solution: https://www.lindy.ai/solutions/sales
- Relevance AI introduction: https://relevanceai.com/docs/get-started/introduction
- Relevance AI marketplace: https://marketplace.relevanceai.com/
- Relevance AI agent skills repo: https://github.com/RelevanceAI/agent-skills/blob/main/reference/managing-relevance-agents/SKILL.md

## Real-world workflow examples

- OpenAI — Small businesses are getting more done with ChatGPT: https://openai.com/index/small-business-stories/
- Anthropic — How three YC startups built their companies with Claude Code: https://claude.com/blog/building-companies-with-claude-code
- Anthropic — Zapier customer story: https://www.anthropic.com/customers/zapier?continueFlag=21a52cd976eb721b5245e31bc4321331
- Anthropic — Dust customer story: https://www.anthropic.com/customers/dust?_bhlid=74b94e44d71e550bc3984cd1641b961df85fad3a
- Clay — Harmonic case study: https://www.clay.com/customers/harmonic
- Clay — Mistral AI case study: https://www.clay.com/customers/mistral-ai
- Clay — Exit Five case study: https://www.clay.com/customers/exit-five
- Clay — Lovable case study: https://www.clay.com/customers/lovable
- Clay — Rootly case study: https://www.clay.com/customers/rootly
- Supabase — Chatbase case study: https://supabase.com/customers/chatbase
- Lindy — Seven Zero Ventures case study: https://www.lindy.ai/case-study/seven-zero-ventures-b2lq1
- Lindy — Pragmatic case study: https://www.lindy.ai/case-study/pragmatic-transformed-their-consulting
- Lindy — Rhumbix case study: https://www.lindy.ai/case-study/rhumbix
- Anyreach — AI Chief of Staff case study: https://blog.anyreach.ai/case-study-how-anyreach-approaches-the-chief-of-staff-function-with-agentic-ai/
- AlexCloudstar — Solopreneur Automation Stack 2026: https://www.alexcloudstar.com/blog/solopreneur-automation-stack-2026/
- GitHub — flashlib AI Chief of Staff: https://github.com/flashlib/ai-chief-of-staff
- GitHub — AI-Powered Competitor Monitoring Agent: https://github.com/farazz55/competitor-monitoring-agent
- Granola — Stakeholder meeting workflow guide: https://www.granola.ai/blog/stakeholder-meetings-ai-notetakers-track-commitments-follow-ups
- ZenML LLMOps Database — Outropy AI-powered Chief of Staff: https://www.zenml.io/llmops-database/ai-powered-chief-of-staff-scaling-agent-architecture-from-monolith-to-distributed-system

## Role-specific templates and sources

- n8n market research workflow: https://n8n.io/workflows/12236-run-ai-powered-market-research-with-groq-openai-documentero-and-gmail/
- n8n competitor analysis workflow: https://n8n.io/workflows/6580-generate-ai-powered-competitor-analysis-reports-with-gpt-4-apify-and-google-docs/
- n8n AI lead research and qualification: https://n8n.io/workflows/9101-ai-powered-lead-research-and-qualification-using-relevance-ai/
- n8n AI sales assistant with GPT and Claude: https://n8n.io/workflows/9026-ai-sales-assistant-with-gpt-and-claude-qualify-leads-book-meetings/
- n8n PRD and test scenario generation: https://n8n.io/workflows/8073-generate-prds-and-test-scenarios-with-gptclaude-and-pdf-export/
- n8n recursive writing and editing agents: https://n8n.io/workflows/3503-generate-written-content-with-gpt-recursive-writing-and-editing-agents/
- n8n invoice agent: https://n8n.io/workflows/7905-ai-invoice-agent/
- n8n invoice approval flow: https://n8n.io/workflows/4452-automated-pdf-invoice-processing-and-approval-flow-using-openai-and-google-sheets/
- n8n knowledge-base/RAG agent: https://n8n.io/workflows/6538-company-knowledge-base-agent-rag/
- Relevance AI Sales Researcher: https://marketplace.relevanceai.com/agents/sales-researcher
- Relevance AI Outbound BDR Agent: https://relevanceai.com/blog/outbound-bdr-agent-how-relevance-ai-automates-sales-research-and-outreach
- Relevance AI BDR agent docs: https://relevanceai.com/docs/build/agents/agent-examples/bosh-bdr-agent
- Relevance AI Competitive Intelligence Agent: https://marketplace.relevanceai.com/listing/90093b11-abf5-4f20-b0ac-267efd698669
- Relevance AI AI Data Analyst agents: https://marketplace.relevanceai.com/use-cases/ai-data-analyst
- Relevance AI Technical Documentation Generator: https://marketplace.relevanceai.com/agents/technical-documentation-generator
- Relevance AI Recruitment Screening Agent: https://marketplace.relevanceai.com/agents/recruitment-screening-agent
- Lindy meeting prep assistant: https://www.lindy.ai/templates/meeting-prep-assistant
- Lindy recruiting agent: https://www.lindy.ai/templates/recruiting-agent-1-recruiting-agent
- Lindy learning assistant: https://www.lindy.ai/templates/ai-learning-assistant
- Dovetail AI Analysis: https://dovetail.com/product/ai-analysis/
- Fivetran product feedback AI platform: https://www.fivetran.com/blog/how-our-product-team-uses-ai-to-manage-customer-feedback-at-scale
- Pluggin customer interview synthesis workflow: https://www.pluggin.ai/workflows/customer-interview-synthesis
- Zendesk intelligent triage workflows: https://support.zendesk.com/hc/en-us/articles/5222280338202-Intelligent-triage-use-cases-and-workflows
- Postman customer ticket triage agent: https://www.postman.com/templates/agents/customer-ticket-triage-agent/
- ChatPRD: https://www.chatprd.ai/
- Developer Toolkit, Cursor documentation workflows: https://developertoolkit.ai/en/cursor-ide/lessons/documentation/
- Coconut Consulting, AI sparring partner framework: https://coconutconsulting.ai/your-toughest-critic-should-be-in-your-pocket-the-ai-sparring-partner-framework/

## Risks, costs, evaluation, and governance

- OpenAI API pricing: https://openai.com/api/pricing/
- OpenAI API tool pricing details: https://developers.openai.com/api/docs/pricing
- Anthropic Claude pricing: https://claude.com/pricing
- OpenAI ChatGPT Plus Help Centre: https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus
- OpenAI ChatGPT Business Help Centre: https://help.openai.com/en/articles/8792828-what-is-chatgpt-business
- OpenAI Codex rate card: https://help.openai.com/en/articles/20001106-codex-rate-card
- Gemini Developer API pricing: https://ai.google.dev/gemini-api/docs/pricing
- Cursor pricing: https://cursor.com/pricing
- GitHub Copilot pricing: https://github.com/features/copilot/plans
- GitHub Copilot usage-based billing changelog: https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
- Replit pricing: https://replit.com/pricing
- n8n pricing: https://n8n.io/pricing/
- Zapier pricing: https://zapier.com/pricing
- Make pricing: https://www.make.com/en/pricing
- Lindy pricing: https://www.lindy.ai/pricing
- Relevance AI pricing docs: https://relevanceai.com/docs/get-started/pricing
- Hugging Face Inference Endpoints pricing: https://huggingface.co/docs/inference-endpoints/pricing
- OpenAI practical guide to building agents: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- Anthropic, “Building effective agents”: https://www.anthropic.com/research/building-effective-agents
- Anthropic, Demystifying evals for AI agents: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- OpenAI, Evaluate agent workflows: https://developers.openai.com/api/docs/guides/agent-evals
- LangSmith evaluation concepts: https://docs.langchain.com/langsmith/evaluation-concepts
- Google CX Agent Studio best practices: https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/best-practices
- OWASP LLM06 Excessive Agency: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
- UK NCSC prompt injection guidance: https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection
- NCSC secure AI system development guidance: https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development/introduction
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- IDC, AI agents as instruments, not co-workers: https://www.idc.com/resource-center/blog/the-future-of-work-ai-agents-as-instruments-no-co-workers/
- Nature / npj AI article on accountability in human-AI agent relationships: https://www.nature.com/articles/s44387-025-00041-7
