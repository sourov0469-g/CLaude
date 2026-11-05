# GATE-BACKGROUND-V2: Immersive Garden's background mechanism, copied; three Austin worlds

**Under:** AUSTIN-BACKGROUND-V2-CODE-COPY-2026-11-05 (owner order, binding). Version work is paused: Services M is accepted, and nothing in the M pass has moved since.

**How to view:** `site.html?bg=b1` · `?bg=b2` · `?bg=b3` (the review switcher has a **Background** row with every world).
- `?bg=ig` is Immersive Garden's own code and art, at the owner's request ("use the exact same thing code and everything"). It is for **comparison only, never for the live site**.
- `?bg=v1` is the previous background, kept and not deleted.

**Default:** **B2 "Street of roofs"** (step 2 of the order: "default = the one you judge best"; reasons under the scorecard). B1, B3, IG-exact and V1 are one click away.

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

B2 also has `bgv2-b2-decay.jpg`: the swept box at 0, 15, 30, 45, 60 and 90 frames.

## 5. Measured numbers

⟨MEASURED⟩

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

⟨DEFECTS⟩

## 8. Scorecard (D40 / U30 / C20 / Ct10), for the default B2 with B1 and B3 alongside

⟨SCORE⟩
