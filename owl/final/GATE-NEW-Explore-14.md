# GATE-NEW · Explore 14 · "Say It Your Way" (fourth of five new Explore versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Tell us what's wrong in your own words — we'll handle the rest.*
- **Primary governing reference:** Lando Norris (the clipped letter roll studied for GATE-BUTTONS, here as the whole interaction: words that roll to the next one).
- **Style family:** a single sentence in very large type, centred on the page, with three tappable blanks. No picture, no cards, no columns.
- **Signature move:**
  - The page shows one sentence: "My roof **[is leaking]** **[and it can’t wait]**. Please **[come and take a look]**."
  - Each blank is an amber-underlined button. Tap it and its words roll up, letter by letter, to the next option.
  - Under the sentence, Owl's reply changes to match ("We'll find the leak and stop it." · Roof repair).
  - Two actions finish it:
    - **Call (651) 977-6027**;
    - **Email This to Owl**, which opens the visitor's own email app with their sentence filled in. The page says the email is ready to send from there, and never that it was sent.
- **Options:**
  - **Problem:** is leaking · lost some shingles · took a storm hit · is getting old · just needs a look.
  - **How soon:** and it can’t wait · but it can wait a little · and I’m not sure how bad it is.
  - **Ask:** come and take a look · call me back · tell me straight what it needs.
- **Each problem maps to a real service:** Roof repair, Storm damage help, Roof replacement, or Wise Check.
- **How it differs from Explore V1–V13, and why it is better:**
  - Every earlier version shows a roof (a stack, a house, an age, pictures). 14 shows only the homeowner's own words.
  - Layout: one centred column of display type, versus the two-column picture-and-card layouts of 11–13.
  - It turns exploring into saying, the most natural thing a worried homeowner does, and hands them a ready message.
- **Skill ledger, per element:**
  - Kicker and title: ⟦S0451⟧ word reveal.
  - The sentence: ⟦S0451⟧ display type, set very large.
  - Each blank button: ⟦S0405⟧ letter roll to the next option (Lando mechanism), ⟦S1107⟧ keyboard (Enter, Space, and arrows Up/Down to roll back and forth), aria-live sentence, the GATE-BUTTONS press, splash and focus.
  - The underline under each blank: ⟦S0407⟧ draw-on when first seen.
  - Owl's reply line and service tag: ⟦S0409⟧ swap.
  - "Call (651) 977-6027" (primary here, because urgent homeowners call): GATE-BUTTONS primary with the phone ring.
  - "Email This to Owl": GATE-BUTTONS secondary sweep, plus an honest status line (⟦S1442⟧ form honesty).
  - Reduced motion: ⟦S0400⟧. Words swap without rolling, and the underlines are drawn.

## What was built
`src/sections/explore-v14.html` · live as `?explore=14` (defaults unchanged: `?` still shows Explore V1).

- **One centred sentence in display type:** "My roof **is leaking** **and it can’t wait.** Please **come and take a look.**"
- **Each underlined blank is a real `<button>`.** Tap, click, Enter or Space rolls the letters up to the next option. The old words leave upward and the new ones rise in, clipped by the blank (the Lando mechanism from the GATE-BUTTONS study).
  - Arrow Down rolls forward and Arrow Up rolls back.
  - Each blank's name says what it is and that it changes ("What’s happening: is leaking. Press to change.").
  - A hidden live line reads the whole new sentence aloud.
- **Owl's reply** sits under the sentence and changes with the problem blank. It has a small service tag (Roof repair · Storm damage help · Roof replacement · Wise Check) and one plain line, e.g. "We’ll find the leak and stop it."
- **Call (651) 977-6027** is the primary button: GATE-BUTTONS primary, with phone icon ring, sheen, ripple and splash.
- **Email This to Owl** is the secondary button: GATE-BUTTONS sweep.
  - It opens the visitor's own email app to info@owlroofing.com, with subject "Roof help, please". The body is the visitor's sentence plus empty Name / Address / Best phone number lines.
  - The status line says "Your email app should open with your words filled in. Send it from there, or call (651) 977-6027." It never says sent.
- **Reduced motion:** the words swap with no roll, the underlines are drawn at once and the reply doesn't animate.

## Five-question self-check (answered from my own screenshots)
Screenshots: `gates/ladder/NEW-explore-14/explore-v14-1440.jpg`, `-768.jpg`, `-390.jpg`; with the longest options picked, `explore-v14-longest-1440.jpg`, `-768.jpg`, `-390.jpg`; mid-roll, `explore-v14-mid-roll-1440.jpg`; after two taps, `explore-v14-after-two-taps-1440.jpg`.

1. **What is it for?** It lets a homeowner tell Owl what's wrong in their own everyday words. Owl answers with the service that fits, and they can call or send that sentence as an email.
2. **Do I get it in under 3 seconds?** Yes, on both screens.
   - Desktop: the first thing read is a plain sentence about my roof, with three underlined, amber parts and a small up/down mark. The lede says "Tap the underlined words".
   - Phone: the sentence fills the first screen at 33 px, with the reply and the call button just below it.
3. **Is it interesting, playful or fun, and exactly what makes it so?** Yes, in three specific ways:
   - the letters roll like a departure board each time you tap;
   - the sentence keeps reading as your own words;
   - Owl answers back straight away in a friendly line.

   It is the only version where the visitor writes something.
4. **Is every element there for a reason?**
   - Kicker, title and lede: orientation, and the one instruction.
   - The sentence: the whole interaction.
   - The up/down mark in each blank: says "this changes" without words.
   - The underline: marks what is tappable.
   - Owl's reply: proof we understood, with the real service name.
   - Call: the fastest way to start.
   - Email: for people who won't phone, and the sentence is already written.
   - Note line: honest status after the email tap.
   
   Complexity without a reason: none. A "since when" blank was removed during the build because it made broken English (see defects), and a duplicate hint line was removed.
5. **Does it fit a stressed homeowner?** Yes.
   - There are no roof words to learn (checked: no construction words in the section text).
   - The worst case, "is leaking", is the default, and "and it can’t wait" pairs with it.
   - Every path ends at a call or a ready-written message, with nothing to type except their name.
   - The tone is a person talking ("tell me straight what it needs").

## Scorecard gate (restated after Muse's format correction)
The earlier six-row self-rating (9.0) is **withdrawn**. It used my own categories, not the gate's. This is the standard scorecard used by every other gate: weights Design 40 · Usability 30 · Creativity 20 · Content 10. To pass, the weighted total must be at least 7.0, with no category under 6.0 and zero vetoes. Each score below cites the evidence it rests on and what it loses points for. The WEB-SKILLS tags cited in the plan line's per-element ledger (⟦S0451⟧, ⟦S0405⟧, ⟦S1107⟧, ⟦S0407⟧, ⟦S0409⟧, ⟦S1442⟧, ⟦S0400⟧) stand unchanged.

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.4 | 3.36 |
| Usability | 30 | 8.6 | 2.58 |
| Creativity | 20 | 8.8 | 1.76 |
| Content | 10 | 8.8 | 0.88 |
| **Total** | **100** | | **8.58** |

Recomputed: 8.4 × 0.40 + 8.6 × 0.30 + 8.8 × 0.20 + 8.8 × 0.10 = 3.36 + 2.58 + 1.76 + 0.88 = **8.58**. Pass: ≥ 7.0, lowest category 8.4 (≥ 6.0), zero vetoes (below).

### Design: 8.4
- **Evidence:**
  - `explore-v14-1440.jpg`: one centred column, with the sentence at 78 px Inter 900 as the only large element. Three amber-brown blanks with drawn underlines, the reply pill, then the two buttons.
  - `explore-v14-390.jpg`: the sentence wraps by whole words at 33 px, and the reply and the Call button sit above the fold line of a 844 px screen.
  - `explore-v14-longest-390.jpg` and `-longest-1440.jpg`: the longest options wrap cleanly, with 0 px sideways scroll at 1440, 768 and 390 (checks).
  - Light background only; palette and type from the locked identity; buttons from the GATE-BUTTONS system.
- **Loses points for** two remaining defects, R1 and R2 below:
  - the width snap at the end of a roll;
  - on phone, the up/down mark of a two-line blank sits at the far right edge, away from the words (`explore-v14-longest-390.jpg`).
  
  The page is also very plain by design. That is a choice, not a defect, but it gives the eye nothing besides type.

### Usability: 8.6
- **Evidence (checks.json, 24/24):**
  - every blank is a real `<button>` with a name that ends "Press to change.";
  - Enter, Space, Arrow Down and Arrow Up all work (checks "keyboard: ArrowDown…" and "ArrowUp rolls back");
  - a live line reads the whole sentence ("the screen-reader line reads the whole sentence");
  - all controls are at least 44 px on desktop and on phone;
  - axe WCAG 2.1 A/AA finds 0 violations;
  - reduced motion is clean;
  - Call is the real phone;
  - the email hand-off never claims it was sent.
- **Loses points for:**
  - discoverability rests on the lede ("Tap the underlined words") and the small up/down mark, with no first-tap nudge (R4);
  - Email This to Owl relies on a mail app being set up, and on a desktop without one nothing visible happens except the status line, which offers the phone number (R5);
  - forward-only tapping means a visitor who passes their option must cycle round (arrows go back, taps do not).

### Creativity: 8.8
- **Evidence:**
  - this is the only Explore version of 14 where the visitor writes something. V1 to V13 all show a roof, a house, pictures or cards (plan line, "How it differs");
  - the letter roll turns choosing into a small pleasure (`explore-v14-mid-roll-1440.jpg`: old letters leaving upward, new letters rising, clipped at the blank);
  - Owl answers straight away (`explore-v14-after-two-taps-1440.jpg`).
- **Loses points for:**
  - fill-in-the-blank sentences are a known pattern (mad-libs forms);
  - the novelty here is the homeowner framing and the roll, not the format.

### Content: 8.8
- **Evidence:**
  - every one of the 45 combinations (5 × 3 × 3) reads as correct English; the "since when" blank was removed for that reason (fixed defect 5);
  - every problem maps to a real Owl service, and only facts from the lock are used ((651) 977-6027, info@owlroofing.com, the 10-year workmanship warranty);
  - no construction words (check passes);
  - the tone is a person talking.
- **Loses points for** R3: Owl's reply follows only the problem blank. Choosing "and it can’t wait" does not change the reply, so the urgency the visitor states goes unacknowledged on the page (it does reach Owl in the email).

## Checks: `gates/ladder/NEW-explore-14/checks.json` · **24/24 PASS**
- default view still V1 only; version count 14; only V14 visible; anchor id; one h2;
- controls ≥ 44 px (desktop and phone); facts lock;
- the centred sentence with three named blanks; the leak reply;
- mid-roll (two layers moving); "took a storm hit" → Storm damage help;
- ArrowDown → "is getting old" → Roof replacement with the 10-year workmanship warranty;
- ArrowUp rolls back; the screen-reader sentence;
- the email hand-off is honest; no construction words; the call button is the real phone;
- axe WCAG 2.1 A/AA 0 violations; no errors;
- no sideways scroll at 1440, 768 or 390; reduced motion clean.

Regression: `home-verify.cjs` **50/50 PASS**.

## Defects found from my own screenshots, and fixed
1. **Class clash.** The global `.in` class hid the inner column, so it was renamed (`.ctr`, and `.enter` for the incoming line).
2. **Copy.** "Tap the orange words" became "underlined", because the words are amber-brown and the underline is the real cue. The duplicate hint under the buttons was removed.
3. **Orphaned full stop on phone.** The stop dropped to its own line. The stops now sit inside blanks 2 and 3, so they roll with the words.
4. **Long options overflowed the phone.** A first fixed-width measure overflowed with "tell me straight what it needs". The roll now wraps by whole words (each word is an unbreakable span inside a wrapping line), so long options break cleanly onto two lines and the roll still clips correctly. Verified with the longest options at 390, 768 and 1440: 0 px sideways scroll.
5. **Broken English.** The original "since when" blank produced "My roof is leaking since this week" and "lost some shingles since the last storm". It was replaced with a "how soon" blank, which reads correctly with every problem: and it can’t wait · but it can wait a little · and I’m not sure how bad it is.
6. **Phone targets.** The blanks measured 43 px tall at 390, so a 44 px minimum height was added.
7. **Evidence.** The cursor-companion owl drifted over "Please" in the shot. `sec-shots.cjs` now hides `.owlc` by default (`OWL=1` shows it), the same as the GATE-BUTTONS evidence. This is a tool change only; the site is unchanged.

## Remaining defects (honestly named, not fixed in this gate)
- **R1 · width snap at the end of a roll (Design).**
  - While a blank rolls, the old and new words share one grid cell, so the blank holds the wider width. When the old words are removed about 650 ms later, the blank snaps to the new width and the centred words around it shift sideways.
  - Measured with `gates/ladder/NEW-explore-14/jump14.cjs` (output in `jump14.txt`), "lost some shingles" → "took a storm hit": 715 → 599 px at 1440 (116 px) and 301 → 252 px at 390 (49 px). The sentence height does not change.
  - Proposed fix: animate the blank's width from old to new during the roll (measure both, then transition `width`), or remove the old line at the midpoint of the roll.
- **R2 · up/down mark detached on two-line blanks (Design, phone).** When a blank wraps to two lines, the button stretches to full width and the mark sits at the right edge, away from the words. Proposed fix: place the mark inline after the last word.
- **R3 · the reply ignores urgency (Content).** Proposed fix: when "and it can’t wait" is chosen, add one plain line to the reply ("Call us and we’ll come as soon as we can."). No promised times, because none are in the facts lock.
- **R4 · no first-tap nudge (Usability).** Earlier I removed a duplicate hint line; nothing replaced it. Proposed fix: one gentle bounce of the first blank's mark the first time the sentence comes into view, skipped under reduced motion.
- **R5 · email depends on a mail app (Usability).** This is how `mailto:` works and it is not fully fixable without a form. The status line already offers the phone number. A "copy my sentence" fallback would close the gap.
- **R6 · test coverage gap.** The email check confirms only the honest status line. It does not read the generated `mailto:` address, subject or body. Proposed fix: intercept `location.href` in the test and assert all three.

## Vetoes checked: **zero vetoes**
- **Identity changed:** none. Locked palette, Inter, owl mark and button system.
- **Invented facts, quotes, reviews or jobs:** none. Only (651) 977-6027, info@owlroofing.com, the 10-year workmanship warranty and the service names. The facts-lock check passes.
- **Dark background:** none. Light background only.
- **Roofer-incorrect claim:** none. No construction terms, and no promise of times or prices.
- **Form claims saved or sent:** none. The status says the email app "should open", and the check passes.
- **Defaults changed:** none. The default view still shows Explore V1 (check passes; home-verify 50/50).
- **A second game:** none. This is a sentence, not a game; Explore V3 remains the only game.
- **Bot wall bypassed:** none. Nothing was fetched for this version.
- **Sub-agents or background tasks:** none (statement below).

## Reference transfer: Lando Norris
**What transfers**
- **The clipped letter roll:** each letter is its own element inside an `overflow:hidden` window, translated by ±105 %, so the old word leaves upward as the new one rises in.
- **Timing:** a per-letter stagger of 12 ms, and the curve `cubic-bezier(.16,1,.3,1)`, which is fast out and soft landing.
- **The text itself is the moving thing,** with no extra shapes or effects.

**What does not transfer, and why**
- **Hover as the trigger.** On Lando's site the roll fires on hover and returns on leave. Here it fires on tap or key and stays, because a stressed homeowner on a phone has no hover, and the new words are the content, not decoration.
- **The roll returning to the same word.** Lando's roll swaps a label for a copy of itself. Here each roll moves to a different option, so the roll means "changed", not "you are pointing here".
- **Lando's scale, colour, dark backgrounds and motorsport energy.** The page stays on Owl's light cream with amber accents, and the motion stays restrained (one roll per tap, nothing looping).
- **Cursor-led effects.** None are used. Touch and keyboard get the full interaction.

The GATE-BUTTONS system v2 is used unchanged on Call (primary: phone ring, sheen, ripple) and Email (secondary: sweep). The blanks inherit its press scale, tap splash and focus snap.

## Process statement
- **No sub-agents and no background tasks were used** for Explore 14 or for this restatement.
- All work ran in my main turn as short foreground commands, each with an explicit time limit (the longest was 235 s, for the ladder test).
- No parallel sessions. Nothing was published; the work is in the repository only, on `claude/sweet-hypatia-it8evf`.

## STOP
Explore 14 stops here for Muse's judgment. Explore 15 does not start until Muse accepts this gate.
