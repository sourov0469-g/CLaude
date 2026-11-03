# GATE · The 3-Part Cleanup (Protect Your Nest §3): two versions

**Where it lives:** `#/nest/pn-cleanup`. Switch versions with `?v=pn-cleanup:1|2`. **Default: V1.**

**Governing references:** V1 Lusion flow (one line carries the reader through the rounds). V2 Apple AirPods Pro
(a numeral as the event: "3"). The game itself stays on Home (Bruno is the game only): V1 links to it.
**Never transferred:** AirPods' product and pinning; Lusion's 3D.

**WEB-SKILLS read in full before building** (logged):
- ⟦S1325⟧ scroll-progress-timeline: base + fill measured from the first round's dot centre to the last; horizontal on
  wide screens, a left rail on phones (same reading order); one normalised value as `scaleX`/`scaleY`; a round turns
  on when the head reaches it; reversible; re-measured on fonts, resize, version switch and route change.
- ⟦S1457⟧ zeigarnik-effect: three named rounds with visible progress; each ticks as it is reached; a clear end.
- ⟦S1435⟧ von-restorff-effect (V2): round two, the magnet, is the one card that differs (amber fill, raised, icon); the
  others stay consistent; the difference also holds in greyscale (raised, icon, label).
- ⟦S0659⟧: Owl's own honest limit is kept: "There's no way to ensure every nail is gone".

## What was built
- **V1:** "Three rounds of cleanup, every job." with Owl's limit line; three rounds on one line (a dumpster, the
  magnet, a checklist), each in Owl's words; "Play round two yourself: sweep the lawn on the homepage" links to the
  game.
- **V2:** a giant "3" and "rounds of cleanup. Round two is a magnet."; three cards, round two set apart.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 8.0 |
| Usability | 8.5 | 8.0 |
| Creativity | 8.0 | 7.5 |
| Content | 9.0 | 8.5 |
| **Weighted** | **8.05** | **7.95** |

**Why this default:** V1 shows the rounds as a sequence that completes as you read, and connects to the game.

**Tests** (`nesttest-page.mjs`): rounds tick as the line reaches them (100 → 111) at 1440 and 390; the line runs
backwards on reverse scroll; "Play round two" lands on the game on Home; under reduced motion every round is on.
**Page tests** (`pagetest.mjs nest` 12/12; `nesttest-page.mjs` 10/10; `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean).

## Defects found and fixed
None beyond the page checks.
