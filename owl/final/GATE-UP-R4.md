# GATE · Upgrade Round 4 · Services and Reviews (owner's upgrade order)

**Result:** Services and Reviews each have three live versions in `owl/final/owl-roofing.html`. V1 of each is still the
default view (no query string). Judge any version with `?services=N`, `?reviews=N` or `?review`.

By the owner's overnight order, Round 5 follows straight on; nothing waits on this gate.

Superseded versions are kept inside the file as inert hidden backups, never deleted:
- the old Services V2 "feather index" → `services-b1`
- the old Reviews V2 "clothesline" → `reviews-b1`

Plan lines (reference and skills for each version) were written before building, in `owl/skills/UP-R4-PACK.md`.

| Section · version | Name | Reference (annex) | One line |
|---|---|---|---|
| Services V1 (kept) | Now Boarding | — | Unchanged, apart from the phone fix below. |
| **Services V2** | **Five Chapters** | MERSI (split-cover chapters) | Each service is a split cover: Owl's photo on one half; an outlined chapter number that rolls, the title, the line and what's included on the other. An oversized index is the tab list. A chapter change wipes the photo in with a clip-path mask, and the cover leans slightly toward the cursor. |
| **Services V3** | **One Line** | Lusion (one continuous line) | One amber line of exactly three strands redraws itself into each service: a hip roof with shingle courses and ridge cap, a lifted tab and hammer, hail over a roof, the Wise Check magnifier, and lap siding with a window. A light pulse runs along it at rest, and stops on a track are the buttons. |
| Reviews V1 (kept) | Checked, rated, trusted | — | Unchanged. |
| **Reviews V2** | **Earned, Not Claimed** | Scout Motors (heritage spine, film roll) | A film-strip spine that fills as you scroll and carries only dated facts: 2025 founded by Tim Brown and Noah Bergland → February 25, 2026 BBB A− → today 5.0, with 90+ counting up. The undated credentials (licence, GAF Systems Plus, warranties) ride a pinned side rail, "carried the whole way", so no false order is implied. |
| **Reviews V3** | **Ninety-Plus** | Immersive Garden (splash surface mechanism) + Lando Norris (rest motion) | 90 feather marks and one "+" around a card stating "5.0 · 90+ reviews". Cursor, tap and idle splashes send a ring through the field; marks lift, turn amber and settle. All 91 marks are placed clear of the card at every width (tested). |

## Truth and roofer audit
**Reviews:**
- No quotes, no reviewer names, no per-review stars.
- The only rating wording is "5.0 · 90+ reviews".
- Dates are used only where they are locked: founded 2025, and BBB A− since 2026-02-25.
- No "Accredited" anywhere in these sections (tested).

**Services:**
- Copy comes only from the shared `OWL.SVC` list already used by V1.
- Photo alt text says what each photo shows, never that it is a specific Owl job.

**Services V3 drawings:**
- The replacement roof is a hip roof seen from the front, with the courses on the roof face and a ridge cap on the ridge. A first draft put the courses inside a gable end, where a roofer would see siding; it was redrawn before the gate.
- The repair slope steps course by course, with one lifted tab.
- The siding is horizontal lap boards.

## Scorecard (D40 / U30 / C20 / Ct10; pass = weighted ≥ 7.0, no category < 6.0, zero vetoes)
| Version | Design | Usability | Creativity | Content | Weighted | Result |
|---|---|---|---|---|---|---|
| Services V2 Five Chapters | 8.2 | 8.2 | 7.6 | 8.4 | **8.06** | Pass |
| Services V3 One Line | 8.0 | 8.0 | 8.6 | 8.2 | **8.14** | Pass |
| Reviews V2 Earned, Not Claimed | 8.0 | 7.8 | 7.8 | 9.0 | **8.00** | Pass |
| Reviews V3 Ninety-Plus | 8.2 | 7.6 | 8.4 | 8.6 | **8.10** | Pass |

Why these aren't higher:
- Owl's service photos are 560 px and soft on the large cover.
- The storm drawing's hail reads close to rain.
- Reviews V2 has generous spacing between nodes, which is the cost of a scroll spine with three true dates.

## Evidence (`owl/final/gates/up-r4/`, 2× device scale, header hidden)
- `services-v2-*`;
- `services-v3-*` (Replacement);
- `services-v3-storm-*`;
- `reviews-v3-*`;
- `reviews-v2-f20-*` and `-f85-*`: viewport shots, since the side rail is sticky;
- each at `1440`, `768` and `390`;
- `checks.json`: 94 checks.

## Interaction tests (`tools/up-r4-test.cjs`): **94/94 pass**; homepage `home-verify.cjs`: **50/50**
Run on every version:
- only that version is visible;
- the page anchor (`#services` / `#reviews`) is kept;
- one readable h2;
- controls at least 44 px on desktop and on a 390 px phone;
- the facts-lock text check: only (651) 977-6027, and no Master Elite, A+ or Accredited;
- for Reviews, the rating wording only and no quotes;
- axe WCAG 2.1 A/AA: 0 violations;
- no errors;
- no sideways scroll at 1440, 768 and 390;
- reduced motion: clean, with no looping animation.

Per version:
- **Services V2:**
  - five chapters from `OWL.SVC`;
  - chapter 3 wipes in a real photo and changes the title, number and list;
  - arrow keys and End move through the tabs, with roving tabindex.
- **Services V3:**
  - the Storm stop morphs the line's three strands and swaps the panel and the drawing's title;
  - the track fills to the stop;
  - arrow keys move along the stops.
- **Reviews V2:**
  - the spine holds exactly 2025, February 25 2026 and Today;
  - the undated credentials sit on the side rail;
  - scrolling fills the film strip, lights all three nodes, and counts to 90.
- **Reviews V3:**
  - the canvas is painted;
  - a click splashes the field and marks turn amber;
  - all 91 marks are visible and clear of the card at 1440, 768 and 390.

## SKILL LEDGER (§1G)
**Site level:** the Round 1 pack (50), Round 2 (14), Round 3 (9), and 6 Round 4 skills read in full by tag
(`owl/skills/UP-R4-PACK.md`): ⟦S0086⟧ ⟦S1375⟧ ⟦S1325⟧ ⟦S1363⟧ ⟦S1338⟧ ⟦S1352⟧. The critique audit used ⟦S1473⟧
⟦S1479⟧ ⟦S1482⟧ ⟦S1496⟧–⟦S1501⟧.

**Per section**
| Section | Design | Motion | Interaction / access |
|---|---|---|---|
| Services V2 | ⟦S1375⟧ chapter covers, oversized service index | ⟦S1375⟧ 620 ms mask wipe, 55 ms stagger on cubic-bezier(.22,.61,.36,1); ⟦S1352⟧ rolling number; ⟦S0451⟧ title | ⟦S1246⟧ tabs, roving tabindex, Home/End; ⟦S1049⟧ |
| Services V3 | ⟦S0086⟧ three-strand drawings; ⟦S0414⟧ roofer-true line art | ⟦S0407⟧ draw-on then morph; travelling light pulse | ⟦S1246⟧ tabs on a track; ⟦S0462⟧ full-cell stops |
| Reviews V2 | Scout spine; ⟦S1352⟧ date markers | ⟦S1325⟧ progress fill by scaleY between measured centres; star pop; count-up | ⟦S1325⟧ ordered list with real headings; reduced motion shows the full line |
| Reviews V3 | ⟦S1363⟧ bounded canvas field with a quiet zone under the card | ⟦S1338⟧ splash rings (decay + radius); spring settle; idle splash | the pointer listener sits on the section, not per mark; off under reduced motion (static field) |

**Per element**
| Element | Skills |
|---|---|
| Oversized index tabs (Services V2) | ⟦S1375⟧ ⟦S1246⟧ ⟦S0462⟧ |
| Photo mask wipe and sheen | ⟦S1375⟧ ⟦S0451⟧ |
| Leaning cover (3D feel) | ⟦S0205⟧ ⟦S1330⟧ |
| Outlined chapter number | ⟦S1352⟧ |
| Morphing line | ⟦S0086⟧ ⟦S0407⟧ |
| Track stops (Services V3) | ⟦S1246⟧ ⟦S1388⟧ |
| Film-strip spine | ⟦S1325⟧ |
| Credential rail | ⟦S1352⟧ ⟦S0076⟧ |
| Feather field | ⟦S1363⟧ ⟦S1338⟧ |
| Locked chips | ⟦S0251⟧ |
| Titles | ⟦S0451⟧ ⟦S1329⟧ |
| Call / Book buttons (shared 3D-feel plates) | ⟦S1388⟧ ⟦S0405⟧ |

## Defects
**Fixed in this round:**
1. **Services V1 (pre-existing):** its board rows were 36 px tall on phones; they are now 44 px.
2. **Services V3:** the replacement drawing put shingle courses inside a gable end; it is redrawn as a hip roof face. The magnifier circle was rebuilt from two arcs so its centre is exact.
3. **Reviews V3:**
   - with ring placement, some marks hid behind the card's corners or ran off a phone screen, which would break "90 feathers". Placement is now a grid that avoids the card, and a test proves 91 marks are visible at three widths;
   - the heading's aria-label didn't match the visible text; the rating is now a visually hidden sentence.
4. **Services V2:** on phones the active chapter could sit off-screen in the chip row; it now scrolls into view.

**Open, honestly named:**
1. Owl's service photos are 560 px. The higher-resolution request stands.
2. The storm and siding photos (`svc-storm`, `svc-siding`) carry no Owl branding and are not captioned as Owl jobs. If they are stock, the owner may prefer Owl's own.
