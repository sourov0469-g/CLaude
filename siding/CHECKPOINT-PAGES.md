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
