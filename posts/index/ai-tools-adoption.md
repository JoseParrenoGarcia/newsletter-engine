# AI Tools & Adoption — Post Cards

> **Agent note:** do NOT read pipeline artefacts. Use the `Path` in each card.

---

<!-- slug: open-source-models-good-enough -->
<a name="open-source-models-good-enough"></a>
### Open source models have lagged. So what?

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Engineers, PMs, founders, and technical managers who make or influence AI tooling decisions |
| **Topics** | `capability-gap` `model-selection` `cost-optimisation` `open-source-models` `chinese-models` |
| **Path** | `posts/open-source-models-good-enough/long_draft.md` |

**Summary:** Frontier models (Anthropic, OpenAI) lead open source by roughly 6–12 months, but that headline gap obscures a more useful truth: most production workloads — summarisation, classification, code generation for well-scoped tasks, structured extraction — don't sit at the frontier. The post builds a task taxonomy that separates what genuinely requires frontier reasoning from what doesn't, then makes a concrete cost case for open source using real inference pricing. It profiles the leading Chinese open source models (DeepSeek, Qwen) and their current capability ceiling. The argument closes with a Vegetius-style provocation: you don't need open source today, but you'll need the muscle memory of having experimented with it before the moment you do.

---

<!-- slug: anthropic-agentic-data-analytics -->
<a name="anthropic-agentic-data-analytics"></a>
### Agentic analytics is not text-to-SQL: what Anthropic got right about self-service data

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Data scientists, analytics engineers, analytics leaders, and technical practitioners building or evaluating AI systems for business analytics |
| **Topics** | `agents` `data-science` `llm-impact` `problem-framing` `automation` |
| **Path** | `posts/anthropic-agentic-data-analytics/long_draft.md` |

**Summary:** Most of the market has collapsed agentic analytics into text-to-SQL, which misframes the actual problem. Anthropic's self-service analytics architecture reveals what's missing: governed semantic layers, procedural skill workflows, disambiguation loops, and validation — all ahead of query generation. The three real failure modes are concept/entity ambiguity, data staleness, and retrieval failure, and all three are fundamentally data engineering problems, not model problems. The post traces why the semantic layer is mandatory first-path infrastructure, why the skill layer (not the model) drives the 21% to 95%+ accuracy jump, and why evals, provenance, and maintenance are part of the product rather than optional extras. It closes with concrete steps for data teams starting to build trustworthy analytics agents now.

---

<!-- slug: ai-labs-becoming-consultancies -->
<a name="ai-labs-becoming-consultancies"></a>
### OpenAI and Anthropic are becoming consultancies (and you shouldn't be worried about it)

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Data science and technology leaders in mid-to-large organisations who want a clear-eyed strategic read on what OpenAI and Anthropic are building and what it means for their teams |
| **Topics** | `llm-impact` `automation` `career` `data-science` `problem-framing` |
| **Path** | `posts/ai-labs-becoming-consultancies/long_draft.md` |

**Summary:** OpenAI and Anthropic have both built formal enterprise AI deployment arms — OpenAI via a majority-owned Deployment Company with $4B+ and ~150 Forward Deployed Engineers, Anthropic via a PE-backed services company with Blackstone, Goldman Sachs, and Hellman & Friedman. The post argues the "labs becoming consultancies" headline misframes a more precise story: the two labs are running different bets (OpenAI vertically ambitious, Anthropic ecosystem-led), targeting large enterprise and regulated industries — not individual DS teams or mid-market organisations. It traces why the consulting layer always returns across every major enterprise technology wave (ERP, RPA, cloud), grounds the economics in Salesforce, ServiceNow, and Palantir financials, and closes with three concrete actions for DS leaders: a gap analysis against FDE job descriptions, a productisation horizon question for current workflows, and a half-day team session to document AI deployment ownership before someone else defines it for you.

---
