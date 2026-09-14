# Ridgewell Roofing — HTML template

A pixel-faithful HTML/CSS build of the `FINALE ROOFING` Figma file
(`FINAL HOMEPAGE / DESKTOP 1440`), built as a re-brandable template for
cold-email previews.

```
roofing/
├── index.html              ← the whole site (one file: markup + CSS + 30-line JS)
└── assets/
    ├── img/                ← 15 photos + 19 SVG details, exported from Figma
    └── fonts/              ← Playfair Display, Source Sans 3, Inter (woff2)
```

Open `index.html` directly in a browser — no build step, no server, and **no
external requests**. Fonts are self-hosted, so the page renders identically
offline and on a prospect's machine.

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

Responsive breakpoints follow the other Figma frames — 1024, 768 and 360 —
with no horizontal overflow at any width.

## Re-branding for a new prospect

### 1. Colours — one block, top of `index.html`

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

Replace files in `assets/img/` keeping the same filenames, or repoint the
`src` attributes. Each slot's intended aspect ratio:

| File | Slot | Size |
|---|---|---|
| `HERO___LOCKED_APPROVED_MAIN_IMAGE.png` | hero band | 1440×552 |
| `HERO___LOCKED_APPROVED_SECONDARY_DETAIL.png` | hero inset | 196×142 |
| `CONTEXT_PROPERTY_IMAGE___…stone-country-house.png` | reviews panel | 430×520 |
| `Rectangle.png` | roof repairs | 570×441 |
| `Rectangle_2.png` / `_3` / `_4` | re-roofing / leadwork / chimneys | 300×180 / 328×180 / 410×180 |
| `Rectangle_5.png` / `_6` | projects main / inset | 700×530 / 260×190 |
| `IMAGE___stock-49.png` | triage | 590×860 |
| `Project_image.png` | case study | 600×740 |
| `IMAGE___stock-37.png` | about, middle column | 390×330 |
| `Material_texture___surface-14.png` | reassurance top band | 1440×126 |
| `IMAGE___photo-07.png` | contact | 650×880 |

The SVGs (kicker marks, ridge details, roofline dividers) hard-code their
stroke colours, so they do not follow the CSS tokens. If you change the brand
colour, find-and-replace across `assets/img/*.svg`:

- `#985632` → your `--copper` (36 occurrences, the kicker and ridge marks)
- `#A55A34` → your `--copper-warm` (1, the reviews ridge detail)
- `#242E32` → your `--ink` (5, the hero secondary arrow and seam)

### 5. Reviews

The Google review cards in section 02 are static demo content. Replace the
four `.rcard` blocks, the `4.9` score, and the `128 Google reviews` count with
the prospect's real figures, or drop in a review-widget embed in place of
`.feed`.

## Notes

- The enquiry form posts nowhere (`action="#"`). Point it at a form handler
  before sending a live link.
- The review carousel is the only JavaScript; the page is fully readable with
  JS disabled.
