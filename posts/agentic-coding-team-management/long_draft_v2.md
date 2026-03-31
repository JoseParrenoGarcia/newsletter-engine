# Your Team Doesn't Have a Speed Problem

*Agentic coding made speed cheap — and exposed the real constraints underneath.*

A few months ago, I was in a planning session with a data science team — the kind of conversation that, as a tech lead, has become a recurring part of the job. A junior engineer had built a working prototype over a long weekend using an agentic coding tool and a handful of Python scripts. The demo was good enough that the product director asked when it could go to production. The engineer said: "Maybe six to eight weeks?" The director looked puzzled. The prototype had taken two days.

That gap — between the time it takes to build something that looks done and the time it takes to make it actually done — used to be smaller. Not because production was simpler, but because the prototype took longer too. When both phases took weeks, the ratio felt manageable. Now one phase takes days and the other still takes months. The ratio feels broken, and the pressure to explain it has become part of the job in a way it was not before.

This post is for tech leads and engineering managers who are feeling that pressure. Teams are generating more output than ever, stakeholders are watching demos every week, and delivery timelines have not compressed proportionally. Planning feels less reliable. Reviews feel slower. Managing upward has gotten noisier.

What I want to argue is that the problem is not execution speed. The constraint has moved. And until your leadership model catches up with where the constraint actually is, the pressure will not ease.

---

## The triangle we thought we understood

For most of tech's professional history, the iron triangle held. You could optimise for speed, quality, or scope — but not all three simultaneously. Pick two.

In practice, this translated into a lifecycle most teams implicitly understood. A proof of concept lived under different rules than a production system. Speed and learning mattered in the POC. Quality and reliability mattered in production. The MVP existed somewhere in between — always a negotiation, always slightly uncomfortable, always justified by the constraints.

This framework was already evolving before agentic coding arrived. The rise of DevOps, CI/CD, and modern deployment practices compressed cycle times significantly. [DORA's research](https://dora.dev/guides/dora-metrics/) on software delivery performance — measuring change lead time, deployment frequency, and recovery time — gave teams language and benchmarks for moving faster without the quality regressions that once defined high-velocity development. Elite teams were shipping daily. The triangle had not disappeared, but its edges had softened.

The underlying assumption remained intact, though: speed was earned. You could shorten the timeline, but you could not collapse it. Building something required time, and that time was a natural forcing function. It forced prioritisation. It made trade-off conversations honest. It gave teams a built-in reason to push back on things that were not worth the investment.

That forcing function has weakened. Not because production became easier, but because the early phase — getting to "impressive enough to show" — became radically cheaper.

---

## The shift: when speed stopped being the constraint

[Visual: photo | Dall-E | section separator — person watching a polished demo on a screen in a meeting room]

Agentic coding tools have made the early phase of software development extraordinarily fast. A prototype that once required two weeks of focused engineering can now be produced in an afternoon. A working proof of concept, complete with a connected model and a basic interface, can be on a shared screen by end of day.

This has changed the context in which tech leads operate. As [Gartner has noted](https://www.gartner.com/en/software-engineering/insights/how-ai-changes-software-engineering-leaders-responsibilities), generative AI is explicitly reshaping the responsibilities of software engineering leaders — including how they manage team capacity, set expectations, and handle oversight of AI-generated output. By 2025, Gartner predicted that more than half of software engineering leader role descriptions would explicitly require AI oversight as a core responsibility.

But the change that hits tech leads hardest is not organisational. It is experiential. Senior stakeholders are building things themselves now. They have used the tools. Some have built prototypes over weekends. When a VP has spent a Sunday watching an agent produce a working dashboard, their mental model of "how long should this take?" has been recalibrated — and the conversation about why something takes three months becomes much harder.

The asymmetry is not between junior engineers and senior engineers. It is between two phases of work that used to move at similar speeds and now do not.

**The cost of showing something** — a working prototype, a convincing demo, a first-pass model — has collapsed.

**The cost of making it real** — edge cases handled, systems integrated, monitoring in place, security reviewed, data quality assured, rollback procedures defined — has not.

This asymmetry is not new. What is new is the scale. When both sides of the ratio were measured in weeks, the delta was manageable. When one side collapses to hours, the gap becomes a persistent source of friction — and the tech lead stands squarely in the middle of it.

---

## The triangle breaks: from trade-offs to distortions

[Visual: diagram | post figure | concept illustration — original iron triangle (speed/quality/scope) alongside reframed triangle (speed/trust/control)]

The original triangle assumed that all three variables were scarce. You could not maximise speed and quality and scope simultaneously — something had to give. That scarcity was the mechanism. It forced choices.

Speed is no longer scarce. Or at least, the perception of speed — what can be produced, what can be demonstrated, what can be called "done" in a sprint review — is no longer scarce. Output volume has increased significantly. What has not increased is anyone's ability to know whether that output is correct, secure, observable, or maintainable.

As [Insight's analysis of the generative AI shift in software development](https://www.insight.com/en_US/content-and-resources/blog/generative-ai-in-software-development-a-tectonic-shift.html) describes, the disruption goes beyond code generation — it reshapes the entire SDLC, including planning, testing, and deployment phases. The change is structural, not incremental.

For a tech lead, the operative constraints have reframed:

- **Speed** — abundant. The bottleneck is no longer doing; it is deciding and validating.
- **Trust** — scarce. Can the team rely on what was generated? Does anyone understand it well enough to own it? When the author is an agent, who holds accountability?
- **Control** — fragile. As output volume increases and review capacity stays flat, governance erodes — not dramatically, not all at once, but persistently.

Unlike the original triangle — where constraints were visible, where teams could feel the time pressure and negotiate against it — these constraints are quiet. Trust erodes gradually. Control slips in small increments. Speed continues to look like progress until something breaks.

---

## What agentic coding changes for a tech lead

The reframed triangle is not abstract. It shows up in five concrete ways in how tech leads operate day to day.

### Planning becomes unreliable

The old model of effort estimation assumed a relatively stable relationship between task complexity and time. Senior engineers developed intuition for how long things take. Planning ceremonies were anchored to that intuition, and it was mostly reliable.

Agentic coding breaks the relationship. Tasks that once took three days can now be completed in an afternoon — but tasks that once took two weeks can also still take two weeks, because the hard part was never the coding. Integration, testing, edge case handling — these have not gotten faster. The effort distribution has become bimodal and unpredictable.

The 2025 Engineering Leadership Report, analysed by [GetQuotient](https://www.getquotient.com/insights/how-has-ai-impacted-engineering-leadership-in-2025), found that 60% of engineering leaders say AI has not significantly boosted team productivity. Only 6% reported gains above 30%. The productivity uplift is real but concentrated in specific task types — code generation, documentation — while integration and review work remains largely unchanged.

For planning, this creates overcommitment risk. Teams see fast early progress and extrapolate. The sprint ends with the feature "built" but not shippable. The planning model needs to shift: away from time-based estimation toward uncertainty management, with shorter feedback loops and explicit buffers for validation work that AI cannot compress.

### Exploration vs exploitation flips

In the old world, exploration was expensive. Running a spike, prototyping an idea, trying a different architecture — these cost time that teams did not have in abundance. The default was exploitation: working on known problems with known tools toward committed outcomes. Exploration was tightly governed because it was genuinely costly.

Agentic coding has inverted this. Exploration is now cheap. A new approach can be tried in hours. An alternative library, a different model, a faster inference path — all of these can be prototyped before the end of the day.

What is not cheap is exploitation. Turning a prototype into a production system, integrating it with existing infrastructure, writing the tests, handling the failure modes — none of that has gotten faster. Engineers are now navigating code they did not write line by line, which adds its own layer of cognitive cost.

The result is fragmentation. Teams start more things. Fewer things get finished. Context switching increases. Ownership becomes diffuse. Engineers who are comfortable with agentic tools can produce impressive breadth — but breadth without depth does not ship.

The constraint is no longer ideas. It is discipline. The tech lead's job is not to encourage more exploration. It is to limit it explicitly.

### Managing up becomes harder (and noisier)

This is the part of the role that few tech leads are formally trained for, and agentic coding has made it significantly harder.

Senior stakeholders have more direct exposure to AI capabilities than ever before. Some have built things themselves. This reduces the translation problem in one direction — they are no longer asking whether AI can do something, because they have watched it do things. But it creates a new problem in the other direction. The demo they watched took ten minutes. Their mental model of "how long this should take" has been set by that ten minutes.

The conversation about why something takes three months becomes a credibility challenge. The tech lead is no longer explaining technical complexity to someone who has never touched the tools. They are explaining it to someone who has seen the tools work, and who reasonably wonders why the team cannot replicate what they saw on a Saturday afternoon.

The framing that tends to work is not "the demo was misleading." It is: "the demo showed us what the ceiling looks like — my job is to make it reliable and something we can actually own." Reliability and ownership are the words that resonate with leaders who have built things and watched them break. They understand the distance; they just need the frame.

### The bottleneck shifts to validation and review

Ryan Salva, Senior Director of Product at Google, put it plainly in [a Stack Overflow interview](https://stackoverflow.blog/2025/10/06/beyond-code-generation-how-ai-is-changing-tech-teams-dynamics/): "Writing code was never really the bottleneck for shipping software. The bottlenecks were all of the other things surrounding it."

Agentic coding has accelerated the thing that was not the bottleneck. Review, testing, integration, operational readiness — the actual bottlenecks — remain. And they are now under more pressure, because they receive more volume with the same resources.

The symptoms are familiar to anyone running a team right now: review fatigue, where engineers approve PRs they have not fully read; superficial testing, where coverage metrics look healthy but the scenarios that matter are not covered; slower feedback loops, where the review queue becomes a backlog.

**Review fatigue** is worth naming specifically. When code is generated at speed, it arrives in larger chunks. A pull request that a developer would have produced over three days used to be digestible in a single review session. The same code delivered in three hours — which is now possible — arrives as a dense changeset with less incremental context. The reviewer has to reconstruct intent rather than follow it.

Treating review as a system means setting changeset size limits regardless of how the code was produced, investing in review tooling, building explicit standards for what "reviewed" means, and tracking time-to-review as a leading indicator of quality degradation.

### Individual contribution quietly changes

The shift in individual contribution is subtler than the others, but it compounds.

For junior engineers, agentic coding accelerates ramp-up. Code that once required weeks of pattern learning can be generated and iterated quickly. This is genuinely useful. But if junior engineers are primarily working with generated code without fully understanding what it does, they are building fluency with the interface of AI tools rather than with the domain. When something breaks in production, the debugging requires the deeper understanding they have not developed.

For senior engineers, the dynamic is different. Leverage increases — they can evaluate more, move faster, produce more. But their validation burden increases too. If they are the primary source of "does this actually work?", and the volume of output has increased significantly, their attention is stretched across more ground with the same capacity.

As [LeadDev notes](https://leaddev.com/management/how-engineering-managers-can-use-genai), the shift in engineering roles is from building to evaluating: engineers spending less time writing and more time reviewing, triaging, and validating AI-assisted output.

The reframing for leadership: ownership is not about who wrote the code. It is about who understands it, who will debug it at 2am, and who can explain it to the next engineer who touches it.

---

## The contradictions every team will face

[Visual: photo | Dall-E | section separator — abstract image suggesting tension, competing directions]

The reframed triangle produces tensions that feel uncomfortable precisely because they are real. Not theoretical. Not edge cases.

We can build faster, and we trust less of what we build. The speed is genuine; so is the uncertainty.

We explore more, and we deliver less. There is more activity and less completion.

We generate more code, and we understand less of the system. Output and comprehension are no longer correlated.

We feel productive — the sprint board looks healthy, PRs are merging — and outcomes lag. Velocity is up; reliability is flat or declining.

We can technically attempt more things, and prioritisation has become the hardest problem. When everything is achievable, the question of what deserves to be built is no longer bounded by capacity.

The most visible version of this is what [Elastic's research on generative AI adoption](https://www.elastic.co/blog/generative-ai-strategies-for-executives) documents as the pilot trap: nearly 90% of AI projects remain stuck in pilot mode. Fewer than 30% of CEOs actively sponsor their company's AI agenda. The enthusiasm is real; the governance to translate it into production outcomes is not. That gap is exactly where the reframed triangle lives — where trust and control are the operative constraints, and speed has stopped being the differentiator.

---

## What to do in the next 6 months

There is no framework that resolves these tensions cleanly. But there are specific practices that reduce the damage.

**Cap exploration explicitly.** Define what percentage of sprint capacity can go to spikes, prototypes, and experiments. The number matters less than the existence of a limit. Without it, exploration expands to fill available time and exploitation gets squeezed.

**Redefine "done."** A story is not done when the code is merged. It is done when it is validated, has an owner who understands it, and is observable in production. Tie your definition of done to the validation phase, not the generation phase.

**Enforce smaller changesets.** AI-assisted development produces large, dense PRs. Set a soft limit on PR size — not as punishment, but as a design constraint that makes review meaningful. Code that arrives in smaller increments is reviewed better and breaks less.

**Strengthen review systems.** Invest in the tooling, time, and standards that make review substantive. Track review throughput as an engineering metric. If review is slowing down, that is a signal, not an inconvenience to route around.

**Protect planning discipline.** A prototype is not a commitment. When a stakeholder sees a working POC and asks for a timeline, the answer is not derived from the prototype's velocity. It is derived from what production requires. This needs to be said repeatedly, to different audiences, in different words, until it sticks.

**Measure outcomes, not output.** As [BEON.tech's synthesis of McKinsey's research](https://beon.tech/blog/generative-ai-for-developers-increase-developer-productivity/) notes, the real prize from AI-assisted development is reduced time-to-market and better use of senior talent — not raw code volume. Track what ships, stays up, and customers actually use. Not how many PRs were merged this sprint.

---

## What might happen next (3–5 year view)

[Visual: photo | Dall-E | section separator — abstract image suggesting a smaller, more focused team]

Prediction is hazardous, but some directions feel more likely than others.

Teams will get smaller and more leveraged. The right size for an engineering function is not fixed; it is a function of the tooling available and the judgment required. As AI handles more implementation, the team that supports a given product surface can shrink — not through layoffs, but through slower backfill as attrition happens naturally.

Internal platforms will become more important, not less. As AI generates more code touching more systems, the layers that control how that code gets deployed — internal APIs, infrastructure guardrails, deployment pipelines — become strategic rather than operational. The platform team is the governance layer.

The distinction between building and owning will sharpen. The engineer who writes code and the engineer who is accountable for it in production are already different roles in some organisations. Agentic coding will formalise that separation. New role types — validators, orchestrators, AI system owners — will emerge to name what is currently informal.

Competitive advantage will not go to whoever adopts AI fastest. It will go to whoever builds the governance and control structures that let AI-generated output be trusted at scale. Speed is easy to buy. Trustworthy speed is hard to build.

---

## The role of leadership in the new triangle

The iron triangle told leaders that their job was to manage scarcity. Time was scarce. Engineering capacity was scarce. Trade-offs were unavoidable, and good leadership meant making those trade-offs deliberately rather than accidentally.

That framing is still partially true. But the scarce thing has changed.

Speed is available. Output is available. What is scarce is the ability to know whether what has been built is correct, maintainable, and worth owning long-term. The new leadership task is not to accelerate everything. It is to decide where acceleration applies, and to be explicit about where it does not.

The constraints are less visible now. That is the most important thing to hold onto. The iron triangle was honest about its limits — you could see the trade-off in the timeline. The reframed triangle is quiet. Trust erodes incrementally. Control slips in ways that do not show up in sprint metrics until something goes wrong in production.

Leadership in this environment is less about optimisation and more about containment and direction. About being willing to say: yes, we could build this in a week, and here is what that means we have decided not to validate, not to own, not to be accountable for.

The hardest part of building software is no longer building fast. It is deciding what deserves to be built carefully.

---

*Does this resonate with what your team is experiencing? I'd be curious whether the constraint has shifted in the same way for you — and which of these tensions has been hardest to explain upward.*

---

## References

[1] [DORA's software delivery performance metrics](https://dora.dev/guides/dora-metrics/) — DORA's five software delivery performance metrics and their role as the pre-AI baseline for measuring engineering team performance.

[2] [Generative AI Changes Software Engineering Leaders' Responsibilities](https://www.gartner.com/en/software-engineering/insights/how-ai-changes-software-engineering-leaders-responsibilities) — Gartner analysis of how AI is reshaping three core managerial responsibilities: team oversight, talent management, and AI ethics policy.

[3] [Generative AI in software development: A tectonic shift](https://www.insight.com/en_US/content-and-resources/blog/generative-ai-in-software-development-a-tectonic-shift.html) — Insight's analysis of how generative AI structurally reshapes the entire SDLC beyond code generation.

[4] [How has AI impacted engineering leadership in 2025?](https://www.getquotient.com/insights/how-has-ai-impacted-engineering-leadership-in-2025) — Analysis of the 2025 Engineering Leadership Report (617 leaders); 60% report no significant productivity boost from AI.

[5] [Beyond code generation: How AI is changing tech teams' dynamics](https://stackoverflow.blog/2025/10/06/beyond-code-generation-how-ai-is-changing-tech-teams-dynamics/) — Stack Overflow on how AI changes team structure, including the insight that code generation was never the primary bottleneck for shipping software.

[6] [How engineering managers can use GenAI](https://leaddev.com/management/how-engineering-managers-can-use-genai) — LeadDev on seven ways engineering managers can apply GenAI to non-coding tasks, with notes on the shift from building to evaluating.

[7] [3 real-world generative AI strategies for executives](https://www.elastic.co/blog/generative-ai-strategies-for-executives) — Elastic's analysis of the AI adoption gap: nearly 90% of AI projects stuck in pilot mode, fewer than 30% of CEOs actively sponsoring AI initiatives.

[8] [Generative AI for Developers: How to Increase Developer Productivity](https://beon.tech/blog/generative-ai-for-developers-increase-developer-productivity/) — Draws on McKinsey controlled research and Stack Overflow 2024 survey; recommends structured enablement and outcome-based measurement over output metrics.
