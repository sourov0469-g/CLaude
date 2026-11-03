# GATE, Austin redo, Stage 1: reverse-engineering dossier

**Brief:** AUSTIN-REDO-BRIEF.md, Stage 1 only. There is no branding and no HTML in this stage.

**Deliverable:** `siding/redo/REVERSE-ENGINEERING.md`.

**Process:** every step ran in this session's own thread. No sub-agents, no background tasks. Nothing was published or uploaded.

## 1. What the brief asked, per reference, and where it is answered

The brief asks six things of each reference:
- **Mech.** the mechanism, at code level;
- **Frames.** frame-by-frame evidence;
- **Timing.** the exact interaction, timing and easing;
- **Cursor.** what the visitor's cursor does;
- **BG.** the background at rest and on hover;
- **Handover.** how sections hand over to each other.

Then: what transfers, what does not, and the concrete Austin version.

| § | Reference | Mech. | Frames | Timing | Cursor | BG | Handover | Transfer / not / Austin |
|---|---|---|---|---|---|---|---|---|
| 1 | Immersive Garden | ✓ | ✓ | ✓ | ✓ measured (3 layers) | ✓ decisive run | ✓ | ✓ cut-stock field |
| 2 | Igloo Inc | ✓ | partial | ✓ | ✓ | ✓ | from code | ✓ the corner you can turn |
| 3 | Lusion | ✓ | ✓ screencast | ✓ | ✓ | ✓ | ✓ | ✓ offcut pile, dwell-and-glide |
| 4 | Scout Motors | ✓ | ✓ | ✓ | ✓ (none) | ✓ | ✓ | ✓ house as product |
| 5 | Apple AirPods Pro | ✓ | ✓ | ✓ | ✓ (system) | ✓ | ✓ | ✓ wall-assembly chapter |
| 6 | MERSI | ✓ | ✓ | ✓ | ✓ (none) | ✓ | ✓ | ✓ pairs instrument |
| 7 | Lando Norris | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ job archive index |
| 8 | Graza | ✓ (CSS census) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ motion table |
| 9 | Quiet Cubes | ✓ | ✓ after gate | ✓ measured | ✓ | ✓ | ✓ | ✓ trade choice, visualiser |
| 10 | Cash App | ✓ | ✓ | ✓ measured | ✓ pill measured | ✓ | ✓ | ✓ finishes as fields |

**"Mechanism described exactly" means:**
- the constants are quoted from each site's own code;
- or, for Immersive Garden's cursor, Quiet Cubes' gate exit and Cash App's pill, they were measured in the browser.

The one reference where frames are partial is stated below.

## 2. Evidence, committed

- **Tools:** `siding/redo/tools/` (recon, probe, cast, sheet, ig_trigger, ig_field, ig_rest, pill, qc).
- **Measurements:** `siding/redo/evidence/<site>/` holds `recon.json` and, where taken, `probe.json`, `pill.json` and `gate.json`.
- **Contact sheets to open first:**
  - `immersive-garden/sheet.jpg` and `rest-sheet.jpg`;
  - `igloo/sheet.jpg`;
  - `lusion/wheel-sheet.jpg`;
  - `scout/sheet.jpg`;
  - `apple/sheet.jpg`;
  - `mersi/sheet.jpg`;
  - `lando/sheet.jpg` and `lando-offtrack/sheet.jpg`;
  - `graza/sheet.jpg`;
  - `quietcubes/gate-sheet.jpg`;
  - `cashapp/sheet.jpg` and `cashapp-color/sheet.jpg`.
- **For weight:**
  - frames were converted from PNG to JPEG at quality 78, which took 218 files from 105 MB to 15 MB;
  - screencasts keep every third frame plus the last, with `marks.json` intact;
  - the evidence folder is 26 MB.
- **Third-party code is not committed.** The sites' bundles stay in the session scratchpad, and only short excerpts are quoted in the dossier.

## 3. Limits and corrections, stated rather than smoothed

1. **Software WebGL runs at about 3 fps here.** WebGL durations and easings come from code constants. The frames prove sequence, composition and what reacts to what. Cursor figures are per animation frame.
2. **Igloo's virtual scroll did not advance** under software rendering. Its later chapters (manifesto window, carousel, floor) are from code only.
3. **Immersive Garden was corrected twice.**
   - First conclusion: the pointer reveals the relief.
   - Second conclusion: only scroll reveals it, and the pointer only tints. That came from a frame taken while the page was still loading.
   - The decisive run (`tools/ig_rest.js`): no input for 124 s, then a pointer pass.
     - The relief appears by itself after the loader and recomposes at rest.
     - **The cursor raises relief along its path:** mean pixel change of 8.32 near the path against 1.48 elsewhere.
     - It sinks back as the flowmap dissipates.
     - Nothing drifts: relief only rises and sinks in place.
   - The dossier keeps both earlier conclusions on record (§0, limit 4).
4. **MERSI.** One recorded wheel step (195 px, 22% of the viewport) should snap back by the code, yet the run advanced once. The 150 ms debounce stretches under software rendering. The mechanism is quoted from code; the frames confirm its appearance only.
5. **Quiet Cubes configurator.** Only its first step (Capacity) is on record. Later steps were not walked.
6. **Lusion.** Whether it keeps native scroll was not measured, because screenshots time out there.
7. **Real-time feel.** The real-time decay of Immersive Garden's raised relief (predicted half-fade of about 0.25 s at 60 Hz) is a prediction from its constant, not a measurement.

## 4. Locks carried forward, unchanged

- Phone (512) 550-0000 · 4.9/474 only.
- 7801 N Lamar Blvd Suite C70, Austin TX 78752.
- Mon–Fri 8–8, Sat 8–6, Sun 12–5.
- Since 2009, merged 2018.
- GAF Master Elite · James Hardie Elite Preferred + President's Club 2025 · Andersen Certified Premier · BBB A+.
- "312 on the map with photos + 574 more counted" · 177 pairs.
- info@austinprosiding.com.
- Forms never claimed saved or sent.
- The "5,000+" figure stays out.

## 5. Stop

Stage 1 ends here. No branding and no HTML have been started. Stage 2 (branding from zero) waits for Muse's judgment of this dossier.
