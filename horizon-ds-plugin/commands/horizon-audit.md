---
description: Audit a Figma node OR a code file against the Horizon DS atomic-design rules, frame naming conventions, and annotation resolution. Returns a prioritized punch list.
allowed-tools: Read Grep Glob Skill ToolSearch
arguments: [target]
argument-hint: [figma-url-or-file-path]
---

# /horizon-audit — atomic-design audit

Use this to check a screen or component for Horizon DS drift.

## Steps

1. Detect input type:
   - URL containing `figma.com` → Figma audit path
   - Local file path → Code audit path
2. Load the `horizon-ds-atomic-audit` skill.
3. Run the eight audit questions against every node:
   1. Raw hex / px? → must be tokenized.
   2. Is this a published Horizon instance? → must be (or a documented proposal).
   3. Are children of a strictly lower tier? → must be.
   4. Are props at the right intent level?
   5. Are all four async states present?
   6. Are Light + Dark modes both verified?
   7. Do frame names follow `{Feature}/{View}/{Breakpoint}`? → flag "Untitled" or "Frame N".
   8. Are all annotations/comments/TODOs resolved? → flag unaddressed "TBD" or "?".
4. Verify token naming uses rem-based conventions: `gap_{rem}`, `rounded_{rem}`, `opacity_{0-20}`, `border-{rem}`.
5. Output the standard Atomic Audit Report (markdown) with priority bands.
6. Suggest the next skill: `fix-design-system-finding` for one finding, `apply-design-system` for many.

Argument: `$target` = Figma URL or file path.
