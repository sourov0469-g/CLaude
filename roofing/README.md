# Ridgewell Roofing — HTML template

A pixel-faithful HTML/CSS build of the `FINALE ROOFING` Figma file
(`FINAL HOMEPAGE / DESKTOP 1440`), built as a re-brandable template for
cold-email previews.

```
roofing/
├── ridgewell-roofing.html  ← THE DELIVERABLE: one file, everything embedded
├── index.html              ← same site, with assets as separate files (source)
└── assets/
    ├── img/                ← 15 photos (jpg/webp)
    └── fonts/              ← Playfair Display, Source Sans 3, Inter (woff2)
```

**`ridgewell-roofing.html` is the one you want.** Photos, fonts and SVG
details are all embedded in the file, so it is 1.4 MB and needs nothing
beside it — double-click it anywhere, on any machine, online or off, and the
whole site loads. It was verified with the network hard-blocked: zero external
requests, zero console errors, all 15 images and 6 font faces resolved.

`index.html` is the same site with assets as separate files. Edit that one if
you prefer working with loose images, then regenerate the standalone.

## Fidelity

Every section was verified against the Figma node coordinates with a headless
browser. All 13 sections match their Figma height exactly, and every measured
element lands within 3px of its Figma position.

| Figma frame | Section | Height |
|---|---|---|
| 01 — HERO R04 | `header.hero` | 1080 |
| 02 — GOOGLE REVIEWS | `.reviews` | 780 |
| 03 — SERVICES A | `.services` | 1060 |
| 04 — PROJECTS C | `.projects` | 850 |
| 05 — TRIAGE D | `.triage` | 860 |
| 06 — SURVEY G | `.survey` | 750 |
| 07 — CASE STUDY C | `.case` | 740 |
| 08 — PROCESS A | `.process` | 630 |
| 09 — ABOUT C | `.about` | 720 |
| 10 — REASSURANCE B | `.reassure` | 400 |
| 11 — FAQ H | `.faq` | 660 |
| 12 — CONTACT C | `.contact` | 880 |
| 13 — FOOTER | `.footer` | 430 |

Total page height 9843px vs the Figma's 9840px.

### Layout behaviour

Every **element** — images, cards, text, the form — stays inside a 1440px
column centred in the viewport. Only **section backgrounds** bleed to the
screen edges, so on a 1920 monitor you get the exact Figma composition
centred, framed by that section's own colour, with no lopsided dead space.

### Breakpoints

The responsive layer implements the Figma's own frames rather than improvising:

| Range | Frame | Side padding |
|---|---|---|
| >= 1200 | DESKTOP 1440 | 64px |
| 1024-1199 | TABLET 1024 | 48px |
| 768-1023 | TABLET 768 | 36px |
| < 768 | MOBILE 360 | 22px |

Section heights land within ~20px of the corresponding Figma frame at every
breakpoint. Structural differences the Figma specifies per frame are honoured:
kicker marks and the hero link arrow drop below 768; the reviews caption panel
collapses to a photo band on mobile; the process rail becomes two columns on
tablet and a number-beside-title list on mobile; label/value rows switch
between side-by-side and stacked; the contact intro stays on the photo at
every size.

Two deliberate departures from the QA frames, both for usability: the reviews
strip stays a swipeable carousel at tablet and mobile (the frames draw 2 then
1 static card, which would drop reviews), and its section takes its natural
height rather than padding out empty space.

## Re-branding for a new prospect

### 1. Colours — one block, top of the file

Everything derives from the `:root` custom properties. For most prospects you
only need the four copper tokens:

```css
--copper:        #985632;   /* kickers, rules, small accents        */
--copper-strong: #A65F36;   /* filled buttons                       */
--copper-light:  #D5A07B;   /* the accent on dark sections          */
--copper-warm:   #A55A34;   /* reviews section accent               */
```

Swap those four for the prospect's brand colour (use a slightly darker shade
for `--copper` and a lighter tint for `--copper-light`) and the whole site
re-skins. `--ink`, `--muted`, `--dark` and the `--warm-*` surfaces are the
neutral palette; leave them unless the brand is genuinely not warm-neutral.

All the SVG details (kicker marks, ridges, roofline dividers, the logo) are
inline SVG using `currentColor`, so they re-skin from these tokens too — there
is nothing to edit by hand.

### 2. Name

"Ridgewell Roofing" appears in 4 places: `<title>`, the nav `.brand span`,
the footer `h2`, and the footer copyright. Find-and-replace is safe.

### 3. Copy

Section order in the body matches the table above and each is preceded by a
banner comment (`01 · HERO`, `02 · GOOGLE REVIEWS`, …). Text is plain markup —
no templating — so it can be edited directly.

Headline line breaks are explicit `<br>` tags so two-line headings break where
the design intends. Keep replacement headlines to a similar length, or remove
the `<br>`.

### 4. Images

In `ridgewell-roofing.html` each photo is a `data:` URI on its `<img>`. To
swap one, replace everything between `src="` and the closing quote with your
own base64 data URI, or edit `index.html` (which uses ordinary file paths) and
rebuild. Slot sizes:

| File | Slot | Size |
|---|---|---|
| `HERO___LOCKED_APPROVED_MAIN_IMAGE.webp` | hero band | 1440×552 |
| `HERO___LOCKED_APPROVED_SECONDARY_DETAIL.jpg` | hero inset | 196×142 |
| `CONTEXT_PROPERTY_IMAGE___…stone-country-house.jpg` | reviews panel | 430×520 |
| `Rectangle.jpg` | roof repairs | 570×441 |
| `Rectangle_2/3/4.jpg` | re-roofing / leadwork / chimneys | 300×180 / 328×180 / 410×180 |
| `Rectangle_5/6.jpg` | projects main / inset | 700×530 / 260×190 |
| `IMAGE___stock-49.jpg` | triage | 590×860 |
| `Project_image.jpg` | case study | 600×740 |
| `IMAGE___stock-37.jpg` | about, middle column | 390×330 |
| `Material_texture___surface-14.jpg` | reassurance top band | 1440×126 |
| `IMAGE___photo-07.webp` | contact | 650×880 |

Two images are WebP rather than JPEG because they carry real transparency —
the hero band has the roofline notch cut out of it, and the contact photo has
a soft alpha ramp. Keep transparency if you replace them, or the cut-out will
fill in solid.

### 5. Reviews

The Google review cards in section 02 are static demo content. Replace the
four `.rcard` blocks, the `4.9` score, and the `128 Google reviews` count with
the prospect's real figures, or drop in a review-widget embed in place of
`.feed`.

## Rebuilding the standalone

After editing `index.html`, regenerate the single file with
`python3 build_standalone.py` (needs Pillow only if you also re-optimise
images).

## Notes

- The enquiry form posts nowhere (`action="#"`). Point it at a form handler
  before sending a live link.
- The review carousel is the only JavaScript; the page is fully readable with
  JS disabled.
- Text covers Latin-1 plus curly quotes and dashes. Characters outside that
  (Central/Eastern European accents) fall back to a system font.
