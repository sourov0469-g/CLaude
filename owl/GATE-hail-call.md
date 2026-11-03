# GATE · Storm page call band and footer (Storm damage §6): two versions

**Where it lives:** `#/storm/hail-call`. Switch versions with `?v=hail-call:1|2`. **Default: V1.**

**Governing reference:** Lusion, source-only (the journey ends at one resolved point); B3 Night yard.

**What transfers:** the page ends at the call, on the page's one deep block, with the shared footer (`src/footer.part`).

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG): ⟦S1452⟧ peak-end (end on the call, never a
form); ⟦S0449⟧ (the final CTA matches the top: Call and Text a photo); ⟦S1441⟧ fitts-law (48px CTAs); ⟦S0076⟧ (the
text link names what it does: "text a photo of the damage").

## What was built
- **V1:** "Storm damage? We actually answer the phone." (Owl's line), "Call, or text a photo of the damage. Insurance
  assistance available, and the estimate is free.", Call + Text a photo.
- **V2:** label "After the hail", the number as display type, the hours, and a text link that asks for the Wise Check.
- The Night yard is initialised by `call.js` for every `.call-bg`, so this section adds no second initialiser.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 7.0 | 6.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.70** | **7.60** |

**Why this default:** V1 repeats the cover's two actions, so the page closes where it opened.

## Tests that apply to the whole Storm damage page
`stormtest-page.mjs` 13/13:
- nav → the page, others hidden; `aria-current`; focus to main; one visible h1;
- the chapter link scrolls to the Wise Check; deep link `#/storm/hail-claim` lands on it;
- surfaces alternate paper/cream and only the last block is deep;
- 23 sections in the version panel, each with exactly 2 versions; no duplicate ids;
- every tel/sms link uses the one locked number; no JS errors.

`stormrm.mjs` 6/6 under reduced motion (no pin; final drawings; full claim line; real numerals; no errors).
`pageshot.mjs` on defaults and all-V2: no overflow at 1440 or 390, one h1, no errors. `routetest.mjs` 10/10 (its
section count updated from 17 to 23). Token lint clean on every file of the page.

## Defects found and fixed
1. **V2 promised a next step** ("we'll start with the Wise Check"). Reworded to "ask for the Wise Check".
2. **The page test's phone-link rule was too strict:** the Price tool's text link carries a message body after the
   same number. The rule now allows a query after the locked number.

## Remaining (honest)
- **No FAQ section on this page.** ⟦S0618⟧ faq-page needs real questions and answers; Owl's FAQ page text is not in
  hand, and inventing answers would break the facts lock. The page has 6 sections, the minimum.
- **Real-device check:** Chromium emulation only.
