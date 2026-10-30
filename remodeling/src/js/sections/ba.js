/* before/after, PLAN-V3 §3. Only the four genuine pairs (FACTS.md). */
(function () {
  var PAIRS = EZ.PAIRS = [   // the one source of the four genuine pairs (Proof slot 5 reads it too)

    { b: 'ba-kitchen1-before', a: 'ba-kitchen1-after', name: 'Kitchen', time: '<span class="nums">6&ndash;12</span> weeks of construction',
      ba: 'Dated kitchen with cream cabinets and tiled counters, before renovation', aa: 'Renovated kitchen with grey shaker cabinetry and quartz counters' },
    { b: 'ba-bath2-before', a: 'ba-bath2-after', name: 'Bathroom', time: '<span class="nums">4&ndash;8</span> weeks of construction',
      ba: 'Dated bathroom with alcove tub and shower curtain, before renovation', aa: 'Renovated bathroom with frameless glass shower and round backlit mirror' },
    { b: 'ba-kitchen4-before', a: 'ba-kitchen4-after', name: 'Kitchen', time: '<span class="nums">6&ndash;12</span> weeks of construction',
      ba: 'Kitchen with dated oak cabinetry and tiled counters, before renovation', aa: 'Renovated kitchen with light cabinetry, range hood and island seating' },
    { b: 'ba-outdoor-before', a: 'ba-outdoor-after', name: 'Outdoor living', time: 'Backyard and pergola',
      ba: 'Backyard with worn lawn and open patio, before renovation', aa: 'Covered outdoor pergola with dining and bar seating, and a turfed backyard' }
  ];
  var ELEOS = EZ.bezier(.625, .05, 0, 1);       // [BANK 178] house ease

  EZ.section('ba', {
    /* slot 1 · AUDIT-01 winner (copied from v1; fixes applied here) */
    1: { init: function (root, k) {
      var stage = root.querySelector('.bs__stage');
      var range = root.querySelector('.bs__range');
      var imgB = root.querySelector('.bs__img--before img'), imgA = root.querySelector('.bs__img--after img');
      var tabs = Array.prototype.slice.call(root.querySelectorAll('.bs__tab'));
      function setPos(v) {
        stage.style.setProperty('--pos', v + '%');
        var tm = root.querySelector('.bs__mark b'); if (tm) tm.textContent = Math.round(v * .48);
        range.setAttribute('aria-valuetext', Math.round(100 - v) + '% after');
      }
      setPos(+range.value);
      k.on(range, 'input', function () { setPos(+range.value); });
      k.on(range, 'pointerdown', function () { stage.classList.add('is-drag'); });
      k.on(window, 'pointerup', function () { stage.classList.remove('is-drag'); });
      k.add(function () { stage.classList.remove('is-drag'); stage.style.removeProperty('--pos'); range.value = 50; });
      function select(i, focus) {
        tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
        if (focus) tabs[i].focus();
        var p = PAIRS[i];
        function swap() { imgB.src = EZ.img(p.b); imgB.alt = p.ba; imgA.src = EZ.img(p.a); imgA.alt = p.aa; }
        if (!k.motion) { swap(); return; }
        k.ctx.add(function () {
          // [AUDIT-01 F4.2] one 120ms opacity dip (house ease-out); the stud keeps the split the visitor chose
          gsap.timeline().set([imgB, imgA], { autoAlpha: .35, onComplete: swap })
            .to([imgB, imgA], { autoAlpha: 1, duration: .12, ease: EZ.bezier(.23, 1, .32, 1) });
        });
      }
      tabs.forEach(function (t, i) {
        t.tabIndex = i === 0 ? 0 : -1;
        k.on(t, 'click', function () { select(i); });
        k.on(t, 'keydown', function (e) {
          var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
          if (d) { e.preventDefault(); select((i + d + tabs.length) % tabs.length, true); }
        });
      });
      if (!k.motion) return;
      EZ.reveal(k, root.querySelectorAll('.bs__side > *'));
      // [AUDIT-01 F4.1] first visit only: one swing 50 -> 34 -> 50, 700ms in all; never on a version re-activation
      if (EZ._baHint) return;
      var o = { v: 50 };
      ScrollTrigger.create({ trigger: stage, start: 'top 70%', once: true, onEnter: function () {
        EZ._baHint = true;
        gsap.timeline().to(o, { v: 34, duration: .35, ease: 'power2.inOut', onUpdate: function () { range.value = o.v; setPos(o.v); } })
          .to(o, { v: 50, duration: .35, ease: 'power2.inOut', onUpdate: function () { range.value = o.v; setPos(o.v); } });
      } });
    } },

    /* v1 · The stud wall (signature interactive) */
    b1: { init: function (root, k) {
      var stage = root.querySelector('.ba1__stage');
      var range = root.querySelector('.ba1__range');
      var imgB = root.querySelector('.ba1__img--before img'), imgA = root.querySelector('.ba1__img--after img');
      var tabs = Array.prototype.slice.call(root.querySelectorAll('.ba1__tab'));
      function setPos(v) {
        stage.style.setProperty('--pos', v + '%');
        range.setAttribute('aria-valuetext', Math.round(100 - v) + '% after');
      }
      setPos(+range.value);
      k.on(range, 'input', function () { setPos(+range.value); });
      k.on(range, 'pointerdown', function () { stage.classList.add('is-drag'); });
      k.on(window, 'pointerup', function () { stage.classList.remove('is-drag'); });
      k.add(function () { stage.classList.remove('is-drag'); stage.style.removeProperty('--pos'); range.value = 50; });
      function select(i, focus) {
        tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
        if (focus) tabs[i].focus();
        var p = PAIRS[i];
        function swap() { imgB.src = EZ.img(p.b); imgB.alt = p.ba; imgA.src = EZ.img(p.a); imgA.alt = p.aa; }
        if (!k.motion) { swap(); return; }
        k.ctx.add(function () {
          gsap.timeline().to([imgB, imgA], { autoAlpha: 0, duration: .18, ease: 'power2.in', onComplete: swap })
            .to([imgB, imgA], { autoAlpha: 1, duration: .25, ease: 'power2.out' })
            .fromTo(range, { value: +range.value }, { value: 50, duration: .4, ease: 'power3.inOut', onUpdate: function () { setPos(+range.value); } }, .1);
        });
      }
      tabs.forEach(function (t, i) {
        t.tabIndex = i === 0 ? 0 : -1;
        k.on(t, 'click', function () { select(i); });
        k.on(t, 'keydown', function (e) {
          var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
          if (d) { e.preventDefault(); select((i + d + tabs.length) % tabs.length, true); }
        });
      });
      if (!k.motion) return;
      EZ.reveal(k, root.querySelectorAll('.ba1__side > *'));
      // first sight: the stud swings to show both sides, then rests [hint]
      var o = { v: 50 };
      gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top 70%', once: true } })
        .from(stage, { clipPath: 'inset(0 0 100% 0)', duration: .3, ease: 'power2.out' })
        .to(o, { v: 22, duration: .4, ease: 'power2.inOut', onUpdate: function () { range.value = o.v; setPos(o.v); } }, .3)
        .to(o, { v: 70, duration: .5, ease: 'power2.inOut', onUpdate: function () { range.value = o.v; setPos(o.v); } })
        .to(o, { v: 50, duration: .3, ease: 'power2.out', onUpdate: function () { range.value = o.v; setPos(o.v); } });
    } },

    /* v2 · Rolled on [BANK 148 wavy reveal] */
    2: { init: function (root, k) {
      EZ.reveal(k, root.querySelectorAll('.ba__head > *'));
      root.querySelectorAll('.ba2__panel').forEach(function (panel) {
        var i = +panel.dataset.pair, p = PAIRS[i], svg = panel.querySelector('.ba2__svg');
        svg.setAttribute('viewBox', '0 0 400 300');
        svg.innerHTML =
          '<defs><filter id="ba2-w' + i + '" x="-10%" y="-20%" width="120%" height="140%"><feTurbulence type="turbulence" baseFrequency=".035 .08" numOctaves="2" seed="' + (i + 3) + '" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="26"/></filter>' +
          '<mask id="ba2-m' + i + '"><rect class="mk" x="-20" y="-40" width="440" height="40" fill="#FFFFFF" filter="url(#ba2-w' + i + ')"/></mask>' +
          '<clipPath id="ba2-c' + i + '"><rect width="400" height="300"/></clipPath></defs>' +
          '<g clip-path="url(#ba2-c' + i + ')"><image href="' + EZ.img(p.b) + '" width="400" height="300" preserveAspectRatio="xMidYMid slice"/>' +
          '<image href="' + EZ.img(p.a) + '" width="400" height="300" preserveAspectRatio="xMidYMid slice" mask="url(#ba2-m' + i + ')"/></g>' +
          '<rect width="400" height="300" fill="none" stroke="rgba(18, 18, 18, .25)"/>' +
          '<g class="rl"><path d="M386 -2 v-34 h-26 v-30" fill="none" stroke="#C9C1B6" stroke-width="5" stroke-linejoin="round"/><rect x="352" y="-104" width="16" height="40" rx="6" fill="#FF5F00" stroke="#121212" stroke-width="2.5"/>' +
          '<rect x="6" y="-14" width="388" height="22" rx="11" fill="#FFFFFF" stroke="#121212" stroke-width="2.5"/><rect x="6" y="-2" width="388" height="10" rx="5" fill="#FF5F00" opacity=".55"/></g>' +
          '<text class="tg" x="12" y="22" font-family="Roboto, Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="1" fill="#FFFFFF" stroke="#121212" stroke-width="3" paint-order="stroke">BEFORE</text>';
        // [AUDIT-01 F4 loser P1] reduced motion rests on the complete after photograph, never a half wipe
        var mk = svg.querySelector('.mk'), rl = svg.querySelector('.rl'), tg = svg.querySelector('.tg'), st = { p: k.motion ? 0 : 1 };
        var btn = panel.querySelector('.ba2__tog'), scrub = null;
        function set() {
          var y = st.p * 340;
          mk.setAttribute('height', Math.max(0, y + 40));
          rl.setAttribute('transform', 'translate(0 ' + Math.min(300, y).toFixed(1) + ')');
          rl.style.display = (st.p > .01 && st.p < .99 && k.motion) ? '' : 'none';
          tg.textContent = st.p > .92 ? 'AFTER' : 'BEFORE';
          btn.setAttribute('aria-pressed', st.p > .5 ? 'true' : 'false');
          btn.querySelector('.btn__label').textContent = st.p > .5 ? 'Show the before' : 'Show the after';
        }
        set();
        k.add(function () { svg.innerHTML = ''; });
        // per-panel control: one press takes the panel to the other end and hands it over from scroll to the visitor
        k.on(btn, 'click', function () {
          var to = st.p > .5 ? 0 : 1;
          if (scrub) { scrub.scrollTrigger && scrub.scrollTrigger.kill(); scrub.kill(); scrub = null; }
          if (!k.motion) { st.p = to; set(); return; }
          gsap.to(st, { p: to, duration: .6, ease: EZ.bezier(.23, 1, .32, 1), onUpdate: set, overwrite: true });
        });
        if (!k.motion) return;
        scrub = gsap.to(st, { p: 1, ease: 'none', onUpdate: set, scrollTrigger: { trigger: panel, start: 'top 72%', end: 'bottom 50%', scrub: .8 } });
      });
    } },

    /* v3 · Storm shutters [BANK 178] */
    3: { init: function (root, k) {
      var box = root.querySelector('.ba3__shutters'), photo = root.querySelector('.ba3__photo'), state = root.querySelector('.ba3__state');
      var name = root.querySelector('.ba3__name'), time = root.querySelector('.ba3__time');
      var tog = root.querySelector('.ba3__tog'), N = 8, h = '';
      for (var i = 0; i < N; i++) h += '<span class="ba3__panel"></span>';
      box.innerHTML = h;
      var panels = box.querySelectorAll('.ba3__panel');
      k.add(function () { box.innerHTML = ''; });
      // [AUDIT-01 F4 loser P1] no autoplay and no counter: the rest state is the photograph; shutters run only on a press, 380ms, 30ms stagger
      var cur = { pair: 0, after: false }, busy = false;
      function paint() {
        var p = PAIRS[cur.pair];
        photo.src = EZ.img(cur.after ? p.a : p.b); photo.alt = cur.after ? p.aa : p.ba;
        state.textContent = cur.after ? 'After' : 'Before';
        state.classList.toggle('is-after', cur.after);
        name.textContent = p.name; time.innerHTML = p.time;
        tog.setAttribute('aria-pressed', cur.after ? 'true' : 'false');
        tog.querySelector('.btn__label').textContent = cur.after ? 'Show the before' : 'Show the after';
      }
      function go(next) {
        if (busy) return;
        if (!k.motion) { cur = next; paint(); return; }
        busy = true;
        box.classList.remove('is-up');
        k.ctx.add(function () {
          gsap.timeline({ onComplete: function () { busy = false; box.classList.add('is-up'); } })
            .fromTo(panels, { yPercent: -100 }, { yPercent: 0, duration: .38, ease: ELEOS, stagger: .03 })
            .add(function () { cur = next; paint(); })
            .to(panels, { yPercent: -100, duration: .38, ease: ELEOS, stagger: .03 }, '+=.06');
        });
      }
      gsap.set(panels, { yPercent: -100 });
      box.classList.add('is-up');
      paint();
      k.on(root.querySelector('.ba3__next'), 'click', function () { go({ pair: (cur.pair + 1) % 4, after: false }); });
      k.on(root.querySelector('.ba3__prev'), 'click', function () { go({ pair: (cur.pair + 3) % 4, after: false }); });
      k.on(tog, 'click', function () { go({ pair: cur.pair, after: !cur.after }); });
      EZ.reveal(k, root.querySelectorAll('.ba3__side > *'));
    } }
  });
})();
