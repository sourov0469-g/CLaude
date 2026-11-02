/* FINALIZE · Renovation 5 · Whole-home stories + CTA. The firm's whole-home and outdoor projects, titles verbatim.
   V1: each chapter's photograph is revealed by the scroll from the middle outwards (clip-path inset, scrubbed, reversible)
   while its number and title settle; a photograph opens large. V2: the index answers pointer and focus with the large
   photograph and the firm's title. */
(function () {
  var S = [
    ['w-farmhouse', 'Modern Farmhouse Whole-Home Renovation'],
    ['r-openplan', 'Modern Open-Concept Kitchen and Living Area Renovation'],
    ['w-bath-whole', 'Whole-Home Bathroom Renovation with Spa Showers & a Freestanding Soaking Tub'],
    ['o-waterfront', 'Waterfront Backyard & Outdoor Living Transformation']
  ];
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  var ALL = S.map(function (s) { return { key: s[0], title: s[1], alt: s[1] + ', an Elbaz project' }; });
  EZ.section('reno-stories', {
    1: { init: function (root, k) {
      var list = root.querySelector('.sc__list');
      list.innerHTML = S.map(function (s, i) {
        return '<li class="sc__ch"><div class="sc__txt"><p class="sc__n nums">' + (i < 9 ? '0' : '') + (i + 1) + '</p><h3 class="sc__t">' + esc(s[1]) + '</h3></div>' +
          '<button type="button" class="sc__open" data-i="' + i + '" aria-label="' + esc(s[1]) + ', open large"><figure class="sc__fig"><img src="' + EZ.img(s[0]) + '" alt="" loading="lazy" decoding="async"></figure></button></li>';
      }).join('');
      k.on(list, 'click', function (e) { var b = e.target.closest('.sc__open'); if (b) EZ.viewer.open(ALL, +b.dataset.i, b.querySelector('img')); });
      k.add(function () { list.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.sc__head > *, .sc__cta'));
      if (!k.motion) return;
      var sts = [];
      list.querySelectorAll('.sc__ch').forEach(function (ch) {
        var fig = ch.querySelector('.sc__fig'), txt = ch.querySelectorAll('.sc__txt > *');
        var tl = gsap.timeline().fromTo(fig, { clipPath: 'inset(0 50% 0 50%)' }, { clipPath: 'inset(0 0% 0 0%)', duration: 1, ease: 'power2.inOut' }).from(txt, { y: 20, autoAlpha: 0, duration: .4, stagger: .1 }, .2);
        sts.push(ScrollTrigger.create({ trigger: ch, start: 'top 85%', end: 'top 35%', scrub: .5, animation: tl }));
      });
      k.add(function () { sts.forEach(function (s) { s.kill(); }); });
    } },
    2: { init: function (root, k) {
      var list = root.querySelector('.si__list'), img = root.querySelector('.si__img'), cap = root.querySelector('.si__cap');
      list.innerHTML = S.map(function (s, i) { return '<li><button type="button" class="si__it" data-i="' + i + '"><span class="nums">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span>' + esc(s[1]) + '</span></button></li>'; }).join('');
      var its = Array.prototype.slice.call(list.querySelectorAll('.si__it')), on = -1;
      function pick(i) {
        if (i === on) return; on = i;
        its.forEach(function (b, j) { b.classList.toggle('is-on', j === i); });
        img.src = EZ.img(S[i][0]); img.alt = S[i][1] + ', an Elbaz project'; cap.textContent = S[i][1];
        if (k.motion) gsap.fromTo(img, { autoAlpha: .3 }, { autoAlpha: 1, duration: .3, ease: 'power2.out', overwrite: true });
      }
      its.forEach(function (b, i) {
        k.on(b, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(i); });
        k.on(b, 'focus', function () { pick(i); });
        k.on(b, 'click', function () { pick(i); EZ.viewer.open(ALL, i, img); });
      });
      pick(0);
      k.add(function () { list.innerHTML = ''; on = -1; });
      EZ.reveal(k, root.querySelectorAll('.si__side > :not(.si__list)'));
    } }
  });
})();
