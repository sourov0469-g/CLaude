# FACTS — Austin Pro Siding, Windows & Roofing

Harvested 29 Oct 2026 by curl from the live site https://www.austinprosiding.com/ (homepage + 16 subpages + the site's own published data files). Every fact below is quoted or counted from the firm's own pages. Nothing is invented. Where the live site contradicts itself, both versions are recorded and the one this build uses is marked.

Pages read: `/`, `/services/siding`, `/services/siding/cost`, `/services/windows`, `/services/windows/cost`, `/about-us`, `/reviews`, `/promotions`, `/frequently-asked-questions`, `/cost-guides`, `/contact`, `/schedule-appointment`, `/vendors/james-hardie-pg`, `/services/storm-damage-restoration`, `/recent-projects/austin-village-at-western-oaks-siding-exterior-painting-09-03-26-aps-4867`, `/areas-we-serve/round-rock`, `/gallery`.
Data files read: homepage JSON-LD (`@graph`), `#aph-pairs` (6 before/after pairs), siding + windows page pair JSON (4 + 4 pairs), `/_apr/b63ad571ed065261.json` (the neighbourhood-finder dataset: 883 project points).

Stack note: the live site now serves Webflow-generated pages with Sanity CDN imagery (the bank's Oct 26 pass recorded "Sanity headless"; both are true — Sanity holds the content, Webflow paths serve the shell).

## Identity
- Business name: **Austin Pro Siding, Windows & Roofing** ("Austin Pro"). Schema alternateName: "Austin Pro", "Austin Pro Siding".
- Logo: red square window-mark (2×2 panes inside an offset square) + "AUSTIN PRO" + "SIDING • WINDOWS • ROOFING • PATIO COVERS". Files used exactly as served: `/images/65246f239b165c29151e6f9f_AP_HORIZONTAL-LOGO_COLOR-V2-p-1080.png` (colour, transparent) and `/images/AP_HORIZONTAL-LOGO_WHT-p-500.avif` (white). Never redrawn.
- Phone: **(512) 550-0000** (`tel:+15125500000`)
- Email: **info@austinprosiding.com**
- Office: **7801 N Lamar Blvd, Suite C70, Austin, TX 78752** (geo 30.3452401, −97.7124366)
- Hours: **Mon–Fri 8 AM–8 PM · Sat 8 AM–6 PM · Sun noon–5 PM**. Online booking "works any time".
- In business **since 2009**. History (About page): Austin Pro Siding & Windows opened 2009; Sanders Roofing & Exteriors started 2010; the two merged in **2018** into Austin Pro Siding, Windows & Roofing.
- **5,000+** Central Texas homeowners served; **70+ years** combined experience.
- Social: facebook.com/austinprosiding; BBB, ProvenExpert, Yelp and Google Maps profiles listed in schema `sameAs`.

## Proof as published
- **4.9 stars on 474 Google reviews** (identical on every page read; also in JSON-LD context text). This build uses exactly "4.9 · 474 Google reviews" everywhere.
- Credentials (homepage "Certified, accredited & awarded"): **GAF Master Elite** · **James Hardie Elite Preferred** · **James Hardie President's Club Award 2025** · **Andersen Certified Contractor, Premier** · **GuildQuality Guildmaster Award for Service Excellence** · **BBB Accredited Business, A+** · **Nextdoor Neighborhood Fave 2025**. About page adds **Simonton PRO** and "Guildmaster four years in a row, 2015 through 2018".
- How the site explains them: Hardie Elite Preferred = "the top tier of the James Hardie contractor alliance. It can't be bought: James Hardie audits it, and it has to be re-earned." GAF Master Elite = "GAF says fewer than 2% of contractors nationwide hold it."
- Credential badge images used as served: `/images/creds/*.webp` (7 files).

## The documented-project system (the crown asset)
- **886 documented projects** (2018–2026), **316** of them with photos; **541** in Austin itself.
- **177 before-and-after pairs** published.
- Project map: **312** documented projects with photos shown as dots, "placed near the home, never on it"; **574 more** "are counted but sit outside this frame, have no recorded location or have no photos published yet". 312 + 574 = 886 (self-reconciling).
- Finder dataset (`/_apr/b63ad571ed065261.json`, verified by me): 883 points; exactly 312 are in-frame with photos (matches the caption). Trade tallies in that file: Siding 429, Windows 386, Exterior Painting 318, Shingle Roofing 210, Gutters 121, Doors 109, Patio Covers 34, Metal Roofing 31, Garage Doors 9, Decking 5. City tallies: Austin 539, Round Rock 110, Cedar Park 35, Pflugerville 28, Leander 27, Georgetown 21 … (the file holds 883 of the 886; 3 carry no point).
- Map frame: viewBox 566×640, office square at (389.5, 290.7), scale 8.3 px per mile; lat lines 30.0–30.8°N, lon lines 98.2–97.6°W.
- Price bands come from "**1,590 individually priced trades on 886 documented projects, 2018–2026: a documented sample, not every job since 2009**." Bands are materials + labour, before discounts, excluding tax, read per trade from each job worksheet.

### Documented projects per trade (homepage service list)
Siding 431 · Windows 388 · Shingle Roofing 210 · Metal Roofing 31 · Patio Covers 34 · Exterior Doors 109 · Garage Doors 9 · Exterior Painting 320 · Gutters 121 · Decking (no count shown) · Storm Damage (free inspection).

### Priced projects per trade, middle half and median band (homepage "Compare all 10 trades")
| Trade | Priced projects | Middle half | Median band | Est. monthly (7.99%/120) |
|---|---|---|---|---|
| Siding | 415 | $5k–$20k | $10k–$15k | $121–$182/mo |
| Windows | 376 | $5k–$25k | $10k–$15k | $121–$182/mo |
| Shingle Roofing | 204 | $5k–$20k | $10k–$15k | $121–$182/mo |
| Exterior Painting | 317 | — | $2k–$5k | $24–$61/mo |
| Gutters | 109 | — | $2k–$5k | $24–$61/mo |
| Doors | 96 | — | $2k–$5k | $24–$61/mo |
| Garage Doors | 6 | — | $2k–$5k | $24–$61/mo |
| Patio Covers | 33 | — | $15k–$20k | $182–$243/mo |
| Metal Roofing | 29 | — | $20k–$25k | $243–$303/mo |
| Decking | 5 | — | $20k–$25k | $243–$303/mo |

Middle-half ranges for every trade, as published in the homepage chart's accessible labels: Gutters under $5k · Exterior painting $2k–$10k · Doors $2k–$10k · Garage doors $2k–$10k · Siding $5k–$20k · Windows $5k–$25k · Shingle roofing $5k–$20k · Patio covers $10k–$30k · Metal roofing $15k–$40k · Decking $15k–$50k. Chart axis $0–$50k.

### Siding price distribution — 415 priced jobs, 2022–2026 (siding cost guide)
Under $2k 12 · $2k–$5k 33 · $5k–$10k 70 · **$10k–$15k 107 (median band)** · $15k–$20k 92 · $20k–$25k 53 · $25k–$30k 22 · $30k–$40k 19 · $40k–$50k 4 · $50k–$60k 1 · $60k–$75k 2. (Sum 415 — verified.) 31 Central Texas cities.
- By city (median band): Austin 279 projects $15k–$20k · Round Rock 56 $10k–$15k · Cedar Park 16 $10k–$15k · Pflugerville 14 $5k–$10k · Leander 9 $10k–$15k · Buda 6 $15k–$20k.
- Done in the same job: exterior painting on **72%** (297/415), windows **33%** (136), gutters **15%** (64), shingle roofing **15%** (63).
- What moves the price (6 levers): wall area & stories; what's under the old siding (rot/sheathing); whole house vs a few walls; trim, soffit & fascia; paint vs ColorPlus; profile & details.
- Example jobs per band: $5k–$10k East Oak Hill (Hardie 8.25" Select Cedar Mill) · $10k–$15k Block House Creek, Leander · $15k–$20k Anderson Mill West, Cedar Park · $20k–$25k Northwest Hills, Austin.

### Windows price distribution — 376 priced jobs, 2022–2026 (windows cost guide)
Under $2k 12 · $2k–$5k 40 · $5k–$10k 96 (most common) · **$10k–$15k 79 (median band)** · $15k–$20k 50 · $20k–$25k 30 · $25k–$30k 19 · $30k–$40k 30 · $40k–$50k 13 · $50k–$60k 4 · $75k–$100k 2 · $100k+ 1. (Sum 376 — verified.) 40 Central Texas cities.
- By brand: NT Windows 238 jobs ($10k–$15k) · Simonton 54 ($10k–$15k) · Andersen 38 ($20k–$25k) · Pella 31 ($5k–$10k) · Provia 5 ($5k–$10k).
- Frame materials (376): 214 vinyl · 64 aluminum · 33 Fibrex composite · 4 fiberglass or wood · 61 not recorded.
- By city: Austin 248 ($10k–$15k) · Round Rock 39 · Cedar Park 15 ($15k–$20k) · Pflugerville 12 · Leander 9 · Georgetown 7.
- Most window-only jobs: **two days on site**. **36%** of priced window jobs also got new siding; **18%** replaced doors too.

## Siding product facts (siding page, from 415 priced job files)
- Every priced siding job is James Hardie fiber cement. **301 of 415** used the HardiePlank lap **8.25″** board (exposure 7″, length 12 ft, thickness 5/16″; also made 5.25″/6.25″/7.25″). **27 of 415** went board & batten (4 ft HardiePanel, 2.5″ HardieTrim battens, 16″ on centre).
- Texture: **Select Cedarmill 286 of 415** · **Smooth 36 of 415**.
- Finish: painted on site in any of **1,700+ Sherwin-Williams colours** with free colour matching (usual finish), or **ColorPlus** (factory-baked, **17 colours for Austin**, Arctic White trim; "ColorPlus finish 15+ yrs").
- Sherwin-Williams sample swatches published with hex: Pure White SW 7005 #EDECE6 · Alabaster SW 7008 #EDEAE0 · Agreeable Gray SW 7029 #D1CBC1 · Repose Gray SW 7015 #CCC9C0 · Accessible Beige SW 7036 #D1C7B8 · Dovetail SW 7018 #908A83 · Gauntlet Gray SW 7019 #78736E · Urbane Bronze SW 7048 #54504A · Iron Ore SW 7069 #434341 · Tricorn Black SW 6258 #2F2F30 · In the Navy SW 9178 #283849 · Hunt Club SW 6468 #2A4F43.
- ColorPlus Austin colours with hex as published: Arctic White #E0E0D8 · Cobble Stone #C6BEB0 · Navajo Beige #D5C9B2 · Khaki Brown #A28F7D · Timber Bark #7B7064 · Rich Espresso #5F5A55 · Mountain Sage #706F5E · Light Mist #B6BAB5 · Pearl Gray #B2AEA9 · Gray Slate #898A87 · Boothbay Blue #778184 · Evening Blue #5F696D · Deep Ocean #49545C · Aged Pewter #7D7974 · Night Gray #6A6D6F · Iron Gray #575B59 · Countrylane Red #714D47.
- Warranties: **James Hardie 30-year non-prorated siding warranty** (when an Elite Preferred contractor installs; FAQ adds 15 years on trim) + **Austin Pro lifetime workmanship warranty on labour**.
- Timeline: **1 to 2 weeks including paint**. Policy: "We replace by the full wall or the whole house. No patch repairs."
- Built-for-Texas five: doesn't warp (UV/heat) · doesn't rot · doesn't burn (noncombustible) · doesn't feed termites · lasts decades (30-yr warranty).
- Siding projects by city: Austin 288 · Round Rock 59 · Cedar Park 16 · Pflugerville 15 · Leander 9 · Buda 6.

## Window product facts (windows page, from 376 priced job files)
- Four brands cover 361 of 376: **NT Windows 238** (made at NT's own Dallas–Fort Worth plant; Executive vinyl 89 jobs, Twinsulator aluminum 54, Presidential vinyl 33; Executive frame 3-1/4″ multi-chambered vinyl, 3/4″ dual-pane glass rated by NT at 99% UV protection; Presidential VividColor in 18 colours, 15-yr coating warranty) · **Simonton 54** (DaylightMax 49 jobs; lifetime limited parts & labour, transferable; ProSolar Shield Low-E) · **Andersen 38** (100 Series Fibrex 33 jobs; limited 20 yrs glass / 10 yrs other parts; Certified Contractor Premier) · **Pella 31** (Impervia fiberglass 2, vinyl 10; Impervia limited lifetime, Pella covers labour 2 years).
- Frame colour swatches with hex are published per brand (NT 19, Pella 5, Simonton 10, Andersen 5) — recorded in `site/assets/data/facts.json`.
- Glass: all four brands offer Low-E (NT Quad LoE-452+, Simonton ProSolar Shield, Pella sun-control packages, Andersen SmartSun).
- Process: each opening measured before ordering; windows built to order; set, sealed, old units hauled away. Warranty: each brand's manufacturer warranty + Austin Pro lifetime workmanship on labour.

## Financing (published, on approved credit, via GreenSky)
- **0% APR for 24 months · 4.99% APR for 60 months · 7.99% APR for 120 months (lowest monthly payment).**
- Worked example as printed: **$15,000 at 7.99% APR for 120 months = 120 payments of $181.91** (I re-computed: 15000·r/(1−(1+r)^−120), r = 0.0799/12 → $181.91 ✓).
- Disclosure as printed: "Estimated monthly payments assume the typical price is financed in full with no down payment, over 120 monthly payments at 7.99% APR … All plans on approved credit; not everyone qualifies. Your rate, term and payment depend on your credit, the plan you choose and your final price." No prepayment penalty (cost guide).
- Payment methods: Visa, Mastercard, American Express, debit, bank transfer/ACH, checks.

## Offers (time-limited; published Oct 2026)
- **Holiday Savings: 10% off every exterior project through November 30** (2026).
- **Hometown Heroes +5%** all year (veterans & active military, teachers, seniors, first responders & emergency personnel).
- **Pay in Full +10%** all year (cash, check or ACH; not with financing).
- All three stack to **25%**; the site's own example: $30,000 → save $7,500 → $22,500.
- **Referral programme: $200 for every referral, unlimited** (referred customer must mention the name before the first appointment).

## Process and service facts
- Entry offer: **free inspection**, booked online "in about a minute" (Calendly) or by phone. "One free inspection covers every trade on the house."
- Inspection/estimate: a project manager walks the outside, measures and photographs; **30 to 60 minutes**; then you get "the scope, materials and price"; free, no obligation; written estimate.
- Service four-step (siding/windows pages): Free Inspection → Detailed Proposal → Expert Install (siding) / Measure & Install (windows) → Final Check.
- Storm four-step: You file and decide → We inspect and document (photos + measurements) → We meet your adjuster → We work with your insurer (line-item estimate); once the claim settles, we do the work.
- Services (11): Siding · Windows · Shingle Roofing · Metal Roofing · Exterior Doors · Garage Doors · Gutters · Patio Covers · Exterior Painting · Decking · Storm Damage Restoration.
- Brands with documented-project counts (2018–2026): James Hardie 431 · Sherwin-Williams 320 · NT Windows 251 · GAF 200 · Pella 72 · Simonton 55 · Andersen 42 · Provia 39 · Renaissance Patio 34 · McElroy Metal 31 · Owens Corning 10 · DoorLink 9.
- Shingle roof warranties (FAQ): 5-year labour (laminate/designer), 2-year labour (≤3/12 pitch), GAF Golden Pledge available. Metal: lifetime workmanship + manufacturer 30–50 yrs.

## Service area
- "Austin and **36 Central Texas communities**" with service-area pages: Austin (North, South, West, East, Central, Wells Branch, Barton Creek, Circle C Ranch, Jollyville, Oak Hill), Round Rock, Cedar Park, Pflugerville, Leander, Georgetown, Hutto, Liberty Hill, Taylor, Lakeway, West Lake Hills, Driftwood, Spicewood, Marble Falls, Dripping Springs, Wimberley, Bee Cave, Lago Vista, Buda, San Marcos, Kyle, New Braunfels, Manor, Elgin, Bastrop, Goldthwaite, Jewett.
- Contact page: documented projects in "more than 55 Central Texas cities"; finder dataset holds 59 city names.
- Round Rock page local facts (for location-page treatment): 1990s–2000s builder-grade windows/vinyl now at end of service life; Williamson County hail corridor; 300+ sun days; neighbourhoods named: Teravista, Forest Creek, Mayfield Ranch, Stone Canyon, Paloma Lake, Brushy Creek, Round Rock West, Old Town.

## Before/after pairs used (each with its published per-project price band)
Homepage (`#aph-pairs`):
1. Village At Western Oaks, Austin · Aug 2026 · James Hardie 8.25″ Smooth · **Siding portion $25k–$30k** (job APS-4867; four on-site days, Aug 31–Sep 3 2026; referral lead; inspected Mar 9, approved Jun 18)
2. Tanglewood Forest, Austin · Aug 2026 · James Hardie 8.25″ Select Cedar Mill · **$25k–$30k**
3. Anderson Mill, Austin · Sep 2026 · NT Windows Executive · **Windows portion $15k–$20k**
4. Barton Creek, Austin · Apr 2024 · Renaissance Patio Moderno · **Patio covers portion $40k–$50k**
5. North Shoal Creek, Austin · Jan 2025 · Owens Corning TruDefinition Duration · **Roofing portion $30k–$40k**
6. Circle C North, Austin · Jul 2026 · James Hardie 8.25″ Primed Select Cedar Mill · **Siding portion $10k–$15k**
Siding page: Milwood (May 2026, $25k–$30k) · Rob Roy (Jul 2026, $15k–$20k) · Maple Run (Jul 2026, $15k–$20k) · North Austin (May 2026, $15k–$20k).
Windows page: Spicewood at Balcones Village (Mar 2023, NT Twinsulator, $40k–$50k) · Ridgewood, Cedar Park (Jul 2023, NT Twinsulator, $10k–$15k) · North Austin (Feb 2025, Simonton DaylightMax, $10k–$15k) · Maple Run (Oct 2025, NT vinyl, $10k–$15k).

## Reviews used (verbatim excerpts from Google reviews published on the site; names as printed)
Pat Mehaffy (Jul 2026, 80s masonite → Hardie; names Garrett & Kevin) · Joe Liu (Apr 2026; Jake's bid "fair and transparent … without any high-pressure sales tactics") · Megan Randolph (Apr 2026; Tracy) · David McPherson (Apr 2026; "no pressure estimate"; Tracy, Kevin, Shorty, Garrett) · Sara Helms (May 2026; windows; "about 6 weeks for measuring, ordering and installing") · Karen Hibpshman (Jun 2026; Jerry, Kevin, Paul, Garrett) · Ray Cole (2026; "15 minutes to measure … detailed estimate about an hour later") · LOIS RICHWINE (2026; windows, "our home is so QUIET"; Paul Hale, Paul Schantz) · Katie Littleton (2026; Taylor, Garrett "swept the pollen off my deck") · Kimmy Voigt (Jul 2026; roof).

## Inconsistencies on the live site (recorded, not repeated)
- About page: "Since 2022 we've documented more than 310 finished projects" vs homepage "Since 2018 … 886 … 316 of them with photos". **Build uses the homepage figures.**
- Reviews page: "Over 5,000 projects" and "15 years" vs homepage "5,000+ homeowners served" and "since 2009". **Build uses "5,000+ homeowners" and "since 2009".**
- About page: Hardie + GAF "two certifications held by fewer than 2% of contractors nationwide" vs homepage attributing "<2%" to GAF only. **Build attributes "<2%" to GAF only, as GAF's own claim.**
- Round Rock count: map plate "Round Rock 37" (photographed, in frame) vs FAQ "Round Rock (110 projects)" (all documented). **Build labels which measure each number is.**
- Documented vs priced: Siding 431 documented vs 415 priced; Windows 388 vs 376. Both are true measures; **build always names the measure** ("documented" vs "priced").
- Storm: homepage "We work with your insurer" vs FAQ "you deal with your insurer yourself". **Build uses the homepage four-step wording.**
- Live hero video (`/videos/hero-test.mp4`): a cinematic farmhouse film that cannot be verified as an Austin Pro job (it reads as a generic/generated brand film). **Not used.**

## Deliberately left out (cannot verify from the site)
Contractor licence numbers (none published; Texas has no state GC licence and the site lists none) · any review count other than 474 · job counts by year beyond what the finder dataset encodes · square footage installed (Feldco-style unit counters are built from documented counts instead: boards/jobs, not invented sq ft) · team headcount · any price not printed on the site.
