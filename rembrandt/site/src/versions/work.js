import { def, d, $, $$, E, calm, small, clamp, lerp, sub, stageP, fine } from './registry.js';

// ---------- S8 V2 "On the table": prints at ±4° (±2° phones), jitter ±36px, entering from off-screen with scroll (item 1.2 at index × .34);
// tapping a print pushes the others to the table's edges (0.9s expo, rotation jitter ±12°); tapping again returns everything
def('work', 2, {
  init(sec) {
    const stage = $('[data-table-stage]', sec), table = $('[data-table]', sec), prints = $$('[data-print]', sec);
    const rnd = (i, k) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return (x - Math.floor(x)) * 2 - 1; }; // deterministic jitter
    const rot = small() ? 2 : 4, jit = small() ? 14 : 36, cols = small() ? 2 : 3;
    const P = prints.map((el, i) => {
      const c = i % cols, r = Math.floor(i / cols), rows = Math.ceil(prints.length / cols);
      const bx = (c + 0.5) / cols, by = (r + 0.5) / rows;
      const ang = Math.atan2(by - 0.5, bx - 0.5) || (i * 1.3);
      return { el, bx, by, r: rnd(i, 1) * rot, jx: rnd(i, 2) * jit, jy: rnd(i, 3) * jit, ex: Math.cos(ang) * 900, ey: Math.sin(ang) * 700 + 400, k: calm() ? 1 : 0, push: [0, 0, 0], big: 0 };
    });
    let focus = -1;
    const place = () => {
      const tw = table.clientWidth, th = table.clientHeight;
      P.forEach((p, i) => {
        const w = p.el.offsetWidth, h = p.el.offsetHeight;
        const x = p.bx * tw - w / 2 + p.jx + p.ex * (1 - p.k) + p.push[0], y = p.by * th - h / 2 + p.jy + p.ey * (1 - p.k) + p.push[1];
        const s = focus === i ? Math.min(tw * 0.78 / w, th * 0.8 / h) : 1;
        const cx = focus === i ? tw / 2 - w / 2 : x, cy = focus === i ? th / 2 - h / 2 : y;
        p.el.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) rotate(${(focus === i ? 0 : p.r + p.push[2]).toFixed(2)}deg) scale(${s.toFixed(3)})`;
        p.el.style.zIndex = focus === i ? 5 : 1;
      });
    };
    const total = 1.2 + (prints.length - 1) * 0.34;
    if (calm()) { sec.classList.add('table-calm'); requestAnimationFrame(place); }
    else sub(stage, () => { const t = 1.2 + clamp(stageP(stage) / 0.7, 0, 1) * (total - 1.2); /* the first print is already down when the table arrives: never an empty table */ P.forEach((p, i) => { const k = clamp((t - i * 0.34) / 1.2, 0, 1); p.k = 1 - Math.pow(1 - k, 3); }); if (focus < 0) place(); return false; });
    addEventListener('resize', () => sec.isConnected && place());
    const animate = () => { table.classList.add('moving'); place(); clearTimeout(animate.t); animate.t = setTimeout(() => table.classList.remove('moving'), 950); };
    prints.forEach((el, i) => el.addEventListener('click', () => {
      if (focus === i) { focus = -1; P.forEach(p => p.push = [0, 0, 0]); prints.forEach(b => b.setAttribute('aria-pressed', 'false')); animate(); return; }
      focus = i; const f = P[i], tw = table.clientWidth, th = table.clientHeight, dist = small() ? 0.5 : 0.62;
      P.forEach((p, k) => { if (k === i) { p.push = [0, 0, 0]; return; } const dx = p.bx - f.bx, dy = p.by - f.by;
        const horiz = Math.abs(dx) * tw > Math.abs(dy) * th; // north/south/east/west of the tapped print
        p.push = horiz ? [Math.sign(dx || 1) * tw * dist, dy * th * 0.2, rnd(k, 7) * 12] : [dx * tw * 0.2, Math.sign(dy || 1) * th * dist, rnd(k, 8) * 12]; });
      prints.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i))); animate();
    }));
    sec.addEventListener('keydown', e => { if (e.key === 'Escape' && focus >= 0) prints[focus].click(); });
    prints.forEach(b => b.setAttribute('aria-pressed', 'false'));
  }
});

// ---------- S8 V3 "Light line": a 2px light line + clip-path inset on the top image; pointer drag (desktop) or scroll position moves it
def('work', 3, {
  init(sec) {
    $$('[data-ljob]', sec).forEach(job => {
      const frame = $('.lframe', job), over = $('.over', job), line = $('.lline', job), range = $('[data-lrange]', job); let user = false;
      const set = x => { x = clamp(x, 0, 100); over.style.clipPath = `inset(0 0 0 ${x.toFixed(2)}%)`; line.style.transform = `translateX(${(x / 100 * frame.clientWidth).toFixed(1)}px)`; range.value = Math.round(x); };
      range.addEventListener('input', () => { user = true; set(+range.value); });
      if (fine) { let drag = false; frame.addEventListener('pointerdown', e => { drag = true; user = true; frame.setPointerCapture(e.pointerId); const r = frame.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); });
        frame.addEventListener('pointermove', e => { if (!drag) return; const r = frame.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); });
        frame.addEventListener('pointerup', () => drag = false); }
      set(50);
      if (calm()) return;
      sub(job, () => { if (user) return false; const r = window.RR.R(job), p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1); set(85 - p * 70); return false; });
      addEventListener('resize', () => job.isConnected && set(+range.value));
    });
  }
});
