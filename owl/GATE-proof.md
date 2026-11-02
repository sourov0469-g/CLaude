# GATE · Proof strip (home §2): two versions

**Where it lives:** `owl/site/owl-roofing.html`. Switch versions with `?v=proof:1|2`. **Default: V1.**

**Reference:** Longbow Motors (frames f02-f05).
- **What transfers:** its spec row of hard numbers with small unit labels, separated by hairlines, and doctrine backed by
  numbers.
- **What never transfers:** dark gold-on-black, the serif italics, car specs.

**Skills applied:**
- ⟦S0489⟧: the numbers count up once with an ease-out, then rest.
- ⟦S0074⟧: tabular numerals.
- ⟦S0659⟧: no invented metric. Every number is in the facts lock.
- BRAND.md: a flat ground is allowed on a minor proof band.

## V1 · Spec row
Five numbers, each with a small label:

| Number | Label |
|---|---|
| **5.0**★ | 90+ reviews |
| **10** yr | Get It Right Guarantee on our work |
| up to **50** yr | manufacturer warranties |
| **29** | towns around the Twin Cities |
| **2025** | founded by two families |

Under them, a credentials line: GAF Systems Plus Certified · BBB Accredited, A− · MN licence #BC809662.

## V2 · Seals
Owl's own Get It Right Guarantee seal and Wise Check badge, each with a caption, plus five proof chips.
- **Left out:** the Owl Mom Approved badge. Owl publishes no explanation of what it certifies, so showing it would
  imply a claim.

## Ratings
| | V1 | V2 |
|---|---|---|
| Design (40) | 7.5 | 7.0 |
| Usability (30) | 8.0 | 8.0 |
| Creativity (20) | 7.0 | 6.5 |
| Content (10) | 9.0 | 9.0 |
| **Weighted** | **7.70** | **7.40** |

**Why V1 scores higher:** it is a real hierarchy, numbers first, and it reads in one glance. V2 is honest, but it is a
row of badges, closer to the usual roofing-site trust bar.

**Vetoes:** none.
- **Facts:** all locked.
- **Contrast:** muted label olive-500 on cream is 4.81:1.
- **Overflow:** none at 1440 or 390.
- **JS:** no errors.

## Tests
- **The count lands on exactly 5.0, 10, 50, 29, 2025.**
- **Reduced motion:** the final values are shown from the start (no animation).
- **No flicker:** the start value is set before the strip is seen, so there is no final-to-zero jump.
- **Token lint:** clean.

## Defects found and fixed
1. **Count-up flicker:** the final values showed, then jumped to 0 when counting began. Fixed by setting the start value
   at load.
2. **"Founded by two Shoreview families" overstated the lock.** The lock says founded 2025 by the Brown and Bergland
   families; where they live is not stated. Now: "founded by two families".
