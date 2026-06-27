# Tool-native AI roles, agents, assistants, skills, workflows, and automations

Accessed: **22 June 2026**

This research treats the matrix conservatively: **“supported” means an official source was found**. Community repositories, templates, and blog posts are treated as examples of practice, not proof of official capability.

---

## 1. Executive summary

- **Reusable AI roles are already easy to build**, but the easiest version is usually not a fully autonomous “agent”. It is a persistent assistant with instructions, context, and a narrow tool scope. Claude Projects, ChatGPT Projects, Custom GPTs, Claude Skills, Cursor Rules, and Codex `AGENTS.md` all fit this pattern.

  Source: https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects

- **Coding is the most mature agent-native domain today.** Claude Code, OpenAI Codex, GitHub Copilot cloud agent, Cursor, and Replit Agent all support practical “delegate work → inspect changes → review PR” loops. This is not magic; it is software engineering with a very enthusiastic intern and better syntax highlighting.

  Source: https://code.claude.com/docs/en/features-overview

- **Low-code tools are strongest for operational agents.** n8n, Zapier, Make, Lindy, and Relevance AI make it easier to connect email, CRM, Slack, support tools, calendars, forms, and databases. That makes them good for sales triage, customer support triage, operations monitoring, and chief-of-staff style workflows.

  Source: https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/

- **Human approval is becoming a first-class design pattern**, but it is unevenly implemented. n8n, Make, Relevance AI, LangGraph, CrewAI, GitHub Copilot cloud agent, and Claude Code have explicit approval, permission, interrupt, hook, or review mechanisms. For several tools, approval exists only as a workflow pattern rather than a native agent feature.

  Source: https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/

- **The public ecosystem is moving towards “agent libraries”.** Examples include Claude Code subagent libraries, Cursor rule libraries, Custom GPTs in the GPT Store, n8n workflow templates, Make’s Library of Agents, Lindy templates, Relevance AI marketplace/workforces, and framework examples in CrewAI, AutoGen, and LangGraph.

  Source: https://github.com/VoltAgent/awesome-claude-code-subagents

- **The emerging implementation pattern is not “one giant AI employee”.** It is more often: persistent context, specialised roles, scoped tools, deterministic workflow steps, human approval gates, and logging. The “AI org chart” metaphor works best if each role has a job description, tools, escalation rules, and a manager. Annoyingly similar to humans, then.

- **The easiest roles today are research analyst, content assistant, coding partner, QA reviewer, meeting-prep assistant, and lightweight data analyst.** They need instructions, examples, files, web access, and maybe read-only connectors. They do not need deep infrastructure.

- **The harder roles are autonomous sales, support, finance, operations, and personal chief-of-staff agents.** They need real system access, persistent memory, audit logs, CRM/email/calendar permissions, browser automation, human approvals, and evaluation harnesses.

- **Multi-agent orchestration is real, but should not be the default.** LangGraph, AutoGen, CrewAI, Relevance AI Workforces, Claude Code subagents, and OpenAI Agents SDK support multi-agent patterns. They are useful when there is genuine decomposition, tool separation, or review. Otherwise, a single well-scoped assistant is cheaper and less fragile.

  Source: https://microsoft.github.io/autogen/stable/index.html

---

## 2. Tool capability matrix

Legend:

- **Official** = confirmed in official documentation or product page.
- **Partial** = supported indirectly or only for a narrower use case.
- **Unclear** = no reliable official source was found confirming it.
- **Beta/preview** = explicitly described as beta or preview.

| Tool | Reusable roles support | Memory / context support | Tools / connectors support | Automation support | Human approval support | Source URL |
|---|---|---|---|---|---|---|
| **Claude Projects** | **Official.** Project instructions can define persistent role behaviour. | **Official.** Project knowledge can store docs, text, and code snippets; paid plans can use RAG mode for large knowledge bases. | **Partial.** Claude supports connectors, but Projects themselves are mainly a workspace/context mechanism. | **Unclear / not native from retrieved docs.** | **Unclear / not native from retrieved docs.** | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects |
| **Claude Skills** | **Official.** Skills package reusable instructions, workflows, and sometimes executable code. | **Partial.** Skill content is loaded when relevant; not the same as long-term memory. | **Partial.** Skills can include files/code, but external tool access depends on environment. | **Not by themselves.** Skills are reusable capabilities, not schedulers. | **Unclear / not native from retrieved docs.** | https://claude.com/docs/skills/how-to |
| **Claude Code** | **Official.** Supports `CLAUDE.md`, Skills, subagents, plugins, hooks, and MCP. | **Official.** Supports persistent instructions, auto memory, and subagent-scoped memory. | **Official.** Built-in tools, MCP servers, hooks, plugins, shell/file/search capabilities. | **Partial / official.** Hooks, background subagents, and agent-team patterns exist; general scheduling depends on surrounding setup. | **Official.** Permission modes, tool allowlists, hooks, and blocking `PreToolUse` patterns. | https://code.claude.com/docs/en/features-overview |
| **Claude Code subagents** | **Official.** Specialised subagents with descriptions, prompts, tools, and permission modes. | **Official.** Subagents have isolated context and can use scoped memory directories. | **Official.** Subagents can have tool access, permission rules, and hooks. | **Partial.** Background subagents exist, but prompts requiring permission can be auto-denied in background. | **Official.** Permission prompts, allowlists, and hooks can gate behaviour. | https://code.claude.com/docs/en/sub-agents |
| **ChatGPT Projects** | **Official.** Project instructions define behaviour across chats in a workspace. | **Official.** Projects group chats, files, custom instructions, memory/context, and tools. | **Official / partial.** ChatGPT apps/connectors can connect to external tools and data, depending on plan and connector. | **Partial.** Scheduled Tasks exist in ChatGPT, but are separate from Projects as a general product feature. | **Unclear / not native from retrieved docs.** | https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt |
| **Custom GPTs** | **Official.** GPTs are purpose-configured versions of ChatGPT with instructions, knowledge, and capabilities. | **Official / partial.** Knowledge files and instructions are supported; memory behaviour depends on ChatGPT settings/product scope. | **Official.** GPT Actions connect GPTs to external APIs. | **Limited.** Scheduled Tasks are not a Custom GPT-native mechanism in the retrieved docs. | **Partial.** Actions can use auth and workspace controls, but explicit approval gates are implementation-specific. | https://help.openai.com/en/articles/8554407-create-a-custom-gpt |
| **OpenAI Codex** | **Official.** Repository instructions via `AGENTS.md`; Codex can be delegated coding tasks. | **Official / partial.** Uses repo context, environment config, and instruction files. | **Official.** Cloud environment, tests, shell commands, GitHub/IDE workflows, configurable internet access. | **Partial.** Can be invoked from IDE, GitHub issues/PRs, and cloud tasks; scheduling requires external workflow. | **Official / practical.** Human reviews diffs, branches, and PRs before merge. | https://developers.openai.com/codex/cloud |
| **OpenAI Agents SDK** | **Official.** Agent definitions, handoffs, guardrails, sessions, and multi-step orchestration. | **Official / partial.** Sessions, sandbox/resumable execution, and vector-store/FileSearch tools exist. | **Official.** Hosted tools include web search, file search, code interpreter, MCP, image generation, and function tools. | **Partial.** Good for building agent applications; scheduling and event triggers are usually supplied by the app/infrastructure. | **Official.** Guardrails, tracing, handoffs, and human-review patterns are documented. | https://openai.github.io/openai-agents-python/ |
| **Cursor** | **Official / partial.** Official docs cover Agent mode, Rules, Skills, MCP, and `AGENTS.md`, though retrieved page content was limited. | **Official / partial.** Cursor Rules support project/team/user-level persistent instructions. | **Official / partial.** MCP support appears in official docs search result. | **Partial / unclear.** Background agents are discussed publicly, but I would avoid treating them as fully sourced from the retrieved official docs. | **Unclear.** Human review is usually through code review/PR practice, not necessarily a native approval gate. | https://cursor.com/docs/rules |
| **Windsurf / Cascade** | **Official.** Rules configure persistent behaviour. | **Official.** Memories and rules persist context across conversations and workspaces. | **Unclear from retrieved official docs.** | **Unclear from retrieved official docs.** | **Unclear from retrieved official docs.** | https://docs.devin.ai/windsurf/plugins/cascade/memories |
| **GitHub Copilot cloud agent** | **Official.** Supports specialised custom agents such as frontend, documentation, and testing agents. | **Official / preview.** Custom instructions and Copilot Memory public preview. | **Official.** GitHub Actions environment, MCP servers, GitHub MCP, Playwright MCP. | **Official.** Can be delegated through issues, PRs, VS Code, schedules, events, and security alerts. | **Official.** Review diffs, iterate, and create PRs before accepting changes. | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent |
| **Replit Agent** | **Official.** Can build agents, chatbots, and automated workflows. | **Unclear from retrieved official docs.** | **Official.** Integrations include Linear, Jira, Gmail, Slack, Discord, Outlook, Notion, GitHub, and more. | **Official.** Slack Agent, Telegram Agent, Timed Automation; webhook triggers listed as coming soon. | **Unclear from retrieved official docs.** | https://docs.replit.com/references/agent/automations |
| **n8n** | **Official.** AI agent workflows and templates. | **Partial.** Context can be supplied through workflow data; memory details depend on node configuration. | **Official.** Large integration surface, LLMs, data sources, MCP, and other agents. | **Official.** Triggered workflows, scheduled workflows, and agent workflows. | **Official.** Human-in-the-loop tool approvals pause workflows before gated actions. | https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/ |
| **Zapier Agents** | **Official.** Custom AI teammates / specialised agents. | **Official.** Company knowledge can be connected. | **Official.** 9,000+ apps. | **Official.** Agents can work “on command” and while inactive. | **Unclear from retrieved official docs.** | https://zapier.com/agents |
| **Make AI Agents** | **Official.** Reusable agents inside Make workflows. | **Official / partial.** Agents use business context and show reasoning. | **Official.** 3,000+ apps; can trigger workflows. | **Official.** Visual canvas, reusable blocks, and AI Agents API in open beta. | **Official.** Manual approvals and stop points are explicitly mentioned. | https://www.make.com/en/ai-agents |
| **Lindy** | **Official / partial.** Templates provide pre-built workflows as starting points for custom agents. | **Unclear from retrieved official docs.** | **Unclear from retrieved official docs.** | **Partial.** Templates cover email, sales, support, and workflow use cases; exact trigger model not fully sourced here. | **Unclear from retrieved official docs.** | https://docs.lindy.ai/fundamentals/lindy-101/templates |
| **Relevance AI** | **Official.** Low/no-code agents and multi-agent teams/workforces. | **Official.** Knowledge/RAG from files, Google Drive, SharePoint, Notion, websites. | **Official.** Tools include email, CRM, web search, APIs, and custom tools. | **Official.** Triggers, integrations, API, UI, and workforces. | **Official.** Human oversight, approvals, guardrails, escalation. | https://relevanceai.com/docs/get-started/introduction |
| **CrewAI** | **Official.** Agents with roles, goals, backstories, tools, delegation, crews, and flows. | **Official.** Memory and knowledge are supported in agent/crew configuration. | **Official.** Tools and integrations are part of the framework. | **Partial.** Good for orchestrated workflows; scheduling/deployment is infrastructure-dependent. | **Official.** Human-in-the-loop and `human_input` patterns are documented. | https://docs.crewai.com/ |
| **AutoGen** | **Official.** Single-agent and multi-agent applications via AgentChat/Core; Studio for prototyping. | **Partial.** Framework-level context/state depends on implementation. | **Official.** Extensions include MCP, Docker command execution, OpenAI agents, gRPC runtimes. | **Official / partial.** Event-driven multi-agent workflows; scheduling is app/infrastructure-dependent. | **Official / partial.** Handoff termination supports user input / human intervention patterns. | https://microsoft.github.io/autogen/stable/index.html |
| **LangGraph** | **Official.** Workflows, agents, handoffs, supervisor-style orchestration. | **Official.** Persistence, checkpointers, stores, short-term and long-term memory. | **Official / partial.** Agents dynamically choose tools; broader tool layer comes through LangChain ecosystem. | **Official / partial.** Durable workflows; scheduling/event triggers usually supplied externally. | **Official.** Interrupts pause execution and wait for external human input. | https://docs.langchain.com/oss/python/langgraph/workflows-agents |

---

## 3. Public examples and templates

| Tool | Example name | Role / use case | Source URL | Why it matters |
|---|---|---|---|---|
| **Claude Code** | Awesome Claude Code Subagents | Libraries of specialised coding agents: reviewers, frontend agents, backend agents, DevOps agents, security reviewers. | https://github.com/VoltAgent/awesome-claude-code-subagents | Community evidence that users are treating subagents as reusable “role files” that can be installed globally or per project. |
| **Cursor** | Awesome Cursor Rules | Reusable coding rules, project conventions, framework-specific behaviours. | https://github.com/tugkanboz/awesome-cursorrules | Shows the “agent persona as repo config” pattern: instructions live near the code, not in a random prompt graveyard. |
| **Custom GPTs** | GPT Store | Public directory of GPTs across writing, research, programming, education, lifestyle, and more. | https://openai.com/index/introducing-the-gpt-store/ | Official public marketplace for reusable assistant roles. OpenAI said users had created over 3 million custom GPTs at launch. |
| **Custom GPT Actions** | OpenAI Cookbook GPT Actions Library | GPTs connected to GitHub, Gmail, Google Calendar, Google Drive, Jira, Notion, Salesforce, Snowflake, Zapier, and others. | https://github.com/openai/openai-cookbook/tree/main/examples/chatgpt/gpt_actions_library | Shows how a GPT role becomes operational once it can call external APIs. |
| **n8n** | n8n Workflow Templates | AI workflows, Slack agents, automations, integrations. | https://n8n.io/workflows/ | n8n’s template library turns agents into copyable operational patterns, not just conceptual demos. |
| **Make** | Make Library of Agents | Ready-made AI agents that can be deployed and adapted. | https://www.make.com/en/ai-agents | Good example of low-code agents as reusable workflow building blocks. |
| **Lindy** | Lindy Template Library | Email automation, sales, support, industry workflows. | https://docs.lindy.ai/fundamentals/lindy-101/templates | Shows how non-technical users can start from prebuilt agent workflows rather than blank-canvas orchestration. |
| **Relevance AI** | Marketplace / Workforces | Prebuilt agents, tools, workforces, knowledge-connected assistants. | https://relevanceai.com/docs/get-started/introduction | One of the clearer examples of “agent teams” as a product abstraction for business users. |
| **Relevance AI** | Agent Skills repo | Managing Relevance AI agents, prompts, tools, triggers, memory, conversations. | https://github.com/RelevanceAI/agent-skills/blob/main/reference/managing-relevance-agents/SKILL.md | Useful community/product-adjacent example of “skills for managing agents”, including triggers, memory, and tool configuration. |
| **CrewAI** | CrewAI examples / cookbooks | Role-playing agents, crews, flows, enterprise automations. | https://docs.crewai.com/ | Shows the coded-framework version of reusable roles: agents have role, goal, tools, memory, and task definitions. |
| **AutoGen** | AutoGen Studio | Web UI for prototyping agents without writing code. | https://microsoft.github.io/autogen/stable/index.html | Useful bridge between low-code prototyping and coded multi-agent systems. |
| **LangGraph** | Workflows and agents docs | Agent orchestration, workflows, interrupts, persistence, memory. | https://docs.langchain.com/oss/python/langgraph/workflows-agents | Shows the production-engineering version: explicit state, graph transitions, persistence, and human interrupts. |

---

## 4. Easiest AI roles to build today

### 1. Content assistant / editor

**Ease: very high.**

This is probably the easiest “AI hire” for a solopreneur, newsletter writer, founder, or manager. It needs a style guide, examples, audience notes, and a clear job: brainstorm, outline, critique, rewrite, or repurpose.

Best fits:

- ChatGPT Projects
- Claude Projects
- Custom GPTs
- Claude Skills

If publishing workflows are involved, connect to:

- Zapier
- Make
- n8n
- Lindy

What it requires:

- Persistent instructions.
- Example posts, voice notes, brand guidelines.
- Clear boundaries: draft, critique, summarise, or repurpose.
- Human review before publication.

---

### 2. Research analyst

**Ease: high.**

A research analyst agent can gather sources, compare claims, produce dossiers, and track themes. The main challenge is not tooling; it is source discipline.

Best fits:

- ChatGPT Projects
- Claude Projects
- Custom GPTs
- Claude Code / Claude Skills for repeatable research workflows
- n8n / Zapier / Make for monitoring

What it requires:

- Web access or connected knowledge sources.
- Citation rules.
- A repeatable output format.
- Human verification for important claims.

---

### 3. Coding partner

**Ease: high for technical builders.**

This is one of the most mature categories. Codex, Claude Code, GitHub Copilot cloud agent, Cursor, and Replit Agent all support practical coding loops where the AI inspects a repo, proposes changes, runs tests, and produces diffs or PRs.

Source: https://developers.openai.com/codex/cloud

What it requires:

- A repo with tests.
- Clear `AGENTS.md`, `CLAUDE.md`, Cursor Rules, or equivalent.
- Branch/PR workflow.
- CI checks.
- Human review before merge.

---

### 4. QA reviewer / code reviewer

**Ease: high.**

This is easier than a full coding agent because the role is narrower: inspect changes, detect risk, check tests, review edge cases, compare implementation to spec.

Best fits:

- Claude Code subagents
- GitHub Copilot custom agents
- Codex
- Cursor
- CrewAI / LangGraph for custom setups

What it requires:

- Review checklist.
- Access to diffs.
- Test output.
- Clear severity levels.
- No autonomous merge permissions.

---

### 5. Meeting-prep assistant

**Ease: medium-high.**

This becomes useful quickly if it can access calendar, email, docs, Slack, or CRM notes. Without connectors, it is still useful but more manual.

Best fits:

- ChatGPT with connectors
- Claude with connectors
- Zapier Agents
- Lindy
- Relevance AI
- n8n
- Make

Claude’s connector docs list integrations including Google Drive, Gmail, Google Calendar, GitHub, Slack, and Microsoft 365.

Source: https://claude.com/docs/connectors/overview

What it requires:

- Calendar access.
- Relevant documents or email threads.
- A meeting brief template.
- Privacy boundaries.

---

### 6. Lightweight data analyst

**Ease: medium.**

Easy if the data is uploaded as a CSV or spreadsheet. Harder when the agent needs database access, semantic definitions, metric governance, or write permissions.

Best fits:

- ChatGPT Projects
- Claude Projects
- Custom GPTs
- OpenAI Agents SDK
- LangGraph
- n8n
- Relevance AI

What it requires:

- Data dictionary.
- Metric definitions.
- Read-only access.
- Query validation.
- Reproducible notebook or report output.

---

### 7. Customer support triage assistant

**Ease: medium.**

Triage is easier than fully autonomous support. The agent can classify tickets, propose responses, detect urgency, route to the right queue, and summarise customer history.

Best fits:

- Relevance AI
- Lindy
- n8n
- Zapier
- Make

What it requires:

- Helpdesk access.
- Product documentation.
- Escalation rules.
- Human approval for outbound replies.
- Logging and quality review.

---

### 8. Sales assistant

**Ease: medium to hard.**

Sales agents become harder because they touch CRM data, email, calendars, lead enrichment, account notes, and potentially external messaging. The risk of one awkward automated message is high.

Best fits:

- Zapier Agents
- Relevance AI
- Lindy
- Make
- n8n

What it requires:

- CRM access.
- Lead qualification rules.
- Email/calendar tools.
- Human approval before outreach.
- Clear opt-out and compliance handling.

---

### 9. Operations monitor

**Ease: medium to hard.**

This is a good role, but it needs triggers, logs, thresholds, and escalation logic. The LLM should interpret and summarise, not be the only thing deciding whether the building is on fire.

Best fits:

- n8n
- Make
- Replit Agent
- Zapier
- Relevance AI
- LangGraph

What it requires:

- Scheduled or event triggers.
- Access to dashboards, logs, tickets, or databases.
- Deterministic guardrails.
- Escalation channels.
- Audit trail.

---

## 5. Roles requiring more infrastructure

### Autonomous SDR / sales outreach agent

Hard because it needs:

- CRM access.
- Lead enrichment.
- Email permissions.
- Calendar permissions.
- Account memory.
- Brand voice.
- Compliance rules.
- Approval checkpoints.

A safe first version is not “send emails automatically”. It is:

1. Enrich lead.
2. Draft message.
3. Explain why.
4. Ask for approval.

---

### Customer support agent that sends replies

Hard because support combines:

- Customer history.
- Product facts.
- Refund policies.
- Tone.
- Legal constraints.
- Escalation logic.

A safe first version is triage plus draft replies. Autonomous replies should start with low-risk categories only.

---

### Personal chief of staff

Hard because this role touches almost everything:

- Email.
- Calendar.
- Docs.
- Tasks.
- Slack.
- CRM.
- Private notes.
- Memory.

The infrastructure problem is not only technical. It is also permission design:

- What can the agent read?
- What can it change?
- What must it never do?

---

### Finance / invoice / expense agent

Hard because the agent needs:

- ERP/accounting access.
- Policy interpretation.
- Fraud checks.
- Audit logs.
- Human approval.

For this category, deterministic rules should do most of the work. The LLM can explain exceptions and prepare review packets.

---

### Data analyst with database write access

Read-only analysis is manageable. Write access is a different beast entirely.

This needs:

- Query sandboxing.
- Schema permissions.
- Row-level access.
- Validation.
- Rollback.
- Logging.
- Approval.

LangGraph, OpenAI Agents SDK, n8n, and Relevance AI can help orchestrate this, but they do not remove the need for governance.

---

### Browser automation agent

Browser agents are powerful but fragile. They depend on:

- Web UI stability.
- Session authentication.
- Screenshots.
- DOM structure.
- CAPTCHAs.
- Error recovery.

They are useful for repetitive internal workflows, but they need monitoring. Otherwise you have effectively hired a very fast intern who occasionally clicks the wrong button with confidence.

---

### Production coding agent that merges code

Coding agents are mature, but autonomous merge is still high risk.

The safer loop is:

1. Agent creates branch.
2. Agent runs tests.
3. Agent opens PR.
4. Human reviews.
5. CI passes.
6. Human merges.

GitHub Copilot cloud agent and Codex fit this review-based pattern well.

Source: https://docs.github.com/copilot/using-github-copilot/coding-agent/about-assigning-tasks-to-copilot

---

### Company memory / internal research librarian

Hard because memory must be:

- Fresh.
- Permission-aware.
- Source-attributed.
- Searchable.
- Correct enough to trust.

This often needs:

- RAG system.
- Vector database.
- Document sync.
- Access control.
- Evaluation.

Otherwise you just create a confident internal rumour machine. Very enterprise, very cursed.

---

## 6. Suggested implementation patterns for the article

### For solopreneurs: one strong assistant plus a few reusable templates

Start with **one general assistant** inside ChatGPT Projects or Claude Projects.

Give it:

- Your business context.
- Your audience.
- Your tone.
- Your current goals.
- Your most common workflows.

Then create reusable prompts or Custom GPTs for specific jobs:

- Research analyst.
- Content editor.
- Sales-draft assistant.
- Customer-response drafter.

This is the lowest-friction version of the “AI org chart”.

---

### For founders: specialised assistants with tool scopes

Founders benefit from **several specialised assistants**, but each should have a bounded job.

Good first roles:

- Market research analyst.
- Customer discovery summariser.
- Investor update drafter.
- Sales follow-up assistant.
- Product spec assistant.
- Hiring scorecard assistant.

The key pattern is: each assistant gets **only the tools it needs**.

The sales assistant does not need repo access. The coding assistant does not need payroll data. Revolutionary, I know.

---

### For managers: chief-of-staff lite plus meeting/review assistants

Managers should start with assistants that reduce coordination drag:

- Meeting-prep assistant.
- 1:1 notes organiser.
- Weekly update summariser.
- Decision log maintainer.
- Hiring packet reviewer.
- Project risk monitor.

These roles are more useful when connected to:

- Calendar.
- Docs.
- Slack.
- Email.

They also need strict privacy boundaries, because management context tends to contain sensitive information.

---

### For technical builders: repo-native agent team

Technical builders can adopt a more structured setup:

- `AGENTS.md` or `CLAUDE.md` for repo-wide instructions.
- Cursor Rules or equivalent for coding standards.
- Claude Code subagents for code review, testing, documentation, migration, and debugging.
- Codex or Copilot cloud agent for PR-sized tasks.
- LangGraph, AutoGen, CrewAI, or OpenAI Agents SDK for custom multi-agent applications.

This is where the “AI org chart” becomes closest to a real operating system: different agents, different scopes, different tools, and review gates.

---

### For operational teams: workflow-first, LLM-second

For operations, the best pattern is usually not “give the agent everything and hope”.

Use deterministic workflow tools first:

1. Trigger happens.
2. Fetch relevant data.
3. Apply rules.
4. Ask LLM to classify, summarise, or draft.
5. Send to human approval if risky.
6. Execute only after approval.
7. Log the outcome.

This is where n8n, Make, Zapier, Relevance AI, Lindy, and Replit Agent are strongest. n8n and Make both explicitly support human approval patterns for risky actions.

Source: https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/

---

## 7. Risks and caveats

### Tool lock-in

Most reusable-role systems are proprietary:

- Custom GPTs.
- Claude Skills.
- Claude Projects.
- Relevance AI Workforces.
- Make Agents.
- Zapier Agents.
- Lindy templates.

Mitigation: keep the core role definition in portable Markdown where possible.

Store:

- Role purpose.
- Instructions.
- Examples.
- Inputs/outputs.
- Tool permissions.
- Escalation rules.
- Evaluation checklist.

Then adapt that role into each tool.

---

### Privacy and permissions

The more useful the agent, the more sensitive the data it wants.

Email, calendar, CRM, Slack, Google Drive, GitHub, and databases all carry different permission risks.

Official connector docs make these integrations easier, but easier access does not mean safer access.

Source: https://claude.com/docs/connectors/overview

Mitigation: apply least privilege.

Give the agent read-only access first. Require approval before sending, deleting, updating, merging, or publishing.

---

### Unreliable automation

Automating a bad judgement loop just makes the bad judgement faster.

For low-risk tasks, automation is fine.

For high-risk tasks, use human approval:

- Outbound communication.
- Database writes.
- Code merges.
- Finance actions.
- Customer-impacting decisions.

---

### Context drift

Persistent memory and project instructions are useful, but they can become stale.

Claude Code distinguishes persistent instructions and auto memory; ChatGPT Projects also bundle memory/context with project files and instructions.

Source: https://code.claude.com/docs/en/memory

Mitigation: review role instructions regularly.

Treat agent memory like documentation: useful when maintained, quietly dangerous when abandoned.

---

### Maintenance burden

Every agent becomes a small product.

It needs:

- A prompt.
- Tool configuration.
- Examples.
- Permissions.
- Tests.
- Updates.

Ten agents sounds delightful until you realise you now maintain ten slightly confused employees who cannot attend performance reviews.

---

### Evals and review

Coding-agent evidence remains mixed enough to justify caution.

A 2026 study of AI coding agents reported that a meaningful share of proposed fixes from tools such as Copilot, Devin, Cursor, and Claude were rejected for reasons such as incorrect implementation, incomplete fixes, test failures, or lost sessions.

Source: https://arxiv.org/abs/2606.13468

Mitigation:

- Use test suites.
- Use CI.
- Use PR review.
- Use golden-task evals.
- Keep logs.

OpenAI Agents SDK tracing, LangGraph persistence, GitHub PR workflows, and n8n/Make execution logs are useful because they make agent behaviour inspectable.

Source: https://openai.github.io/openai-agents-python/tracing/

---

### Prompt injection and unsafe workflows

Agentic workflows connected to tools can be attacked through instructions hidden in external data, templates, comments, issues, or pages.

A 2026 security paper on agentic workflows discusses risks such as hijacking automation through workflow content and connected tools.

Source: https://arxiv.org/abs/2605.11229

Mitigation:

- Isolate tools.
- Validate inputs.
- Avoid blindly executing instructions from external content.
- Place approval gates before irreversible actions.

---

## 8. Source list

Accessed: **22 June 2026**, unless otherwise noted.

### Claude / Anthropic

- https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects  
  Official Claude Projects documentation. Used for project instructions, project knowledge, and context behaviour.

- https://claude.com/docs/skills/how-to  
  Official Claude Skills documentation. Used for custom skills as reusable workflows and instruction packages.

- https://code.claude.com/docs/en/features-overview  
  Official Claude Code feature overview. Used for `CLAUDE.md`, Skills, subagents, hooks, MCP, plugins, tools, and extension layering.

- https://code.claude.com/docs/en/sub-agents  
  Official Claude Code subagents documentation. Used for specialised subagents, isolated context, permissions, tool access, hooks, and scoped memory.

- https://code.claude.com/docs/en/memory  
  Official Claude Code memory documentation. Used for persistent instructions and auto memory.

- https://claude.com/docs/connectors/overview  
  Official Claude connectors documentation. Used for first-party integrations including Google Drive, Gmail, Google Calendar, GitHub, Slack, and Microsoft 365.

- https://github.com/VoltAgent/awesome-claude-code-subagents  
  Community repository. Used only as an example of public Claude Code subagent libraries, not as proof of official features.

---

### OpenAI / ChatGPT / Codex

- https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt  
  Official ChatGPT Projects help page. Used for project instructions, files, memory/context, and workspace structure.

- https://help.openai.com/en/articles/8554407-create-a-custom-gpt  
  Official Custom GPT help page. Used for Custom GPTs as purpose-built versions of ChatGPT.

- https://help.openai.com/en/articles/9442513-configuring-actions-in-gpts  
  Official GPT Actions help page. Used for external API/tool integration from Custom GPTs.

- https://developers.openai.com/api/docs/actions/introduction  
  Official GPT Actions developer documentation. Used for GPTs connecting to third-party services through REST APIs.

- https://openai.com/index/introducing-the-gpt-store/  
  OpenAI announcement of the GPT Store, published 10 January 2024. Used for public GPT ecosystem and GPT categories.

- https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt  
  Official Scheduled Tasks help page. Used for one-off and recurring ChatGPT task automation.

- https://help.openai.com/en/articles/11487775-connectors-in-chatgpt  
  Official ChatGPT connectors/apps help page. Used for apps and external data connectors.

- https://developers.openai.com/codex/cloud  
  Official Codex cloud documentation. Used for coding task delegation, cloud environments, PR workflows, and GitHub/IDE integration.

- https://developers.openai.com/codex/guides/agents-md  
  Official Codex `AGENTS.md` guide. Used for repo-level persistent coding instructions.

- https://openai.github.io/openai-agents-python/  
  Official OpenAI Agents SDK documentation. Used for agents, handoffs, guardrails, sessions, and orchestration.

- https://openai.github.io/openai-agents-python/tracing/  
  Official Agents SDK tracing documentation. Used for observability and debugging.

- https://openai.github.io/openai-agents-python/tools/  
  Official Agents SDK tools documentation. Used for hosted tools such as web search, file search, code interpreter, MCP, and function tools.

- https://github.com/openai/openai-cookbook/tree/main/examples/chatgpt/gpt_actions_library  
  Official OpenAI Cookbook examples. Used as examples of GPT Actions integrations with services such as GitHub, Gmail, Calendar, Drive, Jira, Notion, Salesforce, Snowflake, and Zapier.

---

### Coding agents and IDEs

- https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent  
  Official GitHub Copilot cloud agent documentation. Used for background coding tasks, custom agents, schedules/events, MCP, memory preview, and PR review loops.

- https://cursor.com/docs  
  Official Cursor documentation entry point. Used cautiously for the existence of Agent mode, Rules, Skills, MCP, CLI, and team features, based on retrieved search result.

- https://cursor.com/docs/rules  
  Official Cursor Rules documentation. Used cautiously for persistent Project, Team, User Rules, and `AGENTS.md`, based on retrieved search result.

- https://github.com/tugkanboz/awesome-cursorrules  
  Community repository. Used only as an example of public Cursor rule libraries.

- https://docs.devin.ai/windsurf/plugins/cascade/memories  
  Official Windsurf/Cascade memories and rules documentation. Used for persistent context, global rules, workspace rules, and auto-generated memories.

- https://docs.replit.com/references/agent/automations  
  Official Replit Agent automations documentation. Used for Slack Agent, Telegram Agent, timed automations, integrations, and deployment.

---

### Low-code automation and agent platforms

- https://n8n.io/ai-agents/  
  Official n8n AI Agents product page. Used for production-ready AI agents, integrations, MCP, workflow automation, and multi-agent claims.

- https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/  
  Official n8n human-in-the-loop documentation. Used for gated tools, approval requests, workflow pausing, and approval/deny flows.

- https://n8n.io/workflows/  
  Official n8n workflow templates page. Used for public workflow/template ecosystem.

- https://zapier.com/agents  
  Official Zapier Agents product page. Used for custom AI teammates, company knowledge, app integrations, and ongoing automation.

- https://www.make.com/en/ai-agents  
  Official Make AI Agents product page. Used for reusable agents, visual canvas, 3,000+ apps, reasoning panel, manual approvals, and Library of Agents.

- https://developers.make.com/api-documentation/api-reference/ai-agents  
  Official Make AI Agents API documentation. Used for create/update/run/delete API support and beta status.

- https://docs.lindy.ai/fundamentals/lindy-101/templates  
  Official Lindy templates documentation. Used for template library, prebuilt workflows, and use-case categories.

- https://relevanceai.com/docs/get-started/introduction  
  Official Relevance AI introduction. Used for agents, workforces, knowledge/RAG, tools, marketplace, guardrails, approvals, triggers, and multi-agent teams.

- https://github.com/RelevanceAI/agent-skills/blob/main/reference/managing-relevance-agents/SKILL.md  
  Relevance AI GitHub example. Used as a practical example of managing agents, tools, memory, triggers, and conversations.

---

### Agent frameworks

- https://docs.crewai.com/  
  Official CrewAI documentation. Used for crews, flows, examples, cookbooks, and enterprise automation.

- https://docs.crewai.com/v1.14.7/en/concepts/agents  
  Official CrewAI agents documentation. Used for role, goal, tools, memory, delegation, and agent configuration.

- https://docs.crewai.com/v1.14.7/en/learn/human-in-the-loop  
  Official CrewAI human-in-the-loop documentation. Used for human input / review patterns.

- https://microsoft.github.io/autogen/stable/index.html  
  Official AutoGen documentation. Used for AutoGen Studio, AgentChat, Core, event-driven multi-agent systems, and extensions.

- https://docs.langchain.com/oss/python/langgraph/workflows-agents  
  Official LangGraph workflows and agents documentation. Used for workflow vs agent patterns and dynamic tool usage.

- https://docs.langchain.com/oss/python/langgraph/interrupts  
  Official LangGraph interrupts documentation. Used for human-in-the-loop pauses and resume flows.

- https://docs.langchain.com/oss/python/langgraph/persistence  
  Official LangGraph persistence documentation. Used for checkpointers, state, short-term memory, human-in-the-loop, and fault tolerance.

- https://docs.langchain.com/oss/python/langgraph/add-memory  
  Official LangGraph memory documentation. Used for short-term and long-term memory patterns.

---

### Risk / evaluation sources

- https://arxiv.org/abs/2606.13468  
  2026 paper on AI coding agent fixes and rejection patterns. Used to support the caveat that coding agents still need validation, tests, and review.

- https://arxiv.org/abs/2605.11229  
  2026 paper on hijacking agentic workflows. Used for prompt-injection and unsafe workflow risks.

- https://arxiv.org/abs/2602.01146  
  2026 paper on persistent memory risks in LLM systems. Used as background for memory drift, leakage, and safety concerns.