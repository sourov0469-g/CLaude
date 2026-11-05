# GATE-FIX-PAGE · the whole homepage after the fix order: 22 versions, the bests by default, no media twice, muted, sharp

**The file:** `owl-roofing.html` (27.3 MB, one file; the past homepage still travels inside it as records).

**How to review it:**
- **Versions** (top bar): the panel lists each section's versions; the best is starred. Choosing one reloads to that section with the choice in the address, so a combination can be sent as a link (for example `?top=2&finder=3&numbers=1`). "Show the bests" clears it.
- **Palette** (top bar): Shingle Slate (the default), North Navy, Hearth Charcoal or Storm Stone.
- **`?past`:** the whole past homepage, unchanged.

## 1. What the owner asked for, and where it stands
| Owner (2026-11-05 14:00) | Done | Evidence |
|---|---|---|
| **The same video twice: never** | Owl's crew film plays only in hero V1. Section 3 scrubs different footage, and every film and image belongs to one section. **All 22 versions were loaded and hashed:** 28 distinct files, **none shared between sections**, so no combination of switched versions can repeat one. On the default page the report reads "no repeats". | `gates/fix/page/media-all.json` |
| **Colours too bright** | Shingle Slate (slate and copper) is the default; North Navy, Hearth Charcoal and Storm Stone are in the switch. The amber palettes stay only as records. Every text pair is computed AA, and axe passes in all four palettes for every version. | `gates/fix/colour/palettes.json`, every `checks-*.json` |
| **3+ versions per section, hero 4+, switchable, best as default** | Hero 4; the problem-finder, "nothing", numbers, family, towns and call 3 each: **22 versions**. Each is gated, with the default and the reasoning in its gate. | `GATE-FIX-HERO`, `-FINDER`, `-NOTHING`, `-NUMBERS`, `-PEOPLE`, `-TOWNS`, `-CALL` |
| **No blurry images; stock allowed** | Every image and film in every version is measured at 1440 (DPR 1) and 390 (DPR 2) and shown at no more than about 1.1× its pixels. The stock is sharp Pexels (1600–2400 px), tagged "Illustrative" and credited. Owl's own small photos are shown at their own size. | the sharpness check in every `checks-*.json`; `MEDIA-CREDITS.md` |
| **"A couple of later sections aren't working"** | The faults the audit found are fixed in their sections: half-masked numbers, the family collage, stretched photos, the pill over the towns, and "Closed now" read from Dhaka. The same wheel-scroll audit, re-run on the finished page (desktop and an emulated iPhone), finds **no errors, no masked numbers and no invisible text in view**. | `gates/fix/page/behave-after.json`, the diagnosis §2 |
| **Past versions kept as records** | The past homepage (`?past`) is unchanged: 10/10 against the frozen pre-reset file. The reset originals are kept as in-file records (`b1` in each section). The d165ff8 build is frozen in `past/`. | `gates/reset/home/modes.json` |

## 2. The bests (the page the owner opens)

| Section | Default | Why (full reasoning in each gate) | Checks |
|---|---|---|---|
| Hero | **V1 Crew film** | The owner's own "perfect"; Owl's only real film, now sharp | 26/26 |
| Problem-finder | **V1 Curtain** | Its choice travels in the bar for the whole page | 25/25 |
| Your part: nothing | **V1 Scroll film** | The owner's scroll film, with new footage | 26/26 |
| Numbers | **V2 Ninety marks** | The most creative and honest; a light breath after three dark sections | 24/24 |
| Family | **V2 Prints on a table** | Real photos at their own size, the most human moment; frees a pinned stage | 25/25 |
| Towns | **V2 Distance rings** | Answers "do you come?" and "how far?" in one picture | 30/30 |
| Call | **V1 End card** | Highest score; the hours now explain themselves | 28/28 |

All seven defaults were re-run on the final build: **184/184**.

**Across all 22 versions:** every one passed its own gate (the hero 97, the finder 75, "nothing" 74, numbers 73, family 73, towns 89 and call 80 checks).

## 3. The page as a whole
- **One world:** muted slate ground, dark bands for the films, copper only on the phone action, and one sky.
- **Pinned stages: two by default** (the hero, and section 3), down from three.
- **The page remembers you:** the case chosen in the hero (V4) or the finder, and the town found in the towns section, write section 3's first step, the call headline and the prefilled email. This works whichever versions are switched on.
- **Journey:** `gates/fix/page/journey-1440.jpg` and `journey-390.jpg`.

## 4. Remaining (named, all in their gates)
- **Owl's own media are small.** The crew film is 960 × 540 and the family photos 558–900 px. They are sharp now only because they are shown small. Higher-resolution originals from the owner would let them go large again.
- **iOS is not tested on a device.** Only Chromium runs here. The Blob-URL video and priming follow WebKit's known behaviour.
- **Weight:** 27.3 MB as one file, about 10 MB of it the past records kept inside by the owner's order.
- **No holiday list:** "Open now" follows the posted hours only.

## 5. Vetoes: **zero**
- Facts exact: (651) 977-6027 only, GAF Systems Plus, licence #BC809662, BBB A−, "5.0 · 90+ reviews", up-to-50-year wording.
- No invented reviews, claims or jobs.
- Real photography only, with stock tagged.
- The logo shape is untouched.
- Process, stated exactly (corrected after Muse's check): every command I ran for this item was a foreground command with a time limit, in my own thread; I made no Agent calls and no run_in_background calls. I did not verify what the harness panel counts as a task (my task checklist, or a scheduled check-in created outside this session), so this line does not claim more than that.
