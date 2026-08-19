#!/usr/bin/env node
/**
 * Stop hook — reads the skill completion marker and, if present, injects a
 * reflection prompt that keeps Claude running one more turn to write
 * skill_reflection_log.md in the post folder.
 *
 * Safe against loops: marker is deleted before returning "block", so the
 * subsequent Stop call finds no marker and exits cleanly.
 * Extra safety: exits immediately if stop_hook_active is true.
 */

const fs = require('fs');

const MARKER = '/tmp/.newsletter_skill_ran';

let raw = '';
process.stdin.on('data', d => raw += d);
process.stdin.on('end', () => {
  // Prevent infinite loops — Claude Code sets this when a previous Stop hook blocked
  try {
    const hookInput = JSON.parse(raw);
    if (hookInput.stop_hook_active) process.exit(0);
  } catch (_) {}

  if (!fs.existsSync(MARKER)) process.exit(0);

  let skill, postFolder;
  try {
    const content = JSON.parse(fs.readFileSync(MARKER, 'utf8'));
    skill      = content.skill;
    postFolder = content.postFolder;
    fs.unlinkSync(MARKER); // Delete BEFORE returning block to prevent re-trigger
  } catch (_) {
    try { fs.unlinkSync(MARKER); } catch (_) {}
    process.exit(0);
  }

  if (!skill) process.exit(0);

  const today = new Date().toISOString().slice(0, 10);

  const reason = [
    `REFLECTION PROMPT — /${skill} just finished on '${postFolder}'.`,
    ``,
    `Before this session closes, please reflect on the process you just went through. For each of the following, write a brief and specific note:`,
    ``,
    `- Any step where you got stuck or had to adapt to get unblocked`,
    `- Any skill instruction that was ambiguous, missing, or led to unexpected behaviour`,
    `- Any assumption you made that turned out to be wrong`,
    `- Any retry, workaround, or improvisation you applied`,
    ``,
    `Write your reflection to ${postFolder}/skill_reflection_log.md.`,
    `If the file already exists, append using this header: ## ${today} — /${skill}`,
    `If it does not exist, create it with that header.`,
    ``,
    `Keep entries factual and specific — this log is reviewed with Jose to make skill instructions more resilient over time.`,
    `If there is genuinely nothing to report, write: "No issues encountered."`,
  ].join('\n');

  console.log(JSON.stringify({ decision: 'block', reason }));
});
