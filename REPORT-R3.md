# Audit round R3: report back (Part H of the AUDIT FEEDBACK PACK, 2026-10-30)

**Status: NOT SHIPPED.** The file comes back for the screenshot audit first. Nothing in this round is marked final.

## The file
- **File:** `rembrandt/v5/rembrandt-homepage.html`, one self-contained HTML. 1789 KB in total (990 KB gzip).
- **Branch:** `claude/sweet-hypatia-it8evf`. Each section's work is its own commit (see `git log`).
- **Build:** `cd rembrandt/v5 && TOOLS=<dir with esbuild, gsap, lenis> node build/build.mjs`.
- **Records:**
  - `AUDIT-R3.md`: the challenge log. Every pack point carries a verdict, a reason and a citation, and each block was written before its section's code.
  - `TRACEABILITY.md`, section "R3": one row per slot, written before the code, with its Verification filled in, plus the 10 QA rounds per section.
  - `PROGRESS.md`: R3 running status.
- **QA:**
  - Scripts are in `rembrandt/v5/qa/scripts/`.
  - Logs are `rembrandt/v5/qa/gate/r3-*.log`.
  - Screenshots are `rembrandt/v5/qa/r3-<section><v>-{1440,375}-*.jpg`.

## How to look at it
- **Defaults:** every section opens on the pack's winner (Hero V2, Reviews V2, Work V1, Family V1, How V3, Towns V3, Call V1).
- **Switcher:** each section's switcher shows **1 to 5**.
- **Backups:**
  - **B1 to B3** (the versions as they stood before this round) sit behind the switcher's "more" button (aria-expanded). The **B** key reveals all of them at once.
  - Backups are never the default.
- **URL:** sets any mix, for example `?v=hero4,proof5,callb1`.

## Per section: accepted, improved, rejected
Every verdict's full reason and citation is in `AUDIT-R3.md`. Below, every point that was **not** taken exactly as written is listed. Every other point was ACCEPTED and built as asked.

### Page level (Parts A, C, D, E)
| Point | Verdict | Why |
|---|---|---|
| A2 backups | IMPROVE | Beyond the backups themselves, each section now opens on its winner, not on V1. The first screen should be the chosen set ⟦S1501⟧. |
| C1 eyebrows | ACCEPT + correction | --blue labels on --ink measure 1.7:1 ⟦S1497⟧. Dark grounds use the same 14px sentence-case role in --on-dark-2 (9.3:1). |
| C2 colour lock | IMPROVE | #fff stays as a role, not a ground: the logo's white plates and paper artefacts ⟦S1314⟧ Boundaries. Cadence: cream / ink / sky / ink / sky / ink / blue / ink. |
| C3 type roles | IMPROVE | "H1 36 to 48" next to a "60px hero" would give one page two H1 styles. There are now three named roles: --t-hero, --t-h1 for graphic heroes, and --t-h2 at 48. ⟦S1500⟧ ⟦S1501⟧ |
| C4 height beat | IMPROVE | A pinned version is measured by its viewport, not its scroll length ⟦S1325⟧. The element dial is a guide, not a gate. |
| C6 helper | IMPROVE | On touch the picker is removed, not moved: the companion never mounts there. With a mouse the helper yields whenever it overlaps a control ⟦S1306⟧ ⟦S1314 §2⟧. |
| D1 blink | IMPROVE | A blink already existed. It is retuned to 2.8 to 4.6s, 90/90ms ease-out, plus a blink on every mood change ⟦S1448⟧. |
| D9 label bubble | IMPROVE | Removed: no element carries a label, so it had no job. Removal Test ⟦S1314⟧. |
| D10 hammer power2.in | KEEP, reasoned | A falling head accelerates into contact ⟦S0083⟧ ⟦S0089⟧. Only its recoil changed, 0.3s elastic to 0.22s ease-out. |
| D11 no trail layer | ACCEPT, extended | The page already had one: the per-section cursor effects. They are retired, because the companion's mood accessories do the same job ⟦S1314⟧. |
| E4 | Clarified | There was no dim cycle. This was How V3's mid-scrub state; it is fixed under F5. |

### Hero (F1/G)
| Point | Verdict | Why |
|---|---|---|
| F1.1 60px, two lines; 40px on phones with the same break | IMPROVE | The two lines need 780px; a phone gives 343px. The phrase break is the rule: 60px two-line from 1200px; three lines at 1024 to 1199 and at 40px on phones ⟦S1500⟧ ⟦S0650⟧. |
| F1.2 one bold phrase | ACCEPT, interaction kept | The proximity weight is now per word, never split mid-word. At rest only "family roofers" is 700. The idle gust is deleted ⟦S1314 §8⟧. |
| V1 static line at 28 to 32px | IMPROVE | The pack's own C3 sets the graphic-hero H1 at --t-h1 (36 to 48px). |
| G(a) the shingle wall with a pinned proposition | REJECT | That is V1 after its fix list, a variation (A3). Built instead: V4. |

### Reviews (F2/G)
| Point | Verdict | Why |
|---|---|---|
| Star clip 117.6/120 | REJECT the number | 117.6 paints five full stars, which shows 5.0 for a 4.9 rating. The clip is 115.0: four stars plus 90% of the fifth ⟦S1314⟧ product truth. |
| V1 Constellation fixes vs "pixel-untouched" | Resolved | B1 holds the original, proven unchanged. Slot 1 is a working copy that takes the fixes and the locked wording ("BBB A+ accredited since 2001", "$2M liability insurance"). |
| G(a), G(b) | REJECT both | Each is an existing version after its fixes, or a splice of two (A3). Built instead: V4, V5. |

### Work (F3/G)
| Point | Verdict | Why |
|---|---|---|
| V2 FLIP or clip reveal | ACCEPT the FLIP | 0.45s on --ease-x ⟦S0063⟧ ⟦S0089⟧. |
| V2 spring overshoot | DROP | A bounce on an ordinary state change ⟦S1314 §8⟧. |
| G(b) drag filmstrip | REJECT | It is V1 with a different input (A3). Built instead: V5. |

### Family (F4/G)
| Point | Verdict | Why |
|---|---|---|
| P1 plate line behind the clip or in the lower third | IMPROVE | Both still cross the letters. The truss lifts so its chord sits above the cap line (y190) and crosses nothing ⟦S1498⟧. |
| P2 heading 2 to 2.25rem | REJECT | C3 gives every H2 one size ⟦S1500⟧. WALKER is the display. |
| P5 struts | DROP | Removal Test ⟦S1314⟧. |
| G(a) family-only truss; G(b) year rail as the spine | REJECT both | (a) is V3 after its fixes (A3). (b) repeats How V1's spine on the same page ⟦S0626⟧. Built instead: V4, V5. |

### How (F5/G)
| Point | Verdict | Why |
|---|---|---|
| V3 emphasis advancing every ~4s | IMPROVE | No timer: an endless cycle competes with reading ⟦S1314 §8⟧. The emphasis follows the row nearest the viewport centre; hover or focus takes it. |
| Descriptors 13px/700 | IMPROVE | The page's one label role is 14px/600 (C1). |
| G(a) V1's gutter with contrast decoupled | REJECT | That is V1's fix list (A3). Built instead: V4. |

### Towns (F6/G)
| Point | Verdict | Why |
|---|---|---|
| V3 tape at rest: seat it or hide it | ACCEPT, hidden | A resting tape with no town says nothing ⟦S1314⟧. |
| V3 vane art: mask or drop | DROP | Removal Test. |
| V1 west-axis labels | IMPROVE | The collision pass tries radial positions first, then steps along the axis. |
| V1 below 640px: label 8 or hide | HIDE | At 0.38× scale no label reaches 12px. The list carries every town ⟦S1499⟧. |
| V1 chips cut to 8 | IMPROVE | The 8 nearest show, plus "Show all 24". The list is the keyboard path to every town (progressive disclosure, never removal) ⟦S1499⟧. |
| G(a), G(b) | REJECT both | Each is an existing version after its fixes (A3). Built instead: V4, V5. |

### Call and footer (F7/G)
| Point | Verdict | Why |
|---|---|---|
| V2 "rebuild only as a new version" | REJECT the slot move | A rebuilt V2 in a new slot is a variation (A3). The F7-V2 rules are applied to V2 in place. |
| V3 shine ≤.3s or remove | REMOVE | Removal Test. |
| V3 number at min(13vw, 160px) | ACCEPT the rule, corrected by measurement | 13vw measured 402px at 375, wider than the screen. Set at min(12vw, 150px); the number fits whole at 320, 375 and 1440. |
| G(a) V2 sun disc as a new version | REJECT | See V2 above. Built instead: V4. |
| Footer | ACCEPT all | The NAP runs as one four-key row at ≥900. The bead spans the number only. |

## The new versions (slots 4 and 5) and their references
| Section | V4 | V5 |
|---|---|---|
| Hero | **Stitched headline**: real job photos set between the headline's words at type height; on phones they stack as a strip. ⟦S0218⟧ inline image typography | **Poster lines**: no photo, no canvas; three dated family rows under ridge rules; the last row is the Call link. Pack G(b) + ⟦S0095⟧ |
| Reviews | **Office wall**: the credentials as typographic plaques; only the 4.9/295 plaque glows sun; a glare sweeps on hover or focus; each links to its check. [BANK] 514 Record Institute + [BANK] 372 Glare Hover | **The seal**: a roofer's seal with "4.9" in the centre and the credentials on its ring; it turns only when dragged or with scroll; the facts sit beside it as a real list. [BANK] Q164 Circular Text |
| Work | **Two jobs, told straight**: ba2 as the one genuine pair, plus one finished roof labelled "No before photo of this one". Pack G(a) + [BANK] Checklist 11 + ⟦S1314⟧ | **Job index**: six job rows with thumbnails, and a large preview that follows the pointer. [BANK] VERDE |
| Family | **Three cards**: year and name on the front, one fact on the back; Rachel's card carries the phone. [BANK] Harvest 201 flip card | **Editorial panorama**: a panoramic crew crop, an oversized "One family since 1995.", and a narrow facts column. ⟦S1354⟧ |
| How | **One house, three states**: one sticky house elevation that the three steps change (phone, measuring lines, new courses); the pin spans only the steps. ⟦S0441⟧ | **Three artefacts**: phone, blank ruled estimate sheet (no figures, no names), real finished roof. Pack G(b) + ⟦S0095⟧ + ⟦S1314⟧ |
| Towns | **Distance ruler**: all 24 towns on one 0 to 25 mile tape, with labels in non-overlapping lanes; a list on phones. ⟦S0603⟧ | **Eight directions**: the towns grouped by compass direction around the office cell, nearest first. ⟦S1499⟧ |
| Call | **The keypad**: a phone keypad dials 937 746 7377 once on entry, keys 90ms apart, then the Call pill settles; the keypad is aria-hidden. ⟦S0095⟧ + ⟦S1448⟧ | **Office status**: Springboro's time (Intl, America/New_York, recomputed each minute) on a Monday to Friday, 9 to 5 week strip with a "Now" mark, plus a plain inside/outside-hours sentence. Never "open now", no pulse. Pack G(b) + ⟦S1314⟧ |

## QA rounds: summary
Each section ran 10 named rounds, logged in TRACEABILITY.md. A finding was kept only with a catalog entry behind it.

| Section | Fixed in its rounds (highlights) | Log |
|---|---|---|
| Hero | Focus ring 1.55:1 on cream → ink/sun by ground, page-wide ⟦S1049⟧. V2 hover layout shift 23px → 0.03px. V3 mid-fade legibility. V1 timings to ≤.3s. V4 photo pills legible at type height. | `r3-hero.log` |
| Reviews | Honest 115.0 star clip. Seal letter overlap. Heights (V2 phone 1439 → 1106). Helper re-check every 250ms. V3 "Platinum" clipped on phones. | `r3-proof.log` |
| Work | V2 caption overran at 320. E3: the play state is now shown. V3 height 1250 → 1160. | `r3-work.log` |
| Family | V1 call pill at 320. V1 height 1437 → 1152. V3 pill overlapped the say row. V5 crop cut faces. Press timings. | `r3-family.log` |
| How | V3 one weight per line at the H2 role. V3 and V5 targets ≥44px. V3 false-affordance links removed. Heights for V1 and V5. | `r3-how.log` |
| Towns | V2 labels 2.84:1 → 9.3:1. Chips 44px. Ruler label collisions (8 pairs → 0). Helper sampling grid 9×3, page-wide. | `r3-area.log` |
| Call + footer | V3 number fit (13vw → 12vw). V5 "Now" tag placement. Footer phone link stretched (bead a line low) and a resting cap dot. | `r3-call.log` |

### Final page-wide gates (run on the final file)
| Gate | Result | Log |
|---|---|---|
| Facts gate | PASS, FAILS 0 | `qa/gate/facts.log` |
| DOM integrity, 35 live versions | 35/35 PASS. All 35 switcher labels swap only their own section. Helper picker 4/4. Chrome links 6/6. Console 0. | `qa/gate/dom.log` |
| Overflow and console sweep, 35 versions at 320 / 375 / 1024 / 1440 and 1440 reduced | 25/25 runs: overflow 0, errors none | `qa/gate/r3-sweep.log` |
| Reduced motion, 35 versions × 1440 and 375 | 70/70 PASS: no infinite CSS or GSAP animation, no Lenis, companion off, overflow 0 | `qa/gate/reduced.log` |
| Companion, 35 versions × 1440 and 375 | 70/70 PASS: nail on the pointer (offset 0,0), system cursor hidden only while live, a hover reaction, no cursor-effect layer. Variants, Off, H key, text field, press, page-leave, touch and reduced motion pass. | `qa/compint.log` |
| Backup UI | "more" reveals B1 to B3 in every section; B2 mounts its template; back to the default; the B key reveals all 7; errors 0 | `qa/gate/r3-bkui.log` |
| Occlusion (helper vs controls) | 0 overlaps, every section, 5 versions × 2 windows | `r3-*.log` |
| Weight | 1789 KB total: code 718 KB (171 KB gzip) plus 1072 KB media | `qa/gate/weight.log` |

## Backups: confirmation
- **Where:** every section has **B1, B2, B3**, the three versions exactly as they stood before this round. They ship as templates behind the hidden "more" button and the B key, never as the default.
- **What the switcher holds:** every section's visible switcher holds **5** versions: the improved V1 to V3 and the new V4 and V5.
- **Proof that they are unchanged** (`qa/gate/r3-backups.log` at the start of the round, `qa/gate/r3-backups-final.log` now):
  - **Start of round:** 42 of 42 renders were pixel-identical to the pre-round file.
  - **Now, after every section's pass:** 36 of 42 have an identical mounted DOM and identical computed style for every visible element. The other 6 differ only in markup that does not show:
    - image attribute order, with byte-identical images (Work B1 and Family B1, at both widths);
    - a filter id generated at random on each mount (Reviews B3).
  - **The remaining pixel noise:** it is anti-aliasing on edges only. The page frame around a section changed this round (divider heights, C5), and that moves each version by a sub-pixel amount.
- **What backups share with the page:** they keep their own CSS, JS and frozen helpers. They do share the page systems around them:
  - the new dividers;
  - the companion;
  - the phone glyph's two hover arcs (D3), which are invisible at rest.

## Facts self-check (on the built file)
| Check | Result |
|---|---|
| Phone | Every tel link is `tel:+19377467377` (41 links, 0 others). The number "(937) 746-7377" appears 47 times across the 35 versions, 21 backups and chrome. |
| (937) 353-9711 | **0** |
| 24/7 or "24 hours" | **0**. Hours appear only as Monday to Friday, 9 to 5. "Open now" appears 0 times. |
| Towns | **24**, the firm's own list, from `data/towns.js` (Census / ACS, source printed). |
| Before/after pairs | **One**, ba2 (before and after). No other pair exists or is implied; Work V4 labels its single photo "No before photo of this one". |
| Licence number | **0** mentions. |
| Logo name | "Rembrandt Roofing & Restoration", unchanged. |
| Facts gate | PASS, FAILS 0 (`qa/gate/facts.log`). |

## Open items for the screenshot audit
1. **Weight.** Code is 718 KB (171 KB gzip), up from 437 KB. Each section now ships 8 versions (5 live + 3 backups). Once a version per section is chosen and the rest deleted, code falls well below the old figure.
2. **Backups and the page frame.** A backup shows its own content inside the current page frame (dividers, companion, phone-glyph arcs). If you want a backup shown with the old frame as well, say so.
3. **The estimate claim (flag C11 from the last report).** It stays on Call and How. It is worded no stronger than the firm's own published claim. It left the hero (F1.4).
4. **Towns data.** The figures are public Census / ACS data about the towns, not claims about the firm. The source is printed on every Towns version.
5. **Call V5 and the clock.** It reads the visitor's clock converted to Springboro time. It states only whether that time falls inside the published hours, never that the office is open (a holiday could make that untrue).

Nothing above is marked shipped. The file is ready for the screenshot audit.
