# PizzaBurg · HRM Practices

An interactive presentation of Group NEXIX's report on the human resource
practices of PizzaBurg, for BUS-2204 at Bangladesh University.

Thirteen slides, in the order the group presents them. Behind the text, one
pizza is made across the whole deck: flour and a resting dough ball on slide
one, stretched and sauced through the middle, into the oven as the discipline
section starts, and a slice lifting on the thank-you. Every slide moves the
camera, so the kitchen changes under the type without anyone narrating it.

## Presenting it

Open `index.html`. It is one self-contained file — fonts, libraries,
photographs and both video clips are inlined — so it runs from a USB stick on
a classroom laptop with no internet at all.

| Key | |
|---|---|
| `→` `↓` `Space` `Page Down` | Next slide |
| `←` `↑` `Page Up` | Previous slide |
| `1`–`6` | Jump to a presenter's first slide |
| `O` | Every slide at once |
| `N` | Speaker notes for the current slide |
| `F` | Fullscreen — do this before you start |
| `C` | Projector mode, for a washed-out room |
| `B` or `.` | Blank the screen |

A presentation clicker sends Page Up / Page Down, so both are wired. The
address bar tracks the slide, so a reload comes back to where you were.

The deck is built for a laptop or a projector. A narrow window still reads,
but it is not a phone layout.

## Running order

| Slides | Presenter | |
|---|---|---|
| 1–2 | Raiyan Ahmed Ratul | Cover · Introduction and objectives |
| 3–4 | Aditya Tripura | Methodology · Workforce planning |
| 5–6 | Liya Akter | Recruitment and selection · Turnover and notice |
| 7–8 | Shuvo Chandra Roy | Employee welfare · Performance and training |
| 9–10 | Asiful Islam Sourov | Discipline and termination · Major findings |
| 11–13 | Fabliha Mubarrat Kabir | Recommendations · Conclusion · Thank you |

## Editing it

Sources live in `src/`; `index.html` and `dist/artifact.html` are built, not
edited by hand.

    python3 tools/build.py

| File | |
|---|---|
| `src/data.js` | Every slide's copy, and which step of the pizza it sits on |
| `src/world.js` | The 3D bench: the pizza, the oven, the room, the camera |
| `src/visuals.js` | The aside panels — outlets, turnover, welfare, the loop, the ledger, the recommendations, the team |
| `src/deck.js` | Navigation, the reveal choreography, the backdrop for each slide |
| `src/styles.css`, `src/visuals.css` | Layout and the panel vocabulary |
| `src/body.html` | The page shell: top bar, rail, panels, entry card |

Photographs and clips are the group's own, taken at PizzaBurg head office on
26 August 2026, plus press images of the brand. They sit in `assets/img/pb/`
and `assets/media/`; the build inlines everything it finds there.

`tools/shoot.js` screenshots any list of slides in a headless browser, which
is how the layout was checked:

    node tools/shoot.js 0 4 8 12
