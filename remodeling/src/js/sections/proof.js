/* proof: v1 inspection record (P14 stamp), v2 meter plate (Count Up 279 roll mode), v3 survey station (True Focus 300 + Heron grid).
   Entrances dosed at .3s (FULL §4); the stamp thud and the focus jump keep their reference tempo as the centrepiece actions. */
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
      gsap.from(root.querySelector('.proof1__card'), { y: 24, autoAlpha: 0, duration: .3, ease: 'power2.out', scrollTrigger: { trigger: root.querySelector('.proof1__card'), start: 'top 85%', once: true } });
      gsap.fromTo(root.querySelectorAll('.proof1__string'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .3, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
      gsap.set(stamps, { autoAlpha: 0, scale: 1.9 });
      var tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 62%', once: true } });
      stamps.forEach(function (st, i) {
        var at = i * .16;
        tl.to(st, { autoAlpha: .92, scale: 1, duration: .3, ease: STAMP }, at)
          .fromTo(rows[i], { backgroundColor: 'rgba(200,64,46,.10)' }, { backgroundColor: 'rgba(200,64,46,0)', duration: .3, ease: 'power2.out' }, at + .12)
          .fromTo(card, { y: 0 }, { y: 2, duration: .05, yoyo: true, repeat: 1, ease: 'power1.inOut' }, at + .1);
      });
    } },

    /* v2 · The meter plate: odometer reels [BANK 279 roll mode] set in steel; hover / focus / tap runs a meter again */
    2: { init: function (root, k) {
      var meters = Array.prototype.slice.call(root.querySelectorAll('.proof2__m'));
      var EASE = EZ.bezier(.33, 1, .68, 1);
      EZ.reveal(k, root.querySelectorAll('.proof2__head > *, .proof2__foot'));
      if (!k.motion) return;
      gsap.from(root.querySelector('.proof2__plate'), { y: 24, autoAlpha: 0, duration: .3, ease: 'power2.out', scrollTrigger: { trigger: root.querySelector('.proof2__plate'), start: 'top 85%', once: true } });
      meters.forEach(function (m) {
        var num = m.querySelector('.proof2__num'), val = num.dataset.n, orig = num.innerHTML;
        // final value stays in the HTML (no-JS / screen readers); the reels are drawn over it
        num.innerHTML = '<span class="sr-only">' + val + '</span>' + val.split('').map(function (ch) {
          if (!/\d/.test(ch)) return '<span class="proof2__cell proof2__cell--dot" aria-hidden="true"><span class="proof2__strip"><span>' + ch + '</span></span></span>';
          return '<span class="proof2__cell" aria-hidden="true" data-d="' + ch + '"><span class="proof2__strip"></span></span>';
        }).join('');
        k.add(function () { num.innerHTML = orig; });
        var reels = Array.prototype.slice.call(num.querySelectorAll('.proof2__cell[data-d]')).map(function (c, i, all) {
          return { el: c.querySelector('.proof2__strip'), d: +c.dataset.d, turns: Math.max(1, all.length - i) };
        });
        // a run: each reel spins forward through whole turns and lands on its digit; first run sweeps up from 0
        function run(fromZero, dur) {
          var tl = gsap.timeline();
          reels.forEach(function (r, i) {
            var s = '', start = fromZero ? 0 : r.d, n = r.turns * 10 + (fromZero ? r.d : 0);
            for (var t = 0; t <= n; t++) s += '<span>' + ((start + t) % 10) + '</span>';
            r.el.innerHTML = s;
            var h = r.el.firstChild.offsetHeight;
            tl.fromTo(r.el, { y: 0 }, { y: -n * h, duration: dur, ease: EASE }, Math.min(i * .07, dur * .4))
              .fromTo(r.el, { filter: 'blur(2px)' }, { filter: 'blur(0px)', duration: dur * .7, ease: 'power2.in' }, Math.min(i * .07, dur * .4));
          });
          return tl;
        }
        var cur = null;
        reels.forEach(function (r) { r.el.innerHTML = '<span>0</span>'; });
        ScrollTrigger.create({ trigger: m, start: 'top 85%', once: true, onEnter: function () { cur = run(true, 2); } });
        function again() { if (cur && cur.isActive()) return; cur = run(false, .9); }
        k.on(m, 'pointerenter', function (e) { if (e.pointerType === 'mouse') again(); });
        k.on(m, 'focus', again);
        k.on(m, 'click', again);
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
        gsap.from(targets, { scale: .8, autoAlpha: 0, duration: .25, ease: 'back.out(2)', stagger: .05, scrollTrigger: { trigger: plan, start: 'top 75%', once: true } });
        gsap.from(station, { y: 24, autoAlpha: 0, duration: .3, ease: 'power2.out', scrollTrigger: { trigger: plan, start: 'top 75%', once: true } });
      }
    } }
  });
})();
