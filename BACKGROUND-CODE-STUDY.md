# BACKGROUND-CODE-STUDY — Immersive Garden's homepage background, read from their code

**Under:** AUSTIN-BACKGROUND-V2-CODE-COPY-2026-11-05 (owner order, binding). Written before the gate, from the supplied package, now in the branch at `siding/bgstudy-v2/background-code/`. That package holds their production bundle `entry.DyxL_KXi.js`, the relief model `reliefs_low_compressed.glb`, plaster and noise textures, `EXTRACT-INDEX.md` and `BACKGROUND-TEARDOWN.md`.

I read both documents in full. Then I read the bundle myself at the indexed offsets and beyond, with no sub-agents, as the order requires.

The copy lives in `siding/redo/site/src/bg2/engine.js`. It carries their classes and shaders, de-minified, and is bundled with Three.js r150 (their engine generation) into `engine.bundle.js`.

## 1. What their code actually does (read, not inferred)

| Piece | Where in the bundle | What I read |
|---|---|---|
| Pointer tracker `Kge` | @1876144 | `normalFlip` (0..1, y up) from pointer and touch moves. Per tick, `velocity` = frame delta × min(32, ms)/16. |
| Flowmap `E_e` | @1935927; shaders `b_e`/`x_e` @1934458 | 256² ping-pong target: half float on iOS, float elsewhere. Per frame it samples at `uv + (0, uOffset)` (the scroll shift) and multiplies by `1/(1 + uDeltaMult·(1/dissipation − 1))`. It adds the pointer stamp `vec4(vel·50, easeOutQuad(\|vel·50\|), 1) · smoothstep(uFalloff, 0, \|cursor\|) · uAlpha`, modulated by noise `0.15 + 0.85·smoothstep(.4, 1, noise.g)` (0.8 scale). It adds the phantom stamp ×3 with rg = 0 and a = b (0.35-scale noise), then clamps. `setFalloff(f)` stores f·0.5. |
| Relief component `D_e` | @1948314 | Builds its own scene and camera. A background plane (shader `T_e`, renderOrder −1) and one mesh per panel use `ShaderMaterial` `S_e`/`C_e`; `tBake1` is the panel's base-colour map and `tBake2` its emissive map. Per frame: `scene.y = uScroll·−9.995`; panels wrap; scroll delta clamped to ±0.2; mouse lerp 0.4; velocity lerp 0.1 or 0.04; `flowmap.update(−delta)`; scroll-speed easing 0.04; camera fit and zoom. |
| Vertex shader `S_e` | @1945600 | Screen-space flow sample; `extrude = mix(b, a, .5)`, crossfaded to the fast-scroll noise; `pos.z *= mix(.05, 1, extrude)`; `pos.xy *= 1.004`. A scroll deform term is computed but never applied (dead code, kept verbatim). |
| Fragment shader `C_e` | @1937900 | `flow ×2`. Six levels: 0..2 = `bake2.b/g/r`, 3..5 = `bake1.b/g/r`, starting at the constant 0.54504. Crossfades over 0–.2–.4–.6–.8–1. Plaster `.g` at `vPos.xy/10`; gradient; brightness factor and offset. Fresnel from screen-space derivatives; chromatic fluid sheen; fast-mode contrast; footer "black render". |
| Phantom cursor | `triggerRandomMouseMovement` / `loopRandomMouseMovement` @1954200 | 1–3 strokes. Each 0.8–1 s (non-final, 70% chance) or 0.7–0.8 s, on a GSAP `rough` ease (strength 3 or 2, 12 points per second, template power2.out or none). Directions are rotated ±0.8π, magnitude 0.7–0.9. `velocity2` = (1, 1). It parks at (−1, −1) and restarts after 1–3 s. |
| Fluid sheen `v8` | @1552018 | Stable fluids: velocity 128², dye 512², curl, vorticity, divergence, 3 pressure iterations, gradient subtract, advect. Splats come from pointer moves (deltas clamped to 20 px, ×5) with radius `0.7/100 · clamp(map(\|d\|, 5..78 → 0..2))`. Its dye texture is `tFluidFlowmap`. |
| Fast-scroll trigger | home scroll component @1928600 | `progress += (speed − 0.05)·(0.3 if negative, else 0.6)`, or `(speed − 0.025)·(0.3/0.9)` in fast mode. Clamp 0..1; reset at the scroll top. Fast at ≥ 0.99 and slow at ≤ 0.75, desktop only. Tweens: 1.25 s power2.out, then 1 s sine.out. |
| Bloom | home config `k_e.composer` @1987291 | **Listed but not used on the homepage.** The home view `F_e` extends the view base `Oc`, which has no composer. The only reader of `config.composer` is another view's composer (`sve` @2021221, bloom visibility 0 by default). The teardown's "bloom 2.2" is therefore not part of the homepage look. I proved it: with a bloom pass the copy turns pure white; without it, it matches their render. |

## 2. Parameter table: Immersive Garden → Austin

| Parameter | Immersive Garden (their code) | Austin V2 (as built) | Deviation, one line |
|---|---|---|---|
| Flowmap size | 256 × 256 ping-pong | 256 × 256 ping-pong | none |
| Flowmap pixel type | float (half float on iOS) | same | none |
| Dissipation | 0.953 per 60 fps frame, `uDeltaMult = min(ms, 32)/16` | same | none |
| Falloff | config 0.38 → `uFalloff` 0.19 | same | none |
| Stamp alpha | 1 | same | none |
| Pointer ease | mouse lerp 0.4 per frame | same | none |
| Velocity lerp | 0.1 moving, 0.04 still | same | none |
| Stamp velocity scale | ×50, easeOutQuad magnitude | same | none |
| Stamp noise | 0.15–1.0 drift noise (mask-noise, 0.8 scale); phantom 0–1 (0.35 scale) | same shader; Austin worlds use Austin's own noise texture with the same statistics (mean .536, sd .188) | their noise image is their asset; IG-exact uses theirs |
| Fragment extrude gain | ×2 (vertex ×1) | same | none |
| Vertex depth range | z × mix(0.05, 1, extrude) | same | none |
| Bake bands | smoothstep 0–.2–.4–.6–.8–1 over six levels | same | none |
| Base grey | 0.54504 | same constant in every level | none |
| Plaster / gradient strength | 1 / 0.17 | IG-exact: same. Austin: scaled by relief presence `clamp(\|o − 0.545\|·6)` | Austin's lock: flat ground must stay pure white, at rest and revealed |
| Brightness factor / offset | 0.6 / 0.4 desktop · 0.5 / 0.6 mobile | IG-exact: same. Austin: factor 0.75, offset `1 − 0.54504·factor` (base → 1.0) | pure white ground lock; 0.75 because white clips the highlights IG keeps |
| Background plane | 0.54504 × plaster + gradient, ×0.6 + 0.4 | IG-exact: same. Austin: 1.0 (white) | pure white ground lock |
| Fluid sheen | on (desktop); amplitude .57, magnitude .15, hue −.52, range 2, coefficients 2 / 1 / 1.5 | IG-exact: on (desktop). Austin: off (amplitude 0) | the sheen is colour; the background is whites and greys only |
| Chromatic mask | fresnel 35, opacity .98, shadow .2–.42, .25 | same defines (inactive when amplitude is 0) | none |
| Global fluid sim | 128² / 512², density .95, velocity .8891, pressure .925, curl .1, radius .7, range 5–78 | IG-exact: same, desktop. Austin: not created | colour lock (as above) |
| Scroll parallax | `uScroll = −scrollY/(innerHeight·dpr)·0.25`; `scene.y = uScroll·−9.995` | same | the page scrolls natively here (their page is a virtual scroller), so the input is lightly smoothed (0.12 per frame) |
| Row pitch / wrap | 9.995; wrap modulo the panel stack | same | none |
| Fast / slow triggers | ≥ .99 / ≤ .75; 1.25 s power2.out in, 1 s sine.out out; desktop only | same | their scroller's speed units are not in the bundle; speed = \|Δy\|/innerHeight × 2.5 per 16 ms, calibrated so about 3 screens a second triggers |
| Fast mode effects | noise extrude (size 7.77, speed 2, mask −1..1, strength 1.02), zoom 1 → 0.6, contrast push | same | none |
| Camera | fov min(30, fit), distance 15, near 5, far 20; fit `1.33·(9.995 − 0.1)/aspect` | same | none |
| Bloom | config present, **not used by the home view** | none | matches their homepage |
| Phantom cursor | as in §1 | same algorithm; RoughEase rebuilt as jittered points on the template curve | GSAP's EasePack is not in this build |
| Footer colour switch | `uSwitchColorTransition` → 1 over 1.2 s sine.inOut when the footer is in view | IG-exact: same. Austin: off | the black render would put dark grey under Austin's footer |
| DPR cap | 2 (1 for GPU tier 0) | 2 | no GPU-tier classifier here |
| Touch | touch moves the stamp | IG-exact: same. Austin: no stamp from touch; the phantom and scroll carry it | owner's order: no hover reveal on touch |
| Reduced motion | not handled | nothing starts; the page stays white | standing Austin rule |
| Relief model | 6 panels, 48k–67k vertices each, positions and UVs only | IG-exact: their low-tier model, decoded offline, the same vertices. Austin: 6 / 6 / 4 panels of 288 × 218 = 62,784 vertices, positions and UVs only | Austin's own sculpt (§4) |

## 3. Where the previous IMMERSIVE-BACKGROUND-SPEC.md conflicts with the real code (the real code wins)

| Old spec (V1) | Real code | V2 |
|---|---|---|
| A7: falloff 0.20; presence alpha 0.38 rising to 1 with speed | falloff 0.19; alpha 1 constant | code |
| A8: `extrude = min(2, b + a)` | `extrude = mix(b, a, 0.5)`, ×2 in the fragment shader | code |
| A11: presence stops 450 ms after the pointer stops, then a 0.87 release | no hold logic: the field only dissipates at 0.953 per frame; a resting pointer keeps stamping its disc | code (the trail closes by itself; the disc under a resting pointer stays, as on their site) |
| A12: no ghost cursor | phantom cursor always running | code (the order requires it) |
| A2: three panels, drawn as flat image quads | six panels of real geometry with vertex depth 5% → 100% | code |
| A3: levels = the same height lit at depth ×0.2..1.0 | levels = the same sculpt under six lighting states (the light moves and lowers; level 3 is nearly flat) | code: Austin's levels are baked as light states (§4) |
| A14: scroll 0.31×, τ 340 ms | 0.25× of scrollY/(innerHeight·dpr), times the 9.995 pitch | code |
| A15: pointer parallax up to 4 px | none; depth comes from the perspective camera and vertex depth | code |
| A1: DPR ≤ 1.5 (≤ 1 on phones) | DPR ≤ 2 | code |
| A18: the loop stops when the mask is empty | the loop never stops (the phantom keeps it alive); paused when the tab is hidden | code |
| Bloom: not mentioned | not used on the homepage (the teardown's "bloom 2.2" is a config the home view never reads) | code |

## 4. Asset plan for the Austin worlds

**Owner's direction, 2026-11-05 (in session).** "Small things, with gap between, and connected, or like lots of different things and different places." The first Austin pass (dense patchwork terrain and terraced rows) was rejected on sight and rebuilt as below.

**Pipeline** (`siding/redo/site/bg/relief2.py`, no outside tools):
- **Sculpt:**
  - Each world is one tall height field, periodic top to bottom so the panel stack wraps without a seam, 1024 texels per 13.2 units (IG's panel width).
  - Small sculpted things are drawn from signed-distance shapes with rounded bevels: windows with sills, doors, ladders, hammers, paint cans, rollers, shingle bundles, board stacks, gutters, levels, tape measures, saws, toolboxes, nails, bricks, garage doors, and houses (gable, hip and shed roofs, one or two storeys, porches, chimneys).
  - They are placed by Poisson-disc sampling inside a noise-shaped density, which makes clusters and open ground.
  - Each thing is joined to one or two neighbours by a sagging hose or cord, a straight chalk line, a path, a picket fence or a power line.
- **Bake:**
  - The same height field is lit under five increasing states. The light lowers from 70° to 32° and swings from 150° to 120°.
  - Each state uses Lambert shading, soft marched shadows and cavity occlusion, normalised so flat ground is exactly 0.54504 in every level.
  - This follows what their textures show: the levels are lighting states of one sculpt.
- **Pack:**
  - Each level is stored as its own greyscale WebP. Packing six data channels into lossy RGB would bleed channels through chroma subsampling.
  - The browser packs them into two RGB textures exactly as theirs: `bake1` = (l5, l4, l3), `bake2` = (l2, l1, height). Level 0's slot carries the height, because the shader overwrites level 0 with the constant.
- **Geometry:**
  - The mesh is built in the browser from the height map: 288 × 218 = 62,784 vertices per panel (IG low tier: 48k–67k), positions and UVs only, one shared index buffer.
  - Draco is not used: Austin's meshes are generated, not shipped.
  - IG-exact uses their Draco model, decoded offline (DracoPy) into quantised 16-bit positions and UVs, gzipped (4.6 MB), and decompressed in the browser with `DecompressionStream`.

**Worlds:**

| World | Panels | Depth (units) | Subjects |
|---|---|---|---|
| B1 Tools and materials ("relief terrain", rebuilt to the owner's note) | 6 | 0.42 | tools and materials, Poisson spacing 84 texels, scale 0.85–1.15 |
| B2 Street of roofs | 6 | 0.36 | small houses (some garages, toolboxes and ladders), spacing 70 texels |
| B3 Material field | 4 | 0.24 (shallowest) | material samples (lap with grain, shingle, glass, shakes, battens, brick, nails), spacing 112 texels |

**What I cannot make, and what Muse could supply instead.** These are procedural sculpts: rounded, legible and soft-shadowed, but not hand-modelled sculpture of IG's craft (feathers, petals, organic surface).
- If the owner wants that level, Muse would need to supply sculpted trade reliefs: OBJ or GLB, one per subject, any polycount. The same bake and pack pipeline would take them.
- Nothing has been silently substituted. Every Austin relief is real geometry baked from that geometry.

## 5. Notes on using their code and art

- The IG-exact world uses their bundle's logic and shaders and their model, textures and noises, at the owner's explicit request ("use the exact same thing code and everything", 2026-11-05).
- It is labelled in the switcher as comparison only. Their sculpture and textures are Immersive Garden's artwork and must not go on the live client site.
- The Austin worlds use only Austin's own assets with the copied code.
