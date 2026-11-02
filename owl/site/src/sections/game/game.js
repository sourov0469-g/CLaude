/* ===== Sweep the lawn / Find the nails: one small engine, two stages =====
   Input: pointer drag (capture) or mouse hover (V2), tap-to-move on touch (vertical page scroll kept: touch-action pan-y),
   arrow keys on the focused stage. Output: nails lift onto the magnet's amber face; aria-live count; a warm win state.
   Budget: one SVG per stage, <= 12 nails, <= 220 grass blades, transforms only, rAF only while moving. */
(function () {
  var NS = 'http://www.w3.org/2000/svg', R = Owl.reduced, seeded = Owl.seeded, E = Owl.EASE;
  function el(t, a, p) { var n = document.createElementNS(NS, t); for (var k in a) n.setAttribute(k, a[k]); p && p.appendChild(n); return n; }
  function nail(p, s) { var g = el('g', {}, p); el('path', { d: 'M' + (-6 * s) + ' 0H' + (6 * s) + ' M' + (-1.3 * s) + ' 0V' + (14 * s) + 'L0 ' + (19 * s) + 'L' + (1.3 * s) + ' ' + (14 * s) + 'V0', fill: 'none', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', style: 'stroke:var(--nail)' }, g); return g; }

  function engine(root, cfg) {
    var stage = root.querySelector('.gm-stage'), svg = root.querySelector('.gm-svg'), gotEl = root.querySelector('.gm-got'), win = root.querySelector('.gm-win'), total = cfg.nails;
    root.querySelector('.gm-total').textContent = total;
    var world = cfg.build(svg), nails = [], mag = { x: cfg.start[0], y: cfg.start[1] }, target = { x: mag.x, y: mag.y }, raf = 0, got = 0, done = false, last = 0;
    function reset() {
      nails.forEach(function (n) { n.g.remove(); }); nails = []; got = 0; done = false; win.hidden = true; gotEl.textContent = '0';
      for (var i = 0; i < total; i++) { var pos = cfg.place(i), g = nail(world.nails, cfg.nailScale); nails.push({ g: g, x: pos[0], y: pos[1], r: pos[2], t: 0, slot: cfg.slot(i) }); }
      mag.x = target.x = cfg.start[0]; mag.y = target.y = cfg.start[1]; stage.classList.remove('is-playing'); draw(0); 
    }
    function toWorld(e) { var r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal; return { x: vb.x + (e.clientX - r.left) / r.width * vb.width, y: vb.y + (e.clientY - r.top) / r.height * vb.height }; }
    function clampT() { target.x = Math.max(cfg.bounds[0], Math.min(cfg.bounds[2], target.x)); target.y = Math.max(cfg.bounds[1], Math.min(cfg.bounds[3], target.y)); }
    function kick() { stage.classList.add('is-playing'); if (!raf) { last = 0; raf = requestAnimationFrame(tick); } }
    function tick(now) {
      raf = 0; var dt = Math.min(48, now - (last || now)); last = now;
      var k = R() ? 1 : 1 - Math.pow(1 - 0.22, dt / 16.7), px = mag.x, py = mag.y;
      mag.x += (target.x - mag.x) * k; mag.y += (target.y - mag.y) * k;
      var moving = Math.abs(target.x - mag.x) > 0.3 || Math.abs(target.y - mag.y) > 0.3;
      var lifting = false;
      nails.forEach(function (n) {
        if (!n.t && sweptDist(n, px, py, mag.x, mag.y) < cfg.reach[0]) { n.t = 0.0001; got++; gotEl.textContent = got; if (got === total) finish(); }
        if (n.t > 0 && n.t < 1) { n.t = R() ? 1 : Math.min(1, n.t + dt / 240); lifting = true; }
      });
      draw(mag.x - px);
      if (moving || lifting) raf = requestAnimationFrame(tick);
    }
    // continuous collision: distance from the nail to the segment the magnet swept this frame, so a fast move
    // (key repeat faster than frames, or instant moves under reduced motion) never skips a nail
    function sweptDist(n, ax, ay, bx, by) {
      var sx = cfg.reach[1], sy = cfg.reach[2], vx = (bx - ax) * sx, vy = (by - ay) * sy, wx = (n.x - ax) * sx, wy = (n.y - ay) * sy;
      var L = vx * vx + vy * vy, t = L ? Math.max(0, Math.min(1, (wx * vx + wy * vy) / L)) : 0;
      return Math.hypot(wx - vx * t, wy - vy * t);
    }
    function draw(dx) {
      world.magnet(mag.x, mag.y, dx);
      nails.forEach(function (n) {
        var t = E.out(n.t), s = cfg.stick(mag, n.slot), x = n.x + (s[0] - n.x) * t, y = n.y + (s[1] - n.y) * t, r = n.r * (1 - t) + s[2] * t;
        n.g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + r.toFixed(0) + ')');
        // hidden nails show when the magnet is near; once only two are left they glint faintly (the storyboard's find-aid)
        n.g.style.opacity = cfg.hidden && !n.t ? (Math.hypot(n.x - mag.x, n.y - mag.y) < cfg.reach[0] * 1.8 ? 1 : got >= total - 2 ? 0.4 : 0) : 1;
      });
    }
    function finish() { done = true; setTimeout(function () { win.hidden = false; }, R() ? 0 : 420); }
    // input
    var dragging = false;
    stage.addEventListener('pointerdown', function (e) {
      var w = toWorld(e); target.x = w.x; if (cfg.twoD) target.y = w.y; clampT(); kick();
      if (e.pointerType !== 'touch' || !cfg.twoD) { dragging = true; try { stage.setPointerCapture(e.pointerId); } catch (_) {} }
    });
    stage.addEventListener('pointermove', function (e) {
      if (!(dragging || (cfg.hover && e.pointerType === 'mouse'))) return;
      var w = toWorld(e); target.x = w.x; if (cfg.twoD) target.y = w.y; clampT(); kick();
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (ev) { stage.addEventListener(ev, function () { dragging = false; }); });
    stage.addEventListener('keydown', function (e) {
      var s = cfg.step, m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
      if (!m || (!cfg.twoD && m[1])) return;
      e.preventDefault(); target.x += m[0]; target.y += m[1]; clampT(); kick();
    });
    root.querySelector('.gm-reset').addEventListener('click', function () { reset(); stage.focus({ preventScroll: true }); });
    reset();
    return { state: function () { return { got: got, total: total, done: done, mag: [Math.round(mag.x), Math.round(mag.y)] }; } };
  }

  // ---- V1: side view, a lawn strip; the sweeper rolls left and right
  var r1 = document.querySelector('.game-v1');
  if (r1) r1._game = engine(r1, {
    nails: 12, nailScale: 0.9, start: [80, 219], bounds: [80, 219, 1060, 219], /* the sweeper, handle included, always fully on stage */ step: 28, reach: [58, 1, 0], twoD: false, hover: false, hidden: false,
    build: function (svg) {
      var ground = 236, back = el('g', {}, svg), nailsG = el('g', {}, svg), front = el('g', {}, svg), d1 = '', d2 = '';
      for (var x = 4, i = 0; x < 1200; x += 5 + seeded(i, 21) * 3, i++) { var h = 8 + seeded(i, 22) * 14, l = (seeded(i, 23) - 0.5) * 7, d = 'M' + x.toFixed(1) + ' ' + ground + ' q' + (l * 0.4).toFixed(1) + ' ' + (-h * 0.6).toFixed(1) + ' ' + l.toFixed(1) + ' ' + (-h).toFixed(1) + ' '; if (i % 2) d1 += d; else d2 += d; }
      el('path', { d: d1, fill: 'none', 'stroke-width': 1.5, 'stroke-linecap': 'round', style: 'stroke:var(--line-control);opacity:.55' }, back);
      el('path', { d: d2, fill: 'none', 'stroke-width': 1.6, 'stroke-linecap': 'round', style: 'stroke:var(--line-control);opacity:.9' }, front); // grass in front of the nails hides them
      el('path', { d: 'M0 ' + ground + 'H1200', 'stroke-width': 2, style: 'stroke:var(--line-control)' }, front);
      var sw = el('g', {}, svg);
      el('path', { d: 'M40 -8 L118 -104 M108 -110 L130 -96', fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', style: 'stroke:var(--text-primary)' }, sw);
      el('rect', { x: -62, y: -10, width: 124, height: 16, rx: 4, style: 'fill:var(--text-primary)' }, sw);
      el('rect', { x: -56, y: 6, width: 112, height: 4, rx: 2, style: 'fill:var(--accent-fill)' }, sw);
      var wheels = [-66, 66].map(function (x) { var w = el('g', { transform: 'translate(' + x + ' 6)' }, sw); el('circle', { r: 11, 'stroke-width': 3, style: 'stroke:var(--text-primary);fill:var(--surface-page)' }, w); return el('path', { d: 'M-7 0H7M0 -7V7', 'stroke-width': 2, 'stroke-linecap': 'round', style: 'stroke:var(--text-primary)' }, w); });
      var roll = 0;
      return { nails: nailsG, magnet: function (x, y, dx) { sw.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y + ')'); roll += (dx || 0) / 11 * 57.3; wheels.forEach(function (w) { w.setAttribute('transform', 'rotate(' + roll.toFixed(1) + ')'); }); } };
    },
    place: function (i) { return [180 + (i + seeded(i, 31) * 0.8) * (820 / 12), /* none within reach of the parked magnet */ 228 + seeded(i, 32) * 8, (seeded(i, 33) - 0.5) * 150]; },
    slot: function (i) { return -48 + (i % 12) * 8.5; },
    stick: function (m, slot) { return [m.x + slot, m.y + 14, 0]; }
  });

  // ---- V2: top-down yard; nails are hidden until the magnet comes near, then fly to it
  var r2 = document.querySelector('.game-v2');
  if (r2) r2._game = engine(r2, {
    nails: 12, nailScale: 1, start: [90, 460], bounds: [40, 40, 760, 480], step: 30, reach: [56, 1, 1], twoD: true, hover: true, hidden: true,
    build: function (svg) {
      var ink = 'stroke:var(--text-primary)', mute = 'stroke:var(--line-control)';
      el('rect', { x: 8, y: 8, width: 784, height: 504, rx: 10, fill: 'none', 'stroke-width': 2, 'stroke-dasharray': '2 10', 'stroke-linecap': 'round', style: mute }, svg); // fence
      el('path', { d: 'M260 120 H560 V330 H260 Z M260 120 L340 225 H480 L560 120 M260 330 L340 225 M560 330 L480 225', fill: 'var(--surface-page)', 'stroke-width': 3, 'stroke-linejoin': 'round', style: ink }, svg); // the house, roof seen from above (hip lines)
      el('path', { d: 'M520 330 V512 M600 330 V512', fill: 'none', 'stroke-width': 2, style: mute }, svg); // driveway
      [[150, 140, 60, 34], [650, 420, 70, 30], [150, 420, 54, 40]].forEach(function (b) { el('ellipse', { cx: b[0], cy: b[1], rx: b[2], ry: b[3], fill: 'none', 'stroke-width': 2, style: mute }, svg); }); // beds
      for (var i = 0; i < 70; i++) { var x = 30 + seeded(i, 41) * 740, y = 30 + seeded(i, 42) * 460; if (x > 250 && x < 570 && y > 110 && y < 340) continue; el('path', { d: 'M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' l3 -8 M' + (x + 5).toFixed(0) + ' ' + y.toFixed(0) + ' l-2 -7', 'stroke-width': 1.4, 'stroke-linecap': 'round', style: mute + ';opacity:.6' }, svg); } // grass tufts
      var nailsG = el('g', {}, svg), m = el('g', {}, svg);
      el('path', { d: 'M0 0 L0 64', 'stroke-width': 3, 'stroke-linecap': 'round', style: ink }, m);
      el('rect', { x: -40, y: -8, width: 80, height: 16, rx: 4, style: 'fill:var(--text-primary)' }, m);
      el('rect', { x: -36, y: -3, width: 72, height: 6, rx: 3, style: 'fill:var(--accent-fill)' }, m);
      el('circle', { cx: 0, cy: 0, r: 56, fill: 'none', 'stroke-width': 1.5, 'stroke-dasharray': '2 8', 'stroke-linecap': 'round', style: 'stroke:var(--accent-text);opacity:.6' }, m); // its reach
      return { nails: nailsG, magnet: function (x, y) { m.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')'); } };
    },
    place: function (i) { var x, y, k = 0; do { x = 50 + seeded(i * 7 + k, 51) * 700; y = 50 + seeded(i * 7 + k, 52) * 420; k++; } while (x > 240 && x < 580 && y > 100 && y < 350); return [x, y, seeded(i, 53) * 360]; },
    slot: function (i) { return -32 + (i % 12) * 5.8; },
    stick: function (m, slot) { return [m.x + slot, m.y - 10, 0]; }
  });
})();
