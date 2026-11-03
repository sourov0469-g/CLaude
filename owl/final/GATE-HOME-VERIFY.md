# GATE · Homepage verification (owner's order via Muse, 2026-11-03) · STOP for verdict

**What was verified:** the homepage exactly as a visitor gets it: `owl/final/owl-roofing.html` opened with **no query string**.
Default view = the accepted **V1 of every homepage section**, one version per section; the `?review` switcher stays hidden.
Work on inner pages is halted: the unfinished Service Area round (R10) was taken out of the build and saved as
`owl/final/wip/R10-service-area-UNFINISHED.patch` (not built, not reviewed). The file was rebuilt from the committed sources
(byte-identical to the R9 commit) before verification; the only changes since are the three fixes listed below.

## Evidence (`owl/final/gates/home-verify/`)
| File | What |
|---|---|
| `HOME-full-desktop-1440.jpg` | whole homepage, 1440 px wide (10 635 px tall) |
| `HOME-full-tablet-768.jpg` | whole homepage, 768 px (first tablet capture of this build) |
| `HOME-full-phone-390.jpg` | whole homepage, 390 px |
| `SEC-00-header.jpg` … `SEC-11-footer.jpg` | one image per section at 1440 (header, 10 sections, footer); header hidden in section shots so it never covers content |
| `checks.json` | the 49 recorded checks with results |

Captures were made after scrolling the page top to bottom like a visitor, so scroll-triggered pieces (count-up, flaps, road
ride) are in their arrived state. Tools: `tools/home-verify.cjs` (checks), `tools/home-shots.cjs` (evidence), `tools/axe.cjs`.

## Page-level results
- **Default view:** exactly one version visible per section, all V1 (10/10). Review switcher hidden. Title "Owl Roofing ·
  Shoreview, MN · We Give a Hoot".
- **Links:** all 11 in-page links on header, homepage and footer resolve; **every section anchor now lands below the sticky
  header** (9/9 measured: section top 84 px = header bottom 84 px). Phone and email links are only `tel:+16519776027`
  and `mailto:info@owlroofing.com`.
- **Facts scan:** no "(651) 867-2961", no "Master Elite", no "A+"; reviews only as "5.0 · 90+ reviews".
- **Layout:** 0 px sideways scroll at 1440, 768 and 390.
- **Reduced motion:** loads cleanly, rain off, crew film not autoplaying.
- **Errors:** no page or console errors in any run. **Accessibility (axe, WCAG 2.1 A/AA): 0 violations.**
- **Weight and speed (local file):** 5.32 MB single file (fonts, images and the 1.7 MB crew film inside; YouTube loads only
  on play). DOMContentLoaded 342 ms, load 406 ms, layout shift 0.000.
- **Total: 49/49 checks pass.**

## Per section (live version · checks run · result · defects · score)
| # | Section · live version | Interaction checks (default view) | Result | Score D/U/C/Ct → weighted |
|---|---|---|---|---|
| 1 | **Hero · V1 "Under Our Wing"** | Storm test toggles on; rain canvas is drawing and stops at the owl's wings | Pass | 8.2 / 7.8 / 8.4 / 8.0 → **8.10** |
| 2 | **Video · V1 "Watch the Crew at Work"** | crew film has a source and plays muted; "Finished roof" chip seeks to 9.5 s and marks itself; play loads YouTube `ehKLv5DF2TQ` (iframe verified; YouTube itself is blocked in the test sandbox) | Pass | 7.8 / 8.2 / 7.2 / 8.0 → **7.82** |
| 3 | **Explore · V1 "Layer by Layer"** | Decking lifts exactly one slab and names it | Pass | 8.0 / 8.0 / 7.6 / 8.0 → **7.92** |
| 4 | **Wise Check · V1 dial + glass cross-section + checklist** | all four ticked: needle at PROTECTED (118°), CTA glows; Start again resets | Pass | 8.0 / 7.8 / 8.0 / 7.8 → **7.92** |
| 5 | **Protect Your Nest · V1 "Same Storm. Different Ending."** | storm at 92 reads "Hail and wind", unprotected house shakes, shield glows | Pass | 8.2 / 7.8 / 8.4 / 7.8 → **8.08** |
| 6 | **Services · V1 split-flap board** | flaps settle to ROOF REPLACEMENT; row 3 shows "Storm damage help" | Pass | 8.2 / 7.6 / 8.4 / 8.0 → **8.04** |
| 7 | **Reviews · V1 dial** | counts to 5.0; Trusted tab flips the face to BBB A− / GAF | Pass | 8.0 / 7.8 / 7.6 / 8.4 → **7.94** |
| 8 | **Service area · V1 Route Ribbon** | "Stillwater" confirms and draws the road; "Duluth" gets the call-and-ask path | Pass (2 defects fixed, below) | 8.0 / 8.2 / 8.0 / 8.2 → **8.08** |
| 9 | **We Give a Hoot · V1 two families** | "Give a hoot" draws feathers | Pass | 8.0 / 7.6 / 7.8 / 8.4 → **7.94** |
| 10 | **Booking · V1 booking page + light footer** | empty submit names "name"; complete submit opens the email app and never claims sent | Pass | 8.0 / 8.4 / 7.2 / 8.4 → **8.00** |

Every section passes (weighted ≥ 7.0, no category under 6.0, zero vetoes). Homepage average **7.98**.

## Defects found in this verification
**Fixed (3):**
1. **Anchor jumps hid section tops under the sticky header** (all widths): "Book a Wise Check", "Watch the Crew", "See Our
   Services" and the nav links scrolled the section heading under the header. Fixed with a scroll margin on every section;
   all 9 anchors re-measured clear.
2. **Route Ribbon: the selected town's label collided with the owl rider** (desktop). The selected label now lifts clear
   of the owl and is bold.
3. **Route Ribbon: town labels were hard to read over the road and trees.** Labels now carry a cream halo.

**Open (for Muse; not changed, by the halt order):**
1. **Header "Services", "Wise Check" and "About", and footer "Protect Your Nest", lead to inner pages that have not been
   verified.** Those pages exist in the file (R6–R9). Options: keep the links, or point them at homepage anchors until the
   inner pages pass their own verification. Your call.
2. **Hero owl artwork** is cut from the approved sheet hero-best1 (soft edge at its shadow), as recorded at R1.
3. **Tablet 768:** the hero trust row wraps "Founded 2025" onto its own line (cosmetic).
4. **Phone 390:** the Route Ribbon road is small (the town chips below it do the work and are full size).
5. **Video:** full playback depends on YouTube; offline tests can only confirm the correct embed is inserted.
6. **Protect Your Nest V1:** a few eave drips remain on the protected house (the porch waterfall was removed at R3).

## STOP
Homepage verification ends here. No About page, no new sections and no inner-page work until Muse returns the verdict.
