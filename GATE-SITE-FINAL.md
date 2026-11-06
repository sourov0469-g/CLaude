# GATE — WHOLE SITE (homepage + five inner pages, one file)

**File:** `siding/redo/final/out/final.html` (one self-contained file, about 6.1 MB against the 22.5 MB ceiling; built by `siding/redo/final/build_final.py`). **Under:** Muse's order of 11-06 (inner pages, one by one, in navigation order, finishing with Contact Us; no maps; no external links; videos linked, never embedded, never the same video twice; normal fonts; backgrounds never pure white; cursor companion across the site; Contact form with an empty, marked endpoint).

## 1. The site

| Route | What it is | Gate | Self-score | Page checks (on the integrated file) |
|---|---|---|---|---|
| `#/` | Homepage (11 sections, accepted) | `GATE-FINAL-Homepage.md` | | 22/22 whole-page |
| `#/siding` (+ `/lap`, `/board-batten`, `/shingle-shake`, `/trim-soffit`) | Eight sections: a wall that hangs itself, HardiePlank profile drawn to scale, build-a-board-and-batten wall, eave cut (full wrap vs faces only), six-layer exploded wall with the 12 + 17 colour sets, the published 415-job price histogram, before/after wipe, built-for-Texas facts | `GATE-PAGE-Siding.md` | 8.45 | 75/75 |
| `#/windows` | Seven sections: a tape across a wall opening, an exploded window per published line, a glass-package picker, a walkable ordering timeline, the 376-job price distribution, before/after wipe, warranties as two layers | `GATE-PAGE-Windows.md` | 8.46 | 71/71 |
| `#/roofing` | Seven sections: lay a roof four ways, price rail for shingle and metal, a pitch selector showing the published warranty rule, "fewer than 2%" as a hundred dots (GAF's own claim), a walkable storm-claim timeline, the Owens Corning before/after revealed course by course | `GATE-PAGE-Roofing.md` | 8.38 | 55/55 |
| `#/our-work` | Seven sections: 886 squares you count (lock wording, no map), trade ledger, towns as bars, the APS-4867 job file with a drag-through timeline, a gallery with a pair viewer, how to read a price band | `GATE-PAGE-OurWork.md` | 8.47 | 68/68 |
| `#/contact` | The paper form (ink on a ruled pad), in-page thank-you, week-of-hours chart, addressed envelope | `GATE-PAGE-Contact.md` | 8.68 | 30/30 |

The header, the phone menu and the footer link to every page; "Book a free inspection" on an inner page opens Contact; the homepage receipt's one button lands on Contact; Siding's four header cards land on four real sections of the Siding page.

## 2. Final whole-site pass (`tools/site_test.js`, 19 of 19 pass) and the router test (13 of 13)

- **Every navigation link lands:** all 17 links in the header, footer and phone bar resolve to a real page or section of this file, and the four Siding anchors exist.
- **No external links or sources:** the only `http` text in the file is the homepage film's three linked sources (`hero-test/tablet/mobile.mp4`: one film, three renditions, **linked from data attributes, never embedded**); no iframe, embed, object, form action or `<video src>`; the browser makes no request except that film when the wall plays. **No inner page has any video**, so no video is used twice.
- **mailto:** only `info@austinprosiding.com`, as a contact detail; the Contact form has no `action`, no `method` and no mailto path (verified: sending changes nothing in the address bar, opens no popup and makes no request).
- **No maps:** the word "map" and any map-like graphic are absent from all five inner pages (the homepage keeps only the locked wording "312 on the map with photos + 574 more counted").
- **Form rules:** the Contact form is the only form on any inner page (the homepage Area finder is a search control); the endpoint is **empty and marked in the code** (`FORM_ENDPOINT` in `src/page_contact.js`); both endpoint paths (200 and 500) were tested on a patched copy.
- **Backgrounds, fonts, structure:** no surface covering 12% of the screen is pure white on any page; Montserrat and Inter only; one h1 per page; every image has alt; no duplicate ids; no page scrolls sideways at 1440, 1024, 768 or 390 px; 0 page errors on any route, and in a full reduced-motion pass.
- **Cursor companion:** global (one ring and one spirit-level vial; off for touch and reduced motion); drag areas on the new pages are marked.

## 3. Governing reference and WEB-SKILLS (site level)

Each page gate names its own governing reference and carries its own ledger. Site level: ⟦S1434⟧ visual-hierarchy (one idea per screen on every page); ⟦S0220⟧ anti-slop (every number and sentence on the Siding, Windows, Roofing and Our work pages is asserted at build time against FACTS.md, the FAQ, the data files or the firm's own harvested pages; nothing invented, no unpublished sums); ⟦S0231⟧ web-performance (about 6.1 MB for six pages, no library, transform/opacity animation); ⟦S0400⟧ accessible-animation (every page has a reduced-motion layout); ⟦S0054⟧ fixing-accessibility (real links and buttons, 3 px focus rings, live regions on page change, focus moves to the page, dialogs with Escape and focus return); ⟦S1441⟧ fitts-law (targets ≥ 44 px, measured on every page).

## 4. Remaining issues, named honestly

1. **The Contact form sends nothing until `FORM_ENDPOINT` is set** to the firm's own form-handling URL at real launch. With it empty the visitor still sees the thank-you (as ruled); no data leaves the page.
2. **Our work shows 14 of the 177 published pairs**, because only those images exist in `siding/work/dl`; the page says so. Pair images are re-encoded small (about 560 px), so they look soft in the large viewer.
3. **316 versus 312:** the firm's own pages say "316 with photos" in places, while the count lock is 312 + 574 = 886. The pages use the lock; "316" appears nowhere. Unresolved in the source.
4. **Shingle and shake and Trim and soffit are thin by design:** the firm publishes almost nothing about them, so those sections quote only what is published (the Shingle and shake anchor sits inside the Board and batten section).
5. **Roofing has no price histogram** (no roofing cost guide was harvested); **metal has only 29 priced jobs**, and the page says so. The Owens Corning "after" photo follows the earlier build's convention and could not be re-verified against the firm's site; the Milwood month differs across the firm's own pages (the pair's May 2026 is used).
6. **Window-kind mechanics and glass sections are general**, flagged on the pages; **trim and soffit stay unrecolourable** in the Visualiser; **Austin's tally** uses `near.json`'s 541.
7. **Several governing references are named from memory** (not re-fetched) in the Siding and Roofing gates.
8. **Optional polish not applied:** the Area street signs stay deep green (they read well with the page's palette); changing them to wood remains a one-line change if wanted.
9. **Testing is Chromium only, headless software rendering, emulated touch.** Safari, Firefox and a physical phone were not used. Scores are self-ratings, not Muse's.
10. **Hero photo #36 is still the best available, not hero-grade** (swap via `tools/prep_hero.py`).

## 5. Sub-agent use, stated honestly

For the inner pages two sub-agents ran in parallel under my written brief (`siding/redo/final/PAGES-BRIEF.md`): one built Siding then Roofing, the other Windows then Our work. I built the router and navigation, the Contact page, the integration, the whole-site test and this gate myself, re-ran every page's own test on the integrated file, and fixed what the whole-site pass found (a pure-white worksheet panel on Our work; the Contact script now skips itself in a stub build). Per the owner's instruction, **no new sub-agent was started after those two**; both have finished.

## 6. Verdict

**WHOLE SITE COMPLETE.** Five inner pages and the homepage are in one file, every navigation link lands, there are no external links, no maps, no second video, and the form rules hold.
