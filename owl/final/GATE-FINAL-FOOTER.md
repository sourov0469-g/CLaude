# GATE-FINAL-FOOTER · section 11, the footer (ONE final version, animated and interactive)

**Source:** the OLD footer, rebuilt in `src/final/sections/11-footer.html`. **Evidence:** `gates/final/footer/` (`footer.png`, `roof-hover.png`, `totop.png`, `s-1440.png`, `s-390.png`, `checks-footer.json`).

## 1. Think first
The old footer was static: 29 small roofs (one per town) that only changed colour, four columns, the proofs, a "Back to top" text link. Plan: *improve UI/UX with animation and interactivity (back-to-top etc.)*.
Ideas weighed: (a) a stats strip or newsletter: rejected (no numbers section, nothing to send); (b) a big wordmark: rejected (the logo is never redrawn); (c) make the footer's own motifs work. **Chosen (c):**
1. **A roofline you can touch.** The 29 roofs are 29 real buttons (nearest town first, Shoreview home in amber). Point at one and it lifts while a small owl hops onto it and names the town and its distance ("Lino Lakes · about 6 mi"); arrow keys, Home and End do the same (one tab stop); choosing one (click, tap or Enter) **puts that town in the Areas search** and scrolls to its answer. Below 1360 px it becomes a swipeable strip with 44 px roofs.
2. **Back to top that shows progress:** a round button with a ring that fills as you read down the page; it appears after the first screen and steps aside when the footer's own "Back to top" link is on screen.
3. **Honest hours:** "Open now: it is 9:42 am in Shoreview, and we close at 6 pm." or "Closed right now: it is 10:00 pm in Shoreview. We open tomorrow at 8 am." (Shoreview's clock, so a visitor in another time zone is not confused; Sunday and Saturday evening say "Monday at 8 am".)
4. **Copy in one tap** for the email and the address ("Copied", or honestly "Select it to copy" if the browser refuses).
5. The columns and the five proofs **arrive** when the footer is reached.
Links were updated to the final page's sections: Services, Wise Check, Ask the Owl, About, Reviews, Areas, Book (no link to a Protect Your Nest section, which the plan removed).
Audit: on phones the two-column grid squeezed the address, so it is one column under 560 px; the floating button covered the footer's own link, so it hides there.

## 2. Five questions (homeowner)
1. **What is it for?** Where are they, can I reach them now, and where do they work?
2. **Under 3 s?** Yes: address, phone, hours with "open now", proofs.
3. **Fun?** The roofline owl; the ring that fills.
4. **Every element earns its place?** Roofline, brand, links, address and hours, phone and email, proofs, back to top. Yes.
5. **Stressed?** It tells me straight whether they are open right now.

**Skill ledger:** ⟦S1107⟧ roving-tabindex group, real buttons · ⟦S0544⟧ causal motion · ⟦S0489⟧ the owl's hop and blink · ⟦S0407⟧ roofline · ⟦S1273⟧ the hours written out.

## 3. Checks (`node tools/final-test.cjs footer`): **31/31**
axe 0 · facts lock (one phone number, info@owlroofing.com, exact proofs) · no maps · 29 roofs, first is home · links match the page's sections · proofs, address, hours exact · arrival · hovering a roof lifts it and the owl names the town · arrows move (one tab stop) · End goes to the farthest town · **choosing a roof fills the Areas search and answers** · hours at Wed 10 am / Wed 10 pm / Sunday / Saturday evening in Shoreview (the clock is faked in the test) · copy says "Copied" · back-to-top appears with a ring · takes you to the top · steps aside at the footer link · the footer link works · layout and 44 px controls at 1440/768/390 · reduced motion · no errors.

## 4. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.4 | 8.7 | 8.7 | 8.7 | **8.56** (3.36 + 2.61 + 1.74 + 0.87) |

## 5. Remaining
- **D1:** the hours use the browser's clock and `Intl` time-zone support (America/Chicago); holidays are not known.
- **D2:** the town roofs rely on the Areas section existing on the page (it is part of the homepage).

## 6. Vetoes: **zero**
GAF Systems Plus, BBB A−, licence #BC809662, 10-year workmanship warranty, 5.0 · 90+ reviews, one phone number, exact address and hours; logo untouched; no maps.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
