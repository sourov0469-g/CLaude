# GATE-NEW · Wise Check 13 · "Pick Your Day" (fourth of five new Wise Check versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Pick a day that suits you, and we'll come and take a careful look.*
- **Primary governing reference:** Graza: one charming, physical detail done with care. Here it is the owl asleep on Sunday.
- **Style family:** a week laid out as seven big day tiles in one row, Monday to Sunday, with two time-of-day pills under it and one plain sentence that writes itself from your picks.
  - There are no pictures and no explanation of the check: just "when suits you?".
  - Sunday is the charm. Its tile holds a sleeping owl ("Our day off"), because Owl works Monday to Saturday, 8 to 6. Tapping it gives a sleepy wiggle and "Sunday’s our day off. Any other day works."
- **Signature move:**
  - Tap a day: it lifts and fills amber with a check.
  - Tap Morning (8 to 12) or Afternoon (12 to 6): the sun in the pill sits low or high.
  - The sentence and the main button update as you choose: "Tuesday morning suits me." · **Ask for Tuesday morning**.
  - The button opens the visitor's own email to info@owlroofing.com with the subject "Wise Check request" (the same as the site's booking forms), the chosen day and time, and empty Name / Address / Best phone number lines.
  - The note says exactly what the site's booking forms say: "Your email app should open with these details. Send it from there, or call (651) 977-6027." It never says booked or sent.
  - Choosing is optional. Before any choice the button reads **Ask for a Wise Check** and works, so the main button is never shown disabled (the lesson from Explore 15's D1).
- **Facts used:** Mon–Sat 08:00–18:00, (651) 977-6027 and info@owlroofing.com, all from the facts lock. Nothing on price, how long a check takes, or how soon we come.
- **Actions:** **Ask for …** (primary; it builds the email) and **Call (651) 977-6027** (secondary).
- **How it differs from Wise Check V1–V12, and why it is better:**
  - V1–V12 all explain or show the benefit (parts, cases, a ladder, a fog wipe, worry bubbles). 13 is the first whose whole job is the next step: when can we come?
  - It takes the homeowner from "I should get it looked at" to a ready request in two taps.
  - Layout: a calendar week strip, unlike every earlier Wise Check version.
- **Skill ledger, per element:**
  - Title: ⟦S0451⟧ word reveal.
  - The day tiles: a radio group with arrow keys (⟦S1107⟧ keyboard, roving focus), ⟦S1441⟧ big targets, ⟦S0405⟧ select lift with a check, ⟦S1444⟧ Hick's law (six real choices plus "any day").
  - The Sunday owl: ⟦S0489⟧ calm, believable character motion (breathing "Zzz", a sleepy wiggle when tapped); ⟦S1435⟧ the one deviation in the row.
  - The time pills: a radio group with sun icons; ⟦S0458⟧ the sun's height shows the choice.
  - The self-writing sentence and the button label: ⟦S0409⟧ swap; ⟦S1440⟧ feedback.
  - Sending: ⟦S1442⟧ form honesty (the same wording as the booking forms); ⟦S1439⟧ the Sunday nudge in place of an error.
  - Call: GATE-BUTTONS secondary with the phone ring. The Ask button: GATE-BUTTONS primary.
  - Reduced motion: ⟦S0400⟧. No lift, no Zzz drift and no wiggle; states swap at once.

## What was built
`src/sections/wise-v13.html` · live as `?wise=13` (defaults unchanged: `?` still shows Wise Check V1).

- **Header** (centred): the kicker "The Wise Check", the title **Pick Your Day**, and one line: "Tell us when suits you, and we’ll come and take a careful look at your roof."
- **The week:** under "Which day suits you?", seven big tiles in one row: Mon, Tue, Wed, Thu, Fri and Sat (each "8 to 6"), then Sun.
  - The six working days are a `radiogroup` of `radio` buttons with roving focus (arrow keys move the choice).
  - A chosen day lifts, fills amber and gets an ink check.
  - The Sunday tile is a plain button, not part of the group. It shows the owl asleep (closed eyes, a drifting "zZ"), "Sun" and "Our day off". Tapping it gives a sleepy wiggle and the note "Sunday’s our day off. Any other day works."
- **Time of day:** two pills in their own radio group: **Morning** (8 to 12), where the sun sits low on the horizon, and **Afternoon** (12 to 6), where it sits high. When chosen, the sun rises a little and the pill fills amber.
- **The card:**
  - A sentence writes itself: "Any day suits me." → "Tuesday suits me." → "Wednesday morning suits me.".
  - The main button relabels in place, keeping the GATE-BUTTONS letter roll and updating its spoken name: **Ask for a Wise Check** → **Ask for Tuesday** → **Ask for Wednesday morning**.
  - **Call (651) 977-6027** sits beside it.
- **Asking:**
  - It opens the visitor's email to info@owlroofing.com with the subject "Wise Check request" and a body of "Best day", "Best time", then Name / Address / Best phone number. With no choice it says "Any day, Monday to Saturday" and "Any time, 8 to 6".
  - The note is word for word the site's booking-form note: "Your email app should open with these details. Send it from there, or call (651) 977-6027."
- **Phone:** the week wraps four and three; the two time pills sit side by side.
- **Reduced motion:** no lift, no "zZ" drift, no wiggle and no sentence slide.

## Five-question self-check (answered from my own screenshots)
**Screenshots** (all in `gates/ladder/NEW-wise-13/`):
- nothing chosen: `wise-v13-1440.jpg`, `-768.jpg` and `-390.jpg`;
- Tuesday morning chosen: `wise-v13-picked-*.jpg`;
- Friday afternoon, then Sunday tapped: `wise-v13-sunday-*.jpg`.

1. **What is it for?** It lets a homeowner tell us which day and time suit them for a Wise Check, and hands them a ready request.
2. **Do I get it in under 3 seconds?**
   - Desktop: yes. "Pick Your Day" over a row of weekday tiles is instantly familiar.
   - Phone: yes. The title and the full week are on the first screen.
3. **Is it interesting, playful or fun, and exactly what makes it so?** Yes, in three specific ways:
   - the Sunday owl is asleep and wiggles if you poke it;
   - the sun sits low for morning and high for afternoon;
   - your sentence and the button rewrite themselves as you tap ("Ask for Wednesday morning").

   The play is small and warm, and it never slows the task.
4. **Is every element there for a reason?**
   - The day tiles: when.
   - "8 to 6": our hours, so nobody wonders.
   - Sunday: honest hours, with a smile.
   - The time pills: morning or afternoon.
   - The sentence: confirms what you picked, in your words.
   - The Ask button: sends it.
   - Call: for people who'd rather talk.
   - The note: an honest status.

   Complexity without a reason: none found.
5. **Does it fit a stressed homeowner?** Yes.
   - It is the shortest path from worry to action on the whole site: two taps and a button, or one button.
   - Nothing has to be filled in on the page.
   - Call is right there.

## Scorecard gate
Weights: Design 40 · Usability 30 · Creativity 20 · Content 10. To pass, the weighted total must be at least 7.0, with no category under 6.0 and zero vetoes. The WEB-SKILLS tags cited in the plan line's per-element ledger stand as written:

> ⟦S0451⟧, ⟦S1107⟧, ⟦S1441⟧, ⟦S0405⟧, ⟦S1444⟧, ⟦S0489⟧, ⟦S1435⟧, ⟦S0458⟧, ⟦S0409⟧, ⟦S1440⟧, ⟦S1442⟧, ⟦S1439⟧, ⟦S0400⟧

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.4 | 3.36 |
| Usability | 30 | 8.6 | 2.58 |
| Creativity | 20 | 8.0 | 1.60 |
| Content | 10 | 9.0 | 0.90 |
| **Total** | **100** | | **8.44** |

Recomputed: 8.4 × 0.40 + 8.6 × 0.30 + 8.0 × 0.20 + 9.0 × 0.10 = 3.36 + 2.58 + 1.60 + 0.90 = **8.44**. Pass: ≥ 7.0, lowest category 8.0 (≥ 6.0), zero vetoes (below).

### Design: 8.4
- **Evidence:**
  - `wise-v13-picked-1440.jpg`: a clean week row with one amber lifted day, two pills, and a white card holding the sentence and buttons.
  - `wise-v13-sunday-390.jpg`: the phone wraps the week four and three, and the sleeping owl reads at small size.
  - Light cream, locked palette, Inter and the GATE-BUTTONS system.
  - 0 px sideways scroll at 1440, 768 and 390.
- **Loses points for** D1 and D2 below:
  - the sun icons in the time pills are crude (a square horizon block under a dot);
  - at tablet width the card leaves an empty band under the sentence, and the buttons span the full width.

### Usability: 8.6
- **Evidence (checks.json, 25/25):**
  - two radio groups (six working days; morning and afternoon) with spoken names;
  - Sunday is outside the group and never chosen;
  - the main button works from the start (no disabled state);
  - asking with no choice sends "any day, any time";
  - Tuesday lifts, and the sentence and label follow;
  - ArrowRight moves the choice and focus;
  - the morning choice joins the sentence;
  - the Sunday nudge appears;
  - the final email carries the day and time, with the address, subject and body asserted;
  - the note matches the booking forms;
  - controls at least 44 px on desktop and phone;
  - axe 0 violations;
  - reduced motion is clean.
- **Loses points for** U1 below: until the button is pressed, nothing says this is a request rather than a booking, so "Pick Your Day" could read as a live calendar.

### Creativity: 8.0
- **Evidence:** the sleeping Sunday owl and the low and high sun make a booking widget warm and specific to Owl.
- **Loses points for:** a week-of-days picker is a standard booking pattern. The originality is in the details, not the structure.

### Content: 9.0
- **Evidence:**
  - only locked facts: Mon–Sat 08:00–18:00 (shown as "8 to 6", "8 to 12" and "12 to 6"), info@owlroofing.com and (651) 977-6027;
  - no price, duration or arrival promise (checked);
  - no construction words (checked);
  - the honest note is word for word the site's booking forms.
- **Loses points for** U2 below: it overlaps with the Booking section's job.

## Checks: `gates/ladder/NEW-wise-13/checks.json` · **25/25 PASS**
- **Generic checks:**
  - the default view still shows V1;
  - the version count;
  - only V13 is visible;
  - the anchor id;
  - one h2;
  - controls ≥ 44 px;
  - the facts lock;
  - axe 0 violations;
  - no errors;
  - no sideways scroll at 1440, 768 or 390;
  - phone controls ≥ 44 px;
  - reduced motion is clean.
- **Version checks:**
  - the week and the starting state;
  - the email with no choice;
  - the honest note;
  - Tuesday;
  - ArrowRight;
  - Morning;
  - the Sunday nudge;
  - the email with the choice;
  - hours only as locked, with no promises;
  - no construction words;
  - the real phone.

Regression: `home-verify.cjs` **50/50 PASS**.

## Defects found from my own screenshots, and fixed
1. **"Any weekday" left out Saturday**, which Owl works. It now reads "Any day suits me." (and "any morning" or "any afternoon" when only a time is picked).
2. **The sleeping owl read as wearing sunglasses** (amber arcs over dark lids). The eyes are now plain closed-eye ink arcs, which read as asleep at small size.
3. **Relabelling the main button without breaking the button system.** GATE-BUTTONS wraps each label in letter spans and caches a spoken name. The section relabels in place (the same letter structure, and the spoken name updated), and the checks assert both.

## Remaining defects (honestly named, not fixed in this gate)
- **D1 · crude sun icons (Design).** A square horizon block sits under the sun dot. Proposed fix: a proper horizon line with a half-sun clipped below it for morning, and a full sun with short rays for afternoon.
- **D2 · tablet card (Design).** Between 641 and 860 px the card has an empty band where the note will go, and the buttons span the full width. Proposed fix: let the note's space collapse until it has text, and cap the buttons at 420 px.
- **U1 · request, not booking (Usability).** Proposed fix: one quiet line under the sentence before asking: "This sends us a request; we’ll be in touch to settle the time." The owner should approve the wording, since it is a service promise.
- **U2 · overlap with Booking (Content and information architecture).** A day-and-time request inside Wise Check partly duplicates the Booking section. If the owner prefers one place to book, this version should hand off to `#book` with the day pre-selected, instead of sending its own email.

## Vetoes checked: **zero vetoes**
- **Identity changed:** none. Locked palette, Inter, owl mark and button system.
- **Invented facts:** none. Hours, email and phone come from the lock; there is no price, duration or arrival time.
- **Form claims saved, sent or booked:** none. It uses the booking-form note word for word, and the check passes.
- **Photos:** none are used.
- **Dark background:** none.
- **Teaching roofing:** none. No construction words (checked).
- **Defaults changed:** none. The default view still shows Wise Check V1 (home-verify 50/50).
- **A second game:** none. Explore V3 remains the only game.
- **Bot wall bypassed:** none. Nothing was fetched.
- **Sub-agents or background tasks:** none (statement below).

## Reference transfer: Graza
**What transfers**
- **One charming, physical detail done with care:** Graza's bottle has a personality, and here the Sunday owl sleeps and wiggles when poked.
- **Warm tactility:** tiles that lift, and a sun that rises.
- **Making a dull task (choosing a day) feel like the brand rather than a form.**

**What does not transfer, and why**
- **Graza's lime-and-green palette, illustration style and jokey copy.** Owl stays cream, amber and ink, and plain.
- **E-commerce checkout.** The end is a request in the visitor's own email, or a call, never a payment or a confirmation the site can't make.
- **Graza's scroll-led product storytelling.** Nothing scrolls or plays here except the visitor's own taps.

## Process statement
- **No sub-agents and no background tasks were used** for Wise Check 13.
- All work ran in my main turn as short foreground commands, each with an explicit time limit (the longest was 235 s).
- No parallel sessions. Nothing was published; the work is in the repository only, on `claude/sweet-hypatia-it8evf`.

## STOP
Wise Check 13 stops here for Muse's judgment. Wise Check 14 does not start until Muse accepts this gate.
