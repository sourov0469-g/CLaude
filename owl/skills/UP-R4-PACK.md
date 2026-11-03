# Upgrade Round 4 · Services + Reviews · plan lines and skill pack (written before building, 2026-11-03)

Site level: Round 1 pack (50) + Round 2 (14) + Round 3 (9) stay in force. Added for this round, each read IN FULL by tag:
- ⟦S0086⟧ morphing-icons — morph by shared structure: every drawing uses the same fixed set of strands (3), unused
  strands collapse to a point with opacity 0; never crossfade.
- ⟦S1375⟧ editorial-portfolio-chapters — each item is a magazine cover; 500–760 ms mask reveal on the image layer only,
  media scale ≤ 1.02 on hover/focus, titles and actions visible without hover, oversized service typography as the
  handoff, 160–220 ms control feedback, stagger 45–70 ms on cubic-bezier(.22,.61,.36,1), no scroll hijack.
- ⟦S1325⟧ scroll-progress-timeline — ordered list with real headings; quiet base line + one progress line scaled with
  scaleY from measured first/last point centres; a step is active when the head crosses its centre; collapse to a
  left rail on small screens; reduced motion shows the full line.
- ⟦S1363⟧ ambient-section-particles — canvas for 40+ particles; one rAF loop; pointer listener on the section, never per
  particle; small distance force then settle; pause when unseen; DPR cap 2; quiet zone behind text.
- ⟦S1338⟧ shaders-cursor-ripples — the contract only (decay + radius ripple, keep the real content beneath, off under
  reduced motion); implemented with Owl's own canvas, no library.
- ⟦S1352⟧ number-details — 01/02/03 markers as quiet secondary structure, one numbering style per section.
Carried: ⟦S1246⟧ tabs, ⟦S0407⟧ svg-animation, ⟦S0451⟧ masked title, ⟦S1329⟧ staggered words, ⟦S0440⟧ reveal once,
⟦S1049⟧ focus, ⟦S0462⟧ hit areas, ⟦S0076⟧⟦S0251⟧ copy.

## Plan lines (reference from the annex + skills, per version)
Archive first: old Services V2 (feather index) → `services-b1`; old Reviews V2 (clothesline) → `reviews-b1`.

1. **Services V2 · "Five Chapters"** — reference **MERSI** (split-cover chapters, chapter system only). A split cover:
   Owl's service photo on one half, an oversized two-digit number, title and "what's included" on the other; an
   oversized index of the five services is the control (⟦S1246⟧ tabs). Changing chapter wipes the photo with a
   clip-path mask (⟦S1375⟧ 620 ms) while the number rolls (⟦S1352⟧). Different from V1 (split-flap board) in layout,
   composition and mechanic.
2. **Services V3 · "One Line"** — reference **Lusion** (one continuous line carries the visitor). A single amber line
   (three strands, ⟦S0086⟧) redraws itself into each service — new roof with courses and ridge cap, a repair with a
   lifted tab and hammer, hail and wind over a slope, the Wise Check magnifier over a roof, lap siding with a window —
   by morphing point-sampled strands; a light pulse runs along the line at rest (⟦S0407⟧). Stations on a track below
   are the buttons.
3. **Reviews V2 · "Earned, Not Claimed"** — reference **Scout Motors** (heritage timeline spine). A vertical spine with
   only the dated facts as nodes (2025 founded by Tim Brown and Noah Bergland → Feb 25, 2026 BBB A− → today 5.0 from
   90+ reviews); the undated credentials (MN licence #BC809662, GAF Systems Plus, 10-year workmanship + up-to-50-year
   manufacturer warranties) ride a parallel rail as "carried the whole way", so no false order is implied. Progress
   fill per ⟦S1325⟧.
4. **Reviews V3 · "Ninety-Plus"** — reference **Immersive Garden** (the interactive field / hover splash surface
   mechanism only) + **Lando Norris** (rest-motion, made for one business). A canvas field of 90 feather marks and one
   "+", one mark per review so far; the cursor (or a tap) sends a splash ring through the field (⟦S1338⟧ contract,
   ⟦S1363⟧ engine), marks lift and turn amber, then settle. The centre card states only "5.0 · 90+ reviews" with the
   BBB A−, GAF Systems Plus and warranty chips.

Truth rules for this round: no review quotes, names or per-review stars; the only rating wording is "5.0 · 90+ reviews";
dates only where locked (founded 2025, BBB A− since 2026-02-25).
