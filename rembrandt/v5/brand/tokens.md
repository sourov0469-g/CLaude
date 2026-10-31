# Rembrandt Roofing & Restoration: tokens (R7)

Canonical values for critique-brand-consistency ⟦S1496⟧ token compliance. Generated from `src/base.css` and
`build/mk-tokens.py` (OKLCH). R7 replaces the R6 teal with the owner's approved Figma colours: deep green #0e3b2c
(primary) and lime #b5db6e (highlight). Components reference only the semantic tier (better-colors ⟦S0071⟧).

## Primitives (ramps)

Green holds hue 167 (anchor green-900 = #0e3b2c, chroma capped at 0.095); lime holds hue 125 (anchor
lime-300 = #b5db6e); the one neutral ramp is tinted to the green (C 0.004-0.012).

| Step | Green (primary) | Lime (highlight) | Neutral (tinted) |
|---|---|---|---|
| 50 | #f1f9f5 `oklch(0.975 0.010 167)` | #f4f9ec `oklch(0.975 0.018 125)` | #f7fbf9 `oklch(0.984 0.004 167)` |
| 100 | #d8f4e7 `oklch(0.942 0.034 167)` | #e2f4c7 `oklch(0.942 0.062 125)` | #eef2f0 `oklch(0.958 0.005 167)` |
| 200 | #bce7d4 `oklch(0.893 0.052 167)` | #cbe998 `oklch(0.893 0.110 125)` | #e0e5e3 `oklch(0.918 0.006 167)` |
| 300 | #9bd5bd `oklch(0.826 0.068 167)` | #b5db6e `oklch(0.841 0.143 125)` | #cdd3d0 `oklch(0.862 0.008 167)` |
| 400 | #73ba9e `oklch(0.735 0.084 167)` | #93b941 `oklch(0.735 0.153 125)` | #9fa7a3 `oklch(0.720 0.010 167)` |
| 500 | #4b9f80 `oklch(0.640 0.095 167)` | #779b1c `oklch(0.640 0.151 125)` | #7a827f `oklch(0.600 0.011 167)` |
| 600 | #2a8264 `oklch(0.545 0.095 167)` | #5f7c15 `oklch(0.545 0.129 125)` | #5d6662 `oklch(0.500 0.012 167)` |
| 700 | #146b50 `oklch(0.470 0.090 167)` | #4d6517 `oklch(0.470 0.106 125)` | #474f4c `oklch(0.420 0.012 167)` |
| 800 | #19523f `oklch(0.395 0.067 167)` | #3c4e19 `oklch(0.395 0.079 125)` | #313935 `oklch(0.335 0.012 167)` |
| 900 | #0e3b2c `oklch(0.317 0.056 167)` | #2d3916 `oklch(0.325 0.058 125)` | #202724 `oklch(0.265 0.011 167)` |
| 950 | #11281f `oklch(0.255 0.033 167)` | #1e2610 `oklch(0.255 0.039 125)` | #121815 `oklch(0.200 0.010 167)` |

`--white: #ffffff` (surfaces, text on the deep green).

## Semantic roles (the only tier components use; light theme)

| Token | Points at |
|---|---|
| `--color-bg` | `var(--neutral-50)` |
| `--color-bg-subtle` | `var(--neutral-100)` |
| `--color-bg-sunken` | `var(--neutral-200)` |
| `--color-bg-surface` | `var(--white)` |
| `--color-bg-inverse` | `var(--green-900)` |
| `--color-text` | `var(--neutral-900)` |
| `--color-text-secondary` | `var(--neutral-700)` |
| `--color-text-tertiary` | `var(--neutral-600)` |
| `--color-text-disabled` | `var(--neutral-500)` |
| `--color-text-inverse` | `var(--white)` |
| `--color-text-inverse-secondary` | `var(--green-100)` |
| `--color-text-on-accent` | `var(--white)` |
| `--color-border-subtle` | `var(--neutral-200)` |
| `--color-border` | `var(--neutral-300)` |
| `--color-border-control` | `var(--neutral-600)` |
| `--color-border-strong` | `var(--neutral-900)` |
| `--color-border-focus` | `var(--green-700)` |
| `--color-separator` | `var(--neutral-200)` |
| `--color-accent-subtle` | `var(--green-50)` |
| `--color-accent-subtle-hover` | `var(--green-100)` |
| `--color-accent-border` | `var(--green-300)` |
| `--color-accent-solid` | `var(--green-900)` |
| `--color-accent-solid-hover` | `var(--green-800)` |
| `--color-accent-text` | `var(--green-700)` |
| `--color-highlight` | `var(--lime-300)` |
| `--color-highlight-soft` | `var(--lime-100)` |
| `--color-text-on-highlight` | `var(--green-900)` |
| `--color-icon-on-accent` | `var(--white)` |
| `--color-illustration-line` | `var(--neutral-900)` |
| `--color-illustration-paper` | `var(--white)` |
| `--color-illustration-fill` | `var(--neutral-200)` |
| `--color-illustration-fill-strong` | `var(--neutral-600)` |
| `--color-illustration-accent` | `var(--lime-300)` |
| `--color-illustration-accent-soft` | `var(--lime-100)` |
| `--color-illustration-accent-deep` | `var(--green-900)` |
| `--color-shadow` | `var(--neutral-950)` |

Inside the deep-green bands (Call band, close V2, Contact head V4 panel, card back) the same names are repointed:
ground green-900, text white / green-100, action fill lime-300 with a green-900 label, links lime-200, focus lime-300.

## Rules

- Lime is a light colour: lime fills carry deep-green (or near-black) text, never white (white on lime-300 is 1.58:1).
- Deep green carries white text (12.50:1 on green-900, 9.05:1 on green-800 hover).
- Lime is the one pop per view (von-restorff ⟦S1435⟧): a drawing's focal mark, a data highlight, a marker.

## Type

- Families: Poppins (headings, labels, buttons), Open Sans (body). Two families (standing rule).
- Hierarchy levels (visual-hierarchy ⟦S1434⟧): L1 page title 60/40 px, L2 section heading 40/26 px, L3 body 17 px,
  L4 labels 14 px / 600. See PROGRESS.md, brand sheet.
