# GATE-RESET-3 · Section 3 "Here's your part: nothing." (pinned scroll scene)

**Where:** on `owl-reset.html`, directly after the proof section (2), whose case it reads. Source: `reset/sections/03-nothing.html`.

**The film:** a scrub-ready re-encode of Owl's own crew film (`src/assets/crew-scrub.mp4`, a keyframe every 8 frames, 2.19 MB). It now serves both section 1 and section 3, so there is one film on the page.

**Treatments shown:** Night Owl (the default) and **Safety** (palette rotation, per the map). The control and Slate & Brass also pass axe.

## 1. What it is (one homeowner sentence)
*Once you call, we do the whole job; your part is nothing.*

- **The stage:** a section 5.4 screens tall with a sticky full-screen stage. Owl's crew film fills it under a palette tint, with one line set at scene scale: **"Here's your part: nothing."**
- **Scroll scrubs the film** (its `currentTime` follows scroll progress, forward and back) and moves through five beats, one idea each:

| Beat | Line | Owl facts |
|---|---|---|
| 1 · Look | **Written for your case** from section 2: "We find your leak first." / "We look above your stain first." / "We check the storm damage first." / … ("We look closely first." if none was chosen) | Wise Check: the roof and the attic, with photos and video for you |
| 2 · Wrap | "We wrap your home and lawn." | Protect Your Nest: mesh from the eaves down and a tarp over the lawn |
| 3 · Roof | "We fix it, or put on your new roof." | For a new roof: GAF materials, installed by our GAF Systems Plus certified crew |
| 4 · Clean | "We clean up, three times." | The crew, a magnet sweep for nails, then the project manager's walk |
| 5 · Box | "We leave you a box." | The aftercare box, left with you when we go, backed by our 10-year workmanship warranty |

- **A rail** (Look · Wrap · Roof · Clean · Box) shows where you are; each entry is a button that jumps to its step.
- **A chip, "Meanwhile, you:",** changes with the beats: make coffee, go to work, pick up the kids, make dinner, open the front door.
- **A thin gold progress line** runs along the bottom.
- **What this section replaces:** Wise Check, Protect Your Nest and the process steps used to be three separate explainer sections. They are now five beats of one scene.

## 2. Mechanism evidence: Apple AirPods Pro, studied live tonight
**The side-by-side:** `gates/reset/s3/mechanism-side-by-side.jpg`. AirPods frames are on the left; mine are on the right, at matching scroll states, with the film time printed on each.

**The AirPods probe** (`reset/evidence/airpods/airpods-scrub.cjs` and `scrub.json`):
- A `sticky-element` stage inside a host 2,250 px tall.
- Its film's `currentTime` at scroll 0 / 20 / 40 / 60 / 80 % was 2.69 → 3.50 → 4.30 → 4.90 → 4.90 s.
- **Scrolling back up returned it** to 4.90 → 4.30 → 3.50.
- That is a reversible scroll-scrub, not autoplay-in-view. The page-wide probe (`facts.json`) also records 12 sticky stages, 564 scroll-linked changes and 16 videos.

**Owl section 3** (`gates/reset/s3/scrub-log.json`):
- Scroll 10 / 30 / 50 / 70 / 90 % gives film 1.54 → 4.64 → 7.76 → 10.87 → 14.00 s, with beats 1 → 5.
- **Back to 50 % returns it to 7.81 s** (reversible).
- Built with native `position: sticky` (no scroll hijacking) and `requestAnimationFrame` seeking only when the change exceeds one frame.

**What does not transfer, and why:**
- **Apple's white product stage and product renders.** Owl's subject is real crew footage under a palette tint.
- **Twelve pinned stages.** Owl has two pinned moments on the whole page (the arrival film and this scene), so the scroll stays the visitor's.
- **Apple's feature-dense copy.** One line per beat.

## 3. Five-question homeowner check (from the screenshots, per treatment)

### Night Owl
**Screenshots:** `night-1440-*.jpg` and `night-390-*.jpg`.

1. **What is it for?** It shows me that after I call, Owl does everything (look, wrap, roof, clean up, leave a box) and I don't have to do a thing.
2. **Under 3 seconds?** Yes. "Here's your part: nothing." over real crew footage says it before any beat is read.
3. **Interesting, playful or fun, and exactly what makes it so?**
   - Scrolling plays the crew's film like a flip-book.
   - The beats change with it.
   - The "Meanwhile, you: make coffee / pick up the kids" chip is a small joke that lands the point.
   - The first beat repeats my own problem back to me ("We find your leak first.").
4. **Is every element there for a reason?**
   - The headline (the promise), the film (proof it is real work), the five beats (what happens), and the rail (where am I, and skip ahead).
   - The "meanwhile" chip (the point of the section: you do nothing), and the progress line (how far to go).

   Complexity without a reason: none found.
5. **Does it fit a stressed homeowner?** Yes. It removes the fear of a big messy job by showing it is handled, with the call pill always in reach.

### Safety (orange)
**Screenshots:** `safety-1440-*.jpg` and `safety-390-*.jpg`.

1–2. **Purpose and speed:** the same.
3. **Fun:** the same moment; "nothing." turns safety-orange, which reads more urgent and less calm.
4. **Every element for a reason:** the same.
5. **Stressed homeowner:** yes, but the orange adds urgency to a section whose job is calm.

**My comparison:** Night Owl suits this section better. Gold on navy reads "relax, it's handled"; orange on charcoal reads "act now". Safety may suit an emergency or storm page better than the home page.

## 4. Skill ledger
- **Stage:**
  - ⟦S0448⟧ sticky storytelling;
  - ⟦S1325⟧ scroll-progress timeline;
  - ⟦S1209⟧ scrolljacking limits (native sticky, nothing hijacked, a jump rail);
  - ⟦S1447⟧ video loading (a poster until metadata loads).
- **Scrub:** ⟦S0458⟧ every state legible; seeking only when the change exceeds 1/30 s.
- **Beats:** ⟦S0409⟧ swap (rise in, rise out); ⟦S1434⟧ hierarchy (the step tag, then the line, then the facts).
- **Beat 1 tailoring:** ⟦S1455⟧ shared state (the case from section 2).
- **Rail:** ⟦S1107⟧ keyboard; ⟦S1441⟧ 44 px; `aria-current="step"`.
- **"Meanwhile, you":** ⟦S1445⟧ interfaces that feel.
- **Progress line:** ⟦S1457⟧ progress.
- **Reduced motion:** ⟦S0400⟧. No film is loaded or scrubbed, the poster stays, and the beats still follow scroll.

## 5. Checks: `gates/reset/s3/checks.json` · **22/22 PASS** (`tools/reset-test.cjs nothing`)
- **axe WCAG 2.1 A/AA:** 0 violations in all four palettes.
- **Facts and skeleton:** the facts lock passes, and the no-skeleton rule passes.
- **A pinned stage:** the section is at least 4 screens tall, with a sticky stage.
- **Five beats follow scroll,** and the rail and the "meanwhile" line follow.
- **The scrub:** film time rises with scroll and falls back when scrolling up.
- **The beats are Owl facts:** Wise Check, Protect Your Nest, GAF Systems Plus, the magnet sweep and the project manager, the aftercare box, the 10-year warranty; no price or timing.
- **Beat 1:**
  - with no case chosen it reads "We look closely first.";
  - choosing "After a storm" in section 2 makes it "We check the storm damage first.".
- **The rail jumps** straight to "Clean".
- **Layout:** no sideways scroll at 1440, 768 or 390; controls at least 44 px at 1440, 768 and 390.
- **Reduced motion:** no film loaded and the beats still follow; no looping animation.
- **No page or console errors.**

## 6. Scorecard (weights Design 40 · Usability 30 · Creativity 20 · Content 10)

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.5 | 3.40 |
| Usability | 30 | 8.3 | 2.49 |
| Creativity | 20 | 8.6 | 1.72 |
| Content | 10 | 8.4 | 0.84 |
| **Total** | **100** | | **8.45** |

Recomputed: 8.5 × 0.40 + 8.3 × 0.30 + 8.6 × 0.20 + 8.4 × 0.10 = 3.40 + 2.49 + 1.72 + 0.84 = **8.45**. Pass: ≥ 7.0, lowest category 8.3, zero vetoes.

**"Same kind as anything already on the page?"** No. Section 1 is a film moment, section 2 an instrument, and section 3 a pinned scrubbed scene. The film is shared, but section 1 plays it and section 3 hands it to your scroll.

**What the owner would say at first sight** (my guess): "That's the feeling I wanted: real crew, and I do nothing." His likely complaint: "the film doesn't show the wrap or the box" (D1).

## 7. Remaining defects (named)
- **D1 · words and pictures don't always match.** Owl's film shows framing, decking and shingles being carried up. Beats 1 (look), 2 (wrap) and 5 (box) are not on film. Needed from the owner: short clips of an inspection, the wrap going on, the magnet sweep and the box on a doorstep. Each beat would then scrub its own clip.
- **D2 · scrub smoothness is only tested headless.** The keyframe every 8 frames is a size and smoothness trade-off. On slow phones a seek can lag by a frame or two. It is not verified on a real device.
- **D3 · length.** 5.4 screens is long for an impatient visitor. The rail and the always-present call pill soften it, but a shorter 4-screen version may be better (owner's call).
- **D4 · the film is 960 × 540,** so it is soft on large screens. Owl's original footage at higher resolution would fix it.

## 8. Vetoes: **zero**
- **Facts:** only locked facts and the site's own Protect, Wise Check and process wording; no time or price promises.
- **Footage:** real Owl footage, labelled "Owl's crew film". The film covers only what it shows; the beats are words, not captions claiming the footage shows them.
- **Logo:** unchanged.
- **Colour:** a light page; the deep stage is a band.
- **No game.**
- **No sub-agents or background tasks:** every command ran in my thread, in the foreground, with a time limit.
