# GATE-RESET-7 · Section 7 "Tell us what's going on." (the call panel, the end card)

**Where:** on `owl-reset.html`, the last section, after the towns (6). The sky turns to evening. Source: `reset/sections/07-call.html`.

**Treatments shown:** Night Owl and **Owl today (control)**. All four palettes pass axe.

## 1. What it is (one homeowner sentence)
*Here's the number, set huge; we're open right now (or here's when we open); and if you'd rather write, your email is already filled in.*

- **The number is the end card:** "(651) 977-6027" set as type, up to 172 px, with an accent line that draws under it. The whole number is one `tel:` link; a phone icon rings on hover.
- **The owl flies in** and lands on the end of the number as it arrives. It is the site's own owl illustration.
- **The line above it is written for you,** from the case chosen in section 2: "Tell us about the leak." / "…the stain." / "…the shingles." / "…the storm." / "…your roof." / "Tell us what you're seeing." With no choice it reads "Tell us what's going on."
- **Today's hours, live:** in Shoreview time (America/Chicago), from the stated Mon–Sat 08:00–18:00:
  - "Open now · Until 18:00 today";
  - "Closed now · We open today at 08:00" (early morning);
  - "…tomorrow at 08:00" (weekday evening);
  - "…Monday at 08:00" (Saturday evening and Sunday).
- **A week strip:** seven columns, each a 24-hour track with the 08:00–18:00 bar, and Sunday "closed". Today is in the accent colour, with a line at the current time.
- **"Rather write?"** A small card shows what the page already knows: **Your roof** (section 2's choice) and **Your town** (section 6's answer), each with a Change link back to its section. "Write it in my email app" opens a `mailto:` with:
  - the subject "Roof help: <your case>";
  - a body that already has your case and your town, with blanks for your name, phone, address and best time to call.

  After you press it, the site's own note appears, word for word: "Your email app should open with these details. Send it from there, or call (651) 977-6027."
- **The closing line:** the logo, Owl Roofing LLC, the Shoreview address, MN licence #BC809662, info@owlroofing.com and "We Give a Hoot".
- **The call pill steps aside here** (`data-nocall`): the number on the page is the call.
- **Not pinned.**
- **What this section replaces:** the old booking form (three steps of radios and fields) and the footer.

## 2. Mechanism evidence: Longbow, studied live
**The sheet:** `gates/reset/s7/mechanism-side-by-side.jpg`. It sets three Longbow frames beside three of mine. The phone frames are in `phone-strip.jpg`.

**What the Longbow probe captured** (`reset/evidence/longbow/`: `sheet.jpg`, frames 060, 075 and 090, `facts.json`):
- **A restrained end card:** "Be the first to know" and then "Choose your Longbow". It is one line set large on a quiet ground, with one action.
- **A strict spec row:** "895 kg · 3.5 s · 275 mi · £84,995 · 150". Hard numbers, small units, nothing decorative.
- **The persistent "Reserve yours" pill** sits in the bottom bar the whole way down. It is the one action, never far away.

**Transferred:**
- **The end is one large line, and the line is the action:** for Longbow, "Choose your Longbow"; for Owl, the phone number itself.
- **A strict row of hard facts:** the week of hours, as plain as the spec row.
- **The persistent action:** Owl's call pill has run the whole page. At the end it gives way to the number, so the action is never doubled.

**What does not transfer, and why:**
- **The dark, cinematic ground and the serif italics.** Owl's end is on the light evening sky, in Inter.
- **The newsletter sign-up.** Owl has no newsletter. It offers a prefilled email to a person, not a mailing list.
- **"Reserve yours":** there is nothing to reserve. A roof starts with a call.

## 3. Five-question homeowner check (from the screenshots, per treatment)

### Night Owl
**Screenshots:** `night-1440-*.jpg` and `night-390-*.jpg`.

1. **What is it for?** Calling them now, or writing to them if I'd rather.
2. **Under 3 seconds?** Yes. The phone number is the biggest thing on the screen, and "Open now" sits right under it.
3. **Interesting, playful or fun, and exactly what makes it so?**
   - The owl flies in and lands on the number.
   - The page remembers me: "Tell us about the leak." and "Your town: Roseville" are things I told it earlier, and they are already in the email.
   - The week strip shows "now" as a line on today.
4. **Is every element there for a reason?** The line (what to say), the number (how to reach them), open now (whether someone's there), the week (when, if not now), the note (the other way in, already filled), Change (fix what it remembered), and the closing line (who they are, legally). Complexity without a reason: none.
5. **Does it fit a stressed homeowner?** Yes. One giant thing to tap, a clear "open now", and no form to fill: the email is already written for me.

### Owl today (control)
**Screenshots:** `control-1440-*.jpg` and `control-390-*.jpg`. The same answers; the amber line and today's bar read warmer. Both work.

## 4. Skill ledger
- **The number:** ⟦S1441⟧ a huge target; ⟦S1452⟧ peak-end (the end is the best moment, not a form); ⟦S0409⟧ masked rise; ⟦S0407⟧ the line drawn under it.
- **The owl landing:** ⟦S1445⟧ interfaces that feel.
- **Written for you:** ⟦S1455⟧ shared state (sections 2 and 6 feed the headline, the note and the email).
- **Hours:** ⟦S1428⟧ a strict grid; ⟦S1420⟧ data as an event (now as a line on today).
- **Email:** ⟦S1442⟧ forms, cut to one button; the honest note, word for word; no claim that anything was sent.
- **The GATE-BUTTONS system:**
  - the number is the primary action, as a type-set link with its own lift and press;
  - "Write it in my email app" is the secondary `btn-line`;
  - there is no Book + Call row (skeleton rule).
- **Reduced motion:** ⟦S0400⟧. The number, the line and the owl are in place at once.

## 5. Checks: `gates/reset/s7/checks.json` · **22/22 PASS** (`tools/reset-test.cjs call`)
- **axe WCAG 2.1 A/AA:** 0 violations in all four palettes, after two fixes (see §7).
- **Facts and skeleton:** the facts lock passes, and the no-skeleton rule passes.
- **Hours, live, from a fixed clock:**
  - Wed 10:20 shows open until 18:00;
  - Wed 06:00 opens today at 08:00;
  - Wed 19:00 opens tomorrow;
  - Sat 19:00 and Sunday noon open Monday;
  - today's column is correct each time.
- **The week strip:** seven days, Mon–Sat 8–6, Sunday closed, and a now line on today.
- **Not pinned,** and the call pill steps aside in this section.
- **The number:** a real `tel:+16519776027` link, at least 120 px on desktop, with a spoken label.
- **With nothing chosen:** "Tell us what's going on." and "Not chosen yet" twice.
- **Written from real use:**
  - the test clicks "After a storm" in section 2 and types "Stillwater" in section 6;
  - the headline becomes "Tell us about the storm.";
  - the note shows both choices;
  - the email subject is "Roof help: After a storm", and the body includes "My town: Stillwater".
- **The honest email note,** word for word.
- **The closing line** has only locked facts.
- **Layout:** no sideways scroll at 1440, 768 or 390; controls at least 44 px.
- **Reduced motion:** no looping animation.
- **No page or console errors.**

Section 6 was re-run after it began sharing the town: **26/26**.

## 6. Scorecard (weights Design 40 · Usability 30 · Creativity 20 · Content 10)

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.3 | 3.32 |
| Usability | 30 | 9.1 | 2.73 |
| Creativity | 20 | 8.1 | 1.62 |
| Content | 10 | 8.9 | 0.89 |
| **Total** | **100** | | **8.56** |

Recomputed: 8.3 × 0.40 + 9.1 × 0.30 + 8.1 × 0.20 + 8.9 × 0.10 = 3.32 + 2.73 + 1.62 + 0.89 = **8.56**. Pass: ≥ 7.0, lowest category 8.1, zero vetoes.

**Why not higher:**
- **Design:** the lower half (the week and the note) is tidy but ordinary next to the number.
- **Creativity:** the strongest idea is invisible until you have used the page. The end remembers you, but a visitor who skipped sections 2 and 6 sees "Not chosen yet".

**"Same kind as anything already on the page?"** No. It is the only section whose job is to be acted on, and it is built from what the visitor did on the sections above it.

## 7. Defects found and fixed in-session
1. **The owl sat on the headline on phone.** It now lands beside "(651)", on the short first line of the number.
2. **The definition list held bare links** (an axe `definition-list` violation). Each row is now a `div` of `dt` and `dd`, with Change in its own `dd`, plus specific labels ("Change your town").
3. **The "closed" label under Sunday** used 50 % ink and failed contrast in Night, Safety and Slate. It is now 70 % ink.
4. **The note broke the phone number across lines** on phone ("977-" / "6027"). The number is now kept on one line.
5. **Section 6 did not share the town.** It now stores the town and fires `owl:town`, as section 2 does with `owl:case`.

## 8. Remaining defects (named)
- **D1 · "open" means the stated hours,** not that someone is free at that minute. The wording says "Open now · Until 18:00 today", which is the posted hours; it promises no answer time.
- **D2 · public holidays** are not known to the page; on a holiday it will still say "Open now". The owner could supply a closed-days list.
- **D3 · `mailto:` depends on an email app.** On a computer with none, nothing opens; the note offers the phone number for that reason, as the site's own form did.
- **D4 · no sky change you can feel.** The evening sky is subtle on light palettes; the end does not feel like dusk the way the plan imagined.

## 9. Vetoes: **zero**
- Only locked facts: the number, hours, address, licence, email and slogan.
- The site's own email note, word for word.
- No claims of response times, no "someone will call you back", and nothing said to be sent.
- The logo is unchanged; the owl illustration is the site's own.
- A light ground.
- No sub-agents or background tasks; every command ran in my thread, in the foreground, with a time limit.

## 10. New best: the default the homepage shows (owner's order, 05:15)
**The choice:** Section 7, the call panel as built and gated above, in **Night Owl**, is the new best. It is the version the finished homepage, `owl-roofing.html`, shows by default.

**What it stands in for:** **Booking** (9 versions and 1 backup) and the past footer (inside every past page). Nothing was deleted. Every one of those versions is kept in the same file as **PAST**, an inert record of the whole past homepage, and opens with ?past&booking=9 (any version number works). The past page carries a chip back to the new one.

**Treatments compared:** Night Owl and Owl today. Both work; Night Owl is chosen at page level.

**Why this is the best:**
- The past Booking versions were forms of three steps. The new end card is the phone number set as type, live opening hours and an email already written from the visitor's own choices. It asks for nothing to be filled in.
- It keeps the past form's honesty, word for word ("Your email app should open with these details…").
- It is the top score of the night (8.56), and the strongest ending: the page remembers you.
- **One palette for the whole page.** The sky and the owl run as one world, and a palette per section would break it. Night Owl is the working default under the owner's grant (contrast and reasoning in the diagnosis §5). The other three palettes stay one switch away in the top bar.

**Checks on the finished homepage:** this section's checks were re-run on `owl-roofing.html` itself, not only on the workbench page. They all pass (`checks.json` in this gate's folder).
