/* Austin Pro, redo build: shared runtime.
   - AP.field(canvas, opts): the living background field (Immersive Garden's mechanism, Austin's shapes, SUBTLE per
     direction v2 §6). A few cut pieces drift at rest; the pointer parts them softly and they return; the pointer path
     leaves a faint water ripple emitted by distance travelled (S1323), not by time.
   - AP.mate(): the cursor companion (completion §3): an SVG corner post that follows with lag, idles, blinks, looks at
     what can be pressed, cheers on buttons, squints over the torn house, squashes on press (110 ms in, 220 ms out).
   Every loop stops when its element is offscreen or the tab is hidden (S0056: no rAF loop without a stop condition). */
(function () {
  const AP = (window.AP = window.AP || {});
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  AP.RM = RM; AP.FINE = FINE;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  AP.clamp = clamp;

  /* ---------- sprites for the field: Austin's cut shapes, pre-rendered once with their soft shadow ---------- */
  function sprite(kind, dpr) {
    const S = { lap: [150, 46], shake: [58, 96], batten: [26, 150], post: [62, 150], profile: [70, 84] }[kind];
    const pad = 22, c = document.createElement('canvas');
    c.width = (S[0] + pad * 2) * dpr; c.height = (S[1] + pad * 2) * dpr;
    const g = c.getContext('2d'); g.scale(dpr, dpr); g.translate(pad, pad);
    g.shadowColor = 'rgba(70,64,52,.16)'; g.shadowBlur = 14; g.shadowOffsetX = 5; g.shadowOffsetY = 8;
    const face = '#FBFAF7', side = '#E6E2D8', edge = '#CDC7BB';
    g.lineJoin = 'round'; g.lineWidth = 1; g.strokeStyle = edge;
    const poly = (pts, fill) => { g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.closePath(); g.fillStyle = fill; g.fill(); };
    if (kind === 'lap') {          // a cut lap board seen from above-front: face, butt edge, cut end
      poly([[0, 6], [140, 0], [146, 30], [6, 36]], face); g.shadowColor = 'transparent';
      poly([[6, 36], [146, 30], [146, 38], [6, 44]], side); poly([[140, 0], [150, 4], [150, 34], [146, 38], [146, 30]], '#EFECE4');
      g.beginPath(); g.moveTo(0, 6); g.lineTo(140, 0); g.lineTo(150, 4); g.lineTo(150, 34); g.lineTo(146, 38); g.lineTo(6, 44); g.lineTo(0, 40); g.closePath(); g.stroke();
      g.strokeStyle = 'rgba(205,199,187,.55)'; g.beginPath(); g.moveTo(10, 14); g.lineTo(132, 9); g.moveTo(14, 24); g.lineTo(138, 19); g.stroke();
    } else if (kind === 'shake') {  // a shingle shake: tapered, irregular butt
      poly([[8, 0], [50, 2], [56, 88], [44, 84], [36, 94], [22, 88], [10, 95], [2, 90]], face); g.shadowColor = 'transparent';
      g.beginPath(); g.moveTo(8, 0); g.lineTo(50, 2); g.lineTo(56, 88); g.lineTo(44, 84); g.lineTo(36, 94); g.lineTo(22, 88); g.lineTo(10, 95); g.lineTo(2, 90); g.closePath(); g.stroke();
      g.strokeStyle = 'rgba(205,199,187,.6)'; g.beginPath(); [16, 27, 38].forEach((x) => { g.moveTo(x, 6); g.lineTo(x + 3, 84); }); g.stroke();
    } else if (kind === 'batten') {
      poly([[0, 4], [16, 0], [18, 146], [2, 150]], face); g.shadowColor = 'transparent'; poly([[16, 0], [24, 3], [26, 148], [18, 146]], side);
      g.beginPath(); g.moveTo(0, 4); g.lineTo(16, 0); g.lineTo(24, 3); g.lineTo(26, 148); g.lineTo(18, 146); g.lineTo(2, 150); g.closePath(); g.stroke();
    } else if (kind === 'post') {   // an outside corner post: two boards meeting in an L
      poly([[0, 8], [30, 0], [32, 142], [2, 150]], face); g.shadowColor = 'transparent'; poly([[30, 0], [60, 8], [62, 148], [32, 142]], side);
      g.beginPath(); g.moveTo(0, 8); g.lineTo(30, 0); g.lineTo(60, 8); g.lineTo(62, 148); g.lineTo(32, 142); g.lineTo(2, 150); g.closePath(); g.stroke();
      g.beginPath(); g.moveTo(30, 0); g.lineTo(32, 142); g.stroke();
    } else {                        // three lap courses in section (the profile)
      for (let i = 2; i >= 0; i--) { const y = i * 24; poly([[0, y], [10, y], [30, y + 34], [0, y + 34]], i ? '#F3F1EA' : face); g.shadowColor = 'transparent';
        g.beginPath(); g.moveTo(0, y); g.lineTo(10, y); g.lineTo(30, y + 34); g.lineTo(0, y + 34); g.closePath(); g.stroke(); }
      poly([[30, 0], [70, 8], [70, 92], [30, 82]], '#EFECE4'); g.beginPath(); g.moveTo(30, 0); g.lineTo(70, 8); g.lineTo(70, 92); g.lineTo(30, 82); g.stroke();
    }
    return { c, w: S[0] + pad * 2, h: S[1] + pad * 2 };
  }

  /* ---------- the living field ---------- */
  AP.field = function (canvas, opts = {}) {
    const g = canvas.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const kinds = ['lap', 'shake', 'batten', 'post', 'profile'];
    const sprites = Object.fromEntries(kinds.map((k) => [k, sprite(k, dpr)]));
    let W = 0, H = 0, pieces = [], rings = [], running = false, visible = true, last = 0;
    const P = { x: -9999, y: -9999, vx: 0, vy: 0, in: false, ex: 0, ey: 0, acc: 0, seen: false };
    const avoid = opts.avoid || (() => null); // rects (in canvas px) the field keeps quieter
    function seed() {
      const r = canvas.getBoundingClientRect(); W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      const n = Math.round(clamp((W * H) / (opts.density || 105000), 5, opts.max || 15));
      let s = opts.seed || 7; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
      pieces = [];
      const cols = Math.ceil(Math.sqrt(n * W / H)), rows = Math.ceil(n / cols);
      for (let i = 0; i < n; i++) {
        let cx = (i % cols + 0.2 + rnd() * 0.6) / cols, cy = (Math.floor(i / cols) + 0.2 + rnd() * 0.6) / rows;
        // keep the field quiet behind copy and controls: relocate pieces whose home falls in a keep-out rect
        for (let tries = 0; opts.keepOut && opts.keepOut(cx * W, cy * H) && tries < 12; tries++) { cx = rnd(); cy = rnd(); }
        if (opts.keepOut && opts.keepOut(cx * W, cy * H)) continue;
        const depth = 0.35 + rnd() * 0.65;
        pieces.push({ k: kinds[(i + Math.floor(rnd() * 5)) % 5], hx: cx * W, hy: cy * H, x: 0, y: 0, dx: 0, dy: 0, vx: 0, vy: 0,
          a: (rnd() - 0.5) * 1.1, va: (rnd() - 0.5) * 0.0006, depth, s: (0.42 + depth * 0.42) * (W < 700 ? 0.62 : 1),
          ph: rnd() * 6.28, sp: 0.00006 + rnd() * 0.00008, amp: 10 + rnd() * 18 });
      }
    }
    function draw(t) {
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      for (const p of pieces) {
        const sp = sprites[p.k];
        // drift at rest: a slow orbit around home (subtle: 10-28 px over ~60-110 s)
        const ox = Math.cos(t * p.sp + p.ph) * p.amp, oy = Math.sin(t * p.sp * 1.3 + p.ph) * p.amp * 0.7;
        p.x = p.hx + ox + p.dx; p.y = p.hy + oy + p.dy;
        g.save(); g.globalAlpha = 0.3 + p.depth * 0.42; g.translate(p.x, p.y); g.rotate(p.a + t * p.va * 0.001 + p.dx * 0.002);
        g.scale(p.s, p.s); g.drawImage(sp.c, -sp.w / 2, -sp.h / 2, sp.w, sp.h); g.restore();
      }
      // the water ripple: rings laid along the pointer path
      for (const r of rings) {
        const u = (t - r.t) / 1100; if (u > 1) continue;
        const e = 1 - Math.pow(1 - u, 3);
        g.beginPath(); g.ellipse(r.x, r.y, 6 + 56 * e, (6 + 56 * e) * 0.62, 0, 0, 6.283);
        g.strokeStyle = `rgba(57,103,145,${(0.2 * (1 - u)).toFixed(3)})`; g.lineWidth = 1.1; g.stroke();
      }
    }
    function step(t) {
      const dt = Math.min(1 / 30, last ? (t - last) / 1000 : 1 / 60); last = t;
      for (const p of pieces) {
        if (P.in) {
          const ddx = p.x - P.x, ddy = p.y - P.y, d = Math.hypot(ddx, ddy), R = 170 * (0.7 + p.depth * 0.5);
          if (d < R && d > 0.01) { const f = Math.pow(1 - d / R, 2);
            p.vx += (ddx / d * 520 * f + P.vx * 0.9 * f) * dt; p.vy += (ddy / d * 520 * f + P.vy * 0.9 * f) * dt; }
        }
        // spring home (parting and return), water-like damping
        p.vx += (-p.dx * 7) * dt; p.vy += (-p.dy * 7) * dt; p.vx *= Math.pow(0.12, dt); p.vy *= Math.pow(0.12, dt);
        p.dx += p.vx * dt; p.dy += p.vy * dt;
      }
      rings = rings.filter((r) => t - r.t < 1100);
      draw(t);
      P.vx *= 0.85; P.vy *= 0.85;
      if (running) requestAnimationFrame(step);
    }
    function start() { if (!running && visible && !RM) { running = true; last = 0; requestAnimationFrame(step); } }
    function stop() { running = false; }
    const host = opts.host || canvas.parentElement;
    if (FINE && !RM) {
      host.addEventListener('pointermove', (e) => {
        const r = canvas.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
        if (P.seen) { P.vx = (x - P.x) * 60 * 0.5 + P.vx * 0.5; P.vy = (y - P.y) * 60 * 0.5 + P.vy * 0.5;
          // emit ripples by distance (S1323): constant spacing whatever the hand speed; capped against teleports
          const moved = Math.hypot(x - P.x, y - P.y); P.acc += moved; let guard = 0;
          while (P.acc >= 34 && guard++ < 6) { P.acc -= 34; const tt = moved > 1e-6 ? Math.min(1, guard * 34 / moved) : 0;
            const k = { x: P.x + (x - P.x) * tt, y: P.y + (y - P.y) * tt, t: performance.now() }; if (!avoid(k.x, k.y)) rings.push(k); }
        }
        P.x = x; P.y = y; P.in = true; P.seen = true;
      });
      host.addEventListener('pointerleave', () => { P.in = false; P.seen = false; });
    }
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? start() : stop(); }).observe(canvas);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    addEventListener('resize', () => { seed(); draw(performance.now()); });
    seed(); draw(performance.now()); start();
    return { seed, draw, pieces: () => pieces };
  };

  /* ---------- the cursor companion ---------- */
  AP.mate = function () {
    if (!FINE) return null;
    const el = document.createElement('div'); el.className = 'mate'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<svg viewBox="0 0 46 62"><g class="body">
      <ellipse cx="23" cy="60" rx="13" ry="2.4" fill="rgba(27,30,34,.16)"/>
      <path d="M9 14 L23 9 L37 14 L37 57 L23 60 L9 57 Z" fill="#FBF8F0" stroke="#1B1E22" stroke-width="2" stroke-linejoin="round"/>
      <path d="M23 9 L23 60" stroke="#1B1E22" stroke-width="1.4"/>
      <path d="M23 9 L37 14 L37 57 L23 60 Z" fill="#E7E2D6"/>
      <path d="M6 13 L23 7 L40 13 L40 17 L23 11.5 L6 17 Z" fill="#396791" stroke="#1B1E22" stroke-width="1.6" stroke-linejoin="round"/>
      <g class="eyes"><ellipse cx="16" cy="28" rx="4.2" ry="5" fill="#fff" stroke="#1B1E22" stroke-width="1.6"/><ellipse cx="29" cy="28.6" rx="4.2" ry="5" fill="#fff" stroke="#1B1E22" stroke-width="1.6"/>
      <circle class="pu" cx="16" cy="28.6" r="2" fill="#1B1E22"/><circle class="pu" cx="29" cy="29.2" r="2" fill="#1B1E22"/>
      <rect class="lid" x="11.4" y="22.6" width="9.2" height="11" rx="4.4" fill="#FBF8F0"/><rect class="lid" x="24.4" y="23.2" width="9.2" height="11" rx="4.4" fill="#E7E2D6"/></g>
      <path class="mouth" d="M19 39 Q23 41.6 27 39" stroke="#1B1E22" stroke-width="1.6" fill="none" stroke-linecap="round"/></g></svg>`;
    document.body.appendChild(el);
    const pus = el.querySelectorAll('.pu');
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, lastMove = 0, look = { x: 0, y: 0 }, over = null;
    const INTERACTIVE = 'a,button,[data-mate]';
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || (!e.movementX && !e.movementY)) return;   // ignore the browser's synthetic move at load
      tx = e.clientX + 18; ty = e.clientY + 16; lastMove = performance.now(); el.classList.add('on');
      const t = e.target.closest ? e.target.closest(INTERACTIVE) : null;
      if (t !== over) { over = t; el.classList.toggle('squint', !!(t && t.dataset.mate === 'squint'));
        if (t && (t.matches('.btn,.tel,.mbar a') || t.dataset.mate === 'cheer')) { el.classList.remove('cheer'); void el.offsetWidth; el.classList.add('cheer'); } }
    }, { passive: true });
    document.addEventListener('pointerleave', () => el.classList.remove('on'));
    addEventListener('blur', () => el.classList.remove('on'));
    addEventListener('pointerdown', () => el.classList.add('press'));
    addEventListener('pointerup', () => el.classList.remove('press'));
    let nextBlink = performance.now() + 2600;
    (function loop(t) {
      x += (tx - x) * (RM ? 1 : 0.16); y += (ty - y) * (RM ? 1 : 0.16);
      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      // idle: after 2.2 s still, the eyes roll toward the nearest thing you can press
      let gx = 0, gy = 0;
      if (over) { gx = 0; gy = -1.6; }
      else if (t - lastMove > 2200) {
        let best = null, bd = 1e9;
        document.querySelectorAll('.btn,.tel').forEach((b) => { const r = b.getBoundingClientRect(); const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y); if (d < bd) { bd = d; best = r; } });
        if (best) { const a = Math.atan2(best.top + best.height / 2 - y, best.left + best.width / 2 - x); gx = Math.cos(a) * 1.8; gy = Math.sin(a) * 1.8; }
      } else { gx = clamp((tx - x) * 0.08, -1.8, 1.8); gy = clamp((ty - y) * 0.08, -1.8, 1.8); }
      look.x += (gx - look.x) * 0.2; look.y += (gy - look.y) * 0.2;
      pus.forEach((p) => p.setAttribute('transform', `translate(${look.x.toFixed(2)} ${look.y.toFixed(2)})`));
      if (t > nextBlink) { el.classList.add('blink'); setTimeout(() => el.classList.remove('blink'), 130); nextBlink = t + 2400 + Math.random() * 2600; }
      if (!document.hidden) requestAnimationFrame(loop); else document.addEventListener('visibilitychange', () => requestAnimationFrame(loop), { once: true });
    })(performance.now());
    return el;
  };
})();
