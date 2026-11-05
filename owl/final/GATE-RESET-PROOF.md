# GATE-RESET-PROOF · Section 2 "What's going on up there?" (the proof section, reset method)

**Built on** `owl-reset.html` (the new single page, built by `reset/build.py`), inside the world shell and directly below section 1 (Arrival), so it is judged in place, not alone.

**Source:**
- `reset/sections/02-finder.html`
- the world: `reset/reset.css` and `reset/reset.js`
- the shell: `reset/template.html`

**Treatments:**
- **A · Owl today** (`?palette=control`: ink #17111D, amber #EAA221, cream #F1EFE6).
- **B · Night Owl** (the default: navy #0F1B2D, owl-eye gold #F5B83D, paper #F7F5F0).
- The Safety and Slate & Brass trials also run on the same tokens; axe passes in all four.

## 1. What it is (one homeowner sentence)
*Tell us what's going on with your roof, and we'll show you exactly what we'll do about it.*

- **The first act is a choice:** "What's going on up there?" with six real-photo pills:
  - A leak
  - A ceiling stain
  - Missing shingles
  - After a storm
  - It's getting old
  - Not sure
- **Choosing pulls the light gate upward with a curved edge** (an ellipse clip-path curtain, 1.15 s) and uncovers a full deep scene for *your* case:
  - the service named (never explained), with a two-line answer;
  - one plain line on what Owl does;
  - the photo in an arch;
  - a call button tailored to the case ("Call about my leak").
- **The six choices then dock into the top bar,** page-wide, so the case can be switched at any time (by click or arrow keys). The scene changes with it.
- **The case is shared with the rest of the page** (`sessionStorage` plus an `owl:case` event). The scroll scene (3) and the call panel (7) will be written for it.

## 2. Mechanism evidence: Quiet Cubes, studied live tonight
**The side-by-side:** `gates/reset/proof/mechanism-side-by-side.jpg`. It sets four Quiet Cubes frames beside four of mine at matching states.

| # | State | Quiet Cubes (live, `reset/evidence/quietcubes/`) | Owl section 2 |
|---|---|---|---|
| 1 | The first act is a choice | `quietcubes-000.jpg`: "Select Your Pod" plus a single row of image-and-label pills, and nothing else | `night-1440-3-gate.jpg`: "What's going on up there?" plus a single row of six photo pills |
| 2 | A curved curtain retracts upward | `qc-after-2.jpg`: the dark layer lifts with an elliptical bottom edge | `night-1440-4-curtain.jpg`: the light gate lifts with an ellipse edge, uncovering the deep scene |
| 3 | A full scene for the chosen case | `qc-after-3.jpg`: a full-bleed backdrop, a two-line headline, the object framed in an arch, a side line | `night-1440-5-scene-leak.jpg`: a deep backdrop, a two-line answer, the photo in an arch, the service and one line |
| 4 | The choice docks into the bar and can switch at any time | `qc-scroll-2.jpg`: the pills live in the top nav | `night-1440-6-scene-storm.jpg`: the pills live in the top bar, and the case changed to "After a storm" from the dock |

**Code facts:**
- **Quiet Cubes:** GSAP + ScrollTrigger + Lenis + Swiper, 27 sticky elements (`facts.json`). `choice.json` shows the pills are `a.pod-menu-button`, and the page carries one heading set per pod type, so the page is written per choice.
- **Mine:** CSS `clip-path: ellipse()` transitions, a `role="radiogroup"` in both the gate and the dock, and a shared case store that later sections read. No GSAP is needed for this mechanism.

**What does not transfer, and why:**
- **The blocking gate.** Quiet Cubes stops the page until you choose. Owl's gate sits after the film, the page above and below is reachable without choosing, and the call pill is always there.
- **Quiet Cubes' dark luxury ground.** The gate is light; the deep scene is the palette's anchor band.
- **The 3D pod and its configurator sub-steps.** One photo per case; the answer is one line.

## 3. Five-question homeowner check (from the screenshots, per treatment, before the checklist)

### Treatment B · Night Owl
**Screenshots:** `night-1440-*.jpg` and `night-390-*.jpg`.

1. **What is it for?** It lets me say what's wrong (a leak, a stain, a storm) and see straight away what Owl will do about it, with a call button made for my problem.
2. **Under 3 seconds?** Yes. A huge question and six choices with pictures, and nothing else on screen. On phone, it is a two-column grid of the same six.
3. **Interesting, playful or fun, and exactly what makes it so?**
   - The curtain: the light page lifts away in a curve and my answer is behind it, in a deep blue room with the photo in an arched window.
   - Then my choice moves into the bar at the top and stays with me.

   It feels like the page listened.
4. **Is every element there for a reason?**
   - The question, the six choices (one per real situation, with a "Not sure" escape), and the curtain (it marks "here is your answer").
   - The service tag (which job this is), the answer and one line, and the photo (real; Owl's crew where it is ours, otherwise labelled illustrative).
   - The tailored call, and the dock (change your mind without scrolling back).

   Complexity without a reason: none found. **Removed during the build:** the travelling owl crossing over content (it now appears only at seams), and the scene's own call button on phone, where it doubled the persistent pill.
5. **Does it fit a stressed homeowner?**
   - Yes: one tap from "I have a leak" to "we'll find it and stop it" plus a number.
   - No roof lessons; the service is named, not explained.

### Treatment A · Owl today (control)
**Screenshots:** `control-1440-*.jpg` and `control-390-*.jpg`. The same layout; the deep scene becomes ink-plum (#17111D) and the gate cream.

1. **What is it for?** The same.
2. **Under 3 seconds?** Yes, the same.
3. **Fun?** The same curtain moment, but the cream gate onto the plum scene is warmer and lower in contrast, so the reveal reads less like "a different room".
4. **Every element for a reason?** The same.
5. **Stressed homeowner?** Yes.

**My comparison:**
- Night Owl reads calmer and more trustworthy: the navy scene feels like an answer, and the gold call reads as the one thing to press.
- Owl today reads warmer but muddier, because the cream gate, plum scene and amber pill sit closer in tone.
- I keep **Night Owl as the working default**. The owner decides in the morning with the switch.

## 4. Skill ledger (per element, down to the buttons)
- **Question:** a display-type heading set at scene scale (no kicker, h2 or lede skeleton); ⟦S1434⟧ visual hierarchy.
- **Choice pills (gate):**
  - ⟦S1442⟧ form design;
  - ⟦S1107⟧ keyboard (a radiogroup with roving focus, arrows);
  - ⟦S1441⟧ 64 px targets;
  - ⟦S1446⟧ Jakob's law (pills read as choices);
  - ⟦S1444⟧ Hick's law (six real cases, one of them "Not sure");
  - GATE-BUTTONS lift, press and splash.
- **Curtain:** ⟦S0458⟧ a legible state change; ⟦S0441⟧ choreography (the curtain, then the dock arrives 0.5 s later); ⟦S1436⟧ long duration (1.15 s) for the one big moment.
- **Scene:** ⟦S1435⟧ one deviation (the gold call on navy); ⟦S1445⟧ interfaces that feel; real photography in an arch (Quiet Cubes' framing).
- **Tailored call:** GATE-BUTTONS primary (the label roll is relabelled in place per case, and its spoken name is updated).
- **Dock:** ⟦S1450⟧ navigation (a page-wide chooser); ⟦S1107⟧ keyboard; 44 px minimum.
- **Shared case:** ⟦S1455⟧ state machine (one state, many consumers).
- **Reduced motion:** ⟦S0400⟧. No curtain; the choice swaps at once.

## 5. Checks: `gates/reset/proof/checks.json` · **23/23 PASS** (`tools/reset-test.cjs finder`)
- **axe WCAG 2.1 A/AA:** 0 violations in **all four palettes** (Night Owl, Owl today, Safety, Slate & Brass).
- **Facts lock and the no-skeleton rule:**
  - only (651) 977-6027;
  - no Master Elite, A+ or Accredited;
  - no kicker-h2-lede opener and no Book + Call row.
- **The choice gate:** a question, six photo pills (a radiogroup), and no scene or dock before choosing.
- **The curtain:** mid-reveal (an animating ellipse clip-path).
- **The scene:** written for "A leak" (Roof Repair, the answer, Owl's crew photo, "Call about my leak, (651) 977-6027").
- **The dock and the shared case:**
  - the dock in the top bar, with the same case checked;
  - the case shared (stored, plus the `owl:case` event).
- **Switching:**
  - keyboard ArrowRight in the dock switches to "A ceiling stain", and the scene follows;
  - "After a storm" shows Storm Damage Help and an illustrative label.
- **Services:** every answer names a real Owl service from the site's own list; no prices, timings or guarantees beyond the locked warranty.
- **Layout:**
  - no sideways scroll at 1440, 768 or 390;
  - controls at least 44 px at 1440, 768 and 390 (fixed: the photo-only dock pills were 38 px wide).
- **Reduced motion:** the choice swaps at once; no looping animation.
- **No page or console errors.**

## 6. Scorecard (weights Design 40 · Usability 30 · Creativity 20 · Content 10)
The scores are written after the five-question check and the side-by-side, not before.

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.3 | 3.32 |
| Usability | 30 | 8.6 | 2.58 |
| Creativity | 20 | 8.4 | 1.68 |
| Content | 10 | 8.8 | 0.88 |
| **Total** | **100** | | **8.46** |

Recomputed: 8.3 × 0.40 + 8.6 × 0.30 + 8.4 × 0.20 + 8.8 × 0.10 = 3.32 + 2.58 + 1.68 + 0.88 = **8.46**. Pass: ≥ 7.0, lowest category 8.3 (≥ 6.0), zero vetoes (below).

**"Same kind as anything already on the page?"** No. Section 1 is a film moment; section 2 is an instrument. Neither opens with a heading block or ends in a button row.

**What the owner would say at first sight** (my honest guess from the screenshots): "This finally does something for me." His likely complaint: "the photos are small or soft, and the blue scene is a box". See the remaining defects.

## 7. Remaining defects (named, not fixed in this gate)
- **D1 · soft photos.** Most real case photos are about 560 px wide, so they are soft in a 460 px arch at 2× density. The fix needs larger originals of Owl's own photos (an image-needs list for the owner):
  - a leak repair;
  - an attic or ceiling stain;
  - missing shingles;
  - storm damage;
  - an older roof;
  - the crew on a roof.
- **D2 · the tailoring isn't visible yet.** The case is stored and announced, but its consumers (the scroll scene in 3 and the call panel in 7) are not built yet. "See how it goes ↓" stays hidden until section 3 exists.
- **D3 · the phone dock shows photos only** (labels show only on the chosen one). The dark thumbnails look alike. Fix: an icon per case, or a "Your case: A leak · change" chip on phone.
- **D4 · the deep scene is a static room.** Quiet Cubes' scene then scrolls into features. Owl's scene hands off to section 3 instead (once built), which is where the motion lives.
- **D5 · section 1 (Arrival) is built but not yet gated.** It is gated on its own once section 3 frames it from below.

## 8. Vetoes: **zero**
- **Facts:** only locked facts; services from the site's own list; one warranty claim (10-year workmanship, locked).
- **Photos:**
  - real only;
  - Owl's crew photos tagged "Owl’s crew";
  - non-Owl photos tagged "Illustrative photo";
  - the render images on the branch (`storm-*`, `layers-guarded`) deliberately excluded.
- **Logo:** the shape is unchanged (inlined, with its two fills mapped to palette tokens).
- **Colour:** Night Owl is the default on the new reset page only, by the owner's full-rights override. The old site keeps its colours.
- **Other lines:**
  - no dark page (the deep scene is a band; the gate and page are light);
  - no game;
  - nothing fetched beyond the live reference studies (no bot wall met or bypassed: Lusion was not attempted).

## 9. Process statement
- **No sub-agents and no background tasks were used.**
- Every command ran in my main thread, in the foreground, with a time limit (the longest was 235 s).
- Nothing was published.

## 10. New best: the default the homepage shows (owner's order, 05:15)
**The choice:** Section 2, the problem-finder as built and gated above, in **Night Owl**, is the new best. It is the version the finished homepage, `owl-roofing.html`, shows by default.

**What it stands in for:** **Explore** (15 versions and 2 backups) and **Services** (9 versions and 1 backup). Nothing was deleted. Every one of those versions is kept in the same file as **PAST**, an inert record of the whole past homepage, and opens with ?past&explore=15 · ?past&services=9 (any version number works). The past page carries a chip back to the new one.

**Treatments compared:** Night Owl and Owl today. Both pass; Night Owl is chosen at page level.

**Why this is the best:**
- Every past Explore version taught roofing, and every Services version listed services: both were documents to read. The new section asks the homeowner one question ("What's going on up there?") and answers with a scene for their case, naming the right service in the answer.
- It is the first act of the page, and its choice writes the rest: section 3's first beat, section 7's headline and the prefilled email.
- It is the only one of the candidates that took the reference's mechanism, not just its look (Quiet Cubes: the choice first, a curtain, the choice docked in the bar).
- **One palette for the whole page.** The sky and the owl run as one world, and a palette per section would break it. Night Owl is the working default under the owner's grant (contrast and reasoning in the diagnosis §5). The other three palettes stay one switch away in the top bar.

**Checks on the finished homepage:** this section's checks were re-run on `owl-roofing.html` itself, not only on the workbench page. They all pass (`checks.json` in this gate's folder).
