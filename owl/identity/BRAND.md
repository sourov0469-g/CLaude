# Owl Roofing: brand document (mood · voice · tokens · components)

This is the one file every later section is critiqued against (⟦S1496⟧). It records the decisions that the assets embody;
it does not replace them.
- **The assets:** `tokens.css` / `tokens.json`, `icons.svg`, `owl-components.css` and `owl-identity.js`, plus Owl's own
  logo, tree-ring and treeline SVGs in `../assets/source/`.
- **Where they are shown working:** `../phase2/identity-board.html`.

**This is a rebuild, not a rebrand.**
- **Owl's own and unchanged:** the logo, the name and the ten live colours.
- **New:** the system around them.

## 1. Mood
**Adjectives:** watchful, neighbourly, tidy.

**What it feels like:**
- A family roofer's clean truck at the kerb on a bright Minnesota morning.
- Paper-light pages.
- Olive and pine for weight.
- One amber detail where something is actually working: the magnet face, the call button, the owl's eyes.

**Core metaphor:** the nest. Owl's own system is called *Protect Your Nest*.

**Signature drawing:** the sweep line.
- It is dotted while it travels and turns solid amber where it works.
- It comes from Owl's 3-Part Cleanup: crew pass, magnet pass, project-manager check.
- It ends as a nest around the phone number.

**Shape language:** monoline strokes with round caps; shingle courses and wedges; one loose curve.
- **Corners:** 6px on fields, 10px on media, pills for actions (as on Owl's live site).

**Illustration (⟦S1421⟧):** flat, geometric-organic, moderately detailed, representational.
- **Colour:** ink lines, olive lawn, tan warmth, and amber only where the magnet works.
- **Accessibility:** illustration never carries information alone.

**Never:**
- glass or gradient fills; mesh blobs; 3D product renders; purple or indigo; emoji;
- a redrawn or cropped logo;
- stock photos captioned as Owl jobs;
- fear imagery (mould, disaster close-ups).

## 2. Voice
Owl writes the way it talks on its own site. Its source lines are kept verbatim where they are used:
- "We actually answer the phone!"
- "We Give a Hoot"
- "A lot of homeowners have a hard time getting contractors on the phone. We've decided that sucks, and are here to change
  it."
- "You can even text us throughout the process"

**Rules (Phase 3 must obey):**
1. **Short, plain lines.** One idea per sentence. Second person ("your yard", "your roof"). "We" means the two families and
   their crew.
2. **Real facts only, from the facts lock.**
   - Owl Roofing LLC; 1000 County Rd E #230, Shoreview, MN 55126; (651) 977-6027 (never another number);
     info@owlroofing.com; Mon–Sat 8:00–18:00.
   - Family-owned, founded 2025 by Tim Brown and Noah Bergland; MN licence #BC809662.
   - GAF Systems Plus Certified (never "Master Elite").
   - BBB Accredited, A− since 2026-02-25 (never A+).
   - 10-year workmanship guarantee ("Get It Right Guarantee"); up to 50-year manufacturer warranties.
   - "5.0 · 90+ reviews", exactly as Owl states it; 29 service towns.
3. **No invented proof.** No review quotes Owl did not publish, no prices, no job addresses or dates, no statistics.
4. **No superlatives that cannot be shown.** Not "best", "#1", "premier", "top-rated". Not "elevate", "seamless",
   "unleash", "solutions" or "peace of mind" as filler.
5. **Calm about damage.** Name it plainly ("hail", "a leak") and say what Owl does next. No scare words.
6. **Every CTA names the action and the channel:**
   - "Call (651) 977-6027"
   - "Text us"
   - "Book a Wise Check"
   - Not "Get started" or "Learn more".
7. **Owl's own system names keep their capitals:**
   - Protect Your Nest
   - Nest-Protection
   - 3-Part Cleanup
   - Owl Roof Aftercare
   - Get It Right Guarantee
   - Wise Check
   - Price My Roof

## 3. Tokens (summary; the files are the source of truth)
**Tiers (⟦S1461⟧):** primitives named by hue (`--owl-olive-500`) → semantic aliases named by role (`--text-muted`) →
component tokens (`--button-primary-bg`).
- Components use semantic or component tokens only.
- `lint-tokens.py` fails on any raw colour, off-ladder length or raw duration in component code.

### Colour

**Light grounds and text**

| Role | Token → primitive | Hex | Note |
|---|---|---|---|
| Page ground | `--surface-page` → paper-50 | #FCFBF5 | live |
| Alternate light ground | `--surface-alt` → cream-100 | #F1EFE6 | live |
| Raised, fields | `--surface-raised` → white | #FFFFFF | live |
| Body text | `--text-primary` → ink-900 | #17121D | 17.76:1 on paper |
| Muted text | `--text-muted` → olive-500 | #666B53 | 5.34 on paper, 4.81 on cream |

**Deep grounds and text on them**

| Role | Token → primitive | Hex | Note |
|---|---|---|---|
| Deep ground | `--surface-deep` → olive-700 | #36402D | at most 2 per page, never adjacent |
| Night ground (footer) | `--surface-night` → olive-900 | #282F21 | |
| Text on deep | `--text-on-deep` → cream-100 | | 9.45 on deep |
| Muted on deep | `--text-on-deep-muted` → olive-300 (derived) | #A5A695 | large text only on deep (4.40); body on night (5.59) |

**The accent and its uses**

| Role | Token → primitive | Hex | Note |
|---|---|---|---|
| Accent fill | `--accent-fill` → amber-400 | #EAA222 | the ONE accent: 5-10% of pixels, at most 2 uses per screen |
| Label on accent | `--accent-on-fill` → ink-900 | | 8.49:1 |
| Accent as text on light | `--accent-text` → amber-700 (derived, hue held) | #90610E | links |
| Accent as text on deep | `--accent-text-on-deep` → amber-400 | | 5.03 |

**Lines, focus and graphics**

| Role | Token → primitive | Hex | Note |
|---|---|---|---|
| Hairline | `--line-hairline` → cream-200 (derived) | #DEDDD1 | decorative only, never a control border |
| Control border | `--line-control` → olive-500 | | 3:1 UI pass |
| Focus | `--focus-ring` → ink; `--focus-ring-on-deep` → amber | | |
| Warm graphics | `--graphic-warm` → tan-500 | #987861 | graphics and large text only (3.90) |

**Banned, by measurement:**
- amber text on light (2.09 / 1.88);
- white on amber (2.17);
- tan body text (3.90).

**Removed at audit:** a derived "moss" ground. It could not be told from cream, and it failed with amber-700.

### Type
- **Families:** Montserrat 700/800 (display; stand-in for Owl's Special Gothic Expanded) and Lato 400/700 (body; stand-in
  for Texta).
- **Fallbacks (measurement pass, ⟦S0280⟧):** "Montserrat Fallback" and "Lato Fallback" are local Arial / Liberation Sans faces
  with `size-adjust` measured against the loaded fonts (letters and tabular digits separately), so the web-font swap moves
  almost nothing. Digits are tabular site-wide.
- **Scale (Utopia):** 360→1240px, base 18→20, ratio 1.2→1.25 (`type-scale.csv`). The roles are:

| Role | Size | Weight / line-height / tracking |
|---|---|---|
| display | 44.8→61 | 800 / 1.1 / −0.02em |
| title | 37.3→48.8 | 800 / 1.1 |
| heading | 31.1→39.1 | 700 / 1.2 |
| subheading | 21.6→25 | 700 / 1.3 |
| body | 18→20 | 400 / 1.55 |
| small | 15→16 | |
| label | 15→16 | 700, uppercase, +0.08em; the only uppercase |

- **Numbers:** `tabular-nums` on every changing number.
- **Measure:** 66ch.

### Space, radius, shadow
- **Spacing:** the Carbon ladder (2/4/8/12/16/24/32/40/48/64/80/96/160). Nothing else.
- **Section rhythm, three fluid pairs:**
  - `--section-minor` 48→64
  - `--section-default` 64→96
  - `--section-hero` 96→144
  - A section's top and bottom always use the same one.
- **Gutter:** 16px. **Container:** 75rem.
- **Radius:** `s` 6, `m` 10, `pill`.
- **Shadow:** `raised` (Owl's live 0 2px 5px, tinted ink) and `lifted`.

### Motion
**Durations:** instant 80, fast 160, normal 240, slow 480, story 900.

**Easings:**
- `out` (.23,1,.32,1): entering and responding.
- `travel` (.77,0,.175,1): moving, gaze, morphs.
- `in`: leaving only.
- `linear`: pans and wheels.

**Signature timings:**
- **Stagger:** 40ms.
- **Blink:** 110 / 40 / 190ms.
- **Glance:** 480ms glide, 1.2s hold, at most 1 unit.
- **Press:** 0.97 scale; in 100, out 220.

**Rules:**
- **Purpose:** motion guides attention, communicates state or preserves continuity; otherwise it is removed (⟦S0195⟧).
- **Properties:** transform and opacity only.
- **Interruptible:** everything can be interrupted.
- **Reduced motion:** zero durations and final frames (every motif renders p = 1 as a still).
- **Logo:** blinks once on appear, then rests; no loops on chrome.
- **Pinned beats:** at most 4 per page, each at most 100vh, with a skip link.

### Dials (⟦S0651⟧)
| Dial | Value | Meaning |
|---|---|---|
| Design variance | **6** | Offset asymmetry; a strict single column below 768px |
| Motion intensity | **7** | Scrubbed motifs and pinned beats with calm curves; no idle wobble on chrome |
| Visual density | **4** | One proof per screen |

## 4. Components: CLOSED inventory (contracts)
A section in Phase 3 that needs something not listed here reports **NO-COVERAGE** and stops; it never improvises.

| Component | Use when | Not when | States | Bindings |
|---|---|---|---|---|
| **Header** (+ menu panel) | Every page | n/a | Nav ≥1024px. Below that: phone plus a menu toggle that morphs ☰→✕ and opens the panel. Escape, link click and an outside click close it; focus moves into the panel and back.  From ≥1024px the Call button is solid ink, not amber (measurement pass, ⟦S0660⟧: the active-page underline is the header's one amber use, the content keeps the primary). | surface-page at 92% with blur; line-hairline; logo ≥120px with clear space |
| **Button** primary / secondary / on-deep | One primary per view (Call); secondary for Text or a section action | Navigation links; more than 2 per group | rest, hover (−2px + shadow-raised), active (0.97), focus-visible ring, disabled (45%) | button-* tokens; pill; min-height 48 |
| **Link** | Inline prose actions | Primary CTAs | hover underline, focus ring | link-fg (amber-700) / link-on-deep-fg |
| **Call bar** (mobile) | Every page below 768px | Desktop | always on | callbar-*; safe-area inset |
| **Section head** | Every section | n/a | n/a | heading + one-line dek; no eyebrow labels; beat counter only on pinned beats |
| **Proof chip** | Owl's stated proof: rating, GAF Systems Plus, BBB, licence | Anything Owl does not state | n/a | line-control border; star / guarantee icons |
| **Seal** | Owl's own badge images (Guarantee, Wise Check, Owl Mom Approved) | Redrawn badges; claims Owl has not explained | n/a | round 96px |
| **Image frame** | All photography: 16:9, 4:3, 4:5 | Free ratios | n/a | radius-m; one inspector's corner tick; caption states only what is true |
| **Video window** | Owl's hero footage only | Stock video | poster = a real frame, muted loop, pause control, reduced motion = poster | frame 16:9 |
| **Sweep divider** | Seams between sections that continue the line | Every seam | n/a | dotted line-control |
| **Field** + error | Price My Roof, contact | n/a | rest, hover, focus, invalid (bark rule + 2px border + message) | field-* |
| **Accordion** | FAQ, process detail | Primary content | closed / open (arrow rotates 90°) | line-control rules |
| **Service row** | Lists of services | Feature grids of 3 equal cards (banned) | hover: icon rises 4px, arrow moves 8px | icon 32, subheading |
| **Beat stage** | The Protect Your Nest beats (max 4) | Anything else | pinned; static under reduced motion | sticky 100dvh |
| **Video card** | Owl's own YouTube videos | Stock or third-party video | thumbnail with an amber play button; nothing from YouTube loads until click; then a youtube-nocookie player with focus moved to it | radius-m; accent-fill play; 16:9 |
| **Place list** | Towns served; any plain list of places | Lists of services (use service rows) or proof (use chips) | static; the home town is bold with a pin | auto-fill columns ≥10rem; hairline rules; small type |
| **Footer** | Every page | n/a | n/a | surface-night; Night-yard background below the copy |
| **Bespoke: Sweep-the-lawn game** | Once, on the 3-Part Cleanup page or beat | Elsewhere | idle / playing / won; keyboard playable; reduced motion = a tap-to-reveal grid | magnetPass grammar |
| **Bespoke: Price My Roof** | Pricing intent | Inventing prices: it measures squares and hands off to a written estimate | input, readout (tabular), hand-off | field, readout uses the formula shown |

**Interaction rule:** each interactive element type reacts differently.
- **Buttons:** lift.
- **Service rows:** the icon rises.
- **Nav:** an amber underline grows.
- **Accordion:** the arrow turns.
- **Logo:** blinks.
- **Companion:** reacts per type.

No reaction is reused as a generic hover.

## 5. Backgrounds and surface discipline
| Background | Ground | Construction | Use | Budget |
|---|---|---|---|---|
| **B1 Lawn light** `Owl.bg.lawn` | paper | Receding course underdrawing, dotted sweep, lawn edge, one tan glow placed opposite the copy | Hero, system beats | 1 SVG, 2 transforms |
| **B2 Rings** `Owl.bg.rings` | cream | Owl's tree rings at two scales, counter-drifting; focal cluster at right; radial mask | People and place sections: families, reviews, FAQ, service area | 2 `<use>` transforms |
| **B3 Night yard** `Owl.bg.night` | deep / night | Owl's treeline in 3 olive depths with parallax pan; one amber porch-light glow | Call band and footer only | 3 linear pans |

- **Section surface sequence:** declared before each page is built.
- **No repeats:** no two adjacent sections share a surface token.
- **Deep sections:** at most 2 per page, and never adjacent.
- **Flat grounds:** a plain flat ground is allowed only on proof bands of `--section-minor` height.

## 6. Imagery
**EVIDENCE:**
- **What counts:** Owl's own footage and photography only, for crews, jobs and people. Captions say only what is true.
- **Sources:**
  - Hero-video frames (`assets/source/frames/`).
  - The catch-all wrap.
  - The aftercare box.
  - The families.
  - Noah.
  - Community photos.
- **Before/after:** Owl has no before/after pair, and none is invented. A before/after component uses the one permitted
  genuine fallback pair, unbranded and without job details, or a drawn SVG diagram.

**ATMOSPHERE:**
- **Default:** drawn SVG.
- **Stock and unproven photos** (`assets/source/owl-pages/unproven/`) are illustrative only: never captioned as Owl's
  work, with no towns, addresses or dates.

**Banned tropes (shown on the board):**
- A pristine house captioned as "our work".
- Stock drone or thermal shots passed off as the Wise Check.
- Fear close-ups.

## 7. Cursor companion
The native cursor is never hidden; one companion trails beside it.

**Variants:**
- **Owl eyes:** the logo's eye motif, not the logo. The pupils look ahead or settle on a button centre; the eyes widen on
  links; they blink on click.
- **Magnet:** the wheels roll by distance; it tilts toward buttons; a click pulls three nails up.
- **Off.**

**Behaviour:**
- **Choice:** remembered per visitor (localStorage with try/catch).
- **Following:** frame-rate-independent lag, so it never teleports.
- **Getting out of the way:** it drifts aside and fades over fields and `[data-owl-busy]` scenes.
- **Off entirely:** on touch, under reduced motion, and when the tab is hidden.
- **Press:** asymmetric, 0.84 over 100ms in, then 220ms out.

**Tests:** 31 interaction checks, logged in the Phase 2 gate.
