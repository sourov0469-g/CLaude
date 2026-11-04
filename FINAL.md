# Final site · the owner's picks (2026-11-04)

The owner chose one version per home section and asked for everything else to be cleaned up. The delivered file is
`remodeling/site/elbaz-construction.html`: one self-contained HTML file with the five pages. Every home section now
carries exactly one version, so the header shows no version switch anywhere. The other versions left the source; they
remain in git history.

| Section | Kept | What it is |
|---|---|---|
| Opening (Hero) | V1 | The owner's mix: the drafted house, the kitchen through the roof window, the reveal rail |
| Proof, Services, Before and after, What homeowners wrote | (one version each) | Unchanged |
| How a job runs | V1 | The dial (the owner's earlier pick; not named this time, so kept) |
| Financing | V2 | The money map: project, partner and repayment joined by ribbons |
| Our work (portfolio) | New: the portfolio wall | Hero V2's gallery wall, made into the portfolio (below) |
| Reviews | V1 | The constellation: 4.8 in stars, gathered by the scroll |
| Service area | V2 | The table: the three counties as a tilted map with search |
| Consultation | V2 | One question at a time, as a conversation |

## Our work · the portfolio wall
The owner liked Hero V2's wall and asked for it as the portfolio, changed to suit a portfolio rather than an opening.
- **The copy sits above the wall:** "Our work", the H2 "Our own photographs. Every room, finished." and one lead line.
  The CTA, 4.8 · 343 and the licence sit under the wall.
- **Three bays:** the wall hangs in three bays, Kitchens, Bathrooms and Whole homes, each under a paper plaque on a
  picture rail. Each photograph keeps its own proportions (justified rows), so tall bathroom photographs stay tall.
- **The camera (wide screens):** as the section rises, the camera stands back from the middle bay to the whole wall,
  scrubbed by the scroll with no pin.
  - The bay buttons ("The whole wall", "Kitchens", "Bathrooms", "Whole homes") step up to a bay.
  - A photograph is flown to and named: plan-room code, room and the firm's title. Then "Open large", previous and
    next, or "Step back".
  - Arrow keys walk the wall as it hangs; Escape steps back. The pointer leans the camera a little and names the
    photograph under it.
- **Phones and narrow screens:** the wall hangs at full width in the page; a tap opens the photograph large, and the
  bay buttons bring a bay into view.
- **Reduced motion:** no scrub, no flight, no lean; the same wall and every action.
- **Facts:** the same photographs and titles as before; the two photographs whose subject does not match their title
  stay out (owner item); no counts are printed.

## Checks on the final file
- touch suite 33/33 (updated to the kept versions);
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow, 0 errors;
- the hero's pinned scroll at 360 to 1440: 6/6 (one hero now, so 6 rather than the earlier 12);
- locks 0 fails; outside links 0; em dashes 0;
- single file: 0 errors, 38 images, 0 broken; no version switch shown; every home section has one version.

## Tooling
`remodeling/src/tools/keep_version.py <section> <version>` keeps one version of a home section and removes the others
from its markup, CSS and JS (used for every section above except Our work, which was rebuilt).
