/* Bathrooms page, section 2 · bath-build. Method lines are the firm's own (FACTS.md "Bathroom"). */
(function () {
  // what each wall layer stands for, in the firm's own lines (FACTS.md); no claim beyond them
  var LAYERS = [
    ['The frame', 'Down to the studs: we take the bathroom back to the frame before anything new goes in.'],
    ['Backer board', 'Backer board is water-resistant, not waterproof.'],
    ['Waterproofing', 'Waterproofing done properly. Backer board is water-resistant, not waterproof.'],
    ['Tile', 'Tile set square.'],
    ['Glass', 'Glass is templated after tiling, because it is cut to what was actually built rather than to the drawing.']
  ];

  EZ.section('bath-build', {
    /* v1 · The wall section: buttons (and pointer on the drawing) pick a layer; the others dim; the readout names it */
    1: { init: function (root, k) {
      var keys = root.querySelector('.bb1__keys'), wall = root.querySelector('.bb1__wall'), on = root.querySelector('.bb1__on'), od = root.querySelector('.bb1__od');
      var G = Array.prototype.slice.call(wall.querySelectorAll('.bb1__l'));
      keys.innerHTML = LAYERS.map(function (l, i) { return '<button type="button" class="bb1__k" aria-pressed="' + (i ? 'false' : 'true') + '" data-l="' + i + '" data-rx="native:wall-layer">' + l[0] + '</button>'; }).join('');
      var B = Array.prototype.slice.call(keys.children);
      function pick(i) {
        B.forEach(function (b, j) { b.setAttribute('aria-pressed', i === j ? 'true' : 'false'); });
        G.forEach(function (g, j) { g.classList.toggle('is-on', i === j); });
        wall.classList.add('has-on');
        on.textContent = LAYERS[i][0]; od.textContent = LAYERS[i][1];
        if (k.motion) k.ctx.add(function () { gsap.fromTo(G[i], { x: 12 }, { x: 0, duration: .35, ease: 'back.out(2)' }); });
      }
      B.forEach(function (b) { k.on(b, 'click', function () { pick(+b.dataset.l); }); });
      G.forEach(function (g) { k.on(g, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(+g.dataset.l); }); k.on(g, 'click', function () { pick(+g.dataset.l); }); });
      if (EZ.bindReactions) EZ.bindReactions(keys, k);
      pick(0);
      k.add(function () { keys.innerHTML = ''; wall.classList.remove('has-on'); G.forEach(function (g) { g.classList.remove('is-on'); }); });
      EZ.reveal(k, root.querySelectorAll('.bb1__copy > *'));
      if (k.motion) gsap.from(G, { x: -30, autoAlpha: 0, duration: .4, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: wall, start: 'top 80%', once: true } });
    } },

    /* v2 · Order of works: the steps arrive one by one down the line; the permits are stamped in */
    2: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.bb2__head > *'));
      if (!k.motion) return;
      gsap.from(root.querySelectorAll('.bb2__steps li'), { x: 24, autoAlpha: 0, duration: .4, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.bb2__steps'), start: 'top 80%', once: true } });
      gsap.from(root.querySelectorAll('.bb2__permits li'), { scale: 1.6, rotation: -10, autoAlpha: 0, duration: .3, stagger: .12, ease: 'back.out(2.5)', scrollTrigger: { trigger: root.querySelector('.bb2__permits'), start: 'top 85%', once: true } });
    } },

    /* v3 · Three chapters: the buttons and the arrow keys step one panel at a time */
    3: { init: function (root, k) {
      var tr = root.querySelector('.bb3__track'), ch = Array.prototype.slice.call(tr.querySelectorAll('.bb3__ch'));
      function at() { var l = tr.scrollLeft, best = 0, bd = 1e9; ch.forEach(function (c, i) { var d = Math.abs(c.offsetLeft - tr.offsetLeft - l - parseFloat(getComputedStyle(tr).paddingLeft)); if (d < bd) { bd = d; best = i; } }); return best; }
      function go(d) { var i = Math.max(0, Math.min(ch.length - 1, at() + d)); tr.scrollTo({ left: ch[i].offsetLeft - ch[0].offsetLeft, behavior: k.motion ? 'smooth' : 'auto' }); }
      k.on(root.querySelector('.bb3__prev'), 'click', function () { go(-1); });
      k.on(root.querySelector('.bb3__next'), 'click', function () { go(1); });
      k.on(tr, 'keydown', function (e) { if (e.target !== tr) return; if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
      k.add(function () { tr.scrollLeft = 0; });
      EZ.reveal(k, root.querySelectorAll('.bb3__head > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.bb3__art path, .bb3__art rect'), { drawSVG: '0%', duration: .6, stagger: .04, ease: 'power2.inOut', scrollTrigger: { trigger: tr, start: 'top 80%', once: true } });
    } },

    /* v4 · The permit board: each card stamps PULLED when selected (and lifts the stamp when selected again) */
    4: { init: function (root, k) {
      var cards = Array.prototype.slice.call(root.querySelectorAll('.bb4__card'));
      cards.forEach(function (c) { k.on(c, 'click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); }); });
      k.add(function () { cards.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); }); });
      EZ.reveal(k, root.querySelectorAll('.bb4__copy > *'));
      if (k.motion) gsap.from(cards, { y: -24, autoAlpha: 0, duration: .4, stagger: .1, ease: 'back.out(1.6)', scrollTrigger: { trigger: root.querySelector('.bb4__board'), start: 'top 80%', once: true } });
    } },

    /* v5 · Set square: the tiles arrive a few degrees off and settle exactly square */
    5: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.bb5__head > *, .bb5__time'));
      if (k.motion) gsap.from(root.querySelectorAll('.bb5__tiles li'), { rotation: function (i) { return [-4, 3, -2, 5, -3][i % 5]; }, y: 16, autoAlpha: 0, duration: .55, stagger: .05, ease: 'elastic.out(1, .6)', scrollTrigger: { trigger: root.querySelector('.bb5__tiles'), start: 'top 85%', once: true } });
    } },

    /* b1 · release record of slot 1 */
    b1: { init: function (root, k) {
      var keys = root.querySelector('.bb1r__keys'), wall = root.querySelector('.bb1r__wall'), on = root.querySelector('.bb1r__on'), od = root.querySelector('.bb1r__od');
      var G = Array.prototype.slice.call(wall.querySelectorAll('.bb1r__l'));
      keys.innerHTML = LAYERS.map(function (l, i) { return '<button type="button" class="bb1r__k" aria-pressed="' + (i ? 'false' : 'true') + '" data-l="' + i + '" data-rx="native:wall-layer">' + l[0] + '</button>'; }).join('');
      var B = Array.prototype.slice.call(keys.children);
      function pick(i) {
        B.forEach(function (b, j) { b.setAttribute('aria-pressed', i === j ? 'true' : 'false'); });
        G.forEach(function (g, j) { g.classList.toggle('is-on', i === j); });
        wall.classList.add('has-on');
        on.textContent = LAYERS[i][0]; od.textContent = LAYERS[i][1];
        if (k.motion) k.ctx.add(function () { gsap.fromTo(G[i], { x: 12 }, { x: 0, duration: .35, ease: 'back.out(2)' }); });
      }
      B.forEach(function (b) { k.on(b, 'click', function () { pick(+b.dataset.l); }); });
      G.forEach(function (g) { k.on(g, 'pointerenter', function (e) { if (e.pointerType === 'mouse') pick(+g.dataset.l); }); k.on(g, 'click', function () { pick(+g.dataset.l); }); });
      if (EZ.bindReactions) EZ.bindReactions(keys, k);
      pick(0);
      k.add(function () { keys.innerHTML = ''; wall.classList.remove('has-on'); G.forEach(function (g) { g.classList.remove('is-on'); }); });
      EZ.reveal(k, root.querySelectorAll('.bb1r__copy > *'));
      if (k.motion) gsap.from(G, { x: -30, autoAlpha: 0, duration: .4, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: wall, start: 'top 80%', once: true } });
    } },

    /* b2 · release record of slot 2 */
    b2: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.bb2r__head > *'));
      if (!k.motion) return;
      gsap.from(root.querySelectorAll('.bb2r__steps li'), { x: 24, autoAlpha: 0, duration: .4, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: root.querySelector('.bb2r__steps'), start: 'top 80%', once: true } });
      gsap.from(root.querySelectorAll('.bb2r__permits li'), { scale: 1.6, rotation: -10, autoAlpha: 0, duration: .3, stagger: .12, ease: 'back.out(2.5)', scrollTrigger: { trigger: root.querySelector('.bb2r__permits'), start: 'top 85%', once: true } });
    } },

    /* b3 · release record of slot 3 */
    b3: { init: function (root, k) {
      var tr = root.querySelector('.bb3r__track'), ch = Array.prototype.slice.call(tr.querySelectorAll('.bb3r__ch'));
      function at() { var l = tr.scrollLeft, best = 0, bd = 1e9; ch.forEach(function (c, i) { var d = Math.abs(c.offsetLeft - tr.offsetLeft - l - parseFloat(getComputedStyle(tr).paddingLeft)); if (d < bd) { bd = d; best = i; } }); return best; }
      function go(d) { var i = Math.max(0, Math.min(ch.length - 1, at() + d)); tr.scrollTo({ left: ch[i].offsetLeft - ch[0].offsetLeft, behavior: k.motion ? 'smooth' : 'auto' }); }
      k.on(root.querySelector('.bb3r__prev'), 'click', function () { go(-1); });
      k.on(root.querySelector('.bb3r__next'), 'click', function () { go(1); });
      k.on(tr, 'keydown', function (e) { if (e.target !== tr) return; if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
      k.add(function () { tr.scrollLeft = 0; });
      EZ.reveal(k, root.querySelectorAll('.bb3r__head > *'));
      if (k.motion) gsap.from(root.querySelectorAll('.bb3r__art path, .bb3r__art rect'), { drawSVG: '0%', duration: .6, stagger: .04, ease: 'power2.inOut', scrollTrigger: { trigger: tr, start: 'top 80%', once: true } });
    } },

    /* b4 · release record of slot 4 */
    b4: { init: function (root, k) {
      var cards = Array.prototype.slice.call(root.querySelectorAll('.bb4r__card'));
      cards.forEach(function (c) { k.on(c, 'click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); }); });
      k.add(function () { cards.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); }); });
      EZ.reveal(k, root.querySelectorAll('.bb4r__copy > *'));
      if (k.motion) gsap.from(cards, { y: -24, autoAlpha: 0, duration: .4, stagger: .1, ease: 'back.out(1.6)', scrollTrigger: { trigger: root.querySelector('.bb4r__board'), start: 'top 80%', once: true } });
    } },

    /* b5 · release record of slot 5 */
    b5: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.bb5r__head > *, .bb5r__time'));
      if (k.motion) gsap.from(root.querySelectorAll('.bb5r__tiles li'), { rotation: function (i) { return [-4, 3, -2, 5, -3][i % 5]; }, y: 16, autoAlpha: 0, duration: .55, stagger: .05, ease: 'elastic.out(1, .6)', scrollTrigger: { trigger: root.querySelector('.bb5r__tiles'), start: 'top 85%', once: true } });
    } }
  });
})();
