/* FINALIZE · Renovation 3 · One disruption. Not five.
   V1 · five rooms, each its own bar in its own year band with its own contractor tag (A to E); one scrubbed timeline
        pulls them into one sequenced plan inside the first band (the bars slide left and line up one after another, the
        tags become one), reversible. The readout says which story you are looking at.
   V2 · a house plan with one radio switch: Room by room hatches five separate disruption zones one after another; One
        plan draws a single route through every room and one boundary around the house. */
(function () {
  var ROOMS = ['Kitchen', 'Primary bath', 'Guest bath', 'Living area', 'Floors'];
  EZ.section('reno-disruption', {
    1: { init: function (root, k) {
      var chart = root.querySelector('.dc__chart'), host = root.querySelector('.dc__bars'), read = root.querySelector('.dc__read');
      host.innerHTML = ROOMS.map(function (r, i) {
        return '<li class="dc__bar"><span class="dc__seg" style="--l:' + (i * .2 + L0) + ';--w:' + W0 + '"><span>' + r + '</span><span class="dc__tag" aria-hidden="true">' + 'ABCDE'.charAt(i) + '</span></span></li>';
      }).join('');
      var segs = Array.prototype.slice.call(host.querySelectorAll('.dc__seg')), tags = host.querySelectorAll('.dc__tag');
      // the resolved plan: on phones the bars stay wide enough to name their rooms (Phase 6: they truncated at 390)
      var PH = matchMedia('(max-width: 600px)').matches, W0 = PH ? .19 : .16, L0 = PH ? .005 : .02;   // MOBILE AUDIT r2: on a phone the five-year bars fill their year
      var END = matchMedia('(max-width: 900px)').matches ? { step: .1, w: .38, span: .82 } : { step: .052, w: .12, span: .36 };
      chart.style.setProperty('--one', END.span);
      var A = 'One room at a time, over five years, with a different contractor each time.', B = 'One plan, one contractor, one disruption: the rooms sequenced inside the same stretch.';
      function setEnd() { segs.forEach(function (s, i) { s.style.setProperty('--l', (.02 + i * END.step).toFixed(3)); s.style.setProperty('--w', String(END.w)); }); }
      k.add(function () { host.innerHTML = ''; chart.classList.remove('is-one'); read.textContent = A; });
      EZ.reveal(k, root.querySelectorAll('.dc__head > *'));
      if (!k.motion) { setEnd(); chart.classList.add('is-one'); read.textContent = B; tags.forEach(function (t) { t.textContent = '1'; }); return; }   // still: the resolved plan
      var o = { p: 0 };
      var tl = gsap.timeline().to(o, { p: 1, duration: 1, ease: 'none', onUpdate: function () {
        var p = gsap.parseEase('power2.inOut')(o.p);
        segs.forEach(function (s, i) {
          var l0 = i * .2 + L0, l1 = .02 + i * END.step, w0 = W0, w1 = END.w;   // sequenced, overlapping a little, inside one marked stretch
          s.style.setProperty('--l', (l0 + (l1 - l0) * p).toFixed(4)); s.style.setProperty('--w', (w0 + (w1 - w0) * p).toFixed(4));
        });
        var on = o.p > .9; if (on !== chart.classList.contains('is-one')) { chart.classList.toggle('is-one', on); read.textContent = on ? B : A; tags.forEach(function (t, i) { t.textContent = on ? '1' : 'ABCDE'.charAt(i); }); }
      } });
      var st = ScrollTrigger.create({ trigger: chart, start: 'top 75%', end: 'center 50%', scrub: .6, animation: tl });   // completes while the chart is fully in view
      k.add(function () { st.kill(); tl.kill(); });
    } },
    2: { init: function (root, k) {
      var svg = root.querySelector('.dp__svg'), read = root.querySelector('.dp__read'), opts = Array.prototype.slice.call(root.querySelectorAll('.dp__o'));
      // the plan: five rooms in one house
      var R = [[40, 40, 260, 180, 'Kitchen'], [300, 40, 140, 140, 'Primary bath'], [440, 40, 160, 180, 'Guest bath'], [40, 220, 360, 180, 'Living area'], [400, 220, 200, 180, 'Floors']];
      var s = '<defs><pattern id="dp-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="10" fill="none"/><path d="M0 0 V10" stroke="#C5735C" stroke-width="3" opacity=".45"/></pattern></defs>';
      s += '<rect class="wl" x="40" y="40" width="560" height="360"/><path class="pt" d="M300 40 V180 H440 M440 40 V220 M40 220 H600 M400 220 V400"/>';
      R.forEach(function (r) { s += '<text class="rm" x="' + (r[0] + 16) + '" y="' + (r[1] + 30) + '">' + r[4] + '</text>'; });
      R.forEach(function (r) { s += '<rect class="dz" x="' + (r[0] + 10) + '" y="' + (r[1] + 44) + '" width="' + (r[2] - 20) + '" height="' + (r[3] - 54) + '"/>'; });
      s += '<rect class="one" x="24" y="24" width="592" height="392"/><path class="route" d="M170 140 H370 V110 H520 V310 H500 M500 310 H220"/>';
      R.forEach(function (r) { s += '<circle class="stop" cx="' + (r[0] + r[2] / 2) + '" cy="' + (r[1] + r[3] / 2 + 10) + '" r="9"/>'; });
      svg.innerHTML = s;
      var dz = svg.querySelectorAll('.dz'), one = svg.querySelector('.one'), route = svg.querySelector('.route'), stops = svg.querySelectorAll('.stop'), mode = '';
      function set(m, focus) {
        if (m === mode) return; mode = m;
        opts.forEach(function (o) { var on = o.dataset.m === m; o.setAttribute('aria-checked', on ? 'true' : 'false'); o.tabIndex = on ? 0 : -1; if (on && focus) o.focus(); });
        read.innerHTML = m === 'rooms' ? '<b class="nums">5</b> disruptions, no plan connecting them.' : '<b class="nums">1</b> disruption, one plan, one contractor.';
        var d = k.motion ? 1 : 0;
        if (m === 'rooms') {
          gsap.to([one, stops], { opacity: 0, duration: .25 * d, overwrite: true });
          gsap.to(route, { drawSVG: '0%', duration: .3 * d, ease: 'power4.in', overwrite: true });
          gsap.fromTo(dz, { opacity: 0 }, { opacity: 1, duration: .3 * d, stagger: .35 * d, overwrite: true });
        } else {
          gsap.to(dz, { opacity: 0, duration: .25 * d, stagger: .05 * d, overwrite: true });
          gsap.fromTo(route, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1 * d, ease: 'power2.inOut', delay: .2 * d, overwrite: true });
          gsap.to(stops, { opacity: 1, duration: .2 * d, stagger: .15 * d, delay: .3 * d, overwrite: true });
          gsap.fromTo(one, { opacity: 0 }, { opacity: 1, duration: .5 * d, delay: 1 * d, overwrite: true });   // dashed: it fades (DrawSVG would make it solid)
        }
      }
      gsap.set([one, stops], { opacity: 0 }); gsap.set(route, { drawSVG: '0%' });
      opts.forEach(function (o, i) {
        k.on(o, 'click', function () { set(o.dataset.m); });
        k.on(o, 'keydown', function (e) { if (/Arrow/.test(e.key)) { e.preventDefault(); set(opts[(i + 1) % 2].dataset.m, true); } });
      });
      set('rooms');
      k.add(function () { svg.innerHTML = ''; mode = ''; });
      EZ.reveal(k, root.querySelectorAll('.dp__side > *'));
    } }
  });
})();
