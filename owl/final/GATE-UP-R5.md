# GATE · Upgrade Round 5 · Service Area, We Give a Hoot, Booking + header/footer (owner's upgrade order)

**Result:** Service Area, We Give a Hoot and Booking each have three live versions in `owl/final/owl-roofing.html`, and
the header and footer have their treatment. V1 of each section is still the default view.

By the owner's overnight order, no joint verification stop here: the version ladder starts next.

Superseded versions are kept inside the file as inert hidden backups, never deleted:
- old Service Area V2 "radar rings" → `area-b1`
- old We Give a Hoot V2 "reel" → `family-b1`
- old Booking V2 "big phone + form" → `booking-b1`

Plan lines (reference and skills for each version) were written before building, in `owl/skills/UP-R5-PACK.md`.

| Section · version | Name | Reference (annex) | One line |
|---|---|---|---|
| **Area V2** | **Press Your Town** | Quiet Cubes (configurator-first instrument) | 29 3D-feel keycaps on a screwed instrument deck, with Shoreview marked as home. Typing filters the keys; one match presses its key, and a terminal readout confirms "Yes, we roof in Edina." An unknown town is told it is not on the list of 29 and given the phone. An LED wave idles across the keys. Arrow keys move around the grid. |
| **Area V3** | **Twenty-Nine Towns** | Apple AirPods Pro (a numeral as the event) | A giant 29 whose glyphs are filled with the 29 town names, drifting slowly. Searching lights your town inside the numeral, and a marquee of the names runs beneath. Abstract, not a map. |
| **Family V2** | **The Family Album** | Cowboy (family-fronted warmth) | Owl's real photos (the Browns, the Berglands, the crew, Noah, community) as a stack of taped prints. Flick or drag the top print to the back, or use the 3D keys. The front print tilts with the cursor. Captions say only what each photo shows. |
| **Family V3** | **Our Family, in Numbers** | Longbow Motors (doctrine plus hard numbers) | Six locked numbers counted up on drawn rules (2 founding families · 2025 · 29 towns · 3 cleanup passes · 10-yr workmanship warranty · 5.0 from 90+ reviews), beside the two family portraits, over a dotted roofline that walks. |
| **Booking V2** | **Build Your Visit** | Quiet Cubes (configurator first) | Three steps: what (five services as visible radios, defaulting to the Wise Check), when (day, plus a morning or afternoon window inside Mon–Sat 8–18), and who (name, phone, address). A progress rail marks the steps, Back keeps the answers, and errors appear under their field on blur. A live preview shows the email that will open. Submit hands off to the email app and says so. |
| **Booking V3** | **Take Our Card** | Lando Norris (bespoke, made for one business) | A 3D-feel business card that tilts with a moving sheen. The front carries the phone (tap to call), hours, email, office address and licence. Book Online flips it to the short form; focus moves into it, and the hidden face is inert. Back to the card returns focus. |
| **Header** | ridge line + shingle-course underlines | Lusion (lines carry the visitor) | A ridge rule along the bottom of the header fills as you scroll the page. Nav links get a tabbed underline drawn like a shingle course on hover, focus and the current page. The links still point at homepage anchors. |
| **Footer** | 29 roofs | Lando Norris (rest motion) | 29 small roofs along the top edge, one per town, lit by a slow amber wave. The locked facts are unchanged. |

## Truth audit
**Towns:** the real 29 towns are used everywhere. Nothing pretends to be a map.

**Numbers:** only locked facts. Family V3 states "3 cleanup passes on every Protect Your Nest job", which is part of
the system as Owl defines it.

**Forms:**
- Both new forms hand off to the email app (`mailto:info@owlroofing.com`) and say "Your email app should open with these details".
- None claims a request was saved, sent or received (tested).
- Booking V2's intro says plainly: "nothing is sent until you send it".

**Photos:** Owl's own family and crew photos, with alt text and captions that state only what is shown.

## Scorecard (D40 / U30 / C20 / Ct10; pass = weighted ≥ 7.0, no category < 6.0, zero vetoes)
| Version | Design | Usability | Creativity | Content | Weighted | Result |
|---|---|---|---|---|---|---|
| Area V2 Press Your Town | 8.2 | 8.4 | 8.0 | 8.6 | **8.26** | Pass |
| Area V3 Twenty-Nine Towns | 8.4 | 7.8 | 8.6 | 8.6 | **8.30** | Pass |
| Family V2 Family Album | 8.0 | 8.0 | 7.6 | 8.4 | **7.96** | Pass |
| Family V3 In Numbers | 8.0 | 8.0 | 7.4 | 8.8 | **7.96** | Pass |
| Booking V2 Build Your Visit | 8.0 | 8.6 | 7.6 | 8.6 | **8.18** | Pass |
| Booking V3 Take Our Card | 8.2 | 8.0 | 8.0 | 8.6 | **8.14** | Pass |

Why these aren't higher:
- The family photos are cut-outs at modest resolution.
- Family V3's counters are a known pattern; the drawn rules and the roofline carry it.
- The phone-size Booking V3 back face is taller than the front, so the card grows when flipped.

## Evidence (`owl/final/gates/up-r5/`, 2× device scale, header hidden in section shots)
Section shots at `1440`, `768` and `390`:
- `area-v2-*` (Edina typed);
- `area-v3-*` (White Bear Lake found);
- `family-v2-*`, `family-v3-*`;
- `booking-v2-*` (step 2);
- `booking-v3-*` (front) and `booking-v3-back-*` (flipped).

Also:
- `header-*` (scrolled 40 %, with the nav underline on hover at 1440) and `footer-*`;
- `checks.json`: 138 checks.

## Interaction tests (`tools/up-r5-test.cjs`): **138/138 pass**; homepage `home-verify.cjs`: **50/50**
Run on every version (9):
- only that version is visible;
- the page anchor (`#areas`, `#family`, `#book`) is kept;
- one readable h2;
- controls at least 44 px on desktop and on a 390 px phone;
- the facts-lock text check;
- axe WCAG 2.1 A/AA: 0 violations;
- no errors;
- no sideways scroll at 1440, 768 and 390;
- reduced motion: clean, with no looping animation.

Page-level:
- default V1 for all three sections;
- the three backups are inert templates;
- header links point at homepage anchors;
- the ridge fills to about halfway at mid-page;
- the footer has 29 roofs and unchanged locked facts.

Per version:
- **Area V2:**
  - 29 keys, with Shoreview as home;
  - "ed" filters to Edina and Eden Prairie;
  - "edina" presses its key and confirms;
  - "Duluth" is told the truth and given the phone;
  - arrow keys move along a row, and down moves a full row.
- **Area V3:**
  - all 29 towns are inside the numeral;
  - "white" lights only White Bear Lake and confirms it;
  - the marquee is an aria-hidden duplicate.
- **Family V2:**
  - five real photos, with only the top print exposed;
  - Next and Previous move the stack, with caption and count following;
  - a 160 px drag flicks the top print to the back.
- **Family V3:**
  - the counters settle on exactly 2 · 2025 · 29 · 3 · 10-yr · 5.0;
  - "90+ reviews" is present;
  - the rules draw.
- **Booking V2:**
  - the Wise Check is the default;
  - Next walks the steps and the rail marks them;
  - Back keeps Thu;
  - empty details put an error under Name and move focus there;
  - the live preview updates;
  - submit hands off without claiming it was sent.
- **Booking V3:**
  - the front carries all the locked contact facts;
  - the flip makes the back live, the front inert, and moves focus to Name;
  - an empty submit asks for the name;
  - flipping back returns focus.

## SKILL LEDGER (§1G)
**Site level:** the Round 1–4 packs plus 2 Round 5 skills read in full by tag (`owl/skills/UP-R5-PACK.md`): ⟦S1442⟧
form-design and ⟦S0450⟧ marquee-loop. The critique audit used ⟦S1473⟧ ⟦S1479⟧ ⟦S1482⟧ ⟦S1496⟧–⟦S1501⟧.

**Per section**
| Section | Design | Motion | Interaction / access |
|---|---|---|---|
| Area V2 | instrument deck, ⟦S0205⟧ small 3D keys | LED idle wave; key press travel | ⟦S1107⟧ arrow-key grid with roving tabindex; ⟦S0462⟧; live readout |
| Area V3 | numeral event; SVG text clip | ⟦S0407⟧ drifting names; ⟦S0450⟧ marquee | search with a live result; marquee aria-hidden |
| Family V2 | ⟦S1039⟧ truthful captions; taped prints | ⟦S1330⟧ tilt; ⟦S0340⟧-style fling past 90 px | 3D keys; one exposed print; live caption |
| Family V3 | ⟦S1352⟧ numbered stats; doctrine without adjectives (⟦S0076⟧) | count-up; ⟦S0407⟧ rules draw; walking roofline | list semantics; static under reduced motion |
| Booking V2 | ⟦S1442⟧ single column, top labels, visible radios, common default | step slide; ⟦S1325⟧ progress fill | errors under fields with `aria-describedby`; Back keeps data; honest email hand-off |
| Booking V3 | bespoke card; ⟦S0205⟧ | ⟦S1330⟧ tilt and sheen; flip | inert hidden face; focus moved and returned; ⟦S1442⟧ |
| Header | ridge rule | ⟦S1325⟧ scaleX scroll progress | anchors unchanged; ⟦S1049⟧ focus underline |
| Footer | 29 roofs | ⟦S0407⟧ light wave | aria-hidden; reduced motion static |

**Per element**
| Element | Skills |
|---|---|
| Town keycaps | ⟦S1388⟧ ⟦S1107⟧ ⟦S0462⟧ |
| Terminal readout | ⟦S0251⟧ |
| Numeral of names | ⟦S0407⟧ |
| Name marquee | ⟦S0450⟧ |
| Print stack | ⟦S0205⟧ ⟦S1330⟧ ⟦S1039⟧ |
| Stack keys (3D) | ⟦S1388⟧ |
| Count-up stats | ⟦S1352⟧ |
| Step rail | ⟦S1325⟧ ⟦S1442⟧ |
| Radio cards | ⟦S1442⟧ ⟦S0462⟧ |
| Email preview | ⟦S1442⟧ ⟦S0251⟧ |
| Business card flip | ⟦S0205⟧ ⟦S1330⟧ ⟦S1049⟧ |
| Header ridge | ⟦S1325⟧ |
| Nav shingle underline | ⟦S0407⟧ ⟦S1049⟧ |
| Footer roofs | ⟦S0407⟧ |
| Titles | ⟦S0451⟧ ⟦S1329⟧ |

## Defects
**Fixed in this round:**
1. **Pre-existing in the default V1s:**
   - Service Area V1's town buttons were 40 px tall; they are now 44 px.
   - Booking V3's email link on phones got a 44 px target.
2. **Area V2:** dimmed keys used opacity, which would fail contrast; they are now a darker key face with passing text.
3. **Family V3:**
   - the first portrait's caption hid under the second print; the layout was respaced, and the prints sit side by side on phones;
   - the stats were a `dl` with extra children, which is invalid; they are now a list.
4. **Booking V2:** the progress fill was inside the `ol`, which is invalid; it moved out.
5. **File weight:** repeated photos were embedded once per version. The build now stores each repeated image once and points copies at it: 7.18 → 6.06 MB. All earlier suites were re-run after the change: Round 1 85/85, Round 2 81/81, Round 3 103/103, Round 4 94/94, homepage 50/50.

**Open, honestly named:**
1. Owl's photos are modest in resolution. The higher-resolution request stands.
2. Inner pages still say "BBB Accredited" (frozen until their round).
