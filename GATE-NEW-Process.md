# GATE-NEW · How a job runs · V2 "One house, eight marks"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 1, section 2 of 7. The Hero gate was accepted by Muse.

The default is unchanged: V1 (the dial, the owner's pick) stays version 1. Its code is untouched and no backups ship.

**How to see V2:**
- **Header switch.** Use the Process "1 · 2" switch in the header while the section is in view. On phones it is the "‹ 1/2 ›" stepper.
- **Built page.** `elbaz-homepage.html?process=2` opens V2 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Scout Motors** is the primary. Its story-as-sequenced-evidence is taken: each step of the process is shown as evidence left on the object itself, in order. It is rebuilt as Elbaz's own line drawing of one South Florida house.
- **Signature move:** evidence that stays.
  - One house is drawn full width. Dragging along its ground line runs the job through the eight stages: the conversation on the lawn, the flood line and a look behind the wall, the dimensioned design, the scope bracket, the permit board with its stamp, the scaffold and framing, the inspection checks, and the keys at the door.
  - Each stage leaves a numbered mark on the drawing. The marks accumulate, so the finished house carries the whole job, and any mark takes you back to its stage.
- **Style family:** an animated architectural elevation (storybook line drawing, one scene that accumulates). This replaces V1's iconographic instrument dial.
- **The owner's laws for this section:**
  - tight: about one screen, no pin, no long scroll;
  - no right-side animation: the scene is full width and centred, with the copy above and below it;
  - real interactivity: drag, play and pause, stops, keys, marks;
  - the owner's own round-2 direction is met in a short form: eight frames, frame 1 a person doing a consultation, a high-quality drawing.
- **WEB-SKILLS tags per element:**
  - **Scene:**
    - S0362: strokes before fills, line drawing that draws itself;
    - S0083: staging, one focal point (the current stage full, earlier stages step back);
    - S0062: stroke offsets and opacity only;
    - S1306: removal test (no tree, no sun, no ornament).
  - **Ground scrubber:**
    - S1018: draggable accessibility (keyboard parity: arrows, Home and End on the stops);
    - S1441: 44px stops;
    - S1326: one continuous, reversible value;
    - S1443: drag and tap on touch.
  - **Play:** S0089 (system-driven playback uses easing); a pause control is always present (WCAG 2.2.2, via S0049).
  - **Caption:** S0666 (hierarchy: number, weeks, title, line); S1425 (text on paper, never on the drawing's busy areas).
  - **Reduced motion:** S0400 (no autoplay, no drawing; stages switch instantly).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 (the dial, the owner's pick) is a ring of eight icon nodes on the right with a text card on the left: you choose a stage and read about it. V2 shows the job happening to a house.
  - **Why it is better.** The stages become visible consequences: the permit board stays in the yard, the flood line stays drawn, the checks stay on the work. A homeowner can see what "permitted correctly" means without reading eight paragraphs, and it is full width, with no side panel.

## What was built
**Files:**
- `remodeling/src/sections/process.html`: V2 added after V1 in the existing version system (`.ver[data-v="2"]`).
- `css/sections/process.css`: a V2 block appended.
- `js/sections/process.js`: a `2:` definition beside `1:`, reusing the section's one list of the eight stages (`ST`, the firm's own lines).
- V1 is untouched.

**The drawing:** one elevation, 1200 × 460 units.
- **Stage 0, before the job:** the existing house in grey and the ground.
- **The eight layers:**
  1. **Consultation:** two people on the lawn, one of ours in a hard hat, with speech bubbles.
  2. **Site evaluation:** a flood line that stays; a lens showing what is behind the wall (studs and a pipe); hurricane-zone wind at the roof.
  3. **Design and planning:** the new openings drawn in dashes (until the framing replaces them); a dimension line that stays; a pencil.
  4. **Proposal and scope:** what is included (accent bracket and tint), what is not (dashed grey bracket), and where a contingency is likely (a "?" diamond at the wall).
  5. **Permitting:** a permit board in the yard with its stamp; a product tag on the new opening.
  6. **Construction:** scaffold and a crew member (passing); framing in the openings (until closed up).
  7. **Quality review:** checks that stay on the work; an inspector with a clipboard (passing).
  8. **Completion and handover:** the house closed up in ink with the roof in the accent, the new openings lit, and the keys passed at the door.
- **How the layers behave:**
  - A stage's people and tools are on screen only while it is current.
  - What a stage leaves behind stays, and steps back to half strength once you move on: one focal point.
  - Each stage leaves a numbered mark. Click or tap any mark to return to that stage.

**One value runs it:** `v` from 0 to 7.
- Stage i builds as v goes from i−1 to i: strokes draw on, then fills.
- The value is continuous, so a drag scrubs the drawing itself.

**Controls:**
- **The ground line is the control.** Eight 44px stops on a rail that fills to the current stage, with a knob.
- **Drag** (mouse or touch) is continuous and settles on the nearest stage.
- **Tap or click** a stop to go to it. The tween draws through the stages in between.
- **Keyboard:** one Tab stop (roving); arrows step one stage, Home and End go to the ends.
- **Play the job and Pause.** Arriving in view, the house and the first conversation draw themselves and the job plays through once. Any touch of a control stops it. Off screen it pauses. "Play again" at the end.

**Caption** (a live region): number, weeks pill, stage name and the firm's line for that stage.

**Phones:** the frame follows the work. The view pans to where each stage happens (the lawn, the wall, the yard, the opening), so nothing is drawn at postage-stamp size. Marks scale up so their numbers read at 13px or more.

**Reduced motion:** no autoplay and no drawing; every control switches the stage at once. Play steps one stage.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Process V2** | **7** | **8** | **8** | **9** | **7.7** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 2.8 + 2.4 + 1.6 + 0.9 = 7.7.

| category | evidence | why not higher |
|---|---|---|
| **Design 7** | **One material system:** ink lines, sand ground hatch, the clay accent only for us (hats, jackets, the scope, the stamp, the checks, the finished roof).<br>**One focal point per stage (S0083):** the current stage at full strength, the past at half.<br>**Composition:** full width with the copy above and below, no side panel. The section is one screen tall at 1024 and 1440 (755 and 744px on 900px screens) and about one screen on phones (805 to 843px on 800px screens).<br>**Removal test (S1306):** no tree, no sun, no scenery. Every drawn object is a fact from the stage's own line. | The people are simple line figures: clear and friendly, not illustration-grade. At 1440 the drawing letterboxes inside a wide frame, so there is paper either side. The finished house is a modest elevation, not a showpiece. |
| **Usability 8** | **Targets (S1441):** stops are 44 × 44 at 360, 390 and 414 (the narrowest phones were measured and fixed to exactly 44). 0 text under 13px; the SVG mark numbers are 13.7 to 14.9px on phones. 0 overflow.<br>**Drag (S1018, S1443):** drag from stop 1 to 6 lands on 6, on mouse and on touch.<br>**Keyboard:** arrows, Home and End verified. Marks take you back (verified).<br>**Play (WCAG 2.2.2):** pause holds; playback stops off screen; autoplay runs once.<br>**No pin:** the page end is reached; the pin audit shows the home page unchanged (12/12 across both versions and 6 widths).<br>**Reduced motion (S0400):** all controls work instantly. | The marks are pointer-only (the stops are the keyboard path, so nothing is lost, but a keyboard user gets no "jump to mark"). On phones the follow-view means a mark of an earlier stage can be off screen at stage 8; tapping a stop is the way back there. |
| **Creativity 8** | A move the site did not have: the process as accumulating evidence on one drawing, scrubbed by its own ground line. It fulfils the owner's round-2 wish (eight frames, consultation first) without the long pinned scroll they later rejected. | Line art only. A richer illustration style (texture, shading) would lift it, but at the cost of file weight and the site's drawn-sheet language. |
| **Content 9** | **The eight stages** (names, weeks, lines) come verbatim from the section's existing list (FACTS.md "The eight-stage process").<br>**Every drawn object maps to the firm's own line:**<br>• flood zone, HVHZ and what is behind the walls;<br>• the written scope of what is included and not, with contingencies;<br>• permits and the Notice of Acceptance;<br>• one point of contact and inspections;<br>• the walkthrough and the handover.<br>"Timelines vary by scope and jurisdiction" is kept.<br>Locks **0 fails**; outside links **0**. | The lead line "One house, from the first conversation to the keys. Drag along the ground, or press play. Every stage leaves its mark." is my UI wording. Muse should confirm it. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V2 at 1440, 1024, 768, 414, 390 and 360, swaps 1→2→1→2, the single file);
- no images involved (pure SVG);
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **Class collision with Our Work.** The first prefix `pj__` is already used by the Our Work section on the same page. Its `.pj__track { display: flex; width: max-content }` squeezed the ground control to 200px. Renamed to `jh__` across the version.
2. **The existing house did not draw.** Walls, door and windows were missing; only the roof showed. Chromium reported a wrong `getTotalLength()` for `<rect>` (2400 for a 940 perimeter), which broke the stroke draw-on. Fixed: every rectangle is emitted as a path (rounded ones as arc paths).
3. **The drawing was too tall at 1440**, so the caption fell below the first screen. Fixed: the drawing height is clamped (`clamp(300px, 41svh, 460px)`) and letterboxes; the section is now 744px on a 900px screen.
4. **Mark ① showed faded on the first stage.** Its fade formula topped out at .6. Fixed.
5. **The inspector stood on mark ②.** The inspector and mark ⑦ were moved apart.
6. **At 360 the eight stops were 43px wide.** The track gives up its side padding on the narrowest phones: exactly 44px.
7. **Phone mark numbers rendered at about 10px** (the drawing is scaled about .78). Marks scale 1.35× on phones: 13.7px or more.

## Defects remaining (honest)
- **Figures** are simple line people. They fit the drawn-sheet language but are not illustration-grade characters.
- **Desktop letterbox:** on very wide screens the drawing sits in a wider paper frame.
- **Marks** are pointer and touch only. On phones at the last stage some earlier marks are outside the following view; the stops cover both.
- **Autoplay** runs once per page view; there is no setting to turn it off apart from reduced motion and the pause button.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Scout Motors, primary)
- **Transferred:**
  - the process told as sequenced evidence, with each step proving itself on the object;
  - steps that accumulate rather than replace;
  - one calm, technical drawing language.
- **Not transferred:**
  - the vehicle, 3D or WebGL;
  - video;
  - dark palettes;
  - configurator mechanics;
  - long pinned scroll stories (the owner ruled them out for this section).
- **Other annex entries:** OH Architecture's numbered process chapters are reflected only in the numbered marks. It was not used as a governing reference.

## Comparison with the section's previous best (V1, the dial, the owner's pick)
| | V1 · the dial (default) | V2 · one house, eight marks |
|---|---|---|
| **Composition** | Two columns: card left, a ring of eight icons right | Full width: heading above, the drawing, the ground control, the caption below |
| **What a stage is** | A label and an icon on a ring, with the firm's line in a card | Something that happens to a house and leaves evidence on it |
| **Interaction** | Click, hover or arrows on the ring; previous and next | Drag the ground continuously; stops, arrows, Home and End; marks; play and pause; autoplay once |
| **Length** | About one screen | About one screen (no pin) |
| **Where V1 still wins** | It is compact and calm, and you see all eight names at once around the ring | V2 shows one stage name at a time (the stops are numbered) |

**My call:** V2 is a genuine challenger. It is the first version of this section that shows what each stage actually does, and it keeps to the owner's "tight, no weak right-side animation" rule. V1 is the quicker read of all eight names. The defaults are not changed; the owner picks.

## Evidence (`qa/new/process/`)
- `v2-1440-eight-stages.jpg`: all eight stages at 1440, each with its caption.
- `v2-390-eight-stages.jpg`: all eight stages on a 390 phone, with the following view.
- `v2-768-stages-1-5-8.jpg`: the tablet at stages 1, 5 and 8.
- `v2-single-file.jpg`: V2 picked through the header switch inside the delivered single HTML file at 1440 and 390.

**Interaction runs (1440 mouse, 390 touch, 1440 reduced motion):**
- autoplay on arrival;
- pause holds;
- drag from stop 1 to 6;
- tap stop 3;
- Arrow Right, End and Home;
- mark 5 takes you back;
- play to the end;
- playback stops off screen;
- the page end is reached;
- 0 errors.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
