# Roofer Lead Finder (v5)

Takes your Google Maps roofer export (100k rows), finds **who most needs a new website and can pay for one**, and gives you a ranked
shortlist (e.g. the top 20,000) with owner clues, contact info and a ready-made email opener.

## Run it (Windows)
1. `0_SETUP_ONCE.bat` (installs and self-tests), then `1_OPEN_DASHBOARD.bat`.
2. Follow the five steps on the page. Everything can be stopped and resumed; progress is saved continuously.

**Before the big crawl, use the QA test card:** *Test 100 likely roofers* (judges real research quality) and *Test 100 random leads*
(technical reliability). Each crawls **exactly 100 leads and nothing else** and lists per-lead results so you can check them by eye.

| Step | What it does |
|---|---|
| 1 Import | CSV/XLSX; detects Maps columns; keeps leads with **no website** (best prospects); removes duplicates, closed and non-roofers; first ranking from reviews/category |
| 2 Check websites | Homepage of every lead: loads? dead/parked/suspended? HTTPS/SSL valid? mobile-friendly? how old (last update, builder, agency)? robots-blocked? |
| 3 Shortlist | Pick the top N (optionally by state / min reviews) |
| 4 Deep check | Team/about/contact/reviews/projects/careers pages: owner and team names, direct emails, hiring, certifications, financing, ads/software used, recent work |
| 4b Social + domain | Public Facebook/Instagram/YouTube/LinkedIn follower counts; domain age, expiry, registrar (RDAP) |
| 4c Google search *(optional)* | Needs a Serper / Brave / SerpAPI key (~$1 per 1,000 searches). Owner names, BBB, local Google rank for "roofing contractor <city>", and websites for leads that had none |
| 5 Export | Compact `.xlsx`: outreach list, owner-lookup list, or everything (with the reason anyone was excluded) |

## What counts as a roofer (evidence order)
1. **The website (strongest):** a roofer is confirmed only by roof-specific evidence (title/headline says roof, or 2+ of roofing / roof repair / replacement / shingles / reroof…). Gutters, siding, storm damage, hail and insurance never confirm a roofer on their own.
2. **Business name + Google category (strong):** used for the first pass; only clear other trades (fence, pool, concrete-only…) are skipped, and the website can overrule that.
3. **Search keyword / notes (weak):** how the lead was found, never a reason to reject a company.
"Needs a browser" (JS-only site) is flagged only when no page of the site could be read.

## How leads are scored
* **Need** – no site / dead / parked / invalid SSL / not mobile / outdated / thin / no way to convert…
* **Pay** – estimated revenue (reviews, team size, years), ads, call tracking, roofing software, certifications, financing…
* **Ease** – owner-operated, direct email, no agency, DIY site, timely trigger (site down, domain expiring)…
* **Priority** = need^0.45 × pay^0.35 × ease^0.20 (you need all three). Weights are editable in Settings; click *Re-score*.
* Every score has a "why" list in the lead detail panel. Revenue is a rough estimate (±50%), labelled as such.

## Power
Slider 1–1,000. Tick **Unlock higher range** for 2,000 / 3,000 / 5,000 (hard cap). Power can be changed, paused or stopped **live**.
*Auto* ramps up while the network is healthy and backs off on timeouts. Low RAM/disk only lowers power, never blocks Start.
More power ≠ more speed past ~1,000: throughput is limited by your CPU, router and the sites' response times.

## Honest limits
* Facebook/LinkedIn often show a login wall; those are recorded as "blocked", never guessed. Google cannot be scraped directly (hence the API key).
* Sites that need JavaScript to render are flagged "could not read" and given a neutral score, not a guess.
* Only public pages are read; robots.txt is obeyed (switch in Settings). For cold email, include your postal address and an unsubscribe (CAN-SPAM).
* Sizes (100,000 leads): database ≈ 120 MB before crawling, ≈ 250–400 MB fully crawled; full `.xlsx` export ≈ 10–30 MB.

## Tests
`python tests/test_integration.py` · `test_enrichment.py` · `test_qa.py` · `test_dashboard.py` · `test_engine_live.py [sites]` · `test_chaos.py` (hostile servers) · `test_scale.py [rows]`
