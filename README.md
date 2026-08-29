# PizzaBurg · HRM Practices — an immersive presentation

An interactive, slide-by-slide 3D presentation of Group NEXIX's report on the
human resource practices of **PizzaBurg**, for BUS-2204 at Bangladesh University.

Everything the deck says traces back to the group's own report, which rests on a
face-to-face interview with **Mr. Ranjan Datta**, General Manager of Human
Resource at PizzaBurg, on 26 August 2026, checked against the Bangladesh Labour
Act 2006 and the Labour Rules 2015.

## Presenting it

Open `index.html`. It is a single self-contained file — fonts, libraries,
photographs and the interview clip are all inlined, so it works from a USB
stick with no internet.

| Key | |
|---|---|
| `→` `↓` `Space` `Page Down` | next slide |
| `←` `↑` `Page Up` | previous slide |
| `1`–`6` | jump to a presenter's first slide |
| `O` | overview of all slides |
| `N` | speaker notes |
| `F` | fullscreen — do this before you start |
| `C` | projector mode (higher contrast) |
| `B` or `.` | blank the screen |
| `?` | keyboard help |

A presentation clicker sends Page Up / Page Down, so it works out of the box.
The address bar tracks the current slide, so a reload returns you to it.

## Running order

| Slides | Presenter | Covers |
|---|---|---|
| 1–5 | Raiyan Ahmed Ratul | cover, why this topic, objectives, the company, scope |
| 6–10 | Aditya Tripura | methodology, verification, workforce planning, the trade-off |
| 11–15 | Liya Akter | recruitment, the work sample, the leak, turnover, notice |
| 16–20 | Shuvo Chandra Roy | welfare, its ceiling, monthly review, the open questions, training |
| 21–25 | Asiful Islam Sourov | discipline, Section 24, the harassment gap, the scorecard, findings |
| 26–32 | Fabliha Mubarrat Kabir | strengths and weaknesses, recommendations, priority, conclusion, references, thanks |

## Building

    python3 tools/prep_images.py     # field photos -> web-sized WebP
    python3 tools/build.py           # src/ + assets/ -> index.html
    node tools/shoot.js 0 5 12       # screenshot slides for review

`src/` holds the sources: `data.js` (all copy and the report's data),
`world.js` (the Three.js world), `visuals.js` (the diagram vocabulary),
`deck.js` (navigation and choreography), plus the two stylesheets.

## Images

Field photography is the group's own, taken at PizzaBurg on 26 August 2026.
The interview clip is an 18-second cut, stabilised, from the group's recording.
Everything else is credited in `assets/img/CREDITS.md` — freely licensed stock,
plus a small number of PizzaBurg press and review photographs used for
non-commercial academic commentary.

The General Manager's business card is shown cropped to his name and title; his
personal phone number and email are deliberately not published.
