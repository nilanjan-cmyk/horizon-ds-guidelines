# Horizon · Design Tokens

Auto-generated from the Horizon Design System Figma file (`UfHICFSU9PJl9OkE84mUk9`). Drop these into any web project for full token coverage — colors (Light + Dark), spacing, radius, sizing, typography, and shadows.

## Files

| File | Size | Purpose |
|---|---|---|
| `variables.css` | ~16 kB | All **primitive** tokens. 22 color ramps × 11 shades + 8 brand ramps + radius/spacing/sizing/typography/blur/opacity primitives. Load this **before** `tokens.css`. |
| `tokens.css` | ~18 kB | All **semantic** tokens with full Light + Dark mode + 84 named typography ramp classes (`type/sm/normal/medium`, etc.) + 7 shadow tokens. Auto-imports `variables.css`. |
| `tokens.json` | ~76 kB | DTCG-shaped JSON for tooling (Style Dictionary, Tokens Studio, Theo). |
| `tailwind.tokens.js` | ~27 kB | Tailwind preset — drop into `presets:[]` in your `tailwind.config.js`. |
| `build-tokens.mjs` | — | The builder. Re-run `node build-tokens.mjs` whenever Horizon variables drift. |

## Quick start (CSS)

```html
<link rel="stylesheet" href="tokens.css">
<!-- variables.css is auto-imported -->
```

```css
.btn-primary {
  background: var(--surface-card-background);
  color: var(--text-primary);
  border-radius: var(--radius-8);
  padding: var(--spacing-8) var(--spacing-16);
  box-shadow: var(--shadow-sm);
}
```

## Light / Dark mode

```html
<!-- explicit -->
<html data-theme="dark"> ... </html>

<!-- or follow OS preference automatically -->
<html> <!-- no data-theme, will use prefers-color-scheme -->
```

## Tailwind

```js
// tailwind.config.js
module.exports = {
  presets: [require('./tokens/tailwind.tokens.js')],
  // ...your overrides
};
```

```jsx
<button className="bg-surface-card text-text-primary rounded-8 p-16 shadow-sm">
  Save
</button>
```

## DTCG / Style Dictionary

```bash
npx style-dictionary build --config sd.config.json   # consumes tokens.json
```

## Naming conventions

```
Primitive          --zinc-50, --emerald-500, --bv-emerald-500 (brand)
Semantic surface   --surface-card-background, --surface-page-background-content
Semantic text      --text-primary, --text-destructive, --text-url
Alpha              --alpha-10 through --alpha-90
Charts             --chart-1 through --chart-5
Radius             --radius-0, --radius-2, --radius-4, …, --radius-80, --radius-9999
Spacing            --spacing-0, --spacing-1, --spacing-2, …, --spacing-384
Sizing             --size-0, --size-1, …, --size-384
Breakpoints        --breakpoint-sm, --breakpoint-md, …, --breakpoint-8xl
Border             --border-0, --border-1, --border-2, --border-4, --border-8
Opacity            --opacity-0, --opacity-5, …, --opacity-100  (decimal: 0–1)
Blur               --blur-sm, --blur-md, … and --backdrop-blur-*
Typography         --font-family-primary, --font-weight-medium, --font-size-sm, --line-height-5, --tracking-tight
Shadows            --shadow-sm, --shadow-base, --shadow-md, --shadow-lg, --shadow-xl, --shadow-2xl, --shadow-inner
Type ramps         84 classes  (e.g.  .type\/sm\/normal\/medium)
```

## Spacing rule reminder

The Horizon Layout collection ships **every** integer for completeness. Your **layouts** must use only multiples-of-8 (with `2` and `4` as the sub-8 exceptions): `0, 2, 4, 8, 16, 24, 32, 40, 48, 56, 64, 72, …`. The other tokens exist for component internals only.

## Versioning

Source Figma file: `UfHICFSU9PJl9OkE84mUk9`. Last sync: 2026-05-06.
