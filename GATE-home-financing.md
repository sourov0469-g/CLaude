# GATE: Home 6 · Financing

**Built:** TWO versions, both fresh concepts from `PHASE1-PLAN.md`. A choice exists here (the owner did not pick a winner), so this follows Muse ruling 1. None of the 8 inherited slots or 4 backups is reused; they are in git history at `ce59679` (ruling 5).
- **Files:** `remodeling/src/sections/financing.html`, `css/sections/financing.css`, `js/sections/financing.js`.

## V1 · The route finder
- **The plan:** a drawn site plan with a fork in the road. Your house sits at the bottom, with the consumer-credit lot on the left and the property-assessed lot on the right. Each partner has a signpost on a spur.
- **The choice:** "What are you building?" is a native radio group (arrow keys work; measured). Options:
  - Inside the home: Kitchen, Bathroom, Flooring.
  - Outside and energy: Roof, windows or doors; HVAC or storm protection.
  - Not sure yet, always present.
- **The road:**
  - The clay road draws from the house through the fork to each partner that usually fits (drawSVG, `power2.inOut`, 0.9s).
  - A road that no longer fits retracts back toward the house (`power4.in`, 0.3s).
  - Each signpost lights as the road reaches it.
  - The partner's published figure lands on its card as an event (`power4.out`); cards that do not fit recede to 45%.
- **The reason:** written underneath (`aria-live`) in the firm's own framing, ending "Usually fits: …".
  - Kitchen carries the firm's line: "PACE covers specific improvements; a kitchen remodel is generally not one of them."
  - Roof and HVAC cite Ygrene's Florida categories and Service Finance's typical Elbaz projects.
  - "Not sure yet" gives "Four financing partners, not one. Two are consumer credit and two are property-assessed…"
- **The routing** is FACTS.md "Financing", line 118:
  - interior finish work → Synchrony and Service Finance;
  - outside and energy → Service Finance, Ygrene and RenewPACE (their published categories and typical projects).
- **Cards:** each figure is verbatim and attributed ("As published by …", NMLS where published). Each card also carries a screen-reader line, "Usually fits this project." or "Not the usual route for this project."

## V2 · Two kinds of money
- **The ledger:** an open ledger spread in the firm's own framing ("Two are consumer credit and two are property-assessed").
  - Left page: Synchrony | Service Finance. Right page: Ygrene | RenewPACE.
  - Margin rows: What it is · How you repay · Published figure · Also published · Usually fits.
- **The scroll:**
  - It writes the ledger line by line on both pages at once: the rule draws, then the margin label, then the words.
  - Each published figure lands like a stamp (`power4.in`). Scrubbed (`.6`), reversible.
- **Real tables:** captions, `th scope="col"` and `th scope="row"`. The rows are levelled across the spine, so line i on the left sits on line i on the right (measured after cycle 2), while the pages sit side by side.
- **The column under the pointer** takes a clay wash, the one being read.
- **Footnotes:** NMLS numbers and the firm's PACE line as a dashed margin note.
- **The sum line:** "Four financing partners, not one.", the CTA and the "not a lender" line.

## Facts check
- Every number is the firm's own published financing wording, which Muse ruling 6 allows: 6–132, 1 card, 30 days, 0 penalty, 20 years, $250K, 20%, and NMLS 140908 / 1788120.
- No rate, no calculator, no "$0 down" for kitchens, no invented figure.
- "Elbaz Construction is not a lender…" is beside the CTA in both versions. Zero em dashes.

## Self-rating (critical; Muse judges)
| category | V1 /10 | V2 /10 | evidence | why not higher |
|---|---|---|---|---|
| Concept and fidelity | 8 | 7 | V1 answers "which one is for me" with a drawn cause and effect; V2 is the firm's own two-kinds framing | V2 is a reading piece; its interaction is limited to the column wash |
| Interaction | 8 | 6 | V1: native radios with arrow keys, the companion's choice pose, a reason in words | V2 has no choice to make |
| Motion and flow | 8 | 8 | V1: draw out and retract back (mirrored eases). V2: scroll-written ledger, stamps as events | No carrier line in from Process yet (flow seams pass) |
| Accessibility | 9 | 9 | Fieldset/legend, `aria-live` reason, sr-only fit line on each card; V2 real tables with captions; no overflow at 390 | |
| Visual craft | 8 | 8 | One drawing language (plan, lots, signposts; ledger rule, spine, margin rule) | The V1 map's board labels are small at 390 (the map is decorative; the cards carry the content) |
| Facts | 10 | 10 | Verbatim and attributed | |

## Defects found and fixed across cycles
1. **Cycle 1, V1:** the reason grew from 2 to 5 lines on choice and pushed the CTA and map (layout shift). Fixed with a reserved height of 7.5em and a top-aligned grid. Re-measured: no movement.
2. **Cycle 1, V1:** the card figures sat at different heights (Ygrene's description wraps). Fixed with subgrid rows across the four cards.
3. **Cycle 1, V2:** the page captions collapsed into the gutter column, because `display: grid` on a `<caption>` breaks its table role. Restored `table-caption`, with block spans inside.
4. **Cycle 1, V2:** the clay margin rule ran through the footnotes. Moved it onto the row-header cells (a border), so it stops with the ledger.
5. **Cycle 2, V2:** lines on the two pages did not sit level, because the quote row is taller on the left. Rows are now levelled by measuring both pages (ResizeObserver), only while they are side by side.
6. **Cycle 2, V1 on phones:** the map sat below the CTA, so the road drew off-screen after a tap. The side column now flattens (`display: contents`), giving the order question → road → reason → action.
7. **Cycle 2, V2:** the last line wrote only when the book's bottom reached 80% of the viewport. The scrub now ends as the bottom enters (96%).
8. **Test harness:** the version switcher lives in the nav bar, so it is driven there; both versions were exercised with zero console errors.

## Defects remaining (honest)
- **No ink-line carrier** into or out of this section yet; scheduled for the flow seams pass.
- ~~**The V1 map at 390:** board labels render at about 8px.~~ **Improved in Phase 6:** on phones the signposts become two-line boards and the labels render at 10.1px (measured). Still small; the map stays `aria-hidden`, and the cards and reason carry the content.
- ~~**V2 at 390:** the three-column table is tight; the quotes wrap to 6–7 lines.~~ **Improved in Phase 6:** on phones the margin label sits above its two cells, giving the partner columns the full width. Measured rendered lines for the four quotes: 4 / 5 / 6 / 2 (were 6 / 7 / 7 / 2). Table semantics kept.

## Skills applied
- **Motion:** S0362 (the line leads the eye; strokes before fills), S0576 (mirrored in/out eases), S1326 (scrubbed, reversible).
- **Interaction and copy:** S1018 and S0657 (native controls, live region), S1425 (words on paper).
- **Visual:** S1421 (one drawing language).
- **Notes:** notes-G-H (honest copy, attribution).

Render evidence: `qa/finalize/home-financing/`. Zero console errors at 1440, 390, and 390 with reduced motion.
