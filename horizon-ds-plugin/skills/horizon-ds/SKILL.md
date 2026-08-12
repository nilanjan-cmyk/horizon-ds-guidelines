---
name: horizon-ds
description: >
  Master skill for the Horizon Design System. Loads tokens (rem-based naming),
  component map, atomic-design classification, frame-reading rules, annotation
  handling, and the human-readable Guideline + machine-readable design.md.
when_to_use: >
  Use BEFORE any UI work that touches the WPRemote / BlogVault / MalCare / Airlift
  product family — design, code, audit, or review. Also use when someone asks about
  Horizon components, tokens, spacing rules, or design system conventions.
allowed-tools: Read Grep Glob Skill ToolSearch
---

# Horizon Design System — master skill

You are operating inside a project that consumes the **Horizon Design System**. Before doing any design or frontend work:

1. Read the reference docs in this skill's `references/` folder (in order):
   - `Guidelines_Product_Design.md` — human rules: nomenclature, layout grid, spacing scale (multiples of 8 only), tokens, every component's anatomy, frame-reading, annotation handling, accessibility, audit checklist.
   - `design.md` — machine-readable bridge: tokens (DTCG-shaped, rem-based naming), component catalog with Figma keys, code mappings for 9 frameworks, atomic-design tier assessment, frame inspection rules (§13), annotation handling (§14), MCP integration.
   - `horizon-keys.md` — exact `figma_component_key` / `variable_key` / `text_style_key` values for `importComponentByKeyAsync`.
2. Pick the correct sub-skill for your task:
   - **Tokens only** → `horizon-ds-tokens`
   - **Figma → code translation** → `horizon-ds-figma-bridge`
   - **Atomic-design audit** (variable → atom → molecule rules) → `horizon-ds-atomic-audit`

## Token naming convention (rem-based, 1 rem = 4 px)

| Category | Figma path | Naming formula | Examples |
|---|---|---|---|
| Spacing | `spacing_gap/gap_{rem}` | value ÷ 4 | `gap_2` = 8 px, `gap_4` = 16 px, `gap_6` = 24 px |
| Radius | `radius/rounded_{rem}` | value ÷ 4 | `rounded_2` = 8 px, `rounded_4` = 16 px, `rounded_9999` = pill |
| Stroke | `stroke-width/border-{rem}` | value ÷ 4 | `border-0,25` = 1 px, `border-0,5` = 2 px, `border-1` = 4 px |
| Opacity | `opacity/opacity_{n}` | sequential 0–20 | `opacity_0` = 0%, `opacity_10` = 50%, `opacity_20` = 100% |
| Width | `width/w-{rem}` | value ÷ 4 | `w-0,5` = 2 px, `w-1` = 4 px |
| Height | `height/h-{rem}` | value ÷ 4 | `h-0,5` = 2 px, `h-1` = 4 px |

Fractional rems use commas (Figma limitation): `0,5` not `0.5`.

## Core invariants (auto-fail if violated)

- No raw hex / px / rem in any node. Bind a Horizon variable.
- Allowed gutter / padding / gap values: `0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80` and all multiples of 8 up to 240.
- Every UI element is a Horizon component instance — never a custom frame mimicking one.
- Every async region has four states: loading (Skeleton), empty, populated, error.
- Light + Dark mode both verified before claiming done.
- Read on the left, act on the right. One primary CTA per page.
- **Read frame names, component properties, auto-layout, and artifacts before generating or auditing (design.md §13).**
- **Read all annotations, comments, and TODOs — ask the user when ambiguous (design.md §14).**
- **`alpha/*` is an INVERTED scale** — `alpha/10` = 90 % opacity, `alpha/90` = 10 %. Never read the number as opacity. Resolved Light/Dark values for all 35 Mode tokens live in design.md §3.1 (mirrored from the Figma `Mode Tokens` ledger page `4537:25378`).

## Frame reading (mandatory before generate or audit)

Before generating code or auditing a design:
1. Read frame names — must follow `{Feature} / {View} / {Breakpoint}`. Flag "Frame 43" or "Untitled".
2. Read component instance properties — verify correct variant, size, state. Extract designer intent from text props and boolean toggles.
3. Read auto-layout — verify gap/padding use 8-grid tokens.
4. Read artifacts — flag raw shapes that should be DS instances.
5. Read annotations/comments/TODOs — apply clear requirements; **STOP and ask user** when ambiguous ("TBD", "?", contradictions).

## Discovery commands

| Need | Tool / call |
|---|---|
| List Horizon pages | `figma.root.children` (via `use_figma`) |
| Find a component by name | MCP `search_design_system` with `includeLibraryKeys=[<lk-...>]` |
| Get a Figma frame's spec | MCP `get_design_context(fileKey, nodeId)` |
| Get visual reference | MCP `get_screenshot` → save to `.figma/{nodeId}.png` |
| Resolve a variable's value | MCP `get_variable_defs` |
| Inspect frame tree | MCP `get_metadata(fileKey, nodeId)` |

## Reference quick paths

- Guideline doc → [Guidelines_Product_Design.md](references/Guidelines_Product_Design.md)
- Bridge doc → [design.md](references/design.md)
- Component keys → [horizon-keys.md](references/horizon-keys.md)
