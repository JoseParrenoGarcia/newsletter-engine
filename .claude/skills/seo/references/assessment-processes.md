# SEO Assessment Processes

## Meta description

Draft a meta description that:
- Is ≤160 characters
- Includes the primary keyword
- Has a clear call to action or value proposition
- Reads naturally — not keyword-stuffed

## URL slug

Compare the current slug (from `post.yaml` or folder name) against the primary keyword. Recommend a change only if the current slug is significantly weaker (e.g. missing the keyword, too long, contains stop words). If the current slug is good, say "no change needed."

## H1 recommendation

- Medium displays titles up to ~60-70 characters cleanly
- The H1 should include the primary keyword
- Assess the current `working_title` — recommend a tighter version if it is too long, keyword-weak, or generic

## H2/H3 structure review

Read all headings in `long_draft.md`. For each H2/H3:
- Note whether it includes a relevant keyword or is purely descriptive
- Recommend a reword if the heading would benefit from keyword inclusion without sounding forced
- Keep recommendation to "keep as-is" if it is already strong

## Keyword placement checklist

Check each of the 5 positions:
1. H1 / Title — is the primary keyword in `working_title` or your H1 recommendation?
2. First 100 words — does the primary keyword appear in the opening?
3. At least one H2 — does any H2 include the primary keyword or a close variant?
4. Meta description — does your recommended meta description include it?
5. URL slug — does the slug include the primary keyword?

Score: count of ✓ out of 5.

## Readability assessment

Analyse the draft for:
- **Average sentence length**: estimate from a representative sample of 10-15 sentences
- **Long sentences**: sentences over 30 words — count them; list the first 3 if count > 5
- **Passive voice**: count passive constructions; list examples if > 3
- **Paragraph length**: are most paragraphs 2-4 sentences? Flag any paragraph over 6 sentences
- **Jargon density**: are there terms a non-specialist would not know? Rate low/medium/high and list specific terms if medium or high
- **Reading level**: estimate as Plain English / Grade 8-10 / Technical — aim for Plain English or Grade 8-10 for Medium

## Content quality signals

- Count actual words in the draft
- Compare to `target_reading_time_minutes × 250` (if set in `post.yaml`)
- Count external links cited in the draft
- If `research_brief.md` is available: cross-reference cited URLs against it to confirm they are from authoritative sources. If any cited URL is not in `research_brief.md`, flag it.
