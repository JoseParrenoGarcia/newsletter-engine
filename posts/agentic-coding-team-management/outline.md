# Outline: When Speed Stops Being the Constraint: What Agentic Coding Changes for Tech Leads

**Target:** ~15 min read (~3750 words)

## Sections

### 1. Introduction: the triangle we thought we understood
- Establish the iron triangle (speed, quality, production-readiness) and its role in real team practice: POC → MVP → production lifecycle, different expectations per phase, leadership responsibility for trade-offs and upward expectation-setting.
- Key angle: this model worked *because speed was scarce*. DORA and DevOps were already evolving it — but the premise held. Something changed that.
- Sources: [DORA's software delivery performance metrics](https://dora.dev/guides/dora-metrics/) | Iron triangle academic anchor: gap — model knowledge only

### 2. The shift: when speed stopped being the constraint
- GenAI tools and agentic coding collapse POC timelines. Non-engineers build technical artefacts. The key asymmetry: cost of showing something ↓↓↓, cost of making it real → unchanged. Leadership pressure: "why isn't this done already?"
- Key angle: perception vs reality — demos are cheap, production complexity is not. The triangle didn't disappear; it stopped behaving the same.
- Sources: [Generative AI Changes Software Engineering Leaders' Responsibilities](https://www.gartner.com/en/software-engineering/insights/how-ai-changes-software-engineering-leaders-responsibilities)

### 3. The triangle breaks: from trade-offs to distortions
- Revisit the original triangle. Challenge the assumption that we can't maximise all three. New constraint model: output volume ↑, validation cost ↑, understanding ↓. Propose the reframed leadership triangle: speed (abundant), trust (scarce), control (fragile).
- Key angle: constraints haven't disappeared — they've migrated from execution to governance.
- Sources: [Generative AI in software development: A tectonic shift](https://www.insight.com/en_US/content-and-resources/blog/generative-ai-in-software-development-a-tectonic-shift.html)

### 4.1 Planning becomes unreliable
- Old model: effort estimation from known constraints, quarterly planning tied to capacity. New model: AI introduces variability — tasks collapse or explode unpredictably. POC-driven illusion distorts planning assumptions, overcommitment risk rises.
- Key angle: planning shifts from time management to uncertainty management; more iterative cycles needed.
- Sources: [How has AI impacted engineering leadership in 2025?](https://www.getquotient.com/insights/how-has-ai-impacted-engineering-leadership-in-2025)

### 4.2 Exploration vs exploitation flips
- Old world: exploration was expensive → tightly controlled, exploitation dominant. New world: exploration is cheap → everywhere, exploitation still hard → neglected. Emerging behaviours: many ideas started, fewer completed, constant switching, fragmentation, lack of ownership.
- Key angle: exploration is no longer the constraint — discipline is.
- Sources: none — model knowledge only

### 4.3 Managing up becomes harder (and noisier)
- Execs personally experimenting with AI, viral demos driving expectations. The gap between demo reality and production reality widens. Common friction: "this worked in a POC", "why is this taking months?" Leadership role: translate complexity, reframe value toward reliability.
- Key angle: the tech lead's credibility is now tested not by what they can build but by what they can explain.
- Sources: none — model knowledge only

### 4.4 The bottleneck shifts to validation and review
- Increase in code volume, larger changesets. Review systems not scaling: review fatigue, superficial approvals, slower feedback loops, hidden quality degradation. New constraint: knowing correctness > building fast. Leadership: treat review as a system, not a task.
- Sources: [Beyond code generation: How AI is changing tech teams' dynamics](https://stackoverflow.blog/2025/10/06/beyond-code-generation-how-ai-is-changing-tech-teams-dynamics/)

### 4.5 Individual contribution quietly changes
- Junior engineers: faster ramp-up, risk of shallow understanding. Senior engineers: more leverage, more responsibility for validation. The shift: builder → evaluator. Risk: erosion of deep system understanding. Leadership: redefine expectations and ownership.
- Sources: [How engineering managers can use GenAI](https://leaddev.com/management/how-engineering-managers-can-use-genai)

### 5. The contradictions every team will face
- Catalogue of tensions: build faster → trust less; explore more → deliver less; generate more → understand less; feel productive → outcomes lag; can do anything → prioritisation harder; POCs feel like progress → production reveals truth; speed local → coordination cost global; output scales → attention does not.
- Key angle: the pilot trap — nearly 90% of AI projects stuck in pilot mode. Enthusiasm without governance doesn't compound.
- Sources: [3 real-world generative AI strategies for executives](https://www.elastic.co/blog/generative-ai-strategies-for-executives)

### 6. What to do in the next 6 months
- Concrete actions: cap and structure exploration; redefine "done" (validation, ownership, observability); enforce smaller changes; strengthen review systems; protect planning discipline (don't let POCs drive commitments); introduce guardrails (security, approvals, dependency control); align expectations upward; invest in understanding over generation; measure outcomes not output.
- Sources: [Generative AI for Developers: How to Increase Developer Productivity](https://beon.tech/blog/generative-ai-for-developers-increase-developer-productivity/)

### 7. What might happen next (3–5 year view)
- Smaller, higher-leverage teams. Stronger internal platforms. Systems thinking over coding. AI fluency as baseline. New roles: AI orchestrators, validators, governors. Competitive advantage: not who uses AI more, but who controls it better.
- Sources: none — model knowledge only

### 8. Conclusion: the role of leadership in the new triangle
- Restate shift: from managing scarcity of speed → abundance of output. Reframe leadership: not accelerating everything, but deciding where acceleration applies. Constraints still exist — they are less visible. Closes with the hardest part is no longer building fast, but deciding what deserves to be built carefully.
- Sources: synthesis — no external source

---

## ToC Suggestions

- Sections 4.1–4.5 are five sub-sections under a single "What changes for a tech lead" umbrella. Consider using a brief bridging paragraph before 4.1 to signal the shift from framing (sections 1–3) into the applied layer (sections 4.x), so the transition doesn't feel abrupt.
