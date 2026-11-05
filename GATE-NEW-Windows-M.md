# GATE-NEW — Windows M, "One window, four answers"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 3, section 4 (Hero M, Services M and Visualiser M accepted by Muse). It inherits the button system. Nothing game-like and no configurator: the visitor picks a question to read the firm's published answer.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Windows M, "One window, four answers"** (`?windows=m`) |
| Primary reference (annex v3, one) | **Lusion**: flow, one object that never cuts, only becomes its next state. No Windows version has used Lusion: A–J used Apple AirPods Pro ×2, Lando Norris, Graza, Cash App, Quiet Cubes, Cowboy and Scout; K Dropbox; L MERSI. Rimowa is scoped to the configurator, Bruno Simon to the map, Ever to pairs and its verified craft. |
| Signature creative move | **The glass divides by the numbers.** One large window holds the firm's window record. At first its glass is one undivided pane: the 376 priced jobs among the 388 documented window jobs. Pick a question and the mullions glide, without a cut, to divide the glass into that answer. Each pane's area is its share of the 376 priced jobs, and each carries its name and count. The four questions: what it cost (grouped from the 12 published bands, median band marked), which brand (NT Windows 238, Simonton 54, Andersen 38, Pella 31), which frame (vinyl 214, NT Twinsulator aluminum 64, Andersen Fibrex 33), and siding at the same time (36%). Beside the window, the firm's own published answer, verbatim. |
| Style family | One drawn window as a living proportion chart; a calm question list and the published answer in plain type |
| Content | The windows FAQ published on the firm's site, verbatim (`faq.json`): 376 priced window jobs 2022–2026; middle half $5,000–$25,000; median band $10,000–$15,000; brand counts; frame counts; siding on 36%. The 12 band counts from the windows cost guide (the same counts Windows K uses, sum 376), grouped into five panes: Under $5k 52 · $5k–$10k 96 · $10k–$15k 79 (median band) · $15k–$25k 80 · $25k and up 69. "Other or not recorded" panes are the published total minus the named counts (15 brands, 65 frames), and are labelled as such. "388 documented window jobs" is the locked wording. No new claim. |
| How it differs from every existing Windows version | A is morning to midnight; B builds out a bay; C takes a window apart; D is an archive of window jobs; E is a unit chart of priced jobs by maker; F shows how windows open; G gives frame colours by maker; H is a counter; I is a window of quotes; J walks a replacement step by step; K sets the cost bands in type; L lifts sashes on before/after pairs. None answers several buying questions in one object, and none uses the window's own glass as the chart. |
| Why it is better | It answers the four questions a window buyer actually asks, from the firm's own records and in its own published words, in one place, and the answer is visible as a shape before a number is read. The current best (L, "Lift the sash", 8.64) proves results on four houses; M gives the whole record behind them. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the window); ⟦S0220⟧ published counts and answers only; remainders labelled |
| Question list (4) | ⟦S0054⟧ `radiogroup` of `radio`s, roving tabindex, arrows wrap, Home / End; ⟦S1444⟧ four choices; the button system (hover, press, spring, ring) |
| The window's panes | ⟦S1436⟧ every pane's `left / top / width / height` interpolated (0.9 s, `cubic-bezier(.65,0,.35,1)`), so mullions glide from one division to the next; labels fade out before the move and in after; ⟦S1440⟧ the division is the answer to the pick |
| Pane labels | Name, count and share in plain type; the median band carries a lime "median band" tag; a pane too small for its label shows the count only |
| Published answer | ⟦S1494⟧ the FAQ answer verbatim, with its source line; announced politely |
| Arrival | ⟦S1325⟧ once, on entering view: the undivided glass divides into the first answer |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" |
| Phone | Questions as a 2 × 2 grid of chips above the window; window full width; answer below; ⟦S1441⟧ 48 px targets |
| Reduced motion | ⟦S0400⟧ panes change at once; no arrival |
| Background law | White ground; the window and the answer panel are `data-solid` |

---

## Build log

**How to view:** `?windows=m` (switcher: Windows, **M "One window, four answers"**).

**Files:**
- `src/sec/win8.js` (`Win8.M`, `Win8.wire`) and `src/sec/win8.css` (class prefix `wm` under `.wnM`; the collision check found no shared names).
- `build_site.py`: the module added to `MODS`, pre-rendered as `wm`, wired, given the `windows` slot letter `m`, and listed in the switcher. Nothing else changed.
- The file grows by **15,425 bytes**; no images.

**The four answers** (each pane's area = its share of the 376 priced jobs; panes largest first):

| Question | Panes | Published answer shown |
|---|---|---|
| What does it cost? | $5k–$10k 96 (most common) · $15k–$25k 80 · $10k–$15k 79 (median band, lime tag) · $25k and up 69 · Under $5k 52, grouped from the 12 published bands | "How much does window replacement cost in Austin?", verbatim |
| Which brand? | NT Windows 238 (built in Texas) · Simonton 54 · Andersen 38 · Pella 31 · Other or not recorded 15 | "Which window brands does Austin Pro install?", verbatim |
| Which frame? | Vinyl 214 · Other or not recorded 65 · NT Twinsulator aluminum 64 · Andersen Fibrex composite 33 | "Vinyl, aluminum or fiberglass: what do Austin homes usually get?", verbatim |
| Siding at the same time? | Windows only 64% · Siding replaced too 36% (shares only; the FAQ publishes no count) | "Should I replace windows and siding at the same time?", verbatim |

Under each answer, a source line says how the panes were made ("Panes grouped from the 12 published price bands", "The remaining 15 jobs are other makers or not recorded", and so on).

**The flow:**
- The largest pane takes a full-height column on the left, its width equal to its share. The rest stack in the right column with heights in proportion, so every area is exact.
- Every pane's `left`, `top`, `width` and `height` transition over 0.9 s (`cubic-bezier(.65,0,.35,1)`), so the mullions glide from one division to the next.
- A pane an answer does not use collapses into the foot of the right column (or the right edge), so the glass stays filled throughout.
- Labels fade out for 160 ms before the move and back in after it.
- Panes too small for their label hide the tag, then the name.

**Arrival:** at first the glass is one pane ("376 priced window jobs, of our 388 documented window jobs"). Once the window is 40% in view, it divides into the cost answer.

**Accessibility:**
- The drawn window is `aria-hidden`. Its content is given as a visually hidden list ("$5k–$10k: 96 jobs (26%)", …) inside the polite answer region, together with the question and the published answer.

**Layout:**
- **Desktop:** heading, questions, answer and CTA in a left column; the window on the right.
- **Under 1000 px:** heading, questions, window, answer.
- **Phone:** the questions as a 2 × 2 grid of 48 px chips.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-windows-m-1440-0` (cost), `-1440-brand`, `-1440-frame`, `-1440-siding`;
- `-1440-flow`: siding → brand, 420 ms into the move;
- `-1440-1`, `-768-0`, `-768-1`, `-390-0`, `-390-1`;
- `-390-frame`: tapped on a phone;
- contact sheet `new-windows-m.jpg`.

Section QA ran on `?bg=none`; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Areas match the record | Measured pane areas as a % of the glass: cost 25.5 / 21.3 / 21.0 / 18.4 / 13.8; brand 63.3 / 14.4 / 10.1 / 8.2 / 4.0; frame 56.9 / 17.3 / 17.0 / 8.8; siding 64 / 36. Each equals count ÷ 376 (or the published share) |
| Published answers | Each answer is the FAQ text verbatim (checked against `faq.json`) |
| Keyboard | One tab stop; End → "Siding at the same time?"; → wraps to "What does it cost?"; ↓ → "Which brand?"; Home → "What does it cost?". Focus follows, and exactly one radio has tabindex 0 |
| Phone tap (390) | "Which frame?" chosen; panes 56.9 / 17.3 / 17.0 / 8.8; chips 48–56 px tall |
| Mid-flow | The glass stays filled while the mullions move (`-1440-flow`) |
| Reduced motion | The first answer shows at once; a pick changes the panes within 40 ms (no transition) |
| All homepage version views (116) | 0 page errors and 0 overflow in every one |
| Existing versions | The 187 existing slot templates are byte-identical; one template added (`windows:m`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Windows stays A); subpages untouched |
| Locks | "388 documented window jobs" and "(512) 550-0000" verbatim |

## Defects found and fixed

1. **A gap opened mid-flow.** Panes an answer doesn't use first collapsed into the window's bottom-right corner, so moving from two panes to five left an empty band of frame in the right column. Unused panes now collapse into the foot of the right column, and the glass stays filled throughout.

## Remaining defects, named honestly

- **The cost panes are my grouping** of the 12 published bands (into 5). Their counts sum exactly to the published bands, and the source line says they are grouped.
- **The "Other or not recorded" panes are computed** as the published total minus the named counts. They are labelled as such, but they are not a published category.
- **Siding at the same time has shares only** (64% / 36%): the FAQ publishes no count, so the panes give none.
- **A drawn window**, not a photo; the glass is a chart.
- **On a 390 phone** the narrow cost column (26%) wraps its label to three lines; the median and most-common tags hide on small panes.
- **Overlaps with other versions.** Windows K uses the same price bands (as type) and Windows E the same brand data (as units); M adds frames and siding and puts all four in one object. If the owner pairs Services M with Windows M, the page has two "one object that changes shape" sections; pick one.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Windows M | ⟦S1434⟧ the window dominates; ⟦S0220⟧ published counts and answers only; remainders labelled |
| Element | 4 question radios | ⟦S0054⟧ radiogroup, roving tabindex, arrows wrap, Home / End; ⟦S1444⟧ four choices; button system: hover, press, spring, ring |
| Motion | the panes | ⟦S1436⟧ geometry transitions, 0.9 s ease in-out; labels out 160 ms before, in after; ⟦S1440⟧ the division answers the pick |
| Element | pane labels | Name, count, share; lime "median band" tag; tag and name hide on small panes |
| Element | published answer | ⟦S1494⟧ the FAQ verbatim, with its source line; polite region with a hidden list of every pane |
| Motion | arrival | ⟦S1325⟧ once, at 40% in view: one pane divides into the cost answer |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button |
| Site | phone | Questions as a 2 × 2 chip grid; ⟦S1441⟧ 48 px targets; window full width |
| Site | reduced motion | ⟦S0400⟧ no transitions; the first answer at once |
| Site | background law | White ground; window and answer are `data-solid` |

## Reference transfers and non-transfers (Lusion)

**Transferred:**
- one object that never cuts, only becomes its next state;
- continuity of form (the mullions travel);
- an arrival that grows out of a whole.

**Not transferred:**
- Lusion's WebGL scenes and its dive (locked to Try D);
- Booking K's drawn line;
- Services M's silhouette morph;
- Visualiser M's ribbon;
- Lusion's own type and palette.

## Comparison with the section's previous best (Windows L, "Lift the sash", 8.64)

- **L is stronger on:** proof with real photographs: four houses, old windows, then new.
- **M is stronger on:** breadth. It answers cost, brand, frame and the siding question from the whole record, in the firm's own words, in one place, and the shape of each answer is readable before the numbers.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | One dominant window whose glass is the chart; calm question chips; the published answer in plain type (`-1440-0`, `-1440-brand`); the glass stays whole mid-flow (`-1440-flow`). **Minus:** a drawn window, not a photograph |
| Usability (30) | **8.5** | Four radios with the full keyboard model; exact areas; polite answer region with a hidden list; phone chips; reduced motion; 0 errors in 116 views, 0 overflow. **Minus:** cramped labels in narrow panes on a phone |
| Creativity (20) | **8.5** | No Windows version answers several questions in one object or uses the glass itself as the chart. **Minus:** the flowing-object move is shared with Services M |
| Content (10) | **8.8** | Four published answers verbatim; every count published; remainders and grouping stated. **Minus:** grouped cost panes and computed remainders |
| **Weighted** | **8.57** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.5 + 0.2 × 8.5 + 0.1 × 8.8 = 3.44 + 2.55 + 1.70 + 0.88 = **8.57**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not a configurator; no game.
- White ground; brand accents only; normal fonts.
- No invented imagery or numbers.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Reviews M until Muse accepts.
