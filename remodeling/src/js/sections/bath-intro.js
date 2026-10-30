/* Bathrooms page, section 1 · bath-intro. Photos are the firm's own projects with the firm's own titles (FACTS.md). */
(function () {
  EZ.section('bath-intro', {
    /* v1 · Portrait split: the level arrives tilted and its bubble settles in the middle as it comes level */
    1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.bi1__copy > *'));
      if (k.motion) gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.bi1__fig'), start: 'top 75%', once: true } })
        .from(root.querySelector('.bi1__level'), { rotation: -6, x: -30, autoAlpha: 0, transformOrigin: '50% 50%', duration: .5, ease: 'power2.out' })
        .to(root.querySelector('.bi1__level'), { rotation: 0, duration: .7, ease: 'elastic.out(1, .5)' })
        .fromTo(root.querySelector('.bi1__bub'), { attr: { cx: 116 } }, { attr: { cx: 150 }, duration: .8, ease: 'elastic.out(1, .45)' }, '<');
    } },

    /* v2 · Three lines: each line names a bathroom; pointer or focus brings that photo up behind the words */
    2: { init: function (root, k) {
      var lines = Array.prototype.slice.call(root.querySelectorAll('.bi2__ln')), im = root.querySelector('.bi2__img'), cur = null;
      var T = { 'b-polished-concrete': 'Polished-Concrete Primary Bath with Curbless Walk-In Shower', 'b-spa-guest': 'Spa-Style Guest Bathroom Remodel with Curbless Shower & Backlit Mirrors', 'b-fluted-vanity': 'Contemporary Primary Bath Remodel with Fluted Vanity & Freestanding Tub' };
      function show(l) {
        if (l === cur) return; cur = l;
        lines.forEach(function (x) { x.classList.toggle('is-on', x === l); });
        im.src = EZ.img(l.dataset.k); im.alt = T[l.dataset.k] + ', an Elbaz project';
        if (k.motion) k.ctx.add(function () { gsap.fromTo(root.querySelector('.bi2__photo'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: .45, ease: 'power3.out', overwrite: true }); });
      }
      lines.forEach(function (l) { k.on(l, 'pointerenter', function () { show(l); }); k.on(l, 'focus', function () { show(l); }); });
      show(lines[0]);
      k.add(function () { im.removeAttribute('src'); lines.forEach(function (x) { x.classList.remove('is-on'); }); cur = null; });
      EZ.reveal(k, root.querySelectorAll('.bi2__row > *'));
      if (k.motion) gsap.from(lines, { y: 40, autoAlpha: 0, duration: .5, stagger: .1, ease: 'power3.out' });
    } },

    /* v3 · The squeegee: the paper sheet starts over the lower photo and is wiped down as the band scrolls (static when motion is off) */
    3: { init: function (root, k) {
      var st = root.querySelector('.bi3__stage');
      if (!k.motion) { st.style.setProperty('--wipe', '0%'); return; }
      st.style.setProperty('--wipe', '70%');
      var t = ScrollTrigger.create({ trigger: st, start: 'top top', end: 'bottom 30%', scrub: .3, onUpdate: function (s) { st.style.setProperty('--wipe', (70 * (1 - s.progress)).toFixed(1) + '%'); } });
      k.add(function () { t.kill(); st.style.removeProperty('--wipe'); });
      gsap.from(root.querySelector('.bi3__card'), { y: 24, autoAlpha: 0, duration: .45, ease: 'power3.out' });
    } },

    /* v4 · The mosaic: grout lines are drawn over the gaps of the grid once it is laid out */
    4: { init: function (root, k) {
      var wall = root.querySelector('.bi4__wall'), svg = root.querySelector('.bi4__grout');
      function draw() {
        var W = wall.clientWidth, H = wall.clientHeight, wr = wall.getBoundingClientRect(), d = '';
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        wall.querySelectorAll('.bi4__t, .bi4__copy').forEach(function (t) { var r = t.getBoundingClientRect(); d += 'M' + (r.left - wr.left - 4).toFixed(1) + ' ' + (r.top - wr.top - 4).toFixed(1) + ' h12 M' + (r.right - wr.left + 4).toFixed(1) + ' ' + (r.bottom - wr.top + 4).toFixed(1) + ' h-12 '; });
        svg.innerHTML = '<path d="' + d + '"/>';
      }
      draw(); k.ro(wall, draw);
      k.add(function () { svg.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.bi4__copy > *'));
      if (k.motion) gsap.from(wall.querySelectorAll('.bi4__t'), { scale: .9, autoAlpha: 0, duration: .4, stagger: .06, ease: 'back.out(1.6)' });
    } },

    /* v5 · The mirror: the arrows (or the arrow keys on them) turn to the previous or next bathroom inside the round frame */
    5: { init: function (root, k) {
      var B = [['b-spa-guest', 'Spa-Style Guest Bathroom Remodel with Curbless Shower & Backlit Mirrors'], ['b-floating-soak', 'Floating Vanity Primary Bath with Soaking Tub & Walk-In Shower'],
        ['b-multi-brass', 'Multi-Bathroom Renovation with Freestanding Tub & Brass-Accented Showers'], ['m-vanity', 'Bathroom vanity with arched mirror and pendant lighting'], ['b-polished-concrete', 'Polished-Concrete Primary Bath with Curbless Walk-In Shower']];
      var im = root.querySelector('.bi5__img'), cap = root.querySelector('.bi5__cap'), ticks = root.querySelector('.bi5__ticks'), i = 0;
      var d = ''; for (var a = 0; a < 360; a += 15) { var r = a * Math.PI / 180; d += 'M' + (100 + Math.cos(r) * 92).toFixed(1) + ' ' + (100 + Math.sin(r) * 92).toFixed(1) + 'L' + (100 + Math.cos(r) * 84).toFixed(1) + ' ' + (100 + Math.sin(r) * 84).toFixed(1); }
      ticks.setAttribute('d', d);
      function show(n, anim) {
        i = (n + B.length) % B.length;
        im.src = EZ.img(B[i][0]); im.alt = B[i][1] + ', an Elbaz project'; cap.textContent = B[i][1];
        if (anim && k.motion) k.ctx.add(function () { gsap.fromTo(im, { scale: 1.12, rotation: 6 }, { scale: 1, rotation: 0, duration: .5, ease: 'power3.out' }); gsap.fromTo(ticks, { rotation: 0, svgOrigin: '100 100' }, { rotation: 15, svgOrigin: '100 100', duration: .5 }); });
      }
      root.querySelectorAll('.bi5__b').forEach(function (b) { k.on(b, 'click', function () { show(i + +b.dataset.d, true); }); });
      show(0, false);
      k.add(function () { im.removeAttribute('src'); cap.textContent = ''; ticks.removeAttribute('d'); });
      EZ.reveal(k, root.querySelectorAll('.bi5__copy > *'));
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.bi1r__copy > *'));
      if (k.motion) gsap.timeline({ scrollTrigger: { trigger: root.querySelector('.bi1r__fig'), start: 'top 75%', once: true } })
        .from(root.querySelector('.bi1r__level'), { rotation: -6, x: -30, autoAlpha: 0, transformOrigin: '50% 50%', duration: .5, ease: 'power2.out' })
        .to(root.querySelector('.bi1r__level'), { rotation: 0, duration: .7, ease: 'elastic.out(1, .5)' })
        .fromTo(root.querySelector('.bi1r__bub'), { attr: { cx: 116 } }, { attr: { cx: 150 }, duration: .8, ease: 'elastic.out(1, .45)' }, '<');
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var lines = Array.prototype.slice.call(root.querySelectorAll('.bi2r__ln')), im = root.querySelector('.bi2r__img'), cur = null;
      var T = { 'b-polished-concrete': 'Polished-Concrete Primary Bath with Curbless Walk-In Shower', 'b-spa-guest': 'Spa-Style Guest Bathroom Remodel with Curbless Shower & Backlit Mirrors', 'b-fluted-vanity': 'Contemporary Primary Bath Remodel with Fluted Vanity & Freestanding Tub' };
      function show(l) {
        if (l === cur) return; cur = l;
        lines.forEach(function (x) { x.classList.toggle('is-on', x === l); });
        im.src = EZ.img(l.dataset.k); im.alt = T[l.dataset.k] + ', an Elbaz project';
        if (k.motion) k.ctx.add(function () { gsap.fromTo(root.querySelector('.bi2r__photo'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: .45, ease: 'power3.out', overwrite: true }); });
      }
      lines.forEach(function (l) { k.on(l, 'pointerenter', function () { show(l); }); k.on(l, 'focus', function () { show(l); }); });
      show(lines[0]);
      k.add(function () { im.removeAttribute('src'); lines.forEach(function (x) { x.classList.remove('is-on'); }); cur = null; });
      EZ.reveal(k, root.querySelectorAll('.bi2r__row > *'));
      if (k.motion) gsap.from(lines, { y: 40, autoAlpha: 0, duration: .5, stagger: .1, ease: 'power3.out' });
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var st = root.querySelector('.bi3r__stage');
      if (!k.motion) { st.style.setProperty('--wipe', '0%'); return; }
      st.style.setProperty('--wipe', '70%');
      var t = ScrollTrigger.create({ trigger: st, start: 'top top', end: 'bottom 30%', scrub: .3, onUpdate: function (s) { st.style.setProperty('--wipe', (70 * (1 - s.progress)).toFixed(1) + '%'); } });
      k.add(function () { t.kill(); st.style.removeProperty('--wipe'); });
      gsap.from(root.querySelector('.bi3r__card'), { y: 24, autoAlpha: 0, duration: .45, ease: 'power3.out' });
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var wall = root.querySelector('.bi4r__wall'), svg = root.querySelector('.bi4r__grout');
      function draw() {
        var W = wall.clientWidth, H = wall.clientHeight, wr = wall.getBoundingClientRect(), d = '';
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        wall.querySelectorAll('.bi4r__t, .bi4r__copy').forEach(function (t) { var r = t.getBoundingClientRect(); d += 'M' + (r.left - wr.left - 4).toFixed(1) + ' ' + (r.top - wr.top - 4).toFixed(1) + ' h12 M' + (r.right - wr.left + 4).toFixed(1) + ' ' + (r.bottom - wr.top + 4).toFixed(1) + ' h-12 '; });
        svg.innerHTML = '<path d="' + d + '"/>';
      }
      draw(); k.ro(wall, draw);
      k.add(function () { svg.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.bi4r__copy > *'));
      if (k.motion) gsap.from(wall.querySelectorAll('.bi4r__t'), { scale: .9, autoAlpha: 0, duration: .4, stagger: .06, ease: 'back.out(1.6)' });
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var B = [['b-spa-guest', 'Spa-Style Guest Bathroom Remodel with Curbless Shower & Backlit Mirrors'], ['b-floating-soak', 'Floating Vanity Primary Bath with Soaking Tub & Walk-In Shower'],
        ['b-multi-brass', 'Multi-Bathroom Renovation with Freestanding Tub & Brass-Accented Showers'], ['m-vanity', 'Bathroom vanity with arched mirror and pendant lighting'], ['b-polished-concrete', 'Polished-Concrete Primary Bath with Curbless Walk-In Shower']];
      var im = root.querySelector('.bi5r__img'), cap = root.querySelector('.bi5r__cap'), ticks = root.querySelector('.bi5r__ticks'), i = 0;
      var d = ''; for (var a = 0; a < 360; a += 15) { var r = a * Math.PI / 180; d += 'M' + (100 + Math.cos(r) * 92).toFixed(1) + ' ' + (100 + Math.sin(r) * 92).toFixed(1) + 'L' + (100 + Math.cos(r) * 84).toFixed(1) + ' ' + (100 + Math.sin(r) * 84).toFixed(1); }
      ticks.setAttribute('d', d);
      function show(n, anim) {
        i = (n + B.length) % B.length;
        im.src = EZ.img(B[i][0]); im.alt = B[i][1] + ', an Elbaz project'; cap.textContent = B[i][1];
        if (anim && k.motion) k.ctx.add(function () { gsap.fromTo(im, { scale: 1.12, rotation: 6 }, { scale: 1, rotation: 0, duration: .5, ease: 'power3.out' }); gsap.fromTo(ticks, { rotation: 0, svgOrigin: '100 100' }, { rotation: 15, svgOrigin: '100 100', duration: .5 }); });
      }
      root.querySelectorAll('.bi5r__b').forEach(function (b) { k.on(b, 'click', function () { show(i + +b.dataset.d, true); }); });
      show(0, false);
      k.add(function () { im.removeAttribute('src'); cap.textContent = ''; ticks.removeAttribute('d'); });
      EZ.reveal(k, root.querySelectorAll('.bi5r__copy > *'));
    } }
  });
})();
