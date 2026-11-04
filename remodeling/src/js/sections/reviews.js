/* OWNER (second pass): the entrance is driven by the scroll, calm and reversible: the stars wait loosely scattered below
   and gather as the section rises, fully formed when the figure reaches the middle of the screen; scrolling back up
   loosens them again. The pointer still pushes them gently aside.
   OWNER · Home 8 · Reviews: the constellation (restored from the earlier build the owner liked). 343 small stars, one per
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
      var prog = 0, progT = 0;
      function target() {   // 0 while the figure is below the screen, 1 once its centre reaches the middle; held above
        var r = cv.getBoundingClientRect(), cy = r.top + r.height / 2, from = innerHeight + r.height / 2, to = innerHeight / 2;
        return k.motion ? Math.max(0, Math.min(1, (from - cy) / (from - to))) : 1;
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
            // a loose, quiet scatter around the figure (not a burst): within a band below and around it
            var a = Math.random() * Math.PI * 2, rr = .18 + Math.random() * .32;
            s = stars[i] = { ox: 0, oy: 0, vx: 0, vy: 0, r: (1.5 + Math.random() * 1.6) * unit, d: Math.random() * .35,
              dx: Math.cos(a) * rr, dy: Math.abs(Math.sin(a)) * rr * .9 + .12 };
          }
          s.tx = p[0]; s.ty = p[1]; s.sx = p[0] + s.dx * W; s.sy = p[1] + s.dy * H;
        });
        links = stars.map(function (s, i) {
          var best = -1, bd = 1e9;
          for (var j = 0; j < stars.length; j++) { if (j === i) continue; var dx = stars[j].tx - s.tx, dy = stars[j].ty - s.ty, dd = dx * dx + dy * dy; if (dd < bd) { bd = dd; best = j; } }
          return best;
        });
        prog = progT = target(); place(); draw();
      }
      function ease(t) { return 1 - Math.pow(1 - t, 3); }
      function place() {
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i], t = Math.max(0, Math.min(1, (prog - s.d) / .65)), e = ease(t);
          s.e = e; s.x = s.sx + (s.tx - s.sx) * e + s.ox; s.y = s.sy + (s.ty - s.sy) * e + s.oy;
        }
      }
      function star5(x, y, r) {
        ctx.moveTo(x, y - r);
        for (var i = 1; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
        ctx.closePath();
      }
      function draw() {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        ctx.globalAlpha = .16 * Math.max(0, prog * 2 - 1); ctx.strokeStyle = INK; ctx.lineWidth = 1;
        if (ctx.globalAlpha > 0) {
          ctx.beginPath();
          for (var i = 0; i < stars.length; i++) {
            var a = stars[i], b = stars[links[i]]; if (!b) continue;
            var dx = a.x - b.x, dy = a.y - b.y; if (dx * dx + dy * dy > 1600) continue;   // the lines only hold while the stars are home
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          }
          ctx.stroke();
        }
        ctx.fillStyle = ACC;
        for (var n = 0; n < stars.length; n++) {
          var s = stars[n];
          ctx.globalAlpha = .35 + .65 * s.e;
          ctx.beginPath(); star5(s.x, s.y, s.r * 1.6); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      function step(t) {
        raf = requestAnimationFrame(step);
        if (document.hidden || t - last < 22) return;
        var dt = Math.min(2, (t - last) / 16.67); last = t;
        progT = target(); prog += (progT - prog) * Math.min(1, .16 * dt);
        // the pointer pushes stars gently aside; each springs back to its place on the path
        var R = Math.max(70, W * .07), R2 = R * R;
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i], ax = -s.ox * .06, ay = -s.oy * .06;
          var dx = s.x - ptr.x, dy = s.y - ptr.y, d2 = dx * dx + dy * dy;
          if (d2 < R2) { var d = Math.sqrt(d2) || 1, f = (R - d) / R * 2.2; ax += dx / d * f; ay += dy / d * f; }
          s.vx = (s.vx + ax * dt) * .84; s.vy = (s.vy + ay * dt) * .84;
          s.ox += s.vx * dt; s.oy += s.vy * dt;
        }
        place(); draw();
      }
      function run() { if (running || !k.motion) return; running = true; last = performance.now(); raf = requestAnimationFrame(step); }
      function stop() { running = false; cancelAnimationFrame(raf); }
      function scatter(cx, cy) {
        stars.forEach(function (s) {
          var dx = s.x - (cx == null ? W / 2 : cx), dy = s.y - (cy == null ? H / 2 : cy), d = Math.sqrt(dx * dx + dy * dy) || 1, f = 6 + Math.random() * 8;
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
      k.io(cv, function (en) { inView = en.isIntersecting; if (inView) run(); else stop(); }, { threshold: 0 });
      EZ.reveal(k, root.querySelectorAll('.rv__head > *, .rv__avg, .rv__acts'));
    } },

    /* NEW VERSIONS · V2 "The rating, filled" (governing reference: Apple AirPods Pro, numerals as events). The same 343
       stars and the same owner rules as V1 (gather with the scroll, formed at mid-screen, loosened if you scroll back; the
       pointer scatters, they spring home; a tap or "Scatter them" scatters), but the aggregate they form is the rating
       itself: five large stars filled to exactly 4.8 of 5 (the fifth to 80% of its width). Before they gather they are a
       quiet starfield. The counters (4.8 and 343) run with the stars as events; screen readers get the true figures
       [S0340 bodies on springs, S0089, S0062 DPR cap + frame budget, S1326]. Reduced motion: formed and still. */
    2: { init: function (root, k) {
      var cv = root.querySelector('.rs__cv'), ctx = cv.getContext('2d'), avgEl = root.querySelector('.rs__avg'), nEl = root.querySelector('.rs__n');
      var css = getComputedStyle(root), PALE = css.getPropertyValue('--clay-100').trim() || '#F9E3DD', LINE = 'rgba(246,240,234,.34)';
      var stars = [], W = 0, H = 0, dpr = 1, cells = [], ptr = { x: -9999, y: -9999 }, running = false, inView = false, raf = 0, last = 0, prog = 0, t0 = 0;
      var RATING = 4.8;
      function starPath(c, x, y, R, ri) {
        c.moveTo(x, y - R);
        for (var i = 1; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? R * ri : R; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
        c.closePath();
      }
      function geometry() {   // five cells across; each big star centred in its cell
        var cw = W / 5, R = Math.min(cw * .47, H * .5), cy = H * .53;
        cells = []; for (var i = 0; i < 5; i++) cells.push({ x: cw * (i + .5), y: cy, R: R });
      }
      function sample() {
        var o = document.createElement('canvas'); o.width = W; o.height = H;
        var c = o.getContext('2d'); c.fillStyle = '#000';
        cells.forEach(function (s, i) {
          c.save();
          if (i === 4) { var half = s.R * Math.sin(Math.PI * 2 / 5), left = s.x - half; c.beginPath(); c.rect(0, 0, left + (RATING - 4) * 2 * half, H); c.clip(); }   // the fifth: 80% of its width
          c.beginPath(); starPath(c, s.x, s.y, s.R, .48); c.fill(); c.restore();
        });
        var d = c.getImageData(0, 0, W, H).data, cand = [], step = Math.max(2, Math.round(cells[0].R / 22));
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
      function target() {   // 0 while the band is below the screen, 1 once its centre reaches the middle; held above
        var r = cv.getBoundingClientRect(), cy = r.top + r.height / 2, from = innerHeight + r.height / 2, to = innerHeight / 2;
        return k.motion ? Math.max(0, Math.min(1, (from - cy) / (from - to))) : 1;
      }
      function layout(fresh) {
        var r = cv.getBoundingClientRect(); W = Math.round(r.width); H = Math.round(r.height);
        if (!W || !H) return;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        geometry();
        var pts = sample(), unit = Math.max(.8, cells[0].R / 34);
        pts.forEach(function (p, i) {
          var s = stars[i];
          if (!s || fresh) s = stars[i] = { ox: 0, oy: 0, vx: 0, vy: 0, d: Math.random() * .3, ph: Math.random() * 6.28, fx: Math.random(), fy: Math.random(), k: .7 + Math.random() * .6 };
          s.r = unit * s.k * 1.25; s.tx = p[0]; s.ty = p[1];
          s.sx = s.fx * W; s.sy = s.fy * H * 1.25 - H * .05;   // a quiet starfield across (and a little below) the band
        });
        prog = target(); place(); draw(0);
      }
      function ease(t) { return 1 - Math.pow(1 - t, 3); }
      function place() {
        var sum = 0;
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i], t = Math.max(0, Math.min(1, (prog - s.d) / .7)), e = ease(t);
          s.e = e; sum += e; s.x = s.sx + (s.tx - s.sx) * e + s.ox; s.y = s.sy + (s.ty - s.sy) * e + s.oy;
        }
        // the numerals are events: they count with the stars that have arrived
        var f = stars.length ? sum / stars.length : 1;
        if (f > .995) f = 1;
        avgEl.textContent = (RATING * f).toFixed(1); nEl.textContent = String(Math.round(COUNT * f));
      }
      function draw(time) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
        // the five outlines: the rating's frame, firmer as the stars arrive
        ctx.globalAlpha = .35 + .65 * prog; ctx.strokeStyle = LINE; ctx.lineWidth = 1.5; ctx.lineJoin = 'round';
        cells.forEach(function (s) { ctx.beginPath(); starPath(ctx, s.x, s.y, s.R * 1.04, .48); ctx.stroke(); });
        // the filled share as a faint tint, clipped at exactly 4.8 of 5, so the fifth star reads as 80% full
        ctx.globalAlpha = .2 * prog; ctx.fillStyle = PALE;
        cells.forEach(function (s, i) {
          ctx.save();
          if (i === 4) { var half = s.R * Math.sin(Math.PI * 2 / 5); ctx.beginPath(); ctx.rect(0, 0, s.x - half + (RATING - 4) * 2 * half, H); ctx.clip(); }
          ctx.beginPath(); starPath(ctx, s.x, s.y, s.R, .48); ctx.fill(); ctx.restore();
        });
        ctx.fillStyle = PALE;
        for (var n = 0; n < stars.length; n++) {
          var s = stars[n], tw = k.motion ? .82 + .18 * Math.sin(time / 700 + s.ph) : 1;   // a slow twinkle
          ctx.globalAlpha = (.3 + .7 * s.e) * tw;
          ctx.beginPath(); starPath(ctx, s.x, s.y, s.r * 1.7, .45); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      function step(t) {
        raf = requestAnimationFrame(step);
        if (document.hidden || t - last < 25) return;   // a 40fps ceiling
        var dt = Math.min(2, (t - last) / 16.67); last = t;
        prog += (target() - prog) * Math.min(1, .16 * dt);
        var R = Math.max(60, W * .06), R2 = R * R;
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i], ax = -s.ox * .06, ay = -s.oy * .06, dx = s.x - ptr.x, dy = s.y - ptr.y, d2 = dx * dx + dy * dy;
          if (d2 < R2) { var d = Math.sqrt(d2) || 1, f = (R - d) / R * 2.2; ax += dx / d * f; ay += dy / d * f; }
          s.vx = (s.vx + ax * dt) * .84; s.vy = (s.vy + ay * dt) * .84; s.ox += s.vx * dt; s.oy += s.vy * dt;
        }
        place(); draw(t);
      }
      function run() { if (running || !k.motion) return; running = true; last = performance.now(); raf = requestAnimationFrame(step); }
      function stop() { running = false; cancelAnimationFrame(raf); }
      function scatter(cx, cy) {
        stars.forEach(function (s) {
          var dx = s.x - (cx == null ? W / 2 : cx), dy = s.y - (cy == null ? H / 2 : cy), d = Math.sqrt(dx * dx + dy * dy) || 1, f = 6 + Math.random() * 8;
          s.vx += dx / d * f; s.vy += dy / d * f;
        });
        run();
      }
      var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      ready.then(function () { if (root.hidden) return; layout(true); if (k.motion && inView) run(); });
      k.ro(cv, function () { if (W) layout(false); });
      k.add(function () { stop(); stars = []; ctx.clearRect(0, 0, cv.width, cv.height); avgEl.textContent = '4.8'; nEl.textContent = '343'; });
      k.on(cv, 'pointermove', function (e) { if (e.pointerType !== 'mouse') return; var r = cv.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; run(); });
      k.on(cv, 'pointerleave', function () { ptr.x = ptr.y = -9999; });
      k.on(cv, 'pointerdown', function (e) { if (e.pointerType !== 'mouse') { var r = cv.getBoundingClientRect(); scatter(e.clientX - r.left, e.clientY - r.top); } });
      k.on(root.querySelector('.rs__again'), 'click', function () { scatter(); });
      k.io(cv, function (en) { inView = en.isIntersecting; if (inView) run(); else stop(); }, { threshold: 0 });
      EZ.reveal(k, root.querySelectorAll('.rs__eye, .rs__h, .rs__acts'));
    } },
    /* NEW VERSIONS · V3 "The solid block" (governing reference: Immersive Garden, camera scrub). 343 = 7 x 7 x 7: the
       stars gather into a cube with the scroll; the scroll turns the camera, a drag turns it by hand; the pointer pushes
       stars aside and they spring home [S0340, S0089, S1326, Q41 DPR cap + 40fps ceiling]. */
    3: { init: function (root, k) {
      var cv = root.querySelector('.sk__cv'), ctx = cv.getContext('2d');
      var css = getComputedStyle(root), INK = css.getPropertyValue('--color-text').trim() || '#1c1a17', ACC = css.getPropertyValue('--color-accent-solid').trim() || '#A45540';
      var N = 7, stars = [], W = 0, H = 0, dpr = 1, unit = 1, ptr = { x: -9999, y: -9999 }, running = false, inView = false, raf = 0, last = 0, prog = 0;
      var cam = { user: 0, pitch: -0.42 }, drag = null;
      function starPath(c, x, y, R, ri) {
        for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? R * ri : R; if (i) c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); else c.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
        c.closePath();
      }
      // the camera: the scroll turns it about a quarter of the way round as the section passes (one reversible value) [S1326]
      function pass() { var r = cv.getBoundingClientRect(), cy = r.top + r.height / 2; return Math.max(0, Math.min(1, (innerHeight + r.height / 2 - cy) / (innerHeight + r.height))); }
      function target() { var r = cv.getBoundingClientRect(), cy = r.top + r.height / 2, from = innerHeight + r.height / 2, to = innerHeight / 2; return k.motion ? Math.max(0, Math.min(1, (from - cy) / (from - to))) : 1; }
      function yaw() { return (k.motion ? -1.15 + pass() * 1.35 : -0.62) + cam.user; }
      function layout(fresh) {
        var r = cv.getBoundingClientRect(); W = Math.round(r.width); H = Math.round(r.height); if (!W || !H) return;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        unit = Math.min(W, H) / 13.5;    // the spacing between neighbouring stars
        if (fresh || !stars.length) {
          stars = [];
          for (var a = 0; a < N; a++) for (var b = 0; b < N; b++) for (var c = 0; c < N; c++) {
            stars.push({ hx: a - 3, hy: b - 3, hz: c - 3,   // home: the block, centred
              fx: (Math.random() - .5) * 15, fy: (Math.random() - .5) * 7 + 2.5, fz: (Math.random() - .5) * 9,   // the loose field, a little below
              d: Math.random() * .3, k: .8 + Math.random() * .4, ox: 0, oy: 0, vx: 0, vy: 0 });
          }
        }
        prog = target(); frame();
      }
      function ease(t) { return 1 - Math.pow(1 - t, 3); }
      var proj = [];
      function frame() {
        var ya = yaw(), cyw = Math.cos(ya), syw = Math.sin(ya), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch), D = 22, cx = W / 2, cy = H / 2;
        function P(x, y, z) { var x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw, y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, f = D / (D + z2); return [cx + x1 * f * unit, cy + y1 * f * unit, z2, f]; }
        proj.length = 0;
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i], t = Math.max(0, Math.min(1, (prog - s.d) / .7)), e = ease(t);
          var q = P(s.fx + (s.hx - s.fx) * e, s.fy + (s.hy - s.fy) * e, s.fz + (s.hz - s.fz) * e);
          s.e = e; s.x = q[0] + s.ox; s.y = q[1] + s.oy; s.z = q[2]; s.f = q[3]; proj.push(s);
        }
        proj.sort(function (a, b) { return b.z - a.z; });   // far to near
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
        // the block's edges, ruled in as it forms
        var g = prog, V = [];
        for (var v = 0; v < 8; v++) V.push(P(v & 1 ? 3.6 : -3.6, v & 2 ? 3.6 : -3.6, v & 4 ? 3.6 : -3.6));
        ctx.globalAlpha = .55 * g * g; ctx.strokeStyle = ACC; ctx.lineWidth = 1.25; ctx.beginPath();
        [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]].forEach(function (e) { ctx.moveTo(V[e[0]][0], V[e[0]][1]); ctx.lineTo(V[e[1]][0], V[e[1]][1]); });
        ctx.stroke();
        // the stars, shaded by depth: near ones darker and larger
        ctx.fillStyle = INK;
        for (var n = 0; n < proj.length; n++) {
          var p = proj[n], depth = Math.max(0, Math.min(1, (p.z + 6) / 12));
          ctx.globalAlpha = (.28 + .72 * (1 - depth)) * (.45 + .55 * p.e);
          ctx.beginPath(); starPath(ctx, p.x, p.y, unit * .26 * p.k * p.f * (1.1 - .25 * depth), .45); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      function step(t) {
        raf = requestAnimationFrame(step);
        if (document.hidden || t - last < 25) return;   // a 40fps ceiling
        var dt = Math.min(2, (t - last) / 16.67); last = t;
        prog += (target() - prog) * Math.min(1, .16 * dt);
        var R = Math.max(60, Math.min(W, H) * .16), R2 = R * R;
        for (var i = 0; i < stars.length; i++) {   // springs: pushed by the pointer, always pulled home [S0340]
          var s = stars[i], ax = -s.ox * .06, ay = -s.oy * .06, dx = s.x - ptr.x, dy = s.y - ptr.y, d2 = dx * dx + dy * dy;
          if (!drag && d2 < R2) { var d = Math.sqrt(d2) || 1, f = (R - d) / R * 2.2; ax += dx / d * f; ay += dy / d * f; }
          s.vx = (s.vx + ax * dt) * .84; s.vy = (s.vy + ay * dt) * .84; s.ox += s.vx * dt; s.oy += s.vy * dt;
        }
        frame();
      }
      function run() { if (running || !k.motion) return; running = true; last = performance.now(); raf = requestAnimationFrame(step); }
      function stop() { running = false; cancelAnimationFrame(raf); }
      function scatter(px, py) {
        stars.forEach(function (s) { var dx = s.x - (px == null ? W / 2 : px), dy = s.y - (py == null ? H / 2 : py), d = Math.sqrt(dx * dx + dy * dy) || 1, f = 6 + Math.random() * 8; s.vx += dx / d * f; s.vy += dy / d * f; });
        run();
      }

      /* ---------- by hand: drag turns the block (sideways only on touch); a tap scatters [S1443] ---------- */
      function local(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
      k.on(cv, 'pointerdown', function (e) {
        if (e.button > 0) return; var p = local(e);
        drag = { id: e.pointerId, x: e.clientX, y: e.clientY, u: cam.user, live: e.pointerType === 'mouse', moved: false, px: p[0], py: p[1], touch: e.pointerType !== 'mouse' };
        if (drag.live) { try { cv.setPointerCapture(e.pointerId); } catch (x) {} cv.classList.add('is-drag'); }
      });
      k.on(cv, 'pointermove', function (e) {
        if (e.pointerType === 'mouse' && !drag) { var p = local(e); ptr.x = p[0]; ptr.y = p[1]; run(); return; }
        if (!drag) return;
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (!drag.live) { if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; } if (Math.abs(dx) > 8) { drag.live = true; cv.classList.add('is-drag'); try { cv.setPointerCapture(drag.id); } catch (x) {} } else return; }
        if (Math.abs(dx) > 3) drag.moved = true;
        cam.user = drag.u + dx * .009; if (k.motion) run(); else frame();
      });
      function end(e) {
        if (!drag) return; var d = drag; drag = null; cv.classList.remove('is-drag');
        if (d.touch && !d.moved && e && e.type === 'pointerup') scatter(d.px, d.py);   // a tap scatters on touch
      }
      k.on(cv, 'pointerup', end); k.on(cv, 'pointercancel', function () { drag = null; cv.classList.remove('is-drag'); });
      k.on(cv, 'pointerleave', function () { ptr.x = ptr.y = -9999; });
      k.on(root.querySelector('.sk__again'), 'click', function () { scatter(); });
      k.on(root.querySelector('.sk__turn'), 'click', function () {   // the keyboard path to turning it: a quarter turn
        if (!k.motion) { cam.user += Math.PI / 2; frame(); return; }
        gsap.to(cam, { user: cam.user + Math.PI / 2, duration: .9, ease: 'power3.inOut' }); run();
      });

      var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      ready.then(function () { if (root.hidden) return; layout(true); if (k.motion && inView) run(); });
      k.ro(cv, function () { if (W) layout(false); });
      k.add(function () { stop(); stars = []; gsap.killTweensOf(cam); ctx.clearRect(0, 0, cv.width, cv.height); });
      k.io(cv, function (en) { inView = en.isIntersecting; if (inView) run(); else stop(); }, { threshold: 0 });
      EZ.reveal(k, root.querySelectorAll('.sk__head, .sk__fig, .sk__line, .sk__acts'));
    } }
  });
})();
