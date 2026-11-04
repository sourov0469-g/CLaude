# GATE-NEW · Financing · V2 "The money map"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 1, section 3 of 7. The Hero and How a job runs gates were accepted by Muse.

The default is unchanged: V1 ("two kinds of money", the owner's pick) stays version 1. Its code is untouched and no backups ship.

**How to see V2:**
- **Header switch.** Use the Financing "1 · 2" switch while the section is in view. On phones it is the "‹ 1/2 ›" stepper.
- **Built page.** `elbaz-homepage.html?financing=2` opens V2 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Lusion** is the primary ("flow; governs the flow maps"). Its flow language is taken: continuous, living connections that show how one thing becomes another. It is rebuilt as a three-column flow map in Elbaz's own colours.
- **Signature move:** the money map.
  - Three columns: what you are building → the financing partners that usually fit → how each is repaid.
  - Living ribbons join them. Pick a project, and its ribbons light and money visibly flows along them to the partners and on to the repayment route. Pick a partner, and the map shows every project it usually fits and how it is repaid.
- **Style family:** an interactive flow map (data visualisation). It is neither cards nor panels.
- **The owner's laws for this section:** visual and creative, never document-like. The text is limited to a one-line answer under the map. The figures sit on the map as big numerals.
- **WEB-SKILLS tags per element:**
  - **Map and ribbons:**
    - S1314 (no card apocalypse: the relations are the design);
    - S0062: stroke offsets and opacity only;
    - S0083: one focal point (the chosen path at full strength, the rest faint);
    - S1426 (proximity: three labelled columns).
  - **Nodes:**
    - S1441: 44px targets;
    - S1018 (keyboard parity: arrows within a column);
    - S1443: tap on touch.
  - **Figures:** S0666 (numerals as the hierarchy's top: 6–132 months, 30 days, 20 years, $250K).
  - **Answer line:** S1425 (text on paper); S0226 (proof by the action: the CTA, reviews, licence and "not a lender" sit with it).
  - **Reduced motion:** S0400 (no flowing dashes, no draw-in; selections switch at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 ("two kinds of money", the owner's pick) is two coloured panels, consumer credit beside property-assessed, with partner rows and a three-way switch. V2 has no panels. The relations themselves are the picture, a map you trace with a finger.
  - **Why it is better.** It answers the visitor's real question ("I am doing X, what can pay for it, and how would I pay it back?") as one visible path, including the honest part: a kitchen does not route to PACE.
  - **Facts and routing.** Every figure and line comes from FACTS.md "Financing". The routing is the same framing already accepted in this file (`ROUTES`, `WHY`).

## What was built
**Files:**
- `remodeling/src/sections/financing.html`: V2 added after V1 in the existing version system (`.ver[data-v="2"]`, prefix `mm__`, checked free across the site).
- `css/sections/financing.css`: a V2 block appended.
- `js/sections/financing.js`: a `2:` definition reusing the section's own data. That data is the partner figures `P`, the project list `PROJ`, the routing `ROUTES` and the firm's reasons `WHY`, plus the shared footer with the CTA, reviews, licence and "not a lender".
- No new claims were introduced. V1 is untouched.

**The three columns:**
1. **What you are building:** Kitchen, Bathroom, Flooring, Roof windows or doors, HVAC or storm protection, Not sure yet. These are pills with drawn icons.
2. **Who usually fits:** the four partners as coloured tiles with the figure as the headline:
   - Synchrony, 6–132 months;
   - Service Finance, 30 days;
   - Ygrene, 20 years;
   - RenewPACE, $250K.
   Consumer credit is clay; property-assessed is ink.
3. **How you repay:** On a card, as revolving credit · In fixed installments · Through your property tax bill.

**The ribbons:**
- One per route, 20 in all: 16 project-to-partner and 4 partner-to-repayment.
- They are measured from the nodes themselves. The same engine draws them left to right on wide screens and top to bottom on phones, and they follow any resize.
- The chosen path is solid, with money flowing along it as moving beads. The rest step back.

**Picking:**
- **A project:** lights the partners that usually fit and how each is repaid. Picking Kitchen shows no PACE route, the honest answer.
- **A partner:** lights every project it usually fits and its repayment route.
- **How:** click, tap, mouse hover or keyboard focus.
- **Keyboard:** each column is one Tab stop (roving); arrows move within it, Home and End go to the ends.

**The answer** (a live region, one line under the map):
- for a project: the project, the partners, and the firm's reason (`WHY`);
- for a partner: what it is, how you repay, and what it also publishes, with its source attribution.

**Below the map:** the section's footer as in V1: Book a consultation, 4.8 · 343, the licence, and "Elbaz Construction is not a lender…".

**Arriving:** the columns rise, then the ribbons draw from the first column on.

**Reduced motion:** no flowing and no draw-in; picks switch at once.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Financing V2** | **8** | **8** | **8** | **9** | **8.1** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.6 + 0.9 = 8.1.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **Visual, not document-like** (the owner's law): the answer is drawn as a lit path and the figures are numerals on the map. The only prose is one line under it.<br>**One colour system** carried from V1: clay for consumer credit, ink for property-assessed.<br>**Focal point (S0083):** the chosen path solid, the rest at 8 to 14%.<br>**Phones:** stepped-back cards stay opaque, so a ribbon never shows through a card. Column labels sit on paper, so ribbons pass behind them.<br>**Height:** 950px at 1440 and 940px at 1024, about one screen. | On phones the map runs to about 1.8 screens (1412 to 1488px), because three stacked columns plus the CTA and the not-a-lender line need the room; there is no pin, so it reads as a normal scroll. On tablets (768) the three columns are narrow and some labels wrap to two lines. |
| **Usability 8** | **Logic verified for every pick:**<br>• Kitchen → Synchrony and Service Finance → card and installments;<br>• HVAC → Service Finance, Ygrene and RenewPACE → installments and tax bill;<br>• Not sure → all four → all three routes;<br>• Service Finance → its 5 projects → installments.<br>**Keyboard (S1018):** arrows, Home, End and Tab between columns, verified.<br>**Geometry:** all 40 ribbon ends land on their nodes at 1440, 768 and 390 (measured: 0 off-node).<br>**Targets (S1441):** at least 44px; 0 text under 13px at 360 to 1440; 0 overflow; 0 errors. | Hover-to-preview on desktop changes the answer as the pointer passes over pills; it is quick, but a careful reader might prefer click-only. The repayment nodes are read-only, so you start from a project or a partner. |
| **Creativity 8** | A move the site did not have: the money shown as a flow you can trace, with beads moving along the chosen route. It is a genuine data-visualisation answer to a financing question, the owner's "visual and creative". | The flow is 2D ribbons. A more cinematic Lusion-style treatment (depth, particles) was held back for weight and legibility. |
| **Content 9** | **Facts verbatim:**<br>• every figure and unit is the partners' own as the firm publishes them: 6–132 months, 30 days, 20 years, $250K and 20% of property value;<br>• the NMLS attributions appear in the partner answers;<br>• "Florida PACE. Not a loan.", the soft credit pull, and "no application fee".<br>**The routing and reasons** are the same `ROUTES` and `WHY` already accepted in this file; "a kitchen remodel is generally not one of them" is kept.<br>**By the action:** "not a lender" sits with it. No $0-down promise for a kitchen. Locks **0 fails**; outside links **0**. | The heading "Your project. Its kind of money." and the lead line are my wording. Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V2 at 1440, 1024, 768, 414, 390 and 360, reduced motion, the single file);
- no images involved;
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **On phones the ribbons drew over the cards.** The columns' z-index had no effect because they were not positioned. Fixed: the columns are positioned above the ribbon layer; the ribbon measurement walks the offset chain, so the geometry is unchanged.
2. **Stepped-back partner tiles were 28% opaque,** so ribbons showed through them on phones. Fixed: stepped-back tiles are opaque tints (a clay or ink wash on paper).
3. **The answer's label rendered at about 12px.** The display face is size-adjusted to 74%. It was raised so it reads as a label.
4. **"Florida PACE. Not a loan.." had a double full stop** where the partner's own line already ends in one. Trimmed.
5. **The layout direction was guessed from the map width (760px)** while the CSS switches at the viewport width, which could disagree at tablet widths. It now reads the actual grid (one column means top-to-bottom ribbons).
6. **The column numbers were 12px.** Now 13px (a 24px badge).
7. **On phones a ribbon crossed the "Who usually fits" label.** The labels sit on paper, so ribbons pass behind them.
8. **Animation dependency.** The answer's swap animation borrowed a keyframe from another section; V2 now has its own (`mm-in`).

## Defects remaining (honest)
- **Phone length:** about 1.8 screens. The three stacked columns need it; a horizontal swipe map would be shorter but would hide the answer path.
- **Tablet (768):** narrow columns; some pill labels wrap to two lines.
- **Desktop hover preview** changes the answer as the pointer crosses the pills.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Lusion, primary)
- **Transferred:**
  - flow as the organising idea: things visibly becoming other things;
  - continuous living connections (moving beads on the chosen path);
  - a calm field with one lit route.
- **Not transferred:**
  - WebGL or particles;
  - 3D scenes;
  - full-screen takeovers;
  - sound;
  - Lusion's own visual identity.
- **Other annex entries:** none were used as references for V2. The site-wide easing language is unchanged.

## Comparison with the section's previous best (V1, "two kinds of money", the owner's pick)
| | V1 · two kinds of money (default) | V2 · the money map |
|---|---|---|
| **Composition** | Two coloured panels side by side, with an "or" between, and a three-way switch | Three labelled columns joined by ribbons |
| **The answer** | Dims the panel that does not fit ("inside the home" or "outside and energy") | Draws the exact path for your project: which partners, and how each is repaid |
| **Granularity** | Two buckets | Six projects, four partners, three repayment routes |
| **Interaction** | A three-way switch | Pick any project or partner (tap, click, hover, keys); a moving flow on the chosen path |
| **Where V1 still wins** | Shorter on phones, and the two-kinds idea is instantly clear | V2 needs a moment to read three columns |

**My call:** V2 is a genuine challenger. It is the most visual answer this section has had, and the only one where the honest "a kitchen is not a PACE project" is something you can see. V1 is the quicker read. The defaults are not changed; the owner picks.

## Evidence (`qa/new/financing/`)
- `v2-1440-kitchen-roof-ygrene.jpg`: Kitchen (default), then Roof, windows or doors, then the Ygrene partner, at 1440.
- `v2-390-states.jpg`: a 390 phone with Kitchen, Roof, Ygrene, and the lower half with the answer and the action.
- `v2-768-kitchen-ygrene.jpg`: the tablet.
- `v2-single-file.jpg`: V2 picked through the header switch inside the delivered single HTML file at 1440 and 390, with the not-a-lender line in place.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
