# Annex reference teardowns: Owl Roofing build

**The library:** only the 10 references in `REFERENCE-ANNEX-REMBRANDT.md` exist for this build. The library governs this
roofing build in full.

**Evidence base:**
- Live captures made in this session: viewport frames down each page plus a code digest (libraries, sticky/fixed counts,
  clip/mask/blend, SVG/canvas/video, will-change, cursor:none, fonts, scripts).
- Frames: `scratchpad/owl/refs/<ref>/`; contact sheets `sheet-<ref>.jpg`.
- Lusion serves a Cloudflare challenge the proxy refuses, so its teardown rests on its page source plus the annex's stated
  mechanism, marked as such.

**Method:**
- **Teardown before use:** why it works, the small details, and what must not be imported.
- **Split:** each reference is split per ⟦S0642⟧ into Keep / Change / Do not copy.
- **Code level:** techniques read per ⟦S0079⟧ explain-interface.
- **Distance:** checked against ⟦S1307⟧ originality and ⟦S1312⟧ (grammar, never signature elements).

---

## 1. Scout Motors: heritage spine, film-roll evidence
- **Observed:** a 17,890px page; 14 frames.
  - The hero is a full-bleed film still, "Scouts always come back.", with one small line of copy.
  - Chapters run "An off-road icon reborn" → "The one that started it all".
  - "From Day One" is a collage of real archival photos and print ads scattered over a giant two-line headline.
  - Then documentary photography: people, camp, a lake, the vehicle in use. A flag-and-crowd montage, a night campfire
    scene, an event video with a filmstrip of thumbnails beneath, and "In it for the long haul." The page ends in a
    giant "RESERVE" bar.
- **Code:** an Astro build. The component names give the mechanism away: `Sequence`, `SequenceKey`, `SplitLines`,
  `Viewfinder`, `HomeTreadmill`, `HomeCamp`. Also 4 sticky and 14 fixed elements, 18 clip-paths, 2 canvases, 3 videos.
- **Why it works:** history is told as evidence (real photos, real dates, real objects), never as an "about us" paragraph.
  Each chapter is one image and one line. The filmstrip makes "there is more proof" tangible.
- **Small details:** the headline is set at photo scale; archive artefacts are rotated a few degrees as if dropped on a
  table; the viewfinder framing.
- **What does not work / never import:** heavy cookie chrome; the brand-orange RESERVE bar as an aggressive end-cap;
  vehicle-centric scale.
- **Keep:** story as sequenced evidence; one image + one line per beat; a filmstrip of real moments; a hard-dated spine.
- **Change:** Owl's spine is short and true (founded 2025). Its "heritage" is the people, two families who met in a
  new-parents class, and the work. No invented history.
- **Do not copy:** the Scout archive collage, the vehicle hero, orange, the RESERVE bar, the Scout type.

## 2. Apple AirPods Pro: pinned beats, numerals as events
- **Observed:** a 29,163px page.
  - The product sits alone on white; a pinned scroll stage swaps the scene.
  - "2x more" and "4x more" are typographic events; "They're workin' 9 to 5."
  - Feature rows are carousels, and one claim always gets exactly one visual proof.
- **Code:** 12 sticky stages, 77 clip-paths, 67 will-change elements, 16 videos (scrubbed and in-view films), 23
  cursor:none.
- **Why it works:** one idea per screen; the numeral IS the headline; whitespace makes each beat an event; scroll gives
  the visitor control of the pace.
- **Small details:** small grey sub-lines under giant numerals; footnote markers; the "Take a closer look" film control.
- **What does not work:** 4,096 words in all (footnote density); 12 pinned stages are too many for a contractor site
  (scrolljacking risk, ⟦S1209⟧).
- **Keep:** pinned stage; one proof per beat; giant numerals for the locked facts only (10-year Get It Right Guarantee,
  up to 50-year manufacturer warranties, 5.0 · 90+ reviews, 29 towns); restraint in count.
- **Change:** the subject is a roof system and a crew, not a product render; the photography is real Owl footage.
- **Do not copy:** Apple layouts, SF type, product renders, the Apple blue, Apple copy cadence.

## 3. Bruno Simon: ONE explorable, game-like section (scoped)
- **Observed:** an isometric WebGL world with a glowing ring start pad, then a drivable scene (trees, lamp post, bench, a
  red vehicle) on a purple grid.
- **Code:** Three.js (WebGPU with a WebGL2 fallback), glTF + Draco + KTX textures, Rapier physics, Howler audio. Its
  console states the stack.
- **Why it works:** finding things IS the interaction; the space rewards curiosity; the start ring teaches the controls.
- **What does not work for a business site:** a whole-site game hides the conversion floor; heavy assets (the GLB, KTX,
  physics) are a bad LCP/INP trade; there is no reduced-motion path.
- **Keep:** one small explorable space inside ONE section, built from that section's own material. The mechanism is
  "explore to find".
- **Change:** an Owl subject, a performance budget, a 2D/SVG or light-3D fallback, keyboard paths, a mobile tap mode.
  The phone and text action stay visible.
- **Do not copy:** the car, the purple neon world, the playground props, the audio.

## 4. Graza: the custom-animation quality bar (scoped)
- **Observed:** cream ground with deep olive and acid yellow-green.
  - Hand-drawn olive characters with faces; a drip falls as you scroll ("Olive oil so fresh, you can taste it.").
  - A giant GRAZA wordmark; verb-named products (Drizzle, Sizzle, Frizzle); a marquee "So many ways to Graza".
- **Code:** Shopify, lottie-player, 20 blend modes, 10 videos.
- **Why it works:** the drawn characters belong to this product only. The drip moves WITH the scroll, so the animation is
  the message (freshness falling).
- **Annex note:** the draw-on-scroll detail is not verified; animation presence is confirmed. The quality bar is "an
  animation made for this content only".
- **Keep:** drawn things made only for this brand, moving with the scroll, at most one per section.
- **Change:** Owl's drawn material is its own: tree rings, the treeline, the nest, feathers, shingle courses, the magnet
  sweep line, the shingle tomb.
- **Do not copy:** olive characters, Graza type, the yellow-green, the verb-naming system (the annex scopes Graza to the
  animation bar only).

## 5. Lusion: flow (source-level evidence only)
- **Evidence:** the annex states "lines/continuity carry the visitor section to section, one journey". The page source
  shows an Astro build with a hoisted JS bundle. The rendered WebGL sits behind a Cloudflare challenge the proxy refuses,
  so no frames were captured and none were bypassed.
- **Keep:** ONE continuous element that travels the whole page and hands each section to the next. No section is a
  stacked block; seams are drawn (⟦S0536⟧ cut-the-curve, ⟦S0548⟧ seam-craft).
- **Change:** Owl's carrier must come from Owl's own material (see the directions). It is built in SVG, at this site's
  performance budget, not WebGL everywhere.
- **Do not copy:** any Lusion scene, shader or layout (none were seen).

## 6. Lando Norris: the archive standard
- **Observed:**
  - A dark olive-black ground with neon lime; a huge serif/grotesk mixed headline.
  - A scattered personal photo collage on a pale ground with **topographic contour lines**.
  - "ON TRACK / OFF TRACK" split; "HELMETS HALL OF FAME", a strict dark grid of helmets with year tags.
  - Champion merch; a fanned "What's up on socials" card stack; a lime footer card with the signature.
- **Code:** Lenis, Webflow, 21 canvases, 208 clip-paths, 17 masks, Draco WASM (3D).
- **Why it works:** the archive is curated objects in a strict grid with year labels, so the collection itself is the
  proof. The contour-line ground gives place and texture without decoration noise.
- **Small details:** hover swaps on the helmets; year tags; tiny signature marks.
- **Keep:** a real archive as a gallery (Owl's jobs, reviews and videos as curated objects); contour lines as ground (Owl
  already ships tree-ring contours in `faq-bg.svg`); hover and rest motion.
- **Change:** Owl's objects are jobs, families and videos, not helmets. A light-dominant ground. Owl's colours.
- **Do not copy:** the lime, the helmets, the signature, the McLaren context, the fan-card stack.

## 7. Quiet Cubes: the instrument the site exists to operate
- **Observed:** the first screen is a configurator, "Select Your Pod", with four pills (Office, Home, Outdoor, Nursing).
  The page waits on the choice. Every frame of the 12-frame scroll held that state, so the configurator is the entry gate.
- **Code:** GSAP + ScrollTrigger + SplitText + Lenis + Swiper on Webflow. 15 sticky elements, 2,304 SVG paths, 138
  will-change elements, cursor:none on 69 elements (a custom cursor).
- **Annex note:** the 3D model is unverified (it did not render in the audit captures); the instrument structure is the
  reference.
- **Why it works:** the visitor's first act is a decision about their own case; everything after is tailored to it.
- **What does not work:** a blocking gate before any content; the dark luxury ground.
- **Keep:** a configurator-first instrument the visitor operates (Owl's own "Price My Roof" is the subject); choices as
  pills; a tailored result.
- **Change:** never a blocking gate; light ground. No invented prices: the instrument may only measure (area, squares,
  pitch) and hand off to Owl's real quote, phone and text. Owl's own price figures appear only where Owl's site states
  them, with source.
- **Do not copy:** the pods, the dark gradient, QuietCubes UI.

## 8. Cowboy: crew/family-fronted warmth, one named system
- **Observed:**
  - Hero "Riding reinvented", a rider in a real street.
  - "Shockingly smooth" film; press logos; "Power so natural, you're always in flow."
  - A feature list beside a real photo (crash detection with a message bubble); a mosaic of riders; a map of kilometres
    ridden together; "Design in Belgium. Assembled in France."
  - Chaptered "01. Origins / 02. Quality / 03. Servicing / 04. Protection"; a dark footer.
- **Code:** a React SSR build (entry.client, root), Shopify, 11 videos, 15 blend modes.
- **Why it works:** real people in real light; one named system (AdaptivePower) carried through; warmth through
  photography, restraint in colour.
- **Annex note:** take the warmth system, not a family-group hero.
- **Keep:** people-in-use photography, a restrained palette, chaptered proof (Origins / Quality / Servicing / Protection),
  one named system carried through. Owl already has one: Protect Your Nest.
- **Change:** Owl's people (Noah, Tim, the crew, two families) and Owl's system. The hero is a crew at work, not a family
  group.
- **Do not copy:** bikes, Cowboy type, its map of riders, the press-logo strip (Owl has no press).

## 9. Longbow Motors: craft as doctrine + hard numbers
- **Observed:**
  - A dark, cinematic page; "Speed of Lightness™".
  - "The longest tradition in motoring." in a serif plus an italic accent.
  - "Three things we simply won't compromise on": Simplicity, Beauty, Lightness, as numbered principles.
  - Spec numerals as a row (895 kg, 3.5 s, 275 mi, £84,995).
  - "Beauty and the Beast."; "Choose your Longbow."
- **Code:** minimal (tags.js, lb.js); Montserrat + Cormorant; 1 video.
- **Why it works:** doctrine, not adjectives. Principles are numbered and each is backed by a number.
- **Keep:** a numbered doctrine backed by hard numbers. Owl's doctrine is the Protect Your Nest system:
  - 3 cleanup passes (crew, magnet, project-manager QC)
  - the 10-year Get It Right Guarantee
  - up to 50-year manufacturer warranties
  - "we actually answer".
- **Change:** a light-dominant ground. Owl's facts only.
- **Do not copy:** the British car context, the gold-on-black, serif italics, "Speed of Lightness".

## 10. MERSI: split-cover chapters (chapter system only)
- **Observed:** full-screen split covers: a project image in two halves around a seam, with a small name card (Hamelin,
  Berri, with type and year) sitting on the seam. Chapters cycle across the split.
- **Code:** GSAP + Webflow; 41 clip-paths, 446 will-change elements; a 900,425px scroll height (a long scroll-driven
  sequence).
- **Why it works:** the seam is the navigation; each project is one designed cover.
- **Keep:** the chapter system: named chapters cycling across a seam with a small card. For Owl: Roof replacement /
  Storm damage / Repair / Siding as chapters.
- **Change:** Owl photography; the light palette.
- **Do not copy:** MERSI interiors, its logo mark, its type.

## Excluded (annex): never used, cited or allowed to shape anything
Teenage Engineering · Fly By Jing · Brightland · Connect Roofing · Erdmann · DaBella · The Browser Company · Linear Roofing
· Dennis Snellenberg · Roof Maxx · Locomotive · Obys · Erie Home (copy/FAQ grammar note only) · Ever · Oakâme · Igloo Inc ·
Kononenko · Bone Dry Roofing. Owl's own site is the subject and asset source, never a design reference.
