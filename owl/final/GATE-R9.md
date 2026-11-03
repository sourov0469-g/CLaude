# GATE · Final build · Round 9 · About page (two versions each)

**File:** `owl/final/owl-roofing.html` (5.3 MB). Open `#/about` (new "About" link in the header and footer; `?all=2#/about` for the
V2s; `?review` still switches). Screenshots: `gates/r9/`.

**Content rule:** every statement is a locked fact (family-owned; founded 2025 in Shoreview, MN, by Tim Brown and Noah
Bergland; MN licence #BC809662; GAF Systems Plus Certified; BBB Accredited, A−; 5.0 · 90+ reviews; 29 towns; 10-year
workmanship and up-to-50-year manufacturer warranties; "We Give a Hoot"). The values are brand-04's voice words (Friendly,
Trustworthy, Expert, Reassuring), each paired with a locked fact as its proof. One drafted line that gave the founders a
motive was removed before the build: no motives, stories or quotes are invented.

## Section 1 · Page hero
- **V1 · "Family-Owned. Shoreview-Built. We Give a Hoot."** A six-fact panel and a large drawn owl mascot (ink, amber and
  cream, perched on a branch). **Its eyes follow the pointer, its head tilts toward you and it blinks**; "Say hello" makes
  it turn and say one of five lines, each a locked fact ("Rated 5.0 from 90+ reviews", "Hoo needs a Wise Check?").
- **V2 · "The Family Behind the Owl."** Owl's own wide crew photo with the headline set into a cream fade, and four number
  tiles that **count up when they come into view**: 2025, 29 towns, 10-yr warranty, 5.0 from 90+ reviews.

## Section 2 · What we stand for
- **V1 · Four words:** "Friendly. Trustworthy. Expert. Reassuring." in huge type. Hover or select a word (arrow keys work)
  and an amber underline draws under it while the proof panel below swaps to that word's fact and icon.
- **V2 · "Four Feathers, Four Promises":** four drawn feathers fanned from one point (brand-04's feather motif). Pick one
  and it lifts and turns amber while the card shows its proof. Keyboard: Tab to a feather, arrows to move, Enter to pick.

## Verification
- **Interaction test** (`tools/interact9.cjs`): the header link opens About with `aria-current`; the owl says two different
  lines; words and feathers switch the proof (arrows too); the V2 numbers finish at 2025 / 29 / 10-yr / 5.0. **No page
  errors.**
- **Accessibility** (axe): **0 violations** on V1 and V2 (the faded words in V1 were darkened to pass large-text contrast
  before the check). **Phone (390 px):** 0 px sideways overflow on both.

## Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Section · version | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|
| About hero V1 watching owl | 8.0 | 7.8 | 8.4 | 8.6 | **8.06** |
| About hero V2 crew photo + count-up | 8.2 | 8.0 | 7.2 | 8.6 | **7.98** |
| Values V1 four words | 8.0 | 8.0 | 7.6 | 8.6 | **7.98** |
| Values V2 four feathers | 7.8 | 7.6 | 8.2 | 8.6 | **7.90** |

All pass; zero vetoes. **WEB-SKILLS:** ⟦S1434⟧ visual-hierarchy (one word lit, three resting) · ⟦S1433⟧ typography-scale
(display-size values) · ⟦S1440⟧ feedback-patterns · ⟦S1436⟧ animation-principles (eye tracking, count-up, feather lift) ·
⟦S0070⟧ better-accessibility (tablist and keyboard feathers, axe 0) · ⟦S0659⟧ anti-ai-slop (invented motive removed; every
proof a locked fact) · ⟦S1496⟧ critique-brand-consistency (brand-04 voice and feather motif).

**Recommendation:** Hero V1 (the owl gives the brand a face; it pairs with the cursor companion) and Values V1.
**Next:** Service Area page, then Contact, then deepening every inner page to 5–6+ sections.
