# Tokens: Elbaz Construction

Canonical values live in `remodeling/src/css/tokens.css` (generated ramps: `ramps.py`). Measured table: `remodeling/qa/brand-tokens.md`.

**Colour, semantic tier** (the only colour names components may use)

| role | token | value |
|---|---|---|
| page ground | `--color-bg` | sand-50 |
| alternate ground, panels | `--color-bg-subtle` | sand-100 |
| quiet fills | `--color-bg-muted` | sand-200 |
| cards, inputs | `--color-surface` | white |
| text | `--color-text` | sand-950 |
| secondary text | `--color-text-secondary` | sand-700 |
| text on the accent | `--color-text-on-accent` | white |
| borders | `--color-border-subtle` | sand-200 |
| borders | `--color-border` | sand-300 |
| borders (controls) | `--color-border-strong` | sand-600 |
| focus | `--color-focus-ring` | clay-600 |
| the primary action | `--color-accent-solid` | clay-600 |
| the primary action, hover | `--color-accent-solid-hover` | clay-700 |
| accent text | `--color-accent-text` | clay-700 |
| selected-state ring | `--color-accent-border` | clay-600 |
| selected fill | `--color-accent-subtle` | clay-100 |
| selected fill, hover | `--color-accent-subtle-hover` | clay-200 |
| form errors only | `--color-danger-text` | danger-600 |
| drawings | `--color-art-line` | sand-900 |
| drawings | `--color-art-line-soft` | sand-600 |
| drawings | `--color-art-fill` | sand-100 |
| drawings | `--color-art-accent` | clay-500 |
| drawings | `--color-art-accent-soft` | clay-300 |
| drawings | `--color-art-wash` | clay-100 |

**Type**
- Families: Poppins (display, as 'Elbaz Display', rendering at 74%) and Roboto (text).
- Four levels:

| level | token | visual size | weight |
|---|---|---|---|
| L1 | `--t-display` | 35–62px | 600 |
| L2 | `--t-head` | 22–41px | 600 |
| L3 | `--t-body` | 18–20px | 400 (supporting text 15–17px) |
| L4 | under 15px | 12–14px | 600 (the weight step) |

**Shape**
- Radius 2px.
- Spacing 4-based (`--s1`…`--s12`).
