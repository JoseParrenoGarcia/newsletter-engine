# Notes

## Starter Idea

- Topic: Anthropic agentic data analytics
- Core angle: agentic data analytics is not just text-to-SQL
- Working framing: Anthropic's example shows that useful analytics agents need planning, iteration, validation, tool use, and interpretation, not just query generation

## Early Thesis Draft

Anthropic's agentic data analytics framing is useful because it moves the conversation beyond "natural language in, SQL out." The real value of an analytics agent is in the full workflow around the query: understanding the business question, deciding what data matters, iterating on intermediate results, validating assumptions, and turning outputs into analysis.

## Questions To Explore

- What exactly did Anthropic show or publish?
- Which parts of the workflow go beyond text-to-SQL?
- What kinds of analysis require more than SQL generation?
- Where does interpretation end and real agentic reasoning begin?
- What would a weak "text-to-SQL only" system miss in practice?
- What does this imply for data scientists, analytics engineers, and AI product teams?

## Angles Worth Considering

- Text-to-SQL is only one tool call inside a larger analytics loop
- Good analytics requires question clarification, not just database access
- Validation and skepticism are part of the product, not optional extras
- The output should be insight, not just executable SQL
- Agentic analytics looks closer to junior-analyst workflow automation than to query autocomplete

## Raw Notes / Sources To Add

- Add links to Anthropic posts, demos, docs, or videos here
- Add screenshots or PDFs here if you collect them
- Add your own commentary and rough paragraphs below as they come

## Source Intake

### Local files added

- `Agentic analytics is not text.docx`
- `How Anthropic enables self-service data analytics with Claude | Claude.pdf`

### Key points from the DOCX

- The central thesis is explicit: agentic analytics is not just text-to-SQL.
- The stronger framing is that reliable analytics agents depend on business understanding, governed definitions, semantic layers, skills, evals, metadata, and data engineering discipline.
- A useful contrast for the post is "valid SQL" versus "correct analytics."
- The draft already outlines strong sections on false precision, ambiguity in business questions, semantic layers, metadata, and old-school data engineering becoming more important in the LLM era.

### Key points from the Anthropic PDF

- Anthropic says that pointing Claude directly at the warehouse can create a "false sense of precision."
- Their framing is that analytics accuracy is mainly a context and verification problem, not a code-generation problem.
- They identify three major failure modes: concept/entity ambiguity, data staleness, and retrieval failure.
- Their stack emphasizes data foundations, sources of truth, skills, and validation rather than raw SQL generation alone.
- A notable proof point from the article: Anthropic says 95% of business analytics queries are automated via Claude at roughly 95% aggregate accuracy.

### Immediate writing angle

The post should not argue that text-to-SQL is useless. It should argue that text-to-SQL is only one narrow capability inside a much larger analytics system. Anthropic's own architecture makes that visible: the hard part is not generating a query, but constraining meaning, finding the right source of truth, validating the result, and returning something trustworthy enough for business use.

## Possible Structure

1. Why people keep reducing analytics agents to text-to-SQL
2. What Anthropic actually demonstrated
3. The missing layers: planning, validation, iteration, interpretation
4. Why this matters for real data work
5. What "agentic analytics" should mean going forward
