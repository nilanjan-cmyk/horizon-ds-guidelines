---
name: horizon-ds-figma-bridge
description: >
  Translate any Horizon Figma frame to production code in 9 frameworks
  (React+Tailwind, Vue 3, plain HTML/CSS, SwiftUI, Flutter, Jetpack Compose,
  Qt/C++, PySide6, Java Swing). Or run the inverse: code → Figma. Reads frame
  names, component properties, annotations, and auto-layout before emitting.
when_to_use: >
  Use when converting a Figma URL or YAML spec to code, or when reverse-generating
  a Figma design from existing code. Also use for cross-framework transpilation
  (React → Vue, Swift → Flutter, etc.).
allowed-tools: Read Write Edit Bash Grep Glob Skill ToolSearch
---

# Horizon DS — Figma ↔ code bridge

## Workflow A · Figma → code

```
1. Resolve URL → fileKey + nodeId (e.g. https://figma.com/design/<key>?node-id=1-2 → "1:2")
2. MCP get_design_context(fileKey, nodeId) → YAML spec
3. MCP get_screenshot → save to .figma/{nodeId}.png
4. READ and JUDGE the Figma frame tree:
   a. Frame names → verify {Feature}/{View}/{Breakpoint} convention
   b. Component instances → verify variant, size, state; extract componentProperties
   c. Auto-layout → verify 8-grid token bindings (gap_, rounded_ rem-based names)
   d. Artifacts → flag raw shapes that should be DS instances
5. READ all annotations, comments, TODOs:
   → Apply clear requirements as constraints
   → If ambiguous ("TBD", "?", contradictions) → STOP and ask user
6. Detect target framework from package.json / pubspec.yaml / Cargo.toml
7. For every chunk in YAML:
   - instance_of  → look up design.md §6 → code import path
   - resolved_tokens → look up design.md §3 → Tailwind class or CSS var
   - icons → match the project's icon library (Phosphor / Lucide / SF Symbols / …)
   - missing assets → https://placehold.co/{w}x{h}
8. Emit code minimally — only what the spec describes
9. preview_start → preview_screenshot → diff against .figma/*.png
10. Iterate until perceptual diff < ~3 %
11. Report: files written, placeholders used, deviations, annotations found
```

## Workflow B · Code → Figma

```
1. Parse imported components + props (AST or grep import statements)
2. Map each Horizon symbol → component_key from horizon-keys.md
3. Skill("figma-use")
4. Build frames via use_figma — atoms first, molecules second, organisms last
5. Bind every fill/stroke/gap/radius to Horizon variables (rem-based names)
6. Position new top-level frames AWAY from (0,0)
7. Return all created node IDs
```

## Token naming (rem-based, 1 rem = 4 px)

| Token | Formula | Example |
|---|---|---|
| `spacing_gap/gap_{rem}` | px ÷ 4 | `gap_4` = 16 px |
| `radius/rounded_{rem}` | px ÷ 4 | `rounded_2` = 8 px |
| `stroke-width/border-{rem}` | px ÷ 4 | `border-0,5` = 2 px |
| `opacity/opacity_{n}` | sequential 0–20 | `opacity_10` = 50% |

## Framework matrix

| Target | Component import root | Style | State | Icons |
|---|---|---|---|---|
| React + Tailwind | `@/components/ui/*` | Tailwind + CSS vars | TanStack Query / Zustand | Phosphor / Lucide |
| Vue 3 | `@/components/ui/*.vue` | Tailwind / UnoCSS | Pinia | Phosphor-vue |
| Plain HTML + CSS | (n/a) | CSS vars + BEM | (n/a) | inline SVG |
| SwiftUI | `Horizon` Swift package | native | Combine | SF Symbols |
| Flutter | `horizon_flutter` | ThemeData | Riverpod | flutter_phosphor |
| Jetpack Compose | `com.horizon.compose` | MaterialTheme + custom | StateFlow | compose-icons phosphor |
| Qt / C++ | `HorizonQt` | QSS + tokens | Qt Property | resource SVGs |
| PySide6 | `horizon_pyside` | QSS + tokens | Qt Property | resource SVGs |
| Java Swing | `com.horizon.swing` | LookAndFeel + custom | Observable | resource SVGs |

If the framework isn't listed, fall back to plain HTML + CSS and call it out.

## Hard rules

- Never hardcode hex / px / rem values. Use tokens from design.md §3.
- Never recreate a Horizon component manually — instantiate it.
- Always emit four async states: loading, empty, populated, error.
- Always verify Light + Dark mode parity before reporting done.
- Always screenshot or visual-diff after each major change.
- Always read frame names, properties, and annotations before emitting code.
- Never silently resolve ambiguous annotations — ask the user.
