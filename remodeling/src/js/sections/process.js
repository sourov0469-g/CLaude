/* process: the eight published stages and week marks from FACTS.md (data/stages.json).
   v1 site-plan route (Q54 curved path), v2 a house that builds itself (S1340), v3 a swipe deck (S1443). */
(function () {
  function f(n) { return Math.round(n * 10) / 10; }
  function S() { return (window.__DATA || {}).stages || []; }
  function plain(html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent; }
  var TRUCK = '<g class="truck"><rect x="-26" y="-9" width="30" height="13" rx="2" fill="#f2c230" stroke="#0B1418" stroke-width="2"/>' +
    '<path d="M4 4 V-9 h11 l8 8 V4 Z" fill="#77b3b8" stroke="#0B1418" stroke-width="2" stroke-linejoin="round"/><path d="M8 -6 h6 l5 5 h-11 Z" fill="#dff1f3" stroke="#0B1418" stroke-width="1.2"/>' +
    '<circle cx="-16" cy="6" r="5" fill="#0B1418"/><circle cx="-16" cy="6" r="2" fill="#c9d1d3"/><circle cx="13" cy="6" r="5" fill="#0B1418"/><circle cx="13" cy="6" r="2" fill="#c9d1d3"/>' +
    '<rect x="-24" y="-15" width="8" height="6" fill="#c9a46a" stroke="#0B1418" stroke-width="1.2"/><rect x="-14" y="-15" width="8" height="6" fill="#c9a46a" stroke="#0B1418" stroke-width="1.2"/></g>';
  // one drawn mark per stage (40x40): clipboard, flood gauge, set square, scope sheet, permit card, framing, level, keys
  var ICONS = [
    '<rect class="s" x="10" y="8" width="20" height="27" rx="2"/><rect class="f" x="15" y="5" width="10" height="6" rx="1.5"/><path class="s" d="M15 18h10M15 23h10M15 28h6"/>',
    '<circle class="s" cx="17" cy="16" r="9"/><path class="s" d="M24 23l8 8"/><path class="s w" d="M4 35q4 -4 8 0t8 0t8 0t8 0"/>',
    '<path class="s" d="M7 33V7h6v20h20v6z"/><path class="f" d="M30 6l4 4l-15 15l-6 2l2-6z"/>',
    '<path class="s" d="M10 5h14l7 7v23H10z"/><path class="s" d="M24 5v7h7M15 19h11M15 24h11"/><path class="s g" d="M15 30l3 3l6-7"/>',
    '<rect class="f" x="9" y="24" width="22" height="7" rx="1"/><path class="s" d="M16 24v-8h8v8M14 16h12v-5a6 6 0 0 0-12 0z"/><path class="s r" d="M7 35h26"/>',
    '<path class="s" d="M6 36V16l14-10 14 10v20M6 16h28M13 36V22M20 36V22M27 36V22"/>',
    '<rect class="s" x="4" y="16" width="32" height="9" rx="2"/><rect class="f" x="15" y="18" width="10" height="5" rx="2.5"/><path class="s g" d="M14 8l4 4l8-8"/>',
    '<circle class="f" cx="13" cy="20" r="7"/><circle cx="13" cy="20" r="2.4" fill="#0B1418"/><path class="s" d="M20 20h15M30 20v5M34 20v4"/>'
  ];
  var RXS = ['speech', 'magnifier', 'sketch', 'ledger', 'badge', 'sawhorse', 'check', 'flag'];

  EZ.section('process', {
    /* v1 · On the road [Q54]: a site plan; the truck rides a path generated through the eight signposts with scroll */
    1: { init: function (root, k) {
      var plan = root.querySelector('.process1__plan'), svg = root.querySelector('.process1__svg'), list = root.querySelector('.process1__signs');
      var st = S(), road, done, truck, P = { p: k.motion ? 0 : 1 }, VW, VH, pts;
      EZ.reveal(k, root.querySelectorAll('.process__head > *'));
      list.innerHTML = st.map(function (s, i) {
        return '<li class="process1__stop" data-i="' + i + '"><button type="button" class="process1__sign" aria-expanded="false" aria-controls="p1d' + i + '" data-rx="~' + RXS[i] + '/peek/hop/t">' +
          '<span class="process1__no nums">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="process1__t">' + s.t + '</span><span class="process1__w nums">' + s.w + '</span></button>' +
          '<p class="process1__d" id="p1d' + i + '" hidden>' + s.d + '</p></li>';
      }).join('');
      var stops = Array.prototype.slice.call(list.children);
      if (EZ.bindReactions) EZ.bindReactions(root, k);
      function layout() {
        var mob = plan.clientWidth < 700;
        VW = mob ? 400 : 1200; VH = mob ? 1180 : 640;
        pts = mob ? [[200, 70], [92, 205], [308, 345], [92, 485], [308, 625], [92, 765], [308, 905], [200, 1090]]
          : [[90, 540], [250, 330], [430, 480], [575, 250], [735, 430], [880, 210], [1030, 380], [1125, 150]];
        svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
        // the road: cubic segments through the anchors, control points from Q54's multipliers (.8 / .3 / .6 / .2)
        var d = 'M' + pts[0][0] + ' ' + pts[0][1];
        for (var i = 1; i < pts.length; i++) {
          var a = pts[i - 1], b = pts[i], dx = b[0] - a[0], dy = b[1] - a[1];
          d += 'C' + f(a[0] + dx * .2) + ' ' + f(a[1] + dy * .8) + ' ' + f(b[0] - dx * .6) + ' ' + f(b[1] - dy * .3) + ' ' + b[0] + ' ' + b[1];
        }
        // the neighbourhood: lots, footprints, palms (drawn, not photographs)
        var lots = '', cols = mob ? 3 : 6, rows = mob ? 8 : 4, lw = VW / cols, lh = VH / rows;
        for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
          var x = c * lw + 8, y = r * lh + 8;
          lots += '<rect class="lot" x="' + f(x) + '" y="' + f(y) + '" width="' + f(lw - 16) + '" height="' + f(lh - 16) + '"/>';
          if ((r * 7 + c * 3) % 4 === 0) lots += '<rect class="fp" x="' + f(x + lw * .22) + '" y="' + f(y + lh * .25) + '" width="' + f(lw * .42) + '" height="' + f(lh * .4) + '"/>';
        }
        var palms = '';
        [[.06, .2], [.32, .12], [.66, .9], [.93, .7], [.5, .6]].forEach(function (q) {
          var x = q[0] * VW, y = q[1] * VH;
          palms += '<g class="palm" transform="translate(' + f(x) + ' ' + f(y) + ')"><circle r="16"/><path d="M0 0l-14-6M0 0l14-6M0 0l-10 11M0 0l10 11M0 0v-16"/></g>';
        });
        var pads = pts.map(function (p) { return '<circle class="pad" cx="' + p[0] + '" cy="' + p[1] + '" r="13"/>'; }).join('');
        var home = '<g class="home" transform="translate(' + (pts[7][0] + (mob ? 70 : 40)) + ' ' + (pts[7][1] - (mob ? 10 : 46)) + ')"><path d="M-30 10l30-24 30 24v26h-60z"/><rect class="win" x="-20" y="16" width="12" height="10"/><rect class="win" x="8" y="16" width="12" height="10"/></g>';
        svg.innerHTML = '<g class="bg">' + lots + palms + '</g><path class="road-case" d="' + d + '"/><path class="road" d="' + d + '"/><path class="road-line" d="' + d + '"/>' +
          '<path class="road-done" d="' + d + '"/>' + pads + home + TRUCK;
        road = svg.querySelector('.road'); done = svg.querySelector('.road-done'); truck = svg.querySelector('.truck');
        stops.forEach(function (li, i) {
          li.style.left = (pts[i][0] / VW * 100) + '%'; li.style.top = (pts[i][1] / VH * 100) + '%';
          li.classList.toggle('is-below', !mob && i % 2 === 0);
          li.classList.toggle('is-left', mob && pts[i][0] > 200);
        });
        fit(mob);
        set();
      }
      // keep every sign and its note inside the plan at any width (phones narrow the sign, wider screens slide it in)
      function fit(mob) {
        var W = plan.clientWidth, pad = 6;
        stops.forEach(function (li) {
          var x = li.offsetLeft, b = li.querySelector('.process1__sign');
          b.style.width = ''; li.style.removeProperty('--dx');
          if (mob) {
            var room = (li.classList.contains('is-left') ? x : W - x) - 20 - pad;
            if (room < 150) b.style.width = Math.max(110, room) + 'px';
          } else {
            var sw = b.offsetWidth, l = x - sw / 2, r = x + sw / 2;
            li.style.setProperty('--dx', (l < pad ? pad - l : r > W - pad ? W - pad - r : 0) + 'px');
          }
          var dw = mob ? Math.min(260, innerWidth * .7) : 250, dl = x - dw / 2, dr = x + dw / 2;
          li.style.setProperty('--dd', (dl < pad ? pad - dl : dr > W - pad ? W - pad - dr : 0) + 'px');
        });
      }
      function set() {
        if (!road) return;
        gsap.set(done, { drawSVG: '0% ' + (P.p * 100) + '%' });
        gsap.set(truck, { motionPath: { path: road, align: road, alignOrigin: [.5, .5], autoRotate: true, start: 0, end: Math.max(.0001, P.p) } });
        stops.forEach(function (li, i) { li.classList.toggle('is-on', P.p >= i / 7 - .01); });
        svg.classList.toggle('is-home', P.p > .995);
      }
      k.ro(plan, function () { var w = plan.clientWidth; if (w && w !== plan._w) { plan._w = w; layout(); } });
      layout();
      // a sign opens its stop (hover, focus or tap); one open at a time
      function openStop(i, on) {
        stops.forEach(function (li, j) {
          var o = on && j === i, b = li.querySelector('.process1__sign');
          li.classList.toggle('is-open', o); b.setAttribute('aria-expanded', o ? 'true' : 'false');
          li.querySelector('.process1__d').hidden = !o;
        });
      }
      stops.forEach(function (li, i) {
        var b = li.querySelector('.process1__sign');
        k.on(b, 'click', function () { openStop(i, b.getAttribute('aria-expanded') !== 'true'); });
        k.on(li, 'pointerenter', function (e) { if (e.pointerType === 'mouse') openStop(i, true); });
        k.on(li, 'pointerleave', function (e) { if (e.pointerType === 'mouse') openStop(i, false); });
        k.on(b, 'keydown', function (e) { if (e.key === 'Escape') openStop(i, false); });
      });
      k.add(function () { svg.innerHTML = ''; list.innerHTML = ''; });
      if (!k.motion) return;
      gsap.from(stops, { y: 10, autoAlpha: 0, duration: .25, ease: 'power2.out', stagger: .04, scrollTrigger: { trigger: plan, start: 'top 80%', once: true } });
      gsap.to(P, { p: 1, ease: 'none', onUpdate: set, scrollTrigger: { trigger: plan, start: 'top 70%', end: 'bottom 55%', scrub: .6 } });
    } },

    /* v2 · It builds itself [S1340]: a rising line; finished work below it, timber shoring waiting above it */
    2: { init: function (root, k) {
      var svg = root.querySelector('.process2__svg'), stage = root.querySelector('.process2__stage');
      var capNo = root.querySelector('.process2__no'), capT = root.querySelector('.process2__t'), capW = root.querySelector('.process2__w');
      var pctEl = root.querySelector('.process2__pct'), grip = root.querySelector('.process2__grip'), pipsEl = root.querySelector('.process2__pips');
      var st = S(), TOP = 150, BOT = 600, ys = st.map(function (s, i) { return BOT - (i + 1) / st.length * (BOT - TOP); });
      EZ.reveal(k, root.querySelectorAll('.process__head > *'));
      // the house, in section: footings, slab, walls, partition, door, windows, ceiling, truss roof, covering; site props
      var built =
        '<g class="soil"><rect x="0" y="560" width="1000" height="60"/></g>' +
        '<rect class="footing" x="196" y="560" width="58" height="40"/><rect class="footing" x="746" y="560" width="58" height="40"/>' +
        '<rect class="slab" x="190" y="538" width="620" height="22"/>' +
        '<rect class="wall" x="200" y="330" width="22" height="208"/><rect class="wall" x="778" y="330" width="22" height="208"/><rect class="part" x="494" y="330" width="12" height="208"/>' +
        '<rect class="win" x="270" y="396" width="110" height="72"/><path class="mull" d="M325 396v72M270 432h110"/>' +
        '<rect class="win" x="610" y="396" width="110" height="72"/><path class="mull" d="M665 396v72M610 432h110"/>' +
        '<rect class="door" x="532" y="420" width="62" height="118"/><circle class="knob" cx="582" cy="482" r="4"/>' +
        '<rect class="ceil" x="190" y="322" width="620" height="10"/>' +
        '<path class="truss" d="M170 330L500 152L830 330Z"/><path class="web" d="M260 330L335 240M335 240L420 330M420 330L500 152M500 152L580 330M580 330L665 240M665 240L740 330"/>' +
        '<path class="cover" d="M160 334L500 146L840 334"/>' +
        '<g class="stakes"><path d="M140 560v-34M860 560v-34"/><path class="flag" d="M140 528l16 5-16 5zM860 528l16 5-16 5z"/><path class="string" d="M140 532H860"/></g>' +
        '<g class="gauge"><rect x="70" y="470" width="10" height="90"/><path d="M80 480h8M80 500h12M80 520h8M80 540h12"/><path class="flood" d="M40 548h80"/></g>' +
        '<g class="permit"><rect class="post" x="900" y="460" width="8" height="100"/><rect class="card" x="878" y="452" width="52" height="40"/><path d="M886 464h36M886 472h36M886 480h22"/></g>';
      var shoring = '';
      [230, 360, 500, 640, 770].forEach(function (x, i) {
        shoring += '<rect class="prop" x="' + (x - 5) + '" y="140" width="10" height="420"/>';
        if (i < 4) shoring += '<path class="brace" d="M' + x + ' 520L' + (x + (i % 2 ? 130 : 140)) + ' 220M' + x + ' 220L' + (x + (i % 2 ? 130 : 140)) + ' 520"/>';
      });
      shoring += '<rect class="ledger" x="200" y="214" width="600" height="10"/><rect class="ledger" x="200" y="420" width="600" height="10"/>';
      svg.innerHTML = '<defs><clipPath id="p2-below"><rect class="cb" x="0" y="600" width="1000" height="40"/></clipPath><clipPath id="p2-above"><rect class="ca" x="0" y="0" width="1000" height="600"/></clipPath></defs>' +
        '<path class="ground" d="M0 560H1000"/>' +
        '<g class="shore" clip-path="url(#p2-above)">' + shoring + '</g>' +
        '<g class="built" clip-path="url(#p2-below)">' + built + '</g>' +
        '<g class="plane"><path class="line" d="M0 600H1000"/><path class="cap" d="M190 600H810"/></g>';
      var cb = svg.querySelector('.cb'), ca = svg.querySelector('.ca'), planeG = svg.querySelector('.plane');
      pipsEl.innerHTML = st.map(function (s, i) {
        return '<button type="button" class="process2__pip" data-i="' + i + '" data-rx="~' + RXS[i] + '/pop/flash/t" aria-label="Stage ' + (i + 1) + ': ' + plain(s.t) + '"><span class="nums">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="process2__pt">' + s.t + '</span></button>';
      }).join('');
      var pips = Array.prototype.slice.call(pipsEl.children);
      if (EZ.bindReactions) EZ.bindReactions(root, k);
      var Y = { y: BOT }, cur = -1;
      function render() {
        var y = EZ.clamp(Y.y, TOP, BOT);
        cb.setAttribute('y', y); cb.setAttribute('height', 640 - y);
        ca.setAttribute('height', y);
        planeG.setAttribute('transform', 'translate(0 ' + (y - 600) + ')');
        grip.style.top = (y / 620 * 100) + '%';
        var n = 0; ys.forEach(function (t) { if (y <= t + .5) n++; });
        var idx = Math.max(0, n - 1);
        if (idx !== cur) {
          cur = idx;
          capNo.textContent = (idx < 9 ? '0' : '') + (idx + 1); capT.innerHTML = st[idx].t; capW.innerHTML = st[idx].w;
          pips.forEach(function (p, j) { p.setAttribute('aria-pressed', j === idx ? 'true' : 'false'); p.classList.toggle('is-done', j < n); });
        }
        pctEl.textContent = Math.round((BOT - y) / (BOT - TOP) * 100) + '%';
        stage.classList.toggle('is-done', y <= TOP + .5);
      }
      var auto = null;
      function go(i, dur) {
        if (auto) { auto.kill(); auto = null; }
        if (!k.motion) { Y.y = ys[i]; render(); return; }
        gsap.to(Y, { y: ys[i], duration: dur == null ? .5 : dur, ease: 'power2.inOut', onUpdate: render, overwrite: true });
      }
      pips.forEach(function (p, i) { k.on(p, 'click', function () { go(i); }); });
      // drag the line (S1340's scrub), or step it with the keys
      var dragging = false;
      function yAt(e) { var r = svg.getBoundingClientRect(); return (e.clientY - r.top) / r.height * 620; }
      k.on(grip, 'pointerdown', function (e) { dragging = true; if (auto) { auto.kill(); auto = null; } gsap.killTweensOf(Y); try { grip.setPointerCapture(e.pointerId); } catch (er) {} e.preventDefault(); });
      k.on(grip, 'pointermove', function (e) { if (dragging) { Y.y = EZ.clamp(yAt(e), TOP, BOT); render(); } });
      k.on(grip, 'pointerup', function () { dragging = false; });
      k.on(grip, 'pointercancel', function () { dragging = false; });
      k.on(grip, 'keydown', function (e) {
        var d = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return; e.preventDefault();
        go(EZ.clamp(cur + d, 0, st.length - 1), .3);
      });
      k.add(function () { svg.innerHTML = ''; pipsEl.innerHTML = ''; grip.style.top = ''; stage.classList.remove('is-done'); });
      if (!k.motion) { Y.y = TOP; render(); return; }
      Y.y = BOT; render();
      // the build runs once when the stage is in view: ~.45s per stage, a short beat on each [S1340 4-5s build]
      ScrollTrigger.create({ trigger: stage, start: 'top 65%', once: true, onEnter: function () {
        if (dragging) return;
        auto = gsap.timeline({ onComplete: function () { auto = null; } });
        ys.forEach(function (t) { auto.to(Y, { y: t, duration: .45, ease: 'power2.inOut', onUpdate: render }).to({}, { duration: .1 }); });
      } });
    } },

    /* v3 · The deck [S1443]: swipe the top card away (12px activation, direction lock, threshold or rubber-band back) */
    3: { init: function (root, k) {
      var deck = root.querySelector('.process3__deck'), nEl = root.querySelector('.process3__n');
      var st = S(), N = st.length, cur = 0;
      EZ.reveal(k, root.querySelectorAll('.process3__side > *'));
      deck.innerHTML = st.map(function (s, i) {
        return '<article class="process3__card" data-i="' + i + '" aria-hidden="' + (i ? 'true' : 'false') + '">' +
          '<div class="process3__art"><svg viewBox="0 0 40 40" aria-hidden="true">' + ICONS[i] + '</svg><span class="process3__stamp nums">' + s.w + '</span></div>' +
          '<p class="process3__cno nums">' + (i < 9 ? '0' : '') + (i + 1) + ' / ' + (N < 10 ? '0' : '') + N + '</p>' +
          '<h3 class="process3__t">' + s.t + '</h3><p class="process3__d">' + s.d + '</p></article>';
      }).join('');
      var cards = Array.prototype.slice.call(deck.children);
      // the gesture is discoverable: a hint under the deck until the first card is dealt [S1443]
      var hint = document.createElement('p');
      hint.className = 'process3__hint'; hint.setAttribute('aria-hidden', 'true');
      hint.innerHTML = '<svg viewBox="0 0 22 12"><path d="M7 1L2 6l5 5M15 1l5 5-5 5M2 6h18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Swipe the card';
      deck.appendChild(hint);
      function layout(animate) {
        cards.forEach(function (c, i) {
          var n = i - cur, vars;
          if (n < 0) vars = { x: '-115%', y: 0, scale: .96, autoAlpha: 0, zIndex: 0 };
          else vars = { x: 0, y: Math.min(n, 3) * 14, scale: 1 - Math.min(n, 3) * .04, autoAlpha: n > 3 ? 0 : 1, zIndex: N - n };
          c.setAttribute('aria-hidden', n === 0 ? 'false' : 'true');
          if (animate && k.motion) gsap.to(c, Object.assign({ duration: .3, ease: 'power3.out', overwrite: true }, vars)); else gsap.set(c, vars);
        });
        nEl.textContent = (cur < 9 ? '0' : '') + (cur + 1);
      }
      function next(dir) {
        if (cur >= N - 1) { cur = 0; layout(true); return; }      // the last card deals the deck again
        var c = cards[cur];
        cur++;
        deck.classList.add('is-dealt');
        if (k.motion) gsap.to(c, { x: (dir || -1) * 115 + '%', autoAlpha: 0, duration: .3, ease: 'power2.in', overwrite: true, onComplete: function () { gsap.set(c, { zIndex: 0 }); } });
        layout(true);
      }
      function prev() { if (cur > 0) { cur--; layout(true); } }
      layout(false);
      k.on(root.querySelector('.process3__next'), 'click', function () { next(-1); });
      k.on(root.querySelector('.process3__prev'), 'click', prev);
      k.on(deck, 'keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); next(-1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); } });
      // the gesture: activation after 12px, axis locks; past 30% of the card width (or a fast flick) the card goes
      var g = null;
      k.on(deck, 'pointerdown', function (e) {
        var c = cards[cur]; if (!c || !c.contains(e.target)) return;
        g = { x: e.clientX, y: e.clientY, t: performance.now(), axis: null, c: c, w: c.offsetWidth, id: e.pointerId };
      });
      k.on(deck, 'pointermove', function (e) {
        if (!g || e.pointerId !== g.id) return;
        var dx = e.clientX - g.x, dy = e.clientY - g.y;
        if (!g.axis) { if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return; g.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'; if (g.axis === 'x') { try { deck.setPointerCapture(e.pointerId); } catch (er) {} } }
        if (g.axis !== 'x') return;
        e.preventDefault();
        var pr = Math.min(1, Math.abs(dx) / (g.w * .3));
        gsap.set(g.c, { x: dx, scale: 1 - pr * .02 });
        if (cards[cur + 1]) gsap.set(cards[cur + 1], { y: 14 * (1 - pr), scale: .96 + .04 * pr });   // the threshold cue: the next card rises to meet it
        g.dx = dx; g.v = dx / Math.max(1, performance.now() - g.t);
      });
      function end(e) {
        if (!g) return;
        // a tap (no travel, quick) deals the next card too: tap = select [S1443]
        if (!g.axis && e && e.type === 'pointerup' && performance.now() - g.t < 450) { g = null; next(-1); return; }
        var go = g.axis === 'x' && (Math.abs(g.dx || 0) > g.w * .3 || Math.abs(g.v || 0) > .55);
        if (go) next((g.dx || -1) < 0 ? -1 : 1);
        else if (g.axis === 'x') { gsap.to(g.c, { x: 0, scale: 1, duration: .45, ease: 'elastic.out(1, .55)', overwrite: true }); layout(true); }
        g = null;
      }
      k.on(deck, 'pointerup', end);
      k.on(deck, 'pointercancel', end);
      k.add(function () { deck.innerHTML = ''; deck.classList.remove('is-dealt'); });
      if (k.motion) gsap.from(cards.slice(0, 4), { y: 30, autoAlpha: 0, duration: .3, ease: 'power2.out', stagger: .05, scrollTrigger: { trigger: deck, start: 'top 80%', once: true }, onComplete: function () { layout(false); } });
    } }
  });
})();
