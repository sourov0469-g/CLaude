# GATE-FINAL-NOTHING · section 5, "Here's your part: nothing." (ONE final version)

**Source:** NEW Nothing V1 "Scroll film", ported to `src/final/sections/05-nothing.html` (id `nothing`) onto the original Owl palette (the plan fixed its slot as item 5). **Evidence:** `gates/final/nothing/` (`stage.png`, `s-1440.png`, `s-390.png`, `checks-nothing.json`).

## 1. What it is
A pinned stage, 4.5 screens tall. Your scroll scrubs a drone film (reversible) over a house mid-reroof through five beats: **Look · Wrap · Roof · Clean · Box**, with a jump rail, a "Meanwhile, you: make coffee / go to work / pick up the kids / make dinner / open the front door" chip, and a progress line. The footage is stock (Pexels 4198812, credited in `MEDIA-CREDITS.md`), tagged **"Illustrative footage"**, and appears nowhere else on the page. The old hero's film is the crew film, now only in the video section.
On phones the film sits in a 16:9 frame under the bar (0.45× at DPR 2: sharp); on desktop it is full-bleed (1.00× at 1440).

## 2. Changes in the port
- The accents use the original amber on the ink band; text is white on ink.
- **Beat 1 now follows what the visitor said in section 3:** if they tapped "is leaking", it reads "We find your leak first."; "lost some shingles", "took a storm hit", "is getting old", "just needs a look" each have their own line (the removed problem-finder used to feed this). With nothing said: "We look closely first."
- The film is played from a Blob URL and primed with a muted play-then-pause before scrubbing (the iOS fix).
- No maps; no Owl-crew claim on the stock footage.

## 3. Five questions (homeowner)
1. **What is it for?** After I call, Owl does the whole job.
2. **Under 3 s?** Yes: "Here's your part: nothing."
3. **Fun?** You fly in on a real reroof as you scroll, and the "meanwhile" joke lands.
4. **Every element earns its place?** Film, five beats, rail, chip, progress line, tag. Yes.
5. **Stressed?** It takes the fear out of a big messy job.

**Skill ledger:** ⟦S0448⟧ pinned stage · ⟦S1325⟧ scrubbed film · ⟦S1209⟧ ⟦S1447⟧ ⟦S1457⟧ ⟦S1455⟧ ⟦S0400⟧ (as in GATE-FIX-NOTHING).

## 4. Checks (`node tools/final-test.cjs nothing`): **21/21**
axe 0 · facts lock · no maps · distinct media (the drone film and its still are used only here) · pinned 4.5 screens · the scrub rises and falls with scroll from a Blob URL · five beats and the "meanwhile" line follow scroll · labelled "Illustrative footage" and never "crew film" · beat 1 default and following the chosen case · the rail jumps · sharp at 1440 (1.00×) and 390 DPR 2 (0.45×) · layout and 44 px controls · reduced motion (no film loaded) · no errors.

## 5. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.6 | 8.4 | 8.6 | 8.6 | **8.54** (3.44 + 2.52 + 1.72 + 0.86) |

## 6. Remaining
- **D1:** the footage is honest stock, not Owl's own job; Owl's own clips of each step would let each beat show its own step.
- **D2:** the drone film is 1600 × 900 (1.2× on a 1920 screen). iOS not run here.
- **D3:** the file grew by about 6 MB with this film (4.3 MB encoded, stored once).

## 7. Vetoes: **zero**
Stock labelled and credited; facts exact; logo untouched; no maps.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
