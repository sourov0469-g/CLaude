/* Interactive photograph (owner ruling 2026-11-03): a real photo of a finished job; on hover a bounded set of its own
   lap boards comes apart around the cursor (lifts, tilts, slides on its spring, casts a shadow, shows the house wrap
   behind); when the cursor leaves they settle back and the canvas is the pure photograph again. Nothing floats at rest.
   Touch: a tap lifts the boards around the finger and they return; reduced motion: the still photo.
   Canvas 2D only; draws only while a board is off its home; no library. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.photoHero = function (root, { src, data, crop, radius = 150, wrapTint = '#C8CED3' }) {
    const cv = root.querySelector('canvas'), g = cv.getContext('2d');
    const img = new Image(); img.decoding = 'async';
    const C = crop || [0, 0, data.w, data.h];
    let W = 0, H = 0, dpr = 1, s = 1, ox = 0, oy = 0, boards = [], running = false, last = 0;
    const ptr = { x: -1e4, y: -1e4, vx: 0, vy: 0, in: false, seen: false };
    for (const b of data.boards) {
      const xs = b.p.map((p) => p[0]), ys = b.p.map((p) => p[1]);
      const cx = xs.reduce((a, v) => a + v, 0) / xs.length, cy = ys.reduce((a, v) => a + v, 0) / ys.length;
      boards.push({ ...b, cx, cy, x0: Math.min(...xs), y0: Math.min(...ys), x1: Math.max(...xs), y1: Math.max(...ys),
        dx: 0, dy: 0, a: 0, z: 0, vx: 0, vy: 0, va: 0, vz: 0, k: 170 + Math.random() * 40, ph: Math.random() * 6.28 });
    }
    function layout() {
      const r = cv.getBoundingClientRect(); W = r.width; H = r.height; dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      const cw = C[2] - C[0], ch = C[3] - C[1];
      const fx = parseFloat(root.dataset.fx || 0.5), fy = parseFloat(root.dataset.fy || 0.5);
      s = Math.max(W / cw, H / ch); ox = (W - cw * s) * fx - C[0] * s; oy = (H - ch * s) * fy - C[1] * s;
      draw();
    }
    const busy = () => boards.some((b) => Math.abs(b.dx) + Math.abs(b.dy) > 0.15 || Math.abs(b.a) > 0.002 || b.z > 0.004 || Math.abs(b.vx) + Math.abs(b.vy) > 0.5);
    function path(b) { g.beginPath(); b.p.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); }
    function draw() {
      if (!img.complete) return;
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      g.setTransform(dpr * s, 0, 0, dpr * s, dpr * ox, dpr * oy);
      g.drawImage(img, 0, 0);
      const moving = boards.filter((b) => b.z > 0.004 || Math.abs(b.dx) + Math.abs(b.dy) > 0.15);
      if (!moving.length) return;
      // what is under a lifted board: house wrap with its nail line
      for (const b of moving) { g.save(); path(b); g.clip(); g.fillStyle = wrapTint; g.fillRect(b.x0 - 2, b.y0 - 2, b.x1 - b.x0 + 4, b.y1 - b.y0 + 4);
        g.fillStyle = 'rgba(57,103,145,.14)'; g.fillRect(b.x0, b.y1 - (b.y1 - b.y0) * 0.3, b.x1 - b.x0, 1.4 / s);
        g.fillStyle = 'rgba(60,64,70,.55)'; for (let x = b.x0 + 18; x < b.x1; x += 46) { g.beginPath(); g.arc(x, b.y0 + (b.y1 - b.y0) * 0.25, 1.6 / s, 0, 6.28); g.fill(); } g.restore(); }
      // the lifted boards: shadow, then the board itself (its own photo pixels), with a lit top arris and dark butt edge
      moving.sort((p, q) => p.z - q.z);
      for (const b of moving) {
        const lift = b.z, sc = 1 + lift * 0.22;
        g.save(); g.translate(b.cx + b.dx + lift * 18, b.cy + b.dy + lift * 26); g.rotate(b.a); g.scale(sc, sc); g.translate(-b.cx, -b.cy);
        path(b); g.fillStyle = `rgba(12,15,20,${(0.28 + lift * 0.3).toFixed(3)})`; g.shadowColor = 'rgba(12,15,20,.5)'; g.shadowBlur = (6 + lift * 22) * s * dpr; g.fill(); g.shadowBlur = 0; g.restore();
        g.save(); g.translate(b.cx + b.dx, b.cy + b.dy - lift * 6); g.rotate(b.a); g.scale(sc, sc); g.translate(-b.cx, -b.cy);
        path(b); g.clip(); g.drawImage(img, 0, 0);
        g.fillStyle = `rgba(255,255,255,${(0.5 * Math.min(1, lift * 2)).toFixed(3)})`; g.fillRect(b.x0, b.y0, b.x1 - b.x0, 3 / s);
        g.fillStyle = `rgba(255,255,255,${(0.1 * Math.min(1, lift * 2)).toFixed(3)})`; g.fillRect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0);
        g.fillStyle = `rgba(0,0,0,${(0.3 * Math.min(1, lift * 2)).toFixed(3)})`; g.fillRect(b.x0, b.y1 - 2.4 / s, b.x1 - b.x0, 2.4 / s);
        g.restore();
      }
    }
    function step(dt) {
      const R = radius / s;   // in photo pixels
      for (const b of boards) {
        if (ptr.in) {
          const px = (ptr.x - ox) / s, py = (ptr.y - oy) / s;
          // nearest point of the board's box to the cursor
          const nx = Math.max(b.x0, Math.min(px, b.x1)), ny = Math.max(b.y0, Math.min(py, b.y1));
          const d = Math.hypot(nx - px, ny - py);
          if (d < R) {
            const f = Math.pow(1 - d / R, 1.6), side = Math.sign(b.cy - py) || 1, along = Math.sign(b.cx - px) || 1;
            // the water push: lift off the wall, slide along the hand's path, tilt toward its side
            b.vz += 120 * f * dt; b.vy += (side * 7200 + ptr.vy / s * 14) * f * dt; b.vx += (along * 2600 + ptr.vx / s * 18) * f * dt;
            b.va += (along * side * 30 + ptr.vx * 0.02) * f * dt;
          }
        }
        const k = b.k, c = 2 * 0.62 * Math.sqrt(k);   // under-damped: boards overshoot and settle, like a slapped board
        b.vx += (-k * b.dx - c * b.vx) * dt; b.vy += (-k * b.dy - c * b.vy) * dt; b.va += (-k * b.a - c * b.va) * dt; b.vz += (-k * 0.6 * b.z - c * 0.8 * b.vz) * dt;
        b.dx += b.vx * dt; b.dy += b.vy * dt; b.a += b.va * dt; b.z = Math.max(0, Math.min(1, b.z + b.vz * dt));
        b.dx = Math.max(-60, Math.min(60, b.dx)); b.dy = Math.max(-46, Math.min(46, b.dy)); b.a = Math.max(-0.35, Math.min(0.35, b.a));
      }
      ptr.vx *= 0.85; ptr.vy *= 0.85;
    }
    function frame(t) {
      const dt = Math.min(1 / 30, last ? (t - last) / 1000 : 1 / 60); last = t;
      step(dt); draw();
      if (ptr.in || busy()) requestAnimationFrame(frame);
      else { for (const b of boards) { b.dx = b.dy = b.a = b.z = b.vx = b.vy = b.va = b.vz = 0; } draw(); running = false; }   // back to the pure photograph
    }
    function kick() { if (!running) { running = true; last = 0; requestAnimationFrame(frame); } }
    const local = (e) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    if (!RM) {
      root.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return; const q = local(e);
        if (ptr.seen) { ptr.vx = (q.x - ptr.x) * 40 + ptr.vx * 0.4; ptr.vy = (q.y - ptr.y) * 40 + ptr.vy * 0.4; }
        ptr.x = q.x; ptr.y = q.y; ptr.seen = true; ptr.in = !e.target.closest('[data-ui]'); kick();
      });
      root.addEventListener('pointerleave', () => { ptr.in = false; ptr.seen = false; });
      root.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' || e.target.closest('a,button')) return;
        const q = local(e); ptr.x = q.x; ptr.y = q.y; ptr.vx = 0; ptr.vy = -300; ptr.in = true; kick();
        setTimeout(() => { ptr.in = false; }, 420);   // a tap lifts the boards under the finger; they return by themselves
      });
    }
    img.onload = () => { layout(); root.classList.add('ready'); };
    img.src = src;
    addEventListener('resize', layout);
    return {
      // audit hooks
      hoverAt(x, y, vx, vy, frames) { ptr.in = true; ptr.x = x; ptr.y = y; for (let i = 0; i < frames; i++) { ptr.vx = vx; ptr.vy = vy; ptr.x += vx / 60; ptr.y += vy / 60; step(1 / 60); } draw(); },
      leave(ms) { ptr.in = false; for (let i = 0; i < ms / 16.67; i++) step(1 / 60); if (!busy()) for (const b of boards) { b.dx = b.dy = b.a = b.z = b.vx = b.vy = b.va = b.vz = 0; } draw(); },
      lift: () => boards.reduce((t, b) => t + Math.abs(b.dx) + Math.abs(b.dy) + b.z * 10, 0),
      toScreen: (x, y) => ({ x: ox + x * s, y: oy + y * s }),
    };
  };
})();
