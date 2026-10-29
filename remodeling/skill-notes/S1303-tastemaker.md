# Skill Pack Notes: tastemaker [S1303] (read in full, lines 1-3477)
Covers SKILL + SECURITY + vendored ideagram + all 26 refs. Scripts and `.tastemaker/` files are tooling; none were run. Thesis: ground in real pixels, lock the style, taste = many small choices. **Show, don't tell.** Never overclaim.

## 0. Process before code
- Screen type = marketing narrative ("teaches through scroll"). One-line design read: `<surface> for <audience>, mode Persuade|Operate|Read|Experience, <visual lane>, dials variance/motion/density/art-direction`. Defaults 7/5/4/7. Persuade 7-9 / 5-8 / 3-5. Experience variance 8-10, motion 6-9.
- Reference board, 5 lanes: competitors, adjacent, **cultural sources (publications, physical objects, places, rituals)**, interface systems, anti-refs. 5-9 refs, real search when tools exist (else label `inferred, not viewed`). Borrow traits, not pixels.
- Direction contract: Thesis / First viewport / System / Risk. Must stay recognizable with all copy removed.
- Arc: Hook, Problem/stakes, Solution, How it works (3-5 steps), Proof (real only), Close (echo hook). **Min 4 beats, default 5**; state any merges.
- Pick 1 named macrostructure of 12. Fits here: **Gallery Grid** ("the work is the pitch", imagery sells), **Long-Scroll Narrative**, **Split Diptych**, **Poster Fold**. Never hero → 3 cards → testimonial → CTA → footer. **No two sections share an archetype.**
- Say picks aloud and stamp them as the first comment in `<style>`: `/* tastemaker · macrostructure · mood · arc: hook(H3) -> ... · nav/hero/footer · knobs · contrast: pass · critique: ShowTell n Phil n Hier n Spec n Restr n Var n ColorHarm n MoodTone n Type n Spatial n Pref n */`. The stamp must match the page.
- **Applies here:** Persuade/Experience on real photos.
  - Cultural lane: Miami light, stone, tile, oak, plaster, brass, site drawings.
  - Arc: finished room (hook) → dated "before" (problem) → B/A instruments (solution) → self-drawing plan as consult > design > build (how) → real projects (proof) → consult (close).

## 1. Archetypes (pick IDs)
- Nav: N1 minimal (an AI fingerprint unless ≤2 links) / **N2 product bar, frosts on scroll** / N3 floating pill, content-sized / N4 editorial masthead.
- Hero: H1 statement / H2 split demo (tilt 1-3°, clipped by the edge) / **H3 photographic fold** (full-bleed real photo, headline in a corner or below). Never stack eyebrow + headline + lede + CTA on one centered axis.
- Feature: **F1 alternating bands** / **F3 sticky stack** (pinned pane swaps its visual per step) / **F4 numbered steps** (each shows a state) / **F5 annotated capture** (numbered pins).
- Proof: P1 hairline logo wall / P2 quote + marginalia / P3 one huge quote / P4 stat strip (all real).
- CTA: C2 statement + action / C3 typographic link.
- Footer: Ft1 masthead / Ft4 statement close. Ft3 4-column = fingerprint.
- Section heads: S1 hanging / S2 inline small-caps / S3 sticky / S4 eyebrow stacked above. **Eyebrow-left / heading-right is banned.** Eyebrows OFF by default, 1-2 per page max.
- No fake browser or phone chrome. Collapse to 1 column below ~60rem. Step display type down below ~40rem.

## 2. Hero
- One job: optional eyebrow, headline of 6-12 words, subhead of 16-28 words (≤2 lines), 1 primary CTA + ≤1 secondary, **one proof visual**.
  - Physical work → **one strong product-in-context image**.
  - Abstract service → a **before/after moment**.
- Headline sizing:
  - 6-8 words = full display size (top of the clamp). 9-12 words = one tier down (15-20% smaller).
  - 3-5 words are capped at the same full size, on 1-2 lines. Never one word per line.
  - LH floor **1.0**.
- Fold at 1280×800 shows headline + lede + CTA. At 390px: no overflow, 3-5 lines.
- Let one side dominate. **One** rule-break only. Keep the hero palette quieter than the sections below. ≤2 real-number chips may sit ON the visual.
- **Animated B/A wipe:**
  - Two real captures, stacked absolutely. Clip the top one with `clip-path: inset()` driven by `--wipe`.
  - `gsap.to(el,{"--wipe":"80%",duration:4,ease:"sine.inOut",yoyo:true,repeat:-1})`.
  - Range **15-85%**. Reduced motion freezes it at **50%**. Never stage one side to look worse.
- Subtraction test: each group answers "what is it / why care / what next / what does good look like". Reference check: name one concrete device (Linear: huge type + real screenshot fading under a top vignette + one text-link secondary).
- **Applies here:** H3 finished-room photo, or a B/A wipe from a real pair. No badges or orbits. Hero motion ≤4 beats.

## 3. Typography
- Mood pairings (Google Fonts):
  - Premium: Unbounded + Albert Sans.
  - Warm: Zain + Nunito (alt Epilogue + Baskervville).
  - Technical: Archivo + IBM Plex Sans.
  - Playful: Urbanist + Open Sans.
  - **Elegant: Gloock + Inter** (alt EB Garamond + DM Mono accents).
  - Classify mood: luxury/boutique/"premium but soft" = elegant; individuals/marketplace = warm.
- **≤3 families** (display + body + one outlier used in ≤2 slots).
- **No italic headers**: no `<em>` inside a heading, no italic display face. Italic only in body copy.
- No mono body. Section heads stay **50-65% of hero size**, 1-2 lines.
- `text-wrap:balance` on heads, `tabular-nums` on figures. Real … and curly quotes. `12&nbsp;ft`.
- **Applies here:** scroll-choreographed text stays roman. Reveal by line or word using transform/opacity only, never past the hero ceiling.

## 4. Color
- Contrast contract:
  - Text on bg/surface, button label on its fill, accent-as-text: **4.5:1**.
  - Fill vs page, icon, state border: **3:1**. Decorative hairline exempt.
  - Check every pairing actually used.
- Fix order: reuse a legal pair → nudge **lightness** within the same hue → fall back to a safe neutral → surface the conflict.
- Gates:
  - No indigo→purple or blue→cyan gradients, **no gradient text**.
  - Neutrals tinted toward the anchor hue. **Accent ≤5% of viewport.**
  - Panels with OKLCH L<50% swap to light text, inherited by children.
  - **All colors and fonts via `var()` tokens**, no inline hex.
- Anchors (character only, don't ship):
  - Warm: #2B2118 / #FBF7F0 / #B85A38 / #F0E4D3 / #7A8C6E, radius 12-20.
  - Elegant: #211F1C / #F7F4EE / #2F2A24 / #E8E1D3 / #B5762C, hairline rules not cards.
  - Elegant dark: #EFE9DC / #171310 / #9C6524 / #241E17 / #D9A54A.
- Theme toggle: `data-theme` on `<html>`, defaults from `prefers-color-scheme`, inline pre-paint script, localStorage override. Each mode re-verifies its own contrast.

## 5. Spacing, shape, layout
- Space tokens (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192. **Internal ≤ external.**
- Cards: compact 12-16, content ≥24, showcase ≥32.
- Sections: connective 48-64, standard 64-96, **pivotal 128-192**. Boundary gap **120-250px** on desktop. At ≤40rem drop 1-2 tiers.
- **One** section-separation mechanism (tint OR hairline OR padding). **One** radius scale (e.g. 4/8/16).
- No horizontal scroll from 320 to 1920px:
  - `overflow-x:clip` on html and body.
  - `minmax(0,1fr)` grid tracks.
  - `overflow-wrap:anywhere; min-width:0` on display heads.
- No two-line buttons or links. Hit targets ≥44px. Respect `env(safe-area-inset-*)`.

## 6. Imagery and assets
- Asset cast: hero anchor, range, process artifacts, real proof, **texture object (stone, paper, fabric, material)**, micro assets (icons, swatches, **cursors**, pins).
  - Each image gets one distinct role.
  - A capture family repeated more than twice needs a story reason.
- Gates: ≥1 section each shows range, process and **physicality**. **Motion belongs to the assets, not just the text.**
- Credits live in code comments only. **Preserve the logo byte-for-byte**; never a letter in a box. One icon family, no emoji icons.
- **No invented metrics, quotes or logos.** Use `—` + "metric to confirm", or cut it.
- No caption that narrates the visual (a tagged compare slider needs no caption).
- Images: explicit width/height, `loading=lazy` below the fold, `fetchpriority=high` on the hero. Use `height:auto` with `aspect-ratio`.
- **Applies here:** B/A pairs = process proof. Material close-ups = texture object. Floor plans = process artifacts. Cursor = micro asset.

## 7. Motion
- Gate every motion: how often is it seen, what is it for, does it fit the budget (**UI <300ms, small <200ms**), does it help the task. Delete it if not.
- Easing tokens:
  - `--ease-out: cubic-bezier(0.23,1,0.32,1)`
  - `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`
  - `--ease-drawer: cubic-bezier(0.32,0.72,0,1)`
- Durations: press 120 (range 100-160), popover 180, panel 240, dropdown 150-250, modal 200-500, on-screen move 180-300 in-out. **No ease-in on UI.**
- Engine: **GSAP 3.12.5 + ScrollTrigger** (cdnjs) by default. Reveals 0.22s, 16px, `power3.out`, stagger 0.06. `gsap.matchMedia()` for reduced motion. **One engine.**
- Storytelling:
  - `scrub` reveals: a path draws, a number counts.
  - **Pins: 1-2 per page.**
  - Hero ≤4 beats: context → headline → subhead+CTA → visual as one block.
  - **Parallax = small y offsets.** Large reads as a gimmick.
- Entrances fade + 8-16px rise in 150-250ms, no bounce. Hover 100-150ms. Press `scale(0.97)`.
- Never `scale(0)`; start from 0.95 + opacity 0. Blur ≤20px. Exit along the entry path.
- **Only transform/opacity. No `transition: all`.**
- Springs: `{type:"spring",duration:0.4,bounce:0}`. Bounce 0.2 only for momentum gestures.
- Reduced motion = ≤150ms opacity crossfade, not a dead page.
- Review: run at 25% speed, spam toggles (motion retargets, doesn't restart), test reduced motion and touch hover.
- **Applies here:** 3 subtle parallax depth layers. The plan scrubs `stroke-dashoffset`; SVG `<g>` gets `transform-box:fill-box; transform-origin:center`. Every layer degrades to its end state.

## 8. Pointer work: cursor, B/A drag, Three.js
- **Lerp, never 1:1:**
  - `cur += (target-cur)*f`, f **0.06-0.12** (example 0.08), one rAF / `gsap.ticker`.
  - Differential layers: background small, mid medium, foreground **10-25px max**.
  - Bind to the section, **reset on mouseleave**.
  - Only under `@media (hover:hover) and (pointer:fine)`; no listeners on touch.
  - Skip under reduced motion. **Never move a CTA out from under the pointer.**
- Hover: no uniform hover-scale; don't stack translate+scale+shadow+color; no `cubic-bezier(0.34,1.56,…)` on UI. `:focus-visible` rings are **instant** and ≥3:1.
- Drag:
  - Pointer Events + `setPointerCapture`. Respond on down, commit on up.
  - **Respect the grab offset.** Hand release velocity to a spring. Soft resistance at bounds.
  - Drag itself is NOT gated by reduced motion; the snap settle IS (no overshoot).
  - No text selection while dragging.
- WebGL behind text: outer field only, opacity 0.3-0.6, plus a bg-color vignette. Speed 0 under reduced motion.
- **Applies here:**
  - Cursor: lerp, grows on B/A handles and the orbit canvas, hidden on touch.
  - B/A handle: keyboard slider.
  - Three.js room: static under reduced motion; it is the page's one rule-break.

## 9. Variants: the 1·2·3 switch
- Variants differ on a **named axis: layout, density, hierarchy, interaction or motion. Color swaps are not variants.**
- Every variant: locked tokens, real content, shippable (no dead controls).
- Write a direction table first: Variant | Axis | Bet | Cost (e.g. Quiet / Editorial / Operational).
- Picker:
  - One variant at real size.
  - Neutral floating pill, bottom-center unless it covers the work.
  - **Number keys switch, ←/→ cycle, `R` replays entrance, URL param (`?v=2`), exactly one `aria-current="true"`.**
  - **Swap is instant, no animation.**
  - Dark-glass chrome allowed (outside product tokens).
- Verify: every variant by mouse and keyboard, console clean, 390px + desktop, reduced motion.
- **Applies here:** per-section state (`?hero=2&plans=3`). Keys bind to the focused or in-view section. Kill and re-init that section's ScrollTriggers, then refresh.

## 10. Single-file HTML and copy
- Static stack: no registries, no `npx`; port patterns by hand and say so.
- One `:root` token block (+ `[data-theme=dark]`). GSAP from CDN. Preconnect, `font-display:swap`.
- Skip link. `<button>` / `<a>` only. No `user-scalable=no`. `color-scheme`, `theme-color`, `Intl` formatting, `translate="no"` on the brand.
- **Copy:**
  - One checkable fact per headline, false for any competitor.
  - Write 3 candidates (mechanism / outcome / tension).
  - Reject template shapes: "The [adj] way to…", "[Noun] made [adj]", "Where X meets Y", "Your X, reimagined".
  - Specific CTAs ("See the work").
  - **No em dashes anywhere**, including alt and meta.

## 11. Self-review / QA
- Pre-emit critique: 11 axes scored 1-5 (ShowTell, Philosophy, Hierarchy, Specificity, Restraint, Variety, ColorHarm, MoodTone, Type, Spatial, Pref). **Any score <3 → revise.**
- Then the gate sweep: show-don't-tell, named shape, arc ≥4 beats, one rule-break, hero tests, every pairing checked, accent ≤5%, scale spacing, not static, reduced-motion path, ≤3 fonts, no italic heads, real assets only, tokens only, no visible credits.
- Handoff: say honestly what was ported or fell back.
