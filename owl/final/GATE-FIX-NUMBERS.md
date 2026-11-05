# GATE-FIX-NUMBERS · section 4 "Take the numbers.", three versions (default: V2 Ninety marks)

**Sources:** `reset/sections/04-numbers/v1–v3.html`; the reset original is kept as `b1.html`.

**Evidence** (`gates/fix/numbers/`):
- `versions-1440.jpg` and `versions-390.jpg`, each showing arriving, settled and end;
- `checks-numbers-v1…v3.json`.

**Switch:** the Versions button → Numbers, or `owl-roofing.html?numbers=1` (`3`).

## 1. What was broken, and what fixed it
| Finding (audit) | Fix |
|---|---|
| **Numbers caught half-drawn.** At normal scroll speed, "50", "Systems Plus" and "A−" sat cut through the middle by their reveal masks (audit frame `desktop-028-numbers.jpg`). | No glyph is masked in any version. V1's cards now arrive **whole**: a 0.28 s fade and rise, triggered at 10 % in view, staggered at most 80 ms. A check confirms every card is fully in place within 0.5 s of entering. |
| **The bright amber accent word** | A slate accent word (6.70:1). The copper-light accent is used only on V3's dark photo. |
| **Creativity ceiling** (reset GATE-4 D1: "a strong typographic moment, not an experience") | V2 builds the 5.0 from 90 marks, the upgrade that gate named. |

## 2. The three versions

### V1 · Numerals (kept, repaired)
- **What it is:** a giant 5.0 "from 90+ reviews", "Don't take our word for it. Take the numbers.", six facts in the AirPods form (eyebrow, numeral, sub-line, hairline), then the Longbow closing row. The facts now arrive whole.
- **Reference:** AirPods numerals and the Longbow row.
- **Five questions:**
  1. **What is it for?** Proof I can check.
  2. **Under 3 s?** Yes.
  3. **Fun:** not playful; the scale is the point.
  4. **Every element?** Each number answers one trust question.
  5. **Stressed?** Facts, no adjectives.
- **Ledger:** ⟦S1420⟧ ⟦S1433⟧ ⟦S1434⟧ ⟦S0407⟧ ⟦S1306⟧ ⟦S0400⟧.

### V2 · Ninety marks
- **What it is:** the 5.0 is drawn with **90 marks**. The points are sampled from the real Inter glyphs on a hidden canvas and spread evenly. They gather from scattered positions into the numeral as it comes into view.
- **The caption is honest:** "5.0 from 90+ reviews. The number above is drawn with 90 marks, one for each review. No names, no quotes: just the count."
- **Beside it:** "Don't take our word for it. Count it." and the six facts as a strict two-column list.
- **Below:** the closing row.
- **Reference:** a pattern, data as an event (the GATE-4 D1 upgrade); not a live-studied site.
- **Five questions:**
  1. **What is it for?** The rating, and how many people gave it.
  2. **Under 3 s?** Yes: a big 5.0.
  3. **Fun:** you watch 90 reviews become the rating.
  4. **Every element?** The marks are the count; the list is the rest of the proof.
  5. **Stressed?** Yes, and it is checkable, not puffed up.
- **Ledger:** ⟦S1420⟧ ⟦S1435⟧ ⟦S1434⟧ ⟦S1306⟧ ⟦S0400⟧.

### V3 · Spec row over a street
- **What it is:** a sharp, snowy residential street, full-bleed (stock, tagged). The 5.0 is set large in white beside the line, and the six facts run as **one strict row** along the foot, Longbow-style, with the licence, hours, address and slogan under it.
- **Reference:** Longbow (frame 060: a spec row on a full-bleed photograph).
- **Five questions:**
  1. **What is it for?** Proof, in a Minnesota setting.
  2. **Under 3 s?** Yes.
  3. **Fun:** the photograph does the mood.
  4. **Every element?** Yes.
  5. **Stressed?** Yes.
- **Ledger:** ⟦S1428⟧ ⟦S1433⟧ ⟦S1306⟧ ⟦S0400⟧.

**All three carry the same locked facts, exact:**
- 5.0 from 90+ reviews;
- 10-year workmanship warranty;
- up to 50-year manufacturer warranties;
- 29 towns around Shoreview, MN;
- GAF Systems Plus;
- BBB A− since February 2026;
- founded 2025 by Tim Brown and Noah Bergland;
- MN licence #BC809662;
- Mon–Sat 08:00–18:00;
- the Shoreview address;
- We Give a Hoot.

None of them says A+, Master Elite, Accredited or "lifetime".

## 3. AA pairs (Shingle Slate; all four palettes in `gates/fix/colour/palettes.json`)

| Pair | Contrast |
|---|---|
| Ink on ground | 13.51:1 |
| Secondary on ground | 6.57:1 |
| Slate accent word on ground | 6.70:1 |
| V2 marks (slate) on ground, as graphics | 6.70:1 (3:1 needed) |
| V3 text over the photo | on a measured shade; axe passes in all four palettes |

**V3 on phones:** the shade was deepened after the first screenshots, so the copper accent words read clearly.

## 4. Checks (`tools/fix-test.cjs numbers <v>` on `owl-roofing.html`): **V1 25/25 · V2 24/24 · V3 24/24**

**Every version passes:**
- axe 0 in all four palettes;
- the facts lock and no skeleton;
- distinct media;
- sharp at 1440 and 390 × DPR 2 (V1 and V2 have no photographs);
- layout and 44 px controls;
- reduced motion;
- no errors.

**Behaviour checks per version:**
- **V1:** in flow; no clip-path on any number; a card is fully in place within 0.5 s of entering; all six arrived by the end; facts exact.
- **V2:** exactly 90 marks, all gathered inside the numeral once on screen; the honest caption; the drawing labelled for screen readers; facts exact; in flow.
- **V3:** one full-bleed screen in flow; the stock is tagged and described; the six facts sit in one row on desktop; facts exact; everything arrived.

## 5. Defects found and fixed in-session
1. **V3's first heading** ("Your street, your neighbours") could be read as a hint that neighbours are customers. Nothing on record supports that, so it was replaced by the reset's line, "Don't take our word for it. Take the numbers."
2. **V3 on phones:** the accent words over the busy part of the photo were too weak, so the shade was deepened for phones.
3. **V1:** the first build still took about 0.5 s per card with its stagger. Tightened to 0.28 s with at most 80 ms of stagger.
4. **Test fixes:**
   - the early-arrival check first scrolled to the 5.0, not the cards;
   - it then measured during the page's smooth scroll. It now jumps instantly and then measures.

## 6. Scorecard (Design 40 · Usability 30 · Creativity 20 · Content 10)

| | Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|---|
| V1 Numerals | 8.3 | 8.9 | 7.6 | 9.2 | **8.43** |
| V2 Ninety marks | 8.6 | 8.7 | 8.8 | 9.0 | **8.71** |
| V3 Spec row over a street | 8.5 | 8.5 | 8.0 | 8.8 | **8.43** |

**Recomputed:**
- V1: 3.32 + 2.67 + 1.52 + 0.92 = 8.43
- V2: 3.44 + 2.61 + 1.76 + 0.90 = 8.71
- V3: 3.40 + 2.55 + 1.60 + 0.88 = 8.43

## 7. The default: **V2 Ninety marks** (changed from the reset's V1)
- **It answers the reset's own named weakness:** creativity, the owner's "document type" complaint, for the most document-like section.
- **It stays as clear and as honest as V1:** the marks are a count, not a claim.
- **The page needs a light, still breath here.** The hero film, the curtain's dark scene and the scrubbed film above are three dark moments in a row; V2 is light and calm. V3 would make a fourth dark full-bleed screen.

## 8. Remaining (named)
- **D1 · 90 marks for 90+ reviews:** the exact count above 90 isn't on record, so the drawing stops at 90 and says so.
- **D2 · still no review texts** on record, so none are shown.

## 9. Vetoes: **zero**
- Only locked facts.
- Stock is labelled and credited.
- The logo is untouched.
- Process, stated exactly (corrected after Muse's check): every command I ran for this item was a foreground command with a time limit, in my own thread; I made no Agent calls and no run_in_background calls. I did not verify what the harness panel counts as a task (my task checklist, or a scheduled check-in created outside this session), so this line does not claim more than that.
