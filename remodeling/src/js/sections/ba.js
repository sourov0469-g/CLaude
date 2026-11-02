/* FINALIZE · Home 4 · Before/After: the MERSI seam (V1 deepened). One value s (0..1) is the seam's place; the native
   range input carries it (keyboard, screen readers, touch) and drag maps 1:1. The seam travels once with the scroll on
   first view, then hands control over [S1326 reversible]; each pair change is a cut-the-curve slide to the left
   (partial travel ~12%, mirrored power4 in/out) and the seam sweeps again [S0576]. Prints <= 1.35x native width. */
(function () {
  var PAIRS = [
    { b: 'ba-kitchen1-before', a: 'ba-kitchen1-after', w: 388, h: 292,
      bt: 'Dated kitchen with cream cabinets and tiled counters, before renovation', at: 'Renovated kitchen with grey shaker cabinetry and quartz counters' },
    { b: 'ba-bath2-before', a: 'ba-bath2-after', w: 428, h: 404,
      bt: 'Dated bathroom with alcove tub and shower curtain, before renovation', at: 'Renovated bathroom with frameless glass shower and round backlit mirror' },
    { b: 'ba-kitchen4-before', a: 'ba-kitchen4-after', w: 596, h: 444,
      bt: 'Kitchen with dated oak cabinetry and tiled counters, before renovation', at: 'Renovated kitchen with light cabinetry, range hood and island seating' },
    { b: 'ba-outdoor-before', a: 'ba-outdoor-after', w: 558, h: 466,
      bt: 'Backyard with worn lawn and open patio, before renovation', at: 'Covered outdoor pergola with dining and bar seating, and a turfed backyard' }
  ];
  EZ.section('ba', { 1: { init: function (root, k) {
    var board = root.querySelector('.bx__board'), print = root.querySelector('.bx__print'), stage = root.querySelector('.bx__stage'),
      ib = root.querySelector('.bx__ib'), ia = root.querySelector('.bx__ia'), range = root.querySelector('.bx__range'),
      read = root.querySelector('.bx__read'), cap = root.querySelector('.bx__cap'), tabs = Array.prototype.slice.call(root.querySelectorAll('.bx__pair'));
    var st = { s: .5 }, cur = 0, swept = false;

    function setS(v) {
      st.s = Math.max(0, Math.min(1, v));
      stage.style.setProperty('--s', st.s.toFixed(4));
      var pc = Math.round(st.s * 100);
      range.value = pc;
      range.setAttribute('aria-valuetext', pc <= 2 ? 'All after' : pc >= 98 ? 'All before' : pc + ' percent before, ' + (100 - pc) + ' percent after');
      read.textContent = Math.round(st.s * 48) + ' in';     // the tape is 48 inches across the print
    }
    function load(i) {
      var p = PAIRS[i];
      ib.src = EZ.img(p.b); ia.src = EZ.img(p.a); ib.alt = p.bt; ia.alt = p.at;
      ib.width = ia.width = p.w; ib.height = ia.height = p.h;
      stage.style.setProperty('--ar', p.w + ' / ' + p.h);
      print.style.setProperty('--arn', (p.w / p.h).toFixed(4));   // the print is also capped by the viewport height
      print.style.setProperty('--pw', Math.round(p.w * 1.35 + 26) + 'px');    // never more than 1.35x the published width
      cap.textContent = 'Before: ' + p.bt.replace(/, before renovation$/, '') + '. After: ' + p.at + '.';
    }
    function sweep(from, to) {
      if (!k.motion) { setS(to); return; }
      gsap.fromTo(st, { s: from }, { s: to, duration: .9, ease: 'power3.inOut', overwrite: true, onUpdate: function () { setS(st.s); } });
    }
    function select(i, focus) {
      if (i === cur) return;
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
      board.setAttribute('aria-labelledby', tabs[i].id);
      if (focus) tabs[i].focus();
      cur = i;
      if (!k.motion) { load(i); setS(.5); return; }
      // cut the curve, leftward: the print accelerates out (power4.in), the next arrives mid-flight (power4.out) [S0576]
      gsap.timeline({ overwrite: true })
        .to(print, { x: -72, opacity: 0, duration: .26, ease: 'power4.in' })
        .add(function () { load(i); })
        .fromTo(print, { x: 72, opacity: .35 }, { x: 0, opacity: 1, duration: .34, ease: 'power4.out', clearProps: 'transform,opacity' })
        .add(function () { sweep(.12, .5); }, '-=.1');
    }
    tabs.forEach(function (t, i) {
      k.on(t, 'click', function () { select(i); });
      k.on(t, 'keydown', function (e) {
        var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
        if (e.key === 'Home') { e.preventDefault(); select(0, true); } else if (e.key === 'End') { e.preventDefault(); select(PAIRS.length - 1, true); }
        else if (d) { e.preventDefault(); select((cur + d + PAIRS.length) % PAIRS.length, true); }
      });
    });
    // the hand: the native range is the whole stage (pointer, touch, keys); every input wins over the auto sweep
    k.on(range, 'input', function () { gsap.killTweensOf(st); setS(range.value / 100); swept = true; });
    k.on(range, 'pointerdown', function () { stage.classList.add('is-drag'); gsap.killTweensOf(st); swept = true; });
    k.on(range, 'pointerup', function () { stage.classList.remove('is-drag'); });
    k.on(range, 'pointercancel', function () { stage.classList.remove('is-drag'); });

    load(0); setS(.5);
    if (k.motion) {
      // MERSI: on first view the seam travels with the scroll (mostly before, then half and half), then hands control over
      setS(.9);
      var tw = gsap.to(st, { s: .5, ease: 'none', onUpdate: function () { if (!swept) setS(st.s); },
        scrollTrigger: { trigger: stage, start: 'top 85%', end: 'center 50%', scrub: .6 } });
      k.add(function () { if (tw.scrollTrigger) tw.scrollTrigger.kill(); tw.kill(); });
    }
  } } });
})();
