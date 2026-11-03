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
| 11-03 | **Colour change: deep green #0E3B2C + lime #B5DB6E** (steel retired); V2 rebuilt on the finished after photo; film approved | Recoloured five re-audited; `GATE-HERO-2.md` updated. **Waiting for Muse's judgment** |

## Current build sources (`siding/redo/site/`)

| File | Role |
|---|---|
| `src/field.js` | The live field: Immersive Garden mechanism, Austin shapes, flowmap, splash; WebGL1, no library |
| `src/photo-hero.js` | Interactive photograph: the photo's own boards lift on hover and settle back to the pure photo |
| `src/frame.css` | Header (sample-book dropdown), mobile board-end bar, 3D-feel buttons |
| `src/heroes.css` | Layouts of the five hero versions |
| `boards.py` | Board cuts for both supplied photos, along each wall's own perspective |
| `build.py` | Builds the five single-file heroes |

## Next

After Muse picks the hero: the next round is two sections, two versions each (services + visualiser per direction v2's order), merged into the single site file.
