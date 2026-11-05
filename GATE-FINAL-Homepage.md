# GATE-FINAL — THE WHOLE HOMEPAGE (all eleven items, one version, no switcher)

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05. **File:** `siding/redo/final/out/final.html` (one self-contained file, about 2.8 MB against the 22.5 MB ceiling; built by `siding/redo/final/build_final.py`). **This is the stop point:** the homepage is complete and I have NOT started any inner page; I am waiting for Muse's file review.

## 1. The page, in the plan's order

| # | Section | Version / idea | Gate | Self-score |
|---|---|---|---|---|
| 1 | Hero | V4 idea, title between sky and house (photo #36 stays until Muse supplies a better one) | `GATE-FINAL-Hero.md` | 8.39 |
| 2 | Wall + video | V9 idea, pinned; the firm's own film, linked, never embedded | `GATE-FINAL-Wall.md` | 8.62 |
| 3 | Services | A rebuilt, four scrubbed SVG scenes, nine-row ledger always visible | `GATE-FINAL-Services.md` | 8.45 |
| 4 | Visualiser | O, real photo #3, 451 tiles lift and settle, honesty line exact | `GATE-FINAL-Visualiser.md` | 8.57 |
| 5 | Windows | A rebuilt with F's kinds: single hung, double hung, casement, slider, picture | `GATE-FINAL-Windows.md` | 8.67 |
| 6 | Reviews | B (hanging tags) in full, then C carrying ONE review | `GATE-FINAL-Reviews.md` | 8.49 |
| 7 | Process | D (four columns) upgraded | `GATE-FINAL-Process.md` | 8.56 |
| 8 | Try the job | REMOVED (absent in every form; tested) | | |
| 9 | Area | A (thread board), bugs fixed, large upgrade | `GATE-FINAL-Area.md` | 8.55 |
| 10 | Booking | C then J: phone and email in the section, no form, no outside button, receipt to `contact.html` | `GATE-FINAL-Booking.md` | 8.55 |
| 11 | Footer | current design, upgraded | `GATE-FINAL-Footer.md` | 8.48 |
| — | Cursor companion; phone menu sheet; header anchors | global | this file §3 | |

Contact sheet of the finished page at 1440 px: `siding/redo/final/gate/homepage-contact-sheet-1440.jpg`. Every section gate carries its own WEB-SKILLS ledger, governing reference, scorecard, screenshots, defects, remaining issues and sub-agent statement.

## 2. Whole-page checks (`tools/pgt.js`, 22 of 22 pass)

- **Weight:** the single file is far under 22.5 MB.
- **No outside address:** the only `http` text in the file is the three linked film sources (`hero-test/tablet/mobile.mp4`). Every `href` is `#`, `tel:`, `mailto:` or `contact.html`. The old modules' outside booking constant and the old job/area data with project URLs were removed from the build.
- **Facts:** every locked fact is on the page: (512) 550-0000 · 4.9 / 474 · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5 · 2009 · Sanders Roofing & Exteriors · GAF Master Elite · James Hardie Elite Preferred + President's Club 2025 · Andersen Certified Premier · BBB A+ · "312 on the map with photos + 574 more counted" · 431 · 388 · NT 238 / Simonton 54 / Andersen 38 / Pella 31 · 30-year non-prorated · info@austinprosiding.com. Banned wording absent ("since 2018", Try, an outside scheduling page).
- **Structure:** no duplicate ids; every in-page anchor resolves; one h1, header/main/footer, every section labelled, every image has alt text, no positive tabindex.
- **Backgrounds:** a scan of the whole scroll finds no surface covering 12% of the screen that is pure white.
- **Header links:** `#siding`, `#roofing` (the Services scenes), `#windows`, `#area`, `#booking` each land on their section.
- **Sideways scroll:** none at 1440, 1024, 768 and 390; 0 page errors over a full scroll at each size and in reduced motion.
- **Per-section re-runs on the integrated file:** Windows 38/38, Reviews 23/23, Booking 21/21, Process 46/46, Footer 39/39, Area 73/73, cursor 14/14, phone menu 5/5 (Hero 37, Wall, Services and Visualiser 25 passed at their own gates).

## 3. Global pieces built for this stage

- **Cursor companion (redone):** one ring and one companion (a spirit-level vial whose lime bubble slides opposite to your motion, like the tool). The ring grows over links, shows a dashed "drag" ring over the window and recolour stages, shrinks on press; over form fields it steps aside for the system cursor. It sleeps when nothing moves (frames are free), hides when the pointer leaves, the window blurs or the tab hides, and is never created for touch or reduced motion. `tools/cut.js`, `gate/cursor-companion.png`.
- **Phone menu:** the bar's Menu button pointed at nothing; it now opens a sheet of the page's own sections plus Call and Email (focus trap, Escape, scroll lock). `tools/nvt.js`.
- **Shared section rules** (gutter, heading, paragraph) restored to the shell; every ported section now sits on the dim sage ground with its own kit SVG background art and parallax.

## 4. Governing reference and WEB-SKILLS (whole page)

**Governing reference for the page as a whole: Cowboy (Cowboy.com), a product page that is one calm, tactile world with physical, pointer-driven details.** Transfers: one consistent material language, objects that respond like objects, restraint. Does not transfer: product, imagery, type. Each section names its own reference in its gate.

| Level | Skill → how used |
|---|---|
| Page | ⟦S1434⟧ visual-hierarchy: one idea per screen; ⟦S1454⟧ serial-position: the hero and the booking carry the weight; ⟦S0220⟧ anti-slop: only published facts, one real photo per idea, nothing invented; ⟦S0231⟧ web-performance: one 2.8 MB file, no library, transform/opacity animation |
| Motion | ⟦S1436⟧ animation-principles; ⟦S0062⟧ animation-performance; ⟦S0400⟧ accessible-animation: every section has a reduced-motion layout, every pin has a static fallback |
| Controls | ⟦S0054⟧ fixing-accessibility: real buttons and links, 3 px focus rings, live regions, dialogs with Escape and focus return; ⟦S1441⟧ fitts-law: targets ≥ 44 px (measured per section) |

## 5. Remaining issues, named honestly

1. **`contact.html` does not exist yet** (Booking J's one button, as ruled; inner pages wait for Muse's approval).
2. **Hero photo #36 is the best available, not hero-grade** (overcast, phone quality); swapping is one command (`tools/prep_hero.py`).
3. **The window kinds' mechanics are general descriptions**, flagged on the page; the firm publishes nothing about them.
4. **Trim and soffit are not recolourable** in the Visualiser (not traced); the page says "window trim as installed".
5. **Austin's tally** uses `near.json`'s 541; an unresolved 539 vs 541 difference from prep remains.
6. **Testing is Chromium only, headless software rendering, emulated touch.** Safari and Firefox are untested (`:has()` pin lift and dialog backdrop blur are the features to check); no physical phone was used.
7. **The Footer gate says `REPLACES = []`;** in the integrated build the footer drops the old `cta` module (`REPLACES = ['cta']`), which removed the stale footer CSS and the last outside-address constant. Tests were re-run on that integrated file.
8. **Sections 7 and 9 and 11 are sub-agent builds**; I reviewed their screenshots and re-ran their tests on the integrated file, but I have not line-read all of their code.
9. **Scores are self-ratings**, not Muse's.

## 6. Sub-agent use, stated honestly

Two sub-agents, run in parallel under my written brief (the permitted maximum): one built **Process D + Footer**, the other **Area A**. Each worked only in its own files, did not commit, and wrote its own gate. I built, tested and gated Sections 1 to 6 and 10, the cursor, the phone menu and the integration myself, with two read-only prep agents earlier (window kinds; services inventory). No background tasks were claimed beyond that.

## 7. Next

**STOP.** Report to Muse for the homepage file review. On approval: the inner pages, one by one, in this world, starting with the Contact Us page (the ink-on-paper form with an in-page success message that never opens an email app).
