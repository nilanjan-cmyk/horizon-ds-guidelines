---
name: WPRemote · BlogVault · MalCare · Airlift — design.md
version: 1.0.0
last_synced: 2026-05-04
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
13. [Design taste — break from convention](#13-design-taste--break-from-convention)
14. [Versioning](#14-versioning)

---

## 1. How to use this file

**Order of operations for every AI agent invocation:**

```
1. READ  /design.md                                   ← this file
2. READ  /deliverables/Guideline_for_Product_Design.md  ← human-readable rules
3. READ  ~/.claude/.../memory/reference_horizon_ds_keys.md        ← component & variable keys
4. INVOKE Skill("figma-use") if any Figma write is required
5. PROCEED with §2 workflow appropriate to the request
```

**Stable IDs.** Every component below has both a `figma_node_id` (where applicable) and a `code_symbol`. Agents bidirectionally resolve via either.

**Token references** use DTCG aliasing: `{color.surface.card-background}`, `{spacing.gap.16}`, `{type.sm.normal.medium}`.

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

These are the only color tokens you should touch on UI surfaces.

```yaml
color:
  surface:
    page-background-content:    { $type: color, $description: "Page Content Area background" }
    page-background-backlight:  { $type: color, $description: "Outer page wrapper" }
    header-background:          { $type: color, $description: "Top Nav background" }
    navigation-background:      { $type: color, $description: "Sidebar background" }
    card-background:            { $type: color, $description: "Card / surface" }
    widget-background:          { $type: color, $description: "Widget tile" }
    muted-background:           { $type: color, $description: "Skeleton / muted region" }
    overlay-background:         { $type: color, $description: "Modal / Tooltip backdrop" }
    border:                     { $type: color, $description: "1 px stroke neutral" }
    destructive-background:     { $type: color }
    warning-background:         { $type: color }
    success-background:         { $type: color }
  typography:
    text-primary:               { $type: color }
    text-secondary:             { $type: color }
    text-tertiary:              { $type: color }
    text-white:                 { $type: color }
    text-black:                 { $type: color }
    text-destructive:           { $type: color }
    text-warning:               { $type: color }
    text-success:               { $type: color }
    text-url:                   { $type: color, $description: "Links + focus ring" }
  alpha:
    "10": { $type: color }; "20": { $type: color }; "30": { $type: color }
    "40": { $type: color }; "50": { $type: color }; "60": { $type: color }
    "70": { $type: color }; "80": { $type: color }; "90": { $type: color }
  charts:
    "Chart 1": { $type: color }; "Chart 2": { $type: color }; "Chart 3": { $type: color }
    "Chart 4": { $type: color }; "Chart 5": { $type: color }
```

### 3.2 Layout — radius

```yaml
radius:
  rounded_0: { $type: dimension, $value: "0px" }
  rounded_2: { $type: dimension, $value: "2px" }
  rounded_4: { $type: dimension, $value: "4px" }
  rounded_6: { $type: dimension, $value: "6px" }
  rounded_8: { $type: dimension, $value: "8px" }
  rounded_10: { $type: dimension, $value: "10px" }
  rounded_12: { $type: dimension, $value: "12px" }
  rounded_14: { $type: dimension, $value: "14px" }
  rounded_16: { $type: dimension, $value: "16px" }
  rounded_18: { $type: dimension, $value: "18px" }
  rounded_20: { $type: dimension, $value: "20px" }
  rounded_22: { $type: dimension, $value: "22px" }
  rounded_24: { $type: dimension, $value: "24px" }
  # … step of 2 up to rounded_80
  rounded_9999: { $type: dimension, $value: "9999px", $description: "Pill" }
```

### 3.3 Layout — spacing/gap

**Allowed values for any gutter / padding / gap / margin:** `0, 2, 4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200`. The Horizon Layout collection ships finer-grained tokens (`#gap_1, #gap_6, #gap_10, #gap_12, #gap_14, #gap_18, #gap_20, #gap_28, #gap_36, #gap_44, #gap_52, #gap_60, #gap_68`) — these exist for component internals already shipped by the library and **must not be reached for** in new layouts.

```yaml
spacing.gap:
  "0":   { $type: dimension, $value: "0px" }
  "2":   { $type: dimension, $value: "2px" }
  "4":   { $type: dimension, $value: "4px" }
  "8":   { $type: dimension, $value: "8px" }
  "12":  { $type: dimension, $value: "12px" }
  "16":  { $type: dimension, $value: "16px" }
  "24":  { $type: dimension, $value: "24px" }
  "32":  { $type: dimension, $value: "32px" }
  "40":  { $type: dimension, $value: "40px" }
  "48":  { $type: dimension, $value: "48px" }
  "56":  { $type: dimension, $value: "56px" }
  "64":  { $type: dimension, $value: "64px" }
  # … up through "200"
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

## 13. Design taste — break from convention

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

## 14. Versioning

```
schema:        1.0.0
last_synced:   2026-05-04
sync_command:  npx @horizon/sync --file UfHICFSU9PJl9OkE84mUk9
                 → regenerates tokens.css, tokens.json, components/index.json
                 → updates the keys block in §6.4
breaking_changes: |
  - 1.0.0 (2026-05-04): initial release derived from Horizon + v1 Guidelines.
```

When Horizon publishes a new version, run the sync command, review the diff, bump `last_synced`, commit. Treat `/design.md` as code.

---

## 15. Quick reference card (for humans skimming)

```
Spacing:  0 2 4 8 16 24 32 40 48 56 64 …       (multiples of 8; only 2/4 below)
Radius:   4 8 16 24 32 …                        (token radius/rounded_n)
Type:     12/16  14/20  16/24  18/28  24/32  30/36
Surface:  page · card · widget · muted · overlay · border · {destructive,warning,success}-bg
Text:     primary · secondary · tertiary · destructive · warning · success · url
Layout:   12 cols × 88 + 24 gutter + 24 offset · sidebar 296/48 · top-nav 80
Read:     left → right.  Act:  right.
One CTA per page. Tokens, not values. Components, not lookalikes. Screenshot, not assume.
```
