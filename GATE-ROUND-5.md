# GATE: Round 5 — Interactive sequence, Booking + footer, Nav polish

**Date:** 2026-11-03.
**Live order (complete):** header → hero → services → visualiser → windows → reviews → process → **try the job** → On your street → **booking** → **footer**.

Backups stay in the file; to see them, add `?try=b` or `?book=b` to the URL.

## 1. What was built

### Try the job yourself (direction v2 §5: the game idea survives as a horizontal-scroll sequence, one interactive piece per full view)

There are four small jobs from the firm's trades. Each can be done by hand, and each has a keyboard and one-button path. Each finishes with a stamped "Done" and a line on a running tally.

| Piece | Interaction | Real figure |
|---|---|---|
| Nail the missing course | Drag the loose lap board into the gap. It snaps, and four nails pop in. | 431 documented siding jobs |
| Seal the window | Run the caulk bead round the frame with the pointer; it fills only where you trace. | 388 documented window jobs |
| Hang the gutter | Lift the gutter into its hangers. Before: the rain sheets off the eave onto the ground. After: it runs along the gutter to the downspout. | 121 documented gutter jobs |
| Paint the trim | Brush the bare fascia in one of three Sherwin-Williams colours; it is done once about 86% is covered. | 320 documented painting jobs |
| End | A tally of the jobs done, "That was the small part.", and the key CTA | — |

| | **A — pinned: vertical scroll moves the jobs sideways, resting on each (WINNER)** | B — a swipe rail with arrows (backup) |
|---|---|---|
| Why | It is exactly the sideways sequence the direction asks for, and each job is held still while you play it | Fine on its own, but the page already asks for vertical scrolling everywhere else |

### Booking panel (sheet: book now / schedule service as a designed panel)

| | **A — the work-order pad (WINNER)** | B — the lap band with a press button (backup) |
|---|---|---|
| Object | A green-headed work-order pad on a stack of carbon copies | A full-width band of lap boards. The green course carries a round calendar button that sinks when pressed. The boards shift with the cursor. |
| Use | Tick the trades (9) and a time (the locked hours). The list builds as you go. **Book online** or **Call**. Trade chips elsewhere on the page (Gutters, Patio covers…) tick their trade here. | One press to the booking page |
| Honesty | "Nothing is sent from this page. Mention your list when you book or call." | — |
| Both | A live **open / closed now** line in Austin time, computed from the locked hours | same |

### Footer (sheet: the stacked-course footer)

- Six board-and-batten columns stand on a concrete sill, with a small house at the end.
- Columns: Contact, Hours, Services, Area, About, Credentials.
- Each board lifts on hover.
- Every lock is verbatim: phone, email, address, hours, Since 2009 / merged 2018, GAF Master Elite, James Hardie Elite Preferred, President's Club 2025, Andersen Certified Premier, BBB A+.
- The sill carries the cursor-companion switch and Back to top.

### Nav polish

- **Phone menu sheet.** Header 4's "Menu" end now opens a real sheet: all sections, Book, Call and the hours. It is a modal dialog with a focus trap. Escape closes it and focus returns to Menu. Background scroll is locked. Picking a link jumps there and closes the sheet.
- **Scroll-spy.** The header item for the section in view is marked (`aria-current`): Siding over services, Windows over windows, Our work over the street board.
- **"Our work"** now goes to On your street (it pointed at nothing before).
- **Cursor companion** (completion standard):
  - **Variants:** three animated SVG companions (Board, Nail, Swatch) plus Off, switchable in the footer and remembered.
  - **Movement:** each rides beside the native cursor on a lagged spring and leans with its speed. The native cursor is never replaced.
  - **Per-element reactions:**
    - grows over controls;
    - shows a lime **Book** label over booking buttons and **Call** over phone links;
    - shows **Drag** over the draggable board, gutter and photo deck;
    - the Swatch variant picks up the colour of any swatch it passes over;
    - dims over the interactive stages;
    - **disappears** over the paint and caulk boards and text fields, so it never covers precise work.
  - **Click state:** a squash on press.
  - **Touch / coarse pointers:** never created, and the switch is hidden.
  - **Reduced motion:** Off unless the visitor turns it on.

## 2. Audit (Playwright, 1440 × 900 and 390 × 844 touch)

| Check | Result |
|---|---|
| Games, desktop and phone | Board, caulk (hand-traced), gutter (dragged) and paint (button path): all four won. The tally reads "All four done." |
| Work order | Siding + Windows + Sat → "Your list: Siding, Windows · Sat 8–6"; a Gutters chip in services ticks Gutters |
| Companion | Over the hero CTA: "book"/"Book". Over the paint board: hidden. Over the gutter: "Drag". Press: squash. Nail/Off/Swatch switch works and persists through a reload. |
| Phone | No companion and no switch. The menu opens with focus on Close; Escape closes it; a link jumps and closes it. |
| Scroll-spy | Windows section → "Windows"; street board → "Our work" |
| Keyboard into sideways tracks | Focusing a button on job 3, the end card, or the services roofing / windows slides lands on that slide in view (see defect 1) |
| Errors / sideways scroll | 0 / none |

### Defects found and fixed

| # | Defect | Fix |
|---|---|---|
| 1 | **Focus or `scrollIntoView` inside a pinned sideways track scrolled the hidden-overflow container itself.** This shifted the whole sequence; it was found when the companion's reactions read the wrong element. It also affected the services sequence. | `overflow: clip` on both pins (not scrollable by focus). Focus inside a slide brings the page to that slide's resting view. |
| 2 | Work-order legends sat on the fieldset border, over the green header | Legends floated into the flow |
| 3 | End-of-sequence card was a big empty box | A ruled "Jobs done" tally in display type |
| 4 | Rain too faint to read | Stronger drops |
| 5 | Footer email clipped in its column | Wraps anywhere |
| 6 | Header "Our work" pointed at `#work` (nothing) | → `#area` |
| 7 | Phone "Menu" pointed at `#menu` (nothing) | A real menu sheet |

## 3. Scorecard

PASS = weighted ≥ 7.0, no category < 6.0, zero vetoes.

| Version | Design 40 | Usability 30 | Creativity 20 | Content 10 | Weighted | Verdict |
|---|---|---|---|---|---|---|
| **Try the job A** | 8.0 | 8.0 | 8.8 | 8.0 | **8.16** | **PASS — live** |
| Try the job B | 7.6 | 8.0 | 8.4 | 8.0 | 7.92 | Backup |
| **Booking A** | 8.0 | 8.4 | 7.6 | 8.8 | **8.12** | **PASS — live** |
| Booking B | 8.2 | 7.8 | 8.0 | 7.4 | 7.96 | Backup: bold, but carries less |
| Footer (one version) | 8.0 | 8.4 | 7.8 | 9.0 | 8.18 | PASS |
| Nav polish | 8.0 | 8.6 | 8.0 | 8.0 | 8.18 | PASS |

**Vetoes:** none.

## 4. Screens

In `siding/redo/site/gate/`:
- `r5-sequence-1440.jpg`
- `r5-sequence-390.jpg`
- `r5-cta-footer-1440.jpg`
- `r5-cta-footer-390.jpg`
- `r5-nav-companion.jpg`
