# IMMERSIVE-BACKGROUND-SPEC — the hidden world, rebuilt to Immersive Garden's mechanism

**Under:** AUSTIN-BACKGROUND-CORRECTION-2026-11-04 (owner's order, binding). New-version work is paused until GATE-BACKGROUND-FIX passes.

**Sources.** Two one-off study agents ran, as the owner ordered (the only exception to the no-sub-agents rule; study only):
- **Visual**, frame by frame from pixels, page clock stepped 16 ms: `scratchpad/bgstudy/VISUAL-REPORT.md`, screenshots in `scratchpad/bgstudy/visual/key/`.
- **Technical**, at code level: live GLSL capture, the 2.4 MB bundle beautified, the relief models unpacked. See `scratchpad/bgstudy/TECH-REPORT.md` and `scratchpad/bgstudy/tech/`.

The two agree on every point below. Where one corrects the prior study (`siding/redo/REVERSE-ENGINEERING.md` §1), that is noted.

---

## 1. How Immersive Garden's background actually works (measured)

| # | Quantity | Immersive Garden (measured) | Evidence |
|---|---|---|---|
| 1 | Stack | Three.js r151, WebGL2, one full-screen canvas; DPR ≤ 2 (1 on weak GPUs); 5 passes per frame (fluid sim, flowmap, background, UI, composite) | Tech §1 |
| 2 | What the hidden scene is | **Sculpted bas-relief meshes with baked light.** Six panels (18 on high-end GPUs), 48k–67k vertices each, stacked vertically and looping. One continuous garland per panel (birds, flowers, leaves joined by stems; branches and roots further down), filling the central ~70% with bare plaster at the corners | Tech §0; Visual §2; `visual/key/10_hero_hidden_scene_composite.png` |
| 3 | How depth is made | **Six pre-baked greyscale lighting renders of the same sculpt at six increasing relief depths**, packed into the six RGB channels of two 2048² WebPs per panel. Light from the top, with cast shadows and ambient occlusion. No live lights, no normal maps | Tech §0; `tech/dl/glb/bird_levels_montage.png` |
| 4 | Why there is no seam | In all six levels the flat wall is exactly **139/255 (0.54504)**. At mask 0 the shader outputs that constant, so the sculpture is mathematically invisible | Tech §0 |
| 5 | Tones once revealed | Deepest shadow **101**, mid 165–192, highlight max **213** on a 190 ground. Highlights reach only about +20 above the ground, shadows −75 to −90. **Depth is carried by shadow and AO** | Visual §1 |
| 6 | Colour | **None** in the background: R = G = B in every pixel over 400 frames, including a 4000 px/s swipe. The code's fluid tint is desktop-only, small, and was not visible | Visual §1; Tech §2.4 |
| 7 | Reveal mask | One **256² float ping-pong flowmap**, not 128². Channel `a` is pointer presence; channel `b` is speed, `1 − (1 − min(1, 50·|v|))²`. `extrude = b + a` (0 to 2) | Tech §0, §3 |
| 8 | Stamp | `smoothstep(uFalloff, 0, dist)`, with dist in screen-height units and x corrected for aspect. **uFalloff = 0.19** (config 0.38 × 0.5). Multiplied by a drifting cloud noise of 0.15–1.0, so the edge breaks up organically | Tech §3 |
| 9 | Measured disc | 50% alpha at **144–151 px** (1440 × 900), ≥ 90% inside 122–132 px, 0 beyond about 170 px. **Feather 30–40 px** (90% → 10%). The same CSS-px radius on a 390 phone | Visual §1 |
| 10 | Decay (close-back) | Per frame `d = 1 / (1 + uDeltaMult·(1/0.953 − 1))`, with `uDeltaMult = min(dt, 32)/16`, so **0.953 per frame at 62.5 fps**. Measured: after the pointer leaves, 58% at 256 ms, 9% at 752 ms, **0 at about 1.0–1.25 s**. Hiding takes 2.5–3× longer than showing | Tech §3; Visual §1 |
| 11 | Arrive | Nothing for about 190 ms, then **70% at 320 ms** and 93% at 400 ms; forms "push up", with shadows growing over about 250 ms | Visual §1 |
| 12 | Pointer easing | Mask position eases **0.4 per frame**. Velocity is the per-tick delta × min(32, dt)/16, smoothed **0.1 per frame while moving, 0.04 when stopped** | Tech §3 |
| 13 | Trail | Above 50% for 0.5–1.0 s after the pointer passes; gone by 1.0–1.5 s. Continuous circling never opens more than **18–21% of the viewport** | Visual §1 |
| 14 | Resting pointer | **Immersive Garden keeps the disc open indefinitely** (presence saturates). Touch too | Visual §1; Tech §3 |
| 15 | Rest (no input) | A grey plaster ground (190), plus a hidden "ghost cursor" that raises 1–3 clusters every 2.5–5 s (about 3% of the viewport) | Visual §1; Tech §3.4 |
| 16 | Scroll | The wall **and** its relief move as one plane at **0.31×** scroll, eased (τ ≈ 340 ms). The mask is shifted by the same amount each frame, so trails stay on the wall. No cross-fades and no breakpoints: the panels simply pass, a new motif about every 4 screens | Visual §1, §4; Tech §5 |
| 17 | Parallax | **Pointer: none** (pixel-identical at 5 pointer positions). Scroll: content moves 3.2–4.7× faster than the wall, which is the depth cue. The mesh z-lift is tiny (0.05 → 1 × 0.05) | Visual §1 |
| 18 | Reduced motion | None handled | Tech §6 |

**Prior study corrected:**
- the flowmap is 256², not 128²;
- the falloff uniform is 0.19, not 0.38;
- the scene **is** geometry with baked light;
- the show and hide tweens belong to the footer only;
- the relief does not change per project;
- the "chromatic edge" is not visible.

---

## 2. The Austin rebuild: same mechanism, Austin objects

**The rule** (owner, §3(e)): copy the mechanism exactly; only the objects differ. Where the owner's correction orders something different from what Immersive Garden does, the owner wins, and the row says so.

| # | Element | Austin value | Same as IG? |
|---|---|---|---|
| A1 | Renderer | WebGL (2, falling back to 1), no library, one fixed full-screen canvas behind the content, DPR ≤ 1.5 (≤ 1 on phones) | Same mechanism (Three.js not needed for a quad) |
| A2 | Hidden scene | **Three bas-relief panels, sculpted as height fields and baked offline** (§3), looping vertically: (1) an Austin street frieze, (2) a wall being re-sided around a new window, (3) a roofscape being re-roofed. Each is one continuous, connected scene filling the central ~70%, with corners bare | Same structure (panels, loop, central fill); objects differ |
| A3 | Depth | **Six levels per panel**: level 0 = flat; levels 1–5 = the same height field lit at depth × 0.2, 0.4, 0.6, 0.8, 1.0. Each is lit from the top (elevation 45°, a slight left component), with ray-marched cast shadows and multi-scale ambient occlusion. Packed into two RGB WebPs per panel (levels 1–3 and 4–5 + plaster grain) | **Same** (6 baked levels in 6 channels) |
| A4 | Tone | **Flat = pure white 1.0** in every level (owner: pure white at rest). Relief only darkens: deepest shadow about 0.45 (115/255), mid about 0.75–0.92, a soft-white top face at 1.0. The shadow-to-ground ratio matches IG (deepest shadow at about 55% of ground) | Mechanism same; **ground white, not IG's grey 190 (owner's order)** |
| A5 | Colour | **None.** R = G = B is guaranteed: the shader outputs one grey channel to all three. Brand colours never enter the background | Same as observed (and stricter: no fluid tint) |
| A6 | Mask texture | 256² ping-pong; RGBA half-float where available, else RGBA8 with a 1/255 floor so it always reaches 0 | Same (256²) |
| A7 | Stamp | `smoothstep(0.19, 0.0, dist)` with dist in viewport-height units, aspect-corrected. That gives 50% at about 0.165 × viewport height (≈ 148 px at 900), with the edge broken by cloud noise of 0.15–1.0 drifting 0.01 uv/s | **Same** |
| A8 | Channels | `b` = speed `1 − (1 − min(1, 50·|v|))²`; `a` = presence. `extrude = min(2, b + a)` | **Same** |
| A9 | Pointer easing | Mask position eases 0.4 per frame (×dt/16, capped); velocity smoothed 0.1 moving and 0.04 stopped | Same values (dt-normalised) |
| A10 | Decay | `d = 1/(1 + uDeltaMult·(1/0.953 − 1))`, `uDeltaMult = min(dt, 32)/16` | **Same** |
| A11 | Close-back with a resting pointer | **The owner's rule, not IG's:** presence stops stamping **350 ms after the pointer last moved**, so the disc closes by itself in about 1.0–1.25 s (IG's leave-curve). IG keeps it open. The owner: "closes itself back… never spreads" | **Deviation, owner's order** |
| A12 | Rest | **Nothing at rest.** No ghost cursor, so the page is pure white until the pointer moves | **Deviation, owner's order** ("nothing visible at rest") |
| A13 | Level ladder | `out = 1.0` (flat); `smoothstep` bands of 0.2 through levels 1 → 5 driven by `extrude`, exactly IG's ladder, then × plaster grain only where `extrude > 0` (so rest stays exactly 1.0) | **Same ladder** |
| A14 | Scroll | The relief plane moves at **0.31×** page scroll, eased with τ ≈ 340 ms (≈ 0.047 of the gap per 16 ms frame). The mask is shifted each frame by the same amount, so trails stay on the wall. The three panels pass in turn, so **the scene changes across scroll regions** (street → wall and window → roofscape → street …) | **Same** |
| A15 | Pointer parallax | The owner orders "layered parallax on cursor movement". IG has none, but its relief sits under a perspective camera. Austin: the higher levels shift up to **4 px** with the eased pointer (level × 0.8 px), so raised forms move a hair against the ground, as a sculpted panel does when the eye moves. Too small to read as a tilt | **Owner's addition, kept subtle** |
| A16 | Touch | Touch drives the mask the same way. With no hover there is no resting disc: it closes 350 ms after the finger lifts | IG keeps it open; **owner's close rule** |
| A17 | Reduced motion | The canvas is not started: the page stays white. IG ignores this; our standing rule wins | Austin's own rule |
| A18 | Performance | The loop stops when the mask is empty and the scroll is settled, and stops when the tab is hidden | Better than IG (which only pauses when hidden) |
| A19 | Retired | The pictogram workers, the lime-washed circle, the lime rim, the 260 px soft window and the five coloured scenes in `world.js` are all removed | Owner §3 |

### The Austin objects, panel by panel (one connected scene each)

| Panel | Scroll region (page depth) | Subjects, all joined into one relief | Why it is trade-true |
|---|---|---|---|
| **1. The street** | Hero, then on (repeats every 3 panels) | Three Austin houses shoulder to shoulder: a two-storey in lap siding, a board-and-batten ranch, a craftsman with a porch. Gable and hip roofs in shingle courses, windows with casings and muntins, gutters and downspouts. A ladder against the middle house, a scaffold plank, porch posts and steps. Joined by roof lines, fences and a pavement edge | Siding, windows and roofing on real house forms |
| **2. The wall** | Next | A big lap-sided wall in raking light: overlapping courses (7 in exposure), a new double-hung window being fitted with sill flashing, casing and a meeting rail. Corner boards, trim, nail heads in a row, a level resting on the sill, a caulk gun, a ladder rising past the window | The trade's own close-up: courses, flashing, trim |
| **3. The roof** | Next | A roofscape from above at an angle: shingle courses with offset tabs, a ridge cap, a valley, a chimney with step flashing, vent pipes with boots, a bundle of shingles, a roofing nailer, a gutter with hangers along the eave and a downspout dropping away | Roofing work, layer by layer |

Each panel is **1280 × 1600 px** (texture), sculpted as a 16-bit height field and baked with the same lighting. Measured against the viewport: houses about 300–500 px wide (IG's birds 300 px, flowers 150–250 px).

---

## 3. Bake recipe (offline, `siding/redo/site/bg/relief.py`)

1. **Height field** (float32), built from code-modelled forms. Each form has a true 3D profile: lap courses as ramps with an undercut lip; shingle tabs as stepped wedges; window recesses with bevelled casings; cylinders for gutters, downspouts and pipes; prisms for roof planes. Forms are composited with `max` so they join. A soft 1.2 px blur takes the sharpness of plaster casting.
2. **Lighting per level k = 1…5:** depth scale s = 0.2·k.
   - Normals from the scaled height gradient.
   - Lambert, with light from the top (45° elevation, 15° left).
   - Cast shadows by height-field ray march toward the light (64 steps), softened.
   - AO from multi-scale height differences (r = 4, 12, 32 px).
   - Shade = flat-normalised, so the flat ground is exactly 1.0 and every relief pixel ≤ 1.0. Clamped.
3. **Pack:** levels 1–3 → RGB of A; levels 4–5 + plaster grain (0.94–1.0, mean 0.975) → RGB of B. WebP q80 at 1280 × 1600, embedded once.
4. **Check:** flat pixels exactly 255 in all levels; R = G = B after decode in the shader.

## 4. What the gate will measure (GATE-BACKGROUND-FIX)

| Check | Target |
|---|---|
| At rest | Every background pixel exactly #FFFFFF (screenshot) |
| Reveal radius | 50% alpha at 0.165 × viewport height ±10% (≈ 148 px at 900); 0 beyond ≈ 0.19 × height |
| Feather | 90% → 10% within 30–45 px |
| Arrive | ≥ 70% by about 320–400 ms |
| Close-back | ≤ 10% by 800 ms and 0 by about 1.3 s after the pointer stops (owner's rule) and after it leaves |
| Largest area | Continuous circling opens ≤ 21% of the viewport |
| Colour | R = G = B in every background pixel |
| Scroll | Wall moves 0.31× page scroll; different panels at hero, +2 screens and +4 screens (screenshots at two deeper scroll positions) |
| Pointer parallax | ≤ 4 px on the highest level |
| Reduced motion | No canvas; white |
