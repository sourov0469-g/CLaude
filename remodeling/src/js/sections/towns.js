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

  EZ.section('towns', { 1: { init: function (root, k) {
    var D = geo(), svg = root.querySelector('.tw__svg'), all = root.querySelector('.tw__all');
    var inp = root.querySelector('.tw__in'), opts = root.querySelector('.tw__opts'), ans = root.querySelector('.tw__ans'), clr = root.querySelector('.tw__clear');
    // DEEP QA · phones: the field rises near the top when tapped, so its suggestions have room above the keyboard and call bar
    k.on(inp, 'focus', function () {
      if (innerWidth > 767) return;
      k.timeout(function () { var r = inp.getBoundingClientRect(), nav = (document.querySelector('.nav') || { offsetHeight: 64 }).offsetHeight; if (r.top > nav + 120) window.scrollTo({ top: scrollY + r.top - nav - 16, behavior: 'auto' }); }, 250);
    });
    var T = [];
    NS_ORDER.forEach(function (c) { D.towns[c].slice().sort(function (a, b) { return a[2] - b[2]; }).forEach(function (t) { T.push({ n: t[0], c: c, x: t[1], y: t[2], k: norm(t[0]) }); }); });
    var office = D.towns['Miami-Dade'].filter(function (t) { return t[0] === 'Miami'; })[0], ox = office[1], oy = office[2];

    // ---- the map ----
    var s = '';
    NS_ORDER.forEach(function (c) { s += '<path class="cty" data-c="' + c + '" d="' + D.counties[c] + '"/>'; });
    NS_ORDER.forEach(function (c) { var b = D.boxes[c]; s += '<text class="cl" x="' + f(b[0] + 34) + '" y="' + f(b[1] + 84) + '">' + c.toUpperCase() + '</text>'; });
    s += '<path class="route" d=""/>';
    T.forEach(function (t, i) { s += '<circle class="mk" data-i="' + i + '" cx="' + t.x + '" cy="' + t.y + '" r="13"/>'; });
    s += '<rect class="office" x="-22" y="-22" width="44" height="44" transform="translate(' + ox + ' ' + oy + ') rotate(45)"/><text class="olbl" x="' + (ox + 48) + '" y="' + (oy + 70) + '">Our office</text>';
    s += '<g class="van" transform="translate(' + ox + ' ' + oy + ')"><g class="van-in"><rect class="van-b" x="-50" y="-40" width="70" height="44" rx="6"/><path class="van-b" d="M20 -30 H40 L52 -12 V4 H20 Z"/><path class="van-g" d="M25 -25 H37 L45 -12 H25 Z"/><rect class="van-s" x="-44" y="-22" width="58" height="9"/><circle class="van-w" cx="-30" cy="6" r="11"/><circle class="van-w" cx="34" cy="6" r="11"/></g></g>';
    s += '<g class="flag" visibility="hidden"><path d="M0 0 V-70"/><rect x="0" y="-140" height="72" rx="6" width="200"/><text x="18" y="-88"></text></g>';
    svg.innerHTML = s;
    var marks = Array.prototype.slice.call(svg.querySelectorAll('.mk')), ctys = svg.querySelectorAll('.cty'), route = svg.querySelector('.route');
    var van = svg.querySelector('.van'), vanIn = svg.querySelector('.van-in'), flag = svg.querySelector('.flag'), flagR = flag.querySelector('rect'), flagT = flag.querySelector('text');

    // ---- all 104, at once ----
    all.innerHTML = NS_ORDER.map(function (c) {
      var list = T.map(function (t, i) { return t.c === c ? '<li><button type="button" class="tw__t" data-i="' + i + '" tabindex="-1">' + esc(t.n) + '</button></li>' : ''; }).join('');
      // OWNER: 104 names at once was too much. Each county is a tile (its count, its name); opening it lists its towns
      return '<div class="tw__c" data-c="' + c + '"><button type="button" class="tw__cb" aria-expanded="false"><span class="tw__cc nums">' + D.towns[c].length + '</span><span class="tw__cn">' + c.replace('-', '&#8209;') + '</span><span class="tw__cl">municipalities</span><svg class="tw__chev" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 6 L8 10 L12 6"/></svg></button><ul class="tw__ul" aria-label="' + c + ' municipalities" hidden>' + list + '</ul></div>';
    }).join('');
    all.querySelectorAll('.tw__cb').forEach(function (b) {
      var box = b.parentNode, ul = box.querySelector('.tw__ul'), c = box.dataset.c;
      function lit(on) { ctys.forEach(function (x) { x.classList.toggle('is-hot', on && x.dataset.c === c); }); }
      k.on(b, 'click', function () { var open = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', open ? 'true' : 'false'); ul.hidden = !open; box.classList.toggle('is-open', open);
        ul.querySelectorAll('.tw__t').forEach(function (t) { t.tabIndex = open ? 0 : -1; }); });
      k.on(b, 'pointerenter', function () { lit(true); }); k.on(b, 'pointerleave', function () { lit(false); });
      k.on(b, 'focus', function () { lit(true); }); k.on(b, 'blur', function () { lit(false); });
    });
    var names = Array.prototype.slice.call(all.querySelectorAll('.tw__t'));
    k.add(function () { svg.innerHTML = ''; all.innerHTML = ''; ans.innerHTML = ''; inp.value = ''; opts.hidden = true; opts.innerHTML = ''; clr.hidden = true; });

    var hotI = -1, onI = -1;
    function hot(i) {
      if (i === hotI) return;
      if (hotI > -1) { marks[hotI].classList.remove('is-hot'); names[hotI].classList.remove('is-hot'); }
      hotI = i;
      if (i < 0) { flag.setAttribute('visibility', onI > -1 ? 'visible' : 'hidden'); if (onI > -1) place(onI); return; }
      marks[i].classList.add('is-hot'); names[i].classList.add('is-hot');
      place(i); flag.setAttribute('visibility', 'visible');
    }
    function place(i) {   // the survey flag: the name on a board above the mark, kept inside the map
      var t = T[i]; flagT.textContent = t.n;
      var w = Math.max(160, flagT.getComputedTextLength() + 36), left = t.x + w > 1000;
      flagR.setAttribute('width', f(w)); flagR.setAttribute('x', left ? f(-w) : 0); flagT.setAttribute('x', left ? f(-w + 18) : 18);
      flag.setAttribute('transform', 'translate(' + t.x + ' ' + Math.max(150, t.y) + ')');
    }
    var drive = null;
    function select(i, from) {
      var t = T[i];
      if (onI > -1) { marks[onI].classList.remove('is-on'); names[onI].classList.remove('is-on'); }
      onI = i; marks[i].classList.add('is-on'); names[i].classList.add('is-on');
      ctys.forEach(function (c) { c.classList.toggle('is-on', c.dataset.c === t.c); });
      if (from !== 'input') inp.value = t.n;
      clr.hidden = false; close();
      ans.innerHTML = '<b>Yes, ' + esc(t.n) + '.</b>' + esc(t.n) + ' is one of the <span class="nums">' + D.towns[t.c].length + '</span> municipalities we build in across ' + esc(t.c) + ', one of our three counties.';
      ans.insertAdjacentHTML('beforeend', '<button type="button" class="tw__show" data-i="' + i + '">See the route on the map</button>');
      place(i); flag.setAttribute('visibility', 'visible');
      // the route: down (or up) from the office, one rounded corner, then across to the town
      var dy = t.y - oy, dx = t.x - ox, rr = Math.min(60, Math.abs(dy) / 2, Math.abs(dx) / 2), sy = dy < 0 ? -1 : 1, sx = dx < 0 ? -1 : 1;
      var d = Math.abs(dx) < 2 || Math.abs(dy) < 2 ? 'M' + ox + ' ' + oy + 'L' + t.x + ' ' + t.y
        : 'M' + ox + ' ' + oy + 'V' + f(t.y - sy * rr) + 'Q' + ox + ' ' + t.y + ' ' + f(ox + sx * rr) + ' ' + t.y + 'H' + t.x;
      route.setAttribute('d', d);
      vanIn.setAttribute('transform', sx < 0 ? 'scale(-1 1)' : '');
      var L = route.getTotalLength(), p = { v: 0 };
      function at() { var pt = route.getPointAtLength(p.v * L); van.setAttribute('transform', 'translate(' + f(pt.x) + ' ' + f(pt.y) + ')'); }
      if (drive) drive.kill();
      if (!k.motion || L < 2) { gsap.set(route, { drawSVG: '100%' }); p.v = 1; at(); return; }
      var dur = EZ.clamp(L / 1300, .7, 1.6);
      drive = gsap.timeline()
        .fromTo(route, { drawSVG: '0%' }, { drawSVG: '100%', duration: dur, ease: 'power2.inOut' }, 0)
        .to(p, { v: 1, duration: dur, ease: 'power2.inOut', onUpdate: at }, 0);
    }
    function clear() {
      if (drive) drive.kill();
      if (onI > -1) { marks[onI].classList.remove('is-on'); names[onI].classList.remove('is-on'); }
      onI = -1; hot(-1); flag.setAttribute('visibility', 'hidden');
      ctys.forEach(function (c) { c.classList.remove('is-on'); });
      route.setAttribute('d', ''); van.setAttribute('transform', 'translate(' + ox + ' ' + oy + ')'); vanIn.removeAttribute('transform');
      inp.value = ''; clr.hidden = true; ans.innerHTML = ''; close(); inp.focus();
    }
    k.on(clr, 'click', clear);
    // phones: the map sits below the answer, so the answer offers the route; going there replays the drive in view
    k.on(ans, 'click', function (e) {
      var bt = e.target.closest('.tw__show'); if (!bt) return;
      var mp = root.querySelector('.tw__map'), i = +bt.dataset.i;
      if (EZ.scrollTo) EZ.scrollTo(mp); else mp.scrollIntoView();
      k.timeout(function () { onI = -1; select(i, 'map'); }, k.motion ? 700 : 0);
    });

    // map: the nearest mark within reach answers the pointer
    function nearest(e) {
      var m = svg.getScreenCTM(); if (!m) return -1;
      var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; pt = pt.matrixTransform(m.inverse());
      var best = -1, bd = 70 * 70;
      T.forEach(function (t, i) { var q = (t.x - pt.x) * (t.x - pt.x) + (t.y - pt.y) * (t.y - pt.y); if (q < bd) { bd = q; best = i; } });
      return best;
    }
    k.on(svg, 'pointermove', function (e) { hot(nearest(e)); });
    k.on(svg, 'pointerleave', function () { hot(-1); });
    k.on(svg, 'click', function (e) { var i = nearest(e); if (i > -1) select(i, 'map'); });
    k.on(all, 'pointerover', function (e) { var b = e.target.closest('.tw__t'); hot(b ? +b.dataset.i : -1); });
    k.on(all, 'pointerleave', function () { hot(-1); });
    k.on(all, 'click', function (e) { var b = e.target.closest('.tw__t'); if (b) select(+b.dataset.i, 'list'); });

    // the combobox
    var found = [], act = -1;
    function close() { opts.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); act = -1; }
    function render() {
      opts.innerHTML = found.map(function (i, j) { return '<li class="tw__opt" role="option" id="tw-o-' + j + '" data-i="' + i + '" aria-selected="' + (j === act ? 'true' : 'false') + '">' + esc(T[i].n) + '<span>' + esc(T[i].c) + '</span></li>'; }).join('');
      opts.hidden = !found.length; inp.setAttribute('aria-expanded', found.length ? 'true' : 'false');
      if (act > -1) inp.setAttribute('aria-activedescendant', 'tw-o-' + act); else inp.removeAttribute('aria-activedescendant');
    }
    function search() {
      var q = norm(inp.value); act = -1; clr.hidden = !inp.value;
      if (!q) { found = []; render(); return; }
      var a = [], b = [];
      T.forEach(function (t, i) { if (t.k.indexOf(q) === 0) a.push(i); else if (t.k.indexOf(q) > 0) b.push(i); });
      found = a.concat(b).slice(0, 8); render();
      if (found.length) { hot(found[0]); }
    }
    function noMatch() {
      ans.innerHTML = '<b>Not on our published list.</b>We do not see &ldquo;' + esc(inp.value.trim()) + '&rdquo; among the <span class="nums">104</span> municipalities we list. Call <a class="link nums" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>: you will get a real answer, not a callback form.';
    }
    k.on(inp, 'input', search);
    k.on(inp, 'keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!found.length) return; e.preventDefault();
        act = (act + (e.key === 'ArrowDown' ? 1 : -1) + found.length) % found.length; render(); hot(found[act]);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        var q = norm(inp.value); if (!q) return;
        var exact = T.findIndex(function (t) { return t.k === q; });
        if (act > -1) select(found[act], 'opt'); else if (exact > -1) select(exact, 'opt'); else if (found.length === 1) select(found[0], 'opt'); else if (!found.length) { close(); noMatch(); }
      } else if (e.key === 'Escape') {
        if (!opts.hidden) { e.preventDefault(); close(); } else if (inp.value) { e.preventDefault(); clear(); }
      }
    });
    k.on(inp, 'blur', function () { k.timeout(close, 150); });
    k.on(opts, 'mousedown', function (e) { e.preventDefault(); });
    k.on(opts, 'click', function (e) { var o = e.target.closest('.tw__opt'); if (o) select(+o.dataset.i, 'opt'); });

    EZ.reveal(k, root.querySelectorAll('.tw__side > *'));
    // the pins land, north to south, as the map arrives
    if (k.motion) {
      gsap.set(marks, { attr: { r: 0 } });
      var land = ScrollTrigger.create({ trigger: root.querySelector('.tw__map'), start: 'top 80%', once: true, onEnter: function () {
        gsap.to(marks, { attr: { r: 13 }, duration: .35, ease: 'power4.out', stagger: { amount: .8 } });
      } });
      k.add(function () { land.kill(); if (drive) drive.kill(); });
    }
  } },

  /* NEW VERSIONS · V2 "The map table" (governing reference: Bruno Simon, the explorable world, scoped by the annex to this
     section). The counties lie on a tilted tabletop in perspective; one camera (translate + scale of the map inside the
     tilted table) is all that moves. Search (a real combobox), tap a mark, or arrow keys: the camera flies to the town and
     its pin rises with its name; the county lights. Drag pans (touch: sideways only, the page keeps its vertical scroll),
     +/- zoom, "Whole map". Pins stand up out of the table at a constant size. Guards: one pin at a time, no wheel capture,
     an honest answer for a town we do not list. Reduced motion: the camera cuts, nothing flies [S0062, S0089, S1018, S1443,
     S1209, S0400]. */
  2: { init: function (root, k) {
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
  } },
  /* NEW VERSIONS · V3 "104 threads" (governing reference: Lusion, flow maps). Each municipality is tied to our office by
     a thread; a choice pulls its thread bright and sends a pulse out to it; a county lights its threads. The map turns
     on wide screens (north to the right). Flow only on an answer, never continuous [S0062, S0083, S1018]. */
  3: { init: function (root, k) {
    var D = geo(), mapEl = root.querySelector('.ft__map'), frame = root.querySelector('.ft__frame'), svg = root.querySelector('.ft__svg'), geoG = root.querySelector('.ft__geo'),
      labels = root.querySelector('.ft__labels'), ctyEl = root.querySelector('.ft__counties');
    var inp = root.querySelector('.ft__in'), opts = root.querySelector('.ft__opts'), ans = root.querySelector('.ft__ans'), clr = root.querySelector('.ft__clear');
    var T = [];
    NS_ORDER.forEach(function (c) { D.towns[c].slice().sort(function (a, b) { return a[2] - b[2]; }).forEach(function (t) { T.push({ n: t[0], c: c, x: t[1], y: t[2], k: norm(t[0]) }); }); });
    var office = D.towns['Miami-Dade'].filter(function (t) { return t[0] === 'Miami'; })[0], ox = office[1], oy = office[2];

    // ---- the threads: from the office, arcing out to sea (east) and back to each town ----
    function thread(t) {
      var dx = t.x - ox, dy = t.y - oy, L = Math.sqrt(dx * dx + dy * dy) || 1, px = -dy / L, py = dx / L;
      if (px < 0) { px = -px; py = -py; }
      var b = Math.min(260, L * .2), cx = (ox + t.x) / 2 + px * b, cy = (oy + t.y) / 2 + py * b;
      return 'M' + f(ox) + ' ' + f(oy) + 'Q' + f(cx) + ' ' + f(cy) + ' ' + f(t.x) + ' ' + f(t.y);
    }
    var s = '';
    NS_ORDER.forEach(function (c) { s += '<path class="cty" data-c="' + c + '" d="' + D.counties[c] + '"/>'; });
    T.forEach(function (t, i) { s += '<path class="th" data-i="' + i + '" data-c="' + t.c + '" d="' + thread(t) + '"/>'; });
    T.forEach(function (t, i) { s += '<circle class="mk" data-i="' + i + '" data-c="' + t.c + '" data-n="' + esc(t.n) + '" cx="' + t.x + '" cy="' + t.y + '" r="9"/>'; });
    s += '<circle class="ft__pulse" r="16" cx="' + ox + '" cy="' + oy + '" opacity="0"/>';
    s += '<rect class="office" x="-20" y="-20" width="40" height="40" transform="translate(' + ox + ' ' + oy + ') rotate(45)"/>';
    geoG.innerHTML = s;
    var ths = Array.prototype.slice.call(geoG.querySelectorAll('.th')), marks = Array.prototype.slice.call(geoG.querySelectorAll('.mk')), ctys = geoG.querySelectorAll('.cty'), pulse = geoG.querySelector('.ft__pulse');
    labels.innerHTML = NS_ORDER.map(function (c) { return '<span class="ft__cl" data-c="' + c + '">' + c + '</span>'; }).join('') +
      '<span class="ft__ol"><b>Our office</b>19 W Flagler St</span><span class="ft__flag ft__flag--on"><b></b><small></small></span><span class="ft__flag ft__flag--hov"><b></b></span>' +
      '<span class="ft__north"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3 L12 21 M12 3 L7 9 M12 3 L17 9"/></svg>North</span>';
    var cls = Array.prototype.slice.call(labels.querySelectorAll('.ft__cl')), ol = labels.querySelector('.ft__ol'), fOn = labels.querySelector('.ft__flag--on'), fHov = labels.querySelector('.ft__flag--hov'), north = labels.querySelector('.ft__north');
    ctyEl.innerHTML = NS_ORDER.slice().reverse().map(function (c) { return '<button type="button" class="ft__cb" data-c="' + c + '" aria-pressed="false"><span class="ft__cn">' + c.replace('-', '&#8209;') + '</span><span class="ft__cc nums">' + D.towns[c].length + '</span></button>'; }).join('');
    var cbs = Array.prototype.slice.call(ctyEl.children);
    k.add(function () { geoG.innerHTML = ''; labels.innerHTML = ''; ctyEl.innerHTML = ''; ans.innerHTML = ''; inp.value = ''; opts.hidden = true; opts.innerHTML = ''; clr.hidden = true; });

    /* ---------- orientation: the coast across the page on wide screens, upright on narrow ones ---------- */
    var H = false, VW = 1000, VH = 2378;
    function P(x, y) { return H ? [D.h - y, x] : [x, y]; }
    function at(el, x, y) { var p = P(x, y); el.style.left = (p[0] / VW * 100).toFixed(3) + '%'; el.style.top = (p[1] / VH * 100).toFixed(3) + '%'; el.classList.toggle('is-r', p[0] / VW > .8); el.classList.toggle('is-l', p[0] / VW < .12); }
    function orient() {
      var h = mapEl.clientWidth >= 900;
      if (h === H && svg.getAttribute('viewBox')) return;
      H = h; VW = H ? D.h : D.w; VH = H ? D.w : D.h;
      svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
      geoG.setAttribute('transform', H ? 'matrix(0 1 -1 0 ' + D.h + ' 0)' : '');
      frame.style.aspectRatio = VW + ' / ' + VH; mapEl.classList.toggle('is-h', H); mapEl.classList.toggle('is-v', !H);
      NS_ORDER.forEach(function (c, j) { var b = D.boxes[c]; at(cls[j], (b[0] + b[2]) / 2, (b[1] + b[3]) / 2); });
      at(ol, ox, oy); north.classList.toggle('is-h', H);
      if (onI > -1) at(fOn, T[onI].x, T[onI].y);
    }

    /* ---------- state ---------- */
    var onI = -1, onC = null, fly = null;
    function paint() {
      ths.forEach(function (p, i) { var t = T[i]; p.classList.toggle('is-on', i === onI); p.classList.toggle('is-c', !!onC && t.c === onC); p.classList.toggle('is-dim', (onI > -1 && i !== onI) || (!!onC && t.c !== onC)); });
      marks.forEach(function (m, i) { m.classList.toggle('is-on', i === onI); m.classList.toggle('is-c', !!onC && T[i].c === onC); });
      ctys.forEach(function (c) { c.classList.toggle('is-on', (onI > -1 && T[onI].c === c.dataset.c) || onC === c.dataset.c); });
      cbs.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.c === onC ? 'true' : 'false'); });
    }
    function send(i) {   // the pulse runs from the office out along the town's thread
      var p = ths[i], L = p.getTotalLength(); if (fly) fly.kill();
      if (!k.motion) { var e = p.getPointAtLength(L); pulse.setAttribute('cx', e.x); pulse.setAttribute('cy', e.y); pulse.setAttribute('opacity', '1'); return; }
      var o = { v: 0 };
      fly = gsap.to(o, { v: 1, duration: Math.min(1.4, .55 + L / 2200), ease: 'power2.inOut', onStart: function () { pulse.setAttribute('opacity', '1'); },
        onUpdate: function () { var q = p.getPointAtLength(o.v * L); pulse.setAttribute('cx', f(q.x)); pulse.setAttribute('cy', f(q.y)); },
        onComplete: function () { fOn.classList.remove('is-up'); void fOn.offsetWidth; fOn.classList.add('is-up'); } });
    }
    function select(i, from) {
      var t = T[i]; onI = i; onC = null; paint();
      at(fOn, t.x, t.y); fOn.querySelector('b').textContent = t.n; fOn.querySelector('small').textContent = t.c;
      fOn.classList.toggle('is-up', !k.motion); fHov.classList.remove('is-up');
      if (from !== 'input') inp.value = t.n;
      clr.hidden = false; close();
      ans.innerHTML = '<b>Yes, ' + esc(t.n) + '.</b> ' + esc(t.n) + ' is one of the <span class="nums">' + D.towns[t.c].length + '</span> municipalities we build in across ' + esc(t.c) + ', one of our three counties.';
      send(i);
    }
    function county(c) {
      onC = onC === c ? null : c; onI = -1; if (fly) fly.kill(); pulse.setAttribute('opacity', '0'); fOn.classList.remove('is-up'); paint();
      if (onC) {
        ans.innerHTML = '<b>' + esc(c) + '.</b> <span class="nums">' + D.towns[c].length + '</span> municipalities we build in, one of our three counties. Type a town to find yours.';
        if (k.motion) gsap.fromTo(ths.filter(function (p) { return p.dataset.c === c; }), { drawSVG: '0%' }, { drawSVG: '100%', duration: .9, ease: 'power2.out', stagger: .008, clearProps: 'strokeDasharray,strokeDashoffset' });
      } else ans.innerHTML = '';
    }
    function clear(focus) {
      onI = -1; onC = null; if (fly) fly.kill(); pulse.setAttribute('opacity', '0'); fOn.classList.remove('is-up'); paint();
      inp.value = ''; clr.hidden = true; ans.innerHTML = ''; close(); if (focus) inp.focus();
    }
    k.on(clr, 'click', function () { clear(true); });
    cbs.forEach(function (b) { k.on(b, 'click', function () { county(b.dataset.c); }); });

    /* ---------- the combobox (as V1 and V2: arrows, Enter, Escape; an honest answer when we do not list a town) ---------- */
    var found = [], act = -1;
    function close() { opts.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); act = -1; }
    function renderOpts() {
      opts.innerHTML = found.map(function (i, j) { return '<li class="ft__opt" role="option" id="ft-o-' + j + '" data-i="' + i + '" aria-selected="' + (j === act ? 'true' : 'false') + '">' + esc(T[i].n) + '<span>' + esc(T[i].c) + '</span></li>'; }).join('');
      opts.hidden = !found.length; inp.setAttribute('aria-expanded', found.length ? 'true' : 'false');
      if (act > -1) inp.setAttribute('aria-activedescendant', 'ft-o-' + act); else inp.removeAttribute('aria-activedescendant');
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
      // a town we do not list has no thread: nothing stays lit beside the honest answer
      onI = -1; onC = null; if (fly) fly.kill(); pulse.setAttribute('opacity', '0'); fOn.classList.remove('is-up'); paint();
      ans.innerHTML = '<b>Not on our published list.</b> We do not see &ldquo;' + esc(inp.value.trim()) + '&rdquo; among the <span class="nums">104</span> municipalities we list. Call <a class="link nums" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>: you will get a real answer, not a callback form.';
    }
    k.on(inp, 'input', search);
    k.on(inp, 'keydown', function (e) {
      if (e.key === 'ArrowDown' && found.length) { e.preventDefault(); act = (act + 1) % found.length; renderOpts(); }
      else if (e.key === 'ArrowUp' && found.length) { e.preventDefault(); act = (act - 1 + found.length) % found.length; renderOpts(); }
      else if (e.key === 'Enter') { e.preventDefault(); commit(); }
      else if (e.key === 'Escape') { if (!opts.hidden) { e.preventDefault(); close(); } }
    });
    k.on(opts, 'pointerdown', function (e) { var li = e.target.closest('.ft__opt'); if (li) { e.preventDefault(); select(+li.dataset.i, 'list'); } });
    k.on(inp, 'blur', function () { k.timeout(close, 120); });
    k.on(inp, 'focus', function () {   // DEEP QA rule kept: on phones the field rises when tapped
      if (innerWidth > 767) return;
      k.timeout(function () { var r = inp.getBoundingClientRect(), nav = (document.querySelector('.nav') || { offsetHeight: 64 }).offsetHeight; if (r.top > nav + 120) window.scrollTo({ top: scrollY + r.top - nav - 16, behavior: 'auto' }); }, 250);
    });

    /* ---------- the map by hand: the nearest mark under the pointer; a tap chooses it ---------- */
    function nearest(x, y, reach) {
      var best = -1, bd = reach * reach;
      marks.forEach(function (m, i) { var r = m.getBoundingClientRect(), dx = r.left + r.width / 2 - x, dy = r.top + r.height / 2 - y, q = dx * dx + dy * dy; if (q < bd) { bd = q; best = i; } });
      return best;
    }
    var hovI = -1;
    function hover(i) {
      if (i === hovI) return;
      if (hovI > -1) ths[hovI].classList.remove('is-hot'); hovI = i;
      if (i < 0 || i === onI) { fHov.classList.remove('is-up'); return; }
      ths[i].classList.add('is-hot'); at(fHov, T[i].x, T[i].y); fHov.querySelector('b').textContent = T[i].n; fHov.classList.add('is-up');
    }
    k.on(frame, 'pointermove', function (e) { if (e.pointerType === 'mouse') hover(nearest(e.clientX, e.clientY, 26)); });
    k.on(frame, 'pointerleave', function () { hover(-1); });
    k.on(frame, 'click', function (e) { var i = nearest(e.clientX, e.clientY, 34); if (i > -1) { hover(-1); select(i, 'map'); } });

    k.ro(mapEl, orient); orient(); paint();
    EZ.reveal(k, root.querySelectorAll('.ft__head > *, .ft__counties, .ft__foot'));
    if (!k.motion) return;
    // arriving: the threads are spun out from the office, nearest towns first
    var order = ths.map(function (p, i) { return [p, p.getTotalLength()]; }).sort(function (a, b) { return a[1] - b[1]; }).map(function (x) { return x[0]; });
    gsap.set(order, { drawSVG: '0%' });
    var once = false;
    k.io(frame, function (en) {
      if (!en.isIntersecting || once) return; once = true;
      gsap.to(order, { drawSVG: '100%', duration: 1, ease: 'power2.out', stagger: .012, clearProps: 'strokeDasharray,strokeDashoffset' });
    }, { threshold: .2 });
    k.add(function () { if (fly) fly.kill(); gsap.killTweensOf(ths); });
  } },
  /* NEW VERSIONS · V4 "Drop your pin" (governing reference: Bruno Simon, scoped to this section). Pick up the pin and
     drop it on the pinned map: it snaps to the nearest listed town and answers; the search drops it for you [S1443]. */
  4: { init: function (root, k) {
    var D = geo(), board = root.querySelector('.pb__board'), paper = root.querySelector('.pb__paper'), svg = root.querySelector('.pb__svg'), labels = root.querySelector('.pb__labels'),
      pin = root.querySelector('.pb__pin'), office = root.querySelector('.pb__office'), tray = root.querySelector('.pb__tray');
    var inp = root.querySelector('.pb__in'), opts = root.querySelector('.pb__opts'), ans = root.querySelector('.pb__ans'), clr = root.querySelector('.pb__clear'), outB = root.querySelector('.pb__out');
    var T = [];
    NS_ORDER.forEach(function (c) { D.towns[c].slice().sort(function (a, b) { return a[2] - b[2]; }).forEach(function (t) { T.push({ n: t[0], c: c, x: t[1], y: t[2], k: norm(t[0]) }); }); });
    var oT = D.towns['Miami-Dade'].filter(function (t) { return t[0] === 'Miami'; })[0];
    var s = '';
    NS_ORDER.forEach(function (c) { s += '<path class="cty" data-c="' + c + '" d="' + D.counties[c] + '"/>'; });
    T.forEach(function (t, i) { s += '<circle class="mk" data-i="' + i + '" data-c="' + t.c + '" data-n="' + esc(t.n) + '" cx="' + t.x + '" cy="' + t.y + '" r="10"/>'; });
    svg.innerHTML = s;
    labels.innerHTML = NS_ORDER.map(function (c) { var b = D.boxes[c]; return '<span class="pb__cl" data-c="' + c + '" style="left:' + ((b[0] + b[2]) / 2 / 10).toFixed(2) + '%;top:' + ((b[1] + b[3]) / 2 / D.h * 100).toFixed(2) + '%">' + c + '</span>'; }).join('') +
      '<span class="pb__ol" style="left:' + (oT[1] / 10).toFixed(2) + '%;top:' + (oT[2] / D.h * 100).toFixed(2) + '%">Our office</span><span class="pb__flag"><b></b><small></small></span>';
    var marks = Array.prototype.slice.call(svg.querySelectorAll('.mk')), ctys = svg.querySelectorAll('.cty'), flag = labels.querySelector('.pb__flag');
    k.add(function () { svg.innerHTML = ''; labels.innerHTML = ''; ans.innerHTML = ''; inp.value = ''; opts.hidden = true; opts.innerHTML = ''; clr.hidden = true; outB.hidden = true; pin.style.transform = ''; });

    /* ---------- positions on the board: a mark's centre, the tray, the office ---------- */
    function rel(r) { var b = board.getBoundingClientRect(); return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top]; }
    function markAt(i) { return rel(marks[i].getBoundingClientRect()); }
    function trayAt() {   // the pin's resting place: the top of the tall tray, or the left of the flat one on phones
      var t = tray.getBoundingClientRect(), b = board.getBoundingClientRect(), flat = t.width > t.height * 1.6;
      return flat ? [t.left - b.left + 34, t.top - b.top + t.height / 2 + 21] : [t.left - b.left + t.width / 2, t.top - b.top + 52];
    }
    function setPin(x, y, lift) { pin.style.transform = 'translate(' + (x - 22).toFixed(1) + 'px,' + (y - 43 - (lift || 0)).toFixed(1) + 'px)'; pin.dataset.x = x; pin.dataset.y = y; }
    function placeOffice() { var p = rel(svg.querySelector('.mk[data-n="Miami"]').getBoundingClientRect()); office.style.transform = 'translate(' + (p[0] - 22).toFixed(1) + 'px,' + (p[1] - 43).toFixed(1) + 'px)'; }
    var onI = -1, inTray = true, fall = null;
    function layout() { placeOffice(); if (inTray) { var t = trayAt(); setPin(t[0], t[1]); } else if (onI > -1) { var m = markAt(onI); setPin(m[0], m[1]); } }
    k.ro(board, layout);

    function showFlag(i, on) {
      if (i < 0) { flag.classList.remove('is-up'); return; }
      var t = T[i]; flag.style.left = (t.x / 10).toFixed(2) + '%'; flag.style.top = (t.y / D.h * 100).toFixed(2) + '%';
      flag.classList.toggle('is-l', t.x > 600); flag.querySelector('b').textContent = t.n; flag.querySelector('small').textContent = t.c; flag.classList.add('is-up'); flag.classList.toggle('is-on', !!on);
    }
    function light(i) { marks.forEach(function (m, j) { m.classList.toggle('is-on', j === i); }); ctys.forEach(function (c) { c.classList.toggle('is-on', i > -1 && c.dataset.c === T[i].c); });
      labels.querySelectorAll('.pb__cl').forEach(function (l) { l.classList.toggle('is-off', i > -1 && l.dataset.c === T[i].c); }); }   // the flag names the county, so its label steps aside
    function answerYes(t) { ans.innerHTML = '<b>Yes, ' + esc(t.n) + '.</b> ' + esc(t.n) + ' is one of the <span class="nums">' + D.towns[t.c].length + '</span> municipalities we build in across ' + esc(t.c) + ', one of our three counties.'; }
    function select(i, from) {
      onI = i; inTray = false; light(i); showFlag(i, true); answerYes(T[i]); outB.hidden = false;
      if (from !== 'input' && from !== 'drop') inp.value = T[i].n; if (from === 'drop') inp.value = T[i].n;
      clr.hidden = false; close();
      var m = markAt(i);
      if (from === 'drop') { setPin(m[0], m[1]); if (k.motion) gsap.fromTo(pin.firstElementChild, { scale: 1.14 }, { scale: 1, duration: .5, ease: 'elastic.out(1, .5)', transformOrigin: '50% 100%', clearProps: 'transform' }); return; }
      // the search drops the pin from above, with a small bounce [S0340]
      if (fall) fall.kill();
      if (!k.motion) { setPin(m[0], m[1]); return; }
      var o = { lift: 140 }; setPin(m[0], m[1], 140);
      fall = gsap.to(o, { lift: 0, duration: .7, ease: 'bounce.out', onUpdate: function () { setPin(m[0], m[1], o.lift); } });
    }
    function backToTray(msg) {
      onI = -1; inTray = true; light(-1); showFlag(-1); outB.hidden = true;
      var t = trayAt(); if (fall) fall.kill();
      if (k.motion) { var a = { x: +pin.dataset.x || t[0], y: +pin.dataset.y || t[1] }; fall = gsap.to(a, { x: t[0], y: t[1], duration: .5, ease: 'power3.out', onUpdate: function () { setPin(a.x, a.y); } }); } else setPin(t[0], t[1]);
      if (msg) ans.innerHTML = msg;
    }
    var NONE = '<b>No town we list right there.</b> Drop the pin closer to where you live, or type your town above. Not sure? Call <a class="link nums" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>.';
    var UNLISTED = function (q) { return '<b>Not on our published list.</b> We do not see &ldquo;' + esc(q) + '&rdquo; among the <span class="nums">104</span> municipalities we list. Call <a class="link nums" href="tel:+17542360675">(754)&nbsp;236&#8209;0675</a>: you will get a real answer, not a callback form.'; };

    /* ---------- the pin by hand: pick it up, carry it over the map (the town under it is named), drop it ---------- */
    function nearest(x, y, reach) {   // in board coordinates
      var best = -1, bd = reach * reach;
      marks.forEach(function (m, i) { var p = markAt(i), q = (p[0] - x) * (p[0] - x) + (p[1] - y) * (p[1] - y); if (q < bd) { bd = q; best = i; } });
      return best;
    }
    var drag = null;
    k.on(pin, 'pointerdown', function (e) {
      if (e.button > 0) return; e.preventDefault();
      if (fall) fall.kill();
      var b = board.getBoundingClientRect();
      drag = { id: e.pointerId, dx: (+pin.dataset.x) - (e.clientX - b.left), dy: (+pin.dataset.y) - (e.clientY - b.top), hov: -1 };
      try { pin.setPointerCapture(e.pointerId); } catch (x) {}
      pin.classList.add('is-held'); board.classList.add('is-carrying'); light(-1); showFlag(-1);
    });
    k.on(pin, 'pointermove', function (e) {
      if (!drag) return; var b = board.getBoundingClientRect(), x = e.clientX - b.left + drag.dx, y = e.clientY - b.top + drag.dy;
      setPin(x, y, 10);
      var i = nearest(x, y, 34); if (i !== drag.hov) { drag.hov = i; light(i); showFlag(i, false); }
    });
    function keep(fn) {   // on one column the answer sits above the map: hold the map still under the hand while the answer grows [S1443]
      if (innerWidth > 999) { fn(); return; }
      var y0 = board.getBoundingClientRect().top; fn(); var d = board.getBoundingClientRect().top - y0; if (Math.abs(d) > .5) window.scrollBy(0, d);
    }
    function drop(e) { keep(function () { dropAt(e); }); }
    function dropAt(e) {
      if (!drag) return; var d = drag; drag = null; pin.classList.remove('is-held'); board.classList.remove('is-carrying');
      var b = board.getBoundingClientRect(), x = e.clientX - b.left + d.dx, y = e.clientY - b.top + d.dy, p = paper.getBoundingClientRect();
      var onPaper = e.clientX >= p.left && e.clientX <= p.right && e.clientY >= p.top && e.clientY <= p.bottom;
      var i = nearest(x, y, 34);
      if (i > -1) { select(i, 'drop'); return; }
      if (!onPaper) { backToTray(onI > -1 ? null : ''); if (!ans.innerHTML) ans.innerHTML = '<b>Drop it on the map.</b> Hold the pin over where you live and let go.'; return; }
      setPin(x, y); onI = -1; inTray = false; light(-1); showFlag(-1); ans.innerHTML = NONE; outB.hidden = false; inp.value = ''; clr.hidden = true;
    }
    k.on(pin, 'pointerup', drop);
    k.on(pin, 'pointercancel', function () { if (drag) { drag = null; pin.classList.remove('is-held'); board.classList.remove('is-carrying'); layout(); } });
    k.on(pin, 'keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.focus(); } });
    k.on(outB, 'click', function () { backToTray(''); ans.innerHTML = ''; inp.value = ''; clr.hidden = true; pin.focus({ preventScroll: true }); });

    /* ---------- the combobox (as V1 to V3) ---------- */
    var found = [], act = -1;
    function close() { opts.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); act = -1; }
    function renderOpts() {
      opts.innerHTML = found.map(function (i, j) { return '<li class="pb__opt" role="option" id="pb-o-' + j + '" data-i="' + i + '" aria-selected="' + (j === act ? 'true' : 'false') + '">' + esc(T[i].n) + '<span>' + esc(T[i].c) + '</span></li>'; }).join('');
      opts.hidden = !found.length; inp.setAttribute('aria-expanded', found.length ? 'true' : 'false');
      if (act > -1) inp.setAttribute('aria-activedescendant', 'pb-o-' + act); else inp.removeAttribute('aria-activedescendant');
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
      close(); backToTray(UNLISTED(inp.value.trim()));   // a town we do not list: the pin goes back to the tray, nothing stays lit
    }
    k.on(inp, 'input', search);
    k.on(inp, 'keydown', function (e) {
      if (e.key === 'ArrowDown' && found.length) { e.preventDefault(); act = (act + 1) % found.length; renderOpts(); }
      else if (e.key === 'ArrowUp' && found.length) { e.preventDefault(); act = (act - 1 + found.length) % found.length; renderOpts(); }
      else if (e.key === 'Enter') { e.preventDefault(); commit(); }
      else if (e.key === 'Escape') { if (!opts.hidden) { e.preventDefault(); close(); } }
    });
    k.on(opts, 'pointerdown', function (e) { var li = e.target.closest('.pb__opt'); if (li) { e.preventDefault(); select(+li.dataset.i, 'list'); } });
    k.on(inp, 'blur', function () { k.timeout(close, 120); });
    k.on(clr, 'click', function () { backToTray(''); ans.innerHTML = ''; inp.value = ''; clr.hidden = true; close(); inp.focus(); });
    k.on(inp, 'focus', function () {   // DEEP QA rule kept: on phones the field rises when tapped
      if (innerWidth > 767) return;
      k.timeout(function () { var r = inp.getBoundingClientRect(), nav = (document.querySelector('.nav') || { offsetHeight: 64 }).offsetHeight; if (r.top > nav + 120) window.scrollTo({ top: scrollY + r.top - nav - 16, behavior: 'auto' }); }, 250);
    });

    layout();
    EZ.reveal(k, root.querySelectorAll('.pb__side > *'));
    if (!k.motion) return;
    // arriving: the map is pinned to the board, the office pin goes in, and the visitor's pin gives a little hop in its tray
    var once = false;
    k.io(board, function (en) {
      if (!en.isIntersecting || once) return; once = true;
      gsap.fromTo(paper, { rotation: -4, y: -18, opacity: 0 }, { rotation: -1, y: 0, opacity: 1, duration: .8, ease: 'expo.out', clearProps: 'opacity', onComplete: layout });   // the pins follow the map once it is pinned
      gsap.fromTo(office, { opacity: 0 }, { opacity: 1, duration: .3, delay: .6, clearProps: 'opacity' });
      var h = { y: 0 }; gsap.to(h, { y: 18, duration: .35, delay: 1.1, yoyo: true, repeat: 3, ease: 'power2.out', onUpdate: function () { if (inTray && !drag) { var t = trayAt(); setPin(t[0], t[1], h.y); } } });
    }, { threshold: .3 });
  } }
  });
})();
