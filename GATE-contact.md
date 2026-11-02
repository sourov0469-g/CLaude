# GATE: Contact page (Phase 5, part 2)

**Section count:** 5 sections plus the footer. Two are NEW.
- **Order:** Hero (owner's merge) → Visit and call (×2) → Service area → **What happens after you reach out (NEW, ×2)** → **Questions before you call (NEW, ×2)**.
- **Inherited versions** are in git history (`ce59679`).
- **Copy:** every value is published (FACTS.md "Contact", Credentials, the stages, FAQ, code context, financing). Zero em dashes; zero images on this page.

| # | section | versions | what it is now |
|---|---|---|---|
| 1 | Hero | 1 (owner's merge) | **V5's left side:** "You will get a real answer. Not a callback form.", the number as the main act, and a live "Open now, until 7pm Miami time" line from the shared `EZ.openStatus`, plus the firm's "free consultation… we won't charge a dime". **V3's right side:** the request written as one letter, blanks filled where they stand. Validation inline (measured: 6 messages on an empty send); mailto said before sending, never claimed as sent. Keeps the `#contact-form` anchor every "Book" link targets. |
| 2 | Visit and call | **2** (V1 and V3, the clean ones) | **V1:** the business card, turned over by a button. **V2 (was V3):** the address label with copy and Google Maps. **Both deepened** with the live open/closed line (one source of truth with the footer and Consult). |
| 3 | Service area | 1 (V5 + V1's search) | Three rows of names, one per county, drifting at their own pace (the middle one the other way), held by pointer, focus or the pause control, and still under reduced motion. **Typing lays all 104 out at once**, highlights the matches and answers with the county. Measured: "wes" highlights West Miami, West Park, Weston, West Palm Beach and Westlake; "Weston" gives "Yes, Weston. It is in Broward". A town not on the list gets an honest answer. **No hit count is printed** (numbers lock). |
| 4 | What happens after you reach out (NEW) | **2** | **A:** the Process section's own frames 1 and 2 (the same art kit, lifted from `process.js`, so the drawing language is one), drawn in order: Consultation (Week 1), then Site evaluation (Week 1–2), with the firm's verbatim stage lines. **B:** a vertical thread that draws with the scroll from "You reach out" (the firm's response-time line) to the two stages, ending "Timelines vary by scope and jurisdiction." |
| 5 | Questions before you call (NEW) | **2** | Eight questions worded for the visitor; **every answer is the firm's published wording** (durations, permits, HVHZ and NOA, financing "not a lender", 104 municipalities, the free consultation, licence and DBPR, calling). **A:** an accordion whose plus morphs into a minus (S0086), the panel opening by its grid row with no layout jump. **B:** a vertical tablist (arrows, Home, End) beside an answer card. |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity to the plan | 9 | Every row of `PHASE1-PLAN.md` "CONTACT" delivered | |
| Interaction | 8 | Letter form, live lines, area search, accordion morph, tablist; rows decelerate to rest (Phase 6) | |
| Accessibility | 9 | Labelled blanks, `aria-invalid` errors, live answers, the region accordion, a still mode for reduced motion | |
| Honesty and facts | 10 | Mailto never "sent"; hours derived only from the locked hours; numbers lock respected (no hit count) | |
| Visual craft | 8 | One drawing language across pages (the Process frames reused) | |

## Defects found and fixed across cycles
1. **Next steps:** the second frame's viewBox was offset (`1000 …`), but the lifted Process frames draw in local 0–1000 units. Corrected; both frames render.
2. **Numbers lock:** the area search first printed "N matches" (a count outside the lock). It now names the matches instead.
3. **Cleanup:** inherited `data-rx` attributes (the removed per-element reaction system) were stripped from the reused markup. One inherited `--ease-out` was harmonised to `--ez-out`.

## Defects remaining (honest)
- ~~**Drifting rows** pause rather than decelerate (CSS animation).~~ **Fixed in Phase 6:** one smoothed speed per row (the Projects model). Measured: rows drift at 24 / 20 / 28 px/s (the middle one the other way); on hold they ease to rest (3 → 1 → 1 → 0 px per 150 ms), held delta 0; search lays them flat (transform none); reduced motion still.
- ~~**Dividers** on this page are the system set.~~ **Fixed in Phase 6:** conduit, coast, steps (the stage rail, first two marks filled), level, footing.

Render evidence: `qa/finalize/contact/`. Zero console errors at 1440 and 390; no horizontal overflow.

**Phase 6 correction:** the drifting rows now fade at both ends (40px masks) as S0450 asks; the search and still states stay unmasked. Evidence: `qa/finalize/phase6/contact-rows-masked-1440.png` and `-390.png`.
