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

---

## Brainstorm Summary

Anthropic's June 3, 2026 article on self-service analytics gives Jose a strong way to reframe the category. The useful insight is not that Claude can answer analytics questions. The useful insight is that Anthropic had to build a serious stack around Claude before those answers became trustworthy. That stack includes canonical datasets, metadata, semantic grounding, skills, evals, and maintenance. The post's core argument is that this is what "agentic analytics" should mean in practice.

The audience is technical and close to the problem: data scientists, analytics engineers, analytics leaders, and AI builders who are either evaluating text-to-SQL systems or already trying to deploy conversational analytics. They do not need a product tour. They need a mental model that separates "SQL was generated" from "the business question was answered correctly."

The tone should stay analytical and calm, not anti-vendor and not anti-SQL. Text-to-SQL remains useful. It is simply too narrow to describe the real system. Anthropic's own evidence supports that claim: the three main failure modes are ambiguity, staleness, and retrieval failure; the biggest accuracy jumps come from skills and procedural guidance; and maintenance plus validation are treated as engineering problems, not afterthoughts.

The structural arc should build naturally: start with the seductive but incomplete text-to-SQL framing, show what Anthropic actually built, explain why data ambiguity dominates analytics work, then move through the stack in order of dependency. End with concrete guidance for data teams that want to start without overbuilding.

## Possible Structure

1. Why people keep reducing analytics agents to text-to-SQL
2. What Anthropic actually demonstrated
3. The missing layers: planning, validation, iteration, interpretation
4. Why this matters for real data work
5. What "agentic analytics" should mean going forward

## Rough Table of Contents

- **Intro** — Thesis-led opening using Anthropic's article as the entry point: the hard part in analytics agents is not SQL generation but making the answer trustworthy.
- **Why do so many teams reduce agentic analytics to text-to-SQL?** — The market default, why it is seductive, and why it narrows the problem too early.
- **What did Anthropic actually build for self-service analytics?** — The architecture in the June 3, 2026 article: data foundations, sources of truth, skills, and validation.
- **Why is data ambiguity the real problem in analytics agents?** — Concept/entity ambiguity, staleness, retrieval failure, and why analytics differs from coding.
- **What does an agentic analytics stack need before it writes SQL?** — Canonical datasets, metadata, ownership, and colocated artefacts.
- **Why is the semantic layer the agent's map?** — Official meaning, joins, grain, allowed paths, and the danger of letting an LLM define the business.
- **Why do skills change the accuracy story?** — Procedural knowledge, pairwise skills, common analysis patterns, and Anthropic's 21% to 95%+ claim.
- **Why do evals and maintenance matter as much as prompts?** — Drift, offline evals, ablations, provenance, online validation, and feedback loops.
- **What should data teams do if they want agentic analytics now?** — A practical starting sequence for teams that want value without unnecessary complexity.
- **Closing thoughts** — Text-to-SQL is one visible step inside a broader governed system.

## Anthropic quote bank

### Exact short quotes we can use

- "false sense of precision"
- "Data is not software"
- "no deterministic way of proving the correctness"
- "Treat metadata as a first-class product"

### Strong statistics / statements to cite

- Anthropic says 95% of business analytics queries are automated via Claude with roughly 95% aggregate accuracy.
- Anthropic says Claude did not exceed 21% accuracy on analytics evals without skills, then moved above 95% in aggregate with skills.
- Anthropic says offline accuracy fell from roughly 95% to roughly 65% over a month before they treated skill maintenance as an engineering problem.
- Anthropic says the semantic layer is the mandatory default path, with raw SQL as fallback when coverage is missing.

### Paraphrase-only points worth using

- Analytics has one correct answer from one correct source more often than coding does, but the correctness is harder to prove from the output alone.
- Query history by itself was weak as a retrieval layer; curated reference docs and skills were more useful than dumping thousands of old SQL files into search.
- Anthropic's stack is ordered to reduce ambiguity first, then retrieval error, then execution error.
