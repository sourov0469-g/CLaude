# GATE: Subpages, Round S7 — Roofing 1 (Opener) and 2 (What a roof costs)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. Plan for all eight pages: GATE-SUB-01.
**Defaults:** the homepage is unchanged. Version A is the default on each new section.
**How to view:** `?page=roofing&rf1=a|b|c` and `?page=roofing&rf2=a|b|c`. The title becomes "Roofing | Austin Pro…".

**Sources.** Everything below is already published on the homepage:
- **Counts:** 241 shingle and metal roofs documented (shingle 210, metal 31), from a GAF Master Elite contractor.
- **Shingle prices:** 204 priced; median band $10k–$15k; middle half $5k–$20k.
- **Metal prices:** 29 priced; median band $20k–$25k. No metal middle half is published, and the table says so.
- **Basis:** materials and labour, before tax, 2022–2026.
- **Review lines:** Ken Weigand, verbatim and build-checked.
- **Photo:** the firm's own Fairview, Round Rock shingle job.

**Left out:** the FACTS-only roof labour warranties and the storm four-step, because they are not on the homepage.

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| rf1 A "Under the gable" | Dropbox Brand (one shape, big type) | S1500 (h1 inside a drawn gable; the four proof figures as shingle courses), S0220 |
| rf1 B "One day" | Cowboy (a homeowner's words first) | S1442, `PB.quote` (Ken Weigand: "They ripped off the old roof and put on a new one in one day." · "The site was clean when they left and the new roof looks great."), S0220 |
| rf1 C "The photo, gabled" | Scout Motors (the real roof, plainly) | S1501 (the firm's photo with a gable crop, capped at 52vh so the h1 stays in view), S0220 |
| rf2 A "Two roofs, two bands" | Cowboy (two drawn objects) | Drawn shingle and standing-seam panels, each with its median band and priced count; S0220 |
| rf2 B "Up the pitch" | Apple AirPods Pro (one measured scale) | Data visualisation (the $0–$30k scale laid up a roof slope; bands exact to scale); S0054 (checkbox overlays the metal band) |
| rf2 C "The plain table" | Cash App Brand Guidelines (the honest table) | Real `<table>` with a scoped header; "Not published" where no figure exists; S0220 |

## Build log

### rf1 Opener
- **A:** a green gable holding "Shingle and metal roofs." Below it, four charcoal shingle courses carry 241 · 210 · 31 · GAF.
- **B:** h1 and three figures on the left; a large green quote card with Ken Weigand's one-day line on the right, and his clean-site line under it.
- **C:** the Fairview photo with a gabled top edge, then a base row with the h1, four figures and the CTAs.
- **How they differ:** a type shape, a voice, a photo.

### rf2 What a roof costs
- **A:** two cards. The shingle card is a drawn shingle field with $10k–$15k. The metal card is a drawn seamed panel with $20k–$25k.
- **B:** a sloped scale. The shingle middle half is shaded, the median sits dark on top, and an optional dashed metal band can be laid over it.
- **C:** a four-row table (documented, priced, median band, middle half) for shingle and metal.
- **How they differ:** objects, a scale, a table.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 gives 0 errors, 0 overflow, 1 h1, 0 duplicate ids.

| Check | Result |
|---|---|
| rf1 B | Title "Roofing \| Austin Pro…"; both quotes attributed to Ken Weigand |
| rf1 C | Photo loads; caption "Fairview, Round Rock · Jun 2025 · Shingle Roofing" |
| rf2 B | Metal checkbox shows the dashed band |
| rf2 C | Rows read 210 / 31 · 204 / 29 · $10k–$15k / $20k–$25k · $5k–$20k / Not published |

**Defect fixed:** in rf1 C the photo filled the whole first viewport and pushed the h1 below the fold. The photo is now capped at 52vh.

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | rf1 | shape, voice and photo openers; S0220 |
| Section | rf2 | object, scale and table grammars; S0220 |
| Element | rf1 A courses | proof as shingle rows |
| Element | rf2 B slope | scale-exact bands, overlay toggle |
| Element | rf2 C | "Not published" honesty |

**Critique pass:**
- **Honesty:** no derived figure, and absent data is labelled as absent.
- **S1496:** brand colours plus roof charcoal.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| rf1 A Under the gable | 8.4 | 8.2 | 8.4 | 8.4 | **8.34** | PASS |
| rf1 B One day | 8.2 | 8.4 | 7.6 | 8.6 | **8.22** | PASS |
| rf1 C The photo, gabled | 8.0 | 8.2 | 7.4 | 8.6 | **8.02** | PASS |
| rf2 A Two roofs, two bands | 8.2 | 8.4 | 7.6 | 8.6 | **8.24** | PASS |
| rf2 B Up the pitch | 7.8 | 7.8 | 8.2 | 8.4 | **7.98** | PASS |
| rf2 C The plain table | 7.8 | 8.8 | 7.0 | 9.0 | **8.06** | PASS |

**Vetoes: none.**

**Next:** Round S8, Roofing 3 (Roofing jobs on record) and 4 (What homeowners said about roofs).
