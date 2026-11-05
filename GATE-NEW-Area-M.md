# GATE-NEW — Area M, "The map, filling in"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 3, section 8 (Hero to Try M accepted by Muse). It inherits the button system. It is not a drivable map (that stays in Area C): the map is a fixed picture that fills in with time. Nothing game-like.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Area M, "The map, filling in"** (`?area=m`) |
| Primary reference (annex v3, one) | **Apple AirPods Pro**: the pinned scroll, and numbers as events. The annex assigns Apple exactly to "886 / 312+574 as numeral events". No Area version has used Apple: C used Bruno Simon, D and H Dropbox, E an Erie note, F Lando Norris, G Scout, I Cowboy, J Quiet Cubes, K Cash App, L Graza; A and B name none. |
| Signature creative move | **Scroll time across the map.** The section pins (`position: sticky`, no scroll hijacking) and the page's own scroll scrubs time, from the first dated record to the latest. The finder's records drop onto a quiet map of the Austin area, month by month, around the office: each new record lands as a lime point and settles to green. Beside the map, the year is the only numeral, set huge, and it rolls to the next year as an Apple-style event. The month runs underneath. At the end, the locked line lands as the final event: "886 documented projects since 2018 · 312 on the map with photos + 574 more counted". A month slider gives the same scrub without scrolling. |
| Style family | A pinned, scroll-scrubbed map with one giant rolling numeral; points accrue, nothing moves the map |
| Content | The project finder's dated records (`__NEAR.p`: position in the finder's projection, month), as Areas C, I, K and L use them; the office position from the same finder; town labels from the finder's place list (positions only). **No count is derived or displayed.** The only figures are the published lock, verbatim, and the year and month. Coverage stated: "dated records in our project finder, Oct 2018 to Sep 2026"; "points are placed near the home, never on it" (the finder's own wording). |
| How it differs from every existing Area version | A pins photo cards on a thread. B finds a street. C drives a map. D ranks towns. E answers yes or no. F is a flip board of single records. G hangs street signs. H is a town × trade grid. I is a distance ruler. J is five yearly bars. K is a month-by-month calendar without a map. L is a compass rose of direction. None shows the work spreading across the map over time, and none uses scroll to move through time. |
| Why it is better | It turns "we've worked all over Austin since 2018" into something seen happening. The visitor watches their side of town fill in, then reads the locked total as the payoff. The current best (Area L, "Which way from our door", 8.59) answers direction; M answers "how long, and how far, have they been working near me?" |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the map); ⟦S0220⟧ no derived counts; the lock verbatim |
| Pinned stage | ⟦S1325⟧ `position: sticky` stage inside a tall section; progress from the page's own scroll, never hijacked |
| Points | ⟦S1436⟧ each record lands as a lime point (scale-in) and settles to green over 0.9 s; ⟦S1315⟧ only changed points are touched; drawn on one canvas |
| Year numeral | Apple's numeral event: the year rolls digit by digit when it changes; the month runs below in plain type |
| Final event | The locked line lands once progress passes the last month |
| Month slider | ⟦S0054⟧ `<input type="range">` labelled "Month", with `aria-valuetext` "March 2024"; it scrubs the same timeline |
| Map base | Office star, town labels and 5 / 10 / 20-mile rings (straight lines, from the finder's scale), in quiet greys |
| Phone | Same pinned stage, map full width, numeral above |
| Reduced motion | ⟦S0400⟧ no pinning: the section shows the full map at the latest month, and the slider steps through months instantly |
| Background law | White ground; stage `data-solid` |

---

## Build log

**How to view:** `?area=m` (switcher: On your street, **M "The map, filling in"**).

**Files:**
- `src/sec/area8.js` (`Area8.M`, `Area8.wire`) and `src/sec/area8.css` (class prefix `am` under `.amM`; the collision check found no shared names).
- `build_site.py`: the module added to `MODS`, pre-rendered as `am`, wired, given the `area` slot letter `m`, and listed in the switcher. Nothing else changed.
- The file grows by **11,777 bytes**.

**The timeline:**
- The 54 months that appear in the finder's dated records, in order: October 2018, then March 2022 to September 2026. Months with no record are not steps, so the scrub jumps from October 2018 to March 2022.
- **Scroll:** progress is the section's own scroll through its 300 vh. The first 86% scrubs the months; past 90%, the lock lands.

**The map:**
- One canvas: the finder's projection framed on the office. It is a square of 460 finder px, at least 27 miles each way at 8.3 px per mile, fitted to the canvas.
- Dashed 5 / 10 / 20-mile rings (straight lines); labels for the nine busiest finder towns inside the frame (positions only, no counts); a deep-green star for "Our office".
- Each record lands as a lime point that eases in over 0.9 s, stays lime for its first three months, then settles to green.
- The canvas redraws only while points are easing.

**The numeral:** the year is the only number, set at 92–144 px. When it changes, the old year rolls up and out and the new one rolls in (down and out when scrubbing back). The month sits beneath in plain type.

**The slider:**
- `<input type="range">` labelled "Month", 0–53, with `aria-valuetext` such as "November 2024".
- Dragging or keys scrub on their own; the next scroll takes over again.

**The final event:** "886 documented projects since 2018: 312 on the map with photos + 574 more counted." rises in at the end. The slider's last month shows it too.

**Reduced motion:**
- The section is not pinned (normal height): the full map at September 2026 and the lock are shown at once.
- The slider steps months instantly.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-area-m-1440-0`, `-025`, `-05`, `-075`, `-095` (progress 0 → 0.95);
- `-1440-reduced`;
- `-768-05`;
- `-390-0`, `-390-05`, `-390-095`;
- contact sheet `new-area-m.jpg`.

Section QA ran on `?bg=none`; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Pinned and scrubbed | At progress 0 / 0.25 / 0.5 / 0.75 / 0.95 the stage's top stays at 0 px (pinned) at all three widths. The time reads October 2018 → July 2023 → November 2024 → February 2026 → September 2026, and the lock lands at 0.95 |
| Points accrue | Green or lime canvas ink grows step by step at every width (for example 59 → 190 → 839 → 948 → 1,169 sampled pixels at 1440) |
| Slider | Home → October 2018; 20 × → → December 2023; End → September 2026 with the lock shown; `aria-valuetext` matches the display each time. A scroll afterwards takes over again (→ October 2023) |
| Reduced motion | No pinning (section 840 px tall); the full map at September 2026 and the lock shown at once |
| All homepage version views (120) | 0 page errors and 0 overflow in every one |
| Existing versions | The 191 existing slot templates are byte-identical; one template added (`area:m`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Area stays A); subpages untouched |
| Locks | "886 documented projects since 2018: 312 on the map with photos + 574 more counted." verbatim (the only figures shown); "7801 N Lamar" |

## Defects found and fixed

1. **The page threw an error and the map stayed empty.** The page's `__NEAR` carries towns as `towns` (the build's compacted form), not the raw finder `g` list, so labels crashed the wiring. The labels now use `towns`, and 0 errors remain.
2. **The year vanished on phones and tablets.** In the small-screen grid the year's box collapsed to zero width, because its digits are absolutely positioned for the roll. It now has a width in `em`.
3. **The map was small.** Framing the finder's whole projection left most of the canvas empty. The map is now framed on the office (at least 27 miles each way), about twice the scale.

## Remaining defects, named honestly

- **The finder and the lock differ slightly.** The finder holds 883 placed records (315 flagged with photos), while the published lock is 886 = 312 + 574. The page shows no derived count, only the lock, so nothing on screen contradicts it, but the points are the finder's 883, not the lock's 886.
- **Off-frame records.** 55 of the 883 records (far towns such as Temple, Jewett and San Marcos) fall outside the square; wider screens show some of them. The caption says records farther out are off the frame.
- **The 2018 gap.** The scrub jumps from October 2018 to March 2022, because the finder has no dated records in between.
- **Scroll length.** The section is 300 vh (280 vh on phones). Visitors who aren't interested must scroll past it; the slider is the shortcut for keyboard users.
- **Points are approximate.** As the finder says, they sit near the home, never on it.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Area M | ⟦S1434⟧ the map dominates; ⟦S0220⟧ no derived counts; the lock verbatim |
| Layout | pinned stage | ⟦S1325⟧ `position: sticky` inside a 300 vh section; progress from the page's own scroll, never hijacked |
| Motion | points | ⟦S1436⟧ ease-in over 0.9 s, lime for three months, then green; ⟦S1315⟧ the canvas redraws only while points ease |
| Element | year numeral | Apple's numeral event: a roll on change (up when moving forward, down when moving back); month below |
| Element | final event | The lock rises in at the end of the scroll and at the slider's last month |
| Element | month slider | ⟦S0054⟧ labelled range with `aria-valuetext`; keys and drag scrub; scroll resumes control |
| Element | map base | Office star, nine town labels, 5 / 10 / 20-mile rings in quiet greys; caption states coverage and frame |
| Site | phone | Same pinned stage; year and month in one row above the map |
| Site | reduced motion | ⟦S0400⟧ no pinning; the final state at once; instant slider |
| Site | background law | White ground; the stage is `data-solid` |

## Reference transfers and non-transfers (Apple AirPods Pro)

**Transferred:**
- the pinned scroll that turns scrolling into time;
- the number as an event (the rolling year);
- the payoff numeral line (the 886 lock), as the annex assigns.

**Not transferred:**
- Apple's product imagery and its scroll-hijacking video scrubs (none here: native scroll);
- its type and palette.

## Comparison with the section's previous best (Area L, "Which way from our door", 8.59)

- **L is stronger on:** direction ("do you work on my side of town?"), with named towns and neighbourhoods in a panel.
- **M is stronger on:** time and spread. It shows the work accumulating across the whole area since 2018, with the locked total as the payoff.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | A calm pinned composition: a giant year, a quiet map filling with green and lime, and the lock as the closing line (`-1440-025` → `-1440-095`). **Minus:** the map is abstract (no streets or roads) |
| Usability (30) | **8.4** | Native scroll, never hijacked; a labelled slider alternative; reduced motion shows everything at once; 0 errors in 120 views. **Minus:** 300 vh of scroll length; points are approximate by design |
| Creativity (20) | **8.6** | No Area version uses scroll to move through time, or shows the work spreading across the map |
| Content (10) | **8.6** | The finder's own dated records and the lock verbatim; no derived count anywhere. **Minus:** finder and lock differ by three records; 55 records are off the frame |
| **Weighted** | **8.54** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.4 + 0.2 × 8.6 + 0.1 × 8.6 = 3.44 + 2.52 + 1.72 + 0.86 = **8.54**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not the drivable map (that stays in Area C); nothing game-like.
- White ground; brand accents only; normal fonts.
- No invented data.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Booking M until Muse accepts.
