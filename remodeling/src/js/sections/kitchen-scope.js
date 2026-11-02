/* FINALIZE · Kitchens 2 · Scope. One kitchen plan, three published tiers. Each tier is a target state for the same
   drawn elements (cabinet runs, island, sink, range, fridge, stools, the partition wall, the plumbing); choosing a tier
   moves the plan there (power2.inOut, 0.7s): the room you are looking at changes the way the tier says it does.
   Refit: same layout. Full remodel: the left run goes, an island comes in, the sink moves onto it and the plumbing is
   re-routed. Open-plan: the wall between kitchen and living comes out and the island reaches into the living area.
   A real tablist (arrow keys, Home, End). Reduced motion: the plan changes without travel. */
(function () {
  var T = {
    1: { name: 'Refit scope', def: 'Same layout, new kitchen.', notes: ['The sink, range and walls stay where they are.'],
      top: [40, 40, 270, 44], left: [40, 84, 44, 200], isl: [150, 190, 0, 56], range: [104, 48], fridge: [40, 292, 44, 60], sink: [210, 62], stools: 0, wall: true, living: 350 },
    2: { name: 'Full remodel', def: 'Layout and services move.', notes: ['The run changes and an island comes in.', 'The sink moves, so the plumbing is re-routed.'],
      top: [40, 40, 270, 44], left: [40, 84, 44, 0], isl: [150, 190, 150, 56], range: [104, 48], fridge: [40, 292, 44, 60], sink: [218, 218], stools: 3, wall: true, living: 350 },
    3: { name: 'Open-plan scope', def: 'The room itself changes.', notes: ['The wall between kitchen and living comes out.', 'The island becomes the place the two rooms meet.'],
      top: [40, 40, 218, 44], left: [40, 84, 44, 0], isl: [150, 190, 250, 64], range: [104, 48], fridge: [262, 40, 48, 44], sink: [268, 222], stools: 5, wall: false, living: 430 }
  };
  EZ.section('kitchen-scope', { 1: { init: function (root, k) {
    var svg = root.querySelector('.ks__svg'), tabs = Array.prototype.slice.call(root.querySelectorAll('.ks__tab'));
    var panel = root.querySelector('.ks__panel'), def = panel.querySelector('.ks__def'), notes = panel.querySelector('.ks__notes'), title = svg.querySelector('title');
    function q(s) { return svg.querySelector(s); }
    var el = { top: q('[data-k="top"]'), left: q('[data-k="left"]'), isl: q('[data-k="isl"]'), range: q('[data-k="range"]'), fridge: q('[data-k="fridge"]'), sink: q('[data-k="sink"]') };
    var stools = svg.querySelectorAll('.stools circle'), wall = q('.part'), ghost = q('.part-ghost'), living = q('.rm--l');
    var pipes = svg.querySelectorAll('.pipe'), tags = svg.querySelectorAll('.tag'), cur = 0;
    function go(t, focus) {
      if (t === cur) return; cur = t;
      var s = T[t], d = k.motion ? .7 : 0, e = 'power2.inOut';
      tabs.forEach(function (b) { var on = +b.dataset.t === t; b.setAttribute('aria-selected', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
      panel.setAttribute('aria-labelledby', 'ks-t' + t);
      def.textContent = s.def; notes.innerHTML = s.notes.map(function (n) { return '<li>' + n + '</li>'; }).join('');
      title.textContent = 'Kitchen plan, ' + s.name.toLowerCase() + ': ' + s.def;
      ['top', 'left', 'isl', 'fridge'].forEach(function (n) { gsap.to(el[n], { attr: { x: s[n][0], y: s[n][1], width: s[n][2], height: s[n][3] }, duration: d, ease: e, overwrite: true }); });
      gsap.to(el.range, { attr: { x: s.range[0], y: s.range[1] }, duration: d, ease: e, overwrite: true });
      gsap.to(el.sink, { attr: { cx: s.sink[0], cy: s.sink[1] }, duration: d, ease: e, overwrite: true });
      stools.forEach(function (c, i) { gsap.to(c, { opacity: i < s.stools ? 1 : 0, duration: d * .6, delay: k.motion ? .35 + i * .05 : 0, overwrite: true }); });
      gsap.to(wall, { drawSVG: s.wall ? '0% 100%' : '50% 50%', duration: d, ease: e, overwrite: true });
      gsap.to(ghost, { opacity: s.wall ? 0 : 1, duration: d * .6, delay: s.wall ? 0 : d * .5, overwrite: true });
      gsap.to(living, { attr: { x: s.living }, duration: d, ease: e, overwrite: true });
      pipes.forEach(function (p) { gsap.to(p, { opacity: +p.dataset.t === t ? 1 : 0, duration: d * .5, delay: +p.dataset.t === t ? d * .6 : 0, overwrite: true }); });
      tags.forEach(function (g) { gsap.to(g, { opacity: +g.dataset.t === t ? 1 : 0, duration: d * .4, delay: +g.dataset.t === t ? d * .8 : 0, overwrite: true }); });
    }
    tabs.forEach(function (b, i) {
      k.on(b, 'click', function () { go(+b.dataset.t); });
      k.on(b, 'keydown', function (e) {
        var n = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
        if (n === null) return; e.preventDefault(); go(+tabs[(n + tabs.length) % tabs.length].dataset.t, true);
      });
    });
    gsap.set([pipes, tags], { opacity: 0 });
    var saved = k.motion; k.motion = false; go(1); k.motion = saved;
    k.add(function () { cur = 0; gsap.set(svg.querySelectorAll('*'), { clearProps: 'all' }); });
    EZ.reveal(k, root.querySelectorAll('.ks__side > *'));
    if (k.motion) {   // first view: the walls draw, then the runs and fixtures settle in (strokes first)
      gsap.set([wall, q('.wl')], { drawSVG: '0%' }); gsap.set(svg.querySelectorAll('.pipe, .tag'), { opacity: 0 });
      var st = ScrollTrigger.create({ trigger: svg, start: 'top 80%', once: true, onEnter: function () {
        gsap.timeline().to([q('.wl'), wall], { drawSVG: '0% 100%', duration: .8, ease: 'power2.inOut', stagger: .15 })
          .from(svg.querySelectorAll('.cab, .fx'), { opacity: 0, duration: .3, stagger: .05 }, '-=.2')
          .to(svg.querySelectorAll('.pipe[data-t="1"], .tag[data-t="1"]'), { opacity: 1, duration: .3 });
      } });
      k.add(function () { st.kill(); });
    } else gsap.set(svg.querySelectorAll('.pipe[data-t="1"], .tag[data-t="1"]'), { opacity: 1 });
  } } });
})();
