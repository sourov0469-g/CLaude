# Three.js Pack — Elbaz procedural 3D room (single file, file://, phone-safe)
`[S####]` = value from that skill. `[d]` = derived starting value in metres; tune by eye.

## 0. Version pin
- The UMD `build/three.min.js` was removed in r160/161 (S0313: r161). **Pin r159** and inline it in a classic `<script>`. Assert `THREE.REVISION==="159"`. Delete its one deprecation `console.warn` for a clean console.
- r159 has `outputColorSpace`, `texture.colorSpace`/`.channel`, candela point lights (decay 2), `PCFSoftShadowMap`, `PMREMGenerator.fromScene`, `CatmullRomCurve3`, and Extrude holes. It lacks `scene.environmentIntensity` (per-material `envMapIntensity` scales `scene.environment` there), `shadow.intensity`, `Timer` and AgX.
- **Core only**: no OrbitControls, RoomEnvironment, RectAreaLightUniformsLib (RectAreaLight is broken without it), EffectComposer or BufferGeometryUtils. **No post-processing** [S1334/S0262].
**Applies here:** all snippets are r159 core, with no fetch or imports.

## 1. Renderer
```js
const Q = { high:{dpr:1.75,shadow:2048,tex:1024,aniso:8}, medium:{dpr:1.35,shadow:1024,tex:1024,aniso:4},
            low:{dpr:1,shadow:0,tex:512,aniso:2} }[tier]; // [S1334]; coarse pointer=medium, deviceMemory<=2=low; governor §14
const renderer = new THREE.WebGLRenderer({ canvas, antialias: Q.dpr > 1, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, Q.dpr));   // never > 2 [S0206/S1330]
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0; // [S1334]; state .92-1.05 §9
renderer.shadowMap.enabled = Q.shadow > 0; renderer.shadowMap.type = THREE.PCFSoftShadowMap; // r182+: PCFShadowMap
renderer.shadowMap.autoUpdate = false;  // static room: needsUpdate = true only when casters change [S0319]
scene.background = new THREE.Color(0xf3efe9); // = CSS section token
```
Resize via RO: guard zero size, `setSize(w,h,false)`, `updateProjectionMatrix()`, refit (§2). Ignore height-only changes on coarse pointers [S1334].
**Applies here:** one renderer and one scene for the whole section.

## 2. Camera
`PerspectiveCamera(fov, aspect, .1, 60)`. FOV 35 at aspect ≥ 1.2, 40 at ≥ .8, else 45 (S1334: 36–48, mobile +6–8°). The short tele keeps verticals straight.
```js
function fitDistance(fov, aspect, W = 6.8, H = 3.2, D = 5.2) {
  const t = Math.tan(THREE.MathUtils.degToRad(fov / 2));
  return Math.min(16, Math.max(W / 2 / (t * aspect), H / 2 / t) + D / 2); }
// tall guard [S1334]: k = max(0, innerHeight/innerWidth - 1.15); r += k*3; fov += k*8 [d]
```
Phone canvas: a 4:5 box (`height:min(80svh,125vw)`). Start pose: target `(0,1,-.4)`, θ .38, φ 1.12 rad (≈26° down) [d].
**Applies here:** mobile is a second composition, not a crop. Verify at 1440×900, 768×1024 and 390×844 [S1334].

## 3. Lighting (physical units)
| role | setup |
|---|---|
| sun via left window | `DirectionalLight(0xfff1dc, 2.2)` at `(-7.5,6,2)`, target `(0,.6,-.4)`. Before: `0xdfe8f5`, 1.4 [S1334 "sun 2.2-0.8"] |
| its shadow (only one) | map 2048/1024/off. Ortho ±4.2, near 1, far 18. `bias -0.0001`, `normalBias 0.02` [S0260/S0316] |
| fill | `HemisphereLight(0xfff6ea, 0x4a3b30, .25)` + PMREM env (§4) |
| pendants ×3 | `PointLight(0xffd2a1, 1.2, 3.5, 2)`. E = I/d², counter .78 m below, so E ≈ 2 ≈ key [d]. No shadow (a point shadow is 6 passes [S0319]) |
| practicals | bulb `emissive 0xffd7a0` ×2.2 (S1334: lantern 1.8, core 2.4). LED strip: basic colour `setScalar(2)` |
- **Never add or remove lights, or toggle `castShadow`, at runtime.** It recompiles everything [S0316]. Animate `intensity`.
- Cast: walls (the window throws the sun patch), island, cabinets, stools; not handles [S0260]. Receive: floor, counters, walls.
- Contact blobs [S0316]: 128² radial gradient `rgba(0,0,0,.6)`→0, `transparent`, `depthWrite:false`, y .001, one merged mesh.
**Applies here:** raking key from camera-left = the photographic read.

## 4. Environment (core-only RoomEnvironment)
```js
function makeEnv(renderer) {   // metals render black without an env
  const s = new THREE.Scene(), box = new THREE.BoxGeometry(1, 1, 1), mats = [];
  const add = (hex, k, size, pos) => { const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(k), side: THREE.DoubleSide });
    mats.push(m); const me = new THREE.Mesh(box, m); me.scale.set(...size); me.position.set(...pos); s.add(me); };
  add(0x8f877e, .35, [12, 6, 12], [0, 2, 0]);       // warm shell
  add(0xfff4e6, 8, [.1, 2.4, 4], [-5.9, 2.2, 0]);   // window lightbox, sun side
  add(0xffffff, 2.5, [3, .1, 3], [0, 4.9, 0]);      // ceiling softbox
  add(0x6b5a48, .5, [12, .1, 12], [0, -.9, 0]);     // floor bounce [d]
  const pm = new THREE.PMREMGenerator(renderer), rt = pm.fromScene(s, .04); // sigma .04 [S0316]
  pm.dispose(); box.dispose(); mats.forEach(m => m.dispose()); return rt; } // scene.environment = rt.texture
```
**Applies here:** build once, on every tier.

## 5. PBR materials (`MeshStandardMaterial`; env = `envMapIntensity`)
| surface | sRGB colour | rough | metal | notes |
|---|---|---|---|---|
| wall, eggshell | `#ECE7DF` (before `#D6C9AE`) | .88 | 0 | env .5 |
| quartz, polished | `#FFF` × marble | .12 | 0 | env 1. High tier: Physical clearcoat .3/.06. Honed .38 |
| white-oak floor | `#FFF` × planks | .58 | 0 | aniso Q.aniso (floors only [S1334]); bump .35 [d] |
| glazed tile | × tile | 1 × roughMap (face .22, grout .9) | 0 | bumpMap = data canvas |
| glass | Physical `#E8F1F4` | .04 | 0 | **transmission 0** (else opaques re-draw [S0319]); opacity .14, ior 1.5, env 1.4, depthWrite false |
| satin brass | `#D9B573` | .32 | 1 | env 1.3 (measured F0 ≈ `#F5E6AE`) |
| lacquer perimeter / island | `#EEEAE3` / `#2F3B45` | .62/.55 | 0 | |
| stainless / black-glass hob | `#C8CACB` / `#0E0F10` | .36/.08 | 1/0 | |
| poché section cut | `#2A2826` | .9 | 0 | wall tops, slab edges |
| BEFORE laminate / oak doors / vinyl | `#BBA98C`/`#9A6A3E`/`#B8B0A2` | .45/.48/.5 | 0 | |
Metalness 0 or 1 [S1334]. One material per surface [S0318]. Statics: `matrixAutoUpdate=false` [S0319].
**Applies here:** contrast comes from roughness, not saturation.

## 6. Procedural CanvasTextures
```js
const rng = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; // seeded [S1334]
function canvasTex(size, draw, { srgb = true, rep = [1, 1], aniso = 1 } = {}) {
  const c = document.createElement('canvas'); c.width = c.height = size; draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; // data: NoColorSpace [S0323]
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep);
  t.anisotropy = Math.min(aniso, renderer.capabilities.getMaxAnisotropy()); return t; }
const marble = (x, s, r = rng(11)) => { x.fillStyle = '#f2f0eb'; x.fillRect(0, 0, s, s); x.lineCap = 'round';
  const vein = (w, col, blur) => { x.strokeStyle = x.shadowColor = col; x.lineWidth = w; x.shadowBlur = blur; // not ctx.filter (Safari)
    let px = r() * s, py = -20, a = .9 + r() * .5; x.beginPath(); x.moveTo(px, py);
    while (py < s + 20) { a = Math.min(2.4, Math.max(.4, a + (r() - .5) * .35)); px += Math.cos(a) * 14; py += Math.sin(a) * 14 + 4; x.lineTo(px, py); }
    x.stroke(); };
  for (let i = 0; i < 5; i++) vein(2 + r() * 3, 'rgba(110,104,96,.35)', 8);  // grey veins
  for (let i = 0; i < 14; i++) vein(.6 + r(), 'rgba(150,130,100,.22)', 3);   // warm hairlines
  x.shadowBlur = 0; };
```
- **Planks** (1024² = 1.52 m): 8 × .19 m, each `hsl(33,28%,56-64%)`. Grain: 46 sine polylines per plank, `rgba(70,45,25,.04-.12)`, .6–2.2 px. Seam 2 px plus a staggered end joint, `rgba(35,22,12,.55)`. Data twin = bumpMap. Before-vinyl: `hsl(30,18%,48%)`, no grain.
- **Subway tile** (512² = .6 m): 2×8 tiles of 75×300 mm, running bond, grout 3 px `#cfc8bd`, face `hsl(40,16%,93-97%)`. Data twin (grout `#e6e6e6`, face `#383838`) = roughnessMap + bumpMap.
- Sizes: floor and marble `Q.tex` (1024² ≈ 5.6 MB [S0319]), tile 512. Repeats: floor `[W/1.52,D/1.52]`, tile `[len/.6,h/.6]`, marble on Extrude caps (UVs in m) `[.4,.4]`. One texture per `requestIdleCallback` (`setTimeout` on Safari).
- Window exterior: gradient `#bcd9ea`→`#f4efe6` on `MeshBasicMaterial`, colour `setScalar(1.6)` = an over-exposed photographic window.
**Applies here:** zero image files, identical on every reload.

## 7. Geometry (1 unit = 1 m, origin = floor centre)
```js
function slab(w, d, h, b = .004) { // bevel 0.5-2% of width [S1334]; edges catch highlights
  const s = new THREE.Shape(); s.moveTo(-w/2+b,-d/2+b); s.lineTo(w/2-b,-d/2+b); s.lineTo(w/2-b,d/2-b); s.lineTo(-w/2+b,d/2-b); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: h-2*b, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 2, curveSegments: 1 });
  g.rotateX(-Math.PI/2); g.translate(0, b, 0); return g; } // y 0..h
```
- **Room:** floor slab 6.8×.12×5.2 (top y 0). Back wall 6.8×2.9×.14. Left wall 5.2 long, a `Shape` with `holes.push(path)` (window 2.2×1.3, sill 1.05), `ExtrudeGeometry({depth:.14,bevelEnabled:false})`. Front and right open. Poché wall caps.
- **Run** (4.2 m): toe kick .10 recessed .07, carcass to .88 at depth .6, quartz .88–.91 with .025 overhang. Doors .018 with **3 mm reveals** [S1334]. Tile .91–1.45. Uppers 1.45–2.20 at depth .35, or .04 oak shelves.
- **Island:** 2.4×1.0, top 2.5×1.1×.03 with waterfall ends and a .30 seat overhang. Three stools, seat .65.
- **Pendants** at x −.8/0/.8: `LatheGeometry` dome r .19, h .16, bottom at y 1.70 (.79 above the counter). Bulb r .035, cord r .003. Light at y 1.69.
- Doors, handles (r .006 × .16–.30), stools, shades, cords and caps: **one InstancedMesh each** with a scaled unit geometry. Target 30–40 calls. Never combine `transparent` + `DoubleSide` (2× calls [S0319]).
**Applies here:** silhouette, then doors, then accents [S1334].

## 8. Orbit / drag (minimal OrbitControls)
```js
const O = { tgt: new THREE.Vector3(0, 1, -.4), th: .38, ph: 1.12, gth: .38, gph: 1.12, r: 10, TH: [-.35, .85], PH: [.95, 1.36] }; // [d]
canvas.style.touchAction = 'pan-y';  // phone: vertical swipe scrolls the page, horizontal orbits
// pointerdown: pid = e.pointerId; lx,ly = client xy; axis = touch ? null : 'free' (+ setPointerCapture). up/cancel: pid = null, dragging = false
canvas.addEventListener('pointermove', e => { if (e.pointerId !== pid) return; const dx = e.clientX - lx, dy = e.clientY - ly;
  if (axis === null) { if (Math.hypot(dx, dy) < 6) return; axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'none'; }
  if (axis === 'none') return; lx = e.clientX; ly = e.clientY; dragging = dirty = true;
  O.gth = clamp(O.gth - dx * .0055, ...O.TH); if (axis === 'free') O.gph = clamp(O.gph - dy * .004, ...O.PH); });
const a = reduced ? 1 : 1 - Math.pow(1 - .05, dt * 60); // dampingFactor .05 [S0258/S0315], fps-independent (S1330 form)
O.th += (O.gth - O.th) * a; O.ph += (O.gph - O.ph) * a; camPos.setFromSphericalCoords(O.r, O.ph, O.th).add(O.tgt);
```
- **No wheel zoom** (it hijacks page scroll [S0205]). Keyboard: wrapper `tabindex=0` with visible focus; ←/→ ±.15, ↑/↓ ±.08. Buttons Rotate left / Rotate right / Reset view [S1334 DOM mirror].
- Idle drift (fine pointer, motion OK): after 4 s, `gth = base + .12·sin(2π·.04·t)`.
**Applies here:** the clamps keep every frame composed.

## 9. Before → after state, plus S1330 parallax
```js
const ST = { t: 0, goal: 0, exposure: [.92, 1.05], key: [1.4, 2.2], pend: [0, 1.2], bulb: [0, 2.2], env: [.55, .85],
  keyCol: [C(0xdfe8f5), C(0xfff1dc)], wall: [C(0xd6c9ae), C(0xece7df)] };      // [d]; Colors pre-built
const damp = (c, t, l, dt) => THREE.MathUtils.lerp(c, t, 1 - Math.exp(-l * dt)); // [S1334]
ST.t = reduced ? ST.goal : damp(ST.t, ST.goal, 4, dt); if (Math.abs(ST.t - ST.goal) < 1e-3) ST.t = ST.goal;
const L = p => p[0] + (p[1] - p[0]) * ST.t;
renderer.toneMappingExposure = L(ST.exposure); key.intensity = L(ST.key); key.color.lerpColors(...ST.keyCol, ST.t);
pendants.forEach(p => p.intensity = L(ST.pend)); bulbMat.emissiveIntensity = L(ST.bulb);
wallMat.color.lerpColors(...ST.wall, ST.t); envMats.forEach(m => m.envMapIntensity = L(ST.env));
```
One channel table per frame [S1334]; check mid-point luminance. Flipping `transparent`, `side` or map slots recompiles [S0318]. DOM: Before/After `aria-pressed` or `<input type=range>`, plus `aria-live`.
```js
// S1330: pointermove only records normalised x,y (rect cached by RO; touch ignored); pointerleave -> 0,0
const al = 1 - Math.pow(1 - .055, dt * 60);  // .055 per 60 Hz frame
P.x += ((dragging ? 0 : P.tx) - P.x) * al; P.y += ((dragging ? 0 : P.ty) - P.y) * al; // rest while dragging
const x = Math.round(P.x * 1e3) / 1e3, y = Math.round(P.y * 1e3) / 1e3, K = .012;  // settled -> no render; K px->m [d]
off.copy(right).multiplyScalar(-x * 26 * K).addScaledVector(up, y * 16 * K);   // camera -26 / +16
camera.position.copy(camPos).add(off); camera.lookAt(look.copy(O.tgt).addScaledVector(off, .42)); // 42% carry
roomRoot.rotation.set(y * .026, x * .055, 0); exterior.rotation.y = x * .030;   // near yaw/pitch, far yaw
```
Rotate only `roomRoot` as a whole. Fine pointer only. Reduced motion holds the still at `x=.28, y=-.12` [S1330]. Rig order: pathRig → inputRig → camera [S1334].
**Applies here:** the toggle relights the room; parallax gives depth before the first drag.

## 10. Wireframe scan reveal (S1335): blueprint → finished, and the reno sweep
Metres via `S=.0045` [d]: lag 520→**2.34**, rim 135→**.6075**, trail 950→**4.275**, wobble 36/17→**.162/.0765**, freqs ÷S: .011→**2.444**, .007→**1.556**, .021→**4.667**, .013→**2.889**. Origin low-left, outside the silhouette: `(-4,-.4,3.2)`. maxR = diag 8.4×1.3 + 900S = **14.97**.
```js
const mk = () => ({ o: { value: new THREE.Vector3(-4, -.4, 3.2) }, r: { value: 0 }, en: { value: 1 } });
const U = { reveal: mk(), reno: mk(), wire: { value: 0 } };   // entrance + before→after conductors (shared objects)
const BEYOND = `bool beyond(vec3 p, vec3 o, float r, float en){ if (en < .5) return false;
  float w = sin(p.y*2.444+p.x*1.556)*.162 + sin(p.z*4.667+p.y*2.889)*.0765; return distance(p,o) > r - 2.34 + w; }`;
// patchScan(mat, checks): ['reveal'] shared | ['reveal','!reno'] before | ['reno'] after. onBeforeCompile binds U objects as uniforms;
// vertex after <project_vertex>: vScanW = (modelMatrix*[instanceMatrix*]vec4(transformed,1.)).xyz (#ifdef USE_INSTANCING);
// fragment after <clipping_planes_fragment>: if (beyond(vScanW,revealO,revealR,revealE) || !beyond(vScanW,renoO,renoR,renoE)) discard;
mat.customProgramCacheKey = () => 'scan:' + checks; // one program per variant [S0322]
```
**Cage:** `EdgesGeometry(geo, 20)` per mesh (the coarsest graph that keeps the silhouette [S1335]). Bake in `matrixWorld` and each `instanceMatrix`, then concatenate into **one** world-space `LineSegments`. `ShaderMaterial` with additive blending, transparent, `depthWrite:false`, **depthTest on** (off reads as a bright ball), colour `0xbfe3ff`:
```glsl
float d = distance(vW, uO); float rim = exp(-pow((d - uR) / .6075, 2.));
float trail = 1. - smoothstep(uR - 4.275, uR, d);  // spec-safe form of smoothstep(R, R-950, d)
float a = (rim * 1.6 + trail * .34) * uW; gl_FragColor = vec4(uC * a, a);  /* then #include <colorspace_fragment> */
```
```js
const e = Math.min(1, el / 3.4); U.reveal.r.value = (1 - Math.pow(1 - e, 1.35)) * 14.97;  // 3.4 s, easeOutPow 1.35
U.wire.value = Math.min(1, e / .06) * (1 - THREE.MathUtils.smoothstep(e, .72, 1));        // on 6%, burn off last 28%
// e===1: U.reveal.en.value = 0; remove + dispose the cage. Replay rebuilds ONE cage.
```
- The shadow pass ignores the discard: ramp `key.intensity` by `smoothstep(e,.55,1)` and set `shadowMap.needsUpdate=true` at the end. Background `#0e1c2b`→`#f3efe9` over e [d].
- **Reno sweep:** before and after share lag 2.34, so the swap is seamless with no sorting. Before⟷After range: `U.reno.r = t·14.97`. Settled at 1: hide the before set and set `en=0`. Settled at 0: hide the after set and keep `en=1, r=0` (with `en=0`, `!beyond` would discard the before set).
**Applies here:** the signature transition. Warm the shaders first (§13).

## 11. S1334 chaptered scroll world (optional pinned section)
Section `N×100vh` (phone 250vh), sticky canvas `top:0;height:100dvh`, DOM copy above it.
```js
const CH = [ // ledger as data; mobile = own composition [S1334]; poses [d]
 {id:'blueprint',reno:0,cam:{p:[7.6,5.2,8.8],t:[0,.9,-.4],fov:35,mobile:{p:[9.4,6.4,11.6],fov:42}}},
 {id:'before',reno:0,cam:{p:[6.4,3.6,7.6],t:[0,1,-.6],fov:35,mobile:{p:[8.2,4.6,10.4],fov:42}}},
 {id:'after',reno:1,cam:{p:[4.8,2.9,7.2],t:[-.2,1,-.8],fov:36,mobile:{p:[6.6,3.8,9.8],fov:44}}},
 {id:'detail',reno:1,cam:{p:[2.1,1.7,2.9],t:[-.1,1.05,-.4],fov:38,mobile:{p:[2.8,2.1,3.9],fov:46}}} ];
rig.target = clamp((scrollY - top) / (height - innerHeight), 0, 1) * (CH.length - 1); // exact: nav, aria-current, gating
rig.smooth = reduced ? Math.round(rig.target) : damp(rig.smooth, rig.target, 5.2, dt); // render only
// CatmullRomCurve3(pts, false, 'centripetal', .5).getPoint(rig.smooth/(N-1)) for p and t; FOV lerped per segment
```
Measure after `document.fonts.ready` and on RO, and rebuild the curves on width change [S1334]. Never use wheel delta. Drag = a bounded inputRig offset (±.5 θ, ±.18 φ) that eases to 0 on a chapter change.
**Applies here:** an "Our process" beat; otherwise a non-pinned section with slider + orbit.

## 12. Pausing: IntersectionObserver, tab visibility, render-on-demand
```js
new IntersectionObserver(([en]) => { visible = en.isIntersecting; sync(); }, { rootMargin: '150px 0px' }).observe(section);
document.addEventListener('visibilitychange', sync);
function sync() { const go = visible && !document.hidden && !lost;
  if (go && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); } // reset time base
  else if (!go && running) { running = false; cancelAnimationFrame(raf); } }
function frame(now) { if (!running) return; const dt = Math.min((now - last) / 1000, 1 / 30); last = now; // [S1334/S1330/S1335]
  if (update(dt) || dirty) { renderer.render(scene, camera); dirty = false; } raf = requestAnimationFrame(frame); } // idle = no render
```
**Applies here:** lazy-build on the first IO hit with `rootMargin:'100% 0px'` so the hero never pays for 3D [S1334].

## 13. Reduced motion, poster, warm-up, context loss
- Reduced motion (`matchMedia` + `change`): damping snaps, no drift, parallax still, instant toggles, chapters snap [S1334]. The scan shows the finished room; "Show blueprint" shows the **62 %-radius** still (cage + solid) [S1335]. Drag uses a = 1.
- Poster: `<figure>` with an inline-SVG blueprint of the start pose (3–6 KB); canvas `aria-hidden`. Keep the poster if the WebGL check or `new WebGLRenderer` throws [S0205].
- Warm-up: `await renderer.compileAsync?.(scene,camera)` (else `compile`). Set `shadowMap.needsUpdate=true`, render once, then fade the poster out over 600 ms [S0319].
- `webglcontextlost`: `preventDefault()`, `lost=true`, `sync()`, show the poster plus "Reload 3D". Never auto-reload [S1334].
**Applies here:** the story works with no WebGL.

## 14. Performance budget and governor
| budget | phone | desktop |
|---|---|---|
| DPR cap | 1.35 (low 1) | 1.75 [S1334] |
| draw calls incl. shadow (`renderer.info.render.calls` after render [S0319]) | ≤ 60 (S1334 50–90) | ≤ 100 |
| triangles | ≤ 100 k [S0205] | ≤ 300 k |
| shadowed lights | 1 @1024, frozen | 1 @2048, frozen |
| textures | ≤ 4 canvases ≤ 1024² (~22 MB) | same |
| frame | ≤ 16.7 ms (fallback 25) | ≤ 16.7 ms |
Governor [S1334]: after 60 warm-up frames, a 120-frame average above 22 ms steps down, never up: DPR → shadows off (while idle) → aniso 1 → pendants 3→1. No loop allocations [S0319]. Raycast only layer-1 proxies (`layers.enable` [S0315]), once per frame at most.
**Applies here:** DPR is the first phone lever.

## 15. Disposal
Cancel rAF, disconnect IO and RO, remove every listener (stored refs). Traverse once with a `seen` Set: `geometry.dispose()`, each material's `isTexture` values (**`material.dispose()` skips textures** [S0313]), then `material.dispose()`. Then `envRT.dispose()`, `renderer.dispose()`, `renderer.forceContextLoss()`. Dispose the cage when the scan ends [S1335], and shared resources once [S1334].
**Applies here:** replay must not leak.

## 16. Final 3D QA checklist
1. The pinned `THREE.REVISION` opens via file:// with 0 requests and a clean console. Poses composed at 1440×900, 768×1024 and 390×844 [S1334].
2. Orbit extremes: never behind the wall, under the floor or through geometry. Inertia eases.
3. Phone: vertical swipe scrolls, horizontal orbits. No wheel hijack. Keyboard focus is visible and arrows orbit.
4. Parallax motion is unequal, returns to centre, and is off on touch and reduced motion [S1330].
5. Every material and light change is a value change: no runtime recompiles.
6. The cage leads the solid (instances too), no clipped islands, replay ×2 leaves 1 cage and 1 loop [S1335].
7. Before⟷after (slow, fast, scrub): identical end states, reverse = forward.
8. Colour maps sRGB, data maps NoColorSpace. Brass reflects. Floor crisp at grazing angles.
9. No acne or peter-panning. Sun patch on the floor, objects grounded, counters not clipped.
10. Within the §14 budget on a mid-range phone. 0 renders idle, 0 rAF offscreen, no jump after a hidden tab.
11. Reduced motion: stills and instant toggles, with working controls.
12. WebGL failure or context loss shows the poster and the full DOM story.
13. Resize or rotate mid-transition keeps the state, with no horizontal overflow.
14. Teardown leaves `renderer.info.memory` at 0. Untested devices are "unknown" [S1334].
