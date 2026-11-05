# GATE-FINAL — Section 4: VISUALISER (Version O, "Recolour a real house", rebuilt)

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (VISUALISER block). **Owner's asks:** keep the real house; heavy image work and heavy UI/UX work; micro details; add Hero V1's disassemble / reassemble effect in small, short pieces; keep the honesty line exactly: "A real Austin Pro job, recoloured on screen. Colours are approximate; see real samples at the free inspection."

## 1. Self-audit of the old Visualiser O, then decisions

The old O recoloured one photograph with a flat tint, had no light control, no compare, and nothing that reacted to the pointer. **Decisions:** (a) a **different photograph from the hero** (hero = #36; this section = **#3, "Maple Run, Austin · Jul 2026 · Siding, Exterior Painting & Gutters"**, the record is printed under the picture exactly as photos.json has it); (b) a **luminance-preserving recolour** (target colour × the photograph's own light, so boards keep their shadow lines and sun), with highlights compressed so a dark colour never looks painted on; (c) the **siding cut into 451 short tiles** that lift and tumble where the pointer touches and **reassemble** with spring physics when it leaves; (d) the same tiles run a **flip wave from the ground up** when the colour changes; (e) a **house-wrap layer** under the lifted tiles, so what you see through the gap is the wall, not a hole; (f) four kinds of light and a hold-to-compare.

## 2. What was built

- **The photograph:** 1600 px WebP (267 KB), never upscaled (shown at most 917 px wide on desktop). Siding mask traced once on the 1400-space polygons, rasterised at 1600 px; sky, brick, grass, windows, door and roof are identical to the photograph (measured, diff 0).
- **17 ColorPlus colours**, the published list, in order (Arctic White … Countrylane Red), as named swatches with a ring on the active one, the name in a pill on the photograph, and a plain-language line: "Iron Gray siding, midday light."
- **Light:** Midday, Morning, Golden hour, Dusk: each a blend-mode layer fading in over the photograph (one at a time).
- **Hold to compare:** press and hold the button (pointer, touch or Space/Enter) to see the original; the pill changes to "As photographed"; release returns.
- **Surprise me** (a random other colour), **Reset** (Iron Gray, Midday), **arrow keys** step through the colours.
- **Tile effect (Hero V1's idea, made small):** a pointer (or a finger) over the siding lifts the nearest tiles, which rotate and drift; moving away lets them fall back with a spring. Never more than a few dozen move at once; all 451 are at rest within about a second.
- **Sample card:** "Bring this to your inspection: Iron Gray siding · window trim as installed" with an **internal** link to the booking section (`#booking`): no outside link anywhere in the section.
- **Honesty label** exactly as ruled, under the picture. No extra line (the photograph has brick, but the ruling was no extra line unless it is recoloured; it is not).
- **Reduced motion:** pointer is inert (no tiles), colour change is instant; the recolour, light, compare and keys all still work.
- **Touch:** a tap lifts the tiles around the finger; they return; no hover dependence.

**Background treatment:** the drawn **colour-chip and roller-stroke art from the background kit** (inlined, ids renamed, kept off the photograph) on the dim near-white ground; nothing is pure white; the control panel is frosted green-tinted white.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Sherwin-Williams ColorSnap Visualizer (a real photograph, a named colour list, instant recolour, a compare control)**, with **Cowboy.com's tactile pointer feedback** as the quality bar for the tile motion. **Transfers:** one real photograph, named swatches and a plain "this is approximate" honesty note; a physical response to the pointer. **Does not transfer:** their paint library, their upload step, their visuals, any claim of colour-matching; the tile effect is the owner's Hero V1 idea, not copied code.

| Level | Element | Skill → how used |
|---|---|---|
| Section | Visualiser | ⟦S1434⟧ visual-hierarchy: the house first, the swatches second, the light third; ⟦S1426⟧ law-of-proximity: swatch names sit under their chips, the pill sits on the photograph; ⟦S0220⟧ anti-slop: real job, real colour names, honesty line verbatim |
| Element | swatches, light | ⟦S1444⟧ one choice at a time; ⟦S1494⟧ plain labels; ⟦S1441⟧ fitts-law: every target ≥ 44 px (measured, minimum 46) |
| Motion | tiles, flip wave | ⟦S1436⟧ animation-principles: spring settle, ground-up stagger, follow-through; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: canvas layers + transforms, one rAF, idle when nothing moves; ⟦S0400⟧ accessible-animation: inert pointer and instant change under reduced motion |
| Element | controls | ⟦S0054⟧ fixing-accessibility: real buttons, 3 px focus ring, arrow-key roving, alt text on the photograph |
| Site | weight | ⟦S0231⟧ web-performance: one 267 KB image, no library |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `visualiser-sheet.jpg` (rest · tiles lifted at the pointer · flip wave to Boothbay Blue · Boothbay Blue in golden hour), `visualiser-scatter.png`, `visualiser-flip.png`. **25 of 25 checks pass** (`tools/vzt.js`):

| Check | Result |
|---|---|
| Honesty label | Exactly the ruled string |
| Record, photo | = photos.json #3 exactly; one photograph; real alt text; 1600 px natural, never upscaled |
| Colours | 17, the published list, in order; 17 distinct results; never touch the sky (diff 0) |
| Fidelity | Iron Gray start: wall recoloured (diff 94), sky / brick / grass identical (0 / 0 / 0); sunlit wall median 85,89,87 vs #575B59 (within 30) |
| Tiles | 451 tiles; pointer lifts 45 and all return to 0; a colour change moves 448 and ends at rest; the photograph is whole again after settling |
| Compare, light | Hold shows the original while held and returns; the four lights switch one at a time |
| Surprise, Reset, keys | Pick another colour; return to Iron Gray / Midday; arrow keys step; 3 px focus ring |
| Links | Only `#booking` (internal) |
| Contrast | All ≥ 4.5 (lowest 5.22) |
| Fonts, errors | Montserrat and Inter only; 0 page errors |
| Reduced motion, touch | Pointer inert, change instant; a tap lifts 70 and they return |
| Layout, 4 sizes | 1440 / 1024 / 768 / 390: no overflow, every target ≥ 44 px, 0 errors |

## 5. Defects found and fixed

1. The Hold-to-compare handler threw `setPointerCapture` ("no active pointer") when driven by a synthetic or lost pointer: now guarded (`try/catch`).
2. Two fidelity checks failed on a **test-point error**, not a product defect: the sampled "sky" pixel (1200,120) is grey roof; moved to a true sky pixel (1450,60). Both now 0 difference.
3. **Trim recolour abandoned:** three attempts to trace window casings and soffit from colour alone failed (white casings cannot be separated from light greige siding by threshold, ring or exclusion). Instead of shipping a ragged mask, **trim is left "as installed"**, and the sample card says so. Consistent with the earlier ruling (untraced trim stays as shown).
4. Tiles first revealed a hole when lifted; the house-wrap layer now sits beneath them.

## 6. Remaining, named honestly

- **Trim and soffit are not recolourable** (not traced); the card says "window trim as installed". A hand-traced mask would fix it; it needs a person with an image editor, not a threshold.
- **Mask rims:** at a few window casings a 1–2 px rim of original colour can show at 100% zoom (measured only on the photograph, not in a colour test).
- **Colours are approximate** (the label says so); luminance-preserving recolour cannot reproduce a real paint chip's undertone.
- **The tile effect is a visual, not data:** tiles are cut by geometry, not by real board positions.
- **Brick is not recolourable** (not siding).
- **Testing:** Chromium only, headless software rendering.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | A real house with believable light, shadow lines preserved, a calm control panel with named swatches (`visualiser-sheet.jpg`). **Minus:** trim not recolourable; rare rim at casings |
| Usability (30) | **8.7** | 17 named colours, light, compare, reset, surprise, arrows, touch; every target ≥ 44 px; reduced-motion path works. **Minus:** the tiles can be busy for some, though they are small and short |
| Creativity (20) | **8.6** | Siding that tumbles away under the pointer, a ground-up flip wave, a house-wrap plate under the gap. **Minus:** the effect is the owner's idea |
| Content (10) | **8.8** | Real job record, published colour names, honesty line verbatim, no claims. **Minus:** none found |
| **Weighted** | **8.57** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.4 + 0.3 × 8.7 + 0.2 × 8.6 + 0.1 × 8.8 = 3.36 + 2.61 + 1.72 + 0.88 = **8.57**.

## 8. Sub-agent use, stated honestly

A read-only prep sub-agent earlier compared the photographs for recolour suitability (it rated #41 usable at 7/10, #36 the best candidate, which the hero took; #3 was chosen here by me after viewing masks). I traced the mask, wrote the engine, tested and gated the section myself. No background tasks.

## 9. Next: Section 5, Windows (Version A rebuilt with Version F's idea)

**Consult-first plan:** on the left the **kinds**: single hung, double hung, casement, slider, picture; the visitor can **open the window** (each kind opens the way it really opens), **change frame colours** (the published colours per maker from `window_colours.json`), and edit more (grille pattern, glass tint only if published); all in **real, shaded SVG** (F's static poor drawings banned); generic mechanical descriptions only, flagged as unpublished by the firm; published figures only (NT 238 · Simonton 54 · Andersen 38 · Pella 31; 388 jobs; 376 priced); a dim near-white background with SVG life.
