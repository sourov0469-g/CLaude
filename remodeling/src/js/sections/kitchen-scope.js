/* Kitchens page, section 2 · kitchen-scope. The three tiers are the firm's published kitchen scope tiers (no prices). */
(function () {
  var TIERS = [['Refit scope', 'Same layout, new kitchen.'], ['Full remodel', 'Layout and services move.'], ['Open-plan scope', 'The room itself changes.']];

  EZ.section('kitchen-scope', {
    /* v1 · Three columns: pointing at (or focusing) a tier plays that tier's change on its plan */
    1: { init: function (root, k) {
      var cols = Array.prototype.slice.call(root.querySelectorAll('.ks1__t'));
      function play(c) {
        cols.forEach(function (x) { x.classList.toggle('is-on', x === c); });
        if (!k.motion) return;
        var t = c.dataset.t;
        k.ctx.add(function () {
          // full remodel: the sink and its pipe run slide to a new place and back; open plan: the wall is taken out and put back
          if (t === '2') gsap.fromTo(c.querySelectorAll('.mv, .pipe'), { x: 0 }, { x: -40, duration: .6, ease: 'power2.inOut', yoyo: true, repeat: 1 });
          if (t === '3') gsap.fromTo(c.querySelector('.wall'), { drawSVG: '100%' }, { drawSVG: '0%', duration: .5, ease: 'power2.in', yoyo: true, repeat: 1, repeatDelay: .4 });
          // refit: nothing moves, the new kitchen goes into the same footprint
          if (t === '1') gsap.fromTo(c.querySelectorAll('.run, .isl'), { scale: .94, transformOrigin: '50% 50%' }, { scale: 1, duration: .5, ease: 'back.out(2)' });
        });
      }
      cols.forEach(function (c) { k.on(c, 'pointerenter', function (e) { if (e.pointerType === 'mouse') play(c); }); k.on(c, 'focus', function () { play(c); }); k.on(c, 'click', function () { play(c); }); });
      k.add(function () { cols.forEach(function (x) { x.classList.remove('is-on'); }); });
      EZ.reveal(k, root.querySelectorAll('.ks1__head > *, .ks1__t, .ks1__foot > *'));
    } },

    /* v2 · The scope dial: stop 2 moves the sink and draws its new pipe run; stop 3 takes the wall out to the living space */
    2: { init: function (root, k) {
      var input = root.querySelector('.ks2__range input'), sink = root.querySelector('.ks2__plan .sink'), pipe = root.querySelector('.ks2__plan .pipe'), wall = root.querySelector('.ks2__plan .wall');
      var beyond = root.querySelector('.ks2__plan .beyond'), tn = root.querySelector('.ks2__tn'), td = root.querySelector('.ks2__td');
      function set(n, anim) {
        var T = TIERS[n - 1], d = anim && k.motion ? .5 : 0;
        tn.textContent = T[0]; td.textContent = T[1];
        input.setAttribute('aria-valuetext', T[0] + ': ' + T[1].replace(/\.$/, '').toLowerCase());
        k.ctx.add(function () {
          gsap.to(sink, { attr: { cx: n >= 2 ? 245 : 270, cy: n >= 2 ? 202 : 68 }, duration: d, ease: 'power2.inOut' });
          gsap.to(pipe, { opacity: n >= 2 ? 1 : 0, duration: d });
          if (n >= 2 && d) gsap.fromTo(pipe, { drawSVG: '0%' }, { drawSVG: '100%', duration: .6, ease: 'power2.inOut' });
          gsap.to(wall, { opacity: n === 3 ? 0 : 1, duration: d });
          gsap.to(beyond, { fill: n === 3 ? '#FFFFFF' : '#FAF7F2', duration: d });
        });
      }
      k.on(input, 'input', function () { set(+input.value, true); });
      set(1, false);
      k.add(function () { input.value = 1; gsap.set([sink, pipe, wall, beyond], { clearProps: 'all' }); });
      EZ.reveal(k, root.querySelectorAll('.ks2__left > *, .ks2__right > *'));
    } },

    /* v3 · Tabs: arrow keys, Home and End move between tabs (automatic activation) */
    3: { init: function (root, k) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll('.ks3__tab'));
      function pick(i, focus) {
        tabs.forEach(function (t, j) {
          var on = i === j;
          t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
          root.querySelector('#' + t.getAttribute('aria-controls')).hidden = !on;
        });
        if (focus) tabs[i].focus();
        var p = root.querySelector('#' + tabs[i].getAttribute('aria-controls'));
        if (k.motion) k.ctx.add(function () { gsap.from(p.querySelectorAll('li, p'), { y: 14, autoAlpha: 0, duration: .25, stagger: .04, ease: 'power2.out' }); });
      }
      tabs.forEach(function (t, i) {
        k.on(t, 'click', function () { pick(i); });
        k.on(t, 'keydown', function (e) {
          var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
          if (n === null) return; e.preventDefault(); pick((n + tabs.length) % tabs.length, true);
        });
      });
      k.add(function () { pick(0); });
      EZ.reveal(k, root.querySelectorAll('.ks3__h, .ks3__tabs'));
    } },

    /* v4 · The ledger: the rule draws, then the three tier marks drop on it */
    4: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ks4__head > *, .ks4__tiers li, .ks4__page'));
      if (k.motion) gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.ks4__rule'), start: 'top 85%', once: true } })
        .from(root.querySelector('.ks4__line'), { drawSVG: '0%', duration: .6, ease: 'power2.inOut' })
        .from(root.querySelector('.ks4__mk'), { drawSVG: '50% 50%', duration: .3, ease: 'back.out(2)' });
    } },

    /* v5 · The cabinet: one drawer open at a time; the drawer front slides out as it opens */
    5: { init: function (root, k) {
      var fronts = Array.prototype.slice.call(root.querySelectorAll('.ks5__front'));
      function open(f) {
        fronts.forEach(function (x) {
          var on = x === f && x.getAttribute('aria-expanded') !== 'true';
          x.setAttribute('aria-expanded', on ? 'true' : 'false');
          var body = root.querySelector('#' + x.getAttribute('aria-controls'));
          body.hidden = !on;
          if (on && k.motion) k.ctx.add(function () { gsap.from(body, { height: 0, paddingTop: 0, paddingBottom: 0, duration: .3, ease: 'power2.out', clearProps: 'all' }); });
        });
      }
      fronts.forEach(function (f) { k.on(f, 'click', function () { open(f); }); });
      open(fronts[0]);
      k.add(function () { fronts.forEach(function (x) { x.setAttribute('aria-expanded', 'false'); root.querySelector('#' + x.getAttribute('aria-controls')).hidden = true; }); });
      EZ.reveal(k, root.querySelectorAll('.ks5__copy > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.ks5__d'), { x: 30, autoAlpha: 0, duration: .35, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.ks5__cab'), start: 'top 85%', once: true } });
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      var cols = Array.prototype.slice.call(root.querySelectorAll('.ks1r__t'));
      function play(c) {
        cols.forEach(function (x) { x.classList.toggle('is-on', x === c); });
        if (!k.motion) return;
        var t = c.dataset.t;
        k.ctx.add(function () {
          // full remodel: the sink and its pipe run slide to a new place and back; open plan: the wall is taken out and put back
          if (t === '2') gsap.fromTo(c.querySelectorAll('.mv, .pipe'), { x: 0 }, { x: -40, duration: .6, ease: 'power2.inOut', yoyo: true, repeat: 1 });
          if (t === '3') gsap.fromTo(c.querySelector('.wall'), { drawSVG: '100%' }, { drawSVG: '0%', duration: .5, ease: 'power2.in', yoyo: true, repeat: 1, repeatDelay: .4 });
          // refit: nothing moves, the new kitchen goes into the same footprint
          if (t === '1') gsap.fromTo(c.querySelectorAll('.run, .isl'), { scale: .94, transformOrigin: '50% 50%' }, { scale: 1, duration: .5, ease: 'back.out(2)' });
        });
      }
      cols.forEach(function (c) { k.on(c, 'pointerenter', function (e) { if (e.pointerType === 'mouse') play(c); }); k.on(c, 'focus', function () { play(c); }); k.on(c, 'click', function () { play(c); }); });
      k.add(function () { cols.forEach(function (x) { x.classList.remove('is-on'); }); });
      EZ.reveal(k, root.querySelectorAll('.ks1r__head > *, .ks1r__t, .ks1r__foot > *'));
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var input = root.querySelector('.ks2r__range input'), sink = root.querySelector('.ks2r__plan .sink'), pipe = root.querySelector('.ks2r__plan .pipe'), wall = root.querySelector('.ks2r__plan .wall');
      var beyond = root.querySelector('.ks2r__plan .beyond'), tn = root.querySelector('.ks2r__tn'), td = root.querySelector('.ks2r__td');
      function set(n, anim) {
        var T = TIERS[n - 1], d = anim && k.motion ? .5 : 0;
        tn.textContent = T[0]; td.textContent = T[1];
        input.setAttribute('aria-valuetext', T[0] + ': ' + T[1].replace(/\.$/, '').toLowerCase());
        k.ctx.add(function () {
          gsap.to(sink, { attr: { cx: n >= 2 ? 245 : 270, cy: n >= 2 ? 202 : 68 }, duration: d, ease: 'power2.inOut' });
          gsap.to(pipe, { opacity: n >= 2 ? 1 : 0, duration: d });
          if (n >= 2 && d) gsap.fromTo(pipe, { drawSVG: '0%' }, { drawSVG: '100%', duration: .6, ease: 'power2.inOut' });
          gsap.to(wall, { opacity: n === 3 ? 0 : 1, duration: d });
          gsap.to(beyond, { fill: n === 3 ? '#FFFFFF' : '#FAF7F2', duration: d });
        });
      }
      k.on(input, 'input', function () { set(+input.value, true); });
      set(1, false);
      k.add(function () { input.value = 1; gsap.set([sink, pipe, wall, beyond], { clearProps: 'all' }); });
      EZ.reveal(k, root.querySelectorAll('.ks2r__left > *, .ks2r__right > *'));
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll('.ks3r__tab'));
      function pick(i, focus) {
        tabs.forEach(function (t, j) {
          var on = i === j;
          t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
          root.querySelector('#' + t.getAttribute('aria-controls')).hidden = !on;
        });
        if (focus) tabs[i].focus();
        var p = root.querySelector('#' + tabs[i].getAttribute('aria-controls'));
        if (k.motion) k.ctx.add(function () { gsap.from(p.querySelectorAll('li, p'), { y: 14, autoAlpha: 0, duration: .25, stagger: .04, ease: 'power2.out' }); });
      }
      tabs.forEach(function (t, i) {
        k.on(t, 'click', function () { pick(i); });
        k.on(t, 'keydown', function (e) {
          var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
          if (n === null) return; e.preventDefault(); pick((n + tabs.length) % tabs.length, true);
        });
      });
      k.add(function () { pick(0); });
      EZ.reveal(k, root.querySelectorAll('.ks3r__h, .ks3r__tabs'));
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ks4r__head > *, .ks4r__tiers li, .ks4r__page'));
      if (k.motion) gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.ks4r__rule'), start: 'top 85%', once: true } })
        .from(root.querySelector('.ks4r__line'), { drawSVG: '0%', duration: .6, ease: 'power2.inOut' })
        .from(root.querySelector('.ks4r__mk'), { drawSVG: '50% 50%', duration: .3, ease: 'back.out(2)' });
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var fronts = Array.prototype.slice.call(root.querySelectorAll('.ks5r__front'));
      function open(f) {
        fronts.forEach(function (x) {
          var on = x === f && x.getAttribute('aria-expanded') !== 'true';
          x.setAttribute('aria-expanded', on ? 'true' : 'false');
          var body = root.querySelector('#' + x.getAttribute('aria-controls'));
          body.hidden = !on;
          if (on && k.motion) k.ctx.add(function () { gsap.from(body, { height: 0, paddingTop: 0, paddingBottom: 0, duration: .3, ease: 'power2.out', clearProps: 'all' }); });
        });
      }
      fronts.forEach(function (f) { k.on(f, 'click', function () { open(f); }); });
      open(fronts[0]);
      k.add(function () { fronts.forEach(function (x) { x.setAttribute('aria-expanded', 'false'); root.querySelector('#' + x.getAttribute('aria-controls')).hidden = true; }); });
      EZ.reveal(k, root.querySelectorAll('.ks5r__copy > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.ks5r__d'), { x: 30, autoAlpha: 0, duration: .35, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.ks5r__cab'), start: 'top 85%', once: true } });
    } }
  });
})();
