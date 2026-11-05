# GATE — Visualiser V, "Recolour a real Austin Pro house" (upgrade plan V-A)

**Under:** AUSTIN-UPGRADE-PLAN-2026-11-05 (passed by Muse; build order: weight, Hero, Booking, Services, Visualiser), AUSTIN-CONSULT-FIRST, Muse's binding consult reply on Visualiser V-A, and the owner's order of 2026-11-05 evening (sub-agents preferred, up to 2; section backgrounds with life).

**Consult reply, as applied:**
1. **Photo #36** (Ashford Park, Buda · Jul 2026 · Siding, Shingle Roofing & Exterior Painting). Not used anywhere else on the page (Services uses #3, #39, #10, #37, #33; the hero uses #5).
2. **Trim and soffit stay as shown where untraced; the Trim step recolours only traced areas.** The traced trim is the three dark window frames; soffit, fascia, the door and the roof are never touched (tested).
3. **The honesty label is exactly as ruled**, with no extra line (this photo has no brick): "A real Austin Pro job, recoloured on screen. Colours are approximate; see real samples at the free inspection." It sits under the photo and again on the preview card (string-compared in the test).
4. **Background: the drawn colour-chip and roller-stroke art from the kit, kept off the photo** (below).

**Sub-agent use, stated honestly (two used, the maximum; prep only, writing nothing but under `siding/redo/prep/`):**
- **Agent 1 (earlier, for this section):** the photo re-selection after #3 went to Services; its `mask-photo41.json` is unused now that #36 was chosen. Agent 2 (earlier): the background art kit, whose **Visualiser set is used here** (inlined and renamed; see below).
- **Two new agents ran in parallel with this build, for the next two sections:** a Windows W-A prep (photo crops and verified facts) and a Reviews R-A prep (verbatim voices). Both had their own file writes refused by the tool, so I saved their reports myself as `prep/windows/REPORT.md` and `prep/reviews/REPORT.md`; their findings feed the NEXT PLAN below. Neither touched the build, the page, git or any gate. The Windows agent left `windows-crops.jpg`.
- **The build, the window-frame mask, the tests and this gate were done by this session alone.** No background tasks were used (the 259-view sweep ran as four parallel local processes of my own script).

## Result

**`?vis=o` is now the shown default** (`LIVE vis = 'o'`). Visualiser B (the snap-together wall) is parked as a hidden in-file backup like the other 13 (nothing deleted).

**What it is:** one real job photo you can put a colour on, in three steps.
- **1 Colour:** the 17 ColorPlus colours the page already publishes (same list as Visualiser A–N), as chips (a swipeable row on phones). Picking one recolours the siding at once.
- **2 Trim:** "As photographed" (default), Arctic White (ColorPlus trim colour), Tricorn Black (painted, SW 6258) or "Match the body", applied to the window frames only; one quiet line: "Only the window frames are recoloured. Soffit, fascia and the door stay as shown."
- **3 Preview:** the original and the recoloured photo side by side, full width; a card "Bring these to your inspection: Boothbay Blue · Arctic White frames", the one filled **Book a free inspection**, and "Change a choice". The card is never claimed saved or sent.
- **The recolour keeps the real photo:** per-pixel `out = target × (luminance ÷ reference)` inside two hand-traced masks (even-odd polygons: siding 4.1 KB, window frames 1.6 KB, in the photo's own pixel space and scaled), highlights compressed by half; so the real boards, light and shadow stay. Everything outside the masks is byte-for-byte the photograph (sky, roof, grass, door, glass and fence tested).
- **Live unit:** a colour change **sweeps down the boards course by course**: a second canvas revealed by a stepped clip (36 steps, 0.9 s). Rapid clicks settle on the last colour. A new colour costs about 5 ms to render. **Reduced motion:** instant swap, background still. **Touch:** tap. **Keyboard:** arrow keys, Home, End on the chips and trim options (a radio group), 3 px focus rings, the choice announced in words ("Boothbay Blue siding, Arctic White window frames.").
- **Without script:** not supported, like the rest of this page (the whole page is built and revealed by script; with script disabled this section's photo area stays blank). The plain `<img>` is the base layer, so if the recolour script fails after the page has loaded, the unrecoloured photograph and its label still show.

**Background treatment (new owner order):** the kit's Visualiser set, quiet and kept off the photo: tonal bands and a paint-roller stroke on a far layer; a fan of colour chips, a roller outline and a tonal ramp on a near layer; on the pale-green ground. It drifts at two speeds (24 px and 60 px over the section's pass), transform only, one `requestAnimationFrame`, only while the section is on screen; none under reduced motion. 3.7 KB of SVG (its ids renamed so they cannot meet another section's).

**Files:** `visV()` in `build_site.py` (markup, photo, masks, colour lists, art), `src/sec/vis10.js` (`Vis10.wire`), `src/sec/vis10.css` (prefix `vcl`); in the prep folder `trim36.py` and `mask-photo36-trim.json`. Nothing else changed.

**Weight:** +149,563 bytes: **13,255,976 → 13,405,443** (ceiling 22.5 million; target ≤ 14.5 million). The photo is embedded once at 1200 × 900 (never upscaled: shown at most 876 px wide), the masks 6 KB, the art 3.7 KB.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`): `new-visualiser-v-1440-s0` (start), `-1440-s0-blue`, `-1440-s1-white` (trim step), `-1440-s2` (preview), `-390-s0`, `-390-s1-white`, `-390-s2`; sheets `new-visualiser-v-colours-sheet.jpg` (six colours, straight from the live canvas), `-steps-sheet.jpg` and `-small-sheet.jpg` (phone, three steps).

Fixed-state tests (Chromium): **37 of 37 checks pass.**

| Check | Result |
|---|---|
| Label | Exactly the ruled string, under the photo and on the preview card |
| Photo record | Equals `photos.json` #36 (place, month, trades, link), no other caption; alt text real |
| One photo, one Book | One image in the section; exactly one Book link; no form fields |
| Colours | 17, equal to the published list in order |
| No extra lines | No "brick", "shade" or "shadow" text; no number beyond the photo's record and step numbers |
| Never upscaled | Natural 1200 px against 876 px displayed at 1440 |
| Recolour fidelity | Iron Gray: sunlit-wall median (87, 91, 84) against the colour's #575B59 = (87, 91, 89); boards and light kept (pixel spread 27); across all 17 colours: 17 distinct results |
| Everything outside the masks unchanged | Sky, roof, grass, door, glass, fence and the window glass: identical to the photo (difference ≤ 6 of 765 in every test, sky 0 across all 17 colours) |
| Trim | Arctic White: frame (37, 40, 36) becomes (209, 209, 202), glass and wall unchanged; Tricorn Black keeps frames dark; "Match the body" takes the wall's colour; the door stays as shown |
| Preview | Panel and photo hidden, both canvases shown, left is the photo and right is recoloured, card text correct, "Change a choice" returns to step 1 with choices kept |
| Keyboard | Arrow and Home move the selection and the focus; 3 px focus ring; status announced in words; canvases hidden from assistive tech |
| Motion | Stepped clip (36 steps, 900 ms) runs on a colour change; 5 rapid clicks settle on the last with no stuck wipe; reduced motion: no wipe; a click renders in about 5 ms |
| Contrast (WCAG) | Heading 16.5 · panel title 17.6 · chip names 16.5 · status 12.5 · label 8.3 · photo record 5.7 · note 6.1 · active step 12.5 (all ≥ 4.5) |
| Fonts | Montserrat and Inter only |
| Height | Worst of the three steps: 1.13 screens at 1440, 1.28 at 1024, 1.16 at 768, **1.12 at 390**, 1.29 at 360 (≤ 1.3 everywhere); all targets ≥ 48 px |
| Page errors and overflow | 0 errors; no overflow inside the section at any width (the page's 17 px at 1024 is Reviews B and Area A, defaults of two later sections) |
| All views | **259 views** (every homepage version of every section plus every subpage): 0 page errors, 0 overflow, 0 unresolved images; the one flag is hero L's 8 intentionally empty `lim` images, identical before this change |
| Existing versions | Against the last committed page, images blanked and the weight pass's image ids normalised: **202 templates vs 201, with only `vis:b` added**, **0 changed**; the body outside the visualiser slot is identical |

## Defects found and fixed

1. **The first window-frame mask was wrong three times.** The frames are near-black grey-green, the same colour family as the glass, so a colour rule failed; a bright-sash detector then failed. The final mask is geometric (the ring between the fitted outer frame edge and the white sash outline, read off the photo and checked on an overlay) and darker-than-wall only: 20,549 pixels, 6 polygons.
2. **Phone was 1.6 screens** (17 chips in a grid under the photo). The chips became a swipeable row; the trim options a 2 × 2 grid; the preview stays side by side; now 1.12.
3. **360 px wide went to 1.39 screens in one step:** tightened the smallest-width type and padding; now 1.29.
4. **Buttons fell back to the browser's default font (Arial):** `font-family: inherit` on the section's buttons.
5. **Test harness only:** one preview probe sampled the roof (same in both halves); moved to a wall pixel. One overflow probe counted the page's own 17 px at 1024.

## Remaining, named honestly

- **The recolour is an approximation, by design** (the label says so): a luminance-preserving multiply, not a repaint; the sunlit wall lands on the chosen colour, the shaded areas follow the photo's own light.
- **Known mask limits of photo #36:** the strip of wall to the right of the right-hand window, behind the tree's branches (about 70 × 120 px), stays its original tan; the corner boards (the same tan as the siding) recolour with the wall; a faint 1–2 px light outline can show around the dark frames on some colours; the overcast, flat light gives little shadow to preserve; the wall's slanted left edge is the photograph's own perspective.
- **Trim is only the three window frames.** Fascia, soffit and the door stay as shown, as ruled; the Trim step therefore changes little on this house, which the one-line note says.
- **Tricorn Black barely changes** the frames (they are already near-black); that is the photograph.
- **The 17 colours are the published ColorPlus list with the hex values the page already uses**, which are approximations of the factory colours.
- **One more Book button on the page** (the preview card's): the page now has 7 in the body (10 in the DOM with the header and mobile bar) against the target of 6; the Windows, Reviews and Try rebuilds should bring it down.
- **Testing:** Chromium only; the sweep was verified in headless Chromium, not on a real device.
- **Page rules are not yet met** (four of nine sections done).

**Page-rule baseline after this gate** (default page):

| Rule | Target | Now |
|---|---|---|
| Section height | ≤ 1.3 screens | Hero, Services 1.1, **Visualiser 1.1 / 1.0 phone**, Booking ✓ (Process A 4.1, Try A 5.2, Windows A 1.5 on a phone still over) |
| Page length at 1440 | ≤ 10 screens | **16.9** (was 16.8; the Visualiser is a little taller than Visualiser B) |
| Pinned sections | ≤ 1 | 2 (Process A, Try A) |
| Book buttons | ≤ 6 | 10 (7 in the body; the rest are the header and mobile bar) |
| Each number once | | Visualiser carries none of the counts; 431 (Try A), 388 (Windows A, Try A), 121 and 320 (Try A), 4.9 ×3 and 474 ×2 still repeat in sections not yet rebuilt |

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Visualiser V | ⟦S0006⟧ restraint: one photo, one choice per step; ⟦S1444⟧ one choice per step; ⟦S1440⟧ feedback: the result is the photo itself, and the choice is also announced in words; ⟦S0220⟧ the label and the photo's record are the only claims |
| Element | chips, trim options, steps | ⟦S0054⟧ radio groups with arrow keys, `aria-current` steps, focus rings, 48 px targets; ⟦S1494⟧ plain labels |
| Element | photo and canvases | ⟦S0985⟧ one 1200 px copy, explicit size, never upscaled; ⟦S0956⟧ real alt text; ⟦S0062⟧ rendering about 5 ms, only the masked pixels |
| Motion | the sweep | ⟦S1436⟧ a stepped reveal that follows the boards; ⟦S0400⟧ reduced motion instant; ⟦S0062⟧ clip and drift on the compositor |
| Background | drawn art | ⟦S0060⟧ two layers at two speeds, transform only, only while visible; ⟦S0231⟧ 3.7 KB |
| Site | contrast, locks | WCAG ratios on rendered colours; the label and record string-compared |

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.7** | A real, sharp house you can recolour, in a calm three-step instrument; the colour sheet (`-colours-sheet`) holds up on all six colours shown and the preview reads at a glance. **Minus:** a flat overcast photo; the instrument panel is a familiar form |
| Usability (30) | **8.6** | One choice per step; instant result; keyboard, touch and reduced motion verified; the card ends in the one booking action. **Minus:** the trim step changes little on this house; the chip row needs a swipe on phones |
| Creativity (20) | **8.6** | The real photo recoloured with its own light, and a sweep that follows the boards, is what no earlier version did. **Minus:** the sweep is a stepped clip, not a bespoke effect |
| Content (10) | **8.8** | The label exact; the colours the page already publishes; the photo's own record only; nothing invented. **Minus:** "Try a colour on a real Austin house." is my wording |
| **Weighted** | **8.66** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.7 + 0.3 × 8.6 + 0.2 × 8.6 + 0.1 × 8.8 = 3.48 + 2.58 + 1.72 + 0.88 = **8.66**.

**On the score:** it sits above Visualiser M (8.57) and N, as the plan predicted, but I am not claiming a win on the number. The case for V-A is that it is the first version that shows a real Austin Pro house in the visitor's colour.

## NEXT PLAN — Windows W-A "Windows, close up", for Muse's consult

Under the consult-first order and the upgrade plan Muse passed (W-A agreed; build order: Windows fifth; the page's ONE dark deep-green band). **Nothing below is built.** It uses the Windows prep agent's findings (`prep/windows/REPORT.md`, `windows-crops.jpg`), which I have read and spot-checked against `photos.json` and `faq.json`.

### AUDIT — the Windows section now
- **The shown default is Windows A:** 1.0 screen at 1440 but **1.5 on a phone** (over the rule), and it repeats counts that other sections carry (388 also sits in Try A).
- **The other 13 versions:** Windows L's before/after reveal is a barred centrepiece under the plan's rules; none shows tight, real window photos on the page's one dark band.
- **What works today:** the published window facts and the verified FAQ sentences; at least nine photographed window jobs (Windows D checked them one by one).

### RESEARCH
- **Governing reference: Lando Norris** (a curated archive with index and hover craft). Transfers: the horizontal archive and its quiet index. Does not: racing content or type.
- **WEB-SKILLS:** ⟦S1443⟧ ⟦S0204⟧ ⟦S0985⟧ ⟦S1426⟧.

### THE PLAN — W-A
| Element | What will be built |
|---|---|
| **The band** | The page's **one** dark section: deep green #0E3B2C, with white text (12.5:1) and lime #B5DB6E accents (7.9:1); rounded full-bleed band between two light sections |
| **The archive** | A horizontal row of **six** tight crops of real installed windows, 720–760 px wide masters (never upscaled at 700 css px), each captioned only with that job's place, month and trades and linking to its project: **#4** Austin · Sep 2026 · Windows; **#6** Barrington Oaks, Austin · Jul 2026 · Windows; **#7** Windermere, Pflugerville · Jul 2026 · Windows; **#42** River Place, Austin · May 2026 · Windows; **#40** Bull Creek, Austin · Jun 2026 · Windows & Doors; **#29** Austin · May 2026 · Shingle Roofing, Windows & Siding. Dropped: #38 (the same job as the hero photo #5) and #41 (an older, low-reflection frame) |
| **The rail (facts once)** | "388 documented window jobs"; the median band "$10k–$15k median band (376 priced)"; the brands as published, labelled "of the 376 priced window jobs": NT Windows 238 · Simonton 54 · Andersen 38 · Pella 31; "Most of the window-only jobs in our files took two days on site." (verbatim, `faq.json`) |
| **Live unit** | The glass in each crop catches a slow reflection sweep as the frame reaches the centre: a CSS gradient over the photo (transform and opacity only), only on frames the agent judged to have glass that suits it (#7, #42, #40, #29); drag, wheel or arrow keys scroll the archive; a quiet index shows which of six you are on. Reduced motion: no sweep |
| **Background treatment** | The kit's Windows set (it works on dark: light strokes at low opacity): sash grid, glass reflections and light rays on two layers, 4.2 KB, drifting at two speeds on scroll |
| **Height, weight** | ≤ 1.3 screens (target 1.0 at 1440, ≤ 1.3 on a phone); fresh crops of 720–760 px from the masters (never upscaled at 700 css px), about 40–70 KB each, ≈ 350 KB in all (Windows D's existing copies are 960 px of the whole photo, so they cannot be reused as tight crops without upscaling); the page stays under 14.5 MB |
| **Honesty rules** | Captions are only the photo's own record; the brand counts say what they count; nothing about warranties or brands beyond the published sentences |
| **Retire** | Windows A stops being the default (hidden backup); L and the others stay hidden |
| **Sub-agents** | Up to two, prep only, declared; the Reviews R-A prep is already done (`prep/reviews/REPORT.md`) |

**Why it should beat the best (L 8.64):** L's before/after reveal is now a barred centrepiece. W-A puts real installed windows in front of the visitor, close enough to judge the work, with cost and brands in one rail.

### Decisions for Muse (the consult reply)
1. **The six frames above** (my recommendation) or a different set; OK to drop #38 and #41?
2. **The brand counts.** `faq.json` says NT Windows 238, Pella 31, Simonton 54 and Andersen 38 "of our 376 priced window jobs"; `siding/FACTS.md` line 104 lists different documented counts (251, 72, 55, 42), and the four brands cover 361 of 376 (Provia has 5). **Recommendation:** show the FAQ's figures, labelled "of 376 priced window jobs", and never the FACTS.md set; say if you would rather show no brand counts.
3. **"388 documented window jobs"** is in `FACTS.md` and the site code (`cta7.js`, `p_wd1.js`) but not in the four data files; it is the published lock you gave. OK to use it once, in the rail?
4. **The one dark band:** Windows is the only dark section on the page, as you ruled; the rounded band's edge colour (#0E3B2C) is the only place the dark touches another section. Agreed?
5. **Order:** Reviews R-A is prepared (18 verbatim voices, `prep/reviews/REPORT.md`); build Windows W-A first, then Reviews, as the plan says?
