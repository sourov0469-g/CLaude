# PLAN-FULL: Rembrandt Roofing & Restoration homepage (governed by BRIEF-FULL.md)

Every line below names a reference from the bank (Map → Atlas → deep read / code / live reference), its mechanism with the numbers taken from that entry, and the adaptation for Rembrandt. Facts come only from BRIEF-FULL.md §3. Build target: `rembrandt/v5/rembrandt-homepage.html` (built from `rembrandt/v5/src` by `rembrandt/v5/build/build.mjs`).

Status words: **rebuilt** (new code from a new reference), **upgraded** (kept design on its named reference, brought to this brief's §4 standards), **kept** (untouched).

---

## G. Page systems

### G1 Entrance: direction-aware reveals, the default for every section
- **Reference:** [BANK] Q40 Direction-aware reveals (GreenSock pen pojzxwZ, CROWN). Atlas: `bank-index/atlas-part-2-bank.md` "## [BANK] Q40". Deep read: `previews/bank-selection/roofing/reverse-engineering/deep-reads-slice-1.md` entry Q40.
- **Mechanism:** a ScrollTrigger per content group. `onEnter` → direction +1; `onEnterBack` → direction −1. Each fires `fromTo(y: ±travel, autoAlpha 0 → 1)` with `overwrite: "auto"`, so a reversal mid-flight retargets instead of stacking. `onLeave` / `onLeaveBack` reset the group hidden, so the next entry again comes from the direction of travel. Start `top 85%`, end `bottom 15%`.
- **Parameters (Q40 → F17):**
  - Travel ±100 px → **±40 px** desktop; Q40's own mobile halving gives **±20 px under 640 px**.
  - Duration 1.25 s → **0.3 s** (F17 reveal ceiling); ease expo.out kept.
  - Role groups (eyebrow → title → body → media) offset **0.08 s** (Builder Brief R5).
- **Adaptation:** applied through one helper (`beats()` in `src/js/fx.js` becomes direction-aware), so every section uses the same entrance. Reduced motion: nothing hidden, no tweens.

### G2 Cursor companion: the cursor itself (no plain cursor)
- **References** (V7 companion, kept as the base):
  - ⟦S0489⟧ living illustration; ⟦S0635⟧ gaze-follow.
  - ⟦S1303⟧ pointer lerp: eyes 0.06–0.12 per frame.
  - ⟦S1321⟧ follower: quickTo 0.35 power3.out, cursor dot; ⟦S1309⟧ tilt from horizontal velocity, ≤ 8°.
  - Q395 phase-offset idles; Q381 state presets; ⟦S1455⟧ state machine.
  - [BANK] P10 cursor follower attribute-state.
- **New for this brief (§4 "NO plain or fixed cursor"):** while a variant is active on a fine pointer, the system cursor is hidden (`html.cmp-on { cursor: none }`; text inputs keep `cursor: text`).
  - A **nail-head hotspot** (8 px) sits exactly on the pointer with zero lag (⟦S1321⟧ cursor dot), so pointing stays precise.
  - The character trails at +22 / +22 px.
  - The class is only added after the companion mounts successfully, so a script failure can never leave the page without a cursor.
- **Variants:**
  - House: attic-window eyes, door mouth, chimney hat.
  - Hammer: eyes on the head.
  - Drop: a raindrop.
  - Off: the system cursor returns.
- **Behaviour:**
  - Each variant idles (breathe/sway/wobble), blinks, glances and rolls its eyes, and acts on its own after 6–9 s still.
  - Each reacts differently to button / link / image / heading / card, and hover ≠ press for all five kinds.
  - Switcher pill plus the **H** key.
- **Disables cleanly:**
  - On `(hover:none)` / `(pointer:coarse)` it is not mounted and the cursor is untouched.
  - Under reduced motion it is Off by default.
  - `pointer-events: none` and `aria-hidden`; nothing on the page depends on it.

### G3 Per-section cursor effect (halo / trail / field), and backgrounds react back
- **References:**
  - ⟦S1323⟧ pointer-trail-emitter: emission by distance travelled (step 0.030 of viewport diagonal), re-entry reset, hover:none gate, reduced-motion still frame.
  - [BANK] Q41 renderer caps: hidden-tab skip, small pools.
  - ⟦S1321⟧ halo: lag 0.25–0.45 s, scale 1.75.
- **Effects** (one per section; the kind changes with the section's background; DOM pools moved by transform, ≤ 16 live nodes, nothing drawn while the pointer is still):

| Section | Effect | Kind |
|---|---|---|
| Hero | warm sun halo, 300 px radial, soft-light | halo |
| Reviews | gold star-dust sparks every ~30 px of travel | trail |
| Work | camera viewfinder: four corner ticks that close around the pointer | field |
| Family | wood-shaving curls that fall and fade | trail |
| How | water ripple rings while moving | field |
| Towns | compass ring with a needle pointing along the direction of travel | field |
| Call | phone-signal arcs | trail |

- **Backgrounds react back:** every version keeps or gains a background layer that answers the pointer and/or scroll (listed per version below).

### G4 Reaction registry: every interactive element has its own SVG reaction, hover ≠ press
Owner tooling (the 1·2·3 version switchers, the helper picker) is excluded: it is review tooling, not site UI (logged in PROGRESS.md). Siblings in one control group (six tiles, 24 chips) share their group's reaction.

| # | Element | Hover | Press | Verb mix |
|---|---|---|---|---|
| R01 | Nav Call (desktop) | ridge-vent strip draws along the pill top | the vent's louvers flap | draw / pop |
| R02 | Nav logo (back to top) | a dormer pops up from the pill's top edge | the dormer's pane flashes sun | pop / flash |
| R03 | Bar Call (phones) | a roofing nail hovers at the pill's left edge | the nail drives in with a spark | approach / fly-pop |
| R04 | Bar "Get an estimate" | an underlayment roll peeks at the label end | the roll unrolls under the label | approach / fly |
| R05 | Footer logo | a ladder rises behind the pill | its rungs light in sequence | fly / pop |
| R06 | Footer phone | a sealant bead draws under the number | the bead is tooled flat (squash) | draw / morph |
| R07 | Hero V1 Call | a shingle tab on the pill's top edge lifts in the wind | the tab slaps down; two granule specks scatter | proximity / pop |
| R08 | Hero V1 wall | the depth field lifts and tilts tabs near the pointer | the tabs inside the lettering flip (sweep from the press point) | proximity / morph |
| R09 | Hero V2 Call | label weight swells as the pointer approaches (proximity) | a ridge cap snaps over the pill | proximity / morph |
| R10 | Hero V2 estimate link | a 6/12 roof-pitch caret draws above the link | the caret's pitch steepens | draw / morph |
| R11 | Hero V3 Call | a yard sign plants itself beside the pill | the sign wobbles on its stake | pop / wobble |
| R12 | Hero V3 "All 24 towns" link | a dashed road line draws ahead of the link | an arrow flies off down the road | draw / fly |
| R13 | Hero V3 rotator pause | the two pause bars become two nails | the nails are hammered in (stop) | morph / pop |
| R14 | Reviews V2 "Check it" links | a chalk line snaps under the link | a tick is stamped | draw / pop |
| R15 | Reviews V3 Google link | five stars fly in along the link | they settle with a pop | fly / pop |
| R16 | Work V1 tiles | nail heads pop at the four corners | the tape hook snaps to the tile | pop / fly |
| R17 | Work V1 arrows | they become speed-square corners | a click tick | morph / pop |
| R18 | Work V1 pause | the bars become a level, its bubble drifts | the bubble centres (holds) | morph / settle |
| R19 | Work V2 tiles | a gable cap lowers over the photo | the cap lifts off as the photo flies open | morph / fly |
| R20 | Work V2 close | the X becomes crossed rafters | the rafters fold | morph / fold |
| R21 | Work V3 Before/After | the first or last shingle course outlines | every course lays or lifts (0.3 s) | draw / morph |
| R22 | Family V1 "Call Rachel" | the attic window lights | the door opens | glow / swing |
| R23 | Family V2 phone link | the handset wobbles | ring lines | wobble / pop |
| R24 | Family V3 pills | the truss member highlights and its leader glows | the pill pins | glow / pop |
| R25 | How V1 phone link | a gutter-hanger bracket clamps over the link | its screw turns | fly / rotate |
| R26 | How V2 step tabs | a step-flashing L bends around the tab corner | the flashing snaps flat and the scene changes | morph / pop |
| R27 | How V2 pause | the bars become two shingle tabs | the tabs flip | morph / flip |
| R28 | How V3 verbs | the tool readies (handset lifts, rule unfolds, hammer raises) | the tool works (rings, measures, drives the nail) | fly / morph |
| R29 | Towns V1 list + markers | the marker's gable pops | the distance line draws and the facts open | pop / draw |
| R30 | Towns V2 cards | their course bars rise | (not a control) | rise |
| R31 | Towns V2 sort | the icon's courses stagger | the courses re-lay | morph / fly |
| R32 | Towns V3 chips | the compass needle previews the bearing | the needle commits and the tape pulls out | proximity / draw |
| R33 | Towns V3 input | focus: a tape-measure blade extends along the field | Enter: the tape hook clicks | draw / pop |
| R34 | Call V1 Call | a drop gathers above it | splash ring | grow / pop |
| R35 | Call V1 address link | a map pin drops | the pin bounces | fly / bounce |
| R36 | Call V2 round Call | the rings ring twice | the handset shakes | pulse / shake |
| R37 | Call V2 toggle | its icon redraws stroke by stroke | the circle morphs into the house card | draw / morph |
| R38 | Call V3 band | it slows to 0.3 and the seams catch a light sweep | (it is the tel link) | sweep |
| R39 | Call V3 Call | a chimney rises on the pill | smoke puffs | fly / puff |
| R40 | Call V3 pause | the bars draw themselves | the icon bounces | draw / bounce |

### G5 Motion and weight law
- **F17:** reveal-level motion at 0.15–0.3 s. **One signature interactive: the hero headline system**, in each of the three hero versions.
- **No loaders, no gate intros, no pinned scene-pages:** the old How V2 sticky stage is removed. Reviews V2's sticky header column is a column, not a scene.
- **Text in motion** (the rotator, the count-up rollers) stays at reference timing compressed toward F17. These choices are logged in PROGRESS.md.
- **F18 (code weight):**
  - **One smooth-scroll engine:** Lenis.
  - **MorphSVG drops out:** Call V2's round-to-house paths share one point structure, so GSAP core interpolates the `d` string.
  - **Plugins kept:** Flip (Q157 and the Towns sort are their references' mechanisms), DrawSVG, CustomEase.
  - **Reporting:** code weight and media weight separately.

### G6 Dividers (kept, ⟦BANK⟧ Q53 / R8): a different roofing profile at each boundary
| Boundary | Profile |
|---|---|
| Hero → Reviews | roofline (rises) |
| → Work | shingle courses |
| → Family | chevrons |
| → How | rafters |
| → Towns | step flashing |
| → Call | fish scales |
| → Footer | gutter |

All are scrubbed with scroll and lift near the pointer.

---

## 1. HERO: three fresh builds, three reference families. Each version's headline system is the page's one signature interactive.

### H1 "Shingle wall": rebuilt fresh
- **Family:** instanced tile surface with a depth field (HeyGen HyperFrames block).
- **Reference:** ⟦S0534⟧ heygen-com/code-slice-hero.
  - Atlas: `bank-index/atlas-part-1-skills.md` "## ⟦S0534⟧".
  - Raw skill: WEB-SKILLS.md ⟦S0534⟧.
  - Live source studied: registry block `code-slice-hero.html` (field, pose and flip math).
- **Mechanism:**
  - One surface of cells carries a headline; a second headline sits "behind".
  - A cursor's Gaussian depth field `exp(−falloff·d²/r²)`, cut off smoothly at 0.06 (smoothstep), lifts and tilts the cells near it: tilt ∝ (dy, dx)/r × tiltStrength × pull × depth/160; z = (tilt/30)·depth·0.45·pull; xy pull clamped to 18% / 11% of the cell.
  - **Only cells whose area intersects either headline's ink can flip.** The flip is a half-turn `smooth(p/0.64)` with a damped ring bounce `flipBounce·36·sin(3.3π·t)` and a flight lift `17·sin(πp)^0.7·peak`.
  - Shading on turn: `1 − 0.12·|sin|`. Flip time scales `×(1 + 0.18(1 − peak))`.
  - Ink-free cells lift at 0.55 strength and never flip.
- **Parameters:**
  - From the reference: cursorRadius 210 @1920 → **r = 0.11·width (min 90)**; falloff **1.4**; depth **80**; tilt 55 → **28°** (2.5D canvas); flipDuration **0.75 s**; bounce **0.15**; sweep **2.6 s**, ease strength **3**.
  - Cell size 112 @1920 → **tab width 72 @1440, 40 @375** (height 0.62 × width).
- **Adaptation:**
  - **The cells are 3-tab shingle tabs** in staggered courses, with keyway slots, course shadows and a granule texture drawn once.
  - **The headlines are spelled in a second shingle colour**, as a roof can be: front **FAMILY ROOFERS**, rear **SINCE 1995** (both true facts).
  - The visitor's own pointer (or finger) is the cursor: the field lifts tabs like wind.
  - The reference's sweep runs **once on load** (front → rear). Afterwards a **press/tap anywhere on the wall** sends the flip outward from that point and back.
  - The real H1 is text ("Springboro's family roofers since 1995"), visually carried by the wall.
  - An eave band at the bottom carries the sub-line (Bunk / Wade / Rachel) and the Call button, over a drawn drip edge.
  - Canvas 2D: draws only while something moves; the loop sleeps at rest and pauses offscreen.
- **Composition:** full-bleed wall, centred two-line headline, eave band below. No photo.
- **SVG:**
  - fg: drip edge and gutter lip on the eave band.
  - bg: the wall itself (canvas). Scroll parallax 0.18 as the hero leaves (⟦S1321⟧).
- **Reactions:** R07 (Call), R08 (wall).
- **Reduced motion:** a flat wall showing FAMILY ROOFERS; "since 1995" carried by the sub-line.
- **375:** 40 px tabs, two-line headline, band stacks.

### H2 "Weighted headline": rebuilt fresh
- **Family:** variable-font axis interpolation driven by the pointer (typographic proximity).
- **Reference:** [BANK] Variable Proximity (React Bits).
  - Atlas: `atlas-part-2-bank.md` "## [BANK] Variable Proximity".
  - Deep read: `reverse-engineering/deep-reads-slice-4.md` entry 171.
  - Live: reactbits.dev/text-animations/variable-proximity.
- **Mechanism:** each letter's `font-variation-settings` eases toward a target set by its distance to the pointer.
  - Falloff gaussian `(e^(−2(d/r)²) − e⁻²)/(1 − e⁻²)`.
  - Damping `level += (target − level)(1 − exp(−Δt/(0.2·400)))`, Δt ≤ 64 ms; snap within 0.002.
  - Idle wave after 500 ms of no pointer: period 3.2 s, peak 0.7, span max(220, 0.85 × width), mixed in over 600 ms.
  - The loop stops when everything settles.
- **Parameters:** wght **300 → 900** (Epilogue's variable axis, verified 300–900); radius **1.0 × font-size**; the idle wave runs **two passes then stops** until the pointer moves again (WCAG 2.2.2).
- **Adaptation:**
  - The headline "Springboro's family roofers since 1995." sits on drawn roof courses: each line's baseline is a shingle-course line (SVG) whose keyway notches **lift under heavy letters** (y −4 px × level).
  - The idle wave reads as a gust across the roof.
  - Touch: one wave pass on entry; a finger drag swells the letters under it.
- **Composition:** split. Left 7/12: warm-white panel with the headline (~7 vw, light weight at rest), kicker, sub, Call, estimate link. Right 5/12: the Tudor job photo, full height, its top edge cut to a 6/12 roof pitch.
- **SVG:**
  - fg: the course lines under the type.
  - bg: a faint rafter drawing behind the type that turns ±1.5° toward the pointer; the photo plate on parallax 0.18.
- **Reactions:** R09, R10.
- **Reduced motion:** static at 300 with "since 1995" set at 900.
- **375:** the photo becomes a band above the text, 6/12 pitch preserved.

### H3 "Town rotator": rebuilt fresh
- **Family:** timed character-split word rotation (kinetic headline).
- **Reference:** [BANK] 289 Rotating Text (React Bits, STRONG, "services-list hero pattern") with [BANK] P73 Harvest [204] word-rotator values.
  - Atlas: "## [BANK] 289", "## [BANK] P73".
  - Deep reads: `deep-reads-slice-5.md` entry 289; `deep-reads-slice-4.md` entry 204.
  - Live: reactbits.dev/text-animations/rotating-text.
- **Mechanism:** a fixed sentence with one word slot. Characters split; 'wait' mode (the old word fully exits before the new enters); stagger from last.
  - The highlight block behind the active word resizes to fit each new word.
  - Interval **3.2 s** (P73).
  - Out: **0.45 s sine.in**, yPercent −100, blur 12 px, stagger 0.04.
  - In: **0.8 s sine.out**, yPercent 100 → 0, blur 20 → 0, stagger 0.05.
  - Pause on hover.
- **Adaptation:**
  - "Roofers for **[Springboro]**." The slot cycles the **24 real service towns** (towns.js; Springboro first).
  - The highlight is a **sun-yellow 3-tab shingle tab** (keyway slots on its bottom edge) that resizes to each town; two nail heads pop at its top corners with each change.
  - A quiet counter "3 / 24" ticks.
  - **A visible pause button** (WCAG 2.2.2) plus pause on hover/focus; rests offscreen.
- **Composition:** full-bleed real job photo (the blue house with Rembrandt's own yard sign), bottom-left headline over a scrim, Call + "All 24 towns" link (#area).
- **SVG:**
  - fg: the shingle-tab highlight and nails.
  - bg: the photo on pointer depth (data-pd) and scroll parallax 0.18.
- **Reactions:** R11, R12, R13.
- **Reduced motion:** "Roofers for 24 towns around Springboro." with no rotation.
- **375:** the headline wraps, the tab still fits the longest town (Huber Heights / West Carrollton / Yellow Springs).

---

## 2. REVIEWS

### V1 "Constellation": kept, pixel-untouched
No edits to `src/sections/proof/v1.html`, the `constellation()` function, or the `.pv1` CSS.

**Verification (Phase 2):**
- The `constellation()` source hash equals its owner-kept commit `e685bee` (hash e7d174cd…).
- The v1.html hash equals the checkpoint.
- A deterministic render (seeded Math.random, reduced motion, overlays hidden) of the V1 stage in the checkpoint build vs the final build, pixel-diffed at 1440 and 375.

### V2 "Ledger": upgraded
- **Reference:** [BANK] Cenco Roofing DEEP 5 (every credential carries its issuer's check link), with Anatomy F12 (KBF "The Ledger": print the caveat) and [BANK] #317 Digital Butlers.
- **Mechanism:** one row per credential with its own check link; rows enter at the F17 dose (0.15 s, 0.04 s apart).
- **Adaptation (V7):** the rules are roofer's chalk lines snapped from a reel (DrawSVG 0.3 s + a 90 ms / 2 px vibration).
- **Upgrade:** G1 entrance; reactions R14 (unique); bg courses react to the pointer (kept); G3 effect.

### V3 "Roller board": rebuilt
- **Reference:** [BANK] Count Up (React Bits) roll mode, inside [BANK] Q409 Grow My Business's proof-stack structure.
  - Count Up: Atlas "## [BANK] Count Up"; deep read `deep-reads-slice-4.md` entry 279; code `animation/code-source/count-up-reactbits/`.
  - Q409: CROWN, counters inside the proof stack.
- **Mechanism:**
  - Digit columns are 4-cell vertical strips in 1.2 em windows.
  - Each column travels the mod-10 shortest distance plus extra whole turns (capped at 3 − rank).
  - Columns stagger 0.07 s, capped at 40% of the duration.
  - Per-column motion blur σ = min(cell·0.05, speed·cell/600), applied only when σ > 0.2.
  - Ease cubic-bezier(0.33, 1, 0.68, 1).
  - Fires once at first pixel in view; tabular numerals; an SR-only final value; reduced motion lands instantly.
- **Parameters:** duration 2 s → **1.4 s** (toward F17; the bank's siding report records 1.2–1.6 s trade counters).
- **Adaptation:**
  - **Each digit column rolls on a strip of shingle tabs** (courses moving up a roof), seated under a ridge-cap rail.
  - Aggregate-led: **4.9** (Google stars) and **295** (Google reviews) big; **2001** (BBB A+ since), **1995** (family-run since), **$2M** (liability insurance) small.
  - One link: "Read the reviews on Google" (the same Google destination V2 uses).
- **Composition:** a slate roof panel, two giant rollers left, three small rollers in a row right.
- **SVG:**
  - fg: the shingle strips, the ridge-cap rail, a star for 4.9.
  - bg: a sun sheen band that follows the pointer across the slate (a different background reaction from V2's lifting courses).
- **Reactions:** R15. **Reduced motion:** final numbers, static.

---

## 3. WORK (real jobs only; only ba2 is a before/after)

| v | Status | Reference | Mechanism (kept) | Upgrade |
|---|---|---|---|---|
| V1 | upgraded | [BANK] Q361 horizontal-loop project tiles (CROWN) | speed 2 (200 px/s), center, active tile full brightness / others 0.7, step 0.4 s power1.inOut; tape measure under the loop | G1, R16–R18 (pause becomes a level), bg: the tape ticks brighten under the pointer |
| V2 | upgraded | [BANK] Q157 Push Animation on Grid Items + [BANK] Q147 Shape Hover (chevron preset) | Flip 0.9 expo scale prune; N/S/E/W classification; Q147 roof path 0.3 s | G1, R19–R20, bg: hip pattern on pointer depth (kept) |
| V3 | upgraded | [BANK] Q38 SVG Mask Transitions on Scroll (blinds) | 16 courses laid bottom → top over ba2, scrub 2.2 / 1 | G1, R21, bg: starter-strip nail heads lift near the pointer |

---

## 4. FAMILY

| v | Status | Reference | Mechanism (kept) | Upgrade |
|---|---|---|---|---|
| V1 | upgraded | [BANK] Q95 Masked Heading | WALKER glyph clip over the crew photo, idle drift sin(t·0.21)·18 / cos(t·0.17)·10.8, parallax 26, spotlight r160 | G1, R22 |
| V2 | upgraded | ⟦S1327⟧ scroll-scrubbed word reveal | word progress clamp(reveal·N − i), opacity 0.12 → 1, blur 6 → 0; roof draws in step | G1, R23, bg: roofline adds pointer depth to its scroll parallax |
| V3 | upgraded | ⟦S1362⟧ technical-wireframe info layout | truss + annotation pills, staged labels, connectors DrawSVG 0.3 s | G1, R24, bg: deck window (kept) |

---

## 5. HOW IT WORKS (facts: call Rachel Mon–Fri 9–5 → a written, line-by-line estimate → the roof: Owens Corning Platinum Preferred, $2M insured)

| v | Status | Reference | Mechanism | Upgrade / build |
|---|---|---|---|---|
| V1 | upgraded | ⟦S1325⟧ scroll-progress-timeline | real `<ol>`, spine fill = normalized progress in one rAF, aria-current="step"; downspout adaptation | G1, R25 (replaces the drop/splash that duplicated Call V1) |
| V2 | **rebuilt** | [BANK] UZIK (deep-read 221) / [BANK] P74 Harvest [221] | stacked scenes crossfade **0.4 s** on the content curve cubic-bezier(0.25, 0.1, 0.25, 1); a thin progress bar per step fills **5 s linear = the dwell**; chrome 300 ms cubic-bezier(0.86, 0.1, 0.14, 0.9); CSS-token driven | see below |
| V3 | upgraded | [BANK] Q409 + [BANK] Q411 NVRMND + [BANK] Q91 | Call. Estimate. Roof. with deliverable chips and working tools; ladder | G1, R28, bg: the ladder leans ±1° toward the pointer |

### V2 "Step pager": rebuilt
- **Mechanism:** UZIK's story pager, copied:
  - Three stacked scene layers; the active one fades in over 0.4 s while the others fade out.
  - Below them, three tabs, each with a progress bar whose 5 s linear fill **is** the dwell timer.
  - When the bar fills, the next step crossfades in.
- **Adaptation:**
  - The three real steps, each a drawn roofing scene (no people, no paper estimate, which the §5 ban covers):
    1. "Call Rachel": a handset ringing over the office roofline, with Monday to Friday, 9 to 5.
    2. "A written, line-by-line estimate": a tape measure runs across a roof plane while dimension lines draw.
    3. "The roof": shingle courses lay from eave to ridge; Owens Corning Platinum Preferred, $2M insured.
  - Tabs are buttons (R26); a pause button (R27, WCAG 2.2.2); rests offscreen.
  - Not pinned, and nothing sticky.
- **SVG:**
  - fg: the three scenes.
  - bg: the scene layers on pointer depth.
- **Reduced motion:** no autoplay, no bars; tabs switch scenes instantly.

---

## 6. TOWNS (the 24 towns in `src/data/towns.js`, no additions)

| v | Status | Reference | Mechanism (kept) | Upgrade |
|---|---|---|---|---|
| V1 | upgraded | [BANK] Austin Pro project map (CROWN) | towns at true Census bearing/distance, sqrt radial scale, real-mile rings, list = control | G1, R29, bg rings ripple (kept) |
| V2 | upgraded | [BANK] Q4 Ragged Edge metric-led cards + Hippo doctrine + ⟦S1420⟧ | card headline = median year built, decade bars from zero, Flip sort | G1, R30–R31, bg plan scroll + pointer depth |
| V3 | upgraded | [BANK] ROTTLER town finder + [BANK] West London coverage checker + ⟦S1453⟧ | instant answer, zero-results state | G1, R32–R33 (input becomes a tape blade, not chalk), form submit handler verified |

---

## 7. CALL / CLOSING

| v | Status | Reference | Mechanism (kept) | Upgrade |
|---|---|---|---|---|
| V1 | upgraded | Anatomy F9/F14 + [BANK] OFFF two-tone wordmark + ⟦S1350⟧ gooey drops | drops every 7 s to the call button; hours line in America/New_York (never "open now") | G1, R34–R35, bg: drops lean toward the pointer |
| V2 | upgraded | [BANK] Shazam-like Morphing Button 255 | morph 400 ms cubic-bezier(.8,-.6,.2,1), close (.4,1,.3,1), rings 1.2 s + 0.6 s | G1, R36–R37, MorphSVG replaced by GSAP string interpolation (same point structure) |
| V3 | upgraded | [BANK] Q114 JC Suzanne giant marquee CTA + Q161 + Stronghold 60 s | number marquee on a standing-seam band with a chimney, pausable | G1, R38–R40 |

---

## 8. Order of work (BRIEF-FULL.md §10)
Phase 1 Hero ×3 → Phase 2 Reviews (V1 verify, V2 upgrade, V3 rebuild) → Phase 3 Work → Phase 4 Family, How, Towns, Call → Phase 5 companion as the cursor + G3 effects + background reactions audit → Phase 6 assembly + the §12 gate.

The page systems G1 (entrance) and G4 (registry) are applied to each section as its phase runs. G2 and G3 land in Phase 5.
