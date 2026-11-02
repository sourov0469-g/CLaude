/* FINALIZE · Contact 4 · What happens after you reach out (NEW, two versions). The firm's first two published stages,
   verbatim (FACTS.md "The eight-stage process"): Consultation (week 1) and Site evaluation (week 1-2), and the firm's own
   response line. V1 · the two frames are the Process drawings (the same kit and the same art, lifted from process.js so
   the language is one), drawn in order as they arrive, strokes first. V2 · a vertical thread that draws with the scroll
   from "you reach out" to the two stages. */
(function () {
  var G = 760, FW = 1000;
  function P(d, c) { return '<path class="' + (c || 'd') + '" d="' + d + '"/>'; }
  function C(x, y, r, c) { return '<circle class="' + (c || 'd') + '" cx="' + x + '" cy="' + y + '" r="' + r + '"/>'; }
  function R(x, y, w, h, c, rx) { return '<rect class="' + (c || 'd') + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"' + (rx ? ' rx="' + rx + '"' : '') + '/>'; }
  function T(x, y, s, c, a) { return '<text class="' + (c || 'tx') + '" x="' + x + '" y="' + y + '"' + (a ? ' text-anchor="' + a + '"' : '') + '>' + s + '</text>'; }
  function hat(x, y) {   // hard hat sitting ON the head (brim across the brow): the same rule as the companion
    return P('M' + (x - 25) + ' ' + (y - 6) + ' C' + (x - 25) + ' ' + (y - 34) + ' ' + (x + 25) + ' ' + (y - 34) + ' ' + (x + 25) + ' ' + (y - 6) + ' Z', 'f-clay d') +
      P('M' + (x - 32) + ' ' + (y - 6) + ' H' + (x + 32), 'd');
  }
  // a standing person: feet at (x, G); arms: 'down' | 'point' | 'hold' | 'raise' | 'give'; dir 1 faces right, -1 left
  function stand(x, o) {
    o = o || {}; var d = o.dir || 1, top = G - 220, hy = G - 252, s = '';
    s += P('M' + (x - 12) + ' ' + G + ' L' + (x - 9) + ' ' + (G - 108) + ' M' + (x + 12) + ' ' + G + ' L' + (x + 9) + ' ' + (G - 108));
    s += P('M' + (x - 22) + ' ' + G + ' h-14 M' + (x + 22) + ' ' + G + ' h14');
    s += P('M' + (x - 27) + ' ' + (G - 104) + ' L' + (x - 30) + ' ' + (top + 18) + ' Q' + (x - 30) + ' ' + top + ' ' + (x - 12) + ' ' + top + ' L' + (x + 12) + ' ' + top + ' Q' + (x + 30) + ' ' + top + ' ' + (x + 30) + ' ' + (top + 18) + ' L' + (x + 27) + ' ' + (G - 104) + ' Z', (o.shirt || 'f-sand') + ' d');
    s += C(x, hy, 23, 'f-paper d');
    s += P('M' + (x + d * 9) + ' ' + (hy - 3) + ' v4', 'dt');   // the eye, looking the way it faces
    var sh = top + 14, a = o.arms || 'down';
    if (a === 'down') s += P('M' + (x - 28) + ' ' + sh + ' L' + (x - 34) + ' ' + (G - 100) + ' M' + (x + 28) + ' ' + sh + ' L' + (x + 34) + ' ' + (G - 100));
    if (a === 'point') s += P('M' + (x - 28 * d) + ' ' + sh + ' L' + (x - 34 * d) + ' ' + (G - 100) + ' M' + (x + 28 * d) + ' ' + sh + ' L' + (x + 70 * d) + ' ' + (sh - 30) + ' L' + (x + 112 * d) + ' ' + (sh - 52));
    if (a === 'hold') s += P('M' + (x - 28 * d) + ' ' + sh + ' L' + (x - 30 * d) + ' ' + (G - 112) + ' L' + (x + 20 * d) + ' ' + (G - 132) + ' M' + (x + 28 * d) + ' ' + sh + ' L' + (x + 36 * d) + ' ' + (G - 112) + ' L' + (x + 56 * d) + ' ' + (G - 140));
    if (a === 'raise') s += P('M' + (x - 28 * d) + ' ' + sh + ' L' + (x - 34 * d) + ' ' + (G - 100) + ' M' + (x + 28 * d) + ' ' + sh + ' L' + (x + 48 * d) + ' ' + (sh - 60) + ' L' + (x + 56 * d) + ' ' + (sh - 118));
    if (a === 'give') s += P('M' + (x - 28 * d) + ' ' + sh + ' L' + (x - 34 * d) + ' ' + (G - 100) + ' M' + (x + 28 * d) + ' ' + sh + ' L' + (x + 64 * d) + ' ' + (sh + 40) + ' L' + (x + 104 * d) + ' ' + (sh + 34));
    if (o.hat) s += hat(x, hy - 12);
    return s;
  }
  // a seated person on a chair, facing dir; hands rest on a table at height ty
  function sit(x, d, ty, o) {
    o = o || {}; var seat = G - 120, hy = seat - 168, s = '';
    s += P('M' + (x - 34 * d) + ' ' + G + ' V' + seat + ' H' + (x + 30 * d) + ' V' + G + ' M' + (x - 34 * d) + ' ' + seat + ' V' + (seat - 120), 'd');   // chair
    s += P('M' + (x - 10 * d) + ' ' + (seat - 4) + ' H' + (x + 54 * d) + ' L' + (x + 58 * d) + ' ' + G + ' h' + (16 * d));        // legs
    s += P('M' + (x - 26 * d) + ' ' + (seat - 4) + ' L' + (x - 22 * d) + ' ' + (seat - 118) + ' Q' + (x - 18 * d) + ' ' + (seat - 132) + ' ' + (x - 2 * d) + ' ' + (seat - 132) + ' L' + (x + 14 * d) + ' ' + (seat - 132) + ' Q' + (x + 28 * d) + ' ' + (seat - 128) + ' ' + (x + 30 * d) + ' ' + (seat - 112) + ' L' + (x + 24 * d) + ' ' + (seat - 4) + ' Z', (o.shirt || 'f-sand') + ' d');
    s += C(x + 4 * d, hy, 23, 'f-paper d');
    s += P('M' + (x + 14 * d) + ' ' + (hy - 3) + ' v4', 'dt');
    s += P('M' + (x + 20 * d) + ' ' + (seat - 116) + ' L' + (x + 52 * d) + ' ' + (ty - 10) + ' L' + (x + 92 * d) + ' ' + (ty - 4));                 // arm to the table
    if (o.hat) s += hat(x + 4 * d, hy - 12);
    return s;
  }
  function steam(x, y) { return P('M' + x + ' ' + y + ' c-8 -14 8 -22 0 -36 M' + (x + 12) + ' ' + y + ' c-8 -14 8 -22 0 -36', 'dt steam'); }
  function house(x, w, h, roof, noRight) {   // an elevation: walls, roof, door, two windows
    var y = G - h, s = '';
    s += R(x, y, w, h, 'f-paper d');
    s += P('M' + (x - 30) + ' ' + (y + 6) + ' L' + (x + w / 2) + ' ' + (y - roof) + ' L' + (x + w + 30) + ' ' + (y + 6), 'd roof');
    s += R(x + w / 2 - 34, G - 150, 68, 150, 'f-sand d');
    s += R(x + 40, y + 70, 110, 90, 'f-paper d') + P('M' + (x + 95) + ' ' + (y + 70) + ' v90 M' + (x + 40) + ' ' + (y + 115) + ' h110', 'dt');
    if (!noRight) s += R(x + w - 150, y + 70, 110, 90, 'f-paper d') + P('M' + (x + w - 95) + ' ' + (y + 70) + ' v90 M' + (x + w - 150) + ' ' + (y + 115) + ' h110', 'dt');
    return s;
  }
  function lines(x, y, n, w, gap) { var s = ''; for (var i = 0; i < n; i++) s += P('M' + x + ' ' + (y + i * gap) + ' h' + (w - (i % 3) * 38), 'dt writes'); return s; }
  function tick(x, y) { return P('M' + x + ' ' + y + ' l10 10 l20 -24', 'd tick'); }

  var FR = [];
  // 1 · Consultation: two people at a kitchen table over a drawing; a cup steams; the Elbaz hat rests on the table
  FR.push(function () {
    var s = '';
    s += P('M120 ' + G + ' H880', 'd');                                                       // floor line
    s += R(300, G - 160, 400, 14, 'f-sand d') + P('M330 ' + (G - 146) + ' V' + G + ' M670 ' + (G - 146) + ' V' + G);   // table
    s += sit(250, 1, G - 160, { hat: false, shirt: 'f-clayl' });                              // the homeowner
    s += sit(750, -1, G - 160, { shirt: 'f-sand' });                                          // the Elbaz rep
    s += P('M420 ' + (G - 162) + ' L560 ' + (G - 176) + ' L590 ' + (G - 162) + ' Z', 'f-paper d');   // the drawing on the table
    s += P('M455 ' + (G - 166) + ' h80 M470 ' + (G - 170) + ' h50', 'dt writes');
    s += R(608, G - 186, 22, 26, 'f-paper d', 3) + P('M630 ' + (G - 178) + ' q10 4 0 12', 'd') + steam(612, G - 194);   // cup
    s += P('M652 ' + (G - 160) + ' C652 ' + (G - 186) + ' 700 ' + (G - 186) + ' 700 ' + (G - 160) + ' Z', 'f-clay d') + P('M644 ' + (G - 160) + ' H708', 'd');   // the hat, on the table
    s += P('M180 300 h90 M180 330 h60', 'dt') + R(150, 240, 150, 120, 'd');                   // a window on the wall
    return s;
  });
  // 2 · Site evaluation: the house, a flood line rising, an HVHZ wind arrow, a wall opened to show what is behind it
  FR.push(function () {
    var s = house(220, 520, 300, 150, true);
    s += P('M80 ' + (G - 60) + ' H920', 'dash flood');
    s += T(84, G - 72, 'Flood zone', 'tx tx-s');
    s += P('M760 220 c60 -20 120 20 180 0 M780 260 c50 -16 100 16 150 0', 'd wind') + P('M930 210 l12 10 l-14 8', 'd wind');
    s += T(780, 200, 'HVHZ', 'tx tx-s');
    s += R(590, G - 230, 110, 100, 'f-clayl d') + P('M612 ' + (G - 230) + ' v100 M645 ' + (G - 230) + ' v100 M678 ' + (G - 230) + ' v100', 'dt') + P('M596 ' + (G - 190) + ' h98', 'd pipe');   // the wall opened: studs and a pipe
    s += stand(870, { dir: -1, arms: 'point', hat: true, shirt: 'f-sand' });
    return s;
  });
  EZ.section('contact-next', {
    1: { init: function (root, k) {
      var figs = root.querySelectorAll('.cx__svg');
      figs.forEach(function (svg, i) { svg.innerHTML = FR[i](); });
      k.add(function () { figs.forEach(function (s) { s.innerHTML = ''; }); });
      EZ.reveal(k, root.querySelectorAll('.cx__head > *, .cx__txt'));
      if (!k.motion) return;
      var sts = [];
      figs.forEach(function (svg, i) {
        var dr = svg.querySelectorAll('.d, .dt'), fl = svg.querySelectorAll('[class*="f-"]'), tx = svg.querySelectorAll('.tx, .dash');
        gsap.set(dr, { drawSVG: '0%' }); gsap.set(fl, { fillOpacity: 0 }); gsap.set(tx, { opacity: 0 });
        var tl = gsap.timeline({ paused: true }).to(dr, { drawSVG: '100%', duration: .9, ease: 'power2.inOut', stagger: { amount: .5 } })
          .to(fl, { fillOpacity: 1, duration: .35, stagger: { amount: .2 } }, '-=.4').to(tx, { opacity: 1, duration: .3 }, '-=.2');
        sts.push(ScrollTrigger.create({ trigger: svg, start: 'top 80%', once: true, onEnter: function () { tl.delay(i * .35).play(); } }));
      });
      k.add(function () { sts.forEach(function (s) { s.kill(); }); });
    } },
    2: { init: function (root, k) {
      var line = root.querySelector('.cy__line i'), nodes = root.querySelectorAll('.cy__n');
      EZ.reveal(k, root.querySelectorAll('.cy__head > *'));
      if (!k.motion) return;
      gsap.set(line, { scaleY: 0 }); gsap.set(nodes, { autoAlpha: .25, x: -8 });
      var tl = gsap.timeline().to(line, { scaleY: 1, duration: 1, ease: 'none' }, 0);
      nodes.forEach(function (n, i) { tl.to(n, { autoAlpha: 1, x: 0, duration: .15 }, i * .4); });
      var st = ScrollTrigger.create({ trigger: root.querySelector('.cy__list'), start: 'top 75%', end: 'bottom 60%', scrub: .5, animation: tl });
      k.add(function () { st.kill(); tl.kill(); gsap.set([line, nodes], { clearProps: 'all' }); });
    } }
  });
})();
