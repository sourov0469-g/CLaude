# GATE-FIX-INFRA · versions in-file, muted palettes, distinct and sharp media, the new checks

Part of the fix order (OWL-FIX-AND-VERSIONS-2026-11-05). The plan is in `OWL-FIX-DIAGNOSIS-2026-11-05.md` §6. This item makes the rest possible; it changes no section's design.

## 1. Versions per section, switchable in-file (the owner's review format)

**Files:**
- `reset/sections/<NN-name>/v1.html … vN.html` are the versions;
- `b1.html` in each folder is the reset original (d165ff8), kept untouched as an inert in-file record;
- `reset/versions.json` holds the names and the default per section.

**In the page:**
- every version is an inert `<template>`;
- one script stamps the chosen version of each section, in place, before anything else runs (`?top=2&finder=3`, otherwise the default);
- unchosen versions never run their scripts and never add pinned height.

**The switcher:**
- a **Versions** button in the top bar opens a panel with one row per section, V1…Vn, the best starred and the current one pressed;
- a choice reloads to that section with the choice in the address, so any combination can be sent as a link;
- "Show the bests" clears it;
- the button turns solid when the page shows anything other than the bests.

**Evidence:**
- `gates/fix/hero/panel-1440-1-open.jpg`, `panel-1440-2-switched.jpg`, `panel-390-*`;
- choosing "V2 Pull back" reloads to `?top=2#top`, with `RESET.versions.top.cur === 2` and the button marked.

**Records:** the past homepage (`?past`) and both frozen files in `past/` are untouched. The d165ff8 build is newly frozen as `past/owl-roofing-PAST-2026-11-05-reset-d165ff8.html`.

## 2. The muted palettes (owner: "too bright")

**Shingle Slate is the default.** North Navy, Hearth Charcoal and Storm Stone are in the switch. The four amber palettes of the reset night stay in the CSS as records (`?palette=night`) but leave the switch.

**New roles:**
- `--on-acc`: white text on the accent;
- `--call` / `--on-call`: the one warm, saturated place, the phone action;
- `--acc-deep`: accent words on dark bands;
- `--wash`: tinted panels.

The GATE-BUTTONS shape and press are unchanged, recoloured:
- primary buttons are the slate accent with white text;
- the call pill and every `tel:` button (`.btn-call`) are copper with white text.

**Every pair, computed:** `gates/fix/colour/palettes.json` (and in the diagnosis §3). All four palettes pass AA for every role the page uses:
- ink on ground: 13.09–13.65:1;
- white on the call button: 5.14–6.42:1;
- accent words on dark bands: 7.05–8.06:1.

## 3. Media: one section owns each file; sharp only

**`tools/stock-prep.py`:**
- turns checked Pexels files (fetched by ID from the CDN into the scratchpad, never committed raw) into WebP photos (2400 px long side, q72) and H.264 films (scrubbed films get a keyframe every 10–12 frames, no audio);
- writes `MEDIA-CREDITS.md`.

**Size:** the page went to 33 MB with the first encodes. Tightened:
- the section-3 drone film went from 10.7 MB to 4.2 MB at CRF 33; looked at before and after, the roof, the roofer and the house stay crisp, with slight softening in the trees;
- videos used by both the past records and the new page (Owl's crew film) are now stored once;
- result: **21.9 MB**, with the past homepage inside as records.

**Every video plays from a Blob URL** decoded once from the file, and is primed with a muted play-then-pause before scrubbing. This is the iOS fix for large `data:` video. It was tested in Chromium only; WebKit is not installed here.

## 4. The new checks (`tools/fix-test.cjs <section> <version>`, on `owl-roofing.html` itself)

**Generic, for every version:**
- axe in the four muted palettes;
- the facts lock, which now also refuses any other phone number and "lifetime";
- no skeleton;
- **distinct media:** nothing the section shows appears in any other section (every other section at its best), and nothing is shown twice at once. Repeats elsewhere are reported for their own gates;
- **sharpness:** at 1440 (DPR 1) and 390 (DPR 2), every image and video is measured at three scroll points, honouring `object-fit`, and fails if shown above 1.12× its own pixels;
- layout at 1440, 768 and 390, with 44 px controls;
- reduced motion;
- no errors.

**Per version:** behaviour checks in `tools/fix-checks/<section>-v<N>.cjs`.

**The checks catch real things:** on its first run, the distinct-media check found the two repeats the diagnosis named (section 2's "not sure" photo in section 5; the owl illustration in sections 6 and 7). Both are scheduled for those sections' gates.

## 5. Defects found and fixed in-session
1. **A class collision:** the hero V3 photo box was called `.ph`, the same as the button system's phone icon, so the call button grew to full screen height. The box was renamed (and in V4 too).
2. **The palette name wrapped** onto two lines in the bar. It is now `nowrap`.
3. **The video store** was first written after `<body>`, too late for the head script that names the films. It now sits in the head.
4. **A stray results file** written one folder too high was removed (its literal path).

## 6. Remaining (named)
- **D1 · WebKit is not tested.** The Blob URL and priming follow known iOS behaviour, but I can only run Chromium here.
- **D2 · weight:** 21.9 MB, about 10 MB of it the past records the owner ordered kept in the file. A live site would move the records out.

Process, stated exactly (corrected after Muse's check): every command I ran for this item was a foreground command with a time limit, in my own thread; I made no Agent calls and no run_in_background calls. I did not verify what the harness panel counts as a task (my task checklist, or a scheduled check-in created outside this session), so this line does not claim more than that.
