# Upgrade Round 5 · Service Area + We Give a Hoot + Booking + header/footer · plan lines and skill pack (written before building)

Site level: the Round 1–4 packs stay in force. Added this round, each read IN FULL by tag:
- ⟦S1442⟧ form-design — single column, persistent top-aligned labels, validate on blur, the error goes under its field
  with `aria-describedby`, multi-step shows real progress with back navigation and no data loss, one-of-few as visible
  radios, default the common answer.
- ⟦S0450⟧ marquee-loop — duplicate the sequence, translate 0 → −50 % linearly, stable widths, faded edges, pause on
  hover only when useful, static under reduced motion, never for content that must be read carefully.
Carried and used: ⟦S1246⟧ tabs, ⟦S1107⟧ keyboard, ⟦S0205⟧ small 3D feel, ⟦S1330⟧ damped tilt, ⟦S0407⟧ svg animation,
⟦S1325⟧ progress, ⟦S1352⟧ numbers, ⟦S1363⟧ bounded particles, ⟦S0451⟧⟦S1329⟧ titles, ⟦S0462⟧ hit areas, ⟦S1049⟧
focus, ⟦S0076⟧⟦S0251⟧ copy, ⟦S1388⟧ 3D-feel buttons.

## Plan lines
Archive first: the old V2s → `area-b1`, `family-b1`, `booking-b1`.

**Service Area** (V1 kept: the abstract road)
1. **Area V2 · "Town Keys"** — reference **Quiet Cubes** (configurator-first instrument structure). The 29 towns are 29
   3D-feel keycaps; type to filter, or press a key, and a readout says "Yes — we roof in <town>." with the Book action.
   Fully abstract, no map. ⟦S1388⟧ keys, ⟦S1107⟧ arrow-key grid, ⟦S0462⟧.
2. **Area V3 · "Twenty-Nine"** — reference **Apple AirPods Pro** (a numeral as the event). A giant "29" whose glyphs are
   filled with the 29 town names (SVG text clip). Searching lights your town inside the numeral, and a slow marquee
   of the names runs beneath it (⟦S0450⟧). Abstract, not a map.

**We Give a Hoot** (V1 kept: the two family photos with the hoot button)
3. **Family V2 · "Family Album"** — reference **Cowboy** (family-fronted warmth, one named system). Owl's real photos
   (the Browns, the Berglands, the crew, Noah, community) as a 3D-feel stack of prints; flick, drag or press Next to
   send the top print to the back. Captions say only what the photo shows (⟦S1039⟧). Small 3D on the cards (⟦S0205⟧).
4. **Family V3 · "By the Numbers"** — reference **Longbow Motors** (craft as doctrine plus hard numbers, never
   adjectives). Numbers only from the facts lock: 2 founding families · 2025 · 29 towns · 3 cleanup passes · 10-year
   workmanship warranty · 5.0 from 90+ reviews, each a counter on a drawn rule (⟦S1352⟧), beside small portraits of
   the two families.

**Booking** (V1 kept: the card form)
5. **Booking V2 · "Build Your Visit"** — reference **Quiet Cubes** (configurator first). Three steps: what (one of the
   five services as visible radios) → when (day and time window) → who (name, phone, address). There is a step
   progress rail, Back keeps the answers, and a live preview shows the email that will open. Submitting opens the
   email app with the details and never claims the request was saved or sent (⟦S1442⟧).
6. **Booking V3 · "Call Card"** — reference **Lando Norris** (bespoke, made for one business). A 3D-feel business
   card that tilts with the cursor. The front carries the phone (tap to call), hours and address. "Book online" flips
   it to the back, which holds the short form (same honest email hand-off); "Back to the card" flips it again.

**Header / footer treatment** (one treatment, applied in place; the header links keep pointing at homepage anchors)
7. **Header** — a ridge-line scroll-progress rule along the bottom edge of the header (⟦S1325⟧ scaleX) and nav
   underlines drawn like a shingle course on hover and focus (⟦S0407⟧).
8. **Footer** — a living roofline: 29 small roofs, one per town, along the top edge of the footer, lighting in a slow
   wave (⟦S0407⟧, reduced motion static), plus the existing locked facts unchanged.
