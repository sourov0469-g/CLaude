# CHECKPOINT: inner pages

One entry per page as it passes its audit. Every page uses the homepage's tokens, type, chrome, booking form and motion values (CHECKPOINT-HOME.md).

## siding.html (PLAN §5), passed 29 Oct 2026
Facts re-read from `/services/siding` and `/services/siding/cost` before building; the eight Q&As come verbatim from the page's FAQPage data (`work/data/faq.json`).

| Section | Built | Source / parameters |
|---|---|---|
| S1 Hero | H1 "James Hardie, installed by an Elite Preferred crew." in two lines; Milwood pair (siding portion $25k-$30k, APS-4739) as a full-width compare that scales 0.86 to 1 on scroll; stats row: 431 documented / 30-yr non-prorated / lifetime labour / 1-2 weeks with paint | #154 scale container: scrub 1, start `clamp(top 80%)`, end `clamp(top 15%)`, force3D, no pin |
| S2 The wall, layer by layer | Oblique exploded drawing: sheathing (rotten sections replaced), house wrap, HardiePlank lap (codes A-D), trim. Assembled, then scrubbed apart (ease none) on a 220vh track with a sticky stage, desktop and screens ≥760px tall only. Phone: static exploded drawing cropped to the figure, labels as a numbered list. Spec table A-D, to-scale lap section (board and exposure to scale, thickness ×3, stated), 415-job choice bars (301 / 286 / 36 / 27), board & batten note | S0361 dimensional drawing, codes not numbers |
| S3 What 415 jobs cost | 11-band histogram (sums to 415), median in ink, middle half mid-grey; tap or point at a bar for its count and the firm's example job for that band; city medians table; done-in-the-same-job bars (72 / 33 / 15 / 15%); six levers; the firm's caveat | bars 0.8s `power2.out` stagger 0.04 |
| S4 Four pairs | Milwood, Rob Roy, Maple Run, North Austin with bands | shared pairs component |
| S5 Built for Texas | Five claims with the condition behind each; warranty line incl. 15 years on trim | slide-up 0.8s `power2.out` |
| S6 Colour on the board | 12 SW + 17 ColorPlus chips with the firm's hex values, link to the full studio | |
| S7 Questions | 8 Q&As verbatim; `details` with `::details-content` open 0.5s / close 0.3s ease-in-out (bank values) | Codrops accordion #306 values |
| S8 Reviews + book | Four excerpts, ellipsis at every cut | |

Audit: 1440 + 375 section shots, wall scrub at 0 / 0.3 / 0.55 / 0.95, interactions (hero compare keys, histogram readouts, accordion, pair picks). Defects found and fixed: homepage hero placement rules leaking into the inner hero grid (implicit columns; scoped to `.hero-grid >`); H1 in 6 lines (now 2); wall after-content inside the pinned track (would have scrolled over the sticky drawing; moved out); wall labels sliding over back layers (now a fixed label column with leaders redrawn to each layer); phone wall labels at about 5px (list + cropped viewBox); histogram x-labels colliding on phone (`<wbr>` after the hyphen); chip book two-up on phone (now four-up, rows aligned); excerpts missing ellipses. Overflow 0px at 375 and 1440, no console errors.

## windows.html (PLAN §6), passed 29 Oct 2026
Facts re-read from `/services/windows` and `/services/windows/cost`; frame-colour hex values harvested from the page markup (`work/data/window_colours.json`: NT 19, Simonton 10, Andersen 5, Pella 5).

| Section | Built | Source / parameters |
|---|---|---|
| W1 Hero | "Four window brands, measured to every opening."; Anderson Mill pair (NT Windows Executive, windows portion $15k-$20k, APS-4909) in the course frame on its x axis: 12 sash strips (8 phone) drop in from the right, then it is a before/after slider (keys, drag, tap). Stats: 388 documented / 238 of 376 NT / 2 days on site / lifetime labour | course mask values as the homepage (0.9s `power3.out`, stagger 0.02) |
| W2 Four brands | Brand cards: share of 376, lines with job counts, published specs, frame-colour swatches, median band. Desktop ≥900×700: GSAP horizontal pin, `x = -(scrollWidth - viewport)`, ease none, scrub, `invalidateOnRefresh`, end = travel (1:1), dots circle → square. Phone and reduced motion: native scroll-snap strip, no pin | #270 |
| W3 Frames, then the glass | Stacked bar 214 / 64 / 33 / 4 / 61 (sums to 376) with key; 3/4″ dual-pane section (overall depth to scale, stated); Low-E line per brand | |
| W4 What 376 jobs cost | 12-band histogram (sums to 376) with the firm's example job per band; brand and city median tables; levers; done-in-the-same-job bars (36 / 22 / 18 / 10%); caveat | as siding |
| W5 Four pairs | Balcones Village, Ridgewood, North Austin, Maple Run | shared pairs component |
| W6 Built to order, then two days | Four steps; Sara Helms's "about 6 weeks" as the honest counterweight | |
| W7 Q&As, reviews, book | Q&As verbatim from the page's FAQPage data; four excerpts, names as printed | |

Audit: 1440 + 375 section shots, pinned track at 0 / 0.5 / 1, sash slider keys, histogram readouts. Defects fixed: alignment tried on all five window pairs (best ECC 0.57, too low to fake a same-wall install, so the sash strips are an entrance, not a re-glazing); `.brand` card class colliding with the header logo link (renamed `.brand-card`); pinned area taller than the viewport cut the H2 (heading moved out of the pin); glass section too small to read (redrawn at 72 px/in); an editorial line not in the firm's files replaced with its own wording. Overflow 0px, no console errors.

## plan.html (PLAN §8), passed 29 Oct 2026
| Section | Built | Source / parameters |
|---|---|---|
| Hero | "Pick the colour. Then see the price." (one line at 1440), lead, CTAs | |
| L1 Colour Studio (full) | Rob Roy photo with body, gable and trim zones; finish switch swaps the tray (12 SW sample colours / 17 ColorPlus Austin colours, the firm's hex values; ColorPlus sets Arctic White trim, as the firm pairs it); "Show the real navy"; "Compare side by side" split with a draggable handle; summary from one state object (names and codes, finish, the job's $15k-$20k band on a mini histogram of all 415 siding jobs, ≈$182-$243/mo at 7.99%/120); state carried in the URL (`?body=…&gable=…&trim=…&finish=cp#studio`) once the visitor changes something; "Copy a link to this plan"; "Book with this plan" opens the booking dialog with Siding ticked and the plan in the note | Codrops customizer #140, BLK zones #531 (400ms `cubic-bezier(.645,.045,.355,1)`), Silo #98 single state + permalink |
| L2 Every trade priced | The ledger with ids `trade-*` (the mega-menu links land here) | as H3 |
| L3 Distributions | Tabs (arrow keys, `aria-selected`): siding 415 / windows 376 histograms | |
| L4 Financing, worked | Live amortisation + the discount stack; $30,000 with all three gives 25%, $7,500 off, $22,500 (the firm's own example) | |
| L5 Referral | $200 per referral, no limit, name mentioned before the first appointment; ticket stub | ui-ux-patterns "Referral ticket" |

Audit: 1440 + 375 shots; interactions (finish switch, gable colour, split, permalink round trip on reload, book-with-plan prefill, tabs, stack). Defects fixed: the permalink rewrote the URL to `#studio` on load and the page opened scrolled past its H1 (now written only after the visitor changes something); discount figures overflowing on phone; "$200" repeated in heading and stub. Overflow 0px (375 strip items are the swatch tray), no console errors.
