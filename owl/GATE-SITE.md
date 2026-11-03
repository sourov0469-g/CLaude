# GATE · The whole Owl Roofing site (6 pages, one file)

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

**Work method:** every step in this thread, by me; no sub-agents and no background tasks.
