# Austin redo, Stage 1: reverse-engineering dossier

**Owner's order (2026-11-03):** the previous build is rejected in full. This is Stage 1 of the redo: study the ten governing references at frame level and code level, then say what transfers to a siding company and what the Austin version is. There is no branding and no HTML in this stage.

All work was done in this session's own thread. There were no sub-agents and no background tasks.

### Completion applied (AUSTIN-REDO-COMPLETION.md, binding from Stage 1)

This revision applies the completion. Where the completion names a point, it wins over the brief.

**The reference set.** Annex v3 is the only allowed library, so:
- **Bruno Simon** (scoped to the 312-dot map) is studied in §12;
- **Dropbox Brand**, **Cowboy** and **Ever** are studied in §13–15;
- **Erie Home** is a wording note only (§16);
- **Rimowa is dropped.** It appears nowhere, and Quiet Cubes governs the visualiser alone.

**Game-like moments are limited to the job map and the pairs instrument.** The earlier offcut pile (click-to-scatter) and the drag-to-turn corner are removed (§2, §3, §5).

**Two references need a ruling.** Annex v3 lists **Igloo Inc as OUT** for Austin, and **Immersive Garden is not among its 13**, yet the redo brief names both as governing references.
- Both studies are kept, because the brief requires them.
- No Austin design in this dossier depends on Igloo.
- The background field follows the owner's background law, and its mechanism is marked "pending ruling" wherever it borrows from Immersive Garden (§1).

This is the one decision this dossier cannot make.

**What §17 adds:**
- the homepage plan: 11 sections, each with **two wholly different versions**, each from a named annex reference;
- the cursor-companion and SVG standards;
- copy budgets, fonts and single-HTML delivery.

---

## 0. How this was studied, and the limits

### Tools

All tools are in `siding/redo/tools/` and committed.

| Tool | What it records |
|---|---|
| `recon.js <slug> <url>` | Hooks `getContext` and `requestAnimationFrame` before the page's own code runs. Records:<br>• what renders, and rAF calls per second at rest;<br>• whether pixels change with no input;<br>• fixed `pointer-events:none` cursor followers;<br>• sticky elements and pin spacers;<br>• fonts, canvases and videos;<br>• every loaded script and the bytes declared;<br>• a 12–14 step wheel-scroll frame sequence (`frames/NN-scroll.jpg`, `sheet.jpg`). |
| `probe.js <slug> <url>` | Cursor lag: jumps the pointer 400 px, then samples every follower each animation frame (`closePerFrame`, `framesTo95`). Also a slow pointer pass with before / during / 500 ms / 2000 ms frames, and hover transitions plus running Web Animations (duration, easing). |
| `cast.js <slug> <url> pass\|wheel\|hoverlinks` | A CDP screencast: every rendered frame, timestamped, while a scripted pointer pass, wheel sequence or link hovers plays (`cast-*/NNNN-<ms>.jpg`, `marks.json`). |
| `ig_trigger.js`, `ig_field.js` | Immersive Garden: pointer alone versus wheel alone, and rest versus pointer pass. Their first reading was wrong (§0, limit 4). |
| `ig_rest.js` | Immersive Garden, decisive: no input for about 124 s, then a pointer pass, with near-path and far-from-path pixel change. |
| `pill.js` | Cash App colour page: the "Copy hex" pill's follow lag per frame, its click result, timing and clipboard content. |
| `qc.js` | Quiet Cubes: passes the "Select Your Pod" gate, maps every sticky chapter (sticky height against its scroll track), and records 22 wheel frames. |
| `sheet.py` | Contact sheets from frame folders. |

### Code reading

- Each site's own JavaScript bundles were saved to the session scratchpad. They are **not committed**: third-party code stays out of the repo, and only short excerpts are quoted here.
- Every constant below was read in that code. Where a value comes from frames rather than code, the text says so.

### Limits

1. **Software rendering.** The container renders WebGL with SwiftShader at roughly **3 fps**.
   - Wall-clock timing of WebGL scenes is therefore not trusted. **Durations and easings come from the sites' code constants.**
   - The frames prove sequence, composition and what reacts to what. Cursor-lag figures are per animation frame, and the ms values assume 60 Hz.
2. **Igloo Inc.** Its scroll did not advance under software GL: `scrollY` stayed at 0 and only the first scene rendered. Igloo's later chapters are described from code only, and the text marks this.
3. **Lusion.** Playwright screenshots time out on lusion.co, and its Cloudflare challenge host is refused by the proxy. Frames come from the screencast (`lusion/cast-wheel`) and the mechanism from its `hoisted.js` bundle.
4. **Two corrections made during the study, both on Immersive Garden.**
   - **First conclusion:** the pointer reveals the relief. It rested on a path metric that was really the cursor's own "Click to enable sound" label.
   - **Second conclusion:** scroll reveals and the pointer only tints. It came from `ig_trigger.js` (pointer only → flat; wheel → relief) and was **also wrong**. That pointer-only frame was taken while the page was still loading.
   - **What settled it:** `ig_rest.js`, a run with no input for 124 s, then a pointer pass (`evidence/immersive-garden/rest/`, `rest-sheet.jpg`).
     - The hero relief **appears on its own** once the loader ends.
     - It **recomposes on its own** at rest.
     - **A pointer pass raises relief along its path:** in the band around the path, mean pixel change was **8.32**, against **1.48** elsewhere. The raised relief then sinks back.

     §1 states this mechanism. The two earlier conclusions are left here so the record of how it was reached is complete.
5. **Quiet Cubes configurator.** Only its first step (Capacity) is recorded (`brand-v2/research/p3/qc-b-configurator.png`, cycle 9). Later steps were not walked in this stage.

### What each site weighs

Bytes declared during the recorded session, from `recon.json`:

| Site | Bytes | Notes |
|---|---|---|
| Scout | **404 MB** | 3 videos, 2 canvases |
| Graza | 110 MB | 10 videos |
| Immersive Garden | 36 MB | |
| Apple | 23 MB | 15 videos |
| Igloo | 14 MB | before its scroll even started |
| Lando | 6.8 MB | |
| MERSI | 3.5 MB | |

The owner's performance law ("no Igloo-weight load times") is measured against these numbers in §11.

---

## 1. Immersive Garden: the background system

**Site:** https://immersive-g.com/ (Nuxt).

> **Status under the completion:** named by the redo brief and its background law, but **not among annex v3's 13 allowed references**. It is studied here as the brief requires. Its use as a design reference is **pending Muse's ruling**.

**Evidence:**
- `evidence/immersive-garden/recon.json`, `probe.json`;
- `sheet.jpg` (14 wheel steps);
- `frames/trigger-sheet.jpg` (pointer-only versus wheel);
- `pass-sheet.jpg` and `wheel-sheet.jpg` (screencasts);
- `frames/diff-*.jpg` (pixel differences);
- **`rest/` and `rest-sheet.jpg`:** the decisive run (no input for 124 s, then a pointer pass at y = 600, from `tools/ig_rest.js`).

### Mechanism, at code level

- **One full-viewport WebGL canvas** (1440×900, `position:absolute`) draws the whole background. Two 360×360 canvases serve the cursor and sound. The page has **no native scroll**: `scrollY` stays 0 on every wheel step. A virtual scroll value drives the scene (`scroll:{speed:.25}`).
- **The "garden" is not geometry.**
  - It is one plane shaded from **baked textures**: `tBake1` and `tBake2`, pre-rendered relief bakes of sculpted flowers and branches, composited on `tPlaster`, a fine plaster grain.
  - The fragment shader extrudes the relief by a mask: `extrude:{textureStrength:1, gradientStrength:.17}`.
  - That mask is animated by a scroll-driven noise: `scrollExtrude:{noiseSize:7.77, speed:2, strength:1.02}` plus `getFastScrollNoise`.
  - The relief shader also samples **`tFlow`, the pointer flowmap** (below).
  - The relief therefore rises out of the flat plaster in three ways:
    1. **by itself** after the loader, then recomposing at rest;
    2. **as you scroll**, dissolving into noise when you scroll fast;
    3. **along the path the cursor draws.**
- **Show and hide.** The relief show tween is **1 s `sine.inOut`**; hide is **2 s**. Scroll-speed thresholds decide the mode: `fastTrigger:.99`, `slowTrigger:.75`.
- **Camera:** `fov:30`, `distance:15`, `fastModeZoom:.6`. The camera pulls in while scrolling fast, then settles.
- **Pointer: a flowmap that raises the relief where it passes.**
  - A ping-pong render target is painted with pointer velocity: `flowmap:{mouseEase:.4, dissipation:.953, falloff:.38}`.
  - Velocity is frame-rate-normalised: `Math.min(32,dt)/16 × normalised delta`.
  - The flowmap feeds the relief mask (`tFlow`) and `applyFluidEffect`, `fluidEffect:{amplitude:.57, …, hueShift:-.52}`, with `rgbVel = (fluid.r + fluid.g) * 0.02`. The cursor **pulls flowers up out of the plaster along its stroke**, with a faint chromatic edge, and the raised relief sinks back as the flowmap dissipates (`rest/r3-pass-0` → `r4-pass-400` → `r5-pass-3000`).
  - Dissipation .953 per frame halves the trail in about 14 frames (`ln .5 / ln .953`).
  - **In the software-rendered run** (about 3 fps), the raised band was still strong one frame later (5.11 against 1.82 elsewhere) and about half gone some 9 frames later (3.01 against 2.36). That matches a per-frame decay near .953.
  - At 60 Hz the same constant predicts a half-fade in about 0.25 s. The real-time feel could not be confirmed here and is flagged, not claimed.
- **Project media are WebGL planes,** not `<img>`.
  - Each carries scroll parallax: `parallaxPositionFactor:.6`, and models `modelScrollFactor:.45`.
  - The hover is in the vertex shader: `hoverScale = 1 - (1/uPlaneSize) * 0.03`. The image insets by a fixed ~3% of the plane on hover, with an edge stretch of 1.1, so the frame stays and the picture breathes inward.

### Frame by frame

From `trigger-sheet.jpg` and `sheet.jpg`:

1. **Load (A).** Flat warm-white plaster (`#e8e8e8`-ish). One line, "Innovative digital experiences studio", sits in the middle, with the logo at left and a loading counter ("100") at right. Nothing else.
2. **Pointer only (B), taken while the page was still loading.** The field stays flat; only the cursor's dot and label move (`diff-p-*.jpg`). As §0.4 explains, this frame does *not* show what the pointer does once the page is ready.

**The decisive run** (`rest-sheet.jpg`, no input until 124 s):
- At 9 s the counter reads "83" on flat plaster.
- At 64 s a ghost of flowers is **fading in at right**, unprompted.
- By 124–140 s a **different composition** (a hummingbird and a sweet pea across the top) stands in relief. Mean change between 64 s and 124 s was 35.1: the arrangement was replaced, not shifted.
- **Pointer pass at y = 600 (r3):** a long band of peonies and leaves **rises along the path, across the width**.
- **400 ms later (r4):** the band still stands.
- **3,000 ms later (r5):** its left half has sunk into the plaster, one rose remains at right, and the top composition has faded too.
3. **After 3 wheels (C).**
   - A project image slides in at the top edge.
   - "Our approach / A global leader in groundbreaking digital design…" fades up line by line in grey.
   - Behind it, **a plaster flower rises out of the wall at bottom-left**, lit from upper left, with soft ambient-occlusion shadow.
4. **After 6 wheels (E).** A tall relief branch occupies the left third, and a Louis Vuitton trunk image sits top right. The relief is deep: crisp highlights and deep crevices, entirely white-on-white.
5. **Steps 6–14 (`sheet.jpg`).**
   - Images alternate left and right, one per screen, each with a 5-line serif caption beside it.
   - Between them, clusters of white relief (birds, peonies, branches) fill the empty quadrants.
   - The relief changes for every project: a new bake region scrolls into the extrude mask.

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Relief | In over 1 s `sine.inOut`; out over 2 s (hide is twice as slow as show, so it lingers) |
| Flowmap trail | Eases toward the pointer by 0.4 per frame; fades by ×0.953 per frame. **Raises relief along the stroke**, which sinks back as the trail fades |
| Rest | Relief appears after the loader and recomposes by itself (interval not measurable at 3 fps) |
| Scroll | Virtual, ×0.25 |
| Fast scroll | Noise dissolve and camera zoom .6 |
| Images | Hover inset of ~3% in the shader; parallax .6 |

### Cursor

Three layers, measured in `probe.json`:

| Layer | Follow | Frames to 95% |
|---|---|---|
| `cursor__follow` (dot) | Instant: closes 100% per frame | 1 |
| `cursor__ease` (ring) | Closes **10.2% of the gap per frame** | 26 (about 430 ms at 60 Hz) |
| `cursor__text` ("Click to enable sound") | Rides with the eased layer, at a similar rate | |

The system cursor is replaced.

### Background at rest and on hover

- **At rest:**
  - rAF runs at 84.5/s.
  - `recon.js` saw no pixel change over 1.5 s at 9 s, but the page was still loading.
  - Once ready, **the relief recomposes by itself**: whole arrangements sink and others rise (64 s → 124 s in the decisive run), with only slow change within a 7 s window (mean 1.5).
  - **It does not drift: nothing translates.** Change is relief rising and sinking in place.
- **On hover:** relief **rises along the cursor's path** with a faint chromatic edge and sinks back as the flowmap fades. Images inset on hover.

### Section handover

- There are no sections. One continuous wall scrolls.
- Each "section" is one project plane plus its caption, arriving on parallax. The relief bake changes underneath: hidden over 2 s and shown over 1 s, so the hand-over happens *in the plaster*, not with a cut.

### Transfers to a siding company

- **A white material wall whose relief is lit, not drawn.** Baked normal / AO textures on a single plane are cheap: textures, no geometry.
- **The layered cursor:** an instant dot, an eased ring at about 0.10 per frame, and a label that rides the ring.
- **Three drivers of one reveal mask:** time (recompose at rest), scroll, and the cursor's stroke. Hide is slower than show.
- **The cursor raising material out of the wall,** so the field *answers* the hand.
- **Images as planes with an inward hover,** so the frame holds still.

### Does not transfer

- **Scroll hijack with no native scroll.** A local service site must keep native scroll, anchors, find-in-page and keyboard paging.
- **The near-empty first viewport.** The brief: "the site is NOT as plain as Immersive Garden".
- **36 MB and sound.**
- **Flowers.** The brief names Austin's shapes instead.
- **Change only in place.** The owner's law asks for elements "drifting at rest, parting and reacting around the cursor". Immersive Garden's relief rises and sinks in place, recomposes at rest and answers the cursor, but **its pieces neither drift nor part**: nothing translates. The Austin field keeps Immersive Garden's rise-and-sink answer to the cursor and **adds** drift and parting. This dossier says so rather than claiming Immersive Garden does it.

### The Austin version: the cut-stock field (pending ruling on Immersive Garden)

The owner's background law describes this field directly ("cut siding pieces, lap profiles, batten strips, corner posts, shingle shakes … drifting at rest, parting and reacting around the cursor"). Of the mechanics below:
- the rise-and-sink relief response and the flowmap are Immersive Garden's;
- the return law is Lusion's.

If Muse rules Immersive Garden out, the field keeps the law's own wording and Lusion's return law, and drops the flowmap relief response.

**The pieces.** A white plaster-grain ground (light-dominant steel family) carrying **instanced relief pieces**, each a pre-baked normal and AO sprite of a real Austin profile:
- a lap board end, a Dutch-lap profile and a beaded lap;
- a board-and-batten strip, a corner post stub and a shingle shake.

**Rendering.**
- One WebGL canvas, one draw call. About 70 instances at 1440 and 28 at 390.
- One shared atlas: two 1024² textures (normal + AO), WebP, about 250 KB total.
- One directional light from upper left, matching Immersive Garden's lighting so the pieces read as carved-in-plaster depth.

**At rest.** Every piece drifts on its own slow path, depth-scaled: near pieces about 6 px/s, far pieces about 2 px/s. That is visible as life, never as busyness.

**Around the cursor.**
- As in Immersive Garden, **the stroke raises the pieces' relief.** Their normal-map depth scales up along the path, so they stand out of the plaster, then sink back as the trail fades.
- An Immersive-Garden-style flowmap: a 128² ping-pong target, `mouseEase .4`, `dissipation .953`, `falloff .38`.
- It is sampled **per instance in the vertex shader**, so pieces are **pushed apart** along the stroke ("parting"), and tip a few degrees so their lit face turns.
- **The return home follows Lusion's law** (§3, an annex reference): each piece is pulled back to its rest position with damping `velocity *= 0.2^dt`. This is a background reaction, not a game: no clicks, no scoring, nothing to win.

**On scroll.** A slower-hide, faster-show mask (1 s show / 2 s hide) lets new clusters rise from the plaster at each chapter.

**The hero** is a full photograph (the brief allows it). The field begins under the hero's lower edge and continues behind the page.

**Kept native.** Scroll stays native. Reduced motion or no WebGL → a static poster of the same pieces, with no drift. The canvas pauses offscreen and when the tab is hidden. DPR is capped at 1.5. There is no loader.

---

## 2. Igloo Inc: interactive 3D depth and play

**Site:** https://www.igloo.inc/

> **Status under the completion:** annex v3 lists Igloo Inc as **OUT** for Austin ("its flow job here is already governed by Lusion"). It is studied here because the redo brief names it. **No Austin design uses it** unless Muse rules otherwise.

**Evidence:** `evidence/igloo/recon.json`, `sheet.jpg` (load and 12 frames). Code: `App3D-*.js` and `index-*.js` in the scratchpad.

**Limit:** under software GL the virtual scroll did not advance (`scrollY` 0 throughout). The frames show the first scene, re-rendering. Later chapters are from code.

### Mechanism, at code level

- **One Three.js scene and a virtual scroll.** The DOM is UI only: small mono labels and data boxes in the corners.
- **The splat buffer** is the play layer.
  - Pointer movement writes splats into a render target that decays: `nextVal *= 0.985`.
  - A **rim** term, `rim = nextVal - prev`, highlights only the *leading edge* of the trail.
  - Splat strength follows pointer speed: `splatTargetVelocity += t*4; splatTargetVelocity *= .97`. It **resets if the pointer has been idle more than 0.15 s**.
  - Decay of .985 per frame gives a **half-life of about 46 frames, roughly 0.77 s**: the scene *remembers* where the cursor went for under a second.
- **Raycast interaction** on meshes. The igloo blocks and later the cubes are hit-tested, and hover lights the block edges. Frames 05–11 show alternate states: edges glowing white, then not.
- **UI panels "boot".**
  - A box's `uShow` goes 0 → 1 over **0.3 s, `ease:none`**.
  - The shader multiplies it by a flicker: `sin(uShow*30.0 + uRand*12.4)*0.15 + 0.85`. Each panel stutters on like a CRT, and each one stutters differently (`uRand`).
- **Other UI timings:** logo show 0.25 s; arrows 0.2 s.
- **Scroll windows** (progress 0–1):
  - the manifesto is active while `e > .25 && e < .8`, with lines entering at 0.4 s and leaving at 0.75 s, `sine.out`;
  - the carousel is enabled at `.64–.9`;
  - the floor arrives with `additionalTime` 3 s `power4.out`;
  - `finalScrollAutocenter = .495` recentres the final scroll.

### Frame by frame

1. **Load.** A wireframe igloo of glowing lines in a starfield of nodes, with a white-hot dome cap. This is the loader.
2. **First scene (01).** A photoreal igloo of carved snow blocks on a mountain ridge in mist. One side is cut away into **translucent ice-glass blocks**. Small HUD text is fixed in the corners.
3. **Scenes 03–11.**
   - A **rainbow chromatic band** sweeps across the fog layer. This is the post-processing that reads the splat and scroll velocity.
   - On alternate frames the block joints glow white.
   - Mist density changes, so the depth reads in layers: ridge, mist, igloo, glass.

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Splat memory | ×0.985 per frame |
| Speed gain | ×4, then ×0.97 per frame |
| Idle reset | 0.15 s |
| Panels | 0.3 s linear plus flicker |
| Copy lines | 0.4 / 0.75 s `sine.out` |
| Floor | 3 s `power4.out` |

### Cursor

- The system cursor is kept.
- The cursor's effect lives **in the scene**: the splat trail with a lit rim, and raycast hover on blocks.

### Background at rest and on hover

- **At rest:** the scene keeps rendering (mist drift, light). Measured rAF was 2/s, which is the software renderer failing to keep up, not a design choice.
- **On hover:** a fading, rim-lit trail in the snow and mist, and lit block edges under the cursor.

### Section handover

Scroll windows inside one scene. Copy and panels boot in and out by window (`.25–.8`, `.64–.9`), and the camera moves through the same world. There is no page cut.

### Transfers

- **Memory:** a trail that decays over about 0.8 s, with only its leading edge lit.
- **Raycast hover on real objects** made of blocks. Siding is made of courses and pieces, so this matches.
- **Labels that boot onto objects:** 0.3 s with a per-label stutter.
- **Copy entering by scroll window,** not on a timer.

### Does not transfer

- **The weight:** 14 MB before scroll, plus a loader screen. The owner: "no Igloo-weight load times".
- **A full-page 3D world with no DOM content.**
- **The dark, crypto-tech register.**

### The Austin version: none, by annex v3

- **Nothing from Igloo is used.** The drag-to-turn corner proposed in the first revision is withdrawn: Igloo is OUT, and the completion allows game-like play only on the job map and the pairs instrument.
- The "memory" job in the background field now uses Lusion's return law (§1, §3).
- If Muse restores Igloo, the candidate transfer is its 0.3 s flicker-boot label (`uShow` × `sin(uShow*30+uRand*12.4)*0.15+0.85`) on wall-layer names. That would be an inspect affordance, not play.

---

## 3. Lusion: flow

**Site:** https://lusion.co/

**Evidence:** `evidence/lusion/frames/00-load.jpg`, `cast-wheel/` (screencast), `wheel-sheet.jpg`. Code: `hoisted.js` (1.25 MB) in the scratchpad.

### Mechanism, at code level

**The hero physics pile** (`HomeBalloonsPhysics`):
- The shapes (pipes, crosses, cylinders in white, black and blue) are **pulled toward a centre**. Their count comes from `SPHERES_DATA.length`, which was not read. The forces:
  - `gravity = -position * GRAVITY_FACTOR / (mass * (1 + frictionTot))`, with `GRAVITY_FACTOR = 40`;
  - a swirl about the axis (1,1,1) normalised, whose direction alternates by body index (`a%2*2-1`);
  - sphere collisions with per-body restitution and friction;
  - damping `velocity *= Math.pow(.2, dt)`: a body keeps 20% of its velocity after one second.
- **The cursor** is a sphere of influence: `MOUSE_RADIUS = .025`, `MOUSE_INFLUENCE = .1`, `MOUSE_PUSH_FORCE = .12`. Bodies near it are shoved and roll away, and gravity pulls them back.
- **Click:** `applyImpulse` gives each body a random impulse ×80 and negates its velocity, so the pile bursts. `changeHomeHeroColorSignal` also fires, swapping the pile's colour scheme (`_blackWhiteToggle`).

**Every image and video is a WebGL mesh synced to a DOM element** (`UfxMesh({refDom})`):
- the shader draws rounded corners from the CSS variable `--global-border-radius` (`getRoundedCornerMask`);
- it parallaxes inside its frame (`u_parallax`, `u_parallaxRatio`);
- it fades in from a highlight colour (`mix(u_highlightColor, color, u_readyRatio)`);
- one canvas renders the whole page's media.

**Flow is a remapping of scroll** (`AboutWhoSection`):
- The section's scroll is cut into ranges measured in viewports: `RANGE_START_WAIT = 3.5`, `RANGE_PAGE_12 = 1.75`, `RANGE_PAGE_23 = 1.75`, `RANGE_PAGE_34 = 1.75`, `RANGE_END_WAIT = 2.5`.
- Each range is mapped `math.fit(t, e[i], e[i+1], i, i+1, ease.cubicInOut)`, and pages sit `PAGE_DISTANCE = 1.25` apart.
- **Constant scrolling therefore produces: hold, ease-in-out move, hold.** The content *glides between resting states* instead of sliding at scroll speed.
- The hero container's `translate3d` X is driven by that ratio, so the hero hands over sideways.

### Frame by frame

From `wheel-sheet.jpg`:

| Time | What the frame shows |
|---|---|
| 0–5.8 s | The hero is a **dark, rounded panel inset with white margins**, filled with the glossy pile. Small "LUSION" wordmark at top left. |
| 10.4 s | After the first wheels, the **panel grows**: margins shrink toward full bleed and the corner radius holds. The pile rolls under its own physics. |
| 12.3 s | The panel nearly fills the viewport. Header pills ("LET'S TALK", "MENU") appear. |
| 15.4–20.5 s | The page scrolls the panel up. A crosshair rule with "SCROLL TO EXPLORE" sits under it, then white space. |
| 21.6 s | "**Bold** …" enters as a heading whose letters rise from a mask, one word at a time. |

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Physics damping | 0.2 per second |
| Gravity | 40 |
| Push | .12 within radius .025 |
| Burst | ×80 |
| Scroll remap | Waits of 3.5 / 2.5 viewports; page moves of 1.75 viewports each, `cubicInOut` |

### Cursor

- The system cursor is kept.
- The cursor acts *in the pile* as a pushing sphere. A click bursts the pile and switches its colour.

### Background at rest and on hover

- **At rest:** the pile keeps settling and swirling (gravity plus swirl), so it is never frozen.
- **On hover:** bodies part around the cursor and roll back.

### Section handover

- The hero panel **grows**, then is carried out.
- Later sections use **dwell-and-glide** remapping: hold, ease, hold.
- Media fade from a highlight colour as they become ready.

### Transfers

- **A pile of real objects that always regathers.** It is the most direct model for "pieces parting around the cursor".
- **The click as a meaningful toggle,** rather than decoration.
- **Dwell-and-glide scroll:** readable resting states, eased moves between them.
- **One canvas drawing all media,** with a CSS radius token as the single source of truth.

### Does not transfer

- **Any scroll hijack.** Whether lusion.co keeps native scroll was not measured: screenshots time out there, and the screencast shows appearance only. Austin keeps native scroll and applies the dwell-and-glide remap to native scroll progress only.
- **A showreel pile with no meaning.** Austin's pile must be its own stock.
- **Glossy plastic colours.**

### The Austin version: the carrying thread (dwell-and-glide) and the field's return law

**Dwell-and-glide is the site's flow** (annex: "Lusion — the carrying thread that makes the sections one journey").
- The wall-assembly chapter (§5) and the pairs section (§6) map native scroll with `cubicInOut` between holds: 1.75 viewports per move, waits of 1 viewport at the start and 0.75 at the end.
- Between all other sections, the next section's first element is already moving before the previous one releases. This is Lusion's hand-over, so no section starts from a dead stop.

**The return law** (gravity toward rest, `velocity *= 0.2^dt`) governs how background pieces settle after the cursor parts them (§1). It is ambient reaction only.

**Withdrawn:** the offcut pile with click-to-scatter from the first revision. It was a game, and the completion limits game-like play to the job map and the pairs instrument.

**One-canvas media:** Lusion's DOM-synced WebGL images are **not** adopted. Austin's images stay `<img>` with real `alt`, `width` and `height` (S0049), and the one canvas is the background field.

---

## 4. Scout Motors: the product world

**Site:** https://www.scoutmotors.com/

**Evidence:** `evidence/scout/recon.json`, `probe.json`, `sheet.jpg` (14 frames). Code: `Sequence.js`, `SequenceKey.js`, `Viewfinder.js`, `HomeTreadmill.js`, `HomeCamp.js`, `SplitLines.js` in the scratchpad.

### Mechanism, at code level

**`Sequence`, a custom element that scrubs an image sequence on a canvas.**
- It draws each frame with `drawImage` at **cover** fit. Two 1440×900 canvases are on the home page.
- **Loading order is binary-split** (`_splitArray`): first frame, last frame, then middle, then quarters, and so on. Wherever the visitor lands, a near-enough frame exists early, and the sequence sharpens as loading continues.
- `canPlayThreshold` decides when scrubbing is allowed.

**`SequenceKey`:** from/to windows map a stretch of scroll progress to a stretch of frames. Several keys share one sequence, so one film can pause on a frame while copy changes.

**`Viewfinder`, a headline reveal scrubbed by scroll:**
`tl.from(words, {y:'100%', ease:'power4.out', stagger:.2})`
- Its timeline progress is set from scroll, not played.
- The power4.out shape is applied *per word inside a scrub*, so each word snaps up, then settles while scroll continues.

**`HomeTreadmill`:** photos travel along an arc. A CSS `--progress` variable is driven by a `sine.inOut` timeline, and CSS positions every card from it.

**Buttons:** `.2s cubic-bezier(0.38, 0.005, 0.215, 1)`, a sharp ease-out.

### Frame by frame

From `sheet.jpg`:

| Frames | What they show |
|---|---|
| 00–01 | Full-bleed film: a close side panel of the orange vehicle, then two vehicles on a dusk ridge road. "Scouts always come back." sits in large white type at the lower left. |
| 02 | The scene continues as the camera follows the vehicles down the road. The headline has moved to the top, centred and smaller. |
| 03–04 | "An off-road icon reborn." enters word by word at upper left (Viewfinder). The vehicle drives toward the camera; the sequence is scrubbed by scroll. |
| 05–07 | A **vintage Scout** front-on, in colour. It **desaturates to black and white** as "The one that started it all." enters. The past is told by losing colour. |
| 08–10 | "American From Day One": huge type with **period photographs fanning along an arc** (Treadmill) over a pale paper ground. |
| 11 | A full-bleed archival colour photo: a family with an old Scout at a lake. |
| 12 | A dog with a stick, full-bleed. The product world includes life around the product. |
| 13 | The new vehicle alone in a wheat field under blue sky. |

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Sequences | Frame index from scroll |
| Words | `power4.out`, stagger 0.2, scrubbed |
| Treadmill | `sine.inOut` |
| Buttons | 0.2 s with the custom ease-out above |
| rAF at rest | 120/s (videos and canvases keep playing) |

### Cursor

- No custom cursor and no cursor followers.
- Interaction is scroll only: the product world is *watched*, not played.

### Background at rest and on hover

The background *is* the film or sequence. At rest the video plays. Hover does nothing to it.

### Section handover

- **Sequence to sequence through colour and grade:** dusk colour → vintage colour → black and white → archival paper → present-day daylight.
- Each chapter ends on a held frame while its copy enters.

### Transfers

- **The product as the protagonist in its real landscape.** For Austin, the product is a finished house in an Austin street.
- **Heritage told by grade.** Desaturation marks the past, which suits "Since 2009, merged 2018".
- **Binary-split frame loading** for any scrubbed sequence.
- **Scrubbed word reveal** (`power4.out`, stagger 0.2).
- **The arc of real photographs** for history.

### Does not transfer

- **404 MB of film.** The firm has photographs, not cinematography.
- **The car-brand register.**
- **A product world with no play.** Scout is watched; the owner wants play.

### The Austin version: the house as the product

**Hero.** A full photograph of a finished Austin house from the firm's own record.

**The build sequence.**
- The second chapter is a **scrubbed sequence of one elevation**, from bare sheathing to finished lap siding and trim: 48 rendered frames, WebP at 1440, about 1.2 MB total. It loads in **binary-split order**, and a poster is shown until `canPlayThreshold`.
- Copy changes on `SequenceKey`-style windows.

**History.**
- "Since 2009 · merged 2018" is told with **real job photographs on an arc**: `--progress`, `sine.inOut`.
- Older years are graded toward grey, and the present is in full colour.
- Captions carry only what the record carries (Muse ruling: months only where recorded).

---

## 5. Apple AirPods Pro: pinned scroll chapters

**Site:** https://www.apple.com/airpods-pro/ (AirPods Pro 3 at capture).

**Evidence:** `evidence/apple/recon.json`, `sheet.jpg` (16 frames). Code: `main.js` in the scratchpad.

### Mechanism, at code level

**Chapters are named groups:** Welcome, Highlights, Product Viewer, Product Stories, Noise Control, Audio Performance, and so on. Each is a **sticky element of one viewport (900) inside a parent of 2250**, a 2.5-viewport track. **12 sticky elements** are on the page.

**AnimSystem keyframes are written relative to the element's top (`t`), bottom (`b`) and viewport height (`vh`):**
- `t - 200vh → b + 100vh` (×5): a long, slow drift across the whole approach and exit;
- `a0t - 100vh → a0b`: starts one viewport early, keyed to another element;
- `t + 60h - 100vh → b - 50vh`: starts when 60% of the element is in view, ends half a viewport before its end.

**Easings in the keyframes:** `easeInOutQuad` ×8, `easeInQuad` ×4.

**VideoScrub:**
`set progress(e){ this.videoEl.currentTime = this.floorDecimal(this.duration * e) }`
- A video is a scrub-only film: its `play` events are re-paused.
- Files are served per breakpoint and at 2×. Safari gets `.mov` with alpha; others get `.webm`.

**rAF at rest is 0.** Nothing animates without scroll; motion is spent only when the visitor moves.

### Frame by frame

From `sheet.jpg`:

| Frames | What they show |
|---|---|
| 00–01 | The product on light grey (`#f5f5f7`), one bud then the pair rotating in. "The world's best in-ear Active Noise Cancellation." and a price pill. |
| 02–03 | "Get the highlights." A wide gallery card of a dancer silhouette inside **iridescent rings**, with a dot pager and pause button. |
| 04–05 | "Take a closer look." The **product viewer**: pills down the left (Sound quality, Fit and feel, Heart rate sensing, Dust/sweat/water, Force sensor, Charging case). The pills select a feature and the product view changes with them. They were not clicked in this run, so the exact transition is not claimed. |
| 06–07 | "Intelligent noise control / The best thing you've never heard." **Rainbow rings scrub** around the headline (VideoScrub). The rings expand as you scroll. |
| 08 | Proof: "2x more" and "4x more", with sources in the footnote marks. |
| 09–10 | A feature-card carousel. |
| 11–14 | "The sound of science." The bud **turns and sections itself**: a side view, then a cut to the driver and amplifier with callouts. This is an exploded chapter on scroll. |
| 15 | "For your ears only." A portrait with rings. |

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Chapters | Sticky 1 vh in a 2.5 vh track |
| Keyframes | `easeInOutQuad` / `easeInQuad` over scroll ranges, not durations |
| Video | `currentTime = duration × progress`, floored |
| Product viewer | Changes by click on its pills |

### Cursor

- System cursor only.
- Hover is the standard link and pill states.

### Background at rest and on hover

A flat light grey or white field. Nothing moves at rest (rAF 0). The product carries all motion.

### Section handover

Each sticky chapter **holds the viewport** while its scrub plays, then releases into normal flow. Long keyframes (`t-200vh → b+100vh`) mean the next chapter's elements are already moving before it pins: an overlap, never a hard cut.

### Transfers

- **The pinned chapter,** 1 vh sticky in a 2.5 vh track.
- **Scrub by `currentTime`** for a rendered film.
- **The exploded chapter:** the product sections itself into its internals. For Austin, the product is a wall.
- **Named pills** that select a part of the product.
- **Nothing animating at rest outside the chapter in view.**

### Does not transfer

- **15 videos at 23 MB.**
- **Apple's photography budget.**
- **The flat-grey void.** Austin's ground is the living field (§1).

### The Austin version: the wall-assembly chapter

- **Sticky 100vh in a 250vh track.** Scrolling explodes one wall section outward into its layers, from back to front: stud frame, sheathing, house wrap, trim, lap siding courses, finish.
- **Built as rendered frames** (a sequence, per §4: 48 WebP frames, about 1.2 MB, binary-split loading) or as layered SVG drawings. Stage 3's images decide which. The drag-to-turn object is **withdrawn** (Igloo is OUT, and game-like play is limited by the completion).
- **Keyframes** are `easeInOutQuad` across ranges, with Lusion's dwell-and-glide between layers (§3).
- **Pills name each layer.** Clicking one seeks the scrub to that layer. This is inspection, not play.
- **Layer names and any claim about them** come only from the firm's own published pages. Nothing is invented about methods or materials. Where the firm publishes no wording, the chapter names the layer and says nothing more (Muse ruling: the firm's published wording first).

---

## 6. MERSI Architecture: the seam

**Site:** https://www.mersi-architecture.com/ (Webflow + GSAP).

**Evidence:** `evidence/mersi/recon.json`, `sheet.jpg` (12 frames). Code: `main.js` in the scratchpad.

### Mechanism, at code level

**The project slider is two stacks of full-height images.**
- `$i` is the top-anchored stack and `Wi` the bottom-anchored stack. Each stack is a column, and they meet at a vertical **seam**.
- Together they make one composite view from two photographs side by side.

**Wheel capture.** While the slider is active (`Ff()`), a capture-phase, non-passive listener takes the wheel:
`document.addEventListener("wheel", Qs, {passive:false, capture:true})`
- The page does not scroll. Instead `Je += deltaY * Yg`, with `Yg = .3`, clamped to `[0, Bn]`.
- **At either end it lets go:** at `Je <= 0` going up, or `Je >= Bn` going down, the event passes to the page. The slider never traps.
- Touch does the same with `touchmove` deltas × 0.3. Below 991 px (`Jy = 991`) mobile layout applies.

**Progress to clip (`Xl` → `Ug`):**
- `e = floor(Je / vh)` is the current project, `i = (Je % vh) / vh` the fraction.
- In the **top stack**, the incoming image gets `clip-path: inset(${(1-i)*100}% 0% 0% 0%)`, so it **rises from the bottom edge**.
- In the **bottom stack**, it gets `inset(0% 0% ${(1-i)*100}% 0%)`, so it **descends from the top edge**.
- Outgoing images sit at full inset; `zIndex` is ordered so the incoming one is always on top.
- **The two halves of the next project slide in opposite directions and cross at the seam.**

**The label plate** (`c1`): the centred project label (name, place, type, year, embossed monogram) is a third clipped layer keyed by `slider-name`. It wipes **in step** with the images, so the caption is never out of sync with the picture.

**Snap (`l1`), 150 ms after the last wheel or touch event (`Ky = 150`):**
- If the fraction is ≥ 0.5, the slider goes to the next project; otherwise it returns. Fractions under 0.005 or over 0.995 are left alone.
- The snap tween is `{duration: .6 (Zy), ease: "power2.out"}`.
- While snapping (`Wo`), wheel input is swallowed, so a second flick cannot fight the tween.

**Opening a project:** the halves clip away over **1 s, `power3.inOut`**, revealing the project page's colour.

**About:** a pinned scrub opens an image from `inset(8%)` to full bleed. Copy lines enter in progress windows 0.45 / 0.5 / 0.65–0.85 / 0.8–1.

### Frame by frame

From `sheet.jpg`:

| Frames | What they show |
|---|---|
| 00–02 | Two photographs meet at a seam just left of centre: a curved plaster stair (left) and a living room (right). A **terracotta label plate** sits across the seam ("Hamelin · Paris 16 · Résidentiel · 2024", monogram embossed). The pointer pass changes nothing. |
| 03 | After a wheel step, the next project ("Naya") has replaced both halves. Left: a terracotta sofa. Right: a mirror and hallway. The plate is now terracotta-red with the new name. |
| 04–11 | The slider holds on Naya. |

**A discrepancy, recorded rather than smoothed over.** Each recorded step is 650 deltaY × 0.3 = 195 px, which is 22% of a 900 px viewport. By the code, a single step snaps back, so an advance needs about three steps within 150 ms of each other. The run advanced once and then held. Under software rendering the 150 ms debounce and the 0.6 s tween stretch, so the exact step at which it advanced cannot be read from these frames. The mechanism above is from code, and the frames confirm only its appearance: opposite wipes, synced plate, hold.

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Wheel | Factor 0.3 (heavy and deliberate: about 3,000 px of wheel per project at 900 vh) |
| Snap | 150 ms debounce; threshold 0.5; 0.6 s `power2.out`; input locked while snapping |
| Open | 1 s `power3.inOut` |

### Cursor

- System cursor only, and the pointer has no effect on the slider.
- The seam is driven entirely by **wheel and touch**: a direct-manipulation scrub.

### Background at rest and on hover

The photographs are the background. Static at rest (`pixelsChangeAtRest:false`), with no hover effect.

### Section handover

- Project to project **inside** the captured slider, via the seam wipe.
- **Slider to page** when the clamp ends release the wheel.
- **Page to project page** via the 1 s split-clip in the project's colour.

### Transfers

The seam is the strongest model in this set for Austin's **177 before-and-after pairs**:
- a scrub the visitor controls with their own wheel or finger;
- two halves moving in opposite directions, so the change reads as a *transformation*, not a slideshow;
- a caption plate that wipes in sync;
- a snap that settles on whole states;
- clamp ends that release the page.

### Does not transfer

- **Two different photographs per project.** Austin's two halves must be the **same house, before and after**, aligned.
- **Wheel factor 0.3 for 177 items.** That is far too slow to travel. It needs an index (§7).

### The Austin version: the pairs instrument (the centrepiece rests entirely on this seam)

Per the completion and annex v3, **Ever is never used for the pairs** (§15). This instrument is MERSI's seam alone.

**The seam wipe.** One pair fills the instrument: the "before" photo and the "after" photo of the same elevation, aligned.
- The seam is **vertical and draggable** (pointer, touch or arrow keys). Dragging is the play: you wipe the house from old to new.
- **Release uses a spring,** not a fixed tween: `stiffness 500, damping 30` (S0089, "gesture-driven motion must use springs"), with MERSI's threshold (≥ 0.5 → finish, else return).
- **Wheel over the instrument** runs MERSI's capture: factor 0.3, clamp-release at both ends, and its snap 150 ms after the last input (0.6 s `power2.out`, MERSI's own value).
- The after-image **rises from the bottom on the left half and descends from the top on the right half**, so the halves cross at the seam.

**The plate.** A steel label plate wipes in sync and carries only recorded data:
- place from the firm's own project record;
- month only where recorded;
- trade;
- the firm's published price band.

Where a record and a project URL disagree, the record wins and the item is flagged. For example, `windows3`: the record says "Maple Run", the URL slug says "alexandria". The plate shows "Maple Run", flagged.

**Travelling the 177.** A thumbnail rail (§7 index behaviour) jumps between pairs with MERSI's 1 s `power3.inOut` split-clip.

**Keyboard and touch.** Arrow keys move the seam in 5% steps, and Home/End jump to before/after. On touch, a horizontal drag moves the seam and vertical scrolling stays the page's.

---

## 7. Lando Norris: archive index behaviour

**Sites:** https://landonorris.com/ and https://landonorris.com/off-track (Webflow + Lenis + GSAP/ScrollTrigger + Rive + p5).

**Evidence:**
- `evidence/lando/recon.json`, `sheet.jpg` (14 frames);
- `evidence/lando-offtrack/sheet.jpg`, `cast-hoverlinks/`, `hover-sheet.jpg`.

Code: `main.js` (1.3 MB) in the scratchpad.

### Mechanism, at code level

**Hero head, a WebGL portrait with two textures and a cursor fluid.**
- Uniforms: `tHelmet`, `tCursorEffect` (a fluid-cursor render target) and `uHelmetHover`.
- Each pixel mixes the default diffuse with the helmet diffuse by `min(cursorEffect + step(1.0 - hoverTransition, uHelmetHover), 1.0)`. **Where the cursor has passed, the helmet livery shows through the face** as soft blobs.
- Hovering the CTA runs `uHelmetHover` 0 → 1 over **1.5 s `expo.inOut`**, back over **1 s `expo.inOut`**. The wipe edge is curved: `hoverTransition = cameraUv.y + sin(cameraUv.x·π)·sin(uHelmetHover·π)·0.2`, so it bows upward mid-sweep.
- Pointer parallax on the head: `movement:{intensity:0.075, ease:0.025}`. The head turns up to 7.5% toward the pointer, closing 2.5% of the gap per frame: a slow, heavy follow.

**The horizontal archive (`I_`).**
- Each `[data-horizontal-section]` is given the height `track width − viewport width`. Its sticky child pins while
  `gsap.to(track, {x: () => -(trackWidth - innerWidth), ease:'none', scrollTrigger:{start:'top bottom', end:'bottom bottom', scrub:1}})`
  moves the track sideways. `scrub:1` means the track catches up to scroll over **1 s**: a smoothed lag, not a lock.
- **Each image parallaxes inside its own frame** via `containerAnimation`: x goes from 0 to **4 rem** across the item's pass (`start:'left right'`, `end:'right left'`). On entry it is pre-offset to `-4*(1 - left/innerWidth)` rem.

**Index captions (`C_`).** Each caption line starts clipped (`inset(0 100% 0 0)`) under a **lime block** (`#d2ff00`):
- the line unclips over **0.6 s `power2.out`**;
- the block, anchored right, scales X 1 → 0 over **0.6 s `power2.inOut`**, starting halfway (0.3 s);
- lines are **staggered 0.15 s**;
- it fires once, when the item reaches `left 95%` of the horizontal track.

**The helmet hall of fame (`ZZ`).** A 4-column grid in which column *k* starts **k × 5 rem lower** and scrubs to 0 (`ease:'none'`) across the grid's pass. The columns *converge* as you scroll. The selected helmet carries a lime outline.

**The signature** is a Rive/p5 stroke drawn in lime on the dark green chapter.

### Frame by frame

From `lando/sheet.jpg` and `lando-offtrack/sheet.jpg`:

| Frames | What they show |
|---|---|
| Home 00–01 | Portrait on off-white with a topographic line ground. **White fluid blobs on the head** where the pointer passed: the helmet layer showing through. |
| Home 02–04 | Dark olive chapter. A lime signature draws itself, then "REDEFINING LIMITS, FIGHTING FOR WINS…" in condensed caps with lime serif words, scaling to fill the viewport. |
| Home 05–09 | **The archive.** Small photos scattered on a topo background, each with a tiny mono caption ("MIAMI 2024"). The track moves sideways; photos at different depths drift at different rates. The ground fades from olive to stone to off-white as it travels. |
| Home 10–11 | "ON TRACK / OFF TRACK", a split index. Two hover targets, each with a cropped portrait. |
| Home 12–13 | "HELMETS HALL OF FAME". A dark grid of helmet cards in staggered columns, one outlined in lime with its label. |
| Off-track 00–01 | Giant "OFFTRACK" title over a photo, with a **brand marquee** running along the bottom. |
| Off-track 02–03 | "CHALLENGE THE LIMITS…" in stacked type with a cut-in photo. |
| Off-track 04–11 | **The personal-projects archive, horizontal.** Category headings in serif caps (PERSONAL PROJECTS → PADEL TENNIS → PHOTOGRAPHY & FILM → LEGO: ART OF THE BRICK), each followed by 2–4 photos at varied sizes and heights, each with place-and-year captions and a short note. The track pans; the next heading arrives at the right edge before the last photo leaves. |

The `cast-hoverlinks` run (`hover-sheet.jpg`, 123 frames) shows the marquee moving steadily while the four hovered links changed only their own colour states. Nothing else on the page reacts to a link hover.

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Head follow | 2.5% per frame |
| Helmet reveal | 1.5 s / 1 s `expo.inOut` |
| Horizontal | `scrub:1`, `ease:'none'` |
| Image drift | 4 rem per item |
| Caption | 0.6 / 0.6 / 0.15 |
| Helmet columns | 5 rem per column, scrubbed |

### Cursor

- The system cursor is kept.
- **The cursor paints in the hero**: a fluid that reveals the second texture.

### Background at rest and on hover

- A topographic line field on off-white, olive or stone.
- **At rest** the hero keeps a slow loop (rAF 11.5/s on home, 49.5/s on off-track).
- **On hover** only the hero head reacts.

### Section handover

- **Ground colour travels with the track,** olive → stone → off-white, so sections hand over by tone across a horizontal pan.
- Headings arrive at the right edge before the previous group leaves.

### Transfers

The **archive as a horizontal index:**
- category headings as chapters;
- items at varied size and height, each with a dated, placed caption;
- a smoothed `scrub:1` pan;
- per-image 4 rem drift for depth;
- lime-block caption reveals, which become a steel block for Austin;
- a staggered-column grid that converges as an index of many similar objects.

### Does not transfer

- **The celebrity portrait and fluid-on-face.**
- **The lime accent.** Austin's colour family is steel.
- **A horizontal pan on phones.** At 390 the archive must become a vertical list.

### The Austin version: the job archive index

**The archive.** "312 on the map with photos + 574 more counted" (exact wording) heads a **horizontal archive by trade**: siding, windows, painting, roofing… from the finder dataset's tallies (Siding 429, Windows 386, …).
- The track pans with `scrub:1`.
- Each job photo has the 4 rem in-frame drift, and its caption carries place and, only where recorded, month.
- Captions unclip under a **steel block**: 0.6 s line unclip, 0.6 s block wipe, with the stagger cut from Lando's 0.15 s to **0.06 s** (S0063: 30–80 ms).

**The pairs index.** The 177 pairs (§6) appear as a **converging 4-column grid** (5 rem per column, scrubbed). The selected pair is outlined in steel, and clicking one opens it in the seam instrument.

**At 390,** both become vertical lists with the same caption reveal.

**The explorable map** (brief: "the explorable job map") uses this same archive as its list view. The map's 312 points come from the verified finder dataset.

---

## 8. Graza: the animation quality bar

**Site:** https://www.graza.co/ (Shopify).

**Evidence:** `evidence/graza/recon.json`, `probe.json` (hover transitions and running animations), `sheet.jpg` (14 frames).

### Mechanism, at code level

**CSS animations, censused from `document.getAnimations()` while hovering:**

| Animation | Duration and easing | Count |
|---|---|---|
| `marquee` | **20 s linear** | ×10 |
| `spin` | **3 s linear** (rotating badges) | ×12 |
| `drip` | **2 s** | |
| `blink` | **2 s** (the drawn olives' eyes) | |

**Transitions:**
- Swiper slide opacity: **500 ms**.
- Link and button colour: **250 ms `ease-in-out`** (`background-color, border-color, color, fill, stroke`).
- Transforms: **400 ms `ease-in-out`**.

**Illustration motion** runs on **Lottie** (player 2.0.12): drawn characters and olives move in short loops.

No canvas, no smooth-scroll global (of those `recon.js` checks) and no custom cursor were detected. rAF at rest is 64.5/s (Lottie and the marquees).

### Frame by frame

From `sheet.jpg`:

| Frames | What they show |
|---|---|
| 00–01 | Full-bleed video (oil poured over salad, a hand holding the squeeze bottle). Headline in condensed serif: "Extra Virgin Olive Oil makes everything better." |
| 02 | A thin mono info strip ("Now serving olives from: Alentejo, Portugal \| Harvesting season…") above a lime band: "Get The Trio" with product photos. |
| 03 | A yellow band with a photographed basket. Below, hand-drawn olives with faces. |
| 04–05 | "Olive oil so fresh, you can taste it." in huge serif, staggered across the width. **Line illustrations** (a branch, an olive picker) are scattered with typewriter captions. |
| 06–07 | The **GRAZA** wordmark at full width, cropped by the viewport. "Olive oil the way it should be." Product cards with typewriter labels and prices. |
| 08 | Three product cards with "Drizzle / Sizzle / Frizzle" in serif under each photograph, and a wide lime "Shop All →" button. |
| 09 | "FUN FACT" with an illustrated olive character on a branch. |
| 10 | A lime band: "SO MANY WAYS TO GRAZA" as a marquee row. Verbs (Sear, Grill, Bake, Fry, Roast, Garnish, Knead) are set at varied angles in serif beside a recipe photo. |
| 11 | Olive-grove video: "Made by people who take olives very seriously." |
| 12–13 | A UGC photo row, then the footer with the full-width wordmark. |

### Interaction, timing, easing

- **One tempo per kind of motion, used everywhere:**
  - ambient loops slow and linear (20 s marquees, 3 s spins);
  - character loops 2 s;
  - state changes 250 ms;
  - movement 400 ms, both `ease-in-out`.
- **Nothing is bespoke-eased per element.** The quality comes from consistency and from motion that belongs to the drawn characters.

### Cursor

- System cursor.
- Hover is colour (250 ms) and small transforms (400 ms).

### Background at rest and on hover

Flat colour bands (cream, lime, yellow) and full-bleed video. Marquees and badges keep moving at rest. Nothing reacts to the pointer beyond element hovers.

### Section handover

**Hard colour-band cuts** (cream → lime → yellow → cream). Continuity is carried by the type system (serif display, typewriter labels, the giant wordmark) and the drawn characters, not by transitions.

### Transfers: this is the bar

- **A fixed motion vocabulary,** written down once and used by every element: ambient 20 s linear and small loops of 2–3 s carry over directly. Graza's 250 ms / 400 ms UI tempos are capped by S0063 in the Austin table below.
- **Characterful small motion** that belongs to the brand's own drawn objects.
- **A display type at a scale the page can crop.**

### Does not transfer

- **110 MB.**
- **The playful food register and lime/yellow palette.**
- **Continuous loops with no pause control.** WCAG 2.2.2 requires a pause for motion running over 5 s, and Austin provides one.

### The Austin version: the motion table, checked against S0063 / S0089

Graza's tempos are the bar for *consistency*. S0063 (review-animations) sets the ceilings, and wins where Graza's numbers exceed them for UI:
- **UI stays under 300 ms**, so Graza's 400 ms movement becomes 280 ms;
- **hover and colour use `ease`**;
- **entering uses a strong ease-out;**
- **on-screen movement uses a strong ease-in-out;**
- **never `ease-in` on UI.**

| Kind | Tempo | Austin uses |
|---|---|---|
| Ambient | 20 s linear (Graza) | Trade marquee; field drift period |
| Small loop | 2–3 s (Graza) | Cursor companion blink and idle (§17); a caulk-bead "drip" on the CTA underline |
| Hover / colour | 200 ms `ease` | Colours, outlines |
| Press | 110 ms in / 220 ms out (asymmetric, S0063) | Buttons, the companion's press |
| Enter | 260 ms `cubic-bezier(0.23,1,0.32,1)` | Plates, labels, menus |
| Move | 280 ms `cubic-bezier(0.77,0,0.175,1)` | Cards, pills, the seam on keyboard steps |
| Gesture release | spring `500 / 30` (S0089) | Seam drag, map drag |
| Chapter | Scrubbed: `easeInOutQuad` (Apple), `cubicInOut` (Lusion); MERSI snap 0.6 s `power2.out` | Wall assembly, pairs |

- **Stagger:** 30–80 ms per item (S0063). Lando's 0.15 s line stagger becomes 0.06 s.
- A visible **Pause motion** control stops the field drift, loops and marquees.
- Reduced motion renders final states.

---

## 9. Quiet Cubes: configurator structure

**Site:** https://quietcubes.com/ (Webflow + GSAP 3.15 + SplitText + ScrollTrigger + Lenis 1.2.3 + Swiper 11).

**Evidence:**
- `evidence/quietcubes/recon.json`, `sheet.jpg` (the gate blocks the page);
- `gate.json` (gate timing, sticky map, headings);
- `gate/` and `gate-sheet.jpg` (29 frames after the gate);
- `brand-v2/research/p3/qc-b-gate.png` and `qc-b-configurator.png` (cycle 9).

Code: the page's two inline scripts (`inline-0.js`, 24.9 KB) in the scratchpad.

### Mechanism, at code level

**The gate *is* the configurator's first step.**
- On load, a fixed `.preloader` (z 9999) offers **four pods**: Office, Home, Outdoor and Nursing, each a pill with a cut-out photo.
- Hovering a pill fades opacity over 0.2 s `ease`.
- Choosing one (`pointerdown` on `[pod-name]`):
  1. `.switch-overlay` goes to opacity 1;
  2. after **200 ms**, every `[pod]` block is hidden and every `[pod="<name>"]` block is shown;
  3. gradients are swapped (`[<name>-gradient]` → `.gradient`, `.tech-gradient`), along with floor images, FAQ gradients and the matching Swiper;
  4. tech sections flash to opacity 0 for 100 ms;
  5. after 200 ms the overlay goes back to 0.
- **One page, four complete variants,** each with its own copy, imagery and colour theme:
  - office `#DA6440` (heading from `#F8B182`);
  - home `#0074F5`;
  - outdoor `#BAD97A`;
  - nursing `#F1A976`.

**Gate exit, measured in `gate.json`:** the overlay stays opaque for about 1 s. By 1.6 s its opacity is 0.1; by 2.6 s it is 0 and translated `-900px` (slid off the top). Only then (`opacityTrigger(preloader) === 0`) does the intro timeline play, with `duration = 0.275`.

**Scroll chapters run on "opacity triggers".**
- Webflow Interactions animate the **opacity of invisible trigger elements** with scroll.
- A `MutationObserver` reads `style.opacity` as a 0–1 progress value, `opacityTrigger(el, cb)`, and drives the following.

| Trigger | What it drives |
|---|---|
| `.frames-trigger` | An image sequence: `frame = floor(length × opacity)`; only that `<img>` gets opacity 1 |
| `.tech-fix-trigger` | Switches the tech container between `fixed` and `relative` |
| `.tech-margin-trigger` | Padding-bottom 2 → 7 rem |
| `.eco-trigger` | Counts "0%" → "99%" with progress |
| `.reviews-trigger` | Fixes the reviews panel at progress > 0.5 |
| `.faq-trigger` | Seeks a **"blinds" timeline**: 17 SVG `<rect>`s in a clipPath, `scaleY` 0 → 1, reversed order, `stagger:{amount:1}`, `ease:none`. The reviews close like Venetian blinds into the FAQ. |

**Lenis:** `lerp 0.1`, `wheelMultiplier 0.7`. Swiper: `freeMode`, momentum ratio 0.5, bounce ratio 0.5, `grabCursor`.

**The sticky map** (sticky height / track, from `gate.json`):

| Chapter | Sticky / track |
|---|---|
| intro | 900 / 2700 |
| founder | 900 / 1656 |
| tech | rail 106 / track 9000 (four tech panels: Smart LED Lighting, Occupancy Lighting, Smart Ventilation or AC by pod, Materials, Privacy Glass) |
| eco | 900 / 2700 |
| video | 900 / 1800 |
| steps ("From one click to team-ready pod") | 900 / 2700 |
| moments | 900 / 3150 |
| testimonials | 900 / 1800 |
| reviews | 900 / 1080 |
| faq | 900 / 2250 |

Document height: 26,029 px.

**The configurator** (`qc-b-configurator.png`):
- a pod-type rail at left (the same four pills; the selected one filled with its gradient);
- the **3D pod model** centred on light grey;
- tabs under the model: CUSTOMIZATION / MEASUREMENTS / TECH SPECS;
- at right, **one step at a time**: a "Capacity" heading, "NUMBER OF PEOPLE" with options 1 · 2 · 2 Slim · 4 · 6 · 8–10;
- a **running subtotal** ("USD 8,625.00" with a breakdown chevron);
- PREV / NEXT.

### Frame by frame

From `gate-sheet.jpg`; the filenames sort alphabetically, so they are described in time order:

| Time / frames | What they show |
|---|---|
| Gate | Dark gradient. "Select Your Pod" with the four pills. "The World's Most Advanced Pods & Booths" at the foot. |
| +1.0 s → 2.6 s | The gate fades and slides up. "Maximize Focus & Productivity at Your Workplace" types in over an **orange gradient** stage holding the office pod, with "The World's Most Advanced Office Pods & Booths" at right. |
| s01–s03 | The heading shifts up. "Innovative Soundproof Office Pods & Booths" appears, and the pod-pill menu **slides down to sit under the intro** (`translateY(max(0, intro.bottom))`) before docking in the header. |
| s04–s05 | "Quiet Spaces Built for 1 to 10 Minds": pod sizes in a horizontal row. |
| s06–s10 | "As featured by Forbes" and the founder quote. A product image grows from a slit to a full card. |
| s11–s22 | "Crafted With Technology". **The pod is fixed in the centre** while the page turns light. Its state changes per feature, each with an icon and a short text at right: **Smart LED Lighting** (the stage glows orange) → **Occupancy Lighting** (white figures appear inside) → **Smart Ventilation** (the pod becomes a line drawing) → **Materials** (the panels **explode outward** in layers: felt, wood, glass) → **Privacy Glass** (the glass frosts). |

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Choice swap | Overlay 200 ms → swap → 100 ms flash → 200 ms → reveal |
| Pill hover | 0.2 s |
| Intro | 0.275 s |
| Chapters | Linear progress from the opacity triggers |
| Blinds | Stagger amount 1, `ease:none` |
| Lenis | `lerp` 0.1 |

### Cursor

- System cursor. Swiper sliders show a grab cursor.
- **The visitor's choice, not their cursor, reshapes the page.**

### Background at rest and on hover

Gradient stages tinted by the chosen pod's theme. Static at rest; nothing reacts to hover except the pills.

### Section handover

- **The same object stays fixed while its state changes:** the tech chapter keeps one pod centred across five features.
- Other chapters hand over through sticky stages and the closing blinds.
- **A change of choice repaints every section at once** behind a 200 ms overlay.

### Transfers

- **A first choice that reshapes the whole page,** offered up front but skippable.
- **One fixed object whose state changes per chapter,** including an exploded materials view.
- **A configurator built as one step at a time:**
  - a type rail at left;
  - the object in the middle;
  - the step at right;
  - a running total;
  - PREV / NEXT.
- **A cheap scroll-progress bus.** The opacity triggers are a hack; Austin uses ScrollTrigger progress, but the *idea* of one progress value fanned out to several effects transfers.

### Does not transfer

- **A blocking gate before any content.** Austin's first viewport must be the hero.
- **A fixed price total.** The firm publishes *bands per project*, not a calculator. Showing a computed price would invent a number.
- **Four colour themes.** Austin keeps one steel family.

### The Austin version: the visualiser (Quiet Cubes alone; Rimowa dropped)

**The first choice.** Under the hero, an optional row asks "What are you replacing?" (Siding · Windows · Painting · Roofing…). Choosing one re-orders and re-captions the page behind a 200 ms veil:
- the archive opens at that trade;
- the pairs filter to it;
- the map highlights it.

It is never a gate, and skipping it leaves the full page.

**The visualiser** follows Quiet Cubes' structure:
- left, the trade rail;
- centre, **one elevation of a house**, the same object throughout;
- right, one step at a time: profile → finish colour from the steel-family swatches plus the firm's recorded finishes → trim → windows;
- under it, a "what this looks like on real jobs" strip pulling pairs that match;
- PREV / NEXT.

**Pricing.** Instead of a subtotal, it shows only the **firm's published price band for that trade and its count of priced jobs**, from the record. Nothing is computed. The form at the end is never claimed saved or sent.

**One object, changing state.** The wall-assembly chapter (§5) shares this idea: one wall is held, and its state changes per layer.

---

## 10. Cash App Brand Guidelines: colour as content

**Site:** https://design.cash.app/ and https://design.cash.app/color.

The registry's `cash.app/press/assets` is not the guidelines. This site was found from a coverage page, and it is built on Standards (`documentData` for "Cash App (Q4 25 Update)", domain `designstandards.cash.app`).

**Evidence:**
- `evidence/cashapp/recon.json`, `sheet.jpg`;
- `evidence/cashapp-color/recon.json`, `sheet.jpg`, `pill.json`;
- `frames/pill-1-hover.jpg`, `pill-2-click.jpg`, `pill-3-leave.jpg`.

### Mechanism, at code level and measured

**The home page.**
- An index of **31 videos and objects** (3D cash-tag coin, cards, cut-out products, illustrations) set as floating tiles on black.
- A full-viewport `c-snake_canvas` and a custom cursor (`c-cursor has-moved`).
- Navigation: Logo / Color / Typography / Motion / Iconography / Voice & Tone / Card / Graphic UI / Tokens / Components (Swup page transitions).

**The colour page.** Colour is **shown as fields, not chips:**
- a full-width **Cash Green** block opens the page;
- the spec sits in tiny mono at its lower left (`ColorSpec` blocks, Söhne Mono 9/13);
- swatch values found on the page: **`#00E013`** (Cash Green), **`#000000`**, **`#FFFFFF`**, **`#D8FF14`**.

**The copy pill** (measured by `pill.js`):

| Property | Value |
|---|---|
| Existence | **Only while the pointer is over a colour field.** Before hover and after leaving: no pill. |
| Element | `position:fixed`, `pointer-events:none`, moved by `transform: matrix(1,0,0,1, x+10, y+10)`; pointer at (400,500) → transform (410,510) |
| Follow | Instant: on a 300 px pointer jump it closes the gap in **1 frame** (`closePerFrame 1`, 95% in 4 ms). No easing. |
| Size | About 249 × 79 px; label "Copy hex" |
| Click | Label becomes **"Hex copied"**; `navigator.clipboard.writeText("#00E013")` is called with the field's own value |
| Reset | Label returns to "Copy hex" between **0.8 s and 1.5 s** after the click (sampled at 50, 300, 800, 1500 and 2500 ms) |

**Chapters down the page** (`cashapp-color/sheet.jpg`):
1. Color (intro and the Green field);
2. Cash Green (a story with photographs where green fills *whole scenes*: a lime card in hand, a person in green);
3. Supporting colours (black, white, a lime field);
4. Related product design sections;
5. Colour modes (RGB / Pantone / CMYK table);
6. Accessibility (Green on black passes, green on white fails, shown as three large type tiles);
7. Incorrect usage (muddy gradients, substitute greens, wrong CMYK/RGB, a gradient on Cash Green): **each "don't" is drawn, not described**;
8. Resources (black band).

The left rail is a sticky table of contents.

### Frame by frame

| Frame | What it shows |
|---|---|
| Colour 00 | White page. "Color" at left; the intro paragraph at right; one huge green field. |
| 01 | Pointer over the field: the white "Copy hex" pill sits 10 px off the cursor's lower right. |
| 02–04 | The green field leaves. "Cash Green" with editorial photographs follows, then a carousel, then "Supporting colors" with three large swatch fields. |
| 05–06 | A black band ("Related product design sections"), then the colour-modes table. |
| 07–09 | Accessibility tiles, then the incorrect-usage grid, then the black resources band. |
| Home 00–13 | Tiles of objects drift up on black at different rates as you scroll: a parallax wall of the brand's things. |

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Pill follow | No easing: instant, offset 10 px |
| Copied state | About 1 s, then reverts |
| Fields | Static; colour carries the content |

### Cursor

- The system cursor is kept; the pill is an **attached label** that exists only over a copyable colour.
- On the home page there is a custom cursor plus the snake canvas.

### Background at rest and on hover

The colour field *is* the background. At rest it is still. On hover the only change is the pill.

### Section handover

Full-bleed colour blocks butt against each other (green → white → black). The colour change is the transition.

### Transfers

- **Colour presented as an object of content:** a full field, specified in small mono, copyable.
- **A cursor label that appears only where an action exists,** with no lag and a short confirmation (~1 s).
- **"Don'ts" shown as drawn examples.**
- **Accessibility pairings shown as type on colour.**

### Does not transfer

- **Cash Green and the lime.** Austin's family is black, white and steel, light-dominant.
- **The snake canvas and floating 3D object wall on black.**

### The Austin version: finishes as fields

The finish colours Austin installs are shown as **full fields**, not chips:
- one field per finish in the visualiser (§9) and in the pairs plate;
- each carries its name and recorded value in small mono at the lower left;
- the colour list is still the flagged, non-blocking item (Muse ruling).

Over a field, a **"Copy colour" pill** follows the pointer with no lag, 10 px off. A click copies the value and shows "Copied" for 1 s, then reverts. It exists only over a copyable field and only with a fine pointer; the keyboard gets a real button.

The steel family itself is presented the same way in the Stage 2 identity board.

---

## 11. Performance budget

Set against the measured reference weights in §0. Bruno Simon declares 15 MB, including 6.5 MB of music and 1.7 MB of physics WASM.

| Item | Budget |
|---|---|
| First load (hero photo + field) | **≤ 1.2 MB** |
| Field textures | ≤ 250 KB |
| Field geometry | One canvas, one draw call |
| Job map (§12) | ≤ 300 KB (drawing + 312-point JSON); no physics engine, no audio; loaded 1 viewport before the section |
| Sequences | ≤ 1.2 MB each, binary-split, poster first |
| Loader screen | None (Bruno's ring is adapted only inside the map, from cached data) |
| DPR cap | 1.5 |
| Offscreen | Canvases pause |
| Reduced motion | Static posters and final states |

---

## 12. Bruno Simon: the 312-dot job map (scoped)

**Site:** https://bruno-simon.com/ (2025 world: Three.js with WebGPU node materials, Rapier physics in WASM, Basis/KTX2 textures).

**Annex v3 scope:** "the 312-dot map as the ONE explorable section, nothing more". The completion: "Nothing else game-like beyond it and the pairs instrument".

**Evidence:**
- `evidence/bruno/recon.json` (scripts, large assets, DOM buttons);
- `cast/` (screencast of load, idle, click, keyboard drive and drag; every second frame kept);
- `sheet.jpg`.

Code: `index-*.js` (4.9 MB; class names intact) and `rapier-*.js` in the scratchpad.

**Limits:**
- Screenshots time out on this page. The screencast was used instead.
- Under software rendering, the world finished revealing only at the end of the run. The driving frames show the intro, not the drive, so driving is described from code.

### Mechanism, at code level

**The world.** It is terrain plus one areas GLB (`areas-compressed.glb`, 639 KB).
- `Areas` builds an `Area` subclass for every model child whose name starts with an area key: achievements, altar, behindTheScene, bowling, career, circuit, cookie, lab, landing, projects, social, toilet, timeMachine.

**Each `Area` does three things:**
1. Adds its props as physics objects that **start asleep** (`sleeping: true`, mass from the model's `userData`), so they cost nothing until touched.
2. Reads a `zoneBounding` cylinder and registers it with `Zones`. Every tick, `Zones.update` compares the player's XZ distance with each zone's radius and fires **`enter` / `leave`** once per crossing.
3. Reads a `zoneFrustum` circle. Its objects are **hidden unless that circle intersects the camera's ground quad** (`view.optimalArea.quad2`), so only areas in view render.

**The vehicle** is a Rapier raycast vehicle (`createVehicleController`):
- `steeringAmplitude 0.5`, `engineForceAmplitude 300`, `boostMultiplier 2`;
- `topSpeed 5`, `topSpeedBoost 40`;
- `brakeAmplitude 35`, `idleBrake 0.06`, `reverseBrake 0.4`;
- suspension heights low 0.88 / mid 1.23 / high, with matching stiffness presets.

**The camera (`View`):**
- A **fixed spherical angle**: φ = 0.27π (0.31π on low quality), θ = 0.25π.
- Radius `lerp(15, 30, 1 − zoom)`.
- The focus point follows the player, smoothed by `lerp(smoothed, target, delta × 10)`: about 16% of the gap per frame at 60 Hz.
- Zoom pulls out with speed (`speedAmplitude −0.4` across speeds 5–40), smoothed the same way.
- A **magnet** draws the focus toward nearby interactive points (`multiplier 0.25`).

**The pointer (`RayCursor`):**
- Interactables are **analytic shapes** (spheres, boxes) with `onEnter` / `onLeave` / `onClick`.
- Only those near the focus point are tested, and only when the pointer changes.
- The canvas cursor becomes `pointer` while over one.
- **A press counts as a click only if the pointer moved under 25 px**, so dragging to look never clicks.

**The intro and reveal (`Reveal`):**
1. A ring draws itself on a dark grid floor as loading progresses, closes, then shrinks to a point.
2. A uniform `distance` goes 0 → **3.5** (`back.out(1.7)`, 2 s), opening a **lit-rim disc of the world at the spawn point**. Camera zoom goes 0.6 → 0.3 (`power1.inOut`, 1.25 s).
3. Hovering the disc raises its rim intensity ×1.22 over 0.2 s.
4. A click or key press takes the disc 3.5 → **30** (`back.in(1.3)`, 2 s), then the whole world. Inputs switch to "wandering" and the camera starts tracking.

**DOM controls:** "Interact", "Unstuck", "Teleports you to the closest respawn", "Resets every object", plus sound and effects toggles.

### Frame by frame

From `sheet.jpg`:

| Frames | What they show |
|---|---|
| 1 | White, before the canvas mounts. |
| 2–3 | Dark violet gradient. |
| 4–6 | A perspective grid floor with small × markers. |
| 7–12 | A white-hot arc grows from a point into a ring: the loading progress. |
| 13–15 | The full ring glows. |
| 16–17 | It shrinks to a small ellipse, then vanishes. |
| 18–24 | The empty grid holds while the world finishes loading. |
| 25–28 | **A disc opens at the spawn point** with a glowing blue-white rim. Inside it, in warm daylight colours: a cherry tree, a lamp, a bench, the red off-road car and the giant letters "BRUNO S…". The disc widens until the scene fills the frame (a bridge, water, autumn leaves). |

### Interaction, timing, easing

| Element | Behaviour |
|---|---|
| Reveal | 2 s `back.out(1.7)`, then 2 s `back.in(1.3)` |
| Zoom | 1.25 s `power1.inOut` |
| Hover rim | 0.2 s |
| Camera follow | `delta × 10` per tick |
| Click threshold | 25 px |

### Cursor

- The system cursor, switching to `pointer` over interactables.
- Movement is by keyboard or gamepad (`Gamepad.cross` is in the action map). The pointer looks, aims and clicks.

### Background at rest and on hover

The world idles at rest: wind lines, leaves, water, day and year cycles. Hover lifts the rim or highlight of the interactable under the ray.

### Section handover

- One world, no pages.
- **Areas are entered by arriving in them** (zone `enter`), and content wakes when its frustum circle comes into view.

### Transfers, to the map only

- Zones that fire enter/leave.
- Frustum-style culling of what is out of view.
- Analytic hit shapes with a 25 px click-versus-drag threshold.
- A follow camera that eases at `delta × 10` and pulls out with speed.
- A magnet toward points of interest.
- A reveal that opens **from a meaningful origin**.
- An "Unstuck / back to start" reset.

### Does not transfer

- 15 MB, the WASM physics, the music, the driving model.
- The dark violet toy world and the toy areas (bowling, toilet, cookie).
- Anything game-like outside the map section.

Per the V2 prompt's guard, the map **never displaces the conversion floor**, and it has a mobile and reduced-motion fallback.

### The Austin version: the job map (two wholly different versions in §17)

**Data.** The verified finder frame (FACTS.md):
- viewBox 566 × 640, 8.3 px per mile;
- office square at (389.5, 290.7);
- lat lines 30.0–30.8° N, lon lines 98.2–97.6° W;
- **312 in-frame jobs with photos**, each "placed near the home, never on it".

The caption is exactly: **"312 on the map with photos + 574 more counted"**.

**The reveal.** It opens **from the office**, 7801 N Lamar Blvd Suite C70:
1. a steel ring draws round the office square as the map data arrives;
2. the map opens as a disc from there (`back.out(1.7)`, 2 s);
3. under reduced motion it simply appears.

**Dots.** The 312 dots are analytic circles, hit-tested only inside the visible area.
- Hover opens a plate with record data only: place, trade, month where recorded.
- A press with under 25 px of movement opens the job. A drag never does.

**City zones** come from the dataset's tallies (Austin 539, Round Rock 110, Cedar Park 35, Pflugerville 28, Leander 27, Georgetown 21…).
- Entering one slides in its panel.
- Every count is labelled with what it measures: all documented jobs, or photographed in-frame (FACTS.md: Round Rock 37 in-frame against 110 documented).

**Never traps the page.**
- The wheel scrolls the page unless the map has been activated by a click.
- The phone (512) 550-0000 and the estimate action stay beside the map.
- "Back to the office" resets the view (Bruno's respawn).

**Fallback.** On touch-only devices, at 390, and under reduced motion, it becomes a static map with tappable dots plus the archive list (§7).

---

## 13. Dropbox Brand: the subtraction-discipline closing

**Site:** https://brand.dropbox.com/ (Webflow with interactions, 2.4 MB, no canvas).

**Annex v3:** "subtraction-discipline closing", CSSDA Website of the Year 2025.

**Completion:** "Dropbox for brand-system discipline".

**Evidence:**
- `evidence/dropbox/recon.json`, `probe.json`;
- `annex.json` (tile rectangles at 13 scroll steps, tile hover sequence);
- `sheet.jpg`;
- `frames/mosaic.jpg`, `frames/tile-hover.jpg`.

### Mechanism, measured

**The opening.** A white page ruled by hairline grid lines. A blue statement at upper left: "At Dropbox, our Brand Guidelines help us infuse everything we make with identity." A second statement sits in a 500 × 500 blue square.

**The mosaic is one big grid that zooms out with scroll.** It holds 11 colour tiles:
- Framework `rgb(40,55,80)`, Voice & Tone `rgb(250,210,75)`, Logo `rgb(61,211,238)`, Typography `rgb(250,85,30)`;
- Iconography `rgb(180,220,25)`, Color `rgb(255,140,25)`, Imagery `rgb(137,32,85)`, Motion `rgb(200,175,240)`;
- plus three small accent squares.

How the Framework tile moves:

| scrollY | Left edge (px) | Width (px) |
|---|---|---|
| 0 | −2958 | 536 |
| 450 | −2614 | 514 |
| 900 | −2080 | 478 |
| 1350 | −1216 | 409 |
| 1500 | −786 | 368 |

- The convergence **accelerates**: an ease-in mapping of scroll to zoom.
- Between 1650 and 1800 the grid **settles into a fitted index**: tiles 268 px wide with 10 px gutters, the whole system on one screen.
- The blue statement square stays centred through the zoom and leaves at the end.

**Each tile is a link to its chapter** (`/typography`, …). On hover:
- its border-radius, padding, colour and background transition over **0.35 s** (`ease` and `cubic-bezier(0.4,0,0.2,1)`);
- **its own emblem animates**: colour over 1.5 s and transform over 1.6 s. Quote marks for Voice & Tone, "Aa" for Typography, a bezier curve for Motion, a node graph for Framework.

Plain links change colour in 0.15 s `ease`.

### Frame by frame

From `sheet.jpg`:

| Frames | What they show |
|---|---|
| 00–01 | The white grid, the blue statement, a scroll chevron. |
| 02 | Coloured blocks slide in from the edges as the grid zooms out. Orange, blue and cyan corners appear. |
| 03 | Larger blocks: yellow, blue, and a magenta "Imagery". |
| 04–11 | The fitted mosaic: eight named tiles and three accents, each with its emblem. |

### Cursor, background, handover

| Aspect | Behaviour |
|---|---|
| Cursor | System cursor |
| Background | White with hairlines; static at rest |
| Hover | Only the tiles react, **each differently** |
| Handover | The page's whole content resolves into one index: **the close is the navigation** |

### Transfers

- **End by subtraction:** reduce everything the page said to a few named doors.
- **The zoom-out that reveals the whole system at once.**
- **One emblem animation per tile.** This directly serves the completion's rule that every interactive element gets its own reaction.
- **The hairline grid as visible structure.**

### Does not transfer

- The multicolour palette (Austin is the steel family).
- The brand's own fonts (Austin uses normal fonts).
- The guidelines function.

### The Austin version: the closing index (homepage closing, V1 in §17)

**Content.** At most nine steel-toned tiles: Siding, Windows, Painting, Roofing, The pairs, The map, About, Financing, Contact.

**Movement.** The grid zooms out with an accelerating curve from **the phone tile**, (512) 550-0000, to the fitted index.
- The phone and estimate tiles stay the largest: the conversion floor.
- Each tile's SVG emblem has **its own reaction**: lap courses slide, a sash lifts, a brush stroke draws, shingles lap down, a dot pulses on a map line…
- At 390 it becomes a two-column list with the same emblems.

---

## 14. Cowboy: family-fronted warmth

**Site:** https://cowboy.com/ (Shopify, 54 MB, 11 videos, SuisseIntl).

**Annex v3:** "family-fronted warmth, one named system, restrained colour: homeowner trust without contractor clichés (confirmed live; the hero is a single rider, family framing sits in the body)".

**Evidence:**
- `evidence/cowboy/recon.json`, `probe.json`;
- `annex.json` (sticky tracks, hotspots, toggles, the stepped reveal at 8 scroll steps);
- `sheet.jpg`;
- `frames/stairs.jpg`.

### Mechanism, measured

**Hero.** A full-bleed film of **one rider** in a real street; the frames catch two different riders as the film plays.
- "Riding reinvented" (2 lines), "Meet the e-bike that thinks for itself.", and one pill CTA, "Discover Cruiser".
- **Three proof items along the bottom edge:** "Award-winning design / Assembled in France", "Natural ride feel / AdaptivePower technology", "On guard 24/7 / Pioneering theft detection".

**Product modules.**
- "The easy-rider" / "The explorer", with **spec pills** (Step-over frame, Removable battery, 40–90 km range, GPS tracking, AdaptivePower).
- A **model toggle** (Cruiser / Cruiser ST; Cross / Cross ST).
- **"Explore" hotspots** on the bike photo: colour and background over 0.3 s `cubic-bezier(0.4,0,0.2,1)`.

**One named system.** "AdaptivePower" is the single technical name, repeated in the hero proof, the pills and the menu.

**The stepped reveal** ("Power so natural, you're always in flow.") runs in a 2,485 px track with a 900 px sticky stage.
- Four image bands, each centred by `translateX(-50%)`, **widen** over the first ~600 px of scroll:
  - 549 → 648 px;
  - 837 → 936 px;
  - 1125 → 1224 px;
  - 1374 → 1440 px.
- They sit at vertical offsets of **−320 / −240 / −120 / 0**, forming a stepped ziggurat window onto one photograph, which then holds.

**Other sticky chapters:** "Packed full of tech" (1,800 px track) and "Design in Belgium. Assembled in France. Every bike is craft…" (4,500 px track).

**Family framing in the body:** "Cowboy Cruiser ST — The family favourite".

**An email-capture modal opens on scroll** (frames 09–11).

### Frame by frame

From `sheet.jpg`:

| Frames | What they show |
|---|---|
| 00–01 | Two hero film frames: a rider at a stone archway, then a rider in red. |
| 02–03 | The product on white with pills and the toggle; a dealer strip. |
| 04 | "Shockingly smooth", a second rider film. |
| 05–06 | "The explorer" module, then a press row with one-line quotes (TechCrunch, red dot, The Verge, TIME, GQ). |
| 07 | **The stepped window** under "Power so natural…". |
| 08 | A close film crop. |
| 09–11 | The email modal over a dimmed page. |

### Cursor, background, handover

| Aspect | Behaviour |
|---|---|
| Cursor | System cursor |
| Background | Neutral greys and white; colour comes from the photographs |
| Handover | Sticky stages; the stepped window widens into its next stage |

### Transfers

- **People in real places using the thing,** with the family framing in the body. For Austin that means homeowners at their own houses and the crew at work, from **real photographs only**: no generated people, and photos for every avatar (S1320).
- **One named system,** used consistently. The firm's own process name if it publishes one; **none is invented.**
- **A three-item proof line** under the hero, from locked facts.
- **The stepped window,** which in siding reads as **lap courses**: four bands, each one course, opening onto a finished wall.

### Does not transfer

- The scroll-triggered email modal: it interrupts, and forms are never claimed sent.
- The e-bike register and 54 MB of film.

### The Austin version (About / Since 2009, V1 in §17)

- **The window.** A finished-house photograph seen through **four lap-course bands** that widen with scroll: offsets −320 / −240 / −120 / 0, widths stepping to full.
- **Beneath it:** real crew and homeowner photographs (with permission), "Since 2009, merged 2018", and the three-item proof line:
  - 4.9 from 474 reviews;
  - GAF Master Elite;
  - James Hardie Elite Preferred + President's Club 2025.
- **Restraint:** one accent, and photographs carry the colour.

---

## 15. Ever: verified craft only (never the pairs)

**Site:** https://ever-live-here.com/ (14.8 MB, ITC Avant Garde Gothic).

**Annex v3:** Ever "contributes only its verified craft: the case page's 3D visualisations, apartment selection/filtering presentation and magazine narrative". It has **no before/after slider anywhere**, so it is **never used for the pair centrepiece**.

**Evidence:**
- `evidence/ever/recon.json`, `probe.json`;
- `annex.json` (scroll controller test, chapters, filter nav);
- `sheet.jpg`.

### Mechanism, measured

**The scroll is paged, not continuous.**
- `scrollY` stays 0, and the root has `has-custom-controller`.
- After a 400 px wheel event, no tall wrapper moved over 60 frames (`movers: []`).
- In the recon run, 10 wheel steps produced **12 distinct screens**: each gesture advances one composed screen.

**The magazine narrative:**
- a giant "ever" wordmark with photographs **inside the letterforms** and an oval-masked photo;
- "LIVE HERE";
- then chapter words (**ARCHITECTURE, INTERIOR, TERRITORY, NATURE, PLACE**) set across full-bleed renders;
- each chapter followed by a split panel: an **oval-masked photo**, a short caps heading ("SIMPLE SHAPES, EXPRESSIVE FINISHES", "AESTHETICS COMPLEMENT COMFORT") and a "+" detail button.

**The 3D visualisations:** **material spheres**, a brick-textured sphere and a knit-textured sphere, float beside the façade chapter as finish samples.

**Selection and filtering:**
- the territory nav (Nature / Play / Chill / Sport; `territory-nav__item`) shows one item active (`is-active`) and the others reduced (`is-invisible--l`);
- choosing one swaps the panel;
- an "Apartments" pill leads to the selector.

**Hover:** colour and transform over 0.4 s `cubic-bezier(0.25,0.74,0.22,0.99)`. The call-back CTA pulses (`button-pulse`, 3 s).

### Frame by frame

From `sheet.jpg`:

| Frames | What they show |
|---|---|
| 00–01 | The wordmark over a courtyard photo with a hand-and-leaf oval, then over grass with a bicycle. |
| 02–04 | ARCHITECTURE across a brick façade; an oval façade crop with brick and knit spheres. |
| 05 | A founder quote in an oval portrait. |
| 06–07 | INTERIOR over a lobby render; overlapping interior crops; the architects' name in a dark panel. |
| 08–09 | TERRITORY over a garden; an aerial render of the courtyard. |
| 10 | NATURE with the four filter icons. |
| 11 | PLACE set vertically over a father and child. |

### Cursor, background, handover

| Aspect | Behaviour |
|---|---|
| Cursor | System cursor |
| Background | Deep chapter colours (slate, oxblood, terracotta, forest) |
| Handover | **One gesture, one screen**, each opening on a chapter word |

### Transfers

- **Finish samples as objects:** material spheres.
- **One-active filter presentation.**
- **Magazine chapter words** over full-bleed images.

### Does not transfer

- **The pairs, in any form.**
- **The paged hijack.** Austin keeps native scroll; chapters use CSS scroll-snap at most.
- The real-estate register.

### The Austin version

| Use | Version |
|---|---|
| Siding finishes as **sample objects**: a lap, a shake and a board-and-batten swatch rendered as small turned samples | Colours V2 (§17) |
| A **one-active trade filter** with drawn icons | Trade choice V2 (§17) |
| A **magazine narrative** of the archive by trade (SIDING, WINDOWS, PAINTING… across real job photos) | Archive V2 (§17) |

---

## 16. Erie Home: a wording note only

**Annex v3:** "proof wording + FAQ grammar only … must never influence layout, colour, type, or motion".

**Evidence:** `evidence/erie/recon.json`, `annex.json`, `sheet.jpg`, and the FAQ page read in this session.

**Proof grammar.** Number + scope + count + source, e.g. "4.8 Nationwide Rating out of 40,000+ Reviews". The licence number appears with the proof ("CA #1157757").
- Austin's line uses only the locked figures: **"4.9 from 474 reviews"**.
- No "Nation's most trusted"-style superlative is borrowed: it cannot be verified for Austin.

**FAQ grammar** (eriehome.com/why-erie/faqs/):
1. Questions are asked in the homeowner's words, decision questions first: "When is it necessary to replace a roof?", "How much does a typical roof replacement cost?", "How long does … last?", "Does homeowner's insurance cover…?", "How do I find a reputable … company?".
2. Then the firm's own questions: process, installation, protection.
3. Then the "manufacturer's versus contractor's warranty" difference.
4. Each answer opens with **one direct sentence**, then a short list.

Austin's FAQ answers come only from the firm's published text.

---

## 17. Synthesis: one Austin system, under the brief and the completion

### Reference status

| Reference | Annex v3 | Role in Austin |
|---|---|---|
| Immersive Garden | **Not listed** (the brief names it) | Background field mechanics, **pending ruling** (§1) |
| Igloo Inc | **OUT** | Studied only; nothing used (§2) |
| Lusion | Allowed: flow | The carrying thread (dwell-and-glide); the field's return law; closing V2 |
| Scout Motors | Allowed: heritage, film-roll proof | Hero V2; proof V2; About V2 |
| Apple AirPods Pro | Allowed: pinned scroll, numeral events | Proof V1; wall-assembly V1 |
| MERSI | Allowed: hero split-slider; the seam | Hero V1; **pairs centrepiece V1 and V2** |
| Lando Norris | Allowed: archive gallery | Archive V1 |
| Graza | Allowed: animation quality bar | The motion table (§8), applied everywhere |
| Quiet Cubes | Allowed: visualiser / staffed service | Trade choice V1; wall-assembly V2; **visualiser V1 and V2** |
| Cash App | Allowed: colour options as full-bleed steel fields | Colours V1 |
| Bruno Simon | Allowed, scoped to the 312-dot map | **Job map V1 and V2**, the only explorable section |
| Dropbox Brand | Allowed: subtraction closing | Closing V1 |
| Cowboy | Allowed: family-fronted warmth | About V1 |
| Ever | Allowed: verified craft only | Trade choice V2; colours V2; archive V2. **Never the pairs** |
| Erie Home | Note only | FAQ and proof wording (§16) |
| Rimowa | **Dropped** | Nowhere |

### The homepage: 11 sections, two wholly different versions each

Each version starts from a named reference's studied mechanism. V1 and V2 differ in layout, style and composition, not as variations of one idea. Game-like play exists **only** in sections 4 and 8.

| # | Section | V1 (reference → mechanism) | V2 (reference → mechanism) |
|---|---|---|---|
| 1 | Hero (≤ 40 words) | **MERSI** infinite split-slider: two half-photographs of real jobs meeting at a seam, a centred label plate cycling the process in sync (wheel-captured, clamp-release) | **Scout**: one full-bleed photograph of a finished Austin house; headline words rise with `power4.out` scrubbed; the three-item proof line |
| 2 | "What are you replacing?" | **Quiet Cubes**: choice row of photo pills; a choice repaints the page behind a 200 ms veil, never a gate | **Ever**: a one-active trade filter with drawn icons; the panel beside it swaps to that trade's real jobs |
| 3 | Proof numerals (4.9/474 · 312 + 574 · since 2009) | **Apple**: pinned numeral events, sticky 1 vh in a 2.5 vh track, each numeral its own scrubbed event (`easeInOutQuad`) | **Scout**: film-roll evidence, the since-2009 story as a sequenced strip of real job frames along an arc (`sine.inOut`) |
| 4 | **The pairs (177)**, game-like | **MERSI seam, instrument form**: one full-bleed pair, draggable vertical seam (spring 500/30), wheel capture ×0.3, synced plate | **MERSI seam, split-slider form**: two columns moving in opposite directions per pair, wheel-driven project-to-project, the plate as index, plus a converging thumbnail grid |
| 5 | Wall assembly | **Apple**: pinned exploded scrub of one wall, layer pills seek the scrub | **Quiet Cubes**: one wall held fixed on a light stage while its state changes per feature, icon and short text at right |
| 6 | Siding colours | **Cash App**: full-bleed steel colour fields, spec in small mono, zero-lag "Copy colour" pill (10 px offset, 1 s copied state) | **Ever**: finishes as turned sample objects on split panels with oval-masked job photos |
| 7 | Visualiser | **Quiet Cubes configurator**: trade rail left, one elevation centre, one step at a time right, PREV / NEXT, published price band (never a computed total) | **Quiet Cubes tech chapter**: the elevation fixed centre-stage while scrolling through profile → colour → trim → windows, each a state change of the same house |
| 8 | **Job map (312)**, game-like | **Bruno**: drive a small steel van token from the office with keys or drag; follow camera (`delta × 10`, speed zoom-out −0.4); city zones fire panels; magnet 0.25 to clusters | **Bruno, pointer-only**: a flat top-down map; ray-style hover on dots (25 px click threshold); zones focus on hover; disc reveal from the office; no vehicle |
| 9 | Archive (312 + 574) | **Lando**: horizontal archive by trade, `scrub:1`, 4 rem in-frame drift, steel-block caption reveals | **Ever**: magazine narrative by trade; chapter words over full-bleed job photos; CSS scroll-snap (native scroll kept) |
| 10 | About / Since 2009 | **Cowboy**: four lap-course bands widening onto a finished wall; real crew and homeowner photos; one named system only if published | **Scout**: heritage arc; real job photographs travel an arc on `--progress`; older years graded toward grey |
| 11 | Closing | **Dropbox**: zoom-out mosaic from the phone tile to a ≤ 9-tile steel index, one emblem reaction per tile | **Lusion**: the carrying thread lands; the background pieces settle into a finished wall behind the CTA (dwell-and-glide, return law) |

**Other pages:** 5–6 sections each, 3–11 pages by need, fewer is better. **Delivery:** one single HTML file with all pages and in-file navigation, nothing external.

### The cursor companion (completion §3): mechanisms it is built from

**The character** is an animated SVG trade motif. Three switchable variants are drawn at Stage 2, for example a cedar shake, a corner post, and a level whose bubble is the eye. The system cursor is kept.

**Behaviour:**

| Behaviour | How |
|---|---|
| Follow | Eases toward the pointer at **0.10 of the gap per frame** (Immersive Garden's measured eased layer; pending ruling, otherwise the same value stated as Austin's own) |
| Idle | After 2.5 s it idles: blinks on a 2–3 s loop (Graza's blink tempo) and **rolls its eyes** toward the nearest interactive element |
| Press | Asymmetric: about 110 ms in, about 220 ms out (S0063) |
| Section background | Changes with it: steel on light, white on dark |
| Copy action | Over a copyable colour field it carries Cash App's zero-lag label |

**Its own reaction per element type:**

| Element | Companion reaction |
|---|---|
| Link | Leans toward it |
| Pairs seam | Squints and splits along the seam |
| Map dot | Becomes a pin-head bob |
| Colour field | Takes on the colour |
| Photo | Frames it with corner ticks |
| Map van | Hides; the van is the character there |

**Off states:** no companion, and no switch, on touch or coarse pointers. Reduced motion means no easing and no idle. Pause motion stops its loops. A broken companion fails the build.

### SVG standard (completion §3)

Heavy custom SVG in foreground and background, drawn for the siding trade, **a different idea per section**:

| # | Section | SVG idea |
|---|---|---|
| 1 | Hero | Course lines |
| 2 | Trade choice | Trade icons |
| 3 | Proof | Nail-row tallies |
| 4 | Pairs | Seam ruler ticks |
| 5 | Wall assembly | Layer drawings |
| 6 | Colours | Profile cross-sections |
| 7 | Visualiser | Elevation line drawing |
| 8 | Map | Austin line terrain |
| 9 | Archive | Course-count rule |
| 10 | About | Stepped courses |
| 11 | Closing | Tile emblems |

Every interactive element gets its own reaction.

**A conflict, resolved by the completion.** S1320 says "do not draw illustrations with model-authored SVG". The completion requires heavy custom SVG, and the owner's standard wins over a library skill (judging note 7: the brief wins).

### Copy and type (completion §4, §7)

- **Hero:** at most 40 words. S0650's tighter subtext cap of 20 words is also kept.
- **Section headline:** at most 8 words, with at most 35 words of support.
- **Fonts:** normal everyday fonts only (Poppins, Roboto, Inter, Open Sans, Lato, Montserrat), chosen at Stage 2.
- **De-AI pass:** no perfect symmetry, no generic gradients or glass, no effect excess, no cookie-cutter rhythm.

### Captions

Real job data only: place names from the firm's own project records. Where the record and a project URL disagree, the record wins and the item is flagged (`windows3`: record "Maple Run", URL slug "alexandria").

### Locks carried into the next stages

- Phone (512) 550-0000 · 4.9/474 only.
- 7801 N Lamar Blvd Suite C70, Austin TX 78752.
- Mon–Fri 8–8, Sat 8–6, Sun 12–5.
- Since 2009, merged 2018.
- GAF Master Elite · James Hardie Elite Preferred + President's Club 2025 · Andersen Certified Premier · BBB A+.
- "312 on the map with photos + 574 more counted" · 177 pairs.
- info@austinprosiding.com.
- Forms never claimed saved or sent.
- The "5,000+" figure stays out.
