# GATE-FINAL-VIDEO · section 2, "Our Crew, Up Close" (ONE final version)

**Sources merged:** OLD Video V3 (3D lean toward the cursor, the film's colour spilling into the page behind it, hover sheen; NOT its roofline progress strip) + OLD Video V4 (black-and-white film with a colour circle; the image arriving in pieces that are replaced) + the best of OLD Video V5 (twelve pieces, "Scatter It Again", moments to jump to).
**File:** `src/final/sections/02-video.html` · **Evidence:** `gates/final/video/` (`s-1440.png`, `s-390.png`, `intro-mid.png`, `lens.png`, `checks-video.json`).

## 1. Think first: one idea
Three ideas gave one story: *the film is assembled in front of you, drains to black and white, and you look closer with a colour lens.*
1. The screen leans a few degrees toward the pointer (V3), with a sheen that follows it.
2. When the section scrolls into view the film arrives as twelve tilted pieces that fly in and lock together (V5); the pieces are then replaced by the real film (they fade, the colour drains to black and white).
3. A colour lens (V4) follows the pointer, a finger drag, or the arrow keys; left alone it wanders, so a phone visitor sees the idea without touching.
4. The film's own colour spills as a blurred glow behind the screen and tints the section background (the "overlay that changes colour with the image", V3).
5. Five moment chips (V5) jump to a moment; "Scatter It Again" replays the arrival.

Audit of the ideas, and what changed because of it:
- V4 drew a greyscale film with `ctx.filter`, which Safari ignores. **Fixed:** the film is black and white by CSS on the video; the lens is a small canvas disc of the true-colour frame on top.
- V5 painted 12 canvases every frame. **Fixed:** the pieces paint only during the arrival and are removed after.
- Lens coordinates would be wrong under the 3D lean. **Fixed:** the lens reads the pointer in the canvas's own coordinates (`offsetX/Y`).
- The V3 progress roofline and the YouTube "Watch the Full Film" button are dropped (the button played the same footage: same video twice).
- A phone lens cannot be hovered. **Fixed:** finger drag moves it (`touch-action: pan-y` keeps scrolling), and the idle wander.
- The film is 960 × 540, so the screen is capped at 960 px (exactly 1.00× at desktop, 0.73× at DPR 2 on phones: sharp).
- The film plays from a Blob URL decoded once (the iOS fix); the same footage is not used anywhere else on the page.

## 2. Five questions (homeowner)
1. **What is it for?** See the real crew at work.
2. **Under 3 s?** Yes: a film assembling, "Our Crew, Up Close".
3. **Fun?** The colour lens; the pieces arriving; the screen leaning.
4. **Every element earns its place?** Heading, one line, film, lens, caption, pause, five moments, replay. Yes.
5. **Stressed?** Nothing to read; it just plays; the moments are plain labels.

**Skill ledger:** ⟦S0385⟧ one small canvas, light spill · ⟦S1330⟧ damped tilt · ⟦S1107⟧ chips are buttons · ⟦S0544⟧ causal motion · ⟦S0451⟧ title reveal · ⟦S1273⟧ moments written out.

## 3. Checks (`node tools/final-test.cjs video`): **24/24**
axe 0 · facts lock · no maps · distinct media (page-wide) and nothing shown twice · one film from a Blob URL, no strip, no full-film button · twelve pieces, five moments · pieces show during the arrival and are replaced · the lens follows the pointer and paints the film · arrows move the lens · the screen leans · the page takes the film's colour · a moment jumps the film and is marked · pause works · sharp at 1440 (1.00×) and 390 DPR 2 (0.73×) · layout and 44 px controls at 1440/768/390 · reduced motion (film paused, no pieces) · no errors.

## 4. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.5 | 8.4 | 8.8 | 8.6 | **8.54** (3.40 + 2.52 + 1.76 + 0.86) |

## 5. Defects found and fixed in-session
1. A replay inside the first arrival lost its pieces: the first arrival's timer still fired. The timer is now cancelled on replay.
2. On phones the caption sat over the whole small film. It now shows the title only; the chips carry the rest.

## 6. Remaining
- **D1:** iOS Safari not run here (Chromium only); the Blob URL, `playsinline` and muted autoplay follow known WebKit behaviour.
- **D2:** the film is 960 × 540, so the screen does not grow past 960 px on large monitors. A higher-resolution original from Owl would allow a wider screen.

## 7. Vetoes: **zero**
Owl's own film only; no stock; facts exact; logo untouched; no maps.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
