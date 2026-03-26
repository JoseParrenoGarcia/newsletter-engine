# Core Rules

## Content guardrails
- Never hallucinate references, sources, citations, or URLs. Flag uncertainty explicitly.
- No invented authors, books, papers, blog posts, or repos.
- No generic AI filler prose in any drafted content.
- No automatic publishing or irreversible file actions without explicit instruction.

## File handling
- Never read a PDF directly with the Read tool. Requires `poppler` (see README for setup).
  Convert first, then work with the text output:
  ```
  pdftotext yourfile.pdf yourfile.txt
  ```
  Then convert the `.txt` to a clean `.md` file. Move the original PDF to `scratch/`.
- Reason: reading a PDF via the Read tool costs ~30x more tokens than plain text (73,500 vs ~2,400 for a 44-page document). Reference: https://github.com/anthropics/claude-code/issues/20223

## Workflow guardrails
- Every skill reads from and writes to predictable files only. No side effects outside the post folder.
- Check `post.yaml` stage flags before running a skill. Do not overwrite a completed stage without explicit instruction from Jose.
- Style guides and reference posts are ground truth for tone and structure. Load the files referenced in `post.yaml` before drafting.

## Skill design guardrail
- `/seo` and `/promote` must work on any draft — including posts written by Jose independently, outside the pipeline.
