# GATE-BACKGROUND-FIX — the hidden world, rebuilt to Immersive Garden's mechanism

**Under:** AUSTIN-BACKGROUND-CORRECTION-2026-11-04 (owner's order, binding). New-version work stays paused until Muse accepts this gate. Booking K has not been started.

## What was done, in the order the correction set

1. **Study:** exactly two one-off study agents, as the owner ordered (study only; all build work done in this thread).
   - **Visual:** frame by frame from pixels, page clock frozen at 16 ms steps → `scratchpad/bgstudy/VISUAL-REPORT.md`, `visual/key/*.png`.
   - **Technical:** live GLSL and uniform capture, the bundle read, the relief models unpacked → `scratchpad/bgstudy/TECH-REPORT.md`, `tech/`.
   - Both are merged, with exact numbers, into **IMMERSIVE-BACKGROUND-SPEC.md** (committed with this gate). The spec was written before any rebuild.
2. **Rebuild to the spec:**
   - `siding/redo/site/bg/relief.py` sculpts three Austin bas-relief panels as height fields and bakes Immersive Garden's six lighting levels for each.
   - `siding/redo/site/src/world.js` is a new renderer: IG's 256² flowmap and its six-level ladder.
   - The pictogram world is retired: its renderer is kept on file as `src/world-pictograms-retired.js` and is not built.
3. **Measured,** below, against the spec and against Immersive Garden's own measured numbers.

## The mechanism (same as Immersive Garden; only the objects differ)

| Part | Immersive Garden | Austin now |
|---|---|---|
| Hidden scene | Sculpted bas-relief panels with baked light; one continuous garland per panel; looping | **Three sculpted bas-relief panels, looping:** (1) the street (a far skyline of roofs, a back row of houses, a front row of three houses with a porch, ladder, plank, fence and pavement); (2) the wall (lap siding around a new window, with flashing, casing, a level, a caulk gun, a ladder and loose boards); (3) the roofscape (five hip roofs from above, with shingle courses on every facet, hips, ridge caps, gutters, a chimney, vents, a stripped deck, a shingle bundle and a ladder). See `gate/bgfix-panel1/2/3-level5.jpg` |
| Depth | Six pre-baked greyscale lighting levels at increasing depth; top light; cast shadow and AO; depth carried by shadow | **The same:** six levels (flat + depth × 0.2…1.0) baked with top light (45°, 15° left), ray-marched cast shadows, three-scale AO, and soft rounded plaster edges |
| Seam-free reveal | Flat wall identical in all six levels (0.545) | Flat wall **exactly 1.0 (white)** in all six levels; relief only darkens |
| Mask | 256² ping-pong flowmap: presence `a`, speed `b` = 1 − (1 − min(1, 50·|v|))²; stamp smoothstep(0.19, 0, d) in viewport-height units; cloud noise 0.15–1 | **The same values** (stamp written with ordered edges, which GLSL requires) |
| Decay | 1/(1 + dm·(1/0.953 − 1)), dm = min(dt, 32)/16 | **The same** while the pointer moves |
| Ladder | extrude = a + b walks six smoothstep bands of 0.2 | **The same** |
| Scroll | Wall at 0.31× scroll, eased (τ ≈ 340 ms); mask shifted with it | **The same** |
| Pointer easing | 0.4 per frame; speed eased 0.1 / 0.04 | **The same** (dt-normalised) |

### Where the owner's rules override Immersive Garden

| Rule | Immersive Garden | Austin |
|---|---|---|
| Rest | Grey plaster (190), plus a ghost cursor raising clusters every 2.5–5 s | **Pure white, nothing at rest:** no ghost cursor; the canvas draws nothing (transparent) and its loop stops |
| Close-back | The disc stays open under a resting pointer, indefinitely | **The disc closes by itself:** presence holds 250 ms after the pointer stops, then releases at 0.93 per frame |
| Colour | A desktop fluid tint exists in code (not visible in measurement) | **None, by construction:** the shader outputs black with alpha over the white page, so R = G = B |
| Pointer parallax | None | The highest relief levels shift **≤ 2 px** with the eased pointer (the owner asked for layered parallax on the cursor). Scroll parallax is IG's: the wall at 0.31× under content at 1× |
| Reduced motion | Not handled | No canvas; the page stays white |

## Measured numbers (Chromium with SwiftShader WebGL2; page clock frozen and stepped 16 ms, as the visual study did)

**Tools:**
- Measurements use `?bgmask`, a measurement-only switch that draws the mask value itself; it is documented in `world.js`.
- Scripts: `scratchpad/bgt/t3.js`, `t5.js`, `t7.js`, `t8.js`.

| Check (spec §4) | Target | Measured | Verdict |
|---|---|---|---|
| **At rest**, background only | every pixel #FFFFFF | **min 255, 0 non-white pixels** (`bgfix-02`) | **Pass** |
| Colour in the background | R = G = B | **max channel spread 0** across every background and mask frame | **Pass** |
| Reveal radius (held disc, 1440 × 900) | 50% at 0.165 × height ± 10% (≈ 148 px); 0 beyond ≈ 0.19 × height | **50% at 146 px**, ≥ 90% inside 138 px, 10% at 159 px, **0 at 168 px** (IG: 144–151 / 122–132 / 158–164 / ≈ 170) | **Pass** |
| Feather (90% → 10%) | 30–45 px | **21 px**: tighter than IG's 30–40 | **Outside target** (see Remaining) |
| Close-back after the pointer **stops** (from a held disc) | ≤ 10% by 800 ms; 0 by ≈ 1.3 s | held to 250 ms; then **0.31 at 496 ms, 0.09 at 752 ms, 0.02 at 1008 ms, 0 at 1.25–1.5 s** | **Pass** |
| Leave (pointer jumps away) | gone by ≈ 1.0–1.25 s | 0.20 at 256 ms, 0.06 at 496 ms, 0.02 at 752 ms, **0 at 1008 ms** (IG: 0.58 / 0.21 / 0.09 / 0.01) | **Pass** (closes a little faster than IG) |
| Arrive | ≥ 70% by about 320–400 ms | **0.63 at 96 ms, 1.0 at 208 ms** | **Pass** (faster than IG: no 190 ms delay) |
| Largest area | continuous circling ≤ 21% of the viewport | **18.0%** of the viewport above 5%, 6.1% above 50% (IG: 18–21%) | **Pass** |
| Scroll | wall at 0.31× scroll; eased like IG | after a 2400 px scroll the wall moves **13% at 48 ms, 51% at 240 ms, 76% at 480 ms, 89% at 720 ms, 99% at 1.6 s** to exactly 0.31 × 2400 = 744 px (IG: 13%, 51%, 77%, 90%) | **Pass** |
| Scene changes across scroll regions | different subjects at the hero and deeper | **Hero:** the street (back row of houses, chimney, gables; `bgfix-04`). **2400 px:** the street's lower rows (`bgfix-06`). **5200 px:** the pavement edge and the lap-siding courses of panel 2 (`bgfix-08`); panel 3, the roofscape, follows | **Pass** |
| Pointer parallax | ≤ 4 px on the highest level | ≤ 2 px (uniform `par` = (x − 0.5) × −4 px at the screen edges) | **Pass** |
| Phone (390 × 844, touch) | a tight reveal that closes | tap: 50% at 98 px; **max 0.0 at 1.5 s** (closed) (`bgfix-09/10`) | **Pass** |
| Reduced motion | no canvas, white | **0 canvases** | **Pass** |
| Page errors | 0 | **0** | **Pass** |
| Revealed tones | IG: deepest 101, mid about 0.87–1.0 of ground | deepest **85–92**, p5 173–217, median 246–249 of 255 | Comparable range |
| Weight | — | three panels × two WebPs = **402 KB**; file 19.67 MB (the old pictogram renderer and its SVG scenes are gone) | — |
| Idle cost | — | the loop stops about 2.3 s after the last stamp; nothing renders at rest | Better than IG |

## Screenshots (`siding/redo/site/gate/`)

| File | What it shows |
|---|---|
| `bgfix-01-rest-page-1440.jpg` | At rest: the page as visitors see it |
| `bgfix-02-rest-background-only-1440.jpg` | At rest, content hidden: **pure white** |
| `bgfix-03 / 04` | Reveal at the hero (page, then the background alone) after a short pointer loop |
| `bgfix-05 / 06` | Reveal at 2400 px scroll |
| `bgfix-07 / 08` | Reveal at 5200 px scroll |
| `bgfix-09 / 10` | Phone, touch reveal |
| `bgfix-11-mask-held-disc.jpg` | The mask itself (`?bgmask`): the held disc |
| `bgfix-12-mask-circling-area.jpg` | The mask after continuous circling: the largest area opened (18%) |
| `bgfix-panel1/2/3-level5.jpg` | The three sculpted panels at full depth (what the reveal uncovers) |

## Retired

- The pictogram workers, the lime-washed circle and lime rim, the 260 px soft window, and the five coloured SVG scenes.
- No brand colour remains in the background layer.

## Remaining defects, named honestly

1. **Feather is tighter than IG:** 21 px (90% → 10%) against IG's 30–40 px. The edge is crisper than the reference. It suits the owner's "tight, bounded" order, but it is outside the spec's copied target. It can be widened by lowering the stamp strength (IG's class default `uAlpha` 0.3) and enlarging the falloff to compensate.
2. **The sculpt is code-modelled, not hand-sculpted:**
   - The mechanism, depth model, tones and reveal now match. The objects are code-modelled architecture (houses, siding, shingles, windows, ladders, roofs), not an artist's hand sculpt like IG's birds and flowers.
   - The forms are cleaner and more geometric than IG's garland.
   - At small reveal sizes, panel 2 (the wall) reads mostly as course lines.
   - **Asset request** (optional): if the owner wants IG-grade organic sculpting, provide a sculpted height map or mesh of the trade scene (e.g. from Blender or ZBrush, 16-bit, about 1280 × 1600 per panel). `bg/relief.py` bakes any height field into the six levels unchanged.
3. **Arrive and leave are faster than IG:** arrive has no 190 ms delay, and leave closes a little sooner. Both are within the owner's targets, but the timing is not identical to IG.
4. **Real-GPU check outstanding:** all measurements are from SwiftShader with a frozen clock. Real-hardware feel (smoothness at 60/120 Hz, half-float support on older phones) still needs a check on real devices; there is an 8-bit fallback that is untested on hardware.
5. **Content covers the background:** at the hero, the default hero is a full-bleed photo card, so the relief is seen only in the white margins around it, as with any content placed over IG's wall.

## Process notes

- **Exactly two study agents were launched**, for study only, as ordered. Everything else was built here.
- **No new versions were built.** Defaults are unchanged; no section template was touched by this work.

**Status:** committed. **Stopped for Muse's judgment.** New-version work (Booking K onwards) resumes only after this gate is accepted.
