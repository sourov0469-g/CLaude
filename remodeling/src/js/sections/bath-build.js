/* FINALIZE · Bathrooms 2 · How a bath is built. One shower wall in six bays (600 units each); bay i shows the wall with
   layers 0..i: studs, backer board (seams), waterproofing (seams taped), tile (with the steel square), glass (the template
   first, then the panel), fixtures. The section pins; one scrubbed master timeline moves the camera bay to bay (0.3 of
   each unit), draws the arriving bay (strokes first, fills after) and holds; the words swap per stage; the rail fills.
   Phones, short screens and reduced motion: the list is the story, with each bay drawn inline. */
(function () {
  var BW = 600, H = 500;
  function R(x, y, w, h, c) { return '<rect class="' + c + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"/>'; }
  function P(d, c) { return '<path class="' + c + '" d="' + d + '"/>'; }
  function T(x, y, s) { return '<text class="lab" x="' + x + '" y="' + y + '">' + s + '</text>'; }
  // Phase 9: each layer is its own group, so a bay can arrive as the finished bay before it and only its new layer builds
  function Lg(n, str) { return '<g class="ly" data-l="' + n + '">' + str + '</g>'; }
  function bay(i) {
    var x0 = i * BW, L = x0 + 40, W = 520, s = '';
    var f0 = P('M' + x0 + ' 460 H' + (x0 + BW), 'ln');                                                      // the floor
    // studs in every bay: from bay 1 on they sit behind the board, so the wall never goes blank between stages
    f0 += R(L, 60, W, 14, 'stud') + R(L, 426, W, 14, 'stud');
    for (var x = L; x <= L + W - 14; x += 84) f0 += R(x, 74, 14, 352, 'stud');
    if (i === 0) f0 += T(L, 40, 'The framing, bare');
    s += Lg(0, f0);
    if (i >= 1) s += Lg(1, R(L, 60, W, 380, 'board') + P('M' + (L + 260) + ' 60 V440 M' + L + ' 250 H' + (L + W), 'ln') + (i === 1 ? T(L, 40, 'Water-resistant, not waterproof') : ''));   // backer board, seams
    if (i >= 2) s += Lg(2, R(L, 60, W, 380, 'memb') + P('M' + (L + 260) + ' 60 V440 M' + L + ' 250 H' + (L + W), 'tape') + (i === 2 ? T(L, 40, 'Waterproofed properly') : ''));   // membrane, seams taped
    if (i >= 3) { var t = ''; for (var ty = 60; ty < 440; ty += 76) for (var tx = L; tx < L + W; tx += 104) t += R(tx, ty, 104, 76, 'tile'); if (i === 3) t += P('M' + (L + 300) + ' 112 V280 H' + (L + 470), 'sq') + T(L, 40, 'Set square'); s += Lg(3, t); }   // tile, and the steel square
    if (i >= 4) s += Lg(4, (i === 4 ? P('M' + (L + 340) + ' 70 H' + (L + W - 10) + ' V430 H' + (L + 340) + ' Z', 'tmpl') + T(L, 40, 'Templated after tiling') : '') + R(L + 352, 82, W - 372, 340, 'glass'));   // the template, then the glass cut to what was built
    if (i >= 5) {                                                                                              // fixtures, then closed up once
      var hx = L + 150, s0 = s; s = '';
      s += P('M' + hx + ' 74 V96 Q' + hx + ' 106 ' + (hx - 10) + ' 106 H' + (hx - 34), 'ln');                    // shower arm off the wall
      s += '<rect class="blk" x="' + (hx - 70) + '" y="100" width="46" height="12" rx="6"/>';                    // the head
      s += P('M' + (hx - 62) + ' 118 l-6 22 M' + (hx - 47) + ' 118 v24 M' + (hx - 32) + ' 118 l6 22', 'tmpl');   // spray, faint
      s += R(hx - 26, 220, 52, 74, 'tile') + '<circle class="ln" cx="' + hx + '" cy="257" r="15"/>' + P('M' + hx + ' 257 l22 -8', 'ln');   // trim plate, valve, lever
      s += R(L + 40, 300, 150, 76, 'board') + P('M' + (L + 40) + ' 338 H' + (L + 190), 'ln') + R(L + 58, 312, 18, 26, 'tile') + R(L + 84, 318, 14, 20, 'tile');   // niche: shelf and two bottles
      s += P('M' + (L + 120) + ' 434 H' + (L + 300), 'ln') + P('M' + (L + 120) + ' 430 H' + (L + 300), 'lnt');   // linear drain at the floor
      s += P('M' + (L + 360) + ' 240 V300', 'ln') + '<circle class="blk" cx="' + (L + 360) + '" cy="236" r="4"/><circle class="blk" cx="' + (L + 360) + '" cy="304" r="4"/>';   // the handle on the glass
      s += P('M' + (L + W + 12) + ' 200 H' + (L + W + 52), 'ln') + R(L + W + 18, 204, 28, 64, 'board');          // a towel on its bar, outside the glass
      s += T(L, 40, 'Closed up once');
      s = s0 + Lg(5, s);
    }
    return '<g class="bb__f" data-i="' + i + '">' + s + '</g>';
  }

  EZ.section('bath-build', { 1: { init: function (root, k) {
    var world = root.querySelector('.bb__world'), win = root.querySelector('.bb__window'), pin = root.querySelector('.bb__pin');
    var items = Array.prototype.slice.call(root.querySelectorAll('.bb__i')), fill = root.querySelector('.bb__fill'), cur = -1, groups = null;
    function show(i) {
      if (i === cur) return; cur = i;
      items.forEach(function (it, j) { it.classList.toggle('is-on', j === i); });
      if (groups) groups.forEach(function (g, j) { g.classList.toggle('is-off', j !== i); });
    }
    var big = k.motion && matchMedia('(min-width: 901px) and (min-height: 640px)').matches;
    if (!big) {
      root.classList.add('bb--list');
      items.forEach(function (it, i) {
        var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        s.setAttribute('viewBox', (i * BW) + ' 20 ' + BW + ' 460'); s.setAttribute('class', 'bb__mini'); s.setAttribute('aria-hidden', 'true');
        s.innerHTML = bay(i); it.insertBefore(s, it.firstChild);
      });
      k.add(function () { root.classList.remove('bb--list'); root.querySelectorAll('.bb__mini').forEach(function (n) { n.remove(); }); });
      return;
    }
    world.innerHTML = [0, 1, 2, 3, 4, 5].map(bay).join('');
    groups = Array.prototype.slice.call(world.querySelectorAll('.bb__f'));
    var DRAW = '.ln, .lnt, .sq, .stud, .board, .tile, .glass', FADE = '.memb, .tape, .tmpl, .blk, .lab', FILL = '.stud, .board, .tile, .glass';
    // Phase 9: bay i arrives as the finished bay i-1 (its earlier layers drawn and filled); only layer i builds, strokes
    // first, fills after. Before this, every bay redrew from nothing and the tile bay flashed white (tile fills ahead of lines).
    function fresh(g, i, sel) { var out = []; g.querySelectorAll('.ly[data-l="' + i + '"]').forEach(function (l) { out = out.concat(Array.prototype.slice.call(l.querySelectorAll(sel))); }); return out; }
    groups.forEach(function (g, i) { gsap.set(fresh(g, i, DRAW), { drawSVG: '0%' }); gsap.set(fresh(g, i, FILL), { fillOpacity: 0 }); gsap.set(fresh(g, i, FADE), { opacity: 0 }); });
    var fw = 0;
    function size() { var h = win.clientHeight; fw = h * BW / H; world.style.height = h + 'px'; world.style.width = (fw * 6) + 'px'; }
    size(); k.ro(win, function () { size(); ScrollTrigger.refresh(); });
    function camX(i) { return -(i * fw) + (win.clientWidth - fw) / 2; }
    gsap.set(world, { x: camX(0) });
    var tl = gsap.timeline({ defaults: { ease: 'none' } });
    groups.forEach(function (g, i) {
      if (i > 0) tl.fromTo(world, { x: function () { return camX(i - 1); } }, { x: function () { return camX(i); }, duration: .3, ease: 'power2.inOut', immediateRender: false }, i - .3);
      if (i === 0) return;   // the first bay draws as the section arrives (below), never an empty window
      tl.to(fresh(g, i, DRAW), { drawSVG: '100%', duration: .3, stagger: { amount: .15 } }, i - .12)
        .to(fresh(g, i, FILL), { fillOpacity: 1, duration: .15 }, i + .12)
        .to(fresh(g, i, FADE), { opacity: 1, duration: .15, stagger: { amount: .05 } }, i + .15);
    });
    var g0 = groups[0], intro = gsap.timeline({ paused: true })
      .to(fresh(g0, 0, DRAW), { drawSVG: '100%', duration: .8, ease: 'power2.inOut', stagger: { amount: .4 } })
      .to(fresh(g0, 0, FILL), { fillOpacity: 1, duration: .3 }, '-=.35')
      .to(fresh(g0, 0, FADE), { opacity: 1, duration: .3 }, '-=.3');
    var it = ScrollTrigger.create({ trigger: win, start: 'top 85%', once: true, onEnter: function () { intro.play(); } });
    k.add(function () { it.kill(); intro.kill(); });
    tl.to({}, { duration: .5 });
    var st = ScrollTrigger.create({ trigger: pin, start: 'top top', end: function () { return '+=' + Math.round(innerHeight * 5.4); }, pin: true, scrub: .8, animation: tl, invalidateOnRefresh: true,
      onUpdate: function (self) { var p = self.progress * tl.duration(); show(Math.min(5, Math.max(0, Math.floor(p + .2)))); fill.style.transform = 'scaleX(' + Math.min(1, p / 5).toFixed(4) + ')'; } });
    show(0);
    k.add(function () { st.kill(); tl.kill(); world.innerHTML = ''; world.style.width = world.style.height = ''; gsap.set(world, { clearProps: 'transform' }); });
  } } });
})();
