# Horizon · AI Design Deployment — Deliverables

> **Built:** 2026-05-04 · **Source DS:** `⚙️ Horizon Design System ✨` (Figma `UfHICFSU9PJl9OkE84mUk9`).

This folder contains every artifact produced for the Figma ↔ Code AI bridge.

## 📦 Plugin download

**[horizon-ds-plugin.zip](horizon-ds-plugin.zip)** — the entire kit as a Claude Code plugin (manifest, 2 agents, 4 skills, 4 slash-commands, all reference docs). Unzip into `~/.claude/plugins/` (or `<project>/.claude/plugins/`) and restart Claude Code.

## Files

| File | Purpose | Audience |
|---|---|---|
| `index.html` | **Open this in a browser** — beautiful viewer for all deliverables, with download buttons and Cmd+P → PDF export. | Everyone |
| `Guidelines_Product Design.md` | Canonical human-readable design guideline. Replaces the original PDF. Nomenclature aligned to Horizon DS. Component reference covers every Horizon component (§13). Spacing rule enforces multiples-of-8 only. | Designers, Reviewers |
| `design.md` | The machine-readable bridge between Figma and code. Read by every AI agent before generation. Covers 4 workflows (brief→Figma, Figma→code, code→Figma, local preview). | AI agents (Claude, Codex, Cursor, v0…), Engineers |
| `product-designer.agent.md` | The **Atlas** Claude Code agent — owns Figma. Installs at `.claude/agents/product-designer.md`. Auto-invoked for design generation, audits, and Figma↔code translation. | Claude Code |
| `sirius.agent.md` | The **Sirius** Claude Code agent — owns frontend code. Installs at `.claude/agents/sirius.md`. Auto-invoked for design→code conversion (across 9 frameworks), code→code transpilation, frontend audits/restructures, and API wiring. Chains `/frontend-design` · `/figma-use` · `/figma-implement-design` · `/rad-spacing` · `/apply-design-system` · `/audit-design-system` · `/ux-copy` · `/design-critique` · `/design-handoff`. | Claude Code |

## How to view & download

1. **Open `index.html`** in any browser (double-click works).
2. Switch tabs to read each document.
3. Click **↓ Download current** to save the markdown.
4. Click **⌘ Print to PDF** (or `Cmd+P → Save as PDF`) to export a print-ready PDF of the current document.

## What changed vs the v1 PDF

- **Nomenclature aligned** to actual Horizon DS naming (Mode tokens, Layout tokens, type-style ramp).
- **Defined every previously-undefined term** from v1's nomenclature list (Card, Band, Accordion, Step-Wizard, Pill, Multi-select, Stroke/Outline, Layout, Grid, Gutter, Column).
- **Added 8 new pattern sections** missing from v1: Modal, Drawer, Sheet Slider, Tabs, Tooltip, Toast, Empty State, Skeleton, Search bar, Pill / Pill Button, Card sizing, Dialog Box.
- **Added §3 Tokens** (semantic + layout + type) with concrete token names from the live Figma file.
- **Added §14 Accessibility** non-negotiables.
- **Added §15 Audit Checklist** — usable as a PR template.
- **Added §16 Glossary changes** — explicit v1→v2 rename map.

## How `design.md` works

`design.md` is the bridge file. Any AI agent — Claude, Claude Code, Codex, Cursor, v0, Lovable, Bolt — reads it before generating UI. It supports four directions:

1. **Brief → Figma:** describe a screen in English, agent assembles it in Figma using only Horizon components.
2. **Figma → code:** point at a Figma URL or YAML spec, agent emits production code in any of 9 supported frameworks (React+Tailwind, Vue 3, plain HTML/CSS, SwiftUI, Flutter, Jetpack Compose, Qt/C++, PySide6, Java Swing).
3. **Code → Figma:** parse existing JSX/Vue/HTML, agent reconstructs the Figma design.
4. **Local preview:** agent builds a UI and verifies it locally without ever opening Figma.

It mirrors every option from the Figma Specs plugin panel (Output & AI options, Layer breakdown details, What to include) so the same options can be passed via CLI, MCP, or YAML front-matter.

## How the Atlas agent works

`product-designer.agent.md` is a Claude Code subagent definition. To install:

```bash
mkdir -p .claude/agents
cp deliverables/product-designer.agent.md .claude/agents/product-designer.md
```

Once installed, Claude Code will auto-invoke Atlas whenever the conversation involves design generation, Figma-to-code translation, or design system audits. Atlas:

- Reads `/design.md` and the Guidelines on every invocation.
- Always invokes the `figma-use` skill before any Figma plugin API call.
- Refuses to hardcode hex / px values.
- Runs three workflows: generate (brief→Figma), implement (Figma→code), audit (review existing).

## Source-of-truth Figma files

- **Horizon Design System:** https://www.figma.com/design/UfHICFSU9PJl9OkE84mUk9
- **WPRemote 2025:** https://www.figma.com/design/yIuvcjSVP4CRU4vhQxyRwl

## Contributing

`design.md` is treated as code. Open a PR with:
1. The Horizon node / component key / token being formalized.
2. Updates to both `Guidelines_Product Design.md` and `design.md` if the change is human- and machine-relevant.
3. A bumped `last_synced` date in the front-matter.
