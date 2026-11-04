# GATE-NEW · Financing · V4 "The house, annotated"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding, until the owner stops it), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 3, section 3 of 7. Hero V4 and How a job runs V4 were accepted by Muse.

The default is unchanged: V1 ("two kinds of money", the owner's pick) stays version 1; V2 and V3 are untouched. No backups ship.

**How to see V4:**
- **Header switch.** Use the Financing "1 · 2 · 3 · 4" switch while the section is in view. On phones it is the "‹ 1/4 ›" stepper.
- **Built page.** `elbaz-homepage.html?financing=4` opens V4 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Makhno Studio** is the primary ("the home as an explorable instrument: target-marked openings"; day/night and seasonal modes were not seen, so none are used). The target-marked home is taken: the visitor asks the question by touching the part of a house. Hero V3 used Makhno on a photograph; V4 uses it on a drawn section of a house, for money rather than craft.
- **Signature move:** the house, annotated.
  - A section drawing of a South Florida house, cut open: the kitchen and the bathroom inside, the floor, the roof, the windows with their storm shutters, and the AC condenser outside.
  - Target marks sit on each part, using the section's own six project choices (kitchen, bathroom, flooring, roof/windows/doors, HVAC/storm protection, not sure).
  - Tap a part and it lights. The financing partners that usually fit are pinned to it by callout lines drawn across the page, as on an architect's annotated drawing. Each callout shows the partner's published figure and how it is repaid; the partners that do not usually fit stay quiet.
  - Because the firm's routing follows where the work is (interior finish work on consumer credit; the roof, windows, doors, HVAC and storm protection also eligible for PACE), the drawing makes the routing visible: inside, or the house's shell and systems.
- **Style family:** an annotated architectural section drawing (ink line drawing, callout leaders, tagged notes).
  - V1 is two panels with a switch.
  - V2 is a flow map of ribbons.
  - V3 is a split-flap board.
- **The owner's law for this section:** visual and creative, never document-like. The drawing is the interface; the text is the callouts and one answer line.
- **WEB-SKILLS tags per element:**
  - **Drawing:** S0362 (line drawing, strokes before fills); S1306 (removal test: no ornament, only parts that are projects); S0083 (one lit part).
  - **Marks:** S1441 (44px); S1018 (the project chips are a radio group: arrows, Home and End; the marks are buttons); S1443 (tap on touch).
  - **Callouts:** S0062 (stroke offsets and opacity only; the leaders are drawn in); S0666 (the figure is the largest thing on each callout); S1426 (proximity: each callout tied to its part).
  - **Answer:** S1425 (text on paper); S0226 (the CTA, 4.8 · 343, the licence and "not a lender" by the action).
  - **Reduced motion:** S0400 (leaders appear at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1, V2 and V3 all start from a list of project names. V4 starts from the house: you point at the part you are changing.
  - **Why it is better.** It is the most natural question a homeowner can be asked ("which part of your house?"), and the answer is drawn onto the house itself, with the partners attached where the money would go.
  - **Facts and routing.** Every figure, repayment line and reason comes from FACTS.md "Financing", through the section's own data (`P`, `PROJ`, `ROUTES`, `WHY`).

## What was built
**Files:**
- `remodeling/src/sections/financing.html`: V4 added in the existing version system (`.ver[data-v="4"]`, prefix `hs__`, checked free), with the drawing as inline SVG.
- `css/sections/financing.css`: a V4 block appended.
- `js/sections/financing.js`: a `4:` definition reusing `P`, `PROJ`, `ROUTES`, `WHY`, `ic()` and the shared footer.
- V1 to V3 are untouched.

**The drawing** (an ink section of a single-storey house, cut through):
- **Structure:** the ground (hatched), the walls cut solid, and a partition.
- **The parts**, each a project from the section's own list:
  - the roof (with its battens);
  - the floor (planks);
  - the kitchen (base and upper cabinets, a tap);
  - a kitchen window;
  - the bathroom (tub, vanity, mirror, shower);
  - a bathroom window with storm shutters;
  - the AC condenser outside with its line into the wall.
- **Removal test (S1306):** nothing is drawn that is not a project or the structure holding one.
- **Key below:** "Inside the home" (clay tint) and "The shell and its systems" (ink tint), the two ways a lit part is shaded.
- **On arrival** the drawing draws itself in line by line, and then the target marks appear.

**Marks** (44px rings with a clay dot and a soft pulse, the name on hover or focus):
- Kitchen → kitchen.
- Bathroom → bath.
- Floors → flooring.
- Roof and the kitchen window → roof, windows or doors.
- Storm shutters and the AC unit → HVAC or storm protection.
- **Phones:** the window and shutter marks are hidden, because their neighbours carry the same projects; the closest two marks are 52px apart at 360.

**Choosing** (a mark, or the six project chips beneath, a radio group with arrows, Home and End):
- the parts of that project light (clay inside, ink on the shell);
- the partners that usually fit (the section's `ROUTES`) are pinned to the touched mark by curved callout leaders, drawn in (clay for consumer credit, ink for property-assessed);
- the rest step back;
- the firm's reason (`WHY`) reads beneath.
- "Not sure yet" lights the whole house and pins all four from its middle.

**The callouts:** kind, partner, the published figure (2.25rem, never wrapped) with its unit, "Repaid: …" and the source line, all from `P`, verbatim.
- 2 × 2 beside the house on wide screens.
- In a row of four under the full-width house from 1099px down.
- 2 × 2 on phones.
- The leaders re-route to the callouts' top edges when the callouts sit below the house.

**Then:** the shared footer (Book a consultation, 4.8 · 343, the licence string, and "Elbaz Construction is not a lender…").

**Reduced motion (S0400):** no draw-in, no pulse, leaders appear at once.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Financing V4** | **8** | **8** | **9** | **10** | **8.4** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.8 + 1.0 = 8.4.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **An architect's annotated drawing:** one ink section of a house with callouts pinned to the lit part. Visual, never a document (the owner's law).<br>**The routing made visible:** inside versus the shell and its systems.<br>**Heights:** 1106px at 1440 (V1 1063, V2 1248, V3 1132), 1391px at 1024, 1472px at 768, 1456 to 1572px on phones. | The callouts carry five short lines each, so the right-hand half is denser than the drawing. At 1024 to 768 the full-width house plus the callout row make the section tall. |
| **Usability 8** | **Verified at 1440 mouse, 1024, 768 and 390 touch, and reduced motion:**<br>• the kitchen mark pins Synchrony and Service Finance (2 leaders);<br>• the AC unit pins Service Finance, Ygrene and RenewPACE (3) and lights the shutters too;<br>• "Not sure yet" lights the whole house and pins all four;<br>• the chips' Home then Right reaches Bathroom.<br>**Measures:** 0 targets under 44px; marks never overlap (52px apart at 360); 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | The project chips are revealed on scroll like the rest of the site's copy, so a fast scroller meets the drawing first. |
| **Creativity 9** | A move the section did not have: the question asked by pointing at a house, answered by notes pinned to it, as on an architect's drawing. | It shares the target-mark idea with Hero V3, applied here to money rather than craft. |
| **Content 10** | **Figures, units, kinds, repayment lines and source lines** are `P`, verbatim. The routing and reasons are `ROUTES` and `WHY`. The marks map to the section's own six projects.<br>**By the action:** CTA, 4.8 · 343, the licence and "not a lender", verbatim.<br>Locks **0 fails**; outside links **0**. | The H2, the lead and the key's two labels are my wording; Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V4 at 1440, 1024, 768, 414, 390 and 360, reduced motion, the single file);
- no images (the house is drawn);
- facts verbatim; no outside links;
- nothing claims the firm lends;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **The section was 1320px tall at 1440.** Four callouts stacked beside a house that sat low in its frame. Fixed: the callouts are 2 × 2, the drawing's empty sky is cropped, and the key sits under the drawing; now 1106px.
2. **"6–132" broke across two lines** in the narrow callouts. Fixed: the figure never wraps, and the unit drops below it.
3. **At 1024 the house was small beside a tall callout grid.** Fixed: below 1100px the house takes the full width and the callouts sit in a row beneath, with the leaders re-routed to their top edges.
4. **Marks crowded on phones.** The window and shutter marks are hidden there (the roof and AC marks carry their projects), and the floor mark moved along the floor; the closest marks are 52px apart at 360.

## Defects remaining (honest)
- **Density:** the callouts are dense (five lines each).
- **Height:** the section is tall from 1024 down.
- **Chips on scroll:** the project chips are revealed on scroll.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Makhno Studio, primary)
- **Transferred:**
  - the home as an instrument;
  - target-marked parts you touch to ask a question;
  - the answer appearing on the home itself.
- **Not transferred:**
  - Makhno's 3D renders;
  - drag, zoom and play;
  - day/night and seasonal modes (never seen);
  - its identity.
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · two kinds of money (default) | V2 · the money map | V3 · the board | V4 · the house, annotated |
|---|---|---|---|---|
| **Asking** | Inside, outside, or both | A project or a partner | A project | Point at the part of a house |
| **The answer** | The half that fits lights | A lit path with money flowing | Rows flip to their figures | Callouts pinned to the part |
| **Why it fits** | Two panels | The routes as ribbons | Rows lit or blank | Inside versus the shell, drawn |
| **Where it is weaker** | Less playful | Wide | Long on phones | Dense callouts; tall from 1024 down |

**My call:** V4 is a genuine challenger. It asks the homeowner's own question, "which part of my house?", and draws the answer onto it. V1 stays the owner's pick for its simplicity, and V3 has the strongest single event. The defaults are not changed.

## Evidence (`qa/new/financing-v4/`)
- `v4-1440-drawing-kitchen-ac-notsure.jpg`: the drawing; the kitchen with two callouts; the AC unit with three; "Not sure yet" with all four.
- `v4-1024.jpg`, `v4-768.jpg`: the full-width house with the callouts beneath.
- `v4-390-states.jpg`: the phone.
- `v4-1440-reduced-motion.jpg`: reduced motion.
- `v4-single-file.jpg`: V4 picked through the header switch inside the delivered single HTML file at 1440 and 390, with the AC unit chosen.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
