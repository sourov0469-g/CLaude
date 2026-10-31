# Brand tokens, measured from css/tokens.css

## Ramps (OKLCH, computed from the shipped hex)

| token | hex | L | C | H |
|---|---|---|---|---|
| `--clay-50` | #FEF3F0 | 0.972 | 0.013 | 35.7 |
| `--clay-100` | #F9E3DD | 0.932 | 0.026 | 35.7 |
| `--clay-200` | #F5D1C6 | 0.888 | 0.043 | 37.7 |
| `--clay-300` | #ECB3A4 | 0.815 | 0.070 | 35.2 |
| `--clay-400` | #DB917C | 0.726 | 0.095 | 36.6 |
| `--clay-500` | #C5735C | 0.640 | 0.109 | 36.5 |
| `--clay-600` | #A45540 | 0.540 | 0.109 | 35.9 |
| `--clay-700` | #884432 | 0.468 | 0.098 | 35.8 |
| `--clay-800` | #6C3527 | 0.398 | 0.082 | 35.3 |
| `--clay-900` | #50291E | 0.330 | 0.061 | 36.6 |
| `--clay-950` | #371C15 | 0.262 | 0.045 | 35.4 |
| `--sand-50` | #FCF8F5 | 0.981 | 0.006 | 59.7 |
| `--sand-100` | #F6F0EA | 0.958 | 0.010 | 67.7 |
| `--sand-200` | #EBE3DB | 0.920 | 0.014 | 67.7 |
| `--sand-300` | #D9D0C7 | 0.862 | 0.016 | 67.6 |
| `--sand-400` | #B8B0A6 | 0.761 | 0.017 | 73.6 |
| `--sand-500` | #928B83 | 0.640 | 0.014 | 71.2 |
| `--sand-600` | #746D66 | 0.539 | 0.014 | 67.5 |
| `--sand-700` | #5A544E | 0.450 | 0.012 | 67.5 |
| `--sand-800` | #413C38 | 0.360 | 0.010 | 61.2 |
| `--sand-900` | #2B2825 | 0.279 | 0.007 | 67.5 |
| `--sand-950` | #1B1916 | 0.215 | 0.007 | 78.2 |
| `--danger-600` | #B12A3E | 0.505 | 0.170 | 18.0 |

## Hue-drift audit

- Clay hue across all 11 steps: 35.2 to 37.7 (spread 2.4 deg; target window 30-45, terracotta / fired clay).
- Distance from the Rembrandt green window (~167): at least 129.3 deg. From the Austin steel window (~248): at least 147.2 deg.
- Distance from the danger hue (18.0): 17.2 deg (rule: >= 15) [S0071].
- Sand (neutral) hue where chroma >= 0.012 (below that the hue of an 8-bit colour is rounding noise): 67.5 to 73.6.

## Saturation audit

- Clay chroma peak: 0.109 (the retired accent #FF5F00 measured 0.210). No clay step exceeds 0.11: fired-clay muted, never a signal orange.
- Neutral chroma: <= 0.017 on every sand step.

## Semantic pairs (WCAG 2 contrast, measured)

| kind | foreground | background | ratio | min | result |
|---|---|---|---|---|---|
| text | `--color-text` #1B1916 | `--color-bg` #FCF8F5 | 16.61:1 | 4.5 | pass |
| text | `--color-text` #1B1916 | `--color-bg-subtle` #F6F0EA | 15.51:1 | 4.5 | pass |
| text | `--color-text` #1B1916 | `--color-bg-muted` #EBE3DB | 13.82:1 | 4.5 | pass |
| text | `--color-text` #1B1916 | `--color-surface` #FFFFFF | 17.54:1 | 4.5 | pass |
| text | `--color-text` #1B1916 | `--color-accent-subtle` #F9E3DD | 14.25:1 | 4.5 | pass |
| text | `--color-text` #1B1916 | `--color-accent-subtle-hover` #F5D1C6 | 12.38:1 | 4.5 | pass |
| text | `--color-text-secondary` #5A544E | `--color-bg` #FCF8F5 | 7.07:1 | 4.5 | pass |
| text | `--color-text-secondary` #5A544E | `--color-bg-subtle` #F6F0EA | 6.60:1 | 4.5 | pass |
| text | `--color-text-secondary` #5A544E | `--color-bg-muted` #EBE3DB | 5.88:1 | 4.5 | pass |
| text | `--color-text-secondary` #5A544E | `--color-surface` #FFFFFF | 7.47:1 | 4.5 | pass |
| text | `--color-text-secondary` #5A544E | `--color-accent-subtle` #F9E3DD | 6.06:1 | 4.5 | pass |
| text | `--color-text-secondary` #5A544E | `--color-accent-subtle-hover` #F5D1C6 | 5.27:1 | 4.5 | pass |
| text | `--color-accent-text` #884432 | `--color-bg` #FCF8F5 | 6.81:1 | 4.5 | pass |
| text | `--color-accent-text` #884432 | `--color-bg-subtle` #F6F0EA | 6.36:1 | 4.5 | pass |
| text | `--color-accent-text` #884432 | `--color-bg-muted` #EBE3DB | 5.67:1 | 4.5 | pass |
| text | `--color-accent-text` #884432 | `--color-surface` #FFFFFF | 7.19:1 | 4.5 | pass |
| text | `--color-accent-text` #884432 | `--color-accent-subtle` #F9E3DD | 5.84:1 | 4.5 | pass |
| text | `--color-accent-text` #884432 | `--color-accent-subtle-hover` #F5D1C6 | 5.08:1 | 4.5 | pass |
| text | `--color-danger-text` #B12A3E | `--color-bg` #FCF8F5 | 6.08:1 | 4.5 | pass |
| text | `--color-danger-text` #B12A3E | `--color-bg-subtle` #F6F0EA | 5.68:1 | 4.5 | pass |
| text | `--color-danger-text` #B12A3E | `--color-surface` #FFFFFF | 6.42:1 | 4.5 | pass |
| text | `--color-danger-text` #B12A3E | `--color-accent-subtle` #F9E3DD | 5.22:1 | 4.5 | pass |
| text | `--color-text-on-accent` #FFFFFF | `--color-accent-solid` #A45540 | 5.31:1 | 4.5 | pass |
| text | `--color-text-on-accent` #FFFFFF | `--color-accent-solid-hover` #884432 | 7.19:1 | 4.5 | pass |
| text | `--color-text-inverse` #FCF8F5 | `--color-bg-inverse` #413C38 | 10.31:1 | 4.5 | pass |
| text | `--color-text-inverse` #FCF8F5 | `--color-accent-solid` #A45540 | 5.03:1 | 4.5 | pass |
| ui | `--color-accent-solid` #A45540 | `--color-bg` #FCF8F5 | 5.03:1 | 3.0 | pass |
| ui | `--color-accent-solid` #A45540 | `--color-bg-subtle` #F6F0EA | 4.70:1 | 3.0 | pass |
| ui | `--color-accent-solid` #A45540 | `--color-surface` #FFFFFF | 5.31:1 | 3.0 | pass |
| ui | `--color-border-strong` #746D66 | `--color-bg` #FCF8F5 | 4.82:1 | 3.0 | pass |
| ui | `--color-border-strong` #746D66 | `--color-bg-subtle` #F6F0EA | 4.51:1 | 3.0 | pass |
| ui | `--color-border-strong` #746D66 | `--color-bg-muted` #EBE3DB | 4.01:1 | 3.0 | pass |
| ui | `--color-border-strong` #746D66 | `--color-surface` #FFFFFF | 5.09:1 | 3.0 | pass |
| ui | `--color-focus-ring` #A45540 | `--color-bg` #FCF8F5 | 5.03:1 | 3.0 | pass |
| ui | `--color-focus-ring` #A45540 | `--color-bg-subtle` #F6F0EA | 4.70:1 | 3.0 | pass |
| ui | `--color-focus-ring` #A45540 | `--color-bg-muted` #EBE3DB | 4.19:1 | 3.0 | pass |
| ui | `--color-focus-ring` #A45540 | `--color-surface` #FFFFFF | 5.31:1 | 3.0 | pass |
| ui | `--color-focus-ring` #A45540 | `--color-accent-subtle` #F9E3DD | 4.32:1 | 3.0 | pass |
| ui | `--color-focus-ring` #A45540 | `--color-accent-subtle-hover` #F5D1C6 | 3.75:1 | 3.0 | pass |
| ui | `--color-accent-border` #A45540 | `--color-surface` #FFFFFF | 5.31:1 | 3.0 | pass |
| ui | `--color-accent-border` #A45540 | `--color-accent-subtle` #F9E3DD | 4.32:1 | 3.0 | pass |
| ui | `--color-accent-border` #A45540 | `--color-accent-subtle-hover` #F5D1C6 | 3.75:1 | 3.0 | pass |
| graphic | `--color-art-line` #2B2825 | `--color-bg` #FCF8F5 | 13.88:1 | 3.0 | pass |
| graphic | `--color-art-line` #2B2825 | `--color-surface` #FFFFFF | 14.66:1 | 3.0 | pass |
| graphic | `--color-art-line` #2B2825 | `--color-art-fill` #F6F0EA | 12.96:1 | 3.0 | pass |
| graphic | `--color-art-accent` #C5735C | `--color-bg` #FCF8F5 | 3.32:1 | 3.0 | pass |
| graphic | `--color-art-accent` #C5735C | `--color-surface` #FFFFFF | 3.51:1 | 3.0 | pass |

Pairs failing: 0
