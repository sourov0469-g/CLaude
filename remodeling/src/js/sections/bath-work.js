/* FINALIZE · Bathrooms 4 · Projects. The seam: one value s on a native range, swept once by the scroll (as Home 4 and
   the kitchen page). The stack: the filtered photographs as a deck; Next sends the top print to the back (it lifts,
   slides left and drops behind, power4 in then out), Previous brings the bottom one to the top; the top print opens
   large. The filter only regroups the deck by words in the firm's own titles. */
(function () {
  var B = [
    ['b-black-marble', 'Black Marble Primary Bathroom with Freestanding Tub & Glass Wet Room', 1200, 1600],
    ['b-polished-concrete', 'Polished-Concrete Primary Bath with Curbless Walk-In Shower', 1600, 1067],
    ['b-spa-guest', 'Spa-Style Guest Bathroom Remodel with Curbless Shower & Backlit Mirrors', 1200, 1600],
    ['b-emerald', 'Emerald Tile Walk-In Shower Bathroom Remodel', 1067, 1600],
    ['b-fluted-vanity', 'Contemporary Primary Bath Remodel with Fluted Vanity & Freestanding Tub', 1200, 1600],
    ['b-champagne', 'Champagne Bronze & Marble-Look Tile Bathroom Renovation', 900, 1600],
    ['b-copper', 'Walk-In Shower Bathroom Remodel with Copper Mosaic Tile Accents', 1600, 1067],
    ['b-floating-soak', 'Floating Vanity Primary Bath with Soaking Tub & Walk-In Shower', 1200, 1600],
    ['b-sea-glass', 'Sea-Glass Glazed Tile Bathroom Remodel with Double Vanity', 1200, 1600],
    ['b-navy-niche', 'Navy Vanity Bathroom Remodel with Backlit Tile Niche', 1067, 1600],
    ['b-white-marble', 'White Marble Guest Bath & Grey Stone Primary Suite Renovation', 1600, 1200],
    ['b-multi-brass', 'Multi-Bathroom Renovation with Freestanding Tub & Brass-Accented Showers', 1600, 1067],
    ['w-bath-whole', 'Whole-Home Bathroom Renovation with Spa Showers & a Freestanding Soaking Tub', 1600, 1067]
  ];
  var F = { all: function () { return true; }, shower: function (t) { return /walk-in shower/i.test(t); }, tub: function (t) { return /freestanding tub|soaking tub/i.test(t); }, vanity: function (t) { return /vanity/i.test(t); } };
  var TILT = [0, -2.5, 2, -1.2, 1.6];
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  EZ.section('bath-work', { 1: { init: function (root, k) {
    // the seam
    var stage = root.querySelector('.bw__stage'), range = root.querySelector('.kp__range'), st = { s: .5 }, touched = false;
    function setS(v) { st.s = Math.max(0, Math.min(1, v)); stage.style.setProperty('--s', st.s.toFixed(4)); var pc = Math.round(st.s * 100); range.value = pc; range.setAttribute('aria-valuetext', pc <= 2 ? 'All after' : pc >= 98 ? 'All before' : pc + ' percent before, ' + (100 - pc) + ' percent after'); }
    k.on(range, 'input', function () { gsap.killTweensOf(st); touched = true; setS(range.value / 100); });
    setS(.5);
    EZ.level(stage, stage.querySelector('.kp__grip'), k);
    // the stack
    var host = root.querySelector('.bw__stack'), title = root.querySelector('.bw__t'), btns = Array.prototype.slice.call(root.querySelectorAll('.bw__fl'));
    var order = [], busy = false;
    function cards() { return Array.prototype.slice.call(host.querySelectorAll('.bw__card')); }
    function layout(anim) {   // the top card first; three more peek behind it at small angles
      cards().forEach(function (c) {
        var d = order.indexOf(+c.dataset.i);
        var vars = { rotation: d < 0 ? 0 : TILT[Math.min(d, 4)], y: Math.min(d, 3) * 6, scale: 1 - Math.min(d, 3) * .03, zIndex: 100 - d, autoAlpha: d < 0 || d > 3 ? 0 : 1, x: 0, xPercent: -50 };   // QA-1: centred in GSAP's own terms (the CSS translate was lost when GSAP took the transform, so cards sat right of centre)
        c.tabIndex = d === 0 ? 0 : -1; c.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
        if (anim && k.motion) gsap.to(c, Object.assign({ duration: .45, ease: 'power4.out', overwrite: 'auto' }, vars)); else gsap.set(c, vars);
      });
      var top = B[order[0]]; title.textContent = top ? top[1] : '';
    }
    function build(f) {
      order = B.map(function (b, i) { return F[f](b[1]) ? i : -1; }).filter(function (i) { return i > -1; });
      host.innerHTML = order.map(function (i) { var b = B[i]; return '<button type="button" class="bw__card" data-i="' + i + '" style="--a:' + b[2] + ' / ' + b[3] + '" aria-label="' + esc(b[1]) + ', open large"><img src="' + EZ.img(b[0]) + '" alt="" decoding="async"></button>'; }).join('');
      layout(false);
      if (k.motion) gsap.from(cards().slice(0, 4), { y: 30, autoAlpha: 0, duration: .45, ease: 'power4.out', stagger: .06 });
    }
    function next(dir) {
      if (busy || order.length < 2) return;
      var topEl = host.querySelector('.bw__card[data-i="' + order[0] + '"]');
      if (dir > 0) {
        if (!k.motion) { order.push(order.shift()); layout(false); return; }
        busy = true;
        gsap.timeline({ onComplete: function () { busy = false; } })
          .to(topEl, { x: -140, y: -24, rotation: -8, duration: .3, ease: 'power4.in' })
          .add(function () { order.push(order.shift()); topEl.style.zIndex = 0; })
          .to(topEl, { x: 0, duration: .01 }).add(function () { layout(true); });
      } else { order.unshift(order.pop()); layout(true); }
    }
    k.on(root.querySelector('.bw__next'), 'click', function () { next(1); });
    k.on(root.querySelector('.bw__prev'), 'click', function () { next(-1); });
    k.on(host, 'click', function (e) { var c = e.target.closest('.bw__card'); if (c && +c.dataset.i === order[0]) { var list = order.map(function (i) { return { key: B[i][0], title: B[i][1], alt: B[i][1] + ', an Elbaz project' }; }); EZ.viewer.open(list, 0, c.querySelector('img')); } });
    k.on(host, 'keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); next(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); next(-1); } });
    btns.forEach(function (b) { k.on(b, 'click', function () { btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); build(b.dataset.f); }); });
    build('all');
    k.add(function () { host.innerHTML = ''; title.textContent = ''; btns.forEach(function (x, i) { x.setAttribute('aria-pressed', i ? 'false' : 'true'); }); });
    EZ.reveal(k, root.querySelectorAll('.bw__head > *'));
    if (k.motion) {
      setS(.9);
      var tw = gsap.to(st, { s: .5, ease: 'none', onUpdate: function () { if (!touched) setS(st.s); }, scrollTrigger: { trigger: stage, start: 'top 85%', end: 'center 50%', scrub: .6 } });
      k.add(function () { if (tw.scrollTrigger) tw.scrollTrigger.kill(); tw.kill(); });
    }
  } } });
})();
