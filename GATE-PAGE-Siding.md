# GATE-PAGE — SIDING (route `#/siding`, GLOBAL `FPSiding`, prefix `ps-`)

**Under:** `siding/redo/final/PAGES-BRIEF.md` (inner pages brief). **Brief to this page:** the whole James Hardie fiber-cement story from FACTS.md and the firm's siding pages, with the header's four Siding anchors as real sections; new interactive pieces (not the homepage's recolour tool, Services scenes or Process columns); only published facts; no maps, no video, no outside links.

## 1. Self-audit and decisions

The stub was one heading. Everything below is new. **Decisions:** (1) the page is a sequence of eight sections, each with one drawn, interactive piece that serves its content: a wall that hangs itself (opener), the lap board drawn to scale with a course slider and a 415-dot field (Lap), a panel-and-batten wall you build (Board and batten), a gable you change (Shingle and shake), a cut through the eave (Trim and soffit), an exploded wall you step through (layers, finishes, timeline), a price histogram you scrub (cost), a before/after wipe (four published pairs), then the Built-for-Texas five, both warranties and the CTA (close); (2) the four dropdown anchors are real sections with ids `siding-lap`, `siding-board-batten`, `siding-shingle-shake`, `siding-trim-soffit`, and the router lands on each (tested through the header's real links); (3) **where the firm publishes nothing, the page says so**: no count, spec or product claim exists for shingle or shake siding, so that block draws no product (a hatched, dashed gable, "No published spec") and quotes only the firm's own "board and batten as an accent"; frieze is likewise named but not described; (4) every number is asserted at build time against the firm's cost-guide page (band counts, city medians, same-job shares, example jobs), the siding page (301/286/36/27, 8.25 in, 7 in, 12 ft, 5/16 in, 4 ft, 2.5 in, 16 in o.c., 17 colours), the FAQ (warranties) and `svcpairs.json` (four pairs, month and band); (5) text is the firm's own published sentences wherever it states a fact.

## 2. What was built (sections, in order)

1. **Opener** (distinct from the homepage hero): "Every priced siding job is James Hardie." H1; the published lead; the policy line "We replace by the full wall or the whole house. No patch repairs."; the five locked proof chips (431 documented, 415 priced, median band $10k–$15k, 30-year, lifetime, 1 to 2 weeks); the four anchors as a small "On this page" index; **a drawn wall that hangs itself, twelve courses from the bottom up around a window and door, with a "Hang it again" button** (also replays each time the page is shown).
2. **Lap siding** (`siding-lap`): **the HardiePlank profile to scale** (18 px per inch): a cut through three boards (8.25 in board, 7 in exposure, 5/16 in thickness in an enlarged inset) beside a 12 ft wall of twenty 7 in courses with a ruler; four measurement buttons light that dimension in both drawings and read it; **a slider hangs the courses** (hangs itself when first seen); **Select Cedarmill (286 of 415) / Smooth (36 of 415)** switches the face grain on the drawings (and the board-and-batten wall); a **415-dot field** lights 301 (8.25 in lap), 27 (board and batten), 286 or 36, with the published note ("each dot a priced job, not a particular job; a line naming both textures counts as neither").
3. **Board and batten** (`siding-board-batten`): three 4 ft HardiePanel sheets and ten 2.5 in battens at 16 in on center; build it in three steps (bare wall, hang the panels, fasten the battens); panels 8 or 10 ft tall (drawn at 36 px per ft); a plan view to scale; "27 of our 415". **Shingle and shake** (`siding-shingle-shake`) sits in the same section: a gable you switch between lap, board and batten accent (quotes the FAQ) and "Shingle or shake", which claims nothing.
4. **Trim and soffit** (`siding-trim-soffit`): a schematic cut through the eave (roof, rafter, fascia, soffit, frieze, siding) and an outside corner in plan view; buttons or clicks on the drawing select Siding faces, Soffit, Fascia, Corners/trim/frieze, each lighting its outline and reading only published text; **"Full wrap / Siding faces only"** weathers the edges (the published price lever); ventilation arrows (the FAQ's words) pulse.
5. **The wall, layer by layer**: six steps (tear-off, sheathing, house wrap, HardiePlank boards, trim, paint or ColorPlus) as an exploded stack with a legend; the finish step shows **12 published Sherwin-Williams samples** (names, SW numbers, hex) and **the 17 ColorPlus colours for Austin** and re-colours the drawn boards; Rob Roy job details (new 7/16 in OSB, three-day install) are quoted as that job's; "1 to 2 weeks including paint".
6. **Where 415 real jobs landed**: the published histogram (11 bands, 415 total, median band $10k–$15k with its flag, the middle half $5k–$20k bracketed); **scrub with the pointer (hover), tap or arrow keys**; the readout names count, band and, for four bands, the firm's published example job; six city chips mark that city's published median band on the chart; the four same-job shares (72% / 33% / 15% / 15% with 297 / 136 / 64 / 63 of 415) and the six price levers. On phones the chart becomes 11 full-width rows (every row a 44 px target).
7. **Before and after**: the four published siding pairs (Milwood, Rob Roy, Maple Run, North Austin) with the wipe (pointer, touch or keyboard), thumbnail tabs, and each pair's month, product and "Siding portion" band exactly as printed.
8. **Close**: "Your roof gets the rain. Your siding gets everything else." The five Built-for-Texas facts with small drawn icons, the two warranties, the Elite Preferred badge and President's Club badge, the policy line again and the CTA to `#/contact` and the phone.

**Background treatment:** the kit's line-art on a dim sage ground (#E7EEE8 to #F1F5F1, never white), two parallax layers per section: services roofline and windows (opener, trim, close), the ruler / level / tape set (lap), swatch fan (board and batten, cost), blueprint grid and route (layers), reviews bubbles (before/after); ids renamed per use; scroll-driven `translate3d` only.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Apple's "take it apart" product explainers (the Mac Pro / Vision Pro layered-object pages that show a product as parts in the order they go together, one sentence per layer).** Chosen from memory of those pages; I did not re-fetch them in this session. **Transfers:** a physical thing shown as layers you step through, one plain sentence per step, a persistent legend. **Does not transfer:** their photography, type, purchase flow; here the drawings are made from geometry and the sentences are the firm's.

| Level | Element | Skill → how used |
|---|---|---|
| Section | whole page | ⟦S1434⟧ visual-hierarchy: H1, policy line, then chips, then the figure; each section one headline, one stage, one control column; ⟦S1426⟧ law-of-proximity: each control group sits under its own small heading beside the thing it changes; ⟦S0220⟧ anti-slop: published counts, bands, colours, quotations only, asserted at build time; empty published ground (shingle/shake, frieze) said openly |
| Element | radio groups, tabs | ⟦S1444⟧ one choice at a time (radiogroups with arrow keys, roving tabindex); ⟦S1454⟧ serial-position: lap first, 8.25 in measurement first, median band flagged; ⟦S1494⟧ plain labels |
| Motion | hang, build, explode, wipe | ⟦S1436⟧ animation-principles: bottom-up hang with stagger (follow-through), panels drop then battens grow, layers slide out then collapse; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: transform/opacity/clip-path only, one rAF parallax; ⟦S0400⟧ accessible-animation: reduced-motion shows every course, bar and dot at once, no sweeps |
| Element | controls | ⟦S0054⟧ fixing-accessibility: real buttons, `role=radio/tab/slider`, `aria-valuetext`, `aria-live` on every readout, 3 px rings; ⟦S1441⟧ fitts-law: every target ≥ 44 px (measured, all four sizes); drag areas `touch-action: pan-y` |
| Proof | numbers | ⟦S0453⟧ proof: 431/415, 30-year/lifetime, 301/286/36/27, the price distribution and four published jobs |
| Site | weight | ⟦S0231⟧ web-performance: 27 KB CSS + 45 KB JS (unminified), 339 KB of embedded WebP (8 photos at 720 px, two badges), no libraries, no external fonts or images |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `page-siding-1440-top|lap|bb|gable|trim|layers|cost|ba|close.png` and the same nine at `390`. **75 of 75 checks pass** (`tools/page_siding_test.js`, Chromium, built with `PAGES_ONLY=siding`):

| Check | Result |
|---|---|
| Structure, facts | One h1, eight sections; 29 published phrases found on the page (incl. the 17-colour and ColorPlus text in the finish step); the key numbers are in FACTS.md |
| Links, map, video | 8 links, all `#/…`, `tel:` (0 outside); no "map" wording; no video / iframe; four dropdown links resolve (`#/siding/lap` etc.) and the router lands each section within 130 px of the top; changing the hash in-page scrolls |
| Data | 11 bands sum to 415 with 107 at the median; band labels and counts match FACTS.md; the four pairs equal `svcpairs.json` (place, month, band, "Siding portion"); each tab shows its product exactly |
| Interactions | Opener hang/replay; four measurements light their dimension; the slider hangs exactly N courses (and by keyboard); Smooth removes grain on both walls; the dots light exactly 301 / 27 / 286 / 36 of 415; board and batten steps (0/1/2) and 8/10 ft (288/360 px); gable text (quotes the FAQ; shingle or shake has no number); trim part outlines, scope toggle, click on drawing; layers 1 to 6, patches, 4-layer stack, 12 + 17 swatches, ColorPlus names in order; histogram hover (33), click (92 + published example), arrows, median, six city medians, clear; same-job shares; wipe by drag (20), keys, four tabs |
| Accessibility | Focus rings 3 px or shadow on 8 control types; aria-live on all readouts; roles present; contrast ≥ 4.5 (lowest text 6.17, SVG labels 4.86); Montserrat/Inter only |
| Motion | Idle frame time 16.7 ms; reduced motion: no hang, all 20 courses and all bars at once, interactions still work, 0 errors; touch: all drag areas `pan-y`, a tap picks a band |
| Layout, 4 sizes | 1440 / 1024 / 768 / 390: no horizontal overflow, every button / link / input / slider ≥ 44 px, 0 errors |
| Weight | CSS + JS 72 KB; images 339 KB |

## 5. Defects found and fixed

1. The phone link's icon rendered huge (the homepage styles `.callx` only inside its own sections); the page has its own `.ps-call`.
2. Bar value labels were hidden under the "middle half" bracket and `<wbr>` printed as text; the chart has more headroom and the labels are real markup.
3. The lap drawing's grain translated outside the wall and made a ragged ruler; removed. On phones the single wide drawing was unreadable (6 px text): split into two drawings that stack.
4. The first eave drawing was confusing (floating siding slabs, clipped captions); redrawn with a proper rafter, deck, fascia, soffit, frieze, and the captions moved to HTML.
5. The layers stack hid itself (opaque trim plate) and labels collided: trim is now a frame, labels moved to a legend, offsets enlarged.
6. On phones 11 bars were 28 px wide (below 44): the chart becomes 11 rows below 720 px.
7. The before/after tab strip overflowed sideways below 1100 px: now a 2-column grid.
8. Booking CTAs used `#booking` (the homepage form); they use `#/contact` as the brief requires.
9. Tests: facts inside the finish `<template>` were not visible to the text check; a weak "|| true" assertion was replaced by a real one.

## 6. Remaining, named honestly

- **Shingle and shake and frieze have no published detail**, so those parts are short and honest rather than rich; the gable shows no shingle or shake product.
- **All drawings are illustrations from geometry**: the lap profile and the panel wall are to the published sizes, the eave, corner and layer stack are schematic (labelled "schematic"). The layer stack draws the published layers only; thicknesses of sheathing and wrap are not stated and not drawn to scale.
- **Milwood's month**: the firm's siding page prints May 2026 in the wipe pair and Jul 2026 in a hero strip for the same address; this page uses the pair's May 2026 (`svcpairs.json`).
- **Median-band example jobs** are shown for the four bands where the firm published one; other bands show none.
- **Financing, offers and the 25% stack are not on this page** (time-limited / terms); the monthly-payment line is omitted.
- **Testing** was Chromium only, headless software rendering, touch by emulated events, built with `PAGES_ONLY=siding` (the Contact stub's own `wire()` throws without its form; the test build wraps that call, this page's boot does not depend on it). The page was not tested with the other pages' final code.
- The opener wall is a simple illustration; it has less detail than the Windows configurator's drawing.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.2** | Dim sage grounds, kit art, consistent frosted cards, drawn stages that read at 390 px; the layered wall and histogram look finished (`page-siding-1440-layers.png`, `-cost.png`). **Minus:** the opener wall and the gable are plain; the trim section is schematic |
| Usability (30) | **8.5** | Every piece answers in place, by pointer, touch and keyboard; readouts announced; phone chart becomes rows; targets ≥ 44 px. **Minus:** the page is long (8 sections); two measurement controls and the face toggle live in one column |
| Creativity (20) | **8.5** | Profile ruler + hangable wall, a 415-dot field, a build-it board-and-batten wall, a weathering eave, an exploded layer stack, a scrubbable published histogram. **Minus:** wipe and histogram are known patterns |
| Content (10) | **9.2** | Only published numbers, bands, colours and sentences, asserted at build time; gaps said openly. **Minus:** shingle/shake and frieze have nothing to say |
| **Weighted** | **8.45** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.2 + 0.3 × 8.5 + 0.2 × 8.5 + 0.1 × 9.2 = 3.28 + 2.55 + 1.70 + 0.92 = **8.45**.

## 8. Sub-agent use, stated honestly

None. I read the brief, FACTS.md, the firm's raw pages and data files, designed, built, tested and gated the page myself. No background tasks except one long test run.

## 9. NEXT

Roofing page (`rf-` prefix, see GATE-PAGE-Roofing.md), then integration: the full build with all five pages, a cross-page pass for the header's Siding dropdown and Contact routing, and the Contact page's own `wire()` (it throws when its form is absent).
