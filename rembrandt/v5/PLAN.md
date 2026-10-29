# Rembrandt v5 homepage: PLAN

Binding sources: the owner's DIRECTION CHANGE and decisions in RUN-PLAN.md, and the skills in SKILL-PACK.md, read from skill-notes/ (G1, G2, G3, G4, G7, G9, G10) and by tag from WEB-SKILLS.md (S1321, S1323, S1324 read in full). Every decision below names the skill it comes from. Where skills conflict, the resolution is stated once in section 9.

## 1. Direction contract (S0006 impeccable, new-work)

- **THESIS.** The firm is named after the painter of light, so the visitor's pointer is daylight. It relights the firm's real roofs, lifts the words it passes, and ends on one phone number.
- **OWN WORLD.** Daylight-on-blue, not the Old Masters. The brand's own logo blue covers whole chapters. A sun-amber appears only where you can act. Nothing in it is cream, lamplight, gilt or serif italic: that rendition is spent (S0006 rut rule).
- **STORY.** Arrive at a real Rembrandt job (yard sign and all). See 295 neighbours' verdict. See the work. Meet the family. Learn the three steps. Check your town. Call Rachel.
- **FIRST VIEWPORT.** One real photo at full bleed. One headline, one line, and a working call button (S0006 "a working action in the first viewport").
- **FORM.** Seven chapters with hard colour cuts. Each has its own background behaviour and its own scroll device; none repeats.
- **FINISH.** The page closes on the number, not on a footer fade (S0006 #17).

**Idea sentence** (S0095 competitor test): "On this page, Rembrandt's light becomes the visitor's cursor, a beam of daylight that relights the firm's real roofs and lands on one phone number." Another Springboro roofer cannot sign it.

**Design read** (S1303): Homepage for Springboro and Greater Dayton homeowners with a roof decision. Mode: Persuade. Lane: warm family trade with a playful motion dial. Dials: variance 8, motion 8, density 3, art direction 8. That is inside Persuade (7-9 / 5-8 / 3-5). The owner's "immersive" ask takes motion to the top of the range.

**Macrostructure** (S1303): 4 Long-Scroll Narrative, with a 12 Poster Fold hero.

**Arc:**

| Beat | Section | Archetype |
|---|---|---|
| Hook | hero | H3 photographic fold |
| Proof | proof | data-made-visible, P4 in v2 |
| Solution, shown | work | before/after |
| Who | family | |
| How it works | how | F4, 3 steps |
| Where | area | live check |
| Close | call | C2 + Ft6 |

No two sections share an archetype.

## 2a. Amendments from G5 (direction notes, read after the first draft)
- No en dashes either, and no middle-dot strings in visible text. Hours read "Monday to Friday, 9 to 5".
- Hero: headline ≤7 words, at most 2 lines on desktop (display clamp lowered to 7vw); one sentence ≤12 words: "Bunk started it, Wade runs it, and Rachel answers the phone."
- No labels laid over photos (S0650 9.F): Before and After are control labels or captions outside the photo.
- No hand-drawn houses or scenery (S0650, S1320, S1314). SVG is used for masks, line work traced from the real photos, and data graphics. How v2 becomes a roofline traced from the real charcoal ranch that draws itself; the real roof is then revealed course by course. Call v1 drops the drawn sun. Area v1 uses a plain dot, not a drawn truck.
- Two CTA intents with identical labels everywhere: "Call (937) 746-7377" (tel:) and "Get a written estimate" (anchor to the call section, where the number and the estimate line live). No SMS: texting that line is not a known fact.
- Word budget: at most 450 visible words for the default set, about 80 per screen.

## 2. Content: visitor first, no filler (owner; S0006 distill; S0095 words budget)

About 300 words across the default page. No eyebrows or kickers (S0006 ban). No 01/02/03 section numbers. No em dashes anywhere, alt text included (S1303 #10). One primary action, the call; one secondary, a text to Rachel (sms:) or an anchor to the call section. Facts are only the owner's list. Town names come from the firm's own service list (rembrandt-pack.md), and distances from the US Census gazetteer (v4 towns.json). No licence number, no 24/7, no testimonials, no invented counts (S1303 gate 47).

| Section | Copy (all versions draw from this) |
|---|---|
| nav | logo (exact bytes, on a white pill) · "Call (937) 746-7377" |
| hero | H1 "Springboro's family roofers since 1995." · "Bunk Walker started it. His son Wade runs it. Rachel answers the phone." · [Call (937) 746-7377] · "Get a written estimate" · "Mon–Fri, 9 to 5" |
| proof | "4.9 stars from 295 Google reviews." · "BBB A+ since 2001" · "Owens Corning Platinum Preferred" · "$2M liability cover" |
| work | "Same house. New roof." · captions of 1–2 words ("Before", "After") |
| family | "Bunk Walker started Rembrandt in 1995. His son Wade has run it since 2015. Rachel answers the phone." |
| how | "Call Rachel." / "Get it in writing, line by line." / "We put the roof on." · "Mon–Fri, 9 to 5" |
| area | "24 towns around Springboro." · town names · live answer "Yes. Bellbrook is 9 miles from our Springboro office." |
| call | "(937) 746-7377" · "Rachel answers. Mon–Fri, 9 to 5." · "Text Rachel" · footer: name, Springboro, Ohio, © 2026 |

## 3. Tokens

**Colour** (S0006 committed strategy: one saturated colour on 30–60% of the surface; S1303 contrast floors 4.5 for text and 3.0 for UI; brand from the logo, sampled at #184098):

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--blue` | #1A4199 | brand field (proof, call); white text on it | 9.0:1 |
| `--ink` | #0B1F4D | text on light; how-section field | 15:1 on sky |
| `--sky` | #F2F5FB | light field (work, area, family) | |
| `--mist` | #DCE4F3 | secondary light | |
| `--steel` | #7A8090 | the logo's grey; decoration only, never small text | |
| `--sun` | #FFB81F | the action colour, ink label on it; ≤5% of any viewport (S1303 gate 18) | |

- Neutrals are tinted toward the blue hue (S1303 gate 17).
- No gradients except photo scrims (S0095).

**Type** (S1303 warm pairing, the Epilogue route; S0006 overused-font ban; S0095 one family):
- Epilogue variable, wght 300–900, self-hosted woff2 subset to Basic Latin plus ’ “ ” · – … → ★, `font-display: swap`.
- Five sizes:

  | Token | Value |
  |---|---|
  | `--t-display` | clamp(3rem, 8.2vw, 8.75rem) |
  | `--t-h2` | clamp(2.25rem, 5.2vw, 5.25rem), about 60% of display (S1303) |
  | `--t-lead` | clamp(1.125rem, 1.5vw, 1.375rem) |
  | `--t-body` | 1.0625rem |
  | `--t-small` | 0.875rem; nothing under 13px |

- Headings: line-height ≥1.0 (S1303 gate 37); tracking -0.035em display, -0.02em h2; roman only (gate 38).
- `text-wrap: balance` on headings, `pretty` on body (S0412).
- `tabular-nums` on figures (S0412 #9). Not on the phone number.

**Space** (S1303): 4px base: 4 8 12 16 24 32 48 64 96 128 160 192.
- Pivotal sections (hero, work, call) take 128–192 of padding; standard 96.
- Mobile drops one or two tiers at ≤40rem.
- One separation mechanism: hard colour cuts between chapters (S0095 colour-by-chapter).

**Radius:** 0 on photos (S0095 "square corners everywhere"), 999px on pills and buttons. That is one radius pair.

**Motion** (S0059, S0060, S0410, S0075; the full table is in G7 "Applying" #1):

| Token | Value | Source |
|---|---|---|
| `--ease-out` | cubic-bezier(0.23,1,0.32,1), GSAP "power4.out" | |
| `--ease-in-out` | cubic-bezier(0.77,0,0.175,1), GSAP "power3.inOut" | |
| `--ease-icon` | cubic-bezier(0.2,0,0,1) | |
| press | scale 0.96, 150ms | S0075; one value site-wide |
| hover-in / out | ≤250ms / 150ms | |
| reveal | 600ms | |
| section group | 400–800ms | |
| hero | 1.2–1.6s in 4 beats | S1303 |
| stagger | char 15ms · item 40ms · word 55ms · line 110ms | S1321 tokens for text |
| distances | 4 / 8 / 12 / 24px | |
| blur | ≤8px, one-shot only | S0056 via G9 |

Never `transition: all`, `scale(0)`, `ease-in` on UI, or animated layout properties (S0060 Never Ship).

## 4. Global systems

**4.1 Smooth scroll** (S1321 setup). Lenis `{lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.9, anchors: true}`, driven from `gsap.ticker`, `lenis.on('scroll', ScrollTrigger.update)`, `lagSmoothing(0)`. Off under reduced motion and on coarse pointers (G4 #7: on probation, near defaults, no snapping).

**4.2 Custom cursor** (owner; S1321 Custom Cursor; S1330 damping; S1303 cursor guardrails).
- Markup: a dot plus a ring, `position: fixed`, `pointer-events: none`, `aria-hidden`.
- Following: the ring uses `quickTo(x|y, {duration: 0.35, ease: "power3.out"})` (S1321 lag 0.25–0.45s). The dot follows faster (0.12s).
- The native cursor is hidden only under `(hover: hover) and (pointer: fine)` with motion allowed.
- Reduced motion and touch get the native cursor (S1321 `@media (prefers-reduced-motion: reduce), (pointer: coarse) {display: none}`).
- Text fields keep the native I-beam and the custom cursor hides there (S0212: never hide essential affordances).

It reacts differently per element, read from `data-cursor` on the closest hovered element:

| Element | Cursor | Element response | Skill |
|---|---|---|---|
| default | 8px dot, 36px ring, `mix-blend-mode: difference` | none | S1321 |
| headings `[data-cursor=text]` | ring narrows to a 2px caret the height of the line | characters within 140px lift up to 10px and scale up to 1.06 by proximity (transform only, rects cached on enter and resize, never read per move) | owner "text shifts"; S1321 directional hover <16px; S1330 rect cache; S0019 perf |
| buttons and links `[data-cursor=link]` | ring wraps the element's rounded box | primary CTAs only are magnetic: strength 0.18, `quickTo` 0.45 `power3.out`, translate only, at most 2 per screen | S1321 magnetic; S0019 row 3 |
| photos and cards `[data-cursor=view|drag|call]` | 88px disc (scale 1.75) with a word: Look, Drag or Call | each section's own photo response (below) | S1321 |
| canvas fields (stars, rain) | the section's own form (rain: a small roof chevron) | the field reacts | S1377; S0489 |

**4.3 Depth layers** (owner; S1321 parallax; S0019 rows 13–14; S1330).
- Every version marks `[data-depth="bg|mid|fg"]`.
- Scroll parallax: bg `yPercent` -6, mid -12, fg -20 with `scrub: 1.2` and `invalidateOnRefresh`. Photos sit inside `overflow: hidden` frames at 115% height. Body text never moves; headings get the smallest coefficient (S1330).
- Pointer depth: one listener per section, `quickTo` 0.8 `power3.out`. Depths are -0.015 (bg), 0.03 (mid) and 0.05 (fg), opposing and unequal (S1330 "never move everything equally").

**4.4 The 1 · 2 · 3 picker** (owner; S1303 prototype variants; S0006 live mode; G7 #13; G9 picker checklist).
- Structure: `<fieldset>` with a visually hidden `<legend>` ("Hero version") and three native radios labelled 1, 2 and 3. That gives one tab stop, arrow keys and a visible `:focus-visible` ring. Each target is 44×44.
- It sits sticky at the section's top right, on a solid ink pill (no glass, per S0006's ban on decorative glass).
- Selected state shows by fill plus weight, not colour alone (WCAG 1.4.1).
- Swap mechanics:
  - The swap is instant (S1303 "the picker swaps variants instantly").
  - The outgoing version's `gsap.context().revert()` and cleanup run first, then the new template is cloned and mounted.
  - Its entrance plays once: it is a first view, the rare tier in S0059.
  - `ScrollTrigger.refresh()` runs and the section top is held in place (the v4 keepTop method, no jump).
- An empty `role="status"` region announces "Hero: version 2 of 3". The URL holds `?v=hero2,proof1` via `replaceState`. Focus stays on the picker.
- Hidden versions live in `<template>`s, out of the accessibility tree. Version 1 is in the HTML, so the page works without JS.

**4.5 Content visible by default** (S0006 #6, G4 #14). Hidden start states exist only inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`, after JS boots.

**4.6 Reduced motion** (S0400 tiers via G9; S1303 gate 32). Removed:
- Lenis, pins and scrubs (stacked static content instead)
- parallax and pointer depth
- the custom cursor
- particle motion (a composed still instead, S1377)
- WebGL animation (a still at x=.28, y=-.12, S1330)

Kept: 150ms opacity crossfades, focus rings and colour states.

**4.7 Shared WebGL** (S0743; S1338 contract; S0206).
- One tiny helper: a full-screen triangle, `alpha: false`, DPR ≤2, `getShaderInfoLog`, a `getError` check after the first frame.
- One canvas per media panel, `aria-hidden` and `pointer-events: none`, over a real `<img>` fallback. It fades in only when ready, pauses off-screen and when the tab is hidden, and is disposed on unmount.
- No three.js (S1344 decision in G10).

**4.8 Pin budget** (S0019 "don't pin more than 1–2 sections per page"; G3 ≤4 in any combination). The default combination has 1 pin (family). Any combination has at most 4.

## 5. Sections × three versions

Each version names its axis (S1303 `Variant | Axis | Bet | Cost`) and its skills with parameters. Version 1 is my recommendation for the default page.

### 5.1 HERO: background reacts as light
| v | Name | Axis | What it is | Skills and parameters |
|---|---|---|---|---|
| 1 | **Daylight** | interaction model | ba1-after (the blue house with the Rembrandt yard sign) at full bleed. A WebGL shader relights it: pseudo-normals from luminance gradients and a soft point light at the damped pointer warm and brighten the area under the cursor, and the rest sits at 0.88 exposure. Headline bottom-left over a 55%→0 scrim. N3 nav pill. Scroll-out: the photo drifts slower than the type. | S0743 post-processed image; S1338 contract; S1330 `alpha = 1-(1-0.055)^(dt·60)`, dt ≤1/30, still at (.28,-.12); hero ≤4 beats (S1303): nav → photo clip `inset(0 0 100% 0)`→0 and scale 1.08→1 over 1.1s power4.out (S1321 image reveal) → H1 lines yPercent 100→0, blur 8→0, stagger 0.11, 1.0s power4.out (S1321 lines) → subline and CTAs rise 16px; S0019 row 14 layers on scroll-out |
| 2 | **Aperture** | layout and hierarchy | Giant two-line type fills a sky-white fold with the Tudor in a small inset frame between the lines. Scrolling pins and grows the frame to full bleed while the lines slide apart (fg faster than bg). The pointer moves type and photo in opposite directions. | S1321 pinned scene: `start: "top top"`, `end: "+=100%"`, `scrub: 1`, `pin: true`, `anticipatePin: 1`; S0095 placement family "inset frame that grows"; S1321 mouse-reactive layers (quickTo 0.8, depth photo -0.02 / type +0.04); S0451 masked word rise on load; S1321 image zoom 1→1.06 over 0.7s on hover |
| 3 | **Blueprint** | visual treatment and interaction | job-charcoal rendered as white linework on blue (an edge render of the real photo, so the pair aligns pixel for pixel). The cursor is a spotlight showing the real photo through the drawing. A "Show the photo" button serves touch and keyboard. A scan-down reveal on load and a 48px grid drifting ±16px. | S1324 exactly: radius 260 (140–220 compact), pointer ease 0.1, radius ease 0.14, mask stops 0/40/60/75/88/100 at alpha 1/1/.75/.4/.12/0, collapse on leave, cancel and blur, rAF stops when settled; S1324 grid parallax (opacity 0.1, ±16px, ease 0.06); S1321 clip reveal 1.1s power4.out |

### 5.2 PROOF: background reacts as a field
| v | Name | Axis | What it is | Skills and parameters |
|---|---|---|---|---|
| 1 | **Constellation** | data made visible | A blue field. 295 small stars, one per Google review, drift in from scattered positions and settle into a huge "4.9" as you scroll in (scrubbed). The pointer pushes stars aside and they spring back. Credentials sit in one quiet line below. | S1326 normalized progress (scrub `start: "top 85%"`, `end: "center center"`); S0340 named model: "each star a mass of 1 on a 2.2 Hz spring, ζ 0.7; the pointer is a repelling field of radius 120px", one shared rAF that stops when settled; S1377 three depth tiers (scale .3–.5 / .5–.85 / 1.05–1.9, opacity .22–.40 / .46–.78 / .50–.82) and per-star variance; the count is exactly 295, data not decoration; reduced motion shows the formed still |
| 2 | **Odometer** | hierarchy and density | P4 stat strip of five figures, 1995 · 4.9 · 295 · A+ · $2M, each with a one-line label. Digits roll on entry; hovering a figure tilts it and re-rolls. Background: a shingle-course pattern drifting with the pointer. | S1303 P4 (3–5 real metrics, tabular); G4 #11 odometer 260ms per changed digit, easeOutCubic, final values in the HTML; S1321 magnetic card tilt (rotateX/Y <4°); S1324 grid-parallax recipe (±16px, ease 0.06) on the pattern |
| 3 | **Zoom-through** | motion vocabulary | Pinned. A giant "295" fills the screen; scrolling dives through the counter of the 9 into "4.9", then through to "A+", then "$2M". Each figure has its caption. The pointer tilts the type a little. | S0019 row 6 pin (`end: "+=300%"`, `scrub: 1`); S1321 pinned story scene; S1330 near yaw 0.055 rad / pitch 0.026 rad; reduced motion stacks the four figures |

### 5.3 WORK: background reacts as frames
| v | Name | Axis | What it is | Skills and parameters |
|---|---|---|---|---|
| 1 | **Split** | interaction model | ba2 Before and After as a side-by-side diptych, each photo cropped in its own panel (no alignment). A draggable divider re-proportions the two panels. It idles with a slow 15%↔85% demo until first touched. "Same house. New roof." | S1303 wipe tween (`duration: 4, ease: "sine.inOut", yoyo, repeat: -1`, range 15–85, reduced motion 50%); S0059 comparison via `clip-path: inset()` (plus counter-translate to keep each focal point centred); drag with `setPointerCapture`, multi-touch guard, `touch-action: pan-y`, release spring 500/30 keeping velocity (S0089, S0340); a native `<input type="range">` for keyboard (S0006 #16); cursor "Drag"; entrance clip `inset(0 0 100% 0)`→0, 600ms ease-in-out (S0060) |
| 2 | **Street** | layout (horizontal) | Pinned horizontal run of six real jobs (ba2 before, ba2 after, Tudor, charcoal ranch, blue house, truck). Inside each frame the photo counter-parallaxes; a progress line fills. | S1321 `initHorizontalGalleries` (x to `-(scrollWidth - innerWidth)`, `end: +=scrollWidth`, `scrub: 1`, pin, `anticipatePin: 1`, `invalidateOnRefresh`); G4 #6 inner image ±7%, 115% oversize; S1325 progress fill; S1321 magnetic card tilt <4° |
| 3 | **Dissolve** | motion vocabulary | Pinned. Before turns into After through a WebGL noise dissolve scrubbed by scroll; the pointer tilts the image plane; the label swaps Before→After. | S1326 canvas mode with normalized progress (`end: "+=200%"`, scrub, `ease: "none"`); S0743 shader; S1338 contract; S1330 tilt; S0410 text swap (4px, 150ms); reduced motion shows the pair side by side |

### 5.4 FAMILY: background reacts as depth
| v | Name | Axis | What it is | Skills and parameters |
|---|---|---|---|---|
| 1 | **Sentence** | motion vocabulary (text) | Pinned. The family sentence brightens word by word as you scroll. The team photo opens beside it with a clip reveal and drifts at bg depth; a sun bar sweeps under each name. | S1327 scroll-scrubbed word reveal (words .18→1 opacity, links preserved, `end: "+=150%"`); S1321 image reveal; S0019 parallax bg; sun bar `scaleX` 0→1, 500ms (S0410 emphasis) |
| 2 | **Years** | structure (timeline) | 1995 → 2015 → today on a line that fills with scroll; the active year counts up; the team photo arrives at "today". Huge faint year numerals move at bg speed. | S1325 scroll-progress timeline (progress fill, active steps, reduced-motion fallback); counters easeOutCubic, tabular (G4 #11); S0019 multi-layer parallax |
| 3 | **Strata** | composition | The team photo is cut into three horizontal bands (sign, people, ground) that slide at different rates on scroll and opposite ways under the pointer, settling into one picture at centre. | S0019 row 14 `yPercent (i+1)·-8`, `scrub: 0.5`, at most 3–4 layers; S1330 opposing unequal layers; S0489 "calm by default" |

### 5.5 HOW: background reacts as weather
| v | Name | Axis | What it is | Skills and parameters |
|---|---|---|---|---|
| 1 | **Shelter** | interaction model | An ink field with rain in three depth layers. The cursor is a small roof that sheds the rain (splashes on contact). The three steps are set big; near-layer drops cross in front of the type. | S1377 layers and density `k = clamp(sqrt(W·H/(1440·900)), .5, 1.3)`, per-drop variance, sprite `drawImage`, pause hidden and off-screen, dt ≤1/30, DPR 2; S0489 rain linear seeded ±20%; S1377 "nothing may depend on the pointer" (rain is complete without it); reduced motion shows a composed still |
| 2 | **Re-roof** | narrative (SVG) | Pinned. An SVG ranch, drawn after the charcoal job, has its old roof lifted and new courses laid row by row as you scroll. The three steps appear at 0.2 / 0.55 / 0.9 progress. A tree sways and clouds drift. | S1326 SVG mode, normalized progress, `end: "+=200%"`; S0407 SVG animation; S0489 one main action + idle loops (tree 1.5–4° over 3–6s, clouds 20–60s), seeded phases, frame 0 and final frame checked |
| 3 | **Stack** | layout (stacked cards) | Three full-width cards (blue, sun, sky) stick and stack; the previous card scales to 0.94 and slides back. | S1322 sticky card stack; S0410 scale tokens; S0489 "opacity only to appear or disappear" |

### 5.6 AREA: background reacts as a map
| v | Name | Axis | What it is | Skills and parameters |
|---|---|---|---|---|
| 1 | **Route** | narrative (path) | A road line draws itself through the 24 town names in distance order as you scroll, with a truck marker riding it. Each town lights as the line reaches it; the job-truck photo sits behind at bg depth. | S0407 stroke draw-on (`getTotalLength`) and motion along a path, scrubbed; S1321 parallax |
| 2 | **Your town** | interaction (live tool) | "Is ___ on the list?" with an inline input. As you type, the 24 names light by match, and a full match answers "Yes. Bellbrook is 9 miles from our Springboro office." | S1442 form design (label, `autocomplete="address-level2"`); S0661 (no per-keystroke motion, S0089); answer in `aria-live` |
| 3 | **Radar** | data (geo) | Distance rings at 5–25 miles around Springboro, towns at true bearings, a slow sweep that pings each dot; hovering grows the nearest label. | S0489 water rings (0→1 with bell fade) and endless loops linear; IntersectionObserver pause; S1321 magnetic on dots |

### 5.7 CALL: background reacts as the sun
| v | Name | Axis | What it is | Skills and parameters |
|---|---|---|---|---|
| 1 | **Number** | hierarchy (type as CTA) | A blue field with the phone number as one huge tel link. Digits drop in like shingles, then each spring toward the pointer. A sun in the corner leans its rays toward the cursor. Footer line. | G4 #18 char fall (0.1s per char, once); S0340 named model "each digit a mass of 1 on a 1.35 Hz spring, ζ 0.74"; S1321 magnetic CTA 0.18; S0489 sun rays |
| 2 | **Text Rachel** | interaction (converter) | "What's your roof doing?" with four big choices (Leaking, Storm damage, Missing shingles, Just old). Picking one writes an `sms:` message to (937) 746-7377 that you send yourself; "Call instead" sits beside it. | S0095 #3 live thing; S1448 micro-interaction spec; S1445 copy voice; S0412 press 0.96 |
| 3 | **Sign-off** | motion (marquee) | Two giant counter-running marquees, "(937) 746-7377" and "Call Rachel · Mon–Fri 9–5", coupled to scroll velocity and draggable, with a pause button. Ft6 footer. | S1303 Ft6; S0019 marquee rules; G4 #16 (20–30s linear, visible pause, IO pause; WCAG 2.2.2); S0340 field with friction for the drag |

## 6. Motion thesis (S0006 animate; written before code)

- **One focal moment per section.** The hero's light, the stars forming 4.9, the divider, the sentence, the rain, the route and the number.
- **Continuity.** Version swaps are instant, then the new version's own entrance plays.
- **Feedback.** Press 0.96 at 150ms on every button. The cursor answers every element type.
- **Budget.** At most 2 pins in the default combination, at most 4 in any. No identical fade-rise twice: every section enters with a different vocabulary (mask lines, assembly, clip wipe, scrubbed words, weather, path draw, char fall).
- **Never animated:** the phone number's text in nav and footer, body copy, focus moves, or anything on every scroll-by (reveals fire once).

## 7. Photos (embedded; owner's attached set only)

| Photo | Source | Embedded | Used in |
|---|---|---|---|
| ba1-after | Layer-1.png | 1480w webp | hero v1, work v2 |
| tudor | 5.jpg | 2000w webp | hero v2, work v2 |
| job-charcoal | Layer-2-1.png | 1156w webp, plus a generated linework twin | hero v3, how v2 reference, work v2 |
| ba2-before / ba2-after | 3.png / 4.webp | 1024w webp | work v1–v3 |
| team | 2.webp | as is | family v1–v3 |
| job-truck | Layer-3-1 | 1102w webp | area v1, work v2 |
| logo | 1.png | exact bytes | nav, footer |

- Each image is inlined once (a shared registry).
- Every `<img>` has width and height. The hero image gets `fetchpriority="high"`.
- No visible credits (S1303 gate 49).

## 8. Build and file

- Source lives in `v5/src` (HTML shell, CSS, JS modules per section).
- `v5/build/build.mjs` bundles with esbuild into an IIFE, inlines GSAP 3.13 (core, ScrollTrigger, SplitText), Lenis 1.3.4, the font and the images, and writes `rembrandt/v5/rembrandt-homepage.html`. It opens by double-click.
- Each section's three versions sit behind its picker.
- Gates, run with Playwright on the built file:
  - zero console errors
  - every version mounts and unmounts with no orphaned triggers
  - no horizontal scroll at 320–1920
  - reduced-motion pass
  - axe
  - screenshots at 1440×900 and 390×844 of every version

## 9. Conflicts resolved

| Conflict | Resolution |
|---|---|
| Custom cursor: S0617 and S0095 ban it; S1324 keeps the native cursor | The owner requires it, and S1321 is the governing cursor skill. Guardrails are kept: fine pointer only, native under reduced motion, the native I-beam in fields, never moving a CTA out from under the pointer (S1303). |
| Picker animation: S1303 "instant" vs G4/G7 crossfade | Instant swap, then the version's own entrance. |
| Press scale: 0.97 (S0059) vs 0.96 (S0412) | 0.96 everywhere (S0075: one value per project). |
| Exit easing | Short ease-out exits; never ease-in on UI (S0059 over S0083). |
| Hero-metric template (S0006 ban) vs rolling figures (S0095) | No figures in the hero. Proof shows them as data-made-visible (v1), a stat strip (v2, S1303 P4) or a zoom (v3). |
| Lenis (S1321) vs "smooth scroll reads as lag" (S0652) | Lenis near defaults, off for touch and reduced motion. |

## 10. Order of work and audit

1. Framework, plus hero, proof and work (9 versions) at full quality. Self-audit each version against its skills (G9 per-section checklist). Checkpoint, commit.
2. Family, how, area and call, one section at a time, each audited, then commit.
3. Whole-page audit:
   - G9 whole-page list
   - S1303 11-axis critique stamp
   - S0412 review table
   - Fix every P0 and P1, then deliver.
