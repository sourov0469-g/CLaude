# GATE-NEW — Visualiser L, "Roll it on"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 2, section 3 (Services L accepted by Muse). The configurator stays where it belongs (Visualiser only). The roller is an animation that answers a choice, not a game: the visitor never paints, steers or scores.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Visualiser L, "Roll it on"** (`?vis=l`) |
| Primary reference (annex v3, one) | **Graza**: the custom-animation quality bar (crafted, characterful motion; confirmed live 2026-11-03). No Visualiser version has used it. A and B used Quiet Cubes structure; C and F Cash App; D Rimowa; E an Ever craft note; G Quiet Cubes; H Scout; I Apple AirPods Pro; J Cowboy; K Dropbox. |
| Signature creative move | **The finish arrives the way it really does.** The firm publishes two routes to a colour, and the wall shows each one in motion. *Painted on site* (any of 1,700+ Sherwin-Williams colours; the 12 published swatches here): a paint roller rolls the colour on, course by course in a serpentine, leaving a wet sheen that dries. *ColorPlus, factory-baked* (the 17 published Austin colours, Arctic White trim): no roller; the boards arrive finished, so the courses turn over to the new colour from the bottom course up, the way siding is hung. Choosing a colour plays its route once. |
| Style family | A crafted animated vignette: one lap-sided wall with a window, a drawn roller, and quiet swatch rows below |
| Content | The published Sherwin-Williams swatches (12, with names, codes and hex) and ColorPlus Austin colours (17, names and hex), "1,700+ Sherwin-Williams colours" with free colour matching, "ColorPlus finish 15+ yrs" and Arctic White trim, all as published. Stated on the page: screen colours are approximate, so bring real samples to the free inspection. No count, price or claim is added. |
| How it differs from every existing Visualiser version | A fans swatches over a house. B snaps courses in through five steps. C compares colour fields. D is a step instrument. E offers pairings. F maps colour. G asks four questions. H changes the light. I is a loupe. J puts your house on a street. K opens a tile into a page. None shows how the colour gets onto the wall, and none makes the difference between the two finish routes visible. |
| Why it is better | It answers the question homeowners actually ask, "painted, or ColorPlus? what's the difference?", by showing it. The animation is the explanation. The current best (K, "Open a colour", 8.40) presents a colour beautifully but never says how it would be applied. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the wall vignette); ⟦S0220⟧ published colours and finish facts only; approximation stated |
| Finish switch (2) | ⟦S0054⟧ `radiogroup`: one tab stop, arrow keys, `aria-checked`; switching shows that route's colours and replays the last colour with the new route |
| Swatches (12 / 17) | ⟦S0054⟧ `radiogroup` per route with roving arrows, Home/End; each labelled "Dovetail SW 7018" or "Night Gray, ColorPlus"; ⟦S1427⟧ one swatch treatment; the chosen swatch gets a lime ring |
| Roller (painted route) | ⟦S1436⟧ the roller decelerates into each pass, lifts between courses with a small overshoot, then leaves; ⟦S0083⟧ squash and follow-through on the handle; ⟦S1315⟧ the RAF runs only while it moves |
| Wet sheen | A soft white glaze over each freshly rolled course, fading over 0.9 s ("drying") |
| Board turn (ColorPlus route) | ⟦S1436⟧ each course turns over on its own axis (scaleY 1 → 0 → 1), bottom course first, 55 ms apart |
| Readout | `aria-live="polite"`: the colour's name and code, its route, and the route's published facts; ⟦S1494⟧ plain sentences |
| CTA | ⟦S1435⟧ one filled "Book a free inspection" ("bring real samples to the free inspection") |
| Arrival | ⟦S1436⟧ on first view the roller rolls the default colour (Dovetail SW 7018) over a primer-white wall, once |
| Phone | The wall scales to the width (SVG viewBox); swatches wrap in rows of six; the readout follows |
| Reduced motion | ⟦S0400⟧ no roller, no turn: the colour changes at once, and the readout still states the route |
| Background law | White ground; the vignette and controls are `data-solid` |

---

## Build log

**How to view:** `?vis=l` (switcher: Visualiser, **L "Roll it on"**).

**Files:**
- `src/sec/vis7.js` and `vis7.css`: `Vis7.L` is prerendered at build; `Vis7.wire` wires it.
- The build registers the module, the `vl` key, the `l` slot entry, the label and the wire call.
- No images. The file grows by 28 KB (20,233,491 bytes).

**The colours:**
- The 12 Sherwin-Williams swatches (name, code, hex) and the 17 ColorPlus Austin colours (name, hex) are written out in the module.
- Each was checked against FACTS.md in code: all 29 match exactly.

**The wall:** an SVG vignette, 800 × 500.
- 12 lap courses, 40 units each, each with a lap shadow and a top highlight.
- A house-wrap backing behind the courses, corner boards, and a window with casing, mullions and sill.
- Trim in Pure White SW 7005 on the painted route, and in Arctic White on ColorPlus (as published).

**Painted on site:**
- A drawn roller (charcoal frame, deep-green grip, a sleeve loaded with the chosen colour) rolls each course in turn.
- It runs top down, in a serpentine: 150 ms per pass, decelerating, then a 45 ms lift with a small hop between courses.
- It leans into its direction of travel and squashes slightly while rolling, then leaves past the corner.
- Each finished course gets a white wet sheen that fades over 0.9 s ("drying").

**ColorPlus, factory-baked:**
- No roller.
- Each course turns over on its own axis (scaleY 1 → 0.04 → 1, 0.36 s), bottom course first, 55 ms apart.
- The colour changes at the halfway point of each turn, showing the house wrap behind for an instant.

**Interruptions:** a new choice settles the animation in progress to the colour it was applying, then starts the new one.

**Arrival:** on first view, the roller rolls the default (Dovetail SW 7018) over a primer-white wall, once.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-visualiser-l-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- frozen-clock frames at each width: `-rolling` (the roller mid-pass), `-painted` (done), `-turning` (ColorPlus boards mid-turn), `-colorplus` (done);
- contact sheet: `new-visualiser-l.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Roller (clock frozen, 700 ms into the arrival) | Courses 1–3 painted and course 4 mid-pass (paint widths `752,752,752,693,0…`); the whole wall is Dovetail (#908A83) by about 2.6 s |
| ColorPlus turn (330 ms after choosing Deep Ocean) | Bottom three courses turned, the rest still Night Gray (bottom-up confirmed). Then all #49545C, trim Arctic White #E0E0D8 |
| Readout | "Deep Ocean · ColorPlus, factory-baked · One of the 17 ColorPlus colours for Austin, with Arctic White trim. The colour is baked on at the factory: “ColorPlus finish 15+ yrs.”" |
| Keys | From Dovetail, → selects Gauntlet Gray SW 7019 (`aria-checked`, the readout follows); End selects Hunt Club SW 6468. On the finish switch, → selects ColorPlus and shows its 17 colours |
| Reduced motion | Choosing In the Navy changes the wall at once (#283849); the roller never appears |
| Colours | All 12 Sherwin-Williams and 17 ColorPlus entries match FACTS.md exactly (name, code, hex) |
| Existing versions | 176 slot templates and 8 page templates byte-identical to the previous commit. `<main>` identical apart from the one added `vis:l` template. Defaults unchanged (`vis = b`) |
| Locked mechanics | The configurator is in the Visualiser, where it belongs. No map, dive or game: the visitor chooses, the wall answers |

## Defects found and fixed

1. **An interrupted roll undid itself:** a new choice mid-roll first reset the wall to the colour before the roll. It now settles to the colour that was being applied, then starts the next.
2. **Black trim without the script:** the trim had no fill in the markup, so it rendered black before wiring. It now ships with Pure White SW 7005.
3. **Turning boards showed the empty stage:** mid-turn, a course showed pale stage behind it. A house-wrap backing (#D7DCD8) now sits behind the courses, as on a real wall.

## Remaining defects, named honestly

- **Screen colours are approximate.** The page says so and points to real samples at the inspection, but a visitor may still trust the screen.
- **One wall, one profile:** the vignette is lap siding only; board and batten (27 of 415 jobs) is not shown in this version.
- **The roller and the turn take time:** about 2.6 s and 1 s. A visitor clicking through swatches quickly sees each animation cut short and settled.
- **Testing:** Chromium only; frames captured with a frozen clock, so smoothness on real devices is unchecked.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | visualiser L | ⟦S1434⟧ the wall vignette dominates; ⟦S0220⟧ published colours and finish facts only, checked in code; approximation stated |
| Element | finish switch | ⟦S0054⟧ `radiogroup`, roving tabindex, arrows; switching replays the route's current colour |
| Element | 12 / 17 swatches | ⟦S0054⟧ one `radiogroup` per route, arrows / Home / End, each labelled by name and code; ⟦S1427⟧ one swatch treatment; lime ring on the chosen one |
| Motion | roller | ⟦S1436⟧ decelerating passes and a lifted hop between courses; ⟦S0083⟧ lean and squash while rolling; ⟦S1315⟧ one RAF loop, only while it moves |
| Motion | wet sheen | A white glaze per course fading over 0.9 s |
| Motion | ColorPlus turn | ⟦S1436⟧ each course turns over, bottom first, 55 ms apart |
| Element | readout | `aria-live="polite"`; ⟦S1494⟧ plain sentences with the published facts |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button; "Bring real samples to the free inspection" |
| Site | ≤ 1000 px | Single column; the SVG scales; swatches in rows of six |
| Site | reduced motion | ⟦S0400⟧ no roller, no turn, instant colour |
| Site | background law | White ground; the vignette and controls are `data-solid` |

## Reference transfers and non-transfers (Graza)

**Transferred:**
- crafted, characterful motion that explains the product (a roller that leans, squashes and hops; boards that turn);
- the animation is the point, not decoration;
- one hero object at a time.

**Not transferred:**
- Graza's illustrated bottles, its palette and its type;
- its draw-on-scroll detail (unverified in the annex);
- anything playful beyond the task: no confetti, no sound, no score.

## Comparison with the section's previous best (Visualiser K, "Open a colour", 8.40)

K opens one colour tile into a full page of that colour: the colour, beautifully.
- **L shows how the colour reaches the wall,** and makes the firm's two published finish routes visible side by side: painted on site from 1,700+ Sherwin-Williams colours, or ColorPlus baked on with Arctic White trim.
- **K is stronger on:** the colour at scale.
- **L is stronger on:** explaining the decision a homeowner actually has to make.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | A clean wall vignette with a crafted roller and a calm swatch column (`-1440-rolling`, `-1440-painted`, `-1440-colorplus`). The two routes read differently at a glance. **Minus:** lap only; the vignette is smaller than K's full-bleed colour |
| Usability (30) | **8.4** | Two radiogroups with the full keyboard model; the readout follows every choice; interrupts settle cleanly; reduced motion is instant; 0 errors and 0 overflow. **Minus:** the 2.6 s roll is long when browsing quickly |
| Creativity (20) | **8.8** | No Visualiser version shows how a colour gets onto the wall. Using the two real finish routes as two different animations is a signature move for the section |
| Content (10) | **8.6** | All 29 colours exactly as published; "1,700+", free colour matching, "ColorPlus finish 15+ yrs" and Arctic White trim as published; approximation stated. **Minus:** board and batten not shown |
| **Weighted** | **8.50** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.4 + 0.3 × 8.4 + 0.2 × 8.8 + 0.1 × 8.6 = 3.36 + 2.52 + 1.76 + 0.86 = **8.50**.

**Vetoes: none.**
- Locks untouched; no form.
- White ground, with greens and lime in the UI; wall colours are the published colours (content).
- Only normal fonts (Poppins, Inter).
- The configurator only in the Visualiser; no invented imagery.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Windows L until Muse accepts.
