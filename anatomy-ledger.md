# Horizon Design System — Component Anatomy Ledger

> **Purpose.** This ledger documents every component anatomy detail that was **missing or incomplete** in `design.md` and `Guidelines_Product Design.md`. Each entry specifies what was missing, the correct value sourced from the Figma file (`UfHICFSU9PJl9OkE84mUk9`) via the Desktop Bridge MCP, and which file(s) need updating.
>
> **Generated:** 2026-05-15 · **Source:** Figma Desktop Bridge at `127.0.0.1:3845`

---

## Legend

| Symbol | Meaning |
|--------|---------|
| 🔴 | **Critical** — completely missing from docs |
| 🟠 | **High** — partially documented but key details absent |
| 🟡 | **Medium** — documented but imprecise or outdated |
| ✅ | Already documented correctly |

---

## 1. Button (`707:1739`)

**Current docs status:** Listed in §6.2 of design.md and §9 of Guidelines as "Button Group" but **NO dedicated §13 entry** for Button anatomy.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Size tiers | 🔴 | **Small 24 h** · **Medium 32 h** · **Large 40 h** · **X-Large 48 h** (mobile only) |
| Canonical widths (Primary/Default/Nil) | 🔴 | SM 70 · MD 101 · LG 105 · XL 172.5 (content-driven) |
| Icon-only dimensions | 🔴 | SM 24×24 · MD 32×32 · LG 40×40 (square) |
| Type variants (10) | 🟠 | Primary, Secondary, Outlined, Ghosted, Destructive, Link, Icon, Indicator, Special, Loading |
| States (8) | 🔴 | Default, Active (Secondary only), Hover, Pressed, Disabled, Loading, Primary Action (Ghosted), Inverted (Indicator) |
| Focus state | 🔴 | **Not modeled as a separate Figma variant** — apply 2 px ring `surface/border` programmatically |
| Additional sub-variants (12) | 🔴 | Nil, Notification, Mobile Full Width (361 w), EMbed, Buffer, Mobile Primary, Count, Clear, Link, Inline, Shadow, Highlight |
| Device contexts | 🔴 | Responsive (SM/MD/LG), Mobile (XL only), Mobile Responsive (XL + Notification) |
| Padding (horizontal) | 🔴 | SM 8 · MD 12–16 · LG 16 · XL 24 (inferred from width − icon/text) |
| Gap (icon ↔ label) | 🔴 | `spacing/2` = 8 px |
| Border radius | 🔴 | `radius/rounded_2` = 8 px (all sizes) |
| Typography | 🔴 | `type/sm/tight/medium` (14/14/500) for SM/MD/LG |
| Primary fill | 🔴 | `BlogVault Brand/bv-emerald-900` (#064e3b) text `typography/text-white` |
| Secondary fill | 🔴 | `surface/card-background` border `surface/border` text `typography/text-primary` |
| Outlined fill | 🔴 | transparent, border 1 px `surface/border`, text `typography/text-primary` |
| Ghosted fill | 🔴 | transparent, no border, text `typography/text-primary` |
| Destructive fill | 🔴 | `typography/text-destructive` (#dc2626) bg, text `typography/text-white` |
| Link variant dims | 🔴 | Container: same as regular. Inline: text-height only (16–20 h) |
| Shadow | 🟡 | `shadow/sm` on Primary default |
| Disabled opacity | 🔴 | `opacity/opacity-50` = 50% |

---

## 2. Input Fields (`0:1`)

**Current docs status:** Listed in §6.2 but **NO dedicated §13 entry**.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Size tiers | 🔴 | **Medium 36 h** (`height/h-9`) · **Small 32 h** (`height/h-8`) |
| Width | 🔴 | Default 320 px, fill-container in forms |
| Border radius | 🔴 | `border radius/md` = 6 px |
| Border | 🔴 | 1 px `surface/border` (#e4e4e6) |
| Padding | 🔴 | `px-3` = 12 px horizontal, `py-2` = 8 px vertical |
| Placeholder text | 🔴 | `type/sm/normal/regular` (14/20/400) in `typography/text-secondary` |
| Filled text | 🔴 | `type/sm/normal/regular` (14/20/400) in `typography/text-primary` |
| Label | 🔴 | `type/sm/tight/medium` (14/14/500) in `typography/text-primary`, gap 6 px (`spacing/1-5`) below |
| Helper text | 🔴 | `type/xs/normal/regular` (12/16/400) in `typography/text-secondary`, gap 4 px above |
| Error state | 🔴 | Border → `typography/text-destructive`, helper text → `typography/text-destructive` |
| Focus state | 🔴 | 2 px ring `BlogVault Brand/bv-emerald-900` |
| Icon (left) | 🔴 | 16×16 (`width/w-4`, `height/h-4`) in `typography/text-secondary` |
| Shadow | 🔴 | `shadow/sm` on focus |
| Types | 🔴 | Input, Search, Dropdown, ColourPicker, TextBox |
| States | 🔴 | Default, Typing, Filled, Selected, Disabled, Error |

---

## 3. Accordion (`1:3883`)

**Current docs status:** Listed in §6.3 of design.md but **NO §13 entry** in Guidelines.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Item height | 🔴 | Min 48 px (content-driven) |
| Padding | 🔴 | 16 px (`spacing/4`) all sides |
| Gap between items | 🔴 | 0 px (flush, separated by border) |
| Border | 🔴 | 1 px `surface/border` bottom on each item |
| Background | 🔴 | `surface/card-background` (#ffffff) |
| Radius (outer) | 🔴 | `radius/rounded_2` = 8 px (wrapping card) |
| Title typography | 🔴 | `type/base/normal/regular` (16/24/400) `typography/text-primary` |
| Body typography | 🔴 | `type/sm/normal/regular` (14/20/400) `typography/text-secondary` |
| Chevron icon | 🔴 | 16×16 (`width/w-4`), `typography/text-secondary`, rotates 180° on expand |
| Gap title → body | 🔴 | `spacing/2` = 8 px |
| Expand animation | 🔴 | 200 ms ease-out height transition |
| Variants | 🔴 | Single expand (only one open at a time) · Multi expand |
| States | 🔴 | Collapsed, Expanded, Disabled |
| Shadow | 🔴 | `shadow/sm` on card wrapper |

---

## 4. Avatar (`766:25182`)

**Current docs status:** §13.14 covers sizes and shapes well. Missing token specifics.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Sizes | ✅ | xs 16, sm 24, md 32, lg 40, xl 48, 2xl 64 |
| Circle radius | ✅ | `border radius/full` = 9999 |
| Square radius | 🟡 | `radius/rounded_2` = 8 (docs say `rounded_8` — same value, different alias) |
| Background (initials) | 🔴 | `Flat/zinc/zinc-200` (#e4e4e7) |
| Text color (initials) | 🔴 | `typography/text-primary` (#3f3f46) |
| Initials typography | 🔴 | xs: `type/micro-8/normal/regular`, sm: `type/micro-10/normal/regular`, md: `type/xs/normal/medium`, lg: `type/sm/normal/medium`, xl: `type/base/normal/medium`, 2xl: `type/lg/normal/medium` |
| Border | 🔴 | `surface/border` 1 px (when stacked in groups) |
| Icon fallback | 🔴 | `typography/text-tertiary`, same size as text |
| Group overlap | ✅ | −8 px |
| Group max visible | ✅ | 4 + counter |
| Counter pill | 🔴 | `Flat/zinc/zinc-100` bg, `type/xs/normal/medium` text |
| Online indicator | 🔴 | 8 px `Flat/emerald/emerald-500` dot, bottom-right |

---

## 5. Badge (`733:8031`)

**Current docs status:** §13.15 covers sizes and variants. Missing token details.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Sizes | ✅ | Dot 8 · Small 16 · Medium 24 |
| Radius | 🔴 | `border radius/md` = 6 for Small/Medium · full for Dot |
| Shadow | 🔴 | `shadow/base` on outlined variants |
| Information tokens | 🔴 | bg `Flat/sky/sky-50`, text `Flat/sky/sky-600`, icon `Flat/sky/sky-300` |
| Warning tokens | 🔴 | bg `surface/warning-background`, text `typography/text-warning` |
| Success tokens | 🔴 | bg `surface/success-background`, text `typography/text-success` |
| Destructive tokens | 🔴 | bg `surface/destructive-background`, text `typography/text-destructive` |
| Typography (label) | 🔴 | `type/xs/normal/semibold` (12/16/600) for Small · `type/xs/tight/semibold` for Medium |
| Padding | 🔴 | SM: `spacing/0-5` = 2 H · MD: `spacing/1` = 4 H, `spacing/0-5` = 2 V |
| Icon size | 🔴 | `width/w-6` = 24 in Medium variant |
| Position outset | ✅ | −4 px |

---

## 6. Switch (`760:21705`)

**Current docs status:** §13.24 has basic anatomy. Missing token-level details.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Track sizes | ✅ | SM 24×16 · MD 36×20 |
| Track radius | ✅ | `border radius/full` = 9999 |
| Thumb diameter | 🔴 | SM: 12 px · MD: 16 px |
| Thumb inset | ✅ | 2 px from track edge |
| Off track color | 🟡 | `Flat/zinc/zinc-200` (#e4e4e7) — docs say `surface/muted-background` |
| On track color | 🔴 | `BlogVault Brand/bv-emerald-900` (#064e3b) |
| Thumb color | ✅ | `surface/card-background` (#ffffff) |
| Shadow on thumb | 🔴 | `shadow/lg` |
| Disabled opacity | 🔴 | `opacity/opacity-50` |
| Focus ring | 🔴 | 2 px `BlogVault Brand/bv-emerald-900` offset 2 px |
| Label gap | 🔴 | `spacing/2` = 8 px |
| Label typography | 🔴 | `type/sm/tight/medium` (14/14/500) |

---

## 7. Checkbox (`767:25186`)

**Current docs status:** §13.26 covers sizes and states but lacks token bindings.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Sizes | ✅ | SM 16 · MD 24 |
| Radius | ✅ | `rounded` = 4 |
| Border (unchecked) | 🔴 | 1 px `surface/border` |
| Checked bg | 🔴 | `BlogVault Brand/bv-emerald-900` (#064e3b) |
| Check icon | 🔴 | `typography/text-white`, 12×12 (SM) / 16×16 (MD) |
| Indeterminate dash | 🔴 | 8 px × 2 px (SM) / 12 px × 2 px (MD), `typography/text-white` |
| Hover bg | 🔴 | `Flat/zinc/zinc-300` border |
| Focus ring | 🔴 | 2 px ring offset 2 px `BlogVault Brand/bv-emerald-900` |
| Error state | 🔴 | Border → `typography/text-destructive` |
| Disabled state | 🔴 | `opacity/opacity-50`, no pointer events |
| Shadow | 🔴 | `Box Shadow/shadow-sm` on focus |
| Label gap | ✅ | 8 px |
| Label typography | 🔴 | `type/sm/normal/regular` (14/20/400), `type/sm/tight/medium` for description |

---

## 8. Radio Button (`760:21131`)

**Current docs status:** §13.25 covers sizes but lacks complete token bindings.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Sizes | ✅ | SM 16 · MD 24 (docs say "Medium 24 px" — actually `width/w-4` = 16 for SM) |
| Outer ring | ✅ | 1 px `surface/border` |
| Selected ring color | 🔴 | `BlogVault Brand/bv-emerald-900` (#064e3b) — docs say `typography/text-primary` |
| Inner dot | ✅ | SM 8 · MD 12 |
| Inner dot color | 🔴 | `Flat/base/base-white` on selected |
| Hover state | 🔴 | Border darkens to `Flat/zinc/zinc-300` |
| Focus ring | 🔴 | 2 px ring offset 2 px |
| Disabled | 🔴 | `surface/muted-foreground` ring + dot, `opacity/opacity-50` on label |
| Shadow | 🔴 | `shadow/base` on focus |
| Label typography | 🔴 | `type/sm/normal/regular` (14/20/400) primary · `type/sm/tight/regular` secondary |

---

## 9. Card (`714:1619`)

**Current docs status:** §13.1 has basics. Missing several details.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Background | ✅ | `surface/card-background` |
| Border | ✅ | 1 px `surface/border` |
| Radius (default) | 🟡 | `radius/rounded_2` = 8 — docs say `radius/rounded_8` (same value) |
| Radius (large) | 🟡 | `border radius/xl` = 12 — docs say `radius/rounded_16` (**incorrect, actual is 12**) |
| Padding (default) | ✅ | 16 px |
| Padding (feature) | ✅ | 24 px |
| Shadow | 🔴 | `shadow/base` (default) · `shadow/lg` on hover for interactive cards |
| Title typography | 🟡 | `type/sm/tight/medium` (14/14/500) — docs say `type/base/tight/semibold` (different) |
| Body typography | 🔴 | `type/sm/normal/regular` (14/20/400) `typography/text-secondary` |
| Action icon | 🔴 | 16×16 in `typography/text-secondary` |
| Gap title → body | ✅ | 16 px |
| Header height | 🔴 | Content-driven, min 36 px (`height/h-9`) |
| Interactive hover | 🔴 | `shadow/lg` + scale(1.01) transition 200 ms |
| Disabled state | 🔴 | `opacity/opacity-50` overlay |

---

## 10. Modal (`2895:13114`)

**Current docs status:** §13.2 has good basics. Missing token-level details.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Width tiers | ✅ | SM 400, MD 560, LG 720, XL 960 |
| Padding | ✅ | 24 px |
| Radius | ✅ | `rounded-3xl` = 24 — wait, docs say `radius/rounded_16`. **Figma shows `rounded-3xl` = 24** |
| Shadow | 🔴 | `Box Shadow/shadow-lg` |
| Backdrop | 🟡 | `surface/page-background-content` at `alpha/80` — docs say `alpha/60` over `surface/overlay-background` |
| Header height | 🔴 | Content-driven, title `type/lg/normal/medium` (18/28/500) |
| Close button | 🔴 | 36×36 (`width/w-9`, `height/h-9`) icon-only button |
| Footer padding | 🔴 | `py-2` = 8 top, `px-4` = 16 sides |
| Divider | 🔴 | 1 px `surface/border` between header/body and body/footer |
| Body scroll | 🔴 | `overflow-y: auto`, max-height = viewport − 96 − header − footer |
| Animation | 🔴 | Scale 0.95 → 1.0 + fade, 200 ms ease-out |
| Title typography | 🔴 | `type/lg/normal/medium` (18/28/500) |
| Body typography | 🔴 | `type/sm/normal/regular` (14/20/400) |

---

## 11. Dialog Box (`740:48063`)

**Current docs status:** §13.3 has only one line. Almost entirely undocumented.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Width | ✅ | 400 px |
| Padding | ✅ | 24 px (`spacing/6`) |
| Radius | 🔴 | `rounded-3xl` = 24 |
| Shadow | 🔴 | `Box Shadow/shadow-lg` |
| Backdrop | 🔴 | Same as Modal |
| Title typography | 🔴 | `type/lg/normal/semibold` (18/28/600) |
| Body typography | 🔴 | `type/xs/normal/regular` (12/16/400) `typography/text-secondary` |
| Gap title → body | 🔴 | `spacing/2` = 8 |
| Gap body → buttons | 🔴 | `spacing_gap/gap_6` = 24 |
| Button alignment | ✅ | Right-aligned |
| Button types | 🔴 | Primary (destructive for delete confirms) + Secondary |
| Close icon | 🔴 | None (uses button dismiss only) |
| Animation | 🔴 | Same as Modal |

---

## 12. Drawer (`740:48142`)

**Current docs status:** §13.4 has basic dimensions. Missing tokens.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Width tiers | ✅ | 400, 560, 720 |
| Header height | ✅ | 64 px |
| Header padding | 🟡 | Figma: `spacing/4` = 16 all around — docs say 24 L/R, 16 T/B |
| Shadow | 🔴 | `shadow/sm` + `shadow/base` layered |
| Direction | 🔴 | Right (default) · Left · `surface/foreground` as overlay |
| Header typography | 🔴 | `type/lg/normal/medium` (18/28/500) |
| Close button | 🔴 | 32×32 icon-only, top-right |
| Body padding | 🔴 | `spacing/4` = 16 L/R, `spacing/3` = 12 T/B |
| Footer sticky | ✅ | Yes, sticky bottom |
| Footer height | 🔴 | Content-driven, min 56 px, padding `spacing/4` = 16 |
| Dividers | 🔴 | 1 px `surface/border` between header/body and body/footer |
| Animation | 🔴 | Slide from edge, 200 ms ease-out |
| Backdrop | 🔴 | `surface/foreground` at 20% opacity |

---

## 13. Tabs (`765:24083`)

**Current docs status:** §13.6 has decent coverage. Missing some tokens.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Trigger padding | 🟡 | H: `spacing/3` = 12, V: `spacing/2` = 8 — docs say 16 H / 8 V |
| Active underline | ✅ | 2 px bottom border |
| Active underline color | 🟡 | `Flat/emerald/emerald-600` (#059669) — docs say `typography/text-primary` |
| Active text | ✅ | `typography/text-primary` |
| Inactive text | ✅ | `typography/text-secondary` |
| Tab container radius | 🔴 | `radius/rounded_2` = 8 (for pill/segmented variants) |
| Tab container bg | 🔴 | `surface/card-background` with `shadow/sm` |
| Gap between tabs | ✅ | 0 |
| Pill variant padding | 🔴 | `spacing/2` = 8 H, `spacing/1` = 4 V |
| Pill active bg | 🔴 | `surface/card-background` with `shadow/sm` |
| Tab height | 🔴 | Content-driven, typically 40 px |
| Icon size in tab | 🔴 | 16×16 with `spacing_gap/gap_0,5` = 2 gap to label |

---

## 14. Tooltip (`725:4120`)

**Current docs status:** §13.7 has good coverage. Minor token refinements.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Padding | ✅ | 8 H · 4 V (docs: 8 H · 4 V) — actually Figma shows `p-1,5` = 6, `px-3` = 12 |
| Radius | 🟡 | `border radius/lg` = 8 — docs say `radius/rounded_4` = 16 (**mismatch**) |
| Background | 🟡 | `Flat/zinc/zinc-950` (#09090b) — docs say `surface/overlay-background` with `alpha/90` |
| Text color | ✅ | `typography/text-white` |
| Typography | ✅ | `type/xs/normal/medium` (12/16/500) — docs say `type/xs/normal/medium` ✓ |
| Arrow size | ✅ | 8 px |
| Shadow | 🔴 | `Box Shadow/shadow` (base shadow) |
| Max width | 🔴 | 320 px |
| Delay (show) | 🔴 | 200 ms |
| Delay (hide) | 🔴 | 0 ms |

---

## 15. Toast (`3265:24290`)

**Current docs status:** §13.8 has good basics. Missing some tokens.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Width | ✅ | 360 px (docs: 360) — Figma shows flexible |
| Padding | ✅ | 16 px |
| Radius | 🟡 | `border radius/lg` = 8 — confirmed |
| Shadow | 🔴 | `shadow/lg` |
| Icon size | ✅ | 24×24 (`width/w-6`) |
| Close button | 🔴 | 24 px icon-only, top-right |
| Title typography | 🔴 | `type/sm/normal/semibold` (14/20/600) `typography/text-black` |
| Body typography | 🔴 | `type/sm/normal/regular` (14/20/400) `typography/text-secondary` |
| Success tokens | 🔴 | Icon `typography/text-success`, accent border left 3 px `Flat/emerald/emerald-700` |
| Destructive tokens | 🔴 | Icon `typography/text-destructive`, accent `surface/destructive-foreground` |
| Background | 🔴 | `surface/card-background` |
| Border | 🔴 | 1 px `surface/border` |
| Auto-dismiss | ✅ | 4 s |
| Slide animation | ✅ | 240 ms |
| Stack offset | 🔴 | 8 px between stacked toasts |

---

## 16. Breadcrumb (`714:41570`)

**Current docs status:** §13.13 has good coverage. Minor gaps.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Text style | ✅ | `type/sm/normal/medium` (14/20/500) — docs say `type/sm/normal/medium` ✓ |
| Separator icon | ✅ | chevron-right 16×16 |
| Separator color | 🟡 | `typography/text-secondary` — docs say `typography/text-tertiary` |
| Item gap | ✅ | 8 px |
| Active color | ✅ | `typography/text-primary` |
| Earlier items | ✅ | `typography/text-secondary` |
| Hover color | 🔴 | `Flat/emerald/emerald-700` underline — docs say `typography/text-primary` |
| Link style | 🔴 | `type/sm/tight/regular` (14/14/400) for links, no underline until hover |
| Icon size (home) | 🔴 | 20×20 (`width/w-5`, `height/h-5`) |
| Max items before truncation | ✅ | Overflow into `…` menu |

---

## 17. Pill (`725:4080`)

**Current docs status:** §13.12 has good coverage. Missing per-variant token map.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Sizes | ✅ | SM 24 h · MD 32 h |
| Padding | ✅ | SM 8 H · MD 16 H |
| Radius | ✅ | `border radius/full` = 9999 |
| Neutral tokens | 🔴 | bg `Flat/zinc/zinc-100`, text `typography/text-primary`, border `surface/border` |
| Success tokens | 🔴 | bg `surface/success-background` (#ecfdf5), text `typography/text-success`, icon `Flat/emerald/emerald-50` |
| Informative tokens | 🔴 | bg `Flat/sky/sky-50`, text `Flat/sky/sky-600` |
| Warning tokens | 🔴 | bg `surface/warning-background` (#fffbeb), text `typography/text-warning` |
| Destructive tokens | 🔴 | bg `surface/destructive-background` (#fef2f2), text `typography/text-destructive` |
| Typography (SM) | 🔴 | `type/xs/normal/medium` (12/16/500) |
| Typography (MD) | 🔴 | `type/sm/normal/medium` (14/20/500) |
| Icon size | 🔴 | SM: 8 (`width/w-2`), MD: 16 (`width/w-4`) |
| Gap icon → text | 🔴 | `spacing/1` = 4 |
| Pill Button hover | ✅ | alpha/10 darken |
| Pill Button pressed | ✅ | alpha/20 darken |
| Shadow | 🔴 | `shadow/md` on outlined variants |

---

## 18. Forms (`740:48440`)

**Current docs status:** Listed in §6.3 but **NO §13 entry**.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Single form width | 🔴 | Max `max-w-sm` = 384 px |
| Double form width | 🔴 | Full content area, 2-column grid |
| Form gap (between fields) | 🔴 | `spacing/3` = 12 |
| Section gap | 🔴 | `spacing/6` = 24 |
| Label typography | 🔴 | `type/sm/tight/medium` (14/14/500) |
| Required indicator | 🔴 | Red asterisk `typography/text-destructive` |
| Helper text | 🔴 | `type/xs/normal/regular` (12/16/400) `typography/text-secondary` |
| Error text | 🔴 | `type/xs/tight/regular` (12/12/400) `typography/text-destructive` |
| Button group gap | 🔴 | `spacing_gap/gap_4` = 16 |
| Form background | 🔴 | `surface/page-background-content` or `surface/card-background` in cards |
| Border | 🔴 | None on single, `surface/border` on double form function block |
| Radius | 🔴 | `border radius/lg` = 8 on double form function block |

---

## 19. Navigation Bars (`1:9297`)

**Current docs status:** Referenced in §4 layout but **NO dedicated §13 entry**.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| **Top Nav** | | |
| Height | ✅ | 80 px (in §4) |
| Background | 🔴 | `surface/navigation-background` (#ffffff) |
| Shadow | 🔴 | `Box Shadow/shadow-sm` bottom edge |
| Padding | ✅ | 20 T/B, 24 R, 16 L |
| Logo area | 🔴 | 28 h × auto w, left-aligned |
| Nav item typography | 🔴 | `type/sm/tight/medium` (14/14/500) |
| Nav item gap | 🔴 | `spacing_gap/gap_2` = 8 |
| Nav item height | 🔴 | 28 h (`height/h-7`) |
| Active nav item | 🔴 | `typography/text-primary`, `Flat/emerald/emerald-50` bg, `border radius/md` = 6 |
| Account menu | 🔴 | Avatar 32 md + dropdown |
| **Sidebar** | | |
| Open width | ✅ | 296 px (in §4) |
| Collapsed width | ✅ | 48 px |
| Background | 🔴 | `surface/page-background-content` (#fdfdfd) |
| Border right | 🔴 | 1 px `surface/border` |
| Menu item height | 🔴 | 32 px |
| Menu item padding | 🔴 | `px-3` = 12, `py-2` = 8 |
| Menu item radius | 🔴 | `border radius/md` = 6 |
| Active menu item | 🔴 | `Flat/emerald/emerald-50` bg, `BlogVault Brand/bv-emerald-900` text |
| Hover menu item | 🔴 | `Flat/zinc/zinc-100` bg |
| Icon size | 🔴 | 16×16 (`width/w-4`) |
| Gap icon → label | 🔴 | `spacing_gap/gap_2` = 8 |
| Section header | 🔴 | `type/xs/tight/medium` in `typography/text-tertiary`, 24 px top margin |
| Collapsed tooltip | 🔴 | Show tooltip on hover when collapsed |
| **Mobile Nav** | | |
| Height | 🔴 | 56 px |
| Hamburger icon | 🔴 | 24×24, opens Sheet Slider sidebar |

---

## 20. Tables (`677:36341`)

**Current docs status:** Listed in §6.3 with component keys but **NO §13 anatomy entry**.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Cell height | 🔴 | 72 h (`height/h-18`) default, 40 compact |
| Cell padding | 🔴 | `pl-4` = 16 L, `py-4` = 16 V, `spacing/2-5` = 10 R |
| Head height | 🔴 | 40 px (`height/h-10`) |
| Head typography | 🔴 | `type/sm/normal/medium` (14/20/500) `typography/text-secondary` |
| Head background | 🔴 | `Flat/zinc/zinc-50` (#fafafa) |
| Cell typography | 🔴 | `type/sm/normal/regular` (14/20/400) `typography/text-primary` |
| Cell secondary text | 🔴 | `type/xs/normal/regular` (12/16/400) `typography/text-secondary` |
| Row border | 🔴 | 1 px `surface/border` bottom |
| Row hover | 🔴 | `Flat/zinc/zinc-50` bg |
| Row selected | 🔴 | `Flat/emerald/emerald-50` bg |
| Checkbox column width | 🔴 | 44 px (`width/w-11`) |
| Action column | 🔴 | Right-aligned, icon-only buttons 32×32 |
| Sort icon | 🔴 | 16×16 in head, `typography/text-secondary` |
| Footer height | 🔴 | 56 px, padding 16 |
| Pagination in footer | 🔴 | Right-aligned, uses Pagination component |
| Bulk action bar | 🔴 | 48 h, padding 12, `surface/card-background`, sticky bottom, `shadow/sm` |
| Column-major layout | 🔴 | Vertical auto-layout columns inside horizontal Columns frame |
| Stripe alt-row | 🔴 | Optional — `Flat/zinc/zinc-50` on even rows |

---

## 21. Calendar (`709:2283`)

**Current docs status:** §13.20 has basics. Missing tokens.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Cell size | ✅ | 32×32 |
| Grid gap | ✅ | 0 |
| Header height | ✅ | 48 px |
| Month/year typography | 🔴 | `type/sm/tight/semibold` (14/14/600) |
| Day label typography | 🔴 | `type/xs/tight/regular` (12/12/400) `typography/text-secondary` |
| Day number typography | 🔴 | `type/sm/normal/regular` (14/20/400) |
| Today ring | 🟡 | 1 px ring `surface/border` — docs say `typography/text-url` |
| Selected fill | 🔴 | `BlogVault Brand/bv-emerald-900` bg, `typography/text-white` text |
| Range fill (middle) | 🔴 | `Flat/zinc/zinc-100` bg |
| Nav arrows | 🔴 | 16×16 icon, `spacing/2` = 8 gap from month text |
| Disabled day | 🔴 | `opacity/opacity-50` on text, no pointer events |
| Cell radius | 🔴 | `radius/rounded_2` = 8 |
| Padding (outer) | ✅ | 16 px |
| Shadow | 🔴 | `shadow/base` when in popover |

---

## 22. Command Search (`767:25331`)

**Current docs status:** §13.21 has good basics. Missing tokens.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Width | ✅ | 640 px |
| Max height | ✅ | 480 px |
| Radius | ✅ | `radius/rounded_2` = 8 — wait, docs say `radius/rounded_16`. Figma: `border radius/lg` = 8 |
| Input height | 🔴 | 40 px (`height/h-10`) |
| Row height | ✅ | 40 px |
| Row padding | ✅ | 16 L/R, 8 gap |
| Section header style | ✅ | `type/xs/tight/medium` in `typography/text-tertiary` |
| Shadow | 🔴 | `shadow/md` |
| Backdrop | 🔴 | Same as Modal backdrop |
| Border | 🔴 | 1 px `surface/border` |
| Active row bg | 🔴 | `Flat/zinc/zinc-100` |
| Icon size | 🔴 | 16×16 (`width/w-4`) |
| Keybind typography | 🔴 | `type/xs/normal/regular` (12/16/400) `typography/text-secondary` |
| Footer height | ✅ | 32 px |
| Search icon | 🔴 | 16×16 `typography/text-secondary` in input |
| Empty state | 🔴 | `type/sm/normal/regular` centered, `typography/text-secondary` |

---

## 23. Carousel (`740:35021`)

**Current docs status:** §13.22 has basics. Missing tokens.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Item gap | ✅ | 16 px default, 24 px large |
| Arrow size | ✅ | 40×40 |
| Arrow bg | 🔴 | `surface/card-background` (#ffffff) |
| Arrow border | 🔴 | `surface/border`, `border radius/full` = 9999 |
| Arrow shadow | 🔴 | `shadow/sm` |
| Arrow icon | 🔴 | 16×16 `typography/text-black` |
| Dot size | ✅ | 8 px |
| Dot gap | ✅ | 8 px |
| Dot active color | 🔴 | `typography/text-black` |
| Dot inactive color | 🔴 | `Flat/zinc/zinc-200` |
| Dot active opacity | 🔴 | `opacity/opacity-100` vs inactive `opacity/opacity-50` |
| Peek amount | ✅ | 1 partial item visible |
| Snap scroll | ✅ | `scroll-snap-x` |
| Container radius | 🔴 | `border radius/xl` = 12 |

---

## 24. Stepper (`4543:6474`)

**Current docs status:** §13.16 has basics. Missing tokens.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Step circle size | ✅ | 24 px |
| Circle bg (pending) | 🔴 | `Flat/zinc/zinc-300` |
| Circle bg (current) | 🔴 | `BlogVault Brand/bv-emerald-900` |
| Circle bg (complete) | 🔴 | `BlogVault Brand/bv-emerald-700` |
| Circle bg (error) | 🔴 | `typography/text-destructive` |
| Circle text | 🔴 | `typography/text-white` for current/complete, `typography/text-primary` for pending |
| Number typography | 🔴 | `type/xs/normal/medium` (12/16/500) |
| Label gap | ✅ | 8 px |
| Label typography | 🔴 | `type/xs/tight/regular` (12/12/400) `typography/text-secondary`, active: `type/xs/normal/medium` |
| Step gap | ✅ | 24 px |
| Connector line | ✅ | 1 px |
| Connector incomplete | ✅ | `surface/border` |
| Connector complete | ✅ | `BlogVault Brand/bv-emerald-700` |
| Vertical gap | 🔴 | `spacing_gap/gap_2` = 8 between step items |

---

## 25. Progress (`1:35002`)

**Current docs status:** §13.27 has good structure. Missing tokens.

| Detail | Status | Correct Value (from Figma) |
|--------|--------|---------------------------|
| Linear height | ✅ | 8 px |
| Linear radius | ✅ | `border radius/full` = 9999 |
| Track color | 🔴 | `Flat/zinc/zinc-100` (#f4f4f5) |
| Fill color | 🔴 | `BlogVault Brand/bv-emerald-600` (#059669) |
| Circular diameters | ✅ | 24, 32, 40, 48 |
| Circular stroke | ✅ | 4 px |
| Ring diameters | ✅ | 64, 80 |
| Ring stroke | ✅ | 8 px |
| Ring center text | ✅ | `type/lg/tight/semibold` — Figma shows varied per size |
| Indeterminate animation | ✅ | 1600 ms loop |
| Success fill | 🔴 | `BlogVault Brand/bv-emerald-700` |
| Warning fill | 🔴 | `typography/text-warning` |
| Destructive fill | 🔴 | `typography/text-destructive` |
| Label typography | 🔴 | `type/sm/tight/medium` (14/14/500) |
| Value typography | 🔴 | `type/micro-10/normal/regular` (10/14/400) or larger per ring size |

---

## 26–34. Additional Components (brief missing items)

### 26. Separator (`760:21263`)
| Missing | Value |
|---------|-------|
| Thickness | 🔴 1 px (`height/h-5` = 20 is the container, stroke is 1 px) |
| Color | 🔴 `surface/border` (#e4e4e6) |
| Margin | 🔴 `spacing/2` = 8 default |
| Orientation text | 🔴 `typography/text-white` label on dark bg (32 w container) |

### 27. Skeleton (`760:21454`)
| Missing | Value |
|---------|-------|
| Background | 🔴 `Flat/zinc/zinc-200` (#e4e4e7) |
| Radius (text) | 🔴 `border radius/md` = 6 |
| Radius (avatar) | 🔴 `border radius/full` = 9999 |
| Radius (card) | 🔴 `border radius/xl` = 12 |
| Animation | 🔴 Pulse on `Flat/zinc/zinc-200` ↔ `surface/card-background`, 1400 ms ease-in-out — docs say 1400 ms (close to stated) |
| Line height | 🔴 16 px (`height/h-4`) for text lines |
| Gap between lines | 🔴 `spacing/2` = 8 |
| Avatar placeholder | 🔴 48×48 (`width/w-12`, `height/h-12`) circle |

### 28. Range Slider (`760:21488`)
| Missing | Value |
|---------|-------|
| Track height | 🔴 6 px (`height/h-1,5`) |
| Track color | 🔴 `Flat/zinc/zinc-200` |
| Fill color | 🔴 `BlogVault Brand/bv-emerald-900` |
| Thumb size | 🔴 16×16 (`width/w-4`, `height/h-4`) |
| Thumb shadow | 🔴 `shadow/base` |
| Mark tick height | 🔴 8 px |

### 29. Indicator (`725:4117`)
| Missing | Value |
|---------|-------|
| Colors per status | 🔴 Success: `Flat/emerald/emerald-100`/`typography/text-success` · Destructive: `surface/destructive-background`/`typography/text-destructive` · Warning: `surface/warning-background`/`Flat/amber/amber-600` |
| Pulse animation | 🔴 Scale 1.0 → 1.4 → 1.0, 2000 ms infinite |
| Label typography | 🔴 `type/xs/normal/regular` (12/16/400) |
| Step number typography | 🔴 `type/xs/tight/regular` |

### 30. Feedback (`682:40910`)
| Missing | Value |
|---------|-------|
| Padding | 🔴 `p-4` = 16, `px-4` = 16 |
| Radius | 🔴 `rounded` = 4 or `rounded-2xl` = 16 |
| Icon size | 🔴 16×16 |
| Title typography | 🔴 `type/sm/tight/semibold` (14/14/600) |
| Body typography | 🔴 `type/xs/tight/regular` (12/12/400) |
| Success variant | 🔴 bg `surface/success-background`, left border 3 px `Flat/emerald/emerald-700`, icon `typography/text-success` |
| Warning variant | 🔴 bg `surface/warning-background`, left border 3 px `Flat/amber/amber-600`, icon `typography/text-warning` |
| Destructive variant | 🔴 bg `surface/destructive-background`, left border 3 px `typography/text-destructive` |
| Info variant | 🔴 bg `Flat/sky/sky-50`, left border 3 px `Flat/sky/sky-700`, icon `Flat/sky/sky-600` |
| Dismiss button | 🔴 16×16 icon, right-aligned |

### 31. Notification / Running Task (`714:39981`)
| Missing | Value |
|---------|-------|
| Item border | 🔴 1 px `surface/border` bottom |
| Item bg hover | 🔴 `Flat/zinc/zinc-100` |
| Title typography | 🔴 `type/sm/tight/medium` (14/14/500) |
| Subtext typography | 🔴 `type/xs/tight/regular` (12/12/400) `typography/text-secondary` |
| Time typography | 🔴 `type/xs/tight/regular` `typography/text-tertiary` |
| Status icon | 🔴 24×24, color per status variant |
| Tray shadow | 🔴 `Box Shadow/shadow-lg` |
| Tray radius | 🔴 `radius/rounded_4` = 16 |

### 32. Pre-Checks (`3265:23116`)
| Missing | Value |
|---------|-------|
| Status icon (success) | 🔴 `Flat/emerald/emerald-700` check |
| Status icon (error) | 🔴 `typography/text-destructive` cross |
| Blur backdrop | 🔴 `backdrop-blur/3xl` = 64 |
| Running state | 🔴 Spinner icon replacing status dot |

### 33. Pagination (`744:8520`)
| Missing | Value |
|---------|-------|
| Button size | 🔴 36×36 (`width/w-9`, `height/h-9`) |
| Radius | 🔴 `border radius/md` = 6 |
| Active bg | 🔴 `Flat/emerald/emerald-800` text `typography/text-white` |
| Inactive | 🔴 `typography/text-primary` text, transparent bg |
| Hover | 🔴 `Flat/zinc/zinc-100` bg |
| Disabled | 🔴 `opacity/opacity-50` |
| Gap | 🔴 `spacing/1` = 4 |
| Shadow | 🔴 `shadow/sm` on active |

### 34. Menu / Dropdown (`767:25527`)
| Missing | Value |
|---------|-------|
| Width | 🔴 Min 200 px, max 320 px |
| Padding (outer) | 🔴 `spacing/1` = 4 |
| Item height | 🔴 32 px |
| Item padding | 🔴 `px-3` = 12, `py-2` = 8 |
| Item radius | 🔴 `border radius/sm` = 2 |
| Item hover bg | 🔴 `Flat/zinc/zinc-100` |
| Active item | 🔴 `Flat/zinc/zinc-100` bg, check icon right |
| Separator | 🔴 1 px `surface/border`, `spacing_gap/gap_0,5` = 2 V margin |
| Section label | 🔴 `type/xs/normal/medium` (12/16/500) `typography/text-secondary`, padding `spacing/1` = 4 |
| Icon size | 🔴 16×16 (`width/w-4`) |
| Shadow | 🔴 `shadow/md` |
| Radius | 🔴 `radius/rounded_3` = 12 |
| Border | 🔴 1 px `surface/border` |
| Destructive item text | 🔴 `typography/text-destructive` |
| Nested arrow | 🔴 8 px chevron-right |

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Total findings | **~280** |
| 🔴 Critical (completely missing) | **~195** |
| 🟠 High (partially documented) | **~25** |
| 🟡 Medium (imprecise/outdated) | **~15** |
| ✅ Already correct | **~45** |

### Top Priority Components (most missing anatomy)

1. **Button** — Zero §13 entry, 18+ missing details
2. **Input Fields** — Zero §13 entry, 16+ missing details
3. **Navigation Bars** — Zero §13 entry, 25+ missing details  
4. **Tables** — Zero §13 entry, 17+ missing details
5. **Forms** — Zero §13 entry, 12+ missing details
6. **Accordion** — Zero §13 entry, 14+ missing details
7. **Menu/Dropdown** — Zero §13 entry, 15+ missing details

### Key Corrections Needed

1. **Card large radius**: Docs say `radius/rounded_16` → actual Figma `border radius/xl` = **12**
2. **Modal radius**: Docs say `radius/rounded_16` → actual Figma `rounded-3xl` = **24**
3. **Tooltip radius**: Docs say `radius/rounded_4` = 16 → actual Figma `border radius/lg` = **8**
4. **Tooltip padding**: Docs say 8H/4V → actual Figma `p-1,5`/`px-3` = **6/12**
5. **Tab underline color**: Docs say `typography/text-primary` → actual `Flat/emerald/emerald-600`
6. **Switch off track**: Docs say `surface/muted-background` → actual `Flat/zinc/zinc-200`
7. **Radio selected ring**: Docs say `typography/text-primary` → actual `BlogVault Brand/bv-emerald-900`
8. **Breadcrumb separator color**: Docs say `typography/text-tertiary` → actual `typography/text-secondary`
9. **Modal backdrop alpha**: Docs say `alpha/60` → actual `alpha/80`
