/* ON YOUR STREET, new versions for upgrade Round 5. Data: the firm's documented-project records (work/data/near.json, from
   the site's own project finder): each project's position in the finder's projection, month, trades, town and
   neighbourhood. The locked wording stays verbatim; no dot count is claimed.
   C — drive round our jobs (Bruno Simon, scoped by the annex: the project map as the ONE explorable section). A small van
       drives over the map of documented projects, steered by the arrow keys or by clicking/tapping where to go; the jobs
       it passes light up and are read out. 2D canvas, no 3D.
   D — every town on our books (Dropbox Brand: subtraction, big type, plain bars). The towns ranked by documented
       projects; each opens to its neighbourhoods and the work done there. */
window.Area2 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LOCK = '312 on the map with photos + 574 more counted';
  const N = () => window.__NEAR || { W: 566, H: 640, hq: [0, 0], ppm: 8.3, sv: [], ct: [], pl: [], p: [], towns: [] };
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const when = (d) => `${MON[(d % 100) - 1] || ''} 20${String(Math.floor(d / 100)).padStart(2, '0')}`;
  const trades = (m) => N().sv.filter((_, i) => m & (1 << i));
  const where = (q) => (q[5] >= 0 ? N().pl[q[5]] : N().ct[q[4]] || '');
  const FILT = [['all', 'All work', -1], ['s', 'Siding', 1], ['w', 'Windows', 2], ['r', 'Roofing', 4 | 8], ['p', 'Painting', 16]];

  /* ---------- C ---------- */
  const C = () => `<section class="sec arC" id="area" aria-labelledby="arC-h">
    <div class="lft"><h2 class="sec-h" id="arC-h" data-split>Drive round our jobs.</h2>
      <p class="sec-p">Every dot is a documented project. 886 documented projects since 2018: ${LOCK}.</p>
      <p class="how" id="arC-how"><b>Click or tap the map</b> to drive there, or focus the map and use the arrow keys.</p>
      <div class="flt" role="group" aria-label="Show">${FILT.map(([k, n], i) => `<button type="button" data-f="${k}" aria-pressed="${!i}">${n}</button>`).join('')}</div>
      <div class="towns" role="group" aria-label="Drive to a town">${N().towns.slice(0, 7).map(([n]) => `<button type="button" data-t="${esc(n)}">${esc(n)}</button>`).join('')}</div>
      <div class="rd" aria-live="polite"><p class="k">Passing</p><b>Our office</b><span>7801 N Lamar Blvd, Austin</span><span class="tr">Start here</span></div>
      <p class="cnt"><b>0</b> projects passed on this drive</p></div>
    <div class="stage" data-solid tabindex="0" aria-label="Map of documented projects with a van you can drive" aria-describedby="arC-how"><canvas aria-hidden="true"></canvas>
      <div class="zm" role="group" aria-label="Map view"><button type="button" data-z="1" aria-pressed="false">Whole area</button><button type="button" data-z="2.6" aria-pressed="true">Close up</button></div>
      <p class="lg" aria-hidden="true"><span><i class="d"></i>Documented project</span><span><i class="r"></i>Photos on our site</span><span><i class="h"></i>Our office</span></p></div></section>`;

  function wireC(root) {
    const s = root.querySelector('.arC'); if (!s) return; const n = N(), stage = s.querySelector('.stage'), cv = stage.querySelector('canvas'), g = cv.getContext('2d');
    const rd = s.querySelector('.rd'), cnt = s.querySelector('.cnt b');
    const P = n.p, seen = new Uint8Array(P.length), pop = new Float32Array(P.length);
    let mask = -1, zT = 2.6, z = 2.6, van = { x: n.hq[0], y: n.hq[1] + 8, a: -Math.PI / 2, v: 0 }, cam = { x: van.x, y: van.y }, tgt = null, keys = {}, trail = [], raf = 0, last = 0, W = 0, H = 0, base = 1, passed = 0, lastSay = 0, vis = false;
    const size = () => { const r = stage.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; cv.style.width = W + 'px'; cv.style.height = H + 'px'; g.setTransform(d, 0, 0, d, 0, 0); base = Math.min(W / n.W, H / n.H) * 0.96; };
    const on = (q) => mask < 0 || (q[3] & mask);
    function say(q) { rd.querySelector('b').textContent = where(q); rd.querySelector('span').textContent = when(q[2]) + (q[6] ? ' · photos on our site' : ''); rd.querySelector('.tr').textContent = trades(q[3]).join(', '); }
    function draw(now) {
      const sc = base * z; g.clearRect(0, 0, W, H); g.save(); g.translate(W / 2, H / 2); g.scale(sc, sc); g.translate(-cam.x, -cam.y);
      g.fillStyle = '#F3F7F1'; g.fillRect(-40, -40, n.W + 80, n.H + 80);
      g.strokeStyle = '#E2EAE3'; g.lineWidth = 1 / sc; const step = n.ppm * 5; g.beginPath();
      for (let x = 0; x <= n.W; x += step) { g.moveTo(x, 0); g.lineTo(x, n.H); } for (let y = 0; y <= n.H; y += step) { g.moveTo(0, y); g.lineTo(n.W, y); } g.stroke();
      if (trail.length > 1) { g.strokeStyle = 'rgba(127,164,62,.55)'; g.lineWidth = 3 / sc; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); trail.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); }
      const r0 = 2.5 / Math.sqrt(z) * (base < 0.8 ? 1.2 : 1);
      for (let i = 0; i < P.length; i++) { const q = P[i]; if (!on(q)) continue; const k = pop[i] ? Math.max(0, 1 - (now - pop[i]) / 600) : 0, r = r0 * (1 + k * 1.6);
        g.fillStyle = seen[i] ? '#0E3B2C' : 'rgba(14,59,44,.42)'; g.beginPath(); g.arc(q[0], q[1], r, 0, 6.283); g.fill();
        if (q[6]) { g.strokeStyle = '#8DBF45'; g.lineWidth = 1.4 / Math.sqrt(sc); g.beginPath(); g.arc(q[0], q[1], r + 1.4 / Math.sqrt(z), 0, 6.283); g.stroke(); } }
      const fs = 13 / sc; g.font = `700 ${fs}px Inter, system-ui, sans-serif`; g.textAlign = 'center';
      n.towns.slice(0, z > 1.5 ? 14 : 8).forEach(([t, , x, y]) => { g.fillStyle = 'rgba(255,255,255,.85)'; const w = g.measureText(t).width; g.fillRect(x - w / 2 - 4 / sc, y - 18 / sc, w + 8 / sc, 17 / sc); g.fillStyle = '#16191D'; g.fillText(t, x, y - 5 / sc); });
      const hs = 12 / sc; g.fillStyle = '#B5DB6E'; g.strokeStyle = '#0E3B2C'; g.lineWidth = 2.5 / sc; g.fillRect(n.hq[0] - hs / 2, n.hq[1] - hs / 2, hs, hs); g.strokeRect(n.hq[0] - hs / 2, n.hq[1] - hs / 2, hs, hs);
      // the van, top-down: body, cab glass, lime roof stripe
      const L = 30 / sc, Wd = 16 / sc; g.save(); g.translate(van.x, van.y); g.rotate(van.a); g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(-L / 2 + 2 / sc, -Wd / 2 + 3 / sc, L, Wd);
      g.fillStyle = '#0E3B2C'; g.beginPath(); g.roundRect(-L / 2, -Wd / 2, L, Wd, 4 / sc); g.fill(); g.fillStyle = '#B5DB6E'; g.fillRect(-L / 2 + 4 / sc, -2 / sc, L * 0.55, 4 / sc);
      g.fillStyle = '#CFE3EE'; g.fillRect(L / 2 - 8 / sc, -Wd / 2 + 2.5 / sc, 4 / sc, Wd - 5 / sc); g.restore();
      g.restore(); }
    function tick(now) { raf = 0; const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      let thr = (keys.ArrowUp || keys.w ? 1 : 0) - (keys.ArrowDown || keys.s ? 0.6 : 0), st = (keys.ArrowRight || keys.d ? 1 : 0) - (keys.ArrowLeft || keys.a ? 1 : 0);
      if (tgt && !thr && !st) { const dx = tgt[0] - van.x, dy = tgt[1] - van.y, d = Math.hypot(dx, dy); if (d < 2.5) { tgt = null; } else { let da = Math.atan2(dy, dx) - van.a; da = Math.atan2(Math.sin(da), Math.cos(da)); st = Math.max(-1, Math.min(1, da * 2.4)); thr = Math.min(1, d / 26) * (Math.abs(da) > 1.4 ? 0.35 : 1); } }
      else if (thr || st) tgt = null;
      const vmax = 64; van.v += (thr * vmax - van.v) * Math.min(1, dt * 3.2); van.a += st * dt * 2.8 * Math.min(1, Math.abs(van.v) / 18 + (tgt ? 0.35 : 0)); van.x += Math.cos(van.a) * van.v * dt; van.y += Math.sin(van.a) * van.v * dt;
      van.x = Math.max(0, Math.min(n.W, van.x)); van.y = Math.max(0, Math.min(n.H, van.y));
      if (Math.abs(van.v) > 2) { const t = trail[trail.length - 1]; if (!t || Math.hypot(t[0] - van.x, t[1] - van.y) > 2) trail.push([van.x, van.y]); if (trail.length > 160) trail.shift(); }
      const pr = 7 / Math.sqrt(z); let hit = -1;
      for (let i = 0; i < P.length; i++) { const q = P[i]; if (!on(q)) continue; if (Math.abs(q[0] - van.x) < pr && Math.abs(q[1] - van.y) < pr) { if (!seen[i]) { seen[i] = 1; passed++; } if (!pop[i] || now - pop[i] > 900) pop[i] = now; hit = i; } }
      if (hit >= 0 && now - lastSay > 450) { say(P[hit]); lastSay = now; cnt.textContent = passed; }
      z += (zT - z) * Math.min(1, dt * 4); const fx = z > 1.2 ? van.x : n.W / 2, fy = z > 1.2 ? van.y : n.H / 2; cam.x += (fx - cam.x) * Math.min(1, dt * 3.5); cam.y += (fy - cam.y) * Math.min(1, dt * 3.5);
      draw(now); const busy = Math.abs(van.v) > 0.5 || tgt || thr || st || Math.abs(zT - z) > 0.005 || Math.hypot(fx - cam.x, fy - cam.y) > 0.3 || pop.some((t) => t && now - t < 600);
      if (busy && vis) raf = requestAnimationFrame(tick); else last = 0; }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const goTo = (x, y) => { if (RM) { van.x = x; van.y = y; cam.x = z > 1.2 ? x : n.W / 2; cam.y = z > 1.2 ? y : n.H / 2; const pr = 10; let h = -1; P.forEach((q, i) => { if (on(q) && Math.hypot(q[0] - x, q[1] - y) < pr) { if (!seen[i]) { seen[i] = 1; passed++; } h = i; } }); if (h >= 0) { say(P[h]); cnt.textContent = passed; } draw(performance.now()); return; } tgt = [x, y]; kick(); };
    stage.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) return; const r = cv.getBoundingClientRect(), sc = base * z; goTo(cam.x + (e.clientX - r.left - W / 2) / sc, cam.y + (e.clientY - r.top - H / 2) / sc); });
    stage.addEventListener('keydown', (e) => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(k)) { e.preventDefault(); keys[k] = true; if (RM) { const d = { ArrowUp: [0, -8], w: [0, -8], ArrowDown: [0, 8], s: [0, 8], ArrowLeft: [-8, 0], a: [-8, 0], ArrowRight: [8, 0], d: [8, 0] }[k]; goTo(van.x + d[0], van.y + d[1]); } else kick(); }
      if (k === 'Enter') goTo(n.hq[0], n.hq[1] + 8); });
    stage.addEventListener('keyup', (e) => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; keys[k] = false; });
    stage.addEventListener('blur', () => { keys = {}; });
    s.querySelectorAll('.towns button').forEach((b) => b.addEventListener('click', () => { const t = n.towns.find((x) => x[0] === b.dataset.t); if (t) goTo(t[2], t[3] + 4); }));
    s.querySelectorAll('.flt button').forEach((b) => b.addEventListener('click', () => { const f = FILT.find((x) => x[0] === b.dataset.f); mask = f[2]; s.querySelectorAll('.flt button').forEach((x) => x.setAttribute('aria-pressed', x === b)); draw(performance.now()); }));
    s.querySelectorAll('.zm button').forEach((b) => b.addEventListener('click', () => { zT = +b.dataset.z; s.querySelectorAll('.zm button').forEach((x) => x.setAttribute('aria-pressed', x === b)); if (RM) { z = zT; cam.x = z > 1.2 ? van.x : n.W / 2; cam.y = z > 1.2 ? van.y : n.H / 2; draw(performance.now()); } else kick(); }));
    new ResizeObserver(() => { size(); draw(performance.now()); }).observe(stage);
    new IntersectionObserver((es) => es.forEach((e) => { vis = e.isIntersecting; if (vis) kick(); }), { threshold: 0.1 }).observe(stage);
    size(); draw(performance.now());
  }

  /* ---------- D ---------- */
  const D = () => { const n = N(), T = n.towns, max = T.length ? T[0][1] : 1, top = T.slice(0, 8), rest = T.slice(8);
    const row = ([t, k, , , hoods, work], i) => `<li class="tw"><h3><button type="button" id="arD-b${i}" aria-expanded="false" aria-controls="arD-p${i}">
        <span class="rk">${String(i + 1).padStart(2, '0')}</span><span class="nm">${esc(t)}</span><span class="bar" aria-hidden="true"><i style="--w:${(k / max).toFixed(3)}"></i></span><span class="ct" data-n="${k}">${k}</span><i class="pm" aria-hidden="true"></i></button></h3>
      <div class="pn" id="arD-p${i}" role="region" aria-labelledby="arD-b${i}" hidden>
        ${hoods.length ? `<p class="k">Neighbourhoods</p><ul class="hd">${hoods.map(([h, c]) => `<li>${esc(h)}<b>${c}</b></li>`).join('')}</ul>` : ''}
        <p class="k">The work there</p><ul class="wk">${work.map(([w, c]) => `<li><span>${esc(w)}</span><i style="--w:${(c / work[0][1]).toFixed(3)}"></i><b>${c}</b></li>`).join('')}</ul></div></li>`;
    return `<section class="sec arD" id="area" aria-labelledby="arD-h">
      <div class="hd"><h2 class="sec-h" id="arD-h" data-split>Every town on our books.</h2>
        <p class="sec-p">886 documented projects since 2018: ${LOCK}. Ranked by town; open one to see its neighbourhoods and the work done there.</p></div>
      <ol class="tl2">${top.map(row).join('')}</ol>
      ${rest.length ? `<details class="rest"><summary>And ${rest.length} more towns</summary><ul>${rest.map(([t, k]) => `<li>${esc(t)}<b>${k}</b></li>`).join('')}</ul></details>` : ''}</section>`; };

  function wireD(root) {
    const s = root.querySelector('.arD'); if (!s) return; const bs = [...s.querySelectorAll('.tw button')];
    bs.forEach((b) => b.addEventListener('click', () => { const on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); const p = s.querySelector('#' + b.getAttribute('aria-controls')); p.hidden = !on; if (on) { p.classList.remove('in'); void p.offsetWidth; p.classList.add('in'); } }));
    // the bars grow and the numbers count up once, as the list arrives
    const list = s.querySelector('.tl2');
    const go = () => { list.classList.add('in'); if (RM) return; s.querySelectorAll('.tw .ct').forEach((c, i) => { const n = +c.dataset.n, t0 = performance.now() + i * 70; const st = (now) => { const k = Math.max(0, Math.min(1, (now - t0) / 900)); c.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); }); };
    if (RM) go(); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); go(); } }), { threshold: 0.25 }).observe(list);
  }
  return { C, D, wire(root) { wireC(root); wireD(root); } };
})();
