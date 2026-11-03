/* FINALIZE · Home 5 · Process: eight frames of one continuous drawn site; the camera travels across it while the
   section is pinned, each frame draws itself as it arrives (strokes first, then fills [S0362]), the words stay still
   and swap per stage, and the week marks land on the rail. One pinned master timeline, scrubbed, reversible
   [S1326, S0186 ease none, S1209 finite pin: ~1 viewport per frame]. Phones and reduced motion: the ordered list is the
   story, each stage gets its own frame drawn inline (no pin). The companion watches from the corner during the pin. */
(function () {
  var NS = 'http://www.w3.org/2000/svg', G = 760, FW = 1000;

  /* ---------- the drawing kit (one language: ink line 3.2, sand and paper fills, one clay accent) ---------- */
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

  /* ---------- the eight frames ---------- */
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
  // 3 · Design and planning: a plan drawing (walls, a door swing, an island), dimensions, a fan of finish swatches
  FR.push(function () {
    var s = '';
    s += R(150, 160, 520, 420, 'f-paper d') + P('M150 160 h520 v420 h-520 z', 'd wall');
    s += P('M150 360 h160 M400 360 h270', 'd wall') + P('M310 270 a90 90 0 0 1 90 90', 'dt') + P('M310 360 v-90', 'd');   // door swing
    s += R(330, 450, 180, 64, 'f-sand d') + T(420, 490, 'Island', 'tx tx-s', 'middle');
    s += P('M150 620 v24 M670 620 v24 M150 632 h520', 'dt dim') + T(410, 660, 'Layout option B', 'tx tx-s', 'middle');
    s += R(730, 230, 90, 90, 'f-clay d swatch') + R(760, 290, 90, 90, 'f-sand d swatch') + R(790, 350, 90, 90, 'f-paper d swatch');
    s += T(730, 480, 'Finishes', 'tx tx-s');
    return s;
  });
  // 4 · Proposal and scope: a written scope; lines write themselves; included ticks, one excluded, a contingency note
  FR.push(function () {
    var s = R(250, 120, 420, 580, 'f-paper d') + P('M250 180 h420', 'd');
    s += T(280, 160, 'Scope of work', 'tx');
    for (var i = 0; i < 5; i++) { s += lines(330, 230 + i * 70, 2, 300, 22); s += tick(286, 222 + i * 70); }
    s += P('M286 590 l24 24 M310 590 l-24 24', 'd cross') + lines(330, 600, 1, 260, 0) + T(330, 640, 'Not included', 'tx tx-s');
    s += R(700, 300, 200, 140, 'f-clayl d') + T(716, 340, 'Contingency', 'tx tx-s') + lines(716, 370, 3, 160, 22);
    s += P('M670 360 L700 360', 'dt');
    return s;
  });
  // 5 · Permitting: a permit file, then (stillness) the approval stamp lands; a product tag with its approval
  FR.push(function () {
    var s = R(230, 160, 380, 500, 'f-sand d') + R(250, 140, 380, 500, 'f-paper d');
    s += T(280, 200, 'Permit file', 'tx') + lines(280, 240, 6, 300, 30);
    s += '<g class="stamp">' + C(500, 520, 70, 'f-none d stampc') + C(500, 520, 56, 'f-none dt stampc') + T(500, 512, 'NOTICE OF', 'tx tx-stamp', 'middle') + T(500, 540, 'ACCEPTANCE', 'tx tx-stamp', 'middle') + '</g>';
    s += R(690, 320, 236, 110, 'f-paper d', 8) + C(714, 375, 8, 'd') + T(734, 368, 'Florida Product', 'tx tx-s') + T(734, 396, 'Approval', 'tx tx-s');
    s += P('M680 375 C656 380 640 420 610 430', 'dt');
    return s;
  });
  // 6 · Construction: studs rise in a wall frame, a ladder, a worker, and the broom at the end of the day
  FR.push(function () {
    var s = P('M100 ' + G + ' H900', 'd') + P('M160 260 H700 M160 ' + (G - 12) + ' H700', 'd plate');
    for (var i = 0; i < 9; i++) s += P('M' + (180 + i * 64) + ' ' + (G - 12) + ' V260', 'd stud');
    s += P('M760 ' + G + ' L840 300 M820 ' + G + ' L880 300 M772 690 L826 690 M786 610 L838 610 M800 530 L850 530 M812 450 L860 450 M826 370 L870 370', 'd ladder');
    s += stand(620, { dir: -1, arms: 'raise', hat: true, shirt: 'f-clayl' });
    s += P('M126 ' + (G - 46) + ' L152 470', 'd broom') + P('M110 ' + (G - 46) + ' h34 l12 46 h-58 z', 'f-sand d broom') + P('M114 ' + (G - 30) + ' l-3 30 M127 ' + (G - 30) + ' v30 M140 ' + (G - 30) + ' l3 30', 'dt broom');
    return s;
  });
  // 7 · Quality review: two people walk the room with the scope; the checklist ticks along
  FR.push(function () {
    var s = P('M100 ' + G + ' H900', 'd') + R(560, 220, 300, 330, 'f-paper d') + T(580, 256, 'Walkthrough', 'tx');
    for (var i = 0; i < 5; i++) { s += lines(620, 300 + i * 50, 1, 200, 0); s += tick(578, 292 + i * 50); }
    s += stand(240, { dir: 1, arms: 'give', hat: true, shirt: 'f-sand' }) + R(338, G - 200, 46, 60, 'f-paper d', 3) + P('M346 ' + (G - 184) + ' h30 M346 ' + (G - 170) + ' h22', 'dt');   // the scope, on a clipboard
    s += stand(470, { dir: 1, arms: 'point', shirt: 'f-clayl' });
    return s;
  });
  // 8 · Completion and handover: the finished house, keys passed hand to hand, warranty cards registered
  FR.push(function () {
    var s = house(120, 380, 260, 120);
    s += stand(600, { dir: 1, arms: 'give', hat: true, shirt: 'f-sand' }) + stand(880, { dir: -1, arms: 'give', shirt: 'f-clayl' });
    s += C(722, G - 172, 9, 'd key') + P('M731 ' + (G - 172) + ' h24 v8 M747 ' + (G - 172) + ' v6', 'd key');
    s += R(610, 236, 170, 100, 'f-paper d', 6) + T(626, 270, 'Warranty', 'tx tx-s');
    s += R(660, 290, 170, 100, 'f-paper d', 6) + T(676, 326, 'Registered', 'tx tx-s') + tick(780, 350);
    return s;
  });

  function frameSVG(i) { return '<g class="pr__f" data-i="' + i + '" transform="translate(' + (i * FW) + ' 0)">' + FR[i]() + '</g>'; }

  EZ.section('process', { 1: { init: function (root, k) {
    var world = root.querySelector('.pr__world'), win = root.querySelector('.pr__window'), items = Array.prototype.slice.call(root.querySelectorAll('.pr__item')),
      rail = root.querySelector('.pr__rail'), fill = root.querySelector('.pr__fill'), pin = root.querySelector('.pr__pin');
    // QA-1 (completion: pinned sections pin on real phone widths): the pinned camera runs at every width with motion on;
    // only reduced motion and very short screens get the list
    var big = function () { return k.motion && matchMedia('(min-height: 560px)').matches; };
    var cur = -1, groups = null;
    // rail marks: one per stage, the week label lands as the stage arrives
    rail.innerHTML += items.map(function (it, i) { return '<span class="pr__mk" style="--x:' + (i / 7) + '"><span class="pr__mkn nums">' + it.querySelector('.pr__n .nums').textContent + '</span></span>'; }).join('');
    var marks = Array.prototype.slice.call(rail.querySelectorAll('.pr__mk'));
    function show(i) {
      if (i === cur) return; cur = i;
      items.forEach(function (it, j) { it.classList.toggle('is-on', j === i); });
      marks.forEach(function (m, j) { m.classList.toggle('is-on', j <= i); });
      if (groups) groups.forEach(function (g, j) { g.classList.toggle('is-off', j !== i); });   // neighbours stay visible, quieter
    }

    if (!big()) {
      // the list is the story: each stage gets its own frame, drawn inline (a viewBox onto the same continuous site)
      root.classList.add('pr--list');
      items.forEach(function (it, i) {
        var s = document.createElementNS(NS, 'svg');
        s.setAttribute('viewBox', (i * FW) + ' 80 ' + FW + ' 760'); s.setAttribute('class', 'pr__mini'); s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
        s.innerHTML = frameSVG(i);
        it.insertBefore(s, it.firstChild);
      });
      k.add(function () { root.classList.remove('pr--list'); root.querySelectorAll('.pr__mini').forEach(function (n) { n.remove(); }); });
      return;
    }

    world.innerHTML = FR.map(function (f, i) { return frameSVG(i); }).join('');
    groups = Array.prototype.slice.call(world.querySelectorAll('.pr__f'));
    // every frame starts undrawn; strokes draw first, fills follow (no fill ever flashes over its drawing)
    groups.forEach(function (g) {
      gsap.set(g.querySelectorAll('.d, .dt'), { drawSVG: '0%' });
      gsap.set(g.querySelectorAll('[class*="f-"]'), { fillOpacity: 0 });   // the outline draws visibly, the fill follows
      gsap.set(g.querySelectorAll('.tx, .dash'), { opacity: 0 });
      gsap.set(g.querySelectorAll('.stamp'), { scale: 1.6, opacity: 0, transformOrigin: '500px 520px' });
    });
    // the world is sized explicitly: its height is the window's, each frame is 1000/900 of that, and the frame on show
    // sits in the middle of the window so its neighbours peek in at both edges (one continuous site)
    var fw = 0;
    function size() {
      // QA-1: as large as the window allows in BOTH directions (a tall narrow phone used to crop the frame's edges)
      var h = win.clientHeight, w = win.clientWidth; fw = Math.min(h * FW / 760, w); var wh = fw * 760 / FW;
      world.style.height = wh + 'px'; world.style.top = ((h - wh) / 2) + 'px'; world.style.width = (fw * 8) + 'px';
    }
    size(); k.ro(win, function () { size(); ScrollTrigger.refresh(); });
    function camX(i) { return -(i * fw) + (win.clientWidth - fw) / 2; }
    gsap.set(world, { x: camX(0) });
    var tl = gsap.timeline({ defaults: { ease: 'none' } });
    groups.forEach(function (g, i) {
      var t0 = i;                         // frame i owns [i, i+1) of the master timeline
      if (i > 0) tl.fromTo(world, { x: function () { return camX(i - 1); } }, { x: function () { return camX(i); }, duration: .3, ease: 'power2.inOut', immediateRender: false }, t0 - .3);   // the camera travels
      if (i === 0) return;                // frame 1 is drawn as the section arrives (below), never an empty window
      tl.to(g.querySelectorAll('.d, .dt'), { drawSVG: '100%', duration: .26, stagger: { amount: .14 } }, t0 - .12)
        .to(g.querySelectorAll('[class*="f-"]'), { fillOpacity: 1, duration: .12, stagger: { amount: .06 } }, t0 + .1)
        .to(g.querySelectorAll('.dash'), { opacity: 1, duration: .12 }, t0 + .1)
        .to(g.querySelectorAll('.tx'), { opacity: 1, duration: .1 }, t0 + .18);
      if (i === 4) tl.to(g.querySelectorAll('.stamp'), { scale: 1, opacity: 1, duration: .1, ease: 'power4.in' }, t0 + .4);   // stillness, then the stamp lands
    });
    tl.to({}, { duration: .5 });           // the last frame holds before the release
    // frame 1 (the consultation) draws itself as the section comes into view: strokes, then fills, then words
    var g0 = groups[0];
    var intro = gsap.timeline({ paused: true })
      .to(g0.querySelectorAll('.d, .dt'), { drawSVG: '100%', duration: .9, ease: 'power2.inOut', stagger: { amount: .6 } })
      .to(g0.querySelectorAll('[class*="f-"]'), { fillOpacity: 1, duration: .4, ease: 'power2.out', stagger: { amount: .3 } }, '-=.5')
      .to(g0.querySelectorAll('.dash, .tx'), { opacity: 1, duration: .4, ease: 'power2.out' }, '<');
    var it = ScrollTrigger.create({ trigger: win, start: 'top 85%', once: true, onEnter: function () { intro.play(); } });
    k.add(function () { it.kill(); intro.kill(); });
    var st = ScrollTrigger.create({
      trigger: pin, start: 'top top', end: function () { return '+=' + Math.round(innerHeight * 7.2); }, pin: true, scrub: .8, animation: tl, invalidateOnRefresh: true,
      onUpdate: function (self) {
        var p = self.progress * tl.duration();
        show(Math.min(7, Math.max(0, Math.floor(p + .15))));
        fill.style.transform = 'scaleX(' + Math.min(1, p / 7).toFixed(4) + ')';
      }
    });
    show(0);
    k.add(function () { st.kill(); tl.kill(); world.innerHTML = ''; world.style.width = world.style.height = ''; gsap.set(world, { clearProps: 'transform' }); });
  } } });
})();
