# GATE-BUTTONS — the homepage buttons pass

**Under:** Muse's binding owner order (2026-11-04): "BUTTONS … the best, like the references' buttons, not only static." This closes the open buttons complaint from the owner's verdict.

**Order followed:**
1. Visualiser L was finished and gated as normal first (GATE-NEW-Visualiser-L.md, commit `b6799a0`).
2. This pass ran before any further new version.
3. No new version was built during it.

## 1. What changed, in one paragraph

Every control on the homepage now answers the visitor physically:
- it lifts or zooms on hover (fine pointers);
- it presses down and springs back with a small overshoot (mouse, touch and keyboard alike);
- it shows a snapping lime focus ring;
- disabled controls look and behave disabled;
- reduced motion keeps every state change and drops the movement.

The shared families got signature treatments rebuilt from the references:
- the primary board buttons roll their label letter by letter and roll their icon through (Lando Norris, Lusion);
- the header call button floods with lime from a growing dot while its phone rings (Lusion);
- phone and email links wipe in an underline (Lando Norris).

Each version keeps its own character. The system composes with, and never replaces, what a version already does.

## 2. Reference study (code level, live sites, 2026-11-04)

**Method:**
- A Playwright harness loaded each governing reference, found its real buttons, and recorded computed styles at rest, through the hover transition (60 / 160 / 400 ms), pressed, and on keyboard focus.
- It recorded every child that moved (icons, arrows, letters) and the `::before` / `::after` layers.
- It dumped each site's stylesheet rules for buttons (transitions, easings, transforms).
- Lusion's and Lando Norris's stylesheets were also read directly.
- Harness and raw captures: `scratchpad/bstudy/` (`study.js`, `<ref>.json`, rest/hover crops).

| Reference | Mechanism found (measured or read from its CSS) | Transferred to Austin | Not transferred |
|---|---|---|---|
| **Lando Norris** | Per-character label roll: each letter rides up one line to a duplicate label, staggered by a few ms per letter (captured mid-roll: −13.33 → −13.03 px across 13 letters). Text links wipe their underline in with `clip-path: inset(0 X 0 0)` → `inset(0 0 0 0)`. Focus: solid 2 px lime ring. Menu easing `.75s cubic-bezier(.65,.05,0,1)` | **Label roll** on every board button (14 ms per letter, 0.55 s, `cubic-bezier(.65,.05,0,1)`); **underline wipe** on phone, email and text links; a **lime focus ring** everywhere | Mona Sans type; Rive-animated icons; the dark olive palette |
| **Lusion** | `#home-reel-cta`: a dot inside the pill grows (`translate3d(3em,0,0) scale(20)`) to flood it while the label slides 1.5 em and an arrow slides in from −2.5 em; `cubic-bezier(.35,0,0,1)` .4–.5 s. Watch button: fill sweeps up from the bottom (`scale3d(1,0,1)` → 1, origin bottom, .4 s). Talk button: dots scale out, text slides, arrow slides in, `cubic-bezier(.4,0,.1,1)` .3 s | **Dot-flood** on the header call button (a lime dot scales ×26 from beside the phone icon, 0.5 s, `(.35,0,0,1)`); **icon slide-through** in the board buttons' icon tab (the icon leaves up-right and its twin enters from bottom-left, 0.42 s, `(.4,0,.1,1)`); **arrow travel** on next/previous buttons | WebGL scenes; the blue palette; uppercase Aeonik |
| **Graza** | `.btn--std::before` is a hard offset plate; on hover the plate and label move `translate(4px,4px)` (0.3 s ease-in-out), so the face presses into its shadow. Focus: dotted 2 px outline, offset 2 px | **Tactile depth with a real press:** the board buttons already stand on a 4–6 px lip; now every control presses down (`scale` .955 small, .985 large) and springs back with an overshoot (1.03 / 1.008) | The neo-brutalist hard shadow and dotted ring (our ring is solid lime for contrast) |
| **Scout Motors** | All buttons: `color, background-color, border-color 0.2s cubic-bezier(0.38,0.005,0.215,1)`; no movement on hover; strong focus ring | **Colour easing** on links and fields (`--bx-col`, 0.2 s); the strong, offset focus ring | Scout's restraint on movement (the owner asked for more) |
| **Apple (AirPods Pro)** | Links: `color 0.32s cubic-bezier(0.4,0,0.6,1)`; focus: `2px solid rgb(0,113,227)` with offset | The principle that focus is always visible and offset | Apple blue |
| **Cash App design site** | Nav: `color 0.3s cubic-bezier(0.215,0.61,0.355,1)` (easeOutCubic) | Ease-out family for colour | — |
| **Quiet Cubes** | `.pod-menu-button:active{opacity:.8}`; colour swaps at 0.2 s | A **pressed state on every control** (ours is physical, not only opacity) | Orange radial gradients |
| **Cowboy** | Captured controls are tabs with no hover motion | — (nothing to transfer) | — |
| **Dropbox Brand, MERSI** | No capturable buttons on the pages reached (0 found) | — | — |

**The resulting motion tokens** (`bx.css :root`):
- `--bx-out: cubic-bezier(.4,0,.1,1)` (Lusion);
- `--bx-flood: cubic-bezier(.35,0,0,1)` (Lusion CTA);
- `--bx-roll: cubic-bezier(.65,.05,0,1)` (Lando);
- `--bx-col: cubic-bezier(.38,.005,.215,1)` (Scout);
- `--bx-ring: #B5DB6E` (brand lime, as Lando's lime ring).

## 3. The system (files and how it works)

**Files:**
- `src/bx.css` and `src/bx.js`.
- Three lines in `build_site.py`: the CSS last in the cascade, the script last, and `Bx.init()` after every version is wired.
- No version's markup changed. All 177 slot templates, all 8 page templates and `<main>` are byte-identical to the previous commit; the label roll is applied at runtime.

**Scope:**
- `Bx.init()` sets `html.bx` only on the homepage view, and every rule is scoped under `.bx`.
- Subpage views (`?page=…`) are left exactly as delivered: checked on siding, windows, roofing and about (`bx` off, 0 labels split).

**The physics layer (`bx.js`):**
- **Mechanism:**
  - Delegated listeners in the capture phase, so a version that stops propagation on its own control still gets the physics.
  - Web Animations on the individual CSS `scale` and `translate` properties. These compose with each version's own `transform` instead of overriding it.
  - Each animation reads the element's current value and multiplies or adds to it.
- **Hover (fine pointer only):**
  - small controls (≤ 80 × 480 px) lift 2 px;
  - wide rows (≤ 90 px tall) lift 1 px;
  - tiles (≤ 420,000 px²) zoom 1.2%;
  - huge surfaces keep their own hover;
  - the hover reverses on leave (`playbackRate −1.15`).
- **Press (any pointer, including touch):**
  - down to .955 (small) or .985 (large) in 110 ms;
  - held at least 90 ms, so a quick tap still shows;
  - released with a spring (`[k → 1.03 → 1]`, 420 ms small; `1.008`, 360 ms large);
  - the first icon inside pops (`1 → 1.18 → 1`, 320 ms).
- **Keyboard:** Enter / Space give the same press-and-spring pulse.
- **Focus:** a keyboard-visible ring snaps in from 6 px further out (240 ms).
- **Drag:** a control that captures the pointer (drag games) switches to a brightness press, and its lift is dropped, so drag maths is untouched. Verified: the Try C board still places and the game is still won.
- **Draggables, reduced motion:** controls with `touch-action:none`, and everything under reduced motion, get `brightness(.9)` instead of any movement.
- **Disabled:** controls get nothing from the physics; CSS dims and desaturates them.

**The signature treatments (`bx.css`):** see §4.

## 4. WEB-SKILLS ledger per button treatment

The full per-button ledger, with all 276 control families by version and their before → after states, is in **GATE-BUTTONS-LEDGER.md**.

| Code | Treatment (applies to) | Skill → how used | Controls |
|---|---|---|---|
| T1 | **Board buttons** (`.btn`, `.btn.key`, `.btn.light`: every "Book a free inspection", "Open in my email app" and the other board CTAs in all versions) | ⟦S1329⟧ staggered reveal: the per-letter roll (14 ms, 0.55 s) with the text kept whole for screen readers in a hidden span; ⟦S1436⟧ decelerating ease and the icon slide-through led by the label; ⟦S0405⟧ / ⟦S1448⟧ every state specified (rest, hover, pressed with the lip collapsing, release spring, focus, disabled); ⟦S0083⟧ follow-through in the spring overshoot; ⟦S1435⟧ the lime key stays the one filled button per view; ⟦S0054⟧ the accessible name is unchanged ("Book a free inspection"); ⟦S0400⟧ under reduced motion no roll and no slide | 84 |
| T2 | **Header call button** (`.tel`) | ⟦S1440⟧ instant feedback: the lime dot-flood starts on hover; ⟦S0405⟧ press and spring; ⟦S1441⟧ Fitts: the phone stays the biggest call target; ⟦S1436⟧ the ringing phone eases out; ⟦S0054⟧ lime focus ring | 1 |
| T3 | **Phone and email links** (`a[href^="tel:"]`, `a[href^="mailto:"]`: `.callx`, `.big2`, `.cl2`, `.cl3`, `.tkbig`, `.num`, `.go`, plain mailto links) | ⟦S1440⟧ underline wipe left → right on hover / focus, back out to the right on leave; ⟦S0083⟧ the phone icon rings (a decaying ±16° wiggle, 0.7 s); ⟦S1427⟧ one treatment for every phone link on the page; ⟦S0054⟧ ring | 35 |
| T4 | **Text links in copy** (`p > a` and the like) | ⟦S1427⟧ a faint baseline at rest, a full underline wipe on hover; ⟦S1436⟧ 0.45 s ease-out; ⟦S0054⟧ ring | 6 |
| T5 | **Arrow and step buttons** (aria-label Next / Previous: Hero K, Reviews, Windows galleries) | ⟦S1436⟧ the arrow travels 3 px in the direction it points; ⟦S0405⟧ lift, press and spring; ⟦S0054⟧ ring | 6 |
| T6 | **Chips, radios, tabs, small controls** (Services L chips, Visualiser L swatches and finish switch, Booking I switch, Area K trade filter, day toggles) | ⟦S0405⟧ 2 px lift, press .955, spring 1.03; ⟦S1448⟧ the selected state still comes from each version; ⟦S1438⟧ Doherty: feedback inside one frame of the press; ⟦S0083⟧ icon pop on release; ⟦S0054⟧ lime ring | 85 |
| T7 | **Wide rows** (Booking E day rows, Process step rows, FAQ rows, price bands) | ⟦S0405⟧ a 1 px lift (no layout shift), press .985 and spring; ⟦S1427⟧ the same for every row; ⟦S0054⟧ ring | 14 |
| T8 | **Tiles** (Hero L colour fields, Visualiser tiles, Process cards, review tags, Services K frames) | ⟦S0405⟧ a 1.2% hover zoom on `scale`, composed with each tile's own transform; press .985 and spring; ⟦S1441⟧ big targets keep a subtle response; ⟦S0054⟧ ring | 23 |
| T9 | **Huge surfaces** (whole-scene buttons over 420,000 px²) | ⟦S0405⟧ press and spring only; their own hover is kept | 1 |
| T10 | **Draggable game pieces** (Try loose boards, troughs, part chips) | ⟦S1440⟧ a brightness press that never moves the piece under the finger; ⟦S0054⟧ ring | 8 |
| T11 | **Form fields** (postcard inputs, review search, the Area finder combobox, range sliders) | ⟦S0054⟧ a lime ring offset 2–4 px on focus; ⟦S1440⟧ the border eases to green on hover; range thumbs grow ×1.18 on hover and press to .92 with a lime halo while dragged | 10 |
| T12 | **Disabled** (Try K "Run the rain" before the job is done, Area F "Later" at the end, any `:disabled` / `aria-disabled`) | ⟦S1448⟧ a real disabled state: 45% opacity, desaturated, `not-allowed`; no hover, no press | 3 |
| — | **Phone quick bar** (Call / Book / Menu, 390 px) | Touch press and spring on each; the icon lifts and grows on `:active`; ⟦S1441⟧ thumb-zone targets unchanged | (chrome) |
| — | **Whole system** | ⟦S0195⟧ one motion personality (four tokens); ⟦S1315⟧ no RAF loop: compositor-friendly `scale` / `translate` only, animations cancelled after they finish; ⟦S0400⟧ reduced motion keeps state, drops travel | — |

## 5. Before and after evidence

**Measured by the same harness on the previous build (`before`) and this build (`after`):**
- **Scope:** every version of every homepage section (105 version views) plus the header, at 1440 × 900.
- **Sample:** one control per family per version, 276 in all.
- **Method:** hover 350 ms; press held 140 ms and released off the control, so nothing fires; keyboard focus.

| | Before | After |
|---|---|---|
| Hover produces motion | 128 / 276 | **253 / 276** |
| Hover is a colour swap only | 28 | **4** (all form fields, which also get a focus ring) |
| Hover does nothing | 120 | **19** (every one classified in §6) |
| Press gives feedback | 114 | **250** (+8 tiles confirmed individually with a longer wait: **258**) |
| Visible keyboard focus ring | 267 | **272** |
| **Static: no hover motion and no press** | **134** | **18**, and **0 reachable** (§6) |

**Per-family sheets:** in `siding/redo/site/gate/buttons-*.jpg`; overview in `buttons-overview.jpg`.
- Each sheet shows real-time frames, rest → mid-hover → hover → pressed → release → keyboard focus.
- There is a before row and an after row.

| Sheet | Family | What the after row shows |
|---|---|---|
| `buttons-01-primary` | Hero board CTA | The label mid-roll, the icon tab sliding through, the pressed lip, the focus ring |
| `buttons-02-secondary` | Booking H board | The same treatment on a second board |
| `buttons-03-header-call` | Header call | Dark green → lime flood with dark text; press; lime ring |
| `buttons-04-phone-link` | Booking B phone link | Underline wiping in; the phone icon ringing; lime ring |
| `buttons-05-text-link` | Booking I inline link | A faint baseline → a full underline |
| `buttons-06-chip` | Services L trade chip | 2 px lift; press; ring |
| `buttons-07-radio` | Booking I switch | Lift; press; ring |
| `buttons-08-arrow` | Hero K next | The arrow travelling 3 px; lift; press |
| `buttons-09-tile` | Hero L colour field | Press; ring (a huge-surface treatment at this size) |
| `buttons-10-dayrow` | Booking E day row | 1 px lift; press; ring |
| `buttons-11-field` | Booking H postcard field | Border easing to green; lime ring |
| `buttons-12-mbar` | Phone Book bar (touch) | The tap pressed and released |
| `buttons-13-tile-zoom` | Visualiser K tile | 1.2% hover zoom; press |

**Numeric checks on the after build:**

| Check | Result |
|---|---|
| Label roll (hero CTA, sampled each frame) | 0 ms `0,0,0,0` → 368 ms `−18,−16,−6,−1` → 561 ms `−19,−19,−19,−17` → settled: the letters lead and trail, as on Lando Norris. The accessible name is still "Book a free inspection" |
| Header dot-flood | `::before` at `scale(26)`, lime #B5DB6E, on hover |
| Touch tap (390, mobile emulation) | Mobile Book: press 0.955 → spring 1.025 → settled. Services L chip: 1.025 → settled. Hero L field: 1.030 → settled. No hover needed |
| Keyboard | Enter on a Services L chip: scale 0.955 with the ring at its focus offset; then spring |
| Arrow travel | Hero K next: the arrow `translate: 2.97px`; the button lifted `0 −2px` |
| Reduced motion | Hero CTA: no letter movement (`transform: none`); press is `brightness(0.9)` with scale untouched |
| Drag game | Try C: during the drag the board gets brightness .96 and no scale press; the board is still placed and the game won |
| Errors | 0 page errors across all 226 version views (homepage and subpage slots) |
| Overflow at 390 | No new overflow from the label roll. Area B's 9–10 px page overflow and Try B's sideways rail are the same in the before build |
| Homepage gate | 0 errors, 0 overflow, 1 h1, 0 duplicate ids at 1440 / 768 / 390 |

## 6. The 18 remaining "static" readings, each explained

Each was hit-tested at its own centre (`scratchpad/bx/static-classified.txt`). **None is a reachable static button.**

| Reason | Controls |
|---|---|
| **Disabled** (correctly inert) | Try K "Run the rain"; Area F "Later" |
| **Form fields** (styled via T11; range thumbs respond through their pseudo-elements, which the harness cannot read; two are visually hidden native radios behind styled labels) | Area I, Visualiser A, Visualiser G, Visualiser I, Windows A, Windows J |
| **Inside a closed or inert container** until the visitor opens it | Booking G phone link (behind its door); Windows D "Photo 1 of 2" |
| **Off to the side** in a pinned horizontal sequence at measure time | Services A scene and link; Try A trough, swatch and Book button |
| **Covered by a neighbour** by design | Services C scene (split cover); Visualiser A swatch (the fan); Services H Book button (inside a board until it is pulled) |

## 7. Defects found and fixed during the pass

1. **The homepage was treated as a subpage.** `<main>` carries `data-page="home"`, so the first guard (`main[data-page]`) switched the system off everywhere. The guard is now `:not([data-page="home"])`; verified on, homepage, and off, four subpages.
2. **Evidence frames were wrong.** The first frames used Playwright's frozen clock, which does not drive CSS transitions. All evidence was re-shot in real time.
3. **Propagation:** some versions stop event propagation on their own controls. All listeners moved to the capture phase.
4. **Wide rows and tiles had no hover response.** The first rule lifted small controls only, leaving 22 rows and tiles static on hover. Added a 1 px lift for rows and a 1.2% zoom for tiles.
5. **Drag games:** the press scale also reached draggable boards that do not set `touch-action:none`. Controls that capture the pointer now switch to a brightness press; the drag is verified.
6. **Arrow buttons only filled:** arrow travel (3 px in the arrow's direction) was added.

## 8. Remaining defects, named honestly

- **Headless timing:** in headless Chromium the press animation sometimes starts a frame or two late (a tile read 1.009 at 140 ms, then 0.997). At 60 Hz on real hardware it starts on the next frame. **Not yet checked on real devices**, including iOS Safari's handling of `scale` / `translate` animations.
- **No-wrap labels:** the label roll keeps each board label on one line (`white-space:pre`). No board label overflows at 390 today, but a future, much longer label would need a shorter text or the roll switched off for it.
- **One huge surface** keeps only press, spring and ring; at that size a lift or zoom reads as layout movement.
- **Two references gave no buttons:** Dropbox Brand and MERSI exposed none on the pages reached, and Cowboy's captured controls had no hover motion. The study rests on Lando Norris, Lusion, Graza, Scout, Apple, Cash App and Quiet Cubes.
- **The phone quick bar** shows its press and icon lift on `:active`; its tap feedback is otherwise the shared spring.

## 9. Every future version inherits this

- New versions get the system with no extra work:
  - any `.btn` is rolled;
  - any control gets the physics and the ring;
  - any phone or email link gets the wipe and the ringing phone.
- Recorded in PROGRESS.md as a standing rule:
  - new versions use `.btn` / `.btn.key` for board buttons;
  - they must not set `scale` / `translate` on a control's own `:hover` / `:active` (the physics owns those two properties);
  - draggable pieces should capture the pointer, as Try's games do.

## 10. Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | Every family now has a physical, branded response: the rolling label, the icon slide-through, the lime flood, underline wipes, a lime ring, real disabled states (sheets 01–13). Each version's own look is untouched. **Minus:** large surfaces get only a subtle response; real-device smoothness unchecked |
| Usability (30) | **8.8** | Static controls down from 134 to 0 reachable. Touch gets tap feedback without hover. Keyboard gets the same press and a snapping ring (272 / 276 with a ring). Reduced motion keeps every state and drops movement. Drag games are unharmed. 0 errors across 226 views. **Minus:** headless timing only; no real device test |
| Creativity (20) | **8.2** | Techniques taken at code level from the references and rebuilt for the brand: Lando's per-letter roll on lime boards, Lusion's dot-flood on the call button, a phone that rings. **Minus:** the physics layer is a shared baseline, so many controls feel alike under the pointer |
| Content (10) | **8.6** | No label, fact or link changed; accessible names verified unchanged; subpages untouched. **Minus:** the no-wrap label rule constrains future copy length |
| **Weighted** | **8.58** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.8 + 0.2 × 8.2 + 0.1 × 8.6 = 3.44 + 2.64 + 1.64 + 0.86 = **8.58**.

**Vetoes: none.**
- White ground; brand greens and lime only.
- Normal fonts.
- Locks untouched; no form claims.
- Defaults and every version's markup unchanged; subpages untouched.
- No sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's judgment.** I will not start Windows L until Muse accepts this gate.
