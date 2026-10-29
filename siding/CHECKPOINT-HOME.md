# CHECKPOINT: homepage passes

Written 29 Oct 2026 after audit round 4. `site/index.html` is built by `src/build.py` and is complete per PLAN.md §4 (H0 to H11). Pages linked from it but not yet built: `siding.html`, `windows.html`, `projects.html`, `plan.html`, `about.html` (next chunks).

## What this relaunch found and restored
The repo held only `site/index.html` and the Python sources. The CSS, JS, images, font and the `work/data/*.json` inputs `build.py` reads had never been committed. Restored without inventing anything:
- `src/harvest.py`: re-read the firm's own data from austinprosiding.com (finder dataset `_apr/b63ad571ed065261.json`, `#aph-pairs`, the siding and windows `#apsv-work-pairs`, 43 captioned project photos, the 30 review excerpts on /reviews). Asserts the counts FACTS.md records (312 in-frame photographed pins, 6 + 4 + 4 pairs, 30 reviews).
- `src/fetch_assets.py`: the client's photos, logo, favicon and 7 credential badges, re-encoded to WebP at the frames the build uses.
- `src/align_hero.py`: registers the Rob Roy before photo onto the after photo's wall (ECC homography on gradient images, since the siding colour changed), then crops both to the fully covered 16:10 frame. This is what makes the hero read as boards going onto the same wall.
- `src/studio_masks.py`: body, gable and trim masks cut from the after photo (ratio colour key plus a house outline and window, deck and AC exclusions), and hard-light shade layers so lap shadow lines survive any colour.
- Mona Sans variable (wdth 75-125, wght 200-900, OFL) and GSAP 3.13 core + ScrollTrigger + Flip, from npm.
- `site/assets/css/site.css` and `site/assets/js/site.js` written from scratch to PLAN §2. The build ships minified copies (`*.min.*`, esbuild).

## Sections as built (PLAN §4)
| # | Built | Notes |
|---|---|---|
| H0 | Header, mega-menu ledger (11 trades, documented count, median band), phone sheet, scroll progress | Mega open 250ms / close 150ms `cubic-bezier(.22,1,.36,1)`. |
| H1 | Course-reveal hero | 30 courses desktop / 18 phone, bottom-up, 0.9s `power3.out`, stagger 0.02, stops at 58%. Vertical slider handle (arrow keys = 1 course, PageUp/Down = 5, Home/End). Tap the photo to set the line. Job tag prints "Siding portion $15k-$20k", APS-4830. |
| H2 | Job file numbers | Odometer roll 2s `cubic-bezier(.33,1,.68,1)`, column stagger 0.07s capped. 312 + 574 = 886 equation. |
| H3 | Trades ledger | 10 priced trades plus a storm-damage row (heading says eleven). Bars `scaleX` 0.8s `power2.out` stagger 0.04 (first 8), median after. |
| H4 | Six priced pairs | Drag/keyboard slider, filter chips with counts, six picks. Square lens on fine pointers: side 0.4 × min(w,h), ease 0.1 per frame. Phone: no lens, `touch-action: pan-y`. |
| H5 | Compact Colour Studio | 12 published Sherwin-Williams colours, Siding / Trim, 400ms `cubic-bezier(.645,.045,.355,1)` repaint, "Show the real navy" toggle. |
| H6 | APS-4867 start to finish | Rail fill scrubbed (`ease: none`), steps slide up 0.8s `power2.out`. 101 / 74 / 4-day span bar. All facts checked against the job page (incl. "two yard-clean tasks"). |
| H7 | 312-dot map | Firm's frame and graticule, trade chips, month scrub + Play (60ms/month), tooltips, and the near-you finder (firm's 401 place names; counts documented jobs within 1.5 mi; lights and rings them). Phone zooms to the metro and states "301 of the 312 dots are in view". |
| H8 | Crew names + badges | Counts re-verified against the 30 reviews (Kevin 9, Garrett 8 incl. "Garret", Tracy 4, Paul Hale 3). Direction-aware entrance ±100/±50px, 1.25s expo. |
| H9 | Money, worked | Live amortisation; $15,000 / 7.99% / 120 = $181.91 (also $625.00 and $283.00, recomputed). Offers with Nov 30 end date. |
| H10 | Booking | 3 steps, errors after blur, summary on submit, phone auto-format, stub submit with ring and tick, nothing sent. Header and hero "Book" open the same form in a dialog (the form card moves; one set of ids). |
| H11 | Footer | Directory, brands with counts, NAP, hours, concept disclaimer. Sticky phone action bar after the hero, hidden over the form and footer. |

## Deviations from PLAN (stated, with reason)
1. **Hero composition.** PLAN put the H1 in a left column over the image. At a size that holds the frame, "Siding and windows, priced in public." cannot stay within the judging notes' 2-line hero rule (S0650) in a column, so the H1 spans the top and the instrument sits below-left with lead, CTA, proof and job tag beside it. Phone order: H1, lead, CTA, instrument, job tag, proof.
2. **Numerals.** PLAN asked for `tabular-nums` on every figure. Mona Sans's tabular zero is slashed, which reads as a monospace data label (S0001 tell). Figures use proportional lining numerals; only the data tables stay tabular.
3. **Dashes.** All em and en dashes are removed at build time (`clean()`); ranges read `$10k-$15k` (S0650).
4. **Pairs layout.** Side column (heading, facts) moved left so the H2 is the entry point; phone order is heading, instrument, facts.
5. **Swatches.** Colour chips only (6 × 2); the name and SW code show in the readout and in each chip's label/title. Keeps the panel no taller than the photo.
6. **Ledger.** Storm damage gets its own row so "Eleven trades" counts eleven.

## Audit rounds
- **R1** (1440 + 375, every section): first tally label beside its number; "Middle half Under $5k"; heading said eleven but ten rows; pairs heading not the entry point; studio panel 150px taller than the photo; map labels colliding with dots and the subhead repeating the H2; Kevin's quote cut without an ellipsis; four repeats of "named in N of the 30 reviews on the firm's reviews page"; booking copy promised picking a time online (this form requests a call back); footer rule clipped; slashed zeros. All fixed.
- **R2**: crop note visible on desktop (`display:block` beat `[hidden]`; added a global `[hidden]` rule); phone map spilling outside its frame (`overflow: hidden`); town labels hiding dots (now drawn only where their text box covers no pin); phone pairs order; doubled rule between proof list and job tag; mega-menu separator wrapping onto its own line; navy fringe at mask edges under light colours (body grown 2px, trim closed); progress ring hugging the disc edge.
- **R3** (interaction pass, all controls driven by Playwright): hero keys, drag and Home; pair pick swap, lens, filter, slider keys; studio body + trim repaint and original toggle; map filter, scrub, Play, tooltip, finder (Milwood: 38 documented, 13 photographed within 1.5 mi); financing at $30,000; form empty-step error, field errors and summary, phone formatting, submit to done; dialog open, Esc close, card returned to the page; phone sheet and action bar. 0 console errors.
- **R4**: 1024, 1280 and 1366 first views (job tag moves under the photo below 1400px so columns balance); finder placeholder; caption moved under the map once the finder made the left column taller; reduced-motion pass at 375 (hero lands on 10 of 18 courses with no animation).

Horizontal overflow: 0px at 375, 1024, 1280, 1440. Console errors: none at any width.

## Budget
HTML 87 KB + CSS 48 KB + own JS 25 KB minified = 160 KB raw, **38 KB gzipped**. That is 10 KB over the PLAN §11 target of 150 KB raw; the 312 map points ship as markup so the map works without JS. Finder data (`assets/data/near.json`, 30 KB) loads only as the map nears the viewport. GSAP set 141 KB min, font 96 KB.

## Honest notes
- The job tag beside the hero instrument could be read as a fifth hero text element (S0650 caps the hero at 4); it is kept because the brief requires the price band printed on the pair.
- The square lens is only for fine pointers; touch devices get the slider and tap-to-set.
- Only four town names pass the "covers no dot" rule on the map, so geographic context is light by design.
- H2 headings all use the same masked word reveal (PLAN's single reveal token); it is short (0.6s) but repeats nine times.
