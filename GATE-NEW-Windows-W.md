# GATE — Windows W, "Windows, close up" (upgrade plan W-A)

**Under:** AUSTIN-UPGRADE-PLAN-2026-11-05 (passed by Muse; build order: weight, Hero, Booking, Services, Visualiser, Windows), AUSTIN-CONSULT-FIRST, Muse's consult reply on Windows W-A (all five decisions agreed as recommended), and the owner's orders of 2026-11-05 (sub-agents preferred, up to 2; section backgrounds with life; the 22.5 MB ceiling and 14.5 MB target).

**Consult reply, as applied:** (1) the six frames #4, #6, #7, #42, #40, #29, with #38 and #41 dropped; (2) the brand counts from `faq.json`, labelled "of the 376 priced window jobs", never the FACTS.md set; (3) "388 documented window jobs" used once, in the rail; (4) Windows is the page's one dark band (tested: exactly one dark band in the page body); (5) order: Windows now, then Reviews.

**Sub-agent use, stated honestly (the maximum of two; prep only, writing nothing but under `siding/redo/prep/`):**
- **For this build:** the Windows prep agent (earlier; frame choices, crop rectangles and the verified rail facts, `prep/windows/REPORT.md`) and the background art kit agent (earlier; its Windows set is used here).
- **Two new agents ran in parallel with this build, for later sections:** a Process P-A prep (`prep/process/REPORT.md`) and an Area A-A prep (`prep/area/REPORT.md`, `area-wall.jpg`, `area-wall.json`). Both returned their findings as text, which I saved as those files; neither touched the build, the page, git or any gate.
- **The build, the tests and this gate were done by this session alone.** No background tasks (the 260-view sweep ran as four parallel local processes of my own script).

## Result

**`?windows=o` is now the shown default** (`LIVE windows = 'o'`). Windows A ("Morning to midnight") is parked as a hidden in-file backup like the other 13 (nothing deleted).

**What it is:** the page's one dark band: a deep-green rounded panel (#0E3B2C) with the facts once on the left and an archive of six close crops of real installed windows on the right.
- **The rail (the facts once):** **388** documented window jobs, set large in lime; "$10k–$15k median band (376 priced)"; "Of the 376 priced window jobs": NT Windows 238, Simonton 54, Andersen 38, Pella 31 (as `faq.json` publishes them); "Most of the window-only jobs in our files took two days on site." (verbatim); the published counts-and-bands footnote.
- **The archive:** six crops (720 × 540 from the 1400 px masters, never upscaled), each captioned only with its job's own place, month and trades and a "See this job" link: **#4** Austin · Sep 2026 · Windows; **#6** Barrington Oaks, Austin · Jul 2026 · Windows; **#7** Windermere, Pflugerville · Jul 2026 · Windows; **#42** River Place, Austin · May 2026 · Windows; **#40** Bull Creek, Austin · Jun 2026 · Windows & Doors; **#29** Austin · May 2026 · Shingle Roofing, Windows & Siding. They scroll sideways with snap; previous and next buttons (52 px) and the arrow keys step one frame; the index ("2 / 6") says which is centred; the centred frame is full strength and the others dimmed.
- **Live unit:** the glass of a centred frame catches **one slow reflection sweep** (a gradient on the photo, transform and opacity only), on the four frames whose glass suits it (#7, #42, #40, #29; the Windows prep agent judged #4 and #6 too low-reflection). **Reduced motion:** no sweep, no dimming, plain scroll. **Touch:** swipe, and the index follows.
- **No Book button here** (the page carries it in Services, Visualiser and the close): this brings the page body down to **6 Book buttons**, the target.

**Background treatment (new owner order):** the kit's Windows set, on dark: soft lime light rays and a ghost sash grid on a far layer; a double-framed sash, glass reflections and a few small sparkles on a near layer; the two layers drift at 20 px and 52 px over the section's pass (transform only, one `requestAnimationFrame`, only while visible; none under reduced motion). 4.2 KB of SVG, ids renamed so they cannot meet another section's; strokes at most .35 opacity.

**Files:** `winW()` in `build_site.py` (markup, crops, facts and their checks), `src/sec/win10.js` (`Win10.wire`), `src/sec/win10.css` (prefix `wcl`). Nothing else changed (`import re` added to the build script).

**Weight:** +491,250 bytes: **13,405,443 → 13,896,693** (ceiling 22.5 million; target ≤ 14.5 million; about 600 KB of headroom left). The six crops are the weight; the code and art are about 15 KB.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`): `new-windows-w-1440-0` (first frame), `-1440-2` (third frame), `-390-0`, `-390-2`, `-768-0`; sheets `new-windows-w-1440-sheet.jpg` and `new-windows-w-small-sheet.jpg`.

Fixed-state tests (Chromium; locks read from `photos.json` and `faq.json` at test time): **37 of 37 checks pass.**

| Check | Result |
|---|---|
| Rail | "388 documented window jobs" and "$10k–$15k median band (376 priced)" exact; the four brand counts equal `faq.json`'s and are labelled "of the 376 priced window jobs"; the two-days sentence is verbatim; the footnote is verbatim |
| Frames | Six, in the agreed order; each caption and link equals `photos.json` (place, month, trades, href); real alt text; no #38, #41, #0, #23 or #28 record anywhere |
| Crops never upscaled | Natural 720 px against 560 px displayed |
| The one dark band | In the page body, exactly one element wider than 1000 px with a dark background: this band (the drawn roof shapes inside Try A are small illustration pieces, not bands; the footer is transparent) |
| Controls | Next moves to frame 2 and enables previous; the sixth frame disables next; Home and ArrowRight work on the archive region; solid 3 px focus ring |
| Sweep | Fires once on a centred frame with suitable glass, as a transform-and-opacity animation on the photo's `::after`; only frames 3 to 6 carry it; reduced motion: none |
| Touch | The next button works by tap; swipe-scroll updates the index |
| Contrast (WCAG) on #0E3B2C | Heading 12.5 · the 388 numeral 7.9 · labels 10.2 · sentence 12.5 · footnote 7.3 · captions 8.2 · links 7.9 (all ≥ 4.5, including the translucent white lines mixed over the green) |
| Fonts | Montserrat and Inter only |
| Height | 0.89 screens at 1440, 1.01 at 1024, 1.01 at 768, **1.03 at 390**, 1.17 at 360; all buttons ≥ 48 px |
| Page errors and overflow | 0 errors; no overflow inside the section at any width (the page's 17 px at 1024 is Reviews B and Area A) |
| All views | **260 views**: 0 page errors, 0 overflow, 0 unresolved images; the one flag is hero L's 8 intentionally empty `lim` images, identical before this change |
| Existing versions | Against the last committed page, images blanked and the weight pass's ids normalised: **203 templates vs 202, with only `windows:a` added**, **0 changed**; the body outside the windows slot is identical |

## Defects found and fixed

1. **Frames 3 to 6 never loaded** in the first build (`loading="lazy"` inside a sideways scroller): removed; the images are inline data, so lazy loading saved nothing.
2. **A hard cut at the archive's left edge** when scrolled: a 28 px fade on the left of the scroller.
3. **Buttons fell back to the browser font (Arial):** `font-family: inherit`.
4. **360 px wide reached 1.30 screens:** tightened the smallest-width padding; now 1.17.
5. **Test harness only:** the sweep probe clicked "next" twice at once, which scrolled to one frame; it now waits between clicks. The dark-band probe first counted the drawn roof of Try A; it now counts only wide elements.

## Remaining, named honestly

- **The six crops differ in sharpness.** #29 is the sharpest; **#40 (Bull Creek) is the softest crop** (Laplacian variance about 1,000 against 7,000 for #29); I kept it because its glass is the strongest reflection and the job record includes doors, but it is the weakest frame.
- **The brand counts are the FAQ's figures** (of the 376 priced jobs) and the four brands cover 361 of those 376 (the remaining 15 jobs include Provia with 5); the section does not claim they are all the jobs.
- **"388 documented window jobs"** comes from the published lock (`FACTS.md` and the site code), not from the four data JSONs.
- **Tight crops show parts of houses**, not whole elevations: that is the idea, but a visitor sees glass and frames more than the finished house.
- **The heading "Windows, close up." is the plan's own name for the section**, not published firm copy.
- **Footer:** transparent, not dark; the band is the only dark panel on the page body.
- **Testing:** Chromium only.
- **Page rules are not yet met** (five of nine sections done; baseline below).

**Page-rule baseline after this gate** (default page):

| Rule | Target | Now |
|---|---|---|
| Section height | ≤ 1.3 screens | Hero 1.0 / 1.2, Services 1.1, Visualiser 1.1, **Windows 0.9 / 1.0 phone**, Booking ✓ (Process A 4.1 and Try A 5.2 still over) |
| Page length at 1440 | ≤ 10 screens | **16.8** |
| Pinned sections | ≤ 1 | 2 (Process A, Try A) |
| Book buttons | ≤ 6 | **6 in the body** ✓ (9 in the DOM with the header and mobile bar) |
| Each number once | | 388 now sits in Windows and in Try A (and 431, 121, 320 in Try A); 4.9 ×3 and 474 ×2 in Reviews and others; all clear as Reviews and Try are rebuilt |

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Windows W | ⟦S1443⟧ a curated archive with an index; ⟦S0204⟧ the one dark band for rhythm; ⟦S1426⟧ the facts grouped once in the rail; ⟦S0220⟧ only the firm's published numbers and sentences |
| Element | frames and captions | ⟦S0985⟧ 720 px crops never upscaled, explicit size; ⟦S0956⟧ real alt text; ⟦S1494⟧ captions are the job's own record |
| Element | controls | ⟦S0054⟧ buttons with labels, disabled ends, a keyboard region with a focus ring, 52 px targets; swipe on touch |
| Motion | the reflection | ⟦S1436⟧ a slow eased sweep; ⟦S0062⟧ transform and opacity on a pseudo-element; ⟦S0400⟧ reduced motion static |
| Background | drawn rays and sash | ⟦S0060⟧ two layers at two speeds, transform only, only while visible; ⟦S0231⟧ 4.2 KB |
| Site | contrast, locks | WCAG ratios on the dark ground; the rail strings and records string-compared against the data |

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | The one dark band gives the page its rhythm; real installed glass at close range; a clear order (the number, the brands, then the work) (`-1440-0`, `-1440-2`). **Minus:** the crops vary in quality; a horizontal archive is a familiar form |
| Usability (30) | **8.5** | The facts in one place; swipe, buttons and keys all work; one screen at every width; no Book button needed here. **Minus:** the archive hides frames until you move it; the index is small |
| Creativity (20) | **8.2** | The reflection that follows the centred frame, over a drawn light-ray background. **Minus:** the sweep is a gentle effect, not a new form |
| Content (10) | **9.0** | Every figure and sentence the firm's, string-checked; captions only the jobs' own records; the brand counts honestly labelled. **Minus:** none found |
| **Weighted** | **8.53** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.5 + 0.2 × 8.2 + 0.1 × 9.0 = 3.44 + 2.55 + 1.64 + 0.90 = **8.53**.

**On the score:** it sits just under Windows L (8.64). I am not claiming a win on the number. The case for W-A is on the page level: it replaces a barred before/after centrepiece with real installed windows, it is the dark band that gives the page its rhythm, and it brings the body to six Book buttons.

## NEXT PLAN — Reviews R-A "Your worry, one voice at a time", for Muse's consult

Under the consult-first order and the upgrade plan Muse passed (R-A agreed; build order: Reviews sixth). **Nothing below is built.** It uses the Reviews prep agent's findings (`prep/reviews/REPORT.md`), which I have read and spot-checked against `reviews.json` and `rev9.js`.

### AUDIT — the Reviews section now
- **The shown default is Reviews B**, 1.0 screen at 1440 (1.0 on a phone); it carries the **4.9 / 474** lock and repeats them elsewhere on the page (4.9 appears three times, 474 twice across sections).
- **Reviews N, the base** (8.59), has the six worries and the answering sentences, but is a card grid 1.6–3.1 screens tall.
- **Data facts:** `reviews.json` holds 30 published reviews with only name, text and source ("Google review, 2026"); no ratings, dates or ids; the 4.9 and 474 locks cannot be checked from the data (they are in the locked docs).

### RESEARCH
- **Governing reference: Cowboy** (family-fronted warmth, restraint). Transfers: one human voice at a time, large, calm. Does not: photography of people (none exists and none will be invented).
- **WEB-SKILLS:** ⟦S1434⟧ ⟦S1449⟧ millers-law ⟦S1436⟧ ⟦S0054⟧.

### THE PLAN — R-A
| Element | What will be built |
|---|---|
| **The six worries (kept from N)** | The mess they leave · Being kept in the dark · Sales pressure · A job that drags on · Paying too much · Loose ends at the end; one is chosen at a time, as chips |
| **One voice** | The chosen worry fills the section with **one** homeowner's answering sentence in large type with the highlight under the exact phrase; the name and "Google review, 2026" follow; "Next voice" steps through the others for that worry. Every sentence is a verbatim substring of its review, checked at build (the build throws otherwise) |
| **The first voice per worry** (prep agent's picks, no digits, all different reviewers, none from the hero) | Mess: "The house and yard was cleaner when they left than it was when they got here." (Charles Statler). Kept in the dark: "Very detailed and sent me photos immediately to reassure me that everything was in great condition." (Michael Spake). Sales pressure: "There was no pressure." (Ray Cole). Drags on: "Very professional staff, easy process and work was completed on schedule." (Bryan Williams). Paying too much: "They were also the most affordable quote I received for very high quality windows." (Sara Helms). Loose ends: "It’s a breath of fresh air for a contractor to really do what they say!" (Rick Bodamer). Two more per worry as the next voices |
| **The lock** | **4.9 from 474 Google reviews** sits once, large, beside the voice, and nowhere else on the page (this is the section that carries it) |
| **Live unit** | The highlight draws under the words as they settle; the quote mark turns like a page. Reduced motion: instant |
| **Background treatment** | The kit's Reviews set (quiet: oak-canopy dapple, a speech arc, tiny star outlines) on two drifting layers, 4.1 KB |
| **Height, weight** | ≤ 1.0 screen at 1440, ≤ 1.3 on a phone (vs N's 1.6–3.1); no images; the code and art about 15 KB; the page stays near 13.9 MB |
| **Honesty rules** | No photography of people; no per-review stars; no "verified" wording; names exactly as the source gives them |
| **Retire** | Reviews B stops being the default (hidden backup); N and the others stay hidden |
| **Sub-agents** | Up to two, prep only, declared; the Process and Area preps are already done |

**Why it should beat the best (L/M 8.63, N 8.59):** it keeps N's objection-meeting, which is the trust need, but reads like a voice, not a document, in one screen instead of 1.6–3.1.

### Decisions for Muse (the consult reply)
1. **The six worries and the first voices above.** Any to swap? Three of the prep agent's alternatives name staff (Garrett, Tracy, Jake); I excluded them to keep the voices about the experience, not named staff. OK?
2. **Names:** show them exactly as the source gives them, three exceptions excluded as odd in the source ("Karen HIbpshman" has a typo; "Jesus Armando Ochoa Rodriguez" is long; "John and Billie Daniell" is two people). OK to skip these three?
3. **The label "Google review, 2026":** every record in the data carries it as its `source`, so it is supported as given. OK?
4. **4.9 from 474 Google reviews** appears only here, as the lock (the data cannot confirm it; it is your published figure). OK to keep it large and once, and to remove it from every other section as they are rebuilt?
5. **Two lower-case voices** ("regularly reached out to me…", "the entire process was smooth from start to finish") would start mid-sentence. **Recommendation:** use only full-sentence voices; say if you want them with a leading ellipsis instead.
