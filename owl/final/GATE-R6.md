# GATE · Final build · Round 6 · Pages inside the one file + Services page (two versions each)

**File:** `owl/final/owl-roofing.html` (4.6 MB, everything inside). Open the Services page with `#/services`
(`owl-roofing.html?all=2#/services` for its V2s; `?review` still switches versions). Screenshots: `gates/r6/`.

## Pages inside the single file
- A small router shows one page at a time: `#/` (home) and `#/services` now; the other pages slot in the same way.
- Plain anchors still work from any page: "Book a Wise Check" on the Services page goes to the homepage booking section;
  "Back to top" stays on the current page. The header marks the current page (`aria-current`), the tab title changes per
  page, the browser Back button works, and pages open at the top.
- Shared **"Start with a Wise Check" band** closes each inner page (locked facts only).

## Services page sections
### Section 1 · Page hero
- **V1 · "Roofing Services, Start to Finish"** (from services-best3's clean list, made physical): five tall photo panels
  side by side. Hover, focus or tap one and it **opens wide** to show the service, three plain "what's included" lines and
  "Book a Wise Check"; the others narrow to their vertical names. On phones the panels stack and the open one grows.
- **V2 · "Pick Your Roof Job"**: five 3D tiles with custom trade icons (roof, hammer and shingle, storm cloud, dial,
  siding). Choosing one (arrow keys work) swaps the photo card: the service, a line about it and three ticked inclusions.
### Section 2 · How a roof replacement runs (seven steps, told with Owl's own named parts)
Wise Check → Plan and materials (GAF) → The wrap (Protect Your Nest) → Tear-off and decking → The new roof (GAF Systems Plus
Certified crew) → Three cleanup passes (crew, magnet, project manager) → Aftercare box and the 10-year workmanship warranty.
- **V1 · Scroll timeline:** the steps light up along an amber rail as you scroll; a sticky dial on the left fills as a
  ring and swaps to each step's icon. Pressing a step jumps to it.
- **V2 · Shingle course stepper:** seven dark shingle tabs laid like a course. Press one (or use the arrows) and **it
  tilts up in 3D** and turns amber; the tabs before it stay amber; a card shows the step's icon and text.

## Content rules
Inclusions use locked facts (GAF Systems Plus Certified, Protect Your Nest's wrap, three cleanup passes and aftercare box,
10-year workmanship and up-to-50-year manufacturer warranties) and Owl's own published wording for the Wise Check ("a
detailed roof and attic evaluation, clear photo and video documentation, and leak detection tools"). Other lines are
plain descriptions with no promises.

## Verification
- **Interaction test** (`tools/interact6.cjs`): header link opens the Services page at the top with `aria-current`; panel 3
  opens on hover; the timeline badge follows the steps; the CTA band's "Book a Wise Check" lands on the homepage booking
  section; the logo returns home; Back works; the V2 picker shows the Wise Check inclusions; the stepper marks earlier steps
  done. **No page errors.** Rounds 1–5 tests still pass.
- **Accessibility** (axe, WCAG 2.1 A/AA): **0 violations** on the Services page in V1 and V2, and on the homepage.
- **Phone (390 px):** no sideways scroll (measured 0 px overflow); two phone layout defects fixed (tile overflow, panel
  number overlapping the title).

## Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Section · version | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|
| Services hero V1 opening panels | 8.0 | 7.8 | 7.6 | 8.2 | **7.88** |
| Services hero V2 picker | 7.8 | 8.2 | 7.2 | 8.2 | **7.84** |
| Process V1 scroll timeline | 7.8 | 8.0 | 7.4 | 8.4 | **7.88** |
| Process V2 shingle stepper | 8.0 | 7.8 | 8.2 | 8.4 | **8.02** |

All pass; zero vetoes. **WEB-SKILLS:** ⟦S1450⟧ navigation-patterns (router, breadcrumb, current page) · ⟦S1325⟧
scroll-progress-timeline (V1 rail and ring) · ⟦S1457⟧ zeigarnik-effect (steps marked done) · ⟦S1444⟧ hicks-law (five
services, one open) · ⟦S1440⟧ feedback-patterns · ⟦S0070⟧ better-accessibility (tablists with arrows, axe 0) · ⟦S0659⟧
anti-ai-slop (Owl's own wording for the Wise Check) · ⟦S1496⟧ critique-brand-consistency.

**Recommendation:** Hero V1 and Process V2. **Next:** the Wise Check page (#/wise-check), then Protect Your Nest, About,
Service Area and Contact.
