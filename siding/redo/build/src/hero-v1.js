/* HERO V1, "the cut photograph".
   One of the firm's own job photographs, cut into lap boards course by course with staggered butt joints, the way a
   wall is actually sided. On load the boards are torn off and scattered; they fly home and the wall rebuilds from the
   bottom course up (siding is installed bottom-up). Behind any lifted board you see the house wrap, the studs and the
   nail heads. Moving through the photo stirs the boards like water (Immersive Garden's push, damped and floaty);
   leaving it lets the wall fix itself, course by course. A click (or tap) sweeps the boards apart; they come home.
   Springs per S0089 (gesture-driven motion is a spring); one canvas, one draw per board; the loop stops when settled. */
(function () {
  const AP = window.AP, RM = AP.RM;
  const hero = document.querySelector('.hero'), cv = hero.querySelector('canvas.art'), panel = hero.querySelector('.panel');
  const g = cv.getContext('2d');
  const img = new Image();
  let dpr = 1, W = 0, H = 0, P = null, pieces = [], rows = 12, running = false, simT = 0, lastT = 0;
  let mode = 'build', ptr = { x: 0, y: 0, vx: 0, vy: 0, inside: false, seen: false }, restoreAt = 0;
  let rnd; const seedRnd = (s) => { rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647); };

  function layout() {
    const hr = hero.getBoundingClientRect(), pr = panel.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2); W = hr.width; H = hr.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    P = { x: pr.left - hr.left, y: pr.top - hr.top, w: pr.width, h: pr.height };
    // cover mapping of the photo into the panel (object-position 50% 46%)
    const s = Math.max(P.w / img.naturalWidth, P.h / img.naturalHeight);
    P.s = s; P.sx = (img.naturalWidth - P.w / s) * 0.5; P.sy = (img.naturalHeight - P.h / s) * 0.46;
    build();
  }

  function build() {
    seedRnd(20091);
    rows = Math.round(AP.clamp(P.h / 46, 9, 16));
    const rh = P.h / rows, pcx = P.x + P.w / 2, pcy = P.y + P.h / 2;
    pieces = [];
    for (let r = 0; r < rows; r++) {
      // staggered joints: each course starts at a different offset, boards 28-52% of the wall wide
      let x = -rnd() * P.w * 0.3;
      while (x < P.w - 1) {
        const len = P.w * (0.28 + rnd() * 0.24);
        const x0 = Math.max(0, x), x1 = Math.min(P.w, x + len);
        if (x1 - x0 > 8) {
          const hx = P.x + (x0 + x1) / 2, hy = P.y + r * rh + rh / 2;
          const p = { r, x0, x1, w: x1 - x0, h: rh, hx, hy, ox: 0, oy: 0, a: 0, z: 0, vx: 0, vy: 0, va: 0, vz: 0, rel: 0, k: 160 };
          torn(p, pcx, pcy);
          pieces.push(p);
        }
        x += len;
      }
    }
    pieces.forEach((p) => (p.rel = 320 + (rows - 1 - p.r) * 62 + rnd() * 110));
  }

  function torn(p, pcx, pcy) {
    const dx = p.hx - pcx, dy = p.hy - pcy;
    p.ox = dx * (0.35 + rnd() * 0.55) + (rnd() - 0.5) * 120 + 40;
    p.oy = dy * (0.5 + rnd() * 0.6) + (rnd() - 0.5) * 90;
    // keep the scatter off the copy column (desktop) and out of the copy below (mobile)
    const minX = W > 820 ? P.x - 40 : 8;
    if (p.hx + p.ox - p.w / 2 < minX) p.ox = minX - p.hx + p.w / 2 + rnd() * 40;
    if (W <= 820 && p.hy + p.oy > P.y + P.h - p.h) p.oy = P.y + P.h - p.h - p.hy - rnd() * 30;
    if (W <= 820) p.a *= 0.6;
    if (p.hy + p.oy < 70) p.oy = 70 - p.hy + rnd() * 30;
    p.a = (rnd() - 0.5) * 0.9; p.z = -0.1 + rnd() * 0.32;
    p.vx = (rnd() - 0.5) * 30; p.vy = (rnd() - 0.5) * 30; p.va = (rnd() - 0.5) * 0.2;
  }

  /* ---------- drawing ---------- */
  function drawBacking() {
    // the house wrap behind the siding, with studs at 16" centres and nail heads where boards were fixed
    g.fillStyle = '#E8E4DB'; g.fillRect(P.x, P.y, P.w, P.h);
    const rh = P.h / rows, stud = Math.max(34, P.w / 14);
    g.strokeStyle = 'rgba(160,150,132,.35)'; g.lineWidth = 1; g.beginPath();
    for (let r = 1; r < rows; r++) { g.moveTo(P.x, P.y + r * rh + 0.5); g.lineTo(P.x + P.w, P.y + r * rh + 0.5); }
    g.stroke();
    g.strokeStyle = 'rgba(140,128,108,.22)'; g.setLineDash([6, 6]); g.beginPath();
    for (let x = stud; x < P.w; x += stud) { g.moveTo(P.x + x + 0.5, P.y); g.lineTo(P.x + x + 0.5, P.y + P.h); }
    g.stroke(); g.setLineDash([]);
    g.fillStyle = 'rgba(96,104,112,.55)';
    for (let r = 0; r < rows; r++) for (let x = stud; x < P.w; x += stud) { g.beginPath(); g.arc(P.x + x, P.y + r * rh + rh * 0.78, 1.5, 0, 6.283); g.fill(); }
  }

  function draw() {
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
    drawBacking();
    const s = P.s;
    // draw lifted boards last so they sit over the wall
    const order = pieces.slice().sort((a, b) => lift(a) - lift(b));
    for (const p of order) {
      const m = lift(p);
      g.save(); g.translate(p.hx + p.ox, p.hy + p.oy); g.rotate(p.a); const sc = 1 + p.z; g.scale(sc, sc);
      if (m > 0.6) {
        const sh = Math.min(1, m / 40);
        g.fillStyle = `rgba(27,30,34,${(0.1 + 0.12 * sh).toFixed(3)})`;
        g.fillRect(-p.w / 2 + 3 + sh * 6, -p.h / 2 + 5 + sh * 10, p.w, p.h);
      }
      g.drawImage(img, P.sx + p.x0 / s, P.sy + (p.hy - P.y - p.h / 2) / s, p.w / s, p.h / s, -p.w / 2 - 0.3, -p.h / 2 - 0.3, p.w + 0.6, p.h + 0.6);
      if (m > 0.6) {
        const k = Math.min(1, m / 10);
        g.fillStyle = `rgba(20,22,26,${(0.32 * k).toFixed(3)})`; g.fillRect(-p.w / 2, p.h / 2 - 2, p.w, 2);       // butt edge
        g.fillStyle = `rgba(255,255,255,${(0.35 * k).toFixed(3)})`; g.fillRect(-p.w / 2, -p.h / 2, p.w, 1);      // top arris
        g.fillStyle = `rgba(255,255,255,${(0.22 * k).toFixed(3)})`; g.fillRect(p.w / 2 - 2, -p.h / 2, 2, p.h);   // cut end
      }
      g.restore();
    }
  }
  const lift = (p) => Math.abs(p.ox) + Math.abs(p.oy) + Math.abs(p.a) * 120 + Math.abs(p.z) * 160;

  /* ---------- physics ---------- */
  function step(dt) {
    simT += dt * 1000;
    const stirring = ptr.inside && mode !== 'build';
    let busy = false;
    for (const p of pieces) {
      if (mode === 'build' && simT < p.rel) {           // torn: boards hang in the air, drifting
        p.vx *= Math.pow(0.4, dt); p.vy *= Math.pow(0.4, dt); p.va *= Math.pow(0.4, dt);
        p.ox += p.vx * dt; p.oy += p.vy * dt; p.a += p.va * dt; busy = true; continue;
      }
      if (stirring) {
        const cx = p.hx + p.ox, cy = p.hy + p.oy, dx = cx - ptr.x, dy = cy - ptr.y, d = Math.hypot(dx, dy), R = 175;
        if (d < R && d > 0.01) {
          const f = Math.pow(1 - d / R, 2);
          // the water push: boards are shoved along the hand's path and away from it, and lift toward the viewer
          p.vx += (dx / d * 3600 + ptr.vx * 5.5) * f * dt;
          p.vy += (dy / d * 3600 + ptr.vy * 5.5) * f * dt;
          p.va += ((dx / d) * ptr.vy - (dy / d) * ptr.vx) * 0.006 * f * dt;
          p.vz += 5 * f * dt;
        }
      }
      const k = stirring ? 7 : (simT < p.rel ? 0 : p.k), c = stirring ? 2.6 : 2 * 0.72 * Math.sqrt(p.k);
      p.vx += (-k * p.ox - c * p.vx) * dt; p.vy += (-k * p.oy - c * p.vy) * dt;
      p.va += (-k * p.a - c * p.va) * dt; p.vz += (-k * p.z - c * p.vz) * dt;
      p.ox += p.vx * dt; p.oy += p.vy * dt; p.a += p.va * dt; p.z += p.vz * dt;
      p.z = AP.clamp(p.z, -0.2, 0.45);
      if (Math.abs(p.ox) > 0.25 || Math.abs(p.oy) > 0.25 || Math.abs(p.a) > 0.002 || Math.abs(p.z) > 0.002 ||
          Math.abs(p.vx) > 1 || Math.abs(p.vy) > 1) busy = true;
    }
    if (mode === 'build' && !busy) mode = 'settled';
    ptr.vx *= 0.82; ptr.vy *= 0.82;
    return busy || stirring;
  }
  function snap() { pieces.forEach((p) => { p.ox = p.oy = p.a = p.z = p.vx = p.vy = p.va = p.vz = 0; }); }

  function frame(t) {
    const dt = Math.min(1 / 30, lastT ? (t - lastT) / 1000 : 1 / 60); lastT = t;
    if (restoreAt && t > restoreAt) { restoreAt = 0; ptr.inside = false; release(); }
    const busy = step(dt);
    draw();
    if (busy) requestAnimationFrame(frame); else { snap(); draw(); running = false; hero.classList.add('built'); }
  }
  function run() { if (!running) { running = true; lastT = 0; requestAnimationFrame(frame); } }
  function release() {   // the wall fixes itself, bottom course first
    pieces.forEach((p) => (p.rel = simT + (rows - 1 - p.r) * 28)); run();
  }

  /* ---------- input ---------- */
  function local(e) { const r = hero.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function inZone(q) { return q.x > P.x - 50 && q.x < P.x + P.w + 50 && q.y > P.y - 50 && q.y < P.y + P.h + 50; }
  if (!RM) {
    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || mode === 'build') return;
      const q = local(e), was = ptr.inside;
      if (ptr.seen) { ptr.vx = (q.x - ptr.x) * 30 + ptr.vx * 0.5; ptr.vy = (q.y - ptr.y) * 30 + ptr.vy * 0.5; }
      ptr.x = q.x; ptr.y = q.y; ptr.seen = true; ptr.inside = inZone(q);
      if (ptr.inside) run(); else if (was) release();
    });
    hero.addEventListener('pointerleave', () => { if (ptr.inside) { ptr.inside = false; release(); } ptr.seen = false; });
    hero.addEventListener('click', (e) => {
      const q = local(e); if (!inZone(q) || mode === 'build' || e.target.closest('a,button')) return;
      pieces.forEach((p) => { const dx = p.hx + p.ox - q.x, dy = p.hy + p.oy - q.y, d = Math.hypot(dx, dy) || 1, R = 300;
        if (d < R) { const f = 1 - d / R; p.vx += dx / d * 1500 * f; p.vy += dy / d * 1500 * f - 200 * f; p.va += (rnd() - 0.5) * 6 * f; p.vz += 0.9 * f; } });
      ptr.inside = e.pointerType === 'mouse' && inZone(q);
      if (!ptr.inside) restoreAt = performance.now() + 900;     // touch: they come home after a beat
      run();
    });
  }

  /* ---------- boot ---------- */
  img.onload = () => {
    layout();
    if (RM) { snap(); mode = 'settled'; draw(); hero.classList.add('built'); return; }
    draw(); run();
  };
  img.src = window.AP_PHOTO;
  let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { const m = mode; layout(); snap(); mode = m === 'build' ? 'settled' : m; draw(); }, 120); });

  // audit hook: deterministic seek (fixed 60 Hz steps from the start of the build)
  window.__hero = {
    seek(ms) { layout(); mode = 'build'; simT = 0; const n = Math.round(ms / (1000 / 60)); for (let i = 0; i < n; i++) step(1 / 60); draw(); return { mode, simT }; },
    stir(x, y, vx, vy, frames) { ptr.inside = true; ptr.x = x; ptr.y = y; ptr.vx = vx; ptr.vy = vy; mode = 'stir';
      for (let i = 0; i < frames; i++) { ptr.vx = vx; ptr.vy = vy; ptr.x += vx / 60; ptr.y += vy / 60; step(1 / 60); } draw(); },
    leave(ms, again) { ptr.inside = false; if (!again) release(); running = false; const n = Math.round(ms / (1000 / 60)); for (let i = 0; i < n; i++) step(1 / 60); draw(); },
    lift: () => pieces.reduce((s, p) => s + lift(p), 0), count: () => pieces.length, panel: () => P,
  };
})();
