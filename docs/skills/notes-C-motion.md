# Skill digest C: motion and easing (read in full, my own thread)

Skills: S0617, S1436 (read during the rebrand, re-applied), S0187, S1465, S0441, S0918, S1329, S0065, S0410, S0181, S0063, S1321, S0633.

## THE ONE EASING LANGUAGE (binding for every new or rebuilt section)
The Unseen scope is one easing language only. Scout's live CSS shows a single dominant curve used 65 times. Transferred mechanism: **one family, used everywhere, with three roles.**

| token | curve | GSAP equivalent | role |
|---|---|---|---|
| `--ez-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | `"expo.out"` / `"power4.out"` | every entrance, UI open, hover-in, settle (S0410 smooth-out, S0063 strong ease-out) |
| `--ez-move` | `cubic-bezier(0.38, 0.005, 0.215, 1)` | `"power3.inOut"` approximation | on-screen moves between two states: camera, nudge, stack shift, morph (the Scout mechanism: slow lift-off, long settle) |
| `--ez-in` | `cubic-bezier(0.55, 0, 0.75, 0.2)` | `"power4.in"` | exits only. Exits run at about 75% of their entry duration. |
| (scrub) | `none` | `ease:"none"` | anything mapped to scroll |

- Banned:
  - `ease-in` on any UI entrance;
  - `transition: all`;
  - `bounce.out` and `elastic.out`;
  - built-in `ease` or `ease-in-out` on new work.
- `back.out(1.4)` is allowed only on a rare celebratory entrance: the star tally landing, or the companion's arrival hop.

## Duration scale (S1465 / S0410 / S0063 merged; 6 tokens)
| token | ms | use |
|---|---|---|
| `--d-1` | 80 | intent delay (tooltip and hover gating), micro stagger |
| `--d-2` | 150 | press release, closes, text swap |
| `--d-3` | 250 | hover-in, dropdown or accordion open, icon morph, page-slide part |
| `--d-4` | 400 | panel open, card reveal, logo micro story beat |
| `--d-5` | 650 | section entrance (headline words over about 0.8s in total) |
| `--d-6` | 1000 | rare hero arrival or camera move outside scroll (S0633 "large reveal 900-1800") |

- Press feedback: `scale(.97)`, 100 to 160ms.
- Hover-out may be slower and softer than hover-in. Never delay a close or a hover-out.
- **Stagger:**
  - 40ms per item, or 80ms for a few large items;
  - total at most 300 to 500ms;
  - word reveals 0.035 to 0.07s;
  - stagger is decorative and never blocks interaction.
- **Distance:**
  - 4px for a swap;
  - 8px for a slide;
  - 12px for a text reveal;
  - 24 to 48px for a section reveal;
  - more than 40px only for a full panel.
- **Pre-scale:** never `scale(0)`. Start from 0.96 to 0.99 together with opacity.
- **Blur:** 2 to 3px, or 8 to 10px only on text-scale reveals.

## Gates every animation must pass (S0065 / S0063)
1. **Frequency.** Keyboard and 100+-per-day actions get no animation. Hover gets near-imperceptible motion.
2. **Purpose.** It must be one of feedback, spatial consistency, state indication, preventing a jarring change, explanation, or delight (delight only on rare moments). "It looks cool" is rejected.
3. **Budget.** UI motion stays under 300ms. Marketing explanation can be longer.
4. **Function.** Data being read does not move for style.
- Hover motion is gated behind `@media (hover:hover) and (pointer:fine)`.
- Reduced motion means gentler, not zero: keep opacity and colour, drop movement, drop pin and scrub.

## Per-skill rules
### S0181 gsap-core / S0187 gsap-timeline
- Use transform aliases (`x`, `y`, `xPercent`, `scale`, `rotation`) and `autoAlpha`.
- Use `svgOrigin` for shared SVG pivots, never together with `transformOrigin`.
- Use `immediateRender:false` on stacked from-tweens.
- Use timelines with labels rather than delay chains.
- Set `defaults` on each timeline.
- Use `gsap.matchMedia()` with `reduceMotion` and `isDesktop` conditions; it reverts automatically.

### S0063 review-animations (the review bar I run per section)
- **Escalation triggers:**
  - `transition: all`;
  - `scale(0)`;
  - `ease-in` on UI;
  - more than 300ms of UI with no reason;
  - keyframes on rapidly triggered UI (use transitions);
  - animating layout properties;
  - a CSS variable on a parent driving child transforms;
  - ungated hover;
  - an everything-at-once entrance.
- Popovers originate from their trigger.
- Drag: velocity dismissal above 0.11 px/ms, pointer capture, damping at edges, extra touches ignored.
- Crossfades are masked with a 2px blur.

### S1321 cinematic-gsap-lenis-motion-system
- Reveal at `top 82%`, once.
- Choreography:
  - **hero:** media first, then headline lines, then support, then CTA;
  - **section:** label, then heading, then media, then cards.
- Pinned scenes carry one idea per viewport.
- Magnetic buttons: translate only, scale under 1.03. Magnetic cards: under 4° of rotation.
- Image zoom from 1 to 1.06 over 0.7s.
- Animated arrows move 6px.
- Parallax: the background is slower and the text mostly stable.
- The custom cursor is hidden on coarse pointers and under reduced motion.
- The page must read if all decorative motion is removed.

### S0633 motion-design
- **Beat map per scene:** time, viewer takeaway, focal object, transformation, copy, exit.
- **Anchor:** one recurring motif connects the beats. For Elbaz this is the **ink line**: the construction pen line that draws, carries and becomes the next section's frame.
- **Choreography:**
  - layers are primary action, secondary weight or causality, and ambient (only if needed);
  - quiet holds can be still;
  - give fast actions preparation and recovery.
- **Transitions and pacing:**
  - match-cut across shared shapes;
  - preserve velocity at hand-offs;
  - alternate action and rest;
  - reserve the strongest transformation for the central idea.
- **SVG pops:** set `svgOrigin` before the from-state.
- **Determinism:** no `Date.now` state, and procedural drawing comes from time or progress.

### S1329 staggered-word-reveal / S0451 masked reveal
- `y` 20 to 0, 0.8s, `cubic-bezier(.16,1,.3,1)` (the `--ez-out` family), 0.07s stagger, IO at threshold 0.2, once.
- No JS means the text stays visible.
- `aria-label` sits on the parent.

### S0918 animation-performance
- Compositor-only properties.
- `will-change` only during an animation.

### S0441 animation-systems
- Restraint: one strong hero moment per page, everything else supporting.
- Fade and rise of 12 to 24px.
- Hover lift of -2 to -6px.
- Reveals trigger at 20 to 30% visibility.

### S0617 emilkowalski-motion
- Controls take 140 to 220ms.
- No endless decorative loops unless they communicate status. (The cursor companion is the sanctioned custom-cursor exception, per the owner.)

### S1436 animation-principles (from the rebrand phase)
- Staging, anticipation, follow-through, slow-in and slow-out, arcs, secondary action, timing.
- One clear focal action at a time.
