# GATE · The insurance paperwork (Storm damage §3): two versions

**Where it lives:** `#/storm/hail-claim`. Switch versions with `?v=hail-claim:1|2`. **Default: V1.**

**Governing reference:** Lusion (flow): one continuous path carries the reader through the page; source-only, no WebGL.

**What transfers:** the claim is shown as one path (V1: a vertical line that fills; V2: the report travelling roof →
Owl → insurer). **What never transfers:** Lusion's 3D, cursor effects, dark stage.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG):
- ⟦S1325⟧ scroll-progress-timeline (V1, followed point by point): a semantic ordered list with real headings first; a
  quiet base line and one fill on top with `transform-origin: top`; the line measured from the **first dot centre to
  the last**, not the section edges; one normalised value applied as `scaleY` in a single rAF; a step turns on when the
  head crosses its dot; re-measured after fonts, resize, version switch and route change; left rail (long copy); passive
  scrolling never moves focus; reduced motion shows the full line and every step.
- ⟦S1424⟧ law-of-continuity: V2's dotted track is the path made visible; on phones it turns vertical without changing
  reading order.
- ⟦S0076⟧: "Call about a claim" names the action.

## What was built
- **V1:** sticky lead "We'll handle the paperwork for you." with Owl's riddle line and a Call CTA; four steps in Owl's
  own words (inspection; documenting every bit of damage; giving your insurance company the information; working
  directly with your adjuster).
- **V2:** "The paperwork goes through us.": three nodes (your roof, Owl's report, your insurer and adjuster); a drawn
  report travels along the track once when seen, gaining its lines and an amber seal at Owl; Owl's closing line
  "smooth, fair, and transparent…" with a named call link.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 8.0 | 7.5 |
| Usability | 8.5 | 8.0 |
| Creativity | 7.5 | 8.0 |
| Content | 9.5 | 8.5 |
| **Weighted** | **8.20** | **7.85** |

**Why this default:** V1 carries all four of Owl's sentences in full and the progress line truthfully tracks reading.

**Vetoes:** none. No overflow; no errors; under reduced motion the line is full and all four steps are on.

## Defects found and fixed
1. **Off-ladder 18px dot** flagged by the token lint. Now `--space-16`.
2. **V2's closing line was not centred:** the identity's `.owl p{margin:0}` out-ranked the section rule. Scoped the rule.
3. **V2's report was too small to read as a document** (32px). Now 48px; nodes 80px.
4. **V2 on phones:** the travelling report overlapped the node headings in the vertical layout. It is hidden below
   768px; the vertical dotted track still shows the flow.
