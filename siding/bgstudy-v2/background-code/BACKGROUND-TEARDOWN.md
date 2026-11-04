# Immersive Garden — Homepage Background: Mechanism Teardown

Standalone technique study of the homepage background at immersive-g.com: a sculptural
3D relief wall that sits almost invisible behind the page at rest and "carves itself
out" around the visitor's cursor, then melts back. Written from code evidence in the
captured front-end so the TECHNIQUE can be rebuilt in original code. Their models,
textures and artwork are theirs; nothing here copies them.

Evidence base (all under `captures/immersive-garden/files/immersive-g.com/`):
- `assets/entry.DyxL_KXi.js` — the 2.44 MB application bundle (Nuxt/Vue app; all WebGL
  code lives here). Byte offsets below refer to this file.
- `webgl/home/reliefs_low_compressed.glb`, `webgl/home/plaster.jpg`,
  `webgl/global/noises/*` — the background's assets.
- Prior desk notes in `ai-website-system-2026-11-02/` (ANIMATION-FLOW-REFERENCES.md,
  REFERENCES-ALL.md) describe the effect qualitatively only ("scroll-scrub one scene,
  bake lighting/AO, KTX2 textures"); everything mechanical below is from the code.

Every claim is labelled **EVIDENCED** (with its anchor) or **INFERENCE**.

---

## 1. The effect, in one paragraph

The homepage background is a wall of six sculpted bas-relief panels (bird, deer,
dragonflies, frog, peacock, squirrel — EVIDENCED: GLB node names, see §4) rendered
with a fully custom shader whose lighting is **baked offline into packed textures**.
A small GPU "flowmap" — a ping-pong render target that accumulates mouse-velocity
stamps and dissipates them — is sampled in screen space by both the vertex and
fragment shaders of the relief. Where the flow field is strong, the relief's depth
and its baked shading crossfade from "flat, page-coloured grey" to "fully sculpted";
where the field decays (~1 s), the sculpture sinks back into the page. There is no
mask texture, no CSS, and no DOM trick: the reveal *is* the lighting/depth response
to a velocity field. A separate global Navier–Stokes fluid simulation adds an
iridescent sheen on top, and a procedural noise mode takes over the relief during
fast scrolling.

## 2. Architecture at a glance

```
pointer events ──► global pointer tracker (class Kge, instance Cd)
                     │  normalFlip (0..1, y flipped), velocity (per-frame delta)
                     ▼
relief component (class D_e) per-frame:
   flowmap.mouse.lerp(normalFlip, 0.4)
   flowmap.velocity.lerp(tracker.velocity, moving ? 0.1 : 0.04)
                     ▼
flowmap (class E_e): 256×256 ping-pong RT, stamp shader (§5)
   R,G = velocity dir · B = speed · A = stamp accumulation
                     │  tFlow (screen-space sample)
        ┌────────────┴─────────────┐
        ▼                          ▼
vertex shader (S_e):          fragment shader (C_e):
pos.z *= mix(0.05, 1, extrude)  crossfade 6 baked shading levels by extrude,
                                 plaster grain, gradient, fluid sheen
                     │
relief scene (own THREE.Scene + camera) ──► per-view EffectComposer
(UnrealBloom) ──► view render target ──► app compositor (blends views on
route transitions; UI is a separate pass)
```
EVIDENCED: class/offset anchors — pointer tracker `Kge` @1876211; relief component
`D_e` @1948314 (class), shaders `S_e`/`C_e` immediately before it; flowmap `E_e`
@1935927; home view `F_e` @1976392; home config `k_e` and scene manifest `N_e`
@1988400–1990500; app fluid `_createFluidFlowmap` @1858706.

## 3. Engine and renderer

- **Three.js, r150–r151** — EVIDENCED by API markers in the bundle: `useLegacyLights`
  present (introduced r150), the pre-r152 `outputEncoding` API in use, the
  `encodings_fragment` chunk ending `gl_FragColor = linearToOutputTexel(...)`, and
  zero occurrences of `outputColorSpace` / `SRGBColorSpace` / AgX / Neutral tone
  mapping (all r152+). The exact patch release is INFERENCE — no version string
  survives minification (the only `REVISION` literal in the bundle belongs to a
  stats-panel library).
- One shared `WebGLRenderer` for the whole app; each view (page) renders its
  background scene with its own camera into its own render target (the home view's
  target carries a depth texture), and a fullscreen compositor blends view targets
  during transitions. EVIDENCED: app `_createRenderer`/`_render` @1858300–1859600;
  compositor uniforms `tView1Bg/tPrevViewBg/...` @1838800; `F_e._createRenderTargets`
  adds a `DepthTexture` @1982400 region.
- Home view renderer clear colour is **white** (`#ffffff`). EVIDENCED: `k_e.renderer`.
- Post for the home view: EffectComposer with **UnrealBloomPass** — strength **2.2**,
  radius **0.15**, threshold **0.38**, smoothWidth **0.5** (three's
  LuminosityHighPass shader is in the bundle); motion blur present in config but
  **disabled**. Composer RT samples = 1 (global config `Uo.composer`). EVIDENCED:
  `k_e.composer` @1988400; luminosity-high-pass chunk @2005600.
- Shaders are authored GLSLIFY-style (`#define GLSLIFY 1`, `#<include ...>`
  placeholders resolved at build time) and injected into materials through a small
  registry helper (`St(shaderSource, "fragmentShader")` → `.use(material)`).
  EVIDENCED throughout the shader extracts.

## 4. Scene contents — the relief wall

Resource manifest for the home view (EVIDENCED: `N_e.resources` @1990300):

| Item | Path | Notes |
|---|---|---|
| Relief model (default) | `/webgl/home/reliefs_high_compressed.glb` | name `gltf/home-bas-relief` |
| Relief model (fallback `mobile_or_lowTier`) | `/webgl/home/reliefs_low_compressed.glb` | same resource name |
| Plaster grain | `/webgl/home/plaster.jpg` | 1024×1024, sampled by world position |

The captured tree contains only the **low** GLB (the capturing client was served the
fallback tier — see Open Questions). Its inventory (EVIDENCED: parsed GLB JSON chunk;
generator `glTF-Transform v3.10.0`; extensions `KHR_draco_mesh_compression`,
`EXT_texture_webp`):

- **6 panels**, one mesh each: `bird`, `deer`, `dragonflies`, `frog`, `peacock`,
  `squirrel`; node Y positions ≈ 0, −9.82, −20.04, −30.01, −40.35, −49.63 — a vertical
  stack with ~9.995-unit pitch (the code's row height constant `Hv = 9.995`).
- Geometry carries **POSITION + TEXCOORD_0 only — no normals**. Low tier:
  48k–67k vertices per panel, Draco-compressed. All shading normal information comes
  from the baked textures and screen-space derivatives, never from vertex normals.
- **2 packed 2048×2048 WebP textures per panel** (12 total, ~190–430 KB each): the
  material's `baseColorTexture` (`*_packed_02`) and `emissiveTexture`
  (`*_packed_01`). The loader's standard PBR material is discarded; the component
  reads `material.map` → uniform `tBake1` and `material.emissiveMap` → `tBake2` and
  feeds them to the custom shader. EVIDENCED: `D_e.initReliefContent` @1949000 region.
- Behind the panels sits a fullscreen background plane (renderOrder −1, no depth
  test/write) shaded by a tiny fragment shader whose base is the same grey constant
  the relief starts from (0.54504), multiplied by the plaster grain and a soft
  gradient, then remapped `c*0.6+0.4`. EVIDENCED: shader `T_e`/`I_e` @1945600 region.

Why "almost nothing shows" at rest is therefore structural: background plane and
un-revealed relief share the same base grey, the relief's depth is scaled to 5%
(§6), and its shading sits at level 0 — a flat tone within a few percent of the
plane behind it, on a white page.

## 5. The reveal — a velocity flowmap, not a mask

Class `E_e` (EVIDENCED @1935927) is a flowmap in the OGL tradition, extended:

- **Buffers:** two render targets (read/write, swapped each update), square,
  **size 256** default; float type (a different type constant is selected on iOS
  UA). No depth buffer.
- **Per-frame update** (fullscreen quad, shader `b_e` @1934458):
  1. Sample the previous field at `uv + vec2(0, uOffset)` — `uOffset` is the
     negated scroll delta, so existing stamps shift with the world when the page
     scrolls instead of sticking to the screen.
  2. **Dissipate:** `data *= 1 / (1 + uDeltaMult * (1/uDissipation − 1))` with
     `uDissipation = 0.953` — i.e. ×0.953 per 60 fps frame, frame-rate-normalised
     by `uDeltaMult = min(deltaMs, 32)/16` (updated in the class's `tick`).
     A stamp fades to ~5% in ≈ 60 frames (~1 s). This decay *is* the "melts back"
     behaviour; there is no separate fade-out animation.
  3. **Stamp the pointer:** `getStamp(velocity, mouse)` — offset
     `cursor = vUv − mouse` with `cursor.x *= aspect`; radius term
     `smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha`, where the component sets
     **falloff 0.38 → uFalloff = 0.19** (aspect-corrected UV units, roughly a fifth
     of screen height) and **alpha 1**. The stamp value is
     `vec4(velocity*50 → clamped, magnitude, 1)` where
     `magnitude = 1 − (1 − min(1, |v|))²` (easeOutQuad of pointer speed). Stamps are
     *additive* and modulated by a drifting noise texture
     (`0.15 + 0.85·smoothstep(0.4, 1, noise.g)`, sampled at 0.8 scale, scrolling
     slowly with time) so the reveal edge is organic, not a clean disc.
  4. **Stamp a phantom cursor** (`mouse2`/`velocity2`, §7) at ×3 strength with its
     RG zeroed and `a = b`, modulated by a second noise layer (0.35 scale).
  5. Clamp: `data = min(data, 1)`, `data.rgb = max(data.rgb, −1)`.
- **Channels:** R,G = signed velocity; **B = speed magnitude; A = stamp
  accumulation**. The relief reads `extrude = mix(flow.b, flow.a, 0.5)`.

Pointer plumbing (EVIDENCED): a global tracker (`Kge`, instance `Cd`) keeps
`normal` (0..1), `normalFlip` (y flipped), and a per-tick `velocity` = frame delta
of `normalFlip` × `min(32, deltaMs)/16`. Each frame the relief component lerps
`flowmap.mouse` toward `normalFlip` with factor **mouseEase = 0.4**, and
`flowmap.velocity` toward the tracker velocity with factor **0.1 while the pointer
is moving, 0.04 when it is still** (so the field keeps a whisper of drift after you
stop). Config anchors: `k_e.components.relief.flowmap = { mouseEase:.4,
dissipation:.953, falloff:.38, alpha:1 }`, applied via `setDissipation/setFalloff/
setAlpha` in `D_e.onConfigUpdated` (falloff is halved on the way in: `uFalloff =
falloff * .5`).

There is **no radius uniform, no SDF, and no trail texture beyond this field** —
persistence is purely the dissipation constant. (The `mask:{...sdfCenter...}` block
in the home config belongs to the WebGL *title* component's SDF text animation,
not to the background — EVIDENCED: it sits under `components.title`.)

## 6. Shading the relief — six baked levels, crossfaded

Fragment shader `C_e` (EVIDENCED @1937900) does no dynamic lighting at all:

1. `flow = texture(tFlow, screenUv) * 2` (fragment path applies a ×2 gain; the
   vertex path does not), `extrude = mix(flow.b, flow.a, 0.5)`.
2. Six greyscale **baked shading levels** are unpacked from the two packed
   textures: `level0..2 = tBake2.b/g/r`, `level3..5 = tBake1.b/g/r`. The output
   `o` starts at the constant **0.54504** (level0 is read, then overwritten by this
   constant in the shipped shader) and crossfades upward through the levels with
   `smoothstep` bands **[0–.2, .2–.4, .4–.6, .6–.8, .8–1.0]** of `extrude`. In
   other words the asset pipeline bakes the same relief under six increasing
   "reveal/light" states into six texture channels, and the flow field scrubs
   between them — the sculpture appears to catch light exactly where, and as much
   as, the cursor has moved.
3. Plaster grain: `color = mix(color, color * plaster.g, uTextureStrength=1)`,
   plaster sampled at `vPos.xy / 10`.
4. A soft top-left gradient: `color += gradient * 0.7 * uGradientStrength`
   (`uGradientStrength = 0.17` from `relief.extrude.gradientStrength`;
   `gradient = mix(1, 0.5, length(uvScreen − vec2(0, 0.8)))`).
5. Brightness: `color = color * uBrightnessFactor + uBrightnessOffset` —
   desktop **0.6 / 0.4**, mobile **0.5 / 0.6** (EVIDENCED: uniform init in
   `initReliefContent`).
6. The fluid sheen (§8) is mixed in, then the fast-scroll / colour-switch blends
   (§9). Alpha is 1; pixels with alpha < 0.05 would discard (not used here).

Vertex shader `S_e` (EVIDENCED @1945600) makes the reveal *geometric* as well:
it projects the vertex to screen UV, samples the same flow field, and scales
**`pos.z *= mix(0.05, 1.0, extrude)`** — flat (5% depth) where untouched, full
relief depth under the cursor — plus a constant `pos.xy *= 1.004` overscan.
A scroll-speed deformation term is computed (`deformStrength = 5.5 ·
min(1, |uScrollSpeed|)`) but, as shipped, the resulting `deformY` is never applied
to the position — dead code in the captured build (EVIDENCED from the extracted
shader text).

So the reveal is three coupled responses to one field: vertex depth (5%→100%),
baked-level crossfade (flat grey→full shading), and the sheen mask (§8).

## 7. Alive at rest — the phantom cursor

The background is never fully still. `D_e.loopRandomMouseMovement`
(EVIDENCED @1954200) runs an endless GSAP timeline that drives the flowmap's
**second stamp** (`mouse2`): 1–3 random strokes per cycle, each 0.7–1.0 s with a
GSAP `rough` ease (strength 2–3, ~12 points/sec of duration), directions chosen by
rotating the previous direction by a random angle, magnitudes lerped 0.7–0.9;
`velocity2` is pinned at (1,1) during a cycle; between cycles the point parks at
(−1,−1) and the loop restarts after a random **1–3 s** pause. Because stamp 2
writes only B/A (RG zeroed), it raises `extrude` without adding directional
velocity — faint patches of the relief gently surface and sink on their own,
which is the "something is going on, but not too much" rest state.

## 8. The sheen — a global fluid simulation

Separate from the flowmap, the app runs **one global GPU fluid simulation**
(class `v8`, instantiated once at app start; output published as the global uniform
`tFluidFlowmap`). EVIDENCED @1552012 (class), @1858706 (creation), config
`Uo.fluidFlowmap` @1526203:

- Classic stable-fluids pass structure (splat → advect → divergence → curl →
  vorticity → pressure solve → gradient subtract), **simulation 128×128,
  dye 512×512**, pressure targets at sim resolution, half-float targets.
- Home-page tuning: `densityDissipation .95`, `velocityDissipation .8891`,
  `pressureDissipation .925`, `curlStrength .1`, splat `radius .7`,
  `velocityRange {min:5, max:78}`.

In the relief fragment shader, `fluid = texture(tFluidFlowmap, screenUv)` feeds
`applyFluidEffect(...)`: an HSV hue-shifted normal-colour iridescence
(`hueShift −0.52`, `colorRange 2`, RGB velocity coefficients 2 / 1 / 1.5,
`fluidMagnitude .15`, master `amplitude .57` — all from
`k_e.components.relief.fluidEffect`, injected as `#define`s by `onConfigUpdated`)
is mixed over the shaded relief with mask =
**fresnel × shadow gate**: the fresnel is computed from screen-space derivative
normals (`cross(dFdx(vEye), dFdy(vEye))`), sharpened by
`1 − pow(1 − fresnel, 35)` (`chromaticMask.fresnelSharpness`), scaled by
`fresnelOpacity .98`, and OR-ed with a shadow term from baked level5
(`smoothstep(0.42, 0.2, level5) * shadowOpacity .25`). Net: the iridescent film
clings to grazing angles and shadowed carving, and only where the fluid is moving.
Note: in this shader variant the config's `baseColor`, `baseThreshold` and
`shadowStrength` fields are injected but never referenced by `applyFluidEffect` —
dead parameters in the shipped home build (EVIDENCED from the shader body).

## 9. Scroll behaviour

- **Parallax:** the relief reads the app's smoothed scroll via `onScrollSmooth`:
  `uScroll = scrollY / screenHeightPx * 0.25` (`relief.scroll.speed`), and each
  frame `scene.position.y = −uScroll * 9.995` — the wall travels at **quarter
  speed** against the page. Panels wrap modulo the total wall height
  (`sections/sectionsPerLine * 9.995`), so the wall is an endless loop.
  EVIDENCED: `D_e.onScrollSmooth`, `D_e.update` @1949000–1954200.
- **Trail anchoring:** `flowmap.update(−scrollDelta)` shifts the field by the
  scroll delta (clamped ±0.2), and `uScrollSpeed` (damped: `+= (scrollDelta*5 −
  uScrollSpeed) * 0.04`) feeds the vertex shader.
- **Fast-scroll mode:** a scroll factor in the home scroll system crosses
  `fastTrigger 0.99` → `goFastAnimation()` tweens `uFastScroll` 0→1 in **1.25 s,
  power2.out**; below `slowTrigger 0.75` → `goSlowAnimation()` returns it over
  **1 s, sine.out** (hysteresis; factor rates: fast speedUp .6 / slowDown .3, slow
  speedUp .9 — EVIDENCED: `k_e.components.scroll.fastMode/slowMode`,
  `D_e.goFastAnimation/goSlowAnimation`). At `uFastScroll = 1`:
  - the flow-driven extrude is **replaced** by a procedural noise extrude
    (`getFastScrollNoise`: two counter-scrolling samples of the mask-noise texture,
    `noiseSize 7.77`, `speed 2`, dotted against rotating colour axes, smoothstep
    over `mask −1..1`, `circularIn` easing, × `strength 1.02`) in both shaders;
  - camera zoom lerps 1 → **0.6** (`fastModeZoom`);
  - colour is pushed through `ContrastSaturationBrightness(c, 2.0, 1.0, 0.08) +
    0.3` — a bright, low-contrast "overdrive" look.
- **Footer colour switch:** when the footer enters the viewport, the view tweens
  `uSwitchColorTransition` → 1 over **1.2 s sine.inOut**, and the relief's colour
  mixes to a "black render" — `pow(o·(|fluid|·0.0003) + o, 5.5)` per channel, a
  near-black crush of the same shading — so the wall inverts under the dark
  footer; it tweens back on exit. EVIDENCED: `F_e._onFooterInViewport` @1982400.
- **Show/hide:** view fade via a `_renderAlpha` uniform (1.75 s sine.inOut in,
  0.4 s out) and a camera-zoom intro (2 s power1.out to zoom 1; exit-to-about
  zooms to 1.05 over 6 s). Relief `uOpacity` fades separately when the pointer
  "leaves" the content area (over-show 0.5 s / over-hide 2 s). EVIDENCED: `k_e.
  animation`, `F_e._showDefault/_overHide/_overShow`.

## 10. Camera

Own `PerspectiveCamera` for the relief scene: position z = **distance 15**,
near **5**, far **20**, fov = min(**30**, a fit-fov computed from
`1.33 * (9.995 − 0.1) / aspect` so one panel row always fits the width), zoom =
lerp(slowModeZoom **1**, fastModeZoom **0.6**, uFastScroll) × intro `cameraZoom`.
EVIDENCED: `k_e.components.relief.camera`, `D_e.onWindowResize/update`.

## 11. Performance and quality ladder

- **DPR caps:** `_dpr = min(devicePixelRatio, maxDpr)` with `maxDpr = 1` when the
  GPU tier is 0, else **2**. The relief's own render-target chain runs at the view
  DPR; MSDF/UI pass allows up to 2 separately (`minDprUi/maxDprUi`).
  EVIDENCED: `_updateDPR` @1210138; `Uo.device` @1526203.
- **GPU tiers:** a device/GPU classifier (`Pt.gpu.tier`, tiers including BAD and
  LOW) drives resource fallbacks via flags `{edge, mobile, lowTier: tier ≤ LOW,
  mobile_or_lowTier}`. For the home background the only tiered asset is the GLB:
  `mobile_or_lowTier` → `reliefs_low_compressed.glb`, else the high build.
  EVIDENCED: resource-manager fallbacks @1816926; `N_e.resources`.
- **Feature matrix by device class** (`Uo.deviceConfig`, EVIDENCED @1526403):
  desktop/default → fluid sim ON, mouse particles ON, DPR ≤ 2;
  bad or low tier (any device) → DPR locked to 1, **fluid sim OFF, particles
  OFF**; mobile/tablet default → fluid sim OFF, particles OFF, DPR ≤ 2.
  The relief's own 256² flowmap is created unconditionally in `createReliefScene`
  — the cursor reveal survives on mobile; only the sheen layer goes away.
- **Cost shape:** per frame the background costs one 256² flowmap quad, one
  fullscreen fluid sim at 128² (desktop only), the relief scene (6 draw calls,
  ~330k vertices low tier), and a bloom chain. Everything else is baked. This
  matches the desk notes' claim ("bake lighting/AO… so cinema never costs
  frames") with the mechanism now visible: *there is no dynamic light in the
  relief shader at all.*
- A sibling shader in the bundle (`_0e` @2094127) shows the house style for other
  scenes: baked lightmap + an analytic cursor point light (`cursorLight()` —
  diffuse/specular from `uCursorPoint`, decay `1/pow(d, CURSOR_DECAY)`, gated by
  `uCursorIntensity`). It is **not** used by the homepage relief (which uses the
  flowmap system above); it is how the same studio lights other scenes, and is
  recorded here only to prevent confusion between the two techniques.

## 12. Parameter sheet (homepage background)

| Parameter | Value | Where |
|---|---|---|
| Flowmap RT size | 256 × 256, ping-pong | `E_e` defaults |
| Flowmap dissipation | 0.953 / 60 fps frame | `relief.flowmap.dissipation` |
| Flowmap stamp falloff | 0.38 config → 0.19 shader (aspect-corrected UV) | `relief.flowmap.falloff` |
| Flowmap stamp alpha | 1 | `relief.flowmap.alpha` |
| Pointer ease into flowmap | mouse lerp 0.4; velocity lerp 0.1 moving / 0.04 still | `relief.flowmap.mouseEase`, `D_e.update` |
| Pointer velocity scale in stamp | ×50, magnitude easeOutQuad | flowmap shader |
| Fragment extrude gain | ×2 (vertex path ×1) | `C_e` / `S_e` |
| Vertex depth range | z × mix(0.05, 1, extrude) | `S_e` |
| Bake crossfade bands | 0–.2–.4–.6–.8–1.0 smoothsteps | `C_e` |
| Base grey (rest state) | 0.54504 | `C_e`, `T_e` |
| Plaster strength / gradient strength | 1 / 0.17 | `relief.extrude` |
| Brightness factor/offset | 0.6/0.4 desktop · 0.5/0.6 mobile | `initReliefContent` |
| Fluid effect | amplitude .57, magnitude .15, hueShift −.52, colorRange 2, RGB coefs 2/1/1.5, linesSpeed 2, linesScale 4, linesStrength 0, linesWaveLength .15 | `relief.fluidEffect` |
| Chromatic mask | fresnelSharpness 35, fresnelOpacity .98, shadowRange .2–.42, shadowOpacity .25 | `relief.chromaticMask` |
| Scroll-extrude noise | size 7.77, speed 2, mask −1..1, strength 1.02 | `relief.scrollExtrude` |
| Scroll parallax | relief speed ×0.25; row pitch 9.995 | `relief.scroll`, `D_e` |
| Fast/slow triggers | fast ≥ .99, slow ≤ .75; uFastScroll 1.25 s power2.out in, 1 s sine.out out | `scroll.fastMode/slowMode` |
| Camera | fov ≤ 30, distance 15, near 5, far 20, zoom 1 → .6 fast | `relief.camera` |
| Bloom | strength 2.2, radius .15, threshold .38, smoothWidth .5 | `k_e.composer.bloom` |
| Global fluid | sim 128², dye 512², densityDiss .95, velocityDiss .8891, pressureDiss .925, curl .1, splat radius .7, velocityRange 5–78 | `Uo.fluidFlowmap`, class `v8` |
| Phantom cursor | 1–3 strokes, .7–1 s each, rough ease, rest 1–3 s | `D_e.loopRandomMouseMovement` |
| DPR cap | 1 (GPU tier 0) else 2 | `_updateDPR` |

## 13. Rebuild recipe (the technique, in original code)

1. **Bake, don't light.** Sculpt your relief/scene once; render its shading under
   N increasing "reveal" states (e.g. light sweeping in / depth emphasis rising)
   and pack the states as channels of two textures (here 6 states in 2×RGB).
   Ship geometry with positions + UVs only; compress (Draco) and texture-pack
   (WebP/KTX2). Two quality tiers of the same model, swapped by a GPU-tier test.
2. **Rest state = camouflage.** Give the background plane and the relief's
   level-0 the *same* base colour, and scale relief depth to ~5% when unrevealed.
   Invisibility comes from agreement, not from transparency.
3. **One velocity field.** A 256² ping-pong target; each frame: shift by scroll
   delta, multiply by dissipation ≈0.953 (frame-rate-normalised), add a soft
   stamp (radius ≈0.19 of screen height, smoothstep falloff) holding
   (velocity.xy, speed, 1), noise-modulated, clamped. Ease the pointer position
   in at ~0.4/frame and velocity at ~0.1 (0.04 at rest).
4. **Sample the field in screen space in both shaders.** Vertex: restore depth
   `z *= mix(0.05, 1, extrude)`. Fragment: crossfade the baked levels by
   `extrude = mix(field.b, field.a, 0.5)` over even smoothstep bands; multiply a
   tiling grain texture; add a faint directional gradient.
5. **Keep it alive.** Drive a second, autonomous stamp with random eased strokes
   and multi-second rests so the surface breathes when untouched.
6. **Sheen on top (optional, desktop-class only).** A small stable-fluid sim
   (128²) whose velocity texture feeds an HSV-shifted, fresnel-masked iridescent
   mix. Gate it — plus DPR and particles — behind a device/GPU tier matrix.
7. **Scroll is a mode, not just a position.** Move the wall at a fraction of
   scroll speed with wrap-around tiling; detect fast scrolling (with hysteresis)
   and crossfade the whole shading model to a procedural-noise variant with a
   zoom-out and a contrast push, so speed itself reads as a state change.
8. **Post:** a restrained bloom (high threshold, low radius) over the composited
   view; white clear colour; everything else stays DOM.

## 14. Open questions the code did not answer

1. **`reliefs_high_compressed.glb` is not in the capture tree** (the capturing
   client was served the low tier), so the high tier's vertex counts, texture
   resolution and any extra panels are unknown.
2. **Exact Three.js patch release** — bracketed to r150–r151 by API markers; no
   version literal survives in the bundle.
3. **Fast/slow trigger integrator** — thresholds and factor rates are config, but
   the exact normalisation of scroll speed that feeds the factor lives in the
   home-scroll component and was only partially traced.
4. **Fluid splat input mapping** — config (`velocityRange 5–78`, radius .7) is
   known, but the precise coupling from pointer velocity to splat force/colour
   inside class `v8`'s update loop was not fully traced.
5. **Define serialisation details** — `onConfigUpdated` injects config values as
   shader `#define`s via a helper (`tr(...)`); how `{min,max}` objects and the
   `{r,g,b}` base colour are serialised (presumed `vec2(min,max)` and /255
   normalisation) was not verified at the helper.
6. **Where the device matrix disables the fluid sim** — `Uo.deviceConfig` says
   OFF for mobile/bad/low, but the app-level creation call doesn't show the
   check; it may live inside the fluid class or the renderer wrapper. On those
   tiers `tFluidFlowmap` presumably stays null/black for the relief shader.
7. **Flowmap RT pixel type on iOS** — a distinct type constant is selected by UA
   in `E_e`; the minified constants weren't resolved to named Three types.
8. Whether the relief panels' **baked levels encode light direction sweeps or
   depth emphasis** (or both) cannot be told from the shader alone — it is an
   asset-pipeline decision; the shader only crossfades them.
