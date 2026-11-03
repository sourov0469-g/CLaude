# GATE: Phase 10 · The locks, audited on the delivered file

**Why this phase exists:** the brief ends with "IF YOU READ NOTHING ELSE: THE LOCKS (repeated; these outrank everything above)". The last full lock check was the Phase 5 assembly. Since then, Phases 6 to 9 changed visible copy:
- the CTA labels and three headlines;
- the proof lines;
- the tally label and the Bathrooms callout.

This phase audits every lock on the final build, by tool, and fixes what fails. Muse judges; this is a self-rating, not a certification. No sub-agents, no background tasks.

**The tool, kept in the repo:** `remodeling/src/tools/locks.js`. It reads every page with each version set (10 runs) and checks:
- **every text node in the DOM:** shown or hidden, closed menus and collapsed answers included, because no backups ship and all of it is shipped text;
- **every `tel:` and `mailto:` link;**
- **every request the page makes.**

Raw output: `qa/finalize/phase10/locks.json`.

## Governing reference, and exactly what transfers
**OH Architecture** (REFERENCE-STUDY: "A live opening-hours status line computed from real hours"; "the index caption grammar").

**What transfers:** facts as **computed, checkable data, never hand-typed claims**:
- the open or closed line is computed from the locked hours;
- the project index (P-01 to P-26) is generated from the 26 projects in `projects.json`;
- this phase holds every other locked fact to the same standard, by measurement.

**Not transferred:** OH's studio clock and its uppercase two-line headings.

## The locks: result
| lock (FINALIZE / addendum) | check | result |
|---|---|---|
| Rating **4.8**, **343** reviews, aggregate-led | every decimal and every "N reviews" or "N stars" in all text | only 4.8 and 343 |
| Licence line **character-exact** | every block that prints CBC… must hold `Licensed, bonded & insured · CBC1265280` or the long form in a sentence; no other licence number | pass |
| Phone **(754) 236-0675** only | every phone-shaped string; every `tel:` | one number in text; `tel:+17542360675` only (10 runs) |
| Office **19 W Flagler St #310** | every street address naming Flagler | pass ("on Flagler." in a heading is a street mention, not an address) |
| Hours **Sun to Fri 7 to 7, Saturday closed** | every "Saturday" or "Sat" must sit beside "closed" | pass |
| **Mailto** to Sales@elbazconstruction.com, **never claimed sent** | every `mailto:`; copy claiming sent, received or submitted | `mailto:Sales@elbazconstruction.com` only; 0 claims. The success line reads "Your email app should now be open … Send it from there" |
| **104 municipalities**, all shown at once | town buttons on Home; drifting names on Contact | 104 and 104 |
| **Exactly 4 genuine before/after pairs** | every `ba-*` image key on the site | 4: `ba-kitchen1`, `ba-bath2`, `ba-kitchen4`, `ba-outdoor` |
| **26 projects** (photographs of the firm's work only) | the project index | P-01 to P-26, generated from `projects.json` (26 entries) |
| **Numbers lock**: no number outside the fact lock or the firm's published figures | every number in all text, against the fact lock plus every number in FACTS.md | 0 unlisted, except P-21, P-22, P-23 and P-25: project index labels within the 26 above |
| **Poppins and Roboto only** | the first family of every shown text run; every embedded face, by file hash | runs: Roboto 1541, "Elbaz Display" 641. "Elbaz Display" is **byte-identical to Poppins SemiBold** (the size-adjusted alias). All 20 embedded faces (four per page: Elbaz Display, Poppins 500, Poppins 600, Roboto) hash to the Poppins or Roboto files. |
| **One single HTML file**, all pages inside | `elbaz-construction.html` | 3.65 MB (`du`: 3.5M); five page templates plus the shared GSAP block; in-file navigation passes |
| **Backups do not ship** (Muse) | `data-v="b…"` in the file | 0 |
| **Nothing published or uploaded** | every request the five pages make | 0 beyond the file itself |
| **Zero em dashes** | the single file | 0 |
| **No model identifiers in pushed artefacts** | every tracked file I wrote | 0 after the redaction below |

## What failed, and what fixed it
| defect (measured) | fix |
|---|---|
| **Bebas Neue and Geist shipped** inside the Home page and the single file, as embedded fonts "for the hidden backup slots". Those slots no longer ship (Muse), so two non-brand faces were dead weight against "Poppins and Roboto only". | `build.py` stops embedding them on every page. Home fell from 2.11 to 2.05 MB; the single file from 3.71 to 3.65 MB. |
| **The Home menu printed code as link text.** In "On this page", the build's format string put the label into an attribute and the retired reaction code into the link: the menu read "~wrench/tilt/wobble/r" and "~swap/hinge/spinout/r" instead of "Services" and "Before and after". Hidden until the menu opens, so earlier visible-text checks missed it. | `chrome()` rewritten: labels print, and the retired `data-rx` codes are gone from the nav, menu and footer (17 in the shipped file, now 0). The menu reads Services, Before and after, Process, Financing, Work, Reviews, Service area; a tap on one scrolls to its section (`menu-home-390.png`). `locks.js` now also flags leaked codes (`~a/b`, `undefined`, `NaN`, `[object`, braces) in all text. |
| **The "On this page" label sat with the wrong list:** 64px above its own list, about 40px below the list before it. | `.sheet .sheet__h + ul { margin-top: 0 }`, and the label takes the larger gap above (48px above, 8px below, both on the ladder). |
| `data-rx` left in the two form success messages (script-built) | removed |
| **Model name in two of my repo documents:** `AUDIT-PACK-01.md` and `PROMPT-V2.md` quoted the session line naming the model | redacted to "the assigned model". The three `bank-index` files that mention a model are the owner's supplied WEB-SKILLS material and are left untouched. |
| **My Phase 6 gate claimed "0 left in markup"** for `data-rx`; true of `base.html` only | erratum added to `GATE-phase6.md` |

## Mechanisms and their WEB-SKILLS tags
| mechanism | tags | how it is met | files |
|---|---|---|---|
| Facts as checkable data | **S0226** (specificity: numbers beat adjectives), brief locks, OH | Every locked fact measured in all text, both version sets | `locks.js` |
| Menu labels and grouping | **S1494** (labels say what they do), **S1422** / law of **proximity** (a label sits with what it labels) | Labels print; the label's gap below (8px) is a sixth of its gap above (48px) | `build.py`, `chrome.css` |
| Type lock | brief brand lock; **S0490** | Faces verified by file hash, not by name | `build.py`, `locks.js` |
| Nothing leaves the file | brief ("nothing is published or uploaded anywhere") | Request log on every page and version | `locks.js` |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| **Design** | **7** | The menu reads as two clear groups (pages, then this page's sections). Only the two brand faces ship. | The menu's grouping was fixed by measurement after it was found; the menu had no visual review in earlier phases, and I name that as a process gap. |
| **Usability** | **8** | The Home menu's section links now say where they go and work (a tap scrolls to the section). 0 errors; 0 requests outside the file. | The menu bug sat in a closed state for several phases. The audit now reads hidden text, but other closed states (error messages, success messages) are checked by reading their source, not by triggering them. |
| **Creativity** | **6** | An audit phase. The one design act is the menu's regrouping by proximity. | It adds no new moment, by design. |
| **Content** | **9** | Every lock passes on all text, shown and hidden, in both version sets: rating, reviews, licence, phone, office, hours, mailto, 104 towns, 4 pairs, 26 projects, the numbers lock, the type lock, 0 em dashes, nothing published. | The numbers-lock whitelist is every number in FACTS.md, which is broad: a wrong number that happens to appear somewhere in FACTS.md would pass. I reviewed the four outliers by hand, but not every whitelisted match. |

## Evidence
`qa/finalize/phase10/`:
- `locks.json`: every check, the faces with their hashes, the request log and the number list;
- `menu-home-390.png`: the menu after the fix.

**Regression after the last change:**
- all five pages: 0 console errors;
- single file `elbaz-construction.html`:
  - navigation, back, deep link, mail override and logo home all pass;
  - images: 0 broken (38);
  - console errors: 0;
- the shipped file carries 0 em dashes, 0 `data-rx`, 0 backup slots and 0 Bebas or Geist faces.
