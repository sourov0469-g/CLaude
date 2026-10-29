# Homepage v3: the immersive build (plan before code)

> **Superseded per version by `AUDIT-V3.md` (29 Oct 2026).** Under the bank reference method, 10 of the 30 versions below were rebuilt from named references (Hero 2, Hero 3, Proof 2, Built 2, Colour 2, Colour 3, Near 2, Near 3, Money 2, Book 3) and 10 were adapted; the audit table names every version's reference. The global systems below still hold, re-dosed per AUDIT-V3 G1-G9.

Brief: `cc-prompt-siding-immersive.txt` (29 Oct 2026). Judgment: WEB-SKILLS.md only. Facts: FACTS.md only. Raw material: PLAN.md (crown assets kept: 886 documented projects, 177 published pairs, price bands, the 312-dot map). Every line below names the skill (tag) that decides it; numbers are the skills' own values from the Skill Pack Notes (notes-01..17).

## 0. What changes from v2 (and why)
- v2 was judged against the old brief. The new brief adds: a custom cursor that reacts per element, layered depth with per-section reacting backgrounds, rich SVG renders (elevation, siding courses, window section), 3D where it earns it, text as motion, credentials, and "never the same trick twice". v2's controller, picks panel, data, pairs and studio carry over; the versions are re-judged one by one below.
- Section 5 "Built to spec" is new: it is where the SVG renders live as instruments (S0526 "the object is the explanation"), not as a lesson.
- 3D decision (S0205, S0206, S1334, S0504, S0526): no whole-page 3D world (S1334: one persistent world contradicts per-section languages and 1/2/3 swaps). Solids are drawn in SVG (S0504 webgl.md: "use a shader only for what lines can't draw … never for solids"). WebGL stays for light and paint (hero 3 brush). Three.js is not loaded (ES-module only since r161, S0313; S1334 warns against file://).

## 1. Global systems

### G1 Custom cursor (S1321, S0197, S0086, S1333, S0159, S0183)
- Two layers, fixed, `pointer-events:none`, centred with `translate3d(-50%,-50%,0)`: a 6 px dot (quickTo 0.12) and a 34 px ring (quickTo 0.35, power3.out) (S1321 cursor; S0197 follower starts at −100,−100).
- Glyph inside the ring = S0086 three-line morph (viewBox 14, round caps, `CustomEase "0.19,1,0.22,1"`, 0.4 s; non-grouped jumps rotate instantly; aria-hidden).
- States by `data-cur` (discrete transitions, S0197): `hero` (magnetic strength 0.18, quickTo 0.45 power3.out, ring snaps to the pill and fills red, glyph arrow 0°), `alt` (next CTAs: ring shrinks, glyph arrow −45°, button gets the S0145 arcade shadow 4→8 px), `drag` (ring 64 px, grip dots spread to ⟷ on press), `view` (ring scale 1.75, plus → cross on press), `map` (crosshair plus + S1323 survey trail, map only), `paint` (ring filled with the live colour), `text` (all three lines collapse; ring 0.5; headings answer, G3).
- Reset the follower on `pointerleave` of each section so it never streaks across (S1333). Hidden and native cursor restored under `(pointer: coarse)` or reduced motion (S1321). Every cursor state has a keyboard and touch equivalent in the element itself (S0159).

### G2 Depth and reacting backgrounds (S1330, S1321, S1425, S1169, S0204, S1348)
- One damped pointer target per page: `alpha = 1-(1-0.055)^(dt*60)`, dt ≤ 1/30, settle rounding to 3 decimals (S1330). Layers move opposite and unequal: background −26/+16 px, midground 42 % of that, copy smallest (S1330). Coarse pointer = authored centre pose.
- Scroll parallax: `y = innerHeight*speed*-1`, speed 0.18 (bg slower, fg faster, text stable), `scrub 1.2`, `invalidateOnRefresh` (S1321). Desktop only; off under reduced motion (S1169).
- Parallax layers are ground (lower contrast, flatter); the instrument is figure (S1425). Scroll parallax and pointer parallax write to different wrappers (S1330).
- Per-section background behaviour (one base tone family, behaviour changes per section; S0145 conflict resolved):
  hero = sky/house/foreground split; proof = giant outline numerals drifting; services = ghost elevation lines that light with the picked part; work = a light band that follows the divider; built = perspective blueprint grid tilting with the pointer, far field faded by mask 15/85 (S1332, S1348); colour = ground tint settles to the chosen paint (settle 0.3-1 s, S0526); near = graticule drifting under the pointer; reviews = oversized quote marks at three depths; money = figure columns at three rates; book = red light folds leaning to the pointer (S1364).

### G3 Text is motion, a different treatment per section
- hero: SplitText lines with `mask:"lines"`, yPercent 100 → 0, blur 8 → 0, 1 s, stagger 0.11 (S1321 line reveal, S0184).
- proof: ScrambleText numerals `chars:"0123456789"`, `revealDelay 0.3`, final value in sr-only at once (S0184).
- services: trade names answer the cursor: SplitText chars + `propIndex`, Mona Sans `wdth`/`wght` driven by pointer distance (S0184 apply).
- work: masked staggered word reveal (S0451).
- built: "drafted" headline: dotted wireframe outline, then fill (S0411 ui generation).
- colour: heading words take the chosen colour.
- near: town names resolve by ScrambleText letters (S0184).
- reviews: staggered word reveal, word stagger 0.05 from y 12 (S1329, S0197).
- money: odometer digits roll 260 ms, only changed digits (S1352, existing Odo).
- book: chat lines type in; headline words rise ~72 ms apart (S1334 DOM rule 40-90 ms).
- Every split keeps the phrase in `aria-label` with pieces `aria-hidden` (S1321, S0184 aria "auto"); split after `document.fonts.ready`; never `text-wrap: balance` on split text (S0184).

### G4 SVG render family (S0504, S0526, S0361, S0407, S0425, S0468)
- One model module in true inches (S0526 "truth first"): lap board 8.25, exposure 7, lap 1.25, butt 5/16, length 144; board and batten panel 48, batten 2.5 at 16 o.c.; NT Executive frame 3.25, IGU 0.75.
- Iso family: orthographic, azimuth 55-60°, elevation 30° (never < 25°), 1 unit = 1 in; paper = page colour; four side tones ~3 % apart, lighter tops, bevels 0.4-1.6, halo ~30 % in light; lines 0.6-1 px `non-scaling-stroke`; exactly one lit part, brand red only there (S0504, S0526).
- Banned inside iso drawings: leader lines, dimension arrows, hatching, floating labels; names and numbers go to a readout and numbered legend buttons (S0526). The dimensioned sheet (S0361) is a different version with its own conventions (outline 1.6, dims 0.7, extension 0.55, 7 px arrows, 11 px dim text, closing formula).
- Draw-on in construction order with DrawSVG / `pathLength=1` (S0407, S0184); motion inside drawings stays calm (springs 64/14.2, 35 ms stagger, idle tour 1.4 s / resume 3.6 s, dt ≤ 1/30, τ 0.1-0.3 s) (S0526, S0504).
- The Rob Roy elevation is traced from the firm's own photo: corners measured on the photo, every horizontal line through the wall's vanishing point (3684, 464), 15 measured lap courses (t = 0.0195 + k·0.06655) plus three under the frieze. It is that job, line for line, not an invented house.

### G5 Version switch and picks (S1246, S0082, S1474)
- Kept from v2: tablist 1/2/3 per section (sticky on desktop, static on phones), keys 1/2/3, picks panel, `?v=` code (now ten digits), instant swap + the new version's entrance. Each swap disposes its timelines, observers, splits and WebGL (S1315, S0184 revert).

## 2. Sections, versions, interactions (each version's language is unique on the page)

| # | Section (axis) | v1 | v2 | v3 |
|---|---|---|---|---|
| 1 | Hero (what leads) | **Courses**: the Rob Roy after photo installs over the before in lap-course strips, bottom-up (30 strips desktop / 18 phone, stagger 0.02, 0.9 s power3.out; PLAN.md blind mask). Pointer depth stack (G2). Hero CTA cursor + magnetic (G1). | **Drawn, then built**: the traced elevation draws in construction order (S0407: grade → wall → courses bottom-up → trim → windows → roof), a scan line wipes drawing → finished photo (S0468, graphite ink + red scan line), scroll on desktop scrubs back to the drawing; pointer tilts the line layers (S1330). | **Paint it**: WebGL brush paints the after over the before (S0646, S0322; DPR ≤ 1.5, render only while active, S0526 webgl rules); cursor = paint ring; touch = button. |
| 2 | Proof (emphasis) | **Record**: 886 · 177 · 4.9 · 474 · 2009 resolve by ScrambleText (S0184); 4.9 as a stroke ring at 98 % (S0197: r 40, stroke 8, round cap, −90°); six credentials as pressable badges with the arcade shadow (S0145) = the "alt" CTA language. | **Wall**: 32 job photos; tiles near the pointer lift and tilt ≤ 4° (S1321 magnetic cards); credentials on an isometric plane `rotateX(60deg) rotateZ(-45deg)` that lift on hover (S0222). | **Statement**: one sentence lights word by word on scroll (S1327) with inline photo pills; credentials as a stamp row. |
| 3 | What needs work (interaction) | **Point at your house**: the Rob Roy elevation as an instrument; hover/tap a part (siding, windows, roof, doors, trim and paint, deck) → that part becomes the one lit red part, others step down a tone (S0526 selection); readout = trade, documented jobs, median band, a real photo; DOM buttons mirror every part (S1334, 44 px). | **Index**: eleven trade rows; names answer the cursor on the variable axes (G3); a photo peek follows (S1321 hover: zoom 1 → 1.06, 0.7 s). | **Tape measure**: drag a $0-$50k tape (Draggable x + Inertia, snap $500, S0184; elastic 0.1, S0197); trades whose middle half covers the mark light up; slider role + keys. |
| 4 | Work (interaction) | **Drag**: divider on Draggable + Inertia, commit at 50 px or 300 px/s (S0184, S0197); pairs change through the logo window panes. | **Blueprint**: before photo → scan line → blueprint of the same house (edge lines extracted from the firm's photo) → scan → after, with a step band "01 · Siding · Rob Roy · $15k-$20k" (S0468: swap only under the blueprint, scan sweeps, ≥ 0.3 s fades). | **Lens**: a spotlight shows the before through the after (S1324: radius 260, pointer ease 0.1, radius ease 0.14); phones get "Show before". |
| 5 | Built to spec (what you hold) | **The wall, apart**: iso cutaway corner of wall on a plinth (studs 16 o.c., sheathing, wrap, HardiePlank courses, trim) that explodes (springs 64/14.2, 35 ms stagger, outermost first) and lights the selected layer (S0526, S0504); legend 01-06; readout "301 of 415 priced siding jobs used the 8.25 in board". | **Window that answers**: one-stroke isometric window (S0425): pointer x tilts the sash, y draws the glass out to show the 3/4 in unit; tour of 3 stops; read-out line under it (no labels on the lines). | **Lap or batten**: dimensioned section sheet (S0361) with a red live dimension; MorphSVG lap profile ↔ board and batten (S0184); split layout drawing left, mono spec rows right (S1361); blueprint grid behind (S1332). |
| 6 | Colour (interaction) | **Dock**: swatches magnify under the pointer (dock), paint sweeps across the wall (existing). | **Drag paint**: carry a chip onto siding, gable or trim; the cursor is the chip (existing). | **Dial**: rotary colour dial (Draggable rotation + Inertia, snaps to the 12 published SW colours, S0184); arrows on the dial. |
| 7 | Near you (entry point) | **Survey**: dots drop by month, the pointer lays a red survey trail at constant spacing (S1323: distance emission, cap 14/frame, idle 0.42 s); finder. | **Towns**: town list drives the map; counts resolve (S0184 ScrambleText). | **Radius**: type your area, the map frames it and a ring you drag sets the miles; count of jobs inside updates (Draggable). |
| 8 | Reviews (density) | **Stream**: two marquee rows whose speed and skew answer scroll velocity; pause button (S1348 15/85 edge mask). | **One**: one big quote; swipe with Observer (`type:"touch,pointer"`, tolerance 10, S0184) or arrows; words stagger in (S1329). | **Names**: pick a crew name; four cards at a time. |
| 9 | Money (entry) | **Amount**: slider + odometer (S1352). | **Budget**: tap a monthly budget; three project sizes count up (S0197 crawl 1.2 s). | **Receipt**: the discount stack prints line by line (existing). |
| 10 | Book (commitment) | **Call**: red field, folds of light lean to the pointer (S1364), giant phone, the "alt" button language. | **Form**: photo + three-step form (existing; S1442, S0661). | **Chat**: one question at a time, lines type in. |

## 3. Content rules (brief + S0471, S0627)
- Short strong lines, no paragraphs of explanation; every section earns trust or the call. Phone (512) 550-0000 visible in header, hero and book.
- Credentials exactly as published: GAF Master Elite · James Hardie Elite Preferred · James Hardie President's Club Award 2025 · Andersen Certified Contractor, Premier · GuildQuality Guildmaster · BBB Accredited A+ (badges used as served, never redrawn).
- One rating string everywhere: 4.9 · 474 Google reviews. 886 documented projects; 177 published before/after pairs; bands exactly as FACTS.md.

## 4. Audit plan (before the file is presented)
- Per version: its skills' checklists (S0526 review checklist and close-up pass for the iso renders; S0361 QA for the sheet; S1324, S1323, S1330, S1327 verify lists; S0184 split revert), plus the consolidated QA checklist (notes-12): reduced motion, keyboard, focus, live regions, touch, overflow at 375/1024/1440, console clean, 50 swaps without leaks.
- Interaction test script (every control, every version), viewport sweeps at 1440 and 375, then the single file opened from disk.
