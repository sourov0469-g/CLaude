/* Renovation page, section 1 · reno-intro (whole-home renovation). Copy and photos are the firm's own (FACTS.md). */
(function () {
  EZ.section('reno-intro', {
    /* v1 · The farmhouse: the roofline draws over the photo */
    1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ri1__copy > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.ri1__roof path'), { drawSVG: '50% 50%', duration: .8, ease: 'power2.inOut', stagger: .2, scrollTrigger: { trigger: root.querySelector('.ri1__fig'), start: 'top 80%', once: true } });
    } },

    /* v2 · One disruption, not five: the radio pair switches the illustration (arrow keys move between the two) */
    2: { init: function (root, k) {
      var O = Array.prototype.slice.call(root.querySelectorAll('.ri2__o'));
      function set(o, focus, anim) {
        O.forEach(function (b) { var on = b.dataset.o === o; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        root.classList.toggle('is-five', o === 'five');
        if (anim && k.motion) k.ctx.add(function () {
          if (o === 'five') gsap.from(root.querySelectorAll('.ri2__five rect'), { scaleX: 0, transformOrigin: '0% 50%', duration: .3, stagger: .12, ease: 'power2.out' });
          else gsap.from(root.querySelector('.ri2__one rect'), { scaleX: 0, transformOrigin: '0% 50%', duration: .6, ease: 'power3.out' });
        });
      }
      O.forEach(function (b, i) {
        k.on(b, 'click', function () { set(b.dataset.o, false, true); });
        k.on(b, 'keydown', function (e) { if (/Arrow(Right|Left|Up|Down)/.test(e.key)) { e.preventDefault(); set(O[(i + 1) % 2].dataset.o, true, true); } });
      });
      set('one', false, false);
      k.add(function () { root.classList.remove('is-five'); });
      EZ.reveal(k, root.querySelectorAll('.ri2__copy > *'));
    } },

    /* v3 · The collage: the two photos drift at different rates against the type while the band scrolls */
    3: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ri3__foot > *'));
      if (!k.motion) return;
      gsap.from(root.querySelectorAll('.ri3__h span'), { y: 40, autoAlpha: 0, duration: .5, stagger: .1, ease: 'power3.out' });
      gsap.to(root.querySelector('.ri3__a'), { yPercent: -10, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: .4 } });
      gsap.to(root.querySelector('.ri3__b'), { yPercent: -28, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: .4 } });
      gsap.from(root.querySelector('.ri3__frame path'), { drawSVG: '0%', duration: 1, ease: 'power2.inOut', scrollTrigger: { trigger: root.querySelector('.ri3__frame'), start: 'top 85%', once: true } });
    } },

    /* v4 · Three panels: the chosen panel widens (pointer or focus or press) */
    4: { init: function (root, k) {
      var P = Array.prototype.slice.call(root.querySelectorAll('.ri4__p'));
      function pick(p) { P.forEach(function (x) { var on = x === p; x.classList.toggle('is-on', on); x.setAttribute('aria-expanded', on ? 'true' : 'false'); }); }
      P.forEach(function (p) { k.on(p, 'click', function () { pick(p); }); k.on(p, 'focus', function () { pick(p); }); k.on(p, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(p); }); });
      k.add(function () { pick(P[0]); });
      EZ.reveal(k, root.querySelectorAll('.ri4__head > *'));
    } },

    /* v5 · The house section: the plan line draws, then the rooms fill one after another from it; the button replays it */
    5: { init: function (root, k) {
      var rooms = root.querySelectorAll('.ri5__rm'), line = root.querySelector('.ri5__plan');
      function play() {
        if (!k.motion) return;
        k.ctx.add(function () { gsap.timeline().fromTo(line, { drawSVG: '0%' }, { drawSVG: '100%', duration: .6, ease: 'power2.inOut' }).fromTo(rooms, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .35, stagger: .15, ease: 'back.out(1.6)' }); });
      }
      var btn = root.querySelector('.ri5__play');
      if (!k.motion) btn.hidden = true; else k.on(btn, 'click', play);
      k.add(function () { btn.hidden = false; });
      EZ.reveal(k, root.querySelectorAll('.ri5__copy > *'));
      if (k.motion) ScrollTrigger.create({ trigger: root.querySelector('.ri5__house'), start: 'top 80%', once: true, onEnter: play });
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ri1r__copy > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.ri1r__roof path'), { drawSVG: '50% 50%', duration: .8, ease: 'power2.inOut', stagger: .2, scrollTrigger: { trigger: root.querySelector('.ri1r__fig'), start: 'top 80%', once: true } });
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      var O = Array.prototype.slice.call(root.querySelectorAll('.ri2r__o'));
      function set(o, focus, anim) {
        O.forEach(function (b) { var on = b.dataset.o === o; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
        root.classList.toggle('is-five', o === 'five');
        if (anim && k.motion) k.ctx.add(function () {
          if (o === 'five') gsap.from(root.querySelectorAll('.ri2r__five rect'), { scaleX: 0, transformOrigin: '0% 50%', duration: .3, stagger: .12, ease: 'power2.out' });
          else gsap.from(root.querySelector('.ri2r__one rect'), { scaleX: 0, transformOrigin: '0% 50%', duration: .6, ease: 'power3.out' });
        });
      }
      O.forEach(function (b, i) {
        k.on(b, 'click', function () { set(b.dataset.o, false, true); });
        k.on(b, 'keydown', function (e) { if (/Arrow(Right|Left|Up|Down)/.test(e.key)) { e.preventDefault(); set(O[(i + 1) % 2].dataset.o, true, true); } });
      });
      set('one', false, false);
      k.add(function () { root.classList.remove('is-five'); });
      EZ.reveal(k, root.querySelectorAll('.ri2r__copy > *'));
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ri3r__foot > *'));
      if (!k.motion) return;
      gsap.from(root.querySelectorAll('.ri3r__h span'), { y: 40, autoAlpha: 0, duration: .5, stagger: .1, ease: 'power3.out' });
      gsap.to(root.querySelector('.ri3r__a'), { yPercent: -10, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: .4 } });
      gsap.to(root.querySelector('.ri3r__b'), { yPercent: -28, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: .4 } });
      gsap.from(root.querySelector('.ri3r__frame path'), { drawSVG: '0%', duration: 1, ease: 'power2.inOut', scrollTrigger: { trigger: root.querySelector('.ri3r__frame'), start: 'top 85%', once: true } });
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var P = Array.prototype.slice.call(root.querySelectorAll('.ri4r__p'));
      function pick(p) { P.forEach(function (x) { var on = x === p; x.classList.toggle('is-on', on); x.setAttribute('aria-expanded', on ? 'true' : 'false'); }); }
      P.forEach(function (p) { k.on(p, 'click', function () { pick(p); }); k.on(p, 'focus', function () { pick(p); }); k.on(p, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(p); }); });
      k.add(function () { pick(P[0]); });
      EZ.reveal(k, root.querySelectorAll('.ri4r__head > *'));
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      var rooms = root.querySelectorAll('.ri5r__rm'), line = root.querySelector('.ri5r__plan');
      function play() {
        if (!k.motion) return;
        k.ctx.add(function () { gsap.timeline().fromTo(line, { drawSVG: '0%' }, { drawSVG: '100%', duration: .6, ease: 'power2.inOut' }).fromTo(rooms, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .35, stagger: .15, ease: 'back.out(1.6)' }); });
      }
      var btn = root.querySelector('.ri5r__play');
      if (!k.motion) btn.hidden = true; else k.on(btn, 'click', play);
      k.add(function () { btn.hidden = false; });
      EZ.reveal(k, root.querySelectorAll('.ri5r__copy > *'));
      if (k.motion) ScrollTrigger.create({ trigger: root.querySelector('.ri5r__house'), start: 'top 80%', once: true, onEnter: play });
    } }
  });
})();
