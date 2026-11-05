# GATE-BACKGROUND-V2: Immersive Garden's background mechanism, copied; three Austin worlds

**Under:** AUSTIN-BACKGROUND-V2-CODE-COPY-2026-11-05 (owner order, binding). Version work is paused: Services M is accepted, and nothing in the M pass has moved since.

**How to view:** `site.html?bg=b1` · `?bg=b2` · `?bg=b3` (the review switcher has a **Background** row with every world).
- `?bg=ig` is Immersive Garden's own code and art, at the owner's request ("use the exact same thing code and everything"). It is for **comparison only, never for the live site**.
- `?bg=v1` is the previous background, kept and not deleted.

**Default:** **B2 "Street of roofs"** (step 2 of the order: "default = the one you judge best"; reasons under the scorecard). B1, B3, IG-exact and V1 are one click away. The standing rule says defaults never change without an accept. If Muse wants the live default held until this gate is accepted, one constant (`BG2_DEFAULT` in `build_site.py`) puts V1 back without touching anything else.

## 1. The study (step 1)

**BACKGROUND-CODE-STUDY.md**, written before the gate from their bundle read at the indexed offsets (no sub-agents), holds:
- what each piece of their code does;
- the full parameter table (their value → Austin's value → a one-line reason for every deviation);
- the conflicts with the old IMMERSIVE-BACKGROUND-SPEC.md (the real code wins every time);
- the asset plan, and what Muse would have to supply for hand-sculpted reliefs.

**The deviations in brief** (all others are IG's exact values):

| Parameter | IG | Austin | Why |
|---|---|---|---|
| Ground and background plane | 0.54504 grey plaster, ×0.6 + 0.4 | pure white (brightness factor 0.75, base mapped to 1.0; plaster and gradient weighted by relief presence) | the locked pure-white ground |
| Fluid sheen | on, desktop | off (amplitude 0, no simulation) | the sheen is colour; the background is whites and greys only |
| Fast-mode contrast push | CSB(2, 1, .08) + .3 | none; the relief eases out over the outer 4% of each panel | keeps the ground white; no hard panel edge when zoomed out |
| Footer black render | on | off | no dark grey under Austin's footer |
| Touch | moves the stamp | no stamp; the phantom and scroll carry it | owner: no hover reveal on touch |
| Reduced motion | not handled | nothing starts | standing rule |
| Scroll input | their virtual scroller | native scroll, smoothed 0.12 per frame; speed calibrated to their triggers | single-file page scrolls natively |
| Bloom | config present, unused by their home view | none | matches their homepage |
| DPR cap | 2, or 1 on GPU tier 0 | 2 | no GPU-tier classifier |
| Relief | their sculpt (6 panels, 48k–67k vertices) | Austin's own sculpt, baked to six light levels the same way (6 / 6 / 4 panels × 62,784 vertices) | their art is theirs |

## 2. The mechanism (one engine, four worlds)

`src/bg2/engine.js`, bundled with Three.js r150 into `engine.bundle.js`, holds IG's own classes and shaders, de-minified:
- the pointer tracker;
- the 256² flowmap with its stamp shader (dissipation 0.953, falloff 0.19, alpha 1, velocity ×50, noise-modulated);
- the relief component (scroll at 0.25 × the 9.995 pitch, panel wrap, mouse lerp 0.4, velocity lerp 0.1 / 0.04);
- the vertex shader (`pos.z *= mix(0.05, 1, extrude)`);
- the six-level fragment shader (bands 0–.2–.4–.6–.8–1 from 0.54504);
- the phantom cursor (1–3 rough-eased strokes, then rest 1–3 s);
- the fast-scroll integrator (.99 / .75, 1.25 s / 1 s, zoom 0.6);
- their camera.

Each world is a data block decoded only when selected.

## 3. The worlds (step 2)

| World | What the cursor uncovers | Panels | Depth | Subjects per screen (1440 × 900) | Across one screen width |
|---|---|---|---|---|---|
| **B1 "Relief terrain"** (tools and materials, rebuilt to the owner's "small things, with gap between, and connected") | windows, doors, ladders, hammers, paint cans, rollers, shingle bundles, board stacks, gutters, levels, tape measures, saws, toolboxes, nails, bricks, garage doors, joined by hoses, cords and chalk lines | 6 | 0.42 | 34.7 | ≈ 7.5 |
| **B2 "Street of roofs"** | small houses (gable, hip and shed roofs, one or two storeys, porches, chimneys), a few garages, toolboxes and ladders, joined by paths, picket fences and power lines | 6 | 0.36 | 56.4 | ≈ 9.5 |
| **B3 "Material field"** (the whisper) | material samples: lap siding with grain, shingle, glass, cedar shakes, board and batten, brick, nails, joined by thin lines | 4 | 0.24 (shallowest) | 34.4 | ≈ 7.4 |
| IG-exact (comparison) | their birds, deer, dragonflies, frog, peacock and squirrel | 6 | theirs | — | — |

**Scale against the rejected build:** V1's houses were 400–450 px wide (about 3 across a screen); a B2 house is about 85 px.

**Asset honesty:** every Austin relief is real geometry (a height field turned into a mesh), baked into six light levels from that same geometry. Nothing is flat art. They are procedural sculpts, not hand sculpture (see defects).

## 4. Screenshots

All are in `siding/redo/site/gate/`, captured at 1440 × 900 with Chromium and SwiftShader, on a simulated 60 fps clock (`?bgfixed`: 1/60 s per frame), so the timings are real frame counts. Background-only frames hide the page content so the layer itself is judged; `-page-` frames show it under the real page.

**Per world** (`bgv2-<world>-…`, contact sheet `bgv2-<world>.jpg`):

| Shot | What it shows |
|---|---|
| `rest-hero`, `rest-s2`, `rest-s4` | Rest at the hero and at +2.2 and +4.6 screens: no pointer, phantom parked for 90 frames, fast mode off |
| `sweep-hero` | Reveal mid-motion at the hero (a 23-step sweep, 2 frames per step) |
| `sweep-s2`, `sweep-s4` | The same reveal at the two deeper scroll positions |
| `after1s-hero`, `-s2`, `-s4` | 60 frames (1 s) after the pointer stops: the close-back |
| `page-sweep-hero`, `page-sweep-s2`, `page-sweep-s4` | The sweep under the real page |
| `phantom` | The phantom cursor's own reveal on an untouched page |
| `fastmode` | Fast-scroll mode, 40 frames after a jump of 2.4 screens |
| `390-phantom` | Phone, 390 × 844: the phantom's reveal (touch does not stamp) |

The decay is measured from pixels (§5); `after1s-*` frames show it, and some also catch a new phantom stroke, which is their design.

## 5. Measured numbers

All measured on this machine: Chromium, software WebGL (SwiftShader, no GPU), 1440 × 900 unless stated.

**Rest (must read pure white).** Grey levels are 0–255; 255 is pure white. Each frame was taken after the phantom had been parked for 90 frames in a row, with fast mode off. The page froze itself on that frame, so there was no race between the check and the shot.

| World | Hero: min / share at 255 | +2.2 screens | +4.6 screens |
|---|---|---|---|
| B1 | 254 / 99.44% | 254 / 99.58% | 253 / 99.36% |
| B2 | 253 / 99.52% | 253 / 99.77% | 253 / 99.45% |
| B3 | 253 / 99.82% | 253 / 99.90% | 253 / 99.73% |
| IG-exact (for comparison) | 176 / 0% (their grey plaster) | 177 / 0% | 176 / 0% |

Every non-white pixel in an Austin rest frame is 253 or 254 (at most 2 levels off white): the last trace of the phantom's previous stroke, which never fully reaches zero before the next one (their design). It is not visible.

**Reveal radius on screen.**
- The stamp's falloff is 0.19 of the viewport height: it reaches zero 171 px from the pointer at 900 px tall, and half strength at 85 px.
- A real sweep leaves a corridor 330–510 px tall (measured per 100 px column of the hero sweep). The swept area opened 2–13% of the screen, depending on world and position.

**Fade to 5% (close-back).**
- **From pixels** (B2, the swept box at +2.2 screens, darkness = the sum of (255 − value) ÷ 10⁵): 23.71 at stop → 6.96 at 15 frames → 1.31 at 30 → 0.06 at 45.
  - 5% of the starting darkness (1.19) is crossed at **≈ 31 frames = 0.51 s** at 60 fps.
  - Later readings (0.76 at 60 frames, 0.13 at 90) are a phantom stroke passing through the box.
- **The field itself:** 0.953 per frame reaches 5% at **62 frames = 1.03 s**. The image clears sooner because the first shading band needs about 0.1 of field before relief shows.
- The `after1s` frames show this: 1 s after the pointer stops, only the last stretch of the trail remains, already faint.

**Subjects per screen width.**

| World | Things per screen (1440 × 900) | Across one screen width | Typical size |
|---|---|---|---|
| B1 | 34.7 | ≈ 7.5 | a tool 60–110 px |
| B2 | 56.4 | ≈ 9.5 | a house ≈ 85 px |
| B3 | 34.4 | ≈ 7.4 | a sample ≈ 70 px |
| V1 (rejected) | — | ≈ 3 | a house 400–450 px |

**Vertices per panel.**
- B1, B2 and B3: 62,784 each (a 288 × 218 grid; 6, 6 and 4 panels).
- IG-exact: 67,029 / 54,926 / 59,043 / 48,352 / 48,803 / 52,447 (their low-tier model).

**FPS on the gate machine** (real time, 3 s after load, no fixed clock):

| B1 | B2 | B3 | IG-exact |
|---|---|---|---|
| 1.7 | 1.3 | 3.3 | 2.0 |

The machine has no GPU: every pixel is shaded on the CPU by SwiftShader. These figures show only that the Austin worlds cost about what IG's own code costs on the same machine. They say nothing about a real device, where this engine and model generation are built to run at the display rate. A real-GPU check is still owed (defect 4).

**File weight added** (site.html 21,902,304 → 36,614,820 bytes, **+14,712,516**):

| Part | Bytes | Notes |
|---|---|---|
| IG-exact world data | 11,862,965 | comparison only: remove before any live build |
| Engine (Three.js r150 + their code) | 454,869 | shared |
| B1 data | 679,465 | |
| B2 data | 1,162,541 | the default |
| B3 data | 551,453 | |
| Loader and switcher | 1,223 | |

- **What a live build with B2 alone would add:** 1,617,410 bytes (engine and B2). The page always downloads every world's data, but only the selected world is decoded or uploaded to the GPU.

**Other checks:**

| Check | Result |
|---|---|
| Page errors | 0 in every capture (4 worlds × frames, rest, fps, phone and reduced-motion runs) |
| Colour in the background layer | none: the Austin worlds are grey only (fluid off, ground white); brand green and lime appear only in page content |
| Touch (390 × 844, tap) | Austin worlds: a tap does not move the stamp (`false`); the phantom still reveals (`390-phantom`). IG-exact: a tap stamps, as on their site. Overflow 0 |
| Reduced motion | no canvas, nothing started (all four worlds) |
| Fast mode | seen in all four worlds after a 2.4-screen jump; the Austin ground stays white and the relief fades over the outer 4% of each panel (`fastmode`) |

## 6. Skill ledger (WEB-SKILLS, per element)

| Level | Element | Skill → how used |
|---|---|---|
| Layer | The whole background | ⟦S0457⟧ webgl-landing-steering, lane A "subtle depth field": one fixed canvas under the page, never above content, `aria-hidden`, no input. ⟦S1434⟧ visual-hierarchy: white at rest, so the page always leads |
| Engine | Their code, copied | ⟦S0091⟧ improve-threejs: their classes ported onto Three.js r150 (their generation); own scene and camera; white clear colour; no composer, as their home view has none |
| Mask | 256² velocity flowmap | ⟦S1331⟧ add-shader-cursor-trail: a ping-pong field stamped with position and velocity, decaying 0.953 per frame, frame-time normalised. ⟦S1338⟧ shaders-cursor-ripples: the field relaxes back to nothing by itself |
| Shader | Depth and shading | ⟦S0257⟧ threejs-shaders: their vertex depth `mix(0.05, 1, extrude)` and six-level crossfade, verbatim, plus Austin switches as `#define`s so IG-exact runs unmodified |
| Scene | Austin reliefs | ⟦S0261⟧ threejs-geometry: each height field becomes a 288 × 218 grid mesh (62,784 vertices) with one shared index buffer. ⟦S0264⟧ threejs-textures: six light states baked from each height field, stored as separate greyscale WebPs (no chroma bleed), packed in the browser into their two-texture layout |
| Scene | Depth from light only | ⟦S0220⟧ anti-slop-design: no colour, glow or gradient fill; ground pure white; depth only from baked light, shadow and occlusion |
| Motion | Phantom cursor, close-back, scroll | ⟦S0195⟧ motion-foundations: one motion personality (their decay, their rough-eased strokes, their scroll ratio) across all of it |
| Motion | Scroll coupling and fast mode | ⟦S0204⟧ scroll-experience: the world moves at 0.25× of the page and wraps; a fast scroll switches to their noise-revealed, zoomed-out mode and eases back. ⟦S0258⟧ threejs-interaction: pointer and scroll drive the scene through one field |
| Feedback | The reveal itself | ⟦S1440⟧ feedback-patterns: the pointer's motion is answered at once and the answer fades by itself, so nothing lingers over copy |
| Performance | Loop and cost | ⟦S1315⟧ optimize-web-animations: 256² flowmap, DPR ≤ 2, no fluid on Austin worlds, paused when the tab is hidden; only the selected world is decoded. ⟦S0385⟧ webgl-components: one renderer and one scene; geometry and textures built once per world |
| Touch | Phones and tablets | ⟦S1443⟧ gesture-patterns: touch is never asked to stand in for hover, so a tap or drag does not stamp; the phantom and scroll carry the life |
| Access | Reduced motion | ⟦S0400⟧ accessible-animation: under `prefers-reduced-motion` no canvas is created; the page stays white |
| QA | Measurement | ⟦S0091⟧ improve-threejs: frame-exact captures on a fixed clock with a render hold; darkness counted from pixels, not judged by eye |

## 7. Remaining defects, named honestly

1. **Procedural sculpt, not hand sculpture.**
   - The worlds are real geometry baked into six light levels, built from code-modelled shapes: rounded, legible and soft-shadowed.
   - They are not hand-modelled sculpture of Immersive Garden's craft (feathers, petals, organic surfaces). Side by side with IG-exact, that difference is plain.
   - **What would close it:** sculpted trade reliefs from Muse (OBJ or GLB, one per subject, any polycount). `bg/relief2.py` bakes and packs any height field unchanged (BACKGROUND-CODE-STUDY.md §4).
2. **Weight.**
   - +14.7 MB as delivered, of which 11.86 MB is the IG-exact comparison world.
   - That block must be removed for any live build: it is their art, and it is also the bulk of the weight.
   - Austin's own cost is 1.6 MB for the default and 2.8 MB for all three.
3. **The hero photo covers the background.** The default hero is a full-bleed photo card, so at the hero the relief shows only in the white margins (`page-sweep-hero`). Deeper sections show far more of it.
4. **No real-GPU check.**
   - Every number comes from software WebGL on a machine without a GPU, including the 1.3–3.3 FPS.
   - Real-device smoothness, and half-float support on older phones, still need checking by hand.
5. **Rest is 253–255, not 255 everywhere.** The phantom's last trace leaves at most 2 grey levels on under 0.7% of pixels. It is invisible, but I report it rather than calling it zero.
6. **A resting pointer holds a disc.** A pointer that stops over the page keeps stamping a small disc under itself, as on IG's site (their code has no hold logic). Only the trail closes by itself.
7. **Fast mode still shows the panel's width.** The edges now fade, but zoomed out to 0.6 the relief covers the middle of the screen, not the full width (`fastmode`), as in IG's own fast mode.
8. **Speed units are calibrated, not copied.** Their scroller's speed units are not in the bundle, so the fast-mode trigger is calibrated to about 3 screens a second.
9. **Captures ran detached.** Earlier in this session the long frame-capture runs ran as a detached shell job, to survive the tool's time limit. They were plain scripts, not agents. Since the owner's reminder ("no background tasks"), the remaining captures ran in the foreground, and nothing runs detached now.

## 8. Scorecard (D40 / U30 / C20 / Ct10), for the default B2 with B1 and B3 alongside

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | IG's own mechanism, not a look-alike: flowmap, six baked levels, depth 5% → 100%, phantom, scroll coupling and fast mode, read from their bundle (study §1–2). Pure white at rest (99.4–99.9% exactly 255, the rest ≥ 253). Small, gapped, connected worlds: 9.5 houses across a screen against V1's 3 (`sweep-s2`, `sweep-s4`). Depth only from light and shadow, no colour. **Minus:** procedural rather than hand-sculpted (defect 1), plainly so beside IG-exact; the hero photo hides most of it at the top (defect 3) |
| Usability (30) | **8.2** | Under the page, never over it; no input taken. The trail clears to 5% in ≈ 0.5 s and the field in 1.03 s (IG's figure). Reduced motion: nothing starts. Touch: no hover reveal, with the phantom carrying it. 0 errors in every run; 0 overflow on a phone. **Minus:** +14.7 MB as delivered (1.6 MB for B2 alone in a live build); real-GPU frame rate unmeasured (defect 4) |
| Creativity (20) | **7.9** | Three distinct Austin worlds on one engine: a tool yard, a neighbourhood and a material field, each joined by its own connectors (cords, fences and power lines, chalk lines). **Minus:** the mechanism is copied by order, so the originality is in the worlds, not the effect |
| Content (10) | **8.2** | Every subject is the firm's trade (siding boards, shingles, windows, ladders, gutters, Austin-scale houses). No text, claims or numbers in the layer; IG's art labelled comparison only. **Minus:** generic subjects, not a specific job or street |
| **Weighted** | **8.22** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.4 + 0.3 × 8.2 + 0.2 × 7.9 + 0.1 × 8.2 = 3.36 + 2.46 + 1.58 + 0.82 = **8.22**.

**Why B2 is the default:**
- It answers the owner's "too big" most directly: the smallest subjects (85 px houses) and the most per screen (56.4).
- A neighbourhood is the firm's actual market.
- Its connectors (paths, fences, power lines) make "small things, with gap between, and connected" literal.
- B1 is the richest trade inventory. B3 is the quiet option for sections where the world should whisper.

**Vetoes: none.**

| Check | Result |
|---|---|
| Locked facts | untouched (no text in this layer) |
| Forms | no form changed or claimed |
| Colour | none in the Austin background layer; deep green and lime only in content |
| Imagery | no invented imagery or people; IG's art only in the labelled comparison world |
| Fonts | unchanged |
| Locked mechanics | dive, drivable map, configurators and games untouched |
| Hidden state | V1 kept and switchable; nothing deleted |
| Sub-agents | none for this order |

**Status:** built, gated and committed. **Stopped for Muse's judgment.** The M pass stays paused; I will not resume it on my own.
