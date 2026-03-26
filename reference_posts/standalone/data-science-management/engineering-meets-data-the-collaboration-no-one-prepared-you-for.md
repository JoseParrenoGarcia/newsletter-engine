---
title: "Engineering meets data: the collaboration no one prepared you for"
subtitle: "A practical guide for engineers encountering data people for the first time — and how to make it work."
author: Jose Parreño Garcia
published: 2025-08-16
source: https://joseparreogarcia.substack.com/p/engineering-meets-data-the-collaboration
theme: data-science-management
type: standalone
---

# Engineering meets data: the collaboration no one prepared you for

*A practical guide for engineers encountering data people for the first time — and how to make it work.*

---

Your engineering team begins to wonder how their responsibilities are shifting. Questions surface in daily stand-ups and sprint planning:

- Who owns the tracking plan?
- Is this dashboard part of our delivery, or someone else's?
- Are we becoming a support team for the data function?
- How are these requests being prioritised?
- Will this slow us down?

These concerns are real. And they are common.

The arrival of data professionals (analysts, scientists, sometimes analytics engineers) often marks the beginning of a new phase in how a company operates. But it also challenges established ways of working. It introduces new stakeholders, new dependencies, and new definitions of success.

This post is not here to argue for or against that shift. Instead, it is a practical guide for engineers encountering this moment for the first time — when data people join the picture, and the rules of collaboration begin to change.

*(Written by your friendly neighbourhood data scientist. 👨‍🔬🕷️)*

---

## What will we cover?

- What data analysts and data scientists actually do, and why their requests keep landing in your backlog
- Who to hire (and who to avoid) when building your first data team
- 3 models of collaboration between engineering and data, including which one to start with, and why
- The most common friction points in the wild and how to avoid them before they derail your team

---

## What data people actually do (and what engineers need to know)

### Data analysts: decoding what is happening

A good analyst helps the business understand how things are going. They spend their time writing SQL, building dashboards, and answering product questions. The work is often ad hoc:

- Where are users dropping off during onboarding?
- Did this change in the funnel come from a new feature or from seasonality?
- What is the retention rate at 60 days of acquisition on new cohorts?

If the business wants to understand *what happened* and make a decision based on it, the analyst is the one pulling the numbers and presenting the story. They usually live in product, marketing, or commercial teams — not deep in engineering. But their ability to do the job depends almost entirely on what data engineering has made available.

If logs are missing, inconsistent, or changed without notice, their analysis breaks. If events are not documented, it takes days to untangle the meaning of a single metric. If a dashboard is suddenly empty, they do not know if it is a bug or a feature. Clean, complete, well-described data is a "must" for their work to have a positive impact.

### Data scientists: moving from insight to optimisation

If analysts explain *what happened*, data scientists focus on *what should happen next*. They build models, run experiments, and design algorithms that help a product adapt or improve itself. They might predict churn. They might optimise ranking. They might experiment with different recommendation strategies.

Unlike analysts, their work is not always tightly scoped. It is often exploratory. Messy. Iterative. They work in notebooks and Python scripts. They are deep into experimentation frameworks. They ask a lot of questions — and sometimes those questions lead to weeks of dead ends before something useful surfaces.

Their work is also deeply dependent on engineering. If the feature they trained on disappears or changes without warning, all bets are off. And if you have ever been asked to "productionise a model", welcome to one of the messiest handoffs in tech. (PS: I am guilty of having provided really messy handoffs — I tell you, they don't need to be messy.)

If the descriptions above are still not clear, here is a Star Wars analogy:

If the product is the Millennium Falcon, **the analyst is R2-D2** — plugged into the dashboard, monitoring everything in real time. **The data scientist is probably Luke** — closing his eyes and trusting the model to hit the target… sometimes successfully.

*(Sorry fellow analysts, I have always wanted to picture myself as Skywalker — but hey, R2-D2 is the coolest robot in the whole galaxy.)*

---

## Who to hire (and who to avoid) in your first data team

There are plenty of job descriptions out there to copy and paste, but little experience on how to build a data team from scratch. Instead of listing what to look for, here are the traps to avoid:

- A fresh graduate with no context on the business or domain
- A researcher-type who wants perfect data before starting anything
- A "machine learning engineer" with zero interest in actual product questions
- A junior analyst who cannot yet define a metric, let alone defend it

In the early days, data people need to be **autonomous, communicative, and capable of bridging disciplines**. That means knowing the business and the tools. A pretty dashboard is not helpful if no one knows what question it answers.

---

## Collaboration models: how to work together

Once you have brought data analysts or scientists into the picture, the next challenge is figuring out how to actually work together. There are 3 common models.

### 1. Separate teams, collaborating as partners

Engineering and data live in different teams. They work on different backlogs, report to different managers, and collaborate through shared rituals — usually weekly syncs or project checkpoints.

**Advantages:** Each discipline retains its functional identity. Analysts and scientists can support each other, enforce shared standards, and avoid isolation. Easier to scale headcount and maintain tooling consistency.

**Disadvantages:** Collaboration can become transactional. Data requests are treated like tickets. Engineering changes become blockers for analysis. Context is often lost in handovers. Without intentional alignment rituals, things slide into "service mode."

### 2. Fully embedded data roles

The data analyst or scientist is a full member of the engineering or product squad. They join standups, contribute to sprint planning, and share the same goals and rituals.

**Advantages:** Tightest collaboration model. Data is integrated into day-to-day delivery from the start.

**Disadvantages:** Data people can become isolated from other data professionals. They may feel like outsiders on a team built around shipping code. And when priorities shift, they're often the first to get context-switched or deprioritised.

### 3. Virtual teams (V-teams)

A temporary, focused team made up of 2-3 selected engineers, 1 or 2 data people, and a product lead — pulled together to work on a specific problem space.

**Advantages:** Best of both worlds. Tight day-to-day collaboration without a full reorg. A safe way to trial cross-functional work and build empathy between disciplines. Each person brings domain knowledge, and you get to test how data fits into product delivery in real life — not just on slides.

**Disadvantages:** Coordination overhead. Multiple managers need to stay aligned. Roles and responsibilities can feel fuzzy. Dotted-line reporting, dual backlogs, and the occasional "who is driving this again?" moment.

---

### Start with a V-team

Assuming this is the first time your engineering team will be working closely with data people, **start with a V-team**.

✅ V-teams are the most flexible model, the easiest to spin up, and the best way to test collaboration in the wild without committing to an org-wide change.

⚠️ But V-teams are not a long-term solution. They are a bridge, not a home. They work best when time-boxed and mission-driven. If they drag on, accountability blurs and team members feel stretched between two worlds. Use the V-team to learn what rituals actually work — then disband it.

### Making V-teams work in practice

Most engineering teams work in sprints: story points, velocity, and deterministic planning. Data work often follows Kanban-style flows: high uncertainty, changing priorities, and an uncomfortable relationship with estimation.

If you put both into the same V-team and run Scrum like nothing changed… prepare for chaos.

Instead, treat the V-team as an experiment in collaboration design:
- How much work should be committed up front?
- How are goals set when outcomes are uncertain?
- How are blockers surfaced when there is no clear definition of "done"?

Some teams adopt hybrid rituals — sprints with more flexible commitment for data. Others maintain dual tracking boards. Some drop points altogether and focus on outcomes. There is no universal fix, but if you are open to adjusting ways-of-working, you will be closer to an effective model.

---

## Where things often go wrong (and how to prevent them)

Even with the best intentions, collaboration between engineers and data people runs into familiar traps. Here are 5 friction points from the real world.

### 1. "Done" means different things to different people

For an engineer, "done" often means the code is merged, tested, and live. For a data scientist, "done" might mean the experiment has run, results are validated, and a decision has been made. These timelines rarely align.

This mismatch causes frustration on both sides. Engineers feel like the finish line keeps moving. Data folks feel like things are getting shipped before they are ready.

**How to prevent it:** Teams need a shared definition of done — tailored to the type of work. For an epic involving both engineers and data scientists, break it into two coordinated work streams. The engineering "done" could be the backend support for a new feature flag, properly logged and deployed. The data "done" might come two weeks later — once enough data has been collected to run an experiment. What matters is setting expectations clearly.

### 2. Nobody really owns the data

Engineers create the systems that generate data, but they often do not think of themselves as responsible for what happens to it afterwards. Analysts assume the data coming in is trustworthy. Then product teams start asking questions about retention, funnels, or attribution — and suddenly everyone is pointing fingers.

Logs are inconsistent. Metrics are defined differently across teams. An event fires three times on iOS but once on Android. Everyone feels the pain, but no one owns the fix.

**How to prevent it:** Treat data as a first-class product surface. Data tracking plans need to be reviewed just like API changes. Engineers should own their logs — naming, frequency, structure — the same way they own code. Create data contracts and model deployment specs. Assign clear metric owners. If something breaks, someone should know it is their job to care.

### 3. Work becomes invisible across tool boundaries

Engineers tend to live in GitHub, Jira, and IDEs. Data people tend to live in notebooks, dashboards, and analytics tools. Unless someone bridges the gap, you can go an entire sprint without really knowing what the other side is doing.

From an engineering side, data work can feel like a black box: unclear inputs, delayed outputs, no visibility into progress. From the data side, it often feels like decisions are made without context, or that insights are being ignored because they were never surfaced in the right forum.

**How to prevent it:** Data people need to upskill in the use of GitHub and code reviews. But engineers also need to understand that data is messy, and notebooks are a required step in exploratory work. A shared sprint board, even if lightweight, helps. Short weekly syncs where each side shares what they shipped or found can go a long way.

### 4. Features ship without data instrumentation

New features go live. Experiments are planned. And then someone realises: we never instrumented it. The event isn't being fired. The field names are inconsistent. The A/B split was never set up.

Now an engineer has to go back and add tracking — weeks after the feature shipped — while data is blocked.

**How to prevent it:** Introduce "data readiness" as a shared goal — not just whether the feature works, but whether it can be measured. Tickets should already include which events need to be logged, which fields need to be structured, and whether an A/B test is planned. Engineers are not building for someone else's roadmap; they are building for a joint outcome.

### 5. Credit gets lost in translation

When an initiative succeeds, credit often flows to the team that shipped the feature, not the team that found the opportunity or validated the impact.

You see this most clearly in product reviews. The deck says, "We launched X and saw a 12% increase in conversions." It does not say, "The analyst spotted the trend. The scientist built the uplift model. The engineer shipped it." One team gets the praise. The others fade into the background.

It might seem harmless, but over time it chips away at motivation. Analysts stop raising questions. Data scientists stop pushing ideas. Collaboration becomes quieter, and weaker.

**How to prevent it:** Model full-story storytelling. Recognise the entire chain of work: discovery, design, delivery. Use demos, retros, and updates to call out behind-the-scenes impact. Review competency frameworks to ensure that non-production work — data insights, exploratory analysis — is also recognised.

---

## Final thoughts: start small, build better together

If this is the first time your engineering team is working with data people, welcome. The questions you are asking — "who owns this?", "why is this in our sprint?", "are we a support team now?" — are common. So are the friction points. Collaboration between engineering and data is rarely clean on day one. But it is worth it.

If you take anything from this post:

1. Start with one V-team
2. Hire a couple of senior data roles
3. Put a lot of effort into ways-of-working
4. Define what "done" means for everyone
5. Make your logs a product, not a side-effect
6. Celebrate the insight, not just the commit

**Remember: data is not here to slow you down. It is here to help you aim better and build things that actually work.**
