# GATE-FINAL-AREAS · section 8, "Do you come to me?" (ONE final version)

**Source:** NEW Towns V3 "From above", rebuilt in `src/final/sections/08-areas.html` (id `areas`, the header's Areas link). **Evidence:** `gates/final/areas/` (`open.png`, `hover.png`, `cleared.png`, `phone-chosen.png`, `s-1440.png`, `s-390.png`, `checks-areas.json`).

## 1. Think first
The plan: *a real image and just the search bar; less clutter; the hover and click options must actually work.* No maps.
Problems in the reset version: it showed the town list twice (a native `<datalist>` whose hover/click options are unstyled and differ by browser, plus a row of all 29 names under the photo); the datalist did not behave the same on phones; the row was the clutter.
Ideas: (a) keep the datalist and style the row, (b) a custom listbox, (c) chips. **Chosen (b):** a real ARIA combobox, and the row of 29 names is gone.
- **Click or focus** opens all 29 towns, nearest first, each with its distance ("about 4 mi"; Shoreview "home base").
- **Typing** narrows the list (a town's name, or any word of it, "st paul" is understood as Saint Paul) and answers as you type.
- **Hover** (mouse) moves a highlight; **arrow keys** move it; **click, tap or Enter** chooses; **Escape** closes; a **clear** button empties the bar.
- The answer: "Yes, we come to Woodbury. About 9 miles from our Shoreview base, as the owl flies." Shoreview gives the real address. An unlisted town: "Duluth isn't on our list of 29 towns. Call (651) 977-6027 and ask; we'll tell you straight."
- Typed text is never injected as markup (`textContent` everywhere).
- The photo is an aerial of an autumn suburb (stock, tagged "Illustrative photo"), sharp at 2400 px.
Audit: the first build hid the list under a clipped card because this section's card shared the class name `.ask` with section 4; the card is now `.tq`. On phones the card overlaps the photo on cream (the dark band behind it is gone) and the phone's empty tail is cut to 70 px.
The chosen town is shared (`OWL.town`, `owl:town`) for the booking section.

## 2. Five questions (homeowner)
1. **What is it for?** Does Owl come to my town?
2. **Under 3 s?** Yes: "Do you come to me?" and a bar.
3. **Fun?** The suburb from above, and a list that answers as you point.
4. **Every element earns its place?** Photo, question, bar, answer. Yes; nothing else.
5. **Stressed?** One question, one answer.

**Skill ledger:** ⟦S1453⟧ one question, one answer · ⟦S1433⟧ one line on one photograph · ⟦S1306⟧ the photograph does the mood · ⟦S1107⟧ combobox with real roles and keys · ⟦S0400⟧.

## 3. Checks (`node tools/final-test.cjs areas`): **27/27**
axe 0 · facts lock · no maps · distinct media (the aerial is used only here) · a photograph and one bar, no 29-name row, no map · clicking opens all 29, nearest first · hover highlights (and sets `aria-activedescendant`) · clicking an option fills the bar, answers with the distance, closes · typing "wood" narrows to Woodbury · arrows and Enter choose · Escape closes · "st paul" works · an unlisted town gets the honest answer with the one phone number · no markup injection · Shoreview gives the address · clear button · **phone: tapping the bar lists 29 and tapping a town chooses it** · sharp at 1440 and 390 DPR 2 · layout and 44 px controls · reduced motion · no errors.

## 4. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.4 | 8.8 | 7.8 | 8.7 | **8.43** (3.36 + 2.64 + 1.56 + 0.87) |

## 5. Remaining
- **D1:** distances use approximate public town-centre coordinates and are straight-line ("about", "as the owl flies"); they answer a town, not a street address.
- **D2:** the photo is stock; a real Owl aerial of a Shoreview-area street would replace it.

## 6. Vetoes: **zero**
The site's own 29 towns; one phone number; stock tagged; no maps anywhere; logo untouched.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
