# BUILDER BRIEF — the practical build manual from the research bank

**For:** Claude (and any builder working for Asiful) when assembling prospect homepage previews, per-trade templates, the six portfolio demo sites, and Asiful's own sites.
**Delivery model (unchanged):** WordPress + Elementor Canvas, full-width container, zero padding, one HTML widget, one single-file build per page. Previews live at builtbyasiful.com/<client-slug>.
**Source of the patterns:** `proven-recipes.md` (45 test-built recipes, R1–R45), `animation-parameter-library.md`, `3d-and-svg-library.md`, `ui-ux-patterns.md`, and `industry-best/00-conversion-anatomy.md` (findings F1–F18, 24-item template checklist). Recipe numbers below are the register numbers in `proven-recipes.md` — use them in build notes and QA reports so a choice can be traced.

Read this brief top to bottom before a build. Build in the order it is written: page type → recipe stack → motion → cost → checklist → QA.

---

## 0. Authority — how this brief sits with the existing build kit

1. **SKILLS-CATALOG.md remains the highest authority.** Read it and apply it (animation, typography, layout craft). Never install the skills — read, understand, use.
2. **This brief governs bank-derived patterns only:** which proven recipe goes where, what it costs, how much motion a trade page may carry, and what the conversion checklist requires.
3. **Asiful's standing build standards are not replaced by this brief** — they are repeated where they bite (§6, §8, §9) because they are the rules builds have actually failed on.
4. If the three conflict: SKILLS-CATALOG wins on craft, this brief wins on recipe choice / weight / trade conversion structure, and a standing standard from Asiful wins over both. Flag the conflict in the build note; do not silently pick one.
5. A pattern that is not in `proven-recipes.md` is **untested**. You may use it, but label it untested in the build note and give it the full triple-check (§9). "It was in a deep read" is not proof it works in our stack.

---

## 1. The page you are building

A preview is **the homepage of a future full website, not a landing page.**

- Menu shows the full future site structure from the start.
- Services gets a **dropdown mega-menu listing all services** — best UI/UX available, not a plain link list.
- Every future-page menu link is just `#`. Those pages are built only when the client says yes. Do not invent working sub-pages.
- Default trade homepage order (bank skeleton, from the anatomy + UI/UX trade order):
  1. Nav with phone + quote CTA
  2. Hero — headline (outcome / fear-relief), one-line proof strip, ONE low-friction entry
  3. Named system / guarantee as a pillar
  4. Services (stacking cards or grid — §2)
  5. Price-transparency device
  6. Other-vs-Us comparison table (early, not buried)
  7. Proof — reviews, before/after, project work
  8. Numbered, timed process (3–5 steps)
  9. Financing (its own section; nav item on high-ticket trades)
  10. FAQ
  11. Closing CTA
  12. Directory footer
- **Spacing must breathe.** No section, badge, guarantee block or card group sits stuck to the next. If two elements touch or crowd at any breakpoint, that is a build defect, not a style choice.
- Hero images are **embedded directly (base64) in the preview file** — remote hero images load slowly and a slow hero kills the first impression. Non-hero imagery follows the weight budget in §5.

---

## 2. Default recipe stack per page type

Costs are "as shipped" from the cost lab. Two accounting rules apply to every line below:

- **GSAP is bought once per page:** one shared load, **115.6 KB min / 45.7 KB gzip**, site-wide. Never inline a second copy per recipe — inlining is why some test files read 97–132 KB for a single effect. If a page uses GSAP at all, every GSAP recipe on it rides that same load.
- **The service-page layer is vanilla territory:** forms, pricing, proof and structure recipes ship at **5–16 KB each, with little or no JS and no library.** If a service-page component needs a library, you have picked the wrong recipe.

### 2.1 Hero

| Job | Default recipe | Cost | Notes |
|---|---|---|---|
| Default trade hero | **R33 Motion-clip proof hero** | ~149 KB as files (JS 0.9 KB; media is the cost) | Cheapest, most portable hero in the bank. 3–5 short muted looping clips / poster frames of real work. Poster-first, always. |
| Parallax hero (planned-purchase / portfolio) | **R31 Pin + parallax hero** | 119.8 KB libs inlined (= shared GSAP load in production) | Pin must release. Phone variant is unpinned by design — never force the pin onto a phone hero. |
| Headline reveal | **R2 Masked word reveal kit** | 4.4 KB + shared GSAP | Hand-rolled splitter — no SplitText licence needed. Default headline treatment. |
| Headline soft reveal (alternative) | **R3 Blur/rise text kit** | 5.5 KB + shared GSAP | **Headlines only, modest word counts.** Variant A animates `filter: blur()` — the priciest paint in the kit. Body copy uses variants B/C (transform only). |
| Rotating headline word | **R18 Rotating headline word** | 4.0 KB (JS 0.8 KB) | One word only. For a trade/service rotation in the H1. |
| Trust numbers in/under hero | **R20 Count-up trust stats** | 4.8 KB (JS 1.4 KB) | No-JS fallback is structural — the final numbers are in the HTML (see §6). A counter that reads 0 without JS is a defect (see §10). |
| WebGL headline | **R32 DOM-first WebGL headline** | **595.4 KB (Three.js ≈589 KB)** | **CAP: Asiful's own portfolio hero ONLY. Never on a prospect preview, never on a trade template.** Real HTML text stays in the DOM (transparent, not removed); fallback = the plain headline. Load Three.js after `fonts.ready`. |

Hero build rules, all page types:

- One-line **proof strip in or directly under the hero**: ★ rating + review **count** + licence + since-year / warranty. One line. (F1)
- Licence number **in the first screen** where the licence sells (FL/CA and UK regulated trades); footer licence links to the regulator. (F11)
- Headline sells an outcome or fear-relief, not company history. Subhead names the buyer's top fear: budget / timing / risk, or price certainty. (F2)
- ONE low-friction hero entry: instant estimate, zip/postcode-first field, photo estimate, or project picker — before any long form. (F3)
- Do not use: gate loaders, long loaders, non-scrolling scene pages, a hero with no phone/quote path. (F17, §10)

### 2.2 Services and section entrances

| Job | Default recipe | Cost | Notes |
|---|---|---|---|
| Default section entrance | **R5 Role-grouped 4-step choreography** | 4.9 KB + shared GSAP | Eyebrow → title → body → media, beats offset 0.08–0.12s in one timeline. This is the house section entrance. |
| Scroll reveal (general) | **R1 Direction-aware reveals** | 5.0 KB + shared GSAP | ±100px by scroll direction, 1.25s expo, overwrite auto; halve travel on mobile. |
| Zero-JS reveal layer | **R4 Zero-JS scroll-timeline reveals** | 4.0 KB, **JS 0** | Use where zero-JS matters more than direction awareness. Enhancement layer only — content is fully present without it. |
| Services list | **R45 Stacking service cards** | 6.0 KB, **core effect zero JS (CSS sticky)** | The default Services treatment. See the pin rule in §4 — the GSAP pin variant was deliberately never built. |
| Chaptered long page + anchor nav | **R44 Chaptered page + anchor nav** | 7.1 KB (JS 0.6 KB) | For long service pages. Set section IDs + 64px scroll-margin so the sticky header never covers a heading. |
| Section separator | **R8 Morphing SVG separator + clip edge** | 128.9 KB libs inlined (= shared GSAP in production) | **Production fix is mandatory:** the last separator's morph only completes ~47% desktop / ~56% mobile because its end sits past reachable scroll. Give the final separator a taller following section, or shift its end to `"bottom bottom"`. Paired `d` / `data-path-to` must keep identical command/point structure or the morph garbles. |
| Route / journey divider (optional charm) | **R39 MotionPath route divider** | 97–120 KB band libs inlined (= shared GSAP) | Cheapest GSAP recipe per unit of charm. Hidden on touch. Use sparingly — one per page. |

- **Card groups animate in staggered on scroll — never static.** About/company cards, service cards, proof cards: if a group of cards just sits there on scroll, the build is unfinished.
- Quiet, unique shape dividers between sections are part of the house style; subtle floating background SVGs with cursor parallax are allowed **only** inside the motion ceiling (§3).
- Small cursor follower that reacts per background/element is house style on desktop. Keep the system cursor usable; never hide it. Touch gets no follower.

### 2.3 Proof

| Job | Default recipe | Cost | Notes |
|---|---|---|---|
| Before/after | **R28 Before/after slider** | 7.7 KB (JS 1.5 KB) | Touch-first, drag handle, labels, keyboard arrows. Table stakes in remodeling; standard in concrete; the open flank in landscaping — a working slider beats most of that market on one feature. |
| Testimonials | **R29 Testimonial carousel** | 10.3 KB (JS 6.0 KB) | **Render the cards in HTML in production** (SEO + no-JS), auto-advance + manual, pause on hover/touch. A live dated review feed beats a carousel where one exists. |
| Comparison | **R30 Comparison table (Other vs Us)** | 7.9 KB, **JS 0** | Early on the page (after initial proof, before testimonials). Fields: response time, guarantee, pricing transparency, cleanup — trade-appropriate equivalents. |
| Gallery (standard) | **R13 Horizontal gallery + pagination** | 5.9 KB + shared GSAP | Desktop pinned track with progress + 01/0N counter. **Phone = native scroll-snap strip, no pin at ≤768px** — degraded by design, not by accident. |
| Gallery transition (portfolio) | **R10 Grid-to-fullscreen gallery** | 97.2 KB GSAP inlined (= shared GSAP) | DOM port, no WebGL. Phone gets fade/scale. |
| Pixel-dissolve gallery | **R34 Pixel-dissolve gallery** | **596.0 KB (Three.js ≈589 KB)** | **CAPS: desktop galleries only, ≤6 images, one shared renderer, never the phone hero.** Plain `<img>` fallback stays in the DOM. |
| Distortion hover | **R35 Distortion hover** | **666.8 KB** | **CAP: desktop-only accent.** Touch falls back to a plain swap. Never under a conversion-critical before/after, never as a system. |
| Marquee (reviews / logos / areas) | **R16 Seamless marquee** | 6.1 KB, **JS 0** | Duplicated track, −50% loop. Pause on reduced-motion and hover. Trade winners run a 60s linear marquee — slow, not frantic. |
| Status / availability bar | **R42 Status & scarcity bars** | 5.2 KB (JS 0.7 KB) | Honest availability ("Now booking: <month>"), booking window. Set a static fallback date for no-JS. Never fake scarcity. |

Proof content rules (from the anatomy — these are content requirements, not styling):

- Reviews carry **platform + score + count, separately** — never blend scales into one invented number. (Matt Plumbing rule)
- Reviews **name the operative** where true, and are tagged by project type where possible. (F6, F13)
- Ship **LocalBusiness + AggregateRating JSON-LD with the client's real numbers**.
- At least **one claim checkable against a public record** (licence lookup, permits, deeds, documented job count), printed **with its honest caveat**. Checkable proof beats asserted proof. (F12)
- Where job history exists, publish **invoiced distributions**: median band + middle-half range, and a per-project price band on before/after pairs. Ranges are estimates; distributions are evidence. (F7e)
- Every gallery photo is real work — **and say so on the gallery.**
- A named/trademarked system or guarantee is a **pillar**, used like a product name — not a paragraph of prose. (F4)

### 2.4 Quote form and pricing

| Job | Default recipe | Cost | Notes |
|---|---|---|---|
| Quote form | **R21 Budget-radio quote form** | 5.4–7.8 KB band, JS ≤1.9 KB | Budget/job-size radios are the **first field** — the form qualifies the lead itself. Carry the response promise line (e.g. 48-hour). FormSubmit-compatible. Full keyboard / assistive-tech pass required. |
| Form styling | **R22 Floating-label form kit** | in the 5.4–7.8 KB slice band | HTML widget; input-then-label order. Include error states — a form kit without error states is unfinished. |
| FAQ | **R23 CSS-only FAQ accordion** | in the slice band, **zero JS** | details/summary or checkbox pattern, grid-rows height animation. |
| Tier configurator | **R24 Tier-pricing configurator** | in the slice band | Selectable tiers update a summary price live; no-JS fallback shows the static tiers. `:has` highlight needs the tiers inside one form/widget. |
| Modal (quote / video / detail) | **R25 Modal kit** | in the slice band | Focus trap + Esc close are mandatory. Overlay must sit outside any transformed ancestor — Elementor Canvas avoids that trap; check anyway. |
| Pricing toggle | **R41 Frequency-toggle pricing** | 6.2 KB (JS 1.3 KB) | Plan / one-off / monthly-annual price sets with animated number swap. |
| Colour / product customiser | **R36 Colour customiser** | <11 KB, library-free | Swatch-driven change on a product visual (CSS/SVG tint). Note in the build note where a real product genuinely needs 3D instead — do not fake it silently. |

Form doctrine per trade (do not swap these):

- **Emergency trades (plumbing, HVAC emergency, roofing repair): phone first, form second.** First `tel:` link early in the HTML (the bank's best: 10.2% of the document; Matt Plumbing's steal: 6.2%). Sticky mobile bar: Call / Text / Book.
- **Plumbing converts on the phone, siding converts on the quote form** — reverse doctrines, both verified. Siding gets a sticky "written quote" CTA; plumbing gets the earliest possible call path.
- **Lowest-friction first field wins:** postcode/zip, property address only, or photo upload. Green Conception's no-gate form asks for the address and **no contact details** before showing a price — that is the ceiling to aim at where the trade allows it.
- Hero form fields on a phone: name / phone / service / postcode maximum. Scrub the template's trade terms out of every option and label (§8).
- Where price stays gated, a **problem-picker quiz that ends in a recommendation** is the substitute entry — the quiz IS the quote path. (TruGreen pattern)
- A resumable quote + first/last-touch attribution (UTM + referrer stored, attached to the lead) is the most stealable small-firm lead-tech in the bank — pair it with Asiful's own tracking pixel where a full build allows it.
- The primary consultation must **produce a number** — budget range, scope, or line-item price — and the page must say so. "Free consultation" with no named deliverable is the weak form. (F14)

**Evidence flag — R21–R25:** this slice is **source-audited, not device-rendered** (three render routes were blocked in the test environment; weights are measured, JS parses clean). First production use of each of R21–R25 gets a rendered pass on a real device view (375px + keyboard + reduced-motion) before it is treated as fully proven. Same caution, lighter, for R1–R5 (code-inspection verified).

### 2.5 Navigation and footer

| Job | Default recipe | Cost | Notes |
|---|---|---|---|
| Menu + mega-menu | **R26 Menu overlays + mega-menu** | 15.7 KB (JS 2.1 KB) | Full-site menu (§1) with the Services mega-menu variant. Wire the burger to the overlay; verify scroll-lock **releases** — a menu that traps scroll fails QA outright. |
| Filterable work index | **R27 Filter pills with counts** | 8.4 KB (JS 4.8 KB) | Per-category counts shown on the pills. For portfolio / project indexes. |
| Footer | **R43 Knowledge hub + directory footer** | 7.9 KB (JS 0.4 KB) | Aftercare/guide cards + full service-directory footer columns. Works with JS off. Footer licence links to the regulator (§2.1). |
| Accent word animation | **R19 Shuffle accent word** / **R17 Marquee along SVG path** | 4.1 KB / 5.6 KB | One accent only, never body copy. R17 needs its fit()/path-rescale step on mobile or it distorts. |
| Card ring (portfolio jewellery) | **R37 CSS 3D card ring** | <11 KB, library-free | Desktop jewellery only, honest phone fallback (static arc / swipe row). Unbroken `preserve-3d` chain or it flattens. |
| Draggable row | **R38 Draggable inertia row** | 97–120 KB band (= shared GSAP) | Mode B proves the inertia feel survives without the Club plugin — use Mode B. Keyboard path is required. |

---

## 3. The motion ceiling — the rule that governs everything above

**Finding F17, verified across every trade's top tier: trade winners do not run scene animation.** Their motion is:

> **CSS transitions 0.15–0.28s ease-out + one carousel + ONE signature interactive per page.**

Stronghold Roofing's exact production system is the reference dose: enter/exit .15s ease · accordion .2–.28s ease-out · scale-in .18s ease-out · marquee 60s linear · beziers `cubic-bezier(.4,0,.2,1)` and `(0,0,.2,1)`. Nobody at the emergency / lead-gen top of roofing, HVAC or plumbing loads GSAP or WebGL at all.

Apply it as three tiers:

**Tier 1 — Emergency / lead-gen trade pages (default for prospect previews).**
CSS-family motion at the dose above. Reveals, one carousel (R29 or R13 phone strip), one signature interactive (R28 slider, quiz, or map). No loaders, no scene pages, no WebGL, no pinned sections except the signature story (§4). GSAP may be present for the reveal system (R1/R2/R5) — it is not required, and R4 exists precisely for the zero-JS version.

**Tier 2 — Planned-purchase pages (remodeling, design-build, HVAC planned purchase, siding).**
GSAP at **reveal level** is allowed once the conversion systems are complete first: the two verified exceptions in the whole bank (AirWorks, LYKORA) both carry full pricing/proof/process systems underneath their GSAP, and AirWorks' motion is deferred-loaded with a CSS backstop so the conversion layer never waits on it. Dose: reveal family only — durations and parameters below. Still no scene pages, no loaders, no WebGL hero.

**Tier 3 — Asiful's own portfolio / agency site only.**
The full craft range opens up: R31, R32 (the only place R32 may appear), R34/R35 within their caps, horizontal galleries (R13/R14 desktop forms), mask transitions (R6 blinds: 30 slits, stagger 0.02, scrub shortened to ~1 on mobile; R7 grid mask: 14 cols desktop → 6 mobile, rebuilt on breakpoint). Portfolio craft never leaks back into a prospect preview.

**GSAP parameters when GSAP is used (from the parameter library — do not invent new values):**

- Reveals run **0.4–0.8s**; triggered motion = **expo / power2 / power3 out**; scrubbed motion = **linear ease**, always.
- Staggers live in **0.02–0.12s** — never larger.
- Masked word reveal: 0.6s expo.out, stagger 0.04–0.06, words start 64–70px under the mask, `clearProps` after.
- Slide-up reveal: 0.8s power2.out, stagger 0.02, autoAlpha + yPercent, `clearProps` after.
- Blur-in: 0.4s power1.out, blur 10px→0, y 15px→0 — headlines only (§2.1).
- Role-grouped choreography (R5): role beats offset 0.08–0.12s inside one timeline.
- Direction-aware (R1) is the one deliberate exception at 1.25s expo — that duration is the recipe, not a licence to slow everything else.
- Lenis, where used, feeds its rAF into the GSAP ticker — scroll and tweens share one clock.
- Touch / coarse pointers always get a separate, simpler path.
- GSAP is the main event **on Asiful's own builds and previews where the brief calls for it** — scroll reveals, card stacking, horizontal-scroll gallery, signature story — dosed by the tier above. Animation quality goes into the **first** brief at reference quality or better; do not add new animations beyond the brief without re-checking everything (§9).

---

## 4. Pin rules — read this before pinning anything

Pinned sections can trap scrolling on real phones. The fix is never "remove the pin" blindly — it is "use the right mechanism":

1. **Signature story (the leaking-roof story, adapted per client): MUST pin on mobile.** It fixes at the top of the screen, scrolling plays it, and it releases when the animation ends. Use the proven House Martin's configuration, mobile end ~235%. Verify release by a full scroll-through on a 375px view, every build, after every change near it.
2. **Stacking cards: never a GSAP pin.** R45 uses CSS `position: sticky` — that is why the recipe exists. Prefer the pattern that cannot trap phone scrolling wherever the effect allows it.
3. **Pinned word-cycle headline (R12):** allowed because its spacing is margin-manufactured and its end is finite (words × 50%). Verify the release; the release test IS the recipe.
4. **Horizontal galleries:** desktop pin is proven (R13); on phones the same section is a native scroll-snap strip. R14's pinned form is desktop-only — phones stack. Never ship a pinned horizontal on a phone.
5. **Pin + parallax hero (R31):** phone variant is unpinned by design.
6. **Lottie scrub (R11):** carries a ~250 KB lottie-web tax and real pinned scroll-travel cost on mobile. Count both before choosing it; under 749px its start is `"center 45%"`. Most trade pages should not choose it.
7. Any other pin needs a written reason in the build note + a recorded 375px scroll-through release test.

---

## 5. Cost lab — weight budgets and ship rules

Weight is the ceiling, not the stack (F18). Winners run everything from hand-built static (~50 KB HTML — Lusk, the model) and 121 KB / 9 scripts (Matt Plumbing — the template speed budget) to WordPress + Elementor (Hippo, Elbaz — our own stack). The cautionary tales are all heavy: 1.0–2.03 MB HTML documents, every one flagged by its own lane.

**Budgets (HTML document, before images unless stated):**

| Page | Budget | Rule |
|---|---|---|
| Trade template / prospect preview | **Target ≤330 KB HTML; aim at the 50–150 KB class** | Winners' range is ~50–330 KB. Above that, name what the weight buys in the build note. |
| Any page | **>1 MB HTML needs explicit justification** | No justification = cut weight before QA, not after. |
| Hero media | **ONE hero video, poster-first** | R33 total ~149 KB as files is the reference. 37-video heroes are an anti-pattern (§10). |
| GSAP | **45.7 KB gzip, once per page** | Shared load. A second inlined copy is a defect. |
| Three.js | **≈589 KB toll, Tier 3 only, caps in §2** | R32 portfolio hero only · R34 ≤6 images / one renderer · R35 desktop accent only. Nowhere else, ever. |
| Lottie | **~250 KB tax** | Count it in the build note before using R11. |
| Service-page layer | **5–16 KB per recipe** | Forms, pricing, proof, structure. A library here means the wrong recipe was picked. |

**Ship rules:**

- **Prefer the pattern that cannot trap phone scrolling** (§4). When two recipes give the same visual result, the one without a pin wins.
- **CSS sticky beats a GSAP pin** for stacking and sticky effects, every time the effect allows it.
- **Never hide content in CSS.** Hidden start-states are set by JS only, inside a `prefers-reduced-motion: no-preference` matchMedia branch. If JS fails or is off, the page reads complete. (Cross-slice standing rule — slices 1, 4, 9.)
- **No-JS fallback is structural, not an afterthought:** counters show final values, configurators show static tiers, footers and accordions work. R20, R23, R24, R30, R43 are built this way — keep them that way.
- **Reduced motion is a shipped feature, not a chore:** every recipe's reduced-motion behaviour is the one recorded in its cost-lab record (variant, static fallback, or paused). Award sites mostly skip this (2 of 15 checked) — our builds ship it, and QA tests it (§9).
- Dropping Lenis where a recipe doesn't need it saved ~30 KB in testing with the mechanism unchanged — question every library line in the file.
- Embedded hero images (§1) are a preview-delivery rule; on a full build, serve imagery properly (CDN/responsive) and keep the same weight discipline.

---

## 6. Standing build standards this brief does not override

- **Exact client logo, Rule #1.** The client's real logo, exactly — never a redrawn, recoloured or "close enough" version.
- **Never rotate a text-bearing element.** Badges, seals, circular text, guarantee discs: if it carries text, it does not rotate. (A rotating `.est` badge was a real shipped bug — two tweens both writing `rotation`.) Verify by numeric angle sampling after scroll round-trips, not by eyeballing one frame.
- **Animation quality in the first brief**, at reference quality or better. Prefer NO new animations beyond the brief; any added animation triggers a full re-check.
- **Personalisation scrub:** a live template reference shipped another trade's copy inside its quote form options and CTA. Before any preview is shown, search the whole file for the template's trade terms, town names, licence numbers, prices and company names. Residue = fail.
- **One consistent number everywhere:** review count, years, job count — the same figure in hero, proof, schema and footer, and reconcilable if a visitor adds the page's own numbers up. (F12)

---

## 7. Build-time checklist — the anatomy's 24 items, condensed

Work down this list on every trade template / preview. An item is either true on the page or named as a deliberate exception in the build note. Bracketed refs are the anatomy findings.

**Hero and offer**

- [ ] 1. Hero proof strip: rating + review count + licence/registration + since-year or warranty, one line, in/under the hero. [F1]
- [ ] 2. Headline = outcome or fear-relief; subhead names the buyer's top fear. [F2]
- [ ] 3. One low-friction hero entry — instant estimate, postcode-first, photo estimate, or project picker — before any long form. [F3]
- [ ] 4. Licence in the first screen where it sells; footer licence linked to the regulator. [F11]
- [ ] 5. Primary consultation promises a NUMBER as its deliverable — and says so. [F14]
- [ ] 6. A price-transparency device is present (instant quote / published ranges / plan pricing / pricing page / invoiced distributions) — never "call for all pricing". [F7]
- [ ] 7. A productised layer where the trade allows it: named plans, designs or packages with from-prices, or a published rate card. [F16]
- [ ] 8. Money mechanics published where they apply: payment schedule, retainer credited, fixed-price mechanism, or one contractual promise the client can be held to. [F15]

**Proof**

- [ ] 9. Named system / guarantee / warranty, trademark-style, used as a pillar. [F4]
- [ ] 10. Reviews: platform + score + real count shown separately; tagged by project type where possible; live dated feed preferred over a slider. [F5/F6]
- [ ] 11. Reviews name operatives where true; AggregateRating JSON-LD shipped with the real numbers. [F13]
- [ ] 12. At least one claim checkable against a public record, printed with its honest caveat. [F12]
- [ ] 13. Invoiced distributions where job history exists: median band + middle-half range; per-project price bands on before/after pairs. [F7e]
- [ ] 14. Every gallery photo is real work — and the gallery says so.
- [ ] 15. Us-vs-them / us-vs-alternative comparison table early on the page. [F8]

**Structure and conversion path**

- [ ] 16. Numbered process on the homepage, 3–5 steps, each step de-risking one fear, **with calendar time** (week ranges / durations). Untimed processes score lower everywhere.
- [ ] 17. Warranty CLOCK stated, not just its length: it starts when the client signs off happy. [F15]
- [ ] 18. Design deliverables week-stamped: each artefact labelled with its week and the decision it settles. [F15]
- [ ] 19. Financing is its own section — and a nav item on high-ticket trades. Named lenders where they exist. [F10]
- [ ] 20. Sticky call/quote path on mobile; phone visible in nav on desktop; trade doctrine applied (§2.4 — phone-first vs form-first).
- [ ] 21. Where the trade allows a catalogue: live-repricing price list or enquiry cart (add-to-enquiry + visible selection state) between a form and a shop. [F16]
- [ ] 22. Service / location pages carry genuinely local content (rules, permits, climate) — never city-swap.

**Motion and weight**

- [ ] 23. Motion inside the ceiling for the page's tier (§3): CSS 0.15–0.3s ease-out family, one carousel, ONE signature interactive; no scene pages, no loaders, no WebGL on lead pages. [F17]
- [ ] 24. Weight audited before ship: HTML + script count + library lines against §5 budgets; one hero video maximum, poster-first. [F18]

---

## 8. Anti-patterns — never ship these

All confirmed on real opened sites during the research; all are QA fails here:

- Brand-first page with no phone/quote CTA in the page text.
- Inflated, unverifiable claims ("50 MILLION HOMEOWNERS"); unverifiable absolutes sitting next to real proof — they dilute the proof.
- Stock imagery inside a process section or portfolio; "inspiration" galleries of other people's work presented as own work.
- Placeholder testimonials, placeholder headings, or licence placeholders left live.
- Animated counters that render 0 without JS; a calculator that renders "0" statically with no labelled fallback.
- Inconsistent numbers for the same fact on one page.
- Gate loaders, long loaders, non-scrolling scene pages on a page whose job is phone calls.
- A form carrying another trade's copy in its options (see §6 scrub).
- Hidden content with no no-JS path (§5); a pin that does not release (§4); a menu scroll-lock that does not release (§2.5).

---

## 9. QA — triple-check, then screenshots, then Asiful

No build reaches Asiful with breakage in it. He is the approval gate, not the tester.

1. **Triple-check QA: three independent, different checks** of everything the client asked for — section by section, every animation frame by frame, visually audited **and** interactively scrolled/clicked. Check 1: build against this brief + checklist (§7). Check 2: fresh-eyes visual audit, desktop + mobile. Check 3: interactive — scroll the whole page both ways, click everything, submit-test the form path, open/close the menu, drag the slider.
2. **After EVERY change**, re-check the surroundings and then the whole page again. A fix that breaks a neighbour is the most common failure mode.
3. **Mobile is its own pass:** 375px screenshots, full scroll-through (pin releases, §4), sticky bar behaviour, menu open/close, tap targets, hero form usability.
4. **Reduced-motion pass:** every animated element has the behaviour its recipe record promises.
5. **Badge/rotation check:** numeric angle sampling on any element near a transform animation, after scroll round-trips (§6).
6. **Numbers pass:** §6 consistency + schema matches on-page figures.
7. **Screenshot approval gate — nothing uploads before it.** Screenshot EACH SECTION individually, desktop + mobile (375px), animations frame-by-frame. Present to Asiful organised by section. He approves ("okay finalize") or gives feedback → back to build → re-screenshot → re-present. **No upload until screenshots are approved**, and a tentative "upload it" alongside a still-broken core interaction is not sign-off — name the issue and get explicit confirm-as-is; his phone check on the live page is the final gate.

---

## 10. One-page summary for the wall

- Default hero: R33 clips + R2 headline + R20 stats + proof strip. WebGL hero (R32) = portfolio only.
- Default entrance: R5. Default services: R45 (CSS sticky). Default proof: R28 + R29 (HTML cards) + R30. Default form: R21 + R22. Default footer: R43. Default menu: R26.
- Service-page layer: 5–16 KB per recipe, no library. GSAP: one shared 45.7 KB gzip load. Three.js: ≈589 KB, Tier 3 caps only.
- Motion ceiling: CSS 0.15–0.28s ease-out + one carousel + one signature interactive. GSAP craft is reveal-level, Tier 2+ only, conversion systems first.
- Pins: signature story pins on mobile (proven config, ~235% end, release-tested); stacking cards never pin; phone horizontals never pin.
- Never hide content in CSS. No-JS reads complete. Reduced motion shipped.
- Checklist §7 all true or named exceptions. QA §9 all three checks done. Screenshots approved before upload.
