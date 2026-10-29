# PORTFOLIO SITE PLAN — Six "Concept" Demo Sites

Written 26 Oct 2026 by the CEO merge, from the closed research bank (Lane 1 design bank + Lanes 2–5 industry files + `00-conversion-anatomy.md` v0.4 + `proven-recipes.md`). Every site below is a **Concept** demo: it exists to show prospects what a DentivaX-built trade site looks and converts like, and to serve as the personalisable template for its trade (template-first system: build once at full quality, personalise when a prospect replies "send it over" — quality never drops).

## Standing rules for all six sites

- **Labelled "Concept"** — every site carries the word **Concept** in its header/footer and on its contact section. It is a demonstration of a system, never presented as a real trading firm.
- **Numbers are structural placeholders.** Crown patterns transfer; crown numbers never do. Every rating, count, price band and licence-style number on a demo is illustrative formatting placed where the real client's real number will sit — the bank's honesty rules (one consistent number everywhere, counts that reconcile, no invented aggregates) apply to demos exactly as to client pages.
- **Shared skeleton, trade-specific machine.** All six fork from one conversion skeleton (hero proof strip → low-friction entry → named offer/system → proof → timed process → financing where relevant → FAQ → quote/call close), then each runs its own trade's machine as specified per site. Full-website menu with a Services mega-menu on every site (these are homepages of future full websites, not landing pages).
- **Motion and weight budgets (bank-wide, F17/F18).** Trade dose only: CSS-family reveals 0.15–0.3s ease-out, one carousel, ONE signature interactive per page; no loaders, no scene pages, no scroll gates, no pinned sections that can trap a phone. The service-page layer ships vanilla (proven recipes run 5–16 KB there); GSAP, where used, is one shared 45.7 KB gzip load per page. The ~589 KB Three.js recipes (R32/R34/R35) are excluded from all six demos — R32 is policy-flagged for Asiful's own portfolio hero only, never a prospect-facing build, and a demo that gets personalised into a prospect preview must not carry it.
- **Recipe evidence note.** All 45 recipes in `proven-recipes.md` are proven at their declared evidence level. Recipes 21–25 (the forms/pricing slice) are source-audited, not device-rendered — they are used below as specified in the register, and their rendered pass remains formally owed before production reliance hardens. R3 (blur/rise) is used headlines-only per caveat C1.
- **Tracking and attribution.** Every demo ships the preview-page beacon pattern and the Green Conception lead pattern (first/last-touch attribution + resumable quote state) so a personalised version is measurable from day one.

## The six at a glance

| # | Site (all Concept) | US lead pool | Crown / template source(s) | Score |
|---|---|---|---|---|
| 1 | Roofing | 3,692 | Stronghold Roofing (FL) + West London Roofing (UK co-crown) | 33 / 31 |
| 2 | HVAC TX/FL | 1,351 | The Cooling Company (overall system) + Strike Force (emergency) + AirWorks & Champion Air (planned-purchase) | 30 / 31 / 31 / 31 |
| 3 | Landscaping incl. lawn + tree, FL | 1,792 | Richard Lusk (project) + TruGreen (recurring), completed by Augusta + Luv-A-Lawn + Monster Tree | 33 / — / — |
| 4 | Remodeling | 1,005 | Elbaz Construction + PHS Renovations (co-skeletons); Home Gyms + LYKORA (pattern sources); KBF (proof originality) | 31 ×4 / 29 |
| 5 | Plumbing | 828 | Zebra Plumbing (design system) + Zoom Drain (emergency conversion) | 32 / 31 |
| 6 | **Siding & Windows — verdict winner, see verdict section** | 963 | Austin Pro (transparency) + Feldco (tooling/video); Allied Exteriors first reserve | 29 / 28 / 27 |

Lead pools are Asiful's US top-tier pools as recorded at the bank's founding. Site 6 was contested between Concrete & Paving (pool 1,000) and Siding & Windows (pool 963) — the verdict, with full reasoning, is in its own section below, before the Site 6 build spec.

---

## Site 1 — ROOFING (Concept)

**Crown / template sources.** Stronghold Roofing, Lakeland FL (33/35, overall-system crown — the conversion skeleton) and West London Roofing, London UK (31/35, small-firm co-crown — the reachable model, and the direct template for Asiful's live UK roofers). Supporting deeps: Green Conception (no-gate instant quote), Hippo Roofing (named priced packages on WordPress + Elementor — the stack proof), Cenco (Verify-linked credentials).

**Steal-stack.**
1. Proof strip ABOVE the headline: ★ rating · review count · licence number · since-year (Stronghold; F1/F11).
2. The hero IS step 1 of a ~60-second quote funnel, with Call/WhatsApp at equal weight to the funnel (Stronghold + West London).
3. A named, priced-in-writing free offer: the Free Roof Plan™ pattern — an itemised value stack ($1,295+ → $0) — plus a price-match issued as a public dare.
4. Honesty block: "If you don't need a new roof, we'll tell you — in writing," + a why-we're-cheaper FAQ that answers the suspicion the low price creates.
5. Licence linked to the official record + a Verify link on every credential; review count in the page title; AggregateRating JSON-LD with the real numbers.
6. Local proof: real job photos captioned by town/postcode (West London's "Ealing W5" pattern), a process-story photo sequence, a live review feed — never a static screenshot of reviews.
7. UK layer (from West London, for personalised UK versions): Checkatrade-style platform score in the strip, postcode coverage checker, quote form accepting up to 3 photo uploads, "What happens when you call" section.
8. Fear-killer slot: the local firm-death/longevity mechanic ("the ten-year question") where the client's facts support it.

**Hero / proof / CTA anatomy.** Claim banner (only with a real report behind it in a personalised build) → proof strip → one trademark-style claim or honesty headline → funnel step 1 (roof type picker) / phone fallback line ("we'll figure it out in 60 seconds"). Proof runs: stat repeat → captioned project gallery → value stack → price-match dare → 4-step zero-surprises process → honesty FAQ → tiered warranties → financing → real team photo → dual close (Call 24/7 / Call me back). Sticky mobile path: Call + funnel entry.

**Proven recipes that build it.** R33 Motion-clip proof hero (cheapest, most portable hero) · R20 Count-up trust stats (with the structural no-JS fallback — counters must never render 0) · R16 Seamless marquee (Stronghold's own 60s project marquee, zero JS) · R21 Budget-radio quote form (the funnel's step structure) · R28 Before/after slider · R45 Stacking service cards (CSS sticky — the variant that cannot trap phone scrolling) · R1 Direction-aware reveals + R5 Role-grouped 4-step choreography (process) · R23 CSS-only FAQ accordion · R26 Menu overlays + mega-menu · R44 Chaptered page + anchor nav.

---

## Site 2 — HVAC TX/FL (Concept)

**Crown / template sources.** A triple crown at 31 plus the overall-system holder, used by role: The Cooling Company, Las Vegas (30/35, overall-system crown) · Strike Force HVAC, Dallas (31/35, emergency model) · AirWorks Solutions, Camarillo CA (31/35, planned-purchase/interactive model) · Champion Air, Scottsdale/Phoenix (31/35, planned-purchase — the independent second firm running the same calculator blueprint, which is the strongest validation the planned-purchase pattern has). Supporting: One Hour (proof placement + named guarantees), Expo (situation router), Keith's MS (30, tied co-leader — its JSON-LD hygiene yes, its self-contradicted rate promise and scripted "live" ticker no).

**Steal-stack.**
1. Two doors, one page, never mixed up: an EMERGENCY door (Strike Force) and a PLANNED-PURCHASE door (AirWorks/Champion Air), routed by a situation picker in the hero (Expo's router pattern).
2. Emergency door: priced diagnostic offer in the hero ($79 pattern) · licence number + ★/count in the strip · symptom picker as the form's first field ("What's going on?") · a response deadline with money or minutes on it ("within the hour") · three named promises printed "on every job ticket," including techs NOT on commission where true · separate after-hours number.
3. Planned door: the bundle-builder calculator — system picker with published ranges, per-system "what can change your price" factors, financing picker at disclosed terms, bill savings netted into an "Effective net monthly" figure (AirWorks + Champion Air, independently identical) · a 16-row-style us-vs-them comparison table (typical guy / PE brand / franchise / us).
4. Overall system (Cooling Co): published price ranges in the FAQ with honest APR · a dollar-for-dollar buyback-grade named guarantee · licence + zero-board-complaints-style negative-space credential where true.
5. Plan with published pricing: full benefit table, member economics stated (accruing credit pattern from Champion Air/Lenz), never an unpriced "ask about our plan."
6. Proof hygiene: ONE review number, identical in hero, JSON-LD and footer, rounded down if anything (AirWorks' 1,132 displayed as "1,000+").

**Hero / proof / CTA anatomy.** Priced offer + licence strip → symptom/situation picker → two routed paths. Emergency path collapses to phone + form with the deadline attached; planned path opens the calculator. Proof wall (licences, complaints record, ratings) sits directly under the hero zone; guarantees, ranges FAQ, plan table and founder story follow; dual close (call now / build your system). Motion: GSAP is permitted here only in the AirWorks manner — architected motion with a CSS backstop, deferred-loaded so the conversion layer never waits on it (F17 refined ceiling).

**Proven recipes that build it.** R24 Tier-pricing configurator (the bundle builder's chassis) · R21 Budget-radio quote form (symptom-first form flow) · R27 Filter pills with counts (situation/symptom routing) · R41 Frequency-toggle pricing (plan tiers, monthly/annual) · R42 Status & scarcity bars ("same-day slots open" — with the register's static-fallback rule; never a scripted fake-live ticker, per the Keith's caveat) · R20 Count-up trust stats · R45 Stacking service cards · R29 Testimonial carousel (cards rendered in HTML for SEO in production) · R23 CSS-only FAQ accordion · R1 Direction-aware reveals · R26 Mega-menu.

---

## Site 3 — LANDSCAPING incl. lawn + tree, FL (Concept)

**Crown / template sources.** Two crowns, one per business model — the trade genuinely has two machines and the demo must show both without mixing them: Richard Lusk, Newport Beach CA (33/35, project crown — the highest full-open score in Lane 3) and TruGreen (recurring crown — the complete system). Completed by Augusta Lawn Care (the only full published rate card in the national scan), Luv-A-Lawn, Central FL (guarantee stack + review volume at local scale) and Monster Tree Service (tree: credential-led emergency/project hybrid).

**Steal-stack.**
1. A model picker at the top routes the visitor: REC recurring (lawn/pest) or PROJECT (design-build/tree) — two machines, two paths, one homepage that knows which one it is selling (the lane's central finding).
2. Recurring path (the shipped formula is Lane 3's own verdict: "TruGreen's system + Augusta's published rate card + Luv-A-Lawn's guarantee stack" — a combination no incumbent in 387 scanned firms actually fields): problem-picker quiz as the quote entry (<2 minutes) → published rate card by lot size/service → plan tiers a buyer can self-select → first-application discount + money-back guarantee stack ("if the weeds come back between treatments, so do we — free") → vs DIY / vs Other Guys comparison table → reviews that name the technician.
3. Project path (Lusk skeleton): integrated promise hero ("designed and built as one complete project") → the CTA is a complimentary visit that PRODUCES A NUMBER — detailed scope + budget before any design begins (F14, the strongest consultation form in the bank) → "Budget first. Then design. Then build." 3-step process → three-stage case study (before → construction → finished) → licence numbers on the page.
4. Tree layer (Monster): "estimates by a certified arborist, not a salesperson" → line-item pricing shown on a tablet at the assessment, described on the site before the visit → during-job photo updates as a stated service feature.
5. The open flank, built deliberately: a working before/after drag SLIDER — Lane 3 confirmed no high-end landscaping site fields one; the demo beats most of that market on this feature alone.

**Hero / proof / CTA anatomy.** Rating + count in the hero (Luv-A-Lawn pattern) → model picker → path-specific hero offer (quiz entry for recurring; free budget-producing visit for project) → path sections as above → licence/credential strip on the project path → phone repeated at every path close. Photography: real-work only; the recurring path correctly carries almost no gallery (the product is a promise kept monthly).

**Proven recipes that build it.** R27 Filter pills with counts (problem-picker / model routing) · R41 Frequency-toggle pricing (plan tiers + rate-card presentation) · R28 Before/after slider (the open flank) · R33 Motion-clip proof hero (the three-stage case-study format) · R10 Grid-to-fullscreen gallery (project path; DOM port, no WebGL) · R13 Horizontal gallery + pagination (phone = native scroll-snap strip) · R20 Count-up trust stats · R45 Stacking service cards · R29 Testimonial carousel · R23 CSS-only FAQ accordion · R2 Masked word reveal kit (project-path headlines) · R26 Mega-menu.

---

## Site 4 — REMODELING (Concept)

**Crown / template sources.** Shared crown by role, per the 26 Oct ruling under Asiful's delegation: Elbaz Construction, Miami (31/35) + PHS Renovations, Winnipeg (31/35) as co-template skeletons; Home Gyms Design, UK (31/35) + LYKORA, Morocco (31/35) as crowned pattern sources; KBF Design Gallery, Orlando (29/35) keeps the proof-originality crown. Supporting deeps: CMK Tampa (proof-before-services order), Phoenix Home Remodeling (price-after-design), Harmony Basements (contractual promises).

**Steal-stack.**
1. Elbaz skeleton, in scroll order: outcome promise hero → licence in the FIRST screen (licence number + municipalities count) → before/after draggables → timed 8-stage process with week ranges printed on the stages → financing BEFORE the gallery (named lenders, $0 down, soft-check "Check If You Qualify") → reviews/projects → consultation CTA. One hero video maximum, poster-first — Elbaz's video-everywhere weight (1.14 MB HTML, 8 videos) is cut ~80% (his own lane's NOT-copy).
2. PHS layer: an Investment + Timeline figure on EVERY service card (Kitchens from $44,499 / 4–8 wks pattern) · 3D render + render video before demolition, with week-stamped design artefacts (each deliverable labelled with its week and the decision it settles) · the warranty CLOCK as a headline device: "You sign off when you are happy, not when we are finished — that signature starts your 2-year warranty."
3. Home Gyms layer: package tiers + a per-piece price list that reprices live by finish selection, with an "Add to enquiry" cart (visible selection state) — the quote path between a form and a shop; investment confirmed in writing before the client commits.
4. LYKORA layer: pricing as numbered sheets (per-m² tiers with priced add-ons) · a calculator carrying an honest non-binding footnote · the handover productised as a numbered defect-check protocol (250-point pattern) · render→photo "1:1 Realization" pairs on the firm's own assets. NOT copied: LYKORA's uncheckable absolutes ("0% Budget Overruns") — the bank's disclosed caveat; a demo prints only absolutes a record can defend.
5. KBF proof layer: place-first portfolio (projects browsable by neighbourhood, with counts) + ONE claim checkable against a public record (the deed-verified resale Ledger pattern) printed WITH its honest caveat — the caveat is what makes it believable (F12).
6. Contractual-promise slot (Harmony pattern): one promise with a number the operator can honour (per-day lateness credit pattern) — never imported unless operations can honour it.

**Hero / proof / CTA anatomy.** Proof-before-services order (CMK): the first screen is a verdict, not a pitch — promise + licence strip + proof bar (years / projects / rating / warranty) → services as Investment + Timeline cards → before/after → timed process with the price mechanism inside it (price set after design, argued as a named section) → financing → place-first portfolio + the checkable claim → consultation CTA whose deliverable is a number (F14/F15/F16; checklist items 15–17, 21–24).

**Proven recipes that build it.** R28 Before/after slider (table stakes in this trade — multiple instances) · R24 Tier-pricing configurator (per-piece repricing + enquiry-cart chassis) · R21 Budget-radio quote form (budget qualifier asked before contact details — the Advantage pattern) · R27 Filter pills with counts (neighbourhood project index) · R33 Motion-clip proof hero (the single permitted hero video) · R20 Count-up trust stats · R45 Stacking service cards (service cards with Investment + Timeline) · R29 Testimonial carousel · R23 CSS-only FAQ accordion · R44 Chaptered page + anchor nav · R1/R2 headline reveals (R2 masked words for the hero promise) · R26 Mega-menu.

---

## Site 5 — PLUMBING (Concept)

**Crown / template sources.** Zebra Plumbing, Melbourne AU (32/35 — the design-system crown, and the lane's high score) + Zoom Drain, US (31/35 — the emergency-conversion crown). Supporting deeps: Pimlico Plumbers, London (call density), Fallon Solutions, Brisbane (clickable licence verification, Good/Better/Best), Matt Plumbing & Heating, Birmingham UK (governed 28/35 — the one-van lightweight model; its fragment 31 was corrected on deep inspection and the governed score is what the bank uses).

**Steal-stack.** This trade's doctrine is the REVERSE of siding's: plumbing converts on the PHONE, not the form (anatomy §8) — the whole build is ordered around a sub-3-second call path.
1. Zebra's hero-adjacent 4-card USP band — one card per fear (licensed plumbers only / $0 call-out fee + transparent pricing / fully stocked vans, fixed first visit / book online in seconds, $50 credit) — each card with a bespoke SVG icon, over a custom icon set for all 9 services. The single most transferable design asset in the plumbing scan.
2. Zoom's problem-first hero: the H1 is the job ("We Fix Drain & Sewer Problems Fast"), and the interactive is a symptom-chip selector (4–6 chips) that routes to the matching service — a panicked visitor taps a symptom instead of reading.
3. A quantified response promise in step 1 of a 3-step process ("respond within 90 minutes" pattern), and tech text-ahead promised on the page ("we text you your plumber's name and photo before he arrives") — costs nothing, removes the stranger-at-the-door objection.
4. Call-density standard, measured in source across the lane: first tel: link inside the first ~6–10% of the HTML (Pimlico 6.8%, Matt 6.2%, Zoom 10.2%), repeated at every decision point (Pimlico carries 32) — one number, everywhere, identical (Pimlico's three different numbers are the NOT-copy).
5. Fallon's two devices: licence number hyperlinked to the regulator's own check page (one line of HTML, unmatched trust per word), and a written Good/Better/Best options block published before the visit.
6. A cash-backed punctuality pattern slot (Benjamin Franklin: $5 per minute late, capped, third-party-enforced guarantee) — as a slot for the client's real equivalent, never as copied figures.
7. Matt's two one-van steals: callback-within-an-hour as the hero CTA (turns "I might miss your call" into a guaranteed response window) and WEIGHT DISCIPLINE as a feature — 121 KB / 9 scripts / zero libraries is the demo's speed budget, proven attainable by a one-man firm.
8. Proof format rule (Matt governance lesson): each platform's score + count displayed separately, never blended into one merged "average."

**Hero / proof / CTA anatomy.** USP card band first → symptom-chip hero → 3-step process with the response promise in step 1 → us-vs-typical-plumber comparison chart (arrival updates / flat rate / warranty) → Good/Better/Best → licence-verify block → reviews (capped at 6–9 + aggregate; Zoom's wall is franchise depth, not a template length) → booking block. Sticky mobile call bar is the persistent element; the form is second. Motion: none of the top tier uses GSAP/Lenis (F12 finding across 18 mined pages) — GSAP reveals dosed at 0.4–0.8s as a differentiator, never ahead of the call path.

**Proven recipes that build it.** R27 Filter pills with counts (symptom chips) · R30 Comparison table (Other vs Us — zero JS) · R24 Tier-pricing configurator (Good/Better/Best presentation) · R21 Budget-radio quote form (the booking form — second to the phone, by doctrine) · R42 Status & scarcity bars (response-promise strip) · R20 Count-up trust stats · R45 Stacking service cards (services with the bespoke SVG icon set) · R29 Testimonial carousel · R23 CSS-only FAQ accordion (including the "what to do while you wait" emergency FAQ — stopcock-grade immediate-action content) · R4 Zero-JS scroll-timeline reveals (the light reveal layer; zero JS) · R26 Mega-menu. Total target: the whole page in Matt's weight class, not the 1 MB class.

---

## THE SITE-6 VERDICT — Concrete & Paving vs Siding & Windows

**WINNER: Siding & Windows.**

Decided under Asiful's 26 Oct delegation ("you make the decision"), on Lane 4's complete, closed evidence for both industries (concrete: 358 firms, plateau across waves 2–4; siding: 248 firms, plateau on two consecutive null waves 30–31). The weighing, criterion by criterion:

| Criterion | Concrete & Paving | Siding & Windows | Edge |
|---|---|---|---|
| US lead pool | 1,000 | 963 | Concrete, narrowly (+37, ~4%) |
| Crown strength | System Pavers 31 + Install-It-Direct 29 (combined 60) | Austin Pro 29 + Feldco 28 (combined 57) | Concrete, on points |
| Published-evidence system | Published installed $/sq ft ranges + Good/Better/Best packages + $25,000 minimum (Install-It-Direct) — form (b) of F7 | Austin Pro's **invoiced distributions**: 415 priced siding jobs 2022–2026, published median band $10k–$15k, per-project price bands, product-choice statistics from its own job files — form (e) of F7, the strongest form in the entire bank | **Siding, decisively** |
| Visual demo power | Before/after galleries; one claimed visualiser (Paverston) + one verified calculator with WhatsApp-photo visualisation (ResinPro) across the Top 5 | **177 draggable before/after pairs, each carrying a per-project price band** (Austin Pro) + upload-photo and per-product visualisers (Feldco) + the visualiser/estimator trio at small-firm scale (Cornerstone) | **Siding, decisively** |
| Template reusability | Comparison table, zip-first form, price ranges — strong, but already universal checklist items (see loser disposition) | The evidence machinery itself: invoiced distributions, price-banded sliders, project map, location-page skeleton, disqualifier + quote-validity — transfers to every other trade AND to his live UK work | **Siding** |
| The ownable gap | Instant price + visualisation in one flow — unshipped by its crowns; ResinPro's calculator + WhatsApp pairing is the closest | The same gap (anatomy v0.4's headline) — but surrounded by the bank's densest tooling evidence, so a fused demo is credible and differentiating | **Siding** |

**Reasoning.** Concrete wins the two criteria that are margins — 37 extra leads (~4%) and 3 combined crown points — and loses the four that are structure.

1. **Evidence form.** The anatomy file ranks the transparency forms, and Austin Pro's is the top of the whole bank (F7e): "Ranges are estimates; distributions are evidence." Concrete's published $/sq ft ranges are genuinely strong — and are the same form (b) that several lanes already hold. A demo built on siding teaches the strongest proof system the research found anywhere: a firm publishing what its own customers actually paid, with self-reconciling arithmetic a visitor can check (312 mapped projects + "574 more" = 886 documented; F12). That system then exports to all five other templates; a concrete demo's best assets do not export at the same level.
2. **Visual power.** A Concept demo is, in the end, something a prospect looks at. Siding's transformation is the face of the house, shown in 177 draggable pairs that each double as a price anchor; concrete's galleries are strong but its tooling is thin and partly unverified (Paverston's visualiser is site-claimed; across 358 scanned concrete firms, claimed tooling of any kind appears in ~7). Siding's tooling bench is deep and verified: Feldco's two visualiser tiers, Cornerstone's trio, Hatch Homes' visualiser whose pricing updates live as options change, Joyce's invoiced-median dataset as a second distribution system.
3. **Reusability — including into the live UK book.** Siding's location-page skeleton (one page per town carrying three genuinely local facts: local cost data, local permit rule, local housing-stock problem) is exactly the architecture of Asiful's live per-town UK preview work. Siding/windows is also adjacent to what his current UK prospects actually sell — fascia, soffits, guttering and UPVC windows are the same envelope trade (his Tradeline UPVC and Essex Fascias work sits here) — while US concrete/paving has no counterpart in his current book. The siding scan itself contains UK operators (Safestyle, CR Smith, Anglian), so the demo doubles as a UK-facing template; the concrete demo would serve the US pool only.
4. **The gap.** Both trades share the bank's headline ownable gap — an instant price paired with a visualisation in one flow, which no crowned firm in either trade ships as a single flow. In siding, that fused build sits on the richest surrounding evidence (estimators, visualisers, distributions all verified at multiple firms), and the thing being visualised — the house's face, recoloured and re-sided from an uploaded photo — is the highest-impact visual a homeowner can be handed. The Site 6 demo ships that fused flow as its flagship interactive; it becomes the reference implementation the other five templates borrow from.

**What happens to the loser — Concrete & Paving.** Banked as **the first phase-2 site (Site 7)**, built immediately after the six, from its complete closed file (358 firms, final crowns, 11 screenshots) — nothing about its evidence is discarded or downgraded. In the meantime its patterns are folded into Site 6 and the shared skeleton now, because they were never concrete-specific: System Pavers' us-vs-them comparison table as an early section (already recipe R30, universal), the zip/postcode-first form field, Install-It-Direct's published installed ranges + line-item quote language + per-city permit section, the named install system + one engineering number (Permalast™ / 8,000 PSI pattern), the published minimum-project qualifier for high-ticket trades, ResinPro's "every photo is our real work" gallery caption and its calculator + WhatsApp-visualisation pairing (the concrete form of the fused flow, held ready for Site 7), and Paverston's photo-estimate CTA. Paverston and ResinPro stand as tied first reserves in the bank if Site 7's spec needs a third source.

---

## Site 6 — SIDING & WINDOWS (Concept)

**Crown / template sources.** Austin Pro Siding, Windows & Roofing, Austin TX (29/35, Crown 1 — the documented-project transparency model; its crown challenge against Feldco was filed openly and upheld on opened, source-checked evidence, then Lane-5-verified) + Feldco (28/35, Crown 2 — the tooling/video template model). First reserve: Allied Exteriors, TX (27/35 — the anti-pressure system; displaced by Austin Pro's filing, its devices retained as synthesis steals). Supporting: Cornerstone Renovations (visualiser + estimator + ranges trio), Hatch Homes (visualiser with live-updating pricing), West Shore Home (location-page skeleton), Pacific Exteriors (problem-trio opening).

**Steal-stack.**
1. Austin Pro's transparency spine: publish the firm's own invoiced distribution — median band + middle-half range — with the sample caveat printed on the page ("a documented sample, not every job"); per-project price bands attached to draggable before/after pairs; a project map whose count reconciles with the stated documented total; product-choice statistics drawn from the same job files.
2. Feldco's top layer: hero video of real work (the date does the trust work — "since 1976" pattern), count-up stats in trade-specific units (sq ft of siding installed, not generic "projects"), a referral section with a named, simple reward, and page-weight discipline (Feldco carries this feature set at 157 KB — the efficiency benchmark of its deep set).
3. THE FLAGSHIP BUILD — instant pricing + visualisation in ONE flow (the ownable gap, anatomy v0.4 headline): upload a photo of your house → see it re-sided/re-windowed → get a ballpark band from published ranges in the same flow, before any contact capture. No crowned firm in the bank ships this fused; Cornerstone's trio and Hatch's live-pricing visualiser are the closest verified evidence that its parts work.
4. Allied's anti-pressure layer: published price ranges with the factors that move them · the quote-validity period printed IN the hero ("written quote good for 30 days" pattern) · the disqualifier section ("Are we the right fit?" — telling the wrong customer to go elsewhere is the strongest trust move in the siding scan and costs nothing) · repair-over-replacement honesty as a named policy · projects and reviews named "Product + Town."
5. Manufacturer proof in the right order: installer-tier status (Hardie Elite Preferred / President's Club pattern) above review volume; one consistent review number everywhere (the Thompson Creek headline-vs-footer mismatch is the cautionary tale).
6. Financing answered on the page with a WORKED example (Austin Pro: $15,000 at 7.99% over 120 months = $181.91/mo, exact to the cent) — never BOGO-with-exclusions, never an up-to anchor against a stale price (the two NOT-copies, from NewSouth and West Shore).
7. Location skeleton (West Shore, minus its 1.17 MB weight and promo mechanics): one page per town, each carrying local cost data, the local permit rule and the local housing-stock problem — never city-swap boilerplate.
8. Pacific's opening move, localised per market: the problem trio (name the visitor's three anxieties — damage extent, repair overwhelm, affordability — before the product).

**Hero / proof / CTA anatomy.** This trade converts on the QUOTE FORM, not the phone (the reverse of plumbing, confirmed across both lanes): sticky element = "Get my written quote," with the validity period in the button's subline; phone present early and often as backup (best in scan: tel ×7). Hero: real-work video + quantified proof (4.9★ / counted reviews + installer-tier status in the strip) → flagship fused flow as the hero-adjacent entry → documented-project section (map + distribution + price-banded pairs) → product × option education (Renewal's matrix pattern: every product page answers style + colour + hardware + glass) → named 4-step process → financing with the worked example → disqualifier → FAQ ending in the same single CTA. Motion: nobody at or above 26 in this trade loads GSAP/ScrollTrigger/Lenis — the demo's craft comes from the tooling and the proof, dosed with the standard reveal family only.

**Proven recipes that build it.** R33 Motion-clip proof hero (Feldco's video layer, at Feldco's weight discipline) · R28 Before/after slider (the price-banded pairs — the slider carries a price band per pair) · R36 Colour customiser (the visualiser's base mechanic — library-free, <11 KB; the upload-photo flow is built on it) · R24 Tier-pricing configurator (the instant-price half of the flagship flow; R36 + R24 fused = the gap build) · R27 Filter pills with counts (project map / gallery filtering by product + town) · R20 Count-up trust stats · R30 Comparison table (us-vs-typical-company, Allied format) · R21 Budget-radio quote form (the written-quote form) · R29 Testimonial carousel · R23 CSS-only FAQ accordion · R45 Stacking service cards · R1 Direction-aware reveals · R26 Mega-menu (product × option architecture).

---

## Build order — the six, in sequence

1. **Roofing** — biggest pool (3,692), his live trade in two countries, and the bank's highest crown (33): Stronghold's skeleton becomes the shared skeleton every other site forks from.
2. **Siding & Windows** — the flagship fused price + visualisation flow is built second, so its configurator/customiser/price-band components exist before HVAC's planned path and Remodeling's enquiry cart need them.
3. **HVAC TX/FL** — the dual-path anatomy (emergency + planned) reuses Roofing's emergency discipline and Site 6's calculator maths; heat-market buyers are the fastest-converting pool after roofing.
4. **Remodeling** — the highest tickets and the heaviest proof system; it inherits the price-banded slider and configurator patterns proven in Sites 2–3 instead of pioneering them.
5. **Landscaping FL** — the second-largest pool (1,792), but both its machines are assembled from components already built (quiz routing, rate-card toggle, slider), so it ships fast late in the sequence.
6. **Plumbing** — the lightest build in the set (phone-first, vanilla layer, Matt's 121 KB budget) and the smallest pool (828): it blocks nothing, borrows everything, and closes the set quickly.

Phase 2, immediately after: **Site 7 — Concrete & Paving (Concept)**, per the verdict section above.
