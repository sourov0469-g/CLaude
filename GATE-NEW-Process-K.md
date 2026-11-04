# GATE-NEW — Process K, "Handed along"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 1, section 6 (Hero, Services, Visualiser, Windows and Reviews K accepted by Muse).

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Process K, "Handed along"** (`?process=k`) |
| Primary reference (annex v3, one) | **Quiet Cubes** (the service as a staffed design service: the people behind each stage). No Process version has used it: C used Lusion and Graza; D and H Dropbox; E Graza; F Erie (note); G Cowboy; I Cash App; J Apple. |
| Signature creative move | **The staffed relay.** The four real steps sit as stations on one rail, and each station is staffed by the people homeowners name at that step in their published reviews: Paul Hale at the inspection; Jake, Tracy and Taylor on the bid and quotes; Kevin and Paul Schantz on scheduling and the crew; Garrett at the punch-out. A lime baton is handed along the rail from station to station. At each stop the firm's own line for the step sits beside the homeowners' verbatim words about that person, with the name marked. The process stops being a diagram and becomes a sequence of people you will meet. |
| Style family | Service-desk relay: big names in type on a single rail, a travelling baton, quote panels; white ground |
| Content | Steps and lines from the homepage process (`Proc.CH`): Free inspection · Detailed proposal · Expert install · Final check. Quotes are exact substrings of `__REV` (build-checked): 9 excerpts naming Paul Hale ×2, Jake, Tracy, Taylor, Kevin, Paul Schantz and Garrett ×2 ("Garret" as written once). Names are exactly as homeowners wrote them. No job titles are claimed, and the page says the step placement is where each review places that person. No photos and no avatars (a photo of each person isn't available; the gate asks for one). |
| How it differs from every existing Process version | A stacks chapters. B pins a wall. C drops a plumb line. D shows four columns. E turns a dial. F asks questions. G stamps a card. H writes one paragraph. I splits your part and ours. J gives four numbers. None tells the process through the people who carry it, and none hands a baton along a rail of named stations. |
| Why it is better | Homeowners hire people, not diagrams. K answers "who will I actually deal with?" at each step, in other homeowners' own words. The current best (C, "The plumb line") shows the order; K shows the handoffs. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the rail of names); ⟦S0220⟧ verbatim and build-checked quotes, names as written, no titles claimed |
| Stations (4) | ⟦S0054⟧ the tabs pattern (`role=tablist` / `tab` / `tabpanel`, `aria-selected`, roving `tabindex`, ←/→/Home/End with `preventDefault`); ⟦S1427⟧ one treatment; names in display type |
| Baton | ⟦S1436⟧ eases to the chosen station with a small overshoot (0.7 s); ⟦S1424⟧ continuity: one rail the eye rides; ⟦S1315⟧ still at rest |
| Step panel | The firm's line per step (`Proc.CH`); ⟦S1426⟧ the people's quotes sit directly beside the step they belong to |
| Quote cards | ⟦S0220⟧ "…" where a fragment is cut; the staff name marked in lime inside the quote; attribution "— reviewer name, Google review" |
| "Hand it on" button | ⟦S1440⟧ instant feedback; it moves the baton to the next station; on the last station it becomes Book |
| Live region | The tab panel is labelled by its tab; the step change is announced through tab semantics |
| CTA | ⟦S1435⟧ one filled Book button |
| Phone | The rail scrolls sideways with snap; the names stack under each station number; the panel sits under the rail |
| Reduced motion | The baton jumps; no overshoot |
| Background law | White ground; type and one lime token |

---

## Build log

**How to view:** `?process=k` (switcher: Process, **K "Handed along"**).

**Files:** `src/sec/proc6.js` and `proc6.css` (`Proc6.K` is prerendered at build, so the quotes are checked at build; `Proc6.wire`). Text only; the file grows by 13 KB (19.10 MB).

**The rail:**
- Four tab stations (01 Free inspection · 02 Detailed proposal · 03 Expert install · 04 Final check), each carrying its names in display type (26–46 px):
  - 01: Paul Hale
  - 02: Jake, Tracy, Taylor
  - 03: Kevin, Paul Schantz
  - 04: Garrett
- Unchosen names are pale, passed ones mid-grey, the chosen one ink.
- A deep-green rail runs under all four, with a dot per station. The lime baton eases to the chosen dot (0.7 s, small overshoot).

**The panel:**
- The firm's own line for the step (`Proc.CH`; step 2 trimmed to its first sentence).
- A "Hand it on: [next step]" button, which reads "Start over" on step 4.
- 2–3 verbatim quote cards with the person's name marked in lime and "Reviewer · Google review".

**Quotes (9, all exact substrings of `__REV`):**

| Person | Excerpt | Review |
|---|---|---|
| Paul Hale | "…came out and explained the process, the windows and the costs…" | LOIS RICHWINE |
| Paul Hale | "…arrived and was able to get an in-person inspection of the roof…" | Michael Spake |
| Jake | "…handled our initial bid and was incredibly thorough…" | Joe Liu |
| Tracy | "…provided us with a great, no pressure estimate…" | David McPherson |
| Taylor | "Special shout out to Taylor. This was a big project and he was so patient with sending over multiple quotes…" | Katie Littleton |
| Kevin | "…made the scheduling side of things a breeze…" | Joe Liu |
| Paul Schantz | "Paul Schantz's sent a crew…" | LOIS RICHWINE |
| Garret | "…did a good job on the punch out…" (spelled as the reviewer wrote it) | Lucas Wang |
| Garrett | "…was extremely thorough with punch out…" | Lala Matthews |
| Garrett | "…who finished up and also swept the pollen off my deck…" | Katie Littleton |

**Footer:** "One visit covers every trade on the house. Mon–Fri 8–8, Sat 8–6, Sun 12–5." (homepage line and locked hours) and Book.

**Deviation from the plan:** the plan said the last button would become Book. It is "Start over" instead, because Book already sits directly below it in the footer and two Book buttons in one view would break ⟦S1435⟧.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-process-k-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`
- step 2: `-1440-step2`
- step 4: `-1440-step4`
- phone, step 3: `-390-step3`
- contact sheet: `new-process-k.jpg`

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Verbatim | All 9 excerpts are exact substrings (the build throws otherwise); names exactly as written, including "Garret" once |
| Rail geometry | Track, all four dots and the baton centres at the same y (533 px); the baton sits on the chosen dot to the pixel (Δ 0) at every step, desktop and phone |
| Hand on | Step 1 → 2: panel "Step 02 · Detailed proposal", marks Jake, Tracy and Taylor, `aria-labelledby` follows (`prK-t1`); mid-move the baton was caught between stations |
| Keys | → goes to step 3 with focus on its tab; End goes to step 4 (Garret, Garrett, Garrett), where the button reads "Start over" and returns to step 1. Clicking station 4 works too; the 3 earlier names turn "past" |
| Phone | After two hand-ons, step 3's station is scrolled into view and the baton is on its dot; no overflow |
| Reduced motion | The baton moves with no transition |
| Existing versions | 170 templates byte-identical to the previous commit; the homepage `<main>` identical; the only addition is `process:k`. Defaults unchanged (process = a) |
| Locks | Hours verbatim; no titles, stars or figures added |

## Defects found and fixed

1. **Dots off the rail:** the dots sat at different heights because the stations held one to three names. Every name block now reserves three lines, and the dot is pinned to the foot, so all dots, the rail and the baton line up (measured).
2. **Split quote:** Taylor's fragment and its continuation were two cards. They are now one exact excerpt.
3. **Footer line:** my first footer paraphrased the homepage ("Every trade on the house, one visit to start"). It is now the homepage's exact "One visit covers every trade on the house."

## Remaining defects, named honestly

- **No photos of the people:** the names carry the design without faces. The skill pack wants real photographs for people, and no staff photographs are available. **Asset request:** a photograph of each of Paul Hale, Jake, Tracy, Taylor, Kevin, Paul Schantz and Garrett (released for web use), to sit at their stations.
- **Placement, not roles:** a person's step is where a review mentions them, not a job title. Kevin appears in other reviews at other points, and Garrett also helped with decisions in one review. The page says "at the step where they met them" and claims no titles.
- **Garret spelling:** shown as written, which may read as a typo.
- **Testing:** done in Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | process K | ⟦S1434⟧ the rail of names dominates; ⟦S0220⟧ build-checked verbatim, names as written, no titles |
| Element | 4 stations | ⟦S0054⟧ the tabs pattern (tablist, tab, tabpanel, `aria-selected`, roving `tabindex`, ←/→/Home/End with `preventDefault`, the panel labelled by its tab); ⟦S1427⟧ one treatment; pale / past / current states |
| Element | rail and baton | ⟦S1424⟧ one continuous rail; ⟦S1436⟧ the baton eases with overshoot, 0.7 s, re-placed on resize and scroll; ⟦S1315⟧ still at rest |
| Element | panel | ⟦S1426⟧ the step line beside its people; the quotes rise in, staggered 70 ms |
| Element | quote cards | ⟦S0220⟧ "…" on cut fragments; lime-marked names; reviewer and source |
| Element | Hand it on | ⟦S1440⟧ a 0.97 press; it names the next step; focus moves to the new tab |
| Element | Book | ⟦S1435⟧ the only filled button |
| Site | phone, reduced motion, background law | The rail scrolls with snap and the chosen station centres; no motion; white ground |

## Reference transfers and non-transfers (Quiet Cubes)

**Transferred:**
- the service shown as staffed: people at each stage, not an abstract pipeline;
- one clear structure with the human beside the step.

**Not transferred:**
- Quiet Cubes' 3D product configurator (it belongs to the Visualiser, and was unverified in the audit);
- its palette and type.

## Comparison with the section's previous best (Process C, "The plumb line", 8.22)

C drops one line through the four steps as you read: a beautiful order, but anonymous. K hands a baton through the same four steps, and at each one shows who homeowners say they dealt with, in their words.
- **C is stronger on:** reading flow.
- **K is stronger on:** the trust question, "who will I deal with?"

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.2** | Names as large type on a single rail, a lime baton, calm panels. Minus: without photos the people are type only |
| Usability (30) | **8.6** | A correct tabs pattern, keys, a Hand-on button that names the next step, the phone rail scrolling to the chosen station, all tested |
| Creativity (20) | **8.4** | Telling the process through its people with a travelling baton is new to the site |
| Content (10) | **8.8** | 9 build-checked verbatim excerpts, the firm's own step lines, locked hours. Minus: placement inferred from reviews (stated) |
| **Weighted** | **8.42** | **PASS** (≥ 7.0; no category below 6.0) |

**Vetoes: none.**

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not build Try K until Muse accepts.
