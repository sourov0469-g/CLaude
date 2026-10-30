/* towns, PLAN-V3 §3. The 104 municipalities as published (FACTS.md), placed by 2023 Census gazetteer points. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var ORDER = ['Miami-Dade', 'Broward', 'Palm Beach'];
  function geo() { return (window.__DATA || {}).southfl; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function f(n) { return Math.round(n * 10) / 10; }
  function lists(host, tag) {
    var D = geo();
    host.innerHTML = ORDER.map(function (c) {
      var t = D.towns[c].map(function (x) { return x[0]; });
      return '<details><summary>' + c.replace('-', '&#8209;') + ' <span class="nums">' + t.length + '</span></summary><p>' + t.map(esc).join(', ') + '</p></details>';
    }).join('');
  }

  EZ.section('towns', {
    /* slot 1 · AUDIT-01 winner (copied from v3; F9): clearing the field resets the sign and the live region, the list never
       covers Check it, the outline draws in 180ms, the sign swaps in 280ms and a miss shakes the posts once */
    1: { init: function (root, k) {
      var D = geo(), form = root.querySelector('.tc__form'), inp = root.querySelector('.tc__in'), list = root.querySelector('.tc__list');
      var outline = root.querySelector('.tc__outline'), opath = outline.querySelector('path'), sign = root.querySelector('.tc__sign'), ans = root.querySelector('.tc__ans');
      lists(root.querySelector('.tc__all'));
      var ALL = [];
      ORDER.forEach(function (c) { D.towns[c].forEach(function (t) { ALL.push({ n: t[0], c: c, k: norm(t[0]) }); }); });
      // Madoka outline: drawn round the field from the bottom-left on focus
      function shapeOutline() { var w = outline.clientWidth, h = outline.clientHeight; outline.setAttribute('viewBox', '0 0 ' + w + ' ' + h); opath.setAttribute('d', 'M1 ' + (h - 1) + 'V1H' + (w - 1) + 'V' + (h - 1) + 'H1'); }
      k.ro(outline, shapeOutline);
      shapeOutline();
      gsap.set(opath, { drawSVG: '0%' });
      k.on(inp, 'focus', function () { if (k.motion) gsap.to(opath, { drawSVG: '100%', duration: .18, ease: EZ.bezier(.23, 1, .32, 1) }); else gsap.set(opath, { drawSVG: '100%' }); });
      k.on(inp, 'blur', function () { if (!inp.value) gsap.to(opath, { drawSVG: '0%', duration: k.motion ? .3 : 0 }); k.timeout(close, 150); });

      var opts = [], act = -1;
      function close() { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); act = -1; inp.removeAttribute('aria-activedescendant'); }
      function suggest() {
        var q = norm(inp.value);
        if (!q) { close(); rest(); return; }
        opts = ALL.filter(function (t) { return t.k.indexOf(q) === 0; }).concat(ALL.filter(function (t) { return t.k.indexOf(q) > 0; })).slice(0, 4);
        if (!opts.length) { close(); return; }
        list.innerHTML = opts.map(function (t, i) { return '<li role="option" id="tco' + i + '" aria-selected="false">' + esc(t.n) + '<span>' + t.c + '</span></li>'; }).join('');
        list.hidden = false; inp.setAttribute('aria-expanded', 'true'); act = -1;
      }
      function mark(i) {
        act = i;
        list.querySelectorAll('li').forEach(function (li, j) { li.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
        if (i > -1) inp.setAttribute('aria-activedescendant', 'tco' + i);
      }
      k.on(inp, 'input', suggest);
      k.on(inp, 'keydown', function (e) {
        if (list.hidden) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); mark((act + 1) % opts.length); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); mark((act - 1 + opts.length) % opts.length); }
        else if (e.key === 'Escape') { close(); }
        else if (e.key === 'Enter' && act > -1) { e.preventDefault(); var t = opts[act]; inp.value = t.n; close(); show(t); }
      });
      k.on(list, 'pointerdown', function (e) { var li = e.target.closest('li'); if (!li) return; e.preventDefault(); var t = opts[+li.id.slice(3)]; inp.value = t.n; close(); show(t); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var q = norm(inp.value);
        if (!q) { inp.focus(); return; }
        var hit = ALL.filter(function (t) { return t.k === q; })[0] || (opts.length === 1 ? opts[0] : null);
        close();
        show(hit || null, inp.value.trim());
      });

      function fit(txt, max, w) { return Math.min(max, Math.floor(w / Math.max(1, txt.length * .68))); }
      function draw(main, sub, verdict, yes) {
        var fs = fit(main, 64, 440);
        sign.innerHTML =
          '<g class="posts"><path d="M150 236V300M370 236V300" stroke="#9fb0b5" stroke-width="12"/><path d="M150 236V300M370 236V300" stroke="#0B1418" stroke-width="2" opacity=".3"/>' +
          '<g class="panel"><rect x="20" y="20" width="480" height="230" rx="18" fill="' + (yes === false ? '#f2c230' : '#1e6b3a') + '" stroke="#0B1418" stroke-width="3"/>' +
          '<rect x="32" y="32" width="456" height="206" rx="12" fill="none" stroke="' + (yes === false ? '#0B1418' : '#fff') + '" stroke-width="4"/>' +
          '<text x="260" y="' + (110 + fs * .1) + '" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-weight="700" font-size="' + fs + '" fill="' + (yes === false ? '#0B1418' : '#fff') + '">' + esc(main) + '</text>' +
          '<text x="260" y="160" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-weight="600" font-size="24" fill="' + (yes === false ? '#0B1418' : '#e4f1e7') + '">' + esc(sub) + '</text>' +
          '<text x="260" y="208" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-weight="700" font-size="26" fill="' + (yes === false ? '#0B1418' : '#fff') + '">' + esc(verdict) + '</text></g></g>';
      }
      function show(t, raw) {
        if (t) { draw(t.n.toUpperCase(), t.c + ' County', 'We build here', true); ans.textContent = 'Yes. ' + t.n + ' is in ' + t.c + ' County, and Elbaz builds there.'; }
        else { draw('NOT ON OUR LIST', raw ? '“' + raw + '”' : '', 'Call (754) 236-0675 to ask', false); ans.textContent = (raw || 'That town') + ' is not one of the 104 municipalities on our list. Call (754) 236-0675 to ask.'; }
        if (k.motion) k.ctx.add(function () {
          gsap.fromTo(sign.querySelector('.panel'), { y: -60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .28, ease: 'back.out(1.8)' });
          if (!t) gsap.fromTo(sign.querySelector('.posts'), { rotation: 0 }, { keyframes: [{ rotation: -1.2, duration: .05 }, { rotation: 1.2, duration: .07 }, { rotation: -.6, duration: .04 }, { rotation: 0, duration: .04 }], svgOrigin: '260 300', delay: .28 });
        });
      }
      function rest() { draw('YOUR TOWN', 'Miami-Dade, Broward, Palm Beach', '104 municipalities', true); ans.textContent = ''; }
      rest();
      k.add(function () { sign.innerHTML = ''; root.querySelector('.tc__all').innerHTML = ''; inp.value = ''; close(); gsap.set(opath, { clearProps: 'all' }); });
      EZ.reveal(k, root.querySelectorAll('.tc__side > h2, .tc__side > p'));
    } },

    /* v1 · The survey map [BANK Q576 For Living: the map answers on hover (desktop) and on tap (touch)] */
    2: { init: function (root, k) {
      var D = geo(), map = root.querySelector('.towns1__map'), svg = root.querySelector('.towns1__svg'), read = root.querySelector('.towns1__read');
      var nEl = root.querySelector('.towns1__n'), cnEl = root.querySelector('.towns1__cn'), sr = root.querySelector('.towns1__sr');
      var tabs = Array.prototype.slice.call(root.querySelectorAll('.towns1__tab'));
      var miami = D.towns['Miami-Dade'].filter(function (t) { return t[0] === 'Miami'; })[0];
      var s = '<g class="ctys">';
      ORDER.forEach(function (c) { s += '<path class="cty" data-c="' + c + '" d="' + D.counties[c] + '"/>'; });
      s += '</g>';
      ORDER.forEach(function (c) { var b = D.boxes[c]; s += '<text class="clbl" x="' + f(b[0] + 30) + '" y="' + f(b[3] - 40) + '">' + c.toUpperCase() + '</text>'; });
      var all = [];
      s += '<g class="mks">';
      ORDER.forEach(function (c) { D.towns[c].forEach(function (t, i) { s += '<circle class="mk" data-c="' + c + '" data-i="' + i + '" cx="' + t[1] + '" cy="' + t[2] + '" r="6"/>'; all.push({ c: c, i: i, n: t[0], x: t[1], y: t[2] }); }); });
      s += '</g>';
      if (miami) s += '<rect class="office" x="-1" y="-1" width="2" height="2" transform="translate(' + miami[1] + ' ' + miami[2] + ') rotate(45)"/>';
      s += '<g class="flag" opacity="0"><line class="pole" x1="0" y1="0" x2="0" y2="-52"/><g class="pw"><path class="pen"/><text y="-34" font-size="20"></text></g></g>';
      svg.innerHTML = s;
      lists(sr);
      var marks = Array.prototype.slice.call(svg.querySelectorAll('.mk')), paths = Array.prototype.slice.call(svg.querySelectorAll('.cty'));
      var office = svg.querySelector('.office'), flag = svg.querySelector('.flag'), pole = flag.querySelector('.pole'), pw = flag.querySelector('.pw'), pen = flag.querySelector('.pen'), ftx = flag.querySelector('text');
      k.add(function () { svg.innerHTML = ''; sr.innerHTML = ''; read.textContent = ''; });

      var cur = null, hot = null, box = null, unit = 1;
      function vbOf(c) { var b = D.boxes[c], p = 90; return [b[0] - p, b[1] - p, b[2] - b[0] + p * 2, b[3] - b[1] + p * 2]; }
      // svg units per screen px for a viewBox under preserveAspectRatio meet
      function unitOf(v) { var r = map.getBoundingClientRect(); return Math.max(v[2] / Math.max(1, r.width), v[3] / Math.max(1, r.height)); }
      function sizeTo(u, tween) {
        unit = u;
        var r = { attr: { r: f(5.5 * u) } }, o = { attr: { transform: 'translate(' + (miami ? miami[1] + ' ' + miami[2] : '0 0') + ') rotate(45) scale(' + f(9 * u) + ')' } };
        if (tween) { gsap.to(marks, Object.assign({ duration: .5, ease: 'power3.inOut' }, r)); gsap.to(office, Object.assign({ duration: .5, ease: 'power3.inOut' }, o)); }
        else { gsap.set(marks, r); gsap.set(office, o); }
      }
      function hide(now) {
        if (hot) hot.classList.remove('is-hot');
        hot = null; read.textContent = '';
        gsap.to(flag, { opacity: 0, duration: now || !k.motion ? 0 : .15, overwrite: true });
      }
      function raise(m) {
        if (m === hot) return;
        if (hot) hot.classList.remove('is-hot');
        hot = m; m.classList.add('is-hot');
        var t = all[marks.indexOf(m)];
        ftx.textContent = t.n.toUpperCase();
        var w = ftx.getComputedTextLength() + 26;
        // pennant flies left when it would leave the map
        var mr = m.getBoundingClientRect(), r = map.getBoundingClientRect(), left = mr.left + w + 30 > r.right;
        pen.setAttribute('d', left ? 'M0 -52H' + (-w - 12) + 'L' + (-w) + '-40L' + (-w - 12) + '-28H0Z' : 'M0 -52H' + (w + 12) + 'L' + w + '-40L' + (w + 12) + '-28H0Z');
        ftx.setAttribute('x', left ? -w + 10 : 13);
        flag.setAttribute('transform', 'translate(' + t.x + ' ' + t.y + ') scale(' + f(unit) + ')');
        read.textContent = t.n + ' · ' + t.c + ' County';
        if (!k.motion) { gsap.set(flag, { opacity: 1 }); return; }
        gsap.killTweensOf([flag, pole, pw]);
        gsap.set(flag, { opacity: 1 });
        gsap.fromTo(pole, { scaleY: 0, svgOrigin: '0 0' }, { scaleY: 1, duration: .16, ease: 'power2.out', svgOrigin: '0 0' });
        gsap.fromTo(pw, { scaleX: 0, svgOrigin: '0 -40' }, { scaleX: 1, duration: .22, ease: 'back.out(2.4)', svgOrigin: '0 -40', delay: .1 });
      }
      function nearest(e, px) {
        var ctm = svg.getScreenCTM(); if (!ctm) return null;
        var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; pt = pt.matrixTransform(ctm.inverse());
        var best = null, bd = px * unit;
        marks.forEach(function (m, j) { if (all[j].c !== cur) return; var d = Math.hypot(all[j].x - pt.x, all[j].y - pt.y); if (d < bd) { bd = d; best = m; } });
        return best;
      }
      function select(c, focus) {
        if (c === cur) return;
        cur = c; hide(true);
        tabs.forEach(function (t) { var on = t.dataset.c === c; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
        paths.forEach(function (p) { p.classList.toggle('is-on', p.dataset.c === c); });
        marks.forEach(function (m, j) { m.classList.toggle('is-dim', all[j].c !== c); });
        cnEl.innerHTML = c.replace('-', '&#8209;');
        var n = D.towns[c].length, v = vbOf(c);
        box = v;
        if (k.motion && svg.getAttribute('viewBox')) {
          var o = { v: +nEl.textContent || 0 };
          gsap.to(o, { v: n, duration: .3, ease: 'power2.out', onUpdate: function () { nEl.textContent = Math.round(o.v); } });
          gsap.to(svg, { attr: { viewBox: v.join(' ') }, duration: .5, ease: 'power3.inOut', overwrite: 'auto' });
          sizeTo(unitOf(v), true);
        } else { nEl.textContent = n; svg.setAttribute('viewBox', v.join(' ')); sizeTo(unitOf(v)); }
      }
      tabs.forEach(function (t, i) {
        k.on(t, 'click', function () { select(t.dataset.c); });
        k.on(t, 'keydown', function (e) {
          var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
          if (d) { e.preventDefault(); select(tabs[(i + d + 3) % 3].dataset.c, true); }
        });
      });
      k.on(map, 'pointermove', function (e) { if (e.pointerType !== 'mouse') return; var m = nearest(e, 28); if (m) raise(m); else if (hot) hide(); });
      k.on(map, 'pointerleave', function (e) { if (e.pointerType === 'mouse') hide(); });
      k.on(map, 'click', function (e) {
        var m = nearest(e, e.pointerType === 'mouse' ? 28 : 40);
        if (m) { raise(m); return; }
        var p = e.target.closest && e.target.closest('.cty');
        if (p && p.dataset.c !== cur) select(p.dataset.c);
      });
      k.on(map, 'keydown', function (e) {
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!d && e.key !== 'Home' && e.key !== 'End') return;
        e.preventDefault();
        var own = marks.filter(function (m, j) { return all[j].c === cur; }), i = own.indexOf(hot);
        i = e.key === 'Home' ? 0 : e.key === 'End' ? own.length - 1 : i < 0 ? (d > 0 ? 0 : own.length - 1) : (i + d + own.length) % own.length;
        raise(own[i]);
      });
      k.on(map, 'blur', function () { hide(); });
      k.ro(map, function () { if (box) { sizeTo(unitOf(box)); if (hot) { var h = hot; hot = null; raise(h); } } });
      select('Miami-Dade');
      EZ.reveal(k, root.querySelectorAll('.towns1__head > *'));
      if (k.motion) gsap.from(marks, { scale: 0, transformOrigin: '50% 50%', duration: .2, ease: 'back.out(3)', stagger: { each: .004, from: 'random' }, scrollTrigger: { trigger: map, start: 'top 75%', once: true } });
    } },

    /* v2 · Around the office [S0717] */
    3: { init: function (root, k) {
      var D = geo(), svg = root.querySelector('.towns2__svg'), stage = root.querySelector('.towns2__stage');
      var reads = root.querySelectorAll('.towns2__read li'), pause = root.querySelector('.towns2__pause'), pl = pause.querySelector('.btn__label');
      lists(root.querySelector('.towns2__lists'));
      svg.setAttribute('viewBox', '-500 -500 1000 1000');
      var R = [205, 300, 395], SP = [60, 90, 180], s = '', rings = [];
      ORDER.forEach(function (c, ri) {
        var n = D.towns[c].length, dots = '';
        for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2; dots += '<circle class="td" cx="' + f(Math.cos(a) * R[ri]) + '" cy="' + f(Math.sin(a) * R[ri]) + '" r="5"/>'; }
        s += '<circle class="ring" r="' + R[ri] + '"/><g class="rg" data-r="' + ri + '">' + dots + '</g>';
        s += '<text class="rlbl" x="0" y="' + (R[ri] + 26) + '" text-anchor="middle">' + c.toUpperCase() + ' ' + n + '</text>';
      });
      s += '<path class="mark" d="M0 -430V-170"/><path class="mark" d="M-10 -430h20"/>';
      svg.innerHTML = s;
      ORDER.forEach(function (c, ri) { rings.push({ g: svg.querySelector('.rg[data-r="' + ri + '"]'), dots: svg.querySelectorAll('.rg[data-r="' + ri + '"] .td'), rot: ri * 40, n: D.towns[c].length, hl: -1, towns: D.towns[c], c: c }); });
      k.add(function () { svg.innerHTML = ''; root.querySelector('.towns2__lists').innerHTML = ''; });
      function update() {
        rings.forEach(function (r, ri) {
          r.g.setAttribute('transform', 'rotate(' + f(r.rot) + ')');
          // which town sits under the survey mark (12 o'clock)
          var step = 360 / r.n, idx = Math.round(((-90 - r.rot) % 360 + 720) % 360 / step) % r.n;
          if (idx !== r.hl) {
            if (r.hl > -1) r.dots[r.hl].classList.remove('is-hl');
            r.hl = idx; r.dots[idx].classList.add('is-hl');
            reads[2 - ri].innerHTML = '<b>' + r.c.replace('-', '&#8209;') + '</b>' + esc(r.towns[idx][0]);
          }
        });
      }
      update();
      if (!k.motion) { pause.hidden = true; k.add(function () { pause.hidden = false; }); return; }
      var paused = false, hover = false;
      var loop = k.raf(function (dt) {
        if (paused || hover) return;
        rings.forEach(function (r, ri) { r.rot += 360 / SP[ri] * dt; });
        update();
      });
      k.io(stage, function (en) { en.isIntersecting ? loop.start() : loop.stop(); });
      k.on(stage, 'pointerenter', function (e) { if (e.pointerType === 'mouse') hover = true; });
      k.on(stage, 'pointerleave', function () { hover = false; });
      k.on(pause, 'click', function () { paused = !paused; pause.setAttribute('aria-pressed', paused ? 'true' : 'false'); pl.textContent = paused ? 'Run the rings' : 'Pause the rings'; });
      k.add(function () { pause.setAttribute('aria-pressed', 'false'); pl.textContent = 'Pause the rings'; });
      EZ.reveal(k, root.querySelectorAll('.towns__head > *'));
      gsap.from(svg.querySelectorAll('.ring'), { scale: .4, autoAlpha: 0, transformOrigin: '50% 50%', duration: .3, ease: 'power2.out', stagger: .06, scrollTrigger: { trigger: stage, start: 'top 75%', once: true } });
    } },

    /* v3 · The road sign [F3 + BANK 310 Madoka] */
    b1: { init: function (root, k) {
      var D = geo(), form = root.querySelector('.towns3__form'), inp = root.querySelector('.towns3__in'), list = root.querySelector('.towns3__list');
      var outline = root.querySelector('.towns3__outline'), opath = outline.querySelector('path'), sign = root.querySelector('.towns3__sign'), ans = root.querySelector('.towns3__ans');
      lists(root.querySelector('.towns3__all'));
      var ALL = [];
      ORDER.forEach(function (c) { D.towns[c].forEach(function (t) { ALL.push({ n: t[0], c: c, k: norm(t[0]) }); }); });
      // Madoka outline: drawn round the field from the bottom-left on focus
      function shapeOutline() { var w = outline.clientWidth, h = outline.clientHeight; outline.setAttribute('viewBox', '0 0 ' + w + ' ' + h); opath.setAttribute('d', 'M1 ' + (h - 1) + 'V1H' + (w - 1) + 'V' + (h - 1) + 'H1'); }
      k.ro(outline, shapeOutline);
      shapeOutline();
      gsap.set(opath, { drawSVG: '0%' });
      k.on(inp, 'focus', function () { if (k.motion) gsap.to(opath, { drawSVG: '100%', duration: .5, ease: 'power2.inOut' }); else gsap.set(opath, { drawSVG: '100%' }); });
      k.on(inp, 'blur', function () { if (!inp.value) gsap.to(opath, { drawSVG: '0%', duration: k.motion ? .3 : 0 }); k.timeout(close, 150); });

      var opts = [], act = -1;
      function close() { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); act = -1; inp.removeAttribute('aria-activedescendant'); }
      function suggest() {
        var q = norm(inp.value);
        if (!q) { close(); return; }
        opts = ALL.filter(function (t) { return t.k.indexOf(q) === 0; }).concat(ALL.filter(function (t) { return t.k.indexOf(q) > 0; })).slice(0, 4);
        if (!opts.length) { close(); return; }
        list.innerHTML = opts.map(function (t, i) { return '<li role="option" id="t3o' + i + '" aria-selected="false">' + esc(t.n) + '<span>' + t.c + '</span></li>'; }).join('');
        list.hidden = false; inp.setAttribute('aria-expanded', 'true'); act = -1;
      }
      function mark(i) {
        act = i;
        list.querySelectorAll('li').forEach(function (li, j) { li.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
        if (i > -1) inp.setAttribute('aria-activedescendant', 't3o' + i);
      }
      k.on(inp, 'input', suggest);
      k.on(inp, 'keydown', function (e) {
        if (list.hidden) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); mark((act + 1) % opts.length); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); mark((act - 1 + opts.length) % opts.length); }
        else if (e.key === 'Escape') { close(); }
        else if (e.key === 'Enter' && act > -1) { e.preventDefault(); var t = opts[act]; inp.value = t.n; close(); show(t); }
      });
      k.on(list, 'pointerdown', function (e) { var li = e.target.closest('li'); if (!li) return; e.preventDefault(); var t = opts[+li.id.slice(3)]; inp.value = t.n; close(); show(t); });
      k.on(form, 'submit', function (e) {
        e.preventDefault();
        var q = norm(inp.value);
        if (!q) { inp.focus(); return; }
        var hit = ALL.filter(function (t) { return t.k === q; })[0] || (opts.length === 1 ? opts[0] : null);
        close();
        show(hit || null, inp.value.trim());
      });

      function fit(txt, max, w) { return Math.min(max, Math.floor(w / Math.max(1, txt.length * .68))); }
      function draw(main, sub, verdict, yes) {
        var fs = fit(main, 64, 440);
        sign.innerHTML =
          '<path d="M150 236V420M370 236V420" stroke="#9fb0b5" stroke-width="12"/><path d="M150 236V420M370 236V420" stroke="#0B1418" stroke-width="2" opacity=".3"/>' +
          '<g class="panel"><rect x="20" y="20" width="480" height="230" rx="18" fill="' + (yes === false ? '#f2c230' : '#1e6b3a') + '" stroke="#0B1418" stroke-width="3"/>' +
          '<rect x="32" y="32" width="456" height="206" rx="12" fill="none" stroke="' + (yes === false ? '#0B1418' : '#fff') + '" stroke-width="4"/>' +
          '<text x="260" y="' + (110 + fs * .1) + '" text-anchor="middle" font-family="Geist, sans-serif" font-weight="700" font-size="' + fs + '" fill="' + (yes === false ? '#0B1418' : '#fff') + '">' + esc(main) + '</text>' +
          '<text x="260" y="160" text-anchor="middle" font-family="Geist, sans-serif" font-weight="600" font-size="24" fill="' + (yes === false ? '#0B1418' : '#e4f1e7') + '">' + esc(sub) + '</text>' +
          '<text x="260" y="208" text-anchor="middle" font-family="Geist, sans-serif" font-weight="700" font-size="26" fill="' + (yes === false ? '#0B1418' : '#fff') + '">' + esc(verdict) + '</text></g>';
      }
      function show(t, raw) {
        if (t) { draw(t.n.toUpperCase(), t.c + ' County', 'We build here', true); ans.textContent = 'Yes. ' + t.n + ' is in ' + t.c + ' County, and Elbaz builds there.'; }
        else { draw('NOT ON OUR LIST', raw ? '“' + raw + '”' : '', 'Call (754) 236-0675 to ask', false); ans.textContent = (raw || 'That town') + ' is not one of the 104 municipalities on our list. Call (754) 236-0675 to ask.'; }
        if (k.motion) k.ctx.add(function () { gsap.fromTo(sign.querySelector('.panel'), { y: -80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .4, ease: 'back.out(2)' }); });
      }
      draw('YOUR TOWN', 'Miami-Dade, Broward, Palm Beach', '104 municipalities', true);
      k.add(function () { sign.innerHTML = ''; root.querySelector('.towns3__all').innerHTML = ''; inp.value = ''; close(); gsap.set(opath, { clearProps: 'all' }); });
      EZ.reveal(k, root.querySelectorAll('.towns3__side > h2, .towns3__side > p'));
    } }
  });
})();
