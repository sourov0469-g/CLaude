# Roofer Lead Collector (v5.3)

Takes your Google Maps export (100k rows) and **collects everything it can find about every lead**, then saves it in one compact
`.xlsx` for you to analyse (e.g. with ChatGPT). It does **not** filter, rank or score anything in that file.

## Run it (Windows)
1. `0_SETUP_ONCE.bat` (installs and self-tests), then `1_OPEN_DASHBOARD.bat`.
2. **Import** your CSV/XLSX → **Collect everything** → **Download collected data**. Stop/resume any time; progress is saved.
3. Use **Test on the first 100** before the big run: it crawls exactly 100 leads and shows the results in the preview table.

## What is collected per lead
* **From your file:** name, Google category, phone, address, city/state, Google rating and review count, Maps link, any email/social columns.
* **Website:** does it load, or is it down / parked / suspended / blocked; HTTPS and SSL validity; mobile-friendly; last update (page dates,
  sitemap, Last-Modified, copyright year); what it was built with (WordPress theme, Wix, GoDaddy…), agency footer, legacy tech; page title and
  **real text from the homepage, about and team pages** (menus and footers removed).
* **Inner pages:** about / team / contact / reviews / projects / blog / careers / financing / service areas (found from the navigation, or by
  trying standard addresses when the navigation can't be read).
* **People & contact:** all emails, phone numbers, **owner / decision-maker names and titles, team members**, social profile links
  (Facebook, Instagram, LinkedIn, YouTube) with follower counts where the platform shows them.
* **Business facts:** services, certifications, licence numbers, years in business, team size, financing, storm/insurance work, commercial work,
  hiring, ads/software in use, recent work with dates.
* **Domain:** registration year, registrar, expiry date (RDAP).
* **Data notes column:** says exactly what is missing and why (blocked by bot protection, JavaScript-only site, duplicate of row N, not collected yet).

Duplicates, non-roofers, leads with no website and closed businesses are **kept and labelled**, never dropped.

## Size
Per lead: ~1.3 KB in the database and ~0.5 KB in the export. **100,000 leads ≈ 240 MB database, ≈ 50 MB export.**

## Power
Slider 1–1,000. Tick **Unlock higher range** for 2,000 / 3,000 / 5,000 (hard cap). Change power, pause or stop **live**.
*Auto* ramps up while the network is healthy and backs off on timeouts. Past ~1,000 more power rarely helps: your CPU, router and the sites' speed limit it.

## Honest limits
* **Bot protection.** Some sites answer with a captcha / "verify you are human" page. The crawler labels them "Blocked by bot protection" and does
  **not** try to defeat them. In a test from a datacenter network ~25% of real roofing sites did this; from a home connection it should be far
  fewer. Use **Retry sites that failed** later (or from another network).
* Facebook/Instagram usually hide follower counts without a login; LinkedIn often shows them. JavaScript-only sites give little text.
* Owner names are found on ~1/3 of sites (many don't publish them); emails on ~2/3.
* Only public pages are read, and robots.txt is obeyed (switch in Advanced). Cold-email rules (CAN-SPAM) are your responsibility.

## Optional (Advanced section)
Heuristic need/pay/ease scoring and ranked exports, a shortlist, and a Google-search stage (needs a Serper/Brave/SerpAPI key, ~$1 per 1,000
searches: owner names, local rank, BBB/Yelp pages, websites for leads with none). None of this is used by the research export.

## Tests
`python tests/test_research.py` (the core promise) · `test_integration.py` · `test_storage.py` · `test_qa.py` · `test_enrichment.py` ·
`test_dashboard.py` · `test_real_file.py` · `test_engine_live.py [sites]` · `test_chaos.py` (hostile servers) · `test_scale.py [rows]`
