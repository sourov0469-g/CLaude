# PROGRESS: Austin redo (current record)

**Governing documents:**
- AUSTIN-REDO-BRIEF and AUSTIN-REDO-COMPLETION;
- AUSTIN-FINAL-DIRECTION-V2 (11 reference sheets in `siding/redo/refs-final/`);
- Muse's finalize message of 2026-11-03;
- Muse's HERO INSTRUCTION of 2026-11-03.

On their points, the later ones win.

**Rules in force:**
- Colour: deep green `#0E3B2C`, lime `#B5DB6E`, black, white, warm cream. No steel.
- The background is the site: a live Immersive Garden field with Austin's shapes, splash and cursor reaction, wherever the ground is white.
- No big 3D.
- No document-like sections.
- Two sections per round, two versions each; keep the winner.
- One single HTML file for the whole site.
- Fact locks verbatim.
- No sub-agents.

## Log

| Date | Stage | Result |
|---|---|---|
| 11-03 | Stage 1 dossier (`REVERSE-ENGINEERING.md`) | Judged; stands |
| 11-03 | Stage 2 branding boards | Rejected by owner; branding settled by Muse: Stacked Lap A, steel on warm cream |
| 11-03 | Hero round 1 (V1 cut photo, V2 3D house) | Rejected |
| 11-03 | Hero sheet-cut options (s1–s3) | Rejected (missed the essence) |
| 11-03 | Hero A (3D house) / B (photo + 3D debris) | A out (big 3D banned); B idea approved, execution, layout and image rejected |
| 11-03 | Hero round 2: five versions | Built and audited (steel) |
| 11-03 | **Colour change: deep green #0E3B2C + lime #B5DB6E** (steel retired); V2 rebuilt on the finished after photo; film approved | Recoloured five re-audited; `GATE-HERO-2.md` updated. **Accepted by Muse** (V1 live) |
| 11-03 | **Round 2: services + visualiser**, two versions each, in the one site file `site/out/site.html` | Services A (pinned horizontal sequence) and Visualiser B (snap-together wall) live, 8.04 / 8.06 PASS; B and A kept as in-file backups. `GATE-ROUND-2.md` |
| 11-03 | **Round 3: windows + reviews** (Andersen construction researched first) | Windows A (one single-hung, morning to midnight) 8.28 and Reviews B (rating as hanging tags) 8.20 live; Windows B (bay, peelable wall) and Reviews A (4.9 laid in courses) kept as backups. `GATE-ROUND-3.md` |

## Current build sources (`siding/redo/site/`)

| File | Role |
|---|---|
| `src/field.js` | The live field: Immersive Garden mechanism, Austin shapes, flowmap, splash; WebGL1, no library |
| `src/photo-hero.js` | Interactive photograph: the photo's own boards lift on hover and settle back to the pure photo |
| `src/frame.css` | Header (sample-book dropdown), mobile board-end bar, 3D-feel buttons |
| `src/heroes.css` | Layouts of the five hero versions |
| `boards.py` | Board cuts for both supplied photos, along each wall's own perspective |
| `build.py` | Builds the five single-file heroes |
| `build_site.py` | Assembles the ONE site file `out/site.html`: slots with live winners, backups as `<template>` (audit: `?hero=`, `?services=`, `?vis=`) |
| `src/sec/scenes.*` | Trade scenes: flipping sample boards, casement + double-hung, shingle wave |
| `src/sec/services.*` | Services A (pinned horizontal) and B (word switcher) |
| `src/sec/vis.*` | Visualiser A (swatch fan) and B (snap-together wall, five steps) |
| `src/sec/windows.*` | Windows A (100 Series single-hung, day slider, real parts) and B (400 Series bay, CSS 3D, peelable wall layers) |
| `src/sec/reviews.*` | Reviews A (4.9 in lap courses + quote reader) and B (hanging tags, breeze physics, verbatim dialog); quotes checked verbatim at build |

## Next

Round 4: **process** (full-view stacked chapters, not five cards; the game idea as a horizontal-scroll interactivity sequence) and **service area** ("On your street": pinned photo cards, rippling thread, board-end signs; no drawn map; the 886 wording verbatim). Then CTA + footer, nav polish (cursor companion), then the other pages.
