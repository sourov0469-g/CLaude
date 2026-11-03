# GATE, Build cycle 9: Muse's four rulings applied

**Run.** AUSTIN-PROMPT-V2, after Muse accepted GATE-BUILD-8 and issued four delegated-judge rulings in the same message. Citations follow Muse's rule: each tag was checked against the skill's own text in the attached pack, read in this thread (quoted below). Severity follows the S1458 scale.

**Deliverable.** `siding/brand-v2/site.html` (2.06 MB, 85 backups).

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks. The live reference study (Quiet Cubes) was run by me with Playwright and is recorded in the registry.

## 1. The rulings, and what each one changed

| Ruling (Muse, 2026-11-03) | What I found | What changed |
|---|---|---|
| **1. Rimowa is dropped**; sections planned against it substitute from the verified annex list. | Two sections were planned against Rimowa: Home 7 (visualiser entry) and Siding 4 (the visualiser). Both already had Quiet Cubes, a verified annex reference, as co-reference. Annex text: "the visualiser as a staffed design service … build the service structure". | Quiet Cubes now governs both alone. I re-studied it live at code level, including its configurator, which the registry had never reached (R13b). See §2 for what it verifies and what transferred. Plan, reference check and registry updated (R12c "Dropped"). No Rimowa text remains in the site. |
| **2. Captions: real job data only;** months only where the job record carries them. | Each of the six pair records carries a month (`when`), and each matches the date in the firm's own project URL (e.g. `…-07-06-26-aps-4830` → Jul 2026). All 312 map pins carry a year-month in the firm's published finder dataset (`finder.json`, "used as published"), with 53 distinct months and none missing. The firm's own project cards caption the same way ("Sep 2026 · Select Cedar Mill 8.25″"). | Months added from the records, never invented, to the job captions:<br>• hero plates ("Before, then after · Jul 2026");<br>• the before/after index ("siding · Jul 2026");<br>• archive cards and Our work plates;<br>• the three photo captions ("Ridgewood, Cedar Park · Jul 2023");<br>• the map tooltip ("Austin · Sep 2025").<br>Headings, alt text and the chip controls are unchanged. One record flag: `windows3` is filed as "Maple Run, Austin", but its project URL slug says "alexandria". I kept the record's place; the firm should confirm. |
| **3. Process-step names and descriptive copy:** the firm's own published wording first; session copy where it publishes none. | The firm publishes "What to Expect, Start to Finish" on its siding page: 01 Free Inspection · 02 Detailed Proposal · 03 Expert Install ("Tear-off, prep, house wrap and installation, then a clean, presentation-ready site") · 04 Final Check. It publishes descriptions for the lap and board & batten profiles, and none for panel, shingle or the six opening types. | Hero V2 steps (plate and drawing labels):<br>• Measure → **Inspection**;<br>• Strip → **Tear-off**;<br>• Wrap → **House wrap**;<br>• Lay the courses → **Installation**;<br>• Walk-through → **Final check**;<br>• "Trim & paint" stays session copy (the firm names painting, not trim).<br>The wall section's "Weather wrap" becomes the firm's "House wrap". Lap and board & batten descriptions are now the firm's text verbatim; panel, shingle and the opening types stay session copy. Sources are noted in the code. |
| **4. Colour list:** flagged, non-blocking. | — | Stays flagged. Nothing waits on it. |

## 2. Quiet Cubes, observed live (registry R13b)

- **Configurator** (`configurator.quietcubes.com`, from "Go customize"):
  - opens on "Choose your pod type" (4 types), then a panel with Customization / Measurements / Tech specs and option chips;
  - a running subtotal kept above PREV / NEXT, with PREV greyed on the first step;
  - "Got questions or need help?" with a human contact inside the instrument;
  - production and delivery times;
  - ends on "Get the quote" (first name, last name, email, phone).
- **Home page:** 1 Choose & Customize · 2 Place Your Order · 3 Pod Enters Production · 4 Receive and Install · 5 Return for One More.
- **Screens:** `research/p3/qc-b-gate.png`, `qc-b-configurator.png`.
- A 3D pod rendered this time. It is not used: the annex scopes Quiet Cubes to structure.

| Quiet Cubes mechanism | Ours before | Transferred |
|---|---|---|
| Type gate first | Home 7 V1 opens on the profile gate | Held |
| Running summary kept in view above PREV / NEXT | Text summary only at step 4 | **Added:** a "Your wall: Lap · Steel · White trim" line above Back / Next (Siding 4 V1) |
| A person inside the instrument ("staffed design service") | No human contact in any visualiser | **Added:** "Questions while you choose? Call (512) 550-0000." (Siding 4 V1 and V2) |
| PREV greyed on step 1 | Back was disabled in code but looked active | **Fixed:** muted text and a dashed border (§3, finding 2) |
| Ends on "Get the quote" | Ends on "Book an estimate with this" | Held |
| Prices, 3D model | — | Not transferred: the facts lock carries no prices, and the annex scopes Quiet Cubes to structure |

## 3. Other findings and fixes in this cycle

| # | Finding (how found) | Severity (S1458) | Fix | WEB-SKILLS citations |
|---|---|---|---|---|
| 1 | **Intermittent layout shift on the booking deep link: 0.026 in about 1 of 8 loads.** The router scrolled to `#/about/booking` before the web fonts finished decoding; when they swapped, "The story" grew 3–7 px and moved the form under the reader. Found by repeating `cls.js` and tracing section heights frame by frame. | Minor | A deep link now waits for `document.fonts.ready` before scrolling. During that wait the page sits at the top, where the swap happens below the viewport. **Now:** 0.001 in 6 of 6 runs, including one where the swap was caught. The deep link still lands on the form (top 80). | **S0231**: "optimizing for Core Web Vitals (LCP, INP, CLS)". **S0007**: "Reserve space (CLS < 0.1)". |
| 2 | **Back on step 1 looked active.** It was `disabled` in code with no disabled style. Found while comparing with Quiet Cubes' greyed PREV. | Minor | `.btn:disabled`: muted text (still 4.5:1), a dashed border, and a not-allowed cursor. | **S0007**: "Disabled states are visually clear and non-interactive". **S1495** critique-affordance: "Are disabled states clearly communicated without relying on colour alone?" The dashed border is the non-colour cue. |
| 3 | **Hero V2 drawing labels at about 6 px on phones.** The SVG labels scale with the drawing; the longer firm step names can't be enlarged without running off its edge. | Minor (pre-existing) | Below 600 px the label group is hidden. The plate above names the current step in large type. | **S0007** lists "Text < 12px body" as the anti-pattern. |
| 4 | **A primitive in the roofing hero's course line** (`var(--steel-6)` passed into an SVG attribute, missed by the cycle-8 lint). | Enhancement | Now `--color-accent-line-on-dark` (same value). | **S0071**: semantic roles are the only tier components reference. |
| 5 | **Backups: my own process slip.** I took the "before" snapshot after the caption edits, so the pre-caption versions were briefly not backed up. | — | Removed the partial backups, snapshotted the committed state via `git stash`, restored the changes, and backed up all 17 changed versions against it. 85 backups in the file; none are missing. | Addendum: superseded versions go to hidden backups, never deleted. |

## 4. Measured, after the fixes

| Check | Result |
|---|---|
| Viewport sweep (`vp.js`), 390 / 768 / 1024 | 0 findings, 0 JS errors. |
| Accessibility tree, 1440 and 390 | 12 of 12 clean at each width. |
| Contrast / keyboard | 1,009 text elements and 576 rings, 0 failures / 539 stops, 0 traps (+2 each: the new phone links). |
| Layout shift (`cls.js`) | 0.001 in 6 of 6 runs. |
| Conformance (`lint.py`) / weights (`weights.js`) | All counts 0 (the 284 drawing paints stay open) / no synthesised weights. |
| Map tooltip | "Austin · Sep 2025"; 53 distinct months across 312 dots, all from the finder records. |
| Performance, 375 at 4× CPU | Total blocking time 69 / 149 / 95 ms (median 95, against 88). The likely cause is 17 new backups adding about 120 KB to parse. Under 200 ms. CLS 0. |
| Regression | Audit 0 problems; duplicate ids 0; barred terms 0; "Rimowa" in the site 0; pinned fit 0 clipped at both heights; reduced motion and deep link correct; Pause, route stop, cursor and live region correct. |

## 5. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.7 | Unchanged. |
| Usability (30) | 8.8 | +0.1: the deep-link shift is fixed, there is a real person inside the visualiser, and the disabled state reads. |
| Creativity (20) | 7.2 | Unchanged. |
| Content (10) | 8.8 | +0.3: every job caption carries its record's month; the process and two profile descriptions are now the firm's own words. |
| **Weighted** | **8.04** | **PASS.** Every category is at 6 or above. |

**Vetoes: zero.**

## 6. Remaining

1. **The colour list:** flagged, non-blocking (ruling 4).
2. **For the firm:** `windows3`'s place ("Maple Run" in the record, "alexandria" in its project URL).
3. **Open from cycle 8:**
   - 284 primitive paints inside the construction drawings (need per-drawing component tokens);
   - `var()` in SVG presentation attributes, untested outside Chromium.
4. **The single file is now 2.06 MB, 85 backups included.** Backups add to parse time on phones. This is the cost of the never-delete rule, recorded here so Muse can weigh it.
5. **A person on a physical phone and tablet, in Safari and Firefox, and with a screen reader.**
