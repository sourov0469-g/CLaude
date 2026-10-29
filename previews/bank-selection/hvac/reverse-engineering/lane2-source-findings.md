# Lane 2 — Source-level (F12) findings, 26 Oct 2026
Method per standing order: terminal curl of live HTML + linked CSS/JS bundles mined. Files in ./src/ (stronghold.html/.css, hippo.html, greenconception.html, gc-lead.js, coolingco.html, expo.html, strikeforce.html, erie.html, onehour.html, serviceexperts.html, fox.html, drroof.html, nations.html). Routes tried per site: (1) browser.open text fetch, (2) curl HTML, (3) curl bundles. All 12 succeeded on route 1–2; no crowns rest on excerpts.

## Fingerprints (from source, not appearance)
| Site | Stack (source proof) | Motion (source proof) | Tracking/CRM |
|---|---|---|---|
| Stronghold Roofing | Custom static, Tailwind v4 (tw- CSS vars), single 210KB CSS, font Archivo, hashed Vite-style assets | NO GSAP/Lenis. CSS-only system: enter/exit .15s ease · accordion .2–.28s ease-out · scale-in .18s ease-out · marquee-x 60s linear infinite (project gallery) · caret-blink 1.25s · pulse 3s · beziers cubic-bezier(.4,0,.2,1) / (0,0,.2,1) | GTM-TRJWWKX; JSON-LD AggregateRating 4.9 / 500 in source |
| Hippo Roofing | WordPress + **Elementor 4.1.4** (generator meta: e_font_icon_svg, external CSS print, font_display swap) — Asiful's exact stack | Elementor motion; reviews-feed-pro plugin (17 refs) | CallRail call tracking + GTM |
| Green Conception | Hand-built static, fonts Open Sans + Roboto Slab, own /assets/ hashed webp + SVG | CSS/JS own code; before-after drag slider is custom | GTM-NSG7TFT5 + own gc-lead.js: first/last-touch attribution in localStorage (utm + referrer class incl. AI sources), attached to quote leads + resumable quote state |
| Erie Home | WordPress (90 wp-content refs) | **Swiper** (42 refs) drives review/service carousels | Birdeye-fed reviews (per chunk) |
| Dr. Roof | Custom + Azure-blob CMS offers | video poster hero | JSON-LD ratingValue 5 / reviewCount 372 |
| Nations Roof | **HubSpot CMS** (generator meta) | Swiper (16 refs) hero/project motion | HubSpot CRM native |
| The Cooling Company | Next.js + Turbopack (_next/static/immutable), font Montserrat | framework motion only; no GSAP found | GTM-5PRLN4M |
| Strike Force HVAC | Next.js + Turbopack (Vercel dpl), real /photos/ via _next/image q75 | framework motion only | GTM; JSON-LD 4.9 / 194 |
| Expo Heating & Cooling | **B12** website builder (17 b12.io refs) | platform motion | GTM-MF87CXFN; JSON-LD AggregateRating present; HTML weight 2.03MB — heaviest page in the deep set (speed risk) |
| Service Experts | **Scorpion** platform (source refs ×3) | Scorpion video hero (Cloudflare Stream) | Scorpion stack |
| Fox Service | **Scorpion** platform (source refs ×3) | Scorpion video hero (mainstage-video-bg) | Scorpion stack; parent Southern Home Services |
| One Hour | Custom franchise platform (no CMS fingerprint in HTML) | stopwatch brand motion not in HTML layer | franchise stack; JSON-LD not in homepage HTML |

## Source-level lessons
1. **Nobody in the trade top tier uses GSAP/WebGL.** Best-in-trade motion = CSS transitions .15–.28s ease-out + one marquee (60s linear) + Swiper carousels. The design bank's GSAP craft must be dosed at this level for trade templates: reveals and sliders, never scene pages.
2. **The two best-designed locals (Stronghold, Green Conception) are hand-built static** — speed and control beat CMS. But Hippo proves WordPress+Elementor (Asiful's stack) can carry a top-1% conversion system; the stack is not the ceiling.
3. **Platforms dominate HVAC:** Scorpion (Service Experts, Fox), B12 (Expo), ServiceTitan scheduling (Fuse per chunk). Platform sites share the same offer machinery — differentiation comes from copy/proof, not tech.
4. **Call/lead tracking is standard at the top:** CallRail (Hippo), GTM everywhere, Green Conception's home-grown first/last-touch attribution is the most stealable small-firm pattern — pairs with Asiful's own pixel tracker thinking.
5. **JSON-LD review schema** present on Stronghold (4.9/500), Strike Force (4.9/194), Dr. Roof (5/372), Expo — stars in search results are part of the proof system, not an afterthought.

## Addendum (26 Oct, second source batch)
- Evergreen Home Heating (Seattle): title "Seattle Heat Pump & HVAC Experts" confirmed in source; no CMS fingerprint (clean custom build) — matches its craft-benchmark status.
- London AirCon (londonaircon.co.uk): WordPress (95 wp-content refs).
- Chills On Wheels: Jacksonville FL; WordPress + **Housecall Pro** booking (29 refs) + Swiper.
- Advanced Air Home Services (Edgewater FL — a DIFFERENT firm from Advanced Air Cedar Park TX in the shortlist): WordPress + Elementor (2,725 refs — heaviest Elementor footprint in the lane) + Swiper (33).
- Alliance Climate Control (Sydney): curl route FAILED (000, connection) on two attempts; the site stands as opened via R1 text-fetch in the FL chunk (25/30). No source fingerprint claimed. Routes tried: R1 ok, R2 x2 failed.

## Top-20 source-mining completion (escalation depth expansion, 26 Oct)
All remaining shortlist sites curled and mined (src/top20/). Every serious contender's tech is now source-level.
| Site | Source fingerprint | Schema (JSON-LD) vs marketing |
|---|---|---|
| West London Roofing | Hand-built static: own /assets/css/site.css (cache-busted), self-hosted Archivo variable font, webmanifest — NO CMS. Checkatrade ×23 refs, WhatsApp ×15 in source | — |
| Boardman Roofing | Vite SPA shell (2.6KB HTML, hashed /assets/index-*.js, Lovable-flavoured runtime files), fonts Fraunces + Inter Tight — design-led JS build confirmed | client-rendered; claims inconsistency stands from chunk audit |
| HHH Roofing | WordPress + Elementor (8,070 refs — heaviest in lane) + Swiper (575) | ratingValue 5 present |
| Greater Midwest Exteriors | Webflow + Swiper + HubSpot forms | — |
| LOA Roofing | WordPress 7.1.3 | 5.0 / 734 in schema vs "1,000+ reviews" in copy — mild inflation gap |
| Indy Roof | WordPress + NitroPack | 4.9 / 2,330 — MATCHES hero claim (2,300+) ✓ |
| Stay Dry | WordPress 6.9.10 | — |
| Interlock | custom | 4.7 / 9,108 — MATCHES ✓ |
| Long Home | WordPress | 4.6 / 5,000 |
| Bone Dry | WordPress + Elementor (1,867) + HubSpot | — |
| Rogers Roofing | WordPress + ServiceTitan | — |
| Bonner Built | WordPress 7.1.3 + Elementor (1,377) + Swiper | 5.0 / 660 (from wave-1 mining) |
| CentiMark | Joomla (Helix Ultimate framework) | — |
| A.B. May | WordPress + Swiper + ServiceTitan | 4.8 / 17,058 — MATCHES the buried count exactly ✓ |
| Estes Services | custom + HubSpot | **4.77 / reviewCount 3** — schema nearly empty vs hero "4.9 / 6,000+" claim: schema-marketing mismatch (Collis pattern) |
| Deljo | WordPress + ServiceTitan | 4.9 / 3,228 — MATCHES ✓ |
| Horizon Services | Next.js + ServiceTitan | — |
| Fallon Solutions | WordPress + ServiceTitan (16 refs) | — |
| AC Installation London (UK) | custom | 4.9 / 547 |
Pattern across both top-20s: the hand-built static sites (Stronghold, West London, Green Conception) + Next.js firms (Cooling Co, Strike Force, Horizon) sit at the craft top; WordPress+Elementor is the volume stack and reaches the top only with a system on it (Hippo, Bonner); schema-claim mismatches (Estes 3, Collis 8, LOA gap) are a recurring hygiene failure the template must not inherit.
