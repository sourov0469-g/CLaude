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
| 11-03 | **Process note (Muse, owner's order):** when the homepage is complete, STOP and deliver it for joint verification (Muse audits against the skills, then the owner); inner pages only after both pass | In force |
| 11-03 | **Round 4: process + service area** | Process A (stacked chapters) 8.12 and On your street A (thread board, real job photos, town signs) 8.32 live; Process B (pinned wall) and Area B (finder + deck) kept as backups. `GATE-ROUND-4.md` |
| 11-03 | **Round 5: try-the-job sequence + booking + footer + nav polish** | Try A (pinned sideways, four hand jobs) 8.16, Booking A (work-order pad, live open/closed) 8.12, stacked-course footer, phone menu sheet, scroll-spy, cursor companion (Board / Nail / Swatch / Off). `GATE-ROUND-5.md` |
| 11-03 | **HOMEPAGE COMPLETE** (10 sections + header + footer in `site/out/site.html`) | Delivered for joint verification: Muse audits against the skills, then the owner. `GATE-HOMEPAGE.md`. **STOPPED: no inner pages until both pass** |
| 11-03 | **Owner's verdict: 2/10, not signed off.** AUSTIN-UPGRADE-BRIEF: white ground + hidden depth world, 6 hero versions, 3+ per section, review switcher, skill ledger per gate | In force (where it conflicts, it wins) |
| 11-03 | **Upgrade Round 1:** pure white ground; WebGL world of the trades at work revealed around the cursor (5 scenes × 3 planes, scroll cross-fade, touch scroll reveal); hero V2–V6 on Muse's photos (depth window, pinned dusk portrait, title between sky and house, lap courses, three-house deck); magnetic buttons; `?review` switcher | `GATE-UPGRADE-R1.md`. Accepted by Muse. Illustration set requested |
| 11-03 | **Upgrade Round 2:** Services C (counted chapters, pinned, numbers as events) and D (MERSI split cover with the firm's own jobs, draggable seam); Visualiser C (colour fields + compare) and D (four-step instrument, dial, corner preview, spec download); Visualiser B phone step caption; word-by-word section headings | `GATE-UPGRADE-R2.md`. Proceeded under standing instruction |
| 11-03 | **Upgrade Round 3:** Windows C (one window taken apart, pinned; numbers as events; glass section) and D (archive of the firm's window jobs); Reviews C (scroll-paced word reveal) and D (ask the neighbours: questions answered by verbatim excerpts); Windows A lifted-sash room drawn; Reviews B dialog moved to page root | `GATE-UPGRADE-R3.md`. Accepted by Muse |
| 11-03 | **Upgrade Round 4:** Process C (plumb line, self-drawing step drawings) and D (four colour columns); Try the job C (workbench grid) and D (the owner's Lusion dive into a window, toolbox inside); Process A sticky stacking and Process B pinned wall on phones; class collisions fixed (.tl/.st/.ft) | `GATE-UPGRADE-R4.md`. Proceeding to Round 5 |

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
| `src/sec/process.*` | Process A (four stacked chapters: checklist, price bands, scrubbed install, seal) and B (one pinned wall through the job) |
| `src/sec/area.*` | On your street A (photo cards on a rippling thread, town signs filter) and B (neighbourhood finder + photo deck) |
| `src/sec/seq.*` | Try the job A (pinned sideways) and B (swipe rail): board, caulk, gutter, paint games |
| `src/sec/cta.*` | Booking A (work-order pad) and B (lap band + press button); the stacked-course footer |
| `src/sec/nav.*` | Phone menu sheet, scroll-spy, cursor companion with three variants |
| `src/world.js` | The hidden world: WebGL reveal mask, 5 scenes of crews at work in 3 parallax planes, scroll cross-fade, touch reveal |
| `src/hero2.*` | Hero V2–V6 and the depth-photo engine (hand-traced depth maps) |
| `src/fx.*` | White ground, upgraded buttons, review switcher |
| `src/sec/svc2.*` | Services C (counted chapters) and D (split cover) |
| `src/sec/vis2.*` | Visualiser C (colour fields) and D (the instrument) |
| `src/sec/win2.*` | Windows C (taken apart) and D (window jobs on record) |
| `src/sec/rev2.*` | Reviews C (reading pace) and D (ask the neighbours) |
| `src/sec/proc2.*` | Process C (plumb line) and D (four columns); shared step drawings |
| `src/sec/seq2.*` | Try the job C (workbench) and D (the dive) |
| `depth.py` | Depth maps and the V4 house matte for Muse's three photographs |

## Next

**Upgrade Round 5: On your street + Booking + header/footer**, with the phone arrow hints and the hero hint. Then, then the joint homepage verification. Inner pages stay frozen.
