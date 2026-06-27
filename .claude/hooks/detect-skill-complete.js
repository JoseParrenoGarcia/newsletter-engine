#!/usr/bin/env node
/**
 * PostToolUse hook — watches Write tool calls for skill-specific output files.
 * When detected, writes a marker to /tmp/.newsletter_skill_ran for the Stop hook to read.
 *
 * Detection methods:
 *   Basename match (SKILL_SIGNALS map):
 *     /draft       → outline.md           (unique to draft; written before long_draft.md)
 *     /research    → research_brief.md
 *     /seo         → seo_brief.md
 *     /review      → review_report.md
 *     /promote     → promotion_posts.md
 *     /revise      → long_draft_pre-revise.md  (backup written at revise start)
 *     /index       → INDEX.md             (only skill that writes posts/INDEX.md)
 *
 *   Content check (post.yaml):
 *     /brainstorm  → post.yaml containing 'stages.brainstorm.status: complete'
 *                    (post.yaml is written by many skills; content check is required)
 *
 *   Path prefix check:
 *     /import-pdf  → any .md written under reference_posts/
 *                    (output filename is slug-derived; cannot be mapped by basename)
 *                    Caveat: any future skill writing .md under reference_posts/ would also trigger.
 *
 *   Not detected:
 *     /new-post    → orchestrator only; no unique output file of its own
 *
 * Why not use the settings.local.json `if` field instead:
 *   The `if` field supports one glob per hook entry. Covering 9 signals would require
 *   9 separate hook entries in settings.local.json. A single JS dispatcher is cleaner.
 */

const fs = require('fs');
const path = require('path');

const SKILL_SIGNALS = {
  'outline.md':               'draft',
  'research_brief.md':        'research',
  'seo_brief.md':             'seo',
  'review_report.md':         'review',
  'promotion_posts.md':       'promote',
  'long_draft_pre-revise.md': 'revise',
  'INDEX.md':                 'index',
};

const MARKER = '/tmp/.newsletter_skill_ran';

let raw = '';
process.stdin.on('data', d => raw += d);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(raw);
    const filePath = (data.tool_input || {}).file_path || '';
    const fileName  = path.basename(filePath);
    const skillName = SKILL_SIGNALS[fileName];

    if (skillName) {
      fs.writeFileSync(MARKER, JSON.stringify({ skill: skillName, postFolder: path.dirname(filePath) }));
      process.exit(0);
    }

    // brainstorm: post.yaml written with brainstorm completion marker
    if (fileName === 'post.yaml') {
      const content = (data.tool_input || {}).content
                   || (data.tool_input || {}).new_string
                   || '';
      if (content.includes('stages.brainstorm.status: complete')) {
        fs.writeFileSync(MARKER, JSON.stringify({ skill: 'brainstorm', postFolder: path.dirname(filePath) }));
      }
      process.exit(0);
    }

    // import-pdf: slug-derived .md written under reference_posts/
    if (fileName.endsWith('.md') && filePath.includes('reference_posts/')) {
      fs.writeFileSync(MARKER, JSON.stringify({ skill: 'import-pdf', postFolder: path.dirname(filePath) }));
      process.exit(0);
    }

  } catch (_) {
    // Silently ignore — never block the tool call
  }
  process.exit(0);
});
