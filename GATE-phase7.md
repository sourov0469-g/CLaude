# GATE: Phase 7 · Whole-site conformance to the brief's numbers

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

**For Muse to decide (no ruling invented):** which count the 40-word hero budget means. On the authored count, every hero passes. On the strict count, every hero fails, and it could only pass by removing fact-lock items, the firm's verbatim lines or the conversion floor's proof. The brief ranks all three above the budget ("THE LOCKS ... outrank everything above").

### Bathrooms hero headline (9 words)
"Down to the studs. Waterproofed properly. Closed up once." is the firm's published line (FACTS.md, "Bathroom"). The brief's locks forbid changing it ("nothing invented, nothing improved") and outrank the copy budget. So it stays verbatim, and it is listed here so it is not mistaken for an oversight.

### What the 35 remaining "off-ladder" declarations are
All geometry, none spacing rhythm:
- negative margins that centre a marker on its point (`-22px` for a 44px target, `-21px` for 42px, `-9px` for 18px);
- insets that place a mark on a corner or a drawing line;
- `calc()` offsets against the nav height;
- 1px hairline nudges.

Each is listed in `qa/finalize/phase7/ladder.json`. Converting them to `translate` would satisfy a literal reading of "every margin" without changing a single pixel. I left them, because their numbers are geometry derived from element sizes, not chosen spacing.

## Not changed, flagged for Muse (no ruling invented)
- **Section rhythm tokens.** The brief's three fluid pair-tokens are minor 48→64, default 64→96 and hero/CTA 96→144. The site has one token, `--section-y`, `clamp(88px, 6vw + 60px, 208px)`: 88 at 360, 134 at 1240.
  - Top and bottom are already the same token, as the brief requires.
  - Moving to the pair tokens would tighten every section by 40 to 70px at desktop. That is a change of whole-page geometry across kept, shortlisted material, which "retains its proven geometry".
  - It is the spacing twin of the type question Muse settled in ruling 7 (no blanket migration). I would rather take Muse's ruling than extend ruling 7 myself.
- **Type scale:** ruling 7 stands; untouched.
- **The 40-word hero count** (above).

## Mechanisms and their WEB-SKILLS tags
| mechanism | tags | how it is met | files |
|---|---|---|---|
| Proof beside every CTA | **S0226**, brief CONVERSION FLOOR | "Proof sits next to every CTA, with specificity: numbers beat adjectives". The aggregate (4.8, 343) and the licence number, never adjectives. One component, two halves that wrap as units, so a phone line never starts with a separator. | `systems.css` (`.vouch`, `.go`); financing, work, towns, consult, contact-form `.html`; `work.css` |
| CTA labels | **S1494** | Verb plus object, at most 3 words; the action keeps its name through the flow. | 9 section files |
| Copy budgets | brief; **S1503** (no padding lines) | Headlines rewritten in my own copy only; firm lines verbatim. | kitchen-scope, bath-rooms, reno-services `.html`; `bath-intro.js` and `.html` |
| Icons | **S1463**, brief Carbon numbers | 24 grid / 1.5, 16 grid / 1, currentColor, round caps, `aria-hidden`. `vector-effect: non-scaling-stroke` where the viewBox is not the grid. | `chrome.css`, ba, kitchen-work, bath-work, reno-permits, bath-rooms, contact-form, work `.css` |
| Spacing ladder | brief SYSTEM NUMBERS; **S0666** | Ladder values only; rounding up keeps air (S0666: rhythm comes from a few varied gaps, not from odd numbers). | `chrome.css`, `tokens.css`, 18 section CSS files |
| Contrast and pins | **S0657** (WCAG 2.2 AA), **S0400** | Measured on every visible text run, composited through opacity; SVG grounds checked by hand. A wheel scroll from the top reaches the end at 390. | `conform.js` |
| Dead code | hygiene | 17 rules for `.vs1r__*` (a Contact card version that no longer exists) removed. | `contact-visit.css` |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| **Design** | **7** | One proof component, one icon grid, one spacing ladder across five pages. The proof lines sit cleanly under or beside each CTA at both widths (screenshots). Fluid poles now land on the ladder. | Spacing snaps are small (2 to 8px) but were not reviewed frame by frame on every element; I checked the riskiest (flip cards, the Towns list against the map, the nav, the CTA rows). Section rhythm is still off the brief's tokens, pending Muse. |
| **Usability** | **8** | Every CTA now carries its proof. The phone is visible at all sampled scroll positions. No pin traps scrolling. 0 real AA failures. Icons on the grid. One consistent action name. | Contrast on SVG grounds is verified by hand, not by the tool; a future SVG ground could slip through. Touch is still tested with synthetic events. |
| **Creativity** | **5** | None claimed. This is a conformance pass, and it adds no new moment by design. | It deliberately invents nothing. |
| **Content** | **8** | Copy budgets measured, not guessed. Every primary CTA within 3 words. Three headlines brought within 8 words without new claims. Facts and firm lines untouched. Licence string character-exact in every new instance. 0 em dashes. | The hero budget is met only on the authored count; the strict count is Muse's question. "Book a consultation" everywhere is consistent but less warm than "Talk it through with us". I followed S1494 over tone, and Muse may prefer the other. |

## Evidence
`qa/finalize/phase7/`:
- `conform.json` and `ladder.json`: raw measurements;
- `vouch-*-{1440,390}.png`: every CTA with its proof, both versions;
- `contrast-*.png`: the two SVG-ground flags;
- `ladder-*-{1440,390}.png`: nav, consult, contact visit and services after the snap.

**Regression after the last change:**
- all five pages: 0 console errors;
- single file `elbaz-construction.html` (3.69 MB):
  - navigation, back, the deep link `#/contact/contact-form`, the mail override and logo home all pass;
  - images: 0 broken;
  - console errors: 0;
- Proof touch lock: 9px not held, 12px held;
- keyboard carry: 80px, and Escape returns the block;
- Contact masks: on while drifting, off in search.
