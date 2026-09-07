## Launch Post

> **Why this post:** Speaks to anyone who's adopted a "context saving" or "token saving" Claude Code tool on the strength of its GitHub star count without checking what the number actually measures — a pain point this series has hit before with RTK and Ponytail/Caveman, and one context-mode's own 98% headline invites again.

🗞️ New post is live! I Tested Context-Mode's "98% Context Reduction" Claim

Context-mode doesn't make your context window bigger, and it doesn't automatically make your bill smaller — those are two different claims that "98% context reduction" quietly bundles into one.

I didn't take the vendor's word for it. I ran the core mechanism on a real file in my own repo instead.

What's inside:
🔹 A smaller context window and a smaller invoice are governed by separate mechanisms — shrinking one doesn't guarantee the other moves.
🔹 The tool's own sandbox hook doesn't touch external MCP tool calls at all — confirmed independently, not just alleged.
🔹 I ran its "compute and summarise" trick on a 57,693-byte file: 95% smaller, and it silently dropped a fact I needed two questions later.

💬 Have you ever adopted a "context saving" tool on the strength of its headline number, only to realise months later you never checked what it actually shrank?
👇 Link in comments.

---

## Deep-dive 1: Why isn't a smaller context window the same as a smaller bill?

> **Why this section:** The core conceptual claim of the whole post, cleanly separable from the article, and directly reusable for anyone confused by "context savings" marketing from any vendor, not just this one.

A smaller context window and a smaller invoice are not the same promise, even though every "context saving" tool markets them as if they were.

Confusing the two is how teams end up disappointed by a tool that worked exactly as advertised.

Let's break it down:
🔹 Context rot is real → the model's working window degrades reasoning as it fills, independent of what anything costs.
👉 That means "less context" is a genuine quality win on its own, even before you touch pricing at all.
🔹 Caching changes what you pay, not whether it counts → a cached prefix is billed at a fraction of the price, but it still occupies the window.
👉 A tool can shrink what you see in the conversation and barely move what you're billed — the only way to know is reading the usage fields, not eyeballing a byte count.
🔹 Routing hooks reorder what the platform sees before it decides what to cache → a variable most "token savings" claims never mention.
👉 At scale, a routing layer that changes your prompt sequence can quietly cost you cache hits you didn't know you were relying on.

💬 Have you ever checked cache_read_input_tokens against cache_creation_input_tokens before believing a tool's savings claim — or trusted the vendor's own number?
👇 Drop your experience below.

---

## Deep-dive 2: Where does context-mode fall short?

> **Why this section:** The single most surprising, independently-confirmed finding in the piece — a concrete limitation with a named source, not a hedge, which makes it the most shareable single fact from the whole article.

A popular context-saving tool with 20,000-plus GitHub stars cannot see a meaningful share of the traffic causing the exact problem it claims to solve.

That's not a competitor's criticism — the maintainer confirmed it directly, in the same public thread.

Let's break it down:
🔹 Small payloads aren't worth sandboxing → routing a 0.4 KB response through a subprocess and a database write can cost more than it saves.
👉 The fixed overhead of "safety first" routing doesn't scale down, so blanket interception has a real floor.
🔹 External MCP tool calls are invisible to the routing hook → a community member tested this empirically, by inspecting the code and calling their own server directly.
👉 If your context pressure actually comes from third-party MCP servers rather than Bash or file reads, this class of tool isn't in that loop at all.
🔹 The retrieval layer is lexical, not semantic → keyword ranking doesn't know "credential rejection" and "authentication failure" mean the same thing.
👉 Anyone expecting the search side to behave like a smart assistant hits a wall the moment their query and their data use different words for the same idea.

💬 Does your context pressure actually come from Bash and file reads — or from the MCP servers a tool like this currently can't see?
👇 Curious how common this gap actually is. Reply or comment.

---

## Deep-dive 3: What happens when you actually test the mechanism on a real file?

> **Why this section:** The most concrete, personal, and differentiated content in the post — a repeatable two-line test anyone can run themselves, which makes it both credible and directly actionable as a standalone post.

I took the core trick behind a 20,000-star context-saving tool, wrote two lines of Python, and ran it on a real file instead of trusting the README.

The number I got matched the vendor's own published range. What that number actually cost me didn't show up until I asked a second question.

Let's break it down:
🔹 A 57,693-byte document became a 2,796-byte summary → a 95% reduction, right in line with the published benchmark range.
👉 The headline number is real and reproducible with a trivial script — that part isn't the myth.
🔹 That same summary contained zero mentions of a specific fact buried in the source → because the script was only ever told to extract headings, not that fact.
👉 Aggregation and retrieval are different questions asked of the same data, and a tool tuned for one will quietly fail the other unless you know which one you're asking.
🔹 A targeted, grep-style query for the missing fact returned it exactly, in 1,353 bytes → still small, but only because I knew what to look for.
👉 The real skill here isn't picking the right tool — it's knowing which question you're actually asking it to answer.

💬 Have you ever run a two-line self-test like this before adopting a tool — or has a compelling star count always been enough?
👇 Try it on your own repo and tell me what you find.
