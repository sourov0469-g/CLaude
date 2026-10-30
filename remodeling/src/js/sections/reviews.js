/* reviews: aggregate-led ONLY (FULL §3). The page uses two published figures, 4.8 and 343, and links to the firm's
   own Google listing. No quotes, no names.
   v1 tally ledger [KBF Ledger / F12], v2 star constellation [S0687 + Q41 caps], v3 calibration dial [S1380 + S0928]. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var COUNT = 343, AVG = 4.8;

  EZ.section('reviews', {
    /* slot 1 · AUDIT-01 winner (copied from v1; F8): no ledger costume. Every stroke is on the page at rest (no false zero);
       with motion it draws in once on entry (8ms stagger, 150ms a stroke). Gates take focus and speak their range. */
    1: { init: function (root, k) {
      var svg = root.querySelector('.rt__svg'), book = root.querySelector('.rt__book'), tip = root.querySelector('.rt__tip');
      var strokes = [], gates = [], drawn = false;
      function build() {
        var per = EZ.mobile() ? 7 : 10, W = 600, gw = W / per, rows = Math.ceil(COUNT / 5 / per), rh = 64, H = rows * rh;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        var s = '', n = 0;
        for (var g = 0; n < COUNT; g++) {
          var col = g % per, row = Math.floor(g / per), x = col * gw + gw * .2, y = row * rh + 12, from = n + 1, body = '', j;
          for (j = 0; j < 4 && n < COUNT; j++, n++) {
            var lean = ((g * 7 + j * 3) % 5 - 2) * .9, top = y + ((g + j) % 3), bot = y + 40 - ((g * 3 + j) % 4);
            body += '<path class="st" d="M' + (x + j * 9) + ' ' + top + 'L' + (x + j * 9 + lean) + ' ' + bot + '"/>';
          }
          if (n < COUNT && j === 4) { body += '<path class="st st--d" d="M' + (x - 5) + ' ' + (y + 33) + 'L' + (x + 33) + ' ' + (y + 6) + '"/>'; n++; }
          var lbl = from === n ? 'Review ' + from : 'Reviews ' + from + '-' + n;
          s += '<g class="gate" tabindex="0" role="img" data-rx="native:tally-gate" aria-label="' + lbl + '" data-l="' + lbl + '"><rect x="' + (x - 8) + '" y="' + (y - 4) + '" width="' + (gw * .82) + '" height="50" rx="4"/>' + body + '</g>';
        }
        svg.innerHTML = s;
        strokes = Array.prototype.slice.call(svg.querySelectorAll('.st'));
        gates = Array.prototype.slice.call(svg.querySelectorAll('.gate'));
        gsap.set(strokes, { transformOrigin: '50% 100%' });
        gsap.set(svg.querySelectorAll('.st--d'), { transformOrigin: '0% 100%' });
      }
      build();
      var lastPer = EZ.mobile();
      k.ro(book, function () { if (EZ.mobile() !== lastPer) { lastPer = EZ.mobile(); build(); } });
      k.add(function () { svg.innerHTML = ''; tip.textContent = ''; });
      function hot(g) { gates.forEach(function (x) { x.classList.toggle('is-hot', x === g); }); tip.textContent = g ? g.dataset.l : ''; }
      k.on(svg, 'pointerover', function (e) { var g = e.target.closest('.gate'); if (g) hot(g); });
      k.on(svg, 'pointerleave', function () { if (!svg.contains(document.activeElement)) hot(null); });
      k.on(svg, 'focusin', function (e) { var g = e.target.closest('.gate'); if (g) hot(g); });
      k.on(svg, 'focusout', function (e) { if (!svg.contains(e.relatedTarget)) hot(null); });
      if (!k.motion) return;
      EZ.reveal(k, root.querySelectorAll('.rt__side > *'));
      // the draw-in runs once, and only for a tally that starts below the fold; a tally already on screen stays drawn
      var r = book.getBoundingClientRect();
      if (r.top < innerHeight * .9) return;
      gsap.set(strokes, { scale: .1, autoAlpha: 0 });
      ScrollTrigger.create({ trigger: book, start: 'top 85%', once: true, onEnter: function () {
        drawn = true;
        gsap.to(strokes, { scale: 1, autoAlpha: 1, duration: .15, ease: 'power2.out', stagger: .008 });
      } });
      k.add(function () { if (!drawn) gsap.set(strokes, { clearProps: 'all' }); });
    } },

    /* v1 · The tally ledger: 343 strokes in gates of five, scratched in with the scroll; hover a gate for its range */
    b1: { init: function (root, k) {
      var svg = root.querySelector('.reviews1__svg'), book = root.querySelector('.reviews1__book');
      var countEl = root.querySelector('.reviews1__count'), tip = root.querySelector('.reviews1__tip');
      var strokes = [], gates = [], shown = COUNT;
      function build() {
        var per = EZ.mobile() ? 7 : 10, W = 600, gw = W / per, rows = Math.ceil(COUNT / 5 / per), rh = 64, H = rows * rh;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        var s = '', n = 0;
        for (var g = 0; n < COUNT; g++) {
          var col = g % per, row = Math.floor(g / per), x = col * gw + gw * .2, y = row * rh + 12, from = n + 1;
          var body = '';
          for (var j = 0; j < 4 && n < COUNT; j++, n++) {
            // a hand-made tally: each stroke leans a little and differs a little in length
            var lean = ((g * 7 + j * 3) % 5 - 2) * .9, top = y + ((g + j) % 3), bot = y + 40 - ((g * 3 + j) % 4);
            body += '<path class="st" d="M' + (x + j * 9) + ' ' + top + 'L' + (x + j * 9 + lean) + ' ' + bot + '"/>';
          }
          if (n < COUNT && j === 4) { body += '<path class="st st--d" d="M' + (x - 5) + ' ' + (y + 33) + 'L' + (x + 33) + ' ' + (y + 6) + '"/>'; n++; }
          s += '<g class="gate" data-a="' + from + '" data-b="' + n + '"><rect x="' + (x - 8) + '" y="' + (y - 4) + '" width="' + (gw * .82) + '" height="50"/>' + body + '</g>';
        }
        svg.innerHTML = s;
        strokes = Array.prototype.slice.call(svg.querySelectorAll('.st'));
        gates = Array.prototype.slice.call(svg.querySelectorAll('.gate'));
        gsap.set(strokes, { transformOrigin: '50% 100%' });
        gsap.set(svg.querySelectorAll('.st--d'), { transformOrigin: '0% 100%' });
        if (k.motion) { strokes.forEach(function (st, i) { st.style.opacity = i < shown ? 1 : 0; }); }
      }
      function show(n) {
        n = Math.max(0, Math.min(COUNT, n));
        if (n === shown) return;
        if (n > shown) {
          var fresh = strokes.slice(shown, n);
          fresh.forEach(function (st) { st.style.opacity = 1; });
          if (fresh.length < 40) gsap.fromTo(fresh, { scale: .1 }, { scale: 1, duration: .15, ease: 'power2.out', stagger: .01, overwrite: true });
        } else strokes.slice(n, shown).forEach(function (st) { st.style.opacity = 0; });
        shown = n;
        countEl.textContent = n;
      }
      if (k.motion) shown = 0;
      build();
      if (k.motion) countEl.textContent = 0;
      var lastPer = EZ.mobile();
      k.ro(book, function () { if (EZ.mobile() !== lastPer) { lastPer = EZ.mobile(); var n = shown; shown = k.motion ? 0 : COUNT; build(); if (k.motion) show(n); } });
      k.add(function () { svg.innerHTML = ''; countEl.textContent = COUNT; tip.textContent = ''; });
      // hover a gate: which reviews it holds
      k.on(svg, 'pointerover', function (e) {
        var g = e.target.closest('.gate'); if (!g) return;
        gates.forEach(function (x) { x.classList.toggle('is-hot', x === g); });
        tip.textContent = g.dataset.a === g.dataset.b ? 'Review ' + g.dataset.a : 'Reviews ' + g.dataset.a + '–' + g.dataset.b;
      });
      k.on(svg, 'pointerleave', function () { gates.forEach(function (x) { x.classList.remove('is-hot'); }); tip.textContent = ''; });
      if (!k.motion) return;
      EZ.reveal(k, root.querySelectorAll('.reviews1__side > *'));
      ScrollTrigger.create({ trigger: book, start: 'top 78%', end: 'bottom 70%', scrub: .3,
        onUpdate: function (self) { show(Math.round(self.progress * COUNT)); },
        onLeave: function () { show(COUNT); } });
    } },

    /* v2 · The constellation: 343 stars assemble into the average; the pointer pushes them, they spring home */
    2: { init: function (root, k) {
      var sky = root.querySelector('.reviews2__sky'), cv = root.querySelector('.reviews2__cv');
      var ctx = cv.getContext('2d'), stars = [], links = [], W = 0, H = 0, dpr = 1;
      var ptr = { x: -9999, y: -9999 }, running = false, inView = false, raf = 0, last = 0;
      function sample() {
        // the average, set in the display face, sampled for 343 evenly spaced points [S0687 counter/constellation FX]
        var o = document.createElement('canvas'); o.width = W; o.height = H;
        var c = o.getContext('2d');
        c.fillStyle = '#000'; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.font = '400 ' + Math.round(Math.min(H * .95, W * .62)) + 'px "Poppins", Arial, sans-serif';
        c.fillText('4.8', W / 2, H * .53);
        var d = c.getImageData(0, 0, W, H).data, cand = [], step = Math.max(3, Math.round(Math.min(W, H) / 160));
        for (var y = 0; y < H; y += step) for (var x = 0; x < W; x += step) if (d[(y * W + x) * 4 + 3] > 128) cand.push([x, y]);
        // shuffle, then keep points no closer than gap; shrink gap until 343 fit
        for (var i = cand.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = cand[i]; cand[i] = cand[j]; cand[j] = t; }
        var gap = Math.sqrt(cand.length * step * step / COUNT) * .95, pts = [];
        for (var tries = 0; tries < 8; tries++) {
          pts = [];
          for (var m = 0; m < cand.length && pts.length < COUNT; m++) {
            var p = cand[m], ok = true;
            for (var q = 0; q < pts.length; q++) { var dx = pts[q][0] - p[0], dy = pts[q][1] - p[1]; if (dx * dx + dy * dy < gap * gap) { ok = false; break; } }
            if (ok) pts.push(p);
          }
          if (pts.length >= COUNT) break;
          gap *= .85;
        }
        while (pts.length < COUNT && cand.length) pts.push(cand[pts.length % cand.length]);
        return pts.slice(0, COUNT);
      }
      function layout(fresh) {
        var r = sky.getBoundingClientRect();
        W = Math.round(r.width); H = Math.round(r.height);
        if (!W || !H) return;
        dpr = Math.min(window.devicePixelRatio || 1, 1.25);                 // [Q41] DPR cap
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        var pts = sample();
        pts.forEach(function (p, i) {
          var s = stars[i];
          if (!s || fresh) s = stars[i] = { x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, r: 1.2 + Math.random() * 1.6, ph: Math.random() * 6.28 };
          s.tx = p[0]; s.ty = p[1];
        });
        // each star drawn to its nearest neighbour: the faint lines of a constellation
        links = stars.map(function (s, i) {
          var best = -1, bd = 1e9;
          for (var j = 0; j < stars.length; j++) { if (j === i) continue; var dx = stars[j].tx - s.tx, dy = stars[j].ty - s.ty, dd = dx * dx + dy * dy; if (dd < bd) { bd = dd; best = j; } }
          return best;
        });
        if (!k.motion) { stars.forEach(function (s) { s.x = s.tx; s.y = s.ty; }); draw(0); }
      }
      function draw(t) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        ctx.strokeStyle = 'rgba(255, 95, 0, .14)'; ctx.lineWidth = 1;
        ctx.beginPath();
        for (var i = 0; i < stars.length; i++) { var a = stars[i], b = stars[links[i]]; if (!b) continue; ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }
        ctx.stroke();
        for (var n = 0; n < stars.length; n++) {
          var s = stars[n], tw = .65 + .35 * Math.sin(t * .003 + s.ph), r = s.r;
          ctx.fillStyle = 'rgba(242,194,48,' + tw.toFixed(2) + ')';
          // a four-point star
          ctx.beginPath();
          ctx.moveTo(s.x, s.y - r * 2.2); ctx.lineTo(s.x + r * .55, s.y - r * .55); ctx.lineTo(s.x + r * 2.2, s.y); ctx.lineTo(s.x + r * .55, s.y + r * .55);
          ctx.lineTo(s.x, s.y + r * 2.2); ctx.lineTo(s.x - r * .55, s.y + r * .55); ctx.lineTo(s.x - r * 2.2, s.y); ctx.lineTo(s.x - r * .55, s.y - r * .55);
          ctx.closePath(); ctx.fill();
        }
      }
      function step(t) {
        raf = requestAnimationFrame(step);
        if (document.hidden || t - last < 25) return;                       // [Q41] 40fps ceiling, hidden-tab skip
        var dt = Math.min(2, (t - last) / 16.67); last = t;
        var R = 90, R2 = R * R;
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i];
          var ax = (s.tx - s.x) * .045, ay = (s.ty - s.y) * .045;
          var dx = s.x - ptr.x, dy = s.y - ptr.y, d2 = dx * dx + dy * dy;
          if (d2 < R2) { var d = Math.sqrt(d2) || 1, f = (R - d) / R * 3.2; ax += dx / d * f; ay += dy / d * f; }
          s.vx = (s.vx + ax * dt) * .86; s.vy = (s.vy + ay * dt) * .86;
          s.x += s.vx * dt; s.y += s.vy * dt;
        }
        draw(t);
      }
      function run() { if (running || !k.motion) return; running = true; last = performance.now(); raf = requestAnimationFrame(step); }
      function stop() { running = false; cancelAnimationFrame(raf); }
      function scatter(cx, cy) {
        stars.forEach(function (s) {
          var dx = s.x - (cx == null ? W / 2 : cx), dy = s.y - (cy == null ? H / 2 : cy), d = Math.sqrt(dx * dx + dy * dy) || 1, f = 14 + Math.random() * 18;
          s.vx += dx / d * f; s.vy += dy / d * f;
        });
        run();
      }
      var ready = document.fonts && document.fonts.load ? document.fonts.load('600 100px "Poppins"').catch(function () {}) : Promise.resolve();
      ready.then(function () { if (root.hidden) return; layout(true); if (k.motion && inView) run(); });
      k.ro(sky, function () { if (W) layout(false); });
      k.add(function () { stop(); stars = []; links = []; ctx.clearRect(0, 0, cv.width, cv.height); });
      k.on(sky, 'pointermove', function (e) { var r = sky.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; });
      k.on(sky, 'pointerleave', function () { ptr.x = ptr.y = -9999; });
      k.on(sky, 'pointerdown', function (e) { if (e.pointerType !== 'mouse') { var r = sky.getBoundingClientRect(); scatter(e.clientX - r.left, e.clientY - r.top); } });
      k.on(root.querySelector('.reviews2__scatter'), 'click', function () { if (k.motion) scatter(); });
      k.io(sky, function (en) { inView = en.isIntersecting; if (inView) run(); else stop(); }, { threshold: 0 });
      if (!k.motion) { root.querySelector('.reviews2__scatter').hidden = true; k.add(function () { root.querySelector('.reviews2__scatter').hidden = false; }); return; }
      EZ.reveal(k, root.querySelectorAll('.reviews2__head > *, .reviews2__acts'));
    } },

    /* v3 · The calibration dial: the needle sweeps to 4.8; drag it and it springs back */
    3: { init: function (root, k) {
      var svg = root.querySelector('.reviews3__svg'), dial = root.querySelector('.reviews3__dial');
      var C = 200, A0 = -120, SPAN = 240;                                  // 0 at -120deg, 5 at +120deg
      function ang(v) { return A0 + v / 5 * SPAN; }
      function pol(a, r) { var t = (a - 90) * Math.PI / 180; return [C + Math.cos(t) * r, C + Math.sin(t) * r]; }
      var s = '<circle class="bezel" cx="200" cy="200" r="192"/><circle class="face" cx="200" cy="200" r="174"/>';
      for (var i = 0; i <= 50; i++) {
        var a = ang(i / 10), big = i % 10 === 0, mid = i % 5 === 0, p1 = pol(a, 164), p2 = pol(a, big ? 140 : mid ? 148 : 154);
        s += '<path class="' + (big ? 'tk-m' : 'tk') + '" d="M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + 'L' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + '"/>';
        if (big) { var pl = pol(a, 122); s += '<text class="tl" x="' + pl[0].toFixed(1) + '" y="' + (pl[1] + 8).toFixed(1) + '" text-anchor="middle">' + (i / 10) + '</text>'; }
      }
      var pm = pol(ang(AVG), 178);
      s += '<path class="mark" transform="translate(' + pm[0].toFixed(1) + ' ' + pm[1].toFixed(1) + ') rotate(' + ang(AVG) + ')" d="M0 -2L-7 -14H7Z"/>';
      s += '<text class="cap-t" x="200" y="158" text-anchor="middle">GOOGLE RATING</text>';
      s += '<g class="needle-g"><path class="needle" d="M196 236L200 52L204 236Z"/><circle class="hub" cx="200" cy="200" r="16"/><circle class="hub2" cx="200" cy="200" r="6"/></g>';
      s += '<circle class="grab" cx="200" cy="200" r="190"/>';
      svg.innerHTML = s;
      var needle = svg.querySelector('.needle-g');
      k.add(function () { svg.innerHTML = ''; });
      gsap.set(needle, { rotation: ang(AVG), svgOrigin: '200 200' });
      if (!k.motion) return;
      EZ.reveal(k, root.querySelectorAll('.reviews3__side > *'));
      // [AUDIT-01 F8 loser V3, P1] a real spring (stiffness 170, damping 26, 1/240s sub-steps) clamped to the printed scale,
      // so no frame can read above 5.0 or below 0; it lands exactly on 110.4deg
      var spin = null;
      function settle(from) {
        gsap.killTweensOf(needle);
        if (spin) gsap.ticker.remove(spin);
        var x = EZ.clamp(from, A0, A0 + SPAN), v = 0, to = ang(AVG);
        spin = function (t, dtMs) {
          var dt = Math.min(dtMs / 1000, 1 / 30), h = 1 / 240;
          for (var acc = 0; acc < dt; acc += h) { v += (-170 * (x - to) - 26 * v) * h; x = EZ.clamp(x + v * h, A0, A0 + SPAN); }
          if (Math.abs(x - to) < .02 && Math.abs(v) < .05) { x = to; gsap.ticker.remove(spin); spin = null; }
          gsap.set(needle, { rotation: x, svgOrigin: '200 200' });
        };
        gsap.ticker.add(spin);
      }
      k.add(function () { if (spin) gsap.ticker.remove(spin); spin = null; });
      gsap.set(needle, { rotation: A0, svgOrigin: '200 200' });
      ScrollTrigger.create({ trigger: dial, start: 'top 75%', once: true, onEnter: function () { settle(A0); } });
      // drag the needle anywhere on the dial; let go and it comes back to the average
      var dragging = false;
      function at(e) {
        var r = svg.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 400 - C, y = (e.clientY - r.top) / r.height * 400 - C;
        var deg = Math.atan2(y, x) * 180 / Math.PI + 90;          // 0 = straight up, clockwise positive
        if (deg > 180) deg -= 360;
        return EZ.clamp(deg, A0, A0 + SPAN);
      }
      k.on(svg, 'pointerdown', function (e) { dragging = true; svg.setPointerCapture(e.pointerId); gsap.killTweensOf(needle); if (spin) { gsap.ticker.remove(spin); spin = null; } gsap.to(needle, { rotation: at(e), svgOrigin: '200 200', duration: .12, overwrite: true }); });
      k.on(svg, 'pointermove', function (e) { if (dragging) gsap.to(needle, { rotation: at(e), svgOrigin: '200 200', duration: .08, overwrite: true }); });
      function release() { if (!dragging) return; dragging = false; settle(gsap.getProperty(needle, 'rotation')); }
      k.on(svg, 'pointerup', release);
      k.on(svg, 'pointercancel', release);
      k.on(root.querySelector('.reviews3__flick'), 'click', function () {
        var to = ang(.6 + Math.random() * 2.4);
        gsap.timeline().to(needle, { rotation: to, svgOrigin: '200 200', duration: .18, ease: 'power3.out' }).add(function () { settle(to); });
      });
    } }
  });
})();
