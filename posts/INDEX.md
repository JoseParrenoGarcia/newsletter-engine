# Post Index

> **Agent note:** navigate by topic below. Use the `Path` in each card to
> read a post. Do NOT read pipeline artefacts (`research_brief.md`,
> `outline.md`, `seo_brief.md`, `review_report.md`, `promotion_posts.md`).
> Do NOT read reference post PDFs.

---

## Table of Contents

| Title | Topic group | One-liner |
|-------|-------------|-----------|
| [Open source models have lagged. So what?](#open-source-models-good-enough) | AI Tools & Adoption | Most tasks don't need frontier models — start experimenting with open source now before you need to. |
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

---

## Paper Explainers

<!-- slug: ds-star-data-science-agent -->
<a name="ds-star-data-science-agent"></a>
### DS-STAR: How Google Built a Data Science Agent That Actually Works

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Audience** | Data scientists and ML engineers who work with or want to build agentic AI systems |
| **Topics** | `ds-star` `google` `agents` `data-science` `paper-explainer` |
| **Path** | `posts/ds-star-data-science-agent/long_draft.md` |

**Summary:** DS-STAR beats raw Gemini by 32 percentage points on data science benchmarks — not because of a better model, but because of a deterministic seven-module harness connecting every step of the DS lifecycle (Analyzer, Planner, Coder, Debugger, Verifier, Router, Finalyzer). The post is a full technical breakdown: system overview, deep dives into DS-STAR and DS-STAR+ with formulas and algorithms, the prompts Google published in Appendix L, ablation tests, and a worked example report. The central argument is that agent architecture matters more than model choice — a thesis drawn directly from the paper and mapped to real-world Claude Code experience.

---

<!-- path: reference_posts/standalone/paper-explainers/airbnbs-2013-location-model-lessons-in-feature-engineering.md -->
<a name="airbnb-location-model"></a>
### Airbnb's 2013 Location Model: Lessons in Feature Engineering

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Audience** | Data scientists and ML engineers interested in real-world feature engineering decisions |
| **Topics** | `airbnb` `feature-engineering` `paper-explainer` `search-ranking` |
| **Path** | `reference_posts/standalone/paper-explainers/airbnbs-2013-location-model-lessons-in-feature-engineering.md` |

**Summary:** One feature — location quality — made Airbnb's search smarter, and the path to get there is a masterclass in feature engineering. The post walks step by step through the evolution of Airbnb's location model: why Euclidean distance failed, how exponential decay improved it, how a sigmoid function combined centrality with supply, how conditional probability moved beyond geography, how normalisation solved position bias, and how a serendipity factor protected the long tail. The key takeaway is transferable: feature engineering is domain knowledge encoding, and getting it right can matter as much as the model architecture.

---

<!-- path: reference_posts/standalone/paper-explainers/how-airbnb-learned-listing-embeddings-part-1.md -->
<a name="airbnb-listing-embeddings-1"></a>
### How Airbnb Learned Listing Embeddings — Part 1

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Series** | Airbnb Search Personalisation — Part 1 of 2 |
| **Audience** | Data scientists and ML engineers building personalisation or search ranking systems |
| **Topics** | `airbnb` `embeddings` `paper-explainer` `search-ranking` `feature-engineering` |
| **Path** | `reference_posts/standalone/paper-explainers/how-airbnb-learned-listing-embeddings-part-1.md` |

**Summary:** Airbnb trained listing embeddings using Word2Vec applied to booking sessions — treating sequences of clicked listings like sentences and individual listings like words. The post covers the base skip-gram with negative sampling formulation, then Airbnb's three key adaptations that made it work for their domain: booked listing upweighting, global negative sampling, and using explicit positives rather than just session co-occurrence. Validation methodology is covered in detail. Part 2 extends the approach to user embeddings and the full real-time ranking pipeline.

---

<!-- path: reference_posts/standalone/paper-explainers/how-airbnb-learned-to-personalise-search-with-embeddings-part-2.md -->
<a name="airbnb-listing-embeddings-2"></a>
### How Airbnb Learned to Personalise Search with Embeddings — Part 2

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Series** | Airbnb Search Personalisation — Part 2 of 2 |
| **Audience** | Data scientists and ML engineers building personalisation or search ranking systems |
| **Topics** | `airbnb` `embeddings` `paper-explainer` `search-ranking` `feature-engineering` |
| **Path** | `reference_posts/standalone/paper-explainers/how-airbnb-learned-to-personalise-search-with-embeddings-part-2.md` |

**Summary:** User modelling is harder than listing modelling because users book infrequently and their preferences drift over time. Part 2 covers Airbnb's solution: user types and listing types trained on booking sequences with alternating type pairs, so the model learns preference at the type level rather than the individual listing level. Host rejections are incorporated as explicit negative signals. The post traces the full path from embeddings to ranking features to the production ranking pipeline — pragmatic, modular engineering that learns from sparse signals and turns them into measurable user value.

---

<!-- path: reference_posts/standalone/paper-explainers/how-airbnb-optimized-search-rankings-with-deep-learning.md -->
<a name="airbnb-deep-learning-ranking"></a>
### How Airbnb Used Deep Learning to Rank Listings

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Audience** | ML engineers and data scientists working on search ranking or recommendation systems |
| **Topics** | `airbnb` `deep-learning` `search-ranking` `paper-explainer` `feature-engineering` |
| **Path** | `reference_posts/standalone/paper-explainers/how-airbnb-optimized-search-rankings-with-deep-learning.md` |

**Summary:** Airbnb's deep learning ranking paper is as much about what didn't work as what did. The post covers four lessons from their experiments: starting simple with architecture (complexity didn't always help), where embeddings hit their limits, deep learning feature engineering best practices for production systems, and how they approached explainability for a model that stakeholders needed to trust. The recurring theme is that in production ML, understanding failure modes and keeping things interpretable often matters more than maximising offline metrics.

---

<!-- path: reference_posts/standalone/paper-explainers/what-airbnb-discovered-after-launching-deep-learning-model-for-ranking.md -->
<a name="airbnb-deep-learning-post-launch"></a>
### What Airbnb Discovered After Launching Their Deep Learning Model for Ranking

| Field | Value |
|-------|-------|
| **Type** | standalone / paper-explainer |
| **Audience** | ML engineers and data scientists who have shipped models and want to understand post-launch optimisation |
| **Topics** | `airbnb` `deep-learning` `search-ranking` `paper-explainer` `feature-engineering` |
| **Path** | `reference_posts/standalone/paper-explainers/what-airbnb-discovered-after-launching-deep-learning-model-for-ranking.md` |

**Summary:** Launching a deep learning model is the beginning, not the end. This post covers Airbnb's post-launch discoveries: the user problem reframing ("is cheaper better?" turned out to be the wrong question), why multiple new models failed before ICE plots revealed the real issue, the two-tower architecture that finally solved the price sensitivity problem, the cold start problem for new listings, and how they eliminated position bias from training data. The biggest learning: once a powerful model is in place, further gains come from reframing the problem and improving diagnostics, not from fancier layers.

---

## Data Science Leadership & Management

<!-- slug: agentic-coding-team-management -->
<a name="agentic-coding-team-management"></a>
### Your Team Doesn't Have a Speed Problem

| Field | Value |
|-------|-------|
| **Type** | standalone / management |
| **Audience** | Tech leads and engineering managers in data science and ML organisations |
| **Topics** | `management` `leadership` `agents` `claude-code` `team-design` |
| **Path** | `posts/agentic-coding-team-management/long_draft.md` |

**Summary:** Agentic coding has made execution speed abundant — but abundant speed doesn't solve the problem, it shifts the constraint. The post reframes the iron triangle: speed is no longer scarce, but trust (in AI-generated output) and control (over what gets shipped) are. It maps exactly what changes for a tech lead across planning, exploration, managing up, validation, and individual contribution, and is honest about the contradictions every team will face. Closes with a concrete 6-month action list and a 3–5 year view of what might happen next to the tech lead role itself.

---

<!-- path: reference_posts/standalone/data-science-management/5-mistakes-new-managers-make-in-transition-to-leadership.md -->
<a name="5-mistakes-new-managers"></a>
### 5 mistakes new managers make in their transition to leadership

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | New and recently promoted data science managers |
| **Topics** | `management` `leadership` `career` `team-design` |
| **Path** | `reference_posts/standalone/data-science-management/5-mistakes-new-managers-make-in-transition-to-leadership.md` |

**Summary:** The transition from senior DS to manager involves five specific stops that most new managers fail to make: stop coding (as the default activity), stop solving all problems yourself, stop trying to be the best at everything, stop relying on technical expertise for value, and stop assuming your team knows the full context. Each STOP is concrete and counterintuitive — the post doesn't just name them but explains why smart technical people consistently fall into each trap and what to do instead.

---

<!-- path: reference_posts/standalone/data-science-management/are-meetings-taking-over-your-calendar-here-is-how-i-fixed-mine.md -->
<a name="meetings-calendar"></a>
### Are meetings taking over your calendar? Here is how I fixed mine.

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | Data science managers juggling multiple squads and projects |
| **Topics** | `management` `leadership` `team-design` |
| **Path** | `reference_posts/standalone/data-science-management/are-meetings-taking-over-your-calendar-here-is-how-i-fixed-mine.md` |

**Summary:** Written from the experience of leading two DS squads simultaneously, this post introduces the 3Ps framework for reclaiming a manager's week: People (~20%), Projects (~15%), Process (~15%), leaving 50% as open time for deep work and responsiveness. Each P is defined with concrete time allocations and examples of what belongs there. The framework is tested against real conditions — 1 DS squad of 6, managing a lead of another 6-person squad, accountable for 5–6 projects — making it credible rather than theoretical.

---

<!-- path: reference_posts/standalone/data-science-management/are-you-sure-you-want-to-become-a-data-science-manager.md -->
<a name="are-you-sure-manager"></a>
### Are you sure you want to become a Data Science Manager?

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | Senior data scientists considering a move into management |
| **Topics** | `management` `leadership` `career` |
| **Path** | `reference_posts/standalone/data-science-management/are-you-sure-you-want-to-become-a-data-science-manager.md` |

**Summary:** The post is a structured interrogation of the management decision before it's made. It debunks the glorified "manager" title, names five things no one warns you about, and introduces a "danger zone" assessment for people who are considering the move for the wrong reasons. The framing is honest and specific — not discouraging, but insisting on clarity about trade-offs before saying yes. The opportunity side is also covered: what management genuinely opens up that the IC track doesn't.

---

<!-- path: reference_posts/standalone/data-science-management/asking-for-feedback-as-a-data-scientist-individual-contributor.md -->
<a name="asking-for-feedback"></a>
### Asking for feedback as a Data Scientist Individual Contributor

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | Data scientist ICs who want more useful feedback from peers and managers |
| **Topics** | `management` `feedback` `career` |
| **Path** | `reference_posts/standalone/data-science-management/asking-for-feedback-as-a-data-scientist-individual-contributor.md` |

**Summary:** Generic feedback happens because generic questions get asked. The post breaks down why the standard "what can I do better?" approach fails and introduces a structured alternative: feedback broken into recognition, development, and correction dimensions, each with specific question templates. The magic question at the end reframes feedback-seeking entirely. The key insight is symmetric with giving good feedback: specificity in asking produces specificity in receiving.

---

<!-- path: reference_posts/standalone/data-science-management/building-a-data-science-competency-framework-effectively.md -->
<a name="competency-framework"></a>
### Data Science competency framework: how to define roles and growth

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | DS managers and leads responsible for team structure, hiring, and career development |
| **Topics** | `management` `team-design` `hiring` `competency-framework` `career` |
| **Path** | `reference_posts/standalone/data-science-management/building-a-data-science-competency-framework-effectively.md` |

**Summary:** High DS turnover (median tenure of 1.7 years per a 2021 study) is partly a symptom of unclear growth paths. This post builds a six-competency framework from the ground up: defining clear DS roles, the eagle-eyed view of what to look for, setting boundaries between seniority levels, and the six competencies in detail. The framework draws on real examples from Monzo and Intercom and is designed to be practical — something a DS lead can implement, not just reference.

---

<!-- path: reference_posts/standalone/data-science-management/engineering-meets-data-the-collaboration-no-one-prepared-you-for.md -->
<a name="engineering-meets-data"></a>
### Engineering meets data: the collaboration no one prepared you for

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | Engineering managers and DS leads building cross-functional teams for the first time |
| **Topics** | `management` `team-design` `hiring` `leadership` |
| **Path** | `reference_posts/standalone/data-science-management/engineering-meets-data-the-collaboration-no-one-prepared-you-for.md` |

**Summary:** Engineering and data teams work differently, want different things from a backlog, and define "done" differently — and nobody prepares you for this when you're asked to make them collaborate. The post covers what data people actually do and why their requests land in engineering backlogs the way they do, who to hire when building a first data team, three collaboration models (with a recommendation for which to start with), the most common friction points, and six concrete steps to start building a better collaboration. Written for engineering managers but equally useful for new DS leads embedded in engineering organisations.

---

<!-- path: reference_posts/standalone/data-science-management/how-i-broke-3-myths-about-chinese-tech-teams-and-confirmed-1.md -->
<a name="chinese-tech-teams"></a>
### How I broke 3 myths about Chinese tech teams (and confirmed 1)

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | Tech leads and managers working with distributed or cross-cultural teams |
| **Topics** | `management` `leadership` `team-design` |
| **Path** | `reference_posts/standalone/data-science-management/how-i-broke-3-myths-about-chinese-tech-teams-and-confirmed-1.md` |

**Summary:** Written from direct experience managing cross-cultural engineering teams, this post tests four common assumptions about working with Chinese tech teams against reality. Three myths are debunked with specific evidence: language barriers don't make collaboration impossible (tools and mutual effort bridge the gap), time zones aren't insurmountable (async communication and scheduling flexibility work), and hierarchy doesn't stifle creativity (cultural differences in decision-making can enhance collaboration). One myth is confirmed: in-person collaboration genuinely matters for global teams, and the cost of skipping it is measurable.

---

<!-- path: reference_posts/standalone/data-science-management/how-to-recognise-a-great-manager.md -->
<a name="recognise-great-manager"></a>
### How to recognise a great manager (even if they are not your best friend)

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | Individual contributors and new managers calibrating what good management looks like |
| **Topics** | `management` `leadership` `feedback` |
| **Path** | `reference_posts/standalone/data-science-management/how-to-recognise-a-great-manager.md` |

**Summary:** Great managers are recognisable by five traits, regardless of personal chemistry: communication as the foundation of trust, trust as the backbone of the relationship, genuine support as the definition of the job, ownership where leadership begins, and self-care as leading by example. The post is structured around each trait with concrete behaviours rather than abstract qualities — the aim is to give readers a rubric they can apply to their current manager or use to assess their own management.

---

<!-- path: reference_posts/standalone/data-science-management/is-gut-feeling-a-proxy-for-experience.md -->
<a name="gut-feeling"></a>
### Is gut feeling a proxy for experience?

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | Data scientists and managers who rely on intuition in high-stakes decisions |
| **Topics** | `management` `leadership` `data-science` |
| **Path** | `reference_posts/standalone/data-science-management/is-gut-feeling-a-proxy-for-experience.md` |

**Summary:** Gut feelings are not irrational — they are the brain's pattern-matching system operating faster than conscious thought. Drawing on Sapolsky's *Behave* and the neuroscience of the amygdala, the post explains how experience shapes intuition over time, when gut feeling is especially valuable (time pressure, high uncertainty, pattern-rich domains), and where it introduces bias. The practical framework at the end is a counter-hypothesis approach: systematically asking "what evidence would contradict this gut call?" — training both the intuitive and analytical systems to work together rather than compete.

---

<!-- path: reference_posts/standalone/data-science-management/the-hardest-calls-in-management-deciding-who-deserves-recognition.md -->
<a name="hardest-calls-recognition"></a>
### The hardest calls in management: deciding who deserves recognition

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | DS managers and tech leads responsible for performance reviews and recognition decisions |
| **Topics** | `management` `leadership` `feedback` `team-design` |
| **Path** | `reference_posts/standalone/data-science-management/the-hardest-calls-in-management-deciding-who-deserves-recognition.md` |

**Summary:** Traditional impact measurement breaks down in specific ways — and this post illustrates each with a real story. Five cases are presented: a £1M ranking improvement that wasn't fully recognised (visibility bias), another £1M that was (and why), enablement teams whose work is structurally invisible, a 3-year effort with an astonishing result that almost went unnoticed, and the amplifier effect where some individuals make everyone else better without leaving a visible footprint. Each story challenges a common assumption about how recognition should work and what managers are actually measuring.

---

<!-- path: reference_posts/standalone/data-science-management/why-emotional-intelligence-defines-great-leaders.md -->
<a name="emotional-intelligence"></a>
### Why emotional intelligence defines great leaders

| Field | Value |
|-------|-------|
| **Type** | standalone / data-science-management |
| **Audience** | Leaders and aspiring leaders who want to develop EQ as a concrete leadership capability |
| **Topics** | `management` `leadership` `feedback` |
| **Path** | `reference_posts/standalone/data-science-management/why-emotional-intelligence-defines-great-leaders.md` |

**Summary:** Drawing on Goleman's research, this post makes the case that EQ is not a soft skill but the leadership superpower that compounds over time. It debunks the "born leader" myth, covers the five EQ skills that set high-performing leaders apart, and maps why emotional intelligence matters more in the current environment: remote and hybrid teams, cross-functional structures, and AI automation of technical tasks all shift the competitive advantage toward capabilities that remain uniquely human. The closing section is practical — how anyone can actively build EQ rather than waiting to naturally develop it.

---

<!-- path: reference_posts/standalone/book-reviews/struggling-to-be-a-great-tech-manager-the-managers-path.md -->
<a name="managers-path-book"></a>
### Struggling to be a great tech manager? This book has answers for you.

| Field | Value |
|-------|-------|
| **Type** | standalone / book-review |
| **Audience** | DS and engineering managers at any level looking for a structured guide to the management path |
| **Topics** | `management` `leadership` `career` `team-design` |
| **Path** | `reference_posts/standalone/book-reviews/struggling-to-be-a-great-tech-manager-the-managers-path.md` |

**Summary:** A chapter-by-chapter breakdown of *The Manager's Path* by Camille Fournier, structured around the progression from mentorship through tech lead, managing individuals, managing a team, managing multiple teams, and managing managers. Each stage gets its own section with the key shift in mindset and responsibility. The post extracts the most transferable insights for DS leads specifically and closes with a genuine endorsement: whether stepping into management for the first time or developing other leaders, the book's frameworks are timeless.

---

<!-- path: reference_posts/standalone/book-reviews/the-book-that-taught-me-data-storytelling.md -->
<a name="data-storytelling-book"></a>
### The book that finally taught me how to tell stories with data

| Field | Value |
|-------|-------|
| **Type** | standalone / book-review |
| **Audience** | Data scientists and analysts who present findings to non-technical stakeholders |
| **Topics** | `data-science` `career` `management` |
| **Path** | `reference_posts/standalone/book-reviews/the-book-that-taught-me-data-storytelling.md` |

**Summary:** A review of *Storytelling with Data* by Cole Nussbaumer Knaflic, structured around five key learnings: a simple checklist for effective data storytelling, why you only need five chart types in your toolkit, how to grab and keep an audience's attention, why clutter is the biggest enemy of clear communication, and how to learn from real-world examples. The post is honest about the gap between knowing how to build a chart and knowing how to make it tell a story — and argues this is the one book to read first if you want to close that gap.

---

## AI Tools & Adoption

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

## Claude Code

<!-- path: reference_posts/standalone/genai-ai/claude-code-memory-explained-how-it-really-works.md -->
<a name="claude-code-memory-explained"></a>
### You (probably) don't understand Claude Code memory.

| Field | Value |
|-------|-------|
| **Type** | standalone / genai-ai |
| **Audience** | Developers and technical leads building with or configuring Claude Code |
| **Topics** | `claude-code` `memory` `claude-md` `session-context` `project-setup` |
| **Path** | `reference_posts/standalone/genai-ai/claude-code-memory-explained-how-it-really-works.md` |

<!-- path: reference_posts/standalone/genai-ai/how-claude-code-rules-actually-work.md -->
<a name="how-claude-code-rules-actually-work"></a>
### How Claude Code rules actually work

| Field | Value |
|-------|-------|
| **Type** | standalone / genai-ai |
| **Audience** | Developers and technical practitioners using Claude Code in real projects |
| **Topics** | `claude-code` `rules` `claude-md` `session-context` `project-setup` |
| **Path** | `reference_posts/standalone/genai-ai/how-claude-code-rules-actually-work.md` |

**Summary:** Rules in Claude Code are markdown files that Claude discovers and loads automatically at session start — not configuration settings, not code. The post explains the full loading and prioritisation mechanism: how CLAUDE.md and scoped rules files work together, how Claude discovers context it wasn't explicitly pointed at, and how to verify what's actually being loaded. It works through a real data science project to show rules in practice across exploratory and production contexts, and closes with a clear warning about the failure modes that emerge when rules drift out of sync with the codebase they describe.

---

**Summary:** Claude Code memory is not a database or persistent state — it is a set of markdown files that Claude reads at the start of every session, injected into context before the first message. The post demystifies the full memory hierarchy: global `CLAUDE.md` for user-level defaults, project-level `CLAUDE.md` for repo-specific instructions, and how these layers stack and override each other. It covers what belongs at each level, how to structure project-level files for complex codebases, and real-world examples showing memory in practice. The post ends with a framework for evolving memory files deliberately over time rather than letting them drift into noise.

---

<!-- slug: claude-code-agents-explained -->
<a name="claude-code-agents-explained"></a>
### Claude Code agents: what they actually are

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Practitioners already using Claude Code who want to understand agents properly before using them |
| **Topics** | `claude-code` `agents` `subagents` `context-isolation` `skills` |
| **Path** | `posts/claude-code-agents-explained/long_draft.md` |

**Summary:** Agents in Claude Code are not smarter prompts — they are isolated execution contexts with their own context window, system prompt, tool set, and permissions. The post resolves the naming confusion (subagents vs agent teams vs Agent SDK), explains why agents exist as a primitive (context isolation, specialisation, parallelism), and walks through building a first subagent end to end. The core distinction between agents and skills is given its own section — agents are isolated workers, skills are reusable workflows that run in the main context. Closes with a clear account of when agents are the wrong tool.

---

<!-- slug: claude-code-agent-teams -->
<a name="claude-code-agent-teams"></a>
### Claude Code agent teams: when and how to go multi-agent

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Claude Code practitioners who already understand subagents and want to combine them into coordinated systems |
| **Topics** | `claude-code` `agents` `multi-agent` `orchestrator` `skills` |
| **Path** | `posts/claude-code-agent-teams/long_draft.md` |

**Summary:** Most teams don't need multiple agents yet — the post opens by making that case honestly before explaining when the threshold is genuinely crossed. It covers four team paradigms (orchestrator, sequential pipeline, parallel specialists, swarm), how Claude Code implements them via subagents, skills, hooks, and shared task lists, and the three forms of inter-agent communication. The failure modes section is the most practically useful part: eight ways agent teams break in production, each with a concrete mitigation. Closes with a decision framework for choosing between native managed, DIY, and hybrid architectures.

---

<!-- slug: claude-code-skills-explained -->
<a name="claude-code-skills-explained"></a>
### What the docs don't tell you about Claude Code skills

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Technical practitioners using Claude Code seriously — developers and data scientists who want to go deeper than the docs |
| **Topics** | `claude-code` `skills` `agents` `multi-agent` `project-setup` |
| **Path** | `posts/claude-code-skills-explained/long_draft.md` |

**Summary:** The Claude Code docs explain how to create a skill; they don't explain what makes one good. This post covers the full anatomy of a SKILL.md beyond the obvious frontmatter — progressive disclosure, encoding edge cases, structuring outputs, and using scripts for reliability. The hidden gems section covers the design patterns that turn a skill from a prompt into a repeatable workflow. A dedicated section covers how skills compose with MCP servers and subagents, enabling multi-stage agentic pipelines. Closes with design principles drawn from treating skills as software artefacts that need testing, not just authoring.

---

<!-- slug: claude-code-thinking-planning-goal-mode -->
<a name="claude-code-thinking-planning-goal-mode"></a>
### You Don't Need Ultrathink. You Need a Plan.

| Field | Value |
|-------|-------|
| **Type** | standalone / series-genai |
| **Audience** | Practitioners using or exploring Claude Code who want to understand the mechanics behind reasoning effort, plan mode, and goal mode |
| **Topics** | `claude-code` `planning` `agents` `goal-mode` `multi-agent` |
| **Path** | `posts/claude-code-thinking-planning-goal-mode/long_draft.md` |

**Summary:** Thinking levels, planning mode, and goal mode are three distinct concepts that most practitioners conflate. The post untangles them: thinking levels are budgeted deliberation with a cost/quality/speed trade-off; planning mode is the discipline of separating design from execution before an agent acts; goal mode extends that discipline to long-running autonomous work by specifying a verifiable completion condition. Planning mode is positioned as the umbrella concept — it encapsulates model selection (Opus for planning, Sonnet for execution), effort level, and pre-execution discipline. Closes with four reusable patterns for combining planning mode and goal mode in practice.

---

## Data Science & Future of Work

<!-- path: reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-1-your-job-isnt-to-build-models.md -->
<a name="ds-in-age-of-ai-part-1"></a>
### DS in the Age of AI — Part 1: Your job isn't to build models; it's to solve problems.

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 1 of 5 |
| **Series** | DS in the Age of AI |
| **Audience** | Data scientists at all levels, particularly those navigating the AI automation wave |
| **Topics** | `data-science` `llm-impact` `problem-framing` `automation` `career` |
| **Path** | `reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-1-your-job-isnt-to-build-models.md` |

**Summary:** LLMs and AutoML have automated the parts of data science that used to take days — boilerplate modelling, basic EDA, standard pipeline scaffolding. This opening post of the series argues that this is not a threat to the profession but a clarification of it: what remains is the work that always mattered. The post maps what LLMs can and can't do within a real DS workflow, makes the case that problem framing, domain judgment, and scientific rigour are structurally irreplaceable by current AI, and draws a clear line between high-leverage and low-leverage DS skills in the new landscape. It closes with a direct caution for junior data scientists who risk spending their formative years optimising for skills that are being automated away.

---

<!-- path: reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-2-if-everyone-can-build-a-model.md -->
<a name="ds-in-age-of-ai-part-2"></a>
### DS in the Age of AI — Part 2: If everyone can build a model, what are Data Scientists for?

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 2 of 5 |
| **Series** | DS in the Age of AI |
| **Audience** | Data scientists navigating a world where non-DS roles can now prototype models |
| **Topics** | `data-science` `llm-impact` `problem-framing` `automation` `career` |
| **Path** | `reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-2-if-everyone-can-build-a-model.md` |

**Summary:** LLMs have made it possible for engineers and PMs to build a working model without touching a data science team — a few prompts and a notebook later, they have something that runs. Part 2 argues that this democratisation of modelling exposes rather than eliminates the DS role: the real work starts after the model is built (monitoring, iteration, production robustness) and before the first line of code (problem framing, success metrics, data strategy). The post maps exactly where data scientists remain irreplaceable and closes with a clear warning: those who don't claim the hard parts of the system risk being sidelined into low-value work.

---

<!-- path: reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-3-prompting-is-not-building-ai-systems.md -->
<a name="ds-in-age-of-ai-part-3"></a>
### DS in the Age of AI — Part 3: Prompting is not building AI systems

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 3 of 5 |
| **Series** | DS in the Age of AI |
| **Audience** | Data scientists who want to understand where their existing skills transfer to LLM system design |
| **Topics** | `data-science` `llm-impact` `problem-framing` `automation` `career` |
| **Path** | `reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-3-prompting-is-not-building-ai-systems.md` |

**Summary:** The AutoML parallel is the frame for this post: AutoML didn't replace data scientists, it surfaced who understood the problem vs who just knew the tools. LLMs are doing the same. Part 3 argues that prompting is one input to LLM system design, not the discipline itself — the real work is the same as always: defining constraints, handling failure modes, building evaluation frameworks, and owning the production system. The post maps which DS skills transfer directly to LLM system design and which require new thinking, closing with the provocation that LLM system design is data science applied to a new surface.

---

<!-- path: reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-4-the-science-we-cant-afford-to-lose.md -->
<a name="ds-in-age-of-ai-part-4"></a>
### DS in the Age of AI — Part 4: The science we can't afford to lose

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 4 of 5 |
| **Series** | DS in the Age of AI |
| **Audience** | Data scientists and ML practitioners concerned about scientific rigour eroding under speed pressure |
| **Topics** | `data-science` `llm-impact` `problem-framing` `automation` `career` |
| **Path** | `reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-4-the-science-we-cant-afford-to-lose.md` |

**Summary:** Written from a real incident — experiments that looked like success but weren't, caused by non-technical teams releasing A/B tests at LLM-enabled speed without statistical discipline. Part 4 makes the case that statistical rigour, causal thinking, and experimental design matter more in the LLM era, not less: faster iteration without scientific discipline produces faster noise. The post identifies what is getting lost in the hype (careful measurement, hypothesis formation, honest uncertainty quantification), argues these are not legacy skills to be deprecated but the irreplaceable core of DS value, and closes with a call to defend and evolve them rather than let them atrophy.

---

<!-- path: reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-5-the-future-hybrid.md -->
<a name="ds-in-age-of-ai-part-5"></a>
### DS in the Age of AI — Part 5: The future hybrid

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 5 of 5 |
| **Series** | DS in the Age of AI |
| **Audience** | Data scientists thinking about where the profession is heading over the next 3–5 years |
| **Topics** | `data-science` `llm-impact` `automation` `career` `feature-engineering` |
| **Path** | `reference_posts/series/genai-ai/ds-in-the-age-of-ai/part-5-the-future-hybrid.md` |

**Summary:** The series closes by sketching what the future DS role actually looks like: not a prompt writer, not a pure ML researcher, but an architect of hybrid systems that combine classical rigour with LLM speed. The post defines hybrid systems in this context, walks through five concrete examples of future-proof hybrid architectures, and maps the mindset shift required — from being the person who writes the code to being the person who designs the system that generates and validates it. The opportunity framed in the closing is specific: more powerful, more scalable, and more strategic, but only for those who actively make the transition.

---

<!-- path: reference_posts/series/genai-ai/llms-explained/part-1-the-3-essential-layers.md -->
<a name="llms-explained-1"></a>
### LLMs Explained — Part 1: The 3-layer framework behind ChatGPT & friends

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 1 of 6 |
| **Series** | LLMs Explained |
| **Audience** | Data scientists and technical readers who want a rigorous but accessible explanation of how LLMs work |
| **Topics** | `data-science` `llm-impact` `fine-tuning` `reinforcement-learning` |
| **Path** | `reference_posts/series/genai-ai/llms-explained/part-1-the-3-essential-layers.md` |

**Summary:** Every LLM is built on three layers, and most explanations collapse them into one. Part 1 separates them clearly using a house-price prediction analogy before applying it to language models: data collection (the entire internet, curated), training the baseline model (a gigantic neural network learning to predict the next token), and fine-tuning and guardrails (the layer that turns a predict-next-token machine into something useful and safe). The post is deliberately accessible without being imprecise — it gives readers the correct mental model before the series goes deeper into each layer.

---

<!-- path: reference_posts/series/genai-ai/llms-explained/part-2-data-collection-and-cleaning.md -->
<a name="llms-explained-2"></a>
### LLMs Explained — Part 2: How LLMs collect and clean training data

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 2 of 6 |
| **Series** | LLMs Explained |
| **Audience** | Data scientists and ML practitioners who want to understand the data pipeline behind frontier models |
| **Topics** | `data-science` `llm-impact` `feature-engineering` |
| **Path** | `reference_posts/series/genai-ai/llms-explained/part-2-data-collection-and-cleaning.md` |

**Summary:** Garbage in, garbage out applies to LLMs as much as classical ML — but at a scale most data scientists have never worked at. Part 2 covers how much data frontier models actually need, the two core problems with raw internet data (noise and toxicity), what GPT-3's paper reveals about data curation decisions, and how FineWeb (an open-source dataset) makes the curation pipeline transparent for the first time. The key takeaway is practical and transferable: the teams that build the best models invest as much in data curation as in architecture and compute.

---

<!-- path: reference_posts/series/genai-ai/llms-explained/part-3-from-tokens-to-training.md -->
<a name="llms-explained-3"></a>
### LLMs Explained — Part 3: From tokens to training — how a baseline LLM learns

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 3 of 6 |
| **Series** | LLMs Explained |
| **Audience** | Data scientists who want to understand what a baseline LLM is actually learning during pre-training |
| **Topics** | `data-science` `llm-impact` `feature-engineering` |
| **Path** | `reference_posts/series/genai-ai/llms-explained/part-3-from-tokens-to-training.md` |

**Summary:** Part 3 goes inside the training loop: how text is tokenised into the units a model actually learns from, what the baseline training objective is (predict the next token — nothing more), and where that objective produces capable behaviour vs where it breaks down. The post is direct about the limitations of a baseline model — it sounds coherent and hallucinates freely — and sets up fine-tuning as the necessary next step. It closes with a structural observation about the LLM industry: the real competitive moat is not the architecture (largely published) but the data pipeline and the training run, which fewer than 20 companies in the world can afford to execute.

---

<!-- path: reference_posts/series/genai-ai/llms-explained/part-4-fine-tuning-explained.md -->
<a name="llms-explained-4"></a>
### LLMs Explained — Part 4: Making LLMs actually useful through fine-tuning

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 4 of 6 |
| **Series** | LLMs Explained |
| **Audience** | Data scientists and practitioners who want to understand what fine-tuning actually changes in a model |
| **Topics** | `data-science` `llm-impact` `fine-tuning` |
| **Path** | `reference_posts/series/genai-ai/llms-explained/part-4-fine-tuning-explained.md` |

**Summary:** Fine-tuning is not retraining from scratch — it adjusts the weights of an existing baseline model using curated examples of desired behaviour, at a fraction of the cost. Part 4 explains what "helpful" actually means as a training target, how supervised fine-tuning works mechanically, and where fine-tuning still fails (notably, multi-step arithmetic where models pattern-match rather than calculate). The post is honest about limits: fine-tuning improves instruction-following but doesn't fix hallucination at the root — that requires tools, covered in Part 5.

---

<!-- path: reference_posts/series/genai-ai/llms-explained/part-5-tools-to-reduce-hallucinations.md -->
<a name="llms-explained-5"></a>
### LLMs Explained — Part 5: How AI uses tools to reduce hallucinations

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 5 of 6 |
| **Series** | LLMs Explained |
| **Audience** | Practitioners building LLM applications who want to understand the tool-use layer |
| **Topics** | `data-science` `llm-impact` `fine-tuning` |
| **Path** | `reference_posts/series/genai-ai/llms-explained/part-5-tools-to-reduce-hallucinations.md` |

**Summary:** Even after fine-tuning, LLMs hallucinate — because they generate tokens from pattern matching, not from live knowledge or calculation. Part 5 covers the two tools that most reliably reduce this: web search (grounding answers in current, retrievable information) and code execution (delegating arithmetic and data manipulation to a Python interpreter that actually computes). The post explains how each tool is integrated into the generation loop and why tool use is architecturally different from prompting — it routes certain query types away from the model's parametric knowledge entirely.

---

<!-- path: reference_posts/series/genai-ai/llms-explained/part-6-reinforcement-learning.md -->
<a name="llms-explained-6"></a>
### LLMs Explained — Part 6: Smarter AI through Reinforcement Learning

| Field | Value |
|-------|-------|
| **Type** | series / genai-ai — Part 6 of 6 |
| **Series** | LLMs Explained |
| **Audience** | Data scientists who want to understand RLHF and where RL outperforms supervised fine-tuning |
| **Topics** | `data-science` `llm-impact` `reinforcement-learning` `fine-tuning` |
| **Path** | `reference_posts/series/genai-ai/llms-explained/part-6-reinforcement-learning.md` |

**Summary:** Supervised fine-tuning has a ceiling — it can only teach a model to mimic examples, not to discover better answers. Part 6 covers how reinforcement learning breaks that ceiling: RL for objective tasks (where correct answers are verifiable, like code or maths) and RLHF for open-ended answers (where human preference ratings train a reward model). The post maps precisely when RL beats supervised fine-tuning and closes the full series with a clear statement of the competitive moat: not the architecture, but the data pipeline, the training run, and the human feedback infrastructure that shapes model behaviour at scale.
