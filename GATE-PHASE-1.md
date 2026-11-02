# GATE, Phase 1: logo territories and three resolved concepts

**Run.** AUSTIN-PROMPT-V2, overnight, 2026-11-02 (governed by the overnight addendum and annex v3).

**Deliverable.** `siding/brand-v2/phase1-concepts.html`: standalone, fonts embedded, 189 KB.
- Built by `siding/brand-v2/build_concepts.py`; the marks live in `siding/brand-v2/marks.py`.
- Seek harness: append `?t=<ms>` to freeze all three animations at that time.

**Territory decision record.** `siding/brand-v2/TERRITORY-SELECTION.md`. The territory boards are in `siding/brand-v2/phase1-territories.html`.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Options considered

**Territories (3, from Phase 1 step 1).** Scored against criteria written down before comparison (S1472), with thresholds kept apart from trade-offs:

| Territory | Score | Outcome |
|---|---|---|
| T1 The Profile Cut | 40/50 | Picked |
| T3 The Record | 34/50 | Rejected. Kept retrievable; it comes back if T1 fails 16 px in all three concepts. |
| T2 Wall Order | 25/50 | Rejected. Weak at 16 px, and reads as software layers. |

I leaned toward T1 before writing the criteria. This is disclosed in the record, which applies T1's worst evidence (the "list icon" reading at 16 px) against it.

**Concepts inside T1.** Exactly 3, each by a different S0609 method. All three come from one physical fact: a lap-sided wall cut at the corner shows each board as a wedge, thin at the top and thick at the butt, lapped over the board below.

| | Concept | Method | Exemplar card (job) |
|---|---|---|---|
| C1 | The Profile House | Metaphor fusion + product action | Scout Motors (MOOD) |
| C2 | Lap A | Monogram + meaning | Dropbox Brand (MECHANISM) |
| C3 | Reveal Tile | Negative space + container | Cash App Brand, press and assets (MECHANISM) |

Graza is the motion quality bar for all three (annex v3: scoped to motion).

**Drafts discarded on the way.** Recorded here because the gate asks for defects found and fixed:
- **C1, stroked zigzag wall.** At 300 px it read as a lightning bolt, an electrician's sign. Redrawn as a solid wall: a straight inner face, and an outer face that steps out at each butt.
- **C2, plain stencil A.** The lap was invisible. Redrawn so the boards cross past the ridge, with the right board lapping over the left.
- **C2, crossbar.** It poked out past both legs. Pulled inside them, tucked behind, and outlined by the lap gap.
- **C3, tapered wedge cuts.** The first draft closed to "≡ in a box" at 16 px. Redrawn with deep butt notches and a thin reveal; the 16 px variant keeps the notches only. Corner radius cut from 5 to 2, so it reads as a cut piece of material rather than an app bubble.

## 2. Logo-gate checklist and Haviv scores, per concept

Full tables are in the HTML. Summary:

| Check | C1 Profile House | C2 Lap A | C3 Reveal Tile |
|---|---|---|---|
| Black only | Pass | Pass | Pass |
| 16 px (variant below 32 px) | Pass. Closes as a house. The laps are 2 step pixels: texture, not readable laps. | Pass, with the variant. The full mark reads as X over A. | Pass, with the variant: a notched block. The full mark reads as "≡ in a box". |
| Doodle test | Pass | Pass | Pass |
| Quirk named | The lapped left wall | The crossing at the ridge | Notches break the container edge |
| System complete | Pass. Icon, 16 px variant, horizontal, stacked, and a course-line lockup. | Pass | Pass |
| Named risk | The steps can read as a saw blade (fails safe: still a building trade) | Teepee or A-frame tent | A stack (server rack, drawers) at lockup size |
| Haviv: appropriate / distinctive / simple | 5 / 3 / 5 = **13** | 3 / 3 / 3 = **9** | 3 / 4 / 4 = **11** |

**Evidence: screenshots in `siding/brand-v2/shots/`.**
- `concepts-top.png` and `concepts-full.png`: 1440 wide, frame at t=600.
- `concepts-375.png`: 375 wide; `scrollWidth` is 375, so there is no horizontal scroll.
- Freeze-frames for each concept k (c1, c2, c3): `concept-<k>-motion-start.png`, `concept-<k>-motion-mid.png` and `concept-<k>-motion-end.png`, at t = 0, 300 and 600 ms, collected in `concept-motion-sheet.png`.
- `concept-c1-reduced.png`: under prefers-reduced-motion no animation is created (`document.getAnimations().length` is 0) and the final frame renders.

**The ×4 pixel view.** Each size table includes the real 16×16 raster of the variant, scaled up with pixels kept, so the 16 px claims are measured rather than eyeballed.

## 3. Motion spec (S1436, S0083, S0407)

Each concept has one prominent mover and runs 600 ms in total, under the 700 ms cap.
- Only transform, opacity and stroke-dashoffset are animated.
- C1 draws on through a mask stroked along the mark's centre line (pathLength 1). C2 is a spring: overshoot to −2°, then +0.6°, then settle. C3's cuts scale along x inside the mask.
- Scale stays inside 0.95–1.05; C3's tile goes from 0.96 to 1.
- The mark plays once per load; the replay button is a 44 px target with a visible focus ring.

## 4. Selection and why: C1 The Profile House

The selection is argued from the two tests the brief names:
- **Identifiability (S0659).** C1 leads. A house with a lapped wall lets a stranger name exterior siding work from the mark alone. C3 reads as a stack at lockup size; C2 reads as a teepee.
- **Ownability (S0609 question 5).** C1's silhouette is the weakest point: an outline house is the category default. Its ownability comes from the system instead. The one line draws the lapped wall and the gable, then runs on under the name as the course line (the course-line lockup). That same line is the brief's carrying thread through the pages, so mark and site are one drawing.

**What the pick costs.** Distinctive scores 3/5. C3 is the most ownable silhouette (distinctive 4/5) and is the ready alternative if Muse weights distinctiveness above identification. C1 and C3 are not merged (S1472: never graft losers onto the winner).

**What would reopen it.**
- Muse rules distinctiveness first: pick C3.
- No concept reaches distinctive 3 or above: reopen T3. C1 sits exactly at 3, so this did not trigger.

## 5. Self-rating against the SCORECARD

Scores are out of 10 per category, then weighted.

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.0 | Monochrome-first marks, one accent (steel-9 #396791), a complete variant set on three surfaces, and 16 px variants checked at real pixels. Held back by C1's generic silhouette and C3's stack reading. |
| Usability (30) | 7.5 | Size rule stated (full mark ≥ 48 px, variant ≤ 32 px). Reduced motion verified (0 animations). No overflow at 375. Replay is a 44 px target with focus-visible. Every SVG mark is labelled. |
| Creativity (20) | 6.5 | The course-line lockup (one path: wall, gable, then a rule under the name) and the solid lapped wall are original. The base form, a house outline, is not. |
| Content (10) | 8.0 | One-line stories are true to the trade. Reference cards come from live observation and each has 4 or more differences. Barred-term grep of the deliverable: 0 hits. No facts beyond the name. |
| **Weighted** | **7.05** | **PASS**, narrowly: ≥ 7.0, no category below 6. |

**Vetoes: zero.**
- No barred facts.
- No third-party logo or asset in the deliverable.
- No OUT reference used.
- Nothing published.
- No claim of award or recognition.

## 6. Defects found and fixed in this phase

1. C1 lightning-bolt reading: redrawn as a solid lapped wall.
2. C1 16 px laps lost: the variant got deeper steps (outer face at 0.5, step 9 units) and a 7.5-unit line.
3. C2 stencil-A genericness and the crossbar overhang: crossed boards, a tucked bar, lap gaps on both boards.
4. C2 reading as an X at 16 px: the variant shortens the tips and widens the boards.
5. C3 "≡ in a box" and app-bubble reading: butt notches, radius 2, and a notch-only 16 px variant.
6. Lockup wordmark overrunning its viewBox: measured at 287 of 296 units after the fix.
7. The ×4 pixel canvases were blank: the SVG source in the text templates had been HTML-escaped. It is now raw, with an assert that guards against `</script>`.
8. The C1 timing text didn't match the course-line lockup's stroke: rewritten to match.

## 7. Defects remaining (carried to Phase 2 or for Muse)

1. **C1 distinctive 3/5.** The silhouette alone is a category default. Phase 2 must make the course line visibly the brand's (motifs, section rules) so the system carries ownability.
2. **C1 at 16 px.** The laps are texture, not readable laps. Acceptable for a favicon, where the house closes. Not fixable without losing the house.
3. **The wordmark is stock Montserrat 800,** with no drawn detail. A small owned detail (for example, the course line as the underline) exists only in the course-line lockup. Phase 2 sets lockup rules.
4. **Clear space and minimum size are stated only as a size rule.** Phase 2 brand document: clear space = one course height (1/8 of mark height) on all sides; icon minimum 16 px (variant); horizontal lockup minimum 24 px tall.
5. **Open question to Muse: photo captions.** Default until ruled: place only, no month.
