# G10: extension skills (added for the owner's direction change; read in full by me, by tag)

## S0222 antigravity-design-expert
- Weightless floating elements: layered, soft, diffused shadows, e.g. `box-shadow: 0 20px 40px rgba(0,0,0,0.05)`.
- Spatial depth on the Z axis: backgrounds deep, foreground pops out using CSS `perspective`.
- Glass: `backdrop-filter: blur(12px)`, semi-transparent borders.
- Isometric snapping example: `rotateX(60deg) rotateZ(-45deg)`.
- Motion:
  - ScrollTrigger floats elements into view from the Y axis with slight rotation.
  - Card grids stagger in at `0.1s`, "like dominoes".
  - Background moves slower than foreground on scroll.
  - Preserve native scroll and keyboard.
- Constraints:
  - Reduced motion: animations disabled, static states.
  - Apply `will-change: transform` only around measured animations, then remove it.
  - Do not animate `box-shadow` or `filter` continuously.
  - Keep focus, active and validation feedback immediately visible.

## S0424 hairline-adopt
- Rebuilds an SVG as an isometric line figure on the `@lucasmarkes/hairline` engine, with a pointer gesture.
- It needs that package (it delegates to /hairline-create), so it is NOT usable in a dependency-free single file. Not used.
- Its rule still applies: if a drawing is another company's mark, say so at hand-over.

## S1330 add-mouse-driven-orbit
- Purpose: passive cinematic depth from one damped pointer target, not direct manipulation.
- Pointer handling:
  - Record normalized intent only: `x = clientX/vw*2-1`, `y = clientY/vh*2-1`.
  - Ignore touch.
  - `pointerleave` returns to 0,0.
  - Cache rects with ResizeObserver; never `getBoundingClientRect()` per layer per pointermove.
- Damping, frame-rate independent:
  - `alpha = 1 - Math.pow(1 - 0.055, dt*60)`; clamp `dt` to 1/30 s; reset the time base after resume.
  - Round to 3 decimals and stop writes when settled.
- Split the motion across opposing, unequal layers:

  | Layer | Horizontal | Vertical |
  |---|---|---|
  | camera translation | -26 | +16 |
  | look-at carry | 42% | 42% |
  | near yaw / pitch | 0.055 rad | 0.026 rad |
  | far yaw | 0.030 rad | — |

  Never move everything equally: it reads as a flat poster following the cursor.
- CSS parallax comes from the same smooth pair. Text and controls get SMALLER depth coefficients than the main form. Keep `transform` free for parallax; use clip, opacity or child wrappers for reveals.
- Build the center pose first at every breakpoint; verify the four pointer corners for collisions and exposed edges.
- Reduced motion: a designed still at about x=.28, y=-.12.
- Lifecycle: pause offscreen or hidden; DPR cap 2; teardown cancels the frame and removes observers and listeners.
- Coarse pointer: keep the authored center pose.
- Verify: center plus 4 corners; a fast pass eases rather than snaps; leaving returns smoothly; 390×844 works; one frame loop only; clean console.

## S1338 shaders-cursor-ripples
- Built on the Shaders library (WebGPU, framework subpaths): `<Shader toneMapping="aces"><ImageTexture objectFit="cover"/><CursorRipples decay={7.3} radius={0.6}/></Shader>`.
- That library cannot be used in a dependency-free single file. Its CONTRACT still applies to any ripple I build with raw WebGL (the S0743 "post-processed image" technique):
  - Keep one real `<img>` beneath as the accessible fallback (z-index 0); canvas at z-index 1.
  - Wrapper: `position: relative`, a definite size, `overflow: hidden`, `isolation: isolate`. Canvas `position: absolute; inset: 0`, `pointer-events: none`, `aria-hidden="true"`.
  - Exactly one canvas per media panel.
  - Fade the canvas in only once ready; never hide the fallback before then.
  - Off under reduced motion and when unsupported.
  - Same crop for fallback and texture (cover).
  - Don't animate the canvas size; animate a stable parent.
  - Copy and controls sit above the canvas.
  - Remove any competing flashlight or radial-mask system; never run two systems on one image.
- Verify: the distortion follows the pointer path without a detached circle; links stay clickable; no console errors; the fallback stays under reduced motion.

## S0206 premium-3d-website
- DPR capped at 2 (`Math.min(devicePixelRatio, 2)`).
- Keep post-processing passes low; combine into custom fragment shaders to minimize draw calls.
- Physics or procedural springs for organic hover/drag/click reactions.
- Preloader or loading manager for heavy assets.
- Bake lighting rather than real-time shadows.
- Instancing for repeated meshes.
- No uncompressed models. No real-time shadow maps on mobile.
- Respect reduced motion; keyboard/touch controls; non-WebGL fallback.
- Pause offscreen rendering; dispose GPU resources; profile low-end devices.
- Shader materials need an animation loop updating uTime; they don't animate by themselves.

## S0743 template/webgl-experience
- One self-contained file, zero external requests: inline the shader source and embed textures as `data:` URIs.
- Pick ONE technique:
  - fragment-shader field (fbm noise, flow fields; the cheapest);
  - raymarched SDF scene;
  - instanced geometry;
  - post-processed image: sample a data-URI texture and distort or dither it.
- Always:
  - `alpha:false`; DPR clamped to 2; viewport set on resize.
  - A graceful message or fallback if the context is null.
  - Compile shaders with `getShaderInfoLog` logging.
  - A fullscreen triangle with a rAF tick.
- Overlay: headline ≤ 14ch plus one supporting line. Never cover the whole canvas: the visual is the hero.
- P0 self-review: ~60fps; `getError()` clean after the first frame; resizes crisply; readable overlay contrast over the brightest frame; degrades gracefully.

## S1344 webgl-3d-object
- Use only when a section needs one strong 3D object with real geometry, PBR material (MeshStandard/Physical), a perspective camera, a directional key light plus ambient/hemisphere fill, and a rim light. Requires three.js.
- Recipe values:
  - Renderer: `antialias:true, alpha:true`; DPR `min(dpr, 1.75)`; ACES tone mapping, exposure 1.05.
  - Camera: PerspectiveCamera(38, …) at (0, 0.15, 5.2).
  - Lights: ambient 0.38; key 2.15 at (3.4, 4.2, 4.8); rim 0.82 at (-4.2, 1.2, -2.8).
  - Shadow plane: ShadowMaterial opacity 0.18.
- Material defaults:
  - premium metal: metalness 0.45–0.7, roughness 0.25–0.45;
  - ceramic: metalness 0–0.15, roughness 0.38–0.62;
  - emissive intensity 0.12–0.35.
- Motion: slow continuous rotation; float 0.04–0.12 units on Y; reduced motion gives a still frame.
- Avoid:
  - CSS 3D pretending to be WebGL;
  - unlit materials;
  - bloom or particles hiding the form;
  - high DPR or huge shadow maps on mobile;
  - an object competing with copy or CTAs.
- Clean up geometry, material, renderer, listeners and rAF.
- DECISION: a three.js dependency (~150 KB gz) is not justified for a roofing homepage. 3D depth comes from S0743 photographic WebGL plus layered parallax (S1330, S0204, S1321) instead.

## S0452 MengTo/matterjs
- Engine/Render/Runner setup with `Composite.add` and `wireframes:false`; optional MouseConstraint.
- Cleanup: `Runner.stop`, remove the canvas, clear the world.
- Ask: viewport scaling, renderer type, drag, offscreen pause.
- Requires matter.js (~80 KB). DECISION: not used (no section's job needs 2D physics).

## S1377 falling-leaves (depth-layered canvas particles; applies to any drifting weather)
- Make the shape read as itself:
  - Tumble on its own long axis: `ctx.rotate(roll); ctx.scale(Math.cos(spin),1)`, with two axes (`roll` in-plane, `spin` through the plane), each at its own per-particle rate.
  - Couple the slip to the tumble: `x += sin(spin)*slip*dt`, never an independent sine on x.
  - Bake two faces, the back duller and paler, and pick by `cos(spin)<0`.
- Vary EVERY parameter per particle (fall, tumble, roll, slip, phase, scale, opacity). A shared value reads as a texture within about 2 s.
- 2-D recycle: respawn above the top at a new random x, and wrap x.
- Density: on-screen density = count ÷ band area. Scale an authored count by viewport area: `k = clamp(sqrt(W*H/(1440*900)), .5, 1.3)`.
- Layers:

  | Layer | Scale | Fall | Opacity | Note |
  |---|---|---|---|---|
  | far | .3–.5 | slow | .22–.40 | behind content |
  | mid | .5–.85 | medium | .46–.78 | the body of the effect |
  | near | 1.05–1.9 | fast | .50–.82 | few, optionally blurred, drawn OVER the type |

  The near layer crossing in front of the type is THE depth cue: 2–3 particles, not a curtain.
- Colour: sample each particle from a small ramp; never one colour for all.
- Cost:
  - One `drawImage` per particle from a pre-rendered sprite; never re-path per frame.
  - Pause on `document.hidden` and offscreen (IntersectionObserver); reset `lastTime` on resume.
  - Clamp `dt` to about 1/30; DPR cap 2.
  - Size from a ResizeObserver on the root; guard against a zero viewport.
- Reduced motion: ONE composed still frame (do not just hide the particles).
- Nothing may depend on the pointer: the composition must be complete on touch and keyboard.
- Verify: per-particle variance; density scales with area; paused when hidden; reduced-motion still; console clean at 390 and 1440.

## S0489 rossark-motion-skill (drawn things alive: SVG renders, weather, lights, icons)
Principles:
1. Never teleport; interpolate everything.
2. Calm by default: timed motion with strong curves, no bouncy overshoot unless the brand is bouncy.
3. Small amplitudes; when unsure, halve.
4. Arcs and pivots: each moving part is its own layer rotating around its joint (stem base, hinge, hook). Straight-line sliding looks mechanical.
5. Overlap and follow-through: the same wave with a phase delay that grows along the chain; tips move later and further.
6. Repeated items get a seeded phase, speed (±20%) and size from `seeded(i)`. Never `Math.random()` per frame; never everything in sync; things on one screen breathe out of phase.
7. One main action per scene plus 2–3 idle loops; side things stay quiet.
8. Opacity only to appear or disappear, never to half-dim.
9. The layout never moves; motion lives inside the drawing (transforms on groups).
10. Reduced motion means still: loops freeze on a good frame 0; one-shots show their final frame.
11. Nothing runs unseen.
12. Anything under about 100 ms flickers at 30 fps. Blink: close 110 ms, hold 30–50, reopen 190 ms.

Engine (the web version is the same math on rAF):
- Clocks: one loop clock or one-shot clock per character, group or scene.
- Tracks `[ms, value, 'out'?]`; the last key equals the first.
- Use `flow` (no stop at keys) for chains of poses; `track` for single moves.
- Helpers: `wave` (-1..1), `loop` (0..1), `bell`, `seg(t,a,b)`, `seeded(i)`.

Curves:
- travel: `cubic-bezier(0.77, 0, 0.175, 1)`;
- open or arrive: `cubic-bezier(0.23, 1, 0.32, 1)`;
- only leaving or falling uses ease-in;
- endless loops (rain, gears) are linear.

Recipes:
- Plant or tree sway: 1.5–4° around the base over 3–6 s, leaves on seeded phases.
- Cloth or flag: a wave travelling along the length, growing from the fixed edge.
- Fire: lean 2–4° plus a 3–6% stretch on two periods (700 and 1100 ms); no jitter.
- Smoke or steam: rise 8–14 units with a `bell` fade, 2–3 wisps out of phase.
- Water: ripple rings grow 0→1 and fade with `bell`; floats bob 1–2 units and rock 2°.
- Rain or snow: seeded `loop`s with ±20% speed and x drift; linear.
- Clouds: drift over 20–60 s, with layers further back slower; sun rays one turn per 30–60 s.
- Lights: a glow grows 2–5% over 2–4 s; stars twinkle at seeded times; screens flicker rarely.
- Gears: linear, by tooth ratio. Clock hand steps with ease-out; colon blinks every 0.5 s.
- Phone buzz: bursts of ±3° (4 cycles in about 0.45 s), then a pause.
- Vehicles: body bob 0.5–1 unit; wheels linear; scenery in parallax loops; never shake the frame.
- Waiting-to-tap jiggle: 1.5–3% squash and widen on a 200–350 ms beat, the bulge trading sides.
- Icon or logo: plays once on appear, then rests. No endless loops on UI chrome. Press = 0.97 scale on the button.
- Chart: one-shot draw-on, bars staggered 40–80 ms with ease-out, numbers count up with ease-out, final frame = the data.
- Scene: a one-shot action on appear, then idle loops. Beats as data windows via `seg`, overlapping a little; holds the final frame.

Interface rules:
- Frequency decides amount: hundreds per day = none; tens = minimal and fast; now and then = standard; rare = full delight.
- Every motion has a purpose: where from or to, a state change, confirming a touch, explaining, celebrating.
- Shared elements travel, never teleport; a label that changes meaning morphs.
- Durations: press 100–160 ms; popovers 125–200; menus 150–250; sheets and modals 200–500. Keep interface moves under 300 ms.
- Curves: entering = strong ease-out; moving = strong ease-in-out; constant = linear; never ease-in on something awaited.
- Asymmetric timing: exits are faster than entrances.
- Nothing appears from scale 0: enter from 0.9–0.97 with opacity.
- Interruptible: continue from the current value.
- Glitches (seams, dropped frames, loop-seam jumps) cost trust.

Performance and drawing traps:
- Many items go in one SVG or one canvas from one clock.
- Unique SVG ids (clip paths are global).
- Two anti-aliased edges on one line show a hairline seam: draw ONE outline.
- Overlapping subpaths can punch holes: fill parts separately.

Workflow:
1. List what could live in the drawing.
2. Pick ONE main action plus 2–3 idle loops.
3. Split into layers at their pivots.
4. Put the numbers in tokens.
5. Check frame 0, the final frame and the loop seams.
