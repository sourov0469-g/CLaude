# GATE-NEW · Reviews · V4 "The tape"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding, until the owner stops it), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 3, section 5 of 7. Hero V4, How a job runs V4, Financing V4 and Our Work V4 were accepted by Muse.

The default is unchanged: V1 (the constellation) stays version 1; V2 and V3 are untouched. No backups ship.

**How to see V4:**
- **Header switch.** Use the Reviews "1 · 2 · 3 · 4" switch while the section is in view. On phones it is the "‹ 1/4 ›" stepper.
- **Built page.** `elbaz-homepage.html?reviews=4` opens V4 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Lusion** is the primary ("flow; governs the flow maps"). Its flow is taken: the stars do not jump from a scattered field to their places. They travel as one continuous stream, in order, along a curve into the instrument that measures them.
- **Signature move:** the tape.
  - A builder's tape measure runs across the section, graduated 0 to 5 in tenths.
  - The 343 small stars, one per published Google review, flow along a single stream into its channel and pack it from 0 up to exactly 4.8: seven rows of 49, because 7 × 49 = 343.
  - A clay reading stands at 4.8; beyond it the last two tenths to 5 stay empty.
  - **The owner's rules, kept:**
    - the stars gather and form the aggregate with the scroll, fully formed when the tape reaches mid-screen, loosening on the way back;
    - the pointer scatters them and they flow back on their own;
    - a tap scatters them on touch;
    - "Scatter them" does it from the keyboard.
  - On phones the tape stands upright and fills from the bottom like a level.
- **Style family:** a construction instrument (a measuring tape on paper: case, hook, graduations, a reading).
  - V1 is the digits 4.8 in stars.
  - V2 is five rating stars filled on a night band.
  - V3 is a 7 × 7 × 7 block between two figures.
- **The owner's law for this section:** aggregate-led; only 4.8, 343 and "Google reviews". The tape's scale is the rating's own (0 to 5), and its rows are arithmetic (343 = 7 × 49). Nothing about individual ratings is implied.
- **WEB-SKILLS tags per element:**
  - **Stars and stream:**
    - S0340 (springs: scatter and return);
    - S0089 (the scroll-driven flow eases; the pointer push springs);
    - S0062 (canvas, capped pixel ratio, a 40fps ceiling, running only in view);
    - S0083 (one instrument).
  - **Scroll:** S1326 (one reversible value); S1209 (no pin).
  - **Figures:** S0666 (the reading 4.8 and the count lead); screen-reader text gives the fixed figures.
  - **Controls:** S1441 (44px); S1018 ("Scatter them" is the keyboard path).
  - **Reduced motion:** S0400 (formed and still).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 spells the figure, V2 fills rating stars, and V3 stacks the count into a volume. V4 measures: the reviews pour into a builder's own instrument and read 4.8 on its scale.
  - **Why it is better.** It speaks the firm's language (a contractor measures twice). It shows both figures at once (343 stars, a 4.8 reading on a 0 to 5 scale), and the stream gives the gather a direction and a story.

## What was built
**Files:**
- `remodeling/src/sections/reviews.html`: V4 added in the existing version system (`.ver[data-v="4"]`, prefix `tm__`, checked free).
- `css/sections/reviews.css`: a V4 block appended.
- `js/sections/reviews.js`: a `4:` definition (7 rows × 49 columns = `COUNT`, 343).
- V1 to V3 are untouched.

**The head:** "343 reviews, measured." with the reading beside it: 4.8 in clay (4.5 to 8rem), "out of 5", "343 Google reviews". Screen readers get the fixed sentence "4.8 out of 5, the average across 343 Google reviews."

**The tape** (canvas, the site's ink, paper and clay):
- an ink case with its spool;
- a sand blade with an ink edge, graduated 0 to 5 (tenths, halves, whole numbers labelled at 14px);
- the hook at the end;
- a clay reading line and "4.8" at exactly 4.8;
- the last two tenths, 4.8 to 5, hatched and empty.

**The stars:** 343 clay stars pack the blade's channel from 0 to 4.8, seven rows of 49, column by column.

**The flow (Lusion; the owner's gather-and-form rule):**
- Before the section arrives, the stars travel along one curving stream above the tape (beside it on phones).
- As the section rises they leave the stream in order and pour into their slots from 0 upward. The tape is full when its centre reaches mid-screen; scrolling back returns them to the stream.
- One reversible value drives this; there is no pin.
- The stream moves only while stars are still on it; once formed, nothing moves.

**Scatter (the owner's rule):** the pointer pushes stars aside and they spring home (S0340); a tap scatters them on touch; "Scatter them" does it from the keyboard.

**Budget:** pixel ratio capped at 1.5, a 40fps ceiling, the loop runs only while the tape is on screen.

**Phones (under 700px):** the tape stands upright on a 600px canvas, its case at the bottom, filling upward like a level, 49 rows of 7.

**Reduced motion (S0400):** formed and still; "Scatter them" is hidden.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Reviews V4** | **8** | **8** | **9** | **10** | **8.4** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.8 + 1.0 = 8.4.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **A contractor's own instrument:** a tape on paper, measuring the reviews. The reading 4.8 is set large twice (head and tape), and the stars read as stars in seven neat rows.<br>**Heights:** 800px at 1440 (V1 1189, V2 641, V3 982), 732px at 768; 1032 to 1053px on phones (the tape stands upright). | On phones the upright tape is narrow, so its stars are small (about 7px apart along the tape). At 768 the flat tape's stars are also small. |
| **Usability 8** | **The owner's behaviour, verified:**<br>• the stream flows in with the scroll and reverses;<br>• the tape is full at mid-screen;<br>• a scatter changes 9.2% of the tape's pixels, and 3s later only 0.6% differ (sub-pixel spring residue), so the stars return to their slots;<br>• a tap scatters on touch;<br>• "Scatter them" works from the keyboard.<br>**Measures:** 0 targets under 44px; 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | The canvas itself has no keyboard role beyond the button (as in V1 to V3). |
| **Creativity 9** | A move the section did not have: the reviews flow as one stream into a builder's measuring tape and read 4.8 on its scale. The gather has a direction and a story, and the instrument is the trade's own. | It shares the spring physics of V1 to V3; the new parts are the flow, the instrument and the order of filling. |
| **Content 10** | **Only 4.8, 343 and "Google reviews".** The scale is the rating's own (0 to 5); the rows are arithmetic (7 × 49); nothing implies individual ratings.<br>Locks **0 fails**; outside links **0**. | The H2 "343 reviews, measured." and the hint are my wording; Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V4 at 1440, 768, 414, 390 and 360, reduced motion, the single file);
- no images;
- the aggregate is locked at 4.8 and 343; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **The stars read as a dotted pattern, not stars,** because the blade was 80px deep for seven rows. Fixed: the blade is 120px deep on wide screens (canvas 300 to 340px) and 104px wide on phones (canvas 600px).
2. **My first scatter measurement read 0% change.** The canvas-pixel sampling method used for V3 did not register the scatter on this canvas (I did not establish why). It was re-measured from screenshots of the tape: 9.2% scattered, 0.6% after 3s.

## Defects remaining (honest)
- **Small stars:** on phones and at 768 the stars are small.
- **Fast scrolling:** a fast scroller sees the stream pour in under a second (the owner's scroll-driven rule).
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Lusion, primary)
- **Transferred:**
  - flow: one continuous stream that becomes the figure;
  - motion with a direction and an order.
- **Not transferred:**
  - WebGL and fluid simulation;
  - continuous ambient motion (the stream stops once the tape is full);
  - Lusion's identity.
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · the constellation (default) | V2 · the rating, filled | V3 · the solid block | V4 · the tape |
|---|---|---|---|---|
| **What the stars form** | The digits 4.8 | Five stars filled to 4.8 | A 7 × 7 × 7 block | A tape measure filled to 4.8 |
| **Ground** | Paper | Night band | Paper | Paper |
| **How they gather** | From a field | From a field | From a field, the camera turning | As one stream, in order |
| **Height at 1440** | 1189px | 641px | 982px | 800px |
| **Where it is weaker** | The figure only | Small stars on phones | A dense lattice | Small stars on phones |

**My call:** V4 is a genuine challenger. It is the most on-brand of the four (a builder measures) and the only one where the gather has a direction. V1 stays the boldest figure, and V2 the most legible rating. The defaults are not changed.

## Evidence (`qa/new/reviews-v4/`)
- `v4-1440-stream-flowing-in.jpg`: the stream above the tape; pouring in; full at 4.8.
- `v4-1440-scatter-and-return.jpg`: a pointer pass scattering the stars; returned.
- `v4-390-upright-tape.jpg`: the phone's upright tape filling.
- `v4-768.jpg`: the tablet.
- `v4-1440-reduced-motion.jpg`: reduced motion.
- `v4-single-file.jpg`: V4 picked through the header switch inside the delivered single HTML file at 1440 and 390.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
