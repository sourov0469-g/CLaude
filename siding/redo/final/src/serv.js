/* SECTION 3 — wiring. One scroll position (0..1 through the pinned length) drives four scenes: the track slides sideways, the active scene's
   drawing is scrubbed (every element carries its own start and end, an easing and the properties it moves: opacity, x, y, scale, rotate, stroke
   draw), the ledger row(s) of the scene in view light up. Only the active scene and its neighbour are updated each frame. Reduced motion: the four
   scenes stacked in their finished state, no pin. */
window.FServ = (function () {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, t) => a + (b - a) * t;
  const E = { io: (x) => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2, out: (x) => 1 - Math.pow(1 - x, 3), spring: (x) => { const c4 = (2 * Math.PI) / 3.2; return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -9 * x) * Math.sin((x * 10 - .75) * c4) + 1; } };
  const pair = (s) => s.split(',').map(Number);
  function prep(sc) { return [...sc.querySelectorAll('[data-a]')].map((el) => { const d = el.dataset, a = pair(d.a); return { el, a0: a[0], a1: a[1], o: d.o && pair(d.o), x: d.x && pair(d.x), y: d.y && pair(d.y), s: d.s && pair(d.s), r: d.r && pair(d.r), dash: d.d && pair(d.d), org: d.org, ease: d.e === 'spring' ? E.spring : E.out }; }); }
  function paint(items, q) {
    for (const it of items) { let t = clamp((q - it.a0) / (it.a1 - it.a0)); const e = it.ease(t), st = it.el.style;
      if (it.o) st.opacity = lerp(it.o[0], it.o[1], clamp(t * 1.6));   // opacity leads the motion so a part is visible as it settles
      if (it.dash) st.strokeDashoffset = lerp(it.dash[0], it.dash[1], E.io(t));
      let tr = ''; if (it.x || it.y) tr += `translate(${it.x ? lerp(it.x[0], it.x[1], e) : 0}px,${it.y ? lerp(it.y[0], it.y[1], e) : 0}px) `;
      if (it.r) tr += `rotate(${lerp(it.r[0], it.r[1], E.io(t))}deg) `; if (it.s) tr += `scaleX(${lerp(it.s[0], it.s[1], E.io(t))}) `;
      if (tr) st.transform = tr; if (it.org) st.transformOrigin = it.org; }
  }
  function wire(root) {
    const s = root.querySelector('.sv'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const track = s.querySelector('.sv-track'), scs = [...s.querySelectorAll('.sv-sc')], rows = [...s.querySelectorAll('.sv-row')], dots = [...s.querySelectorAll('.sv-dots button')];
    const items = scs.map(prep);
    const setRows = (i) => rows.forEach((r) => { const on = +r.dataset.s === i; r.toggleAttribute('data-on', on); r.toggleAttribute('data-vis', on); r.dataset.on = on ? '' : null; if (!on) r.removeAttribute('data-on'); });
    if (RM) { s.classList.add('sv-static'); items.forEach((it) => paint(it, 1)); rows.forEach((r) => { r.setAttribute('data-vis', ''); }); return; }
    let cur = -1, last = -1, tick = false; items.forEach((it) => paint(it, 0));
    const apply = (p) => {
      const sp = clamp(p) * 4 - 1e-6, i = clamp(Math.floor(sp), 0, 3), u = sp - i;
      // each scene dwells; the slide to the next takes the last 16% of its segment
      const slide = i < 3 ? E.io(clamp((u - .84) / .16)) : 0; const pos = i + slide;
      track.style.setProperty('--tx', (-pos * 25).toFixed(3) + '%');
      for (let k = 0; k < 4; k++) { const near = Math.abs(k - pos) < 1.05; if (!near) continue;
        const q = k < i ? 1 : k === i ? clamp((u - .04) / .72) : 0; paint(items[k], q); }
      const act = slide > .5 ? i + 1 : i; if (act !== cur) { cur = act; setRows(act); dots.forEach((d, k) => d.setAttribute('aria-current', String(k === act))); }
    };
    const upd = () => { tick = false; const r = s.getBoundingClientRect(), len = r.height - innerHeight; const p = clamp(-r.top / Math.max(1, len)); if (Math.abs(p - last) > 1e-4) { last = p; apply(p); } };
    const req = () => { if (!tick) { tick = true; requestAnimationFrame(upd); } };
    addEventListener('scroll', req, { passive: true }); addEventListener('resize', () => { last = -1; req(); });
    dots.forEach((d) => d.addEventListener('click', () => { const i = +d.dataset.i, r = s.getBoundingClientRect(), len = r.height - innerHeight; scrollTo({ top: scrollY + r.top + ((i + .5) / 4) * len, behavior: 'smooth' }); }));
    setRows(0); apply(0); cur = 0; req();
  }
  return { wire };
})();
