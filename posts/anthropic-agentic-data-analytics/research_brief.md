# Research Brief: Agentic analytics is not text-to-SQL: what Anthropic got right about self-service data

**Generated:** 2026-06-13

## Summary

`notes.md` contained no external URLs before research. I added 7 primary sources chosen to support the full argument: Anthropic's self-service analytics article as the anchor, Anthropic's agent design guidance for the general architecture framing, Claude Code skills documentation for the procedural layer, and four platform/docs sources showing that semantic grounding, instructions, and evaluation are recurring patterns across production analytics systems. No major research gaps remain for the current thesis.

## Sources

### Why do so many teams reduce agentic analytics to text-to-SQL?

- **[How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)**
  Anthropic's June 3, 2026 article is the anchor source for the post. It introduces the "false sense of precision" framing, argues that analytics accuracy is a context-and-verification problem, and lays out the three failure modes the rest of the article addresses.

- **[Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst)**
  Snowflake's official documentation is useful as a contrast source because it explicitly frames the problem as production-grade text-to-SQL, then adds semantic models, custom instructions, verified queries, monitoring, and evaluations around that core. Helpful for showing why the category keeps getting described too narrowly.

### What did Anthropic actually build for self-service analytics?

- **[How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)**
  Covers the stack structure directly: data foundations, sources of truth, skills, and validation. Also includes the headline operational claim that Anthropic automates 95% of business analytics queries via Claude at roughly 95% aggregate accuracy.

- **[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)**
  Anthropic's broader agent-design post provides the general architecture lens: workflows vs agents, when complexity is warranted, and why retrieval, tools, and evaluation usually matter more than ornamental complexity. Useful for contextualizing why Anthropic's analytics system looks like a compound workflow rather than a single prompt.

### Why is data ambiguity the real problem in analytics agents?

- **[How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)**
  The "Data is not software" section is the main source here. It explains why analytics differs from coding: one correct answer, no simple deterministic proof of correctness, and three dominant failure modes that all happen before SQL syntax becomes the interesting part.

### What does an agentic analytics stack need before it writes SQL?

- **[dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl)**
  dbt's documentation supports the argument that centralized metric definitions and join handling are infrastructure, not optional polish. Useful for grounding the claim that governed meaning needs to live in the modeling layer, not in each downstream tool or prompt.

- **[Prepare your data for AI to improve Copilot results](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-prepare-data-ai)**
  Microsoft's Power BI guidance is useful because it makes the same argument in different language: AI data schemas, verified answers, and instructions reduce ambiguity and create grounded, context-aware responses. Good supporting evidence that serious analytics systems are converging on prepared context, not just query generation.

### Why is the semantic layer the agent's map?

- **[How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)**
  Anthropic explicitly says the semantic layer is the mandatory first path for governed questions and reports that LLM-generated metric definitions from raw tables/query logs were net-negative on evals. This is the strongest source for the "humans must own definitions" argument.

- **[What is a Genie Space](https://docs.databricks.com/aws/en/genie)**
  Databricks' Genie docs show a similar pattern: domain experts configure datasets, sample SQL, business-semantics expressions, instructions, and metadata so Genie can answer questions more accurately. Good for showing that semantic grounding and authored instructions recur outside Anthropic.

- **[Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst)**
  Snowflake documents semantic models as the mechanism that bridges business questions and databases, which is directly relevant to the "agent's map" framing.

### Why do skills change the accuracy story?

- **[How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)**
  This is the key source for the strongest performance delta in the post: without skills, Claude did not exceed 21% on Anthropic's analytics evals; with skills, results moved above 95% in aggregate and around 99% in some domains. It also explains pairwise skills, reference docs, and the analyst-playbook framing.

- **[Extend Claude with skills](https://code.claude.com/docs/en/skills)**
  Anthropic's official skills docs provide the generic definition of a skill as reusable instructions that Claude loads on demand. Helpful for explaining the concept to readers who know analytics but not Claude Code terminology.

### Why do evals and maintenance matter as much as prompts?

- **[How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)**
  The validation section covers offline evals, ablation methodology, provenance footers, passive monitoring, and correction harvesting. It also includes the maintenance-drift claim: offline accuracy fell from roughly 95% to roughly 65% over a month before Anthropic treated skill maintenance as an engineering problem.

- **[What is a Genie Space](https://docs.databricks.com/aws/en/genie)**
  Databricks documents response inspection, trusted assets, and benchmarks, which helps reinforce that evaluation and validation sit inside the product rather than outside it.

### What should data teams do if they want agentic analytics now?

- **[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)**
  Useful for the closing recommendation to start with the simplest system that can work, then add complexity only where measurement shows it helps.

- **[How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)**
  The "Getting started" section offers a practical minimal path: a handful of canonical datasets, a few dozen offline evals, and a thin knowledge skill.
