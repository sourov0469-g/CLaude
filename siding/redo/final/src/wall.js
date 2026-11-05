/* SECTION 2 — wiring. Scroll position (0..1 through the pinned length) drives everything: the sashes swing open, a rectangle grows from the window to
   the whole screen (clip-path on the full-screen film, so the film is never resized), the wall type fades and settles back, then the words and the
   action rise onto the playing film. The film is the firm's own hero film, LINKED (never embedded); a poster frame is embedded as the fallback.
   Reduced motion: no pin; the film is an ordinary player. Touch: same scroll choreography (no hover crack). */
window.FWall = (function () {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (x) => { x = clamp(x); return x * x * (3 - 2 * x); }, ease = (x) => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  function wire(root) {
    const s = root.querySelector('.fw'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pin = s.querySelector('.fw-pin'), vidBox = s.querySelector('.fw-vid'), v = s.querySelector('video'), over = s.querySelector('.fw-over'), pp = s.querySelector('.fw-pp'), anchor = s.querySelector('.fw-win'), wallTxt = s.querySelector('.fw-h .w');
    const PLAY = pp.dataset.play, PAUSE = pp.dataset.pause;
    // ---- the film (linked): chosen by screen width, loaded only when the section is near
    const pick = () => { const w = innerWidth; return w >= 1000 ? s.dataset.vd : w >= 600 ? s.dataset.vt : s.dataset.vm; };
    let loaded = false, failed = false;
    const load = () => { if (loaded) return; loaded = true; v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'; v.src = pick(); v.addEventListener('error', () => { failed = true; pp.hidden = true; }, { once: true }); v.load(); };
    const syncPP = () => { pp.innerHTML = v.paused ? PLAY : PAUSE; pp.setAttribute('aria-label', v.paused ? 'Play the film' : 'Pause the film'); pp.setAttribute('aria-pressed', String(v.paused)); };
    pp.addEventListener('click', () => { if (!loaded) load(); if (v.paused) v.play().catch(() => {}); else v.pause(); userPaused = !v.paused ? false : true; setTimeout(syncPP, 0); });
    let userPaused = false; v.addEventListener('play', syncPP); v.addEventListener('pause', syncPP); syncPP();
    new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) load(); }, { rootMargin: '120% 0px' }).observe(s);
    if (RM) { s.classList.add('fw-static'); pin.removeAttribute('data-p0'); over.setAttribute('data-on', ''); pp.setAttribute('data-on', ''); return; }
    // ---- geometry of the window in the wall
    let G = null, cas = 10;
    const measure = () => { const a = anchor.getBoundingClientRect(), p = pin.getBoundingClientRect(); cas = Math.max(6, Math.min(18, a.width * .085)); G = { W: p.width, H: p.height, l: a.left - p.left, t: a.top - p.top, w: a.width, h: a.height }; pin.style.setProperty('--cas', cas.toFixed(1) + 'px'); };
    const apply = (p) => {
      if (!G) measure();
      const so = smooth((p - .03) / .2), t = ease((p - .2) / .62), g = t;
      const O0 = { l: G.l + cas, t: G.t + cas, r: G.l + G.w - cas, b: G.t + G.h - cas };
      const O = { l: lerp(O0.l, 0, t), t: lerp(O0.t, 0, t), r: lerp(O0.r, G.W, t), b: lerp(O0.b, G.H, t) };
      const rad = lerp(3, 0, clamp(t * 1.4));
      pin.style.setProperty('--cl', O.l.toFixed(1) + 'px'); pin.style.setProperty('--ct', O.t.toFixed(1) + 'px'); pin.style.setProperty('--cr', (G.W - O.r).toFixed(1) + 'px'); pin.style.setProperty('--cb', (G.H - O.b).toFixed(1) + 'px'); pin.style.setProperty('--cx', rad.toFixed(1) + 'px');
      const c = cas * (1 - t);
      pin.style.setProperty('--fl', (O.l - c).toFixed(1) + 'px'); pin.style.setProperty('--ft', (O.t - c).toFixed(1) + 'px'); pin.style.setProperty('--fwd', (O.r - O.l + 2 * c).toFixed(1) + 'px'); pin.style.setProperty('--fh', (O.b - O.t + 2 * c).toFixed(1) + 'px');
      pin.style.setProperty('--cas', c.toFixed(1) + 'px'); pin.style.setProperty('--fo', (1 - smooth((t - .8) / .2)).toFixed(3));
      pin.style.setProperty('--sa', (so * 98).toFixed(1) + 'deg'); pin.style.setProperty('--so', (1 - smooth((so - .72) / .28) * (so > .7 ? 1 : 0)).toFixed(3));
      // the film grows with the opening: scaled to cover the rectangle (so the whole scene is seen, small), and to full size as the rectangle reaches the screen
      const rw = O.r - O.l, rh = O.b - O.t, vs = Math.max(rw / G.W, rh / G.H, .02);
      pin.style.setProperty('--vs', vs.toFixed(4)); pin.style.setProperty('--vtx', (O.l + rw / 2 - G.W * vs / 2).toFixed(1) + 'px'); pin.style.setProperty('--vty', (O.t + rh / 2 - G.H * vs / 2).toFixed(1) + 'px');
      pin.style.setProperty('--g', g.toFixed(3));
      // the wall type: stays whole while the sashes open, then fades slowly as the opening grows, settling back a little
      const wo = 1 - smooth((p - .3) / .42); pin.style.setProperty('--wo', wo.toFixed(3)); pin.style.setProperty('--ws', (1 + .07 * smooth(p / .7)).toFixed(4));
      pin.style.setProperty('--ho', (1 - clamp(p * 18)).toFixed(3));
      const ov = smooth((p - .82) / .12); pin.style.setProperty('--oo', ov.toFixed(3)); pin.style.setProperty('--oy', ((1 - ov) * 26).toFixed(1) + 'px');
      const on = ov > .55; if (on !== over.hasAttribute('data-on')) { over.toggleAttribute('data-on', on); pp.toggleAttribute('data-on', on); over.inert = !on; pp.inert = !on; }
      if (p < .015) pin.setAttribute('data-p0', ''); else pin.removeAttribute('data-p0'); pin.toggleAttribute('data-open', p > .03); pin.toggleAttribute('data-cover', t > .96);
      wallTxt.style.pointerEvents = 'none';
      // the film plays once the sashes have started to open, pauses when the section is off screen or the visitor paused it
      if (loaded && !failed) { if (p > .05 && p < 1.02 && inView && !userPaused) { if (v.paused) v.play().catch(() => {}); } else if (!v.paused && (!inView || p < .02)) v.pause(); }
    };
    let inView = true, tick = false, last = -1;
    const upd = () => { tick = false; const r = s.getBoundingClientRect(), len = r.height - innerHeight; const p = clamp(-r.top / Math.max(1, len)); if (Math.abs(p - last) > 1e-4) { last = p; apply(p); } };
    const req = () => { if (!tick) { tick = true; requestAnimationFrame(upd); } };
    new IntersectionObserver((es) => { inView = es.some((e) => e.isIntersecting); req(); }).observe(s);
    addEventListener('scroll', req, { passive: true }); addEventListener('resize', () => { G = null; last = -1; req(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden && !v.paused) v.pause(); else req(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { G = null; last = -1; req(); });
    pin.setAttribute('data-p0', ''); over.inert = true; pp.inert = true; G = null; req();
  }
  return { wire };
})();
