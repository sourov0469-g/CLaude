# GATE · The two families (Our families §3): two versions

**Where it lives:** `#/families/of-crew`. Switch versions with `?v=of-crew:1|2`. **Default: V1.**

**Governing reference:** Cowboy: family- and crew-fronted, warmth through real photos, restrained colour. **Never transferred:** Cowboy's riders and bikes.

**WEB-SKILLS read in full before building** (logged): ⟦S1427⟧ law-of-similarity (the two family cards are one set: same frame, crop, type and order, so they read as equals); ⟦S1434⟧ (photo, name, role, words); ⟦S0659⟧ (no agency, no "15+ years", no "as the founders" for Anya: the lock names the founders).

## What was built
- **V1:** two equal cards: the Berglands (Noah Bergland, co-founder; Owl's sentence on Noah's and Anya's work) and the Browns (Tim Brown, co-founder; Owl's "feel confident in the team" line).
- **V2:** alternating rows: Noah on the job (Owl's own photo) with Owl's words, and the Browns.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 8.0 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 6.5 | 7.0 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.80** | **7.70** |

**Why this default:** V1 presents the two families as equals, which is the point of the page.

**Vetoes:** none. Owl's own words and photos only; the facts lock wins where Owl's pages differ (founders are Tim Brown and Noah Bergland); no overflow; no errors.

**Page tests:** `pagetest.mjs families` 12/12; `famtest-page.mjs` 7/7 (one photo set, story spine, alt text, facts-lock checks, reduced motion); `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean.

## Defects found and fixed
1. **The two photos had different heights** (the image's height attribute overrode the 4:3 crop), breaking the set. Added `height:auto`; the test now checks both photos are the same height.
