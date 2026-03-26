---
name: new-post
description: Create a new post folder with the standard template and kick off the brainstorm session.
argument-hint: "[slug — optional]"
disable-model-invocation: true
---

Create a new post workspace and start the brainstorm session.

## Steps

### 1. Determine the slug

If `$ARGUMENTS` is provided, use it as the slug. Apply these rules:
- Lowercase
- Replace spaces and special characters with hyphens
- Remove punctuation
- Collapse multiple hyphens to one
- Example: `"My GenAI post idea"` → `my-genai-post-idea`

If no argument is provided, ask:
> "What would you like to call this post? I'll use your answer to create a folder slug — or give me a rough working title and I'll derive one."

Wait for the answer, then derive the slug and confirm it:
> "I'll create `posts/my-genai-post-idea/` — does that look right?"

### 2. Check for conflicts

If `posts/<slug>/` already exists, say:
> "A folder at `posts/<slug>/` already exists. Do you want to continue with a different slug, or open the existing post and run `/brainstorm` on it directly?"

Stop and wait for Jose's answer.

### 3. Create the folder and copy the template

Create `posts/<slug>/` and populate it:

```
posts/<slug>/
  notes.md                  # copy of templates/notes.md
  post.yaml                 # copy of templates/post.yaml, with slug field pre-filled
  research_brief.md         # copy of templates/placeholder.md
  outline.md                # copy of templates/placeholder.md
  long_draft.md             # copy of templates/placeholder.md
  seo_brief.md              # copy of templates/placeholder.md
  promotion/
    linkedin.md             # copy of templates/placeholder.md
    substack_promo.md       # copy of templates/placeholder.md
```

In the copied `post.yaml`, pre-fill:
```yaml
slug: "<slug>"
```

### 4. Confirm and hand off to brainstorm

Tell Jose:
> "Created `posts/<slug>/`. Starting the brainstorm now."

Then immediately run the `/brainstorm` skill on `posts/<slug>/`.
