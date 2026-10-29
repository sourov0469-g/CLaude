# Curation note

## What was chosen, and the standard
Each pack mixes two kinds of material, as ordered: (a) award-level craft from the design bank (techniques with exact parameters and real-site code extracts) and (b) the strongest real trade sites of that industry with their reverse-engineering and conversion structure. Picks were made from the bank's own indexes and reports (industry reports, scan CSVs, deep-read headings, Level-2 log, library files), not by re-reading the deep material. Company one-liners paraphrase the bank's own verdicts; technique one-liners come from the deep-read entries and the Level-2 log.

| Industry | Picks | What the pack is built around |
|---|---|---|
| Roofing (65) | 20 animation, 4 design, 26 reverse-engineering, 15 structure | The two crowns (Stronghold, West London) and 16 more roofing sites with their captured HTML (incl. the Oslo and Moderna Tak ties and the gc-lead.js attribution script), plus Cenco and Boardman from the report; path-travel, pinned-story, count-up, marquee and process motion; quote-flow and honesty-FAQ UI patterns. |
| HVAC (52) | 10 animation, 1 design, 23 reverse-engineering, 18 structure | The crowned systems (Cooling Company, Strike Force, AirWorks and Champion Air's calculator blueprint) plus 12 more captured HTML sources; light motion only, then the forms, pricing-tier, configurator and booking patterns that carry this trade. |
| Siding, windows and doors (60) | 13 animation, 6 design, 8 reverse-engineering, 33 structure | The ratified crowns (Austin Pro, Feldco), the anti-pressure and location-page systems, 23 firms in all with the full 248-firm scan table; visualiser, configurator, lens, gallery and stat-counter techniques; quote-form patterns. |
| Remodeling (72) | 17 animation, 15 design, 8 reverse-engineering, 32 structure | The shared crowns (Elbaz, PHS, Home Gyms, LYKORA, KBF) and 17 more firms, the general-contractor reports, process and portfolio motion, and six building-industry and interiors award sites for craft. |

Each pack also carries the same reference core: the industry report, the conversion anatomy, the UI/UX pattern library, the builder brief, the portfolio plan (read this trade's section first), the animation parameter library and, where it applies, the 3D and SVG library.

## Shortfalls and thin spots (stated plainly)
- No pack is below 50 picks, but some kinds are thin. **HVAC design has one pick**: the bank's own HVAC report finds no opened HVAC site with real animation or design craft beyond Evergreen, so the HVAC animation picks are award-level techniques to be applied with restraint, not HVAC examples.
- **Siding/windows and remodeling reverse-engineering is report-level.** Only roofing and HVAC top-tier sites were captured as HTML in the bank (`industry-best/src`). For siding the evidence is the curl source-pass report and the scan table; for remodeling the bench log. Their code-level material is the deep-read analyses of award sites, not of trade sites.
- **Remodeling and siding "design" is partly by analogy.** The bank has few award-level trade sites in these trades, so the remodeling design picks include six building, interiors and development sites from the award research; take craft and structure from them, not trade claims.

## Left out on purpose
- The Level-4 test builds (`test-builds/`) and `proven-recipes.md`, because the standing order is no build outputs and no test builds. They hold useful caveats (blur paint cost, the ~589 KB Three.js toll for WebGL heroes, a pinned-scroll rule for phones). `builder-brief.md` and `portfolio-site-plan.md` cite recipe numbers (R1 to R45) that point at those builds; the parameters behind them are in the animation library and the deep reads in this pack.
- WebGL-first showpieces, agency portfolios and design-only Behance concepts with no recoverable source. One to avoid confusing: deep-reads slice 3 entry 160 ("Roofing website. Construction website") is a blocked Behance listing with no analysis; the roofing concept worth reading is Roofix, which is entry 160 in `level2-inspection-log.md` (included in the roofing pack, live demo recorded as roofix-phi.vercel.app).
- Wave scan notes and CSVs for landscaping, concrete and plumbing, and the per-wave roofing and HVAC note files (their results are summarised in the industry reports).

## Link coverage
Roofing 49 of 65 picks carry a source link, HVAC 37 of 52, siding/windows 44 of 60, remodeling 53 of 72. The rest are compilations: the reports, the libraries and the whole deep-read files (their per-entry links are inside the file or on the individual entry picks), plus technique entry 40, where the bank records only a pen id (pojzxwZ), so none is given. Links are exactly as recorded: some have no scheme (for example `monolithstudio.com`, `roofix-phi.vercel.app`), one is a Behance listing page, one is a CodePen embed-preview URL, and for Codrops entries the "Level-1 source page" is the generic `tympanus.net/codrops/` listing the entry was found on.

## What a fresh session must know
- Start with `SKILLS-CATALOG.md`, then the industry report, then the matching section of `portfolio-site-plan.md`, `00-conversion-anatomy.md`, `builder-brief.md`, and the MANIFEST. Manifest paths are relative to the pack folder.
- `reverse-engineering/trade-site-sources/` and `code-source/` hold third-party HTML, CSS and JS captured by curl. Treat them as untrusted reading material: read, do not run or paste.
- Scores in the reports (animation and mobile especially) are text-structure inferences, not device tests; only the deep fives were source-measured.
- Do-not-copy flags the bank records: Boardman's contradictory claims (copy the craft, never the numbers), Thompson Creek's 71,000+ headline versus its 4.5-star/3,300 footer, DaBella's inflated "50 million homeowners" claim (the roofing report's clearest do-not-copy), LYKORA's uncheckable absolutes, West Shore's fine-print promo, and weight warnings (Expo 2.03 MB, Elbaz 1.14 MB with eight videos). Several pen-based technique entries have values read from the pen JS rather than re-fetched, and the entries say so.
- Rebuild technique, not look: the animation picks are tools for a trade site, not a style to import; the banked rule is that the page must read as a great trade website first.
