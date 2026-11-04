/* OWNER (second pass) · Home 5 · How a job runs: three layouts of the same eight stages, one list, one drawn icon set.
   V1 the staircase: eight steps climb left to right; the open space above the low steps holds the stage card; pointer,
      tap, focus or arrow keys climb it; the steps rise in as the section arrives.
   V2 the dial: a ring of eight segments with a drawn icon on each; the centre names the stage, the card beside it gives
      the firm's line; the ring fills to the stage you are on; prev/next and arrow keys.
   V3 the card rail: eight illustrated cards on a track; drag (mouse), swipe or scroll; prev/next steps; the track fills
      as you go. Week marks and lines are the firm's own [S1018 keyboard, S1443 gestures, S0400 reduced motion]. */
(function () {
  var ST = [
    ['Week 1', 'Consultation', 'We walk the property, talk through what you actually want to change, and give you an honest read on scope and budget before anyone quotes a number.'],
    ['Week 1–2', 'Site evaluation', 'Flood zone, HVHZ requirements, permit history, HOA or historic review, and what is behind the walls.'],
    ['Weeks 2–5', 'Design and planning', 'Layouts, finishes and system choices, with the real trade-offs explained rather than one pre-set package.'],
    ['Weeks 5–6', 'Proposal and scope', 'A written scope that says what is included, what is not, and where contingencies are likely. Priced against the drawings, not a guess.'],
    ['Weeks 6–12', 'Permitting', 'Permits pulled directly, and every product checked for its Notice of Acceptance or Florida Product Approval.'],
    ['Varies', 'Construction', 'One point of contact, inspections at each stage, and a site that gets cleaned at the end of the day.'],
    ['Final 1–2 weeks', 'Quality review', 'We walk the work against the scope before we call it finished.'],
    ['Closeout', 'Completion and handover', 'Final inspection, a walkthrough together, and registration of manufacturer and workmanship warranties.']
  ];
  // one line language for all eight (24 grid, round joins)
  var IC = [
    'M3 5h12v8H8l-4 3v-3H3zM15 9h6v7h-1v3l-3-3h-5v-3',                                   // consultation: two speech bubbles
    'M3 11l7-6 7 6M5 10v9h6M16 12.5a3 3 0 1 0 0 6a3 3 0 1 0 0-6M18.2 17.7L21 20.5',       // site evaluation: house and a lens
    'M14 4l6 6L9 21H3v-6zM12 6l6 6M3 3v4M3 3h4',                                          // design: pencil
    'M6 3h9l4 4v14H6zM15 3v4h4M9 14l2 2 4-4',                                             // proposal: the written scope
    'M9 3h6v5l3 3v3H6v-3l3-3zM5 18h14M7 21h10',                                           // permitting: the stamp
    'M3 17h18M5 17v-2a7 7 0 0 1 14 0v2M10 8v4M14 8v4M4 20h16',                            // construction: hard hat
    'M8 3h8v3H8zM6 4.5H5V21h14V4.5h-1M9 13l2 2 4-4',                                      // quality review: clipboard
    'M8 10a4 4 0 1 0 0 8a4 4 0 1 0 0-8M11 11l9-9M17 5l2.5 2.5M14.5 7.5l2 2'              // handover: the key
  ];
  function icon(i, cls) { return '<svg class="' + (cls || 'pz-ic') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + IC[i] + '"/></svg>'; }
  function nn(i) { return (i < 9 ? '0' : '') + (i + 1); }
  // the shared stage card (V1 and V2)
  function card(el, i, anim) {
    el.innerHTML = '<p class="pz-k"><span class="pz-no nums">' + nn(i) + '</span><span class="pz-wk">' + ST[i][0] + '</span></p><h3 class="pz-t">' + ST[i][1] + '</h3><p class="pz-p">' + ST[i][2] + '</p>';
    if (anim) { el.classList.remove('is-swap'); void el.offsetWidth; el.classList.add('is-swap'); }
  }
  function keys(k, list, go) {
    list.forEach(function (b, i) {
      k.on(b, 'keydown', function (e) {
        var d = /Down|Right/.test(e.key) ? 1 : /Up|Left/.test(e.key) ? -1 : 0; if (!d) return;
        e.preventDefault(); var j = (i + d + list.length) % list.length; list[j].focus(); go(j);
      });
    });
  }

  EZ.section('process', {
    /* V2 · the dial */
    1: { init: function (root, k) {
      var svg = root.querySelector('.pd__svg'), nodes = root.querySelector('.pd__nodes'), cardEl = root.querySelector('.pd__card');
      var midN = root.querySelector('.pd__n'), midT = root.querySelector('.pd__t'), pos = root.querySelector('.pd__pos');
      var C = 220, R = 168, GAP = 5, seg = 360 / 8;
      function pt(a, r) { var t = (a - 90) * Math.PI / 180; return [C + Math.cos(t) * r, C + Math.sin(t) * r]; }
      function arc(a0, a1, r) { var p0 = pt(a0, r), p1 = pt(a1, r); return 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + 'A' + r + ' ' + r + ' 0 0 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1); }
      var s = '<circle class="pd__face" cx="220" cy="220" r="128"/>';
      for (var i = 0; i < 60; i++) { var a = i * 6, p0 = pt(a, 196), p1 = pt(a, i % 5 ? 202 : 208); s += '<path class="pd__tk" d="M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + 'L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + '"/>'; }
      ST.forEach(function (x, j) { s += '<path class="pd__seg" data-i="' + j + '" d="' + arc(j * seg + GAP, (j + 1) * seg - GAP, R) + '"/>'; });
      svg.innerHTML = s;
      nodes.innerHTML = ST.map(function (x, j) {
        var p = pt(j * seg + seg / 2, R);
        return '<button type="button" class="pd__node" data-i="' + j + '" aria-pressed="false" aria-label="' + nn(j) + ' ' + x[1] + ', ' + x[0] + '" style="left:' + (p[0] / 4.4).toFixed(2) + '%;top:' + (p[1] / 4.4).toFixed(2) + '%">' + icon(j) + '</button>';
      }).join('');
      var segs = Array.prototype.slice.call(svg.querySelectorAll('.pd__seg')), bs = Array.prototype.slice.call(nodes.querySelectorAll('.pd__node')), cur = -1;
      function go(i, anim) {
        if (i === cur) return; cur = i;
        segs.forEach(function (g, j) { g.classList.toggle('is-done', j < i); g.classList.toggle('is-on', j === i); });
        bs.forEach(function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); b.classList.toggle('is-done', j < i); });
        midN.textContent = nn(i); midT.textContent = ST[i][1]; pos.textContent = (i + 1) + ' / 8';
        card(cardEl, i, anim);
        if (anim) { var m = root.querySelector('.pd__mid'); m.classList.remove('is-swap'); void m.offsetWidth; m.classList.add('is-swap'); }
      }
      bs.forEach(function (b, j) { k.on(b, 'click', function () { go(j, true); }); k.on(b, 'pointerenter', function (e) { if (e.pointerType === 'mouse') go(j, true); }); });
      keys(k, bs, function (j) { go(j, true); });
      root.querySelectorAll('.pd__btn').forEach(function (b) { k.on(b, 'click', function () { go((cur + +b.dataset.d + 8) % 8, true); }); });
      go(0, false);
      k.add(function () { svg.innerHTML = ''; nodes.innerHTML = ''; cardEl.innerHTML = ''; cur = -1; });
      EZ.reveal(k, root.querySelectorAll('.pd__side > *'));
      if (!k.motion) return;
      gsap.set(segs, { drawSVG: '0%' }); gsap.set(bs, { scale: 0, opacity: 0 });
      var stt = ScrollTrigger.create({ trigger: root.querySelector('.pd__dial'), start: 'top 80%', once: true, onEnter: function () {
        gsap.to(segs, { drawSVG: '100%', duration: .5, ease: 'power2.inOut', stagger: .07 });
        gsap.to(bs, { scale: 1, opacity: 1, duration: .45, ease: 'back.out(2)', stagger: .07, delay: .15, clearProps: 'transform,opacity' });
      } });
      k.add(function () { stt.kill(); gsap.set(segs, { clearProps: 'all' }); });
    } },

    /* NEW VERSIONS · V2 "One house, eight marks" (governing reference: Scout Motors, the process as sequenced evidence).
       One house drawn full width. A single value v (0..7) runs the job: stage i builds as v goes from i-1 to i (strokes
       first, then fills [S0362]); what a stage leaves behind stays (the flood line, the scope bracket, the permit board, the
       checks) and steps back once you move on [S0083]; the people and tools of a stage are there only while it is on.
       Each stage leaves a numbered mark that takes you back to it. Drag along the ground (continuous, snaps), tap a stop,
       arrow keys, or play / pause [S1018, S1441, S1443, S0089]. No pin: about one screen. Reduced motion: no autoplay,
       no drawing, the stage switches at once [S0400]. */
    2: { init: function (root, k) {
      var svg = root.querySelector('.jh__svg'), scene = root.querySelector('.jh__scene'), track = root.querySelector('.jh__track'),
        stopsEl = root.querySelector('.jh__stops'), fill = root.querySelector('.jh__fill'), knob = root.querySelector('.jh__knob'),
        play = root.querySelector('.jh__play'), playL = root.querySelector('.jh__pl'),
        capNo = root.querySelector('.jh__no'), capWk = root.querySelector('.jh__wk'), capT = root.querySelector('.jh__t'), capP = root.querySelector('.jh__p');

      /* ---------- the drawing: one elevation, eight layers ---------- */
      function P(d, c) { return '<path class="' + c + '" d="' + d + '"/>'; }
      // rectangles are drawn as paths: Chromium reports a wrong getTotalLength() for <rect>, which broke the stroke draw-on
      function Rc(x, y, w, h, c, rx) {
        var r = Math.min(rx || 0, w / 2, h / 2), d;
        if (!r) d = 'M' + x + ' ' + y + 'h' + w + 'v' + h + 'h' + (-w) + 'z';
        else d = 'M' + (x + r) + ' ' + y + 'h' + (w - 2 * r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + 'v' + (h - 2 * r) + 'a' + r + ' ' + r + ' 0 0 1 ' + (-r) + ' ' + r +
          'h' + (-(w - 2 * r)) + 'a' + r + ' ' + r + ' 0 0 1 ' + (-r) + ' ' + (-r) + 'v' + (-(h - 2 * r)) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + (-r) + 'z';
        return P(d, c);
      }
      function Ci(x, y, r, c) { return '<circle class="' + c + '" cx="' + x + '" cy="' + y + '" r="' + r + '"/>'; }
      // a person: feet on y0, facing f (1 right, -1 left); hat = one of ours; hold = what is in the front hand
      function fig(x, y0, sc, f, hat, hold) {
        var q = function (n) { return (n * sc).toFixed(1); }, o = '';
        o += Rc(x - 7 * sc, y0 - 63 * sc, 14 * sc, 30 * sc, hat ? 'f-us' : 'f-them', 6 * sc);   // the jacket
        o += P('M' + x + ' ' + (y0 - 34 * sc) + 'L' + (x - 8 * sc) + ' ' + y0 + 'M' + x + ' ' + (y0 - 34 * sc) + 'L' + (x + 8 * sc) + ' ' + y0, 'fg');   // legs
        o += P('M' + x + ' ' + (y0 - 58 * sc) + 'L' + (x + f * 17 * sc) + ' ' + (y0 - 46 * sc) + 'M' + x + ' ' + (y0 - 58 * sc) + 'L' + (x - f * 6 * sc) + ' ' + (y0 - 36 * sc), 'fg');   // arms
        o += Ci(x, y0 - 73 * sc, 9 * sc, 'f-head');
        if (hat) o += P('M' + (x - 10 * sc) + ' ' + (y0 - 75 * sc) + 'Q' + x + ' ' + (y0 - 92 * sc) + ' ' + (x + 10 * sc) + ' ' + (y0 - 75 * sc) + 'Z', 'f-hat') + P('M' + (x - 13 * sc) + ' ' + (y0 - 75 * sc) + 'H' + (x + 13 * sc), 'fg');
        if (hold === 'board') o += Rc(x + f * 13 * sc - 7 * sc, y0 - 58 * sc, 14 * sc, 18 * sc, 'f-paper', 1.5);
        if (hold === 'hammer') o += P('M' + (x + f * 17 * sc) + ' ' + (y0 - 46 * sc) + 'l' + (f * 6 * sc) + ' ' + q(-14) + 'M' + (x + f * 17 * sc) + ' ' + (y0 - 62 * sc) + 'l' + (f * 12 * sc) + ' ' + q(4), 'fg');
        return o;
      }
      // E(stage, keep|temp, until, draw|fade, markup): stage -1 is the existing house and the ground
      var EL = [];
      function E(st, kind, until, mode, html) { EL.push({ s: st, k: kind, u: until, m: mode, h: html }); }
      var hatch = ''; for (var hx = 4; hx < 1200; hx += 22) hatch += 'M' + hx + ' 381l-10 13';
      E(-1, 'k', null, 'draw', P('M0 380H1200', 'gd') + P(hatch, 'gh'));
      E(-1, 'k', 7, 'draw', Rc(480, 250, 340, 130, 'lg') + P('M452 254L650 170L848 254', 'lg') + Rc(615, 305, 40, 75, 'lg') +
        Rc(505, 280, 70, 50, 'lg') + P('M540 280V330', 'lg') + Rc(725, 280, 70, 50, 'lg') + P('M760 280V330', 'lg'));
      // 01 Consultation: the two of you on the lawn, talking
      E(0, 't', null, 'draw', fig(352, 380, 1, 1, true) + fig(420, 380, 1, -1, false) +
        Rc(296, 222, 80, 30, 'ln f-paper', 15) + P('M338 252l5 11l6-11', 'ln') + P('M310 233h52M310 241h34', 'lt') +
        Rc(398, 200, 86, 30, 'ln f-paper', 15) + P('M432 230l-3 11l11-11', 'ln') + P('M412 211h58M412 219h40', 'lt'));
      // 02 Site evaluation: the flood line stays; a look behind the wall and the hurricane-zone wind are passing
      var wave = 'M296 362'; for (var wx = 296; wx < 900; wx += 24) wave += 'q6 -6 12 0t12 0';
      E(1, 'k', null, 'fade', P(wave, 'fld'));
      E(1, 't', null, 'draw', '<g clip-path="url(#jh-lens)">' + Rc(511, 266, 68, 68, 'f-paper') + P('M528 266V334M545 266V334M562 266V334', 'lt') + P('M512 308H578', 'acs') + '</g>' +
        Ci(545, 300, 34, 'ln') + P('M569 324L597 352', 'thk'));
      E(1, 't', null, 'draw', P('M872 148q24 -10 48 0l-8 -5m8 5l-8 5M862 176q24 -10 48 0l-8 -5m8 5l-8 5M872 204q24 -10 48 0l-8 -5m8 5l-8 5', 'ln'));
      // 03 Design and planning: the new openings drawn in (until the framing replaces them) and the dimension stays
      E(2, 'k', 5, 'fade', Rc(698, 266, 104, 114, 'dsh') + Rc(498, 274, 92, 62, 'dsh'));
      E(2, 'k', null, 'draw', P('M480 140H820M480 130V150M820 130V150M480 140l11 -5m-11 5l11 5M820 140l-11 -5m11 5l-11 5', 'ln') + P('M480 150V244M820 150V244', 'lx'));
      E(2, 't', null, 'draw', P('M694 120l40 -16l6 6l-40 16zM694 120l-4 11l10 -5M728 106l6 6', 'ln'));
      // 04 Proposal and scope: what is included (accent), what is not (dashed grey), where a contingency is likely
      E(3, 'k', null, 'fade', Rc(698, 266, 104, 114, 'inc'));
      E(3, 'k', null, 'draw', P('M692 240V229H808V240', 'acs') + P('M486 240V229H600V240', 'dshg') + P('M548 340l12 12l-12 12l-12 -12z', 'acs') + '<text class="jh__q" x="548" y="357">?</text>');
      // 05 Permitting: the permit board in the yard, stamped; the product tag on the opening
      E(4, 'k', null, 'draw', P('M330 380V302', 'thk') + Rc(292, 250, 76, 52, 'ln f-paper') + P('M302 263h40M302 273h52M302 283h28', 'lt') +
        '<g transform="rotate(-14 350 288)">' + Ci(350, 288, 13, 'acs') + Ci(350, 288, 8, 'acs') + '</g>');
      E(4, 'k', null, 'draw', P('M800 270L816 288', 'lt') + P('M812 288h22l7 8l-7 8h-22z', 'ln f-paper'));
      // 06 Construction: the framing stays until it is closed up; the scaffold and the crew are passing
      E(5, 'k', 7, 'draw', Rc(698, 260, 104, 10, 'ln f-ink') + P('M712 270V380M730 270V380M748 270V380M766 270V380M784 270V380', 'ln') + P('M498 268H590', 'thk'));
      E(5, 't', null, 'draw', P('M688 380V212M814 380V212', 'thk') + P('M682 300H820M682 212H820', 'plank') + P('M688 380L814 300M688 300L814 212', 'lt') + fig(752, 300, .82, -1, true, 'hammer'));
      // 07 Quality review: the checks stay on the work; the inspector is passing
      function chk(x, y) { return Ci(x, y, 13, 'f-acc') + P('M' + (x - 6) + ' ' + y + 'l4 4l8 -8', 'f-chk'); }
      E(6, 'k', null, 'draw', chk(786, 318) + chk(545, 304) + chk(650, 214));
      E(6, 't', null, 'draw', fig(878, 380, 1, -1, true, 'board'));
      // 08 Completion and handover: the house closed up, the new openings lit, the keys at the door
      E(7, 'k', null, 'draw', Rc(480, 250, 340, 130, 'ln') + P('M452 254L650 170L848 254', 'roof') + Rc(615, 305, 40, 75, 'ln') + Ci(647, 345, 2.5, 'f-ink') +
        Rc(700, 266, 100, 114, 'ln f-glass') + P('M750 266V380', 'ln') + Rc(500, 274, 90, 62, 'ln f-lit') + P('M545 274V336', 'ln'));
      E(7, 'k', null, 'draw', fig(594, 380, 1, 1, false) + fig(682, 380, 1, -1, true) + Ci(634, 330, 6, 'acs') + P('M640 330h14M650 330v5M654 330v4', 'acs'));
      var MK = [[385, 186], [916, 340], [650, 116], [750, 208], [330, 230], [836, 236], [823, 340], [634, 288]];
      var out = '<defs><clipPath id="jh-lens"><circle cx="545" cy="300" r="32"/></clipPath></defs>';
      EL.forEach(function (e, i) { out += '<g class="jh__l" data-n="' + i + '">' + e.h + '</g>'; });
      out += MK.map(function (m, i) { return '<g class="jh__mk" data-i="' + i + '" transform="translate(' + m[0] + ' ' + m[1] + ')"><circle r="12"/><text y="4.5">' + (i + 1) + '</text></g>'; }).join('');
      svg.innerHTML = out;
      var L = EL.map(function (e, i) {
        var g = svg.querySelector('.jh__l[data-n="' + i + '"]'), strokes = [], fills = [];
        g.querySelectorAll('path, rect, circle').forEach(function (n) {
          var c = n.getAttribute('class') || '';
          if (/(^| )f-/.test(c) && !/(^| )(ln|fg)( |$)/.test(c)) { fills.push(n); return; }
          if (e.m === 'draw') { var len = n.getTotalLength ? n.getTotalLength() : 0; n.style.strokeDasharray = len + ' ' + (len + 2); strokes.push({ n: n, len: len }); }
          if (/(^| )f-/.test(c)) fills.push(n);
        });
        return { e: e, g: g, strokes: strokes, fills: fills, txt: g.querySelectorAll('text') };
      });
      var marks = Array.prototype.slice.call(svg.querySelectorAll('.jh__mk'));
      k.add(function () { svg.innerHTML = ''; stopsEl.innerHTML = ''; });

      /* ---------- the stops: the ground line is the control ---------- */
      stopsEl.innerHTML = ST.map(function (x, i) { return '<button type="button" class="jh__s" data-i="' + i + '" tabindex="' + (i ? -1 : 0) + '" aria-pressed="' + (i ? 'false' : 'true') + '" aria-label="' + nn(i) + ' ' + x[1] + ', ' + x[0] + '"><span class="nums">' + (i + 1) + '</span></button>'; }).join('');
      var stops = Array.prototype.slice.call(stopsEl.children);

      /* ---------- one value runs it all ---------- */
      var st = { v: 0, intro: k.motion ? 0 : 1 }, cur = -1, phone = false, vb = null;
      function cl(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
      var FX = [385, 600, 650, 650, 360, 750, 760, 640];   // where each stage happens (phones follow it)
      function frame() {
        phone = matchMedia('(max-width: 600px)').matches;
        if (!phone) { vb = [200, 92, 800, 320]; svg.setAttribute('viewBox', vb.join(' ')); }
        scene.classList.toggle('is-follow', phone);
        // a phone shows the drawing at about .78: the marks grow so their numbers read at 13px or more
        marks.forEach(function (m, i) { m.setAttribute('transform', 'translate(' + MK[i][0] + ' ' + MK[i][1] + ')' + (phone ? ' scale(1.35)' : '')); });
        render();
      }
      function render() {
        var v = st.v, it = st.intro;
        L.forEach(function (o) {
          var e = o.e, b;
          if (e.s < 0) b = cl(it * 1.6); else if (e.s === 0) b = cl(it * 1.6 - .6); else b = cl(v - (e.s - 1));
          var op = 1;
          if (e.k === 't') op = cl(1 - Math.abs(v - e.s) * 1.6);
          else if (e.s >= 0) op = 1 - .5 * cl(v - e.s - .4);   // what a stage left behind steps back once you move on
          if (e.u != null) op *= 1 - cl(v - (e.u - 1));
          if (e.s === 0 && it < 1) op = 1;
          o.g.style.opacity = (e.m === 'fade' ? b * op : (b > 0 ? op : 0)).toFixed(3);
          if (e.m === 'draw') {
            o.strokes.forEach(function (sk, j) { var n = o.strokes.length, tt = cl((b - j / n * .45) / .55); sk.n.style.strokeDashoffset = (sk.len * (1 - tt)).toFixed(1); });
            var fo = cl((b - .55) / .45).toFixed(3); o.fills.forEach(function (f) { f.style.opacity = fo; }); o.txt.forEach(function (t) { t.style.opacity = fo; });
          }
        });
        marks.forEach(function (m, i) { var b = i === 0 ? cl((it - .7) / .3) : cl((v - (i - 1) - .7) / .3); m.style.opacity = b.toFixed(3); m.classList.toggle('is-on', Math.round(v) === i); m.style.pointerEvents = b > .5 ? '' : 'none'; });
        // the control
        var pct = (v / 7 * 100).toFixed(2) + '%';
        fill.style.width = pct; knob.style.left = pct;
        if (phone) {   // a phone follows the work: the frame pans to where the stage happens
          var a = Math.floor(v), f = v - a, x = FX[a] + ((FX[Math.min(7, a + 1)] - FX[a]) * f), w = 460, x0 = Math.max(272, Math.min(940 - w, x - w / 2));
          svg.setAttribute('viewBox', x0.toFixed(1) + ' 96 ' + w + ' 310');
        }
        var i = Math.round(v); if (i !== cur) setStage(i);
      }
      function setStage(i) {
        cur = i;
        stops.forEach(function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); b.tabIndex = j === i ? 0 : -1; b.classList.toggle('is-past', j < i); });
        capNo.textContent = nn(i); capWk.textContent = ST[i][0]; capT.textContent = ST[i][1]; capP.textContent = ST[i][2];
        svg.setAttribute('aria-label', 'Stage ' + (i + 1) + ' of 8, ' + ST[i][1] + ', drawn on the house');
      }
      k.ro(scene, frame);
      frame();

      /* ---------- moving it: tween, drag, keys, marks, play ---------- */
      var tl = null, playing = false, used = false;
      function stopPlay() { if (tl) { tl.kill(); tl = null; } playing = false; play.setAttribute('aria-pressed', 'false'); playL.textContent = cur === 7 ? 'Play again' : 'Play the job'; }
      function to(i, dur) {
        i = Math.max(0, Math.min(7, i));
        if (!k.motion) { st.v = i; st.intro = 1; render(); return null; }
        gsap.killTweensOf(st, 'v');
        return gsap.to(st, { v: i, duration: dur || Math.min(1.8, .45 + .28 * Math.abs(i - st.v)), ease: 'power2.inOut', onUpdate: render });
      }
      function go(i) { used = true; stopPlay(); if (st.intro < 1) { gsap.killTweensOf(st, 'intro'); st.intro = 1; } to(i); }
      function startPlay() {
        used = true; stopPlay();
        if (st.intro < 1) { gsap.killTweensOf(st, 'intro'); st.intro = 1; }
        if (!k.motion) { to(Math.min(7, cur + 1)); return; }   // reduced motion: play steps one stage
        playing = true; play.setAttribute('aria-pressed', 'true'); playL.textContent = 'Pause';
        tl = gsap.timeline({ onComplete: function () { tl = null; playing = false; play.setAttribute('aria-pressed', 'false'); playL.textContent = 'Play again'; } });
        var from = Math.round(st.v) >= 7 ? 0 : Math.round(st.v);
        if (from !== st.v || from === 0 && st.v > 0) tl.to(st, { v: from, duration: from === 0 && st.v > 0 ? .8 : .3, ease: 'power2.inOut', onUpdate: render });
        for (var i = from + 1; i <= 7; i++) tl.to(st, { v: i, duration: 1, ease: 'power2.inOut', onUpdate: render }, '+=' + (i === from + 1 ? .25 : .9));
      }
      k.on(play, 'click', function () { if (playing) stopPlay(); else startPlay(); });
      stops.forEach(function (b, i) {
        k.on(b, 'click', function () { if (Date.now() - lastPtr < 400) return; go(i); });
        k.on(b, 'keydown', function (e) {
          var d = /Right|Down/.test(e.key) ? 1 : /Left|Up/.test(e.key) ? -1 : 0, j = e.key === 'Home' ? 0 : e.key === 'End' ? 7 : d ? Math.max(0, Math.min(7, i + d)) : -1;
          if (j < 0) return; e.preventDefault(); stops[j].focus(); go(j);
        });
      });
      // drag along the ground: continuous while held, settles on the nearest stage
      var drag = null, lastPtr = 0;
      function vAt(x) { var a = stops[0].getBoundingClientRect(), z = stops[7].getBoundingClientRect(), x0 = a.left + a.width / 2, x1 = z.left + z.width / 2; return cl((x - x0) / (x1 - x0)) * 7; }
      k.on(track, 'pointerdown', function (e) {
        if (e.button > 0) return;
        drag = { x: e.clientX, moved: false }; lastPtr = Date.now(); used = true; stopPlay();
        if (st.intro < 1) { gsap.killTweensOf(st, 'intro'); st.intro = 1; }
        try { track.setPointerCapture(e.pointerId); } catch (x) {}
        gsap.killTweensOf(st, 'v');
      });
      k.on(track, 'pointermove', function (e) {
        if (!drag) return;
        if (Math.abs(e.clientX - drag.x) > 4) drag.moved = true;
        if (drag.moved) { st.v = vAt(e.clientX); render(); }
      });
      function release(e) {
        if (!drag) return;
        var moved = drag.moved; drag = null; lastPtr = Date.now();
        var i = moved ? Math.round(st.v) : Math.round(vAt(e.clientX));
        to(i, moved ? .35 : null);
        stops[i].focus({ preventScroll: true });
      }
      k.on(track, 'pointerup', release);
      k.on(track, 'pointercancel', function () { if (drag) { drag = null; to(Math.round(st.v), .3); } });
      // a mark takes you back to its stage
      k.on(svg, 'click', function (e) { var m = e.target.closest('.jh__mk'); if (m) go(+m.dataset.i); });

      setStage(0); render();
      EZ.reveal(k, root.querySelectorAll('.jh__head > * , .ps__note'));
      if (!k.motion) return;
      /* ---------- arriving: the house and the first conversation draw themselves, then the job plays once ---------- */
      var started = false;
      var sti = ScrollTrigger.create({ trigger: scene, start: 'top 70%', once: true, onEnter: function () {
        started = true;
        gsap.to(st, { intro: 1, duration: 1.6, ease: 'power2.out', onUpdate: render, onComplete: function () { if (!used) k.timeout(function () { if (!used) startPlay(); used = false; }, 700); } });
      } });
      // the job pauses while it is off screen (WCAG 2.2.2: moving content can always be paused; here it also stops unseen)
      k.io(scene, function (en) { if (!en.isIntersecting && playing) stopPlay(); }, { threshold: 0 });
      k.add(function () { sti.kill(); stopPlay(); gsap.killTweensOf(st); });
    } }
  });
})();
