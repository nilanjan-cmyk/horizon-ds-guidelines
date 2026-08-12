---
name: horizon-ds-tokens
description: >
  Lightweight token-only context for Horizon DS — colors (Light/Dark), spacing
  (rem-based gap_ naming), radius (rem-based rounded_ naming), opacity (sequential
  0–20), stroke-width, typography, and effects. Loads fast; use when you only
  need to bind values, not pick components.
when_to_use: >
  Use when binding colors, spacing, radius, opacity, or typography to a node or
  CSS class and you don't need the full component catalog. Also use for quick
  token lookups, Tailwind config generation, or CSS variable reference.
allowed-tools: Read Grep
---

# Horizon DS — tokens

This is the minimum a Horizon-aware build needs. Always prefer Tier 0 (Variables) tokens. Never raw values.

## Color tokens (Mode collection · Light + Dark)

```yaml
surface:
  page-background-content
  page-background-backlight
  header-background
  navigation-background
  card-background
  widget-background
  muted-background
  overlay-background
  border
  destructive-background
  warning-background
  success-background
typography:
  text-primary
  text-secondary
  text-tertiary
  text-white
  text-black
  text-destructive
  text-warning
  text-success
  text-url        # links + focus ring
alpha:    [10, 20, 30, 40, 50, 60, 70, 80, 90]
charts:   [Chart 1, Chart 2, Chart 3, Chart 4, Chart 5]
```

## Spacing scale (rem-based naming, 1 rem = 4 px)

**Allowed gutter / padding / gap values:** `0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80` and all multiples of 8 up to 240.

Token path: `spacing_gap/gap_{value÷4}` — e.g. `gap_4` = 16 px, `gap_6` = 24 px, `gap_0,5` = 2 px.

Full canonical set: `gap_0, gap_0,5, gap_1, gap_2, gap_3, gap_4, gap_5, gap_6, gap_8, gap_10, gap_12, gap_14, gap_16, gap_18, gap_20, gap_22, gap_24, gap_26, gap_28, gap_30, …, gap_60`.

Anything off the multiples-of-8 list is reserved for component internals — do not reach for it in new layouts.

## Radius (rem-based naming)

Token path: `radius/rounded_{value÷4}` — e.g. `rounded_2` = 8 px, `rounded_4` = 16 px, `rounded_0,5` = 2 px.

Canonical set: `rounded_0, rounded_0,5, rounded_1, rounded_1,5, rounded_2, rounded_2,5, rounded_3, rounded_3,5, rounded_4, …, rounded_20, rounded_9999`.

Pill = `rounded_9999`.

## Opacity (sequential 0–20)

Token path: `opacity/opacity_{n}` — each step = 5%.

`opacity_0` = 0%, `opacity_1` = 5%, `opacity_2` = 10%, …, `opacity_10` = 50%, …, `opacity_20` = 100%.

## Stroke-width (rem-based naming)

Token path: `stroke-width/border-{value÷4}`.

`border-0` = 0 px, `border-0,25` = 1 px, `border-0,5` = 2 px, `border-1` = 4 px, `border-2` = 8 px.

## Typography

Family **Inter**. Naming: `type/{size}/{lh}/{weight}` — e.g. `type/sm/normal/medium`.

| Size | px | LH-tight | LH-normal |
|---|---|---|---|
| xs | 12 | 12 | 16 |
| sm | 14 | 14 | 20 |
| base | 16 | 16 | 24 |
| lg | 18 | 18 | 28 |
| xl | 20 | 20 | 28 |
| 2xl | 24 | 24 | 32 |
| 3xl | 30 | 30 | 36 |
| 4xl/5xl/6xl/7xl | 36 / 48 / 60 / 72 | — | — |

Defaults: Page Title `type/2xl/tight/semibold` · Body `type/sm/normal/regular` · Button `type/sm/tight/medium` · Helper `type/xs/normal/regular`.

## Shadows (effects)

`shadow-sm, shadow-base, shadow-md, shadow-lg, shadow-xl, shadow-2xl, shadow-inner`.

## How to apply

- **Figma plugin API:** `importVariableByKeyAsync` → `setBoundVariableForPaint` (the returned paint is NEW — capture and reassign). For text: `importStyleByKeyAsync` + `node.textStyleId = style.id`.
- **Tailwind:** generate config that mirrors these tokens (see design.md §3.4).
- **CSS vars:** `--surface-card-background`, `--text-primary`, etc. — sync command regenerates `tokens.css`.
