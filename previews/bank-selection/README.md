# Research-bank selection: the best of the bank, per industry

Four source packs for a fresh session, one per trade. Each folder holds the picked files copied whole from the research bank, a MANIFEST.md (every pick with a one-line reason and its source link) and WEB-SKILLS.md (the catalog of utmost priority; the old SKILLS-CATALOG was removed 2026-10-28). Nothing in these packs is a build output: no previews, no test builds, no Rembrandt files, no other build-kit files, no nested zips.

A "pick" is one manifest entry. A pick can point at several files (a code-source extract plus the deep-read file that holds its analysis), and one file can serve several picks (an industry report holds every company named in it), so the file counts below are not the pick counts.

## Pick counts per kind

| Industry | Animation | Design | Reverse-engineering | Structure / UI/UX | Total picks |
|---|---|---|---|---|---|
| Roofing | 20 | 4 | 26 | 15 | **65** |
| HVAC | 10 | 1 | 23 | 18 | **52** |
| Siding, windows and doors | 13 | 6 | 8 | 33 | **60** |
| Remodeling | 17 | 15 | 8 | 32 | **72** |

## Source-link coverage

Every link is copied from the bank (scan CSV url column, deep-read entry, candidates-master.csv). "None recorded" is written wherever the bank holds no link; no URL was reconstructed.

| Industry | Picks with a source link | Picks with none recorded | Why the none-recorded ones have none |
|---|---|---|---|
| Roofing | 49 | 16 | compilations (reports, libraries, whole deep-read files) whose per-entry links sit inside the file or on the entry picks; one pen with only its id recorded |
| HVAC | 37 | 15 | compilations (reports, libraries, whole deep-read files) whose per-entry links sit inside the file or on the entry picks; one pen with only its id recorded |
| Siding, windows and doors | 44 | 16 | compilations (reports, libraries, whole deep-read files) whose per-entry links sit inside the file or on the entry picks; one pen with only its id recorded |
| Remodeling | 53 | 19 | compilations (reports, libraries, whole deep-read files) whose per-entry links sit inside the file or on the entry picks; one pen with only its id recorded |

## Packs

| Industry | Folder | Files in pack | Unzipped size | Zip | Zip size |
|---|---|---|---|---|---|
| Roofing | `roofing/` | 160 | 13.1 MB | `roofing.zip` | 2.8 MB |
| HVAC | `hvac/` | 119 | 13.7 MB | `hvac.zip` | 2.7 MB |
| Siding, windows and doors | `siding-windows-doors/` | 96 | 5.2 MB | `siding-windows-doors.zip` | 1.3 MB |
| Remodeling | `remodeling/` | 164 | 8.4 MB | `remodeling.zip` | 2.2 MB |

All four zips were verified with `zip -T` and `unzip -t` (no errors).

See CURATION-NOTE.md for what was chosen and why, where the packs are thin, and what a fresh session must know before using them.
