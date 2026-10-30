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
    /* slot 3 · Phase 5 improved version of b4 */
    3: { init: function (root, k) {
      var D = geo(), svg = root.querySelector('.t2x__svg'), stage = root.querySelector('.t2x__stage');
      var reads = root.querySelectorAll('.t2x__read li'), pause = root.querySelector('.t2x__pause'), pl = pause.querySelector('.btn__label');
      lists(root.querySelector('.t2x__lists'));
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
      k.add(function () { svg.innerHTML = ''; root.querySelector('.t2x__lists').innerHTML = ''; });
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

    /* slot 2 · Phase 5 improved version of b3 */
    2: { init: function (root, k) {
      var D = geo(), map = root.querySelector('.t1x__map'), svg = root.querySelector('.t1x__svg'), read = root.querySelector('.t1x__read');
      var nEl = root.querySelector('.t1x__n'), cnEl = root.querySelector('.t1x__cn'), sr = root.querySelector('.t1x__sr');
      var tabs = Array.prototype.slice.call(root.querySelectorAll('.t1x__tab'));
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
      EZ.reveal(k, root.querySelectorAll('.t1x__head > *'));
      if (k.motion) gsap.from(marks, { scale: 0, transformOrigin: '50% 50%', duration: .2, ease: 'back.out(3)', stagger: { each: .004, from: 'random' }, scrollTrigger: { trigger: map, start: 'top 75%', once: true } });
    } },

    /* slot 1 · Phase 5 improved version of b2 */
    1: { init: function (root, k) {
      var D = geo(), form = root.querySelector('.tcx__form'), inp = root.querySelector('.tcx__in'), list = root.querySelector('.tcx__list');
      var outline = root.querySelector('.tcx__outline'), opath = outline.querySelector('path'), sign = root.querySelector('.tcx__sign'), ans = root.querySelector('.tcx__ans');
      lists(root.querySelector('.tcx__all'));
      // the three counties behind the sign, every municipality a survey mark; a hit lights its mark (the map proves the answer)
      var map = root.querySelector('.tcx__map');
      map.innerHTML = ORDER.map(function (c) { return '<path class="tcx__cty" d="' + D.counties[c] + '"/>'; }).join('') +
        ORDER.map(function (c) { return D.towns[c].map(function (t) { return '<circle class="tcx__dot" r="9" cx="' + t[1] + '" cy="' + t[2] + '" data-n="' + esc(t[0]) + '"/>'; }).join(''); }).join('');
      var dots = map.querySelectorAll('.tcx__dot');
      function lightTown(n) { dots.forEach(function (c) { var on = c.getAttribute('data-n') === n; c.classList.toggle('is-on', on); if (on && k.motion) gsap.fromTo(c, { attr: { r: 40 } }, { attr: { r: 18 }, duration: .4, ease: 'power2.out' }); else c.setAttribute('r', on ? 18 : 9); }); }
      k.add(function () { map.innerHTML = ''; });
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
          '<g class="posts"><path d="M150 236V300M370 236V300" stroke="#C9C1B6" stroke-width="12"/><path d="M150 236V300M370 236V300" stroke="#121212" stroke-width="2" opacity=".3"/>' +
          '<g class="panel"><rect x="20" y="20" width="480" height="230" rx="18" fill="' + (yes === false ? '#FF5F00' : '#FF5F00') + '" stroke="#121212" stroke-width="3"/>' +
          '<rect x="32" y="32" width="456" height="206" rx="12" fill="none" stroke="' + (yes === false ? '#121212' : '#FFFFFF') + '" stroke-width="4"/>' +
          '<text x="260" y="' + (110 + fs * .1) + '" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-weight="700" font-size="' + fs + '" fill="' + (yes === false ? '#121212' : '#FFFFFF') + '">' + esc(main) + '</text>' +
          '<text x="260" y="160" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-weight="600" font-size="24" fill="' + (yes === false ? '#121212' : '#121212') + '">' + esc(sub) + '</text>' +
          '<text x="260" y="208" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-weight="700" font-size="26" fill="' + (yes === false ? '#121212' : '#FFFFFF') + '">' + esc(verdict) + '</text></g></g>';
      }
      function show(t, raw) {
        if (t) { lightTown(t.n); draw(t.n.toUpperCase(), t.c + ' County', 'We build here', true); ans.textContent = 'Yes. ' + t.n + ' is in ' + t.c + ' County, and Elbaz builds there.'; }
        else { draw('NOT ON OUR LIST', raw ? '“' + raw + '”' : '', 'Call (754) 236-0675 to ask', false); ans.textContent = (raw || 'That town') + ' is not one of the 104 municipalities on our list. Call (754) 236-0675 to ask.'; }
        if (k.motion) k.ctx.add(function () {
          gsap.fromTo(sign.querySelector('.panel'), { y: -60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .28, ease: 'back.out(1.8)' });
          if (!t) gsap.fromTo(sign.querySelector('.posts'), { rotation: 0 }, { keyframes: [{ rotation: -1.2, duration: .05 }, { rotation: 1.2, duration: .07 }, { rotation: -.6, duration: .04 }, { rotation: 0, duration: .04 }], svgOrigin: '260 300', delay: .28 });
        });
      }
      function rest() { if (typeof lightTown === 'function') lightTown(null); draw('YOUR TOWN', 'Miami-Dade, Broward, Palm Beach', '104 municipalities', true); ans.textContent = ''; }
      rest();
      k.add(function () { sign.innerHTML = ''; root.querySelector('.tcx__all').innerHTML = ''; inp.value = ''; close(); gsap.set(opath, { clearProps: 'all' }); });
      EZ.reveal(k, root.querySelectorAll('.tcx__side > h2, .tcx__side > p'));
    } },

    /* slot 4 · Phase 5 new · The van route: the select lists all 104 under their counties; a pick lights the town,
       plots a road-like route (north-south first, then across) from the Miami office and drives the van along it */
    4: { init: function (root, k) {
      var D = geo(), svg = root.querySelector('.tdr__svg'), sel = root.querySelector('.tdr__sel'), ans = root.querySelector('.tdr__ans');
      var miami = D.towns['Miami-Dade'].filter(function (t) { return t[0] === 'Miami'; })[0], s = '', idx = [];
      ORDER.forEach(function (c) { s += '<path class="cty" d="' + D.counties[c] + '"/>'; var b = D.boxes[c]; s += '<text class="cl" x="' + f(b[0] + 30) + '" y="' + f(b[1] + 70) + '">' + c.toUpperCase() + '</text>'; });
      ORDER.forEach(function (c) { D.towns[c].forEach(function (t) { idx.push({ n: t[0], c: c, x: t[1], y: t[2] }); s += '<circle class="dot" cx="' + t[1] + '" cy="' + t[2] + '" r="11"/>'; }); });
      s += '<path class="route" d=""/>';
      s += '<rect class="office" x="-20" y="-20" width="40" height="40" transform="translate(' + miami[1] + ' ' + miami[2] + ') rotate(45)"/><text class="olbl" x="' + (miami[1] - 40) + '" y="' + (miami[2] + 80) + '" text-anchor="end">Our office</text>';
      s += '<g class="van" transform="translate(' + miami[1] + ' ' + miami[2] + ')"><rect class="van-b" x="-46" y="-34" width="64" height="40" rx="6"/><path class="van-b" d="M18 -24 H36 L46 -8 V6 H18 Z"/><path class="van-g" d="M22 -20 H34 L41 -8 H22 Z"/><circle class="van-w" cx="-28" cy="8" r="10"/><circle class="van-w" cx="30" cy="8" r="10"/></g>';
      svg.innerHTML = s;
      var dots = svg.querySelectorAll('.dot'), route = svg.querySelector('.route'), van = svg.querySelector('.van');
      sel.innerHTML = '<option value="">Choose your town</option>' + ORDER.map(function (c) {
        return '<optgroup label="' + c + ' (' + D.towns[c].length + ')">' + idx.map(function (t, i) { return t.c === c ? '<option value="' + i + '">' + esc(t.n) + '</option>' : ''; }).join('') + '</optgroup>';
      }).join('');
      function go() {
        dots.forEach(function (d) { d.classList.remove('is-on'); });
        if (sel.value === '') { route.setAttribute('d', ''); ans.textContent = ''; van.setAttribute('transform', 'translate(' + miami[1] + ' ' + miami[2] + ')'); return; }
        var t = idx[+sel.value]; dots[+sel.value].classList.add('is-on');
        ans.innerHTML = '<b>Yes, ' + esc(t.n) + '.</b>' + esc(t.c) + ' is one of our three counties, and ' + esc(t.n) + ' is on our list of 104.';
        var d = 'M' + miami[1] + ' ' + miami[2] + ' V' + t.y + ' H' + t.x;
        route.setAttribute('d', d);
        var L = route.getTotalLength(), p = { v: 0 };
        function place() { var pt = route.getPointAtLength(p.v * L); van.setAttribute('transform', 'translate(' + f(pt.x) + ' ' + f(pt.y) + ')'); }
        if (!k.motion || L < 1) { p.v = 1; place(); return; }
        k.ctx.add(function () {
          gsap.fromTo(route, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', overwrite: true });
          gsap.to(p, { v: 1, duration: 1.1, ease: 'power2.inOut', onUpdate: place, overwrite: true });
        });
      }
      k.on(sel, 'change', go);
      k.add(function () { svg.innerHTML = ''; sel.innerHTML = ''; ans.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.tdr__side > *'));
    } },

    /* slot 5 · Phase 5 new · The directory: one index tab per first letter that has towns; roving focus on the tabs
       (arrow keys, Home, End); the page shows the letter large and each town with its county */
    5: { init: function (root, k) {
      var D = geo(), tabs = root.querySelector('.taz__tabs'), list = root.querySelector('.taz__list'), big = root.querySelector('.taz__big');
      var all = [];
      ORDER.forEach(function (c) { D.towns[c].forEach(function (t) { all.push({ n: t[0], c: c }); }); });
      all.sort(function (a, b) { return a.n.localeCompare(b.n); });
      var L = []; all.forEach(function (t) { var l = norm(t.n).charAt(0).toUpperCase(); if (L.indexOf(l) < 0) L.push(l); });
      tabs.innerHTML = L.map(function (l, i) { return '<button type="button" class="taz__t" role="tab" id="taz-t-' + l + '" aria-controls="taz-page" aria-selected="' + (i ? 'false' : 'true') + '" tabindex="' + (i ? '-1' : '0') + '" data-l="' + l + '" data-rx="native:directory-tab">' + l + '</button>'; }).join('');
      var bt = Array.prototype.slice.call(tabs.querySelectorAll('.taz__t'));
      if (EZ.bindReactions) EZ.bindReactions(tabs, k);
      function pick(i, focus, anim) {
        bt.forEach(function (b, j) { b.setAttribute('aria-selected', j === i ? 'true' : 'false'); b.tabIndex = j === i ? 0 : -1; });
        var l = L[i], hit = all.filter(function (t) { return norm(t.n).charAt(0).toUpperCase() === l; });
        big.textContent = l;
        root.querySelector('.taz__page').setAttribute('aria-labelledby', 'taz-t-' + l);
        list.innerHTML = hit.map(function (t) { return '<li>' + esc(t.n) + '<span>' + t.c.replace('-', '&#8209;') + '</span></li>'; }).join('');
        if (focus) bt[i].focus();
        if (anim && k.motion) k.ctx.add(function () { gsap.from(list.children, { x: 12, autoAlpha: 0, duration: .22, ease: 'power2.out', stagger: .02 }); gsap.from(big, { y: -16, autoAlpha: 0, duration: .25, ease: 'back.out(2)' }); });
      }
      k.on(tabs, 'click', function (e) { var b = e.target.closest('.taz__t'); if (b) pick(bt.indexOf(b), false, true); });
      k.on(tabs, 'keydown', function (e) {
        var i = bt.indexOf(document.activeElement); if (i < 0) return;
        var n = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? bt.length - 1 : null;
        if (n === null) return; e.preventDefault(); pick((n + bt.length) % bt.length, true, true);
      });
      pick(0, false, false);
      k.add(function () { tabs.innerHTML = ''; list.innerHTML = ''; big.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.taz__head > *, .taz__book'));
    } },

    /* slot 6 · Phase 5 new · Cut to count: a shared 0-40 rule; each board is n units long (34, 31, 39), one notch per
       town in map order north to south; pointer or arrow keys walk the notches */
    6: { init: function (root, k) {
      var D = geo(), host = root.querySelector('.tlb__boards'), read = root.querySelector('.tlb__read'), rule = root.querySelector('.tlb__rule');
      var r = '<rect class="base" x="0" y="0" width="400" height="34"/>';
      for (var i = 0; i <= 40; i++) r += '<path class="tk" d="M' + i * 10 + ' 34 V' + (i % 10 ? (i % 5 ? 26 : 20) : 10) + '"/>' + (i % 10 ? '' : '<text x="' + (i * 10 + (i ? -14 : 3)) + '" y="9">' + i + '</text>');
      rule.innerHTML = r;
      host.innerHTML = ORDER.map(function (c) {
        var T = D.towns[c].slice().sort(function (a, b) { return a[2] - b[2]; }), n = T.length, w = n * 10, s = '';
        s += '<rect class="wood" x="0" y="4" width="' + w + '" height="32"/><path class="gr" d="M6 14 C' + w * .3 + ' 10 ' + w * .6 + ' 18 ' + (w - 6) + ' 13 M6 27 C' + w * .4 + ' 31 ' + w * .7 + ' 23 ' + (w - 6) + ' 28"/>';
        T.forEach(function (t, j) { s += '<path class="nt" d="M' + (j * 10 + 5) + ' 4 V16"/><rect class="hit" data-j="' + j + '" x="' + j * 10 + '" y="0" width="10" height="40"/>'; });
        s += '<rect class="end" x="' + (w - 3) + '" y="4" width="3" height="32"/>';
        return '<div class="tlb__row"><p class="tlb__name">' + c.replace('-', '&#8209;') + ' <b class="nums">' + n + '</b></p><svg class="tlb__board" viewBox="0 0 400 40" tabindex="0" role="slider" aria-label="' + c + ', ' + n + ' towns, one notch each; arrow keys read them" aria-valuemin="1" aria-valuemax="' + n + '" aria-valuenow="1" data-c="' + c + '" data-rx="native:board-notch">' + s + '</svg></div>';
      }).join('');
      lists(root.querySelector('.tlb__lists'));
      var boards = Array.prototype.slice.call(host.querySelectorAll('.tlb__board'));
      if (EZ.bindReactions) EZ.bindReactions(host, k);
      function T(c) { return D.towns[c].slice().sort(function (a, b) { return a[2] - b[2]; }); }
      function show(b, j) {
        var c = b.dataset.c, t = T(c)[j];
        host.querySelectorAll('.nt.is-on').forEach(function (n) { n.classList.remove('is-on'); });
        b.querySelectorAll('.nt')[j].classList.add('is-on');
        b.dataset.j = j; b.setAttribute('aria-valuenow', j + 1); b.setAttribute('aria-valuetext', t[0] + ', ' + (j + 1) + ' of ' + T(c).length + ' in ' + c);
        read.innerHTML = '<b>' + esc(t[0]) + '</b>' + c + ', notch ' + (j + 1) + ' of ' + T(c).length + ' (north to south)';
      }
      boards.forEach(function (b) {
        k.on(b, 'pointermove', function (e) { var h = e.target.closest('.hit'); if (h) show(b, +h.dataset.j); });
        k.on(b, 'focus', function () { show(b, +(b.dataset.j || 0)); });
        k.on(b, 'keydown', function (e) {
          var n = T(b.dataset.c).length, j = +(b.dataset.j || 0);
          var m = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? j + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? j - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : null;
          if (m === null) return; e.preventDefault(); show(b, EZ.clamp(m, 0, n - 1));
        });
      });
      k.add(function () { host.innerHTML = ''; rule.innerHTML = ''; root.querySelector('.tlb__lists').innerHTML = ''; read.textContent = 'Point at a notch to read its town.'; });
      EZ.reveal(k, root.querySelectorAll('.tlb__head > *'));
      // the boards are sawn to length from the left as they come into view
      if (k.motion) gsap.from(host.querySelectorAll('.wood, .gr, .end'), { scaleX: 0, transformOrigin: '0% 50%', duration: .7, ease: 'power3.out', stagger: .08, scrollTrigger: { trigger: host, start: 'top 85%', once: true } });
    } },

    /* slot 7 · Phase 5 new · North to south: the 104 sorted by map latitude; a county-line sign is posted where the road
       crosses into the next county; the readout names the sign nearest the middle of the view */
    7: { init: function (root, k) {
      var D = geo(), road = root.querySelector('.tns__road'), ol = root.querySelector('.tns__list'), at = root.querySelector('.tns__at');
      var all = [];
      ORDER.forEach(function (c) { D.towns[c].forEach(function (t) { all.push({ n: t[0], c: c, y: t[2] }); }); });
      all.sort(function (a, b) { return a.y - b.y; });
      var h = '', last = '';
      all.forEach(function (t, i) {
        if (t.c !== last) { h += '<li class="tns__p is-cty"><span class="tns__plate"><span>Entering</span><b>' + t.c.replace('-', '&#8209;') + ' County</b><span class="nums">' + D.towns[t.c].length + ' towns</span></span><span class="tns__post"></span></li>'; last = t.c; }
        h += '<li class="tns__p' + (t.n === 'Miami' ? ' is-hq' : '') + '" data-i="' + i + '"><span class="tns__plate"><b>' + esc(t.n) + '</b><span>' + (t.n === 'Miami' ? 'Our office' : t.c) + '</span></span><span class="tns__post"></span></li>';
      });
      ol.innerHTML = h;
      var posts = Array.prototype.slice.call(ol.querySelectorAll('.tns__p[data-i]'));
      function where() {
        var mid = road.getBoundingClientRect().left + road.clientWidth / 2, best = 0, bd = 1e9;
        posts.forEach(function (p, i) { var r = p.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = i; } });
        var t = all[best];
        at.innerHTML = '<b>' + esc(t.n) + '</b>, ' + t.c + ' &middot; stop ' + (best + 1) + ' of ' + all.length + ', north to south';
      }
      var pend = false;
      k.on(road, 'scroll', function () { if (!pend) { pend = true; requestAnimationFrame(function () { pend = false; where(); }); } }, { passive: true });
      function step(d) { road.scrollBy({ left: d * road.clientWidth * .8, behavior: k.motion ? 'smooth' : 'auto' }); }
      k.on(root.querySelector('.tns__prev'), 'click', function () { step(-1); });
      k.on(root.querySelector('.tns__next'), 'click', function () { step(1); });
      k.on(road, 'keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } });
      where();
      k.add(function () { ol.innerHTML = ''; at.textContent = ''; road.scrollLeft = 0; });
      EZ.reveal(k, root.querySelectorAll('.tns__head > *, .tns__bar'));
      if (k.motion) gsap.from(ol.querySelectorAll('.tns__plate'), { y: -30, autoAlpha: 0, duration: .4, ease: 'back.out(2)', stagger: .015, scrollTrigger: { trigger: road, start: 'top 85%', once: true } });
    } },

    /* slot 8 · Phase 5 new · The county panels: one panel open at a time (widens on desktop, unfolds on phones); the
       body shows the county outline from the map data, its towns as dots, and the town list */
    8: { init: function (root, k) {
      var D = geo(), row = root.querySelector('.tac__row');
      var miami = D.towns['Miami-Dade'].filter(function (t) { return t[0] === 'Miami'; })[0];
      row.innerHTML = ORDER.map(function (c, i) {
        var b = D.boxes[c], T = D.towns[c], id = 'tac-b-' + i;
        var dots = T.map(function (t) { return t[0] === 'Miami' ? '' : '<circle class="dot" cx="' + t[1] + '" cy="' + t[2] + '" r="9"/>'; }).join('');
        if (c === 'Miami-Dade') dots += '<rect class="hq" x="-18" y="-18" width="36" height="36" transform="translate(' + miami[1] + ' ' + miami[2] + ') rotate(45)"/>';
        return '<div class="tac__p' + (i ? '' : ' is-open') + '"><button type="button" class="tac__tab" aria-expanded="' + (i ? 'false' : 'true') + '" aria-controls="' + id + '" data-rx="native:county-open"><span class="tac__n nums">' + T.length + '</span><span class="tac__nm">' + c.replace('-', '&#8209;') + '</span></button>' +
          '<div class="tac__body" id="' + id + '"><svg class="tac__shape" viewBox="' + f(b[0] - 20) + ' ' + f(b[1] - 20) + ' ' + f(b[2] - b[0] + 40) + ' ' + f(b[3] - b[1] + 40) + '" aria-hidden="true" focusable="false"><path class="cty" d="' + D.counties[c] + '"/>' + dots + '</svg>' +
          '<ul class="tac__list" aria-label="' + T.length + ' municipalities in ' + c + '">' + T.map(function (t) { return '<li>' + esc(t[0]) + (t[0] === 'Miami' ? ' (our office)' : '') + '</li>'; }).join('') + '</ul></div></div>';
      }).join('');
      var P = Array.prototype.slice.call(row.querySelectorAll('.tac__p'));
      if (EZ.bindReactions) EZ.bindReactions(row, k);
      P.forEach(function (p) {
        k.on(p.querySelector('.tac__tab'), 'click', function () {
          if (p.classList.contains('is-open')) return;
          P.forEach(function (q) { var on = q === p; q.classList.toggle('is-open', on); q.querySelector('.tac__tab').setAttribute('aria-expanded', on ? 'true' : 'false'); });
          if (k.motion) k.ctx.add(function () { gsap.fromTo(p.querySelectorAll('.tac__shape .dot, .tac__shape .hq'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .3, ease: 'back.out(2.5)', stagger: .008, delay: .25 }); });
        });
      });
      k.add(function () { row.innerHTML = ''; });
      EZ.reveal(k, root.querySelectorAll('.tac__head > *, .tac__row'));
    } },

    /* slot 1 · AUDIT-01 winner (copied from v3; F9): clearing the field resets the sign and the live region, the list never
       covers Check it, the outline draws in 180ms, the sign swaps in 280ms and a miss shakes the posts once */
    b2: { init: function (root, k) {
      var D = geo(), form = root.querySelector('.tc__form'), inp = root.querySelector('.tc__in'), list = root.querySelector('.tc__list');
      var outline = root.querySelector('.tc__outline'), opath = outline.querySelector('path'), sign = root.querySelector('.tc__sign'), ans = root.querySelector('.tc__ans');
      lists(root.querySelector('.tc__all'));
      // the three counties behind the sign, every municipality a survey mark; a hit lights its mark (the map proves the answer)
      var map = root.querySelector('.tc__map');
      map.innerHTML = ORDER.map(function (c) { return '<path class="tc__cty" d="' + D.counties[c] + '"/>'; }).join('') +
        ORDER.map(function (c) { return D.towns[c].map(function (t) { return '<circle class="tc__dot" r="9" cx="' + t[1] + '" cy="' + t[2] + '" data-n="' + esc(t[0]) + '"/>'; }).join(''); }).join('');
      var dots = map.querySelectorAll('.tc__dot');
      function lightTown(n) { dots.forEach(function (c) { var on = c.getAttribute('data-n') === n; c.classList.toggle('is-on', on); if (on && k.motion) gsap.fromTo(c, { attr: { r: 40 } }, { attr: { r: 18 }, duration: .4, ease: 'power2.out' }); else c.setAttribute('r', on ? 18 : 9); }); }
      k.add(function () { map.innerHTML = ''; });
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
          '<g class="posts"><path d="M150 236V300M370 236V300" stroke="#C9C1B6" stroke-width="12"/><path d="M150 236V300M370 236V300" stroke="#121212" stroke-width="2" opacity=".3"/>' +
          '<g class="panel"><rect x="20" y="20" width="480" height="230" rx="18" fill="' + (yes === false ? '#FF5F00' : '#FF5F00') + '" stroke="#121212" stroke-width="3"/>' +
          '<rect x="32" y="32" width="456" height="206" rx="12" fill="none" stroke="' + (yes === false ? '#121212' : '#FFFFFF') + '" stroke-width="4"/>' +
          '<text x="260" y="' + (110 + fs * .1) + '" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-weight="700" font-size="' + fs + '" fill="' + (yes === false ? '#121212' : '#FFFFFF') + '">' + esc(main) + '</text>' +
          '<text x="260" y="160" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-weight="600" font-size="24" fill="' + (yes === false ? '#121212' : '#121212') + '">' + esc(sub) + '</text>' +
          '<text x="260" y="208" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-weight="700" font-size="26" fill="' + (yes === false ? '#121212' : '#FFFFFF') + '">' + esc(verdict) + '</text></g></g>';
      }
      function show(t, raw) {
        if (t) { lightTown(t.n); draw(t.n.toUpperCase(), t.c + ' County', 'We build here', true); ans.textContent = 'Yes. ' + t.n + ' is in ' + t.c + ' County, and Elbaz builds there.'; }
        else { draw('NOT ON OUR LIST', raw ? '“' + raw + '”' : '', 'Call (754) 236-0675 to ask', false); ans.textContent = (raw || 'That town') + ' is not one of the 104 municipalities on our list. Call (754) 236-0675 to ask.'; }
        if (k.motion) k.ctx.add(function () {
          gsap.fromTo(sign.querySelector('.panel'), { y: -60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .28, ease: 'back.out(1.8)' });
          if (!t) gsap.fromTo(sign.querySelector('.posts'), { rotation: 0 }, { keyframes: [{ rotation: -1.2, duration: .05 }, { rotation: 1.2, duration: .07 }, { rotation: -.6, duration: .04 }, { rotation: 0, duration: .04 }], svgOrigin: '260 300', delay: .28 });
        });
      }
      function rest() { if (typeof lightTown === 'function') lightTown(null); draw('YOUR TOWN', 'Miami-Dade, Broward, Palm Beach', '104 municipalities', true); ans.textContent = ''; }
      rest();
      k.add(function () { sign.innerHTML = ''; root.querySelector('.tc__all').innerHTML = ''; inp.value = ''; close(); gsap.set(opath, { clearProps: 'all' }); });
      EZ.reveal(k, root.querySelectorAll('.tc__side > h2, .tc__side > p'));
    } },

    /* v1 · The survey map [BANK Q576 For Living: the map answers on hover (desktop) and on tap (touch)] */
    b3: { init: function (root, k) {
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
    b4: { init: function (root, k) {
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
