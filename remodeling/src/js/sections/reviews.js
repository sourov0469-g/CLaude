/* reviews [PLAN-V2 2.7] */
(function () {
  // seeded random so the sky is the same on every visit
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

  EZ.section('reviews', {
    /* v1 · Constellation: 343 points, one per review, assemble into the rating figure */
    1: { init: function (root, k) {
      var sky = root.querySelector('.reviews1__sky'), cv = root.querySelector('.reviews1__canvas'), cx = cv.getContext('2d');
      var N = 343, LINK = 90, SCATTER = 90;
      var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, pts = [], color = '#77b3b8', ink = 'rgba(232,228,220,.5)';
      var asm = { p: 0 }, px = -1e4, py = -1e4, inView = false, assembled = false, loop = null;
      function readColors() {
        var cs = getComputedStyle(root);
        color = cs.getPropertyValue('--accent').trim() || '#77b3b8';
        ink = cs.getPropertyValue('--muted').trim() || '#a9b6b9';
      }
      function targets() {
        // sample the figure "4.8" set in the brand's Bebas Neue on an offscreen canvas
        var oc = document.createElement('canvas'); oc.width = W; oc.height = H;
        var o = oc.getContext('2d'), fs = H * .92;
        o.fillStyle = '#000'; o.textAlign = 'center'; o.textBaseline = 'middle';
        o.font = '400 ' + fs + 'px "Bebas Neue", "Arial Narrow", sans-serif';
        o.fillText('4.8', W / 2, H * .53);
        var data = o.getImageData(0, 0, W, H).data, cand = [], step = Math.max(3, Math.round(Math.sqrt((W * H * .16) / (N * 2.2))));
        for (var y = 0; y < H; y += step) for (var x = 0; x < W; x += step) if (data[(y * W + x) * 4 + 3] > 128) cand.push([x, y]);
        var r = rng(7), out = [];
        while (out.length < N && cand.length) out.push(cand.splice(Math.floor(r() * cand.length), 1)[0]);
        // jitter inside each sampling cell so the figure reads as stars, not a printed grid
        out.forEach(function (p) { p[0] += (r() - .5) * step * .8; p[1] += (r() - .5) * step * .8; });
        while (out.length < N) out.push([W / 2, H / 2]);
        return out;
      }
      function layout() {
        var r = sky.getBoundingClientRect();
        W = Math.max(10, Math.round(r.width * dpr)); H = Math.max(10, Math.round(r.height * dpr));
        cv.width = W; cv.height = H;
        var t = targets(), rr = rng(11);
        if (!pts.length) for (var i = 0; i < N; i++) pts.push({ sx: rr() * W, sy: rr() * H, vx: (rr() - .5) * .25 * dpr, vy: (rr() - .5) * .25 * dpr, ox: 0, oy: 0, tw: rr() * 6.28, d: 0 });
        pts.forEach(function (p, i) {
          p.tx = t[i][0]; p.ty = t[i][1];
          p.d = Math.min(.8, Math.hypot(p.sx - p.tx, p.sy - p.ty) / Math.max(W, H) * .9);   // farther points leave later
          if (p.sx > W) p.sx = rr() * W; if (p.sy > H) p.sy = rr() * H;
        });
        draw(0);
      }
      function ease(t) { return t < .5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2; }   // expo-ish in-out
      function draw(dt) {
        cx.clearRect(0, 0, W, H);
        var a = asm.p, R = 2.1 * dpr, linkD = LINK * dpr, sc = SCATTER * dpr;
        for (var i = 0; i < N; i++) {
          var p = pts[i];
          if (!assembled && k.motion) { p.sx += p.vx; p.sy += p.vy; if (p.sx < 0 || p.sx > W) p.vx *= -1; if (p.sy < 0 || p.sy > H) p.vy *= -1; }
          var l = Math.min(1, Math.max(0, (a * 1.8 - p.d) / 1));
          var e = ease(l);
          var x = p.sx + (p.tx - p.sx) * e, y = p.sy + (p.ty - p.sy) * e;
          // the pointer scatters nearby points; they spring back when it leaves
          var dx = x - px, dy = y - py, d = Math.sqrt(dx * dx + dy * dy), tox = 0, toy = 0;
          if (d < sc && d > .01) { var f = Math.pow(1 - d / sc, 2) * 26 * dpr; tox = dx / d * f; toy = dy / d * f; }
          p.ox = EZ.damp(p.ox, tox, 10, dt || 1 / 60); p.oy = EZ.damp(p.oy, toy, 10, dt || 1 / 60);
          p.x = x + p.ox; p.y = y + p.oy; p.l = l;
        }
        // constellation lines between near neighbours; they fade as the figure locks
        var lineA = 1 - Math.min(1, a * 1.25);
        if (lineA > .02) {
          cx.lineWidth = .8 * dpr;
          for (var m = 0; m < N; m++) {
            for (var n = m + 1; n < N; n++) {
              var ddx = pts[m].x - pts[n].x; if (ddx > linkD || ddx < -linkD) continue;
              var ddy = pts[m].y - pts[n].y, dd = ddx * ddx + ddy * ddy;
              if (dd < linkD * linkD) {
                cx.globalAlpha = (1 - Math.sqrt(dd) / linkD) * .35 * lineA;
                cx.strokeStyle = ink; cx.beginPath(); cx.moveTo(pts[m].x, pts[m].y); cx.lineTo(pts[n].x, pts[n].y); cx.stroke();
              }
            }
          }
        }
        cx.fillStyle = color;
        var now = performance.now() / 1000;
        for (var j = 0; j < N; j++) {
          var q = pts[j], tw = assembled && k.motion ? .75 + .25 * Math.sin(now * 1.6 + q.tw) : 1;
          cx.globalAlpha = (.45 + .55 * q.l) * tw;
          cx.beginPath(); cx.arc(q.x, q.y, R * (.8 + .4 * q.l), 0, 6.283); cx.fill();
        }
        cx.globalAlpha = 1;
      }
      readColors();
      k.on(document, 'ez:theme', function () { readColors(); draw(0); });
      layout();
      k.ro(sky, function () { layout(); });
      if (document.fonts) document.fonts.ready.then(function () { if (cv.isConnected) layout(); });
      if (!k.motion) { asm.p = 1; assembled = true; draw(0); return; }
      k.on(sky.parentNode, 'pointermove', function (e) { var r = cv.getBoundingClientRect(); px = (e.clientX - r.left) * dpr; py = (e.clientY - r.top) * dpr; }, { passive: true });
      k.on(sky.parentNode, 'pointerleave', function () { px = py = -1e4; });
      function run() {
        if (loop) return;
        loop = k.raf(function (dt) { if (!inView) { loop = null; return false; } draw(dt); });
      }
      k.io(sky, function (e) {
        inView = e.isIntersecting;
        if (inView) run();
        if (inView && e.intersectionRatio > .45 && !asm.started) {
          asm.started = true;
          k.ctx.add(function () { gsap.to(asm, { p: 1, duration: 2.6, ease: 'none', onComplete: function () { assembled = true; } }); });
        }
      }, { threshold: [0, .45, .6] });
      EZ.reveal(k, root.querySelectorAll('.reviews1__side > *, .reviews1__q'));
    } },

    /* v2 · the record: dated, tagged, named feed */
    2: { init: function (root, k) {
      var btns = Array.prototype.slice.call(root.querySelectorAll('.reviews2__filters button'));
      var items = Array.prototype.slice.call(root.querySelectorAll('.reviews2__item'));
      btns.forEach(function (b) {
        k.on(b, 'click', function () {
          btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          var t = b.dataset.t;
          items.forEach(function (li) {
            var on = !t || li.dataset.tags.split(' ').indexOf(t) > -1;
            if (on && li.hidden && k.motion) { li.hidden = false; k.ctx.add(function () { gsap.from(li, { y: 16, autoAlpha: 0, duration: .3, ease: 'power2.out' }); }); }
            li.hidden = !on;
          });
        });
      });
      k.add(function () { items.forEach(function (li) { li.hidden = false; }); });
      EZ.reveal(k, root.querySelectorAll('.reviews2__agg > *'));
      EZ.reveal(k, items);
    } },

    /* v3 · two review trains, opposite directions */
    3: { init: function (root, k) {
      var trains = root.querySelectorAll('.reviews3__train'), pause = root.querySelector('.reviews3__pause');
      EZ.reveal(k, root.querySelectorAll('.reviews3__head > *'));
      if (!k.motion) { root.classList.add('is-static'); pause.hidden = true; k.add(function () { root.classList.remove('is-static'); pause.hidden = false; }); return; }
      var userPaused = false, hover = false, inView = false;
      // about 45 px/s: a 60s-per-lap marquee as Stronghold runs its own (pixelsPerSecond = speed x 100)
      var loops = Array.prototype.map.call(trains, function (t) {
        var lp = EZ.horizontalLoop(t.querySelectorAll('.reviews3__card'), { repeat: -1, paused: true, speed: .45, paddingRight: parseFloat(getComputedStyle(t.querySelector('.reviews3__card')).marginRight) || 24 });
        if (+t.dataset.dir < 0) { lp.vars.onReverseComplete(); }
        lp.dir = +t.dataset.dir;
        return lp;
      });
      function run() {
        loops.forEach(function (l) {
          if (!userPaused && !hover && inView) { if (l.dir < 0) l.reverse(); else l.play(); } else l.pause();
        });
      }
      trains.forEach(function (t) {
        k.on(t, 'pointerenter', function () { hover = true; run(); });
        k.on(t, 'pointerleave', function () { hover = false; run(); });
        k.on(t, 'focusin', function () { hover = true; run(); });
        k.on(t, 'focusout', function () { hover = false; run(); });
      });
      k.on(pause, 'click', function () { userPaused = !userPaused; pause.textContent = userPaused ? 'Play' : 'Pause'; pause.setAttribute('aria-pressed', userPaused ? 'true' : 'false'); run(); });
      k.io(root, function (e) { inView = e.isIntersecting; run(); });
      k.on(window, 'resize', function () { loops.forEach(function (l) { l.refresh(true); }); });
      k.add(function () { loops.forEach(function (l) { l.kill(); }); gsap.set(root.querySelectorAll('.reviews3__card'), { clearProps: 'transform' }); });
    } }
  });
})();
