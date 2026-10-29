/* towns [PLAN-V2 2.8] — answers use the firm's own FAQ promise */
(function () {
  var GEO = (window.__DATA || {}).southfl || { towns: {} };
  var ORDER = ['Miami-Dade', 'Broward', 'Palm Beach'];
  var ALL = [];
  ORDER.forEach(function (c) { (GEO.towns[c] || []).forEach(function (t) { ALL.push({ name: t[0], county: c, x: t[1], y: t[2] }); }); });
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function find(q) {
    var n = norm(q);
    if (!n) return { exact: null, list: [] };
    var exact = ALL.filter(function (t) { return norm(t.name) === n; })[0] || null;
    var starts = ALL.filter(function (t) { return norm(t.name).indexOf(n) === 0; });
    var inside = ALL.filter(function (t) { return norm(t.name).indexOf(n) > 0; });
    return { exact: exact, list: starts.concat(inside).slice(0, 4) };
  }
  function yes(t) { return 'Yes. <b>' + t.name + '</b> is in ' + t.county + ' County. We build there.'; }
  var NO = 'It’s not on our list. Call <a class="link" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a> and we’ll tell you straight away.';

  EZ.section('towns', {
    /* v1 · the counties: Lagom accordion + map camera */
    1: { init: function (root, k) {
      var NS = 'http://www.w3.org/2000/svg', svg = root.querySelector('.towns1__svg');
      var rows = Array.prototype.slice.call(root.querySelectorAll('.towns1__row'));
      svg.setAttribute('viewBox', '0 0 ' + GEO.w + ' ' + GEO.h);
      var paths = {}, pts = {};
      ORDER.forEach(function (c) {
        var p = document.createElementNS(NS, 'path'); p.setAttribute('d', GEO.counties[c]); p.setAttribute('class', 'cty'); svg.appendChild(p); paths[c] = p;
      });
      ORDER.forEach(function (c) {
        pts[c] = (GEO.towns[c] || []).map(function (t) {
          var e = document.createElementNS(NS, 'circle'); e.setAttribute('cx', t[1]); e.setAttribute('cy', t[2]); e.setAttribute('r', 5.5); e.setAttribute('class', 'pt');
          var ti = document.createElementNS(NS, 'title'); ti.textContent = t[0]; e.appendChild(ti); svg.appendChild(e); return e;
        });
      });
      k.add(function () { svg.innerHTML = ''; });
      var cam = { x: 0, y: 0, w: GEO.w, h: GEO.h }, cur = -1, fill = null, inView = false;
      function camFor(c) {
        var b = GEO.boxes[c], r = svg.getBoundingClientRect(), ar = (r.width || 4) / (r.height || 5);
        var pad = 1.18, w = (b[2] - b[0]) * pad, h = (b[3] - b[1]) * pad;
        if (w / h < ar) w = h * ar; else h = w / ar;
        return { x: (b[0] + b[2]) / 2 - w / 2, y: (b[1] + b[3]) / 2 - h / 2, w: w, h: h };
      }
      function setCam() { svg.setAttribute('viewBox', cam.x.toFixed(1) + ' ' + cam.y.toFixed(1) + ' ' + cam.w.toFixed(1) + ' ' + cam.h.toFixed(1)); }
      function open(i, instant) {
        cur = i;
        var c = ORDER[i];
        rows.forEach(function (r, j) {
          var on = j === i, head = r.querySelector('.towns1__head');
          head.setAttribute('aria-expanded', on ? 'true' : 'false');
          r.querySelector('.towns1__list').hidden = !on;
          head.style.setProperty('--progress', 0);
        });
        ORDER.forEach(function (cc) { paths[cc].classList.toggle('is-on', cc === c); pts[cc].forEach(function (e) { e.classList.toggle('is-on', cc === c); }); });
        var to = camFor(c);
        if (instant || !k.motion) { cam = to; setCam(); }
        else k.ctx.add(function () { gsap.to(cam, { x: to.x, y: to.y, w: to.w, h: to.h, duration: 1.2, ease: 'power2.inOut', overwrite: true, onUpdate: setCam }); });
        runFill();
      }
      // each open row runs a 15s linear progress fill, then hands over to the next row [Lagom]
      function runFill(from) {
        if (fill) fill.kill();
        if (!k.motion || !inView) return;
        var head = rows[cur].querySelector('.towns1__head');
        k.ctx.add(function () {
          fill = gsap.fromTo(head, { '--progress': from || 0 }, { '--progress': 1, duration: 15 * (1 - (from || 0)), ease: 'none', onComplete: function () { open((cur + 1) % rows.length); } });
        });
      }
      rows.forEach(function (r, i) {
        var head = r.querySelector('.towns1__head');
        k.on(head, 'click', function () { open(i); });
        // hovering the open row runs its fill back over .5s power2.inOut and holds; leaving resumes [Lagom]
        k.on(r, 'pointerenter', function () {
          if (i !== cur || !k.motion) return;
          if (fill) fill.kill();
          k.ctx.add(function () { fill = gsap.to(head, { '--progress': 0, duration: .5, ease: 'power2.inOut' }); });
        });
        k.on(r, 'pointerleave', function () { if (i === cur) runFill(parseFloat(getComputedStyle(head).getPropertyValue('--progress')) || 0); });
      });
      k.io(root, function (e) { var was = inView; inView = e.isIntersecting; if (inView && !was && cur > -1) runFill(); if (!inView && fill) fill.pause(); }, { threshold: .25 });
      k.ro(svg, function () { if (cur > -1) { cam = camFor(ORDER[cur]); setCam(); } });
      open(0, true);
      k.add(function () { if (fill) fill.kill(); });
      EZ.reveal(k, root.querySelectorAll('.towns1__side > .t-label, .towns1__side > .t-head, .towns1__side > .towns__line'));
    } },

    /* v2 · ask: one field, a straight answer */
    2: { init: function (root, k) {
      var input = root.querySelector('.towns2__input'), sug = root.querySelector('.towns2__sug'), ans = root.querySelector('.towns2__answer');
      var counties = root.querySelectorAll('.towns2__counties span'), base = ans.innerHTML, sel = -1, list = [];
      function showCounty(c) { counties.forEach(function (s) { s.classList.toggle('is-on', s.dataset.c === c); }); }
      function choose(t) {
        input.value = t.name; sug.hidden = true; input.setAttribute('aria-expanded', 'false');
        ans.innerHTML = yes(t); showCounty(t.county);
      }
      function render() {
        sug.innerHTML = list.map(function (t, i) { return '<li role="option" id="towns2-o' + i + '" aria-selected="' + (i === sel) + '" data-i="' + i + '" data-cursor="pin">' + t.name + '<span>' + t.county + '</span></li>'; }).join('');
        sug.hidden = !list.length; input.setAttribute('aria-expanded', list.length ? 'true' : 'false');
        if (sel > -1) input.setAttribute('aria-activedescendant', 'towns2-o' + sel); else input.removeAttribute('aria-activedescendant');
      }
      k.on(input, 'input', function () {
        var r = find(input.value); sel = -1;
        list = r.exact ? [] : r.list;
        render();
        if (r.exact) { ans.innerHTML = yes(r.exact); showCounty(r.exact.county); }
        else if (norm(input.value).length >= 3 && !r.list.length) { ans.innerHTML = NO; showCounty(''); }
        else if (!input.value.trim()) { ans.innerHTML = base; showCounty(''); }
        else showCounty('');
      });
      k.on(input, 'keydown', function (e) {
        if (e.key === 'ArrowDown' && list.length) { e.preventDefault(); sel = (sel + 1) % list.length; render(); }
        else if (e.key === 'ArrowUp' && list.length) { e.preventDefault(); sel = (sel - 1 + list.length) % list.length; render(); }
        else if (e.key === 'Enter') { e.preventDefault(); if (sel > -1) choose(list[sel]); else if (list.length === 1) choose(list[0]); }
        else if (e.key === 'Escape') { sug.hidden = true; }
      });
      k.on(sug, 'mousedown', function (e) { var li = e.target.closest('li'); if (li) { e.preventDefault(); choose(list[+li.dataset.i]); } });
      k.add(function () { input.value = ''; ans.innerHTML = base; sug.hidden = true; showCounty(''); });
      EZ.reveal(k, root.querySelectorAll('.towns2__in > .t-label, .towns2__in > .t-head'));
    } },

    /* v3 · all 104 with the proximity font (P70 / Q171 values) */
    3: { init: function (root, k) {
      var index = root.querySelector('.towns3__index');
      var lis = Array.prototype.slice.call(root.querySelectorAll('.towns3__names li'));
      var findIn = root.querySelector('#towns3-find'), ans = root.querySelector('.towns3__answer');
      root.querySelectorAll('.towns3__ch').forEach(function (b) {
        k.on(b, 'click', function () {
          var col = b.closest('.towns3__col'), on = b.getAttribute('aria-pressed') !== 'true';
          root.querySelectorAll('.towns3__ch').forEach(function (x) { x.setAttribute('aria-pressed', x === b && on ? 'true' : 'false'); });
          root.querySelectorAll('.towns3__col').forEach(function (c) { c.classList.toggle('is-dim', on && c !== col); });
        });
      });
      k.on(findIn, 'input', function () {
        var r = find(findIn.value), n = norm(findIn.value);
        lis.forEach(function (li) { li.classList.toggle('is-hit', !!n && norm(li.textContent).indexOf(n) === 0); });
        ans.innerHTML = r.exact ? yes(r.exact) : (n.length >= 3 && !r.list.length ? NO : '');
        var hit = lis.filter(function (li) { return li.classList.contains('is-hit'); })[0];
        if (hit && r.exact) hit.scrollIntoView({ block: 'nearest', behavior: k.motion ? 'smooth' : 'auto' });
      });
      k.add(function () { lis.forEach(function (li) { li.classList.remove('is-hit'); }); root.querySelectorAll('.towns3__col').forEach(function (c) { c.classList.remove('is-dim'); }); ans.innerHTML = ''; findIn.value = ''; });
      EZ.reveal(k, root.querySelectorAll('.towns3__head > div > *'));
      if (!k.motion || !k.fine) return;
      // split names into letters; the readable name stays as real text for assistive tech
      var originals = lis.map(function (li) { return li.innerHTML; });
      lis.forEach(function (li) {
        var t = li.textContent;
        // a hidden copy at the heaviest weight reserves the width, so the swelling letters never reflow the list
        li.innerHTML = '<span class="sr-only">' + t + '</span><span class="vis" aria-hidden="true">' + t.split('').map(function (c) { return c === ' ' ? ' ' : '<span class="ch">' + c + '</span>'; }).join('') + '</span><span class="rsv" aria-hidden="true">' + t + '</span>';
        li.classList.add('is-split');
      });
      k.add(function () { lis.forEach(function (li, i) { li.innerHTML = originals[i]; li.classList.remove('is-split'); }); });
      var chars = Array.prototype.slice.call(index.querySelectorAll('.ch'));
      var lv = new Float32Array(chars.length), pos = [], ir = null;
      var R = 120, E2 = Math.exp(-2), BASE = 300, SPAN = 500;
      function measure() {
        ir = index.getBoundingClientRect();
        pos = chars.map(function (c) { var r = c.getBoundingClientRect(); return [r.left + r.width / 2 - ir.left, r.top + r.height / 2 - ir.top]; });
      }
      measure();
      k.ro(index, measure);
      var px = -1e4, py = -1e4, last = performance.now(), idle = 0, mix = 0, inView = false, t0 = performance.now();
      k.on(index, 'pointermove', function (e) { var r = index.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; last = performance.now(); start(); }, { passive: true });
      k.on(index, 'pointerleave', function () { px = py = -1e4; last = performance.now(); });
      k.on(window, 'scroll', function () { ir = null; }, { passive: true });
      k.io(index, function (e) { inView = e.isIntersecting; if (inView) { measure(); start(); } }, { threshold: 0 });
      var loop = null;
      function start() { if (!loop) loop = k.raf(frame); }
      function frame(dt) {
        if (!inView) { loop = null; return false; }
        var now = performance.now(), ms = Math.min(dt * 1000, 64);   // delta clamp 64ms
        // idle wave mixes in after 500ms without pointer movement, time constant 600ms
        var idleNow = now - last > 500;
        mix += ((idleNow ? 1 : 0) - mix) * (1 - Math.exp(-ms / 600));
        var span = Math.max(220, .85 * index.clientWidth), T = 3.2, tt = (now - t0) / 1000;
        var a = 1 - Math.exp(-ms / (0.2 * 400));                    // smoothing 0.2
        for (var i = 0; i < chars.length; i++) {
          var p = pos[i]; if (!p) continue;
          var dx = p[0] - px, dy = p[1] - py, d = Math.sqrt(dx * dx + dy * dy), g = 0;
          if (d < R) { var q = d / R; g = (Math.exp(-2 * q * q) - E2) / (1 - E2); }   // gaussian falloff
          var w = 0;
          if (mix > .01) { var ph = (p[0] + .6 * p[1]) / span - tt / T; w = .7 * Math.pow((1 + Math.cos(ph * 6.2832)) / 2, 2.2) * mix; }
          var target = Math.max(g, w), l = lv[i] + (target - lv[i]) * a;
          if (Math.abs(target - l) < .002) l = target;               // snap epsilon
          if (Math.abs(l - lv[i]) > .003 || (l === target && lv[i] !== target)) {
            lv[i] = l;
            chars[i].style.fontWeight = Math.round(BASE + SPAN * l);
          }
        }
      }
      start();
    } }
  });
})();
