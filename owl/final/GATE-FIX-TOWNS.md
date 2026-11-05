# GATE-FIX-TOWNS · section 6 "Do you come to me?", three versions (default: V2 Distance rings)

**Sources:** `reset/sections/06-towns/v1–v3.html`; the reset original is kept as `b1.html`.

**Evidence** (`gates/fix/towns/`):
- `versions-1440.jpg` and `versions-390.jpg`;
- `checks-towns-v1…v3.json`.

**Switch:** the Versions button → Towns, or `owl-roofing.html?towns=1` (`3`).

## 1. What was broken, and what fixed it
| Finding (audit) | Fix |
|---|---|
| **An image twice on the site.** The owl illustration was this section's home marker **and** section 7's landing owl. | The home marker is now a drawn house (V1); V2 uses a drawn "Owl" hub. The owl illustration belongs to section 7 only. **With this gate the page-wide report reads "no repeats".** |
| **Phone: the call pill covered the southern towns** (four dots measured under it at 360 × 740) | Every version keeps 140 px of clearance at the bottom on phones, so the whole map scrolls clear of the pill. |
| **Seven towns within about 5 miles of Shoreview touch,** and their tap areas overlap | V1 has a "Zoom in on Shoreview" control that spreads them 2.6× apart (checked: Arden Hills and New Brighton end up more than twice as far apart on screen). It zooms back out by itself when you type a far town. |
| **Bright accents** | A slate accent; copper for the lit town. |

## 2. The three versions

### V1 · Contour finder (kept, repaired)
- **What it is:** type or tap your town on a contour-line ground. The answer gives the straight-line distance, "as the owl flies", and the zoom makes the cluster tappable.
- **Reference:** Lando contours.
- **Five questions:**
  1. **What is it for?** Do they come to me?
  2. **Under 3 s?** Yes.
  3. **Fun:** the map answers you; the zoom flies in on Shoreview.
  4. **Every element?** Yes.
  5. **Stressed?** One question, one answer.
- **Ledger:** ⟦S1453⟧ ⟦S1107⟧ ⟦S1441⟧ ⟦S0458⟧ ⟦S0400⟧.

### V2 · Distance rings
- **What it is:** Owl at the centre, with rings every 5 miles out to 25. Each of the 28 other towns sits at its **true bearing and straight-line distance** (Stillwater east, Maple Grove west, Forest Lake north, Apple Valley south; checked). Type a town and its dot and ring light: "About 24 miles from our Shoreview base, as the owl flies: inside the 25-mile ring."
- **Reference:** a pattern, the polar chart (not live-studied).
- **Five questions:**
  1. **What is it for?** Coverage, and how far.
  2. **Under 3 s?** Yes: a target with Owl in the middle.
  3. **Fun:** you find your ring.
  4. **Every element?** Rings, dots, compass, legend. Yes.
  5. **Stressed?** Yes; the answer is a sentence.
- **Ledger:** ⟦S1420⟧ ⟦S1453⟧ ⟦S0458⟧ ⟦S1107⟧ ⟦S0400⟧.

### V3 · From above
- **What it is:** a sharp autumn suburb seen from above, full-bleed and tagged. One big ask box carries the answer. Under the photograph, all 29 towns sit in a quiet row **in order of distance**, the typed one lit, each name a button.
- **Reference:** Scout (one line on one photograph).
- **Five questions:**
  1. **What is it for?** The same question, with a sense of place.
  2. **Under 3 s?** Yes.
  3. **Fun:** the photograph does the mood.
  4. **Every element?** Yes.
  5. **Stressed?** Yes.
- **Ledger:** ⟦S1453⟧ ⟦S1433⟧ ⟦S1306⟧ ⟦S1107⟧ ⟦S0400⟧.

**All three:**
- use the site's own 29 towns and approximate public town-centre coordinates (used only for distance and bearing);
- give an honest answer for an unlisted town ("isn't on our list of 29 towns. Call (651) 977-6027 and ask; we'll tell you straight.");
- never inject typed text as markup;
- share the town with section 7.

## 3. AA pairs (Shingle Slate; all four palettes in `gates/fix/colour/palettes.json`)

| Pair | Contrast |
|---|---|
| Ink on ground and cards | 13.51–14.36:1 |
| Secondary text | 6.57:1 |
| Slate accent (zoom pressed, lit ring) | 6.70:1 |
| White on slate | 7.39:1 |
| Town labels (ink with a ground-coloured halo) | 13.51:1 |
| Ring and compass labels (secondary) | 6.57:1 |
| Rings (UI, 3:1 needed) | 3.18–3.40:1 |

## 4. Checks (`tools/fix-test.cjs towns <v>` on `owl-roofing.html`): **V1 30/30 · V2 30/30 · V3 29/29**

**Every version passes:**
- axe 0 in all four palettes;
- the facts lock and no skeleton;
- distinct media;
- sharp (V3's photo measured at 1440 and 390 × DPR 2);
- layout and 44 px controls;
- reduced motion;
- no errors.

**Shared town checks:** 29 suggestions; "Roseville" and "st paul" answer yes with a distance; "Duluth" gets the honest answer; no injection; Shoreview gives the real address; the town is shared.

**Behaviour checks per version:**
- **V1:** 29 dots and a drawn home; the zoom spreads the cluster more than 2×; a far town unzooms; a tap answers.
- **V2:** 28 towns and 5 rings; the true geometry; Apple Valley "inside the 25-mile ring" and that ring lights; Enter works on a focused town.
- **V3:** 29 name buttons, nearest first; a choice answers; the photo is tagged.

**A test fix:** two reduced-motion checks first written for V2 and V3 always passed. They were replaced with real measurements before these results were taken.

## 5. Defects found and fixed in-session
1. **V2's rings stopped at 20 miles,** which would have made "inside the 20-mile ring" false for Apple Valley (24 mi), Burnsville and Eden Prairie (22 mi). A 25-mile ring was added, and the answer names the true ring.
2. **V2 on phones:** labels were 6.5 px. They are now about 11 px, with larger dots and tap areas, and only the big towns labelled until one is chosen.

## 6. Scorecard (Design 40 · Usability 30 · Creativity 20 · Content 10)

| | Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|---|
| V1 Contour finder | 8.5 | 8.6 | 8.4 | 8.8 | **8.54** |
| V2 Distance rings | 8.6 | 8.6 | 8.6 | 8.8 | **8.62** |
| V3 From above | 8.3 | 8.8 | 7.6 | 8.6 | **8.34** |

**Recomputed:**
- V1: 3.40 + 2.58 + 1.68 + 0.88 = 8.54
- V2: 3.44 + 2.58 + 1.72 + 0.88 = 8.62
- V3: 3.32 + 2.64 + 1.52 + 0.86 = 8.34

## 7. The default: **V2 Distance rings** (changed from the reset's V1)
- **It answers the question and the next one** (how far?) in one picture. The ring in the answer makes the distance something you can see.
- **True geometry is more honest than a stylised map.** Every dot is where the town really is, relative to Owl.
- **V1 stays strong for people who like to explore** (and its zoom fixes the cluster). **V3** is the calmest.

## 8. Remaining (named)
- **D1 · V2 on phones:** the town dots are about 33 px tap areas, under the 44 px guideline, and the cluster near the hub overlaps. Typing is the main path, and every town is in the suggestions. V1's zoom is the tap-first alternative.
- **D2 · approximate coordinates and straight-line distances** ("about", "as the owl flies"); towns are answered, not street addresses.

## 9. Vetoes: **zero**
- The site's own 29 towns.
- Only locked facts.
- Stock is tagged and credited.
- The logo is untouched.
- No sub-agents or background tasks; every command ran in my own thread, in the foreground, with a time limit.
