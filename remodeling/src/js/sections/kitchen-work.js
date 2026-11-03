/* FINALIZE · Kitchens 4 · Projects (one version, the owner's recipe). The firm's two kitchen before/after pairs on the
   MERSI seam (as Home 4: one value s, a native range carries it, the seam travels once with the scroll on first view, a
   pair change is a cut-the-curve slide), then the firm's kitchen photographs as pinned prints in project chapters.
   k-walnut-marble and k-emerald-shaker stay out (their photos do not show what their titles say; owner item). */
(function () {
  var PAIRS = [
    { b: 'ba-kitchen1-before', a: 'ba-kitchen1-after', w: 388, h: 292, name: 'Kitchen, grey Shaker',
      bt: 'Dated kitchen with cream cabinets and tiled counters, before renovation', at: 'Renovated kitchen with grey shaker cabinetry and quartz counters' },
    { b: 'ba-kitchen4-before', a: 'ba-kitchen4-after', w: 596, h: 444, name: 'Kitchen, light cabinetry and island',
      bt: 'Kitchen with dated oak cabinetry and tiled counters, before renovation', at: 'Renovated kitchen with light cabinetry, range hood and island seating' }
  ];
  var CH = [
    ['Shaker', [['k-navy-shaker', 'Navy Blue Shaker Kitchen with Brass Hardware and a Custom Range Hood'], ['k-white-shaker', 'White Shaker Kitchen Remodel with Waterfall Quartz Island'], ['k-gray-shaker', 'Gray Shaker Kitchen Remodel with Wolf Range & Farmhouse Sink']]],
    ['Two-tone', [['k-turquoise', 'Two-Tone Kitchen Remodel with Turquoise Herringbone Backsplash'], ['k-navy-white', 'Two-Tone Navy & White Kitchen Remodel with Waterfall Quartz Island'], ['k-brass-hood', 'Two-Tone Kitchen Remodel with Custom Brass-Banded Range Hood'], ['k-stone-island', 'Two-Tone Kitchen Remodel with Waterfall Stone Island']]],
    ['Islands and open plan', [['k-chef', 'Chef-Grade Kitchen Remodel with Waterfall Quartz Island'], ['r-openplan', 'Modern Open-Concept Kitchen and Living Area Renovation'], ['m-kitchen-island', 'Contemporary kitchen with a long island and bar seating']]]
  ];
  var TILT = [-1.4, .9, -.6, 1.2, -1, .7, -.5, 1.1, -.8, .5];
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  EZ.section('kitchen-work', { 1: { init: function (root, k) {
    var tabsHost = root.querySelector('.kp__pairs'), board = root.querySelector('.kp__board'), print = root.querySelector('.kp__print'), stage = root.querySelector('.kp__stage');
    var ib = root.querySelector('.kp__ib'), ia = root.querySelector('.kp__ia'), range = root.querySelector('.kp__range'), cap = root.querySelector('.kp__cap'), host = root.querySelector('.kp__chapters');
    tabsHost.innerHTML = PAIRS.map(function (p, i) {
      return '<button type="button" role="tab" class="kp__pair" id="kp-t' + i + '" aria-selected="' + (i ? 'false' : 'true') + '" tabindex="' + (i ? -1 : 0) + '">' +
        '<span class="kp__th" aria-hidden="true"><img src="' + EZ.img(p.b) + '" alt=""><img src="' + EZ.img(p.a) + '" alt=""></span>' +
        '<span class="kp__pt"><span class="kp__pn">' + p.name + '</span><span class="kp__pd">A kitchen often runs <span class="nums">6&ndash;12</span> weeks of construction</span></span></button>';
    }).join('');
    var tabs = Array.prototype.slice.call(tabsHost.querySelectorAll('.kp__pair')), st = { s: .5 }, cur = 0, touched = false;
    function setS(v) {
      st.s = Math.max(0, Math.min(1, v)); stage.style.setProperty('--s', st.s.toFixed(4));
      var pc = Math.round(st.s * 100); range.value = pc;
      range.setAttribute('aria-valuetext', pc <= 2 ? 'All after' : pc >= 98 ? 'All before' : pc + ' percent before, ' + (100 - pc) + ' percent after');
    }
    function load(i) {
      var p = PAIRS[i]; ib.src = EZ.img(p.b); ia.src = EZ.img(p.a); ib.alt = p.bt; ia.alt = p.at;
      stage.style.setProperty('--ar', p.w + ' / ' + p.h);
      print.style.setProperty('--arn', (p.w / p.h).toFixed(4)); print.style.setProperty('--pw', Math.round(p.w * 1.35 + 26) + 'px');
      cap.textContent = 'Before: ' + p.bt.replace(/, before renovation$/, '') + '. After: ' + p.at + '.';
      board.setAttribute('aria-labelledby', 'kp-t' + i);
    }
    function select(i, focus) {
      if (i === cur) return; cur = i;
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
      if (focus) tabs[i].focus();
      if (!k.motion) { load(i); setS(.5); return; }
      gsap.timeline().to(print, { x: -72, opacity: 0, duration: .26, ease: 'power4.in' }).add(function () { load(i); })
        .fromTo(print, { x: 72, opacity: .35 }, { x: 0, opacity: 1, duration: .34, ease: 'power4.out', clearProps: 'transform,opacity' })
        .add(function () { gsap.fromTo(st, { s: .12 }, { s: .5, duration: .9, ease: 'power3.inOut', onUpdate: function () { setS(st.s); } }); }, '-=.1');
    }
    tabs.forEach(function (t, i) {
      k.on(t, 'click', function () { select(i); });
      k.on(t, 'keydown', function (e) { var d = /Right|Down/.test(e.key) ? 1 : /Left|Up/.test(e.key) ? -1 : 0; if (d) { e.preventDefault(); select((cur + d + PAIRS.length) % PAIRS.length, true); } });
    });
    k.on(range, 'input', function () { gsap.killTweensOf(st); touched = true; setS(range.value / 100); });
    load(0); setS(.5);
    EZ.level(stage, stage.querySelector('.kp__grip'), k);

    // the chapters of pinned prints
    var all = [];
    host.innerHTML = CH.map(function (c, ci) {
      var items = c[1].map(function (x) { var i = all.length; all.push({ key: x[0], title: x[1], alt: x[1] + ', an Elbaz project' });
        return '<li><button type="button" class="kp__pr" data-i="' + i + '" style="--r:' + TILT[i % TILT.length] + 'deg" aria-label="' + esc(x[1]) + ', open large"><img src="' + EZ.img(x[0]) + '" alt="" loading="lazy" decoding="async"><span class="kp__prt" aria-hidden="true">' + esc(x[1]) + '</span></button></li>'; }).join('');
      return '<section class="kp__ch" aria-labelledby="kp-ch' + ci + '"><h3 class="kp__chh" id="kp-ch' + ci + '"><span class="kp__chn">Chapter <span class="nums">' + (ci + 1) + '</span></span><span class="kp__cht">' + c[0] + '</span></h3><ul class="kp__prints" role="list">' + items + '</ul></section>';
    }).join('');
    k.on(host, 'click', function (e) { var b = e.target.closest('.kp__pr'); if (b) EZ.viewer.open(all, +b.dataset.i, b.querySelector('img')); });
    k.add(function () { tabsHost.innerHTML = ''; host.innerHTML = ''; });

    EZ.reveal(k, root.querySelectorAll('.kp__head > *'));
    if (k.motion) {
      setS(.9);
      var tw = gsap.to(st, { s: .5, ease: 'none', onUpdate: function () { if (!touched) setS(st.s); }, scrollTrigger: { trigger: stage, start: 'top 85%', end: 'center 50%', scrub: .6 } });
      var prs = host.querySelectorAll('.kp__pr');
      gsap.set(prs, { y: -16, autoAlpha: 0 });
      var pin = ScrollTrigger.batch(prs, { start: 'top 88%', once: true, onEnter: function (b) { gsap.to(b, { y: 0, autoAlpha: 1, duration: .45, ease: 'power4.out', stagger: .06 }); } });
      k.add(function () { if (tw.scrollTrigger) tw.scrollTrigger.kill(); tw.kill(); pin.forEach(function (t) { t.kill(); }); });
    }
  } } });
})();
