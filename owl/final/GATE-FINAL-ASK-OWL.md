# GATE-FINAL-ASK-OWL · section 4, "Ask the Owl" (ONE final version, UI/UX improved)

**Source:** OLD Wise Check V4 "Ask the Owl", the whole section, rebuilt in `src/final/sections/04-ask-owl.html` (id `ask-owl`). **Evidence:** `gates/final/ask-owl/` (`q1.png`, `typed.png`, `s-1440.png`, `s-390.png`, `checks-ask-owl.json`).

## 1. Think first: what was wrong, which ideas, which one
Issues found in the old section:
1. On phones the question list sat above the chat, so the answer appeared far below the button you tapped.
2. Answers were plain paragraphs, although Owl's data has an icon for every part and case.
3. Only five fixed buttons: it did not feel like asking.
4. The chat was a scroll box inside a page that also scrolls, and its height jumped as answers arrived.
5. No way to start over; a used question just dimmed.

Ideas weighed:
- **A. Messenger with quick replies and a type box** (answers only from what Owl publishes; honest fallback).
- B. Accordion cards (loses the "ask" feeling). Rejected.
- C. A free-form AI-style answerer. Rejected: it would invent claims (hard line).
- D. Keep two columns. Rejected: it caused issue 1.

**Chosen: A**, with these decisions: one centred card on every screen size; on phones the quick questions sit *above* the conversation so the answer lands under the thumb; answers are rich cards (the four parts, or four cases, each with Owl's own icon); a fixed-height log with `overscroll-behavior: contain` so the page never jumps; asking the same thing twice highlights the earlier answer instead of repeating it; "Start over" clears the conversation; the owl avatar blinks and glances while "typing".
**The type box is honest:** it matches words to the five published answers, to the 10-year workmanship warranty (and manufacturer warranties up to 50 years), and to the hours and number. Price, cost, "free" and quotes are never guessed: "I don't have a price to give you here, and I won't guess. Call (651) 977-6027." Anything else: "I can only answer what Owl Roofing publishes about the Wise Check, and I don't have an answer to that one." Typed text is shown with `textContent`, never as markup.

## 2. Five questions (homeowner)
1. **What is it for?** Find out what the Wise Check is before I book it.
2. **Under 3 s?** Yes: "Ask the Owl", a chat with questions I can tap.
3. **Fun?** The answers arrive as cards with small icons; the owl blinks.
4. **Every element earns its place?** Header, quick questions, conversation, own-question box, start over, book, call. Yes.
5. **Stressed?** Plain answers and a straight "I won't guess" about money.

**Skill ledger:** ⟦S1107⟧ real buttons and a labelled input · ⟦S1273⟧ answers written out · ⟦S0544⟧ causal motion · ⟦S0451⟧ title reveal · ⟦S1259⟧ buttons.

## 3. Checks (`node tools/final-test.cjs ask-owl`): **25/25**
axe 0 · facts lock · no maps · distinct media (none) · five quick questions, greeting, labelled box · a question shows your words then four icon cards · the same question twice does not duplicate · "When should I book one?" gives the four cases · the section height does not change as answers arrive · typed "attic" answered from the published parts · start over clears · a price question is not guessed (one phone number) · an unknown question gets the honest line · `<img onerror>` typed in is not executed · every call link is the one number · Book action present · layout and 44 px controls at 1440/768/390 · reduced motion · no errors.

## 4. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.4 | 8.7 | 8.3 | 8.8 | **8.50** (3.36 + 2.61 + 1.66 + 0.88) |

## 5. Defects found and fixed in-session
1. First phone layout left a large empty chat area above the questions; the questions now come first on phones.
2. A repeated typed question needed its own wording ("I answered that one above"); added.

## 6. Remaining
- **D1:** the type box is keyword matching, not understanding: a question phrased very differently gets the honest fallback. That is the safe failure.
- **D2:** answers come from `OWL.WISE` (Owl's published wording); if Owl publishes more, the data file is the one place to extend.

## 7. Vetoes: **zero**
No invented claims; price never guessed; one phone number; no maps; logo untouched.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
