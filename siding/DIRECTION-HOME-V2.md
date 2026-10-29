# Homepage v2: direction contract (dev-only, never shipped in the page)

Why v2: the user rejected v1 ("too much text, feels like a document, not fun, animations used poorly"). Everything below is decided from the Skill Pack (SKILL-PACK.md, notes per batch) with the user's brief on top: image-led, little copy, rich purposeful motion, nine sections each in three switchable versions, one self-contained HTML file.

Design read (S0650): homepage overhaul for Austin homeowners, Persuade mode, image-led with a playful-industrial interaction layer, native HTML + GSAP. Dials: variance 8, motion 7, density 3, with the phone override (single column under 768 px).

THESIS (S1320, S0006, S0381): On this page, the window in Austin Pro's logo becomes the lens: you look through it at real Austin houses, before and after, with the real price on the glass. Category default it refuses: hero over three service cards, testimonial carousel, form. Competitor test: another contractor's logo is not a 2x2 window and does not publish per-job prices, so the idea does not transfer.

OWN-WORLD: warm stone ground #F3F2EE with one ink #161616 and one deep field #141414 for the night chapters; brand red #D42125 only on the action and at most one active state per screen (white on red 5.19:1). Mona Sans only: heavy weights and the width axis carry display; one numeral voice (width 75, tabular). Photos are the firm's own, square-cornered, one treatment (untouched), text on photos only with a 45-55% scrim. Signature motif: the 2x2 window: panes that open to reveal a photo, used for photo entrances and the hero.

STORY (arc S1328/S0204): hook (hero) > proof (numbers) > what they do (services) > proof you can touch (before/after with prices, climax 1) > the live thing (repaint a real house, the peak, S1452) > near you (map) > people (reviews) > the objection (money) > action (book, the end). Close echoes the hero promise: your price, in writing.

FIRST VIEWPORT: H1 "Siding and windows, priced in public" (2 lines at every width), one 12-word line, one red pill "Book free inspection" and a text link "See the work". Each hero version puts one real job at life scale: v1 a full-bleed Rob Roy photo that wipes between before and after, v2 the logo window opening into a photo, v3 a WebGL brush that paints the after over the before. Headline, line and CTA visible at 1280x800 and 375x812 before any animation ends.

FORM: page grammar = chaptered editorial with full-bleed photo chapters (S1502). Section heads 2-5 words, no eyebrows, no numbering, no em dashes, about 80 words per screen and under 450 visible words for any version mix (S0471). Each section's three versions differ on one named axis (S0082, S1474) and swap instantly in place; the new version then plays its own entrance once.

FINISH: tokens in :root only; one radius rule (photos 0, controls pill); press scale 0.96; ease-out cubic-bezier(0.22,1,0.36,1) for UI, expo (0.16,1,0.3,1) for reveals, in-out (0.76,0,0.24,1) for wipes, linear for scroll-linked; UI under 300 ms, reveals 700-900 ms, picture openings 1.1-1.2 s; Lenis desktop only (lerp 0.1, off on touch, off under reduced motion, off by the on-page motion switch); no pins on phones; reduced motion shows finished states with 150 ms fades.

## Sections and versions (axis, then the three)

| Section | Axis | v1 | v2 | v3 |
|---|---|---|---|---|
| Hero | what leads | Full-bleed: Rob Roy photo, auto before/after wipe 15-85% | Window: type-led, the logo's 2x2 window opens into a job photo, scroll grows it (desktop) | Paint it: WebGL brush reveals after over before (Circle C North), tap on phones |
| Proof | emphasis | Counter index: four real figures at four scales, digits roll once | Photo wall: 32 job photos tile in around the 886 count | Statement: one sentence lit word by word, photo pills inline |
| Services | interaction | Index: 11 trades as big rows, a photo follows the cursor (thumbnails on phones) | Slices: five photo slices, one opens at a time | Budget: set a budget, trades whose middle half fits light up |
| Work | interaction | Slider: full-width drag compare, filmstrip of six registered pairs | Scroll: desktop pin where scroll wipes each pair; phone cards | Spotlight: a lens shows the before under the cursor; phone "Show before" |
| Colour | interaction | Dock: tap a swatch, paint sweeps across the wall | Drag paint: drag a chip onto siding, gable or trim | Split: drag the line between the real navy and your colour |
| Near you | entry point | Map: pins drop by date, then finder | Towns: big town list with counts drives the map | Search: type your area first, nearest jobs appear |
| Reviews | density | Stream: two-row marquee, pause button | One: one big quote at a time | Names: pick a crew name, the wall filters |
| Money | entry | Amount: giant monthly figure, slider, three terms | Budget: start from a monthly budget, see the project size | Receipt: the firm's discount stack prints line by line |
| Book | commitment | Call: red field, giant phone number and button | Form: photo plus three-step form | Chat: one question at a time in big type |

## Version switch and picks
Per section: a quiet tablist "1 2 3" with the active version's name (S1246 tabs, roving tabindex, arrows, Home/End, 44 px). Keys 1/2/3 act on the section in view, never inside form fields or with modifiers. Inactive versions live in `<template>`s (no duplicate ids, one h1, nothing focusable). Picks persist in `?v=` (replaceState, try/catch) and localStorage (try/catch). A "Your picks" panel lists all nine with switches, a motion on/off switch, copy-my-picks, reset.

## Assets (provenance: the firm's own, austinprosiding.com and its Sanity CDN)
Hero: Rob Roy registered pair 1440; p0 (Maple Run) 1400; Circle C North pair 1280. Proof: 32 photo thumbnails 320. Services: 9 trade photos 800. Work: six registered pairs 1000 (Rob Roy, Milwood, Maple Run siding, Maple Run windows, Ridgewood, Anderson Mill). Colour: Rob Roy studio base + photo-traced masks 1400. Book: Village at Western Oaks after 1000. No generated, stock or drawn imagery.

## Skills this contract applies
S1320, S1303, S0095, S0006, S0650, S0381, S0471, S0001, S0626, S0627, S1358, S1375, S0082, S1474, S0067, S0736, S0652, S0059, S1321, S0403, S0186, S0451, S1324, S1326, S0576, S0340, S0385, S0400, S1209, S1246, S0070, S0071, S0074.
