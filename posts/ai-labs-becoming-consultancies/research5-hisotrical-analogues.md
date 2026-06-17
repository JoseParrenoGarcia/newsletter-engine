## Executive summary

The strongest historical lesson is that **enterprise technology rarely “deploys itself”**. Cloud, ERP, Salesforce, RPA, data platforms, and now AI all show the same pattern: the product may be technically powerful, but value only appears after workflow redesign, data integration, governance, training, incentives, procurement, and operating-model change.

That does **not** mean OpenAI, Anthropic, and similar frontier labs are simply becoming consultancies. A better hypothesis is that they are building or joining a new **AI deployment layer**: part product engineering, part customer success, part systems integration, part transformation consulting, part “forward-deployed” problem-solving. OpenAI’s Frontier Alliances explicitly pair its FDE team with firms such as BCG, McKinsey, Accenture, and Capgemini to redesign workflows and scale deployments globally. Anthropic’s partnership with Accenture and its new enterprise AI services company with Blackstone, Hellman & Friedman, and Goldman Sachs point in the same direction. ([openai.com](https://openai.com/index/frontier-alliance-partners/?utm_source=chatgpt.com))

The counterargument is strong: **history favours ecosystems, not single winners**. AWS did not perform every cloud migration itself; it built MAP, partner competencies, financial incentives, and migration methodologies. Salesforce did not implement every CRM transformation itself; AppExchange and consulting partners became central. Snowflake, Databricks, and dbt are all surrounded by implementation ecosystems. Enterprise AI may rhyme with these waves: frontier labs may provide the models, product primitives, and deployment expertise, while consultancies, cloud providers, system integrators, and internal enterprise teams perform much of the messy adoption work. ([aws.amazon.com](https://aws.amazon.com/migration-acceleration-program/?utm_source=chatgpt.com))

The sceptical version is this: **AI labs may not dominate enterprise AI deployment because deployment is not only a model problem**. Traditional consultancies own change management and procurement. Cloud providers own infrastructure and enterprise contracts. Regulated industries may prefer established integrators. Open-source and sovereign models may reduce dependence on frontier labs. And services-heavy deployment work may be margin-dilutive, operationally distracting, and culturally awkward for research labs. Very glamorous, obviously. Nothing says “frontier intelligence” like arguing with a procurement committee about access controls for six months.

---

## Historical analogues

| Analogue | Why it fits AI deployment | Where it breaks | Lesson for AI labs | Lesson for enterprises | Sources |
|---|---|---|---|---|---|
| **Cloud migration: AWS, Azure, Google Cloud, partners, migration programmes** | Cloud adoption required assessment, workload migration, architecture redesign, security, FinOps, operating model change, and partner support. AWS MAP explicitly combines methodology, tools, training, partner expertise, and financial investments. Google Cloud’s migration programme similarly uses partner and professional-services funding. | Cloud workloads are more deterministic than AI agents. A migrated workload either runs or does not. AI systems may behave probabilistically, drift, hallucinate, or require ongoing evaluation. | Build repeatable migration-style playbooks: assess, mobilise, deploy, govern, optimise. Do not pretend APIs equal adoption. | Treat AI adoption like cloud migration: portfolio assessment, risk tiers, operating model, migration factory, internal enablement. | ([aws.amazon.com](https://aws.amazon.com/migration-acceleration-program/?utm_source=chatgpt.com)) |
| **ERP implementation: SAP, Oracle, large SIs** | ERP shows that enterprise software can reshape processes, roles, data models, controls, and reporting. McKinsey notes ERP transformations are notoriously difficult, often facing delays and cost increases. | ERP workflows are usually rule-based and process-defined. AI agents operate with fuzzier behaviour, language interfaces, and less deterministic outputs. | Avoid “just install the system” thinking. AI deployment must confront process redesign, data ownership, controls, and user trust. | The biggest risks are not only technical. They are scope creep, poor process alignment, weak ownership, and underestimating change. | ([mckinsey.com](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/getting-an-erp-transformation-back-on-track?utm_source=chatgpt.com)) |
| **Salesforce and enterprise SaaS implementation ecosystem** | Salesforce became not only a CRM product but a platform surrounded by AppExchange apps, certified consultants, ISVs, and implementation partners. Salesforce AppExchange lists ready-to-install solutions and certified consultants across industries. | CRM implementations are more bounded than AI deployments. AI may cut across knowledge work, operations, software, support, analytics, and decision-making. | Labs should build partner ecosystems, templates, reusable agents, and vertical accelerators rather than doing every bespoke deployment themselves. | Do not buy the product and assume transformation follows. Budget for configuration, data quality, training, and governance. | ([appexchange.salesforce.com](https://appexchange.salesforce.com/mktcollections/curated/technologypartners?utm_source=chatgpt.com)) |
| **RPA and automation transformation** | RPA promised quick automation, but scaling required centres of excellence, governance, process selection, exception handling, and operating models. UiPath’s CoE guidance defines roles and responsibilities for safe enterprise-wide automation. Deloitte’s survey found organisations moving beyond pilots reported average cost reductions, but the path required broader automation maturity. | RPA bots are brittle but mostly deterministic. AI agents may be more flexible, but also harder to test and control. | Do not let AI become “automation theatre”: impressive demos, weak production value, no owner, no durable ROI. | Start with processes where the work is repetitive enough to measure, but not so brittle that every exception kills the system. | ([uipath.com](https://www.uipath.com/rpa/center-of-excellence?utm_source=chatgpt.com)) |
| **Digital transformation consulting** | Accenture, Deloitte, McKinsey, BCG, PwC and others already sell enterprise-wide AI/data transformation, operating-model redesign, governance, and workflow reinvention. Accenture describes Reinvention Services as embedding data and AI and modernising technology at enterprise scale; McKinsey emphasises a data-centric operating model for scaling gen AI. | AI labs may own model expertise that traditional consultancies lack. But consultancies own industry process knowledge, transformation muscle, and executive relationships. | Partner with transformation firms rather than assuming model expertise replaces organisational expertise. | Use consultancies carefully: demand measurable outcomes, avoid slideware, and keep internal capability-building central. | ([accenture.com](https://www.accenture.com/us-en/about/reinvention-services?utm_source=chatgpt.com)) |
| **Data platform modernisation: Snowflake, Databricks, dbt** | Data platforms show how technical adoption depends on migration, governance, data modelling, cost management, analytics engineering, and partner ecosystems. Databricks says it works with thousands of partners across data, analytics, and AI use cases; Snowflake highlights certified services partners; dbt Labs has formalised its partner ecosystem. | AI deployment depends on data platforms but adds behavioural uncertainty, evaluation, human adoption, and governance over generated actions. | Labs should not underestimate the data layer. AI products fail when enterprise context, permissions, data quality, and lineage are poor. | Before deploying agents, fix boring foundations: identity, access, data contracts, lineage, semantic layers, and ownership. Yes, boring. Also essential. | ([databricks.com](https://www.databricks.com/partners?utm_source=chatgpt.com)) |
| **Palantir’s forward-deployed engineering model** | Palantir’s FDE model is the closest analogue: engineers embed with customers, understand operational workflows, build data/ontology layers, and feed patterns back into platform capabilities. Palantir now even describes an “AI FDE” that translates natural language into Foundry operations. | Palantir’s model took years, was expensive, and is deeply tied to its platform and ontology approach. Copying the job title does not copy the operating model. | FDEs must be product-learning loops, not glorified sales engineers. Every deployment should create reusable abstractions. | An embedded team can accelerate value, but enterprises must avoid permanent dependency on external engineers. | ([palantir.com](https://www.palantir.com/docs/foundry/ai-fde/overview?utm_source=chatgpt.com)) |
| **Microsoft enterprise sales, partner ecosystem, and Copilot adoption** | Microsoft shows how enterprise AI adoption can combine product distribution, existing contracts, partner channels, adoption kits, training, and customer success. Microsoft’s Copilot Success Kit is explicitly designed to accelerate time to value with implementation frameworks and scenario libraries. | Microsoft has distribution advantages that frontier labs lack: productivity-suite ownership, identity, security, admin controls, procurement routes, and partner reach. | Frontier labs may struggle if they lack enterprise distribution and governance surfaces. | Adoption may happen through existing enterprise platforms rather than direct model-provider relationships. | ([adoption.microsoft.com](https://adoption.microsoft.com/en-us/copilot/success-kit/?utm_source=chatgpt.com)) |

---

## Patterns that repeat across enterprise technology waves

### 1. Powerful technology is easy to demo and hard to operationalise

Cloud, ERP, RPA, data platforms, and AI all have a seductive demo phase. The demo says: “Look, the thing works.” The enterprise rollout says: “Now connect it to identity, policy, workflow, data, audit, finance, support, and the 14 people who disagree about what the process even is.”

AWS MAP exists precisely because cloud migration is not just “move servers to AWS”. It packages methodology, tools, partner expertise, training, and financial support across assessment, mobilisation, migration, and modernisation. ([aws.amazon.com](https://aws.amazon.com/migration-acceleration-program/?utm_source=chatgpt.com))

The AI equivalent is: **the model works, but the organisation does not yet know how to absorb it**.

### 2. Implementation ecosystems form around adoption gaps

Salesforce, AWS, Google Cloud, Snowflake, Databricks, and dbt all illustrate the same point: when the technology becomes strategically important, a partner ecosystem forms around it. These partners perform configuration, migration, integration, governance, training, industry adaptation, and support. Salesforce AppExchange includes both apps and certified consultants; Google Cloud points customers to thousands of vetted partners; Databricks and Snowflake both emphasise partner ecosystems for implementation and AI/data use cases. ([appexchange.salesforce.com](https://appexchange.salesforce.com/mktcollections/curated/technologypartners?utm_source=chatgpt.com))

For AI labs, this suggests a probable equilibrium: **they may build deployment capabilities, but they are unlikely to own all deployment labour themselves**.

### 3. Centres of excellence appear when local experimentation becomes chaos

Cloud centres of excellence, RPA CoEs, data governance teams, and AI councils all emerge for the same reason: decentralised teams can experiment quickly, but scaling requires standards. UiPath’s CoE guidance focuses on defined roles and a team responsible for implementing and managing automation safely across the enterprise. ([uipath.com](https://www.uipath.com/rpa/center-of-excellence?utm_source=chatgpt.com))

The AI equivalent will likely include model-risk committees, agent registries, evaluation platforms, prompt/version governance, data-access review, reusable workflow patterns, and internal champions. Less sexy than “agentic transformation”, but more likely to survive contact with reality.

### 4. ROI depends on workflow redesign, not tool deployment

ERP systems fail when companies automate broken processes. RPA fails when companies bolt bots onto unstable workflows. Cloud migrations disappoint when workloads are lifted-and-shifted without modernisation. AI will follow the same law.

McKinsey’s work on scaling gen AI argues for a data-centric operating model, not a model-only strategy. BCG similarly stresses adoption, roles, governance, and responsible deployment when scaling AI. ([mckinsey.com](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/a-data-leaders-operating-guide-to-scaling-gen-ai?utm_source=chatgpt.com))

The repeating pattern is: **technology produces leverage only after the process is redesigned around it**.

### 5. Pilots are not proof of transformation

RPA had this problem. AI has inherited it with enthusiasm. Deloitte’s RPA/intelligent automation survey shows benefits among organisations that move beyond piloting, but that maturity requires broader automation capability. Recent reporting on enterprise agents similarly points to many initiatives remaining stuck in pilot phases because of governance, infrastructure, and operational-readiness gaps. ([deloitte.com](https://www.deloitte.com/us/en/insights/topics/talent/intelligent-automation-2022-survey-results.html?utm_source=chatgpt.com))

For AI labs, the danger is selling impressive pilots that do not convert into durable deployment. For enterprises, the danger is mistaking a working prototype for an operating capability.

---

## What AI deployment should learn from cloud migration

Cloud migration teaches four useful lessons.

First, **adoption needs a factory model**. AWS MAP’s assess → mobilise → migrate and modernise structure is a useful mental model for AI. An AI equivalent might be: identify workflows, classify risk, prepare data/access, prototype, evaluate, deploy, monitor, retrain, and scale. ([aws.amazon.com](https://aws.amazon.com/migration-acceleration-program/?utm_source=chatgpt.com))

Second, **partners are not optional at enterprise scale**. Google Cloud’s migration programme uses service funds to offset the cost of engaging partners or Google Professional Services. That is a strong signal: even hyperscalers with enormous engineering capacity still rely on ecosystems. ([cloud.google.com](https://cloud.google.com/solutions/cloud-migration-program?utm_source=chatgpt.com))

Third, **migration is not modernisation**. Moving a workload to the cloud is not the same as redesigning it for cloud-native value. Likewise, adding ChatGPT or Claude to a workflow is not the same as redesigning the workflow for AI-native execution.

Fourth, **cost governance becomes a discipline**. Cloud created FinOps because usage-based infrastructure can become financially slippery. AI will need something similar: token cost governance, model routing, evaluation cost control, and usage attribution.

---

## What AI deployment should learn from ERP implementation

ERP is the great warning label attached to enterprise software.

ERP implementation shows that complex enterprise systems fail when they clash with existing processes, master data, incentives, organisational politics, and unclear ownership. McKinsey describes ERP transformations as notoriously difficult, with delays and cost increases common. Academic reviews of ERP methodologies similarly stress time, budget, resources, methodology, and business satisfaction as core implementation concerns. ([mckinsey.com](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/getting-an-erp-transformation-back-on-track?utm_source=chatgpt.com))

The lesson for AI is not “AI is ERP again”. It is more precise:

**AI deployment will fail when companies automate around unclear process truth.**

If no one agrees how a claims process works, an AI claims agent will not magically solve that disagreement. It may merely accelerate confusion. The same applies to sales operations, procurement, customer support, finance workflows, compliance review, or internal analytics.

ERP also teaches that enterprise systems create political questions: whose process becomes the standard, whose local workaround disappears, whose job changes, whose data quality becomes visible, and who signs off on exceptions.

AI agents will intensify this because they do not just store process logic. They may *execute* parts of it.

---

## What AI deployment should learn from Salesforce and enterprise SaaS ecosystems

Salesforce is useful because it became both **product** and **ecosystem**.

The lesson is that enterprise SaaS adoption often becomes an industry of implementation partners, app vendors, certified experts, training systems, templates, and vertical specialisations. Salesforce AppExchange explicitly combines ready-to-install solutions with certified consultants across business and industry contexts. ([appexchange.salesforce.com](https://appexchange.salesforce.com/mktcollections/curated/technologypartners?utm_source=chatgpt.com))

For AI labs, the Salesforce lesson is: build platform surfaces that others can extend. That means reusable agent frameworks, marketplaces, connectors, evaluation templates, governance controls, industry packs, and implementation certifications.

For enterprises, the lesson is: **configuration is not strategy**. A CRM system can be beautifully configured and still fail if sales incentives, data hygiene, pipeline definitions, and manager behaviours are wrong. AI agents can be beautifully prompted and still useless if the surrounding workflow is incoherent.

---

## What AI deployment should learn from RPA

RPA is probably the most sobering analogue.

RPA promised automation without deep system change: let bots operate existing interfaces, avoid expensive rewrites, harvest quick savings. That worked in some cases, but many programmes struggled to scale because workflows were brittle, exceptions were frequent, ownership was fragmented, and governance lagged. UiPath’s own scaling guidance argues for an automation operating model and CoE, not just more bots. ([cdn.uipath.com.cn](https://cdn.uipath.com.cn/Whitepapers/7-Pillars-Scaling-Automation-D2.pdf?utm_source=chatgpt.com))

The AI version of this failure mode is **agent sprawl**.

Every team builds a chatbot. Some become useful. Many duplicate each other. Permissions are unclear. Evaluation is inconsistent. Costs are invisible. Nobody knows which agent is allowed to do what. Eventually someone builds a spreadsheet to track the agents, because the circle of enterprise life is cruel.

RPA also warns against “automation theatre”: dashboards full of impressive counts, but little durable process improvement. AI labs and consultancies may be tempted to sell agent counts, prompt libraries, or pilot velocity. Enterprises should push instead for business outcomes: cycle time, error reduction, revenue uplift, quality, risk reduction, customer satisfaction, and employee adoption.

---

## What AI deployment should learn from data platform modernisation

Data platform modernisation teaches that **the boring layers determine the fancy layer’s ceiling**.

Snowflake, Databricks, and dbt all sit in ecosystems because data work requires integration, modelling, governance, lineage, orchestration, cost control, and analytics engineering. Databricks promotes thousands of partners solving data, analytics, and AI use cases; Snowflake highlights certified services partners; dbt has formalised partner tiers and go-to-market models. ([databricks.com](https://www.databricks.com/partners?utm_source=chatgpt.com))

For AI deployment, this is central. Enterprise agents need access to relevant, permissioned, reliable context. If the customer data is duplicated, stale, undocumented, or politically contested, the agent becomes a charmingly confident interface to organisational mess.

The lesson is simple:

**AI deployment is downstream of data maturity.**

Not perfectly downstream. AI can help improve data workflows. But serious enterprise deployment depends on identity, access control, data contracts, semantic definitions, lineage, monitoring, and ownership.

---

## What AI deployment should learn from Palantir’s forward-deployed engineering model

Palantir is the closest analogue because it built a business around embedding technical teams close to operational problems.

The strongest version of the Palantir lesson is not “send engineers to customers”. It is:

**Use deployment as product discovery.**

MarketWatch’s reporting argues that Palantir’s FDE model involved engineers working closely with customers to solve complex data problems, but also notes that imitators may dilute the model by turning FDEs into glorified sales engineers or remote consultants. It also notes the model was expensive and took more than a decade to mature. ([marketwatch.com](https://www.marketwatch.com/story/palantir-pioneered-the-hottest-job-in-tech-its-legions-of-copycats-may-not-succeed-bdd581e3?utm_source=chatgpt.com))

That is an important warning for frontier labs. If FDEs merely customise one-off customer workflows, the model becomes consultancy with worse margins. If FDEs convert repeated deployment patterns into reusable platform capabilities, the model can compound.

Palantir’s own AI FDE documentation is also revealing: the company is now productising aspects of forward deployment into an AI assistant that operates Foundry through conversational commands. ([palantir.com](https://www.palantir.com/docs/foundry/ai-fde/overview?utm_source=chatgpt.com))

That might be the destination for AI labs too: use humans to discover deployment patterns, then automate more of the deployment layer.

---

## What is genuinely different about AI deployment

The analogies are useful, but they do break.

### 1. AI systems are less deterministic

ERP workflows and RPA bots can be brittle, but they are usually deterministic. AI agents can produce different outputs across prompts, contexts, model versions, and tool states. That makes testing, rollback, certification, and auditability harder.

PwC’s responsible AI guidance makes a telling point: AI development can resemble video game development more than traditional automation or web development when it interacts with humans, requiring user-experience evaluation and phased beta testing on unseen audiences. ([pwc.co.uk](https://www.pwc.co.uk/services/risk/insights/accelerating-innovation-through-responsible-ai/responsible-ai-framework.html?utm_source=chatgpt.com))

### 2. Model behaviour changes over time

Cloud infrastructure changes, but not in the same way as model behaviour. Frontier models are updated, routed, fine-tuned, wrapped with new tools, connected to changing context, and used by changing users. Evaluation must become continuous, not a one-off acceptance test.

### 3. Natural language changes adoption

Salesforce, ERP, and dashboards require users to learn an interface. AI lets users express intent in natural language. That lowers the entry barrier but raises ambiguity. Users may believe the system understands more than it does.

### 4. Value appears individually before it appears organisationally

Copilots often help individuals before companies can measure transformation. That creates a measurement gap: employees may feel productive, while finance teams struggle to prove durable ROI.

Microsoft’s Copilot adoption materials focus heavily on scenario libraries, implementation frameworks, skilling, and leadership resources, which suggests that even a product embedded in Microsoft 365 still needs adoption design. ([adoption.microsoft.com](https://adoption.microsoft.com/en-us/copilot/success-kit/?utm_source=chatgpt.com))

### 5. Governance is harder because AI can act

An AI assistant that drafts text is one thing. An AI agent that updates CRM records, triggers refunds, changes bids, approves invoices, or modifies code is another. The more agency increases, the more enterprises need permissions, audit trails, approval gates, simulation, rollback, and accountability.

---

## Why the consulting layer keeps coming back

The consulting layer keeps coming back because enterprise technology adoption repeatedly contains work that product companies do not fully want to do, and customers cannot fully do alone.

The recurring jobs are:

1. **Translation**: converting broad technology capability into a specific business workflow.

2. **Integration**: connecting identity, data, systems, permissions, and reporting.

3. **Change management**: training users, redesigning roles, changing incentives, reducing resistance.

4. **Governance**: defining acceptable use, controls, risk tiers, auditability, and escalation paths.

5. **Value measurement**: proving whether the system improved anything that matters.

6. **Political mediation**: resolving conflicts between teams, processes, owners, and definitions.

This is why Accenture, Deloitte, McKinsey, BCG, PwC, and others are already positioning AI as enterprise transformation rather than tool rollout. Accenture describes its Reinvention Services around embedding data and AI and modernising technology at enterprise scale; PwC describes AI transformation as strategy, responsible deployment, integration into core systems, and governance. ([accenture.com](https://www.accenture.com/us-en/about/reinvention-services?utm_source=chatgpt.com))

AI does not remove this layer. It may automate pieces of it. But the layer exists because organisations are complicated, not because software was insufficiently clever.

---

## Counterarguments to the AI-labs-become-consultancies thesis

### 1. Traditional consultancies own procurement, change management, and executive trust

OpenAI and Anthropic may have model credibility, but Accenture, Deloitte, PwC, McKinsey, BCG, EY, KPMG, Capgemini, and others already sit inside enterprise transformation budgets. OpenAI’s Frontier Alliances implicitly recognises this by partnering with major consultancies to define strategy, integrate systems, redesign workflows, and scale deployment globally. ([openai.com](https://openai.com/index/frontier-alliance-partners/?utm_source=chatgpt.com))

This weakens the claim that frontier labs will dominate deployment alone. A more likely outcome is **co-opetition**: labs provide models and product expertise; consultancies provide transformation capacity.

### 2. Cloud providers own infrastructure and enterprise contracts

Microsoft, AWS, and Google Cloud already own identity, security, cloud spend, procurement channels, and partner ecosystems. Google Cloud’s migration materials refer to Professional Services and large partner capability; Microsoft has Copilot adoption assets built around its existing productivity suite. ([cloud.google.com](https://cloud.google.com/products/cloud-migration?utm_source=chatgpt.com))

If AI deployment depends on data, security, compute, and enterprise integration, cloud providers have enormous leverage.

### 3. AI deployment may become productised and self-serve

Not every deployment needs an embedded engineer. Over time, common workflows may become templates, packaged agents, vertical products, marketplace components, or built-in features inside Microsoft, Salesforce, ServiceNow, Workday, SAP, Snowflake, Databricks, and other systems.

That would limit the long-term size of bespoke AI consulting. The high-touch deployment layer may be an important bridge, not the final state.

### 4. Open-source and sovereign models reduce dependency on frontier labs

Enterprises may avoid single-vendor dependence, especially in regulated industries or regions concerned with sovereignty. The rise of open-weight and sovereign AI arguments means some organisations will prefer model portability, on-premise deployment, private cloud, or local providers. Recent reporting around model access restrictions and AI sovereignty reinforces why some buyers may avoid deep dependence on US frontier labs. ([businessinsider.com](https://www.businessinsider.com/anthropic-model-access-mistral-opportunity-ai-sovereignty-2026-6?utm_source=chatgpt.com))

### 5. Regulated industries may prefer established systems integrators

Banks, insurers, healthcare organisations, governments, and defence institutions often need auditability, procurement compliance, industry controls, and delivery accountability. Established integrators may be better positioned to carry implementation liability and regulatory delivery burden.

Anthropic’s Accenture partnership explicitly highlights industry requirements and regulatory contexts, which suggests frontier labs recognise this gap. ([anthropic.com](https://www.anthropic.com/news/anthropic-accenture-partnership?utm_source=chatgpt.com))

### 6. Many AI projects may lack clear ROI

The RPA and AI-pilot lessons matter here. Pilots can create enthusiasm without durable value. Recent reporting on enterprise agents points to many initiatives staying in pilot phase due to governance, orchestration, infrastructure, and trust gaps. ([itpro.com](https://www.itpro.com/technology/artificial-intelligence/most-enterprises-are-still-unprepared-to-operationalize-it-it-leaders-are-bullish-on-agents-but-keeping-falling-at-the-final-hurdle-heres-why?utm_source=chatgpt.com))

If AI ROI remains hard to measure outside specific workflows, enterprises may slow spending or consolidate around fewer, clearer use cases.

### 7. Services-heavy businesses may distract frontier labs

Frontier labs are expensive research and product organisations. High-touch services can reduce margins, create operational complexity, and pull talent away from core model/product development. The WSJ reporting summarised by MarketWatch noted that FDE-style approaches can increase costs and create margin concerns. ([wsj.com](https://www.wsj.com/articles/ai-startups-have-a-new-old-secret-weapon-forward-deployed-engineers-d18ee609?utm_source=chatgpt.com))

The strategic risk is that labs become trapped between two models: research lab economics and consulting delivery economics.

### 8. Bespoke consulting may not scale

Palantir’s model worked over a long period, but it was expensive and hard to copy. MarketWatch explicitly warns that copycats may misunderstand the FDE model, reducing it to sales engineering or remote consulting rather than deep engineering-led deployment. ([marketwatch.com](https://www.marketwatch.com/story/palantir-pioneered-the-hottest-job-in-tech-its-legions-of-copycats-may-not-succeed-bdd581e3?utm_source=chatgpt.com))

For OpenAI and Anthropic, the hard question is whether deployment work creates reusable product capability or endless bespoke implementation.

### 9. Enterprises may not want model providers embedded in sensitive workflows

Some companies may be uncomfortable giving frontier labs deep access to workflows, data, operational processes, or strategic priorities. That creates room for neutral integrators, cloud providers, internal AI platform teams, or private-model vendors.

### 10. Organisational inertia may dominate model capability

A better model does not automatically change budgets, incentives, job design, risk appetite, procurement, data ownership, or leadership behaviour. This is the unglamorous enterprise truth. It survived ERP, cloud, RPA, and data platforms. It will survive frontier AI too, wearing a slightly nicer blazer.

---

## What this means for the eventual blog post

The eventual blog post should probably avoid a binary framing like:

> “Are AI labs becoming consultancies?”

A stronger framing would be:

> **“Frontier AI labs are discovering the old enterprise software truth: capability is not deployment.”**

The historical argument could be structured around three claims.

First, **AI is not unprecedented in needing an implementation ecosystem**. Cloud, ERP, Salesforce, RPA, and data platforms all required large deployment layers. The repeated pattern is that value comes from organisational redesign, not software access.

Second, **AI is different in the nature of the deployment problem**. Unlike ERP or RPA, AI agents are probabilistic, language-driven, context-sensitive, and capable of action. This makes evaluation, governance, and trust more central than in previous waves.

Third, **the likely future is not labs versus consultancies, but layered competition**. Frontier labs, cloud providers, systems integrators, SaaS platforms, Palantir-style deployment firms, open-source vendors, and internal enterprise AI teams will all fight for parts of the deployment stack.

A sceptical concluding angle could be:

> The question is not whether OpenAI and Anthropic can build impressive deployment teams. They probably can. The question is whether those teams become a scalable product-learning loop, or merely the latest expensive human layer needed to make enterprise software work.

That is the core historical lesson: **the consulting layer keeps returning because the hard part is rarely the tool. It is the organisation around the tool.**

---

## Clean reference list

1. AWS Migration Acceleration Program: https://aws.amazon.com/migration-acceleration-program/  
2. Google Cloud Rapid Migration & Modernization Program: https://cloud.google.com/solutions/cloud-migration-program  
3. Google Cloud migration products and services: https://cloud.google.com/products/cloud-migration  
4. McKinsey on ERP transformation: https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/getting-an-erp-transformation-back-on-track  
5. ERP implementation methodology review: https://arxiv.org/abs/2205.02584  
6. Salesforce AppExchange technology partners: https://appexchange.salesforce.com/mktcollections/curated/technologypartners  
7. UiPath RPA Center of Excellence: https://www.uipath.com/rpa/center-of-excellence  
8. UiPath scaling automation operating model: https://cdn.uipath.com.cn/Whitepapers/7-Pillars-Scaling-Automation-D2.pdf  
9. Deloitte Intelligent Automation survey: https://www.deloitte.com/us/en/insights/topics/talent/intelligent-automation-2022-survey-results.html  
10. Accenture Reinvention Services: https://www.accenture.com/us-en/about/reinvention-services  
11. Deloitte AI & Data services: https://www.deloitte.com/global/en/services/consulting/services/artificial-intelligence-and-data.html  
12. McKinsey gen AI operating model: https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/a-data-leaders-operating-guide-to-scaling-gen-ai  
13. BCG AI at scale: https://www.bcg.com/capabilities/artificial-intelligence  
14. PwC AI consulting and transformation: https://www.pwc.com/us/en/services/ai.html  
15. PwC Responsible AI framework: https://www.pwc.co.uk/services/risk/insights/accelerating-innovation-through-responsible-ai/responsible-ai-framework.html  
16. Databricks partners: https://www.databricks.com/partners  
17. Snowflake Partner Network: https://www.snowflake.com/en/why-snowflake/partners/  
18. dbt Labs partners: https://www.getdbt.com/partners  
19. dbt Labs global partner ecosystem announcement: https://www.prnewswire.com/news-releases/dbt-labs-launches-reimagined-global-partner-ecosystem-program-to-accelerate-strategic-growth-302534291.html  
20. Palantir AI FDE documentation: https://www.palantir.com/docs/foundry/ai-fde/overview  
21. MarketWatch on Palantir FDE copycats: https://www.marketwatch.com/story/palantir-pioneered-the-hottest-job-in-tech-its-legions-of-copycats-may-not-succeed-bdd581e3  
22. WSJ on AI startups and forward-deployed engineers: https://www.wsj.com/articles/ai-startups-have-a-new-old-secret-weapon-forward-deployed-engineers-d18ee609  
23. Microsoft Copilot Success Kit: https://adoption.microsoft.com/en-us/copilot/success-kit/  
24. Microsoft 365 Copilot adoption: https://adoption.microsoft.com/en-gb/copilot/  
25. OpenAI Frontier Alliances: https://openai.com/index/frontier-alliance-partners/  
26. Accenture and OpenAI partnership page: https://www.accenture.com/us-en/services/ecosystem-partners/openai  
27. Anthropic and Accenture partnership: https://www.anthropic.com/news/anthropic-accenture-partnership  
28. Accenture announcement on Anthropic partnership: https://newsroom.accenture.com/news/2025/accenture-and-anthropic-launch-multi-year-partnership-to-drive-enterprise-ai-innovation-and-value-across-industries  
29. Anthropic enterprise AI services company: https://www.anthropic.com/news/enterprise-ai-services-company  
30. Blackstone announcement on Anthropic enterprise AI services firm: https://www.blackstone.com/news/press/anthropic-partners-with-blackstone-hellman-friedman-and-goldman-sachs-to-launch-enterprise-ai-services-firm/  
31. OpenAI DeployCo announcement: https://openai.com/index/openai-launches-the-deployment-company/  
32. Forrester/ITPro reporting on enterprise AI agents stuck in pilots: https://www.itpro.com/technology/artificial-intelligence/most-enterprises-are-still-unprepared-to-operationalize-it-it-leaders-are-bullish-on-agents-but-keeping-falling-at-the-final-hurdle-heres-why  
33. Business Insider on AI sovereignty and model access restrictions: https://www.businessinsider.com/anthropic-model-access-mistral-opportunity-ai-sovereignty-2026-6