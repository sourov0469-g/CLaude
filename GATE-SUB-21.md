# GATE: Subpages, Round S21 — Header and menu links for the page views, and the subpage close

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. Plan: GATE-SUB-01, Part 2 ("the header nav will be pointed at the page views once each page has its sections").

**Defaults:** the homepage default is **unchanged**. Its header, phone menu and footer links are exactly as before, as the brief requires ("nothing in this brief changes a default"). Pointing the homepage header at the page views is offered as a switchable alternative for the owner to pick: `?hnav=pages`, shown in the review switcher as **Header links: A Homepage sections (default) / B Page views**.

## Defect found and fixed

On every subpage, **22 links were dead**. They pointed at homepage anchors (`#windows`, `#process`, `#booking` …) that do not exist on that page:
- the header items;
- the Siding fan;
- the phone menu;
- the footer.

The S1–S20 gates did not catch this because the dead-link test only ran on the homepage. Every subpage now has 0 dead links.

## Plan lines

| Item | Reference | Skills |
|---|---|---|
| Header on page views | Cash App Brand Guidelines (one obvious place per page) | Siding / Windows / Roofing / Our work go to their pages. A new **More** disclosure (button + `aria-expanded`, hover on fine pointers, Escape, focus-out closes) holds Reviews, About, Service Area and Contact. The current page gets `aria-current="page"`. |
| Siding fan | Scout Motors (a plain card) | The four board cards go to the Siding page, and a "The Siding page →" bar is added under them |
| Brand mark | (convention) | Goes back to the homepage from any subpage |
| Phone menu | Dropbox Brand (a list set large) | On a subpage it lists Homepage plus the eight pages, with the current one marked. On the homepage with option B, the page list sits above the section list. |
| Footer and any other leftover anchor | (honest routing) | `#siding`, `#windows`, `#roofing`, `#reviews` and `#area` go to their pages; the rest go back to that homepage section (`?#process`) |
| Audit carry-over | (switcher) | Every rewritten link keeps `review` and `hnav`, so the switcher stays open while you move between pages |
| Narrow desktop (861–1180 px) | S1496 header rules | With "More" present, the phone goes icon-only (its screen-reader label "Call (512) 550-0000" stays) and items don't wrap. Below 960 px the brand subtitle hides. All of this applies to page views only. |

## Self-tests

| Check | Result |
|---|---|
| Homepage default | Header unchanged (`#windows`, `#roofing`, `#area`); phone menu unchanged (8 section links); no page list; 0 dead links |
| Each of the 8 pages | 0 dead links; the right header item is current (Siding page: Siding; Reviews, About, Area, Contact: More); the brand goes to `?` |
| More | Hover opens it; Reviews, About (current), Service Area, Contact; clicking Contact loads "Contact \| Austin Pro Siding, Windows & Roofing"; Enter opens and Escape closes from the keyboard |
| Fan | All five links go to `?page=siding` |
| Footer on a subpage | Siding, Windows and Roofing go to their pages; How a job runs → `?#process`; Try the job → `?#try`; On your street → Service Area; the 4.9 line → Reviews |
| Review mode | `?review&page=work`: links keep `review`; the brand goes to `?review` |
| Option B | `?review&hnav=pages`: the homepage header goes to the pages, and the switcher row reads "Header links: A Homepage sections · B Page views" |
| Phone menu, subpage | Homepage, Siding, Windows & Doors, Roofing, Our Work, Reviews (current), About, Service Area, Contact |
| Header fit, page views | 870 / 960 / 1024 / 1180 px: no overlap, no wrap |
| Gate checks | The homepage, `hnav=pages` and all 8 pages, each at 1440 / 768 / 390: 0 errors, 0 overflow, 1 h1, 0 duplicate ids |
| Locks | "5,000" 0, "steel" 0, "Central Texas" 0; "883" appears only inside image coordinate data (unchanged from S20) |

Screenshots: `siding/redo/site/gate/s21-nav-*.jpg` (More open, fan with the Siding page bar, phone menu, header at 870 px).

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Site | page views | navigation patterns: the current page marked, no dead link |
| Element | More | disclosure with keyboard and focus handling |
| Element | phone menu | the page list |
| Element | narrow header | responsive priority (phone icon kept, label kept for screen readers) |
| Honesty | defaults | homepage default untouched; option B for the owner |

**Critique pass:**
- **Footer:** the footer's "On your street" label now leads to the Service Area page on subpages. That is the closest page, but the label is the homepage's. Left as is, because the footer text is a homepage default.
- **Header:** on the homepage the header still shows four items only. Reaching the pages from there needs option B, or the owner's pick.

## Scorecard (D40 / U30 / C20 / Ct10)

| Item | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Page-view navigation (header, More, fan, phone menu, footer) | 8.0 | 8.8 | 7.0 | 8.6 | **8.10** | PASS |

**Vetoes: none.**

---

# Subpages complete: summary

All eight pages are built inside the one file, in the brief's order. Every section has three completely different versions, and version A is the default.

| Page | Sections | Versions | Sections, in order |
|---|---|---|---|
| Siding | 6 | 18 | Opener · The board · What siding costs here · Warranty and time on site · Siding jobs on record · Book the siding inspection |
| Windows & Doors | 6 | 18 | Opener · The makers · What windows cost · How a window goes in · Doors · Book the window inspection |
| Roofing | 5 | 15 | Opener · What a roof costs · Roofing jobs on record · What homeowners said about roofs · Book the roof inspection |
| Our Work | 5 | 15 | Opener · The photographs · By trade · The latest jobs · Book |
| Reviews | 5 | 15 | Opener · The reviews · People they name · By the work done · Book |
| About | 5 | 15 | Opener · The story · Credentials · How we work · Book |
| Service Area | 5 | 15 | Opener · Towns · Neighbourhoods · From the office · Book |
| Contact | 3 | 9 | Ways to reach us · The office · Book the inspection |
| **Total** | **40** | **120** | All passed their gates (S1–S20); none failed |

**How to view:**
- `?page=<siding|windows|roofing|work|reviews|about|area|contact>`
- Add `&review` for the switcher (with its Page row).
- Add `&<slot>=a|b|c` for any version.

**File:** `siding/redo/site/out/site.html`, one file, about 15.9 MB.

**What held throughout:**
- Locks verbatim.
- Figures only from the homepage.
- Reviews only as verbatim excerpts (the build fails otherwise).
- Photos are only the firm's eight documented job photos.
- No drawn or generated maps.
- No form anywhere on the subpages, so nothing claims a message was sent or saved.
- Locked mechanics (dive, drivable map, configurators, mini-games) were not reused.

**Open for the owner:**
1. Pick the winners per section.
2. Choose header links A or B on the homepage.
3. The QR asset request from GATE-OVERNIGHT-R30 still stands.

**Next under the brief:** nothing is left in the work order (corrections, hero ladder, section ladder, subpages). I am standing by for Muse's audit or the owner's picks.
