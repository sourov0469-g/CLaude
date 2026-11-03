# GATE · Final build · Round 4 · Reviews + Service area (two versions each)

**File:** `owl/final/owl-roofing.html` (4.07 MB, everything inside). Judge with `?review`, or `?reviews=1|2&area=1|2`
(`?all=2` for every V2). Screenshots: `gates/r4/` (full page, desktop 1440 and phone 390).

## Facts rule for this round
Reviews appear **only** as "5.0 · 90+ reviews". The reference sheets show quote-like lines ("They kept every promise",
"Fair price and a gorgeous roof") — every one is removed, because they would be invented quotes. Their places are taken by
locked facts: the Wise Check, BBB Accredited A−, GAF Systems Plus Certified, the 10-year workmanship warranty. Service area
uses the 29 towns from Owl's confirmed list; "Twin Cities" (sheet wording, not locked) is replaced by "29 towns".

## Section 7 · REVIEWS
### V1 · "Checked, rated, trusted" dial (primary: reviews-best1, reviews-12)
- A brass dial (SVG bezel, ticks, bolts). When it comes into view the stars pop in one by one and the score **counts up to
  5.0** above "90+ reviews". Three tabs (Checked, Rated, Trusted) **turn the bezel to a new mark and flip the dial face**:
  Wise Check / 5.0 · 90+ reviews / BBB A− and GAF Systems Plus. Arrow keys move between tabs.
### V2 · "Hung out to admire" clothesline (alternate: reviews-best3, reviews-03)
- Five paper cards pegged to a sagging line: 5.0 star rating, 90+ reviews, A− BBB Accredited, GAF Systems Plus Certified,
  10-year workmanship warranty. **Sweep the pointer along the line and the cards swing** (a spring per card; the rope dips
  as they move); press a card to flick it. On phones the cards sit in a still two-column grid.

## Section 8 · SERVICE AREA (abstract, never a fake street map)
### V1 · "From our nest to yours" Route Ribbon (primary: area-best1, area-06)
- An amber road from a Shoreview home pin with **a stop for each of the 29 towns** (abstract order, near to far; labelled
  "Not a map" for screen readers). **Type your town** (suggestions from the list) **or press a town chip**: a small owl
  rides the road to that stop, the road behind it darkens, and the line confirms "Yes, we serve …". Shoreview answers with
  home base, 1000 County Rd E #230. Partial typing lists matches; an unknown town gets "Call (651) 977-6027 and ask".
### V2 · "Based in Shoreview. Roofing 29 towns." Radius Rings (alternate: area-best3 with area-best2's facts row)
- Rings around an owl pin: towns grouped near, middle and farther out, each at its rough compass direction from Shoreview
  ("Not to scale" is stated). A slow amber sweep circles the rings. Home base · Coverage · Hours (Mon–Sat 8:00–18:00) facts.
  **Find your town** and its dot lights, its ring band warms and a ping goes out from it.

## Verification
- **Interaction test** (`tools/interact4.cjs`): the dial counts to 5.0; the Trusted tab shows A− / BBB Accredited / GAF
  Systems Plus with the bezel at 60°; arrows move tabs; typing Stillwater draws the road to it and confirms; "Ma" lists
  Maplewood and Maple Grove; the Shoreview chip shows home base; the rings confirm Eagan and warm the outer band. Card swing
  verified separately (angles from ±2.8° at rest to −18.6…10.4° after a pointer sweep). **No page errors.**
- **Accessibility** (axe, WCAG 2.1 A/AA): **0 violations** on V1 and V2. Town search inputs are labelled; results are announced.
- **Light only:** cream throughout. **Gate screenshot fix:** reveal-on-scroll elements are forced visible in screenshots
  (the last section sat in the bottom 10% of a full-page capture and never revealed; real scrolling was unaffected).

## Copy budgets
Reviews V1: headline 3, support 22. Reviews V2: headline 4, support 22. Area V1: headline 5, support up to 14 (plus the town
chips, which are the list of 29 places, not prose). Area V2: headline 6, support 26. Within ≤8 + ≤35.

## Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Section · version | D | U | C | Ct | Weighted | For / against |
|---|---|---|---|---|---|---|
| Reviews V1 Dial | 8.0 | 7.8 | 7.6 | 8.4 | **7.94** | For: the brand's dial language, an honest count-up, every word from the lock. Against: a second brass dial on the page (the Wise Check owns the first); kept distinct by its bezel turn and flip face. |
| Reviews V2 Clothesline | 7.6 | 7.6 | 8.2 | 8.2 | **7.80** | For: playful physics with only facts on the cards. Against: the swing is desktop-only by design. |
| Area V1 Route Ribbon | 8.0 | 8.2 | 8.0 | 8.2 | **8.08** | For: a real "do we serve my town?" answer in one step, with a charming ride. Against: stop labels show only on hover or selection to keep the road clean. |
| Area V2 Radius Rings | 7.6 | 7.8 | 7.4 | 8.0 | **7.66** | For: honest rough geography, the hours fact, a calm radar sweep. Against: dense inner ring on phones. |

All four pass; zero vetoes (no invented reviews or quotes, cream page, logo and palette locked, single file, no sub-agents,
no background tasks).

**WEB-SKILLS applied:** ⟦S1453⟧ search-ux (type-ahead town finder, match counts, a clear no-match path) · ⟦S1440⟧
feedback-patterns (ride, ping, flip face) · ⟦S1436⟧ animation-principles (spring swing, eased ride) · ⟦S1424⟧
law-of-continuity (one road, one line of cards) · ⟦S1426⟧ law-of-proximity (towns grouped by ring) · ⟦S1449⟧ millers-law
(three tabs, five cards) · ⟦S0070⟧ better-accessibility (tablist with arrows, labelled inputs, live results, axe 0) ·
⟦S0659⟧ anti-ai-slop (every sheet quote removed; reviews only as locked) · ⟦S1496⟧ critique-brand-consistency.

## Recommendation
**Reviews V1** and **Area V1** (both primaries). Muse decides; both versions stay in the file.

## Correction to GATE-R3
The siding photo in Services is from Owl's site but sits in its "unproven" set, so it is illustrative only and never
presented as an Owl job. GATE-R3 now says so.

## Next
Round 5: Booking / Footer (booking-06 complete page; the invented "within one business day" line removed) + the
"We Give a Hoot" family section that completes the homepage at 10 sections.
