# Post Index

> **Agent note:** this file is the topic overview. For detailed summaries
> and paths, read `posts/index/<topic-group>.md`.
> Do NOT crawl `posts/*/` or `reference_posts/` directly.

---

## Table of Contents

| Title | Topic group | One-liner |
|-------|-------------|-----------|
| [Claude Code Plugins: How to Build, Version, and Maintain Them](#claude-code-plugins) | Claude Code | Plugins are the packaging and distribution layer for skills, hooks, and agents — here's how to build, version, validate, and push updates. |
| [How Claude Code rules actually work](#how-claude-code-rules-actually-work) | Claude Code | Rules are markdown files loaded into context — here's exactly how Claude discovers, prioritises, and applies them. |
| [You (probably) don't understand Claude Code memory.](#claude-code-memory-explained) | Claude Code | Memory is markdown injected at session start — here's the full hierarchy and what belongs where. |
| [Claude Code agents: what they actually are](#claude-code-agents-explained) | Claude Code | Agents are isolated execution contexts, not smarter prompts — here's the mental model and when to use them. |
| [Claude Code agent teams: when and how to go multi-agent](#claude-code-agent-teams) | Claude Code | Add more agents only when you have a clear reason — four patterns, eight failure modes, one decision framework. |
| [What the docs don't tell you about Claude Code skills](#claude-code-skills-explained) | Claude Code | The real power of skills lives in the design patterns the docs skip — anatomy, hidden gems, and composability. |
| [You Don't Need Ultrathink. You Need a Plan.](#claude-code-thinking-planning-goal-mode) | Claude Code | Planning mode is the organising discipline for agentic coding — thinking levels and goal mode are knobs within it. |
| [DS-STAR: How Google Built a Data Science Agent That Actually Works](#ds-star-data-science-agent) | Paper Explainers | DS-STAR beats raw Gemini by 32 points — because the harness matters more than the model. |
| [Airbnb's 2013 Location Model: Lessons in Feature Engineering](#airbnb-location-model) | Paper Explainers | One feature made Airbnb's search smarter — a step-by-step breakdown of how domain knowledge becomes a model. |
| [How Airbnb Learned Listing Embeddings — Part 1](#airbnb-listing-embeddings-1) | Paper Explainers | How Airbnb trained listing embeddings for real-time personalisation using Word2Vec adapted for booking sessions. |
| [How Airbnb Learned to Personalise Search with Embeddings — Part 2](#airbnb-listing-embeddings-2) | Paper Explainers | User types, listing types, host rejections — how embeddings became real-time ranking features at Airbnb. |
| [How Airbnb Used Deep Learning to Rank Listings](#airbnb-deep-learning-ranking) | Paper Explainers | Lessons from Airbnb's AI experiments: what worked, what failed, and why simplicity often wins. |
| [What Airbnb Discovered After Launching Their Deep Learning Model](#airbnb-deep-learning-post-launch) | Paper Explainers | Post-launch failures turned into lessons — reframing the problem and eliminating position bias. |
| [Open source models have lagged. So what?](#open-source-models-good-enough) | AI Tools & Adoption | Most tasks don't need frontier models — start experimenting with open source now before you need to. |
| [Agentic analytics is not text-to-SQL: what Anthropic got right about self-service data](#anthropic-agentic-data-analytics) | AI Tools & Adoption | Trustworthy analytics agents depend on semantic layers, disambiguation, and evals — not on better text-to-SQL. |
| [OpenAI and Anthropic are becoming consultancies (and you shouldn't be worried about it)](#ai-labs-becoming-consultancies) | AI Tools & Adoption | Labs are building enterprise AI deployment arms — understanding who they target and why the consulting layer always returns tells DS leaders what to do next. |
| [Your Team Doesn't Have a Speed Problem](#agentic-coding-team-management) | Data Science Leadership & Management | Agentic coding made speed abundant — the new scarce resources are trust, control, and attention. |
| [5 mistakes new managers make in their transition to leadership](#5-mistakes-new-managers) | Data Science Leadership & Management | Five concrete STOPs every new DS manager needs to make in the first 90 days. |
| [Are meetings taking over your calendar?](#meetings-calendar) | Data Science Leadership & Management | How to reclaim your week using the 3Ps framework — People, Projects, Process. |
| [Are you sure you want to become a Data Science Manager?](#are-you-sure-manager) | Data Science Leadership & Management | The five things no one warns you about before you say yes to management. |
| [Asking for feedback as a Data Scientist IC](#asking-for-feedback) | Data Science Leadership & Management | Generic feedback happens because generic questions get asked — here's how to fix that. |
| [Data Science competency framework: how to define roles and growth](#competency-framework) | Data Science Leadership & Management | A six-competency framework for defining DS roles, seniority levels, and growth paths. |
| [Engineering meets data: the collaboration no one prepared you for](#engineering-meets-data) | Data Science Leadership & Management | What data people do, who to hire, and three collaboration models for engineering-DS teams. |
| [How I broke 3 myths about Chinese tech teams (and confirmed 1)](#chinese-tech-teams) | Data Science Leadership & Management | Language, time zones, and hierarchy — three myths debunked, one confirmed. |
| [How to recognise a great manager](#recognise-great-manager) | Data Science Leadership & Management | Five traits that define great management, regardless of whether you like your manager. |
| [Is gut feeling a proxy for experience?](#gut-feeling) | Data Science Leadership & Management | The neuroscience of intuition and how to balance gut instinct with analytical rigour. |
| [The hardest calls in management: deciding who deserves recognition](#hardest-calls-recognition) | Data Science Leadership & Management | Five real stories where traditional impact measurement falls short. |
| [Why emotional intelligence defines great leaders](#emotional-intelligence) | Data Science Leadership & Management | EQ is not a soft skill — it's the leadership superpower that compounds over time. |
| [Struggling to be a great tech manager? This book has answers.](#managers-path-book) | Data Science Leadership & Management | A chapter-by-chapter breakdown of The Manager's Path and what it means for DS leads. |
| [The book that finally taught me how to tell stories with data](#data-storytelling-book) | Data Science Leadership & Management | Five lessons from Storytelling with Data — the one book to read before any other on this topic. |
| [DS in the Age of AI — Part 1: Your job isn't to build models.](#ds-in-age-of-ai-part-1) | Data Science & Future of Work | LLMs automated the scaffolding; what remains is the DS work that always mattered. |
| [DS in the Age of AI — Part 2: If everyone can build a model, what are Data Scientists for?](#ds-in-age-of-ai-part-2) | Data Science & Future of Work | The real DS work starts after the model is built — and before the first line of code. |
| [DS in the Age of AI — Part 3: Prompting is not building AI systems](#ds-in-age-of-ai-part-3) | Data Science & Future of Work | The AutoML parallel — prompting is part of system design, not a replacement for it. |
| [DS in the Age of AI — Part 4: The science we can't afford to lose](#ds-in-age-of-ai-part-4) | Data Science & Future of Work | Statistical rigour and scientific method matter more now, not less — here's why. |
| [DS in the Age of AI — Part 5: The future hybrid](#ds-in-age-of-ai-part-5) | Data Science & Future of Work | The future DS role is an architect of hybrid systems combining classical rigour with LLM speed. |
| [LLMs Explained — Part 1: The 3-layer framework](#llms-explained-1) | Data Science & Future of Work | Three layers behind every LLM: data collection, baseline training, fine-tuning and guardrails. |
| [LLMs Explained — Part 2: How LLMs collect and clean training data](#llms-explained-2) | Data Science & Future of Work | Garbage in, garbage out — how frontier labs curate the data that defines model quality. |
| [LLMs Explained — Part 3: From tokens to training](#llms-explained-3) | Data Science & Future of Work | Tokenisation, next-token prediction, and why baseline models are just glorified autocomplete. |
| [LLMs Explained — Part 4: Making LLMs actually useful through fine-tuning](#llms-explained-4) | Data Science & Future of Work | Fine-tuning turns a predict-the-next-token machine into something that follows instructions. |
| [LLMs Explained — Part 5: How AI uses tools to reduce hallucinations](#llms-explained-5) | Data Science & Future of Work | Web search and code execution — the two tools that make LLMs more reliable in practice. |
| [LLMs Explained — Part 6: Smarter AI through Reinforcement Learning](#llms-explained-6) | Data Science & Future of Work | RLHF and RL for objective tasks — how models learn to prefer better answers over time. |
| [The AI Org Chart: Roles Worth Hiring Before You Think You're Ready](#ai-roles-to-hire) | Data Science Leadership & Management | Five bounded AI roles — defined by workflow, not title — that amplify what you already do well before you're ready to hire them. |
| [Google TabFM: A Genuine Step Forward for Tabular ML (But Don't Call It a Revolution)](#google-tabfm) | Paper Explainers | Tabular foundation models have moved from research curiosity to serious benchmark contender — calibrated optimism required, XGBoost isn't dead yet. |
| [Claude Code Evals — Part 1: Why "It Worked Once" Is Not Evidence](#claude-code-evals-part-1-why-it-worked-once-is-not-evidence) | Claude Code | A single successful run tells you nothing about reliability — here's the mental model that makes evals non-negotiable for anyone building with Claude Code. |
| [Sonnet 5's cost story only holds up at matched effort tiers](#sonnet-5-one-benchmark-win) | AI Tools & Adoption | Anthropic's launch chart and the online backlash both skip the same variable — control for effort level and only one cost claim survives. |
