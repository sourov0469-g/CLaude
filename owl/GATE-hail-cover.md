# GATE · Storm damage cover (Storm damage §1): two versions

**Where it lives:** `owl/site/owl-roofing.html`, the Storm damage page (`#/storm`). Switch versions with `?v=hail-cover:1|2`.
**Default: V1.**

**Governing reference:** MERSI, the chapter system (frames f01-f04).

**What transfers:** a cover plus a numbered **chapter index** that is the page's own navigation (01 Assess, secure,
plan · 02 The paperwork · 03 The Wise Check · 04 Built for MN weather). **What never transfers:** MERSI's interiors,
logo, type.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG):
- ⟦S0449⟧ landing-page: one intent (get a storm-damaged roof looked at); headline, one primary CTA, one proof signal
  (the three chips are Owl's own: "Insurance Assistance Available · Free Estimates · A Locally Owned Company").
- ⟦S1454⟧ serial-position: Call first in V1; in V2, where the intent is "send what you see", Text first.
- ⟦S0076⟧ better-writing: verb-first buttons that name what happens ("Text a photo of the damage"); chapter links
  name their destination.
- ⟦S0489⟧ / ⟦S0400⟧ (read at audit, after building; see SKILL-READ-LOG): falling hail uses ease-in (falling things), the circling uses ease-out; it plays once, and under
  reduced motion the drawing starts at its final state.

## What was built
- **V1:** label "MN's storm damage experts" and H1 "Mother Nature doesn't stand a chance." (both Owl's own headings),
  Owl's "heavy metal band" line and the assess/secure/plan sentence, Call + Text, the three chips. A drawn storm drops
  hail on a drawn house once when seen; three marks are then circled (the inspection). The lawn ground sits under the
  house; the chapter index sits below it.
- **V2:** a phone-first cover: H1 "Storm hit? Text us a photo.", Owl's "When a storm hits… That's where we come in",
  a drawn phone in which a photo message slides up and a reply starts typing (no words are put in anyone's mouth), and
  the three chips as a checklist with one line each.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 7.5 | 7.0 |
| Content | 9.0 | 8.5 |
| **Weighted** | **7.80** | **7.65** |

**Why this default:** V1 carries the page's wayfinding (the chapter index) and Owl's own headline. V2 is the sharper
single action, but the page loses its index.

**Vetoes:** none. Facts only from the lock and Owl's storm page; the Kristin Pavelka review on Owl's page is **not
used** (no review quotes); no overflow at 1440 or 390; no errors.

## Defects found and fixed (audit-improve rounds)
1. **The lawn texture ran through the chapter index** (grass behind the link text). The lawn now lives in a stage
   around the cover only; the index sits on a clean ground below it.
2. **On phones the lawn cut through the cloud drawing.** The lawn is hidden under 1024px; the house keeps its own
   ground line.
3. **Two-line chapter labels at 1440** ("The paperwork, handled"). Shortened so each fits one line.
4. **V2:** the hail icon rendered at 16px (the component rule won on specificity); the phone screen was empty at the
   top; the checklist used numbers for things that are not steps. Fixed: icon at 64px, the contact name on the phone,
   ticks instead of numbers.
