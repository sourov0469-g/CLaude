# GATE-FIX-CALL · section 7, the call, three versions (default: V1 End card)

**Sources:** `reset/sections/07-call/v1–v3.html`; the reset original is kept as `b1.html`.

**Evidence** (`gates/fix/call/`):
- `versions-1440.jpg` and `versions-390.jpg`, plain and written for "A leak" in Roseville, with the clock fixed at Wednesday 10:20 in Shoreview;
- `checks-call-v1…v3.json`.

**Switch:** the Versions button → Call, or `owl-roofing.html?call=2` (`3`).

## 1. What was broken, and what fixed it
| Finding (audit, owner) | Fix |
|---|---|
| **"Closed now" read as broken.** From Dhaka, Shoreview is always in the small hours or the evening, so the page said "Closed now" whenever the owner looked, without saying why. | Every version says the Shoreview time in words: "It's 03:12 on Wednesday in Shoreview, MN. We open today at 08:00." The logic is unchanged, and the reason is now visible. |
| **The owl illustration on two sections** | It appears here only; section 6 now has a drawn marker. The page-wide report reads "no repeats". |
| **Bright amber line and dot** | The number's line and phone icon are the call colour (copper), the one saturated place. "Open now" and today's bar are slate. |
| **The "Past versions" link** was added only to the first footer by the build | The build adds it to every version's footer. |

## 2. The three versions

### V1 · End card (kept, repaired)
- **What it is:** the number set as type, up to 172 px, with a copper line. The owl flies in and lands on it.
- **Hours:** "Open now / Closed now", the Shoreview clock in words, and a week strip with today marked.
- **"Rather write?":** a note showing what the page knows (your roof, your town), with Change links and an email already filled in.
- **The closing line of locked facts.**
- **Reference:** Longbow end card.
- **Five questions:**
  1. **What is it for?** Call now, or write.
  2. **Under 3 s?** Yes.
  3. **Fun:** the owl landing, and the page remembering you.
  4. **Every element?** Yes.
  5. **Stressed?** One giant thing to tap.
- **Ledger:** ⟦S1452⟧ ⟦S1455⟧ ⟦S1441⟧ ⟦S1442⟧ ⟦S1428⟧ ⟦S0400⟧.

### V2 · Two doors
- **What it is:** "Two ways to reach us. Pick either." and two whole cards side by side:
  - **Call us:** dark, with the number, the clock, and the copper call button.
  - **Write to us:** light, "Tell us about the leak.", your roof and town, and "Write it in my email app".
- **Reference:** Longbow frame 075, "Choose your Longbow" as two cards.
- **Five questions:**
  1. **What is it for?** Pick how to reach them.
  2. **Under 3 s?** Yes.
  3. **Fun:** not playful; the clearest.
  4. **Every element?** Yes.
  5. **Stressed?** The plainest choice.
- **Ledger:** ⟦S1452⟧ ⟦S1441⟧ ⟦S1442⟧ ⟦S1455⟧ ⟦S0400⟧.

### V3 · Winter house
- **What it is:** a sharp, snow-covered house, full-bleed and tagged. The number is set large in white with a copper rule, with the hours and clock and a quiet "Rather write?" link. The closing facts sit under it on the dark band.
- **Reference:** Scout (one line on one photograph).
- **Five questions:**
  1. **What is it for?** Call.
  2. **Under 3 s?** Yes.
  3. **Fun:** the mood of a Minnesota winter, where a roof matters.
  4. **Every element?** Yes.
  5. **Stressed?** Yes.
- **Ledger:** ⟦S1433⟧ ⟦S1452⟧ ⟦S1306⟧ ⟦S0400⟧.

**All three:**
- show live hours from the stated Mon–Sat 08:00–18:00 in America/Chicago time;
- write the headline and the email from the case and town chosen above;
- show the site's email note word for word: "Your email app should open with these details. Send it from there, or call (651) 977-6027.";
- carry only locked facts.

## 3. AA pairs (Shingle Slate; all four palettes in `gates/fix/colour/palettes.json`)

| Pair | Contrast |
|---|---|
| Ink on ground | 13.51:1 |
| Secondary | 6.57:1 |
| White on the copper call | 5.14:1 |
| Copper as a line next to ink (a graphic) | 4.67:1 against the ground |
| V2 dark door: light text | 13.78:1 |
| V2 dark door: accent-deep label | 7.05:1 |
| Slate links and button | 6.70:1 and 7.39:1 |
| V3 text on the photo | on a measured shade; axe passes |

## 4. Checks (`tools/fix-test.cjs call <v>` on `owl-roofing.html`): **V1 28/28 · V2 26/26 · V3 26/26**

**Every version passes:**
- axe 0 in all four palettes;
- the facts lock and no skeleton;
- distinct media;
- sharpness;
- layout and 44 px controls;
- reduced motion;
- no errors.

**Shared call checks, on a fixed clock:**
- **Hours:** Wednesday 10:20 shows "Open now" with "10:20 on Wednesday in Shoreview, MN"; Saturday 19:00 shows "Closed now… open Monday at 08:00"; Wednesday 03:12 shows "open today at 08:00".
- **The call:** a real tel link, and the pill steps aside.
- **Your choices:** "Tell us about the storm." and the email "Roof help: After a storm" with "My town: Stillwater".
- **The email note,** word for word.
- **The closing facts.**

**Behaviour checks per version:**
- **V1:** the number is at least 120 px with a copper line; the week strip; the owl appears only here.
- **V2:** two doors side by side, with the copper call in "Call us".
- **V3:** the number at least 120 px on the photo; the stock is tagged.

**A test fix:** the sharpness check now passes when nothing shown is soft, and reports how many media it measured. V1's owl is too small to measure on a phone.

## 5. Defects found and fixed in-session
1. **V3 on phones:** the number broke inside itself ("977- / 6027"). It now stays on one line at a size that fits, with a 48 px tap height.
2. **V2:** the number link was 42 px tall on tablets and phones. It is now 48 px.
3. **The past link missing from V2 and V3:** fixed in the build.

## 6. Scorecard (Design 40 · Usability 30 · Creativity 20 · Content 10)

| | Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|---|
| V1 End card | 8.5 | 9.0 | 8.3 | 8.9 | **8.65** |
| V2 Two doors | 8.4 | 9.1 | 7.8 | 8.9 | **8.54** |
| V3 Winter house | 8.6 | 8.7 | 8.2 | 8.6 | **8.55** |

**Recomputed:**
- V1: 3.40 + 2.70 + 1.66 + 0.89 = 8.65
- V2: 3.36 + 2.73 + 1.56 + 0.89 = 8.54
- V3: 3.44 + 2.61 + 1.64 + 0.86 = 8.55

## 7. The default: **V1 End card**
- **Highest score.** The number is the biggest thing on the last screen, and the page visibly remembers you (the headline, your roof and your town, the email).
- **The repair answers the owner's "not working":** the hours now explain themselves in Shoreview time.
- **V2 is the plainest alternative.** V3 is the most atmospheric, though its photograph makes it a fourth dark full-bleed screen if section 4's V3 is also chosen.

## 8. Remaining (named)
- **D1 · public holidays are not known to the page;** on a holiday it would say "Open now". A closed-days list from the owner would fix it.
- **D2 · `mailto:` needs an email app;** the note offers the phone number for that reason.

## 9. Vetoes: **zero**
- Only locked facts and the site's own email note.
- No promised reply times.
- Stock is tagged and credited.
- The logo is untouched.
- No sub-agents or background tasks; every command ran in my own thread, in the foreground, with a time limit.
