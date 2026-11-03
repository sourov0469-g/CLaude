# Overnight ladder · plan lines (each written before its round is built)

Count at the start of the ladder (live versions, archives excluded): hero 6; video, explore, wise, protect, services,
reviews, area, family and booking 3 each. Target: exactly 10 each, two new versions per round, one slot per round.
That is 4 hero + 63 others = 67 new versions.

Standing skill pack for every ladder round: everything read in Upgrade Rounds 1–5 (`UP-R1-HERO-PACK.md`,
`UP-R2-PACK.md` … `UP-R5-PACK.md`); any skill added for a round is named in that round's lines and read in full first.
Each round runs the generic gate (`tools/ladder-test.cjs`) plus its own interaction checks (`tools/ladder-extra/`).

## L1 · Hero 7 + 8
- **Hero 7 · "Eave to Ridge"** — reference **Lusion** (one line carries the visitor). One amber line draws a whole
  hip-roofed house across the hero in a single stroke: eave, hip, ridge, chimney with its flashing. A small line-drawn
  owl perched on the ridge blinks and turns its head toward the cursor, which is the subtle animated owl the hero notes ask
  for. A light pulse travels the line at rest, and the h1 sits above the ridge with a masked word reveal. Skills:
  ⟦S0407⟧ draw-on and pulse, ⟦S0451⟧⟦S1329⟧ title, ⟦S1330⟧ damped head-turn, ⟦S1388⟧ buttons, ⟦S0414⟧ roofer-true line art.
- **Hero 8 · "At the Right Pitch"** — reference **MERSI** (split cover). The cover is split along a true 6/12 roof
  pitch (26.57°). Above the slope plays Owl's own crew film; the split edge is drawn as a roof edge (drip edge,
  shingle courses with offset tabs) with a "6 in 12" pitch annotation. Below the slope sit the h1 and the actions. The
  film plane and the type plane shift against each other with the cursor (depth). Skills: ⟦S1375⟧ cover and mask reveal,
  ⟦S1330⟧ planes, ⟦S0407⟧ edge draw, ⟦S0414⟧, ⟦S1388⟧; the full film opens YouTube ehKLv5DF2TQ.

## L2 · Hero 9 + 10
- **Hero 9 · "Sealed Tight"** — reference **Immersive Garden** (the hover splash surface mechanism only). A framed
  roof of real 3-tab shingle courses drawn on canvas (12 in tabs, joints offset 6 in course to course, 5⅝ in
  exposure, granule texture, a sealant line under each course). The surface reacts where the cursor moves: tabs
  lift in a ring like wind catching them, then press back down and reseal, with an amber glint running along the seal
  strip behind the cursor. It is an ambient surface, not a game. Skills: ⟦S1363⟧ bounded canvas field with one
  rAF loop and a pointer listener on the section, ⟦S1338⟧ ripple contract (decay + radius, off under reduced motion),
  ⟦S0414⟧ roofer-true courses, ⟦S0451⟧⟦S1329⟧ title, ⟦S1388⟧ buttons.
- **Hero 10 · "Frame by Frame"** — reference **Scout Motors** (film-roll photo evidence). A sprocketed film strip of
  Owl's own photos (crew, Noah, the families, the wrap, the aftercare box, the crew at work) runs slowly across the
  hero under a large headline, with frame numbers and captions saying only what each frame shows. It pauses on hover
  or focus, can be dragged, and has arrow keys; under reduced motion it is a still, scrollable strip. Skills:
  ⟦S0450⟧ seamless loop (duplicated set, −50 %), ⟦S1039⟧ captions, ⟦S1107⟧ keyboard, ⟦S1352⟧ frame numbers,
  ⟦S0451⟧ title.

## L3 · Video 4 + 5 (Video stood at 3: V1 player, V2 Contact Sheet, V3 Roofline Theatre)
- **Video 4 · "Look Closer"** — reference **Immersive Garden** (surface that reacts where the cursor moves). Owl's
  crew clip plays full width, drawn in grey and slightly soft. A lens that follows the cursor (eased) shows the true
  colour and sharpness beneath; on touch it wanders by itself and a tap places it; the arrow keys move it. A caption
  under the lens names the moment on screen, from the five moments already checked frame by frame. Skills: ⟦S1363⟧ one
  canvas, one rAF, paused unseen; ⟦S1338⟧ reveal contract (real media beneath, off under reduced motion); ⟦S1107⟧
  keyboard; ⟦S1388⟧ keys.
- **Video 5 · "Assemble the Shot"** — reference **Graza** (custom-animation quality bar). The clip is cut into a 4×3
  grid of tiles, each drawing its own crop of the live frame. When first seen, the tiles fly in from a scattered 3D
  spread (rotate, depth, offset) and settle into the whole shot on staggered springs. Hovering a tile lifts it slightly,
  and "Scatter" replays it. The five moments are chips that seek the film. Skills: ⟦S0205⟧ small 3D on tiles, ⟦S0340⟧
  spring settle, ⟦S0187⟧ staggered choreography, ⟦S1388⟧ keys; the full film opens YouTube ehKLv5DF2TQ.

## L4 · Explore 4 + 5 (Explore stood at 3: V1 exploded stack, V2 Build It section slider, V3 Stack It Right, the one game)
- **Explore 4 · "Peel It Back"** — reference **Apple AirPods Pro** (pinned scroll; each step a full-screen event).
  A plan view looking straight down on a roof corner at the eave, pinned while you scroll. Each step peels one
  layer up and away from the eave, in true top-down order: shingles (with the starter course at the eave) →
  underlayment, lapped upslope over downslope → ice & water shield along the eave → eave drip edge (under the ice &
  water at the eave) → OSB deck with staggered joints and gaps between panels → rafters. The layer's name lands as a
  big numbered event. A step rail mirrors the steps for keyboard use. No game mechanic. Skills: ⟦S0448⟧ sticky
  artifact with measured steps, ⟦S1325⟧ progress rail, ⟦S0414⟧ roofer-true plan drawing, ⟦S1352⟧ numbers, ⟦S0451⟧.
- **Explore 5 · "The Layer Deck"** — reference **Longbow Motors** (craft told as doctrine plus hard numbers). The six
  layers as thick 3D cards, each with its own drawn material face: granules, synthetic underlayment print, rubberised
  ice & water, the drip-edge profile, OSB strands, rafter grain. Hovering fans the deck; choosing a card brings it
  forward with what it is, where it goes and one hard number where one is certain:
  - laminated shingle exposure 5⅝ in (GAF Timberline HDZ);
  - ice barrier from the eave to at least 24 in inside the exterior wall line (IRC R905.1.2, as adopted in Minnesota);
  - deck panels gapped about ⅛ in;
  - rafters commonly 16 or 24 in on centre.
  It does not claim these as an Owl promise. Skills: ⟦S0205⟧ small 3D cards, ⟦S1330⟧ tilt, ⟦S1246⟧ tabs, ⟦S1352⟧,
  ⟦S0414⟧, ⟦S0076⟧.

## L5 · Wise Check 4 + 5 (Wise stood at 3: V1 dial + checklist, V2 inspection lens, V3 case panels)
- **Wise 4 · "Ask the Owl"** — reference **Cowboy** (warm, people-fronted, one named system). A conversation with
  the owl: five question chips (what it covers, the attic, hidden leaks, seeing what we saw, when to book). Picking
  one types the question into the thread, shows the owl "thinking" for a beat, then answers only from Owl's own
  published Wise Check words (`OWL.WISE`). It ends with the booking action. Not a form, not a document. Skills:
  ⟦S0251⟧⟦S0076⟧ plain answers, ⟦S0462⟧ chips as full hit areas, live region per ⟦S1442⟧'s feedback rules,
  ⟦S0451⟧ title.
- **Wise 5 · "The Kit"** — reference **Lando Norris** (bespoke craft objects, made for one business). A knolled
  flat-lay on a cutting mat: ladder (roof evaluation), flashlight (attic inspection), heat-sensor camera (leak
  detection) and phone camera (photo and video documentation), drawn in SVG. Hover or focus lifts a tool off the mat
  with a real shadow and shows which part of the Wise Check it serves; the four parts are also a button list.
  Skills: ⟦S0205⟧ small 3D lift, ⟦S1330⟧ damped tilt, ⟦S1246⟧ tabs, ⟦S0407⟧ draw-on of tools, ⟦S1352⟧.
