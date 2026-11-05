# GATE-FIX-FINDER · section 2 "What's going on up there?", three versions (default: V1 Curtain)

**Sources:** `reset/sections/02-finder/v1–v3.html`; the reset original is kept as `b1.html`.

**Evidence** (`gates/fix/finder/`):
- `versions-1440.jpg` and `versions-390.jpg`;
- every state at DPR 2 in `shingle-v*-*.jpg`;
- `checks-finder-v1…v3.json`.

**Switch:** the Versions button → Problem-finder, or `owl-roofing.html?finder=2` (`3`).

## 1. What was broken, and what fixed it
| Finding | Where | Fix |
|---|---|---|
| The same image two or three times on screen | Each case photo was the pill's thumbnail, the dock's thumbnail **and** the scene's picture | The pills and the dock now carry a **drawn symbol** per case (drop, stain, shingles, storm, clock, question). Each case photo appears **once**, in the scene. |
| An image in two sections | The "Not sure" photo (`svc-check`) was also section 5's crew chapter | Replaced by stock owned only by this section. The check now reports no repeat touching section 2. |
| Blurry | The six case photos were 560 px, shown in a 460 × 613 arch (and larger on phones) | Six new stock photos at 2000 px (one 1125 × 2000 portrait), measured at or below 1× at 1440 and at 390 × DPR 2. |
| Bright accents | The amber pills and amber dock | Slate accent with white text; the copper phone action in the scene. |
| Stock shown as Owl's crew | (new risk, avoided) | Every stock photo is tagged "Illustrative photo" with a true description; none is called Owl's work. |

## 2. The three versions

### V1 · Curtain (kept and repaired)
- **What it is:** the first act is a choice ("What's going on up there?", six cases). A curved curtain lifts onto a full scene for your case: service, promise, photo, copper call. The choice docks in the top bar and travels with you.
- **Reference:** Quiet Cubes (choice first, curtain, the choice kept in the bar).
- **Five questions:**
  1. **What is it for?** Tell them my problem and see what they'll do.
  2. **Under 3 s?** Yes.
  3. **Fun:** the curtain lifts onto *my* problem, and the bar remembers it.
  4. **Every element?** Question, symbols, scene, call, dock. Yes.
  5. **Stressed?** One tap to an answer and a number.
- **Ledger:** ⟦S1455⟧ ⟦S0409⟧ ⟦S1441⟧ ⟦S1107⟧ ⟦S0400⟧.

### V2 · Point at it
- **What it is:** one sharp photo of a two-storey house in snow. Tap a white dot where it worries you:
  - the roof → missing shingles;
  - a vent → a leak;
  - the dormer → a stain, "we look above it";
  - the gutter → a Wise Check;
  - the side roof → storm damage.

  Two chips cover what a photo of the outside can't show: "A stain inside" and "It's just getting old". A callout answers with the copper call.
- **Reference:** AirPods (labelled callouts on the object).
- **Five questions:**
  1. **What is it for?** Point at the problem, get the answer.
  2. **Under 3 s?** Yes: a house with dots.
  3. **Fun:** the house is the menu.
  4. **Every element?** Photo, dots, chips, callout, call. Yes.
  5. **Stressed?** Yes. You don't need the words for it ("dormer", "flashing"); you point.
- **Ledger:** ⟦S1107⟧ ⟦S0458⟧ ⟦S1441⟧ ⟦S1453⟧ ⟦S0400⟧.

### V3 · Two questions
- **What it is:** type only, one question at a time. First "What are you noticing?" (six plain answers), then "How long has it been going on?". An answer card names the service, Owl's promise, **what we do first**, and the copper call; "Today" adds "Then call today, Mon–Sat 08:00–18:00".
- **Reference:** a pattern, one question per screen (not live-studied).
- **Five questions:**
  1. **What is it for?** Be asked, like at the door.
  2. **Under 3 s?** Yes.
  3. **Fun:** quiet, not playful; the payoff is "what we do first".
  4. **Every element?** Two questions, a bar, the card. Yes.
  5. **Stressed?** The calmest; nothing to look at but your answer.
- **Ledger:** ⟦S1442⟧ ⟦S1434⟧ ⟦S1455⟧ ⟦S1457⟧ ⟦S0400⟧.

**Every version:**
- carries the same Owl wording per case (Roof Repair, Wise Check + Roof Repair, Storm Damage Help, Wise Check · Roof Replacement, Wise Check Inspections);
- shares the case with the page, so section 3's first beat and section 7's headline and email follow it;
- exposes `RESET.openCase`, so hero V4's answers land in any of them.

## 3. AA pairs (Shingle Slate; all four palettes in `gates/fix/colour/palettes.json`)

| Pair | Contrast |
|---|---|
| Ink on ground | 13.51:1 |
| Ink on cards | 14.36:1 |
| Secondary on ground | 6.57:1 |
| White on the slate accent (selected pills, chips and dock) | 7.39:1 |
| White on copper (call) | 5.14:1 |
| Light on the dark scene | 13.78:1 |
| Accent label on the dark scene | 7.05:1 |
| Accent link on ground | 6.70:1 |

## 4. Checks (`tools/fix-test.cjs finder <v>` on `owl-roofing.html`): **V1 25/25 · V2 25/25 · V3 25/25**

**Every version passes:**
- axe 0 in all four muted palettes (after a case is chosen, so the answer state is checked too);
- the facts lock and no skeleton;
- distinct media and nothing twice at once;
- sharp at 1440 and 390 × DPR 2 (V3 has no media);
- layout and 44 px controls;
- reduced motion;
- no errors.

**Behaviour checks per version:**
- **V1:** symbols, not photos, in the pills and the dock; "After a storm" lifts the curtain onto the storm scene and docks it; the dock changes the case; the photo is 2000 px, tagged and described.
- **V2:** five dots inside the photo plus two chips, all ≥ 44 px; the dormer → the stain case, shared; the "old" chip names the Wise Check and the 10-year workmanship warranty; Enter works on a focused dot.
- **V3:** question 1 → question 2 → the answer card (stain: "the attic above the stain", "call today… Mon–Sat 08:00–18:00"); "Start again"; the hero's `openCase('storm')` goes straight to question 2.

**A test fix:** the facts-lock check read the section's raw text, which includes its own script and CSS source. It now reads what a visitor can see or hear: visible text, labels and alt text.

## 5. Scorecard (Design 40 · Usability 30 · Creativity 20 · Content 10)

| | Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|---|
| V1 Curtain | 8.6 | 8.6 | 8.6 | 8.5 | **8.59** |
| V2 Point at it | 8.4 | 8.6 | 8.7 | 8.2 | **8.50** |
| V3 Two questions | 8.0 | 8.8 | 7.4 | 8.8 | **8.20** |

**Recomputed:**
- V1: 3.44 + 2.58 + 1.72 + 0.85 = 8.59
- V2: 3.36 + 2.58 + 1.74 + 0.82 = 8.50
- V3: 3.20 + 2.64 + 1.48 + 0.88 = 8.20

## 6. The default: **V1 Curtain**
- **The owner accepted the reset's sections;** this is that section, now with no repeated photo, no blur and no amber.
- **It is the only version whose choice travels:** the dock keeps your case in the bar for the rest of the page. That is the reset's best idea, and section 7 builds its email on it.
- **V2 is the strongest alternative:** a different kind (the house is the menu) and the one I'd show a homeowner who can't name the problem. **V3** is the calmest, for a reader who wants words, not pictures.

## 7. Remaining (named)
- **D1 · no true ceiling-stain photo.** None was found on the free sources I can reach, and I won't fake one. The stain case shows the attic, where Owl looks first. Real Owl job photos of a stain and its cause would be better.
- **D2 · V2's dots are fixed to this photo.** A different house photo would need the dots re-placed (they are in a short table in the file).
- **D3 · the "gutter" dot leads to a Wise Check, not a gutter service.** Gutter work isn't in the locked facts, so it isn't promised.

## 8. Vetoes: **zero**
- Only locked facts and Owl's own wording.
- Stock is tagged, described truthfully and credited (`MEDIA-CREDITS.md`).
- The logo is untouched.
- Process, stated exactly (corrected after Muse's check): every command I ran for this item was a foreground command with a time limit, in my own thread; I made no Agent calls and no run_in_background calls. I did not verify what the harness panel counts as a task (my task checklist, or a scheduled check-in created outside this session), so this line does not claim more than that.
