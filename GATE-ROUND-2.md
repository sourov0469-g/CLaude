# GATE: Round 2 — Services + Visualiser

**Date:** 2026-11-03.
**Under:** Muse's finalize message, hero instruction and colour change. Gate accepted: "Proceed to the next unfinished step… Do not wait for approval."
**Section order:** direction v2 (hero → **services → visualiser** → windows → proof → process → service area → CTA + footer → nav polish).

## 1. What was built

The site is now **one file**: `siding/redo/site/out/site.html` (7.7 MB; fonts, photos, film and code all embedded). `build_site.py` assembles it.

Each section is a **slot**. The slot holds its live winner; every other version sits next to it as a hidden in-file backup (`<template>`), never deleted. For audit only, a URL parameter puts a backup into its slot:

- `?hero=2` … `?hero=5`
- `?services=b`
- `?vis=a`

There is no switcher on the page. The section markup is rendered at build time (node), so the copy reads without JavaScript.

**Live order:** header (Header 3 floating bar + sample-book dropdown; Header 4 board-end bar on phones) → **Hero V1** (accepted) → **Services A** → **Visualiser B**.

### Services (sheet: shingle wave, flipping sample boards, lit casements; each piece animates its own way, finishing in a good direction)

| | **A — pinned horizontal sequence (WINNER)** | B — giant word switcher (backup) |
|---|---|---|
| Presentation | One trade full-view at a time. The section pins and scroll slides Siding → Windows → Roofing sideways. Each trade rests for half its share of the scroll, then the next slides in (eased), so a slide is never parked half-cut. The rail shows progress; rail tabs and the header links land on each trade's resting view. | Outlined SIDING / WINDOWS / ROOFING as ARIA tabs (arrow keys). The stage panel swaps with a lift. |
| Siding | Three real sample boards (board & batten, HardiePlank 8.25 in lap, Select Cedarmill) enter three different ways: drop, slide, swing up. Tap one and it turns over to its record: **27 / 301 / 286 of 415 priced jobs**. | Same scene |
| Windows | A casement swings out on its hinge; a double-hung lower sash lifts. Warm light falls on the sill. Opens on hover, tap or Enter/Space; `aria-pressed`. | Same scene |
| Roofing | 117 shingle tabs laid eave to ridge, course by course. The pointer runs a wave through them, and they lie back flat when it leaves. Tab centres are measured once per visit, not every frame. | Same scene |
| Figures | Firm records only (FACTS.md): 431 / 388 / 241 documented; median bands; 1–2 weeks; 2 days; 238 NT Windows; 30-year Hardie warranty; GAF Master Elite; more trades with counts | Same |

### Visualiser (sheet: swatch fan, snap-together wall, floating frames; hail panel OUT)

| | **B — snap-together wall, Quiet Cubes structure (WINNER)** | A — swatch fan over a house (backup) |
|---|---|---|
| Idea | Five steps (Profile, Texture, Finish, Colour, Trim) on the left, the wall in the centre, the step's options on the right. | The 17 ColorPlus colours fan out like a sample deck; the house elevation recolours. |
| The wall | Starts as house wrap. Pick lap and 12 courses snap in from the side, bottom to top. Pick board & batten and 6 panels drop and 11 battens press on. Cedarmill grain, corner boards and casings in the chosen trim. | Lap / board-and-batten toggle, slider through all 17, arrow keys |
| Data | Real counts on every option: lap 301 of 415, B&B 27, Cedarmill 286, smooth 36. The 17 ColorPlus colours, or the 12 Sherwin-Williams samples the firm publishes. Arctic White trim. | The 17 ColorPlus colours |
| End | On the last step, Next becomes **Book a free inspection** (lime key) and goes to the firm's booking page. The summary says "bring it to the free inspection"; nothing is claimed saved or sent. | Key CTA |
| Phone | The wall stays pinned under the header while the options scroll beneath it, so every choice is seen landing. | Stacks |

## 2. Audit (Playwright, SwiftShader GL, 1440 × 900 and 390 × 844 touch)

| Check | Result |
|---|---|
| JS errors | **0** in all four versions, at both widths |
| Horizontal scroll | **none** (`scrollWidth` = viewport) at both widths, all versions |
| Siding flip | `aria-pressed=true`; back face shows the record (1440 and 390) |
| Windows | Open on hover (1440), on tap (390, pure touch), on Enter/Space |
| Roof wave | 46 tabs lifted at 1440; 112 at 390; all return to 0 on leave |
| Services A pin | Three rest views (screens below); rail state follows |
| Services B tabs | ArrowDown moves the selection and the focus to Windows |
| Visualiser B | Next is disabled until a profile is picked; all five steps walk; the last step's button is `btn key` "Book a free inspection"; switching to B&B rebuilds the wall |
| Visualiser A | Arrow keys move the radio (Iron Gray → Aged Pewter); B&B toggle swaps the lines |
| Reduced motion | Every scene renders its finished state at once (`in settled`); no transitions, no drifting board |

### Contrast (WCAG AA, new pairs this round)

| Pair | Ratio |
|---|---|
| Green figures `#0E3B2C` on cream | 11.16 |
| Ink on lime key | 11.19 |
| Ink on the lime-light summary | 15.46 |
| Muted `#5B636B` on white (options, rail) | 6.10 |
| Back-face text `#434B54` on `#FBFAF6` | 8.47 |
| Count label `#CFE6B0` on green | 9.28 |
| Disabled Next `#5B636B` on `#E7E3D9` | 4.76 |

### Defects found and fixed this round

| # | Defect | Fix |
|---|---|---|
| 1 | Services A: the rail overlapped the top corner of the stage | Track moved down 26 px; height recomputed |
| 2 | Services A/B: copy sat straight on the busy field | A soft cream halo behind the copy column (field stays visible around it) |
| 3 | The casement had a meeting rail, so it read as a second double-hung | Rail removed; the handle shows the hinge side |
| 4 | Services A: scroll could park a slide half off screen | Rest plateaus: each trade holds full view, then an eased slide |
| 5 | Header Windows/Roofing links jumped into the moving track | Links routed to each trade's resting view |
| 6 | Flipped board hid under its neighbour, cutting its text | The flipped board rises above the others |
| 7 | Flipped-board text cramped on phones | Smaller back-face type; the board grows 14% when turned |
| 8 | Window tap: a mouse click after hover closed what the hover opened | Mouse click only opens; tap and keys toggle; `aria-pressed` added; now focusable |
| 9 | Phones: the board-end bar covered the last controls | Body padded to the bar's height |
| 10 | Services B: headline under the header; 84 px sideways scroll on phones | Padding; `min-width:0`; halo kept inside the gutter |
| 11 | Visualiser B: 44 px sideways scroll on phones (step row) | `min-width:0` on the grid children |
| 12 | Visualiser B: the wall ran below the fold at 1440 × 900 | Heading on one line beside its support; wall height tied to the view |
| 13 | Visualiser B: "Profile not chosen" in the summary; a faded green Next | Start-state line "Start with a profile…"; a real disabled button style (site-wide) |
| 14 | Visualiser B (phone): the wall scrolled away while picking | The wall pins while options scroll |
| 15 | Visualiser A: the picked swatch hid under its neighbour; 17 unreadable labels; house cut at the fold | Picked swatch on top; label only on the raised swatch; house height tied to the view |

### Remaining defects (open)

1. **Visualiser B, phone:** each step's heading slides under the pinned wall as you scroll the options (the options stay visible).
2. **Windows scene:** the light on the sill is subtle; on phones the open state is clear but small.
3. **Services A on phones** stacks the three trades vertically instead of pinning (chosen for readability at 390); each trade is still full width, one after another.
4. Software GL only: smoothness on real hardware is untested.
5. The cursor companion is not in this round; it comes with nav polish.

## 3. Screens

All in `siding/redo/site/gate/`:

- `r2-services-1440.jpg`: winner A at its three rest views (siding flipped, windows open, roof wave) plus backup B.
- `r2-services-390.jpg`: winner A at 390 plus backup B.
- `r2-visualiser-1440.jpg`: winner B at start, lap, colour, trim plus backup A.
- `r2-visualiser-390.jpg`: the same at 390.
- `r2-*.jpg`: each single frame.

## 4. WEB-SKILLS tags

| Tag | Applied |
|---|---|
| ⟦S0001⟧ | Each section has one memorable object: boards you turn over; a wall that goes up board by board |
| ⟦S0056⟧ | Transform and opacity only; the roof measures once per visit; the pin is one rAF per scroll |
| ⟦S0089⟧ | Over-shoot curves on board entrances, sash swing and course snap; nothing linear |
| ⟦S0063⟧ | UI states 0.16–0.2 s ease-out; scene motion 0.5–1.1 s; no ease-in on UI |
| ⟦S0650⟧ | Headlines ≤ 8 words ("Every trade on the house", "Build your wall, board by board."); support ≤ 35 words |
| ⟦S0220⟧ | One key CTA per view; only locked or FACTS.md figures; no blobs, no glass |
| ⟦S0049⟧ | ARIA tabs and radios with arrow keys; `aria-pressed` on flips and the window; real disabled state; focus rings |
| ⟦S1501⟧ | One emphasis per view: the trade name or the wall; figures in green, key CTA in lime |
| ⟦S1320⟧ | Final state complete with reduced motion and without JS (markup pre-rendered) |

## 5. Scorecard

Design 40 / Usability 30 / Creativity 20 / Content 10. PASS = weighted ≥ 7.0, no category < 6.0, zero vetoes.

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| **Services A** | 8.0 | 7.8 | 8.2 | 8.6 | **8.04** | **PASS — live** |
| Services B | 6.6 | 7.4 | 7.0 | 8.2 | 7.10 | Backup: outline words are busy over the field; duplicate counts |
| **Visualiser B** | 7.8 | 8.4 | 7.8 | 8.6 | **8.06** | **PASS — live** |
| Visualiser A | 7.6 | 7.2 | 7.4 | 8.0 | 7.48 | Backup: the fan is lovely but it is a picker; B is a usable tool |

**Vetoes:** none.
- No invented facts; every figure is from FACTS.md or the locks.
- No placeholders.
- No sideways scroll.
- No JS errors.
- CTAs go to the live booking page.
- Forms are not claimed saved or sent.

## 6. Next

**Round 3: windows** (day/night window + bay; real Andersen construction researched first) **and proof/reviews** (4.9 reveal + hanging tags). Two versions each, in the same file. Proceeding without waiting, per Muse.
