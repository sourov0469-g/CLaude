# MANIFEST: hvac

52 picks. Every file listed is copied whole from the research bank into this folder (paths are relative to this folder). WEB-SKILLS.md is the only non-bank file (the old SKILLS-CATALOG was removed 2026-10-28 on the owner's order; WEB-SKILLS is the utmost-priority catalog).
Source links are taken verbatim from the bank (CSV url column, deep-read entry heading or body, candidates-master.csv); where none is recorded the entry says so.

## Animation (10)

1. **Animation parameter library**
   - Why it is among the best / what to take: Exact GSAP parameters (durations, easings, staggers, scrub values, tokens) merged from the deep reads: the numbers to use instead of approximations.
   - Files: `animation/animation-parameter-library.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **Direction-aware reveals (GreenSock pen pojzxwZ)**
   - Why it is among the best / what to take: The entry vector flips with scroll direction (+/-100px, 1.25s expo, overwrite auto): the top-pick section reveal in the bank, with full page source captured. Use: section reveals that stay light on a conversion-first page.
   - Files: `animation/code-source/pen-40-direction-reveals/`, `reverse-engineering/deep-reads-slice-1.md (entry 40)`
   - Source link: none recorded (the bank records only the pen id pojzxwZ for this entry)

3. **Count Up (React Bits)**
   - Why it is among the best / what to take: View-triggered count and odometer modes, duration 2, compact formatting: the trust-stats standard (keep the final number in the HTML as the no-JS fallback). Use: review count, years and jobs-done stats in the hero strip.
   - Files: `animation/code-source/count-up-reactbits/`, `reverse-engineering/deep-reads-slice-4.md (entry 279)`
   - Source link: https://reactbits.dev/text-animations/count-up

4. **CSS scroll()-driven animations (Codrops, Adam Argyle)**
   - Why it is among the best / what to take: Zero-JS animation-timeline: scroll() and view() with named view timelines; Chromium-only at writing, so use it as an enhancement layer and re-check support at build time. Use: a zero-JS reveal layer for a fast page (the report finds no HVAC site with real motion craft).
   - Files: `reverse-engineering/deep-reads-slice-4.md (entry 271)`
   - Source link: https://tympanus.net/codrops/2024/01/17/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/

5. **GSAP Marquee Text (GreenSock pen)**
   - Why it is among the best / what to take: The horizontalLoop helper (speed 5, paddingRight 100, started after document.fonts.ready): the reliable seamless marquee for project, brand or credential strips. Use: a partner-brand or review marquee.
   - Files: `animation/code-source/gsap-marquee-text-codepen/`, `reverse-engineering/deep-reads-slice-3.md (entry 161)`
   - Source link: https://codepen.io/GreenSock/pen/wvZMwez

6. **Dynamic Shape Overlays (Codrops)**
   - Why it is among the best / what to take: Vanilla multi-layer SVG overlay (numPoints 18, 600ms, per-point and per-path delays) that is mobile-menu ready; note the older-Safari arrow-function caveat. Use: the mobile menu overlay.
   - Files: `animation/code-source/dynamic-shape-overlays/`, `reverse-engineering/deep-reads-slice-3.md (entry 150)`
   - Source link: https://tympanus.net/Development/ShapeOverlays/

7. **Shazam-Like Morphing Button (Codrops)**
   - Why it is among the best / what to take: An SVG morph behind a real button (button to circle to card, content transition 0.4s) with the mobile Safari workarounds in the article: a call-to-contact CTA transition. Use: a "Call now" to contact-card CTA transition.
   - Files: `animation/code-source/shazam-morphing-button/`, `reverse-engineering/deep-reads-slice-4.md (entry 255)`
   - Source link: https://tympanus.net/codrops/2015/11/24/shazam-like-morphing-button-effect/

8. **Silo (silosilosilo.com)**
   - Why it is among the best / what to take: A variant configurator with a running total driven by one state object: the discipline to copy for any estimator, quote builder or visualiser. Use: the system-builder or estimator state object.
   - Files: `animation/code-source/98-silo/`, `reverse-engineering/deep-reads-slice-2.md (entry 98)`
   - Source link: https://www.silosilosilo.com/

9. **GSAP Pin Sidebar (CodePen)**
   - Why it is among the best / what to take: A pinned step-through with an indicator rail (start top bottom, end +=100% x points): the cleanest process pattern in the bank. Use: a diagnose, quote, install process step-through.
   - Files: `animation/code-source/gsap-pin-sidebar/`, `reverse-engineering/deep-reads-slice-3.md (entry 153)`
   - Source link: https://codepen.io/akapowl/pen/poRdoLV/9b99361db3839f1169cdc0f278746ee5

10. **Shopify Editions Winter '26**
   - Why it is among the best / what to take: A complete motion-token system (scroll .6s cubic-bezier(.41,.19,.13,.95), fade .52s, slide .6s) plus Roman-numeral chapter navigation: the model for one timing-token block driving all CSS motion. Use: one timing-token block for all CSS motion.
   - Files: `animation/code-source/58-shopify-editions-winter26/`, `reverse-engineering/deep-reads-slice-2.md (entry 58)`
   - Source link: https://www.shopify.com/editions/winter2026

## Design and design inspiration (1)

1. **Evergreen Home Heating & Energy (Seattle WA)**
   - Why it is among the best / what to take: The craft benchmark: the cleanest copy and design in the HVAC scan and the most transparent financing maths, in 92 KB of HTML.
   - Files: `reverse-engineering/trade-site-sources/evergreen.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://evergreenhomeheatingandenergy.com/

## Reverse-engineering / code-level analysis (23)

1. **Lane 2 source-level findings (roofing and HVAC top tier)**
   - Why it is among the best / what to take: Terminal curl of the live HTML and bundles of the top tier (Cooling Co, Expo, Strike Force, One Hour, Service Experts, Fox among them): which stacks and mechanisms are really in the source.
   - Files: `reverse-engineering/lane2-source-findings.md`
   - Source link: none recorded (bank-internal compilation; the links for each entry are inside the file)

2. **The Cooling Company (Las Vegas NV), crown 1**
   - Why it is among the best / what to take: The transparency machine (30/35): a priced hero offer ($79 diagnostics), licence numbers and zero board complaints in the hero, a 12-month buyback, and published price ranges with APR.
   - Files: `reverse-engineering/trade-site-sources/coolingco.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://thecoolingco.com/

3. **Strike Force HVAC (Dallas TX), crown 2**
   - Why it is among the best / what to take: Best small-firm trust architecture in TX (31/35): a symptom picker in the hero, three promises printed on every ticket and real job photos.
   - Files: `reverse-engineering/trade-site-sources/strikeforce.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.strikeforceac.com/

4. **AirWorks Solutions (Camarillo CA)**
   - Why it is among the best / what to take: The planned-purchase model (31/35): an interactive system calculator with published ranges and an "effective net monthly" figure, built with a CSS backstop so the conversion layer never waits on motion.
   - Files: `reverse-engineering/trade-site-sources/airworks.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://airworkssolutions.com/

5. **Champion Air (Scottsdale/Phoenix)**
   - Why it is among the best / what to take: An independent second firm running the same calculator blueprint as AirWorks: the strongest validation the planned-purchase pattern has.
   - Files: `reverse-engineering/trade-site-sources/championair.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://championair.com/

6. **One Hour Heating & Air (US national)**
   - Why it is among the best / what to take: 201,360 reviews in the hero plus a trademarked trust trio: proof placement beats proof volume.
   - Files: `reverse-engineering/trade-site-sources/onehour.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.onehourheatandair.com/

7. **Expo Heating & Cooling (Spring TX)**
   - Why it is among the best / what to take: The best CTA architecture in the scan: a situation router shown twice and tools that need no phone number (on the heaviest page, 2.03 MB, so take the structure, not the weight).
   - Files: `reverse-engineering/trade-site-sources/expo.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.expoheatingcooling.com/

8. **Service Experts (US national)**
   - Why it is among the best / what to take: A coupon carousel as the offer system and an Advantage lease from $155/mo; its one structural sin is the phone number hidden in the footer.
   - Files: `reverse-engineering/trade-site-sources/serviceexperts.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.serviceexperts.com/

9. **Fox Service Company (Austin TX)**
   - Why it is among the best / what to take: The hero kills the after-hours-fee fear and offers $0-for-12-months, with a Scorpion video hero.
   - Files: `reverse-engineering/trade-site-sources/fox.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.foxservice.com/

10. **London AirCon (London UK)**
   - Why it is among the best / what to take: Best UK entry: priced installs and a two-working-hours response deadline.
   - Files: `reverse-engineering/trade-site-sources/londonaircon.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.london-aircon.uk/

11. **A.B. May (Kansas City MO)**
   - Why it is among the best / what to take: Published plan tiers and a sticky mobile Text/Call/Book bar, with 17,058 reviews buried in footer data: the proof-placement cautionary tale.
   - Files: `reverse-engineering/trade-site-sources/abmay.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.abmay.com/

12. **Deljo Heating & Cooling (Chicago IL)**
   - Why it is among the best / what to take: Membership as proof: 3,800+ active agreements published, and the freshest review feed opened in the scan.
   - Files: `reverse-engineering/trade-site-sources/deljo.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://deljoheating.com/

13. **Estes Services (Atlanta GA)**
   - Why it is among the best / what to take: Hero stats that sell: 4.9 stars, 6,000+ reviews, since 1949, 1M+ jobs; heritage and volume beat adjectives.
   - Files: `reverse-engineering/trade-site-sources/estes.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.estesair.com/

14. **Chills On Wheels (Jacksonville FL)**
   - Why it is among the best / what to take: The most stealable offer stack in the Florida set (100% financing-approval guarantee, Comfort Club $18.88/mo) wearing weak design: take the offers, not the look.
   - Files: `reverse-engineering/trade-site-sources/chills.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.chillsonwheels.com/

15. **A/C Authority (Port St. Lucie FL)**
   - Why it is among the best / what to take: JSON-LD 4.9/387 and "500+ Local 5-Star Reviews" as the page title with upfront pricing: proof carried by the title and the structured data.
   - Files: `reverse-engineering/trade-site-sources/acauthority.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.acauthorityfl.com/

16. **Horizon Services (US East)**
   - Why it is among the best / what to take: Monthly-price-first selling: a new system from $106/mo and a Comfort360 plan.
   - Files: `reverse-engineering/trade-site-sources/horizon.html`, `structure-uiux/hvac.md (entry for this firm)`
   - Source link: https://www.horizonservices.com/air-conditioning-services/ac-replacement/

17. **Deep-reads slice 1 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 40 Direction-aware reveals (GreenSock pen pojzxwZ); 15 Olha Lazarieva and Max Milkin; 22 Monolith Studio. Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-1.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

18. **Deep-reads slice 2 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 98 Silo (silosilosilo.com); 58 Shopify Editions Winter '26. Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-2.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

19. **Deep-reads slice 3 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 161 GSAP Marquee Text (GreenSock pen); 150 Dynamic Shape Overlays (Codrops); 153 GSAP Pin Sidebar (CodePen). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-3.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

20. **Deep-reads slice 4 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 279 Count Up (React Bits); 271 CSS scroll()-driven animations (Codrops, Adam Argyle); 255 Shazam-Like Morphing Button (Codrops). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-4.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

21. **Deep-reads slice 5 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 317 Digital Butlers (GSAP Showcase); 314 Some Inspiration for Pricing Tables (Codrops); 306 Accordion with CSS3 (Codrops); 313 Nifty Modal Window Effects (Codrops); 310 Inspiration for Text Input Effects (Codrops); 348 How to Create a Circular Progress Button (Codrops); 316 Tooltip Styles Inspiration (Codrops); 324 Haptic (Land-book). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-5.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

22. **Deep-reads slice 6 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 353 Modern Cleaning Service Website UI/UX (Behance). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-6.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

23. **Deep-reads slice 8 (code-level reverse analyses, whole file)**
   - Why it is among the best / what to take: Whole file holding the entries picked in this pack: 561 Iper (iper.com.au); 531 BLK - Design Your Own (dyo.blksport.com). Each entry gives the code-source extract path, the measured stack, exact parameters and a rebuild recipe readable from text alone.
   - Files: `reverse-engineering/deep-reads-slice-8.md`
   - Source link: none recorded for the file as a whole (compilation; the link for each picked entry is on that entry's own pick)

## Structure, visual hierarchy, UI/UX and conversion (18)

1. **HVAC industry report (shortlist, five deep reads, crowns, steal-stack)**
   - Why it is among the best / what to take: The HVAC report: 20 scored sites, five deep reads, the crowns and the template steal-stack for the heat market; every company named in this pack has its entry here.
   - Files: `structure-uiux/hvac.md`
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

6. **Digital Butlers (GSAP Showcase)**
   - Why it is among the best / what to take: The quote-form blueprint: budget radios before contact, a stated quote-in-48-hours promise, a transparent pricing FAQ with the payment split published, and a "Proof, not promises" stats band. Use: the planned-purchase quote flow: budget before contact and a stated response time.
   - Files: `structure-uiux/code-source/digital-butlers/`, `reverse-engineering/deep-reads-slice-5.md (entry 317)`
   - Source link: https://gsap.com/showcase/ (as recorded in candidates-master.csv)

7. **Iper (iper.com.au)**
   - Why it is among the best / what to take: A six-step quote overlay behind a persistent sticky quote button with a step indicator and a stated time promise: the model for a sticky-entry multi-step quote. Use: a sticky quote or booking entry with step indicator.
   - Files: `structure-uiux/code-source/iper/`, `reverse-engineering/deep-reads-slice-8.md (entry 561)`
   - Source link: https://iper.com.au/

8. **Olha Lazarieva and Max Milkin**
   - Why it is among the best / what to take: A budget-radio contact form (5K-10K / 10K-20K / more) that qualifies before it asks for contact details, plus a custom scroll container that keeps mobile browser bars fixed. Use: budget-radio qualification before contact details.
   - Files: `reverse-engineering/deep-reads-slice-1.md (entry 15)`
   - Source link: olhalazarieva.com / maxmilkin.com

9. **Some Inspiration for Pricing Tables (Codrops)**
   - Why it is among the best / what to take: Twelve named three-tier pricing sets with real prices: the reference for tier tables and plan comparisons. Use: maintenance-plan and system tiers.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 314)`
   - Source link: https://tympanus.net/codrops/2015/11/19/some-inspiration-for-pricing-tables/

10. **Accordion with CSS3 (Codrops)**
   - Why it is among the best / what to take: CSS-only :checked accordion (checkbox, radio and default-open variants); the article warns that some mobile browsers miss label clicks, so test on phones. Use: the price-range and honesty FAQ.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 306)`
   - Source link: https://tympanus.net/codrops/2012/02/21/accordion-with-css3/

11. **Nifty Modal Window Effects (Codrops)**
   - Why it is among the best / what to take: Nineteen CSS modal transitions (Fade & Scale, Newspaper, Blur, 3D Slit and more) for quote forms and lightboxes. Use: the booking or quote modal.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 313)`
   - Source link: https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/

12. **Inspiration for Text Input Effects (Codrops)**
   - Why it is among the best / what to take: Fourteen named floating-label field styles: ready-made treatments for quote-form fields. Use: quote-form fields.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 310)`
   - Source link: https://tympanus.net/codrops/2015/01/08/inspiration-text-input-effects/

13. **How to Create a Circular Progress Button (Codrops)**
   - Why it is among the best / what to take: A submit button that morphs into a progress ring and draws a tick or a cross: clear form feedback without a page change. Use: submit feedback for the booking form.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 348)`
   - Source link: https://tympanus.net/codrops/2014/04/09/how-to-create-a-circular-progress-button/

14. **Tooltip Styles Inspiration (Codrops)**
   - Why it is among the best / what to take: Nine SVG-shaped tooltip styles for "what can change this price" explanations; add a tap fallback for phones. Use: "what can change your price" explanations on a published range.
   - Files: `reverse-engineering/deep-reads-slice-5.md (entry 316)`
   - Source link: https://tympanus.net/codrops/2014/10/07/tooltip-styles-inspiration/

15. **Modern Cleaning Service Website UI/UX (Behance)**
   - Why it is among the best / what to take: A trade-native blueprint (WordPress, Elementor, WooCommerce): a scarcity top bar, rating-badge hero, frequency-toggle pricing and a "book in under 60 seconds" flow. Use: a trade-native blueprint: scarcity bar, rating-badge hero, frequency-toggle pricing, 60-second booking.
   - Files: `reverse-engineering/deep-reads-slice-6.md (entry 353)`
   - Source link: https://www.behance.net/gallery/247805543/Modern-Cleaning-Service-Website-UIUX-Design

16. **Haptic (Land-book)**
   - Why it is among the best / what to take: Published pricing with a Book-a-call action on every tier, live office clocks and a word-by-word intro: the model for published prices plus a visible hours clock. Use: published prices with a book action on every tier and a visible hours clock.
   - Files: `structure-uiux/code-source/haptic/`, `reverse-engineering/deep-reads-slice-5.md (entry 324)`
   - Source link: https://www.haptic.studio/ (Level-1 source page: https://land-book.com/design/portfolio?component=126604&style=cards&view=desktop&type=agency)

17. **Monolith Studio**
   - Why it is among the best / what to take: The best full service-business blueprint in its chunk: team cards with style tags, a Google five-star strip, knowledge-hub cards, a booking CTA and a full directory footer. Use: the directory footer and proof strip.
   - Files: `structure-uiux/code-source/monolith-studio/`, `reverse-engineering/deep-reads-slice-1.md (entry 22)`
   - Source link: monolithstudio.com

18. **BLK - Design Your Own (dyo.blksport.com)**
   - Why it is among the best / what to take: A live-preview configurator: the product is rendered as inline SVG (59 SVGs) that repaints on every choice, with cart-pop feedback and one easeInOutCubic app token; the pattern for visualisers and system builders. Use: a live-preview system builder for the planned-purchase door.
   - Files: `structure-uiux/code-source/blk-design-your-own/`, `reverse-engineering/deep-reads-slice-8.md (entry 531)`
   - Source link: https://dyo.blksport.com/
