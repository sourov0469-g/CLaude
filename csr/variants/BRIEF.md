# Shared brief — CSR deck design-variant comparison gallery

You are building ONE of five parallel visual-direction mockups for a PizzaBurg
Business Ethics presentation (Corporate Social Responsibility). All five will
be placed side-by-side on one comparison page so the client can pick a
direction or mix pieces from different ones ("slide 3 page 4 + slide 6 page
1"). Your job is to build exactly ONE self-contained HTML **fragment** file
implementing YOUR assigned direction across 4 fixed representative pages, so
it can be dropped into that comparison page without clashing with the other
four fragments' CSS.

## Deliverable

Write your fragment to the exact path you're told in your task (something
like `/home/user/CLaude/csr/variants/design-radius.html`). The fragment must
be a single HTML file containing ONLY:

```html
<section class="design-<yourkey>">
  <style>
    /* ALL your CSS, every selector scoped under .design-<yourkey> so it
       cannot leak into or be affected by the other four fragments. e.g.
       .design-<yourkey} { ... }
       .design-<yourkey> .rail { ... }
       Do NOT use bare element selectors like `h1{}` or `.headline{}` —
       always prefix with .design-<yourkey>. Do NOT touch :root or body. */
  </style>
  <div class="d-page" data-page="1" data-label="Title">...</div>
  <div class="d-page" data-page="2" data-label="Current CSR: Community">...</div>
  <div class="d-page" data-page="3" data-label="Suggestion: Green PizzaBurg">...</div>
  <div class="d-page" data-page="4" data-label="Impact & ROI Summary">...</div>
</section>
```

No `<!doctype>`, `<html>`, `<head>`, or `<body>` — just this fragment. No
`<script>` needed (these are static comparison mockups, not an interactive
deck — no click-to-reveal, no nav; everything on each page is simply always
visible, exactly as it would be in the real deck).

## Hard layout contract (so the comparison grid doesn't break)

- Each `.d-page` MUST be exactly `width:100%; aspect-ratio:16/9; position:relative;
  overflow:hidden;` — a fixed 16:9 slide canvas. The parent grid sizes the box;
  you fill it. Do NOT set your own width/height/margin on `.d-page` beyond that.
- Everything inside a `.d-page` must fit inside that box with NO scrolling and
  NO overflow — this will be screenshotted and measured for overflow, exactly
  like the real deck was. Keep text sizes readable but be realistic about how
  much fits in a 16:9 box roughly 960×540 logical px — don't overload a page.
- Minimum font size anywhere: 16px at a 1600px-wide render (use the same
  `clamp()` projector-scale approach as the real deck).
- Use REAL asset paths from the manifest below (paths are relative to
  `/home/user/CLaude/csr/variants/`, i.e. prefix with `../assets/...`).
  Never invent a filename. Use `object-fit:cover` for photos that should
  fill a frame, `object-fit:contain` (with a background color and padding)
  for anything with important edges (posters, logos, screenshots) that must
  not be cropped.
- Use AT LEAST one `<video>` tag somewhere across your 4 pages (muted,
  loop, autoplay, playsinline — it's ambient B-roll of the real outlet/team,
  not a claim that it depicts the specific CSR activity on that slide).
- Use a good number of the real/sourced photos — don't reuse the same image
  twice across your 4 pages.
- Fonts: pick your own Google Fonts pairing (2-3 families) distinct from
  Fraunces/Manrope/JetBrains Mono (used by an earlier, different deck) and
  from IBM Plex Sans/Mono + Libre Caslon Display (used by "The Dossier",
  design 1, which you are NOT building). Do not add `<link>` tags yourself —
  just declare `font-family` with Google Fonts names + a real fallback stack;
  the assembler will load every needed Google Fonts family once, centrally.
  Tell the assembler which families/weights you used by ending your file
  with an HTML comment: `<!-- FONTS: Family One:wght@400;700, Family Two:wght@500 -->`
- No emoji. No `rounded-lg`-everywhere card look, no purple-blue gradient
  hero, no warm-cream-plus-serif look (that's a different, already-shipped
  deck) — commit fully to YOUR assigned direction's own palette/type/motif.

## Content (use verbatim — do not rewrite the copy, only the visual treatment)

**Page 1 — Title**
- Headline: "Corporate Social Responsibility at PizzaBurg"
- Sub: "A Business Ethics case review — Group NEXIX, Bangladesh University"
- Tags: "Group NEXIX", "Bangladesh University", "Business Ethics"
- Team names (small, one line or two): Aditya Tripura · Shuvo Chandra Roy ·
  Asiful Islam Sourov · Raiyan Ahmed Ratul · Fabliha Mubarrat Kabir · Liya Akter

**Page 2 — Current CSR: Community & Philanthropy**
- Headline: "Current CSR: Community & Philanthropy"
- Ramadan — PizzaBurg has provided pizzas to mosques for iftar, reported by Dhaka Tribune.
- Christmas — employees dress as Santa Claus and distribute free pizzas to disadvantaged children, reported by Dhaka Tribune.
- Reading: both fall under Carroll's **philanthropic responsibility** — voluntary contributions tied to a specific occasion.
- Mark both facts as an existing/confirmed "Strength" somehow (tag, icon, color — your call).

**Page 3 — Suggestion: Green PizzaBurg**
- Headline: "Suggestion 2: Green PizzaBurg" — mark clearly as a NEW proposal (e.g. "Recommended" tag), visually distinct from page 2's "existing practice" framing.
- Lede: "100% biodegradable packaging, with a box return/recycling incentive."
- Cost: Moderate upfront — packaging changeover plus incentive design
- Market fit: Over half of Bangladesh's population is under 25 — a segment that responds to visible sustainability moves
- Regulation: Bangladesh has signaled a clear policy direction against single-use plastics — moving early positions PizzaBurg ahead of that trend

**Page 4 — Impact & ROI Summary**
- Headline: "Impact & ROI Summary"
- Four rows, each with Initiative / Cost / Primary Benefit / Priority:
  1. Buy 1, Give 1 — Self-funding, scales with sales — Converts seasonal goodwill into an always-on program — HIGH
  2. Green PizzaBurg — Moderate upfront — Youth-market appeal; ahead of tightening plastic regulation — MEDIUM
  3. Student Support — Low, scalable — Builds a talent pipeline and employer branding — MEDIUM
  4. Food Rescue — Near-zero — Reduces disposal cost; strong reputational story — HIGH
- Closing line: "4 initiatives · near-zero to moderate cost · compounding brand + community return"

Do not fabricate facts, dates, or citations beyond what's given above.

## Asset manifest (all paths relative to `/home/user/CLaude/csr/variants/`)

Real PizzaBurg photos (ours, from an on-site visit — people ARE real
teammates and a real PizzaBurg GM, not stock):
- `../assets/img/team-group.jpg` — Group NEXIX with the PizzaBurg GM
- `../assets/img/team-selfie.jpg`, `../assets/img/team-street.jpg` — group shots
- `../assets/img/outlet-1.jpg` .. `outlet-4.jpg` — real outlet interiors/exteriors
- `../assets/img/sign.jpg` — outlet signage
- `../assets/img/food-wide.jpg`, `../assets/img/food-tall.jpg` — real pizzas on the table
- `../assets/img/dough-hands.jpg` — hands working dough
- `../assets/img/dhaka-street.jpg` — Dhaka street scene
- `../assets/img/card-logo.jpg`, `../assets/img/card-name.jpg` — PizzaBurg business card (real brand mark/red)
- `../assets/img/poster-hiring.jpg` — a real PizzaBurg recruitment poster (contains text/logo — object-fit:contain only, never crop)
- `../assets/img/interview-2.jpg` — real HRM-interview site-visit still

Real PizzaBurg photos found online (verified, from dhakaeats.com, sourced
from Google — genuinely PizzaBurg, not stock):
- `../assets/img/web-outlet-aesthetic.jpg` — a nicely designed PizzaBurg dining room
- `../assets/img/web-outlet-recycle-bin.jpg` — a real PizzaBurg-branded interior shot that includes a red bin labeled "PizzaBurg #Recycle Environment" — genuinely useful for the packaging/environment content
- `../assets/img/web-logo-promo.png` — official PizzaBurg logo + a promotional pizza shot on a yellow background
- `../assets/img/web-combo-meal.jpg` — a plated combo meal on a PizzaBurg-branded plate
- `../assets/img/web-pizza-box.jpg` — a pizza inside a real PizzaBurg takeaway box

Verified stock (for CSR beats no real photo covers — always caption
"Illustrative" if used, never claim it's a real PizzaBurg event):
- `../assets/img/csr-community.jpg` — community food distribution (South Asian, outdoor)
- `../assets/img/csr-packaging.jpg` — biodegradable kraft takeaway packaging
- `../assets/img/csr-food-donation.jpg` — a food-donation hand-off moment

Real video (ours, muted B-roll — outlet visit / team / manager footage, use
as ambient background or an inset clip, not as a claim about CSR events):
- `../assets/video/interview18.mp4`
- `../assets/video/v-manager-2.mp4`
- `../assets/video/v-team-1.mp4`
- `../assets/video/v-team-3.mp4`

Do not reference any other asset path — verify the exact filename against
this list before using it.
