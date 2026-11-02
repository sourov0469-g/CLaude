# GATE: System · Footer (Home 11, shared by all five pages)

**Built:** ONE system part, deepened (Muse ruling 1). The changes are in `remodeling/src/base.html`, `css/chrome.css` and `js/core.js`; Consult V2 now uses the same hours function.

## What changed
- **A live line (OH's mechanism):** under "Built properly. Permitted correctly." the footer says, right now, the time in Miami and whether the office is open, e.g. "Miami 3:26pm · Open now, until 7pm Miami time".
  - It has a lamp (green when open, grey when closed) and refreshes every 30s.
  - It is computed only from the locked hours (Sun–Fri 7am–7pm, Saturday closed).
- **One source of truth for the hours:** `EZ.openStatus()` in `core.js`, used by both the footer and the Consult desk, so the two can never disagree.
- **Unit-checked at the boundaries:**

  | case | result |
  |---|---|
  | Sat noon | Closed today. Open Sunday from 7am |
  | Fri 8:30pm | Closed now. Open Sunday from 7am |
  | Mon 6:30am | Closed now. Open today from 7am |
  | Wed 6:59pm | Open now |
  | Wed 7:00pm | Closed now. Open tomorrow |
  | Sun 7:00am | Open now |
  | Sat/Sun in July (summer time) | correct |

- **The logo's closing beat:** the footer logo holds the closed-room square (`logo.js` IntersectionObserver), verified in the render.
- **Layout:** a duplicate "Counties" column (repeating the brand line's three counties) pushed the grid to 14 of 12 columns and stranded itself on its own row. Removed, and the footer sits on one row (809px tall, was 975).

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity to the plan | 9 | Live open/closed status (OH mechanism, locked hours); logo closing beat | |
| Facts | 10 | Hours, address, phone, licence string verbatim; the status is derived from them only | |
| Accessibility | 8 | The live line is plain text (not announced every 30s, by design) | |
| Craft | 8 | One row of columns, quiet lamp, Miami clock in tabular numerals | The giant wordmark band above is inherited and unchanged |

## Verification
- Zero console errors on all five pages after the change; no horizontal overflow at 1440.
- Render: `qa/finalize/system-footer/`.
