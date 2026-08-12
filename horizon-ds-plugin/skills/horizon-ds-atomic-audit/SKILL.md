---
name: horizon-ds-atomic-audit
description: >
  Audit a Figma node OR a code file against Horizon's atomic-design tier rules
  (Variables → Atoms → Molecules → Organisms → Templates → Pages). Catches
  "tier inversion" — the most common DS drift cause. Also audits frame naming,
  component property correctness, and annotation resolution status.
when_to_use: >
  Use when auditing a screen or component for design system drift, tier inversion,
  token violations, or unresolved annotations. Also use for PR review of any
  Figma or frontend change. Input: a Figma URL or a code file path.
allowed-tools: Read Grep Glob Skill ToolSearch
arguments: [target]
argument-hint: [figma-url-or-file-path]
---

# Horizon DS — atomic audit

## The tier contract

```
Variables  →  Atoms        : every visible property of an atom is a token reference
Atoms      →  Molecules    : a molecule references atoms by component-key, not raw geometry
Molecules  →  Organisms    : an organism may reference molecules AND atoms, never raw shapes
Organisms  →  Templates    : a template references organisms by name + slot
Templates  →  Pages        : a page fills template slots with real content
```

Composition is **upward only**. Tier inversion (a molecule reaching for primitives or a frame mimicking a Horizon component) is the failure mode this skill catches.

## Inputs

- A Figma URL (will fetch via MCP `get_design_context` + `get_screenshot`), OR
- A code file path (will read directly).

Passed as `$ARGUMENTS` or `$target`.

## Eight audit questions (run each against every node)

| # | Question | Pass |
|---|---|---|
| 1 | Does this node use raw hex / px / rem? | **No** — all bound to a Tier 0 token |
| 2 | Is this node a published Horizon instance? | Yes (or a documented proposal) |
| 3 | If it composes children, are *all* children of a strictly lower tier? | Yes — never sideways or upward |
| 4 | Does this node expose props at the right intent level? | Organism props describe the *task*; atom props describe the *shape* |
| 5 | Are all four async states present where applicable? | Loading, empty, populated, error |
| 6 | Are Light + Dark modes both verified? | Yes — both pass contrast ≥ 4.5:1 |
| 7 | Do frame names follow `{Feature}/{View}/{Breakpoint}` convention? | Yes — no "Frame 43" or "Untitled" |
| 8 | Are all annotations/comments/TODOs resolved? | Yes — no unaddressed "TBD", "?", or contradictions |

## Token naming reference (rem-based, 1 rem = 4 px)

When auditing token bindings, verify these naming conventions:

- Spacing: `spacing_gap/gap_{rem}` — e.g. `gap_4` = 16 px
- Radius: `radius/rounded_{rem}` — e.g. `rounded_2` = 8 px
- Opacity: `opacity/opacity_{0..20}` — sequential, each step = 5%
- Stroke: `stroke-width/border-{rem}` — e.g. `border-0,5` = 2 px

## Output format

```markdown
# Atomic Audit Report — <screen / file name>

**Verdict:** PASSES / NEEDS WORK / SIGNIFICANT ISSUES
**Confidence:** <0–100 %>

## Findings

| # | Tier | Issue | Node / line | Priority |
|---|---|---|---|---|
| 1 | Atom | Raw hex `#FAFAFA` instead of `surface/card-background` | `1:6545` | CRITICAL |
| 2 | Molecule | "Search bar" built from raw rect + text — not Horizon `Search` instance | `2:3120` | HIGH |
| 3 | Organism | Modal missing `error` state | `Modal.tsx:82` | MEDIUM |
| 4 | Frame | Frame named "Frame 43" — must follow {Feature}/{View}/{Breakpoint} | `3:1200` | HIGH |
| 5 | Annotation | Unresolved TODO: "TBD — confirm with PM" | `4:5600` | MEDIUM |

## Tier inversion detected
- Custom toggle inside settings molecule → use `Switch` atom (Horizon page `760:21705`).

## Annotations found
- [Applied] "Use 24px gap between cards" on node `2:3400`
- [Unresolved] "TBD — confirm with PM" on node `4:5600` → flagged for user

## Recommendations (prioritized)
1. …
2. …
```

## Priority key

- CRITICAL — library-level or navigation drift (propagates widely)
- HIGH — reusable primitive or token violation, frame naming, unresolved annotations
- MEDIUM — moderate system drift, missing async states
- LOW — nit / consistency

## After the audit

- One concrete fix → invoke `fix-design-system-finding`
- Several findings → invoke `apply-design-system` for a screen-wide pass
