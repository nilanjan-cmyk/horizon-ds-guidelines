# Horizon Design System — Claude Code Plugin

A single drop-in plugin that gives any Claude Code project the full Horizon DS toolkit: two agents, four skills, four slash-commands, and the canonical reference docs (Guidelines, design.md, component keys).

**Total plugin size:** ~149 kB across 15 files.

## What's inside

```
horizon-ds-plugin/
├── .claude-plugin/
│   └── plugin.json                       # manifest (Anthropic plugin schema)
├── README.md                             # this file
├── agents/
│   ├── atlas.md                          # product-designer agent (Figma)      ~11.3 kB
│   └── sirius.md                         # frontend-designer agent (code)      ~14.6 kB
├── skills/
│   ├── horizon-ds/                       # umbrella skill — load first          ~4.6 kB
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── Guidelines_Product_Design.md                                    ~31.7 kB
│   │       ├── design.md                                                       ~58.9 kB
│   │       └── horizon-keys.md                                                  ~4.7 kB
│   ├── horizon-ds-tokens/                # token-only skill (lightweight)       ~3.7 kB
│   │   └── SKILL.md
│   ├── horizon-ds-figma-bridge/          # Figma↔code translation skill         ~4.2 kB
│   │   └── SKILL.md
│   └── horizon-ds-atomic-audit/          # atomic-design + frame audit skill    ~4.3 kB
│       └── SKILL.md
└── commands/
    ├── horizon-init.md                   # /horizon-init                        ~1.3 kB
    ├── horizon-audit.md                  # /horizon-audit                       ~1.5 kB
    ├── horizon-build-screen.md           # /horizon-build-screen                ~1.4 kB
    └── horizon-implement.md              # /horizon-implement                   ~1.8 kB
```

## Install

### Option A — local install (any Claude Code project)

```bash
# 1. Unzip this bundle
unzip horizon-ds-plugin.zip -d ~/.claude/plugins/

# 2. Restart Claude Code (or reload the project)
# 3. The agents (Atlas, Sirius), skills, and slash-commands appear automatically.
```

### Option B — pin to a specific project

```bash
# from the repo root of your project
mkdir -p .claude
unzip horizon-ds-plugin.zip -d .claude/plugins/
```

### Option C — from this repository

```bash
gh repo clone nilanjan-cmyk/horizon-ds-guidelines
cp -r horizon-ds-guidelines/horizon-ds-plugin ~/.claude/plugins/horizon-ds
```

## What you get after install

### Two agents (auto-invoked by Claude Code)

| Agent | Model | Owns | Auto-invoked when... |
|---|---|---|---|
| **Atlas** | opus | Figma | "design", "audit screen", "build figma frame", "match design system" |
| **Sirius** | opus | Frontend code | "convert design to code", "transpile React → Vue / Swift / Flutter", "wire UI to API" |

Both agents now:
- **Read and judge Figma frame names**, component instances, properties, and artifacts before generating or auditing.
- **Read annotations and comments** — apply clear requirements, ask the user when annotations are ambiguous ("TBD", "?", contradictions).

### Four skills (invoke via `Skill` tool or auto-load)

| Skill | Chars | Use when |
|---|---|---|
| `horizon-ds` | 4,558 | Default umbrella — loads tokens, components, atomic-design rules, frame-reading + annotation handling |
| `horizon-ds-tokens` | 3,675 | Lightweight — just colors, spacing (rem-based), radius, opacity, typography, stroke-width |
| `horizon-ds-figma-bridge` | 4,244 | Figma URL or YAML spec → code in any of 9 frameworks (or reverse: code → Figma) |
| `horizon-ds-atomic-audit` | 4,280 | Audit a node/screen for tier inversion, frame naming, annotation resolution |

All skills conform to Anthropic's skill-creator guidelines:
- YAML frontmatter with `name`, `description`, `when_to_use`, `allowed-tools`
- Combined `description` + `when_to_use` under 1,536 char limit
- Body under 500 lines; references in separate files

### Four slash-commands

| Command | What it does |
|---|---|
| `/horizon-init` | Bootstraps a new screen with the right Page template, rem-based tokens, and reference layout |
| `/horizon-audit` | Audits the current Figma frame OR the current code file for DS drift + frame hygiene + annotation resolution |
| `/horizon-build-screen` | Atlas agent build pipeline — brief → Figma frame using only Horizon components |
| `/horizon-implement` | Sirius agent build pipeline — Figma URL → production code in detected framework |

## Token naming convention (v1.2.0)

All layout tokens now use **rem-based naming** (1 rem = 4 px):

| Category | Token path | Example |
|---|---|---|
| Spacing | `spacing_gap/gap_{rem}` | `gap_4` = 16 px, `gap_6` = 24 px |
| Radius | `radius/rounded_{rem}` | `rounded_2` = 8 px, `rounded_4` = 16 px |
| Opacity | `opacity/opacity_{n}` | `opacity_0` = 0%, `opacity_10` = 50%, `opacity_20` = 100% |
| Stroke | `stroke-width/border-{rem}` | `border-0,25` = 1 px, `border-0,5` = 2 px |

Fractional rems use commas (Figma platform limitation): `gap_0,5` not `gap_0.5`.

## Required external setup

The plugin assumes:

1. **Figma Dev Mode MCP** is running on `http://127.0.0.1:3845/mcp` (only required for design tasks; code tasks work without it).
2. **Horizon Figma library** is published and shared with your account. File key `UfHICFSU9PJl9OkE84mUk9`.
3. **Anthropic skills** (`figma-use`, `frontend-design`, `audit-design-system`, `apply-design-system`, `rad-spacing`) are available — these ship with Claude Code.

## Source-of-truth files

Always-on context for every agent invocation:

- `skills/horizon-ds/references/Guidelines_Product_Design.md` — human-readable design rules (v2.2, ~31.7 kB).
- `skills/horizon-ds/references/design.md` — machine-readable token + component bridge (v1.2.0, ~58.9 kB).
- `skills/horizon-ds/references/horizon-keys.md` — Figma component / variable / text-style keys for `importComponentByKeyAsync` (~4.7 kB).

## Versioning

`1.2.0` — Rem-based token naming (1 rem = 4 px) for spacing, radius, opacity (sequential 0–20), stroke-width. Frame-reading (§13) and annotation-discussion (§14) capabilities. Plugin restructured per Anthropic skill-creator guidelines (proper `when_to_use`, `allowed-tools`, `arguments` fields).

`1.1.0` — Adds atomic-design tier classification (Variables → Atoms → Molecules → Organisms → Templates → Pages) to design.md §6.5.

`1.0.0` — Initial release with Atlas, Sirius, and three skills.

## License

MIT.

## Public viewer

Latest docs (auto-updates on edit): **https://nilanjan-cmyk.github.io/horizon-ds-guidelines/**
