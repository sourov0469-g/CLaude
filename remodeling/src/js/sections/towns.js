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
      return '<div class="tw__c"><h3>' + c.replace('-', '&#8209;') + ' <span><span class="nums">' + D.towns[c].length + '</span> municipalities</span></h3><ul class="tw__ul" aria-label="' + c + ' municipalities">' + list + '</ul></div>';
    }).join('');
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
  } } });
})();
