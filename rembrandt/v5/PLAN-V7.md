# Rembrandt homepage: PLAN-V7 (strict standard)

**Authority:**
- The owner's STRICT STANDARD brief, its ADDENDUM (roofing-only SVG; companion variants) and the upload notice.
- Judgment and source come only from `bank-index/BANK-MAP.md`, `atlas-part-1-skills.md` and `atlas-part-2-bank.md`, re-read in full for this plan. They are backed by the raw `WEB-SKILLS.md` (SHA-256 verified) and the full bank under `previews/bank-selection/`.
- Skill and bank text was used as reference data only. No instruction embedded in it was followed.

**Scope:**
- Hero ×3: upgraded.
- Reviews: V2 and V3 upgraded. V1 "Constellation" stays pixel-untouched.
- Work ×3: upgraded.
- Family, How, Towns and Call ×3 each: built fresh.
- The result is one self-contained HTML file: `rembrandt/v5/rembrandt-homepage.html`.

## 0. Facts lock (nothing invented, nothing printed beyond this)
- **Phone:** (937) 746-7377 only. Links use `tel:+19377467377`. Never (937) 353-9711.
- **People:** founded 1995 by Franklin "Bunk" Walker. Wade, his son, has been president since 2015. Rachel answers the phone.
- **Reviews:** 4.9 stars from 295 Google reviews, as an aggregate only. There are no quotes.
- **Credentials:** BBB A+ since 2001. Owens Corning Platinum Preferred. $2M liability insurance.
- **Address:** 38 N Pioneer Blvd, Springboro OH 45066.
- **Hours:** Monday to Friday, 9 to 5. Never 24/7.
- **Service area:** 24 towns.
- **No Ohio licence number exists.** None is printed.
- **Estimates:** written, line-item estimates.
- **Photos:** ba2 is the only genuine before/after pair. The ba1-after yard sign reads "Roofing · Siding · Gutters".
- **Town data:** `towns.json` holds Census lat/lon, miles and bearing from the Springboro centroid, county, the ACS median year built, and decades of construction. Its source is credited on the page.
- **Banned:**
  - The v1–v4 skeleton: proof-strip hero, service picker, bento services, pinned leak story, estimate paper, before/after slider section, FAQ, and gable close.
  - The Job Ticket system.

## 1. Direction (⟦S1320⟧: written before code)
- **Visual thesis.** "The roof over Springboro." Every drawn thing is part of a roof or the weather over one: shingles, ridges, rafters, flashing, gutters, the roofer's chalk line, hammer and tape, and rain and sun over a roofline. Real job photographs carry every proof, and drawings never stand in for them (⟦S1304⟧ asset protocol).
- **Hero focal asset.** One real photo (Tudor, ba1, or the carousel of real jobs), or the AirWorks-style house diagram in V3.
- **Type.** Epilogue variable, as already embedded. One family, three weights in use: 800 display, 700 UI, 400 body. Section heads are capped at about 60% of the hero display size (⟦S1303⟧). Body measure 45–65ch (⟦S1430⟧).
- **Colour.** The brand tokens already in `base.css` (blue `#1a4199`, ink `#0b1f4d`, sky `#f2f5fb`, sun `#ffb81f`), plus two drawing roles: shingle charcoal `#3a4152` and chalk blue `#6f9be8`. Sun marks actions only and covers no more than 5% of any viewport.
- **Section sequence.** Hero (hook) → Reviews (proof) → Work (solution) → Family (trust) → How (mechanism) → Towns (reach) → Call (close, the peak-end ⟦S1452⟧).
- **Motion narrative.**
  - Reveals sit at the F17 level: 0.15–0.3s, decelerating.
  - The single signature interactive belongs to the hero version on screen (⟦S1303⟧ / F17 one per page).
  - Every other section moves only through its scroll-linked drawing, its per-element reactions, and its background layers.
- **Scroll engine.** One engine: Lenis, lerp 0.08 (⟦S1321⟧). It is off for touch and reduced motion. No scroll hijacking (⟦S1209⟧).
- **3D decision.** No Three.js: it is the 589KB class that is capped to owners' portfolios (Builder Brief). 3D appears once, in How V2: a CSS-3D exploded roof assembly, where depth explains the layers (⟦S1362⟧ exploded wireframe, ⟦S0159⟧ isometric roof cutaway).
- **Asset provenance.**
  - Photos are the owner's.
  - Every SVG is drawn by hand in this file.
  - Town numbers come from US Census / ACS via `towns.json`, and the page prints that source line.

## 2. Conflicts found in the index, and how they are resolved (recorded for the report)
| Index says | Owner brief says | Resolution |
|---|---|---|
| ⟦S1304⟧ / ⟦S1320⟧ / ⟦S1310⟧: no model-authored SVG illustration | Heavy custom roofing SVG in foreground and background | The owner wins. SVG is drawing, diagram, divider, data graphic or companion. It never fakes a job, a person or a product. Real photos carry proof. |
| ⟦S0213⟧ / ⟦S0617⟧: no custom cursors; ⟦S1303⟧: mascot tracking is a playful device to mood-check | Animated companion, with variants | It is additive. The system cursor is always kept (bank CURSOR law). It is `pointer-events:none` and `aria-hidden`. It is off on touch and under reduced motion, has an Off switch (WCAG 2.2.2), and is kept small and restrained. |
| ⟦S1321⟧ / ⟦S1322⟧ reveals take 0.75–1.25s; Q40 takes 1.25s | F17 reveal level is 0.15–0.3s | F17 governs. Q40 is dropped as the house entrance and replaced by R5 role-grouped beats: 0.3s each, 0.08s apart. |
| ⟦S1427⟧: every clickable shares one treatment | Every section's buttons differ | Every button keeps the same base signal: fill role, weight, 44px height, and focus ring. What differs per section is the SVG reaction (on hover and on press). |
| ⟦S1436⟧: exits ease-in | Reconciled rule: no ease-in for UI | Exits use the same decelerate curve, about 20% faster. |
| Banned list includes "before/after" | ba2 is the only true pair | ba2 is used inside Work only, never as the old slider section. Work V3 lays the after photo course by course over the before photo. |
| Hero V3 (V6) facts grid | "Proof-strip hero" is banned | Hero V3 is rebuilt around a different reference (AirWorks). |

## 3. Version acceptance criteria (⟦S1472⟧: fixed before comparing; each can fail a version)
**Threshold criteria. A version that fails any of these is out:**
1. Its facts match §0. No invented number, quote, town, price, credential or licence.
2. A named reference is given, its mechanism is copied, and its key values are used.
3. It differs from its siblings in behaviour, not only in look (⟦S1474⟧: sequence, unit of interaction, division of labour, entry point, commitment point).
4. Roofing-specific SVG in both foreground and background, using an idea not used in any other section.
5. Every interactive element has its own SVG reaction, and hover differs from press.
6. Overflow 0 at 1440, 1024, 390, 375 and 320.
7. Reduced motion renders a designed final state.
8. Keyboard path complete; focus visible.
9. axe: 0 serious or critical.
10. No console errors.
11. No more than 3 flashes per second.
12. Loops pause offscreen and when the tab is hidden (⟦S1315⟧).
13. Nothing depends on the companion.

**Trade-off criteria:**
- Weight.
- Craft parity with the siblings (⟦S1417⟧).
- Restraint (⟦S1306⟧ decorative-stacking test).

## 4. Shared systems

### 4a. Drawing style (⟦S1421⟧ one hand, ⟦S1463⟧ icon grid)
- Flat 2D, with round caps and round joins.
- Stroke widths: 2px on a 24px grid, and 1.5–2.5px at large scale with `vector-effect: non-scaling-stroke`.
- No more than 3 colours per piece, drawn from the roles in §1. Shading is ink at 0.06–0.2 opacity (⟦S1301⟧), not new hexes.
- Decorative SVG is `aria-hidden="true" focusable="false"` (⟦S1007⟧).
- Inline SVG is used only where CSS or JS needs control (⟦S1241⟧).
- Heavy SVG is built near the viewport: IntersectionObserver with rootMargin 600px (⟦S1087⟧); inactive versions stay in `<template>`.

### 4b. Shape dividers: a different roofing profile at every section boundary
- **Mechanism:** [BANK] **Q53** OnScrollPathAnimations / R8 separator.
  - viewBox `0 0 100 10`, `preserveAspectRatio="none"`, about 150px tall (90px on phones).
  - `attr:{d}` is scrubbed from "top bottom" to "bottom top" with ease none. The start path and end path have the identical command and point structure.
  - The fill is the active version's background (`--sec-bg`).
- **Cursor reaction:** the divider points nearest the pointer lift up to 6px (lerp 0.12). The loop runs only while the pointer is within 160px.
- The divider sits on each section's lower edge, outside the version stage, so Reviews V1 keeps every pixel.

| Section | Profile | Scroll morph |
|---|---|---|
| Hero → | Roofline skyline: five gables at different pitches | rises from flat to the full roofline |
| Reviews → | 3-tab shingle course bottom edge | tabs lift and then lay flat |
| Work → | Hip-and-ridge chevrons | amplitude grows as you pass |
| Family → | Exposed rafter tails (scalloped eave) | the tails extend out of the wall line |
| How → | Step flashing, stair-steps | the steps climb left to right |
| Towns → | Fish-scale (scalloped) shingle edge | the scallops deepen |
| Call → footer | K-style gutter profile with a lip | the gutter tilts to drain |

### 4c. Background layers that react
- **Mechanism:** ⟦S1321⟧ mouse-reactive layers (depth 0.04, quickTo 0.8 power3.out) and ⟦S1330⟧ (near layers move more than far ones; text has the smallest coefficient), through the existing `depth.js`. Scroll parallax goes through `[data-sy]` and stays below 5% where photos are involved (Druk ⟦S1374⟧).
- **The companion's background answer:** every section's background reads the companion's position from CSS variables `--cx` and `--cy` on the section, and answers in its own way (§6, column "background reacts").

### 4d. Per-element SVG reactions
- **Spec format:** ⟦S1448⟧: trigger, rules, feedback, duration/easing.
- **Durations:**
  - Hover: 150–250ms decelerate.
  - Press: 100–150ms, scale 0.96 (⟦S0405⟧ / ⟦S1388⟧).
  - A second-stage release may use the ⟦S1465⟧ spring `cubic-bezier(.34,1.56,.64,1)`, on entrances only.
- **Gating:** hover reactions are gated by `(hover:hover)`. Press reactions also run on touch and keyboard (Enter/Space).
- Each section's map is listed under that section in §6.

### 4e. The house entrance (replaces Q40)
- **Mechanism:** Builder Brief R5 / Q12 Eloy Benoffi role-grouped 4-beat entrance: eyebrow, then title, then body, then media.
- **Timing:** beats 0.08s apart. Each move is 0.3s, y 16px→0 with opacity, `--ease-out` cubic-bezier(.23,1,.32,1) (⟦S1303⟧).
- **Trigger:** "top 82%", once.
- **Safety:** hidden start states are set only by JS inside the no-preference branch (Builder Brief ship rule).

## 5. The cursor companion (owner's Rule 4 and Addendum 2)
**References:**
- ⟦S0489⟧ rossark-motion-skill: living illustration. Pupils glance, eyelids blink, the body breathes.
- ⟦S0635⟧ oil-motion: gaze-follow characters.
- ⟦S1303⟧ tastemaker pointer lerp: eyes follow at 0.06–0.12 per frame, up to 10–25px, easing back when the pointer leaves.
- ⟦S1321⟧ follower lag: quickTo 0.35 power3.out.
- ⟦S1309⟧: tilt only from horizontal velocity, capped at 8°.
- #362 loaders: mismatched periods give an idle that never repeats.
- Q395 Shruti: phase-offset idle pairs.
- Q381 Andrew Reff: named state presets, tweened per state.
- ⟦S1455⟧ explicit state machine.
- ⟦S1323⟧ / ⟦S1333⟧: emission by distance travelled, with the re-entry reset.
- P10 cursor follower attribute-state.

**The three variants (switchable), plus Off:**
| Variant | Character | Idle (no repeat: periods 2.6s / 4.3s / 7.1s, coprime) | Acts on its own (after 6–9s still) |
|---|---|---|---|
| **House** | A little gable house. Its eyes are the two attic windows, the door is its mouth, and the chimney is a hat. | Breathes (scaleY 1→1.03), blinks (window shutters drop for 120ms), glances | Puffs a chimney smoke ring; rolls its eyes; tips its roof like a hat |
| **Hammer** | A claw hammer standing on its handle. Its eyes are on the head. | Sways ±3°, blinks, glances | Taps a nail it carries (squash and stretch); twirls once (non-text, 360° over 0.6s) |
| **Drop** | A raindrop | Wobbles (gooey ⟦S1350⟧ squash), blinks, glances | Sheds a droplet that falls and fades; wipes its brow |

**Reactions by element type** (`data-c` on the element, or inferred from the tag). Hover and press differ:
| Element | House | Hammer | Drop |
|---|---|---|---|
| Button | hover: the roof lifts like a hat, eyes widen · press: the door opens, a "yes" bounce | hover: cocks back · press: strikes, with a squash and a spark line | hover: swells · press: splash ring |
| Link | hover: leans toward it, the chimney points | hover: points with the claw | hover: stretches toward it into a teardrop |
| Image | hover: the windows become a camera, a shutter blink (100ms, never repeating) | hover: becomes a level, the bubble centres | hover: becomes a lens (a ring and highlight around the pointer) |
| Heading | hover: eyes scan left to right, reading | hover: underline tick marks | hover: beads on top |
| Card | hover: settles low and peeks over the edge | hover: taps the corner (nail) | hover: puddles under the card |

**Per-section mood** (the companion's accessory, and how the section's background answers):
| Section | Accessory | Background reacts |
|---|---|---|
| Hero | umbrella when raining, sun visor when dry | clouds part around it; rain slants away from it |
| Reviews | chalk-line reel | shingle courses near it lift slightly (wind) |
| Work | tape measure | the tape's tick marks under it brighten |
| Family | hard hat | rafters near it highlight |
| How | tool belt | the exploded layers turn toward it (V2), and the spine glows near it |
| Towns | map pin | distance rings ripple from its position over the map |
| Call | phone handset | gutter drops collect toward it |

**Behaviour:**
- **Placement:** offset (+22px, +22px) from the pointer, so it never hides the hotspot. The system cursor is always shown.
- **Size:** 44px. The accessory is 18px.
- **Cost:** one rAF loop, paused when the tab is hidden or the pointer leaves, with dt clamped to 1/30s.

**Switcher:**
- A small fixed pill at the bottom left, desktop only: "Helper: House · Hammer · Drop · Off".
- It is a radio group (fieldset and legend) with SVG thumbnails.
- The key **H** cycles through the options.
- The choice is saved in the same `tweaks-rembrandt-home` store, merged with the version choices.

**Disables cleanly:**
- `(hover:none)` or `(pointer:coarse)`: not mounted at all, and no listeners.
- Reduced motion: Off by default. Choosing a variant shows it without idle loops (a static follower).
- Nothing on the page depends on the companion.

**QA:**
- Every variant × every section × every element type, at 1440.
- At 375: absent.
- Reduced motion: static or Off.
- Frame sampling to confirm no jitter. Confirm it pauses offscreen and when the tab is hidden.

## 6. Version plans

### HERO: each version is the page's one signature interactive
| v | Status | Named reference | Mechanism and key values | Adaptation | SVG (fg / bg) | Reactions (hover ≠ press) |
|---|---|---|---|---|---|---|
| 1 | **Upgraded** | ⟦S1321⟧ cinematic-gsap-lenis-motion-system (CROWN), with ⟦S1341⟧ threejs-weather (storm = rain intensified) ported to SVG | **⟦S1321⟧:** clip `inset(0 0 100% 0)`→0, 1.1s; image scale 1.08→1; masked lines yPercent 100→0, stagger 0.11; parallax image 115%, speed 0.18; mouse depth 0.04. **⟦S1341⟧ storm dial:** drops 60→100%, speed ×1→×1.42, slant ∝ v²; one pre-allocated pool. **⟦S1339⟧:** light states cross-fade and never jump. | The Tudor at full bleed. "Springboro's family roofers since 1995." **Signature:** the weather over the roofline. Rain falls over the Tudor's roof, and the cursor steers the rain's slant. Scrolling 0→40% of the hero clears it: rain thins, clouds part, and the sun warms the scrim. The roof holds. One soft sky brighten at most every 9s, small and under the type; none under reduced motion. | **fg:** the Tudor's real ridge and gable lines, traced from the photo, draw themselves (DrawSVG 0.9s) and catch light near the cursor. **bg:** cloud bank (3 depth layers) plus rain streaks (canvas-free SVG, 40 strokes recycled) | **Call:** hover = a ridge line draws across the button top · press = the shingle tab under the label flips down. **"Get an estimate":** hover = a chalk line snaps under it · press = a nail-head dot. |
| 2 | **Upgraded** | [BANK] Smeulders Interieurgroep (deep read 506, live site visited), with Q146 morphing background shape | **Smeulders:** out 0.7 power2.in → in 1.1 power3.out; headline words y24, 0.85 power3.out, stagger 0.06; crossfade power1.inOut; image-filled display type; "1 / N" counter. **Q146:** one giant fixed shape changes posture per slide (morph 2000–3000ms), then breathes between path and pathAlt, 3500ms linear alternate. | The real jobs, carousel-style. The H1 is filled with the job photo. **Signature:** a large blueprint outline of each job's roof form (gable, cross-gable, hip, traced from that photo) morphs between projects and breathes. | **fg:** the "1 / 4" counter becomes four shingle tabs; the active one is laid, the others lifted. **bg:** the blueprint roof outline, on a 32px drafting grid. | **Prev/next:** hover = the arrow becomes a rafter that tilts toward its direction · press = the tab row shifts one course. **Pause:** hover = drawn pause bars · press = they become a play gable. **Call:** hover = roof-pitch caret above it · press = a press bounce. |
| 3 | **Rebuilt** (the V6 facts grid read as the banned proof-strip hero) | [BANK] **AirWorks** (HVAC triple crown): hover-the-house trouble-spot diagnostic, GSAP plus a CSS backstop. With [BANK] **BLK 531** (CROWN): one inline SVG whose id'd zones are re-filled | **AirWorks:** the illustration responds per spot, with an accessible list as the alternative. **BLK:** zone fill easing `cubic-bezier(.645,.045,.355,1)`; overshoot `(.175,.885,.32,1.375)` for the pop. | Split stage: copy on the left; a large hand-drawn house elevation on the right. Point at, or tab to, any roof part (ridge, shingles, flashing, chimney, valley, vents, gutters, drip edge, fascia). It lights up and its name appears: "Every part you point at is a line in your written estimate." Real fact: written line-item estimates. **Signature:** the diagnostic house. | **fg:** the house diagram (about 9 zones) with callout leaders (⟦S1300⟧: leader lines land on the right layer). **bg:** the weather over the roofline, quiet: sun arc plus three drifting clouds. | **Zones:** hover = the zone fills and its leader draws · press (or Enter) = the zone pins, and its label is announced politely. **Call:** hover = a gutter drip runs along the bottom edge · press = splash ring. |

### REVIEWS
| v | Status | Named reference | Mechanism and key values | Adaptation | SVG (fg / bg) | Reactions |
|---|---|---|---|---|---|---|
| 1 | **KEPT, pixel-untouched** | "Constellation" (⟦S0687⟧ family) | unchanged | unchanged | Not touched. The divider sits outside the stage, below the section. | Not touched |
| 2 | **Upgraded** | [BANK] **Cenco Roofing** DEEP 5 (every credential carries a Verify link), with Anatomy F12 / KBF Ledger (figure plus caveat) | Rows arrive at the F17 dose: 0.15s ease, 0.04s apart. | The ledger rows as built in V6. **New:** the rules are roofer's chalk lines. Each one is pulled taut and snapped: a 90ms vibration of 2px, then the blue chalk dust line stays (DrawSVG + a short `attr:d` wobble), drawn as the row enters. | **fg:** the chalk lines and the chalk-line reel at the top of the ledger, which unreels as the rows arrive. **bg:** faint shingle courses receding in perspective; courses near the companion or cursor lift 2px. | **"Check it" links:** hover = a small chalk line snaps under the link · press = a drawn check mark is stamped. |
| 3 | **Upgraded** | [BANK] **Q161** GSAP seamless marquee (CROWN), with the Stronghold 60s marquee token and Q149's velocity response | Q161 `{repeat:-1, paddingRight:100}`. Scroll velocity maps [0,1000]→[0,5] as a speed boost, then springs back (Q149, spring 100/20). Pause button. | Two proof trains, as built. **New:** they run on two ridge-cap rows, so each train sits under a row of ridge shingles that ripples with velocity. The separators are drawn roofing nails. | **fg:** the ridge-cap shingle rows. **bg:** a giant pitched roofline, a 6/12 slope drawn at 2px, whose angle subtly follows scroll velocity (±1.5°, no text on it). | **Prev/next:** hover = a nail lifts · press = it is hammered flush. **Pause:** hover = the bars are drawn · press = the play triangle becomes a gable. |

### WORK (real jobs only)
| v | Status | Named reference | Mechanism and key values | Adaptation | SVG (fg / bg) | Reactions |
|---|---|---|---|---|---|---|
| 1 | **Upgraded** | [BANK] **Q361** horizontal-loop project tiles (CROWN) | speed 2 (200px/s), `center:true`, `paddingRight:150`, centre tile active, others at brightness 0.7 | The six real photos, as built. **New:** a roofer's tape measure runs under the loop, and its ticks travel with the track, so the loop reads as a measure. The active tile's caption sits on the tape's hook. | **fg:** tape blade with inch ticks and the hook. **bg:** the roof-pitch protractor (a speed square), whose angle tracks the active tile. Decorative. | **Tiles:** hover = nail heads pop at the four corners (pop 0.85→1 overshoot) · press (step) = the tape hook snaps to the next tile. **Arrows:** hover = they become speed-square corners · press = a click tick. |
| 2 | **Upgraded** | [BANK] **Q157** Push Animation on Grid Items (STRONG), with [BANK] **Q147** Shape Hover Effect, chevron preset | **Q157:** Flip 0.9s expo. **Q147:** `M 0 0 L 0 182 L 90 126.5 L 180 182 L 180 0 L 0 0 z` → `M 0,0 0,38 90,58 180.5,38 180,0 z`, 300–330ms; caption rises 50px→0 over 0.3s. The Q147 chevron is literally a roof shape. | The 3×2 grid of real photos. **New:** on hover, a gable cap made of sky colour lowers over the tile top like a roof being set; on open, the full photo sits under a drawn roofline. | **fg:** the gable caps. **bg:** a hip-and-ridge pattern grid (very faint) that shifts with the cursor. | **Tile:** hover = the gable cap lowers · press = the gable opens up (the roof lifts off) as the photo expands. **Close:** hover = an X made of crossed rafters · press = the rafters fold. |
| 3 | **Upgraded** | [BANK] **Q38** SVG Mask Transitions on Scroll, horizontal blinds (STRONG) | 30 slits, stagger 0.02, scrub 2–2.5 (about 1 on phones), crispEdges, rebuilt on resize | The ba2 pair. **New:** the slits are shingle courses with 3-tab notches. They open **bottom to top**, the order a roofer lays shingles, so the after photo is "re-roofed" over the before photo as you scroll. Labels "Before" and "After" sit outside the frame. | **fg:** the notched course mask plus a tiny roofer's hammer riding the current course edge. **bg:** a starter-strip line and drip edge drawn under the frame. | **Labels:** hover = the course outline highlights · press (Before/After buttons) = it jumps to 0% or 100%, with the courses animating 0.3s. |

### FAMILY (fresh; no individual is identified in the team photo, so there are no portraits and no illustrated people, per ⟦S1320⟧)
| v | Named reference | Mechanism and key values | Adaptation | SVG (fg / bg) | Reactions |
|---|---|---|---|---|---|
| 1 | [BANK] **Q95** Masked Heading (STRONG) | Per-glyph clipPath. Rise 1.15em, power4.out. Idle drift sin(t·0.21)·18 and cos(t·0.17)·10.8. Spotlight r160. Smoothing 1−exp(−dt/0.18). | "WALKER" filled with the team photo. Beneath it, the three facts lines. | **fg:** a ridge board and rafters frame a roof over the name: the name is under the family's roof. **bg:** a soft attic-window light that follows the cursor (the spotlight). | **Spotlight:** hover inside the letters. **"Call Rachel" link:** hover = the window lights · press = the door opens. |
| 2 | ⟦S1327⟧ scroll-scrubbed word reveal (STRONG) | word progress = clamp(reveal·N − i); opacity 0.12→1; blur 6→0; y 0.12em→0; span 160vh; TreeWalker split | A short statement in brand voice. It is not a quote and is attributed to no one. "Bunk Walker started Rembrandt in Springboro in 1995. His son Wade has run it since 2015. When you call, Rachel answers." The team photo sits in a gable-shaped frame. | **fg:** a house outline draws its roof over the paragraph in step with the reveal (ridge first, then courses). **bg:** Springboro roofline silhouettes far behind (parallax −3%). | **Phone link:** hover = handset wobble · press = ring lines. |
| 3 | ⟦S1362⟧ technical-wireframe-info-layout (annotation pills joined by connector lines to parts of a wireframe object, staged) | Labels appear in stages; connector paths draw (DrawSVG 0.3s); wide sparse layout | **"The truss":** a king-post roof truss drawn large. Each member is labelled with a family fact. Ridge: "Bunk Walker, founder, 1995". King post: "Wade Walker, president since 2015". Bottom chord: "Rachel, on the phone, Mon to Fri, 9 to 5". Web members: "BBB A+ since 2001", "Owens Corning Platinum Preferred". Gussets: "38 N Pioneer Blvd". | **fg:** the truss and its connectors. **bg:** the roof deck sheathing grid. | **Truss members (buttons):** hover = the member highlights and its leader glows · press = the pill pins open. |

### HOW (fresh; facts: 1 Call Rachel, Mon–Fri 9–5 → 2 a written, line-by-line estimate → 3 the roof: Owens Corning Platinum Preferred, $2M insured)
| v | Named reference | Mechanism and key values | Adaptation | SVG (fg / bg) | Reactions |
|---|---|---|---|---|---|
| 1 | ⟦S1325⟧ scroll-progress-timeline (STRONG) | A real `<ol>`. The spine runs between the first and last dot centres. Fill uses scaleY(progress) in one rAF. `aria-current="step"` when reached. Left rail on phones. | **The spine is a downspout.** Water fills it as you read. The step dots are gutter hangers, and a drop sits at the head of the fill. | **fg:** downspout, elbow and hangers. **bg:** a gutter run across the top, with the companion's drops. | **Steps:** hover = the hanger tightens (a 2px pull) · press (anchor) = a drop falls to that step. |
| 2 | ⟦S1340⟧ threejs-towers (STRONG process metaphor), ported to SVG with CSS 3D. ⟦S1326⟧ supplies the progress math. | A rising clip line: below it the finished roof, above it the bare deck and a ladder. Stage captions name what passes; a quiet % sits in the corner. Progress is a pure function of scroll; copy stops at [0, 0.42, 0.78]; a CSS-sticky stage, the only sticky stage on the page. | The three steps as stops. At **0**, Rachel's phone. At **0.42**, the estimate is shown as line items labelled on the roof itself (not paper): tear-off, deck, underlayment, shingles, ridge vent. At **0.78**, the roof is finished. **3D (it earns its place here):** at stop 2 the layers explode apart in CSS 3D (translateZ, perspective 900) so each line item is a visible layer. | **fg:** the house cross-section, its layers and the ladder. **bg:** sky with a slow sun arc tied to progress. | **Line-item labels:** hover = the layer lifts out · press = it locks lifted. **Call:** hover = ladder rungs light · press = press bounce. |
| 3 | [BANK] **Q409** Grow My Business process with deliverable chips (CROWN), [BANK] **Q411** NVRMND three verbs (hand-drawn SVG icon set), and [BANK] **Q91** animated SVG icons | **Q409:** scrub 0.2, start "top bottom-=10%"; moves 0.6 power3.out, compressed to 0.3 by F17. **Q91:** steps {from,to}, 200ms, bound to press, never hover-only. | "Call. Estimate. Roof." in three columns. Chips: "A real person" / "Mon to Fri, 9 to 5"; "In writing" / "Line by line"; "Owens Corning Platinum Preferred" / "$2M insured". | **fg:** three hand-drawn icons (phone handset, folding rule, hammer and nail). **bg:** step-flashing stair line linking the columns. | **Icons:** hover = handset lifts / rule unfolds / hammer raises · press = it rings / measures / drives the nail (Q91 steps). |

### TOWNS (fresh; `towns.json` real data; source credited)
| v | Named reference | Mechanism and key values | Adaptation | SVG (fg / bg) | Reactions |
|---|---|---|---|---|---|
| 1 | [BANK] **Austin Pro** project map (CROWN: "the map IS the claim"; plot only what is real) | Points at true positions. Labelled honestly. Hover or tap for detail. | The 24 towns projected from Census lat/lon around the Springboro office, with 5 / 10 / 15 / 20 / 25-mile rings and a north arrow. Selecting a town draws a line from the office: "9 mi NE · Greene County · homes built around 1979". Labelled "Placed by US Census position, not job pins". | **fg:** the town markers (tiny gables) and the office house. **bg:** distance rings that ripple from the companion or cursor position. | **Town marker:** hover = the gable pops up · press = the distance line draws and its facts open. |
| 2 | [BANK] **Q4** Ragged Edge metric-led cards (STRONG), with the Hippo genuinely-local doctrine | Card headline = its metric; power2.out 0.3s; stagger 0.08 | Cards sorted by the median year homes were built, oldest first. Each card has a tiny bar chart of the real decades-of-construction data (⟦S1420⟧: bars from zero, direct labels). A filter sorts by distance. | **fg:** bars drawn as stacked shingle courses. **bg:** fish-scale shingle texture. | **Card:** hover = its bars rise · press (sort buttons) = the courses re-lay. |
| 3 | [BANK] **ROTTLER** 500 town finder ("postcode finder twice") with [BANK] **West London** coverage checker (CROWN) | Instant answer; zero-results state (⟦S1453⟧) | "Is your town on our list?" Type or pick a town. Answer: "Yes. Bellbrook is 9 miles NE of our Springboro office. Homes there were mostly built around 1979." Not found: "That one isn't on our list of 24. Call Rachel and ask." | **fg:** a compass rose whose needle swings to the town's bearing (no text on the needle), and a drawn measuring line whose length is scaled to the miles. **bg:** survey contour lines. | **Town chips:** hover = the needle previews · press = it commits. **Input:** focus = the chalk underline draws. |

### CALL (fresh; the close)
| v | Named reference | Mechanism and key values | Adaptation | SVG (fg / bg) | Reactions |
|---|---|---|---|---|---|
| 1 | Anatomy **F9/F14** (offer produces a number), [BANK] Giant two-tone wordmark (OFFF), [BANK] **#319 Bakstad** footer NAP record | Static. F17 reveal. | "Get a written, line-by-line estimate. Call (937) 746-7377." A true live state from the real hours (America/New_York): "Open now until 5" or "Back Monday at 9". The REMBRANDT wordmark in two tones. NAP record: Wade Walker, president; the address; the phone. | **fg:** a gutter and downspout run along the section. Drops form at the gutter lip and pinch off with a gooey neck (⟦S1350⟧, one every 7s, paused offscreen), then run to the Call button. **bg:** a K-style gutter profile. | **Call:** hover = a drop gathers above it · press = splash ring. **Address link:** hover = a map pin drops · press = pin bounce. |
| 2 | [BANK] **Shazam-like Morphing Button** 255 (Atlas: "Call now" button morphs into the contact card) | Morph 400ms cubic-bezier(.8,-.6,.2,1). Content exits −25px over 0.4s; next enters from +25px. Ripple ring 1.2s ease-out infinite, second ring delayed 0.6s. Close 400ms cubic-bezier(.4,1,.3,1). Paths share point counts. | A big round Call button rings (the ripple rings). Pressing "Show the details" morphs it into a **house-shaped card** (gable top): Rachel answers · Mon to Fri, 9 to 5 · (937) 746-7377 · 38 N Pioneer Blvd. The tel link stays the primary action. | **fg:** the round-to-house morph and the handset. **bg:** rooflines silhouetted at dusk. | **Round button:** hover = rings speed up · press = morph. **Close:** hover = a rafter X · press = morphs back. |
| 3 | [BANK] **Q114** JC Suzanne giant marquee footer CTA (STRONG), with the ⟦S1322⟧ footer parallax reveal | Size 60px→272px; hover colour 300ms; one marquee, pausable; footer from yPercent −12 at 0.85 opacity to rest by 45% | The phone number in giant type, as a slow marquee band. A static readable copy sits above it as the real link. "Rachel answers. Monday to Friday, 9 to 5." | **fg:** a chimney on the band's roofline, puffing slow smoke (ambient, 6s, paused offscreen). **bg:** a standing-seam roof band behind the marquee. | **Band:** hover = slows to 0.3 and the seams catch light · press = it is the tel link. **Pause:** hover / press = the bars are drawn. |

## 7. Budgets (F18 and ⟦S1166⟧)
- **Target:** at most 1.5MB total (the maximum in ⟦S1166⟧). **Hard ceiling:** 2.0MB.
- **Photos:** re-encode to WebP q75, longest edge at most 1600px (Tudor, ba1) or 1200px (others).
- **JS:** GSAP core, ScrollTrigger, SplitText, DrawSVG and MorphSVG (all free in 3.13), plus Lenis. Flip is used only if Work V2 still needs it.
- **DOM:** at most about 1,500 nodes live. Inactive versions stay in templates, and heavy SVG is built near the viewport.
- Every item that costs more than 50KB is justified in the report.

## 8. Accessibility contracts
- **Section pickers:** stay a radio group (already built) and announce the swap politely.
- **Companion switcher:** a radio group. The companion itself is `aria-hidden`.
- **Inactive versions:** not in the DOM; they live in templates.
- **IDs:** unique, prefixed per section and version.
- **Interactive SVG zones:** `<button>`s or focusable `<a>`s with accessible names, mirrored by a visible list (Hero V3, Family V3, Towns V1).
- **Auto-moving content:** pausable (Hero V2, Reviews V3, Call V3).
- **Flashing:** no more than 3 per second anywhere. The lightning glow is a single soft pulse and is off under reduced motion.
- **Reduced motion:** designed still frames. The scrubbed drawings show their completed state, and dividers show their end shape.
- **Touch targets:** at least 44px on mobile. Focus is never hidden behind the sticky nav (⟦S1047⟧).
- **Other:** one H1 (the hero's). Town data is also available as text.

## 9. Build order
1. Shared systems: tokens, the entrance, dividers, background-reaction plumbing, the reactions library, the companion and its switcher, and photo re-encoding.
2. Each section in turn: Hero, Reviews (V2, V3), Work, Family, How, Towns, Call. Each one is built, then QA'd at 1440, 375, 320 and reduced motion, frame by frame, then committed and pushed.
3. A full-page gate:
   - Every `?v=` combination switch.
   - The overflow gate.
   - axe.
   - Offscreen-animation count of 0 (⟦S1315⟧).
   - A companion sweep.
   - A weight report.
4. Append the BANK-MAP usage log, send the file, and write the per-version delivery report.
