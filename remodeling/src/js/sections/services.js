/* services [PLAN-V2 2.2] */
(function () {
  EZ.section('services', {
    /* v1 · cards carrying the figure (PHS) — Q40 entrance */
    1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.services__head > *'));
      EZ.reveal(k, root.querySelectorAll('.services1__card'));
    } },

    /* v2 · K72 marquee rows */
    2: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.services__head > *'));
      if (!k.motion) return;
      var items = root.querySelectorAll('.services2__item');
      // closestEdge: compare squared distance to the row's top-centre and bottom-centre (John Stewart's helper, as credited in the K72 source)
      function edge(e, item) {
        var r = item.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, w = r.width / 2;
        var dt = (x - w) * (x - w) + y * y, db = (x - w) * (x - w) + (y - r.height) * (y - r.height);
        return dt < db ? 'top' : 'bottom';
      }
      function wipe(item, inOut, side) {
        var mq = item.querySelector('.services2__marquee'), wrap = item.querySelector('.services2__wrap');
        var off = side === 'top' ? -101 : 101;
        k.ctx.add(function () {
          var tl = gsap.timeline({ defaults: { duration: .6, ease: 'expo' } });
          if (inOut === 'in') tl.set(mq, { yPercent: off }, 0).set(wrap, { yPercent: -off }, 0).to([mq, wrap], { yPercent: 0 }, 0);
          else tl.to(mq, { yPercent: off }, 0).to(wrap, { yPercent: -off }, 0);
        });
      }
      items.forEach(function (item) {
        var link = item.querySelector('.services2__link');
        var mq = item.querySelector('.services2__marquee');
        gsap.set(mq, { y: 0, yPercent: 101 });
        gsap.set(item.querySelector('.services2__wrap'), { y: 0, yPercent: -101 });
        mq.classList.add('is-armed');
        k.add(function () { mq.classList.remove('is-armed'); });
        if (k.fine) {
          k.on(link, 'mouseenter', function (e) { wipe(item, 'in', edge(e, item)); });
          k.on(link, 'mouseleave', function (e) { wipe(item, 'out', edge(e, item)); });
        }
        k.on(link, 'focus', function () { wipe(item, 'in', 'bottom'); });
        k.on(link, 'blur', function () { wipe(item, 'out', 'bottom'); });
        if (!k.fine) {
          // touch has no hover: the row's band wipes in from the travel edge as it crosses the middle of the screen
          ScrollTrigger.create({
            trigger: item, start: 'top 60%', end: 'bottom 40%',
            onEnter: function () { wipe(item, 'in', 'bottom'); }, onLeave: function () { wipe(item, 'out', 'top'); },
            onEnterBack: function () { wipe(item, 'in', 'top'); }, onLeaveBack: function () { wipe(item, 'out', 'bottom'); }
          });
        }
      });
    } },

    /* v3 · Tillberg chapters */
    3: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.services3__intro > *'));
      if (!k.motion) return;
      root.querySelectorAll('.services3__ch').forEach(function (ch) {
        var img = ch.querySelector('.services3__img img'), box = ch.querySelector('.services3__img');
        var text = ch.querySelector('.services3__text');
        if (!k.mobile) {
          // .strip--image: the photo is taller than its frame and travels frame-height minus photo-height, scrub true
          gsap.fromTo(img, { y: 0 }, { y: function () { return box.clientHeight - img.clientHeight; }, ease: 'none',
            scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
          // .parallax text: y to 20% of its own height (data-parallax default 20), scrub true
          gsap.fromTo(text, { y: 0 }, { y: function () { return text.clientHeight * .2; }, ease: 'none',
            scrollTrigger: { trigger: ch, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
        }
        // headline words: from opacity 0, stagger .1, delay .1, 1.2s power2.inOut, "top bottom-=50px", play none none reset
        var t = ch.querySelector('.services3__t');
        var st = SplitText.create(t, { type: 'words' });
        gsap.from(st.words, { opacity: 0, stagger: .1, delay: .1, duration: 1.2, ease: 'power2.inOut',
          scrollTrigger: { trigger: t, start: 'top bottom-=50px', toggleActions: 'play none none reset' } });
        // description dim-to-bright: words from opacity .4, stagger .1, scrub 1 over twice the block height
        var line = ch.querySelector('.services3__line');
        var sl = SplitText.create(line, { type: 'words' });
        gsap.from(sl.words, { opacity: .4, stagger: .1, ease: 'none',
          scrollTrigger: { trigger: line, start: function () { return 'top center+=' + line.clientHeight; }, end: function () { return '+=' + 2 * line.clientHeight; }, scrub: 1, invalidateOnRefresh: true } });
        k.add(function () { st.revert(); sl.revert(); });
      });
    } }
  });
})();
