# PLAN-V2 — Elbaz Construction homepage, reference-built sections

Supersedes the unbuilt sections of `PLAN.md` (§5 architecture, §6.2–§6.10). `FACTS.md`, the core runtime, the system tokens (§4) and the built hero stay. Method (restart brief §3): every version below names its **reference** (Atlas entry / bank entry / ⟦S⟧ skill), the **mechanism copied**, its **key values**, and the **adaptation** to Elbaz. Versions within a section are different references with different layout, composition and style. No mechanism is used twice anywhere on the page, so any 1·2·3 mix stays trick-unique.

Sources read for this plan: `bank-index/BANK-MAP.md` front matter + Playbooks 1–10 + mechanism families; Atlas entries named below; bank sources under `previews/bank-selection/remodeling/…` and the remodeling pack's code-source captures (pen-40, scrolltrigger-horizontal-pagination, 94-sticky-grid-scroll, smeulders, lagom, tillberg, count-up, 95-masked-heading, blk-design-your-own, iper, digital-butlers); live references visited: smeulders-ig.nl, lagom-development.com, tillbergdesign.com (tympanus.net demos are Cloudflare-gated; their Atlas entries carry the measured values).

---

## 0. Page system (applies to every section)

| Decision | Reference | Values |
|---|---|---|
| Section order | [BANK] Elbaz co-skeleton (remodeling crown) + Roofix order as declared source; anatomy §8 remodeling doctrine "proof-before-services, financing sold before scoping, timed process" | hero → proof → services → before/after → process → financing → work → reviews → towns → consult → footer |
| Default section entrance | [BANK] Q40 direction-aware reveals (pen-40, CROWN) | `fromTo` y ±100px (≈50px on phones), autoAlpha 0→1, 1.25s `expo`, `overwrite:"auto"`, direction from `self.direction`; used wherever a version has no entrance of its own |
| Motion law | [BANK] Anatomy §7b F17 | reveal-level dosing; ONE signature interactive in the default page (the before/after handle); **default configuration (all versions 1) has zero pins**; pins exist only in hero v2, process v3, work v2 |
| Weight law | [BANK] Anatomy §7b F18 | three.js (≈600KB) and the Archivo variable font (90KB) removed from the bundle; WebP stills only, no video |
| Smooth scroll | ⟦S1320⟧ one engine | Lenis only (already in core) |
| Version switcher | ⟦S0736⟧ tweaks engine | per-section state persisted under one key (`ez-versions`) + URL; ≤3 options per knob; instant swap (already in core) |
| Cursor | ⟦S1321⟧ difference-blend cursor + [BANK] tillberg-design `data-cursor`/`data-cursor-label` + P10 attribute-state follower | quickTo lag .35; states per element (chrome.css); off on coarse pointers / reduced motion |
| Display type | Brand token (FACTS + the firm's own "28 TYPOGRAPHY SYSTEM": "Display typography is Bebas Neue only", one weight 400, separated by size and tracking) | Bebas Neue 400 + Geist variable for text |
| Mobile contact | [BANK] Anatomy §6 (A.B. May sticky bar) + checklist 10 | phone-width sticky bar: Call · Text · Book |
| Footer | [BANK] Giant two-tone footer wordmark (OFFF Forum pattern) + [BANK] 319 Bakstad footer record | "ELBAZ" set full width in two tones under the close; NAP + licence + hours as the record |
| Schema | [BANK] Anatomy §5 + ⟦S1128⟧ | LocalBusiness + AggregateRating 4.8/343 with the real numbers (in `base.html`) |

**Retired from PLAN.md:** the WebGL `room` section. F17 (no top trade site runs WebGL scenes) + F18 (three.js alone ≈600KB) + facts (Elbaz publishes no 3D-design offer, so an illustrative model would not "earn it"). Its slot goes to **financing**, which the remodeling doctrine places before the gallery (anatomy F10, Elbaz crown). The separate kitchens/baths sections merge into one **services** section carrying PHS's per-service timeline figure.

---

## 1. Hero traceability check (built before this method; flagged, not rebuilt)

| Version | Traces to | Verdict |
|---|---|---|
| v1 "Drawn, then delivered" | ⟦S1303⟧ H3 photographic fold; ⟦S1321⟧ motion values; DrawSVG | **FLAG** — the signature move (the photo's own traced lines draw, then the photograph develops under them) has **no bank reference**; it was designed from instinct. |
| v2 "From the brass to the room" | [BANK] S54 / Q154 scale-container-scrolltrigger (pinned window into a larger image, scrub 1) | Traceable. **FLAG (partial):** its headline weight/width scrub relied on Archivo's variable axes; under the brand's Bebas Neue (one weight) that layer goes inert. |
| v3 "The window" | [BANK] 95-masked-heading (imagery inside the glyphs, drifting with the mouse) + [BANK] 506 Smeulders image-filled project names | Traceable. Its weight lens on line 2 goes inert under Bebas (no axes). |
| all three | [BANK] Anatomy §1 F1 / checklist 1 | **FLAG** — licence is in the first screen (checklist 13 ✓) but the one-line proof strip (★4.8 · 343 Google reviews) is not. |

---

## 2. Sections × versions

### 2.1 `proof` — "Anyone can show you a finished photo." (field ground)
Facts: CBC1265280 (DBPR, verify link), 4.8 · 343 Google reviews, 104 municipalities = 34 + 31 + 39, 52 photographed projects, 30+ years combined experience. Support line verbatim: "What decides whether a South Florida project goes well is the unglamorous part."

| V | Reference | Mechanism copied + key values | Adaptation |
|---|---|---|---|
| 1 | [BANK] **Georgia Contractor Group** DEEP 2 "GCG at a glance" (CROWN) + [BANK] **P05 growing hairlines** (scaleY/scaleX variant) | Credential table as the proof unit: one scannable block of licences + credentials + recognition, each row checkable; rules draw as rows arrive (scrub-free here: scaleX 0→1, origin left, 1.1s power3.out per [BANK] smeulders line-grow) | Split layout: heading + support line left (5 cols), glance table right (7 cols): Licence / Rating / Service area / Portfolio / Experience. Value column in Bebas at figure size; a third "Check it" column links to DBPR and Google. Rows enter by Q40. Cursor `link` on checks. |
| 2 | [BANK] **KBF "The Ledger"** (F12 checkable proof with printed caveat) + [BANK] **Austin Pro** self-reconciling arithmetic (312 + 574 = 886) + [BANK] **S45 count-up / odometer** (Q279) | Proof as arithmetic that adds up on the page, printed with its caveat; digits roll in odometer cells (cell 1.2em, stagger .07s capped at 40% of duration, 2s easeOut cubic-bezier(.33,1,.68,1)) | Monumental centred equation **34 + 31 + 39 = 104** with county names under each addend (Miami-Dade, Broward, Palm Beach), then **4.8 · 343** on a second line. Caveat in small type: "Counted from the municipality lists Elbaz publishes. The licence is on the state register." Final numbers in HTML. |
| 3 | [BANK] **300 True Focus** (trust-phrase pattern) | Focus frame (corner brackets 16px, 3px) hops word-group to word-group: hold 1s, move .5s, unfocused at blur 5px; manual mode on hover | Full-bleed real photograph (`b-concrete-hero`) under a solid ink scrim; one large sentence of four credentials ("Licensed CBC1265280 · 4.8 on Google · 104 municipalities · 30+ years"); the bracket's focused credential shows its evidence line (issuer / source / link) under the sentence. |

### 2.2 `services` — "Kitchens. Bathrooms. Whole homes." (surface ground)
Facts: the firm's one-liners per service; construction durations (FAQ): bathroom 4–8 weeks, kitchen 6–12, whole-home "several months"; kitchen scope tiers Refit / Full remodel / Open-plan; the firm's line "We will not quote a kitchen before the layout and appliance schedule exist." No prices exist, so the PHS investment figure is replaced by the timeline figure only.

| V | Reference | Mechanism copied + key values | Adaptation |
|---|---|---|---|
| 1 | [BANK] **PHS Renovations** co-skeleton (CROWN): every service card carries its Investment + Timeline figure before any click; + [BANK] **Neil Kelly** service grid (real photo + one plain line) | Card = photo + one-line description + the duration figure + sub-services | Asymmetric trio (kitchen card 7 cols tall; bathroom + whole-home stacked in 5 cols); the figure **6–12 WEEKS** set in Bebas as the card's headline number with "of construction" under it; honest note line "Priced against drawings, not a guess." Hover: photo scale 1.04, 600ms ease-out. Q40 entrance. |
| 2 | [BANK] **Q162 K72 Marquee Hover** (Codrops, STRONG) | Full-width rows; entering a row from the top or bottom edge (closestEdge) wipes in a band carrying an already-scrolling marquee; band and inner wrap counter-translate (±101%) in one 0.6s `expo` tween so content reads as revealed, not slid; marquee is pure CSS 15s linear over 2× duplicated content | Three Bebas rows (KITCHENS / BATHROOMS / WHOLE HOMES) at ~9vw with the duration figure right-aligned; the band (deep teal) streams that service's sub-services and pill-cropped real photos. Phones/keyboard: tap/focus opens the band statically. |
| 3 | [BANK] **516 Tillberg** + tillberg-design code demo (scrub ladder) | Chapters: one service per full-bleed image chapter with a Discover link; depth from a ladder of scrub values {true, 1, .8, .75, .5}; headlines SplitText words stagger .1 (dim-to-bright variant from opacity .4); labelled custom cursor | Three 100vh chapters (`k-walnut-marble`, `b-black-marble`, `w-farmhouse`): photo layer scrub true (yPercent −8→8), title scrub .5, detail panel scrub 1; panel holds the one-liner + duration figure; cursor label "Book" over the chapter CTA. |

### 2.3 `ba` — "Same room. Different house." (ink ground)
The four genuine pairs only (`ba-kitchen4`, `ba-bath2`, `ba-kitchen1`, `ba-outdoor`), frames ≤1.4× native. The pairs are **not pixel-aligned**, so ⟦S1324⟧ is ruled out by its own requirement (Playbook 3 clash note).

| V | Reference | Mechanism copied + key values | Adaptation |
|---|---|---|---|
| 1 | [BANK] **Elbaz** draggable before/afters (keyboard-accessible) + [BANK] **CMK** custom CSS slider + [BANK] **Austin Pro** banding on every pair (anatomy §7 "strongest form") | Drag the divider → after wipes over before in proportion; `role="slider"` keys; each pair carries a band | The band is the published construction duration for the room type (kitchen 6–12 weeks, bathroom 4–8 weeks), not a price (none published). Pair tabs switch pairs. This is the page's one signature interactive. Cursor `drag-x`. |
| 2 | [BANK] **361 horizontalLoop** (GreenSock pen xxQaRoX, CROWN) | Seamless loop at speed 2 = 200px/s, two tweens per item, `center:true`, `.active` via `onChange`, others `brightness(0.7)`, `next()/previous()/toIndex()` | Each tile is one pair: inactive tiles show the before; the centred active tile crossfades to the after (0.6s) and its caption swaps. Step buttons; autoplay gated by reduced motion (the pen has none); drag dropped. |
| 3 | [BANK] **Q38 SVG Mask Transitions** (horizontal blinds) | 30 slits, stagger 0.02, scrub 2.0–2.5 (≈1 on phones), `shape-rendering: crispEdges` | Four stacked full-width frames; as each frame crosses the viewport its 30 blind slits open from the before to the after. Caption + "Before / After" state label per frame. |

### 2.4 `process` — "Eight stages, and you always know which one you are in." (ink ground)
The firm's 8 stages with week marks (Consultation Week 1 … Permitting Weeks 6–12 … Quality Review final 1–2 weeks … Closeout) and the caveat "Timelines vary by scope and jurisdiction." Copy limited to the firm's one line per stage (no explainer).

| V | Reference | Mechanism copied + key values | Adaptation |
|---|---|---|---|
| 1 | [BANK] **Anatomy §7 timed process (Elbaz)** + [BANK] **Neil Kelly** published phase timelines | Process told as calendar time; durations are the proof | A week-axis chart (Weeks 1–12 + "varies" + closeout): eight bars at their published ranges, construction as an open-ended bar, bars grow scaleX on entry (.8s power3.out, .07 stagger); hover/focus a bar → its line shows. |
| 2 | ⟦S1325⟧ **scroll-progress-timeline** | Semantic `<ol>`, one rail from first to last dot centre, fill `scaleY` = normalized scroll, steps activate as the head passes, reversible; left rail on phones | Sticky chapter title left ("Eight stages…"), the ordered rail right with week tag + stage + line; active stage lifts to full ink. |
| 3 | [BANK] **scrolltrigger-horizontal-pagination** code demo (STRONG) | Pinned horizontal run of panels; fixed row of numbered dots (50px circles), the current one squared; `end` fixed so travel = scroll 1:1 | Eight stage panels (40vw) on the deep-teal field travel sideways; dots 01–08; panel = giant week mark + stage + line. Phones: no pin, native snap row. |

### 2.5 `financing` — "Prefer to pay monthly?" (surface ground)
Facts (/financing/ wording, marked USED): Synchrony (Project Card, revolving; special financing 6–132 months as Synchrony publishes), Service Finance Company (fixed installment loan; first payment 30 days after installation), Ygrene and Renew Financial (Florida PACE); "Elbaz Construction is not a lender and does not approve, decline or fund applications."; PACE "generally not" for a kitchen.

| V | Reference | Mechanism copied + key values | Adaptation |
|---|---|---|---|
| 1 | [BANK] **314 Pricing Tables** (Codrops, CROWN) + [BANK] **Anatomy F10** (Elbaz: named lenders as a section) | `.pricing > .pricing__item` with title / features / price slot / action in flex columns, wrapping and centring on narrow screens | Three columns: Synchrony · Service Finance · PACE (Ygrene, Renew Financial). The price slot holds the published term ("6–132 months", "first payment 30 days after installation", "up to 20 years"); a "fits" line per column (kitchens and bathrooms / roofs, windows, outdoor). Footnote: not a lender. |
| 2 | [BANK] **Anatomy §4 TruGreen problem-picker** (pick → recommendation in under 2 minutes) | One-tap choices → a recommendation card | "What are you financing?" chips: Kitchen · Bathroom · Roof, windows or outdoor · Whole home → the card names the routes that apply and quotes the firm's eligibility line; `aria-live` region. |
| 3 | ⟦S1327⟧ **scroll-scrubbed-word-reveal** | Words from opacity .12 / blur 6px / .14em drop to full, span 160% of viewport, TreeWalker split, accessible copy kept | The firm's honesty paragraph read word by word ("Elbaz Construction is not a lender…"), the lender names as emphasis that keep their styling; one compact lender line beneath. |

### 2.6 `work` — "Real projects, photographed as delivered." (ink ground)
Twelve FACTS projects; "52 completed projects. Every image is our own work." (checklist 11); link to the projects page.

| V | Reference | Mechanism copied + key values | Adaptation |
|---|---|---|---|
| 1 | [BANK] **321 AKLR** filter pills WITH counts + [BANK] **FEATURED / FULL** switch (Jesper Landberg) + [BANK] **P80 Flip grid** | Counts on every filter prove depth before a click; curated set first, full record one tap away; layout changes animate with Flip (.3s Material curve (.4,0,.2,1)) | Filters Kitchens / Bathrooms / Whole home / Outdoor with real counts of the photographs in this file; FEATURED (12) / FULL (all project photographs held here) + "See all 52 projects" to the live page. Click opens the shared Flip viewer. |
| 2 | [BANK] **94-sticky-grid-scroll** code demo (Codrops) | 3-column photo grid pours in from above/below, then zooms ×2.05 while outer columns split sideways and the middle column splits up/down around a centred title, which then receives its description + button; labelled overlaps ("-=0.6", "-=0.32") | Twelve photos in three columns around "52 completed projects"; the opened grid leaves the heading, the count line and "See all 52 projects". Phones: no pin, a 2-column grid. |
| 3 | [BANK] **506 Smeulders** + smeulders code demo | Fullscreen project carousel with `1 / 6` counter and prev/next; outgoing image power2.in .7s, incoming power3.out 1.1s; caption words y 24 → 0, .85s, stagger .06; line ornaments scaleX 0→1 1.1s | Six projects fullscreen; title in Bebas (not image-filled, to keep the hero's trick unique), category + "an Elbaz project"; keys ←/→, swipe on phones. |

### 2.7 `reviews` — "4.8 from 343 Google reviews." (surface ground)
Aggregate-led. Verbatim quotes only (FACTS), attributed name + "Google review" + relative date as published.

| V | Reference | Mechanism copied + key values | Adaptation |
|---|---|---|---|
| 1 | **Reviews "Constellation"** (BANK-MAP usage log: KEPT on the sibling build) via ⟦S0687⟧ canvas FX family (constellation) + ⟦S1323⟧ distance-based pointer emission rules for the hover scatter | Points drift as a linked starfield, then assemble into the rating figure | **343 points, one per review**, assemble into "4.8" (glyph sampled from Bebas); lines between near neighbours fade as they lock; the pointer scatters nearby points (radius 90); three short verbatim quotes under it. Reduced motion: assembled still. |
| 2 | [BANK] **Georgia Contractor Group** dated, named, platform-tagged testimonials linking to originals + [BANK] **Anatomy §5 / F6 / F13** (live dated feed, tagged by project type, names the operative) | Feed, not slider; each review tagged by project type and dated; operative named | Sticky aggregate left (4.8 · 343 · Google); right: a feed of the verbatim reviews, each tagged by the project its text names (Kitchen, Bathroom, ADU, Windows, Roofing, Outdoor), the operative's name highlighted (Asher, Sean, Ashley), relative date, "Read on Google". Tag chips filter. |
| 3 | [BANK] **Q161 GSAP seamless marquee** (CROWN, "review trains") + [BANK] **Stronghold** marquee token | `horizontalLoop` helper lifted whole: xPercent conversion, two tweens per item, distance ÷ pixelsPerSecond, fonts.ready before measure, immediateRender false on the wrap tween | Two review trains running in opposite directions (~60 px/s, Stronghold's calm marquee pace), hover/focus pauses, offscreen pauses; the aggregate sits between the trains. |

### 2.8 `towns` — "Do you build in my town?" (ink ground)
104 municipalities (34 / 31 / 39). Answer copy from the firm's FAQ promise. Map geometry from the US Census (county outlines + incorporated-place points) — public record, not invented.

| V | Reference | Mechanism copied + key values | Adaptation |
|---|---|---|---|
| 1 | [BANK] **562 Lagom** locations accordion (code demo) + [BANK] **KBF** place-first index with counts | Location rows run a 15s linear `--progress` fill that auto-advances to the next row and tweens the map camera to it; hovering a row reverses its fill over .5s power2.inOut | Three county rows (count in Bebas), each opening its municipality list; an SVG map of the three counties whose viewBox flies to the open county with its municipality points lit. |
| 2 | [BANK] **Anatomy §1 F3 / §4** lowest-friction first field (System Pavers zip-first, Hippo local answer) + ⟦S1128⟧ areaServed | One input as the entry; the answer arrives without a form | A single oversized town field ("Type your town") with ≤4 suggestions and a live answer: "Yes. {Town} is in {County} County. We build there." / not found → call line. |
| 3 | [BANK] **P70 proximity variable-font** (Q171) | Letters swell with pointer proximity: gaussian falloff, damping smoothing 0.2 (`1−exp(−Δt/80)`), Δt clamp 64ms; idle wave period 3.2s after 500ms idle | All 104 names in three county columns set in Geist variable, weight 300→800 by proximity (radius 120); county headings filter; find field for keyboard; phones: county accordions. |

### 2.9 `consult` — "Let's talk about what you want to change." (field ground)
Published fields: Full name*, Phone*, Email*, Address*, Project description*, Preferred contact (Phone / Email / Text), consent (verbatim). No server: submit validates, then opens a `mailto:` to Sales@elbazconstruction.com, stated before sending. Promise: "usually the same or next working day".

| V | Reference | Mechanism copied + key values | Adaptation |
|---|---|---|---|
| 1 | [BANK] **317 Digital Butlers** quote-form blueprint (proof band → one-tap radios → time promise) + [BANK] **348 Circular Progress Button** + [BANK] **310 Text Input Effects** | Label after input (sibling selectors drive the label); pill 250×70 → 70px circle, ring r 32.5 stroke 5 drawing with real progress, tick/cross drawn; one-tap radio rows | Split close: phone number as the largest type on the field left; form right with the published fields and Preferred contact as one-tap radios; a proof band (4.8 · 343 · CBC1265280) above the form; ring colour = brand teal. |
| 2 | [BANK] **iper** code demo (sticky quote button + multi-step overlay, `01/06` counter, short step 1, time promise on the form) | Overlay one step at a time with a counter; step 1 asks contact only | Section is a statement + "Book a consultation" button that opens a 4-step overlay (01/04): contact → address → project → contact method + consent; the firm's promise printed on step 1. |
| 3 | [BANK] **Q413 Tequila** conversational form (form as a sentence + response promise) | The form reads as a sentence with inline fields | "Hi Elbaz, I'm ___. I'd like to talk about my ___ at ___. Reach me on ___ or ___, by ___." with inline inputs/selects sized to content; consent below; the promise line. |

---

## 3. Build order and checks
proof → services → ba → process → financing → work → reviews → towns → consult (one at a time, solo; commit after each with all three versions and the switch verified). Each: `build.py --only <id>` + shots at 1440×900 and 375×812 per version, reduced motion, Daylight; console clean. Then the full single file, all versions switching, the usage log in `bank-index/BANK-MAP.md`, delivery report.
