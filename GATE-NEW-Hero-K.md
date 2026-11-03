# GATE-NEW — Hero K, "Before | After, on the seam"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04, the first new version of pass 1. The overnight brief stays binding alongside it.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Hero K, "Before \| After, on the seam"** (`?hero=k`) |
| Primary reference (annex v3, one) | **MERSI.** Annex: "hero as infinite split-slider, central label cycling the process in sync". Its seam is also the annex's named engineering source for the before/after centrepiece ("the centrepiece mechanism comes from MERSI's seam", never Ever). |
| Signature creative move | **Opposing wipes on a centre seam.** One documented job at a time: its before photo fills the left half and its after photo the right half. On each change the two halves wipe in opposite directions while the centre plate rolls the job's record (place, month, trade) in sync. No autoplay, as on MERSI; you drive it by button, arrow key or swipe. |
| Style family | Editorial split-slider: two photographic halves meeting at a seam, with one typographic plate on the join |
| Content | The firm's own 6 documented before/after pairs (`pairs.json`: the published project pages, never used on the homepage until now). Each is captioned with its recorded place, month and trade and links to the firm's own project page. Lock: "177 pairs", shown as "6 of our 177 before-and-after pairs". No price bands (they are not homepage figures), no invented figures. Muse's three hero photos are not used. |
| How it differs from every existing hero | 1–6 and 8 build on one photograph (or the film); 7 is a data field; 9 is type; 10 is a word roll. None shows a before and an after, none is a two-photo seam, and none changes in opposing directions. It is not the closed scaffold (left text, right photo card): both halves are photographs, and the type sits on the join. |
| Why it is better | It is the only hero whose image is proof: the same house before and after our crew, six times over, each one checkable on the firm's own project page. It answers "will my house look like that?" in the first viewport. The current best (Hero 7, "The record", 8.42) proves scale with numbers; K proves the result with photographs. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S0650⟧ fits the first viewport; ⟦S1434⟧ one dominant element (the seam and its plate); ⟦S1314⟧ one focal point, no decorative stacking; ⟦S0220⟧ hairlines, no glow, tabular counter |
| Two halves | MERSI clip-path wipes (opposing `inset()`), 0.9 s `cubic-bezier(.77,0,.18,1)`; ⟦S0083⟧ one clear focal motion; ⟦S1315⟧ nothing animates at rest |
| Centre plate | ⟦S1425⟧ figure-ground (white plate on the photographs); ⟦S1426⟧ proximity (record under the headline); ⟦S1329⟧ headline words rise once |
| Record line | `aria-live="polite"`; the roll is in sync with the wipe; ⟦S0083⟧ |
| Prev / next buttons | ⟦S0054⟧ named icon buttons with a visible focus ring; ⟦S1441⟧ 48 px targets; ⟦S1440⟧ instant press state |
| Carousel group | ⟦S0924⟧ / ⟦S0930⟧ `role=group` with `aria-roledescription="carousel"`, labelled; arrow keys when focused; no focusable hidden content |
| Swipe or drag | ⟦S1443⟧ the halves follow the finger (rubber band, at most 28 px); a 48 px threshold changes the job; vertical scroll is never blocked |
| Before / After tags | ⟦S1427⟧ the same tag treatment on both halves; ⟦S1422⟧ the seam line implies the join |
| CTA row | ⟦S1435⟧ one filled button (Book) among quiet links; ⟦S1441⟧ the phone in the thumb zone on phones |
| Source line | ⟦S0220⟧ facts only ("6 of our 177 before-and-after pairs"); a link to the firm's project page |
| Phone layout | Halves stacked (before above, after below), opposing wipes turned horizontal, the headline above the frame, a compact record plate on the seam |
| Reduced motion | No wipe or word rise: an instant swap |
| Background law | The frame is inset on the white ground with gutters, so the hidden world still reveals around the cursor in the margins |

---

## Build log

**How to view:** `?hero=k`, or `?review&hero=k` with the switcher, where it is listed as **K "Before | After, on the seam"** between 10 and the archives.

**Files:**
- `src/hero4.css` and `src/hero4.js` (`Hero4.wire`).
- Markup: `heroK()` in `build_site.py`.

**Photos:**
- The firm's 6 documented pairs (`work/data/pairs.json` ↔ `work/dl/home{n}b|a-1280.webp`, the published before and after images).
- Re-encoded at 1040 × 650 WebP q72, 12 images in all.
- Embedded once inside K's own template, so they are not duplicated anywhere.

**Desktop:**
- An inset frame on the white ground, with the before half on the left and the after half on the right.
- A white seam line, with pill tags marking Before and After.
- The white plate on the join carries:
  - "Before · After";
  - the h1;
  - the job record (place, then month · trade);
  - ‹ 01 / 06 › controls.
- Under the frame:
  - the support line;
  - Book (the one filled button) and the phone;
  - "6 of our 177 before-and-after pairs · See this job on our site", linking to that job's own page on austinprosiding.com.

**Phones and tablets (≤ 860 px):**
- The halves stack, before above and after below, and the seam turns horizontal.
- The plate sits under the frame, so the photos are never covered.
- The opposing wipes run sideways.

**Six jobs:**

| Place | Month | Trade |
|---|---|---|
| Village at Western Oaks | Aug 2026 | Siding |
| Tanglewood Forest | Aug 2026 | Siding |
| Anderson Mill | Sep 2026 | Windows |
| Barton Creek | Apr 2024 | Patio covers |
| North Shoal Creek | Jan 2025 | Roofing |
| Circle C North | Jul 2026 | Siding |

All six were checked visually: the before photo is on the left and the after photo on the right, and each record matches its photos.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-hero-k-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`
- mid-wipe: `new-hero-k-mid-1440`, `-mid-390`
- other pairs: `-1440-pair` (pair 3), `-390-pair`
- contact sheet: `new-hero-k.jpg`

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Opposing wipes | Forward: before `inset(66% 0 0 0)` while after `inset(0 0 66% 0)`. Back: reversed (before from the bottom edge, after from the top). Phone: before `inset(0 0 0 13%)`, after `inset(0 13% 0 0)` |
| Record in sync | After each change, the record, the counter, the visible photos (`aria-hidden` swapped) and the job link all point to the same job; one live span stays after each roll |
| Full cycle | 6 nexts wrap to 01; ← from 01 goes to 06 (Circle C North); arrow keys don't scroll the page (scrollY 0) |
| Drag | The halves follow the pointer (rubber band measured at −12 px, capped at 28 px); a 120 px drag changes the job |
| Rapid clicks | 3 clicks inside one wipe advance exactly one job (locked for 960 ms), with no broken state |
| Reduced motion | Instant swap, no wipe layers left behind |
| No JS | The first pair, the headline and the record are in the markup, so the first frame is complete |
| Background law | The frame is inset on the white ground; the hidden world reveals around the cursor in the margins (seen in `-1440-pair`) |
| Existing versions | 165 templates byte-identical to the previous commit; the homepage `<main>` identical; the only addition is `hero:k`. The default hero is still 1 |
| Locks | Phone, hours, "177 pairs" verbatim; "5,000" 0, "steel" 0, "Central Texas" 0; no em dashes in K's alt texts |

## Defects found and fixed

1. **Photo alt texts:** they carried the published capital "At" ("Village At Western Oaks") and an em dash. They now read "Village at Western Oaks", with a comma, matching the record line.
2. **Before / After tags:** screen readers heard "Before After" ahead of the photos, whose alts already say it. The tags are now `aria-hidden`.
3. **Phone frame height:** at 390 px the record and arrows sat low. The frame is now `min(54svh, 470px)`, so the headline, the record and both arrows fit in the first screen.
4. **Plate placement:** the h1 first sat inside the carousel group, which would announce it as carousel content. The plate is now a sibling of the group, layered over it.

## Remaining defects, named honestly

- **Weight:** +1.73 MB of photos; the file grows from 15.9 to 17.7 MB. The images are embedded once, but this is still the heaviest single addition this cycle.
- **No pixel seam:** the pairs are not shot from the same spot. Automatic registration (SIFT plus homography) aligned only 1 of the 6 (inliers 45 vs 5–18), so the halves show each photo whole, not one house cut at a pixel seam. That is MERSI's own two-image split, which keeps the photos honest; no photo was warped.
- **Plate cover:** on desktop the plate covers the middle third of both photos. On the roof pair it hides part of the ridge. Each photo stays readable at its outer two thirds; I did not add a "hide plate" control.
- **No autoplay:** this follows MERSI, but a visitor who never touches the hero sees only pair 1.
- **Phone first screen:** Book and Call sit below the first screen at 390 px; the sticky bottom bar carries both.
- **Real hardware:** the wipes and the swipe were tested in Chromium only, not on real hardware yet.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | hero K | ⟦S0650⟧ fits the first viewport at 1440 and 768; ⟦S1434⟧ / ⟦S1314⟧ one dominant element (frame and plate), nothing decorative stacked; ⟦S0220⟧ hairline rules, no glow, tabular counter |
| Element | two halves | MERSI opposing `clip-path: inset()` wipes, 900 ms `cubic-bezier(.77,0,.18,1)`, incoming photo scaling 1.12 → 1 over 1.2 s; ⟦S0083⟧ one focal motion per change; ⟦S1315⟧ zero animation at rest |
| Element | plate | ⟦S1425⟧ white plate as figure over the photographs; ⟦S1426⟧ record directly under the headline; ⟦S1329⟧ headline words rise once (shared split helper, accessible label kept) |
| Element | record line | `aria-live="polite"` + `aria-atomic`; the roll uses the wipe's own curve and duration (in sync) |
| Element | ‹ › buttons | ⟦S0054⟧ "Previous job" and "Next job" names, a 3 px focus ring; ⟦S1441⟧ 48 px targets; ⟦S1440⟧ a 0.92 press scale and a lime hover |
| Element | carousel group | ⟦S0930⟧ / ⟦S0924⟧ `role=group`, `aria-roledescription="carousel"`, a label saying the arrow keys work; hidden photos are `aria-hidden`, and nothing hidden is focusable |
| Element | swipe / drag | ⟦S1443⟧ the halves follow the finger, rubber-banded to 28 px; a 48 px threshold; `touch-action: pan-y`, so page scroll is never captured |
| Element | tags and seam | ⟦S1427⟧ one tag treatment, with After in brand green; ⟦S1422⟧ the seam line implies the join |
| Element | Book / phone | ⟦S1435⟧ the only filled button; ⟦S1441⟧ on phones the sticky bar keeps both in the thumb zone |
| Element | source line | ⟦S0220⟧ the lock "177 pairs"; the link goes to the firm's own project page for the job on screen |
| Site | reduced motion | instant swap, no rise; the same content |

## Reference transfers and non-transfers (MERSI)

**Transferred:**
- the split into two image halves;
- the opposing vertical wipes (`clip-path`), reversed when going back;
- the central label plate whose text rolls in sync with the wipe;
- no autoplay; the visitor drives it (buttons, keys, drag);
- the incoming image settling from a slight scale.

**Not transferred:**
- MERSI's infinite scroll-hijack. The hero does not pin or take over the wheel; scroll stays native.
- MERSI's fashion and editorial imagery. Austin uses only its own documented pairs.
- MERSI's typography. Montserrat and Inter, as locked.
- Nothing from Ever, per the annex.

## Comparison with the section's previous best (Hero 7, "The record", 8.42)

Hero 7 proves scale: 886 / 312 + 574, 431, 388 and 4.9 / 474 arrive as numbers over the record field. K proves the result: the same house before and after the work, six times, each one checkable on the firm's own page.
- **K is stronger on:** content (real, verifiable photographs) and immediacy (the first glance answers "what will my house look like?").
- **Hero 7 is stronger on:** weight (no photos) and the breadth of the record.
- **Together:** they would sit well together on the homepage (K as hero, the record further down), but that is the owner's pick. Defaults are unchanged.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | One dominant seam composition on white; the plate balances both halves; Before and After are clear at every width (screenshots at 1440, 768 and 390) |
| Usability (30) | **8.2** | Three input routes, keys and swipe tested, live record, reduced motion. Minus: the plate covers the centre, and Book sits below the first screen on phones |
| Creativity (20) | **8.2** | A signature move no other hero has (opposing wipes plus a synced plate). It is the annex's own named hero model rather than a new invention, so it is not scored higher |
| Content (10) | **9.2** | The firm's own six documented pairs, captioned from the record and linked to their pages; "177 pairs" as locked; no invented figures |
| **Weighted** | **8.46** | **PASS** (≥ 7.0; no category below 6.0) |

**Vetoes: none.**

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not build Services K until Muse accepts.
