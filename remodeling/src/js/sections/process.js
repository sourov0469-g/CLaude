/* process, PLAN-V3 §3. Stages and week marks from FACTS.md (data/stages.json). */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  function f(n) { return Math.round(n * 10) / 10; }
  var TRUCK = '<g class="truck"><rect x="-26" y="-9" width="30" height="13" rx="2" fill="#f2c230" stroke="#0B1418" stroke-width="2"/>' +
    '<path d="M4 4 V-9 h11 l8 8 V4 Z" fill="#77b3b8" stroke="#0B1418" stroke-width="2" stroke-linejoin="round"/><path d="M8 -6 h6 l5 5 h-11 Z" fill="#dff1f3" stroke="#0B1418" stroke-width="1.2"/>' +
    '<circle cx="-16" cy="6" r="5" fill="#0B1418"/><circle cx="-16" cy="6" r="2" fill="#c9d1d3"/><circle cx="13" cy="6" r="5" fill="#0B1418"/><circle cx="13" cy="6" r="2" fill="#c9d1d3"/>' +
    '<rect x="-24" y="-15" width="8" height="6" fill="#c9a46a" stroke="#0B1418" stroke-width="1.2"/><rect x="-14" y="-15" width="8" height="6" fill="#c9a46a" stroke="#0B1418" stroke-width="1.2"/></g>';

  var ICONS = [
    '<rect class="s" x="10" y="8" width="20" height="27" rx="2"/><rect class="f" x="15" y="5" width="10" height="6" rx="1.5"/><path class="s" d="M15 18h10M15 23h10M15 28h6"/>',
    '<circle class="s" cx="17" cy="16" r="9"/><path class="s" d="M24 23l8 8"/><path class="s" d="M4 35q4 -4 8 0t8 0t8 0t8 0" stroke="#5aa8d6"/>',
    '<path class="s" d="M7 33V7h6v20h20v6z"/><path class="f" d="M30 6l4 4l-15 15l-6 2l2-6z"/>',
    '<path class="s" d="M10 5h14l7 7v23H10z"/><path class="s" d="M24 5v7h7M15 19h11M15 24h11"/><path class="s" d="M15 30l3 3l6-7" stroke="#7fd18b"/>',
    '<rect class="f" x="9" y="24" width="22" height="7" rx="1"/><path class="s" d="M16 24v-8h8v8M14 16h12a0 0 0 0 0 0 0v-5a6 6 0 0 0-12 0z"/><path class="s" d="M7 35h26" stroke="#e2412b"/>',
    '<path class="f" d="M6 10h18l4 3v5H8q-4-2-4-5z"/><path class="s" d="M17 18v18"/>',
    '<rect class="s" x="4" y="16" width="32" height="9" rx="2"/><rect class="f" x="15" y="18" width="10" height="5" rx="2.5"/><path class="s" d="M14 8l4 4l8-8" stroke="#7fd18b"/>',
    '<circle class="f" cx="13" cy="20" r="7"/><circle cx="13" cy="20" r="2.4" fill="#0B1418"/><path class="s" d="M20 20h15M30 20v5M34 20v4"/>'
  ];

  EZ.section('process', {
    /* v1 · The site route */
    1: { init: function (root, k) {
      var route = root.querySelector('.process1__route'), svg = root.querySelector('.process1__svg');
      var cards = Array.prototype.slice.call(root.querySelectorAll('.process1__st'));
      EZ.reveal(k, root.querySelectorAll('.process__head > *'));
      var path, bg, truck, st = { p: k.motion ? 0 : 1 };
      function build() {
        var W = route.clientWidth, H = route.clientHeight, rr = route.getBoundingClientRect();
        if (!W) return;
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        var mob = EZ.mobile(), pts = [];
        cards.forEach(function (c, i) {
          var r = c.getBoundingClientRect(), y = r.top - rr.top + r.height / 2;
          var x = mob ? 18 + (i % 2 ? 8 : -8) : W / 2 + (i % 2 ? 1 : -1) * W * .06;
          pts.push([x, y, mob ? 46 : (i % 2 ? r.left - rr.left : r.right - rr.left)]);
        });
        var d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1] - 80), stakes = '';
        var prev = [pts[0][0], pts[0][1] - 80];
        pts.forEach(function (p) {
          var dy = p[1] - prev[1];
          d += 'C' + f(prev[0]) + ' ' + f(prev[1] + dy * .55) + ' ' + f(p[0]) + ' ' + f(p[1] - dy * .45) + ' ' + f(p[0]) + ' ' + f(p[1]);
          prev = p;
          stakes += '<g class="stake"><path d="M' + f(p[0]) + ' ' + f(p[1]) + 'H' + f(p[2]) + '" stroke-dasharray="3 5" style="stroke:var(--line-soft);stroke-width:1.5"/><path d="M' + f(p[0]) + ' ' + f(p[1] - 9) + 'v18"/></g>';
        });
        d += 'C' + f(prev[0]) + ' ' + f(prev[1] + 60) + ' ' + f(prev[0]) + ' ' + f(prev[1] + 60) + ' ' + f(prev[0]) + ' ' + f(prev[1] + 90);
        svg.innerHTML = '<path class="path-bg" d="' + d + '"/>' + stakes + '<path class="path" d="' + d + '"/>' + TRUCK;
        path = svg.querySelector('.path'); bg = svg.querySelector('.path-bg'); truck = svg.querySelector('.truck');
        set();
      }
      function set() {
        if (!path) return;
        gsap.set(path, { drawSVG: '0% ' + (st.p * 100) + '%' });
        gsap.set(truck, { motionPath: { path: bg, align: bg, alignOrigin: [.5, .5], autoRotate: true, start: 0, end: Math.max(.0001, st.p) } });
      }
      k.ro(route, build);
      build();
      k.add(function () { svg.innerHTML = ''; cards.forEach(function (c) { c.classList.remove('is-on'); }); });
      if (!k.motion) { cards.forEach(function (c) { c.classList.add('is-on'); }); return; }
      gsap.to(st, { p: 1, ease: 'none', onUpdate: set, scrollTrigger: { trigger: route, start: 'top 62%', end: 'bottom 62%', scrub: .6 } });
      cards.forEach(function (c) {
        ScrollTrigger.create({ trigger: c, start: 'center 62%', onEnter: function () { c.classList.add('is-on'); }, onLeaveBack: function () { c.classList.remove('is-on'); } });
        gsap.from(c, { y: 30, autoAlpha: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 88%', once: true } });
      });
    } },

    /* v2 · The house builds itself */
    2: { init: function (root, k) {
      var svg = root.querySelector('.process2__svg'), items = Array.prototype.slice.call(root.querySelectorAll('.process2__st'));
      var indN = root.querySelector('.process2__ind-n'), indW = root.querySelector('.process2__ind-w');
      var S = (window.__DATA || {}).stages || [];
      EZ.reveal(k, root.querySelectorAll('.process__head > *'));
      var studs = '', hatch = '', truss = '';
      for (var x = 160; x <= 440; x += 28) studs += 'M' + x + ' 236V398';
      for (var hx = 0; hx < 600; hx += 18) hatch += 'M' + hx + ' 404l-14 14';
      for (var tx = 175; tx < 450; tx += 50) truss += 'M' + tx + ' 230L' + (tx < 300 ? 300 - (300 - tx) * .0 : tx) + ' ' + f(230 - (tx < 300 ? (tx - 150) : (450 - tx)) * .8);
      var L = [
        // 0 consultation: stakes and string line
        '<path class="dash" d="M150 400H450"/>' + [150, 250, 350, 450].map(function (x) { return '<rect class="wood" x="' + (x - 3) + '" y="380" width="6" height="26"/>'; }).join(''),
        // 1 site evaluation: soil section, flood line, wind
        '<path class="thin" d="' + hatch + '"/><path class="ln" d="M0 404H600"/><path class="water" d="M0 386q25-8 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0V404H0z"/>' +
          '<path class="ln" d="M40 120h70m-12-8l12 8l-12 8M30 150h90m-12-8l12 8l-12 8M50 180h60m-12-8l12 8l-12 8" stroke="#9fc3df"/>',
        // 2 design: dashed outline of the house
        '<path class="dash" d="M150 400V230H450V400M136 236L300 106L464 236"/><path class="thin" d="M150 420H450M150 414v12M450 414v12"/><text class="lbl" x="300" y="440" text-anchor="middle">300</text>',
        // 3 proposal and scope: the written scope
        '<rect class="paper" x="28" y="236" width="92" height="124"/><path class="thin" d="M40 256h68M40 272h68M40 288h60M40 304h68M40 320h44" style="stroke:#6a787b"/><path d="M40 344q10-12 18 0t18-2t14 2" fill="none" stroke="#1d4a4e" stroke-width="2"/>',
        // 4 permitting: card nailed to a post
        '<rect class="wood" x="514" y="280" width="10" height="124"/><rect class="permit" x="488" y="288" width="62" height="48"/><path d="M496 300h46M496 310h46M496 320h30" stroke="#0B1418" stroke-width="1.6"/><circle cx="519" cy="292" r="2.5" fill="#0B1418"/>',
        // 5 construction: framing and trusses
        '<path class="ln" d="' + studs + '" stroke="#c9a46a" style="stroke:#c9a46a;stroke-width:4"/><path class="ln" d="M150 236H450M150 398H450" style="stroke:#c9a46a;stroke-width:5"/>' +
          '<path class="ln" d="M140 234L300 108L460 234Z M300 108V234 M220 234L300 172L380 234" style="stroke:#c9a46a;stroke-width:4"/>',
        // 6 quality review: finishes, windows and the punch list ticked
        '<path d="M152 238H448V398H152Z" fill="rgba(236,232,223,.92)"/><path d="M140 234L300 108L460 234Z" fill="#3b4a50" stroke="#0B1418" stroke-width="2"/>' +
          '<rect class="glass" x="182" y="270" width="56" height="50"/><rect class="glass" x="362" y="270" width="56" height="50"/><rect x="276" y="300" width="48" height="98" fill="#1d4a4e" stroke="#0B1418" stroke-width="2"/>' +
          '<path class="tick" d="M196 340l8 8l14-16M376 340l8 8l14-16"/>',
        // 7 handover: the door opens, the lights are on, the keys are handed over
        '<path d="M276 300H324V398H276Z" fill="#fff1b8"/><path d="M276 300L300 306V404L276 398Z" fill="#1d4a4e" stroke="#0B1418" stroke-width="2"/><rect x="182" y="270" width="56" height="50" fill="#ffe08a" opacity=".85"/><rect x="362" y="270" width="56" height="50" fill="#ffe08a" opacity=".85"/>' +
          '<g transform="translate(340 352)"><circle r="8" fill="#f2c230" stroke="#0B1418" stroke-width="2"/><path d="M8 0h18M20 0v6M24 0v5" stroke="#f2c230" stroke-width="3" stroke-linecap="round"/></g>'
      ];
      svg.innerHTML = '<path class="ln" d="M0 404H600" opacity=".35"/>' + L.map(function (s, i) { return '<g class="L" data-i="' + i + '">' + s + '</g>'; }).join('');
      var groups = svg.querySelectorAll('.L');
      k.add(function () { svg.innerHTML = ''; root.classList.remove('is-live'); items.forEach(function (it) { it.classList.remove('is-on'); }); });
      var cur = -1;
      function set(i) {
        if (i === cur) return;
        var prev = cur;
        cur = i;
        items.forEach(function (it, j) { it.classList.toggle('is-on', j === i); });
        indN.textContent = (i < 9 ? '0' : '') + (i + 1);
        if (S[i]) indW.innerHTML = S[i].w;
        groups.forEach(function (g, j) {
          var on = j <= i;
          if (!k.motion) { g.style.opacity = on ? 1 : 0; return; }
          if (on && j > prev) {
            k.ctx.add(function () {
              gsap.fromTo(g, { autoAlpha: 0, y: j === 7 ? 0 : -14 }, { autoAlpha: 1, y: 0, duration: .55, ease: 'back.out(1.6)', overwrite: 'auto' });
              var lines = g.querySelectorAll('.ln, .dash, .thin');
              if (lines.length) gsap.fromTo(lines, { drawSVG: '0%' }, { drawSVG: '100%', duration: .8, ease: 'power2.out', stagger: .05 });
            });
          } else if (!on) {
            k.ctx.add(function () { gsap.to(g, { autoAlpha: 0, duration: .25, overwrite: 'auto' }); });
          }
        });
      }
      if (!k.motion) { set(7); groups.forEach(function (g) { g.style.opacity = 1; }); return; }
      root.classList.add('is-live');
      gsap.set(groups, { autoAlpha: 0 });
      set(0);
      // [BANK 153] the indicator moves at 25% into each step; a step exits at i + .75
      items.forEach(function (it, i) {
        ScrollTrigger.create({ trigger: it, start: 'top 60%', end: 'bottom 60%', onToggle: function (s) { if (s.isActive) set(i); } });
      });
    } },

    /* v3 · Measured in weeks */
    3: { init: function (root, k) {
      var S = (window.__DATA || {}).stages || [];
      var P3RX = ['speech', 'magnifier', 'sketch', 'ledger', 'badge', 'sawhorse', 'check', 'flag'];
      var nav = root.querySelector('.process3__nav'), tape = root.querySelector('.process3__tape'), svg = root.querySelector('.process3__svg');
      var panel = root.querySelector('.process3__panel');
      var no = root.querySelector('.process3__no'), t = root.querySelector('.process3__t'), w = root.querySelector('.process3__w'), d = root.querySelector('.process3__d');
      EZ.reveal(k, root.querySelectorAll('.process__head > *'));
      function wk(n) { return n / 12 * .62; }
      var R = [[0, wk(1)], [0, wk(2)], [wk(1), wk(5)], [wk(4), wk(6)], [wk(5), wk(12)], [.62, .8], [.8, .9], [.9, 1]];
      nav.innerHTML = S.map(function (s, i) {
        return '<button type="button" role="tab" class="process3__ic" id="p3t' + i + '" aria-selected="' + (i ? 'false' : 'true') + '" tabindex="' + (i ? -1 : 0) + '" data-rx="~' + P3RX[i] + '/peek/hop/t"><svg viewBox="0 0 40 40" aria-hidden="true">' + ICONS[i] + '</svg><span class="process3__ic-t">' + s.t + '</span></button>';
      }).join('');
      var tabs = Array.prototype.slice.call(nav.querySelectorAll('.process3__ic'));
      k.add(function () { nav.innerHTML = ''; svg.innerHTML = ''; });
      var G = null, cur = 0, rs = { a: R[0][0], b: R[0][1] };
      function drawTape() {
        var Wd = tape.clientWidth, H = tape.clientHeight;
        if (!Wd) return;
        svg.setAttribute('viewBox', '0 0 ' + Wd + ' ' + H);
        var x0 = 64, Lw = Wd - x0 - 14, by = H * .42, bh = H * .3, tk = '', tn = '';
        for (var n = 0; n <= 12; n++) { var x = x0 + wk(n) * Lw; tk += 'M' + f(x) + ' ' + f(by) + 'v' + f(bh * .55); if (n) tn += '<text class="tn" x="' + f(x - 3) + '" y="' + f(by + bh - 4) + '" text-anchor="end">' + n + '</text>'; }
        for (var q = 0; q < 48; q++) { var xq = x0 + wk(q / 4) * Lw; tk += 'M' + f(xq) + ' ' + f(by) + 'v' + f(bh * .22); }
        [[.62, 'BUILD: VARIES'], [.8, 'FINAL 1&ndash;2 WK'], [.9, 'CLOSEOUT']].forEach(function (s) { var xs = x0 + s[0] * Lw; tk += 'M' + f(xs) + ' ' + f(by) + 'v' + f(bh); tn += '<text class="seg" x="' + f(xs + 6) + '" y="' + f(by + bh * .62) + '">' + s[1] + '</text>'; });
        var ghostN = '';
        for (var gn = 1; gn <= 12; gn++) ghostN += '<text class="gn" x="' + f(x0 + wk(gn) * Lw - 3) + '" y="' + f(by - 6) + '" text-anchor="end">' + gn + '</text>';
        svg.innerHTML = '<rect class="ghost" x="' + x0 + '" y="' + f(by) + '" width="' + Lw + '" height="' + f(bh) + '"/>' + ghostN + '<defs><clipPath id="p3clip"><rect class="clip" x="' + x0 + '" y="0" width="' + Lw + '" height="' + H + '"/></clipPath></defs>' +
          '<g clip-path="url(#p3clip)"><rect class="blade" x="' + x0 + '" y="' + f(by) + '" width="' + Lw + '" height="' + f(bh) + '"/><path class="tk" d="' + tk + '"/>' + tn + '</g>' +
          '<rect class="rng" x="0" y="' + f(by - 8) + '" width="0" height="' + f(bh + 16) + '"/><text class="rng-l" x="0" y="' + f(by - 16) + '" text-anchor="middle"></text>' +
          '<path class="hook" d="M0 ' + f(by - 6) + 'h6v' + f(bh + 12) + 'h-6z"/><rect class="case" x="2" y="' + f(by - bh * .9) + '" width="64" height="' + f(bh * 2.8) + '" rx="12"/><rect class="grip" x="14" y="' + f(by + bh * .5 - 8) + '" width="36" height="16" rx="4"/>';
        G = { x0: x0, Lw: Lw, clip: svg.querySelector('.clip'), rng: svg.querySelector('.rng'), lbl: svg.querySelector('.rng-l'), hook: svg.querySelector('.hook') };
        paint();
      }
      function paint() {
        if (!G) return;
        var xa = G.x0 + rs.a * G.Lw, xb = G.x0 + rs.b * G.Lw;
        G.clip.setAttribute('width', Math.max(4, xb - G.x0 + 2));
        G.hook.setAttribute('transform', 'translate(' + f(xb) + ' 0)');
        G.rng.setAttribute('x', f(xa)); G.rng.setAttribute('width', f(Math.max(4, xb - xa)));
        G.lbl.setAttribute('x', f((xa + xb) / 2));
      }
      k.ro(tape, drawTape);
      drawTape();
      function text(i) { no.textContent = '0' + (i + 1) + ' / 08'; t.textContent = S[i].t; w.innerHTML = S[i].w; d.textContent = S[i].d.replace(/&ndash;/g, '–'); if (G) G.lbl.innerHTML = S[i].w; }
      text(0);
      function select(i, focus) {
        i = (i + 8) % 8;
        if (i === cur) { if (focus) tabs[i].focus(); return; }
        cur = i;
        tabs.forEach(function (b, j) { b.setAttribute('aria-selected', j === i ? 'true' : 'false'); b.tabIndex = j === i ? 0 : -1; });
        if (focus) tabs[i].focus();
        if (!k.motion) { rs.a = R[i][0]; rs.b = R[i][1]; paint(); text(i); return; }
        k.ctx.add(function () {
          // zoom-through swap [S0536]: out 1 -> 1.2 + blur .2s power3.in, hard swap at peak, in .75 -> 1 .5s expo.out
          var parts = [no, t, w, d];
          gsap.timeline()
            .to(parts, { scale: 1.2, filter: 'blur(10px)', opacity: .15, duration: .2, ease: 'power3.in', transformOrigin: '0% 50%' })
            .add(function () { text(i); })
            .fromTo(parts, { scale: .75, filter: 'blur(10px)', opacity: .15 }, { scale: 1, filter: 'blur(0px)', opacity: 1, duration: .5, ease: 'expo.out', stagger: .03 });
          gsap.to(rs, { a: R[i][0], b: R[i][1], duration: .7, ease: 'back.out(1.2)', onUpdate: paint });
        });
      }
      tabs.forEach(function (b, i) {
        k.on(b, 'click', function () { select(i); });
        k.on(b, 'keydown', function (e) {
          var dd = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
          if (e.key === 'Home') { e.preventDefault(); select(0, true); } else if (e.key === 'End') { e.preventDefault(); select(7, true); }
          else if (dd) { e.preventDefault(); select(i + dd, true); }
        });
      });
      k.on(root.querySelector('.process3__prev'), 'click', function () { select(cur - 1); });
      k.on(root.querySelector('.process3__next'), 'click', function () { select(cur + 1); });
      if (!k.motion) return;
      gsap.from(tabs, { y: 20, autoAlpha: 0, duration: .5, ease: 'power3.out', stagger: .05, scrollTrigger: { trigger: nav, start: 'top 85%', once: true } });
      var o = { b: 0 };
      gsap.fromTo(rs, { b: 0 }, { b: R[0][1], duration: .9, ease: 'expo.out', onUpdate: paint, scrollTrigger: { trigger: tape, start: 'top 80%', once: true } });
    } }
  });
})();
