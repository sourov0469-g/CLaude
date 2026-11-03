# GATE · Contact cover (Contact and Price My Roof §1): two versions

**Where it lives:** `#/contact/ct-cover`. Switch versions with `?v=ct-cover:1|2`. **Default: V1.**

**Governing references:** V1 Apple AirPods Pro (a numeral as the event: here the phone number) on the lawn ground. V2 Cowboy's one-system plainness, set as three equal ways in. **Never transferred:** AirPods' product and pinning.

**WEB-SKILLS read in full before building** (logged): ⟦S1444⟧ hicks-law (three ways to reach Owl, no more); ⟦S1427⟧ (V2: three cards, one set; Call differs, ⟦S1435⟧); ⟦S1434⟧ (H1, number, CTAs); ⟦S1441⟧ (48px targets); ⟦S0076⟧ (verb-first buttons; links name their destination).

## What was built
- **V1:** H1 "We actually answer the phone." (Owl's line), the number as display type, Owl's "Text us, call us, or ask us your questions in person", hours; Call now, Text us, Email; a four-part index.
- **V2:** H1 "Text, call, or email. Your choice." (Owl's own "Text, call, or email—your choice"); three equal cards, Call filled amber.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 8.0 | 7.5 |
| Usability | 8.5 | 8.5 |
| Creativity | 7.0 | 6.5 |
| Content | 9.0 | 8.5 |
| **Weighted** | **8.05** | **7.70** |

**Why this default:** V1 puts the number itself first and indexes the page.

**Vetoes:** none. Facts only from the lock and Owl's own words; every phone link is the one locked number; nothing is sent or stored by the page.

**Page tests:** `pagetest.mjs contact` 12/12; `contacttest.mjs` 26/26 (price validation on blur and field width, the stepper, the message form, the town search, today in the hours); `msg2.mjs` 2/2 (V2 preview); `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean.

## Defects found and fixed
1. **The header at 1024-1279px wrapped** (labels on two lines, the Call button on two lines) once Contact joined the nav. Labels no longer wrap, the gap tightens, and the button reads "Call" in that range; checked at 1024, 1180 and 1280 (no wrap, no overlap, no overflow).

## Site-wide change made here
**Contact is now in the desktop nav** (it was only in the phone menu and the footer), per ⟦S1450⟧ navigation-patterns: every top-level page is reachable from the main nav.
