/* FINALIZE · Kitchens 5 · What we will not tell you + CTA. V1: the three refusals are written in by the scroll, one by
   one, the clay "We will not" first (scrubbed, reversible); V2: the three cards settle in order. No idle motion. */
(function () {
  EZ.section('kitchen-close', {
    1: { init: function (root, k) {
      var lines = root.querySelectorAll('.kc__l');
      EZ.reveal(k, root.querySelectorAll('.kc__arg > .eyebrow, .kcta'));
      if (!k.motion) return;
      gsap.set(lines, { opacity: .12 });
      var tl = gsap.timeline();
      lines.forEach(function (l, i) { tl.to(l, { opacity: 1, duration: 1, ease: 'none' }, i); });
      var st = ScrollTrigger.create({ trigger: root.querySelector('.kc__lines'), start: 'top 75%', end: 'bottom 55%', scrub: .5, animation: tl });
      k.add(function () { st.kill(); tl.kill(); gsap.set(lines, { clearProps: 'all' }); });
    } },
    2: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.kg__head > *, .kcta'));
      if (!k.motion) return;
      var cards = root.querySelectorAll('.kg__c');
      gsap.set(cards, { y: 18, autoAlpha: 0 });
      var st = ScrollTrigger.create({ trigger: root.querySelector('.kg__cards'), start: 'top 80%', once: true, onEnter: function () { gsap.to(cards, { y: 0, autoAlpha: 1, duration: .45, ease: 'power4.out', stagger: .1 }); } });
      k.add(function () { st.kill(); gsap.set(cards, { clearProps: 'all' }); });
    } }
  });
})();
