# PDF Import Formatting Rules

## Markdown formatting conventions

- Main title → `#`
- Section headings → `##`
- Subsection headings → `###`
- Bold text → `**bold**`
- Italic text → `*italic*`
- Named quotes (e.g. "— George Patton") → blockquote `> text` with attribution on next line `> *Name*`
- Bullet lists → `- item`

## Visual placeholder format

Where visuals appeared in the original PDF, insert a structured placeholder:

```
[Visual: <type> | <source> | <role>]
```

- **type**: `photo`, `diagram`, `screenshot`, `meme`, `chart`, or `illustration`
- **source**: e.g. `Unsplash (photographer name)`, `Napkin.AI`, `author-generated`, `unknown`
- **role**: what the visual is doing — e.g. `section separator`, `framework illustration`, `analogy reinforcer`, `mood setter`, `concept diagram`

Examples:
- `[Visual: photo | Unsplash (Casey Horner) | section separator — lighthouse at night]`
- `[Visual: diagram | Napkin.AI | framework illustration — house showing 5 management traits]`
- `[Visual: photo | Unsplash (Anastasiya Badun) | mood setter — person with shell over face]`

If the source or role is unclear, use `unknown` rather than guessing. This metadata tells the style system that Jose's posts use visuals structurally, not just decoratively.

## Substack noise patterns to strip

When writing markdown output, ignore all lines matching these patterns:

- Date-time headers: lines matching `DD/MM/YYYY, HH:MM` format
- URL headers: lines starting with `https://` or `http://`
- Page number footers: lines matching `N/NN` (e.g. `3/34`, `12/34`)
- Substack UI text: "likes", "restacks", "Further reading", "Read full story", "Subscribe"
- Substack subscription prompts: any block containing "is a reader-supported publication", "consider becoming a free or paid subscriber", "To receive new posts and support my work" — strip the entire surrounding paragraph
- Comments section: everything from the first occurrence of "Discussion about this post", "Write a comment", or reader comment patterns (names followed by dates, "LIKED", "REPLY", "SHARE") to the end of the file — discard entirely

Capture the Substack URL (from the noise) to use as the `source` field in the output frontmatter.
