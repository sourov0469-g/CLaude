/* VISUALISER V — "Recolour a real Austin Pro house" (upgrade plan V-A). Reference: Rimowa UNIQUE, the designed stepped instrument
   (Colour, Trim, Preview). One real job photo with two hand-traced masks (siding; window frames). The recolour keeps the photo's own
   boards, light and shadow: out = target x (Y / Yref) inside the mask, highlights above Yref compressed by half (the same method
   the prep sub-agent tested in Python). The markup, masks and colour lists come from build_site.py visV(). A colour change sweeps
   down the boards course by course (a stepped clip on a second canvas); reduced motion swaps instantly. Configurator only. */
window.Vis10 = (function () {
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const YREF = 136.5, HI = 0.5;
  function wire(root) {
    const s = root.querySelector('.vclS'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const main = s.querySelector('.vclmain'), img = s.querySelector('.vclsrc'), A = s.querySelector('.vclA'), B = s.querySelector('.vclB'), O = s.querySelector('.vclO'), N = s.querySelector('.vclN');
    const CP = JSON.parse(main.dataset.cp), TR = JSON.parse(main.dataset.trims), WM = JSON.parse(main.dataset.w), TM = JSON.parse(main.dataset.t);
    const now = s.querySelector('.vclnow'), pick = s.querySelector('.vclpick'), steps = [...s.querySelectorAll('.vclst')];
    const panels = [s.querySelector('.vclp0'), s.querySelector('.vclp1')], panel = s.querySelector('.vclpanel'), fig = s.querySelector('.vclfig'), prev = s.querySelector('.vclprev');
    const nx = s.querySelector('.vclnx'), bk = s.querySelector('.vclbk');
    let st = { col: 15, trim: 0, step: 0 }, orig = null, work = null, anim = null, ready = false;
    // ---- the recolour engine (starts when the photo is decoded)
    function rasterMask(m, w, h) {
      const sc = w / m.w, c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d', { willReadFrequently: true }); x.scale(sc, sc);
      const p = new Path2D(); m.polys.forEach((poly) => { poly.forEach((pt, k) => (k ? p.lineTo(pt[0], pt[1]) : p.moveTo(pt[0], pt[1]))); p.closePath(); });
      x.fillStyle = '#000'; x.fill(p, 'evenodd'); const d = x.getImageData(0, 0, w, h).data, idx = []; for (let i = 3, k = 0; i < d.length; i += 4, k++) if (d[i]) idx.push(k);
      const ix = Int32Array.from(idx), al = new Uint8Array(ix.length); ix.forEach((k, j) => (al[j] = d[k * 4 + 3])); return { ix, al };
    }
    function prep(mk, yref) {
      const { ix, al } = rasterMask(mk, A.width, A.height), r = new Float32Array(ix.length), d = orig.data; let ys = null;
      const Y = (k) => 0.2126 * d[k * 4] + 0.7152 * d[k * 4 + 1] + 0.0722 * d[k * 4 + 2];
      if (!yref) { ys = Float32Array.from(ix, (k) => Y(k)).sort(); yref = ys[Math.floor(ys.length * 0.6)] || 1; }
      for (let j = 0; j < ix.length; j++) { let q = Y(ix[j]) / yref; if (q > 1) q = 1 + (q - 1) * HI; r[j] = q; }
      return { ix, al, r };
    }
    let wall, trim;
    function paint(ctx, wallHex, trimHex) {
      const o = orig.data, out = work.data; out.set(o);
      const go = (g, t) => { if (!t) return; const [tr, tg, tb] = hex(t); for (let j = 0; j < g.ix.length; j++) { const i = g.ix[j] * 4, a = g.al[j] / 255, q = g.r[j], inv = 1 - a;
        out[i] = o[i] * inv + Math.min(255, tr * q) * a; out[i + 1] = o[i + 1] * inv + Math.min(255, tg * q) * a; out[i + 2] = o[i + 2] * inv + Math.min(255, tb * q) * a; } };
      go(wall, wallHex); go(trim, trimHex); ctx.putImageData(work, 0, 0);
    }
    const trimHex = () => { const t = TR[st.trim][1]; return t === 'match' ? CP[st.col][1] : t || null; };
    const cA = A.getContext('2d'), cB = B.getContext('2d');
    function show(animate) {
      if (!ready) return;
      if (anim) { anim.finish(); anim = null; }
      if (!animate || RM || !B.animate) { paint(cA, CP[st.col][1], trimHex()); }
      else { paint(cB, CP[st.col][1], trimHex()); B.style.visibility = 'visible';
        anim = B.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }], { duration: 900, easing: 'steps(36, end)' });
        const done = () => { anim = null; cA.drawImage(B, 0, 0); B.style.visibility = 'hidden'; }; anim.onfinish = done; anim.oncancel = () => { B.style.visibility = 'hidden'; }; }
      say();
    }
    const say = () => { const tn = TR[st.trim], t = tn[0] === 'as' ? 'window frames as photographed' : tn[0] === 'match' ? 'window frames matching the body' : `${s.querySelectorAll('.vcltr b')[st.trim].textContent} window frames`;
      now.textContent = `${CP[st.col][0]} siding, ${t}.`; pick.innerHTML = `<b>${CP[st.col][0]}</b> · ${tn[0] === 'as' ? 'window frames as photographed' : tn[0] === 'match' ? 'frames matching the body' : '<b>' + s.querySelectorAll('.vcltr b')[st.trim].textContent + '</b> frames'}`; };
    // ---- steps
    function go(n) {
      st.step = n; main.dataset.step = n; steps.forEach((b, i) => { if (i === n) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      panels[0].hidden = n !== 0; panels[1].hidden = n !== 1; panel.hidden = n === 2; fig.hidden = n === 2; prev.hidden = n !== 2;
      bk.hidden = n === 0; nx.textContent = n === 0 ? 'Next: trim' : 'Next: preview';
      if (n === 2) { O.getContext('2d').drawImage(img, 0, 0, O.width, O.height); N.getContext('2d').drawImage(A, 0, 0, N.width, N.height); }
    }
    steps.forEach((b, i) => b.addEventListener('click', () => go(i))); nx.addEventListener('click', () => go(st.step + 1)); bk.addEventListener('click', () => go(st.step - 1));
    s.querySelector('.vclbk2').addEventListener('click', () => go(0));
    // ---- radios (roving tabindex, arrows)
    function radios(sel, key) {
      const bs = [...s.querySelectorAll(sel)];
      const set = (i, byKey) => { st[key] = i; bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (byKey) bs[i].focus(); show(true); };
      bs.forEach((b, i) => { b.addEventListener('click', () => set(i, false));
        b.addEventListener('keydown', (e) => { let n = i; if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % bs.length; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i + bs.length - 1) % bs.length; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = bs.length - 1; else return; e.preventDefault(); set(n, true); }); });
    }
    radios('.vclsw', 'col'); radios('.vcltr', 'trim');
    // ---- start once the photo is decoded, and only when the section nears the screen
    const start = () => { if (ready || !img.complete || !img.naturalWidth) return; const w = A.width, h = A.height, t = document.createElement('canvas'); t.width = w; t.height = h; const x = t.getContext('2d', { willReadFrequently: true });
      x.drawImage(img, 0, 0, w, h); orig = x.getImageData(0, 0, w, h); work = new ImageData(w, h); wall = prep(WM, YREF); trim = prep(TM, 0); ready = true; paint(cA, CP[st.col][1], trimHex()); A.style.visibility = 'visible'; say(); };
    const boot = () => { if (img.complete) start(); else img.addEventListener('load', start, { once: true }); };
    if ('IntersectionObserver' in window) { const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); boot(); } }, { rootMargin: '600px 0px' }); io.observe(s); } else boot();
    // ---- background drift (two drawn layers, transform only, while visible)
    const far = s.querySelector('.vclfar'), near = s.querySelector('.vclnear');
    if (!RM && far && near && 'IntersectionObserver' in window) { let on = false, tick = false;
      const upd = () => { tick = false; const r = s.getBoundingClientRect(), p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / (innerHeight * .9))); far.style.setProperty('--py', (p * -24).toFixed(1) + 'px'); near.style.setProperty('--py', (p * -60).toFixed(1) + 'px'); };
      const req = () => { if (on && !tick) { tick = true; requestAnimationFrame(upd); } };
      new IntersectionObserver((es) => { on = es.some((e) => e.isIntersecting); if (on) req(); }).observe(s); addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); }
    say();
  }
  return { wire };
})();
