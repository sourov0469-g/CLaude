# GATE: Phase 8 · Device matrix: every page at every size

**Why this phase exists:** after Phase 7 was accepted, the brief's AUDIT STANDARD still had one clause measured only at two widths (390 and 1440): "every pin behaving on real phone sizes (a pinned story must pin, play and release, never trap scrolling)" and "nothing broken ships". This phase runs all five pages at eight sizes, and fixes what fails:
- **phones:** 320×568, 360×740, 375×667, 414×896;
- **tablets:** 768×1024, 1024×768;
- **desktops:** 1280×800, 1920×1080.

Each phone size runs twice:
- a desktop-style browser, scrolled with the wheel;
- an **emulated phone** (`isMobile`, touch, coarse pointer, 2× density), scrolled by script, so the touch-only code paths run (the companion off, the Proof touch lock, the phone layouts).

That is 60 runs. Muse judges; this is a self-rating, not a certification. No sub-agents, no background tasks.

**The tool, kept in the repo:** `remodeling/src/tools/matrix.js`. Raw output: `qa/finalize/phase8/matrix-final-a.json` (Home, Kitchens) and `matrix-final-b.json` (Bathrooms, Renovation, Contact).

## Governing reference, and exactly what transfers
**Scout Motors** (REFERENCE-STUDY: "Sequenced evidence"; it governs Proof and **Reviews**). Phase 8's one structural change is in the Reviews ledger.

**What transfers:**
- "Evidence arrives as a keyed sequence, **one item per beat**." The 343-stroke tally is now **counted one gate per keystroke** (arrows along a line, down a line, Home and End), with the live readout ("Reviews 46 to 50") as the beat.
- Before, it was 69 separate tab stops, each a 22×18px target on a phone.

**Not transferred:** Scout's full-bleed chapters and giant words; no composition changes.

**Scoped secondary: Bruno Simon** (Towns only: "an explorable instrument ... with performance, **mobile** and reduced-motion guards"). The phone guard here is target size: each of the 104 town names is now a 24.9px target, so the instrument can be worked by thumb.

## Results (60 runs: 5 pages × 8 sizes, phones twice)
| check | rule | result |
|---|---|---|
| Console and page errors | "nothing broken ships" | **0** in all 60 runs |
| Scroll reaches the end | "never trap scrolling" | **60 of 60.** No pin traps scrolling at any size, wheel or touch-emulated (28 to 102 steps per page) |
| Horizontal overflow, sampled through the whole scroll | layout | **0** in all 60 runs |
| Phone visible on phones | CONVERSION FLOOR ("sticky tap-to-call on mobile") | a visible `tel:` link at **every** sampled position, every phone size, both modes (e.g. Home at 320: 25 of 25) |
| Text clipped by an overflow box | layout | **0** (`.sr-only` is excluded: it is clipped on purpose) |
| Interactive targets under 24×24 | WCAG 2.2 AA 2.5.8 (a veto: AA failure) | **before: 175** on Home at 320, plus 2 on Contact. **After: 0 on every page at every size** |
| Targets under 44 (our craft line, S0657) | craft commitment, not a veto | reduced and reported below |

## What failed, and what fixed it
| defect (measured) | fix | after |
|---|---|---|
| **The 104 town names** (Towns) were 62×21px buttons packed with no gap that would exempt them under 2.5.8 | `padding: 4px` (on the ladder) | 25px tall at every size |
| **The Reviews tally**: 69 focusable gates, each a separate tab stop; at 320 to 375 each was 22×18 to 27×22px | **One tab stop** (roving tabindex): the arrow keys count along the ledger, Down and Up move a line, Home and End jump; the readout follows [S1018]. Each gate's pointer target is now its **whole cell** (a transparent hit rect), so there are no dead gaps between gates; the drawn highlight is unchanged. On phone widths (≤ 480px) the ledger is **re-ruled at seven gates to a line** instead of ten, so the cells are 37×30px rather than 26×21px. | 69 gates, 343 strokes (unchanged count); one Tab in, one Tab out; ArrowDown moves +7 at 320 and +10 at 1440; frames `tally-320.png`, `tally-1440.png` |
| **Consent label** (Consult, Contact letter) was one 22px line | `min-height: 24px` | ≥ 24px |
| **Card links** (Contact visit: phone and email) were 21px | 24px hit area | 24 to 27px |
| **Nav phone link** was 23px tall | 44px hit area | 44px |
| **Footer page links** were 32px | 44px | 44px (45 links across the five pages) |
| **Phone in a fact list** (Consult) and the **Bathrooms closing number** were 21 to 28px | 44px hit area | 44px |
| **Licence-verify link** (footer) was 20px | 24px hit area | 24px |

## Still under 44px (all pass AA at 24 or more; reported, not hidden)
- **The 104 town names**, at 25px. "All 104 shown at once" is the owner's order; at 44px each the list would be about twice as tall as the map. The search box and the map are the 44px ways in.
- **Fill-in blanks inside sentences:**
  - Consult V1: 32px on phones, 41px on desktop;
  - the Contact letter: 28px on phones, 39px on desktop.

  They are words in a line of text by design (the guided note, the letter); 44px blanks would break the sentence.
- **Hero controls:**
  - the finish swatches: 6 at 42×42;
  - the "Open the room" rail: 42px;
  - the hero phone and review links: 42px.

  All are 2px short.
- **Small links:**
  - the logo link: 37px;
  - phone links inside closing lines: 28 to 31px on Kitchens, Bathrooms and Renovation;
  - the services sheet links: 41px;
  - the licence-verify link: 24px.
- **The Proof block** in its tray: 42px tall, and draggable across its whole width.

## Mechanisms and their WEB-SKILLS tags
| mechanism | tags | how it is met | files |
|---|---|---|---|
| Target sizes | **S0657** (AA 2.5.8 24×24; the craft line 44×44), WCAG 2.2 **2.5.8** | Every interactive target ≥ 24 at every size; the most-used standalone links raised to 44 | `chrome.css`, `systems.css`, `towns.css`, `consult.css`, `bath-close.css` |
| Tally keyboard counting | **S1018** (keyboard parity: arrows, Home, End), WCAG **2.4.3** (focus order: 69 stops become 1) | Roving tabindex on the ledger; the readout is the existing `aria-live` tip; the group's label says how to count | `reviews.js`, `reviews.html` |
| Tally on phones | **S1421** (one illustration language: the same strokes, the same gates of five), Scout "one item per beat" | Re-ruled at seven a line under 480px; whole-cell hit areas | `reviews.js`, `reviews.css` |
| No scroll trap at any size | brief AUDIT STANDARD; **S0400** | 60 runs, wheel and touch-emulated | `matrix.js` |
| Phone always reachable | brief CONVERSION FLOOR | Sampled through every page at every phone size | `matrix.js` |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| **Design** | **7** | The phone ledger is re-ruled, not shrunk: seven gates to a line reads as a narrower ledger page (`tally-320.png`). The footer and the nav are on the 44 line; nothing visibly crowds. | The hero's 42px controls and the 25px town names still sit under the craft line. I chose layout over the 44 rule there and say so above. |
| **Usability** | **8** | 0 errors, 0 overflow, 0 scroll traps and 0 AA target failures in 60 runs across 8 sizes and two input modes. The phone is reachable at every sampled position. The tally went from 69 tab stops to 1, with arrow-key counting. | Touch is emulated, not tested on a physical phone. 44px is not met everywhere (listed). |
| **Creativity** | **6** | Two fixes were made as design moves rather than shrink-to-fit. The ledger is re-ruled for the phone, so it is still a hand-kept tally. Keyboard users can now count along the 343 strokes gate by gate, with the readout as the beat (the Scout transfer). | A QA phase: it adds no new signature moment beyond these two. |
| **Content** | **8** | No copy changed. The tally's label now tells a keyboard user how to use it ("The arrow keys count along it."). Facts untouched; 0 em dashes in the single file. | Nothing new to say; the count stays aggregate-only, by design. |

## Evidence
- `qa/finalize/phase8/matrix-final-a.json` and `matrix-final-b.json`: every run, every target under 44px with its size, and every overflow culprit (none);
- `tally-320.png` and `tally-1440.png`: the ledger ruled at seven and at ten.

**Regression after the last change:**
- all five pages: 0 console errors;
- single file `elbaz-construction.html` (3.7 MB):
  - navigation, back, deep link, mail override and logo home all pass;
  - images: 0 broken;
  - console errors: 0;
- Phase 7 conformance is unchanged:
  - proof beside every CTA;
  - heroes within budget on authored copy;
  - icons on the Carbon grid;
  - 35 geometry offsets only;
- the seam level still lags and settles on all three pages;
- Proof touch lock: 9px not held, 12px held;
- 0 em dashes.
