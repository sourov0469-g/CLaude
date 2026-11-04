# GATE-BACKGROUND-FIX: the hidden world, rebuilt to Immersive Garden's mechanism (corrected)

**Under:** AUSTIN-BACKGROUND-CORRECTION-2026-11-04 (owner's order, binding). New-version work stays paused until Muse accepts this gate. Booking K has not been started.

## Muse's correction (2026-11-04) and what changed

Muse did not accept the first submission of this gate (commit 7dc7b42), on three points. Each is answered here:

| # | Muse's point | Done |
|---|---|---|
| 1 | No scorecard self-rating per category with evidence | **Added:** see *Scorecard* (D40 / U30 / C20 / Ct10, with evidence and vetoes) |
| 2 | No WEB-SKILLS tags | **Added:** see *Skill ledger*, with tags per element, each checked against its Atlas entry |
| 3 | Feather 21 px against the spec's 30–45 px | **Fixed and re-measured:** falloff widened (0.19 → 0.20) and the stamp strength lowered (1.0 → 0.38 for a slow or still pointer). The held disc's feather is now **33 px**, and every radius sits inside Immersive Garden's measured range (see *Measured numbers*). Before and after: `gate/bgfix-13-feather-before-after.jpg` |

**Two knock-on adjustments, made so the feather fix did not cost anything else (both measured below):**
- **Stamp strength follows pointer speed.**
  - **Problem:** a lower stamp strength alone made a moving reveal noticeably fainter. The deepest revealed tone rose from 85–92 to 138, against IG's 101.
  - **Fix:** the strength runs from 0.38 (slow or still pointer, the case the feather is measured on) up to IG's own 1.0 for a sweeping pointer (`0.38 + 0.62 × speed`).
  - **Result:** a sweep keeps its depth (deepest 94–143), and a still disc keeps the 30–45 px feather.
- **Close-back hold 250 → 450 ms; release 0.93 → 0.87 per frame.**
  - **Problem:** a lower strength builds a disc more slowly. With a 250 ms hold, a pointer that arrives and stops only opened a patchy disc (mean 0.3–0.5).
  - **Fix:** a 450 ms hold lets the disc form, and the faster release keeps the owner's close-back targets.
  - **Result:** ≤ 10% by 800 ms (measured 0.06 at 752 ms); 0 by 1.0 s.

**Correction to the first submission:** the file size was given as 19.67 MB. The built file is **20.15 MB** (20,151,603 bytes), and it was 20,151,149 bytes at commit 7dc7b42. The panels' 402 KB figure stands.

## What was done, in the order the correction set

1. **Study:** exactly two one-off study agents, as the owner ordered (study only; all build work done in this thread).
   - **Visual:** frame by frame from pixels, page clock frozen at 16 ms steps → `scratchpad/bgstudy/VISUAL-REPORT.md`, `visual/key/*.png`.
   - **Technical:** live GLSL and uniform capture, the bundle read, the relief models unpacked → `scratchpad/bgstudy/TECH-REPORT.md`, `tech/`.
   - Both are merged, with exact numbers, into **IMMERSIVE-BACKGROUND-SPEC.md**. The spec was written before any rebuild. Rows A7, A11 and A16 are amended for this correction and say so.
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
| Mask | 256² ping-pong flowmap: presence `a`, speed `b` = 1 − (1 − min(1, 50·\|v\|))²; stamp smoothstep(0.19, 0, d) × uAlpha in viewport-height units; cloud noise 0.15–1 | **The same formula,** with falloff **0.20** and uAlpha **0.38 → 1.0 with speed** (Muse's correction; see above) |
| Decay | 1/(1 + dm·(1/0.953 − 1)), dm = min(dt, 32)/16 | **The same** while the pointer moves |
| Ladder | extrude = a + b walks six smoothstep bands of 0.2 | **The same** |
| Scroll | Wall at 0.31× scroll, eased (τ ≈ 340 ms); mask shifted with it | **The same** |
| Pointer easing | 0.4 per frame; speed eased 0.1 / 0.04 | **The same** (dt-normalised) |

### Where the owner's rules override Immersive Garden

| Rule | Immersive Garden | Austin |
|---|---|---|
| Rest | Grey plaster (190), plus a ghost cursor raising clusters every 2.5–5 s | **Pure white, nothing at rest:** no ghost cursor; the canvas draws nothing (transparent) and its loop stops |
| Close-back | The disc stays open under a resting pointer, indefinitely | **The disc closes by itself:** presence holds 450 ms after the pointer stops, then releases at 0.87 per frame |
| Colour | A desktop fluid tint exists in code (not visible in measurement) | **None, by construction:** the shader outputs black with alpha over the white page, so R = G = B |
| Pointer parallax | None | The highest relief levels shift **≤ 2 px** with the eased pointer (the owner asked for layered parallax on the cursor). Scroll parallax is IG's: the wall at 0.31× under content at 1× |
| Reduced motion | Not handled | No canvas; the page stays white |

## Measured numbers (after the correction)

**Setup:** Chromium with SwiftShader WebGL2; page clock frozen and stepped 16 ms, as the visual study did. All rows are re-measured on the corrected build.

**Tools:**
- `?bgmask` is a measurement-only switch that draws the mask value itself; it is documented in `world.js`.
- Scripts are in `scratchpad/bgf/`:
  - `tg.js`: the full suite;
  - `env.py`: disc radii;
  - `arr.js`: arrival at four spots;
  - `ph.js`: phone;
  - `sweep.js`: the falloff and strength sweep.

**How the disc is measured:**
- 180 rays are cast from the held disc's centre.
- At each radius the 90th percentile across rays is taken: the disc's own edge, where the cloud noise is full.
- Re-run on the first build's held disc, this method gives 20 px, so the old "21 px" and the new "33 px" are like for like.

| Check (spec §4) | Target | Measured | Verdict |
|---|---|---|---|
| **At rest**, background only | every pixel #FFFFFF | **min 255, 0 non-white pixels** (`bgfix-02`) | **Pass** |
| Colour in the background | R = G = B | **max channel spread 0** across every background and mask frame | **Pass** |
| Reveal radius (held disc, 1440 × 900) | 50% at 0.165 × height ± 10% (≈ 148 px; 133–163); 0 beyond ≈ 0.19 × height | **50% at 145 px**, 90% at 131 px, 10% at 164 px, **0 at 174 px** (IG: 144–151 / 122–132 / 158–164 / ≈ 170) | **Pass**: every radius inside IG's measured range except r0, 4 px beyond IG's ≈ 170 |
| **Feather (90% → 10%)** | **30–45 px** | **33 px** (was 18–21 px) (`bgfix-11`, `bgfix-13`) | **Pass** (IG: 30–40) |
| Close-back after the pointer **stops** (from a held disc) | ≤ 10% by 800 ms; 0 by ≈ 1.3 s | held to 450 ms; then **0.57 at 496 ms, 0.22 at 608 ms, 0.06 at 752 ms, 0 at 1008 ms** (whole frame 0 at 1.25 s) | **Pass** |
| Leave (pointer jumps away) | gone by ≈ 1.0–1.25 s | 0.44 at 256 ms, 0.16 at 496 ms, 0.02 at 752 ms, **0 at 1008 ms** (IG: 0.58 / 0.21 / 0.09 / 0.01) | **Pass** (closer to IG than the first build) |
| Arrive (pointer jumps in and stops; four spots) | ≥ 70% by about 320–400 ms | disc centre **0.83–0.90 at 208 ms, 1.0 at 320 ms**; mean over the disc (r ≤ 115 px) 0.51–0.72 at 208 ms, 0.64–0.82 at 320 ms | **Pass** (still faster than IG, which has a 190 ms delay) |
| Largest area | continuous circling ≤ 21% of the viewport | **18.9%** of the viewport above 5%, 6.5% above 50% (IG: 18–21%) (`bgfix-12`) | **Pass** |
| Scroll | wall at 0.31× scroll; eased like IG | after a 2400 px scroll the wall moves **13% at 48 ms, 51% at 240 ms, 76% at 480 ms, 89% at 720 ms, 99% at 1.6 s** toward 0.31 × 2400 = 744 px (IG: 13%, 51%, 77%, 90%) | **Pass** (unchanged) |
| Scene changes across scroll regions | different subjects at the hero and deeper | **Hero:** the street (houses, chimney, gables; `bgfix-04`). **2400 px:** the street's lower rows (`bgfix-06`). **5200 px:** the pavement edge and the lap-siding courses of panel 2 (`bgfix-08`); panel 3, the roofscape, follows | **Pass** |
| Pointer parallax | ≤ 4 px on the highest level | ≤ 2 px (uniform `par` = (x − 0.5) × −4 px at the screen edges) | **Pass** |
| Phone (390 × 844, touch) | a tight reveal that closes | tap: peak **0.89 at 450 ms**, 50% at 78 px; 0.11 at 700 ms; **0 at 1.0 s** (`bgfix-09/10`) | **Pass** (smaller than the first build's 98 px: a tap is a still pointer, so it opens at the lower strength) |
| Reduced motion | no canvas, white | **0 canvases** | **Pass** |
| Page errors | 0 | **0** | **Pass** |
| Revealed tones after a pointer loop | IG: deepest 101 | deepest **94 / 99 / 143 / 96** (hero / 2400 / 5200 / phone); p5 158–206; median 250–252 of 255 | Comparable to IG |
| Weight | — | three panels × two WebPs = **402 KB**; the file is **20.15 MB** | — |
| Idle cost | — | the loop stops about 2.3 s after the last stamp; nothing renders at rest | Better than IG |

**The sweep that set the values** (held disc, envelope method):

| Falloff / strength | r50 | Feather |
|---|---|---|
| 0.19 / 1.0 (IG, first build) | 150 | 18 |
| 0.20 / 0.35 | 142 | 36 |
| 0.20 / 0.40 | 146 | 33 |
| 0.21 / 0.30 | 146 | 41 |
| 0.21 / 0.35 | 150 | 36 |
| 0.22 / 0.35 | 158 | 36 |
| 0.20 / 0.25 | 134 | 47 |
| 0.20 / 0.20 | 128 | 60 |
| **0.20 / 0.38 (chosen)** | **145** | **33** |

## Screenshots (`siding/redo/site/gate/`; all re-shot on the corrected build)

| File | What it shows |
|---|---|
| `bgfix-01-rest-page-1440.jpg` | At rest: the page as visitors see it |
| `bgfix-02-rest-background-only-1440.jpg` | At rest, content hidden: **pure white** |
| `bgfix-03 / 04` | Reveal at the hero (page, then the background alone) after a short pointer loop |
| `bgfix-05 / 06` | Reveal at 2400 px scroll |
| `bgfix-07 / 08` | Reveal at 5200 px scroll |
| `bgfix-09 / 10` | Phone, touch reveal |
| `bgfix-11-mask-held-disc.jpg` | The mask itself (`?bgmask`): the held disc, now with the 33 px feather |
| `bgfix-12-mask-circling-area.jpg` | The mask after continuous circling: the largest area opened (18.9%) |
| `bgfix-13-feather-before-after.jpg` | **New:** the held disc before (feather 18–21 px) and after (33 px), same crop |
| `bgfix-panel1/2/3-level5.jpg` | The three sculpted panels at full depth (what the reveal uncovers) |

## Skill ledger (WEB-SKILLS, per element; each tag checked against its Atlas entry)

| Level | Element | Skill → how used |
|---|---|---|
| Layer | The whole background | ⟦S0457⟧ webgl-landing-steering, lane A "subtle depth field": low amplitude, always secondary to copy. ⟦S1434⟧ visual-hierarchy: the background never competes, white at rest and hidden behind content |
| Scene | Three bas-relief panels | ⟦S0264⟧ threejs-textures: baked lighting in texture channels, six levels packed in RGB of two WebPs, linear-filtered; panels loop seamlessly through `wy` |
| Scene | Depth from light only | ⟦S0220⟧ anti-slop-design: zero glow, no gradient fills, no colour; depth comes from shadow and AO alone |
| Mask | Feathered disc under the pointer | ⟦S1324⟧ reveal-hover-effect: a soft, feathered circular window that is solid through the centre and fades to nothing at the edge, under an eased pointer. Its radii are replaced by IG's measured disc: 50% at 145 px, feather 33 px |
| Mask | Flow field and trail | ⟦S1331⟧ add-shader-cursor-trail: an invisible flow field follows the cursor, swells the reveal along the path and relaxes behind. ⟦S1338⟧ shaders-cursor-ripples: the field settles back to rest. Here a 256² ping-pong; the pass is dt-normalised |
| Shader | Flowmap and composite GLSL | ⟦S0257⟧ threejs-shaders: custom fragment shaders, uniforms, fbm noise. Written as raw WebGL2 with a WebGL1 fallback; no library |
| Motion | Close-back, arrive, leave | ⟦S0195⟧ motion-foundations: one motion personality (IG's decay curve) for the trail, the leave and the close-back |
| Motion | Scroll and pointer parallax | ⟦S0188⟧ gsap-utils, as principles only (no GSAP): the wall's 0.31× scroll offset is lerped (τ ≈ 340 ms), and the pointer offset is clamped to ≤ 2 px |
| Performance | Loop, cost | ⟦S1315⟧ optimize-web-animations: the RAF loop stops ~2.3 s after the last stamp and does not start while the document is hidden. ⟦S0385⟧ webgl-components: two passes, one 256² mask pair, DPR capped at 1.5 (1 on touch). Not yet done: the frame still builds a small array and looks up uniforms each frame (minor; noted for a later pass) |
| Access | Reduced motion | ⟦S0400⟧ accessible-animation: under `prefers-reduced-motion` no canvas is created (motion removed, not softened); the page stays white. The canvas is `aria-hidden` |
| QA | Measurement | ⟦S0091⟧ improve-threejs: the rendered scene is checked frame by frame. Stable frame after load (0 errors) and an idle loop that stops; every number above comes from frozen-clock frames |

## Remaining defects, named honestly

1. **The sculpt is code-modelled, not hand-sculpted:**
   - The mechanism, depth model, tones and reveal now match. The objects are code-modelled architecture (houses, siding, shingles, windows, ladders, roofs), not an artist's hand sculpt like IG's birds and flowers.
   - The forms are cleaner and more geometric than IG's garland.
   - At small reveal sizes, panel 2 (the wall) reads mostly as course lines.
   - **Asset request** (optional): if the owner wants IG-grade organic sculpting, provide a sculpted height map or mesh of the trade scene (e.g. from Blender or ZBrush, 16-bit, about 1280 × 1600 per panel). `bg/relief.py` bakes any height field into the six levels unchanged.
2. **Arrive is still faster than IG:**
   - IG shows nothing for about 190 ms, then reaches 0.70 at 320 ms.
   - Austin reaches 0.83–0.90 at 208 ms.
   - This is within the owner's target, but not IG's timing.
3. **The edge depends on speed:**
   - The 33 px feather is the still or slow pointer's.
   - A fast sweep stamps at IG's full strength, so a sweeping trail's edge is crisper, as in IG.
   - This is deliberate: it keeps the moving reveal's depth.
4. **The phone tap opens a smaller disc** than the first build (50% at 78 px, against 98 px). It is a still pointer, so it gets the lower strength. It still closes by 1.0 s.
5. **Real-GPU check outstanding:**
   - All measurements are from SwiftShader with a frozen clock.
   - Real-hardware feel (smoothness at 60/120 Hz, half-float support on older phones) still needs a check on real devices.
   - The 8-bit mask fallback is untested on hardware.
6. **Content covers the background:** at the hero, the default hero is a full-bleed photo card, so the relief is seen only in the white margins around it, as with any content placed over IG's wall.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.3** | Pure white at rest (0 non-white pixels). Depth only from baked light, shadow and AO, with no colour (spread 0). The held disc now matches IG on every radius (145 / 131 / 164 px; feather 33 px). The tones after a loop reach IG's depth (deepest 94–143 against IG's 101). The scene changes with scroll (street → siding → roofs). **Minus:** the sculpt is code-modelled and geometric, not hand-sculpted; panel 2 reads as course lines at small reveals |
| Usability (30) | **8.4** | It never blocks content: the canvas sits under it and takes no input. The disc closes by itself (0.06 at 752 ms, 0 by 1.0 s), so nothing lingers over copy. The largest area is 18.9%. Phone tap opens and closes. Reduced motion: no canvas. 0 page errors. Nothing renders at rest. **Minus:** not yet checked on real GPUs or phones; the phone tap disc is smaller than the desktop one |
| Creativity (20) | **7.8** | A trade-true world as white plaster relief (the street, a wall being re-sided around a new window, roofs from above) is new to this site and to the trade. The speed-dependent stamp keeps IG's depth while meeting the softer edge. **Minus:** the mechanism is copied from IG by order, so the originality is in the objects, not the effect |
| Content (10) | **8.0** | Every object is the firm's actual work: lap siding, flashing, casing, shingles, ladders, a caulk gun, a level. No claims, numbers, names or invented imagery. **Minus:** the scene is generic Austin architecture, not a specific street or job |
| **Weighted** | **8.20** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.3 + 0.3 × 8.4 + 0.2 × 7.8 + 0.1 × 8.0 = 3.32 + 2.52 + 1.56 + 0.80 = **8.20**.

**Vetoes: none.**

| Check | Result |
|---|---|
| Locked facts | Untouched (no text in this layer) |
| Forms | No form claims |
| Colour | None in the background (spread 0); deep green and lime only in content |
| Imagery | No invented imagery and no people |
| Defaults | Unchanged; no section template touched |
| Locked mechanics | Dive, drivable map, configurators and games are untouched |
| Sub-agents | Only the two owner-ordered study agents ever ran; nothing was delegated for this correction |

## Retired

- The pictogram workers, the lime-washed circle and lime rim, the 260 px soft window, and the five coloured SVG scenes.
- No brand colour remains in the background layer.

## Process notes

- **Exactly two study agents were launched,** for study only, as ordered. Everything else, including this correction, was built here.
- **No new versions were built.** Defaults are unchanged; no section template was touched.
- **The correction touched:**
  - `src/world.js`: stamp strength uniform, falloff, hold, release, comments;
  - the rebuilt `out/site.html`;
  - three amended rows in IMMERSIVE-BACKGROUND-SPEC.md;
  - the re-shot gate images;
  - this file.

**Status:** corrected and committed. **Stopped for Muse's judgment.** New-version work (Booking K onwards) resumes only after this gate is accepted.
