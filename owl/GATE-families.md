# GATE · Our families (home §6): two versions

**Where it lives:** `owl/site/owl-roofing.html`. Switch versions with `?v=families:1|2`. **Default: V1.**

**Reference:** Cowboy.
- **What transfers:** people-in-use warmth through real photography, chaptered proof (01 Origins…), a restrained
  palette.
- **What never transfers:** bikes, the rider map, the press-logo strip, Cowboy's type.

**Background:** B2 Rings (Owl's own tree rings), the assigned ground for people sections.

**Content rules:**
- Every line is quoted from Owl's About page: the founders' story, "We're building a nest…" and the three values.
- Captions use only Owl's own labels ("The Browns", "The Berglands", Noah Bergland as co-founder per the facts lock).
- **Left out:** "15+ combined years" (not in the facts lock) and the Browns' agency (not relevant to the homeowner).

## V1 · Birds of a feather roof together
- **The heading** is Owl's own: "Birds of a feather roof together."
- **Left:** both families together in a large photo.
- **Right:**
  - The story, as two quoted lines, with an amber rule.
  - Noah Bergland on the job, in a round portrait.
- **Below:** Owl's values (Generosity, Humility, Integrity), each with Owl's own one-liner.

## V2 · Chapters
"We're building a nest." Three chapters in a horizontal scroll-snap track:
1. Origins
2. The families (the Browns and the Berglands)
3. Values

It has previous/next buttons (disabled at the ends) and a keyboard-scrollable track.

## Ratings
| | V1 | V2 |
|---|---|---|
| Design (40) | 7.5 | 7.0 |
| Usability (30) | 8.0 | 7.5 |
| Creativity (20) | 7.0 | 7.0 |
| Content (10) | 9.0 | 8.5 |
| **Weighted** | **7.70** | **7.30** |

**How the two compare:** V1 shows everything at once, in Owl's own words. V2 hides two chapters behind horizontal
scroll.

**Vetoes:** none. No overflow at 1440 or 390; no JS errors; all quotes are Owl's.

## Tests: 6/6 pass (`famtest.mjs`)
- The previous/next state is correct at both ends.
- Next scrolls exactly one chapter.
- The track scrolls by keyboard (ArrowLeft).
- No errors.
- After the frame-component fix, the nest photos keep 4:3.

## Defects found and fixed
1. **Noah's portrait** rendered as a 96×596 ellipse: the image's `height` attribute beat `aspect-ratio`. Fixed, and the
   same latent bug was fixed **in the frame component** (`height:auto`), so every framed image keeps its ratio.
2. **My own first keyboard test used Home**, which does not scroll a horizontal scroller. It was corrected to the native
   ArrowLeft, which passes; the page was not changed.
3. **The track step** hard-coded a 24px gap in JS. It now reads the computed gap.
