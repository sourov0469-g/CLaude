# PLAN — Austin Pro Siding, Windows & Roofing: portfolio redesign

Written 29 Oct 2026 before any HTML. Facts come only from `FACTS.md` (harvested from austinprosiding.com the same day). Bank sources are the files in `bank-selection/siding-windows-doors/`; skills are cited by WEB-SKILLS tag.

## 1. Concept: "Priced in public"

Austin Pro's crown is not a look, it is a habit: every job goes into a file, and the file is published (886 documented projects, 415 priced siding jobs, a median band, a price printed on each before/after pair). The redesign makes that habit the whole visual idea. The site behaves like the firm's open job file, set in the materials of the trade:

- **The lap course is the module.** HardiePlank lap is 8.25″ board, 7″ exposure (published). The page's horizontal rhythm, its reveal masks and its dividers are courses of lap siding, installed bottom-up the way a crew installs them. The hero re-sides a real Austin Pro house course by course.
- **The palette is their swatch book.** Tokens are Sherwin-Williams colours the firm publishes with hex on its siding page (Pure White SW 7005, Repose Gray SW 7015, Gauntlet Gray SW 7019, Iron Ore SW 7069, Tricorn Black SW 6258) plus the red of the Austin Pro window-mark logo. The site is literally painted in colours they install.
- **Every claim carries its job tag.** Price bands, neighbourhoods, dates and job numbers sit on the evidence the way a ticket is stapled to a job folder. Nothing is decorative proof.
- **One instrument per page.** Home: the course-reveal hero. Plan page: the Colour Studio that repaints a real Austin Pro house. Projects: the time-scrubbed project map. Siding: the exploded wall section. Windows: the brand-share instrument.

Differentiation anchor (S0223 test, logo removed): a dark-navy lap-sided house being re-sided board by board under a job tag that says "Siding portion $15k–$20k, Rob Roy, Jul 2026". No other contractor site looks like that.

Tone (S0223, max two): **Industrial / utilitarian** led, with **editorial** restraint. Dials (S0213): variance 7, motion 6, density 5.

## 2. Design system

**Colour (S0660, S1418; one accent, ≤2 visible accent uses per screen)**
| Token | Value | Source | Role |
|---|---|---|---|
| `--paper` | #EDECE6 | SW 7005 Pure White (their swatch) | page ground |
| `--stone` | #CCC9C0 | SW 7015 Repose Gray | rules, quiet fills, map land |
| `--mid` | #78736E | SW 7019 Gauntlet Gray | secondary text on paper is NOT this (fails 4.5:1); used for graphics only |
| `--muted` | #55524E | darkened Gauntlet for body-secondary text (≥7:1 on paper) | secondary text |
| `--ink` | #2F2F30 | SW 6258 Tricorn Black | text, dark chapters |
| `--deep` | #434341 | SW 7069 Iron Ore | dark surfaces |
| `--signal` | #D42125 | Austin Pro logo red (sampled from the logo PNG) | primary CTA + one data mark |
| `--signal-ink` | #B3161B | darker red for text on paper | links/labels on paper |
Dark chapters (map, footer) use `--ink` ground with `--paper` text and `rgba(237,236,230,.12)` rules. Not cream: the ground is a measured light grey from their own swatch, the display face is a grotesk, the accent is the client's logo red (S0001 tell #1 avoided on all three counts).

**Type (S0667, S0666, S1433, S1430)** — one family, Mona Sans variable (OFL, Google Fonts; `wdth` 75–125, `wght` 200–900; 96 KB woff2, self-hosted). Width is the second vector: expanded (wdth 118, wght 640) for display, normal for body, condensed (wdth 78, wght 560) for big tabular numerals in ledgers. Scale 1.25 (major third) from 17px body: 13.6 / 17 / 21.25 / 26.6 / 33.2 / 41.5 / 51.9 / 64.8; hero display `clamp(2.75rem, 6.6vw, 6.25rem)`. Display tracking −0.025em, leading 0.98; body leading 1.55, measure 62ch. Labels are sentence case, the body face one step smaller, untracked (Hallmark floor 9; no tracked-caps eyebrows, no middle-dot meta strings — separators are hairline rules or line breaks). `font-variant-numeric: tabular-nums` on every figure.

**Space (S1432, S1428)** — 8px base: 4 8 12 16 24 32 48 64 96 128 160. Section padding varies by content (hero 0, data chapters 128, quiet bands 64) — never one value everywhere. Container max 1320px, 12 columns desktop / 8 tablet / 4 phone, gutters 24/20/16, phone margins 20px. `overflow-x: clip` on html and body (Hallmark floor 4); image grid tracks `minmax(0,1fr)`.

**Shape** — media frames 14px radius, controls 10px, chips 999px, one radius per nesting level. Shadows tinted with Tricorn (`0 18px 40px -24px rgba(47,47,48,.45)`), used only where something sits on something.

**Motion tokens (animation-parameter-library.md exact values; S1465, S0658, S0410)**
| Token | Value | Library source |
|---|---|---|
| Masked word reveal | 0.6s `expo.out`, stagger 0.05, words from y 66px under mask, clearProps | "Masked word reveal — Nick Ho" (0.6s, expo.out, 0.04–0.06, 64–70px) |
| Slide-up block | 0.8s `power2.out`, stagger 0.02, autoAlpha + yPercent 12, clearProps | "Slide-up text reveal — Heron AI" |
| Role-grouped entrance (R5) | beats 0.1s apart in one timeline: label → title → body → media | builder-brief §2.2 R5 (0.08–0.12) |
| Direction-aware cards | ±100px desktop / ±50px phone, 1.25s `expo`, overwrite "auto" | deep-read #40 / pen pojzxwZ |
| Course mask (blinds) | 30 strips desktop, 18 phone, stagger 0.02, bottom-up, strip 0.9s `power3.out` (sequence ≈1.5s) | "SVG blind mask transition — Codrops" (1.5s, stagger 0.02, 30 strips) |
| Count/odometer | 2s, easeOut `cubic-bezier(0.33,1,0.68,1)`, IO once, tabular-nums; roll cell 1.2em, column stagger 0.07s capped at 40% of duration | deep-read #279 Count Up |
| Pointer lens | ease 0.1 per frame, square side 0.4 × min(w,h) | deep-read #125 square lens (pointerEase .1, squareSize .4) |
| Reveal spotlight | radius 260 (140–220 compact), pointer ease 0.1, radius ease 0.14, mask stops 0/40/60/75/88/100 | S1324 |
| UI micro | hover in 250ms `cubic-bezier(0.22,1,0.36,1)`, close 150ms, press scale 0.98 | S0410 transitions-polish |
| Swatch repaint | 400ms `cubic-bezier(0.645,0.045,0.355,1)` (BLK app token) | deep-read #531 BLK |
| Scrubbed motion | `ease: "none"` always | library cross-site rule |
Reduced motion (S0400, S1190): tiered. Tier 1 (course strips, map time-play, lens drift, scale-on-scroll) removed to final state; Tier 2 reveals become 150ms opacity; Tier 3 (focus, colour repaint, button states) kept. JS reads `gsap.matchMedia()`; CSS gates with `(prefers-reduced-motion: no-preference)`. Content is visible with JS off (hidden start states are set by JS only).

**Engines** — GSAP 3.13 core + ScrollTrigger + Flip, self-hosted, one shared load per page (≈ 47 KB gzip together, under the builder brief's per-page GSAP budget once Flip is page-scoped). No Lenis: S1320 asks for exactly one smooth-scroll engine; I evaluated Lenis and chose native scrolling because S1209 (scrolljacking), S1169 and the brief's "no scroll traps, mobile first" outrank it, and the siding top tier converts without one (bank F17). No WebGL: every "3D" moment is CSS 3D or SVG, per the brief's "3D only where excellent" and the bank's Three.js caps.

## 3. Pages

1. `index.html` — Home
2. `siding.html` — James Hardie siding
3. `windows.html` — Replacement windows
4. `projects.html` — Projects: map, gallery, before/afters, one job start to finish
5. `plan.html` — Plan & price: Colour Studio, real price distributions, financing
6. `about.html` — About & contact: the firm, credentials, reviews, service area, booking

Shared chrome on every page: header (exact logo, Services mega-menu listing all 11 trades with their documented counts, Projects, Plan & price, About, phone, "Book a free inspection"), mobile menu sheet, sticky mobile action bar (Book · Call), booking dialog, directory footer. The other 9 trades' pages are not built (portfolio scope); their mega-menu links point to the relevant cost data on `plan.html#trades` so no link is dead.

## 4. Homepage — section by section

| # | Section | Pattern and source (bank / skill) | Parameters | Adaptation |
|---|---|---|---|---|
| H0 | Header + mega-menu | builder-brief R26 menu overlays + mega-menu; S1450 top nav; Monolith #22 directory logic | open 250ms / close 150ms `cubic-bezier(.22,1,.36,1)` (S0410); scroll-lock released on close | Mega-menu is a ledger: trade, documented count, median band, so the menu itself carries proof. |
| H1 | **Hero: "Re-sided in front of you"** | Codrops SVG blind mask (animation-parameter-library row "SVG blind mask transition"; 3d-and-svg Part B "prime before/after candidate") + R28 before/after slider + Austin Pro price band on the pair (siding-windows.md crown filing) | 30 courses desktop / 18 phone, bottom-up, stagger 0.02, 0.9s `power3.out`, sequence ≈1.5s, once on load; then a vertical course handle (keyboard ↑/↓, 1 course per step) | Strips are lap courses, not abstract blinds: the after-photo of Rob Roy (khaki → navy James Hardie, Jul 2026) is installed board by board over the before. The job tag pinned to the photo prints the real band: "Siding portion $15k–$20k". Headline left over a quiet paper column (anti-centre S0213). H1 "Siding and windows, priced in public." (6 words, Hallmark ≤7). Proof as one set line: 4.9 on 474 Google reviews / James Hardie Elite Preferred / GAF Master Elite / since 2009. Phone: image first at 62svh, copy below, handle is a 44px right-edge thumb so page scroll is never captured. |
| H2 | **The job-file numbers** | Feldco count-ups in trade units (siding-windows.md DEEP 2 steal 1) via React Bits Count Up roll mode (#279); F12 self-reconciling arithmetic (00-conversion-anatomy) | roll: 2s, cell 1.2em, stagger 0.07s capped 40%, IO once; final values in HTML (no-JS) | Units are the firm's own: 886 documented projects, 415 priced siding jobs, 301 of 415 on the 8.25″ board, 177 before/after pairs. The band ends with an equation that adds up on screen: 312 on the map + 574 counted elsewhere = 886. |
| H3 | **Eleven trades, priced from the files** | Austin Pro "Compare all 10 trades" range bars (crown); R30 comparison table idea; Codrops pricing tables #314 BEM structure for rows | bars grow `scaleX` 0.8s `power2.out` stagger 0.04 (S0410 stagger 40ms ×10 = 400ms… capped: only first 8 staggered); median tick draws after | Replaces the banned "service picker + bento grid" entirely: services are a data ledger (trade, priced projects, middle-half bar on a $0–$50k axis, median band, est. monthly at 7.99%/120). Rows for siding/windows link to their pages; others open their cost row on plan.html. Phone: bars stack under each label, axis labels at 0/25/50k. |
| H4 | **Same house, price on it** | R28 before/after slider; R27 filter pills with counts; deep-read #125 square lens rebuilt in DOM; S1324 reveal mask | drag + keyboard (←/→ 5%), lens side 0.4×min(w,h), ease 0.1; pills from the published pairs (All 6, Siding 3, Windows 1, Patio covers 1, Roofing 1) | Each pair's tag prints place, date, product and its band ("Windows portion $15k–$20k"). Desktop: hold the pointer on the photo and a square lens shows the other state through the window-mark square (the logo's own shape). Phone: no lens; a 44px drag handle with `touch-action: pan-y` on the frame so vertical page scroll always works. |
| H5 | **Colour Studio (compact)** | Codrops colour customizer #140 (part select + swatch tray) + BLK #531 live-preview zones + Silo #98 single-state discipline | repaint 400ms `cubic-bezier(.645,.045,.355,1)`; swatch tray drag strip; state → summary → CTA permalink | Repaints the real Rob Roy after-photo with colour-keyed masks (body, gable, trim) and a hard-light shading layer, so lap shadow lines survive every colour (prototype verified 29 Oct). Swatches are the 12 Sherwin-Williams colours and 17 ColorPlus Austin colours the firm publishes, with hex. Home shows body + trim and 8 swatches; "Open the full studio" goes to plan.html. Honest labelling: "A real Austin Pro job, repainted in your browser. The colour is a preview; the price band is the job's own." |
| H6 | **One job, start to finish** | S1325 scroll progress timeline; Renewal "one featured project told fully" (siding-windows.md DEEP 1 steal 2); timed process (anatomy §7, checklist 16) | progress line `scaleY` scrubbed, ease none; step active at line head; IO for step text (slide-up 0.8s `power2.out`) | The firm's own APS-4867 record, dated: referral and inspection Mar 9 2026 → approved Jun 18 → crew on site Aug 31–Sep 3 → done Sep 3, four on-site days, siding portion $25k–$30k, paint $5k–$10k. The generic four-step process (inspect, proposal, install, final check) runs beside it as the template. Phone: left rail, no pin. |
| H7 | **312 dots, each a job** | Austin Pro project map (crown) using their published finder dataset; S1326 sticky-stage idea for the time scrub; CSS scroll() progress (#271) not needed here | time scrub range Jan 2022 → Sep 2026; "Play" animates months at 60ms each (Tier 1, removed under reduced motion); filter pills by trade | Dark chapter. SVG map in the firm's frame (566×640, lat/lon graticule, office square on N Lamar). Only the 312 photographed, in-frame dots are drawn, exactly as their caption says; the caption's arithmetic is kept. A "near you" finder searches their 401 published place names and lists the nearest documented jobs. |
| H8 | **Names in the reviews + what the badges take** | anatomy F13 reviews name the operative; F5 count + platform; Monolith #22 Google strip; credential-explained model (Austin Pro "What each one means") | quotes enter with direction-aware reveal (±100/±50px, 1.25s expo) | Instead of a carousel: the crew names homeowners mention (Garrett, Kevin, Tracy, Paul…) counted from the 30 reviews published on the firm's reviews page, each with the verbatim line. Beside it the seven credentials with one plain sentence each and their documented counts (431 Hardie projects, 200 GAF roofs). One review number everywhere: 4.9 on 474. |
| H9 | **The money, worked** | Austin Pro worked APR example (crown filing); Codrops pricing tables #314 for the three plans; Expo honest-middle financing (synthesis 3) | number swap 250ms; amortisation computed live | Slider for a project amount ($5k–$50k, default $15,000) shows all three published plans side by side; at $15,000 the 7.99%/120 column reads $181.91 exactly (the site's own example, re-computed). Full disclosure text printed verbatim. Holiday Savings stack shown with its end date (Nov 30) and the rule that Pay-in-Full excludes financing. |
| H10 | **Book the inspection** | Iper #561 sticky multi-step entry with step indicator and time promise; Olha #15 / Digital Butlers #317 budget radios before contact; Codrops text inputs #310 (input-then-label); circular progress button #348; Nifty modal #313 fade & scale | steps 01/03; button 250×70 → 70px ring, r 32.5, stroke 5, check stroke 4, label fade 0.15s; modal fade & scale 0.3s, max-width 630 | Step 1 trades (multi-select chips), step 2 budget band (their published bands: under $5k / $5k–$10k / $10k–$15k / $15k–$20k / $20k+ / not sure), step 3 name, phone, ZIP. Promise is theirs, not invented: "We call back to schedule. The inspection takes 30 to 60 minutes and ends with the scope, materials and price." Submit is stubbed client-side (no network), with real validation states (S0661: errors after blur, `:user-invalid`, summary on submit). |
| H11 | Footer | Monolith #22 full directory footer; R43 | — | Dark. Services, brands with counts, service areas, NAP, hours, financing line, "Concept redesign for a portfolio, not affiliated with Austin Pro; all figures from austinprosiding.com, 29 Oct 2026". |

Banned-skeleton check (proof-strip hero + service picker + bento services grid + pinned leak/story + estimate paper + before/after + FAQ + gable close): this homepage has no proof-strip hero (the hero is a re-siding instrument), no service picker, no bento grid (trades are a data ledger), no pinned leak/story (the only story is a dated real job on a non-pinned rail), no estimate paper, no FAQ section, no gable close. The before/after exists because the brief requires price-banded pairs, and it is a filterable lens instrument inside a different sequence.

## 5. Siding page (`siding.html`)

| Section | Pattern + source | Parameters | Adaptation |
|---|---|---|---|
| S1 Hero | Scale-container on scroll (#154: scrub 1, start "clamp(top 12%)", force3D) + Milwood before/after | media scale 0.86 → 1, scrub 1, no pin (pin dropped: phone safety, builder §4) | Milwood, Austin, May 2026: red garage and khaki → white with dark garage doors, siding portion $25k–$30k. H1 "James Hardie, installed by an Elite Preferred crew." Stat line: 431 documented siding jobs / 30-year non-prorated Hardie warranty / lifetime workmanship on labour / 1–2 weeks with paint. |
| S2 **The wall, layer by layer** | S0361 dimensional drawing (monochrome, codes not numbers, never invent); CSS 3D exploded axonometric; ScrollTrigger scrub | layers lift on scrub (ease none) over 140vh sticky stage desktop; phone: static exploded drawing, no sticky | Technical SVG drawing of the published system: sheathing (replaced where rotten), house wrap, HardiePlank lap 8.25″ / 7″ exposure / 5/16″ / 12 ft, trim, Sherwin-Williams paint. Dimension codes with a variable table; anything unpublished is [TBD]. Counts beside each choice: 301 of 415 on the 8.25″ board, 27 board & batten, Cedarmill 286, Smooth 36. This is the page's signature (drawings, not illustration: S1320/S0471 allow technical drawings). |
| S3 What 415 jobs cost | Austin Pro cost guide histogram; anatomy F7(e) | bars `scaleY` 0.8s `power2.out` stagger 0.04 (first 8), median band in signal red, middle-half bracket draws after | Full 11-band histogram (sums to 415), tap/hover a bar for its count and the published example job from that band. City medians table (Austin $15k–$20k … Pflugerville $5k–$10k). "What moves the price" six levers as tap-able notes (Codrops tooltip #316 structure, adapted: no rotate, 8px rise, tap fallback). Caveat printed verbatim. |
| S4 Four pairs | R28 slider + lens (shared component) | as H4 | Milwood, Rob Roy, Maple Run, North Austin with bands. |
| S5 Built for Texas | Austin Pro five claims | role-grouped reveal | Five short claims as a typographic list (doesn't warp / rot / burn / feed termites / lasts decades) with the condition that makes each true. |
| S6 Colour on the board | link into studio | — | The 12 SW + 17 ColorPlus chips (their hex), "Try them on a real house" → plan.html#studio. |
| S7 Questions | Codrops accordion #306 mechanics via `details` | open 0.5s / close 0.3s ease-in-out (bank values; S0410's symmetric 250ms noted, bank wins per brief) | Their own published siding Q&As (cost, time, warranties, repair vs replace, soffit/fascia, financing). Kept to this page, not the homepage. |
| S8 Reviews about siding + book | shared | — | Joe Liu, Megan Randolph, Pat Mehaffy, Annamaria Scaccia, David McPherson (verbatim). |

## 6. Windows page (`windows.html`)

| Section | Pattern + source | Parameters | Adaptation |
|---|---|---|---|
| W1 Hero | course reveal reused vertically as sash lines (window mullions) | 12 vertical strips, stagger 0.02, 0.9s power3.out | Anderson Mill, Sep 2026, NT Windows Executive, windows portion $15k–$20k. H1 "Four window brands, measured to every opening." |
| W2 **Which window goes in Austin houses** | ScrollTrigger horizontal pin + pagination (#270), desktop only | x = −(scrollWidth − clientWidth), ease none, scrub true, pinSpacing true, invalidateOnRefresh; end fixed to match travel 1:1 (the deep read's flagged defect); dots circle → square when active | Four brand panels (NT Windows 238 of 376, Simonton 54, Andersen 38, Pella 31) with their lines, published specs, frame-colour swatches (their hex) and the brand's median band. Phone: native scroll-snap strip, no pin (builder §4 rule 4). |
| W3 Frames and glass | data list | — | 214 vinyl / 64 aluminum / 33 Fibrex / 4 fiberglass or wood / 61 not recorded as a single stacked bar; Low-E line per brand. |
| W4 What 376 jobs cost | histogram as S3 | same | 12 bands (sums to 376), by-brand and by-city medians. |
| W5 Four pairs | R28 + lens | as H4 | Spicewood at Balcones Village ($40k–$50k), Ridgewood, North Austin, Maple Run. |
| W6 Two days on site | timed process | — | Measure → build to order → set and seal → final check; "most window-only jobs took two days on site"; review quote "about 6 weeks for measuring, ordering and installing" (Sara Helms) placed as the honest counterweight. |
| W7 Reviews + book | shared | — | Sara Helms, Karen Hibpshman, LOIS RICHWINE, Bryce Martin. |

## 7. Projects page (`projects.html`)

| Section | Pattern + source | Parameters | Adaptation |
|---|---|---|---|
| P1 Opener | Codrops Sticky Grid Scroll (#94) | 425vh block, sticky stage; reveal 0–45% (columns alternate top/bottom, stagger each 0.06, power1.inOut); zoom 45–90% (grid scale 2.05, side columns xPercent ±40, centre items yPercent ±40 0.5s); content at 90–95% (title 0.7s power2.inOut, desc 0.4s); fluid rem 100vw/1440 | 12 real project photos; the zoom lands on the centre photo, which is APS-4867, and the copy settles over it. ≥768px only (as the demo); phone gets a static 2-column grid. Reduced motion: static grid. Block height is native scroll with a sticky child (no GSAP pin), so it cannot trap. |
| P2 Map, full | H7 component, full width | as H7 | Adds the near-you finder results list and per-trade counts. |
| P3 Gallery | Grid-to-fullscreen #48 (DOM port with GSAP Flip, measure at click) + R27 filter pills | Flip 0.9s `expo` (#157 demo 1 values), scale true; phone: fade/scale 0.3s | 43 real photos with neighbourhood, date and trades from the firm's captions; "Every photo is a finished Austin Pro project." Lightbox: focus trap, Esc, arrows, swipe. |
| P4 All 14 pairs | R28 + lens | as H4 | Homepage, siding and window pairs in one filterable set. |
| P5 APS-4867 in full | S1325 | as H6 | The full dated story with the scope details the firm published (fascia, soffit, brick pockets, garage jambs, drip edge). |

## 8. Plan & price page (`plan.html`)

| Section | Pattern + source | Parameters | Adaptation |
|---|---|---|---|
| L1 **Colour Studio (full)** | #140 customizer (active part + swatch tray) + #531 BLK zones + #98 Silo state | as H5; swatch tray is a native horizontal scroll strip with snap; zone tabs Body / Gable / Trim; Before toggle; compare split | All 29 published colours, finish choice (painted on site vs ColorPlus) changes which tray is shown, profile note (lap vs board & batten, with counts). The summary panel derives from one state object (Silo): colour names and SW codes, finish, the photographed job's own band, where all 415 siding jobs landed (mini histogram) and est. monthly. "Book an inspection with this plan" builds the booking dialog prefilled from state (Silo permalink discipline). |
| L2 Every trade priced | H3 ledger, full | as H3 | All 10 priced trades + storm (free inspection). |
| L3 Siding and windows distributions | S3/W4 histograms | as S3 | Toggle siding / windows. |
| L4 Financing, worked | H9, full | as H9 | Adds the stacking calculator from the firm's promotions page (their example $30,000 → $22,500). |
| L5 Referral | Feldco steal 3 (referral as a section) | — | "$200 for every referral, no limit" with the rule (name mentioned before the first appointment). Styled as a job-ticket stub (ui-ux-patterns "Referral ticket"). |

## 9. About & contact (`about.html`)

| Section | Pattern + source | Adaptation |
|---|---|---|
| A1 Story | Renewal process confidence; S1494 plain copy | 2009 Austin Pro Siding & Windows, 2010 Sanders Roofing & Exteriors, merged 2018; office on North Lamar; 5,000+ homeowners; 70+ years combined. A three-point year line (not a fake timeline). |
| A2 What each badge takes | credential-explained | Seven credentials, one sentence each, documented counts. |
| A3 Brands by how often they show up | Austin Pro brand counts | Horizontal bar list: James Hardie 431 … DoorLink 9. |
| A4 Reviews | F5/F13 | 30 published reviews as a filterable wall by trade mentioned (masonry columns, no carousel), named staff highlighted. |
| A5 Where we work | service-area ledger | 36 communities grouped as the firm groups them, with documented counts. Round Rock local facts (1990s builder-grade stock, Williamson County hail corridor) as the one location note. |
| A6 Contact + book | H10 inline | NAP, hours, map link, the booking form inline (not modal), payment methods, GreenSky. |

## 10. Mobile doctrine (375px first)
- No GSAP pin on phones anywhere. The only sticky stages (P1, S2) are CSS `position: sticky` inside native-scroll sections and are disabled under 768px.
- Every horizontal set on phones is a native `scroll-snap` strip with visible next-item peek; no wheel or touch capture.
- Sliders: `touch-action: pan-y` on frames, only the 44px handle takes horizontal drag.
- Sticky bottom bar (Book · Call) after the hero, hidden while the booking dialog is open or the footer is visible.
- Hit targets ≥44px (S1259); body ≥16px; no horizontal overflow at 320/375/1024/1280/1440 (S1066).

## 11. Budgets
Per page: HTML+CSS+own JS target ≤ 150 KB unminified; GSAP set ≈ 141 KB min (≈ 47 KB gzip) shared; font 96 KB; images lazy below the fold, hero image eager with `fetchpriority="high"`, 1400w desktop / 760w phone WebP. Standalone homepage is a single file with assets embedded; its size is reported in the build note.

## 12. From-scratch attestation
I, the builder of this site, attest that every page here is written from scratch for this brief: no HTML, CSS, JS, template, component or section stack is reused from any earlier site in `~/workspace/previews/` (Roofix, House Martins, Annear, Rembrandt, Carpentryuk or any other) or from Austin Pro's own markup. Austin Pro's site was read for facts and data only; its photos, logo, swatch hexes and published datasets are used as the client's own material. Bank patterns are re-implemented from their recorded parameters, not copied from their source code. The banned skeleton (proof-strip hero + service picker + bento services grid + pinned leak/story + estimate paper + before/after + FAQ + gable close) is not produced under any name; the homepage order is Hero instrument → job-file numbers → trades ledger → priced pairs → studio → dated job → map → people & badges → money → booking.

## 13. Skill pack (WEB-SKILLS.md) — 96 skills selected

How I read the book: protocol, recommended packs and library map read in full; the index (1,504 entries) read as name + description (truncated at ~170 characters per entry), with Parts 14, 16, 19, 20 (video, Design.md brands, 152 brand systems, checklist rules) read as names only. The pack below was chosen from that read.

**Read in full (main text; reference files read where they bear on this build — S1314's ARTICLE.md read in full):**
S0001, S0223, S0214, S0213, S1314, S0659, S0471, S1320, S0217 · S0667, S0666, S0660, S1433, S1430, S1432, S1428, S1434, S1418 · S1465, S0658, S0441, S0400, S0399, S0410 · S1209, S1169, S1325, S1326, S1329, S0451, S0186 · S1324, S0407, S0361, S0405 · S1442, S0661, S1440, S0244 · S1259, S1190, S1066, S1128, S1482, S1501, S1497, S1498, S1500, S1499, S1495, S1166  (51 skills)

**Read in part (main body, not every reference file):** S1450 navigation-patterns (first two thirds), S0226 page-cro (diagnostic framework), S0657 accessibility-baseline (legal floor + contrast table), S0502 design-review (rubric, not the pro section), S1306 audit-ai-design-slop (boundaries + what to flag)  (5 skills)

**Selected, not opened (applied from index description only):**
Direction & taste — S0006 impeccable, S0095 design-taste-frontend (long form), S0650 taste-skill, S1303 tastemaker, S0641 redesign-skill
Typography/colour — S0074 better-typography, S0071 better-colors, S0100 ui-typography, S0413 oklch-skill
Layout/composition — S0073 better-layout, S1357 framed-grid-layout, S1383 light-mode-paper-technical, S1356 editorial-tech, S0445 container-lines
Motion — S0059 emil-design-eng, S0060 animate, S0063 review-animations, S0083 12-principles, S0089 to-spring-or-not, S0181 gsap-core, S0187 gsap-timeline, S0183 gsap-performance, S1315 optimize-web-animations, S0056 fixing-motion-performance
Interaction/UX — S0189 make-interfaces-feel-better, S0075 better-ui, S1420 data-visualization, S1494 ux-writing, S0612 copywriting, S0630 marketing-psychology, S1452 peak-end-rule, S1444 hicks-law, S1441 fitts-law, S1424 law-of-continuity, S1426 law-of-proximity, S1435 von-restorff, S1457 zeigarnik
A11y/perf/SEO — S0070 better-accessibility, S0054 fixing-accessibility, S0231 web-performance-optimization, S0280 core-web-vitals, S1174 performance-budget, S1113 LCP, S1000 CLS, S1196 responsive-images, S1115 lazy-loading, S1224 skip-link, S1248 tel-mailto, S1214 service-area, S1146 nap-consistency, S1262 trust-signals, S1105 json-ld-valid, S1237 structured-data
Review — S0638 plan-design-review, S1473 heuristic-evaluation, S0072 better-interface, S1316 stitched-full-page-capture, S0005 webapp-testing
(40 skills)

Total pack: 96.

**Where the brief or the bank overrides a skill (stated, not hidden):**
- S0214 and S0213 want floating pill nav, double-bezel cards, eyebrow pills and 800ms blur-up reveals on every element. Not applied: the bank's motion ceiling (F17) and S0001/Hallmark (no eyebrows, one orchestrated moment) govern a lead site.
- S1320 wants exactly one smooth-scroll engine. Declined (native scroll), reasons in §2.
- S1320/S0471 forbid model-drawn SVG illustration. The only drawn SVG is technical (the dimensional wall section, map graticule, chart marks, the course-mask geometry); the visualiser uses a real photograph.
- S0410's accordion is symmetric 250ms; the Codrops accordion in the bank uses 0.5s open / 0.3s close. The brief says bank numbers are exact, so the bank values are used on the siding Q&A.
- Codrops tooltip #316 rests at `rotate3d(1,1,1,6deg)`; the builder brief's standing rule forbids rotating text-bearing elements, so the tilt is dropped and the rise shortened to 8px (S0410: >40px reads sluggish).
- Deep read #243 (horizontal parallax gallery) hijacks the wheel; only its parallax-buffer rule (img 125% at −12.5%, MAX_SHIFT 8) is used, on a native scroll strip (S1209).
- The live site's hero film is not used (cannot be verified as an Austin Pro job; FACTS.md).

## 14. QA plan
Playwright Chromium screenshots per section at 1440 and 375 (plus 1024/1280 overflow sweep), reduced-motion pass, keyboard pass, console-error capture, link/anchor crawl, form stub test, numbers pass (every figure grep-checked against FACTS.md), weight audit. Homepage audited in rounds until clean → `CHECKPOINT-HOME.md`; then each page; then full-site QA → `BUILD-NOTE.md` and `homepage-standalone.html`.
