# GATE-NEW — Windows N, "The window issue"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 4, section 4 (Hero N, Services N and Visualiser N accepted by Muse). No configurator, nothing game-like.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Windows N, "The window issue"** (`?windows=n`) |
| Primary reference (annex v3, one) | **Ever**, verified craft only: the case page's magazine narrative (the work presented as an editorial story you page through). Not its pairs, which the annex bars; no before/after pair appears. Ever is the only annex reference no Windows version has used: A–J used Apple AirPods Pro ×2, Lando Norris, Graza, Cash App, Quiet Cubes, Cowboy and Scout; K Dropbox; L MERSI; M Lusion. Ever's other two crafts are already close to Windows versions: its filtering presentation to D (the window jobs, filterable by record) and its 3D visualisation to C and J (a window taken apart; opening to trim). Bruno Simon and Rimowa are scoped elsewhere. |
| Signature creative move | **The firm's window answers as a magazine you page through.** A two-page spread: the left page is a full-bleed plate, a published Austin Pro window job photographed by the firm and captioned with its record (place, month, trades). The right page is the article: the question as the headline, a pull-quote lifted verbatim from the answer with its figure set large, and the answer itself, verbatim, under a drop cap. A contents list holds all eight. Next turns the right-hand page over like paper: it lifts from the spine and lands on the left, its back becoming the next plate. Previous turns it back. |
| Style family | An editorial spread: plate and article, contents, running heads and folios, a page that turns |
| Content | The eight window FAQ answers published on the firm's site (`faq.json`), questions and answers verbatim, in their published order: cost, brands, frames, siding too, installers, timing, warranties, financing. Pull-quotes are exact substrings of their answers. Plates: eight distinct published window jobs (`photos.json`, the photographs Windows D checked one by one), each captioned only with its own record. The masthead uses the locked "388 documented window jobs". No new claim, number or image. |
| How it differs from every existing Windows version | A is morning to midnight; B builds out a bay; C takes a window apart; D is an archive of window jobs; E is a unit chart by maker; F shows how windows open; G gives frame colours by maker; H is a counter; I is a window of review words; J walks from opening to trim; K sets the cost bands in type; L lifts sashes on before/after pairs; M divides one window's glass to answer four questions. None gives all eight published answers, and none reads as an editorial feature with photography. |
| Why it is better | It is the complete, readable answer to a window buyer's questions (cost, brands, frames, timing, warranties, financing, who installs, siding too), in the firm's own published words, set beside the firm's own work. M answers four questions as charts; N answers all eight as prose a homeowner actually reads, including the four M leaves out (installers, timing, warranties, financing). The current best (L, "Lift the sash", 8.64) shows results; N explains the purchase. |
| Pairing note (F17) | Hero N (magazine cover) and Services F (magazine spread) are also editorial. Pick at most one magazine device for one page. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the spread); ⟦S0220⟧ published answers and photos only, captions are each job's own record |
| Contents | ⟦S0054⟧ eight buttons with `aria-current`, arrow keys between them; ⟦S1441⟧ 48 px |
| Page turn | ⟦S1436⟧ the right page lifts from the spine and lands on the left (0.8 s, eased), backface hidden; Previous turns it back |
| Previous / Next | ⟦S0054⟧ named buttons; ⟦S1441⟧ 48 px; ← → on the spread; swipe on phones; ⟦S1443⟧ buttons as the non-gesture route |
| Article | Headline = the question; pull-quote verbatim with its figure in deep green; drop cap; running head and folio |
| Plate | The published photo, cover-cropped, with its caption (place · month · trades) and a link to the project |
| Live line | ⟦S1440⟧ polite: "Page 3 of 8: Vinyl, aluminum or fiberglass…" on manual turns only |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" |
| Phone | One page at a time: plate above the article; contents as a scrolling strip; the turn becomes a short slide |
| Reduced motion | ⟦S0400⟧ pages change at once; no turn |
| Background law | White ground; the stage is `data-solid` |

---

## Build log

**How to view:** `?windows=n` (switcher: Windows, **N "The window issue"**).

**Files:**
- `src/sec/win9.js` (`Win9.N`, `Win9.wire`, `Win9.ART`) and `src/sec/win9.css` (class prefix `wn` under `.wnN`).
  - The collision check found one clash: `.wnL` is Windows L's section class, and its unscoped padding rule would have hit a page named the same. My pages are `wnpL` / `wnpR`.
  - The questions and answers were written into the module straight from `faq.json`, not retyped.
- `build_site.py`:
  - `winN()` builds the plate list: eight distinct published window jobs from `photos.json`, each asserted to list Windows among its trades.
  - The four photos already present at runtime are reused by reference: River Place and Windermere from `window.__JOBS`; Barrington Oaks and Austin (Sep 2026) from `window.__SVCK.emb`. The other four (Bull Creek, Anderson Mill West, Austin May 2026, Maple Run) are embedded once at 640 px.
  - The module is added to `MODS`, pre-rendered as `wn`, wired, given the `windows` slot letter `n`, and listed in the switcher. Nothing else changed.
- The file grows by **259,068 bytes** (the four plates are about 232 KB of it).

**The issue:**
- **Masthead:** "The window issue · From 388 documented window jobs" (the lock, as written).
- **Contents:** eight entries in the published FAQ order: Cost, Brands, Frames, Siding too, Installers, Timing, Warranties, Financing.
- **Each spread:**

| Page | Content |
|---|---|
| Left: a plate | A published window job, cover-cropped, captioned only with its own record ("Plate 02 · Windermere, Pflugerville · Jul 2026 · Windows · See the project") |
| Right: the article | A running head; the question as headline; a pull-quote that is an exact substring of the answer, with its figure in deep green (for example "the median fell in the **$10,000–$15,000** band"); the answer verbatim under a drop cap; a folio |

**The turn** (two-page spread, above 900 px):
- Next lays a leaf over the right page. Its front is the page being turned, and its back is the next plate. It rotates 180° around the spine in 0.8 s with a shading sweep, while the next article is already waiting underneath.
- Previous turns a leaf from the left page back the other way.
- A turn requested mid-turn finishes the current one first, so rapid clicks never stack.

**Routes:**
- Previous / Next buttons (disabled at the ends).
- Contents buttons (`aria-current`; arrow keys, Home and End move between them; Enter opens).
- ← → on the focused spread.
- A sideways swipe on touch (more than 50 px across, less than 40 px down).
- The polite live line, on manual turns only: "Page 3 of 8: Vinyl, aluminum or fiberglass: what do Austin homes usually get?".

**Phone and tablet (900 px and below):** one page at a time, the plate above its article. The contents become a scrolling strip, and the turn becomes a short slide. If the new page's top has scrolled away, it scrolls back into view.

**Reduced motion:** pages change at once, with no leaf and no slide.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-windows-n-1440-0`, `-1440-1`, `-1440-turn` (mid-turn), `-1440-back` (mid-turn back), `-1440-p2`, `-1440-last`;
- `-1024-0`, `-1024-1`, `-768-0`, `-768-1`, `-390-0`, `-390-1`, `-390-page2`, `-390-next`;
- contact sheets `new-windows-n-1440-sheet.jpg` and `new-windows-n-390-sheet.jpg`.

Section QA ran on `?bg=none`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids; every control at least 48 px |
| At 1024 | 0 errors, and nothing in Windows N passes the viewport. The page is 17 px wide there, but the cause is the default Services A, not this section (see remaining defects) |
| Every page, every width | All 8 pages opened from the contents at 1440, 1024, 768 and 390: each article fits its page (overflow 0 px), each plate's image loads, and no leaf is left behind |
| The turn | Mid-turn: one leaf, already showing page 2's article beneath. After: no leaf; plate 2 Windermere, Pflugerville; contents 02 current; Previous enabled. Turning back works the same way. Three rapid Nexts → page 4, no leaf left |
| Keys | → / ← on the spread → pages 5 / 4; End in the contents moves focus to 08, and Enter opens it (Next disabled on the last page) |
| Phone | Swipe left → 2; swipe right → 1; a 20 px stroke does nothing; tap Next from the bottom of a long page → page 2, with the spread's top brought to 84 px (under the bar) |
| Verbatim | All 8 questions and answers equal `faq.json` exactly, and all 8 pull-quotes are substrings of their answers. The rendered answer's text equals the source even with the drop-cap span. "388 documented window jobs" and (512) 550-0000 read verbatim on the page |
| Captions | Every plate's job lists Windows among its trades; captions are each job's own place, month and trades |
| Live line | Visually hidden (1 × 1 px), announced on manual turns only |
| Reduced motion | Next → page 2 at once, no leaf; 0 errors |
| All homepage version views (125) | 0 page errors and 0 overflow in every one |
| Existing versions | The 195 existing slot templates are byte-identical; one template added (`windows:n`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Windows stays A); subpages untouched |

## Defects found and fixed

1. **The masthead lock was uppercased by CSS.** Its line rendered as "FROM 388 DOCUMENTED WINDOW JOBS", so the locked wording was not verbatim on the page (the same trap as Hero N). The `text-transform` is gone, and the test reads the rendered text.
2. **The live line was visible.** No global `.vh` rule exists, so "Page 2 of 8: …" printed under the buttons. It now has its own visually hidden rule.
3. **A class name clashed with Windows L.** `.wnL` is Windows L's section class, and its unscoped padding rule would have hit my left page. My pages are renamed.
4. **The drop cap split an acronym.** "NT Windows" rendered as a big "N" and "T Windows". An acronym now drops as a whole word ("NT"); otherwise the first letter drops. The text is unchanged.
5. **The pull-quote figure broke mid-range.** "$10,000–$15,000" broke at its dash; the figure no longer wraps.
6. **On phones, Next left the reader at the bottom.** Tapping Next under a long page left the new plate off-screen. The spread's top is now brought into view after a turn.
7. **The turning page bulged into the intro.** At the first perspective, the leaf rose over the intro text; deeper perspective (3400 px) keeps it closer to the page.
8. **The four new plates were heavy.** At 760 px they added 340 KB; at 640 px they add 232 KB, still sharp at the plate's displayed size.

## Remaining defects, named honestly

- **Pre-existing, not changed, flagged for the owner:** in a desktop browser 1024–1280 px wide, the default Services A ("Sideways sequence") widens the page by 6–17 px. It shows with every Windows version (checked with M and A), so it is not Windows N's.
- **The plates are not illustrations of their answers.** Each is a real window job, captioned with its own record, and the foot line says so. A plate beside the brands answer does not mean that job used NT Windows.
- **Another editorial device.** Hero N (cover) and Services F (spread) are also magazine forms; pick one for a page.
- **Reading takes clicks:** eight pages, one answer each. The contents list is the shortcut.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Windows N | ⟦S1434⟧ the spread dominates; ⟦S0220⟧ published answers verbatim and published job photos with their own captions; masthead lock as written |
| Element | contents | ⟦S0054⟧ buttons with `aria-current`, roving focus with arrows and Home / End; ⟦S1441⟧ 48 px |
| Element | page turn | ⟦S1436⟧ a two-faced leaf turning 180° about the spine in 0.8 s, backfaces hidden, a shading sweep; turns never stack |
| Element | Previous / Next | ⟦S0054⟧ named buttons, disabled at the ends; ⟦S1441⟧ 48 px; ← → on the spread; swipe; ⟦S1443⟧ buttons as the non-gesture route |
| Element | article | Running head, question headline, verbatim pull-quote with its figure in deep green, drop cap, folio |
| Element | plate | The published photo, cover-cropped; caption with place, month, trades and the project link |
| Element | live line | ⟦S1440⟧ polite, visually hidden, manual turns only |
| Element | CTA | ⟦S1435⟧ the one filled Book button, with the honest foot line about answers and plates |
| Site | phone and tablet | One page at a time; contents strip; short slide; the page's top brought into view |
| Site | reduced motion | ⟦S0400⟧ pages change at once |
| Site | background law | White ground; the stage is `data-solid`; the pages are white paper |

## Reference transfers and non-transfers (Ever, verified craft only)

**Transferred:**
- the magazine narrative: the work presented as an editorial story you page through;
- the plate-and-article spread;
- the contents;
- running heads and folios;
- a turning page.

**Not transferred:**
- Ever's pairs and before/after framing (barred by the annex; no pair appears);
- its apartment filtering and 3D visualisations;
- its photography, typography and copy.

## Comparison with the section's previous best (Windows L, "Lift the sash", 8.64)

- **L is stronger on:** proof at a glance. Four real before/after windows, lifted by hand.
- **N is stronger on:** explaining the purchase. All eight published answers, including the four no other version gives in full (who installs, timing, warranties, financing), read as an article beside real work.
- **Verdict:** L stays the section's best by a hair. N is the strongest of the explanatory versions (K, M, N).

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.7** | A real editorial spread: full-bleed plates of the firm's own work, a disciplined article page, and a page turn with weight and shading (`-1440-0`, `-1440-turn`, `-1440-p2`). **Minus:** the spread is a familiar form |
| Usability (30) | **8.5** | Buttons, contents, keys and swipe all work; every page fits at every width; turns never stack; phones return the reader to the plate; 0 errors in 125 views. **Minus:** eight pages need eight turns, or the contents |
| Creativity (20) | **8.4** | No Windows version reads as an editorial feature or turns a page. **Minus:** the magazine device is shared with Hero N and Services F |
| Content (10) | **8.8** | All eight published answers verbatim and checked against the source; pull-quotes exact; eight real jobs with their own records; the lock as written. **Minus:** plates are not tied to their answers |
| **Weighted** | **8.59** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.7 + 0.3 × 8.5 + 0.2 × 8.4 + 0.1 × 8.8 = 3.48 + 2.55 + 1.68 + 0.88 = **8.59**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not a configurator; nothing game-like.
- White ground; brand accents only; Montserrat / Inter only.
- No invented imagery, numbers or claims; every photo is the firm's published work with its own caption.
