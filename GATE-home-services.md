# GATE: Home 3 · Services

**Built:** ONE deepened version, V2 (owner: "GOOD, the only keeper from Services. Card stacking is good. UI/UX can be better"). There is no second version (Muse ruling 1).
- **Files:** `remodeling/src/sections/services.html`, `css/sections/services.css`, `js/sections/services.js`.
- **Superseded versions** are in git history (ruling 5).

## What changed (UI/UX pass on the owner's keeper)
| before (V2 as reviewed) | now |
|---|---|
| Muddy pink-grid fill on every card | True drawing sheets: paper, a 1.5px ink border and a title block (Project, Contractor with the licence string verbatim) |
| A stacked card washed out (text faded) | The earlier sheet recedes by scale (.92 + i·.015, y −24) and takes a shade overlay; its text never fades (S1322 spec, S1425) |
| Stacked sheets covered each other's identity | Each sheet stops 30px lower than the one before, so its number tab ("A-01 Sheet 1 of 3") stays in view, like a set of drawings |
| "Open the scope" grew the sticky card (reflow) | The scope overlay rises over the photo from the title block. Measured: sheet height 559px both open and closed (S0329 zero shift). Escape closes it and focus stays on the toggle. |
| No way on to the service | Each sheet links to its page (Kitchen remodeling, Bathroom remodeling, Whole-home renovation) |
| Static photos | A dimension line draws across each photo from the middle out as its sheet arrives (S0362) |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity | 9 | The card stacking kept and refined | |
| Visual craft | 8 | Sheet grammar consistent with the hero frame; one entry point per sheet (H3); generous body measure (34ch) | The sheets are clean but quiet; the drawing could carry more site-specific linework |
| Motion and flow | 7 | Scrubbed recede between the next sheet's top 78% and its sticky line; the last sheet releases into Before/After | No carrier hand-off yet from the last sheet into the BA frame |
| Interaction and accessibility | 8 | `aria-expanded` + `aria-controls`; Escape; 44px link targets; on mobile or short screens (≤900px wide or ≤680px tall) the stack becomes a plain list with no sticky; reduced motion has no recede or draw | |
| Facts | 10 | Only published firm facts (durations from the firm's FAQ, Muse ruling 6); licence string verbatim | |

## Defects found and fixed
- **The QA script** clicked a toggle after its sheet had scrolled away (a test bug). It was rewritten to test the overlay at the top of the stack, which confirmed open, Escape and focus.

## Defects remaining (honest)
- **Carrier:** the carrier into Before/After (the last sheet's frame becoming the BA frame) is pending the flow pass.
- **Shade:** the shade overlay darkens the receding sheet's photo and text together; text contrast on a receding sheet drops while it is being covered (intentional depth, transient).

## Skills applied
- **Flow:** S1322 sticky card stack, S0186 scrub with ease none.
- **Visual:** S1425 figure and ground (shade, not fade), S0329 zero-shift overlay, S0362 dimension draw.
- **Accessibility and interaction:** S1018/S0054 (`aria-expanded`, Escape, focus), S1441 targets, S0400 reduced motion.
- **Reference:** Boffi (room chapters as one narrative: each sheet is a chapter of "one contractor").

Render evidence: `qa/finalize/home-services/`.
