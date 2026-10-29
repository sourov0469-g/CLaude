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
    /* v1 · The survey [BANK For Living + BANK KBF] */
    1: { init: function (root, k) {
      var D = geo(), svg = root.querySelector('.towns1__svg'), legend = root.querySelector('.towns1__legend');
      var tabs = Array.prototype.slice.call(root.querySelectorAll('.towns1__tab'));
      var miami = D.towns['Miami-Dade'].filter(function (t) { return t[0] === 'Miami'; })[0];
      var s = '';
      ORDER.forEach(function (c) {
        var b = D.boxes[c];
        s += '<path class="cty-off" d="' + D.counties[c] + '" transform="translate(10 10)"/><path class="cty" data-c="' + c + '" d="' + D.counties[c] + '"/>';
        s += '<text class="clbl" x="' + f((b[0] + b[2]) / 2 - 120) + '" y="' + f((b[1] + b[3]) / 2) + '">' + c.toUpperCase() + '</text>';
      });
      ORDER.forEach(function (c) { D.towns[c].forEach(function (t) { s += '<circle class="dot" cx="' + t[1] + '" cy="' + t[2] + '" r="6"/>'; }); });
      s += '<g class="pins"></g>';
      if (miami) s += '<g class="off"><rect class="office" x="' + (miami[1] - 12) + '" y="' + (miami[2] - 12) + '" width="24" height="24" transform="rotate(45 ' + miami[1] + ' ' + miami[2] + ')"/><text class="olbl" x="' + (miami[1] - 30) + '" y="' + (miami[2] + 8) + '" text-anchor="end">Our office</text></g>';
      svg.innerHTML = s;
      var pinsG = svg.querySelector('.pins'), paths = Array.prototype.slice.call(svg.querySelectorAll('.cty'));
      k.add(function () { svg.innerHTML = ''; legend.innerHTML = ''; });
      var cur = null;
      function vb(c) { var b = D.boxes[c], pad = 120; return (b[0] - pad) + ' ' + (b[1] - pad) + ' ' + (b[2] - b[0] + pad * 2) + ' ' + (b[3] - b[1] + pad * 2); }
      function select(c, focus) {
        if (c === cur) return;
        cur = c;
        tabs.forEach(function (t) { var on = t.dataset.c === c; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
        paths.forEach(function (p) { p.classList.toggle('is-on', p.dataset.c === c); });
        var towns = D.towns[c];
        legend.innerHTML = '<p>' + c.replace('-', '&#8209;') + ' &middot; <span class="nums">' + towns.length + '</span> municipalities</p><div class="towns1__cols">' + towns.map(function (t, i) { return '<span data-i="' + i + '">' + esc(t[0]) + '</span>'; }).join('') + '</div>';
        var sc = (D.boxes[c][3] - D.boxes[c][1]) / 900;
        pinsG.innerHTML = towns.map(function (t) {
          return '<g class="pin" transform="translate(' + t[1] + ' ' + t[2] + ') scale(' + f(sc * 1.6) + ')"><g class="pi"><path d="M0 0C-2 -8 -9 -12 -9 -19a9 9 0 0 1 18 0C9 -12 2 -8 0 0Z"/><circle cy="-19" r="3.4"/></g></g>';
        }).join('');
        if (k.motion) {
          k.ctx.add(function () {
            gsap.to(svg, { attr: { viewBox: vb(c) }, duration: .6, ease: 'power3.inOut', overwrite: 'auto' });
            gsap.fromTo(pinsG.querySelectorAll('.pi'), { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .3, ease: 'back.out(2)', stagger: { each: .012, from: 'random' }, delay: .35 });
          });
        } else svg.setAttribute('viewBox', vb(c));
      }
      tabs.forEach(function (t, i) {
        k.on(t, 'click', function () { select(t.dataset.c); });
        k.on(t, 'keydown', function (e) {
          var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
          if (d) { e.preventDefault(); select(tabs[(i + d + 3) % 3].dataset.c, true); }
        });
      });
      paths.forEach(function (p) {
        k.on(p, 'click', function () { select(p.dataset.c); });
        k.on(p, 'pointerenter', function (e) { if (e.pointerType === 'mouse') select(p.dataset.c); });
      });
      k.on(legend, 'pointerover', function (e) {
        var sp = e.target.closest('span[data-i]');
        legend.querySelectorAll('.is-hl').forEach(function (x) { x.classList.remove('is-hl'); });
        if (!sp) return;
        sp.classList.add('is-hl');
        var pi = pinsG.querySelectorAll('.pi')[+sp.dataset.i];
        if (pi && k.motion) gsap.fromTo(pi, { scale: 1.8, transformOrigin: '50% 100%' }, { scale: 1, duration: .4, ease: 'elastic.out(1,.4)' });
      });
      svg.setAttribute('viewBox', '0 0 ' + D.w + ' ' + D.h);
      select('Miami-Dade');
      EZ.reveal(k, root.querySelectorAll('.towns1__side > h2, .towns1__side > p'));
    } },

    /* v2 · Around the office [S0717] */
    2: { init: function (root, k) {
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
    3: { init: function (root, k) {
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
