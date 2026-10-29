# QA scripts (evidence for PROGRESS.md / TRACEABILITY.md)

Run from a folder whose `node_modules` holds `playwright` (Chromium preinstalled). Each script reads `rembrandt/v5/rembrandt-homepage.html` by absolute path.

| Script | What it proves |
|---|---|
| `secqa.mjs <section> <outDir> [settleMs]` | Per version at 1440, 375 and 1440 reduced motion: the section's own 1·2·3 picker swaps ONLY that section (every section's live version node is marked before the click and checked after), overflow 0, console errors 0, screenshot. |
| `constel.mjs` | Reviews V1 Constellation in the owner-kept checkpoint build (`git show e685bee:rembrandt/v5/rembrandt-homepage.html` saved as `checkpoint-e685bee.html`) vs the current build: same seeded/constant `Math.random`, reduced motion, overlays hidden; the V1 stage is screenshotted in both for a pixel diff. |
| `constel3.mjs` | Logs the Constellation's `fillText('4.9')` calls (font, canvas size, font-ready) in both builds. |
| `heroint.mjs`, `proofint.mjs`, `workint.mjs`, `famint.mjs`, `howint.mjs` | Signature interactions and every control's hover/press reaction for the hero and reviews versions. |
| `sweep.mjs <w> <h> [reduce] [shots]` | Whole page, all three version sets: horizontal overflow and console errors, optional per-section screenshots. |
