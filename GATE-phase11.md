# GATE: Phase 11 · Every click state, triggered

**Why this phase exists:** Phase 10's gate named its own gap: error and success messages, and other closed states, were "checked by reading their source, not by triggering them". The brief's AUDIT STANDARD asks for "every click state clean". This phase presses every control and walks every focus stop, then checks every state that appears:
- every control on all five pages, with both version sets, at 1440 and 390 (**20 runs**);
- every form, submitted empty and submitted complete;
- every focus stop, walked with Tab.

Muse judges; this is a self-rating, not a certification. No sub-agents, no background tasks.

**Process note, said plainly:** one batch of runs exceeded the tool's 10-minute limit and the harness moved it into the background. Against the owner's order, I stopped it at once (TaskStop), confirmed no process was left, and reran everything in foreground batches sized to finish in time. Its partial output was discarded.

**The tool, kept in the repo:** `remodeling/src/tools/states.js`. Raw output: `qa/finalize/phase11/states-<page>-<width>-v<1|2>.json` (20 files).

## Governing reference, and exactly what transfers
**Scout Motors** (REFERENCE-STUDY: "One easing family used everywhere").

**What transfers:** **one interaction language everywhere**. Every field shows focus the same way (the label lifts and a clay underline draws on the field's own line), and every control shows a visible state change on keyboard focus. The one field that broke this, the textarea, now matches the inputs.

**Not transferred:** Scout's visual system (its chapters, type and cards).

## Method
| step | what is done | what is checked |
|---|---|---|
| 1 · press every control | every button, tab, role=button, summary, select, radio and checkbox (submit buttons in step 2; the page and version switchers excluded), after one full scroll so every reveal has played | page errors; horizontal overflow; leaked text (codes, `undefined`, `NaN`, `[object`, braces); Escape closes any overlay a press opened |
| 2 · every form, empty | submit with nothing filled | errors shown and fields marked invalid; focus moves to the first problem; **no** mail hand-off |
| 2 · every form, complete | fill every field (valid email and phone, a choice in each group, consent), submit | the hand-off goes to `mailto:Sales@elbazconstruction.com` only; a confirmation shows; it never claims the mail was sent; no leaked text |
| 3 · messages | every error, confirmation and live region holding text | WCAG AA contrast against its painted ground |
| 4 · focus walk | Tab through the page until focus returns to an element already seen | each stop must look different focused than blurred. The test compares outline, shadow, border, background, colour, stroke, fill, opacity and transform on the element, its pseudo-elements, its descendants, its parent and its next sibling, once transitions have finished |

**Sampling, stated:** in a group of more than 10 identical controls in one section, the first 8 and the last 2 are pressed. Four groups were sampled:
- on Home, the 104 town names, the 24 Projects frames and Consult V1's 11 choice inputs;
- on Bathrooms, one list of 13.

That accounts for 424 of 846 possible presses. Pressing every one of the 104 towns ran past the time limit; each group is one control repeated, and 10 of each are pressed in every run.

## Results (20 runs)
| measure | result |
|---|---|
| controls pressed | **422** (plus 424 sampled out, as stated) |
| page errors | **0** |
| horizontal overflow after any press | **0** |
| leaked text after any press or submit | **0** |
| overlays left open after Escape | **0** |
| forms tested | **8**: Home Consult V1 and V2, Contact letter V1 and V2, each at 1440 and 390 |
| empty submit | every form: **6 errors** shown, **6 fields** marked `aria-invalid`, focus moved to the first problem field, **no** mail hand-off |
| complete submit | every form: one hand-off, to `mailto:Sales@elbazconstruction.com`; the confirmation shown: "Your email app should now be open with your request to Sales@elbazconstruction.com. Send it from there …"; **0** claims of sent, received or submitted |
| messages checked for contrast | **120**: 0 below AA |
| focus stops walked | **1018**: 0 without a visible change, after the fix below |

## What failed, and what fixed it
| defect | how it was found | fix |
|---|---|---|
| **Consult V2's textarea: the focus underline was detached.** It drew about 8px below the field's own line (the textarea's inline baseline gap), so it read as a stray second line rather than the field lighting up. The inputs did not have this. | the focus walk flagged the textarea; seen by eye (`consult-textarea-focus.png`) | `.c-f textarea { display: block; }`: the clay underline now lands on the field line, as on the inputs. Rerun: 0 issues. |

## Findings that were my tool, not the site (fixed in the tool, recorded so they are not mistaken for passes by fiat)
- **Unrevealed controls were skipped:** they sit at `visibility: hidden` until scrolled into view, so Contact's "Turn the card over" and "Pause the rows" were missed at first. The tool now scrolls the whole page once before pressing.
- **Contrast "1.0" readings** came from hidden elements inside live regions, such as the phone-only "See the route on the map" button at 1440. The tool now skips elements with no box or near-zero opacity.
- **Focus rings drawn on a descendant or a pseudo-element** (the Projects frames, the tally gates) were missed by the first detector. It now compares the full styled neighbourhood, focused against blurred. The Projects card ring was then checked by eye (`work-card-focus.png`: a clay ring around the focused frame).
- **Animated indicators** (the Consult underline drawing in over 320ms) read as "no change" when compared instantly. The tool now waits 380ms after blurring.

## Mechanisms and their WEB-SKILLS tags
| mechanism | tags | how it is met | files |
|---|---|---|---|
| Errors on an empty submit | **S1442 / S0664 / S1439** (an error sits below its field, says what to do, `aria-invalid`), WCAG **3.3.1** | 6 errors and 6 invalid fields; focus moves to the first; input is never cleared | `consult.js`, `contact-form.js` (unchanged, now proven) |
| Honest end state | **S0502** ("no misleading states, e.g. a Sent ✓ that didn't send"), the brief's mailto lock | The confirmation says the email app is open and asks the visitor to send it; the phone stays as the recovery path | (unchanged, now proven) |
| Visible focus everywhere | **S0657** (WCAG 2.2 AA; focus indicator 3:1), WCAG **2.4.7**, **S1018** | 1018 stops, each with a visible change; the textarea joined the inputs' focus language | `consult.css` |
| Status messages | WCAG **4.1.3**, **S0054** | Confirmations and answers sit in live regions; contrast measured on all 120 | (unchanged) |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| **Design** | **7** | Every field shows focus in the same way, now including the textarea (`consult-textarea-focus.png`). Projects frames take a clay ring. | Focus indicators are proven present, not judged for strength one by one; some are a colour or underline change rather than a full ring. |
| **Usability** | **9** | 422 presses and 8 form paths, each with its errors and success, plus 1018 focus stops: 0 page errors, 0 overflow, 0 leaked text, 0 overlays stuck, 0 invisible focus. Empty submits never mail, and focus goes to the first problem. | Presses are synthetic (Playwright), not a person with a screen reader; screen-reader announcements are not verified. The four long groups (104 towns, 24 Projects frames, 11 choice inputs, a Bathrooms list of 13) are sampled at 10 per run. |
| **Creativity** | **6** | An audit phase. The one design act is joining the textarea to the fields' shared focus language. | It adds no new moment, by design. |
| **Content** | **9** | Every confirmation tells the truth (the email app is open, send it from there); 0 claims of sent; the only address is Sales@. Error texts measured for contrast. | Error wording was checked for presence and contrast, not rewritten. |

## Evidence
`qa/finalize/phase11/`:
- `states-*.json`: 20 runs; every press, form record, message contrast and focus result;
- `consult-textarea-focus.png`: the textarea before and after, blurred and focused;
- `work-card-focus.png`: a Projects card's focus ring.

**Regression after the last change:**
- all five pages: 0 console errors;
- single file `elbaz-construction.html` (3.65 MB):
  - navigation, back, deep link, mail override and logo home all pass;
  - images: 0 broken (38);
  - console errors: 0;
- 0 em dashes.
