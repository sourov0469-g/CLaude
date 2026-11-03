# GATE · Upgrade Round 3 · Wise Check and Protect Your Nest (owner's upgrade order) · STOP for Muse

**Result:** Wise Check and Protect Your Nest each have three versions in `owl/final/owl-roofing.html`. V1 of each is
still the default view (no query string). Judge any version with `?wise=N`, `?wrap=N` or `?review`.

Superseded versions are kept inside the file as inert hidden backups, never deleted:
- the old Protect V1 "Same Storm. Different Ending." → `wrap-b1`
- the old Protect V2 "Every Layer, Guarded" → `wrap-b2`
- the old Wise V2 "owl eye" → `wise-b1`

Inner pages stay frozen.

| Section · version | Name | One line |
|---|---|---|
| Wise V1 (kept, **fixed**) | The Wise Check | Same dial and checklist. The cross-section now sits inside its glass card with a margin, and the ridge vent is drawn over the ridge (§2.4). |
| **Wise V2** | **See What We See** | A lens you move over a drawn house. It has four modes, one for each part of Owl's published Wise Check: up close (2.2× zoom, granules and a lifted tab), attic (rafters, insulation, airflow, a damp patch), heat sensor (a false-colour filter with a patch that reads differently), and camera (a viewfinder; Take a photo drops polaroids into a strip). |
| **Wise V3** | **When to Call for a Wise Check** | Owl's four published cases as tall panels that open sideways (stacked on phones). Each open panel plays its own drawn scene, gives Owl's line, and names the Wise Check parts that case focuses on. |
| Protect V1 (kept slot, **rebuilt truthfully**) | **Same Job. Different Yard.** | The same composition (two panels, headline card, one slider), now telling what the system really is. One re-roof is shown twice: no protection vs the Protect Your Nest System. The job slider (or Play) runs wrap on, tear-off, new roof, then pass 1 the crew, pass 2 the magnet sweep, pass 3 the project manager, and the aftercare box. |
| **Protect V2** | **The Wrap. Three Passes. A Box.** | A 3D deck of three cards: Owl's own wrap photo, an animated three-passes card, and Owl's own aftercare box photo. Driven by accessible tabs, swipe or a click on the edge, with a gentle tilt and glare on the front card. |
| **Protect V3** | **Every Step, Mapped on Your Yard** | A blueprint-style yard plan stays sticky while six steps scroll past. The mesh line is inked along the eaves, debris lands only in the wrap zone, the crew trail, the magnet runs its lanes and picks up every nail, the project manager's walk loops the house, and the box appears at the door. |

## §2.4 fixes asked for in this round
1. **The Wise Check cross-section poked past its card at the top right.**
   - The drawing now has a 12–14 unit margin inside its own frame and the glass card clips its contents.
   - The ridge vent is redrawn as a cap centred on the ridge instead of hanging past the section line.
   - A test measures every drawn part against the card edge: 0 parts outside, and the vent clears the edge by 8 px or more.
2. **Protect Your Nest V1's eave drips still fell on the protected house.**
   - The rain canvas is gone with the storm story (see the content correction below).
   - The test checks that the protected panel has no canvas and no rain, drip or storm wording.

## Content correction (owner note)
The old Protect V1 told a storm story ("Turn up the storm… the one Owl protects keeps the nest dry", an amber shield
over the roof). That misdescribes the Protect Your Nest System. In Owl's own words (`lib/services-data.js`, the
Protect Your Nest page) it is **the wrap, three cleanup passes and an aftercare box**: how Owl looks after the home
and yard while the old roof comes off and the new one goes on. The passes are the crew, the magnet sweep and the
project manager's walk-through.

All three Protect versions now say only that. A test fails any Protect version that mentions storm, hail or a shield.
The storm version is kept as `wrap-b1` in case the owner wants it for the storm and insurance story instead.

## §1A roofer and truth audit of every visual
**Protect V1, the drawn re-roof:**
- tear-off runs ridge-down;
- the new roof goes on eave-up, over a visible underlayment course;
- the wrap hangs from the eave over the walls and shrubs, with a ground tarp in front, matching Owl's wrap photo;
- debris on the wrap leaves with the wrap;
- a few stray nails reach the lawn, which is why the magnet pass exists;
- the open yard keeps its nails.

**Protect V3 plan:**
- hip roofs are drawn with correct hip and ridge lines in plan;
- the wrap zone follows the house and garage outline;
- magnet lanes cover the lawn and the drive.

**Wise V2:**
- step flashing runs along the slope at the chimney base, and the chimney now meets the roof line;
- the attic shows rafters, insulation on the attic floor, and airflow from eave to ridge;
- the heat-sensor line is worded neutrally ("a patch that reads differently").

**Wise V1 cross-section:** rafter, deck, underlayment, shingles, chimney step flashing, ridge vent at the ridge, and a gutter at the eave.

**Owl's own photos are captioned only with what they show:**
- `pn-wrap.webp`: mesh from the eaves, a tarp over the lawn;
- `pn-box.webp`: the olive Owl box, open to spare shingles. Its caption claims no contents.

## Scorecard (D40 / U30 / C20 / Ct10; pass = weighted ≥ 7.0, no category < 6.0, zero vetoes)
| Version | Design | Usability | Creativity | Content | Weighted | Result |
|---|---|---|---|---|---|---|
| Wise V1 (fixed) | 7.8 | 8.0 | 7.4 | 8.0 | **7.80** | Pass |
| Wise V2 See What We See | 8.0 | 7.8 | 8.6 | 8.4 | **8.10** | Pass |
| Wise V3 When to Call | 7.8 | 8.2 | 7.6 | 8.8 | **7.98** | Pass |
| Protect V1 Same Job. Different Yard. | 7.8 | 8.2 | 8.0 | 9.0 | **8.08** | Pass |
| Protect V2 Wrap · Passes · Box | 8.0 | 8.0 | 7.6 | 8.6 | **7.98** | Pass |
| Protect V3 Yard Plan | 7.8 | 7.8 | 8.2 | 8.6 | **7.96** | Pass |

Why these aren't higher:
- The house drawings are deliberately flat illustrations, not renderings.
- Owl's wrap photo is 540 px and soft on the large card.
- The storm scene in Wise V3 is the sparsest of the four.
- Protect V3's steps leave white space beside the plan on wide screens; that is the cost of a scroll story.

## Evidence (`owl/final/gates/up-r3/`, 2× device scale, header hidden, no switcher)
Section shots at `1440`, `768` and `390`:
- `wise-v1-*`, `wise-v2-*`, `wise-v3-*`;
- `wrap-v1-tearoff-*` and `wrap-v1-done-*`: the job slider at 40 and at 100;
- `wrap-v2-*`;
- `wrap-v3-s2-*` and `wrap-v3-s6-*`: viewport shots with the step centred, since the plan is sticky.

Also:
- `wise-v2-m0…m3-*`: each lens mode over the chimney, at 1440 and 390;
- `checks.json`: 103 Round 3 checks.

Regression runs:
- homepage `gates/up-r2/home-verify-checks.json`: 50 of 50. The wrap checks now follow the job states.
- Round 2 `gates/up-r2/checks.json`: 81 of 81.
- heroes `gates/up-r2/hero-regression-checks.json`: 85 of 85.

## Interaction tests (`tools/up-r3-test.cjs`): **103/103 pass**
Run on every version:
- only that version is visible;
- the section keeps its page anchor (`#wise-check` / `#protect`);
- one h2 whose name survives the word split;
- every control is at least 44 px, on desktop and on a 390 px phone;
- axe WCAG 2.1 A/AA: **0 violations**;
- no console or page errors;
- no sideways scroll at 1440, 768 and 390;
- reduced motion loads clean with no looping animation.

Plus:
- default view is V1 for both sections;
- the three backups are present as inert templates;
- every homepage section is inside the home page;
- every Protect version passes the truth check (wrap, passes and box named; no storm, hail or shield).

Per version:
- **Wise V1:**
  - the §2.4 overflow measurement and vent margin;
  - all four ticked sends the needle to PROTECTED and readies the CTA.
- **Wise V2:**
  - the Heat sensor radio shows the heat lens;
  - arrow keys move between modes;
  - arrow keys on the stage move the lens;
  - Take a photo adds two polaroids and announces "Photo 2 taken";
  - the button is hidden, and not displayed, outside camera mode;
  - the four modes are Owl's published parts.
- **Wise V3:**
  - four panels match Owl's published cases;
  - opening one closes the others (`aria-expanded`);
  - the open panel shows its scene, line and focus parts;
  - Enter opens a panel.
- **Protect V1:**
  - before the job: no debris and no wrap;
  - the wrap goes on the protected house only;
  - tear-off puts debris in the open yard and shrubs, and on the wrap;
  - pass 2 shows the magnet, with pass 1 ticked;
  - done: wrap off, strays swept, walk-through ticked, aftercare box shown, and the open yard keeps its nails;
  - no rain or drips;
  - Play runs the job and can pause.
- **Protect V2:**
  - the deck deals card 1 front, with the rest inert;
  - arrow keys give roving tabindex;
  - End jumps to the box;
  - a swipe right goes back a card;
  - captions stay short and claim nothing extra.
- **Protect V3:**
  - scroll step 1 shows the wrap;
  - step 2 shows debris on the wrap;
  - step 4: the magnet runs the lanes and picks up every nail;
  - rail button 6 shows the box and the title block reads "Done";
  - the plan is sticky.

## SKILL LEDGER (§1G)
**Site level:** the Round 1 pack (50, `owl/skills/UP-R1-HERO-PACK.md`), the Round 2 additions (14,
`owl/skills/UP-R2-PACK.md`), and 9 Round 3 skills read in full by tag (`owl/skills/UP-R3-PACK.md`): ⟦S0076⟧ ⟦S0251⟧
⟦S0205⟧ ⟦S0448⟧ ⟦S0440⟧ ⟦S0462⟧ ⟦S1246⟧ ⟦S1039⟧ ⟦S1049⟧. The critique audit before gating used ⟦S1473⟧ ⟦S1479⟧
⟦S1482⟧ ⟦S1496⟧–⟦S1501⟧.

**Per section**
| Section | Design | Motion | Interaction / access |
|---|---|---|---|
| Wise V1 | ⟦S0414⟧ truthful section, kept inside its card | needle spring (kept) | ⟦S0462⟧ checklist hit areas |
| Wise V2 | ⟦S0414⟧ one house, four truthful views; ⟦S0205⟧ depth only where it helps | ⟦S0407⟧ airflow; ⟦S0451⟧ title | ⟦S1107⟧ radio group with arrow keys; stage keyboard lens; ⟦S1049⟧ |
| Wise V3 | ⟦S0076⟧ Owl's own cases, one vocabulary | ⟦S0544⟧ one easing for open/close; scene loops pause when closed | disclosure buttons with `aria-expanded`; ⟦S0462⟧ |
| Protect V1 | ⟦S0076⟧⟦S0251⟧ truthful story, verb-first CTA; ⟦S0414⟧ | ⟦S1326⟧ input is the clock; ⟦S0489⟧ debris fall and settle | native range plus Play/Pause; live output |
| Protect V2 | ⟦S0205⟧ small 3D deck; ⟦S1039⟧ captions | ⟦S1330⟧ damped tilt; one-shot deal-in ⟦S0440⟧ | ⟦S1246⟧ tabs, roving tabindex, inert back cards; ⟦S1443⟧ swipe threshold |
| Protect V3 | ⟦S0414⟧ blueprint plan; ⟦S0448⟧ sticky artifact | ⟦S0362⟧ ink then fill; ⟦S0448⟧ measured steps | ⟦S0440⟧ IntersectionObserver steps; rail buttons with `aria-current`; ⟦S0462⟧ |

**Per element**
| Element | Skills |
|---|---|
| Cross-section card (Wise V1) | ⟦S0414⟧ ⟦S1049⟧ |
| Inspection lens and modes | ⟦S0205⟧ ⟦S1107⟧ ⟦S0407⟧ |
| Heat-sensor filter | ⟦S0385⟧ ⟦S0414⟧ |
| Polaroid strip | ⟦S0489⟧ ⟦S1190⟧ |
| Case panels | ⟦S0544⟧ ⟦S0462⟧ ⟦S0076⟧ |
| Focus tags (not buttons) | ⟦S0251⟧ |
| Job slider and Play key | ⟦S1326⟧ ⟦S1388⟧ ⟦S1382⟧ |
| Wrap drape, debris, magnet | ⟦S0414⟧ ⟦S0489⟧ |
| Pass chips | ⟦S0462⟧ ⟦S0076⟧ |
| 3D deck and glare | ⟦S0205⟧ ⟦S1330⟧ ⟦S1039⟧ |
| Three-passes card | ⟦S0362⟧ ⟦S0407⟧ |
| Yard plan, mesh ink, lanes | ⟦S0448⟧ ⟦S0362⟧ ⟦S0414⟧ |
| Step rail | ⟦S0462⟧ ⟦S1049⟧ |
| Titles | ⟦S0451⟧ ⟦S1329⟧ |

## Defects
**Fixed in this round:**
1. §2.4 Wise V1 overflow and §2.4 Protect V1 drips, both above.
2. **Protect V1 told the wrong story.** It has been rebuilt; see the content correction.
3. **Protect V1 (first draft):**
   - the box and walk-through badge moved through CSS transforms that overrode their SVG positions; each now has its own wrapper;
   - captions covered the roofs on tablets, so the panels stack below 900 px with the captions under each drawing;
   - the headline card no longer overlaps the drawings.
4. **Protect V2 (first draft):**
   - a keyframe used a CSS variable inside a keyframe selector, which is invalid; it now uses animation delays;
   - on phones the deck sat above the heading; the order is now heading, deck, tabs, CTA.
5. **Protect V3 (first draft):**
   - on phones the centred step hid behind the sticky plan; the plan is smaller there and the active band sits lower;
   - the faded inactive steps failed contrast; they are now a passing grey, not opacity;
   - the rail buttons on phones were 40 px; they are now 44 px;
   - 16 lawn nails made the wrap look like it failed; there are now 8 strays.
6. **Wise V2 (first draft):**
   - the chimney floated above the roof and its flashing ran against the slope; both are redrawn;
   - the companion owl's bubble covered the lens, so it is off on this stage;
   - "Take a photo" showed in every mode because the button style beat `hidden`; the test now checks it is not displayed;
   - touch screens had no way to take a photo; they now have the button.
7. **Wise V3:** the wide open panel cropped its scene; scene and text now sit side by side at 4:3.

**Open, honestly named:**
1. **Owner check on the Protect V1 rewrite** (content correction above). Is the storm version wanted anywhere else? It is kept as `wrap-b1`.
2. **Is `pn-wrap.webp` an Owl job?** It came with Owl's materials and its caption says only what it shows. If it is a
   stock or supplier photo, Protect V2's first card should use a drawn wrap instead.
3. **Wise V2's illustrated defects** (lifted tab, flashing gap, damp patch, the heat patch) are examples of what each
   part looks for, not findings, and the copy says "move the lens". The owner may prefer a defect-free house.
4. **Carried from earlier rounds:**
   - higher-resolution photo and film originals;
   - the VideoObject upload date;
   - inner pages still say "BBB Accredited" (frozen until their round).

## STOP
Round 3 ends here. Round 4 (Services and Reviews) doesn't start until Muse passes Round 3.
