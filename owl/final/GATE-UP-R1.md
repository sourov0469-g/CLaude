# GATE · Upgrade Round 1 · Hero versions 2–6 (owner's upgrade order, 2026-11-03) · STOP for Muse

**What was built:** five new heroes, each a different design and layout, all inside `owl/final/owl-roofing.html`.
Hero V1 "Under Our Wing" is untouched and is still what a visitor gets with no query string. Every version can be
judged with `?hero=N` (or `?review` for the switcher). The old V2 "Peel" was superseded and is kept in the file as an
inert hidden backup (`<template class="bak" data-sec="hero" data-b="1">`, source `src/sections/hero-b1.html`), not deleted.
Inner pages stay frozen. Round 2 is not started.

| Version | Name | One line |
|---|---|---|
| V1 | Under Our Wing (kept) | Unchanged, plus the tablet trust row is balanced. |
| **V2** | **Living Owl** | The hero artwork in slight 3D, as ordered in §1E. The owl painting sits on a WebGL mesh: the head turns on the neck and slides toward the cursor, the pupils glide, the eye blinks, the wings sway with follow-through, and the body breathes from feet planted on the ridge. Sky, owl and foreground planes move by different amounts. |
| **V3** | **Every Layer, Done Right** | A 30 × 14 ft roof drawn in its true build order. The cursor's wake washes the shingles away to the membranes, and lingering digs down to the deck. A tag names the layer under the cursor. |
| **V4** | **Film & Family** | Owl's own crew film framed as the hero, with a founding stamp, a film-roll rail of Owl's own photos, and a warm light-leak where the cursor crosses the film. |
| **V5** | **The Numbers** | A pinned stage where 10 / 50 / 29 / 5.0 each become a full event. Each numeral is laid like a roof: starter strip first, then course by course from the eave up. The cursor lifts tabs to show the seal strip. |
| **V6** | **Start Here** | Configurator first: four keycaps answer "What does your roof need?" and the split cover turns to that chapter. Beside it is a living contour field that the cursor pushes aside. |

## Scorecard (D40 / U30 / C20 / Ct10; pass = weighted ≥ 7.0, no category under 6.0, zero vetoes)
| Version | Design | Usability | Creativity | Content | Weighted | Vetoes | Result |
|---|---|---|---|---|---|---|---|
| V1 (kept) | 8.2 | 7.8 | 8.4 | 8.0 | 8.10 | 0 | Pass (unchanged) |
| V2 Living Owl | 8.2 | 7.6 | 8.6 | 8.0 | **8.08** | 0 | Pass |
| V3 Every Layer | 7.6 | 7.4 | 8.8 | 8.6 | **7.88** | 0 | Pass |
| V4 Film & Family | 8.4 | 8.0 | 7.6 | 8.2 | **8.10** | 0 | Pass |
| V5 The Numbers | 7.8 | 7.2 | 8.2 | 8.4 | **7.76** | 0 | Pass |
| V6 Start Here | 7.8 | 8.2 | 7.8 | 8.0 | **7.94** | 0 | Pass |

Why these aren't higher: V3's shingles are a procedural drawing, not photography, and its roof plane is a flat
parallelogram. V5 adds three screen-heights of scroll before the Video section. V6 and V4 upscale Owl's 560 px photos
(see Open 3).

## Evidence (`owl/final/gates/up-r1/`, captured at 2× device scale with no switcher or QA chrome)
- `hero-v{2..6}-1440.jpg`, `-768.jpg`, `-390.jpg`: the first viewport exactly as a visitor sees it.
- `hero-v{2,3,4,6}-section.jpg`: the hero section alone, sticky header hidden.
- `hero-v5-section-1..4.jpg`: the pinned stage at each of its four number events.
- `hero-v1-*.jpg`: V1, re-shot to show the balanced tablet trust row.
- `checks.json`: 85 Round 1 checks. `home-verify-checks.json`: the 49 homepage checks, re-run on the default view.
- The owl companion with a speech tag appears where the capture parked the cursor. It is part of the live site, not QA chrome.
- Reference study: `owl/redo/evidence/hero-study/REF-STUDY-R1.md`, with per-site frames and `code.json`, plus `ALL-heroes.jpg`.

## Interaction tests (`tools/up-r1-test.cjs`): **85/85 pass**
Run on every version, V1–V6:
- only that version is visible;
- one h1, whose accessible name survives the word split;
- primary CTA goes to `#book`;
- every control has a name and is at least 44 px;
- axe WCAG 2.1 A/AA on the hero: **0 violations**;
- no console or page errors;
- no sideways scroll at 1440, 768 and 390;
- reduced motion loads clean.

Per version:
- **V1:** Storm test toggles.
- **V2:**
  - the WebGL mesh is live;
  - the head and eye frames differ when the cursor goes left versus right;
  - "Wings over the house" toggles, and the wings fold, verified by frame difference;
  - the blink was sampled at the eye;
  - the house stays rigid under the ripple (fixed in this round).
  - Reduced motion shows the still painting, no WebGL.
- **V3:**
  - the "Roof deck" key explains the layer;
  - hovering the roof names the layer under the cursor;
  - the seven layer keys read in build order (deck > drip edge > ice & water > underlayment > starter > shingles > ridge vent and cap).
- **V4:**
  - the crew film has a source and plays;
  - the film roll is 7 photos plus 7 hidden copies (a seamless loop);
  - "Watch the Full Film" opens YouTube `ehKLv5DF2TQ`, and Escape closes it.
- **V5:**
  - scrolling lays the four numbers in order with exactly the locked wording;
  - a step key jumps to its number;
  - the stage pins.
  - Phones and reduced motion get the numbers as cards, no pin.
- **V6:**
  - each key turns the cover to its chapter;
  - exactly one key is pressed at a time;
  - keys work from the keyboard.

Default view (no query) shows hero V1 only. Homepage verification re-run: **49/49 pass**.

## SKILL LEDGER (§1G)
### Site level: the Round 1 pack, 50 skills, each read in full by tag in this session
Notes, with the rules taken from each skill: `owl/skills/UP-R1-HERO-PACK.md`.
- **Critique:** ⟦S1473⟧ ⟦S1479⟧ ⟦S1482⟧ ⟦S1496⟧ ⟦S1497⟧ ⟦S1498⟧ ⟦S1499⟧ ⟦S1500⟧ ⟦S1501⟧
- **Direction:** ⟦S0001⟧ ⟦S0214⟧ ⟦S0329⟧ ⟦S1320⟧ ⟦S0159⟧ ⟦S1425⟧ ⟦S0534⟧
- **Motion:** ⟦S0195⟧ ⟦S0340⟧ ⟦S0658⟧ ⟦S0489⟧ ⟦S0447⟧ ⟦S1329⟧ ⟦S0451⟧ ⟦S1326⟧
- **Drawn objects:** ⟦S0362⟧ ⟦S0407⟧ ⟦S0414⟧ ⟦S0361⟧ ⟦S1350⟧
- **Buttons and surfaces:** ⟦S0405⟧ ⟦S0442⟧ ⟦S1388⟧ ⟦S1382⟧ ⟦S1349⟧ ⟦S0960⟧
- **Cursor, splash, depth:** ⟦S1323⟧ ⟦S1324⟧ ⟦S1338⟧ ⟦S1331⟧ ⟦S1333⟧ ⟦S1330⟧ ⟦S1169⟧ ⟦S0646⟧ ⟦S0654⟧ ⟦S1348⟧
- **Weather, access, media:** ⟦S1341⟧ ⟦S0971⟧ ⟦S1259⟧ ⟦S1274⟧ ⟦S0454⟧

Conflicts, resolved in favour of the owner's brief:
- ⟦S0214⟧ bans Inter and Roboto, but the brief locks everyday fonts.
- ⟦S1320⟧ bans model-drawn SVG illustration, but the brief orders animated SVG. The drawings here are technical roof diagrams.
- ⟦S1338⟧ and ⟦S1331⟧ prescribe a WebGPU library, but the file must be single. The same contract is met with a hand-written WebGL1 and Canvas flowmap.

Audit against the critique skills (S1473, S1479, S1482, S1496–S1501) was done before gating. Findings and fixes are
under Defects below.

### Per section (hero)
| Version | Design | Motion | Interaction |
|---|---|---|---|
| V2 | ⟦S0001⟧ the subject's most characteristic thing first; ⟦S1425⟧ planes | ⟦S0489⟧ creature motion: pivots, follow-through, blink timing; ⟦S0658⟧ durations | ⟦S1330⟧ split damped depth; ⟦S1338⟧ flowmap ripple |
| V3 | ⟦S0414⟧ truthful layer order; ⟦S0361⟧ sheet language | ⟦S0362⟧ outline before fills, pen draw-on of dimensions | ⟦S1324⟧ reveal mask; ⟦S1323⟧ distance-emitted wake, legible before touch |
| V4 | ⟦S1320⟧ people-first hero; ⟦S1425⟧ scrim under type | ⟦S0489⟧ linear loops (stamp, reel); ⟦S0451⟧ title | ⟦S1338⟧ light-leak flowmap; ⟦S1330⟧ depth |
| V5 | ⟦S0001⟧ numbers as the sequence; Longbow doctrine | ⟦S1326⟧ native-scroll scrub with reduced-motion cards; ⟦S0362⟧ | ⟦S1323⟧ tab lift; ⟦S1259⟧ step keys |
| V6 | ⟦S0329⟧ signature artifact (the configurator); ⟦S1382⟧ | ⟦S0405⟧ continuous state change; ⟦S0407⟧ icon draw-on | ⟦S1338⟧ contour wake; ⟦S0340⟧ keycap travel |

### Per element
| Element | Skills |
|---|---|
| Title treatment: masked word rise (all new versions, `OWL.split`) | ⟦S0451⟧ ⟦S1329⟧ ⟦S0658⟧ |
| Button: shingle tab (V2) | ⟦S1388⟧ ⟦S0405⟧ ⟦S0340⟧ ⟦S1259⟧ |
| Button: drawn plate (V3) | ⟦S0407⟧ ⟦S1324⟧ ⟦S0362⟧ |
| Button: film pill (V4) | ⟦S0214⟧ ⟦S0442⟧ ⟦S0405⟧ ⟦S0971⟧ |
| Button: embossed plate (V5) | ⟦S1388⟧ ⟦S1349⟧ ⟦S0442⟧ |
| Button: keycap and Enter key (V6) | ⟦S1382⟧ ⟦S0340⟧ ⟦S0960⟧ |
| Background: V2 sky, runoff lines and rain | ⟦S0407⟧ ⟦S1341⟧ ⟦S0489⟧ |
| Background: V3 blueprint grid | ⟦S1324⟧ |
| Background: V4 grain and film | ⟦S0214⟧ ⟦S1274⟧ |
| Background: V5 course lines and flow line | ⟦S1326⟧ ⟦S0407⟧ |
| Background: V6 contour field | ⟦S1338⟧ ⟦S1323⟧ |
| Splash surface: `OWL.flow` (Immersive Garden flowmap mechanism) | ⟦S1338⟧ ⟦S1331⟧ ⟦S1323⟧ ⟦S0646⟧ |
| Depth planes (V2, V4) | ⟦S1330⟧ ⟦S1169⟧ |
| Owl puppet mesh (V2) | ⟦S0489⟧ ⟦S0646⟧ |
| Layer keys and tag (V3) | ⟦S1324⟧ ⟦S1259⟧ ⟦S0960⟧ |
| Film roll (V4) | ⟦S1348⟧ ⟦S0489⟧ |
| Stamp (V4) | ⟦S0489⟧ |
| Step keys (V5) | ⟦S1259⟧ |
| Split cover and curtain (V6) | ⟦S0405⟧ |
| Seam icon (V6) | ⟦S0407⟧ |

## §2 corrections done in this round
1. Booking "Shoreview + 29 towns around it" changed to "Shoreview + 28 towns".
2. "BBB Accredited" changed to "BBB A−" in the footer chip and in Reviews V1 and V2. No source for accreditation was found, so the claim is dropped.
3. Header Services / Wise Check / About now go to `#services`, `#wise-check` and `#family`. Footer Protect Your Nest goes to `#protect`.
4. The tablet hero trust row is balanced, with "Founded 2025" on one line at 768.

The Wise Check card overflow and the Protect Your Nest drips stay with Round 3, where those sections are reworked.

## Defects
**Fixed in this round:**
1. V2: the painting's cut-out had alpha holes at the face. They were repaired in a separate asset, `owl-wing-live.webp`; V1's asset is unchanged.
2. V2: the cursor ripple bent the house. The house and ground are now rigid.
3. V2: the still image showed under the warped mesh because the `gl-on` class was on the wrong element. Fixed.
4. V2: a phone layout put the buttons over the art. Fixed.
5. V3: the reveal was too faint. The wake is boosted ×4 for a firm edge.
6. V3: the exposure dimension was cut off at narrow widths.
7. V4: the rail stretched the frame. The video was capped at 100 % width, which left a strip.
8. V4: the stamp text collided with itself.
9. V4: phone copy sat on a dark block, and the facts overlapped the buttons.
10. V4: the hover label on the light pill failed contrast (amber on paper). It is now ink with an amber underline.
11. V5: the step-key handler was out of scope.
12. V5: it ran every frame even when idle. It now draws only on change.
13. V6: it ran a full-rate redraw. It now runs at 30 fps and reads the wake only while active.
14. V2 lede: an invented claim was caught and removed. The lede now uses locked facts only.

**Open, honestly named:**
1. Immersive Garden's live surface could not be filmed: the WebGL scene never left its loader in this sandbox, even after a scripted click. The mechanism was taken from its code (the flowmap and stable-fluids passes).
2. Lusion and Bruno Simon code capture timed out. Their earlier digests were used. Bruno is reserved for the one game section later.
3. **Imagery request for Muse:** Owl's own service photos (`svc-*`, `crew-poster`) are 560–960 px wide, and they soften in V6's cover and V4's film. Higher-resolution originals of these photos and of the crew film would sharpen both versions. Nothing was invented to replace them.
4. V3's shingles are a procedural drawing, and the plane has no valley or step flashing because it is one plain slope. That is a true absence, not an error, but a roofer may want a valley or wall detail added in Round 2's Explore work.
5. V5's pin adds about three screen-heights of scroll before the Video section.
6. WebGL was verified on SwiftShader in headless Chromium, not on a real GPU.
7. The frozen inner pages (About hero and values) still say "BBB Accredited". They are no longer linked from the header, and will be fixed when they unfreeze.
8. The §1A roofer-correctness audit of the other homepage sections belongs to Rounds 2–5.

## STOP
Round 1 ends here. Round 2 (Video and Explore) does not start until Muse passes Round 1.
