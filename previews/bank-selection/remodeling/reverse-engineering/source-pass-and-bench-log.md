# Lane 3 — Source Pass + Bench Exhaustion Log (26 Oct 2026, F12 standing order)
## Source pass (curl, full HTML) on Top-5/crowned sites — all HTTP 200
- Richard Lusk (50KB HTML): BESPOKE static build — no WordPress/framework fingerprint; own /assets/site/ JS (config, faq-search, gallery.js) + single design CSS. Homepage contains NO <video> tag — the video case study lives on project pages. Speed-feel explained by build weight.
- TruGreen (156KB): Next.js SOURCE-VERIFIED (/_next/static/chunks, App Router) + Swiper photo-card carousel in source + WebP/SVG assets.
- Luv-A-Lawn (393KB): WordPress + WP Rocket 3.23.5.1 + HubSpot + custom "fairway-parent" theme + Google Maps API + Masonry.
- Monster Tree (125KB): Scorpion platform SOURCE-VERIFIED (scorpion.co analytics + Scorpion Connect bootstrap, /cms/ includes).
- Augusta (212KB): Duda SOURCE-VERIFIED (cdn-website.com / multiscreensite runtime-react) + CallRail call tracking.
- Elbaz (1.14MB HTML, 53 scripts): WordPress 7.1.3 + Elementor + WPML SOURCE-VERIFIED; before/after CONFIRMED in source (paired uploads elbaz-before-after-renovation-*-before/after.jpg + before-after lib + Slick); 8 <video> tags, 35 mp4 references — video weight claim verified.
- CMK (350KB): WordPress + BRICKS builder (bricks.min.js, --bricks-transition) + WP Rocket SOURCE-VERIFIED; before/after is a CUSTOM CSS component (.before-after__slider, 350px desktop height), not a plugin; Swiper + Splide present.
- KBF (391KB): WordPress + Elementor 4.2.4 + HubSpot + Breeze cache SOURCE-VERIFIED; LOTTIE present (Elementor lottie config) + Swiper; Neighborhood Drive DOM in source (id=neighborhoods, fly-hud, wpRail chapters).
- Phoenix Home (1.0MB): WordPress 7.1.3 + Slick + before-after lib SOURCE-VERIFIED.
- Harmony Basements (377KB): WordPress SOURCE-VERIFIED; cost calculator linked from services page at /basement-cost-calculator/ ("most comprehensive basement cost calculator in Canada") — calculator existence source-verified; pricing figures remain from its own cost page (search-captured).

## Bench exhaustion — route log (minimum 3 routes available; route 1 succeeded for all 8)
Route order per standing order: (1) terminal curl full-source fetch → (2) browser.open text-fetch → (3) live browser → (4) Wayback → (5) per-name search. Route 1 returned HTTP 200 + real homepage HTML for ALL 8, so routes 2-5 were not needed. All 8 upgraded excerpt → opened (curl source route) in lane3-scan.csv and re-scored:
- CRD (247KB, WP + Swiper + before-after component in source): Animation 2→3. Total 27→28.
- BOWA (134KB, WP + GSAP in source): scores unchanged, total 29. Homepage text-thin; its budget-range/referral proof sits on subpages.
- Case (124KB, WP, minimal libs): unchanged, 25.
- Neil Kelly (322KB, WP block theme): homepage source verifies 30,000+ projects, 2,200+ reviews, 5-Year Warranty. Unchanged 28.
- West Shore (1.17MB HTML, AOS in source): Animation 2→3, Speed-feel 4→3 (page weight). Review claims in source: 65,000+/88,000+ (sitewide aggregates; earlier location-page excerpt said 32,000+). Total 29.
- KOHLER Reveal (107KB, Webflow + 1 video, Lifetime Limited Warranty): unchanged 27.
- Normandy (118KB, WP + Swiper + Slick + AOS + 1 video): Animation 2→3. Total 28.
- Quartersawn (280KB, WP + Swiper + 2 <video> tags — hero video SOURCE-VERIFIED): unchanged 29.
## Crown check
Elbaz stands at 31 (4/5/5/5/4/3/5). No bench site exceeds 29 → NO crown challenge. KBF (29, crowned on proof originality + replicability) ties BOWA/West Shore/Quartersawn on points but keeps the crown: BOWA's proof is unreplicable award/referral mass, West Shore is a different machine (productised bath/windows franchise, proof = review volume), Quartersawn's proof layer is thinner (no pricing/warranty evidence on homepage source).
