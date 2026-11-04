# GATE-NEW — Process L, "One job, on its calendar"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 2, section 6 (Reviews L accepted by Muse). It inherits the button system. Nothing game-like and no configurator.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Process L, "One job, on its calendar"** (`?process=l`) |
| Primary reference (annex v3, one) | **Scout Motors**: heritage timeline, sequenced proof (the story in dated order, with evidence at each date). No Process version has used Scout: C used Lusion and Graza, D and H Dropbox, E Graza, F an Erie note, G Cowboy, I Cash App, J Apple, K Quiet Cubes. |
| Signature creative move | **A real job on a true-scale calendar.** Job APS-4867, siding and exterior painting at a home in Village At Western Oaks, Austin, is followed through the five steps the firm published on its own project page ("The Journey"), each at its real date. They sit on a time axis drawn to scale from March to September 2026: first contact and evaluation on March 9, approval on June 18, the crew on site August 31 – September 3, completion on September 3. The distances are the real days. The four on-site days are a short, bright band against six months of calendar, and the headline figure reads "178 days from first call to completion. 4 of them on site." Pick a step and its published text appears with the job's own photographs. |
| Style family | A dated timeline on a true time scale: month ticks, dated markers, one detail panel; Scout's sequenced honesty |
| Content | The project page `/recent-projects/austin-village-at-western-oaks-siding-exterior-painting-09-03-26-aps-4867`: the five step texts verbatim; the before/after photos and their published alts (the homepage pair); detail photos "shot on site by our crew"; scope ("James Hardie 8.25-Inch Smooth Fiber Cement Siding · Sherwin Williams SuperPaint Exterior Finish"); "Siding portion $25k–$30k". The day counts are arithmetic on the published dates (Mar 9 → Sep 3 = 178 days; Aug 31 → Sep 3 = 4 days on site, inclusive). No reason is given for any gap, because none is published. |
| How it differs from every existing Process version | C rides a plumb line, D sets four columns, E turns a dial, F asks questions, G stamps a card, H writes one paragraph, I splits your part and ours, J sets four numbers, K hands a baton between staff. All describe the process in general. None follows one real, dated job, and none puts the steps on a true time scale. |
| Why it is better | It replaces "how it works" with "how it went", for a real house, on real dates, in the firm's own published words. It also answers the question homeowners ask most (how long will crews be at my house?) with evidence: 4 days on site. The current best (K, "Handed along", 8.42) shows who does what. L shows when, on one real job. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the calendar); ⟦S0220⟧ the firm's published steps verbatim, dates as published, day counts computed and labelled |
| Time axis | ⟦S1499⟧ data honesty: a linear scale, one month per tick; the on-site band at its true width (4 days); ⟦S1325⟧ the axis draws left to right on arrival, once |
| Step markers (5 tabs) | ⟦S0054⟧ `tablist` / `tab` / `tabpanel`: arrow keys, Home/End, `aria-selected`; markers that share a date (Mar 9, Sep 3) stack instead of overlapping; button system: lift, press, spring, ring |
| Headline figure | ⟦S1500⟧ "178 days … 4 of them on site" in display type, the 4 in the brand green |
| Detail panel | Published step text verbatim; the step's photos with their published alts; ⟦S1436⟧ crossfade 0.35 s on change |
| Photos | The job's own: the before photo at evaluation, detail photos at installation, the after photo at completion; labelled with their published alts, not dated beyond the page's own claims |
| CTA | ⟦S1435⟧ one filled "Book a free inspection"; "See this project on our site" link |
| Phone | The axis stays horizontal and fits the width; markers become a numbered row; the panel follows |
| Reduced motion | ⟦S0400⟧ the axis drawn at once; no crossfade |
| Background law | White ground; the calendar is `data-solid` |

---

## Build log

**How to view:** `?process=l` (switcher: Process, **L "One job, on its calendar"**).

**Files:**
- `procL()` in `build_site.py`: markup from the job's published project page (`work/raw/…aps-4867.html`), `pairs.json` (the homepage pair for this job) and `job4867.json` (photo alts).
- `src/sec/proc7.js` (`Proc7.wire`) and `proc7.css`.
- Photos re-encoded once: the before and after at 720 px, three detail photos at 480 px. The file grows by 221 KB.

**The calendar:**
- **Scale:** a linear axis from 1 March to 30 September 2026 (214 days; 1 day ≈ 6 px at 1440). Month ticks at the true first of each month.
- **Gaps:** the day counts between dated steps (101 days, 74 days) are printed at their midpoints.
- **Install band:** the on-site band is 4 days wide (23 px at 1440), lime with a deep-green outline.
- **Chips:**
  - The five step chips sit at their dates.
  - Steps on the same date stack in two rows: 01 and 02 on Mar 9; 04 and 05 at Aug 31 – Sep 3.
  - Chips past 78% of the width anchor to the right so they never leave the card.
  - On phones the chips show their numbers only.

**The panels (one per step, verbatim from the project page):**

| Step | Content |
|---|---|
| 01 | The text only |
| 02 | The before photo |
| 03 | Scope ("James Hardie 8.25-Inch Smooth Fiber Cement Siding · Sherwin Williams SuperPaint Exterior Finish") and "Siding portion: $25k–$30k" |
| 04 | Three detail photos ("shot on site by our crew") with their published alts |
| 05 | The after photo |

**Headline:** "178 days from first call to completion. 4 of them on site." Both figures are computed from the published dates and said to be.

**Arrival:** the axis draws (1.1 s), the gap labels fade in and the chips appear, once.

**Inherited from the button system:** the chips lift, press, spring and show the ring; the Book button rolls its label.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-process-l-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- `-1440-cal`, `-1440-install` (step 04 open), `-390-cal`;
- contact sheet: `new-process-l.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Scale | Chips at x 140 (Mar 9, two rows), 717 (Jun 18), 1031 / 1050 (Aug 31 / Sep 3, right-anchored); the band is 23 px (4 days) |
| Tabs | Click 04: `aria-selected="true"`, panel shown with 3 photos. → from 04 goes to 05; Home → 01; End → 05 |
| Verbatim | All five step texts, the scope line and the band match the project page and `pairs.json` exactly (checked in the build) |
| Reduced motion | The axis is drawn at once (`transform: none`); no panel animation |
| Phone | No overflow; chips as numbers in two rows (04 at 291–319 px, 05 at 295–323 px, different rows) |
| Existing versions | 179 slot templates and 8 page templates byte-identical; defaults unchanged (`process = a`) |

## Defects found and fixed

1. **Right-anchored chips:** "Installation" and "Completion" broke onto two rows (the number dropped below) and carried full dates. They now use one flex row, mirrored for right-anchored chips, with short dates ("Aug 31 – Sep 3").
2. **The phone icon, here and in Windows L:** the shared CTA block (`CTAS`, the Book button plus the phone link) is styled only inside `.hero`. In both new section versions that use it, its phone icon rendered at 359 × 359 px. Sized to the hero's own values (18 px icon, the same gaps) with section-scoped CSS. **This also fixes Windows L (accepted):** its markup is untouched; one scoped CSS block was added to `win7.css`. Verified: 18 × 18 in both. The gate checks could not catch it (no overflow, no error), so I now measure every CTA icon in each version.

## Remaining defects, named honestly

- **One job is one job:** the dates show how this job went, not a promise for every job. The page says it is one job and shows no averages.
- **No reasons for the gaps:** the gaps (101 days to approval, 74 days to installation) are shown without reasons, because none are published. A visitor may read a delay into them.
- **Detail photos are undated:** they were shot on site by the crew, but the page does not date them to a day of the install, and neither does this version.
- **Weight:** +221 KB.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | process L | ⟦S1434⟧ the calendar dominates; ⟦S0220⟧ the firm's published steps verbatim, dates as published, day counts computed and said to be |
| Element | time axis | ⟦S1499⟧ linear scale, true month ticks, the 4-day band at true width; ⟦S1325⟧ the axis draws once on arrival |
| Element | 5 step chips | ⟦S0054⟧ `tablist` / `tab` / `tabpanel`, roving tabindex, ←/→/Home/End; stacked rows for shared dates; button system: lift, press, spring, ring |
| Element | headline figure | ⟦S1500⟧ "178 days … 4 of them on site", the 4 in brand green |
| Element | panels | Verbatim step text; the job's own photos with published alts; ⟦S1436⟧ 0.35 s settle on change |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button (shared `CTAS`), with the phone link at hero size |
| Site | phone | Numbers-only chips in two rows; panels stack |
| Site | reduced motion | ⟦S0400⟧ complete at once |
| Site | background law | White ground; the calendar is `data-solid` |

## Reference transfers and non-transfers (Scout Motors)

**Transferred:**
- the heritage timeline: dated, in order, with evidence at each date;
- honest restraint: the real scale shown even where it is unflattering (long gaps), nothing invented to fill them.

**Not transferred:**
- the film roll (used by Services K and Booking C);
- Scout's cinematic photography and type.

## Comparison with the section's previous best (Process K, "Handed along", 8.42)

K shows who carries each stage, using the names homeowners mention.
- **L shows when:** one real job, dated step by step from the firm's own project page, on a true-scale calendar, with its photos and the answer to "how long will crews be at my house?" (4 days).
- **K is stronger on:** people.
- **L is stronger on:** evidence and time.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | A clean, true-scale calendar: month ticks, gap labels, the bright 4-day band, a headline figure (`-1440-cal`); panels with the job's photographs (`-1440-install`) |
| Usability (30) | **8.4** | Five tabs with the full keyboard model; readable panels; phone layout without overflow; reduced motion. **Minus:** on phones the chips show numbers only (names appear in the panel) |
| Creativity (20) | **8.8** | No Process version follows one real job, and none puts the steps on a true time scale. The tiny 4-day band against six months makes the point without a word |
| Content (10) | **9.0** | The firm's own published journey, verbatim; real dates; the job's own photographs; computed figures labelled as such; gaps left unexplained rather than invented |
| **Weighted** | **8.62** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.4 + 0.2 × 8.8 + 0.1 × 9.0 = 3.44 + 2.52 + 1.76 + 0.90 = **8.62**.

**Vetoes: none.**
- Locks untouched; no form.
- White ground; brand accents only.
- Normal fonts; no locked mechanic.
- The firm's own published job photos, captioned as published.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Try L until Muse accepts.
