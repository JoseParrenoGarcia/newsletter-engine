# Output Limits

## Long-form file writes
- Claude Code responses are capped at a fixed output-token budget per turn (commonly ~8192 tokens). Composing an entire long document (a full draft, a large rewritten section, a big generated report) as text in a single response — before it's written to a file — can exceed that cap and silently lose the write, even though the surrounding narration succeeds.
- Any time a task involves writing or rewriting more than roughly one section's worth of prose (a few hundred words), write incrementally: an initial `Write` for the first chunk, then successive `Edit` calls to append or modify subsequent chunks. Never plan to hold a full long document in one response's output before it lands on disk.
- This applies to any skill or ad-hoc task producing long-form content, not just the drafting pipeline — apply the same incremental-write discipline whenever the task shape resembles "write a long document."
