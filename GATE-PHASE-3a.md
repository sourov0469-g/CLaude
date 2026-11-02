# GATE, Phase 3a: concept visuals, animation storyboards and the flow map

**Run.** AUSTIN-PROMPT-V2, overnight, 2026-11-02.

**Deliverable.** `siding/brand-v2/phase3a-flow.html`: standalone, 561 KB, with fonts and the firm's own job photos embedded. It is built by `siding/brand-v2/phase3/build_phase3a.py` and styled entirely from the Phase 2 tokens.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. What was built

### Flow map
- 6 pages and 41 sections, under Muse's structural rule (3–11 pages; at least 6 sections per page; 11 on the homepage). The builder asserts that rule.
- Every section names its single annex-v3 reference.
- The course line runs along the top of the map: it is the thread every page carries.
- **Journeys:**
  - J1 (research a trade) and J2 (check the proof) are marked as numbered steps on the map.
  - J3 (call now) and J4 (come back to book) are written out.
- **In-file navigation model:**
  - one HTML file with hash routes;
  - each route change moves focus to the page's h1, updates the title and makes a live-region announcement;
  - the header persists on every page, and the phone number is always visible.

### Seven concept key frames
Each is composed at 1440×900 from tokens and real job photos:
- Hero (MERSI)
- Numeral event (Apple)
- Wall assembly (Lusion flow, Graza bar)
- Colour as content (Cash App)
- Visualiser entry (Quiet Cubes structure, Rimowa 4-step)
- Before/after seam (MERSI seam)
- Close (Dropbox subtraction)

### Four storyboards, five frames each
Each states its timing, input model, keyboard behaviour and reduced-motion behaviour:
- Hero split-slider
- Numeral event
- Wall assembly
- Before/after seam

### Reference observation
New live observations tonight are logged in `IMAGE-REGISTRY.md` §6:
- MERSI, observed at code level: the clip-path mechanism, opposing wipes, lerp, no snap and no autoplay, all measured.
- Apple, Lusion, Lando Norris, Cowboy, Ever, Bruno Simon and Quiet Cubes.

Gaps:
- Rimowa returned 403, so it is recorded as not observed.
- The annex v3 text is now kept in the repo at `siding/brand-v2/REFERENCE-ANNEX-AUSTIN-v3.md`.

## 2. Decisions and why

1. **The map preview on the homepage is static.** Annex v3 scopes Bruno Simon to "the 312-dot map as the ONE explorable section, nothing more". So only the Our work map is explorable; the homepage preview links to it.
2. **The before/after centrepiece comes from MERSI's seam, never from Ever** (annex v3, settled). Ever is used only for its verified craft:
   - material samples, as 3D visualisations, on the Siding and Windows pages;
   - filtering presentation, on the Our work archive.
3. **The hero shows one job across the split, before on the left and after on the right.** The firm's pairs are shot from the same angle, so the two halves meet as one house. The centre plate names the place and steps through a six-step process.
   - The process steps are draft copy for the firm to confirm.
   - The plate says "Step 04 of 06", so a step is never presented as what the photo shows.
4. **The numeral never counts.** "312" is revealed by a clip in step with the dots, so no intermediate figure (78, 156…) ever appears on screen. The full locked sentence is always present in the DOM. The annex's "886" is not used, per Muse correction 3.
5. **The colour wall shows the structure in steel only, and names no paint brand.** Real colour names wait on a confirmed list from the firm. No colour fact is locked.
6. **The visualiser's summary travels with the booking form** (Cisco mechanism note: it informs the feature, not the layout). The form never claims it sent anything.

## 3. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.0 | The hero split with one house across the seam and the B3 wall drawing are strong. The visualiser preview and the close are plain at concept stage. |
| Usability (30) | 7.5 | The routing model includes focus, title and live-region handling. Every motion has keyboard and reduced-motion behaviour. The phone number is persistent. The seam uses a slider role. No overflow at 375. |
| Creativity (20) | 7.0 | One mechanism (MERSI's clip wipe) serves both the hero and the seam. One thread (the course line) runs across 6 pages. The numeral is revealed, not counted. |
| Content (10) | 8.0 | Locked wording only; the only standalone numeral in the file is 312. Captions give the place only. Draft copy is flagged. |
| **Weighted** | **7.25** | **PASS.** Every category is at 6 or above. |

**Vetoes: zero.**

## 4. Defects found and fixed

1. **Hero headline:** white text over the light before-photo, relying on a text shadow. It now sits on a solid white plate.
2. **Flow map:** the long page title overlapped the next column; the thread struck through the subtitles; the journey lines crossed box text. Fixed with a shorter title, the thread moved above the titles, and numbered badges in the gutters.
3. **Numeral storyboard:** it counted up through figures outside the lock. Replaced with a clip reveal of 312.
4. **Wall storyboard:** frame 0 showed nothing. The arriving course line is now drawn.

## 5. Defects remaining

1. **Rimowa UNIQUE not observed** (403). The visualiser structure rests on the annex text until a re-try succeeds.
2. **Quiet Cubes identity.** quietcubes.com could not be tied to the Awwwards listing (Awwwards returned 502; Codrops served a bot check). It is used for structure only.
3. **The visualiser preview art and the close frame are thin.** Both get their two built versions in the build phase.
4. **Process copy is a draft for the firm.** Its six steps are: measure, strip, wrap, lay the courses, trim & paint, walk-through.
