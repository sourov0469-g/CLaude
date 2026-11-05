/* THE SEQUENCE (direction v2 §5: the game idea survives as a HORIZONTAL-SCROLL sequence, each interactive piece its own
   full view, one at a time, moving sideways; Bruno Simon spirit for ONE section). Four small jobs from the firm's trades,
   each done by hand: nail a lap board, seal a window, hang a gutter, paint the trim. Every piece has a keyboard path. */
window.Seq = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const G = [
    { k: 'board', t: 'Nail the missing course', how: 'Drag the loose board into the gap.', btn: 'Place the board', done: 'Nailed. HardiePlank lap, 7 in exposure.', fact: ['431', 'documented siding jobs'] },
    { k: 'caulk', t: 'Seal the window', how: 'Run the caulk bead around the frame.', btn: 'Run the bead', done: 'Sealed all the way round.', fact: ['388', 'documented window jobs'] },
    { k: 'gutter', t: 'Hang the gutter', how: 'Lift the gutter into its hangers. Watch the rain.', btn: 'Hang it', done: 'Hung. The rain runs to the downspout.', fact: ['121', 'documented gutter jobs'] },
    { k: 'paint', t: 'Paint the trim', how: 'Brush across the bare fascia board.', btn: 'Paint it', done: 'Painted. Two coats on the real thing.', fact: ['320', 'documented painting jobs'] },
  ];
  function stage(k) {
    if (k === 'board') { let c = ''; for (let i = 0; i < 9; i++) if (i !== 4) c += `<i class="lc" style="top:${i * 11.1}%"></i>`;
      return `<div class="gb"><div class="wall">${c}<i class="gap" style="top:${4 * 11.1}%"></i></div><button type="button" class="loose" aria-label="Loose lap board. Drag it into the gap."><i></i><i></i><i></i><i></i></button></div>`; }
    if (k === 'caulk') return `<div class="gc"><svg viewBox="0 0 400 460" aria-hidden="true"><rect x="0" y="0" width="400" height="460" fill="#C6BEB0"/>${Array.from({ length: 17 }, (_, i) => `<path d="M0 ${i * 28}h400" stroke="rgba(0,0,0,.18)" stroke-width="2"/>`).join('')}
      <rect x="92" y="62" width="216" height="316" fill="#E0E0D8"/><rect x="106" y="76" width="188" height="288" fill="#2B3138"/><rect x="114" y="84" width="172" height="128" fill="#8FA7BA"/><rect x="114" y="228" width="172" height="128" fill="#8FA7BA"/><rect x="106" y="212" width="188" height="16" fill="#F3F0E9"/>
      <path class="gapline" d="M92 62H308V378H92Z" fill="none" stroke="#3B3127" stroke-width="5" stroke-dasharray="3 5"/>
      <path class="bead" d="M92 62H308V378H92Z" fill="none" stroke="#FBFAF4" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" pathLength="1000" stroke-dasharray="0 1000"/>
      <circle class="gun" r="9" cx="92" cy="62" fill="#B5DB6E" stroke="#0E3B2C" stroke-width="3"/></svg></div>`;
    if (k === 'gutter') return `<div class="gg"><div class="roof"></div><div class="fascia"></div><i class="hanger h1"></i><i class="hanger h2"></i><i class="hanger h3"></i><div class="spout"></div>
      <button type="button" class="trough" aria-label="Gutter section. Lift it into the hangers."></button><canvas class="rain" aria-hidden="true"></canvas></div>`;
    return `<div class="gp"><div class="eave"></div><canvas class="pc2" aria-hidden="true"></canvas><div class="sw3" role="radiogroup" aria-label="Paint colour">${[['Pure White SW 7005', '#EDECE6'], ['Iron Ore SW 7069', '#434341'], ['Hunt Club SW 6468', '#2A4F43']].map(([n, h], i) => `<button type="button" role="radio" aria-checked="${!i}" aria-label="${n}" data-c="${h}" style="--c:${h}"></button>`).join('')}</div></div>`;
  }
  const panel = (g, i) => `<article class="gm" data-g="${g.k}" aria-labelledby="sq-${i}"><div class="gtx"><span class="gn">${i + 1} / ${G.length}</span><h3 id="sq-${i}">${g.t}</h3><p class="how">${g.how}</p>
      <p class="ok" aria-live="polite"></p><div class="gacts"><button type="button" class="btn light auto">${g.btn}</button></div><p class="fact"><b>${g.fact[0]}</b>${g.fact[1]}</p></div>
      <div class="gst">${stage(g.k)}<span class="stamp" aria-hidden="true">Done</span></div></article>`;
  const end = () => `<article class="gm end" aria-labelledby="sq-end"><div class="gtx"><h3 id="sq-end">That was the small part.</h3><p class="how">The whole house is one free inspection away: siding, windows, roofing, gutters and paint, in one visit.</p>
      <p class="score" aria-live="polite"></p><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div><div class="gst tally">${G.map((g) => `<div class="tl" data-t="${g.k}"><i></i><b>${g.t}</b></div>`).join('')}</div></article>`;
  const head = (id) => `<div class="sqhd"><h2 class="sec-h" id="${id}">Try the job yourself.</h2><div class="sqdots" aria-hidden="true">${G.map(() => '<i></i>').join('')}<i></i></div></div>`;

  // A: vertical scroll drives the sideways track (pinned)
  const A = () => `<section class="sec sqA" id="try" aria-labelledby="sqA-h"><div class="pin">${head('sqA-h')}<div class="trk">${G.map(panel).join('')}${end()}</div></div></section>`;
  // B: a sideways rail you swipe or step through; vertical scroll is left alone
  const B = () => `<section class="sec sqB" id="try" aria-labelledby="sqB-h">${head('sqB-h')}<div class="rail" tabindex="0" aria-label="Four small jobs, side by side">${G.map(panel).join('')}${end()}</div>
    <div class="rnav"><button type="button" class="arw" data-d="-1" aria-label="Previous job"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button><button type="button" class="arw" data-d="1" aria-label="Next job"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button></div></section>`;

  /* ---------- the four games ---------- */
  function games(root, sec) {
    const done = new Set();
    const finish = (gm, k) => { if (gm.classList.contains('won')) return; gm.classList.add('won'); done.add(k); gm.querySelector('.ok').textContent = G.find((g) => g.k === k).done; gm.querySelector('.auto').disabled = true;
      sec.querySelectorAll(`.tl[data-t="${k}"]`).forEach((t) => t.classList.add('on')); const sc = sec.querySelector('.score'); if (sc) sc.textContent = done.size === G.length ? 'All four done. You would fit right in.' : `${done.size} of 4 done.`; };
    sec.querySelectorAll('.gm').forEach((gm) => {
      const k = gm.dataset.g, auto = gm.querySelector('.auto');
      if (k === 'board') {
        const b = gm.querySelector('.loose'), gap = gm.querySelector('.gap'); let st = null, ox = 0, oy = 0;
        const place = () => { b.classList.add('placed'); b.style.transform = ''; finish(gm, k); };
        b.addEventListener('pointerdown', (e) => { if (gm.classList.contains('won')) return; e.preventDefault(); b.setPointerCapture(e.pointerId); st = [e.clientX - ox, e.clientY - oy]; b.classList.add('drag'); });
        b.addEventListener('pointermove', (e) => { if (!st) return; ox = e.clientX - st[0]; oy = e.clientY - st[1]; b.style.transform = `translate(${ox}px,${oy}px) rotate(${Math.max(0, 9 - Math.hypot(ox, oy) / 30)}deg)`;
          const a = b.getBoundingClientRect(), g = gap.getBoundingClientRect(); gm.classList.toggle('near', Math.abs(a.top - g.top) < 46 && Math.abs(a.left - g.left) < 90); });
        const up = () => { if (!st) return; st = null; b.classList.remove('drag'); const a = b.getBoundingClientRect(), g = gap.getBoundingClientRect();
          if (Math.abs(a.top - g.top) < 46 && Math.abs(a.left - g.left) < 90) place(); else { ox = oy = 0; b.style.transform = ''; } gm.classList.remove('near'); };
        b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up);
        b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); place(); } }); auto.addEventListener('click', place);
      }
      if (k === 'caulk') {
        const svg = gm.querySelector('svg'), bead = gm.querySelector('.bead'), gun = gm.querySelector('.gun');
        const P = [[92, 62], [308, 62], [308, 378], [92, 378], [92, 62]], L = [216, 316, 216, 316], T = 1064, N = 120, cov = new Uint8Array(N);
        const at = (s) => { let d = s * T; for (let i = 0; i < 4; i++) { if (d <= L[i]) { const f = d / L[i]; return [P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f]; } d -= L[i]; } return P[0]; };
        const near = (x, y) => { let best = -1, bd = 1e9; for (let i = 0; i < N; i++) { const [px, py] = at((i + 0.5) / N), d = Math.hypot(px - x, py - y); if (d < bd) { bd = d; best = i; } } return bd < 30 ? best : -1; };
        const show = () => { const n = cov.reduce((a, v) => a + v, 0); // draw covered runs as one dashed stroke
          let dash = [], run = 0, on = cov[0]; const seg = 1000 / N; for (let i = 0; i < N; i++) { if (cov[i] === on) run++; else { dash.push(run * seg); run = 1; on = cov[i]; } } dash.push(run * seg);
          if (!cov[0]) dash.unshift(0); bead.setAttribute('stroke-dasharray', dash.join(' ')); if (n / N > 0.93) { cov.fill(1); bead.setAttribute('stroke-dasharray', '1000 0'); finish(gm, k); } };
        let down = false; const pt = (e) => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * 400 / r.width, (e.clientY - r.top) * 460 / r.height]; };
        svg.addEventListener('pointerdown', (e) => { down = true; svg.setPointerCapture(e.pointerId); e.preventDefault(); });
        svg.addEventListener('pointermove', (e) => { const [x, y] = pt(e); gun.setAttribute('cx', x); gun.setAttribute('cy', y); if (!down || gm.classList.contains('won')) return; const i = near(x, y); if (i >= 0) { cov[i] = 1; if (i > 0) cov[i - 1] = 1; if (i < N - 1) cov[i + 1] = 1; show(); } });
        addEventListener('pointerup', () => (down = false));
        auto.addEventListener('click', () => { if (RM) { cov.fill(1); show(); return; } let i = 0; const run = () => { for (let j = 0; j < 4 && i < N; j++, i++) cov[i] = 1; const [x, y] = at(i / N); gun.setAttribute('cx', x); gun.setAttribute('cy', y); show(); if (i < N) requestAnimationFrame(run); }; run(); });
      }
      if (k === 'gutter') {
        const box = gm.querySelector('.gg'), tr = gm.querySelector('.trough'), cv = gm.querySelector('.rain'), g = cv.getContext('2d'); let drops = [], raf = 0, vis = false, st = null, oy = 0;
        const hang = () => { tr.classList.add('hung'); tr.style.transform = ''; finish(gm, k); };
        tr.addEventListener('pointerdown', (e) => { if (gm.classList.contains('won')) return; e.preventDefault(); tr.setPointerCapture(e.pointerId); st = e.clientY - oy; });
        tr.addEventListener('pointermove', (e) => { if (st == null) return; oy = Math.min(0, e.clientY - st); tr.style.transform = `translateY(${oy}px)`; if (oy < -tr.parentElement.clientHeight * 0.18) { st = null; hang(); } });
        const up = () => { if (st == null) return; st = null; oy = 0; tr.style.transform = ''; }; tr.addEventListener('pointerup', up); tr.addEventListener('pointercancel', up);
        tr.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); hang(); } }); auto.addEventListener('click', hang);
        function frame() { raf = 0; const W = cv.width = box.clientWidth, H = cv.height = box.clientHeight, eave = H * 0.42, hung = tr.classList.contains('hung'), spx = W * 0.86;
          if (drops.length < 70) drops.push({ x: Math.random() * W * 0.8 + W * 0.04, y: -10, v: 6 + Math.random() * 4, s: 0 });
          g.strokeStyle = 'rgba(40,80,125,.8)'; g.lineWidth = 2.5;
          drops.forEach((d) => { if (d.s === 0) { d.y += d.v; if (d.y > eave) d.s = hung ? 1 : 2; } else if (d.s === 1) { d.x += 5; d.y = eave + 6; if (d.x > spx) { d.s = 3; d.x = spx + 6; } } else { d.y += d.v * 1.2; }
            g.beginPath(); g.moveTo(d.x, d.y); g.lineTo(d.x - (d.s === 1 ? 6 : 0), d.y - (d.s === 1 ? 0 : 8)); g.stroke(); });
          if (!hung) { g.fillStyle = 'rgba(70,110,150,.25)'; g.fillRect(0, H - 8, W, 8); }   // water pouring off the eave onto the ground
          drops = drops.filter((d) => d.y < H + 10); if (vis && !RM) raf = requestAnimationFrame(frame); }
        new IntersectionObserver((es) => es.forEach((e) => { vis = e.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(frame); }), { threshold: 0.2 }).observe(box);
        if (RM) frame();
      }
      if (k === 'paint') {
        const box = gm.querySelector('.gp'), cv = gm.querySelector('.pc2'), g = cv.getContext('2d'); let col = '#EDECE6', down = false, last = null, W = 0, H = 0, grid = null; const C = 40, R = 6;
        const size = () => { const r = box.getBoundingClientRect(); W = cv.width = Math.round(r.width); H = cv.height = Math.round(r.height * 0.34); g.fillStyle = '#CDBFA5'; g.fillRect(0, 0, W, H);   // bare primed fascia
          g.fillStyle = 'rgba(0,0,0,.08)'; for (let x = 0; x < W; x += 3) g.fillRect(x, (x * 7) % H, 1, 2); grid = new Uint8Array(C * R); };
        const dab = (x, y) => { g.fillStyle = col; g.beginPath(); g.ellipse(x, y, 26, 18, 0, 0, Math.PI * 2); g.fill(); const cx = Math.floor(x / W * C), cy = Math.floor(y / H * R);
          for (let i = -2; i <= 2; i++) for (let j = -1; j <= 1; j++) { const a = cx + i, b = cy + j; if (a >= 0 && a < C && b >= 0 && b < R) grid[b * C + a] = 1; } };
        const line = (a, b) => { const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 6); for (let i = 0; i <= n; i++) dab(a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n); };
        const check = () => { if (grid.reduce((a, v) => a + v, 0) / grid.length > 0.86) { g.fillStyle = col; g.fillRect(0, 0, W, H); finish(gm, k); } };
        const p = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
        cv.addEventListener('pointerdown', (e) => { if (gm.classList.contains('won')) return; down = true; cv.setPointerCapture(e.pointerId); last = p(e); dab(...last); e.preventDefault(); });
        cv.addEventListener('pointermove', (e) => { if (!down) return; const q = p(e); line(last, q); last = q; check(); });
        addEventListener('pointerup', () => { down = false; });
        const sws = [...gm.querySelectorAll('.sw3 button')]; sws.forEach((s) => s.addEventListener('click', () => { col = s.dataset.c; sws.forEach((x) => x.setAttribute('aria-checked', x === s)); if (gm.classList.contains('won')) { g.fillStyle = col; g.fillRect(0, 0, W, H); } }));
        auto.addEventListener('click', () => { if (RM) { grid.fill(1); check(); return; } let row = 0; const go = () => { line([0, H * (row + 0.5) / 3], [W, H * (row + 0.5) / 3]); row++; check(); if (row < 3) setTimeout(go, 220); }; go(); });
        size(); new ResizeObserver(() => { if (!gm.classList.contains('won')) size(); }).observe(box);
      }
    });
  }

  function wireA(root) {
    const s = root.querySelector('.sqA'); if (!s) return; const trk = s.querySelector('.trk'), dots = [...s.querySelectorAll('.sqdots i')], n = dots.length; let raf = 0; const mob = () => innerWidth <= 860;
    function upd() { raf = 0; if (mob()) { trk.style.transform = ''; return; } const r = s.getBoundingClientRect(), tot = s.offsetHeight - innerHeight, p = Math.max(0, Math.min(1, -r.top / tot));
      // rest on each piece, slide between (as the services sequence does)
      const m = n - 1, raw = p * m, seg = Math.min(m - 1, Math.floor(raw)), t = Math.max(0, Math.min(1, (raw - seg - 0.3) / 0.4)), f = seg + t * t * (3 - 2 * t);
      trk.style.transform = `translate3d(${(-f / m * (trk.scrollWidth - trk.clientWidth)).toFixed(1)}px,0,0)`; dots.forEach((d, i) => d.classList.toggle('on', Math.round(f) === i)); }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd); upd(); games(root, s);
    trk.addEventListener('focusin', (e) => { if (mob()) return; const gm = e.target.closest('.gm'); if (!gm) return; const i = [...trk.children].indexOf(gm), tot = s.offsetHeight - innerHeight;
      s.querySelector('.pin').scrollLeft = 0; const y = s.offsetTop + tot * i / (n - 1) + 2; if (Math.abs(scrollY - y) > 4) scrollTo({ top: y, behavior: 'auto' }); });
  }
  function wireB(root) {
    const s = root.querySelector('.sqB'); if (!s) return; const rail = s.querySelector('.rail'), dots = [...s.querySelectorAll('.sqdots i')], gms = [...rail.querySelectorAll('.gm')];
    const cur = () => Math.round(rail.scrollLeft / rail.clientWidth);
    const go = (i) => rail.scrollTo({ left: Math.max(0, Math.min(gms.length - 1, i)) * rail.clientWidth, behavior: RM ? 'auto' : 'smooth' });
    s.querySelectorAll('.arw').forEach((b) => b.addEventListener('click', () => go(cur() + +b.dataset.d)));
    rail.addEventListener('keydown', (e) => { if (e.target !== rail) return; if (e.key === 'ArrowRight') { e.preventDefault(); go(cur() + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur() - 1); } });
    rail.addEventListener('scroll', () => dots.forEach((d, i) => d.classList.toggle('on', i === cur())), { passive: true }); dots[0].classList.add('on'); games(root, s);
  }
  return { A, B, wire(root) { wireA(root); wireB(root); }, G, panel, games };
})();
