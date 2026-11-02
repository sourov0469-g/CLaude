# Territory selection (Phase 1), decision record under S1472 concept-selection

**Decider.** Me, in this thread, as the brief assigns. Muse reviews it at the gate and may overturn it.

**Disclosure (S1472: "criteria written afterwards describe the option you already preferred").** I already leaned toward T1 before writing these criteria. That lean is noted in PROGRESS-V2.md as a plan, not a decision. Two countermeasures:
- The thresholds below come from the brief's own logo-gate tests, not from T1's strengths.
- T1 is scored on its worst evidence: on the territory board, its prototype read as a "list icon" at 16 px.

## Criteria, fixed before comparison

### Thresholds (fail one and the territory is out)

| # | Threshold | Source | How it is tested |
|---|---|---|---|
| H1 | The idea holds in pure black on white and pure white on black, with no tint, gradient or second tone. | v2 brief; S0444 | Render the prototype black-only and white-only. |
| H2 | The idea can close at 16 px: either the mark itself or a simplified 16 px variant. | v2 brief; S1422 | Look at the 16 px render. Does the idea read or merge? A territory fails only if no simplified variant could carry the idea. |
| H3 | The territory needs no fact outside the lock. | Facts lock; Muse correction 3 | Read the board's copy against the lock. |
| H4 | There are 3 or more differences from its exemplar, and its exemplar is IN under annex v3. | S1307; annex v3 | Run the distance check on the card, then check the annex. |

### Trade-offs (scored 1–5, weighted)

| # | Trade-off | Weight | Fails when | Source |
|---|---|---|---|---|
| W1 | **Ownability:** a rival Austin siding firm could not use this idea without being seen to copy it. | ×3 | The idea is the category default: roof chevron, house outline, generic tool. | S0609, question 5 |
| W2 | **Identifiability:** shown only the mark, a stranger can name the trade (exterior work: siding, walls), not just "home services". | ×3 | The mark could belong to any trade, or to software. | S0659 |
| W3 | **Carrying thread:** the territory gives one drawn element that can run through the pages, the course line the brief asks for. | ×2 | The drawn element can only sit in a badge. | v2 brief (the course line laying itself); S1424 |
| W4 | **Motion:** the animation is the trade's own action, it fits in 700 ms with one prominent mover, and it uses only composite properties or a dashoffset draw-on. | ×1 | The motion is decoration (a spin, a pulse). | S1436, S0083, S0407 |
| W5 | **Room for 3 concepts:** three resolved concepts, each by a different S0609 method, fit inside the territory. | ×1 | Only one way of drawing it exists. | v2 brief; S1474 |

The maximum score is 50.

## Application (evidence from `phase1-territories.html` and its screenshots in `shots/`)

### Thresholds

| Territory | H1 black-only | H2 16 px | H3 lock | H4 distance |
|---|---|---|---|---|
| T1 The Profile Cut | Pass: solid wedges and bars | **Conditional.** The prototype reads as a bullet list at 16 px (wedges become dots, shadow lines become rules). The concepts must fix this, and a solid or continuous form can. | Pass | Pass: Scout, 4 differences |
| T2 Wall Order | Pass | **Weak.** Four skewed planes with slots blur into one parallelogram at 16 px; the layering, which is the idea, disappears. A 2-plane variant would lose the "order". | Pass | Pass: Dropbox, 4 differences |
| T3 The Record | Pass | Pass: at 16 px the 7×7 dots close into a house shape. | Pass. It uses only the locked wording "312 on the map with photos + 574 more counted". | Pass: Cash App, 4 differences |

T2 survives the thresholds only narrowly. A 2-plane 16 px variant is possible, but it no longer says "assembly order".

### Trade-offs

| | W1 own ×3 | W2 identify ×3 | W3 thread ×2 | W4 motion ×1 | W5 room ×1 | Total /50 |
|---|---|---|---|---|---|---|
| T1 Profile Cut | 3: the lap profile is the trade's own drawing, but other siding firms could draw boards too | 4: the courses and shadow lines say siding | 5: the course line *is* the profile's shadow line, so it can run across every page | 5: courses hang top-down, which is how a wall is laid | 4: line, monogram and container methods all fit | **9 + 12 + 10 + 5 + 4 = 40** |
| T2 Wall Order | 2: an exploded layer stack is a common software motif | 2: reads as "layers" or "stack" (software) before it reads as a wall | 3: the planes can divide sections but don't make a line | 4: planes seating in order is a real action | 3: little beyond planes | **6 + 6 + 6 + 4 + 3 = 25** |
| T3 The Record | 4: the dot is the firm's own map unit, which no rival has | 3: a house shape says "home", not siding | 3: the dot field is a strong section background, not a thread | 4: dots lighting up in job order | 3: dot-built forms only | **12 + 9 + 6 + 4 + 3 = 34** |

## Decision: T1 The Profile Cut

### What the winner costs

- **Ownability.** T1 scores 3 on ownability, against T3's 4. A lapped-board drawing is available to any siding firm; the firm's own map dot is not. The concepts must earn ownability through the specific way the profile is drawn: the cut corner, the shadow line leaving the mark. A generic plank icon would not earn it.
- **16 px risk.** The 16 px "list icon" reading is a known risk. Every concept must pass at 16 px, or ship a 16 px variant that does.

**When to revisit.** If none of the three T1 concepts reaches 3 or above on Haviv's "distinctive" at the gate, reopen T3.

### The rejected territories (S1472: half the output)

**T2 Wall Order**
- **What it was testing:** whether the wall's build order (sheathing, wrap, siding, trim) could be the brand idea.
- **What it lost on:** H2 at 16 px (the layering disappears) and W2 (it reads as software layers).
- **What would bring it back:** a page-level use only. The exploded wall belongs to the wall-assembly chapter on the homepage (section 5, Lusion flow), as a drawing rather than a mark.

**T3 The Record**
- **What it was testing:** whether the firm's own job map, the dot, could be the identity.
- **What it lost on:** W2 (a dot house says "home services", not siding) and W3 (no carrying line).
- **What would bring it back:** T1 failing its 16 px threshold in all three concepts, or a Muse ruling that ownability outweighs trade identification.
- **Where it lives meanwhile:** the map remains a page section (Our work, and the homepage map preview) as the firm's DATA, not as a brand mark.
- **No grafting.** T3's dot is not grafted onto T1 (S1472: never graft losers onto the winner).
