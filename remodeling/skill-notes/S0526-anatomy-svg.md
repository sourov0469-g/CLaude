# S0526 · wheresryan22/anatomy: Skill Pack Notes (interactive isometric SVG)
All 2,421 lines read; scripts not run.

## 0. Core rule and size
- **The object is the explanation.** Draw a real, buildable machine whose working *is* the concept, never boxes, arrows or labels. Two failures: **too abstract** ("floating plates/slabs standing for *layers*") and **one plain slab**. If you need layers, make them drawers, trays in a rack, **plates on guide pillars**, or cards in a holder.
- **Highly detailed.** At 1× it reads as one machine; at 4× every region has something true. Detail comes from structure (feet, rails, stops, bushings, knobs), not texture. 
- **Sizes:** Figure 40–80 parts (≤1 WebGL layer); Hero 80–150 (2–4h); Epic 6h+ only on request. Inline 30–60 solids / 300–500 paths; test rig 53 solids / ~470 paths.
- **Truth first:** one pure model drives motion, readout, aria and caption.

**Applies here:** The exploded wall must not be four floating slabs. Build a real **wall section on a bench or sill**: bottom plate, studs at true spacing with nail and screw dots, backer board with screw rows, membrane with lapped seams and corner bands, thinset ridges, tile with grout joints, plus a niche or valve stub. Every number is real and confirmed with Elbaz.

## 1. Isometric projection math
- World `[x,y,z]` (x,y floor, z up), units ≈1px of the real thing. Plans are rounded rects `{x,y,w,d,r}` plus circles.
- Camera: **azimuth 45°, elevation 30°** default. Use azimuth 35–60° to face the mechanism (test rig 57°); raise elevation to look into open things (ripple tank 44°; turning dial 40/31). The camera is orthographic with uniform scale and the light is camera-locked.
- GLSL contract: `uCam=(sinA,cosA,sinE,cosE)`; view `V=(cosA·cosE, sinA·cosE, sinE)`; `uK`=screen px per world unit. Derived (orthonormal rows), sx=ox+k·(p·R), sy=oy−k·(p·U):
```js
const R=[-sinA,cosA,0], U=[-cosA*sinE,-sinA*sinE,cosE], V=[cosA*cosE,sinA*cosE,sinE];
// depthOf(p) = dot(p,V): larger = nearer; paint ascending
```
- Fit with `fitProjection(points,W,H,{pad:24–34, azimuth, elevation})` using `boxCorners(plan,z0,z1)` plus the tallest tip. Typical viewBox **600×340–380**. The object fills **55–65%** of the card.
- Moves use `translateAlong(P,[dx,dy,dz])` → `"translate(x y)"`. `axisVector(P,[1,0,0])` maps the pointer to world. **Rotation about z can't be a screen transform**, so rebuild those paths per frame.

**Applies here:** One shared `P` for every plan, elevation and explode, and the Three.js camera should match (orthographic, az 45 / el 30) so SVG and 3D read as one set at a consistent scale. Floor plans can use high elevation or true top view; the explode uses az ≈35–57 with the wall face toward the viewer.

## 2. Parts and layer structure
- **Parts list ≥40, grouped:** base (plate, feet, groove, corner screws, label plate, ruler strip), structure (posts, rails, frame bars, end stops), mechanism (carriage, bushings, springs, plunger, needle), controls (knurled knob, thumb screw), and the subject (**the one lit part**).
- **Solids are prisms** (floor outline extruded up). Each `SolidPaths` paints `fill`(paper) → `shades[0..3]` → `top` → `crease` → `bevel` → `outline`. Helpers: `slabOf(plan,z,h,P,steps 2–4 small / 8–10 large, bevel .3–1.6)`, `cylinder(cx,cy,r,z,h,P,steps 16–20 small / 56–72 big)`, `extrude(ring)`, and round parts on any axis via `lathe/solidOf([[s,r],[s,r,1 smooth]],F,P)`.
- **Painter's order:** base first, then sort by `depthOf(centre)` ascending. **Split wrapping parts** into back half → inner → front half (springs round rods, frames round a carriage). A vertical through a horizontal is drawn in two segments. Taller steps go further back. Moving parts are drawn in their slot inside `<g transform>`; if a mover passes both in front of and behind a neighbour, split the neighbour.
- **Dense figures:** record true shapes and let `A.settle` compute the keys. Never hand-bias them (hand keys left 190/133 wrong pairs on the Raptor). Contacts are flush, tangent or rim-on-surface; nothing is sunk. Everything is held back to the stand.
- **Recipes:** base slab h12 bevel 1.6, groove inset 5, screws inset 10 (ring r2.2 + dot .5), feet = flange r7 + foot r5.4. A drawer opens by `translateAlong`, its box (floor + 3 walls) drawn before the front.

**Applies here:** The wall-assembly order back→front is studs (back halves of anything wrapping them) → backer → membrane → thinset → tile → trim. Fasteners are dots on the face that owns them. Room elevations follow the same rules: cabinets as slabs with bevels, door seams wrapping corners, pulls as posts + bar, the counter as a slab with a bevel.

## 3. Linework weights and fills
- **Calm:** lines **0.6px**. Needle `stroke-width 1.1`. Seamless tone regions stroked 0.4. Wire terminal dots `size 1.2`. Screws and rivets **0.4–0.55** dots. Default dots `.5`; perforations `.45`.
- **Tone hierarchy:** base/feet/floor `lo`; structure `mid`; subject `hi`; exactly **one `lit`** (white edge + lighter top). Grooves, insets and floor grid `faint`; minor ticks `lo`, major `mid`, zero mark and pointer `hi`. Crease `faint` (`lo` on hi parts).
- **Fills:** `--anatomy-paper` = card colour so fills hide what's behind. **Four shades ~3% apart in luminance**, plus a lighter top. The halo is a soft fill under the base and lifted parts (strong in dark, ~30% in light). **Monochrome** unless colour is the subject; fluids are tints of the figure's own inks.
- **Detail sizes:** bevels 0.4–1.6; grooves inset 3–5 from an edge; ruler ticks every 4–5 units, major every 5th (rig: minor 5, major 25), always rooted on a ruler strip's edge; label plate with 3 rule lines (`free:true`). Seams use `k.sideSeam(plan,z,P,steps)` as the slab's `inner` and wrap the corners. Never inset a line 3–6 units from a corner. Vents are closed slots.
- **Lines resolve:** every open subpath ends within **1 viewBox px** of a stroke, dot or outline, or under a later fill. Ticks (≤7px) need one end rooted within 2px. `free` is only for text rule lines, a needle tail or a pointer tip. Otherwise end on an edge or use `fadeLineSvg(points,{fade:[startPx,endPx]})`. Rows of dots and ribs fade by facing: bolts `fade:[.04,.42]`, ribs `[.1,.55]`.
- **Themes:** light ships first; every colour is a token.

**Applies here:** One stroke weight (0.6) everywhere satisfies S0095's "one consistent stroke". Map `lo/mid/hi/lit` to page tokens, with `lit` = the page accent on the selected layer. The halo should be a **flat tone-step polygon** (S0095 bans glows and resting shadows; light comes from flat tone steps). Tile grout joints run edge to edge and stud nail rows end on the stud edges.

## 4. Labels and callouts
- **No blueprint furniture in the drawing:** no leader lines, balloons, dimension arrows, hatching, dashed hidden edges or floating labels. Allow at most **one tiny engraved label** (`faceTextSvg(topMatrix|sideMatrix, text, {size:3,tone:'mid'})`).
- **Card (`plateHtml`):** `Fig n` top-left, short title top-right, interaction hint bottom-left, **live readout** bottom-right (`data-readout`). Legend keys and a **true caption** sit *under* the card. Key marks: `raised|flat|lit|edge|dim|dotted|dashed|red|green|blue`.
- **Readout** is short, in true units, read from where the parts *are* (phase word and number from the same instant): `block 2 · reads 14.0 px`, `taking apart` → `apart · 11 assemblies`.
- Text on a face is drawn in its plane (`sideMatrix`), clipped, cap height ≈0.55 of the window.

**Applies here:** Dimensions (ft-in, layer thickness) go in the readout or legend, never as arrows on the plan. Resolve the S0095 conflict: no "Fig 1" or "01 Gimbal" numbering and no mono. Use a sentence-case title, a hint and a readout in the text face, and name the legend items ("Cement board", "Membrane").

## 5. Interactions: hover, explode, select, drag, keys
- **Pointer:** map width fraction → travel range (or `axisVector`). **Hover previews, press commits.** On touch, a tap acts and `touch-action: pan-y` keeps scroll. Use pointer capture while dragging; release on `pointerup`/`pointercancel`. Parts **never snap**: ease toward the target.
- **Explode** (Raptor): build every piece assembled, tagged with an assembly, and give each a world move vector (e.g. `[0,0,-120]`) along its **real disassembly direction**. The stand doesn't move. **One spring per assembly** (0 = assembled, 1 = apart), **stiffness 64, drag 14.2** (just under critical), 4 substeps per frame. **Stagger 35ms** between starts when opening and in reverse when closing. On a reversal, reschedule only what changes. Offset = projected move × spring as `translate(tx ty)`; remove the attribute at 0. Stagger rules: **whoever is outside leaves first**; if a vector points into another assembly's face, that one leaves earlier; threaded parts share a spring. Every part keeps a home and ends on something when apart.
- **Depth re-sort:** `k = dot(ref,V)+bias`, `lift = dot(move,V)`, frame key = `k + lift·spring`. Re-append DOM nodes (one DocumentFragment) **only when the order changes**.
- **Select/annotate:** hover, arrows or the legend list select one assembly. Selected → `lit` (CSS `.it[data-on]`: hi→lit, mid→hi). Others step down one tone via `[data-focus]`. The readout says what the selected part does.
- **Keys:** arrows step (Shift = bigger), Home/End = extremes, Space/Enter = press or toggle, Escape = release.

**Applies here:** The material explode runs this exact recipe with tile leaving first (outside), outward along the wall normal, 35ms stagger, springs 64/14.2. The before/after drag uses capture + `pan-y` + eased follow (τ≈0.1–0.3s), keyboard arrows, and Home/End = full before/after. A legend list of layer names doubles as the selector.

## 6. Animating the drawing
- **One loop per figure:** `dt` from rAF, clamped to **1/30s**. Exponential follow `x += (target−x)·(1−e^(−dt/τ))`, **τ 0.1–0.3s**. Springs sub-stepped ~240/s, snapping when error and velocity <5e-4 (rig 700/32 press, 320/16 release). Critically damped `settle`: `v += (w²(target−x) − 2wv)dt`, `w=1/seconds`, 4 substeps, snap <1e-4. Write through refs (`setAttribute('d'|'transform')`, `textContent`) and never re-render React per frame.
- **Idle tour:** starts **~1.4s** after coming into view, loops (rig 7.6s: rest, press, pull, release, settle), pauses on hover, focus or press, and resumes **~3.6s** after the last input. It drives the same targets as the user.
- **Shapes that change** (springs compressing, needle turning): rebuild only those paths (<0.1ms per solid; frame script <~1ms). Precomputed frames must move ≤**0.25px** per step.
- **Events:** `burst(age,rise,fall)`, attack 40–120ms; 0 under reduced motion.
- *Self-drawing* isn't in the skill; derive it from these rules. Reveal in painter's order (base → structure → subject), outlines first and fills after. The resting state must pass the line-end rule, and reduced motion shows the finished drawing.

**Applies here:** Floor plans draw on in construction order (slab → walls → openings → cabinets and fixtures → the lit subject), time-based and played once, ending fully resolved. Use a clip-path or `stroke-dashoffset` reveal tied to scroll as linear, or to time on expo. S0095 caps: one signature move, nothing hidden >900ms.

## 7. Accessibility
- `<svg role="img" aria-label>` says what the object is and shows. The stage is `tabIndex=0` with `role="slider"` (or `"group"` plus buttons for discrete choices) and an `aria-label` explaining the controls. `aria-valuetext` is in words (e.g. "Pressed: 129.6 by 34.6 pixels, pulled 80.0 px, leaning 10.6 px"), written **on choice change, never per frame**. The visual readout is kept separate.
- A visually hidden `aria-live="polite"` region announces **phase changes only**: continuous input after ~700ms quiet, empty at load, filled on focus. Focus ring: `outline: 1px solid var(--anatomy-muted); outline-offset: 6px`.
- Reduced motion: jump to targets, no tour, flow or pulse, but input still responds (rig springs go critically damped).

**Applies here:** Every instrument (before/after, explode, plan, room, version switch) is keyboard-complete and the version switch is a real radiogroup or tabs.

## 8. Performance
- Stop when settled or offscreen: IntersectionObserver with `rootMargin:"120px 0px"`, reading `entries[entries.length-1]`. The static geometry is built once at load and only changed paths are rebuilt.
- WebGL: DPR cap **1.5**; draw only while active and onscreen; clear and stop when envelopes <1e-3; gate terms on uniforms; reduced = one still frame. The SVG must read without WebGL (`data-gl` toggles the fallback).
- Dense/3D: **half rate** when the frame-time EMA is >14ms, back to full under 9ms. Budget small ≤6ms at 1440, ≤16ms at 390 with 4× CPU.

**Applies here:** One rAF manager for the page, with each figure's loop paused offscreen. The Three.js room renders on demand (only during drag or ease) at DPR ≤1.5, half rate when slow, and has a static SVG or image fallback.

## 9. WebGL and 3D (for the Three.js room)
- Use 3D only when motion in depth *is* the explanation (a turntable showing every side). Slides and needles stay 2D. A turn by θ equals the kit drawing at azimuth `a−θ` (camera-locked light). Drag angle via `angleAt`, capture after ~1.5°, follow τ **0.12s**; arrows = one division, Shift ×10, Home = index; `touch-action:pan-y`.
- Layers: back SVG → canvas (`position:absolute; inset:0; pointer-events:none`) → front SVG. The effect lives in **world space in the same camera**, with no pops (envelopes), no hard cut-offs (canvas edges 0), and `tonemap` not clamp.

**Applies here:** Matching the SVG camera keeps the room "in the drawing". Keep the materials palette (tile, wood, stone) on the subject and kit greys for the shell. Orbit is bounded, eased and keyboardable, with a finished still for reduced motion and no-WebGL.

## 10. Verify (review checklist)
Nameable object; 30–60+ solids; one `lit`; every line lands at 4×; no leaders; wraps split; textures end or fade; true numbers; eased with a tour; stops offscreen; reduced = still; keyboard works; readable at **390px** (scale the SVG 110–118% in an `overflow:hidden` card). Detail pass: add real parts to any bare region at 4×.
