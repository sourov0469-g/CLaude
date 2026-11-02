/* FINALIZE · Renovation 4 · Permits and approvals. The ticks are drawn in order as the sheets scroll in (scrubbed,
   reversible: the checklist reads in the order the work happens), then the Notice of Acceptance stamp lands once
   (stillness, then power4.in). Reduced motion: everything ticked, stamp in place. */
(function () {
  EZ.section('reno-permits', { 1: { init: function (root, k) {
    EZ.reveal(k, root.querySelectorAll('.rp__head > *'));
    if (!k.motion) return;
    var ticks = root.querySelectorAll('.rp__list .tk'), stamp = root.querySelector('.rp__stamp');
    gsap.set(ticks, { drawSVG: '0%' }); gsap.set(stamp, { scale: 1.6, autoAlpha: 0 });
    var tl = gsap.timeline().to(ticks, { drawSVG: '100%', duration: .3, ease: 'none', stagger: .25 });
    var st = ScrollTrigger.create({ trigger: root.querySelector('.rp__sheets'), start: 'top 75%', end: 'bottom 70%', scrub: .5, animation: tl });
    var ss = ScrollTrigger.create({ trigger: stamp, start: 'top 60%', once: true, onEnter: function () { gsap.to(stamp, { scale: 1, autoAlpha: 1, duration: .18, ease: 'power4.in', delay: .3 }); } });
    k.add(function () { st.kill(); tl.kill(); ss.kill(); gsap.set([ticks, stamp], { clearProps: 'all' }); });
  } } });
})();
