/* FINALIZE · Home 8 · Reviews (one version, the owner's merge). 343 small stars, one per published Google review, start
   scattered over the sky (V2); one scrubbed timeline brings them together into five large stars, left to right, the fifth
   filled to eight tenths of its width (4.8 of 5). The large outlines draw first so the shapes are waiting; each small star
   that lands scratches its stroke into the ledger beside it (V1), five to a gate. Reversible [S1326]; no idle motion.
   Reduced motion: the gathered stars and the full ledger, still. Only the two published figures are used. */
(function () {
  var COUNT = 343, AVG = 4.8;
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function starPts(cx, cy, R, r) {
    var p = [];
    for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
    return p;
  }
  function inside(pt, poly) {
    var c = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      if (((poly[i][1] > pt[1]) !== (poly[j][1] > pt[1])) && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])) c = !c;
    }
    return c;
  }
  function d(poly) { return 'M' + poly.map(function (q) { return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join('L') + 'Z'; }

  EZ.section('reviews', { 1: { init: function (root, k) {
    var svg = root.querySelector('.rv__svg'), tally = root.querySelector('.rv__tally'), tip = root.querySelector('.rv__tip'), book = root.querySelector('.rv__book');
    var R = 56, r = 23, CY = 160, CX = [62, 181, 300, 419, 538], HALF = R * Math.cos(Math.PI / 10);

    // ---- the five large stars, and the 343 places inside them (the fifth only up to 0.8 of its width) ----
    var polys = CX.map(function (cx) { return starPts(cx, CY, R, r); }), cand = [];
    var limit = CX[4] - HALF + (AVG - 4) * 2 * HALF;
    for (var y = CY - R; y <= CY + R; y += 4.6) {
      for (var x = CX[0] - HALF; x <= CX[4] + HALF; x += 4.6) {
        var row = Math.round((y - CY + R) / 4.6), xx = x + (row % 2 ? 2.3 : 0);
        for (var s = 0; s < 5; s++) if (inside([xx, y], polys[s]) && (s < 4 || xx <= limit)) { cand.push([xx, y]); break; }
      }
    }
    // exactly 343, spread evenly over the candidates; ordered left to right so they land in a wave
    var tg = [];
    for (var i = 0; i < COUNT; i++) tg.push(cand[Math.floor(i * cand.length / COUNT)]);
    tg.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    var mini = 'M0 -3.4L.8 -1.1L3.2 -1.1L1.3 .4L2 2.8L0 1.4L-2 2.8L-1.3 .4L-3.2 -1.1L-.8 -1.1Z';
    var out = polys.map(function (p) { return '<path class="big" d="' + d(p) + '"/>'; }).join('');
    out += '<path class="gap" d="M' + limit.toFixed(1) + ' ' + (CY - R * .62).toFixed(1) + 'V' + (CY + R * .86).toFixed(1) + '"/>';
    out += tg.map(function () { return '<path class="ms" d="' + mini + '"/>'; }).join('');
    svg.innerHTML = out;
    var stars = Array.prototype.slice.call(svg.querySelectorAll('.ms')), bigs = svg.querySelectorAll('.big, .gap');
    if (stars.length !== COUNT) { svg.innerHTML = ''; return; }   // the drawing is the figure: never show a wrong count

    // ---- the ledger: 343 strokes in gates of five, ten gates to a line ----
    var strokes = [], gates = [], per = matchMedia('(max-width: 480px)').matches ? 7 : 10; // Phase 8: seven gates a line on phones, so each gate is a 24px target
    (function build() {
      var W = per * 70, gw = 70, rows = Math.ceil(COUNT / 5 / per), rh = 56, H = rows * rh, s = '', n = 0;
      tally.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      for (var rr = 0; rr < rows; rr++) s += '<path d="M0 ' + (rr * rh + 52) + 'H' + W + '" stroke="var(--color-border)" stroke-width="1"/>';
      for (var g = 0; n < COUNT; g++) {
        var col = g % per, row = Math.floor(g / per), x = col * gw + gw * .22, y = row * rh + 8, from = n + 1, body = '', j;
        for (j = 0; j < 4 && n < COUNT; j++, n++) {
          var lean = ((g * 7 + j * 3) % 5 - 2) * .9, top = y + ((g + j) % 3), bot = y + 38 - ((g * 3 + j) % 4);
          body += '<path class="st" d="M' + (x + j * 9) + ' ' + top + 'L' + (x + j * 9 + lean) + ' ' + bot + '"/>';
        }
        if (n < COUNT && j === 4) { body += '<path class="st st--d" d="M' + (x - 5) + ' ' + (y + 31) + 'L' + (x + 33) + ' ' + (y + 6) + '"/>'; n++; }
        var lbl = from === n ? 'Review ' + from : 'Reviews ' + from + ' to ' + n;
        s += '<g class="gate" tabindex="' + (g ? -1 : 0) + '" role="img" aria-label="' + lbl + '" data-l="' + lbl + '"><rect class="hit" x="' + (col * gw) + '" y="' + (row * rh) + '" width="' + gw + '" height="' + rh + '"/><rect x="' + (x - 9) + '" y="' + (y - 5) + '" width="' + (gw * .84) + '" height="48"/>' + body + '</g>';
      }
      tally.innerHTML = s;
      strokes = Array.prototype.slice.call(tally.querySelectorAll('.st'));
      gates = Array.prototype.slice.call(tally.querySelectorAll('.gate'));
    })();
    function hot(g) { gates.forEach(function (x) { x.classList.toggle('is-hot', x === g); }); tip.textContent = g ? g.dataset.l : ''; }
    k.on(tally, 'pointerover', function (e) { var g = e.target.closest('.gate'); if (g) hot(g); });
    k.on(tally, 'pointerleave', function () { if (!tally.contains(document.activeElement)) hot(null); });
    k.on(tally, 'focusin', function (e) { var g = e.target.closest('.gate'); if (g) hot(g); });
    k.on(tally, 'focusout', function (e) { if (!tally.contains(e.relatedTarget)) hot(null); });
    // Phase 8: one tab stop for the whole ledger (roving tabindex); the arrow keys count along it, Home and End jump [S1018]
    k.on(tally, 'keydown', function (e) {
      var i = gates.indexOf(document.activeElement); if (i < 0) return;
      var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'ArrowDown' ? i + per : e.key === 'ArrowUp' ? i - per : e.key === 'Home' ? 0 : e.key === 'End' ? gates.length - 1 : null;
      if (j === null) return; e.preventDefault(); j = Math.max(0, Math.min(gates.length - 1, j));
      gates[i].setAttribute('tabindex', '-1'); gates[j].setAttribute('tabindex', '0'); gates[j].focus();
    });
    k.add(function () { svg.innerHTML = ''; tally.innerHTML = ''; tip.textContent = ''; });

    // the still state is the gathered one
    stars.forEach(function (st, i) { gsap.set(st, { x: tg[i][0], y: tg[i][1] }); });
    EZ.reveal(k, root.querySelectorAll('.rv__head > *, .rv__acts'));
    if (!k.motion) return;

    // ---- the scattered sky, then one scrubbed gathering ----
    var R2 = rng(343), avg = root.querySelector('.rv__avg');
    stars.forEach(function (st) {
      gsap.set(st, { x: -10 + R2() * 620, y: 84 + R2() * 156, rotation: R2() * 180, scale: .5 + R2() * 1.1, opacity: .35 + R2() * .5, transformOrigin: '50% 50%' });
    });
    gsap.set(strokes, { scale: .1, autoAlpha: 0, transformOrigin: '50% 100%' });
    gsap.set(bigs, { drawSVG: '0%' });
    gsap.set(avg, { autoAlpha: 0, y: 14 });
    var tl = gsap.timeline({ defaults: { ease: 'none' } });
    tl.to(bigs, { drawSVG: '100%', duration: .22, ease: 'power2.inOut', stagger: .03 }, 0);
    stars.forEach(function (st, i) {
      var t0 = .08 + (tg[i][0] / 600) * .56;
      tl.to(st, { x: tg[i][0], y: tg[i][1], rotation: 0, scale: 1, opacity: 1, duration: .32, ease: 'power2.inOut' }, t0);
      tl.to(strokes[i], { scale: 1, autoAlpha: 1, duration: .015 }, t0 + .3);
    });
    tl.to(avg, { autoAlpha: 1, y: 0, duration: .08, ease: 'power4.out' }, .96);
    var st = ScrollTrigger.create({ trigger: root.querySelector('.rv__stage'), start: 'top 82%', end: 'bottom 72%', scrub: .6, animation: tl });
    k.add(function () { st.kill(); tl.kill(); gsap.set(strokes, { clearProps: 'all' }); gsap.set(avg, { clearProps: 'all' }); });
  } } });
})();
