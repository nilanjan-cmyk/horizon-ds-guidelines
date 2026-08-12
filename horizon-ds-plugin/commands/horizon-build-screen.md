---
description: Atlas pipeline — turn a brief into a Figma frame using only Horizon components with rem-based token bindings. Reads frame context and annotations before building.
allowed-tools: Read Skill ToolSearch
arguments: [brief]
argument-hint: [brief]
---

# /horizon-build-screen — brief → Figma frame

Atlas (product designer) takes a written brief and produces a Figma frame using only Horizon components.

## Steps

1. Invoke the **Atlas** agent.
2. Atlas reads `/design.md` and `references/Guidelines_Product_Design.md`.
3. Atlas reads existing frame context on the target page:
   - Frame names and hierarchy
   - Existing component instances and their properties
   - Annotations, comments, and TODOs — applies requirements, asks about ambiguities
4. Atlas runs Workflow A:
   - Skill("figma-use")
   - Sketch IA in 1 paragraph (page header, sections, primary CTA)
   - `search_design_system` for every component class needed
   - Build top-down: Page → Top Nav → Sidebar → Page Header → Content
   - Bind every fill / stroke / gap / radius via rem-based variable bindings (`gap_{rem}`, `rounded_{rem}`)
   - Apply text styles via key
   - Final `get_screenshot` at 2x; verify WCAG AA on primary text
5. Returns: `{ frameId, screenshotPath, deviationsFromGuidelines: [], annotationsFound: [] }`

Argument: `$brief` = the brief.
