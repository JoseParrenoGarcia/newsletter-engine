# Research notes: Risks, costs, economics, model choices, and operating principles for AI agents as reusable AI roles

**Working topic:**  
“The New AI Org Chart: the AI agent roles every founder, manager, or solo builder should hire first.”

**Purpose:**  
These are research notes, not a blog post draft. The goal is to make the eventual article more credible, practical, and sceptical of hype.

**Access date:** 22 June 2026.

**Important pricing caveat:**  
AI pricing changes frequently. All prices below should be verified again before publication. Treat every number as time-sensitive.

---

## 1. Executive summary

- **The main cost trap is not the model subscription.**  
  The bigger cost risk comes from repeated tool use: long context, retries, web search, browser/computer actions, code execution, workflow executions, storage, logs, and human review time. OpenAI, Anthropic, Make, Zapier, Relevance AI, GitHub Copilot, and Hugging Face all expose some form of usage-based billing beyond simple seats or subscriptions.  
  Source: https://openai.com/api/pricing/

- **The most practical economic pattern is tiered intelligence.**  
  Start with the best model to establish a quality baseline, then replace parts of the workflow with cheaper models where accuracy remains acceptable. OpenAI explicitly recommends this pattern for agents.  
  Source: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

- **Cheaper models are often good enough for classification, extraction, routing, summarisation, first drafts, and formatting.**  
  Frontier models are more defensible for final judgement, complex synthesis, ambiguous strategy, high-stakes recommendations, and multi-step coding. This is synthesis, but it aligns with OpenAI’s guidance on matching model capability to task complexity, latency, and cost.  
  Source: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

- **Coding agents are unusually attractive because quality is easier to verify.**  
  Tests, type checks, diffs, build logs, and pull-request review create feedback loops. Anthropic highlights coding agents as a strong fit because outputs are objectively testable.  
  Source: https://www.anthropic.com/research/building-effective-agents

- **Agent autonomy increases both value and risk.**  
  OWASP’s “Excessive Agency” risk captures the core danger: too much functionality, too much permission, or too much autonomy can let agents perform damaging actions after hallucination, prompt injection, or tool misuse.  
  Source: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/

- **Prompt injection is not a solved problem.**  
  The UK National Cyber Security Centre argues that LLMs do not enforce a robust boundary between instructions and untrusted data, so the realistic goal is reducing likelihood and impact, not claiming perfect prevention.  
  Source: https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection

- **Human-in-the-loop is not optional for high-impact actions.**  
  OpenAI recommends escalation when agents exceed retry or failure thresholds, and human oversight for sensitive, irreversible, or high-stakes actions such as payments, refunds, and cancellations.  
  Source: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

- **Evaluation needs to move from “does the answer look good?” to “did the workflow achieve the right outcome?”**  
  Anthropic separates task, trial, grader, transcript/trace, final outcome, harness, and evaluation suite. OpenAI recommends traces, graders, datasets, and eval runs for agent workflows.  
  Sources:  
  https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents  
  https://developers.openai.com/api/docs/guides/agent-evals

- **The “AI employee” metaphor is useful for onboarding and governance, but misleading for accountability.**  
  WEF argues agents should be onboarded with role definitions, safeguards, and oversight, while IDC argues they are instruments, not peers, and remain dependent on human judgement.  
  Sources:  
  https://www.weforum.org/stories/2025/12/ai-agents-onboarding-governance/  
  https://www.idc.com/resource-center/blog/the-future-of-work-ai-agents-as-instruments-no-co-workers/

---

## 2. Cost overview

| Tool / model | Pricing model | Relevant costs | Best use cases | Caveats | Official source URL |
|---|---:|---|---|---|---|
| **Anthropic Claude API** | Token pricing by model | Opus 4.8: **$5 / MTok input, $25 / MTok output**. Sonnet 4.6: **$3 / MTok input, $15 / MTok output**. Haiku 4.5: **$1 / MTok input, $5 / MTok output**. Prompt caching and cache reads are separately priced. | Research agents, writing agents, coding assistants, judgement-heavy workflows | Tool use adds cost. Managed agents include standard token rates plus active runtime; web search and code execution can add separate charges. | https://claude.com/pricing |
| **Claude Code / Claude subscriptions** | Subscription / plan access, exact public metering varies | Claude pricing pages reference Claude Code and enterprise access, but precise standalone public pricing for Claude Code usage was not clearly exposed in the retrieved pricing text. | Coding agents, repo navigation, refactoring, implementation support | Treat actual usage limits as plan-specific and verify before publishing. | https://claude.com/pricing |
| **OpenAI API** | Token pricing by model plus tools | GPT-5.5: **$5 / 1M input**, **$0.50 / 1M cached input**, **$30 / 1M output**. GPT-5.4 mini: **$0.75 / 1M input**, **$0.075 cached**, **$4.50 output**. Web search is **$10 / 1,000 calls**; containers are separately priced. | Production agents, research systems, tool-using workflows, structured outputs | Batch can reduce cost by 50%; data residency adds a premium; tool tokens and sessions can materially change total cost. | https://openai.com/api/pricing/ |
| **ChatGPT Plus / Pro** | Monthly subscription | Plus is **$20/month**. Pro has **$100 and $200 tiers**, with the $100 tier giving 5× Plus usage and the $200 tier giving 20× Plus usage. | Individual founders, managers, content/research workflows, coding support | Not a production API. Usage limits vary; API usage is billed separately. | https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus |
| **ChatGPT Business / Codex** | Seat pricing plus usage-based Codex seats | Business standard seats: **$25/user/month monthly** or **$20/user/month annually** in most countries. Codex-only seats have no fixed monthly seat cost but require usage credits. Codex usage is token/credit based; OpenAI says average Codex cost is roughly **$100–$200/developer/month**, with large variance. | Team workspaces, governed ChatGPT usage, coding agents, PR reviews | Codex cost depends on model, token use, instances, automations, and fast mode. | https://help.openai.com/en/articles/8792828-what-is-chatgpt-business |
| **OpenAI Codex rate card** | Usage credits / token pricing | Codex usage is charged through token-equivalent credits depending on model and usage mode. OpenAI notes that average monthly Codex usage may land around **$100–$200/developer/month**, but with large variance. | Software engineering agents, background coding, PR-level implementation | Actual usage depends heavily on repo size, number of tasks, model choice, automation frequency, and fast mode usage. | https://help.openai.com/en/articles/20001106-codex-rate-card |
| **Gemini API** | Token pricing plus grounding/tool costs | Gemini 3.5 Flash paid tier: **$1.50 / 1M input**, **$9 / 1M output**, with context caching and Google Search grounding charges after included quota. | Cheap high-volume tasks, Google ecosystem, long-context workflows | Free tier content may be used to improve products; paid tier states content is not used. Grounding can add cost. | https://ai.google.dev/gemini-api/docs/pricing |
| **Gemini consumer plans** | Monthly subscription | Google AI Pro showed **£18.99/month** in the UK pricing page; Ultra had higher tiers from **£79.99/month** and **£189.99/month**. | Individual research, Google Workspace-style workflows | Pricing is locale-specific. Usage limits are compute-based and can vary with prompt complexity and feature use. | https://gemini.google/gb/subscriptions/?hl=en-GB |
| **Cursor** | Subscription plus included model usage and overages | Individual: **$20/month**. Teams: **$40/user/month**. Plans include a set amount of model usage; on-demand usage after included allowance is billed in arrears. | IDE-native coding agents, repo-aware editing, cloud agents | Heavy agent usage can exceed included allowance. Enterprise controls matter for serious teams. | https://cursor.com/pricing |
| **Windsurf** | Subscription plus quotas / usage | Official search result shows Pro at **$20/month**, with increased quotas, frontier models, cloud agents, and extra usage at API pricing. | Coding IDE agent workflows | The official pricing text retrieved did not give enough detail for all tiers. Verify exact Max / Teams / Enterprise pricing before publication. | https://windsurf.com/account/upgrade-prompt?utm_source=chatgpt.com |
| **GitHub Copilot** | Subscription plus AI credits | Pro: **$10/user/month**; Pro+: **$39/user/month**; Max: **$100/user/month**. Credits are consumed by chat, agent mode, code review, cloud agent, CLI, and apps. | GitHub-native coding, PR review, cloud coding agents | Usage-based billing and credits can add complexity. Code review can also consume GitHub Actions minutes. | https://github.com/features/copilot/plans |
| **GitHub Copilot usage-based billing** | Usage-based billing around premium requests / credits | GitHub’s changelog explains updates to Copilot billing and plans, including usage behaviour for agentic and review features. | Understanding Copilot cost mechanics beyond the headline subscription | Pricing and credit rules can change; teams should monitor usage. | https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/ |
| **Replit Agent** | Subscription with included credits | Core: **$25 monthly** or **$20/month annually**, with $25 monthly credits. Pro: **$100 monthly** or **$95/month annually**, with $100 monthly credits and more parallel agents. | Solo builders, app prototypes, quick deployment | Replit warns Agent is powered by probabilistic LLMs and may make mistakes. | https://replit.com/pricing |
| **n8n** | Workflow execution pricing | Starter: **€20/month annual**, 2.5K executions. Pro: **€50/month annual**, 10K executions. Business: **€667/month annual**, 40K executions. Community Edition is self-hosted. | Deterministic automation, internal workflows, agent orchestration | LLM API costs are separate. Business overages can apply. Saved execution history and storage have limits. | https://n8n.io/pricing/ |
| **Zapier / Zapier Agents** | Task / activity pricing | Free Zapier plan: **100 tasks/month**. Professional starts at **$19.99/month**. Zapier Agents Free includes up to **400 activities/month**; Agents Pro is **$400 billed annually**, equivalent to **$33.33/month**, with up to 1,500 activities/month. | Non-technical automation, CRM/email/calendar workflows, small-business operations | Activities include actions, browsing, and knowledge lookup. Task/activity usage can grow quickly. | https://zapier.com/pricing |
| **Make** | Credit-based automation pricing | Free: **$0**, up to 1,000 credits/month. Core: **$9/month** for 10K credits. Pro: **$16/month** for 10K credits. Teams: **$29/month** for 10K credits. Enterprise custom. | Visual automation, agent-connected workflows, app orchestration | Each module action generally consumes credits; complex scenarios can use from two to thousands of credits per run. | https://www.make.com/en/pricing |
| **Lindy** | Monthly subscription | Plus: **$49.99/month**. Pro: **$99.99/month**. Max: **$199.99/month**. Enterprise custom. | Inbox, calendar, meeting prep, follow-up assistants | Lindy states messages require user review before sending, which is good governance but also means review time remains part of the cost. | https://www.lindy.ai/pricing |
| **Relevance AI** | Plan + actions + vendor credits | Free: 200 actions/month. Pro: **$19/month annual** or **$29 monthly**, 2,500 actions/month. Team: **$234/month annual** or **$349 monthly**, 7,000 actions/month. Extra actions: **$80 / 1,000 actions**; extra vendor credits: **$20 / 10,000 credits**. | AI workforce / GTM agents, sales workflows, scheduled tasks, CRM actions | “Actions” and “vendor credits” are separate concepts; model/tool usage may be passed through as vendor credits. | https://relevanceai.com/docs/get-started/pricing |
| **Self-hosted / open-source models** | Infrastructure pricing, not usually token pricing | Hugging Face dedicated endpoints charge by instance time; examples include AWS T4 GPU at **$0.50/hour**, AWS A100 at **$2.50/hour**, AWS H200 at **$5/hour**, with pricing calculated by minute. | Privacy-sensitive inference, embeddings, smaller models, predictable workloads | “Open source” does not mean “free”: you pay for GPU/CPU, ops, monitoring, scaling, security, and maintenance. Hugging Face provider routing passes through provider costs with no Hugging Face markup. | https://huggingface.co/docs/inference-endpoints/pricing |

---

## 3. Model choice guidance

### 3.1 When to use cheaper models

Use cheaper models for **bounded, low-risk, repeatable tasks**, especially when mistakes are easy to catch.

Examples:

- Classification.
- Routing.
- Extracting structured fields.
- Tagging leads.
- Deduplicating simple records.
- Reformatting notes.
- Summarising internal documents.
- Generating first drafts.
- Producing candidate options.
- Translating rough notes into a cleaner format.
- Checking whether a document matches a known template.

A strong practical pattern is:

> **Cheap model generates, stronger model verifies.**

Another useful pattern is:

> **Cheap model triages, human reviews edge cases.**

This aligns with OpenAI’s guidance to start with a strong baseline and then swap in smaller models where quality remains acceptable.

Source:  
https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

### 3.2 When to use frontier models

Use frontier models when the task has **ambiguity, high downside, multi-step reasoning, synthesis, or judgement**.

Examples:

- Investment memos.
- Strategic recommendations.
- Legal or financial interpretation.
- Sensitive customer responses.
- Complex research synthesis.
- Security reviews.
- Architecture decisions.
- Incident analysis.
- “Should we do this?” judgement.
- Final approval recommendations.
- High-stakes prioritisation.
- Multi-step coding or debugging.

The core economic question is not “which model is cheapest?”  
It is:

> **What is the expected cost of being wrong?**

If the cost of being wrong is high, using a stronger model and adding human review is usually cheaper than cleaning up the mess later.

### 3.3 When to use coding-specific tools

Use coding-specific tools such as:

- Claude Code.
- OpenAI Codex.
- Cursor.
- GitHub Copilot.
- Windsurf.
- Replit Agent.

These are best when the agent needs:

- Repository context.
- Terminal access.
- Tests.
- Diffs.
- Pull request creation.
- Build logs.
- Local file editing.
- Refactoring support.
- Multi-file implementation.
- CI/CD feedback.

Coding is unusually suitable for agents because feedback loops are concrete:

- Unit tests pass or fail.
- Builds break.
- Linters complain.
- Type checks catch errors.
- Diffs expose exactly what changed.
- Pull requests can be reviewed.

Anthropic explicitly calls out coding agents as a strong fit because outputs can be verified through tests.

Source:  
https://www.anthropic.com/research/building-effective-agents

### 3.4 When to use workflow tools

Use workflow platforms such as:

- Zapier.
- Make.
- n8n.
- Lindy.
- Relevance AI.

These are useful when the core problem is not “thinking”, but **moving information between systems**.

Example workflow:

1. Receive a lead.
2. Enrich the lead.
3. Score it.
4. Create a CRM record.
5. Draft a follow-up email.
6. Notify Slack.
7. Wait for human approval.
8. Send the message.

In these cases, the LLM is only one component inside a larger deterministic workflow.

That is less glamorous, therefore often better.

### 3.5 When to avoid agentic automation entirely

Avoid agentic automation where the task is:

- Irreversible.
- Poorly specified.
- Legally sensitive.
- Privacy-sensitive.
- Adversarial.
- Impossible to evaluate.
- Highly ambiguous.
- Dependent on stale data.
- Likely to trigger external consequences.

Examples:

- Sending money.
- Deleting records.
- Approving contracts.
- Changing production configs.
- Firing customer emails without review.
- Medical advice.
- Legal advice.
- Acting on untrusted external content with privileged tools.
- Making hiring or firing decisions.
- Updating financial records without human approval.

OWASP and NCSC both frame tool access and prompt injection as major risk multipliers.

Sources:  
https://genai.owasp.org/llmrisk/llm062025-excessive-agency/  
https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection

---

## 4. Risk map

| Risk | Why it matters | Example | Mitigation | Source URLs |
|---|---|---|---|---|
| **Hallucination / confabulation** | Agents can confidently act on false assumptions. | A research agent invents a competitor feature, then a strategy agent builds a recommendation around it. | Require citations, source snapshots, uncertainty labels, and human review for claims. | https://genai.owasp.org/llmrisk/llm062025-excessive-agency/ |
| **Poor source grounding** | Research agents can summarise weak or irrelevant sources as if they were evidence. | A market researcher cites vendor marketing as independent proof. | Separate source types: official docs, journalism, vendor claims, community opinion, synthesis. | https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/ |
| **Prompt injection** | Untrusted text can steer the model away from the user’s intent. | A malicious webpage tells a browser agent to ignore instructions and email private data. | Treat untrusted content as hostile; reduce tool permissions; add deterministic policy checks; monitor tool calls. | https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection |
| **Tool misuse / excessive agency** | Damage increases when agents can call tools, update systems, or delete data. | An email agent has both read and delete permissions when it only needs read access. | Least privilege, narrow tools, user-scoped auth, approval for high-impact actions. | https://genai.owasp.org/llmrisk/llm062025-excessive-agency/ |
| **Privacy and data leakage** | Agents often touch email, CRM, docs, calendars, code, and customer data. | A meeting-prep agent includes sensitive customer details in a broad Slack channel. | Data minimisation, access controls, workspace policies, audit logs, approved connectors. | https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development/introduction |
| **Over-automation** | Automation can create more review work than it saves. | An agent drafts 50 outbound sales emails, all requiring careful human editing. Splendid productivity theatre. | Measure accepted outputs, not generated outputs. Track review minutes saved. | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents |
| **Lack of audit logs** | When an agent acts, you need to know what instruction, tool, data, and model produced the action. | A CRM record is changed and nobody knows why. | Log prompts, traces, tool calls, outputs, approvals, and final state. | https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection |
| **Context drift / stale memory** | Long-running agents may rely on outdated assumptions. | A customer-insight agent uses last quarter’s ideal customer profile after the strategy changed. | Version instructions, expire memories, force retrieval from canonical sources. | https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/best-practices |
| **Wrong assumptions** | Agents may fill gaps silently. | A finance/admin assistant assumes a payment deadline or tax rule. | Ask for missing inputs, encode “do not assume” rules, escalate uncertain cases. | https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/ |
| **Brittle workflows** | Multi-step workflows fail when one API, schema, or site changes. | A browser agent breaks after a UI redesign. | Prefer APIs over browser actions, wrap tools, test integrations end-to-end. | https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/best-practices |
| **Cost runaway** | Loops, retries, web search, long context, and tool calls can explode cost. | A research agent searches the web repeatedly, retries failed browsing, and stores huge traces. | Budgets, run limits, token caps, max turns, cheaper first pass, batch processing. | https://openai.com/api/pricing/ |
| **Unclear accountability** | If an agent makes a bad decision, a human or organisation still owns the outcome. | “The AI approved it” becomes a non-answer in a post-mortem. | Name a human owner, approval path, scope, escalation policy, and rollback plan. | https://www.nature.com/articles/s44387-025-00041-7 |

---

## 5. Human-in-the-loop principles

Use this as a practical checklist for founders and managers.

### 5.1 Define the agent’s job description

Each AI role should have a clear job description.

Include:

- Goal.
- Inputs.
- Allowed sources.
- Allowed tools.
- Forbidden actions.
- Output format.
- Escalation triggers.
- Human owner.
- Review process.
- Quality bar.
- Examples of good outputs.
- Examples of bad outputs.

A vague agent is a vague employee, except cheaper to create and faster to disappoint.

### 5.2 Separate planning from execution

Let the agent propose a plan first.

Then let a human approve before the agent touches external systems.

A good structure:

1. Agent analyses the task.
2. Agent proposes plan.
3. Human reviews.
4. Agent executes only approved steps.
5. Agent summarises what changed.
6. Human reviews final result.

This is especially important when the workflow has external consequences.

### 5.3 Use approval gates for irreversible actions

Require approval before:

- Sending money.
- Issuing refunds.
- Sending customer emails.
- Posting publicly.
- Updating CRM fields.
- Changing calendar invites.
- Deleting records.
- Updating production configs.
- Creating pull requests that trigger deployment.
- Approving contracts.
- Sending sales outreach.

OpenAI explicitly recommends oversight for high-risk actions.

Source:  
https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

### 5.4 Give agents the least privilege possible

If the job is to summarise emails, do not give delete/send permissions.

If the job is to draft CRM notes, do not give permission to update deal stages.

If the job is to create a report, do not give it permission to publish it.

OWASP calls out excessive functionality, excessive permissions, and excessive autonomy as root causes of excessive agency.

Source:  
https://genai.owasp.org/llmrisk/llm062025-excessive-agency/

### 5.5 Use deterministic controls outside the LLM

Do not rely on the model to “be careful”.

Use:

- Policies.
- Access checks.
- Budgets.
- Schemas.
- Allowlists.
- Validation rules.
- Required fields.
- Approval workflows.
- Rate limits.
- Logging.
- Rollback paths.

The LLM should not be the only safety layer.

### 5.6 Require sources for research work

Every research agent should distinguish:

- Official documentation.
- Vendor marketing.
- Reputable journalism.
- Academic / technical papers.
- Practitioner commentary.
- Community opinion.
- The agent’s own synthesis.

This matters because a vendor blog and an independent security review should not carry the same evidential weight.

### 5.7 Escalate on uncertainty, retries, or tool failure

Escalate when:

- The agent exceeds a retry threshold.
- The agent cannot find enough evidence.
- The agent encounters contradictory sources.
- A tool fails repeatedly.
- A required field is missing.
- The agent is about to act on an assumption.
- The action has meaningful downside.

OpenAI recommends escalation when agents exceed failure thresholds or cannot complete a task safely.

Source:  
https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

### 5.8 Log the workflow, not just the answer

Store:

- Instructions.
- Model version.
- Retrieved documents.
- Tool calls.
- Tool arguments.
- Tool outputs.
- Human approvals.
- Final output.
- Final system state.
- Cost.
- Failure reason, if any.

This is how you debug, audit, and improve the workflow.

### 5.9 Assign a human accountable owner

The agent does not own the result.

A person, team, or function owns it.

A good AI role definition should include:

> **Human owner:** [name / role]  
> **This owner is accountable for reviewing outputs, approving high-risk actions, and maintaining the workflow.**

### 5.10 Start with shadow mode

Before allowing the agent to act, run it beside the current process.

Compare:

- What the human did.
- What the agent recommended.
- Where they agreed.
- Where they differed.
- Whether the agent surfaced useful extra context.
- Whether review time was reduced.
- Whether the output was accepted.

Only move from shadow mode to assisted mode once the agent has earned trust.

---

## 6. Evaluation and quality control

### 6.1 Create a small golden dataset first

Start with 10–20 high-quality examples covering:

- Normal cases.
- Edge cases.
- Ambiguous cases.
- Failure cases.
- “Should escalate” cases.
- Examples with bad source material.
- Examples with missing context.
- Examples with conflicting information.

LangSmith recommends manually curated examples to define what “good” looks like.

Source:  
https://docs.langchain.com/langsmith/evaluation-concepts

### 6.2 Evaluate the full workflow, not just the final answer

For agents, judge:

- Did it choose the right tools?
- Did it call tools in the right order?
- Did it pass correct arguments?
- Did it retrieve relevant sources?
- Did it ignore irrelevant sources?
- Did it follow safety instructions?
- Did it ask for approval when needed?
- Did it produce the correct final state?
- Did it stay within cost limits?
- Did it escalate when appropriate?

OpenAI recommends trace grading for workflow-level failures.

Source:  
https://developers.openai.com/api/docs/guides/agent-evals

### 6.3 Use multiple graders

One grader is rarely enough.

Possible graders:

- Factuality grader.
- Source quality grader.
- Policy compliance grader.
- Formatting grader.
- Tone grader.
- Tool-use grader.
- Safety grader.
- Human usefulness grader.

For example, a research agent might be evaluated on:

1. Are the claims true?
2. Are the sources reliable?
3. Are sources clearly attached to claims?
4. Are uncertainties marked?
5. Is the synthesis useful?

### 6.4 Run multiple trials

Agent outputs vary.

Anthropic notes that repeated trials are needed to produce more consistent evaluation results.

Source:  
https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### 6.5 Measure outcome, not self-report

If an agent says “I booked the meeting”, verify the calendar state.

If an agent says “I updated the CRM”, verify the CRM.

If an agent says “I found three relevant sources”, inspect the sources.

Anthropic’s eval guidance distinguishes transcript from final environment outcome.

Source:  
https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### 6.6 Maintain a failure log

Capture:

- Hallucinations.
- Missing sources.
- Weak sources.
- Wrong tool calls.
- Incorrect assumptions.
- Excessive retries.
- Expensive runs.
- Rejected outputs.
- User corrections.
- Prompt injection attempts.
- Cases where the agent should have escalated but did not.

This failure log becomes your roadmap for improving the workflow.

### 6.7 Convert production failures into regression tests

When something fails in real usage:

1. Add it to the golden dataset.
2. Write the expected behaviour.
3. Add a grader if possible.
4. Re-run before future releases.

LangSmith describes a loop where online evaluations surface issues that become offline test cases.

Source:  
https://docs.langchain.com/langsmith/evaluation-concepts

### 6.8 Track cost per accepted output

Do not measure only:

- Number of outputs generated.
- Number of tasks attempted.
- Number of agents created.

Measure:

- Outputs accepted.
- Review time saved.
- Human edits required.
- Cost per accepted output.
- Failure rate.
- Escalation rate.
- Time-to-useful-output.

The unit of value is not output volume.  
It is useful work shipped.

### 6.9 Red team obvious abuse paths

Test with:

- Malicious emails.
- Poisoned webpages.
- Ambiguous instructions.
- Missing data.
- Duplicate records.
- Conflicting policies.
- Prompt injection.
- Tool failures.
- API schema changes.
- Stale documents.
- Adversarial customer messages.

### 6.10 Use pre-release and post-release evaluation

Use offline evals before release.

Use online monitoring after release.

Offline evals catch regressions before launch.  
Online monitoring catches production drift and real-world surprises.

Source:  
https://docs.langchain.com/langsmith/evaluation-concepts

---

## 7. Critique of the “AI employee” metaphor

### 7.1 Where the metaphor is useful

The metaphor is useful because it pushes founders and managers to think in terms of:

- Roles.
- Responsibilities.
- Onboarding.
- Permissions.
- Review cycles.
- Performance management.
- Escalation paths.
- Accountability structures.

WEF makes this point directly: AI agents should be onboarded with rigour similar to a new employee, including defined roles, safeguards, and structured oversight.

Source:  
https://www.weforum.org/stories/2025/12/ai-agents-onboarding-governance/

The metaphor also helps non-technical readers understand that reusable AI roles are not just “prompts”. They are closer to small operating systems:

- Instructions.
- Tools.
- Data access.
- Memory.
- Evaluation.
- Approval gates.
- Logs.
- Owners.

### 7.2 Where the metaphor is misleading

The metaphor becomes misleading when it implies the agent has:

- Judgement.
- Accountability.
- Loyalty.
- Intent.
- Ethical discretion.
- Organisational understanding.
- Common sense.
- Legal responsibility.
- A stable identity.
- A duty of care.

IDC’s critique is useful here: AI agents are not peers or co-workers; they are instruments, bounded by design and dependent on human judgement.

Source:  
https://www.idc.com/resource-center/blog/the-future-of-work-ai-agents-as-instruments-no-co-workers/

### 7.3 What the metaphor hides

The metaphor can hide the real operating system underneath.

An “AI employee” is actually:

- A probabilistic model.
- A prompt or instruction set.
- A set of tools.
- A permission boundary.
- A context window.
- A retrieval system.
- A memory policy.
- A billing surface.
- A logging/audit layer.
- A human review process.

It can also hide the fact that humans still provide:

- Goals.
- Context.
- Data access.
- Judgement.
- Legal responsibility.
- Ethical accountability.
- Final decisions.

### 7.4 How to use the metaphor without overselling it

Better wording:

- **AI roles** rather than “AI employees”.
- **Reusable AI workflows** rather than “digital workers”.
- **AI assistants with job descriptions** rather than “autonomous staff”.
- **AI operating roles** rather than “replacement employees”.
- **Decision-support agents** rather than “decision-makers”.

Recommended line for the article:

> **Treat them like employees for onboarding; treat them like software for reliability; treat them like risk-bearing systems for governance.**

This preserves the usefulness of the metaphor without pretending the agent is actually a colleague, a contractor, or a tiny synthetic graduate trainee called Nigel.

---

## 8. Recommended cautions to include in the blog post

1. **Do not hire an AI role until you understand the manual workflow.**  
   Automation magnifies confusion.

2. **A role is not an agent.**  
   A role needs scope, inputs, tools, review gates, examples, and failure handling.

3. **Subscriptions are not the full cost.**  
   Tool calls, web searches, browser actions, code execution, storage, workflow executions, retries, and human review are the real economics.

4. **Do not start with full autonomy.**  
   Start with draft → review → approve → execute.

5. **Never let agents perform irreversible actions without approval.**  
   This includes payments, deletions, public posting, production changes, and customer communication.

6. **Use stronger models where error cost is high.**  
   Use cheaper models where error is cheap and easy to catch.

7. **Require citations for research roles.**  
   A market researcher without sources is just a confident intern with Wi-Fi.

8. **Track accepted work, not generated work.**  
   The unit of value is not “number of AI outputs”. It is “useful work shipped”.

9. **Treat prompt injection as residual risk.**  
   NCSC explicitly warns against assuming prompt injection can be fully solved like SQL injection.  
   Source: https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection

10. **Use audit logs and traces from day one.**  
    When something goes wrong, you need a post-mortem trail.

11. **Do not let the metaphor outrun the system.**  
    “AI employee” is a useful teaching device, not a legal, ethical, or operational reality.

12. **Make humans own outcomes.**  
    Agents can assist, propose, draft, search, and execute within limits. They do not absorb responsibility.

---

## 9. Practical operating principles for founders and managers

### Principle 1: Start manual before automating

Before building an AI role, run the process manually.

Document:

- Inputs.
- Decision points.
- Sources.
- Repeated judgement calls.
- Common failure modes.
- Edge cases.
- Final output format.
- Human review process.

If you cannot explain the process, the agent will not magically infer it. It will merely fail with confidence, which is not innovation. It is theatre with a token bill.

### Principle 2: Give each AI role a clear job description

A good AI role should include:

- Role name.
- Purpose.
- Tasks.
- Non-tasks.
- Inputs.
- Outputs.
- Tools.
- Source hierarchy.
- Review requirements.
- Escalation triggers.
- Success metrics.
- Failure modes.

Example:

> **Role:** Market Research Assistant  
> **Purpose:** Collect evidence about competitor positioning and summarise it for human review.  
> **Allowed sources:** Official websites, pricing pages, documentation, reputable journalism, founder posts.  
> **Forbidden actions:** No outreach, no CRM updates, no claims without URLs.  
> **Output:** Structured brief with source URLs, evidence quality, and uncertainty.  
> **Review:** Human approval required before any strategy recommendation is used.

### Principle 3: Provide context, examples, and constraints

Agents need:

- Business context.
- Audience context.
- Examples of good output.
- Examples of bad output.
- Style guidelines.
- Source rules.
- Constraints.
- Edge cases.
- Known traps.

The more repeatable the task, the more reusable the agent becomes.

### Principle 4: Define review points

Every AI role should have review checkpoints.

Common checkpoints:

- Before using external tools.
- Before sending communications.
- Before updating records.
- Before publishing.
- Before spending money.
- Before making strategic recommendations.
- Before deleting or overwriting anything.
- Before escalating to another workflow.

### Principle 5: Require citations for research work

For research roles, require:

- Source URL.
- Source type.
- Date accessed.
- Claim supported.
- Confidence level.
- Whether source is official, reported, community, or synthesis.

Never let a research agent provide unsourced “industry consensus”. That phrase has started more mediocre slide decks than PowerPoint itself.

### Principle 6: Do not let AI execute irreversible actions without approval

Irreversible actions include:

- Sending payments.
- Sending public emails.
- Posting on social media.
- Deleting records.
- Updating production systems.
- Signing contracts.
- Issuing refunds.
- Changing customer terms.
- Submitting forms.
- Triggering deployments.

Approval should be explicit, logged, and tied to a human owner.

### Principle 7: Log failures and improve the workflow

Each failure should become:

- A new example.
- A new rule.
- A new eval case.
- A new guardrail.
- A permission adjustment.
- A better escalation path.

Do not treat failures as embarrassing.

Failures are training data for the operating system.

### Principle 8: Match model strength to task risk

Use weaker / cheaper models for:

- Low-risk classification.
- Formatting.
- Extraction.
- Drafting.
- Routing.
- Pre-processing.

Use stronger models for:

- Ambiguous judgement.
- Final review.
- Strategic synthesis.
- Legal/financial sensitivity.
- Complex coding.
- Security-sensitive reasoning.
- High-impact customer communication.

### Principle 9: Prefer APIs and structured workflows over browser agents

Browser agents are useful when no API exists.

But APIs are usually:

- More stable.
- Easier to test.
- Easier to log.
- Easier to permission.
- Less vulnerable to prompt injection from webpages.
- Less brittle when UI changes.

Use browser agents reluctantly, not heroically.

### Principle 10: Measure value honestly

Track:

- Human time saved.
- Accepted outputs.
- Rework required.
- Error rate.
- Escalation rate.
- Cost per accepted output.
- Tool-call cost.
- Review burden.
- User trust.
- Failure severity.

Do not measure:

- “Number of agents created.”
- “Number of outputs generated.”
- “Amount of AI used.”

Those are adoption metrics. They are not value metrics.

---

## 10. Source list

### Pricing and cost sources

#### Anthropic Claude pricing

Official model pricing, caching, managed agent runtime, web search, and code execution costs.

URL:  
https://claude.com/pricing

Why it matters:  
Primary source for Anthropic model pricing and extra managed-agent cost surfaces.

---

#### OpenAI API pricing

Official model pricing, Batch discount, web search pricing, container pricing, and data residency premium.

URL:  
https://openai.com/api/pricing/

Why it matters:  
Primary source for OpenAI API model and tool pricing.

---

#### OpenAI API tool pricing details

Useful for explaining that tool calls still consume tokens and may carry separate session costs.

URL:  
https://developers.openai.com/api/docs/pricing

Why it matters:  
Explains additional pricing mechanics for API-based agent workflows.

---

#### OpenAI ChatGPT Plus Help Centre

Official Plus pricing and note that API usage is billed separately.

URL:  
https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus

Why it matters:  
Useful for distinguishing ChatGPT subscription pricing from API costs.

---

#### OpenAI ChatGPT Pro Help Centre

Official Pro tier distinction and usage allowances.

URL:  
https://help.openai.com/en/articles/9793128-ab-targets-pro-chatg

Why it matters:  
Useful for understanding heavy individual usage tiers.

---

#### OpenAI ChatGPT Business Help Centre

Official Business seat pricing, Codex seat model, minimum seat rules, and privacy statement.

URL:  
https://help.openai.com/en/articles/8792828-what-is-chatgpt-business

Why it matters:  
Useful for team-level pricing and governance context.

---

#### OpenAI Codex rate card

Official Codex credit/token pricing and typical average monthly cost estimate.

URL:  
https://help.openai.com/en/articles/20001106-codex-rate-card

Why it matters:  
Primary source for Codex-specific pricing and usage economics.

---

#### Gemini Developer API pricing

Official Gemini API pricing, context caching, grounding costs, and free-vs-paid data usage distinction.

URL:  
https://ai.google.dev/gemini-api/docs/pricing

Why it matters:  
Primary source for Gemini model and grounding costs.

---

#### Google AI plans

Official consumer subscription pricing and usage-limit caveats for Gemini plans.

URL:  
https://gemini.google/gb/subscriptions/?hl=en-GB

Why it matters:  
Useful for comparing individual subscription plans.

---

#### Cursor pricing

Official Individual, Teams, Enterprise structure, usage inclusion, on-demand billing, and privacy mode.

URL:  
https://cursor.com/pricing

Why it matters:  
Primary source for Cursor economics and coding-agent usage model.

---

#### Windsurf pricing

Official pricing result indicating Pro pricing, quotas, frontier models, and extra usage at API pricing. Verify all non-Pro tiers before publication.

URL:  
https://windsurf.com/account/upgrade-prompt?utm_source=chatgpt.com

Why it matters:  
Useful for coding-agent cost comparison, but pricing clarity was limited.

---

#### GitHub Copilot pricing

Official Pro, Pro+, Max pricing and credit-based consumption across agentic features.

URL:  
https://github.com/features/copilot/plans

Why it matters:  
Primary source for GitHub-native coding assistant pricing.

---

#### GitHub Copilot usage-based billing changelog

Useful for credit billing and code review / Actions-minute caveats.

URL:  
https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/

Why it matters:  
Adds nuance beyond headline subscription pricing.

---

#### Replit pricing

Official Core, Pro, Enterprise pricing and credits.

URL:  
https://replit.com/pricing

Why it matters:  
Useful for solo builder and app-prototyping agent economics.

---

#### n8n pricing

Official execution-based pricing, plan limits, overage caveats, and Community Edition context.

URL:  
https://n8n.io/pricing/

Why it matters:  
Useful for workflow automation economics.

---

#### Zapier pricing

Official task/activity pricing, Zapier Agents pricing, and Enterprise controls.

URL:  
https://zapier.com/pricing

Why it matters:  
Useful for non-technical automation and AI agent activity pricing.

---

#### Make pricing

Official credit-based automation pricing and explanation of credit consumption.

URL:  
https://www.make.com/en/pricing

Why it matters:  
Useful for visual workflow automation economics.

---

#### Lindy pricing

Official assistant pricing, enterprise features, and explicit review-before-send behaviour.

URL:  
https://www.lindy.ai/pricing

Why it matters:  
Useful for AI assistant pricing and human-review design.

---

#### Relevance AI pricing docs

Official plan, action, vendor-credit, top-up, and AI workforce pricing structure.

URL:  
https://relevanceai.com/docs/get-started/pricing

Why it matters:  
Useful for “AI workforce” style agent pricing.

---

#### Hugging Face Inference Endpoints and Providers pricing

Official self-hosted / dedicated inference cost framing, including CPU/GPU hourly rates and pass-through provider billing.

URLs:  
https://huggingface.co/docs/inference-endpoints/pricing  
https://huggingface.co/docs/inference-providers/pricing

Why it matters:  
Useful for comparing hosted proprietary models with open-source/self-hosted economics.

---

### Risk, governance, evaluation, and metaphor sources

#### OpenAI practical guide to building agents

Strong source for model choice, tools, orchestration, guardrails, and human intervention.

URL:  
https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

Why it matters:  
Primary vendor guide for practical agent-building principles.

---

#### Anthropic Building Effective Agents

Useful for “start simple”, workflows versus agents, framework caution, and why coding/customer support are strong agent use cases.

URL:  
https://www.anthropic.com/research/building-effective-agents

Why it matters:  
Strong practical guidance from a frontier AI lab.

---

#### Anthropic Demystifying evals for AI agents

Strong source for agent evaluation terminology: task, trial, grader, transcript, outcome, harness, and suite.

URL:  
https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

Why it matters:  
Excellent source for explaining agent evaluation beyond superficial answer grading.

---

#### OpenAI Evaluate agent workflows

Official source for traces, graders, datasets, and eval runs.

URL:  
https://developers.openai.com/api/docs/guides/agent-evals

Why it matters:  
Useful for operationalising quality control in agent workflows.

---

#### LangSmith evaluation concepts

Practical source for offline vs online evaluation, regression tests, curated datasets, and continuous improvement loops.

URL:  
https://docs.langchain.com/langsmith/evaluation-concepts

Why it matters:  
Good practitioner source for eval workflow design.

---

#### Google CX Agent Studio best practices

Useful for start-simple guidance, structured instructions, wrapping APIs, deterministic callbacks, end-to-end testing, and evaluations.

URL:  
https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/best-practices

Why it matters:  
Strong source for practical agent design and testing patterns.

---

#### OWASP LLM06: Excessive Agency

Core security source for tool permissions, autonomy, and human approval for high-impact actions.

URL:  
https://genai.owasp.org/llmrisk/llm062025-excessive-agency/

Why it matters:  
Authoritative security framing for the danger of over-permissioned agents.

---

#### UK NCSC prompt injection guidance

Strong cautionary source: prompt injection is not equivalent to SQL injection, and mitigation should focus on reducing impact rather than claiming total prevention.

URL:  
https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection

Why it matters:  
Useful counterweight to vendor claims that prompt injection can be neatly “solved”.

---

#### NCSC secure AI system development guidance

Useful source for privacy, secure-by-design, responsibility across AI supply chains, and lifecycle security.

URL:  
https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development/introduction

Why it matters:  
Authoritative security lifecycle guidance.

---

#### NIST AI Risk Management Framework

Authoritative governance source for trustworthy AI design, development, use, and evaluation.

URL:  
https://www.nist.gov/itl/ai-risk-management-framework

Why it matters:  
Useful for grounding the article’s risk framing in recognised governance language.

---

#### World Economic Forum on AI agent onboarding and governance

Useful for the “agent card”, role definition, authority, autonomy, evaluation, and oversight framing.

URL:  
https://www.weforum.org/stories/2025/12/ai-agents-onboarding-governance/

Why it matters:  
Supports the article’s idea that AI roles need onboarding, governance, and ownership.

---

#### IDC: AI agents as instruments, not co-workers

Strong critique of the co-worker/employee metaphor and useful counterweight to hype.

URL:  
https://www.idc.com/resource-center/blog/the-future-of-work-ai-agents-as-instruments-no-co-workers/

Why it matters:  
Useful sceptical source for avoiding overstatement.

---

#### Nature / npj AI article on accountability in human-AI agent relationships

Useful for accountability framing and the broader ethical problem of long-running human-agent relationships.

URL:  
https://www.nature.com/articles/s44387-025-00041-7

Why it matters:  
Academic source for accountability and human-agent relationship risks.

---

#### MIT Sloan Management Review / BCG agentic enterprise summary

Useful for showing that executives increasingly view agents as co-worker-like, while also creating new management and accountability tensions.

URL:  
https://bcghendersoninstitute.com/the-emerging-agentic-enterprise-how-leaders-must-navigate-a-new-age-of-ai/

Why it matters:  
Useful for capturing current enterprise discourse around agents as organisational actors.

---