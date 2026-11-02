/* FINALIZE · Renovation 2 · Services (the Home 3 sheet stack, reused): sticky drawing sheets [S1322 spec: the earlier sheet recedes to scale
   .92+i*.015 and takes a shade while the next one lands, scrubbed between the next sheet's top 78% and the sticky line;
   text never fades]. The dimension line draws across each photo as its sheet arrives [S0362]. The scope overlay opens
   from the title block (aria-expanded, Escape closes, focus stays on the toggle). Reduced motion: no recede, no draw. */
(function () {
  EZ.section('reno-services', { 1: { init: function (root, k) {
    var sheets = Array.prototype.slice.call(root.querySelectorAll('.sv__sheet'));
    var stacked = function () { return matchMedia('(min-width: 901px) and (min-height: 681px)').matches; };

    // scope overlays
    root.querySelectorAll('.sv__toggle').forEach(function (btn) {
      var panel = root.querySelector('#' + btn.getAttribute('aria-controls')), label = btn.querySelector('.btn__label');
      function set(open) {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
        label.textContent = open ? 'Close the scope' : 'Open the scope';
      }
      k.on(btn, 'click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
      k.on(panel.closest('.sv__paper'), 'keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { set(false); btn.focus(); } });
      k.add(function () { set(false); });
    });

    if (!k.motion) return;
    sheets.forEach(function (sh, i) {
      var paper = sh.querySelector('.sv__paper'), dim = sh.querySelector('.sv__dim path');
      // the dimension line is drawn from the middle out as the sheet arrives
      gsap.fromTo(dim, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: .6, ease: 'power3.inOut', scrollTrigger: { trigger: sh, start: 'top 75%', once: true } });
      var next = sheets[i + 1];
      if (!next) return;
      gsap.timeline({ scrollTrigger: { trigger: next, start: 'top 78%', end: function () { return 'top ' + (parseFloat(getComputedStyle(next).top) || 100) + 'px'; }, scrub: true, invalidateOnRefresh: true } })
        .to(paper, { scale: function () { return stacked() ? .92 + i * .015 : 1; }, y: function () { return stacked() ? -24 : 0; }, ease: 'none' }, 0)
        .to(paper, { '--shade': function () { return stacked() ? .14 : 0; }, ease: 'none' }, 0);
    });
  } } });
})();
