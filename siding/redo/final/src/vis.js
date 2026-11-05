/* SECTION 4 — wiring. The recolour: out = target x (luminance / reference) inside a hand-traced siding mask, so the photo's own boards, light and
   shadow stay (the same tested method as before). The siding is cut into small tiles; the pointer lifts, tilts and scatters the tiles near it on
   springs over a house-wrap reveal, and they settle back when it leaves. A colour change flips the tiles in a wave from the ground up. Three offscreen
   layers: A (the recoloured photograph), S (the siding only, with alpha), W (the photograph with the siding replaced by house wrap). Touch: a tap lifts
   the tiles around the finger and they return. Reduced motion: no tiles, instant colour. */
window.FVis = (function () {
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const YREF = 208.6, HI = 0.5, TW = 58, TH = 24;
  function wire(root) {
    const s = root.querySelector('.vz'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const inn = s.querySelector('.vz-in'), img = s.querySelector('.vz-src'), cv = s.querySelector('.vz-cv'), stage = s.querySelector('.vz-stage');
    const MASK = JSON.parse(inn.dataset.m), CP = JSON.parse(inn.dataset.cp);
    const sw = [...s.querySelectorAll('.vz-sw')], lts = [...s.querySelectorAll('.vz-lt')], lites = [...s.querySelectorAll('.vz-lite')], now = s.querySelector('.vz-now'), pick = s.querySelector('.vz-pick'), tag = s.querySelector('.vz-tag'), hint = s.querySelector('.vz-hint'), orig = s.querySelector('.vz-orig');
    const cmp = s.querySelector('.vz-cmp'), sur = s.querySelector('.vz-sur'), rst = s.querySelector('.vz-rst');
    let st = { col: 15, light: 'midday' }, ready = false, W = 0, H = 0, O = null, mask = null, tiles = [], active = new Set(), raf = 0, last = 0, wave = null, hinted = false, comparing = false;
    const ctx = cv.getContext('2d');
    const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
    let Ac, Sc, Sold, Wc;
    // ---- the mask (1400 px space) rasterised to the photograph's own pixels
    function rasterMask() {
      const sc = W / MASK.w, c = mk(W, H), x = c.getContext('2d', { willReadFrequently: true }); x.scale(sc, sc);
      const p = new Path2D(); MASK.polys.forEach((poly) => { poly.forEach((pt, k) => (k ? p.lineTo(pt[0], pt[1]) : p.moveTo(pt[0], pt[1]))); p.closePath(); }); x.fillStyle = '#000'; x.fill(p, 'evenodd');
      const d = x.getImageData(0, 0, W, H).data, a = new Uint8Array(W * H); for (let i = 0, k = 3; i < a.length; i++, k += 4) a[i] = d[k]; return a;
    }
    // ---- the layers
    function build() {
      W = cv.width; H = cv.height; const t = mk(W, H), x = t.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, W, H); O = x.getImageData(0, 0, W, H); mask = rasterMask();
      Ac = mk(W, H); Sc = mk(W, H); Sold = mk(W, H); Wc = mk(W, H);
      // the house-wrap plate: the photograph with the siding replaced by wrap (a pale grey-blue sheet, taped seams, staples), keeping the wall's own shading
      const wd = new ImageData(new Uint8ClampedArray(O.data), W, H), o = O.data, w = wd.data;
      for (let y = 0, i = 0; y < H; y++) for (let xx = 0; xx < W; xx++, i++) { const a = mask[i]; if (!a) continue; const k = i * 4, Y = .2126 * o[k] + .7152 * o[k + 1] + .0722 * o[k + 2], sh = .74 + .26 * clamp(Y / YREF, 0, 1.2);
        const seam = (y % 170) < 3 ? .86 : 1, stap = ((y % 170) < 12 && (xx % 64) < 4 && (y % 170) > 6) ? .7 : 1, n = 1 + (((xx * 7 + y * 13) % 11) - 5) * .004, f = sh * seam * stap * n, al = a / 255;
        w[k] = o[k] * (1 - al) + 196 * f * al; w[k + 1] = o[k + 1] * (1 - al) + 206 * f * al; w[k + 2] = o[k + 2] * (1 - al) + 212 * f * al; }
      Wc.getContext('2d').putImageData(wd, 0, 0);
      // the tiles: short pieces of siding (58 x 24 px), only where the mask covers them
      for (let y = 0; y < H; y += TH) for (let x2 = 0; x2 < W; x2 += TW) { let c = 0; for (let yy = y; yy < Math.min(H, y + TH); yy += 3) for (let xx = x2; xx < Math.min(W, x2 + TW); xx += 4) c += mask[yy * W + xx] > 128 ? 1 : 0;
        if (c > (TW / 4) * (TH / 3) * .35) tiles.push({ x: x2, y, w: Math.min(TW, W - x2), h: Math.min(TH, H - y), cx: x2 + TW / 2, cy: y + TH / 2, ox: 0, oy: 0, or: 0, os: 1, vx: 0, vy: 0, vr: 0, vs: 0, lift: 0, seed: ((x2 * 73856093) ^ (y * 19349663)) % 1000 / 1000, tx: 0, ty: 0, tr: 0, ts: 1, ph: -1, delay: 0 }); }
      ready = true; paint(false);
    }
    // ---- paint: A (the recoloured photograph) and S (the siding alone, with alpha)
    function paint(wave_) {
      if (!ready) return; const t = hex(CP[st.col][1]), o = O.data, ad = new ImageData(new Uint8ClampedArray(o), W, H), sd = new ImageData(W, H), a = ad.data, sdd = sd.data;
      for (let i = 0, k = 0; i < mask.length; i++, k += 4) { const m = mask[i]; if (!m) continue; const Y = .2126 * o[k] + .7152 * o[k + 1] + .0722 * o[k + 2]; let r = Y / YREF; if (r > 1) r = 1 + (r - 1) * HI; const al = m / 255;
        const R = Math.min(255, t[0] * r), G = Math.min(255, t[1] * r), B = Math.min(255, t[2] * r);
        a[k] = o[k] * (1 - al) + R * al; a[k + 1] = o[k + 1] * (1 - al) + G * al; a[k + 2] = o[k + 2] * (1 - al) + B * al; sdd[k] = R; sdd[k + 1] = G; sdd[k + 2] = B; sdd[k + 3] = m; }
      if (wave_ && !RM) { Sold.getContext('2d').clearRect(0, 0, W, H); Sold.getContext('2d').drawImage(Sc, 0, 0); }
      Ac.getContext('2d').putImageData(ad, 0, 0); Sc.getContext('2d').putImageData(sd, 0, 0);
      if (wave_ && !RM) startWave(); else if (!active.size) draw();
    }
    // ---- drawing
    function draw() {
      ctx.drawImage(Ac, 0, 0); if (!active.size) return;
      const list = [...active].sort((p, q) => p.lift - q.lift);
      for (const t of list) ctx.drawImage(Wc, t.x, t.y, t.w, t.h, t.x, t.y, t.w, t.h);
      for (const t of list) { const src = (wave && t.ph >= 0 && t.ph < .5) ? Sold : Sc; ctx.save(); ctx.translate(t.cx + t.ox, t.cy + t.oy); ctx.rotate(t.or * Math.PI / 180);
        const fl = t.ph >= 0 ? Math.max(.06, Math.abs(Math.cos(t.ph * Math.PI))) : 1; ctx.scale(t.os, t.os * fl);
        const lf = Math.min(1, t.lift); if (lf > .02) { ctx.shadowColor = `rgba(8,18,14,${.42 * lf})`; ctx.shadowBlur = 6 + 16 * lf; ctx.shadowOffsetX = 3 * lf; ctx.shadowOffsetY = 6 + 10 * lf; }
        ctx.drawImage(src, t.x, t.y, t.w, t.h, -t.w / 2, -t.h / 2, t.w, t.h); ctx.restore(); }
    }
    // ---- physics: springs toward a target; targets from the pointer
    function step(now) {
      raf = 0; const dt = Math.min(2.2, (now - (last || now)) / 16.67); last = now;
      for (const t of [...active]) {
        if (wave && t.ph >= 0) { const e = clamp((now - wave.t0 - t.delay) / 300); t.ph = now - wave.t0 < t.delay ? 0 : e; if (e >= 1) { t.ph = -1; } }
        const k = .2 * dt, d = Math.pow(.74, dt);
        t.vx = (t.vx + (t.tx - t.ox) * k) * d; t.vy = (t.vy + (t.ty - t.oy) * k) * d; t.vr = (t.vr + (t.tr - t.or) * k) * d; t.vs = (t.vs + (t.ts - t.os) * k) * d;
        t.ox += t.vx * dt; t.oy += t.vy * dt; t.or += t.vr * dt; t.os += t.vs * dt; t.lift = Math.min(1.2, Math.hypot(t.ox, t.oy) / 34 + Math.abs(t.os - 1) * 4);
        const rest = Math.abs(t.tx - t.ox) < .08 && Math.abs(t.ty - t.oy) < .08 && Math.abs(t.tr - t.or) < .08 && Math.abs(t.ts - t.os) < .002 && Math.abs(t.vx) + Math.abs(t.vy) < .05 && t.ph < 0 && t.tx === 0 && t.ty === 0;
        if (rest) { t.ox = t.oy = t.or = 0; t.os = 1; t.lift = 0; active.delete(t); } }
      if (wave && now - wave.t0 > wave.len) { wave = null; }
      draw(); if (active.size) raf = requestAnimationFrame(step); else last = 0;
    }
    const kick = () => { if (!raf && ready) raf = requestAnimationFrame(step); };
    function aim(px, py, R, power) {
      for (const t of tiles) { const dx = t.cx - px, dy = t.cy - py, d = Math.hypot(dx, dy);
        if (d < R && d > .001) { const f = Math.pow(1 - d / R, 1.4) * power; t.tx = (dx / d) * f * 46 + (t.seed - .5) * f * 14; t.ty = (dy / d) * f * 34 - f * 20; t.tr = (t.seed - .5) * f * 46; t.ts = 1 + f * .16; active.add(t); }
        else if (t.tx || t.ty) { t.tx = 0; t.ty = 0; t.tr = 0; t.ts = 1; active.add(t); } }
      kick();
    }
    const relax = () => { for (const t of active) { t.tx = t.ty = t.tr = 0; t.ts = 1; } kick(); };
    function startWave() {
      const now = performance.now(); wave = { t0: now, len: 1100 }; const ys = tiles.map((t) => t.cy), y0 = Math.min(...ys), y1 = Math.max(...ys);
      for (const t of tiles) { t.ph = 0; t.delay = (1 - (t.cy - y0) / (y1 - y0 + 1)) * 560 + t.seed * 120; active.add(t); } kick();
    }
    // ---- pointer
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H, r.width]; };
    if (!RM) {
      if (FINE) { cv.addEventListener('pointermove', (e) => { if (!ready || comparing) return; const [x, y, w] = pos(e); aim(x, y, W * .085, 1); if (!hinted) { hinted = true; hint.classList.add('off'); } }); cv.addEventListener('pointerleave', relax); }
      cv.addEventListener('pointerdown', (e) => { if (!ready || FINE) return; const [x, y] = pos(e); aim(x, y, W * .11, 1.15); setTimeout(relax, 900); hint.classList.add('off'); });
    }
    // ---- controls
    const say = () => { const n = CP[st.col][0]; now.textContent = `${n} siding, ${st.light === 'midday' ? 'midday light' : st.light === 'golden' ? 'golden hour light' : st.light + ' light'}.`; pick.innerHTML = `<b>${n}</b> siding · window trim as installed`; tag.querySelector('b').textContent = n; tag.querySelector('i').style.background = CP[st.col][1]; };
    const setCol = (i, byKey) => { st.col = i; sw.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (byKey) sw[i].focus(); say(); paint(true); };
    sw.forEach((b, i) => { b.addEventListener('click', () => setCol(i, false)); b.addEventListener('keydown', (e) => { let n = i; if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % sw.length; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i + sw.length - 1) % sw.length; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = sw.length - 1; else return; e.preventDefault(); setCol(n, true); }); });
    const setLight = (l, byKey) => { st.light = l; lts.forEach((b) => { const on = b.dataset.l === l; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; }); lites.forEach((x) => x.classList.toggle('on', x.dataset.l === l)); say(); };
    lts.forEach((b, i) => { b.addEventListener('click', () => setLight(b.dataset.l)); b.addEventListener('keydown', (e) => { let n = i; if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % lts.length; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i + lts.length - 1) % lts.length; else return; e.preventDefault(); setLight(lts[n].dataset.l); lts[n].focus(); }); });
    const holdOn = () => { comparing = true; cv.classList.add('cmp'); orig.classList.add('on'); cmp.setAttribute('aria-pressed', 'true'); relax(); }, holdOff = () => { comparing = false; cv.classList.remove('cmp'); orig.classList.remove('on'); cmp.setAttribute('aria-pressed', 'false'); };
    cmp.addEventListener('pointerdown', (e) => { e.preventDefault(); holdOn(); try{cmp.setPointerCapture(e.pointerId);}catch(_){} }); cmp.addEventListener('pointerup', holdOff); cmp.addEventListener('pointercancel', holdOff); cmp.addEventListener('lostpointercapture', holdOff);
    cmp.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) holdOn(); } }); cmp.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') holdOff(); }); cmp.addEventListener('blur', holdOff);
    sur.addEventListener('click', () => { let n; do { n = Math.floor(Math.random() * CP.length); } while (n === st.col); setCol(n, false); });
    rst.addEventListener('click', () => { setLight('midday'); setCol(15, false); });
    say(); setLight('midday');
    const start = () => { if (ready || !img.complete || !img.naturalWidth) return; build(); };
    const boot = () => { if (img.complete) start(); else img.addEventListener('load', start, { once: true }); };
    if ('IntersectionObserver' in window) { const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); boot(); } }, { rootMargin: '700px 0px' }); io.observe(s); } else boot();
    // the drawn background drifts at two speeds while the section is on screen
    const far = s.querySelector('.vz-far'), near = s.querySelector('.vz-near');
    if (!RM && far && near && 'IntersectionObserver' in window) { let on = false, tick = false;
      const upd = () => { tick = false; const r = s.getBoundingClientRect(), p = clamp((r.top + r.height / 2 - innerHeight / 2) / (innerHeight * .9), -1, 1); far.style.setProperty('--py', (p * -24).toFixed(1) + 'px'); near.style.setProperty('--py', (p * -60).toFixed(1) + 'px'); };
      const req = () => { if (on && !tick) { tick = true; requestAnimationFrame(upd); } };
      new IntersectionObserver((es) => { on = es.some((e) => e.isIntersecting); if (on) req(); }).observe(s); addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); }
    window.__vz = { get tiles() { return tiles.length; }, get active() { return active.size; }, get ready() { return ready; }, aim: (x, y, r, p) => aim(x, y, r, p), relax };
  }
  return { wire };
})();
