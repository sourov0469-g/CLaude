# GATE · Final build · Round 8 · Protect Your Nest page (two versions each) · the one game

**File:** `owl/final/owl-roofing.html` (5.3 MB). Open `#/protect-your-nest` (the footer link goes there; `?all=2#/protect-your-nest`
for the V2s; `?review` still switches). Screenshots: `gates/r8/`.

**Facts used:** the Protect Your Nest System's four parts from Owl's own material (the wrap, three cleanup passes by the
crew, a magnet sweep and the project manager, the aftercare box, and the Get It Right guarantee = the 10-year workmanship
guarantee). Owl's own photos: the wrap on a house, the aftercare box, the guarantee seal, the crew beside the Owl banner.

## Section 1 · Page hero
- **V1 · The nest:** a woven nest drawn in SVG (hundreds of twigs in ink and amber shades) around a round photo window,
  with four numbered pins. Choose a part from the list or a pin (arrow keys work): the photo crossfades to Owl's own photo
  of that part and a caption explains it.
- **V2 · Wrap the house:** a house photo (illustrative, from Owl's site; not captioned as an Owl job) with protective
  netting drawn as a live SVG mesh. **Drag the amber handle down to wrap the house** (it drops a little on arrival as a
  hint; keyboard arrows and End work). Fully wrapped, a card says "Wrapped. Work can start." with Owl's own photo of the
  wrap on a real job.

## Section 2 · Three cleanup passes
- **V1 · "Pass Two Is Yours: Sweep the Yard" (the site's one game-like section, per the brief and the dossier's magnet
  pass):** an illustrated lawn (blades in ink and amber shades, no new colours) scattered with nails. **Move the magnet
  over the lawn and the nails jump to it**; a counter tracks them, and when the yard is clear the panel says the project
  manager walks it next and the pass tracker moves to pass 3. "Sweep it for me" runs the magnet automatically (for
  keyboard and touch users); "Scatter again" restarts. Fewer nails on phones.
- **V2 · Three pass scenes:** three tabs (the crew, the magnet sweep, the project manager), each with a small animated
  SVG scene (a broom sweeping dust, a magnet with nails jumping up, a clipboard ticking off), cycling until you choose.

## Verification
- **Interaction test** (`tools/interact8.cjs`): the footer link opens the page; the nest shows the aftercare box and lights
  pin 3; a pointer sweep collects most nails; "Sweep it for me" clears all 36, shows the win panel and moves to pass 3;
  "Scatter again" resets to 0 of 36; the wrap reaches 100 and shows the wrapped card; the passes tabs switch scenes.
  **No page errors.**
- **Defects found and fixed this round:** the auto sweep missed nails on a fixed path (now it seeks the nearest nail and
  always finishes, checked twice); "Scatter again" could not be clicked because the board captured the pointer (fixed);
  nails trailing the magnet were never collected (capture radius fixed); pins used an ARIA attribute not allowed on
  buttons (now aria-pressed); the phone caption overlapped a pin and the heading (moved below the nest).
- **Accessibility** (axe): **0 violations** on V1 and V2. **Phone:** 0 px sideways overflow on both. Rounds 1–7 tests
  still pass.

## Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Section · version | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|
| Hero V1 the nest | 8.2 | 7.8 | 8.2 | 8.6 | **8.14** |
| Hero V2 wrap the house | 8.0 | 7.6 | 8.4 | 8.0 | **7.96** |
| Passes V1 magnet sweep game | 8.0 | 8.0 | 8.8 | 8.4 | **8.20** |
| Passes V2 three scenes | 7.6 | 7.8 | 7.4 | 8.4 | **7.70** |

All pass; zero vetoes. **WEB-SKILLS:** ⟦S1440⟧ feedback-patterns (counter, win state, pass tracker) · ⟦S1452⟧
peak-end-rule (the cleared yard as the peak) · ⟦S1457⟧ zeigarnik-effect (36 nails to finish) · ⟦S1436⟧
animation-principles (nails ease to the magnet, net sways) · ⟦S0070⟧ better-accessibility (a keyboard path for the game,
sliders with keys, axe 0) · ⟦S0659⟧ anti-ai-slop (only Owl's named parts) · ⟦S1496⟧ critique-brand-consistency (nest and
lawn drawn in the locked palette).

**Recommendation:** Hero V1 and Passes V1 (the one game). **Next:** About page (the families and the company facts), then
Service Area and Contact pages, then deepen every inner page to 5–6+ sections.
