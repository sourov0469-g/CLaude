/* HEROES 7–10 (overnight brief). Markup is built in build_site.py (heroes3); this wires behaviour.
   H7 "The record": the firm's documented projects (the finder records, as in Area C — positions only, nothing drawn or
      generated) fill in on the white ground in date order, 2018 to 2026, while the counted numbers arrive; a soft lens
      lifts the dots near the pointer. Not drivable (that mechanic belongs to Area C only).
   H8 "Last light": the dusk photograph full bleed; the band rises from the bottom carrying the headline, and the light
      settles from cold to warm as the band arrives. */
window.Hero3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const count = (el, n, ms) => { if (RM) { el.textContent = n.toLocaleString('en-US'); return; } const t0 = performance.now(); const st = (now) => { const k = Math.min(1, (now - t0) / ms), v = Math.round(n * (1 - Math.pow(1 - k, 3))); el.textContent = v.toLocaleString('en-US'); if (k < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); };

  function h7(s) {
    const N = window.__NEAR; const cv = s.querySelector('canvas.rec'); if (!N || !cv) return; const g = cv.getContext('2d');
    const P = N.p.slice().sort((a, b) => a[2] - b[2]), yr = s.querySelector('.yr b');
    let W = 0, H = 0, sc = 1, ox = 0, oy = 0, t0 = 0, done = RM, raf = 0, px = -1e4, py = -1e4, lens = 0;
    function size() { const r = s.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0);
      // the record sits to the right of the headline on wide screens and under it on phones; it is a field, not a card
      const wide = W > 860, bw = wide ? W * 0.62 : W * 1.05, bh = wide ? H * 0.94 : H * 0.62; sc = Math.min(bw / N.W, bh / N.H) * (wide ? 1.6 : 1.25);
      // centre the densest part (the Austin cluster around the office) in the field
      const cx = N.hq[0], cy = N.hq[1]; ox = (wide ? W * 0.66 : W * 0.5) - cx * sc; oy = (wide ? H * 0.5 : H * 0.7) - cy * sc; }
    function draw(now) { raf = 0; g.clearRect(0, 0, W, H); const k = done ? 1 : Math.min(1, (now - t0) / 2600), n = Math.floor(P.length * k);
      if (!done && n > 0) { const d = P[Math.min(P.length - 1, n - 1)][2]; yr.textContent = '20' + String(Math.floor(d / 100)).padStart(2, '0'); }
      lens += ((px > -1e3 ? 1 : 0) - lens) * 0.15; let busy = !done || Math.abs(lens - (px > -1e3 ? 1 : 0)) > 0.01;
      for (let i = 0; i < n; i++) { const q = P[i], x = ox + q[0] * sc, y = oy + q[1] * sc; if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;
        const age = done ? 1 : Math.min(1, (k * P.length - i) / 40), dl = Math.hypot(x - px, y - py), L = dl < 110 ? (1 - dl / 110) * lens : 0, r = (2.7 + L * 2.8) * (0.6 + 0.4 * age);
        g.fillStyle = L > 0.05 ? `rgba(14,59,44,${0.55 + L * 0.45})` : `rgba(14,59,44,${0.5 * age + 0.12})`; g.beginPath(); g.arc(x, y, r, 0, 6.283); g.fill();
        if (q[6] && (L > 0.05 || age < 1)) { g.strokeStyle = `rgba(127,164,62,${0.5 + L * 0.5})`; g.lineWidth = 1.4; g.beginPath(); g.arc(x, y, r + 2.2, 0, 6.283); g.stroke(); } }
      const hx = ox + N.hq[0] * sc, hy = oy + N.hq[1] * sc; g.fillStyle = '#B5DB6E'; g.strokeStyle = '#0E3B2C'; g.lineWidth = 2.5; g.fillRect(hx - 6, hy - 6, 12, 12); g.strokeRect(hx - 6, hy - 6, 12, 12);
      if (k >= 1 && !done) { done = true; yr.textContent = '2026'; s.classList.add('filled'); }
      if (busy) raf = requestAnimationFrame(draw); }
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    size(); new ResizeObserver(() => { size(); kick(); }).observe(s);
    if (FINE && !RM) { s.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; kick(); }); s.addEventListener('pointerleave', () => { px = py = -1e4; kick(); }); }
    t0 = performance.now(); if (RM) { s.classList.add('filled'); yr.textContent = '2026'; } kick();
    s.querySelectorAll('[data-count]').forEach((el, i) => setTimeout(() => count(el, +el.dataset.count, 1400), RM ? 0 : 300 + i * 160));
  }

  function h8(s) {
    const img = s.querySelector('.ph8 img'); if (img && window.__HERO2) img.src = __HERO2.c1;
    requestAnimationFrame(() => s.classList.add('on'));
    if (FINE && !RM) { let raf = 0, tx = 0, ty = 0, x = 0, y = 0; const tick = () => { x += (tx - x) * 0.06; y += (ty - y) * 0.06; s.style.setProperty('--px', x.toFixed(3)); s.style.setProperty('--py', y.toFixed(3)); raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0; };
      s.addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; if (!raf) raf = requestAnimationFrame(tick); }); }
    if (!RM) { let raf = 0; addEventListener('scroll', () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; s.style.setProperty('--sy', Math.min(1, scrollY / innerHeight).toFixed(3)); }); }, { passive: true }); }
  }

  // H9: the type is the house. Scrolling slides the lines apart a little, as courses would sit; the one window's lower sash
  // lifts with the scroll (and when pointed at), showing more of the job photo behind it.
  function h9(s) { if (RM) { s.classList.add('on'); return; } requestAnimationFrame(() => s.classList.add('on'));
    let raf = 0; const upd = () => { raf = 0; s.style.setProperty('--sy', Math.min(1, Math.max(0, scrollY / (innerHeight * 0.8))).toFixed(3)); };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); upd(); }

  // H10: the trade word rolls (siding → windows → roofing) under a fixed anchor line that already names every trade, so
  // nothing depends on the motion; the buttons pick a trade and stop the roll; hover or focus pauses it; reduced motion:
  // the first trade, still.
  function h10(s) { const roll = s.querySelector('.roll'), bs = [...s.querySelectorAll('.pick10 button')], ics = [...s.querySelectorAll('.ico10 svg')], n = bs.length;
    let i = 0, t = 0, held = false, stopped = RM;
    const show = (k) => { i = k; roll.style.transform = `translateY(${-k * 1.24}em)`; bs.forEach((b, j) => b.setAttribute('aria-pressed', j === k)); ics.forEach((c, j) => c.classList.toggle('on', j === k)); };
    const arm = () => { clearTimeout(t); if (stopped || held) return; t = setTimeout(() => { show((i + 1) % n); arm(); }, 2800); };
    bs.forEach((b, k) => b.addEventListener('click', () => { stopped = true; clearTimeout(t); show(k); }));
    [s.querySelector('.lead'), s.querySelector('.pick10')].forEach((el) => { el.addEventListener('pointerenter', () => { held = true; clearTimeout(t); }); el.addEventListener('pointerleave', () => { held = false; arm(); }); });
    s.addEventListener('focusin', () => { held = true; clearTimeout(t); }); s.addEventListener('focusout', () => { held = false; arm(); });
    show(0); requestAnimationFrame(() => s.classList.add('on')); arm(); }

  function wire() { const h = document.querySelector('.slot[data-slot=hero] .hero'); if (!h) return;
    if (h.matches('.h7v')) h7(h); if (h.matches('.h8v')) h8(h); if (h.matches('.h9v')) h9(h); if (h.matches('.h10v')) h10(h); }
  return { wire };
})();
