# PizzaBurg / NEXIX — 2D Overlay Layer Specification

Implementation spec for the HTML/CSS/GSAP layer that sits on top of `src/world.js`.
Written against the real data in `src/data.js` (31 slides, 6 presenters, 14 zones) and the
real vendor bundle in `assets/vendor/` (GSAP 3 **core only**, Three.js).

**Read this first — five facts that constrain everything below.**

1. `World.goTo(slide, instant)` tweens the camera for `Math.min(2.5, 1.05 + dist/130)` seconds
   on `power2.inOut`. The overlay choreography must **finish before the camera settles**, not
   race it. Budget: overlay done at ~1.15 s, camera still moving. Text leads, world follows.
2. `scene.background = PAPER` and `scene.fog = Fog(PAPER, 78, 300)`. The 3D world is already a
   warm paper world. Do **not** design as if the background were a photograph. The legibility
   job is *local contrast management*, not *global dimming*.
3. `assets/vendor/gsap.min.js` is 72 KB = **core only**. There is no SplitText, no CustomEase,
   no Flip, no ScrollTrigger. Every technique below uses core `gsap.to/from/fromTo/timeline/
   set/context/matchMedia/utils/quickTo` and named eases only. A hand-rolled line splitter is
   specified in §4.3.
4. `assets/fonts/fraunces-latin.woff2` exposes **only two axes**: `opsz 9–144`, `wght 100–900`.
   `SOFT` and `WONK` were pinned out when the subset was made. `font-variation-settings:'SOFT' 60`
   will silently do nothing today. §2.4 gives the exact re-subset command if you want them back.
   `inter-latin.woff2` exposes `wght 100–900` only (no `opsz`, no `slnt`).
5. Slides per presenter, in order: **Ratul 5, Aditto 5, Liya 5, Souvo 5, Sourov 5, Esha 6 = 31.**
   Those six integers are the `flex-grow` values of the progress rail. Do not compute them at
   runtime from a hand-typed table — derive from `SLIDES[i].by`.

---

## 0. Tokens

Everything in the spec resolves to these. One `:root`, one high-contrast override, no magic numbers
below this line.

```css
:root{
  /* ---- paper & ink ---------------------------------------------------- */
  --paper:        #F3ECE1;
  --paper-hi:     #FBF7F0;   /* raised card, +3% */
  --paper-sunk:   #EAE1D3;   /* recessed well, -3% */
  --ink:          #1A1614;
  --muted:        #6B615A;
  --muted-strong: #574E48;   /* projector-mode swap for --muted */

  --red:          #E23B2E;   /* display / fills / ≥24px text only */
  --red-deep:     #A82418;   /* body-size red text, urgent status */
  --amber:        #F0A830;   /* FILL ONLY — never text, never alone */
  --amber-ink:    #8A5A00;   /* the text colour that means "amber" */
  --basil:        #4E7A5B;   /* fills, ≥24px text */
  --basil-ink:    #3D6149;   /* body-size green text */

  /* ---- hairlines & shadow --------------------------------------------- */
  --line:         color-mix(in oklab, var(--ink) 12%, transparent);
  --line-strong:  color-mix(in oklab, var(--ink) 22%, transparent);
  --hair:         1px;
  --shadow-plate: 0 1px 0 rgba(255,252,247,.65) inset,
                  0 2px 6px rgba(58,42,30,.06),
                  0 18px 44px -18px rgba(58,42,30,.30);
  --shadow-card:  0 1px 2px rgba(58,42,30,.07), 0 8px 22px -12px rgba(58,42,30,.26);

  /* ---- plate opacity — the single most important knob in the deck ------ */
  --plate-a:      .88;       /* text plate alpha over the 3D */
  --plate-a-edge: .74;       /* alpha at the plate's outer edge */
  --wash-a:       .55;       /* mid-frame paper wash */
  --wash-a-edge:  .86;       /* frame-edge paper wash */
  --grain-a:      .045;

  /* ---- geometry ------------------------------------------------------- */
  --u:    min(1vw, 1.7778svh);            /* 1% of the largest 16:9 box that fits */
  --gut:  clamp(20px, calc(3.2 * var(--u)), 72px);
  --gap:  clamp(16px, calc(2.0 * var(--u)), 40px);
  --pad-plate: clamp(18px, calc(2.4 * var(--u)), 44px);
  --r-sm: 6px;  --r-md: 10px;  --r-lg: 16px;  --r-plate: 18px;

  /* ---- motion --------------------------------------------------------- */
  --e-out:    cubic-bezier(.23,1,.32,1);      /* Emil Kowalski's strong ease-out */
  --e-inout:  cubic-bezier(.77,0,.175,1);
  --e-sheet:  cubic-bezier(.32,.72,0,1);      /* iOS drawer curve */
  --t-tap:   140ms;  --t-ui: 200ms;  --t-panel: 300ms;

  --z-canvas: 0; --z-wash: 1; --z-slide: 2; --z-grain: 3;
  --z-chrome: 4; --z-panel: 5; --z-overview: 6; --z-modal: 7; --z-cursor: 9;
}

/* Portrait phones: the 16:9 unit collapses to nothing, so re-base it. */
@media (max-aspect-ratio: 4/5){
  :root{ --u: min(2.9vw, 1.05svh); --plate-a: .93; --wash-a: .40; }
}

/* Projector / low-contrast room. Toggled by the P key or #projector. */
html[data-contrast="high"]{
  --plate-a: .97; --plate-a-edge: .94;
  --wash-a: .70; --wash-a-edge: .95;
  --muted: var(--muted-strong);
  --line: color-mix(in oklab, var(--ink) 20%, transparent);
  --hair: 1.5px;
  --grain-a: 0;
}
```

### 0.1 Contrast ledger (measured, sRGB, WCAG 2 formula)

Computed against `--paper #F3ECE1`. Use this table instead of guessing.

| Foreground | on paper | Verdict |
|---|---|---|
| `--ink #1A1614` | **15.31 : 1** | AAA everywhere |
| `--ink` over plate at α .86 on a *black* worst-case backdrop | **11.15 : 1** | AAA even in the worst pixel of the scene |
| `--muted #6B615A` | **5.14 : 1** | AA body, **not** AAA — fine ≥16px, avoid ≤13px |
| `--muted-strong #574E48` | **6.91 : 1** | projector-safe replacement |
| `--red-deep #A82418` | **6.11 : 1** | AA body text, safe at any size |
| `--red #E23B2E` | **3.65 : 1** | large text only (≥24px, or ≥19px bold). Never body. |
| `--basil #4E7A5B` | **4.20 : 1** | large text only |
| `--basil-ink #3D6149` | **5.96 : 1** | AA body |
| `--amber-ink #8A5A00` | **5.05 : 1** | AA body |
| `--amber #F0A830` | **1.73 : 1** | **fails even the 3:1 non-text minimum.** Amber is a fill that must always sit beside an ink label or an ink hairline. It may never be the only carrier of meaning, and it may never be text. |

Rule that falls out of the table: **every status in every diagram is encoded twice — colour *and*
glyph.** `● match  ◐ partial  ○ unknown  ▲ urgent  ✕ weak  ★ best`. This also solves colour-blindness
and survives a projector that eats saturation.

---

## 1. Layout system

### 1.0 The stage

```html
<div id="app">
  <canvas id="world"></canvas>            <!-- z 0, fixed, 100dvw × 100dvh -->
  <div class="wash" aria-hidden="true"></div>   <!-- z 1, §3.2 -->
  <main id="stage" class="stage">          <!-- z 2 -->
    <section class="slide" data-layout="split" …>…</section>
  </main>
  <div class="grain" aria-hidden="true"></div>  <!-- z 3, §3.5 -->
  <div class="chrome">…</div>              <!-- z 4, §6 -->
</div>
```

```css
html,body{height:100%;overflow:hidden;overscroll-behavior:none;background:var(--paper)}
#world{position:fixed;inset:0;width:100%;height:100%;display:block;z-index:var(--z-canvas)}

.stage{
  position:fixed; inset:0; z-index:var(--z-slide);
  display:grid; place-items:stretch;
  padding: clamp(48px,calc(6*var(--u)),96px) var(--gut) clamp(64px,calc(7*var(--u)),110px);
  /* top pad clears the rail, bottom pad clears the chrome bar */
  pointer-events:none;                 /* the world stays draggable/hoverable */
}
.stage > .slide{ pointer-events:auto; grid-area:1/1; }   /* all slides stack in one cell */
```

Only **two** `.slide` nodes are in the DOM at a time (outgoing + incoming). Everything else is
built on demand and destroyed on transition end. The outgoing node gets `inert` the instant a
navigation starts, so a screen reader or a Tab press can never land in a dying slide.

Universal slide skeleton — identical for all six layouts, the layout only changes the grid:

```html
<section class="slide" data-layout="split" data-by="ratul" data-idx="1"
         aria-roledescription="slide" aria-label="2 of 31 — The worker is the product">
  <div class="col col--text">
    <div class="plate">
      <p  class="kicker">Why this topic</p>
      <h2 class="t-display" data-split>The worker is the product</h2>
      <p  class="t-sub"    data-split>…titleSub, cover/feature only…</p>
      <p  class="lede"     data-split>In a factory a manager catches…</p>
      <ul class="bullets">
        <li class="bullet"><b class="b-head">No safety net</b>
            <span class="b-body">The worker and the food reach…</span></li>
      </ul>
    </div>
  </div>
  <div class="col col--viz">
    <figure class="viz" data-kind="photo">…</figure>
  </div>
</section>
```

### 1.1 The six layouts

Base grid, shared:

```css
.slide{
  display:grid;
  grid-template-columns: repeat(12, minmax(0,1fr));
  column-gap: var(--gap); row-gap: clamp(16px,calc(2.4*var(--u)),44px);
  align-content:center; justify-items:stretch;
  max-width: 1680px; width:100%; margin-inline:auto;
}
```

| Layout | Columns (≥1281px) | Text max-width | Visual aspect | Vertical |
|---|---|---|---|---|
| `cover` | text `2 / span 8`, visual `1 / -1` behind, offset | 18ch title / 46ch lede | 21:9 photo bleeding right | `align-content:center`, title optically raised 4% |
| `split` | text `1 / span 6`, visual `7 / -1` | 560px | 4:3 → 3:2 | both columns `align-self:center` |
| `splitR` | visual `1 / span 6`, text `7 / -1` | 560px | 4:3 → 3:2 | ditto |
| `wide` | text `1 / span 8`, visual `1 / -1` row 2 | 720px | full width, `min-height: clamp(180px, 34svh, 420px)` | text row `auto`, visual row `1fr` |
| `feature` | content `2 / span 10`, centred | 22ch statement, 54ch support | none, or a single glyph | `place-content:center`, text-align left (never centred body) |
| `closing` | content `2 / span 10` | 26ch | team grid full width | centred block, generous 12svh top offset |

```css
.slide[data-layout="cover"]   .col--text{ grid-column:2/span 8;  }
.slide[data-layout="cover"]   .col--viz { grid-column:1/-1; grid-row:1; z-index:-1;
                                          justify-self:end; width:min(64%,900px); opacity:.96 }
.slide[data-layout="split"]   .col--text{ grid-column:1/span 6 }
.slide[data-layout="split"]   .col--viz { grid-column:7/-1 }
.slide[data-layout="splitR"]  .col--viz { grid-column:1/span 6 }
.slide[data-layout="splitR"]  .col--text{ grid-column:7/-1 }
.slide[data-layout="wide"]    .col--text{ grid-column:1/span 8; grid-row:1 }
.slide[data-layout="wide"]    .col--viz { grid-column:1/-1;     grid-row:2 }
.slide[data-layout="feature"] .col--text{ grid-column:2/span 10; max-width:none }
.slide[data-layout="closing"] .col--text{ grid-column:2/span 10 }
.slide[data-layout="closing"] .col--viz { grid-column:1/-1; grid-row:2 }

.col--text{ max-width:560px }
.slide[data-layout="wide"]  .col--text{ max-width:720px }
.slide[data-layout="cover"] .col--text{ max-width:min(760px, 62ch) }
.lede{ max-width:52ch } .b-body{ max-width:46ch }
.slide[data-layout="feature"] .t-display{ max-width:22ch }
```

**Measure discipline.** No line of body copy exceeds 52 characters at any breakpoint; the display
title never exceeds 22. This is what makes the deck read from the back of a room. Enforce with
`max-width` in `ch`, not with `width`.

### 1.2 Reflow

**1280px** (typical laptop + most classroom projectors at 1280×800/1024×768)
- Grid unchanged. `--u` drops to 12.8 so the whole scale shrinks ~30% automatically — no
  breakpoint needed for type.
- `wide` visual: `min-height` clamp resolves near 272px; diagrams switch to their `compact`
  variant at `container-type: inline-size` ≤ 760px (see §5.0), not at a viewport width.
- 4:3 (1024×768): `--u = min(10.24, 13.65) = 10.24`. Display title lands at 55px, plate padding
  at 25px, and the `wide` layout's row 2 gets `max-height: 46svh` so text never gets pushed off.

```css
@media (max-aspect-ratio: 3/2){          /* catches 4:3 and 5:4 projectors */
  .stage{ padding-block: clamp(40px,5svh,72px) clamp(56px,7svh,92px) }
  .slide[data-layout="wide"]  .col--viz{ max-height:46svh }
  .slide[data-layout="cover"] .col--viz{ width:min(52%,720px) }
  .bullets{ --bullet-gap: clamp(8px,1.4svh,16px) }
}
```

**900px** — the stacking point. Two-column layouts become one.

```css
@media (max-width: 900px){
  .slide{ grid-template-columns: repeat(6, minmax(0,1fr)); row-gap:clamp(14px,3svh,28px) }
  .slide[data-layout="split"]  .col--text,
  .slide[data-layout="splitR"] .col--text,
  .slide[data-layout="wide"]   .col--text,
  .slide[data-layout="cover"]  .col--text,
  .slide[data-layout="feature"].col--text,
  .slide[data-layout="closing"].col--text{ grid-column:1/-1; grid-row:1; max-width:640px }
  .slide .col--viz{ grid-column:1/-1; grid-row:2 }
  .slide[data-layout="cover"] .col--viz{ z-index:-1; width:100%; opacity:.55 } /* becomes a wash */
  .slide[data-layout="splitR"] .col--viz{ grid-row:2 }   /* text always first in reading order */
  .stage{ align-content:start; padding-top: clamp(56px,9svh,88px) }
  .plate{ --plate-a:.92 }
}
```

Note the `splitR` reversal: on desktop the visual is on the left for rhythm, but on a phone text
must lead. Because the visual is already second in DOM order, the desktop rule is a `grid-column`
override and the mobile rule is simply its absence. No `order` shuffling, so tab order and screen
reader order are correct at every width without a single `aria` patch.

**480px**

```css
@media (max-width: 480px){
  :root{ --gut:16px; --pad-plate:16px; --gap:12px }
  .plate{ border-radius:14px; padding:16px 16px 18px }
  .bullets{ gap:10px }
  .b-head{ display:block }                    /* head above body, not inline */
  .slide[data-layout="wide"] .col--viz,
  .slide .viz{ margin-inline:calc(-1 * var(--pad-plate)) }  /* diagrams bleed edge-to-edge */
  .viz[data-kind]{ --viz-density: compact }
  .stage{ overflow-y:auto; overscroll-behavior:contain; -webkit-overflow-scrolling:touch }
  .slide{ min-height:100%; align-content:start; padding-bottom:24px }
}
```

On phones only, the stage becomes vertically scrollable — a 22-tile grid or an 8-row scorecard
cannot honestly fit 844px of height. Swipe navigation therefore uses the horizontal axis only
(§7.4), and `touch-action: pan-y` on `.stage` keeps the two gestures from fighting.

**Tall phones / notched devices.** Use `svh` for sizing (stable, ignores the collapsing URL bar)
and `dvh` never — a mid-animation viewport resize caused by the browser chrome would re-trigger the
line splitter. Add `padding-bottom: max(24px, env(safe-area-inset-bottom))` on `.chrome`.

---

## 2. Type scale

### 2.1 Faces

```css
@font-face{font-family:Fraunces;src:url(assets/fonts/fraunces-latin.woff2)format('woff2-variations');
  font-weight:100 900;font-stretch:100%;font-display:swap;font-optical-sizing:auto}
@font-face{font-family:InterVar;src:url(assets/fonts/inter-latin.woff2)format('woff2-variations');
  font-weight:100 900;font-display:swap}
@font-face{font-family:PoppinsMark;src:url(assets/fonts/poppins-700-latin.woff2)format('woff2');
  font-weight:700;font-display:block}   /* block: the wordmark must never flash a fallback */

:root{
  --ff-display:Fraunces,'Iowan Old Style',Georgia,serif;
  --ff-ui:InterVar,'SF Pro Text',system-ui,-apple-system,'Segoe UI',sans-serif;
  --ff-mark:PoppinsMark,var(--ff-ui);
}
body{ font-family:var(--ff-ui); font-synthesis:none; text-rendering:optimizeLegibility;
      -webkit-font-smoothing:antialiased; font-variant-numeric:tabular-nums lining-nums }
```

`font-synthesis:none` is not optional. Both faces are variable; letting the browser fake a bold
would produce two different-looking 700s in the same paragraph on Safari.

### 2.2 The scale

All sizes are `clamp(floor, calc(k × --u [+ b]), ceiling)`. `--u` already encodes the
16:9-normalised viewport, so a 4:3 projector shrinks the whole system proportionally and nothing
overflows. Sizes shown resolved at 1920×1080 / 1280×720 / 1024×768 / 390×844.

| Token | `font-size` | 1920 | 1280 | 1024×768 | 390 | line-height | letter-spacing | weight / family |
|---|---|---|---|---|---|---|---|---|
| `--fs-kicker` | `clamp(11px, calc(.42*var(--u) + 6px), 15px)` | 14.1 | 11.4 | 11 | 11 | `1.1` | `.14em` | Inter 600, `text-transform:uppercase` |
| `--fs-display` | `clamp(34px, calc(5.4*var(--u)), 92px)` | 92 | 69 | 55 | 44¹ | `.96` | `-.022em` | Fraunces 800, `opsz 96` |
| `--fs-sub` | `clamp(17px, calc(1.55*var(--u) + 5px), 30px)` | 30 | 24.8 | 20.9 | 18.7 | `1.22` | `-.008em` | Fraunces 400, `opsz 42` |
| `--fs-lede` | `clamp(16px, calc(1.20*var(--u) + 6px), 25px)` | 25 | 21.4 | 18.3 | 16.6 | `1.42` | `-.004em` | Inter 400 |
| `--fs-bhead` | `clamp(14px, calc(.85*var(--u) + 7px), 20px)` | 20 | 17.9 | 15.7 | 14.5 | `1.25` | `.002em` | Inter 650 |
| `--fs-bbody` | `clamp(13.5px, calc(.80*var(--u) + 6px), 19px)` | 19 | 16.2 | 14.2 | 13.5 | `1.5` | `0` | Inter 400 |
| `--fs-stat` | `clamp(30px, calc(3.4*var(--u)), 64px)` | 64 | 43.5 | 34.8 | 30 | `.9` | `-.03em` | Fraunces 700, `opsz 72`, `tabular-nums` |
| `--fs-statlab` | `clamp(11px, calc(.35*var(--u) + 7px), 14px)` | 13.7 | 11.5 | 11 | 11 | `1.2` | `.08em` | Inter 600 uppercase |
| `--fs-caption` | `clamp(11px, calc(.35*var(--u) + 7px), 15px)` | 13.7 | 11.5 | 11 | 11 | `1.35` | `.005em` | Inter 400, `--muted` |
| `--fs-ui` | `clamp(11px, calc(.28*var(--u) + 7.5px), 14px)` | 13.1 | 11.1 | 11 | 11 | `1.1` | `.02em` | Inter 500 |
| `--fs-feature` | `clamp(28px, calc(4.2*var(--u)), 72px)` | 72 | 53.8 | 43 | 37¹ | `1.04` | `-.018em` | Fraunces 700, `opsz 80` |

¹ Portrait override: `@media (max-aspect-ratio:4/5){ --fs-display:clamp(30px,calc(4.6*var(--u)),44px); --fs-feature:clamp(26px,calc(3.9*var(--u)),38px) }`

Letter-spacing logic, stated once so it is not re-litigated per element: **tracking is inversely
proportional to size.** Display serif at 92px is set tight (`-.022em`) because Fraunces at high
`opsz` already opens its sidebearings; UI text at 11px is set loose (`.02em`) because it will be
projected through a lens that smears; all-caps is always `≥ .08em` because caps have no
descender rhythm to carry the eye.

```css
.kicker{font:600 var(--fs-kicker)/1.1 var(--ff-ui);letter-spacing:.14em;text-transform:uppercase;
        color:var(--muted)}
.t-display{font-family:var(--ff-display);font-weight:800;font-size:var(--fs-display);
        line-height:.96;letter-spacing:-.022em;font-variation-settings:'opsz' 96;
        text-wrap:balance;color:var(--ink);margin:0}
.t-sub{font-family:var(--ff-display);font-weight:400;font-size:var(--fs-sub);line-height:1.22;
        letter-spacing:-.008em;font-variation-settings:'opsz' 42;color:var(--muted);
        text-wrap:pretty}
.lede{font-size:var(--fs-lede);line-height:1.42;letter-spacing:-.004em;color:var(--ink);
        text-wrap:pretty;max-width:52ch}
.b-head{font-weight:650;font-size:var(--fs-bhead);line-height:1.25;color:var(--ink)}
.b-body{font-size:var(--fs-bbody);line-height:1.5;color:var(--muted);text-wrap:pretty}
.stat-v{font-family:var(--ff-display);font-weight:700;font-size:var(--fs-stat);line-height:.9;
        letter-spacing:-.03em;font-variation-settings:'opsz' 72;font-variant-numeric:tabular-nums}
.stat-l{font:600 var(--fs-statlab)/1.2 var(--ff-ui);letter-spacing:.08em;text-transform:uppercase;
        color:var(--muted)}
.cap{font:400 var(--fs-caption)/1.35 var(--ff-ui);color:var(--muted)}
.ui{font:500 var(--fs-ui)/1.1 var(--ff-ui);letter-spacing:.02em}
.wordmark{font-family:var(--ff-mark);font-weight:700;letter-spacing:-.02em}
```

`text-wrap: balance` on the display title (Chrome/Edge 130+, Safari 17.5+, Firefox 121+; degrades to
normal wrapping elsewhere) and `text-wrap: pretty` on prose. Balance is capped at six lines in
Chromium, which is fine — no title here exceeds three.

Optional polish where supported (Chrome/Edge 133+, Safari 18.2+): `.t-display{ text-box: trim-both
cap alphabetic }` removes the half-leading above the caps and below the baseline so the title
optically aligns with the kicker above it. Guard it — without the guard, older engines ignore it
harmlessly, so no `@supports` is strictly required, but do not build the vertical rhythm assuming it.

### 2.3 Using `opsz` correctly

Set `font-variation-settings:'opsz' N` **only**, and keep `font-weight` as a normal high-level
property. Per the CSS Fonts spec, `font-variation-settings` overrides only the axes it names;
`wght` therefore still comes from `font-weight`, which means weight remains animatable and
inheritable while `opsz` stays pinned to the value you chose. If you list `'wght'` inside
`font-variation-settings` you will break `font-weight` on every descendant.

Do not rely on `font-optical-sizing:auto` for the display sizes. Browsers map it to the used font
size, which at a `clamp()`ed 55px on a 4:3 projector would select `opsz≈55` — a text cut, not a
display cut. Pin the values explicitly:

| Use | `opsz` | Why |
|---|---|---|
| display title, feature statement | `96` | high contrast, tight sidebearings, sharp terminals — the "poster" cut |
| stat values | `72` | slightly sturdier so the numerals survive projection |
| title-sub, pull quotes | `42` | transitional; readable but still has personality |
| any Fraunces below 20px (avoid) | `14` | thick strokes, open spacing, wide characters |

Fraunces at `opsz 9` is a genuinely different typeface from `opsz 144`: as `opsz` falls, x-height
rises, stroke contrast collapses, and characters widen. That is why one Fraunces size ramp with a
single `opsz` looks wrong across a 34→92px range and this table exists.

### 2.4 SOFT / WONK — the honest note

They are **not in the shipped subset** (`fvar` = `opsz`, `wght` only). If the group wants them —
and they are the single cheapest way to make this deck look like food rather than a bank — re-cut
the font from the upstream 4-axis Fraunces:

```bash
pip install fonttools brotli
fonttools varLib.instancer "Fraunces[SOFT,WONK,opsz,wght].ttf" \
  wght=100:900 opsz=9:144 SOFT=0:100 WONK=0:1 \
  -o fraunces-4axis.ttf
pyftsubset fraunces-4axis.ttf --flavor=woff2 --output-file=assets/fonts/fraunces-latin.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+2013,U+2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+00B7,U+2192,U+2713" \
  --layout-features="kern,liga,calt,tnum,lnum,frac"
```

Then, and only then, apply:

```css
.t-display{ font-variation-settings:'opsz' 96,'SOFT' 42,'WONK' 1 }  /* warm, wonky, display */
.t-sub    { font-variation-settings:'opsz' 42,'SOFT' 28,'WONK' 0 }  /* wonk off — it distracts in prose */
.cover .wordmark-serif{ font-variation-settings:'opsz' 144,'SOFT' 70,'WONK' 1 }
```

Rules: **`WONK 1` only at ≥48px**, never in running text — the leaning `n/m/h` and bulbous
`b/d/h/k/l` flags are display features that turn into noise at reading size. **`SOFT` 30–50 for
the deck's warm register**; 0 for the compliance tables in Sourov's block, where a crisper cut
signals "law, not lifestyle". Ship a `--soft` custom property and animate it *never* — variable
font axis animation forces a glyph re-raster every frame and will drop the WebGL loop.

---

## 3. Legibility layer

The hardest problem, solved in five stacked, independently-degradable tiers. Each tier is cheap on
its own; together they hold ~11:1 contrast against the worst pixel the 3D scene can produce.

**Rejected approaches and why**, so nobody re-adds them:

- *Full-screen `backdrop-filter: blur()` behind the text.* `backdrop-filter` forces the compositor
  to read back and re-filter the region behind the element. Behind a *continuously rendering*
  WebGL canvas that readback happens every single frame. A full-viewport blur over an animating
  canvas will tank frame rate on the classroom laptop, which is exactly the machine that matters.
  It is used here on **chrome only**, where the filtered area is under 6% of the viewport.
- *A dark scrim.* The palette is light and warm. A black overlay turns a paper world grey and
  kills the one thing that makes this deck look expensive.
- *Heavy `text-shadow` on the display face.* Blurred shadows on a high-contrast serif at 90px
  produce a grey mush around the thin strokes on a low-contrast projector; the letterform loses
  its edge exactly where Fraunces is doing its work. Used only as a fallback (§3.4).

### 3.1 Tier 1 — the paper plate (does 80% of the work)

A near-opaque warm-paper surface under every text column. This is the guarantee. Everything else
is refinement.

```css
.plate{
  position:relative; isolation:isolate;
  padding: var(--pad-plate) calc(var(--pad-plate) * 1.15)
           calc(var(--pad-plate) * 1.1);
  border-radius: var(--r-plate);
  color: var(--ink);
  background:
    linear-gradient(168deg,
      color-mix(in srgb, var(--paper-hi) calc(var(--plate-a)      * 100%), transparent) 0%,
      color-mix(in srgb, var(--paper)    calc(var(--plate-a)      * 100%), transparent) 46%,
      color-mix(in srgb, var(--paper)    calc(var(--plate-a-edge) * 100%), transparent) 100%);
  box-shadow: var(--shadow-plate);
  /* a 1px hairline that reads on a projector without looking like a border */
  outline: var(--hair) solid color-mix(in oklab, var(--ink) 9%, transparent);
  outline-offset: calc(var(--hair) * -1);
  transform: translateZ(0);            /* own layer; the plate never repaints during the fly */
}

/* The plate's top edge catches "light" — a 1px paper highlight. Free depth. */
.plate::before{
  content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background: linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,0) 34%);
  mix-blend-mode:soft-light;
}
```

`color-mix(...)` rather than `rgba()` literals so one custom property (`--plate-a`) drives both
stops, and projector mode changes the whole deck's opacity with a single attribute flip.

**Which layouts get a plate:** `split`, `splitR`, `wide` — always. `feature` and `cover` —
**no plate**, they use Tiers 2–4 so the type floats in the world (this is the whole point of a
feature slide). `closing` — plate at `--plate-a: .95`.

### 3.2 Tier 2 — the directional paper wash

A static, compositor-only vignette *in paper*, not in black. It quiets the frame edges where the
3D detail is busiest and leaves the centre of the world visible. Because it never changes during
a fly, it costs one composited layer and zero repaints.

```css
.wash{
  position:fixed; inset:0; z-index:var(--z-wash); pointer-events:none;
  --wx:50%; --wy:52%;                         /* set per layout, below */
  background:
    /* a) frame vignette, paper */
    radial-gradient(122% 92% at var(--wx) var(--wy),
      transparent 0%,
      color-mix(in srgb, var(--paper) calc(var(--wash-a)      * 100%), transparent) 58%,
      color-mix(in srgb, var(--paper) calc(var(--wash-a-edge) * 100%), transparent) 100%),
    /* b) side band under the text column */
    linear-gradient(var(--wash-angle, 90deg),
      color-mix(in srgb, var(--paper) 82%, transparent) 0%,
      color-mix(in srgb, var(--paper) 46%, transparent) 34%,
      transparent 62%);
  transition: opacity 420ms var(--e-out), background-position 600ms var(--e-out);
  will-change: opacity;
}
.stage:has(.slide[data-layout="split"])   ~ .wash,
.stage:has(.slide[data-layout="wide"])    ~ .wash{ --wash-angle:90deg;  --wx:64%; --wy:50% }
.stage:has(.slide[data-layout="splitR"])  ~ .wash{ --wash-angle:270deg; --wx:36%; --wy:50% }
.stage:has(.slide[data-layout="feature"]) ~ .wash{ --wash-angle:90deg;  --wx:50%; --wy:50%;
                                                   --wash-a:.62 }
.stage:has(.slide[data-layout="cover"])   ~ .wash{ --wash-angle:90deg;  --wx:72%; --wy:58% }
```

If `:has()` support is a worry, set the same custom properties from JS on `.wash` in the
navigation handler — one `style.setProperty` per transition. Do not animate the gradient stops
themselves; animate `opacity` and swap the whole background at the transition midpoint when the
old slide is already invisible.

### 3.3 Tier 3 — the bloom, for plate-less text (`feature`, `cover`)

A soft paper glow shaped to the text block, painted as a pseudo-element behind it. It is a
gradient, not a blur, so it is free.

```css
.plateless{ position:relative; isolation:isolate }
.plateless::before{
  content:''; position:absolute; z-index:-1;
  inset: -14% -10% -18% -8%;
  background: radial-gradient(72% 62% at 26% 46%,
      color-mix(in srgb, var(--paper) 92%, transparent) 0%,
      color-mix(in srgb, var(--paper) 74%, transparent) 42%,
      color-mix(in srgb, var(--paper) 30%, transparent) 72%,
      transparent 100%);
  filter: blur(18px);                 /* static: rasterised once, then composited */
  pointer-events:none;
}
```

`filter: blur()` on a **static** element is rasterised once and cached; that is categorically
different from `backdrop-filter`, which re-reads the canvas each frame. Safe.

### 3.4 Tier 4 — the glyph halo (the last 8%)

Thickens the paper immediately around each glyph so a single stray highlight in the 3D cannot
break a stem. `paint-order` gives a crisp stroke; the shadow stack is the fallback.

```css
.plateless .t-display,
.plateless .t-feature,
.viz-label-on-world{
  /* fallback: a tight opaque ring plus one wide soft bloom, no mid-radius mush */
  text-shadow:
     0 0  1px color-mix(in srgb, var(--paper) 92%, transparent),
     0 1px 0  color-mix(in srgb, var(--paper) 92%, transparent),
     0 0 22px color-mix(in srgb, var(--paper) 70%, transparent);
}
@supports (paint-order: stroke){
  .plateless .t-display,
  .plateless .t-feature,
  .viz-label-on-world{
    paint-order: stroke fill;
    -webkit-text-stroke: 3.5px color-mix(in srgb, var(--paper) 62%, transparent);
    text-shadow: 0 0 26px color-mix(in srgb, var(--paper) 60%, transparent);
  }
}
html[data-contrast="high"] .plateless .t-display{
  -webkit-text-stroke-width: 5px;
  -webkit-text-stroke-color: color-mix(in srgb, var(--paper) 88%, transparent);
}
```

`paint-order: stroke fill` draws the stroke *under* the fill, so the glyph keeps its exact
designed weight and gains a hard paper outline — the letterform stays sharp, unlike a blur. Note
that `-webkit-text-stroke` grows outward from the path centre, so a 3.5px stroke adds ~1.75px of
paper on each side; do not exceed 5px or counters (the hole in an `e`) start to close at small
sizes. It is applied only to display sizes here, so that is not a risk.

### 3.5 Tier 5 — the grain, which makes the seam disappear

One tiling SVG turbulence over *both* the canvas and the DOM. Its real job is not texture; it is
to put a single shared surface noise across the WebGL output and the HTML so the eye stops
reading them as two layers. This is the cheapest "expensive-looking" trick in the deck.

```css
.grain{
  position:fixed; inset:0; z-index:var(--z-grain); pointer-events:none;
  opacity:var(--grain-a); mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:160px 160px;
  contain: strict;
}
@media (prefers-reduced-motion:no-preference){
  /* 8-frame film-grain shuffle, 0.7s. Barely perceptible; kills the "static texture" tell. */
  .grain{ animation: grainShift 700ms steps(8) infinite }
  @keyframes grainShift{
    0%{background-position:0 0} 12.5%{background-position:-13px 7px}
    25%{background-position:9px -11px} 37.5%{background-position:-7px -14px}
    50%{background-position:14px 5px} 62.5%{background-position:-11px 12px}
    75%{background-position:5px -6px} 87.5%{background-position:-15px -3px}
  }
}
html[data-contrast="high"] .grain{ display:none }
```

### 3.6 Chrome-only glass

The one place `backdrop-filter` is allowed. Total filtered area across all chrome ≈ 4.5% of a
1920×1080 viewport.

```css
.glass{
  background: color-mix(in srgb, var(--paper) 78%, transparent);
  border: var(--hair) solid var(--line);
  box-shadow: var(--shadow-card);
}
@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))){
  .glass{
    background: color-mix(in srgb, var(--paper) 58%, transparent);
    -webkit-backdrop-filter: blur(14px) saturate(1.15);
    backdrop-filter: blur(14px) saturate(1.15);
  }
}
/* Kill it entirely if the machine is struggling — see §7.8 perf governor */
html[data-perf="low"] .glass{ backdrop-filter:none; -webkit-backdrop-filter:none;
                              background: color-mix(in srgb, var(--paper) 90%, transparent) }
```

### 3.7 Test protocol (do this, it takes four minutes)

1. Screenshot slides 1, 12, 19, 27 (one per layout family).
2. In any image editor, apply *Brightness +25, Contrast −40, Saturation −30*. That is a reasonable
   model of a tired classroom projector with the lights on.
3. Every piece of body copy must still be readable at 25% zoom (≈ the back of a room).
4. If any fails, the fix is `--plate-a` and `--muted → --muted-strong`, in that order. Never the
   font size.

---

## 4. Enter / exit choreography

### 4.1 The state model — why this cannot corrupt

Three rules make the whole thing safe.

**R1. One transition object at a time, and it is always snap-completed, never killed mid-flight.**
Killing a tween leaves the DOM at an arbitrary interpolated value. Completing it leaves the DOM
at a *known* value. So an interruption calls `.progress(1)` first.

**R2. All animated state is created inside `gsap.context()` scoped to the slide element, and
teardown calls `ctx.revert()`.** `revert()` restores every property GSAP touched to its
pre-animation value and removes injected inline styles — including the wrapper elements the line
splitter added, if you register them with `ctx.add()`. This is the actual guarantee against
residue, not `clearProps` sprinkled by hand.

**R3. Direction is a parameter, never a stored mode.** `buildIn(el, dir)` and `buildOut(el, dir)`
take `dir ∈ {1,-1}`. Going back is *not* `timeline.reverse()` of the forward transition — it is a
mirrored forward transition. Reversing an `.out` ease gives you an `.in` ease, which reads as
sluggish; and reversing an entrance is not the same gesture as an exit. Mirroring keeps every
ease `.out` in both directions.

```js
const S = {
  idx: -1,            // committed slide index
  target: -1,         // where the presenter wants to be
  tl: null,           // the live transition timeline (or null)
  ctxIn: null, ctxOut: null,
  lastNavAt: 0,
  busy: false,
};
```

### 4.2 Eases and the duration table

GSAP core only. CSS-side equivalents given for the chrome, which is animated in CSS.

| Role | GSAP | CSS equivalent |
|---|---|---|
| primary entrance | `'power3.out'` | `cubic-bezier(.23,1,.32,1)` |
| text mask wipe | `'expo.out'` | `cubic-bezier(.19,1,.22,1)` |
| exit | `'power2.in'` | `cubic-bezier(.55,.06,.68,.19)` |
| plate / panels | `'power2.out'` | `cubic-bezier(.25,.46,.45,.94)` |
| pop accents | `'back.out(1.6)'` | — |
| camera (owned by world.js) | `'power2.inOut'` | — |

| Beat | t (s) | duration | ease | target |
|---|---|---|---|---|
| OUT lines | 0.00 | 0.22 | `power2.in` | `y:-0.32em, autoAlpha:0, filter:blur(2px)`, stagger 0.018 |
| OUT viz | 0.02 | 0.24 | `power2.in` | `autoAlpha:0, scale:0.985, y:-8*dir` |
| OUT plate | 0.06 | 0.20 | `power2.in` | `autoAlpha:0` |
| — dead air — | 0.26–0.30 | | | the camera is alone on stage for 40 ms. Keep it. |
| IN plate | 0.30 | 0.34 | `power3.out` | `autoAlpha:0→1, y:16, scale:.994` |
| IN kicker | 0.36 | 0.26 | `power3.out` | `y:10, autoAlpha:0→1` |
| IN title lines | 0.40 | **0.72** | `expo.out` | mask wipe, stagger **0.07** |
| IN sub | 0.56 | 0.50 | `power3.out` | mask wipe, stagger 0.05 |
| IN lede | 0.62 | 0.48 | `power3.out` | mask wipe, stagger 0.045 |
| IN bullets | 0.70 | 0.42 | `power3.out` | `y:14, autoAlpha:0→1`, stagger **0.055** |
| IN viz frame | 0.54 | 0.62 | `power3.out` | `autoAlpha:0→1, scale:.96, y:20*dir` |
| IN viz internals | 0.78 | (own tl) | — | `tl.add(vizTl, 0.78)` |
| **total** | | **≈1.15 s** | | camera still flying (1.05–2.5 s) |

Stagger values sit in Emil Kowalski's 30–80 ms band for group entrances. The one deliberate
violation of the "UI under 300 ms" rule is the 720 ms title wipe — this is presentation display
type, not UI, and it is the beat the audience is actually watching.

### 4.3 The line splitter (SplitText is not in the bundle)

~30 lines, uses `Range.getClientRects()` to find real line boxes, and is registered with the
slide's `gsap.context` so `revert()` removes it.

```js
function splitLines(el){
  if (el.__split) return el.__lines;
  const text = el.textContent;
  const words = text.split(/(\s+)/);                      // keep the whitespace tokens
  el.textContent = '';
  const probes = words.map(w=>{
    if (/^\s+$/.test(w)) { el.appendChild(document.createTextNode(w)); return null; }
    const s = document.createElement('span'); s.textContent = w; el.appendChild(s); return s;
  });
  // group by the top of each word's client rect (round to 1px to absorb subpixel drift)
  const rows = new Map();
  probes.forEach(s=>{ if(!s) return;
    const t = Math.round(s.getBoundingClientRect().top);
    (rows.get(t) || rows.set(t,[]).get(t)).push(s);
  });
  const lines=[];
  el.textContent='';
  for (const [,ws] of [...rows.entries()].sort((a,b)=>a[0]-b[0])){
    const outer = document.createElement('span'); outer.className='ln';
    const inner = document.createElement('span'); inner.className='ln__i';
    inner.textContent = ws.map(s=>s.textContent).join(' ');
    outer.appendChild(inner); el.appendChild(outer); lines.push(inner);
  }
  el.__split = true; el.__lines = lines; el.__orig = text;
  return lines;
}
function unsplitLines(el){ if(el.__split){ el.textContent = el.__orig;
                                           el.__split=false; el.__lines=null; } }
```

```css
.ln   { display:block; overflow:hidden; padding-bottom:.08em; margin-bottom:-.08em; }
.ln__i{ display:block; will-change:transform; }
```

The `padding-bottom / negative margin-bottom` pair is essential: `overflow:hidden` on a line box
clips descenders (`g`, `y`, `p`) in most serif faces, and Fraunces at `opsz 96` has deep ones.
The pair adds clipping room without changing layout.

Re-split on resize, debounced, **for the active slide only**, and only when the element's width
actually changed:

```js
const ro = new ResizeObserver(gsap.utils.throttle(()=>{ if(!S.busy) resplitActive(); }, 140));
```

### 4.4 The transition builder — literal GSAP

```js
const D = { out:.22, gap:.04, plate:.34, title:.72, line:.48, bullets:.42, viz:.62 };
const E = { in:'power3.out', wipe:'expo.out', out:'power2.in', soft:'power2.out' };

function buildOut(el, dir){
  const tl = gsap.timeline({ defaults:{ ease:E.out, overwrite:'auto' } });
  const lines = el.querySelectorAll('.ln__i');
  const rest  = el.querySelectorAll('.kicker, .bullet');
  tl.to([...lines, ...rest], {
      yPercent: -22 * dir, autoAlpha: 0, filter:'blur(2px)',
      duration: D.out, stagger:{ each:.018, from: dir>0 ? 'start' : 'end' }
    }, 0)
    .to(el.querySelector('.viz'), {
      autoAlpha:0, scale:.985, y:-8*dir, duration:.24 }, .02)
    .to(el.querySelector('.plate'), { autoAlpha:0, duration:.20 }, .06);
  return tl;
}

function buildIn(el, dir){
  const q     = gsap.utils.selector(el);
  const title = q('.t-display')[0], sub = q('.t-sub')[0], lede = q('.lede')[0];
  const tLines = title ? splitLines(title) : [];
  const sLines = sub   ? splitLines(sub)   : [];
  const lLines = lede  ? splitLines(lede)  : [];

  const tl = gsap.timeline({ defaults:{ ease:E.in, overwrite:'auto' } });

  gsap.set(el, { autoAlpha:1 });
  gsap.set([...tLines,...sLines,...lLines], { yPercent:108, autoAlpha:1 });
  gsap.set(q('.kicker'),  { y:10, autoAlpha:0 });
  gsap.set(q('.bullet'),  { y:14, autoAlpha:0 });
  gsap.set(q('.plate'),   { y:16, scale:.994, autoAlpha:0, transformOrigin:'50% 30%' });
  gsap.set(q('.viz'),     { y:20*dir, scale:.96, autoAlpha:0 });

  tl.to(q('.plate'),  { y:0, scale:1, autoAlpha:1, duration:D.plate, ease:E.soft }, 0)
    .to(q('.kicker'), { y:0, autoAlpha:1, duration:.26 }, .06)
    .to(tLines, { yPercent:0, duration:D.title, ease:E.wipe,
                  stagger:{ each:.07, from: dir>0 ? 'start':'end' } }, .10)
    .to(sLines, { yPercent:0, duration:D.line, stagger:.05 }, .26)
    .to(lLines, { yPercent:0, duration:D.line, stagger:.045 }, .32)
    .to(q('.bullet'), { y:0, autoAlpha:1, duration:D.bullets, stagger:.055 }, .40)
    .to(q('.viz'), { y:0, scale:1, autoAlpha:1, duration:D.viz }, .24);

  const vizTl = buildViz(el.querySelector('.viz'));       // §5
  if (vizTl) tl.add(vizTl, .48);
  return tl;
}
```

An alternative to `yPercent` on a masked line, for the display title only, is a true clip wipe:

```js
gsap.fromTo(tLines,
  { clipPath:'inset(0 0 110% 0)',  yPercent: 22 },
  { clipPath:'inset(-12% 0 -12% 0)', yPercent: 0,
    duration:.72, ease:'expo.out', stagger:.07 });
```

Use the mask (`overflow:hidden` + `yPercent`) as the default — it composites on the GPU with a
plain transform. Use the `clip-path` version on the cover and feature slides only, where the type
is plate-less and a hard horizontal edge reads as intentional. Note the `-12%` end state: ending
at exactly `inset(0…)` clips the glyph antialiasing on some GPUs and the top of the caps shimmers.

### 4.5 `go()` — navigation, interruption, and the fast presenter

```js
function go(next, opts={}){
  next = gsap.utils.clamp(0, SLIDES.length-1, next);
  if (next === S.idx && !opts.force) return;

  const now = performance.now();
  const rapid = now - S.lastNavAt < 260;         // presenter is machine-gunning the clicker
  const jump  = Math.abs(next - S.idx) > 2;      // overview click / deep link
  S.lastNavAt = now;
  S.target = next;

  /* R1 — snap-complete anything in flight. Never .kill() mid-value. */
  if (S.tl){ S.tl.progress(1, false); S.tl.kill(); S.tl = null; }
  if (S.ctxOut){ S.ctxOut.revert(); S.ctxOut = null; }

  const dir  = next > S.idx ? 1 : -1;
  const prev = S.el;
  const el   = mountSlide(next);                 // builds DOM, appends to #stage
  if (prev) prev.setAttribute('inert','');

  World.goTo(SLIDES[next], jump || REDUCED);

  S.ctxIn = gsap.context(()=>{
    const master = gsap.timeline({
      onComplete(){
        if (prev){ prev.remove(); }
        S.ctxOut = null; S.busy = false; S.tl = null;
        el.removeAttribute('inert');
        announce(next);
      }
    });
    if (prev) master.add(buildOut(prev, dir), 0);
    master.add(buildIn(el, dir), prev ? (D.out + D.gap) : 0);

    /* --- the fast-presenter governor ------------------------------------ */
    if (rapid) master.timeScale(2.4);            // same choreography, 2.4× faster
    if (jump)  master.timeScale(3.2);
    if (rapid || jump){                          // and skip the diagram's own storytelling
      const v = el.__vizTl; if (v){ v.progress(1); }
    }
    S.tl = master; S.busy = true;
  }, el);

  S.idx = next; S.el = el;
  syncChrome(next);
}
```

Behaviour that falls out of this, which is what you actually want live:

- Three fast clicks = three complete transitions at 2.4× (≈480 ms each), each one *finished*.
  No half-faded ghost, no stuck `opacity:.37` on a bullet.
- Five clicks in two seconds = the fourth and fifth are `jump`s (Δ>2 is not hit, but `rapid` is),
  so they run at 2.4× and the diagrams snap to their end state. The world gets `instant` only on
  real jumps so the flight is not turned into a teleport by an impatient thumb.
- Holding the right arrow (key repeat, ~30 ms) — add `if (e.repeat) return;` in the key handler.
  Deliberate: nobody wants 20 slides of scrubbing from a stuck key.

### 4.6 Bidirectional scrub

Two consumers need scrub: the touch drag (§7.4) and the overview scrub-bar. Both drive the *same*
master timeline through `.progress()`, which is why the timeline must be built paused for them:

```js
function beginScrub(dir){
  if (S.tl){ S.tl.progress(1,false); S.tl.kill(); }
  const el = mountSlide(S.idx + dir);
  const tl = gsap.timeline({ paused:true })
    .add(buildOut(S.el, dir), 0)
    .add(buildIn(el, dir), D.out + D.gap);
  return { tl, el, dir, total: tl.duration() };
}
function updateScrub(sc, p){ sc.tl.progress(gsap.utils.clamp(0,1,p)); }
function endScrub(sc, commit){
  gsap.to(sc.tl, { progress: commit ? 1 : 0, duration: commit ? .34 : .28,
    ease: commit ? 'power2.out' : 'power2.inOut',
    onComplete(){ if(commit){ S.idx += sc.dir; S.el.remove(); S.el = sc.el; syncChrome(S.idx); }
                  else { sc.el.remove(); gsap.set(S.el,{clearProps:'all'}); } }});
}
```

Two details that make reverse scrub not feel wrong:

1. On GSAP 3.15+, set `easeReverse:true` on any timeline you genuinely play backwards, so `.out`
   eases stay `.out` in reverse. Here we mostly avoid reverse by mirroring — but the *abort* path
   above (`progress → 0`) is a real reverse, hence `power2.inOut` for it, which is symmetric and
   reads correctly in both directions.
2. Never store "am I entering or exiting" on the DOM. Every property that gets animated is set
   from scratch by `gsap.set()` at the top of `buildIn`. A scrub that stops at 0.63 and then gets
   a fresh `go()` is fully overwritten, not merged.

### 4.7 Reduced motion

```js
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: reduce)', ()=>{
  REDUCED = true; World.setReduced(true);
  Object.assign(D, { out:.10, gap:0, plate:.16, title:.18, line:.16, bullets:.16, viz:.18 });
  Object.assign(E, { in:'none', wipe:'none', out:'none', soft:'none' });
  gsap.defaults({ ease:'none' });
  document.documentElement.dataset.motion = 'reduce';
  return ()=>{ REDUCED=false; World.setReduced(false);
               document.documentElement.dataset.motion=''; };
});
```

```css
html[data-motion="reduce"] .ln__i{ transform:none !important }   /* opacity crossfade only */
html[data-motion="reduce"] .grain{ animation:none }
@media (prefers-reduced-motion: reduce){ *,*::before,*::after{
  animation-duration:.01ms!important; animation-iteration-count:1!important;
  transition-duration:.01ms!important; scroll-behavior:auto!important } }
```

The choreography survives: the *sequence and staggers stay*, only the transforms and the eases go.
Opacity and colour transitions aid comprehension and are explicitly kept.

---

## 5. The 2D visual components

### 5.0 Shared framework

**SVG or DOM — the rule.** DOM whenever the thing is *a list of rows or cards containing real
sentences*: it wraps, it reflows, it is selectable, it is in the accessibility tree for free, and
`text-wrap:pretty` works. SVG only when *geometry carries meaning*: rings, the closed loop, the
funnel taper, the leak, the matrix plot, the ladder's risers. Several components are **hybrid** —
an absolutely-positioned SVG layer drawing the connective tissue *behind* a DOM grid that holds
the words. The hybrid is the default for anything with both.

```html
<figure class="viz" data-kind="funnel" data-density="full">
  <svg class="viz__wire" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">…</svg>
  <div class="viz__body">…DOM rows…</div>
  <figcaption class="cap">…</figcaption>
</figure>
```

```css
.viz{ container-type:inline-size; container-name:viz;
      position:relative; margin:0; display:grid; gap:calc(.8*var(--gap)) }
.viz__wire{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0 }
.viz__body{ position:relative; z-index:1 }
@container viz (max-width: 620px){ .viz{ --viz-density:compact } }
@container viz (max-width: 420px){ .viz{ --viz-density:tight } }
```

Container queries, not media queries. The same `funnel` appears in a `split` right column at 520px
and in a `wide` full-bleed row at 1400px; it must respond to *its slot*, not to the window.

**The status system** — one class set, used by `funnel`, `scorecard`, `verify`, `grounds`,
`ladder`, `worktest`, `swot`, `matrix`, `recs`.

```css
[data-st]{ --st-ink:var(--muted); --st-fill:var(--paper-sunk); --st-mark:'○' }
[data-st="match"] { --st-ink:var(--basil-ink); --st-fill:color-mix(in srgb,var(--basil) 16%,var(--paper)); --st-mark:'●' }
[data-st="best"]  { --st-ink:var(--basil-ink); --st-fill:color-mix(in srgb,var(--basil) 30%,var(--paper)); --st-mark:'★' }
[data-st="partial"]{--st-ink:var(--amber-ink); --st-fill:color-mix(in srgb,var(--amber) 30%,var(--paper)); --st-mark:'◐' }
[data-st="unknown"]{--st-ink:var(--muted);     --st-fill:transparent; --st-mark:'○';
                    --st-border:1px dashed var(--line-strong) }
[data-st="weak"]  { --st-ink:var(--red-deep);  --st-fill:color-mix(in srgb,var(--red) 14%,var(--paper)); --st-mark:'✕' }
[data-st="urgent"]{ --st-ink:var(--red-deep);  --st-fill:color-mix(in srgb,var(--red) 26%,var(--paper)); --st-mark:'▲' }
.st-dot::before{ content:var(--st-mark); color:var(--st-ink); font-size:.9em; line-height:1 }
```

Never colour alone (§0.1). Every status renders a glyph. `unknown` is the only one drawn with a
**dashed** border — that dash is doing real rhetorical work in this deck, because "we were not
told" is one of its central findings and it must look visibly different from "we were told no".

**Presenter accent.** Each slide sets `--accent: oklch(from … )` from `PRESENTERS[i].hue`:

```js
el.style.setProperty('--accent', `oklch(58% .17 ${p.hue})`);
el.style.setProperty('--accent-soft', `oklch(92% .045 ${p.hue})`);
```
Used only for the rail, the kicker rule, and diagram *chrome* (tick marks, axis labels) — never
for a status, so the semantic palette never collides with the identity palette.

**`buildViz(figure)`** returns a paused-free `gsap.timeline()` or `null`, is stored on
`el.__vizTl`, and every component's timeline is written so `progress(1)` yields the final resting
state exactly (no `repeat:-1` inside the entrance timeline; ambient loops are started in
`onComplete` and killed by `ctx.revert()`).

**The two ambient loops in the whole deck** (deliberate scarcity — more would be noise):
`units` breathing origin tile, and `leak` droplets. Both cost one tween each.

---

### 5.1 `objectives` — 8 numbered aims
*Data:* `OBJECTIVES` (8 strings). *Slide:* `objectives`, layout `wide`.

**DOM.** `<ol class="obj">` → 8 `<li>`, each a card: a Fraunces numeral in a 2.2em circle-well
plus one line of Inter. Grid `repeat(4, 1fr)` × 2 rows at full density, `repeat(2,1fr)` at
compact, single column at tight. The numeral uses `counter(objective, decimal-leading-zero)` so
they read `01…08` — the leading zero is what makes eight small items look like a *set*.

```css
.obj{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:var(--gap);
      counter-reset:objective; list-style:none; padding:0 }
.obj li{ counter-increment:objective; padding:14px 14px 16px; border-radius:var(--r-md);
         background:color-mix(in srgb,var(--paper-hi) 70%,transparent);
         border-top:2px solid var(--accent); box-shadow:var(--shadow-card) }
.obj li::before{ content:counter(objective,decimal-leading-zero);
         font:700 var(--fs-stat)/1 var(--ff-display); font-variation-settings:'opsz' 72;
         font-size:calc(var(--fs-bhead)*1.9); color:var(--accent); display:block; margin-bottom:6px;
         opacity:.9 }
```

**Reveal.** `from:'start'` stagger across the reading order, with a subtle rise:
```js
tl.from('.obj li',{y:18,autoAlpha:0,duration:.42,ease:'power3.out',stagger:{each:.045,from:'start'}})
  .from('.obj li::before',{},0);  // (numerals ride the card; no separate tween — keep it cheap)
```
*Colour:* accent top-rule only. No status here — these are questions, not verdicts.

### 5.2 `timeline` — 6 growth milestones 2018→2026
*Data:* `TIMELINE` (6 rows, `n` = outlet count 1,1,7,10,16,22). *Slide:* `company`, layout `wide`.

**Hybrid.** SVG for the spine and the *area under the growth curve*; DOM for the six labels.
The spine is a horizontal line at 62% height; above it, an `<path>` whose y is scaled from `n`
(1→22, so the curve visibly hockey-sticks). Six DOM nodes are positioned with
`left: calc(var(--i) / 5 * 100%)`.

```html
<svg class="viz__wire" viewBox="0 0 1000 300" preserveAspectRatio="none">
  <path class="tl-area" d="M0,300 L0,290 C…" fill="url(#tlFill)"/>
  <path class="tl-line" d="M0,290 C…" fill="none" stroke="var(--red)" stroke-width="2.5"
        vector-effect="non-scaling-stroke" pathLength="1"/>
  <line class="tl-spine" x1="0" y1="240" x2="1000" y2="240" stroke="var(--line-strong)"/>
</svg>
```

**Reveal.** The line *draws*, the nodes land behind it:
```js
tl.fromTo('.tl-line',{strokeDasharray:1,strokeDashoffset:1},
                     {strokeDashoffset:0,duration:1.1,ease:'power2.inOut'},0)
  .from('.tl-area',{scaleY:0,transformOrigin:'50% 100%',duration:1.1,ease:'power2.inOut'},0)
  .from('.tl-node',{scale:.4,autoAlpha:0,duration:.34,ease:'back.out(2)',stagger:.09},.18)
  .from('.tl-label',{y:10,autoAlpha:0,duration:.32,stagger:.09},.26);
```
`pathLength="1"` normalises the dash maths so you never measure `getTotalLength()` — works even
before layout. `vector-effect:non-scaling-stroke` keeps the 2.5px stroke honest under the
`preserveAspectRatio="none"` stretch.
*Colour:* line `--red`, area a 14%→0 red gradient, spine hairline, node dots `--ink` except the
2026 node which is `--red` filled and 1.25× larger.

### 5.3 `verify` — 4-row triangulation table
*Data:* `VERIFY_ROWS` (4, all `good:true`). *Slide:* `verify`, layout `wide`.

**DOM `<table>`.** A real table — this is tabular data and a screen reader should say so.
Columns: *What we were told* / *What we checked it against* / *Result*. Zebra by a 3% paper tint,
never by lines. The result cell is a pill at `data-st="match"`.

```css
.vtable{ width:100%; border-collapse:separate; border-spacing:0 6px; font-size:var(--fs-bbody) }
.vtable th{ font:600 var(--fs-statlab)/1.2 var(--ff-ui); letter-spacing:.08em;
            text-transform:uppercase; color:var(--muted); text-align:left; padding:0 12px 6px }
.vtable td{ background:color-mix(in srgb,var(--paper-hi) 62%,transparent); padding:12px;
            border-block:var(--hair) solid var(--line) }
.vtable td:first-child{ border-left:var(--hair) solid var(--line);
                        border-radius:var(--r-sm) 0 0 var(--r-sm); font-weight:600 }
.vtable td:last-child { border-right:var(--hair) solid var(--line);
                        border-radius:0 var(--r-sm) var(--r-sm) 0; color:var(--st-ink);
                        background:var(--st-fill); white-space:nowrap }
@container viz (max-width:620px){ .vtable,.vtable tbody,.vtable tr,.vtable td{ display:block }
  .vtable thead{ display:none }
  .vtable td::before{ content:attr(data-label); display:block; font:600 var(--fs-statlab)/1.2
    var(--ff-ui); letter-spacing:.08em; text-transform:uppercase; color:var(--muted) } }
```
**Reveal.** Row by row, left edge first — the checkmark lands *last* in each row, which is the
dramatic beat: claim, source, verdict.
```js
tl.from('.vtable tr',{x:-14,autoAlpha:0,duration:.38,ease:'power3.out',stagger:.08})
  .from('.vtable .st-dot',{scale:0,duration:.3,ease:'back.out(2.4)',stagger:.08},'-=.42');
```

### 5.4 `units` — 22 identical unit tiles
*Data:* `OUTLET_CITIES` (sums to 22). *Slide:* `staffing`, layout `split`.

**DOM.** 22 `<button class="unit">` in `grid-template-columns:repeat(auto-fit,minmax(46px,1fr))`
capped at 6 columns. Each tile is a squircle with a tiny fixed 4-dot "crew" glyph inside — the
point of the slide is that *every* outlet is staffed identically regardless of demand, so the
tiles must be visibly, monotonously identical.

```css
.units{ display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:8px }
.unit{ aspect-ratio:1; border-radius:26%; background:var(--paper-hi);
       border:var(--hair) solid var(--line-strong); display:grid; place-content:center;
       box-shadow:var(--shadow-card); transition:transform var(--t-tap) var(--e-out) }
.unit:hover{ transform:translateY(-2px) }
.unit[data-origin]{ background:color-mix(in srgb,var(--red) 18%,var(--paper));
                    border-color:var(--red) }
@container viz (max-width:420px){ .units{ grid-template-columns:repeat(4,minmax(0,1fr)) } }
```
**Reveal.**
```js
tl.from('.unit',{scale:.5,autoAlpha:0,duration:.42,ease:'back.out(1.7)',
                 stagger:{each:.022,from:'random'}})
  .add(()=>gsap.to('.unit[data-origin]',{scale:1.035,duration:1.5,ease:'sine.inOut',
                   repeat:-1,yoyo:true}));   // the Mirpur shop keeps breathing (§8.4)
```
Hover on a tile shows its city and note in a small popover — 10 of the 22 have a note in the data.
*Colour:* all identical `--paper-hi`; exactly one tile (Mirpur, index 0) is red. One red square in
a field of 22 says "this is where it started" without a word of copy.

### 5.5 `tradeoff` — 6 rows of gain vs give-up
*Data:* `TRADEOFF_ROWS`. *Slide:* `tradeoff`, layout `wide`.

**DOM.** A three-column grid: `[area] [gain] [give]` with a 1px vertical divider drawn as a
`border-left` on the third column. Gain cells sit on a 10% basil tint, give-up cells on a 10% red
tint, both at very low saturation so six rows do not become a candy stripe.

```css
.trade{ display:grid; grid-template-columns:minmax(90px,.8fr) 1.35fr 1.35fr; gap:2px 0 }
.trade__k{ font:600 var(--fs-statlab)/1.2 var(--ff-ui); text-transform:uppercase;
           letter-spacing:.08em; color:var(--muted); padding:12px 12px 12px 0; align-self:center }
.trade__g{ background:color-mix(in srgb,var(--basil) 9%,var(--paper-hi)); padding:12px 14px }
.trade__v{ background:color-mix(in srgb,var(--red) 8%,var(--paper-hi)); padding:12px 14px;
           border-left:var(--hair) solid var(--line) }
.trade__g:first-of-type{border-radius:var(--r-sm) 0 0 0} /* corners only on the outer four cells */
```
**Reveal.** The two halves arrive from opposite sides — the gesture *is* the concept.
```js
tl.from('.trade__k',{x:-10,autoAlpha:0,duration:.34,stagger:.06},0)
  .from('.trade__g',{x:-18,autoAlpha:0,duration:.42,ease:'power3.out',stagger:.06},.06)
  .from('.trade__v',{x: 18,autoAlpha:0,duration:.42,ease:'power3.out',stagger:.06},.06);
```

### 5.6 `funnel` — 6-step hiring funnel, step 5 "marking" is the weak point
*Data:* `HIRING_STEPS` (statuses: `unknown, ok, ok, best, weak, ok`). *Slide:* `hiring`, layout `split`.

**Hybrid.** SVG draws six stacked trapezoids that genuinely narrow (width 100% → 52%); DOM
overlays the step name, the "what" line and the note. The narrowing is real geometry, so SVG.

```
step i:  topW = 100 - i*8 (%)   →  bottomW = 100 - (i+1)*8 (%)
```
Step 5 (`weak`) is drawn differently and this is the whole slide: its trapezoid is **unfilled with
a 2px dashed `--red` outline** and it is **inset by 10px on each side** so the funnel visibly
*pinches* there — a physical constriction, not a colour change. A short `--red` chevron points at
it from the right margin with the label "the value leaks here".

```js
tl.from('.fn-seg',{scaleY:0,transformOrigin:'50% 0%',autoAlpha:0,
                   duration:.40,ease:'power3.out',stagger:.10},0)
  .from('.fn-label',{x:-12,autoAlpha:0,duration:.32,stagger:.10},.10)
  /* the weak step arrives late and alone — a 380ms hold before it */
  .from('.fn-seg[data-st="weak"]',{scaleX:1.12,duration:.5,ease:'elastic.out(1,.55)'},'+=.38')
  .from('.fn-flag',{x:14,autoAlpha:0,duration:.34,ease:'power3.out'},'<.1');
```
The `'+=.38'` gap is the single most important number in this component. The presenter's sentence
lands in that silence.
*Colour:* `ok` → `--paper-hi` with `--line-strong` outline. `best` (step 4, the practical test) →
basil 24% fill + `★`. `weak` (step 5) → dashed red, no fill. `unknown` (step 1) → dashed grey.

### 5.7 `worktest` — predictive strength, ordinal and honest
*Data:* none in `data.js`; three fixed items. *Slide:* `worktest`, layout `feature`.

**This must not be a bar chart.** There are no validity coefficients in the group's evidence, and
inventing bar lengths would be fabricating data on a slide about evidence quality. Design it as an
**ordinal ladder with no measured axis**:

```html
<ol class="ordinal" aria-label="Ordered from strongest to weakest evidence of ability">
  <li data-rank="1" data-st="best"><span class="ord-rank">Strongest</span>
      <b>Watching someone do the job</b>
      <span class="ord-why">The practical test. It observes the actual task.</span></li>
  <li data-rank="2" data-st="partial">…<b>A structured interview</b>…</li>
  <li data-rank="3" data-st="unknown">…<b>A certificate</b>…</li>
</ol>
<p class="ord-note">Order, not size. We have no numbers for these, and we are not going to
   draw any.</p>
```

```css
.ordinal{ display:grid; gap:10px; list-style:none; padding:0; counter-reset:ord }
.ordinal li{ display:grid; grid-template-columns:auto 1fr; gap:4px 14px; align-items:baseline;
   padding:16px 18px; border-radius:var(--r-md); background:var(--st-fill);
   border:var(--st-border, var(--hair) solid var(--line-strong)); }
/* the ONLY size cue is the type ramp, which is ordinal by nature */
.ordinal li[data-rank="1"] b{ font-size:calc(var(--fs-bhead)*1.35) }
.ordinal li[data-rank="2"] b{ font-size:calc(var(--fs-bhead)*1.12) }
.ordinal li[data-rank="3"] b{ font-size:var(--fs-bhead); color:var(--muted) }
.ord-rank{ font:600 var(--fs-statlab)/1 var(--ff-ui); letter-spacing:.08em;
           text-transform:uppercase; color:var(--st-ink) }
.ord-note{ font:400 var(--fs-caption)/1.4 var(--ff-ui); color:var(--muted);
           border-left:2px solid var(--line-strong); padding-left:10px; margin-top:14px }
```
**Reveal.** Top-down, and the disclaimer arrives with the last item so the honesty is not an
afterthought:
```js
tl.from('.ordinal li',{y:16,autoAlpha:0,duration:.46,ease:'power3.out',stagger:.12})
  .from('.ord-note',{autoAlpha:0,x:-8,duration:.4},'-=.2');
```
Design integrity note for the jury: the absence of a bar chart here, *stated on the slide*, is
worth more than a chart would be.

### 5.8 `leak` — the leaking funnel
*Data:* derived from the turnover slide. *Slide:* `leak`, layout `split`.

**SVG.** One funnel outline (`stroke:--ink`, 2px, `fill:none`), a fill level inside it, and a
**visible crack** on the lower-left wall: a 14px gap in the stroke, drawn as a second path with
`stroke:--paper` painted over the outline. Three droplets fall from the crack.

```js
const drops = gsap.timeline({repeat:-1, repeatDelay:.35});
drops.fromTo('.leak-drop',
  {y:0, autoAlpha:0, scale:.7},
  {y:56, autoAlpha:1, scale:1, duration:.9, ease:'power1.in', stagger:.28,
   onComplete(){/* noop */}})
 .to('.leak-drop',{autoAlpha:0,duration:.2},'-=.25');
tl.from('.leak-body',{scaleY:0,transformOrigin:'50% 0%',duration:.6,ease:'power3.out'})
  .from('.leak-crack',{scaleX:0,transformOrigin:'0% 50%',duration:.34,ease:'power2.out'},'-=.2')
  .add(()=>drops.play(), '>');
```
Register `drops` with the slide's `gsap.context` so leaving the slide kills it. This is one of only
two ambient loops in the deck (§5.0) and it earns its place: the diagram keeps *doing* the thing
the presenter is describing for the whole 90 seconds they talk over it.
*Colour:* outline `--ink`; contents a 22% basil fill; crack + droplets `--red`.

### 5.9 `rings` — office "very low" vs floor "medium", qualitative
*Data:* `FINDINGS.told[1]` — "Office turnover very low. Floor and kitchen turnover medium. **No
figures given.**" *Slide:* `turnover`, layout `wide`.

**No percentages may appear.** Two concentric SVG rings, and the *quantity* encoding is **arc
speed and dash density**, not arc length — because arc length would read as a number.

- Outer ring = floor & kitchen. `stroke-dasharray: 9 7`, rotates 360° in **10 s**.
- Inner ring = office. `stroke-dasharray: 4 22`, rotates 360° in **34 s**.
- Both carry a word label in the centre of their own arc: `MEDIUM` / `VERY LOW`, in `--fs-statlab`.
- A centred caption: *"No figures were given to us. These are the words we were given."* — set in
  `--fs-caption`, italic-adjacent (Fraunces 400, `opsz 42`).

```js
tl.from('.ring',{drawSVG:0},0)   // no DrawSVG plugin — use the dash trick instead:
```
```js
tl.fromTo('.ring',{strokeDasharray:'0 999'},
   {strokeDasharray:(i)=> i? '4 22':'9 7', duration:.8, ease:'power2.out', stagger:.14},0)
  .from('.ring-label',{autoAlpha:0,y:8,duration:.4,stagger:.14},.4)
  .add(()=>{ gsap.to('.ring--floor',{rotate:360,duration:10,ease:'none',repeat:-1,
                                     transformOrigin:'50% 50%'});
             gsap.to('.ring--office',{rotate:360,duration:34,ease:'none',repeat:-1,
                                     transformOrigin:'50% 50%'}); });
```
*Colour:* floor ring `--red` at 70% opacity; office ring `--basil`. Ring weight differs (5px vs
3px) as a second, non-colour cue. Rotation is disabled entirely under reduced motion; the dash
density still carries the comparison.

### 5.10 `days60` — the 6-stage 60-day timeline
*Data:* `NOTICE_STAGES` (day labels `0, 1–10, 10–30, 30–50, 50–60, 60`). *Slide:* `notice`, `wide`.

**Hybrid.** A horizontal rail with six stops positioned by *real day fractions*, not evenly:
`left: calc(day/60 * 100%)` — so the visual spacing is honest and the "10–30" and "30–50" blocks
are visibly the long ones. DOM cards alternate above/below the rail to avoid collision.

**Reveal.** A progress bar sweeps the rail once (0→100% in 1.0 s, `power1.inOut`), and each stop
pops as the sweep crosses it — the presenter can literally say "day thirty" as it arrives.
```js
tl.fromTo('.d60-fill',{scaleX:0},{scaleX:1,transformOrigin:'0% 50%',duration:1.0,ease:'power1.inOut'},0)
  .from('.d60-stop',{scale:0,autoAlpha:0,duration:.3,ease:'back.out(2.2)',
                     stagger:{each:.16,from:'start'}},.08)
  .from('.d60-card',{y:(i)=>i%2?12:-12,autoAlpha:0,duration:.38,stagger:.16},.16);
```
*Colour:* rail `--line-strong`; fill `--basil`; the day-0 and day-60 stops filled `--ink`; the
"Overlap" stage (50–60) gets a basil 18% band behind it because that overlap is the recommendation.

### 5.11 `welfare` — 4 benefit cards, worker benefit vs company benefit
*Data:* `WELFARE_ITEMS` (icons `roof, bowl, cross, cradle`). *Slide:* `welfare`, layout `wide`.

**DOM cards, inline SVG icons** (24px, `stroke:currentColor`, `stroke-width:1.6`,
`stroke-linecap:round`, drawn on a 24 grid — four hand-authored paths, no icon library).
Each card is split by a hairline into a *worker* half (top, ink) and a *company* half (bottom,
muted, on `--paper-sunk`). The split is the argument: every benefit pays twice.

```css
.wf{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:var(--gap) }
.wf__card{ display:grid; grid-template-rows:auto auto 1fr auto; border-radius:var(--r-md);
  overflow:hidden; background:var(--paper-hi); box-shadow:var(--shadow-card);
  border:var(--hair) solid var(--line) }
.wf__ico{ color:var(--basil-ink); padding:16px 16px 0 }
.wf__co { background:var(--paper-sunk); padding:12px 16px 14px; color:var(--muted);
          border-top:var(--hair) dashed var(--line-strong); font-size:var(--fs-bbody) }
.wf__co::before{ content:'For the company'; display:block; font:600 var(--fs-statlab)/1.2
  var(--ff-ui); letter-spacing:.08em; text-transform:uppercase; color:var(--basil-ink);
  margin-bottom:4px }
@container viz (max-width:760px){ .wf{ grid-template-columns:repeat(2,1fr) } }
@container viz (max-width:400px){ .wf{ grid-template-columns:1fr } }
```
**Reveal.** Cards rise, then each company-half *unfolds* downward — the second benefit is revealed
after the first, which mirrors the presenter's script.
```js
tl.from('.wf__card',{y:20,autoAlpha:0,duration:.44,ease:'power3.out',stagger:.07},0)
  .from('.wf__ico svg path',{strokeDasharray:60,strokeDashoffset:60,duration:.5,
                             ease:'power2.out',stagger:.05},.12)
  .from('.wf__co',{height:0,paddingBlock:0,autoAlpha:0,duration:.42,ease:'power3.out',
                   stagger:.07},.30);
```
(`height:0` is a layout-animating exception, accepted here because it is four small elements once,
not a per-frame loop. If profiling shows jank, swap to `clipPath:'inset(0 0 100% 0)'`.)

### 5.12 `ladder` — 4 rising steps, top 2 do not yet exist
*Data:* `LADDER_STEPS` (`now, now, proposed, proposed`). *Slide:* `limits`, layout `split`.

**Hybrid.** SVG risers + DOM treads. Step *i* sits at `bottom: calc(i * 22%)` and
`left: calc(i * 9%)` — rising and stepping right, so it reads as a staircase in perspective.
The two `proposed` steps are drawn **dashed, unfilled, at 55% opacity**, and hover-lift only on
those two (they are the aspiration; making them the interactive ones is the point).

```css
.ladder__step[data-state="now"]{ background:var(--paper-hi); border:var(--hair) solid var(--line-strong) }
.ladder__step[data-state="proposed"]{ background:transparent; opacity:.62;
  border:1.5px dashed var(--accent); color:var(--muted) }
.ladder__step[data-state="proposed"]::after{ content:'does not exist yet';
  font:600 var(--fs-statlab)/1 var(--ff-ui); letter-spacing:.08em; text-transform:uppercase;
  color:var(--accent); display:block; margin-top:6px }
```
```js
tl.from('.ladder__step[data-state="now"]',{y:24,autoAlpha:0,duration:.42,ease:'power3.out',stagger:.1})
  .from('.ladder__riser',{scaleY:0,transformOrigin:'50% 100%',duration:.3,stagger:.1},'-=.5')
  .from('.ladder__step[data-state="proposed"]',
        {y:24,autoAlpha:0,duration:.5,ease:'power3.out',stagger:.14},'+=.30');
```
Again a `'+=.30'` beat before the ghost steps. Two real, pause, two imagined.

### 5.13 `cadence` — monthly vs annual review frequency
*Data:* fixed. *Slide:* `review`, layout `split`.

**SVG, and the encoding is literal.** Two horizontal 12-month tracks:
- *PizzaBurg:* 12 filled `--basil` ticks.
- *Typical annual review:* 11 hollow ticks + 1 filled at December.

No numbers, no bars — just twelve marks against one. The comparison is instant and it is true.
```js
tl.from('.cad-tick[data-row="pb"]',{scaleY:0,transformOrigin:'50% 100%',
        duration:.26,ease:'back.out(2)',stagger:.045},0)
  .from('.cad-tick[data-row="std"]',{scaleY:0,transformOrigin:'50% 100%',
        duration:.26,ease:'power2.out',stagger:.045},.20)
  .from('.cad-verdict',{autoAlpha:0,y:8,duration:.36},'-=.1');
```
`.cad-verdict` reads: *"Twelve chances to correct someone, against one."* — set at `--fs-sub`.
*Colour:* PizzaBurg row `--basil` filled; the comparison row hollow `--line-strong` with the
December tick `--muted`. The strength is genuine and this is the deck's one unambiguous win, so
let it look like one.

### 5.14 `unanswered` — two open questions
*Data:* 2 fixed strings. *Slide:* `unanswered`, layout `feature`.

**DOM.** Two large cards side by side, each a question in `--fs-sub` Fraunces with an oversized
`?` set in `--fs-display` at 12% opacity behind it (`position:absolute; z-index:0`). Dashed
borders, no fill — the visual language of `unknown` from §5.0, at poster scale.

```js
tl.from('.qcard',{y:22,autoAlpha:0,duration:.5,ease:'power3.out',stagger:.14})
  .from('.qcard__mark',{scale:.6,autoAlpha:0,rotate:-8,duration:.7,ease:'back.out(1.4)',
                        stagger:.14},'-=.4');
```

### 5.15 `loopviz` — a closed 4-node feedback loop with a visible break
*Data:* fixed: *check → find a gap → training → better work → (back to) check*. *Slide:* `training`, `wide`.

**SVG.** Four nodes on a circle at 12/3/6/9 o'clock; four arcs with arrowheads between them. Three
arcs are solid `--basil`. **One arc — the return leg from "better work" back to "check" — is drawn
with a 26° gap and two red end-caps**, and a small `✕` sits in the gap. That break is the finding.

```js
tl.from('.loop-node',{scale:.5,autoAlpha:0,duration:.36,ease:'back.out(2)',stagger:.10},0)
  .fromTo('.loop-arc:not(.is-broken)',{strokeDasharray:1,strokeDashoffset:1},
          {strokeDashoffset:0,duration:.5,ease:'power2.inOut',stagger:.16},.2)
  .fromTo('.loop-arc.is-broken',{strokeDasharray:1,strokeDashoffset:1},
          {strokeDashoffset:.36,duration:.6,ease:'power2.out'},'+=.28')   // stops short
  .from('.loop-break',{scale:0,rotate:-90,autoAlpha:0,duration:.42,ease:'back.out(2.4)'},'-=.15');
```
The broken arc animates to `strokeDashoffset:.36` and *stays there* — it never completes. That is
the whole diagram: the audience watches the loop try to close and fail.
*Colour:* nodes `--paper-hi` with `--ink` labels; working arcs `--basil`; the break `--red`.

### 5.16 `grounds` — 4 dismissal grounds mapped to law
*Data:* `GROUNDS` (4). *Slide:* `discipline`, layout `split`.

**DOM.** Four rows, each two-part: the ground (ink, `--fs-bhead`) with the business reason under
it, and to the right a **law chip** in a monospace-ish treatment (Inter 600, `tabular-nums`,
`letter-spacing:.02em`) on `--paper-sunk` with a 2px left border in `--basil`. Row 2 (harassment)
gets `--amber` on its chip border because it points to the 2009 High Court directions, which is
where the deck is heading.

```js
tl.from('.gr-row',{x:-16,autoAlpha:0,duration:.42,ease:'power3.out',stagger:.09})
  .from('.gr-law',{x:16,autoAlpha:0,duration:.42,ease:'power3.out',stagger:.09},'-=.5');
```
The two halves converge from opposite sides and meet — "practice" and "law" mapping onto each other.

### 5.17 `section24` — 5 mandatory steps
*Data:* `S24_STEPS` (5). *Slide:* `s24`, layout `wide`.

**DOM, numbered, connected.** Five cards in a row joined by a 2px `--ink` connector drawn as a
`::after` on each card except the last. Each card carries a large Fraunces numeral. Under the row,
a single full-width bar reading **"None of this was described to us."** in `--red-deep` on a red-8%
fill with a `▲` — it appears *after* all five, and it is the punchline.

```js
tl.from('.s24-card',{y:18,autoAlpha:0,duration:.40,ease:'power3.out',stagger:.10},0)
  .from('.s24-link',{scaleX:0,transformOrigin:'0% 50%',duration:.26,stagger:.10},.10)
  .from('.s24-verdict',{autoAlpha:0,y:12,duration:.46,ease:'power3.out'},'+=.42')
  .fromTo('.s24-verdict',{boxShadow:'0 0 0 0 rgba(226,59,46,.35)'},
                         {boxShadow:'0 0 0 10px rgba(226,59,46,0)',duration:.7,ease:'power2.out'},'<');
```
One pulse, once. Not a loop.

### 5.18 `harassment` — the gap between a rule and its machinery
*Data:* fixed. *Slide:* `harassment`, layout `feature`.

**DOM, two blocks with a literal gap between them.** Left: "The rule exists" — solid, filled,
`--basil` accent, contains *"Sexual harassment is a dismissal offence."* Right: "The machinery
does not" — dashed, empty, `--red` accent, contains *"No complaint committee was described."*
Between them a **48px void** crossed by a broken 2px line with an `✕`, and above the void the word
`GAP` in `--fs-statlab`.

```js
tl.from('.hz-have',{x:-26,autoAlpha:0,duration:.5,ease:'power3.out'},0)
  .from('.hz-need',{x: 26,autoAlpha:0,duration:.5,ease:'power3.out'},0)
  .fromTo('.hz-bridge',{scaleX:0},{scaleX:1,transformOrigin:'0% 50%',duration:.5,
                                   ease:'power2.out'},.35)
  .from('.hz-x',{scale:0,rotate:-120,autoAlpha:0,duration:.44,ease:'back.out(2.6)'},'-=.12')
  .fromTo('.hz-need',{'--dash-offset':0},{'--dash-offset':-24,duration:1.6,ease:'none'},'<');
```
The last tween marches the dashed border of the empty box (via
`border-image` / an SVG `stroke-dashoffset`) exactly once — a "still waiting" gesture.

### 5.19 `scorecard` — 8 rows, status match / partial / unknown / urgent
*Data:* `SCORECARD` (8 rows; statuses `unknown, match, urgent, unknown, match, partial, urgent, unknown`).
*Slide:* `scorecard`, layout `wide`. **The densest component in the deck.**

**DOM `<table>`,** 4 columns: *Law* / *What it asks* / *What we found* / *Status*. Font drops to
`clamp(12px, calc(.66*var(--u)+6px), 16px)` for this one component only — 8 rows × 4 columns will
not fit otherwise on a 4:3 projector, and the alternative (scrolling) is worse live.

Row background is `--st-fill` at 55% strength; the status cell carries the glyph + word. The two
`urgent` rows additionally get a 3px `--red` left border that extends 4px beyond the table edge —
a bleeding tab that lets the presenter point.

**Reveal — the most important choreography in the deck.** Rows arrive in *severity order*, not
document order: all `match` first, then `partial`, then `unknown`, then the two `urgent` last,
together, with a hold before them.

```js
const order = { match:0, partial:1, unknown:2, urgent:3 };
tl.from('.sc-row',{ y:12, autoAlpha:0, duration:.34, ease:'power3.out',
    stagger:{ each:.06, from:0,
      // sort by severity: GSAP staggers by index, so precompute a delay per row
      grid:false }},0);
// simpler and explicit:
['match','partial','unknown'].forEach((k,g)=>
  tl.from(`.sc-row[data-st="${k}"]`,{y:12,autoAlpha:0,duration:.34,stagger:.06}, g*.22));
tl.from('.sc-row[data-st="urgent"]',
        {y:14,autoAlpha:0,duration:.5,ease:'power3.out',stagger:.12},'+=.40')
  .from('.sc-row[data-st="urgent"] .sc-tab',{scaleY:0,transformOrigin:'50% 50%',duration:.3},'<.1');
```
Rows keep their DOM order (so the table still reads correctly to a screen reader and in print);
only the *animation delay* is reordered.

### 5.20 `findings` — told vs concluded, two columns
*Data:* `FINDINGS.told` (8) / `FINDINGS.concluded` (8). *Slide:* `findings`, layout `feature`.

**DOM, two columns, index-locked.** Row *i* on the left pairs with row *i* on the right. A thin
`--line` divider runs down the centre with a `→` at each row's vertical midpoint. Left column is
`--muted` (what we were *told* — reported speech). Right column is `--ink` at 600 weight (what we
*concluded* — our voice). The weight difference is the epistemics.

```css
.fnd{ display:grid; grid-template-columns:1fr 28px 1fr; gap:10px 0; align-items:start }
.fnd__told{ color:var(--muted); font-size:var(--fs-bbody); padding-right:14px }
.fnd__arrow{ color:var(--line-strong); text-align:center; padding-top:.2em }
.fnd__conc{ color:var(--ink); font-weight:600; font-size:var(--fs-bbody); padding-left:14px;
            border-left:var(--hair) solid var(--line) }
@container viz (max-width:640px){ .fnd{ grid-template-columns:1fr }
  .fnd__arrow{ text-align:left; transform:rotate(90deg); width:1em }
  .fnd__conc{ border-left:2px solid var(--accent); margin-bottom:14px } }
```
```js
tl.from('.fnd__told',{x:-12,autoAlpha:0,duration:.34,stagger:.055},0)
  .from('.fnd__arrow',{scale:0,autoAlpha:0,duration:.22,stagger:.055},.14)
  .from('.fnd__conc',{x:12,autoAlpha:0,duration:.34,stagger:.055},.18);
```

### 5.21 `swot` — 4 quadrants
*Data:* `SWOT` (10 / 11 / 6 / 6 items). *Slide:* `swot`, layout `wide`.

**DOM 2×2 grid with a shared cross.** The dividing lines are a single `::before`/`::after` pair on
the container, not four borders — so the cross is one continuous stroke. Items are compact chips
(`--fs-caption`, 6px 10px, 999px radius) that wrap. 33 chips total, which is a lot, so chips not
cards.

*Colour:* S `--basil` 14% fill / basil-ink text; W `--red` 12% / red-deep; O `--amber` 22% /
amber-ink; T `--muted` 10% / ink, dashed border. Quadrant headers carry the letter in `--fs-stat`
at 18% opacity as a watermark.

```js
tl.from('.swot__cross',{scaleX:0,scaleY:0,duration:.5,ease:'power3.out',
                        transformOrigin:'50% 50%'},0)
  .from('.swot__q',{autoAlpha:0,scale:.97,duration:.36,stagger:.09},.15)
  .from('.swot__chip',{y:8,autoAlpha:0,duration:.26,ease:'power2.out',
                       stagger:{each:.014,from:'start'}},.28);
```
33 chips × 14 ms = 460 ms of stagger — fast enough to read as a *fill*, slow enough to see.

### 5.22 `recs` — 5 recommendation cards
*Data:* `RECOMMENDATIONS.slice(from, from+5)`. *Slides:* `recs1` (from 0), `recs2` (from 5), `wide`.

**DOM cards.** Each: the numbered reference (`9.1`) as a small `--accent` tag, the title in
`--fs-bhead`, then a 3-cell meta strip — *urgency / cost / time* — as `--fs-statlab` pairs, then
the gain line in `--muted`. Urgency drives a left border: Urgent → 3px `--red`; High → 3px
`--amber` **plus** an `▲`-free but bold label (amber cannot carry it alone); Medium → 2px `--line-strong`.

```js
tl.from('.rec',{y:20,autoAlpha:0,duration:.44,ease:'power3.out',stagger:.08},0)
  .from('.rec__bar',{scaleY:0,transformOrigin:'50% 0%',duration:.36,stagger:.08},.10)
  .from('.rec__meta > *',{autoAlpha:0,y:6,duration:.26,stagger:.02},.28);
```
Because `recs1` and `recs2` are consecutive slides with identical structure, set
`data-continues="true"` on `recs2` and skip the card entrance (`tl.set` instead of `tl.from`) —
only the *contents* change. Re-animating an identical grid twice in a row looks like a stutter.

### 5.23 `matrix` — urgency × cost priority plot
*Data:* `RECOMMENDATIONS` (all 10; `urgency ∈ {Urgent, High, Medium}`, `cost ∈ {Very low, Low,
Low–medium}`). *Slide:* `priority`, layout `wide`.

**Hybrid.** SVG axes + quadrant tint; DOM for the 10 plotted labels (they must wrap and be
selectable). Both axes are **ordinal with named ticks**, never numeric:

- x = cost, left→right: `Very low · Low · Low–medium`
- y = urgency, bottom→top: `Medium · High · Urgent`

Points are placed on the 3×3 lattice with a deterministic ±9px jitter derived from the index
(`(i*37 % 19) - 9`) so co-located items separate without looking random on reload.

The top-left quadrant (urgent + very low cost) gets a `--basil` 12% wash and the label
**"Do these first"** — that quadrant contains 9.1, and that is the deck's single most actionable
statement.

```js
tl.from('.mx-axis',{scaleX:0,scaleY:0,transformOrigin:'0% 100%',duration:.5,ease:'power3.out'},0)
  .from('.mx-tick',{autoAlpha:0,duration:.3,stagger:.03},.2)
  .from('.mx-zone',{autoAlpha:0,duration:.5},.3)
  .from('.mx-pt',{scale:0,autoAlpha:0,duration:.42,ease:'back.out(2)',
                  stagger:{each:.05,from:'end'}},.42)   // from:'end' → cheapest/least urgent first,
                                                        // so 9.1 lands LAST, alone, top-left
  .from('.mx-zone-label',{autoAlpha:0,x:-8,duration:.4},'-=.2');
```

### 5.24 `photo` — 3 uses
*Data:* `visual.src` + `caption`. *Slides:* `cover` (hero-pizzas), `why` (outlet-sign),
`conclusion` (team-street).

```html
<figure class="viz" data-kind="photo">
  <div class="ph"><img src="assets/img/hero-pizzas.webp" alt="…" loading="eager" decoding="async"
       width="1920" height="1080"></div>
  <figcaption class="cap">PizzaBurg, Mirpur · 26 August 2026</figcaption>
</figure>
```
```css
.ph{ position:relative; border-radius:var(--r-lg); overflow:hidden; background:var(--paper-sunk);
     box-shadow:var(--shadow-plate); aspect-ratio:4/3 }
.ph img{ width:100%; height:100%; object-fit:cover; display:block;
         filter:saturate(.94) contrast(1.02) }
/* a paper edge so the photo belongs to the deck rather than sitting on it */
.ph::after{ content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  box-shadow: inset 0 0 0 var(--hair) rgba(26,22,20,.14),
              inset 0 0 60px rgba(243,236,225,.28) }
```
**Reveal — a mask wipe, not a fade.** The image is already at full opacity; a paper panel slides
off it.
```js
tl.fromTo('.ph',{clipPath:'inset(0 0 0 100%)'},{clipPath:'inset(0 0 0 0%)',
          duration:.72,ease:'expo.out'},0)
  .from('.ph img',{scale:1.10,duration:1.2,ease:'power3.out'},0)   // slow settle behind the wipe
  .from('.cap',{autoAlpha:0,y:6,duration:.34},.5);
```
Preload the next slide's image on `mountSlide(idx+1)` via `new Image().src` so the wipe never
reveals a blank box.

### 5.25 `video` — the interview clip
*Data:* `interview-18s.mp4`, poster `interview-wide`. *Slide:* `method`, layout `splitR`.

```html
<video class="vid" poster="assets/img/interview-wide.webp" muted playsinline loop
       preload="metadata" width="1280" height="720"></video>
```
`muted playsinline loop` + `preload="metadata"`. **Do not autoplay on load** — attach the source
and call `play()` inside `buildViz`, and wrap it: `v.play().catch(()=>{})`. If it rejects (some
browsers still refuse without a gesture), the poster stays and a small `▶` button appears; the
first-run "Enter presentation" gesture (§7.1) normally satisfies the policy for the whole session,
which is one of the reasons that button exists. Pause and `currentTime = 0` on exit.

### 5.26 `team` — 6 presenters
*Data:* `PRESENTERS`. *Slide:* `thanks`, layout `closing`.

Six cards in `repeat(6,1fr)` → `repeat(3,1fr)` at 760px → `repeat(2,1fr)` at 420px. Each: a
`--accent`-tinted disc with the two-letter initials in Fraunces 700, the short name in
`--fs-bhead`, the full name in `--fs-caption` `--muted`, the student ID in `--fs-statlab`
tabular-nums. See §8.10 for the FLIP-from-the-rail entrance, which is the deck's closing move.

### 5.27 `scope` — in / out of scope
*Data:* `SCOPE.inside` (7) / `SCOPE.outside` (7). *Slide:* `scope`, layout `split`.

Two stacked lists. Inside: `✓` in `--basil-ink`, solid `--paper-hi` chips. Outside: `–` in
`--muted`, **no fill, dashed hairline, 68% opacity**. The outside list is deliberately quieter —
scope exclusions should not compete with scope inclusions for attention.
```js
tl.from('.scope--in li',{x:-10,autoAlpha:0,duration:.3,stagger:.045},0)
  .from('.scope--out li',{x:-10,autoAlpha:0,duration:.3,stagger:.035},.28);
```

### 5.28 `drift` — the fixed number vs changing demand
*Data:* derived. *Slide:* `untested`, layout `feature`.

**SVG.** Two lines across a 12-month x-axis: a **flat** `--ink` line (the fixed staffing number)
and a **wavy** `--red` line (actual demand — a hand-authored sine-ish path, amplitude growing
left→right). The area between them is filled `--red` at 10%, and it visibly widens. Two callouts:
"over-staffed" where demand dips below, "under-staffed" where it rises above.

```js
tl.fromTo('.drift-flat',{strokeDasharray:1,strokeDashoffset:1},
          {strokeDashoffset:0,duration:.7,ease:'power2.inOut'},0)
  .fromTo('.drift-real',{strokeDasharray:1,strokeDashoffset:1},
          {strokeDashoffset:0,duration:1.1,ease:'power2.inOut'},.2)
  .from('.drift-gap',{autoAlpha:0,duration:.6},.7)
  .from('.drift-note',{autoAlpha:0,y:8,duration:.36,stagger:.14},.95);
```
No y-axis numbers. The shape is the argument; a scale would imply data the group does not have.

### 5.29 Component summary table

| kind | markup | data | primary colour logic | signature beat |
|---|---|---|---|---|
| objectives | DOM grid 4×2 | `OBJECTIVES` | accent top-rule | 45 ms reading-order stagger |
| timeline | hybrid | `TIMELINE` | red curve, ink nodes | 1.1 s dash draw |
| verify | DOM table | `VERIFY_ROWS` | all `match` | verdict pops last per row |
| units | DOM grid | `OUTLET_CITIES` | 21 neutral + 1 red | random stagger, one breathing tile |
| tradeoff | DOM 3-col | `TRADEOFF_ROWS` | basil vs red 9% | halves enter from opposite sides |
| funnel | hybrid | `HIRING_STEPS` | best=basil, weak=dashed red | 380 ms hold before the weak step |
| worktest | DOM ordinal | fixed | rank by type size, not length | disclaimer with the last item |
| leak | SVG | derived | ink outline, red drops | infinite droplet loop |
| rings | SVG | qualitative | dash density = frequency | 10 s vs 34 s rotation |
| days60 | hybrid | `NOTICE_STAGES` | basil fill, ink endpoints | sweep crosses each stop |
| welfare | DOM cards | `WELFARE_ITEMS` | split card, sunk lower half | company-half unfolds |
| ladder | hybrid | `LADDER_STEPS` | dashed = does not exist | pause before the ghost steps |
| cadence | SVG | fixed | 12 filled vs 1 filled | tick-by-tick, 45 ms |
| unanswered | DOM | fixed | dashed, unfilled | oversized `?` watermark |
| loopviz | SVG | fixed | 3 basil arcs, 1 broken red | broken arc never completes |
| grounds | DOM | `GROUNDS` | basil law-chips, amber on row 2 | halves converge |
| section24 | DOM | `S24_STEPS` | ink numerals | verdict bar + one pulse |
| harassment | DOM | fixed | solid vs dashed-empty | 48 px literal gap |
| scorecard | DOM table | `SCORECARD` | full status system | severity-ordered reveal |
| findings | DOM 2-col | `FINDINGS` | muted vs ink-600 | index-locked pairs |
| swot | DOM 2×2 | `SWOT` | four tints, watermark letters | 14 ms chip fill |
| recs | DOM cards | `RECOMMENDATIONS` | urgency = left bar | `recs2` skips re-entrance |
| matrix | hybrid | `RECOMMENDATIONS` | ordinal axes, basil quadrant | 9.1 lands last, alone |
| photo | DOM | `visual.src` | paper inner-shadow edge | clip wipe + 1.2 s scale settle |
| video | DOM | mp4 | — | gesture-safe play |
| team | DOM | `PRESENTERS` | six hues | FLIP from the rail (§8.10) |
| scope | DOM | `SCOPE` | in solid, out dashed 68% | out-list quieter |
| drift | SVG | derived | flat ink vs wavy red | widening 10% red gap |

---

## 6. Presenter chrome

### 6.1 DOM

```html
<div class="chrome" data-visible="true">

  <!-- ── progress rail: six presenter segments ─────────────────────────── -->
  <div class="rail" role="progressbar" aria-label="Presentation progress"
       aria-valuemin="1" aria-valuemax="31" aria-valuenow="2">
    <!-- one <button> per presenter; flex-grow = slide count (5 5 5 5 5 6) -->
    <button class="rail__seg" style="--n:5;--hue:8"   data-key="ratul"  data-from="0"
            aria-label="Ratul, slides 1 to 5">
      <span class="rail__fill"></span>
      <span class="rail__name">Ratul</span>
    </button>
    <!-- … aditto 5, liya 5, souvo 5, sourov 5, esha 6 … -->
    <span class="rail__baton" aria-hidden="true"></span>
  </div>

  <!-- ── bottom bar ────────────────────────────────────────────────────── -->
  <div class="bar">
    <div class="badge glass" aria-live="polite">
      <span class="badge__dot" style="--hue:8"></span>
      <span class="badge__name">Ratul</span>
      <span class="badge__sep">·</span>
      <span class="badge__block">Introduction</span>
    </div>

    <div class="bar__spacer"></div>

    <div class="counter glass" aria-hidden="true">
      <span class="counter__roll" data-value="2"><span class="counter__d">2</span></span>
      <span class="counter__tot">/ 31</span>
    </div>

    <nav class="tools" aria-label="Presentation controls">
      <button class="tool" data-act="overview"  aria-keyshortcuts="O" title="Overview (O)">▦</button>
      <button class="tool" data-act="notes"     aria-keyshortcuts="N" title="Notes (N)">✎</button>
      <button class="tool" data-act="fullscreen"aria-keyshortcuts="F" title="Fullscreen (F)">⤢</button>
      <button class="tool" data-act="help"      aria-keyshortcuts="?" title="Shortcuts (?)">?</button>
    </nav>
  </div>

  <!-- handover cue, appears 1 slide before a block change -->
  <div class="handover" hidden><span class="handover__k">Next up</span>
       <span class="handover__n">Aditto</span></div>

  <!-- live region for screen readers; never visually rendered -->
  <p class="sr-only" role="status" aria-live="polite" id="announce"></p>
</div>

<!-- panels live outside .chrome so they can trap focus independently -->
<div class="overview" id="overview" hidden>…</div>
<aside class="notes"  id="notes"    hidden>…</aside>
<div class="help"     id="help"     hidden>…</div>
```

### 6.2 CSS

```css
.chrome{ position:fixed; inset:0; z-index:var(--z-chrome); pointer-events:none;
         font-family:var(--ff-ui) }
.chrome > *{ pointer-events:auto }
.chrome[data-visible="false"] .bar,
.chrome[data-visible="false"] .rail{ opacity:0; transform:translateY(6px);
         transition:opacity 400ms var(--e-out), transform 400ms var(--e-out) }

/* ── rail ──────────────────────────────────────────────────────────────── */
.rail{ position:absolute; top:0; left:0; right:0; height:34px; display:flex; gap:3px;
       padding:10px var(--gut) 0; align-items:flex-start }
.rail__seg{ position:relative; flex:var(--n) 1 0; height:4px; border:0; padding:0;
  background:color-mix(in oklab, var(--ink) 10%, transparent);
  border-radius:99px; cursor:pointer; overflow:visible;
  transition:height 220ms var(--e-out), background 220ms linear }
.rail__seg:hover, .rail__seg:focus-visible{ height:7px }
.rail__fill{ position:absolute; inset:0; border-radius:inherit; transform-origin:0 50%;
  transform:scaleX(var(--p,0));
  background:oklch(58% .17 var(--hue));
  transition:transform 420ms var(--e-out) }
.rail__seg[data-state="done"]  .rail__fill{ transform:scaleX(1); opacity:.42 }
.rail__seg[data-state="active"]{ height:7px }
.rail__name{ position:absolute; top:12px; left:0; font-size:11px; letter-spacing:.06em;
  text-transform:uppercase; color:var(--muted); opacity:0;
  transition:opacity 180ms var(--e-out) }
.rail__seg[data-state="active"] .rail__name,
.rail__seg:hover .rail__name{ opacity:1 }

/* the baton: a 7px dot that slides across a segment joint on handover */
.rail__baton{ position:absolute; top:8px; left:0; width:7px; height:7px; border-radius:99px;
  background:var(--ink); opacity:0; transform:translateX(var(--bx,0)) scale(.4);
  transition:opacity 200ms linear }

/* ── bottom bar ───────────────────────────────────────────────────────── */
.bar{ position:absolute; left:0; right:0; bottom:0; display:flex; align-items:center; gap:10px;
  padding:0 var(--gut) max(14px, env(safe-area-inset-bottom)) }
.badge{ display:inline-flex; align-items:center; gap:8px; padding:7px 13px; border-radius:99px;
  font:500 var(--fs-ui)/1 var(--ff-ui) }
.badge__dot{ width:8px; height:8px; border-radius:99px; background:oklch(58% .17 var(--hue));
  box-shadow:0 0 0 3px oklch(58% .17 var(--hue) / .18); transition:background 500ms linear }
.badge__block{ color:var(--muted) }
.bar__spacer{ flex:1 }

.counter{ display:inline-flex; align-items:baseline; gap:4px; padding:6px 11px;
  border-radius:99px; font-variant-numeric:tabular-nums;
  font:600 var(--fs-ui)/1 var(--ff-ui) }
.counter__roll{ display:inline-block; height:1em; overflow:hidden; line-height:1 }
.counter__tot{ color:var(--muted); font-weight:500 }

.tools{ display:flex; gap:4px }
.tool{ width:34px; height:34px; display:grid; place-items:center; border-radius:10px;
  border:var(--hair) solid var(--line); background:color-mix(in srgb,var(--paper) 72%,transparent);
  color:var(--muted); cursor:pointer; font-size:14px;
  transition:transform var(--t-tap) var(--e-out), color var(--t-tap) linear,
             background var(--t-tap) linear }
.tool:hover{ color:var(--ink); background:var(--paper-hi) }
.tool:active{ transform:scale(.94) }

/* ── the focus ring, used everywhere ──────────────────────────────────── */
:where(button,a,[tabindex]):focus-visible{
  outline:2.5px solid var(--red); outline-offset:3px; border-radius:8px;
  animation:focusPop 140ms var(--e-out) }
@keyframes focusPop{ from{ outline-offset:7px; outline-color:transparent } }

.sr-only{ position:absolute!important; width:1px; height:1px; padding:0; margin:-1px;
  overflow:hidden; clip-path:inset(50%); white-space:nowrap; border:0 }

/* ── handover cue ─────────────────────────────────────────────────────── */
.handover{ position:absolute; right:var(--gut); bottom:56px; display:flex; gap:8px;
  align-items:baseline; padding:8px 14px; border-radius:12px;
  background:color-mix(in srgb,var(--paper) 86%,transparent);
  border:var(--hair) solid var(--line); box-shadow:var(--shadow-card);
  opacity:0; transform:translateY(8px) }
.handover__k{ font:600 var(--fs-statlab)/1 var(--ff-ui); letter-spacing:.08em;
  text-transform:uppercase; color:var(--muted) }
.handover__n{ font:600 var(--fs-bhead)/1 var(--ff-ui); color:oklch(58% .17 var(--hue)) }
```

### 6.3 Rail behaviour and the handover cue

```js
function syncChrome(i){
  const s = SLIDES[i], p = PRESENTERS.findIndex(x=>x.key===s.by);
  document.querySelectorAll('.rail__seg').forEach((seg,gi)=>{
    const from = +seg.dataset.from, n = +getComputedStyle(seg).getPropertyValue('--n');
    seg.dataset.state = gi < p ? 'done' : gi === p ? 'active' : 'todo';
    seg.style.setProperty('--p', gi < p ? 1 : gi > p ? 0
                                  : gsap.utils.clamp(0,1,(i - from + 1) / n));
  });
  rail.setAttribute('aria-valuenow', i+1);
  // badge
  badgeDot.style.setProperty('--hue', PRESENTERS[p].hue);
  badgeName.textContent = PRESENTERS[p].short;
  rollCounter(i+1);                      // §8.9
  // handover: is the NEXT slide the start of a new block?
  const nx = SLIDES[i+1];
  if (nx && nx.handover) showHandover(PRESENTERS.find(x=>x.key===nx.by));
  if (s.handover && i>0) playBaton(p);   // §8.2
}

function showHandover(next){
  const el = document.querySelector('.handover');
  el.querySelector('.handover__n').textContent = next.short;
  el.style.setProperty('--hue', next.hue);
  el.hidden = false;
  gsap.timeline()
    .to(el,{opacity:1,y:0,duration:.36,ease:'power3.out'})
    .to(el,{opacity:0,y:6,duration:.3,ease:'power2.in',
            onComplete:()=>{el.hidden=true}}, '+=2.4');
}
```

The cue appears on the **last slide of a block**, giving the outgoing presenter ~90 seconds of
warning and the incoming one time to walk over. That is the actual failure mode of a six-person
presentation, and this is the fix.

### 6.4 Keyboard model

One handler, one table, no scattered `keydown` listeners.

```js
const KEYS = {
  next:  ['ArrowRight','ArrowDown','PageDown',' ','Spacebar','Enter'],
  prev:  ['ArrowLeft','ArrowUp','PageUp','Backspace'],
  first: ['Home'], last: ['End'],
  overview:['o','O'], notes:['n','N','s','S'], help:['?','/'], full:['f','F'],
  black: ['b','B','.'], contrast:['c','C'], esc:['Escape'],
};
```

| Key | Action | Why |
|---|---|---|
| `→` `↓` `Space` `Enter` | next | |
| **`PageDown`** | next | **Logitech / Kensington clickers send exactly this** |
| `←` `↑` `Backspace` | previous | |
| **`PageUp`** | previous | ditto |
| `Home` / `End` | slide 1 / 31 | |
| `1`–`9` then `Enter`, or type digits | go to slide `n` | a 900 ms buffer collects digits |
| `O` or `Esc` | toggle overview | reveal.js convention; the audience knows it |
| **`N`** (alias `S`) | speaker-notes panel | `N` per the brief; `S` aliased because reveal.js users reach for it |
| `?` (or `/`) | help sheet | |
| `F` | fullscreen | |
| **`B`** or **`.`** | blackout — paper-white hold screen | **clickers' "blank screen" button sends `b` or `.`** |
| `C` | projector-contrast mode (`data-contrast="high"`) | |
| `F5` | `preventDefault()` + go to slide 1 | **clickers send F5 to "start the slideshow" — without this the deck reloads live** |
| `Esc` | close top-most panel; if none open, exit fullscreen | |

```js
addEventListener('keydown', e=>{
  if (e.repeat) return;                                   // no key-repeat scrubbing
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const t = e.target;
  if (t.matches('input,textarea,[contenteditable]')) return;

  if (e.key === 'F5'){ e.preventDefault(); go(0); return; }   // the clicker "start show" button

  if (openPanel){                                          // panels swallow navigation
    if (KEYS.esc.includes(e.key)){ e.preventDefault(); closePanel(); }
    else if (openPanel === 'overview') overviewKeys(e);
    return;
  }
  const k = e.key;
  if (KEYS.next.includes(k)){ e.preventDefault(); go(S.idx+1); }
  else if (KEYS.prev.includes(k)){ e.preventDefault(); go(S.idx-1); }
  else if (KEYS.first.includes(k)) go(0);
  else if (KEYS.last.includes(k))  go(SLIDES.length-1);
  else if (KEYS.overview.includes(k)) openOverview();
  else if (KEYS.notes.includes(k))    toggleNotes();
  else if (KEYS.help.includes(k))     toggleHelp();
  else if (KEYS.full.includes(k))     toggleFullscreen();
  else if (KEYS.black.includes(k))    toggleBlackout();
  else if (KEYS.contrast.includes(k)) document.documentElement.toggleAttribute('data-contrast');
  else if (/^[0-9]$/.test(k))         bufferDigit(k);
});
```

`e.preventDefault()` on Space is mandatory — otherwise the browser scrolls the (scrollable on
mobile) stage while also advancing.

**Blackout** is `html[data-black]` → a fixed `--paper` sheet at z 8 with a 200 ms fade and a tiny
`press any key` hint at 20% opacity. Paper-white, not black: in a lit classroom a white hold screen
is far less jarring, and it doubles as a whiteboard for the projector.

### 6.5 Overview grid (`O`)

31 static cards. **Do not re-render slides** — build a lightweight card per slide from
`kicker/title/by`, tinted with the presenter hue.

```html
<div class="overview" id="overview" role="dialog" aria-modal="true" aria-label="All slides">
  <div class="ov__grid" role="listbox" aria-activedescendant="ov-1">
    <button class="ov__card" id="ov-1" role="option" data-i="0" style="--hue:8">
      <span class="ov__n">01</span>
      <span class="ov__t">PizzaBurg</span>
      <span class="ov__k">Human Resource Management</span>
      <span class="ov__by">Ratul</span>
    </button>…
  </div>
</div>
```
```css
.overview{ position:fixed; inset:0; z-index:var(--z-overview);
  background:color-mix(in srgb,var(--paper) 92%,transparent);
  -webkit-backdrop-filter:blur(20px); backdrop-filter:blur(20px);
  overflow:auto; overscroll-behavior:contain; padding:var(--gut) }
.ov__grid{ display:grid; gap:12px; max-width:1500px; margin:0 auto;
  grid-template-columns:repeat(auto-fill,minmax(190px,1fr)) }
.ov__card{ content-visibility:auto; contain-intrinsic-size:190px 118px;
  aspect-ratio:16/10; display:grid; align-content:start; gap:4px; text-align:left;
  padding:12px; border-radius:var(--r-md); background:var(--paper-hi);
  border:var(--hair) solid var(--line); border-left:3px solid oklch(58% .17 var(--hue));
  cursor:pointer; transition:transform 160ms var(--e-out), box-shadow 160ms var(--e-out) }
.ov__card:hover{ transform:translateY(-3px); box-shadow:var(--shadow-card) }
.ov__card[aria-selected="true"]{ outline:2.5px solid var(--red); outline-offset:2px }
.ov__n{ font:700 12px/1 var(--ff-display); font-variation-settings:'opsz' 20; color:var(--muted) }
.ov__t{ font:600 15px/1.2 var(--ff-display); font-variation-settings:'opsz' 28; color:var(--ink) }
.ov__k{ font-size:11px; color:var(--muted) }
.ov__by{ font-size:10px; letter-spacing:.08em; text-transform:uppercase;
         color:oklch(48% .16 var(--hue)); margin-top:auto }
```
`content-visibility:auto` + `contain-intrinsic-size` means only the ~12 visible cards are laid out;
opening the grid is instant even though it is 31 nodes deep.

Entrance: `gsap.from('.ov__card',{y:14,autoAlpha:0,duration:.34,ease:'power3.out',
stagger:{each:.012,grid:'auto',from:'start'}})`, and the current slide's card scrolls into view
with `block:'center'` and gets the selection ring. Arrows move selection (grid-aware: `←→` ±1,
`↑↓` ± columns, computed from `getComputedStyle(grid).gridTemplateColumns.split(' ').length`),
`Enter` commits, `Esc`/`O` closes. Focus is trapped and returned to the `.tool[data-act=overview]`
button on close.

### 6.6 Speaker-notes panel (`N`)

A bottom sheet, not a second window — a second window needs a popup permission and breaks on a
mirrored projector.

```css
.notes{ position:fixed; left:0; right:0; bottom:0; z-index:var(--z-panel);
  height:min(38svh,420px); display:grid; grid-template-rows:auto 1fr;
  background:color-mix(in srgb,var(--paper-hi) 96%,transparent);
  border-top:var(--hair) solid var(--line-strong);
  box-shadow:0 -18px 60px -24px rgba(58,42,30,.4);
  transform:translateY(100%); transition:transform var(--t-panel) var(--e-sheet) }
.notes[data-open="true"]{ transform:translateY(0) }
.notes__hd{ display:flex; align-items:center; gap:12px; padding:10px var(--gut);
  border-bottom:var(--hair) solid var(--line); font:500 var(--fs-ui)/1 var(--ff-ui) }
.notes__body{ overflow:auto; padding:16px var(--gut) 22px; font-size:clamp(15px,1.9svh,19px);
  line-height:1.55; max-width:78ch; color:var(--ink) }
.notes__next{ color:var(--muted); border-top:var(--hair) dashed var(--line-strong);
  margin-top:14px; padding-top:10px; font-size:var(--fs-caption) }
.notes__timer{ margin-left:auto; font-variant-numeric:tabular-nums; color:var(--muted) }
.notes__timer[data-over="true"]{ color:var(--red-deep) }
```
Header carries: presenter name · slide *n* of 31 · **elapsed timer** (starts on first advance,
turns `--red-deep` past 18:00, which is a typical 6-person slot) · a `Reset` button. Body shows
`SLIDES[i].notes` verbatim, then a `Next: <title>` line so the presenter can see the landing before
they click. `--t-panel: 300ms` on the iOS drawer curve `cubic-bezier(.32,.72,0,1)`.

When notes are open, `.stage` gets `padding-bottom: calc(38svh + 24px)` with a 300 ms transition so
the slide is not covered — the content lifts rather than being hidden.

### 6.7 Help sheet (`?`)

A centred `<dialog>`-styled panel listing every binding in two columns as real `<kbd>` elements.
The delight detail (§8.8): a global `keydown` listener adds `.is-down` to the matching `<kbd>` for
120 ms, so pressing keys while the sheet is open lights them up — the presenter can verify their
clicker's actual key mapping in ten seconds, on the classroom machine, before they start. That is
a genuinely useful feature disguised as a micro-interaction.

```css
kbd{ display:inline-grid; place-items:center; min-width:26px; height:24px; padding:0 7px;
  border-radius:6px; background:var(--paper-hi); color:var(--ink);
  border:var(--hair) solid var(--line-strong); border-bottom-width:2px;
  font:600 12px/1 var(--ff-ui); transition:transform 90ms var(--e-out), background 90ms linear }
kbd.is-down{ transform:translateY(1px); border-bottom-width:1px;
  background:color-mix(in srgb,var(--red) 16%,var(--paper-hi)) }
```

### 6.8 Fullscreen (`F`)

```js
async function toggleFullscreen(){
  try{
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen({navigationUI:'hide'});
    else await document.exitFullscreen();
  }catch(err){ toast('Fullscreen was blocked — press F11 instead.'); }
}
```
`requestFullscreen` must come from a user gesture; the keyboard handler is one, so `F` works. iOS
Safari has no element fullscreen — detect `!document.documentElement.requestFullscreen` and hide
the tool button rather than showing a control that does nothing.

### 6.9 Chrome auto-hide

Chrome fades out after **3.5 s** of no pointer or key input and returns on any `pointermove`,
`keydown`, or `touchstart` in 200 ms. It never hides while a panel is open, and it never hides the
rail during a handover cue. This is the difference between a deck that looks like a webpage and one
that looks like a presentation.

---

## 7. First run and edge cases

### 7.1 The title card / entry affordance

The deck does **not** start playing on load. It shows a static title card with one button, for
three separate technical reasons and one design reason:

1. `requestFullscreen()` requires a user gesture.
2. `video.play()` on `interview-18s.mp4` requires a gesture in several browsers even when muted.
3. WebGL context creation and the first shader compile take 200–600 ms; doing it behind a click
   hides the jank instead of stuttering the opening title.
4. Design: someone opening the shared link deserves a front door.

```html
<div class="gate" id="gate">
  <p class="kicker">Bangladesh University · BUS-2204</p>
  <h1 class="wordmark gate__mark">PizzaBurg</h1>
  <p class="t-sub">How a chain of 22 kitchens manages its people</p>
  <button class="gate__go" autofocus>
    Begin <span class="gate__kbd"><kbd>→</kbd></span>
  </button>
  <p class="cap gate__hint">31 slides · about 18 minutes · press <kbd>?</kbd> for shortcuts</p>
</div>
```
The gate is plain HTML/CSS with **no dependency on Three.js or GSAP having loaded**. It is
therefore also the error state: if either script fails, the gate simply stays up with a changed
hint line. Its exit is a 420 ms `power3.out` fade + `scale(1.04)` while slide 1 enters underneath —
the gate never blocks the first slide's own choreography, it lifts off it.

Before revealing slide 1, `await document.fonts.ready` (with a 1200 ms `Promise.race` timeout).
Fraunces at 92px shifting from a fallback serif mid-reveal is the single most visible polish bug
this deck can ship.

If the user presses `→` on the gate instead of clicking, treat it as the gesture — it is one.

### 7.2 WebGL failure

```js
let hasWorld = false;
try { hasWorld = World.init(document.getElementById('world')); }
catch(e){ hasWorld = false; }
document.documentElement.dataset.webgl = hasWorld ? 'on' : 'off';

// context loss mid-presentation — a real risk on a shared classroom laptop
canvas.addEventListener('webglcontextlost', e=>{
  e.preventDefault();
  document.documentElement.dataset.webgl = 'off';
  toast('3D paused. The presentation continues.');
}, false);
canvas.addEventListener('webglcontextrestored', ()=>{
  if (World.init(canvas)){ document.documentElement.dataset.webgl='on'; World.goTo(SLIDES[S.idx],true); }
});
```

`World.init` already returns `false` on a constructor throw or a null context, so this needs no
change to `world.js`.

The fallback is not an apology screen — it is a **second, fully designed background**: a per-zone
paper gradient that still changes on every slide, so the deck keeps its sense of travel.

```css
html[data-webgl="off"] #world{ display:none }
html[data-webgl="off"] .wash{
  background:
    radial-gradient(120% 90% at var(--wx) var(--wy),
      color-mix(in srgb, var(--zone-a) 55%, transparent) 0%,
      color-mix(in srgb, var(--paper) 70%, transparent) 62%,
      var(--paper) 100%),
    conic-gradient(from var(--zone-rot,0deg) at 70% 30%,
      color-mix(in srgb,var(--zone-b) 22%,transparent), transparent 38%, transparent);
  transition:--zone-rot 900ms var(--e-inout), background 700ms linear;
}
```
Each of the 14 zones gets a `--zone-a` / `--zone-b` pair and a `--zone-rot` angle set from JS on
navigation, so `street → map → meeting → …` still reads as fourteen distinct places. Register
`--zone-rot` with `@property{ syntax:'<angle>'; inherits:true; initial-value:0deg }` so it can be
transitioned at all.

Also required in this mode: `.plate{--plate-a:.97}` (there is no 3D to peek through, so the paper
should be paper) and the grain stays on, because it is now doing all the texture work.

### 7.3 `prefers-reduced-motion`

Covered by §4.7 for the overlay. Two extra obligations:

- `World.setReduced(true)` — already supported; `world.js` then jumps the camera rather than
  tweening it. Verified: `goTo()` checks `reduced` before building the arc.
- Kill the two ambient loops (§5.4 units breathing, §5.8 leak droplets) and the ring rotation
  (§5.9). Their *information* survives — dash density, the crack, the red tile — only the motion goes.
- The grain animation stops (`.grain{animation:none}`), because film-grain shimmer is exactly the
  kind of low-amplitude flicker that triggers vestibular symptoms.

Do **not** disable all animation. A 160 ms opacity crossfade between slides is a comprehension aid;
removing it makes the deck harder to follow, not gentler.

### 7.4 Touch and swipe

```js
let sx=0, sy=0, st=0, sc=null, axis=null;
stage.addEventListener('pointerdown', e=>{
  if (e.pointerType==='mouse' || openPanel) return;
  sx=e.clientX; sy=e.clientY; st=performance.now(); axis=null; sc=null;
}, {passive:true});

stage.addEventListener('pointermove', e=>{
  if (!st) return;
  const dx=e.clientX-sx, dy=e.clientY-sy;
  if (!axis){ if (Math.abs(dx)>10 || Math.abs(dy)>10)
                axis = Math.abs(dx) > Math.abs(dy)*1.4 ? 'x' : 'y'; else return; }
  if (axis!=='x') return;                                  // vertical = let the page scroll
  const dir = dx<0 ? 1 : -1;
  if (!sc){ if (S.idx+dir<0 || S.idx+dir>=SLIDES.length) return; sc = beginScrub(dir); }
  const p = gsap.utils.clamp(0, 1, Math.abs(dx) / (innerWidth*0.55));
  updateScrub(sc, p * 0.62);                               // preview only — never past 62%
}, {passive:true});

stage.addEventListener('pointerup', e=>{
  if (!sc){ st=0; return; }
  const dx=e.clientX-sx, dt=performance.now()-st;
  const v = Math.abs(dx)/dt;                                // px per ms
  const commit = Math.abs(dx) > innerWidth*0.22 || v > 0.45;
  endScrub(sc, commit);
  if (commit) World.goTo(SLIDES[S.idx + sc.dir], false);
  sc=null; st=0; axis=null;
});
```

Three deliberate choices, following Rauno Freiberg's distinction between distance-triggered and
release-triggered gestures:

1. **The preview is distance-driven** (the slide moves under your thumb immediately) but
2. **the commit is release-driven** (nothing changes state until you let go) — because navigation
   is a destructive-ish action and mid-gesture commits produce accidental slide changes.
3. **The preview caps at 62%**, so a half-swipe never looks like a completed transition. The
   presenter always knows whether they committed.

`touch-action` matters: `.stage{ touch-action: pan-y }` (horizontal is ours, vertical is the
browser's), `.notes__body, .overview{ touch-action: pan-y }`, `.viz .units{ touch-action: manipulation }`.

Also: `<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">`
and **no** `user-scalable=no` — pinch-zoom is an accessibility feature and this deck will be read
on a phone by people who need it.

### 7.5 Deep linking

```js
function readHash(){
  const h = location.hash.replace(/^#\/?/,'');
  if (!h) return 0;
  const byId = SLIDES.findIndex(s=>s.id===h);
  if (byId >= 0) return byId;
  const n = parseInt(h,10);
  return Number.isFinite(n) ? gsap.utils.clamp(0,SLIDES.length-1,n-1) : 0;
}
addEventListener('hashchange', ()=>{ const i=readHash(); if (i!==S.idx) go(i); });
function writeHash(i){ history.replaceState(null,'', `#/${SLIDES[i].id}`); }
```

- `#/hiring` and `#/12` both work; ids are stable and human — they are already in `data.js`.
- **`replaceState`, not `pushState`.** A 31-entry history stack means the browser Back button
  becomes a second, worse Prev key and the user can never leave the page. Slide navigation is not
  navigation.
- Query flags, read once at boot: `?notes` opens the notes panel, `?projector` sets
  `data-contrast="high"`, `?overview` opens the grid, `?nogl` forces the WebGL fallback (useful for
  testing on the actual classroom machine before the talk).
- Six shareable per-presenter links for rehearsal: `#/cover #/method #/hiring #/welfare
  #/discipline #/swot` — one per block, generated from `slide.handover === true` plus slide 0.

### 7.6 Advancing faster than the animation

Covered mechanically in §4.5. Stated as behaviour, because this is the one that will actually
happen on the day:

| Situation | Behaviour |
|---|---|
| 2nd click < 260 ms after the 1st | current transition snap-completes; new one runs at **2.4×** (≈480 ms) |
| Δ index > 2 (overview click, deep link) | transition at **3.2×**, `World.goTo(…, instant)`, diagram timelines `progress(1)` |
| Click during the *camera* flight (which is longer than the overlay) | fine — the overlay is already idle; the camera simply retargets. `world.js` calls `gsap.killTweensOf(rig)` before its own tween, so there is no compounding. |
| Key held down | ignored (`e.repeat`) |
| Click while a panel is open | the panel consumes it |

The invariant to test: **after any sequence of inputs, `document.querySelectorAll('.slide').length
=== 1` and that slide has no inline `opacity`/`transform` residue.** Assert it in a dev-only
`setInterval` during rehearsal.

### 7.7 Other edge cases worth 10 lines each

- **Resize / projector hot-plug.** `resize` → `World.resize()`, re-split lines on the active slide
  only, debounced 140 ms. Guard with `if (S.busy) return` and re-run after the timeline completes.
  A projector plugged in mid-talk changes both the resolution *and* the aspect ratio; because the
  type scale is `--u`-driven this needs no breakpoint work, only a re-split.
- **Tab away.** `document.visibilitychange` → `World.pause(true)` and `gsap.globalTimeline.pause()`.
  Resume on return. Saves the laptop battery during the Q&A.
- **Print / PDF export.** `@media print{ #world,.grain,.chrome,.wash{display:none} .slide{
  position:static!important; page-break-after:always; opacity:1!important; transform:none!important }
  .ln__i{transform:none!important} }` plus a `?print` flag that mounts all 31 slides at once. The
  group will be asked for a PDF; this takes 15 minutes and saves an evening.
- **Missing image.** `img{ background:var(--paper-sunk) }` and an `onerror` that swaps in
  `assets/img/brand-card.webp`. Never a broken-image glyph on a projector.
- **Font load failure.** `font-display:swap` on the text faces; `block` on the wordmark only
  (100 ms block, then fallback). The fallback stacks are specified in §2.1 and are metrics-close.
- **The 8-second rule.** If `document.fonts.ready` and `World.init` have not both settled within
  8 s, drop the gate anyway with `data-webgl="off"`. Never leave a presenter looking at a spinner.

### 7.8 Performance governor

```js
let frames=0, t0=performance.now();
function sample(){
  frames++;
  const dt = performance.now()-t0;
  if (dt > 3000){
    const fps = frames*1000/dt;
    if (fps < 34) document.documentElement.dataset.perf = 'low';
    frames=0; t0=performance.now();
  }
  requestAnimationFrame(sample);
}
```
`data-perf="low"` drops `backdrop-filter` (§3.6), stops the grain animation, and reduces the
`units` stagger. Sample only while idle, and never demote back to normal mid-presentation —
flip-flopping visual quality is worse than being consistently a bit plainer.

---

## 8. Ten details that make it memorable

Each is under 25 lines of code and each is visible from the back of a room.

**1. The wordmark's dropping dot.** On the cover, the `i` in *PizzaBurg* is rendered with its
tittle removed (`text-indent` trick is fragile — instead split the wordmark into
`Pizza<span class="mark-i">ı</span>Burg` using the dotless ı, U+0131, and absolutely position a
`--red` disc above it). The disc falls in from `y:-120px` with `back.out(2.4)` over 520 ms,
overshoots, and settles — 140 ms *after* the rest of the title has finished. The deck's first
sound-free punchline.

**2. The handover baton.** When the presenter changes, a 7px ink dot appears at the end of the
outgoing segment, slides across the joint into the incoming segment over 620 ms
(`power2.inOut`), and dissolves — while the incoming segment's colour cross-fades from grey to
that presenter's hue over the same 620 ms. Six students, six visible hand-offs. The jury will
notice this because it solves a problem every group presentation has.

**3. Numerals that count.** Any `.stat-v` whose text is a bare integer ≤ 1000 counts up on entry:
```js
tl.from(node,{textContent:0, duration:.9, ease:'power2.out',
              snap:{textContent:1}, onUpdate(){ node.textContent = Math.round(this.targets()[0].textContent) }},.2);
```
Applies to `22 outlets`, `~1,000 workers`, `60 days`, `8 questions`. Only on first view — store a
flag so scrubbing back does not re-roll it (that would be a tic, not a delight).

**4. The one red kitchen.** Among the 22 unit tiles, Mirpur is red and breathes on a 3 s
`sine.inOut` yoyo at `scale 1 → 1.035`. Nothing labels it. On the *next* slide the presenter says
"it started with one shop", and half the room has already worked out which square that was.

**5. Risograph misregistration.** Every amber fill in the deck is offset by `0.5px, 0.5px` from its
ink outline and set `mix-blend-mode: multiply`:
`.fill-amber{ transform:translate(.5px,.5px); mix-blend-mode:multiply }`. One line. It makes the
diagrams look printed rather than rendered, which is exactly the register a warm-paper deck wants.

**6. A cursor that respects the world.** A 9px ink ring, `mix-blend-mode:multiply`, driven with
`gsap.quickTo(el,'x',{duration:.14,ease:'power3'})` — not a rAF lerp. It scales to 30px and picks
up `--accent` over anything interactive, collapses to 4px over text. Hidden entirely on
`(pointer:coarse)` and while the chrome is auto-hidden. It exists to make the *presenter's* cursor
legible on a washed-out projector, which is a real problem, and it happens to look expensive.

**7. Droplets that keep falling.** The `leak` diagram's three droplets loop for as long as the
slide is up (§5.8). Most decks freeze once the entrance finishes; a diagram that is still *doing
something* 90 seconds in reads as alive. Exactly one diagram gets this, so it stays special.

**8. A help sheet that answers back.** Open `?`, press any key, and that key's `<kbd>` depresses
(§6.7). It turns the shortcut list into an input tester — the presenter can confirm what the
borrowed clicker actually sends, on the actual machine, in the ten seconds before they start.

**9. The split-flap counter.** The slide number rolls like a departure board: two stacked digits in
a 1em `overflow:hidden` box, `yPercent 0 → -100` over 220 ms `power3.out`, direction mirrored on
reverse navigation.
```js
function rollCounter(n){
  const box=document.querySelector('.counter__roll'), old=box.firstElementChild;
  if (old && +old.textContent===n) return;
  const d=document.createElement('span'); d.className='counter__d'; d.textContent=n;
  box.appendChild(d);
  const dir = n > (+old?.textContent||0) ? -1 : 1;
  gsap.fromTo([old,d],{yPercent:(i)=> i? -dir*100 : 0},
    {yPercent:(i)=> i? 0 : dir*100, duration:.22, ease:'power3.out',
     onComplete:()=>old?.remove()});
}
```

**10. The closing FLIP.** On the final slide, the six presenter dots that have lived in the
progress rail for eighteen minutes fly out of it and land as the six avatars in the team grid.
Hand-rolled FLIP, no plugin:
```js
const rects = [...document.querySelectorAll('.rail__seg')].map(s=>s.getBoundingClientRect());
[...document.querySelectorAll('.team__av')].forEach((av,i)=>{
  const a = av.getBoundingClientRect(), b = rects[i];
  gsap.from(av,{ x: (b.left+b.width/2) - (a.left+a.width/2),
                 y: (b.top +b.height/2) - (a.top +a.height/2),
                 scale: .18, autoAlpha:0,
                 duration:.9, ease:'power3.out', delay:.1 + i*.06 });
});
```
The rail's own segments fade to 30% as the dots leave. It costs eleven lines, it lasts one second,
and it is the last thing the room sees.

**Runners-up, if there is time:** the `.plate`'s top-edge highlight tracking the pointer by ±1.5%
of its width (`background-position`, compositor-only); the kicker's 2px accent rule drawing in from
0 width over 260 ms before the title moves; `::selection{ background: color-mix(in srgb,var(--amber)
55%,transparent); color:var(--ink) }` so even highlighting text is on-brand.

---

## 9. Build checklist

- [ ] Tokens block pasted verbatim; **no hex literals anywhere below `:root`**
- [ ] `--u` verified at 1920×1080, 1280×800, 1024×768, 390×844
- [ ] Contrast ledger re-run if any colour changes
- [ ] `font-variation-settings` sets `opsz` **only**; `font-weight` left to the cascade
- [ ] `font-synthesis:none` present
- [ ] Exactly one `.slide` in the DOM after any input sequence
- [ ] `gsap.context().revert()` on every teardown; no `clearProps` by hand
- [ ] `PageUp` / `PageDown` / `F5` / `.` handled (borrow a clicker and test)
- [ ] `prefers-reduced-motion` verified by toggling the OS setting live, not by a devtools emulation
- [ ] WebGL fallback verified with `?nogl`
- [ ] Print stylesheet produces 31 readable pages
- [ ] Rehearsed once on the actual classroom projector with the lights on

---

## 10. Techniques borrowed, and from where

Cited by technique, not by vibe.

| Technique used here | Source | Where it lands |
|---|---|---|
| Strong custom ease-out `cubic-bezier(.23,1,.32,1)`; "never ease-in on UI"; 30–80 ms group stagger; UI motion capped ~300 ms; `transform`/`opacity` only; 2px blur to mask a crossfade; interruption must retarget from the current state, not restart | Emil Kowalski, *review-animations* standards (animations.dev) | §0 tokens, §4.2 duration table, §4.4 exit blur, §4.5 snap-complete-then-restart |
| iOS drawer curve `cubic-bezier(.32,.72,0,1)` | Ionic / Vaul, via the same standards doc | §6.6 notes sheet |
| Distance-triggered *preview* vs release-triggered *commit* for gestures; momentum/velocity retention; a gesture must stay reversible until release | Rauno Freiberg, *Invisible Details of Interaction Design* | §7.4 swipe: 62% preview cap, commit on `pointerup`, velocity threshold 0.45 px/ms |
| Fitts's-law corner/edge targeting; enlarging the interactive bound beyond the visual bound | same | §6.2 rail segments grow 4→7px on hover; `.tool` 34px hit area on a 14px glyph |
| Line masking with `overflow:hidden` + `yPercent`, and `clipPath:'inset(100% 0 0 0)'` line reveals | GSAP SplitText line-reveal demos; Codrops *From Shader Uniforms to Clip-Path Wipes* | §4.3 splitter, §4.4 both variants |
| `pathLength="1"` + `strokeDashoffset` to draw an SVG path without measuring it | standard SVG technique, used across Codrops GSAP tutorials | §5.2 timeline, §5.15 loopviz, §5.28 drift |
| `overwrite:'auto'` on tweens; `gsap.context()` + `revert()` for guaranteed teardown; `timeScale()` rather than pause-toggling to change speed; `easeReverse` so `.out` eases stay `.out` in reverse | GSAP 3 docs + Codrops *7 Must-Know GSAP Tips* | §4.1 R1–R3, §4.5 governor, §4.6 scrub |
| Scrim technique: a semi-opaque layer between an image and text to pin the effective background colour, tested against the *lightest* pixel the text can land on | Smashing Magazine, *Designing Accessible Text Over Images* | §3.1 plate, §3.2 wash, §0.1 worst-case ledger row |
| `backdrop-filter` forces a multi-pass readback of the content behind the element, and is pathological when that content changes every frame | MDN `backdrop-filter`; W3C FXTF discussion of large-radius backdrop cost | §3 rejected approaches, §3.6 chrome-only, §7.8 governor |
| `paint-order: stroke fill` to give HTML text a hard outline that preserves the letterform, instead of a blur | SVG/CSS text painting; used widely for map labels | §3.4 glyph halo |
| Optical-size axis swaps structure (contrast, x-height, spacing, width), so one `opsz` cannot serve a 34→92px ramp | Pixelambacht, *Optical size, the hidden superpower of variable fonts*; Fraunces (Undercase Type) axis notes | §2.3 `opsz` table |
| `WONK` is display-only and is disabled below ~18px upstream; `SOFT` reaches the rounded forms of the optical minimum without the rest of the small-size treatment | Fraunces project README | §2.4 |
| `O` for overview, `.` / `B` for blank, arrow-key-only clickers, `PageUp`/`PageDown` + `F5` + `Esc` from Logitech-class remotes | reveal.js keyboard docs and remote-control notes | §6.4 |
| `content-visibility:auto` + `contain-intrinsic-size` to make a 31-card grid open instantly | Chrome performance guidance | §6.5 |
| `text-wrap: balance` (≤6 lines in Chromium) for headlines, `pretty` for prose; `text-box-trim: trim-both cap alphabetic` to kill half-leading | MDN + Chrome for Developers, *CSS text-box-trim* | §2.2 |
| Camera-spline flythrough with content beats landing *before* the camera settles | the recurring Awwwards 2026 pattern (scroll-driven camera paths with per-checkpoint content reveals) | §4.2 — overlay done at 1.15 s inside a 1.05–2.5 s flight |
| Shared surface noise over both the WebGL output and the DOM so the layers read as one material | risograph/print emulation, common in Codrops demos | §3.5 grain, §8.5 misregistration |
