# GATE-NEW · Reviews · V3 "The solid block"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 2, section 5 of 7. Hero V3, How a job runs V3, Financing V3 and Our Work V3 were accepted by Muse.

The default is unchanged: V1 (the constellation spelling 4.8) stays version 1, and V2 (the rating, filled) is untouched. No backups ship.

**How to see V3:**
- **Header switch.** Use the Reviews "1 · 2 · 3" switch while the section is in view. On phones it is the "‹ 1/3 ›" stepper.
- **Built page.** `elbaz-homepage.html?reviews=3` opens V3 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Immersive Garden** is the primary ("the chaptered camera-scrub build journey … its heavyweight class stays inside a performance budget"). Its camera scrub is taken: the scroll moves the camera, here a quarter turn around one formed object. It is built in 2D canvas inside the section's existing budget (343 points, a capped pixel ratio, a 40fps ceiling, running only while in view).
- **Signature move:** the solid block.
  - 343 is exactly 7 × 7 × 7. The 343 small stars, one per published Google review, gather out of a loose field into a solid cube, seven stars on every side, as the section rises. They are fully formed when it reaches the middle of the screen and loosen again if you scroll back (the owner's gather-and-form rule, kept).
  - While you scroll, the camera turns around the block; drag it to turn it yourself.
  - The pointer pushes the stars aside and they spring home on their own; a tap scatters them on touch; "Scatter them" does it from the keyboard (the owner's rule, kept).
  - The two published figures stand either side of the block: 4.8 (out of 5) and 343 (Google reviews).
- **Style family:** an isometric object drawn in ink on paper (a sculptural data object; the stars shaded by depth, the cube's edges ruled in).
  - V1 is the constellation spelling "4.8" on paper.
  - V2 is five large stars filled to 4.8 on a night band.
- **Composition:** a symmetric triptych, the figure 4.8, the block, the figure 343. V1 and V2 both put the copy in a column beside the stars.
- **The owner's laws for this section, kept exactly:**
  - aggregate-led: only 4.8 and 343, no quote, no name, nothing invented. The block's shape is arithmetic (343 = 7 × 7 × 7) and says nothing about individual ratings;
  - the gather-and-form behaviour, driven by the scroll;
  - the pointer scatters and the stars reassemble on their own.
- **WEB-SKILLS tags per element:**
  - **Block and stars:**
    - S0340 (stars on springs);
    - S0089 (the scroll-driven gather eases; the drag follows the hand);
    - S0062: canvas, capped pixel ratio, frame ceiling;
    - S0083: one focal object.
  - **Camera:** S1326 (one reversible value drives the gather and the turn); S1209 (no pin, native scroll); S1443 (a sideways drag turns it on touch, vertical scroll left alone).
  - **Figures:** S0666 (the two numerals lead); screen-reader text gives the fixed figures.
  - **Controls:** S1441 (44px); S1018 ("Scatter them" and "Turn the block" are keyboard paths).
  - **Reduced motion:** S0400 (formed, still, a fixed three-quarter view).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 forms the digits 4.8 and V2 forms five rating stars. V3 forms the count itself, as a volume, with the average beside it.
  - **Why it is better.** It makes 343 tangible. A visitor sees a solid body of reviews, not a number, and can turn it in their hands. The average stays the largest figure on the left.

## What was built
**Files:**
- `remodeling/src/sections/reviews.html`: V3 added in the existing version system (`.ver[data-v="3"]`, prefix `sk__`, checked free).
- `css/sections/reviews.css`: a V3 block appended.
- `js/sections/reviews.js`: a `3:` definition using the section's `COUNT = 343`.
- No retired definition sat on key 3. V1 and V2 are untouched.

**The triptych:**
- 4.8 (clay, "out of 5, the average") on the left, the block in the centre, 343 ("Google reviews") on the right. The numerals are 4.5 to 9.5rem.
- On tablets and phones the two figures sit side by side above the block.
- Beneath: "Every star is one review: seven by seven by seven. Turn the block, or push the stars aside. They find their way back." Then Book a consultation, Turn the block, and Scatter them.
- Screen readers get the fixed sentence "4.8 out of 5, the average across 343 Google reviews."

**The block** (canvas):
- 343 small ink stars sit on a 7 × 7 × 7 lattice, drawn in perspective and sorted far to near. Near stars are darker and larger, far ones paler.
- The cube's twelve edges are ruled in clay as it forms.
- **Gather (the owner's rule):** before the section arrives the stars are a loose field, a little below. They gather with the scroll, each with a small delay, and are fully formed when the block's centre reaches mid-screen. Scrolling back loosens them. One reversible value drives this; there is no pin.
- **The camera (Immersive Garden):** as the section passes, the scroll turns the camera about 77° around the block.
- **By hand:**
  - a mouse drag turns it;
  - on touch a sideways drag turns it, and a vertical swipe scrolls the page;
  - "Turn the block" gives a quarter turn from the keyboard.
- **Scatter (the owner's rule):** the pointer pushes stars aside and they spring home (S0340). A tap scatters them on touch; "Scatter them" scatters them from the keyboard.
- **Budget:** the pixel ratio is capped at 1.5, with a 40fps ceiling, and the loop runs only while the block is on screen.

**Reduced motion (S0400):** formed and still at a fixed three-quarter view. "Turn the block" still turns it (at once). "Scatter them" is hidden, since nothing would move.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Reviews V3** | **8** | **8** | **9** | **10** | **8.4** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.8 + 1.0 = 8.4.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **One object between two numbers:** the block drawn in ink on paper with clay edges, in the site's own drawn language, symmetric and calm.<br>**Heights:** 982px at 1440, 997px at 768, 934 to 953px on phones.<br>**The paper ground** keeps the section in the site's rhythm (V2's ink band is the bold alternative). | The block's interior is a dense lattice: up close it reads as texture, from a distance as a solid. On phones the block sits a little high in its frame. |
| **Usability 8** | **The owner's behaviour, verified:** the gather follows the scroll and reverses; the scatter is measured (9% of sampled pixels displaced, 0% after 3s, so the stars return exactly).<br>**Keyboard:** Turn the block works, with focus kept; Scatter them works.<br>**Touch at 390:** a tap scatters; a sideways drag turns the block; a vertical swipe scrolls the page (281px).<br>**Measures:** 0 targets under 44px; 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | The canvas itself has no keyboard focus (the two buttons are the keyboard path, as in V1 and V2). |
| **Creativity 9** | A move the section did not have: the count made into a volume you can turn, using a true property of the number (343 = 7³). The scroll turns the camera around it. | It shares the section's spring physics with V1 and V2; the new part is the form, the camera and the drag. |
| **Content 10** | **Only the two published figures** (4.8, 343) and "Google reviews". No quote, no name, no claim. The cube is arithmetic and says nothing about individual ratings.<br>Locks **0 fails**; outside links **0**. | The H2 "343 reviews. One solid block." and the line beneath are my wording; Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V3 at 1440, 768, 414, 390 and 360, reduced motion, the single file). My pixel-reading tests raise a canvas readback notice; the site itself raises none;
- no images;
- the aggregate is locked at 4.8 and 343; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **The eyebrow sat left while the heading was centred** (the site's eyebrow rule sets `justify-self: start` in grids). It is centred on wide screens and left-aligned with the heading on phones.
2. **The hint said "run a pointer through it",** which means nothing on a phone. It now reads "Turn the block, or push the stars aside."
3. **"Scatter them" did nothing under reduced motion.** It is hidden there.

## Defects remaining (honest)
- **Dense interior:** the lattice reads as texture up close.
- **Phones:** the block sits slightly high in its frame.
- **Keyboard:** the canvas has no keyboard focus of its own (the buttons cover it).
- **The camera turn is tied to the scroll,** so a visitor who scrolls fast sees the block swing.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Immersive Garden, primary)
- **Transferred:**
  - the camera scrub: the scroll moves the camera around one object;
  - a heavyweight effect kept inside a strict performance budget.
- **Not transferred:**
  - WebGL and 3D models;
  - the chaptered build journey;
  - pinned scroll;
  - Immersive Garden's identity.
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · the constellation (default) | V2 · the rating, filled | V3 · the solid block |
|---|---|---|---|
| **Ground** | Paper | A night-sky ink band | Paper |
| **What the stars form** | The digits 4.8 | Five stars filled to 4.8 of 5 | A 7 × 7 × 7 block: the count as a volume |
| **The numbers** | A caption | A large numeral and a running count | Two large numerals either side of the block |
| **Interaction** | Gather, pointer scatter, tap scatter, Scatter them | The same | The same, plus the camera turned by the scroll, a drag and a button |
| **Where it is weaker** | The figure only | Small stars on phones | The lattice is dense |

**My call:** V3 is a genuine challenger. It is the most physical of the three: 343 becomes something you can turn in your hands. V1 is the boldest typographic moment, and V2 the most legible rating. The defaults are not changed; the owner picks.

## Evidence (`qa/new/reviews-v3/`)
- `v3-1440-gather-with-scroll.jpg`: the block gathering as the section rises, then formed.
- `v3-1440-scatter-reassembled-drag-turn.jpg`: a pointer pass scattering the stars; reassembled on their own; after a drag; after "Turn the block".
- `v3-390-formed-tap-reassembled-drag.jpg`: the phone, formed, a tap scatter, reassembled, and turned by a sideways drag.
- `v3-768.jpg`: the tablet.
- `v3-1440-reduced-motion.jpg`: reduced motion.
- `v3-single-file.jpg`: V3 picked through the header switch inside the delivered single HTML file at 1440 and 390.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
