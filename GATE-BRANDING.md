# GATE, Austin redo, Stage 2: branding from zero (owner's choice)

**Governing documents:**
- AUSTIN-REDO-BRIEF.md (Stage 2);
- AUSTIN-REDO-COMPLETION.md;
- OWNER-CHOICE-GATE-2026-11-03.md (binding: the owner picks; Muse checks the boards first and relays the pick verbatim).

**Process:** every step ran in this session's own thread. No sub-agents, no background tasks. Nothing was published or uploaded.

**Status: STOPPED.** There is no Stage 3 and no HTML build until Muse relays the owner's pick or mix.

**Open from Stage 1, unaffected here:** the ruling on Immersive Garden / Igloo. Each board's background sample follows the owner's own law (pieces at rest with depth, white and clean), so it does not depend on that ruling.

## 1. Deliverables

Every board was built from zero. No earlier mark, territory, palette or board was reused; the rejected Profile House / Lap A / Reveal Tile set stays retired.

| Item | File |
|---|---|
| Concept 1, Plan Corner: full identity board | `siding/redo/branding/boards/board-c1.png` (2400 × 5168) |
| Concept 2, Grade Stamp: full identity board | `siding/redo/branding/boards/board-c2.png` (2400 × 5172) |
| Concept 3, Whole House: full identity board | `siding/redo/branding/boards/board-c3.png` (2400 × 5142) |
| Comparison sheet, three columns side by side, sized for a phone | `siding/redo/branding/boards/comparison.png` (1620 × 4263) |
| Short guidelines per concept | `siding/redo/branding/BRAND-GUIDELINES.md` |
| Sources | `branding/marks.py` (the marks), `iso.py` (motif renderer), `build_boards.py` (boards); fonts in `branding/fonts/` (OFL) |

Every board carries, in this order:
1. the logo lockup;
2. the mark alone, with 96 / 48 / 32 / 16 px tests;
3. the reversed (dark) version;
4. the palette with hex values, roles and measured contrast;
5. the type pairing;
6. the five Austin shape motifs (cut siding piece, lap profile, batten strip, corner post, shake), drawn in true isometric depth;
7. a background-field sample at rest;
8. a hero sample on a real job photograph;
9. the cursor companion;
10. the generation test (yard sign, truck door, business card, app icon and favicon).

The boards are clean presentation images: no switcher chrome and no QA marks.

## 2. Process: how the three marks were reached (defects found and fixed)

**C1:**
- **First draft:** stepped "laps" on the plan, with skins floating free of the walls. Laps cannot be seen in a plan view, so the step was dishonest. Redrawn as core, wrap gap and skin, with the post covering the ends (S1306 Removal Test: the steps did no true job).

**C2:**
- **First profile:** wedges that read as an "E", so the stamp spelt "APE".
- **Second:** a pine tree.
- **Third:** true proportions, tall thin wedges against a sheathing line. It still reads as serrated (named risk).

**C3:**
- **First:** a five-course wall between two capped posts read as a garden gate.
- **Second:** with a frieze, a garage door.
- **Third:** eight thin courses still read as a ladder.
- **Fourth:** posts proud of the courses, still a ladder.
- **Replaced** by a different drawing of the same truth: the house corner seen from the street, two walls in perspective. Each step was rendered and looked at before the next.

**Boards:**
- Motif tiles were clipped, so they are now fitted to the projected outline.
- Hero stripes read as a barcode, so they became faint course lines.
- The truck wheel covered the text, so it became a door handle.
- The dark C2 app icon rendered blank, so it was fixed.
- The yard-sign phone number wrapped, so it was fixed.
- C2's first hero photo was a back yard, so it was replaced.
- C3's field was too dark for "white and clean", so it now uses the light zinc steps.

## 3. WEB-SKILLS tags used

Each was re-read by tag in the library.

| Tag | Skill | Applied |
|---|---|---|
| ⟦S0609⟧ | open-design/brandkit | Each concept is a complete kit: lockups, mark, reverse, palette, type, motif system, applications |
| ⟦S1472⟧ | concept-selection | Criteria fixed before comparing (the scorecard); a recommendation with stated trade-offs |
| ⟦S0001⟧ | frontend-design | The distinctiveness test: each idea comes from the trade's own world (plan view, mill stamp, street-view corner), not a template |
| ⟦S1306⟧ | audit-ai-design-slop | Removal Test applied in the mark iterations (§2) |
| ⟦S0071⟧ / ⟦S1497⟧ | better-colors / critique-color | Every text pair measured. Lowest text pair: C1 Steel 500 on white, 4.7:1 (AA). Light steps are labelled "drawn lines only, never text" |
| ⟦S1500⟧ | critique-typography | One display + one text family per concept (C3 uses one family); normal everyday fonts only (completion §7) |
| ⟦S0650⟧ | taste-skill | Hero headline at most 2 lines, subtext at most 20 words (C1 sub 14, C2 9, C3 11); no em dashes in copy |
| ⟦S1496⟧ | critique-brand-consistency | The generation test: four applications made from the rules alone, with no new decisions |

## 4. Scorecard per concept

Design 40 / Usability 30 / Creativity 20 / Content 10.

PASS requires a weighted score of at least 7.0, no category under 6.0, and zero vetoes.

### Concept 1: Plan Corner

**Weighted 7.72 · PASS.**

| Category | Score | Evidence |
|---|---|---|
| Design | 7.6 | Cleanest geometry; holds at 16 px (solid chevron + post); the two-tone post gives the lockup a focal point; the drafted line motifs and course-line hero are coherent. **Against:** the chevron is close to the generic roofing-peak family. |
| Usability | 8.4 | Highest legibility. Montserrat caps plus Inter; all text pairs AA (lowest 4.7:1); strongest in one colour and at small sizes. |
| Creativity | 6.8 | The plan-view idea is clever, but the outcome resembles a common mark type; the cleverness is invisible without explanation. |
| Content | 8.0 | Sub-line and CTA use published facts ("36 Central Texas communities", "free inspection"). The headline "Every corner, finished." is session copy, not the firm's wording. |

### Concept 2: Grade Stamp

**Weighted 7.42 · PASS.**

| Category | Score | Evidence |
|---|---|---|
| Design | 7.0 | The warmest board: the primed ground and relief motifs feel like real material. **Against:** a stamp frame plus a monogram is a familiar badge pattern; the profile reads as serrated. |
| Usability | 7.9 | Readable to 16 px as a filled pill; Ink on Primed 15.2:1, secondary text 5.6:1. The profile disappears below 40 px. |
| Creativity | 7.0 | The mill-stamp truth is trade-authentic (boards are graded and stamped), but the badge form is common. |
| Content | 8.5 | The hero subtext is the firm's published line, "One free inspection covers every trade on the house."; "since 2009" is locked. |

### Concept 3: Whole House

**Weighted 8.06 · PASS. RECOMMENDED.**

| Category | Score | Evidence |
|---|---|---|
| Design | 8.0 | The most specific mark: you can see siding (courses, shadow lines, corner post) at lockup size. The galvanised palette doubles as content fields (the hero's zinc steps). The hero band is the strongest composition of the three. **Against:** the most corporate tone. |
| Usability | 8.0 | One family (Roboto) is the easiest system to apply; white on Zinc 800 12.6:1. **Against:** at 16 px the courses merge (20 px advised for favicons). |
| Creativity | 7.8 | The idea is the firm's own rule drawn literally: two walls meeting at a corner, "the full wall or the whole house". It also animates naturally (courses sliding out from the post). |
| Content | 9.0 | The headline is the firm's published policy verbatim: "The full wall or the whole house." / "No patch repairs." |

### Vetoes checked, all three

| Veto | Result |
|---|---|
| Fact error or invented proof | None. Every figure on the boards is a lock or a FACTS.md quote; no "5,000+". |
| Placeholder as final | None. Real photographs of the firm's jobs, real contact details. |
| Contrast failure on body / CTA / labels | None. Measured in §3. |
| Not applicable to boards | Broken layout at 390/768, JS error, dead CTA. |
| Swap Test | Each idea is siding-specific: a plan corner, a lumber grade stamp, a sided house corner. None survives a swap to another trade. |
| 3+ AI tells in one section | None found: no gradients, glass, blobs or emoji icons; the asymmetric layouts are deliberate. |

**Vetoes: zero, for all three.**

## 5. Recommendation (advice only; the owner decides)

**Recommended: Concept 3, Whole House.**
- It is the only mark in which a homeowner can *see siding* at lockup size.
- Its headline is the firm's own published rule.
- Its galvanised steps work as both palette and content.

**Mixes that would work, if the owner prefers:**
- **C3's mark with C2's Primed ground and Poppins**, for a warmer Whole House.
- **C1's mark with C3's palette and Roboto**, for the most minimal option.

## 6. Limits, stated

1. The cursor companions are static drawings. Idle, blink and eye-roll motion is specified (dossier §17) but not animated at this stage.
2. The background samples show rest only. Parting around the cursor is described, not drawn.
3. The hero samples are compositions for direction, not built sections. Copy fits the budgets (hero at most 40 words).
4. The photographs carry no captions, so no place claims are made on the boards.

## 7. Stop

Waiting for Muse to check the boards, send them to the owner, and relay the owner's pick or mix verbatim. Stage 3 concept images will be made only in that direction.
