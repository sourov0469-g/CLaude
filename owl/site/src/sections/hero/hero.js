/* ===== hero: V1 house window, V2 sequence. Each runs only while its version is the active one. ===== */
(function () {
  // ---- V1
  var h1 = document.querySelector('.hero-v1');
  if (h1) {
    var bg = h1.querySelector('[data-bg]'); Owl.bg.lawn(bg, { sweep: false });
    var v = h1.querySelector('video'), b = h1.querySelector('.hv1-vctl'), userPaused = Owl.reduced(), visible = false;
    function label() { b.setAttribute('aria-label', v.paused ? 'Play the video' : 'Pause the video'); b.querySelector('use').setAttribute('href', v.paused ? '#icon-action-play' : '#icon-action-pause'); }
    function sync() { var on = visible && !userPaused && !h1.closest('[hidden]'); if (on) v.play().catch(function () {}); else v.pause(); }
    v.addEventListener('play', label); v.addEventListener('pause', label);
    b.addEventListener('click', function () { userPaused = !v.paused; if (!userPaused) visible = true; sync(); if (!userPaused) v.play().catch(function () {}); });
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; sync(); }, { threshold: 0.25 }).observe(v);
    document.addEventListener('owl:version', sync); document.addEventListener('owl:page', sync);
    label();
    // the roof draws itself once on first view (courses eave to ridge), then rests
    new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { requestAnimationFrame(function () { h1.classList.add('is-drawn'); }); io.disconnect(); } }, { threshold: 0.3 }).observe(h1.querySelector('.hv1-roof'));
    // the line: leaves the house at the ground line, crosses the clear band, exits in the left margin
    var fsvg = h1.querySelector('.hv1-flow'), line = Owl.sweepLine(h1.querySelector('.hv1-flowpath'));
    function place() {
      if (h1.closest('[hidden]')) return;
      var H = h1.getBoundingClientRect(), g = h1.querySelector('.hv1-ground').getBoundingClientRect(), c = h1.querySelector('.hv1-copy').getBoundingClientRect();
      var x = Math.max(6, Math.round(c.left / 2)), sx = Math.round(g.left - H.left + 8) /* left of the caption (it starts 32px in) */, sy = Math.round(g.top - H.top + 2), ey = Math.round(H.height), lane = ey - 48;
      fsvg.setAttribute('viewBox', '0 0 ' + Math.round(H.width) + ' ' + ey);
      var d = 'M' + sx + ' ' + sy + ' C' + sx + ' ' + lane + ' ' + sx + ' ' + lane + ' ' + (sx - 80) + ' ' + lane + ' H' + (x + 40) + ' Q' + x + ' ' + lane + ' ' + x + ' ' + (lane + 40) + ' V' + ey;
      if (window.innerWidth < 1024) d = 'M' + sx + ' ' + sy + ' V' + lane + ' H' + (x + 40) + ' Q' + x + ' ' + lane + ' ' + x + ' ' + (lane + 40) + ' V' + ey;
      [line.live, line.base].forEach(function (n) { n.setAttribute('d', d); });
    }
    place(); addEventListener('resize', place); document.fonts.ready.then(place); document.addEventListener('owl:version', place); document.addEventListener('owl:page', place);
    Owl.scrub(h1, function (p) { line.set(0.25 + 0.75 * p); }, { start: 0, end: 0 });
    Owl.logo && h1.querySelectorAll('svg.logo').forEach(function (s) { Owl.logo(s); });
  }
})();
(function () {
  // ---- V2: Owl's footage as a scrubbed frame sequence (frames 1-50: rafters -> bundle -> shingle -> finished roof)
  var h2 = document.querySelector('.hero-v2');
  if (!h2) return;
  var N = 50, img = h2.querySelector('.hv2-img'), lines = [].slice.call(h2.querySelectorAll('.hv2-line'));
  var src = function (i) { return 'assets/hero/seq/f' + String(i).padStart(3, '0') + '.jpg'; };
  var cache = [], loaded = false;
  function preload() { // every 4th frame first (a coarse but complete scrub), then the rest; idle time only
    if (loaded) return; loaded = true;
    var order = []; for (var s = 0; s < 4; s++) for (var i = 1 + s; i <= N; i += 4) order.push(i);
    var k = 0; (function next() { if (k >= order.length) return; var i = order[k++], im = new Image(); im.decoding = 'async'; im.src = src(i); cache[i] = im; im.onload = im.onerror = function () { (window.requestIdleCallback || setTimeout)(next); }; })();
  }
  function nearest(i) { for (var d = 0; d < N; d++) { if (cache[i - d] && cache[i - d].complete) return i - d; if (cache[i + d] && cache[i + d].complete) return i + d; } return 1; }
  var cur = 1, beat = -1;
  // the line as the scrubber: dotted ahead, amber behind; a nail tick at each beat boundary
  var tsvg = h2.querySelector('.hv2-track'), line = Owl.sweepLine(h2.querySelector('.hv2-trackpath'), { width: 3 }), ticks = h2.querySelector('.hv2-ticks');
  function placeTrack() {
    if (h2.closest('[hidden]')) return;
    var w = Math.round(tsvg.getBoundingClientRect().width); if (!w) return;
    tsvg.setAttribute('viewBox', '0 0 ' + w + ' 24');
    [line.live, line.base].forEach(function (n) { n.setAttribute('d', 'M0 12 H' + w); });
    ticks.innerHTML = '';
    [0, 1 / 3, 2 / 3, 1].forEach(function (f) { var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('cx', Math.round(f * w)); c.setAttribute('cy', 12); c.setAttribute('r', 5); c.dataset.f = f; ticks.appendChild(c); });
  }
  function setBeat(b) { if (b === beat) return; beat = b; lines.forEach(function (l, i) { l.classList.toggle('is-on', i === b); }); }
  function render(p) {
    var i = Math.min(N, Math.max(1, Math.round(1 + p * (N - 1))));
    if (i !== cur) { cur = i; var n = cache[i] && cache[i].complete ? i : nearest(i); if (img.getAttribute('src') !== src(n)) img.src = src(n); }
    setBeat(p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2);
    line.set(p);
    ticks.querySelectorAll('circle').forEach(function (c) { c.classList.toggle('is-passed', p >= +c.dataset.f - 0.001); });
  }
  placeTrack(); addEventListener('resize', placeTrack); document.addEventListener('owl:version', function () { placeTrack(); preload(); });
  if (Owl.reduced()) { img.src = src(45); setBeat(0); line.set(1); return; }
  setBeat(0); render(0);
  if (!h2.closest('[hidden]')) (window.requestIdleCallback || setTimeout)(preload);
  Owl.pinScrub(h2.querySelector('.hv2-stage'), function (p) { if (!h2.closest('[hidden]')) render(p); });
})();
