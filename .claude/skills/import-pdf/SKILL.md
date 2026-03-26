---
name: import-pdf
description: Convert a PDF reference post to clean markdown. Strips noise, restores formatting, adds metadata frontmatter, moves PDF to scratch/.
argument-hint: "[path/to/file.pdf]"
disable-model-invocation: true
---

Convert the PDF at `$ARGUMENTS` into a clean markdown reference post.

## Steps

### 1. Validate input
Confirm `$ARGUMENTS` ends in `.pdf` and the file exists. If not, stop and tell the user what's wrong.

### 2. Convert PDF to text
Run:
```
pdftotext "$ARGUMENTS" "/tmp/import_pdf_working.txt"
```

### 3. Read the text file
Read `/tmp/import_pdf_working.txt` in full.

### 4. Strip noise
When writing the markdown output, ignore all lines that match these patterns (common in Substack PDF exports):
- Date-time headers: lines matching `DD/MM/YYYY, HH:MM` format
- URL headers: lines starting with `https://` or `http://`
- Page number footers: lines matching `N/NN` (e.g. `3/34`, `12/34`)
- Substack UI text: "likes", "restacks", "Further reading", "Read full story", "Subscribe"
- Substack subscription prompts: any block containing phrases like "is a reader-supported publication", "consider becoming a free or paid subscriber", "To receive new posts and support my work" — strip the entire surrounding paragraph
- Comments section: everything from the first occurrence of "Discussion about this post", "Write a comment", or reader comment patterns (names followed by dates, "LIKED", "REPLY", "SHARE") to the end of the file — discard entirely

Capture the Substack URL (from the noise) to use as the `source` field in frontmatter.

### 5. Infer metadata from file path
From the PDF path `$ARGUMENTS`:
- `theme` = parent directory name (e.g. `data-science-management`)
- `type` = grandparent directory name (e.g. `standalone`, `series`, `short_technical`)

### 6. Write clean markdown
Output file path: same directory as input, with a lowercase hyphenated slug as the filename and `.md` extension.
Slugify rule: lowercase, replace spaces and special characters with hyphens, remove parentheses and punctuation, collapse multiple hyphens to one.
Example: `How I broke 3 myths about Chinese tech teams (and confirmed 1).pdf` → `how-i-broke-3-myths-about-chinese-tech-teams-and-confirmed-1.md`

Structure:
```
---
title: "<extracted from post heading>"
subtitle: "<extracted if present — usually the deck line below the title>"
author: Jose Parreño Garcia
published: <date extracted from post, format YYYY-MM-DD>
source: <Substack URL captured from noise>
theme: <inferred from path>
type: <inferred from path>
---

# Title

*Subtitle if present*

---

[body of post with clean markdown formatting]
```

Formatting rules:
- Main title → `#`
- Section headings → `##`
- Subsection headings → `###`
- Bold text → `**bold**`
- Italic text → `*italic*`
- Named quotes (e.g. "— George Patton") → blockquote `> text` with attribution on next line `> *Name*`
- Bullet lists → `- item`
- Where visuals appeared, insert a structured placeholder that captures type, source, and role:
  ```
  [Visual: <type> | <source> | <role>]
  ```
  - **type**: `photo`, `diagram`, `screenshot`, `meme`, `chart`, or `illustration`
  - **source**: e.g. `Unsplash (photographer name)`, `Napkin.AI`, `author-generated`, `unknown`
  - **role**: what the visual is doing in the post — e.g. `section separator`, `framework illustration`, `analogy reinforcer`, `mood setter`, `concept diagram`
  - Examples:
    - `[Visual: photo | Unsplash (Casey Horner) | section separator — lighthouse at night]`
    - `[Visual: diagram | Napkin.AI | framework illustration — house showing 5 management traits]`
    - `[Visual: photo | Unsplash (Anastasiya Badun) | mood setter — person with shell over face]`
  - If the source or role is unclear, use `unknown` rather than guessing
  - This metadata is intentional: it tells the style system that Jose's posts use visuals structurally, not just decoratively
- Do not include Substack UI elements (like counts, promotional links, further reading widgets)

### 7. Move PDF to a `pdf/` subfolder alongside the markdown
Create a `pdf/` directory inside the same directory as the input file (if it doesn't exist), then move the PDF there:
```
mkdir -p "<input_file_dir>/pdf"
mv "$ARGUMENTS" "<input_file_dir>/pdf/"
```
For example, a PDF at `reference_posts/standalone/data-science-management/post.pdf` moves to `reference_posts/standalone/data-science-management/pdf/post.pdf`.

### 8. Delete temp file
```
rm /tmp/import_pdf_working.txt
```

### 9. Confirm
Tell the user:
- Path of the created `.md` file
- That the PDF has been moved to `pdf/` alongside the markdown
- Any sections where formatting was uncertain (so Jose can review)
