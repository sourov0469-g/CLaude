# GATE PHASE 1a: Owl Roofing brand recovery and audit

**Deliverable:** `owl/phase1/brand-recovery.html`. It is rendered from Owl's own files in `owl/assets/source/` and
`owl/recon/`.

**Basis:**
- **Scope:** a rebuild, not a rebrand (owner, via Muse). Owl keeps its logo (unchanged), its name and its live colours.
- **Method:** Phase 1 is brand recovery, then design directions built on the kept identity.
- **How the work was done:** by me, in this thread, with no sub-agents and no background tasks.

**Skills read in full for this gate** (rules logged in `owl/skills/SKILL-READ-LOG.md`):
- ⟦S0607⟧ brand-extract
- ⟦S0011⟧ brand: main text, logo-usage rules, colour-palette management
- ⟦S0444⟧ company-logos
- ⟦S0659⟧ anti-ai-slop
- ⟦S0660⟧ colour craft
- ⟦S1418⟧ colour-system
- ⟦S0001⟧ frontend-design

## What was recovered (measured, not guessed: ⟦S0607⟧)
- **Logo:** `owl-roofing-logo.svg` (#17111D + #EAA221) and `owl-logo-white.svg` (#F1EFE6), byte for byte from the live
  source.
  - Geometry measured with getBBox. The O is 57.6×50.1 in a 185×75 viewBox. Clear space x = 0.668 × lockup height
    ⟦S0011⟧.
  - The eyes (paths 9-10) and pupils (paths 11-12) are separate shapes. That allows blink and glance in place with no
    redraw.
- **Colours:** frequency-ranked from `main.min.css`, Bootstrap defaults removed.

  | Colour | Hex | Uses |
  |---|---|---|
  | olive | #666B53 | 82 |
  | ink | #17121D | 35 |
  | cream | #F1EFE6 | 34 |
  | paper | #FCFBF5 | 33 |
  | amber | #EAA222 | 30 |
  | deep olive | #36402D | 21 |
  | bark | #3F3130 | 18 |
  | tan | #987861 | 13 |
  | night olive | #282F21 | 4 |

  - All 81 text/ground pairs were measured (the matrix on the board is computed live from the hex values).
- **Type:** Special Gothic Expanded (display, open licence; the woff2 is saved in `owl/recon/`) and Texta (body,
  commercial; kept in scratch only, not committed).
- **Material:**
  - **Video:** the hero video (15.6 s, mp4 + webm) and four Owl YouTube videos, verified by oEmbed.
  - **Owl photography:** both founding families, Noah, the crew, the Protect Your Nest system photographed (the
    catch-all wrap and the "shingle tomb").
  - **Badges and drawn backgrounds:** two badges, and Owl's own SVG backgrounds (tree-ring contours, pine treeline).
  - **Labelled stock and unproven photos:** kept apart and labelled.
- **The live homepage:** rendered from its own source (9,001px, 1,360 words) as the "before".

## Options considered and selections
| Decision | Options | Selected | Why (evidence) |
|---|---|---|---|
| Display face | Special Gothic Expanded (Owl's own) · Montserrat 800 · Poppins 700 · Roboto 700 | **Montserrat 800/700** | The owner's standing rule is everyday fonts only. In the specimen (`font-specimen.png`), Montserrat is the closest staple to Owl's extended grotesque, and its spaced caps sit beside the logo's "ROOFING" almost seamlessly. Named as a stand-in, per ⟦S0607⟧. |
| Body face | Texta (Owl's own) · Lato · Inter · Open Sans | **Lato 400/700** | Closest to Texta's warm humanist tone. Inter reads colder; Open Sans is plainer. |
| Accent | amber · olive | **amber = the one accent; olive = the brand primary** | Amber is the logo's only colour and the live site's CTA fill. ⟦S0660⟧: one accent at 5-10% of pixels, at most 2 visible uses per screen. Olive is the most-used live colour (82 uses), so it carries bands and primary surfaces. |
| Amber's role | text · fill | **fill only on light grounds; text only on dark** | Measured: amber 2.09:1 on paper, 1.88 on cream. Ink on amber 8.49. Amber on deep olive 5.03, on bark 5.72, on ink 8.49. |
| Tan | text · graphic | **large text and graphics only** | 3.90:1 on paper fails body text. |
| Icon-only logo | crop the O · none | **none: Owl's own favicon.jpg stays** | Cropping is an absolute don't ⟦S0011⟧, and the logo artwork is never redrawn (addendum). |

## Self-ratings
These are against the brief's scorecard, the skills, and the gate standard for a recovery phase.

| Check | Rating | Evidence |
|---|---|---|
| Everything traces to measurement (⟦S0607⟧ "never guess") | pass | Each colour is listed with its live use count. Logo geometry was measured with getBBox. Contrast was computed from hex values. Fonts come from the @font-face list. |
| Logo rules (⟦S0011⟧) | pass | Logo files byte-identical. Approved grounds shown, plus one WRONG plate (full colour on ink: only the eyes survive). Clear space and 120px minimum stated. |
| Colour discipline (⟦S0660⟧, ⟦S1418⟧) | pass | One accent named. Every pair measured. Amber and tan restrictions set from the numbers. |
| Honesty about gaps | pass | Bot wall stated (not bypassed). Stock and unproven photos labelled. Texta not committed. |
| Board design quality (the scorecard's Design / Content) | minor | A clean, functional record. It is evidence, not a showcase; the showcase starts with the directions (Phase 1b). |
| AI tells on the board itself (⟦S0001⟧ list) | minor | Section numbers ("1 · …") are a real sequence, so allowed. One middle-dot separator per heading remains, as a document convention. |

## Defects found and fixed in this gate
1. **Video box:** the hero video box took its size from the poster image. Fixed: 16:9 box with `object-fit:cover`.
2. **Footer SVG:** Owl's footer SVG rendered as an empty panel. It is a #36402D treeline on a transparent ground, now
   shown on cream.
3. **An unverified claim:** "amber text on cream appears in places" was not yet checked. Checked against the stylesheet:
   8 rules set amber as text. The line now states exactly that (2.09-2.17:1 on light grounds).
4. **Specimen whitespace:** the specimen image carried empty space; cropped.
5. **New finding added to the audit:** the live hero poster (`happy-homeowners…jpg`) is not a frame of the footage.

## Defects remaining (honest)
- **Reference study incomplete.** Captured with frames and a code digest: Scout Motors, AirPods Pro, Graza, Quiet Cubes,
  MERSI, Cowboy.
  - Lando Norris and Lusion stopped after 2 frames; Bruno Simon after 0 (WebGL). Longbow was not reached when the order to
    stop background work came.
  - These are captured in the foreground at the start of Phase 1b, before any direction uses them.
- **No Owl before/after pair found yet** on the homepage or About page. Owl's blog and other pages still need a
  foreground look before falling back to the permitted non-branded material.
- **Owl's own typefaces cannot carry over.** This is the one place the rebuild visibly differs from the live identity,
  and Muse may overrule it.
- **The board is evidence, not a designed showcase.** That bar applies from Phase 1b on.

## Next (no waiting)
Phase 1b:
- Finish the annex captures in the foreground.
- Write the reference teardowns.
- Build 2-3 design directions on Owl's kept identity (layout, motion, SVG system, structure), each with an annex
  reference card.
- Rate them, pick one, and write `GATE-PHASE-1.md`.
