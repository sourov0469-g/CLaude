# GATE: Overnight Round 15 — Windows G and H (Windows 8 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?windows=g` and `?windows=h`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Windows G, "Frame colours, by maker"** | Cash App Brand Guidelines (colour as content) | S0054 (maker tablist; colour radiogroup with arrow keys), S1497 (the frame against a lap wall), S0220 (colours exactly as the firm lists them in `window_colours.json`; priced-job counts from FACTS.md) |
| **Windows H, "Count your windows"** | Quiet Cubes (the service structure: the visit, prepared) | S1442 (steppers with labelled groups, 44 px targets, nothing lost), S0054 (`<output>` with `aria-live`), S0220 / form rule (no price, no submit; "Copy my tally" only copies text to the visitor's own clipboard; nothing is sent or saved) |

## Build log, with how each differs from Windows A–F

- **Windows G** (`o15-windows-g.jpg`)
  - **Choosing a maker:** NT Windows (238 priced jobs, 19 colours), Pella (31, 5), Simonton (54, 10) or Andersen (38, 5).
  - **Choosing a colour:** the drawn window in a lap wall takes that frame colour, and its name, maker and value are read out.
  - **How it differs:** A has only Andersen's 5 colours as a small control. G is the only full catalogue across all four makers.
- **Windows H** (`o15-windows-h.jpg`)
  - **The tally:** seven rooms with − / + steppers. A running total shows as large numerals plus a little window glyph per window, and a room list.
  - **Copy my tally:** copies a one-line summary for the visitor's own use.
  - **The page says:** "It stays on this page; nothing is sent", and "We measure every opening at the free inspection".
  - **How it differs:** the only practical tool in the Windows slot.

## Self-tests

| Check | Result |
|---|---|
| G at 1440 / 768 / 390 | 0 errors, 0 overflow. Andersen → Dark Bronze reads "Dark Bronze · Andersen · #493F3D" |
| H at 1440 / 768 / 390 | 0 errors, 0 overflow. Living 3 + Bedrooms 4 + Kitchen 2 → "9 windows · Living room 3 · Kitchen 2 · Bedrooms 4". The copy reports "Copied to your clipboard"; if the clipboard is refused, the text is shown instead |

**Defects:** Windows H's steppers used `.st`, which collides with the global booking-status style and drew a stray dot beside each stepper. Renamed `.stp`.

**Remaining:**
- Simonton's list includes a colour named "Silver". That is the maker's own product colour, shown as data; it is not a brand colour.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | G | S1497, S1501 (the window), S0220 |
| Section | H | S1442, S1501 (the total) |
| Element | G maker tabs and colour chips | S0054, S0405 (lift) |
| Element | G frame repaint | 0.45 s fill |
| Element | H steppers | S0405 (press 0.94), S1259 (44 px) |
| Element | H glyphs | S0083 (pop in) |
| Element | H copy button | S0405; form rule |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1473 H5** (error prevention): H's steppers clamp at 0 and 40.
- **Honesty:** nothing is sent; the copy is local.
- **S1496:** brand chrome only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Windows G | 8.0 | 8.6 | 7.4 | 8.6 | **8.14** | PASS |
| Windows H | 7.8 | 8.8 | 7.6 | 8.0 | **8.08** | PASS |

**Vetoes: none.** **Next: Round 16, Windows I and J.**
