# Outline: Agentic analytics is not text-to-SQL: what Anthropic got right about self-service data

**Target:** ~15 min read (~3750 words)

## Sections

### Preview section
- Labelled bullet list — one entry per major content section
- Sources: n/a (structural)

### 1. Why do so many teams reduce agentic analytics to text-to-SQL?
- Open with the seductive simplicity of "chat with your data" and explain why query generation became the visible center of the category.
- Use Anthropic's "false sense of precision" framing and Snowflake's text-to-SQL language as evidence that the market keeps narrowing the problem too early.
- Sources: [How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude), [Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst)

### 2. What did Anthropic actually build for self-service analytics?
- Summarize the architecture Anthropic describes: data foundations, sources of truth, skills, and validation.
- Position the 95% query automation / ~95% aggregate accuracy claim as the result of the stack, not of raw SQL generation.
- Sources: [How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude), [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

### 3. Why is data ambiguity the real problem in analytics agents?
- Explain why analytics differs from coding: one correct answer, ambiguous business meaning, no simple deterministic proof.
- Walk through Anthropic's three failure modes and ground them in one practical business-question example.
- Sources: [How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)

### 4. What does an agentic analytics stack need before it writes SQL?
- Shift the discussion toward data foundations: canonical datasets, metadata, ownership, colocated artefacts, and context preparation.
- Show that "boring" data engineering work becomes more valuable once the agent is the consumer of the model.
- Sources: [How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude), [dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl), [Prepare your data for AI to improve Copilot results](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-prepare-data-ai)

### 5. Why is the semantic layer the agent's map?
- Go deep on semantic grounding: official metric definitions, grain, joins, allowed dimensions, and source priority.
- Use Anthropic's failed attempt to auto-generate definitions to argue that LLMs can document the business but should not define it.
- Sources: [How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude), [What is a Genie Space](https://docs.databricks.com/aws/en/genie), [Cortex Analyst](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst)

### 6. Why do skills change the accuracy story?
- Frame skills as procedural knowledge: the encoded workflow of a strong analyst, not generic documentation.
- Use Anthropic's 21% → 95%+ claim as the centerpiece and clarify the distinction between semantic meaning and procedural execution.
- Sources: [How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude), [Extend Claude with skills](https://code.claude.com/docs/en/skills)

### 7. Why do evals and maintenance matter as much as prompts?
- Cover offline evals, ablations, provenance, correction harvesting, maintenance drift, and why the system decays without owners.
- Use Databricks' inspection/benchmark features as supporting evidence that evaluation is part of the product surface.
- Sources: [How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude), [What is a Genie Space](https://docs.databricks.com/aws/en/genie)

### 8. What should data teams do if they want agentic analytics now?
- End with a Monday-morning playbook: choose one domain, define one governed source of truth, create one skill, and build evals before broad rollout.
- Keep the closing pragmatic: start simple, measure, then add complexity only where it improves outcomes.
- Sources: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), [How Anthropic enables self-service data analytics with Claude](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)

### Closing section
- Named `##` heading: `## Closing thoughts`
- Synthesis of the argument: text-to-SQL is one narrow visible step inside a wider governed analytics system.
- Sources: synthesis — no external source

### Now, I want to hear from you
- Named `##` section — always `## Now, I want to hear from you`
- 2–4 specific questions tied to semantic grounding, skills, evals, and trust in analytics agents
- Sources: n/a (structural)
