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
| **Card** | A bounded surface (`surface/card-background`) with 16 px padding, 8 px radius (default) / 16 px (large), optional 1 px border (`surface/border`). |
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

- **Size tiers:** Small 24 h · Medium 32 h · Large 40 h · X-Large 48 h (mobile only).
- **Icon-only sizes:** SM 24×24 · MD 32×32 · LG 40×40 (square).
- **Type variants (10):** Primary, Secondary, Outlined, Ghosted, Destructive, Link, Icon, Indicator, Special, Loading.
- **States (8):** Default, Active (Secondary only), Hover, Pressed, Disabled, Loading, Primary Action (Ghosted), Inverted (Indicator). No explicit Focus variant — apply 2 px ring `surface/border` programmatically.
- **Additional sub-variants (12):** Nil, Notification, Mobile Full Width (361 w), EMbed, Buffer, Mobile Primary, Count, Clear, Link, Inline, Shadow, Highlight.
- **Device contexts:** Responsive (SM/MD/LG), Mobile (XL only), Mobile Responsive (XL + Notification).
- **Padding (horizontal):** SM 8 · MD 12–16 · LG 16 · XL 24. Gap icon↔label `spacing/2` = 8.
- **Border radius:** `radius/rounded_2` = 8 (all sizes).
- **Typography:** `type/sm/tight/medium` (14/14/500) for all sizes.
- **Token map:**
  - Primary: bg `BlogVault Brand/bv-emerald-900` (#064e3b), text `typography/text-white`, `shadow/sm`.
  - Secondary: bg `surface/card-background`, border 1 px `surface/border`, text `typography/text-primary`.
  - Outlined: bg transparent, border 1 px `surface/border`, text `typography/text-primary`.
  - Ghosted: bg transparent, no border, text `typography/text-primary`.
  - Destructive: bg `typography/text-destructive` (#dc2626), text `typography/text-white`.
  - Link: same as Ghosted but underlined on hover. Container variant (full height) vs Inline (text-height 16–20 only).
- **Disabled:** `opacity/opacity-50` = 50%, no pointer events.

### 13.0b Input Fields

- **Size tiers:** Medium 36 h (`height/h-9`) · Small 32 h (`height/h-8`). Default width 320 px, fill-container in forms.
- **Types:** Input, Search, Dropdown, ColourPicker, TextBox.
- **States:** Default, Typing, Filled, Selected, Disabled, Error.
- **Border radius:** `border radius/md` = 6.
- **Border:** 1 px `surface/border` (#e4e4e6). Error: `typography/text-destructive`. Focus: 2 px ring `BlogVault Brand/bv-emerald-900`.
- **Padding:** `px-3` = 12 horizontal, `py-2` = 8 vertical.
- **Typography:** Placeholder `type/sm/normal/regular` (14/20/400) in `typography/text-secondary`. Filled text same style in `typography/text-primary`.
- **Label:** `type/sm/tight/medium` (14/14/500) `typography/text-primary`, gap 6 (`spacing/1-5`) below.
- **Helper text:** `type/xs/normal/regular` (12/16/400) `typography/text-secondary`, gap 4 above.
- **Error text:** Same as helper but `typography/text-destructive`.
- **Left icon:** 16×16 in `typography/text-secondary`. Shadow `shadow/sm` on focus.

### 13.0c Accordion

- **Outer wrapper:** `surface/card-background`, `radius/rounded_2` = 8, `shadow/sm`.
- **Item min-height:** 48 px, padding 16 (`spacing/4`) all sides.
- **Gap between items:** 0 (flush, 1 px `surface/border` bottom separator).
- **Title:** `type/base/normal/regular` (16/24/400) `typography/text-primary`.
- **Body:** `type/sm/normal/regular` (14/20/400) `typography/text-secondary`. Gap title→body `spacing/2` = 8.
- **Chevron:** 16×16 `typography/text-secondary`, rotates 180° on expand (200 ms ease-out).
- **Variants:** Single expand (only one open) · Multi expand. States: Collapsed, Expanded, Disabled.

### 13.1 Card

- Background `surface/card-background`. Border 1 px `surface/border` (optional).
- Radius `radius/rounded_2` = 8 (default) or `border radius/xl` = 12 (large). **Correction:** previous docs said `rounded_16` for large — actual Figma value is 12.
- Padding 16 px (default), 24 px (feature card).
- Title: `type/sm/tight/medium` (14/14/500) + optional 16×16 icon `typography/text-secondary` + optional right-aligned action.
- Body: `type/sm/normal/regular` (14/20/400) `typography/text-secondary`. Gap title→body **16 px**.
- Shadow: `shadow/base` default. Interactive cards: `shadow/lg` on hover + scale(1.01) 200 ms.
- Header min-height: 36 px (`height/h-9`). Disabled: `opacity/opacity-50`.

### 13.2 Modal

- Width tiers: **Small 400 / Medium 560 / Large 720 / X-Large 960 px**.
- Padding 24 px all sides.
- Composition: Header (Title + close) → Body → Footer (Button Group right-aligned).
- Backdrop: `surface/page-background-content` at `alpha/80`. **Correction:** previous docs said `alpha/60` — actual is `alpha/80`.
- Radius `rounded-3xl` = 24. **Correction:** previous docs said `rounded_16` — actual is 24.
- Min vertical margin from viewport edge: **48 px**.
- Title: `type/lg/normal/medium` (18/28/500). Body: `type/sm/normal/regular` (14/20/400).
- Close button: 36×36 icon-only (`width/w-9`). Shadow `Box Shadow/shadow-lg`.
- Dividers: 1 px `surface/border` between header/body and body/footer.
- Body: `overflow-y: auto`, max-height = viewport − 96 − header − footer.
- Animation: scale 0.95→1.0 + fade, 200 ms ease-out.

### 13.3 Dialog Box (confirmation)

- Width 400 px, padding 24 (`spacing/6`), radius `rounded-3xl` = 24, shadow `Box Shadow/shadow-lg`.
- Title: `type/lg/normal/semibold` (18/28/600). Body: `type/xs/normal/regular` (12/16/400) `typography/text-secondary`.
- Gap title→body `spacing/2` = 8. Gap body→buttons `spacing_gap/gap_6` = 24.
- Single primary (destructive for delete confirms) + secondary button, right-aligned.
- No close icon — dismiss via button only. Animation same as Modal.

### 13.4 Drawer

- Right-anchored (default) or Left. Width tiers: **400 / 560 / 720 px**.
- Header 64 px, padding `spacing/4` = 16 all around. **Correction:** previous docs said 24 L/R, 16 T/B — actual is 16 uniform.
- Header: `type/lg/normal/medium` (18/28/500). Close button 32×32 icon-only, top-right.
- Body scrolls; padding `spacing/4` = 16 L/R, `spacing/3` = 12 T/B.
- Footer sticky, min 56 h, padding `spacing/4` = 16. 1 px `surface/border` dividers.
- Shadow: `shadow/sm` + `shadow/base` layered. Backdrop: `surface/foreground` at 20% opacity.
- Animation: slide from edge, 200 ms ease-out.

### 13.5 Sheet Slider (mobile)

- Bottom-anchored, max-height 80vh, top radius `radius/rounded_16`.
- Drag handle 32×4 px centered at the top, `alpha/30`.

### 13.6 Tabs

- Underline-style by default. **16 px** horizontal padding per tab, **8 px** vertical.
- Active: `typography/text-primary` + 2 px bottom border in `typography/text-primary`.
- Inactive: `typography/text-secondary`. Hover: `typography/text-primary`.
- Gap between tabs: 0 (the underline itself separates them).
- Variants: underline (default), pill, segmented.

### 13.7 Tooltip

- Padding **8 px H · 4 px V**. Radius `radius/rounded_4`.
- Background `surface/overlay-background` with `alpha/90`. Text `typography/text-white`.
- Type `type/xs/normal/medium`.
- Triangle marker 8 px, positions: top / bottom / left / right · orient left / center / right.

### 13.8 Toast

- Width 360 px, padding 16 px, radius `radius/rounded_8`.
- Slide in 240 ms, auto-dismiss 4 s (default).
- Variants: success / info / warning / destructive — left-aligned 24×24 icon.

### 13.9 Empty State

- Centered within the Page Content Area or Card.
- Icon 48×48 → 16 px gap → Title `type/lg/tight/semibold` → 4 px → Subtext `type/sm/normal/regular` `typography/text-secondary` → 24 px → CTA Button.
- Max-width 360 px for the text block.

### 13.10 Skeleton

- Color: `surface/muted-background`. Pulse 1 400 ms ease-in-out.
- Match the dimensions of the real content within ±4 px.

### 13.11 Search bar

- Default width 320 px (Page Header), 100% on mobile.
- Height 40 px (Medium Input Field).
- Left icon: magnifying glass 16×16. Right: clear `x` when filled.
- Placeholder uses `typography/text-tertiary`.

### 13.12 Pill / Pill Button

- Sizes **Small (24 px height)** / **Medium (32 px height)**.
- Padding: **8 px L/R** for Small, **16 px L/R** for Medium.
- Radius `radius/rounded_9999`.
- Variants: Neutral / Success / Informative / Warning / Destructive — each maps to a `surface/*-background` and `typography/text-*`.
- Pill Button adds hover (alpha/10 darken) and pressed (alpha/20 darken) states.

### 13.13 Breadcrumb

- Lives inside the Top Nav. Type `type/sm/normal/medium`.
- Separator: chevron-right 16×16 in `typography/text-tertiary`.
- Item gap **8 px**. Active (last) item `typography/text-primary`. Earlier items `typography/text-secondary`, hover → `typography/text-primary`.
- Truncation: middle items collapse into `…` overflow menu when total width > parent.

### 13.14 Avatar

- Sizes: **xs 16 / sm 24 / md 32 / lg 40 / xl 48 / 2xl 64 px**.
- Shape: circle (default) or `radius/rounded_8` (square).
- Content: photo, initials (1–2 chars in `type/sm/tight/medium`), or icon.
- Avatar group: overlap **−8 px**, max 4 visible + `+N` counter.

### 13.15 Badge (vs Pill)

- Use **Badge** for state markers attached to another element (e.g. unread count, status dot). Use **Pill** as a stand-alone label.
- Badge sizes: **Dot 8 px** / **Small 16 px** / **Medium 24 px**.
- Variants: Information / Warning / Success / Destructive — token pairs same as Pill.
- Position: top-right of host with **−4 px** outset.

### 13.16 Stepper (Step-Wizard)

- Horizontal (default) or vertical.
- Step circle 24 px, gap to label **8 px**, gap between steps **24 px**.
- Connector line 1 px in `surface/border` (incomplete) or `typography/text-primary` (complete).
- States: pending / current / complete / error.

### 13.17 Indicator (status dot)

- Sizes 8 / 16 / 24 px.
- Variants: Default / Pulse (animated) / Step.
- Use inline beside text to convey state. Always paired with an aria-label.

### 13.18 Notification (Running Task tray)

- Anchored top-right of Top Nav, opens as a 400 px wide tray.
- Each row 64 px, padding 16 px, radius `radius/rounded_8`.
- Composition: status icon 24 → title + subtext → action / dismiss.

### 13.19 Pre-Checks

- Vertical checklist used in environment / readiness flows.
- Each row 48 px min-height, 16 px gap between rows.
- States: pending (grey dot) → running (spinner) → success (check) → error (cross + retry button).

### 13.20 Calendar / Date Picker

- Cell 32×32 px, day grid gap 0.
- Header (month/year) 48 px, padding 16 px.
- Variants: single date / range / multi.
- Today: 1 px ring in `typography/text-url`. Selected: filled `surface/destructive-background`-style accent (Horizon's `Mode` token).

### 13.21 Command Search (⌘K palette)

- Width 640 px, max-height 480 px, radius `radius/rounded_16`.
- Padding 8 px outer; row 40 px with 16 px L/R padding and 8 px gap between icon → label → keybind hint.
- Section headers `type/xs/tight/medium` `typography/text-tertiary`, 8 px V padding.
- Footer 32 px with hint chips ↑↓ to navigate · ↵ to select · esc to close.

### 13.22 Carousel

- Snap-x scroll. Item gap **16 px** (default) or 24 px (large).
- Controls: arrows (40×40, anchored centre L/R) or dots (8 px, gap 8 px) or both.
- Always show 1 partial peek of the next item to signal scrollability.

### 13.23 Range Slider

- Track 4 px in `surface/muted-background`, fill in `typography/text-primary`.
- Thumb 16 px circle with 1 px `surface/border`.
- Step ticks every 16 px on the track when `withMarks=true`.
- Variants: single / dual handle.

### 13.24 Switch

- Sizes **Small 24×16 / Medium 32×24**.
- Track radius `radius/rounded_9999`. Thumb circle, padding 2 px from track edge.
- Off `surface/muted-background`. On `typography/text-primary` background, thumb `surface/card-background`.
- 160 ms ease-out toggle.

### 13.25 Radio Button

- Sizes **Small 16 / Medium 24 px**. Outer ring 1 px `surface/border`. Inner dot 8 px (Small) / 12 px (Medium) — *internal radius is exempt from the multiples-of-8 rule because it is the published component diameter*.
- Selected ring `typography/text-primary`. Disabled `typography/text-tertiary`.
- Label gap **8 px**.

### 13.26 Checkbox

- Sizes **Small 16 / Medium 24 px**. Square `radius/rounded_4`.
- States: default / hover / focus / checked / indeterminate / disabled / error.
- Label gap **8 px**.

### 13.27 Progress

- **Linear** (default): height 8 px, radius `radius/rounded_9999`. Fill `typography/text-primary`.
- **Circular**: 24 / 32 / 40 / 48 px diameter, stroke 4 px.
- **Ring** (KPI): 64 / 80 px, stroke 8 px, value rendered centre in `type/lg/tight/semibold`.
- Indeterminate state animates 1 600 ms loop.

### 13.28 Data Visualization (Charts)

- Default chart palette: `charts/Chart 1` … `charts/Chart 5`.
- Axis text `type/xs/normal/regular` `typography/text-secondary`.
- Grid line 1 px `surface/border` at `alpha/40`.
- Tooltip = the standard Tooltip component (§13.7).
- Padding around chart canvas 16 px.

### 13.29 Map

- Tile size 256 px (standard).
- Pin: standard 24 px or large 32 px, drop-shadow `effect/level_1`.
- Heat layer uses `charts/Chart 1` → `Chart 5` blended at `alpha/40` → `alpha/80`.

### 13.30 Widget (dashboard tile)

- Card with header row (Title + optional menu) and body.
- Sizes (responsive grid): 1×1 (264 px) / 2×1 / 2×2 / 4×2.
- Padding 16 px, gap to next widget **16 px**, radius `radius/rounded_16`.

### 13.31 Summary (KPI strip)

- Horizontal row of 2–6 KPI cells.
- Cell padding 16 px, gap between cells 0 (separated by a 1 px `surface/border` divider).
- Composition: small label `type/xs/tight/medium` `typography/text-secondary` → big value `type/2xl/tight/semibold` → optional delta pill.

### 13.32 Mega Menu

- Anchored from a Top Nav item, full-width or 720 / 960 / 1 200 px.
- Padding 24 px. Inner grid 2 / 3 / 4 columns, column gap **24 px**.
- Each link row: icon 24 → label `type/sm/normal/medium` → subtext `type/xs/normal/regular`.

### 13.33 Layout templates

- **Page**: Top Nav + Sidebar + Page Content Area (default).
- **Two-pane**: 248 px Section 1 + dynamic Section 2.
- **Three-pane**: 248 + dynamic + 320 px (right rail for context, e.g. detail sheet).
- All templates obey §4 (12-col grid) and §8 (max 3 sections).

### 13.34 Mobile deltas (from Mobile Design Guidelines page)

- Min target size **48×48 px**.
- Top Nav collapses to 56 px height; Sidebar becomes a Sheet Slider (§13.5).
- Forms use 1-column layout always.
- Modals become full-screen Sheets below 640 px viewport.
- Tabs become scrollable horizontally; the underline becomes a pill on small screens.

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

## 18. Glossary changes from earlier versions

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

## 19. Living document

Open a PR against `deliverables/Guidelines_Product Design.md`. Every change must:
1. Cite the Horizon node, component key, or token name being formalized.
2. Update `/design.md` in the same PR if the change is machine-relevant.
3. Bump the "Last reviewed" date and the version in the front-matter.
