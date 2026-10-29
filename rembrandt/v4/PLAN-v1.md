# PLAN v1: Rembrandt Roofing & Restoration, "In Good Light"

Portfolio redesign of a real roofing firm (Springboro / Greater Dayton, Ohio). Planning document for the build runs. Written 2026-10-28.
Phone, always: **(937) 746-7377** (`tel:+19377467377`). One number everywhere. Nothing in this plan is site code.

How to read this plan: §1 is the idea. §2–3 are the systems every section uses (tokens, the light system, the switcher, the funnel). §4 is the homepage section by section, three versions each, default marked ★. §5 is the whole-page choreography. §6 pages, §7 conversion, §8 budgets, §9 shot list, §10 build sequence, §11 what I need. Appendix A is the skill pack, Appendix B the bank patterns, Appendix C the fact sheet and copy rules.

Skill tags (⟦S….⟧) refer to `~/workspace/previews/WEB-SKILLS.md`. Bank references (R1–R45, deep-read entry numbers, F1–F18) refer to the research bank. Every exact value in this plan comes from one of those two sources unless it is marked **[decision]** (my own value, with the reason).

---

## 1. The concept

### 1.1 One story
**A roof is a painting nobody looks at until the storm.**
Rembrandt the painter is remembered for one thing above all: light that reveals. Rembrandt the roofer does the same job on a house. After a storm, damage hides. Under low, raking light it shows. The firm gets on the roof, looks at it in good light, photographs what it finds, writes every line of the price down before anyone lifts a tool, restores it layer by layer, and the homeowner's signature at the final walkthrough starts the lifetime warranty.

The homepage tells that story in one continuous light: **the scroll position is the sun.** The page opens on the promise in golden light, drops back into a storm night, comes up through the dawn of an inspection, into the plain daylight of a written estimate, through install day, and ends at noon on a signed roof, then evening in the footer. Type casts real shadows that swing and shorten as the sun moves. Photographs share one grade that warms as the page lightens. Nothing moves for decoration: every moving thing is light changing, time passing, or a document being written.

Working line: **"Your roof, in good light."**

### 1.2 Why it could only be this company
- **The name.** Rembrandt + *Restoration*. Art restoration has a working vocabulary that maps one-to-one onto their real process: the condition report (inspection), raking light (how hail bruises are actually found), layers (deck, underlayment, shingles), documentation (photos), the signature (sign-off). No other roofer can borrow this without looking silly. (We never claim the firm was named after the painter: see §11, Q1.)
- **Their founding.** Bunk Walker built the name in 1995 restoring storm-damaged properties. The storm is their origin, not a stock trope.
- **Their real promise.** A written line-item estimate before any work starts, never without the customer's written approval; progress photos; a final walkthrough before sign-off; lifetime workmanship warranty. The site's structure is that promise.
- **Their place.** Ohio: about 19 hail days a year, hail season April to July, freeze-thaw November to March with 50-degree swings in a week, ice dams in January and February. The storm chapter is Ohio's year, not a generic storm.
- **Their brand blue.** Their royal blue becomes the colour of the roofer's chalk line and the ink of a signature: the two marks a roof job leaves.

### 1.3 Why award-tier and not template-tier
1. **One signature system, not a pile of effects:** the moving light (sun angle from scroll) drives cast-shadow type, photo grades and the relight shader. One idea, felt everywhere.
2. **A WebGL moment that IS the service:** the visitor sweeps an inspector's lamp across a real macro photograph of hail-bruised shingles, and the bruises appear. It is the inspection, not decoration (§4 S3).
3. **A carrier object across sections:** the roof system explodes layer by layer (S4) and each layer flies into the written estimate as a line item (S5). The eye follows one object across the seam (⟦S0544⟧ carriers).
4. **A document that writes itself and is also the form:** the estimate request is filled in on the estimate paper. Submitting stamps it in blue ink: the peak moment (⟦S1452⟧).
5. **Typography as material:** an expanded industrial grotesk ("built") against a book serif ("written"): the two promises of the firm, set as two voices.
6. **Proof designed to be checked:** every credential links out to the body that issues it (Google, BBB, Owens Corning). "We don't paste reviews here. Read them where we can't edit them."
7. **The market law (roofing.md, 798 firms):** displayed review volume, published proof, verifiable credentials and interactive craft almost never coexist on one roofing homepage. This one has all four. That is the portfolio claim.

### 1.4 What we are deliberately NOT doing (the safe patterns refused)
- Split hero with a photo on the right and a stack of buttons on the left (v2's hero).
- Clip-art SVG house/drop/hammer icons, icon tiles above headings, six "why choose us" tiles.
- Photo-left / text-right service cards, identical rounded cards, card grids of any kind as the default container.
- A count-up stat band as decoration. Numbers appear where they mean something (S9 review numeral, S7 warranty years).
- Testimonial slider. Auto-scrolling project or logo marquee (⟦S1314⟧ "marquee demanding attention"; bank R16 is not used).
- Fade-and-slide-up on every section (⟦S0001⟧). Each section has its own entrance grammar tied to its meaning.
- Warm cream + high-contrast serif + terracotta; near-black + acid accent; dark mode with grain; tracked all-caps eyebrows on every heading; middle-dot meta strings; "→" on every link (⟦S0001⟧, ⟦S0247⟧ designer-trend mean).
- Smooth-scroll libraries (Lenis/ScrollSmoother) and any scroll hijack (⟦S1209⟧). Preloaders and gate screens (F17). GSAP pins (only CSS sticky stages that cannot trap).
- Stock photography presented as their work. Stock is used for weather, light, materials and atmosphere, always credited in the colophon, never captioned as a Rembrandt job (bank §8, ⟦S1314⟧).
- Invented anything: no review quotes, no project counts, no prices, no APR, no discount %, no licence number (Ohio has none), no 24/7 claim.

---

## 2. Design system

### 2.1 Type
Two families, two voices **[decision, from ⟦S0001⟧ "use type as an active part of the design", ⟦S0074⟧ "pair for contrast", ⟦S0667⟧ max 2 typefaces]**:

| Role | Family | Why |
|---|---|---|
| **Built** (display, numbers, UI, buttons, phone) | **Mona Sans** variable (OFL 1.1, GitHub). Axes: `wdth` 75–125, `wght` 200–900, `slnt` 0 to −10 (italic not loaded). | Industrial, sturdy, readable; the width axis lets display type run expanded like stamped lumber and manufacturer bundle wrappers. |
| **Written** (estimate document, captions, pull quotes, decks, signature lines) | **Newsreader** variable (OFL, Production Type). Axes: `opsz` 6–72, `wght` 200–800, roman + italic. | A reading serif with true optical sizes: small sizes stay sturdy, display sizes sharpen. It is the voice of the written estimate. |

Loading: self-hosted woff2, subset to Latin (U+0000–00FF, U+2013–2014, U+2018–201D, U+2026, U+2122, U+2190–2193). Mona Sans roman and Newsreader roman preloaded; Newsreader italic loaded with `font-display: swap` after first paint. `font-optical-sizing: auto`. Weights set with `font-weight`, width with `font-stretch` (properties, not raw tags, ⟦S0074⟧).

**Scale** (fluid, `clamp(min, preferred, max)`, base 16px, ratio ≈1.25 for UI and a dramatic editorial jump to display, ⟦S0667⟧ ⟦S0665⟧):

| Token | Family / settings | Size | Line-height | Tracking |
|---|---|---|---|---|
| `--t-hero` | Mona Sans, wdth 118, wght 620 | clamp(3.25rem, 1.6rem + 7.4vw, 10.5rem) | 0.92 | −0.035em |
| `--t-display` | Mona Sans, wdth 112, wght 600 | clamp(2.5rem, 1.4rem + 4.6vw, 6.5rem) | 0.96 | −0.03em |
| `--t-numeral` | Mona Sans, wdth 125, wght 300 (thin numerals only ≥ 64px) | clamp(5rem, 2rem + 14vw, 17rem) | 0.85 | −0.04em, `tabular-nums` |
| `--t-h2` | Mona Sans, wdth 100, wght 580 | clamp(1.75rem, 1.2rem + 1.9vw, 2.75rem) | 1.1 | −0.02em |
| `--t-h3` | Mona Sans, wdth 100, wght 560 | 1.375rem (22px) | 1.2 | −0.01em |
| `--t-deck` | Newsreader italic, opsz auto, wght 380 | clamp(1.25rem, 1.05rem + 0.8vw, 1.6rem) | 1.35 | 0 |
| `--t-body` | Newsreader, wght 420 | 1.125rem (18px), 1rem on ≤ 380px | 1.62 | 0 |
| `--t-ui` | Mona Sans, wdth 100, wght 520 | 1rem | 1.3 | +0.01em |
| `--t-label` | Mona Sans, wdth 106, wght 560, sentence case (no all-caps) | 0.8125rem (13px) | 1.4 | +0.02em |
| `--t-caption` | Newsreader italic, wght 400 | 0.875rem | 1.45 | 0 |
| `--t-phone` | Mona Sans, wdth 110, wght 650, `tabular-nums` | per context (min 1.125rem in bars) | 1 | 0 |

Rules: three weights in use per family (Mona 520/600/650 + 300 numerals; Newsreader 380/420/600) (⟦S0667⟧ three-weight system); body measure 62ch; `text-wrap: balance` on headings ≤ 6 lines, `pretty` on paragraphs; curly quotes, en dashes in ranges, `…`, non-breaking spaces in "50 year", "(937) 746-7377", "$2 million"; inputs 16px on mobile; headings never all caps. No em dashes in site copy (owner rule).

### 2.2 Colour (OKLCH tokens, ⟦S0413⟧; contrast computed for this plan)
Six roles plus one accent, warm-pigment neutrals (raw umber, lead-white plaster) and the brand blue as the only UI accent **[decision: Rembrandt's own palette was umbers, ochres and lead white; the blue is the firm's]**.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--umber-900` | 0.185 0.014 55 | #18110d | Night ground (storm, inspection) |
| `--umber-800` | 0.26 0.018 58 | #2b221b | Dusk ground, raised dark surfaces |
| `--plaster-100` | 0.935 0.008 85 | #ece9e4 | Day ground (estimate, proof, close). Grey-plaster, deliberately not cream. |
| `--plaster-200` | 0.885 0.011 82 | #ddd8d1 | Paper shade, document edges, rules on plaster |
| `--ink-900` | 0.235 0.012 55 | #231d19 | Text on plaster (13.8:1) |
| `--slate-600` | 0.48 0.014 250 | #585e65 | Secondary text on plaster (5.39:1); shingle grey |
| `--mist-300` | 0.78 0.012 75 | #bcb6af | Secondary text on umber (9.3:1) |
| `--blue-700` (accent) | 0.45 0.135 259 | #21529f | Brand blue: primary buttons, chalk lines, signature ink on plaster (6.24:1); white on it 7.56:1 |
| `--blue-300` | 0.76 0.095 250 | #82b6ec | Blue on umber: chalk lines, links (8.75:1) |
| `--lamp-400` | 0.80 0.115 75 | #e9b364 | LIGHT ONLY: light sweeps, lamp glow, the sun's colour in grades. Never a button, never body text. |
| `--brick-600` | 0.50 0.15 35 | #a7391e | Storm-now line and form errors only (5.32:1 on plaster); from Ohio brick |

Accent discipline: blue appears at most twice per viewport as a filled colour (⟦S0659⟧). Lamplight is not UI; it is the light in the scene.

### 2.3 Space, grid, shape
- 4px base; scale `--s-1` 4, `--s-2` 8, `--s-3` 12, `--s-4` 16, `--s-5` 24, `--s-6` 32, `--s-7` 48, `--s-8` 64, `--s-9` 96, `--s-10` 144, `--s-11` 216 (⟦S1502⟧ 4px floor).
- Section rhythm is **deliberately uneven** (⟦S0665⟧ ⟦S0666⟧): story stages are tall, paper sections breathe (`--s-10` top / `--s-9` bottom), proof sections compress (`--s-8`). No two adjacent sections share padding.
- Grid: 12 columns, max content 1320px, gutters clamp(16px, 2.2vw, 32px), outer margin clamp(20px, 5vw, 80px). Editorial offsets: display type starts at column 1 and bleeds into the margin; body sits on columns 7–11 or 2–7 by section. Mobile: 4 columns, 20px margins.
- Shape: radius 2px on inputs and buttons (stamped, not pill) **[decision]**; photographs are rectangles with no radius ("plates"); the only round shapes are the lamp, the review numeral dot, and the phone pill on mobile (thumb comfort).
- Rules: 1px `--plaster-200` / `--umber-800` hairlines used only where they measure something (document lines, ledger rows, scale bars) (⟦S1314⟧ "grid without a measurement task").

### 2.4 Image treatment language: "Chiaroscuro documentary"
Every photograph on the site, real or stock, goes through one grade so they read as one body of work (⟦S1314⟧ "every image a different grade").
- **Grade (applied at build in the asset pipeline, not CSS filters):** lift blacks into umber (shadow tint oklch hue 55, toe at L 0.12), warm highlights toward lamplight (hue 75) for day/sunset shots, cool mid-shadows a few degrees toward hue 250 for storm shots, saturation −12%, local contrast +8 (clarity), subtle vignette 12% to the light side's opposite. Three LUT variants: **Night** (storm), **Dawn** (inspection, transitions), **Day** (proof, team, close). One .cube per variant, applied with ffmpeg `lut3d` or ImageMagick `hald-clut`.
- **Plates:** proof photos sit as "plates": rectangle, 1px `--plaster-200` keyline inset 6px when on plaster, caption in Newsreader italic below-left with town, job type, year (Bakstad #319 pattern). Plates never rotate (text-free plates may rotate ±2° in the S8 V2 scatter only; captions stay level).
- **Masks:** reveals use `clip-path: inset()` (light opening from the light side) and the soft lamp mask (⟦S1324⟧ radial stops). Raffael flash-mask (`--flash-fade` 4rem) softens long photo edges entering the viewport.
- **Layering and cutouts:** two stock storm/house photographs are separated at build into 3 depth layers each (sky, house, foreground) with a segmentation pass and hand-cleaned masks, for parallax depth in S2. Cutouts are photographs, never drawn (⟦S1320⟧).
- **Depth and normal maps:** the hero photo and the shingle macro each get a depth map (monocular depth estimation at build, hand-corrected) and a normal map derived from depth (Sobel, strength tuned by eye) for the relight shader (§3.4).
- **Technical drawings:** the roof-system section is an exploded axonometric line drawing generated from one geometric model (⟦S0414⟧): ink lines on plaster, part fills in plaster-200, chalk-blue leader lines. It is the only drawn imagery on the site.

### 2.5 Texture
- No grain overlay, no noise, no decorative grid **[decision; ⟦S0247⟧ dark + grain is the designer-trend mean]**. Texture comes from the photographs (shingle granules, brick, paper fibre in the document scans).
- The estimate document uses a real paper scan (stock, plain uncoated paper, 300 dpi) multiplied at 6% under the plaster ground so the document reads as paper, not a card.

### 2.6 Iconography
- Almost none. Where a symbol is needed (phone, text message, chevron, close, play/pause, check), one family: Solar Linear (Iconify), 1.5px stroke, `currentColor`, 20px in UI (⟦S1320⟧ Solar via Iconify; ⟦S0659⟧ monoline).
- Service identification is typographic and photographic, never icon tiles.
- Inspector's marks (circles, arrows, ticks) on photos are hand-drawn-style strokes in chalk blue, drawn on with stroke-dashoffset (bank #258 timing).

### 2.7 Motion tokens
One `:root` block drives all CSS motion (Shopify Editions Q58 pattern); GSAP reads the same values from a JS mirror.

| Token | Value | Source / use |
|---|---|---|
| `--d-press` | 140ms | ⟦S0059⟧ press 100–160 |
| `--d-quick` | 160ms | hover in, tooltip, text swap (⟦S0410⟧ quick 150) |
| `--d-ui` | 240ms | dropdown/menu/drawer step open (⟦S0410⟧ fast 250); close = 150ms |
| `--d-panel` | 400ms | estimate drawer open; close 300ms (⟦S0410⟧ panel 400→350) |
| `--d-reveal` | 800ms | editorial reveals, masked lines (⟦S1329⟧ 0.8s; bank 0.6–0.8) |
| `--d-light` | 1100ms | light sweeps (hero dawn, seams) (⟦S1321⟧ 0.75–1.1) |
| `--ease-out` | cubic-bezier(0.23, 1, 0.32, 1) | UI enter/exit (⟦S0059⟧) |
| `--ease-surface` | cubic-bezier(0.22, 1, 0.36, 1) | panels, drawers, menus (⟦S0410⟧ smooth-out) |
| `--ease-light` | cubic-bezier(0.16, 1, 0.3, 1) | light sweeps, masked reveals (Specia1ne #569 primary; ⟦S1329⟧) |
| `--ease-move` | cubic-bezier(0.77, 0, 0.175, 1) | carriers moving across the screen (⟦S0059⟧ ease-in-out) |
| `--ease-ink` | cubic-bezier(0.55, 0.08, 0.21, 0.92) | ink drawing on, stamps (Raffael Q120 entrance curve) |
| scrub | `ease: "none"` always; `scrub: 0.6` sticky stages, `1` parallax layers | bank cross-site rule; R31 scrub .6 |
| stagger | words .06 (≤ 8 words), lines .09, list items .04 (total ≤ 300ms), plates .08 | ⟦S1321⟧ ⟦S0410⟧ |
| mobile | all durations × 0.8; travel distances × 0.5 | ⟦S0658⟧ 20–30% shorter; R1 halve travel |

What does NOT animate (⟦S1465⟧): body paragraphs (they are present, not revealed); form field typing; keyboard-triggered UI; the switcher swap itself; the phone number (it never moves, never fades, never hides).

---

## 3. Global systems

### 3.1 The light conductor (one clock, one progress) **[Trionn #163 architecture; ⟦S0056⟧]**
- One `gsap.ticker` callback runs all scroll-driven visuals. One standalone `ScrollTrigger.create({ trigger: main, start: "top top", end: "bottom bottom" })` reports page progress `P ∈ [0,1]`; each chapter registers a local range and receives its own remapped progress `p`. No forest of per-element ScrollTriggers for continuous effects.
- Work runs only when `P` changed since the last frame, and only for subscribers whose element is within one viewport of the screen (IntersectionObserver flags). Idle cost is zero.
- No CSS custom property is animated on `:root` or on large containers (⟦S0056⟧): every per-frame write is a `transform`/`opacity` on a specific small element via `gsap.quickSetter`, or a uniform in the WebGL program.

### 3.2 The sun (light direction from scroll)
- **Sun azimuth θ(P)** and **elevation φ(P)** are piecewise-linear functions of page progress, keyed to chapters:

| Chapter | P range (approx.) | θ (azimuth, degrees, 0 = light from left) | φ (elevation) | Ground |
|---|---|---|---|---|
| S1 Hero ("first light", golden hour) | 0–0.06 | 12 | 8° | photo |
| S2 Storm (night; the sun is "gone") | 0.06–0.24 | 12 (held) | 2° | umber-900 |
| S3 Raking light (dawn) | 0.24–0.33 | 15 → 25 | 4° → 10° | umber-900 → umber-800 |
| S4 Layers | 0.33–0.42 | 25 → 40 | 10° → 22° | plaster |
| S5 Estimate (morning daylight) | 0.42–0.52 | 40 → 55 | 22° → 38° | plaster |
| S6 Install day | 0.52–0.63 | 55 → 80 | 38° → 58° | plaster / photo |
| S7 Signature (noon) | 0.63–0.70 | 90 | 72° | plaster |
| S8–S13 (afternoon) | 0.70–0.95 | 95 → 150 | 70° → 30° | alternating |
| S14 Close (late afternoon) + Footer (evening) | 0.95–1 | 150 → 168 | 30° → 6° | umber-800 |

- **Cast-shadow type** (the site-wide signature detail): every `--t-hero`, `--t-display` and `--t-numeral` heading gets an `aria-hidden` duplicate layer `.cast` positioned behind it, colour = ground shade at 22% alpha (umber on plaster, black at 45% on umber), static `filter: blur(1.5px)` (never animated). Per frame (only while the heading is in view), its transform is set from the sun: `transform-origin: 50% 100%; transform: translateX(dx) skewX(−s) scaleY(k)` with `s = clamp(0°, 62°, 90° − φ) × sign(θ − 90)` and `k = clamp(0.18, 1.0, 1 / tan(φ) × 0.12)` **[decision; geometry of a projected shadow on the ground plane]**. Low sun = long raking shadow; noon = short shadow under the letters; afternoon flips the shadow to the other side. Transform only, compositor-safe.
- **Photo light sweep:** each photo plate has an overlay `<span class="sweep">` (linear-gradient of lamplight at 0→18%→0 alpha, `mix-blend-mode: soft-light`), translated across the plate as its local progress runs 0→1 (transform only). The sweep enters from the side the sun is on.
- Reduced motion and "calm" mode: θ and φ freeze at each chapter's midpoint value (shadows present, static). No sweeps.

### 3.3 Reveal grammar (no generic fade-up)
Each element type has one entrance, chosen for meaning (⟦S0001⟧, ⟦S0544⟧ "2–3 transition types repeated"):
1. **Light opens (images):** `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` from the sun's side, `--d-reveal`, `--ease-light`, image inside scales 1.06 → 1 over 1.1s (⟦S1321⟧ image reveal values). Once.
2. **Lines rise through the horizon (display headings):** split into lines (GSAP SplitText `type: "lines,words"`, `mask: "lines"`, `aria: "auto"`, `autoSplit: true`, animation returned from `onSplit`) → `yPercent 110 → 0`, `duration 0.9`, `ease "power4.out"`, `stagger 0.09` per line, start `"top 82%"`, once (⟦S0451⟧, Masked Heading Q95 rise, ⟦S0184⟧). The cast shadow grows from `scaleY 0` to its sun value over the same 0.9s, +0.15s.
3. **Ink draws (document, marks, signatures):** SVG stroke draw-on, 800ms `--ease-ink`, delay per path ×200ms + per letter ×40ms (bank #258) via DrawSVG.
Everything else (paragraphs, lists, buttons) is simply present. Hidden start states are set only inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` (bank standing rule: never hide content in CSS).

### 3.4 WebGL: the relight renderer (one context for the whole site) **[⟦S0385⟧ ⟦S0457⟧ Lane A/C low risk; raw WebGL, no Three.js]**
- One module-level WebGL1 context (`failIfMajorPerformanceCaveat: true`, `premultipliedAlpha: true`), one fragment program, used by the hero photo (S1) and the shingle macro (S3). ≈ 6 KB gzip with its loader. No Three.js (bank C3: the 589 KB toll is avoided entirely).
- Inputs: albedo texture (the graded photo, power-of-two resampled 2048×2048 desktop / 1024 mobile, mipmapped), normal texture (derived), depth texture (hero only).
- Fragment shader (cost: 3 texture taps + a little math per pixel): Lambert term `max(dot(N, L), 0)` with L from the lamp position (pointer or scroll) at low elevation, + a grazing specular `pow(max(dot(R, V), 0), 24) × 0.12` for wet-granule glints, + ambient 0.18; output clamped to luminance band [0.04, 0.96] so nothing goes black or blown (⟦S0385⟧). Hero adds depth parallax: `uv += (lamp − 0.5) × depth × (0.03 + 0.012 × breathe)` where breathe is a slow function of scroll (not time) (Trionn lion shader values, scroll-driven instead of idle).
- Frame loop: renders only while the lamp target and the eased lamp differ by more than 0.5px, or while scroll progress changes in that section; stops otherwise. IO-gated; paused on `visibilitychange`. DPR: real density up to 2 (cheap shader, ⟦S0385⟧ "let the shader cost decide").
- Fallback is a production surface: the plain graded `<img>` is the base layer and the LCP element; the canvas fades in above it (opacity 0→1, 400ms) only after the first frame renders. Context loss → canvas removed, image remains. `?nogl=1` forces fallback for QA.
- Reduced motion: one still frame at a fixed lamp position (full fidelity, no loop).

### 3.5 The estimate engine (one funnel, many entrances) **[Silo Q98 CartManager discipline; Iper #561; Digital Butlers #317; R21 R22]**
- One state object `estimate = { situation, services[], roofAge?, zip, town, inArea, name, phone, email?, bestTime, notes, attribution{first,last} }`. Every control on the page (hero chips, S3 hotspot "check mine", S4 layer "include", S5 document fields, S12 claim toggle, the sticky Estimate button) writes to it. Every summary is derived from it. Persisted to `localStorage` (resumable; "Pick up where you left off" chip when returning).
- Steps (drawer or inline, same data): **1 What's going on** (radio chips: A storm came through / It's leaking / It's getting old / I'm filing an insurance claim / I just want it checked) → **2 What should we look at** (checkboxes: Roof, Gutters, Siding, Skylights, Attic ventilation or insulation, Something else) → **3 Where** (ZIP first, 5 digits, `inputmode="numeric"`, `autocomplete="postal-code"`; instant coverage answer from the 24-town ZIP table: "Yes. Centerville is about 9 miles from our office." / outside: "That's outside our usual area. Call us and we'll tell you straight.") → **4 Who** (name, phone `type="tel" autocomplete="tel"`, best time to call; email optional) → **Summary** ("What happens next: Rachel calls you within one business day (Mon–Fri, 9 to 5). We book a free inspection, photograph what we find, and give you a written, line-item estimate before any work. Storm damage right now? Call (937) 746-7377.").
- Step counter "Step 2 of 4" + a 4-segment progress line (⟦S1442⟧: show progress clearly). Back never loses data. No field asked twice (WCAG 3.3.7, ⟦S0657⟧). Validation on blur, errors inline with `role="alert"`, focus first error (⟦S0664⟧).
- First/last-touch attribution (UTM + referrer class) stored and attached (Green Conception gc-lead.js pattern).
- No-JS: one plain `<form>` with all fields visible, posting to the form endpoint (owner to supply, §11 Q6); concept label "This is a concept site; submissions go to [owner's inbox]."
- Submit states: idle → pending (button shows progress ring, fields locked; bank #348 circular progress button) → success (the stamp moment, S5) / error ("We couldn't send that. Your answers are saved. Try again, or call (937) 746-7377.", retry with 2s/4s/8s backoff then "Call us" + copyable reference, ⟦S0664⟧).

### 3.6 The 1|2|3 section switcher **[⟦S0082⟧ variant + picker.md; ⟦S0067⟧ prototype + PICKER.md]**
- **What it is:** each homepage section carries a small pill "1 2 3" (top-right of the section, inside its padding; mobile: top-left). Deliberately outside the design system: `rgb(20 20 20 / 0.92)` surface, inset `0 0 0 1px rgb(255 255 255 / 0.1)`, system font 12px/1, 26px-high buttons, active `rgb(255 255 255 / 0.14)` fill, `aria-pressed`. The default is marked with a small dot under its number. A `title`/tooltip names the version ("2: The year in one roof").
- **Mechanism:** the default version is server-rendered HTML in the section. The other two live in `<template id="tpl-{section}-{n}">` (inert, their images are not fetched). Switching: (1) record the section's top offset relative to the viewport; (2) `section.ctx.revert()` (each version's JS runs inside its own `gsap.matchMedia()`); (3) replace the section content with a clone of the template; (4) run that version's `init()`; (5) give its ScrollTriggers `refreshPriority = sectionIndex`, then `ScrollTrigger.sort(); ScrollTrigger.refresh()` (⟦S0186⟧); (6) restore the section top to the same viewport offset (`scrollBy(delta)`) so the page never jumps; (7) entrances replay. The swap itself is instant (⟦S0067⟧: a 100+/session action gets no animation); only the active-pill highlight slides (250ms `cubic-bezier(0.23,1,0.32,1)`).
- **URL state:** `?v=hero:2,storm:3` lists only non-default sections (`history.replaceState`). Every combination is a sendable link. Unknown keys are ignored.
- **Keyboard:** ←/→ inside a focused pill cycles; global keys `1` `2` `3` switch the section nearest the 40% viewport line; `H` hides/shows all pills; all ignored when focus is in an input or a modifier is held (⟦S0067⟧).
- **`?clean=1`** (presentation mode): no pills, no version tooltips, no "Concept" ribbon in the header (the footer Concept line stays: honesty), keyboard switching still works for the presenter. Combinable: `?clean=1&v=hero:3`.
- **`?showcase=1`:** adds a "Versions" index button bottom-left listing every section with its three names and a "Copy link" for the current mix.
- **No-JS:** templates never render; pills are injected by JS, so none appear; every section shows its default version complete.

### 3.7 Motion modes
- `prefers-reduced-motion: reduce` → **calm** mode (tiered, ⟦S0400⟧): no sticky stages (stories become ordered still sequences), no parallax, no scrubs, no light sweeps, no relight loop (one still frame), reveals become 150ms opacity cross-fades, carriers jump to their end state, cast shadows static. Focus rings, button press, opacity fades and spinners stay.
- A visible **"Motion: Full / Calm"** toggle in the menu and the footer (bank #203 motion-effects toggle; ⟦S1169⟧ site-wide user toggle), persisted in `localStorage`, `?motion=calm` for links; `gsap.matchMediaRefresh()` on change.
- Pause control for any motion running longer than 5 seconds (WCAG 2.2.2): the storm rain (S2) and the hero dawn never loop; the rain only runs while S2 is in view and is tied to scroll, not time, with one exception (drizzle idle) which stops after 4s.

### 3.8 Cursor
Desktop fine pointer only, system cursor always visible (bank standing rule). A 10px ring follows with `gsap.quickTo` (duration 0.35, `power3`, ⟦S1321⟧ cursor lag) and changes meaning, not style:
- over photographs in S1/S3: becomes **the lamp** (soft lamplight radial 120px at 18% alpha, `mix-blend-mode: soft-light`), because there the cursor really is the light source;
- over the before/after slider: two small chevrons (drag affordance);
- over the phone number: hidden (the number is the target, nothing competes);
- over text: hidden.
Touch: none. Reduced motion: none.

### 3.9 Sound
None **[decision]**. A roofing site visited from a phone in a living room should never make a noise. Every micro-interaction is designed to work muted (visual + optional `navigator.vibrate(8)` on Android for the estimate stamp only).

### 3.10 Page transitions (inner pages)
Cross-document View Transitions (`@view-transition { navigation: auto; }`, ⟦S1276⟧): the wordmark (`view-transition-name: wordmark`) and phone pill (`phone`) persist; the root cross-fades 240ms and the new page's title rises through the horizon (same line-rise grammar). Wrapped in a reduced-motion query that sets `animation: none` (⟦S0658⟧: VT does not respect it automatically). Speculation Rules prerender with `"eagerness": "moderate"` for nav links (⟦S0280⟧), with the tracking beacon gated on `document.prerendering` / `prerenderingchange`.


---

## 4. Homepage, section by section

Format for every version: a one-line idea, the content, then a motion ledger. Each ledger row reads **element: skill tag / bank pattern: mechanism: exact parameters: mobile behaviour**. ★ marks the default. All three versions of a section share the same job and the same facts; they differ in idea, layout and motion, not in claims.

Section order (default): S0 Header · S1 Hero · S2 Storm · S3 Raking light · S4 Layers · S5 Estimate in writing · S6 Install day · S7 Signature & warranty · S8 Real roofs · S9 Reviews · S10 Family & community · S11 Towns · S12 Insurance & paying · S13 Questions · S14 Close · S15 Footer.

### S0 Header (persistent)
Job: the phone and the estimate are always one tap away; the brand is present without shouting.

**V1★ "Lamp pill".** Wordmark left (Mona Sans wdth 112 wght 640, 20px, real text, not an image). Right: `Call (937) 746-7377` as a pill in blue-700 with plaster text, and `Free estimate` as a text button. Nav (Roofing, Storm & insurance, Our work, About, Reviews) in the middle on ≥1024px; a `Menu` button below. A thin 1px rule under the bar takes the colour of the current chapter ground.
- Bar hide/show: ⟦S0204⟧ / bank R7 smart header: hides on scroll down after 120px (translateY −100%, 240ms `--ease-surface`), returns on any upward scroll of ≥8px. Mobile: same.
- Phone pill detaches: ⟦S0544⟧ carrier / Stronghold sticky bottom bar (source read): once the hero CTA row leaves the viewport, the header pill does not hide with the bar; it travels (FLIP, 400ms `--ease-move`) to a floating pill bottom-right ("the lamp", lamp-400 1px inner ring) on desktop, and on mobile becomes a fixed bottom bar: **Call | Text | Estimate** (3 equal 56px cells, safe-area padding, `env(safe-area-inset-bottom)`). The bar never covers the footer's own call block (it hides when the footer phone is ≥50% visible, IO).
- Chapter rule colour: ⟦S0056⟧: a 1px element per chapter, crossfaded with opacity (not a variable on :root).
- Menu (mobile): ⟦S0410⟧ panel: full-height sheet, 400ms open / 300ms close, `--ease-surface`, items stagger .04, focus trapped, `inert` on the page behind (Specia1ne overlay pattern read in source: inert + aria-hidden + focus first item with `preventScroll`).

**V2 "Chapter rail".** No top bar on ≥1024px. A slim fixed left rail (72px) carries the wordmark rotated 90°, the chapter number of the current section (01–16, Mona Sans tabular numerals) and the phone as a vertical pill; the Bakstad pattern (#319 left rail) and Specia1ne's numbered axis. Mobile: top bar as V1.
- Chapter numeral swap: ⟦S0059⟧ text swap: old numeral out yPercent −100, new in from 100, 240ms `--ease-out`, both inside an overflow-hidden 1-line box. Triggered by the conductor when the current chapter changes.
- Rail progress: ⟦S1325⟧ scroll-progress timeline: a 2px line fills top to bottom with page progress P (transform scaleY on one element, quickSetter). Mobile: hidden.

**V3 "Sign-painter overlay".** A minimal bar (wordmark + `Call` + `Menu`). The menu opens a full-screen plaster sheet where each item is set huge (Mona Sans wdth 118) with the job it answers underneath in Newsreader italic ("Roof replacement: when the roof is past saving"). Opening is a circle of lamplight growing from the Menu button.
- Sheet open: ⟦S1321⟧ / Studiogusto #44 circular wipe: `clip-path: circle(0 at X Y) → circle(150% at X Y)`, 700ms `--ease-move` (expo.inOut family), close 450ms. Items: lines rise, stagger .06. Mobile: same, 560ms.
- Item hover: Q78 Kukuri-style bar sweep under the item (`::after` translateX −100% → 100%, 400ms `cubic-bezier(0.7,0,0.3,1)`). Touch: no hover; the bar shows on the current page's item only.

### S1 Hero
Job: in one screen, say what they do, where, and why to trust them; offer Call and Text equally; start the light.

**V1★ "First light".** Full-bleed photograph (Muse shot H1: a Dayton-area two-storey at golden hour after rain, wet shingles catching low sun). The photo is relit live by the WebGL renderer (§3.4) with a depth parallax that follows the pointer (desktop) or scroll (all). Over it, bottom-left on a soft umber gradient:
  - proof line ABOVE the H1, each item a real link: `4.9 on Google from 295 reviews ↗ · BBB A+ since 2001 ↗ · Owens Corning Platinum Preferred ↗` (Moderna Tak, Hippo pattern: proof above the headline; Interlock pattern: every proof is verifiable);
  - H1: **Your roof, in good light.** (Mona Sans, `--t-hero`);
  - deck (Newsreader 22px): "Storm damage, leaks, a roof at the end of its life. Since 1995 we've climbed up, photographed what we found, and written every line of the price down before anyone lifts a tool. Springboro and 23 towns around Dayton.";
  - situation chips (write `estimate.situation`): A storm came through · It's leaking · It's getting old · Insurance claim · Just check it;
  - two equal buttons: `Call (937) 746-7377` (blue-700) and `Text us` (`sms:+19377467377`, outlined plaster), then a quiet link `Or get a written estimate`.
- Dawn sweep on load: ⟦S1321⟧ light sweep / bank R5 hero entrance: the relight lamp travels from θ=−20° to the hero's θ=12° over 1100ms `--ease-light` while the photo's exposure lifts 0.82 → 1.0 (uniform). No preloader; the static `<img>` is visible from first paint (LCP). Mobile: same sweep, 900ms.
- H1 lines rise: ⟦S0451⟧ masked reveal / Q95 Masked Heading "rise": yPercent 110 → 0, 0.9s `power4.out`, stagger .09 per line, starts 200ms after first paint; cast shadow grows scaleY 0 → sun value, +0.15s. Mobile: same values (headline is the moment).
- Proof line and chips: present (not animated) so the first thing a fast visitor sees is complete (⟦S1465⟧).
- Depth parallax: Trionn lion depth-map shader (§3.4): amount (0.03 + 0.012·breathe), cursor eased .07/frame. Mobile: driven by scroll only (no gyroscope prompt), amount halved.
- Scroll-out: the hero's photo dims to 0.55 exposure as S2 approaches (uniform), its lamp sinks to φ=2°: the sun going down into the storm. Scrubbed, `ease: none`, `scrub: 0.6`.

**V2 "Condition report".** A paper hero: plaster ground, left two-thirds a printed "Condition report" header (Report No. auto from the date, Property: "Your address", Inspector: "Rembrandt Roofing & Restoration, Springboro OH", Est. 1995), right third the ba2 before photo as a mounted plate with chalk-blue ink circles drawing on around the damage. The H1 sits in the report: **Before we quote, we look. In good light.** The first field is ZIP: "Is your house in our area?" with an instant answer (West London postcode-checker pattern, read in source).
- Ink circles: §3.3 ink grammar / bank #258 draw-on: stroke-dashoffset to 0, 800ms `--ease-ink`, delay path×200ms, after the plate's light-opens reveal. Mobile: same, circles 2 instead of 3.
- Report fields: ⟦S0059⟧: typed-in look is static text (no typewriter); the date is real (Intl.DateTimeFormat). Present on load.
- Plate: light opens from the left, 800ms `--ease-light`, image scale 1.06 → 1.

**V3 "Raking light, live".** The hero is a single extreme macro of weathered shingle granules (Muse shot H3) filling the screen, almost dark. The visitor's pointer (or a slow automatic sweep on touch) is a low lamp; wherever it passes, granule relief and two hail bruises appear. The H1 is set large over the dark: **Damage hides. Low light finds it.** Below: `Call (937) 746-7377` · `Text us` · `Book a free inspection`.
- Lamp: §3.4 relight with L from the pointer, eased .08/frame; elevation fixed 6°. Touch: an automatic lamp path (Lissajous x = 0.5 + 0.36 sin(t·0.37), y = 0.5 + 0.22 sin(t·0.61 + 0.9), the Masked Heading spotlight idle path read in source) that the finger can grab; stops after 6s (WCAG 2.2.2) and a "Move the light" hint remains.
- H1: Masked Heading SPOT_MASK idea (source read): the headline is outlined plaster at 30% until the lamp passes, where it fills to 100% (radial mask 160px, 9 smootherstep stops). Reduced motion: headline filled, lamp fixed at the bruise.

### S2 The storm: "One night in May"
Job: make the visitor feel the event that brings most customers, with Ohio's real weather facts, and put the storm phone line in front of the people who need it now.

**V1★ "One night in May".** A CSS sticky stage (380vh desktop, 300vh mobile; skip link "Skip the storm" before it) in five beats over a layered house silhouette at night: 1 "Hail season here runs April to July." 2 "Ohio sees about 19 hail days a year." 3 the rain leans and hail falls, one soft lightning lift; 4 "Most roof damage doesn't show from the street." 5 indoors: a ceiling stain spreading on a plaster ceiling. A brick line is pinned at the bottom of the stage the whole time: **Storm damage right now? Call (937) 746-7377.** The stain's outline becomes the lamp circle that opens S3 (carrier).
- Stage: ⟦S0448⟧ storytelling with ⟦S1209⟧ no-hijack rule: CSS `position: sticky` inner stage, one conductor range, beats are opacity/translate swaps at fixed p thresholds (0.12/0.30/0.48/0.66/0.84), 600ms `--ease-out` each. No GSAP pin. Mobile: 300vh, beats keep the same thresholds.
- Rain/hail: ⟦S1341⟧ weather (precipitation template) + Ghost Trails caps (#41): one 2D canvas, rain streak pool of 300 desktop / 120 mobile, speed × delta (not per frame, the #341 bug avoided), angle from 8° to 24° as p rises ("storm leaning in"); hail = 40 small bright points with a bounce at the roofline; ≤40 fps, DPR ≤ 1.25, stops when S2 leaves the viewport or the tab hides. Reduced motion: a still frame of rain streaks (pre-rendered PNG).
- Lightning: #341 single flash, but triggered once at beat 3 by scroll (not random): a 2-step luminance lift of the stage (opacity of a pale overlay 0 → 0.18 → 0 over 180ms). One flash only; WCAG 2.3.1 (fewer than 3 flashes per second, small area of luminance change). Reduced motion: none.
- Facts: lines rise grammar (§3.3), one beat at a time.
- Ceiling stain: SVG path, 3 noise-displaced rings growing (feTurbulence baseFrequency .04, displacement 8, static filter on a small element; the ring scale animates, not the filter), 1.2s per ring. Then its outline (MorphSVG to a circle) carries into S3's lamp circle: 700ms `--ease-move`. Mobile: same.

**V2 "The year in one roof".** A horizontal 12-month strip (scrubbed by vertical scroll inside a 300vh sticky stage; on mobile a native horizontal scroller with snap): Jan–Feb ice dams, Mar freeze-thaw, Apr–Jul hail, Aug heat, Sep–Oct leaves and gutters, Nov–Dec freeze-thaw again. The current month (from the visitor's clock) is lit and labelled "You are here". Each month shows what that weather does to a roof, in one line, and what to check.
- Strip: Here Comes The Sun (#549, source read): one horizontal container translated in 12 equal steps (x −8.333% per month) by a scrubbed timeline, `ease: none`, scrub .6; the sun icon rides a 3-leg bezier arc across the months (entry/mid/exit legs, curviness 1.25, the source's own values scaled to the stage). Mobile: native `overflow-x: auto; scroll-snap-type: x mandatory`, no scrub (⟦S1209⟧).
- Current month lamp: on entry, a lamp-400 underline draws under the current month (ink grammar).

**V3 "Twenty years in twenty seconds".** A single roof photograph (Muse shot S2-3 sequence: the same roof plane rendered/photographed at ages 0, 5, 10, 15, 20) ages as you scroll: granule loss, curling tabs, moss at the eave, a lifted tab. A field asks "When was your roof put on?" (year input); the scrubber jumps to that age and says what's typical at that age, honestly, with the line "A roof's age alone doesn't mean it needs replacing. We'll tell you if it doesn't."
- Ageing: ⟦S1326⟧ scroll-scrubbed visual sequence / Trionn #163: 5 key frames crossfaded by scroll (not 371 frames: 5 AVIF plates, opacity crossfade between neighbours), sticky 240vh. Mobile: same, 200vh.
- Year input: writes `estimate.roofAge`; the stage jumps with a 600ms `--ease-move` scrub-to (scrollTo of the stage's own range), not a hijack.

### S3 Raking light (dawn)
Job: show the inspection, the firm's core skill, and make the honesty promise.

**V1★ "The lamp".** Dark umber ground lifting to umber-800. Full-width macro photograph of real hail-bruised shingles (Muse shot S3-1, plus its normal map). The visitor moves the lamp (pointer; on touch, the scroll position moves it along the roof); bruises appear only when the light rakes across them. Three hotspots are circled in chalk-blue ink when found ("Bruise: granules knocked loose", "Cracked mat under the bruise", "Lifted tab edge"). Copy: **Hail damage hides until the light is low.** / "That's why we inspect at an angle, photograph everything, and show you the photos." Then the honesty line, set alone: **If your roof is fine, we'll tell you. In writing.** CTA: `Book a free inspection` (writes `estimate.services += roof`).
- Lamp relight: §3.4 renderer, L from the pointer at φ 4°→10° (dawn), specular .12, ambient .18. Touch: lamp x = scroll p across the section, y fixed at 0.45. Reduced motion: still frame with all three bruises lit and circled.
- Hotspot discovery: each hotspot has a hidden luminance trigger: when the lamp is within 90px for 300ms, its ink circle draws (800ms `--ease-ink`) and the label appears (opacity 160ms). Keyboard: hotspots are buttons in reading order; focusing one moves the lamp to it (focus parity, bank #141).
- Cursor: becomes the lamp ring (§3.8).
- Honesty line: lines rise, then a single lamp-400 underline draws under "In writing" (ink grammar).

**V2 "Street view, roof view".** Two photographs of the same roof: from the street (looks fine) and from the roof under raking light (damage). A shutter of 30 horizontal slits turns street view into roof view as you scroll.
- Blinds: bank #38 SVG mask transitions (source values): 30 slits, stagger 0.02, scrub 2.0 desktop / 1.0 mobile, `shape-rendering: crispEdges`, mask rebuilt on resize. Mobile: 16 slits.
- Labels: "From the street" / "From the roof, at 7am" swap with the 240ms text swap.

**V3 "Ask the roof".** A self-check with five questions answered by tapping photos ("Do you see granules in your gutters?" with a photo of granules in a gutter). Each answer lights a section of a roof diagram. Result: "Worth a look" / "Probably fine, but here's what to watch". Ends with the honesty line and `Book a free inspection`.
- Answers: ⟦S0059⟧ press 140ms scale .97; the diagram zone fills with lamp-400 at 30% (opacity 240ms). Result card: panel 400ms `--ease-surface`. Mobile: same.
- Writes `estimate.situation` and a note ("Self-check: 3 of 5") into the funnel.

### S4 Layers: what a roof is made of
Job: show craftsmanship as a system (deck, ice and water shield, underlayment, starter, shingles, ridge vent, flashing), make "Platinum Preferred" mean something, and hand the layers to the estimate.

**V1★ "Exploded roof".** An exploded axonometric technical drawing (⟦S0414⟧ teardown/explode: one model, rendered as a line drawing with soft plaster fills) of a roof corner with the Owens Corning Total Protection Roofing System layers (names to be confirmed by the owner, §11 Q9). As you scroll, the layers separate upward one by one and each gets a hairline leader and label (what it is, what it stops). At the end, each label detaches and flies down into S5's estimate paper as a line item (carrier).
- Explode: Silo explode engine (Q98, source constants read): a paused timeline driven by a proxy tween toward scroll progress; opening tweens `max(0.35, |Δp|)` s `power2.out`, closing 0.6s `expo.out`, magnetic close within 0.3, never parked half-open (snap {min .2, max .45}, delay .2, `power1.inOut`). Sticky stage 260vh. Mobile: 220vh, layers separate vertically with smaller gaps (40% of desktop).
- Labels: leader lines draw (ink grammar, 600ms), label text present.
- Carrier: the 7 labels FLIP into S5 line slots (`--ease-move`, 700ms, stagger .06) when S5's top crosses 60% of the viewport. Reduced motion: labels simply appear in S5.

**V2 "Core sample".** A vertical cross-section "core" of the roof the height of the viewport: shingles at the top, deck at the bottom. Scrolling moves a magnifier down the core; each layer's name and job appear beside it.
- Magnifier: CSS sticky stage 200vh; a 160px circular lens (scale 2 of the same drawing, clip-path circle) moves with p (transform only). Mobile: lens 120px.

**V3 "Tap a layer".** The layers as a CSS 3D stack (perspective 900px, rotateX 58°, rotateZ −30°, each layer translateZ by index × 18px; Depth Text #165 layering idea in CSS 3D). Tapping a layer lifts it 40px and opens its card.
- Lift: transform 400ms `--ease-surface`; others dim to 0.5 opacity. Touch: tap. Reduced motion: flat list.

### S5 The estimate, in writing (morning daylight)
Job: the conversion centre. Show their written-estimate promise and let the visitor start one. The paper is the form.

**V1★ "The paper".** A sheet of estimate paper on plaster (subtle paper tooth, Newsreader for printed text, Mona Sans for headings), headed "Estimate. Rembrandt Roofing & Restoration, Springboro, Ohio. (937) 746-7377". The line items arrived from S4 (deck, ice & water shield, underlayment…), each with **"Measured on site"** where a price would be (no invented prices). Under them the request is the document itself: "Prepared for: [your name]", "Property ZIP: [_____]" (instant area answer), "What's going on: [chips]", "Best number: [phone]", "Best time: [morning / afternoon / evening]". Submit is **Sign and send**. On success a blue-ink stamp lands: **RECEIVED. Rachel will call you.** with the day ("Today by 5 pm" before 4 pm on a weekday, else "Next business morning", from the clock; owner to confirm the promise, §11).
- Document writing: §3.3 ink grammar: the paper's printed rules draw on (stroke-dashoffset 1px rules, 600ms, stagger .04), headings rise. Present for no-JS.
- Fields: real inputs styled as handwriting lines; focus ring = the blue chalk-line underline thickening 1px → 2px (160ms). ⟦S0664⟧ inline errors, ⟦S0657⟧ no re-entry.
- Stamp (peak moment, ⟦S1452⟧): the submit button's progress ring (bank #348) completes, then the stamp drops: scale 1.35 → 1 and rotate −8° → −3°, 280ms `cubic-bezier(0.34,1.56,0.64,1)` (overshoot), a 1px ink spread ring (scale 1 → 1.08, opacity .3 → 0, 400ms), the paper nudges 2px down (impact). `navigator.vibrate(8)` on Android. Reduced motion: stamp appears, no drop.
- Mobile: the paper becomes full-width, fields stack, the stamp is 70% size.

**V2 "Read the estimate".** A real sample estimate (anonymised, owner-supplied, §11) set as a long document; scrolling reveals words from grey to ink (⟦S1327⟧ scroll-scrubbed word reveal, TreeWalker split, baseOpacity .15). Hotspots on key lines open notes ("Why we list the deck separately"). The request form follows as a normal, short form.
- Word reveal: scrub 0.6, words grey (mist-300) → ink-900, start "top 70%", end "bottom 60%". Mobile: same. Reduced motion: all ink.

**V3 "Build your request".** A 4-step request builder (Iper #561 / Sirnik 1/2 pattern) on a dark umber card with a large "01 / 04" counter, one question per screen, big tap targets; the summary at the end reads like the estimate's first page.
- Steps: panel slide 400ms `--ease-surface` (x 24px + opacity), counter digits roll (CountUp roll mode, source read: cell 1.2em, column stagger .07). Mobile: same.

### S6 Install day
Job: take the fear out of the day the roof comes off: what happens, in order, who is there, how the yard is left.

**V1★ "Install day, step by step".** A sticky two-column stage (Pin Sidebar #153 pattern, but CSS sticky): a left progress rail with four marks and a right panel that swaps through four steps: 1 **Before we start** (materials delivered, driveway protected, plants covered), 2 **Tear-off and deck check** ("If deck boards are soft, we show you photos and the price before replacing any", owner to confirm policy, §11), 3 **The new roof goes on** (layers from S4 named again), 4 **Clean-up and walkthrough** (magnetic sweep for nails; walkthrough before sign-off). Each step has a real or clearly labelled stock photo (§9).
- Rail: ⟦S1325⟧ progress timeline: the rail fills by p (scaleY), each mark lights blue-700 when its step is active (240ms).
- Step swap: #153 values: incoming image from autoAlpha 0, text from y 100 → 0 (mobile y 50), outgoing at +0.75 of its unit to y −100; CSS sticky stage 4 × 90vh. No pin.
- Mobile: rail becomes a horizontal 4-dot bar at the top of the sticky stage (dots 24px tap targets).

**V2 "One day, time-lapse".** A roof photographed from the same tripod position through one install day (owner/Muse shoot S6-2: 24–36 frames), scrubbed by scroll as an image sequence; captions name the stage.
- Sequence: ⟦S1326⟧ / Trionn #163: frames on ONE `<img>`, src swapped when the index changes, index eased toward target at .12/frame, frames preloaded in requestIdleCallback chunks of 20 with `img.decode()`. 36 frames × ≤45 KB AVIF. Mobile: 18 frames.
- If no shoot is possible: labelled stock sequence ("Illustrative install sequence, not a Rembrandt job").

**V3 "What happens when you call".** The day told from the office: a chat-style sequence of the real steps ("You call. Rachel answers Monday to Friday, 9 to 5." → "We book a time to look at the roof." → "You get photos and a written estimate." → "We schedule the install." → "Walkthrough. You sign. Warranty starts.").
- Bubbles: present text, each bubble arrives with opacity + y 12px, 240ms `--ease-out`, stagger 120ms as it enters (IO once). Mobile: same.

### S7 Signature & warranty (noon)
Job: the strongest promise (50-year non-prorated materials, lifetime workmanship) made concrete; the walkthrough signature is the moment it starts.

**V1★ "Sign here".** Noon: the sun is overhead, cast shadows are at their shortest. A signature line on plaster: "Final walkthrough. Homeowner signature: ________". As the section enters, a signature draws itself on the line in blue ink (a neutral illustrative signature, not a real customer's name). The moment it finishes, two numerals light: **50** (years, non-prorated materials coverage) and **Lifetime** (workmanship). Under them, short honest terms and a link to the full warranty page.
- Signature: ink grammar, one SVG path, 1600ms `--ease-ink` (Stroke Text #167 rule: dash length ≫ path length so it reads as drawn), start "top 70%", once.
- Numerals: `--t-numeral` with cast shadows almost vertical (φ 72°): lines rise, 0.9s `power4.out`. "50" does not count up (a count-up would undercut a fixed term).
- Mobile: same; signature line full width.

**V2 "The terms, plainly".** A two-column table: what's covered, for how long, what isn't (exclusions supplied by the owner, §11 Q4), who to call. No marketing language.
- Rows: present; the active row (hover/focus) gets the blue chalk-line left rule (2px, 160ms).

**V3 "Fifty years".** A horizontal 50-year ruler (1 tick per year from the install year to +50), with markers for "today", "typical shingle roof age at replacement" (only with a sourced number) and "your coverage ends". The ruler scrolls horizontally with a native scroller on mobile.
- Ruler: SVG ticks drawn once; the "today" marker drops in (y −12 → 0, 400ms). Mobile: native horizontal scroll with snap.

### S8 Real roofs (afternoon light)
Job: show their actual work honestly. ba2 is the only true before/after; job-truck/job-charcoal may be a second pair if the owner confirms.

**V1★ "Plates".** An editorial gallery: the ba2 pair as the centrepiece in a before/after slider (input range, keyboard operable), surrounded by single "plates" of their other job photos with captions (town, year, system, "Rembrandt job photo"). Above it: **Every photo here is our work.** Stock never appears in this section.
- B/A slider: Green Conception pattern (source read: `<input type=range>`) + Oslo's one-time hint (otmBaHint: the handle drifts 40% → 26% → 56% → 40% once, 1.6s ease-in-out, when first in view). The divider is a 2px blue chalk line with a lamp-400 grip. Keyboard: arrow keys 5%, Home/End. Touch: drag anywhere on the plate. Reduced motion: no hint drift.
- Plates: light opens from the sun's side (θ ≈ 100°: from the right now), 800ms; captions present.
- Registration: ba2 before/after are re-registered by Muse so the house aligns (§9).

**V2 "On the table".** Trionn's scatter gallery (#163, values read): 6–11 job photos lie on a plaster "table" at random rotations (±4°), jittered ±36px, entering from off-screen positions as you scroll (pinned-free version: CSS sticky 200vh, scrub .6, item duration 1.2 at index × 0.34). Tapping a print lifts it (scale 1.04, shadow) and opens it large.
- Mobile: rotation ±2°, 6 photos, stage 160vh.

**V3 "Light line".** Each job is a full-width plate split by a vertical light line; dragging the line or scrolling moves it, revealing the after over the before. For single photos (no pair), the line reveals the colour photo over its own black-and-white.
- Line: transform on one 2px element + `clip-path: inset(0 0 0 X%)` on the top image (X from pointer or scroll p). Mobile: scroll-driven only.

### S9 Reviews
Job: proof that can be checked; no pasted quotes.

**V1★ "Read them where we can't edit them".** A huge numeral **4.9** (Mona Sans wdth 125 wght 700, `--t-numeral` × 1.6), "from 295 Google reviews" beside it, and three buttons: `Read them on Google ↗`, `BBB A+ profile ↗`, `Owens Corning contractor listing ↗`. One line: "We don't copy reviews onto our own site. Read them where we can't edit them."
- Numeral: lines rise + cast shadow (afternoon θ 120°, so the shadow falls left now). No count-up (⟦S1465⟧, refused in §1.4).
- Mobile: numeral 40vw.

**V2 "How to check any roofer".** A short, useful checklist (check reviews on Google, look up BBB, ask for the manufacturer's certification and verify it on the manufacturer's site, get the estimate in writing, ask who does the work) with Rembrandt's own answers linked. Collis "Tips to avoid scams" pattern, made specific.
- Items: present; each "Check ours ↗" link draws its underline on hover (160ms).

**V3 "Live from Google".** Live Google rating and recent reviews via the Places API (owner key needed, §11 Q8), shown with reviewer first name, date and star rating exactly as Google returns them, attributed and linked. Cached server-side 6 hours; if the API fails, V1 renders instead.
- Cards: present; no carousel.

### S10 Family & community
Job: the people. 1995, the founder, the office, the community work.

**V1★ "The people who answer".** The real team photo (team-photo.png, regraded only) as a wide plate, names under it (owner to supply), a short story: "Bunk Walker started Rembrandt in 1995 fixing storm-damaged houses. ..." and one community story (the Gary Sinise Foundation project, year to confirm, §11).
- Plate: light opens; names present.

**V2 "1995 to today".** A short vertical timeline of real dated events only (founded 1995, BBB A+ since 2001, Owens Corning Platinum Preferred, community project), each with a photo if available.
- Ticks draw (ink grammar), dates in Mona Sans tabular. Mobile: same.

**V3 "Rachel answers".** The office as the hero of the section: a portrait of the person who answers the phone (owner to supply, §11), the live office state ("Office open now, until 5 pm" / "Closed now. Opens Monday at 9 am. Leave a message or text us."), the phone and the text link.
- Live state: Intl.DateTimeFormat in America/New_York, refreshed every 60s (Specia1ne hero-time pattern, source read); a 6px status dot with the Shazam ripple pulse (#255: 1.2s, scale 3 → 1, second ring +0.6s) only while open. Reduced motion: dot static.

### S11 Towns
Job: answer "do you come to me?" and give each real town a link.

**V1★ "Distance rings".** A typographic map: Springboro at the centre, concentric rings at 5, 10 and 20 miles, the 24 town names set on their real bearings and distances (computed from coordinates, no map tiles). A ZIP field above: "Check your ZIP". Each town links to its page.
- Rings draw (ink grammar, 1200ms, stagger .15); town names fade in by ring (stagger .02). Mobile: rings become a list grouped by distance band with the ZIP field first.

**V2 "Check your street".** ZIP-first: one field, a big answer ("Yes, Lebanon is about 9 miles from us."), then the list of towns.
- Answer swap: 240ms text swap.

**V3 "The weather we work in".** The 24 towns as rows with their county and the season facts that apply to all of them (hail Apr–Jul, freeze-thaw Nov–Mar), plus the town's page link.
- Rows: present.

### S12 Insurance & paying
Job: the insurance claim path (storm customers), and how paying works, with no invented terms.

**V1★ "The claim, in order".** Four steps for a storm claim (you call your insurer and us; we inspect and photograph; we meet the adjuster if you want us there; written estimate matched to the claim), each with what the homeowner does and what Rembrandt does, in two columns. Financing: "Ask us about payment options" + the page link (no APR, no %).
- Steps: present; the active step's column rule fills blue as it passes 50% of the viewport (scaleY, scrub .6). Mobile: one column.

**V2 "Two paths".** A fork: "Paying through insurance" vs "Paying yourself", each a short column.
- Fork: present; tab-style toggle on mobile (cbpFWTabs pattern, labels collapse).

**V3 "Your questions, answered by the office".** Mr. Roof Waco's owner-voice idea made honest: tap a question, read the office's written answer (only answers the owner writes or approves; no AI, no audio).
- Answer panel: 400ms `--ease-surface`.

### S13 Questions (FAQ)
Job: answer the 8 questions people call about. FAQPage JSON-LD.

**V1★ "Plain answers".** `<details>`/`<summary>` list (native, keyboard and no-JS safe), two columns on desktop. Questions: How do I know if I have hail damage? / Will my insurance pay? / How long does a roof replacement take? / Do I need to be home? / What does the warranty cover? / Do you do repairs or only replacements? / What areas do you serve? / How soon can you come out?
- Open/close: CSS `interpolate-size: allow-keywords` height transition where supported (300ms `--ease-surface`), instant elsewhere; after each toggle, `ScrollTrigger.refresh()` debounced 100ms (level-2 #264 lesson: accordion heights shift every later trigger). Deep links: `#faq-insurance` opens its item (Interlock pattern, source read).

**V2 "Ask by situation".** Questions grouped under the same five situations as the hero chips.

**V3 "Search the answers".** A filter field over the questions (client-side, no network).

### S14 Close (late afternoon)
Job: the last screen: call, text, or request, with the office state.

**V1★ "The number".** The phone number set enormous (`--t-hero`, tabular, `tel:` link), its cast shadow long again (θ 160°, φ 12°), with `Text us` and `Request a written estimate` beside it, and the live office state line from S10 V3.
- Number: present (never animated: §2.7). Shadow: conductor-driven, transform only.

**V2 "Dusk".** The hero house again, now at dusk with porch lights on (Muse shot C2), the same CTA row; the relight lamp sinks.

**V3 "Sign here, again".** The estimate paper's last line: "Ready when you are." with the three actions as signature boxes.

### S15 Footer (evening)
Job: directory, legal, credits, honesty.

**V1★ "Directory + wordmark".** Columns: Services, Storm & insurance, Our work, Towns (24 links), Company. Contact block: address, phone, text, hours (Mon–Fri 9–5). A giant wordmark across the bottom, lit by the last of the evening light (cast shadow nearly horizontal). Bottom line: "Concept site by [designer] for a portfolio. Not affiliated with any reviews shown." + Motion Full/Calm toggle + stock credits link.
- Wordmark: lines rise; nothing else animates.

**V2 "Minimal".** One line of contact, the motion toggle, legal.

**V3 "Colophon".** Typefaces, image sources and credits, the page's own weight and request count measured at build (the honesty receipt idea from bank #435 in a small form), accessibility statement link.

---

## 5. Immersion and choreography (the whole page as one piece)

### 5.1 The light arc
One continuous change, top to bottom: golden hour (S1) → night (S2) → dawn (S3) → morning (S4–S5) → midday (S6–S7) → afternoon (S8–S13) → late afternoon (S14) → evening (S15). Driven by the conductor's P (§3.1–3.2). Grounds change at chapter seams by a 1100ms crossfade of two full-bleed layers (opacity only), never by animating background-color on the body.

### 5.2 Vector ledger (where things travel and why)
| From | To | Carrier | Mechanism |
|---|---|---|---|
| S0 header phone pill | floating lamp pill / mobile bottom bar | the phone | FLIP 400ms `--ease-move` |
| S1 hero lamp | S2 sunset | the light | relight uniform φ 8° → 2° scrubbed |
| S2 ceiling stain | S3 lamp circle | a ring | MorphSVG path → circle, 700ms |
| S3 found hotspots | S5 "What's going on" | the situation | state write (no visual travel) |
| S4 layer labels | S5 line items | 7 labels | FLIP, 700ms, stagger .06 |
| S5 stamp | S14 "Received" state in the close | the request | state (S14 shows "We have your request" if sent) |
| S7 noon | S9 numeral shadow flips side | the sun | conductor |
Every travel has a reduced-motion end state that is simply the destination.

### 5.3 WebGL and canvas, only where excellent
- **WebGL (one context):** S1 relight (hero photo) and S3 lamp (shingle macro). Both are the subject (light finding damage), not decoration. Nothing else is WebGL.
- **Canvas 2D:** S2 rain/hail only.
- **CSS 3D:** S4 V3 stack only.
- Everything else is DOM + SVG.

### 5.4 Micro-interactions (sound-off)
- Buttons: press scale .97, 140ms `--ease-out`; release spring back 240ms. Hover: background lighten 6% (OKLCH L+0.06), 160ms; only `(hover: hover)`.
- Links: underline draws left-to-right 160ms; on leave it retracts to the right (Q78 Kukuri direction logic).
- Chips: selected state fills blue-700, check glyph draws (stroke 200ms).
- Phone pill: on hover, the lamp ring inside brightens (opacity .4 → .8, 160ms). The number never moves.
- Copy-to-clipboard on the phone (desktop only): "Copied" replaces the label for 1.2s.
- Form focus: the chalk line thickens (1 → 2px), 160ms.
- Toasts: none. Inline confirmations only.

### 5.5 Cursor
§3.8. One ring that becomes the lamp where the cursor is the light; nothing else.

---

## 6. Pages

| Page | Purpose | Key sections | Notes |
|---|---|---|---|
| Home | the story | §4 | |
| Roof replacement | main money page | what's included (the layers), signs it's time, process, warranty, real jobs, estimate | OC system names confirmed by owner |
| Roof repair | small jobs | common repairs, when repair is enough, honest line, call | |
| Storm & hail damage | storm searchers | the storm chapter (still version), what to do in the first 48 hours, inspection, claim link | phone first |
| Insurance claims | the claim path | §4 S12 V1 expanded, documents to keep, adjuster meeting | no promises of approval |
| Siding | second service | materials offered (owner list), real jobs if any | stock labelled |
| Gutters | third service | seamless gutters, guards (owner list) | |
| Commercial roofing | flat roofs | EPDM / TPO / coatings (owner to confirm), process | |
| More exterior work | windows/doors/skylights if offered | owner list | |
| Our work | gallery | filter pills with real counts (AKLR #321 pattern), project cards = town + year + system + one-line outcome (#319, #328) | only their photos |
| Project story (template) | one job | before, the problem, what we did (layers), after, the walkthrough | needs owner photos |
| Process & warranty ("In writing") | the promise | inspection → written estimate → install → walkthrough → warranty terms | exclusions from owner |
| About & community | people | founder, team, community, 1995 → today | |
| Reviews | proof | S9 V1 + links + how to check any roofer | no pasted quotes |
| Financing & payment | paying | how paying works, insurance vs self-pay, "ask us" | no APR, no % |
| Service areas (hub) | 24 towns | rings + list + ZIP check | |
| Town page (template) | local search | built only when there are ≥3 real local facts (owner: jobs in that town, distance, typical housing) | Springboro first; no doorway pages |
| Roof guides (hub) + 4 articles | search + trust | "Hail damage: what it looks like", "Ice dams in Ohio", "Repair or replace?", "How to read a roofing estimate" | owner reviews facts |
| Contact & estimate | the funnel | full estimate engine, phone, text, hours, address, map link | |
| Thank-you | after submit | what happens next, the stamp, the phone | |
| 404 | lost | "This page is off the roof." + search of the nav + phone | |
| Privacy, Accessibility | legal | plain language | |

---

## 7. Conversion integrity

- **One primary action per screen, two equal routes:** Call and Text everywhere; the estimate is the third, quieter route (⟦S0226⟧ one goal). The phone is in the header, the mobile bottom bar, the hero, S2's storm line, S10, S14 and the footer: 7 placements, never moved, never animated.
- **Proof above the H1** (roofing.md crown pattern; Moderna Tak/Hippo source pattern): rating with count, BBB, manufacturer status, each a link to the issuer.
- **Market law:** review volume + verifiable credentials + written-estimate promise + interactive craft on one homepage (§1.3.7).
- **Facts only:** every number appears with its source in Appendix C. No prices, APR, discount %, licence numbers or 24/7 claims. Hours Mon–Fri 9–5 stated wherever the call promise appears.
- **Forms:** ZIP first (coverage before identity), max 4 required fields, `autocomplete` on all, no CAPTCHA (honeypot + time trap), inline errors, retry, saved answers (§3.5). Mobile keyboard types correct (`tel`, `numeric`, `email`).
- **Speed is conversion:** §8 budgets are hard gates.
- **Measurement:** first/last touch, `?cta=` tags on every CTA (gc-lead.js pattern), events: call_tap, text_tap, estimate_start, estimate_step_n, estimate_submit, estimate_error, version_switch (switcher usage, presentation analytics only). Beacon never fires during prerender.
- **Structured data:** RoofingContractor (name, phone, address, areaServed = 24 towns, openingHours Mo–Fr 09:00–17:00, sameAs Google/BBB/OC), FAQPage, BreadcrumbList on inner pages. AggregateRating only if the owner wants it and only with the live figure (Google's rules on self-served review markup make it of little use; default: omit).
- **Accessibility:** WCAG 2.2 AA: contrast table §2.2, focus visible, target size ≥ 24px (we use 44px), no motion required to understand anything, every canvas has a DOM equivalent, skip links before each sticky stage.

---

## 8. Performance and robustness budgets

| Budget | Mobile | Desktop | Gate |
|---|---|---|---|
| HTML (home, gzip) | ≤ 60 KB | same | build fails |
| Critical CSS inline | ≤ 14 KB | same | build fails |
| Fonts | ≤ 140 KB (2 variable WOFF2, subset Latin, `font-display: swap`, metric-matched fallbacks) | same | |
| JS before interaction | ≤ 35 KB app (module, deferred) | same | |
| GSAP + ScrollTrigger + SplitText + DrawSVG + MorphSVG | ≈ 60 KB gzip, loaded after first paint | same | |
| WebGL renderer | ≤ 8 KB | same | |
| Hero image (AVIF) | ≤ 140 KB (1080w) | ≤ 260 KB (2400w) | LCP element |
| Above-the-fold total | ≤ 500 KB | ≤ 800 KB | |
| Home total transfer (no interaction) | ≤ 1.4 MB | ≤ 2.4 MB | template images not fetched |
| LCP | ≤ 1.8 s lab (Moto G Power, 4G) / ≤ 2.5 s field p75 | ≤ 1.2 s lab | Lighthouse CI |
| INP | ≤ 150 ms | ≤ 100 ms | |
| CLS | ≤ 0.05 | ≤ 0.05 | sticky bar space reserved (Silo lesson) |
| Long tasks during scroll | none > 50 ms | same | Performance panel |

Robustness:
- **Mobile-first:** every section designed at 375px first; sticky stages shortened (§4); no hover-only content.
- **Reduced motion:** calm mode §3.7, fully designed, screenshot-tested.
- **No-JS:** every section's default version complete; the estimate is a plain form; FAQ is `<details>`; the B/A slider shows both images side by side.
- **No scroll traps:** no smooth-scroll library, no pins, no wheel `preventDefault`, every sticky stage has a skip link and is shorter than 4 viewports.
- **Failure:** WebGL failure keeps the image; GSAP failure (CDN or error) leaves the static page (html[data-motion-failed], Specia1ne loader pattern read in source); form endpoint failure keeps answers and shows the phone.

---

## 9. Shot list for Muse (images to make or source)

Grade for everything: "Chiaroscuro documentary" (§2.4). Deliver AVIF + WebP + JPEG fallback, 2400w and 1080w, plus the extra maps where listed. Every stock frame logged with source and licence for the colophon.

| ID | Section | Shot | Source | Extras |
|---|---|---|---|---|
| H1 | S1 V1 | Two-storey Dayton-area house, asphalt shingle roof, golden hour just after rain, low sun from left, wet roof glinting, three-quarter view from the street, sky clearing | stock or AI-assisted composite from stock, labelled | depth map (16-bit PNG), normal map of the roof plane |
| H2 | S1 V2 | ba2 "before" re-registered to "after" | owner's ba2 | registration, label removal (baked "Before/After" text cropped or cleaned) |
| H3 | S1 V3 / S3 V1 | Macro of weathered architectural shingle with 2–3 hail bruises, raking light, granule detail | stock macro or a real sample shot by the owner (preferred) | normal map, albedo flat-lit version |
| S2-1 | S2 V1 | House silhouette at night, layered (sky, far trees, house, near tree, porch light) | illustration/plates from stock | 5 separated PNG layers |
| S2-2 | S2 V1 | Plaster ceiling with a water stain, top-down, even light | stock | stain as separate SVG path |
| S2-3 | S2 V3 | One roof plane at 5 ages (0, 5, 10, 15, 20 years) | AI-assisted variations of one stock plate, clearly labelled illustrative | aligned |
| S3-2 | S3 V2 | Same roof from street and from roof edge at dawn | stock pair or owner | |
| S4-1 | S4 | Exploded axonometric of a roof corner (deck, ice & water, underlayment, starter, shingles, ridge vent, drip edge, flashing) | drawn from one 3D model (⟦S0414⟧) | layer-separated SVG |
| S5-1 | S5 | Paper texture (estimate paper), stamp artwork "RECEIVED" in blue-700 | made | |
| S6-1 | S6 V1 | Four install steps: protected driveway + delivery; tear-off with deck visible; shingles going on; clean yard + walkthrough | owner photos preferred; stock labelled | |
| S6-2 | S6 V2 | Same-angle time-lapse of an install day, 24–36 frames | owner shoot (tripod) | |
| S7-1 | S7 | Illustrative signature path (not a real name) | made | |
| S8-* | S8 | ba1-before, ba1-after (as separate jobs), ba2 pair, job-truck, job-charcoal, plus any owner job photos | owner | regrade only; no AI edits |
| S10-1 | S10 | Team photo regrade; portrait of the office manager | owner | |
| C2 | S14 V2 | Hero house at dusk, porch lights on | stock, same house as H1 if possible | |
| OG | all | Social card 1200×630: hero crop + wordmark | made | |

---

## 10. Build sequence (runs)

- **Run A: assets + static site.** Image grading and maps; type subsets; tokens; every section's DEFAULT version as static, accessible HTML/CSS, no JS; inner page templates; JSON-LD; no-JS estimate form. Gate: Lighthouse ≥ 95 all categories, HTML validator clean, axe clean.
- **Run B: motion core.** Conductor, sun, cast shadows, reveal grammar, header, S1 V1 dawn (static image + WebGL later), S2 V1 stage + rain. Gate: no long task > 50 ms, calm mode complete.
- **Run C: relight + layers + estimate.** WebGL renderer (S1, S3), S4 explode, S5 paper + stamp, the estimate engine, attribution, endpoint. Gate: funnel tested end to end incl. errors, offline, back button.
- **Run D: remaining defaults + switcher + alternates.** S6–S15 defaults; the switcher; all V2/V3 versions as templates. Gate: every `?v=` combination renders; ScrollTrigger refresh after switch; no jump.
- **Run E: inner pages.** All §6 pages.
- **Run F: QA.** 375 / 768 / 1024 / 1440 / 1920 screenshots of every section and version (full + calm); overflow gate (no horizontal scroll at any width); contrast; keyboard pass; screen reader pass (VoiceOver iOS, NVDA); no-JS; slow 3G; WebGL off; separate judge review against §1.3 and §1.4; fix list; re-shoot.

---

## 11. What I need from the owner / Muse

1. Is the firm's name connected to the painter? (Copy never claims it either way unless confirmed.)
2. Are job-truck and job-charcoal the same house before/after (house no. 7105)? If yes, a second true pair.
3. Any crew-on-roof, inspection and install-day photos; permission to use the team photo with names.
4. Warranty exclusions and the exact wording of the 50-year and lifetime terms.
5. Deck/plywood policy (photos and price before replacing boards?).
6. Form endpoint (FormSubmit-style or their email/CRM) and who receives leads.
7. The office call-back promise we may print (e.g. "same business day if before 4 pm").
8. Google Places API key (only for S9 V3).
9. Exact Owens Corning system and component names they install; siding/gutter brands.
10. For each of the 24 towns: any real jobs, local facts, or nothing (no page is built without ≥3 real facts).
11. Office manager portrait and first name to show; founder's preferred name in copy.
12. Logo: keep the current mark, refine it, or allow a new wordmark (name unchanged).
13. Gary Sinise Foundation project year and what was done.
14. A real sample estimate (anonymised) for S5 V2.

---

## Appendix A. Skill pack (read in full this run unless marked)
Strategy and taste: ⟦S1320⟧ build-awwwards-quality-sites · ⟦S0001⟧ · ⟦S0223⟧ · ⟦S0214⟧ · ⟦S1306⟧ audit-ai-design-slop · ⟦S0247⟧ · ⟦S1474⟧ · ⟦S1472⟧ · ⟦S0659⟧.
Motion craft: ⟦S0059⟧ emil-design-eng · ⟦S0060⟧ · ⟦S0063⟧ review-animations · ⟦S0065⟧ · ⟦S0083⟧ 12 principles · ⟦S0089⟧ · ⟦S1465⟧ · ⟦S0410⟧ · ⟦S0658⟧ · ⟦S0400⟧ · ⟦S0056⟧ · ⟦S0544⟧ · ⟦S1452⟧ peak-end.
GSAP and scroll: ⟦S0181⟧ gsap-core · ⟦S0187⟧ timeline · ⟦S0183⟧ performance · ⟦S0186⟧ scrolltrigger · ⟦S0184⟧ plugins · ⟦S0204⟧ · ⟦S0448⟧ · ⟦S1209⟧ · ⟦S1169⟧ · ⟦S1321⟧ · ⟦S1322⟧ · ⟦S1326⟧ · ⟦S1327⟧ · ⟦S1325⟧ · ⟦S1329⟧ · ⟦S1328⟧ · ⟦S0451⟧ masked-reveal · ⟦S1324⟧ reveal-hover-effect.
3D/WebGL: ⟦S0385⟧ · ⟦S0206⟧ · ⟦S0457⟧ · ⟦S0414⟧ teardown · ⟦S1362⟧ · ⟦S1363⟧ · ⟦S1341⟧ threejs-weather.
Type and colour: ⟦S0074⟧ better-typography · ⟦S0667⟧ · ⟦S0666⟧ · ⟦S0665⟧ · ⟦S0413⟧ oklch (CAPPED: main + 2 of 4 refs).
Conversion and local: ⟦S0226⟧ page-cro · ⟦S1128⟧ local-business · ⟦S1214⟧ service-area · ⟦S1262⟧ trust-signals · ⟦S1376⟧ editorial-service-booking · ⟦S1442⟧ · ⟦S0664⟧ · ⟦S0657⟧ · ⟦S0049⟧.
Prototype and variants: ⟦S0082⟧ variant · ⟦S0067⟧ prototype.
Performance and platform: ⟦S0280⟧ core-web-vitals · ⟦S0281⟧ · ⟦S1276⟧ view-transitions.
Description only (no full text exists in the library; used for direction, not claimed as read): ⟦S1502⟧, ⟦S1503⟧.

## Appendix B. Bank patterns used
Recipes R5, R7, R16 (refused), R21, R22, R31; deep reads #38, #40, #41, #44, #78 (Q78), #141, #153, #163 (Trionn), #164–#167, #258, #264 (L2 lesson), #317, #319, #321, #328, #348, #549 (Here Comes The Sun), #561 (Iper), #569 (Specia1ne), Q54, Q95 (Masked Heading), Q98 (Silo), Q120 (Raffael); source reads: Stronghold, West London Roofing, Green Conception (+ gc-lead.js), Hippo, Moderna Tak, Oslo Takmester, Interlock, Mr. Roof Waco, Zena.

## Appendix C. Fact sheet and copy rules
| Fact | Value | Source |
|---|---|---|
| Phone | (937) 746-7377 | owner pack |
| Founded | 1995, by Bunk Walker, restoring storm-damaged properties | owner pack |
| Google | 4.9 from 295 reviews (refresh before launch) | owner pack |
| BBB | A+ since 2001 | owner pack |
| Manufacturer | Owens Corning Platinum Preferred | owner pack |
| Warranty | 50-year non-prorated materials; lifetime workmanship | owner pack (exact terms §11 Q4) |
| Insurance | $2M liability | owner pack |
| Area | Springboro + 23 towns (24) around Dayton | owner pack |
| Hours | Mon–Fri 9–5 | owner pack |
| Ohio weather | ~19 hail days/yr; hail Apr–Jul; freeze-thaw Nov–Mar with ~50° swings in a week; ice dams Jan–Feb; 20-year mark common for shingle roofs | owner pack |
Copy rules: no em dashes in site copy; British/US: US spelling on the site (Ohio audience); numbers as numerals; no superlatives without a source; no "24/7"; no prices, APR, discount %, licence numbers; no invented reviews, names or counts; stock never captioned as their work; every claim links to its issuer where one exists.
