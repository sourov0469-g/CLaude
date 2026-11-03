# GATE: Bathrooms page (Phase 4, part 2)

**Section count:** 5 sections plus the footer (inner-page rule: at least 5–6). Two are NEW.
- **Order:** Hero → How a bath is built → **Rooms we build (NEW, ×2)** → Projects → **Time, money, call (NEW, ×2)**.
- **Inherited versions** are in git history (`ce59679`).
- **Copy:** every line is the firm's own (FACTS.md "Bathroom", "Services", Credentials, FAQ durations, "Financing"). Photos and the before/after pair are the firm's own. Zero em dashes.

| # | section | versions | what it is now |
|---|---|---|---|
| 1 | Hero | 1 (V5, major improvement) | The second room chapter (strip: 01 Kitchens · **02 Bathrooms** · 03 Whole home). A drawn bathroom with **five target marks** (Makhno mechanism as the annex words it). Pointer or focus **locks** a mark (the crosshair turns and fills, the others fall back), the drawing **lenses in** on it (scale 1.35, `--ez-move`), and the callout gives the firm's line: tile set square; glass templated after tiling; behind the tile (backer board water-resistant, not waterproof; waterproofed properly); plumbing and permits (the firm pulls the building, plumbing and electrical permits); fixtures that look right in year five. Escape releases. The firm's bath photo sits as the delivered print. |
| 2 | How a bath is built | 1 (V3, rebuilt horizontal) | **Pinned horizontal build:** one shower wall, six bays, each one stage further on. The camera travels bay to bay (0.3 of each unit), each bay draws as it arrives, the words stay still, a rail fills, and neighbouring bays sit at 22%. Measured: stages 0→5 with the pin top at 0. Phones and reduced motion: a list with a drawn bay per stage. |
| 3 | Rooms we build (NEW) | **2** | The firm's **ten published sub-services**, verbatim. **A (Shed):** giant-type list; the room under the pointer or in focus brings in a real photograph with the firm's title. **B:** a showroom sample board; photographed tiles open large. **A photo appears only where the firm's own project title carries that kind of room** (5 of 10); the others are named, never illustrated with a borrowed photo. |
| 4 | Projects | 1 (owner's recipe) | The **seam** for the firm's one bath pair (the kitchen approach: native range, scroll sweep, print ≤ 1.35× native), and **V5's stacked photographs** (Next sends the top print to the back: it lifts, slides and drops behind; Previous brings one back; the top opens large; ← → keys). **V4's filter only:** All / Walk-in showers / Freestanding tubs / Vanities, by words in the firm's titles (measured: tubs gives 5). |
| 5 | Time, money, call (NEW) | **2** | **A:** three columns. **Time:** the firm's "4–8 weeks" lands as an event numeral, plus "Permit review can add weeks". **Money:** Synchrony or Service Finance; not a lender. **Call:** the number, "a real answer, not a callback form", the CTA and proof. **B:** a week strip drawn by the scroll: four solid weeks, four that "might run", two dashed for permit review. |

## Deviation from the plan (recorded)
- **Build order:** the plan lists "studs, then waterproofing, then backer board". The firm's own line, "Backer board is water-resistant, not waterproof", means the waterproofing goes **over** the board. The build therefore runs studs → backer board → waterproofing → tile → glass → fixtures, which is accurate to the firm's own reasoning.

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity to the plan | 8 | Every row of `PHASE1-PLAN.md` "BATHROOMS" delivered; the NEW sections at ×2 | The build order corrects the plan (see above) |
| Interaction | 9 | Target lock and lens with keyboard and Escape; giant list on hover and focus; deck turns and filter; the seam | |
| Motion and flow | 8 | Pinned horizontal build with camera; lens zoom; deck drop; week strip scrub | Bath-page dividers reuse the system set |
| Accessibility | 8 | Labelled targets with `aria-describedby` callouts; live readouts; a list fallback for the pinned build; a 10-column strip that keeps its labels at 390 | The hero drawing itself is `aria-hidden` (the marks carry the content) |
| Facts | 10 | Firm's lines only; photos only where titles match; "4–8 weeks" and "can add weeks" only | |

## Defects found and fixed across cycles
1. **Hero (my regression):** `clearProps: 'all'` on the mark intro also wiped the marks' inline `--x`/`--y`, so all five stacked at the corner. Now it clears only `transform, opacity`. Re-measured: each mark at its own place; the Glass lock and lens (`--z: 1.35`) verified.
2. **Hero:** the intro left an inline opacity that would override the CSS dimming of unlocked marks. Covered by the same targeted clear.
3. **Copy:** three lines I had written were paraphrases beyond the firm's words ("Tile set square, so the lines…", "So the waterproofing is done properly, before the tile", "The old room comes out…"). Each is replaced by the firm's own words.
4. **Build:** bay 1 would have been empty until the pin began scrubbing. It now draws as the section arrives.
5. **Hero:** the print's size attributes were wrong (1600×1067 against an actual 1600×1000). Corrected.
6. **Week strip at 390:** wrapping to five columns detached the labels from their weeks. One row of ten is kept.

## Defects remaining (honest)
- ~~**Fixtures bay:** the head, valve and niche are drawn simply.~~ **Fixed in Phase 6:** redrawn in the same line language: shower arm and head with faint spray, valve trim plate and lever, a recessed niche with a shelf and two bottles, a linear drain, the handle on the glass, and a towel on its bar outside the glass (`qa/finalize/phase6/bath-fixtures-bay.png`). The build still steps 0→5 with the pin at top 0.
- ~~**Dividers** on this page reuse the system set; tuning is left for the assembly pass.~~ **Fixed in Phase 6:** every boundary now carries its hand-off (studs, tile, rule, weeks, footing).

- ~~**How a bath is built, between waterproofing and tile:** the drawing went blank white for a stretch of scroll; every bay redrew from nothing, and filled shapes showed their fills before their strokes.~~ **Fixed in Phase 9:** each bay arrives as the finished bay before it and only the new layer builds (strokes first, then fills); the studs sit behind the board in every bay. Evidence: `qa/finalize/phase9/bath-build-before-1440.jpg` and `bath-build-after-1440.jpg`.

Render evidence: `qa/finalize/bathrooms/` (12 captures). Zero console errors at 1440 and 390; no horizontal overflow.
