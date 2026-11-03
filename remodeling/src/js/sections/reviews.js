/* OWNER · Home 8 · Reviews: the constellation (restored from the earlier build the owner liked). 343 small stars, one per
   published Google review, fly in together when the section arrives and assemble into the figure 4.8 (sampled from the
   display face). The pointer pushes them away; they spring back to the average on their own. Touch: a tap scatters them;
   the "Scatter them" button does the same for keyboards. Reduced motion: the assembled figure, still. Only the two
   published figures are used [S0687 constellation FX, S0340 spring physics, Q41 DPR cap + 40fps ceiling]. */
(function () {
  var COUNT = 343;
  EZ.section('reviews', {
    1: { init: function (root, k) {
      var cv = root.querySelector('.rv__cv'), ctx = cv.getContext('2d');
      var stars = [], links = [], W = 0, H = 0, dpr = 1, ptr = { x: -9999, y: -9999 }, running = false, inView = false, raf = 0, last = 0, landed = false;
      var css = getComputedStyle(root), INK = css.getPropertyValue('--color-text').trim() || '#1c1a17', ACC = css.getPropertyValue('--color-accent-solid').trim() || '#A45540';
      function sample() {
        var o = document.createElement('canvas'); o.width = W; o.height = H;
        var c = o.getContext('2d');
        c.fillStyle = '#000'; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.font = '600 ' + Math.round(Math.min(H * 1.02, W * .5)) + 'px ' + (css.getPropertyValue('--f-display').trim() || 'Poppins, Arial, sans-serif');
        c.fillText('4.8', W / 2, H * .54);
        var d = c.getImageData(0, 0, W, H).data, cand = [], step = Math.max(3, Math.round(Math.min(W, H) / 150));
        for (var y = 0; y < H; y += step) for (var x = 0; x < W; x += step) if (d[(y * W + x) * 4 + 3] > 128) cand.push([x, y]);
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
        var r = cv.getBoundingClientRect();
        W = Math.round(r.width); H = Math.round(r.height);
        if (!W || !H) return;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        var pts = sample(), unit = Math.max(1, Math.min(W, H) / 260);
        pts.forEach(function (p, i) {
          var s = stars[i];
          if (!s || fresh) {
            // they wait off the figure, spread wide, until the section arrives
            var a = Math.random() * Math.PI * 2, rr = Math.max(W, H) * (.45 + Math.random() * .5);
            s = stars[i] = { x: W / 2 + Math.cos(a) * rr, y: H / 2 + Math.sin(a) * rr * .6, vx: 0, vy: 0, r: (1.5 + Math.random() * 1.7) * unit, ph: Math.random() * 6.28, k: .035 + Math.random() * .025 };
          }
          s.tx = p[0]; s.ty = p[1];
        });
        links = stars.map(function (s, i) {
          var best = -1, bd = 1e9;
          for (var j = 0; j < stars.length; j++) { if (j === i) continue; var dx = stars[j].tx - s.tx, dy = stars[j].ty - s.ty, dd = dx * dx + dy * dy; if (dd < bd) { bd = dd; best = j; } }
          return best;
        });
        if (!k.motion) { stars.forEach(function (s) { s.x = s.tx; s.y = s.ty; }); draw(0); }
        else if (!running) draw(0);
      }
      function star5(x, y, r) {
        ctx.moveTo(x, y - r);
        for (var i = 1; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
        ctx.closePath();
      }
      function draw(t) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        ctx.globalAlpha = .16; ctx.strokeStyle = INK; ctx.lineWidth = 1;
        ctx.beginPath();
        for (var i = 0; i < stars.length; i++) {
          var a = stars[i], b = stars[links[i]]; if (!b) continue;
          var dx = a.x - b.x, dy = a.y - b.y; if (dx * dx + dy * dy > 1600) continue;   // the lines only hold while the stars are home
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        }
        ctx.stroke();
        ctx.fillStyle = ACC;
        for (var n = 0; n < stars.length; n++) {
          var s = stars[n];
          ctx.globalAlpha = .7 + .3 * Math.sin(t * .002 + s.ph);
          ctx.beginPath(); star5(s.x, s.y, s.r * 1.6); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      function step(t) {
        raf = requestAnimationFrame(step);
        if (document.hidden || t - last < 22) return;
        var dt = Math.min(2, (t - last) / 16.67); last = t;
        var R = Math.max(80, W * .085), R2 = R * R, moving = 0;
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i];
          var ax = (s.tx - s.x) * s.k, ay = (s.ty - s.y) * s.k;
          var dx = s.x - ptr.x, dy = s.y - ptr.y, d2 = dx * dx + dy * dy;
          if (d2 < R2) { var d = Math.sqrt(d2) || 1, f = (R - d) / R * 4.6; ax += dx / d * f; ay += dy / d * f; }
          s.vx = (s.vx + ax * dt) * .86; s.vy = (s.vy + ay * dt) * .86;
          s.x += s.vx * dt; s.y += s.vy * dt;
          if (Math.abs(s.vx) + Math.abs(s.vy) > .05) moving++;
        }
        draw(t);
        if (!moving && ptr.x < -999) { landed = true; }
      }
      function run() { if (running || !k.motion) return; running = true; last = performance.now(); raf = requestAnimationFrame(step); }
      function stop() { running = false; cancelAnimationFrame(raf); }
      function scatter(cx, cy) {
        stars.forEach(function (s) {
          var dx = s.x - (cx == null ? W / 2 : cx), dy = s.y - (cy == null ? H / 2 : cy), d = Math.sqrt(dx * dx + dy * dy) || 1, f = 16 + Math.random() * 20;
          s.vx += dx / d * f; s.vy += dy / d * f;
        });
        run();
      }
      var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      ready.then(function () { if (root.hidden) return; layout(true); if (k.motion && inView) run(); });
      k.ro(cv, function () { if (W) layout(false); });
      k.add(function () { stop(); stars = []; links = []; ctx.clearRect(0, 0, cv.width, cv.height); });
      k.on(cv, 'pointermove', function (e) { if (e.pointerType !== 'mouse') return; var r = cv.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; run(); });
      k.on(cv, 'pointerleave', function () { ptr.x = ptr.y = -9999; });
      k.on(cv, 'pointerdown', function (e) { if (e.pointerType !== 'mouse') { var r = cv.getBoundingClientRect(); scatter(e.clientX - r.left, e.clientY - r.top); } });
      k.on(root.querySelector('.rv__again'), 'click', function () { scatter(); });
      // they fly in together when the figure comes into view (once the canvas is half on screen)
      k.io(cv, function (en) { inView = en.isIntersecting; if (inView) run(); else stop(); }, { threshold: .35 });
      EZ.reveal(k, root.querySelectorAll('.rv__head > *, .rv__avg, .rv__acts'));
    } }
  });
})();
