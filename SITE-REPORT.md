# Owner order: full site final gate report

Elbaz Construction, five pages built from `remodeling/src/` with `python3 build.py` into `remodeling/site/`. Every line below comes from a script in `remodeling/src/tools/` with its output in `remodeling/qa/`. Each one can be re-run.

## The site

| Page | File | Sections, each with its own switcher | Versions per section | Weight |
|---|---|---|---|---|
| Home | `elbaz-homepage.html` | hero, proof, services, ba, process, financing, work, reviews, towns, consult | hero 16, others 12 (8 visible + backups) | 3.08 MB |
| Kitchens | `kitchens.html` | kitchen-intro, kitchen-scope, kitchen-work | 10 (5 visible + b1–b5 records) | 1.28 MB |
| Bathrooms | `bathrooms.html` | bath-intro, bath-build, bath-work | 10 (5 + b1–b5) | 1.30 MB |
| Renovation | `renovation.html` | reno-intro, reno-services, reno-permits | 10 (5 + b1–b5) | 1.00 MB |
| Contact | `contact.html` | contact-form, contact-visit, contact-area | 10 (5 + b1–b5) | 0.66 MB |

**Services coverage.** Every service the firm publishes has a home:
- Kitchen Remodeling and its 10 sub-services: Kitchens.
- Bathroom Remodeling and its 10 sub-services: Bathrooms.
- Whole-Home Renovation, ADUs & Additions, New Construction, Commercial Remodeling, Flooring, Roofing, Windows & Doors, Outdoor Living and Planning & Permitting: Renovation.

All 11 also appear as the service picker in Contact v4.

**Per-section versioning (owner clarification).**
- Every inner section works like a homepage section: five visible versions, its own switcher in the nav, and deep links (`?kitchen-work=3`).
- It also has five hidden release records (b1–b5).
- The records were cloned when each page was released (`tools/expand.py record`), so later fixes touch only the visible versions.

## Gate results

| Gate item | Result | Evidence |
|---|---|---|
| **Token check** | **Pass.** 0 off-token colour literals. Homepage sections are checked on presented code; all 12 inner sections are checked on every line, records included. The token set has 18 values. | `python3 tools/tokencheck.py` |
| **Light check** | **Pass on all five pages.** 0 near-black grounds and no deep green. Inner pages are checked on the visible versions *and* all 60 records. | `qa/gatecheck.txt`, `qa/gatecheck-{kitchens,bathrooms,renovation,contact}.txt` |
| **Logo** | **Pass on all five pages.** Header, footer and favicon are all the roof-E SVG, and header and footer share one image. | the `logo:` line in each gatecheck file |
| **Facts** | **Pass on all five pages.** FACTS FAILS: 0 on every page. Detail below. | `qa/facts-site-home.txt`, `qa/facts-{kitchens,bathrooms,renovation,contact}.txt` |
| **Integrity: switchers** | **Pass.** Homepage switchers 1–8 on all 10 sections. Inner switchers 1–5 on all 12 sections. | `qa/site-{home,kitchens,bathrooms,renovation,contact}-gate.txt` |
| **Integrity: backups open** | **Pass.** Homepage 44/44. Kitchens, Bathrooms, Renovation and Contact 15/15 each. Two Contact records were also exercised directly (finder list and service-picker form). | same files |
| **Integrity: records unchanged** | **Pass.** All 60 inner records (HTML block, CSS rules, JS definition) are byte-identical to their release commits (24682e1, e38aec8, 3740be1, 140eac9). Homepage section files are untouched since the homepage gate, so its 44 backups still match. | `python3 tools/recordcheck.py` → `qa/recordcheck.txt` |
| **Contrast** | 0 text below AA in any visible slot on any page. | the `site-*-gate.txt` files |
| **Reactions** | Every interactive element on every page reacts, with no duplicate specs. Homepage: 470 + 198 + 106. Inner pages: see `qa/rxcheck-site.txt`. | `tools/rxcheck.js` |
| **Mechanisms** | Every page passes in both motion settings with 0 page errors. | `tools/{kitchens,bathrooms,renovation,contact}test.js` |
| **Links** | All internal links and anchors across the five pages resolve. Book links on inner pages go to `contact.html#contact-form`. | link sweep |
| **Copy** | 0 em dashes in any page's text, alt text or labels, records included. | text sweep |

**Facts detail:**
- The licence line reads exactly "Licensed, bonded & insured · CBC1265280", always in its own block. The long form appears only inside a sentence (Renovation, permit questions).
- The only rating printed is 4.8 and the only review count is 343.
- Every before/after on the inner pages is one of the homepage's four published pairs. There are no new pairs.
- "52 photographed projects", "30+ years" and owner names appear nowhere.
- The 104 municipalities read 34 / 31 / 39 from the map data.
- All 10 Contact form versions (5 visible + 5 records) carry:
  - the phone link
  - Sun–Fri 7am–7pm · Saturday closed
  - 19 W Flagler St #310, Miami, FL 33130
  - the exact privacy sentence
- `facts.js` now checks `contact-form` as it checks `consult`.
- Forms compose an email to Sales@elbazconstruction.com and say so before sending. Nothing claims a message was sent.

## Fixed during the site build

- **Legacy b1 rule.** A homepage-era rule gave any non-hero section's b1 backup the old dark ground and the Bebas/Geist fonts, which would have hit every inner page's first record. It is now scoped to the nine homepage sections it was written for, and homepage output is unchanged (commit 3bd343c).
- **Tooling.**
  - `gatecheck.js` takes `FILE`, `SECS`, `BACKUPS`, `PAIRS` and `OUT`, and its rating pattern now also reads "4.8 · 343 Google reviews".
  - `tokencheck.py` covers the inner sections.
  - `recordcheck.py` is new.

## For the owner

1. **Two photo/title mismatches** (`k-walnut-marble`, `k-emerald-shaker`) are still left out of every new page until the right titles are confirmed.
2. **Weight.**
   - The homepage is 3.08 MB, above the earlier 2.6 MB target, and unchanged by this work.
   - The inner pages are 0.66–1.30 MB because each ships only its own images.
3. **"Usually the same or next working day"**, shown after a form hands off to email, is the firm's published form-success text (FACTS.md). Please confirm it is still the promise you want to make.
4. **Open now / closed now** on Contact is worked out from the published hours in Miami time. It is only as accurate as those hours.
