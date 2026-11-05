# GATE-FINAL-HOME · the whole FINAL homepage (eleven parts, one final version each, original Owl colours, no switcher)

**File:** `owl-roofing.html` (built by `python3 build_final.py` from `src/final/`). **Evidence:** `gates/final/<section>/` per section, `gates/final/page/` (`checks-page.json`, `d-journey.jpg`, `m-journey.jpg`, scroll frames). **Records kept:** `past/owl-roofing-PAST-2026-11-05-fix-22-versions.html` (the fix build with its 22 versions), the two earlier frozen files in `past/`, and the whole pre-reset homepage with every version, inert inside the file (open with `?past`).

## 1. The page, in the plan's order (plan A1)
| # | Part | Built from | Gate | Checks | Score |
|---|---|---|---|---|---|
| 1 | Hero | OLD Hero V2 "We Give a Hoot About Your Roof" (not pinned; decision in the gate) | `GATE-FINAL-HERO.md` | 19/19 | 8.46 |
| 2 | Video | OLD Video V3 (lean, light spill) + V4 (colour lens on black and white; pieces arriving) + V5 (moments, scatter again) | `GATE-FINAL-VIDEO.md` | 24/24 | 8.54 |
| 3 | Clear It Up | OLD Wise V11 (image and effects only) → V13 (day, then time) → OLD Explore V14 (words → an email, or call) | `GATE-FINAL-WISE-CHECK.md` | 25/25 | 8.57 |
| 4 | Ask the Owl | OLD Wise V4, UI/UX rebuilt | `GATE-FINAL-ASK-OWL.md` | 25/25 | 8.50 |
| 5 | Your part: nothing | NEW Nothing V1 "Scroll film" | `GATE-FINAL-NOTHING.md` | 21/21 | 8.54 |
| 6 | Services | OLD Services V8 "Name Your Job" | `GATE-FINAL-SERVICES.md` | 19/19 | 8.40 |
| 7 | Reviews | OLD Reviews V3 (water kept), card rebuilt | `GATE-FINAL-REVIEWS.md` | 22/22 | 8.54 |
| 8 | Areas | NEW Towns V3 "From above", a photograph and one working combobox | `GATE-FINAL-AREAS.md` | 27/27 | 8.43 |
| 9 | Family | OLD Family V9 "Give a Hoot" (four photos around the owl) | `GATE-FINAL-FAMILY.md` | 18/18 | 8.54 |
| 10 | Book | OLD Booking V3 3D card + Work Order paper, as a handwritten ink letter | `GATE-FINAL-BOOK.md` | 27/27 | 8.80 |
| 11 | Footer | OLD footer, animated and interactive | `GATE-FINAL-FOOTER.md` | 31/31 | 8.56 |

All eleven **re-run on the final build** just now: 258/258. **Whole-page checks (`node tools/final-page.cjs`): 21/21.** Header, hero and footer links: every anchor exists and the header links land on their sections (Services, Wise Check, About, Reviews, Areas, Book).

## 2. What the owner's order asked, checked
- **Removed:** the problem-finder section, the Explore idea (including Sample Block), the Numbers section, the Call section, "Protect Your Nest" (no section), every version marked bad. None is on the page.
- **Colour:** the original Owl palette (cream, ink, amber) throughout; no Shingle Slate; nothing bright added.
- **No maps of any kind:** no text, class, label or image on the page is a map (checked per section and page-wide). The towns section is a photograph and a search bar.
- **Never the same video twice:** the crew film appears once (section 2), the stock drone film once (section 5); there is no YouTube modal. By file inventory, **no image or video is used by two sections**; the only shared file is the logo (header, booking card, footer), by design.
- **No blurry images:** every image and video is measured at three scroll points at 1440 (DPR 1) and 390 (DPR 2) in each section's check and none is shown above 1.12× its own pixels (video 1.00×; family and services photos 0.3 to 1.0×).
- **Fonts:** Inter everywhere; the handwriting face (Caveat, SIL OFL) only on the booking letter, as the owner ordered.
- **Facts:** the one phone number (651) 977-6027, licence #BC809662, GAF Systems Plus, BBB A−, founded 2025 by Tim Brown and Noah Bergland, 1000 County Rd E #230 Shoreview MN 55126, reviews only as "5.0 · 90+ reviews", Mon–Sat 08:00–18:00, info@owlroofing.com, "We Give a Hoot", 10-year workmanship warranty with up-to-50-year manufacturer warranties, 29 towns. No invented review, claim or job. Stock is tagged "Illustrative" and credited in `MEDIA-CREDITS.md`.
- **Pinning:** one pinned stage on the page (section 5).
- **Accessibility:** axe WCAG 2.1 A/AA is 0 on every section and on the whole page; reduced motion renders and works everywhere; every control is at least 44 px (inline links excepted on phones).
- **Scroll audit:** the whole page scrolled at 1440 (16 screens) and on an emulated iPhone 13 (21 screens): no sideways scroll, no errors.

## 3. Real defects found while building (all fixed)
1. **A click-through bug on the flipped booking card:** the lower half of the form could not be clicked in Chromium (nested 3D hit-testing). Fixed.
2. A class-name collision (`.ask`) between sections 4 and 8 clipped the towns list; fixed by renaming.
3. The footer's roofline and the Areas search now talk (choose a roof, the town fills the search).
4. Scroll-film beat 1 now follows the sentence chosen in section 3 (the problem-finder that used to feed it is gone).

## 4. Questions for Muse (raised, not parked)
1. **Same file, two kinds of record:** the pre-reset homepage stays inside the file as an inert record (`?past`), per the 05:15 "never delete" order. It makes the file about 7 MB heavier (14.4 MB total; the live page itself is about 7.4 MB). Say if the in-file copy may go (the files in `past/` stay).
2. **Header and footer inner links:** the header's links go to in-page sections (Wise Check → section 3, About → section 9, Areas → section 8). The inner pages come after this gate passes, as ordered.
3. **Honest hours in the footer** use Shoreview's clock ("Open now: it is 9:42 am in Shoreview" or "Closed right now ... we open tomorrow at 8 am"). Confirm that wording.
4. **The type box in "Ask the Owl"** only answers from Owl's published wording and says so when it cannot; price questions are never guessed. Confirm that rule.
5. **Services lists the Protect Your Nest System as part of a roof replacement** (a fact in Owl's own data); the plan removed the section, not the fact. Say if the line should go.

## 5. Remaining (named)
- **D1** Stock stands in for Owl's own footage in section 5 and for a Shoreview aerial in section 8; real Owl clips and a real aerial would replace them.
- **D2** The Owl crew film is 960 × 540, so the video screen stops at 960 px; service photos are 560 px.
- **D3** iOS Safari is not available here (Chromium only); Blob-URL video, `inert`, 3D and `playsinline` follow standard WebKit behaviour but are not run on a device.
- **D4** Forms hand the visitor to their own email app (no server): nothing is ever claimed as sent.

## 6. Vetoes: **zero**
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.

## 7. Next
Per the order, the inner pages (services page, Wise Check page, About, and the rest of the plan's verdict tables) start **one by one, one final version each, in this same file** once this gate passes; each gets a `GATE-FINAL-PAGE-<name>.md`.
