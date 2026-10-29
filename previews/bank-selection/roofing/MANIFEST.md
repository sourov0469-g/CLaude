# MANIFEST: roofing

65 picks. Every file listed is copied whole from the research bank into this folder (paths are relative to this folder). WEB-SKILLS.md is the only non-bank file (the old SKILLS-CATALOG was removed 2026-10-28 on the owner's order; WEB-SKILLS is the utmost-priority catalog).
Source links are taken verbatim from the bank (CSV url column, deep-read entry heading or body, candidates-master.csv); where none is recorded the entry says so.

## Animation (20)

1. **Animation parameter library**
   - Why it is among the best / what to take: Exact GSAP parameters (durations, easings, staggers, scrub values, tokens) merged from the deep reads: the numbers to use instead of approximations.
   - Files: `animation/animation-parameter-library.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **3D and SVG technique library**
   - Why it is among the best / what to take: SVG draw, morph and path techniques and 3D techniques with their parameters and weight costs; use the SVG half, and treat the 3D half as a capped accent.
   - Files: `animation/3d-and-svg-library.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

3. **Here Comes The Sun (powermoves.com)**
   - Why it is among the best / what to take: A pinned horizontal story world built from 118 scenes with the sun on a three-segment bezier (curviness 1.25, Linear.easeNone, about ten tweens per step); the scroll position is the playhead and the whole scene logic is readable inline. Use: the storm-to-sign-off signature story as one pinned world; rebuild it with GSAP 3 ScrollTrigger.
   - Files: `animation/code-source/here-comes-the-sun/`, `reverse-engineering/deep-reads-slice-8.md (entry 549)`
   - Source link: https://www.powermoves.com/co-op-solar/how-it-works/

4. **MotionPath Demo (GreenSock pen)**
   - Why it is among the best / what to take: An object travels an SVG route: duration 5, power1.inOut, alignOrigin [0.5,0.5], autoRotate, progress saved and the tween rebuilt on resize. Also the parameter source for the 0.25-to-0.80 segment idea. Use: a water drop or crew route along a roof or leak path; use the 0.25-0.80 segment, never the whole loop.
   - Files: `animation/code-source/72-motionpath-demo/`, `reverse-engineering/deep-reads-slice-2.md (entry 72)`
   - Source link: https://codepen.io/GreenSock/pen/XWoBypQ

5. **How to Animate SVG Shapes on Scroll (Codrops)**
   - Why it is among the best / what to take: Scroll-scrubbed SVG path morph (data-path-to target, separator viewBox 0 0 100 10) that also drives image clip-path shapes; keep the d and data-path-to command structure identical or the morph garbles. Use: quiet ridge-line section dividers.
   - Files: `animation/code-source/53-onscroll-path-animations/`, `reverse-engineering/deep-reads-slice-2.md (entry 53)`
   - Source link: https://tympanus.net/codrops/2022/06/08/how-to-animate-svg-shapes-on-scroll/ (Level-1 source page: https://tympanus.net/codrops/)

6. **Scroll-Triggered Curved Path Animations (Codrops)**
   - Why it is among the best / what to take: Runtime-measured anchors generate a responsive Bezier route for an object to follow down the page (multipliers 0.8/0.3/0.6/0.2); the bank notes the live example skipped reduced-motion, so add that branch. Use: a route line that carries the visitor down a long page (add the reduced-motion branch).
   - Files: `reverse-engineering/deep-reads-slice-2.md (entry 54)`
   - Source link: https://tympanus.net/codrops/2025/12/17/building-responsive-scroll-triggered-curved-path-animations-with-gsap/

7. **Infinite Marquee Along an SVG Path (Codrops)**
   - Why it is among the best / what to take: Marquee riding a curved path with CSS offset-path (baseVelocity 20, hover factor 0.3, scroll-velocity direction reversal); the mobile fix is resampling the path with getPointAtLength. Use: a credential or project ticker riding a roofline path.
   - Files: `animation/code-source/infinite-marquee-svg-path/`, `reverse-engineering/deep-reads-slice-3.md (entry 149)`
   - Source link: https://tympanus.net/codrops/2025/06/17/building-an-infinite-marquee-along-an-svg-path-with-react-motion/

8. **GSAP Marquee Text (GreenSock pen)**
   - Why it is among the best / what to take: The horizontalLoop helper (speed 5, paddingRight 100, started after document.fonts.ready): the reliable seamless marquee for project, brand or credential strips. Use: a slow seamless project marquee like Stronghold's 60s strip.
   - Files: `animation/code-source/gsap-marquee-text-codepen/`, `reverse-engineering/deep-reads-slice-3.md (entry 161)`
   - Source link: https://codepen.io/GreenSock/pen/wvZMwez

9. **Fancy SVG Letter Animation (Codrops)**
   - Why it is among the best / what to take: Stroke-dashoffset draw-on (800ms easeOutQuint, delay per path) using layered copies; it needs single-stroke artwork, which makes it the exact draw-on mechanism for annotation and outline lines. Use: draw-on inspection callouts over real roof photos.
   - Files: `animation/code-source/fancy-svg-letter-animation/`, `reverse-engineering/deep-reads-slice-4.md (entry 258)`
   - Source link: https://tympanus.net/codrops/2016/09/13/fancy-svg-letter-animation/

10. **Count Up (React Bits)**
   - Why it is among the best / what to take: View-triggered count and odometer modes, duration 2, compact formatting: the trust-stats standard (keep the final number in the HTML as the no-JS fallback). Use: years in business, review count and warranty years in the proof band.
   - Files: `animation/code-source/count-up-reactbits/`, `reverse-engineering/deep-reads-slice-4.md (entry 279)`
   - Source link: https://reactbits.dev/text-animations/count-up

11. **ScrollTrigger Horizontal Scroll with Pagination (CodePen)**
   - Why it is among the best / what to take: Horizontal pin with x = -(scrollWidth - clientWidth), scrub, pinSpacing and invalidateOnRefresh, with numbered pagination dots: the most phone-legible horizontal pattern in the bank. Use: a counted project strip that stays phone-safe.
   - Files: `animation/code-source/scrolltrigger-horizontal-pagination/`, `reverse-engineering/deep-reads-slice-4.md (entry 270)`
   - Source link: https://codepen.io/akapowl/embed/preview/qBXqKZM/ba638948806ca4adca9dae41178f29c1

12. **GSAP Pin Sidebar (CodePen)**
   - Why it is among the best / what to take: A pinned step-through with an indicator rail (start top bottom, end +=100% x points): the cleanest process pattern in the bank. Use: the call, inspect, estimate, install process as a pinned step-through.
   - Files: `animation/code-source/gsap-pin-sidebar/`, `reverse-engineering/deep-reads-slice-3.md (entry 153)`
   - Source link: https://codepen.io/akapowl/pen/poRdoLV/9b99361db3839f1169cdc0f278746ee5

13. **Masked Heading (React Bits)**
   - Why it is among the best / what to take: Reveal presets with exact defaults (rise: duration 1.1, stagger 0.09, spotlightRadius 160), reduced motion verified, and trigger "view" for phones: the hero promise reveal. Use: the honesty headline reveal.
   - Files: `animation/code-source/95-masked-heading/`, `reverse-engineering/deep-reads-slice-2.md (entry 95)`
   - Source link: https://reactbits.dev/text-animations/masked-heading

14. **Direction-aware reveals (GreenSock pen pojzxwZ)**
   - Why it is among the best / what to take: The entry vector flips with scroll direction (+/-100px, 1.25s expo, overwrite auto): the top-pick section reveal in the bank, with full page source captured. Use: section reveals that never fight the scroll direction.
   - Files: `animation/code-source/pen-40-direction-reveals/`, `reverse-engineering/deep-reads-slice-1.md (entry 40)`
   - Source link: none recorded (the bank records only the pen id pojzxwZ for this entry)

15. **CSS scroll()-driven animations (Codrops, Adam Argyle)**
   - Why it is among the best / what to take: Zero-JS animation-timeline: scroll() and view() with named view timelines; Chromium-only at writing, so use it as an enhancement layer and re-check support at build time. Use: a zero-JS reveal layer for slow phones.
   - Files: `reverse-engineering/deep-reads-slice-4.md (entry 271)`
   - Source link: https://tympanus.net/codrops/2024/01/17/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/

16. **Shopify Editions Winter '26**
   - Why it is among the best / what to take: A complete motion-token system (scroll .6s cubic-bezier(.41,.19,.13,.95), fade .52s, slide .6s) plus Roman-numeral chapter navigation: the model for one timing-token block driving all CSS motion. Use: one timing-token block driving every CSS motion.
   - Files: `animation/code-source/58-shopify-editions-winter26/`, `reverse-engineering/deep-reads-slice-2.md (entry 58)`
   - Source link: https://www.shopify.com/editions/winter2026

17. **Dynamic Shape Overlays (Codrops)**
   - Why it is among the best / what to take: Vanilla multi-layer SVG overlay (numPoints 18, 600ms, per-point and per-path delays) that is mobile-menu ready; note the older-Safari arrow-function caveat. Use: the mobile menu overlay.
   - Files: `animation/code-source/dynamic-shape-overlays/`, `reverse-engineering/deep-reads-slice-3.md (entry 150)`
   - Source link: https://tympanus.net/Development/ShapeOverlays/

18. **Silo (silosilosilo.com)**
   - Why it is among the best / what to take: A variant configurator with a running total driven by one state object: the discipline to copy for any estimator, quote builder or visualiser. Use: a roof-type picker or instant quote that keeps one state object.
   - Files: `animation/code-source/98-silo/`, `reverse-engineering/deep-reads-slice-2.md (entry 98)`
   - Source link: https://www.silosilosilo.com/

19. **The Architecture Behind Trionn (Codrops)**
   - Why it is among the best / what to take: One shared scroll driver for everything, a 371-frame sequence scrubbed through a single img, Lenis on gsap.ticker, and gsap.matchMedia splitting desktop and mobile logic, with reduced motion verified. Use: one scroll driver for the whole page, with mobile logic split by matchMedia.
   - Files: `animation/code-source/trionn-architecture/`, `reverse-engineering/deep-reads-slice-3.md (entry 163)`
   - Source link: https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/

20. **Scrollable and Draggable Timeline with GSAP (Codrops)**
   - Why it is among the best / what to take: A scrubbed track tween plus Draggable with drag-scroll sync, reduced motion verified and keyboard handled (inertia needs the Club plugin): a process-strip candidate. Use: a draggable process or project strip with keyboard support.
   - Files: `reverse-engineering/deep-reads-slice-4.md (entry 275)`
   - Source link: https://tympanus.net/codrops/2022/01/03/building-a-scrollable-and-draggable-timeline-with-gsap/ (Level-1 source page: https://tympanus.net/codrops/)

## Design and design inspiration (4)

1. **Level-2 inspection log, including the Roofix entry (160)**
   - Why it is among the best / what to take: Contains entry 160, Roofix (Behance, Jafar Khan): a roofing site concept with its full section order banked (hero with six-field quote form, counters, services, process, projects, why-us, team, locations) and a QA lesson on template residue.
   - Files: `design/level2-inspection-log.md`
   - Source link: roofix-phi.vercel.app (as recorded in the file)

2. **Boardman Roofing (Manchester UK)**
   - Why it is among the best / what to take: The most modern design in the roofing scan (rotating-word hero, 001-021 index); flagged because its claims contradict each other, so steal the craft and never the numbers.
   - Files: `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://www.boardmanroofing.shop/

3. **Bakstad Construction (Httpster)**
   - Why it is among the best / what to take: A real Seattle general contractor (BBB-corroborated, est. 2008): a project-led homepage of project, location and year cards, a press band and a named principal in the footer; the bank marks it the trade-site exemplar. Use: the project-led homepage (project, location, year) for captioned job photos.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 319)`
   - Source link: https://bakstadconstruction.com/ (Level-1 source page: https://httpster.net/style/minimal/)

4. **Specia1ne (Awwwards, Honorable Mention)**
   - Why it is among the best / what to take: Numbered sections with per-section counters, a live local-time readout, a warm-paper palette and an overlay menu: the paper-technical look that suits trades when kept restrained. Use: the warm-paper numbered-chapter look and a live local-time readout for office hours.
   - Files: `design/code-source/specia1ne/`, `reverse-engineering/deep-reads-slice-9.md (entry 569)`
   - Source link: https://specia1ne.com/ (Level-1 source page: https://Www.awwwards.com/websites/Ukraine/?page=1)

## Reverse-engineering / code-level analysis (26)

1. **Lane 2 source-level findings (roofing and HVAC top tier)**
   - Why it is among the best / what to take: Terminal curl of the live HTML and bundles of the top tier: which stacks and mechanisms are really in the source, beyond what a text fetch shows.
   - Files: `reverse-engineering/lane2-source-findings.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **Stronghold Roofing & Solar (Lakeland FL), crown 1**
   - Why it is among the best / what to take: Overall-system crown (33/35): proof strip above the headline, the hero as step 1 of a 60-second funnel, a named value stack and a price-match dare; the captured HTML and CSS show the exact .15-.28s motion budget and the single 60s marquee.
   - Files: `reverse-engineering/trade-site-sources/stronghold.html`, `reverse-engineering/trade-site-sources/stronghold.css`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://strongholdroofing.com/

3. **West London Roofing (London UK), crown 2**
   - Why it is among the best / what to take: Best small-firm craft in the scan (31/35): Checkatrade 9.55 from 365 reviews, WhatsApp in the hero, a postcode checker, photo-upload quotes and before/afters captioned by postcode; the reachable model for a solo operator.
   - Files: `reverse-engineering/trade-site-sources/westlondon.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://westlondonroofingltd.co.uk/

4. **Green Conception (Los Angeles CA)**
   - Why it is among the best / what to take: Price-first instant satellite quote needing only an address, with APR disclosed; gc-lead.js is the first/last-touch attribution pattern to copy for lead plumbing.
   - Files: `reverse-engineering/trade-site-sources/greenconception.html`, `reverse-engineering/trade-site-sources/gc-lead.js`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://www.greenconception.com/roof-quote/

5. **Hippo Roofing (Melbourne FL)**
   - Why it is among the best / what to take: Named, priced packages with proof in the page title and the licence linked to the state record, on WordPress and Elementor: the stack proof that this class of system is buildable without custom code.
   - Files: `reverse-engineering/trade-site-sources/hippo.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://hipporoof.com/melbourne/

6. **Dr. Roof (Atlanta GA)**
   - Why it is among the best / what to take: Three tools roofers rarely build: a replacement calculator, a price-match and an instant damage report, plus a membership; the source shows how they are wired.
   - Files: `reverse-engineering/trade-site-sources/drroof.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: http://www.drroof.com/

7. **HHH Roofing (Houston TX)**
   - Why it is among the best / what to take: B2B proof done right: named clients with outcome case studies, published $/sq ft and $6M liability up front.
   - Files: `reverse-engineering/trade-site-sources/hhh.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://hhhroofing.com/commercial-roofing/

8. **Greater Midwest Exteriors (Illinois)**
   - Why it is among the best / what to take: The only site in its chunk publishing real replacement pricing ($8k-$25k+) on the homepage, with a 1,000+ insurance-claims stat.
   - Files: `reverse-engineering/trade-site-sources/greatermidwest.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://gm-exteriors.com/roofing

9. **LOA Roofing & Construction (Austin TX)**
   - Why it is among the best / what to take: 5.0 stars from 1,000+ reviews placed directly under the hero, and a drone photo report even when the owner is not home.
   - Files: `reverse-engineering/trade-site-sources/loa.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://www.loaconstruction.com/austin/

10. **Indy Roof & Restoration (Indianapolis IN)**
   - Why it is among the best / what to take: 2,300+ reviews in the hero beside the hero form: insurance help proven by reviews instead of asserted.
   - Files: `reverse-engineering/trade-site-sources/indyroof.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://indyroofcompany.com/

11. **Stay Dry Roofing (Indianapolis IN)**
   - Why it is among the best / what to take: Proof density (Google Guaranteed, GAF President's Club, 1,000+ reviews), an inspection-within-24h promise and a sticky CALL/TEXT bar.
   - Files: `reverse-engineering/trade-site-sources/staydry.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://staydryroofing.com/

12. **Interlock Metal Roofing**
   - Why it is among the best / what to take: 9,108 verified reviews with location and date, and warranty and test-report documents linked from the detail cards.
   - Files: `reverse-engineering/trade-site-sources/interlock.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://www.interlockroofing.com/?p=130699

13. **Bonner Built (Atlanta GA)**
   - Why it is among the best / what to take: A 27+ named-review wall that keeps one honest negative, with JSON-LD 5.0/660 verified in source: credible proof hygiene.
   - Files: `reverse-engineering/trade-site-sources/bonner.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://www.bonnerbuilt.com/

14. **Mr. Roof Waco (Waco TX)**
   - Why it is among the best / what to take: "Roofers hate showing prices. We put ours on the internet." A 30-second estimator as the whole hook, on a light page.
   - Files: `reverse-engineering/trade-site-sources/mrroofwaco.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: http://mrroofwaco.com/

15. **Erie Home (US national)**
   - Why it is among the best / what to take: The location-page system: the same proof and offer stack on every city page, with 4.8 from 40,000+ reviews and $0 Down.
   - Files: `reverse-engineering/trade-site-sources/erie.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://eriehome.com/locations/roofing/warren-mi/

16. **Rogers Roofing (Chicagoland)**
   - Why it is among the best / what to take: Call Now and Schedule Online presented as equals so the visitor picks the channel, plus a 50-Year Leak-Free Guarantee.
   - Files: `reverse-engineering/trade-site-sources/rogers.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://www.rogersroofing.com/

17. **Nations Roof (commercial)**
   - Why it is among the best / what to take: Commercial proof by scale (EMR 0.59, ISNetworld A badges) built with HubSpot and Swiper: the highest animation score in the roofing set.
   - Files: `reverse-engineering/trade-site-sources/nations.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://nationsroof.com/

18. **Oslo Takmester (Norway)**
   - Why it is among the best / what to take: Parent-verified 31/35, tied with West London: a hero promise stack (free inspection, written quote before start, 5-year warranty right, pay after the job, insurance help) and a registered master credential.
   - Files: `reverse-engineering/trade-site-sources/oslotakmester.no.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://oslotakmester.no/

19. **Moderna Tak (Sweden)**
   - Why it is among the best / what to take: Parent-verified 31/35 co-leader of its pattern; the report notes it carries no JSON-LD aggregate and no review count, which is why it did not take the crown.
   - Files: `reverse-engineering/trade-site-sources/modernatak.se.html`, `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://modernatak.se/

20. **Deep-reads slice 1 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 40 Direction-aware reveals (GreenSock pen pojzxwZ); 22 Monolith Studio. Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-1.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

21. **Deep-reads slice 2 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 72 MotionPath Demo (GreenSock pen); 53 How to Animate SVG Shapes on Scroll (Codrops); 54 Scroll-Triggered Curved Path Animations (Codrops); 95 Masked Heading (React Bits); 58 Shopify Editions Winter '26; 98 Silo (silosilosilo.com); 120 Raffael Stueken. Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-2.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

22. **Deep-reads slice 3 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 149 Infinite Marquee Along an SVG Path (Codrops); 161 GSAP Marquee Text (GreenSock pen); 153 GSAP Pin Sidebar (CodePen); 150 Dynamic Shape Overlays (Codrops); 163 The Architecture Behind Trionn (Codrops). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-3.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

23. **Deep-reads slice 4 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 258 Fancy SVG Letter Animation (Codrops); 279 Count Up (React Bits); 270 ScrollTrigger Horizontal Scroll with Pagination (CodePen); 271 CSS scroll()-driven animations (Codrops, Adam Argyle); 275 Scrollable and Draggable Timeline with GSAP (Codrops). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-4.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

24. **Deep-reads slice 5 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 317 Digital Butlers (GSAP Showcase); 314 Some Inspiration for Pricing Tables (Codrops); 306 Accordion with CSS3 (Codrops); 313 Nifty Modal Window Effects (Codrops); 310 Inspiration for Text Input Effects (Codrops); 348 How to Create a Circular Progress Button (Codrops); 319 Bakstad Construction (Httpster). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-5.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

25. **Deep-reads slice 8 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 549 Here Comes The Sun (powermoves.com); 561 Iper (iper.com.au). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-8.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

26. **Deep-reads slice 9 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 569 Specia1ne (Awwwards, Honorable Mention). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-9.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

## Structure, visual hierarchy, UI/UX and conversion (15)

1. **Roofing industry report (shortlist, five deep reads, crowns, steal-stack)**
   - Why it is among the best / what to take: The roofing report: 21 scored sites, five rebuild-grade deep reads, the two crowns and the template steal-stack; every company named in this pack has its entry here.
   - Files: `structure-uiux/roofing.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **Conversion anatomy for local-service homepages**
   - Why it is among the best / what to take: The bank's zone-by-zone conversion anatomy for local-service sites, the logic the per-trade reports build on: read first for what each part of a homepage must do.
   - Files: `structure-uiux/00-conversion-anatomy.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

3. **UI/UX pattern library**
   - Why it is among the best / what to take: The bank's merged UI/UX pattern library (section models and interaction patterns harvested from Level 2 and the deep reads): the reference for hierarchy and section structure.
   - Files: `structure-uiux/ui-ux-patterns.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

4. **Builder brief**
   - Why it is among the best / what to take: The bank builder brief: the motion ceiling, recipe stacks by trade tier and the conversion doctrine (phone-first for emergency trades, quote-first for planned purchases).
   - Files: `structure-uiux/builder-brief.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

5. **Portfolio site plan (per-trade crowns and steal-stacks)**
   - Why it is among the best / what to take: Per-trade crown sources and steal-stacks for roofing, HVAC, remodeling and siding & windows with the anatomy of hero, proof and CTA: read this trade's section first.
   - Files: `structure-uiux/portfolio-site-plan.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

6. **Cenco Roofing (Denver CO)**
   - Why it is among the best / what to take: A Verify link on every credential, a free 72-point inspection and "if your roof is fine, we tell you in writing": the cleanest credential-and-honesty structure in roofing (deep-read in the report).
   - Files: `structure-uiux/roofing.md (entry for this firm)`
   - Source link: https://www.cencoroofing.com/

7. **Digital Butlers (GSAP Showcase)**
   - Why it is among the best / what to take: The quote-form blueprint: budget radios before contact, a stated quote-in-48-hours promise, a transparent pricing FAQ with the payment split published, and a "Proof, not promises" stats band. Use: the funnel steps after the roof-type picker: budget before contact details and a stated response time.
   - Files: `structure-uiux/code-source/digital-butlers/`, `reverse-engineering/deep-reads-slice-5.md (entry 317)`
   - Source link: https://gsap.com/showcase/ (as recorded in candidates-master.csv)

8. **Iper (iper.com.au)**
   - Why it is among the best / what to take: A six-step quote overlay behind a persistent sticky quote button with a step indicator and a stated time promise: the model for a sticky-entry multi-step quote. Use: a sticky quote entry with a step indicator and a time promise.
   - Files: `structure-uiux/code-source/iper/`, `reverse-engineering/deep-reads-slice-8.md (entry 561)`
   - Source link: https://iper.com.au/

9. **Some Inspiration for Pricing Tables (Codrops)**
   - Why it is among the best / what to take: Twelve named three-tier pricing sets with real prices: the reference for tier tables and plan comparisons. Use: warranty and package tiers.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 314)`
   - Source link: https://tympanus.net/codrops/2015/11/19/some-inspiration-for-pricing-tables/

10. **Accordion with CSS3 (Codrops)**
   - Why it is among the best / what to take: CSS-only :checked accordion (checkbox, radio and default-open variants); the article warns that some mobile browsers miss label clicks, so test on phones. Use: the honesty-FAQ accordion.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 306)`
   - Source link: https://tympanus.net/codrops/2012/02/21/accordion-with-css3/

11. **Nifty Modal Window Effects (Codrops)**
   - Why it is among the best / what to take: Nineteen CSS modal transitions (Fade & Scale, Newspaper, Blur, 3D Slit and more) for quote forms and lightboxes. Use: the quote-form modal.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 313)`
   - Source link: https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/

12. **Inspiration for Text Input Effects (Codrops)**
   - Why it is among the best / what to take: Fourteen named floating-label field styles: ready-made treatments for quote-form fields. Use: quote-form fields.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 310)`
   - Source link: https://tympanus.net/codrops/2015/01/08/inspiration-text-input-effects/

13. **How to Create a Circular Progress Button (Codrops)**
   - Why it is among the best / what to take: A submit button that morphs into a progress ring and draws a tick or a cross: clear form feedback without a page change. Use: clear form-submit feedback.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 348)`
   - Source link: https://tympanus.net/codrops/2014/04/09/how-to-create-a-circular-progress-button/

14. **Monolith Studio**
   - Why it is among the best / what to take: The best full service-business blueprint in its chunk: team cards with style tags, a Google five-star strip, knowledge-hub cards, a booking CTA and a full directory footer. Use: the directory footer, proof strip and knowledge-hub structure.
   - Files: `structure-uiux/code-source/monolith-studio/`, `reverse-engineering/deep-reads-slice-1.md (entry 22)`
   - Source link: monolithstudio.com

15. **Raffael Stueken**
   - Why it is among the best / what to take: Lo-fi, semantic-HTML structure with numbered sections and a flash-fade mask under 2 KB of JS: the most portable structure and entrance timing in its chunk. Use: numbered semantic sections and low-JS entrance timing.
   - Files: `structure-uiux/code-source/120-raffael-stuken/`, `reverse-engineering/deep-reads-slice-2.md (entry 120)`
   - Source link: https://raffaelstueken.de/
