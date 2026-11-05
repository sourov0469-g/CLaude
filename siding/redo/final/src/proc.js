/* SECTION 7 — Process (Version D, "Four columns", upgraded). Four columns, one open at a time; the open column plays a small drawing that is a pure function of a
   time t (0..1), so it can play, be scrubbed with the pointer, or jump to a part with a chip. A progress thread joins the four. A gentle auto-advance walks the
   steps once and stops for good the moment the visitor hovers, focuses, clicks or presses a key; the pause button stops everything.
   Reduced motion: no loop, no auto-advance, every drawing shown finished; chips still jump to a part. Touch: no hover dependence; below 860 px the columns are rows and nothing advances by itself. */
window.FProc = (function () {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, t) => a + (b - a) * t, seg = (t, a, b) => clamp((t - a) / (b - a));
  const eio = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), eo = (x) => 1 - Math.pow(1 - x, 3), ei = (x) => x * x * x, ob = (x) => 1 + 2.6 * Math.pow(x - 1, 3) + 1.6 * Math.pow(x - 1, 2);
  const f2 = (v) => (Math.round(v * 100) / 100);
  const TITLES = ['Free inspection', 'Detailed proposal', 'Expert install', 'Final check'];
  const STOPS = [[118, 190], [72, 168], [210, 145], [120, 76], [236, 112]], PARK = [262, 48], T0 = .14;   // art 0: where the lens stops: siding, trim, windows, roof, gutters
  const ZN = ['siding', 'trim', 'windows', 'roof', 'gutters'];
  const zoneAt = (x, y) => {
    if ((x >= 88 && x <= 134 && y >= 122 && y <= 168) || (x >= 186 && x <= 234 && y >= 122 && y <= 168)) return 2;
    if ((Math.abs(x - 72) <= 14 || Math.abs(x - 248) <= 14) && y >= 100 && y <= 212) return 1;
    if ((y >= 106 && y <= 124 && x >= 44 && x <= 276) || (x >= 252 && x <= 274 && y >= 106 && y <= 208)) return 4;
    if (y < 106 && y > 34 && Math.abs(x - 160) <= (y - 40) / 72 * 104 + 14) return 3;
    if (x > 72 && x < 248 && y >= 124 && y <= 212) return 0;
    return -1;
  };

  function collect(svg) {
    return [...svg.querySelectorAll('[data-k]')].map((el) => { const [s, e] = el.dataset.t.split(',').map(Number); const d = (k) => (el.dataset[k] ? el.dataset[k].split(',').map(Number) : null); return { el, k: el.dataset.k, s, e, v: d('v'), c: d('c'), out: el.dataset.o === 'out', last: -1 }; });
  }
  function apply(it, t) {
    const f = seg(t, it.s, it.e); if (f === it.last) return; it.last = f; const el = it.el, st = el.style;
    if (it.k === 'd') { st.strokeDashoffset = f2(1 - f * f * (3 - 2 * f)); st.visibility = f <= 0 ? 'hidden' : ''; return; }
    if (it.k === 'f') { st.opacity = f2(it.out ? 1 - f : f); return; }
    if (it.k === 's') {
      const v = it.v || [0, 0]; if (it.out) { const p = ei(f); el.setAttribute('transform', `translate(${f2(v[0] * p)} ${f2(v[1] * p)})`); st.opacity = f2(1 - clamp((f - .25) / .75)); }
      else { const p = 1 - ob(f); el.setAttribute('transform', `translate(${f2(v[0] * p)} ${f2(v[1] * p)})`); st.opacity = f2(Math.min(1, f * 5)); } return;
    }
    const c = it.c || [0, 0];
    if (it.k === 'p') { const s = it.out ? 1 - eo(f) : Math.max(0, ob(f)); el.setAttribute('transform', `translate(${c[0]} ${c[1]}) scale(${f2(s)}) translate(${-c[0]} ${-c[1]})`); st.opacity = f2(it.out ? 1 - f * f : Math.min(1, f * 5)); return; }
    if (it.k === 'x') { const s = .5 + f * 1.3; el.setAttribute('transform', `translate(${c[0]} ${c[1]}) scale(${f2(s)}) translate(${-c[0]} ${-c[1]})`); st.opacity = f <= 0 || f >= 1 ? 0 : f2((1 - f) * .9); return; }
    if (it.k === 'w') { el.setAttribute('transform', `translate(${c[0]} 0) scale(${f2(eo(f))} 1) translate(${-c[0]} 0)`); st.opacity = f > 0 ? 1 : 0; }
  }

  function wire(root) {
    const s = root.querySelector('.pr'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const narrow = () => matchMedia('(max-width:859px)').matches, autoOK = () => !RM && !narrow();
    const colsEl = s.querySelector('.pr-cols'), items = [...s.querySelectorAll('.pr-item')], btns = items.map((i) => i.querySelector('.pr-ch button')), DUR = JSON.parse(colsEl.dataset.dur), ENDS = JSON.parse(colsEl.dataset.ends);
    const pp = s.querySelector('.pr-pp'), ppL = pp.querySelector('span'), live = s.querySelector('.pr-live'), cnt = s.querySelector('.pr-count'), cntB = cnt.querySelector('b'), cntS = cnt.querySelector('span');
    const nds = [...s.querySelectorAll('.pr-nd')], HOLD = 2.4;
    const arts = items.map((it, i) => {
      const svg = it.querySelector('.pr-art'), a = { i, it, svg, panel: it.querySelector('.pr-panel'), items: collect(svg), chips: [...it.querySelectorAll('.pr-chip')], ends: ENDS[i], t: 0, goal: null, th: 0, hold: false, over: false, px: .5, py: .5, hot: -2, lens: null, cs: [] };
      if (i === 0) { a.lens = { el: svg.querySelector('[data-lens]'), x: PARK[0], y: PARK[1], tx: PARK[0], ty: PARK[1] }; a.zones = ZN.map((n) => svg.querySelector(`[data-z="${n}"]`)); a.seen = new Set(); }
      if (i === 1) { a.pen = svg.querySelector('[data-pen]'); const R = JSON.parse(svg.dataset.cfg); a.kf = [[0, 252, 30]]; R.forEach((r) => { a.kf.push([r[3], r[0], r[2]], [r[4], r[1], r[2]]); }); a.kf.push([.56, 264, 196], [1, 264, 196]); }
      if (i === 2) { a.roll = svg.querySelector('[data-roll]'); }
      if (i === 3) { a.walk = svg.querySelector('[data-walk]'); a.broom = svg.querySelector('[data-broom]'); }
      return a;
    });
    let cur = 0, mode = 'manual', frozen = false, inView = false, finished = false, last = 0, raf = 0, started = false, hoverT = 0;

    /* ---- one drawing, a pure function of t ---- */
    function lensScript(t) {
      if (t < T0) return { x: lerp(PARK[0], PARK[0], 1), y: PARK[1], z: -1 };
      const slot = (ENDS[0][4] - T0) / 5, u = (t - T0) / slot, k = Math.min(4, Math.floor(u)), f = u >= 5 ? 1 : u - k, m = seg(f, 0, .38), from = k === 0 ? PARK : STOPS[k - 1], to = STOPS[k], w = seg(f, .38, 1);
      return { x: lerp(from[0], to[0], eio(m)) + (m >= 1 ? Math.sin(w * Math.PI * 2) * 9 : 0), y: lerp(from[1], to[1], eio(m)) + (m >= 1 ? Math.sin(w * Math.PI * 4) * 4 : 0), z: m >= 1 ? k : -1 };
    }
    function phase(a, t) { if (a.i === 0 && t < T0) return -1; for (let j = 0; j < a.ends.length; j++) if (t < a.ends[j] - .004) return j; return a.ends.length - 1; }
    function render(a, t) {
      for (const it of a.items) apply(it, t);
      if (a.i === 0) {
        let z;
        if (a.over && !RM) { const vb = a.svg.viewBox.baseVal, x = vb.x + a.px * vb.width, y = vb.y + a.py * vb.height; a.lens.tx = x; a.lens.ty = y; z = zoneAt(x, y); if (z >= 0) a.seen.add(z); }
        else { const L = lensScript(t); a.lens.tx = L.x; a.lens.ty = L.y; z = L.z; if (RM || t >= 1) { a.lens.tx = STOPS[4][0]; a.lens.ty = STOPS[4][1]; } }
        if (RM) { a.lens.x = a.lens.tx; a.lens.y = a.lens.ty; a.lens.el.setAttribute('transform', `translate(${f2(a.lens.x)} ${f2(a.lens.y)})`); }
        if (z !== a.hot) { a.hot = z; a.zones.forEach((g, k) => g.classList.toggle('hot', k === z)); }
        chips(a, z, t);
      } else {
        if (a.i === 1) { const kf = a.kf; let k = 0; while (k < kf.length - 2 && t > kf[k + 1][0]) k++; const A = kf[k], B = kf[k + 1], u = eio(seg(t, A[0], B[0])); a.pen.setAttribute('transform', `translate(${f2(lerp(A[1], B[1], u))} ${f2(lerp(A[2], B[2], u))})`); a.pen.style.opacity = f2(seg(t, .0, .03) * (1 - seg(t, .54, .6))); }
        if (a.i === 2) { const p = seg(t, .62, .76), y = 124 + 46 * Math.sin(p * Math.PI * 6); a.roll.setAttribute('transform', `translate(${f2(73 + 174 * eo(p))} ${f2(y)})`); a.roll.style.opacity = f2(seg(t, .6, .62) * (1 - seg(t, .76, .79))); }
        if (a.i === 3) { const w = seg(t, 0, .24), x = 34 + 138 * eio(w); a.walk.setAttribute('transform', `translate(${f2(x)} ${f2(222 - Math.abs(Math.sin(x / 5)) * 2.4)})`); const p = seg(t, .5, .72); a.broom.setAttribute('transform', `translate(${f2(20 + 176 * p)} 198) rotate(${f2(Math.sin(p * 50) * 4)})`); a.broom.style.opacity = f2(seg(t, .49, .5) * (1 - seg(t, .72, .75))); }
        chips(a, phase(a, t), t);
      }
    }
    function chips(a, z, t) {
      a.chips.forEach((c, j) => {
        const on = a.i === 0 ? j === z : j === phase(a, t), done = a.i === 0 ? (a.over ? a.seen.has(j) : t >= a.ends[j] - .02) : t >= a.ends[j] - .004;
        const key = (on ? 1 : 0) + (done ? 2 : 0); if (a.cs[j] === key) return; a.cs[j] = key; c.classList.toggle('on', on); c.classList.toggle('done', done); if (on) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
      });
    }
    function lensMove(a, dt) { const L = a.lens, k = 1 - Math.exp(-dt * 13), dx = L.tx - L.x, dy = L.ty - L.y; if (Math.abs(dx) + Math.abs(dy) < .15) { L.x = L.tx; L.y = L.ty; } else { L.x += dx * k; L.y += dy * k; } L.el.setAttribute('transform', `translate(${f2(L.x)} ${f2(L.y)})`); return Math.abs(L.tx - L.x) + Math.abs(L.ty - L.y) > .15; }

    /* ---- the thread, the counter, the background route ---- */
    function railFill() {
      const a = arts[cur]; items.forEach((it, k) => {
        const sg = it.querySelector('.pr-seg'), f = k < cur ? 1 : k === cur && mode === 'auto' ? clamp((a.t * DUR[cur] + a.th) / (DUR[cur] + HOLD)) : 0;
        sg.style.setProperty('--f', f2(f)); sg.classList.toggle('live', k === cur && mode === 'auto' && !finished && f > 0 && f < 1);
        it.classList.toggle('done', k < cur || (finished && k === cur));
      });
      nds.forEach((n, k) => n.classList.toggle('on', k <= cur && k < 4 ? true : (k === 4 && finished)));
      finished = cur === 3 && arts[3].t >= 1;
    }
    function count() { cntB.textContent = cur + 1; cntS.textContent = TITLES[cur]; cntB.classList.add('tick'); setTimeout(() => cntB.classList.remove('tick'), 320); }
    function btnState() {
      const a = arts[cur], playing = !frozen && (mode === 'auto' ? !finished : (a.t < 1 && !a.hold && !RM));
      pp.classList.toggle('paused', !playing); const lab = playing ? 'Pause' : 'Play'; if (ppL.textContent !== lab) { ppL.textContent = lab; pp.setAttribute('aria-label', playing ? 'Pause the steps' : 'Play the steps'); }
      return playing;
    }

    /* ---- the loop: only while something is changing and the section is on screen ---- */
    function start() { if (!raf && inView && !document.hidden && !RM) { last = performance.now(); raf = requestAnimationFrame(frame); } }
    function frame(now) {
      raf = 0; const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; const a = arts[cur]; let busy = false;
      if (a.goal != null) {
        const d = a.goal - a.t;
        if (Math.abs(d) < .002) { a.t = a.goal; if (!a.over) a.goal = null; } else { a.t += d * (1 - Math.exp(-dt * (a.over ? 12 : 7))); busy = true; }
        render(a, a.t);
      } else if (!frozen && !a.over && !a.hold) {
        if (a.t < 1) { a.t = Math.min(1, a.t + dt / DUR[cur]); render(a, a.t); busy = true; }
        else if (mode === 'auto') { a.th += dt; busy = true; if (a.th >= HOLD) { if (cur < 3) { open(cur + 1, false); return; } mode = 'manual'; finished = true; } }
      } else if (a.i === 0) render(a, a.t);
      if (a.i === 0 && lensMove(a, dt)) busy = true;
      railFill(); btnState();
      if (busy) start();
    }

    /* ---- opening a column ---- */
    function setBW() { const W = colsEl.clientWidth, g = 10, gr = matchMedia('(max-width:1180px)').matches ? [4.4, 7.4] : [3.6, 6.6]; colsEl.style.setProperty('--bw', f2((W - 3 * g) * gr[0] / gr[1]) + 'px'); }
    function open(i, user) {
      if (i === cur) { if (user) stopAuto(); return; }
      cur = i; finished = false;
      items.forEach((it, k) => { const on = k === i; it.classList.toggle('on', on); btns[k].setAttribute('aria-expanded', on ? 'true' : 'false'); });
      const a = arts[i]; a.t = RM ? 1 : 0; a.goal = null; a.th = 0; a.hold = false; if (a.i === 0) a.seen.clear(); a.cs = []; render(a, a.t);
      if (user) { mode = 'manual'; frozen = false; live.textContent = `Step ${i + 1} of 4: ${TITLES[i]}`; }
      count(); railFill(); btnState(); start();
      if (user && narrow()) setTimeout(() => { const r = btns[i].getBoundingClientRect(); if (r.top < 96 || r.bottom > innerHeight - 90) scrollTo({ top: scrollY + r.top - 100, behavior: RM ? 'instant' : 'smooth' }); }, 540);
    }
    function stopAuto() { if (mode === 'auto') { mode = 'manual'; railFill(); btnState(); } clearTimeout(hoverT); }

    /* ---- the visitor ---- */
    btns.forEach((b, i) => {
      b.addEventListener('click', () => open(i, true));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; let n = null; if (d) n = (i + d + 4) % 4; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = 3; if (n === null) return; e.preventDefault(); btns[n].focus(); open(n, true); });
    });
    s.addEventListener('focusin', () => stopAuto());
    items.forEach((it, i) => {
      const col = it.querySelector('.pr-col');
      col.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse' || !fine) return; stopAuto(); if (i === cur) return; clearTimeout(hoverT); hoverT = setTimeout(() => open(i, true), 140); });
      col.addEventListener('pointerleave', () => clearTimeout(hoverT));
      const a = arts[i];
      a.panel.addEventListener('pointerenter', (e) => { if (e.pointerType === 'touch' || RM || i !== cur) return; stopAuto(); a.over = true; start(); });
      a.panel.addEventListener('pointermove', (e) => {
        if (!a.over || RM) return; const r = a.svg.getBoundingClientRect(); a.px = (e.clientX - r.left) / r.width; a.py = (e.clientY - r.top) / r.height;
        if (a.i !== 0) a.goal = clamp((a.px - .05) / .9); a.hold = false; start();
      });
      a.panel.addEventListener('pointerleave', () => { if (!a.over) return; a.over = false; if (a.i !== 0) a.goal = null; start(); });
      a.chips.forEach((c, j) => c.addEventListener('click', () => {
        stopAuto(); frozen = false; a.hold = true; const g = a.i === 0 ? a.ends[j] - .02 : a.ends[j];
        if (a.i === 0) a.seen.clear();
        if (RM) { a.t = g; render(a, g); btnState(); return; }
        a.goal = g; start();
      }));
    });
    pp.addEventListener('click', () => {
      const a = arts[cur], playing = btnState();
      if (playing) { frozen = true; } else {
        frozen = false; a.hold = false; a.goal = null; if (autoOK()) mode = 'auto';
        if (a.t >= 1 && (cur === 3 || mode !== 'auto')) { if (cur === 3 && mode === 'auto') open(0, false); else { a.t = 0; a.th = 0; } } else if (a.t >= 1) a.th = Math.max(a.th, HOLD - .8);
        if (cur === 3 && finished && mode === 'auto') { finished = false; open(0, false); }
      }
      btnState(); railFill(); start();
    });
    if (RM) pp.hidden = true;

    /* ---- layout, view, parallax ---- */
    new ResizeObserver(setBW).observe(colsEl); setBW();
    new IntersectionObserver((es) => es.forEach((e) => {
      inView = e.isIntersecting; s.classList.toggle('pr-live-on', inView && !RM);
      if (inView && !started) { started = true; if (autoOK()) mode = 'auto'; }
      if (inView) start();
    }), { threshold: .35 }).observe(colsEl);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
    let pt = false; const par = () => { pt = false; const r = s.getBoundingClientRect(); s.style.setProperty('--p', clamp((innerHeight - r.top) / (innerHeight + r.height)).toFixed(3)); };
    if (!RM) { addEventListener('scroll', () => { if (!pt) { pt = true; requestAnimationFrame(par); } }, { passive: true }); addEventListener('resize', par); par(); }

    arts.forEach((a, i) => { a.t = i === 0 && !RM ? 0 : 1; render(a, a.t); });
    railFill(); btnState();
    window.__proc = { S: () => ({ cur, mode, frozen, finished, inView, t: arts[cur].t, goal: arts[cur].goal, hold: arts[cur].hold, over: arts[cur].over }), arts, open, go: (g) => { const a = arts[cur]; stopAuto(); a.hold = true; a.goal = g; start(); } };
  }
  return { wire };
})();
