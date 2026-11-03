# GATE · Redo Step 2 · Three design directions on the kept identity (owner's choice gate)

**Governing documents:** `OWL-REDO-BRIEF.md` Step 2, `OWL-REDO-COMPLETION.md`, and `OWNER-CHOICE-GATE-2026-11-03.md`
(binding: identity locked, three directions, clean boards, a phone comparison sheet, short guidelines, a scorecard per
direction, one recommendation, then STOP).

## Deliverables (`owl/redo/direction/`)
| File | What it is |
|---|---|
| `OWL-DIRECTION-1-OPEN-THE-ROOF.jpg` | Board 1 (1600 px wide) |
| `OWL-DIRECTION-2-THE-CREWS-OWN.jpg` | Board 2 |
| `OWL-DIRECTION-3-FIELD-MANUAL.jpg` | Board 3 |
| `OWL-DIRECTIONS-COMPARISON.jpg` | All three side by side, 1080 px wide, large type for a phone |
| `GUIDELINES.md` | Per direction: idea, colours as used, fonts, motif system, cursor companion, background, best for, risks |
| `src/` | Board sources, the WebGL roof scene (`roof.html`) and its two renders, render scripts |

Each board carries, in this order and with no switcher chrome or QA marks: the hero with a real crew video frame designed
in; Protect Your Nest at full photographic scale; the motif and SVG system; the cursor companion with three reactions; the
background at rest and on hover; type, layout and the locked palette; one line on how it differs from Elbaz. The
one-paragraph Elbaz difference is added to `REVERSE-ENGINEERING.md` before reference 1.

## Constants held across all three (⟦S1312⟧: one family, not colour swaps)
Logo and name unchanged (the source SVGs, untouched); ink `#17111D`, amber `#EAA221` (as in the source logo SVG), cream
`#F1EFE6`; Owl's own crew film and photos lead every hero and Protect Your Nest panel; facts only from the lock. **Varied per
direction:** meaning (depth / people / standard), environment (ink stage / film plus cream notebook / drafting field),
human ritual (prising up a course / snapping a chalk line / squaring a pitch), signature motif (course lift / chalk line /
dimension line), type pairing and cursor companion.

**Colour audit:** every hex value in the board sources was listed. Besides the three locked colours, only tints of ink
and cream appear (panel and drawing shades such as `#1D1624`, `#2C2433`, `#FBFAF5`, `#E8E4D6`); no new hue. A darker amber
used for small labels in an early draft was removed (it would have been a fourth colour and failed contrast on cream);
labels are ink now. Material fills in drawings are textures cut from Owl's film (shingle, decking, chimney brick).

## WEB-SKILLS applied (logged in `owl/skills/SKILL-READ-LOG.md`)
- ⟦S1312⟧ generate-reference-inspired-brand-worlds: constants held, four axes varied, each direction validated for meaning,
  ritual, environment and motif.
- ⟦S1474⟧ parallel-concepts and ⟦S1472⟧ concept-selection: three genuinely different concepts, rated on one scorecard,
  one recommendation with its trade-offs stated.
- ⟦S1307⟧ audit-reference-originality and ⟦S0642⟧ reference-design-contract: each direction names the mechanism it takes
  (Igloo / Lusion; Cowboy / Scout; Longbow / MERSI / AirPods) and rebuilds every visible element from Owl material.
- ⟦S0659⟧ anti-ai-slop: no invented metrics, quotes or jobs; no review text; numbers only 10-year, 5.0 from 90+, 29 towns,
  2025, licence BC809662.
- ⟦S1496⟧ critique-brand-consistency: logo, name and palette checked unchanged on every board; hex audit above.
- ⟦S0546⟧ oversized-cursor and ⟦S0407⟧ svg-animation: each companion is a trade tool with three distinct reactions,
  off on touch screens.
- ⟦S1364⟧ atmosphere-background: each background has a rest and a hover state tied to its idea, and never sits empty
  (photos and real textures carry the field).
- ⟦S0448⟧ gsap-scrolltrigger-storytelling and ⟦S1325⟧ scroll-progress-timeline: Protect Your Nest is drawn as a pinned
  beat with visible progress in all three.
- ⟦S1433⟧ typography-scale and ⟦S1434⟧ visual-hierarchy: one headline face and one reading face per direction, all from the
  permitted six (Montserrat, Inter, Poppins, Lato, Roboto).

## Copy budgets (completion: hero ≤40 words; section headline ≤8 + support ≤35)
| | Hero words (excluding nav) | Hero headline | PYN headline + support |
|---|---|---|---|
| 1 Open the Roof | 39 (kicker 4, headline 7, support 18, CTAs 5, card 5) | 7 | 3 + 33 (support 21, beat rail 12) |
| 2 The Crew's Own | 39 (headline 4, support 20, CTAs 7, chapter rail 8) | 4 | 3 + 31 (support 21, step titles 10) |
| 3 Field Manual | 39 (frame tags 4, kicker 4, headline 7, support 7, CTAs 5, number strip 12) | 7 | 3 + 35 (support 21, number line 2, callouts 4, beat rail 8) |

Counted by hand from the board sources, every visible word except the navigation and the phone number. Earlier drafts
ran over once labels were counted (a video caption, chapter subtitles, a seal label, card captions, step lines, a repeated
guarantee line, a longer kicker); all were cut before the final render.

## Scorecard per direction (Design 40 / Usability 30 / Creativity 20 / Content 10)
Rated as directions: Design = the look's quality and depth on the board; Usability = how readable, accessible and buildable
it will be as one HTML file on phones; Creativity = how much of it only Owl could own; Content = facts, copy budgets, honesty.

### Direction 1 · Open the Roof (explorable depth)
| Category | Score | Evidence for | Evidence against |
|---|---|---|---|
| Design | 7.6 | The roof is a real WebGL render made from Owl's footage textures, lit with amber seam light; the hero film runs full bleed; the travelling card carries the 3D roof; motifs filled with real textures. | The 3D roof still reads a little like a model (flat wall faces, simple geometry); it must reach photographic quality in Step 3. |
| Usability | 7.0 | Copy anchored bottom left with strong shade; pause control on the film; still-image fallback is planned from the start. | WebGL adds weight to the single file and needs a fallback on weak phones and for reduced motion; a dark ground needs contrast care. |
| Creativity | 8.4 | Only a roofer can open a roof: the lift, the layer stack and the flat-bar companion are all trade acts; answers the owner's depth law directly. | The "object you open" mechanism is Igloo's; the Owl version must keep its own roof grammar. |
| Content | 7.6 | Locked facts only; budgets met. | Labels on the opened layers need care in Step 3 so nothing implies an inspection result. |
| **Weighted** | **7.58** | | |

### Direction 2 · The Crew's Own (crew-fronted warmth)
| Category | Score | Evidence for | Evidence against |
|---|---|---|---|
| Design | 7.2 | The strongest photography of the three: the crew film full bleed, a stepped reveal for Protect Your Nest, warm cream notebook interludes with Owl's crew photo. | Many frames carry motion blur at full scale; closest in feel to other video-led sites. |
| Usability | 8.0 | Easiest to read; light ground; chapter rail shows progress; fewest heavy effects. | Pinned chapters must release at their end on phones (measured standard: 3 to 5 screens). |
| Creativity | 6.9 | The chalk line, tape-blade rail and magnet sweep are crew rituals. | Least explorable depth; the chapter-film pattern is the most familiar of the three. |
| Content | 8.0 | Founders, year and ratings from the lock; budgets met after cutting subtitles. | None found beyond the budget cut. |
| **Weighted** | **7.46** | | |

### Direction 3 · Field Manual (engineering doctrine)
| Category | Score | Evidence for | Evidence against |
|---|---|---|---|
| Design | 7.3 | Hard-cut ink and cream blocks, split cover on an amber seam, one big number per pinned beat, drafted section detail with footage fills. | Square, hard look is less warm; the grid field risks reading as a template if overused. |
| Usability | 7.8 | Clear numbered structure; high contrast; light on effects. | Dense numbers need careful phone layout. |
| Creativity | 7.2 | Pitch triangle, speed-square companion and dimension lines are carpentry tools; the clearest contrast with Elbaz's speed promise. | Split covers (MERSI) and numbered doctrine (Longbow) are near their references' obvious reading. |
| Content | 8.2 | The hard-number strip uses only locked numbers; the split labels say "bare rafters" and "finished roof", not before and after. | Only four locked numbers exist, so the doctrine must lean on statements, not figures. |
| **Weighted** | **7.52** | | |

**PASS test:** all three weighted ≥ 7.0; no category under 6.0; vetoes below.

## Vetoes checked
- **Identity changed:** none (source logo SVGs used as is; palette audit above).
- **Invented facts, quotes or jobs:** none.
- **Rembrandt branding or captions:** none; no Rembrandt material is used in Step 2.
- **Bot wall bypassed:** none (fonts fetched from Google Fonts; nothing else fetched).
- **HTML build or Step 3 work:** none. The boards are presentation images; the roof scene is a render for the board only.
- **Sub-agents / background tasks:** none. Every command ran in the foreground with a time limit.

## Recommendation (advises; the owner decides)
**Direction 1, Open the Roof.** It is the only direction that answers the owner's depth law head on (things to explore,
hover and cursor play, real footage carrying the design), and it scores highest on Creativity, the category the rejected
build failed. Its risks are known and testable in Step 3: the roof must reach photographic quality, and it needs a still
fallback and a weight budget inside the single file.

**A mix that would work:** Direction 1's roof and hero, with Direction 2's chapter rail and stepped reveal for Protect Your
Nest (warmer, and the photos stay in front). Direction 3's split cover and number strip can serve as a proof band.

## STOP
Step 2 ends here. No Step 3 concept images and no HTML until Muse relays the owner's pick or mix verbatim.

## Open for Muse (carried from Step 1, still undecided)
1. Amber `#EAA221` (brief and the source logo SVG) against the Phase 1 token `#EAA222`. The boards use `#EAA221`.
2. "50-year" (brief) against "up to 50-year" (earlier lock). Not used on any board.
3. Whether the signature story is one section with two versions or a single scene.
4. The Step 1 background-task incident.
