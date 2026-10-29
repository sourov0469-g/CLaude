# TRACEABILITY — 30 versions (BRIEF-V5 §7)

**Atlas pointers.**
- `A2` = `bank-index/atlas-part-2-bank.md`
- `A1` = `bank-index/atlas-part-1-skills.md`
- Bank sources sit under `previews/bank-selection/<pack>/`.

**How each reference was re-verified.** Each was re-opened in the Atlas on 29 Oct 2026 by extracting its "Frame by frame" and "Mechanism & key values" lines. The extract is in the scratchpad (`v5`), and the key values are quoted in each row.

**Criteria (BRIEF §4/§10), cited by code:**

| Code | Criterion |
|---|---|
| R | Reference traceability (named reference; the mechanism matches the Atlas) |
| S | SVG richness (custom siding/window/roof SVG in the version) |
| T | Trick unique on the page (owner table below; conflict K6) |
| F | Facts exact (§3 + repo published data; no other review count) |
| M | Motion: F17 for the version's own motion (no loader/gate intro; reveals 0.15–0.3 s; one signature interactive) |
| D | A different design from its siblings (different reference, layout, composition) |
| P | Template-feel test (Austin-Pro-specific) |
| 3D | 3D where earned |

Page systems are judged once in Phase 3, not per version (conflict K9):
- section entrance timing;
- reaction kit;
- companion;
- section field;
- divider.

## Trick owner table (K6: each signature mechanism has exactly one owner)

| Trick | Owner | Was also in (v4) → resolution |
|---|---|---|
| Drag before/after divider | Work 1 (the page's ONE signature interactive) | — |
| SVG blinds before/after reveal | — (retired) | Hero 1 → rebuilt |
| Blueprint scan line | Work 2 | — |
| Cursor lens before/after | Work 3 | — |
| Masked heading (letters as windows onto a photo) | Hero 1 (new) | — |
| Funnel step 1 → step 2 in place | Hero 2 | — |
| Picked job sets the hero photo | Hero 3 (new) | v4 Hero 3 autoplay crossfade → rebuilt |
| Count-up | Proof 1 | v4 Hero 3 stats → rebuilt |
| Extruded depth text (3D) | Proof 1 | — |
| Leader lines from a table cell | Proof 2 | — |
| Scroll-scrubbed word lighting | Proof 3 | — |
| Stamp press-in | Proof 3 | v4 Money 3 "paid" stamp → rebuilt |
| Picking a part on a house drawing | Services 1 | — |
| Edge-aware row band + glyph redraw | Services 2 | v4 Hero 2 icon redraw → rebuilt |
| Draggable tape | Services 3 | v4 Hero 2 tape blade → rebuilt |
| Exploded view on springs | Built 1 | — |
| Sticky stacking cards | Built 2 | — |
| Lap ↔ batten path morph | Built 3 | — |
| Colour zones repaint a photo | Colour 1 | — |
| Comparison column takes the picked colour | Colour 2 | — |
| Grid tile grows to a full sheet | Colour 3 | — |
| Month-by-month map build + survey trail | Near 1 | — |
| Accordion rows + skyline rise | Near 2 | — |
| Map fly-in (viewBox tween) | Near 3 | — |
| Marquee (the page's one carousel) | Reviews 1 | — |
| Glass sash lifts between quotes | Reviews 2 | — |
| Focus brackets travel to a name | Reviews 3 (new) | — |
| Odometer digits | Money 1 | v4 Money 3 → rebuilt |
| Distribution bars grow | Money 2 | — |
| Strike-and-rewrite total | Money 3 (new) | — |
| Glint / sheen sweep | Proof field only (page system) | v4 Hero 3 casing glint, Services 1 window glints, kit "sash" click → rebuilt / Phase 3 |
| Spirit-level bubble | Work 1 (handle reads the drag) | v4 Services 1, Money 1, kit "level" → rebuilt / Phase 3 |
| Chalk-line pluck | Book 3 | v4 Money field, kit "chalk" → Phase 3 |
| Nail pop | — (page kit owner decided in Phase 3) | v4 Hero 1, Reviews 3 → rebuilt |
| Atmosphere folds canvas | Book 1 | — |
| Multi-step form with step panes | Book 2 | — |
| Sentence form | Book 3 | — |

## Rows

Sections are recorded in SECTIONS.md order.

### Hero

**H1 · Courses (rebuilt as "Window letters")**
- **Reference:** [BANK] Q95 Masked Heading (React Bits). A2; deep-read `roofing/reverse-engineering/deep-reads-slice-2.md`.
- **Mechanism:**
  - The headline is an SVG `<clipPath>` of per-glyph `<text>`; a photograph fills it, so the letters become windows onto the photo.
  - Reveals: rise, scale, blur, wipe or fade, at IntersectionObserver 0.25, once.
  - Pointer parallax 26 and drift 18 move the photo inside the glyphs; fillScale 1.25.
- **Adaptations:**
  - The letters frame the Rob Roy finished wall (a real pair's after photo, shown alone, not as before/after).
  - The rise reveal is cut to 0.3 s, stagger 0.05 (F17).
  - Parallax only on fine pointers; the drift is still under reduced motion.
  - A real `<h1>` stays in the DOM.
  - Proof strip, lead and CTA (with the phone) sit below.
- **Verdict:** REBUILT.
  - M fail: the v4 blinds autoplay a ~1.2 s before/after on load (gate-intro class; flag F3).
  - T fail: a second before/after device outside the signature.
  - T fail: the v4 nail pop duplicated.
- **Verification:** PASS (29 Oct). Screenshots `v5/shots/hero1-d/-m.png`, reduced motion `hero1rm-d/-m.png`. Q95 re-checked: clipPath text, photo inside the glyphs, rise 0.3 s / stagger 0.05, parallax ±26, drift 18 (paused off-screen). Fixed during build: a word-split bug left "and" hollow; sills trimmed to each line. `sect.js hero`: switcher swaps only Hero (other stages keep the same node) at 1440, 375 and 1440 reduced motion; console 0; no overflow. Facts grep: "474 Google reviews" is the only review count; `tel:` link present; prices are FACTS medians/middle halves.

**H2 · Pick your project**
- **Reference:** [BANK] Stronghold Roofing (report Crown 1: proof strip above the headline; the hero is step 1 of the funnel; Atlas A2 + `roofing/structure-uiux/roofing.md` DEEP 1) and [BANK] Neil Kelly (CROWN, interactive project picker; A2 + `remodeling/structure-uiux/general-contractors.md` DEEP 1).
- **Mechanism:** the hero IS step 1 of a quote funnel; photo cards pick the project; step 2 opens in place with the answer and a pre-set booking button.
- **Adaptations:**
  - Step 2 shows the published median band, middle half and monthly estimate for the trade (FACTS table).
  - Each card carries a mini elevation locating its trade on a house.
  - It is now the page's only median-band-by-trade device (flag F4 closes here).
- **Verdict:** REBUILT.
  - T fail: the v4 tape blade duplicates Services 3.
  - T fail: the card icon redraw duplicates Services 2.
  - F4: price overlap with Services 1.
- **Verification:** PASS (29 Oct). Screenshots `hero2-d/-m.png`, step 2 `hero2s2-d/-m.png`. Card click opens step 2 in place (zone "win", book button set to Windows, focus on the step heading), Back returns focus to the card. No tape, no icon redraw. `sect.js hero`: switcher swaps only Hero (other stages keep the same node) at 1440, 375 and 1440 reduced motion; console 0; no overflow. Facts grep: "474 Google reviews" is the only review count; `tel:` link present; prices are FACTS medians/middle halves.

**H3 · Real work**
- **Reference:** [BANK] Feldco (siding report Crown 2: real-work hero under a dated superlative; stat row in trade units; A2 + `siding-windows-doors/structure-uiux/siding-windows.md` DEEP 2) and builder brief R33 (poster frames, poster-first).
- **Mechanism:** the hero is the firm's real work; a dated line does the trust work; the stats are in trade units.
- **Adaptations:**
  - Five real job photos as poster frames the VISITOR picks (job tabs set the photo; no autoplay).
  - Stats are static trade-unit figures (431 siding / 388 window / 210 shingle jobs documented, 5,000+ homeowners, 4.9 on 474).
  - The job caption sits on an SVG yard sign.
- **Verdict:** REBUILT.
  - T fail: count-up duplicates Proof 1.
  - T fail: casing glint duplicates the Proof field.
  - M fail: a 5 s autoplay crossfade is a second carousel (F17 allows one).
- **Verification:** PASS (29 Oct). Screenshots `hero3-d/-m.png`. Tab click sets photo 3 and the sign (Nov 2024); ArrowRight moves to tab 4 with focus; no timer anywhere. Stats static. Fixed during build: on phones the sign sat over the CTA; it now sits between photo and copy. `sect.js hero`: switcher swaps only Hero (other stages keep the same node) at 1440, 375 and 1440 reduced motion; console 0; no overflow. Facts grep: "474 Google reviews" is the only review count; `tel:` link present; prices are FACTS medians/middle halves.

### Proof

**P1 · Record**
- **Reference:** [BANK] 317 Digital Butlers ("Proof, not promises": counts stated beside the offer; A2 + `roofing/reverse-engineering/deep-reads-slice-5.md`) + anatomy F12 (Austin Pro's self-reconciling 312 + 574 = 886) + [BANK] Q165 Depth Text (CSS 3D: N layers, tilt lerp 0.14).
- **Mechanism:** counts as the proof unit, with the arithmetic printed so it can be checked; extruded numerals.
- **Adaptations:** 886 / 177 / 4.9 / 5,000+; a 312 + 574 = 886 board equation; 12-layer extrusion turning from the pointer.
- **Verdict:** KEPT.
  - R ✓: Q165 layers + 0.14 lerp, #317 counts.
  - S ✓: board equation SVG + rating ring.
  - T ✓: owns count-up and depth text.
  - F ✓: 886 / 177 / 4.9 / 474 / 5,000+ all FACTS.
  - M: count-up 1.4 s logged as K10.
  - D ✓, P ✓, 3D ✓ (earned: the checkable numbers are the proof).
- **Verification:** PASS (29 Oct). Screenshots `v5/shots/proof1-d/-m.png`. Re-checked: Q165 12 layers + lerp 0.14 in code; count-up 1.4 s (K10). `sect.js proof` PASS at 1440, 375 and 1440 reduced motion (switch isolation by node identity, console 0, no overflow); facts grep: 474 only review count, 886 with 312 + 574, address verbatim (§3).

**P2 · At a glance**
- **Reference:** [BANK] Georgia Contractor Group (GC report CROWN local model: the "GCG at a glance" credential table as the hero proof; A2 + `remodeling/structure-uiux/general-contractors.md` DEEP 2).
- **Mechanism:** a scannable credential table: credentials + base + rating in one unit.
- **Adaptations:** badges as served; each row's meaning in the firm's words; blueprint leaders draw from badge to credential.
- **Verdict:** KEPT.
  - R ✓, S ✓ (leaders), T ✓ (leaders owned).
  - F ✓: six credentials as §3; the address string is fixed by the page-wide facts pass (K2).
  - D ✓ (a table vs counts vs a sentence), P ✓.
- **Verification:** PASS (29 Oct). Screenshots `proof2-d/-m.png`. Office row now the §3 address verbatim. `sect.js proof` PASS at 1440, 375 and 1440 reduced motion (switch isolation by node identity, console 0, no overflow); facts grep: 474 only review count, 886 with 312 + 574, address verbatim (§3).

**P3 · Statement**
- **Reference:** ⟦S1327⟧ scroll-scrubbed word reveal (A1: TreeWalker split, words 0.12–0.3 → 1 opacity) + [BANK] 292 Scroll Reveal (baseOpacity 0.1, stagger 0.05, scrub; A2 + deep-reads-slice-5).
- **Mechanism:** one sentence lights word by word with the scroll.
- **Adaptations:** casement-window photo pills open as their word lights; credential stamps press in.
- **Verdict:** KEPT.
  - R ✓ (TreeWalker split, scrub, base 0.18).
  - S ✓ (casement pills).
  - T ✓ (owns scrub words and stamp press-in).
  - F ✓, D ✓, P ✓.
- **Verification:** PASS (29 Oct). Screenshots `proof3-d/-m.png`. S1327 TreeWalker split + scrub re-checked in code. `sect.js proof` PASS at 1440, 375 and 1440 reduced motion (switch isolation by node identity, console 0, no overflow); facts grep: 474 only review count, 886 with 312 + 574, address verbatim (§3).

### Services

**S1 · Point at it**
- **Reference:** [BANK] Neil Kelly (CROWN: configure the project before reading) + [BANK] 531 BLK Design Your Own (ONE inline SVG, zones re-fill in the same frame, easing (0.645,0.045,0.355,1); A2 + `siding-windows-doors/reverse-engineering/deep-reads-slice-8.md`).
- **Mechanism:** point at a zone of one inline SVG; the zone fills and a panel answers.
- **Adaptations:**
  - The traced Rob Roy elevation; each part answers with what Austin Pro installs there, from FACTS: board and texture counts, window brands, roofing credential and counts, finishes. No price (flag F4).
  - The picked zone fills with a section hatch that draws in.
- **Verdict:** REBUILT.
  - F4: price overlap.
  - T fail: the v4 window glints and spirit level duplicate the glint and level owners.
- **Verification:** —

**S2 · Index**
- **Reference:** [BANK] Q571 AHA (services index as a semantic numbered list, CSS counters; A2 + deep-reads-slice-9) + [BANK] Q162 K72 (edge-aware band, closestEdge; A2 + deep-reads-slice-3).
- **Mechanism:** an ordered list numbered by counters; a hover band enters from the nearest edge.
- **Adaptations:** 11 trades with documented counts and median; trade glyph symbols redraw on hover.
- **Verdict:** KEPT.
  - R ✓ (counters; closestEdge top/bottom).
  - S ✓ (11 glyph symbols).
  - T ✓ (owns band + glyph redraw).
  - F ✓ (FACTS counts and bands), D ✓, P ✓.
- **Verification:** —

**S3 · Tape measure**
- **Reference:** [BANK] Scrollable and Draggable Timeline (Codrops; master tween ease none, Draggable edgeResistance, Mode B without Club inertia; A2 + deep-reads-slice-4) + builder brief R38.
- **Mechanism:** a draggable track mapped to a value.
- **Adaptations:** a $0–$50k tape against each trade's published middle half; tape case and end hook; slider role + keys.
- **Verdict:** KEPT.
  - R ✓ (Draggable on the strip, linear mapping).
  - S ✓ (tape case, hook, ticks).
  - T ✓ (owns the tape).
  - F ✓ (middle halves from FACTS), D ✓, P ✓.
- **Verification:** —

### Work

**W1 · Drag**
- **Reference:** [BANK] Austin Pro price-banded draggable pairs (anatomy §7, "strongest form in the bank") = builder brief R28.
- **Mechanism:** drag a divider across a true before/after pair; each pair carries its price band.
- **Adaptations:** six homepage pairs with their published bands; corner-trim divider with nails; a level on the handle reads the drag.
- **Verdict:** KEPT.
  - R ✓, S ✓.
  - T ✓ (owns the drag slider and the level).
  - F ✓ (true pairs, published bands).
  - M ✓ (it IS the signature interactive), D ✓, P ✓.
- **Verification:** —

**W2 · Blueprint**
- **Reference:** ⟦S0468⟧ blueprint-animation (A1: five phases per step, scan line top → bottom, swap only under the blueprint).
- **Mechanism:** the scan line turns the photo into a drawing, then into the finished wall.
- **Adaptations:** the visitor runs it per job (no auto-advance); plates traced from the firm's photos.
- **Verdict:** KEPT. R ✓ (scan, swap under blueprint), S ✓ (the traced plates), T ✓, F ✓ (true pairs), M ✓ (visitor-run), D ✓, P ✓.
- **Verification:** —

**W3 · Lens**
- **Reference:** ⟦S1324⟧ reveal-hover-effect (A1: radius 260 / 140–220 compact, position ease 0.1, radius ease 0.14) + [BANK] Q125 square lens.
- **Mechanism:** the before shows through the after inside a lens under the pointer.
- **Adaptations:** a square window-pane lens with muntins; coarse pointers get "Show before".
- **Verdict:** KEPT. R ✓ (ease 0.1 / 0.14 in code), S ✓, T ✓, F ✓ (true pairs), D ✓, P ✓.
- **Verification:** —

### Built

**B1 · Taken apart**
- **Reference:** ⟦S0526⟧ anatomy (A1: exploded views stiffness 64, drag 14.2, dt clamp 1/30) + ⟦S0504⟧ anatomy-asset (iso object, one lit part).
- **Mechanism:** an iso wall assembly explodes on demand; the selected layer is the lit part.
- **Adaptations:** layers trim / lap / wrap / sheathing / studs; readout "301 of 415 priced siding jobs used the 8.25 in board".
- **Verdict:** KEPT. R ✓ (springs 64/14.2), S ✓, T ✓, F ✓, 3D ✓ (earned: shows the trade object), D ✓, P ✓. Flag F6 closes with a reason.
- **Verification:** —

**B2 · Built for Texas**
- **Reference:** ⟦S1322⟧ sticky stack cards (A1: covered card → 0.92, fade 0.72) = builder brief R45 (CSS sticky, never a GSAP pin).
- **Mechanism:** cards stack under a sticky top; the covered card recedes as the next travels.
- **Adaptations:** the five published Built-for-Texas properties, each with a real job photo and a drawn test diagram; warranty pair closes the stack.
- **Verdict:** KEPT. R ✓, S ✓ (five test diagrams), T ✓, F ✓ (FACTS five + warranties), M ✓ (CSS sticky, not a pinned scene), D ✓, P ✓.
- **Verification:** —

**B3 · To the inch**
- **Reference:** ⟦S0361⟧ dimensional drawing (A1: every dimension a code; [TBD] where unknown) + ⟦S1361⟧ split technical layout.
- **Mechanism:** a dimensioned technical sheet with spec rows.
- **Adaptations:** the 8.25 in lap board section; MorphSVG lap ↔ board and batten.
- **Verdict:** KEPT. R ✓, S ✓, T ✓ (owns the morph), F ✓ (FACTS dimensions; [TBD] where unpublished), D ✓, P ✓.
- **Verification:** —

### Colour

**C1 · Dock (rebuilt as "Try it on your house")**
- **Reference:** portfolio-site-plan Site 6 FLAGSHIP (`siding-windows-doors/structure-uiux/portfolio-site-plan.md`: instant pricing + visualisation in ONE flow, R36 + R24 fused) + [BANK] 531 BLK (zone re-fill) + builder brief R36 colour customiser.
- **Mechanism:**
  - Show your house in a published colour, then see the published price band, before any contact capture.
  - Zones re-fill instantly.
- **Adaptations:**
  - Default: the firm's real job photo with its traced zones.
  - "Use my photo": a local file never leaves the device; the visitor brushes the wall area and it takes the colour as a multiply tint over its own light.
  - The answer card shows the published siding median band $10k–$15k from 415 priced jobs, and the six price levers.
- **Verdict:** REBUILT. Flag F5 (unbuilt flagship); this is the bank's "ownable gap". The v4 Dock was a variant of the same repaint without the flagship flow.
- **Verification:** —

**C2 · Paint or ColorPlus**
- **Reference:** builder brief R30 comparison table (JS 0, early) + Stronghold's live comparison block.
- **Mechanism:** a two-column comparison.
- **Adaptations:** the firm's two finish systems; each column carries its own published swatches and takes the picked colour; roller vs bake-oven diagrams.
- **Verdict:** KEPT. R ✓, S ✓ (column diagrams), T ✓, F ✓ (FACTS finishes), D ✓, P ✓.
- **Verification:** —

**C3 · Colour book**
- **Reference:** [BANK] Grid-to-Fullscreen (Codrops, Q48; bounds measured at click; phones fade/scale) = builder brief R10 DOM port.
- **Mechanism:** a tile grows from its own bounds to a full sheet; close reverses.
- **Adaptations:** all 29 published colours as punched chips; the sheet shows three lap courses in the colour.
- **Verdict:** KEPT. R ✓ (measure at click, DOM port), S ✓, T ✓, F ✓, D ✓, P ✓.
- **Verification:** —

### Near you

**N1 · Survey**
- **Reference:** [BANK] Austin Pro 312-point project map (anatomy / reports: service area as evidence) + ⟦S1323⟧ pointer-trail emitter (distance emission).
- **Mechanism:** real jobs plotted; the map is the coverage claim.
- **Adaptations:** month-by-month build once; survey trail; crosshair reading miles to the office on the firm's 8.3 px/mile scale.
- **Verdict:** KEPT. R ✓, S ✓, T ✓, F ✓ (312 in frame, 574 more noted), M: the 1.8 s data build is logged as K10 (flag F7), D ✓, P ✓.
- **Verification:** —

**N2 · Town by town**
- **Reference:** [BANK] West Shore Home location × service matrix (report DEEP 5: one page per town with local facts, never city-swap).
- **Mechanism:** towns as rows carrying their own local figures.
- **Adaptations:** per-town documented / priced counts and median bands; Round Rock's local notes; a skyline of one house per ten documented jobs on open.
- **Verdict:** KEPT. R ✓, S ✓, T ✓, F ✓, D ✓, P ✓ (genuinely local figures).
- **Verification:** —

**N3 · Neighbourhood drive**
- **Reference:** [BANK] KBF Design Gallery (remodeling report DEEP 3, originality CROWN: pick a neighbourhood → fly in → browse only jobs built there).
- **Mechanism:** pick a place; the map flies in; a rail of local jobs.
- **Adaptations:** viewBox tween over the firm's map; five towns with photographed jobs.
- **Verdict:** KEPT. R ✓, S ✓, T ✓, F ✓, D ✓, P ✓.
- **Verification:** —

### Reviews

**R1 · Stream**
- **Reference:** [BANK] Q161 GSAP seamless marquee (horizontalLoop: xPercent seam, ease none; A2 + deep-reads-slice-3) + Stronghold's 60 s linear marquee (anatomy §7b).
- **Mechanism:** a seamless loop of items at constant speed.
- **Adaptations:** two rows of verbatim published excerpts hung as cedar shakes; pause button; no review counts anywhere.
- **Verdict:** REBUILT. F fail: "30 review excerpts" aria-label = a review count other than 474 (§3).
- **Verification:** —

**R2 · One**
- **Reference:** builder brief R29 testimonial carousel (cards in HTML, manual, pause) + ⟦S1329⟧ staggered word reveal.
- **Mechanism:** one large quote at a time, manual.
- **Adaptations:** a glass lower sash lifts over the old quote and drops from the new one; pane pips instead of a numeric counter.
- **Verdict:** REBUILT. F fail: "1 of 8" / "Review 1 of 8" is a numeric count next to "review" (§3 / §12-1).
- **Verification:** —

**R3 · Names (rebuilt as "The crew")**
- **Reference:** [BANK] 300 True Focus (React Bits: focus brackets move to the next word over 0.5 s; unfocused words 5 px blur; A2 + deep-reads-slice-5) + anatomy F13 (reviews that name the operative).
- **Mechanism:** a line of names; the brackets travel to the focused name; the others blur.
- **Adaptations:**
  - The crew names as printed in reviews.
  - Pointing or tabbing to a name moves the brackets (0.3 s) and shows the verbatim excerpts that name them.
  - No counts; no auto-cycle.
- **Verdict:** REBUILT. F fail: per-name review counts, "All 30" and "4 of 9 reviews" are review counts; its reference (#321, filter pills WITH COUNTS) cannot stay without the counts, so a new reference is needed.
- **Verification:** —

### Money

**M1 · Amount**
- **Reference:** Austin Pro's worked financing example (portfolio plan Site 6: $15,000 at 7.99 % over 120 months = $181.91; FACTS) + anatomy F10 (financing as its own section).
- **Mechanism:** a worked payment from the published plans.
- **Adaptations:** amount + plan; the odometer readout; the term drawn as a grid of monthly panes (24 / 60 / 120, a row per year); disclosure printed.
- **Verdict:** REBUILT. T fail: the v4 spirit level duplicates the level owner (Work 1).
- **Verification:** —

**M2 · What people paid**
- **Reference:** [BANK] Austin Pro crown 1 invoiced distribution (anatomy F7e, "ranges are estimates; distributions are evidence").
- **Mechanism:** every priced job by band; the median marked; the caveat printed.
- **Adaptations:** 415 siding / 376 window priced jobs; bars as boards; a chalk tick on the median.
- **Verdict:** KEPT. R ✓, S ✓, T ✓ (owns bars grow), F ✓ (counts sum to 415 / 376), D ✓, P ✓.
- **Verification:** —

**M3 · Receipt**
- **Reference:** builder brief R24 tier-pricing configurator (options update a summary live; static without JS) + FACTS Offers.
- **Mechanism:** options stack on a summary that reprices live.
- **Adaptations:** the three published offers on a receipt, using the firm's own $30,000 → $22,500 example; the total is struck through and rewritten (no odometer, no stamp).
- **Verdict:** REBUILT.
  - T fail: odometer duplicates Money 1.
  - T fail: "paid" stamp duplicates Proof 3.
- **Verification:** —

### Book

**K1 · Call**
- **Reference:** [BANK] Rogers Roofing (dual-path contact, phone OR self-scheduling at equal weight; A2 + `roofing/structure-uiux/roofing.md`) + ⟦S1364⟧ atmosphere background (slow folds).
- **Mechanism:** the phone and online booking side by side.
- **Adaptations:** giant phone on a raised door panel; the booking panel opens in place; folds canvas.
- **Verdict:** KEPT. R ✓, S ✓, T ✓ (owns the folds), F ✓ (phone; hours via K2), D ✓, P ✓.
- **Verification:** —

**K2 · Form**
- **Reference:** [BANK] Mad City Windows (siding scan: ZIP-first, 3-question funnel; A2) + ⟦S1442⟧ / ⟦S0661⟧ (validate on blur/continue; step indicator).
- **Mechanism:** a short multi-step form with a step indicator.
- **Adaptations:** trade, budget band, contact; steps as three glazing panes; ring feedback on submit.
- **Verdict:** KEPT. R ✓, S ✓, T ✓, F ✓, D ✓, P ✓.
- **Verification:** —

**K3 · One sentence**
- **Reference:** [BANK] 413 Tequila (form as a sentence with a reply promise; A2 + `hvac/reverse-engineering/deep-reads-slice-6.md`).
- **Mechanism:** the request written as one sentence with inline fields.
- **Adaptations:** the reply promise in the firm's words; the blanks are chalk lines that snap taut.
- **Verdict:** KEPT. R ✓, S ✓, T ✓ (owns the chalk pluck), F ✓, D ✓, P ✓.
- **Verification:** —

## Phase 1 totals

**20 KEPT · 10 REBUILT.**

The rebuilds: Hero 1, Hero 2, Hero 3, Services 1, Colour 1, Reviews 1, Reviews 2, Reviews 3, Money 1, Money 3.

Each section's three references differ:
- **Hero:** Q95 / Stronghold + Neil Kelly / Feldco + R33.
- **Proof:** #317 + Q165 / Georgia CG / S1327 + #292.
- **Services:** Neil Kelly + BLK / Q571 + Q162 / Codrops timeline.
- **Work:** R28 / S0468 / S1324.
- **Built:** S0526 / S1322 / S0361.
- **Colour:** flagship + BLK / R30 / Q48.
- **Near:** firm map / West Shore / KBF.
- **Reviews:** Q161 / R29 + S1329 / #300 + F13.
- **Money:** firm financing example / F7e / R24.
- **Book:** Rogers + S1364 / Mad City + S1442 / Q413.
