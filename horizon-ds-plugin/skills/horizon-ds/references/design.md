---
name: WPRemote · BlogVault · MalCare · Airlift — design.md
version: 1.3.0
last_synced: 2026-08-12
design_system:
  name: Horizon Design System
  display_name: "⚙️ Horizon Design System ✨"
  figma_file_key: UfHICFSU9PJl9OkE84mUk9
  figma_url: https://www.figma.com/design/UfHICFSU9PJl9OkE84mUk9
  library_key: lk-47ecb318fd01d6c8c5dd1f4fa00d27ace8c5fb7ca8377928451f63aae7ce10fa4bb7aedd81964f2fc4e35f8d96fe478f45cbe45ed377b6a6493e311b33851b8b
target_frameworks:
  default: react+tailwind
  supported: [react+tailwind, vue3, html+css, swiftui, flutter, jetpack-compose, c++qt, python+pyside6, java+swing]
mcp_endpoints:
  figma_dev_mode: http://127.0.0.1:3845/mcp
  preview_server: claude_preview
output_options:   # mirrors the Figma "Specs" plugin panel
  detailed_data_attributes: true
  ai_ready_yaml: true
  compact_mode: true
  show_parent_layout: true
  target_framework: auto-detect
layer_breakdown:
  table_format: true
  include_all_variants: true
  include_nested_components: true
include:
  layer_breakdown: true
  variant_properties: true
  layout_and_spacing: true
  data_export: true
  style_inventory: true
  variables: true
  modes: true
---

# design.md — The Bridge Between Figma and Code

> **What this file is.** A single, AI-readable contract between the **Horizon Design System** (Figma) and the codebases that consume it. Any AI agent — Claude, Claude Code, Codex, Cursor, v0, Lovable, Bolt — should read this file before generating UI for this product family. It works alongside the Figma Dev Mode MCP server but is also self-sufficient when MCP is unreachable.
>
> **What this file does.**
> - Generate Figma designs from a brief (text → Figma) using the `use_figma` plugin API.
> - Generate code from a Figma design (Figma → code) in any of the target frameworks.
> - Generate a Figma design from existing code (code → Figma) by reverse-mapping components.
> - Run locally in terminal, IDE, or Claude Code — no plugin install required for the code paths.
> - Provide a deterministic component-to-code map so two agents on two machines produce the same output.

---

## Table of contents

1. [How to use this file](#1-how-to-use-this-file)
2. [The four workflows](#2-the-four-workflows)
3. [Design tokens (DTCG-shaped)](#3-design-tokens-dtcg-shaped)
4. [Layout system](#4-layout-system)
5. [Typography](#5-typography)
6. [Component catalog](#6-component-catalog)
7. [Code mappings per framework](#7-code-mappings-per-framework)
8. [Figma plugin API recipes](#8-figma-plugin-api-recipes)
9. [Specs YAML schema (Figma → code)](#9-specs-yaml-schema-figma--code)
10. [Output & AI options](#10-output--ai-options)
11. [Do / Don't rules](#11-do--dont-rules)
12. [MCP integration](#12-mcp-integration)
13. [Reading Figma frames — names, artifacts, components, and properties](#13-reading-figma-frames)
14. [Reading annotations — discuss when ambiguous](#14-reading-annotations)
15. [Design taste — break from convention](#15-design-taste--break-from-convention)
16. [Versioning](#16-versioning)

---

## 1. How to use this file

**Order of operations for every AI agent invocation:**

```
1. READ  /design.md                                   ← this file
2. READ  "/deliverables/Guidelines_Product Design.md"   ← human-readable rules
3. READ  ~/.claude/.../memory/reference_horizon_ds_keys.md        ← component & variable keys
4. INVOKE Skill("figma-use") if any Figma write is required
5. PROCEED with §2 workflow appropriate to the request
```

**Stable IDs.** Every component below has both a `figma_node_id` (where applicable) and a `code_symbol`. Agents bidirectionally resolve via either.

**Token references** use DTCG aliasing: `{color.surface.card-background}`, `{spacing.gap.gap_4}` (16 px), `{type.sm.normal.medium}`.

---

## 2. The four workflows

### 2.A · Brief → Figma (text-to-design)

Goal: a designer types a brief; an agent assembles a Figma frame using only Horizon components.

```
1. Skill("figma-use")
2. Read tokens (§3) and components (§6) from this file
3. search_design_system(query, includeLibraryKeys=[<library_key>])
4. importComponentByKeyAsync for each component the brief needs
5. Build Page → Top Nav → Sidebar → Page Header → Content (one use_figma per layer)
6. Bind every fill/stroke/gap/radius via setBoundVariableForPaint or .setBoundVariable
7. Apply text styles via importStyleByKeyAsync + node.textStyleId
8. Position the new top-level frame to the right of the rightmost existing frame
9. get_screenshot, verify, return { frameId, screenshotPath }
```

### 2.B · Figma → code (design-to-code)

Goal: an agent gets a Figma URL or YAML spec, outputs production code in the detected framework.

```
1. Resolve URL → fileKey + nodeId
2. get_design_context(fileKey, nodeId, clientFrameworks)
3. get_screenshot → save to .figma/{nodeId}.png
4. Detect framework from package.json (or ask the user once)
5. For every chunk in the YAML:
     - Resolve instance_of via §6 component map → code import path
     - Resolve resolved_tokens via §3 → CSS var or Tailwind class
     - Match icons to the project's icon library (Phosphor / Lucide)
     - For unknown assets → https://placehold.co/{w}x{h}
6. Emit code, run preview, screenshot, perceptual-diff against .figma/*.png
7. Iterate until diff < 3%
8. Report: files written, placeholders used, deviations
```

### 2.C · Code → Figma (reverse generation)

Goal: an agent reads existing JSX/Vue/HTML and reconstructs a Figma design.

```
1. Parse the source — collect imported component names + props
2. For every imported symbol, look up §7 → maps to Horizon component_key
3. For every Tailwind class, look up §3 → maps to a Horizon variable
4. Build Figma frames using §2.A's loop, but driven by parsed AST instead of brief
5. Preserve the source file's tree as the Figma frame hierarchy
```

### 2.D · Local preview (no Figma needed)

Goal: an agent builds a UI and verifies it without ever opening Figma.

```
1. Read this file's tokens + components
2. Generate a Tailwind config that mirrors §3 (or use the published @horizon/tokens npm package)
3. Build pages using shadcn/ui-style local components that wrap the design tokens
4. preview_start → preview_screenshot → done
```

---

## 3. Design tokens (DTCG-shaped)

Three Horizon collections feed this file. Primitives → Semantic → Component is the resolution order.

### 3.1 Semantic — `Mode` collection (Light / Dark)

These are the only color tokens you should touch on UI surfaces. 35 tokens · Light + Dark. Resolved values below are read from the **Mode Tokens** ledger page in Figma (`4537:25378`) — the canonical source. `$extensions.figma.id` is the variable id, usable directly in `setBoundVariable`.

```yaml
color:
  surface:                      # 12 tokens — backgrounds & borders
    page-background-content:    { $type: color, light: "#FDFDFD", dark: "#27272A", $extensions: { figma: { id: "2216:2343"  } }, $description: "Primary page content area" }
    page-background-backlight:  { $type: color, light: "#F4F4F5", dark: "#3F3F46", $extensions: { figma: { id: "4355:15378" } }, $description: "Page canvas · secondary surface" }
    header-background:          { $type: color, light: "#FFFFFF", dark: "#18181B", $extensions: { figma: { id: "4355:15379" } }, $description: "Top nav bar · Page Header" }
    navigation-background:      { $type: color, light: "#FFFFFF", dark: "#18181B", $extensions: { figma: { id: "4355:15380" } }, $description: "Sidebar · Nav menus · Rail" }
    card-background:            { $type: color, light: "#FFFFFF", dark: "#27272A", $extensions: { figma: { id: "4355:15377" } }, $description: "Cards · Modals · Dialogs · Drawers · Popovers" }
    widget-background:          { $type: color, light: "#FDFDFD", dark: "#27272A", $extensions: { figma: { id: "4355:15381" } }, $description: "Dashboard widgets · Stat cards · Charts" }
    muted-background:           { $type: color, light: "#F4F4F5", dark: "#3F3F46", $extensions: { figma: { id: "4355:15382" } }, $description: "Disabled · Skeleton · Empty states" }
    overlay-background:         { $type: color, light: "#FFFFFF 20%", dark: "#FFFFFF 50%", $extensions: { figma: { id: "4355:15383" } }, $description: "Modal / Drawer backdrop scrim" }
    border:                     { $type: color, light: "#E4E4E6", dark: "#3F3F46", $extensions: { figma: { id: "2216:2332"  } }, $description: "All borders · dividers · outlines" }
    destructive-background:     { $type: color, light: "#FEF2F2", dark: "#FEE2E2", $extensions: { figma: { id: "2216:2335"  } }, $description: "Error / danger state backgrounds" }
    warning-background:         { $type: color, light: "#FFFBEB", dark: "#FEF3C7", $extensions: { figma: { id: "3613:5"     } }, $description: "Warning state backgrounds" }
    success-background:         { $type: color, light: "#ECFDF5", dark: "#D1FAE5", $extensions: { figma: { id: "4382:7352"  } }, $description: "Success / confirmation backgrounds" }
  typography:                   # 9 tokens — text colours
    text-primary:               { $type: color, light: "#3F3F46", dark: "#FAFAFA", $extensions: { figma: { id: "4419:11011" } }, $description: "Headings · key values · main labels" }
    text-secondary:             { $type: color, light: "#71717A", dark: "#D4D4D8", $extensions: { figma: { id: "4419:11012" } }, $description: "Descriptions · subtext · secondary labels" }
    text-tertiary:              { $type: color, light: "#A1A1AA", dark: "#FFFFFF", $extensions: { figma: { id: "4419:11013" } }, $description: "Placeholders · hints · captions" }
    text-white:                 { $type: color, light: "#FAFAFA", dark: "#FAFAFA", $extensions: { figma: { id: "4419:11009" } }, $description: "Text on dark / coloured fills" }
    text-black:                 { $type: color, light: "#09090B", dark: "#09090B", $extensions: { figma: { id: "4419:11010" } }, $description: "High-contrast on light surfaces" }
    text-destructive:           { $type: color, light: "#DC2626", dark: "#EF4444", $extensions: { figma: { id: "4419:11014" } }, $description: "Error messages · destructive labels" }
    text-warning:               { $type: color, light: "#D97706", dark: "#F59E0B", $extensions: { figma: { id: "4419:11015" } }, $description: "Warning messages · caution labels" }
    text-success:               { $type: color, light: "#047857", dark: "#10B981", $extensions: { figma: { id: "4419:11016" } }, $description: "Success messages · confirmation text" }
    text-url:                   { $type: color, light: "#065F46", dark: "#10B981", $extensions: { figma: { id: "4419:11017" } }, $description: "Links · clickable references · focus ring" }
  alpha:                        # 9 tokens — overlay utilities. NOTE: the scale is INVERTED —
                                # alpha/10 is the MOST opaque (90%), alpha/90 the least (10%).
    "10": { $type: color, light: "#FFFFFF 90%", dark: "#09090B 90%", $extensions: { figma: { id: "2222:2362" } }, $description: "deepest" }
    "20": { $type: color, light: "#FFFFFF 80%", dark: "#09090B 80%", $extensions: { figma: { id: "2222:2363" } } }
    "30": { $type: color, light: "#FFFFFF 70%", dark: "#09090B 70%", $extensions: { figma: { id: "2222:2364" } } }
    "40": { $type: color, light: "#FFFFFF 60%", dark: "#09090B 60%", $extensions: { figma: { id: "2222:2365" } } }
    "50": { $type: color, light: "#FFFFFF 50%", dark: "#09090B 50%", $extensions: { figma: { id: "2222:2366" } }, $description: "scrim mid" }
    "60": { $type: color, light: "#FFFFFF 40%", dark: "#09090B 40%", $extensions: { figma: { id: "2222:2367" } } }
    "70": { $type: color, light: "#FFFFFF 30%", dark: "#09090B 30%", $extensions: { figma: { id: "2222:2368" } } }
    "80": { $type: color, light: "#FFFFFF 20%", dark: "#09090B 20%", $extensions: { figma: { id: "2222:2369" } }, $description: "lightest" }
    "90": { $type: color, light: "#FFFFFF 10%", dark: "#09090B 10%", $extensions: { figma: { id: "2222:2370" } }, $description: "barely-there" }
  charts:                       # 5 tokens — data visualisation. Light and Dark are different hues, not tints.
    "Chart 1": { $type: color, light: "#2A9D90", dark: "#2662D9", $extensions: { figma: { id: "4295:180021" } }, $description: "Primary series — teal L / blue D" }
    "Chart 2": { $type: color, light: "#E76E50", dark: "#E23670", $extensions: { figma: { id: "4295:180022" } }, $description: "Second series — coral L / pink D" }
    "Chart 3": { $type: color, light: "#274754", dark: "#E88C30", $extensions: { figma: { id: "4295:180023" } }, $description: "Third series — dark teal L / amber D" }
    "Chart 4": { $type: color, light: "#E8C468", dark: "#AF57DB", $extensions: { figma: { id: "4295:180024" } }, $description: "Fourth series — yellow L / purple D" }
    "Chart 5": { $type: color, light: "#F4A462", dark: "#2EB88A", $extensions: { figma: { id: "4295:180025" } }, $description: "Fifth series — peach L / green D" }
```

> **Gotchas confirmed against the Figma ledger:**
> - `alpha/*` is inverted (10 = 90 % opacity). Reading the number as opacity will produce the opposite scrim.
> - `header-background` and `navigation-background` resolve identically in both modes — they are separate tokens so nav chrome can diverge later. Do not collapse them.
> - `card-background` (#FFFFFF) ≠ `page-background-content` (#FDFDFD) in Light. Cards are pure white; the page is a hair off-white.
> - `text-tertiary` goes to pure `#FFFFFF` in Dark (not a grey) — verify contrast on muted surfaces before using it for placeholders in Dark mode.

### 3.2 Layout — radius

> **Naming convention (rem-based):** 1 rem = 4 px. Name = `rounded_{value ÷ 4}`. E.g. 8 px → `rounded_2`, 2 px → `rounded_0,5`.

```yaml
radius:
  rounded_0:    { $type: dimension, $value: "0px" }
  rounded_0,5:  { $type: dimension, $value: "2px" }
  rounded_1:    { $type: dimension, $value: "4px" }
  rounded_1,5:  { $type: dimension, $value: "6px" }
  rounded_2:    { $type: dimension, $value: "8px" }
  rounded_2,5:  { $type: dimension, $value: "10px" }
  rounded_3:    { $type: dimension, $value: "12px" }
  rounded_3,5:  { $type: dimension, $value: "14px" }
  rounded_4:    { $type: dimension, $value: "16px" }
  rounded_4,5:  { $type: dimension, $value: "18px" }
  rounded_5:    { $type: dimension, $value: "20px" }
  # … continues in steps of 0,5 rem (2 px) up to rounded_20 (80 px)
  rounded_9999: { $type: dimension, $value: "9999px", $description: "Pill" }
```

### 3.3 Layout — spacing/gap

> **Naming convention (rem-based):** 1 rem = 4 px. Name = `gap_{value ÷ 4}`. E.g. 8 px → `gap_2`, 16 px → `gap_4`, 2 px → `gap_0,5`.

**Allowed values for any gutter / padding / gap / margin:** `0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80` and all multiples of 8 up to 240. The Horizon Layout collection ships finer-grained tokens for component internals — **do not reach for them in new layouts.**

```yaml
spacing.gap:
  gap_0:    { $type: dimension, $value: "0px" }
  gap_0,5:  { $type: dimension, $value: "2px" }
  gap_1:    { $type: dimension, $value: "4px" }
  gap_2:    { $type: dimension, $value: "8px" }
  gap_3:    { $type: dimension, $value: "12px" }
  gap_4:    { $type: dimension, $value: "16px" }
  gap_5:    { $type: dimension, $value: "20px" }
  gap_6:    { $type: dimension, $value: "24px" }
  gap_8:    { $type: dimension, $value: "32px" }
  gap_10:   { $type: dimension, $value: "40px" }
  gap_12:   { $type: dimension, $value: "48px" }
  gap_14:   { $type: dimension, $value: "56px" }
  gap_16:   { $type: dimension, $value: "64px" }
  gap_18:   { $type: dimension, $value: "72px" }
  gap_20:   { $type: dimension, $value: "80px" }
  # … continues in steps of gap_2 (8 px) up to gap_60 (240 px)
```

### 3.4 Tailwind mapping

When emitting Tailwind, generate a `tailwind.config.ts` that mirrors the above:

```ts
// tailwind.config.ts (excerpt)
export default {
  theme: {
    extend: {
      colors: {
        surface: {
          page:       'var(--surface-page-background-content)',
          backlight:  'var(--surface-page-background-backlight)',
          header:     'var(--surface-header-background)',
          nav:        'var(--surface-navigation-background)',
          card:       'var(--surface-card-background)',
          widget:     'var(--surface-widget-background)',
          muted:      'var(--surface-muted-background)',
          overlay:    'var(--surface-overlay-background)',
          border:     'var(--surface-border)',
          destructive:'var(--surface-destructive-background)',
          warning:    'var(--surface-warning-background)',
          success:    'var(--surface-success-background)',
        },
        text: {
          primary:    'var(--text-primary)',
          secondary:  'var(--text-secondary)',
          tertiary:   'var(--text-tertiary)',
          destructive:'var(--text-destructive)',
          warning:    'var(--text-warning)',
          success:    'var(--text-success)',
          url:        'var(--text-url)',
        },
      },
      borderRadius: Object.fromEntries(
        [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,40,48,56,64,80].map(n => [n, `${n}px`])
      ),
      spacing: Object.fromEntries(
        [0,2,4,8,16,24,32,40,48,56,64,72,80,88,96,104,112,120,128,144,160,192,200]
          .map(n => [n, `${n}px`])
      ),
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      fontSize: {
        xs:   ['12px', '16px'],
        sm:   ['14px', '20px'],
        base: ['16px', '24px'],
        lg:   ['18px', '28px'],
        xl:   ['20px', '28px'],
        '2xl':['24px', '32px'],
        '3xl':['30px', '36px'],
        '4xl':['36px', '40px'],
        '5xl':['48px', '52px'],
        '6xl':['60px', '64px'],
        '7xl':['72px', '76px'],
      },
    },
  },
};
```

### 3.5 CSS-vars mode contract

```css
/* light mode */
:root {
  --surface-page-background-content: #FFFFFF;
  --surface-card-background:         #FAFAFA;
  --text-primary:                    #0A0A0A;
  /* ...resolved at sync time from Mode collection */
}
/* dark mode */
:root[data-theme='dark'] {
  --surface-page-background-content: #0A0A0A;
  --surface-card-background:         #161616;
  --text-primary:                    #FAFAFA;
}
```

**Resolved values** are not stored in this file (they drift). Instead, run the sync command (§14) to regenerate `tokens.css` and `tokens.json` from the Figma Variables REST API.

---

## 4. Layout system

```yaml
grid:
  columns: 12
  column_width: 88
  gutter: 24
  outer_offset: 24
  content_width: 1392   # 88*12 + 24*11 + 24*2
breakpoints:
  sm:  { min: 0,    max: 639 }
  md:  { min: 640,  max: 1023 }
  lg:  { min: 1024, max: 1279 }
  xl:  { min: 1280, max: 1535 }
  2xl: { min: 1536 }
regions:
  top_nav:   { height: 80, padding: { top: 20, right: 24, bottom: 20, left: 16 } }
  sidebar:
    open:      { width: 296, padding_lr: 24 }
    collapsed: { width: 48 }
  page_content_area: { padding_top: 16, padding_left: 16, max_sections: 3, section_1_width: 246 }
  page_header:       { padding_top: 16, padding_lr: 24, icon_size: 32, gap_icon_to_title: 16, gap_title_to_subtext: 4 }
button_group:
  gap: 16
  primary_position: right
  bulk_priority_rtl: [primary, outline, secondary, icon-no-fill]
```

---

## 5. Typography

Naming: `type/{size}/{lineHeight}/{weight}` — e.g. `type/sm/normal/medium`.

```yaml
font_family: Inter
weights: [regular, medium, semibold, bold, italic, underlined, strikethrough]
sizes:
  xs:   { size: 12, lh_tight: 12, lh_normal: 16 }
  sm:   { size: 14, lh_tight: 14, lh_normal: 20 }
  base: { size: 16, lh_tight: 16, lh_normal: 24 }
  lg:   { size: 18, lh_tight: 18, lh_normal: 28 }
  xl:   { size: 20, lh_tight: 20, lh_normal: 28 }
  2xl:  { size: 24, lh_tight: 24, lh_normal: 32 }
  3xl:  { size: 30, lh_tight: 30, lh_normal: 36 }
  4xl:  { size: 36 }
  5xl:  { size: 48 }
  6xl:  { size: 60 }
  7xl:  { size: 72 }

defaults:
  page_title:    type/2xl/tight/semibold
  section_title: type/lg/tight/semibold
  card_title:    type/base/tight/semibold
  body:          type/sm/normal/regular
  body_strong:   type/sm/normal/medium
  helper:        type/xs/normal/regular
  caption:       type/xs/tight/medium
  button:        type/sm/tight/medium
  link:          type/sm/normal/medium   # color: text-url
```

A subset of style keys (full list: 84+ styles) for `importStyleByKeyAsync`:

```yaml
text_style_keys:
  type/xs/normal/regular:   "35d2f8834abfff7f91932d62f076777bd2a0a27a"
  type/xs/normal/medium:    "bc8fcf7834a54d01bacb3412dc65038140f7ae6c"
  type/sm/normal/regular:   "d05084c39438b1e6e4697202660a117c0d42dd4f"
  type/sm/normal/medium:    "ab9030859fe0e2cd6f4797c05a8d8b2e625bf104"
  type/sm/tight/medium:     "621605d95e76d1ec7d275530e0a9a392eb6cf59f"
  type/base/normal/regular: "145200f68e751c10668f8a7098a21eabca61f880"
  type/base/tight/semibold: "ce9dca96318b12c31b4dbfd8ebba7464d2719657"
  type/lg/tight/semibold:   "2dd797bfec2e0247ed6e48ce6db9a18ab5c77902"
  type/2xl/tight/semibold:  "6be0ef6dcd3b6e7f40562dc6078c50ba0dbd0824"
  # … see /memory/reference_horizon_ds_keys.md and the live Figma file for the full list
```

---

## 6. Component catalog

Every Horizon page that contains components is enumerated below. Each entry has: `figma_page_id`, `key` (for `importComponentByKeyAsync` where known), `props` / `variants`, and `code_symbol` per framework.

> **Library key for filtering search:** `lk-47ecb318fd01d6c8c5dd1f4fa00d27ace8c5fb7ca8377928451f63aae7ce10fa4bb7aedd81964f2fc4e35f8d96fe478f45cbe45ed377b6a6493e311b33851b8b`

### 6.1 Foundations

| Component | Figma page | Notes |
|---|---|---|
| Brand           | `1:39783` | Logos, wordmarks |
| Colours         | `2142:766` | Primitive palette swatches |
| Icons           | `648:34695` | Phosphor-aligned set |
| Effects         | `3637:605858` | Shadows, blurs |
| Typography      | `2388:78` | Type ramp samples |
| Mobile Guidelines | `1:40032` | Mobile-specific deltas |
| Mode Tokens     | `4537:25378` | **Mode Token Ledger** — all 35 semantic tokens with Light/Dark hex, variable id and usage. Source of truth for §3.1 |

### 6.2 Atoms / molecules

| Component | Figma page | Variants (selected) | React import |
|---|---|---|---|
| Button          | `707:1739`   | Primary / Outline / Secondary / Icon (sm/md/lg) | `@/components/ui/button` |
| Input Fields    | `0:1`        | Input / Search / Dropdown / ColourPicker / TextBox · sm/md · default/typing/filled/selected | `@/components/ui/input` |
| Input OTP       | `767:26499`  | 4-digit / 6-digit | `@/components/ui/otp` |
| Check Boxes     | `767:25186`  | default/selected/indeterminate · sm/md | `@/components/ui/checkbox` |
| Radio Buttons   | `760:21131`  | default/selected · sm/md | `@/components/ui/radio` |
| Switch          | `760:21705`  | on/off · sm/md | `@/components/ui/switch` |
| Range Slider    | `760:21488`  | single/dual · with-marks/without | `@/components/ui/slider` |
| Pills           | `725:4080`   | Neutral / Success / Informative / Warning / Destructive · sm/md | `@/components/ui/pill` |
| Badge           | `733:8031`   | Information / Warning / Success / Destructive | `@/components/ui/badge` |
| Avatar          | `766:25182`  | sm/md/lg · with-image/initials/icon | `@/components/ui/avatar` |
| Tooltip         | `725:4120`   | top/bottom/left/right × left/center/right | `@/components/ui/tooltip` |
| Indicator       | `725:4117`   | Dot / Pulse / Step | `@/components/ui/indicator` |
| Separator       | `760:21263`  | horizontal/vertical | `@/components/ui/separator` |
| Skeleton        | `760:21454`  | text/avatar/card-block | `@/components/ui/skeleton` |
| Stepper         | `4543:6474`  | horizontal/vertical · numbered/dotted | `@/components/ui/stepper` |
| Search          | `714:40087`  | inline / command-palette | `@/components/ui/search` |
| Command Search  | `767:25331`  | full ⌘K palette | `@/components/ui/command` |
| Calendar        | `709:2283`   | single / range / multi | `@/components/ui/calendar` |
| Breadcrumbs     | `714:41570`  | Breadcrumb (Size md/sm × Sidebar Open/Collapsed) · Item (Default/Hover/Current) · Separator (Chevron/Slash) · Dashboard Button (Open/Collapsed/Back) | `@/components/ui/breadcrumb` |

### 6.3 Composite components

| Component | Figma page | Notes | React import |
|---|---|---|---|
| Card                  | `714:1619`  | default / interactive / feature | `@/components/ui/card` |
| Accordion             | `1:3883`    | single / multi expand | `@/components/ui/accordion` |
| Tabs                  | `765:24083` | underline / pill / segmented | `@/components/ui/tabs` |
| Carousel              | `740:35021` | snap-x · with-arrows / with-dots | `@/components/ui/carousel` |
| Tables                | `677:36341` | Cell · Head · Footer-Bulk-3 · Footer-Pagination | `@/components/ui/table` |
| Pagination            | `744:8520`  | numbered / prev-next / load-more | `@/components/ui/pagination` |
| Forms                 | `740:48440` | Single / Double | `@/components/ui/form` |
| Header                | `2410:14090`| Page Header composition | `@/components/ui/page-header` |
| Navigation Bars       | `1:9297`    | Top / Sidebar / Mobile | `@/components/ui/nav` |
| Mega Menu             | `744:8273`  | 2-col / 3-col / featured | `@/components/ui/mega-menu` |
| Menu                  | `767:25527` | dropdown / context / nested | `@/components/ui/menu` |
| Modal                 | `2895:13114`| sm 400 / md 560 / lg 720 / xl 960 | `@/components/ui/modal` |
| Dialog Box            | `740:48063` | confirmation only | `@/components/ui/dialog` |
| Drawer                | `740:48142` | right / left | `@/components/ui/drawer` |
| Sheet Slider          | `760:21282` | bottom (mobile) | `@/components/ui/sheet` |
| Toast                 | `3265:24290`| success / info / warning / destructive | `@/components/ui/toast` |
| Announcement Popup    | `7191:1631` | 568×588 feature-announcement modal · ribbon + media carousel + title/desc + 2 buttons | `@/components/ui/announcement-popup` |
| Notification          | `714:39981` | running task tray | `@/components/ui/notification` |
| Feedback              | `682:40910` | inline alert / banner | `@/components/ui/feedback` |
| Pre-Checks            | `3265:23116`| environment readiness checklist | `@/components/ui/precheck` |
| Progress              | `1:35002`   | linear / circular / ring · indeterminate | `@/components/ui/progress` |
| Data Visualization    | `740:35224` | chart wrappers (recharts) | `@/components/charts/*` |
| Map                   | `2947:14838`| world / region · pin / heat | `@/components/ui/map` |
| Widget                | `3186:11851`| dashboard tile · KPI · chart-tile | `@/components/ui/widget` |
| Summary               | `2658:8943` | KPI strip | `@/components/ui/summary` |
| Layout (templates)    | `889:39696` | Page / Two-pane / Three-pane | `@/components/layouts/*` |
| Page                  | `4417:6389` | Full Page wrapper | `@/components/layouts/page` |
| Statuses & Indicators | `9:25284`   | semantic dot + label | `@/components/ui/status` |

### 6.4 Selected component keys (canonical, for `importComponentByKeyAsync`)

```yaml
keys:
  Table/Cell-set:                "8856a95316517bcd286ebe970ea84523350ac8ac"
  Table/Cell-Default:            "39646742e93acea748f28105bd4045a676ab86a1"
  Table/Cell-Actions:            "3bcabd5c6faa8bd8672ad7435ec3296b0ddea246"
  Table/Cell-WithCheckbox:       "2d90115663652ca0a25483578e8aa75c1219c3b8"
  Table/Head:                    "9505e87fb5fa75a664d917226cc404fa502f3aeb"
  Table/Footer-Bulk-3:           "57b1f66f15271195ed0dad465982d7bcdac03c14"
  Table/Footer-Pagination:       "b7f235d5c22b3e9484811ecb5ceba5161841349f"
  BvButton-set:                  "c52b5bbbb11a6a8ba11dc5169001e791c2ea1f80"
  Input-Fields/WPR:              "42047d200a60d9bc8c51b03ecd7ad15506d808fe"
  Avatar-sm:                     "bb92ad11806f35a73ec0100ad0956540ce51b5d1"
  Pill-Neutral-Small:            "050e8f8674ba078cadd0b0adda596c11232d218c"
  Pill-Success-Small:            "892fac88c3f97b90402cedeae9f4c973b39a5e82"
  Pill-Informative-Small:        "a1485504321e8fdb8d7a2daa70abb148b2639f78"
  Badge-Warning-Small:           "fac1eb3fd8244829fff32e65aaca6b7db275c42e"
  Notification-set:              "abe722089ad6e241d4a0b0c06b9ec28e83879d9b"
  Icon/UserPlus:                 "779f3e4d19116101d8877982ce0da7b57762c55d"
  Icon/Calendar:                 "09ee6bd0a83ab2cfa1d6681e1c0111ca753922ed"
  Icon/CalendarDays:             "d2b30d11d38a5b5c1572743ac0543e13552912f2"
  Icon/CircleHelp:               "04d9ba5a598987ecde84b1110aa264fb9f9a031f"
  Icon/Pencil:                   "1bac2260aa987f86954e112e9f3d650691fedeca"
  Icon/Trash2:                   "9d43bdf2dcc69ed3c22975664f60cb779bb6f97f"
  Icon/RefreshCw:                "97e764c8dc4e1c910cd9965074c4d2acd7b0e737"
```

> Full list lives in `~/.claude/.../memory/reference_horizon_ds_keys.md` and is regenerated by the sync command (§14).

### 6.5 Atomic-design assessment (Variables → Atoms → Molecules → Organisms → Templates → Pages)

This is the canonical tier classification of every Horizon artefact. AI agents and humans **must compose upward only** — atoms compose into molecules, molecules into organisms, never the reverse. When a node violates a tier (e.g. a molecule built from raw shapes instead of atoms), the audit fails.

#### Tier 0 · Variables (tokens — the constants the rest of the system is built from)

Variables are not visible UI; they are the values that flow into every higher tier.

```yaml
tier_0_variables:
  primitives:                 # System Colours collection (333 vars). Never used directly.
    - color/{hue}/{50..950}   # zinc, slate, red, emerald, sky, amber, violet …
  semantic:                   # Mode collection (35 vars · Light + Dark). Use these on UI.
    surface:   [page-background-content, page-background-backlight, header-background,
                navigation-background, card-background, widget-background,
                muted-background, overlay-background, border,
                destructive-background, warning-background, success-background]
    text:      [primary, secondary, tertiary, white, black,
                destructive, warning, success, url]
    alpha:     [10, 20, 30, 40, 50, 60, 70, 80, 90]
    charts:    [Chart 1, Chart 2, Chart 3, Chart 4, Chart 5]
  layout:                     # Layout collection (358 vars).
    radius:    [rounded_0, rounded_0,5, rounded_1, rounded_2, rounded_4, rounded_6, rounded_8, rounded_10, rounded_12, rounded_14, rounded_16, rounded_20, rounded_9999]
    spacing:   [gap_0, gap_0,5, gap_1, gap_2, gap_3, gap_4, gap_5, gap_6, gap_8, gap_10, gap_12, gap_14, gap_16, gap_18, gap_20, … gap_60]
    opacity:   [opacity_0 (0%), opacity_1 (5%), opacity_2 (10%), … opacity_20 (100%)]  # sequential 0–20
    stroke:    [border-0 (0px), border-0,25 (1px), border-0,5 (2px), border-1 (4px), border-2 (8px)]
  typography:                 # 84+ text styles
    family:    Inter
    sizes:     [xs 12, sm 14, base 16, lg 18, xl 20, 2xl 24, 3xl 30, 4xl 36, 5xl 48, 6xl 60, 7xl 72]
    weights:   [regular, medium, semibold, bold, italic, underlined, strikethrough]
    line_height: [tight, normal]
  effects:                    # Effects page (shadows, blurs)
    elevation: [level_0, level_1, level_2, level_3]
audit_rules_tier_0:
  - "No raw hex / px / rem in any node. Bind a variable."
  - "Primitives never used directly on UI — alias via Mode."
  - "Spacing tokens outside the multiples-of-8 set are reserved for component internals; do not reach for them in new layouts."
```

#### Tier 1 · Atoms (single-purpose, indivisible UI elements)

Atoms consume Tier 0 variables and emit visual primitives. They have no internal logic beyond state.

```yaml
tier_1_atoms:
  - { name: Button,        figma_page: "707:1739",   variants: [Primary, Secondary, Outlined, Ghosted, Destructive, Link, Icon, Indicator, Special, Loading · sm(24h)/md(32h)/lg(40h)/xl(48h,mobile) · default/active/hover/pressed/disabled/loading · Additional: Nil/Notification/MobileFullWidth/Inline/Count/Clear/EMbed/Buffer/Shadow/Highlight] }
  - { name: Icon,          figma_page: "648:34695",  variants: [16, 20, 24 px · Phosphor regular weight] }
  - { name: Text,          figma_page: "2388:78",    variants: [type/{xs..7xl}/{tight,normal}/{regular..strikethrough}] }
  - { name: Avatar,        figma_page: "766:25182",  variants: [xs 16, sm 24, md 32, lg 40, xl 48, 2xl 64 · circle/square · photo/initials/icon] }
  - { name: Badge,         figma_page: "733:8031",   variants: [Information, Warning, Success, Destructive · Dot 8 / Small 16 / Medium 24] }
  - { name: Pill,          figma_page: "725:4080",   variants: [Neutral, Success, Informative, Warning, Destructive · Small 24 / Medium 32] }
  - { name: Indicator,     figma_page: "725:4117",   variants: [Dot, Pulse, Step] }
  - { name: Separator,     figma_page: "760:21263",  variants: [horizontal, vertical] }
  - { name: Skeleton,      figma_page: "760:21454",  variants: [text, avatar, card-block] }
  - { name: Switch,        figma_page: "760:21705",  variants: [sm 24×16, md 36×20 · on/off · thumb sm12/md16 · off:zinc-200, on:bv-emerald-900] }
  - { name: Checkbox,      figma_page: "767:25186",  variants: [sm 16, md 24 · default/hover/focus/checked/indeterminate/disabled/error] }
  - { name: Radio,         figma_page: "760:21131",  variants: [sm 16, md 24 · default/selected/disabled] }
  - { name: Range Slider,  figma_page: "760:21488",  variants: [single, dual · with-marks, without] }
  - { name: Input Field,   figma_page: "0:1",        variants: [Input, Search, Dropdown, ColourPicker, TextBox · sm/md · default/typing/filled/selected] }
  - { name: Tooltip,       figma_page: "725:4120",   variants: [top/bottom/left/right × left/center/right · default/context] }
  - { name: Status Dot,    figma_page: "9:25284",    variants: [success, warning, destructive, neutral] }
audit_rules_tier_1:
  - "Atoms must not contain other atoms. A Button does NOT embed an Icon as a child component — the icon is a slot/prop."
  - "Every atom uses Tier 0 variables for every visible property. No raw values."
  - "Every atom has explicit default / hover / focus / pressed / disabled states."
```

#### Tier 2 · Molecules (small functional units composed of atoms)

Molecules combine 2–6 atoms with a single intent.

```yaml
tier_2_molecules:
  - { name: Search bar,         composed_of: [Input Field + Icon + Button(clear)],         figma_page: "714:40087" }
  - { name: Title-Subtext,      composed_of: [Text + Text],                                  figma_page: "—" }
  - { name: Form Field,         composed_of: [Text(label) + Input Field + Text(helper)],     figma_page: "740:48440" }
  - { name: Breadcrumb/Item,      composed_of: [Text + optional Icon],                        figma_page: "714:41570", variants: "State=Default | Hover | Current" }
  - { name: Breadcrumb/Separator, composed_of: [Icon],                                        figma_page: "714:41570", variants: "Type=Chevron | Slash" }
  - { name: Breadcrumb/Dashboard Button, composed_of: [Icon button 40×40],                    figma_page: "714:41570", variants: "Sidebar=Open | Collapsed | Back" }
  - { name: Tab,                composed_of: [Text + Indicator(underline)],                  figma_page: "765:24083" }
  - { name: Pill Button,        composed_of: [Pill + click-handler + hover-state],           figma_page: "725:4080" }
  - { name: Avatar Group,       composed_of: [Avatar + Avatar + … + counter Pill],            figma_page: "766:25182" }
  - { name: Stepper Item,       composed_of: [Indicator(step circle) + Text + connector],     figma_page: "4543:6474" }
  - { name: Menu Item,          composed_of: [Icon + Text + (Pill | Indicator | shortcut hint)], figma_page: "767:25527" }
  - { name: Toast,              composed_of: [Icon + Text(title) + Text(body) + Button(close)], figma_page: "3265:24290" }
  - { name: Empty State block,  composed_of: [Icon(48) + Text(title) + Text(subtext) + Button(CTA)] }
  - { name: KPI Cell,           composed_of: [Text(label) + Text(value) + Pill(delta)],        figma_page: "2658:8943" }
  - { name: Notification Row,   composed_of: [Icon + Title-Subtext + Button(dismiss)],         figma_page: "714:39981" }
  - { name: Pagination Item,    composed_of: [Button(prev) + Button(page-number) + Button(next)], figma_page: "744:8520" }
  - { name: Pre-Check Row,      composed_of: [Indicator + Text + Button(retry, on error)],     figma_page: "3265:23116" }
  - { name: Calendar Cell,      composed_of: [Text(day) + Indicator(today/selected)],          figma_page: "709:2283" }
  - { name: OTP Slot,           composed_of: [Input Field × N],                                figma_page: "767:26499" }
audit_rules_tier_2:
  - "Molecules must be built from atoms — never from raw frames or shapes."
  - "A molecule has one responsibility. If you can split its purpose into two sentences, it is two molecules."
  - "Internal spacing inside a molecule uses Tier 0 spacing tokens; the multiples-of-8 rule still applies."
  - "Molecules expose props that map onto their constituent atoms (e.g. a Search bar exposes `placeholder`, `value`, `onClear` — not 14 atom-level props)."
```

#### Tier 3 · Organisms (composed sections with state and structure)

Organisms combine atoms + molecules into a self-contained UI region.

```yaml
tier_3_organisms:
  - { name: Card,                        composed_of: [header molecule + body + footer atoms],       figma_page: "714:1619" }
  - { name: Accordion,                   composed_of: [Card × N + expand state],                     figma_page: "1:3883" }
  - { name: Tabs (full),                 composed_of: [Tab × N + Separator + body region],           figma_page: "765:24083" }
  - { name: Carousel,                    composed_of: [N slides + Pagination Items + arrow Buttons], figma_page: "740:35021" }
  - { name: Table,                       composed_of: [Table Head + Table Row × N + Pagination],     figma_page: "677:36341" }
  - { name: Pagination (full)            composed_of: [Pagination Items + Text(page x of y)],        figma_page: "744:8520" }
  - { name: Form (Single)                composed_of: [Form Header molecule + Form Field × N + Button Group], figma_page: "740:48440" }
  - { name: Form (Double)                composed_of: [Form Header (outside) + Form Function (Form Field × N + Button Group)], figma_page: "740:48440" }
  - { name: Page Header                  composed_of: [Page Icon + Title-Subtext + Search bar + Button Group], figma_page: "2410:14090" }
  - { name: Top Navigation               composed_of: [Logo + Breadcrumb + Search bar + Account Menu], figma_page: "1:9297" }
  - { name: Sidebar                      composed_of: [Sidebar Header + Menu Item × N (parent + child)], figma_page: "1:9297" }
  - { name: Mega Menu                    composed_of: [N column × Menu Items],                       figma_page: "744:8273" }
  - { name: Modal                        composed_of: [Modal Header + body + Button Group],          figma_page: "2895:13114" }
  - { name: Dialog Box                   composed_of: [Title-Subtext + Button Group],                figma_page: "740:48063" }
  - { name: Drawer                       composed_of: [Drawer Header + body + sticky Button Group],  figma_page: "740:48142" }
  - { name: Sheet Slider                 composed_of: [Drag handle + Drawer-style body],             figma_page: "760:21282" }
  - { name: Notification Tray            composed_of: [Notification Row × N],                        figma_page: "714:39981" }
  - { name: Pre-Checks Panel             composed_of: [Pre-Check Row × N + summary status],          figma_page: "3265:23116" }
  - { name: Stepper (full)               composed_of: [Stepper Item × N + connectors],               figma_page: "4543:6474" }
  - { name: Calendar / Date Picker       composed_of: [month header + Calendar Cell × 42],           figma_page: "709:2283" }
  - { name: Command Search palette       composed_of: [Search bar + section headers + Menu Item × N + footer hints], figma_page: "767:25331" }
  - { name: Summary KPI strip            composed_of: [KPI Cell × N + Separators],                   figma_page: "2658:8943" }
  - { name: Widget                       composed_of: [Card with Title-Subtext header + chart/value body], figma_page: "3186:11851" }
  - { name: Chart                        composed_of: [chart canvas + axis Text + Tooltip],          figma_page: "740:35224" }
  - { name: Map                          composed_of: [tile layer + pins + Tooltip],                 figma_page: "2947:14838" }
  - { name: Feedback / Banner            composed_of: [Icon + Title-Subtext + Button(dismiss)],      figma_page: "682:40910" }
  - { name: Announcement Popup           composed_of: [ribbon + media/carousel region + Pagination dots + Title-Subtext + Button Group + close Icon], figma_page: "7191:1631" }
  - { name: Breadcrumb (full bar)        composed_of: [Dashboard Button + Breadcrumb/Item × 1–10 + Breadcrumb/Separator], figma_page: "714:41570" }
audit_rules_tier_3:
  - "Organisms must compose from molecules + atoms only — never from raw shapes."
  - "Each organism owns its state machine (open/closed, selected/unselected, loading/error/empty/populated)."
  - "Every async organism (Table, Form, Chart) MUST design and ship four states: loading (Skeleton), empty, populated, error."
  - "Organisms expose a small, intent-aligned prop surface; they do not leak atom-level props."
```

#### Tier 4 · Templates (page skeletons; layouts without content)

```yaml
tier_4_templates:
  - { name: Page (default),    composed_of: [Top Navigation + Sidebar + Page Content Area],         figma_page: "4417:6389" }
  - { name: Two-pane,          composed_of: [Page + Section1 (248px) + Section2 (dynamic)],          figma_page: "889:39696" }
  - { name: Three-pane,        composed_of: [Page + Section1 (248) + Section2 (dynamic) + Section3 (320)], figma_page: "889:39696" }
  - { name: Modal-only,        composed_of: [Modal centered over Page (locked)],                     figma_page: "2895:13114" }
  - { name: Form-only,         composed_of: [Page + Form (Single | Double)],                         figma_page: "740:48440" }
audit_rules_tier_4:
  - "Templates contain no content — only layout slots."
  - "Templates obey §4 (12-col grid, 88 px column, 24 px gutter, 24 px offset)."
  - "Templates obey §8 (max 3 horizontal Sections per Page)."
```

#### Tier 5 · Pages (a Template filled with real content for a specific user task)

Pages are the unit of design review and shipping. Live in the `Screens` page (Figma `3634:581541`). Every Page must trace upward through Templates → Organisms → Molecules → Atoms → Variables — if any node skips a tier, the page is rejected.

```yaml
tier_5_pages_examples:
  - "Members · list"     →  Two-pane template + Page Header + Table + Pagination
  - "Site · overview"    →  Default template + Page Header + Summary KPI + Widget × 4 + Notification Tray
  - "Backup · setup"     →  Form-only template + Form (Double) + Stepper
audit_rules_tier_5:
  - "Every Page is verified in both Light and Dark mode (§3.5 of Guidelines)."
  - "Every Page passes the §15 Audit Checklist before merge."
  - "Every Page has a unique URL, a clear primary CTA, and obeys 'read-left, act-right'."
```

#### Composition rules (the contract between tiers)

```
Variables  →  Atoms        : every visible property of an atom is a token reference
Atoms      →  Molecules    : a molecule references atoms by component-key, never by raw geometry
Molecules  →  Organisms    : an organism may reference molecules AND atoms, never raw shapes
Organisms  →  Templates    : a template references organisms by name + slot, never duplicates
Templates  →  Pages        : a page fills template slots with real content + organism instances
```

#### Tier audit (one-line questions an AI agent runs against any node)

| Question | Pass criteria |
|---|---|
| Does this node use raw hex / px? | **No** raw values — all bound to a Tier 0 token. |
| Is this node a published Horizon component instance? | Yes (or a documented proposal). |
| If it composes children, are *all* children of a strictly lower tier? | Yes — never sideways or upward. |
| Does this node expose props at the right intent level? | An organism's props describe the *task*; an atom's describe the *shape*. |
| Are all four async states present where applicable? | Loading, empty, populated, error. |
| Are Light + Dark modes both verified? | Yes — both pass contrast ≥ 4.5:1. |

> **Failure mode to watch:** "tier inversion" — a molecule reaching for primitives and bypassing its atoms (e.g. drawing a custom toggle in a settings molecule instead of using the Switch atom). This is the single most common drift cause across Horizon-consuming projects. Always prefer the canonical atom, even when it costs a few extra lines.

### 6.6 Component anatomy quick-reference (token bindings)

> This table gives AI agents the exact token bindings for every component's key properties. Values sourced from the Figma file via Desktop Bridge MCP. For full anatomy, see `Guidelines_Product Design.md` §13.

```yaml
button:
  heights: { sm: 24, md: 32, lg: 40, xl: 48 }     # xl = mobile only
  icon_only: { sm: 24x24, md: 32x32, lg: 40x40 }
  radius: "radius/rounded_2"                         # 8px all sizes
  typography: "type/sm/tight/medium"                  # 14/14/500
  gap_icon_label: "spacing/2"                        # 8
  padding_h: { sm: 8, md: 16, lg: 16, xl: 24 }
  types:
    primary:     { bg: "BlogVault Brand/bv-emerald-900", text: "typography/text-white", shadow: "shadow/sm" }
    secondary:   { bg: "surface/card-background", border: "surface/border", text: "typography/text-primary" }
    outlined:    { bg: transparent, border: "surface/border", text: "typography/text-primary" }
    ghosted:     { bg: transparent, text: "typography/text-primary" }
    destructive: { bg: "typography/text-destructive", text: "typography/text-white" }
    link:        { bg: transparent, text: "typography/text-url", underline_on_hover: true }
  disabled: "opacity/opacity-50, no pointer events"
  states: [Default, Active, Hover, Pressed, Disabled, Loading, PrimaryAction, Inverted]
  variants: [Primary, Secondary, Outlined, Ghosted, Destructive, Link, Icon, Indicator, Special, Loading]
  focus: { ring: "surface/border", width: 2 }  # programmatic 2px ring
  animation: "background-color 150ms ease-in-out on hover/press"

input_field:
  heights: { md: 36, sm: 32 }
  default_width: 320                                 # fill-container in forms
  radius: "border radius/md"                         # 6
  border: "surface/border"
  bg: "surface/card-background"                      # base/card = #ffffff
  padding: { h: "px-3=12", v: "py-2=8" }
  types: [Input, Search, Dropdown, ColourPicker, TextBox]
  states: [Default, Typing, Filled, Selected, Disabled, Error]
  variants: [Input, Search, Dropdown, ColourPicker, TextBox]
  typography: "type/sm/normal/regular"               # 14/20/400
  placeholder_color: "typography/text-secondary"
  filled_text_color: "typography/text-primary"
  left_icon: { size: 16, color: "typography/text-secondary" }
  label: { style: "type/sm/tight/medium", gap_below: "spacing/1-5=6" }
  helper: { style: "type/xs/normal/regular", color: "typography/text-secondary", gap_above: 4 }
  error: { border: "typography/text-destructive", text: "typography/text-destructive" }
  disabled: "opacity/opacity-50, no pointer events"
  focus: { ring: "BlogVault Brand/bv-emerald-900", width: 2, shadow: "shadow/sm" }
  shadow_on_focus: "shadow/sm"  # standalone shadow field on focus
  animation: "border-color 150ms ease on focus"

card:
  radius: { default: "radius/rounded_2=8", large: "border radius/xl=12" }
  padding: { default: 16, feature: 24 }
  shadow: { default: "shadow/base", hover: "shadow/lg" }
  title: "type/sm/tight/medium"
  body: { style: "type/sm/normal/regular", color: "typography/text-secondary" }
  bg: "surface/card-background"
  border: "1px surface/border"  # optional
  states: [Default, Hover, Active]
  variants: [default, interactive, feature]
  disabled: "opacity/opacity-50"
  focus: { ring: "surface/border", width: 2 }  # interactive cards only
  icon_size: 16  # optional title icon
  gap_from_title: 16  # spacing/4
  header_min_h: 36  # height/h-9
  animation: "scale(1.01) 200ms on hover"

modal:
  widths: { sm: 400, md: 560, lg: 720, xl: 960 }
  radius: "rounded-3xl=24"                          # Corrected from rounded_16
  padding: 24
  shadow: "Box Shadow/shadow-lg"
  backdrop: { bg: "surface/page-background-content", alpha: "alpha/80" }
  bg: "surface/card-background"
  title: "type/lg/normal/medium"
  body_typography: "type/sm/normal/regular"
  close_btn: { size: 36 }
  border: "1px surface/border"  # dividers between sections
  states: [Open, Closing]
  variants: [sm, md, lg, xl]
  disabled: N/A
  focus: { trap: true, restore_on_close: true }  # focus trap required
  gap: { header_to_body: 16, body_to_footer: 16 }
  min_vertical_margin: 48  # px from viewport edge
  body_overflow: "overflow-y: auto"
  animation: "scale 0.95->1.0 + fade, 200ms ease-out"

dialog:
  width: 400
  radius: "rounded-3xl=24"
  title: "type/lg/normal/semibold"
  body: { style: "type/xs/normal/regular", color: "typography/text-secondary" }
  padding: 24  # spacing/6
  bg: "surface/card-background"
  shadow: "Box Shadow/shadow-lg"
  border: N/A  # no visible border, dividers via gap
  states: [Open, Closing]
  variants: [confirmation, destructive]
  disabled: N/A
  focus: { trap: true, restore_on_close: true }
  gap_title_to_body: 8  # spacing/2
  gap_body_to_buttons: 24  # gap_6
  animation: "scale 0.95->1.0 + fade, 200ms ease-out"  # same as modal

drawer:
  widths: [400, 560, 720]
  header_h: 64
  header_padding: 16
  header_title: "type/lg/normal/medium"
  close_btn: 32
  body_padding: { h: 16, v: 12 }
  bg: "surface/card-background"
  radius: "0 (flush to edge)"
  shadow: "shadow/sm + shadow/base"  # layered
  border: "1px surface/border"  # footer divider
  states: [Open, Closing]
  variants: [right, left]
  disabled: N/A
  focus: { trap: true, restore_on_close: true }
  gap: { header_to_body: 0, footer_sticky: true, footer_min_h: 56 }
  animation: "slide from edge, 200ms ease-out"
  backdrop: { bg: "surface/foreground", opacity: "20%" }

tooltip:
  padding: { h: 12, v: 6 }                          # Corrected from 8/4
  radius: "border radius/lg=8"                       # Corrected from rounded_4=16
  bg: "Flat/zinc/zinc-950"                           # Corrected from overlay + alpha
  text: "typography/text-white"
  typography: "type/xs/normal/medium"
  max_width: 320
  shadow: "Box Shadow/shadow (base)"
  border: N/A  # no visible border
  states: [Hidden, Visible]
  variants: [top, bottom, left, right]  # position × alignment
  disabled: N/A
  focus: N/A  # hover-triggered only
  triangle: { size: 8, positions: [top, bottom, left, right], alignments: [left, center, right] }
  animation: "show delay 200ms, hide delay 0"

tabs:
  trigger_padding: { h: "spacing/3=12", v: "spacing/2=8" }  # Corrected from 16h
  underline_color: "Flat/emerald/emerald-600"                 # Corrected from text-primary
  active_text: "typography/text-primary"
  inactive_text: "typography/text-secondary"
  bg: "surface/card-background + shadow/sm on pill variant active"
  border: "2px underline_color on active (underline variant)"
  radius: "radius/rounded_2=8"  # pill container
  typography: "type/sm/tight/medium"  # 14/14/500
  variants: [underline, pill, segmented]
  states: [Default, Active, Hover, Disabled]
  disabled: "opacity/opacity-50, no pointer events"
  focus: { ring: "surface/border", width: 2 }
  gap_between_tabs: 0
  tab_height: 40  # content-driven typical
  icon: { size: 16, gap: "spacing/gap_0,5=2" }
  shadow: "shadow/sm"  # on active pill
  animation: "underline slide 150ms ease-out"

switch:
  tracks: { sm: "24x16", md: "36x20" }
  thumb: { sm: 12, md: 16, inset: 2, bg: "surface/card-background", shadow: "shadow/lg" }
  off_track: "Flat/zinc/zinc-200"                    # Corrected from muted-background
  on_track: "BlogVault Brand/bv-emerald-900"         # Corrected from text-primary
  radius: "border radius/full=9999"  # on track
  border: N/A
  padding: N/A  # thumb inset handles spacing
  shadow: "shadow/lg on thumb"
  states: [Off, On, Disabled]
  variants: [sm, md]
  disabled: "opacity/opacity-50"
  focus: { ring: "BlogVault Brand/bv-emerald-900", width: 2, offset: 2 }
  animation: "160ms ease-out toggle"
  label: { style: "type/sm/tight/medium", gap: "spacing/2=8" }

checkbox:
  sizes: { sm: 16, md: 24 }
  radius: "rounded=4"
  unchecked_border: "surface/border"
  checked_bg: "BlogVault Brand/bv-emerald-900"
  check_icon_color: "typography/text-white"
  check_icon: { sm: 12, md: 16 }
  indeterminate_dash: { sm: "8x2", md: "12x2" }
  padding: N/A  # icon fills the box
  shadow: "Box Shadow/shadow-sm on focus"
  states: [default, hover, focus, checked, indeterminate, disabled, error]
  variants: [sm, md]
  disabled: "opacity/opacity-50"
  focus: { ring: "2px offset 2px BlogVault Brand/bv-emerald-900", shadow: "Box Shadow/shadow-sm" }
  error: { border: "typography/text-destructive" }
  hover: "border darkens to Flat/zinc/zinc-300"
  gap: 8  # label gap
  label: { style: "type/sm/normal/regular", description: "type/sm/tight/medium" }
  animation: "check scale-in 100ms ease-out"

radio:
  sizes: { sm: 16, md: 24 }
  outer_ring: "surface/border"
  selected_ring: "BlogVault Brand/bv-emerald-900"    # Corrected from text-primary
  inner_dot: { color: "Flat/base/base-white", sm: 8, md: 12 }
  bg: N/A  # ring-based, no fill
  border: "1px surface/border"
  radius: "border radius/full=9999"
  padding: N/A
  shadow: "shadow/base on focus"
  states: [Default, Hover, Focus, Selected, Disabled]
  variants: [sm, md]
  disabled: "opacity/opacity-50 on label, surface/muted-foreground ring+dot"
  focus: { ring: "2px offset 2px", shadow: "shadow/base" }
  gap: 8  # label gap
  label: { primary: "type/sm/normal/regular", secondary: "type/sm/tight/regular" }
  hover: "border darkens to Flat/zinc/zinc-300"
  animation: "dot scale-in 100ms ease-out"

pill:
  heights: { sm: 24, md: 32 }
  padding_h: { sm: 8, md: 16 }
  radius: "border radius/full=9999"
  typography: { sm: "type/xs/normal/medium", md: "type/sm/normal/medium" }
  neutral:     { bg: "Flat/zinc/zinc-100", text: "typography/text-primary" }
  success:     { bg: "surface/success-background", text: "typography/text-success" }
  informative: { bg: "Flat/sky/sky-50", text: "Flat/sky/sky-600" }
  warning:     { bg: "surface/warning-background", text: "typography/text-warning" }
  destructive: { bg: "surface/destructive-background", text: "typography/text-destructive" }
  states: { default: true, hover: "alpha/10 darken", pressed: "alpha/20 darken" }  # pill button
  variants: [Neutral, Success, Informative, Warning, Destructive]
  disabled: "opacity/opacity-50"
  focus: { ring: "surface/border", width: 2 }  # pill button only
  icon: { sm: 8, md: 16, gap_to_text: "spacing/1=4" }
  gap: "spacing/1=4"  # icon gap_to_text
  shadow: "shadow/md"  # on outlined pill button
  border: "surface/border"  # on neutral variant
  animation: "background-color 100ms ease on hover"

badge:
  sizes: { dot: 8, sm: 16, md: 24 }
  radius: { sm_md: "border radius/md=6", dot: "border radius/full" }
  typography: { sm: "type/xs/normal/semibold", md: "type/xs/tight/semibold" }
  padding: { sm: "spacing/0-5=2 H", md: "spacing/1=4 H", md_v: "spacing/0-5=2" }
  bg_map: { info: "Flat/sky/sky-50", warning: "surface/warning-background", success: "surface/success-background", destructive: "surface/destructive-background" }
  border: N/A  # no explicit border
  shadow: "shadow/base"  # on outlined variants
  states: N/A  # non-interactive
  variants: [Information, Warning, Success, Destructive]
  disabled: N/A
  focus: N/A  # non-interactive
  icon_size: 24  # icon_size_md
  gap: N/A
  position: "top-right of host, -4px outset"
  animation: N/A

toast:
  width: 360  # flexible
  padding: 16
  radius: "border radius/lg=8"
  shadow: "shadow/lg"
  bg: "surface/card-background"
  border: "surface/border"
  title: "type/sm/normal/semibold"
  body: { style: "type/sm/normal/regular", color: "typography/text-secondary" }
  states: [Entering, Visible, Dismissing]
  variants: [success, info, warning, destructive]
  disabled: N/A
  focus: N/A  # transient, not focusable
  auto_dismiss: 4000
  close_icon: 24  # top-right
  icon_size: 24  # 24x24 (width/w-6)
  gap: { stack_offset: 8 }
  animation: "slide in 240ms, auto-dismiss 4s"

breadcrumb:                                          # Figma page 714:41570 — 4 published symbols
  text: "type/sm/normal/medium"
  separator_color: "typography/text-secondary"       # Corrected from text-tertiary
  hover: "Flat/emerald/emerald-700 underline"
  home_icon: 20
  gap: 20                                            # item↔separator gap (Figma anatomy: gap 20)
  link_style: "type/sm/tight/regular"  # 14/14/400
  active_item_color: "typography/text-primary"  # last item (State=Current)
  earlier_items_color: "typography/text-secondary"
  separator_icon: "chevron-right 14x18"              # Slash variant is 5x21
  bg: N/A
  border: N/A
  radius: "radius/rounded_1,25=5"                    # r5 on the interactive item/button hit areas
  padding: N/A  # inherits from Top Nav / Page Header
  shadow: N/A
  states: [Default, Hover, Current]                  # 'Current' replaces the old 'Truncated' state
  variants:
    Breadcrumb:            "Size=md | sm  ×  Sidebar=Open | Collapsed  ·  Show Item 1–10 booleans"
    Breadcrumb/Item:       "State=Default | Hover | Current  ·  Label text  ·  Show Icon"
    Breadcrumb/Separator:  "Type=Chevron | Slash"
    Breadcrumb/Dashboard Button: "Sidebar=Open | Collapsed | Back  ·  40×40"
  sub_components:
    item:              { size: "auto × 20", role: "one path segment; Current is plain text, never a link" }
    separator:         { size: "14×18 (chevron) | 5×21 (slash)", rule: "one separator type per trail — never mix" }
    dashboard_button:  { size: "40×40", role: "sidebar toggle, always leftmost, before Item 1", rule: "use only in layouts with a collapsible sidebar; never alongside a second nav-bar toggle" }
  sizes:
    md: "desktop page headers, below the global nav bar"
    sm: "dense layouts, secondary panels, compact page headers"
  disabled: N/A
  focus: { link_ring: "surface/border", width: 2 }
  truncation: "max 5 visible items; deeper hierarchies collapse middle items into an … overflow menu. Always show root + current."
  mobile: "show only the direct parent as a back link (← Settings); Dashboard Button may move into the hamburger menu"
  animation: N/A

announcement_popup:                                  # Figma page 7191:1631 — symbol 7191:6635 'Pop-up'
  size: { w: 568, h: 588 }
  bg: "surface/card-background"                      # media region uses surface/widget-background
  radius: "radius/rounded_6=24"                       # inner media/CTA blocks: radius/rounded_2=8
  shadow: "Box Shadow/shadow-lg"                      # 0 4 6 -2 #0000000D + 0 10 15 -3 #0000001A
  padding: 24                                        # spacing_gap/gap_6
  gap: { section: 24, stack: 16, inline: 12, tight: 8 }   # gap_6 / gap_4 / gap_3 / gap_2
  ribbon:
    text: "New Feature !!"
    style: "type/xs/normal/regular, typography/text-white, 45° corner ribbon, top-left"
    fill: "amber/gold gradient — decorative, not a semantic token"
  media:
    region: "surface/widget-background, radius/rounded_2, emerald-tinted gradient wash (bv-emerald-50 → base-white)"
    carousel: "Pagination dots below media · active dot bv-emerald-700 pill, inactive Flat/zinc/zinc-200 dot, rounded-full"
  title:
    style: "type/lg/normal/medium"                    # 18/28/500
    color: "typography/text-primary"
    accent: "feature name in italic Flat/emerald/emerald-600 inline with the rest of the title"
  description:
    style: "type/xs/normal/regular"                   # 12/16/400 · max 2 lines
    color: "typography/text-secondary"
    align: center
  buttons:
    layout: "right-aligned pair, gap_3=12, both md"
    secondary: "Ghost — typography/text-primary label + leading icon"
    primary: "BvButton Primary — bv-emerald-700 fill, Flat/base/base-white label, radius/rounded_2"
    label_style: "type/sm/normal/medium"
  close_icon: { size: 24, position: "top-right, 24px inset", color: "typography/text-secondary" }
  states: [Default]
  variants: N/A                                      # single published variant today
  disabled: N/A
  focus: "close button and both CTAs are tab-focusable; trap focus inside the popup while open"
  overlay: "surface/overlay-background scrim, click-outside dismisses"
  animation: "fade + scale-in 200ms ease-out; carousel slide 240ms"
  usage: "one-time feature announcement on first load after release. Never stack with a Modal or Dialog — at most one blocking surface at a time."

accordion:
  padding: 16
  outer_radius: "radius/rounded_2=8"
  title: "type/base/normal/regular"
  body: { style: "type/sm/normal/regular", color: "typography/text-secondary" }
  chevron: 16
  expand_duration: 200
  shadow: "shadow/sm"  # on outer wrapper
  bg: "surface/card-background"
  border: "1px surface/border bottom separator between items"
  states: [Collapsed, Expanded, Disabled]
  variants: ["Single expand", "Multi expand"]
  disabled: "opacity/opacity-50, no interaction"
  focus: { ring: "surface/border", width: 2 }  # on trigger row
  icon_size: 16  # chevron
  gap: { between_items: 0, separator: "1px border", from_title: "spacing/2=8" }
  animation: "chevron rotate 180deg + content height 200ms ease-out"

nav_bars:
  top_nav:
    height: 80
    bg: "surface/navigation-background"
    shadow: "Box Shadow/shadow-sm"
    item_h: 28
    active_bg: "Flat/emerald/emerald-50"
    logo_h: 28
    account_menu: "Avatar md 32 + dropdown"
  sidebar:
    open_w: 296
    collapsed_w: 48
    item_h: 32
    active_bg: "Flat/emerald/emerald-50"
    active_text: "BlogVault Brand/bv-emerald-900"
    hover_bg: "Flat/zinc/zinc-100"
    section_header: { style: "type/xs/tight/medium", color: "typography/text-tertiary", top_margin: 24 }
    collapsed_tooltip: "show tooltip on hover"
  mobile_nav: { height: 56, hamburger: "24x24 opens Sheet Slider sidebar" }
  radius: "border radius/md=6"  # on active items and sidebar items
  typography: "type/sm/tight/medium"  # on nav items
  border: "1px surface/border"  # right on sidebar
  padding: { sidebar_item: "px-3/py-2=12/8" }
  states: [Default, Active, Hover, Collapsed]
  variants: [Top, Sidebar, Mobile]
  disabled: N/A
  focus: { ring: "surface/border", width: 2 }
  icon: { size: 16, gap: "spacing_gap/gap_2=8" }
  gap: { nav_items: "spacing_gap/gap_2=8" }
  animation: "sidebar collapse 200ms ease-out"

table:
  cell_h: { default: 72, compact: 40 }
  head_h: 40
  head_bg: "Flat/zinc/zinc-50"
  head_text: { style: "type/sm/normal/medium", color: "typography/text-secondary" }
  cell_text: { primary: "type/sm/normal/regular", secondary: "type/xs/normal/regular" }
  row_border: "surface/border"
  hover_bg: "Flat/zinc/zinc-50"
  selected_bg: "Flat/emerald/emerald-50"
  radius: N/A  # tables are sharp-cornered
  padding: { cell: "pl-4=16, py-4=16, pr spacing/2-5=10" }
  shadow: "shadow/sm"  # on bulk action bar
  states: [Default, Hover, Selected]
  variants: [Default, Compact, Striped]
  disabled: N/A
  focus: N/A  # row selection via checkbox
  icon_size: { sort: 16, action: 32 }
  gap: N/A  # column-based layout
  checkbox_column_width: 44
  footer: { height: 56, padding: 16, bulk_action_h: 48, bulk_shadow: "shadow/sm" }
  optional_stripe: "Flat/zinc/zinc-50 on even rows"
  animation: N/A

form:
  single_max_w: 384
  double_layout: "2-column grid, full content width"
  field_gap: "spacing/3=12"
  section_gap: "spacing/6=24"
  bg: "surface/card-background"  # on form container
  label: "type/sm/tight/medium"
  required_indicator: "red asterisk typography/text-destructive"
  helper: { style: "type/xs/normal/regular", color: "typography/text-secondary" }
  error_color: "typography/text-destructive"
  border: "surface/border"  # on double form function container
  radius: "border radius/lg=8"  # on double form function container
  padding: { container: 16, field_internal: "per input_field spec" }
  shadow: N/A
  states: [Default, Validating, Error, Submitting]
  variants: [Single, Double]
  disabled: N/A  # individual fields handle disabled
  focus: N/A  # individual fields handle focus
  icon_size: N/A
  button_group_gap: "spacing_gap/gap_4=16"
  animation: N/A

menu:
  min_w: 200
  max_w: 320
  item_h: 32
  item_radius: "border radius/sm=2"
  bg: "surface/card-background"
  hover_bg: "Flat/zinc/zinc-100"
  active_bg: "Flat/zinc/zinc-100 + check icon right"
  shadow: "shadow/md"
  container_radius: "radius/rounded_3=12"
  border: "1px surface/border"
  padding: { outer: "spacing/1=4", item: "px-3=12/py-2=8" }
  typography: { item: "type/sm/normal/regular", section_label: "type/xs/normal/medium" }
  destructive: "typography/text-destructive"  # for destructive items
  separator: { thickness: 1, color: "surface/border", v_margin: "spacing_gap/gap_0,5=2" }
  icon: { size: 16, nested_chevron: 8 }
  states: [Default, Hover, Active, Disabled]
  variants: [dropdown, context, nested]
  disabled: "opacity/opacity-50 on item"
  focus: { ring: "surface/border", width: 2 }
  gap: N/A  # items flush
  animation: "fade-in + scale 0.95->1.0, 100ms ease-out"

feedback:
  padding: 16
  radius: "rounded=4"
  title: "type/sm/tight/semibold"
  body: "type/xs/tight/regular"
  bg: "per variant (see below)"
  success: { bg: "surface/success-background", accent: "Flat/emerald/emerald-700", icon: "typography/text-success" }
  warning: { bg: "surface/warning-background", accent: "Flat/amber/amber-600", icon: "typography/text-warning" }
  destructive: { bg: "surface/destructive-background", accent: "typography/text-destructive" }
  info: { bg: "Flat/sky/sky-50", accent: "Flat/sky/sky-700", icon: "Flat/sky/sky-600" }
  border: { left_accent: "3px per variant" }
  shadow: N/A
  states: [Visible, Dismissed]
  variants: [success, warning, destructive, info]
  disabled: N/A
  focus: N/A
  icon_size: 16  # 16x16
  gap: N/A
  dismiss: { icon_size: 16, position: "right-aligned" }
  animation: "fade-out on dismiss, 200ms"

progress:
  linear: { h: 8, radius: "border radius/full", track: "Flat/zinc/zinc-100", fill: "BlogVault Brand/bv-emerald-600" }
  circular: { diameters: [24, 32, 40, 48], stroke: 4 }
  ring: { diameters: [64, 80], stroke: 8, value_center: "type/lg/tight/semibold" }
  success_fill: "BlogVault Brand/bv-emerald-700"
  warning_fill: "typography/text-warning"
  destructive_fill: "typography/text-destructive"
  bg: "track color per variant"
  border: N/A
  padding: N/A
  shadow: N/A
  states: [Indeterminate, Determinate, Complete]
  variants: [linear, circular, ring]
  disabled: N/A
  focus: N/A  # non-interactive
  icon_size: N/A
  gap: N/A
  typography: { label: "type/sm/tight/medium", value: "type/micro-10/normal/regular" }
  animation: "indeterminate 1600ms loop"

stepper:
  circle_size: 24
  pending: "Flat/zinc/zinc-300"
  current: "BlogVault Brand/bv-emerald-900"
  complete: "BlogVault Brand/bv-emerald-700"
  error: "typography/text-destructive"
  circle_text: { current_complete: "typography/text-white", pending: "typography/text-primary" }
  connector: { incomplete: "surface/border", complete: "BlogVault Brand/bv-emerald-700", thickness: 1 }
  bg: "per state (circle colors above)"
  border: "connector line (see above)"
  radius: "border radius/full on circles"
  padding: N/A
  shadow: N/A
  states: [pending, current, complete, error]
  variants: [horizontal, vertical, numbered, dotted]
  disabled: N/A
  focus: N/A  # non-interactive indicator
  icon_size: N/A  # number inside circle
  gap: { circle_to_label: 8, between_steps: 24, vertical: "gap_2=8" }
  label: { style: "type/xs/tight/regular", active_style: "type/xs/normal/medium" }
  animation: "step transition fade 200ms"

pagination:
  btn_size: 36
  radius: "border radius/md=6"
  active: { bg: "Flat/emerald/emerald-800", text: "typography/text-white" }
  inactive: { bg: "transparent", text: "typography/text-primary" }
  gap: "spacing/1=4"
  padding: N/A  # btn_size defines touch target
  border: N/A
  typography: "type/sm/tight/medium"
  disabled: "opacity/opacity-50, no pointer events"  # at bounds (prev/next)
  shadow: "shadow/sm"  # on active
  hover: "Flat/zinc/zinc-100"  # hover_bg
  states: [Default, Active, Hover, Disabled]
  variants: [numbered, prev-next, load-more]
  focus: { ring: "surface/border", width: 2 }
  icon_size: N/A
  ellipsis: { text: "...", color: "typography/text-secondary" }
  animation: N/A

skeleton:
  bg: "Flat/zinc/zinc-200"
  radius: { text: "border radius/md=6", avatar: "border radius/full", card: "border radius/xl=12" }
  pulse: "1400ms ease-in-out"
  line_h: 16
  line_gap: "spacing/2=8"
  border: N/A
  padding: N/A
  typography: N/A  # placeholder shapes only
  shadow: N/A
  states: [Loading]  # always loading state
  variants: [text, avatar, card-block]
  disabled: N/A
  focus: N/A
  icon_size: N/A
  avatar_placeholder: "48x48 circle"
  dimension_tolerance: "+/-4px of real content"
  animation: "Flat/zinc/zinc-200 <-> surface/card-background pulse, 1400ms ease-in-out"

separator:
  thickness: 1
  color: "surface/border"
  margin_default: "spacing/2=8"
  orientation_label_color: "typography/text-white"  # label on dark bg variant
  bg: N/A
  border: "1px surface/border"  # the separator IS the border
  radius: N/A
  padding: N/A
  typography: N/A
  shadow: N/A
  states: N/A  # non-interactive
  variants: [horizontal, vertical]
  disabled: N/A
  focus: N/A
  icon_size: N/A
  gap: N/A
  animation: N/A

range_slider:
  track_h: 6
  track_color: "Flat/zinc/zinc-200"
  fill_color: "BlogVault Brand/bv-emerald-900"
  thumb_size: 16
  thumb_bg: "Flat/base/base-white"
  thumb_shadow: "shadow/base"
  radius: "border radius/full"  # on track
  border: "1px Flat/zinc/zinc-200"  # on thumb
  padding: N/A
  typography: N/A  # value shown via tooltip
  states: [Default, Hover, Dragging, Disabled]
  variants: [single, dual handle]
  disabled: "opacity/opacity-50"
  focus: { ring: "BlogVault Brand/bv-emerald-900", width: 2 }  # on thumb
  icon_size: N/A
  gap: N/A
  step_ticks: "8px on track when withMarks=true"
  animation: "thumb scale 1.2 on hover, 100ms"

calendar:
  cell: 32x32
  header_h: 48
  day_label: { style: "type/xs/tight/regular", color: "typography/text-secondary" }
  selected: { bg: "BlogVault Brand/bv-emerald-900", text: "typography/text-white" }
  range_middle: "Flat/zinc/zinc-100"
  today_ring: "surface/border"
  bg: "surface/card-background"
  border: "today 1px ring"
  cell_radius: "radius/rounded_2=8"
  padding: { header: 16 }
  disabled: "opacity/opacity-50, no pointer events"
  shadow: "shadow/base"  # popover_shadow
  states: [Default, Hover, Selected, RangeMiddle, Today, Disabled]
  variants: [single date, range, multi]
  focus: { ring: "surface/border", width: 2 }  # on cell
  icon_size: N/A
  gap: { day_grid: 0 }
  month_year_type: "type/sm/tight/semibold"
  nav_arrows: { size: 16, gap: "spacing/2=8" }
  animation: "month slide 200ms ease-out"

command_search:
  width: 640
  max_h: 480
  radius: "border radius/lg=8"
  input_h: 40
  row_h: 40
  bg: "surface/card-background"
  shadow: "shadow/md"
  active_row: "Flat/zinc/zinc-100"
  border: "1px surface/border"
  padding: { row_lr: 16, section_v: 8 }
  typography: { section_headers: "type/xs/tight/medium", keybind: "type/xs/normal/regular", item: "type/sm/normal/regular" }
  backdrop: "same as modal"  # surface/page-background-content at alpha/80
  footer: { height: 32, hint_chips: true }
  states: [Open, Typing, Empty, Navigating]
  variants: N/A  # single pattern
  disabled: N/A
  focus: { trap: true, restore_on_close: true }
  icon_size: { search: 16, row: 16 }
  gap: { row_icon_label: 8 }
  empty_state: { style: "type/sm/normal/regular", color: "typography/text-secondary", alignment: "centered" }
  animation: "same as modal (scale + fade)"

avatar:
  sizes: { xs: 16, sm: 24, md: 32, lg: 40, xl: 48, 2xl: 64 }
  initials_bg: "Flat/zinc/zinc-200"
  initials_text: "typography/text-primary"
  initials_type:
    xs: "type/micro-8/normal/regular"
    sm: "type/micro-10/normal/regular"
    md: "type/xs/normal/medium"
    lg: "type/sm/normal/medium"
    xl: "type/base/normal/medium"
    2xl: "type/lg/normal/medium"
  circle_radius: "border radius/full=9999"
  square_radius: "radius/rounded_2=8"
  group_overlap: -8
  group_max: 4                                    # +N counter after 4
  counter_pill: { bg: "Flat/zinc/zinc-100", type: "type/xs/normal/medium" }
  bg: "Flat/zinc/zinc-200 (initials), image (photo)"
  border: "surface/border"                        # 1px when stacked
  padding: N/A
  shadow: N/A
  states: N/A  # non-interactive display element
  variants: [photo, initials, icon-fallback, group]
  disabled: N/A
  focus: N/A  # non-interactive
  icon_size: N/A
  online_dot: { size: 8, color: "Flat/emerald/emerald-500", position: "bottom-right" }
  icon_fallback_color: "typography/text-tertiary"
  animation: N/A

indicator:
  sizes: [8, 16, 24]
  variants: [Default, Pulse, Step]
  success: { bg: "Flat/emerald/emerald-100", fg: "typography/text-success" }
  destructive: { bg: "surface/destructive-background", fg: "typography/text-destructive" }
  warning: { bg: "surface/warning-background", fg: "Flat/amber/amber-600" }
  neutral: { bg: "Flat/zinc/zinc-200", fg: "typography/text-primary" }
  border: N/A
  radius: "border radius/full"
  padding: N/A
  shadow: N/A
  states: N/A  # non-interactive
  disabled: N/A
  focus: N/A
  icon_size: N/A
  gap: N/A
  pulse: "scale 1.0→1.4→1.0, 2000ms infinite"
  label: "type/xs/normal/regular"
  step_number: "type/xs/tight/regular"
  animation: "pulse variant: scale 1.0→1.4→1.0, 2000ms infinite"

notification:
  tray_w: 400
  tray_shadow: "Box Shadow/shadow-lg"
  tray_radius: "radius/rounded_4=16"
  bg: "surface/card-background"
  row_h: 64
  row_padding: 16
  row_border: "surface/border"                    # 1px bottom
  row_hover: "Flat/zinc/zinc-100"
  title: "type/sm/tight/medium"
  subtext: { style: "type/xs/tight/regular", color: "typography/text-secondary" }
  time: { style: "type/xs/tight/regular", color: "typography/text-tertiary" }
  states: [Open, Closed]
  variants: N/A  # single tray pattern
  disabled: N/A
  focus: N/A
  status_icon: 24
  gap: N/A
  composition: "icon -> title + subtext -> action/dismiss"
  animation: "slide-in from top, 200ms"

pre_checks:
  row_min_h: 48
  row_gap: 16
  icon_size: 24
  success_icon: "Flat/emerald/emerald-700"
  error_icon: "typography/text-destructive"
  blur_backdrop: "backdrop-blur/3xl=64"
  container: { bg: "surface/card-background", radius: "radius/rounded_2=8", padding: 24, shadow: "shadow/lg" }
  border: N/A
  label: "type/sm/normal/regular"
  subtext: { style: "type/xs/normal/regular", color: "typography/text-secondary" }
  states: [pending, running, success, error]
  variants: N/A  # single checklist pattern
  disabled: N/A
  focus: N/A
  animation: "spinner on running state, check/cross fade-in 200ms"

carousel:
  item_gap: { default: 16, large: 24 }
  container_radius: "border radius/xl=12"
  arrow: { size: 40, bg: "surface/card-background", border: "surface/border", radius: "border radius/full=9999", shadow: "shadow/sm", icon: 16 }
  dot: { size: 8, gap: 8, active: "typography/text-black", inactive: "Flat/zinc/zinc-200" }
  scroll: "snap-x"
  padding: N/A
  typography: N/A  # content-driven
  states: [Default, Scrolling]
  variants: [with-arrows, with-dots]
  disabled: N/A
  focus: { arrow_ring: "surface/border", width: 2 }
  peek: "always show 1 partial next item"
  animation: "snap scroll 300ms ease-out"

sheet_slider:
  anchor: bottom
  max_h: "80vh"
  top_radius: "rounded-3xl=24"
  drag_handle: { w: 32, h: 4, opacity: "opacity/opacity-70" }
  backdrop: { bg: "surface/page-background-content", alpha: "alpha/80" }
  bg: "surface/card-background"
  border: N/A
  shadow: "shadow/lg"
  header_title: "type/lg/normal/semibold"
  close_btn: 36
  body_padding: { h: 16, v: 24 }
  body_max_w: "max-w-sm=384 for form content"
  states: [Open, Closing]
  variants: N/A  # bottom-anchored only
  disabled: N/A
  focus: { trap: true, restore_on_close: true }
  icon_size: N/A
  gap: N/A
  animation: "slide up from bottom, 200ms ease-out"

empty_state:
  icon: 48
  gap_icon_title: 16
  title: "type/lg/tight/semibold"
  gap_title_subtext: 4
  subtext: { style: "type/sm/normal/regular", color: "typography/text-secondary" }
  gap_subtext_cta: 24
  max_w: 360
  bg: N/A  # inherits from container
  border: N/A
  radius: N/A
  padding: N/A  # centered in parent
  shadow: N/A
  states: N/A
  variants: N/A
  disabled: N/A
  focus: N/A
  alignment: "centered within Page Content Area or Card"
  animation: N/A

search_bar:
  width: 320                                      # 100% on mobile
  height: 40
  left_icon: 16
  right_icon: "clear x when filled"
  placeholder_color: "typography/text-tertiary"
  bg: "surface/card-background"
  border: "surface/border"
  radius: "border radius/md=6"  # inherits input_field
  padding: { h: 12, v: 8 }  # inherits input_field
  typography: "type/sm/normal/regular"
  shadow: "shadow/sm on focus"
  states: [Default, Focused, Filled]
  variants: N/A  # inherits input_field search type
  disabled: "opacity/opacity-50"
  focus: { ring: "BlogVault Brand/bv-emerald-900", width: 2 }
  gap: N/A
  animation: "border-color 150ms ease on focus"

data_viz:
  palette: ["surface/chart-1=#2a9d90", "surface/chart-2=#e76e50", "surface/chart-3=#274754", "surface/chart-4=#e8c468", "surface/chart-5=#f4a462"]
  axis_text: { style: "type/xs/normal/regular", color: "surface/muted-foreground" }
  grid_line: { width: 1, color: "surface/border", opacity: "opacity/opacity-20" }
  chart_radius: "border radius/sm=2"
  canvas_padding: 16
  bg: N/A  # inherits container
  border: N/A
  title: "type/base/tight/semibold"
  hero_value: "type/3xl/normal/bold"
  shadow: "shadow/md"  # popover_shadow (tooltip)
  states: N/A  # data-driven
  variants: N/A  # chart type is data-driven
  disabled: N/A
  focus: N/A
  icon_size: N/A
  gap: N/A
  kpi_type: "type/2xl/tight/semibold"
  value_labels: "type/3xl/normal/bold"
  tooltip: "Standard Tooltip component (§13.7)"
  animation: "chart entry animation per library (recharts default)"

widget:
  bg: "surface/widget-background"
  border: "surface/border"
  shadow: "shadow/sm"
  radius: "rounded-3xl=24"
  sizes: ["1x1=264", "2x1", "2x2", "4x2"]
  padding: 16
  gap: 16
  header: { style: "type/lg/normal/medium", optional_icon: 16 }
  kpi_value: "type/2xl/tight/semibold"
  delta_pill: "Standard Pill component"
  states: N/A  # display only
  variants: [kpi, chart-tile, custom]
  disabled: N/A
  focus: N/A
  icon_size: 16  # header icon
  animation: N/A

summary:
  cell_padding: 16
  cell_gap: 0                                     # separated by 1px border
  divider: "surface/border"
  label: { style: "type/xs/tight/medium", color: "typography/text-secondary" }
  value: "type/2xl/tight/semibold"
  bg: N/A  # inherits container
  border: "1px surface/border between cells"
  radius: N/A
  shadow: N/A
  states: N/A
  variants: N/A
  disabled: N/A
  focus: N/A
  icon_size: N/A
  layout: "horizontal row of 2-6 KPI cells"
  optional_delta_pill: "Standard Pill component"
  animation: N/A

mega_menu:
  widths: [720, 960, 1200]
  padding: 24
  columns: [2, 3, 4]
  column_gap: 24
  bg: "surface/card-background"
  border: "1px surface/border"
  radius: "radius/rounded_3=12"
  shadow: "shadow/lg"
  link_icon: 24
  link_label: "type/sm/normal/medium"
  link_subtext: "type/xs/normal/regular"
  states: [Open, Closed]
  variants: [2-col, 3-col, featured]
  disabled: N/A
  focus: { link_ring: "surface/border", width: 2 }
  anchor: "From a Top Nav item"
  animation: "fade-in 150ms ease-out"

input_otp:
  slot_size: 36                                   # width/w-9, height/h-9
  slot_radius: "border radius/md=6"
  border: "surface/border"
  bg: "surface/card-background"
  padding: N/A  # slot_size defines dimensions
  typography: "type/sm/normal/regular"
  text_color: "typography/text-primary"
  caret_color: "typography/text-black"
  shadow: "shadow/sm on focus"
  states: [Default, Filled, Focus]
  disabled: "opacity/opacity-50"
  focus: { ring: "BlogVault Brand/bv-emerald-900", width: 2, shadow: "shadow/sm" }
  icon_size: N/A
  gap: "spacing/2=8"
  variants:
    pattern: { slots: 6, gap: "spacing/2=8", layout: "horizontal" }
    separator: { slots: 6, gap: "spacing/2=8", separator: "dash between groups of 3" }
    controlled: { slots: 6, gap: "spacing/2=8", layout: "2-row 3x2", total_h: 72 }
  interaction: "Auto-advance on digit entry, Backspace returns to previous"
  animation: "caret blink 1000ms"

map:
  tile_size: 256
  pin: { standard: 24, large: 32, shadow: "effect/level_1" }
  heat_palette: "chart-1→chart-5"
  heat_alpha: { min: "alpha/40", max: "alpha/80" }
  bg: N/A  # map tiles are external
  border: N/A
  radius: N/A
  padding: N/A
  typography: N/A
  states: N/A
  variants: [world, region, pin, heat]
  disabled: N/A
  focus: N/A
  gap: N/A
  animation: "pan/zoom via map library"

# --- Missing standalone YAML blocks ---

page_header:
  height: "auto (content-driven)"
  composition: "Page Icon + Title + Subtext + (optional Search) + Button Group"
  page_icon: { size: 32 }
  title: "type/2xl/tight/semibold"  # 24px
  subtext: { style: "type/sm/normal/regular", color: "typography/text-secondary" }
  title_subtext_gap: 4
  bg: N/A  # inherits page content area
  border: N/A
  radius: N/A
  padding: { bottom: 24 }  # gap before content
  shadow: N/A
  states: N/A
  variants: [with-search, with-tabs, minimal]
  disabled: N/A
  focus: N/A
  icon_size: 32
  gap: { icon_to_title: 8, title_to_subtext: 4, header_to_buttons: "auto (right-aligned)" }
  animation: N/A

page_wrapper:
  figma_page: "4417:6389"
  composition: "Top Nav + Sidebar + Page Content Area"
  content_area: { max_w: 1392, grid: "12-col, 88px col, 24px gutter, 24px offset" }
  bg: "surface/page-background-content"
  border: N/A
  radius: N/A
  padding: { content: 24 }  # L/R offset
  shadow: N/A
  states: [sidebar-open, sidebar-collapsed]
  variants: N/A
  disabled: N/A
  focus: N/A
  icon_size: N/A
  gap: N/A
  animation: "sidebar collapse 200ms ease-out"

layout_templates:
  templates:
    page: "Top Nav + Sidebar + Page Content Area (default)"
    two_pane: "248px Section 1 + dynamic Section 2"
    three_pane: "248 + dynamic + 320px (right rail)"
  constraints: "All obey 12-col grid (§4) and max 3 sections (§8)"
  bg: N/A
  border: N/A
  radius: N/A
  padding: N/A
  shadow: N/A
  states: N/A
  variants: [page, two_pane, three_pane]
  disabled: N/A
  focus: N/A
  icon_size: N/A
  gap: N/A
  animation: N/A

mobile_deltas:
  min_target_size: "48x48"
  top_nav: { height: 56 }  # collapsed from 80
  sidebar: "becomes Sheet Slider (§13.5)"
  forms: "1-column layout always"
  modals: "full-screen Sheets below 640px viewport"
  tabs: "scrollable horizontally, underline -> pill on small screens"
  bg: N/A
  border: N/A
  radius: N/A
  padding: N/A
  shadow: N/A
  states: N/A
  variants: N/A
  disabled: N/A
  focus: N/A
  icon_size: N/A
  gap: N/A
  animation: N/A
```

---

## 7. Code mappings per framework

The same Horizon component renders into different code shapes per target. The agent reads the project's `package.json` (or `Cargo.toml`, `pubspec.yaml`, etc.) to pick the framework, then uses the table below.

### 7.1 React + Tailwind (default)

```tsx
// Button (Primary)
import { Button } from '@/components/ui/button'
<Button variant="primary" size="md">Save changes</Button>

// Card
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>…</CardContent>
</Card>

// Modal
import { Modal } from '@/components/ui/modal'
<Modal size="md" open={open} onOpenChange={setOpen}>
  <Modal.Header>…</Modal.Header>
  <Modal.Body>…</Modal.Body>
  <Modal.Footer>…</Modal.Footer>
</Modal>
```

### 7.2 Vue 3

```vue
<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
</script>
<template>
  <Button variant="primary" size="md">Save changes</Button>
</template>
```

### 7.3 Plain HTML + CSS (no framework)

```html
<button class="btn btn--primary btn--md">Save changes</button>
<style>
  .btn { display:inline-flex; align-items:center; gap:8px; height:40px; padding:0 16px;
         border-radius:8px; font: 500 14px/14px Inter, sans-serif; }
  .btn--primary { background: var(--surface-card-background); color: var(--text-primary); }
</style>
```

### 7.4 SwiftUI

```swift
Button("Save changes") { /* … */ }
  .buttonStyle(HorizonPrimaryButtonStyle(size: .md))
```

### 7.5 Flutter

```dart
HorizonButton.primary(label: 'Save changes', size: HorizonSize.md, onTap: () {})
```

### 7.6 Jetpack Compose

```kotlin
HorizonButton(text = "Save changes", variant = Primary, size = Md, onClick = {})
```

### 7.7 Qt (C++)

```cpp
auto *btn = new HorizonButton("Save changes", HorizonButton::Primary, HorizonButton::Md, this);
```

### 7.8 PySide6 (Python)

```python
btn = HorizonButton("Save changes", variant="primary", size="md")
```

### 7.9 Java Swing

```java
new HorizonButton("Save changes", HorizonButton.PRIMARY, HorizonButton.MD);
```

> **Asset placeholder rule (universal).** If a target image / icon / SVG cannot be resolved, render `https://placehold.co/{w}x{h}` sized to the spec's `w` × `h`. Do not stop building. Report the placeholder in the final summary.

---

## 8. Figma plugin API recipes

Hard-won rules from `feedback_figma_ds_building.md` (memory):

```
01 Every element MUST be a DS instance — never raw frames mimicking DS.
02 Tables: the SLOT (`Cell Entry`) must be cleared first, then appendChild new content.
   Wrap complex content in a horizontal auto-layout FRAME inside the SLOT.
   Always clear placeholder fills/strokes: slot.fills = []; slot.strokes = [];
03 Never hardcode hex. Always: importVariableByKeyAsync → setBoundVariableForPaint.
   The returned paint is NEW — capture and reassign.
04 Typography: importStyleByKeyAsync → node.textStyleId = style.id.
   Always await figma.loadFontAsync({family, style}) BEFORE any text mutation.
05 swapComponent() can toggle parent visibility — explicitly set .visible = true after.
06 Badge has no text property — find the inner TEXT node, load font, set .characters.
07 DS Tables are column-major: vertical auto-layout columns inside a horizontal Columns frame.
08 Cell padding: asymmetric 12 px L / 4 px R for clean left-alignment.
09 Always screenshot to verify. Script return values lie.
10 Work incrementally. Inspect → small change → screenshot → verify → fix.
```

Atomic-script template:

```js
// inside use_figma — auto-wrapped in async, just `return` to send back data
const lib = 'lk-47ecb318...';                          // Horizon library key
const results = await figma.search_design_system?.({}); // (search via search_design_system MCP tool)
const compNode = await figma.importComponentByKeyAsync('39646742e93acea748f28105bd4045a676ab86a1');
const inst = compNode.createInstance();
figma.currentPage.appendChild(inst);
inst.x = 1200; inst.y = 0;          // never (0,0)
return { createdNodeIds: [inst.id] };
```

---

## 9. Specs YAML schema (Figma → code)

The Figma Specs plugin emits YAML in this shape. Agents should parse it deterministically.

```yaml
spec_version: 1
generated_at: <iso8601>
source:
  file_key: <figma_file_key>
  node_id: <figma_node_id>
  url: <figma_url>
target_framework: react+tailwind   # auto-detect by default
options:
  detailed_data_attributes: true
  ai_ready_yaml: true
  compact_mode: true
  show_parent_layout: true
include:
  layer_breakdown: true
  variant_properties: true
  layout_and_spacing: true
  data_export: true
  style_inventory: true
  variables: true
  modes: true
parent_layout:                       # only when show_parent_layout=true
  type: frame
  x: 0; y: 0; w: 1440; h: 900
  auto_layout: { direction: vertical, gap: 24, padding: [24,24,24,24] }
chunks:                              # the meat — repeats deduplicated
  - id: ch_01
    name: PageHeader
    instance_of: Header               # → §6 component map
    w: 1392; h: 80
    layout: { direction: horizontal, gap: 16, padding: [16,24,16,24] }
    props: { title: "Manage members", subtext: "Invite and manage…" }
    children: [ch_02, ch_03]
repeats:                             # arrays referencing chunks by id
  - { of: ch_05, count: 12, key_field: id }
resolved_tokens:                     # pre-resolved DTCG aliases
  "{color.surface.card-background}":  "#FAFAFA"
  "{spacing.gap.16}":                 "16px"
  "{type.sm.normal.medium}":          { font: Inter, weight: 500, size: 14, line: 20 }
style_inventory:                     # all colors/text/effects used in this frame
  colors: [ "{color.surface.card-background}", "{color.typography.text-primary}" ]
  text:   [ "{type.sm.normal.medium}", "{type.2xl.tight.semibold}" ]
  effects: []
implementation_instructions: |
  - Match every `instance_of` to §6 of /design.md.
  - Resolve `{...}` tokens via §3 — emit Tailwind class or CSS var.
  - For unknown assets use https://placehold.co/{w}x{h}.
  - After build, preview_screenshot and diff against .figma/{node_id}.png.
```

---

## 10. Output & AI options

Mirrors the Figma Specs plugin's "Output & AI options" panel verbatim. These flags travel in the YAML `options` block.

| Option | Default | Meaning |
|---|---|---|
| **Detailed data attributes** | `true` | Include fill, stroke, and effect details in the YAML. Required when emitting CSS-only or Swift code. |
| **AI-ready YAML** | `true` | Add machine-friendly metadata (chunk ids, repeat references, resolved tokens) so Codex / Claude / MCP can reason without re-fetching. |
| **Compact mode** | `true` | Shorter output using fewer AI tokens — collapses identical sibling chunks into `repeats`. Disable when debugging. |
| **Show parent layout** | `true` | Annotate the frame *around* the target so positioning is preserved. Required when emitting a partial. |
| **Target framework** | `auto-detect` | One of: react+tailwind, vue3, html+css, swiftui, flutter, jetpack-compose, qt, pyside6, swing. Auto-detect uses `package.json`/`pubspec.yaml`/etc. |
| **Layer breakdown — Table format** | `true` | Render layers as a table instead of annotated artwork — easier to grep in code review. |
| **Layer breakdown — Include all variants** | `true` | Emit every variant of every component, not just the default. Use when the target component must support all variants. |
| **Layer breakdown — Include nested components** | `true` | Recursively spec components used inside the target. |
| **Include — Layer breakdown** | `true` | Every layer with its key visual details. |
| **Include — Variant properties** | `true` | How each variant option changes the component. |
| **Include — Layout & spacing** | `true` | Auto-layout direction, gaps, padding, sizing. |
| **Include — Data export** | `true` | Structured YAML for dev tools and AI agents. |
| **Include — Style inventory** | `true` | Colors, text styles, variables, tokens used. |
| **Include — Variables** | `true` | Resolved value of each Figma variable. |
| **Include — Modes** | `true` | Compare the component across variable modes (e.g. light/dark). |

---

## 11. Do / Don't rules

**Do**
- Read `/design.md` before generating anything.
- `Skill("figma-use")` before any `use_figma` call.
- Resolve every fill/stroke/gap/radius/text-size to a token.
- Search Horizon (filtered by library key) before assuming a component exists.
- Position new top-level frames away from `(0,0)`.
- Return all created/mutated node IDs from every `use_figma` call.
- Screenshot after every meaningful change.
- Light + Dark mode both verified.
- Match `instance_of` from Specs YAML to §6 component map.
- Use `https://placehold.co/{w}x{h}` for missing assets.
- **Read frame names, component properties, auto-layout, and artifacts before generating or auditing (§13).**
- **Read all annotations, comments, and TODOs — ask the user when ambiguous (§14).**

**Don't**
- Hardcode hex / px / shadow values.
- Use `12 / 20 / 22 / 6 / 10 / 14 / 18 / 28 / 36 / 44 / 52 px` in any gutter, padding, or gap. Multiples of 8 only (with `2` and `4` as the sub-8 exceptions).
- Use `figma.notify()` (throws "not implemented" in `use_figma`).
- Set `layoutSizingHorizontal = 'FILL'` before `appendChild`.
- Skip `await figma.loadFontAsync()` before mutating text.
- Re-create a Horizon component manually with raw frames.
- Let the script return without a `screenshot`/`return-IDs` step.
- Assume the agent's first generation is correct — diff against the spec.
- Add decorative gradients on UI surfaces.
- **Ignore annotations or comments in the Figma file — they are design intent.**
- **Silently resolve ambiguous annotations — always ask the user.**
- **Skip frame-name inspection — "Frame 43" or "Untitled" is a finding, not acceptable.**

---

## 12. MCP integration

```yaml
servers:
  figma_dev_mode:
    transport: streamable-http
    url: http://127.0.0.1:3845/mcp
    enable_when: figma_desktop_running
    tools:
      - get_design_context     # YAML spec
      - get_metadata           # tree only
      - get_screenshot         # PNG
      - get_variable_defs
      - get_code_connect_map
      - search_design_system
      - use_figma              # plugin API execution
  claude_preview:
    transport: stdio
    tools: [preview_start, preview_screenshot, preview_snapshot, preview_eval, preview_logs]
order_of_use:
  1. search_design_system → confirm component exists
  2. get_design_context  → fetch YAML
  3. get_screenshot      → fetch PNG (save to .figma/)
  4. use_figma           → make any Figma write
  5. preview_*           → verify code output
fallbacks:
  no_mcp: |
    If MCP is unreachable, agents read /design.md alone and emit code using
    the §6 mapping. Designs cannot be generated to Figma without MCP, but code
    paths are fully self-sufficient.
```

---

## 13. Reading Figma frames — names, artifacts, components, and properties

Every AI agent **must** read and judge the Figma frame tree before generating or auditing. This is not optional — frame names, component names, property values, and artifact structure are the primary source of intent.

### 13.1 What to read

```yaml
frame_inspection:
  1_frame_name:
    - Read the frame name (e.g. "Members / List / Desktop"). Frame names encode: feature, view, and breakpoint.
    - Judge: does the name follow the pattern "{Feature} / {View} / {Breakpoint}"? Flag non-conforming names.
    - Nested frame names carry hierarchy — "Header", "Content", "Footer" inside a page frame are structural intent.
  2_component_instances:
    - For every component instance, read `instance_of` → resolve to the Horizon component catalog (§6).
    - Read all exposed properties and their current values (variant, size, state, label text).
    - Judge: is the correct variant selected? Is the size appropriate for context? Is the state valid?
  3_component_properties:
    - Read `componentProperties` on every instance — these expose the designer's intent (which slots are filled, which booleans are toggled, what text was entered).
    - Boolean properties (e.g. `showIcon`, `hasSubtext`) indicate intentional inclusion/exclusion — respect them.
    - Text properties are the designer's copy intent — use them verbatim in code unless the /ux-copy skill overrides.
  4_auto_layout:
    - Read direction, gap, padding, primaryAxisAlignItems, counterAxisAlignItems, layoutWrap.
    - Judge: does the gap match the 8-grid? Does padding use a Horizon spacing token?
  5_fills_strokes_effects:
    - Read bound variables on every fill, stroke, and effect.
    - Judge: is every visual property bound to a Horizon variable? Flag any raw hex/px.
  6_artifacts:
    - Read non-component children: raw text nodes, rectangles, vectors, images.
    - Judge: should these be component instances instead? A rectangle acting as a card surface is a violation.
    - Images/assets: extract dimensions and note the asset name for placeholder generation.
```

### 13.2 How to read (MCP tools)

```
1. get_metadata(fileKey, nodeId)       → frame tree with names and types
2. get_design_context(fileKey, nodeId) → YAML spec with resolved properties + tokens
3. get_screenshot(fileKey, nodeId)     → visual reference
4. use_figma → custom script           → deep property inspection (componentProperties, boundVariables, fills, strokes, auto-layout)
```

### 13.3 Judging frame quality (checklist)

| Check | Pass | Fail |
|---|---|---|
| Frame name follows `{Feature} / {View} / {Breakpoint}` | ✓ descriptive | ✗ "Frame 43" or "Untitled" |
| Every component instance resolves to Horizon catalog | ✓ all matched | ✗ unknown or detached instances |
| Properties are set intentionally (not default everywhere) | ✓ customized | ✗ all defaults on a shipped screen |
| Auto-layout gaps use 8-grid tokens | ✓ bound variable | ✗ raw `13px` or unbound |
| No raw shapes mimicking DS components | ✓ all instances | ✗ rectangles-as-cards |
| Asset layers have descriptive names | ✓ "hero-illustration" | ✗ "image 2" |

---

## 14. Reading annotations — discuss when ambiguous

Designers leave annotations, comments, and sticky notes in Figma frames. AI agents **must** read these and use them as design intent signals. When annotations are ambiguous or contradictory, the agent **must ask for clarification** — never silently guess.

### 14.1 What counts as an annotation

```yaml
annotation_sources:
  figma_comments:
    - Thread comments attached to specific nodes (via Figma's native comment system).
    - Read via `get_metadata` or the Figma REST API (`GET /v1/files/:key/comments`).
  sticky_notes:
    - FigJam-style sticky notes placed near frames or inside them.
    - Often contain: requirements, edge cases, open questions, "TODO" markers.
  text_annotations:
    - Text nodes with a name starting with "Note:", "TODO:", "Q:", "Annotation:", or "⚠".
    - These are intentional designer callouts — never treat them as UI copy.
  frame_descriptions:
    - The `description` field on any frame or component instance.
    - Horizon components carry descriptions explaining usage — read these before overriding.
  named_markers:
    - Frames or groups named "annotation", "spec-note", "redline", "callout".
    - These contain measurement lines, color callouts, or behavioral notes.
```

### 14.2 How to handle annotations

```
1. READ   — Scan all annotation sources on the target frame and its ancestors.
2. PARSE  — Extract intent signals: requirements, constraints, open questions, TODOs.
3. APPLY  — Requirements and constraints feed directly into code/design generation.
4. FLAG   — Open questions and TODOs are reported to the user before proceeding.
5. ASK    — When two annotations contradict, or when an annotation is ambiguous,
             STOP and ask the user which interpretation to follow.
             Never silently pick one reading over another.
```

### 14.3 Ambiguity triggers (when to ask)

| Signal | Action |
|---|---|
| Annotation says "maybe" / "TBD" / "discuss" / "?" | **Ask** — do not implement a "maybe." |
| Two annotations on the same element give different specs | **Ask** — cite both, ask which wins. |
| A TODO references a feature that doesn't exist yet | **Ask** — is this in scope for the current task? |
| A comment thread is unresolved | **Ask** — show the thread, ask if it's been decided. |
| A sticky note describes behavior not reflected in the design | **Ask** — is the note or the design correct? |
| An annotation references a component/token that doesn't exist in Horizon | **Ask** — is this a proposal or an error? |

### 14.4 Annotation-aware workflow addition

Add this step to **every workflow** (§2.A, §2.B, §2.C, §2.D):

```
AFTER reading the target frame/spec, BEFORE generating output:
  → Scan all annotation sources (§14.1)
  → If any ambiguity triggers (§14.3) fire, STOP and ask the user
  → If annotations contain clear requirements, incorporate them
  → Report all annotations found in the output summary
```

---

## 15. Design taste — break from convention

This product is **not** a generic SaaS dashboard. The brief is deliberately to avoid the Bootstrap / Material lookalike trap. When generating new screens, draw from these movements:

- **Editorial density.** Pentagram, Apple Newsroom, NYT Cooking — type-led layouts where the design *reads* before it *renders*. Use `type/2xl` and above where convention says `xl`.
- **Hardware-software hybrid.** Linear's keyboard-first interactions, Raycast's no-mouse feel, Arc's sidebar-as-canvas. Show keyboard shortcuts inline, always.
- **Honest data.** Stripe-style real numbers in mockups (never "Lorem"), ungoogleable usernames, plausible timestamps. Real data > placeholder data.
- **Restrained motion.** Spring physics with critical damping, never bouncy. 240 ms max for UI transitions, 80 ms for hover affordance. Respect `prefers-reduced-motion`.
- **One delight per surface.** A single bespoke moment per page — a real-time count animating, an empty state with character, a clever toggle. Not three. Not zero.
- **Color as semantic, not decorative.** A page that uses `surface/widget-background` + `text-primary` + a single accent (`text-url`) almost always beats a page that uses six.
- **Information hierarchy as the engine.** Type weight (regular → medium → semibold), size (sm → base → 2xl), and color (`text-tertiary` → `text-secondary` → `text-primary`) carry hierarchy. Color *alone* is the wrong tool.
- **Density that respects the eye.** 12 px is for code, not chrome. Default chrome density is 14 / 20. Tables can drop to 13 / 18 when justified, never below.

Forbidden patterns (anti-trends in 2026):
- Glassmorphism on UI surfaces. (Permitted on splash / marketing only.)
- "AI sparkle" icons used decoratively.
- Skeuomorphic shadows on flat layouts.
- Inflated empty states with cartoon mascots.
- Decorative gradients behind data.

---

## 16. Versioning

```
schema:        1.1.0
last_synced:   2026-08-12
sync_command:  npx @horizon/sync --file UfHICFSU9PJl9OkE84mUk9
                 → regenerates tokens.css, tokens.json, components/index.json
                 → updates the keys block in §6.4
breaking_changes: |
  - 1.0.0 (2026-05-04): initial release derived from Horizon + v1 Guidelines.
  - 1.1.0 (2026-08-12): synced against the live Horizon Figma file.
      · §3.1 Mode tokens now carry resolved Light/Dark values + Figma variable ids
        (source: new `Mode Tokens` ledger page 4537:25378). Alpha scale documented as INVERTED.
      · Added Breadcrumbs (714:41570) to §6.2 / §6.5 / §6.6 — now a 4-symbol family with a
        Dashboard Button, Chevron|Slash separators, md|sm sizes and 10 item slots.
        BREAKING: Breadcrumb/Item state `Truncated` no longer exists; use `Current`.
      · Added Announcement Popup (7191:1631) to §6.3 / §6.5 / §6.6.
```

When Horizon publishes a new version, run the sync command, review the diff, bump `last_synced`, commit. Treat `/design.md` as code.

---

## 17. Quick reference card (for humans skimming)

```
Spacing:  0 2 4 8 12 16 20 24 32 40…80…240     (rem-based: gap_{px÷4})
Radius:   0 2 4 8 16 24 32…80 9999             (rem-based: rounded_{px÷4})
Opacity:  0–20 sequential                       (opacity_{n}, each step = 5%)
Stroke:   0, 0.25, 0.5, 1, 2                   (rem-based: border-{px÷4})
Type:     12/16  14/20  16/24  18/28  24/32  30/36
Surface:  page · card · widget · muted · overlay · border · {destructive,warning,success}-bg
Text:     primary · secondary · tertiary · destructive · warning · success · url
Layout:   12 cols × 88 + 24 gutter + 24 offset · sidebar 296/48 · top-nav 80
Read:     left → right.  Act:  right.
One CTA per page. Tokens, not values. Components, not lookalikes. Screenshot, not assume.
```
