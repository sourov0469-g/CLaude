# GATE: Upgrade Round 2: Services + Visualiser

**Date:** 2026-11-03.
**Under:** AUSTIN-UPGRADE-BRIEF. Round 1 was accepted by Muse, with the instruction to "proceed to the next unfinished step… do not wait for approval".

Round 2 covers:
- **Services:** two new versions, C and D.
- **Visualiser:** two new versions, C and D.
- **Correction:** the Visualiser B phone headings (§8).
- **Title motion:** every section heading now rises in word by word (§5).

**File:** `siding/redo/site/out/site.html` (one file, 11.9 MB; the extra 1.5 MB is three of the firm's job photos for Services D).
**Review mode:** add `?review` to see every version, or use the version directly: `?services=c`, `?services=d`, `?vis=c`, `?vis=d`.
**Default view:** unchanged (Services A, Visualiser B) until the owner picks.

Each section now has four versions: the two earlier ones plus the two new ones. **Round 3 (Windows + Reviews) follows straight on.**

---

## 1. Services: the new versions as they landed

Neither new version moves sideways. Per the correction, the sideways rhythm stays with "Try the job".

### C: Counted chapters
`u2-services-c.jpg` · `-1440-0/1/2.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **References:** Apple AirPods Pro (numbers arrive as events) and Cash App Brand Guidelines (colour as content, on light brand tints only).
- **Layout:** a pinned stage 360 vh long. Native scroll drives three vertical chapters, one per trade; each sits on its own pale green field.
- **The numbers:** each trade's documented count rolls up as the chapter arrives (431 siding, 388 window, 241 shingle and metal roofs). Three lap courses draw themselves under the number.
- **Beside the number:** the facts (median band, time on site, warranty or brands) and the trade's interactive scene:
  - siding boards that flip to their records;
  - windows that open;
  - a roof that ripples under the cursor.
- **Rail:** marks the chapter and can be clicked to jump to one.
- **Phones and reduced motion:** unpinned. The chapters sit in flow, and each count runs once when it arrives (instant under reduced motion).

### D: Split cover, real jobs
`u2-services-d.jpg` · `-1440-0/1.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **Reference:** MERSI (split cover with a central label).
- **Layout:** one of the firm's own published jobs on the left, the trade's facts on the right, meeting at a seam.
- **The trade label** sits on the seam and steps Siding → Windows → Roofing. Both halves wipe in opposite directions, in sync.
  - It advances every 6.5 s, with a thin progress bar.
  - It stops on hover, on focus, or once the visitor picks a trade.
  - Up/down arrows step it.
- **The seam** can be dragged; it is also a slider (arrow keys, Home/End, 30–70 %).
- **Photos (firm's own, captioned with the recorded place and date and a link to the project):**
  - Maple Run, Austin · Feb 2026 · Siding & Exterior Painting
  - River Place, Austin · May 2026 · Windows
  - Fairview, Round Rock · Jun 2025 · Shingle Roofing
- **Phones:** the seam turns horizontal (photo on top).

## 2. Visualiser: the new versions as they landed

### C: Colour fields, compare
`u2-vis-c.jpg` · `-1440-0/1.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg` · `-390-sticky.jpg`

- **Reference:** Cash App Brand Guidelines (colour as content).
- **The bands:** the 17 ColorPlus colours for Austin, or the 12 Sherwin-Williams samples the firm publishes, as a deck of bands.
  - Hovering a band floods the wall with that colour, with the house drawn into it.
  - A click keeps it. The bands are radios.
- **Compare two:** splits the wall into two fields, so a second colour can be set against the first.
- **The caveat stays visible:** ColorPlus is baked on at the factory, and screens show colour a little differently.
- **Phones:** heading first. Then only the wall pins under the header while the colour list scrolls past it, so every tap shows its result.

### D: The instrument
`u2-vis-d.jpg` · `-1440-0/1/2.jpg` · `-768-0/1/2.jpg` · `-390-0/1/2.jpg`

- **Reference:** Rimowa UNIQUE (configurator only: a designed step instrument).
- **Four steps:**
  - **Profile:** tiles with self-drawing course icons and their real shares, "Lap 8.25 in, 301 of 415" and "Board & batten, 27 of 415".
  - **Colour:** a dial you turn by drag or arrow keys. It is a slider whose value text is the colour name.
  - **Trim:** tiles.
  - **Preview:** a plain spec.
- **The corner:** a small 3D-feel corner of wall answers every setting and leans to the damped pointer. Built in CSS transforms only (no big 3D).
- **"Save my spec":** downloads `austin-pro-siding-spec.txt` to the visitor's own device. The page says plainly: *nothing is sent from this page*.
- **Navigation:** Back and Next keep every choice (S1442).

## 3. Corrections folded in this round

| Correction (brief §8) | Done |
|---|---|
| Visualiser B, phone headings | On phones the step heading above the options is hidden. A caption pinned on the wall reads "Step N of 5 · Name" and updates on every step (`u2-vis-b-phone-fix-390.jpg`) |
| Services and Try the job must not share the sideways rhythm | Both new Services versions move vertically or in place. The sideways rhythm is left to Try the job. Services A (the earlier sideways version) stays only as an option in the switcher |

---

## 4. Interaction tests (Playwright, SwiftShader GL; final run after all fixes)

| Check | 1440 | 768 | 390 |
|---|---|---|---|
| Services C | 0 errors, 0 overflow; counts land 431 / 388 / 241 | flow mode; count reaches 388 | flow mode; count reaches 388 |
| Services D | tab → Windows, caption "River Place, Austin", seam keyboard → 64 | same | tab → Windows, caption correct |
| Visualiser C | pick → Mountain Sage; compare A/B = Mountain Sage / Countrylane Red | same | same; wall pinned at 78–268 px while the list scrolls; tap → Gray Slate |
| Visualiser D | dial → Evening Blue by keyboard; spec "Board & batten (27 of 415) · Evening Blue (ColorPlus, #5F696D) · Tricorn Black"; download `austin-pro-siding-spec.txt` | same | same |
| Visualiser B phone fix | n/a | n/a | caption "Step 4 of 5 · Colour" visible; heading hidden |
| Reduced motion | Services C unpinned, in flow; no errors across all four versions | | |
| Locks | one phone number (23 instances of (512) 550-0000), no "5,000", no "steel" | | |

### Defects found and fixed this round

| # | Defect | Fix |
|---|---|---|
| 1 | Services C: counts landed late, so the number was still rolling as the chapter left | Count runs over the first 40 % of each chapter |
| 2 | Visualiser D: the wall corner read as concave, with faces turned the wrong way | Faces turned outward (±36°). The fascia now sits as the top edge of each face. The corner board stands proud of both |
| 3 | Visualiser C: long colour names clipped in Compare | Names wrap in the split fields |
| 4 | Services C: the roof scene sat off-centre and ran out of its portrait panel | In the portrait panel the roof becomes a taller field of courses up to the ridge, centred, like a close-up |
| 5 | Visualiser C on phones: the wall came before the heading, and the whole right column (wall, buttons, note) would have pinned | Heading first. Only the wall pins; a white band under it hides the list as it slides beneath |
| 6 | Visualiser C copy said "hover", which phones can't do | Now "Each colour fills the whole wall. Pick one to keep it, then pin a second to compare." |

### Remaining (honestly named)

1. **Real hardware is untested.** Services C's pinned count and Visualiser D's corner tilt were tested in software GL only.
2. **Carried from Round 1:**
   - The world illustration is still my pictogram art; the request to Muse stands.
   - The hero's "Move to look around" hint still loops (S0489 says UI chrome plays once). I'll fix it with the Round 5 header pass.

---

## 5. Skill ledger (§7)

**Read in full this round:**
- S1326 scroll-scrubbed / pinned stage: native scroll is the source of truth, the stage is sticky, reduced motion unpins it.
- S1442 form design: radios for five or fewer options, persistent labels, going back keeps the data.

**Re-applied from Round 1's full reads:** S1329, S0405, S1330, S0489, and the critique set S1473 / S1479 / S1482 / S1496–S1501.

| Level | Item | Skills (tag → how used) |
|---|---|---|
| **Site** | Section heading word reveal | S1329 / S0451 (mask rise, 0.9 s expo-out, 70 ms stagger, unsplit `aria-label` kept, split words `aria-hidden`; reduced motion = static) |
| Site | Buttons in all four versions | S0405 (magnetic lean, sweep, 0.975 press), S0244 states |
| **Section: Services** | C and D | S0650 (one heading of 5–6 words), S0220 (facts from FACTS.md only; the photos are the firm's own with their records), S1501 (number first in C, photo first in D) |
| Section: Visualiser | C and D | S1442 (radios, persistent labels, Back keeps data), S1497 (text ink picked per colour by contrast: white on dark colours, ink on light), S0220 (published colour values only) |
| **Element** | Services C pinned chapters | S1326 (sticky stage, scroll is truth, reversible, unpinned on phones and under reduced motion), S0204 |
| Element | Services C numbers as events | S0083 (ease-out cubic), S0489 (runs once in flow mode, nothing runs unseen) |
| Element | Services C course lines | S0442 (lines drawn on by `pathLength`, driven by the same progress) |
| Element | Services D seam slider | S0054 (`role=slider`, `aria-valuenow`, arrow / Home / End), S0197 (drag with pointer capture) |
| Element | Services D trade label | S0054 (tablist, arrow keys, `aria-selected`), S0489 (auto-advance stops for hover, focus and choice), S1436 (opposing wipes, follow-through) |
| Element | Visualiser C colour bands | S1442 (radio group), S0244 (hover peek ≠ chosen state), S1497 (contrast) |
| Element | Visualiser C sticky wall on phones | S1326 (a sticky preview follows the list), S1259 (bands ≥ 30 px, buttons 46 px) |
| Element | Visualiser D dial | S0054 (`role=slider`, `aria-valuetext` = colour name), S1330 (damped corner tilt, opposing faces) |
| Element | Visualiser D spec download | S1442 (summary before commit), S0220 (says nothing is sent; claims nothing is saved by the firm) |
| Element | Visualiser B step caption | S1501 (one label where the eye is: on the pinned wall) |

**Critique pass before gating:**

| Skill | Finding | Status |
|---|---|---|
| S1473 H6 recognition | Visualiser D shows every past choice in the preview label | OK |
| S1473 H3 control | Services D auto-advance stops once the visitor touches the trade label or the seam | OK |
| S1479 critique | Visualiser C on phones once led with the wall, before the heading | Fixed (#5) |
| S1498 composition | Services C: the roof panel left half empty | Fixed (#4) |
| S1498 composition | Visualiser C and D differ wholly: a colour field vs a step instrument | OK |
| S1496 brand | Only brand green and lime tints on fields; no dark fields; no steel | OK |
| S1500 type | The Services C numerals are set at display size (Montserrat 800); the facts stay at body size | OK |
| S1482 QA | Breakpoints, focus, keyboard, reduced motion, overflow | Checked (§4) |

---

## 6. Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10; PASS ≥ 7.0, none < 6.0, zero vetoes)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Services C, Counted chapters | 8.2 | 8.0 | 8.2 | 8.6 | **8.18** | PASS |
| Services D, Split cover | 8.4 | 8.2 | 7.8 | 8.6 | **8.28** | PASS. My pick: real jobs carry the proof |
| Visualiser C, Colour fields | 8.2 | 8.4 | 7.8 | 8.0 | **8.16** | PASS |
| Visualiser D, The instrument | 8.0 | 8.2 | 8.2 | 8.2 | **8.12** | PASS |
| Visualiser B phone fix | n/a | 8.0 | n/a | n/a | n/a | Correction landed |

These are my own scores; Muse judges on the committed screenshots.

**Vetoes: none.**
- Only the firm's own photos, each captioned with its record.
- Muse's photos are not used here.
- No invented facts; the locks are intact.
- No form claims anything was sent or saved.
- No errors and no sideways scroll.

## 7. Screens (committed, in `siding/redo/site/gate/`; no switcher in any frame)

- **Per-version sheets:** `u2-services-c.jpg`, `u2-services-d.jpg`, `u2-vis-c.jpg`, `u2-vis-d.jpg`.
- **Each frame:** `u2-{services,vis}-{c,d}-{1440,768,390}-{0,1,2}.jpg`
  - 0 = arrival;
  - 1 = after interaction;
  - 2 = the next chapter or step.
- **Corrections and extras:** `u2-vis-b-phone-fix-390.jpg`, `u2-vis-c-390-sticky.jpg`.

## 8. Next

**Round 3 (Windows + Reviews)** starts now, as instructed, with two corrections folded in:
- the lifted sash showing a flat dark room;
- the reviews dialog header sitting under its backdrop.
