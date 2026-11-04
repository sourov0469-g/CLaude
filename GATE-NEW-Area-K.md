# GATE-NEW — On your street K, "Month by month"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 1, section 8 (Hero to Try K accepted by Muse). The drivable map stays in Area C only; no generated map is drawn.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **On your street K, "Month by month"** (`?area=k`) |
| Primary reference (annex v3, one) | **Cash App Brand Guidelines** (colour as content: bold blocks where the colour itself carries the information). No Area version has used it: C used Bruno Simon; D and H Dropbox; E Erie (note); F Lando Norris; G Scout; I Cowboy; J Quiet Cubes; A and B name none. |
| Signature creative move | **A calendar of colour.** The project finder's dated records as one block of tiles: five years down (2022–2026), twelve months across. Each tile's green deepens with how much work the records show that month, so the rhythm of the business reads at a glance: the build-up through 2023, every month busy from 2024, no winter gap. Pick a tile and the panel says where the crews were that month: the neighbourhoods and towns named in that month's records. A trade filter (All · Siding · Windows · Roofing · Painting) recolours the calendar for that trade. |
| Style family | A bold tile calendar, colour as the data, with a plain-type panel; white ground |
| Content | The finder records (`__NEAR.p`: month, town, neighbourhood where recorded, trades), as Areas C, D, F and J use them. The tiles show relative intensity in five steps, with no per-month counts and no total, so nothing competes with the locked "886 documented projects since 2018: 312 on the map with photos + 574 more counted" (shown verbatim). Coverage stated: "dated records in the project finder, Mar 2022 to Sep 2026" (one earlier record, Oct 2018, is outside the grid and named in the note). Months after the records are hatched "not yet recorded". Places listed as recorded. |
| How it differs from every existing Area version | A pins photo cards on a thread. B finds a street. C drives a map. D ranks towns. E answers yes or no. F is a flip board of single records. G hangs street signs. H is a town × trade grid. I is a distance ruler. J is five yearly bars. None shows month by month, none uses colour intensity as the measure, and none links a moment in time to the places worked then. |
| Why it is better | It answers two questions no version answers: "are you busy all year?" (yes, every month since 2024) and "who were you working near recently?" (pick last month and read the streets). The current best (G, "The streets we know", 8.26) is about where; K is about where and when. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the calendar); Cash App colour as content; ⟦S0220⟧ records only, coverage stated, no totals |
| Calendar grid (60 tiles) | ⟦S0054⟧ grid pattern: one tab stop, arrow keys move by month and year, Home and End; each tile a button labelled "Mar 2024, busy" with the step in words; ⟦S1499⟧ data honesty (a 5-step scale with a stated legend; empty months shown as empty, not hidden) |
| Colour scale | 5 steps of the brand green from pale to deep (#E9F1EA → #0E3B2C), checked for monotonic lightness; "fewer → more" legend; lime outline on the chosen tile |
| Trade filter | ⟦S0054⟧ `radiogroup` with roving arrows; ⟦S1427⟧ one treatment; the scale re-normalises per trade (stated) |
| Month panel | `aria-live="polite"`: "Mar 2024: we worked in Tarrytown, Austin · Maple Run, Austin · Round Rock …", plus that month's trades |
| Arrival | Tiles fill in by month in date order (8 ms stagger); ⟦S1315⟧ nothing at rest; reduced motion: none |
| CTA | ⟦S1435⟧ one filled Book button |
| Phone | Months become columns of a narrower grid (12 × 5 stays; the tiles shrink to 22 px, month initials only); the panel sits under the grid |
| Background law | White ground; colour only in the tiles |

---

## Build log

**How to view:** `?area=k` (switcher: On your street, **K "Month by month"**).

**Files:** `src/sec/area6.js` and `area6.css` (`Area6.K` is prerendered at build from `__NEAR`; `Area6.wire`). No new data or images; the file grows by 26 KB (19.14 MB).

**The calendar:**
- 5 rows (2022–2026) × 12 months = 60 tile buttons in a grid with year row headers and month column headers.
- Each tile has one of 6 states:
  - 0: none, pale with a hairline;
  - 1–5: brand greens from #D7E7D9 to #0E3B2C;
  - x: hatched, after Sep 2026.
- Steps are relative to the busiest month for the chosen filter, so the scale re-normalises per trade (stated).
- Default month: Sep 2026 (the latest recorded).

**Panel:** "Sep 2026: we worked in Austin · Pflugerville · Georgetown · Round Rock · East Oak Hill, Austin · Anderson Mill, Austin · Hutto · Elgin and other places." Then "On these jobs:" with that month's trades.

**Closing:**
- The locked "886 documented projects since 2018: 312 on the map with photos + 574 more counted."
- A coverage note: "dated records in our project finder, Mar 2022 to Sep 2026 (one earlier record, Oct 2018, sits outside it). It shows when and where, relative to our busiest month; it is not a count."
- Book.

**Copy change from the plan:** the plan's headline "Busy every month" overclaimed, because some 2022 months have no records. The built headline is "Month by month, street by street.", and the support line says only what is true: "Since 2024 every month has jobs on record."

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-area-k-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`
- the Roofing filter, Apr 2025: `-1440-roofing`
- phone, Jul 2025: `-390-jul25`
- contact sheet: `new-area-k.jpg`

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Steps follow the records | All work, 2022–2026: `001101011111 111111112221 215544555533 234435454443 334343542xxx`. 2022's empty months are shown as empty; 2024 Mar–Oct run at 4–5 |
| Month panel | Apr 2024 lists Round Rock, Austin, Cedar Park, Westwood Heights, Georgetown, South Cranes Mill (New Braunfels), Sunset and Maple Run "and other places", plus its trades. Jan 2022: "no records in the finder for this month." |
| Keys | ↓ from Apr 2024 goes to Apr 2025 ("very busy"); Home goes to Jan 2025; End to Dec 2025; the page doesn't scroll |
| Trade filter | Roofing re-shades the calendar (`001001000001 …`); Apr 2025 under Roofing reads "we worked in Austin. On these jobs: Siding · Shingle Roofing · …" |
| No counts | Every tile label is "Mon YYYY, [step word]"; no tile, label or panel shows a per-month number or a total |
| Phone | Tiles 26 px; month initials; the panel under the grid; no overflow |
| Reduced motion | All tiles visible at once, no arrival animation |
| Existing versions | 172 templates byte-identical to the previous commit; the homepage `<main>` identical; the only addition is `area:k`. Defaults unchanged (area = a); the drivable map is untouched in C |
| Locks | The 886 wording verbatim; no generated map; town tallies not shown or summed |

## Defects found and fixed

1. **Header class:** the calendar's header row first used `.hdr`, the site header's global class (fixed position). Renamed `.ghd`.
2. **Headline:** "Busy every month" was replaced by a true statement (see above).
3. **Trades line:** under a trade filter, the trades line listed other trades on those jobs without saying so. It is now prefixed "On these jobs:".

## Remaining defects, named honestly

- **Coverage:** the finder's dated records start in Mar 2022 (plus one from Oct 2018), while the firm documents projects since 2018. The calendar covers only what is dated, and says so; earlier years are left out rather than shown empty.
- **Relative scale:** the steps are relative to the busiest month and re-normalise per trade, so a dark Roofing tile is not as many jobs as a dark All-work tile. The coverage note says the shading is relative; the per-filter re-normalisation is in the plan line, not on the page.
- **Mixed place names:** the place list mixes neighbourhoods ("East Oak Hill, Austin") with bare towns ("Austin") because many records name only the town. That is shown as recorded.
- **Faint lightest step:** step 1 (#D7E7D9) is close to "none" (#F3F5F3); the hairline on empty tiles separates them, but the difference is subtle.
- **Testing:** done in Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | area K | ⟦S1434⟧ the calendar dominates; Cash App colour as content; ⟦S0220⟧ records only, coverage stated, no counts or totals, the lock verbatim |
| Element | 60 tiles | ⟦S0054⟧ grid roles, a single roving tab stop, ←/→/↑/↓/Home/End with `preventDefault`, labels in words; ⟦S1499⟧ a stated 5-step scale, empty months kept visible; lime ring on the chosen tile |
| Element | colour scale | 5 brand greens, monotonic in lightness; legend: fewer, more, none, not yet recorded |
| Element | trade filter | ⟦S0054⟧ `radiogroup` with roving arrows (wrap); ⟦S1427⟧ one treatment |
| Element | month panel | `aria-live="polite"`: places as recorded (up to 8, then "and other places") and "On these jobs:" trades |
| Motion | arrival | Tiles fill in date order with an 8 ms stagger and a small pop; ⟦S1315⟧ nothing at rest |
| Element | Book | ⟦S1435⟧ the only filled button |
| Site | phone, reduced motion, background law | Initials and 26 px tiles; no motion; white ground |

## Reference transfers and non-transfers (Cash App Brand Guidelines)

**Transferred:**
- colour as the content, where the green itself carries the information;
- bold, uniform blocks on white;
- a confident single system.

**Not transferred:**
- Cash App's own palette and type (brand greens, Montserrat and Inter, as locked).

## Comparison with the section's previous best (Area G, "The streets we know", 8.26)

G hangs street signs for the neighbourhoods named in each town: where. K adds when. It shows the rhythm of the work across five years at a glance, and for any month it lists the streets and towns crews were on. "Are you busy all year?" and "Were you near me recently?" are answered in one view.
- **G is stronger on:** warmth and place.
- **K is stronger on:** recency and continuity.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | A bold, calm block of greens; the shape of five years is readable at once (screenshots). Minus: the lightest step is subtle |
| Usability (30) | **8.4** | One tap per month, grid keys, a trade filter, plain sentences, all tested |
| Creativity (20) | **8.2** | Time as colour, linked to place, is new to the section; the calendar form itself is familiar |
| Content (10) | **8.6** | Records only, coverage stated, no counts competing with the lock. Minus: relative scaling per filter is not on the page |
| **Weighted** | **8.38** | **PASS** (≥ 7.0; no category below 6.0) |

**Vetoes: none.**

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not build Booking K until Muse accepts.
