---
name: import-pdf
description: "Converts a PDF reference post to clean markdown. DO trigger: when importing a Substack PDF export as a reference post — strips date headers, page numbers, UI noise, and subscription prompts; restores heading hierarchy, bold, blockquotes, and visual placeholders; writes frontmatter; moves the PDF to a pdf/ subfolder. DO NOT trigger: for non-PDF files; for files already in markdown; when the goal is content editing rather than format conversion. Keywords: import, PDF, convert, markdown, Substack, reference post, pdftotext."
argument-hint: "[path/to/file.pdf]"
license: proprietary
compatibility: "Claude Code; requires poppler (pdftotext) installed"
metadata:
  author: jose-parreno-garcia
  version: "1.0"
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
Full noise patterns to strip (date headers, page numbers, Substack UI text, subscription prompts, comments section) are in `references/formatting-rules.md` — load that file now.

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

Markdown formatting conventions and visual placeholder format (with type/source/role definitions and examples) are in `references/formatting-rules.md` — load that file now and apply all rules throughout.

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
