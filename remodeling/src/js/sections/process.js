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
    } }
  });
})();
