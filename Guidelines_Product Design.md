# Guidelines · Product Design

> **Source of truth:** Horizon Design System (Figma file `UfHICFSU9PJl9OkE84mUk9` — `⚙️ Horizon Design System ✨`).
> **Companion files:** `/design.md` (machine-readable bridge), `.claude/agents/product-designer.md` (Atlas agent).
> **Last reviewed:** 2026-05-11 · **Version:** 2.2.

This document supersedes all earlier guidelines. Nomenclature has been aligned with the actual Horizon DS token and component naming. Every previously-listed-but-undefined term has a defined rule set. The spacing scale has been simplified to **multiples of 8** (with `2` and `4` as the only sub-8 exceptions). Audit additions ship in §13 — every Horizon component now has a documented usage rule.

---

## 0. How to use this document

- **Designers** read top-to-bottom once, then keep §1 (Nomenclature) and §3 (Tokens) open while designing.
- **Developers** read §1 (Nomenclature) for the canonical names every prop/variable/CSS class should use, §2–§3 (Spacing & Tokens) for the exact values allowed in code, §4–§13 to learn each component's anatomy before importing or building it, and §14–§15 (Accessibility + Audit Checklist) as a PR template. Pair this file with `/design.md` for the machine-readable token map and the per-framework code recipes — `/design.md` is what your AI agent reads, this file is what *you* read.
- **AI agents** are pointed to `/design.md` instead — it is the YAML/JSON-shaped sibling of this file.
- **Reviewers** use §15 (Audit Checklist) as a punch list.

---

## 1. Nomenclature & Conventions

The terms below are **canonical**. Use them in all design files, code, comments, and PRs. Synonyms are flagged.

### 1.1 Layout primitives

| Term | Definition |
|---|---|
| **px** | Pixels. The only unit used in this product. |
| **Page** | The full viewport — the union of Top Nav + Sidebar + Page Content Area. |
| **Top Navigation** *(syn. Top Nav, Header)* | Fixed-height bar at the top of the page. 80 px. |
| **Sidebar** *(syn. Left Navigation)* | Fixed-width vertical column on the left. Open: 296 px. Collapsed: 48 px. |
| **Secondary Navigation** | Optional second-level navigation column inside the Page Content Area, typically 248 px. |
| **Breadcrumb** | Horizontal path inside the Top Nav. |
| **Page Content Area** | The scrollable region right of the Sidebar and below the Top Nav. |
| **Page Header** | The non-scrollable strip at the top of the Page Content Area: Page Icon + Title + Subtext + (optional Search) + Button Group. |
| **Page Footer** | Optional bottom-anchored strip — pagination, save bar, summary. |
| **Section** | A horizontal slab inside the Page Content Area. Max 3 per page. |
| **Container** | Any bounded region that groups elements; has its own padding and (optionally) background. |
| **Layout Grid** | The 12-column grid: 88 px column · 24 px gutter · 24 px L/R offset (= 1392 px content). |
| **Gutter** | The 24 px horizontal space between two grid columns. |
| **Column** | One of the 12 vertical strips of the layout grid. |

### 1.2 Page header anatomy

| Term | Definition |
|---|---|
| **Page Icon** | 32×32 px icon to the left of the title. |
| **Title** | Page-level h1, `type/2xl/tight/semibold` (24 px). |
| **Subtext** | Description below the Title, `type/sm/normal/regular` (font-size 14). |
| **Title-Subtext Container** | Vertical group of Title + 4 px gap + Subtext. |

### 1.3 Components & elements

| Term | Definition |
|---|---|
| **Card** | A bounded surface (`surface/card-background`) with 16 px padding, 8 px radius (default) / 12 px (large), optional 1 px border (`surface/border`). |
| **Band** | A full-width horizontal strip used to separate sections — typically tinted with `surface/muted-background`. |
| **Accordion** | A vertically-stacked collapsible disclosure. Header row 48 px min-height; body inherits Card padding rules when expanded. |
| **Step-Wizard** *(syn. Stepper)* | A horizontal numbered/labelled progression. See Horizon `Stepper` component. |
| **Divider** | 1 px horizontal or vertical line in `surface/border`. Padding from neighbours: 4 / 8 / 16 / 24 / 32 px. |
| **Stroke / Outline** | The 1 px border on a component. Use `surface/border` for neutral, `typography/text-destructive` for error states. |
| **Form** | A container for collecting input. Two variants: Form (Single) and Form (Double). |
| **Form Header Container** | The Form's Page-Header analogue — Form Icon + Form Title + Form Subtext. Fixed width 520 px. |
| **Form Function Container** | The fields-and-buttons body of a Form. 16 px padding, 16 px vertical rhythm. |
| **Form Title Text** / **Form Subtext** / **Form Icon** | Self-evident; sized like Page Title / Subtext / Icon. |
| **Pill** | A small, rounded label. `radius/rounded_9999`. Variants: Neutral, Success, Informative, Warning, Destructive (sizes Small / Medium). |
| **Pill Button** | A Pill that is also clickable — has hover/active states. |
| **Dropdown** | Single-select Input Field with a chevron and an attached menu. |
| **Multi-select** | Dropdown variant that accepts multiple values, displayed as removable Pills inside the field. |
| **Input Field** | The Horizon `Input Fields/WPR` component set. |

### 1.4 Tables

| Term | Definition |
|---|---|
| **Table** | The full table component including header, rows, and footer. |
| **Table Header** *(syn. Table Header Row)* | The top row of the Table — column labels, sort, optional checkbox. 48 px fixed height. |
| **Table Row** *(syn. Table Menu Row)* | A data row. 48 px min-height. |
| **Table Cell** | One unit of a Row or Header. Horizon `Table/Cell` component (variants: Default, Actions, With Checkbox). |
| **Table Footer** | The bulk-action toolbar that appears when rows are selected. Horizon `Table/Footer Bulk 3` / `Table/Footer Pagination`. |

### 1.5 Navigation menus

| Term | Definition |
|---|---|
| **Sidebar Header** | Top section of the open Sidebar — logo / workspace switcher. |
| **Parent Menu Item** | A top-level Sidebar item; can expand to reveal Child Menu Items. |
| **Child Menu Item** | A nested item under a Parent. Indented 16 px. |
| **Menu Item** | Any clickable row in any menu (Sidebar, Dropdown, Mega Menu). |

### 1.6 Overlays

| Term | Definition |
|---|---|
| **Modal** | Centered dialog that blocks interaction with the page underneath. Horizon `Modal` component. |
| **Dialog Box** | A small Modal variant for confirmations. Horizon `Dialog Box`. |
| **Drawer** | Side-anchored sliding panel (right by default). Horizon `Drawer`. |
| **Sheet Slider** | Bottom-anchored sliding panel (mobile primarily). Horizon `Sheet Slider`. |
| **Tooltip** | Small hover-triggered label. Horizon `Tooltip`. |
| **Toast** | Transient bottom/top notification. Horizon `Toast`. |
| **Popover / Menu** | Click-triggered floating panel. Horizon `Menu`. |

---

## 2. General rules

1. **Spacing scale (multiples of 8):** the only allowed values for any **gutter, padding, gap, or margin** are `0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80` and all multiples of 8 up to 240. Tokens use rem-based naming (1 rem = 4 px): `spacing_gap/gap_{rem}` — e.g. `gap_4` = 16 px, `gap_6` = 24 px. The two sub-8 exceptions (`2`, `4`) exist only for hairline gaps inside dense components (e.g. Title-Subtext 4 px, icon-text 4 px micro-gap).
2. **Padding & spacing are always even numbers.**
3. **The Page is composed of three regions:** Top Nav, Sidebar, and Page Content Area.
4. **Read on the left, act on the right.** Primary actions live in the right side of any container.
5. **One primary CTA per Page.** A Page that wants two primary CTAs is two Pages.
6. **Tokens, not values.** Never write `#000` or `gap: 12` directly — use a Horizon variable.
7. **Components, not look-alikes.** Never simulate a Horizon component with raw frames — instantiate the real component.
8. **Dark mode is a first-class citizen.** Every visual decision is verified in both Light and Dark Mode collections.

---

## 3. Tokens (read this before designing anything)

Full machine-readable list lives in `/design.md` §3. The categories are:

- **`Mode` collection** (35 vars, modes: Light / Dark) — semantic tokens. *Use these on UI surfaces.*
  - `surface/page-background-content`, `surface/page-background-backlight`, `surface/header-background`, `surface/navigation-background`, `surface/card-background`, `surface/widget-background`, `surface/muted-background`, `surface/overlay-background`, `surface/border`
  - `surface/destructive-background`, `surface/warning-background`, `surface/success-background`
  - `typography/text-primary`, `typography/text-secondary`, `typography/text-tertiary`, `typography/text-white`, `typography/text-black`, `typography/text-destructive`, `typography/text-warning`, `typography/text-success`, `typography/text-url`
  - `alpha/10` … `alpha/90`
  - `charts/Chart 1` … `charts/Chart 5`
- **`System Colours`** (333 primitives) — the raw palette. *Do not use directly on UI; alias via Mode.*
- **`Layout`** (358+ vars) — Rem-based naming (1 rem = 4 px):
  - `radius/rounded_{rem}` — e.g. `rounded_2` = 8 px, `rounded_0,5` = 2 px, up to `rounded_20` (80 px) + `rounded_9999` (pill).
  - `spacing_gap/gap_{rem}` — e.g. `gap_4` = 16 px, `gap_0,5` = 2 px, up to `gap_60` (240 px).
  - `opacity/opacity_{0..20}` — sequential: `opacity_0` = 0%, `opacity_1` = 5%, …, `opacity_20` = 100%.
  - `stroke-width/border-{rem}` — e.g. `border-0,25` = 1 px, `border-0,5` = 2 px, `border-1` = 4 px, `border-2` = 8 px.
  - **Use only the multiples-of-8 subset for gap/padding (see §2).** Radius may use any token in the radius set.

### 3.1 Allowed radius values

`0, 2, 4, 8, 16, 24, 32, 40, 48, 56, 64, 80, 9999 (pill)`. Use `radius/rounded_{rem}` — e.g. `rounded_2` = 8 px, `rounded_4` = 16 px, `rounded_0,5` = 2 px. (Horizon ships finer-grained radius tokens such as 6/10/12 — these exist but are reserved for component internals already defined by the library; do not reach for them in new layouts.)

### 3.2 Allowed spacing values

See §2 rule 1. Use `spacing_gap/gap_{rem}` (1 rem = 4 px).

### 3.3 Type ramp

Naming pattern: `type/{size}/{lineHeight}/{weight}` — e.g. `type/sm/normal/medium`.
Family: **Inter**. Weights: `regular | medium | semibold | bold | italic | underlined | strikethrough`.
Sizes (font-size · line-height-tight · line-height-normal):

| Size token | Font size | Tight LH | Normal LH |
|---|---|---|---|
| `xs` | 12 | 12 | 16 |
| `sm` | 14 | 14 | 20 |
| `base` | 16 | 16 | 24 |
| `lg` | 18 | 18 | 28 |
| `xl` | 20 | 20 | 28 |
| `2xl` | 24 | 24 | 32 |
| `3xl` | 30 | 30 | 36 |
| `4xl` | 36 | — | — |
| `5xl` | 48 | — | — |
| `6xl` | 60 | — | — |
| `7xl` | 72 | — | — |

> Font-size and line-height come from the published type ramp and are **not** subject to the §2 spacing rule. Spacing/gap/padding values *between* and *around* text are.

Default mappings:
- **Page Title** → `type/2xl/tight/semibold`
- **Section Title** → `type/lg/tight/semibold`
- **Card Title** → `type/base/tight/semibold`
- **Body** → `type/sm/normal/regular`
- **Subtext / helper** → `type/xs/normal/regular` with `typography/text-secondary`
- **Button (Primary)** → `type/sm/tight/medium`

---

## 4. Screen Layout

1. The screen layout follows a **12-column grid**: each column **88 px**, gutter **24 px**, L/R offset **24 px** (total content width 1 392 px on a 1 440 px frame).
2. Spacing rules apply **inside components and elements**, not just at the page level.
3. All **major** components on the page are left-aligned.
4. Elements **inside** a component are aligned per design — usually right-aligned for actions.
5. **24 px** consistent spacing from screen left and bottom.
6. **24 px minimum** spacing from screen right (max varies with responsive max-width).

---

## 5. Top Navigation

1. Padding: **16 px left**, **24 px right**, **24 px top & bottom**.
2. **Fixed height: 80 px**.
3. Width is responsive based on Sidebar collapsed/open state.
4. **8 px** between collapse icon and Breadcrumb.
5. Account-action container is right-aligned with **16 px** internal spacing.

## 6. Sidebar (Left Navigation)

1. Two states: **Open (296 px)**, **Collapsed (48 px)**.
2. Three sections: **Sidebar Header** → **Parent Menu Items** → **Child Menu Items**.
3. **24 px** L/R padding (Open state).
4. Parent ↔ Child indentation: **16 px**.

## 7. Page Header

1. Not scrollable.
2. Padding: **16 px** top, **24 px** L/R.
3. Composition (left → right): **Page Icon (32×32) → Title-Subtext Container → (Search bar) → Button Group**.
4. Page Icon ↔ Title-Subtext container: **16 px**.
5. Title ↔ Subtext: **4 px** vertical.
6. Title-Subtext ↔ Search bar: **16 px**.
7. Search bar ↔ Button Group: **16 px**.
8. Button Group: right-aligned, gap **16 px** between buttons. Primary progressive button is the rightmost.
9. Search bar size is dynamic; presence is conditional on page function.

## 8. Page Content Area

1. Scrollable.
2. **16 px** top and left padding.
3. Left-aligned.
4. Max content width caps at the screen layout's 24 px right padding boundary.
5. **Max 3 horizontal Sections** per page.
6. **Section 1 (left): 248 px fixed width.**
7. Sections 2 & 3: dynamic width.

---

## 9. Button Group

1. **Primary progressive button is rightmost** (large size, active state).
2. Bulk-action stacks add buttons on the **left** in priority order.
3. Right-to-left typology for bulk actions: **Primary → Outline → Secondary → Icon (No Fill)**.
4. Standard 2-button group right-to-left: **Primary → Secondary**.
5. **Radio buttons** for absolute selection or ≤ 5 options.
6. **Checkboxes** for multi-select.
7. Button gap inside a group: **16 px**.

## 10. Divider

1. No min/max width — follows the parent container.
2. Thickness **1 px**.
3. Color: `surface/border`.
4. Padding from neighbours: **4 / 8 / 16 / 24 / 32 px**.

---

## 11. Tables

### 11.1 Structure

1. Header row → menu rows → pagination → optional footer.
2. Pagination renders **outside** the Table container, sticky-right.
3. Table container extends to the bottom of the available space regardless of row count.
4. Table is responsive to Sidebar / Secondary Nav state.

### 11.2 Table Header Row

1. **Fixed height 48 px**.
2. Checkbox cell: **16 px** padding all sides.
3. Header text cells: **16 px** padding all sides.
4. Cell width is determined by the longest cell content in the column below.
5. Header may switch to a **toolbar** mode (left-message / right-buttons) for bulk actions.

### 11.3 Table Row (Menu Row)

1. **Min height 48 px**.
2. Padding **16 px** all sides per cell.
3. Cell content can be: text, icon, button, pill, pill-button, link, or any combination.

### 11.4 Table Footer

1. Appears on row selection.
2. Acts as a bulk-action toolbar.
3. Format: left-aligned message · right-aligned button set.

---

## 12. Forms

### 12.1 Form (Single)

1. Top-left aligned within Page Content Area or its Sections.
2. Scrollable.
3. **Max-width 520 px**.
4. Combination of 2-column and 1-column layouts.
5. May start with an **infobox**, full-width within the Form (520 px).
6. Infobox title ↔ subtext: **4 px**. Icon ↔ title-subtext: **16 px**.
7. 2-column input rows use **16 px** column gap.
8. Radio-button selection groups are wrapped in a Container.
9. Form ends with a Button Group: Primary + Secondary.

### 12.2 Form (Double)

1. Scrollable.
2. Top-left aligned.
3. Form Header Container is **outside and above** the Form Function Container.
4. Header contains: Form Icon, Form Title, Form Subtext.
5. Icon ↔ Title: **8 px** horizontal, in a nested container.
6. Subtext sits below the icon-title nested container with **4 px** vertical spacing.
7. Header has **no internal padding**, fixed width **520 px**.
8. Header ↔ Function Container: **24 px**.
9. Function Container padding: **16 px** all sides.
10. Components inside Function Container: **16 px** vertical rhythm.

---

## 13. Component reference (every Horizon component)

This section documents every component page in the Horizon DS. Each entry covers size tiers, padding/gap, variants, states, token bindings, typography, and interaction patterns.

> **Token naming convention reminder:** `spacing/N` = N×4 px, `radius/rounded_N` = N×4 px, `border-N` = N×4 px stroke.

### 13.0 Button

```yaml
size_tiers:
  sm: 24  # height
  md: 32
  lg: 40
  xl: "48 (mobile only)"

icon_only_sizes:
  sm: "24x24"
  md: "32x32"
  lg: "40x40 (square)"

type_variants:  # 10 total
  - Primary
  - Secondary
  - Outlined
  - Ghosted
  - Destructive
  - Link
  - Icon
  - Indicator
  - Special
  - Loading

states:  # 8 total
  - Default
  - "Active (Secondary only)"
  - Hover
  - Pressed
  - Disabled
  - Loading
  - "Primary Action (Ghosted)"
  - "Inverted (Indicator)"
focus_note: "No explicit Focus variant — apply 2 px ring `surface/border` programmatically."

additional_sub_variants:  # 12 total
  - Nil
  - Notification
  - "Mobile Full Width (361 w)"
  - EMbed
  - Buffer
  - Mobile Primary
  - Count
  - Clear
  - Link
  - Inline
  - Shadow
  - Highlight

device_contexts:
  - "Responsive (SM/MD/LG)"
  - "Mobile (XL only)"
  - "Mobile Responsive (XL + Notification)"

padding_horizontal:
  sm: 8
  md: "12-16"
  lg: 16
  xl: 24
  icon_label_gap: "spacing/2 = 8"

border_radius: "radius/rounded_2 = 8 (all sizes)"

typography: "type/sm/tight/medium"  # 14/14/500, for all sizes

token_map:
  primary:
    bg: "BlogVault Brand/bv-emerald-900 (#064e3b)"
    text: "typography/text-white"
    shadow: "shadow/sm"
  secondary:
    bg: "surface/card-background"
    border: "1 px surface/border"
    text: "typography/text-primary"
  outlined:
    bg: transparent
    border: "1 px surface/border"
    text: "typography/text-primary"
  ghosted:
    bg: transparent
    border: none
    text: "typography/text-primary"
  destructive:
    bg: "typography/text-destructive (#dc2626)"
    text: "typography/text-white"
  link: "Same as Ghosted but underlined on hover. Container variant (full height) vs Inline (text-height 16-20 only)."

disabled: "opacity/opacity-50 = 50%, no pointer events"
```

### 13.0b Input Fields

```yaml
size_tiers:
  md: "36 h (height/h-9)"
  sm: "32 h (height/h-8)"
default_width: 320  # px, fill-container in forms

types: [Input, Search, Dropdown, ColourPicker, TextBox]

states: [Default, Typing, Filled, Selected, Disabled, Error]

border_radius: "border radius/md = 6"
background: "surface/card-background"  # base/card = #ffffff

border:
  default: "1 px surface/border (#e4e4e6)"
  error: "typography/text-destructive"
  focus: "2 px ring BlogVault Brand/bv-emerald-900"

padding:
  horizontal: "px-3 = 12"
  vertical: "py-2 = 8"

typography:
  placeholder: "type/sm/normal/regular"  # 14/20/400, in typography/text-secondary
  filled: "type/sm/normal/regular"  # 14/20/400, in typography/text-primary

label:
  style: "type/sm/tight/medium"  # 14/14/500
  color: "typography/text-primary"
  gap_below: "6 (spacing/1-5)"

helper_text:
  style: "type/xs/normal/regular"  # 12/16/400
  color: "typography/text-secondary"
  gap_above: 4

error_text: "Same as helper but typography/text-destructive"

left_icon:
  size: "16x16"
  color: "typography/text-secondary"
  focus_shadow: "shadow/sm"
```

### 13.0c Accordion

```yaml
outer_wrapper:
  bg: "surface/card-background"
  radius: "radius/rounded_2 = 8"
  shadow: "shadow/sm"

item_min_height: 48  # px
item_padding: "16 (spacing/4) all sides"

gap_between_items: "0 (flush, 1 px surface/border bottom separator)"

title:
  style: "type/base/normal/regular"  # 16/24/400
  color: "typography/text-primary"

body:
  style: "type/sm/normal/regular"  # 14/20/400
  color: "typography/text-secondary"
  gap_from_title: "spacing/2 = 8"

chevron:
  size: "16x16"
  color: "typography/text-secondary"
  animation: "rotates 180 deg on expand (200 ms ease-out)"

variants: ["Single expand (only one open)", "Multi expand"]
states: [Collapsed, Expanded, Disabled]
```

### 13.1 Card

```yaml
background: "surface/card-background"
border: "1 px surface/border (optional)"

radius:
  default: "radius/rounded_2 = 8"
  large: "border radius/xl = 12"
  # Correction: previous docs said rounded_16 for large — actual Figma value is 12.

padding:
  default: 16  # px
  feature_card: 24

title:
  style: "type/sm/tight/medium"  # 14/14/500
  optional_icon: "16x16 typography/text-secondary"
  optional_action: "right-aligned"

body:
  style: "type/sm/normal/regular"  # 14/20/400
  color: "typography/text-secondary"
  gap_from_title: 16  # px

shadow:
  default: "shadow/base"
  interactive_hover: "shadow/lg + scale(1.01) 200 ms"

header_min_height: "36 px (height/h-9)"
disabled: "opacity/opacity-50"
```

### 13.2 Modal

```yaml
width_tiers:
  sm: 400
  md: 560
  lg: 720
  xl: 960

padding: "24 px all sides"

composition: "Header (Title + close) -> Body -> Footer (Button Group right-aligned)"

backdrop:
  bg: "surface/page-background-content"
  opacity: "alpha/80"
  # Correction: previous docs said alpha/60 — actual is alpha/80.

radius: "rounded-3xl = 24"
# Correction: previous docs said rounded_16 — actual is 24.

min_vertical_margin: 48  # px from viewport edge

typography:
  title: "type/lg/normal/medium"  # 18/28/500
  body: "type/sm/normal/regular"  # 14/20/400

close_button:
  size: "36x36 icon-only (width/w-9)"
  shadow: "Box Shadow/shadow-lg"

dividers: "1 px surface/border between header/body and body/footer"

body_overflow: "overflow-y: auto, max-height = viewport - 96 - header - footer"

animation: "scale 0.95 -> 1.0 + fade, 200 ms ease-out"
```

### 13.3 Dialog Box (confirmation)

```yaml
width: 400  # px
padding: "24 (spacing/6)"
radius: "rounded-3xl = 24"
shadow: "Box Shadow/shadow-lg"

typography:
  title: "type/lg/normal/semibold"  # 18/28/600
  body: "type/xs/normal/regular"  # 12/16/400
  body_color: "typography/text-secondary"

gap_title_to_body: "spacing/2 = 8"
gap_body_to_buttons: "spacing_gap/gap_6 = 24"

buttons: "Single primary (destructive for delete confirms) + secondary button, right-aligned"

close_icon: "None — dismiss via button only"
animation: "Same as Modal"
```

### 13.4 Drawer

```yaml
anchor: "Right (default) or Left"

width_tiers: [400, 560, 720]

header:
  height: 64  # px
  padding: "spacing/4 = 16 all around"
  # Correction: previous docs said 24 L/R, 16 T/B — actual is 16 uniform.
  typography: "type/lg/normal/medium"  # 18/28/500
  close_button: "32x32 icon-only, top-right"

body:
  scrollable: true
  padding_lr: "spacing/4 = 16"
  padding_tb: "spacing/3 = 12"

footer:
  sticky: true
  min_height: 56
  padding: "spacing/4 = 16"
  dividers: "1 px surface/border"

shadow: "shadow/sm + shadow/base layered"
backdrop: "surface/foreground at 20% opacity"
animation: "slide from edge, 200 ms ease-out"
```

### 13.5 Sheet Slider (mobile)

```yaml
anchor: bottom
max_height: "80vh"
top_radius: "rounded-3xl = 24 (consistent with Modal/Drawer)"

drag_handle:
  size: "32x4 px centered at top"
  opacity: "opacity/opacity-70"

backdrop:
  same_as: "Modal (surface/page-background-content at alpha/80)"
  shadow: "shadow/lg"

header:
  typography: "type/lg/normal/semibold"  # 18/28/600
  close_button: "36 (height/h-9)"

body:
  scrollable: true
  padding_h: "spacing/4 = 16"
  padding_v: "spacing/6 = 24"
  max_width: "max-w-sm = 384 for form content"

animation: "slide up from bottom, 200 ms ease-out"
```

### 13.6 Tabs

```yaml
default_style: underline

padding:
  horizontal: "12 px (spacing/3)"
  # Correction: previous docs said 16 H — actual is 12.
  vertical: "8 px (spacing/2)"

active:
  color: "typography/text-primary"
  border_bottom: "2 px Flat/emerald/emerald-600 (#059669)"
  # Correction: previous docs said underline color typography/text-primary — actual is emerald-600.

inactive: "typography/text-secondary"
hover: "typography/text-primary"

gap_between_tabs: 0

variants: [underline, pill, segmented]

pill_variant:
  padding_h: "spacing/2 = 8"
  padding_v: "spacing/1 = 4"
  active_bg: "surface/card-background + shadow/sm"
  container_radius: "radius/rounded_2 = 8"

tab_height: "content-driven, typically 40 px"
icon_in_tab:
  size: "16x16"
  gap: "spacing_gap/gap_0,5 = 2"
```

### 13.7 Tooltip

```yaml
padding:
  horizontal: "px-3 = 12"
  # Correction: previous docs said 8 H / 4 V — actual is 12 / 6.
  vertical: "p-1,5 = 6"

radius: "border radius/lg = 8"
# Correction: previous docs said radius/rounded_4 = 16 — actual is 8.

background: "Flat/zinc/zinc-950 (#09090b)"
# Correction: previous docs said surface/overlay-background + alpha/90 — actual is solid zinc-950.

text_color: "typography/text-white"
typography: "type/xs/normal/medium"  # 12/16/500

triangle_marker:
  size: 8  # px
  positions: "top / bottom / left / right"
  orientations: "left / center / right"

shadow: "Box Shadow/shadow (base)"
max_width: 320  # px

delays:
  show: 200  # ms
  hide: 0
```

### 13.8 Toast

```yaml
width: "360 px (flexible)"
padding: 16  # px
radius: "border radius/lg = 8"
shadow: "shadow/lg"

background: "surface/card-background"
border: "1 px surface/border"

typography:
  title: "type/sm/normal/semibold"  # 14/20/600
  title_color: "typography/text-black"
  body: "type/sm/normal/regular"  # 14/20/400
  body_color: "typography/text-secondary"

close: "24 px icon-only, top-right"

animation: "slide in 240 ms, auto-dismiss 4 s (default)"
stack_offset: 8  # px

variants:
  success:
    icon_color: "typography/text-success"
    left_accent: "3 px Flat/emerald/emerald-700"
  info: {}
  warning:
    icon_color: "typography/text-warning"
  destructive:
    icon_color: "typography/text-destructive"

icon:
  size: "24x24 (width/w-6)"
  alignment: left
```

### 13.9 Empty State

```yaml
alignment: "Centered within the Page Content Area or Card"

composition:
  - "Icon 48x48"
  - "16 px gap"
  - "Title: type/lg/tight/semibold"
  - "4 px gap"
  - "Subtext: type/sm/normal/regular, typography/text-secondary"
  - "24 px gap"
  - "CTA Button"

max_width: 360  # px for the text block
```

### 13.10 Skeleton

```yaml
background: "Flat/zinc/zinc-200 (#e4e4e7)"
pulse_animation: "Flat/zinc/zinc-200 <-> surface/card-background, 1400 ms ease-in-out"

radius:
  text_lines: "border radius/md = 6"
  avatar: "border radius/full = 9999"
  card_block: "border radius/xl = 12"

text_line_height: "16 px (height/h-4)"
text_line_gap: "spacing/2 = 8"
avatar_placeholder: "48x48 circle"

dimension_tolerance: "+/-4 px of the real content"
```

### 13.11 Search bar

```yaml
default_width: "320 px (Page Header), 100% on mobile"
height: "40 px (Medium Input Field)"

left_icon: "magnifying glass 16x16"
right_icon: "clear x when filled"

placeholder_color: "typography/text-tertiary"
```

### 13.12 Pill / Pill Button

```yaml
sizes:
  sm:
    height: 24
    padding_h: 8
  md:
    height: 32
    padding_h: 16

radius: "border radius/full = 9999"

typography:
  sm: "type/xs/normal/medium"  # 12/16/500
  md: "type/sm/normal/medium"  # 14/20/500

icon:
  sm: "8 (width/w-2)"
  md: "16 (width/w-4)"
  gap_to_text: "spacing/1 = 4"

token_map:
  neutral:
    bg: "Flat/zinc/zinc-100"
    text: "typography/text-primary"
    border: "surface/border"
  success:
    bg: "surface/success-background (#ecfdf5)"
    text: "typography/text-success"
  informative:
    bg: "Flat/sky/sky-50"
    text: "Flat/sky/sky-600"
  warning:
    bg: "surface/warning-background (#fffbeb)"
    text: "typography/text-warning"
  destructive:
    bg: "surface/destructive-background (#fef2f2)"
    text: "typography/text-destructive"

pill_button:
  hover: "alpha/10 darken"
  pressed: "alpha/20 darken"
  outlined_shadow: "shadow/md"
```

### 13.13 Breadcrumb

```yaml
location: "Inside the Top Nav"
typography: "type/sm/normal/medium"  # 14/20/500

separator:
  icon: "chevron-right 16x16"
  color: "typography/text-secondary"
  # Correction: previous docs said typography/text-tertiary.

item_gap: 8  # px
active_item_color: "typography/text-primary (last item)"
earlier_items_color: "typography/text-secondary"

hover: "Flat/emerald/emerald-700 underline"
link_style: "type/sm/tight/regular"  # 14/14/400, no underline until hover

home_icon: "20x20 (width/w-5)"
truncation: "Middle items collapse into ... overflow menu when total width > parent"
```

### 13.14 Avatar

```yaml
sizes:
  xs: 16
  sm: 24
  md: 32
  lg: 40
  xl: 48
  2xl: 64

shape:
  circle: "border radius/full = 9999"
  square: "radius/rounded_2 = 8"

content: "photo, initials (1-2 chars), or icon fallback (typography/text-tertiary)"

initials:
  bg: "Flat/zinc/zinc-200"
  text: "typography/text-primary"
  typography_per_size:
    xs: "type/micro-8"
    sm: "type/micro-10"
    md: "type/xs/normal/medium"
    lg: "type/sm/normal/medium"
    xl: "type/base/normal/medium"
    2xl: "type/lg/normal/medium"

group:
  overlap: "-8 px"
  max_visible: 4
  counter_bg: "Flat/zinc/zinc-100"
  counter_typography: "type/xs/normal/medium"

border: "1 px surface/border when stacked"

online_indicator:
  size: 8  # px
  color: "Flat/emerald/emerald-500"
  position: bottom-right
```

### 13.15 Badge (vs Pill)

```yaml
usage: "Use Badge for state markers attached to another element. Use Pill as a stand-alone label."

sizes:
  dot: 8
  sm: 16
  md: 24

radius:
  sm_md: "border radius/md = 6"
  dot: "border radius/full"

token_map:
  information:
    bg: "Flat/sky/sky-50"
    text: "Flat/sky/sky-600"
  warning:
    bg: "surface/warning-background"
    text: "typography/text-warning"
  success:
    bg: "surface/success-background"
    text: "typography/text-success"
  destructive:
    bg: "surface/destructive-background"
    text: "typography/text-destructive"

typography:
  sm: "type/xs/normal/semibold"  # 12/16/600
  md: "type/xs/tight/semibold"

padding:
  sm: "spacing/0-5 = 2 H"
  md_h: "spacing/1 = 4"
  md_v: "spacing/0-5 = 2"
icon_size_md: 24

position: "top-right of host with -4 px outset"
shadow: "shadow/base on outlined variants"
```

### 13.16 Stepper (Step-Wizard)

```yaml
orientation: "Horizontal (default) or vertical"

step_circle: 24  # px
gap_circle_to_label: 8  # px
gap_between_steps: 24  # px

circle_colors:
  pending: "Flat/zinc/zinc-300"
  current: "BlogVault Brand/bv-emerald-900"
  complete: "BlogVault Brand/bv-emerald-700"
  error: "typography/text-destructive"

circle_text:
  current_complete: "typography/text-white"
  pending: "typography/text-primary"
  number_style: "type/xs/normal/medium"  # 12/16/500

connector_line:
  thickness: "1 px"
  incomplete: "surface/border"
  complete: "BlogVault Brand/bv-emerald-700"

label:
  style: "type/xs/tight/regular"  # 12/12/400
  color: "typography/text-secondary"
  active_style: "type/xs/normal/medium"

states: [pending, current, complete, error]
vertical_gap: "spacing_gap/gap_2 = 8"
```

### 13.17 Indicator (status dot)

```yaml
sizes: [8, 16, 24]  # px

variants: [Default, "Pulse (animated)", Step]

colors:
  success:
    bg: "Flat/emerald/emerald-100"
    fg: "typography/text-success"
  destructive:
    bg: "surface/destructive-background"
    fg: "typography/text-destructive"
  warning:
    bg: "surface/warning-background"
    fg: "Flat/amber/amber-600"
  neutral:
    bg: "Flat/zinc/zinc-200"
    fg: "typography/text-primary"

pulse_animation: "scale 1.0 -> 1.4 -> 1.0, 2000 ms infinite"

label_style: "type/xs/normal/regular"  # 12/16/400
step_number_style: "type/xs/tight/regular"

usage: "Use inline beside text to convey state. Always paired with an aria-label."
```

### 13.18 Notification (Running Task tray)

```yaml
anchor: "top-right of Top Nav"
width: 400  # px
shadow: "Box Shadow/shadow-lg"
radius: "radius/rounded_4 = 16"

row:
  height: 64  # px
  padding: 16
  border: "1 px surface/border bottom"
  hover_bg: "Flat/zinc/zinc-100"

typography:
  title: "type/sm/tight/medium"  # 14/14/500
  subtext: "type/xs/tight/regular"  # 12/12/400
  subtext_color: "typography/text-secondary"
  time: "type/xs/tight/regular"
  time_color: "typography/text-tertiary"

status_icon: "24x24, color per variant"
composition: "icon -> title + subtext -> action / dismiss"
```

### 13.19 Pre-Checks

```yaml
description: "Vertical checklist used in environment / readiness flows"

row:
  min_height: 48  # px
  gap_between_rows: 16

states:
  pending: "grey dot"
  running: "spinner replacing dot"
  success: "check Flat/emerald/emerald-700"
  error: "cross typography/text-destructive + retry button"

status_icon: "24x24"

typography:
  label: "type/sm/normal/regular"  # 14/20/400
  label_color: "typography/text-primary"
  subtext: "type/xs/normal/regular"
  subtext_color: "typography/text-secondary"

blur_backdrop: "backdrop-blur/3xl = 64 px behind the checklist overlay"

container:
  bg: "surface/card-background"
  radius: "radius/rounded_2 = 8"
  padding: 24
  shadow: "shadow/lg"
```

### 13.20 Calendar / Date Picker

```yaml
cell:
  size: "32x32 px"
  radius: "radius/rounded_2 = 8"
  day_grid_gap: 0

header:
  height: 48  # px
  padding: 16
  month_year_style: "type/sm/tight/semibold"  # 14/14/600
  day_labels_style: "type/xs/tight/regular"  # 12/12/400
  day_labels_color: "typography/text-secondary"

nav_arrows:
  size: "16x16"
  gap_from_month_text: "spacing/2 = 8"

today: "1 px ring surface/border"

selected:
  bg: "BlogVault Brand/bv-emerald-900"
  text: "typography/text-white"

range_middle_bg: "Flat/zinc/zinc-100"

disabled: "opacity/opacity-50, no pointer events"
popover_shadow: "shadow/base"

variants: ["single date", "range", "multi"]
```

### 13.21 Command Search (⌘K palette)

```yaml
width: 640  # px
max_height: 480
radius: "border radius/lg = 8"
shadow: "shadow/md"
border: "1 px surface/border"

backdrop: "Same as Modal"

input:
  height: "40 px (height/h-10)"
  search_icon: "16x16 typography/text-secondary"

row:
  height: 40  # px
  padding_lr: 16
  gap: "8 icon -> label -> keybind"
  active_bg: "Flat/zinc/zinc-100"
  icon: "16x16"

section_headers:
  style: "type/xs/tight/medium"
  color: "typography/text-tertiary"
  padding_v: 8

keybind:
  style: "type/xs/normal/regular"
  color: "typography/text-secondary"

footer:
  height: 32
  hint_chips: "up/down, enter, esc"

empty_state:
  style: "type/sm/normal/regular"
  color: "typography/text-secondary"
  alignment: centered
```

### 13.22 Carousel

```yaml
scroll: "snap-x"

item_gap:
  default: 16  # px
  large: 24

container_radius: "border radius/xl = 12"

arrow:
  size: "40x40"
  bg: "surface/card-background"
  border: "surface/border"
  radius: "border radius/full = 9999"
  shadow: "shadow/sm"
  icon: "16x16 typography/text-black"

dots:
  size: 8  # px
  gap: 8
  active: "typography/text-black, opacity/opacity-100"
  inactive: "Flat/zinc/zinc-200, opacity/opacity-50"

peek: "Always show 1 partial peek of the next item to signal scrollability"
```

### 13.23 Range Slider

```yaml
track:
  height: "6 px (height/h-1,5)"
  bg: "Flat/zinc/zinc-200"
  fill: "BlogVault Brand/bv-emerald-900"
  radius: "border radius/full"

thumb:
  size: "16x16 (width/w-4, height/h-4)"
  shape: circle
  bg: "Flat/base/base-white"
  shadow: "shadow/base"
  border: "1 px Flat/zinc/zinc-200"

step_ticks: "8 px height on the track when withMarks=true"

variants: ["single", "dual handle"]
```

### 13.24 Switch

```yaml
track_sizes:
  sm: "24x16"
  md: "36x20"

thumb:
  sm: 12  # px
  md: 16
  inset: 2
  bg: "surface/card-background"
  shadow: "shadow/lg"

track_radius: "border radius/full = 9999"

colors:
  off: "Flat/zinc/zinc-200 (#e4e4e7)"
  on: "BlogVault Brand/bv-emerald-900 (#064e3b)"
  # Correction: previous docs said off = surface/muted-background, on = typography/text-primary.

animation: "160 ms ease-out toggle"
disabled: "opacity/opacity-50"

focus: "2 px ring BlogVault Brand/bv-emerald-900 offset 2 px"

label:
  style: "type/sm/tight/medium"  # 14/14/500
  gap: "spacing/2 = 8"
```

### 13.25 Radio Button

```yaml
sizes:
  sm: 16  # px
  md: 24

outer_ring: "1 px surface/border"

inner_dot:
  sm: 8
  md: 12

selected_ring: "BlogVault Brand/bv-emerald-900 (#064e3b)"
inner_dot_color: "Flat/base/base-white"
# Correction: previous docs said typography/text-primary.

hover: "border darkens to Flat/zinc/zinc-300"
focus: "2 px ring offset 2 px"
focus_shadow: "shadow/base"

disabled: "surface/muted-foreground ring + dot, opacity/opacity-50 on label"

label:
  primary: "type/sm/normal/regular"  # 14/20/400
  secondary: "type/sm/tight/regular"
  gap: 8  # px
```

### 13.26 Checkbox

```yaml
sizes:
  sm: 16  # px
  md: 24

radius: "rounded = 4"

border_unchecked: "1 px surface/border"
checked_bg: "BlogVault Brand/bv-emerald-900"

check_icon:
  color: "typography/text-white"
  sm: "12x12"
  md: "16x16"

indeterminate_dash:
  sm: "8x2"
  md: "12x2"

hover: "border darkens to Flat/zinc/zinc-300"
focus: "2 px ring offset 2 px BlogVault Brand/bv-emerald-900 + Box Shadow/shadow-sm"

error: "border -> typography/text-destructive"
disabled: "opacity/opacity-50"

states: [default, hover, focus, checked, indeterminate, disabled, error]

label:
  style: "type/sm/normal/regular"  # 14/20/400
  description_style: "type/sm/tight/medium"
  gap: 8  # px
```

### 13.27 Progress

```yaml
linear:
  height: 8  # px
  radius: "border radius/full = 9999"
  track: "Flat/zinc/zinc-100"
  fill: "BlogVault Brand/bv-emerald-600"

circular:
  diameters: [24, 32, 40, 48]
  stroke: 4  # px

ring:
  diameters: [64, 80]  # KPI variant
  stroke: 8
  value_center_style: "type/lg/tight/semibold"

semantic_fills:
  success: "BlogVault Brand/bv-emerald-700"
  warning: "typography/text-warning"
  destructive: "typography/text-destructive"

label: "type/sm/tight/medium"  # 14/14/500
value: "type/micro-10/normal/regular"  # 10/14/400, or larger per ring size

indeterminate_animation: "1600 ms loop"
```

### 13.28 Data Visualization (Charts)

```yaml
palette:
  chart_1: "surface/chart-1 (#2a9d90)"
  chart_2: "surface/chart-2 (#e76e50)"
  chart_3: "surface/chart-3 (#274754)"
  chart_4: "surface/chart-4 (#e8c468)"
  chart_5: "surface/chart-5 (#f4a462)"

axis:
  text: "type/xs/normal/regular"  # 12/16/400
  text_color: "surface/muted-foreground"
  tick_style: "type/xs/tight/regular"

grid_line:
  thickness: "1 px"
  color: "surface/border"
  opacity: "opacity/opacity-20"

chart_area_radius: "border radius/sm = 2"

tooltip: "Standard Tooltip component (section 13.7)"
popover_shadow: "shadow/md"

canvas_padding: 16  # px

title:
  default: "type/base/tight/semibold"
  kpi_charts: "type/2xl/tight/semibold"

value_labels:
  standard: "type/3xl/normal/bold"  # 30/36/700
  hero: "type/4xl/normal/bold"  # 36/40/700
```

### 13.29 Map

```yaml
tile_size: 256  # px (standard)

pin:
  standard: 24  # px
  large: 32
  shadow: "effect/level_1"

heat_layer:
  palette: "charts/Chart 1 -> Chart 5"
  blend_range: "alpha/40 -> alpha/80"
```

### 13.30 Widget (dashboard tile)

```yaml
background: "surface/widget-background (#fdfdfd)"
border: "1 px surface/border"
shadow: "shadow/sm"

sizes:  # responsive grid
  - "1x1 (264 px)"
  - "2x1"
  - "2x2"
  - "4x2"

padding: 16  # px
gap_to_next_widget: 16
radius: "rounded-3xl = 24"

header:
  style: "type/lg/normal/medium"  # 18/28/500
  optional_icon: "16x16"

body: "flexible, chart/value"

kpi_value: "type/2xl/tight/semibold or larger"
delta_pill: "Standard Pill component"
```

### 13.31 Summary (KPI strip)

```yaml
layout: "Horizontal row of 2-6 KPI cells"

cell_padding: 16  # px
gap_between_cells: "0 (separated by a 1 px surface/border divider)"

composition:
  small_label: "type/xs/tight/medium"  # typography/text-secondary
  big_value: "type/2xl/tight/semibold"
  optional: "delta pill"
```

### 13.32 Mega Menu

```yaml
anchor: "From a Top Nav item"
width: "full-width or 720 / 960 / 1200 px"

padding: 24  # px
inner_grid_columns: [2, 3, 4]
column_gap: 24  # px

link_row:
  icon: 24
  label_style: "type/sm/normal/medium"
  subtext_style: "type/xs/normal/regular"
```

### 13.33 Layout templates

```yaml
templates:
  page: "Top Nav + Sidebar + Page Content Area (default)"
  two_pane: "248 px Section 1 + dynamic Section 2"
  three_pane: "248 + dynamic + 320 px (right rail for context, e.g. detail sheet)"

constraints: "All templates obey section 4 (12-col grid) and section 8 (max 3 sections)"
```

### 13.34 Mobile deltas (from Mobile Design Guidelines page)

```yaml
min_target_size: "48x48 px"

top_nav: "Collapses to 56 px height"
sidebar: "Becomes a Sheet Slider (section 13.5)"

forms: "1-column layout always"
modals: "Become full-screen Sheets below 640 px viewport"
tabs: "Scrollable horizontally; underline becomes a pill on small screens"
```

### 13.35 Navigation Bars

```yaml
top_nav:
  height: 80  # px
  bg: "surface/navigation-background (#ffffff)"
  bottom_shadow: "Box Shadow/shadow-sm"
  logo_height: 28
  logo_alignment: left
  nav_items:
    style: "type/sm/tight/medium"  # 14/14/500
    gap: "spacing_gap/gap_2 = 8"
    height: "28 (height/h-7)"
  active_nav_item:
    text: "typography/text-primary"
    bg: "Flat/emerald/emerald-50"
    radius: "border radius/md = 6"
  account_menu: "Avatar md 32 + dropdown"

sidebar:
  open_width: 296
  collapsed_width: 48
  bg: "surface/page-background-content"
  border_right: "1 px surface/border"
  menu_item:
    height: 32
    padding: "px-3/py-2 = 12/8"
    radius: "border radius/md = 6"
  active:
    bg: "Flat/emerald/emerald-50"
    text: "BlogVault Brand/bv-emerald-900"
  hover_bg: "Flat/zinc/zinc-100"
  icon:
    size: "16x16"
    gap: "spacing_gap/gap_2 = 8"
  section_header:
    style: "type/xs/tight/medium"
    color: "typography/text-tertiary"
    top_margin: 24
  collapsed_tooltip: "show tooltip on hover"

mobile_nav:
  height: 56
  hamburger: "24x24 opens Sheet Slider sidebar"
```

### 13.36 Tables

```yaml
cell:
  height_default: 72
  height_compact: 40
  padding_left: "pl-4 = 16"
  padding_vertical: "py-4 = 16"
  padding_right: "spacing/2-5 = 10"

head:
  height: 40
  bg: "Flat/zinc/zinc-50"
  typography: "type/sm/normal/medium"  # 14/20/500
  text_color: "typography/text-secondary"
  sort_icon: "16x16"

cell_text:
  primary: "type/sm/normal/regular"  # 14/20/400
  secondary: "type/xs/normal/regular"  # 12/16/400

row_border: "1 px surface/border bottom"
row_hover_bg: "Flat/zinc/zinc-50"
row_selected_bg: "Flat/emerald/emerald-50"

checkbox_column_width: 44  # px
action_column: "right-aligned, icon-only 32x32"

footer:
  height: 56
  padding: 16
  pagination: right-aligned
  bulk_action_bar:
    height: 48
    padding: 12
    shadow: "shadow/sm"
    position: "sticky bottom"

layout: "Column-major — vertical auto-layout columns inside horizontal Columns frame"
optional_stripe: "Flat/zinc/zinc-50 on even rows"
```

### 13.37 Forms (complete anatomy)

```yaml
single_form:
  max_width: "max-w-sm = 384 px"
  alignment: "top-left in content area"

double_form:
  width: "Full content area width"
  layout: "2-column grid"

field_gap: "spacing/3 = 12"
section_gap: "spacing/6 = 24"

label:
  style: "type/sm/tight/medium"  # 14/14/500
  required_indicator: "red asterisk typography/text-destructive"

helper:
  style: "type/xs/normal/regular"  # 12/16/400
  color: "typography/text-secondary"
  error_color: "typography/text-destructive"

button_group_gap: "spacing_gap/gap_4 = 16"

double_form_function_container:
  border: "surface/border"
  radius: "border radius/lg = 8"
```

### 13.38 Menu / Dropdown

```yaml
width:
  min: 200  # px
  max: 320

outer_padding: "spacing/1 = 4"

item:
  height: 32
  padding: "px-3=12 / py-2=8"
  radius: "border radius/sm = 2"

hover_bg: "Flat/zinc/zinc-100"
active: "Flat/zinc/zinc-100 + check icon right"

separator:
  thickness: "1 px"
  color: "surface/border"
  v_margin: "spacing_gap/gap_0,5 = 2"

section_label:
  style: "type/xs/normal/medium"  # 12/16/500
  color: "typography/text-secondary"
  padding: "spacing/1 = 4"

icon: "16x16"
shadow: "shadow/md"
container_radius: "radius/rounded_3 = 12"
border: "1 px surface/border"

destructive_items: "typography/text-destructive"
nested_chevron: "8 px chevron-right"
```

### 13.39 Feedback / Banner

```yaml
padding: "p-4 = 16"
radius: "rounded = 4"
icon: "16x16"

typography:
  title: "type/sm/tight/semibold"  # 14/14/600
  body: "type/xs/tight/regular"  # 12/12/400

variants:
  success:
    bg: "surface/success-background"
    left_accent: "3 px Flat/emerald/emerald-700"
    icon_color: "typography/text-success"
  warning:
    bg: "surface/warning-background"
    left_accent: "3 px Flat/amber/amber-600"
    icon_color: "typography/text-warning"
  destructive:
    bg: "surface/destructive-background"
    left_accent: "3 px typography/text-destructive"
  info:
    bg: "Flat/sky/sky-50"
    left_accent: "3 px Flat/sky/sky-700"
    icon_color: "Flat/sky/sky-600"

dismiss: "16x16 icon, right-aligned"
```

### 13.40 Input OTP

```yaml
slot_size: "36x36 (width/w-9, height/h-9)"
radius: "border radius/md = 6"

typography: "type/sm/normal/regular"  # 14/20/400
text_color: "typography/text-primary"
caret_color: "typography/text-black"

border:
  default: "1 px surface/border"
  focus: "2 px ring BlogVault Brand/bv-emerald-900"
  focus_shadow: "shadow/sm"

background: "surface/card-background (#ffffff)"

variants:
  pattern:
    slots: 6  # adjacent
    gap: "spacing/2 = 8"
    total_width: "216 + gaps"
  separator:
    slots: 6
    separator: "dash between groups of 3"
    gap: "spacing/2 = 8 between slots and separator"
  controlled:
    slots: 6
    layout: "2-row (3x2)"
    gap: "spacing/2 = 8"
    total_height: "72 px (36 + 8 gap + 36 — actually shows as 72h with 8px top padding)"

states:
  default: "empty, border only"
  filled: "digit visible"
  focus: "ring + shadow"

interaction: "Auto-advance to next slot on digit entry. Backspace returns to previous slot."
```

### 13.41 Pagination

```yaml
button_size: "36x36 (width/w-9, height/h-9)"
radius: "border radius/md = 6"

active:
  bg: "Flat/emerald/emerald-800"
  text: "typography/text-white"
  shadow: "shadow/sm"

inactive:
  text: "typography/text-primary"
  bg: transparent

hover_bg: "Flat/zinc/zinc-100"

disabled: "opacity/opacity-50, no pointer events (prev/next at bounds)"

gap_between_buttons: "spacing/1 = 4"

ellipsis:
  text: "..."
  color: "typography/text-secondary"
  condition: "when total pages > visible slots"

composition: "prev <- 1 - 2 - ... - 9 - 10 -> next. Always show first, last, and +/-1 around current."
```

### 13.42 Separator (Divider)

```yaml
figma_page: "760:21263"
thickness: 1  # px
color: "surface/border"
margin: "spacing/2 = 8 (default), also 4/16/24/32"

orientation: [horizontal, vertical]
label_variant: "optional centered text on dark bg, typography/text-white"

bg: N/A  # the line IS the component
border: "1 px surface/border"
radius: N/A
padding: N/A
shadow: N/A
states: N/A  # non-interactive
variants: [horizontal, vertical]
disabled: N/A
focus: N/A
icon_size: N/A
gap: N/A
animation: N/A
```

---

## 14. Reading Figma frames — names, artifacts, components, and properties

Every designer, reviewer, and AI agent **must** read the Figma frame tree as a source of design intent — not just the visual screenshot.

### 14.1 Frame naming convention

All frames must follow the pattern: **`{Feature} / {View} / {Breakpoint}`** — e.g. `Members / List / Desktop`. Frames named "Frame 43" or "Untitled" are rejected in review.

### 14.2 What to inspect

| Element | What to look for |
|---|---|
| **Frame names** | Descriptive, convention-following, encode feature + view + breakpoint |
| **Component instances** | Correct variant, size, and state selected; all properties intentionally set |
| **Component properties** | Slot fills, boolean toggles, text overrides — these are the designer's explicit intent |
| **Auto-layout** | Direction, gap (8-grid?), padding (8-grid?), alignment |
| **Fills / strokes / effects** | Bound to Horizon variables — no raw hex |
| **Raw shapes** | Rectangles / vectors acting as DS components = violation; flag for replacement |
| **Assets** | Named descriptively ("hero-illustration" not "image 2"); dimensions noted for placeholders |

### 14.3 Judging quality

During audit or pre-implementation review, score frame quality against the checklist above. Every "Frame 43", every detached instance, every unbound property is a finding in the audit report.

---

## 15. Reading annotations — discuss when ambiguous

Designers leave annotations, comments, and TODO markers in Figma. These are **design intent signals** — they must be read before generating code or auditing.

### 15.1 Annotation sources

- **Figma comments** — threads attached to specific nodes.
- **Sticky notes** — placed near or inside frames (often requirements, edge cases, open questions).
- **Text annotations** — text nodes named "Note:", "TODO:", "Q:", "⚠", or "Annotation:". These are callouts, not UI copy.
- **Frame descriptions** — the `description` field on frames and component instances.
- **Named markers** — frames/groups named "annotation", "spec-note", "redline", "callout".

### 15.2 When to ask for clarification

| Signal | Required action |
|---|---|
| Annotation says "maybe", "TBD", "discuss", or "?" | **Ask the designer/user** — do not implement a "maybe" |
| Two annotations on the same element give different specs | **Ask** — cite both, ask which wins |
| A TODO references a feature that doesn't exist yet | **Ask** — is this in scope? |
| An unresolved comment thread | **Ask** — has this been decided? |
| Sticky note describes behavior not reflected in the design | **Ask** — is the note or the design correct? |
| Annotation references a component/token not in Horizon | **Ask** — proposal or error? |

**Never silently resolve ambiguity.** When in doubt, ask.

---

## 16. Accessibility (non-negotiable)

- **Contrast:** WCAG AA — body text ≥ 4.5:1, large text ≥ 3:1.
- **Target size:** any clickable target ≥ 24×24 px on desktop, ≥ 48×48 px on mobile.
- **Focus state:** every interactive element has a visible 2 px focus ring in `typography/text-url` with 2 px offset.
- **Motion:** respects `prefers-reduced-motion`. No motion > 400 ms on UI surfaces.
- **Screen readers:** every icon-only button has an accessible label; every form field has a programmatic label.

---

## 17. Audit Checklist (use this for every PR)

- [ ] All fills/strokes/effects bound to a Horizon variable (no raw hex).
- [ ] All gaps/paddings/margins are multiples of 8 (only `2` and `4` allowed below 8).
- [ ] No `12 / 20 / 22` px in any gutter, padding or gap.
- [ ] All radii use `radius/rounded_{rem}` tokens (1 rem = 4 px).
- [ ] All text uses a `type/{size}/{lh}/{weight}` style.
- [ ] Every component is a Horizon instance (no look-alike frames).
- [ ] One primary CTA per page.
- [ ] Reading direction: information left, action right.
- [ ] Max 3 horizontal Sections.
- [ ] Section 1 width 248 px (if used).
- [ ] Light + Dark mode both verified.
- [ ] Focus states present on every interactive element.
- [ ] WCAG AA contrast on all text.
- [ ] Empty state designed for every list/table.
- [ ] Loading state (Skeleton) designed for every async region.
- [ ] Error state designed for every form.
- [ ] Page has been screenshotted and visually compared to the spec.
- [ ] All Figma frame names follow `{Feature} / {View} / {Breakpoint}` convention (no "Untitled").
- [ ] All component instance properties inspected and judged (correct variant, size, state).
- [ ] All annotations, comments, and TODOs read and resolved (no ambiguous "TBD" left unaddressed).
- [ ] No raw shapes mimicking DS components — all replaced with Horizon instances.

---

## 18. Page patterns (Screens page)

The Figma `Screens` page (`3634:581541`) defines 11 canonical page patterns. Every new screen must start from one of these patterns. Deviations require design review approval.

### 18.1 Listing Table
- **When to use:** Browsable, filterable data (sites, members, backups, logs).
- **Composition:** Page (Top Nav + Sidebar) → Page Header → Table (Head + Rows + Footer-Pagination) → optional Bulk Action Footer.
- **Key components:** Table, Page Header, Button Group, Pagination, Bulk Action bar.
- **Layout:** Default template (§13.33). Table fills available width. Pagination right-aligned in footer.

### 18.2 Dashboard (Global — 1920 px)
- **When to use:** Overview of all sites/resources. Landing page for the product.
- **Composition:** Page → Page Header → Summary KPI strip → Widget grid (2×2 or 4×2) → optional Notification Tray.
- **Key components:** Widget, Summary, Progress (ring), Indicator, Charts.
- **Layout:** 12-col grid. Widgets snap to 1×1 / 2×1 / 2×2 / 4×2 responsive tiles. Gap 16 px.

### 18.3 Dashboard (Site-Level — up to 1536 px)
- **When to use:** Per-site overview (security, performance, uptime).
- **Composition:** Same as Global but narrower grid, 2-column Widget layout max.
- **Layout:** Responsive breakpoint ≤1536 px. Sidebar auto-collapses at ≤1024 px.

### 18.4 Information / Details
- **When to use:** Read-heavy context about a single entity (site details, backup details, scan results).
- **Composition:** Page → Tab Header (up to 6 tabs) → Content Area (status cards, KPIs, Indicators) → optional action bar.
- **Key components:** Tabs, Switch, Pills, Uptime Status Card (custom), BvButton.
- **Layout:** Two-pane (§13.33): 248 px secondary nav + dynamic content.

### 18.5 Form (Add / Edit)
- **When to use:** Creating or editing a resource (add team member, configure backup schedule).
- **Composition:** Page → Form Header → Form Function Container (inputs + button group).
- **Key components:** Input Fields, Search Multi-Select, BvButton, optional Stepper.
- **Layout:** Form-only template. Single form max 384 px. Double form 2-column within content area.

### 18.6 Settings
- **When to use:** Toggle-based configuration (optimization settings, notification preferences).
- **Composition:** Page → Section headers → rows of (label + Switch/Pill + helper text).
- **Key components:** Switch, Section Icon, Pills, Feedback/Banner.
- **Layout:** Default template, single-column content. Group related settings under Section headers.

### 18.7 Table with Log (dual-pane)
- **When to use:** Data table alongside an activity/audit log (file manager + change log).
- **Composition:** Page → Three-pane layout: Section 1 (Table) + Section 2 (Activity Log).
- **Key components:** Table, Activity Log rows (timestamp + event + actor avatar).
- **Layout:** Three-pane template (§13.33): 248 + dynamic + 320.

### 18.8 Task / Process
- **When to use:** Multi-step processes with timeline or progress (migration, malware cleanup).
- **Composition:** Page → Page Header → Accordion or card-based steps → Pre-Checks panel.
- **Key components:** Accordion, Section Header, Frequency indicators, Pre-Checks, Progress.
- **Layout:** Default template. Steps stack vertically.

### 18.9 Wizard (multi-step form)
- **When to use:** Guided setup flows (backup setup, site onboarding).
- **Composition:** Page → Stepper (horizontal) → Form steps → Summary → Confirm.
- **Key components:** Stepper, Input Fields, BvButton, Progress (linear).
- **Layout:** Form-only template with Stepper at top. Each step is one Form (Single).

### 18.10 Base (blank canvas)
- **When to use:** Starting point for new patterns not covered above.
- **Composition:** Page → Annotation Canvas → Main Content Area.
- **Layout:** Default template. Use as a starting point only — evolve into a named pattern during design.

### 18.11 Empty / Error state patterns
- **When to use:** Every async page must have these.
- **Empty:** Centered Empty State block (§13.9) within the content area.
- **Error:** Feedback banner (§13.39) at top of content + retry CTA.
- **Loading:** Skeleton (§13.10) matching the content layout.

### Pattern selection rules

| User intent | Pattern |
|---|---|
| Browse a list of items | **Listing Table** (18.1) |
| See an overview of everything | **Dashboard Global** (18.2) |
| See an overview of one thing | **Dashboard Site-Level** (18.3) or **Information** (18.4) |
| Read details about one thing | **Information** (18.4) |
| Create or edit something | **Form** (18.5) |
| Configure toggles/preferences | **Settings** (18.6) |
| Browse data + see history | **Table with Log** (18.7) |
| Execute a multi-step process | **Task** (18.8) |
| Guided setup with progress | **Wizard** (18.9) |
| None of the above | **Base** (18.10) — and file a design-pattern proposal |

### Most-used component building blocks across patterns
BvButton (36×), Pills (22×), Switch (17×), Section Icon (15×), Search Multi-Select (14×), Table (13×), Navigation Bars (12×), Page Header (10×).

---

## 19. Glossary changes from earlier versions (was §18)

| Earlier term | Current term | Reason |
|---|---|---|
| "Page Heading container" | **Title-Subtext Container** | Matches actual Horizon naming. |
| "Account-action container" | **Account Menu** | Matches `Navigation Bars` component. |
| "infobox" (in Form) | **Form Header Container** (Form Single also accepts a leading **Banner**) | Avoids collision with `Notification` component. |
| "Table Menu Row" | **Table Row** | Aligns with Horizon `Table/Cell` naming. |
| "Sections" (vague) | **Section** with explicit max=3 rule | Removes ambiguity. |
| "22 px gutter" | **24 px gutter** | Conform to multiples-of-8 spacing rule. |
| "20 px top/bottom Top Nav padding" | **24 px top/bottom Top Nav padding** | Same. |
| "12 px child indent / 12 px account-action gap / 12 px tab vertical / 12 px pill medium L-R / 12 px Card title-body" | **16 px** in every case | Same. |
| "44 px Table Row min-height" | **48 px Table Row min-height** | Snap to 8-grid. |
| "246 px Section 1 width" | **248 px Section 1 width** | Snap to 8-grid. |

---

## 20. Living document

Open a PR against `deliverables/Guidelines_Product Design.md`. Every change must:
1. Cite the Horizon node, component key, or token name being formalized.
2. Update `/design.md` in the same PR if the change is machine-relevant.
3. Bump the "Last reviewed" date and the version in the front-matter.
