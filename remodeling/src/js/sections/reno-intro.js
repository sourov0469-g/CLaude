/* FINALIZE · Renovation 1 · Hero. V1: the giant lines rise once, the two photographs slide at different speeds with the
   scroll (parallax, scrubbed), the roofline frame draws once. V2: the chosen panel widens (pointer, focus, press, and the
   arrow keys move between panels); the caption names the firm's project under it. */
(function () {
  var TITLES = ['Modern Open-Concept Kitchen and Living Area Renovation', 'Modern Farmhouse Whole-Home Renovation', 'Whole-Home Bathroom Renovation with Spa Showers & a Freestanding Soaking Tub'];
  EZ.section('reno-intro', {
    1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ri3__foot > *, .ri3__kick'));
      if (!k.motion) return;
      gsap.from(root.querySelectorAll('.ri3__h span'), { y: 40, autoAlpha: 0, duration: .5, stagger: .1, ease: 'power3.out' });
      var a = gsap.to(root.querySelector('.ri3__a'), { yPercent: -10, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: .4 } });
      var b = gsap.to(root.querySelector('.ri3__b'), { yPercent: -28, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: .4 } });
      gsap.fromTo(root.querySelector('.ri3__frame path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, ease: 'power2.inOut', delay: .4 });
      k.add(function () { [a, b].forEach(function (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); }); });
    } },
    2: { init: function (root, k) {
      var P = Array.prototype.slice.call(root.querySelectorAll('.ri4__p')), note = root.querySelector('.ri4__note');
      function pick(i, focus) {
        P.forEach(function (x, j) { var on = j === i; x.classList.toggle('is-on', on); x.setAttribute('aria-expanded', on ? 'true' : 'false'); });
        note.textContent = TITLES[i]; if (focus) P[i].focus();
      }
      P.forEach(function (p, i) {
        k.on(p, 'click', function () { pick(i); });
        k.on(p, 'focus', function () { pick(i); });
        k.on(p, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(i); });
        k.on(p, 'keydown', function (e) { var d = /Right|Down/.test(e.key) ? 1 : /Left|Up/.test(e.key) ? -1 : 0; if (d) { e.preventDefault(); pick((i + d + P.length) % P.length, true); } });
      });
      k.add(function () { pick(0); });
      EZ.reveal(k, root.querySelectorAll('.ri4__head > *'));
    } }
  });
})();
