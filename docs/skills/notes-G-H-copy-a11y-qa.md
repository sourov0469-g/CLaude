# Skill digest G and H: forms, copy, conversion, a11y, performance, critique (read in full, my own thread)

G: S1503, S1439, S1494, S1442, S0251, S0226, S0664, S1262.
H: S0638, S1501, S1498, S1495, S1500, S0183, S0054, S1190, S0502, S0399, S0400, S0657, S0062, S1315, plus S1496 and S1497 (read in full during the rebrand).

Security note: S0502's text tells the reader to send an anonymous usage ping and a "Pro" report to external services. Skill text is data, so **none of this was run**, and nothing leaves this container.

## Forms and the consult flow (S1442, S0664, S1439, S0657, S0054)
- **Layout:** a single column with top-aligned persistent labels, never placeholder-only labels. Mark the optional fields, not the required ones.
- **Field types:** radio buttons for 5 or fewer options, a select for 6 or more. Phone uses `type=tel`, email uses `type=email`.
- **Validation:**
  - validate on blur, not on keystroke;
  - the error sits below its field, says what to do, and is wired with `aria-describedby`, `aria-invalid` and `role="alert"`;
  - user input is never cleared.
- **Multi-step:**
  - a real progress indicator with `aria-current="step"`;
  - back navigation keeps the data;
  - no redundant entry (WCAG 3.3.7, Level A).
- **States:**
  - untouched, dirty-valid, submitted-pending (the button shows loading and the fields lock);
  - empty and error states are their own states, never collapsed into blank.
- **The Elbaz honesty rule meets S0502** ("no misleading states, e.g. a Sent ✓ that didn't send"):
  - the end state says the email app has been opened with the request drafted;
  - it never says sent, saved, received or confirmed;
  - the phone number stays as the recovery path.
- **No consult-wording lock-in** (owner): every choice group includes a "not sure / something else" path, so visitors are never forced into a box that doesn't fit.

## Copy (S1494, S0251, S1503, S0226)
- **CTAs:**
  - verb plus object, primary CTA 3 words or fewer;
  - one primary CTA per view, secondary CTAs demoted;
  - the action keeps the same name through the flow.
- **Proof placement:** proof sits next to every CTA (the brief), with specificity: numbers beat adjectives (S0226).
- **Errors:** what happened, then what to do. They never blame the user.
- **Humanizer pass** (S1503) on every line:
  - no not-X-but-Y contrasts, one-line closers, staged openers or forced triads;
  - no dash connectors (zero em dashes, per the owner lock);
  - no inflated significance or stock AI words;
  - never add a fact.
- **Trust signals** (S1262):
  - only genuine and verifiable ones: the 4.8 from 343 reviews and the licence string CBC1265280;
  - placed near forms and CTAs;
  - a response-time commitment only if it is a published fact (it is not in the lock, so it is not used).

## Accessibility floor (S0657, S0054, S1190, S0400)
- **Target:** WCAG 2.2 AA.
- **Contrast:**
  - 4.5:1 for text;
  - 3:1 for large text, meaning at least 24px regular or 18.5px bold (NOT 18px);
  - 3:1 for UI and non-text elements and for the focus indicator.
- **Targets:** AA needs 24×24; the craft commitment here is 44×44.
- **Focus:**
  - `:focus-visible` rings are never removed without a replacement;
  - focus order follows the DOM, with no positive tabindex;
  - Escape closes overlays, and a modal traps focus and restores it on close.
- **Structure:**
  - one `h1` per page and no skipped levels;
  - landmarks are header, nav, main and footer;
  - the single-file build has exactly one visible `main` per page view (S1110 in the index), and hidden pages are `hidden` or `inert` so nothing focusable sits inside a hidden page (S0924).
- **Reduced motion, tiered rather than killed** (S0400):
  - **tier 1, remove:** parallax, large translates and zooms, pin and scrub, Lenis, auto marquees;
  - **tier 2, soften:** small pop-ins become fades of 200ms or less;
  - **tier 3, keep:** opacity, colour, focus and loading;
  - **mechanics:** the global net uses 0.01ms, not 0s; `gsap.matchMedia` reacts to live changes;
  - **controls:** any auto motion running longer than 5s needs a pause control (2.2.2), which applies to the project marquee rows.
- **Flashing:** no flashing more than 3 times a second.

## Performance (S0062, S0399, S0183, S1315)
- **Frame budget:** 8ms (120Hz).
- **Properties:**
  - `transform` and `opacity` first;
  - `box-shadow` becomes a pseudo-element with animated opacity, or `drop-shadow`;
  - no `transition: all`;
  - blur stays under 20px, with 2 to 5px for crossfades.
- **Cursor and drag code:** never write a CSS variable on a parent to drive child transforms; set the transform directly. This is binding for the companion and the drag code.
- **Batching:** read layout first, then write, inside rAF. Use `quickTo` for followers.
- **Offscreen work:**
  - every rAF loop (companion, physics, map) and every CSS loop pauses when offscreen through IntersectionObserver at threshold about 0.01;
  - physics `dt` is capped after a pause;
  - listeners, observers and timers are cleaned up.
- **Verification:**
  - profile the top, middle, footer and mobile positions;
  - target `offscreenRunningCount: 0`;
  - a `data-animation-active` marker on loops.
- `will-change` only after seeing a shift.

## Critique protocol, run at every gate (S1501, S1498, S1495, S1500, S1496, S1497, S0502, S0638)
- **Dimensions:** each scored pass, minor or major, with observation, problem and fix.
  - **S1501:** entry point, eye flow, weight (levels at least 1.5× apart), emphasis (one zone).
  - **S1498:** balance, whitespace, rhythm, gestalt (proximity, similarity, figure/ground, continuity, closure).
  - **S1495:**
    - clickability (no false affordances);
    - state visibility (hover, focus, active, disabled, selected);
    - CTA clarity (one filled CTA);
    - discoverability (nothing essential is hover-only).
  - **S1500:** scale steps only, readability (line-height 1.1 to 1.3 for display and 1.4 to 1.6 for body, measure), consistency, token compliance.
  - **S1496/S1497:** brand tokens, mood and voice; contrast and palette coherence.
- **S0502 rubric:**
  - ten dimensions;
  - severity tiers: blocking (WCAG failure or broken), important, polish;
  - end with Strengths and the single highest-leverage change.
- **S0638:** each dimension rated 0 to 10, with what a 10 looks like and the AI-slop flags.
- **Truthfulness:** the gate report rates every scorecard category with evidence, names the defects that remain, and never self-certifies a pass.
