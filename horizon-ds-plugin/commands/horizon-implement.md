---
description: Sirius pipeline — turn a Figma URL or YAML spec into production code in the detected framework. Reads frame properties, annotations, and component instances before generating.
allowed-tools: Read Write Edit Bash Grep Glob Skill ToolSearch
arguments: [source, framework]
argument-hint: [figma-url-or-spec-path] [framework?]
---

# /horizon-implement — Figma → code

Sirius (frontend designer) takes a Figma URL (or a YAML spec) and produces production code.

## Steps

1. Invoke the **Sirius** agent with the URL/path.
2. Sirius runs Workflow A:
   - Skill("/frontend-design") — set the bar
   - Read `/design.md`
   - Skill("/figma-use")
   - Resolve URL → fileKey + nodeId
   - `get_design_context` → YAML spec
   - `get_screenshot` → save to `.figma/{nodeId}.png`
   - **READ and JUDGE frame tree**: frame names, component properties, auto-layout, artifacts
   - **READ annotations/comments/TODOs** — apply requirements, ask about ambiguities
   - Skill("/figma-implement-design") OR `/implement-design`
   - Detect framework from `package.json` / `pubspec.yaml` / `Cargo.toml` (or use `$framework`)
   - Generate code minimally (one component at a time, no premature abstraction)
   - Map tokens using rem-based names: `gap_{rem}`, `rounded_{rem}`, `opacity_{0-20}`
   - Skill("/rad-spacing") · Skill("/apply-design-system") on the output
   - `preview_start` → `preview_screenshot` → diff vs `.figma/*.png`
   - Iterate until perceptual diff < ~3 %
   - Skill("/audit-design-system") · Skill("/ux-copy") · Skill("/design-critique") · Skill("/design-handoff")
3. Reports: files written, placeholders used, deviations, annotations found.

Argument: `$source` = Figma URL or YAML path; `$framework` = optional framework override.
