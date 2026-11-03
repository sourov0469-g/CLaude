/* Sheet-faithful hero engine (interim layers cut from the owner-approved heroes sheet; Muse's high-res layers swap in
   by replacing the data, not the code). The card is laid out at the sheet's own pixel coordinates and scaled as one unit,
   so the composition matches the reference exactly. Every loose piece is a sprite with a spring:
   - load: pieces start torn far apart (rotated, scaled) and fly into the reference composition;
   - rest: a quiet drift, a few pixels and a degree or two;
   - cursor: Immersive-Garden-style water push (away from the hand and along its path); leaving lets them return;
   - click / tap: a sweep scatter, then home.
   Transforms only (S0056); the loop pauses offscreen and on hidden tabs; reduced motion shows the final composition. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero'), wrap = hero.querySelector('.wrap'), card = hero.querySelector('.card');
  const D = window.HERO_DATA, CW = D.card.w, CH = D.card.h;
  const layer = card.querySelector('.sprites');
  let s = 1, sprites = [], simT = 0, last = 0, running = false, visible = true;
  const ptr = { x: 0, y: 0, vx: 0, vy: 0, inside: false, seen: false };
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  function fit() {
    const mobile = innerWidth <= 820;
    hero.classList.toggle('m', mobile);
    const availW = mobile ? innerWidth - 20 : Math.min(innerWidth * 0.9, 1520);
    const availH = mobile ? 1e9 : innerHeight * 0.9 - 8;
    s = Math.min(availW / CW, availH / CH);
    card.style.transform = `scale(${s})`;
    card.style.height = ((mobile && D.mobileCrop) ? D.mobileCrop : CH) + 'px';
    wrap.style.width = CW * s + 'px'; wrap.style.height = (mobile ? (D.mobileCrop || CH) : CH) * s + 'px';
  }

  function build() {
    for (const d of D.sprites) {
      const im = new Image(); im.src = d.data; im.alt = ''; im.decoding = 'async';
      im.style.cssText = `left:${d.x}px;top:${d.y}px;width:${d.w}px;height:${d.h}px`;
      layer.appendChild(im);
      const cx = d.x + d.w / 2, cy = d.y + d.h / 2;
      sprites.push({ el: im, cx, cy, big: d.area > 30000, ox: 0, oy: 0, a: 0, k: 0, sc: 0, vx: 0, vy: 0, va: 0, vs: 0, rel: 0,
        ph: rnd() * 6.28, amp: d.area > 30000 ? 2 : 3 + rnd() * 6, spd: 0.0004 + rnd() * 0.0006, depth: 0.5 + rnd() * 0.5 });
    }
  }

  function tear() {
    seed = 1983;
    for (const p of sprites) {
      const dx = p.cx - CW / 2, dy = p.cy - CH / 2, L = Math.hypot(dx, dy) || 1;
      const m = p.big ? 0 : 160 + rnd() * 360;
      p.ox = dx / L * m + (rnd() - 0.5) * 120; p.oy = dy / L * m + (rnd() - 0.5) * 120 + (p.big ? 90 : 0);
      p.a = p.big ? 0 : (rnd() - 0.5) * 2.4; p.sc = p.big ? -0.28 : (rnd() - 0.5) * 0.6;
      p.vx = p.vy = p.va = p.vs = 0;
      p.rel = (p.big ? 380 : 60 + rnd() * 520);
      p.el.style.opacity = '0';
    }
  }

  function step(dt) {
    simT += dt * 1000;
    let busy = false;
    for (const p of sprites) {
      if (simT < p.rel) { busy = true; continue; }
      if (p.el.style.opacity !== '1') p.el.style.opacity = '1';
      if (ptr.inside && !p.big) {
        const x = p.cx + p.ox, y = p.cy + p.oy, dx = x - ptr.x, dy = y - ptr.y, d = Math.hypot(dx, dy), R = 190;
        if (d < R && d > 0.01) {
          const f = Math.pow(1 - d / R, 2) * p.depth;
          p.vx += (dx / d * 2600 + ptr.vx * 4.2) * f * dt; p.vy += (dy / d * 2600 + ptr.vy * 4.2) * f * dt;
          p.va += ((dx / d) * ptr.vy - (dy / d) * ptr.vx) * 0.004 * f * dt; p.vs += 0.8 * f * dt;
        }
      }
      const k = ptr.inside && !p.big ? 10 : 120, c = ptr.inside && !p.big ? 4 : 2 * 0.74 * Math.sqrt(120);
      p.vx += (-k * p.ox - c * p.vx) * dt; p.vy += (-k * p.oy - c * p.vy) * dt;
      p.va += (-k * p.a - c * p.va) * dt; p.vs += (-k * p.sc - c * p.vs) * dt;
      p.ox += p.vx * dt; p.oy += p.vy * dt; p.a += p.va * dt; p.sc += p.vs * dt;
      if (Math.abs(p.ox) + Math.abs(p.oy) > 0.3 || Math.abs(p.a) > 0.002 || Math.abs(p.vx) + Math.abs(p.vy) > 1) busy = true;
    }
    ptr.vx *= 0.82; ptr.vy *= 0.82;
    return busy;
  }

  function draw(t) {
    for (const p of sprites) {
      // the quiet drift at rest: a few px, a degree or two, out of phase per piece
      const dx = RM ? 0 : Math.sin(t * p.spd + p.ph) * p.amp, dy = RM ? 0 : Math.cos(t * p.spd * 1.3 + p.ph) * p.amp * 0.7;
      const da = RM ? 0 : Math.sin(t * p.spd * 0.8 + p.ph) * 0.02 * (p.big ? 0.2 : 1);
      p.el.style.transform = `translate(${(p.ox + dx).toFixed(1)}px,${(p.oy + dy).toFixed(1)}px) rotate(${(p.a + da).toFixed(3)}rad) scale(${(1 + p.sc).toFixed(3)})`;
    }
  }

  function frame(t) {
    const dt = Math.min(1 / 30, last ? (t - last) / 1000 : 1 / 60); last = t;
    step(dt); draw(t);
    if (running) requestAnimationFrame(frame);
  }
  function start() { if (!running && visible && !RM) { running = true; last = 0; requestAnimationFrame(frame); } }
  function stop() { running = false; }

  function local(e) { const r = card.getBoundingClientRect(); return { x: (e.clientX - r.left) / s, y: (e.clientY - r.top) / s }; }
  if (!RM) {
    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const q = local(e);
      if (ptr.seen) { ptr.vx = (q.x - ptr.x) * 30 + ptr.vx * 0.5; ptr.vy = (q.y - ptr.y) * 30 + ptr.vy * 0.5; }
      ptr.x = q.x; ptr.y = q.y; ptr.seen = true; ptr.inside = q.x > -120 && q.x < CW + 120 && q.y > -100 && q.y < CH + 100;
    });
    hero.addEventListener('pointerleave', () => { ptr.inside = false; ptr.seen = false; });
    hero.addEventListener('click', (e) => {
      if (e.target.closest('a,button')) return;
      const q = local(e);
      for (const p of sprites) { if (p.big) continue; const dx = p.cx + p.ox - q.x, dy = p.cy + p.oy - q.y, d = Math.hypot(dx, dy) || 1, R = 340;
        if (d < R) { const f = 1 - d / R; p.vx += dx / d * 1300 * f; p.vy += dy / d * 1300 * f; p.va += (rnd() - 0.5) * 6 * f; p.vs += 0.5 * f; } }
    });
  }
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? start() : stop(); }).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  addEventListener('resize', fit);

  fit(); build();
  if (RM) { draw(0); hero.classList.add('built'); }
  else { tear(); draw(0); requestAnimationFrame(() => hero.classList.add('go')); start(); }

  window.__hero = {
    seek(ms) { tear(); simT = 0; stop(); const n = Math.round(ms / (1000 / 60)); for (let i = 0; i < n; i++) step(1 / 60); draw(0); hero.classList.add('go', 'built'); return { simT: Math.round(simT) }; },
    stir(x, y, vx, vy, frames) { ptr.inside = true; ptr.x = x; ptr.y = y; for (let i = 0; i < frames; i++) { ptr.vx = vx; ptr.vy = vy; ptr.x += vx / 60; ptr.y += vy / 60; step(1 / 60); } draw(0); },
    leave(ms) { ptr.inside = false; const n = Math.round(ms / (1000 / 60)); for (let i = 0; i < n; i++) step(1 / 60); draw(0); },
    lift: () => sprites.reduce((t, p) => t + Math.abs(p.ox) + Math.abs(p.oy), 0),
    panel: () => { const r = card.getBoundingClientRect(), h = hero.getBoundingClientRect(); return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height, s }; },
  };
})();
