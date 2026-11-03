/* FINALIZE · Kitchens 3 · The sequence is the job.
   V1 · one kitchen elevation in five layers, drawn in order as the scroll advances through a sticky pair (the words stay,
        the drawing moves on): layout (dashed outlines and dimensions), appliance schedule, cabinetry on order (clay dashed:
        it has a lead time), plumbing and electrical in the wall, then cabinets, counters and tile go solid. Strokes before
        fills [S0362]; scrubbed and reversible [S1326]. Phones and reduced motion: the finished drawing and all five steps.
   V2 · the five steps on a builder's string line; picking a step lights everything that has to move with it. */
(function () {
  function g(cls, inner) { return '<g class="L ' + cls + '">' + inner + '</g>'; }
  function R(x, y, w, h, c) { return '<rect class="' + c + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"/>'; }
  function P(d, c) { return '<path class="' + c + '" d="' + d + '"/>'; }
  function T(x, y, s, c) { return '<text class="' + (c || 'lab') + '" x="' + x + '" y="' + y + '">' + s + '</text>'; }
  function art() {
    var s = P('M20 420 H620 M20 40 V420 M620 40 V420', 'ln');                                       // the room: floor and walls
    // 0 · layout: where everything goes, in dashed outline, with dimensions
    s += g('l0', R(40, 300, 480, 120, 'ghost') + R(40, 110, 200, 110, 'ghost') + R(420, 110, 100, 110, 'ghost') + R(530, 130, 80, 290, 'ghost') + R(260, 120, 140, 110, 'ghost') +
      P('M40 444 H520 M40 438 V450 M520 438 V450 M600 300 V420 M594 300 H606 M594 420 H606', 'dim') + T(250, 458, 'Layout resolved', 'lab-s'));
    // 1 · appliance schedule: the appliances set into the layout
    s += g('l1', R(250, 300, 90, 120, 'app') + '<circle class="app" cx="275" cy="316" r="8"/><circle class="app" cx="315" cy="316" r="8"/>' + P('M262 340 H328 V408 H262 Z', 'app') +
      R(150, 300, 80, 120, 'app') + P('M158 314 H222', 'dim') + R(530, 130, 80, 290, 'app') + P('M530 250 H610 M598 180 V230 M598 270 V320', 'dim') +
      P('M262 180 H328 L340 230 H250 Z', 'app') + T(256, 290, 'Range') + T(154, 290, 'Dishwasher') + T(534, 120, 'Refrigerator') + T(266, 172, 'Hood'));
    // 2 · cabinetry on order: dashed clay boxes (lead time); the tag sits inside the upper on-order run (QA-2: on the wall
    //     line it was crossed by the wiring and outlet boxes of stage 3)
    s += g('l2', R(40, 300, 100, 120, 'cab-o') + R(350, 300, 170, 120, 'cab-o') + R(40, 110, 200, 110, 'cab-o') + R(420, 110, 100, 110, 'cab-o') +
      '<g class="tagg"><rect class="tagr" x="76" y="152" width="128" height="26" rx="3"/>' + T(90, 170, 'Cabinetry on order', 'tagt') + '</g>');
    // 3 · plumbing and electrical behind them
    s += g('l3', P('M435 420 V350 H455 V330 M470 420 V340', 'pipe') + P('M20 246 H520 M90 246 V252 M295 246 V252 M190 246 V252 M470 246 V252', 'wire') +
      R(84, 252, 12, 16, 'box') + R(289, 252, 12, 16, 'box') + R(184, 252, 12, 16, 'box') + R(464, 252, 12, 16, 'box') + T(330, 458, 'Water and drain', 'lab-s') + T(26, 238, 'Electrical', 'lab-s'));
    // 4 · cabinets, counters, tile: solid
    var doors = '';
    [[40, 100], [350, 85], [435, 85]].forEach(function (c) { doors += R(c[0], 304, c[1], 116, 'cab') + P('M' + (c[0] + c[1] / 2) + ' 312 V412', 'dim'); });
    [[40, 100], [140, 100], [420, 100]].forEach(function (c) { doors += R(c[0], 110, c[1], 110, 'cab') + P('M' + (c[0] + c[1] / 2) + ' 118 V212', 'dim'); });
    var tiles = ''; for (var y = 236; y < 292; y += 14) tiles += 'M40 ' + y + 'H520 '; for (var x = 40; x <= 520; x += 28) tiles += 'M' + x + ' 230 V292 ';
    s += g('l4', P(tiles, 'tile') + doors + R(36, 292, 488, 9, 'top') + P('M380 296 Q410 310 440 296', 'ln') + T(150, 458, 'One kitchen, delivered as one scope', 'lab-s'));
    return s;
  }
  // solid strokes draw; dashed and filled marks fade (DrawSVG would overwrite their dash pattern)
  var DRAW = '.ln, .dim, .app, .pipe, .box, .tile', FADE = '.ghost, .cab-o, .wire, .cab, .top, text, .tagr';
  var STEPS = ['Layout', 'Appliance schedule', 'Cabinetry on order', 'Plumbing and electrical', 'Cabinets, counters, finish'];
  var DEPS = { 0: [1, 2, 3, 4], 1: [2, 3, 4], 2: [4], 3: [4], 4: [] };
  var LONG = ['the layout', 'the appliance schedule', 'the cabinetry', 'the plumbing and electrical', 'the cabinets, counters and finish'];

  EZ.section('kitchen-sequence', {
    1: { init: function (root, k) {
      var svg = root.querySelector('.sq__svg'), steps = Array.prototype.slice.call(root.querySelectorAll('.sq__s'));
      svg.innerHTML = art();
      var layers = Array.prototype.slice.call(svg.querySelectorAll('.L'));
      k.add(function () { svg.innerHTML = ''; steps.forEach(function (s) { s.classList.remove('is-on'); }); });
      EZ.reveal(k, root.querySelectorAll('.sq__side > .eyebrow, .sq__side > .t-head'));
      var wide = k.motion && matchMedia('(min-width: 901px)').matches;
      // QA-2: the static drawing (≤ 900px, reduced motion) is the pinned story's last frame. It showed every layer's working
      // notes at once, so captions, the lead-time tag and the wall labels stacked on one another; hide what the pin hands over.
      if (!wide) { gsap.set(svg.querySelectorAll('.l2 .cab-o, .l2 .tagg, .l1 .lab, .l0 .ghost, .l0 .lab-s, .l1 .lab-s, .l2 .lab-s, .l3 .lab-s'), { opacity: 0 }); steps.forEach(function (s) { s.classList.add('is-on'); }); return; }
      // every layer starts undrawn; strokes draw, then fills and words come in
      layers.forEach(function (L) {
        gsap.set(L.querySelectorAll(DRAW), { drawSVG: '0%' });
        gsap.set(L.querySelectorAll(FADE), { opacity: 0 });
      });
      var tl = gsap.timeline({ defaults: { ease: 'none' } });
      layers.forEach(function (L, i) {
        tl.to(L.querySelectorAll(DRAW), { drawSVG: '100%', duration: .55, stagger: { amount: .25 } }, i)
          .to(L.querySelectorAll(FADE), { opacity: 1, duration: .25, stagger: { amount: .1 } }, i + .35);
        if (i === 4) tl.to(svg.querySelectorAll('.l2 .cab-o, .l2 .tagg, .l1 .lab, .l0 .ghost'), { opacity: 0, duration: .25 }, i + .1);   // on order becomes installed; the plan marks give way to the finished room
        if (i > 0) tl.to(svg.querySelectorAll('.l' + (i - 1) + ' .lab-s'), { opacity: 0, duration: .2 }, i + .3);   // each caption hands over to the next
      });
      tl.to({}, { duration: .4 });
      var cur = -1;
      function show(i) { if (i === cur) return; cur = i; steps.forEach(function (s, j) { s.classList.toggle('is-on', j === i); }); }
      show(0);
      var st = ScrollTrigger.create({ trigger: root.querySelector('.sq__track'), start: 'top 15%', end: 'bottom bottom', scrub: .6, animation: tl,
        onUpdate: function (self) { show(Math.min(4, Math.floor(self.progress * tl.duration()))); } });
      k.add(function () { st.kill(); tl.kill(); });
    } },

    2: { init: function (root, k) {
      var nodes = root.querySelector('.sl__nodes'), svg = root.querySelector('.sl__svg'), read = root.querySelector('.sl__read'), line = root.querySelector('.sl__line');
      nodes.innerHTML = STEPS.map(function (s, i) { return '<li><button type="button" class="sl__n" data-i="' + i + '" aria-describedby="sl-read"><span class="nums">' + (i + 1) + '</span><b>' + s + '</b></button></li>'; }).join('');
      read.id = 'sl-read';
      var btns = Array.prototype.slice.call(nodes.querySelectorAll('.sl__n')), on = null;
      function draw() {   // the string between two stakes, measured to the real node centres
        var r = svg.getBoundingClientRect(), w = Math.round(r.width), h = 120;
        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        svg.innerHTML = '<rect class="stake" x="-10" y="40" width="10" height="44"/><rect class="stake" x="' + w + '" y="40" width="10" height="44"/><path class="str" d="M0 60 H' + w + '"/><path class="str-on" d=""/>';
        on = svg.querySelector('.str-on');
      }
      function cx(i) { var r = svg.getBoundingClientRect(), b = btns[i].getBoundingClientRect(); return (b.left + b.width / 2) - r.left; }
      function pick(i) {
        var deps = DEPS[i];
        btns.forEach(function (b, j) { b.classList.toggle('is-src', j === i); b.classList.toggle('is-dep', deps.indexOf(j) > -1); b.classList.toggle('is-up', j !== i && deps.indexOf(j) < 0); });
        read.innerHTML = deps.length ? '<b>Change ' + LONG[i] + ', and these move with it:</b> ' + (function (L) { return L.length > 1 ? L.slice(0, -1).join(', ') + ', and ' + L[L.length - 1] : L[0]; })(deps.map(function (d) { return LONG[d]; })) + '.'
          : '<b>Nothing waits on this step.</b> It is the kitchen, delivered.';
        if (!on) return;
        var a = cx(i), z = deps.length ? cx(deps[deps.length - 1]) : a;
        on.setAttribute('d', 'M' + a.toFixed(1) + ' 60 H' + z.toFixed(1));
        if (k.motion && deps.length) gsap.fromTo(on, { drawSVG: '0%' }, { drawSVG: '100%', duration: .5, ease: 'power2.inOut', overwrite: true });
      }
      function reset() { btns.forEach(function (b) { b.classList.remove('is-src', 'is-dep', 'is-up'); }); read.textContent = 'Pick a step to see what moves with it.'; if (on) on.setAttribute('d', ''); }
      draw(); reset();
      k.ro(line, function () { draw(); var s = nodes.querySelector('.is-src'); if (s) pick(+s.dataset.i); });
      btns.forEach(function (b) {
        k.on(b, 'click', function () { pick(+b.dataset.i); });
        k.on(b, 'focus', function () { pick(+b.dataset.i); });
        k.on(b, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(+b.dataset.i); });
      });
      k.add(function () { nodes.innerHTML = ''; svg.innerHTML = ''; read.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.sl__head > *'));
    } }
  });
})();
