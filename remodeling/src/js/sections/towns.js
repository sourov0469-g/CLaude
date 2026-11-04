/* FINALIZE · Home 9 · Towns (one version: mostly V4 + a little V1 and V2). The 104 municipalities as published (FACTS.md),
   placed by 2023 Census gazetteer points (data/southfl.json). Three ways to the same place, all equal: type it (a real
   combobox: arrow keys, Enter, Escape), point at a survey mark on the map (its name rises on a flag), or pick it from the
   list of all 104. Choosing a town plots the van's route from our office at 19 W Flagler St and the van drives it once
   (duration from the route's length, power2.inOut); the town's mark, name and county light. Guards (Bruno): one route at
   a time, a clear control, the van never leaves the drawn route, and a town we do not list gets an honest answer. */
(function () {
  var NS_ORDER = ['Palm Beach', 'Broward', 'Miami-Dade'];   // north to south, the way the map reads
  function geo() { return (window.__DATA || {}).southfl; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function f(n) { return Math.round(n * 10) / 10; }

  EZ.section('towns', { 
  /* NEW VERSIONS · V2 "The map table" (governing reference: Bruno Simon, the explorable world, scoped by the annex to this
     section). The counties lie on a tilted tabletop in perspective; one camera (translate + scale of the map inside the
     tilted table) is all that moves. Search (a real combobox), tap a mark, or arrow keys: the camera flies to the town and
     its pin rises with its name; the county lights. Drag pans (touch: sideways only, the page keeps its vertical scroll),
     +/- zoom, "Whole map". Pins stand up out of the table at a constant size. Guards: one pin at a time, no wheel capture,
     an honest answer for a town we do not list. Reduced motion: the camera cuts, nothing flies [S0062, S0089, S1018, S1443,
     S1209, S0400]. */
  1: { init: function (root, k) {
    var D = geo(), stage = root.querySelector('.tb__stage'), table = root.querySelector('.tb__table'), map = root.querySelector('.tb__map'),
      svg = root.querySelector('.tb__svg'), pins = root.querySelector('.tb__pins'), inp = root.querySelector('.tb__in'), opts = root.querySelector('.tb__opts'),
      ans = root.querySelector('.tb__ans'), clr = root.querySelector('.tb__clear');
    var T = [];
    NS_ORDER.forEach(function (c) { D.towns[c].slice().sort(function (a, b) { return a[2] - b[2]; }).forEach(function (t) { T.push({ n: t[0], c: c, x: t[1], y: t[2], k: norm(t[0]) }); }); });
    var office = D.towns['Miami-Dade'].filter(function (t) { return t[0] === 'Miami'; })[0];
    var s = '';
    NS_ORDER.forEach(function (c) { s += '<path class="cty" data-c="' + c + '" d="' + D.counties[c] + '"/>'; });
    NS_ORDER.forEach(function (c) { var b = D.boxes[c]; s += '<text class="cl" x="' + f(b[0] + 34) + '" y="' + f(b[1] + 96) + '">' + c.toUpperCase() + '</text>'; });
    T.forEach(function (t, i) { s += '<circle class="mk" data-i="' + i + '" data-c="' + t.c + '" data-n="' + esc(t.n) + '" cx="' + t.x + '" cy="' + t.y + '" r="14"/>'; });
    svg.innerHTML = s;
    function pin(cls, x, y, html) { return '<div class="tb__pin ' + cls + (x > 600 ? ' is-left' : '') + '" style="left:' + x + 'px;top:' + y + 'px"><div class="tb__up">' + html + '</div></div>'; }
    pins.innerHTML = pin('tb__pin--office', office[1], office[2], '<span class="tb__flag">Our office<small>19 W Flagler St</small></span><i class="tb__pole"></i>') +
      pin('tb__pin--town', 0, 0, '<span class="tb__flag"><b></b><small></small></span><i class="tb__pole"></i>') + pin('tb__pin--hover', 0, 0, '<span class="tb__flag"><b></b></span><i class="tb__pole"></i>');
    var marks = Array.prototype.slice.call(svg.querySelectorAll('.mk')), ctys = Array.prototype.slice.call(svg.querySelectorAll('.cty'));
    var pTown = pins.querySelector('.tb__pin--town'), pHover = pins.querySelector('.tb__pin--hover'), ups = Array.prototype.slice.call(pins.querySelectorAll('.tb__up'));
    k.add(function () { svg.innerHTML = ''; pins.innerHTML = ''; ans.innerHTML = ''; inp.value = ''; opts.hidden = true; opts.innerHTML = ''; clr.hidden = true; map.style.transform = ''; });

    /* ---------- the camera ---------- */
    var TILT = 54, cam = { cx: 500, cy: 1189, s: .3 }, W = 0, H = 0, s0 = .3, sMax = 1.15;
    function fit() {
      W = stage.clientWidth; H = stage.clientHeight; if (!W) return;
      var phone = W < 600;
      TILT = phone ? 46 : 54;
      stage.style.setProperty('--tilt', TILT + 'deg');
      s0 = Math.min(W * (phone ? .9 : .58) / 1000, H * (phone ? 1.38 : 1.42) / 2378);
      render();
    }
    function clampCam() {
      cam.s = Math.max(s0 * .9, Math.min(sMax, cam.s));
      cam.cx = Math.max(0, Math.min(1000, cam.cx)); cam.cy = Math.max(0, Math.min(2378, cam.cy));
    }
    function render() {
      clampCam();
      var tx = W / 2 - cam.cx * cam.s, ty = H * .5 - cam.cy * cam.s;
      map.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) scale(' + cam.s.toFixed(4) + ')';
      var inv = (1 / cam.s).toFixed(4);   // pins stand up at a constant size
      ups.forEach(function (u) { u.style.transform = 'scale(' + inv + ') rotateX(' + (-TILT) + 'deg)'; });
    }
    var fly = null;
    function goTo(cx, cy, sc, dur) {
      if (fly) fly.kill();
      if (!k.motion) { cam.cx = cx; cam.cy = cy; cam.s = sc; render(); return; }
      fly = gsap.to(cam, { cx: cx, cy: cy, s: sc, duration: dur || 1.1, ease: 'power3.inOut', onUpdate: render });
    }
    function whole(dur) { goTo(500, 1189, s0, dur); }
    k.ro(stage, function () { var was = cam.s <= s0 * 1.02; fit(); if (was) { cam.cx = 500; cam.cy = 1189; cam.s = s0; render(); } });
    fit(); cam.s = s0; render();

    /* ---------- choosing a town ---------- */
    var onI = -1;
    function select(i, from) {
      var t = T[i];
      if (onI > -1) marks[onI].classList.remove('is-on');
      onI = i; marks[i].classList.add('is-on');
      ctys.forEach(function (c) { c.classList.toggle('is-on', c.dataset.c === t.c); });
      pTown.style.left = t.x + 'px'; pTown.style.top = t.y + 'px'; pTown.classList.toggle('is-left', t.x > 600);   // flags near the coast open inland
      pTown.querySelector('b').textContent = t.n; pTown.querySelector('small').textContent = t.c;
      pTown.classList.remove('is-up'); void pTown.offsetWidth; pTown.classList.add('is-up');
      pHover.classList.remove('is-up');
      if (from !== 'input') inp.value = t.n;
      clr.hidden = false; close();
      ans.innerHTML = '<b>Yes, ' + esc(t.n) + '.</b> ' + esc(t.n) + ' is one of the <span class="nums">' + D.towns[t.c].length + '</span> municipalities we build in across ' + esc(t.c) + ', one of our three counties.';
      goTo(t.x, t.y, Math.min(sMax, Math.max(s0 * 2.8, .56)));
    }
    function clear() {
      if (onI > -1) marks[onI].classList.remove('is-on'); onI = -1;
      ctys.forEach(function (c) { c.classList.remove('is-on'); });
      pTown.classList.remove('is-up'); inp.value = ''; clr.hidden = true; ans.innerHTML = ''; close(); whole(); inp.focus();
    }
    k.on(clr, 'click', clear);

    /* ---------- the combobox (as V1: arrows, Enter, Escape; an honest answer when we do not list a town) ---------- */
    var found = [], act = -1;
    function close() { opts.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); act = -1; }
    function renderOpts() {
      opts.innerHTML = found.map(function (i, j) { return '<li class="tb__opt" role="option" id="tb-o-' + j + '" data-i="' + i + '" aria-selected="' + (j === act ? 'true' : 'false') + '">' + esc(T[i].n) + '<span>' + esc(T[i].c) + '</span></li>'; }).join('');
      opts.hidden = !found.length; inp.setAttribute('aria-expanded', found.length ? 'true' : 'false');
      if (act > -1) inp.setAttribute('aria-activedescendant', 'tb-o-' + act); else inp.removeAttribute('aria-activedescendant');
    }
    function search() {
      var q = norm(inp.value); act = -1; clr.hidden = !inp.value;
      if (!q) { found = []; renderOpts(); return; }
      var a = [], b = [];
      T.forEach(function (t, i) { if (t.k.indexOf(q) === 0) a.push(i); else if (t.k.indexOf(' ' + q) > -1 || t.k.indexOf(q) > 0) b.push(i); });
      found = a.concat(b).slice(0, 6); renderOpts();
    }
    function commit() {
      if (act > -1) { select(found[act], 'list'); return; }
      var q = norm(inp.value); if (!q) return;
      var exact = T.findIndex(function (t) { return t.k === q; });
      if (exact > -1) { select(exact, 'input'); return; }
      if (found.length === 1) { select(found[0], 'list'); return; }
      close();
      // nothing on the map stays lit beside a "not on our list" answer: the table goes back to the whole map
      if (onI > -1) marks[onI].classList.remove('is-on'); onI = -1;
      ctys.forEach(function (c) { c.classList.remove('is-on'); }); pTown.classList.remove('is-up'); whole(.8);
      ans.innerHTML = '<b>Not on our published list.</b> We do not see &ldquo;' + esc(inp.value.trim()) + '&rdquo; among the <span class="nums">104</span> municipalities we list. Call <a class="link nums" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>: you will get a real answer, not a callback form.';
    }
    k.on(inp, 'input', search);
    k.on(inp, 'keydown', function (e) {
      if (e.key === 'ArrowDown' && found.length) { e.preventDefault(); act = (act + 1) % found.length; renderOpts(); }
      else if (e.key === 'ArrowUp' && found.length) { e.preventDefault(); act = (act - 1 + found.length) % found.length; renderOpts(); }
      else if (e.key === 'Enter') { e.preventDefault(); commit(); }
      else if (e.key === 'Escape') { if (!opts.hidden) { e.preventDefault(); close(); } }
    });
    k.on(opts, 'pointerdown', function (e) { var li = e.target.closest('.tb__opt'); if (li) { e.preventDefault(); select(+li.dataset.i, 'list'); } });
    k.on(inp, 'blur', function () { k.timeout(close, 120); });
    // DEEP QA rule kept: on phones the field rises when tapped, so its suggestions have room above the keyboard
    k.on(inp, 'focus', function () {
      if (innerWidth > 767) return;
      k.timeout(function () { var r = inp.getBoundingClientRect(), nav = (document.querySelector('.nav') || { offsetHeight: 64 }).offsetHeight; if (r.top > nav + 120) window.scrollTo({ top: scrollY + r.top - nav - 16, behavior: 'auto' }); }, 250);
    });

    /* ---------- the table by hand: marks under the pointer, drag, zoom, keys ---------- */
    function nearest(x, y, reach) {   // marks are measured where the browser drew them (3D included)
      var best = -1, bd = reach * reach;
      marks.forEach(function (m, i) { var r = m.getBoundingClientRect(), dx = r.left + r.width / 2 - x, dy = r.top + r.height / 2 - y, q = dx * dx + dy * dy; if (q < bd) { bd = q; best = i; } });
      return best;
    }
    var hovI = -1;
    function hover(i) {
      if (i === hovI) return; hovI = i;
      if (i < 0 || i === onI) { pHover.classList.remove('is-up'); return; }
      var t = T[i]; pHover.style.left = t.x + 'px'; pHover.style.top = t.y + 'px'; pHover.classList.toggle('is-left', t.x > 600); pHover.querySelector('b').textContent = t.n; pHover.classList.add('is-up');
    }
    var drag = null;
    function inUi(e) { return e.target.closest('.tb__panel, .tb__ctl'); }
    k.on(stage, 'pointerdown', function (e) {
      if (inUi(e) || e.button > 0) return;
      drag = { x: e.clientX, y: e.clientY, cx: cam.cx, cy: cam.cy, moved: false, t: e.pointerType };
      if (fly) fly.kill();
    });
    k.on(window, 'pointermove', function (e) {
      if (drag) {
        var dx = e.clientX - drag.x, dy = drag.t === 'mouse' ? e.clientY - drag.y : 0;
        if (Math.abs(dx) + Math.abs(dy) > 5) { drag.moved = true; stage.classList.add('is-drag'); }
        if (drag.moved) { cam.cx = drag.cx - dx / cam.s; cam.cy = drag.cy - dy / (cam.s * Math.cos(TILT * Math.PI / 180)); render(); }
      } else if (e.pointerType === 'mouse' && stage.contains(e.target) && !inUi(e)) hover(nearest(e.clientX, e.clientY, 28));
    });
    k.on(window, 'pointerup', function (e) {
      if (!drag) return; var d = drag; drag = null; stage.classList.remove('is-drag');
      if (!d.moved && !inUi(e)) { var i = nearest(e.clientX, e.clientY, d.t === 'mouse' ? 28 : 34); if (i > -1) select(i, 'map'); }
    });
    k.on(stage, 'pointerleave', function () { hover(-1); });
    function zoom(d) { goTo(cam.cx, cam.cy, cam.s * (d > 0 ? 1.6 : 1 / 1.6), .5); }
    root.querySelectorAll('.tb__z').forEach(function (b) { k.on(b, 'click', function () { zoom(+b.dataset.z); }); });
    k.on(root.querySelector('.tb__all'), 'click', function () { whole(.9); });
    k.on(stage, 'keydown', function (e) {
      if (e.target !== stage) return;
      var step = 120 / cam.s * .5, m = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (m) { e.preventDefault(); goTo(cam.cx + m[0], cam.cy + m[1], cam.s, .3); }
      else if (e.key === '+' || e.key === '=') { e.preventDefault(); zoom(1); }
      else if (e.key === '-' || e.key === '_') { e.preventDefault(); zoom(-1); }
      else if (e.key === '0' || e.key === 'Home') { e.preventDefault(); whole(.6); }
    });
    EZ.reveal(k, root.querySelectorAll('.tb__head > *, .tb__foot'));
    if (!k.motion) return;
    // arriving: the table settles from flat to its tilt as the stage comes into view
    var st = ScrollTrigger.create({ trigger: stage, start: 'top 80%', once: true, onEnter: function () { gsap.fromTo(table, { rotationX: 0 }, { rotationX: TILT, duration: 1.2, ease: 'power3.inOut', clearProps: 'transform' }); } });
    k.add(function () { st.kill(); if (fly) fly.kill(); });
  } }
  });
})();
