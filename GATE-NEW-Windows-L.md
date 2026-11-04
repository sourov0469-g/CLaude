# GATE-NEW — Windows L, "Lift the sash"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 2, section 4 (GATE-BUTTONS accepted by Muse; this version inherits the button system). Nothing game-like and no configurator: the visitor reveals published before/after photographs.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Windows L, "Lift the sash"** (`?windows=l`) |
| Primary reference (annex v3, one) | **MERSI**: the annex names MERSI's seam as the engineering source for any before/after centrepiece ("the centrepiece mechanism comes from MERSI's seam"; Ever is barred). No Windows version has used MERSI: A–K used Apple ×2, Lando Norris, Graza, Cash App, Quiet Cubes, Cowboy, Scout and Dropbox. |
| Signature creative move | **The seam becomes the window's meeting rail.** The firm's four published window before/after pairs hang as four windows on one lap-sided wall. Each shows the *before* photo. Lift a sash (click, tap, or Enter) and the *after* photo rises from the sill, with a white meeting rail and its sash lock riding the seam, exactly the motion of lifting a lower sash. On hover the sash nudges up a finger's width, as if grabbed. "Lift every sash" raises all four, one after another. Each sill carries the job's record: place, month, what was installed, and the windows-portion price band. |
| Style family | Four framed windows on a lap wall: casing, sill plates, a travelling meeting rail; photography inside, joinery outside |
| Content | The four window pairs published on the firm's windows page (svcpairs.json): Spicewood at Balcones Village, Austin (Mar 2023, NT Windows Twinsulator, $40k–$50k windows portion); Ridgewood, Cedar Park (Jul 2023, NT Windows Twinsulator, $10k–$15k); North Austin (Feb 2025, Simonton DaylightMax, $10k–$15k); Maple Run, Austin (Oct 2025, NT Windows vinyl, $10k–$15k). Each links to its published project page. "388 documented window jobs" is the locked wording. No new claim. |
| How it differs from every existing Windows version | A is morning to midnight, B a bay built out, C a window taken apart and pinned, D an archive of window-job photos, E a unit chart by maker, F how each window opens, G frame colours by maker, H a counter, I reviews in panes, J opening to trim, K counts set in type. None shows a window job before and after, and none uses the window's own motion to make the comparison. |
| Why it is better | It is the only Windows version that proves the outcome: real houses, old windows, then new, with what went in and what it cost. The current best (Windows K, "376 jobs, set in type", 8.58) shows scale. L shows the result, four times, in the motion of a sash. |
| Pairing note (F17) | Hero K also uses MERSI's seam (vertical split, horizontal wipes). If the owner picks Hero K and Windows L together, the page carries two before/after seams; pick one of the two. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the wall of four windows); ⟦S0220⟧ published pairs and records only |
| Window frames (4 buttons) | ⟦S0054⟧ `<button aria-pressed>` with a label naming the place and the action ("Spicewood at Balcones Village, Austin: show the new windows"); ⟦S1427⟧ one treatment; inherits the button system (tile zoom, press, spring, lime ring) |
| Sash lift (after rising) | ⟦S1436⟧ `clip-path` from the sill up, 0.8 s `cubic-bezier(.4,0,.1,1)`, the meeting rail riding the seam; ⟦S1440⟧ the hover nudge (8%) as a feedforward |
| Before / After chip | `aria-hidden` visual chip that rolls its word in sync with the sash (MERSI's synced label) |
| Sill plates | The record in plain type; "See the project" link (inherits the underline wipe) |
| "Lift every sash" | ⟦S0405⟧ a light board button that toggles all four with a 140 ms stagger and swaps its own label ("Lower every sash") |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" |
| Phone | One column of four windows; tap to lift; ⟦S1441⟧ full-width targets |
| Reduced motion | ⟦S0400⟧ an instant swap; the rail jumps to the top; the chip changes |
| Background law | White ground; the wall vignette and windows are `data-solid` |

---

## Build log

**How to view:** `?windows=l` (switcher: Windows, **L "Lift the sash"**).

**Files:**
- `winL()` in `build_site.py`: markup from `svcpairs.json` (windows), with photos re-encoded once at 640 × 400, WebP quality 58.
- `src/sec/win7.js` (`Win7.wire`) and `win7.css`.
- The file grows by 382 KB (eight photos; 20,642,253 bytes).

**The windows:**
- **Frame:** each window is a `<button aria-pressed>` with a 14 px white casing (10 px on phones), a dark reveal and a soft shadow on the lap wall.
- **The seam:** one registered property, `--wlc`, drives both the after photo's `clip-path: inset(var(--wlc) 0 0 0)` and the meeting rail's position, so the rail and the seam can never drift apart.

| State | `--wlc` | What shows |
|---|---|---|
| Lowered | 100% | The rail and its deep-green sash lock rest at the sill |
| Hover, fine pointer | 91% | A finger's-width nudge |
| Lifted | 0% | Full after photo |

- **Motion:** 0.8 s, `cubic-bezier(.4,0,.1,1)`.
- **Chip:** "Before" rolls up to "After", on a lime chip.
- **Label:** the button's spoken label flips between "show the new windows" and "show the old windows".
- **Sill plates:** place; month · "Installed: …"; "Windows portion: …"; "See the project" (inherits the underline wipe). The published before and after alt texts are kept in hidden text for screen readers.

**Lift every sash:**
- A light board button (inherits the label roll and physics).
- It raises all four 140 ms apart and becomes "Lower every sash", re-rolled through `Bx.roll`.
- It stays in step when windows are lifted one by one.

**Inherited from the button system:** tile zoom on hover, press and spring, lime focus ring, keyboard pulse, tap feedback.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-windows-l-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- `-1440-hover` (the nudge), `-1440-lifting` (mid-lift), `-1440-all` (all four lifted), `-390-lifted`;
- contact sheet: `new-windows-l.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Hover nudge | `--wlc` 91% |
| Lift | 36–40% at 330 ms, then 0%; `aria-pressed="true"`; label "Spicewood at Balcones Village, Austin: show the old windows" |
| Lift every sash | All four `true`, button reads "Lower every sash" (`aria-pressed="true"`); again → all `false` |
| Keyboard | Enter on the first window lifts it; the lime focus ring shows |
| Reduced motion | The swap is instant (`--wlc` 0% at 60 ms) |
| Phone tap | Lifted (`true`, 0%) |
| Records | Place, month, installed product, windows-portion band and project link exactly as in `svcpairs.json`; "388 documented window jobs" verbatim |
| Existing versions | 177 slot templates and 8 page templates byte-identical; `<main>` identical apart from the one added `windows:l` template; defaults unchanged (`windows = a`) |

## Defects found and fixed

1. **Weight:** the first build embedded the photos at 720 px, quality 62 (+548 KB). They are now 640 × 400 at quality 58 (+382 KB), sharp at the 2-column display size.
2. **The all-button's label:** swapping its text would have broken the button system's split label. It is now rebuilt and re-rolled through `Bx.roll`.

## Remaining defects, named honestly

- **The pairs are not pixel-aligned** (the before and after were shot from slightly different spots), so mid-lift the rail crosses two slightly different framings. The rail makes the seam explicit, but it is not a perfect match.
- **The photos show whole houses:** they show siding work too. The plates say "Windows portion" for the band, as published, but the eye sees the new siding as well.
- **Pairing with Hero K (F17):** both use MERSI's seam; if both are picked, the page carries two before/after seams.
- **Weight:** +382 KB.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | windows L | ⟦S1434⟧ the wall of four windows dominates; ⟦S0220⟧ published pairs and records only, the lock verbatim |
| Element | 4 windows | ⟦S0054⟧ `aria-pressed` toggles with spoken labels that flip; ⟦S1427⟧ one treatment; button system: tile zoom, press, spring, ring |
| Motion | sash lift | ⟦S1436⟧ 0.8 s `(.4,0,.1,1)`; one registered property drives the clip and the rail; ⟦S1440⟧ the 9% hover nudge as feedforward |
| Element | before/after chip | MERSI's synced label: the word rolls with the seam |
| Element | sill plates | The record in plain type; "See the project" with the underline wipe |
| Element | Lift every sash | ⟦S0405⟧ light board button, 140 ms stagger, label swaps and re-rolls |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button (shared `CTAS`) |
| Site | phone | One column; full-width windows; tap to lift; ⟦S1441⟧ |
| Site | reduced motion | ⟦S0400⟧ instant swap |
| Site | background law | White ground; the wall is `data-solid` |

## Reference transfers and non-transfers (MERSI)

**Transferred:**
- the seam between two states as the whole mechanism;
- a label that changes in sync with the seam;
- no autoplay: the visitor drives it.

**Not transferred:**
- the full-bleed split-slider layout (Hero K already holds it; here the seam is vertical travel inside a window);
- MERSI's architecture photography and its type.

## Comparison with the section's previous best (Windows K, "376 jobs, set in type", 8.58)

K shows the scale of the window business through typography sized by job counts.
- **L shows the result:** four real houses, old windows then new, with what went in and what the windows portion cost, revealed by the motion of the thing being sold.
- **K is stronger on:** scale and data.
- **L is stronger on:** proof of outcome and a memorable, trade-true interaction.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | Four framed windows on a lap wall, a travelling rail with its lock, calm sill plates (`-1440-lifting`, `-1440-all`). **Minus:** the unaligned pairs show at the seam mid-lift |
| Usability (30) | **8.6** | One tap or Enter per window; "Lift every sash"; spoken labels that flip; inherited physics and focus; reduced motion; phone tap; 0 errors and 0 overflow. **Minus:** at rest the visitor sees only the before photos |
| Creativity (20) | **8.8** | The before/after seam becomes a window's meeting rail, so the comparison is made with the motion of the product itself. New to the site |
| Content (10) | **8.6** | The four published pairs with installed product, band and link, verbatim; the lock wording. **Minus:** the photos show siding work too |
| **Weighted** | **8.64** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.6 + 0.2 × 8.8 + 0.1 × 8.6 = 3.44 + 2.58 + 1.76 + 0.86 = **8.64**.

**Vetoes: none.**
- Locks verbatim; no form.
- White ground; brand accents only.
- Normal fonts; no locked mechanic.
- The firm's own published photos, captioned as published.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Reviews L until Muse accepts.

## Post-accept fix (found during Process L, 2026-11-04)

**The bug:** the shared CTA block's phone icon rendered at 359 × 359 px in this version. `CTAS` is styled only inside `.hero`, and this version used it outside one. The gate checks did not catch it (no overflow, no error).

**The fix:**
- One section-scoped CSS block in `win7.css` sizes it as in the hero (18 px icon, the same gaps).
- The markup is unchanged; the template is byte-identical. Verified 18 × 18.
- Screenshots re-shot (`new-windows-l-*`, contact sheet).

Recorded in GATE-NEW-Process-L.md (defect 2).
