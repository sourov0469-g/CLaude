# Hero rebuild: asset request for Muse (owner's ruling: Muse supplies the layers)

**The verdict:** the first two heroes were "very very bad: not even close to the references". The owner wants the heroes sheet matched exactly.

**The cause:** the sheet's look is photoreal imagery, and code-drawn pieces cannot reach it.

**The ruling:** Muse supplies high-resolution layers; I build the motion around them (torn, assemble, scatter under the cursor, self-repair when it leaves).

**The heroes picked:** 1 (house + pieces), 2 (peeling board) and 3 (exploded house). The protocol asks for two versions; all three will be built as candidates unless one is dropped.

## General rules for every asset

| Rule | Value |
|---|---|
| Format | PNG or WebP with real alpha (transparent background), no baked drop shadow. I add live shadows that move with each piece. Each piece is cropped tight to its edges, with 8 px of transparent margin. |
| Resolution | Sized for a 2× screen: the largest dimension at least 2× its biggest on-screen size, as listed per item |
| Lighting | All pieces lit the same way: soft daylight from upper left, as in the sheet |
| Colour | As in the sheet: steel blue boards (around #4E6F8F to #5A7896), warm cream boards, cedar shakes, dark galvanised nails |
| Sharp masters | Send each piece sharp, without motion blur. I add motion blur in code while a piece moves, so it can come to rest crisp |
| Naming | `h<hero>-<what>-<nn>.png`, e.g. `h1-lap-blue-03.png` |

## Hero 1: "Built for Austin weather" (house + exploding pieces)

1. **`h1-house.jpg`: the house photograph.**
   - Front three-quarter view of a finished home, golden-hour light, landscaping, blue sky, composed as in the sheet.
   - At least 2,800 × 1,600 px.
   - Per direction v2 §9, it must be a genuine photograph: the firm's own, or real stock. If the owner accepts a generated house for this hero, say so explicitly, because that lifts the ban.
2. **Flying pieces, as in the sheet. Each 1,200 px on its long side.**

   | File | Count | Notes |
   |---|---|---|
   | `h1-lap-blue-01..08` | 8 | Steel-blue lap or Dutch-lap panels at different angles and lengths. Visible profile at the cut end; two of them seen end-on |
   | `h1-lap-cream-01..06` | 6 | Cream lap or board-and-batten panels, various angles |
   | `h1-shake-01..06` | 6 | Cedar shakes, singles and a small cluster of 3–4 |
   | `h1-trim-01..03` | 3 | J-channel or trim strips |
   | `h1-nail-01..04` | 4 | Nails, 400 px |
3. **`h1-torn-mask.png`.** Optional, but it makes Hero 1 truly "torn": a mask over the house photo marking about 10–14 regions (siding areas). I lift those regions out of the photo as pieces and put them back on assembly.

## Hero 2: "Modern protection. Clean design." (the peeling board)

1. **`h2-house.jpg`: the house photograph.**
   - Steel-blue board-and-batten modern home, as in the sheet's left panel.
   - At least 1,600 × 2,000 px.
   - Same genuine-photo rule as Hero 1.
2. **`h2-curl-00..23.png`: the curling cream board, as a 24-frame sequence.**
   - From flat (lying over the house) to fully curled and peeled away, exactly as the sheet shows at its end state.
   - Same camera for every frame; each frame 2,400 × 2,800 px with alpha.
   - I scrub this sequence with the cursor: the peel follows the hand, and leaving lays the board back flat.
   - **Fallback, if a sequence is too much:** three key states (flat, half-peeled, fully peeled). I would warp between them with WebGL, which is less faithful.
3. **Floating pieces on the right:** cream and steel-blue lap pieces, cedar shake blocks and nails. The same kinds as Hero 1, about 14 pieces in all, each 1,000 px on its long side.

## Hero 3: "Assembled to last." (the exploded house)

1. **`h3-house-assembled.png`.** The finished house as one image with alpha: steel-blue board-and-batten and cream lap walls, cedar shake roof, framing. Same camera as the sheet, 3,000 px wide.
2. **`h3-part-01..NN.png`: the same house split into its parts.**
   - About 30–40 parts: roof shake clusters, wall panels, battens, trim, corner posts, window frames, the floor platform. Each is a separate transparent layer, cut from the assembled render, so they fit back together exactly.
   - With a **`h3-parts.json`** giving each part's x, y position (and its stacking order) in the assembled image.
   - This is what lets the house assemble on load, explode under the cursor, and rebuild itself.
3. **Extra loose pieces** flying around the house, as in the sheet: blue and cream boards, cedar shakes, nails, about 16 in all, 1,000 px on the long side.

## What I build around them, the same for all three

- **The page:** the sheet's own layout. A large rounded hero card with soft shadow on the cream page; the nav inside the card (logo, Roofing · Siding · Windows · Projects · About, the steel-blue pill CTA); the headline in heavy uppercase sans at the lower left; pieces flying around and over the card edges, as drawn.
- **The motion:** torn on load, then assembling into the sheet's composition (direction v2 §4). The cursor scatters pieces with the water push; they return when it leaves. All of this is GPU-composited transforms on the supplied layers, with live shadows and motion blur only while moving.
- **The facts:** real Austin Pro name and logo (Stacked Lap A) in place of the sheet's "SUMMIT"; phone and booking facts as locked.
- **Headline wording:** the sheet's lines ("Built for Austin weather", "Modern protection. Clean design.", "Assembled to last.") unless the owner prefers the firm's published line.

**Waiting on these assets before building. Nothing will be drawn as a stand-in.**
