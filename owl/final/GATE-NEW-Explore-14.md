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

## Scorecard (self-rating, out of 10)
| Measure | Score | Why |
|---|---|---|
| Homeowner clarity | 9 | One sentence in everyday words. Nothing to learn. |
| Distinct from V1–V13 | 9 | First version with no roof picture, no cards and no columns. The visitor writes. |
| Playfulness | 8 | The letter roll and Owl's instant reply. Restrained, never a game (only V3 is a game). |
| Path to action | 9 | Call is primary. Email carries their own words. |
| Accessibility | 9 | Real buttons, arrow keys, live sentence, axe 0 violations, 44 px targets on phone. |
| Honesty | 10 | The email is never claimed as sent. Facts lock held. |

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

## Reference transfer
- **Lando Norris, from the GATE-BUTTONS study:** the clipped, per-letter, staggered roll (`translateY(±105%)`, `cubic-bezier(.16,1,.3,1)`, 12 ms per letter). There it is a hover; here it is the whole interaction, and it is triggered by a tap, so touch gets it too.
- **Button system v2:** used unchanged on Call and Email, and inherited by the blanks (press scale, splash, focus snap).
