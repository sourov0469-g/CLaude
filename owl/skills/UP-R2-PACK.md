# Upgrade Round 2 · Video + Explore skill pack (each read IN FULL by tag, 2026-11-03, this session)

Site level: the 50-skill Round 1 pack stays in force (`UP-R1-HERO-PACK.md`). Added for these two sections, 14 skills:

- ⟦S1018⟧ draggable-accessibility — every drag has a keyboard path: Space/Enter pick up and drop, arrows move, Escape cancels; announce every state change in a live region; grabbed state visible and exposed; instructions available to screen readers.
- ⟦S1107⟧ keyboard-navigation — everything reachable by Tab in visual order; no positive tabindex; hidden content out of the tab order; Escape closes overlays; no traps outside modals.
- ⟦S1190⟧ reduced-motion — no flashing >3/s; replace motion with opacity/colour; safe = opacity, colour, scale <1.1; dangerous = spin, parallax, zoom, bounce; provide a pause control.
- ⟦S1271⟧ video — a VideoObject only where the page truthfully supports it (the crew film is real: name, description, thumbnail, embedUrl). No schema without a real upload date; noted as an owner input rather than invented.
- ⟦S1272⟧ video-accessibility — no autoplay with sound; keyboard play/pause; a text description of what the film shows; embeds keep captions reachable (YouTube `cc_load_policy=1`).
- ⟦S1273⟧ video-captions — captions are required for prerecorded video WITH audio; the on-page crew clip is silent (no audio stream), so it needs a text alternative instead (SC 1.2.1 video-only): a written description of each chapter.
- ⟦S1275⟧ video-thumbnail — every video has a representative poster from the film itself, reserved aspect ratio (no layout shift).
- ⟦S1046⟧ focus-management — modal opens → focus inside; closes → focus back on the trigger; dynamic updates keep focus logical.
- ⟦S0145⟧ immersive — exhibit-style, gamified storytelling with explicit states (default/hover/focus-visible/active/disabled); accessibility wins conflicts.
- ⟦S1443⟧ gesture-patterns — every gesture has a non-gesture alternative; 10–15 px threshold before a drag starts; direction lock against scroll; immediate feedback, snap indicators, completion confirmation; undo.
- ⟦S0187⟧ gsap-timeline — sequence with one timeline and a position parameter (labels, overlaps) instead of chained delays. (Implemented with WAAPI timelines: no GSAP in the single file.)
- ⟦S0544⟧ motion-doctrine — how a scene exits decides how the next enters: same axis, same direction, cut mid-motion; one dominant direction; carriers hand the eye across a change; causal motion (click → squash → release → flight → impact); stillness 0.3–0.75 s before the payoff; entry ≤800 ms, exit ≈75 % of entry, stagger ≤500 ms; no bounce/elastic eases.
- ⟦S0385⟧ webgl-components — one context, one rAF loop; cap ambient loops at 30 fps; cost = fragment shader × area; handle context loss; a real non-WebGL fallback; reduced motion = one still frame; decorative canvases aria-hidden and pointer-events none.
- ⟦S0197⟧ motion-advanced — drag with physics on release; swipe = offset AND velocity thresholds; infinite loops pause on hidden; every listener cleaned up; SVG draw-on via pathLength 0→1; counters ease out.

Critique audit before the gate, as in Round 1: ⟦S1473⟧ ⟦S1479⟧ ⟦S1482⟧ ⟦S1496⟧–⟦S1501⟧.
