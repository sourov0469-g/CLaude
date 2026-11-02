# GATE: Home 9 · Towns

**Built:** ONE version, the owner's merge: mostly V4 (the van route from our office) with a little V1 (type your town) and V2 (survey marks that raise a name on a flag).
- **All 104 towns are shown at once**, as the owner asked. The Bruno reference sets the rule: explorable, with guards.
- **Files:** `remodeling/src/sections/towns.html`, `css/sections/towns.css`, `js/sections/towns.js`. Inherited slots are in git history (`ce59679`).

## What it is
- **Three equal ways to the same place:**
  - **Type it (V1):** a real combobox. Prefix matches come first, then contains; up to 8 options; arrow keys, Enter and Escape work.
  - **Point at the map (V2):** the nearest survey mark within reach raises its name on a flag, kept inside the map. Click to choose.
  - **Pick from the list:** all 104 names at once, county by county from north to south (Palm Beach 39, Broward 31, Miami-Dade 34), each county with its published count.
- **Choosing a town (V4, reviewed):**
  - the route is plotted from the office at 19 W Flagler St, with one rounded corner;
  - the van drives it once, facing its direction, with the duration taken from the route's length (0.7–1.6s, `power2.inOut`);
  - the town's mark, name and county light;
  - the answer reads "Yes, Doral. Doral is one of the 34 municipalities we build in across Miami-Dade, one of our three counties."
- **Guards (Bruno):**
  - one route at a time (a new choice kills the old drive);
  - the van only moves along the drawn route;
  - a clear control (×) and Escape: the first press closes the list, the second clears;
  - every pointer action has a keyboard path through the combobox.
  - A town not on the list gets an honest answer: "Not on our published list. We do not see 'Orlando' among the 104 municipalities we list." It is followed by the firm's own phone line, "you will get a real answer, not a callback form."
- **Arrival:** the pins land north to south as the map arrives (plan IN: "pins land").

## Facts check
- Towns, counties and the counts 34/31/39/104 are the firm's published lists (allowed under Muse ruling 6). The office address and phone are locked facts.
- The FAQ line is adapted with a colon in place of its em dash. Zero em dashes in the copy.

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity to the owner's merge | 8 | V4 route and van, V1 search, V2 flags; all 104 at once | |
| Interaction (explorable, guarded) | 9 | Measured: "dor" finds Doral, then ↓ and Enter; a map hover raises North Palm Beach and a click selects it; Orlando gives the honest answer; Escape clears | |
| Motion and flow | 8 | Pins land north to south; the van drives once, with length-based timing | The OUT seam (the county outline thins into the ink line) waits for the seams pass |
| Accessibility | 8 | Combobox with `aria-activedescendant`, a live answer, the map `aria-hidden` (the list and search carry the content), and 104 names as buttons outside the tab order | The list buttons are reachable by pointer and screen reader, not by Tab (deliberate; the combobox is the keyboard path) |
| Visual craft | 8 | One drawing language (county outlines, survey marks, office diamond, van) | The list runs taller than the map at 1440 (the Miami-Dade block ends below the fold) |
| Facts | 10 | Published lists and counts only | |

## Defects found and fixed across cycles
1. **Cycle 1:** the route's CSS dash pattern would fight the drawSVG dasharray. The route is now a solid clay line.
2. **Cycle 1:** "Our office" sat west of the office, so westward routes (Doral) drove across it. Moved east, to the ocean side. Re-rendered: clear.

## Defects remaining (honest)
- **Phone order:** after a search, the map (and the van) sit below the answer. The answer carries the result; the drive happens off-screen.
- **List density:** at 1440 the list is taller than the map.

## Skills applied
- **Interaction:** Bruno (explorable with guards); WAI-ARIA combobox (S1018); BANK Q576 (areas answer on hover, degrade to tap).
- **Motion:** S0362 (route drawn, then travelled).
- **Copy:** notes-G-H (honest answer for a town not on the list).

Render evidence: `qa/finalize/home-towns/`. Zero console errors at 1440 and 390; no horizontal overflow.
