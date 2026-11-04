# GATE-BUTTONS · homepage-wide buttons pass (owner order, 2026-11-04)

> **Order of work:** the in-flight version (Explore 11) had already been finished and gated with its five-question self-check before this order arrived (`GATE-NEW-Explore-11.md`, pushed). This pass ran before any new version.
> **Scope:** the header and every homepage section, across all 150 live versions (hero 15, video 15, explore 11, the rest 9–10 each). Defaults are unchanged.

## 1 · Reference button study (code level, this session)
**Tool:**
- `tools/btn-probe.cjs` loads each reference live and finds its call-to-action buttons.
- For each one it records the markup, every transition, and what changes at 120 ms and 700 ms of hover, on press, and on keyboard focus. It looks at the element, every descendant, and their ::before/::after layers.
- `tools/btn-rules.cjs` then reads the CSS rules behind a mechanism.
- **Raw output:** `gates/buttons/study/*.json`, `*-rules.txt` and `*.jpg`.

| Reference | What the button actually does (measured) | Transfers to Owl | Does not transfer |
|---|---|---|---|
| **Lando Norris** | `.btn-w > .btn-inner > .btn-inner-text-w{overflow:clip}`. The label's letters are spans that each slide up exactly one line (−16.67 px), with a slight per-letter stagger (values 16.617–16.670 at 120 ms), revealing a twin line below. A square `.btn-icon-w` slot holds an animated (Rive) icon. Focus is a solid 2 px outline. | **Letter roll** in a clipping window, with a 14 ms stagger per letter. **Icon slot** inside the button. | The lime and dark-green palette, Mona Sans, and the Rive runtime (we use CSS). |
| **Longbow Motors** | `.nav__reserve` fill sweep: `background-image:linear-gradient(to right,fill 0 50%,transparent 50% 100%)`, `background-size:200.5% 100%`, position `100% 0`, then `0 0` on hover, with `transition: background-position .5s cubic-bezier(.16,1,.3,1)`. `.btn .arrow` is a 1 px line plus a rotated-border chevron, whose width goes from 18 to 26 px on hover over 0.35 s. All CTAs are at least 48 px tall, with a solid 2 px focus outline. | **Fill sweep** on the secondary button, using the exact technique and curve. **Arrow travel** on the same curve. **Easing token** `--b-ease: cubic-bezier(.16,1,.3,1)`. | Brass and black, all-caps tracking, and square corners. |
| **Apple (AirPods Pro)** | The Buy button has distinct hover (rgb 0,118,223) and **pressed** (0,110,219) colours. Icon spans move `transform .3s cubic-bezier(.25,.1,.3,1)`. Focus is a solid 2 px outline. | **A distinct pressed state** on every control, not just a hover one. | Apple blue, and their typography and sizing. |
| **Cowboy** | Pill CTAs invert their fill (white → dark) with `color/background-color .3s cubic-bezier(.4,0,.2,1)`. Hover is applied only under `supportshover:`, a hover-capable media query. | **Hover effects only where hover exists**, `(hover:hover) and (pointer:fine)`. Touch gets tap feedback instead. | The full colour inversion; Owl's primary stays amber. |
| **Scout Motors** | `.c-button > .c-button_inner > .c-button_label` structure, `0.2s cubic-bezier(.38,.005,.215,1)` colour transitions, and a generous focus outline (`auto 10px`). | An **inner-span structure** so the label can move inside the button, and a **generous focus** treatment. | Their background-only hover. |
| **Graza** | Ink-bordered pill buttons whose highlight fill warms to the brand lime over `.25s ease-in-out`. Dotted focus outline. | A **bordered secondary with a warm fill on hover**: our sweep fills light amber (#FBE3AE) inside the amber border. | The lime, and the dotted focus ring (Owl keeps a solid ink ring). |
| **Quiet Cubes** | Icon-image buttons with an opacity fade, and "Order Now" with a `background-color .2s` change. | Nothing new; it confirms short (≤ 0.2–0.25 s) colour timings for feedback. | — |
| **Immersive Garden, MERSI** | No CTA elements in the first screens (canvas-drawn or text navigation only). | — | — |
| **Lusion** | Not studied. A Cloudflare challenge appeared, and it was **not bypassed**. | — | — |
| **Bruno Simon** | The one game, with no CTA buttons; out of scope for buttons. | — | — |

## 2 · What was built (shared system, `base.css` and `base.js`, inherited by every future version)
**Primary amber CTA** (`.btn-amber`: Get My Roof Checked, Book a Wise Check, Open My Email, and others):
- **Rest:** the existing raised amber pill with its lift, now with an **arrow icon slot** on every booking link.
- **Hover:** the letters roll up one by one (Lando), the arrow passes out to the right and a twin slides in from the left (Longbow's travel, `.46s` on `--b-ease`), a bright band crosses the amber once, and the lift rises.
- **Pressed:** the lift drops 4 px, and a soft ripple opens from the exact tap point.
- **Focus-visible:** the letters and arrow animate as on hover, and a solid 3 px ink outline snaps in from a 9 px to a 3 px offset.
- **Disabled:** 50 % opacity, desaturated, no lift, `not-allowed` cursor.

**Call / secondary line button** (`.btn-line`: Call (651) 977-6027, Watch the Crew, See Our Services, and others):
- **Hover:** Longbow's fill sweep, with light amber wiping in from the left inside the amber border (`background-position .5s cubic-bezier(.16,1,.3,1)`), plus the letter roll. **Call links get a phone icon that rings** (±14° three times over 0.7 s).
- **Pressed:** the lift drops, with an ink ripple from the tap point. On touch, the phone rings on tap too.
- **Focus-visible:** the sweep shows the fill, with the same ring.

**The tap splash** (every control): a thin amber ring opens where the finger or pointer lands (0.5 s) and fades. Enter and Space produce it at the control's centre. It is the touch feedback that needs no hover.

**Every other control in every version** (per-version buttons, tabs, keys, chips, trouble spots, photo buttons, contact links, header links): each keeps its own look and gains:
- a **2 px lift** on hover where hover exists;
- a **real press** (`scale .96`, 0.14 s);
- the **tap splash**;
- the **snap-in focus ring**;
- a **disabled** state.

It uses the individual `translate` and `scale` properties, so no version's own transforms (the centred Owl button, rotated cards, positioned spots) are disturbed. Existing transitions are preserved and extended, not replaced.

**Chips** (booking forms): a spring "pop" when chosen.

**Text-style buttons** ("Watch the full film" and kin): the underline drops, thickens and turns amber on hover.

**Dials and small tracks** (`role="slider"` up to 300 px): a gentle grow on hover and a squeeze on press. Large drag stages keep their grab cursor as feedback.

**Header:** the Book button gets the full primary treatment, the phone link rings, and the nav links keep their underline draw and gain the lift.

**Accessibility:**
- Buttons whose label is rolled get an `aria-label` equal to their visible words, so the name is spoken once.
- The twin letter is CSS content, not text, so `textContent` and `innerText` are unchanged and the facts lock still reads "Call (651) 977-6027".

**Reduced motion:**
- No letter roll, arrow travel, sweep animation, lift, press scale or ring animation.
- Ripples and splashes become short fades.
- States still change colour, so feedback is never lost.

## 3 · WEB-SKILLS ledger, per button treatment, down to individual buttons
| Button(s) | Treatment | Skills |
|---|---|---|
| **Primary amber: label** | letter roll in a clipping window, 14 ms stagger | ⟦S0405⟧ micro-interaction (≤ 0.5 s, transform only), ⟦S0195⟧ motion tokens |
| **Primary amber: arrow** | pass-through travel | ⟦S0405⟧, ⟦S0658⟧ animation discipline (≤ 500 ms) |
| **Primary amber: body** | 3D lift (kept), one-pass sheen band | ⟦S1388⟧ skeuomorphic raised and pressed, ⟦S0214⟧ press feel |
| **Primary amber: press** | lift drops, ripple from the tap point | ⟦S0405⟧ press, ⟦S1323⟧ ripple emission |
| **Call line: fill** | Longbow gradient sweep, `background-position` | ⟦S0405⟧, ⟦S0195⟧ (expo-out curve) |
| **Call line: icon** | phone ring on hover and on tap | ⟦S0489⟧ small-amplitude life, ⟦S0405⟧ |
| **Secondary line** (Watch the Crew, See Our Services, Watch the Full Film, Open It, Tidy Up, Wipe and Run Again, …) | sweep, roll, ripple | ⟦S0405⟧, ⟦S1323⟧ |
| **Header Book a Wise Check** | the primary treatment | as for the primary amber |
| **Header phone link** | ring on hover | ⟦S0489⟧ |
| **Header nav links** | underline draw (kept) plus lift | ⟦S0405⟧ |
| **Hero tab CTA** (`.btn-tab`, Heroes 2, 11, 12, 14) | 3D flip (kept), arrow travel (kept), plus splash and ring | ⟦S1388⟧, ⟦S1323⟧ |
| **Ink, film, plate and key families** (earlier heroes and Explore) | their own wash, roll, sheen and key travel (kept), plus splash, disabled and the focus snap | ⟦S1324⟧, ⟦S1388⟧, ⟦S1382⟧, ⟦S1323⟧ |
| **Every per-version `<button>`, tab and role=button** (Shake It, Flip the card, Ring the bell, the Owl play button, trouble spots, frames, steps, chapter list, Back / Pause / Next, Make It Pour, See the Underside, layer chips, page turns, …) | lift, press scale, splash, focus snap, disabled | ⟦S0405⟧, ⟦S1323⟧, ⟦S1107⟧ keyboard, ⟦S0400⟧ accessible animation |
| **Contact links in versions** (`.call`, `.tel`, `.num`, mailto) | lift, press, splash; phone icons ring | ⟦S0405⟧, ⟦S0489⟧ |
| **Form chips** | pop on choose, lift, press | ⟦S0405⟧, ⟦S1442⟧ form rules |
| **Form fields** (inputs, textareas) | amber halo on focus-visible | ⟦S1442⟧, ⟦S0400⟧ |
| **Text-style buttons** | underline drop, thicken, turn amber | ⟦S0405⟧ |
| **Dials and small tracks** | grow and squeeze | ⟦S1018⟧ draggable affordance |
| **All controls: focus** | ring snaps in (9 → 3 px offset) | ⟦S0960⟧ button-name, ⟦S0400⟧ |
| **All controls: reduced motion** | colour and fade only | ⟦S0400⟧, ⟦S0658⟧ |

## 4 · Before and after
**The audit** (`tools/btn-audit.cjs`, every visible control in every version at 1440 × 900):
- It records whether hover **moves** something (transform, translate, scale, clip or sweep, on the element, its children or its pseudo layers), as opposed to a colour swap or nothing.
- It records whether **press** responds, and whether **keyboard focus** shows a ring.
- **Raw output:** `gates/buttons/audit-before-*.json` and `audit-after-*.json`.

| | Controls | No hover motion (colour swap or nothing) | No press response | No focus ring |
|---|---|---|---|---|
| **Before** | 554 | **291** | **258** | 1 |
| **After** | 554 | **5** | **5** | 1 |

**The remaining handful, each checked by hand:**
- **Services 5 "Storm Damage Help" and Wise 6 frames 2–3:** audit artifacts. Both versions are scroll-linked, and the audit's own scroll moves them under the pointer. A direct check shows they lift (`translate: 0 -2px`) and press (`scale: .96`).
- **Wise 9 "Previous page":** correctly **disabled** on page 1, so it has no hover, no press and no focus by design.
- **Explore 10 sample stage (500 px) and Video 1 scrub track:** large drag surfaces. Their feedback is the grab cursor and the object itself moving.

**Per-family evidence:** `gates/buttons/states/*.png`. Each strip has a BEFORE row and an AFTER row showing rest, hover 140 ms (mid-roll and mid-sweep), hover 700 ms, pressed and keyboard focus, at 2×. Families covered:
- the primary CTA and the call button;
- the hero tab CTA;
- the header Book button and header phone link;
- the film text button;
- a version control (Shake It), a trouble spot, a form chip, and a secondary line button.

**Touch and reduced motion** (`states/touch-reduced.json` and `touch-tap-call-390.png`), on an emulated iPhone 13 with no hover:
- a tap shows the splash and the in-button ripple, and rings the phone;
- with reduced motion, neither the letters nor the arrow move.

**Regression checks after the pass:**
- `home-verify` 50/50;
- Booking 8 and 9, 36/36;
- Booking 1 and 5, 30/30;
- Video 12 and 15, 40/40;
- Hero 13 and 15, 41/41;
- Explore 11, 21/21.
- No page or console errors, no sideways scroll at 1440, 768 or 390, axe 0 violations in each.

## 5 · Self-check (the owner's five questions), answered from the strips and from using the page
1. **What is this pass for?** "Every button now feels like a real button that answers you, so pressing Call or Book feels sure and easy."
2. **Do I get it at first look, in under three seconds?** Yes.
   - Nothing about the buttons changed in what they say or where they are. They read exactly as before.
   - The new motion only happens when you reach for one, and it points at the action: the arrow moves forward, the phone rings.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The letters of "Get My Roof Checked" roll up under your pointer like a flip board.
   - The call button fills with warm amber from the left while its phone rings.
   - A tap leaves a little amber ring where your finger landed.
   - Every press has a physical squeeze.
4. **Is every element here for a clear reason? Anything pointless?**
   - The roll and arrow say "this goes somewhere".
   - The ring says "this calls".
   - The sweep separates the calm secondary from the primary.
   - The press and splash confirm the tap on phones, where there is no hover.
   - The focus snap shows keyboard users where they are.
   - Things I questioned:
     - **Magnetic pull on every control:** **not added**. It already exists on the main CTAs; on every button it would be busy.
     - **Sound on press:** **not added**.
     - **The primary's sheen band:** kept to a single pass, never looping.
   - Nothing pointless was added.
5. **Does it fit a stressed homeowner with a leaking roof?** Yes.
   - The two things they want, call and book, are now the most alive and most obviously clickable things on the page.
   - Nothing moves until they reach for it, and nothing is slower: feedback starts within 90–140 ms.
   - On a phone, every tap visibly lands.
   - With reduced motion it stays perfectly still.

**Verdict: passes.**

## 6 · Scorecard (self-rating)
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.8 | Reference-grade mechanisms (Lando's roll, Longbow's sweep and arrow, Apple's pressed state), rebuilt in Owl's ink, amber and cream, consistent across 150 versions while each keeps its character. |
| Usability | 30 | 9.2 | Every state on every control: rest, hover, pressed, focus-visible, disabled. Touch tap feedback is independent of hover. Reduced motion is respected. Names are unchanged for screen readers. |
| Creativity | 20 | 8.6 | The phone that rings on the call button and the letter roll on "Get My Roof Checked" are specific to Owl. The rest is disciplined rather than novel, by design. |
| Content | 10 | 9.2 | No wording changed. The facts lock still passes (the twin letters are CSS, not text). |
| **Weighted** | | **8.92** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

## 7 · Inheritance and honest limits
- **Inheritance:** every future version inherits this automatically. Any `.btn` gets the roll, icon slot, sweep (line), ripple and states. Any other control gets lift, press, splash and focus. Version authors only add their own character on top.
- **Limits:**
  - **The letter roll applies to a `.btn` label only when the label is plain text** at load time. A script that later rewrites a `.btn` label with `textContent` gets the plain label back (still with the sweep, ripple and states). None of the current versions do this to a `.btn`.
  - **Not studied:** Lusion (Cloudflare challenge, not bypassed), and Immersive Garden and MERSI (no DOM buttons to read).
  - **The audit's hover test runs at one width (1440).** Phones are covered by the touch check, not by a per-version phone audit.
