# Notes

# 1. Introduction: the triangle we thought we understood

- Introduce the classic trade-off: speed, quality, production-readiness (or time, scope, quality)
- Acknowledge its roots: iron triangle, "pick two", technical debt thinking
  - Reference: https://www.sciencedirect.com/science/article/abs/pii/S0263786398000696
- Translate into real team practice:
  - POC → MVP → Production lifecycle
  - Different expectations per phase
- Emphasise leadership responsibility:
  - Managing trade-offs explicitly
  - Setting expectations (especially upwards)
- Subtle nuance:
  - This model was already evolving (DevOps, CI/CD, DORA)
  - Reference: https://dora.dev/guides/dora-metrics/
- Set the premise:
  - This model worked because speed was scarce
- Transition:
  - Something changed—and not in a clean, well-behaved way

---

# 2. The shift: when speed stopped being the constraint

- Describe the current environment:
  - Explosion of GenAI tools and agentic coding
  - POCs built in hours, not weeks
  - Non-engineers building technical artefacts
- Highlight perception vs reality:
  - What people see: fast results, impressive demos
  - What still exists: complexity, edge cases, integration pain
- Introduce the key asymmetry:
  - Cost of showing something ↓↓↓
  - Cost of making it real → unchanged
- Behavioural change:
  - Increased experimentation across teams
  - Curiosity becoming default
- Leadership pressure:
  - "Why is this not done already?"
  - Comparison with demos and prototypes
- Support from leadership trends:
  - Reference: https://www.gartner.com/en/software-engineering/insights/how-ai-changes-software-engineering-leaders-responsibilities
- Transition:
  - The triangle did not disappear—but it no longer behaves the same

---

# 3. The triangle breaks: from trade-offs to distortions

- Revisit the original triangle:
  - Speed vs quality vs scalability/security
- Challenge the old assumption:
  - We assumed we could not maximise all three
- New reality:
  - Speed appears abundant (or cheap)
- Introduce the new constraint model:
  - Output volume increases
  - Validation cost increases
  - Understanding decreases
- Propose a reframed triangle (leadership lens):
  - Speed (abundant)
  - Trust (scarce)
  - Control (fragile)
- Core idea:
  - Constraints have shifted, not disappeared
- Emphasise:
  - The triangle has moved from execution → governance
- Support SDLC disruption:
  - Reference: https://www.insight.com/en_US/content-and-resources/blog/generative-ai-in-software-development-a-tectonic-shift.html
- Transition:
  - This shift shows up in how teams operate daily

---

# 4. What actually changes for a tech lead

## 4.1 Planning becomes unreliable

- Old model:
  - Effort estimation based on known constraints
  - Quarterly planning tied to capacity
- New model:
  - AI introduces variability in effort
  - Tasks collapse or explode unpredictably
- POC-driven illusion:
  - Early demos distort planning assumptions
- Result:
  - Overcommitment risk increases
  - Planning shifts from time → uncertainty management
- Leadership adaptation:
  - More iterative planning cycles
- Support:
  - Reference: https://www.getquotient.com/insights/how-has-ai-impacted-engineering-leadership-in-2025

---

## 4.2 Exploration vs exploitation flips

- Old world:
  - Exploration expensive → tightly controlled
  - Exploitation dominant
- New world:
  - Exploration cheap → everywhere
  - Exploitation still hard → neglected
- Emerging behaviours:
  - Many ideas started, fewer completed
  - Constant switching
- Risk:
  - Fragmentation of effort
  - Lack of ownership
- Leadership challenge:
  - Need to limit exploration explicitly
- Core insight:
  - Exploration is no longer the constraint—discipline is

---

## 4.3 Managing up becomes harder (and noisier)

- Leadership exposure to AI:
  - Personal experimentation by execs
  - Viral demos
- Resulting expectations:
  - Overestimation of feasibility
  - Underestimation of complexity
- The gap:
  - Demo reality vs production reality widens
- Common friction:
  - "This worked in a POC"
  - "Why is this taking months?"
- Leadership role:
  - Translate complexity
  - Reframe value toward reliability
- Support (adoption pressure):
  - Reference: https://linearb.io/blog/microsoft-strategy-for-driving-ai-adoption

---

## 4.4 The bottleneck shifts to validation and review

- Increase in code/output volume
- Larger changesets
- Review systems not scaling
- Symptoms:
  - Review fatigue
  - Superficial approvals
  - Slower feedback
- Risk:
  - Hidden quality degradation
- New constraint:
  - Knowing correctness > building fast
- Leadership implication:
  - Treat review as a system
- Support:
  - Reference: https://stackoverflow.blog/2025/10/06/beyond-code-generation-how-ai-is-changing-tech-teams-dynamics/

---

## 4.5 Individual contribution quietly changes

- Junior engineers:
  - Faster ramp-up
  - Risk of shallow understanding
- Senior engineers:
  - More leverage
  - More responsibility for validation
- Shift:
  - Builder → evaluator
- Risks:
  - Loss of deep system understanding
- Leadership implication:
  - Redefine expectations and ownership
- Supporting perspective:
  - Reference: https://leaddev.com/management/how-engineering-managers-can-use-genai

---

# 5. The contradictions every team will face

- We can build faster → we trust less
- We explore more → we deliver less
- We generate more → we understand less
- We feel productive → outcomes lag
- We can do anything → prioritisation becomes harder
- POCs feel like progress → production reveals truth
- Speed increases locally → coordination costs increase globally
- Output scales → attention does not
- Supporting evidence (pilot trap):
  - Reference: https://www.elastic.co/blog/generative-ai-strategies-for-executives
- Transition:
  - These contradictions define the new environment

---

# 6. What to do in the next 6 months

- Cap and structure exploration:
  - Define explicit allocation
- Redefine "done":
  - Include validation, ownership, observability
- Enforce smaller changes:
  - Counterbalance AI-generated volume
- Strengthen review systems:
  - Context, tooling, standards
- Protect planning discipline:
  - Do not let POCs drive commitments
- Introduce guardrails:
  - Security, approvals, dependency control
- Align expectations upwards:
  - Educate stakeholders
- Invest in understanding:
  - Encourage explanation over generation
- Measure outcomes, not output:
  - Avoid vanity productivity metrics
- Support:
  - Reference: https://beon.tech/blog/generative-ai-for-developers-increase-developer-productivity/

---

# 7. What might happen next (3–5 year view)

- Smaller, higher-leverage teams
- Stronger role of internal platforms
- Shift toward systems thinking over coding
- AI fluency becomes baseline
- Separation of:
  - Idea generation vs production ownership
- Increased importance of governance and trust
- Risk of erosion of deep technical intuition
- Emergence of new roles:
  - AI orchestrators, validators, governors
- Competitive advantage:
  - Not who uses AI more
  - But who controls it better

---

# 8. Conclusion: the role of leadership in the new triangle

- Restate the shift:
  - From managing scarcity of speed → abundance of output
- Reframe leadership:
  - Not accelerating everything
  - But deciding where acceleration applies
- Emphasise:
  - Constraints still exist—they are less visible
- Final insight:
  - Leadership moves from optimisation → containment and direction
- Closing idea:
  - The hardest part is no longer building fast
    but deciding what deserves to be built carefully

---

## Brainstorm Summary

The post argues that agentic coding and GenAI tools have fundamentally changed the team management problem for tech leads — not by removing constraints, but by moving them. Speed, which was historically scarce and therefore the primary lever of trade-off decisions, is now abundant. This exposes a new set of constraints: trust (can we rely on what was generated?), control (do we understand and govern what ships?), and attention (can teams prioritise when everything is easy to start?).

The iron triangle doesn't disappear; it migrates from execution to governance. The post is structured as an analytical argument, not a tips list. It opens by establishing the classical model (iron triangle, POC → MVP → production lifecycle), then traces the disruption caused by AI speed, reframes the triangle, walks through five concrete changes for tech leads (planning, exploration, managing up, validation, individual roles), catalogues the contradictions that follow, and closes with practical actions and a longer-horizon view of where teams are headed.

The intended reader is a tech lead or engineering manager in a data science or ML org — someone who has seen the demos, felt the pressure, and is trying to figure out what actually changes in how they run their team. The tone should be analytical and direct. No generic AI hype. No listicle. The argument should build and land.

The thesis: agentic coding has made speed abundant, but that doesn't solve the problem — it shifts the constraint. The new scarce resources are trust, control, and attention. Leadership must move from managing speed scarcity to managing output abundance.

## Rough Table of Contents

- **1. Introduction: the triangle we thought we understood** — Establishes the iron triangle (speed, quality, production-readiness), its roots, and how it translated into real team practice across the POC → MVP → production lifecycle.
- **2. The shift: when speed stopped being the constraint** — Describes the agentic coding environment, the demo/production asymmetry, and the pressure it creates from stakeholders and leadership.
- **3. The triangle breaks: from trade-offs to distortions** — Revisits the triangle, challenges the old assumption, and proposes the reframed model: speed (abundant), trust (scarce), control (fragile).
- **4.1 Planning becomes unreliable** — How AI variability in effort destroys estimation models and demands more iterative planning cycles.
- **4.2 Exploration vs exploitation flips** — How cheap exploration creates fragmentation and makes discipline — not ideas — the scarce resource.
- **4.3 Managing up becomes harder (and noisier)** — How exec exposure to AI demos widens the gap between expectations and production reality.
- **4.4 The bottleneck shifts to validation and review** — How higher output volume breaks review systems and makes correctness the new constraint.
- **4.5 Individual contribution quietly changes** — How the builder → evaluator shift affects juniors and seniors differently, and what leadership must redefine.
- **5. The contradictions every team will face** — A catalogue of the tensions that emerge from abundance: building faster but trusting less, exploring more but delivering less.
- **6. What to do in the next 6 months** — Practical, concrete actions: cap exploration, redefine done, enforce smaller changes, strengthen review, protect planning, align upwards.
- **7. What might happen next (3–5 year view)** — Smaller teams, governance roles, systems thinking, AI fluency as baseline, competitive advantage shifting to control.
- **8. Conclusion: the role of leadership in the new triangle** — Reframes leadership as containment and direction, not acceleration. Closes on: the hardest part is no longer building fast, but deciding what deserves to be built carefully.
