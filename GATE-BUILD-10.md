# GATE, Build cycle 10: switchable cursor companions, drawing tokens, packed backups

**Run.** AUSTIN-PROMPT-V2, after Muse accepted GATE-BUILD-9. Citations follow Muse's rule: each tag was checked against the skill's own text in the attached pack, read in this thread (quoted below). Severity follows the S1458 scale.

**Deliverable.** `siding/brand-v2/site.html` (1.77 MB, down from 2.06 MB; 105 backups, packed).

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Findings and fixes

| # | Finding (how found) | Severity (S1458) | Fix | Citations (rule → how it is met) |
|---|---|---|---|---|
| 1 | **The addendum asks for "a cursor that is an animated SVG companion (flawless states, clean touch disable, 2–3 switchable variants)". The site shipped one.** B (corner bracket) and C (lap chip) existed only on the Phase 2 board, where I had rejected them. The addendum outranks that pick. Found by re-reading the addendum against the build. | Major (an addendum requirement unmet) | All three variants are in the site: **A course tick** (default), **B corner bracket**, **C lap chip**, plus **Off**.<br>• **The switch:** a named radio group, "Cursor companion", in the footer beside Pause animations. It shows only with a fine pointer and arrow keys move within it. The choice is remembered per visitor (localStorage, wrapped in try/catch; it falls back to A).<br>• **One companion at a time:** never three cursor objects. The system cursor is kept; the companion takes no pointer events, is hidden from assistive tech, moves by transform only, and snaps under reduced motion.<br>• **On touch:** neither the companion nor the switch exists (tested with a touch device profile).<br>• **C fixed while porting:** landing above a target put the chip over the line of text above it. It now lands level at the target's leading edge, as the Phase 2 spec says ("lands level").<br>• **Weaknesses recorded in Phase 2 still apply:** B competes with the focus ring and C draws the eye while reading. That is why A stays the default; B and C are the visitor's choice. | Addendum: "2–3 switchable variants". Brief: "cursor + ONE companion — never three cursor objects"; "disables cleanly on touch devices and under reduced motion"; "native cursor preserved". |
| 2 | **The press was not asymmetric.** It jumped straight to 0.92. | Minor | The press eases in and out: **110 ms to 95% on press, 217 ms on release** (measured), about 1:2. | **S0546** oversized-cursor: "Click = asymmetric compress/expand (1:2 ratio reads as a real tap)". Brief: "compress ~0.1s in, release ~0.22s out". |
| 3 | **284 primitive paints inside the construction drawings** (open since cycle 8). Cycle 8 had named the drawing roles after wall parts, so mapping by value would have called a patio post "sheathing". | Minor | The semantic drawing roles are now a **tonal set named by job**: fill-light, fill, highlight, label, ink, line, member, solid, glass, shade, deep (steel-2 to steel-12). All 40 source lines, and the profile samples' gradient stops, now reference roles. The samples' dead `value` parameter was removed; every call used 9. **Drawing primitives: 284 → 0.** Proof of no visual change: a computed-colour diff of 62,616 elements, gradient stops included, against the cycle-9 build: **0 changes**. 20 versions backed up. | **S0071** better-colors: "Semantic tokens name a job …, point at a primitive and are the only tier components reference." |
| 4 | **The layout-shift race came back in about 1 load in 12** after cycle 9's fix. `document.fonts.status` can read "loaded" before faces used only on the just-shown page start loading. | Minor | A deep link now loads every font face explicitly, then scrolls on the next frame. **0.001 in 20 of 20 runs**; the deep link still lands on the form (top 80). | **S0231**: "optimizing for Core Web Vitals (LCP, INP, CLS)". |
| 5 | **The never-delete rule had become a performance cost.** 105 backup `<template>` fragments (411 KB) were parsed on every load, though only reviewers open them. Mobile total blocking time had risen to a median of 128 ms. | Minor | Backups are packed at build time into one inert block (gzip + base64 + JSON, **34 KB**). They are still in the file and never deleted. **`?backups`** decodes them back into the same `<template class="bk">` elements in the same sections. **Verified:** all 105 unpack with content and parent identical to an unpacked build; a normal load builds none. **File: 2.06 → 1.77 MB. Mobile total blocking time: median 128 → 45 ms** (45 / 44 / 87). | **S0231**: "reducing main-thread blocking". Addendum: "Superseded versions to hidden in-file backups, never deleted." Still true. |

## 2. Measured, after the fixes

| Check | Result |
|---|---|
| Companion (`companion.js`) | A, B and C each show only their own part, react over a target, and press to 0.92 and back. The choice survives a reload. Touch: no companion, no switch. 0 errors. |
| Backups (`backups.js`) | Normal load: 0 templates. Packed 105. `?backups`: 105 unpacked, 105 in their own section, 0 empty, 0 errors. |
| Conformance (`lint.py`) | All counts 0, including primitive paints in drawings (284 → 0). |
| Colour diff against cycle 9 | 0 changes across 62,616 elements. |
| Viewport sweep / accessibility tree | 0 findings at 390 / 768 / 1024 / 12 of 12 clean at 1440 and 390. The switch is a named group with named radios. |
| Contrast / keyboard | 1,069 text elements and 624 rings, 0 failures (the footer switch added 60 text elements and 48 rings across page states) / 551 stops, 0 traps. |
| Layout shift | 0.001 in 20 of 20 deep-link runs. |
| Performance | 375 at 4× CPU: total blocking time 45 / 44 / 87 ms, LCP 392–436 ms. 1440: total blocking time 0, LCP 144 ms. |
| Regression | Audit 0 problems; duplicate ids 0; barred terms 0; pinned fit 0 clipped at both heights; reduced motion and deep link correct; Pause, route stop, cursor tick and live region correct. |

## 3. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.8 | +0.1: the companion system is complete as the addendum specified, and the token chain now reaches the drawings. |
| Usability (30) | 8.9 | +0.1: phones block about 80 ms less; the deep link is stable; the companion can be switched or turned off. |
| Creativity (20) | 7.4 | +0.2: two more companion behaviours drawn from the brand's own language (the framed photo, the lapped board). |
| Content (10) | 8.8 | Unchanged. |
| **Weighted** | **8.17** | **PASS.** Every category is at 6 or above. |

**Vetoes: zero.**

## 4. Remaining

1. **`var()` in SVG presentation attributes**, untested outside Chromium. Evidence is in GATE-BUILD-8 §4: a W3C issue reports Firefox and WebKit accept it.
2. **For the firm:** `windows3`'s place (the record says "Maple Run", its URL slug says "alexandria"). The colour list stays flagged, non-blocking.
3. **Companion details from the brief not built:** the companion drifting aside while a section's own animation runs, and the press pivoting on a drawn tip. A has no tip, B and C scale about their own centres. Recorded, not claimed.
4. **A person on a physical phone and tablet, in Safari and Firefox, and with a screen reader.**
