# GATE: The Austin homepage is complete. Ready for joint verification.

**Date:** 2026-11-03.
**Under:** Muse's process note (owner's order). With the homepage finished inside the one HTML file, **work stops here**.
1. **Muse** audits the homepage against the skills.
2. **The owner** reviews the HTML himself and gives his own verdict.
3. **Inner pages begin only when both have passed it.** Nothing past this gate has been started.

## 1. The file

**`siding/redo/site/out/site.html`.** One self-contained file (9.5 MB; 6.9 MB gzipped). Fonts, photos, the firm's film, every section and every backup are inside it; nothing loads from outside. Open it in any current browser.

- **What you see by default** is the live homepage: the winner of every section.
- **Backup versions** (never deleted) sit hidden in the same file. Add one parameter to the URL to view one in place:
  - `?hero=2`, `?hero=3`, `?hero=4`, `?hero=5`
  - `?services=b`, `?vis=a`, `?windows=b`, `?reviews=a`, `?process=b`, `?try=b`, `?area=b`, `?book=b`
  - Parameters combine, e.g. `site.html?windows=b&reviews=a`.
- **Rebuild:** `python3 siding/redo/site/build_site.py`.

## 2. The homepage, top to bottom (10 sections + header and footer)

| # | Section | Live version | Sheet it answers | Score | Gate |
|---|---|---|---|---|---|
| — | Header | Floating bar with the siding sample-book dropdown (Header 3). Phone: board-end bar with Call / Book / Menu, and a real menu sheet (Header 4). Scroll-spy. | Nav sheet | 8.18 | R5 |
| 1 | Hero | **V1:** the firm's real charcoal job in Maple Run. Its own lap boards lift around the cursor and settle back to the pure photo. | Heroes | 8.18 | HERO-2 (accepted) |
| 2 | Services | **A:** one trade at a time, sliding sideways. Sample boards flip to their record, the windows open, the shingle roof waves. | Services | 8.04 | R2 |
| 3 | Visualiser | **B:** a five-step wall that snaps together from house wrap: profile, texture, finish, the 17 ColorPlus colours, trim | Visualiser | 8.06 | R2 |
| 4 | Windows | **A:** one real Andersen 100 Series single-hung, morning to midnight. Sash lift, grilles, frame colours, parts highlight. | Windows (realness duty met) | 8.28 | R3 |
| 5 | Reviews | **B:** the 4.9 tag and eight genuine reviews hung on two lines. The cursor is the breeze; tap to read the whole review. | Reviews (4.9 + tags only) | 8.20 | R3 |
| 6 | Process | **A:** four full-view chapters that stack: inspection checklist, real price bands, install scrubbed by scroll, final-check seal | Direction v2 (stacked chapters, not cards) | 8.12 | R4 |
| 7 | Try the job | **A:** four small jobs, sideways: nail a course, seal a window, hang a gutter, paint the trim | Direction v2 §5 (the game idea) | 8.16 | R5 |
| 8 | On your street | **A:** eight real job photos pinned on a rippling thread; town signs with documented counts filter the board | On your street (no map) | 8.32 | R4 |
| 9 | Booking | **A:** the work-order pad, with a live open/closed line; online or by phone | CTA + footer | 8.12 | R5 |
| 10 | Footer | Board-and-batten columns on a sill, with the cursor-companion switch | CTA + footer | 8.18 | R5 |

**Across the whole page:**
- **The live field** (Immersive Garden mechanism, Austin's cut siding shapes) is the ground wherever the page is light.
- **The 3D-feel buttons** come from the materials pack.
- **The cursor companion** has three variants plus Off.
- **Colour** is deep green and lime on warm cream, black and white. No steel.
- **Fonts** are Montserrat and Inter.

## 3. Whole-page audit (live homepage)

| Check | 1440 × 900 | 390 × 844 (touch) |
|---|---|---|
| JS errors / console errors | 0 / 0 | 0 / 0 |
| Sideways scroll | none | none |
| Load (local file, software rendering) | DOMContentLoaded 2.5 s | 1.3 s |
| Page height | 17,304 px | 17,503 px |
| Reduced motion | No errors. Every section shows its finished state. The companion is off. | same |
| JavaScript off | All 8 section headings and ~6,700 characters of copy read (markup is pre-rendered) | same |

**Structure:**

| Check | Result |
|---|---|
| Headings | One `h1` (hero); one `h2` per section; footer `h2` |
| In-page links | Every `#link` resolves (0 dangling) |
| Duplicate ids | 0 |
| Controls without a name | 0 |
| Images without alt | 0 |

**Fact locks:** all verbatim on the page.

| Lock | Status |
|---|---|
| (512) 550-0000 | 5 places; no other phone format |
| 4.9 / 474 | Present, with no other rating anywhere |
| "5,000" | Absent |
| Address | 7801 N Lamar Blvd Suite C70, Austin TX 78752 |
| Email | info@austinprosiding.com |
| Hours | Mon–Fri 8–8, Sat 8–6, Sun 12–5 |
| The 886 wording | "312 on the map with photos + 574 more counted" |
| Since 2009 / merged 2018 | Present |
| Credentials | All five |
| The word "steel" | Absent |

**Honesty:**
- Review quotes are checked verbatim against `reviews.json` at build time; the build fails on any change.
- No per-review stars.
- No form claims to send or save anything.
- Every photo is the firm's own, with its recorded place and date. The film is the firm's (approved).

## 4. Open defects (honestly named, all rounds)

1. **Weight.** 5.8 MB of the 9.5 MB is the firm's film. It is used **only by the backup heroes** V3–V5, because the live hero is the photo V1. Another ~0.6 MB is backup hero V2's photo, and ~0.7 MB is other backups. **If the owner confirms V1, removing the film from the live file would bring it to about 3.7 MB.** I have not done it, because backups must not be deleted without a ruling.
2. **Smoothness on real hardware is untested.** This container renders WebGL and canvas in software; the field, photo hero, roof wave and thread need a check on a real phone and laptop.
3. **Visualiser (phone):** each step's heading slides under the pinned wall while you scroll the options.
4. **Windows:** with the sash lifted in daylight, the open half is a flat dark room (no interior invented).
5. **Phone sideways rows** have no arrow hint beyond a clipped edge: reviews clothesline, street cards.
6. **Process on phones** stacks the chapters in normal flow (no sticky stacking at 390).
7. **Reviews dialog:** the header stays above its backdrop.
8. **Services and Try the job both use a pinned sideways sequence.** This is as the direction asks, but the owner may feel the rhythm repeats.

## 5. Shot list (optional; would lift the page)

- **Windows:** one genuine Austin Pro window install photographed at dusk with the room lit. Landscape, at least 1600 px. For an inset beside the day/night drawing.
- **Hero / Services:** none needed; the firm's photos and film cover them.

## 6. Gate reports

- `GATE-HERO-2.md` (accepted)
- `GATE-ROUND-2.md`
- `GATE-ROUND-3.md`
- `GATE-ROUND-4.md`
- `GATE-ROUND-5.md`

**Screens:** `siding/redo/site/gate/`
- `homepage-1440.jpg` and `homepage-390.jpg`: every live section at its resting view.
- `r2-*` … `r5-*`: per-round interaction frames and the backups.

## 7. Stop

The homepage is delivered for joint verification. **No inner pages until Muse and the owner have both passed it.**
