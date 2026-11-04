# GATE-NEW · How a job runs · V3 "The chapters"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 2, section 2 of 7. Hero V3 was accepted by Muse.

The default is unchanged: V1 (the dial, the owner's pick) stays version 1, and V2 (one house, eight marks) is untouched. No backups ship.

**How to see V3:**
- **Header switch.** Use the Process "1 · 2 · 3" switch while the section is in view. On phones it is the "‹ 1/3 ›" stepper.
- **Built page.** `elbaz-homepage.html?process=3` opens V3 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **OH Architecture** is the primary ("a residential firm's 6-stage process told as numbered chapters: Elbaz's nearest business-shape cousin"; process chapters confirmed live, renovation case chapters not, so none are claimed). Its numbered chapters are taken: the job told as eight numbered chapters, set as type.
- **Signature move:** eight chapters, one open.
  - Eight numbered spines stand side by side like the edges of a bound book: numeral, the stage's name set vertically, its icon.
  - Choose one and the spines after it slide aside to open that chapter: a large numeral, the weeks, the title and the firm's own line. The spine of the open chapter stays as its label.
  - Beneath, a schedule ruler draws the weeks the firm publishes (Week 1, 1–2, 2–5, 5–6, 6–12, construction varies, the final 1–2 weeks, closeout). Drag the week marker along it and the chapters turn with you.
- **Style family:** an editorial typographic index (numbered chapters, vertical spine titles, a schedule rule).
  - V1 is an instrument dial with icon nodes and a text card.
  - V2 is a line drawing of one house that accumulates marks.
  - V3 has no picture: type, numbers and the schedule.
- **The owner's laws for this section:**
  - tight: about one screen, no pin, no long scroll;
  - no right-side animation: the chapters run the full width, and the open one opens in place;
  - real interactivity: open by tap or click, drag the week marker, keyboard on both.
- **WEB-SKILLS tags per element:**
  - **Chapters:**
    - S0062: transform and opacity only (the spines slide; nothing is resized);
    - S0089 (system easing for the slide, the marker follows the hand);
    - S0083 (one open chapter, one focal point);
    - S0666 (numeral, weeks, title, line).
  - **Tabs:** S1018 (a real tablist: arrows, Home and End); S1441 (44px).
  - **Schedule ruler:** S1326 (one continuous, reversible value); S1443 (drag and tap on touch, vertical scroll left alone); S1018 (a slider: arrows, Home and End).
  - **Text on paper:** S1425.
  - **Reduced motion:** S0400 (no slide, no load beat; chapters switch at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 puts the stages on a dial with a card beside it; V2 draws them as marks on a house. V3 sets them as a book's chapters in type, with the published weeks drawn to scale beneath.
  - **Why it is better.** It is the only version that shows how long each stage takes relative to the others: permitting's six weeks are visibly the long one, and construction is drawn as "varies". Every stage's title stays readable at once on the spines, so the whole job is in view while you read one chapter.
  - **Facts.** The stage names, weeks and lines are the section's one list (`ST`, FACTS.md "The eight-stage process"), with V1's note "Timelines vary by scope and jurisdiction."

## What was built
**Files:**
- `remodeling/src/sections/process.html`: V3 added in the existing version system (`.ver[data-v="3"]`, prefix `jc__`, checked free).
- `css/sections/process.css`: a V3 block appended.
- `js/sections/process.js`: a `3:` definition beside `1:` and `2:`, reusing the section's one list of the eight stages (`ST`) and its icon set.
- V1 and V2 are untouched.

**The chapters** (wide screens):
- **Eight spines** of fixed size stand side by side: the numeral at the top, the stage's name set vertically, its icon at the foot. They form a real tablist.
- **The open chapter's spine** turns ink with a clay numeral, and its page opens beside it:
  - a large outlined numeral;
  - the weeks in a clay pill;
  - the title;
  - the firm's own line;
  - a "Next: …" button ("Back to the start" on the last).
- **Opening a chapter only moves things (S0062).** The spines after it slide aside and the page travels with its spine, sliding under the spines that follow. The old page clears first, so two chapters are never blended.
- **No height jump.** The page is as tall as the longest chapter, so the section never changes height.

**Narrow screens** (the book under 820px wide: tablets and phones):
- The same mechanism turns on its side. The spines lie flat as rows (numeral, title, icon), and the chapter opens downward between them.
- The page's heading is kept for screen readers but hidden visually there, because the open row already shows the title.
- Rows are 48px on phones, 56px on tablets.

**The schedule rule:**
- The published weeks are drawn to scale, in 19 units:
  - Week 1 (1);
  - Week 1–2 (1);
  - Weeks 2–5 (3);
  - Weeks 5–6 (1);
  - Weeks 6–12 (6);
  - construction "varies" (drawn hatched, 4);
  - the final 1–2 weeks (2);
  - closeout (1).
- Week numbers 1, 2, 5, 6 and 12 mark the boundaries.
- Past stages are ink, the current one clay, the rest pale.
- **The week marker** is a 44px knob carrying a flag with the current weeks label:
  - drag it and the chapters turn live as it crosses each boundary; on release it settles in the middle of its stage;
  - a tap on the rule opens the stage under it;
  - on touch, a sideways move takes the marker and a vertical swipe scrolls the page (S1443);
  - it is a slider for assistive technology: arrows, Home and End, with a value text such as "05 Permitting, Weeks 6–12" (S1018).

**Load beat:** the spines stand up one after another, then the first chapter opens.

**Reduced motion (S0400):** no load beat, no slide, no marker travel; chapters switch at once.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **How a job runs V3** | **8** | **8** | **8** | **10** | **8.2** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.6 + 1.0 = 8.2.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **Pure type and rule:** numerals, vertical spine titles, an outlined chapter number, and the weeks as a drawn schedule. No picture.<br>**One focal point (S0083):** one open chapter, in ink and clay.<br>**Heights:** 923px at 1440 × 900 and 861px at 1024 (the site's section padding is 293px and 243px of that), against 1037px for V2 on the same measure. Phones are 1118 to 1144px. | **Phones:** about 1.35 screens, because eight 48px rows plus the open page stand in a column.<br>**Desktop:** the H2 still breaks onto two lines (the site's heading measure). |
| **Usability 8** | **Verified at 1440 mouse, 768 and 390 touch, and reduced motion:**<br>• tabs: arrows, Home, End, and wrapping from 8 to 1;<br>• the marker: two arrow presses reach Design, Home returns;<br>• "Next" works;<br>• a tap on the rule opens Permitting at weeks 6–12;<br>• a drag from 1 to the hatched span opens Construction ("06 Construction, Varies");<br>• a vertical swipe over the rule scrolls the page (276 to 317px) and leaves the stage alone.<br>**Measures:** 0 targets under 44px; 0 text under 13px; 0 overflow at 360, 390, 414, 768 and 1440; 0 errors. | On phones the chapter rows stack, so the rule sits below the fold until you scroll. The one-week stages are only about 18px wide on the rule at 390 (the marker drag and the tabs cover them). |
| **Creativity 8** | A move the section did not have: the job as a bound book of chapters, opened by sliding its spines apart, with the weeks drawn to scale so permitting's six weeks visibly dominate and construction reads as "varies". | A chapter index is an editorial convention; the craft is the transform-only opening and the schedule drag. |
| **Content 10** | **Stages:** all eight names, weeks and lines are the section's one list (`ST`), verbatim. The dated stages are drawn to their published week ranges. Construction ("varies") and closeout have no published length, so they get a fixed width: construction hatched and labelled "varies", with no week number printed after week 12.<br>**Copy:** the eyebrow, H2 and note are V1's.<br>Locks **0 fails**; outside links **0**. | |

**Vetoes checked, none tripped:**
- no console errors or warnings (V3 at 1440, 1024, 768, 414, 390 and 360, reduced motion, the single file);
- no images;
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **The section was over one screen at 1440** (963px). Fixed: a wider heading column and a shorter book (380 to 340px); now 923px, of which 293px is the site's section padding.
2. **Tablets got a 222px page** between the spines. Fixed: books under 820px use the rows.
3. **During a slide the new page started from the old chapter's place** and passed over its own spine. Fixed: it starts beside its spine wherever that spine is, travels with it, and slides under the spines that follow (z-order).
4. **The load beat could freeze a spine half-faded:** a later slide overwrote every tween on the spine. Now it overwrites only the position.
5. **The title showed twice on narrow screens** (in the open row and as the page heading). The heading is now hidden visually there and kept for screen readers.
6. **Phones were about 1.45 screens.** The rows went from 56 to 48px (still above 44); now about 1.35.

## Defects remaining (honest)
- **Phones:** about 1.35 screens tall.
- **The page arrives a beat after the slide begins.** The old page clears first, so for about 0.15s the gap is blank paper; this is by design, never two chapters at once.
- **The H2** sets on two lines at 1440.
- **Construction and closeout widths:** these are a drawing choice (4 and 1 units), not published figures; Muse should confirm the hatched treatment is clear enough.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (OH Architecture, primary)
- **Transferred:**
  - the process as numbered chapters;
  - the numeral as the lead of each chapter;
  - an editorial, type-led treatment.
- **Not transferred:**
  - OH Architecture's six stages (Elbaz has eight, its own);
  - its typography, layout and identity;
  - any renovation case chapters (the annex says they were not confirmed live).
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · the dial (default, the owner's pick) | V2 · one house, eight marks | V3 · the chapters |
|---|---|---|---|
| **Composition** | A text card left, an icon dial right | A full-width house drawing, a ground scrubber, a caption | Eight full-width spines, one chapter open, a schedule rule beneath |
| **What you do** | Pick a node; previous and next | Drag the ground line, play, tap marks | Open a spine, drag the week marker, tap the rule |
| **Time** | Weeks printed on the card | Weeks printed on the caption | Weeks drawn to scale |
| **Whole job in view** | Icons only | As marks on the house | Every title readable on the spines |
| **Where it is weaker** | Less visual | Long on wide screens | Taller on phones |

**My call:** V3 is a genuine challenger. It is the clearest reading of the whole job at once, and the only version that shows how long each stage takes. V1 remains the most compact on phones, and V2 the most illustrative. The defaults are not changed; the owner picks.

## Evidence (`qa/new/process-v3/`)
- `v3-1440-open-click-drag.jpg`: chapter 1 open; chapter 5 opened by its spine; the marker dragged into the hatched construction span.
- `v3-1440-slide-sequence.jpg`: one slide from chapter 1 to 7, frame by frame (120, 320, 520 and 1120ms).
- `v3-390-states.jpg`: the phone, at rest, Permitting, and mid-drag into Construction.
- `v3-768.jpg`: the tablet.
- `v3-1440-reduced-motion.jpg`: reduced motion.
- `v3-single-file.jpg`: V3 picked through the header switch inside the delivered single HTML file at 1440 and 390, with Permitting open.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
