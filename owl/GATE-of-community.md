# GATE · Giving back (Our families §5): two versions

**Where it lives:** `#/families/of-community`. Switch versions with `?v=of-community:1|2`. **Default: V1.**

**Governing references:** V1 Scout's film-roll photo evidence (Owl's own community photos). V2 Longbow numerals (Owl's own pledge figures).

**WEB-SKILLS read in full before building** (logged): ⟦S0659⟧ (the pledge figures are Owl's own published pledge, quoted and labelled as Owl's; captions say only what Owl's labels say, per the asset README); ⟦S1358⟧ (V1: photos at a real size, not thumbnails); ⟦S1434⟧.

## What was built
- **V1:** "We give a hoot." (Owl's own heading), Owl's pledge in Owl's words ("$100 to Quincy House" for every roofing job in 2026), three of Owl's photos captioned "Noah Bergland, co-founder" and "Community involvement", and a note naming Owl's Habitat for Humanity partnership.
- **V2:** "Every roof helps build a home." with Owl's Quincy House lines, and two numerals: $100 per roofing job in 2026, $20K pledge goal (both Owl's, labelled as Owl's).

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 8.0 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 7.0 | 7.0 |
| Content | 9.0 | 8.5 |
| **Weighted** | **7.90** | **7.65** |

**Why this default:** V1 shows the people as well as the pledge.

**Vetoes:** none. Owl's own words and photos only; the facts lock wins where Owl's pages differ (founders are Tim Brown and Noah Bergland); no overflow; no errors.

**Page tests:** `pagetest.mjs families` 12/12; `famtest-page.mjs` 7/7 (one photo set, story spine, alt text, facts-lock checks, reduced motion); `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean.

## Defects found and fixed
None in this section.

## Honest note
The $100-per-job pledge and the $20K goal are not in the facts lock. They are Owl's own published words, quoted verbatim from Owl's community page and attributed. If the owner prefers only lock facts here, V1's quote and V2's numerals are the two places to remove.
