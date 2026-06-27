# Practical Taxonomy of AI Roles for Founders, Solopreneurs, Managers, and Builders

## Working topic

**The New AI Org Chart: the AI agent roles every founder, manager, or solo builder should hire first**

## Core question

If a founder, manager, or solopreneur could build a small AI org chart today, which AI roles should they create first, and why?

---

# 1. Executive summary

- **The strongest “hire AI first” pattern is not one big autonomous agent.** It is a small set of *bounded assistants* with clear jobs: research, sales prep, support triage, content repurposing, product specs, code assistance, meeting prep, and customer feedback synthesis. This matches both official product direction and template ecosystems from OpenAI, Anthropic, Zapier, n8n, Lindy, Relevance AI, GitHub Copilot, Cursor, and Replit.

- **The most repeated roles in public examples are sales/research agents, support triage agents, coding agents, meeting/admin assistants, content operators, and customer feedback synthesis agents.** These appear across vendor templates, workflow libraries, and real-world founder/solopreneur examples.

- **The easiest first hires are not the flashiest.** A market researcher, editor, content repurposer, strategy sparring partner, and meeting prep assistant can be built with minimal integrations. A sales agent, support triage agent, finance assistant, or recruiting agent needs more data access, stronger guardrails, and human review.

- **The highest-leverage roles are those that reduce waiting for scarce humans.** For founders, that often means market research before hiring a strategist, sales research before hiring SDRs, product specs before hiring a PM, coding assistance before hiring more engineers, and support triage before hiring a support team.

- **The “AI Chief of Staff” is attractive, but should usually be built gradually.** Meeting prep, inbox triage, follow-up tracking, and daily briefings are practical. Full operational autonomy across email, calendar, CRM, Slack, and finance is much harder and riskier. Public examples exist, but the best ones use progressive trust and human-in-the-loop review.

- **Customer-facing and money-moving roles are the riskiest.** Support, finance, recruiting, and outbound sales can create real damage if hallucinations, biased assessments, incorrect refunds, wrong invoices, or non-compliant outreach slip through. Agent guardrails, evaluation, and human review are not optional bureaucracy. Sadly, bureaucracy has found a way to be useful.

- **Coding agents are now one of the clearest “small team acts bigger” roles.** GitHub Copilot coding agent, OpenAI Codex, Cursor Agent, Claude Code, and Replit Agent all position around delegating implementation, refactoring, testing, documentation, or app-building tasks. The caveat: review, tests, security checks, and repo-specific instructions remain essential.

- **For a Substack article, 8 roles is the strongest structure.** Four is too narrow, six is elegant but misses important “business plumbing”, ten becomes a catalogue. Eight gives enough breadth to feel like an org chart while still being memorable.

---

# 2. AI role taxonomy

## Evidence labels

- **Strong:** repeated across multiple credible sources, official docs, templates, or real usage examples.
- **Medium:** visible in templates and practitioner examples, but less independent evidence.
- **Weak:** mostly inferred, marketing-led, or useful only in narrow contexts.

| AI role | Human role analogue | Main jobs-to-be-done | Required context | Implementation difficulty | Risk level | Evidence strength | Source URLs |
|---|---|---|---|---:|---:|---:|---|
| **Market Researcher** | Market analyst / junior strategist | Research market size, customer pain points, alternatives, trends, category dynamics | Product idea, ICP, markets, competitors, web access | Low–Medium | Medium | Strong | n8n market research templates and Relevance market research agents show this pattern repeatedly. Source: https://n8n.io/workflows/12236-run-ai-powered-market-research-with-groq-openai-documentero-and-gmail/ |
| **Competitive Intelligence Agent** | Competitive analyst | Track pricing, messaging, launches, reviews, positioning, battlecards | Competitor list, websites, review sources, cadence | Medium | Medium | Strong | n8n and Relevance both have dedicated competitor monitoring workflows/agents. Source: https://n8n.io/workflows/6580-generate-ai-powered-competitor-analysis-reports-with-gpt-4-apify-and-google-docs/ |
| **Customer Insight Analyst** | UX researcher / product analyst | Summarise interviews, cluster feedback, extract pain points, quote evidence, recommend opportunities | Transcripts, support tickets, surveys, CRM notes | Medium | Medium | Strong | Dovetail, Fivetran, and public workflow templates all point to feedback synthesis as a practical AI use case. Sources: https://dovetail.com/product/ai-analysis/ and https://www.fivetran.com/blog/how-our-product-team-uses-ai-to-manage-customer-feedback-at-scale |
| **Strategy Sparring Partner** | Advisor / chief of staff / board observer | Challenge assumptions, run premortems, pressure-test plans, simulate objections | Founder context, strategy docs, metrics, constraints | Very low | Medium–High | Medium | Many practitioner posts support this, but evidence is mostly qualitative. Useful as a thinking mode, not a decision-maker. Source: https://coconutconsulting.ai/your-toughest-critic-should-be-in-your-pocket-the-ai-sparring-partner-framework/ |
| **Content / Voice Operator** | Content marketer / ghostwriter / social media operator | Repurpose long-form content, draft posts, adapt tone, maintain publishing cadence | Brand voice, previous writing, audience, channels | Low | Medium | Strong | OpenAI Custom GPTs, n8n content loops, and solopreneur examples all support this use case. Source: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/custom-gpts |
| **Editor** | Copy editor / reviewer | Improve clarity, check tone, critique structure, enforce style guide | Draft text, style guide, target audience | Very low | Low–Medium | Strong | Custom GPTs and Claude Skills are explicitly suited to repeatable writing/style workflows. Source: https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf |
| **Sales Prospecting Assistant** | SDR / sales researcher | Build lead lists, enrich companies, prepare account briefs, draft personalised outreach | ICP, target accounts, web/LinkedIn/enrichment tools, CRM | Medium | Medium–High | Strong | Relevance AI, Lindy, n8n, and Zapier repeatedly showcase sales research/prospecting agents. Sources: https://marketplace.relevanceai.com/agents/sales-researcher and https://relevanceai.com/blog/outbound-bdr-agent-how-relevance-ai-automates-sales-research-and-outreach |
| **Lead Qualification Assistant** | SDR / inbound sales assistant | Score leads, route hot prospects, book meetings, draft follow-ups | Lead forms, CRM, scoring rules, calendar | Medium–High | High | Strong | n8n templates repeatedly automate qualification, routing, and meeting booking. Source: https://n8n.io/workflows/9101-ai-powered-lead-research-and-qualification-using-relevance-ai/ |
| **Product Manager / Spec Writer** | PM / business analyst | Turn messy ideas into PRDs, user stories, acceptance criteria, test cases | Customer problem, product constraints, existing roadmap | Low–Medium | Medium | Strong | ChatPRD, Figma, n8n, and Agentman all provide PRD/spec generation examples. Sources: https://www.chatprd.ai/ and https://n8n.io/workflows/8073-generate-prds-and-test-scenarios-with-gptclaude-and-pdf-export/ |
| **Coding Pair Programmer** | Software engineer / pair programmer | Implement features, refactor code, write tests, explain code, open PRs | Repo access, issue/task, coding standards, tests | Medium | High | Strong | GitHub Copilot, OpenAI Codex, Cursor, and Replit all support agentic coding workflows. Sources: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca and https://openai.com/codex/ |
| **QA / Red Team Reviewer** | QA engineer / code reviewer / sceptic | Find bugs, check edge cases, review PRs, run adversarial critique | Test cases, product spec, code, risk checklist | Medium | Medium | Strong for code, Medium for business | GitHub custom agents include review/documentation/security-style agents; research also warns AI code review misses security flaws. Sources: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents and https://arxiv.org/abs/2509.13650 |
| **Data Analyst** | BI analyst / analytics engineer | Answer metric questions, write SQL, build charts, explain trends | Clean warehouse, semantic layer, metric definitions | Medium–High | High | Medium | Relevance and n8n provide SQL/data analyst templates, but risk rises sharply without metric governance. Source: https://marketplace.relevanceai.com/use-cases/ai-data-analyst |
| **Finance / Admin Assistant** | Bookkeeper / finance ops assistant | Extract invoices, categorise expenses, prepare reports, route approvals | Invoices, receipts, chart of accounts, approval rules | Medium–High | High | Medium | n8n and Make have many invoice-processing templates; best versions include approval flows. Sources: https://n8n.io/workflows/7905-ai-invoice-agent/ and https://n8n.io/workflows/4452-automated-pdf-invoice-processing-and-approval-flow-using-openai-and-google-sheets/ |
| **Operations Chief of Staff** | Chief of staff / executive assistant | Daily briefings, follow-ups, risk surfacing, project status, coordination | Email, calendar, Slack, CRM, project tools | High | High | Medium | Lindy and public examples show promise, but the role requires broad access and trust-building. Sources: https://docs.lindy.ai/ and https://www.lennysnewsletter.com/p/how-webflows-cpo-built-an-ai-chief |
| **Meeting Prep Assistant** | Executive assistant / account researcher | Research attendees, summarise history, prepare agenda and talking points | Calendar, email history, CRM, web access | Medium | Medium | Strong | Lindy, n8n, and founder examples show meeting prep as a recurring practical pattern. Source: https://www.lindy.ai/templates/meeting-prep-assistant |
| **Personal CRM / Stakeholder Tracker** | EA / relationship manager | Track conversations, reminders, stakeholder notes, follow-ups | Contacts, email, calendar, notes | Medium–High | Medium–High | Medium | Usually appears inside Chief of Staff or meeting-prep workflows rather than as a standalone template. Source: https://docs.lindy.ai/ |
| **Customer Support Triage Agent** | Support rep / support operations | Classify tickets, answer FAQs with sources, route complex cases, draft replies | Help centre, past tickets, helpdesk integration, escalation rules | Medium–High | High | Strong | Zendesk, Postman, n8n, and a Nubank research paper show strong evidence, but also strong need for evals and guardrails. Sources: https://support.zendesk.com/hc/en-us/articles/5222280338202-Intelligent-triage-use-cases-and-workflows and https://arxiv.org/abs/2606.08867 |
| **Recruiting / Talent Sourcer** | Recruiter / sourcer | Source candidates, screen CVs, draft outreach, schedule interviews | JD, scoring rubric, ATS, candidate data, legal constraints | High | Very high | Medium | Lindy, Relevance, and n8n templates exist, but hiring fairness and compliance make this a cautious later hire. Sources: https://www.lindy.ai/templates/recruiting-agent-1-recruiting-agent and https://marketplace.relevanceai.com/agents/recruitment-screening-agent |
| **Learning / Tutor Assistant** | Tutor / L&D coach | Build learning paths, explain topics, create quizzes, summarise materials | Learning goals, source materials, skill level | Low–Medium | Medium | Medium | Useful, well-represented in templates, but less obviously a “first business hire” unless training is central. Source: https://www.lindy.ai/templates/ai-learning-assistant |
| **Documentation Assistant** | Technical writer / enablement specialist | Generate READMEs, onboarding docs, API docs, knowledge-base answers | Repo/docs access, product architecture, style guide | Medium | Medium | Strong | Cursor, Relevance, GitHub custom agents, and open-source skills show repeatable documentation workflows. Sources: https://developertoolkit.ai/en/cursor-ide/lessons/documentation/ and https://marketplace.relevanceai.com/agents/technical-documentation-generator |

---

# 3. Ranking of roles by usefulness

| Rank | AI role | Why it ranks here |
|---:|---|---|
| 1 | **Coding Pair Programmer + QA Reviewer** | For builders, this directly unblocks product creation. The strongest current tooling is in coding agents: Codex, Copilot, Cursor, Claude Code, and Replit all support implementation, testing, refactoring, or PR workflows. Sources: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca and https://openai.com/codex/ |
| 2 | **Sales Prospecting + Lead Qualification Assistant** | It connects directly to revenue and replaces a large amount of repetitive SDR work: enrichment, scoring, personalised outreach, and meeting prep. Evidence is strong across Relevance, Lindy, n8n, and Zapier. Source: https://relevanceai.com/blog/outbound-bdr-agent-how-relevance-ai-automates-sales-research-and-outreach |
| 3 | **Market & Competitive Researcher** | Almost every founder needs market context before committing money or time. It is repetitive, web-native, and easy to review if sources are required. Sources: https://n8n.io/workflows/12236-run-ai-powered-market-research-with-groq-openai-documentero-and-gmail/ and https://n8n.io/workflows/6580-generate-ai-powered-competitor-analysis-reports-with-gpt-4-apify-and-google-docs/ |
| 4 | **Customer Insight Analyst** | Turns messy qualitative data into product direction. It does not replace talking to customers, but it reduces synthesis time dramatically and helps small teams spot repeated pain points. Sources: https://www.pluggin.ai/workflows/customer-interview-synthesis and https://dovetail.com/product/ai-analysis/ |
| 5 | **Content / Voice Operator + Editor** | High-frequency, low-friction leverage. Especially useful for founders, consultants, newsletter writers, and creators who already have ideas but lack time to package them. Sources: https://www.businessinsider.com/solopreneurs-use-ai-to-boost-content-creation-efficiency-2026-2 and https://academy.openai.com/public/clubs/work-users-ynjqu/resources/custom-gpts |
| 6 | **Customer Support Triage Agent** | Very high leverage once support volume exists. It can classify, draft, answer routine questions, and escalate. But because it touches customers directly, it needs strong guardrails. Sources: https://support.zendesk.com/hc/en-us/articles/5222280338202-Intelligent-triage-use-cases-and-workflows and https://www.postman.com/templates/agents/customer-ticket-triage-agent/ |
| 7 | **Product Spec Writer** | Bridges founder intuition and builder execution. It helps convert messy ideas into PRDs, user stories, acceptance criteria, and test scenarios. Source: https://n8n.io/workflows/8073-generate-prds-and-test-scenarios-with-gptclaude-and-pdf-export/ |
| 8 | **Meeting Prep / Ops Assistant** | Gives back cognitive bandwidth. The leverage is less glamorous than a coding agent, but showing up prepared to every meeting is a quiet superpower. Sources: https://www.lindy.ai/templates/meeting-prep-assistant and https://www.lennysnewsletter.com/p/how-webflows-cpo-built-an-ai-chief |
| 9 | **Documentation Assistant** | Reduces onboarding and support load. Very useful for technical products and small teams where “documentation” otherwise means “ask Dave, he remembers something from 2021”. Sources: https://developertoolkit.ai/en/cursor-ide/lessons/documentation/ and https://marketplace.relevanceai.com/agents/technical-documentation-generator |
| 10 | **Data Analyst** | Potentially huge value, but depends on clean metrics, trusted data, and permissioning. Otherwise it becomes an eloquent spreadsheet hazard. Source: https://marketplace.relevanceai.com/use-cases/ai-data-analyst |
| 11 | **Finance / Admin Assistant** | Excellent for invoice extraction, receipt classification, and report prep, but humans should approve financial outputs. Sources: https://n8n.io/workflows/9054-automated-financial-document-processing-with-google-gemini-ocr/ and https://n8n.io/workflows/4452-automated-pdf-invoice-processing-and-approval-flow-using-openai-and-google-sheets/ |
| 12 | **Recruiting / Talent Sourcer** | Useful for sourcing and first-pass structuring, but high-stakes due to bias, fairness, candidate experience, and legal risk. Sources: https://marketplace.relevanceai.com/agents/recruitment-screening-agent and https://www.lindy.ai/templates/recruiting-agent-1-recruiting-agent |

## Practical conclusion

The highest-leverage “first hires” are the ones where outputs are *useful even when imperfect* and where the human can review them quickly:

- research
- content
- specs
- code
- sales prep
- meeting prep
- documentation
- customer feedback synthesis

---

# 4. Ranking of roles by ease of implementation

| Rank | AI role | Why it is easy or hard |
|---:|---|---|
| 1 | **Editor** | Needs only a draft and style guide. No integrations required. |
| 2 | **Strategy Sparring Partner** | Can start as a reusable prompt or Custom GPT. Risk is not setup; risk is believing it too much. |
| 3 | **Content / Voice Operator** | Easy with writing samples and channel templates. Strong fit for Custom GPTs or Claude Projects. Source: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/custom-gpts |
| 4 | **Market Researcher** | Needs web access and source discipline. Easy to start manually; harder to automate well. |
| 5 | **Product Spec Writer** | Needs structured intake questions and templates. Integrations optional. |
| 6 | **Documentation Assistant** | Easy if docs/code are accessible; harder if the repo is messy or tribal knowledge lives in people’s heads. |
| 7 | **Meeting Prep Assistant** | Requires calendar/email access for best results, but bounded outputs make it practical. |
| 8 | **Customer Insight Analyst** | Needs transcripts or feedback exports. Strong value once data is centralised. |
| 9 | **Coding Pair Programmer** | Setup is now easy, but safe usage requires tests, repo instructions, PR review, and security awareness. |
| 10 | **Sales Prospecting Assistant** | Needs ICP, lead sources, enrichment tools, CRM rules, and outreach constraints. |
| 11 | **Customer Support Triage Agent** | Needs knowledge base quality, helpdesk integration, escalation paths, and evaluation. |
| 12 | **Data Analyst** | Requires metric definitions, warehouse permissions, and safeguards against wrong SQL or wrong interpretation. |
| 13 | **Finance / Admin Assistant** | Needs accounting context, invoice schemas, approval workflow, and auditability. |
| 14 | **Recruiting / Talent Sourcer** | Needs rubrics, compliance, fairness checks, candidate data governance, and human decision ownership. |

---

# 5. “Hire before hiring” analysis

| AI role | What it can handle before hiring a human | What it cannot handle | When to hire a human anyway |
|---|---|---|---|
| **Market Researcher** | Desk research, competitor lists, trend summaries, source-backed memos | Original market intuition, nuanced founder judgement, primary research | When market choice is existential or you need expert category insight |
| **Competitive Intelligence Agent** | Monitor pricing, feature launches, website changes, reviews, battlecard drafts | Strategic interpretation of competitor intent | When competitive strategy becomes a core growth motion |
| **Customer Insight Analyst** | Transcript synthesis, theme clustering, quote extraction, pain-point summaries | Replacing actual customer conversations | When discovery quality is limiting product-market fit |
| **Strategy Sparring Partner** | Premortems, assumption checks, board-style challenge, decision framing | Making the decision or carrying accountability | When stakes require experienced human judgement, politics, or negotiation |
| **Content / Voice Operator** | Repurpose ideas, draft posts, enforce voice, generate variations | Having taste, lived experience, original conviction | When content is the product or brand voice is the moat |
| **Editor** | Improve clarity, structure, tone, consistency | Know whether the idea is worth publishing | When editorial judgement defines audience trust |
| **Sales Prospecting Assistant** | Account research, lead enrichment, outreach drafts, call prep | Building relationships, navigating objections, closing complex deals | When replies need judgement, negotiation, or strategic enterprise selling |
| **Lead Qualification Assistant** | Score inbound leads, route, summarise, book meetings | Understand subtle buying intent reliably in all cases | When pipeline quality or deal value is high enough to justify SDR/AE ownership |
| **Product Spec Writer** | PRDs, user stories, acceptance criteria, test scenarios | Decide trade-offs, own roadmap politics, say “no” to stakeholders | When coordination across engineering/design/customers becomes the bottleneck |
| **Coding Pair Programmer** | Implement bounded tasks, refactor, write tests, explain code | Own architecture, security, production reliability, long-term maintainability | When code quality or product complexity exceeds review capacity |
| **QA / Red Team Reviewer** | Find edge cases, critique plans, review code, produce test ideas | Guarantee correctness or security | When bugs are costly or compliance/security matter |
| **Data Analyst** | Write SQL drafts, create quick charts, explain metric movement | Define trustworthy metrics or resolve data ambiguity alone | When decisions depend on clean causal analysis or production data models |
| **Finance / Admin Assistant** | Invoice extraction, receipt classification, weekly summaries, approval routing | Own books, taxes, compliance, cash planning | When money movement, audit, tax, or investor reporting matters |
| **Ops Chief of Staff** | Daily briefings, follow-up tracking, meeting prep, risk surfacing | Exercise authority, resolve conflicts, manage humans | When coordination failure is hurting execution |
| **Meeting Prep Assistant** | Attendee research, context summaries, agenda drafts | Read emotional dynamics in the room | When relationship management becomes strategic |
| **Personal CRM / Stakeholder Tracker** | Reminder logs, last-touch summaries, follow-up prompts | Build trust for you | When stakeholder complexity is high and politically sensitive |
| **Customer Support Triage Agent** | Classify, draft, answer FAQ-class tickets, escalate | Own angry customers, ambiguous refunds, sensitive cases | When customer experience is becoming a brand differentiator |
| **Recruiting / Talent Sourcer** | Source candidates, parse CVs, draft outreach, schedule interviews | Make fair hiring decisions, assess culture, close candidates | When hiring becomes critical to company quality |
| **Learning / Tutor Assistant** | Personalised explanations, quizzes, learning paths, onboarding refreshers | Replace coaching, mentorship, accountability | When skill development is strategic or team-wide |
| **Documentation Assistant** | Draft docs, READMEs, onboarding guides, API references, knowledge-base answers | Know what undocumented reality matters most | When documentation quality affects onboarding, support, or enterprise sales |

---

# 6. Recommended role set for the article

## Comparison: 4 vs 6 vs 8 vs 10 roles

| Number of roles | Strength | Weakness | Verdict |
|---:|---|---|---|
| **4 roles** | Very clean and memorable | Too reductive; misses important business functions | Good for a punchy LinkedIn post, not the main Substack essay |
| **6 roles** | Strong narrative discipline | Forces awkward grouping; support, sales, ops, and product compete for space | Good if you want a tighter, more opinionated essay |
| **8 roles** | Best balance of breadth and memorability | Requires careful naming and grouping | **Recommended** |
| **10 roles** | Most complete | Starts to feel like a software catalogue rather than an argument | Better as a follow-up checklist or appendix |

## Recommended 8-role article structure

I would use **8 roles**, grouped as the first AI org chart a small team could realistically build:

1. **Market & Competitor Researcher**
2. **Customer Insight Analyst**
3. **Content & Voice Operator**
4. **Sales Research & Qualification Assistant**
5. **Customer Support Triage Agent**
6. **Product Spec Writer**
7. **Coding & QA Partner**
8. **Operations / Meeting Chief of Staff**

I would **not** make “Strategy Sparring Partner” a full standalone role in the core list.

Instead, I would frame it as a *mode* that every founder should use across the org chart:

- the research agent challenges assumptions
- the product agent challenges scope
- the ops agent challenges priorities
- the coding agent challenges implementation risk

That gives the article a more interesting thesis:

**Do not hire one AI advisor; build a small AI operating team where each role has bounded context and bounded responsibility.**

---

# 7. Suggested names for each role

| Practical role name | Founder-friendly article name | Avoid calling it |
|---|---|---|
| Market & Competitor Researcher | **The Market Researcher** | “AI McKinsey” |
| Customer Insight Analyst | **The Customer Insight Analyst** | “Synthetic customer” |
| Content & Voice Operator | **The Content Operator** | “Ghostwriter that replaces you” |
| Sales Research & Qualification Assistant | **The Sales Research Assistant** | “Autonomous salesperson” |
| Customer Support Triage Agent | **The Support Triage Assistant** | “Support rep replacement” |
| Product Spec Writer | **The Product Spec Writer** | “AI PM” |
| Coding & QA Partner | **The Coding Partner** | “AI engineer replacement” |
| Operations / Meeting Chief of Staff | **The Ops Assistant** or **The Meeting Prep Assistant** | “AI Chief of Staff” unless you caveat heavily |
| Strategy Sparring Partner | **The Strategy Sparring Mode** | “AI CEO” |
| Finance / Admin Assistant | **The Finance Prep Assistant** | “AI accountant” |
| Recruiting / Talent Sourcer | **The Talent Research Assistant** | “AI recruiter” |
| Data Analyst | **The Metrics Assistant** | “AI data team” |
| Documentation Assistant | **The Documentation Assistant** | “Self-writing knowledge base” |
| Learning / Tutor Assistant | **The Learning Coach** | “AI university” |

---

# 8. Contrarian section: roles not to build first

## Do not build these first unless the workflow is already mature

| Role | Why it is risky or overhyped |
|---|---|
| **Fully autonomous AI Chief of Staff** | It requires broad access to email, calendar, Slack, CRM, docs, and sometimes finance. The setup looks magical until it sends the wrong thing to the wrong person, at which point the magic becomes a small governance incident. |
| **Autonomous finance agent** | Invoice extraction and expense categorisation are useful. Payment approval, tax treatment, and financial reporting should stay human-reviewed. |
| **Autonomous recruiter / candidate screener** | Sourcing help is fine; final candidate judgement is high-stakes. Bias, explainability, and compliance risk are too significant. |
| **Customer support agent with no escalation path** | Support triage is one of the strongest use cases, but only with source-grounded answers, confidence thresholds, and human escalation. Rollbacks in customer service show that weak governance remains a real problem. Source: https://www.itpro.com/technology/artificial-intelligence/ai-agents-arent-cutting-it-in-customer-service |
| **Data analyst directly connected to messy production data** | A wrong SQL query with a confident explanation can be worse than no analysis. Metric definitions and semantic layers matter. |
| **Strategy oracle / AI co-founder** | Useful for challenge and synthesis. Dangerous when treated as a substitute for lived context, taste, and accountability. |
| **“Agent fleet” before one reliable workflow** | Anthropic’s guidance strongly favours matching complexity to business value and using simpler workflows before complex autonomous systems. Source: https://www.anthropic.com/research/building-effective-agents |

## The big contrarian argument

The best first AI roles are **not the most human-sounding roles**.

They are the roles where work is:

- repetitive
- sourceable
- reviewable
- bounded
- painful enough to matter
- safe enough to delegate

That is why:

- “Market Researcher” beats “AI CEO”
- “Support Triage Assistant” beats “Autonomous Customer Success Director”
- “Product Spec Writer” beats “AI Head of Product”

Less theatre. More useful plumbing.

---

# 9. Source list

## OpenAI sources

1. **OpenAI — GPTs in ChatGPT**  
   URL: https://help.openai.com/en/articles/8554407-gpts-in-chatgpt  
   Why it matters: Explains Custom GPTs as configured versions of ChatGPT with instructions, knowledge, and capabilities.

2. **OpenAI — Creating and editing GPTs**  
   URL: https://help.openai.com/en/articles/9358033-key-guidelines-for-writing-instructions-for-custom-gpts  
   Why it matters: Useful for understanding practical GPT configuration, knowledge, actions, and testing.

3. **OpenAI Academy — Custom GPTs**  
   URL: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/custom-gpts  
   Why it matters: Explicitly frames Custom GPTs as repeatable workflow assistants for writing, analysis, visuals, and consistency.

4. **OpenAI — Workspace agents in ChatGPT**  
   URL: https://openai.com/index/introducing-workspace-agents-in-chatgpt/  
   Why it matters: Evidence that GPTs are evolving into shared agents for teams and longer-running workflows.

5. **OpenAI — ChatGPT agent**  
   URL: https://openai.com/index/introducing-chatgpt-agent/  
   Why it matters: Official positioning around research and action with tools.

6. **OpenAI — Codex**  
   URL: https://openai.com/codex/  
   Why it matters: Official source for coding agents completing engineering tasks end to end.

7. **OpenAI — Agents SDK docs**  
   URL: https://developers.openai.com/api/docs/guides/agents  
   Why it matters: Source for guardrails, handoffs, and human review in agent systems.

---

## Anthropic sources

8. **Anthropic — Agent Skills**  
   URL: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills  
   Why it matters: Explains Skills as packaged procedural knowledge for repeatable workflows.

9. **Anthropic — Complete Guide to Building Skills for Claude**  
   URL: https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf  
   Why it matters: Practical source on repeatable workflows and skill packaging.

10. **Anthropic — Claude Projects**  
    URL: https://www.anthropic.com/news/projects  
    Why it matters: Source for project-specific context and role-specific instructions.

11. **Anthropic — Building Effective Agents**  
    URL: https://www.anthropic.com/research/building-effective-agents  
    Why it matters: Important guardrail against overcomplicated agent architectures.

12. **Claude Code — Subagents docs**  
    URL: https://code.claude.com/docs/en/agent-sdk/subagents  
    Why it matters: Evidence for specialised subagents and isolated context.

---

## Zapier sources

13. **Zapier — AI agents for business automation**  
    URL: https://zapier.com/blog/ai-agents-for-business/  
    Why it matters: Practical business automation examples across roles.

14. **Zapier — AI agent examples**  
    URL: https://zapier.com/blog/ai-agents-examples/  
    Why it matters: Real-team examples and workflow framing.

15. **Zapier — Zapier Agents guide**  
    URL: https://zapier.com/blog/zapier-agents-guide/  
    Why it matters: Source for no-code agents connected to business apps.

---

## n8n sources

16. **n8n — workflow library**  
    URL: https://n8n.io/workflows/  
    Why it matters: Evidence of a large public ecosystem of automation templates.

17. **n8n — sales workflows**  
    URL: https://n8n.io/workflows/categories/sales/  
    Why it matters: Evidence that sales automation is one of the largest workflow categories.

18. **n8n — AI lead research and qualification**  
    URL: https://n8n.io/workflows/9101-ai-powered-lead-research-and-qualification-using-relevance-ai/  
    Why it matters: Concrete lead research/qualification template.

19. **n8n — AI sales assistant with GPT and Claude**  
    URL: https://n8n.io/workflows/9026-ai-sales-assistant-with-gpt-and-claude-qualify-leads-book-meetings/  
    Why it matters: Lead qualification and meeting booking workflow.

20. **n8n — market research assistant**  
    URL: https://n8n.io/workflows/12236-run-ai-powered-market-research-with-groq-openai-documentero-and-gmail/  
    Why it matters: Multi-agent market research workflow.

21. **n8n — competitor analysis reports**  
    URL: https://n8n.io/workflows/6580-generate-ai-powered-competitor-analysis-reports-with-gpt-4-apify-and-google-docs/  
    Why it matters: Multi-agent competitor and market research workflow.

22. **n8n — PRD and test scenario generation**  
    URL: https://n8n.io/workflows/8073-generate-prds-and-test-scenarios-with-gptclaude-and-pdf-export/  
    Why it matters: Product spec generation workflow.

23. **n8n — recursive writing and editing agents**  
    URL: https://n8n.io/workflows/3503-generate-written-content-with-gpt-recursive-writing-and-editing-agents/  
    Why it matters: Evidence for writer/editor multi-agent loops.

24. **n8n — invoice agent**  
    URL: https://n8n.io/workflows/7905-ai-invoice-agent/  
    Why it matters: Finance/admin automation example.

25. **n8n — invoice approval flow**  
    URL: https://n8n.io/workflows/4452-automated-pdf-invoice-processing-and-approval-flow-using-openai-and-google-sheets/  
    Why it matters: Finance automation with human approval.

26. **n8n — knowledge-base/RAG agent**  
    URL: https://n8n.io/workflows/6538-company-knowledge-base-agent-rag/  
    Why it matters: Documentation and internal support assistant example.

---

## Lindy sources

27. **Lindy — executive assistant**  
    URL: https://docs.lindy.ai/  
    Why it matters: Meeting, inbox, calendar, and follow-up automation.

28. **Lindy — sales solution**  
    URL: https://www.lindy.ai/solutions/sales  
    Why it matters: Sales agents for lead lists, outreach, coaching, CRM updates.

29. **Lindy — meeting prep assistant**  
    URL: https://www.lindy.ai/templates/meeting-prep-assistant  
    Why it matters: Dedicated meeting preparation template.

30. **Lindy — recruiting agent**  
    URL: https://www.lindy.ai/templates/recruiting-agent-1-recruiting-agent  
    Why it matters: Recruiting/talent discovery template.

31. **Lindy — learning assistant**  
    URL: https://www.lindy.ai/templates/ai-learning-assistant  
    Why it matters: Example of learning/tutor style agent.

---

## Relevance AI sources

32. **Relevance AI — agent marketplace**  
    URL: https://marketplace.relevanceai.com/  
    Why it matters: Broad evidence of productised agent templates across sales, marketing, support, and operations.

33. **Relevance AI — BDR agent docs**  
    URL: https://relevanceai.com/docs/build/agents/agent-examples/bosh-bdr-agent  
    Why it matters: Detailed sales development agent example.

34. **Relevance AI — Sales Researcher**  
    URL: https://marketplace.relevanceai.com/agents/sales-researcher  
    Why it matters: Sourced B2B brief agent.

35. **Relevance AI — Outbound BDR Agent**  
    URL: https://relevanceai.com/blog/outbound-bdr-agent-how-relevance-ai-automates-sales-research-and-outreach  
    Why it matters: Demonstrates automated sales research and outreach.

36. **Relevance AI — Competitive Intelligence Agent**  
    URL: https://marketplace.relevanceai.com/listing/90093b11-abf5-4f20-b0ac-267efd698669  
    Why it matters: Competitor monitoring and battlecard agent.

37. **Relevance AI — AI Data Analyst agents**  
    URL: https://marketplace.relevanceai.com/use-cases/ai-data-analyst  
    Why it matters: Evidence for data analyst agent templates.

38. **Relevance AI — Technical Documentation Generator**  
    URL: https://marketplace.relevanceai.com/agents/technical-documentation-generator  
    Why it matters: Documentation assistant evidence.

39. **Relevance AI — Recruitment Screening Agent**  
    URL: https://marketplace.relevanceai.com/agents/recruitment-screening-agent  
    Why it matters: Recruiting automation example.

---

## Coding agent sources

40. **GitHub Docs — Copilot coding agent delegation**  
    URL: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca  
    Why it matters: Official evidence for delegating coding tasks to Copilot.

41. **GitHub Blog — Copilot coding agent 101**  
    URL: https://github.blog/ai-and-ml/github-copilot/github-copilot-coding-agent-101-getting-started-with-agentic-workflows-on-github/  
    Why it matters: Practical guidance on agentic coding workflows.

42. **GitHub Docs — custom agents**  
    URL: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents  
    Why it matters: Evidence for custom coding, review, documentation, and security-style agents.

43. **Cursor — Agent best practices**  
    URL: https://cursor.com/blog/agent-best-practices  
    Why it matters: Official/practitioner guidance on using Cursor Agent with instructions, tools, and models.

44. **Replit Docs — build and publish first app**  
    URL: https://docs.replit.com/build/your-first-app  
    Why it matters: Evidence for AI-assisted app building and publishing.

45. **Developer Toolkit — Cursor documentation workflows**  
    URL: https://developertoolkit.ai/en/cursor-ide/lessons/documentation/  
    Why it matters: Evidence for documentation workflows inside AI coding tools.

---

## Customer support and feedback sources

46. **Zendesk — intelligent triage workflows**  
    URL: https://support.zendesk.com/hc/en-us/articles/5222280338202-Intelligent-triage-use-cases-and-workflows  
    Why it matters: Support triage source with classification by topic, sentiment, language, and entities.

47. **Postman — customer ticket triage agent**  
    URL: https://www.postman.com/templates/agents/customer-ticket-triage-agent/  
    Why it matters: Support triage template with vector search, replies, and routing.

48. **Nubank customer support AI agents paper**  
    URL: https://arxiv.org/abs/2606.08867  
    Why it matters: Production-scale evidence for support agents and evaluation-driven development.

49. **Dovetail AI Analysis**  
    URL: https://dovetail.com/product/ai-analysis/  
    Why it matters: User research and feedback synthesis source.

50. **Fivetran product feedback AI platform**  
    URL: https://www.fivetran.com/blog/how-our-product-team-uses-ai-to-manage-customer-feedback-at-scale  
    Why it matters: Real company example of AI agents for customer feedback intelligence.

51. **Pluggin — customer interview synthesis workflow**  
    URL: https://www.pluggin.ai/workflows/customer-interview-synthesis  
    Why it matters: Practical customer interview synthesis workflow.

---

## Founder, solopreneur, and executive examples

52. **Business Insider — solopreneurs using AI**  
    URL: https://www.businessinsider.com/wielding-the-power-of-ai-how-solopreneurs-streamline-their-workflow-2026-1  
    Why it matters: Real examples of solo business owners using AI for strategy docs, content, and workflow relief.

53. **Business Insider — solopreneurs using AI for content efficiency**  
    URL: https://www.businessinsider.com/solopreneurs-use-ai-to-boost-content-creation-efficiency-2026-2  
    Why it matters: Real-world evidence for content and workflow leverage.

54. **Fortune — solo founders using AI automation**  
    URL: https://fortune.com/2026/05/18/solo-founders-ai-automation-entire-teams-entrepreneurs/  
    Why it matters: Evidence of founders automating workflows previously requiring hires.

55. **Business Insider — founder with 9 AI employees**  
    URL: https://www.businessinsider.com/openclaw-ai-employee-startup-tech-automation-agents-personalized-work-home-2026-4  
    Why it matters: Real-world “AI org chart” style example, with progressive trust caveats.

56. **Lenny’s Newsletter — Webflow CPO AI chief of staff**  
    URL: https://www.lennysnewsletter.com/p/how-webflows-cpo-built-an-ai-chief  
    Why it matters: Real executive use case for calendar/email/meeting prep style personal software.

57. **Axios C-Suite — AI-powered version of you**  
    URL: https://www.axios.com/2026/04/13/claude-project-chatgpt-custom-gpt-tips  
    Why it matters: Executive custom GPT / Claude Project use cases including premortems and briefings.

58. **Coconut Consulting — AI sparring partner framework**  
    URL: https://coconutconsulting.ai/your-toughest-critic-should-be-in-your-pocket-the-ai-sparring-partner-framework/  
    Why it matters: Practitioner framing for AI as a strategy challenger.

---

## Risk and evaluation sources

59. **AI agent hallucination survey**  
    URL: https://arxiv.org/abs/2509.18970  
    Why it matters: Risk evidence for hallucinations in LLM-based agents.

60. **GitHub Copilot code review security study**  
    URL: https://arxiv.org/abs/2509.13650  
    Why it matters: Evidence that AI code review can miss security flaws.

61. **ITPro — AI agents in customer service concerns**  
    URL: https://www.itpro.com/technology/artificial-intelligence/ai-agents-arent-cutting-it-in-customer-service  
    Why it matters: Useful counterweight against overhyping customer-service agents.

---

# 10. Final synthesis for the eventual Substack article

## Strongest thesis

The new AI org chart should not start with “an AI CEO” or “an autonomous AI employee”.

It should start with **bounded AI roles** that:

- reduce repeated cognitive labour
- turn messy context into structured output
- help a small team act larger
- keep humans responsible for judgement
- are easy to review
- are useful even before full automation

## Recommended final list of 8 roles

1. **The Market Researcher**
2. **The Customer Insight Analyst**
3. **The Content Operator**
4. **The Sales Research Assistant**
5. **The Support Triage Assistant**
6. **The Product Spec Writer**
7. **The Coding Partner**
8. **The Ops / Meeting Prep Assistant**

## Supporting angle

Each AI role should be framed as:

- what human function it partially augments
- what job it can realistically do today
- what context it needs
- what failure mode to watch
- when a human should still be hired

## Best contrarian line

**The first AI roles worth hiring are not the ones that sound most like executives. They are the ones that handle the unglamorous, repeatable work that blocks founders from doing the real work.**
