# GATE · Final build · Round 5 · Booking / Footer + "We Give a Hoot" (two versions each) · HOMEPAGE COMPLETE

**File:** `owl/final/owl-roofing.html` (4.5 MB, everything inside). Judge with `?review`, or `?booking=1|2&family=1|2`
(`?all=2` for every V2). Screenshots: `gates/r5/` (the **full homepage** in both version sets, desktop 1440 and phone 390).

**The homepage now has 10 sections plus a footer:** Hero · Video · Explore · Wise Check · Protect Your Nest · Services ·
Reviews · Service area · We Give a Hoot · Booking · Footer.

## Section 9 · WE GIVE A HOOT (the family section)
No reference sheet covers this part; it completes the homepage at 10 sections using Owl's own photos and the locked facts
(family-owned, founded 2025 by Tim Brown and Noah Bergland, Shoreview, licence #BC809662, "We Give a Hoot").
### V1 · Two families, one promise
- Owl's own cut-out photos of **the Browns** and **the Berglands** stand on the cream page with name cards. Hover or focus a
  family and it lifts while the other steps back. **"Give a hoot"**, a big 3D amber button, releases a flurry of amber and
  ink feathers (brand-04's feather motif) that drift down over both families.
### V2 · Meet the families behind Owl
- A photo reel: the crew, the Browns, the Berglands, Noah Bergland, community involvement. **Drag it with the mouse**
  (cards lean with the drag and coast on release), swipe on touch, or use the arrow buttons and arrow keys. Captions say
  only what Owl's own material says.

## Section 10 · BOOKING + FOOTER
### V1 · Booking page (primary: booking-best1, booking-06)
- Form card (name, phone, address, preferred day Mon–Sat as chips), a Service Area card with an abstract dot field (not a
  map), and a Call card ((651) 977-6027 with hours; the phone icon rings on hover).
- **Sheet defect fixed (§9):** "We'll confirm within one business day via text or call" is removed (invented).
### V2 · Giant phone number (alternate: booking-best3, booking-07)
- "Call or Book a Wise Check" over a **giant tap-to-call number**. Its digits ripple once when it comes into view and lift
  under the pointer. Inline form with day and time chips, then Visit · Write · Hours and "5.0 · 90+ reviews".
### Both forms (direction §10: forms never claim to be saved or sent)
- Required fields are checked in the page, and the first missing one is named and focused. A complete form **opens the
  visitor's own email app** addressed to info@owlroofing.com with the details filled in, and says exactly that: "Your
  email app should open with these details. Send it from there, or call (651) 977-6027." Nothing is posted anywhere.
- Sample names and addresses in the sheets' fields are not used (§9); fields start empty.
### Footer (shared, light)
- **Light, not ink** (the sheets' dark footer bar breaks the light-only rule). Real logo, "We Give a Hoot.", founders, an
  Explore list, the full address, hours, phone, email, and a trust row: GAF Systems Plus Certified · BBB Accredited, A− ·
  MN licence #BC809662 · 10-year workmanship warranty · 5.0 · 90+ reviews. © 2026 Owl Roofing LLC.

## Shared fix this round: anchors follow the shown version
Whichever version of a section is on screen now carries that section's main id, so "Book a Wise Check" (#book), "Watch the
Crew" (#crew-video), "See Our Services" (#services) and the rest land correctly in every version combination. Tested.

## Verification
- **Interaction test** (`tools/interact5.cjs`), both booking versions: an empty submit says "Please add your name." and focuses
  the field; a complete submit gives the email-app message; #book and #crew-video resolve to the visible versions. "Give a
  hoot" draws feathers; the reel advances 442 px with the arrow. **No page errors.** Rounds 1–4 tests still pass.
- **Accessibility** (axe, WCAG 2.1 A/AA): **0 violations** on V1 and V2 for the whole homepage.
- **Phone (390 px):** forms single-column, chips wrap, giant number scaled to fit (one overflow fixed), footer two-column.

## Copy budgets
Family V1: headline 4, support 18. Family V2: headline 5, support 12. Booking V1: headline 4, support 10 (plus field labels).
Booking V2: headline 5, support 9. Within ≤8 + ≤35.

## Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Section · version | D | U | C | Ct | Weighted | For / against |
|---|---|---|---|---|---|---|
| Family V1 Two families | 8.0 | 7.6 | 7.8 | 8.4 | **7.94** | For: the real founders and families, warm and specific; a playful feather moment. Against: the cut-outs end in a straight line at the knee (that is how Owl's photos are cut). |
| Family V2 Reel | 7.6 | 8.0 | 7.0 | 8.2 | **7.68** | For: more of Owl's own photos, easy to browse with any input. Against: a familiar carousel pattern. |
| Booking V1 Booking page | 8.0 | 8.4 | 7.2 | 8.4 | **8.00** | For: clear, complete, honest about what the form does. Against: the most conventional layout (as the sheet is). |
| Booking V2 Giant number | 8.0 | 8.0 | 7.6 | 8.2 | **7.96** | For: the phone number is the hero, which suits a local trade. Against: the inline form is long on phones. |

All four pass; zero vetoes (no invented promises or reviews, cream page and light footer, logo and palette locked, single
file, no sub-agents, no background tasks).

**WEB-SKILLS applied:** ⟦S1442⟧ form-design (labels above fields, chips for choices, inline validation, autocomplete
hints) · ⟦S1439⟧ error-handling-ux (the missing field named and focused, an honest outcome message) · ⟦S1441⟧ fitts-law
(62 px submit, giant tap-to-call) · ⟦S1450⟧ navigation-patterns (footer Explore list, anchors that follow versions) ·
⟦S1452⟧ peak-end-rule (the page ends on a clear call and a full footer) · ⟦S0070⟧ better-accessibility (axe 0, live
messages) · ⟦S0659⟧ anti-ai-slop (invented confirmation line removed, sample field text not used) · ⟦S1496⟧
critique-brand-consistency.

## Recommendation
**Family V1** and **Booking V1** (Booking V1 is the primary sheet; Family V1 puts the founders front and centre).

## Next (no waiting, per the direction)
The other pages, in the same single file, 5–6+ sections each, starting with **Services** and **Wise Check**, then Protect
Your Nest, About (families), Service Area and Contact.
