## 2026-04-05 — /research

No issues encountered in the research subagent execution itself. All 3 notes.md URLs survived validation and 7 gap-filling searches completed within the 10-source cap.

---

## 2026-04-05 — /brainstorm (main session)

**Stuck / adapted:**
- Fetching the paper via the PDF URL (`https://arxiv.org/pdf/2509.21825`) returned raw binary PDF data — the `ctx_fetch_and_index` tool indexed it but all search results came back as garbled bytes. Unblocked by switching to the HTML version (`https://arxiv.org/html/2509.21825v4`), which indexed cleanly and was fully searchable.

**Ambiguous / missing instruction:**
- The brainstorm skill says "If neither [post folder nor post.yaml] exists, tell Jose to run `/new-post` first." In this session the user had no folder yet but wanted to brainstorm first (reasonable). The skill doesn't cover this case — it assumes a folder already exists. The workaround was to run the brainstorm conversation anyway and create the folder at the output step. A note in the skill about this "folder-less start" path would prevent future confusion.

**Wrong assumption:**
- The GitHub link provided by the user (`JulesLscx/DS-Star`) was assumed to be the official Google repo based on context. After fetching it, the README made clear it was a community re-implementation (37 forks, 145 stars, "implementation of the paper from Google Research"). This materially changed section 5 of the ToC — from a code walkthrough to an analysis of the prompts in Appendix L. The paper itself has no official GitHub link. This was caught and corrected during brainstorm, not after.

**Improvisation:**
- Notes.md was extended with a Source Index table (search labels + key facts) beyond what the `notes_brainstorm_template.md` specifies. This was added to make the paper's content searchable by future draft/research agents without re-fetching. No instruction covered this; it was added as a practical aid given the paper content was already indexed in the session sandbox.
