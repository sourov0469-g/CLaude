/* FINALIZE · Bathrooms 5 · Time, money, call. V1: the numeral lands as an event (one drop, power4.out) when the column
   arrives. V2: the week strip is drawn by the scroll (scrubbed, reversible): four solid weeks, four that might run, then
   two dashed weeks for permit review; the only figures are the firm's own (4-8 weeks). */
(function () {
  EZ.section('bath-close', {
    1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.eyebrow, .bc__h, .bc__c'));
      if (!k.motion) return;
      var n = root.querySelector('.bc__n .nums');
      gsap.set(n, { y: -28, autoAlpha: 0 });
      var st = ScrollTrigger.create({ trigger: n, start: 'top 85%', once: true, onEnter: function () { gsap.to(n, { y: 0, autoAlpha: 1, duration: .5, ease: 'power4.out', delay: .15 }); } });
      k.add(function () { st.kill(); gsap.set(n, { clearProps: 'all' }); });
    } },
    2: { init: function (root, k) {
      var row = root.querySelector('.bk__row');
      row.innerHTML = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { return '<span class="bk__w' + (i >= 8 ? ' bk__w--p' : i >= 4 ? ' bk__w--m' : '') + '"></span>'; }).join('');
      k.add(function () { row.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.bk__head > *, .bk__foot'));
      if (!k.motion) return;
      var w = row.querySelectorAll('.bk__w');
      gsap.set(w, { scaleX: 0 });
      var tl = gsap.timeline().to(w, { scaleX: 1, duration: .3, ease: 'none', stagger: .1 });
      var st = ScrollTrigger.create({ trigger: row, start: 'top 82%', end: 'top 40%', scrub: .5, animation: tl });
      k.add(function () { st.kill(); tl.kill(); });
    } }
  });
})();
