# GATE: Phase 7 · Whole-site conformance to the brief's numbers

**Status:** corrected per Muse. The first version failed on one point only: Creativity was self-rated 5, below the scorecard's 6.0 floor. The correction adds one genuine creative change inside this pass's scope: **the seam handle becomes a spirit level** (see "Correction per Muse"). It then re-rates Creativity with evidence. Muse's rulings on the three flagged questions are recorded where each question was asked.

**Why this phase exists:** after Phase 6 was accepted, the brief's own phases (0 to 5) were complete. What had never been measured site-wide was the brief's **AUDIT STANDARD** applied to its binding numbers:
- the **CONVERSION FLOOR**: proof beside every call to action, the phone reachable at all times, the licence line where trust is asked, and counted copy budgets;
- the **SYSTEM NUMBERS**: Carbon icons, the Carbon spacing ladder, and the Utopia type scale;
- the **vetoes**: AA contrast, and a pin that traps scrolling.

Earlier gates checked these per section, by eye. This phase measures them with one tool across all five pages, at 1440 and 390, and fixes what fails. Muse judges; this is a self-rating, not a certification. No sub-agents, no background tasks.

**The tools, kept in the repo so the numbers can be re-run:**
- `remodeling/src/tools/conform.js` (copy, call, trust, contrast, pins, icons);
- `remodeling/src/tools/ladder.py` (spacing).

Raw output: `qa/finalize/phase7/conform.json` and `ladder.json`.

## Governing reference, and exactly what transfers
**Scout Motors** (REFERENCE-STUDY: "Sequenced evidence; section craft"; it governs Proof and Reviews).

**What transfers:**
- **"Evidence arrives as a keyed sequence, one item per beat":** evidence placed at the moment of decision. Here, one proof line beside every call to action, rather than proof gathered into one section.
- **"One easing family used everywhere":** one system per concern, never a dialect per section. Here:
  - one proof component (`.vouch`);
  - one spacing ladder;
  - one icon grid;
  - one name for the action ("Book a consultation").

  This is the brief's own FLOW LAW in the same words: "mixed easing dialects read as template assembly and fail".

**Not transferred:** Scout's full-bleed chapters, giant words and fanned cards. This phase changes no composition.

## Results (measured; before → after)
| check | brief's rule | before | after |
|---|---|---|---|
| Proof beside every CTA | "proof beside every call to action" | **8 CTAs** had no proof in their section: both versions of Financing, Projects and Consult, plus Towns and the Contact letter (the tool caught the 5 visible ones; I covered the hidden versions by hand) | **0 missing.** `.vouch` (4.8 · 343 Google reviews / Licensed, bonded & insured · CBC1265280) sits 8px under or beside each CTA; no overflow at 1440 or 390 (16 of 16 checks) |
| Phone reachable at all times | "sticky tap-to-call on mobile" | a visible `tel:` link at 11 of 11 sampled scroll positions on every page, at 1440 and 390 | unchanged (passes) |
| Licence line where trust is asked | character-exact | present on all 5 pages | now also beside every CTA |
| Pins never trap scrolling | veto | a wheel scroll from the top reaches the end on all 5 pages at 390 | unchanged (passes) |
| Contrast AA | veto | 3 flags | **0 real failures.** The 3 flags are text on SVG-painted grounds the tool cannot read: Proof's "104" block (both of its lines), white on clay **5.31:1**; the Kitchen scope tag, white on ink **17.54:1**. Both measured from the SVG fills and above 4.5. |
| Section headline ≤ 8 words, support ≤ 35 | copy budget | 4 headlines over: kitchen scope 11, bath rooms 9, reno services 9, bath hero 9 | **3 fixed** (my own copy, rewritten with nothing new claimed): "Three kinds of kitchen job. Which is yours?", "Ten kinds of bathroom. One way to build.", "Beyond kitchens and baths, everything else." The bath hero stays at 9 (see below). Supports: all ≤ 35. |
| Primary CTA ≤ 3 words, one name through the flow | S1494 (WEB-SKILLS copy) | 8 labels of 4 to 6 words; 7 different names for the same consultation link | **All primary CTAs ≤ 3 words.** Every link to the consultation reads "Book a consultation"; the two mail-opening submits read "Open in email" (still honest that it opens the visitor's mail app); "Send the letter" stays. |
| Hero ≤ 40 words | copy budget | see the next table | authored copy ≤ 40 on every page; strict totals over (see below) |
| Icons on the Carbon grid | 24 / 1.5 and 16 / 1 | **8 icons off** | **0 off.** Fixed: the before/after grips on Home, Kitchens and Bathrooms 24 / 1.5; permit checkboxes and ticks 24 / 1.5; bath camera mark 22 → 24 / 1.5; contact status lamp 20 → 16 / 1; Projects pause / play 18 → 16 / 1; settings 20 → 24 / 1.5. Non-scaling strokes, so the stroke is exact whatever the viewBox. |
| Spacing on the Carbon ladder | "an off-ladder value is a defect" | **117** off-ladder declarations | **35**, all geometry, none spacing (see below). Snapped to the nearest ladder value, ties rounded up so nothing tightens: 82 static values in 69 declarations, plus 7 fluid `clamp()` expressions whose minimum and maximum are now ladder values. Re-checked: Contact flip faces 0px overflow; Towns list 736 vs map 702 at 1440; no horizontal overflow. |
| Em dashes | zero | 0 | 0 |

### Hero word counts
The brief says "counted, not vibes", so here are both counts. **Strict** counts every visible word. **Authored** excludes what the locks fix:
- fact-lock items (phone, hours, address, live status, rating, licence);
- the firm's own published lines (matched against FACTS.md);
- published project titles;
- navigation;
- the required form interface (consent, privacy note).

| page | strict | authored | locked | largest locked items |
|---|---|---|---|---|
| Home | 59 | **36** | 23 | the picked project's published title (12), phone and proof (11) |
| Kitchens | 49 | **31** | 18 | chapter strip (7), proof (11) |
| Bathrooms | 62 | **23** | 39 | the firm's hero line and lead (21), proof (11) |
| Renovation | 63 | **10** | 53 | the firm's kicker and lead (27), two published project titles (11) |
| Contact | 137 | **16** | 121 | the letter form's fields and consent (75), hours and address (14) |

**Muse's ruling (1):** the 40-word hero budget counts authored copy, because the brief's locks outrank the budget. **Every hero passes:** 36, 31, 23, 10 and 16 authored words.

### Bathrooms hero headline (9 words)
"Down to the studs. Waterproofed properly. Closed up once." is the firm's published line (FACTS.md, "Bathroom"). The brief's locks forbid changing it ("nothing invented, nothing improved") and outrank the copy budget. So it stays verbatim, and it is listed here so it is not mistaken for an oversight. **Muse's ruling (2):** it stays verbatim.

### What the 35 remaining "off-ladder" declarations are
All geometry, none spacing rhythm:
- negative margins that centre a marker on its point (`-22px` for a 44px target, `-21px` for 42px, `-9px` for 18px);
- insets that place a mark on a corner or a drawing line;
- `calc()` offsets against the nav height;
- 1px hairline nudges.

Each is listed in `qa/finalize/phase7/ladder.json`. Converting them to `translate` would satisfy a literal reading of "every margin" without changing a single pixel. I left them, because their numbers are geometry derived from element sizes, not chosen spacing. **Muse's ruling:** they stay as geometry, with no `translate` rewrite.

## Section rhythm: Muse's ruling (3)
- **Section rhythm tokens.** The brief's three fluid pair-tokens are minor 48→64, default 64→96 and hero/CTA 96→144. The site has one token, `--section-y`, `clamp(88px, 6vw + 60px, 208px)`: 88 at 360, 134 at 1240.
  - Top and bottom are already the same token, as the brief requires.
  - Moving to the pair tokens would tighten every section by 40 to 70px at desktop. That is a change of whole-page geometry across kept, shortlisted material, which "retains its proven geometry".
  - It is the spacing twin of the type question Muse settled in ruling 7 (no blanket migration).
  - **Muse's ruling (3), an extension of ruling 7:** keep the single `--section-y` token; do not migrate to the pair tokens. Kept, shortlisted geometry stands. Untouched.
- **Type scale:** ruling 7 stands; untouched.

## Correction per Muse: the creative change, the seam handle as a spirit level
**What it was:** the handle on the before/after seam was a clay disc with two arrows. That is the generic slider-bar affordance the MERSI seam mechanism rules out ("The seam is the subject. The join between before and after is a designed construction seam ... not a generic slider bar"; REFERENCE-STUDY). The seam itself is already drawn as a wall stud.

**What it is now:** the handle is a **spirit level clipped across the stud**:
- a vial, with two ticks at its centre and a bubble;
- small push chevrons at either end, so it still says "drag sideways".

**How it moves:**
- When the seam moves, the bubble **lags the other way**, as a real level's bubble does when you carry it.
- When the seam stops, the bubble makes **one small wobble**, settles back between the ticks, and the ticks come up to full strength: **level**.
- The small story: the room is set right, and the seam you just moved is true.

**Scope-true:** it is the grip icon this pass had already put on the Carbon grid. The vial is drawn on that grid (24 grid, 1.5 stroke, round caps); the bubble is its one fill. No words and no numbers, so the numbers lock is untouched.

**Why it is not reused decoration** (CUSTOM ANIMATION LAW):
- It is made for this one mechanism, from the seam's own material: a stud is set with a level.
- It runs on the three before/after seams (Home, Kitchens, Bathrooms) only because they are one mechanism. The owner's recipe asked for the bathroom seam to be "copied from the kitchen approach".
- No other section uses it.

**Built:**
- `EZ.level` in `core.js`: it reads the stage's `--s`, so the first-view sweep, a drag and a key step all move the bubble;
- the vial markup in `ba.html`, `kitchen-work.html` and `bath-work.html`;
- its style in `systems.css`;
- one call each in `ba.js`, `kitchen-work.js` and `bath-work.js`.

**Measured on all three pages at 1440** (bubble offset in vial units):

| check | result |
|---|---|
| Drag right | the bubble lags left, growing to -2.4 |
| Release | -1.39, -0.28, +0.21, +0.23, +0.10, +0.01, -0.03, -0.02, -0.01, **0.00**; one wobble, then exactly centred, and `is-level` set |
| Arrow-key steps left | the bubble lags right (0.3, 0.6, 0.9), then settles to 0 |
| Reduced motion | the bubble never moves (no transform written) |
| The loop sleeps at rest | **0** bubble writes in 1.5 s; it wakes on the next change of `--s` |
| Carbon check (`conform.js`) | 24px at 1.5 stroke on all three pages, at 1440 and 390 |

**Frames:** `qa/finalize/phase7/level-home-rest.png`, `level-home-moving.png` (bubble off-centre) and `level-home-level.png` (centred, ticks full), plus the same three for Kitchens. Before: `grip-before-home.png` and `grip-before-kitchen.png`.

## Mechanisms and their WEB-SKILLS tags
| mechanism | tags | how it is met | files |
|---|---|---|---|
| Proof beside every CTA | **S0226**, brief CONVERSION FLOOR | "Proof sits next to every CTA, with specificity: numbers beat adjectives". The aggregate (4.8, 343) and the licence number, never adjectives. One component, two halves that wrap as units, so a phone line never starts with a separator. | `systems.css` (`.vouch`, `.go`); financing, work, towns, consult, contact-form `.html`; `work.css` |
| CTA labels | **S1494** | Verb plus object, at most 3 words; the action keeps its name through the flow. | 9 section files |
| Copy budgets | brief; **S1503** (no padding lines) | Headlines rewritten in my own copy only; firm lines verbatim. | kitchen-scope, bath-rooms, reno-services `.html`; `bath-intro.js` and `.html` |
| Icons | **S1463**, brief Carbon numbers | 24 grid / 1.5, 16 grid / 1, currentColor, round caps, `aria-hidden`. `vector-effect: non-scaling-stroke` where the viewBox is not the grid. | `chrome.css`, ba, kitchen-work, bath-work, reno-permits, bath-rooms, contact-form, work `.css` |
| Spacing ladder | brief SYSTEM NUMBERS; **S0666** | Ladder values only; rounding up keeps air (S0666: rhythm comes from a few varied gaps, not from odd numbers). | `chrome.css`, `tokens.css`, 18 section CSS files |
| Contrast and pins | **S0657** (WCAG 2.2 AA), **S0400** | Measured on every visible text run, composited through opacity; SVG grounds checked by hand. A wheel scroll from the top reaches the end at 390. | `conform.js` |
| Seam level (the creative change) | **S1463** (icon numbers), **S0340** (motion from the input's real velocity, spring settle), **S1018** (keys move it like a drag), **S0400** (static under reduced motion), MERSI seam wording | Velocity of `--s` drives a slightly under-damped spring; the loop stops when settled and a MutationObserver on the stage wakes it. | `core.js`, `systems.css`, `ba`, `kitchen-work`, `bath-work` (`.html`, `.js`) |
| Dead code | hygiene | 17 rules for `.vs1r__*` (a Contact card version that no longer exists) removed. | `contact-visit.css` |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| **Design** | **7** | One proof component, one icon grid, one spacing ladder across five pages. The proof lines sit cleanly under or beside each CTA at both widths (screenshots). Fluid poles now land on the ladder. | Spacing snaps are small (2 to 8px) but were not reviewed frame by frame on every element; I checked the riskiest (flip cards, the Towns list against the map, the nav, the CTA rows). Section rhythm stays on the single token by Muse's ruling (3); that is not counted against the score. |
| **Usability** | **8** | Every CTA now carries its proof. The phone is visible at all sampled scroll positions. No pin traps scrolling. 0 real AA failures. Icons on the grid. One consistent action name. | Contrast on SVG grounds is verified by hand, not by the tool; a future SVG ground could slip through. Touch is still tested with synthetic events. |
| **Creativity** | **6** | The seam handle is now the trade's own instrument. A spirit level whose bubble lags the seam and settles level replaces a generic double-arrow slider. It is made from the stud the seam is drawn as, gives a small story (the seam you moved is set true), and is measured (frames and numbers above). It is the one new moment of a pass otherwise about conformance. | It is one small moment on a 24px handle. The rest of the pass invents nothing by design. The vial reads clearly at 3× zoom; at 1× it is a small detail a visitor notices on the second drag rather than the first. |
| **Content** | **8** | Copy budgets measured, not guessed. Every primary CTA within 3 words. Three headlines brought within 8 words without new claims. Facts and firm lines untouched. Licence string character-exact in every new instance. 0 em dashes. | The hero budget passes on the authored count, by Muse's ruling (1). "Book a consultation" everywhere is consistent but less warm than "Talk it through with us". I followed S1494 over tone, and Muse may prefer the other. |

## Evidence
`qa/finalize/phase7/`:
- `conform.json` and `ladder.json`: raw measurements;
- `vouch-*-{1440,390}.png`: every CTA with its proof, both versions;
- `contrast-*.png`: the two SVG-ground flags;
- `ladder-*-{1440,390}.png`: nav, consult, contact visit and services after the snap;
- `level-*.png` and `grip-before-*.png`: the seam level at rest, moving and level, against the old grip.

**Regression after the last change:**
- all five pages: 0 console errors;
- single file `elbaz-construction.html` (3.7 MB, rebuilt after the level):
  - navigation, back, the deep link `#/contact/contact-form`, the mail override and logo home all pass;
  - images: 0 broken;
  - console errors: 0;
- Proof touch lock: 9px not held, 12px held;
- keyboard carry: 80px, and Escape returns the block;
- Contact masks: on while drifting, off in search.
