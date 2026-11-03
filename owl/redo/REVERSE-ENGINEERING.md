# Owl Roofing redo · Step 1 · Reverse-engineering dossier

**Brief:** `OWL-REDO-BRIEF.md` (owner's order, 2026-11-03 10:50). Step 1 only: no design, no HTML. Stops here for Muse.

## How the evidence was gathered (and its limits)
Each reference was loaded live in this session in Chromium at 1440×900 and probed by script
(`owl/redo/evidence/probe.cjs`, `vjourney.cjs`, plus reference-specific scripts). No bot wall was bypassed.
- **Frame by frame:** real wheel input in fixed steps (450 px, 700 ms settle) with a frame per step, so smooth-scroll
  libraries behave as they do for a visitor. Virtual-scroll sites (WebGL, no page scroll) were walked by wheel gestures
  with frames after each gesture.
- **Timing:** one 300 px wheel tick, scroll position sampled every frame → time to 50% and 95% of the move; hover
  transitions read from computed styles; animation curves read from the shipped bundles.
- **Cursor:** elements that follow the pointer searched for and their lag measured; screenshots with the pointer left,
  right, top and on the main object; press and click tested where the site invites it.
- **Code level:** every script the page loaded was read for libraries, WebGL contexts, render settings and the actual
  configuration values (lerp, ease curves, scrub, pin, fov, loaders, physics, audio). Values quoted below are verbatim.
- **Evidence files:** `owl/redo/evidence/<ref>/` (contact sheets and `digest.json`).

**Limits, stated plainly:**
- WebGL sites ran on a software renderer (SwiftShader). Igloo's later scenes (manifesto, portfolio cubes) did not render
  past the transition here; they are described from the shipped config and code, marked **[code]**.
- Quiet Cubes stalled on its "Please wait…" loader today; its configurator gate is from this session's earlier capture
  (`earlier-session-sheet-quietcubes.jpg`), and nothing after the gate was ever seen.
- Cowboy's newsletter modal blocked scrolling half-way today; the lower page is from the earlier capture.
- Lusion loads, but the proxy refuses its Cloudflare Turnstile script; nothing was bypassed and the page rendered without
  it.
- The first pass was desktop only; the phone state (390×844, touch) was captured afterwards for the pinned-story
  references (AirPods, Scout, Cowboy): see "Second state: phones".

**Evidence tiers (⟦S0079⟧):** within each reference, **Frame by frame** and **Code level** statements are **Measured**
(seen in the captured frames, or read verbatim from the shipped code) unless marked **[Derived]** (computed from
measurements) or **[Inferred]** (a judgement, never stated as fact). **Why it works**, **What transfers** and the **Owl
version** are design judgement: all **[Inferred]**. Library names are fingerprints from bundle strings and globals:
evidence, not proof of authorship.

---

## How Owl differs from Elbaz (Step 2, stated before the direction boards)
Elbaz Construction, as the bank index records it, is editorial craft: a portrait showreel hero ("Built properly. Permitted
correctly. Finished in record time."), a licence and coverage strip, video service tiles, drag before/after sliders, an
eight-stage process stamped with week ranges, financing before scoping, then reviews and a call to action, on a light
WordPress/Elementor page that curates finished rooms as a showcase. Owl's world comes from its own references instead:
explorable depth (Igloo: a roof you open, not a tile you watch), crew warmth (Cowboy: the crew tells the job in its own
footage, not a curated gallery of finished spaces) and engineering doctrine (Longbow: a written standard and plain numbers,
not a promise of speed). So the Owl redo never uses Elbaz's showreel-tile grid, its week-stamped process or its
before/after slider as a centrepiece; each of the three Step 2 directions states its own one-line difference on its board.

## 1. Igloo Inc: interactive 3D depth and play (the depth bar)
**Evidence:** `evidence/igloo/` (intro, mouse, wheel and click sheets; digest).

**What it is, frame by frame:**
1. **Load (0-3 s):** a grey field; the igloo appears as a white **wireframe cage** with construction lines.
2. **Materialise:** the cage resolves into a photoreal igloo on a snow terrain under fog, mountains behind, small white MSDF labels in the corners (the logo and short data blocks). There is no DOM text at all: every label is drawn in
   WebGL.
3. **Idle:** the scene never stops (snow drift and film grain change 90% of pixels per second with no input), so it
   always feels alive.
4. **Cursor:** moving the pointer pans the camera (left vs right frames shift the igloo and the ridge line: parallax).
   Blocks near the pointer **lift out of the dome** with light bleeding through the seams and tiny data labels on their
   faces; on press more blocks lift.
5. **Click:** "Click to explore" opens the igloo: every block lifts on a band of light.
6. **Wheel:** a gesture triggers a scene transition: the camera dollies, fog rises and a **chromatic-aberration** pass
   splits the image into colour fringes, then the next scene. **[code]** The scenes are: hero ("Scroll down to
   discover."), a manifesto, then the portfolio: each company is an object frozen inside an ice cube (`obj:"cube3",
   innerobject:"pudgy"`); clicking a cube opens its interior: WebGL text (`IBMPlexMono`, 14 px, title colour `#67707E`,
   text `#A1AAB7`) with its own smoothed scroll (`scrollTargetY`).

**Code level:**
- Svelte shell + Three.js r165, 2 WebGL contexts, 1.77 MB JS. GLTFLoader + DRACOLoader (compressed geometry), KTX2
  textures, an EXR worker (HDR lighting), an MSDF text worker, an audio worker with named UI sounds
  (`ui-short.ogg`, `ui-long.ogg`, `manifesto.ogg`, volume .3).
- Wheel is captured (`preventDefault`) and fed to a virtual position; there is no page scroll (document height = 900).
- Hover is a `Raycaster` over the meshes with a `performant` bounding-sphere mode; options `hoverCursor`, `grabCursor`.
- Post-processing: a chromatic-aberration shader (`CA_ITERATIONS=5`, blue noise "to hide the seams"), bloom, depth of
  field, god rays and FXAA classes are all present.
- Camera `fov:22` and `fov:30`: telephoto lenses **[Inferred: chosen to compress depth, so the scene reads like a diorama]**.
- Motion is GSAP timelines with **custom curves**: `igloo_ease_1 = M0,0 C0.662,0.073 0.047,1 1,1` (holds, then
  snaps), `entry_ease_2 = M0,0 C0.388,0.082 0.924,0.862 1,1`, `entry_ease_3` (two-stage). The intro morphs the cage to
  the solid igloo from 1.1 s over 2.25 s on `igloo_ease_1`. A shader `uIntroMaterialize` drives the materialise.
- UI grid constants: `gridSize:125`, `topMargin:90` (desktop), smaller steps for low-height and mobile.

**Why it works:** one object, made of parts, that responds to the cursor before you scroll. The depth is real (a lit 3D
model in fog), the play is discovery (parts lift where you point), and every transition costs the eye something
(aberration) so it feels like travelling, not paging.

**What transfers to a roofing company:** an object built of parts that the visitor takes apart with the pointer. A roof
IS that object: courses of shingles over underlayment over decking over rafters.

**The concrete Owl version: "Open the roof".** A real-geometry roof (true pitch, true course spacing) of a Twin Cities
house, lit and textured from Owl's own footage (the shingle texture from the GAF bundle and finished-roof frames). The
pointer pans the camera a few degrees; shingle courses near the pointer lift on their nails, showing the layer beneath;
press or tap opens the roof into its layers like Igloo's blocks. Labels name only what Owl names (the Wise Check's attic,
leaks, photo report; "ice and water protection where it matters"); every other layer gets its plain trade name. The
transition curve is Igloo's mechanism (hold, then snap), with Owl's own timing.

**Never transfers:** the igloo, snow terrain, crypto copy, the mono-only type, sound on by default, a site with no DOM
text (Owl's words stay real, selectable HTML), a full-site virtual scroll.

## 2. Lusion: flow
**Evidence:** `evidence/lusion/`.

**Frame by frame:**
1. **Load:** a black/white diagonal wipe with a 00 counter.
2. **Hero:** a rounded dark card inset on a pale page, holding a 3D cluster of glossy cross-shaped pipe pieces (white,
   black, electric blue). The pointer pushes the pieces (left vs right frames: the cluster shifts and rotates away).
3. **First scroll:** the card slides up and away as "Bold Ideas, Brought to Life" arrives word by word.
4. **The carrier:** a blue 3D ribbon enters from the left, sweeps across the copy and **leads the eye into the next
   media card**; the card arrives already bent along the ribbon's curve.
5. **Reel:** "PLAY REEL" sits over a card that **deforms as it scrolls** (corners bend like cloth), cycling project
   clips under the same two words; then "Featured Work".

**Code level:** Astro + Three.js r158 in one hoisted 1.2 MB bundle; 1 WebGL context over 3 canvases; ~100 shader
materials; `MeshPhysicalMaterial` for the glossy pieces; SplitType for word splitting; post-processing; AudioContext. A
custom engine: `pagesManager`, `scrollPane` with `targetScrollPixel` (lerped), standard wheel normalisation
(`PIXEL_STEP`, `LINE_HEIGHT`, `PAGE_HEIGHT`); `preUfxContainer` / `postUfxContainer` **[Inferred from the names: DOM sections composited into WebGL]**. The page is virtual (document height 900).

**Why it works:** nothing is a stacked block. Each section is handed to the next by a moving thing (the ribbon, the card),
so the page reads as one journey.

**What transfers:** one carrier that moves the visitor between sections, and media that arrive already in motion.

**The concrete Owl version: the crew's own video is the carrier.** The hero's real crew footage plays full-bleed, then on
scroll it shrinks into a card that travels down the page and becomes each section's media, cutting to the clip that
belongs there (on the rafters → bundles going up → decking → walking the finished roof → the wrap). The card's corners
bend slightly as it travels (Lusion's deforming card, held to a few degrees). Nowhere does a drawn line carry the page.

**Never transfers:** the pipe cluster, the blue ribbon, Lusion's type and palette, a whole-site WebGL page.

## 3. Longbow Motors: numbered engineering doctrine
**Evidence:** `evidence/longbow/`.

**Frame by frame:** a dark cinematic hero video under "Speed of *Lightness*" (sans with a serif-italic accent word); a
doctrine block ("The longest tradition in *motoring*", "Made where it was *perfected*"); "Three things we simply won't
compromise on" with three numbered principles (Simplicity, Beauty, Lightness), each one short paragraph; a press row; a
model hero per car (Speedster, Roadster) with a **spec strip of hard numbers** under it (895 kg · 3.5 s · 275 mi ·
£84,995 · 150); "Beauty and the *Beast*"; "Choose your Longbow" as a split of the two cars.

**Code level:** almost no motion code: 583 KB, no GSAP, no smooth scroll (a wheel tick lands in 40 ms), 1 hero video,
6 fixed elements; hovers are colour only (`color 0.24s cubic-bezier(0.16,1,0.3,1)`). Fonts: Montserrat + Cormorant
Garamond.

**Why it works:** conviction is carried by numbered principles and by numbers, not by effects. The restraint is the
message.

**What transfers:** a doctrine of numbered principles, each one backed by a fact you can check.

**The concrete Owl version: "Three things Owl won't compromise on."** 01 We answer: (651) 977-6027, Mon–Sat 08:00–18:00.
02 We protect the nest: the wrap, 3 cleanup passes (crew, magnet, project-manager check). 03 We get it right: the
10-year workmanship guarantee and manufacturer warranties. Under it, Owl's spec strip: 5.0 · 90+ reviews ·
29 towns · licence #BC809662 · GAF Systems Plus Certified · founded 2025. Each principle sits on Owl's own photograph.

**Never transfers:** the cars, serif italics, gold on black, "Speed of Lightness", the British-heritage voice.

## 4. Cowboy: crew-fronted warmth
**Evidence:** `evidence/cowboy/` (today's and the earlier capture).

**Frame by frame:** "Riding reinvented" over a real rider on a real street (video); product heroes ("The easy-rider",
"The explorer") with spec pills, an "Explore" hotspot on the photo and carousel arrows; "Shockingly smooth" on a dusty
track; press tiles; "Power so natural, you're always in flow" where the video opens through a **stepped, pixel-staircase
mask** that widens as you scroll; a feature list beside a real photo whose active item (Crash detection) shows the actual
alert message bubbles; "ride alone" over a mosaic of real riders; "Kilometres ridden together" on a map; "Design in
Belgium. Assembled in France."; pinned full-bleed chapters **01 Origins / 02 Quality / 03 Servicing / 04 Protection**
with a progress bar along the bottom; "Keep exploring" cards.

**Code level:** React (`createRoot`) + Shopify, 11 videos, 8 fixed and 3 sticky elements, 11 clip-paths (the staircase
mask), native scroll (22 ms). The string `rapier` appears in a shipped bundle **[Inferred: physics, use unknown]**.

**Why it works:** people in real light do the persuading; the one named system (AdaptivePower) is shown working in a real
moment (the crash alert), never described in the abstract.

**What transfers:** the crew and the customers in real footage; a named system shown in a real moment; chaptered proof.

**The concrete Owl version:** the hero is Owl's crew at work (Owl's own video). Owl's named system is **Protect Your Nest**:
shown in one real moment each (the wrap on a real house, Owl's own photo). Owl's chapters: 01 The crew, 02 The work,
03 The cleanup, 04 The guarantee, pinned full-bleed with a progress bar. "Kilometres ridden together" becomes Owl's own
service-area map with its 29 towns. The rider mosaic becomes the families and crew, from Owl's own photos.

**Never transfers:** bikes, the press strip (Owl has no press), Cowboy's type, a family-group hero (the annex says take the
warmth, not the group shot).

## 5. Scout Motors: product world
**Evidence:** `evidence/scout/`.

**Frame by frame:** full-bleed hero film; "Scouts always come back."; a new truck coming down a dirt road at dusk,
"An off-road icon reborn."; then, **in the same framing, the image crossfades to grey and becomes the original 1960s Scout**
("The one that started it all."): one composition across two eras; "American From Day One" with **archival photo cards
orbiting the giant headline like a wheel** as you scroll; documentary photography (a lake, fishing, camping, a beach); a
pinned night drive with headlights; "For The Scout In All Of Us." in giant type over a campfire; "Experience the reveal
event": a player with a **filmstrip of thumbnails**; "The duo that does it all" split cards; "In it for the long haul."

**Code level:** Astro (+ some React and Svelte), Lenis smooth scroll (`wheelMultiplier:1`; a wheel tick reaches 50% in
97 ms and 95% in 492 ms), 4 sticky and 14 fixed elements, 25 clip-paths, 2 canvases, 3 videos (VP9 webm for the
camp film), Swiper for the filmstrip, `pin:1` scenes; hovers `0.2s cubic-bezier(0.38,0.005,0.215,1)`. Component names
from the earlier capture: `Sequence`, `Viewfinder`, `HomeTreadmill`, `HomeCamp`.

**Why it works:** the product is always shown in its world (the road, the lake, the camp), and time is shown by
dissolving one image into another in the same frame.

**What transfers:** the product shown in use in its real world; a same-frame dissolve; a film plus a filmstrip of more
proof.

**The concrete Owl version:** the product is a roof on a Twin Cities house through the year. The film is Owl's own footage
with Owl's YouTube channel as the filmstrip (Real Customer Experience; Why Choose Owl Roofing?; 7 Questions Every
Homeowner Should Ask; Best Shingle Colors for 2026). The same-frame dissolve is used only where Owl's own footage
gives one frame at two stages (bare rafters → decking → shingles), labelled as stages of the work, never as one job's
before/after (no Owl before/after pair exists).

**Never transfers:** the vehicles, the RESERVE bar, orange, invented heritage (Owl was founded in 2025).

## 6. Apple AirPods Pro: pinned chapters
**Evidence:** `evidence/airpods/`.

**Frame by frame:** the product alone on white; it **gives way to a dancer's silhouette** inside expanding sound rings;
"Get the highlights": a horizontal video carousel with a dot pager and play/pause; "Take a closer look"; a pinned stage
where "The best thing you've never heard" sits inside an **iridescent ring that expands with scroll**; numerals as events
("2x more", "4x more"); an exploded view of the driver; silhouettes with colour sweeps ("For your ears only");
"Introducing heart rate sensing"; a ring drawn around the ear.

**Code level:** Apple's own framework, 3.2 MB JS, 16 videos (scrubbed frames and in-view films), 2 WebGL contexts, 12
sticky stages, 77 clip-paths, `cursor:none` on some media, native scroll (22 ms); hovers `0.32s cubic-bezier(0.4,0,0.6,1)`.

**Why it works:** one idea per pinned screen; the visual changes while the reader stays put, so scroll feels like turning a
dial, not moving down a page. One claim, one proof.

**What transfers:** a pinned stage where scroll turns a dial on one subject; a giant numeral as the headline of a fact.

**The concrete Owl version:** Price My Roof as a pinned chapter: the visitor's own footprint and pitch turn into squares
(the numeral is the event), and the roof geometry on stage re-pitches as they move it. And the Protect Your Nest
system at full photographic scale as pinned beats: the wrap (Owl's photo) → the cleanup → the aftercare box (Owl's photo)
→ the guarantee seal, one real image and one number per beat.

**Never transfers:** product renders, Apple's layouts and type, footnote density, 12 pins (Owl gets two pinned chapters at
most).

## 7. MERSI: split-cover chapters
**Evidence:** `evidence/mersi/`.

**Frame by frame:** each project is a full-screen cover **split down a vertical seam, a different photograph in each half**
(Hamelin: a staircase left, a living room right). A small terracotta card sits **on the seam** with name, place, type and
year. On a wheel gesture the next project (Neya) **arrives half by half**: the new image rises into the left half first,
then the right; the card changes with it. The covers cycle; there is no other content between them.

**Code level:** Webflow + GSAP 3.13 + Lenis (`lerp:.06`, `wheelMultiplier:.8`: slow, heavy, deliberate), ScrollTrigger-
style `scrub:1` and `pin`, SplitText; a document 900,425 px tall that starts in the middle so the cycle never ends;
41 clip-paths (the half-masks); eases `expo`, `power4`, `power3.inOut`.

**Why it works:** the seam is the navigation: you always know where one chapter ends; two images per chapter give
place and detail at once.

**What transfers:** service chapters as split covers with a card on the seam, changing half by half.

**The concrete Owl version:** the Services chapters (Roof replacement, Storm damage, Repair and the Wise Check, Siding,
Gutters / windows / doors), each a split cover of two real images (Owl's own frames first; stock only where none exists,
labelled "Illustrative photo") with a small amber card on the seam: the service, what Owl includes, and Call.

**Never transfers:** interiors, the terracotta, MERSI's logo mark and type, an endless cycle (Owl's chapters end).

## 8. Lando Norris: archive behaviour
**Evidence:** `evidence/lando/`.

**Frame by frame:** a pale contour-line field that wipes in; a giant manifesto with lime accent words; a scattered
archive collage (personal photos at different sizes) that drifts at different speeds on a pale contour ground; "ON TRACK /
OFF TRACK" split over his own helmet photography; **HELMETS HALL OF FAME: a strict dark grid, one helmet per cell, each
with a year tag**; merchandise; partners; a **fanned stack of social cards**; a closing card with the signature.

**Code level:** Webflow + Lenis (`lerp:0.1`), Three.js r174 with 3 WebGL contexts over 21 canvases, GLTFLoader (3D models), Rive (`rive.wasm`) for drawn animation, SplitText, `scrub:0.5` and `scrub:1`, eases `expo.inOut` and
`power4.inOut`.

**Why it works:** the archive is a curated set of real objects, each dated, in a strict grid: the collection itself is
the proof. The loose collage and the strict grid play against each other.

**What transfers:** a real, dated archive in a strict grid; a loose drift of real photos against it.

**The concrete Owl version:** Owl's archive is what Owl really has: its YouTube films (dated), its crew and family photos,
its community work (Quincy House, Habitat for Humanity), and the brands its materials page lists. A strict grid
with dates and hover previews; nothing undated, no invented jobs.

**Never transfers:** the lime, helmets, the signature, the McLaren context, the fan-card stack as-is.

## 9. Graza: animation quality bar
**Evidence:** `evidence/graza/`.

**Frame by frame:** a photographic kitchen hero video ("Extra Virgin Olive Oil makes everything better."); product in
glass on acid green; then drawn characters appear on cream as you scroll (olives with faces, a hand-drawn cook) while
**one drip falls down the page with the scroll**; "Olive oil so fresh, you can taste it."; a giant GRAZA wordmark; the
verb-named products (Drizzle, Sizzle, Frizzle); "So many ways to Graza" with cooking verbs; a recipe grid.

**Code level:** Shopify, 16.5 MB JS, 10 videos, Lottie (188 references: the drawn characters), `pin:"#intro-drop"`
(the pinned drip **[Inferred from the selector name]**), `scrub:1`, Swiper, native scroll.

**Why it works:** every animation is made for this product only and says something (the drip = freshness falling); there
is one at a time.

**What transfers (the bar only):** an animation that could belong to no other company, coupled to the scroll, one per
section.

**The concrete Owl version:** motion made only from Owl's own material: the kept logo's owl eyes follow the pointer
(identity micro-animation, logo artwork unchanged); a shingle course that lifts on its nails under the cursor (the roof
object above); the crew's footage scrubbed by scroll. Drawings may support; they never star.

**Never transfers:** olive characters, Graza's type and colours, the verb-naming system.

## 10. Quiet Cubes: configurator structure
**Evidence:** `evidence/quietcubes/` (the gate is from the earlier capture; today the site stalled on its loader).

**Frame by frame (what was seen):** the first screen is the instrument: "Select Your Pod" with four pills, each a small
product image plus a label (Office, Home, Outdoor, Nursing), on a dark gradient. Every captured frame held this state:
the visitor's first act is a choice. What follows the choice was never seen and is not described.

**Code level:** Webflow + GSAP 3.15 + ScrollTrigger + Lenis (wheel tick: 50% in 114 ms, 95% in 488 ms), 27 sticky and
14 fixed elements, `scrub` driven per element, SplitText/SplitType, Lottie, Swiper, separate horizontal and vertical 4K
videos (one per orientation), `cursor:none` and `grab` (a custom cursor).

**Why it works:** the site exists to operate one instrument; the visitor states their case before anything else.

**What transfers:** the first act is a choice about your own case, made on image pills, and the page answers it.

**The concrete Owl version: the Wise Check instrument.** "What's going on with your roof?" as image pills from Owl's own
material (storm or hail, a leak, an older roof, a new roof). The answer is the part of the Wise Check that applies
(attic inspection; heat-sensor leak detection when leaks are suspected; full photo and video documentation), then Call
or Text. Price My Roof sits beside it as the measuring half. Never a blocking gate, never a price Owl has not stated.

**Never transfers:** the pods, the dark luxury gradient, the gate that blocks content.

## 11. Bruno Simon: exactly ONE game-like section
**Evidence:** `evidence/bruno/` (load sheet and play sheet).

**Frame by frame:** a neon ring draws itself on a grid floor; a diorama materialises inside it (tree, bench, lamp, the
red car); "Click to start" handwritten with an arrow and a sound icon; the lighting shifts between blue and orange
while you wait. Click: the ring's edge dissolves in light and the camera drops into an open night world. Arrow keys
drive the car into giant 3D letters (BRUNO SIMON) that **topple with real physics**; crates scatter; an object bursts
into flame on impact.

**Code level:** Three.js r183, 1 WebGL context, GLTFLoader + Draco + KTX textures, **Rapier** physics, **Howler** audio,
custom shaders, GSAP-style eases (`power2.out`, `power4.inOut`); 5.5 MB JS.

**Why it works:** the start ring teaches the controls in one glance; the world rewards poking at it; physics makes every
collision feel earned.

**What transfers:** one small world with a clear start, real physics and things that react when you hit them.

**The concrete Owl version: the magnet pass.** Round two of Owl's own 3-part cleanup, made playable: a yard textured
from Owl's footage, Owl's rolling roofing magnet driven by arrow keys or pointer drag, and nails that jump to the magnet
with physics. A start ring that says what to do; sound off by default; a count of nails; the phone and text action
always visible. One section only, with a keyboard path and a reduced-motion path.

**Never transfers:** the car, the neon world, the playground props, sound on by default.

---

## Second state: phones (390×844, touch): the proven pin behaviour
**Evidence:** `evidence/{airpods,scout,cowboy}/phone-390-pin.jpg` and `phone-pins.json` (`mpin.cjs`: every sticky
element taller than half the viewport, tracked across the page).
| Reference | Pinned stage on a phone (Measured) | Held for [Derived] | What plays while pinned (Measured) |
|---|---|---|---|
| Scout | two stages, 844 and 886 px tall, `top:0` | scroll 300→4,500 and 5,700→9,900: about 5 screens each | the truck drives toward the camera frame by frame; the archival lake scene holds while its copy changes |
| Cowboy | one chapter stage, 844 px, `top:0` | scroll 9,600→12,300: about 3.2 screens | full-bleed photos swap through 01 Origins → 04 Protection under a four-segment progress bar |
| AirPods | one stage, 844 px, `top:0` | about 1 screen at this sampling step | the sound-ring scene |
**The proven behaviour [Derived from all three]:** a full-viewport sticky stage (`position:sticky; top:0`, one viewport tall)
inside a taller scroll track; the visitor's own scroll plays the scene; when the track ends the stage releases and the
page scrolls on. No scroll hijack: native scroll everywhere on phones, so it can never trap the reader (⟦S0448⟧).
Cowboy adds the progress bar that tells you how much is left.

## Cursor and SVG: what the references actually do
**Cursor (Measured):** none of the 11 ships a DOM element that follows the pointer (the follower search found none). The
pointer acts on the **scene** instead: Igloo pans its camera and lifts the blocks it is over (`Raycaster`, `hoverCursor`,
`grabCursor`); Lusion pushes its 3D pieces; Quiet Cubes sets `cursor:none` and `grab` on its controls; AirPods sets
`cursor:none` on some media. Hover transitions are short and custom-curved: Longbow `0.24s cubic-bezier(0.16,1,0.3,1)`,
Scout `0.2s cubic-bezier(0.38,0.005,0.215,1)`, Apple `0.32s cubic-bezier(0.4,0,0.6,1)`.
**SVG and masks (Measured):** Cowboy's stepped staircase reveal is a clip-path (11); Scout uses 25 clip-paths for its
viewfinder framing; MERSI's half-covers are 41 clip-paths; Lando's contour ground and Graza's drawn characters
(Lottie) are the drawn layers; Lando adds Rive.
**What transfers to Owl [Inferred]:** the completion requires an animated SVG cursor companion. The references say how to
make it serve rather than distract: it should act **on the scene it is over**, not just follow. Owl's companion (roofing
motif, 2-3 switchable variants, touch-disabled) follows with a short lerp, idles, blinks and rolls its eyes, and changes
its reaction per element: over the roof object it becomes a pry bar that lifts the shingle it is on; over the crew video
it becomes a play/pause; over the Wise Check instrument a magnifier; over the magnet game it is the magnet; over a
call-to-action it points. Over dark grounds it inverts. SVG carries masks, grounds and annotations (trade-drawn:
shingle courses, nail lines, rafters, the nest) behind and over photography, a different idea per section; it never
replaces the photograph.

## The signature story: the Owl scene, at mechanism level
**Proven behaviour:** as measured above (a full-viewport sticky stage, scroll plays it, it releases at its end, 3-5
screens long, with a progress bar).
**Owl's own story [Inferred, for judgment in Step 3]: "One roof, one day."** The crew's own footage, played by scroll on
the pinned stage, through the stages of an Owl replacement as they really happen: the wrap goes up → tear-off to bare
rafters → decking → underlayment and ice and water protection → shingles → the magnet pass → the shingle tomb handed to
the homeowner. A progress rail names the stages; each beat carries at most 8 words. It releases into the guarantee.
It is built from Owl's own crew, footage and Protect Your Nest system, so no other firm could run it.

## Copy budgets against the references
Measured hero copy: Igloo "Scroll down to discover." (4 words); Longbow "Speed of Lightness" (3); Scout "Scouts always
come back." (4); AirPods "The world's best in-ear Active Noise Cancellation." (8); Graza "Extra Virgin Olive Oil makes
everything better." (7); Cowboy "Riding reinvented" + one support line (2 + 7); Lusion's hero line (14). Every
reference sits far under the completion's 40-word hero budget; the best-known screens carry 2-8 words **[Derived]**. Owl
heroes and section heads are written to the completion's budgets (hero ≤40 words; headline ≤8 words with ≤35 words of
support) and aim at the references' 2-8.

## Section-to-mechanism map (design method: each section starts from a proven mechanism; V1 and V2 wholly different)
**[Inferred: a proposal for judgment, not a design.]**
| Owl section | V1 mechanism (reference) | V2 mechanism (a different reference) |
|---|---|---|
| Hero | the crew video full-bleed, then shrinking into the travelling card (Lusion) | the roof object you open with the pointer (Igloo) |
| Protect Your Nest | pinned beats at full photographic scale, one image and one number each (AirPods) | the named system shown in one real moment per part, crew-fronted (Cowboy) |
| Signature story | pinned scroll-played footage with a stage rail (Scout + Cowboy pin) | (one version only if Muse rules the signature scene is single) |
| Wise Check instrument | the case-first instrument on image pills (Quiet Cubes) | the house opened layer by layer under the pointer (Igloo) |
| Services | split covers with a card on the seam (MERSI) | product-in-its-world chapters with a filmstrip (Scout) |
| Doctrine / proof | numbered principles over hard numbers (Longbow) | numerals as events on a pinned stage (AirPods) |
| Families and crew | crew-fronted mosaic and chapters (Cowboy) | dated archive grid against a loose drift (Lando) |
| Films and community | film + thumbnail filmstrip (Scout) | dated archive grid with hover previews (Lando) |
| The game | the magnet pass with physics (Bruno) | (one game only, by the brief) |
| Call | the travelling card arrives at the call (Lusion) | the doctrine closes on the number (Longbow) |

## Single-file delivery: what it costs [Derived]
The completion requires ONE HTML file with images and the hero video inside it. Base64 adds a third:
- Owl's own hero footage: `owl-hero-960.webm` 1.60 MB → about 2.13 MB embedded (the full 1080p `Owl-BG-Condensed.webm`,
  4.45 MB, would be about 5.9 MB).
- Three.js, inlined rather than linked: roughly 0.65-0.7 MB minified (r16x) **[Inferred: not measured in this step]**.
- Photography: about 0.1-0.3 MB per WebP at display size.
The references ship 0.6-16.5 MB of script alone (Longbow 0.58 MB, Igloo 1.77 MB, Graza 16.5 MB). A working budget for the
Owl file is about 10-12 MB in total, with the video, 3D and photographs lazily decoded so the first screen does not wait
on all of it. The exact budget is a Step 3 decision.

## Asset inventory under the completion's asset rule
- **Owl's own (first):** the hero footage (`Owl-BG-Condensed.mp4/webm`, cut to `owl-hero-960`) and its frames
  (`frames/owl-bg-*.jpg`, 1280×720: rafters, bundles, decking, the finished roof); the wrap photo
  (`owl-roofing-catchall.webp`); the aftercare box; the Get It Right seal; the Wise Check badge; the families, Noah and
  community photos; Owl's service-area map; Owl's 4 YouTube films (thumbnails held locally). No Owl before/after pair
  exists.
- **Rembrandt non-branded photography (reusable as illustrative imagery only; checked by eye at thumbnail size):**
  the genuine **ba2 before/after pair** (`rembrandt/v5/assets/img/ba2-before.webp`, `ba2-after.webp`, 1024×684, no
  labels baked in), `storm-limb`, `storm-wind`, `tudor`, `svc-aerial`, `svc-repair`. `job-charcoal` shows a truck front
  and must be checked at full resolution for a logo before any use.
- **Excluded (Rembrandt branding visible):** `ab-bunkwade`, `ab-crew`, `ab-rachel`, `team`, `logo`, `job-truck`,
  `blue-house`, `ba1-after` (yard sign or truck wrap), and the `owner/` ba2 copies (they carry baked "Before"/"After" labels).
- **The three hard limits hold:** no Rembrandt branding, never captioned as a specific Owl job, no Rembrandt facts.

## Originality guard (⟦S1307⟧)
Each reference's signature combination is listed under **Never transfers** above. Only the abstract mechanism crosses
over (a part-built object that opens; a travelling card; a split seam; a pinned stage); every visible element is rebuilt
from Owl's own content, so no reference's distinctive arrangement reappears. The originality audit itself runs at each
build gate against this registry (`owl/redo/evidence/`).

## How the references hand sections over (comparison)
| Reference | Handover mechanism | Scroll feel (measured) |
|---|---|---|
| Igloo | camera dolly + fog + chromatic aberration between scenes | virtual, captured wheel |
| Lusion | a carrier (ribbon / card) moves you into the next media | virtual, lerped `targetScrollPixel` |
| Longbow | hard cuts between dark blocks | native (40 ms) |
| Cowboy | pinned chapters with a progress bar; staircase mask reveals | native (22 ms) |
| Scout | same-frame dissolves; pinned scenes | Lenis, 97 ms to 50%, 492 ms to 95% |
| AirPods | pinned stages; the subject morphs in place | native (22 ms) |
| MERSI | split cover, halves change separately | Lenis `lerp:.06`, `wheelMultiplier:.8` |
| Lando | contour wipe; collage drift; grid | Lenis `lerp:0.1` |
| Graza | one pinned drip falling across sections | native (19 ms) |
| Quiet Cubes | the instrument's state carries the page | Lenis, 114 ms to 50%, 488 ms to 95% |
| Bruno | none: one world | n/a |

## What the previous build got wrong, measured against this evidence
- Every reference's depth comes from **real light on real material** (photographs, film, lit 3D). The previous build put
  outline drawings where that depth belongs.
- None of the references shows its mechanism as decoration; each mechanism IS the content (the igloo opens, the drip
  falls, the instrument answers). The previous build named the references; it did not do this.

## Open points for Muse (no decision taken in this step)
1. The brief's colours (ink `#17111D`, amber `#EAA221`, cream `#F1EFE6`) differ slightly from the identity tokens
   recovered in Phase 1 (amber `#EAA222`). Step 2 should use the brief's values unless Muse rules otherwise.
2. The brief's locks say "50-year manufacturer warranties"; the earlier facts lock said "up to 50-year". Which wording
   holds?
3. Igloo Inc was excluded by the old annex and is required by this brief; the brief is followed.
