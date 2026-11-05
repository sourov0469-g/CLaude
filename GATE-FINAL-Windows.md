# GATE-FINAL — Section 5: WINDOWS (Version A, "One window, morning to midnight", rebuilt with Version F's idea)

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (WINDOWS block). **Owner's asks:** on the left the KINDS (single hung, double hung, casement, slider, picture); the visitor can OPEN the window, change colours, and do more edits; much more realistic and micro-detailed than A; F's static, poorly made SVG is banned.

## 1. Self-audit of the old Windows A and F, then decisions

Old A: one Andersen single-hung drawn from parts, a sun slider, a lifting sash and Low-E; the left column listed parts of a window. Old F: five kinds drawn as flat static SVG, with a text blurb. The prep sub-agent (`siding/redo/prep/final/windows-kinds.md`) established that **the firm publishes nothing about the five kinds** (no sentence on how each opens, which maker offers which kind, grille patterns, glass tints, sizes), so: the kind descriptions are **general mechanical descriptions, labelled as such on the page**; every number and colour is from the firm's own data.

**Decisions:** keep A's best idea (the sun, morning to midnight) and put F's idea in front of it: five kinds in a left column (each a small drawn icon that follows the chosen frame colour); one large, shaded SVG window, built in the browser from geometry (so every state is drawn, not swapped); a "From inside" card showing the hardware you actually operate; a control panel on the right. Nothing static.

## 2. What was built

- **Five kinds**, each with its own mechanics: **single hung** (lower sash lifts, upper fixed); **double hung** (both slide, drag either); **casement** (hinged at the left; the free edge swings out in perspective and grows as it nears you; drag the edge and the angle follows the pointer); **slider** (the moving sash slides over the fixed one; the opening appears on the right); **picture** (fixed: no Open, no lock, no drag area, and it says so).
- **Open it:** a big Open/Close button (Open first turns the lock, then raises the sash on a spring; Close closes, then locks); **drag the sash** directly (mouse or touch, over the window only); a range for keyboard and fine control; a lock you can turn from the panel or from the lever on the inside card; **drag a locked sash and the lock shakes** ("Locked. Turn the lock first"); **tilt-in** for hung kinds (only when closed and unlocked; the sash tilts into the room as a perspective trapezoid).
- **Dress it:** the four makers' **published frame colours** (NT Windows 19, Simonton 10, Andersen 5, Pella 5, each named, exactly as `window_colours.json`); the frame is drawn with mitred corners, a lit top and a shaded right and bottom, so each colour looks like a real profile; **grilles** none / colonial / prairie (drawn bars with a shadow and a highlight); **Low-E glass** on/off (a faint tint, an inner spacer line, and in the section card a Low-E coat); **insect screen** on/off (a mesh that sits in front of the lower half on hung windows, over the right half on sliders, behind the sash on casements).
- **Time of day, 7 am to 11 pm (A's idea, kept):** the sky reflected in the glass, the wall and casing take a tint, the interior gets dark, and **a lamp inside lights up** at dusk and glows through the glass; the reflection streak across the glass follows the pointer.
- **From inside card (the micro detail):** for hung kinds the meeting-rail lock lever turns when you lock or unlock, and the two tilt latches slide; for casements a plan view shows the sash swinging on its hinge while the crank turns about one and a half turns; for sliders a plan view shows the sash sliding in its track and the hook latch; for the picture window a section through the glass shows the two panes, spacer and the Low-E coat.
- **Interior (seen through the gap):** back wall, a framed picture, curtains with pleats, a lamp, a skirting board and floor; they respond to the time.
- **Published facts, verbatim:** "388 documented window jobs. Of 376 priced: NT Windows 238, Simonton 54, Andersen 38, Pella 31." · "Mostly vinyl. 214 of our 376 priced window jobs were vinyl, 64 were NT's Twinsulator aluminum and 33 were Andersen's Fibrex composite." (firm's FAQ) · "Most of the window-only jobs in our files took two days on site." A small **bar card** (left, desktop) draws the four published maker counts as bars, with the chosen maker highlighted. Nothing summed.
- **The honest note, on the page:** "How each kind opens is a general description, not a statement about any maker's line. Frame colours are each maker's published colours, shown approximately on screen. Which kinds and colours a line comes in, we'll confirm at the free inspection."
- **Reset window** returns everything; **Book a free inspection** links to the internal booking section.
- **Reduced motion:** springs snap; nothing runs on its own. **Idle:** nothing animates when nothing is changing (frame time 16.7 ms).

**Background treatment:** the kit's **light rays and ghost sash grid** (far layer) and glass-reflection sparkles (near layer) on a dim sage ground, on scroll-driven parallax (two layers); the stage is the wall, frosted panel on the right; nothing is pure white.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Apple's configurator pages (the Mac and Watch "choose your finish" pattern: a large live product, a list of options, instant response)**, with **Graza** as the quality bar for physical-feeling micro-animation. **Transfers:** one live object that changes the moment an option changes; named options with a clear selected state; a spring on every moving part. **Does not transfer:** their photography, their type, their purchase flow; the drawing is made here from geometry and the content is the firm's published data.

| Level | Element | Skill → how used |
|---|---|---|
| Section | Windows | ⟦S1434⟧ visual-hierarchy: the window, then the controls, then the facts; ⟦S1426⟧ law-of-proximity: each control group sits under its own heading; ⟦S0220⟧ anti-slop: published counts, colours and sentences only; the kinds' mechanics flagged general |
| Element | kinds list, brands | ⟦S1444⟧ one choice at a time (radio groups with arrow keys); ⟦S1454⟧ serial-position: single hung first, picture last; ⟦S1494⟧ plain labels |
| Motion | sash, lock, tilt, light | ⟦S1436⟧ animation-principles: springs with overshoot (follow-through), a ground-up sky mix, anticipation (the lock turns first); ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: only the small dynamic SVG group is redrawn, only while something moves; ⟦S0400⟧ accessible-animation: reduced-motion snap |
| Element | controls | ⟦S0054⟧ fixing-accessibility: real buttons and ranges, `aria-pressed`/`aria-checked`, `aria-valuetext` on the time, a live region announcing each change, 3 px focus rings; ⟦S1441⟧ fitts-law: every target ≥ 44 px (measured), the Open button the largest |
| Site | weight | ⟦S0231⟧ web-performance: no image; 8 KB of CSS and 28 KB of JS for the section |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `windows-1440-single.png`, `windows-kinds.jpg` (double, casement, slider and picture, opened), `windows-states.jpg` (colonial + Simonton Brick; prairie + screen, raised; night with lamp; tilted in at sunrise), `windows-1440-casement-dusk.png` (casement open, Andersen Dark Bronze, 8:15 pm), `windows-phone-390.jpg`. **38 of 38 checks pass** (`tools/wnt.js`):

| Check | Result |
|---|---|
| Kinds, makers | The five kinds in the ruled order; 238 / 54 / 38 / 31 |
| Facts | The three published sentences verbatim; no sums (241, 330, 497, 361 absent); the general-description note shown |
| Colours | Every maker lists exactly its published colours in order (compared with `window_colours.json`); choosing NT Bronze paints the frame in Bronze |
| Lock rules | Dragging a locked sash does nothing and the lock shakes; unlocked, dragging raises the sash; Open unlocks first; Close closes and locks |
| Kinds | Single hung: upper sash fixed; double hung: upper slides; casement: the angle follows the pointer; slider: slides; picture: no Open, no lock, no drag area |
| Glass, light | Low-E on/off changes the glass; the screen mesh appears; colonial and prairie draw bars; at 10 pm the lamp glows and the label says 10:00 pm; at noon there is no glow |
| Reset, keys | Reset returns the defaults; arrow keys move through the kinds; the Sash range works by keyboard and unlocks |
| Contrast, fonts | All ≥ 4.5 (lowest 5.22); Montserrat and Inter only |
| Reduced motion, touch | The sash snaps to target; touch drag area blocks scroll only over the window and Open works by tap |
| Layout, 4 sizes | 1440 / 1024 / 768 / 390: nothing in the section overflows, every target ≥ 44 px, 0 errors |
| Page errors, idle | 0 errors; idle frame time 16.7 ms |

## 5. Defects found and fixed

1. Inset heading text overlapped the "From inside" pill; the titles were removed and the pill now reads From inside / From above / Through the glass.
2. The casement's cast-shadow polygon looked like a second pane inside the opening; removed.
3. Floor and curtains dominated the interior gap; floor line lowered, colours calmed.
4. A double-click handler on the drag area opened and closed the window during drags; removed.
5. A sash at 1–2% counted as "closed" for the button label but not for the lock; one threshold (0.5%) now for the label, the lock and the tilt rule.
6. Form controls fell back to a system font; they inherit Inter now. Controls under 44 px (swatches, ranges, grille buttons) were raised to 44 px.
7. Whole-page note: at 390 px the **Area section** (`lineview`, `cards`) is wider than the screen and makes phones zoom the page out; this is in an unrebuilt section and is fixed when Area is rebuilt (Section 9). The Windows section itself does not overflow.

## 6. Remaining, named honestly

- **Elevation drawing, not photography.** It is accurate in mechanics and detailed, but it is an illustration; a real Andersen or NT cross-section is not shown.
- **How each kind opens is general**, flagged on the page. Which maker offers which kind, grille patterns, glass tints and screens are not published by the firm, so no claim is made; the grilles and the Low-E tint are generic.
- **Frame colours on screen are approximate**; colour on vinyl, aluminium or Fibrex differs by finish (the note says so).
- **Casement perspective is simple** (an affine swing with a size cue), not a full 3-D projection; the double-hung tilt is a trapezoid, not a rotation.
- **Testing:** Chromium only, headless software rendering; touch tested with emulated touch events, not a physical phone.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.5** | Mitred frames, lit and shaded faces, a reflected sky and tree line, a lived-in interior, a night lamp that glows through the glass (`windows-states.jpg`). **Minus:** an illustration, not a photograph |
| Usability (30) | **8.7** | Open, drag, lock, tilt, crank, slide, grille, glass, screen, colour, time; keyboard path for every one; the lock teaches the order (shake); targets ≥ 44 px. **Minus:** the panel is long on phones |
| Creativity (20) | **8.8** | A lock that shakes, a casement that swings in perspective, a plan view of the swing, a hardware card, a lamp that lights at dusk. **Minus:** the configurator pattern is a known reference |
| Content (10) | **9.0** | Only published numbers, colours and sentences; the general mechanics flagged; nothing summed. **Minus:** the kinds themselves are not documented by the firm |
| **Weighted** | **8.67** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.5 + 0.3 × 8.7 + 0.2 × 8.8 + 0.1 × 9.0 = 3.40 + 2.61 + 1.76 + 0.90 = **8.67**.

## 8. Sub-agent use, stated honestly

The prep sub-agent (read-only) produced the window-kinds and colours report (`prep/final/windows-kinds.md`); I designed, built, tested and gated the section myself. No background tasks.

## 9. Next: Sections 6 and 7, Reviews (B in full, then C with one review) and Process (D upgraded)

**Consult-first plan:** Reviews B ("Hanging tags") with its fixes and richer micro-detail; then C ("Read at reading pace") carrying **one** review only, the best one, shown bigger (chosen from the 474-review dataset, quoted exactly, with its published star, name and date; no invented text); duplicates and ids removed; Process D ("Four columns") upgraded with SVG life; dim ground and kit background art for each; reduced-motion and phone layouts checked.
