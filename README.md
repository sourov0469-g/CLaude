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

## The CSR deck

A second deck lives in the same repo: the same six students' review of
PizzaBurg's corporate social responsibility, for the Business Ethics course.
Sixteen slides — what the company already does for its community, its people
and the environment, that record held against a CSR framework, then four new
initiatives the group proposes and an argument for which one to start with.

Open `csr.html`. It is built the same way as `index.html` and takes the same
keys, and it is equally self-contained.

Behind the text stands a brass and oak balance scale on the counter. One pan
carries plain cost weights, the other starts nearly empty. Each slide sets one
more weight on the good pan — a lantern for the Ramadan iftars, a gift box for
Christmas, an apron, a leaf, then one token for each proposed idea — and the
beam tips a little further that way every time, the angle worked out from what
is actually on the pans rather than posed by hand. An empty hook hangs over
the gap slide until the first new idea fills it, and on the last two slides
the camera pulls back far enough to read the whole scale at once.

### Running order

| Slides | Presenter | |
|---|---|---|
| 1–3 | Raiyan Ahmed Ratul | Cover · Our team · Why we are studying PizzaBurg's CSR |
| 4–5 | Aditya Tripura | What CSR means here · Iftar donations at Ramadan |
| 6–8 | Liya Akter | The Christmas giveaway · A supportive workplace · Eco-friendly packaging |
| 9–10 | Shuvo Chandra Roy | Where the CSR can go further · Buy 1, Give 1 |
| 11–12 | Asiful Islam Sourov | Green PizzaBurg · Student support |
| 13–16 | Fabliha Mubarrat Kabir | Food rescue · Impact against effort · Where to start · Conclusion and thank you |

## Editing it

Sources live in `src/`; `index.html`, `csr.html` and the two files in `dist/`
are built, not edited by hand.

    python3 tools/build.py          both decks
    python3 tools/build.py csr      one of them

| File | |
|---|---|
| `src/data.js` | Every HRM slide's copy, and which step of the pizza it sits on |
| `src/world.js` | The 3D bench: the pizza, the oven, the room, the camera |
| `src/visuals.js` | The aside panels — outlets, turnover, welfare, the loop, the ledger, the recommendations, the team |
| `src/body.html` | The HRM page shell: top bar, rail, panels, entry card |
| `src/csr/data.js` | Every CSR slide's copy, and which weight the scale has taken on |
| `src/csr/world.js` | The balance scale: the beam, the two pans, the weights, the camera |
| `src/csr/enrich.js` | The room around the scale — the light, the air, the things on the shelves |
| `src/csr/visuals.js`, `src/csr/visuals.css` | The CSR panels — the pyramid, the before-and-after compare, the impact-against-effort matrix |
| `src/csr/body.html` | The CSR page shell |
| `src/deck.js` | Navigation, the reveal choreography, the backdrop for each slide — both decks |
| `src/styles.css`, `src/visuals.css` | Layout and the panel vocabulary — both decks |

Photographs and clips are the group's own, taken at PizzaBurg head office on
26 August 2026, plus press images of the brand. They sit in `assets/img/pb/`
and `assets/media/`; the build inlines everything it finds there.

`tools/shoot.js` screenshots any list of slides in a headless browser, which
is how the layout was checked. Name the deck first; it defaults to `hrm`:

    node tools/shoot.js 0 4 8 12
    node tools/shoot.js csr 0 4 8 15
