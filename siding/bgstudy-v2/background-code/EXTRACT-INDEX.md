# Immersive Garden — homepage background code extract

Standalone extract of the immersive-g.com HOMEPAGE background system: the 3D bas-relief
scene behind the page, mostly hidden at rest, which reveals around the visitor's cursor
and shifts with scroll. Source capture: `../captures/immersive-garden/files/immersive-g.com/`
(capture taken 2026-11-04). All offsets below are exact BYTE offsets into
`entry.DyxL_KXi.js` (the site's 2,444,906-byte main bundle, included in this folder),
verified against the raw bytes on 2026-11-04.

## How the background works (verified from the code)

- The homepage (`name:"home"`, scene class `F_e`, page def `N_e`) loads ONE 3D model,
  `gltf/home-bas-relief` — a relief/terrain sculpture — plus a plaster texture.
- The reveal is a **mouse flowmap**, not a spotlight shader: a ping-pong render target
  is stamped every frame with the cursor's position and velocity (two stamps: the real
  mouse and a scripted "random mouse" that keeps the scene alive when the visitor is
  idle). Each stamp is a smoothstep falloff disc; the stored field dissipates slowly.
- The relief's material samples that flowmap and uses it to extrude/displace the relief
  and drive a chromatic-fresnel mask, so the hidden scene swells into view where the
  cursor has moved and settles back as the field fades. Config: `flowmap:{mouseEase:.4,
  dissipation:.953, falloff:.38, alpha:1}`, `extrude:{textureStrength:1,
  gradientStrength:.17}`.
- Scroll couples in twice: the flowmap shader carries a `uOffset` (scroll-shifted UVs)
  and the relief config sets `scroll:{speed:.25}` plus a `scrollExtrude` noise mask, so
  the background changes as the page scrolls. Camera: fov 30, distance 15.

## Assets in this package (copied from the capture, sizes verified byte-for-byte)

| File | Bytes | Role |
|---|---|---|
| `home/reliefs_low_compressed.glb` | 4,743,120 | The homepage relief model (low/mobile tier — see Missing) |
| `home/plaster.jpg` | 99,200 | Relief surface texture (`txt/plaster`) |
| `global/noises/mask-noise.png` | 413,652 | `txt/mask-noise` — mask noise for materials |
| `global/noises/rgb-noise.jpg` | 113,222 | `bas-relief/noise` — noise texture named for the relief |
| `global/noises/rgb-attenuation-1_2.png` | 360,415 | Noise attenuation map (code path uses a comma: `rgb-attenuation-1,2.png`; capture sanitised it to `_`) |
| `global/noises/rgb-attenuation-0_9.png` | 414,985 | Same, 0.9 variant |
| `global/noises/rgb-fractal.png` | 446,610 | Fractal RGB noise |
| `global/noises/sparkle-noise.png` | 196,947 | Sparkle noise (used by global effects) |
| `global/dust-particle.jpg` | 12,595 | `txt/dust-particle` — particle sprite |
| `entry.DyxL_KXi.js` | 2,444,906 | Full main bundle — all background code + shaders live here (anchors below) |

Supporting loaders in the capture tree (not copied, paths only):
`webgl/libs/basis/basis_transcoder.js` (62,337) + `.wasm` (499,935) for KTX2 textures;
`webgl/libs/draco/draco_wasm_wrapper.js` (58,763) + `draco_decoder.wasm` (285,747) —
the relief GLB is Draco-compressed, so the Draco decoder is required to open it.

## Code anchors in entry.DyxL_KXi.js (byte offsets)

| Byte offset | What |
|---|---|
| 1,988,898 | Home page definition `relief:{model:"gltf/home-bas-relief", scroll:{speed:.25}, flowmap:{mouseEase:.4, dissipation:.953, falloff:.38, alpha:1}, extrude:{textureStrength:1, gradientStrength:.17}, camera:{fov:30, distance:15, ...}, scrollExtrude:{...}, chromaticMask:{...}, fluidEffect:{...}}` |
| 1,990,273 | Home resource list: primary `/webgl/home/reliefs_high_compressed.glb`, fallback (mobile_or_lowTier) `reliefs_low_compressed.glb`, texture `/webgl/home/plaster.jpg` |
| 1,976,398 | `class F_e` — the home scene class that builds the relief, flowmap and camera |
| 1,934,529 | **Flowmap simulation fragment shader** uniforms: `tMap, uFalloff, uAlpha, uDissipation, uDeltaMult, uOffset (scroll), uAspect, uMouse, uVelocity, uMouse2, uVelocity2, tNoise, uTime` |
| 1,934,819 | Same shader: `vec4 getStamp(vec2 velocity, vec2 mouse)` — the reveal stamp: velocity magnitude → strength, `smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha` disc |
| 1,948,769 | `loopRandomMouseMovement()` — scripted second cursor (mouse2) animated on a timeline so the background breathes without input |
| 1,956,509 | Relief material wiring: config values pushed into material uniforms (`uTextureStrength`, `uGradientStrength`) and per-section chromatic-fresnel defines |
| 1,860,477 | Global resource list `pge`: mask-noise, dust-particle, bas-relief/noise, attenuation + fractal noises, steel matcap |
| 1,917,772 | Separate MSDF **text** reveal shader (`uProgress`, `uRevealProgress`, `tFont`) — the headline text reveal, NOT the background; listed to avoid confusion |
| 1,622,201 / 1,722,548 | Basis (KTX2) and Draco loader configuration |

The bundle holds 166 `void main` shader bodies in total (126 `gl_FragColor`); the
background-relevant ones are the flowmap pair above plus the relief material shaders
in the ~1,879,000–1,938,000 region (particle/point shaders sampling `tFlow` sit at
~1,932,9xx). NOT YET DONE: a shader-by-shader catalogue of that whole region, and
de-minified separation of the relief vertex/fragment pair — the anchors above are
enough to relocate every piece, but the pair has not yet been cut out as standalone
files.

## Missing / not on disk yet

1. **`webgl/home/reliefs_high_compressed.glb` — NOT in the capture.** It is the
   PRIMARY desktop model in the site's own resource list; only the low-tier fallback
   was captured (the capture session evidently ran as low tier, or the high file had
   not landed when the capture was interrupted). The low model in this package is
   genuine and complete as a file, but it is the reduced version.
2. **Capture bookkeeping files absent:** the capture folder currently contains only
   `files/` — no `summary.json`, `responses.json`, `dom.html` or screenshots — so the
   capture run had not finished its final writes when this extract was made. The
   homepage asset set above is fully consistent with the site's own resource lists;
   anything the still-running capture adds later should be diffed against this index.
3. No source maps are served by the site (checked across the capture), so the bundle
   above is the most original form of the code that exists publicly.
