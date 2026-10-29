/* reviews, PLAN-V3 §3. Aggregate first (4.8 / 343); quotes verbatim, never edited. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  function f(n) { return Math.round(n * 10) / 10; }

  EZ.section('reviews', {
    /* v1 · On the tape [Codrops marquee along a path + BANK 169] */
    1: { init: function (root, k) {
      var run = root.querySelector('.reviews1__run'), svg = root.querySelector('.reviews1__svg');
      var lis = Array.prototype.slice.call(root.querySelectorAll('.reviews1__list li'));
      var pause = root.querySelector('.reviews1__pause'), pl = pause.querySelector('.btn__label');
      EZ.reveal(k, root.querySelectorAll('.reviews__agg > *'));
      if (!k.motion) { root.classList.add('is-static'); k.add(function () { root.classList.remove('is-static'); }); return; }
      var L = 0, off = 0, speed = 1, target = 1, BASE = k.mobile ? 34 : 46, paused = false, inView = false, path;
      function build() {
        var W = run.clientWidth, H = run.clientHeight;
        if (!W) return;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        // the loop is exactly as long as the cards need: spacing = card width x 1.12, so no card sits on another
        var cw = lis[0].firstElementChild.offsetWidth || 300, need = lis.length * cw * 1.12, ext = Math.max(200, (need - W) / 2), d = '';
        function trace() {
          d = '';
          for (var i = 0; i <= 120; i++) {
            var x = -ext + (W + ext * 2) * i / 120, y = H * .5 + Math.sin(x / Math.max(W, 900) * Math.PI * 1.15 + .6) * H * .14;
            d += (i ? 'L' : 'M') + f(x) + ' ' + f(y);
          }
          svg.innerHTML = '<path class="band" d="' + d + '"/><path class="stripe" d="' + d + '"/>';
          path = svg.querySelector('.band');
          L = path.getTotalLength();
        }
        for (var it = 0; it < 3; it++) { trace(); ext += (need - L) / 2; ext = Math.max(100, ext); }
        trace();
        lis.forEach(function (li) { li.style.offsetPath = 'path("' + d + '")'; });
        place();
      }
      function place() {
        var gap = L / lis.length;
        lis.forEach(function (li, i) { li.style.offsetDistance = (((off + i * gap) % L) + L) % L + 'px'; });
      }
      k.ro(run, build);
      build();
      k.add(function () { svg.innerHTML = ''; lis.forEach(function (li) { li.style.offsetPath = li.style.offsetDistance = ''; }); });
      var loop = k.raf(function (dt) {
        speed = EZ.damp(speed, paused ? 0 : target, 5, dt);       // hover slows to .3 on a spring-like damp
        off += BASE * speed * dt;
        place();
      });
      k.io(run, function (en) { inView = en.isIntersecting; inView ? loop.start() : loop.stop(); });
      k.on(run, 'pointerenter', function (e) { if (e.pointerType === 'mouse') target = .3; });
      k.on(run, 'pointerleave', function () { target = 1; });
      k.on(run, 'focusin', function () { target = .3; });
      k.on(run, 'focusout', function () { target = 1; });
      k.on(pause, 'click', function () {
        paused = !paused;
        pause.setAttribute('aria-pressed', paused ? 'true' : 'false');
        pl.textContent = paused ? 'Run the tape' : 'Pause the tape';
      });
      k.add(function () { pause.setAttribute('aria-pressed', 'false'); pl.textContent = 'Pause the tape'; });
      gsap.fromTo(svg.querySelectorAll('path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.2, ease: 'power2.inOut', scrollTrigger: { trigger: run, start: 'top 80%', once: true } });
    } },

    /* v2 · The site board [comb lift S0409] */
    2: { init: function (root, k) {
      var notes = Array.prototype.slice.call(root.querySelectorAll('.reviews2__note'));
      if (!k.motion) return;
      gsap.from(root.querySelector('.reviews2__sign'), { y: -30, autoAlpha: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.reviews2__board'), start: 'top 80%', once: true } });
      gsap.from(notes, { y: -40, autoAlpha: 0, duration: .6, ease: 'bounce.out', stagger: .06, scrollTrigger: { trigger: root.querySelector('.reviews2__grid'), start: 'top 80%', once: true } });
      notes.forEach(function (n, i) {
        k.on(n, 'pointerenter', function (e) {
          if (e.pointerType !== 'mouse') return;
          n.classList.add('is-up');
          notes.forEach(function (m, j) {
            var dist = Math.abs(i - j);
            gsap.to(m, { y: -4 * Math.pow(.45, dist) * (j === i ? 2 : 1), scale: j === i ? 1.03 : 1, boxShadow: j === i ? '0 26px 30px -14px rgba(0,0,0,.6)' : '0 10px 18px -10px rgba(0,0,0,.55)', duration: .32, ease: 'power3.out', overwrite: 'auto' });
          });
        });
        k.on(n, 'pointerleave', function () {
          n.classList.remove('is-up');
          gsap.to(notes, { y: 0, scale: 1, boxShadow: '0 10px 18px -10px rgba(0,0,0,.55)', duration: .5, ease: 'back.out(3)', overwrite: 'auto' });
        });
      });
      k.add(function () { notes.forEach(function (n) { n.classList.remove('is-up'); }); });
    } },

    /* v3 · Under the work lamp [S0634 spotlight-follow + BANK 292] */
    3: { init: function (root, k) {
      var bench = root.querySelector('.reviews3__bench'), svg = root.querySelector('.reviews3__lamp');
      var qs = Array.prototype.slice.call(root.querySelectorAll('.reviews3__q'));
      EZ.reveal(k, root.querySelectorAll('.reviews3__head > *'));
      if (!k.motion) { svg.style.display = 'none'; k.add(function () { svg.style.display = ''; }); return; }
      var reveal = qs.map(function () { return { r: 0 }; }), C = [], W = 0, H = 0;
      var lamp = { x: 0, tx: 0, ty: 0, px: 0, py: 0 }, head, beam, hasPtr = false;
      function build() {
        W = bench.clientWidth; H = bench.clientHeight;
        if (!W) return;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        svg.innerHTML = '<defs><radialGradient id="rv3-beam" gradientUnits="userSpaceOnUse" r="1"><stop offset="0" stop-color="#fff1b8" stop-opacity=".2"/><stop offset="1" stop-color="#fff1b8" stop-opacity="0"/></radialGradient></defs>' +
          '<path class="rail" d="M0 26H' + W + '"/><path class="beam" d=""/>' +
          '<g class="lh"><rect x="-10" y="18" width="20" height="16" rx="3" fill="#c9d1d3" stroke="#0B1418" stroke-width="2"/><path d="M0 34V52" stroke="#5f7176" stroke-width="4"/>' +
          '<g class="hd"><path d="M-16 52 L16 52 L24 84 L-24 84 Z" fill="#1d4a4e" stroke="#0B1418" stroke-width="2.5" stroke-linejoin="round"/><ellipse cx="0" cy="84" rx="24" ry="5" fill="#fff1b8" stroke="#0B1418" stroke-width="2"/></g></g>';
        head = svg.querySelector('.lh'); beam = svg.querySelector('.beam');
        var br = bench.getBoundingClientRect();
        C = qs.map(function (q) { var r = q.getBoundingClientRect(); return [r.left - br.left + r.width / 2, r.top - br.top + r.height / 2]; });
        if (!lamp.x) { lamp.x = W * .3; lamp.px = W * .3; lamp.py = H * .4; }
      }
      function render() {
        var R = 230;
        qs.forEach(function (q, i) {
          var c = C[i] || [0, 0], dd = Math.hypot(c[0] - lamp.px, (c[1] - lamp.py) * 1.3), lit = Math.max(0, 1 - dd / R);
          var o = (.55 + .45 * lit) * (.1 + .9 * reveal[i].r);
          q.style.opacity = o.toFixed(3);
          q.style.filter = reveal[i].r < .99 ? 'blur(' + ((1 - reveal[i].r) * 4).toFixed(2) + 'px)' : '';
        });
        if (!head || !head.isConnected) return;
        head.setAttribute('transform', 'translate(' + f(lamp.x) + ' 0)');
        var ang = Math.atan2(lamp.px - lamp.x, Math.max(40, lamp.py - 52)) * 180 / Math.PI;
        head.querySelector('.hd').setAttribute('transform', 'rotate(' + f(-EZ.clamp(ang, -55, 55)) + ' 0 52)');
        var a = (-EZ.clamp(ang, -55, 55)) * Math.PI / 180, hx = lamp.x - Math.sin(a) * 84, hy = 52 + Math.cos(a) * 32 + 32;
        var nx = Math.cos(a) * 24, ny = Math.sin(a) * 24;
        beam.setAttribute('d', 'M' + f(hx - nx) + ' ' + f(hy - ny) + 'L' + f(lamp.px - 150) + ' ' + f(lamp.py + 60) + 'A150 90 0 0 0 ' + f(lamp.px + 150) + ' ' + f(lamp.py + 60) + 'L' + f(hx + nx) + ' ' + f(hy + ny) + 'Z');
        var g = svg.querySelector('#rv3-beam');
        if (!g) return;
        g.setAttribute('cx', f(lamp.px)); g.setAttribute('cy', f(lamp.py)); g.setAttribute('r', '320');
      }
      k.ro(bench, function () { build(); render(); });
      build();
      qs.forEach(function (q, i) {
        gsap.to(reveal[i], { r: 1, ease: 'none', onUpdate: render, scrollTrigger: { trigger: q, start: 'top 92%', end: 'top 62%', scrub: true } });
      });
      var loop = k.raf(function () {
        if (!hasPtr) {
          // no pointer: the lamp lights the review nearest the middle of the screen
          var br = bench.getBoundingClientRect(), mid = innerHeight / 2 - br.top, best = 0, bd = 1e9;
          C.forEach(function (c, i) { var d = Math.abs(c[1] - mid); if (d < bd) { bd = d; best = i; } });
          if (C[best]) { lamp.tx = C[best][0]; lamp.ty = C[best][1]; }
        }
        lamp.px += (lamp.tx - lamp.px) * .12; lamp.py += (lamp.ty - lamp.py) * .12;
        lamp.x += (EZ.clamp(lamp.px, 30, W - 30) - lamp.x) * .08;
        render();
      });
      k.io(bench, function (en) { en.isIntersecting ? loop.start() : loop.stop(); });
      if (k.fine) {
        k.on(bench, 'pointermove', function (e) { var r = bench.getBoundingClientRect(); hasPtr = true; lamp.tx = e.clientX - r.left; lamp.ty = e.clientY - r.top; });
        k.on(bench, 'pointerleave', function () { hasPtr = false; });
      }
      k.add(function () { svg.innerHTML = ''; qs.forEach(function (q) { q.style.opacity = ''; q.style.filter = ''; }); });
    } }
  });
})();
