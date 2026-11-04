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

## L6 · Protect 4 + 5 (Protect stood at 3: V1 Same Job · Different Yard, V2 3D deck, V3 yard plan)
- **Protect 4 · "Hang the Wrap"** — reference **Immersive Garden** (surface that reacts where the cursor moves). A
  canvas cloth: the black mesh wrap hangs from the eave line over the walls and shrubs of a drawn hip-roofed house,
  with a ground tarp in front. It is a real mass-spring mesh, pinned along the eave; the cursor (or idle gusts) pushes
  it like wind and it settles back, the house visible through the mesh. Beside it, the three parts of the system in
  Owl's words. Skills: ⟦S1363⟧ bounded canvas simulation (one rAF, pointer on the section, paused unseen, static
  under reduced motion), ⟦S0414⟧ (the wrap hangs from the eaves to the ground, as in Owl's photo), ⟦S0451⟧, ⟦S1388⟧.
- **Protect 5 · "Weave the Nest"** — reference **Graza** (custom-animation quality bar). The name taken
  literally: a nest drawn in SVG strand by strand. Three bands of weave are the three parts (the outer weave is the
  wrap, the middle is the three cleanup passes, the lining is the aftercare box), and the owl settles on it when the
  weave is done. Choosing a band lifts it and tells that part in Owl's words. Skills: ⟦S0407⟧ stroke draw-on, ⟦S0187⟧
  staggered choreography, ⟦S1246⟧ tabs, ⟦S1330⟧ lift, ⟦S0451⟧.

## L7 · Services 4 + 5 (Services stood at 3: V1 departures board, V2 Five Chapters, V3 One Line)
- **Services 4 · "Point at Your Roof"** — reference **Quiet Cubes** (configurator-first: you point at the problem,
  the instrument answers). A drawn house in elevation; each service lives where it applies on a real house: the whole
  roof face (replacement), a lifted tab and the flashing at the chimney (repair), hail marks under a storm cloud
  (storm damage help), a magnifier over the roof and attic vent (Wise Check), the walls (siding). Hover, tap or the
  key list highlights that part in amber and opens the service card from `OWL.SVC`. Skills: ⟦S1246⟧ tabs,
  ⟦S0414⟧ roofer-true house, ⟦S0407⟧ highlight draw, ⟦S0462⟧, ⟦S1388⟧.
- **Services 5 · "Up Close"** — reference **Apple AirPods Pro** (pinned scroll; each step a full-screen event).
  Pinned while you scroll, each service's own photo grows from a small card to the full stage while its name lands
  in large type, then hands over to the next. A rail mirrors the five steps for keyboard and touch; reduced motion
  shows them as a still list. Skills: ⟦S0448⟧ sticky artifact with measured steps, ⟦S1325⟧ rail, ⟦S1375⟧ cover
  reveal, ⟦S0451⟧, ⟦S1352⟧.

## L8 · Reviews 4 + 5 (Reviews stood at 3: V1 dial, V2 Earned Not Claimed spine, V3 Ninety-Plus field)
- **Reviews 4 · "Five Stars, Drawn"** — reference **Graza** (custom-animation quality bar). Five large stars draw
  themselves with a pen stroke, one after another, then fill amber with a small spring. Each star carries one locked
  proof: 5.0 · 90+ reviews · BBB A− · GAF Systems Plus · 10-year workmanship warranty. Hovering or focusing a star
  lifts it and reads its line. No quotes, names or per-review stars: the rating is stated once as "5.0 · 90+
  reviews". Skills: ⟦S0407⟧ draw-on, ⟦S0340⟧ spring fill, ⟦S0187⟧ staggered sequence, ⟦S1246⟧ tabs, ⟦S1352⟧, ⟦S0451⟧.
- **Reviews 5 · "Built to 5.0"** — reference **Lando Norris** (bespoke, made for one business). The rating as an
  object: a large "5.0" whose strokes are laid in shingle courses (staggered tabs, laminate band), with a
  small 3D tilt and light that follow the cursor. "90+ reviews" sits on the ridge line under it, beside the locked
  proof chips. Skills: ⟦S0205⟧ small 3D, ⟦S1330⟧ tilt, ⟦S0414⟧ courses, ⟦S1352⟧, ⟦S0451⟧.

## L9 · Service Area 4 + 5 (Area stood at 3: V1 abstract road, V2 town keys, V3 Twenty-Nine numeral)
Both stay fully abstract (no geography, no positions that pretend to be a map), using the real 29 towns.
- **Area 4 · "Roof Row"** — reference **Lusion** (one continuous line carries the visitor). One long roofline of 29
  houses, one per town, drawn as a single amber stroke with Shoreview as the home with the owl. You drag or scroll the
  row sideways (keys too), windows light as houses pass the centre, and typing a town glides the row to it and lights
  its windows. Skills: ⟦S0407⟧ line, ⟦S0450⟧-style continuous track (no fake loop; it ends at both towns),
  ⟦S1107⟧ keyboard, ⟦S0462⟧, ⟦S0451⟧.
- **Area 5 · "The Town Drum"** — reference **Quiet Cubes** (instrument-first) with small 3D. The 29 towns on a
  vertical 3D drum you turn with the wheel, a drag, the arrow keys or the up and down keys; the town in the window is
  read out: "Yes, we roof in Eagan." A find box turns the drum to a typed town. It is a listbox underneath, so
  screen readers get the plain list. Skills: ⟦S0205⟧ 3D drum, ⟦S0340⟧ inertia and snap, ⟦S1107⟧, ⟦S1388⟧, ⟦S0451⟧.

## L10 · We Give a Hoot 4 + 5 (Family stood at 3: V1 duo + hoot, V2 album stack, V3 in numbers)
Skill added and read in full: ⟦S1324⟧ reveal-hover-effect (feathered radial mask, pointer easing .1, radius easing
.14, collapse on exit, real images beneath).
- **Family 4 · "Say It Big"** — reference **Cowboy** (people-fronted warmth, one named system). The tagline set very
  large, "We Give a Hoot", where each word is a window onto Owl's own photos: hovering or focusing a word opens a
  feathered radial reveal of its photo (We → the Browns and the Berglands; Give → community; a Hoot → the crew on a
  roof), eased toward the cursor. The captions say only what is shown. Skills: ⟦S1324⟧, ⟦S1039⟧, ⟦S0451⟧, ⟦S1107⟧.
- **Family 5 · "Two Families, One Owl"** — reference **Graza** (custom-animation bar). A large drawn owl face whose two
  eyes are the two family portraits (the Browns in one, the Berglands in the other). The portraits drift a little
  against the eye rims with the cursor, the lids blink now and then, and hovering an eye names that family. Skills:
  ⟦S0407⟧ draw, ⟦S1330⟧ parallax, ⟦S1039⟧ captions, ⟦S0451⟧.

## L11 · Booking 4 + 5 (Booking stood at 3: V1 card form, V2 Build Your Visit, V3 Take Our Card)
Forms never claim a request was saved or sent; both hand off to the phone or the email app, and say so.
- **Booking 4 · "Pick a Day"** — reference **Quiet Cubes** (instrument first). A calendar strip of the next twelve
  working days (Mon–Sat; Sundays shown closed, since Owl's hours are Mon–Sat 08:00–18:00) built from today's date,
  with a morning or afternoon window. Choosing a day slides up a short form (name, phone, address); "Open my email"
  hands off a written request that says "preferred day — please confirm". No availability is implied. Skills:
  ⟦S1442⟧ form rules, ⟦S1107⟧ grid keyboard (roving tabindex), ⟦S1388⟧ 3D day keys, ⟦S0451⟧.
- **Booking 5 · "Open Now?"** — reference **Lando Norris** (bespoke instrument). A large drawn clock whose face carries
  Owl's opening hours (08:00–18:00) as an amber arc. Its hand shows the current time in Shoreview (America/Chicago),
  and a live status reads "Open now until 18:00" or "Closed — opens Monday 08:00", computed from the locked hours.
  The big action is the phone, with the email and office address beside it. Skills: ⟦S0407⟧ clock draw, ⟦S1352⟧ hour
  numerals, ⟦S1388⟧ call key, ⟦S0076⟧ plain status copy.

## Second pass (each slot from 5 to 7)

## L12 · Video 6 + 7
- **Video 6 · "Through the Window"** — reference **Cowboy** (warmth, people first). A drawn house front with a big
  picture window. Its curtains draw open when the section is seen, and the crew film plays inside the window, framed
  by sash and sill. A lamp in the next window lights up as the moments pass, and the moment's name is written on the
  windowsill. Play/pause and "Watch the Full Film" are 3D keys. Skills: ⟦S0407⟧ curtain and frame draw, ⟦S0187⟧ open
  sequence, ⟦S1388⟧ keys, ⟦S1046⟧ modal.
- **Video 7 · "Scrub the Day"** — reference **Apple AirPods Pro** (pinned scroll; the film is the event). The section
  pins while you scroll, and the scroll drives the clip's time directly (scrubbing frame by frame). The five
  frame-checked moments appear as large captions when their time is reached, with a progress rail. Under reduced
  motion it is a normal player. Skills: ⟦S0448⟧ sticky artifact, ⟦S1325⟧ progress rail, ⟦S0451⟧ captions, ⟦S1352⟧ timecodes.

## L13 · Explore 6 + 7 (Explore stands at 5: V1 exploded stack, V2 step slider, V3 the one game, V4 scroll peel, V5 card deck)
- **Explore 6 · "Follow the Drop"** — reference **Lusion** (flow: one line carries the visitor through). A drawn side
  section through a Minnesota eave at a 5/12 pitch, drawn in the correct order: rafter tail and fascia, OSB deck, drip
  edge on the deck at the eave, ice & water shield over it running up past the inside of the heated wall, synthetic
  underlayment lapped over that, starter strip, then shingles overhanging into the gutter. A raindrop follows one flow
  line down the roof, and each layer lights and names itself as the drop passes. Four plain scenario keys show why each
  layer is there: a correct eave · without drip edge (water curls back onto the fascia and behind the gutter) · ice dam
  with ice & water shield (backed-up water is stopped at the membrane) · ice dam without it (water reaches the deck and
  drips inside the wall). Not a game: no score, no win. Reduced motion draws each path as a still line. Skills:
  ⟦S0407⟧ motion path along the flow line, ⟦S0468⟧ blueprint annotation, ⟦S0526⟧ anatomy section, ⟦S1246⟧ tab keys,
  ⟦S1388⟧ 3D keys, ⟦S0451⟧ title.
- **Explore 7 · "Under the Lens"** — reference **Immersive Garden** (the surface reacts where the cursor moves). One
  finished roof face, seen straight on. Moving the cursor opens an x-ray lens in rings: shingles open to the layer
  below, then the deck, then the rafters. What the lens shows depends on where it is, as on a real roof: at the eave,
  ice & water shield over the drip edge; up the field, synthetic underlayment with its laps and cap nails; at the
  ridge, the slot cut in the deck for the ridge vent under the cap. A readout names the zone and its layers. The lens
  swells a little with speed and leaves a ripple ring. Keys: Eave · Field · Ridge glide the lens; arrow keys move it
  when the roof is focused; touch taps place it. Skills: ⟦S1324⟧ reveal-hover masks (CSS mask, eased pointer),
  ⟦S1323⟧ ripple emission per distance, ⟦S0526⟧ anatomy, ⟦S1107⟧ keyboard, ⟦S1388⟧ 3D keys.

## L14 · Wise Check 6 + 7 (Wise stands at 5: V1 dial + checklist, V2 lens modes, V3 case panels, V4 chat, V5 kit flat-lay)
- **Wise 6 · "Contact Sheet"** — reference **Scout Motors** (film-roll photo evidence). A light table with a strip of
  film: eight drawn frames, the four published parts of the Wise Check and Owl's four published "when to call"
  cases. Drag the strip (with inertia), use Prev/Next, or arrow through the frames. Choosing a frame circles it in
  amber grease pencil, as on a real contact sheet, and a loupe shows it enlarged beside Owl's own line; a case frame
  also names the parts it focuses on (`OWL.WISE`). The frames are drawn illustrations, labelled as such, never
  photos. Skills: ⟦S0407⟧ grease-pencil draw-on, ⟦S1018⟧ draggable a11y, ⟦S1107⟧ keyboard, ⟦S1388⟧ keys,
  ⟦S0451⟧ title.
- **Wise 7 · "The Route"** — reference **Lusion** (one line carries the visitor). A cutaway house. As the section
  scrolls through, one dotted route draws itself: up the ladder and over the roof (roof evaluation), in through the
  hatch to the attic (attic inspection, a flashlight cone), down to the ceiling below a stain (heat-sensor leak
  detection, a false-colour patch), and to the table where the photos and video are shown (documentation). Each
  station lights its card with Owl's published line. The cards are keys that move the route to their station. No
  order of work is claimed: the stations are numbered as Owl lists the parts. Skills: ⟦S0407⟧ path draw, ⟦S1325⟧
  progress, ⟦S0526⟧ anatomy cutaway, ⟦S1388⟧ keys, ⟦S0451⟧ title.

## L15 · Protect Your Nest 6 + 7 (Protect stands at 5: V1 same job two yards, V2 three cards, V3 yard map, V4 cloth wrap, V5 woven nest)
- **Protect 6 · "Sweep the Yard"** — reference **Lando Norris** (bespoke craft, motion that comes to rest). One flower
  bed and lawn below a wall, just after the new roof is on: the tarp holds most of the tear-off, a few shingle bits
  and nails lie past it. Four keys run the system in Owl's words: pass 1 the crew (the tarp folds up with its load,
  stray bits are picked up), pass 2 the magnet sweep (a rolling magnet crosses the lawn and nails leap to it),
  pass 3 the project manager's walk (footsteps cross the yard and find the last nail under a shrub), then the
  aftercare box set down on the step. Play runs all four. No counts are claimed; it is a drawing. Skills:
  ⟦S0489⟧ debris fall and settle, ⟦S0407⟧ footstep path draw, ⟦S1388⟧ keys, ⟦S1246⟧ step keys, ⟦S0451⟧ title.
- **Protect 7 · "Three Chapters"** — reference **MERSI** (split-cover chapters). Three tall chapter covers: 01 The
  Wrap, 02 Three Passes, 03 The Box. Opening one splits its cover down the middle; the halves slide apart to show
  the chapter (a drawn plate and Owl's words), and the open chapter widens while the others narrow to their spines.
  One open at a time; keyboard buttons with aria-expanded. Skills: ⟦S0409⟧ transition, ⟦S0910⟧ accordion a11y,
  ⟦S0407⟧ plate draw-on, ⟦S0451⟧ title.

## L16 · Services 6 + 7 (Services stands at 5: V1 boarding board, V2 five chapters, V3 one line, V4 point at your roof, V5 up close)
- **Services 6 · "What Do You See?"** — reference **Quiet Cubes** (configurator first: the instrument is the page).
  Five plain things a homeowner notices (a leak or a stain · shingles down after a storm · an older roof · planning a
  new roof · tired siding) as 3D keys with drawn icons. Choosing one re-deals Owl's five service cards (FLIP motion):
  the service that fits rises to the top marked "Start here", the next sensible one sits behind it marked "Also worth
  a look", and the rest fan back. Every card is Owl's own (`OWL.SVC` name, line, photo). A note says a Wise Check
  is how Owl confirms what a roof needs; nothing here diagnoses. Skills: ⟦S1388⟧ keys, ⟦S0409⟧ FLIP re-deal,
  ⟦S1107⟧ keyboard, ⟦S0451⟧ title.
- **Services 7 · "A Roof's Life"** — reference **Scout Motors** (heritage timeline spine). One vertical spine through
  a roof's life with no years claimed: Day one (Roof Replacement) · After a storm (Storm Damage Help) · When
  something leaks (Roof Repair) · Every so often (Wise Check Inspections) · When the walls are next (Siding). The
  spine draws as you scroll; each stop brings in Owl's photo and words on alternating sides. A small roof badge
  rides the spine and changes with the stop: new, hail-marked, dripping, under the magnifier, with new siding.
  Skills: ⟦S1325⟧ progress spine, ⟦S0407⟧ badge draw, ⟦S0451⟧ title, ⟦S1324⟧-style photo reveal (clip).

## L17 · Reviews 6 + 7 (Reviews stands at 5: V1 proof row, V2 dated spine, V3 91-mark field, V4 drawn stars, V5 extruded 5.0)
- **Reviews 6 · "Dead Level"** — reference **Quiet Cubes** (the instrument is the structure). A large amber torpedo
  level, a roofer's own tool, etched "Owl Roofing · 5.0 · 90+ reviews". Moving the pointer across the section tilts
  it; the bubble slides in its vial with a damped spring, and when the pointer leaves it settles back dead centre.
  The reading never changes: "5.0 from 90+ reviews. It sits level." The locked proofs are engraved on its face
  plates (BBB A− since Feb 25, 2026 · GAF Systems Plus · MN licence #BC809662 · 10-year workmanship warranty). A
  "Give it a nudge" key does the same for keyboard and touch. No quotes, names or other ratings. Skills: ⟦S0489⟧
  spring settle (no teleporting), ⟦S1388⟧ key, ⟦S0405⟧ micro-interaction, ⟦S0451⟧ title.
- **Reviews 7 · "Ninety Shingles"** — reference **Graza** (the custom-animation bar). One shingle for each review: a
  roof face is laid as you arrive, roofer-correct from the eave up (starter strip first, each course lapping the
  one below, four nails per shingle that the next course covers), 90 shingles in six courses while a counter
  climbs, then one more set half-laid with a "+" for "and counting", and the ridge cap goes on with "5.0 · 90+
  reviews". "Lay It Again" replays. No individual review is shown or implied. Skills: ⟦S0489⟧ drop and settle,
  ⟦S1352⟧ counter numerals, ⟦S1388⟧ key, ⟦S0451⟧ title.

## L18 · Service Area 6 + 7 (Area stands at 5: V1 abstract road, V2 keycaps, V3 the numeral 29, V4 roof row, V5 drum)
- **Area 6 · "As the Owl Flies"** — reference **Lusion** (one line carries the visitor). A real map, not an invented
  one: the 29 town centres plotted to scale from their latitude and longitude (equirectangular at 45° N), with a
  true scale bar and north arrow and no invented roads, rivers or lakes. Picking a town (dot, list or search) flies
  a small owl along a straight amber line from Shoreview and reads "about N miles as the owl flies", computed from
  the coordinates (haversine) and stated as approximate. Labelled "Town centres plotted from their coordinates. Not
  a street map." Skills: ⟦S0407⟧ line draw and flight path, ⟦S1107⟧ keyboard listbox, ⟦S1388⟧ keys, ⟦S0451⟧ title.
- **Area 7 · "Welcome To"** — reference **Lando Norris** (bespoke, made for one business). Fully abstract: one big
  green city-limit sign on its post, small 3D, that spins on its post to each of the 29 towns ("Welcome to Edina ·
  Owl Roofing roofs here"). Type a town, use the A–Z rail (letters with no town are disabled), or Next/Previous
  keys; idle, it turns slowly through the list (off under reduced motion). An unknown town is told plainly it is
  not on the list and given the phone (651) 977-6027. Skills: ⟦S0409⟧ spin transition, ⟦S1107⟧ keyboard, ⟦S1388⟧
  keys, ⟦S1442⟧ search feedback.

## L19 · We Give a Hoot 6 + 7 (Family stands at 5: V1 tagline, V2 album, V3 numbers, V4 say it big, V5 two families one owl)
- **Family 6 · "Porch Light"** — reference **Cowboy** (people-fronted warmth, one named system). A drawn front porch
  in the soft light of early evening (kept light): siding, a door, a doormat reading "We Give a Hoot", and the two
  founding families' real photos framed on the wall (the Browns, the Berglands). The porch lamp is a switch: on
  view, or on a press, it comes on, the scene warms, a glow falls on the photos, and a few fireflies drift (off
  under reduced motion). Beside it: family-owned, founded in 2025 in Shoreview by Tim Brown and Noah Bergland.
  Skills: ⟦S1363⟧ ambient particles, ⟦S0405⟧ switch micro-interaction, ⟦S1388⟧ key, ⟦S0451⟧ title.
- **Family 7 · "The Pinboard"** — reference **Lando Norris** (bespoke craft, motion that comes to rest). A cork
  board with Owl's five real photos pinned as prints with honest captions, around an embroidered patch ("Owl
  Roofing · Family-owned · Est. 2025 · Shoreview, MN") whose stitches sew themselves on. Drag a print anywhere (it
  lifts, tilts and settles with a damped spring); focus a print and move it with the arrow keys; "Tidy Up" eases
  them all home. Skills: ⟦S1018⟧ draggable a11y, ⟦S0489⟧ settle, ⟦S0407⟧ stitch draw-on, ⟦S1388⟧ keys.

## L20 · Booking 6 + 7 (Booking stands at 5: V1 form, V2 build your visit, V3 take our card, V4 pick a day, V5 open now?)
- **Booking 6 · "Work Order"** — reference **Lando Norris** (bespoke craft object). The booking form as a crew's
  clipboard: a ruled work-order sheet under a steel clip, with fields written on its lines (name, phone, address),
  "What's going on?" chips, and a note. Filling it in ticks the sheet's checklist; submitting validates, hands the
  details to the visitor's own email app (`OWL.bookForm`, mailto), lifts the top sheet as if torn off and stamps
  it "Over to your email". It never claims a request was saved or sent. The phone (651) 977-6027 sits on the
  clipboard's back strip. Skills: ⟦S1442⟧ form rules, ⟦S0405⟧ micro-interaction, ⟦S1388⟧ keys, ⟦S0451⟧ title.
- **Booking 7 · "Knock Knock"** — reference **Cowboy** (warmth, people first). Three front doors in a row, each a
  way in: 1 Call us (tel (651) 977-6027), 2 Write to us (info@owlroofing.com), 3 Find us (Owl Roofing LLC, 1000
  County Rd E #230, Shoreview, MN 55126 · Mon–Sat 08:00–18:00). Pointing at a door opens it a crack (small 3D);
  pressing it swings it open on warm light and the way in; one door open at a time; closed doors are inert. Skills:
  ⟦S0409⟧ door swing, ⟦S0910⟧ disclosure a11y, ⟦S1388⟧ keys, ⟦S0451⟧ title.

## L21 · Video 8 + 9 (third pass; Video stands at 7: V1 player, V2–V3 earlier, V4 colour lens, V5 tiles, V6 window, V7 scrub)
- **Video 8 · "Inside the Letters"** — reference **Apple AirPods Pro** (type as the full-screen event). The crew film
  plays inside giant knocked-out letters, "OWL CREW", on cream. The stage pins while you scroll and the letters
  grow about the O until the film fills the frame; then one line lands: "Owl's own crew, on the job." Reduced
  motion shows the film whole with the line. Skills: ⟦S0448⟧ sticky artifact, ⟦S0451⟧ type event, ⟦S1325⟧
  progress, ⟦S1046⟧ modal for the full film.
- **Video 9 · "Movie Night"** — reference **Cowboy** (warmth, family first). A drawn driveway at early evening (kept
  light): a projector on a stand throws the crew film onto the garage door, framed with a slight keystone, dust
  drifting in the beam. The projector's switch is a 3D key (on: the beam flickers up and the film plays; off: it
  pauses and the beam fades). A "Now showing" card names the frame-checked moment. Skills: ⟦S1363⟧ dust in the
  beam, ⟦S0405⟧ switch, ⟦S1388⟧ keys, ⟦S1046⟧ modal.

## L22 · Explore 8 + 9
- **Explore 8 · "The Nail Line"** — reference **Longbow Motors** (craft told as doctrine, never adjectives). One
  laminated architectural shingle, large, from the front, with the nailing strip marked, plus a side section
  through the nail. Five keys: Right · Too high · Too low · Over-driven · Under-driven. "Right": at least four nails
  in the nailing strip, through both layers where they are bonded, driven flush, covered by the next course. Each
  fault moves the nail and shows the consequence in the section: too high misses the bottom layer and can let the
  shingle tear loose; too low leaves the nail exposed under the course above; over-driven cuts into the mat;
  under-driven holds the shingle up so it can't seal. Not a game: no score. Skills: ⟦S0526⟧ anatomy, ⟦S0468⟧
  annotation, ⟦S1246⟧ keys, ⟦S0451⟧ title.
- **Explore 9 · "Let It Breathe"** — reference **Lusion** (flow carries the eye). A cutaway attic with intake at the
  soffit vents and exhaust at the ridge vent; air particles flow in low, wash along the underside of the deck and
  out the ridge. Three keys: Balanced (baffles keep the soffit open) · Blocked soffits (insulation over the
  intake: the air stalls, warm damp air gathers under the deck, frost forms on the nails) · No ridge vent (air has
  nowhere to leave). Plain words for each. Skills: ⟦S1363⟧ particles, ⟦S0407⟧ flow paths, ⟦S1246⟧ keys, ⟦S0451⟧ title.

## L23 · Wise Check 8 + 9 (Wise stands at 7: dial, lens modes, case panels, chat, kit, contact sheet, route)
- **Wise 8 · "The File"** — reference **MERSI** (chapter system, here as folder tabs). A manila file folder with five
  labelled tabs, the questions homeowners ask: What is a Wise Check? · What's in it? · When should I book one? ·
  Will I see what you saw? · How do I book? Choosing a tab pulls its sheet to the front (the others shuffle back
  and peek out behind); a paper clip holds the answer. Every answer is Owl's published words (`OWL.SVC`, `OWL.WISE`)
  and the locked contacts; nothing new is claimed (no price, no duration). A real tablist with arrow keys. Skills:
  ⟦S1246⟧ tabs a11y, ⟦S0409⟧ shuffle transition, ⟦S0451⟧ title, ⟦S1388⟧ keys.
- **Wise 9 · "Field Notebook"** — reference **Graza** (the custom-animation bar). A spiral-bound field notebook
  open on the page: each spread has a pencil-line sketch that draws itself on the left (shingles under a
  magnifier, rafters and a flashlight, a heat camera on a damp patch, a phone of photos) and Owl's words on the
  right. Next and Previous turn the page with a real page-turn (small 3D); arrow keys work. The last spread is how to
  book. Labelled "Sketches, not photos." Skills: ⟦S0407⟧ sketch draw-on, ⟦S0409⟧ page turn, ⟦S1388⟧ keys, ⟦S1107⟧
  keyboard.

## L24 · Protect Your Nest 8 + 9 (Protect stands at 7: two yards, three cards, yard map, cloth, nest, sweep, chapters)
- **Protect 8 · "Job Board"** — reference **Graza** (the custom-animation bar). The crew's whiteboard in an aluminium
  frame with a marker tray. The job is written on it in order: wrap up (mesh from the eaves down, tarp over the
  lawn) · old roof off · new roof on · pass 1, the crew · pass 2, a magnet sweep · pass 3, the project manager ·
  the aftercare box, left with you. When the board is seen, each line gets a marker tick and a small marker doodle,
  one after another. Choosing a line underlines it in amber and pins a note with Owl's words. "Wipe and Run Again"
  erases and replays. Everyday font only. Skills: ⟦S0407⟧ marker draw-on, ⟦S0405⟧ ticks, ⟦S1388⟧ keys, ⟦S0451⟧ title.
- **Protect 9 · "The Leaflet"** — reference **Lando Norris** (a bespoke made object). A printed tri-fold leaflet that
  lies folded on the cover ("Protect Your Nest System"), then unfolds in small 3D, right flap then left, to three
  inside panels: the wrap · three cleanup passes · the aftercare box, each with a drawn plate and Owl's words.
  "Fold It" / "Open It" keys; on phones the panels simply stack. Skills: ⟦S0409⟧ fold transition, ⟦S0407⟧ plate
  draw, ⟦S1388⟧ keys, ⟦S0451⟧ title.

## L25 · Services 8 + 9 (Services stands at 7: board, chapters, one line, point at roof, up close, what do you see, a roof's life)
- **Services 8 · "Name Your Job"** — reference **Immersive Garden** (the surface reacts where the cursor moves). An
  editorial list: the five service names set very large, one per row, with a hairline between rows. Moving across a
  row floats Owl's own photo for that service beside the cursor (eased, tilting with speed), and the row's line and
  what's included slide open beneath it. Touch and keyboard: rows are disclosure buttons; one open at a time.
  Skills: ⟦S1324⟧ eased pointer reveal, ⟦S0910⟧ disclosure a11y, ⟦S0451⟧ type, ⟦S1388⟧ keys.
- **Services 9 · "The Stack"** — reference **Lando Norris** (bespoke, rest-motion). Five full-width service cards that
  pin one after another as you scroll, each new card sliding up over the last while the ones beneath settle back
  (scale and dim) into a neat stack; each card has Owl's photo, a big numeral, the name, the line and what's
  included. Reduced motion: a plain list of cards. Skills: ⟦S0448⟧ sticky stack, ⟦S1325⟧ scroll progress,
  ⟦S0451⟧ title, ⟦S1388⟧ keys.

## L26 · Reviews 8 + 9 (Reviews stands at 7: proof row, dated spine, 91 marks, drawn stars, extruded 5.0, dead level, ninety shingles)
- **Reviews 8 · "Marquee"** — reference **Graza** (the custom-animation bar). A theatre marquee sign: "5.0" in big
  dot-matrix bulbs and "90+ REVIEWS" in a smaller row, inside a frame of chasing border bulbs. The letters light
  in a sweep when the sign is seen; bulbs near the pointer burn brighter (a glow that follows the cursor); the
  chase stops under reduced motion. Below it are the locked proofs as plain chips. Skills: ⟦S1363⟧ restrained
  particles (bulbs), ⟦S0405⟧ pointer glow, ⟦S0451⟧ title, ⟦S1388⟧ key.
- **Reviews 9 · "Stamped"** — reference **Lando Norris** (a bespoke made object). A sheet of paper and a rubber stamp.
  The stamp follows the pointer over the sheet; a click presses it and leaves an inked seal (rough ink texture,
  each a little rotated). Each press cycles through Owl's locked proofs only: 5.0 · 90+ reviews · BBB A− since Feb
  25, 2026 · GAF Systems Plus · MN licence #BC809662 · 10-year workmanship warranty. "Stamp It" does the same for
  keyboard and touch; "Clear the Page" wipes it. Not a game: no score or goal. Skills: ⟦S0489⟧ press and settle,
  ⟦S0405⟧ micro-interaction, ⟦S1388⟧ keys, ⟦S0451⟧ title.

## L27 · Service Area 8 + 9 (Area stands at 7: road, keycaps, 29, roof row, drum, owl-flies map, welcome sign)
- **Area 8 · "Postmarks"** — reference **Graza** (the custom-animation bar). Fully abstract: a wall of 29 postmarks,
  one per real town, each a round cancellation mark with the town on the arc, "MN" below and wavy cancel lines,
  in three inks. Typing filters the wall, so your town's mark stands out; choosing a mark presses a "We roof
  here" stamp across it and confirms it in words. Shoreview's mark says Home. An unknown town gets the phone.
  No ZIP codes are invented. Skills: ⟦S0405⟧ press micro-interaction, ⟦S1442⟧ search feedback, ⟦S1107⟧ keyboard
  grid, ⟦S0451⟧ title.
- **Area 9 · "Tune In"** — reference **Quiet Cubes** (instrument first). Fully abstract: a radio with a slide-rule dial
  whose stations are the 29 towns. Turning the knob (drag, arrow keys on a real slider, or the station buttons)
  slides the dial band under the needle; between towns the signal meter drops and static shimmers, and on a town
  the meter fills and the readout says "Yes, we roof in Eagan." It settles onto the nearest town when you let go.
  Search tunes straight to a town. Skills: ⟦S1107⟧ slider keyboard, ⟦S0489⟧ settle, ⟦S1388⟧ keys, ⟦S1442⟧ search.

## L28 · We Give a Hoot 8 + 9 (Family stands at 7: tagline, album, numbers, say it big, owl face, porch light, pinboard)
- **Family 8 · "The Tree"** — reference **Lusion** (lines carry the eye). A family tree drawn the other way up: one
  trunk, "Owl Roofing · Est. 2025 · Shoreview, MN", whose branches grow (drawn on as you arrive) out to round
  frames holding Owl's five real photos: the Browns, the Berglands, Noah at the roof edge, the crew, the
  community. Leaves bud along the branches. Choosing a frame opens it larger with its honest caption. Skills:
  ⟦S0407⟧ branch draw-on, ⟦S0405⟧ frame hover, ⟦S1388⟧ keys, ⟦S0451⟧ title.
- **Family 9 · "Give a Hoot"** — reference **Graza** (the custom-animation bar). The tagline made literal: a drawn owl in
  the middle; press "Give a Hoot" and it blinks, opens its beak and lets out a soft hoot (a synthesized two-note
  tone, only when pressed, with a Sound on/off switch), while ripple rings spread out and, as they pass, bring the
  families' photos into orbit with their captions. A waveform under the owl draws the hoot. Reduced motion: no
  ripples, photos shown. Skills: ⟦S0489⟧ blink and rest motion, ⟦S0407⟧ waveform, ⟦S1388⟧ keys, ⟦S0405⟧ switch.

## L29 · Booking 8 + 9 (Booking stands at 7: form, build your visit, take our card, pick a day, open now, work order, knock knock)
- **Booking 8 · "One at a Time"** — reference **Apple AirPods Pro** (one full-screen event at a time). A
  conversational stepper in very large type: one question on screen (What's your name? · Best number to reach
  you? · Where's the roof? · What's going on?), each sliding up as the last is answered, with a progress line and
  Back. Enter moves on; each step checks itself. The last screen reads the answers back and hands them to the
  visitor's own email app (`OWL.bookForm`); it never says sent. The phone is always one tap away. Skills: ⟦S1442⟧
  form rules, ⟦S0409⟧ step transition, ⟦S1325⟧ progress, ⟦S1388⟧ keys.
- **Booking 9 · "Mailbox"** — reference **Lando Norris** (a bespoke made object). A postcard to fill in (front: Owl
  Roofing, Shoreview; back: name, phone, address, a note) beside a drawn mailbox. "Pop It In" slides the card into
  the slot, raises the flag and opens the visitor's email app with the details; the wording says the email is ready
  to send from their app, never that it was sent. An incomplete card shakes and says what is missing. Skills:
  ⟦S1442⟧ form rules, ⟦S0489⟧ slide and settle, ⟦S0405⟧ flag, ⟦S1388⟧ keys.

## L30 · Video 10 + Explore 10 (fourth pass; both stand at 9)
- **Video 10 · "Tap Through the Job"** — reference **Apple AirPods Pro** (one event at a time, full focus). The crew
  film as a tall story card: five segmented bars across the top fill in time with the film's five real chapters
  (rafters and new decking · GAF shingles carried up · one of the crew, shingle in hand · walking a finished roof ·
  OSB carried in for the next roof). Tap the right of the card for the next chapter, the left for the last; press
  and hold to pause. Each chapter gets a large caption and its own slow framing of the landscape film. Visible
  Back · Pause · Next buttons and arrow keys do the same; the full film opens on YouTube (ehKLv5DF2TQ). Differs
  from V1–V9: no player chrome, lens, mask, window, projector or scrub — the story-card pattern with tap zones
  and hold-to-pause. Skills: ⟦S1325⟧ segmented progress, ⟦S0409⟧ chapter transition, ⟦S1107⟧ keys, ⟦S1046⟧ film
  modal.
- **Explore 10 · "The Sample Block"** — reference **Quiet Cubes** (an instrument you turn in your hand). A cut sample
  of the roof at the eave as a small 3D block: shingles on top, then underlayment, ice & water shield, the drip
  edge with its lip at the eave, the OSB deck and a rafter beneath, every layer visible on the cut faces
  (thicknesses drawn larger, and said so). Drag it, or use the arrow keys, to turn it; it rests with a slow sway
  until touched. Pick a layer and it lights on every face while the rest dim, with the same verified fact as the
  other versions (5⅝ in exposure, upslope over downslope, 24 in inside the wall line per IRC R905.1.2, drip edge
  under the ice & water at the eave, ⅛ in deck gap, 16 or 24 in on centre). Not a game. Differs from V1–V9: no
  stack, slider, peel, deck of cards, drop, lens, nail or airflow — one solid object, turned. Skills: ⟦S1388⟧ 3D,
  ⟦S1018⟧ draggable with keyboard (role=slider), ⟦S0489⟧ rest motion and settle, ⟦S0526⟧ anatomy callout.
