# GATE-NEW · Financing · V3 "The board"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 2, section 3 of 7. Hero V3 and How a job runs V3 were accepted by Muse.

The default is unchanged: V1 ("two kinds of money", the owner's pick) stays version 1, and V2 (the money map) is untouched. No backups ship.

**How to see V3:**
- **Header switch.** Use the Financing "1 · 2 · 3" switch while the section is in view. On phones it is the "‹ 1/3 ›" stepper.
- **Built page.** `elbaz-homepage.html?financing=3` opens V3 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Apple AirPods Pro** is the primary ("peak UI/UX grammar: … numerals as events"). Numerals as events are taken: each partner's published figure is an event that arrives when it becomes the answer to your question. Here the event is a mechanical one, a split-flap board turning its tiles. The pinned scroll is not taken.
- **Signature move:** the board.
  - The four financing partners stand as four rows on a split-flap board, like a departures board: the partner, its published figure (6–132, 30, 20, $250K) and how it is repaid (on the card, in installments, on the property tax bill).
  - Choose what you are building, and the board flips: the rows that usually fit turn their tiles to their figures, and the rows that do not turn blank.
  - Tap a row to read it: what it is, what else is published, and its source line.
- **Style family:** a mechanical display, a split-flap board (ink housing, paper tiles, clay for consumer credit, ink for property-assessed).
  - V1 is two coloured panels with a three-way switch.
  - V2 is a three-column flow map with ribbons.
- **The owner's law for this section:** visual and creative, never document-like. The answer is the board itself; the text is one line beneath it, and the figures are the largest things in the section.
- **WEB-SKILLS tags per element:**
  - **Board and flaps:**
    - S0062: transform and opacity only (each tile's flap folds; one driver loop, no reflow);
    - S0083: one focal point (the rows that fit lit, the rest blank);
    - S0666 (the figure is the largest tile in every row);
    - S1314 (no card apocalypse: one object, not four cards).
  - **Project picker:** S1018 (a radio group: arrows, Home and End); S1441 (44px); S1443 (tap on touch).
  - **Rows:** S1441; S1018 (a row is a button; its details read in one caption line).
  - **Answer line:** S1425 (text on paper); S0226 (proof by the action: the CTA, 4.8 · 343, the licence and "not a lender" sit with it).
  - **Reduced motion:** S0400 (no flipping: tiles change at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 sorts the partners into two panels and V2 draws the routes between columns. V3 is a single object that changes state: one board, four rows, flipped by your answer.
  - **Why it is better.** The answer is instant and unmissable: the partners that usually fit your project are the rows still showing their numbers, and how you would repay is on the same row. The flip makes the change itself the event, so the visitor sees the answer arrive rather than reading for it.
  - **Facts and routing.** Every figure, repayment line, source line and reason comes from FACTS.md "Financing", through the section's own data (`P`, `PROJ`, `ROUTES`, `WHY`). The repayment tiles are short forms of the firm's own lines ("On the card", "Installments", "Tax bill").

## What was built
**Files:**
- `remodeling/src/sections/financing.html`: V3 added in the existing version system (`.ver[data-v="3"]`, prefix `bd__`, checked free).
- `css/sections/financing.css`: a V3 block appended.
- `js/sections/financing.js`: a `3:` definition beside `1:` and `2:`. It reuses the section's own data: the partners `P`, the projects `PROJ`, the routing `ROUTES`, the reasons `WHY`, and the shared footer (CTA, 4.8 · 343, licence, "not a lender").
- No retired definition sat on key 3, so nothing needed moving. V1 and V2 are untouched.

**The picker:** the six projects (Kitchen, Bathroom, Flooring, Roof, windows or doors, HVAC or storm protection, Not sure yet) as a radio group of 44px chips with the section's icons. It starts on "Not sure yet", so all four partners show.

**The board** (an ink housing with paper tiles):
- **Four rows, one per partner:**
  - the name in 15 letter tiles;
  - the published figure in 5 large tiles (clay for consumer credit, ink for property-assessed), with its unit beside it;
  - how it is repaid in 12 tiles ("On the card", "Installments", "Tax bill": short forms of the firm's lines).
- A coloured edge marks the kind: clay for consumer credit, pale for property-assessed.
- **Choosing a project flips the board.** Rows that usually fit turn their tiles to the figure and the repayment; rows that do not turn blank, and their names grey.
- **Every tile that changes runs a few random faces first** (later columns and rows run a little longer, so the change cascades across the board). Each face change folds a top flap: one transform on one element, run by one driver loop (S0062).
- **First view:** the board is blank until it scrolls into view, then all four partners flip on. The figures arrive as events.
- **Tap a row to read it:** a caption beneath gives the name, the kind, what it is, what else is published, and the source line (for example "As published by Renew Financial, NMLS 1788120").
- **The answer line** beneath is the firm's own reason for the chosen project (`WHY`). Then come the CTA, 4.8 · 343, the licence and "not a lender".

**Widths:**
- 1100px and wider: one line per row (partner, figure and unit, repaid).
- 700 to 1099px: two lines (partner and repaid, then the figure).
- Under 700px: three lines.
- On the narrower layouts the tiles are sized to the board itself (container units), and a letter tile never sets text under 13px.

**Accessibility:**
- The tiles are hidden from assistive technology. Each row is a button whose name is one sentence: "Synchrony, consumer credit: usually fits. 6–132 months, published special-financing term range. Repaid on the card, as revolving credit." (or "not usually a fit for this project").
- The answer and the caption are live regions.

**Reduced motion (S0400):** no flipping and no wait for the scroll; tiles change at once.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Financing V3** | **8** | **8** | **9** | **10** | **8.4** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.8 + 1.0 = 8.4.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **One object, not documents (S1314):** a board in the brand's ink with paper tiles; the figures are the largest things in the section (S0666).<br>**One focal point (S0083):** the rows that fit are lit, the rest are blank.<br>**Heights:** 1132px at 1440 (V1 1063, V2 1248), 1062 to 1253px from 1024 to 900, 1353px at 768, 1490 to 1701px on phones (V1 1601 and V2 1568 at 390). | Phones stack each row on three lines, so the board is long there. The board is a dark block on a light page. |
| **Usability 8** | **Routing verified:**<br>• Kitchen lights Synchrony and Service Finance;<br>• Roof lights Service Finance, Ygrene and RenewPACE;<br>• "Not sure yet" lights all four.<br>**Fast changes** (Left, Left, End within 150ms) settle on the last choice.<br>**Keyboard:** arrows, Home and End on the picker; Tab to a row; Enter reads it.<br>**Touch:** tap chips and rows at 390 and 768.<br>**Measures:** 0 targets under 44px; 0 text under 13px; no field overflows its row at any of 11 widths from 360 to 1440; 0 errors. | The repayment tiles are short forms; the full line is in the row's spoken name and is one tap away in the caption. |
| **Creativity 9** | A move the section did not have, and the site has nowhere else: the answer as a mechanical event. You choose, and the board turns, tile by tile, to your partners. | A split-flap board is a known object. Its use here, to answer "what can pay for my project", is the new part. |
| **Content 10** | **Figures, units, kinds, what-it-is lines, "also published" lines and source lines** are the section's `P`, verbatim. The routing and reasons are `ROUTES` and `WHY`, already accepted. The repayment tiles shorten `P.repay` without changing its meaning.<br>**By the action:** CTA, 4.8 · 343, the licence string and "not a lender" verbatim.<br>Locks **0 fails**; outside links **0**. | The H2 "Four partners. One board." and the lead are my wording; Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V3 at 1440, 1024, 900, 768, 414, 390 and 360, reduced motion, the single file);
- no images;
- facts verbatim; no outside links;
- nothing claims the firm lends or approves;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **The figure column stretched** and pushed "Repaid" to the far edge. Fixed: the columns are packed, and the figure column has an explicit width so the column labels line up with their tiles.
2. **Every row was twice as tall** because the unit sat under the figure. Fixed: the unit sits beside the figure; the board went from 562 to 433px at 1440.
3. **At 1024 the rows overflowed the board, and at 900 the tiles shrank to 13px and looked squashed.** Fixed: a two-line row between 700 and 1099px, with tiles sized to the board itself.
4. **Letter tiles could set 12px text on a 360 phone.** Fixed: a 13px floor.
5. **A row's spoken name repeated the unit.** The visible unit is now hidden from assistive technology; the row's sentence carries it.
6. **On phones the caption's "·" separators began new lines.** The caption is a short stacked list there.

## Defects remaining (honest)
- **Phones:** the board is long (each row on three lines).
- **Repayment tiles** are short forms of the firm's lines (the full line is spoken and in the caption).
- **First view:** a fast scroller sees the board flip on in about a second.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Apple AirPods Pro, primary)
- **Transferred:**
  - numerals as events (each figure arrives when it becomes your answer);
  - the figure as the largest thing on the row;
  - a precise, product-grade interface object.
- **Not transferred:**
  - pinned scroll (this section is tight and unpinned);
  - product renders and video;
  - Apple's typography and identity.
- **The split-flap board** is the event's form, built from scratch in the site's own colours; it is not Apple's.
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · two kinds of money (default, the owner's pick) | V2 · the money map | V3 · the board |
|---|---|---|---|
| **Composition** | Two coloured panels and a three-way switch | Three columns joined by ribbons | One board, four rows, a project picker above |
| **Asking** | Inside the home, outside and energy, or both | Pick a project or a partner | Pick a project |
| **The answer** | The half that fits lights | The path lights and money flows | The rows that fit flip to their figures |
| **How you repay** | In each partner row | A third column | On the same row as the figure |
| **Where it is weaker** | Less playful | Wide; the ribbons need room | Long on phones |

**My call:** V3 is a genuine challenger. It gives the most direct "your partners, your figures, your repayment" answer in one glance, with the strongest event in the section. V1 stays the owner's pick for its simplicity, and V2 explains the relations best. The defaults are not changed; the owner picks.

## Evidence (`qa/new/financing-v3/`)
- `v3-1440-unsure-kitchen-roof.jpg`: all four (not sure yet); Kitchen; Roof with Ygrene read.
- `v3-1440-flip-sequence.jpg`: one flip from "not sure" to Kitchen, at 90, 260, 460 and 1200ms.
- `v3-390-states.jpg`: the phone.
- `v3-768.jpg` and `v3-900.jpg`: the two-line rows.
- `v3-1440-reduced-motion.jpg`: reduced motion.
- `v3-single-file.jpg`: V3 picked through the header switch inside the delivered single HTML file at 1440 and 390, with Roof chosen.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
