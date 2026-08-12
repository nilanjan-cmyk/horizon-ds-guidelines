---
description: Bootstrap a new Horizon-conformant screen — picks the right Page template, applies rem-based tokens, lays out the Page Header / Sidebar / Content sections.
allowed-tools: Read Skill ToolSearch
arguments: [screen-name, template]
argument-hint: [screen-name] [template?]
---

# /horizon-init — bootstrap a new screen

Use this when starting a new screen in this Horizon-aware project.

## Steps

1. Load the `horizon-ds` skill (umbrella).
2. Ask the user (or infer from the brief) which template to use:
   - `Page` (default · top-nav + sidebar + content)
   - `Two-pane` (Section 1 = 248 px + Section 2)
   - `Three-pane` (248 + dynamic + 320)
   - `Modal-only`
   - `Form-only`
3. Invoke the **Atlas** agent with the chosen template and screen name.
4. Atlas builds the frame in Figma using:
   - The 12-col grid (88 px column · 24 px gutter · 24 px offset)
   - `surface/page-background-content` as the canvas
   - Top Nav (80 px), Sidebar (296/48 px), Page Content (16 px top + left padding)
   - All spacing via rem-based tokens: `gap_{rem}`, `rounded_{rem}`
5. Atlas reads existing annotations on the page — applies requirements, asks about ambiguities.
6. Returns the new Figma node URL + a screenshot.

Argument: `$screen-name` = screen name, `$template` = template (optional, defaults to `Page`).
