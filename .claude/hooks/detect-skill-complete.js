#!/usr/bin/env node
/**
 * PostToolUse hook — watches Write tool calls for skill-specific output files.
 * When detected, writes a marker to /tmp/.newsletter_skill_ran for the Stop hook to read.
 *
 * Skill → trigger file mapping:
 *   /draft      → outline.md          (unique to draft; written before long_draft.md)
 *   /research   → research_brief.md
 *   /seo        → seo_brief.md
 *   /review     → review_report.md
 *   /promote    → promotion_posts.md
 *   /revise     → long_draft_v1.md    (backup written at revise start, before new draft)
 */

const fs = require('fs');
const path = require('path');

const SKILL_SIGNALS = {
  'outline.md':          'draft',
  'research_brief.md':   'research',
  'seo_brief.md':        'seo',
  'review_report.md':    'review',
  'promotion_posts.md':  'promote',
  'long_draft_v1.md':    'revise',
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
      const postFolder = path.dirname(filePath);
      fs.writeFileSync(MARKER, JSON.stringify({ skill: skillName, postFolder }));
    }
  } catch (_) {
    // Silently ignore — never block the tool call
  }
  process.exit(0);
});
