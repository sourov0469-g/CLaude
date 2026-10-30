/* proof: v1 credential blocks on a job-site deck (S0452 matterjs), v2 meter plate (Count Up 279 roll mode), v3 survey station (True Focus 300 + Heron grid).
   Entrances dosed at .3s (FULL §4); the stamp thud and the focus jump keep their reference tempo as the centrepiece actions. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';

  EZ.section('proof', {
    /* v1 · Proof you can pick up [S0452 matterjs]: five credential blocks drop onto a deck, settle with weight
       (restitution .08, friction .8), can be grabbed and thrown (desktop) or bumped (tap, Enter / Space) */
    1: { init: function (root, k) {
      var M = window.Matter, site = root.querySelector('.proof1__site');
      var els = Array.prototype.slice.call(root.querySelectorAll('.proof1__blk'));
      EZ.reveal(k, root.querySelectorAll('.proof1__head > *, .proof1__foot'));
      if (!M) { root.classList.add('is-static'); return; }
      var engine, bodies = [], W = 0, H = 0, sc = 1, loop = null, drag = null, inView = false, dropped = false;
      var DECK = 72;
      function build(settle) {
        W = site.clientWidth; H = site.clientHeight;
        if (!W) return;
        sc = EZ.clamp(W / 1100, .58, 1);
        if (engine) { M.Composite.clear(engine.world, false); M.Engine.clear(engine); }
        engine = M.Engine.create({ enableSleeping: true });
        engine.gravity.y = 1;
        var floorY = H - DECK;
        var walls = [
          M.Bodies.rectangle(W / 2, floorY + 40, W * 3, 80, { isStatic: true, friction: .9 }),
          M.Bodies.rectangle(-40, H / 2, 80, H * 4, { isStatic: true }),
          M.Bodies.rectangle(W + 40, H / 2, 80, H * 4, { isStatic: true }),
          M.Bodies.rectangle(W / 2, -40, W * 3, 80, { isStatic: true })
        ];
        bodies = els.map(function (el, i) {
          var w = +el.dataset.w * sc, h = +el.dataset.h * sc;
          el.style.width = w + 'px'; el.style.height = h + 'px';
          var sp = startPos(i, { h: h });
          var body = M.Bodies.rectangle(sp.x, sp.y, w, h, { chamfer: { radius: 4 * sc }, restitution: .08, friction: .8, frictionStatic: 1, frictionAir: .015, density: .0015 });
          // the facts always read level: blocks fall, slide, stack and fly, but never turn (no rotated text)
          M.Body.setInertia(body, Infinity);
          body.el = el; body.w = w; body.h = h;
          return body;
        });
        // blocks join the world only when released (a body created static never regains its mass in Matter)
        M.Composite.add(engine.world, settle ? walls.concat(bodies) : walls);
        if (settle) {
          // reduced motion and re-layout: let the pile settle off-screen, then show it still
          for (var n = 0; n < 900; n++) M.Engine.update(engine, 1000 / 60);
          sync();
        } else sync();
      }
      function sync() {
        bodies.forEach(function (b) {
          // a fast throw can tunnel a few pixels into a side wall: hold every block inside the site
          var x = EZ.clamp(b.position.x, b.w / 2, Math.max(b.w / 2, W - b.w / 2));
          if (x !== b.position.x) { M.Body.setPosition(b, { x: x, y: b.position.y }); M.Body.setVelocity(b, { x: 0, y: b.velocity.y }); }
          b.el.style.transform = 'translate(' + (b.position.x - b.w / 2).toFixed(1) + 'px,' + (b.position.y - b.h / 2).toFixed(1) + 'px) rotate(' + b.angle.toFixed(4) + 'rad)';
        });
      }
      function run() {
        if (!k.motion || !inView) return;
        if (loop) { loop.start(); return; }
        loop = k.raf(function (dt) {
          // fixed sub-steps of at most 1/60 s (Matter's stability limit); a slow frame takes two or three
          for (var ms = Math.min(dt * 1000, 50); ms > .5; ms -= 1000 / 60) M.Engine.update(engine, Math.min(ms, 1000 / 60));
          sync();
          var still = !drag && bodies.every(function (b) { return b.isSleeping || engine.world.bodies.indexOf(b) < 0; });
          if (still && dropped) return false;
        });
        loop.start();
      }
      // start positions never overlap: two staggered rows on wide screens, a loose tower on phones
      function startPos(i, b) {
        if (W < 600) return { x: W * (.3 + .4 * (i % 2)), y: 30 + b.h / 2 + i * (H - DECK - 60) / 6 };
        return { x: W * (.1 + .2 * i), y: 24 + b.h / 2 + (i % 2) * (H - DECK) * .38 };
      }
      function drop() {
        dropped = true;
        bodies.forEach(function (b, i) { k.timeout(function () { if (engine.world.bodies.indexOf(b) < 0) M.Composite.add(engine.world, b); M.Sleeping.set(b, false); run(); }, i * 140); });
        gsap.to(els, { autoAlpha: 1, duration: .2, stagger: .14, overwrite: true });
        run();
      }
      function bump(b, dir) {
        if (engine.world.bodies.indexOf(b) < 0) M.Composite.add(engine.world, b);
        M.Sleeping.set(b, false);
        M.Body.setVelocity(b, { x: (dir || (Math.random() - .5)) * 6 * sc, y: -12 * sc });
        run();
      }
      k.add(function () { if (engine) { M.Composite.clear(engine.world, false); M.Engine.clear(engine); } els.forEach(function (el) { el.style.cssText = ''; }); gsap.set(els, { clearProps: 'opacity,visibility' }); root.classList.remove('is-static'); });

      if (!k.motion) { root.classList.add('is-static'); build(true); k.ro(site, function () { if (site.clientWidth !== W) build(true); }); return; }

      build(false);
      gsap.set(els, { autoAlpha: 0 });
      k.ro(site, function () { if (site.clientWidth !== W && W) { build(true); dropped = true; gsap.set(els, { autoAlpha: 1 }); } });
      k.io(site, function (en) { inView = en.isIntersecting; if (inView) run(); else if (loop) loop.stop(); }, { threshold: 0 });
      ScrollTrigger.create({ trigger: site, start: 'top 75%', once: true, onEnter: drop });

      // grab and throw (mouse / pen): a spring constraint from the pointer to the point grabbed [S0452 MouseConstraint]
      function local(e) { var r = site.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
      els.forEach(function (el, i) {
        var b = function () { return bodies[i]; };
        k.on(el, 'pointerdown', function (e) {
          if (!dropped) return;
          if (e.pointerType === 'touch') { el._t = [e.clientX, e.clientY]; return; }
          e.preventDefault();
          var p = local(e), body = b();
          if (engine.world.bodies.indexOf(body) < 0) M.Composite.add(engine.world, body);
          M.Sleeping.set(body, false);
          var off = M.Vector.rotate(M.Vector.sub(p, body.position), -body.angle);
          drag = M.Constraint.create({ pointA: p, bodyB: body, pointB: off, stiffness: .18, damping: .12, length: 0 });
          M.Composite.add(engine.world, drag);
          try { el.setPointerCapture(e.pointerId); } catch (er) {}
          run();
        });
        k.on(el, 'pointermove', function (e) { if (drag && drag.bodyB === b()) { drag.pointA = local(e); } });
        function release() { if (drag && drag.bodyB === b()) { M.Composite.remove(engine.world, drag); drag = null; run(); } }
        k.on(el, 'pointerup', function (e) {
          if (e.pointerType === 'touch' && el._t && Math.hypot(e.clientX - el._t[0], e.clientY - el._t[1]) < 10) bump(b());
          el._t = null; release();
        });
        k.on(el, 'pointercancel', release);
        k.on(el, 'keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && dropped) { e.preventDefault(); bump(b()); } });
      });
      k.on(root.querySelector('.proof1__restack'), 'click', function () {
        dropped = false;
        bodies.forEach(function (bd, i) {
          M.Composite.remove(engine.world, bd);
          M.Body.setPosition(bd, startPos(i, bd));
          M.Body.setVelocity(bd, { x: 0, y: 0 });
        });
        sync();
        drop();
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
        '26 projects photographed on this page, every image the firm’s own work.'
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
      var timer = null, manual = false, inView = false, steps = 0;
      // self-running for three moves (4.5s) per visit, then it holds: nothing moves past 5s unasked
      function next() { aim((cur + 1) % targets.length); if (++steps >= 3) stop(); }
      function run() { stop(); steps = 0; if (k.motion && inView && !manual) { root.classList.add('is-cycling'); timer = setInterval(next, 1500); } }
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
