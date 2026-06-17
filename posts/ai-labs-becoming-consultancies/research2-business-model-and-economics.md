# Research dossier: the business model and economics of AI deployment services

## Executive summary

**The emerging pattern is not “frontier AI labs become McKinsey”.** It is closer to a hybrid: *software company + cloud platform + Palantir-style forward-deployed engineering + partner-led systems integration*. The economics only make sense if services increase long-term model consumption, enterprise subscriptions, platform adoption, and product learning.

OpenAI has now formally launched an **OpenAI Deployment Company**, including the acquisition of Tomoro and about **150 forward-deployed engineers and deployment specialists** from day one. It also has **Frontier Alliance** partnerships with BCG, McKinsey, Accenture, and Capgemini to define strategy, integrate systems, redesign workflows, and scale deployments globally.

Anthropic is following a similar but more partner-heavy path: a new enterprise AI services company with Blackstone, Hellman & Friedman, and Goldman Sachs; a $100m Claude Partner Network; and major partnerships with Deloitte and Accenture. Deloitte made Claude available to its global network, while Accenture and Anthropic are building a Claude Centre of Excellence and industry-specific offerings.

The key economic logic is this: **professional services are usually not the highest-margin part of software businesses**, but they can unlock very high-margin recurring revenue. Salesforce says subscription and support made up about **94%** of FY2025 revenue, while ServiceNow reported a **professional services and other gross loss** in FY2025. That strongly suggests services are often treated as adoption infrastructure, not the main profit engine.

Palantir is the most relevant analogue. Its AIP Bootcamps promise to take customers from “0 to use case” in five days, while Palantir’s financials show software-like gross margins around the 80% range. The lesson: high-touch deployment can be economically powerful if it converts into durable platform revenue, not endless bespoke labour.

My strongest inference: **the deployment service is probably not the product. The product is the repeatable AI operating layer that emerges after enough bespoke deployments.** The service is the wedge, the learning loop, the implementation accelerator, and the enterprise trust mechanism. Very glamorous. Also suspiciously close to consulting, but wearing a hoodie.

---

## 1. Table of possible business models

| Business model | How it works | Evidence or analogue | Scalability | Likely customer segment | Risks |
|---|---|---|---|---|---|
| **Fixed-fee implementation project** | Customer pays for a scoped deployment: use-case discovery, architecture, agent build, integration, evaluation, governance, rollout. | Traditional consulting projects often use fixed-fee scopes; OpenAI partners say they will help define strategy, integrate systems, redesign workflows, and scale deployment. | Medium. Repeatable playbooks help, but every enterprise integration is messy. | Large enterprises, regulated firms, governments. | Scope creep, low margins, bespoke delivery. |
| **Time-and-materials consulting** | Customer pays for FDEs, solution architects, ML engineers, change managers, and technical specialists by day or month. | Consulting fee analogues; OpenAI FDE roles explicitly focus on end-to-end deployments with strategic customers. | Low to medium. Easy to sell, hard to scale without hiring armies. | Enterprise clients with unclear scope. | Becomes body-shopping. Talent cost eats margin. |
| **Retainer / advisory subscription** | Customer pays for ongoing access to experts, reviews, governance, architecture, evals, and roadmap support. | AWS Support pricing uses recurring support tiers; frontier labs can mirror this for AI adoption. | Medium to high if standardised. | Enterprise platform customers, CIO offices, AI Centres of Excellence. | Value can become vague if not tied to adoption. |
| **Managed AI operations** | Vendor monitors agents, evals, safety, uptime, prompts, workflows, model versions, and cost controls. | Cloud and SaaS managed support models; OpenAI Frontier says FDEs help operationalise governance and run agents in production. | High if tooling is standardised. | Regulated sectors, enterprises running critical workflows. | Liability, incident response, governance burden. |
| **Platform subscription plus services** | Services are bundled with platform seats, enterprise licences, or agent platform access. | Salesforce and ServiceNow monetise mainly through subscriptions, with services supporting adoption. | High if services pull customers into repeatable platform usage. | Large and mid-market enterprises. | Services may hide weak product adoption. |
| **API/token consumption accelerator** | Deployment team builds workflows that drive model usage through API calls, agent runs, fine-tuning, evals, and retrieval. | OpenAI positions enterprise deployment around integrating intelligence into workflows; Anthropic works through Bedrock, Vertex, and Azure. | Very high if deployments generate recurring usage. | Developers, AI-native firms, enterprises with high automation potential. | Tension between reducing customer cost and increasing token usage. |
| **Outcome-based pricing** | Customer pays based on business metrics: tickets resolved, hours saved, fraud reduced, conversions improved. | BCG notes AI agents are pushing customers towards pricing tied to measurable outcomes; EY discusses revenue recognition questions around success-based AI arrangements. | Potentially high, but measurement is hard. | Customer service, operations, sales, compliance, claims. | Attribution fights. “Was it the AI, the process change, or Bob finally reading the docs?” |
| **Revenue share** | Vendor takes a percentage of incremental revenue or savings. | Common in performance marketing and some enterprise transformation arrangements; less directly evidenced for frontier labs. | Medium. Attractive if value is measurable. | Sales, marketing, support automation, revenue ops. | Hard baseline, procurement resistance, audit complexity. |
| **Training and enablement** | Paid academies, certifications, workshops, partner training, internal AI literacy. | Anthropic’s Claude Partner Network funds training, technical support, and joint market development. OpenAI partners are building certified teams. | High if delivered through partners and online content. | Partners, enterprise teams, mid-market. | Training alone may not convert into production. |
| **Product discovery engine** | Deployment teams identify repeatable patterns that become products, templates, agents, connectors, or platform features. | OpenAI Frontier works with AI-native partners like Abridge, Clay, Ambience, Decagon, Harvey, and Sierra to learn customer needs and support deployment. | Very high if lessons become productised. | Labs and AI-native application companies. | Bespoke work can distract from core platform roadmap. |

---

## 2. How traditional consultancies price AI and technology transformation

**Sourced fact:** the large consultancies are already treating AI transformation as a major growth vector. Accenture reported FY2025 revenue of about **$69.7bn** and generative AI bookings of **$5.9bn**, roughly double the prior year’s $3bn.

Traditional consulting and systems integration pricing usually falls into a few patterns:

### Fixed-fee projects

The consulting firm agrees a statement of work, milestones, and deliverables. This is common when scope is relatively clear: strategy phase, architecture phase, implementation sprint, migration wave, change-management rollout.

### Time-and-materials

The client pays for people and time. This is more common when the work is exploratory, technical unknowns are high, or the client expects requirements to change.

### Managed services

The firm runs part of the operation after implementation: support, monitoring, process operations, model governance, cloud operations, data pipelines, or AI support desks.

### Outcome-based or hybrid pricing

Some AI work is moving towards pricing based on measured outcomes, but this is harder than it sounds. BCG notes customer demand for outcome-based AI pricing, while EY highlights revenue recognition questions when payment depends on successful AI-enabled outcomes.

**Inference:** for AI deployment, the likely practical model is hybrid. A vendor might charge an initial fixed-fee implementation, add a recurring platform/API commitment, then attach a retainer or support tier. Outcome-based pricing will be attractive in sales decks and painful in legal review. Nature is healing.

---

## 3. How SaaS, cloud, and enterprise software companies monetise professional services

The pattern in enterprise software is clear: **subscriptions are the main business; services reduce friction**.

Salesforce says it derives revenue from subscription/support and professional services/other, with subscription and support accounting for about **94%** of total FY2025 revenue. Salesforce describes professional services as helping customers achieve business results faster with Salesforce solutions.

ServiceNow is an even sharper analogue. Its subscription revenue dominates its business, while its FY2025 annual report states that professional services and other had a **gross loss percentage of 5%**, partly because partner ecosystem spend rose faster than revenue.

AWS monetises enterprise support through recurring support plans, with Enterprise Support priced as a percentage of monthly AWS charges, subject to minimums. That is important because it shows a cloud-native way to attach expert guidance to consumption.

**Inference:** frontier labs may copy all three models:

1. **Salesforce model:** platform subscription first, services second.
2. **ServiceNow model:** services may be low-margin or even loss-leading if they accelerate subscription growth.
3. **AWS model:** support and architecture guidance scale with consumption.

---

## 4. Palantir-style forward-deployed engineering economics

Palantir’s AIP Bootcamp is the cleanest public analogue. Palantir describes it as an interactive workshop where customers go from **0 to use case in five days**, developing initial use cases, onboarding users, and training for rollout.

Economically, the model appears to work like this:

### Step 1: compress time-to-value

Instead of selling abstract platform capability, Palantir puts engineers beside users and builds something real quickly.

### Step 2: create internal champions

Business users see their own workflows automated or improved. This changes the buyer conversation from “buy a platform” to “scale what we just saw”.

### Step 3: convert services into software revenue

The high-touch work is acceptable if it lands durable contracts and expands platform usage.

### Step 4: reuse patterns

Each deployment teaches the vendor reusable ontologies, workflows, connectors, governance patterns, and operating models.

Palantir’s financials suggest that high-touch deployment does not necessarily destroy software economics if the platform revenue scales. Public FY2025 summaries report Palantir revenue of about **$4.5bn** and gross margin around **82%**.

**Inference:** OpenAI and Anthropic probably want Palantir’s *conversion engine*, not pure consulting economics. The goal is to use embedded teams to turn strategic customers into long-term platform consumers.

---

## 5. Cost-structure analysis

### People costs

A small deployment team embedded with a customer for 3–6 months might include:

| Role | Typical function | Cost pressure |
|---|---|---|
| Forward-deployed engineer | Builds production workflows, integrations, agents, evals. | Very high. Scarce AI engineering talent. |
| Solutions architect | Designs enterprise architecture, security, data access, governance. | High. |
| ML / evals specialist | Creates evaluation suites, safety checks, model selection, monitoring. | High. |
| Product / delivery lead | Converts business problem into deployable roadmap. | Medium to high. |
| Change / enablement lead | Training, adoption, stakeholder management. | Medium. |
| Partner / account lead | Commercial expansion, renewals, executive alignment. | High but spread across accounts. |

OpenAI’s own FDE job descriptions say these roles lead complex end-to-end production deployments with strategic customers. Business Insider reported that OpenAI’s FDE team had 39 engineers and aimed for 52 by year-end in 2025, and that the team was intended to build scalable product playbooks rather than chase service revenue.

**Informed estimation:** a five-person applied AI deployment pod can easily cost **$150k–$350k per month fully loaded** in the US or Western Europe once salary, equity, benefits, travel, management, security review, and overhead are included. At frontier-lab compensation levels, the true economic cost can be higher, especially when equity is included.

### Compute/model costs

Compute costs depend heavily on use case:

- internal copilots and retrieval workflows may be moderate;
- customer-service agents can generate high inference volume;
- coding agents and document-heavy legal/finance workflows can become token-hungry;
- evals and synthetic testing can add significant hidden consumption.

Anthropic’s cloud strategy is relevant here: Claude is available through AWS Bedrock, Google Cloud Vertex AI, and Microsoft Azure, giving enterprises a way to consume models through existing cloud governance and procurement structures.

### Implementation costs

These include:

- identity and access management;
- data connectors;
- retrieval architecture;
- workflow integration;
- API integration;
- audit logging;
- model routing;
- guardrails;
- evals;
- change management.

This is where AI deployment starts looking less like “prompt engineering” and more like enterprise plumbing with a better haircut.

### Support costs

After launch, customers need monitoring, incident response, prompt/version control, regression testing, usage optimisation, and security reviews. This naturally becomes a retainer, managed service, or support tier.

### Sales and customer success costs

Strategic enterprise sales is expensive. Labs need executive relationships, procurement navigation, legal/security reviews, partner management, renewal management, and expansion motions.

### Opportunity cost of bespoke work

This is the most important hidden cost. Every senior engineer embedded with one customer is not building core model capability, platform features, or reusable product. That only makes sense if the deployment produces reusable learning or very large recurring revenue.

---

## 6. Is the service the product, or the wedge?

**My answer: mostly wedge, sometimes product.**

The service is the product when:

- the customer buys a managed transformation programme;
- the implementation is highly regulated or custom;
- the vendor charges directly for deployment;
- the work requires continuous human involvement.

The service is the wedge when:

- the deployment increases ChatGPT Enterprise, Claude Enterprise, API, or agent-platform usage;
- it creates reusable templates and platform features;
- it gives the lab access to real enterprise workflow problems;
- it helps partners sell more model consumption;
- it reduces time from “interesting demo” to “budget-approved production system”.

OpenAI’s Frontier positioning supports the wedge interpretation. The Enterprise Frontier Program pairs FDEs from the Deployment Company with customer teams to design architectures, operationalise governance, and run agents in production, while establishing repeatable patterns the customer can own and extend.

Anthropic’s Claude Partner Network also looks wedge-like: it funds training, technical support, joint market development, and work to make deployments successful through partners.

**Blog-post phrasing you might use later:**

> The consultancy is not where the magic margins live. It is where the lab learns where the product should exist.

---

## 7. What might pricing look like?

This section is **informed estimation**, not directly sourced pricing, unless stated otherwise.

### Large enterprises

Plausible package:

- **Discovery / strategy sprint:** $100k–$500k
- **3–6 month deployment pod:** $1m–$5m+
- **Enterprise platform / API commitment:** $1m–$20m+ annually
- **Ongoing support / managed AI operations:** $250k–$2m+ annually

For the largest strategic accounts, reported claims around OpenAI consulting-like deployments starting at very high figures have appeared in secondary sources, but I would treat exact figures cautiously unless confirmed in contracts or official pricing. Forbes reported OpenAI enterprise-grade deployment offerings starting at **$10m+**, but this should be treated as reported commentary, not standard public list pricing.

### Governments and regulated industries

Plausible package:

- **Security, compliance, and governance phase:** $500k–$2m
- **Pilot / controlled deployment:** $1m–$5m
- **Multi-year production programme:** $5m–$50m+
- **Higher support burden:** auditability, sovereign hosting, human review, procurement constraints.

These customers may pay more because risk, integration, and assurance requirements are heavier. The downside: sales cycles move with all the grace and urgency of a sleepy glacier.

### Mid-market companies

Plausible package:

- **Packaged deployment sprint:** $50k–$250k
- **Pre-built agent/workflow templates:** bundled or fixed fee
- **Platform subscription/API usage:** $50k–$500k annually
- **Partner-led implementation:** likely cheaper than direct frontier-lab FDE support.

Anthropic’s new enterprise AI services company explicitly targets **mid-sized companies**, which suggests a more packaged, repeatable, possibly partner-assisted model rather than bespoke Fortune 100 deployments only.

### Smaller companies

Plausible package:

- **Self-serve platform:** subscription/API usage
- **Training:** free to low-cost academy/certification
- **Partner marketplace:** implementation by agencies or smaller consultancies
- **No direct FDE team**, except for high-growth AI-native companies.

For small companies, frontier-lab deployment services probably only make sense if they are standardised or partner-led. Direct embedded teams are too expensive.

---

## 8. What would have to be true for this to be a big business?

For deployment services to justify large investment rounds or high valuations, at least one of the following must be true.

### First, services must create large recurring model revenue

A $2m deployment is useful. A $2m deployment that creates $10m per year of recurring API, agent, or enterprise subscription usage is much more interesting.

### Second, the work must become repeatable

If every deployment is bespoke, the business looks like consulting. If 60–80% becomes repeatable templates, connectors, eval suites, governance patterns, and agent blueprints, the business starts to look like software.

### Third, partners must absorb delivery capacity

OpenAI and Anthropic cannot personally deploy AI into every enterprise. Their partnerships with Accenture, Deloitte, BCG, McKinsey, Capgemini, AWS, Google Cloud, Microsoft, and others suggest they know this.

### Fourth, model usage must become embedded in core workflows

Occasional chat usage is not enough. The economics need recurring workflows: customer support, software development, compliance review, sales operations, claims processing, procurement, analytics, research, finance operations.

### Fifth, deployment learning must feed product roadmaps

The real prize is discovering repeatable enterprise workflows that become packaged agents, tools, plugins, connectors, or platform features.

### Sixth, gross margins must eventually look more like software than consulting

ServiceNow’s professional services gross loss is a warning sign: services can support a platform, but they are not automatically a beautiful standalone business.

---

## 9. Key economic tensions

### Helping customers use fewer tokens versus selling more model usage

A good deployment team should reduce waste: better prompts, shorter context, caching, model routing, smaller models where possible. But a lab also benefits from more usage. This creates a subtle conflict: the vendor should optimise for customer ROI, not token obesity. Nobody needs an enterprise agent that eats tokens like a Labrador eats unattended sandwiches.

### Bespoke work versus scalable product

Bespoke work wins customers. Productisation wins margins. The hard part is deciding which customer-specific requests are actually reusable patterns.

### High-talent costs versus repeatable delivery

FDEs, AI engineers, and solutions architects are expensive. If every customer requires elite talent forever, margins compress. If elite teams build playbooks that partners and customer teams can reuse, the economics improve.

### Customer value versus vendor lock-in

Deployment teams can create real customer value by integrating deeply into workflows. But the deeper the integration, the harder it is for customers to switch models or vendors. This may create procurement and governance pushback.

### Consulting margins versus software margins

Consulting can be profitable, but it usually does not scale like software. Salesforce, ServiceNow, and Palantir all point to the same lesson: the valuable long-term business is recurring platform revenue, not one-off implementation labour.

### Product discovery versus distraction

Deployment teams can reveal exactly what enterprises need. They can also become a dumping ground for custom requests. The difference is whether learning becomes product.

---

## 10. Risks and contradictions

### Risk 1: The consulting trap

Frontier labs may discover that enterprise deployment is slow, political, procurement-heavy, and integration-heavy. This is why Accenture exists. It was not because humanity lacked PowerPoint.

### Risk 2: Margin dilution

If services revenue becomes large but labour-heavy, investors may value it differently from software/API revenue.

### Risk 3: Partner conflict

If OpenAI or Anthropic build direct services arms, they may compete with the very consultancies and systems integrators they need for scale.

### Risk 4: Weak product pull

If customers need huge deployment teams to get value, that may signal the product is not yet easy enough to adopt.

### Risk 5: Token economics conflict

The best customer solution may reduce inference spend. That is good for ROI but potentially bad for model-provider revenue.

### Risk 6: Enterprise risk and liability

When agents touch core workflows, failures matter. Regulated industries will demand auditability, human controls, data boundaries, evals, and incident response.

### Risk 7: AI-native services companies become the real interface

Companies like Sierra, Harvey, Abridge, Decagon, Clay, and others may capture workflow-level value while labs provide the model layer underneath. OpenAI’s Frontier Partners list suggests it is actively trying to shape this ecosystem rather than ignore it.

---

## 11. Bottom-line interpretation

The most plausible business model is **not pure consulting**.

It is:

> **deployment services → successful production use cases → increased model/platform consumption → reusable product patterns → partner-led scaling → higher-margin recurring revenue.**

That makes these deployment companies economically rational even if the services themselves are only modestly profitable. The deployment layer helps solve the central enterprise AI problem: not “can the model do something impressive?”, but “can this organisation safely, repeatedly, and measurably change how work gets done?”

That is the real business. The consulting-looking bit is just the shovel.

---

## References

1. OpenAI — **OpenAI launches the OpenAI Deployment Company**  
   https://openai.com/index/openai-launches-the-deployment-company/

2. OpenAI — **Introducing Frontier Alliances**  
   https://openai.com/index/frontier-alliance-partners/

3. OpenAI — **OpenAI Frontier enterprise platform**  
   https://openai.com/business/frontier/

4. OpenAI — **The next phase of enterprise AI**  
   https://openai.com/index/next-phase-of-enterprise-ai/

5. OpenAI — **Introducing OpenAI Frontier / Frontier Partners**  
   https://openai.com/index/introducing-openai-frontier/

6. OpenAI Careers — **Forward Deployed Engineer role**  
   https://openai.com/careers/forward-deployed-engineer-london-london-uk/

7. Anthropic — **Building a new enterprise AI services company with Blackstone, Hellman & Friedman, and Goldman Sachs**  
   https://www.anthropic.com/news/enterprise-ai-services-company

8. Anthropic — **Claude Partner Network**  
   https://www.anthropic.com/news/claude-partner-network

9. Anthropic — **Deloitte partnership**  
   https://www.anthropic.com/news/deloitte-anthropic-partnership

10. Anthropic — **Accenture partnership**  
    https://www.anthropic.com/news/anthropic-accenture-partnership

11. Anthropic — **Claude across AWS, Google Cloud, and Microsoft Azure**  
    https://www.anthropic.com/news/anthropic-amazon-compute

12. Accenture — **FY2025 earnings / annual report materials**  
    https://newsroom.accenture.com/content/4q-full-fy25-earnings/accenture-reports-fourth-quarter-and-full-year-fiscal-2025-results.pdf

13. Fortune India / CRN — **Accenture GenAI bookings and revenue reporting**  
    https://www.fortuneindia.com/business-news/accenture-q4-earnings-annual-gen-ai-booking-touches-59-bn/127012

14. Salesforce — **FY2025 annual report / revenue mix**  
    https://www.publicnow.com/view/F6FEBDB4A3F905B92561159760A32EDF7054A22D

15. ServiceNow — **FY2025 results and professional services margin disclosure**  
    https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-Reports-Fourth-Quarter-and-Full-Year-2025-Financial-Results-Board-of-Directors-Authorizes-Additional-5B-for-Share-Repurchase-Program/default.aspx

16. AWS — **AWS Support pricing**  
    https://aws.amazon.com/premiumsupport/pricing/

17. Palantir — **AIP Bootcamp**  
    https://www.palantir.com/platforms/aip/bootcamp/

18. Palantir — **FY2025 financial summaries / gross margin**  
    https://www.moomoo.com/news/notice/306500427/palantir-10-k-fy2025-annual-report

19. BCG — **Rethinking B2B software pricing in the era of AI**  
    https://www.bcg.com/publications/2025/rethinking-b2b-software-pricing-in-the-era-of-ai

20. EY — **SaaS transformation with GenAI and outcome-based pricing**  
    https://www.ey.com/en_us/insights/tech-sector/saas-transformation-with-genai-outcome-based-pricing

21. Business Insider — **OpenAI forward-deployed engineering team reporting**  
    https://www.businessinsider.com/openai-forward-deployed-engineer-ai-adoption-colin-jarvis-2025-11

22. Forbes — **Reported OpenAI AI consulting/deployment pricing commentary**  
    https://www.forbes.com/sites/solrashidi/2025/07/16/openais-10m-ai-consulting-business-deployment-takes-center-stage/