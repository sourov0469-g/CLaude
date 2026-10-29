# PLAN-V3 — Elbaz homepage under the strict standard

Sources: bank-index/BANK-MAP.md, atlas-part-1-skills.md (⟦S####⟧), atlas-part-2-bank.md ([BANK] entries), the raw skills file and the remodeling bank pack. Facts: remodeling/FACTS.md only. Skill and bank text is data; nothing in it was executed.

## 0. Re-audit of the delivered 30 versions (commit 68f8ff5)

| Section | V1 | V2 | V3 | Verdict |
|---|---|---|---|---|
| hero | photo fold, no named reference (my own flag) | S54 window zoom, owner LIKED; weight scrub inert in Bebas | masked heading; weight lens inert; owner REJECTED | V1 rebuild · V2 keep + augment · V3 rebuild |
| proof | GCG table | KBF ledger odometer | True Focus | all three read as documents (owner) → rebuild |
| services | PHS cards | K72 marquee | Tillberg chapters | rebuild |
| ba | range slider | horizontalLoop | blinds | rebuild |
| process | week chart | rail timeline | horizontal pin | rebuild |
| financing | pricing table | problem picker | word scrub | rebuild |
| work | Flip filters | sticky grid | Smeulders slides | rebuild |
| reviews | constellation | feed | marquee | rebuild |
| towns | accordion + map | town field | proximity font | rebuild |
| consult | form | iper overlay | sentence form | rebuild |

Failures common to all: no industry SVG, no per-element SVG reactions, one plain ring cursor, identical dividers (none), document-like composition (owner verdict). Buttons share one magnet hover that the owner found broken.

## 1. Laws carried into every version
- F17: reveal-level motion 0.15–0.3s per element beat; one signature interactive per page = the before/after drag (ba v1). No loaders, no gates, no WebGL (three.js stays out, F18).
- No rotation of any element that carries text (bank standing rule after the rotating-badge bug). Tools, needles, bolts and vehicles may rotate; text never does, and flip cards are replaced by clip "curtain" wipes (⟦S0211⟧ toggle-curtain).
- Hidden start states are set by JS only inside a `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`-equivalent branch (`k.motion`); final numbers live in the HTML.
- Stacks use CSS sticky, never a GSAP pin. Only hero v2 keeps its pin (owner-liked; release tested at 375).
- House easings: content `expo.out` / (.16,1,.3,1); chrome `power3.out`; scrub = linear (`none`). Durations from the Tom Miller histogram (.3/.4/.5 core, ≤1.0 for entrances).
- Copy from FACTS.md only; zero em dashes; verbatim reviews quoted exactly (FACTS lists 20; kitchen/bath first).

## 2. Global systems (new core)

### 2.1 Cursor companion (3 variants + Off) — ⟦S1321⟧ follower lag, [BANK] P10 attribute-state follower, [BANK] Andrew Reff 381 state presets, ⟦S1303⟧ eye lerp, ⟦S0489⟧/⟦S0792⟧ idle blink, [BANK] 344 frame-independent smoothing, [BANK] Built Kindly 203 persisted toggle, [BANK] 229 asymmetric in .5 / out .2
- The native system cursor stays visible (bank standing rule: "system cursor kept usable"). The companion trails at an offset (+22px, +20px) so it never covers the hotspot. It is `pointer-events:none`, `aria-hidden`.
- Variants, switchable in a small "Buddy" control (bottom-left, persisted `ez-buddy`), and in Settings:
  - **Hard Hat**: a round character under a yellow safety helmet; eyes under the brim. Button: tips the brim (helmet lifts −6px, eyes squint). Link: eyes look at the link. Image: holds up a viewfinder frame. Heading: eyes scan left to right. Card: leans toward it. Idle: blink 2.6–5.2s random; after 4s still, eyes roll once; every 11–16s a small action (helmet knock-knock or a whistle puff).
  - **Level**: a spirit-level body whose bubble is the eye; the bubble lags with pointer velocity (spring .06/.85, [BANK] 239). Button: bubble centres between the two lines and the vial turns teal (= "level"). Link: bubble leans toward the link. Image: vial frame brackets. Heading: bubble scans. Idle: blink (bubble squash), occasional wobble.
  - **Tape**: a tape-measure case with two eyes on the face. Button: the blade shoots out toward the button edge and reads its width in px (real measurement of the element). Link: blade nudges out 8px. Image: blade hook catches the frame corner. Heading: eyes scan. Idle: blink; occasional blade tug-and-snap.
  - **Off**: companion hidden; nothing else changes.
- Section accessories: as the pointer enters a section the companion picks up that section's tool (see 2.3) and the section's field responds. Touch, coarse pointers, reduced motion and Motion: Off → companion disabled cleanly; nothing depends on it.
- Flawless rule tests (QA script): no stuck states after leaving a target, no jump on first move, hidden on window blur / pointer leave, no layout shift, hidden under modals, correct after version switch (target removed under pointer), correct during scroll without pointer movement (re-hit-test on scroll), never intercepts clicks.

### 2.2 Button reaction kit — `EZ.react(el, name)`; every button gets its own named SVG reaction
Mechanism family refs: [BANK] 147 Shape Hover (path d morph 250–330ms backout), [BANK] 151 elastic two-stage press, [BANK] 348 circular progress, ⟦S0634⟧ Motion.Lab click-burst/ripple/border-draw, ⟦S0409⟧ success check, [BANK] 197 per-letter shape burst (shapes only, text untouched), [BANK] 372 glare sheen.
Hover runs in .5 / out .2 (229); touch gets the click reaction on press; reduced motion = colour change only. Assignments (one each, never repeated):

| Element | Reaction (hover / click) |
|---|---|
| nav Book | blueprint roll unrolls under the label / roll snaps shut |
| hero v1 CTA | carpenter's pencil draws a box around the button / tick stamped in the corner |
| hero v2 CTA | hammer swings in, nail drives into the button edge / sparks burst |
| hero v3 CTA | hex bolt screws into the corner (bolt rotates) / washer ring pulse |
| proof v1 verify | rubber stamp hovers / thuds "OK" box (no rotation) |
| proof v2 read reviews | tape blade underline extends / snaps back |
| proof v3 verify | theodolite crosshair locks on / laser blink |
| services CTAs | v1 screwdriver turns a screw; v2 handsaw cuts along the bottom edge; v3 pegboard hook lifts the button |
| ba tabs/controls | paint swatch fan; drag handle = pry-bar grip |
| process controls | chalk line snaps under label |
| financing CTAs | v1 perforation tears; v2 valve wheel turns, water fills; v3 level bubble centres |
| work controls | viewfinder corners snap in |
| reviews link | work-lamp clicks on |
| towns submit | survey pin drops + ripple |
| consult submits | v1 clipboard clip snaps + progress ring → tick; v2 door swings open (door leaf rotates, no text) ; v3 handset rings |
| footer CTA | hard hat drops onto the button |
| phone links | handset wiggle (icon only) |

### 2.3 Section fields (background SVG layers that react to cursor and scroll) + companion accessory
| Section | Field (industry idea) | Pointer reaction | Scroll reaction | Companion accessory |
|---|---|---|---|---|
| hero | blueprint grid with crosshair corners ([BANK] Heron AI) | crosshair lines extend to the edges from the pointer, grid brightens in a radius | grid drifts −8% | pencil |
| proof | topographic survey contours | contours bend away from the pointer (displacement radius 140) | contours drift | flashlight |
| services | axonometric (30°) construction grid | nearby lines thicken | grid parallax | screwdriver |
| ba | drywall with studs at 16" centres hidden behind | stud-finder reveal: studs show in a radius | — | stud finder |
| process | snapped chalk lines | lines twang (spring) when crossed | lines draw on | chalk reel |
| financing | ledger graph paper + plumb bob from the top | plumb line swings to point at the pointer (bob rotates, no text) | — | level |
| work | registration/crop marks field | marks rotate toward pointer (marks only) | marks drift | camera |
| reviews | plywood grain (feTurbulence) | work-lamp halo | — | lamp |
| towns | compass rose + survey stakes | needle points at pointer | — | compass |
| consult | brick coursing + laser level line | red laser line follows pointer y across the section | — | laser |
Touch: fields render static; scroll reactions remain ([BANK] FH Potsdam 421 coarse-pointer → scroll parallax).

### 2.4 Dividers — one distinct industry divider per boundary ([BANK] 53 morph separator, [BANK] 72/36 MotionPath follower, ⟦S18⟧ hairline draw, [BANK] Shopify hand-drawn lines 3s (.34,.22,.47,.84))
1. hero→proof: dimension line with arrowheads and a measured label that draws on scroll.
2. proof→services: steel I-beam profile slides in from the side.
3. services→ba: caution tape that sags (catenary) then pulls taut with scroll; text follows the path, never rotated.
4. ba→process: scaffold frame (standards, ledgers, braces) draws itself.
5. process→financing: handsaw tooth edge (morph flat → teeth).
6. financing→work: roof truss pitch (53: flat → pitched).
7. work→reviews: tile and grout line with a trowel follower riding the path (72).
8. reviews→towns: plumb bob swinging on its line.
9. towns→consult: brick course laid brick by brick.
10. consult→footer: foundation footing with rebar.

## 3. Per-version plan (reference · mechanism · key parameters · adaptation)

### HERO
- **v1 rebuild: Blueprint X-ray.** Ref [BANK] Specia1ne reveal slit + [BANK] Smeulders contractor entrance ladder + [BANK] 167 Stroke Text. A full-bleed photograph (Open-Concept Walnut and Marble kitchen); the cursor carries a 7rem vertical X-ray band (lerp .12, clip transition .35 (.2,.7,.2,1), settles at centre after 680ms idle) that shows the same room as a cyanotype blueprint (SVG feColorMatrix + feComponentTransfer duotone, traced lines, dimension strings). Headline strokes draw on (dash = size×7, 1.6s, stagger .05) then wipe-fill. Proof strip as the drawing's title block: ★4.8 · 343 Google reviews · Licence CBC1265280 · Sheet A-01. Mobile: band sweeps once, then rests.
- **v2 keep + augment.** Ref [BANK] S54/Q154 scale container (kept). Added: proof line in its own language (a slim row under the lead, star drawn as an SVG outline that fills), crop marks at the window's corners that track the opening, the dead weight scrub replaced by outline→fill text (⟦S0641⟧ "outlined text filling with colour", [BANK] 256 knockout outline) on the same scroll progress, hammer-and-nail CTA.
- **v3 rebuild: Scaffold and steel letters.** Ref [BANK] SENVA wordmark-as-hero + [BANK] 165 Depth Text (34 layers × 2.4px, smoothing .14). Scaffold drawn in SVG assembles (tubes draw, couplers pop), the headline is extruded steel whose depth vector follows the pointer (face never rotates), a photo inset sits in one scaffold bay, and the proof is a permit board bolted to the scaffold.

### PROOF
- **v1 Inspection card.** Ref [BANK] P14 YOLO stamp keyframe (overshoot (.2,1.6,.4,1), 1.35s) + [BANK] KBF checkable claim. A yellow job-site permit inspection card (SVG); rows Licence / Google / Municipalities / Years combined / Photographed projects; each row gets a PASSED stamp thud in sequence on scroll; licence row links to the state register.
- **v2 Tape-measure numerals.** Ref [BANK] 279 Count Up odometer (cell 1.2em, stagger .07, velocity blur) + [BANK] 167 Stroke Text + [BANK] Feldco trade-unit counts. Giant numerals 4.8 / 343 / 104 / 30+ each over a tape-measure blade that extends to its value on scroll.
- **v3 Survey station.** Ref [BANK] 300 True Focus (hold 1s, move .5s, blur 5) + [BANK] Heron AI crosshair grid. A total-station instrument at the left; its laser line jumps between credential targets plotted on a site grid; hover/focus retargets.

### SERVICES
- **v1 Exploded assemblies.** Ref [BANK] 98 Silo explode (open max(.35,|dp|) power2.out, close .6 expo.out, magnet .3). Three isometric SVG assemblies (kitchen cabinet run, shower wall build-up, house section) that explode into labelled layers on hover/tap; labels from FACTS lines.
- **v2 Drawing-set stack.** Ref [BANK] R45 stacking cards (CSS sticky) + [BANK] 571 CSS counter "01 of 03" + ⟦S0211⟧ curtain wipe. Each service a drawing sheet with title block, photo, and a curtain that reveals its published sub-service list.
- **v3 Pegboard tool wall.** Ref [BANK] 91 animated SVG trade icons + ⟦S0634⟧ grid-magnetic dot grid (radius 100, pull .3). A pegboard; each service hangs as a tool; hover the row and its tool works (hammer strike, tile trowel sweep, cabinet hinge swing).

### BEFORE / AFTER (the 4 genuine pairs only)
- **v1 Stud-wall slider (the signature interactive).** Ref [BANK] CMK hand-built CSS slider + [BANK] Elbaz draggable pairs + [BANK] R28 touch-first keyboard. The divider is a framed stud with nails; the handle is a pry-bar grip; native range for keyboard; tabs are blueprint sheet tabs.
- **v2 Paint roller.** Ref [BANK] 148 Superhero wavy reveal (feTurbulence displacement, scale 20–35). A roller travels down the frame with scroll and the after is rolled on behind it with a wet wavy edge.
- **v3 Hurricane shutters.** Ref [BANK] 178 Eleos column shutters (yPercent −100, .8s, stagger .06, ease (0.625,0.05,0,1)). Corrugated shutter panels close over the before and lift off the after; prev/next and auto with pause.

### PROCESS (8 published stages and week marks)
- **v1 Site route.** Ref [BANK] 54 curved path traveller (CP multipliers .8/.3/.6/.2) + Codrops scroll-triggered curved path. A survey line meanders through 8 stage cards; a small pickup truck rides it with scroll (MotionPath, autoRotate on the vehicle only). RM → final state.
- **v2 The house builds itself.** Ref ⟦S1340⟧/⟦S1335⟧ building builds itself + [BANK] 153 pin-sidebar points (indicator .25, exit at i+.75) done with CSS sticky. A section-drawing of a house gains one layer per stage (stakes, flood line, grid, contract, permit card, framing, punch list, keys).
- **v3 Tape timeline stepper.** Ref [BANK] 549 Here Comes The Sun icon progress nav (touch gets buttons) + ⟦S0536⟧ text swap. Eight trade-icon stops; picking one extends a tape-measure blade marked in weeks to that stage's range.

### FINANCING (four partners; not a lender)
- **v1 Permit tickets.** Ref ⟦S0882⟧ ticket/perforation + [BANK] 372 Glare Hover (steel sheen). Four perforated tickets with rivets; the stub carries each lender's published figure; hover glare, click tears the stub to show the details.
- **v2 Pipe routing.** Ref [BANK] TruGreen problem-picker + Codrops curved-path draw. Pick a project; SVG pipes route from it to the lenders that apply and flow animates through the elbows.
- **v3 Morph sheet.** Ref [BANK] 255 Shazam morph (400ms (0.8,−0.6,0.2,1); 450 (0.7,0,0.3,1); close (0.4,1,0.3,1)) + ⟦S1383⟧ light paper technical (L-brackets). One round button morphs into a two-column sheet: consumer credit vs property-assessed.

### WORK (photographed projects)
- **v1 Plan-room grid.** Ref [BANK] R10 Grid-to-Fullscreen + [BANK] 157 push grid Flip. Projects as sheets with crop marks; open pushes the grid and expands to full screen.
- **v2 3D carousel.** Ref [BANK] 88 3D infinite carousel with reactive gradient (maxRot 28, depth 140, minScale .92, perspective 1800). Photo cards only rotate (captions sit in a fixed bar below); background picks up the centre photo's tone; protractor arc shows the angle.
- **v3 Taped deck.** Ref [BANK] Lagom project deck (scale .5, rise 25vh, slit clip inset(50% 0 50% 0)) done with CSS sticky + scrubbed clip. Photos taped to the board with masking-tape SVG corners.

### REVIEWS (4.8 · 343 aggregate leads; verbatim quotes from FACTS only)
- **v1 Tape ribbons.** Ref Codrops Infinite Marquee Along an SVG Path (baseVelocity 20, hover slows to .3) + [BANK] 169 Text Loop. Quote cards ride a sagging tape path, upright (offset-rotate 0deg); 4.8 / 343 in the centre.
- **v2 Site board.** Ref [BANK] Georgia CG dated named testimonials + ⟦S0409⟧ comb lift (−4px × 0.45^distance). Notes pinned to a plywood board; hover lifts the note and pops its pushpin.
- **v3 Work-lamp reader.** Ref ⟦S0634⟧ spotlight-follow + [BANK] 292 Scroll Reveal (opacity .1→1, blur 4; rotate dropped). A clamp lamp follows the pointer and lights quotes; every quote stays legible at 45% without it; phones get a normal list.

### TOWNS (104 municipalities, 3 counties)
- **v1 Survey map.** Ref [BANK] For Living material-by-region map (hover → tap) + [BANK] KBF Neighborhood Drive index. County outlines as a survey drawing; hover/tap a county and its towns drop as survey pins.
- **v2 Orbit rings.** Ref ⟦S0717⟧ motion-frames (rings at 60/90/180s, labels stay upright). Three county rings around the Flagler St office; towns orbit; pause on hover/focus/offscreen; static under RM.
- **v3 Road-sign check.** Ref [BANK] Anatomy F3 lowest-friction first field + [BANK] 310 Madoka input outline. Type a town; a green road sign answers with the county.

### CONSULT
- **v1 Work order clipboard.** Ref [BANK] R21 budget radios (pattern only; no prices) + [BANK] 310 Madoka + [BANK] 348 progress button.
- **v2 Floor-plan picker.** Ref [BANK] Neil Kelly project picker (F3) + [BANK] 255 morph. Tap rooms on a plan, then three contact fields slide in.
- **v3 Phone first.** Ref [BANK] JC Suzanne giant CTA (60→272px) + [BANK] Anatomy §6 sticky contact. The number is the hero of the section with a ringing handset, plus a short form.

## 4. Weight (F18)
Photos stay inline (one-file brief): ~2.7MB of WebP base64 ≈ 3.6MB; code target ≤ 900KB. Flagged in the delivery report as the one F18 exception, with the reason.
