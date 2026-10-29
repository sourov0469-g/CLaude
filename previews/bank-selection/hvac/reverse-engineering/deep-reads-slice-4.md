# DEEP READS — SLICE 4 (33 entries, queue 171–279)
Assembled by Lane 4 lead, 26 Oct 2026, from three worker parts (A: 171–203 · B: 204–254 · C: 255–279). Each part keeps its own method header; entry blocks are in queue order. Library-ready parameter sets are noted inside entries — Lane 1 merges them into the shared libraries.

**Slice tally: 32 of 33 entries deep-read · 1 unresolved, nothing fabricated.** (VERDE was resolved by the lead after assembly — see its block; the count below reflects the final state.)
- Full source-level reads: 30 (incl. all Codrops mechanism tutorials, React Bits components from their public registry source, CodePen pens, live sites Eleos / Built Kindly / UZIK / Mara Züst / Thomas Duval / dhero.studio / VERDE)
- Design-level reads, honestly labelled: 172 Eco-Luxury Lawn Care (Behance showcase-only, no live site), 173 Maison TALI (Webflow IX2 timings not measurable under card discipline)
- Unresolved: 174 Shotline only (Behance template — project exists, no gallery/preview URL surfaced in 4 routes). 222 VERDE was resolved post-assembly by the lead (live-browser Siteinspire search → verde.io → full source read; routes 6–7 in its block) and counts in the full reads above.
- Blocked: 0

**Tooling flags for Lane 1 (found independently by Parts A and C, disclosed in their headers):** (1) `fetch_and_mine.sh` resolves directory-relative asset paths against the origin root — Codrops demo-subpath assets download as 1441-byte 404 stubs and their `values-raw.txt` tallies are bogus zeros; workers re-fetched correct same-host subpath URLs manually and appended ROUTE NOTEs. The script needs path-aware resolution. (2) Its shared `/tmp/mine_*.txt` aggregates race across parallel lanes (one Part B values-raw was contaminated by a concurrent run; re-mined from the site's own assets and disclosed in-file). All parameters in this slice were mined from each slug's own local files.
**Card volume: zero permission-card incidents across all three parts.**

---
# Deep Reads — Slice 4, Part A (queue 171–203, 11 entries)

Worker: Lane 4 helper (slice 4 part A) · Date: 26 Oct 2026
Standard: full source-level treatment per deep-read-queue.md. Evidence labels: **Measured** (read in downloaded source) / **Derived** (computed from source values) / **Inferred** (structure implies it) / **Seen** (rendered/listing text only).
Method note: first contact per host via text-fetch (browser.open), then `code-source/fetch_and_mine.sh`. Two tooling faults found and repaired in-run: (1) the miner resolves relative asset URLs against the origin root, so all Codrops *demo-subpath* assets 404'd — they were re-fetched at their correct subpath URLs (same host) and mined locally; the affected `values-raw.txt` files carry a ROUTE-LOG line and their aggregate counts are stale — the values below come from the local files. (2) The miner's shared `/tmp` aggregates raced with parallel lanes, so all parameter mining below was done directly on each slug's own downloaded files.
Extracts: `code-source/<slug>/` per entry. Card volume: **zero permission cards** — one host per site, no cross-host assets fetched (Webflow CDN bundles skipped and mined around via inline code, see 178/173).

---

## 171 · Variable Proximity — https://reactbits.dev/text-animations/variable-proximity

- **Source:** React Bits (David Haz). URL resolved by navigation: reactbits.dev homepage → Text Animations index → component page (opened). Full source pulled from the documented registry endpoint `https://reactbits.dev/r/VariableProximity-JS-CSS` (shadcn/jsrepo registry JSON, 14.7 KB, saved as `code-source/variable-proximity/registry-JS-CSS.json`). TS and Tailwind variants exist; JS-CSS variant mined.
- **Stack (Measured):** React (client component, `forwardRef`), no animation library — hand-rolled rAF loop. Font: **Roboto Flex** variable font, Google Fonts axis range `opsz,wght@8..144,100..1000`. CSS is trivial (font-family + sr-only utility); all behaviour is JS writing `font-variation-settings` per letter.
- **Mechanism (step-by-step):**
  1. The label string is split into words (`[data-word]` wrappers) and per-letter spans, each with a ref. An accessible sr-only copy carries the plain text.
  2. Line-start detection: on layout, it temporarily resets every letter to the *from* settings, measures each word's `getBoundingClientRect().top`, and records a new line when top jumps > 2 px (ResizeObserver on the parent + `document.fonts.ready` re-measure).
  3. Pointer tracking is global: `mousemove` / `touchmove` (passive) store pointer x/y; `mouseleave` on documentElement, `touchend/cancel`, and capture-phase `scroll` mark/schedule updates.
  4. Per frame (`tick`), for each letter: distance = hypot(pointer, letter centre); `strengthAt(distance, radius, falloff)` → target level 0..1.
  5. Falloff curves (exact): **linear** `1 − d/r`; **exponential** `(1 − d/r)²`; **gaussian** `(exp(−2·(d/r)²) − e⁻²) / (1 − e⁻²)`, hard 0 at d ≥ radius.
  6. Each axis in the from/to settings strings is linearly interpolated: `value = from + (to − from) × level`, then written as `font-variation-settings` — but only when the composed string actually changed (write-cache per letter).
  7. Smoothing is frame-rate independent exponential damping: `ease = 1 − exp(−Δt / (smoothing × 400))`, Δt clamped to 64 ms; snap when |target − level| < 0.002. The rAF loop **stops entirely** when nothing is settling and no wave is active (zero idle cost).
  8. Optional colour: `color-mix(in oklab, restColor (1−level)%, nearColor)` per letter. Optional transform: `translateY(−lift × level em) scale(1 + (scale−1) × level)`.
  9. **idleWave** (touch/idle fallback): after 500 ms with no letter near the pointer, a wave mixes in over ~600 ms (`waveMix` damped with `1 − exp(−Δt/600)`); wave phase = `((anchor.x + anchor.y × 0.6) / span − t / 3.2) × 2π`, amplitude `0.7 × ((1 + cos phase)/2)^2.2`, span = `max(220, textWidth × 0.85)`. Wave is disabled when `prefers-reduced-motion: reduce` matches, and paused off-screen via IntersectionObserver.
- **Exact parameters (Measured defaults):** from `"'wght' 400, 'opsz' 9"` → to `"'wght' 1000, 'opsz' 40"`; `radius = 50` (px); `falloff = 'linear'`; `smoothing = 0.2`; `scale = 1`; `lift = 0`; `idleWave = false`; WAVE_PERIOD 3.2 s; WAVE_PEAK 0.7; GAUSSIAN_EDGE = e⁻² ≈ 0.1353.
- **Rebuild notes:** Framework-agnostic: split headline into letter spans (keep an sr-only full-text copy), load any variable font with ≥2 axes (Roboto Flex free; wght+opsz is the demo pairing, wdth works too), cache letter centres on resize, one rAF loop with exponential damping as above. Vanilla-JS port is ~120 lines; no GSAP needed. In Elementor: one Custom HTML widget + a Google Fonts variable-font link; letters must be spans, so paste the headline as pre-split HTML (or split with 5 lines of JS). Keep radius ≈ 0.8–1.2× font-size for headlines; 50 px default suits body-size text — scale radius up for display type.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Proximity falloff trio: linear `1−d/r`, exponential `(1−d/r)²`, gaussian `(e^(−2(d/r)²) − e⁻²)/(1−e⁻²)`, cutoff d ≥ r.
  - [animation-parameter-library] Frame-independent damping: `level += (target − level) × (1 − exp(−Δt/(smoothing×400)))`, smoothing 0.2, snap ε 0.002, Δt clamp 64 ms.
  - [animation-parameter-library] Idle wave: period 3.2 s, peak 0.7, phase `(x + 0.6y)/span − t/T`, shape `((1+cos)/2)^2.2`, span `max(220, 0.85 × width)`, engage after 500 ms idle, mix time-constant 600 ms.
  - [ui-ux-patterns] Reduced-motion + off-screen + zero-idle-cost guards as standard practice for pointer-reactive type.
- **Evidence:** Measured (full component source). L2 log values (wght 400→1000, opsz 9→40, radius 50, falloff trio, idleWave) all confirmed exactly.

## 172 · Eco-Luxury Lawn Care Landing Page for Modern Homes — https://www.behance.net/gallery/250826767/Eco-Luxury-Lawn-Care-Landing-Page-for-Modern-Homes

- **Source:** Behance project page, opened in full. Author: Web Tixa / "Webtixa" (WordPress designer). **No live site is linked from the project** — this is a design-only showcase entry; the deep read is a design/mechanism analysis of the showcase itself, labelled as such.
- **Stack (Seen, author-stated):** WordPress build (author: "professional WordPress web designer"; L2 verified WordPress + Elementor Pro native from the project boards). No code exists to mine — Behance boards are images; no parameters are measurable.
- **Mechanism / page architecture (Seen on boards, cross-checked against project text + L2 pass):**
  1. **Split-screen hero:** left = serif display headline + dual CTA (primary quote/service CTA + secondary), right = full-bleed lawn/robot-mower photography; stat row under hero.
  2. Trusted-by strip → 4 value-prop cards (eco/organic, robotic smart maintenance, premium finish, reliability) → services/feature grid incl. an eCommerce-style product showcase grid (robotic devices as products) → **process section with numbered steps (01/02/05 — numbering slip visible on the board, noted at L2)** → **pricing tiers $120 / $299** ("Interactive Pricing" per author) → testimonials/reviews → final CTA.
  3. Conversion logic: luxury cues (serif type, cream ground, gold accents, whitespace) wrapped around a standard home-service conversion skeleton — the same hero → proof → services → process → pricing → reviews → CTA order used in trade landing pages, re-skinned "eco-luxury".
- **Exact parameters (Seen):** palette: deep luxury green **#004D40** (author-stated shade) + soft cream background + gold accent (L2). Pricing anchors visible: **$120 and $299** tiers. No motion parameters exist (static boards; any animation would be Elementor defaults — not claimed).
- **Rebuild notes:** Directly buildable in Elementor Pro (the author's own stack): split hero (50/50 columns, serif display font e.g. Prata/Playfair class, cream #F7F3EA-style ground — Derived from boards), deep green #004D40 primary, gold hairlines/accents. Section order above is the template. For a real lawn-care client: keep the pricing-tier block and process numbering (fix the 01/02/05 slip), replace the product grid with a before/after gallery.
- **Library-ready parameter sets:**
  - [ui-ux-patterns] Eco-luxury trade palette: deep green #004D40 + cream + gold accent; serif display + clean sans body.
  - [ui-ux-patterns] Trade landing skeleton order: split hero (headline + dual CTA + stats) → trusted-by → 4 value props → services grid → numbered process → pricing tiers ($120/$299 anchors) → testimonials → CTA.
- **Evidence:** Seen (showcase boards + author text). Showcase-only entry — no live URL, no code; routes: Behance project opened (route 1); no live link present on the project (route 2 — project text read in full).

## 173 · Photographer and visual artist portfolio website (Maison TALI) — https://www.maisontali.com/

- **Source:** Queue name is generic; Lane 1's L2 log identifies the entry as the **Maison TALI** portfolio (Behance → live). Live URL confirmed by exact-name search → maisontali.com, homepage opened (full text). Artist: Tali Kazimirov-Berauer, ocean photographer (PX3 Bronze).
- **Stack (Measured from `code-source/maison-tali/index.html`):** **Webflow** (data-wf-site/page/domain attributes; `cdn.prod.website-files.com` CSS `maison-tali.webflow.shared.*.css`; Webflow JS in `webflow.schunk.*` chunks + jQuery 3.5.1 from Webflow's cloudfront). Fonts via WebFont Loader: **Inter** (regular–900 + italic), **Prata** (serif display), **Mea Culpa** (script accent). 13 `data-w-id` interaction hooks in the homepage HTML = Webflow IX2 interactions; **no GSAP, no Lenis, no custom inline animation code** (0 inline occurrences). Per card discipline the Webflow CDN bundles were not fetched, so IX2 trigger/timing definitions are **not measured** — only their count and placement hooks are.
- **Mechanism / structure (Seen + Measured hooks):** Single-page gallery-rhythm portfolio: rotating hero statements ("Ocean inspired art to heal your space" / "Visual therapy for quiet living" / "Created to quiet the noise…") → "Explore the Portfolio — Three visual worlds, one shared essence" (3 collection worlds as the nav-equivalent) → About (portrait, PX3 Bronze credential, first-person narrative, READ MORE) → "Where My Art Belongs" — an offer block in 3 columns: *What I offer* (photographic art), *Ideal for* (hotels, wellness centres/spas, cruise ships, private jets, yachts, corporate spaces, design apartments, institutions), *Formats* (framed/unframed prints, murals, large-scale licensed files, custom series) → contact close with form success/error states.
- **Exact parameters:** Webflow IX2: 13 data-w-id elements (homepage). Type system: Inter 400–900, Prata regular, Mea Culpa regular. No easing/duration values are extractable without the cross-host JS (not fetched — card discipline; stated honestly).
- **Rebuild notes:** The transferable pattern is IA, not motion: (1) three rotating value statements as hero instead of one headline; (2) portfolio organised as a small number of named "worlds" (3), not a grid dump; (3) the venue-fit block ("Where my art belongs": offer / ideal-for venue list / formats) — a B2B licensing pitch embedded in an artist portfolio; directly reusable for any photographer/artisan selling into hospitality. In WordPress: Webflow-equivalent build is trivial (Elementor + any fade/slide reveal); IX2 interactions here are standard reveals (Inferred from hooks + L2 "gallery rhythm" note).
- **Library-ready parameter sets:**
  - [ui-ux-patterns] "Where my art belongs" 3-column offer block: What I offer / Ideal for (venue list) / Formats — licensing-pitch pattern for visual artists.
  - [ui-ux-patterns] Three-worlds portfolio taxonomy + rotating 3-statement hero for single-artist sites.
  - [ui-ux-patterns] Type trio: Inter (UI/body) + Prata (display serif) + Mea Culpa (script accent) — wellness/luxury pairing.
- **Evidence:** Stack Measured (homepage HTML attributes + script references); structure/content Seen; IX2 timings not measured (cross-host bundles skipped per card discipline).
...[truncated 15321 chars]
## 174 · Shotline - Photography Website Template / Web UI Kit — UNRESOLVED (live URL)

- **Source:** Behance (per queue). **Routes tried (≥3, logged):** (1) exact-title web search → Behance search/listing pages only, confirming the project exists: "Shotline - Photography Website Template | Web UI Kit" by **Sobakhul Munir Siroj**, sold from US$49, 3 appreciations, ~37–40 views; (2) opened the Behance "framer template" project listing — Shotline listed, but the text extraction exposes no per-project link; (3) Behance project-search URL for "shotline" → HTTP 403 from the fetch service (not retried, per access-denial instruction); (4) author-name web search → same listing pages, no gallery URL, no Framer preview URL surfaced. **No URL was guessed.** Status: UNRESOLVED this pass — the Behance gallery URL and the Framer live preview that L2 accessed were not reachable through the routes available here.
- **Stack:** Framer template (per listing + L2). No code accessible → nothing measured.
- **Mechanism / architecture (Derived — carried from Lane 1's L2 inspection of the live Framer preview, not re-verified here):** the fullest template page architecture in its L2 chunk: hero with animated counters → services → 5-step process → work gallery → trusted-by strip → **"Other vs Me" comparison table** → achievements → testimonials → journal → FAQ → closing CTA. Framer-native motion (scroll reveals) per platform.
- **Exact parameters:** none measurable this pass. L2 recorded the structure only.
- **Rebuild notes:** Even unresolved, the IA is the harvest (per L2): for a photography (or any trade) template, the section order above — especially the **Other-vs-Me comparison table** between work and testimonials — is the transferable asset; rebuild in Framer/Elementor with counters in the hero stat band.
- **Library-ready parameter sets:**
  - [ui-ux-patterns] Template IA: counters hero → services → 5-step process → work → trusted-by → Other-vs-Me comparison table → achievements → testimonials → journal → FAQ → close.
- **Evidence:** Seen (Behance listing metadata) + Derived (L2 log). Blocked/unresolved with routes logged — do not treat as inspected code.

## 178 · Eleos — https://eleos.la/

- **Source:** Land-book listing (agency/Webflow filter) → L2 resolved the live site as eleos.la; homepage opened. Eleos is an LA affordable-housing development firm — the closest Land-book entry to construction in the queue.
- **Stack (Measured from the 720 KB `code-source/eleos/index.html` — the page carries its full custom code inline):** **Webflow** (data-wf-site, site CSS `eleosla.webflow.shared.*.css` on the Webflow CDN) **+ GSAP 3.15.0 served from Webflow's own GSAP CDN** (`cdn.prod.website-files.com/gsap/3.15.0/`: core, Observer, CustomEase, ScrollTrigger, DrawSVGPlugin, SplitText — all registered inline) + **Lenis 1.3.23** (unpkg, deferred) + jQuery 3.5.1 (Webflow runtime). GSAP plugin *scripts* are cross-host and were skipped per card discipline, but every call site is inline in the HTML, so parameters below are Measured, not inferred.
- **Mechanism (step-by-step, from inline init functions):**
  1. **Smooth scroll:** `new Lenis({ lerp: 0.1, autoRaf: false })`, driven by `gsap.ticker.add((time) => …)` and bridged with `lenis.on('scroll', ScrollTrigger.update)` — the canonical GSAP+Lenis wiring. A **second Lenis instance** runs inside modals (`wrapper: modalScroll, content: firstElementChild, autoRaf: true, lerp: 0.1`), and the main instance's modal-prevent hook is present (commented variant in code) — scroll containers are isolated per context.
  2. **Page loader (DrawSVG signature):** loader SVG paths start `drawSVG: '0% 100%'` with loader texts parked at `yPercent: 110`; timeline draws paths in — `from drawSVG: 0, duration: 1, ease: 'power2.out', stagger: { each: 0.08, from: 'start' }` — then wipes them out — `to drawSVG: '100% 100%', duration: 0.8, ease: 'power2.in', stagger: { each: 0.08 }` — while the loader texts reveal. The loader's own ease is a bespoke CustomEase `'loaderSVG'` (below).
  3. **Image reveal system:** overlay columns over images (`image-reveal__col`) tween `yPercent: 0 → −100, duration: 0.8, ease: 'eleos', stagger: { each: 0.06, from: 'start' }`, ScrollTrigger `start: 'top 85%', once: true` — column-shutter reveals fired once at 85% viewport.
  4. **Footer parallax:** scrubbed timeline per `[data-footer-parallax]` block, `start: 'clamp(top bottom)', end: 'clamp(top top)', scrub: true`, animating the inner/dark layers at different rates.
  5. Supporting systems (init list in code): advanced form validation, copy-to-clipboard, underline link animations, modal scroll management — the page is a Webflow shell with a hand-written GSAP interaction layer on top.
- **Exact parameters (Measured):** GSAP **3.15.0**; Lenis **1.3.23**, `lerp: 0.1` (both instances); CustomEase **`'eleos'` = cubic-bezier(0.625, 0.05, 0, 1)** (the house ease, used across reveals); CustomEase **`'loaderSVG'` = (0.3589, 0.5033, 0, 0.9972)**; DrawSVG draw-in 1.0 s power2.out / wipe-out 0.8 s power2.in, stagger each 0.08; image-reveal 0.8 s, stagger each 0.06, trigger top 85%, once; inline duration palette across the page: 0.15 / 0.2 / 0.25 / 0.4 / 0.5 / 0.7 / 0.725 / 0.8 / 1 / 1.2 s; eases used: power1/2/3 in+out + 'eleos' + linear.
- **Rebuild notes:** This is the reference pattern for "Webflow (or Elementor) shell + hand-coded GSAP layer": register the same plugin set, define ONE house CustomEase and reuse it everywhere (the consistency is the design), Lenis at lerp 0.1 on the GSAP ticker with ScrollTrigger.update bridge, loader = DrawSVG path draw + wipe (needs an SVG logo/line mark with real paths), reveals = column shutters at top 85%/once. In Elementor the same architecture works with the GSAP + Lenis scripts enqueued and sections given matching data attributes. Note Webflow now hosts GSAP 3.15.0 on its CDN — version pinning is free there.
- **Library-ready parameter sets:**
  - [animation-parameter-library] House-ease discipline: CustomEase 'eleos' (0.625, 0.05, 0, 1) as the single site-wide ease; loader ease (0.3589, 0.5033, 0, 0.9972).
  - [animation-parameter-library] DrawSVG loader: draw 1.0 s power2.out stagger 0.08 → wipe ('100% 100%') 0.8 s power2.in stagger 0.08; texts from yPercent 110.
  - [animation-parameter-library] Column-shutter image reveal: yPercent −100, 0.8 s, stagger each 0.06, ST start 'top 85%', once: true.
  - [animation-parameter-library] Lenis dual-instance pattern: page lerp 0.1 autoRaf:false on gsap.ticker + modal instance lerp 0.1 autoRaf:true; `lenis.on('scroll', ScrollTrigger.update)`.
  - [ui-ux-patterns] Footer parallax with clamp() start/end + scrub (clamp guards against overshoot on short pages).
- **Evidence:** Measured (inline source). L2's "giant wordmark over photography + mission statements (Webflow — structure only)" understates it: the live build is a full custom GSAP layer — upgraded here on source evidence.

## 196 · Collapsing Logo Effect — https://tympanus.net/Development/CollapsingLogo/ (article: https://tympanus.net/codrops/2018/06/05/collapsing-logo-effect/)

- **Source:** Codrops article (opened; confirms anime.js + CSS grid/variables, recreation of PracticalVR's intro) → demo URL extracted from the article HTML → demo mined (`code-source/collapsing-logo/`: index.html + js/demo.js + css/base.css re-fetched at correct subpath after the miner's origin-root 404s — see header note).
- **Stack (Measured):** anime.js (local `js/anime.min.js`), vanilla ES6 class (`Panel`), CSS custom properties + grid. No GSAP. Font: Inconsolata (base.css @import).
- **Mechanism (step-by-step):**
  1. The intro overlay contains a small `.intro__box` (the future logo). On load the box is **pre-scaled to fill the viewport**: `transform: scaleX(winW/boxRect.width) scaleY(winH/boxRect.height)` — the "fullscreen intro" is just the logo box stretched; its background/contents stretch with it.
  2. All other intro elements (`.animatable`, shuffled into random order at init) start translated/opaque-0 off their final spots.
  3. **Close (click "enter"):** box animates scaleX → 1 in **300 ms easeOutQuad**, then scaleY → 1 in **700 ms easeOutExpo delayed 300 ms** (X first, then Y — the signature two-axis collapse, total ~1 s). Simultaneously: animatable elements exit fast (150 ms easeOutQuad, translateX −30%, opacity 0); the logo arrow icon does a two-part move — translateY −400% (300 ms easeOutQuad) then [200% → 0%] (700 ms easeOutExpo) **plus rotation [90 → 0] over 1300 ms easeOutElastic**; behind it, the slideshow images settle from scale 1.5 → 1 and wrappers translateY 10% → 0 (1000 ms, easeOutCubic, delay i×60).
  4. **Open (click the collapsed logo):** mirror image — scaleX out 700 ms easeOutExpo (delay 300), scaleY out 300 ms easeOutQuad; animatables return over 1200 ms easeOutExpo with delay `350 + i×30` and a fast linear 400 ms opacity track; arrow repeats its −400% → [200%→0%] hop (200/700 ms, no rotation).
  5. Guards: `isAnimating` lock on both directions; `pointerEvents` toggled on the intro; on resize (debounced 10 ms) the open state recomputes the stretch scales from a fresh `getBoundingClientRect()`.
- **Exact parameters (Measured):** collapse: scaleX 300 ms easeOutQuad → scaleY 700 ms easeOutExpo @ delay 300; expand: scaleX 700 ms easeOutExpo @ delay 300 → scaleY 300 ms easeOutQuad; content return 1200 ms easeOutExpo, delay 350 + i·30, opacity 400 ms linear; content exit 150 ms easeOutQuad, x −30%; icon hop −400% (200–300 ms easeOutQuad) → 200%→0% (700 ms easeOutExpo); icon spin 90→0, 1300 ms easeOutElastic; slideshow settle 1000 ms easeOutCubic, stagger i·60, scale 1.5→1, y 10%→0%; resize debounce 10 ms.
- **Rebuild notes:** Needs only: one overlay, one box element whose final size/position = the site logo, anime.js (or GSAP with the same numbers — easings map 1:1: easeOutQuad ≈ power2.out, easeOutExpo ≈ expo.out, easeOutCubic ≈ power3.out, easeOutElastic ≈ elastic.out(1, 0.5)-class). The trick to copy exactly: compute scale factors from the box's own rect at load and on resize; animate X and Y on *different* durations/delays — the asymmetry is the whole effect. As a page transition: run close() on "enter"/link click, navigate, run open() reversed on the next page's intro. In Elementor: fixed header logo as the box + a fullscreen intro section; ~80 lines of JS.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Two-axis logo collapse: X 300 ms easeOutQuad, then Y 700 ms easeOutExpo (delay 300); reverse on expand (X 700 easeOutExpo delay 300, Y 300 easeOutQuad).
  - [animation-parameter-library] Icon hop + elastic spin: translateY −400% (300 easeOutQuad) → [200%→0%] (700 easeOutExpo); rotate 90→0 over 1300 ms easeOutElastic.
  - [animation-parameter-library] Content choreography values: return 1200 ms / delay 350+i·30; exit 150 ms; backdrop settle scale 1.5→1, 1000 ms easeOutCubic, i·60.
  - [ui-ux-patterns] Fullscreen-intro = pre-scaled logo box (scale from measured rect, recompute on debounced resize) — intro/loader pattern with zero extra markup.
- **Evidence:** Measured (demo.js read in full; article prose agrees).

## 197 · Decorative Letter Animations — https://tympanus.net/Development/DecorativeLetterAnimations/ (article: https://tympanus.net/codrops/2018/01/10/decorative-letter-animations/)

- **Source:** Codrops article (opened — it prints the API and one full show() config) → demo URL from article HTML → mined (`code-source/decorative-letter-animations/`: wordFx.js + inline demo script in index.html + base.css).
- **Stack (Measured):** anime.js + **Charming** (letter splitter) + a hand-written `Word` class (wordFx.js, MIT). One fullscreen SVG overlay per word; fonts vary per demo word (Montserrat et al. via base.css).
- **Mechanism (step-by-step):**
  1. `new Word(el, options)`: creates ONE SVG sized to the viewport (`width/height = winsize`, viewBox `0 0 W H`), inserted before the word (or after, if `shapesOnTop: true`); Charming splits the word into per-letter spans.
  2. Per letter, a `Letter` records its `getBoundingClientRect()` and spawns **`totalShapes` (default 10)** SVG shapes of random type (circle / rect / polygon), positioned *from the letter's own rect*: circle r = 0.5 × letterWidth at the letter centre; rect w/h = random(0.05–0.5) × letter w/h, centred; polygon = triangle across the rect (bottom-left, top-mid offset by width, bottom-right). Each shape gets a random colour from the palette and `transform-origin` at the letter centre; all start opacity 0.
  3. `word.show(config)` / `word.hide(config)`: letters animate with `lettersAnimationOpts` (anime.js targets = letter spans); shapes animate per letter via a `setTimeout` offset equal to the letter's own delay function, so each letter's shape burst is synchronised to its letter tween. On hide-complete, letter transforms are reset to `none`.
  4. Resize (debounce 20 ms): letters re-measure, shapes reconfigure to the new rects, SVG resizes.
  5. The demo cycles 5 words as a slideshow, each with its own effect config (two mined verbatim below; the article's canonical config is the third data point).
- **Exact parameters (Measured):**
  - Defaults: totalShapes **10**/letter; shapeTypes [circle, rect, polygon]; palette ['#e07272', '#0805b5', '#49c6ff', '#8bc34a', '#1e1e21', '#e24e81', '#e0cd24']; shapeFill true; shapeStrokeWidth 1.
  - Article canonical show(): letters — duration **400**, delay **i×60**, **easeInExpo**, opacity [0,1], scale [0,1]; shapes — duration **700**, delay **i×40**, **easeOutExpo**, translateX [0, random(−20,20)], translateY [0, random(−400,400)], scale [random(0.2–0.6)²], rotate [0, random(−16,16)], opacity keyframes [{1, 1 ms linear}, {0, 700 ms easeOutQuad}].
  - Demo Effect 1 show: letters 800 ms, delay i×40, easeOutElastic, translateY [100%→0%]; shapes 300 ms, delay i×30+100, easeOutQuad, translateY [random(−15,15) → random(−200,200)], scale [0.2 → random(0.5–1)], opacity flash 1 ms then fade 200 ms. Hide: letters 800 ms easeOutExpo, translateY [0%→100%], opacity sub-tween 100 ms linear.
  - Demo Effect 2 (stroke circles only, fill false, strokeWidth 3, colour #0671e6): show letters 800 ms easeOutElastic with **centre-out delay |total/2 − i|×60**, translateY [50%→0%]; shapes 700 ms easeOutExpo delay i×60, translate ±random(−100,100) both axes, scale [random(0.1–0.3) → random(0.5–0.8)], opacity out 700 ms easeOutQuad @ delay 100. Hide shapes: 300 ms, translateY −random(400–800) (shapes fly up), scale fixed 0.3.
- **Rebuild notes:** Port = ~200 lines: split headline (Charming or 3-line manual splitter), one absolutely-positioned SVG overlay, per-letter shape generation from measured rects, anime.js (or GSAP: same keyframe/opacity trick — a 1 ms "pop to 1" then a long fade). Shape counts are the perf knob: 10/letter is for short words; cap total shapes ≈ 120. Works for hero word reveals and section-title moments on service sites (e.g. the word "Roofing" bursting shapes on scroll into view — trigger show() with IntersectionObserver). Randoms must be re-rolled per run (functions, not values) or every letter bursts identically.
- **Library-ready parameter sets:**
  - [3d-and-svg-library] Per-letter SVG shape burst generator: shapes from letter rect (circle r=0.5w; rect 0.05–0.5×w/h; triangle polygon), transform-origin at letter centre, 10 shapes/letter default.
  - [animation-parameter-library] Canonical burst config: letters 400 ms / i×60 / easeInExpo / scale+opacity [0→1]; shapes 700 ms / i×40 / easeOutExpo / y random(−400,400) / x random(−20,20) / rotate ±16° / opacity 1 ms-pop → 700 ms easeOutQuad fade.
  - [animation-parameter-library] Centre-out stagger variant: delay |total/2 − i| × 60 with easeOutElastic 800 ms.
  - [animation-parameter-library] Stroke-only variant: fill none, strokeWidth 3, single colour, shapes fly up −random(400–800) px on hide.
- **Evidence:** Measured (wordFx.js + demo inline script + article config, three-way agreement).

## 198 · Grid Layout with Motion Hover Effect and Content Preview — https://tympanus.net/Development/GridLayoutMotion/ (article: https://tympanus.net/codrops/2018/05/23/grid-layout-with-motion-hover/)

- **Source:** Codrops Playground article (opened; CSS Grid + TweenMax + imagesLoaded, inspired by Brian Roettinger's WORDS IMAGE SOUND) → demo URL from article HTML → mined (`code-source/grid-layout-motion/`: js/demo.js read in full, css/base.css).
- **Stack (Measured):** TweenMax (GSAP 1.x-era API), imagesLoaded, CSS Grid layout, vanilla classes (`Item`, `Overlay`, `Grid`). Each grid "box" is a stack of absolutely-positioned layers: `.box__img`, `.box__title`, `.box__text`, `.box__deco`, `.box__shadow`, `.box__content`.
- **Mechanism (step-by-step):**
  1. **Layered tilt on hover:** mousemove (rAF-throttled, with a 40 ms "enter" arming delay so passing glances don't trigger) maps the pointer's position *within the item* linearly onto per-layer translation/rotation ranges. Each layer has its own range — image (−10,−10), title (+20,+10), text (+20,+50, rotZ −20), deco (−20,0, rotZ 3), shadow (+30,+20, rotZ −2, special reverse), content (+5,+3) — numbers are ± ranges (a scalar n becomes [−n, n]). Every layer tweens with **TweenMax 1.5 s Power1.easeOut** to the mapped transform, so layers chase the pointer at different amplitudes = parallax depth without WebGL.
  2. **Mouseleave reverse:** all layers tween back to 0 over **1.5 s Power2.easeOut** (shadow layer: its own reverseAnimation, 2 s Back.easeOut).
  3. **Click → preview:** a full-width `.overlay__reveal` panel sweeps in (x −100%→0%, **0.5 s Power1.easeInOut**), body scroll locks (`preview-open`), then the panel sweeps out to −100% (0.5 s Power3.easeOut, delay 0.2) as the chosen item's layers fly into their preview positions: each element's duration is **distance-mapped 0.8–1.2 s** via a linear equation over viewport width, delay 0.2, Expo.easeOut, from startAt offsets also distance-mapped (x up to 800 px, y ±100 px, rotZ 5–30°).
  4. **Grid "explode":** simultaneously every *other* grid item's layers fly outward — direction by vertical third (above centre → up-left, below → down-left, middle band → hard left with y jitter ±25), distance mapped **20–600/700 px** by horizontal distance from the right edge, duration **0.4 s Power3.easeOut**, delay mapped 0–0.3 s, rotZ random ±10°, opacity → 0.
  5. **Close:** revealer sweeps back (0.5 s Power3.easeOut ×2 with direction flip), grid layers restore over **0.6 s Expo.easeOut** with delay 0.55 + distance-mapped 0–0.2 s, opacity → 1; tilt re-enabled.
- **Exact parameters (Measured):** tilt tween 1.5 s Power1.easeOut; reverse 1.5 s Power2.easeOut (shadow 2 s Back.easeOut); per-layer ranges: img t(−10,−10) · title t(20,10) · text t(20,50) r(z,−20) · deco t(−20,0) r(z,3) · shadow t(30,20) r(z,−2) · content t(5,3) [px, x/y]; enter-arming delay 40 ms; revealer 0.5 s Power1.easeInOut in / 0.5 s Power3.easeOut out @ 0.2; preview item fly-in duration lineEq(0.8→1.2 s across viewport width), Expo.easeOut; explode 0.4 s Power3.easeOut, delay 0–0.3 mapped, offsets 20–600 px (700 middle band), rotZ ±10 random; restore 0.6 s Expo.easeOut @ 0.55 + 0–0.2 mapped.
- **Rebuild notes:** The whole effect is one idea to steal: **a shared pointer→range mapper (`lineEq`) driving per-layer TweenMax/GSAP tweens**. Modern port: GSAP 3, `quickTo` per layer for the tilt (the 1.5 s Power1 chase becomes quickTo duration 1.5 ease 'power1'), CSS Grid for the boxes, and a fixed overlay for the preview. Keep layer counts ≤ 6/item and items ≤ 12 for perf; disable tilt on touch (the demo has no touch path — add `(hover: hover)` gating). For service galleries: box layers = photo, title, "view project" text, deco frame, shadow — click opens the project preview overlay with the same revealer sweep.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Layered pointer-tilt recipe: ranges img(−10,−10) / title(20,10) / text(20,50, rotZ−20) / deco(−20,0, rotZ 3) / shadow(30,20, rotZ−2) / content(5,3); chase 1.5 s power1.out; reverse 1.5 s power2.out (shadow 2 s back.out).
  - [animation-parameter-library] Distance-mapped durations via linear equation (lineEq): preview fly-in 0.8–1.2 s across viewport width; explode delay 0–0.3 s; restore delay 0.55 + 0–0.2 s.
  - [ui-ux-patterns] Revealer-sweep preview overlay: panel 0.5 s power1.inOut in → content swap under cover → 0.5 s power3.out out; grid explode 0.4 s power3.out with position-based directions.
- **Evidence:** Measured (demo.js read in full).

## 200 · On-Scroll Text Motion — https://tympanus.net/Development/ScrollTextMotion/

- **Source:** Codrops demo (direct live demo URL from the bank's codrops fragment; demo opened/mined — `code-source/scroll-text-motion/`: js/index.js read in full, css/base.css, index.html). Note: the live demo is the **current, modernised build** of the entry (GSAP Club-plugin era) — the mechanism below is what the URL serves today; L2's "GSAP scroll word-streams" describes the same concept in this updated form.
- **Stack (Measured):** GSAP core + **ScrollTrigger, ScrollSmoother, Flip, ScrambleTextPlugin** (Club plugins, local copies in the demo's js/ folder); Typekit fonts: 'lores-12' (display) + 'forma-djr-mono' (mono body); black page, white text. Cross-host Typekit CSS skipped per discipline (font names read from base.css).
- **Mechanism (step-by-step):**
  1. **Smooth scroll:** `ScrollSmoother.create({ smooth: 1, normalizeScroll: true })` — 1 s smoothing, normalised wheel/touch.
  2. **Two-pass Flip word-stream:** the page is a long scroll of giant text elements (`.el`, up to `clamp(2rem, 20vw, 15rem)`), each carrying a layout-position class `pos-N` and a `data-alt-pos` target class. For each element: swap to the alt class, capture `Flip.getState(el, { props: 'opacity, filter, width' })`, swap back, then run **two scrubbed Flip animations forming a there-and-back loop**: `Flip.to` with ScrollTrigger `start: 'clamp(bottom bottom-=10%)'`, `end: 'clamp(center center)'`, `scrub: true`; then `Flip.from` with `start: 'clamp(center center)'`, `end: 'clamp(top top)'`, `scrub: true`. Ease per element from `data-flip-ease`, default **`expo.inOut`**. Net effect: as you scroll, each text block flies from its home position to an alternate layout position and back, continuously (position + opacity + blur/filter + width all FLIP-interpolated).
  3. **Scramble on pass-through:** every `.el` gets a ScrollTrigger (`start: 'top bottom'`, `end: 'bottom top'`) whose onEnter **and** onEnterBack fire a ScrambleText re-type of the element's own text: `chars: 'upperAndLowerCase'`, duration from `data-scramble-duration` or **1 s** default, from an empty scramble state. The logo scrambles once on load with `revealDelay: 0.5`.
  4. **Related-demos footer interaction:** entering the footer zone (`start: 'top center+=25%'`) fades the logo out (0.7 s expo) and staggers the related-demo cards in from `xPercent: 100, scale: 0, opacity: 0` (0.7 s expo, stagger 0.1); leaving back reverses (logo 0.5 s power3.in; cards out 0.5 s power3.in, stagger 0.05).
  5. **Resize:** full re-init — ScrollTrigger.refresh(true) + rebuild all Flip and Scramble triggers (positions are layout-dependent).
- **Exact parameters (Measured):** ScrollSmoother smooth **1**, normalizeScroll true; Flip props 'opacity, filter, width'; scrub ranges [bottom bottom−10% → center center] and [center center → top top], both `clamp()`-wrapped; default flip ease **expo.inOut** (per-element override via data attribute); scramble chars 'upperAndLowerCase', duration **1 s** default, logo revealDelay **0.5 s**; footer logo fade 0.7 expo out / 0.5 power3.in in; cards 0.7 expo stagger 0.1 in / 0.5 power3.in stagger 0.05 out; type scale clamp(2rem, 20vw, 15rem) 'lores-12', secondary clamp(2rem, 10vw, 4rem).
- **Rebuild notes:** Single-file portable (L2's judgement confirmed): one HTML with GSAP + ScrollSmoother + Flip + ScrambleText (Club plugins — note licensing: Club GSAP is now free via npm since the Webflow acquisition, but verify current terms before shipping commercially) and a set of absolutely-classed text blocks. The pattern to reuse on a service site: a giant word stream ("ROOFING — REPAIRS — REPLACEMENTS") whose words swap grid positions and re-scramble as they pass the viewport centre. Keep word count modest (≈10–14 `.el` blocks in the demo); Flip with filter interpolation is GPU-heavy on low-end phones — drop `filter` from props for production.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Two-pass scrubbed Flip loop: to [start clamp(bottom bottom-=10%), end clamp(center center)] + from [start clamp(center center), end clamp(top top)], scrub: true, ease expo.inOut, props 'opacity, filter, width'.
  - [animation-parameter-library] ScrambleText pass-through: ST top bottom → bottom top, onEnter + onEnterBack re-fire, chars 'upperAndLowerCase', duration 1, from empty state.
  - [animation-parameter-library] ScrollSmoother baseline: smooth 1, normalizeScroll: true.
  - [ui-ux-patterns] Footer takeover: logo fade 0.7 expo + card stagger-in (xPercent 100, scale 0 → 1, 0.7 expo, stagger 0.1) at 'top center+=25%'.
- **Evidence:** Measured (index.js + base.css read in full).

## 201 · Product Grid Layout — http://tympanus.net/Blueprints/ProductGridLayout/ (article: https://tympanus.net/codrops/2013/05/17/product-grid-layout/)

- **Source:** Codrops Blueprint article (opened — full HTML/CSS printed in the article) → demo URL extracted from the article HTML → mined (`code-source/product-grid-layout/`: js/cbpShop.min.js, css/component.css, css/default.css).
- **Stack (Measured):** Pure CSS 3D transforms + a 4 KB vanilla-JS class toggler (`cbpShop` v1.0.0, MIT) + Modernizr (touch detection only). No animation library — **all motion is CSS transitions**.
- **Mechanism (step-by-step):**
  1. Grid item = `.cbp-pgitem` with `perspective: 1000px` (−webkit 1400px) containing `.cbp-pgitem-flip` (`transform-style: preserve-3d`, `transition: transform .4s ease-out`, `backface-visibility: hidden`) with two faces: front product image and back image pre-rotated `rotateY(180deg)`.
  2. Clicking the "Rotate Item" control toggles class `cbp-pgitem-showback` (+ `data-open` state) → the flip container rotates 180° over **0.4 s ease-out**, showing the product's back/alternate view. JS does nothing but toggle classes/state — the same handler is bound to `touchstart` on touch devices (Modernizr.touch branch).
  3. Option bar under each item: Compare / Favorite toggles; **Size and Colour selectors open tooltip popovers** listing the other values (XL/L/M/S; colour swatches c1–c4) — pure CSS reveal driven by a `cbp-pgoption-active` class toggled by the same JS; cart button completes the row.
  4. Layout: float grid, items 33% wide → **48% under 68.125 em** → single-column under **46.125 em** (media queries in component.css); info block under each card with product name + price ($29 in the demo data).
- **Exact parameters (Measured):** flip transition **transform .4s ease-out**; perspective **1000px** (1400px −webkit prefix); back face rotateY(180deg); breakpoints **68.125em** (≈1090 px) → 2-up 48%, **46.125em** (≈738 px) → 1-up; JS: class toggles only, touch via touchstart when Modernizr.touch.
- **Rebuild notes:** The most directly shippable entry in this part: in Elementor/WooCommerce, a product/service card with front (photo) and back (photo + key specs) faces, a rotate toggle, and CSS-only 0.4 s flip; option tooltips map to variant pickers. Zero JS libraries, zero jank risk, works on every phone — for trade sites the "back face" is where guarantees/certifications/price-from go. Keep perspective ≈ 1000px and duration ≤ 0.45 s; longer flips feel broken.
- **Library-ready parameter sets:**
  - [ui-ux-patterns] CSS-only product flip card: perspective 1000px, preserve-3d, backface hidden, transition transform .4s ease-out, back face rotateY(180deg), class-toggle JS (click + touchstart).
  - [ui-ux-patterns] Card option bar with CSS tooltip variant pickers (size/colour) + compare/favourite toggles.
  - [ui-ux-patterns] 2013-but-sound responsive grid breakpoints: 33% → 48% @68.125em → 100% @46.125em.
- **Evidence:** Measured (cbpShop.min.js + component.css read; article HTML agrees).

## 203 · Built Kindly — https://builtkindly.com/

- **Source:** GSAP Showcase → live domain recorded in the bank's components fragment ("live site opened and verified" at L1); homepage opened (full text). Studio site: "Digital products built with humans in mind" — a kindness-led digital-products agency.
- **Stack (Measured from `code-source/built-kindly/`: index.html 72 KB + 15 same-host bundles, 732 KB):** **Nuxt/Vue** (hashed chunk names + `_payload.json`) + **GSAP 3.13.0** (version string in bundles) with ScrollTrigger (22 config mentions across bundles; main app chunk `CUF3ZWrq.js`), SplitText, Flip, DrawSVG, ScrollSmoother references in the shared GSAP chunk, **CustomEase** with a house ease named **`snappy`**, and **Lenis** (lenis ×18, `lerp: .15`). CSS: 4 KB, `cubic-bezier(.19,1,.22,1)` ×4 (= easeOutExpo as CSS). No Three/WebGL. Fonts not in CSS extract (loaded via Nuxt head — not measured).
- **Mechanism (step-by-step, from the main chunk + values):**
  1. **Motion-effects toggle (the L2-verified signature):** a user-facing "Toggle motion effects" control sets a persistent `motion` flag in the app state; animation initialisation branches on it (and the code also checks `prefers-reduced-motion: reduce`). Motion is a *user-controlled, persisted* feature, not just a media query.
  2. **Time-aware greeting:** the header/hero greeting is computed from the visitor's local hour — bundle contains the three strings "Good Morning!" / "Good Afternoon!" / "Good Evening!".
  3. **Scroll system:** Lenis smooth scroll (lerp 0.15) + ScrollTrigger reveals; explicit trigger configs include `start: "top bottom"` / `end: "bottom top"` (fade-through sections) and a pinned/anchored pattern with `start: "top 5%"`, `end: "bottom bottom-=1%"`. Menu overlay timeline: container fades in while `.js-fade` items come from `x: "-3rem", alpha: 0` with **stagger .075, ease "expo"**, at position 0.25; header behaviour switches at scroll y > 50.
  4. **House easing/duration language:** CustomEase `snappy` (path below); duration palette 1.25 (×5) / 1 / 0.2 / 1.35 / 0.5 / 0.35 / 0.25 / 3 / 1.5; stagger palette .1 (×7) / .075 / .025 / .0175 (and −.0175 reverse); eases dominated by expo (×10) + linear + power1, with power3.inOut / power4 / expo.inOut accents.
  5. **Page architecture (Seen on the opened homepage):** hero ("Digital products built with humans in mind") → manifesto line with inline SVG word-art ("We fuse kind design ⧠ with thoughtful tech ⧠…") → "What do we build, and how does kindness shape it?" explainer (the "Anatomy of Kind Design" structure L2 flagged) → own-product features (Time Being time-tracking) → work index. The explainer-first structure *is* the conversion device: the agency sells a named, diagrammed methodology.
- **Exact parameters (Measured):** GSAP **3.13.0**; **CustomEase 'snappy' = `M0,0 C0.094,0.026 0.124,0.127 0.157,0.29 0.197,0.486 0.254,0.8 0.348,0.884 0.42,0.949 0.374,1 1,1`** (a slow-in / snap-through / long-settle curve); Lenis lerp **0.15**; CSS cubic-bezier(.19,1,.22,1); menu items from x −3rem, alpha 0, stagger **.075**, ease expo; header switch threshold **y > 50**; ST starts 'top bottom' / 'top 5%', ends 'bottom top' / 'bottom bottom-=1%'; durations/staggers as above.
- **Rebuild notes:** Two transfers: (1) the **motion toggle** — a visible switch that sets a persisted flag gating all non-essential animation (plus prefers-reduced-motion respect) — a genuine accessibility feature a service site can advertise, ~20 lines around a `data-motion` attribute + GSAP global timeline pause/kill switch; (2) the **named-methodology explainer** ("Anatomy of Kind Design") as the page's centre of gravity instead of a services list. The Nuxt stack itself is not the transferable part; every animation value above ports to a single-file GSAP build or Elementor + custom JS.
- **Library-ready parameter sets:**
  - [animation-parameter-library] CustomEase 'snappy': `M0,0 C0.094,0.026 0.124,0.127 0.157,0.29 0.197,0.486 0.254,0.8 0.348,0.884 0.42,0.949 0.374,1 1,1`.
  - [animation-parameter-library] Studio-site motion palette: durations 1.25/1/0.35 workhorses; staggers .1 / .075 / .025 / .0175; Lenis lerp 0.15; menu reveal x −3rem + alpha, stagger .075, expo.
  - [ui-ux-patterns] User-facing motion-effects toggle with persisted flag + prefers-reduced-motion check (accessibility as a feature).
  - [ui-ux-patterns] Time-of-day greeting (Good Morning/Afternoon/Evening by local hour) as hero micro-personalisation.
  - [ui-ux-patterns] Named-methodology explainer section ("Anatomy of …") as agency conversion structure.
- **Evidence:** Measured (bundles mined locally; greeting/toggle/snappy read in the main chunk). Homepage content Seen.

---

## Part A summary

- **Completed: 11 / 11** — full source-level reads for 171, 178, 196, 197, 198, 200, 201, 203; design-level reads (no code exists) for 172 (showcase-only) and 173 (Webflow IX2 internals behind cross-host bundles — stack + hooks measured, timings honestly not measured); 174 is **UNRESOLVED** (live/gallery URL not surfaced after 3+ routes — see its block; its L2 structural harvest is carried, labelled Derived).
- **Blocked/unresolved:** only 174 (routes logged in-entry). Nothing else blocked; no route was abandoned for rate limits.
- **Top parameter finds:** React Bits Variable Proximity's complete falloff/damping/idle-wave maths (171); Eleos's house CustomEase (0.625, 0.05, 0, 1) + DrawSVG loader timings inside a Webflow+GSAP 3.15 build (178); Built Kindly's 'snappy' CustomEase path + motion-toggle pattern (203); Collapsing Logo's asymmetric two-axis collapse timings (196); GridLayoutMotion's lineEq distance-mapped durations (198); ScrollTextMotion's two-pass scrubbed Flip loop + scramble triggers (200).
- **Card volume: zero permission cards.** All first contacts via text-fetch; curl mining same-host only; cross-host bundles (Webflow CDN, Typekit) skipped and worked around via inline code.
- **Tooling flags for Lane 1:** (1) `fetch_and_mine.sh` resolves relative assets against the origin root — any demo living in a subpath gets 404 asset stubs (repaired manually here; the script needs path-aware resolution). (2) Its `/tmp/mine_*.txt` aggregates are shared across parallel lanes and race — values in several `values-raw.txt` files from parallel runs may be cross-contaminated; per-slug local mining (as done here) is the safe route.


---

# Deep Reads — Slice 4, Part B (11 entries)

Worker: Lane 4 helper (deep-read slice 4 part B). Date: 26 Oct 2026.
Method per entry: resolve real target from the source platform (never a guessed URL) → first contact via browser.open text-fetch → `code-source/fetch_and_mine.sh` on the same host → read `values-raw.txt` + key bundles/article code directly. Evidence labels: **Measured** (read in source/bundle/article code) · **Derived** (computed from measured values) · **Inferred** (reasoned, not directly read) · **Seen** (observed in fetched page content).
Source extracts live in `code-source/<slug>/` (index.html + same-host assets + values-raw.txt).
Permission cards: **zero incidents across Part B** — every curl mine ran only after a browser.open first contact on that host, one host per site, no asset-by-asset fetching.

---

## 204 · dhero.studio — https://dhero.studio

**Source.** Land-book entry; the entry name is the domain itself. Resolved URL confirmed live via browser.open (page content matches the L2 record: pricing tiers Launch 2–4wk from €8k / Sell 4–6wk €12k / Build 6–8wk €15k, project outcome percentages, 8 testimonials, "80+ launches since 2013"). Extracts: `code-source/dhero-studio/`.

**Stack (Measured).** Astro static build (BaseLayout.astro bundle in the JS). "WordPress" strings in the bundle are service-copy text, not a CMS signal. One same-host JS asset (28K) + one cross-host asset skipped by the miner (Cloudflare Turnstile). **Lenis smooth scroll bundled** (26 mentions) + **GSAP** (3 mentions — used for the hero rotator tweens, see below). No ScrollTrigger/Swiper/Slick in the bundle.

**Mechanism (step-by-step).**
1. Lenis drives all scrolling: instantiated manually and pumped by a hand-written rAF loop rather than GSAP's ticker.
2. A JS `prefers-reduced-motion` guard (`matchMedia('(prefers-reduced-motion: reduce)')`) gates the motion layer.
3. Hero headline word rotator: a `setInterval` swaps the rotating word; the old word tweens out (rise + fade + blur), the text node is swapped, the new word tweens in from below with a stronger starting blur that resolves to 0.
4. A generic `data-slider` initialiser is also present in the bundle (single occurrence — light slider wiring, not a named library).

**Exact parameters (Measured from the bundle).**
- Lenis: `new Lenis({ duration: 1.1, smoothWheel: true })`, manual `requestAnimationFrame` loop.
- Rotator cadence: `setInterval(..., 3200)` ms.
- Word OUT tween: `yPercent: -100, opacity: 0, filter: blur(12px), duration: 0.45, stagger: 0.04, ease: "sine.in"`.
- Word IN tween (fromTo): `yPercent: 100 → 0, opacity: 0 → 1, blur(20px) → blur(0), duration: 0.8, stagger: 0.05, ease: "sine.out"`.
- Note the asymmetry (Derived): exit is fast+sharp (0.45s, 12px blur), entry is slow+soft (0.8s, 20px blur) — the word "arrives through fog, leaves cleanly".

**Rebuild notes.** Single-HTML transfer is trivial: one Lenis CDN script + GSAP CDN + the rotator (~40 lines). In WordPress/Elementor: add Lenis via a code snippet, rotator as a custom HTML widget with the headline words in a data attribute; keep the reduced-motion guard. Blur-filter tweens are GPU-cheap at headline sizes only — do not reuse on body text.

**Library-ready parameter sets.**
- [animation-parameter-library] Lenis config: duration 1.1, smoothWheel true, manual rAF loop.
- [animation-parameter-library] Word-rotator pair: out 0.45s sine.in yPercent −100 blur 12px stagger 0.04 / in 0.8s sine.out yPercent 100→0 blur 20px→0 stagger 0.05, interval 3200ms.
- [ui-ux-patterns] Tiered offer ladder with time+price in the tier name itself (Launch 2–4wk €8k / Sell 4–6wk €12k / Build 6–8wk €15k) + outcome-% project cards (Seen).

**Evidence.** Stack + parameters: Measured (own bundle, `code-source/dhero-studio/`). Page content: Seen. ⚠️ Mining note: headline values were spot-verified inside this slug's own bundle (see the cross-run contamination note under 221).

---

## 216 · Mara Züst — https://www.marazuest.net

**Source.** Siteinspire entry "Mara Züst". Live URL resolved without guessing: the Mini Zine Library staff page names her site, and ZHdK (her institution) sources reference marazuest.net; browser.open confirmed the live site matches the L2 record (A–Z project archive + 11 category filters). Extracts: `code-source/mara-zuest/`.

**Stack (Measured).** Webpack-built frontend, build v3.2.0 (28-01-2025), jQuery + **Isotope** (26 mentions) for the archive grid. CSS 28K. No GSAP, no Lenis, no keyframe animation mined — motion is deliberately near-zero; the system is archival, not animated.

**Mechanism (step-by-step).**
1. The archive is one Isotope grid: `layoutMode: "masonry"`, `itemSelector` = the grid-item class.
2. Filter rows (A–Z index + 11 category filters) re-run Isotope filtering/layout — the "database feel" comes from filter algebra on a single flat dataset, not from pages.
3. Each project carries a thumbnail pair in the fetched markup: a black-and-white thumb under `/assets/projects/<slug>/thumb/_small/` and a colour version under `/assets/projects/<slug>/hover/_small/` — hover swaps B/W → colour (Seen in the page's image list; the swap itself is a CSS hover state).

**Exact parameters (Measured).** Isotope: layoutMode "masonry". Build stamp: frontend v3.2.0, 2025-01-28. No easing/duration values exist to mine — filtering is Isotope's default layout pass (Derived: any transition feel comes from Isotope defaults, not custom config).

**Rebuild notes.** The transferable idea is information architecture, not code: one flat project dataset + two orthogonal filter axes (alphabetical + category) + B/W→colour hover as the only "animation". In WordPress: a CPT + FacetWP/Filter Everything, or in a single HTML file: ~30 lines of JS toggling `display` on data-letter/data-category attributes reproduces 90% of it — Isotope's masonry is the only part worth a library. The B/W→colour hover pair costs one extra image per project and reads as "archive wakes up" — cheap, high-signal pattern for portfolio grids.

**Library-ready parameter sets.**
- [ui-ux-patterns] Dual-axis archive filter: A–Z index + category filter set over one flat grid (Isotope masonry, itemSelector = item class).
- [ui-ux-patterns] B/W thumb → colour hover image pair (`thumb/_small/` vs `hover/_small/` path convention).
- [animation-parameter-library] (negative result) Award-tier archival portfolio with zero animation libraries — restraint as the design system.

**Evidence.** Stack + Isotope config: Measured (`code-source/mara-zuest/`). Filter axes + hover pairs: Seen. URL resolution chain: documented above.

---

## 220 · Thomas Duval — https://thomasduval.fr

**Source.** Siteinspire entry "Thomas Duval" (French still-life photographer, b. 1967 Paris). URL resolved via search on the exact name + Artsper biography (which also records his work with UZIK, entry 221); browser.open confirmed the live portfolio. Extracts: `code-source/thomas-duval/` (13 asset files, 848K total).

**Stack (Measured).** WordPress + **Divi** (et-core-unified CSS, ETmodules icon font, et_pb modules) + **LightGallery** (lightgallery.min.js + lg-video plugin). Fonts: Abel + Cormorant Garamond. The bespoke layer is a custom `site.css` / `site.js` pair implementing a "tdGallery" lightbox system on top of the stock theme. Homepage HTML contains 1 `tel:` link (the L2-noted tap-to-call footer).

**Mechanism (step-by-step).**
1. Divi renders the portfolio grids/carousels with stock theme behaviour.
2. Clicking an image opens the custom tdGallery lightbox instead of the theme default: backdrop fades in, image zooms from a near-1 scale, controls (prev/next/close) pop in last with a stagger-like delay ladder.
3. Marquee rows run infinite `translateX` keyframe loops (tdGalleryLoop variants + a Dynamic variant whose distance is presumably set from content width — Inferred).
4. A reduced-motion override block kills all three lightbox animations outright (`animation: none !important` under `prefers-reduced-motion`, ×3 occurrences in the CSS).

**Exact parameters (Measured from site.css / site.js).**
- Lightbox backdrop: `tdGalleryLightboxFadeIn`, **0.50s ease-out**.
- Lightbox image: `tdGalleryLightboxZoomIn`, from `scale(0.985)`, **0.50s cubic-bezier(0.2, 0.75, 0.25, 1)**, delay **0.04s**.
- Lightbox controls: `tdGalleryLightboxControlIn`, from `scale(0.94)`, **0.28s ease-out**, delay **0.14s**.
- Lightbox image bounds: `max-width: calc(100vw − 72px)` (mobile variant −28px/−48px).
- Marquee keyframes: tdGalleryLoop1414 / 1534 / 1655 / 1677 / Dynamic (numbers read as pixel loop distances — Derived).
- Theme-stock values present in Divi's scripts.min.js, **not** bespoke: carousel `slide_duration: 500`, easyPieChart animate duration 1800 — labelled theme-stock so they are never mistaken for the photographer's own tuning.

**Rebuild notes.** The lesson is the layering: a stock WP theme does the layout, and ALL perceived craft lives in one small custom CSS/JS pair (~the lightbox choreography + marquees). Transfer to Elementor: keep Elementor's grid, replace its lightbox with a custom one using exactly this delay ladder (backdrop 0.50 / image 0.50 @ +0.04 / controls 0.28 @ +0.14) — the 0.10s gap between image-settle and controls-in is what makes it feel staged rather than simultaneous. The `scale(0.985)` start is the key subtlety: a 1.5% zoom reads as "focus pulling in", not as motion.

**Library-ready parameter sets.**
- [animation-parameter-library] Lightbox choreography ladder: fade 0.50s ease-out · zoom from scale 0.985, 0.50s cubic-bezier(0.2,0.75,0.25,1), delay 0.04s · controls from scale 0.94, 0.28s ease-out, delay 0.14s · reduced-motion: animation none !important on all three.
- [ui-ux-patterns] Stock-theme + thin bespoke layer: custom lightbox + marquee loops over Divi, fonts Abel + Cormorant Garamond.
- [3d-and-svg-library] (n/a — no 3D/SVG mechanism; nothing harvested rather than a forced entry.)

**Evidence.** All parameters Measured from the site's own `site.css`/`site.js` (`code-source/thomas-duval/`). Divi stock values explicitly labelled as such.

---

## 221 · UZIK — https://uzik.com

**Source.** Siteinspire entry "UZIK" (Paris digital agency). Live URL is the agency's own domain, confirmed via browser.open: 6 service lines, stat wall 32 employees / 48 awards / 25 years (Seen). Extracts: `code-source/uzik/`.

**Stack (Measured — see contamination note).** Next.js (webpack chunks: _app / framework / main / index). **No animation library at all**: GSAP, ScrollTrigger, framer-motion, three, Lenis, Swiper all measure **0** in UZIK's own bundles. The entire motion system is CSS transitions + keyframes driven by design tokens.

**Mechanism (step-by-step).**
1. Global motion tokens are declared once as CSS custom properties (duration + two cubic-beziers) and reused everywhere — one easing language for the whole site.
2. The service slideshow (the "/6 counter" carousel from L2) is a `.diapo` stack: slides absolutely stacked at opacity 0, the `.is-visible` slide transitions to opacity 1 — a pure crossfade, no sliding.
3. Auto-advance is visualised by a `storyPagerProgress` keyframe bar (linear, infinite) whose duration IS the slide dwell time.
4. A scroll indicator loops a 2.2s ease-in-out keyframe; a search loader loops at 2s on the house bezier.

**Exact parameters (Measured from UZIK's own bundles).**
- Tokens: `--transition-duration: 300ms`; `--transition-cubic-bezier: cubic-bezier(0.86, 0.1, 0.14, 0.9)`; `--transition-menu:` same bezier; `--transition-diapo: cubic-bezier(0.25, 0.1, 0.25, 1)`.
- `.diapo` item: `transition: opacity 0.4s var(--transition-diapo)`; `.is-visible { opacity: 1 }`.
- `@keyframes storyPagerProgress`: **5s linear infinite** (→ slide dwell = 5s, Derived).
- `@keyframes scrollIndicator`: **2.2s ease-in-out infinite**.
- `searchLoader`: **2s var(--transition-cubic-bezier) infinite**.
- Menu transitions: 0.4s / 0.3s with 0.25s delays on the house bezier.

**Rebuild notes.** The most transferable entry in this slice for Asiful's stack: the whole system is CSS custom properties + class toggles, so it drops into Elementor/a single HTML file verbatim. The discipline to copy: (a) ONE aggressive house bezier (0.86,0.1,0.14,0.9 — a hard easeInOutQuint-like curve) for UI chrome, a gentler standard curve (0.25,0.1,0.25,1) reserved for content crossfades; (b) slideshow progress bar duration = dwell time, so timing lives in exactly one place.

**Library-ready parameter sets.**
- [animation-parameter-library] House-token system: duration 300ms · cubic-bezier(0.86,0.1,0.14,0.9) chrome · cubic-bezier(0.25,0.1,0.25,1) content.
- [animation-parameter-library] CSS crossfade slideshow: stacked opacity, 0.4s, progress bar 5s linear infinite = dwell.
- [ui-ux-patterns] Award-tier agency site (48 awards claimed) running zero JS animation libraries — CSS-token motion only.

**Evidence + ⚠️ CONTAMINATION INCIDENT (disclosed).** The first `values-raw.txt` produced for this slug was computed from ANOTHER lane's bundles: `fetch_and_mine.sh` stages JS through a shared `/tmp/mine_js.txt`, and a concurrent run overwrote it mid-mine. Detectable because the file claimed eases/shaders absent from UZIK's own assets. The values-raw was **re-mined from UZIK's own downloaded assets and overwritten, with the contamination disclosed in the file header**; every value above was verified inside `code-source/uzik/assets/` itself. (The other three Part B site mines — dhero, mara-zuest, thomas-duval — had their headline values independently verified inside their own bundles for the same reason.)

---

## 222 · VERDE — https://verde.io/ (Siteinspire) — RESOLVED by lead, routes 6–7

**Status history:** Part B left this UNRESOLVED after 5 routes (name/platform searches; Siteinspire search via text-fetch → HTTP 429, retry barred; Wayback CDX network failure; descriptive search → template noise only). **Route 6 (lead, live browser, read-only):** Siteinspire's own search for "verde" in the live browser — exactly one matching listing: "Verde", detail page siteinspire.com/website/3952-verde (itself returning 500, the known Siteinspire detail-page failure), whose result card's "Visit Verde website" href is **verde.io**; caption "Studio of Tudor Prisacariu"; thumbnail dark green/black with bright-green VERDE wordmark — an exact match for the L2 record. **Route 7 (lead):** browser.open first contact on verde.io (live; content matches L2's tag-labelled archive), then fetch_and_mine.sh → code-source/verde/. No URL was ever guessed — the domain came from the platform's own link.

- **Source:** Siteinspire listing 3952 · Studio of Tudor Prisăcariu, Bucharest (site copy: founded 2012, 80+ projects).
- **Stack (Measured):** Astro with view transitions enabled (astro-transition scopes in HTML); one JS bundle 762KB + CSS 104KB; HTML 64KB. Swiper present in CSS (501 refs) and JS (292) — the miner's library table doesn't count Swiper; read directly. **No GSAP, no Three.js, no Lenis** (all zero in source). Typeface: Calibre. Palette (Measured): near-black greens #000 / #111 / #222b21 + acid accent **#d4ff00**.
- **Sections (Seen, rendered fetch):** wordmark hero + one-line studio statement → Featured/Archive index of ~62 project rows, each tagged with its service set (Code / Design / Shop / Logo / Print / Photo — L2's "~50 projects, tag-labelled archive" confirmed and countable) → Studio section (bio, services, sectors) → contact (studio@verde.io). Single page; project detail views sit behind the rows.
- **Mechanism:** the archive is the interface. Each row carries an animated mini-thumbnail: `@keyframes animatedMiniThumbs` moves a 3-frame filmstrip by exactly **-33.333333%** (translateZ(0) → translate3d(-33.333333%,0,0)) for a seamless 3-frame loop. Pointer-follow behaviour runs on pointermove (×10) / mousemove (×4) handlers with CSS transitions supplying the smoothing — **0.2s transitions on transform + left/top/right**, i.e. the follower glide is a CSS transition, not a JS lerp. Page changes ride Astro View Transitions (astroFadeIn/Out, astroSlideFrom/ToLeft/Right keyframe family). Everything else is short and functional: 0.15s ease-in-out/linear UI states, 0.3s opacity, one 0.4s linear background-color. Hand-rolled rAF (×28) + IntersectionObserver (×2); mix-blend-mode (×9) and backdrop-filter (×3) supply the richness instead of WebGL.
- **Exact parameters:** animatedMiniThumbs −33.333333% (3-frame sprite loop) · follower transitions .2s transform/left/top/right · UI .15s ease-in-out · .3s opacity · .4s linear background-color · accent #d4ff00 on #222b21/#000 · Calibre throughout.
- **Reduced-motion (Measured):** one well-formed block — `@media (prefers-reduced-motion)` sets `animation:none !important` on all view-transition groups (old/new) and `[data-astro-transition-scope]`: the transition system fully disables itself for reduced-motion users.
- **Rebuild notes:** the most single-HTML-friendly deep in the slice. (1) Archive as a semantic list; each row = project name + tag chips. (2) Thumbnails as 3-frame filmstrips: a 300%-width strip inside an overflow-hidden thumb, animated by the −33.333% keyframe. (3) Cursor follower = absolutely-positioned preview whose left/top update on pointermove, smoothed by the 0.2s CSS transition — no JS animation loop needed for the glide. (4) Astro is incidental; a static page with simple fades replicates the feel. The 762KB bundle is mostly project data + Swiper for detail galleries — a trade-site version needs neither at that weight.
- **Library-ready parameter sets:** [ui-ux-patterns] tag-labelled archive index as the entire portfolio IA (row = project + service tags) · [animation-parameter-library] 3-frame filmstrip sprite loop (translate −33.333333%) · [animation-parameter-library] CSS-transition cursor follower (0.2s transform + left/top, no rAF lerp) · [ui-ux-patterns] reduced-motion kill-switch for view transitions (animation:none !important pattern).
- **Evidence labels:** stack / palette / keyframes / transitions / reduced-motion = Measured (code-source/verde/). Sections + project count = Seen (rendered fetch). Swiper's exact role (detail galleries) = Inferred from bundle placement.
---

## 243 · Creating a Smooth Horizontal Parallax Gallery: From DOM to WebGL (Codrops) — https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/

**Source.** Codrops tutorial article (19 Feb 2026), read in full via browser.open (2,517 lines) — the article's code blocks are the primary evidence; per the L2 protocol the demo bundles were not separately mined (article ships complete code). Stack stated in the article: Vite + TypeScript, three@^0.170.0, vite-plugin-glsl; gallery of 10 images; **no GSAP** — the scroll engine is hand-rolled.

**Mechanism (step-by-step).**
1. **Virtual horizontal scroll.** A wrapper (100vh/100vw, overflow hidden) holds a flex container (width: max-content). Wheel events feed a target: `scroll.target += e.deltaY` (passive listener). Each frame: target is clamped to `[0, limit]` where `limit = container.scrollWidth − wrapper.clientWidth`; `scroll.current = lerp(current, target, 0.07)`; the container is moved with `translateX(−current px)` in a rAF loop. The DOM never actually scrolls — the transform is the scroll.
2. **DOM parallax (phase 1).** Each media frame is `height: 60vh; aspect-ratio: 4/3; overflow: hidden`; the inner `<img>` is oversized: `width: 125%; left: −12.5%` (the buffer rule: `left = (width − 100) / 2`). Per frame, per image: `rect = parent.getBoundingClientRect()`; `elementCenter = rect.left + rect.width × 0.5`; `viewportCenter = vw × 0.5`; `t = clamp((elementCenter − viewportCenter) / viewportCenter, −1, 1)`; `shift = −t × MAX_SHIFT` (% of image width, counter-motion); `img.style.transform = translate3d(shift%, 0, 0)`. The safe ceiling is arithmetic, not taste: at 125% width the spare is 12.5% each side, and shift is a % of the 125%-wide image, so MAX_SHIFT must stay ≤ 12.5 / 125 = **10%**.
3. **WebGL sync (phase 2).** One fixed canvas; renderer antialias + alpha, pixelRatio `min(devicePixelRatio, 2)`. The camera is calibrated so **1 CSS px = 1 world unit**: `fov = 2 · atan(screenHeight / 2 / 100) · (180/π)`, camera z = 100, near 0.01, far 1000. All images share one `PlaneGeometry(1, 1, 32, 32)`. The DOM `<img>` elements stay in layout (opacity 0 in the WebGL demo) as the source of truth and the no-WebGL fallback. Each GLMedia reads `bounds = el.getBoundingClientRect()` and sets `mesh.scale.set(bounds.width, bounds.height, 1)`; position: `x = bounds.left − scroll − viewport.width/2 + bounds.width/2`, `y = −bounds.top + viewport.height/2 − bounds.height/2`. Texture is loaded from the DOM img's own `src`; `uImageResolution` is set when the texture loads.
4. **Shader parallax.** `coverUv()` reproduces `object-fit: cover` in GLSL: `ratio = vec2(min((res.x/res.y)/(img.x/img.y), 1.0), min((res.y/res.x)/(img.y/img.x), 1.0)); return uv × ratio + (1.0 − ratio) × 0.5`. Per frame, for visible elements only: `elementLeft = bounds.left − scroll`; `distance = (elementCenter − viewportCenter) / innerWidth`; `uParallax = distance × parallaxIntensity (0.4)`. Fragment order matters (preserve it): `uv = coverUv(...)` → `uv.x += uParallax × uShaderMultiplier` → recentre (`uv −= 0.5`) → `uv ×= uUvScale (0.85)` → `uv += 0.5` → sample. The 0.85 UV scale is the shader-side equivalent of the DOM 125% buffer: it pre-zooms the texture so the shift never exposes an edge.
5. **Tuning surface (lil-gui).** Three knobs only: parallaxIntensity 0.4 (range 0–1), uvScale 0.85 (range 0.7–1.0), shaderMultiplier 1.0 (range 0–2). Touch/drag support is an unimplemented exercise in the article (hints: touchstart/move/end + pointer events feeding `scroll.target`, add momentum) — on touch devices as shipped, the gallery is wheel-only (Measured from the article's own exercise section).

**Exact parameters (Measured from article code).** Lerp ease **0.07** · image width **125%**, left **−12.5%** · MAX_SHIFT **10** (guide: 4 subtle / 8 medium / 10 max-safe) · media height 60vh, aspect 4/3, container gap 2rem · pixelRatio cap 2 · camera z 100, fov = 2·atan(h/200) in degrees · plane segments 32×32 · uParallax intensity **0.4** (guide: 0.2 subtle / 0.4 used / 0.6 dramatic) · uUvScale **0.85** (0.9 subtler / 0.8 stronger) · uShaderMultiplier 1.0.

**Rebuild notes.** DOM phase alone (steps 1–2) is a complete, dependency-free pattern: ~80 lines of vanilla JS, transferable to a single HTML file or an Elementor HTML widget as-is — this is the version to bank for client work. The WebGL phase pays off only at dozens of images or when shader effects stack on top; its non-obvious core is the px=unit camera calibration + the `bounds − scroll` position formula — copy those two exactly and the rest is boilerplate Three.js. Keep the two buffer systems consistent (Derived): DOM buffer 125%/MAX_SHIFT 10 pairs with UV scale 0.85 at intensity 0.4; if you raise intensity toward 0.6, drop uUvScale toward 0.8 or edges will show.

**Library-ready parameter sets.**
- [3d-and-svg-library] DOM→WebGL sync: fov = 2·atan(h/2/100), z = 100 (1px = 1 unit); mesh position x = bounds.left − scroll − vw/2 + w/2, y = −bounds.top + vh/2 − h/2; coverUv() GLSL as above.
- [animation-parameter-library] Horizontal lerp scroll: ease 0.07, wheel target += deltaY, clamp [0, scrollWidth − clientWidth].
- [animation-parameter-library] Parallax buffer rule: img 125% @ left −12.5%, MAX_SHIFT 10% (= spare/image-width ceiling); shader equivalent uUvScale 0.85, intensity 0.4.

**Evidence.** All values Measured (article code read in full). Demo bundles not mined — article is the complete source (stated, not assumed).

---

## 245 · How to Build an Immersive 3D Circular Carousel in WordPress Using Droip (Codrops) — https://tympanus.net/codrops/2025/10/13/how-to-build-an-immersive-3d-circular-carousel-in-wordpress-using-droip/

**Source.** Codrops tutorial (13 Oct 2025), read in full via browser.open (425 lines) — a no-code build inside **Droip**, a WordPress page builder. ⚠️ The live demo (labs.droip.io) is DNS-dead (recorded at L2; not re-fetched — the article contains every setting verbatim, including the full per-card transform table).

**Stack (Measured).** WordPress + Droip visual builder. **Zero JavaScript libraries, zero custom code** — the entire effect is CSS 3D transforms (`preserve-3d`, `perspective`, `rotateY`/`translateZ`) plus Droip's interaction panel (page-load rotation + click toggles). Card structure: Wrapper (100%, 100vh) → Banner (100vw × 100vh, relative, z 1) → Container (100%, max-width 800px, margin auto, z 2) → "3D Transform" stage (absolute, z 100, preserve-3d, child perspective) → "3D Marquee" hub (435px wide, preserve-3d, rotateX −10°) → 12 cards, each Front Card (absolute, 100%, radius 20px, preserve-3d) → Card-3D → Popup (white, radius 20px; image radius 12px) + Backface (absolute inset 0, padding 12px, bg **#FEDEFF**, radius 20px, rotateY 180°, backface-visibility hidden).

**Mechanism (step-by-step).**
1. **Ring placement.** 12 cards at 30° steps. Each card gets `rotateY(angle)` then `translateZ(850px)` ("MoveZ" in Droip). Order is the whole trick: rotate first, then push out along the card's own forward axis — translate-then-rotate would orbit the offset instead of placing the card on the circumference.
2. **Stage depth.** The stage's child perspective is **9000px** — deliberately weak perspective (near-flat depth falloff) so back cards shrink only slightly; an optional stage scale of 0.8 shrinks the whole scene.
3. **Orbit.** A page-load interaction rotates the hub: **rotateX −10° (held), rotateY 0→360°, duration 30s, infinite loop**. The −10° X-tilt is baked into both the hub's static transform and the animation so the ring reads as a tilted hoop, not a flat turntable.
4. **Click zoom toggle.** Clicking the Banner targets the stage with a two-state toggle — Zoom In: **scale 2, moveY −250px**; Zoom Out: **scale 0.8, moveY 0**. Separate tablet variants exist because the desktop values overshoot smaller viewports: Zoom In (Tab): scale 1, moveY 0; Zoom Out (Tab): scale 0.4.
5. **Optional custom cursor.** 32×32px div (absolute, z 100) with an SVG shape inside, Droip "Cursor Trail" interaction, trigger scroll-into-view, scope viewport, **smoothing 75%**.

**Exact parameters (Measured from article).** Cards 12 × 30° · radius (MoveZ) **850px** · child perspective **9000px** · hub width **435px** (= card width) · hub rotateX **−10°** · orbit **30s linear-equivalent infinite** (Droip rotate action; easing not specified in the article — labelled unspecified, not assumed) · card radius 20px, image radius 12px, backface #FEDEFF padding 12px · zoom in scale **2** / moveY **−250**, zoom out scale **0.8**; tablet in 1 / out **0.4** · cursor 32×32, trail smoothing **75%** · container max-width 800px.

**Rebuild notes — WP/Elementor transfer (the point of this entry).** Droip is not Asiful's builder, but nothing here is Droip-proprietary: it is raw CSS 3D. In Elementor: one custom-CSS section — parent gets `perspective: 9000px` (or transform-style chain: every ancestor between stage and cards needs `transform-style: preserve-3d`, the step builders most often break); hub gets `transform-style: preserve-3d; animation: orbit 30s linear infinite` with keyframes `from rotateX(-10deg) rotateY(0)` → `to rotateX(-10deg) rotateY(360deg)`; cards positioned with `transform: rotateY(calc(var(--i) * 30deg)) translateZ(850px)`. Radius scales with card width (Derived: 850px at 435px card width ≈ 1.95× card width — keep that ratio when resizing). The click-zoom toggle is ~10 lines of JS toggling a class on the stage. Single-HTML: fully self-contained, no libraries. Mobile caution (Inferred from the values): 9000px perspective + 850px radius on a 375px screen will overflow — the article's own tablet zoom variants admit viewport sensitivity; a rebuild should add a breakpoint that cuts radius to ~60% and pauses the orbit under reduced-motion.

**Library-ready parameter sets.**
- [3d-and-svg-library] CSS 3D ring carousel: n=12, step 30°, translateZ 850px @ card 435px (ratio ≈1.95×), perspective 9000px, hub rotateX −10°, orbit 30s infinite.
- [animation-parameter-library] Click-zoom toggle pair: in scale 2 + moveY −250px / out scale 0.8 (tablet: in 1 / out 0.4).
- [ui-ux-patterns] Card backface pattern: rotateY 180°, backface-visibility hidden, tint #FEDEFF, padding 12px, radius matched to front (20px).

**Evidence.** All values Measured (article read in full, incl. the complete 12-card transform table). Demo not re-fetched: DNS-dead at L2 (route logged there); article is self-sufficient.

---

## 248 · Interlude: A Starter for Custom Page Transitions in Astro (Codrops) — https://tympanus.net/codrops/2026/10/07/interlude-astro-page-transitions/

**Source.** Codrops article (7 Oct 2026, Manoela Ilic) read in full via browser.open; the deployed starter demo (interlude.crnacura.workers.dev) was first-contacted via browser.open, then mined — extracts in `code-source/interlude-demo/` (ClientRouter + Interlude engine bundles on disk).

**Stack (Measured).** Astro with Astro's own `<ClientRouter />` (NOT Barba/Swup) + GSAP for animation; Three.js (TSL shaders) only for the WebGL transition family. Payload budget per page (article, Measured): router ≈ **5 kB**, engine ≈ **4 kB**, GSAP ≈ **28 kB**; Three.js ≈ **240 kB** loads **only** when a WebGL transition is about to be triggered. Demo bundle check: the mined Interlude engine bundle (93 kB uncompressed, incl. GSAP + the demo page's transitions) listens to `astro:before-preparation`, `astro:before-swap`, `astro:after-swap`, `astro:page-load` — the router-event contract below is confirmed in shipped code, not just prose.

**Mechanism (step-by-step).**
1. Astro's router does the navigation work: fetch next page, swap DOM, update history, restore scroll, announce to screen readers. Interlude adds only a persistent overlay layer + a controller on the router's events.
2. A transition is one file in `src/transitions/` exporting `defineTransition({ name, leave(ctx), enter(ctx) })`. `leave` covers the current page; the swap happens while covered; `enter` reveals the new page. A link opts in with `data-transition="slide-up"` (4 occurrences of the attribute in the demo engine bundle).
3. The engine's contract (the reusable core): lock the page while covered → wait for fonts + on-screen images → after swap, move focus to the new content → remember which transition played so back/forward **replays** it → if a new navigation interrupts mid-transition, pick up from the current visual state instead of snapping.
4. Transition modules are **lazy-loaded on link hover/focus** — zero cost for transitions never approached.
5. The catalogue (21): **5 covers** (curtain, wipe, circle, columns, typewriter — types a phrase across a grid, then erases) · **9 page-moving** (use a still snapshot of the old page while the new one enters: peel = page-turn, tear = split along a rough line, cube = pull back + box-face turn, stack, frame, corner…) · **7 WebGL/TSL** (velvet = swaying red stage curtain, channel = old-TV static, dither = dot squares in 3 sizes, particles…).

**Exact parameters (Measured).** The one full transition printed in the article, `slide-up`: LEAVE `{ duration: 0.8, ease: "power2.inOut" }`, panel `yPercent 100 → 0`; ENTER `{ duration: 0.8, ease: "power2.out" }`, panel `yPercent 0 → −100`. Note the asymmetry (Derived): cover accelerates away with inOut (committed), reveal leaves with out (fast start, gentle landing). Demo bundle eases found: power1.out, power1.inOut (engine internals). Related template figure (from the project's template write-up): router + Interlude + GSAP + default transition ≈ 39 kB compressed total; a homepage without transitions ≈ 18 kB (Seen in project documentation surfaced during L2).

**Rebuild notes.** For Asiful's stack this is an architecture pattern, not a transplant: WordPress/Elementor has no client router, so the transferable assets are (a) the **contract** — cover → lock → swap → move focus → replay-on-back is the checklist any PJAX/Barba-style layer on WP must satisfy, and most hand-rolled ones fail the focus and interruption clauses; (b) the **lazy-load-on-hover/focus** rule for transition code; (c) the slide-up parameter pair as a default page-cover preset in GSAP on any stack (a fixed overlay div + the two fromTo tweens above ≈ 30 lines). Full Interlude itself needs Astro — bank it for the dentivax.com rebuild if that goes Astro, where it drops in as-is.

**Library-ready parameter sets.**
- [animation-parameter-library] Page-cover preset "slide-up": leave 0.8s power2.inOut yPercent 100→0 · enter 0.8s power2.out yPercent 0→−100.
- [ui-ux-patterns] Transition engine contract: cover → scroll-lock → wait fonts/images → swap → move focus → replay on back/forward → interruption pickup; per-transition lazy-load on hover/focus; payload budget 5+4+28 kB, WebGL 240 kB on-demand only.
- [ui-ux-patterns] Transition taxonomy for menus of effects: covers (5) / page-movers (9) / WebGL (7) — pick by whether the old page must remain visible.

**Evidence.** Article: Measured (read in full). Engine event contract + data-transition wiring: Measured in the demo's shipped bundles (`code-source/interlude-demo/`). Payload figures: article-stated (Measured as published values, not independently weighed).

## 249 · Progressively Enhanced WebGL Lens Refraction (Codrops) — https://tympanus.net/codrops/2023/10/10/progressively-enhanced-webgl-lens-refraction/

**Source.** Codrops tutorial (10 Oct 2023) by David Lindkvist (14islands), read in full via browser.open (475 lines). Companion code: github.com/14islands/codrops-scroll-rig-tutorial; library: `@14islands/r3f-scroll-rig`. The Lens component is by Paul Henschel (Poimandres). Demo originally at astro-shop-ten.vercel.app (prev link — not re-fetched; the article prints the full component code).

**Stack (Measured).** React + react-three-fiber + Drei, on the r3f-scroll-rig architecture: one fixed `GlobalCanvas`, a Lenis-backed `SmoothScrollbar`, and `UseCanvas` tunnels that portal per-component WebGL into the global canvas while their DOM counterparts stay in the layout. The article's demo shell is Create-React-App (the studio mostly uses Next.js).

**Mechanism (step-by-step) — the scroll-rig sync system.**
1. **HTML first.** The page is real semantic markup + CSS layout. WebGL is an enhancement layer, never the layout. This is the progressive-enhancement contract the whole entry exists to prove.
2. **Why main-thread scroll.** The only way to perfectly sync WebGL objects on a fixed canvas with DOM elements is to animate scrolling on the main thread — which is what `SmoothScrollbar` does, accessibly, via Lenis.
3. **Tracking.** `<ScrollScene track={el}>` measures one DOM element and positions its WebGL children over it every frame, passing `scale` (exact DOM dimensions), `scrollState` (visibility / progress / viewport values below) and `inViewport` (gate for starting viewport animations).
4. **Image swap rule.** The DOM `<img>` gets `styles.hiddenWhenSmooth` — it is hidden **only while the smooth scrollbar is active**. If the rig is off (touch/disabled), the class does nothing and the DOM image simply is the page. `<UseCanvas><ScrollScene>` renders a plane at the same box, textured via `useImageAsTexture(imgRef)`, which reuses the already-loaded DOM image — with `srcset`/`sizes` it resolves the img's `currentSrc`; the request is cache-served, and the hook prefers Three's `ImageBitmapLoader` (GPU upload off the main thread) where supported.
5. **Text swap rule (different, deliberately).** DOM text gets `styles.transparentColorWhenSmooth` — colour transparent, **never `visibility: hidden` or removal** — so the real text stays selectable, findable and readable by AT while a WebGL twin renders over it. `WebGLText` (from the `powerups` import) computes font size, letter-spacing, line-height, colour and alignment from `getComputedStyle()` on the DOM node (Troika text underneath; font must be `.woff` — woff2 would double-load). Demo material: Drei `MeshDistortMaterial speed={1.4} distort={0.14}`, `glyphGeometryDetail={16}` (needed for the distortion to look right).
6. **Scroll-driven shader uniforms (per frame, from scrollState).** For each WebGL image (Drei `Image` material): `grayscale = clamp(1 − visibility³, 0, 1)` (image enters grey, colour cubed-eases in as it becomes fully visible); `zoom = 1 + progress × 0.66` (slow push-in across its whole viewport transit); `opacity = clamp(viewport × 3, 0, 1)` (fades in over the first third of approach). visibility: 0 entering → 1 fully visible; progress: 0 entering → 1 exited; viewport: 0 entering → 1 at top of screen.
7. **Lens refraction.** `GlobalCanvas` accepts a render function; all canvas children are wrapped in `<Lens>` with a persistent `<WebGLBackground />` rendered **behind** them — the lens needs WebGL content behind it to refract/blend with. Architecture as published: Lens wraps {background + globalChildren}; the article prints the wiring but not the Lens shader itself — the component comes from Henschel's original (codesandbox) and the tutorial repo. **Honesty label: the lens's internal material parameters are NOT in the article and are not claimed here**; what is Measured is the integration contract (render-function child of GlobalCanvas, background-behind requirement).
8. **Touch / breakpoint rule.** Two sanctioned options; the studio's default is to **disable**: set `SmoothScrollbar enabled={false}` on touch devices or below a breakpoint → the hiddenWhenSmooth/transparentColorWhenSmooth classes automatically deactivate → DOM content reappears untouched → and WebGL meshes are not rendered at all, gated on `hasSmoothScrollbar` from `useScrollRig()`. Non-scroll-bound WebGL (fullscreen backgrounds) may stay. The alternative — hijacking touch scroll — requires Lenis `config={{ syncTouch: true }}` and is used in the demo only to showcase it; the article explicitly says native scroll feels better on touch.

**Exact parameters (Measured from article code).** grayscale `clamp(1 − visibility³, 0, 1)` · zoom `1 + progress × 0.66` · opacity `clamp(viewport × 3, 0, 1)` · MeshDistortMaterial `speed 1.4, distort 0.14` · `glyphGeometryDetail 16` · Lenis touch option `syncTouch: true` (alternative route only). HMR caveat worth banking: inline children of `UseCanvas` break Hot Module Reloading — define ScrollScene children as top-level components.

**Rebuild notes.** This is a React/R3F pattern — it does not port to WordPress/Elementor as code. What transfers to Asiful's bank: (a) the **swap discipline** — WebGL replaces media only while the enhancement is provably active, and text is made transparent, never hidden (SEO/a11y-safe enhancement contract for ANY stack, including a future Astro/Next dentivax.com); (b) the three scrollState→uniform formulas, which are stack-agnostic easing recipes for scroll-linked image treatment (the `1 − visibility³` colour-in and `viewport × 3` early fade are directly reusable in GSAP ScrollTrigger with onUpdate progress values); (c) the touch rule as a standing decision: enhance desktop scroll, serve clean DOM on touch. If the dentivax.com rebuild goes React/Astro, the rig itself is installable as-is (`@14islands/r3f-scroll-rig`).

**Library-ready parameter sets.**
- [3d-and-svg-library] Scroll-rig sync architecture: fixed GlobalCanvas + Lenis main-thread scroll + ScrollScene per-element tracking (scale/scrollState/inViewport props); texture reuse via currentSrc + ImageBitmapLoader.
- [animation-parameter-library] Scroll-state image treatment: grayscale = 1 − visibility³ (clamped) · zoom = 1 + 0.66·progress · opacity = clamp(3·viewport, 0, 1) · text distort speed 1.4 / distort 0.14 / glyph detail 16.
- [ui-ux-patterns] Progressive-enhancement swap rules: img hidden ONLY when smooth active; text transparent-never-removed; touch/below-breakpoint = disable enhancement, render no WebGL meshes (hasSmoothScrollbar gate).

**Evidence.** Mechanism + formulas: Measured (article code read in full). Lens internals: **not read** — integration contract only, labelled as such above; no parameters invented for it.

---

## 253 · Animating an SVG Menu Icon with Segment (Codrops) — https://tympanus.net/codrops/2015/11/12/animating-svg-menu-icon-segment/

**Source.** Codrops tutorial (12 Nov 2015), read in full via browser.open (399 lines) — all code printed in the article. Library: **Segment.js** (lmgonzalves), `< 2 kB`, zero dependencies, a DrawSVG-style stroke-segment animator; easings come from a separate ease helper (`ease.ease('elastic-out', amplitude, period)` — d3-ease family parameters).

**Mechanism (step-by-step).**
1. Three SVG paths are drawn so each path's full trajectory contains BOTH states: pathA and pathC each trace the bar, curl around (cubic + arc), and end as one diagonal of the X; pathB is the straight middle bar. The icon never morphs paths — it **reveals different windows of one fixed path** by animating the visible stroke segment (stroke-dasharray/dashoffset under the hood).
2. `new Segment(path, begin, end)` sets the visible window; `.draw(begin, end, duration, {delay, easing, callback})` animates it. Positions accept absolute units or % notation (`"80% - 24"` = 80% of path length minus 24 units).
3. **The constant-length invariant:** for paths A/C the visible segment length `end − begin = 24` never changes through the whole choreography — the bar keeps its length while it travels along the trajectory; only pathB changes length (it stretches, then collapses to a point).
4. Burger → X: A/C first slide linearly along the path, then land with an elastic-out overshoot into the diagonal position; B stretches ±6, then collapses to its centre point with bounce-out. Reverse (X → burger): A/C pull back with elastic-in, pass through an intermediate stop, and settle with a long elastic-out; B restores with elastic-out(2, 0.4) — a stronger amplitude for the "pop back".
5. **Cross-browser fix (the famous detail):** `getTotalLength` results differ slightly between Firefox and Chrome at small sizes, enough to desync the choreography. Fix: author the SVG at **1000×1000 (10×)**, scale down with CSS `transform: scale(0.1); transform-origin: 0 0`, multiply all JS segment values ×10, and scale stroke-width accordingly.

**Exact parameters (Measured from article code).**
- Paths (1000×1000 versions): A: `M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800` · B: `M 300 500 L 700 500` · C: `M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200`. (Original 100×100 versions also printed in the article.)
- Init: Segment(A, 8, 32), Segment(C, 8, 32), Segment(B, 8, 32) — segment length **24** (values in 100-unit space; ×10 in the scaled build).
- IN (→ X): `inAC`: draw("80% − 24", "80%", **0.3s**, delay **0.1**, linear) → `inAC2`: draw("100% − 54.5", "100% − 30.5", **0.6s**, **elastic-out(1, 0.3)**). `inB`: draw(2, 38, **0.1s**) → `inB2`: draw(20, 20, **0.3s**, **bounce-out(1, 0.3)**) — 20,20 is the collapse point (8+12, 32−12).
- OUT (→ burger): `outAC`: draw("90% − 24", "90%", **0.1s**, **elastic-in(1, 0.3)**) → `outAC2`: draw("20% − 24", "20%", **0.3s**, linear) → `outAC3`: draw(8, 32, **0.7s**, **elastic-out(1, 0.3)**). `outB`: draw(8, 32, **0.7s**, delay **0.1**, **elastic-out(2, 0.4)**).
- Presentation CSS: wrapper 34×34px, `pointer-events: none` on the wrapper with the trigger button `pointer-events: auto` (the SVG overscans the hit area); paths stroke #fff, stroke-width 6px, linecap round, fill transparent; svg offset `top/left: −33px` (100-unit space); wrapper `transition: 0.1s`, `.scaled` variant `transform: scale(0.5)`.

**Rebuild notes.** Fully portable: one inline SVG + Segment.js (or ~60 lines reimplementing draw() with dasharray math + any easing lib) in a single HTML file or an Elementor HTML widget — no build step. Modern alternative with the same choreography: GSAP DrawSVG (paid) or MotionPath-free manual dashoffset tweens; the transferable gold is not the library but (a) the trajectory-path design method (one path containing both icon states), (b) the constant-length-24 invariant, and (c) the 10×-authoring fix, which applies to ANY getTotalLength-based animation. Keep total duration budget in view: IN completes in ~1.0s (0.1 delay + 0.3 + 0.6), OUT in ~1.1s — playful but not slow; for a service-site header, halve the elastic tails.

**Library-ready parameter sets.**
- [3d-and-svg-library] Trajectory-path icon morph: single path per bar containing both states; constant visible segment 24 units; 1000×1000 authoring + CSS scale(0.1) cross-browser fix.
- [animation-parameter-library] Segment choreography: inAC 0.3s linear (delay 0.1) → 0.6s elastic-out(1, 0.3) · inB 0.1s stretch ±6 → 0.3s bounce-out(1, 0.3) collapse-to-point · outAC 0.1s elastic-in(1, 0.3) → 0.3s linear → 0.7s elastic-out(1, 0.3) · outB 0.7s elastic-out(2, 0.4) delay 0.1.
- [ui-ux-patterns] Overscan hit-area pattern: wrapper pointer-events none, inner button pointer-events auto.

**Evidence.** All values Measured (article read in full, code verbatim). Demo not separately mined — the article prints the complete final code including the scaled paths.

---

## 254 · Page Loading Effects (Codrops) — https://tympanus.net/Development/PageLoadingEffects/ (demo) · repo: github.com/codrops/PageLoadingEffects

**Source.** Codrops "Page Loading Effects" (13 demo variants). Evidence routes: (1) live demo first-contacted via browser.open, then mined — extracts in `code-source/page-loading-effects/` (demo index.html + CSS on disk); the demo's `js/svgLoader.js` path returns the host's 404 page today (Measured — the saved "asset" is the 404 HTML), so loader internals are taken from (2) the project's own GitHub repo structure/analysis, labelled as repo-sourced where used. The L2 verdict stands and is adopted: **reimplement CSS-only; do not resurrect the Snap.svg dependency.**

**Stack (Measured).** Vanilla JS `SVGLoader` class + **Snap.svg** (snap.svg-min.js, on disk) + classie.js for class toggling. Each page variant is a static indexN.html carrying its own inline SVG overlay + config. No build step, no framework.

**Mechanism (step-by-step).**
1. A fixed overlay `<div class="pageload-overlay">` contains one inline `<svg>` (viewBox **0 0 80 60**) with a single `<path>` whose initial `d` is a collapsed/degenerate state.
2. Morph targets live in markup, not JS: the path carries `data-opening` (and optionally `data-closing`) attributes holding **semicolon-separated sequences of path strings** — a multi-step morph keyframe list. `SVGLoader` animates through the steps in order via Snap.svg path animation, each step lasting `speedIn` ms with `easingIn`; on hide it runs the closing sequence (or, if `data-closing` is absent, falls back to animating back to the initial path).
3. Class choreography (repo-sourced): `.show` is added to the overlay immediately so it becomes visible; the morph runs; **only after the morph completes** is `.pageload-loading` added (that class drives the spinner/dots state) — the loader never shows a spinner behind an unfinished cover. Reverse on hide.
4. Sizing behaviour is per-effect via `preserveAspectRatio`: `"none"` for stretch-type effects (the 80×60 path stretches to any viewport — distortion is the aesthetic), `"xMidYMid slice"` for shape-true effects like Circle.

**Exact parameters (Measured).**
- **Lazy Stretch** (demo index.html, verified in the live page source): `speedIn: 100`; `preserveAspectRatio="none"`; data-opening (4 steps): `M20,15 50,30 50,30 30,30 Z` → `M0,0 80,0 50,30 20,45 Z` → `M0,0 80,0 60,45 0,60 Z` → `M0,0 80,0 80,60 0,60 Z`; data-closing (4 steps, reverse + collapse): `M0,0 80,0 60,45 0,60 Z` → `M0,0 80,0 50,30 20,45 Z` → `M20,15 50,30 50,30 30,30 Z` → `M30,30 50,30 50,30 30,30 Z`.
- **Circle** (index2.html, repo-sourced): `speedIn: 300`, `easingIn: mina.easeinout`, `preserveAspectRatio="xMidYMid slice"`; single-Bézier circle path; initial state = collapsed point path (all-zero curve commands).
- Variant roster (13 demos, index…index13): Lazy Stretch · Circle · Spill · Frame it · (index5) · Windscreen wiper · Jammed blind · Parallelogram · Tilted · Lateral Swipe · Wave · Origami · Curtain.

**Rebuild notes.** The 2014 implementation is a museum piece (Snap.svg is unmaintained); the **pattern** is current: a brand-coloured SVG cover whose shape morphs in steps while the next page loads is exactly the cover family in entry 248. CSS-only reimplementation: keep the overlay + viewBox 0 0 80 60 + the verbatim Lazy Stretch path sequences, and animate `d` with CSS `path()` transitions where shapes share command structure (all Lazy Stretch steps are 4-point polygons — same structure, so `d: path("…")` transitions interpolate natively in Chromium; for cross-browser, a ~20-line JS interpolator or GSAP AttrPlugin on `d` covers it). In WordPress: a fixed overlay div in the footer + a click interceptor on internal links gives a credible page-cover on brochure sites; keep `speedIn` totals ≤ ~400ms per direction or the cover becomes the wait. Reuse rule from the class choreography: spinner/loading state only AFTER the cover completes.

**Library-ready parameter sets.**
- [animation-parameter-library] SVG cover morph "Lazy Stretch": viewBox 0 0 80 60, preserveAspectRatio none, speedIn 100ms/step, 4-step path sequence (verbatim above) + reversed closing with terminal collapse point.
- [animation-parameter-library] SVG cover "Circle": speedIn 300, mina.easeinout equivalent (cubic-bezier(0.42, 0, 0.58, 1) — Derived mapping), preserveAspectRatio xMidYMid slice, collapsed-point initial path.
- [ui-ux-patterns] Loader state contract: overlay `.show` immediately → morph → `.pageload-loading` only after cover completes; data-opening/data-closing attributes as declarative morph keyframes; closing falls back to initial path when unspecified.

**Evidence.** Lazy Stretch config + both path sequences + viewBox/preserveAspectRatio: **Measured** in the live demo's own HTML (`code-source/page-loading-effects/index.html`). Loader class choreography + Circle config: repo-sourced (labelled). ⚠️ The live demo's svgLoader.js URL 404s today (saved asset is the host 404 page) — logged, not worked around; the demo pages still run because their inline config + markup carry the effect definitions.


---

# Deep Reads — Slice 4, Part C (11 entries: 255, 256, 258, 259, 268, 269, 270, 271, 275, 278, 279)

Worker: Lane 4 helper chat, slice-4 part C assignment. Date: 26 Oct 2026.
Method per entry: first contact by browser.open (text fetch), then `code-source/fetch_and_mine.sh` on the same host where useful, then hand-reading of the article / demo / pen / component source for exact values. Evidence labels used throughout: **Measured** (read directly from shipped source or article code) · **Derived** (computed from measured values) · **Inferred** (reasoned, flagged) · **Seen** (search-excerpt only, not source-verified).

**Miner caveat (affects 255/258/259 extracts):** `fetch_and_mine.sh` resolves directory-relative asset paths against the origin root, so its automatic asset downloads for the three Codrops *demo* URLs were 1441-byte 404 pages and its `values-raw.txt` tallies for those slugs are all-zero and **bogus**. The correct same-host directory URLs were re-fetched manually (after first contact) and a ROUTE NOTE was appended to each slug's `values-raw.txt`. All values below come from the manually verified real files, not the zero tallies.

**Permission-card observation: ZERO card incidents across the whole part.** All fetches ran as browser.open text fetches or one-host curl batches (homepage/registry + same-host bundles only, no asset-by-asset fetching, no tracker hosts).

---

## 255 · Shazam-Like Morphing Button Effect (Codrops) — https://tympanus.net/codrops/2015/11/24/shazam-like-morphing-button-effect/ · demo http://tympanus.net/Tutorials/ShazamButtonEffect/

- **Source:** Codrops tutorial article (browser.open, fully read) + shipped demo source re-fetched manually into `code-source/shazam-morphing-button/` (main.js 11,917 B, snap.svg-min.js 76,673 B — both verified real, not 404 stubs).
- **Stack (Measured):** Snap.svg (path morphing), custom Modernizr build (`csstransitions` test), classie.js class helper, icon font for glyphs. No GSAP — all motion is Snap.svg `animate` + CSS transitions/keyframes.
- **Mechanism (step-by-step):**
  1. One SVG component (300×500 viewBox space) holds three same-point-count path shapes stored as strings in `data-path-start`, `data-path-listen`, `data-path-player` attributes on the morph element. Because the paths share point counts, Snap can interpolate `d` directly.
  2. Click toggles state machine start → listen → player → start. `animatePath(el, path, duration, timingFunction, callback)` wraps `el.animate({ path }, duration, timingFunction, callback)`; timingFunction is either a mina easing function or a raw 4-point cubic-bezier array (Snap/mina accepts the array form).
  3. "Listening" simulation spawns musical-note elements on an interval: each note gets a random target position; its CSS transition duration is computed from geometry (below) so every note travels at constant velocity; `transitionend` recycles notes while `isListening` is true.
  4. Content panels (start / listen / player) swap with transform+opacity transitions on separate cubic-beziers; a pulsing ripple ring runs behind the button during listen state.
- **Exact parameters (Measured):**
  - Morph →listen: **400ms, cubic-bezier [0.8, −0.6, 0.2, 1]** (overshoot below zero — the "squash" anticipation).
  - Morph →player: **450ms, cubic-bezier [0.7, 0, 0.3, 1]**, fired after a **250ms** delay.
  - Morph →start (close): **400ms, cubic-bezier [0.4, 1, 0.3, 1]**.
  - Notes: `totalNotes = 50`; `notesSpeedFactor = 4.5` → per-note transition ms = **4.5 × euclidean distance in px** (constant-velocity rule: duration proportional to distance); `simulateTime = 6500`ms total listen simulation; each note's start delayed by `setTimeout` 60ms cascade; note transition = `transform <speed>ms ease-in, opacity 0.8s`; rotation random **−30°…+30°**; loop re-fires on `transitionend` until `isListening === false`.
  - Ripple: `@keyframes anim-ripple` **1.2s ease-out infinite**: scale3d(3,3,1) opacity 0 → scale3d(1,1,1) opacity 1 @50% → opacity 0; the `::after` ring repeats it with **0.6s delay** (double-ring pulse).
  - Content swaps: transform/opacity **0.4s**; start-content enters with **cubic-bezier(0.8, −0.6, 0.2, 1)** from `translate3d(0, −25px, 0)`; listen-content with **cubic-bezier(0.8, 0, 0.2, 1)** from `translate3d(0, 25px, 0)`; button opacity transition 0.3s; player panel opacity 0.5s (hidden state 0.2s).
- **Rebuild notes:** The transferable core is "three same-topology SVG paths + data-attribute path strings + per-state bezier/duration pairs". In a single HTML file, replace Snap.svg with GSAP's `attr: { d: … }` tween (GSAP can morph `d` when point counts match) or the native `d: path("…")` CSS property in Chromium. For WP/Elementor: paste the SVG + a ~40-line script into an HTML widget; keep the constant-velocity note trick (duration = factor × distance) — it is what makes particles feel physical instead of metronomic. Factor 4.5 ms/px ≈ 222 px/s.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Morph-state beziers: anticipation-overshoot `cubic-bezier(0.8,-0.6,0.2,1)` @400ms; settle `cubic-bezier(0.7,0,0.3,1)` @450ms after 250ms delay; close `cubic-bezier(0.4,1,0.3,1)` @400ms.
  - [animation-parameter-library] Constant-velocity particles: `duration_ms = 4.5 × distance_px`; spawn cascade 60ms; fade 0.8s; rotation jitter ±30°.
  - [animation-parameter-library] Ripple pulse: 1.2s ease-out infinite, scale 3→1, opacity keyframes 0/1@50%/0, second ring +0.6s delay.
- **Evidence:** Article + demo JS/CSS = Measured. GitHub mirror exists (`codrops/ShazamButtonEffect`) — not opened, not needed.

## 256 · SVG Filter Effects: Outline Text with feMorphology (Codrops, Sara Soueidan) — https://tympanus.net/codrops/2019/01/22/svg-filter-effects-outline-text-with-femorphology/

- **Source:** Codrops article (browser.open, fully read). Demos are the author's CodePen pens embedded in the article; pens not separately opened — all values below are quoted from the article's own code blocks (Measured from article).
- **Stack (Measured):** Pure SVG filter primitives — `feMorphology`, `feFlood`, `feComposite`, `feMerge`. Zero JS, zero CSS animation; works anywhere SVG filters apply to SVG text (and, via `filter: url(#id)` in Firefox, to HTML text).
- **Mechanism (step-by-step):**
  1. **Colored outline:** take `SourceAlpha` (the glyph silhouette, ignoring fill color), dilate it with feMorphology to grow the silhouette by the outline radius, flood a flat color, clip the flood to the dilated silhouette with feComposite `in`, then feMerge the outline *under* SourceGraphic.
  2. **Knockout outline (transparent middle):** dilate `SourceGraphic` itself, then feComposite `out` subtracts the original glyph from the dilated copy, leaving only the ring. Because the input is SourceGraphic (not SourceAlpha), the ring inherits the text's CSS `fill` — recolor the text and the outline follows.
  3. **Paint effect on images:** the same primitives with `erode` (or dilate) at small radius roughen/flatten image edges into a painterly silhouette.
- **Exact parameters (Measured):**
  - Colored outline chain: `feMorphology in="SourceAlpha" operator="dilate" radius="4" result="DILATED"` → `feFlood flood-color="#32DFEC" flood-opacity="1"` → `feComposite in="FLOOD" in2="DILATED" operator="in"` → `feMerge`: DILATED-COLOR node first, `SourceGraphic` on top.
  - Demo typography for the colored outline: font-size **85px**, weight **700**, svg 900×200, viewBox `"100 0 900 200"`.
  - Knockout chain: `feMorphology operator="dilate" radius="8" in="SourceGraphic" result="THICKNESS"` → `feComposite operator="out" in="THICKNESS" in2="SourceGraphic"` (result = ring only).
  - Knockout demo font: **Bangers 150px**, letter-spacing **13px** in the CSS version (10px as attribute in an earlier snippet — article shows both; CSS value governs the final demo).
  - Image paint effect: `erode` or `dilate` at **radius="3"**.
  - Rule of thumb from the article (Derived): outline thickness ≈ radius value in user units on each side — radius 4 ≈ 4-unit outline; use radius 8 when the fill is knocked out because the ring loses its inner half to the subtraction.
- **Rebuild notes:** Copy-paste library-grade: define the filter once in a hidden inline SVG, apply with `style="filter:url(#outline)"` on SVG `<text>`. In WP/Elementor, drop the hidden SVG defs + styled text into one HTML widget; keep the text as real SVG text (SEO/accessibility acceptable, selectable in most browsers). Caveat to carry: Safari historically renders feMorphology on HTML elements poorly — apply to SVG-internal text only.
- **Library-ready parameter sets:**
  - [3d-and-svg-library] Colored outline filter: dilate(SourceAlpha, r=4) → flood #32DFEC → composite-in → merge under SourceGraphic.
  - [3d-and-svg-library] Knockout outline filter: dilate(SourceGraphic, r=8) → composite-out(SourceGraphic); outline color = CSS fill.
  - [3d-and-svg-library] Painterly image edge: feMorphology erode/dilate r=3 on SourceGraphic.
- **Evidence:** All values Measured from the article's code blocks. Demo pens = Seen (embedded, not separately opened).

## 258 · Fancy SVG Letter Animation (Codrops) — https://tympanus.net/codrops/2016/09/13/fancy-svg-letter-animation/ · demo http://tympanus.net/Development/FancyLetterAnimation/

- **Source:** Codrops article (browser.open, fully read) + demo source re-fetched manually into `code-source/fancy-svg-letter-animation/` (main.js 5,715 B, anime.min.js 9,368 B, component.css — verified real files).
- **Stack (Measured):** anime.js (v1-era API — `el`/`translateY` arrays/`elasticity` option), hand-drawn single-stroke SVG paths per letter part. No GSAP.
- **Mechanism (step-by-step):**
  1. Every letter is drawn as one or more single-stroke paths. Each path is **triplicated into 3 identical layers** stacked in the DOM.
  2. On load, each path's `stroke-dasharray` and `stroke-dashoffset` are set to `path.getTotalLength()`, so the stroke is fully hidden; the draw-on tween animates dashoffset → 0.
  3. Layers are offset in width and color: the widest layer draws last/on top so thinner under-layers peek out at the edges as colored fringes. Because widths increase per layer (+0.5px steps), the earlier layers' edges stay hidden behind the next — no gaps during the draw.
  4. Whole-letter entrance (elastic rise + fade) runs concurrently with its paths' draw-on, both staggered by letter index.
- **Exact parameters (Measured, confirmed in shipped main.js + component.css):**
  - Canvas: viewBox `0 0 320 180`; container min-height 400px / max-height 70vh.
  - Layer geometry (Effect 1): stroke widths **9px / 9.5px / 10px**; palette #dea521, #f84242, #3758a7, #f79c8c, #84b5bd, #feefde; `stroke-linecap: butt`; linejoin bevel; miterlimit 3; fill none.
  - Letter entrance (`inAnimation`): translateY **[−30, 0]**, **900ms**, **easeOutElastic**, **elasticity 600**; opacity [0,1] **500ms linear**; **per-letter delay increment 40ms**.
  - Path draw (`pathAnimation`): **800ms easeOutQuint**; shipped delay formula: `delay = pathIndex × 200 + letterIndex × 40` (per-path increment 200ms inside a letter, reusing the 40ms letter increment).
  - Exit (`outAnimation`): translateY [0, 15], opacity [1,0], **250ms easeInOutQuad**.
  - Layer cleanup: `pathOpacityAnim` option fades the non-final layers at the end (tween duration **200ms**, starting at delay + duration − 0.1×duration).
  - Variant width stacks from shipped CSS: effect-2 **1/4/10px**; effect-3 **10/6/8px**; effect-4 **10px #00966c / 4px #27272d / 1px #fcec9b** (reverse taper — thin bright core on thick dark body). Demo index.html contains **165** `letter__layer` paths (Measured count).
- **Rebuild notes:** The recipe is font-independent: trace any wordmark as single-stroke paths (or use a single-line/engraving font converted to paths), triplicate, and run the two tween sets. Modern transfer: anime.js v4 or GSAP (`drawSVG` is Club-only; the manual dasharray technique here is the free equivalent — set dasharray/offset from `getTotalLength()` in JS). In Elementor, one HTML widget with inline SVG + anime CDN; total JS ≈ 120 lines.
- **Library-ready parameter sets:**
  - [3d-and-svg-library] Layered-stroke letter recipe: 3 layers, widths base/base+0.5/base+1 px (Effect 1: 9/9.5/10), linecap butt, palette above.
  - [animation-parameter-library] Letter entrance: translateY −30→0, 900ms easeOutElastic elasticity 600, stagger 40ms/letter; draw-on 800ms easeOutQuint, delay = path×200 + letter×40; exit 250ms easeInOutQuad, +15px fade.
  - [3d-and-svg-library] Variant stacks: 1/4/10 · 10/6/8 · reverse taper 10 dark / 4 mid / 1 bright.
- **Evidence:** Article + demo source = Measured. GitHub mirror (`codrops/FancyLetterAnimation`) not opened.

## 259 · Page Preloading Effect (Codrops) — https://tympanus.net/codrops/2014/08/05/page-preloading-effect/ · demo http://tympanus.net/Tutorials/PagePreloadingEffect/

- **Source:** Codrops article (browser.open, fully read) + demo source re-fetched manually into `code-source/page-preloading-effect/` (effect1.css + main.js verified real files; CSS confirms every bezier/delay below).
- **Stack (Measured):** Vanilla JS `PathLoader` class + Modernizr (`cssanimations`) + classie.js; Blokk + Feather icon fonts. No library animation — CSS keyframes driven by two class flips.
- **Mechanism (step-by-step):**
  1. A fixed header (the future hero) covers the screen with a centered logo whose outline is an SVG path. A 60px circular progress ring sits below it.
  2. `PathLoader` sets the ring path's dasharray/dashoffset to its total length; each progress update sets `offset = L × (1 − val)` with a 0.2s CSS transition smoothing between updates (the shipped demo *simulates* progress; a real build hooks the same callback to asset-load events).
  3. At 100%, class `.loaded` is added: logo, ring, and header run their exit keyframes (all on one shared bezier), content items rise in with 50ms-stepped delays; then body gets `.layout-switch`, flipping the header from `fixed` to `absolute` so the page becomes scrollable — during load a scroll listener forces `scrollTo(0,0)`.
- **Exact parameters (Measured):**
  - Ring: SVG 60px, viewBox `0 0 80 80`, stroke-width **6**, track stroke #ddd, progress stroke **#ef6e7e**; `transition: stroke-dashoffset 0.2s`; setProgress completion callback fires **+200ms**.
  - Simulated progress (demo main.js): `setInterval` **80ms**, `progress += Math.random() × 0.1` (≈20 ticks ≈ **1.6s** total — Derived).
  - **Every keyframe uses cubic-bezier(0.7, 0, 0.3, 1):**
    - `animInitialHeader` **1s both**: from translate3d(0, 800px, 0), opacity 0; loader element delay **0.2s**.
    - `animLoadedLogo` **1s forwards**: → `translate3d(0,100%,0) translate3d(0,50px,0) scale3d(0.65,0.65,1)`; logo path fill → #fff via `transition: all 0.5s ease 0.3s`.
    - `animLoadedLoader` **0.5s forwards**: → opacity 0, translate3d(0,−100%,0) scale3d(0.3,0.3,1).
    - `animLoadedHeader` **1s forwards**: → translate3d(0,−100%,0).
    - `animLoadedContent` **1s both**: from translate3d(0,200px,0) opacity 0; item delays **0.1s / 0.15s / 0.2s**.
  - Layout: header fixed, min-height 480px, bg #f1f1f1; logo fill #ef6e7e, logo SVG viewBox `0 0 300 160`, preserveAspectRatio `"xMidYMin meet"`, width 25% (min 320px / max 480px); breakpoint `@media (max-width: 45em)`.
- **Rebuild notes:** Still the cleanest preloader pattern for preview pages: one easing for the whole exit choreography is the lesson — five different elements read as one motion because they share `cubic-bezier(0.7,0,0.3,1)`. Single-HTML transfer is direct (all CSS + ~60 lines JS); for WP/Elementor, gate the `.loaded` flip on `window.load` instead of the simulation interval, and keep total simulated/real wait ≤ ~1.6s. The ring math (dashoffset = L×(1−val), 0.2s smoothing transition) transfers to any SVG progress ring.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Unified-easing page reveal: all exit/enter keyframes `cubic-bezier(0.7,0,0.3,1)`; header/logo 1s, ring 0.5s, content 1s from +200px with 0.10/0.15/0.20s stagger.
  - [3d-and-svg-library] SVG ring progress: dasharray=dashoffset=getTotalLength(); offset=L×(1−val); CSS transition 0.2s on stroke-dashoffset; ring 60px / stroke 6 / viewBox 80.
  - [ui-ux-patterns] Preloader state machine: `.loading` (scroll locked) → `.loaded` (exit choreography) → `.layout-switch` (header fixed→absolute).
- **Evidence:** Article + demo CSS/JS = Measured. GitHub mirror (`codrops/PagePreloadingEffect`) not opened.

---

## 268 · Pin 2 (kokoruz, CodePen) — https://codepen.io/kokoruz/pen/QwjMGBg

- **Source:** Pen resolved by exact-title web search; pen page opened via browser.open (first contact codepen.io) and the full JS panel captured from the page's embedded code. Extract: `code-source/pin-2-kokoruz/` (miner fetched the pen page; HTML/CSS panels were **not** exposed by the pen-page text fetch — flagged below).
- **Stack (Measured from JS):** GSAP + ScrollTrigger (versions not visible in the JS panel — not detected). Three independent pinned systems on one page.
- **Mechanism (step-by-step):**
  1. **Word rotator (pin + scrub through a word list):** the section's bottom margin is set in JS to `(words.length − 1) × 50vh` to manufacture scroll room. A pinned timeline (pinSpacing **false** — the margin does the spacing instead) scrubs through the words: each word fades/slides in, then all but the last slide out upward; a trailing empty tween adds dwell time on the final word.
  2. **Horizontal headline:** headline starts off-screen right (x = section width) and tweens to x = −headline width across a pinned, scrubbed ScrollTrigger whose end distance equals the headline's overflow width.
  3. **Video scale-up:** a video scales 0.25 → 1 across a computed scroll distance that is then stretched ×1.5 to create a hold phase; side texts converge and a dark overlay fades in on parallel tweens in the same timeline.
- **Exact parameters (Measured):**
  - Word rotator: `gsap.set(marginBottom = (words.length−1)*50 + "vh")`; timeline ScrollTrigger { trigger: .word-section, **start "top top"**, **end: "+=" + words.length*50 + "%"**, **scrub: true, pin: true, pinSpacing: false**, markers: true }; per word: fromTo { y: "20%", opacity: 0 } → { y: "0%", opacity: 1, **duration 1** }, then to { y: "−20%", opacity: 0, **duration 1** } (skipped for last word); trailing `to({}, { duration: 2 })` dwell.
  - Horizontal headline (#section2): `gsap.set(headline, x = sectionWidth)`; tween x → −headlineWidth, **ease "none"**; ScrollTrigger { start "top top", **end: () => "+=" + distance()**, **scrub: 2**, pin: true, **anticipatePin: 1, invalidateOnRefresh: true**, markers: true, scroller: "body" }; `distance() = max(0, headline.scrollWidth − section.clientWidth)`.
  - Video scale (#video-loop): startScale **0.25** → endScale **1**; `scaleScroll = (1 − 0.25) × innerWidth`; holdRatio **0.5** → `totalScroll = scaleScroll × 1.5`; ScrollTrigger { start "top top", end: "+=" + totalScroll(), scrub: true, pin: true, anticipatePin: 1, invalidateOnRefresh: true, markers: true, onRefresh re-applies the base sets }; scale tween **ease "none", duration 1** at position 0; side texts from xPercent **−100 / +100 → 0**, ease **"power1.out"**, duration 1 at 0; overlay backgroundColor rgba(0,0,0,0) → **rgba(0,0,0,0.75)**, ease "none", duration 1 at 0; hold tween `{ duration: 0.5 }` at position 1.
  - Extras: `#section4 .box` `gsap.from { scale: 0, delay: 1, duration: 2, rotate: 360 }` (no ScrollTrigger); `#section3 .box` from { scale: 0, rotate: 360, duration: 2 } with ScrollTrigger start **"top 60%"** / end **"top 30%"** (no scrub — plays through the zone).
  - **Defect found (Measured):** the resize handler calls an undefined function `getPinEnd()` — the pen throws on window resize. Any rebuild must recompute distances via `invalidateOnRefresh` + functional end values (as systems 2–3 already do) instead.
- **Rebuild notes:** System 3 is the prize: the "scale distance × (1 + holdRatio)" formula turns a plain scale tween into scale-then-hold without extra pins. System 1's `pinSpacing:false` + JS-set margin trick is a valid alternative when the pinned element must overlay following content. Copy the functional `end` + `invalidateOnRefresh` pattern from systems 2–3, not system 1's static percent end. Elementor transfer: all three are single HTML-widget builds; set `markers:false` in production.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Pin-scrub word rotator: margin (n−1)×50vh, end "+=(n×50)%", pinSpacing false, word in/out 1+1 (20% y travel), final dwell 2.
  - [animation-parameter-library] Scale-with-hold: scaleScroll = (1 − startScale) × viewportWidth; total end = scaleScroll × (1 + 0.5); overlay to rgba(0,0,0,0.75); side texts xPercent ∓100→0 power1.out.
  - [animation-parameter-library] Horizontal headline: end = scrollWidth − clientWidth (functional), scrub 2, anticipatePin 1.
- **Evidence:** JS panel = Measured. HTML/CSS panels not exposed by the pen-page fetch (labelled gap; layout values above come only from the JS). No other routes attempted for the panels — the JS carried all animation parameters, which are this entry's subject.

## 269 · scroll horizontal Gsap (charlyta, CodePen) — https://codepen.io/charlyta/pen/YzjEqyP

- **Source:** Resolution took 3 routes: (1) exact-title web search — generic results, no match; (2) rephrased search — no match; (3) Lane 1's Level-2 inspection log (`level2-inspection-log.md`, queue 269 note) named the author **charlyta** → author-targeted search → pen found. Pen page opened via browser.open; **full JS panel captured (Measured)**. Extract: `code-source/scroll-horizontal-gsap-charlyta/`.
- **Stack (Measured from JS):** GSAP + ScrollTrigger + **Locomotive Scroll** (smooth-scroll library) wired through `ScrollTrigger.scrollerProxy`.
- **Mechanism (step-by-step):**
  1. Locomotive Scroll takes over scrolling on `.container` with `smooth: true`; `scroller.on("scroll", ScrollTrigger.update)` keeps ScrollTrigger in sync.
  2. `scrollerProxy` teaches ScrollTrigger to read/write Locomotive's virtual scroll: `scrollTop` getter/setter delegates to `scroller.scroll.instance.scroll.y` / `scroller.scrollTo(value, 0, 0)`; `getBoundingClientRect` returns the fixed viewport rect; `pinType` is `"transform"` if the container already has a transform, else `"fixed"` — the standard Locomotive pinning fix.
  3. All pin setup is deferred to `window load` (so widths are final). A timeline pinned to `#sectionPin` translates `.pin-wrap` horizontally by exactly the overflow width while a decorative element spins in parallel.
  4. Three `ScrollTrigger.create` instances use `containerAnimation` (the pin timeline) to toggle an `active` class on the three inner sections as they cross the viewport center band — the theming hook (see evidence note).
- **Exact parameters (Measured):**
  - Pin timeline: ScrollTrigger { **scroller: pageContainer, scrub: true, trigger: "#sectionPin", pin: true, start: "top top", end: pinWrapWidth, markers: true** }, timeline `defaults: { ease: 'none' }`. Note `end` is a raw **number** (pinWrap.offsetWidth px of scroll), not a "+=" string.
  - Widths: `pinWrapWidth = pinWrap.offsetWidth`; `horizontalScrollLength = pinWrapWidth − window.innerWidth`; tween `.pin-wrap` → `x: −horizontalScrollLength`.
  - Parallel spin: `.anuncio1` → `rotation: 360*5` (**1800°**) at position **0**.
  - containerAnimation triggers (×3, for `.one` / `.two` / `.three`): { containerAnimation: scrollTween, **toggleClass: "active", start: "center 70%", end: "center 31%"** }.
  - Sync: `ScrollTrigger.addEventListener("refresh", () => scroller.update())`, then `ScrollTrigger.refresh()`.
  - **Defects found (Measured):** all three creates share **id: "3"** (duplicate ScrollTrigger ids — later lookups by id collide); dead code: `pinBoxes`, `twoWidth`, `horizontalTwoLength` are computed and never used.
- **Rebuild notes:** This is the canonical GSAP × Locomotive integration recipe — proxy block verbatim is the reusable asset. Two fixes for production: give each create a unique id, and prefer `end: "+=" + horizontalScrollLength` so scroll distance matches travel distance (here end = full wrap width, which makes the horizontal travel slightly slower than 1:1 — arguably intentional easing of pace, but copy knowingly). Elementor transfer: Locomotive + GSAP via CDN in one HTML widget works, but note Locomotive hijacks page scroll — on a WP page apply it to a wrapper section, not `body`, or skip Locomotive and keep native scroll (the pin timeline works unchanged with the default scroller).
- **Library-ready parameter sets:**
  - [animation-parameter-library] scrollerProxy wiring: scrollTop ↔ scroller.scrollTo(value, 0, 0) / scroll.instance.scroll.y; getBoundingClientRect = viewport; pinType = container.style.transform ? "transform" : "fixed"; refresh → scroller.update().
  - [animation-parameter-library] Horizontal pin: end = pinWrapWidth (raw px), defaults ease 'none', scrub true; parallel decorative rotation 1800° at position 0.
  - [ui-ux-patterns] containerAnimation section theming: toggleClass "active", start "center 70%", end "center 31%".
- **Evidence:** JS = Measured from the pen page. The L2 log additionally recorded `data-bgcolor`/`data-textcolor` section theming with a 0.3s body transition in this pen's HTML/CSS — the HTML/CSS panels were not exposed by the pen-page fetch, so the theming attributes remain **Seen (via L2 log)**, not re-verified here; the JS-side hook (toggleClass above) is Measured. L2's "pin tween below editor fold — NOT verified" caveat is now resolved for the JS: the pin timeline is fully visible above.

## 270 · ScrollTrigger horizontal scroll with pagination (akapowl, CodePen embed) — https://codepen.io/akapowl/embed/preview/qBXqKZM/ba638948806ca4adca9dae41178f29c1

- **Source:** Resolved by exact-title web search to the akapowl pen's embed preview (account-gated CodePen search bypassed via the embed route); embed opened via browser.open — full HTML/SCSS/JS panels captured (Measured). Extract: `code-source/scrolltrigger-horizontal-pagination/`.
- **Stack (Measured):** GSAP + ScrollTrigger, SCSS. No smooth-scroll library, no pin-spacing tricks — the layout itself manufactures the horizontal strip.
- **Mechanism (step-by-step):**
  1. **Layout trick:** `.carousel_wrapper` is `display:flex; flex-direction:column; flex-wrap:wrap; height:80vh`. Five `.image_item` children at height 100% overflow the column and wrap into successive columns — a horizontal strip built with zero horizontal-flow CSS.
  2. A pinned ScrollTrigger tweens the wrapper's `x` by −(scrollWidth − viewport width) with ease "none" while the wrapper is pinned.
  3. **Pagination:** for each panel, a dummy tween with its own ScrollTrigger uses `containerAnimation` (the main tween) plus `toggleClass` to mark the matching dot `active` while that panel crosses the center — dots are pure indicators; there is **no snap** and no click navigation.
- **Exact parameters (Measured):**
  - Panels: 5 × `.image_item` { height: 100%, padding: 2rem 0 }; inner `.image_wrapper` **60vw × 60vh**, centered.
  - Main tween (per `.carousel_wrapper`): `x: () => −(container.scrollWidth − document.documentElement.clientWidth) + "px"`, **ease "none"**; ScrollTrigger { trigger: container, **scrub: true, pin: true, pinSpacing: true, invalidateOnRefresh: true, end: () => "+=" + container.offsetWidth** }.
  - Pagination triggers (per panel): dummy `gsap.to` with ScrollTrigger { trigger: section, **start "left center", end "right center"**, markers: true, containerAnimation: horizontalScrollTween, toggleClass: { targets: '.dot[data-panel="<id>"]', className: "active" } }.
  - Dots: fixed, **bottom 5rem**, **50×50px**, border 1px solid #fff, border-radius 50px; **`.active` → border-radius: 0** (the active dot morphs circle → square — the pagination's entire visual language).
  - Page: section padding 10rem 0, bg #2d4026; body `overflow-x: hidden`.
  - **Defect flagged (Measured inconsistency):** `end` uses `container.offsetWidth` (≈ one panel width, since the wrapper's layout width is one column) while the actual travel is `scrollWidth − clientWidth` (≈ four panels) — the pin releases after ~¼ of the scroll distance the travel implies, so the horizontal motion runs ~4× faster than the page scroll. A rebuild should set `end: () => "+=" + (container.scrollWidth − document.documentElement.clientWidth)` to match travel 1:1.
- **Rebuild notes:** Two steals: (a) the column-wrap strip — useful inside Elementor where a flex row with overflow is fiddly; (b) circle→square active dots via containerAnimation + toggleClass — ~15 lines for pagination on any horizontal build, no state management. Fix the `end` mismatch when copying. Single-HTML transfer is direct.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Horizontal pin + pagination: main tween x = −(scrollWidth − clientWidth), ease none, scrub, pinSpacing true; per-panel containerAnimation triggers start "left center" / end "right center" toggling dot class.
  - [ui-ux-patterns] Column-wrap horizontal strip: flex column wrap, container height 80vh, panels height 100%, media 60vw×60vh.
  - [ui-ux-patterns] Pagination dots: 50px circles, 1px border, bottom 5rem; active state = border-radius 0.
- **Evidence:** All Measured from the embed's three panels.

## 271 · A Practical Introduction to Scroll-Driven Animations with CSS scroll() and view() (Codrops, Adam Argyle) — https://tympanus.net/codrops/2024/01/17/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/

- **Source:** Codrops article (browser.open, fully read). Demos are the author's CodePen pens embedded in the article (pen IDs present in article HTML: BaGVyyJ, BaboeRb, ExOWjMe, KKrGNEO, RwvOmvY — not individually opened; every value below is quoted from the article's own code blocks, Measured from article).
- **Stack (Measured):** Pure CSS scroll-driven animations — `animation-timeline: scroll() / view()`, named view timelines, `@property`. **Zero JS.** Chromium-only at publication (Jan 2024); the article gates everything behind `@supports` + reduced-motion media queries.
- **Mechanism (step-by-step):**
  1. Take any existing time-based keyframe animation; delete its duration/iteration and attach it to a scroll timeline instead — scroll position becomes the animation's currentTime, scrubbed both directions for free.
  2. `scroll()` binds to the nearest scrollport's axis; `view()` binds to an element's traversal through its scrollport, with named ranges (cover/contain/entry/exit) mappable onto keyframe offsets via `animation-range`.
  3. For the carousel pattern, horizontal scroll-snap sections each own a **named view timeline**; a `timeline-scope` on an ancestor lets fixed chrome (prev/next buttons, dots) animate against whichever section is passing — scroll-position-driven UI state with no observers.
  4. A registered custom property (`@property --hue`) makes a non-interpolable value animatable, so the whole palette hue-rotates with scroll via relative color syntax.
- **Exact parameters (Measured):**
  - Baseline: `@keyframes spin { to { transform: rotateY(5turn) } }`, time version `spin 5s ease infinite`.
  - SDA conversion (canonical snippet): `animation: spin linear both; animation-timeline: scroll();` inside `@media (prefers-reduced-motion: no-preference)` + `@supports (animation-timeline: scroll())`.
  - view() version: `animation-timeline: view(); animation-range: contain;` (default range = `cover`).
  - scale-a-lil: `@keyframes { from { scale: .5 } }` with `animation-range: 25vh 75vh`.
  - Carousel: root scroller `overflow-x: auto; scroll-snap-type: x mandatory; animation-timeline: scroll(x)`; sections `scroll-snap-align: start`. `fancy-in` keyframes: **0% { transform: translateX(25vw) } · 20%, 80% { opacity: 1; transform: none } · 100% { transform: translateX(90%) scale(.98); opacity: 0 }**, attached via `view(x)`.
  - Named timelines: `#section-1 … #section-7 { view-timeline: --section-N x }`; `body { timeline-scope: --section-1, …, --section-7 }`; `toggle-control` keyframes = `50% { opacity: 0 }` (buttons fade out mid-range); prev button bound to --section-1, next to --section-7.
  - Dots: `dot-selected` keyframes 0%,100% { scale: .75 } · 50% { scale: 1; background: var(--text-2) }; dot nth-child(n) binds --section-n.
  - Hue system: `@property --hue { syntax: '<angle>'; initial-value: 0turn; inherits: false }`; `hue-cycle` → `--hue: 1turn`; `:root { animation: hue-cycle linear both; animation-timeline: scroll(x) }`; palette: --surface-1 `oklch(40% 50% var(--hue))`, --surface-2 `oklch(50% 40% var(--hue))`, --text-1 `oklch(98% 10% var(--hue))`, --text-2 `oklch(95% 20% var(--hue))`, --link `oklch(99% 10% var(--hue))`, --focus `oklch(80% 90% var(--hue))`; no-@property fallback `--hue: 275`; relative-color vignette: `oklch(from var(--surface-2) calc(l * 1.25) c h)`.
  - Range-named keyframes syntax also documented: keyframe selectors `entry 0% / entry 100% / exit 0% / exit 100%` inside a view() animation.
- **Rebuild notes:** Browser support has widened since 2024 (Firefox shipped SDA in 2025 — Inferred, verify before relying), but the article's gating pattern remains the safe ship-shape: `@supports (animation-timeline: scroll())` + `prefers-reduced-motion` guard, with the static end-state as the no-support fallback (`both` fill). Best transfers: (a) scroll progress / hue-cycle accents — ~6 lines, no JS, no ScrollTrigger; (b) the named-timeline carousel chrome. In Elementor, these drop into a Custom CSS field or HTML widget unchanged. Keep GSAP for anything needing pinning — SDA has no pin.
- **Library-ready parameter sets:**
  - [animation-parameter-library] SDA conversion recipe: keyframes + `animation: <name> linear both; animation-timeline: scroll()` gated by @supports + reduced-motion guard; view() default range cover, use `contain` or `25vh 75vh` windows for gentle reveals (scale .5→1 pattern).
  - [animation-parameter-library] Scroll-linked hue cycle: @property --hue '<angle>' 0turn→1turn on scroll(x); oklch palette slots (40/50, 50/40, 98/10, 95/20, 99/10, 80/90 lightness/chroma pairs); fallback hue 275.
  - [ui-ux-patterns] Named view-timeline carousel chrome: view-timeline --section-N x + timeline-scope on ancestor; toggle-control 50% opacity-0 keyframes; dot-selected scale .75→1 with bg swap.
- **Evidence:** Article code blocks = Measured. Demo pens = Seen (embedded IDs recorded, not opened). Post-2024 browser-support note = Inferred.

---

## 275 · Building a Scrollable and Draggable Timeline with GSAP (Codrops, Michelle Barker) — https://tympanus.net/codrops/2022/01/03/building-a-scrollable-and-draggable-timeline-with-gsap/ · final pen https://codepen.io/michellebarker/pen/QWqdqZV

- **Source:** Codrops article (browser.open; core mechanics read in full — lines 0–487 of 718; the closing "Navigating on click" tail was not read in the article session, flagged below). Final pen URL recovered from the article HTML; pen JS additionally corroborated via search excerpt, which also matches the article's section-animation code exactly and shows the pen's full hash URL (…/QWqdqZV/597a468071d4dce3f7bf0ce80d6cb8d3). One excerpt-only addition from that tail (labelled Seen): a second per-section timeline toggles the nav link's `is-active` class via ScrollTrigger { start: 'top 20px', end: () => 'bottom top', toggleActions: 'play none play reverse', onToggle }, and keyboard Tab navigation on the track scrolls to the focused link's section via `st.scroll(y)`.
- **Stack (Measured):** GSAP + ScrollTrigger + **Draggable + InertiaPlugin** (Club plugin — free inside CodePen pens, paid elsewhere; this licensing fact matters for rebuilds). Native anchor links for click navigation.
- **Mechanism (step-by-step):**
  1. A fixed top nav contains an over-wide track (flex list of year links). One master timeline tweens the track's x from 0 to −(half the track width minus the last item's width) — the track carries ~100% right padding, so half its width is the true travel distance.
  2. That timeline is bound to page scroll via `ScrollTrigger.create({ animation })` with scrub — the page's full scroll height drives the nav.
  3. The same track is independently **draggable** on x with inertia. While dragging, the ScrollTrigger is disabled; on drag end it re-enables. Every drag/throw update converts the track's pixel offset back into a page scroll position (mapRange + `st.scroll(y)`) — two input modes, one source of truth (scroll position).
  4. Content sections below animate in on their own per-section ScrollTriggers, independent of the nav system.
- **Exact parameters (Measured):**
  - `getDraggableWidth() = track.offsetWidth × 0.5 − lastItemWidth()` (the 0.5 exists because the track's right padding ≈ 100% of its content width).
  - Master timeline: single tween, track x → −getDraggableWidth(), **ease 'none' (mandatory — any easing desyncs drag↔scroll mapping)**; `ScrollTrigger.create({ animation: tl, scrub: 0 })` spanning full page scroll (no explicit start/end).
  - Draggable: type 'x', **inertia: true**, bounds { minX: 0, maxX: −getDraggableWidth() }, **edgeResistance: 1**; onDragStart → `st.disable()`, onDragEnd → `st.enable()`; onDrag + onThrowUpdate → updatePosition: `y = gsap.utils.mapRange(0, width, 0, useableHeight, −track.getBoundingClientRect().left)`, then `st.scroll(y)`; `useableHeight = document.documentElement.offsetHeight − window.innerHeight`.
  - Layout: nav fixed top; `.nav__track { min-width: max(200rem, 200%); padding: 1.5rem max(100rem, 100%) 0 0; height: 6rem }`; list flex, space-between; links min-width 8rem; marker fixed at **top 1.75rem, left 4rem**, 1rem dot, `translate3d(−50%,0,0)`, z-index 2000; sections min-height 100vh, hue from index: `hsl(calc(var(--i) × 30) 75% 50%)`.
  - Section animations: initial sets — heading { opacity: 0, y: 50 }, image { opacity: 0, rotateY: 15 }; per-section timeline with ScrollTrigger { trigger: section, **start: () => 'top center', end: () => '+=' + window.innerHeight, toggleActions: 'play reverse play reverse'** }; image → { opacity: 1, rotateY: **−5**, **duration 6, ease 'elastic'** } (deliberate overshoot past 0 to −5°); heading → { opacity: 1, y: 0, **duration 2** } at position **0.5**.
  - Reduced motion: a `matchMedia('(prefers-reduced-motion: reduce)')` early-return guards the section animations — the drag/scroll sync itself is **not** guarded (a gap worth fixing in rebuilds).
- **Rebuild notes:** The bidirectional sync (drag → mapRange → st.scroll) is the transferable mechanism — it makes any scrubbed timeline draggable without forking state. Licensing caveat: InertiaPlugin is Club GSAP; a free rebuild can substitute Draggable's `inertia: false` + a manual throw via `onDragEnd` velocity, or use the native-scroll-only half (scrub nav) which needs no Club plugins. In WP/Elementor this is a page-level build (fixed nav conflicts with theme headers — plan on a canvas template). Click navigation (article tail, not read) uses native anchors per the markup section; sections carry a `--i` index custom property feeding both hue and nav order.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Scroll↔drag sync: master tween ease 'none'; Draggable bounds [0, −width], edgeResistance 1, disable ST on dragStart / enable on dragEnd; mapRange(0, width, 0, docHeight − vh, −trackLeft) → st.scroll(y).
  - [animation-parameter-library] Elastic section reveal: image rotateY 15→−5 + opacity, 6s elastic; heading y 50→0, 2s at position 0.5; ST start 'top center', end '+=' + 100vh, toggleActions 'play reverse play reverse'.
  - [ui-ux-patterns] Over-wide nav track sizing: min-width max(200rem, 200%), right padding max(100rem, 100%), travel = offsetWidth × 0.5 − lastItemWidth.
- **Evidence:** Article code = Measured. "Navigating on click" article tail (lines ~488–718) = **not read** — click-nav detail beyond "native anchors" is unverified and labelled as such. Pen itself not separately opened (article + excerpt carry the full JS).

## 278 · Blur Text (React Bits) — https://reactbits.dev/text-animations/blur-text · source: registry https://reactbits.dev/r/BlurText-JS-CSS

- **Source:** Component page resolved via the site's own Related-components link (first contact reactbits.dev via the Rotating Text page found in search); full component source pulled from React Bits' own public registry endpoint (shadcn-format JSON, JS-CSS variant) and saved to `code-source/blur-text-reactbits/` (`BlurText.jsx`, 12,715 B + `registry-JS-CSS.json`). **All values Measured from current shipped source** — note this current version is substantially richer than the widely-copied 2024 original (which used framer-motion with a simple blur(10px)→0 word stagger); the dependency is now **`motion` v12** (`motion/react`).
- **Stack (Measured):** React + `motion` (`motion/react`: motion.span, MotionConfig); IntersectionObserver for the view trigger; SR-only full-text span for accessibility; `MotionConfig reducedMotion="user"`.
- **Mechanism (step-by-step):**
  1. Text splits by `animateBy` ('words' default, or 'letters'); letter mode regroups pieces inside per-word `inline-flex` wrappers so words never break mid-word; spaces become `\u00A0` suffixes.
  2. Each piece animates through a 3-keyframe effect preset (from → mid-step → rest) built by `buildEffect`: **filter/opacity take a plain tween** (duration + named ease), while **transform keys (x/y/scale/rotate/skew) are peeled off into a spring** (`type:'spring', visualDuration, bounce`) — the hybrid is what makes it feel soft-but-snappy.
  3. Stagger order is a computed rank per piece (start / end / center / deterministic-random via an FNV-1a hash of the text seeding an LCG shuffle — same text, same order every render).
  4. Phases: from → in → (optional loop: out → in …); hover/click triggers replay via the exit snapshot; `focusOnHover` dims sibling words.
- **Exact parameters (Measured — prop defaults):** `delay = 200` (stagger ms between pieces), `stepDuration = 0.35`s, `blur = 10`px, `distance = 50`px, `animateBy = 'words'`, `direction = 'top'`, `effect = 'blur'`, `staggerFrom = 'start'`, `trigger = 'view'`, `threshold = 0.1`, `rootMargin = '0px'`, `loop = false`, `loopDelay = 2`s, `focusOnHover = false`.
  - **Default 'blur' effect keyframes:** from { filter: blur(10px), opacity: 0, y: −50 }; step 1 { blur(5px), opacity: 0.5, y: +5 }; rest { blur(0), opacity: 1, y: 0 }; **times [0, 0.5, 1]**; filter/opacity ease **'linear'** over totalDuration = stepDuration × (steps) = **0.7s**; transform spring: **visualDuration = totalDuration × settle(0.5) = 0.35s, bounce 0.35**. Exit snapshot: { blur(10px), opacity 0, y: +30 } with exitDuration = stepDuration × 1.3 = **0.455s**, exit stagger = 0.4 × stagger, ease EASE_IN [0.55, 0, 0.9, 0.45].
  - **Other presets (Measured):** zoom — from blur×1.2, scale 1.4, offset 0.35d; mid blur×0.2, opacity .9, scale 0.97, overshoot −0.03d; times [0, .6, 1]; bounce 0.25, settle 0.5, fade EASE_OUT [0.33, 1, 0.68, 1]. tilt — rotate 55° (rotateX/Y by axis, transformPerspective 600), mid −8°, times [0, .6, 1], bounce 0.3, settle 0.8, transform-origin pinned to the entry edge. focus — from blur×1.4, opacity 0.32, scale 1.12; mid at time 0.72; **bounce null → no spring, pure tween**, settle 1, fade EASE_IN_OUT [0.65, 0, 0.35, 1]. drift — from x offset 1.6d, skewX 28°, mid overshoot −0.06d / −7°, times [0, .62, 1], bounce 0.3, settle 0.55.
  - Completion timing: `inTotal = (totalDuration × max(1, settle × 2.2) + maxRank × stagger)` — the component's own "settled" clock (drives onAnimationComplete and loop exit); focus-hover dim: blur = clamp(blur × 0.3, 2, 6)px, opacity 0.3, transition 0.45s `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Rebuild notes:** Vanilla/GSAP transfer of the default look: split words into spans; tween filter+opacity linearly 0.7s (blur 10→5→0, opacity 0→.5→1, keyframe split at 50%) while the y-transform runs a springy ease (GSAP `ease:"back.out(1.4)"` approximates visualDuration 0.35s / bounce 0.35); stagger 200ms/word; trigger at 10% visibility, once. For React builds, copy the registry source as-is (MIT + Commons Clause — fine for client sites, not for resale as a library). In Elementor, the GSAP approximation in an HTML widget is the practical route.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Blur-reveal (default): blur 10px→0 in 2 steps (50% midpoint at blur/2, opacity .5, +10% distance overshoot), 0.35s/step, stagger 200ms, IO threshold 0.1; transform on spring visualDuration 0.35s bounce 0.35; filter/opacity linear.
  - [animation-parameter-library] Effect preset table: zoom (scale 1.4→0.97→1, times 0/.6/1, bounce .25) · tilt (rotate 55°→−8°→0, perspective 600, settle .8) · focus (blur×1.4, opacity .32, scale 1.12, no spring, times 0/.72/1) · drift (x 1.6d, skew 28°, times 0/.62/1).
  - [animation-parameter-library] Easings used: EASE_OUT [0.33,1,0.68,1] · EASE_IN_OUT [0.65,0,0.35,1] · EASE_IN [0.55,0,0.9,0.45] · UI ease cubic-bezier(0.22,1,0.36,1).
- **Evidence:** Component source = Measured (registry JSON, this session). Page itself is a JS SPA — browser text fetch shows only shell copy, which is why the registry route was used (documented pattern from the site's own install docs).

## 279 · Count Up (React Bits) — https://reactbits.dev/text-animations/count-up · source: registry https://reactbits.dev/r/CountUp-JS-CSS

- **Source:** Component page confirmed on reactbits.dev (same host, first contact already made); full source from the public registry endpoint saved to `code-source/count-up-reactbits/` (`CountUp.jsx`, 15,407 B + registry JSON + miner extract). **All values Measured from current shipped source.** Dependency: **`motion` v12** (`animate`, `cubicBezier`, `useInView` from `motion/react`).
- **Stack (Measured):** React + motion; two modes — 'count' (plain eased number tween written to textContent) and 'roll' (odometer/slot-machine digit columns with per-column SVG motion blur). `fontVariantNumeric: tabular-nums` on the wrapper.
- **Mechanism (step-by-step):**
  1. **count mode:** when in view (or on load), a master `animate(0, total, { ease: 'linear' })` clock drives a render function that maps elapsed t through the chosen easing curve and writes `formatValue(from + (to − from) × ease(t/total))` directly to the DOM node's textContent (no React re-render per frame).
  2. **roll mode:** the from/to numbers are decomposed into per-place digit columns. Each column's travel `delta` = the mod-10 shortest distance plus whole extra turns (more turns for lower-significance columns, capped by rank); columns render as 4-cell vertical strips (offsets −1..+2) inside 1.2em windows, translated continuously so digits roll rather than swap.
  3. Roll columns are staggered (right columns start later), and each strip gets a **velocity-proportional vertical motion blur** via an SVG `feGaussianBlur` whose stdDeviation tracks the column's instantaneous speed — blur appears only while the column is actually moving fast.
  4. Formatting: thousands separator insertion, decimals inferred from from/to when not specified, compact units (K/M/B/T) with 1 decimal under 100 of the unit, prefix/suffix, negative-sign slot that fades/slides in or out in roll mode.
- **Exact parameters (Measured — defaults + internals):**
  - Props: `from = 0`, `direction = 'up'`, `delay = 0`, **`duration = 2`s**, `separator = ''` (none by default), `mode = 'count'`, **`easing = 'easeOut'`**, `format = 'standard'`, `trigger = 'view'`, `replayOnHover = false`, `startWhen = true`; decimals default = max(decimal places of from, to).
  - Trigger: motion `useInView(ref, { once: true, margin: '0px' })` — fires at first pixel intersection, once.
  - Easings: easeOut = **cubicBezier(0.33, 1, 0.68, 1)**; expo = normalized `1 − 2^(−10t)`; linear; **spring = `makeSpring(0.06)`** — an analytic damped-spring easing: damping ratio ζ derived from 6% overshoot (ζ = −ln(0.06) / √(π² + ln²(0.06))), damped frequency **π / 0.52**, plus a cubic residual term so the curve lands **exactly** on 1 at t = 1.
  - Roll internals: **CELL = 1.2em** (cell height = slot height); **STAGGER = 0.07s** per column, capped: `stagger = min(0.07, 0.4 × total / (columns − 1))` (stagger never eats more than 40% of duration); per-column span = total − stagger × (n−1); column turns: non-spin `min(floor(|b−a| / (unit × 10^(place+1))), max(0, 3 − rank))` — at most 3 extra turns, fewer for higher places; spin (hover replay) turns = max(1, 3 − rank).
  - Roll motion blur: sigma = min(cell × 0.05, speed × cell / 600), where speed is the column's eased delta-velocity sampled at ±0.004 around u; filter applied only when **sigma > 0.2**; filter region x −20% / y −50% / w 140% / h 200%, `colorInterpolationFilters="sRGB"`, stdDeviation `"0 <sigma>"` (vertical only).
  - Roll enter/leave: digit columns and sign/separator marks fade+collapse width with smoothstep windows — enter over u ∈ [0, 0.45], leave over [0.55, 1] (marks: [0, 0.3] / [0.7, 1]).
  - Roll-mode spring variant: per-column overshoot = clamp(0.35 / max(1, |delta|), 0.01, 0.12).
  - Accessibility/safety: SR-only span carries the final formatted value; `prefers-reduced-motion: reduce` → finishes instantly at the end value.
- **Rebuild notes:** For stat bands on service sites (the DentivaX use case), 'count' mode is a 20-line vanilla equivalent: IO once → rAF clock 2s → easeOut cubic-bezier(0.33,1,0.68,1) — or reuse the analytic `makeSpring(0.06)` for a spring-settled number with a guaranteed exact landing (the residual-correction trick is the reusable gem: any spring easing can be forced to hit exactly 1 at t=1 by adding `(1 − raw(1)) × t³`). Roll mode is worth copying wholesale for hero stats; its blur cap (5% of cell height) and sigma>0.2 gate keep it cheap. GSAP transfer: CounterPlugin-free — tween an object {v: from} with onUpdate formatting; separator regex `\B(?=(\d{3})+(?!\d))` is in the source.
- **Library-ready parameter sets:**
  - [animation-parameter-library] Counter defaults: duration 2s, easeOut cubic-bezier(0.33,1,0.68,1), IO once margin 0px, tabular-nums; compact units K/M/B/T at ≥0.9995× threshold, 1 decimal < 100.
  - [animation-parameter-library] Analytic spring easing `makeSpring(overshoot)`: ζ = −ln(o)/√(π²+ln²o); ωd = π/0.52; raw(t) = 1 − e^(−ζωn t)(cos ωd t + (ζωn/ωd) sin ωd t); corrected: raw(t) + (1−raw(1))·t³. Shipped at o = 0.06.
  - [ui-ux-patterns] Odometer roll: cell 1.2em, stagger 0.07s capped at 40% of duration, turns ≤ 3 − rank, velocity blur sigma = min(0.05 × cell, speed × cell/600), apply filter only if sigma > 0.2.
- **Evidence:** Component source = Measured (registry JSON, this session).

---

## Part C completion summary

- **Entries completed: 11 / 11** (255, 256, 258, 259, 268, 269, 270, 271, 275, 278, 279). **Blocked/unresolved: none.**
- **Routes worth noting:** 269 needed 3 routes (title search → rephrased search → L2-log author hint → author search → pen). 270 resolved via the pen's embed preview (CodePen search is account-gated). 278/279 resolved via reactbits.dev pages + the site's public registry JSON (the SPA pages expose no code to text fetch). 271/275 rest on article code (Measured); 275's click-nav tail and 268's HTML/CSS panels are the only labelled evidence gaps.
- **Extracts created:** `code-source/` slugs: shazam-morphing-button, fancy-svg-letter-animation, page-preloading-effect (all with ROUTE NOTEs about the miner's directory-relative 404 bug — its zero tallies there are bogus), pin-2-kokoruz, scroll-horizontal-gsap-charlyta, scrolltrigger-horizontal-pagination, blur-text-reactbits, count-up-reactbits.
- **Defects found in sources (kept in entries):** 268 resize handler calls undefined `getPinEnd()`; 269 duplicate ScrollTrigger id "3" ×3 + dead variables; 270 pin `end` (≈1 panel) mismatched to travel (≈4 panels).
- **Permission cards: ZERO incidents.** No route generated a card; no route was stopped.
- **Top parameter finds:** Snap morph bezier set incl. overshoot (0.8,−0.6,0.2,1) + constant-velocity particle rule 4.5 ms/px (255); feMorphology outline chains r=4 / knockout r=8 (256); layered-stroke draw-on delay formula path×200 + letter×40 (258); single-bezier (0.7,0,0.3,1) whole-page reveal system (259); scale-with-hold formula ×(1+0.5) (268); canonical Locomotive scrollerProxy block (269); CSS SDA named-timeline carousel + @property hue cycle (271); drag↔scroll mapRange sync (275); React Bits' current hybrid tween-filter/spring-transform architecture (278) and analytic spring easing with exact-landing residual correction (279).
