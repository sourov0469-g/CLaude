# Austin Pro Siding: brand document (Phase 2)

**Source of truth.**
- Tokens: `tokens.json` (W3C DTCG) and `tokens.css`.
- Marks: `../marks.py`.
- Icons: `icons.py`.
- Board: `../phase2-identity.html`.

**Rule of use.** When this document and the board disagree, this document wins. Fix the board.

## 1. Idea

> Cut a lap-sided wall at the corner and every board shows its edge. We drew the house with that edge, in one line, the way a course is laid.

The brand is one drawn line. It forms the mark, runs on under the name (the course-line lockup), and lays itself under section headings across the site. Nothing else is drawn for decoration.

**Voice.**
- Plain and exact, like a good estimate.
- Short sentences; numbers only in their locked wording.
- No superlatives or claims that can't be checked, and no exclamation marks.
- Title case is used only for the name. Headings are in sentence case.

## 2. Name and facts

- **Name:** exactly "Austin Pro Siding". Never abbreviated in running text.
- **Facts:** use only the lock in `PROGRESS-V2.md`, in its exact wording. For example: "312 on the map with photos + 574 more counted", "4.9 stars from 474 reviews".
- **Forms:** never claim a form was sent or saved.

## 3. Mark (C1 The Profile House)

**Construction.**
- A house outline on a 64-unit box.
- The left wall is solid: a straight inner face and an outer face that steps out at every board butt. The full mark has 4 courses; the variant has 2.
- The gable and right wall are one 5-unit stroke with mitred corners.

**Sizes.**
- Full mark: 48 px and up.
- 16 px variant: 32 px and below. It has 2 deeper laps and a 7.5-unit line.
- Smallest horizontal lockup: 24 px tall.

**Clear space.** One course height (1/8 of the mark's height) on all sides. Nothing enters it.

**Colours.**
- Steel-9 on white, or on any light surface at or below neutral-3.
- White on steel-9, steel-12 and black.
- Black on white.
- Never steel on steel-8 or on photos. On a photo, use a solid plate.

**Lockups.**
- **Horizontal:** mark + name in Montserrat 800. The gap from the mark to the name is 21.6 units: from the right wall's outer edge at 56.4 to the name at 78, about a third of the mark's width.
- **Stacked:** mark above the centred name.
- **Course-line lockup:** the mark's base runs on under the name. Use it once per page, in the header.

**Never:**
- stretch, rotate, outline or recolour it;
- add effects;
- set the name in another font;
- redraw the laps.

**Motion.** The line draws on with stroke-dashoffset in 560 ms (`--ease-draw`), then the name fades in over 180 ms. Total 600 ms, once per load. Under reduced motion it is static.

## 4. Colour

**Palette.** Black, white and steel only. The steel ramp is OKLCH hue 248, steps 1–12; the neutral ramp is the same hue, steps 1–13. Components read semantic tokens only (`--color-*`), never primitives.

**Proportion.** About 70 white, 14 neutral, 10 steel and 6 black on a page.
- At most one steel field (`--color-bg-accent-field`) per page.
- At most one filled steel action per view.

**Errors.** There are no status colours. An error is shown with:
- an icon;
- the word "Check";
- a sentence saying what to fix;
- a 2 px border in `--color-error-ink`.

**Contrast.** Every pair the system renders is measured: 28 of 28 pass (`contrast-pairs.md`, re-measured live on the board).
- Steel-8 and neutral-8 are never used for text.
- The steel field and the evening field never get lighter than steel-9, so white text on them is at least 5.96:1.

## 5. Type

**Fonts.**
- Montserrat 800 for display and the name.
- Montserrat 700 for card headings.
- Inter 400, 600 and 700 for everything read.
- Tabular figures.

**Scale.** Fluid, with `clamp()` between 360 px (base 16, ratio 1.2) and 1440 px (base 18, ratio 1.25).

| Role | Size | Notes |
|---|---|---|
| display | 47.8–68.7 px | |
| h1 | 39.8–54.9 px | |
| h2 | 33.2–43.9 px | |
| h3 | 23.0–28.1 px | |
| lead | 19.2–22.5 px | |
| body | 16–18 px | |
| label / small | 13.3–14.4 px | Labels are uppercase with +0.06em tracking. |

- Body measure: 60–70 characters.
- Never set body below 16 px.

**People's names (generation-test gap 1).** In signatures and the crew list:
- the name in Inter 700;
- the role in Inter 400, after a middot;
- sentence case for the role.

## 6. Space and layout

**Spacing.** Carbon ladder in px: 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160 (`--space-01` … `--space-13`). Related items take 8–16; groups take 32–48; sections take `--layout-section-pad` (64–160 px fluid).

**Layout.**
- Content width: 1240 px.
- Gutter: 16–32 px (16 at phone width).
- Columns: 12, or 4 at phone width.

**Radius.**
- 0 by default: siding is cut square.
- 2 px on buttons, inputs and tiles. This includes the touch-icon tile at every size (generation-test gap 4).

## 7. Icons

- A closed set of 26, on a 24-unit grid with a 2-unit stroke, butt caps and mitred corners.
- Names: `icon-[category]-[name]`.
- Sizes: 16, 20, 24, 32, 48.
- Every icon has a text label or is aria-hidden.
- Tap targets are at least 44 px.
- New icons follow the grid. Nothing comes from an outside icon library.

## 8. Motifs

- **Course line.** One lap step, then level.
  - 3 px, `--color-accent-line`.
  - Under a section heading it lays itself once on entry: 600 ms, `--ease-draw`.
  - **On vehicles (generation-test gap 2):** at sill height, the full length of the vehicle, steel-9, never crossing a handle.
- **Lap band.** The wall in section, laid flat. A hairline divider between sections; decorative.
- **Shadow-line field.** Courses with a shadow line under each butt. A light texture that fades out behind copy.
- **Corner cut.** Photos are cut square with one mitred steel corner bracket, top left.
  - Captions sit on a black plate and give the place only, for example "Rob Roy, Austin. The firm's own job photo." No month, until Muse rules.

## 9. Backgrounds

| Background | Where it goes | Notes |
|---|---|---|
| B1 Course field (light) | Behind light sections | Fades out behind copy. |
| B2 Steel field, ordered dither | The one steel section per page | Never lighter than steel-9. |
| B3 Section drawing (dark steel) | The wall-assembly chapter | The wall in section, labelled. |
| B4 Evening field | The last section and the footer only | Never lighter than steel-9. |

B2 and B4 drift slowly. They stop under reduced motion, when off screen and when the tab is hidden. Device-pixel ratio is capped at 1.5.

## 10. Components

**Buttons.**
- Primary is filled steel-9: one per view, 48 px tall.
- Secondary is white with a neutral-9 edge (6:1).
- Text links are steel-11 and underlined.

**Inputs.**
- 48 px tall, with a neutral-9 edge.
- Labels sit above the field. Placeholders are never used as labels.
- Errors are shown as set out in §4.

**Other parts.**
- **Chips:** 44 px tall. The selected chip is steel-2 with a steel-11 ring.
- **Job card:** a corner-cut photo, a label, the place in h3, and a small note: "The firm's own job photo."
- **Proof:** facts in their locked wording only; credentials as text, with no third-party logos.
- **Accordion:** 56 px summary rows. The plus icon turns to a cross.
- **Navigation:** course-line lockup, the pages, and one primary "Book" action.

**Print (generation-test gap 3).**
- Business cards and other print carry the phone, email and address only.
- Ratings and credentials stay off print, because they date.

## 11. Motion

**Durations.** 50 / 100 / 200 / 300 / 600 ms. Under reduced motion every duration token is 0 ms at `:root`.

**Easings.**
- `standard`;
- `enter`;
- `exit`;
- `draw` (a line being laid);
- `settle` (a board landing; overshoot never past 1.05).

**Rules.**
- One mover per view.
- Animate only transform, opacity and stroke-dashoffset.
- Nothing loops except B2 and B4.

## 12. Cursor companion (variant A, the course tick)

- A 10 px steel square follows the pointer with a short lag (lerp 0.22 per frame).
- Over a link or button it becomes a 3 px course line under the target, across the target's full width.
- Pressing scales it to 0.92.

**Constraints.**
- Fine pointers only. The system cursor is never hidden.
- `pointer-events: none` and aria-hidden.
- Under reduced motion it snaps, with no lag.
- Variants B (corner bracket) and C (lap chip) are on the board as the rejected options.

## 13. Design dials

| Dial | Setting |
|---|---|
| Variance | 4 |
| Motion | 5 |
| Density | 4 |

Their reasons are on the board.
