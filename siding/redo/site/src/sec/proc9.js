/* PROCESS N (new-versions addendum, pass 4) — "Watch it happen". Reference: Graza (scoped: the custom-animation quality
   bar — small hand-made animations with timing and personality, one idea per frame, playable on demand, calm at rest).
   The firm's four published steps, each played as a small drawn SVG scene that pictures that step's sentence literally.
   The scenes are drawn illustrations, not photographs of a real job, and the section says so. Every sentence is the
   firm's own (the same strings Process M uses; the siding FAQ); review phrases are verbatim and build-locked (Proc9.QUOTES).
   Each scene is a pure function of time t in [0,1]: it plays, shows its end state under reduced motion, or (the install)
   is scrubbed. No images, no canvas, no global effect. The markup (the drawn scenes) is written at build time by
   proc9n.js, which is not shipped to the page. */
window.Proc9 = (function () {
  // [step, sentence (verbatim), facts [[big, small]], review [index, verbatim phrase], scene label]
  const S = [
    ['Free inspection', 'A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade.',
      [['One visit', 'covers every trade'], ['Book any day', 'Mon–Fri 8–8, Sat 8–6, Sun 12–5']], [14, 'They only took 15 minutes to measure and understand the job'],
      'Drawn scene: a marker walks round all four sides of a house seen from above, tagging siding, trim, windows, roof and gutters.'],
    ['Detailed proposal', 'An itemised price for the work you want, nothing else.',
      [['$10k–$15k median band (415 priced)', 'our documented siding jobs']], [26, 'providing a fair and transparent estimate'],
      'Drawn scene: a proposal sheet prints line by line; the work that was wanted stays on it, the rest falls away.'],
    ['Expert install', 'Old material off, new boards up, then trim and paint.',
      [['1 to 2 weeks', 'A siding replacement typically takes 1 to 2 weeks, including the painting process.']], [19, 'getting the job done very quickly'],
      'Drawn scene: a wall around a window, scrubbed from old boards coming off, to new boards going up, to trim, to paint.'],
    ['Final check', 'We walk the finished job with you, clear the punch list and leave the site clean. Then the warranties start.',
      [['30-year James Hardie non-prorated warranty', ''], ['Lifetime', 'Austin Pro adds a lifetime workmanship warranty on labor.']], [10, 'swept the pollen off my deck!'],
      'Drawn scene: a punch list ticks off, a broom sweeps the deck, and the warranty card is stamped.']];
  const QUOTES = S.map((x) => x[3]);
  const PH = ['Old material off', 'New boards up', 'Trim', 'Paint'], COURSES = 16;
  // ---------- motion ----------
  const cl = (x) => Math.max(0, Math.min(1, x)), seg = (t, a, b) => cl((t - a) / (b - a));
  const out = (x) => 1 - Math.pow(1 - x, 3), back = (x) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const inout = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  function wire(root) {
    const s = root.querySelector('.pnN'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tabs = [...s.querySelectorAll('.pntb')], svgs = [...s.querySelectorAll('.pnsc')], txs = [...s.querySelectorAll('.pntx')];
    const panel = s.querySelector('.pnpanel'), live = s.querySelector('.pnlive'), playB = s.querySelector('.pnplay'), scrub = s.querySelector('.pnscrub'), sl = s.querySelector('.pnsl');
    const q = (i, sel) => svgs[i].querySelector(sel), qa = (i, sel) => [...svgs[i].querySelectorAll(sel)];
    const tf = (el, v) => { el.setAttribute('transform', v); }, op = (el, v) => { el.style.opacity = v; };
    // scene 1: the marker walks the path; each side's tag pops as it passes
    const path = q(0, '.pnpath'), L = path.getTotalLength ? path.getTotalLength() : 1260, mk = q(0, '.pnmk'), ring = q(0, '.pnring'), tags = qa(0, '.pntag'), endc = q(0, '.pnend');
    const TH = [.12, .30, .40, .62, .86];
    const r0 = (t) => { const w = out(seg(t, 0, .86)), p = path.getPointAtLength ? path.getPointAtLength(L * w) : { x: 170, y: 330 };
      tf(mk, `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`); ring.style.transform = `scale(${1 + .25 * Math.sin(t * 40)})`; ring.style.transformBox = 'fill-box'; ring.style.transformOrigin = 'center';
      tags.forEach((g, k) => { const a = seg(w, TH[k], TH[k] + .06); op(g, a); const pill = g.querySelector('.pnpill'); pill.style.transformBox = 'fill-box'; pill.style.transformOrigin = 'center'; pill.style.transform = `scale(${.6 + .4 * back(a)})`; });
      const e = seg(t, .88, 1); op(endc, e); endc.style.transform = `translateY(${(1 - out(e)) * 10}px)`; };
    // scene 2: the sheet feeds out, rows print, unwanted rows fall away, the wanted ones are priced
    const sheet = q(1, '.pnsheet'), rows = qa(1, '.pnrow'), foot = q(1, '.pnfoot');
    const r1 = (t) => { tf(sheet, `translate(0 ${(-(1 - out(seg(t, 0, .3))) * 330).toFixed(1)})`);
      rows.forEach((g, i) => { const a = out(seg(t, .3 + i * .06, .38 + i * .06)), on = g.classList.contains('on'); const tk = g.querySelector('.pntk');
        if (tk) tk.style.strokeDashoffset = 1 - seg(t, .36 + i * .06, .44 + i * .06), tk.style.strokeDasharray = 1;
        const gone = on ? 0 : out(seg(t, .68, .82)); op(g, a * (1 - gone)); tf(g, `translate(${((1 - a) * -10 + gone * 30).toFixed(1)} ${160 + i * 40})`);
        const bar = g.querySelector('.pnbar'); bar.setAttribute('fill', on && t >= .84 ? '#B5DB6E' : '#DCE5DF'); });
      op(foot, out(seg(t, .86, 1))); };
    // scene 3: scrubbed by p — old boards off (top first), new boards up (bottom first), trim, paint
    const olds = qa(2, '.pnold'), news = qa(2, '.pnnew'), pc = q(2, '.pnpc'), trim = q(2, '.pntrim'), cbs = qa(2, '.pncb'), roll = q(2, '.pnroll');
    const phase = (p) => (p < .3 ? 0 : p < .65 ? 1 : p < .8 ? 2 : 3);
    const r2 = (p) => { olds.forEach((g, i) => { const a = inout(seg(p, .02 + i * .016, .08 + i * .016)); op(g, 1 - a); g.style.transform = `translate(${(i % 2 ? -1 : 1) * a * 18}px, ${a * 140}px) rotate(${(i % 2 ? -1 : 1) * a * 7}deg)`; g.style.transformBox = 'fill-box'; g.style.transformOrigin = 'center'; });
      news.forEach((g, i) => { const k = COURSES - 1 - i, a = out(seg(p, .3 + k * .02, .35 + k * .02)); op(g, a); g.style.transform = `translateY(${(1 - a) * 16}px)`; });
      trim.style.strokeDashoffset = 1 - out(seg(p, .65, .76)); cbs.forEach((c) => { c.style.transformBox = 'fill-box'; c.style.transformOrigin = 'bottom'; c.style.transform = `scaleY(${out(seg(p, .66, .8))})`; });
      const w = inout(seg(p, .8, 1)); pc.setAttribute('width', (520 * w).toFixed(1));
      const on = p > .8 && p < 1; op(roll, on ? 1 : 0); tf(roll, `translate(${(60 + 520 * w).toFixed(1)} ${(150 + Math.sin(w * 18) * 60).toFixed(1)})`);
      const ph = phase(p); scrub.querySelectorAll('.pnph li').forEach((li, k) => li.classList.toggle('on', k === ph)); s.querySelector('.pnfill').style.width = (p * 100) + '%'; s.querySelector('.pnthumb').style.left = (p * 100) + '%';
      sl.setAttribute('aria-valuenow', Math.round(p * 100)); sl.setAttribute('aria-valuetext', `${PH[ph]} (${Math.round(p * 100)}%)`); P3 = p; };
    // scene 4: the list ticks, the broom sweeps the deck, the warranty card lands and is stamped
    const lis = qa(3, '.pnli'), pol = qa(3, '.pnpol circle'), broom = q(3, '.pnbroom'), card = q(3, '.pncard'), stamp = q(3, '.pnstamp');
    const r3 = (t) => { lis.forEach((g, i) => { const tk = g.querySelector('.pntk'); tk.style.strokeDasharray = 1; tk.style.strokeDashoffset = 1 - out(seg(t, .04 + i * .11, .14 + i * .11)); });
      const b = seg(t, .4, .7), bx = -60 + 720 * inout(b); op(broom, b > 0 && b < 1 ? 1 : 0); tf(broom, `translate(${bx.toFixed(1)} ${(352 + Math.sin(b * 30) * 4).toFixed(1)}) rotate(${(-8 + Math.sin(b * 30) * 6).toFixed(1)})`);
      pol.forEach((c) => { const x = +c.getAttribute('cx'); op(c, bx > x + 10 ? 0 : 1); });
      const c = seg(t, .7, .84); op(card, c); card.style.transform = `translateY(${((1 - back(c)) * -50).toFixed(1)}px)`;
      const st = seg(t, .86, .96); op(stamp, st); stamp.style.transformBox = 'fill-box'; stamp.style.transformOrigin = 'center'; stamp.style.transform = `scale(${1 + (1 - out(st)) * .8})`; };
    const R = [r0, r1, r2, r3], DUR = [4200, 3200, 4600, 4000];
    let cur = 0, raf = 0, P3 = 1, seen = false;
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const play = (i) => { stop(); if (RM) { R[i](1); return; } const t0 = performance.now(), from = i === 2 ? 0 : 0;
      const step = (now) => { const t = Math.min(1, from + (now - t0) / DUR[i]); R[i](t); if (t < 1) raf = requestAnimationFrame(step); else raf = 0; }; R[i](from); raf = requestAnimationFrame(step); };
    const show = (i, say, focus) => { stop(); cur = i;
      tabs.forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; if (k === i && focus) b.focus(); });
      // (SVG elements have no .hidden property, so the scenes toggle the attribute itself)
      svgs.forEach((g, k) => { g.toggleAttribute('hidden', k !== i); }); txs.forEach((g, k) => { g.hidden = k !== i; }); scrub.hidden = i !== 2; panel.setAttribute('aria-labelledby', tabs[i].id);
      playB.querySelector('span').textContent = i === 2 ? 'Play the install' : 'Play again';
      if (say) live.textContent = `Step ${i + 1} of 4: ${S[i][0]}`; play(i); };
    tabs.forEach((b, i) => { b.addEventListener('click', () => show(i, true));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; let m = -1;
        if (d) m = (i + d + 4) % 4; else if (e.key === 'Home') m = 0; else if (e.key === 'End') m = 3; if (m >= 0) { e.preventDefault(); show(m, true, true); } }); });
    playB.addEventListener('click', () => play(cur));
    svgs[0].addEventListener('click', () => { if (cur === 0) play(0); });
    // the install scrubber: drag, click, keys; a scrub stops any playback
    const fromX = (x) => { const r = sl.getBoundingClientRect(); return cl((x - r.left) / r.width); };
    let drag = false;
    sl.addEventListener('pointerdown', (e) => { drag = true; stop(); sl.setPointerCapture(e.pointerId); r2(fromX(e.clientX)); });
    sl.addEventListener('pointermove', (e) => { if (drag) r2(fromX(e.clientX)); });
    const up = () => { drag = false; }; sl.addEventListener('pointerup', up); sl.addEventListener('pointercancel', up);
    sl.addEventListener('keydown', (e) => { const d = { ArrowRight: .05, ArrowUp: .05, ArrowLeft: -.05, ArrowDown: -.05, PageUp: .25, PageDown: -.25 }[e.key];
      if (d) { e.preventDefault(); stop(); r2(cl(Math.round((P3 + d) * 100) / 100)); } else if (e.key === 'Home') { e.preventDefault(); stop(); r2(0); } else if (e.key === 'End') { e.preventDefault(); stop(); r2(1); } });
    // calm at rest: every scene starts finished; the first one plays once when the section first comes into view
    R.forEach((r) => r(1));
    if (!RM && 'IntersectionObserver' in window) { const io = new IntersectionObserver((es) => { if (!seen && es.some((x) => x.isIntersecting)) { seen = true; io.disconnect(); play(cur); } }, { threshold: .35 }); io.observe(panel); }
  }
  return { wire, S, QUOTES, PH, COURSES };
})();
