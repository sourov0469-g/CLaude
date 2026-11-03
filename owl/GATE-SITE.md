# GATE · The whole Owl Roofing site (6 pages, one file): scorecard gate

**Where it lives:** `owl/site/owl-roofing.html` (built from `owl/site/src` by `python3 -I build.py`). Pages are in-file:
`#/home`, `#/services`, `#/storm`, `#/nest`, `#/families`, `#/contact`; deep links `#/page/section`. Versions switch
with `?v=section:1|2` or the panel (Shift+V).

## What exists
| Page | Sections (each with exactly 2 versions and a gate) |
|---|---|
| Home | hero, proof, nest, game, services, families, storm, reviews, price, area, call (11) |
| Services | sp-cover, replacement, repair, siding, gutters, sp-call (6) |
| Storm damage | hail-cover, hail-respond, hail-claim, hail-wise, hail-built, hail-call (6) |
| Protect Your Nest | pn-cover, pn-wrap, pn-cleanup, pn-aftercare, pn-guarantee, pn-call (6) |
| Our families | of-cover, of-story, of-crew, of-values, of-community, of-call (6) |
| Contact and Price My Roof | ct-cover, ct-price, ct-message, ct-visit, ct-area, ct-faq, ct-call (7) |

**42 sections, 84 versions, 42 section gates** (`owl/GATE-<section>.md`). Every page: one h1; paper and cream
alternate; one deep block (the call band and the shared footer) at the end.

## Governing reference: Lusion (flow), per the annex: "lines/continuity carry the visitor section to section, one journey"
**Exactly what transfers:**
1. **One journey per page, ending at one resolved point.** Every one of the 6 pages ends on its call band, which is the
   page's only deep block, followed by the shared footer. Verified by `sitepass.mjs` ("deep block last, and only last")
   in all 42 renders.
2. **Lines carry the reader through ordered content:** the claim line that fills on the Storm page (`hail-claim` V1),
   the 3-Part Cleanup line (`pn-cleanup` V1), the founding-story spine (`of-story` V1), the assess/secure/plan rail
   (`hail-respond` V2), the report travelling roof → Owl → insurer (`hail-claim` V2), the two guarantee paths that meet
   at one check (`pn-guarantee` V2), and the identity's sweep line on Home.
3. **The chapter index on every inner-page cover** (with MERSI's chapter system) is the way from section to section;
   each entry is a deep link (`#/page/section`).

**What never transfers:** Lusion's WebGL and 3D scenes, cursor-driven fluid effects, its dark stage, its page
transitions.

**Where Lusion's flow is only partly met (honest):** no single continuous line runs the length of any page. Lines live
inside sections; between sections, continuity comes from the alternating paper/cream surfaces and the chapter index.

**Quality standard named by the annex:** Lando Norris ("the standard itself"). The site does not reach it: there is no
bespoke archive gallery, and only the homepage Reviews and game come near its craft. The ratings below are scored
against that bar.

## Critical self-rating (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Category | Score | Evidence for | Evidence against |
|---|---|---|---|
| **Design** | **7.5** | One identity across 84 versions: three-tier tokens, Carbon spacing, Utopia type, token lint clean on every file (⟦S1461⟧, ⟦S1432⟧, ⟦S1433⟧); one visible h1 per page and a clear H1 → CTA → index order (⟦S1434⟧); the inner covers, call bands and footers are one consistent set (⟦S1427⟧); Owl's logo, colours and drawings make a screenshot identifiable as Owl's (⟦S0659⟧ identifiability test). | Four inner covers reuse the same cover + index pattern, so the pages feel templated; several drawings are plain (the aftercare box, the wrap netting); the families photo is only 645 px wide; one accent use per screen was not measured site-wide (⟦S0660⟧ asks for at most 2). |
| **Usability** | **8.0** | One locked number on every tel/sms link and a phone call bar in thumb reach; 5 page links plus the logo for Home in the top nav, active state shown by an underline, not colour alone, hamburger only under 1024 px (⟦S1450⟧); every section is a deep link, every page reachable in one click (⟦S1411⟧); 48 px targets (⟦S1441⟧); forms validate on blur with errors under the field (⟦S1442⟧, ⟦S1439⟧); search with clear, typo tolerance and query echo (⟦S1453⟧); reduced motion removes pins and scrubs (⟦S0400⟧); 42 renders with no overflow or errors. | The homepage price and area tools still break ⟦S1442⟧ and ⟦S1453⟧ (fixed only on Contact); home families V2 drops keyboard focus at the track's end (⟦S0070⟧, recorded in GATE-families); the message form has no back end; no real-device test; no automated accessibility audit was run, only per-section keyboard tests. |
| **Creativity** | **7.0** | Owl-only ideas: the magnet game (round two of Owl's own cleanup), the shingle-tomb lid, the two guarantee paths built from Owl's "bumps" sentence, the Wise Check cutaway, the hail drawing that circles marks like an inspection (⟦S0489⟧, ⟦S1436⟧ motion rules). | Outside Home, the interactions are modest 2D drawings; the Quiet Cubes "instrument" is a slider and a gable, not a configurator worth the reference; Contact and Services lean on familiar layouts; the page end is the same band pattern six times (by design, ⟦S1452⟧, but it repeats). |
| **Content** | **8.5** | Every line is Owl's own published words or the facts lock; no review quotes, no invented jobs or captions, no before/after (⟦S0659⟧); where Owl's pages and the lock disagree, the lock wins (founders; the warranty wording); links name their destination (⟦S0076⟧). | Few real Owl job photos exist, so drawings stand in; Owl's Quincy House pledge is outside the lock (flagged); no FAQ on the Storm page because Owl has none; Owl's About text needed cutting to stay inside the lock, which leaves the Browns' card thin. |
| **Weighted** | **7.65** | | |

**Why below the section mean:** the 42 section gates average 7.84 (lowest `area` 7.25, highest `of-story` 8.30). The site
scores lower because repetition across pages (covers, bands) and the known unmet rules only show at site level.

**Further WEB-SKILLS applied site-wide** (all logged): ⟦S1452⟧ peak-end (every page ends on the call, never on a
form); ⟦S1424⟧ law-of-continuity (the lines and indexes above); ⟦S1444⟧ hicks-law (at most three primary ways to act
in any block: call, text, email); ⟦S0280⟧ core-web-vitals: **not measured.** The build is one 913 KB HTML file plus 18
image files, 52 of its 61 images carry width and height; 9 do not (homepage proof and families images, and one built by script),
which is a layout-shift risk. Per the skill, no performance improvement is claimed without field data.

## Whole-site checks (all pass)
- `sitepass.mjs`: **42 page renders**, 0 failures: 6 pages × 1440/768/390 × defaults and all-V2, plus reduced motion
  at 1440. Each render: no horizontal overflow, exactly one visible h1, no broken image, the deep block last and only
  last, no JS errors. Every internal `#/` link points at a page and section that exist.
- `routetest.mjs` 10/10 (nav, `aria-current`, focus to main, deep links, 42 sections × 2 versions, no duplicate ids).
- `pagetest.mjs` 12/12 on each inner page; the page-specific tests (`stormtest-page`, `stormrm`, `wisetest`,
  `builttest`, `nesttest-page`, `famtest-page`, `contacttest`, `msg2`) all pass; header at 1024/1180/1280: no wrap.
- Token lint clean on every section stylesheet and the site layer.
- Tests live in `owl/site/tests/` (see its README for arguments).

## Rules held across the site
- **Facts lock:** one number, (651) 977-6027, on every tel/sms link; Owl Roofing LLC, 1000 County Rd E #230,
  Shoreview, MN 55126; info@owlroofing.com; Mon–Sat 8:00–18:00; founded 2025 by Tim Brown and Noah Bergland; MN licence
  #BC809662; GAF Systems Plus Certified (never Master Elite); BBB Accredited A−; 10-year Get It Right Guarantee; up to
  50-year manufacturer warranties; reviews only as "5.0 · 90+ reviews", with no review quotes.
- **Owl's own material first;** where Owl's pages and the lock differ, the lock wins (founders; the warranty wording).
- **No invented job, caption or quote;** no Owl before/after pair exists and none is shown.
- **Skills by tag before building**, logged in `owl/skills/SKILL-READ-LOG.md`; three tags found cited without a log
  entry (⟦S0070⟧, ⟦S0400⟧, ⟦S1449⟧) were read in full at the Storm audit and are marked "read at audit, after building"
  where they were cited before.

## Remaining (honest)
1. **Homepage price and area sections** still carry the unmet rules recorded at their gates (validation per keystroke;
   no clear button or typo tolerance). They are fixed in the Contact versions, as the gates planned; the judged homepage
   sections were not changed.
2. **The message form has no back end:** it opens the visitor's own email or text app, pre-filled. A server form needs
   Owl's systems.
3. **Owl's Quincy House pledge** ($100 per job in 2026, $20K goal) is quoted as Owl's own but is not in the lock
   (flagged in GATE-of-community).
4. **No real-device check:** Chromium emulation only (touch, 390/768 widths, reduced motion).
5. **With every section on V2,** the Protect Your Nest wrap photo appears twice (cover and wrap); the defaults avoid it.
6. **Home families V2 drops keyboard focus** when Next disables itself at the last chapter (⟦S0070⟧); recorded in
   GATE-families, not changed. Home families also has no contextual link on to the Our families page.
7. **Not measured:** Core Web Vitals, accent uses per screen, and an automated accessibility audit. 9 of 61 images
   lack width and height.

**Work method:** every step in this thread, by me; no sub-agents and no background tasks.
