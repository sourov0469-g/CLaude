# Rembrandt homepage V7: delivery report

**Deliverable:** `rembrandt/v5/rembrandt-homepage.html`.
- One self-contained file, 1498 KB: photos, font and code all inline.
- Page target is 1500 KB; hard ceiling is 2.0 MB.
- Built from `rembrandt/v5/src` by `build/build.mjs`.
- Plan: `PLAN-V7.md`.

**How to review it:**
- Every section has its own **1 2 3** switcher. It swaps only that section.
- The URL form is `?v=hero2,proof3,work1`.
- Keys (with the section in view):
  - **1 / 2 / 3** switch that section's version.
  - **T** hides the switchers.
  - **R** resets every pick.
  - **H** cycles the helper.
- The **Helper** pill (desktop, bottom right) picks the cursor companion: House, Hammer, Drop or Off.
- Picks are remembered in the browser (`tweaks-rembrandt-home`).

---

## Gate results (final build)

| Check | Result |
|---|---|
| **Horizontal overflow** (all three version sets at 1440, 1024, 375, 320, and 1440 with reduced motion) | 0 px everywhere; no console or page errors |
| **Version switching** (every section × every version, at 1440, 390 and reduced motion) | No overflow, no errors. ScrollTriggers after a full cycle: 21, down from 29 (no leak). The section re-anchors to its top after a swap. |
| **axe** (WCAG 2.0/2.1/2.2 A and AA, best practice; all three sets) | **1440:** clean. **375:** one hit, the Call V1 outline wordmark (see *Flagged, not changed*). |
| **Reduced motion** (screenshot sheets at 1440 and 375) | Designed stills everywhere. Reviews V3 was showing a cut-off train and now sets each credential whole (fixed at this gate). |
| **Loops off screen** (S1315; every GSAP and CSS loop checked against its section's visibility at each scroll stop) | Clean. Work V1, Reviews V3 and Call V3 used to run before their section was reached; fixed at this gate. |
| **Frames** (headless Chromium with software raster and no GPU, pointer moving, every section of every set) | 52–60 fps; one frame over 50 ms in the whole sweep (Work V3, as the scrubbed courses start). Before this gate: Hero V2 6, Hero V1 25, Family V3 31 fps. Hero V2's photo-type swap still dips briefly (see *Flagged*). |
| **Cursor companion** (3 variants × 3 sets × 7 sections, every element kind found: button, link, image, heading, card) | Shown and placed at the pointer +22 px on every target; hover then press on each; no errors. At 375 and on a touch tablet it is not displayed and its picker is hidden. Under reduced motion it is Off by default; a chosen variant follows without lag or reactions. |
| **Facts lock** (text scan of the built file) | Only (937) 746-7377. No 353-9711, no 24/7, no licence, no "open now", no quotes, no invented numbers. |
| **Weight** | 1498 KB, down from 1567 KB. |

Everything in this report ran on the final build. Frame figures come from a software renderer, so real GPUs will do better; the *relative* changes are what the gate acted on.

---

## Per-version report

**Status key:**
- **Kept:** untouched.
- **Upgraded:** a v6 version with the V7 SVG and reaction systems added.
- **Rebuilt:** a v6 version replaced by a different reference.
- **Built:** new in V7.

Every version also gets the shared systems below: its own roofing divider, a background that answers the pointer, and the companion's accessory for that section.

### Hero (each version is the page's one signature interactive)

**V1: Upgraded**
- **Reference:** ⟦S1321⟧ cinematic GSAP + Lenis, with ⟦S1341⟧ threejs-weather (ported to SVG) and ⟦S1339⟧.
- **Mechanism and parameters:**
  - Clip image reveal and masked headline lines, at the F17 dose.
  - Overscanned parallax 0.18, scrub 1.2; mouse layers 0.04.
  - One pre-allocated rain pool. Storm = rain intensified: speed ×1 → ×1.42, slant grows with speed².
  - Light states cross-fade from wherever they are.
- **Adaptation:**
  - The Tudor job at full bleed, with weather over its roofline.
  - The cursor leans and parts the rain.
  - The first 40% of the hero's scroll clears the storm: rain thins, clouds part, the sun warms the scrim.
  - The ridge and gable lines (traced from the photo) draw themselves and catch light near the pointer.
- **SVG:**
  - fg: the traced ridge and gable lines.
  - bg: a three-depth cloud bank and rain.
- **Reactions:**
  - Call: hover draws a ridge line across the top; press flips a shingle tab under the label.
  - Get an estimate: hover snaps a chalk line; press sets a nail head.

**V2: Upgraded**
- **Reference:** [BANK] Smeulders Interieurgroep (deep read 506), with [BANK] Q146 morphing background shape.
- **Mechanism and parameters:**
  - Slide out power2.in 0.7 s; in power3.out 1.1 s; drift to 1.06.
  - Title in image-filled type.
  - Q146 shape: morph per slide, then breathes path ↔ pathAlt, 3500 ms alternate.
- **Adaptation:**
  - The real jobs as a carousel, the H1 filled with the current job photo.
  - A blueprint roofline traced from each photo morphs per slide and breathes, on a drafting grid.
  - The counter is four shingle tabs.
  - Autoplay every 6 s with a visible pause (WCAG 2.2.2).
- **SVG:**
  - fg: the shingle-tab counter.
  - bg: the blueprint roof on its grid.
- **Reactions:**
  - Prev/next: hover turns the arrow into a rafter tilting toward its direction; press shifts the tab row one course.
  - Pause: hover draws the bars; press bounces.
  - Call: hover shows a roof-pitch caret; press bounces.

**V3: Rebuilt** (the v6 facts grid read as the banned proof-strip hero)
- **Reference:** [BANK] AirWorks hover-the-house diagnostic, with [BANK] BLK 531 zone re-fill.
- **Mechanism and parameters:**
  - One inline SVG with id'd zones that re-fill, easing `cubic-bezier(.645,.045,.355,1)`.
  - A per-spot answer, with an accessible chip list as the alternative.
- **Adaptation:**
  - A drawn house: point at or tab to Ridge, Shingles, Flashing, Vents, Drip edge, Fascia, Gutters or Downspouts.
  - The part lights up, a leader draws to its name, and a plain line says what it does.
  - Tied to the real fact: every part is a line in the written estimate.
- **SVG:**
  - fg: the house and its leaders.
  - bg: a quiet sky with a sun arc and drifting clouds.
- **Reactions:**
  - Zones and chips: hover fills the zone and draws its leader; press pins it.
  - Call: hover runs a gutter drip along the bottom edge; press makes a splash ring.

### Reviews

**V1: Kept, pixel-untouched**
- **Reference:** "Constellation" (⟦S0687⟧ family).
- **Mechanism:** unchanged; its markup, CSS and code were diffed against the plan commit.
- **Adaptation:** unchanged.
- **Divider:** sits outside its stage.
- **Reactions:** unchanged.

**V2: Upgraded**
- **Reference:** [BANK] Cenco Roofing DEEP 5, with Anatomy F12 (KBF Ledger) and #317.
- **Mechanism and parameters:**
  - Rows arrive at the F17 dose: 0.15 s, 0.04 s apart.
  - Chalk lines draw 0.3 s, then snap with a 90 ms, 2 px vibration.
- **Adaptation:**
  - The ledger (one row per credential, each with its issuer's check link).
  - The rules are roofer's chalk lines, fed from a reel whose crank turns.
- **SVG:**
  - fg: the chalk lines and the reel.
  - bg: perspective shingle courses that lift 2 px near the pointer.
- **Reactions:** check links: hover snaps a chalk line under the link; press stamps a tick.

**V3: Upgraded**
- **Reference:** [BANK] Q161 horizontalLoop, with the Stronghold 60 s token and [BANK] Q149.
- **Mechanism and parameters:**
  - `repeat:-1`; one lap per 60 s; the second train reversed.
  - Scroll velocity maps [0,1000] → [0,5] as a speed boost that springs back.
- **Adaptation:**
  - Two proof trains under ridge-cap shingle rows that ripple with that boost.
  - Roofing nails separate the facts.
  - A 6/12 roofline behind leans up to 1.5°.
- **SVG:**
  - fg: the ridge caps and the nails.
  - bg: the giant roofline.
- **Reactions:**
  - Prev/next: hover lifts a nail; press hammers it flush.
  - Pause: hover draws the bars; press bounces.

### Work (real jobs only)

**V1: Upgraded**
- **Reference:** [BANK] Q361 horizontal-loop project tiles (CROWN).
- **Mechanism and parameters:** speed 2 (200 px/s), `center:true`, active tile full brightness and the others 0.7, step 0.4 s power1.inOut.
- **Adaptation:**
  - A roofer's tape measure runs under the loop; its ticks travel with the track.
  - The caption rides the hook.
  - A speed square tracks the active tile.
- **SVG:**
  - fg: the tape blade, ticks and hook, plus nail heads.
  - bg: the speed square.
- **Reactions:**
  - Tiles: hover pops nail heads at the corners; press snaps the hook to the tile.
  - Arrows: hover turns them into speed-square corners; press ticks.
  - Pause: hover draws the bars.

**V2: Upgraded**
- **Reference:** [BANK] Q157 Push Animation on Grid Items, with [BANK] Q147 Shape Hover (chevron preset).
- **Mechanism and parameters:**
  - Flip 0.9 s expo, `scale:true`, `prune:true`.
  - North/south/east/west classification.
  - Q147 roof path 0.3 s back-out; caption rises 0.3 s.
- **Adaptation:**
  - The six real photos in a 4 × 4 collage.
  - A gable cap of section colour lowers over the hovered photo, like a roof being set.
- **SVG:**
  - fg: the gable caps.
  - bg: a faint hip-and-ridge pattern that shifts with the pointer.
- **Reactions:**
  - Tile: hover lowers the gable cap; press lifts it off as the photo flies open.
  - Close: hover turns the X into crossed rafters; press folds them.

**V3: Upgraded**
- **Reference:** [BANK] Q38 SVG mask transitions on scroll (horizontal blinds).
- **Mechanism and parameters:**
  - 16 courses, stagger per course, crisp edges.
  - Scrub 2.2 on desktop, 1 on phones; not pinned.
- **Adaptation:**
  - The ba2 pair: the slits are 3-tab shingle courses laid **bottom to top**, the order a roofer lays them, so the after photo is re-roofed over the before.
  - A small hammer rides the course going on.
- **SVG:**
  - fg: the course mask and the hammer.
  - bg: the drip edge and starter strip under the frame.
- **Reactions:** **Before / After are buttons** (added at this gate).
  - Hover outlines the course that goes on first (bottom, for Before) or last (top, for After).
  - Press lays or lifts every course in 0.3 s and flashes that outline; scrolling takes control back.

### Family (new)

No individual is identified in the team photo, so the section uses no portraits and no illustrated people.

**V1: Built**
- **Reference:** [BANK] Q95 Masked Heading.
- **Mechanism and parameters:**
  - Glyph clipPath over the photo.
  - Idle drift sin(t·0.21)·18 / cos(t·0.17)·10.8; pointer parallax 26, smoothed 1−exp(−dt/0.18).
  - Spotlight r160.
- **Adaptation:** WALKER, filled with the crew, under drawn roof framing: the name under the family's roof.
- **SVG:**
  - fg: rafters, collar tie, king post and ridge board.
  - bg: an attic-window spotlight.
- **Reactions:** "Call Rachel": hover lights the window icon; press opens its door.

**V2: Built**
- **Reference:** ⟦S1327⟧ scroll-scrubbed word reveal.
- **Mechanism and parameters:**
  - Word progress = clamp(reveal·N − i).
  - Opacity 0.12 → 1, blur 6 → 0, y 0.12em → 0.
  - TreeWalker split; an untouched accessible copy is kept.
- **Adaptation:**
  - A short statement in the firm's voice (not a quote, attributed to no one), built from the facts only.
  - A roof draws over it, ridge first and then courses, in step with the reveal.
  - The team photo sits in a gable frame.
- **SVG:**
  - fg: the drawn roof.
  - bg: a distant roofline at its own scroll rate (wired at this gate).
- **Reactions:** phone link: hover wobbles the handset; press sends ring lines.

**V3: Built**
- **Reference:** ⟦S1362⟧ technical-wireframe info layout.
- **Mechanism and parameters:** labels in stages, connectors drawn (DrawSVG 0.3 s), emphasis by brightness and line weight.
- **Adaptation:**
  - A king-post roof truss on blueprint blue.
  - Each member carries one true fact: Bunk 1995, Wade 2015, Rachel's hours, BBB A+ 2001, Owens Corning, the address.
  - The pills are the accessible control.
- **SVG:**
  - fg: the truss, connectors and pills.
  - bg: plywood deck sheets that light under the pointer.
- **Reactions:** members and pills: hover highlights the member and its leader; press pins the pill.

### How (new)

Facts: call Rachel Mon–Fri 9–5 → a written, line-by-line estimate → the roof (Owens Corning Platinum Preferred, $2M insured).

**V1: Built**
- **Reference:** ⟦S1325⟧ scroll-progress timeline.
- **Mechanism and parameters:**
  - A real `<ol>`; progress = (anchor − start)/(end − start), written in one rAF.
  - `aria-current="step"` as each step is reached; left rail on phones.
- **Adaptation:** the spine is a downspout fed by a gutter. Water fills it as you read, the step markers are its hangers, and a drop rides the head of the water.
- **SVG:**
  - fg: downspout, elbow and hangers.
  - bg: the gutter run.
- **Reactions:** phone link: hover forms a drop above it; press splashes.

**V2: Built**
- **Reference:** ⟦S1340⟧ threejs-towers (ported to SVG), with ⟦S1326⟧ progress math.
- **Mechanism and parameters:**
  - A CSS-sticky stage; state is a pure function of progress.
  - Copy stops at 0 / 0.42 / 0.78; the build line rises between 0.55 and 0.85.
- **Adaptation:**
  - **0:** Rachel's phone over a bare frame.
  - **0.42:** the written estimate. The roof's four real layers (deck, underlayment, shingles, ridge vent) are named and come apart in **CSS 3D**, so each line item is a visible layer.
  - **0.78:** the roof is on.
- **SVG:**
  - fg: the cross-section, layers and ladder.
  - bg: the sun on an arc tied to progress, and a quiet percentage.
- **Reactions:**
  - Layer labels light up in turn as progress reaches them.
  - Call: hover raises a ladder at its side; press bounces.

**V3: Built**
- **Reference:** [BANK] Q409 Grow My Business, with [BANK] Q411 NVRMND three verbs and [BANK] Q91 animated icons.
- **Mechanism and parameters:**
  - Reveals trail the scroll (start "top bottom-=10%"), 0.6 s compressed to 0.3 s by F17.
  - Q91 from→to steps, bound to press (never hover-only).
- **Adaptation:**
  - "Call. Estimate. Roof." with deliverable chips taken from the facts.
  - Each verb is a real link with its own drawn tool.
  - A roofer's ladder joins the columns, and its rungs light as each column arrives.
- **SVG:**
  - fg: handset, folding rule, hammer and nail.
  - bg: the ladder.
- **Reactions:** hover readies the tool (the handset lifts, the rule unfolds, the hammer raises); press uses it (it rings, measures, drives the nail).

### Towns (new; real data, source credited on the page)

**V1: Built**
- **Reference:** [BANK] Austin Pro project map (CROWN: "the map is the claim").
- **Mechanism and parameters:** plot only what is real, at true positions, labelled honestly.
- **Adaptation:**
  - The 24 towns placed by Census bearing and distance from the Springboro centroid.
  - A square-root radial scale; rings in real miles; a north arrow. The page says how the map is scaled.
  - The list is the accessible control. Selecting a town draws a line from home and prints its facts.
  - Phones show only the chosen town's name on the map.
- **SVG:**
  - fg: gable markers and the home house.
  - bg: rings that ripple from the pointer.
- **Reactions:** list and markers: hover pops the marker's gable; press draws the distance line and opens the facts.

**V2: Built**
- **Reference:** [BANK] Q4 Ragged Edge metric-led cards, with the Hippo doctrine and ⟦S1420⟧.
- **Mechanism and parameters:**
  - The card headline is its metric; power2.out 0.3 s.
  - Bars from zero, one scale for every card, direct labels.
- **Adaptation:**
  - Each town card leads with the median year its homes were built.
  - Real decades-of-construction bars drawn as shingle courses.
  - Sorting re-lays the cards (Flip).
- **SVG:**
  - fg: the course bars.
  - bg: a street plan at its own scroll rate (wired at this gate).
- **Reactions:**
  - Card: hover raises its bars.
  - Sort buttons (added at this gate): hover staggers the icon's courses; press re-lays them.

**V3: Built**
- **Reference:** [BANK] ROTTLER town finder, with [BANK] West London coverage checker and ⟦S1453⟧.
- **Mechanism and parameters:** instant answer; a zero-results state that confirms the query and offers the next step.
- **Adaptation:**
  - "Is your town on our list?" Type or pick a town; the answer gives its real distance, direction, county and median year built.
  - Not on the list: say so and offer the phone.
- **SVG:**
  - fg: a compass needle that swings to the bearing, and a roofer's tape pulled out to the miles.
  - bg: a weathervane on the ridge that turns with it.
- **Reactions:**
  - Chips: hover previews the needle; press commits it and pulls the tape.
  - Input: focus draws a chalk underline.

### Call (new; the close)

**V1: Built**
- **Reference:** Anatomy F9/F14 (the offer produces a number), the [BANK] OFFF two-tone wordmark, and ⟦S1350⟧ gooey drops.
- **Mechanism and parameters:** one drop every 7 s with a gooey neck; it falls to the call button; rests off screen.
- **Adaptation:**
  - "Get a written, line-by-line estimate."
  - The hours line is computed in America/New_York from the real hours and never says "open now".
  - The REMBRANDT wordmark in two tones.
- **SVG:**
  - fg: the gutter run and its drops.
  - bg: the two-tone wordmark.
- **Reactions:**
  - Call: hover gathers a drop above it; press makes a splash ring.
  - Address link: hover drops a map pin; press bounces it.

**V2: Built**
- **Reference:** [BANK] Shazam-like Morphing Button 255.
- **Mechanism and parameters:**
  - Morph 400 ms `cubic-bezier(.8,-.6,.2,1)`; close 400 ms `(.4,1,.3,1)`.
  - Content exits −25 px and enters from +25 px.
  - Ripple rings 1.2 s, the second 0.6 s later.
- **Adaptation:**
  - The round call morphs into a **house-shaped card** with Rachel's details.
  - The rings ring three times on arrival and on hover, never endlessly.
  - The tel link stays primary.
- **SVG:**
  - fg: the round-to-house morph.
  - bg: dusk rooflines.
- **Reactions:**
  - Round call: hover rings twice; press shakes the handset.
  - Toggle: hover redraws its icon (added at this gate); press morphs the card.

**V3: Built**
- **Reference:** [BANK] Q114 JC Suzanne giant marquee CTA, with Q161 and the Stronghold 60 s token.
- **Mechanism and parameters:** the number in giant type, one marquee, pausable, slowing to 0.3 on hover.
- **Adaptation:**
  - The phone number runs on a standing-seam roof band with a brick chimney puffing slow smoke.
  - The whole band is the tel link, with a static readable copy above it.
- **SVG:**
  - fg: the chimney and smoke.
  - bg: the standing seams.
- **Reactions:**
  - Band: hover slows it and sweeps light over the seams.
  - Call: hover raises a chimney; press puffs smoke.
  - Pause: hover draws the bars; press bounces.

### Cursor companion (Rule 4 and Addendum 2): three switchable variants plus Off

**References:**
- ⟦S0489⟧ living illustration.
- ⟦S0635⟧ gaze-follow.
- ⟦S1303⟧ eye lerp.
- ⟦S1321⟧ follower lag (quickTo 0.35 power3.out).
- ⟦S1309⟧ tilt from horizontal velocity, capped at 8°.
- Q395 phase-offset idles.
- Q381 state presets.
- ⟦S1455⟧ state machine.

**Variants:**

| Variant | Character | Idle (2.6 / 4.3 / 7.1 s, so it never repeats) | Acts on its own (after 6–9 s still) |
|---|---|---|---|
| **House** | attic-window eyes, door mouth, chimney hat | breathes, blinks, glances | smoke ring, eye roll, tips its roof |
| **Hammer** | eyes on the head | sways ±3°, blinks, glances | taps a nail, twirls once |
| **Drop** | a raindrop | gooey wobble, blinks, glances | sheds a droplet, wipes its brow |

**Reactions by element type** (hover and press differ for every type):
- **Buttons:** the house lifts its roof / the hammer cocks / the drop swells. On press: the door opens / it strikes with a spark / it splashes.
- **Links:** it leans toward them or points.
- **Images:** a camera shutter / a level / a lens.
- **Headings:** it reads / ticks / beads.
- **Cards:** it peeks / taps the corner / puddles.

**Accessories by section:** umbrella (Hero), chalk reel (Reviews), tape (Work), hard hat (Family), tool belt (How), map pin (Towns), handset (Call). Each section's background answers it.

**Behaviour:**
- The system cursor is always kept.
- It is `pointer-events:none` and `aria-hidden`.
- It is not shown on touch.
- It is Off by default under reduced motion.
- It sleeps after 12 s of stillness and when the tab is hidden.
- Nothing on the page depends on it.

### Shared systems

**Dividers:** [BANK] Q53 / R8, scrubbed with scroll, lifting near the pointer. A different roofing profile at every boundary:

| Boundary | Profile |
|---|---|
| Hero → Reviews | roofline (rises) |
| → Work | shingle courses |
| → Family | chevrons |
| → How | rafters |
| → Towns | step flashing |
| → Call | fish scales |
| → Footer | gutter |

**Chrome reactions** (added at this gate; Rule 3 covers every interactive element):

| Element | Hover | Press |
|---|---|---|
| Nav and bar Call | a ridge vent draws along the top | flaps its louvers |
| Nav logo | a gable roof rises behind it, so the pill reads as home | pops it |
| Footer logo | a ladder rises | lights its rungs in turn |
| Footer phone | three roofing nails set beneath it | drives them flush |
| Bar "Get an estimate" | a chalk line draws | snaps blue |

**Entrance:** R5 beats, 0.3 s moves 0.08 s apart (F17).

---

## Fixed at the final gate (what QA found)

**Phone (375 px):**
- Reviews V2: the head overlapped the ledger by 76 px. A V7 rule turned its sticky into `relative` but kept its sticky `top:116px`. That also cost the desktop its sticky head. Both are fixed.
- Towns V1: town names were about 7 px on the map. Phones now show the chosen town only; the ring miles are enlarged.
- Hero V3: a cloud sat on the headline on phones. Fixed.

**Accessibility:**
- The companion picker now sits in a labelled landmark.
- The chosen-town pill's "mi" text had 2.4:1 contrast and is now ink.

**Loops:**
- Work V1, Reviews V3 and Call V3 started "in view" and ran before they were reached. Each now reads its real visibility at start.

**Frames:**
- Every element redrawn each frame now has its own layer, so its repaint stops re-rastering the photos and type beneath it:
  - the Hero V1 rain and sky, the Hero V2 blueprint and the Hero V3 sky
  - the dividers
  - the Work V1 tape and nails, and the Work V2 gable caps
  - the Towns V3 vane and the Call V3 chimney
  - all pointer and scroll depth layers
- Raster cost per 2 s with the pointer moving:
  - Work V2: 4.5 s → 0.12 s
  - Hero V1: 4.0 s → 1.2 s
- Hero V2 lost its pointer parallax on the photo-filled title (it re-rasterized every word: 5 fps).
- The Family V3 deck highlight became a 440 px window moved by transform (30 → 60 fps).
- Dividers stop redrawing under a still pointer.

**Wiring:** scroll depth (`data-sy`) was never connected; it now runs on Family V2 and Towns V2.

**Weight (1567 → 1498 KB):**
- SplitText was registered but unused.
- `cursor.js` and `textfx.js` were dead and are deleted.
- Six photos re-encoded 4–8 quality points lower. PSNR fell 0.5–0.9 dB; they were compared at 1:1 on the roofs.

**Rule 3 gaps:**
- The chrome had no SVG reactions.
- Work V3 had no controls; it now has the planned Before / After buttons.
- The Towns V2 sort buttons and the Call V2 toggle had no SVG reaction of their own.

---

## Flagged, not changed (with reasons)

1. **Call V1 wordmark, axe "serious" contrast at 375.**
   - The outline half of REMBRANDT is a 35%-white stroke.
   - It is the company name set as a logotype, decorative and `aria-hidden`; WCAG 1.4.3 exempts logotypes. Filling it would remove the two-tone mechanism (OFFF).
2. **Hero V2: a short frame dip when the photo-filled title swaps** (every 6 s).
   - The image-filled type is the Smeulders mechanism. A `background-clip:text` fade repaints every word.
   - Already cut from 1.1 s to 0.3 s (F17), mid photo-fade. In the software renderer it still dips for about half a second.
   - Promoting the type to its own layer made it worse in testing. GPU raster should absorb it, but there is no GPU here to prove that.
3. **Reviews V2 caveat "Figures as of October 2026; ratings move, so check the live ones".** Kept because a dated caveat is honest. Update the month when the 4.9 / 295 figures are refreshed.
4. **Towns distances are measured from the Springboro centroid, not the office.** They are Census centroid to centroid, and the page says so. No office position was geocoded or invented.
5. **Inspection hooks:** `window.gsap` and `window.ScrollTrigger` are exposed for the QA scripts. They are harmless; remove them for production.
6. **Companion on touch:** it is never shown, but its pointer listeners are still attached; they return on the first line for non-mouse input. The plan said "no listeners"; the effect is the same.

## Deviations from PLAN-V7 (all deliberate)

**Hero:**
- **Hero V1:** no lightning and no "sky brighten". Flash safety, and the clearing storm already carries the light change.
- **Hero V2:** the drafting grid was built at 16 px, not the planned 32.

**How:**
- **How V2:** four layers, not five. Tear-off is work, not a layer, so it can't be one of the exploded layers.
- **How V2:** the planned hover and press on the layer labels (lift out, lock lifted) was not built. The labels are scroll-driven SVG text: the exploded view is a pure function of scroll progress, and a hover lift would fight the scrub.
- **How V3:** the bg is a ladder, not a step-flashing stair line. The ladder joins three columns more legibly.

**Call:**
- **Call V1:** the plan's "Open now until 5" became an hours line that never says "open now". A holiday closure would make it untrue.
- **Call V2:** the morph keeps the reference's 400 ms, above F17's 0.3 s. It is a state change, not a reveal.
- **Call V3:** the ⟦S1322⟧ footer parallax reveal was **not built**. The footer is shared by all three Call versions, and moving it would change it under V1 and V2 too.

**Companion and budget:**
- **Helper pill:** bottom right, not bottom left. It was moved during the Family build, where bottom left would sit over left-aligned copy such as Family V1's facts.
- **Photos:** encoded at q50–62, not the planned q75, to hold the 1.5 MB target (compared at 1:1, as above).

## Weight (F18: every item over 50 KB)

| Item | Size | Why it earns it |
|---|---|---|
| Tudor photo | 162 KB | Hero V1 full bleed, Work V1 tile |
| ba1-after photo | 162 KB | Hero V2 slide, Work tiles |
| ba2-after / ba2-before | 112 / 69 KB | the only genuine before/after pair (Work V3, Hero V2) |
| job-charcoal / job-truck | 96 / 86 KB | real jobs (Work, Hero V2) |
| team photo | 50 KB | Family V1 letters and V2 gable |
| JS | 269 KB | GSAP core + CSS plugin + utils 78, ScrollTrigger + Observer 43, Flip 19 (Work V2, Towns V2), MorphSVG 11 (Hero V2, Call V2), Lenis 17, DrawSVG + CustomEase 7, page code ≈ 95 (companion 18, hero 13, towns data 6) |
| CSS | 111 KB | 21 versions + dividers + companion + chrome |

Images are base64-inlined (about +33%), which is the price of a single self-contained file.

## Conflicts between the index and the brief (resolved as planned)

- **Model-authored SVG** (⟦S1304⟧ / ⟦S1320⟧ / ⟦S1310⟧) vs the owner's heavy roofing SVG: **the owner wins**. SVG never fakes a job, a person or a product; real photos carry the proof.
- **No custom cursors** (⟦S0213⟧ / ⟦S0617⟧) vs the companion: the companion is **additive** (system cursor kept, Off switch, off on touch and under reduced motion).
- **0.75–1.25 s reveals** (⟦S1321⟧ / ⟦S1322⟧) vs F17: **F17 governs**.
- **One treatment for every clickable** (⟦S1427⟧) vs section-unique buttons: the base signal (fill, weight, 44 px, focus ring) is shared; the SVG reaction differs.
- **Banned "before/after"** vs ba2: ba2 is used inside Work only, never as the old slider section.
