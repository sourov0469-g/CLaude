# GATE, Austin redo, Stage 1: reverse-engineering dossier (revised under the completion)

**Governing documents:** AUSTIN-REDO-BRIEF.md + AUSTIN-REDO-COMPLETION.md (binding; the completion wins where it names a point) + REFERENCE-ANNEX-AUSTIN v3 (the only reference library).

**Stage:** Stage 1 only. No branding and no HTML.

**Deliverable:** `siding/redo/REVERSE-ENGINEERING.md`, 17 sections.

**Process:** every step ran in this session's own thread. No sub-agents, no background tasks. Nothing was published or uploaded.

## 0. The one ruling needed from Muse

**Immersive Garden and Igloo Inc.**
- The redo brief names both as governing references, and its background law is written around Immersive Garden.
- Annex v3, which the completion makes the only library, lists **Igloo as OUT** and **does not list Immersive Garden**.

What the dossier does meanwhile:
- It keeps both studies, because the brief requires them.
- **It uses nothing from Igloo.**
- It marks the background field's Immersive Garden mechanics as **pending ruling**, with a stated fallback (§1): the owner's own law plus Lusion's return law.

The ruling decides whether the flowmap relief response stays.

## 1. What the completion changed in Stage 1

| Completion point | Applied in the dossier |
|---|---|
| Annex v3 is the only library | §17 status table, one row per reference; Igloo OUT; Immersive Garden pending |
| Bruno Simon, scoped to the 312-dot map | §12 studied at code level (zones, frustum culling, ray cursor with a 25 px click threshold, follow camera, magnet, disc reveal); Austin job map V1 and V2 |
| Dropbox, Cowboy, Ever in the annex | §13 Dropbox (zoom-out mosaic, measured over 13 scroll steps; tile hover 0.35 s with its own emblem animation) · §14 Cowboy (one rider, one named system, stepped window measured) · §15 Ever (paged chapters, material spheres, one-active filter) |
| Ever never for the pairs | Stated in §6, §15, §17. The pairs are MERSI's seam alone (V1 and V2) |
| Erie Home: wording only | §16, proof and FAQ grammar only |
| Rimowa dropped | Appears nowhere except the "dropped" rows; Quiet Cubes governs the visualiser alone (§9, §17) |
| Game-like only on the map and the pairs | The offcut pile (click-to-scatter) and the drag-to-turn corner are **withdrawn** (§2, §3, §5) |
| Design method: two wholly different versions per section, each from a reference | §17: 11 homepage sections × 2 versions, each naming its reference mechanism |
| SVG and cursor-companion standard | §17: companion behaviour built from measured mechanisms (follow 0.10 per frame, blink tempo, zero-lag copy label, asymmetric press), a reaction per element type, touch and reduced-motion off states, a different SVG idea per section |
| Copy budgets, fonts, structure, single HTML | §17 |
| Captions: real record only; flag disagreements | §6, §17 (`windows3`: record "Maple Run", slug "alexandria", flagged) |

## 2. New evidence this revision

Under `siding/redo/evidence/`:
- `bruno/` (recon, screencast, sheet);
- `dropbox/`, `cowboy/`, `ever/`, `erie/` (recon, probe, `annex.json`, sheets, frames);
- `immersive-garden/rest/` and `rest-sheet.jpg` (the decisive Immersive Garden run).

New tools: `tools/bruno.js`, `tools/annex.js`, `tools/ig_rest.js`.

Third-party code stays in the scratchpad, never committed. Evidence frames are JPEG, and the folder is 49 MB.

## 3. WEB-SKILLS tags used

Each was re-read by tag in the library (`858b245d-WEB-SKILLS.md`), not from memory.

| Tag | Skill | How it was applied |
|---|---|---|
| ⟦S0063⟧ | review-animations | UI under 300 ms. Graza's 400 ms movement capped to 280 ms; hover and colour on `ease`; entering on `cubic-bezier(0.23,1,0.32,1)`; moving on `cubic-bezier(0.77,0,0.175,1)`; never `ease-in` on UI; asymmetric press (110 / 220 ms); stagger 30–80 ms, so Lando's 0.15 s becomes 0.06 s (§8, §7) |
| ⟦S0089⟧ | to-spring-or-not-to-spring | "Gesture-driven motion must use springs": the seam and map drag release use a spring of stiffness 500, damping 30 (§6, §8) |
| ⟦S1502⟧ | scroll-craft | One signature move: the MERSI seam on the 177 real pairs. A page grammar is chosen per version in §17. The fingerprint gate against the rejected build runs at Stage 3, when there are images to compare |
| ⟦S0650⟧ | taste-skill | Hero subtext at most 20 words, kept alongside the completion's 40-word hero (§17). Design Read and dials below |
| ⟦S1320⟧ | build-awwwards-quality-sites | One smooth-scroll engine; Three.js only with purpose (one canvas, the field); poster fallback; DPR cap; photos for every avatar (§11, §14). **Its rule against model-drawn SVG illustration is overruled by the completion's SVG standard** (§17) |
| ⟦S1306⟧ / ⟦S1314⟧ | audit-ai-design-slop / no-ai-design-slop | Removal Test applied to the first revision. The offcut pile and the turnable corner failed it: they did no job the brief or completion asks for, so they were deleted, not restyled |
| ⟦S0049⟧ | Web Interface Guidelines | Images stay `<img>` with `alt`, `width` and `height` (Lusion's WebGL-media idea rejected, §3). The map never traps scroll. The keyboard path exists for the seam and the map |
| ⟦S1501⟧ | critique-visual-hierarchy | One primary emphasis per view: the conversion floor (phone, estimate) stays beside the map and is the largest tile in the closing (§12, §13) |

**Design Read (S0650):** reading this as a local exterior-renovation contractor's site for Austin homeowners, with a crafted, evidence-first language, leaning toward premium consumer.

**Dials:** DESIGN_VARIANCE 7 · MOTION_INTENSITY 6 · VISUAL_DENSITY 3.

## 4. Scorecard

Design 40 / Usability 30 / Creativity 20 / Content 10.

PASS requires a weighted score of at least 7.0, no category under 6.0, and zero vetoes.

This stage's output is a dossier and a plan, not a build, so each category is scored on what the dossier fixes for the build.

| Category (weight) | Score | Evidence |
|---|---|---|
| **Design (40)** | **7.2** | **For:** every section of the 11 has two versions from named, measured mechanisms (§17), e.g. hero V1 MERSI split-slider versus V2 Scout full-bleed house. The background law is answered with a costed field (§1, §11). The motion table is reconciled with S0063 (§8). **Against:** nothing is drawn yet (Stage 3 is the test). The field's cursor response depends on a pending ruling. The section rhythm is planned, not seen. |
| **Usability (30)** | **8.0** | **For:** native scroll everywhere. Wheel capture only on the pairs, releasing at both ends (§6). The map never traps the wheel and keeps the phone beside it, with a static fallback on touch, at 390 and under reduced motion (§12). The seam has a keyboard path (5% steps, Home/End). A Pause motion control. Budgets set against measured weights (§11). **Against:** no measured interaction yet; the touch behaviour of the seam is specified, not tested. |
| **Creativity (20)** | **7.6** | **For:** trade-native translations, not copies. Cowboy's stepped window becomes four **lap courses** opening on a finished wall (§14). Bruno's spawn reveal opens **from the firm's office** (§12). Dropbox's mosaic zooms out **from the phone tile** (§13). The pairs are a seam you wipe from old to new (§6). **Against:** the companion's variants and the SVG ideas are named, not yet drawn. |
| **Content (10)** | **8.6** | **For:** all locks carried verbatim. Captions only from records, with the disagreement flagged (`windows3`). Every count labelled by what it measures (Round Rock 37 in-frame against 110 documented). The FAQ and proof grammar is borrowed without Erie's unverifiable superlatives. Both Immersive Garden corrections are kept on record. **Against:** the colour list is still flagged (Muse ruling, non-blocking). |
| **Weighted** | **7.65** | **PASS on the numbers.** Every category is at or above 6.0. |

**Vetoes checked (from the acceptance scorecard):**
- **Fact error or invented proof:** none found. Every figure is a lock or comes from FACTS.md or the measured evidence. Superlatives were refused (§16).
- **Placeholder as final:** none.
- **Not applicable until there is a build:** contrast failure, broken layout at 390/768, JS error, dead primary CTA, Swap Test failure, three or more AI tells.

**Vetoes: zero.**

## 5. Limits, unchanged and new

1. **Software WebGL at about 3 fps.** WebGL timings come from code constants.
2. **Igloo:** its scroll did not advance (and it is now OUT).
3. **Immersive Garden:** the real-time decay of the cursor-raised relief is a prediction from its constant.
4. **MERSI:** one wheel-step discrepancy recorded.
5. **Quiet Cubes:** only the configurator's first step is on record.
6. **Lusion:** native scroll not measured.
7. **Bruno:** the driving frames were not captured under software rendering (the world revealed only at the run's end). Driving is described from code.
8. **Ever:** paged scroll inferred from a fixed `scrollY` plus no moving wrapper plus one screen per wheel step. The controller's own code was not read.
9. **The dossier is a plan.** Design and Creativity scores are provisional until the Stage 3 images exist.

## 6. Stop

Stage 1 ends here, revised under the completion. No branding and no HTML have been started. Stage 2 waits for Muse's judgment, and for the ruling on Immersive Garden and Igloo (§0).
