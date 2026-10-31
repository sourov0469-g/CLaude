# Rembrandt Roofing & Restoration: tokens (R6)

Canonical values for critique-brand-consistency ⟦S1496⟧ token compliance. Generated from `src/base.css` and
`build/mk-tokens.py` (OKLCH, hue 192). Components reference only the semantic tier (better-colors ⟦S0071⟧).

## Primitives (ramps)

| Step | Teal (accent) | OKLCH | Neutral (tinted) | OKLCH |
|---|---|---|---|---|
| 50 | `#f1f9f8` | 0.975 0.008 192 | `#f7fbfa` | 0.984 0.004 192 |
| 100 | `#d8f2f0` | 0.942 0.027 192 | `#edf2f2` | 0.958 0.005 192 |
| 200 | `#ade9e6` | 0.893 0.061 192 | `#e0e5e5` | 0.918 0.006 192 |
| 300 | `#86d7d3` | 0.826 0.079 192 | `#ccd3d3` | 0.862 0.008 192 |
| 400 | `#61bbb7` | 0.735 0.087 192 | `#9ea7a6` | 0.720 0.010 192 |
| 500 | `#429d99` | 0.640 0.086 192 | `#798282` | 0.600 0.011 192 |
| 600 | `#347e7b` | 0.545 0.073 192 | `#5c6665` | 0.500 0.012 192 |
| 700 | `#2c6663` | 0.470 0.060 192 | `#464f4f` | 0.420 0.012 192 |
| 800 | `#274e4d` | 0.395 0.045 192 | `#303938` | 0.335 0.012 192 |
| 900 | `#1f3a38` | 0.325 0.033 192 | `#1f2727` | 0.265 0.011 192 |
| 950 | `#162626` | 0.255 0.022 192 | `#111817` | 0.200 0.010 192 |

`--white: #ffffff` (surfaces, text on the solid accent).

## Semantic roles (the only tier components use)

| Token | Points at |
|---|---|
| `--color-bg` | `var(--neutral-50)` |
| `--color-bg-subtle` | `var(--neutral-100)` |
| `--color-bg-sunken` | `var(--neutral-200)` |
| `--color-bg-surface` | `var(--white)` |
| `--color-bg-inverse` | `var(--teal-800)` |
| `--color-text` | `var(--neutral-900)` |
| `--color-text-secondary` | `var(--neutral-700)` |
| `--color-text-tertiary` | `var(--neutral-600)` |
| `--color-text-disabled` | `var(--neutral-500)` |
| `--color-text-inverse` | `var(--white)` |
| `--color-text-inverse-secondary` | `var(--teal-100)` |
| `--color-text-on-accent` | `var(--white)` |
| `--color-border-subtle` | `var(--neutral-200)` |
| `--color-border` | `var(--neutral-300)` |
| `--color-border-control` | `var(--neutral-600)` |
| `--color-border-strong` | `var(--neutral-900)` |
| `--color-border-focus` | `var(--teal-600)` |
| `--color-separator` | `var(--neutral-200)` |
| `--color-accent-subtle` | `var(--teal-50)` |
| `--color-accent-subtle-hover` | `var(--teal-100)` |
| `--color-accent-border` | `var(--teal-300)` |
| `--color-accent-solid` | `var(--teal-600)` |
| `--color-accent-solid-hover` | `var(--teal-700)` |
| `--color-accent-text` | `var(--teal-700)` |
| `--color-illustration-line` | `var(--neutral-900)` |
| `--color-illustration-paper` | `var(--white)` |
| `--color-illustration-fill` | `var(--neutral-200)` |
| `--color-illustration-fill-strong` | `var(--neutral-600)` |
| `--color-illustration-accent` | `var(--teal-500)` |
| `--color-illustration-accent-soft` | `var(--teal-200)` |
| `--color-illustration-accent-deep` | `var(--teal-800)` |
| `--color-shadow` | `var(--neutral-950)` |

## Type

- Families: Poppins (headings, labels, buttons), Open Sans (body). Two families (standing rule).
- Hierarchy levels (visual-hierarchy ⟦S1434⟧): primary = page title + the one filled call; secondary = section headings;
  tertiary = body and supporting text; quaternary = fine print and labels. See PROGRESS.md, R6 brand sheet.
