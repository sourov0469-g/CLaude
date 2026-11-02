/* FINALIZE · Kitchens 1 · Hero (V1, small improvement). The copy settles, then the dimension lines draw over the photo
   (strokes first, ticks after), as if the room is measured before anything is chosen. The chapter strip's rule draws
   under the room you are in. */
(function () {
  EZ.section('kitchen-intro', {
    1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ki1__copy > *'));
      if (!k.motion) return;
      gsap.timeline({ delay: .2 })
        .from(root.querySelectorAll('.kch__c'), { y: -8, autoAlpha: 0, duration: .3, ease: 'power2.out', stagger: .06 })
        .fromTo(root.querySelectorAll('.ki1__dl'), { drawSVG: '0%' }, { drawSVG: '100%', duration: .7, ease: 'power2.inOut', stagger: .12 }, .3)
        .from(root.querySelectorAll('.ki1__tick'), { opacity: 0, duration: .25 }, '-=.2');
    } }
  });
})();
