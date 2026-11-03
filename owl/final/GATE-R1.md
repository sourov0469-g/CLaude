# GATE · Final build · Round 1 · Hero + Video (two versions each)

**Governing:** `refs/owl-final-package/OWL-15X-FINAL-DIRECTION.md` (owner-approved 2026-11-03) and the 36 judged sheets in
`refs/owl-final-package/`. Delivery is ONE file: `owl/final/owl-roofing.html` (3.02 MB; fonts, images and the crew film are
embedded; YouTube loads only when a visitor presses play). Sources: `owl/final/src/` (build with `python3 src/build.py`).

**How to judge both versions in the one file:** open `owl-roofing.html?review` for a version switcher, or use
`?hero=1|2&video=1|2` (`?all=2` shows every V2). Default is V1.

## Screenshots (`gates/r1/`)
`R1-desktop-V1-hero-under-our-wing+video-watch-the-crew.jpg` · `R1-desktop-V2-hero-peel+video-up-close.jpg` ·
`R1-phone-V1.jpg` · `R1-phone-V2.jpg` (1440 px desktop, 390 px phone, full page).

## Shared systems built this round
- **Header:** the real Owl logo (source SVG, unchanged), Services · Wise Check · Reviews · Areas, (651) 977-6027 as a tap-to-call link,
  amber "Book a Wise Check"; floating cream bar; phone menu below 1020 px.
- **3D buttons (small 3D only, per the no-big-3D rule):** amber pills with a raised edge, a deeper lift on hover, a pressed state,
  and a magnetic lean toward the pointer (interact-01 "Magnetic Button").
- **Cursor Owl companion (interact-01 "Cursor Owl"):** an ink, amber and cream SVG owl that follows with a soft lag, tilts with
  speed, looks where you move, blinks, and reacts per element: **hoot** (tilts up) on calls to action, **peek** (ducks) on
  secondary links, and a **speech tag** on interactive objects ("Peel it back", "Turn the ring", "Press play"). Off on touch screens.
- **Version switcher** for review only (`?review`), invisible otherwise. Reduced motion respected everywhere.

## Section 1 · HERO
### V1 · "Under Our Wing" (primary: hero-best1, hero-07)
- Sheet layout kept: two-line headline, subline, two stacked 3D buttons, trust bar (5.0 · 90+ reviews · GAF Systems Plus
  Certified · Founded 2025). The owl artwork is the owner-approved art from hero-best1, cut out of the sheet onto the cream page.
- **Interactive:** live rain falls over the scene and **stops on the owl's wings** (each drop is tested against the owl's real
  pixel outline and splashes amber where it hits); the house underneath stays dry. **"Storm test"** turns up a six-second
  storm with wind; the owl braces. The owl tilts in 3D toward the pointer.
- Words: 40 (headline 7, subline 15, buttons 7, trust 9, chip 2). Budget ≤40 met.
### V2 · "Peel" (alternate: hero-best2, hero-01, with its complete nav, headline, buttons and four-item trust row)
- **Interactive:** drag the amber knob (or the card, or use the keyboard slider) to **roll the old roof back** like the sheet's
  curl and reveal Owl's new roof underneath. It opens itself halfway on load. The card tilts toward the pointer.
- Layers: the old roof is the non-branded storm-damage photo allowed as illustrative under the asset rule (`storm-wind`, no
  branding, not captioned as anyone's job); the new roof is a frame from Owl's own crew film.
- Words: 39.

## Section 2 · VIDEO (second section, Owl's real video ehKLv5DF2TQ)
### V1 · "Watch the Crew at Work" (primary: video-best1, video-01)
- The cream-ringed player from the sheet. Inside it, Owl's own crew film plays muted as a live preview (embedded, 15.6 s).
  **Chapter chips** (Rafters, Materials, The crew, Finished roof, Decking) jump the preview to that moment; a custom bar
  pauses and scrubs (keyboard too). **The amber play button loads Owl's full YouTube video in place**
  (youtube-nocookie, nothing from YouTube loads before the press).
### V2 · "The Crew, Up Close" (alternate: video-best2's porthole, rebuilt for the crew film)
- A brass-amber ring around a round lens playing the crew film. **Drag the knob around the ring** (or press a chapter marker,
  or use the arrow keys) to move through the job; the current chapter shows beside the buttons. "Play the Full Film" opens
  the YouTube video in a 16:9 modal (Esc or × closes it).

## Sheet defects and conflicts fixed (direction §9 and §11)
- video-01 "on a real Twin Cities roof" and "Filmed on a Shoreview roof replacement": not in the facts lock, removed.
- hero-01 "serving the Twin Cities": replaced with the locked "serving 29 towns".
- The sheets' drawn owl wordmark is replaced everywhere by Owl's real logo.
- hero-14's needle and video-04's copy slip are not used in this round.

## Verification
- **Interaction test** (`tools/interact.cjs`): storm toggles; chip seeks to 9.5 s and marks "Finished roof"; play inserts the
  YouTube embed for ehKLv5DF2TQ; peel drags to 79 and keyboard Home returns it to 0; ring scrub lands on "The crew"; the modal
  opens and closes with Esc; review switcher shows 4 buttons. **No page errors** (a play() race was found and fixed).
- **Accessibility** (`tools/axe.cjs`, WCAG 2.1 A/AA): 0 violations on V1 and V2 (two contrast findings fixed: chip times and
  the YouTube note).
- **Phone (390 px):** single column, owl/peel card first, play button and ring scaled down (two overflow defects fixed).
- **Light only:** every page background is cream; ink appears only inside the video screens.

## Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Section · version | D | U | C | Ct | Weighted | Key evidence for / against |
|---|---|---|---|---|---|---|
| Hero V1 Under Our Wing | 8.2 | 7.8 | 8.4 | 8.0 | **8.10** | For: matches the primary sheet; the rain-stops-at-the-wing interaction makes "Your Nest Is Safe" literal. Against: the owl is a cut-out from the sheet (soft edge at the shadow); rain is subtle at rest by design. |
| Hero V2 Peel | 7.4 | 7.6 | 7.6 | 8.0 | **7.56** | For: a real drag-to-reveal with keyboard support. Against: the roll reads as a shaded band more than a true curl; the old-roof photo is borrowed illustrative material. |
| Video V1 Watch the Crew | 7.8 | 8.2 | 7.2 | 8.0 | **7.82** | For: Owl's real footage playing on arrival, chapter chips that do something, YouTube on demand. Against: closest to a standard player. |
| Video V2 Up Close | 7.9 | 7.4 | 8.2 | 7.8 | **7.80** | For: the ring is a working scrubber, a strong tactile object. Against: ring labels are small on phones; a dial here could compete with the Wise Check dial, the site's signature. |

All four pass (≥7.0, no category under 6.0). **Vetoes:** none (no invented facts, no dark backgrounds, no big 3D, logo and
palette unchanged, single file, no sub-agents, no background tasks).

**WEB-SKILLS applied:** ⟦S0546⟧ oversized-cursor (owl companion, per-element reactions) · ⟦S0407⟧ svg-animation (companion,
dial ticks) · ⟦S1441⟧ fitts-law (64 px hero buttons, 44 px minimum targets) · ⟦S1434⟧ visual-hierarchy and ⟦S1433⟧
typography-scale (one headline face, two-line hero) · ⟦S1440⟧ feedback-patterns (pressed buttons, live chapter state) ·
⟦S1436⟧ animation-principles (lag, ease-out, reduced motion) · ⟦S0070⟧ better-accessibility (sliders with keys, focus
rings, axe 0) · ⟦S0280⟧ core-web-vitals (YouTube deferred to the press; one shared video source) · ⟦S0659⟧ anti-ai-slop
(sheet text that broke the facts lock removed) · ⟦S1496⟧ critique-brand-consistency (real logo, locked hexes).

## Recommendation for the winning builds
**Hero V1** (the primary sheet, and the strongest signature) and **Video V1** (the primary; V2's ring is better kept for the
Wise Check dial so the signature is not spent twice). Muse decides; both versions stay in the file until then.

## Open points for Muse
1. The hero owl is lifted from the approved sheet image. If the owner wants a commissioned or photographed asset instead, it
   drops into the same slot.
2. The peel's old roof uses the allowed non-branded illustrative photo; Owl has no "old roof" photo of its own.
