# Agentic analytics is not text-to-SQL

*What Anthropic's self-service analytics stack gets right about semantic layers, skills, evals, and the data engineering work behind trustworthy answers.*

---

Anthropic's June 3, 2026 post on self-service analytics lands on a truth many AI analytics products prefer not to foreground: the hard part is not writing SQL. The hard part is making sure the system knows what the question means, which metric definition is official, which table is current, and whether the final answer deserves trust.

If you reduce agentic analytics to query generation, you narrow the problem too early. You start evaluating the visible last mile and ignore the infrastructure that determines whether the answer is useful or dangerous. Anthropic's own architecture makes that impossible to miss. Their stack puts data foundations, sources of truth, skills, and validation ahead of the moment when Claude ever touches a query.

My read is that this is the real contribution in the piece. The impressive number is that Anthropic says Claude now automates 95% of business analytics queries at roughly 95% aggregate accuracy. The more useful lesson is why that became possible. SQL sits downstream of meaning.

---

## What will we cover in this post?

- **Why do so many teams reduce agentic analytics to text-to-SQL?** — Why the category keeps getting framed around query generation, and why that framing feels right until it breaks.
- **What did Anthropic actually build for self-service analytics?** — The architecture behind the headline numbers: data foundations, sources of truth, skills, and validation.
- **Why is data ambiguity the real problem in analytics agents?** — Why analytics fails before syntax fails, and why business meaning dominates the risk surface.
- **What does an agentic analytics stack need before it writes SQL?** — The data engineering layer that shrinks ambiguity before the agent starts exploring.
- **Why is the semantic layer the agent's map?** — Why governed definitions, grain, joins, and source priority do more for quality than another prompt tweak.
- **Why do skills change the accuracy story?** — Why procedural knowledge matters so much, and why Anthropic's biggest accuracy jump comes from there.
- **Why do evals and maintenance matter as much as prompts?** — Why drift, provenance, offline tests, and correction loops are part of the product.
- **What should data teams do if they want agentic analytics now?** — A practical starting sequence for teams that want to move without building a cathedral on day one.

---

## Why do so many teams reduce agentic analytics to text-to-SQL?

Because text-to-SQL is the part you can demo in thirty seconds.

Ask a question in plain English. Watch the model generate a query. Run it against the warehouse. Return a number or a chart. The interaction looks magical, and for a moment it feels like the analytics layer has been solved.

That is the seductive version of self-service analytics. Anthropic names the danger clearly in its post: pointing Claude at a warehouse can create a [false sense of precision](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude). The number looks clean. The query ran. The explanation sounds confident. None of that proves the business question was answered correctly.

The category itself encourages the narrower framing. Snowflake's official [Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst) documentation describes the product as a way to turn natural language questions into accurate SQL responses over structured data. That is a reasonable description of one important capability. It still nudges the conversation toward query generation first, meaning second.

The order matters. A stakeholder asks, "What was active customer revenue last month?" Every noun in that sentence hides a decision. What counts as active? Which customer definition is official? Gross revenue or net revenue? Which date field? Which time zone? Which refunds, fraud filters, or product exclusions apply? The SQL comes after those choices. It does not rescue you from them.

That is why a valid query and correct analytics are different things. A query can execute successfully against the wrong source table. A chart can render on the wrong grain. A number can match the wording of the question while still violating the company's actual metric definition.

If the category stays trapped inside text-to-SQL, teams will keep optimizing the wrong thing. They will celebrate query generation while leaving ambiguity, provenance, and validation underdesigned.

## What did Anthropic actually build for self-service analytics?

Anthropic did not describe a model connected directly to a warehouse. They described a layered analytics system with Claude at the front.

The article organizes that system into four parts. First come **data foundations**: canonical datasets, data models, transforms, tests, freshness checks, and metadata. Then come **sources of truth**: the semantic layer, lineage, business context, and curated reference material that helps the agent map a question onto governed meaning. Then come **skills**: domain procedures that tell the model how to work, not just what data exists. Finally comes **validation**: offline evals, online checks, provenance, and maintenance loops.

That stack explains the headline result better than the model choice does. Anthropic says Claude now automates 95% of business analytics queries at roughly 95% aggregate accuracy. Read too quickly, that sounds like a model benchmark. Read carefully, it is a systems benchmark. Their article spends far more time on the harness around Claude than on Claude itself.

That fits the broader design philosophy in Anthropic's [building effective agents](https://www.anthropic.com/engineering/building-effective-agents) guidance. The recurring advice there is to start from the simplest structure that can work, then add tools, retrieval, and workflow logic where the task genuinely demands it. The analytics case does demand it, because the model is not operating in a clean objective environment. It is operating inside a moving business ontology.

So the right mental model here is not "Anthropic taught Claude analytics." It is "Anthropic built a governed workflow that makes analytics questions legible to Claude."

That distinction sets up the deeper question. Why does analytics need so much scaffolding in the first place?

## Why is data ambiguity the real problem in analytics agents?

Anthropic answers that with one of the strongest lines in the article: data is not software.

Coding agents have plenty of failure modes, but they also inherit unusually strong guardrails. They can compile code, run tests, inspect stack traces, follow repository structure, and compare behavior against expected outputs. Those checks do not remove ambiguity, but they do create dense feedback loops.

Analytics work fails differently. In Anthropic's framing, there is often one correct answer from one correct source, yet no deterministic way to prove that answer is correct from the final output alone. The system can write perfect SQL and still miss the business meaning entirely.

Anthropic groups most of the risk into three failure modes.

**Concept/entity ambiguity.** The user says "active users" or "revenue" or "retention," and the agent has to choose among multiple plausible implementations. Those choices are often subtle enough that the wrong answer still looks professional.

**Data staleness.** Tables, business rules, and documentation change. A metric that was valid three weeks ago becomes quietly wrong after a schema change, a new exclusion rule, or a dashboard rewrite.

**Retrieval failure.** The right answer exists somewhere in the stack, but the search space is too large. The model misses the correct table, metric, or document and confidently builds on a near miss.

This is why the warehouse alone is not enough. Warehouses store data. They do not automatically store the full meaning of the business. That meaning lives across metric definitions, semantic models, caveats, human conventions, ownership, and historical context.

Think again about the simple question from earlier: "What was active customer revenue last month?" The hard part is not producing a `GROUP BY`. The hard part is deciding whether "active" means one purchase in the last 30 days, non-fraud paid usage in the billing period, or some domain-specific threshold defined in the semantic layer and nowhere else.

Once the meaning is settled, the SQL is often ordinary. That is the uncomfortable implication for teams selling query generation as the centerpiece. In analytics, syntax is frequently the easy part.

## What does an agentic analytics stack need before it writes SQL?

It needs the same boring foundations that strong analytics teams have always needed, with one difference: the consumer is now an agent as often as it is a human analyst.

Anthropic is explicit that standard data engineering still applies. Dimensional modeling. Freshness checks. Completeness checks. Clear ownership. Consumption-ready canonical datasets. None of that disappears because the interface becomes conversational.

If anything, the stakes increase. A human analyst can sometimes smell that a table looks wrong. An agent can scale a bad assumption much faster.

The idea I like most in this section of Anthropic's article is that data models are now agent-facing infrastructure. A clean warehouse used to help analysts onboard faster. Now it also teaches the system which entities are real, which paths are preferred, and which definitions are official.

That has practical implications:

- Canonical datasets reduce the number of plausible answers before retrieval begins.
- Rich metadata gives the agent a usable description of tables, columns, grain, owners, and caveats.
- Colocating models, docs, dashboards, and skill files makes drift visible when one layer changes and the others do not.
- Enforcement matters. Governance that nobody follows just recreates the ambiguity the agent was supposed to escape.

This is one reason I do not buy the lazy narrative that AI analytics will make data engineering less important. The opposite feels closer to the truth. As more questions get routed through models, the quality of the modeling layer becomes more visible, not less.

That pattern shows up outside Anthropic too. The [dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl) exists to centralize metric definitions and make them reusable across tools. Microsoft's [Power BI guidance for Copilot](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-prepare-data-ai) recommends AI-ready schemas, verified answers, and explicit instructions so the model has grounded context before it responds. Different products, same lesson: prepared context is part of the answer.

Once you accept that, the next layer becomes even more important. If the warehouse is the terrain, the semantic layer is the map.

## Why is the semantic layer the agent's map?

Because it tells the model what the business has already decided.

The semantic layer defines official metrics, valid dimensions, join paths, grain, standard filters, and preferred source entities. In other words, it turns a vague business question into a governed route through the data model.

Anthropic says its agents are structurally required to consult the semantic layer first. That is a strong operating principle. The model should begin from governed meaning, not from open exploration of raw tables.

That design choice matters more than it might sound. Many teams assume an LLM can help bootstrap the semantic layer itself by reading raw tables and old queries. Anthropic tried a version of that and found it net-negative on evals. The generated definitions looked plausible, but they reproduced the same ambiguity the semantic layer was supposed to remove.

That result deserves to be stated plainly: let the model help document the business if you want. Do not let it define the business.

This is another place where the market is converging. Snowflake's [semantic model layer in Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst) exists to bridge business questions and database structure. Databricks' [Genie](https://docs.databricks.com/aws/en/genie) asks domain experts to provide datasets, instructions, sample SQL, and business context. dbt's semantic layer centralizes metric logic so downstream tools stop reinventing it. Microsoft pushes verified answers and AI instructions into the BI model itself.

The shared pattern is easy to miss if you focus only on the chat interface. All of these systems are trying to narrow the space of legitimate interpretations before the model gets creative.

| Platform | Grounding layer | What it contributes |
|---|---|---|
| Anthropic | Semantic layer + sources of truth | Official metrics, source priority, business context |
| Snowflake | Semantic models | Mapped business entities, reusable query paths, verified queries |
| Databricks | Genie space configuration | Instructions, curated datasets, sample SQL, trusted assets |
| dbt | Semantic layer | Centralized metric definitions and reusable logic |
| Power BI | AI-ready semantic model | Verified answers, instructions, grounded BI context |

Without that map, the agent is guessing. With it, the model can spend its effort reasoning over a constrained world instead of inventing the world from scratch.

The map still does not tell the agent how to work, though. It tells the agent what the world means. The procedure comes next.

## Why do skills change the accuracy story?

Because metadata is declarative. Analytics work is procedural.

A semantic layer can tell the agent what revenue means. It cannot, by itself, tell the agent what sequence of steps a good analyst should follow when a stakeholder asks an ambiguous question with two possible source paths and a known edge case in one region.

That is where Anthropic puts skills. In the generic Claude Code sense, [skills](https://code.claude.com/docs/en/skills) are reusable instructions that Claude loads on demand. In the analytics system described here, they function more like encoded analyst playbooks.

They carry procedural knowledge:

- which source to consult first
- when to use the semantic layer and when to fall back
- what clarifying questions to ask
- which caveats matter in this domain
- how to review the result adversarially
- what provenance to include in the final answer

Anthropic's strongest number appears in this section. According to the article, Claude did not exceed 21% on their analytics evals without skills. With the skill layer in place, accuracy moved above 95% in aggregate and reached roughly 99% in some domains.

That is the moment when the whole category description has to change. If the largest performance jump comes from procedural guidance rather than from better SQL generation, then the system is not fundamentally a text-to-SQL product. It is an analytics workflow product with query execution inside it.

I like Anthropic's distinction between knowledge skills and execution skills. One helps the model find and load the right domain context. The other tells it how to perform the analysis, review the output, and present the answer. That pairing resembles how strong analysts actually work. First orient. Then execute.

This also explains why so many analytics demos feel thin. They give the model access to data and maybe to examples. They do not give it a disciplined procedure. The result is a conversational interface that can fetch numbers but cannot reliably behave like an analyst.

That is the real threshold for calling something agentic in this domain. The agent is not just retrieving context and generating syntax. It is following a workflow with domain-specific judgment embedded into it.

## Why do evals and maintenance matter as much as prompts?

Because even a well-grounded analytics agent decays.

Anthropic treats validation and maintenance as first-class layers of the system, and that is exactly right. Once you have semantic layers, curated examples, and skills, the next failure mode is drift. Tables change. Business definitions shift. Dashboards get rebuilt. Skills quietly stop matching the source model. Yesterday's correct procedure becomes tomorrow's stale context.

The article gives a stark example. Anthropic says offline accuracy dropped from roughly 95% to roughly 65% over the course of a month before they started treating skill maintenance as an engineering problem. That number matters because it turns maintenance from a nice-to-have into a reliability requirement.

The evaluation stack in the piece is also unusually practical. Anthropic describes offline evals based on known question-answer pairs, dashboard-backed checks for common requests, ablation testing to see which structural changes actually help, provenance footers in online responses, passive monitoring, and a correction-harvesting loop where production failures become new eval cases.

That is how mature analytics systems should be tested. Not with vibes. Not with a handful of good-looking screenshots. With stored cases, explicit assertions, and a feedback loop that updates the playbook when the system fails.

Databricks surfaces a similar instinct in its [Genie documentation](https://docs.databricks.com/aws/en/genie): response inspection, benchmarks, trusted assets, and curated instructions are built into the product experience. Again, different implementation, same lesson. Evaluation is part of the interface.

This is also where prompts start to look less central than people expect. Prompt quality still matters. But if your semantic layer is weak, your examples are stale, your skills drift, and your evals are absent, no heroic prompt is going to save the system for long.

By this point the architecture lesson should be hard to ignore. Agentic analytics works when the surrounding system behaves like a maintained product, not when the model is allowed to improvise from raw access.

## What should data teams do if they want agentic analytics now?

Start smaller than the demos suggest, and more seriously than the demos imply.

Anthropic's [building effective agents](https://www.anthropic.com/engineering/building-effective-agents) argues for the simplest structure that can work. Their analytics article follows the same logic in practice. So if you want to build toward agentic analytics, I would start with five concrete steps.

1. **Choose one domain, not the whole warehouse.** Revenue quality, support operations, growth funnels, finance reporting. Pick an area with one clear owner and recurring questions.
2. **Create one governed source of truth.** Before touching prompts, make sure the domain has canonical datasets, explicit metric definitions, ownership, and basic freshness checks.
3. **Put the semantic layer first and make raw SQL a fallback.** If the question maps cleanly to governed meaning, the agent should not freestyle its path through raw tables.
4. **Write one thin skill or playbook.** Encode the procedure a good analyst would follow in that domain: clarify, source, validate, report, cite provenance.
5. **Build a small eval set before broad rollout.** Twenty to thirty real questions with expected answers and known edge cases will teach you more than a hundred internal demos.

After that, measure where the system fails. If most failures come from ambiguity, invest in semantic definitions and metadata. If they come from inconsistent workflows, improve the skill layer. If they come from drift, treat maintenance and monitoring as owned engineering work.

What I would not do is start by wiring a frontier model directly to the warehouse and calling the result a strategy. That approach teaches you very little besides how convincing a wrong answer can sound.

Text-to-SQL still has a place in this stack. It is a useful execution capability. It is just too small a concept to carry the whole system.

## Closing thoughts

The phrase "agentic analytics" will keep getting used loosely for a while. Some teams will mean text-to-SQL with a chat box. Some will mean a semantic layer plus retrieval. Some will mean a fuller workflow with validation and memory.

Anthropic's article helps because it makes the dependencies visible. The trustworthy answer is not created at the moment SQL appears on screen. It is created earlier, when the system narrows ambiguity, loads governed meaning, follows a domain procedure, and validates the result before handing it back.

That is why I think the post matters. It gives data teams a better category boundary. Query generation is part of agentic analytics. It is not the center of it.

If the industry absorbs that lesson, we will talk less about whether the model can write SQL and more about whether the system deserves to be trusted with a business question in the first place.

## Now, I want to hear from you

I think this topic is going to split teams into two camps: those who see text-to-SQL as the product, and those who see it as one small layer inside a much broader analytics workflow.

- Where have you seen the biggest failures so far: ambiguity, retrieval, staleness, or weak process?
- Does your team already have the foundations an analytics agent would need, or would the project expose a lot of hidden data-model debt?
- If you are building in this space, what sits in your "skill layer" today: prompts, runbooks, SQL examples, analyst checklists, or something else?

---

## References

[How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude) — Anthropic's June 3, 2026 article describing its analytics architecture, failure modes, skill layer, and validation stack.

[Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst) — Snowflake's official documentation for conversational analytics over structured data, including semantic models, verified queries, and monitoring.

[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic's broader guide to workflow design, tool use, and when added agent complexity is justified.

[dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl) — dbt documentation on centralized metric definitions and reusable semantic logic across tools.

[Prepare your data for AI to improve Copilot results](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-prepare-data-ai) — Microsoft's Power BI guidance on AI-ready schemas, verified answers, and instructions for grounded analytics responses.

[What is a Genie Space](https://docs.databricks.com/aws/en/genie) — Databricks documentation on configuring Genie with datasets, instructions, sample SQL, trusted assets, and inspection workflows.

[Extend Claude with skills](https://code.claude.com/docs/en/skills) — Anthropic's skills documentation explaining how reusable procedural instructions load on demand.
