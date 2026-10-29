/* proof [PLAN-V2 2.1] */
(function () {
  // ---- odometer, ported from React Bits CountUp (bank: count-up-reactbits, S45/Q279), roll mode ----
  var CELL = 1.2, STAGGER = 0.07;
  var easeOut = function (t) {            // cubic-bezier(0.33, 1, 0.68, 1), solved numerically
    var a = 0, b = 1, x, m;
    for (var i = 0; i < 24; i++) { m = (a + b) / 2; x = 3 * .33 * m * (1 - m) * (1 - m) + 3 * .68 * m * m * (1 - m) + m * m * m; if (x < t) a = m; else b = m; }
    m = (a + b) / 2;
    return 3 * 1 * m * (1 - m) * (1 - m) + 3 * 1 * m * m * (1 - m) + m * m * m;
  };
  var mod10 = function (v) { return ((v % 10) + 10) % 10; };
  var uid = 0;
  function buildOdo(el) {
    var target = el.dataset.odo, to = parseFloat(target);
    var digits = (target.split('.')[1] || '').length;
    var parts = to.toFixed(digits).split('.');
    var intS = parts[0], frac = parts[1] || '';
    var chars = (intS + (frac ? '.' + frac : '')).split('');
    var cols = [], place = intS.length - 1, html = '', defs = '';
    chars.forEach(function (c) { if (c !== '.') cols.push({ to: +c, place: place-- }); });
    var n = cols.length;
    var scaled = Math.round(to * Math.pow(10, digits));
    cols.forEach(function (col, index) {
      var rank = n - 1 - index;
      var turns = Math.min(Math.floor(Math.abs(scaled) / Math.pow(10, col.place + digits + 1)), Math.max(0, 3 - rank));
      col.delta = mod10(col.to) + 10 * turns;
    });
    var ci = 0;
    chars.forEach(function (c) {                     // one pass in reading order, so the decimal point sits in place
      if (c === '.') { html += '<span class="odo-col">.</span>'; return; }
      var col = cols[ci++], id = 'odo' + (++uid);
      var strip = '';
      for (var o = 0; o <= col.delta; o++) strip += '<span>' + mod10(o) + '</span>';
      html += '<span class="odo-col"><span class="odo-strip" data-col>' + strip + '</span></span>';
      defs += '<filter id="' + id + '" x="-20%" y="-50%" width="140%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0 0"/></filter>';
    });
    el.innerHTML = html + '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' + defs + '</defs></svg>';
    var strips = el.querySelectorAll('[data-col]'), blurs = el.querySelectorAll('feGaussianBlur');
    return {
      cols: cols, strips: strips, blurs: blurs,
      set: function (t, total) {                       // t seconds into a roll of `total` seconds
        var stg = n > 1 ? Math.min(STAGGER, (total * .4) / (n - 1)) : 0;
        var span = Math.max(.001, total - stg * (n - 1));
        var done = true;
        cols.forEach(function (col, index) {
          var u = Math.min(1, Math.max(0, (t - index * stg) / span));
          if (u < 1) done = false;
          var e = easeOut(u), pos = col.delta * e;
          strips[index].style.transform = 'translateY(' + (-pos).toFixed(4) + 'em)';
          // velocity blur only while rolling: sigma = min(0.05 * cell, speed * cell / 600)
          var speed = Math.abs(col.delta * (easeOut(Math.min(1, u + .01)) - e) / (.01 * span));
          var cellPx = parseFloat(getComputedStyle(strips[index]).fontSize) * CELL;
          var sigma = u > 0 && u < 1 ? Math.min(cellPx * .05, (speed * cellPx) / 600) : 0;
          if (sigma > .2) { blurs[index].setAttribute('stdDeviation', '0 ' + sigma.toFixed(2)); strips[index].style.filter = 'url(#' + blurs[index].parentNode.id + ')'; }
          else strips[index].style.filter = '';
        });
        return done;
      }
    };
  }

  EZ.section('proof', {
    /* v1 · At a glance */
    1: { init: function (root, k) {
      var rows = root.querySelectorAll('.proof1__row');
      EZ.reveal(k, root.querySelectorAll('.proof1__intro > *'));
      EZ.reveal(k, rows);
      if (!k.motion) return;
      rows.forEach(function (row) {
        ScrollTrigger.create({
          trigger: row, start: 'top bottom', once: true,
          onEnter: function () {
            // the table's rule grows as its row arrives: scaleX 0->1, 1.1s power3.out (smeulders line ornaments)
            k.ctx.add(function () { gsap.fromTo(row, { '--rule': 0 }, { '--rule': 1, duration: 1.1, ease: 'power3.out', delay: .1 }); });
          }
        });
      });
    } },

    /* v2 · The record adds up */
    2: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.proof2__head > *'));
      if (!k.motion) return;
      var els = root.querySelectorAll('[data-odo]');
      var odos = Array.prototype.map.call(els, function (el) { var html = el.innerHTML; k.add(function () { el.innerHTML = html; }); return buildOdo(el); });
      odos.forEach(function (o) { o.set(0, 2); });
      var started = false;
      k.io(root.querySelector('.proof2__sum'), function (e) {
        if (!e.isIntersecting || started) return;
        started = true;
        // terms roll one after another so the sum reads as it adds: 2s easeOut each [CountUp duration 2]
        var t0 = performance.now(), TOTAL = 2, delays = [0, .14, .28, .5, .7, .7];
        k.raf(function () {
          var t = (performance.now() - t0) / 1000, all = true;
          odos.forEach(function (o, i) { if (!o.set(Math.max(0, t - (delays[i] || 0)), TOTAL)) all = false; });
          return !all;
        });
      }, { threshold: .4 });
    } },

    /* v3 · One sentence, in focus */
    3: { init: function (root, k) {
      var line = root.querySelector('.proof3__line'), frame = root.querySelector('.proof3__frame');
      var words = Array.prototype.slice.call(root.querySelectorAll('.proof3__w'));
      var evs = root.querySelectorAll('.proof3__evt');
      words.forEach(function (w, i) { evs[i].id = 'proof3-ev-' + i; w.setAttribute('aria-describedby', evs[i].id); });
      var cur = -1, auto = k.motion, timer = null, inView = false;
      function place(i, instant) {
        var w = words[i], lr = line.getBoundingClientRect(), r = w.getBoundingClientRect();
        var to = { x: r.left - lr.left, y: r.top - lr.top, width: r.width, height: r.height };
        if (instant || !k.motion) gsap.set(frame, to);
        else k.ctx.add(function () { gsap.to(frame, Object.assign({ duration: .5, ease: 'power3.out', overwrite: true }, to)); });
      }
      function focus(i, instant) {
        if (i === cur) return;
        cur = i;
        words.forEach(function (w, j) { w.classList.toggle('is-on', j === i); });
        evs.forEach(function (p, j) { p.hidden = j !== i; });
        place(i, instant);
      }
      // sequential order: hold 1s, move .5s [True Focus pauseBetweenAnimations 1, animationDuration .5]
      function tick() {
        timer = k.timeout(function () {
          if (auto && inView) focus((cur + 1) % words.length);
          tick();
        }, 1500);
      }
      focus(0, true);
      if (auto) root.classList.add('is-cycling');
      k.add(function () { root.classList.remove('is-cycling'); words.forEach(function (w) { w.classList.remove('is-on'); }); });
      k.ro(line, function () { place(cur, true); });
      k.io(root, function (e) { inView = e.isIntersecting; });
      // manual mode on hover / focus; the cycle resumes 1s after the pointer leaves
      words.forEach(function (w, i) {
        k.on(w, 'pointerenter', function () { auto = false; focus(i); });
        k.on(w, 'focus', function () { auto = false; focus(i); });
        k.on(w, 'click', function () { auto = false; focus(i); });
      });
      k.on(line, 'pointerleave', function () { if (k.motion) k.timeout(function () { auto = true; }, 1000); });
      if (k.motion) tick();
      EZ.reveal(k, root.querySelectorAll('.proof3__head > *'));
      if (k.motion && k.fine) {
        var img = root.querySelector('.proof3__bg img');
        gsap.fromTo(img, { yPercent: -4, scale: 1.08 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } });
      }
    } }
  });
})();
