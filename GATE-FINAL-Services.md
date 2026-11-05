# GATE-FINAL — Section 3: SERVICES (Version A, "Sideways sequence", rebuilt)

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (SERVICES block, Part 3 of the owner's words). **Owner's asks:** keep A's idea/world; backgrounds must not all be the same and never flat pure white; animations rebuilt to the BEST kind (SVG animation standard, not the current okay-okay ones); the services' DETAILS visible without making the visitor work for them.

## 1. Self-audit of the old Services A, then decisions

From the prep sub-agent's inventory (`siding/redo/prep/final/services.md`): A was a pinned track of three scenes built of CSS-gradient boards (flip on click), a div casement (hover), and 117 3D-rotated roof tabs; its background was `rgba(255,255,255,.9)` (the owner's complaint); five trades were mere chips; **four phrases were not published** ("241" = 210 + 31, a sum; "330 of 376" = 238 + 54 + 38, which appears nowhere; "1–2 weeks on site"; "from a GAF Master Elite contractor") and one was an invented policy line ("No patch repairs").

**Decisions:** a pinned, **sideways** sequence of four scenes, each a real inline-SVG drawing **scrubbed by scroll** (every part has its own start, end, easing and properties: opacity, position, scale, rotation, stroke-draw), each on **its own background**, and a **record ledger of all nine documented trades beside the scene at all times** (counts, bands, priced counts) so nothing is hidden behind a click. Only the firm's published numbers and verbatim FAQ sentences; nothing summed.

## 2. What was built

- **The stage** (pinned 540 screens-height, 470 on phones): left, the four scenes sliding sideways; right, the ledger; a row of four named dots (buttons) jumps to a scene.
- **01 Siding (deep green wash with faint lime lap lines):** the studs and sheathing fade in, nine lap boards rise from the sill one after another (each with a highlight, a 3 px shadow line and a nail at each end), a dimension line draws beside a board showing the published **8.25 in** profile, then a board-and-batten wall wipes in on the right (the published "accent") with the tag "HardiePlank lap · board and batten accent". Sentences, verbatim: "A siding replacement typically takes 1 to 2 weeks, including the painting process." and "James Hardie siding carries a 30-year non-prorated warranty when an Elite Preferred contractor installs it."
- **02 Windows (a dim warm dawn glow on near-white):** the casing draws itself, the frame fills, the upper sash and glass appear, the lock turns, the **lower sash slides up with a springy ease**, a reflection streak sweeps across the glass, a light wedge falls into the room; a hinged casement opens beside it. Sentences, verbatim: "Most of the window-only jobs in our files took two days on site." and "NT Windows, built in Texas, is on 238 of our 376 priced window jobs."
- **03 Roofing (lime-and-green tint with drifting contour lines):** nine shingle courses are laid from the eave to the ridge (each drops and settles, with tab lines and a highlight), the ridge cap draws in lime, and the metal roof's standing seams draw one by one; the chip "GAF Master Elite" (the published credential).
- **04 The other five trades (a soft dot-grid on near-white):** five small cards each draw their own trade: exterior painting (a roller stripe), gutters (a gutter line draws and a drop runs down the downspout), exterior doors (a door swings open), patio covers (posts and rafters draw), garage doors (slats roll up).
- **The ledger (always visible, desktop):** Siding 431 · Windows 388 · Exterior painting 320 · Shingle roofing 210 · Gutters 121 · Exterior doors 109 · Patio covers 34 · Metal roofing 31 · Garage doors 9, each with its published median band and priced count, and the published footnote; the row(s) of the scene in view light up (dark, with a lime numeral). On phones the ledger beneath the scene lists the active scene's rows.
- **Reduced motion:** no pin and no scrubbing: the four scenes stacked in their finished state, then the whole ledger.

**Background treatment (new owner order):** four different backgrounds (green wash and lap lines; dawn glow; lime-green gradient with contour lines; dot grid), the stage on a soft green-tinted gradient, the ledger on frosted white-on-green: nothing is pure white.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Apple AirPods Pro (the product page's pinned, scroll-scrubbed illustrated sequence with numbers as events)**, the reference Services N used; with **Graza** as the custom-animation quality bar. **Transfers:** one object assembling itself through the scroll; one large number per beat. **Does not transfer:** their products, type or colours. The sideways idea is the owner's Version A.

| Level | Element | Skill → how used |
|---|---|---|
| Section | Services | ⟦S1434⟧ visual-hierarchy: the scene, then the ledger; ⟦S1426⟧ law-of-proximity: each scene's sentences and the lit ledger row sit together; ⟦S1454⟧ serial-position: the most documented trades first; ⟦S0220⟧ anti-slop: published numbers and sentences only |
| Element | ledger | ⟦S0453⟧ pricing-page: count, median band and priced count set together with the published footnote; ⟦S1444⟧ one choice at a time via the dots; ⟦S1494⟧ plain labels |
| Motion | scenes | ⟦S1436⟧ animation-principles: staggered boards (follow-through), a springy sash, slow-in slow-out slides; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: transform, opacity and stroke-dashoffset only, one rAF, only the active scene and its neighbour are painted; ⟦S0400⟧ accessible-animation: a real static layout for reduced motion |
| Element | controls | ⟦S0054⟧ fixing-accessibility: named buttons (28 px dots inside a 44 px group), focus rings, text alternatives; ⟦S1441⟧ fitts-law |
| Site | weight | ⟦S0231⟧ web-performance: 38 KB for the whole section, no image, no library |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `services-siding-1440.png`, `services-sequence-1440.jpg` (eleven moments from 2% to 98%), `services-sequence-390.jpg` (phone). **25 of 25 checks pass** (`tools/serv_test.js`):

| Check | Result |
|---|---|
| Ledger | Nine rows; every count, band and priced figure found in the firm's published list (svc8.js) |
| No sums | No 241, 330, 497 or 361 anywhere in the section |
| Sentences | Every sentence verbatim in the firm's FAQ; the four old unpublished phrases are gone |
| Footnote, links | Published footnote verbatim; no link in the section |
| Sideways sequence | Track at 0, −25, −50, −75% for the four scenes; the ledger lights Siding; Windows; Shingle and Metal roofing; the five others; all nine rows visible at once on desktop |
| Scrubbed drawings | The siding board count grows with scroll (more parts at each step) and un-draws when you scroll back; roofing draws its nine rows and nine seams |
| Backgrounds | Four different scene backgrounds, none flat or white |
| Controls | The named dots jump to a scene |
| Contrast | All ≥ 4.5 (scene text on its background, ledger, footnote, the lit row) |
| Fonts, errors | Montserrat and Inter only; 0 page errors |
| Layout, 7 sizes | The scene and ledger fit the screen and clear the phone bar; the ledger shows the active scene on phones; no overflow |
| Reduced motion | Static: four scenes stacked, the whole ledger |
| Frame time | Median frame ≤ 25 ms while scrubbing the whole sequence in headless software rendering |

## 5. Defects found and fixed

1. A thin white vertical line crossed the wall at the start (the board-and-batten wipe at scale 0.02 was still visible): it now starts at opacity 0.
2. The drawings overlapped the scene title; the art area was moved below the caption (30% down).
3. The scene tags clipped ("Sash, lock, screen, s…") or collided with the caption; moved to the foot of each scene and widened.
4. The scene dots collided with the tags; moved to the bottom right.
5. Buttons used the browser's default font; fixed.
6. Garage slats were mis-specified (the same offset for every slat); each now rolls up with its own stagger.

## 6. Remaining, named honestly

- **The drawings are clean vector illustrations, not photographs.** They are accurate to the trade but simple; the micro-detail (nails, shadow lines, weatherstrip, the sash lock, the light wedge) is there, but a motion designer could still go further (textured grain, a physical simulation of the drip).
- **The art uses about 60% of the scene's area** (it is height-limited), leaving calm margins.
- **The minor trades have no published sentence**, so none is shown; they carry the counts and bands only.
- **"Rot and water damage" is not here** (it is not one of the nine documented trades).
- **Testing:** Chromium only.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.3** | Four distinct scenes drawn and scrubbed, each on its own background, with a dark ledger highlight that ties them together (`services-sequence-1440`). **Minus:** the drawings are flat vectors; the scenes leave margins |
| Usability (30) | **8.5** | Every count, band and sentence visible without a click; dots to jump; reduced-motion and phone layouts verified; the ledger follows the scene. **Minus:** a long pin (540 screens-height) |
| Creativity (20) | **8.4** | Boards laid course by course, a springy sash, shingles laid to the ridge, a drop running down a downspout, a door swinging. **Minus:** the sideways idea is the owner's |
| Content (10) | **9.0** | Only published numbers and verbatim sentences; four old unpublished phrases removed; nothing summed. **Minus:** none found |
| **Weighted** | **8.45** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.3 + 0.3 × 8.5 + 0.2 × 8.4 + 0.1 × 9.0 = 3.32 + 2.55 + 1.68 + 0.90 = **8.45**.

## 8. Sub-agent use, stated honestly

The Services A inventory sub-agent (read-only, prep) found the four unpublished phrases and proposed the scene concepts; I built, tested and gated the section myself. No background tasks.

## 9. Next: Section 4, Visualiser (Version O, "Recolour a real house")

**Consult-first plan:** keep the real-photograph recolour; give it a **different photograph from the hero** (the hero uses #36), re-trace the masks for the new photo, and heavily upgrade the image and UI; add the Hero V1 effect (the outer parts disassemble when the cursor moves onto them and reassemble when it leaves, in small short pieces, properly made); keep the honesty label exactly; add micro details (window frames, door, trim, soffit masks; time-of-day light; a before/after hold; colour chips with real names; a sample card). The Visualiser prep agent found #41 usable (7/10) and #36 was the better candidate, which the hero now uses; I will test the remaining photographs again for the new choice.
