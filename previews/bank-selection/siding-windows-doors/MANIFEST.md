# MANIFEST: siding-windows-doors

60 picks. Every file listed is copied whole from the research bank into this folder (paths are relative to this folder). WEB-SKILLS.md is the only non-bank file (the old SKILLS-CATALOG was removed 2026-10-28 on the owner's order; WEB-SKILLS is the utmost-priority catalog).
Source links are taken verbatim from the bank (CSV url column, deep-read entry heading or body, candidates-master.csv); where none is recorded the entry says so.

## Animation (13)

1. **Animation parameter library**
   - Why it is among the best / what to take: Exact GSAP parameters (durations, easings, staggers, scrub values, tokens) merged from the deep reads: the numbers to use instead of approximations.
   - Files: `animation/animation-parameter-library.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **3D and SVG technique library**
   - Why it is among the best / what to take: SVG draw, morph and path techniques and 3D techniques with their parameters and weight costs; use the SVG half, and treat the 3D half as a capped accent.
   - Files: `animation/3d-and-svg-library.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

3. **Color Customizer App for a 3D Model (Codrops)**
   - Why it is among the best / what to take: Part-name matching and material swap with a swatch tray and touch OrbitControls: the base mechanic of a colour visualiser. Use: the base mechanic of a siding or window colour visualiser.
   - Files: `animation/code-source/color-customizer-3d/`, `reverse-engineering/deep-reads-slice-3.md (entry 140)`
   - Source link: https://tympanus.net/Tutorials/3DModelCustomizer/

4. **Mouse-Following Square Lens (Codrops)**
   - Why it is among the best / what to take: Step-mask square lens with pointer ease 0.1 and radial RGB shift; WebGL (about 589 KB of Three.js), so take the pointer-eased mask idea and rebuild it in the DOM. Use: a pointer-eased inspection lens for before/after (rebuild in the DOM, not WebGL).
   - Files: `animation/code-source/125-square-lens/`, `reverse-engineering/deep-reads-slice-2.md (entry 125)`
   - Source link: https://tympanus.net/codrops/2026/08/25/building-a-mouse-following-square-lens-effect-with-three-js-and-glsl/

5. **Grid-to-Fullscreen (Codrops)**
   - Why it is among the best / what to take: One reusable plane takes over the clicked grid item to open it fullscreen, with HTML as the fallback: a gallery-to-detail transition. Use: a project gallery that opens fullscreen.
   - Files: `animation/code-source/grid-to-fullscreen/`, `reverse-engineering/deep-reads-slice-1.md (entry 48)`
   - Source link: tympanus.net/Tutorials/GridToFullscreenAnimations

6. **Sticky Grid Scroll (Codrops)**
   - Why it is among the best / what to take: A sticky stage with a phased scroll-driven grid progression of 12 images: the structure behind sticky-stage-with-chapters sections. Use: a product or project sticky-stage section.
   - Files: `animation/code-source/94-sticky-grid-scroll/`, `reverse-engineering/deep-reads-slice-2.md (entry 94)`
   - Source link: https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/

7. **Scale container on scroll with ScrollTrigger (CodePen)**
   - Why it is among the best / what to take: Pinned scrubbed hero that scales its container (scrub 1, clamped start, force3D) with an SVG wave divider; cheap and readable. Use: a pinned scrubbed hero for real-work footage.
   - Files: `animation/code-source/scale-container-scrolltrigger/`, `reverse-engineering/deep-reads-slice-3.md (entry 154)`
   - Source link: https://codepen.io/popjrluq-the-selector/pen/VwNvVWP

8. **ScrollTrigger Horizontal Scroll with Pagination (CodePen)**
   - Why it is among the best / what to take: Horizontal pin with x = -(scrollWidth - clientWidth), scrub, pinSpacing and invalidateOnRefresh, with numbered pagination dots: the most phone-legible horizontal pattern in the bank. Use: a project strip with numbered pagination.
   - Files: `animation/code-source/scrolltrigger-horizontal-pagination/`, `reverse-engineering/deep-reads-slice-4.md (entry 270)`
   - Source link: https://codepen.io/akapowl/embed/preview/qBXqKZM/ba638948806ca4adca9dae41178f29c1

9. **Count Up (React Bits)**
   - Why it is among the best / what to take: View-triggered count and odometer modes, duration 2, compact formatting: the trust-stats standard (keep the final number in the HTML as the no-JS fallback). Use: stats in trade units such as square feet installed.
   - Files: `animation/code-source/count-up-reactbits/`, `reverse-engineering/deep-reads-slice-4.md (entry 279)`
   - Source link: https://reactbits.dev/text-animations/count-up

10. **Direction-aware reveals (GreenSock pen pojzxwZ)**
   - Why it is among the best / what to take: The entry vector flips with scroll direction (+/-100px, 1.25s expo, overwrite auto): the top-pick section reveal in the bank, with full page source captured. Use: light section reveals on a quote-first page.
   - Files: `animation/code-source/pen-40-direction-reveals/`, `reverse-engineering/deep-reads-slice-1.md (entry 40)`
   - Source link: none recorded (the bank records only the pen id pojzxwZ for this entry)

11. **CSS scroll()-driven animations (Codrops, Adam Argyle)**
   - Why it is among the best / what to take: Zero-JS animation-timeline: scroll() and view() with named view timelines; Chromium-only at writing, so use it as an enhancement layer and re-check support at build time. Use: a zero-JS reveal layer.
   - Files: `reverse-engineering/deep-reads-slice-4.md (entry 271)`
   - Source link: https://tympanus.net/codrops/2024/01/17/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/

12. **Smooth Horizontal Parallax Gallery, DOM to WebGL (Codrops)**
   - Why it is among the best / what to take: Lerp ease 0.07, images 125% wide at -12.5%, MAX_SHIFT 4/8/10; use the DOM part only, and add the touch support the article leaves as an exercise. Use: a project gallery with subtle horizontal parallax (DOM version).
   - Files: `reverse-engineering/deep-reads-slice-4.md (entry 243)`
   - Source link: https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/

13. **Silo (silosilosilo.com)**
   - Why it is among the best / what to take: A variant configurator with a running total driven by one state object: the discipline to copy for any estimator, quote builder or visualiser. Use: the instant-price half of a visualiser-plus-estimate flow.
   - Files: `animation/code-source/98-silo/`, `reverse-engineering/deep-reads-slice-2.md (entry 98)`
   - Source link: https://www.silosilosilo.com/

## Design and design inspiration (6)

1. **Renewal by Andersen**
   - Why it is among the best / what to take: The premium national system (28/35): a most-awarded proof story, an exclusive-product narrative, a named four-step process and a product-by-option page matrix.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.renewalbyandersen.com/

2. **Erdmann Exterior Designs**
   - Why it is among the best / what to take: Design-first local operator: renderings before signing and before/after galleries by suburb.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.erdmannexteriors.com/

3. **Pella (manufacturer)**
   - Why it is among the best / what to take: A before/after gallery and a product-finder quiz; a design and tool benchmark whose consultation CTA is not a quote model.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.pella.com/

4. **Anglian Home Improvements (UK)**
   - Why it is among the best / what to take: An accreditation-wall trust model (BBA, GGF, TrustMark) with a hero visualiser.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.anglianhome.co.uk/

5. **James Hardie (manufacturer)**
   - Why it is among the best / what to take: A design and visualiser benchmark kept out of the operator shortlist on trade fit.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.jameshardie.com/

6. **Scott Exteriors (Dallas-Fort Worth)**
   - Why it is among the best / what to take: Premium design-led local with a WebGL shader hero evidenced: the high end of siding craft.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://scottexteriors.com/

## Reverse-engineering / code-level analysis (8)

1. **Siding source pass (curl evidence)**
   - Why it is among the best / what to take: The lead's curl source pass over the siding and windows top tier: what is verifiably in the HTML (stacks, tel: counts, JSON-LD, price mentions).
   - Files: `reverse-engineering/lane4-siding-source-pass.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **Siding & windows scan table (248 firms, scores and verdicts with URLs)**
   - Why it is among the best / what to take: The full normalised scan table: 248 firms with seven sub-scores, totals, one-line verdicts and URLs, so any firm named in the report can be traced to its link.
   - Files: `reverse-engineering/lane4-siding-scan.csv`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

3. **Deep-reads slice 1 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 48 Grid-to-Fullscreen (Codrops); 40 Direction-aware reveals (GreenSock pen pojzxwZ); 15 Olha Lazarieva and Max Milkin; 22 Monolith Studio. Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-1.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

4. **Deep-reads slice 2 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 125 Mouse-Following Square Lens (Codrops); 94 Sticky Grid Scroll (Codrops); 98 Silo (silosilosilo.com). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-2.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

5. **Deep-reads slice 3 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 140 Color Customizer App for a 3D Model (Codrops); 154 Scale container on scroll with ScrollTrigger (CodePen). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-3.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

6. **Deep-reads slice 4 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 270 ScrollTrigger Horizontal Scroll with Pagination (CodePen); 279 Count Up (React Bits); 271 CSS scroll()-driven animations (Codrops, Adam Argyle); 243 Smooth Horizontal Parallax Gallery, DOM to WebGL (Codrops). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-4.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

7. **Deep-reads slice 5 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 317 Digital Butlers (GSAP Showcase); 314 Some Inspiration for Pricing Tables (Codrops); 306 Accordion with CSS3 (Codrops); 313 Nifty Modal Window Effects (Codrops); 310 Inspiration for Text Input Effects (Codrops); 348 How to Create a Circular Progress Button (Codrops); 316 Tooltip Styles Inspiration (Codrops). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-5.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

8. **Deep-reads slice 8 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 531 BLK - Design Your Own (dyo.blksport.com); 561 Iper (iper.com.au). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-8.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

## Structure, visual hierarchy, UI/UX and conversion (33)

1. **Siding & windows industry report (funnel, deep five, crowns and expansion waves)**
   - Why it is among the best / what to take: The siding and windows report: the scan funnel, the top-20 shortlist, five deep reads, the ratified crowns (Austin Pro and Feldco), the synthesis and seven expansion waves; every company named in this pack has its entry here.
   - Files: `structure-uiux/siding-windows.md`
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

6. **Austin Pro Siding, Windows & Roofing (Austin TX), crown 1**
   - Why it is among the best / what to take: The documented-project transparency model (29/35, crown ratified after a filed challenge): invoiced price distributions with a median band, price bands on draggable before/after pairs, a project map, worked APR financing and installer-tier proof, with the sample caveat printed.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.austinprosiding.com/

7. **Feldco**
   - Why it is among the best / what to take: Crown 2 (28/35), the tooling and video template: hero video of real work, count-up stats in trade units, an upload-photo visualiser and per-product visualisers, at only 157 KB.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.4feldco.com/

8. **Allied Siding & Windows (Texas)**
   - Why it is among the best / what to take: The anti-pressure system on WordPress: published price ranges, a 30-day written quote stated in the hero, a disqualifier section, repair-over-replacement honesty and installer-tier proof.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://alliedsidingandwindows.com/

9. **Pacific Exteriors**
   - Why it is among the best / what to take: Siding-led (27/35) with a problem-trio opening, a price valid for one year and an own-photo design tool.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.pacificexteriorsllc.com/

10. **West Shore Home (location pages)**
   - Why it is among the best / what to take: The location-page system: one page per town carrying local cost and permit facts and a 3D visualiser (the report warns off its fine-print promo and 1.17 MB weight).
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://westshorehome.com/locations/charlotte-nc/

11. **Window World**
   - Why it is among the best / what to take: The guaranteed-low-price national template, and the lightest page in the source pass (96 KB).
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.windowworld.com/

12. **Champion Windows**
   - Why it is among the best / what to take: Factory-direct Design-Build-Install-Guarantee with a same-day exact quote.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.championwindow.com/

13. **Mad City Windows**
   - Why it is among the best / what to take: A ZIP-first three-question quote, 4.9 stars from 945 reviews and 13 video testimonials.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.madcitywindows.com/

14. **Castle Windows**
   - Why it is among the best / what to take: A $75-per-window trade-in tier table and a video-poster hero.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.castlewindows.com/

15. **Expo Home Improvement**
   - Why it is among the best / what to take: Draggable before/after sliders by city and financing cards from $149/mo: the honest middle on financing.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.expohomeimprovement.com/

16. **DaBella**
   - Why it is among the best / what to take: A quote form three times on one page and financing as its own process step.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.dabella.us/

17. **Thompson Creek Window Company (cautionary)**
   - Why it is among the best / what to take: A "71,000+ 5-star reviews" headline against a 4.5-star/3,300 footer: the bank's cautionary tale for keeping one review number everywhere.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.thompsoncreek.com/

18. **Sunrise Windows and Doors (Florida)**
   - Why it is among the best / what to take: Publishes $7,495 for ten windows and $13,495 for ten impact windows: small-operator price transparency.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://sunrisewindowsflorida.com/windows-and-doors-replacement/

19. **Continental Siding**
   - Why it is among the best / what to take: Story-headline video reviews and an HGTV/BBB media wall as proof.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://continentalsiding.com/best-siding-company/

20. **United Home Experts**
   - Why it is among the best / what to take: A recent-projects map and fun-fact counters, with 4.9 stars from 3,050+ reviews.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://unitedhomeexperts.com/

21. **Cornerstone Renovations**
   - Why it is among the best / what to take: A visualiser, estimator and ranges trio: the closest verified evidence for fusing a visualiser with an estimate.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.cornerstonerenovations-llc.com/

22. **Hatch Homes**
   - Why it is among the best / what to take: A visualiser with live-updating pricing: evidence that the instant-price half of the flagship flow works.
   - Files: `structure-uiux/siding-windows.md (entry for this firm)`
   - Source link: https://www.hatchyourhome.com/

23. **BLK - Design Your Own (dyo.blksport.com)**
   - Why it is among the best / what to take: A live-preview configurator: the product is rendered as inline SVG (59 SVGs) that repaints on every choice, with cart-pop feedback and one easeInOutCubic app token; the pattern for visualisers and system builders. Use: the live-preview configurator pattern for a house visualiser.
   - Files: `structure-uiux/code-source/blk-design-your-own/`, `reverse-engineering/deep-reads-slice-8.md (entry 531)`
   - Source link: https://dyo.blksport.com/

24. **Digital Butlers (GSAP Showcase)**
   - Why it is among the best / what to take: The quote-form blueprint: budget radios before contact, a stated quote-in-48-hours promise, a transparent pricing FAQ with the payment split published, and a "Proof, not promises" stats band. Use: the written-quote form: budget before contact and a stated turnaround.
   - Files: `structure-uiux/code-source/digital-butlers/`, `reverse-engineering/deep-reads-slice-5.md (entry 317)`
   - Source link: https://gsap.com/showcase/ (as recorded in candidates-master.csv)

25. **Iper (iper.com.au)**
   - Why it is among the best / what to take: A six-step quote overlay behind a persistent sticky quote button with a step indicator and a stated time promise: the model for a sticky-entry multi-step quote. Use: a sticky "get my written quote" entry with step indicator and validity or time promise.
   - Files: `structure-uiux/code-source/iper/`, `reverse-engineering/deep-reads-slice-8.md (entry 561)`
   - Source link: https://iper.com.au/

26. **Olha Lazarieva and Max Milkin**
   - Why it is among the best / what to take: A budget-radio contact form (5K-10K / 10K-20K / more) that qualifies before it asks for contact details, plus a custom scroll container that keeps mobile browser bars fixed. Use: budget-radio qualification before contact details.
   - Files: `reverse-engineering/deep-reads-slice-1.md (entry 15)`
   - Source link: olhalazarieva.com / maxmilkin.com

27. **Some Inspiration for Pricing Tables (Codrops)**
   - Why it is among the best / what to take: Twelve named three-tier pricing sets with real prices: the reference for tier tables and plan comparisons. Use: trade-in and package tier tables.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 314)`
   - Source link: https://tympanus.net/codrops/2015/11/19/some-inspiration-for-pricing-tables/

28. **Accordion with CSS3 (Codrops)**
   - Why it is among the best / what to take: CSS-only :checked accordion (checkbox, radio and default-open variants); the article warns that some mobile browsers miss label clicks, so test on phones. Use: a CSS-only FAQ that ends in the single CTA.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 306)`
   - Source link: https://tympanus.net/codrops/2012/02/21/accordion-with-css3/

29. **Nifty Modal Window Effects (Codrops)**
   - Why it is among the best / what to take: Nineteen CSS modal transitions (Fade & Scale, Newspaper, Blur, 3D Slit and more) for quote forms and lightboxes. Use: the quote modal.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 313)`
   - Source link: https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/

30. **Inspiration for Text Input Effects (Codrops)**
   - Why it is among the best / what to take: Fourteen named floating-label field styles: ready-made treatments for quote-form fields. Use: quote-form fields.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 310)`
   - Source link: https://tympanus.net/codrops/2015/01/08/inspiration-text-input-effects/

31. **How to Create a Circular Progress Button (Codrops)**
   - Why it is among the best / what to take: A submit button that morphs into a progress ring and draws a tick or a cross: clear form feedback without a page change. Use: submit feedback.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 348)`
   - Source link: https://tympanus.net/codrops/2014/04/09/how-to-create-a-circular-progress-button/

32. **Tooltip Styles Inspiration (Codrops)**
   - Why it is among the best / what to take: Nine SVG-shaped tooltip styles for "what can change this price" explanations; add a tap fallback for phones. Use: explanations of what moves a published price.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 316)`
   - Source link: https://tympanus.net/codrops/2014/10/07/tooltip-styles-inspiration/

33. **Monolith Studio**
   - Why it is among the best / what to take: The best full service-business blueprint in its chunk: team cards with style tags, a Google five-star strip, knowledge-hub cards, a booking CTA and a full directory footer. Use: the directory footer and service-business structure.
   - Files: `structure-uiux/code-source/monolith-studio/`, `reverse-engineering/deep-reads-slice-1.md (entry 22)`
   - Source link: monolithstudio.com
