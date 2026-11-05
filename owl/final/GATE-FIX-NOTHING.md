# GATE-FIX-NOTHING · section 3 "Here's your part: nothing.", three versions (default: V1 Scroll film)

**Sources:** `reset/sections/03-nothing/v1–v3.html`; the reset original is kept as `b1.html`.

**Evidence** (`gates/fix/nothing/`):
- `versions-1440.jpg` and `versions-390.jpg`;
- every state at DPR 2 in `shingle-v*-*.jpg`;
- `checks-nothing-v1…v3.json`.

**Switch:** the Versions button → Your part: nothing, or `owl-roofing.html?nothing=2` (`3`).

## 1. What was broken, and what fixed it
| Finding | Where | Fix |
|---|---|---|
| **The same video twice** (owner) | This section scrubbed Owl's crew film, which also played in the hero | It now scrubs **different footage**: Pexels 4198812, a drone approach to a house mid-reroof with a roofer on the ridge. It is tagged **"Illustrative footage"**; it used to read "Owl's crew film". Owl's film lives only in hero V1. |
| **Blurry on phones** | A 1600 × 900 film was cover-cropped to a 390 × 844 portrait screen, 1.9× its pixels | On phones the film sits in a 16:9 frame under the bar (0.49× at DPR 2). On desktop it stays full-bleed (1.0× at 1440). |
| **Fragile on phones** (audit) | A 2.8 MB `data:` video, seeked without ever playing (iOS paints nothing) | Played from a Blob URL and primed with a muted play-then-pause before scrubbing. |
| **Too long** (reset D3) | 5.4 screens | 4.5 screens. |
| **Bright accents** | Amber step tags, rail and progress line on the dark band | Copper-light (`--acc-deep`) on the dark band, at 7.05:1. |
| **The tag hidden on phones** | The footage tag was `display:none` on phones | Shown on the film on every size, since it is stock. |

## 2. The three versions

### V1 · Scroll film (kept, repaired)
- **What it is:** a pinned stage. Your scroll scrubs the drone film (reversible) through five beats: Look (written for your case) · Wrap · Roof · Clean · Box. A jump rail, the "Meanwhile, you: make coffee / go to work / … open the front door" chip, and a progress line.
- **Reference:** AirPods (a reversible scrubbed film, measured live).
- **Five questions:**
  1. **What is it for?** After I call, Owl does the whole job.
  2. **Under 3 s?** Yes: "Here's your part: nothing."
  3. **Fun:** you fly in on a real reroof as you read, and the "meanwhile" joke lands.
  4. **Every element?** Film, beats, rail, chip, line. Yes.
  5. **Stressed?** It takes the fear out of a big messy job.
- **Ledger:** ⟦S0448⟧ ⟦S1325⟧ ⟦S1209⟧ ⟦S1447⟧ ⟦S1457⟧ ⟦S1455⟧ ⟦S0400⟧.

### V2 · Two lists
- **What it is:** type only, in flow; no pinned stage, only a small card follows you. **Owl's list** has the five steps as big rows, and each ticks itself as it passes the middle of the screen. **Your list** holds one line that moves through your day (Make coffee → … → Open the front door), with a tally: "5 of 5 done by Owl · 0 things for you to do". Step 1 is written for your case.
- **Reference:** Longbow strict rows, made into a to-do list you don't have to do.
- **Five questions:**
  1. **What is it for?** The same promise, as a checklist.
  2. **Under 3 s?** Yes.
  3. **Fun:** the ticks draw themselves, and "0 things for you to do" is the joke.
  4. **Every element?** Rows, ticks, your card, tally, the number. Yes.
  5. **Stressed?** The plainest to read; it works without any media.
- **Ledger:** ⟦S1420⟧ ⟦S1434⟧ ⟦S0407⟧ ⟦S1428⟧ ⟦S1455⟧ ⟦S0400⟧.

### V3 · Filmstrip
- **What it is:** five frames slide **sideways** as you scroll down:
  - Look (a drawn house and lens);
  - Wrap (a sharp photo of a house mid-reroof, tarps on the lawn);
  - Roof (a 6-second silent loop of a nail gun on new decking, playing only while on screen);
  - Clean (a sharp photo of a crew clearing the drive);
  - Box (a drawn box).

  A step count and jump dots sit beside the heading.
- **Reference:** MERSI (chapters turned by scroll), as a horizontal strip.
- **Five questions:**
  1. **What is it for?** The job, frame by frame.
  2. **Under 3 s?** Yes.
  3. **Fun:** scrolling down moves the story sideways.
  4. **Every element?** Frames, captions, count, dots. Yes.
  5. **Stressed?** Yes, and calmer than a film.
- **Ledger:** ⟦S0448⟧ ⟦S1209⟧ ⟦S0409⟧ ⟦S1447⟧ ⟦S1457⟧ ⟦S0400⟧.

**All three:**
- carry only Owl facts: Wise Check, Protect Your Nest, GAF Systems Plus, the magnet sweep and the project manager's walk, the aftercare box, the 10-year workmanship warranty;
- make no time or price promises;
- tailor step 1 to the case chosen above.

## 3. AA pairs (Shingle Slate; all four palettes in `gates/fix/colour/palettes.json`)

| Pair | Contrast |
|---|---|
| Light text on the dark band | 13.78:1 |
| Copper-light step tags, rail and accent on the dark band | 7.05:1 |
| Dark text on the copper-light step tag | 7.05:1 |
| Secondary on the dark band | 8.41:1 |
| V2: ink on ground | 13.51:1 |
| V2: secondary text | 6.57:1 |
| V2: white tick on the slate box | 7.39:1 |
| V2: slate accent word | 6.70:1 |

Text over the film sits on a measured tint; axe passes in all four palettes.

## 4. Checks (`tools/fix-test.cjs nothing <v>` on `owl-roofing.html`): **V1 26/26 · V2 24/24 · V3 24/24**

**Every version passes:**
- axe 0 in all four palettes;
- the facts lock and no skeleton;
- distinct media (nothing here appears anywhere else);
- sharp at 1440 and 390 × DPR 2, measured at three to five scroll points;
- layout and 44 px controls;
- reduced motion;
- no errors.

**Behaviour checks per version:**
- **V1:** 4.5 screens, pinned; the scrub rises and falls with scroll (from a Blob URL); five beats and the "meanwhile" line follow; the tag reads "Illustrative footage" and nothing calls it Owl's crew; the rail jumps.
- **V2:** in flow; the list ticks 1 → 3 → 5 of 5 as you scroll; your line moves with your day; the Owl facts are listed; step 1 follows the storm case.
- **V3:** the strip slides sideways and back (steps 1 → 3 → 5 → 3); the loop plays only while its frame is on screen; two drawn frames and three tagged stock frames; the dots jump.

## 5. Defects found and fixed in-session
1. **V3: the jump dots sat over the first frame's caption.** They now sit beside the step count.
2. **V3: the strip had already slid at its first step,** cutting off the first frame, and the heading ran under the cards. The strip now holds still for the first and last 10 % of the scroll, and the heading is one line.
3. **V2: the fifth step never ticked** at the end of the section. It now ticks once the last row is well on screen.
4. **V3: axe read the captions against the page's light ground** under the moving, transformed strip. The cards now carry an explicit dark background, so the true contrast is measured.

## 6. Scorecard (Design 40 · Usability 30 · Creativity 20 · Content 10)

| | Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|---|
| V1 Scroll film | 8.6 | 8.4 | 8.6 | 8.6 | **8.54** |
| V2 Two lists | 8.2 | 8.9 | 8.2 | 8.8 | **8.47** |
| V3 Filmstrip | 8.5 | 8.3 | 8.5 | 8.5 | **8.44** |

**Recomputed:**
- V1: 3.44 + 2.52 + 1.72 + 0.86 = 8.54
- V2: 3.28 + 2.67 + 1.64 + 0.88 = 8.47
- V3: 3.40 + 2.49 + 1.70 + 0.85 = 8.44

## 7. The default: **V1 Scroll film**
- **The owner liked the two films used two ways:** one hero film, one scroll-based film ("both good, perfect"). V1 is the scroll film, now with **different footage**, so the owner's rule (no video twice) and his liking both hold.
- **It is the highest score** and the most immersive.
- **V2** is the fallback for slow phones and for readers who don't want motion. **V3** is the middle road: motion and sharp stills without a long film.

## 8. Remaining (named)
- **D1 · the footage is not Owl's.** It is honest stock, labelled. Owl's own clips of an inspection, the wrap, the magnet sweep and the box would let each beat show its own step.
- **D2 · the drone film is 1600 × 900:** sharp at 1440, upscaled 1.2× on a 1920 screen.
- **D3 · iOS is not tested on a device.** The Blob URL and priming follow WebKit's known behaviour, but only Chromium runs here.

## 9. Vetoes: **zero**
- Stock is labelled and credited.
- Only Owl facts.
- The logo is untouched.
- No sub-agents or background tasks; every command ran in my own thread, in the foreground, with a time limit.
