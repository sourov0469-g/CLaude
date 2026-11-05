# GATE-FIX-PEOPLE · section 5 "Who shows up? Family.", three versions (default: V2 Prints on a table)

**Sources:** `reset/sections/05-people/v1–v3.html`; the reset original is kept as `b1.html`.

**Evidence** (`gates/fix/people/`):
- `versions-1440.jpg` and `versions-390.jpg`;
- every state at DPR 2;
- `checks-people-v1…v3.json`.

**Switch:** the Versions button → Family, or `owl-roofing.html?people=1` (`3`).

## 1. What was broken, and what fixed it
| Finding (audit, owner) | Fix |
|---|---|
| **Blurry.** Owl's family and crew photos are 558–900 px wide, but the split cover stretched them full-bleed to 720–1440 px, and to 2.5× on phones. | **Every version shows them at or below their own pixels:** desktop at most 1×, phones at most 0.55× (1.1× at DPR 2). The sharpness check passes at 1440 and 390 × DPR 2 for every version. These are the only photos of the real Browns and Berglands, so stock can't stand in, and they are never stretched now. |
| **A collage mid-turn.** Halfway through a chapter turn, both families filled one half, one above the other (audit `desktop-035-people.jpg`). | V1 now crossfades in place: no half slides over another (checked mid-turn). |
| **Phone: heading across the faces, card over the children.** | V1 on phones: the heading and dots sit above the photos, and the card sits above the call pill (it had been hidden under it). |
| **A stock photo** of a stranger's house stood in Tim's chapter, and **an image shared with another section** (`svc-check` was also in section 2) | The Browns' second half is now words ("Two families. One crew. Founded 2025."). `svc-check` (Owl's own crew member on a roof) lives only here now; section 2 has its own stock. |
| **Bright card colours** | Surface, wash and accent-wash cards in the muted palette. |

## 2. The three versions

### V1 · Split cover (kept, repaired)
- **What it is:** a pinned stage of three chapters (the Browns, the Berglands with Noah on the ladder, Owl's crew), each on two muted halves. The name card carries the embossed Owl mark. The chapters crossfade, and dots jump between them.
- **Reference:** MERSI.
- **Five questions:**
  1. **What is it for?** Who will come to my house.
  2. **Under 3 s?** Yes.
  3. **Fun:** the chapters turn as you scroll.
  4. **Every element?** Photos, card, dots. Yes.
  5. **Stressed?** Real names and faces.
- **Ledger:** ⟦S0448⟧ ⟦S0458⟧ ⟦S1445⟧ ⟦S1107⟧ ⟦S0400⟧.

### V2 · Prints on a table
- **What it is:** Owl's own five photos as prints on a table, each at no more than its own size:
  - the Browns;
  - the Berglands;
  - Noah, ladder in hand;
  - an Owl roofer on a job;
  - a crew member on a roof.

  **Tap** a print to bring it to the front and **turn it over** to its names and facts. **Drag** prints about. A drag never counts as a tap. Beside the table: "Owl Roofing is two families, the Browns and the Berglands, and the crew they send to your roof", with three locked facts.
- **Reference:** a pattern, physical cards (not live-studied).
- **Five questions:**
  1. **What is it for?** Meet the people.
  2. **Under 3 s?** Yes: family photos.
  3. **Fun:** you handle the photos like prints from a drawer.
  4. **Every element?** Prints, backs, facts, hint. Yes.
  5. **Stressed?** Warm and human, nothing to read unless you want to.
- **Ledger:** ⟦S1445⟧ ⟦S1107⟧ ⟦S1441⟧ ⟦S1306⟧ ⟦S0400⟧.

### V3 · Two names
- **What it is:** "Tim Brown" and "Noah Bergland" set very large, then "and the crew". Point at a name, tap it or focus it, and that family's photo opens beside it in a growing circular mask. Noah's opens his family and him on the ladder; the crew's opens two crew photos. A footer line carries the locked facts.
- **Reference:** Lando (type with photographs placed on it).
- **Five questions:**
  1. **What is it for?** The founders, by name.
  2. **Under 3 s?** Yes.
  3. **Fun:** the names are the menu.
  4. **Every element?** Names, photo, line. Yes.
  5. **Stressed?** Yes.
- **Ledger:** ⟦S1433⟧ ⟦S1435⟧ ⟦S0409⟧ ⟦S1107⟧ ⟦S0400⟧.

**All three:**
- use Owl's own photos with the site's own captions;
- add no invented detail (no "van", no years of experience);
- carry only locked facts: founded 2025, Tim Brown and Noah Bergland, family-owned, Shoreview, GAF Systems Plus, We Give a Hoot.

## 3. AA pairs (Shingle Slate; all four palettes in `gates/fix/colour/palettes.json`)

| Pair | Contrast |
|---|---|
| V1: light text on the dark halves | 13.78:1 |
| V1: accent word on dark | 7.05:1 |
| V1: ink on the cards | 12.31–14.36:1 |
| V2: ink on ground | 13.51:1 |
| V2: secondary text | 6.57:1 |
| V2: print backs (`#22282E` / `#4F5861` on `#FBFBF9`) | 14.36:1 and 6.99:1 |
| V3: active name, ink | 13.51:1 |
| V3: resting names, `--ink-50`, large bold text | 3.18–3.40:1 (3:1 needed for large text) |
| V3: captions | 6.57:1 |

## 4. Checks (`tools/fix-test.cjs people <v>` on `owl-roofing.html`): **V1 24/24 · V2 25/25 · V3 24/24**

**Every version passes:**
- axe 0 in all four palettes;
- the facts lock and no skeleton;
- distinct media (nothing here appears in any other section);
- **sharp at 1440 and 390 × DPR 2**;
- layout and 44 px controls;
- reduced motion;
- no errors.

**Behaviour checks per version:**
- **V1:** the chapters turn one at a time (Browns → Berglands → crew); no collage mid-turn; only Owl's photos with the site's captions; the dots jump.
- **V2:** five prints, none wider than its photo; tapping the Browns brings them to the front and turns them over to "Tim Brown, co-founder"; dragging moves a print and does not turn it; Enter turns a print over; the facts are locked.
- **V3:** three name buttons, Tim open first; Noah opens the Berglands and the ladder photo; keyboard focus opens the crew; the footer facts are locked.

## 5. Defects found and fixed in-session
1. **V1 on phones:** the name card was under the call pill and the dots overlapped the heading. The card now sits above the pill, and the dots sit under the heading.
2. **V3 on phones:** the photo landed below the footer line. It now comes straight under the names.

## 6. Scorecard (Design 40 · Usability 30 · Creativity 20 · Content 10)

| | Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|---|
| V1 Split cover | 8.3 | 8.4 | 8.2 | 8.8 | **8.36** |
| V2 Prints on a table | 8.6 | 8.6 | 8.9 | 8.8 | **8.68** |
| V3 Two names | 8.5 | 8.5 | 8.4 | 8.6 | **8.49** |

**Recomputed:**
- V1: 3.32 + 2.52 + 1.64 + 0.88 = 8.36
- V2: 3.44 + 2.58 + 1.78 + 0.88 = 8.68
- V3: 3.40 + 2.55 + 1.68 + 0.86 = 8.49

## 7. The default: **V2 Prints on a table** (changed from the reset's V1)
- **It is the best way to show low-resolution photos of real people:** as prints, at their own size, where small reads as natural, not as blur. V1 has to frame the same photos on a big dark stage, where they look smaller than the space.
- **It is the most human moment on the page.** You touch the family's photos, and the backs give the names.
- **Rhythm:** it frees one of the page's pinned stages (the hero and section 3 stay pinned). The reset had reached its pinning limit here.

## 8. Remaining (named)
- **D1 · the photos are small originals.** The Browns 620 px, the Berglands 558 px, Noah 700 px. Sharper originals from the owner would let V1 go large again.
- **D2 · still no photo of Tim on a job**, so his chapter in V1 carries words, not a picture.
- **D3 · `fam-community`** (three people with hand-made signs) is not used: nothing on record says what that event was.

## 9. Vetoes: **zero**
- Owl's own photos and captions only; no stock stands in for people.
- Only locked facts.
- The logo is untouched.
- No sub-agents or background tasks; every command ran in my own thread, in the foreground, with a time limit.
