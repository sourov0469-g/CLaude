# GATE PHASE 3a: page plan, flow map, storyboards, concept frames (Owl Roofing)

**Basis:**
- Direction B · The Nest, on Owl's kept identity. The Phase 2 assets passed at `GATE-PHASE-2.md`.
- No newer Muse message arrived. The work was done by me, in this thread, with no sub-agents and no background tasks.

**Skills read in full** (rules logged in `owl/skills/SKILL-READ-LOG.md`):
- ⟦S1411⟧ information-architecture
- ⟦S1398⟧ journey-map
- ⟦S1450⟧ navigation-patterns
- ⟦S1452⟧ peak-end-rule
- ⟦S1454⟧ serial-position-effect
- ⟦S0633⟧ motion-design (beat maps)

## Deliverables
| Deliverable | Where |
|---|---|
| Page plan and reasoning (6 pages, the homepage's 11 sections with a declared surface sequence, each inner page's 6 sections, navigation order) | `PROGRESS.md` → "Phase 3a: page plan and reasoning" |
| Flow map (four jobs in, one way out), with shortest paths and moments of truth | `owl/phase3a/storyboards.html` #flow |
| The homepage line through all 11 sections, keyframed with the real `Owl.sweepLine` | #home |
| Storyboard A: Protect Your Nest, 4 pinned beats (beat map: scroll → takeaway → focal → transformation → Owl's words → exit) | #beats |
| Storyboard B: Sweep the lawn, the game (states, inputs, responses, budget and fallbacks) | #game |
| Storyboard C: the nest closing around the phone number at the call band | #end |
| Concept frames: §9 Price My Roof and §6 Our families | #end |
| Competitor collision check (three of the four roofers Owl names; Lindus only redirects) | `PROGRESS.md` notes |

## Options considered and selections
| Decision | Options | Selected | Why (evidence) |
|---|---|---|---|
| Page count | 4 (home + 3) · **6** · 9 (one per service) | **6** | (see below) |
| Where the game sits | Inside beat 2 · **its own section after the beats** · on Protect Your Nest only | **Own section (§4), plus a reprise on the Protect Your Nest page** | (see below) |
| Where Price My Roof sits | The hero (direction C) · **§9 with the Wise Check** · Contact only | **§9 and Contact** | (see below) |
| Lead claim | "Family-owned" · **"We actually answer the phone"** | **The phone** | The collision check found Kaufman Roofing also says "family-owned". No competitor uses Owl's phone promise or its cleanup grammar. |
| Order of the middle | People before system · **system, peak, then people** | **System (3), peak (4), services (5), people (6)** | (see below) |

**Page count:**
- **For 6:** fewer is better. Services become one chapter page (MERSI's chapter system is allowed for exactly this), not
  four thin pages.
- **The rule it must also meet:** every page needs at least 6 real sections. Four services pages could not each fill
  6 sections with true content.

**Where the game sits:**
- **Why its own section:** the peak (⟦S1452⟧) needs room.
- **Why not inside beat 2:** inside a pinned beat it would fight scroll (a scroll-jacking risk).

**Where Price My Roof sits:**
- **Why not the hero:** direction C was rejected at Gate 1. Grafting its instrument into B's hero is forbidden
  (⟦S1472⟧).
- **Why §9 works:** it sits where intent to price is high, after trust is built.

**Order of the middle:**
- **Rhythm (⟦S0633⟧):** action and rest alternate.
- **Rest beats:** the families (6) and reviews (8) give the line a deliberate rest.
- **Peak placement:** the peak lands early enough to be remembered.

## Self-ratings against the scorecard and WEB-SKILLS
These ratings are for a plan and storyboards, not built sections.

| Category | Score | Evidence | Holding it back |
|---|---|---|---|
| Design (40) | **7.0** | One motif (the line) carries every section; the surface sequence is declared and checkable; the keyframes are the real asset code | Concept frames exist for only two of the eight unbuilt sections. The wrap and aftercare-box drawings are early sketches. |
| Usability (30) | **7.5** | (see below) | Mobile behaviour of the 4-beat pin is specified, not yet proven |
| Creativity (20) | **7.5** | The game is Owl's own process made playable; the nest resolves the page's one line at the call | Beat 1's wrap animation needs a stronger idea than "drop and settle" |
| Content (10) | **8.0** | (see below) | n/a |
| **Weighted** | **7.40** | | |

**Usability evidence:**
- Every job reaches call in 1-2 clicks; the call bar is always within thumb reach.
- The primary CTA sits in the last nav position and appears first and last on the page (⟦S1454⟧).
- Pinned beats are capped, with a skip link and a static fallback under reduced motion.
- The game is keyboard and touch playable, with a reduced-motion variant.

**Content evidence:**
- Every beat's copy is Owl's own words.
- No prices, quotes or invented numbers; the game's 12 nails are labelled as the game's own count.
- One source conflict is found and resolved (the homepage text over a blog widget).

**Vetoes:** none apply to a plan. No facts outside the lock are used.

**Result: PASS (7.40).**

## Defects found and fixed in this gate
1. **Game keyframes** were unreadable at quarter width. Moved to two columns.
2. **Price My Roof concept:** the CTA wrapped inside its pill. The label was shortened.
3. **Page-plan surface conflict, caught while drafting:** the call band (deep) sat directly on a deep footer, breaking
   "never adjacent". It is now one deep closing block (call band plus footer); the homepage has exactly one deep block.
4. **Page-plan background gap, caught while drafting:** services and storm sections had no assigned background. B1
   Lawn light (paper, no sweep) is now assigned to paper sections, B2 Rings to cream people and place sections, and
   flat only to the proof strip (allowed for minor bands).

## Defects remaining (honest)
- **Game idle keyframe:** shows no magnet, because the scrub motif starts it off stage; the caption says it is parked
  left. The game needs its own drag-driven engine, built from `magnetPass` geometry, in 3b.
- **Nest at the call:** on deep olive at small size it is thin and reads as a basket. Its tones need their own mapping
  on deep, and its depth must grow. This is one of the 3b proof sections.
- **Beat 1 (the wrap) and beat 3 (the box)** are sketch-level drawings, to be resolved at the beats proof.
- **Not proven yet:** pinned beats on real mobile Safari (dvh, momentum). Testing is limited to Chromium emulation here.

## Next: Phase 3b (up to 3 proof sections), then the build
The proof sections are the three riskiest set pieces, each built to the gate standard before the full build:
1. **The hero:** V1 evolves from the exemplar; V2 is a different composition of the same assets.
2. **Protect Your Nest:** the 4 pinned beats, with beats 1, 3 and 4 drawn properly.
3. **Sweep the lawn:** the game engine, keyboard, touch and reduced-motion variants.

Then the single-file build: 6 pages with in-file navigation, two versions per section with hidden backups, and a
`GATE-<section>.md` for each.
