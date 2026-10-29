# MANIFEST: remodeling

72 picks. Every file listed is copied whole from the research bank into this folder (paths are relative to this folder). WEB-SKILLS.md is the only non-bank file (the old SKILLS-CATALOG was removed 2026-10-28 on the owner's order; WEB-SKILLS is the utmost-priority catalog).
Source links are taken verbatim from the bank (CSV url column, deep-read entry heading or body, candidates-master.csv); where none is recorded the entry says so.

## Animation (17)

1. **Animation parameter library**
   - Why it is among the best / what to take: Exact GSAP parameters (durations, easings, staggers, scrub values, tokens) merged from the deep reads: the numbers to use instead of approximations.
   - Files: `animation/animation-parameter-library.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **3D and SVG technique library**
   - Why it is among the best / what to take: SVG draw, morph and path techniques and 3D techniques with their parameters and weight costs; use the SVG half, and treat the 3D half as a capped accent.
   - Files: `animation/3d-and-svg-library.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

3. **Here Comes The Sun (powermoves.com)**
   - Why it is among the best / what to take: A pinned horizontal story world built from 118 scenes with the sun on a three-segment bezier (curviness 1.25, Linear.easeNone, about ten tweens per step); the scroll position is the playhead and the whole scene logic is readable inline. Use: a design, build, handover process told as one pinned scene.
   - Files: `animation/code-source/here-comes-the-sun/`, `reverse-engineering/deep-reads-slice-8.md (entry 549)`
   - Source link: https://www.powermoves.com/co-op-solar/how-it-works/

4. **How to Animate SVG Shapes on Scroll (Codrops)**
   - Why it is among the best / what to take: Scroll-scrubbed SVG path morph (data-path-to target, separator viewBox 0 0 100 10) that also drives image clip-path shapes; keep the d and data-path-to command structure identical or the morph garbles. Use: blueprint-style line and shape reveals.
   - Files: `animation/code-source/53-onscroll-path-animations/`, `reverse-engineering/deep-reads-slice-2.md (entry 53)`
   - Source link: https://tympanus.net/codrops/2022/06/08/how-to-animate-svg-shapes-on-scroll/ (Level-1 source page: https://tympanus.net/codrops/)

5. **Fancy SVG Letter Animation (Codrops)**
   - Why it is among the best / what to take: Stroke-dashoffset draw-on (800ms easeOutQuint, delay per path) using layered copies; it needs single-stroke artwork, which makes it the exact draw-on mechanism for annotation and outline lines. Use: draw-on blueprint and annotation lines.
   - Files: `animation/code-source/fancy-svg-letter-animation/`, `reverse-engineering/deep-reads-slice-4.md (entry 258)`
   - Source link: https://tympanus.net/codrops/2016/09/13/fancy-svg-letter-animation/

6. **ScrollTrigger Horizontal Scroll with Pagination (CodePen)**
   - Why it is among the best / what to take: Horizontal pin with x = -(scrollWidth - clientWidth), scrub, pinSpacing and invalidateOnRefresh, with numbered pagination dots: the most phone-legible horizontal pattern in the bank. Use: a project strip with numbered pagination.
   - Files: `animation/code-source/scrolltrigger-horizontal-pagination/`, `reverse-engineering/deep-reads-slice-4.md (entry 270)`
   - Source link: https://codepen.io/akapowl/embed/preview/qBXqKZM/ba638948806ca4adca9dae41178f29c1

7. **Scrollable and Draggable Timeline with GSAP (Codrops)**
   - Why it is among the best / what to take: A scrubbed track tween plus Draggable with drag-scroll sync, reduced motion verified and keyboard handled (inertia needs the Club plugin): a process-strip candidate. Use: an eight-stage process strip (draggable, keyboard-safe).
   - Files: `reverse-engineering/deep-reads-slice-4.md (entry 275)`
   - Source link: https://tympanus.net/codrops/2022/01/03/building-a-scrollable-and-draggable-timeline-with-gsap/ (Level-1 source page: https://tympanus.net/codrops/)

8. **Grid-to-Fullscreen (Codrops)**
   - Why it is among the best / what to take: One reusable plane takes over the clicked grid item to open it fullscreen, with HTML as the fallback: a gallery-to-detail transition. Use: a project gallery that opens fullscreen.
   - Files: `animation/code-source/grid-to-fullscreen/`, `reverse-engineering/deep-reads-slice-1.md (entry 48)`
   - Source link: tympanus.net/Tutorials/GridToFullscreenAnimations

9. **Sticky Grid Scroll (Codrops)**
   - Why it is among the best / what to take: A sticky stage with a phased scroll-driven grid progression of 12 images: the structure behind sticky-stage-with-chapters sections. Use: a sticky-stage portfolio or process section.
   - Files: `animation/code-source/94-sticky-grid-scroll/`, `reverse-engineering/deep-reads-slice-2.md (entry 94)`
   - Source link: https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/

10. **Smooth Horizontal Parallax Gallery, DOM to WebGL (Codrops)**
   - Why it is among the best / what to take: Lerp ease 0.07, images 125% wide at -12.5%, MAX_SHIFT 4/8/10; use the DOM part only, and add the touch support the article leaves as an exercise. Use: a project gallery with horizontal parallax (DOM version).
   - Files: `reverse-engineering/deep-reads-slice-4.md (entry 243)`
   - Source link: https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/

11. **Scale container on scroll with ScrollTrigger (CodePen)**
   - Why it is among the best / what to take: Pinned scrubbed hero that scales its container (scrub 1, clamped start, force3D) with an SVG wave divider; cheap and readable. Use: a pinned scrubbed hero.
   - Files: `animation/code-source/scale-container-scrolltrigger/`, `reverse-engineering/deep-reads-slice-3.md (entry 154)`
   - Source link: https://codepen.io/popjrluq-the-selector/pen/VwNvVWP

12. **Count Up (React Bits)**
   - Why it is among the best / what to take: View-triggered count and odometer modes, duration 2, compact formatting: the trust-stats standard (keep the final number in the HTML as the no-JS fallback). Use: projects, years and warranty stats.
   - Files: `animation/code-source/count-up-reactbits/`, `reverse-engineering/deep-reads-slice-4.md (entry 279)`
   - Source link: https://reactbits.dev/text-animations/count-up

13. **Direction-aware reveals (GreenSock pen pojzxwZ)**
   - Why it is among the best / what to take: The entry vector flips with scroll direction (+/-100px, 1.25s expo, overwrite auto): the top-pick section reveal in the bank, with full page source captured. Use: section reveals.
   - Files: `animation/code-source/pen-40-direction-reveals/`, `reverse-engineering/deep-reads-slice-1.md (entry 40)`
   - Source link: none recorded (the bank records only the pen id pojzxwZ for this entry)

14. **Masked Heading (React Bits)**
   - Why it is among the best / what to take: Reveal presets with exact defaults (rise: duration 1.1, stagger 0.09, spotlightRadius 160), reduced motion verified, and trigger "view" for phones: the hero promise reveal. Use: the hero promise reveal.
   - Files: `animation/code-source/95-masked-heading/`, `reverse-engineering/deep-reads-slice-2.md (entry 95)`
   - Source link: https://reactbits.dev/text-animations/masked-heading

15. **The Architecture Behind Trionn (Codrops)**
   - Why it is among the best / what to take: One shared scroll driver for everything, a 371-frame sequence scrubbed through a single img, Lenis on gsap.ticker, and gsap.matchMedia splitting desktop and mobile logic, with reduced motion verified. Use: one scroll driver for a long portfolio page.
   - Files: `animation/code-source/trionn-architecture/`, `reverse-engineering/deep-reads-slice-3.md (entry 163)`
   - Source link: https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/

16. **CSS scroll()-driven animations (Codrops, Adam Argyle)**
   - Why it is among the best / what to take: Zero-JS animation-timeline: scroll() and view() with named view timelines; Chromium-only at writing, so use it as an enhancement layer and re-check support at build time. Use: a zero-JS reveal layer.
   - Files: `reverse-engineering/deep-reads-slice-4.md (entry 271)`
   - Source link: https://tympanus.net/codrops/2024/01/17/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/

17. **Silo (silosilosilo.com)**
   - Why it is among the best / what to take: A variant configurator with a running total driven by one state object: the discipline to copy for any estimator, quote builder or visualiser. Use: a package builder with a running total.
   - Files: `animation/code-source/98-silo/`, `reverse-engineering/deep-reads-slice-2.md (entry 98)`
   - Source link: https://www.silosilosilo.com/

## Design and design inspiration (15)

1. **High-end remodeling chunk notes (Lane 3)**
   - Why it is among the best / what to take: Per-firm notes from the high-end remodeling scan: design-led firms and what makes their presentation premium.
   - Files: `design/chunk-remodeling-highend.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **KBF Design Gallery (Orlando FL)**
   - Why it is among the best / what to take: A neighbourhood aerial project map and a deed-verified resale ledger: the most original proof in the scan, shown with its honest caveat.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://www.kbfdesigngallery.com

3. **Bath Fitter (national)**
   - Why it is among the best / what to take: The cleanest and fastest franchise site in the scan, with a Design Your Bath tool and a transferable lifetime warranty.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://www.bathfitter.com/us-en/?cid=fbawareness&utm_source=facebook&utm_medium=paid&utm_campaign=fbawareness&utm_keyword=31221941_390640841_212797170&dclid=CL-ttZD2p4YDFRKi0QQdFw4APQ

4. **ReVision Design + Build (Charlotte NC)**
   - Why it is among the best / what to take: The cleanest design-first homepage in the Southeast, with categorised galleries and an award-led hero.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://revisioncharlotte.com/

5. **Abodu (California)**
   - Why it is among the best / what to take: Every model priced all-in on the page (home plus installation) with product-grade presentation.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://abodu.com/models

6. **Varian Construction (Naples FL)**
   - Why it is among the best / what to take: Next.js and Sanity restraint with anti-salesman positioning ("meet Bill, not a salesperson") and one deep testimonial.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://www.varianconstruction.com/?p=201

7. **Fred Beese Builds (Philadelphia PA)**
   - Why it is among the best / what to take: Editorial craft-led design with a founder film-lighting story and style-tagged historic case studies.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://fredbeesebuilds.com/

8. **BOWA (Virginia, source-verified on the bench)**
   - Why it is among the best / what to take: Scored 29 once its source was verified (WordPress and GSAP); the report records that its proof cannot be replicated.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://www.bowa.com/projects/family-spaces/

9. **Quartersawn Design Build**
   - Why it is among the best / what to take: Scored 29 once its source was verified: a hero video confirmed in source (two video tags).
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://quartersawndesignbuild.com/

10. **Bakstad Construction (Httpster)**
   - Why it is among the best / what to take: A real Seattle general contractor (BBB-corroborated, est. 2008): a project-led homepage of project, location and year cards, a press band and a named principal in the footer; the bank marks it the trade-site exemplar. Use: the project-led homepage (project, location, year) and press band for a real general contractor.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 319)`
   - Source link: https://bakstadconstruction.com/ (Level-1 source page: https://httpster.net/style/minimal/)

11. **Lagom Development**
   - Why it is among the best / what to take: A housing-development site on WordPress and Swiper with a surgical GSAP file (two ScrollTriggers, scrub, clamped start): project cards that carry price-from per m2, area, instalment term and homes available, a three-item services accordion, and a two-field name-and-phone consultation form repeated as a popup. Use: project cards that carry price-from, area and instalment, a services accordion and a two-field consultation form.
   - Files: `design/code-source/lagom-development/`, `reverse-engineering/deep-reads-slice-8.md (entry 562)`
   - Source link: https://lagom-development.com/

12. **Septiembre Arquitectura**
   - Why it is among the best / what to take: An architecture studio whose full easing vocabulary is mined (easeInOut and easeInOutCirc dominate), with ScrollTrigger and Swiper galleries: architectural craft with a readable motion system. Use: architectural craft with a readable motion system and Swiper galleries.
   - Files: `design/code-source/septiembre-arquitectura/`, `reverse-engineering/deep-reads-slice-8.md (entry 504)`
   - Source link: https://www.septiembrearquitectura.com/

13. **Smeulders Interieurgroep**
   - Why it is among the best / what to take: An interior fit-out group with the cleanest small GSAP file in its slice (a fullscreen six-project carousel with a counter): a minimal, rebuildable project showcase. Use: a minimal fullscreen project carousel with a counter.
   - Files: `design/code-source/smeulders-interieurgroep/`, `reverse-engineering/deep-reads-slice-8.md (entry 506)`
   - Source link: https://smeulders-ig.nl/

14. **Tillberg Design of Sweden**
   - Why it is among the best / what to take: A design house with the densest ScrollTrigger use in its slice: a scrub ladder (true for ambient, 0.5 for chapters, 1 for lagged elements) over 56 configs, Flickity galleries, and reduced motion handled in CSS and JS. Use: a scrub ladder and accessible premium-interiors motion.
   - Files: `design/code-source/tillberg-design/`, `reverse-engineering/deep-reads-slice-8.md (entry 516)`
   - Source link: https://www.tillbergdesign.com/

15. **Specia1ne (Awwwards, Honorable Mention)**
   - Why it is among the best / what to take: Numbered sections with per-section counters, a live local-time readout, a warm-paper palette and an overlay menu: the paper-technical look that suits trades when kept restrained. Use: the numbered-chapter and counter system for a project portfolio.
   - Files: `design/code-source/specia1ne/`, `reverse-engineering/deep-reads-slice-9.md (entry 569)`
   - Source link: https://specia1ne.com/ (Level-1 source page: https://Www.awwwards.com/websites/Ukraine/?page=1)

## Reverse-engineering / code-level analysis (8)

1. **Remodeling source pass and bench log (Lane 3)**
   - Why it is among the best / what to take: The curl full-source route for the remodeling bench (CRD, BOWA, Neil Kelly, West Shore, Kohler Reveal, Normandy, Quartersawn): stacks and mechanisms verified in source.
   - Files: `reverse-engineering/source-pass-and-bench-log.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **Deep-reads slice 1 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 48 Grid-to-Fullscreen (Codrops); 40 Direction-aware reveals (GreenSock pen pojzxwZ); 15 Olha Lazarieva and Max Milkin; 22 Monolith Studio. Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-1.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

3. **Deep-reads slice 2 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 53 How to Animate SVG Shapes on Scroll (Codrops); 94 Sticky Grid Scroll (Codrops); 95 Masked Heading (React Bits); 98 Silo (silosilosilo.com); 120 Raffael Stueken. Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-2.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

4. **Deep-reads slice 3 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 154 Scale container on scroll with ScrollTrigger (CodePen); 163 The Architecture Behind Trionn (Codrops). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-3.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

5. **Deep-reads slice 4 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 258 Fancy SVG Letter Animation (Codrops); 270 ScrollTrigger Horizontal Scroll with Pagination (CodePen); 275 Scrollable and Draggable Timeline with GSAP (Codrops); 243 Smooth Horizontal Parallax Gallery, DOM to WebGL (Codrops); 279 Count Up (React Bits); 271 CSS scroll()-driven animations (Codrops, Adam Argyle). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-4.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

6. **Deep-reads slice 5 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 317 Digital Butlers (GSAP Showcase); 314 Some Inspiration for Pricing Tables (Codrops); 306 Accordion with CSS3 (Codrops); 313 Nifty Modal Window Effects (Codrops); 310 Inspiration for Text Input Effects (Codrops); 348 How to Create a Circular Progress Button (Codrops); 319 Bakstad Construction (Httpster). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-5.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

7. **Deep-reads slice 8 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 549 Here Comes The Sun (powermoves.com); 561 Iper (iper.com.au); 531 BLK - Design Your Own (dyo.blksport.com); 562 Lagom Development; 504 Septiembre Arquitectura; 506 Smeulders Interieurgroep; 516 Tillberg Design of Sweden. Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-8.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

8. **Deep-reads slice 9 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 569 Specia1ne (Awwwards, Honorable Mention). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-9.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

## Structure, visual hierarchy, UI/UX and conversion (32)

1. **Remodeling industry report (shortlist, deep five, shared crowns, 16 expansion waves)**
   - Why it is among the best / what to take: The remodeling report: the three machines in the trade (one-day bath, design-build, specialist), 20 scored sites, five deep reads, the shared-by-role crowns and 16 waves; every company named in this pack has its entry here.
   - Files: `structure-uiux/remodeling.md`
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

6. **General contractors report (Lane 5)**
   - Why it is among the best / what to take: The general-contractor and design-build scan (202 firms opened): shortlist and verdicts for the large remodeler-GC segment that overlaps remodeling.
   - Files: `structure-uiux/general-contractors.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

7. **Lane 5 segment A top 8 (US national design-build / remodeler-GC)**
   - Why it is among the best / what to take: The top eight of fifty opened large design-build and remodeler-GC homepages, each scored and described.
   - Files: `structure-uiux/lane5-partA-top.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

8. **Elbaz Construction (Miami FL), co-template skeleton**
   - Why it is among the best / what to take: Video hero and video service tiles, drag before/after, an eight-stage process with week ranges and four-lender financing before scoping; the scroll-order skeleton to copy (cut its video weight).
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://elbazconstructioncorp.com/

9. **PHS Renovations (Winnipeg), co-template skeleton**
   - Why it is among the best / what to take: An Investment-and-Timeline figure on every service card, week-stamped design artefacts and a warranty clock ("you sign off when you are happy"): the most template-relevant 31 in the lane.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://phsrenovations.ca/

10. **CMK Construction (Tampa FL)**
   - Why it is among the best / what to take: Proof stacked before services, drag sliders, a project-count map, a vs-competitors table and the showroom as a process step.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://cmkconstructioninc.com/

11. **Home Gyms Design (UK)**
   - Why it is among the best / what to take: Package tiers and a per-piece price list that reprices live by finish selection with an add-to-enquiry cart: the quote path between a form and a shop.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://homegymsdesign.com/

12. **LYKORA (Morocco)**
   - Why it is among the best / what to take: Pricing as numbered sheets, a calculator with an honest footnote and a productised defect-check handover (do not copy its uncheckable absolutes).
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://lykora.space/

13. **Phoenix Home Remodeling (Arizona)**
   - Why it is among the best / what to take: Price fixed after the 3D design, with published cost ranges, timelines, a before/after slider and four video testimonials.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://phxhomeremodeling.com/services/kitchen-remodeling/tempe-az/

14. **Harmony Basements (Canada)**
   - Why it is among the best / what to take: A $250-per-day late penalty, lifetime warranty, published 2026 pricing bands and a cost calculator: a contractual promise with a number.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://harmonybasements.ca/services/

15. **Huffmans Construction Group (Naples FL)**
   - Why it is among the best / what to take: Credentials linked to their issuers, a sourced cost guide and a named callback in the form.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://naplesconstruction.net/

16. **OakWood Designers & Builders (Canada)**
   - Why it is among the best / what to take: Since 1956, an itemised fixed-price contract, a tiered warranty menu (2/5/10 years) and a client portal.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://oakwood.ca/renovation-experts/

17. **Kerr Design Build (Canada)**
   - Why it is among the best / what to take: A branded five-phase Kerr System including 3D and story-led case studies.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://kerrdesign.build/

18. **Build Team (London UK)**
   - Why it is among the best / what to take: A live booking calendar in the hero flow, 1,750+ projects, per-sqm cost FAQs and 3D tours.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://www.buildteam.com/

19. **Ryan & Voigt (Naples FL)**
   - Why it is among the best / what to take: Weak Wix design with elite trust content: a Five-Phase system, budget in phase 1 and 1- and 11-month walkthroughs.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://www.ryanandvoigt.com/

20. **Faith Construction One (Jacksonville FL)**
   - Why it is among the best / what to take: A Locked Scope promise (no scope changes after signing) on a clean one-pager with 500+ projects and named reviews.
   - Files: `structure-uiux/remodeling.md (entry for this firm)`
   - Source link: https://www.faithconstructionone.com/

21. **Airoom (US design-build)**
   - Why it is among the best / what to take: A deep-read design-build remodeler: a Featured Projects portfolio, a 68-year history claim, a named S.T.A.R.T. Process and a warranty page.
   - Files: `structure-uiux/general-contractors.md (entry for this firm)`
   - Source link: https://www.airoom.com/

22. **Digital Butlers (GSAP Showcase)**
   - Why it is among the best / what to take: The quote-form blueprint: budget radios before contact, a stated quote-in-48-hours promise, a transparent pricing FAQ with the payment split published, and a "Proof, not promises" stats band. Use: qualify budget before contact and state the response time.
   - Files: `structure-uiux/code-source/digital-butlers/`, `reverse-engineering/deep-reads-slice-5.md (entry 317)`
   - Source link: https://gsap.com/showcase/ (as recorded in candidates-master.csv)

23. **Olha Lazarieva and Max Milkin**
   - Why it is among the best / what to take: A budget-radio contact form (5K-10K / 10K-20K / more) that qualifies before it asks for contact details, plus a custom scroll container that keeps mobile browser bars fixed. Use: the budget-radio form (Advantage pattern).
   - Files: `reverse-engineering/deep-reads-slice-1.md (entry 15)`
   - Source link: olhalazarieva.com / maxmilkin.com

24. **Iper (iper.com.au)**
   - Why it is among the best / what to take: A six-step quote overlay behind a persistent sticky quote button with a step indicator and a stated time promise: the model for a sticky-entry multi-step quote. Use: a sticky consultation entry with step indicator and time promise.
   - Files: `structure-uiux/code-source/iper/`, `reverse-engineering/deep-reads-slice-8.md (entry 561)`
   - Source link: https://iper.com.au/

25. **Some Inspiration for Pricing Tables (Codrops)**
   - Why it is among the best / what to take: Twelve named three-tier pricing sets with real prices: the reference for tier tables and plan comparisons. Use: package tiers with real prices.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 314)`
   - Source link: https://tympanus.net/codrops/2015/11/19/some-inspiration-for-pricing-tables/

26. **Accordion with CSS3 (Codrops)**
   - Why it is among the best / what to take: CSS-only :checked accordion (checkbox, radio and default-open variants); the article warns that some mobile browsers miss label clicks, so test on phones. Use: the process and FAQ accordion.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 306)`
   - Source link: https://tympanus.net/codrops/2012/02/21/accordion-with-css3/

27. **Nifty Modal Window Effects (Codrops)**
   - Why it is among the best / what to take: Nineteen CSS modal transitions (Fade & Scale, Newspaper, Blur, 3D Slit and more) for quote forms and lightboxes. Use: the consultation modal.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 313)`
   - Source link: https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/

28. **Inspiration for Text Input Effects (Codrops)**
   - Why it is among the best / what to take: Fourteen named floating-label field styles: ready-made treatments for quote-form fields. Use: form fields.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 310)`
   - Source link: https://tympanus.net/codrops/2015/01/08/inspiration-text-input-effects/

29. **How to Create a Circular Progress Button (Codrops)**
   - Why it is among the best / what to take: A submit button that morphs into a progress ring and draws a tick or a cross: clear form feedback without a page change. Use: submit feedback.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 348)`
   - Source link: https://tympanus.net/codrops/2014/04/09/how-to-create-a-circular-progress-button/

30. **Monolith Studio**
   - Why it is among the best / what to take: The best full service-business blueprint in its chunk: team cards with style tags, a Google five-star strip, knowledge-hub cards, a booking CTA and a full directory footer. Use: the full-service-business blueprint and directory footer.
   - Files: `structure-uiux/code-source/monolith-studio/`, `reverse-engineering/deep-reads-slice-1.md (entry 22)`
   - Source link: monolithstudio.com

31. **Raffael Stueken**
   - Why it is among the best / what to take: Lo-fi, semantic-HTML structure with numbered sections and a flash-fade mask under 2 KB of JS: the most portable structure and entrance timing in its chunk. Use: numbered sections and a flash-fade image mask.
   - Files: `structure-uiux/code-source/120-raffael-stuken/`, `reverse-engineering/deep-reads-slice-2.md (entry 120)`
   - Source link: https://raffaelstueken.de/

32. **BLK - Design Your Own (dyo.blksport.com)**
   - Why it is among the best / what to take: A live-preview configurator: the product is rendered as inline SVG (59 SVGs) that repaints on every choice, with cart-pop feedback and one easeInOutCubic app token; the pattern for visualisers and system builders. Use: a live-preview package or finish configurator.
   - Files: `structure-uiux/code-source/blk-design-your-own/`, `reverse-engineering/deep-reads-slice-8.md (entry 531)`
   - Source link: https://dyo.blksport.com/
