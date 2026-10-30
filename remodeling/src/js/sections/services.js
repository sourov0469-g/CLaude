/* services, PLAN-V3 §3: v1 exploded iso assemblies (Silo 98), v2 sticky drawing-set stack (R45 + 571 + curtain),
   v3 pegboard tool wall (trade icons 91 + grid-magnetic holes). */
(function () {
  var C = Math.cos(Math.PI / 6), S = .5;
  function P(x, y, z) { return [(x - y) * C, (x + y) * S - z]; }
  function pts(a) { return a.map(function (p) { var q = P(p[0], p[1], p[2]); return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '); }
  // iso box: top, front-left (y+d), front-right (x+w)
  function box(x, y, z, w, d, h, m) {
    return '<g class="m-' + m + '">' +
      '<polygon class="l" points="' + pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]) + '"/>' +
      '<polygon class="r" points="' + pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]) + '"/>' +
      '<polygon class="t" points="' + pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]) + '"/></g>';
  }
  function line(a, b) { var p = P(a[0], a[1], a[2]), q = P(b[0], b[1], b[2]); return 'M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + 'L' + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }

  // each assembly: layers bottom->top, each { art, label, anchor [x,y,z] } and an explode direction in screen space
  var ASM = {
    kitchen: { dir: [0, -1], gap: 62, layers: [
      { label: 'Layout', at: [200, 70, 4], art: function () { var g = ''; for (var i = 20; i < 200; i += 20) g += line([i, 0, 4], [i, 140, 4]); for (var j = 20; j < 140; j += 20) g += line([0, j, 4], [200, j, 4]); return box(0, 0, 0, 200, 140, 4, 'floor') + '<path class="grid" d="' + g + '"/>'; } },
      { label: 'Plumbing and electrical', at: [190, 12, 30], art: function () { return box(10, 8, 8, 180, 6, 6, 'pipe') + box(40, 8, 8, 6, 6, 60, 'pipe') + box(140, 4, 30, 50, 4, 4, 'wire') + box(150, 4, 8, 4, 4, 26, 'wire') + box(120, 2, 46, 10, 3, 12, 'wire'); } },
      { label: 'Cabinetry', at: [180, 25, 60], art: function () { return box(0, 0, 0, 60, 50, 72, 'cab') + box(60, 0, 0, 60, 50, 72, 'cab') + box(120, 0, 0, 60, 50, 72, 'cab') + box(70, 80, 0, 90, 46, 72, 'cab'); } },
      { label: 'Counters', at: [186, 26, 78], art: function () { return box(-4, -2, 72, 188, 56, 7, 'stone') + box(64, 76, 72, 102, 54, 7, 'stone'); } }
    ] },
    bath: { dir: [-C, S], gap: 46, layers: [
      { label: 'Studs', at: [150, 0, 130], art: function () { var s = ''; for (var x = 0; x <= 150; x += 37.5) s += box(x, 0, 0, 6, 12, 150, 'stud'); return box(0, 0, 150, 156, 12, 6, 'stud') + s + box(0, 0, -6, 156, 12, 6, 'stud'); } },
      { label: 'Backer board', at: [156, 14, 112], art: function () { return box(0, 14, 0, 156, 5, 150, 'board'); } },
      { label: 'Waterproofing', at: [156, 21, 96], art: function () { return box(0, 21, 0, 156, 3, 150, 'wp'); } },
      { label: 'Tile, set square', at: [156, 26, 80], art: function () { var g = ''; for (var x = 26; x < 156; x += 26) g += line([x, 30, 0], [x, 30, 150]); for (var z = 25; z < 150; z += 25) g += line([0, 30, z], [156, 30, z]); return box(0, 26, 0, 156, 4, 150, 'tile') + '<path class="grid" d="' + g + '"/>'; } },
      { label: 'Glass, templated after tiling', at: [110, 74, 70], art: function () { return box(60, 70, 0, 4, 80, 140, 'glass'); } }
    ] },
    home: { dir: [0, -1], gap: 58, layers: [
      { label: 'Slab', at: [200, 80, 10], art: function () { return box(0, 0, 0, 200, 160, 10, 'slab'); } },
      { label: 'Structure', at: [200, 4, 70], art: function () {
        var f = '';
        for (var x = 0; x <= 196; x += 28) f += box(x, 0, 10, 4, 6, 66, 'frame');
        for (var y = 0; y <= 156; y += 32) f += box(0, y, 10, 6, 4, 66, 'frame');
        return box(0, 0, 76, 200, 6, 4, 'frame') + box(0, 0, 76, 6, 160, 4, 'frame') + f + box(196, 156, 10, 4, 4, 70, 'frame') + box(196, 0, 10, 4, 4, 70, 'frame') + box(0, 156, 10, 4, 4, 70, 'frame');
      } },
      { label: 'Open plan', at: [200, 100, 20], art: function () { return box(90, 0, 10, 6, 70, 66, 'wall') + box(130, 110, 10, 70, 6, 40, 'wall'); } },
      { label: 'Roof', at: [205, 80, 125], art: function () {
        var e = -6, w = 212, ez = 80, rz = 128;
        return '<polygon class="m-roof-l" points="' + pts([[e, -8, ez], [w, -8, ez], [w, 80, rz], [e, 80, rz]]) + '" stroke="#121212" stroke-width="1.1"/>' +
          '<polygon class="m-roof" points="' + pts([[e, 80, rz], [w, 80, rz], [w, 168, ez], [e, 168, ez]]) + '" stroke="#121212" stroke-width="1.1"/>' +
          '<polygon class="m-wall" points="' + pts([[w - 6, -8, ez], [w - 6, 80, rz], [w - 6, 168, ez]]) + '" fill="#d6d1c5" stroke="#121212" stroke-width="1.1"/>';
      } }
    ] }
  };

  function buildAsm(svg, def) {
    var n = def.layers.length, html = '';
    // labels share one column to the right of the exploded drawing, so no label sits on a layer
    var col = -1e9;
    def.layers.forEach(function (L, i) { var a = P(L.at[0], L.at[1], L.at[2]); col = Math.max(col, a[0] + def.dir[0] * def.gap * i); });
    col += 28;
    def.layers.forEach(function (L, i) {
      var a = P(L.at[0], L.at[1], L.at[2]), lx = col - def.dir[0] * def.gap * i;
      html += '<g class="layer" data-i="' + i + '">' + L.art() +
        '<g class="lab"><circle class="dotl" cx="' + a[0].toFixed(1) + '" cy="' + a[1].toFixed(1) + '" r="3"/><path class="ldr" d="M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + 'H' + lx.toFixed(1) + '"/>' +
        '<text class="lbl" x="' + (lx + 6).toFixed(1) + '" y="' + (a[1] + 5).toFixed(1) + '">' + L.label + '</text></g></g>';
    });
    svg.innerHTML = html;
    // fit the viewBox to the fully exploded drawing (labels included), so the assembly fills its stage
    var layers = svg.querySelectorAll('.layer');
    layers.forEach(function (g, i) { var o = def.gap * i; g.setAttribute('transform', 'translate(' + (def.dir[0] * o).toFixed(1) + ' ' + (def.dir[1] * o).toFixed(1) + ')'); });
    var bb = svg.getBBox(), pad = 10;
    svg.setAttribute('viewBox', (bb.x - pad).toFixed(1) + ' ' + (bb.y - pad).toFixed(1) + ' ' + (bb.width + pad * 2).toFixed(1) + ' ' + (bb.height + pad * 2).toFixed(1));
    return { layers: svg.querySelectorAll('.layer'), labs: svg.querySelectorAll('.lab') };
  }

  EZ.section('services', {
    /* slot 1 · AUDIT-01 winner (copied from v1; fixes applied here) */
    1: { init: function (root, k) {
      // [AUDIT-01 F3] one state owner per card: hover previews (fine pointers), click / tap / Enter pins it open;
      // leaving a pinned card does nothing; scroll never changes it. Open 450ms / close 350ms, house curve, transforms only.
      var HOUSE = EZ.bezier(.23, 1, .32, 1);
      EZ.reveal(k, root.querySelectorAll('.services__head > *'));
      root.querySelectorAll('.sl__card').forEach(function (card, ci) {
        var def = ASM[card.dataset.asm], svg = card.querySelector('.sl__svg'), stage = card.querySelector('.sl__stage');
        var A = buildAsm(svg, def), st = { p: k.motion ? 0 : 1 }, tw = null, pinned = !k.motion, preview = false;
        k.add(function () { svg.innerHTML = ''; svg.removeAttribute('viewBox'); });
        function render() {
          A.layers.forEach(function (g, i) { var o = def.gap * i * st.p; g.setAttribute('transform', 'translate(' + (def.dir[0] * o).toFixed(1) + ' ' + (def.dir[1] * o).toFixed(1) + ')'); });
          A.labs.forEach(function (l) { l.setAttribute('opacity', EZ.clamp((st.p - .35) / .5, 0, 1).toFixed(2)); });
        }
        render();
        function sync() {
          var p = pinned || preview ? 1 : 0;
          stage.setAttribute('aria-expanded', pinned ? 'true' : 'false');
          card.classList.toggle('is-open', p === 1);
          if (!k.motion) { st.p = p; render(); return; }
          if (tw) tw.kill();
          tw = gsap.to(st, { p: p, duration: p ? .45 : .35, ease: HOUSE, onUpdate: render });
        }
        stage.setAttribute('aria-expanded', pinned ? 'true' : 'false');
        k.on(stage, 'click', function () { pinned = !pinned; sync(); });
        if (k.motion && k.fine) {
          k.on(stage, 'pointerenter', function (e) { if (e.pointerType === 'mouse') { preview = true; sync(); } });
          k.on(stage, 'pointerleave', function () { preview = false; sync(); });
        }
        if (k.motion) gsap.from(card, { y: 24, autoAlpha: 0, duration: .3, ease: 'power2.out', delay: ci * .05, scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
      });
    } },

    b1: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.services__head > *'));
      root.querySelectorAll('.services1__card').forEach(function (card, ci) {
        var def = ASM[card.dataset.asm], svg = card.querySelector('.services1__svg'), stage = card.querySelector('.services1__stage');
        var A = buildAsm(svg, def), st = { p: k.motion ? 0 : 1, mx: 0 }, tw = null;
        k.add(function () { svg.innerHTML = ''; svg.removeAttribute('viewBox'); });
        function render() {
          A.layers.forEach(function (g, i) {
            var o = def.gap * i * st.p, m = st.mx * .3 * i * 6;
            g.setAttribute('transform', 'translate(' + (def.dir[0] * o + m).toFixed(1) + ' ' + (def.dir[1] * o).toFixed(1) + ')');
          });
          A.labs.forEach(function (l) { l.setAttribute('opacity', EZ.clamp((st.p - .35) / .5, 0, 1).toFixed(2)); });
        }
        render();
        function to(p) {
          stage.setAttribute('aria-expanded', p > 0 ? 'true' : 'false');
          if (!k.motion) return;
          if (tw) tw.kill();
          var opening = p > st.p;
          tw = gsap.to(st, { p: p, duration: opening ? Math.max(.35, Math.abs(p - st.p)) : .6, ease: opening ? 'power2.out' : 'expo.out', onUpdate: render });
        }
        stage.setAttribute('aria-expanded', k.motion ? 'false' : 'true');
        k.on(stage, 'click', function () { to(stage.getAttribute('aria-expanded') === 'true' ? 0 : 1); });
        if (!k.motion) return;
        if (k.fine) {
          k.on(card, 'pointerenter', function () { to(1); });
          k.on(card, 'pointerleave', function () { to(0); gsap.to(st, { mx: 0, duration: .6, ease: 'expo.out', onUpdate: render }); });
          k.on(stage, 'pointermove', function (e) {          // magnet .3: layers lean toward the pointer, more the higher they sit
            var r = stage.getBoundingClientRect();
            gsap.to(st, { mx: (e.clientX - r.left) / r.width - .5, duration: .4, ease: 'power3.out', onUpdate: render, overwrite: 'auto' });
          });
        } else {
          ScrollTrigger.create({ trigger: stage, start: 'top 60%', end: 'bottom 30%', onToggle: function (s) { to(s.isActive ? 1 : 0); } });
        }
        gsap.from(card, { y: 24, autoAlpha: 0, duration: .3, ease: 'power2.out', delay: ci * .05, scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
      });
    } },

    /* v2 · The drawing set [BANK R45 stacking cards via CSS sticky] */
    2: { init: function (root, k) {
      var sheets = root.querySelectorAll('.services2__sheet');
      EZ.reveal(k, root.querySelectorAll('.services__head > *'));
      sheets.forEach(function (sh, i) { sh.style.setProperty('--i', i); });
      k.add(function () { sheets.forEach(function (sh) { sh.style.removeProperty('--i'); }); });
      root.querySelectorAll('.services2__toggle').forEach(function (b) {
        var sc = document.getElementById(b.getAttribute('aria-controls')), label = b.querySelector('.btn__label');
        sc.classList.add('is-shut');
        k.add(function () { sc.classList.remove('is-shut'); sc.style.clipPath = ''; b.setAttribute('aria-expanded', 'false'); label.textContent = 'Open the scope'; });
        k.on(b, 'click', function () {
          var open = b.getAttribute('aria-expanded') !== 'true';
          b.setAttribute('aria-expanded', open ? 'true' : 'false');
          label.textContent = open ? 'Close the scope' : 'Open the scope';
          if (open) {
            sc.classList.remove('is-shut');
            if (k.motion) {                         // curtain wipe, top to bottom [S0211 toggle-curtain]
              k.ctx.add(function () {
                gsap.fromTo(sc.querySelectorAll('li'), { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0, duration: .3, stagger: .025, ease: 'power2.out' });
              });
              EZ.clip(k, sc, [0, 0, 100, 0], [0, 0, 0, 0], { duration: .3, ease: 'power3.out', onComplete: function () { sc.style.clipPath = ''; } });
            }
          } else sc.classList.add('is-shut');
        });
      });
      if (!k.motion || k.mobile) return;
      // the sheet underneath recedes as the next one lands on it
      sheets.forEach(function (sh, i) {
        var next = sheets[i + 1];
        if (!next) return;
        gsap.fromTo(sh.querySelector('.services2__frame'), { scale: 1, filter: 'brightness(1)' }, { scale: .95, filter: 'brightness(.82)', ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top ' + (90 + i * 18) + 'px', scrub: true } });
      });
      sheets.forEach(function (sh) {
        gsap.from(sh.querySelector('.services2__photo img'), { scale: 1.12, ease: 'none', scrollTrigger: { trigger: sh, start: 'top bottom', end: 'top 30%', scrub: true } });
      });
    } },

    /* v3 · The tool wall */
    3: { init: function (root, k) {
      var wall = root.querySelector('.services3__wall'), svg = root.querySelector('.services3__board');
      var rows = Array.prototype.slice.call(root.querySelectorAll('.services3__row'));
      var W = 600, H = 500, SP = 25, holes = [];
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      var h = '<rect class="hb" x="0" y="0" width="' + W + '" height="' + H + '"/>';
      for (var y = SP; y < H; y += SP) for (var x = SP; x < W; x += SP) h += '<circle class="hole" cx="' + x + '" cy="' + y + '" r="3.4"/>';
      h += '<rect class="frm" x="5" y="5" width="' + (W - 10) + '" height="' + (H - 10) + '"/>';
      // tools hang from hooks [BANK 91: hammer strike, trowel sweep, cabinet door swing]
      h += '<g class="tool" data-t="0"><path class="hook" d="M100 75v14q0 8 8 8"/><path class="hook" d="M175 75v14q0 8 -8 8"/>' +
        '<g class="door"><rect x="86" y="95" width="104" height="160" fill="#2a5d61" stroke="#121212" stroke-width="3"/><rect x="102" y="111" width="72" height="128" fill="#FF5F00" stroke="#121212" stroke-width="2.5"/><rect x="170" y="170" width="6" height="26" rx="3" fill="#FFC29A" stroke="#121212" stroke-width="1.5"/></g>' +
        '<rect x="80" y="118" width="8" height="18" fill="#C9C1B6" stroke="#121212" stroke-width="1.5"/><rect x="80" y="214" width="8" height="18" fill="#C9C1B6" stroke="#121212" stroke-width="1.5"/></g>';
      h += '<g class="tool" data-t="1"><path class="hook" d="M300 75v22"/><g class="trowel"><rect x="291" y="96" width="18" height="46" rx="8" fill="#FF9A5C" stroke="#121212" stroke-width="2.5"/><path d="M300 142v22" stroke="#121212" stroke-width="4"/>' +
        '<path d="M250 164h100v58l-6 0v-8h-8v8h-8v-8h-8v8h-8v-8h-8v8h-8v-8h-8v8h-8v-8h-8v8h-8v-8h-8v8h-8v-8h-8v8h-6z" fill="#C9C1B6" stroke="#121212" stroke-width="2.5" stroke-linejoin="round"/></g></g>';
      h += '<g class="tool" data-t="2"><path class="hook" d="M440 75v20"/><path class="hook" d="M520 75v20"/><g class="hammer"><rect x="472" y="88" width="16" height="170" rx="6" fill="#FF9A5C" stroke="#121212" stroke-width="2.5"/>' +
        '<path d="M430 92h88l10 8v22h-98q-12 -6 -14 -18q4 -10 14 -12z" fill="#C9C1B6" stroke="#121212" stroke-width="2.5" stroke-linejoin="round"/><path d="M528 100q22 -2 30 16q-16 -6 -30 -2z" fill="#C9C1B6" stroke="#121212" stroke-width="2.5"/></g>' +
        '<g class="nail"><path d="M560 330v-26" stroke="#C9C1B6" stroke-width="4"/><rect x="552" y="300" width="16" height="5" fill="#C9C1B6" stroke="#121212" stroke-width="1.5"/></g></g>';
      svg.innerHTML = h;
      holes = Array.prototype.slice.call(svg.querySelectorAll('.hole')).map(function (c) { return { el: c, x: +c.getAttribute('cx'), y: +c.getAttribute('cy'), dx: 0, dy: 0 }; });
      k.add(function () { svg.innerHTML = ''; });
      var tools = svg.querySelectorAll('.tool');
      var anims = [
        function () { return gsap.timeline().to(svg.querySelector('.door'), { scaleX: .18, svgOrigin: '86 175', duration: .45, ease: 'power2.inOut' }).to(svg.querySelector('.door'), { scaleX: 1, svgOrigin: '86 175', duration: .7, ease: 'elastic.out(1,.5)' }); },
        function () { return gsap.timeline().to(svg.querySelector('.trowel'), { rotation: -20, svgOrigin: '300 97', duration: .25, ease: 'power2.out' }).to(svg.querySelector('.trowel'), { rotation: 20, svgOrigin: '300 97', duration: .45, ease: 'sine.inOut' }).to(svg.querySelector('.trowel'), { rotation: 0, svgOrigin: '300 97', duration: .6, ease: 'elastic.out(1,.4)' }); },
        function () { return gsap.timeline().to(svg.querySelector('.hammer'), { rotation: -34, svgOrigin: '480 250', duration: .22, ease: 'power2.out' }).to(svg.querySelector('.hammer'), { rotation: 8, svgOrigin: '480 250', duration: .12, ease: 'power4.in' }).to(svg.querySelector('.nail'), { y: 10, duration: .06 }, '<+.1').to(svg.querySelector('.hammer'), { rotation: 0, svgOrigin: '480 250', duration: .4, ease: 'back.out(3)' }); }
      ];
      var current = -1, running = null;
      function pick(i, play) {
        current = i;
        rows.forEach(function (r, j) { r.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
        tools.forEach(function (t, j) { t.classList.toggle('is-dim', i > -1 && j !== i); });
        if (play && k.motion) { if (running) running.progress(1); gsap.set(svg.querySelector('.nail'), { y: 0 }); k.ctx.add(function () { running = anims[i](); }); }
      }
      rows.forEach(function (r, i) {
        k.on(r, 'click', function () { pick(i, true); });
        k.on(r, 'pointerenter', function (e) { if (e.pointerType === 'mouse' && current !== i) pick(i, true); });
        k.on(r, 'focus', function () { if (current !== i) pick(i, true); });
      });
      k.add(function () { rows.forEach(function (r) { r.setAttribute('aria-pressed', 'false'); }); });
      if (!k.motion) return;
      EZ.reveal(k, root.querySelectorAll('.services3__side > *'));
      gsap.from(tools, { y: -20, autoAlpha: 0, duration: .3, ease: 'back.out(2)', stagger: .06, scrollTrigger: { trigger: wall, start: 'top 75%', once: true } });
      gsap.from(root.querySelectorAll('.services3__tags span'), { y: -10, autoAlpha: 0, duration: .25, ease: 'back.out(2)', stagger: .03, scrollTrigger: { trigger: wall, start: 'top 70%', once: true } });
      // phones: the tools take one turn each as the wall comes into view, then stop (no motion runs past 5s unasked)
      if (!k.fine) {
        var n = 0, t = null;
        k.io(wall, function (en) { clearInterval(t); if (en.isIntersecting && n < 3) { pick(n++, true); t = setInterval(function () { if (n >= 3) { clearInterval(t); return; } pick(n++, true); }, 1600); } }, { threshold: .5 });
        k.add(function () { clearInterval(t); });
        return;
      }
      // grid-magnetic holes [S0634: radius 100, pull .3]
      var px = -999, py = -999, inside = false;
      var loop = k.raf(function (dt) {
        var moving = false, R = 100, kf = 1 - Math.pow(1 - .2, dt * 60);
        for (var i = 0; i < holes.length; i++) {
          var o = holes[i], tx = 0, ty = 0;
          if (inside) { var dx = px - o.x, dy = py - o.y, d = Math.sqrt(dx * dx + dy * dy); if (d < R) { var f = .3 * (1 - d / R); tx = dx * f; ty = dy * f; } }
          var nx = o.dx + (tx - o.dx) * kf, ny = o.dy + (ty - o.dy) * kf;
          if (Math.abs(nx - o.dx) > .02 || Math.abs(ny - o.dy) > .02) { moving = true; o.dx = nx; o.dy = ny; o.el.setAttribute('transform', 'translate(' + nx.toFixed(2) + ' ' + ny.toFixed(2) + ')'); }
        }
        if (!moving && !inside) return false;
      });
      loop.stop();
      k.on(wall, 'pointermove', function (e) { var r = wall.getBoundingClientRect(); px = (e.clientX - r.left) / r.width * W; py = (e.clientY - r.top) / r.height * H; inside = true; loop.start(); });
      k.on(wall, 'pointerleave', function () { inside = false; loop.start(); });
    } }
  });
})();
