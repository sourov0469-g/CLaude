/* reviews: aggregate-led ONLY (FULL §3). The page uses two published figures, 4.8 and 343, and links to the firm's
   own Google listing. No quotes, no names.
   v1 tally ledger [KBF Ledger / F12], v2 star constellation [S0687 + Q41 caps], v3 calibration dial [S1380 + S0928]. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var COUNT = 343, AVG = 4.8;

  EZ.section('reviews', {
    /* slot 3 · Phase 5 improved version of b4 */
    3: { init: function (root, k) {
      var svg = root.querySelector('.r3x__svg'), dial = root.querySelector('.r3x__dial');
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
      EZ.reveal(k, root.querySelectorAll('.r3x__side > *'));
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
      k.on(root.querySelector('.r3x__flick'), 'click', function () {
        var to = ang(.6 + Math.random() * 2.4);
        gsap.timeline().to(needle, { rotation: to, svgOrigin: '200 200', duration: .18, ease: 'power3.out' }).add(function () { settle(to); });
      });
    } },

    /* slot 2 · Phase 5 improved version of b3 */
    2: { init: function (root, k) {
      var sky = root.querySelector('.r2x__sky'), cv = root.querySelector('.r2x__cv');
      var ctx = cv.getContext('2d'), stars = [], links = [], W = 0, H = 0, dpr = 1;
      var ptr = { x: -9999, y: -9999 }, running = false, inView = false, raf = 0, last = 0;
      function sample() {
        // the average, set in the display face, sampled for 343 evenly spaced points [S0687 counter/constellation FX]
        var o = document.createElement('canvas'); o.width = W; o.height = H;
        var c = o.getContext('2d');
        c.fillStyle = EZ.c('--color-art-line'); c.textAlign = 'center'; c.textBaseline = 'middle';
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
        ctx.strokeStyle = EZ.c('--color-art-accent'); ctx.globalAlpha = .22; ctx.lineWidth = 1;
        ctx.beginPath();
        for (var i = 0; i < stars.length; i++) { var a = stars[i], b = stars[links[i]]; if (!b) continue; ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }
        ctx.stroke();
        for (var n = 0; n < stars.length; n++) {
          var s = stars[n], tw = .65 + .35 * Math.sin(t * .003 + s.ph), r = s.r;
          ctx.globalAlpha = tw; ctx.fillStyle = EZ.c('--color-art-accent');   // twinkling, at the token's colour
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
      k.on(root.querySelector('.r2x__scatter'), 'click', function () { if (k.motion) scatter(); });
      k.io(sky, function (en) { inView = en.isIntersecting; if (inView) run(); else stop(); }, { threshold: 0 });
      if (!k.motion) { root.querySelector('.r2x__scatter').hidden = true; k.add(function () { root.querySelector('.r2x__scatter').hidden = false; }); return; }
      EZ.reveal(k, root.querySelectorAll('.r2x__head > *, .r2x__acts'));
    } },

    /* slot 1 · Phase 5 improved version of b2 */
    1: { init: function (root, k) {
      var svg = root.querySelector('.rtx__svg'), book = root.querySelector('.rtx__book'), tip = root.querySelector('.rtx__tip');
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
      EZ.reveal(k, root.querySelectorAll('.rtx__side > *'));
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

    /* slot 4 · Phase 5 new · The roof: 14 courses of 31 down to 18 shingles is exactly 343 (31 + 30 + ... + 18), so the
       hip shape is the count itself; each upper course overlaps the one below, and scrolling lays them bottom up */
    4: { init: function (root, k) {
      var svg = root.querySelector('.rsh__svg'), nEl = root.querySelector('.rsh__n');
      var SW = 24, CH = 18, X0 = 28, Y0 = 368, out = '', made = 0;
      out += '<rect class="chim" x="578" y="104" width="36" height="120"/>';
      for (var r = 0; r < 14; r++) {
        var cnt = 31 - r, x0 = X0 + r * SW / 2, y = Y0 - r * CH;
        for (var c = 0; c < cnt; c++) {
          var x = x0 + c * SW, t = (r * 7 + c * 13) % 11;
          out += '<path class="sg' + (t === 0 ? ' t2' : t === 5 ? ' t3' : '') + '" d="M' + x + ' ' + y + 'H' + (x + SW) + 'V' + (y + 18) + 'Q' + (x + SW) + ' ' + (y + 22) + ' ' + (x + SW - 4) + ' ' + (y + 22) + 'H' + (x + 4) + 'Q' + x + ' ' + (y + 22) + ' ' + x + ' ' + (y + 18) + 'Z"/>';
          made++;
        }
      }
      out += '<rect class="ridge" x="' + (X0 + 13 * SW / 2 - 4) + '" y="' + (Y0 - 13 * CH - 8) + '" width="' + (18 * SW + 8) + '" height="10" rx="4"/>';
      out += '<rect class="fascia" x="' + (X0 - 6) + '" y="390" width="' + (31 * SW + 12) + '" height="7"/>';
      out += '<rect class="wall" x="70" y="397" width="660" height="42"/><rect class="win" x="130" y="405" width="70" height="26"/><rect class="win" x="600" y="405" width="70" height="26"/><rect class="win" x="365" y="405" width="70" height="34"/>';
      svg.innerHTML = out;
      var sg = svg.querySelectorAll('.sg');
      // the drawing is the figure: refuse to show a roof that does not hold exactly the published count
      if (made !== COUNT) { svg.innerHTML = ''; return; }
      k.add(function () { svg.innerHTML = ''; nEl.textContent = '0'; });
      EZ.reveal(k, root.querySelectorAll('.rsh__side > *'));
      if (!k.motion) { nEl.textContent = COUNT; return; }
      var tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 85%', end: 'bottom 50%', scrub: .4,
        onUpdate: function (self) { nEl.textContent = Math.round(self.progress * COUNT); } } });
      tl.from(sg, { autoAlpha: 0, y: -14, duration: .2, ease: 'power2.out', stagger: .01 });
    } },

    /* slot 5 · Phase 5 new · The paint roller: five stencils share one clip; the paint is a rect under it. The roller
       drags (pointer or arrow keys) but cannot pass 4.8, and on release it rolls back to 4.8 */
    5: { init: function (root, k) {
      var svg = root.querySelector('.rpr__svg'), wall = root.querySelector('.rpr__wall'), rol = root.querySelector('.rpr__roller');
      var read = root.querySelector('.rpr__v'), st = { v: 0 };
      function star(cx, cy, R, r) { var p = ''; for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; p += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1); } return p + 'Z'; }
      var stars = '';
      for (var i = 0; i < 5; i++) stars += star(100 + i * 200, 118, 86, 36);
      function vx(v) { if (v >= 5) return 986; var n = Math.floor(v); return 14 + n * 200 + (v - n) * 172; }
      function xv(x) { var n = EZ.clamp(Math.floor((x - 14) / 200), 0, 4); return n + EZ.clamp((x - 14 - n * 200) / 172, 0, 1); }
      var SX = vx(AVG).toFixed(1);
      svg.innerHTML = '<defs><clipPath id="rpr-clip"><path d="' + stars + '"/></clipPath></defs>' +
        '<rect class="tape" x="-6" y="0" width="70" height="20" transform="rotate(-8 30 10)"/><rect class="tape" x="936" y="0" width="70" height="20" transform="rotate(7 970 10)"/>' +
        '<path class="stencil" d="' + stars + '"/><rect class="paint" clip-path="url(#rpr-clip)" x="0" y="0" width="0" height="220"/>' +
        '<path class="stop" d="M' + SX + ' 22 V214"/><text class="stop-t" x="' + SX + '" y="16">' + AVG + '</text>';
      var paint = svg.querySelector('.paint'), stop = svg.querySelector('.stop');
      function draw() {
        var x = vx(st.v);
        paint.setAttribute('width', x.toFixed(1));
        var w = wall.clientWidth, h = svg.getBoundingClientRect().height;
        rol.style.left = (x / 1000 * w).toFixed(1) + 'px'; rol.style.top = (h * .3).toFixed(1) + 'px';
        read.textContent = st.v.toFixed(1);
        rol.setAttribute('aria-valuenow', st.v.toFixed(1)); rol.setAttribute('aria-valuetext', st.v.toFixed(1) + ' of 5 painted; the average is 4.8');
      }
      function to(v, d) { v = EZ.clamp(v, 0, AVG); if (!k.motion || !d) { gsap.killTweensOf(st); st.v = v; draw(); return; } k.ctx.add(function () { gsap.to(st, { v: v, duration: d, ease: 'power2.inOut', overwrite: true, onUpdate: draw }); }); }
      function bump() { if (k.motion) k.ctx.add(function () { gsap.fromTo(stop, { x: 0 }, { x: 4, duration: .06, yoyo: true, repeat: 3 }); }); }
      var drag = null;
      k.on(rol, 'pointerdown', function (e) { drag = true; rol.setPointerCapture(e.pointerId); gsap.killTweensOf(st); e.preventDefault(); });
      k.on(rol, 'pointermove', function (e) {
        if (!drag) return;
        var r = svg.getBoundingClientRect(), v = xv((e.clientX - r.left) / r.width * 1000);
        if (v > AVG) bump();
        st.v = EZ.clamp(v, 0, AVG); draw();
      });
      function up() { if (!drag) return; drag = null; k.timeout(function () { to(AVG, .9); }, 350); }
      k.on(rol, 'pointerup', up); k.on(rol, 'pointercancel', up);
      k.on(rol, 'keydown', function (e) {
        var v = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? st.v + .2 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? st.v - .2 : e.key === 'Home' ? 0 : e.key === 'End' ? AVG : null;
        if (v === null) return;
        e.preventDefault(); if (v > AVG + .01) bump(); to(v, 0);
      });
      k.on(rol, 'blur', function () { to(AVG, .9); });
      k.ro(wall, draw);
      draw();
      k.add(function () { svg.innerHTML = ''; rol.style.left = ''; rol.style.top = ''; read.textContent = '0.0'; });
      EZ.reveal(k, root.querySelectorAll('.rpr__head > *, .rpr__foot'));
      if (!k.motion) { to(AVG, 0); return; }
      ScrollTrigger.create({ trigger: wall, start: 'top 75%', once: true, onEnter: function () { to(AVG, 1.8); } });
    } },

    /* slot 6 · Phase 5 new · The job-site sign: each digit is a flap that flips over blank a few times before it lands; it
       never shows a number other than the published ones */
    6: { init: function (root, k) {
      var rows = Array.prototype.slice.call(root.querySelectorAll('.rsf__flaps')), flaps = [];
      rows.forEach(function (r) {
        r.innerHTML = r.dataset.to.split('').map(function (ch) { return '<span class="rsf__f' + (ch === '.' ? ' is-dot' : '') + '" data-to="' + ch + '">' + ch + '</span>'; }).join('');
        r.querySelectorAll('.rsf__f').forEach(function (f) { if (f.dataset.to !== '.') flaps.push(f); });
      });
      function roll() {
        flaps.forEach(function (f, i) {
          var left = 6 + i * 3;
          (function tick() {
            f.classList.remove('is-flip'); void f.offsetWidth; f.classList.add('is-flip');
            f.textContent = left > 0 ? '' : f.dataset.to;   // flaps turn blank until they land: the sign never shows a figure that is not ours
            if (left-- > 0) k.timeout(tick, 75);
          })();
        });
      }
      if (k.motion) {
        flaps.forEach(function (f) { f.textContent = ''; });
        var io = false;
        k.io(root.querySelector('.rsf__board'), function (en) { if (en.isIntersecting && !io) { io = true; roll(); } }, { threshold: .5 });
        k.on(root.querySelector('.rsf__go'), 'click', roll);
      } else root.querySelector('.rsf__go').hidden = true;
      k.add(function () { rows.forEach(function (r) { r.innerHTML = ''; }); root.querySelector('.rsf__go').hidden = false; });
      EZ.reveal(k, root.querySelectorAll('.rsf__side > *'));
    } },

    /* slot 7 · Phase 5 new · The inspection tag: drag it down on its string (or press it); it springs back with a swing
       and turns over. Face: 4.8 of 5. Back: 343 reviews */
    7: { init: function (root, k) {
      var tag = root.querySelector('.rtg__tag'), line = root.querySelector('.rtg__line');
      var flipped = false, dragged = false, down = null;
      function wire() { line.setAttribute('d', 'M100 22 L100 ' + (160 + (+gsap.getProperty(tag, 'y') || 0)).toFixed(1)); }
      function flip() {
        flipped = !flipped;
        tag.setAttribute('aria-pressed', flipped ? 'true' : 'false');
        tag.setAttribute('aria-label', flipped ? 'Inspection tag: 343 reviews on our Google listing. Press to turn it over' : 'Inspection tag: 4.8 out of 5. Press to turn it over');
        tag.querySelector('.rtg__face--a').setAttribute('aria-hidden', flipped ? 'true' : 'false');
        tag.querySelector('.rtg__face--b').setAttribute('aria-hidden', flipped ? 'false' : 'true');
        if (k.motion) k.ctx.add(function () { gsap.to(tag, { rotationY: flipped ? 180 : 0, duration: .6, ease: 'power3.inOut' }); });
        else gsap.set(tag, { rotationY: flipped ? 180 : 0 });
      }
      function spring(sw) {
        k.ctx.add(function () {
          gsap.to(tag, { y: 0, duration: 1, ease: 'elastic.out(1, .32)', onUpdate: wire, overwrite: 'auto' });
          gsap.fromTo(tag, { rotation: sw }, { rotation: 0, duration: 1.2, ease: 'elastic.out(1, .3)' });
        });
      }
      k.on(tag, 'pointerdown', function (e) { if (!k.motion) return; down = { y: e.clientY, x: e.clientX }; dragged = false; tag.setPointerCapture(e.pointerId); gsap.killTweensOf(tag, 'y,rotation'); });
      k.on(tag, 'pointermove', function (e) {
        if (!down) return;
        var dy = Math.max(0, e.clientY - down.y);
        if (dy > 6) dragged = true;
        gsap.set(tag, { y: Math.min(130, dy * .7), rotation: EZ.clamp((e.clientX - down.x) * .05, -8, 8) }); wire();
      });
      function up(e) {
        if (!down) return;
        var far = (+gsap.getProperty(tag, 'y') || 0) > 40; down = null;
        if (dragged) { spring((+gsap.getProperty(tag, 'rotation') || 0) * 1.5 + (Math.random() > .5 ? 6 : -6)); if (far) flip(); }
      }
      k.on(tag, 'pointerup', up); k.on(tag, 'pointercancel', up);
      k.on(tag, 'click', function () {
        if (dragged) { dragged = false; return; }
        if (k.motion) k.ctx.add(function () { gsap.timeline().to(tag, { y: 50, duration: .14, ease: 'power2.in', onUpdate: wire }).add(function () { spring(7); }); });
        flip();
      });
      wire();
      k.add(function () {
        flipped = false; gsap.set(tag, { clearProps: 'transform' }); wire();
        tag.setAttribute('aria-pressed', 'false'); tag.setAttribute('aria-label', 'Inspection tag: 4.8 out of 5. Press to turn it over');
        tag.querySelector('.rtg__face--a').removeAttribute('aria-hidden'); tag.querySelector('.rtg__face--b').setAttribute('aria-hidden', 'true');
      });
      EZ.reveal(k, root.querySelectorAll('.rtg__side > *'));
      if (k.motion) gsap.from(tag, { y: -60, rotation: 10, autoAlpha: 0, duration: 1.1, ease: 'elastic.out(1, .4)', onUpdate: wire, scrollTrigger: { trigger: root.querySelector('.rtg__hang'), start: 'top 80%', once: true } });
    } },

    /* slot 8 · Phase 5 new · Five nails: each strike swings the hammer about its grip and drives the next nail; nails 1-4
       go flush, nail 5 stops at eight tenths, so the readout ends on 4.8 */
    8: { init: function (root, k) {
      var svg = root.querySelector('.rnl__svg'), read = root.querySelector('.rnl__v'), hit = root.querySelector('.rnl__hit');
      var TOP = 190, L = 66, NX = [140, 320, 500, 680, 860], DEP = [1, 1, 1, 1, .8], done = 0, busy = false;
      var out = '';
      NX.forEach(function (x, i) { out += '<g class="nail" transform="translate(' + x + ' ' + (TOP - L - 6) + ')"><rect class="nail-h" x="-15" y="0" width="30" height="7" rx="2"/><path class="nail-s" d="M-4 7 H4 V' + (L + 2) + ' L0 ' + (L + 10) + ' L-4 ' + (L + 2) + ' Z"/></g>'; });
      out += '<rect class="plank" x="40" y="' + TOP + '" width="920" height="80" rx="4"/><path class="grain" d="M60 212 C260 202 420 224 620 210 S860 206 940 216 M60 238 C240 246 470 230 650 242 S880 248 940 236 M80 258 C300 252 520 262 920 254"/>';
      NX.forEach(function (x, i) { out += '<text class="nl" x="' + x + '" y="294">' + (i + 1) + '</text>'; });
      out += '<g class="hm" transform="translate(' + NX[0] + ' ' + (TOP - L - 6) + ')"><g class="hm-r" transform="rotate(35 150 -11)"><rect class="hm-g" x="-2" y="-15" width="152" height="9" rx="4"/><rect class="hm-h" x="-30" y="-24" width="60" height="24" rx="3"/></g></g>';
      out += '<g class="spark"><path d="M-30 -4 L-46 -14 M30 -4 L46 -14 M-22 -14 L-30 -30 M22 -14 L30 -30"/></g>';
      svg.innerHTML = out;
      var nails = svg.querySelectorAll('.nail'), hm = svg.querySelector('.hm'), hr = svg.querySelector('.hm-r'), spark = svg.querySelector('.spark');
      function headY(d) { return TOP - 7 - L * (1 - d); }
      function total() { var t = 0; for (var i = 0; i < done; i++) t += DEP[i]; return t; }
      function show() { read.textContent = total().toFixed(1); hit.querySelector('.btn__label').textContent = done < 5 ? 'Strike the next nail' : 'Strike the fifth again'; }
      function strike() {
        if (busy) return;
        var i = Math.min(done, 4), again = done >= 5, y = headY(again ? DEP[4] : DEP[i]), x = NX[i];
        function land() { if (!again) { nails[i].setAttribute('transform', 'translate(' + x + ' ' + y + ')'); done++; } show(); }
        if (!k.motion) { land(); return; }
        busy = true;
        var a = { v: 35 }, ny = { v: headY(0) };
        hm.setAttribute('transform', 'translate(' + x + ' ' + (again ? y : headY(0)) + ')');
        k.ctx.add(function () {
          gsap.timeline({ onComplete: function () { busy = false; } })
            .to(a, { v: 0, duration: .16, ease: 'power3.in', onUpdate: function () { hr.setAttribute('transform', 'rotate(' + a.v.toFixed(2) + ' 150 -11)'); } })
            .to(ny, { v: y, duration: again ? .01 : .09, ease: 'power2.out', onUpdate: function () {
              if (!again) { nails[i].setAttribute('transform', 'translate(' + x + ' ' + ny.v.toFixed(1) + ')'); hm.setAttribute('transform', 'translate(' + x + ' ' + ny.v.toFixed(1) + ')'); }
            } })
            .add(function () { spark.setAttribute('transform', 'translate(' + x + ' ' + y + ')'); land(); })
            .fromTo(spark, { opacity: 1 }, { opacity: 0, duration: .25 })
            .to(a, { v: 35, duration: .3, ease: 'power2.out', onUpdate: function () { hr.setAttribute('transform', 'rotate(' + a.v.toFixed(2) + ' 150 -11)'); } }, '<');
        });
      }
      function pull() {
        done = 0; busy = false;
        nails.forEach(function (n, i) { n.setAttribute('transform', 'translate(' + NX[i] + ' ' + headY(0) + ')'); });
        hm.setAttribute('transform', 'translate(' + NX[0] + ' ' + headY(0) + ')'); hr.setAttribute('transform', 'rotate(35 150 -11)');
        show();
      }
      k.on(hit, 'click', strike);
      k.on(root.querySelector('.rnl__pull'), 'click', pull);
      show();
      k.add(function () { svg.innerHTML = ''; read.textContent = '0.0'; hit.querySelector('.btn__label').textContent = 'Strike the next nail'; });
      EZ.reveal(k, root.querySelectorAll('.rnl__head > *, .rnl__foot'));
    } },

    /* slot 1 · AUDIT-01 winner (copied from v1; F8): no ledger costume. Every stroke is on the page at rest (no false zero);
       with motion it draws in once on entry (8ms stagger, 150ms a stroke). Gates take focus and speak their range. */
    b2: { init: function (root, k) {
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
    b3: { init: function (root, k) {
      var sky = root.querySelector('.reviews2__sky'), cv = root.querySelector('.reviews2__cv');
      var ctx = cv.getContext('2d'), stars = [], links = [], W = 0, H = 0, dpr = 1;
      var ptr = { x: -9999, y: -9999 }, running = false, inView = false, raf = 0, last = 0;
      function sample() {
        // the average, set in the display face, sampled for 343 evenly spaced points [S0687 counter/constellation FX]
        var o = document.createElement('canvas'); o.width = W; o.height = H;
        var c = o.getContext('2d');
        c.fillStyle = '#121212'; c.textAlign = 'center'; c.textBaseline = 'middle';
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
    b4: { init: function (root, k) {
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
