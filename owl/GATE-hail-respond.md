# GATE · Assess, secure, plan (Storm damage §2): two versions

**Where it lives:** `#/storm/hail-respond`. Switch versions with `?v=hail-respond:1|2`. **Default: V1.**

**Governing reference:** Longbow Motors: craft told as doctrine and hard numbers (numbered principles, numerals as
events), never adjectives.

**What transfers:** Owl's own three-verb sentence ("We respond quickly to assess the situation, secure your home from
further damage, and create a clear plan to get things back to normal") becomes three numbered principles, in that
order. **What never transfers:** Longbow's product, dark palette, spec sheet.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG):
- ⟦S1424⟧ law-of-continuity: one rule line ties the three principles into one sequence (V1); V2's rail is the path.
- ⟦S1325⟧ scroll-progress-timeline: V2 uses a pinned stage only because each step has a distinct visual state; the
  pin is finite (300vh) and releases; the current step is marked with `aria-current="step"` (no live region); under
  reduced motion and below 1024px there is no pin and the drawing shows its final state.
- ⟦S1449⟧ (read at audit, after building; see SKILL-READ-LOG) millers-law: three steps, each one line.
- ⟦S0659⟧: no invented method claims; the bodies are Owl's own phrases.

## What was built
- **V1:** "We've seen it all." with Owl's "From wind damage that's lifted shingles to hail that's left its mark."; three
  numbered principles (01 in amber-700 as the one accent), each with a small drawing that plays once when seen: marks
  circled (assess), a lifted shingle pressed flat and the area framed (secure), a three-line plan ticked (plan).
- **V2:** "Assess. Secure. Plan." on a pinned stage: one drawn house; scrolling circles the hail marks and the lifted
  shingle, presses the shingle flat and frames the area, then a plan card appears and ticks. The step rail on the left
  follows.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 8.0 | 7.5 |
| Usability | 8.5 | 7.5 |
| Creativity | 7.5 | 8.5 |
| Content | 8.5 | 8.5 |
| **Weighted** | **8.10** | **7.80** |

**Why this default:** V1 reads in one glance; the page already has a pinned stage on Home (Protect Your Nest), and a
second long pin on an urgent page costs time.

**Vetoes:** none. No overflow; no errors; reduced-motion check passes (`stormrm.mjs`).

## Defects found and fixed
1. **V2's drawing read as a tent:** the roof was closed by a ground line. Walls, a door and a ground were added under
   the eaves so it reads as a house.
