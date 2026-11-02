# Image and reference registry, AUSTIN-PROMPT-V2 run (re-derived under REFERENCE-ANNEX-AUSTIN v3)

**Status.** Built from scratch on 2026-11-02, per Muse correction 1. The stopped run's `image-registry.md` was not used as an input; no file by that name exists anywhere in the repo or its history.

Each line below was re-checked tonight against annex v3 and the live source.

**Classes:**
- **REFERENCE:** observed for study; never shipped.
- **EVIDENCE:** the firm's own material; may ship.
- **DATA:** the firm's own records; may ship as drawn graphics.

## 1. Reference observations (REFERENCE, never shipped)

| # | Source (annex v3) | URL observed | Date | Job on cards | v3 status | Local study file |
|---|---|---|---|---|---|---|
| R1 | Scout Motors | https://www.scoutmotors.com/ | 2026-11-02 | MOOD (taste anchor for logo cards) | IN | research/scout-1.png, research/scout-3.png |
| R2 | Dropbox Brand | https://brand.dropbox.com/ | 2026-11-02 | MECHANISM (system shown as a grid of planes) | IN; settled, "use freely"; the CSSDA WOTY 2025 citation was confirmed by Muse | research/dropbox-1.png, research/dropbox-2.png |
| R3 | Cash App Brand | https://cash.app/press/assets | 2026-11-02 | MECHANISM (colour as content; glyph in a container) | IN, as "colour as content". The guidelines URL was not reached, so the press/assets page was observed instead. | research/cashbrand-1.png, research/cashbrand-2.png |
| R4 | Graza | https://www.graza.co/ | 2026-11-02 | QUALITY BAR for motion only (scoped) | IN, scoped | research/graza-1.png, research/graza-2.png |

**What was kept from R1–R4:** only teardown notes (structure, rhythm, mechanism). No asset, path, colour value, copy or typeface from any of them enters a deliverable.

**Code-level notes:**
- The Cash App logo is a rounded square plus a path, on viewBox 0 0 210 210.
- The Scout logo is a single path, on viewBox 0 0 180 52.

Both were recorded as structure facts, not copied.

**References not yet observed tonight.** Each will be logged here when its section is studied (addendum: study before each section):
- Apple AirPods Pro;
- Lusion;
- Bruno Simon (scoped);
- Lando Norris;
- Quiet Cubes;
- MERSI;
- Ever (verified case elements only);
- Cowboy;
- Rimowa UNIQUE (configurator only).

## 2. The firm's own photos (EVIDENCE)

| ID | File | Place (caption) | Used in | Caption rule |
|---|---|---|---|---|
| E1 | site/assets/img/h/work-robroy-a-1000.webp | Rob Roy, Austin | Phase 1 territory T1 | Place only; no month until Muse rules (open question in PROGRESS-V2.md) |
| E2 | site/assets/img/h/work-siding0-a-1000.webp | Milwood, Austin | Phase 1 territory T2 | Same |
| E3 | site/assets/img/h/work-siding2-a-1000.webp | Maple Run, Austin | Phase 1 territory T3 | Same |

**Source.** Each place comes from `src/home2.py`, `PAIRS6`.

**Note on the territory board.** `phase1-territories.html` was built before the caption default was set, and still prints the month. It is a superseded working board. From the concept showcase onward, captions are place-only.

## 3. Map data (DATA)

| ID | Source | Count verified | Use |
|---|---|---|---|
| D1 | `src/home2.py`, `PINS` | 312 (checked with `len(home2.PINS)` on 2026-11-02) | T3 motif; later, the map section. The only wording allowed is the locked line: "312 on the map with photos + 574 more counted". |

## 4. Purge record (Muse correction 1)

| Barred source line | Status | Check |
|---|---|---|
| Anything taken from Oakâme as design | None present | `grep -riE "oak[aâ]me"` over brand-v2: 0 hits |
| Ever's before/after slider | None present. The before/after seam is assigned to MERSI in PROGRESS-V2.md. | `grep -riE "\bever\b"` over brand-v2: 0 hits |
| Any claim of a rendered Quiet Cubes 3D model | None present. Quiet Cubes is cited for structure only. | `grep -riE "quiet cubes"` over brand-v2: 0 hits (the registry lines above are the only mentions) |
| Dropbox Brand lines | Kept, as cited | n/a |

## 5. Not used

- No stock imagery.
- No generated people.
- No third-party logos in any deliverable.
- No image from any OUT reference (Oakâme, Igloo, Boffi and the rest).

## 6. Reference observations for Phase 3 (REFERENCE, never shipped), 2026-11-02

Frames are in `research/p3/`. Each reference is observed live in headless Chromium through the proxy.

| # | Source (annex v3) | URL observed | Status | What was observed |
|---|---|---|---|---|
| R5 | MERSI | https://www.mersi-architecture.com/ | 200 | **Hero:** two 720 px columns of stacked slides, one per project. Inactive slides are hidden by `clip-path: inset()`: from the top in the left column, from the bottom in the right. **Input:** the wheel scrubs the next slide in continuously; both halves and the central label wipe at the same percentage (51.4% → 47.9%, lerp-settled), with no snap within 1 s and no auto-advance after 6 s idle. **Label card:** the project name, district, type and year, and an embossed monogram, on a colour plate that changes per project. **Stack:** Webflow + GSAP + a custom JS layer (`mersi.netlify.app/main.js`). |
| R6 | Apple AirPods Pro | https://www.apple.com/airpods-pro/ | 200 | A light product stage. One sentence-scale headline per pinned beat. Text reveals with a colour ring. A paged "Take a closer look" carousel. Big comparative numerals ("2x"). |
| R7 | Lusion | https://lusion.co/ | 200 | A counter preloader (to 100) with an L monogram. Then one rounded 3D panel that grows from an inset card to full bleed as you scroll; crosshair corner marks; "Scroll to explore". The flow is one object carried through the sections. |
| R8 | Lando Norris | https://landonorris.com/ | 200 | A light contour-map field, and two-tone condensed type on a dark band. The archive is photos scattered across the contour field at different sizes. |
| R9 | Cowboy | https://cowboy.com/ | 200 | Full-bleed footage with a single rider. Later an image is revealed in stepped horizontal slices under "Power so natural". Restrained colour; one named system per section. |
| R10 | Ever | https://ever-live-here.com/en/ | 200 | Giant letterforms filled with photos; "Live here". Material sample spheres (brick, facade) beside "Simple shapes, expressive finishes". No before/after slider anywhere, as the annex states. |
| R11 | Bruno Simon | https://bruno-simon.com/ | 200 | A loading ring on a grid; the 3D world did not render in headless capture. Scope stays: the map is the one explorable section. |
| R12 | Rimowa UNIQUE | https://www.rimowa.com/us/en/unique.html | **403** (Akamai "Access Denied") | **Not observed.** The 4-step structure (profile → colour → trim → preview) is taken from the annex text only. To be re-tried before the visualiser section is built. |
| R13 | Quiet Cubes | https://quietcubes.com/ | 200 | It opens on a "Select Your Pod" gate (four pod types) before any content: configurator-first. No 3D model rendered, which matches the annex note. **Identity not fully confirmed:** the Awwwards page (502) and Codrops (bot check) could not be reached to tie this domain to the Awwwards-listed project. |

**Not used from any of them:** assets, colours, type or copy. Only structure and mechanism notes.
