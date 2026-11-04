# GATE-NEW — On your street L, "Which way from our door"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 2, section 8 (Try L accepted by Muse). It inherits the button system. The drivable map stays in Area C only: no map is drawn here, only a compass chart of directions and distances.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **On your street L, "Which way from our door"** (`?area=l`) |
| Primary reference (annex v3, one) | **Graza**, scoped by the annex to the custom-animation quality bar: crafted, characterful motion that feels hand-made. No Area version has used Graza: C used Bruno Simon; D and H Dropbox; E an Erie note; F Lando Norris; G Scout; I Cowboy; J Quiet Cubes; K Cash App; A and B name none. Apple AirPods Pro was set aside because Try L, the section just above, already uses it; Lusion because Booking K uses its drawn line; MERSI, Rimowa and Bruno Simon are scoped elsewhere; Ever is barred from centrepieces. |
| Signature creative move | **A compass rose, centred on the office.** Every documented project in the firm's project finder sits on an eight-petal wind rose by its direction and distance from 7801 N Lamar. Each petal is stacked in four distance bands (under 5, 5–10, 10–20, 20+ miles, deep green to lime), and its area grows with the number of records that way. A flat compass needle on a real damped spring swings to whatever you pick: a petal (click, tap, or arrow keys) or your town (a select). It overshoots and settles like a needle in a hand compass. That is Graza's crafted motion, here at the centre. The panel then names that side of town: the towns there with their straight-line miles, the neighbourhoods on the books there, the work done most there, and the latest month on record. On arrival the petals bloom out from the office one by one, clockwise from north, and the needle spins up and settles. |
| Style family | A flat compass card on white: eight stacked petals, four greens, a needle, plain-type panel |
| Content | The finder records (`__NEAR.p`: position in the finder's own projection, month, trades, town, neighbourhood), as Areas C–K use them; the office position and scale from the same finder (8.3 px per mile). Directions and miles are computed from those positions and said to be straight lines, "placed near the home, never on it" (the finder's own wording). Petals are relative: no counts and no total, so nothing competes with the lock "886 documented projects since 2018 · 312 on the map with photos + 574 more counted" (shown verbatim, as in Areas I and K). Places are listed, never summed. The office address in its locked form. |
| How it differs from every existing Area version | A pins photo cards on a thread. B finds a street. C drives a map. D ranks towns. E answers yes or no. F is a flip board of single records. G hangs street signs. H is a town × trade grid. I is a distance ruler (miles only, one dimension). J is five yearly bars. K is a month-by-month calendar. None shows direction, and none answers "do you work on my side of town?". |
| Why it is better | Homeowners place themselves by direction first ("we're up in Cedar Park", "south of the river"). L shows, at a glance, that the crews work every side of the office, most north and southwest, and names the streets on your side. The current best (K, "Month by month", 8.38) answers when; L answers which way. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the rose); ⟦S0220⟧ the finder's records only, no counts, one accent |
| Rose (8 petals) | ⟦S1420⟧ petal area proportional to records (radius by square root), four direct-labelled bands, a legend; ⟦S1499⟧ one decision per view |
| Petals as controls | ⟦S0054⟧ `radiogroup` of eight `radio`s with spoken names ("Northwest: Cedar Park, Leander …"), roving tabindex, arrow keys rotate, Home goes to north; a visible lime focus outline drawn on the petal; button system: hover and press physics with `transform-box: fill-box` |
| Needle | ⟦S1436⟧ a simulated damped spring (stiffness and damping tuned for one overshoot and a settle), shortest way round; ⟦S1440⟧ the needle's swing is the feedback for every pick |
| Arrival | ⟦S1325⟧ once, on entering view: petals bloom from the office clockwise from north, 60 ms apart, with a small overshoot; the needle spins up and settles on the busiest direction |
| Your town (select) | ⟦S0054⟧ a labelled native `<select>` of the towns with three or more records; the needle points to the town's exact bearing and its petal is picked |
| Panel | ⟦S1449⟧ chunked: towns that way with miles; neighbourhoods on the books; the work done most; the latest month; ⟦S1440⟧ updates with a short settle, announced politely |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" (shared `CTAS`, phone link sized as in the hero) |
| Phone | The rose full width (about 340 px; eight large wedges), select full width, panel below; ⟦S1441⟧ |
| Reduced motion | ⟦S0400⟧ petals drawn at once; the needle jumps |
| Background law | White ground; the compass card is `data-solid` |

---

## Build log

**How to view:** `?area=l` (switcher: On your street, **L "Which way from our door"**).

**Files:**
- `src/sec/area7.js` (`Area7.L()` prerendered from `__NEAR` at build time; `Area7.wire`) and `area7.css` (class prefix `a`; the collision check found one shared name, `.an2`, and the needle classes were renamed `andn` / `ands`).
- Registered in `build_site.py`: module, prerender key `al`, slot entry, switcher label, boot call.
- The file grows by 35,718 bytes (no photographs).

**The rose:**
- **Geometry:** an SVG compass, 520 units square, with eight petals 42° wide. Each record is placed by its bearing from the office (clockwise from north) and its straight-line miles, both from the finder's own positions (8.3 px per mile).
- **Bands:** each petal is stacked by distance: under 5 miles (deep green), 5–10, 10–20, and 20 miles and more (lime).
- **Size:** a petal's radius grows with the square root of its records, so its area, not its length, carries the amount. No counts are shown.
- **Hit area:** each petal's hit area is the full 45° wedge out to the ring, so even the small east petal is a large target.
- **Measured split:** most records lie north, then southwest, then northwest. The intro sentence is computed from the same records.

**The needle (Graza's crafted motion):**
- A simulated damped spring (stiffness 150, damping 12), stepped every animation frame and always taking the shorter way round.
- Measured north → southwest: −58° at 106 ms, −135° at 206 ms, an overshoot to −155° at 306 ms, back to −132° at 606 ms, settled at −135° by about 900 ms.
- The picked petal springs 8 px outward along its bearing (`cubic-bezier(.34,1.56,.64,1)`); its compass letter turns green.

**Arrival (once, on entering view):**
- The petals bloom out of the office one by one, clockwise from north: 60 ms apart, 0.7 s each, with a small overshoot.
- The needle spins up from −300° and settles on north, overshooting to +45° on the way, settled at about 1.1 s.
- Without JavaScript, the rose is drawn complete.

**Picking:**
- **Petals** form a `radiogroup` of eight `radio`s ("Northwest of our office"). Arrow keys turn the compass, Home is north, End is northwest, and Enter or Space picks.
- **Focus:** the focus outline is drawn along the petal's own edge (lime, 5 units). The button system's rectangular ring is switched off for petals only.
- **The select:** "Your town, or your Austin neighbourhood" lists 21 towns with three or more records and 33 Austin neighbourhoods with two or more.
  - Picking one points the needle at that place's exact bearing and picks its petal.
  - A note reads, for example, "Cedar Park is about 14 miles northwest of our office, in a straight line."

**The panel (per direction):**
- the busiest-direction rank (top three only);
- the towns that way, with straight-line miles; Austin itself is never placed, because the office is in it;
- up to ten neighbourhoods on the books that way; places named only by their town are left out;
- the three trades done most that way;
- the latest month on record that way.

The panel settles in over 0.4 s and is announced politely.

**Footer:**
- the lock, verbatim: "886 documented projects since 2018 · 312 on the map with photos + 574 more counted.";
- how it was measured, using the finder's own "placed near the home, never on it";
- "Book a free inspection" with the phone link, sized as in the hero (18 px icon).

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-area-l-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- `-1440-bloom` (petals mid-bloom, clockwise), `-1440-swing` (needle mid-swing), `-1440-sw` (southwest picked), `-1440-focus` (keyboard focus on northwest, traced along the petal), `-1440-town` (Cedar Park chosen);
- `-390-west`, `-390-panel`;
- contact sheet: `new-area-l.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Before arrival | Petals held at scale 0 (with JavaScript); bloom on entering view |
| Needle, frame by frame | Overshoot −155° on a −135° target, settled about 0.9 s; arrival −300° → 0° with a +45° overshoot, settled about 1.1 s |
| Southwest | `aria-checked` on petal 5; "Southwest of our office"; towns Buda 20 mi, Wimberley 33 mi, San Marcos 35 mi, San Antonio 82 mi; neighbourhoods South Austin, Maple Run, Legend Oaks, Shady Hollow …; label "SW" green |
| Keyboard | → → from southwest lands on northwest (focused, checked); Home → north, needle at 0° |
| Select | Cedar Park: "about 14 miles northwest … in a straight line", petal 7, needle at −30° (its own bearing, not the petal's centre); an Austin neighbourhood works the same way (Anderson Mill, about 9 miles northwest) |
| Reduced motion | Rose complete at once; the needle jumps (west: −90° 50 ms after the pick) |
| Phone tap (390) | West picked; rose 329 px wide; 0 overflow |
| CTA phone icon | 18 × 18 |
| All 231 version views | 0 page errors; the button system on in every view; subpages untouched |
| Existing versions | 181 slot templates and 8 page templates unchanged; the page body identical apart from the one added `area:l` template; the only changed script is the main bundle (adds `Area7`); defaults unchanged (`area = a`) |
| Locks | The 886 wording, "7801 N Lamar Blvd Suite C70, Austin TX 78752" and "(512) 550-0000" verbatim |
| Geography sanity | Round Rock 11 mi north, Cedar Park 14 mi northwest, Lakeway 16 mi west, San Marcos 35 mi southwest: consistent with the real map |

## Defects found and fixed

1. **Class collision:** `.an2` is already styled elsewhere; the needle classes are now `andn` / `ands`.
2. **Town-only places listed as neighbourhoods:** records named only by their town ("Round Rock, Round Rock") showed up as neighbourhoods. They are now left out of the neighbourhood lists and the select.
3. **A rectangular focus ring around a wedge:** the button system's lime outline framed each petal's bounding box. A more specific rule hands petal focus to the petal's own outline, which now traces the wedge and snaps in (stroke width eased over 0.24 s).

## Remaining defects, named honestly

- **Directions are approximate:** finder positions are "placed near the home, never on it", so a record near a sector boundary can fall in the neighbouring petal.
- **Austin itself has no single direction:** the office is inside the city. Austin is never placed as a town; its neighbourhoods carry the direction instead.
- **Hover dims the other petals:** while the pointer is over the rose, the unpicked petals fade to 55% to point at the one under it. Some may find the rose paler while exploring.
- **Long lists on busy sides:** north and southwest show ten neighbourhoods each; the rest are not listed.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | area L | ⟦S1434⟧ the rose dominates; ⟦S0220⟧ the finder's records only, no counts, one accent |
| Element | rose | ⟦S1420⟧ petal area by records (square-root radius), four labelled bands with a legend; ⟦S1499⟧ one decision per view |
| Element | 8 petals | ⟦S0054⟧ radiogroup, roving tabindex, arrows / Home / End / Enter / Space, a focus outline along the petal; button system: hover and press physics (`transform-box: fill-box`) |
| Motion | needle | ⟦S1436⟧ a damped spring, one overshoot then a settle, shortest way round; ⟦S1440⟧ the swing is the feedback for every pick |
| Motion | arrival | ⟦S1325⟧ once: a clockwise bloom, 60 ms apart, with a small overshoot; the needle spins up and settles |
| Element | your town (select) | ⟦S0054⟧ a labelled native select, towns and Austin neighbourhoods in two groups; the needle points to the place's exact bearing |
| Element | panel | ⟦S1449⟧ four chunks (towns with miles, neighbourhoods, work, latest month); ⟦S1440⟧ a 0.4 s settle, announced politely |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button, phone link at hero size |
| Site | phone | One column; rose 329 px; ⟦S1441⟧ full-wedge hit areas |
| Site | reduced motion | ⟦S0400⟧ rose complete at once; needle jumps |
| Site | background law | White ground; the card is `data-solid` |

## Reference transfers and non-transfers (Graza)

**Transferred (the annex scopes Graza to the custom-animation quality bar):**
- motion with character: a needle that overshoots and settles like a real one, petals that pop out of the centre in sequence, a picked petal that springs outward;
- crafted, not stock: a hand-tuned spring instead of a CSS ease, with measured overshoot and settle times.

**Not transferred:**
- Graza's illustration style, squeeze-bottle product, colours and type;
- the draw-on-scroll detail the annex marks unverified.

## Comparison with the section's previous best (Area K, "Month by month", 8.38)

K shows when the crews worked: a calendar of colour, month by month.
- **L shows which way:** every documented project around the office by direction and distance, with the towns, streets and work on each side, and your own town found by the needle.
- **K is stronger on:** time and rhythm (busy all year).
- **L is stronger on:** the homeowner's first question, "do you work on my side of town?", and a crafted interaction.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | A clean compass card: stacked petals in four greens, compass ticks and letters, a slim needle on a hub, a calm panel (`-1440-sw`, `-1440-town`); a clockwise bloom (`-1440-bloom`). **Minus:** the hover dim can make the rose pale while exploring |
| Usability (30) | **8.5** | Click, tap, arrows or a select; full-wedge targets; a petal-shaped focus outline; a polite announcement; reduced motion; 0 errors and 0 overflow. **Minus:** the busiest sides show only ten neighbourhoods |
| Creativity (20) | **8.7** | No Area version shows direction; the office as the compass centre and a real spring needle make the interaction feel made by hand |
| Content (10) | **8.6** | The finder's records only; bearings and miles computed and labelled as straight lines; no counts beside the lock; locks verbatim. **Minus:** positions are approximate by design |
| **Weighted** | **8.59** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.5 + 0.2 × 8.7 + 0.1 × 8.6 = 3.44 + 2.55 + 1.74 + 0.86 = **8.59**.

**Vetoes: none.**
- Locks verbatim; no form; nothing claims to be saved or sent.
- No map drawn (the drivable map stays in Area C); not a configurator; no game.
- White ground; brand accents only; normal fonts.
- No imagery.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Booking L until Muse accepts.
