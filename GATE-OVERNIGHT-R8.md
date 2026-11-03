# GATE: Overnight Round 8 — Services E and F (Services 6 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?services=e` and `?services=f`, or the switcher.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Services E, "Pick a part of the house"** | Ever, **craft note only**: selecting a part of a building on its elevation | S1362 (line art built from separable strokes that draw in), S1425 (the chosen part is figure; the rest recedes to 42 %), S0054 (tabs with `aria-selected`, roving tabindex, arrow keys; the drawing mirrors the tabs), S0220 (facts from FACTS.md via Svc2.T) |
| **Services F, "The magazine spread"** | Ever, **craft note only**: magazine narrative | S1500 (editorial type: masthead rule, outlined display numerals, drop cap), S1501 (one numeral per feature), S0220 (verbatim review lines, build-checked), S0083 (numerals fill on arrival, staggered 120 ms) |

## Build log, with how each differs from Services A–D

- **Services E** (`o8-services-e.jpg` · `-1440-0/1`, `-768-0`, `-390-0`)
  - **Composition:** a drawn house front (roof with shingle courses, a lap-sided wall, two windows, a door). It draws itself on arrival.
  - **Interaction:** choosing the roof, the wall or the windows (on the drawing, its tag, or the mirrored buttons) lights that part in lime and dims the rest. Beside the drawing, that trade's count, lead, figures and CTA appear.
  - **How it differs:** none of A–D uses a diagram of the house as the chooser.
    - A moves sideways.
    - B is a word switcher.
    - C is pinned counted chapters.
    - D is a photo split with a seam.
- **Services F** (`o8-services-f.jpg` · `-1440-0/1`, `-768-0`, `-390-0`)
  - **Composition:** an editorial spread. A masthead rule, then three features side by side (stacked on phones). Each feature has:
    - a kicker;
    - an outlined numeral (431 / 388 / 241) that fills with green as it arrives;
    - a headline and a drop-cap body;
    - one verbatim customer line: Pat Mehaffy on siding, Lois Richwine on windows, Ken Weigand on roofing;
    - its facts.
  - **Footer:** the CTA and the three counts.
  - **How it differs:** the only static, all-at-once comparative layout; no chooser, no pin, no photo.

## Self-tests

| Check | Result |
|---|---|
| Services E at 1440 / 768 / 390 | 0 errors, 0 overflow, 0 duplicate ids. Clicking the roof opens Roofing; ArrowLeft moves to Windows; the drawing draws in once |
| Services F at 1440 / 768 / 390 | 0 errors, 0 overflow, 0 duplicate ids. All 3 features arrive. Quotes are attributed to the published names and are build-checked verbatim (the build fails otherwise) |

**Defects:** one headline was tightened to the lock: "A roof from a GAF Master Elite contractor" (it was "…crew").

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | Services E | S1501 (the selected part is the emphasis), S0650, S0220 |
| Section | Services F | S1500, S1501, S0220 |
| Element | E drawing | S1362 (strokes draw, roof last), S0442 |
| Element | E tags and buttons | S0054, S0405 |
| Element | F numerals | S0083 (fill bottom-up in 1.4 s) |
| Element | F drop cap and quote rule | S1500 |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1473 H6:** the selection is visible in three places (drawing, tag, button).
- **S1498:** F's three columns balance and stack cleanly on phones.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Services E | 8.2 | 8.6 | 8.0 | 8.4 | **8.30** | PASS |
| Services F | 8.4 | 8.0 | 7.6 | 8.8 | **8.20** | PASS |

**Vetoes: none.**

**Next: Round 9, Services G and H.**
