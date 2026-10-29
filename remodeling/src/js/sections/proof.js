/* proof, PLAN-V3 §3: v1 inspection record (P14 stamp), v2 tape-measured odometers (Count Up 279 + Stroke Text 167),
   v3 survey station (True Focus 300 + Heron grid). */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var STAMP = EZ.bezier(.2, 1.6, .4, 1);          // [BANK P14] overshoot keyframe

  EZ.section('proof', {
    /* v1 · Inspection record */
    1: { init: function (root, k) {
      var card = root.querySelector('.proof1__paper');
      var stamps = root.querySelectorAll('.proof1__stamp');
      var rows = root.querySelectorAll('.proof1__table tbody tr');
      if (!k.motion) return;
      EZ.reveal(k, root.querySelectorAll('.proof1__intro > *'));
      gsap.from(root.querySelector('.proof1__card'), { y: 48, autoAlpha: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.proof1__card'), start: 'top 85%', once: true } });
      gsap.fromTo(root.querySelectorAll('.proof1__string'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .8, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
      gsap.set(stamps, { autoAlpha: 0, scale: 1.9 });
      var tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 62%', once: true } });
      stamps.forEach(function (st, i) {
        var at = i * .16;
        tl.to(st, { autoAlpha: .92, scale: 1, duration: .6, ease: STAMP }, at)
          .fromTo(rows[i], { backgroundColor: 'rgba(200,64,46,.10)' }, { backgroundColor: 'rgba(200,64,46,0)', duration: .7, ease: 'power2.out' }, at + .18)
          .fromTo(card, { y: 0 }, { y: 2, duration: .05, yoyo: true, repeat: 1, ease: 'power1.inOut' }, at + .16);
      });
    } },

    /* v2 · Measured */
    2: { init: function (root, k) {
      var rows = Array.prototype.slice.call(root.querySelectorAll('.proof2__row'));
      EZ.reveal(k, root.querySelectorAll('.proof2__head > *'));

      // tape blades, drawn to each row's width
      rows.forEach(function (row, ri) {
        var svg = row.querySelector('.proof2__svg'), tape = row.querySelector('.proof2__tape');
        var p = { v: k.motion ? 0 : 1 }, parts = null;
        function draw() {
          var W = tape.clientWidth, H = tape.clientHeight;
          if (!W) return;
          svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
          var by = Math.round(H * .26), bh = Math.round(H * .44), x0 = 50, ticks = '', nums = '';
          for (var x = x0 + 8, n = 0; x < W - 4; x += 8, n++) {
            var big = (n + 1) % 10 === 0, mid = (n + 1) % 5 === 0;
            ticks += 'M' + x + ' ' + by + 'v' + (big ? bh * .55 : mid ? bh * .38 : bh * .22);
            if (big) nums += '<text class="tn" x="' + (x - 3) + '" y="' + (by + bh - 3) + '" text-anchor="end">' + ((n + 1) / 10) + '</text>';
          }
          svg.innerHTML = '<defs><clipPath id="p2c' + ri + '"><rect class="clip" x="' + x0 + '" y="0" width="' + (W - x0) + '" height="' + H + '"/></clipPath></defs>' +
            '<g clip-path="url(#p2c' + ri + ')"><rect class="blade" x="' + x0 + '" y="' + by + '" width="' + (W - x0) + '" height="' + bh + '"/><path class="tick" d="' + ticks + '"/>' + nums + '</g>' +
            '<path class="hook" d="M0 ' + (by - 5) + 'h5v' + (bh + 10) + 'h-5z"/>' +
            '<rect class="case" x="1" y="1" width="54" height="' + (H - 2) + '" rx="10"/><rect class="grip" x="10" y="' + (H / 2 - 7) + '" width="30" height="14" rx="3"/>';
          parts = { clip: svg.querySelector('.clip'), hook: svg.querySelector('.hook'), x0: x0, W: W };
          set();
        }
        function set() {
          if (!parts) return;
          var w = (parts.W - parts.x0) * p.v;
          parts.clip.setAttribute('width', Math.max(0, w));
          parts.hook.setAttribute('transform', 'translate(' + (parts.x0 + w - 1) + ' 0)');
        }
        k.ro(tape, draw);
        draw();
        if (!k.motion) return;
        gsap.to(p, { v: 1, ease: 'none', onUpdate: set, scrollTrigger: { trigger: row, start: 'top 92%', end: 'top 48%', scrub: .6 } });
        gsap.from(row.querySelector('.proof2__cap'), { y: 18, autoAlpha: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 78%', once: true } });
      });

      if (!k.motion) return;
      // odometer roll [BANK 279]: cells 1em, stagger .07, turns <= 3 - rank, velocity blur while fast; outline fills on landing
      rows.forEach(function (row) {
        var num = row.querySelector('.proof2__num');
        var val = num.dataset.n, orig = num.innerHTML;
        num.innerHTML = '<span class="sr-only">' + val + '</span>' + val.split('').map(function (ch) {
          if (!/\d/.test(ch)) return '<span class="proof2__cell" aria-hidden="true"><span class="proof2__strip"><span>' + ch + '</span></span></span>';
          return '<span class="proof2__cell" aria-hidden="true" data-d="' + ch + '"><span class="proof2__strip"></span></span>';
        }).join('');
        k.add(function () { num.innerHTML = orig; num.classList.remove('is-outline'); });
        var cells = num.querySelectorAll('.proof2__cell[data-d]'), strips = [];
        cells.forEach(function (c, i) {
          var d = +c.dataset.d, turns = Math.max(1, 3 - i), s = '';
          // the strip starts and ends on the real digit, so the figure never reads 0 before or after the roll
          for (var t = 0; t <= turns * 10; t++) s += '<span>' + ((d + t) % 10) + '</span>';
          var strip = c.querySelector('.proof2__strip');
          strip.innerHTML = s;
          strips.push({ el: strip, to: turns * 10 });
        });
        num.classList.add('is-outline');
        var tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 80%', once: true }, onComplete: function () { num.classList.remove('is-outline'); } });
        strips.forEach(function (s, i) {
          tl.to(s.el, { yPercent: 0, y: function () { return -s.to * s.el.firstChild.offsetHeight; }, duration: 1.5, ease: 'expo.out' }, i * .07)
            .fromTo(s.el, { filter: 'blur(2.5px)' }, { filter: 'blur(0px)', duration: 1.1, ease: 'power2.in' }, i * .07);
        });
      });
    } },

    /* v3 · Survey station */
    3: { init: function (root, k) {
      var plan = root.querySelector('.proof3__plan');
      var svg = root.querySelector('.proof3__svg');
      var targets = Array.prototype.slice.call(root.querySelectorAll('.proof3__t'));
      var focus = root.querySelector('.proof3__focus');
      var station = root.querySelector('.proof3__station');
      var headG = root.querySelector('.proof3__head-g');
      var readK = root.querySelector('.proof3__read-k'), readV = root.querySelector('.proof3__read-v');
      var TEXT = [
        'Florida Certified Building Contractor, licence CBC1265280, recognised by the Department of Business and Professional Regulation.',
        '4.8 stars on Google, based on 343 reviews.',
        '104 municipalities across Miami-Dade, Broward and Palm Beach, and the licence to build in all of them.',
        '52 photographed projects, each with its own gallery. Every image is the firm’s own work.',
        '30+ years of combined experience, in a business led by husband and wife Sean and Raz Elbaz.'
      ];
      var laser, dot, cur = 0, W = 0, H = 0;
      function build() {
        W = plan.clientWidth; H = plan.clientHeight;
        if (!W) return;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        var c = 22, s = '';
        [[8, 8, 1, 1], [W - 8, 8, -1, 1], [W - 8, H - 8, -1, -1], [8, H - 8, 1, -1]].forEach(function (p) {
          s += '<path class="corner" d="M' + p[0] + ' ' + (p[1] + c * p[3]) + 'V' + p[1] + 'H' + (p[0] + c * p[2]) + 'M' + (p[0] + 10 * p[2]) + ' ' + (p[1] + 10 * p[3]) + 'm-5 0h10m-5 -5v10"/>';
        });
        s += '<line class="laser" x1="0" y1="0" x2="0" y2="0"/><circle class="dot" cx="0" cy="0" r="4"/>';
        svg.innerHTML = s;
        laser = svg.querySelector('.laser'); dot = svg.querySelector('.dot');
        aim(cur, true);
      }
      function centre(el) {
        var pr = plan.getBoundingClientRect(), r = el.getBoundingClientRect();
        return { x: r.left - pr.left + r.width / 2, y: r.top - pr.top + 24, r: r, pr: pr };
      }
      function tip() {
        var pr = plan.getBoundingClientRect(), r = station.getBoundingClientRect(), sc = r.width / 120;
        return { x: r.left - pr.left + 60 * sc, y: r.top - pr.top + 37 * sc, sc: sc };
      }
      function aim(i, now) {
        cur = i;
        var t = targets[i];
        targets.forEach(function (el, j) { el.classList.toggle('is-on', j === i); });
        readK.textContent = 'Target 0' + (i + 1);
        readV.textContent = TEXT[i];
        var c = centre(t), pad = 8;
        var box = { x: c.r.left - c.pr.left - pad, y: c.r.top - c.pr.top - pad, width: c.r.width + pad * 2, height: c.r.height + pad * 2 };
        var d = now || !k.motion ? 0 : .5;
        gsap.to(focus, { x: box.x, y: box.y, width: box.width, height: box.height, duration: d, ease: 'power3.inOut', overwrite: 'auto' });
        if (!laser || EZ.mobile()) return;
        var o = tip(), ang = Math.atan2(c.y - o.y, c.x - o.x) * 180 / Math.PI;
        gsap.to(headG, { rotation: EZ.clamp(ang, -60, 30), svgOrigin: '60 37', duration: d, ease: 'power3.inOut', overwrite: 'auto' });
        var sx = o.x + Math.cos(ang * Math.PI / 180) * 42 * o.sc, sy = o.y + Math.sin(ang * Math.PI / 180) * 42 * o.sc;
        gsap.to(laser, { attr: { x1: sx, y1: sy, x2: c.x, y2: c.y }, duration: d, ease: 'power3.inOut', overwrite: 'auto' });
        gsap.to(dot, { attr: { cx: c.x, cy: c.y }, duration: d, ease: 'power3.inOut', overwrite: 'auto' });
        if (!now && k.motion) gsap.fromTo(dot, { scale: 2.4, transformOrigin: '50% 50%' }, { scale: 1, duration: .4, delay: d, ease: 'expo.out' });
      }
      k.ro(plan, build);
      build();
      k.add(function () { gsap.set(focus, { clearProps: 'all' }); targets.forEach(function (el) { el.classList.remove('is-on'); }); root.classList.remove('is-cycling'); });

      // True Focus [BANK 300]: hold 1s, move .5s; manual on hover / focus; paused offscreen
      var timer = null, manual = false, inView = false;
      function next() { aim((cur + 1) % targets.length); }
      function run() { stop(); if (k.motion && inView && !manual) { root.classList.add('is-cycling'); timer = setInterval(next, 1500); } }
      function stop() { clearInterval(timer); timer = null; }
      k.add(stop);
      targets.forEach(function (t, i) {
        k.on(t, 'pointerenter', function (e) { if (e.pointerType === 'mouse') { manual = true; stop(); root.classList.add('is-cycling'); aim(i); } });
        k.on(t, 'focus', function () { manual = true; stop(); root.classList.add('is-cycling'); aim(i); });
        k.on(t, 'click', function () { manual = true; stop(); aim(i); });
      });
      k.on(plan, 'pointerleave', function () { manual = false; run(); });
      k.on(plan, 'focusout', function (e) { if (!plan.contains(e.relatedTarget)) { manual = false; run(); } });
      k.io(plan, function (en) { inView = en.isIntersecting; if (inView) run(); else stop(); }, { threshold: .3 });
      if (k.motion) {
        EZ.reveal(k, root.querySelectorAll('.proof3__head > *'));
        gsap.from(targets, { scale: .6, autoAlpha: 0, duration: .5, ease: 'back.out(2)', stagger: .08, scrollTrigger: { trigger: plan, start: 'top 75%', once: true } });
        gsap.from(station, { y: 40, autoAlpha: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: plan, start: 'top 75%', once: true } });
      }
    } }
  });
})();
