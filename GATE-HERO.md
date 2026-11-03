# GATE, homepage section 1: HERO (two versions)

> **VERDICT (owner, via Muse): REJECTED.** "Not even close to the references … very very bad." The owner wants the heroes sheet matched exactly. The cause is that the sheet is photoreal imagery and these versions draw the house and pieces in code.
> **Ruling:** Muse supplies high-res layered assets. Heroes 1, 2 and 3 of the sheet are picked.
> **Next:** the asset list is `siding/redo/build/ASSET-REQUEST-HERO.md`. The rebuild starts when the assets arrive.
> The work below is kept as the record of the rejected attempt.


**Governing documents:** AUSTIN-FINAL-DIRECTION-V2 (owner's final choosing, wins where it speaks), plus AUSTIN-REDO-BRIEF and AUSTIN-REDO-COMPLETION.

**Design authority:**
- the heroes sheet (torn and exploded house, wall over water);
- the materials pack (the quality bar: logo, buttons with slide-out tab, motifs);
- the logo deepdive (Stacked Lap A);
- the effects sheet (ripple trail, sweep scatter, stacking build, companion);
- the nav sheet, Headers 3 and 4 only.

**Process:** every step ran in this session's own thread. No sub-agents, no background tasks.

## 0. Research pass, reported briefly

**Live references.** All seven were reverse-engineered today, at code and frame level, in `siding/redo/REVERSE-ENGINEERING.md`: Immersive Garden, Igloo, Lusion, Bruno Simon, Scout, Graza and Apple. The direction's URL `immersive-garden.com` returns 521; the official site is `immersive-g.com`, the one studied.

What the hero takes from them:

| Reference | Mechanism adopted |
|---|---|
| Immersive Garden | The flowmap push: a soft, eased push (`mouseEase .4`, `dissipation .953`); pieces lift under the hand and settle back |
| Bruno Simon | The reveal from an origin and the spring settle (`back.out` feel) |
| Igloo | Depth: real 3D, kept light |
| Lusion | Return-to-rest physics |
| Apple / Scout | Build-order storytelling (a wall built course by course) |
| Graza | Tempo discipline |

**Skills pack.** The library is `5018604b-WEB-SKILLS.md`, identical to the earlier copy. Read today by tag:

| Read | Tags |
|---|---|
| In full | ⟦S0001⟧ frontend-design · ⟦S1344⟧ webgl-3d-object · ⟦S1323⟧ pointer-trail-emitter · ⟦S0056⟧ fixing-motion-performance |
| All rule sections | ⟦S0319⟧ threejs-performance · ⟦S0220⟧ anti-slop-design (banned matrix, axioms, 8-pt, radii) |
| Earlier today, still applied | ⟦S0063⟧ review-animations · ⟦S0089⟧ to-spring-or-not-to-spring · ⟦S0650⟧ taste-skill (hero rules) · ⟦S1320⟧ build-awwwards-quality-sites · ⟦S1501⟧ critique-visual-hierarchy |

## 1. The two versions (each a separate clean file, no switcher chrome)

| | V1, "the cut photograph" | V2, "the exploded house" |
|---|---|---|
| **File** | `siding/redo/build/out/hero-v1.html` (612 KB, fonts and photo embedded) | `siding/redo/build/out/hero-v2.html` (432 KB; three.js r160 from jsdelivr, the CDN the direction allows) |
| **Medium** | Canvas 2D on a genuine photograph of one of the firm's own jobs (`photo3`, a two-storey lap-sided house on a brick base) | Real WebGL 3D: 444 instanced pieces of a modelled house |
| **Torn state** | The photo is cut into lap boards course by course, with staggered butt joints. The boards hang scattered; behind them, the house wrap with studs at 16 in centres and nail heads | Every piece exploded in space around the wrap and roof deck skeleton: siding courses, corner boards, casings, sashes, glass, door, gable board-and-batten, rake trim, shingle courses, ridge |
| **Assembly (the loader's replacement)** | Bottom course first, the way siding is installed; done in about 1.9 s | True install order: siding bottom-up, then trim and windows, then the roof eave to ridge; done in about 1.9 s |
| **Cursor** | Moving through the photo pushes boards along the hand's path and away from it, lifting them toward you (water push, floaty springs). Leaving fixes the wall course by course | Pushes pieces off their own face (each piece knows its wall or roof normal, so nothing is pushed into the house) and along the hand's path. Leaving repairs the house in install order |
| **Click / tap** | Sweep scatter; on touch the wall comes home after 0.9 s | Sweep scatter; on touch, home after 0.9 s |
| **Layout** | Split: copy column on the living field (left), the cut photograph (right) | Full stage: the house high and right of centre, the copy as a caption band below (headline left, support and actions right) |
| **Mobile (390)** | Photo panel under the header, copy below; scatter kept inside the photo | House centred in a square stage, copy below |

**Shared by both:**
- **The Stacked Lap A logo.** Clean vector, nine courses stacked into the letter, with a darker butt edge per board. It holds as a solid A at 16 px.
- **The floating header** (Header 3, a solid paper board, not glass). On mobile, the board-end sticky bar (Header 4: Call, Book, Menu).
- **The materials-pack button.** It lifts, with a cream tab sliding out on hover; press is 110 ms in.
- **The subtle living field.** 9 to 10 of Austin's cut shapes (lap board, shake, batten, corner post, lap profile), pre-rendered sprites with a soft shadow, drifting slowly. The pointer parts them, and they return. The water ripple is emitted by distance travelled, not time (S1323), and kept off the copy.
- **The cursor companion.** An SVG corner-post character: it follows with lag, blinks, rolls its eyes toward the nearest button after 2.2 s idle, squints over the torn house, cheers on buttons, and squashes on press. It is not created on touch, and it ignores the browser's synthetic load move.

**Copy (37 words, budget 40):**
- "The full wall or the whole house." This is the firm's own published rule.
- "Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house." The second sentence is the firm's published line.
- "Book a free inspection" goes to the firm's live booking page (`/schedule-appointment`, checked: 200).
- "Call (512) 550-0000".
- "4.9 from 474 Google reviews".

## 2. Frame-by-frame self-audit: method, findings, fixes

**Method:** `tools/heroaudit.js`.
- A deterministic seek of the build at 0, 350, 700, 1000, 1400, 1900 and 2600 ms.
- A scripted stir, then a leave at 300, 900 and 2000 ms, measuring the summed displacement ("lift").
- Real-time capture and JS errors, at 1440 × 900 and 390 × 844.

Plus a live-mouse test (real pointer path through the art, out, button hover, keyboard Tab), reduced motion, and an iPhone 13 touch-tap test. WebGL ran on SwiftShader.

**Defects found and fixed:**

| # | Defect | Fix |
|---|---|---|
| 1 | V1 stir too weak: summed lift 62, no visible water | Push ×4 and along-path velocity ×9, softer stir spring. Lift is now about 700, back to 10 within 300 ms of leaving |
| 2 | Field shapes sat behind the button and rating | Keep-out zones around copy and art |
| 3 | V1 on mobile: the torn boards crossed the headline | Scatter clamped inside the photo on narrow screens |
| 4 | The companion appeared at (0,0) over the logo, from Chromium's synthetic load move | It waits for a real movement |
| 5 | V2 at 1440: the house overlapped the support column | Re-framed: half the stage height, centred at 64% / 35.5% |
| 6 | V2 first frame: the explosion filled the viewport over the headline | Spread cut by half, vertical clamp (never below the ground or into the header), smaller toward-camera spread |
| 7 | V2 build too slow (about 2.6 s+) | Release cadence 36 ms per install step and a stiffer spring; done in about 1.9 s |
| 8 | V2 stir: pushed boards vanished | Two causes: hit-testing used stale camera matrices (projected before `updateMatrixWorld`), and screen-right pushed boards into the wall on the turned house. Fixed with matrices updated before projection, plus a per-piece face normal: never into the wall, always lift off the face |
| 9 | Audit hook re-released pieces on each call, which looked like pieces never returning | Hook fixed; real input releases once |
| 10 | V2 on mobile: the house first sat under the header, then was tiny (framing factor inverted) | Corrected: the house fills 62% of the stage height, centred at 56% |
| 11 | V2 lap courses read flat; the ridge cap floated above the gable peak | Board tilt raised to 0.13 rad so each course throws a shadow line; ridge cap lowered and trimmed |
| 12 | V2 roof read as one grey sheet | Per-instance tone: shingles ±7%, boards ±2% |
| 13 | Ripple rings drew over the copy | Ripples avoid the copy column in both versions |
| 14 | The field was busier than "subtle" | 9 to 10 pieces, lower opacity, 0.62 scale on phones |
| 15 | Primary CTA pointed at `#book` (dead; veto) | Points at the firm's live booking page until the in-file booking panel exists |

**Measured after the fixes:**

| Check | Result |
|---|---|
| JS errors | 0 for both versions at 1440 and 390 (pageerror and console) |
| Horizontal scroll | None: `scrollWidth` equals the viewport |
| Assembly | V1 lift 13,108 → 2 at 1.9 s → 0. V2 15,474 → 1 at 1.9 s → 0 |
| Leave after stir | V1 back to 10 in 300 ms, 0 by 900 ms. V2 10 at 900 ms, 0 by 2 s |
| Live mouse | Companion on and squinting over the art, cheering on the button. Lift 0 after leaving. Button hover moves −2 px to `#2A4E6E`. Tab lands on "Siding" with a solid focus outline |
| Reduced motion | Both render the assembled state at once (lift 0, `built`); field static; no ripples |
| Touch (iPhone 13) | A tap scatters, then the wall comes home (lift 0); no companion |
| V2 cost | 12 draw calls, about 5.4k triangles, DPR capped at 1.75, loop stops when settled or offscreen (S0319, S0056) |

**Screenshots** (`siding/redo/build/shots/`):
- `v1-1440-sequence.jpg`, `v1-390-sequence.jpg`, `v2-1440-sequence.jpg`, `v2-390-sequence.jpg` (torn, mid-build, built, stirred);
- every individual frame in `v1/` and `v2/`, at 1440 and 390, with live, reduced and touch captures.

## 3. WEB-SKILLS tags, how each was applied

| Tag | Applied |
|---|---|
| ⟦S0001⟧ | The hero opens with the most characteristic thing in the subject's world: a wall being sided. One memorable element (the assembly) with quiet copy. No eyebrow, no all-caps labels, no middle-dot meta strings (the logo descriptor uses commas), no "→" on buttons, no single-word accent. **The one default the brief imposes:** the warm cream ground, near the AI-cream tell; the owner's direction wins. |
| ⟦S1344⟧ | V2: real geometry, perspective camera, PBR `MeshStandardMaterial`, key directional plus hemisphere fill plus rim, shadows on a ShadowMaterial ground, DPR cap, resize handling |
| ⟦S0319⟧ | One box geometry; `InstancedMesh` per material; `setAnimationLoop`; no allocation in the loop (reused vectors, matrices, quaternion); `PCFShadowMap` (not the deprecated soft map) |
| ⟦S1323⟧ | Ripples emitted by distance (34 px step), placed along the segment, capped at 6 per move against teleports. Gated to hover and fine pointers; nothing on touch; a still frame under reduced motion |
| ⟦S0056⟧ | Transform and opacity only in the DOM; canvas work in rAF with stop conditions (settled, offscreen via IntersectionObserver, hidden tab); no scroll-driven JS |
| ⟦S0089⟧ | Gesture motion is springs (assembly and return: stiffness 150–160, damping ratio 0.72–0.78; stir: soft spring 5–7) |
| ⟦S0063⟧ | Button hover 0.18–0.2 s with the strong ease-out; press 0.11 s in, release 0.22 s (asymmetric); slide-out tab 0.26 s; no `ease-in` on UI |
| ⟦S0650⟧ | Headline 2–3 lines; support 19 words (cap 20); actions visible without scroll at 1440; collapses to one column under 820 px |
| ⟦S0220⟧ | One primary CTA in the hero; no vanity stats (only the locked 4.9/474); 8-pt spacing steps; no gradient blobs, no glass, no emoji |
| ⟦S1320⟧ | Static first frame complete under reduced motion; Three.js used for depth with purpose; capped DPR; fallback to the genuine photo if WebGL fails |
| ⟦S1501⟧ | One primary emphasis per view: the headline. The art is the image; the CTA is the single filled control |

## 4. Scorecard

Design 40 / Usability 30 / Creativity 20 / Content 10. PASS requires a weighted score of at least 7.0, no category under 6.0, and zero vetoes.

### V1, the cut photograph

**Weighted 8.17 · PASS.**

| Category | Score | Evidence |
|---|---|---|
| Design | 8.0 | A genuine job photograph becomes the wall's own courses, with the wrap, studs and nails beneath: the most truthful image of the trade. Clean split composition; the headline holds. **Against:** the split layout is a familiar hero arrangement; the photo is 1,400 px wide, soft on a retina 880 px panel. |
| Usability | 8.3 | Copy is never covered on desktop; mobile scatter is confined; no WebGL dependency; reduced motion and touch handled; focus visible. **Against:** the field ripples are invisible on touch, by design. |
| Creativity | 8.0 | The photo *is* the siding, rebuilt bottom-up in install order; the house wrap shows where boards lift. |
| Content | 8.8 | Headline and second line are the firm's published wording; locked facts only; 37 words. |

### V2, the exploded house

**Weighted 7.88 · PASS.**

| Category | Score | Evidence |
|---|---|---|
| Design | 7.6 | A real 3D house from real parts (lapped courses, casings, a double-hung meeting rail, board-and-batten gable, shingle courses), lit and shadowed. **Against:** a modelled house is stylised beside a photograph, and can read as a model kit; the first 0.5 s at 1440 still grazes the support text. |
| Usability | 7.6 | Assembly done in about 1.9 s; text above the canvas at all times; fallback to the photo without WebGL. **Against:** WebGL plus a CDN load costs more than V1 on weak phones (untested on real devices here). |
| Creativity | 8.4 | The full install order performed, including the roof from eave to ridge; the face-normal push makes the water peel the house, never crush it. |
| Content | 8.8 | Same copy and facts as V1. |

### Vetoes, both versions

| Veto | Result |
|---|---|
| Fact error or invented proof | None |
| Placeholder as final | None in the hero. Nav anchors point to sections not yet built (nav polish is last in the order) |
| Contrast failure on body / CTA / labels | None: ink on cream 14.8:1; support `#454D56` on cream 7.6:1; white on steel 6.0:1; small grey `#6A737C` on white 4.8:1 |
| Broken layout at 390 / 768 | None at 390 (768 untested: next pass) |
| JS error | None |
| Dead primary CTA | Fixed (#15 above) |
| Swap Test | The siding wall and install order cannot be swapped to another trade |
| 3+ AI tells | None counted beyond the mandated cream |

**Vetoes: zero.**

## 5. Remaining defects, named honestly

1. **V2:** for about 0.5 s at load (1440), a few exploded pieces cross the first line of the support text. The text stays on top and readable.
2. **768 px** was not audited in this pass; 1440 and 390 were.
3. **Real devices.** Performance was measured only in a software-GL container (about 3 fps), so animation smoothness on real phones and GPUs is untested. All timing is simulation-time and correct; frame pacing on hardware is not proven here.
4. **The companion's switchable variants** (completion: 2–3) are not built yet: one variant (the corner post) ships. The switch belongs with the footer and nav polish.
5. **V1's photograph** is the firm's 1,400 px web image, soft at 2× on the 880 px panel (see the shot list).
6. **The nav links** are in-page anchors to sections not yet built. Header 3's sample-book dropdown is deferred to nav polish (last in the order).

## 6. Shot list (direction v2 §9: ask, never fake)

1. **V1 hero photograph, higher resolution.**
   - **Subject:** the same job as `photo3`, or another genuine finished Austin Pro job with clearly visible lap courses, the whole elevation in frame, and some sky above the roofline.
   - **Treatment:** genuine, unretouched apart from exposure; daylight.
   - **Size:** at least 2,400 px wide (it is cut into boards at 2× on a panel up to 880 × 790 CSS px).
   - **Where:** hero V1, the right-hand panel.
2. **V2 needs nothing.** The house is modelled in code. If Muse prefers V2's materials to read more real, a seamless, genuine photographic texture of painted fibre-cement lap face (about 1,024 px square, tileable) would let the boards carry real grain.

## 7. Stop

The hero is done for judgment. Waiting for Muse's verdict before the next section (services).
