/* Reaction rig, FULL BUILD Phase 3: every interactive element gets its own drawn reaction.
   A rig reaction is written data-rx="~sprite/carrier/beat/anchor": the SUBJECT it draws (sprite, one per meaning:
   the room a tab opens, the field a box takes, the place a link goes), HOW it arrives on hover/focus (carrier),
   WHAT it does on click/tap (beat), and WHERE on the element it sits (anchor). No two elements on the page share
   the same four; a check script proves it. Carriers and beats were chosen so none replays a section centrepiece,
   a divider or the cursor (PLAN-FULL §2). Entrances are dosed at .18-.3s [BANK-MAP F17 / §4 dosing].
   Mechanism refs: [BANK] 147 Shape Hover (backout), [BANK] 151 elastic two-stage press, S0634 click-burst/ripple,
   S0409 success check, [BANK] 229 asymmetric hover (in / out 2.5x). */
(function () {
  var INK = '#0B1418', YEL = '#f2c230', STEEL = '#c9d1d3', BLUE = '#2b6a96', RED = '#e2412b', WOOD = '#b07a45', TEAL = '#77b3b8', PAPER = '#f6f1e4', GRN = '#3f8a5a';
  var o = ' stroke="' + INK + '" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"';
  function c(fill) { return ' fill="' + fill + '"' + o; }
  var N = ' fill="none"' + o;

  /* ---------- sprites: subjects, drawn at 0,0 inside about 28 x 28 ---------- */
  var S = {
    wrench: '<path d="M-10 9l11-11a6 6 0 1 1 3 3l-11 11z"' + c(STEEL) + '/><circle cx="7" cy="-7" r="2"' + c(PAPER) + '/>',
    camera: '<rect x="-12" y="-7" width="24" height="16" rx="2"' + c(STEEL) + '/><rect x="-5" y="-11" width="10" height="5"' + c(STEEL) + '/><circle cx="0" cy="1" r="5"' + c(BLUE) + '/>',
    gear: '<path d="M0-12l3 4 5-1 1 5 4 3-3 4 1 5-5 1-3 4-3-4-5-1 1-5-4-3 4-3-1-5 5 1z"' + c(STEEL) + '/><circle r="4"' + c(PAPER) + '/>',
    ledger: '<rect x="-10" y="-12" width="20" height="24" rx="1"' + c(PAPER) + '/><path d="M-6-6h12M-6-1h12M-6 4h8"' + N + '/><path d="M-10-12v24" stroke="' + RED + '" stroke-width="2.4"/>',
    star: '<path d="M0-12l3.5 7.5 8 .8-6 5.4 1.8 8L0 5.6-7.3 9.7l1.8-8-6-5.4 8-.8z"' + c(YEL) + '/>',
    handset: '<path d="M-9-11q-6 11 0 22l6-2 2-7-4-2q-1-3 0-6l4-2-2-7z"' + c(YEL) + '/>',
    cord: '<path d="M-12 0q3-8 6 0t6 0 6 0 6 0"' + N + '/><rect x="9" y="-5" width="6" height="10" rx="2"' + c(YEL) + '/>',
    plug: '<rect x="-8" y="-6" width="12" height="12" rx="2"' + c(STEEL) + '/><path d="M4-3h7M4 3h7"' + N + '/><path d="M-8 0h-6"' + N + '/>',
    crane: '<path d="M-10 12v-24h20M-10-8l6-4M6-12v8"' + N + '/><path d="M6-4q0 4-3 4"' + N + '/>',
    ladder: '<path d="M-6-13v26M6-13v26M-6-8h12M-6-2h12M-6 4h12M-6 10h12"' + N + '/>',
    xbrace: '<path d="M-10-10l20 20M10-10l-20 20"' + o + ' fill="none" stroke-width="3"/><rect x="-12" y="-12" width="24" height="24"' + N + '/>',
    swap: '<path d="M-10-4h18l-4-4M10 4h-18l4 4"' + N + '/>',
    compass: '<circle r="11"' + c(PAPER) + '/><path d="M0-8l3 8-3 8-3-8z"' + c(RED) + '/>',
    moon: '<path d="M4-11a11 11 0 1 0 7 17a9 9 0 0 1-7-17z"' + c(YEL) + '/>',
    sun: '<circle r="6"' + c(YEL) + '/><path d="M0-13v3M0 10v3M-13 0h3M10 0h3M-9-9l2 2M7 7l2 2M9-9l-2 2M-7 7l-2 2"' + N + '/>',
    play: '<circle r="11"' + c(TEAL) + '/><path d="M-3-6l9 6-9 6z"' + c(PAPER) + '/>',
    pause: '<circle r="11"' + c(STEEL) + '/><path d="M-4-6v12M4-6v12"' + o + ' stroke-width="3"/>',
    calendar: '<rect x="-11" y="-9" width="22" height="20" rx="2"' + c(PAPER) + '/><path d="M-11-3h22"' + N + '/><path d="M-6-12v5M6-12v5"' + N + '/><path d="M-4 3l3 3 6-6"' + o + ' fill="none" stroke="' + GRN + '"/>',
    flag: '<path d="M-8 13v-26"' + N + '/><path d="M-8-13h16l-4 5 4 5h-16z"' + c(RED) + '/>',
    globe: '<circle r="11"' + c(TEAL) + '/><path d="M-11 0h22M0-11q-7 11 0 22M0-11q7 11 0 22"' + N + '/>',
    speech: '<path d="M-11-9h22v14h-12l-6 5v-5h-4z"' + c(PAPER) + '/><path d="M-6-3h12M-6 1h7"' + N + '/>',
    briefcase: '<rect x="-12" y="-6" width="24" height="16" rx="2"' + c(WOOD) + '/><path d="M-4-6v-4h8v4M-12 1h24"' + N + '/>',
    shield: '<path d="M0-12l10 4v6q0 9-10 14q-10-5-10-14v-6z"' + c(TEAL) + '/><path d="M-4 0l3 3 6-6"' + o + ' fill="none" stroke="' + PAPER + '" stroke-width="2"/>',
    magnifier: '<circle cx="-3" cy="-3" r="7"' + c(PAPER) + '/><path d="M2 2l9 9"' + o + ' stroke-width="3"/>',
    map: '<path d="M-12-9l8-3 8 3 8-3v21l-8 3-8-3-8 3z"' + c(PAPER) + '/><path d="M-4-12v21M4-9v21"' + N + '/>',
    hood: '<path d="M-4-12h8v6l8 10h-24l8-10z"' + c(STEEL) + '/><path d="M-12 4h24v4h-24z"' + c(BLUE) + '/>',
    shower: '<path d="M-10 12v-18q0-6 6-6h6"' + N + '/><path d="M0-9h10l-2 5h-6z"' + c(STEEL) + '/><path d="M2-1v3M5-1v4M8-1v3"' + o + ' stroke="' + BLUE + '"/>',
    house: '<path d="M-11 0l11-11 11 11v12h-22z"' + c(PAPER) + '/><rect x="-3" y="3" width="6" height="9"' + c(WOOD) + '/>',
    house2: '<path d="M-12 1l12-10 12 10"' + N + '/><rect x="-8" y="1" width="16" height="11"' + c(TEAL) + '/><path d="M-2 12v-6h4v6"' + N + '/>',
    drill: '<path d="M-12-6h16v8h-16z"' + c(YEL) + '/><path d="M-8 2l2 10h5l-1-10"' + c(INK) + '/><path d="M4-2h9"' + o + ' stroke-width="2.4"/>',
    chisel: '<rect x="-12" y="-3" width="12" height="6" rx="2"' + c(WOOD) + '/><path d="M0-2h10l3 2-3 2h-10z"' + c(STEEL) + '/>',
    plane: '<path d="M-12 4h24v5h-24z"' + c(WOOD) + '/><path d="M-6 4q2-10 10-8l2 8"' + c(RED) + '/>',
    sink: '<path d="M-12-2h24q0 10-12 10t-12-10z"' + c(STEEL) + '/><path d="M2-2v-8q0-3-4-3"' + N + '/>',
    palm: '<path d="M0 12q2-10 0-16"' + o + ' fill="none" stroke="' + WOOD + '" stroke-width="2.4"/><path d="M0-4q-8-8-13-2M0-4q8-8 13-2M0-4q-3-9-8-9M0-4q3-9 8-9"' + o + ' fill="none" stroke="' + GRN + '" stroke-width="2"/>',
    bucket: '<path d="M-9-6h18l-2 18h-14z"' + c(TEAL) + '/><path d="M-9-6q9-10 18 0"' + N + '/>',
    arrowL: '<circle r="11"' + c(PAPER) + '/><path d="M5 0h-10m4-5l-5 5 5 5"' + N + '/>',
    arrowR: '<circle r="11"' + c(PAPER) + '/><path d="M-5 0h10m-4-5l5 5-5 5"' + N + '/>',
    card: '<rect x="-12" y="-8" width="24" height="16" rx="2"' + c(BLUE) + '/><path d="M-12-3h24"' + o + ' stroke-width="3"/><rect x="-8" y="2" width="6" height="3"' + c(YEL) + '/>',
    leaf: '<path d="M-10 10q0-20 20-20q0 20-20 20z"' + c(GRN) + '/><path d="M-10 10l12-12"' + N + '/>',
    window: '<rect x="-10" y="-11" width="20" height="22"' + c(TEAL) + '/><path d="M0-11v22M-10 0h20"' + N + '/>',
    grid: '<rect x="-11" y="-11" width="9" height="9"' + c(PAPER) + '/><rect x="2" y="-11" width="9" height="9"' + c(TEAL) + '/><rect x="-11" y="2" width="9" height="9"' + c(TEAL) + '/><rect x="2" y="2" width="9" height="9"' + c(PAPER) + '/>',
    bed: '<path d="M-12 8v-14M-12 2h24v6"' + N + '/><rect x="-9" y="-4" width="7" height="6" rx="2"' + c(PAPER) + '/><path d="M-2-2h14v4h-14z"' + c(BLUE) + '/>',
    sofa: '<path d="M-12 8v-10h4v5h16v-5h4v10z"' + c(TEAL) + '/><path d="M-8-2v-5h16v5"' + N + '/>',
    question: '<circle r="11"' + c(YEL) + '/><path d="M-4-4q0-5 4-5t4 4q0 3-4 4v3"' + N + '/><circle cx="0" cy="7" r="1.2" fill="' + INK + '"/>',
    badge: '<rect x="-9" y="-12" width="18" height="24" rx="2"' + c(PAPER) + '/><circle cx="0" cy="-3" r="4"' + c(TEAL) + '/><path d="M-5 6h10"' + N + '/>',
    envelope: '<rect x="-12" y="-8" width="24" height="16"' + c(PAPER) + '/><path d="M-12-8l12 9 12-9"' + N + '/>',
    check: '<rect x="-10" y="-10" width="20" height="20" rx="2"' + c(PAPER) + '/><path d="M-5 0l4 4 7-8"' + o + ' fill="none" stroke="' + GRN + '" stroke-width="2.4"/>',
    mailbox: '<path d="M-10 12v-8M-12-8h16a6 6 0 0 1 6 6v6h-22z"' + c(BLUE) + '/><path d="M4-8v-5h6v3h-6"' + c(RED) + '/>',
    stairs: '<path d="M-12 12v-6h6v-6h6v-6h6v-6h6v24z"' + c(WOOD) + '/>',
    ruler: '<rect x="-13" y="-4" width="26" height="8"' + c(YEL) + '/><path d="M-9-4v4M-5-4v2M-1-4v4M3-4v2M7-4v4"' + N + '/>',
    sketch: '<rect x="-10" y="-12" width="20" height="24"' + c(PAPER) + '/><path d="M-6 4q3-8 6-2t6-4"' + N + '/>',
    coin: '<ellipse cx="0" cy="4" rx="10" ry="4"' + c(YEL) + '/><ellipse cx="0" cy="0" rx="10" ry="4"' + c(YEL) + '/><ellipse cx="0" cy="-4" rx="10" ry="4"' + c(YEL) + '/>',
    rivet: '<path d="M-12 4h24"' + o + ' stroke-width="3"/><path d="M-5 4a5 5 0 0 1 10 0z"' + c(STEEL) + '/><path d="M-1 4v8h2v-8"' + c(STEEL) + '/>',
    pipe: '<path d="M-12-3h14v-9h6v15h-20z"' + c(STEEL) + '/>',
    lock: '<rect x="-8" y="-2" width="16" height="13" rx="2"' + c(YEL) + '/><path d="M-5-2v-4a5 5 0 0 1 10 0v4"' + N + '/>',
    bulb: '<path d="M-6 2a8 8 0 1 1 12 0l-2 5h-8z"' + c(YEL) + '/><path d="M-3 10h6"' + N + '/>',
    clamp: '<path d="M-10-12h14v6h-8v12h8v6h-14z"' + c(BLUE) + '/><path d="M4-6v12"' + o + ' stroke-width="3"/>',
    sawhorse: '<path d="M-12-6h24"' + o + ' stroke-width="4" stroke="' + WOOD + '"/><path d="M-8-6l-4 18M-8-6l2 18M8-6l-2 18M8-6l4 18"' + N + '/>',
    barrow: '<path d="M-12-4h18l-4 8h-10z"' + c(GRN) + '/><circle cx="2" cy="8" r="3"' + c(STEEL) + '/><path d="M6-4l7-4"' + N + '/>',
    spacer: '<path d="M-3-12h6v9h9v6h-9v9h-6v-9h-9v-6h9z"' + c(PAPER) + '/>',
    nut: '<path d="M-6-10h12l6 10-6 10h-12l-6-10z"' + c(STEEL) + '/><circle r="4"' + c(PAPER) + '/>',
    caulk: '<rect x="-12" y="-5" width="16" height="10"' + c(PAPER) + '/><path d="M4-3l9 3-9 3z"' + c(STEEL) + '/>',
    hose: '<path d="M-12 8q0-16 12-12t10-6"' + o + ' fill="none" stroke="' + GRN + '" stroke-width="3"/><rect x="8" y="-14" width="5" height="7"' + c(STEEL) + '/>',
    sander: '<rect x="-12" y="2" width="24" height="6"' + c(STEEL) + '/><path d="M-8 2v-6q0-6 8-6h4v12"' + c(RED) + '/>',
    tag: '<path d="M-12-6h16l8 6-8 6h-16z"' + c(PAPER) + '/><circle cx="6" cy="0" r="1.6" fill="' + INK + '"/>',
    mixer: '<path d="M-10 10l4-14h12l4 14z"' + c(STEEL) + '/><path d="M-4-4l4-8 4 8"' + N + '/>',
    goggles: '<rect x="-12" y="-5" width="10" height="10" rx="4"' + c(TEAL) + '/><rect x="2" y="-5" width="10" height="10" rx="4"' + c(TEAL) + '/><path d="M-2 0h4"' + N + '/>',
    vest: '<path d="M-10-12l5 3h10l5-3v24h-20z"' + c('#f08a2b') + '/><path d="M-10 0h20"' + o + ' stroke="' + STEEL + '" stroke-width="2.4"/>',
    gloves: '<path d="M-8 12v-12l-2-8 3-1 2 6v-8h3v8l1-9h3l-1 10 3-6 3 1-4 9v10z"' + c(YEL) + '/>',
    toolbox: '<rect x="-12" y="-4" width="24" height="14"' + c(RED) + '/><path d="M-5-4v-5h10v5M-12 2h24"' + N + '/>',
    plumb: '<path d="M0-13v8"' + N + '/><path d="M-5-5h10l-5 15z"' + c(YEL) + '/>',
    socket: '<rect x="-11" y="-11" width="22" height="22" rx="3"' + c(PAPER) + '/><path d="M-4-4v4M4-4v4M-2 5h4"' + N + '/>',
    wheel: '<circle r="11"' + c(STEEL) + '/><circle r="3"' + c(INK) + '/><path d="M0-11v22M-11 0h22"' + N + '/>'
  };
  // text plates: ~t:P-01 draws a tag carrying that text (codes, county marks, version digits)
  function textSprite(t) {
    var w = Math.max(18, t.length * 7 + 8);
    return '<rect x="' + (-w / 2) + '" y="-9" width="' + w + '" height="18" rx="2"' + c(YEL) + '/>' +
      '<text x="0" y="4.5" text-anchor="middle" font-family="Bebas Neue, sans-serif" font-size="14" fill="' + INK + '">' + t.replace(/[<&]/g, '') + '</text>';
  }

  /* ---------- anchors: where ON the element the subject lives [AUDIT-01 A.8: drawn on or in the control] ----------
     corners sit on the control's own corner, sides on its own edge (half inside, half on the border) */
  function anchor(a, w, h, P) {
    var m = { tl: [P + 4, P + 4], tr: [P + w - 4, P + 4], bl: [P + 4, P + h - 4], br: [P + w - 4, P + h - 4],
      l: [P + 2, P + h / 2], r: [P + w - 2, P + h / 2], t: [P + w / 2, P + 1], b: [P + w / 2, P + h - 1] };
    return m[a] || m.r;
  }
  // the construction line the hover draws ON the control, starting at the anchor: an outline inset 2.5px on boxes,
  // a dimension line with end ticks under text links (no box to draw on)
  function face(a, w, h, P, box) {
    if (!box) {
      var y = P + h + 1;
      return a === 'l' || a === 'tl' || a === 'bl'
        ? 'M' + P + ' ' + (y - 3) + 'v6M' + P + ' ' + y + 'H' + (P + w) + 'M' + (P + w) + ' ' + (y - 3) + 'v6'
        : 'M' + (P + w) + ' ' + (y - 3) + 'v6M' + (P + w) + ' ' + y + 'H' + P + 'M' + P + ' ' + (y - 3) + 'v6';
    }
    var i = 2.5, x0 = P + i, y0 = P + i, x1 = P + w - i, y1 = P + h - i;
    var start = { tl: [x0, y0, 'H' + x1 + 'V' + y1 + 'H' + x0 + 'V' + y0], tr: [x1, y0, 'V' + y1 + 'H' + x0 + 'V' + y0 + 'H' + x1],
      br: [x1, y1, 'H' + x0 + 'V' + y0 + 'H' + x1 + 'V' + y1], bl: [x0, y1, 'V' + y0 + 'H' + x1 + 'V' + y1 + 'H' + x0],
      t: [P + w / 2, y0, 'H' + x1 + 'V' + y1 + 'H' + x0 + 'V' + y0 + 'H' + (P + w / 2)], b: [P + w / 2, y1, 'H' + x0 + 'V' + y0 + 'H' + x1 + 'V' + y1 + 'H' + (P + w / 2)],
      l: [x0, P + h / 2, 'V' + y0 + 'H' + x1 + 'V' + y1 + 'H' + x0 + 'V' + (P + h / 2)], r: [x1, P + h / 2, 'V' + y1 + 'H' + x0 + 'V' + y0 + 'H' + x1 + 'V' + (P + h / 2)] }[a] || null;
    if (!start) start = [x1, P + h / 2, 'V' + y1 + 'H' + x0 + 'V' + y0 + 'H' + x1 + 'V' + (P + h / 2)];
    return 'M' + start[0] + ' ' + start[1] + start[2];
  }

  /* ---------- carriers: how the subject arrives (hover / focus) ---------- */
  // each returns a paused timeline acting on g (the sprite group at its anchor) and extras drawn in x
  var C = {
    drop: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { y: -34, opacity: 0 }, { y: 0, opacity: 1, duration: .28, ease: 'back.out(2.2)' }); },
    swing: function (g, x) {
      return gsap.timeline({ paused: true }).set(x, { opacity: 1 }).fromTo(x, { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: .14 })
        .fromTo(g, { rotation: -70, opacity: 0, transformOrigin: '50% -120%' }, { rotation: 0, opacity: 1, duration: .3, ease: 'back.out(3)' }, 0);
    },
    rail: function (g, x, d) {
      return gsap.timeline({ paused: true }).set(x, { opacity: 1 }).fromTo(x, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: .2, ease: 'power2.out' })
        .fromTo(g, { x: -d.w - 20, opacity: 0 }, { x: 0, opacity: 1, duration: .28, ease: 'power3.out' }, 0);
    },
    spin: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { rotation: -270, scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { rotation: 0, scale: 1, opacity: 1, duration: .3, ease: 'power3.out' }); },
    jack: function (g, x) {
      return gsap.timeline({ paused: true }).set(x, { opacity: 1 }).fromTo(x, { scaleY: .1, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .25, ease: 'power2.out' })
        .fromTo(g, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .25, ease: 'power2.out' }, 0);
    },
    hinge: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { scaleX: 0, opacity: 0, transformOrigin: '0% 50%' }, { scaleX: 1, opacity: 1, duration: .26, ease: 'back.out(1.8)' }); },
    roll: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { x: 46, rotation: 300, opacity: 0, transformOrigin: '50% 50%' }, { x: 0, rotation: 0, opacity: 1, duration: .3, ease: 'power2.out' }); },
    lid: function (g, x) {
      return gsap.timeline({ paused: true }).set(x, { opacity: 1 }).fromTo(x.querySelector('.lid'), { rotation: 0 }, { rotation: -110, transformOrigin: '0% 100%', duration: .16 })
        .fromTo(g, { y: 16, scale: .4, opacity: 0, transformOrigin: '50% 100%' }, { y: -6, scale: 1, opacity: 1, duration: .24, ease: 'back.out(2.5)' }, .06);
    },
    zip: function (g, x) {
      return gsap.timeline({ paused: true }).set(x, { opacity: 1 }).fromTo(x, { drawSVG: '0%' }, { drawSVG: '100%', duration: .18 })
        .fromTo(g, { x: -40, y: -40, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .24, ease: 'power3.out' }, 0);
    },
    unfold: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { scaleY: 0, opacity: 0, transformOrigin: '50% 100%' }, { scaleY: 1, opacity: 1, duration: .24, ease: 'back.out(2)' }); },
    hoist: function (g, x) {
      return gsap.timeline({ paused: true }).set(x, { opacity: 1 }).fromTo(x, { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: .22, ease: 'power2.out' })
        .fromTo(g, { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: .2, ease: 'power2.out' }, 0)
        .fromTo(g, { rotation: 8, transformOrigin: '50% -150%' }, { rotation: 0, duration: .14, ease: 'power2.out' }, .16);
    },
    pop: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: .25, ease: 'back.out(3.4)' }); },
    tilt: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { y: 14, rotation: 35, opacity: 0, transformOrigin: '0% 100%' }, { y: 0, rotation: 0, opacity: 1, duration: .26, ease: 'power3.out' }); },
    orbit: function (g, x, d) {
      var r = { v: 0 }, a0 = Math.PI * 1.5;
      return gsap.timeline({ paused: true }).set(g, { opacity: 1 }).fromTo(r, { v: 1 }, { v: 0, duration: .3, ease: 'power2.out',
        onUpdate: function () { var a = a0 + r.v * Math.PI * 2; gsap.set(g, { x: Math.cos(a) * 18 * r.v, y: (Math.sin(a) + 1) * 18 * r.v, scale: 1 - r.v * .5 }); } });
    },
    neon: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { opacity: 0 }, { keyframes: [{ opacity: .8, duration: .05 }, { opacity: .1, duration: .05 }, { opacity: 1, duration: .05 }, { opacity: .4, duration: .04 }, { opacity: 1, duration: .08 }] }); },
    frame: function (g, x) {
      return gsap.timeline({ paused: true }).set(x, { opacity: 1 }).fromTo(x.children, { scale: 1.5, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: .22, ease: 'power3.out' })
        .fromTo(g, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .2 }, .08);
    },
    slide: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { x: -24, opacity: 0, clipPath: 'inset(0 0 0 100%)' }, { x: 0, opacity: 1, clipPath: 'inset(0 0 0 0%)', duration: .24, ease: 'power3.out' }); },
    bounce: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: .3, ease: 'bounce.out' }); },
    peek: function (g) { return gsap.timeline({ paused: true }).fromTo(g, { y: 18, opacity: 0, scaleY: .6, transformOrigin: '50% 100%' }, { y: 0, opacity: 1, scaleY: 1, duration: .22, ease: 'power2.out' }); }
  };
  // carrier furniture drawn around the anchor (string, rail, box, line)
  function extra(cn, ax, ay, w, h, P) {
    switch (cn) {
      case 'swing': return '<path d="M' + ax + ' ' + (ay - 22) + 'V' + (ay - 9) + '"' + N + '/>';
      case 'hoist': return '<path d="M' + ax + ' ' + (ay - 26) + 'V' + (ay - 9) + '"' + N + ' stroke-dasharray="2 2"/>';
      case 'rail': return '<path d="M' + P + ' ' + (P + h - 3) + 'H' + (P + w) + '"' + o + ' stroke="currentColor" stroke-width="1.6"/>';
      case 'jack': return '<path d="M' + (ax - 6) + ' ' + (ay + 26) + 'l12-5-12-5 12-5"' + N + '/>';
      case 'lid': return '<rect x="' + (ax - 10) + '" y="' + (ay + 8) + '" width="20" height="9"' + c(RED) + '/><rect class="lid" x="' + (ax - 10) + '" y="' + (ay + 5) + '" width="20" height="3"' + c(RED) + '/>';
      case 'zip': return '<path d="M' + (ax - 24) + ' ' + (ay - 24) + 'L' + ax + ' ' + ay + '"' + o + ' fill="none" stroke="currentColor" stroke-dasharray="3 3"/>';
      case 'frame':
        var k = 8, x0 = P + 3, y0 = P + 3, x1 = P + w - 3, y1 = P + h - 3;
        return '<path d="M' + x0 + ' ' + (y0 + k) + 'V' + y0 + 'H' + (x0 + k) + '"' + o + ' fill="none" stroke="currentColor"/><path d="M' + (x1 - k) + ' ' + y0 + 'H' + x1 + 'V' + (y0 + k) + '"' + o + ' fill="none" stroke="currentColor"/>' +
          '<path d="M' + x1 + ' ' + (y1 - k) + 'V' + y1 + 'H' + (x1 - k) + '"' + o + ' fill="none" stroke="currentColor"/><path d="M' + (x0 + k) + ' ' + y1 + 'H' + x0 + 'V' + (y1 - k) + '"' + o + ' fill="none" stroke="currentColor"/>';
    }
    return '';
  }

  /* ---------- beats: what a click / tap does ---------- */
  var B = {
    burst: function (g, x) { return gsap.timeline().set(x, { opacity: 1 }).fromTo(x.children, { scale: .2, opacity: 1, transformOrigin: '0% 50%' }, { scale: 1.4, opacity: 0, duration: .35, ease: 'expo.out', stagger: .015 }); },
    puff: function (g, x) { return gsap.timeline().set(x, { opacity: 1 }).fromTo(x.children, { scale: .3, opacity: .9, transformOrigin: '50% 50%' }, { scale: 2, opacity: 0, duration: .45, ease: 'power2.out', stagger: .05 }); },
    tick: function (g, x) { return gsap.timeline().set(x, { opacity: 1 }).fromTo(x.firstChild, { drawSVG: '0%' }, { drawSVG: '100%', duration: .22 }).to(x, { opacity: 0, duration: .2 }, .7); },
    ring: function (g, x) { return gsap.timeline().set(x, { opacity: 1 }).fromTo(x.firstChild, { scale: .4, opacity: 1, transformOrigin: '50% 50%' }, { scale: 2.2, opacity: 0, duration: .45, ease: 'expo.out' }); },
    wobble: function (g) { return gsap.timeline().to(g, { keyframes: [{ rotation: -16 }, { rotation: 12 }, { rotation: -6 }, { rotation: 0 }], duration: .4, transformOrigin: '50% 50%' }); },
    hop: function (g) { return gsap.timeline().to(g, { y: -12, duration: .14, ease: 'power2.out' }).to(g, { y: 0, duration: .26, ease: 'bounce.out' }); },
    spinout: function (g) { return gsap.timeline().fromTo(g, { rotation: 0 }, { rotation: 360, transformOrigin: '50% 50%', duration: .45, ease: 'power3.inOut' }); },
    drip: function (g, x) { return gsap.timeline().set(x, { opacity: 1 }).fromTo(x.firstChild, { y: 0, opacity: 1 }, { y: 26, opacity: 0, duration: .5, ease: 'power2.in' }); },
    chips: function (g, x) { return gsap.timeline().set(x, { opacity: 1 }).fromTo(x.children, { x: 0, y: 0, opacity: 1, rotation: 0 }, { x: function (i) { return (i - 2) * 7; }, y: 26, rotation: 200, opacity: 0, duration: .5, ease: 'power2.in', stagger: .02 }); },
    flash: function (g, x) { return gsap.timeline().set(x, { opacity: 1 }).fromTo(x.firstChild, { opacity: .9, scale: .6, transformOrigin: '50% 50%' }, { opacity: 0, scale: 1.6, duration: .3 }); },
    sweep: function (g, x) { return gsap.timeline().set(x, { opacity: 1 }).fromTo(x.firstChild, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: .2 }).to(x.firstChild, { drawSVG: '100% 100%', duration: .2 }); },
    sparkle: function (g, x) { return gsap.timeline().set(x, { opacity: 1 }).fromTo(x.children, { scale: 0, rotation: 0, transformOrigin: '50% 50%' }, { scale: 1, rotation: 90, duration: .22, stagger: .06, yoyo: true, repeat: 1 }); },
    squash: function (g) { return gsap.timeline().to(g, { scaleY: .6, scaleX: 1.25, transformOrigin: '50% 100%', duration: .1 }).to(g, { scaleY: 1, scaleX: 1, duration: .35, ease: 'elastic.out(1.2,.35)' }); },
    shake: function (g) { return gsap.timeline().to(g, { keyframes: [{ x: -4 }, { x: 4 }, { x: -3 }, { x: 3 }, { x: 0 }], duration: .3 }); }
  };
  function beatArt(bn, ax, ay, w, h, P) {
    var s = '', i, a;
    switch (bn) {
      case 'burst': for (i = 0; i < 6; i++) { a = i / 6 * Math.PI * 2; s += '<path d="M' + (ax + Math.cos(a) * 16) + ' ' + (ay + Math.sin(a) * 16) + 'l' + (Math.cos(a) * 8) + ' ' + (Math.sin(a) * 8) + '" stroke="' + YEL + '" stroke-width="2" stroke-linecap="round"/>'; } return s;
      case 'puff': for (i = 0; i < 3; i++) s += '<circle cx="' + (ax - 8 + i * 8) + '" cy="' + (ay + 10) + '" r="4" fill="' + STEEL + '" opacity=".8"/>'; return s;
      case 'tick': return '<path d="M' + (ax + 12) + ' ' + (ay - 14) + 'l5 5 10-11" fill="none" stroke="' + GRN + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>';
      case 'ring': return '<circle cx="' + ax + '" cy="' + ay + '" r="12" fill="none" stroke="currentColor" stroke-width="2"/>';
      case 'drip': return '<path d="M' + ax + ' ' + (ay + 12) + 'q-4 6 0 8q4-2 0-8z" fill="' + BLUE + '"/>';
      case 'chips': for (i = 0; i < 5; i++) s += '<rect x="' + (ax - 2) + '" y="' + (ay + 8) + '" width="4" height="3" fill="' + WOOD + '"/>'; return s;
      case 'flash': return '<circle cx="' + ax + '" cy="' + ay + '" r="16" fill="' + YEL + '" opacity=".6"/>';
      case 'sweep': return '<path d="M' + (P + 4) + ' ' + (P + h - 4) + 'H' + (P + w - 4) + '" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>';
      case 'sparkle': for (i = 0; i < 3; i++) s += '<path transform="translate(' + (ax - 16 + i * 16) + ' ' + (ay - 18 + (i % 2) * 6) + ')" d="M0-5L1.4-1.4 5 0 1.4 1.4 0 5-1.4 1.4-5 0-1.4-1.4z" fill="' + YEL + '"/>'; return s;
    }
    return '';
  }

  EZ.RIG = { S: S, C: C, B: B };
  // def compatible with react.js: art / hover / click
  EZ.rigDef = function (spec, P) {
    var p = spec.slice(1).split('/'), sn = p[0], cn = p[1] || 'pop', bn = p[2] || 'hop', an = p[3] || 'r';
    var spr = sn.indexOf('t:') === 0 ? textSprite(sn.slice(2)) : S[sn];
    if (!spr || !C[cn] || !B[bn]) return null;
    var ax, ay;
    return {
      art: function (w, h, el) {
        var A = anchor(an, w, h, P); ax = A[0]; ay = A[1];
        var box = !el || !el.matches('a:not(.btn)') || el.matches('[class*="__"]:not(.link)') && el.getBoundingClientRect().height > 30;
        return '<path class="rg-f" d="' + face(an, w, h, P, box) + '" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="square"/>' +
          '<g class="rg-x" opacity="0">' + extra(cn, ax, ay, w, h, P) + '</g>' +
          '<g class="rg-b" opacity="0">' + beatArt(bn, ax, ay, w, h, P) + '</g>' +
          '<g transform="translate(' + ax + ' ' + ay + ') scale(' + Math.max(.55, Math.min(.85, h / 52)).toFixed(2) + ')"><g class="rg-s" opacity="0">' + spr + '</g></g>';
      },
      hover: function (svg, w, h) {
        // the construction line is drawn on the control from the anchor, in step with the subject's arrival
        return C[cn](svg.querySelector('.rg-s'), svg.querySelector('.rg-x'), { w: w, h: h })
          .fromTo(svg.querySelector('.rg-f'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .2, ease: 'power2.out', immediateRender: true }, 0);
      },
      click: function (svg) {
        var g = svg.querySelector('.rg-s'), x = svg.querySelector('.rg-b');
        gsap.set(g, { opacity: 1 });
        return B[bn](g, x).add(function () { gsap.set(x, { opacity: 0 }); });
      }
    };
  };
})();
