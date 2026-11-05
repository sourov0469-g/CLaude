# Services S-A prep: Start from the problem

Files here: `services-tiles.json` (all data, crops, allowed facts), `tiles-preview.jpg` (six 3:2 crops), `tiles-preview-phone.jpg` (4:5 crops). Photo indices are 0-based, images `work/dl/photo<N>-1400.webp` (1400x1050). Crop rectangles are x,y,w,h in that master. Place, month and trades are copied exactly from `photos.json`.

## Choices

| Tile | Primary | 2nd | Record (place, month, trades) | 3:2 crop | 4:5 crop |
|---|---|---|---|---|---|
| 1 Siding and trim | 0 | 3 | Maple Run, Austin; Feb 2026; Siding & Exterior Painting | 0,20,1400,933 | 100,0,840,1050 |
| 2 Windows and doors | 39 | 40 | Heritage Hills, Austin; Nov 2025; Doors & Windows | 0,60,1400,933 | 280,0,840,1050 |
| 3 Roof and flashing | 10 | 9 | Fairview, Round Rock; Jun 2025; Shingle Roofing | 0,117,1400,933 | 560,0,840,1050 |
| 4 Gutters | 37 | 1 | East Oak Hill, Austin; Sep 2026; Windows, Siding, Gutters & Exterior Painting | 0,60,1400,933 | 300,0,840,1050 |
| 5 Paint and caulk | 33 | 36 | Georgetown; Sep 2026; Siding & Exterior Painting | 0,30,1400,933 | 360,0,840,1050 |
| 6 Rot and water damage | 28 (provisional) | 30 | Block House Creek, Leander; Sep 2026; Siding & Exterior Painting | 0,60,1400,933 | 300,0,840,1050 |

Second choices: 3 = Maple Run, Austin, Jul 2026 (Siding, Exterior Painting & Gutters); 40 = Bull Creek, Austin, Jun 2026 (Windows & Doors); 9 = Pflugerville, Oct 2025 (Shingle Roofing); 1 = Austin, Sep 2026 (Siding, Gutters & Exterior Painting); 36 = Ashford Park, Buda, Jul 2026 (Siding, Shingle Roofing & Exterior Painting); 30 = Austin, Sep 2026 (Siding, Gutters & Exterior Painting). Crops for these are in the JSON.

Why: each primary visibly shows its trade, its record lists that trade (except tile 6), and it is sharp. Every crop is full 1400 px width, so the 1x rule holds for any tile up to 700 css px (4:5 crops are 840 px wide, fine up to 840 css px). Weakest points: 39 shows glazed doors, not windows (its record says Doors & Windows; 40 shows a window and is the alternative); 39 is backlit and low contrast.

## What each tile may claim (full list with sources in the JSON)

- Siding and trim: 431 documented siding jobs, $10k-$15k median band (415 priced); siding FAQ sentences verbatim (cost, 1 to 2 weeks, James Hardie, soffit and fascia). No count for trim alone.
- Windows and doors: two separate trades. Windows 388 documented (376 priced), $10k-$15k. Exterior doors 109 (96 priced), $2k-$5k. Never add them, never one combined band. Window FAQ sentences verbatim. No door sentence exists.
- Roof and flashing: PARTIAL. Shingle roofing 210 (204 priced) $10k-$15k; metal roofing 31 (29 priced) $20k-$25k. Flashing has no figure at all. Do not label 210 as "roof and flashing", do not sum to 241.
- Gutters: 121 documented (109 priced), $2k-$5k. No sentence.
- Paint and caulk: PARTIAL. Exterior painting 320 documented (317 priced), $2k-$5k; the siding FAQ painting sentence. Caulk has no figure and cannot be claimed.
- Rot and water damage: NO DATA. No count, band, sentence, or photo whose trades include it. Only the line itself (it is one of the six inspection-list lines in the site code) and the free-inspection sentences ("One free inspection covers every trade on the house.", "The inspection and estimate are free.") may appear. Photo 28 is a neutral placeholder showing walls and a gutter; it must not be described as a repair or damage. Do not use photo 23 (old trim exposed around a new door): it looks like damage but its record says only Siding & Doors.

Required footnote wording already published: "Counts are documented projects from our service list; one project can include several trades. Bands are each trade's median price band, materials and labor, before discounts."

## Already in the built page (scan of out/site.html, 4:3 images only)

- 1400 px: 0, 10, 42 (in the shared `#imgreg`, live, not inside a template); photo 0 also at 1900. Tiles 1 and 3 cost nothing.
- 960 px: 4, 5, 6, 7, 11, 29, 38, 40, 41. 680 px: 1, 3, 8, 9, 16, 18, 19, 20, 22, 24, 25, 30, 39. 640x480: 2, 28, 33, 36.
- Not found: 37 (a cropped copy might exist; the scan matched 4:3 only).
- New 1400 masters for the primaries: 39, 37, 33, 28, about 280 KB each, roughly 1.1 MB. The page is 12.86 MB now and the Artifact tool limit is 16 MB; I could not find the project's own "hard ceiling" figure, so confirm it. `weight.py` right-sizes images to 1.75x their widest css width, so a 700 px tile ends near a 1225 px copy, not 1400.
- Cheaper options, because crops are full width: if collapsed tiles are at most 640 css px, the existing copies of 33 and 28 (640), 39 and 1 (680) already satisfy 1x with no new weight; only 37 is new (about 280 KB, or use 1 at 680). Zero-new-weight fallback for all six: 0 @1400, 40 @960, 10 @1400, 1 @680, 36 @640, 28 @640, usable only up to those widths.

## Gaps and questions for the owner

1. Rot and water damage: is there a real job photo whose record covers it? Without one, ship the tile text-led or with the neutral placeholder and no claim.
2. Do you document caulk or flashing as counted work? If so, give the counts; until then those words get no number.
3. Is "Windows and doors" meant to use the 109 exterior-doors count (not garage doors, 9)?
4. Photo 0 record mismatch: photos.json says Feb 2026, Maple Run, Austin, but its link slug reads "austin-fainwood-siding-mar-26". Confirm month and place before captioning. Photo 3 (second choice) is consistent.
5. The siding FAQ says "415 siding jobs", the code says 431 documented (415 priced). Use "431 documented, 415 priced" and keep the FAQ sentence whole.

## Risks

1. Tile 6 has no honest photo; any caption beyond place, month and trades would be an invented claim.
2. Tile 2 photo shows doors only; a visitor may expect windows. Tiles 3 and 5 may suggest flashing and caulk work the data does not count.
3. Weight: four new masters add about 1.1 MB to a 12.86 MB page; photo 0's record mismatch (Feb vs Mar) could put a wrong month on the first tile.
