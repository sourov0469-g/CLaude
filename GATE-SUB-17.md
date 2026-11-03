# GATE: Subpages, Round S17 — Service Area 1 (Opener) and 2 (Towns)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. Plan for all eight pages: GATE-SUB-01.
**Defaults:** the homepage is unchanged. Version A is the default on each new section.
**How to view:** `?page=area&sa1=a|b|c` and `?page=area&sa2=a|b|c`. The page title becomes "Service Area | Austin Pro…".

**Sources:**
- **Town names and tallies:** the firm's own per-town documented-project counts, as shown in On your street D on the homepage.
- **Locked wording:** the 886 lock, verbatim.
- **Photos:** two of the firm's job photos (Block House Creek, Leander; Ashford Park, Buda), with their records.

**Never shown:**
- a map or dots;
- a count of towns;
- the town tallies added up. They come from the finder and total 883, which conflicts with the locked 886. I checked that "883" appears nowhere on the page.

**Wording:** the homepage never says "Central Texas", so these sections say "Austin, and the towns around it".

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| sa1 A "Town names" | Dropbox Brand (type as the map) | S1500: 24 town names set in one paragraph, size ∝ √ of tally; the page says how the size is set |
| sa1 B "Where the jobs are" | Cowboy (real houses) | S1501: two firm photos from two towns |
| sa1 C "From one door" | Scout Motors (the plain start point) | The office address as a starting block; a lime rail of the 12 towns with the most documented work, numbered |
| sa2 A "The town directory" | Scout Motors (a directory board) | Dark lobby-board list, A–Z with dotted leaders to each tally |
| sa2 B "Six big, the rest small" | Dropbox Brand (hierarchy as the design) | S1500: six large figures; every other town inline |
| sa2 C "Sort it yourself" | Cash App Brand Guidelines (one tidy table) | S0054: sortable header buttons with `aria-sort`, a filter box, a live count; an honest "not in our records yet" line |

## Build log

**sa1 Opener**
- A: a stepped wall of town names (Austin largest).
- B: two photos.
- C: the door block, then a numbered town rail.
- How they differ: type, photos, a route.

**sa2 Towns**
- A: a directory board in three columns.
- B: Austin 541 on green, then Round Rock 110, Cedar Park 35, Leander 28, Pflugerville 28 and Georgetown 21; the rest inline.
- C: a sortable, filterable table, sticky head.
- How they differ: board, hierarchy, tool.

## Self-tests

Every version at 1440, 768 and 390 shows 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| sa1 A | Title "Service Area \| Austin Pro…"; 24 towns, Austin first |
| sa2 B | Top six match the homepage tallies |
| sa2 C | A–Z sort works; "round" → "1 town listed."; "zzz" → "No town by that name in our records yet. Call (512) 550-0000 to ask." |
| Locks | "883" absent; 886 lock present |

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | sa1 | type, photo and route openers |
| Section | sa2 | board, hierarchy and table |
| Element | sa2 C | `aria-sort`, filter |
| Data | town tallies | real tallies only, never totalled |

**Critique pass:**
- **Honesty:** the brief's data note is honoured; no generated map.
- **Palette (S1496):** brand colours, plus a dark board ground.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| sa1 A Town names | 8.4 | 8.0 | 8.2 | 8.4 | **8.26** | PASS |
| sa1 B Where the jobs are | 8.2 | 8.4 | 7.2 | 8.4 | **8.12** | PASS |
| sa1 C From one door | 8.2 | 8.4 | 7.6 | 8.4 | **8.20** | PASS |
| sa2 A The town directory | 8.2 | 8.2 | 7.8 | 8.8 | **8.20** | PASS |
| sa2 B Six big, the rest small | 8.2 | 8.4 | 7.4 | 8.8 | **8.20** | PASS |
| sa2 C Sort it yourself | 8.0 | 8.8 | 7.4 | 8.8 | **8.24** | PASS |

**Vetoes: none.** **Next: Round S18, Service Area 3 (Neighbourhoods) and 4 (From the office).**
