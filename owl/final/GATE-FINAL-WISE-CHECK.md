# GATE-FINAL-WISE-CHECK · section 3, "Clear It Up" (ONE final version, three beats in the plan's exact order)

**Sources merged:** (1) OLD Wise Check V11 "Clear It Up": the image and the clearing-up effects **only** (no text block, no CTA, no buttons); (2) OLD Wise Check V13 "Pick Your Day": day, then time (no CTA); (3) OLD Explore V14 "Say It Your Way": tap the underlined words; the sentence fills an email they can send, or they can call.
**File:** `src/final/sections/03-wise-check.html` (id `wise-check`, the header's "Wise Check" link lands here) · **Evidence:** `gates/final/wise-check/` (`fog.png`, `clear.png`, `pick.png`, `words.png`, `s-1440.png`, `s-390.png`, `checks-wise-check.json`).

## 1. Think first: one idea
**One story, one email.** *Wipe the window to see a clear picture, say when suits you, say what's up in your own words: and everything you chose becomes one email, already written.*
- Beat 1 (V11): a house behind fogged glass, a "Wipe here" hint, a demo stroke on first view, condensation beads, "Clear view" appears at 50 % wiped. No text block, no buttons. The pane is the control; Enter or Space clears it (and fogs it again) for keyboard users.
- Beat 2 (V13): Monday to Saturday as day tiles, a sleeping Sunday owl ("Our day off"), then Morning (8 to 12) or Afternoon (12 to 6); a line that writes itself ("Tuesday morning suits me."). Its Ask and Call buttons are removed.
- Beat 3 (V14): the big sentence with three underlined words that roll when tapped; Owl's one-line answer; and **a live email card** (To / Subject / the body with your sentence, day and time) with *Email This to Owl* and *Call (651) 977-6027*.

Ideas weighed and the issues found:
1. *A stepper rail (1 · 2 · 3)*: rejected, one more control with no job; the three beats follow each other on the page.
2. *Locking beats 2 and 3 until the fog is cleared*: rejected, it would hide a working form behind a toy; every beat works at any time.
3. *The day and time only flow into the email* (V13's own Ask button dropped, per the plan): chosen. Issue found: the visitor could not see where their choices went. **Fix:** the live email card shows the exact text before it opens.
4. Finger wiping on phones competes with scrolling: `touch-action: pan-y` keeps scrolling, the demo stroke shows the idea, clearing needs 50 % (was 55 %), and the keyboard path exists.
5. Typed text is never injected as markup (all card text is `textContent`; the mailto body is `encodeURIComponent`).
Section length: about 1570 px at desktop, 1100 px on phones, with the sentence set at 62 px instead of V14's 78 px.

## 2. Five questions (homeowner)
1. **What is it for?** Ask Owl to look at my roof, my way, without a form.
2. **Under 3 s?** Yes: a foggy house window, "Clear It Up".
3. **Fun?** Wiping the fog; a sleeping owl on Sunday; words that roll.
4. **Every element earns its place?** Window, day, time, sentence, answer, email card, two actions. Yes.
5. **Stressed?** No form: three taps and an email that is already written; or just call.

**Skill ledger:** ⟦S1107⟧ radiogroups are real radios · ⟦S0544⟧ causal motion · ⟦S0451⟧ title reveal · ⟦S1273⟧ the result is written out · ⟦S1259⟧⟦S0405⟧ buttons.

## 3. Checks (`node tools/final-test.cjs wise-check`): **25/25**
axe 0 · facts lock · no maps · distinct media (hero-pines is used only here) · order p1 → p2 → p3 with no buttons or links in the first two · pointer wiping clears the fog and "Clear view" shows · Enter toggles fog/clear · six days + Sunday owl + two times · "Tuesday morning suits me." · Sunday answers honestly · the words and the day appear in the mailto (address, subject, sentence, Tuesday, morning) and in the visible card · reply names a service · call is the one number · no markup injection · sharp at 1440 (0.93×) and 390 DPR 2 (0.58×) · layout and 44 px controls at 1440/768/390 · reduced motion · no errors.

## 4. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.5 | 8.5 | 8.7 | 8.7 | **8.57** (3.40 + 2.55 + 1.74 + 0.87) |

## 5. Defects found and fixed in-session
1. The section registered under the wrong key, so no beat started; fixed.
2. "Clear view" never appeared (its rule was lost in the merge); restored.
3. The "no maps" check read script text and flagged `.map(`; it now reads visible text and names only.

## 6. Remaining
- **D1:** the photo is stock (Illustrative, labelled); a real Owl job photo of a house would let the label go.
- **D2:** a very short phone wipe path means some visitors rely on the demo stroke or Enter; there is no separate "clear it for me" button because the plan said no buttons in beat 1.

## 7. Vetoes: **zero**
Facts exact (the one phone number, info@owlroofing.com); stock labelled; logo untouched; no maps; no invented claims.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
