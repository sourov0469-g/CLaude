/* SIDING PAGE · 5 Siding jobs on record. The firm's documented-project records (window.__NEAR) and its own job photos
   (PB.img); only records that include Siding. The homepage figure "431 documented siding jobs" is the only count shown;
   no record total, no per-town figure is derived.
   A — five on the wall (Cowboy: warm, pinned). The five siding jobs among the firm's photos, each with its record line.
   B — the ledger (Scout Motors: the honest record). The latest siding records written up as ledger lines, newest first:
       month, neighbourhood and town, and what else was done on the same job. Filter by town; page back.
   C — names on the list (Dropbox Brand: type only). Every neighbourhood with a documented siding job, set as one
       alphabetical wall of names; choose a letter to jump; each name gives its latest month. */
window.PSd5 = (function () {
  const B = () => window.PB;
  const N = () => window.__NEAR || { sv: [], ct: [], pl: [], p: [] };
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const when = (m) => `${MO[(m % 100) - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const SID = (q) => q[3] & 1;
  const recs = () => N().p.filter(SID).slice().sort((a, b) => b[2] - a[2]);
  const town = (q) => N().ct[q[4]] || '', hood = (q) => (q[5] >= 0 ? N().pl[q[5]].split(',')[0].trim() : '');
  const others = (q) => N().sv.filter((_, i) => i && q[3] & (1 << i));
  const PH = [0, 2, 4, 5, 6]; // the firm's photos whose record includes Siding

  /* ---------- A ---------- */
  const A = () => `<section class="sec sd5A" id="siding-jobs" aria-labelledby="sd5A-h">
    <div class="hd"><h2 class="sec-h" id="sd5A-h" data-split>Siding jobs, on the wall.</h2><p class="sec-p">Five of our 431 documented siding jobs, as photographed and recorded.</p></div>
    <ul class="wall2">${PH.map((i, k) => `<li style="--r:${[-2, 1.5, -1, 2, -1.5][k]}deg"><figure>${B().img(i)}<figcaption>${B().cap(i)}</figcaption></figure></li>`).join('')}</ul></section>`;

  /* ---------- B ---------- */
  const TOWNS = ['All', 'Austin', 'Round Rock', 'Cedar Park', 'Pflugerville', 'Leander', 'Georgetown'];
  const rows = (list) => list.map((q) => { const h = hood(q), t = town(q), o = others(q); return `<li><span class="w3">${when(q[2])}</span><span class="p3"><b>${B().esc(h && h.toLowerCase() !== t.toLowerCase() ? h : t)}</b>${h && h.toLowerCase() !== t.toLowerCase() ? `<small>${B().esc(t)}</small>` : ''}</span><span class="o3">Siding${o.length ? ' + ' + o.map(B().esc).join(', ') : ''}</span></li>`; }).join('');
  const Bv = () => `<section class="sec sd5B" id="siding-jobs" aria-labelledby="sd5B-h">
    <div class="hd"><h2 class="sec-h" id="sd5B-h" data-split>The siding ledger.</h2><p class="sec-p">Our latest documented siding jobs, newest first, with what else was done on the same visit.</p></div>
    <div class="tw2" role="radiogroup" aria-label="Town">${TOWNS.map((t, i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-t="${t}">${t}</button>`).join('')}</div>
    <div class="ldg" data-solid><ol class="lr" aria-live="polite">${rows(recs().slice(0, 8))}</ol><div class="lf2"><button type="button" class="pv">Newer</button><span class="pg3"></span><button type="button" class="nx4">Older</button></div></div>
    <p class="lk2">431 documented siding jobs in all · <b>886</b> documented projects since 2018 · ${B().LOCK.area}.</p></section>`;

  /* ---------- C ---------- */
  const names = () => { const m = {}; recs().forEach((q) => { const h = hood(q), t = town(q); if (!h || h.toLowerCase() === t.toLowerCase()) return; const k = h + '|' + t; if (!m[k] || m[k] < q[2]) m[k] = q[2]; });
    return Object.entries(m).map(([k, v]) => { const [h, t] = k.split('|'); return { h, t, v }; }).sort((a, b) => a.h.localeCompare(b.h)); };
  const C = () => { const L = names(), letters = [...new Set(L.map((x) => x.h[0].toUpperCase()))];
    return `<section class="sec sd5C" id="siding-jobs" aria-labelledby="sd5C-h">
    <div class="hd"><h2 class="sec-h" id="sd5C-h" data-split>Names on the list.</h2><p class="sec-p">Every neighbourhood where we have a documented siding job. Choose a name for the latest month we worked there.</p></div>
    <nav class="az" aria-label="Jump to a letter">${letters.map((l) => `<a href="#sd5C-${l}">${l}</a>`).join('')}</nav>
    <div class="nw2">${letters.map((l) => `<p class="grp" id="sd5C-${l}"><span class="lt3" aria-hidden="true">${l}</span>${L.filter((x) => x.h[0].toUpperCase() === l).map((x) => `<button type="button" class="nm2" data-v="${x.v}" data-t="${B().esc(x.t)}">${B().esc(x.h)}</button>`).join('')}</p>`).join('')}</div>
    <p class="rd7" aria-live="polite">Choose a name.</p></section>`; };

  function wireB(root) { const s = root.querySelector('.sd5B'); if (!s) return; const bs = [...s.querySelectorAll('.tw2 button')], ol = s.querySelector('.lr'), pv = s.querySelector('.pv'), nx = s.querySelector('.nx4'), pg = s.querySelector('.pg3');
    const all = recs(); let list = all, p = 0; const PER = 8;
    const draw = () => { const n = Math.max(1, Math.ceil(list.length / PER)); p = Math.max(0, Math.min(n - 1, p)); const sl = list.slice(p * PER, p * PER + PER); ol.innerHTML = rows(sl); pv.disabled = !p; nx.disabled = p >= n - 1;
      pg.textContent = sl.length ? (when(sl[0][2]) === when(sl[sl.length - 1][2]) ? when(sl[0][2]) : `${when(sl[0][2])} – ${when(sl[sl.length - 1][2])}`) : ''; };
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); const t = bs[i].dataset.t; list = t === 'All' ? all : all.filter((q) => town(q) === t); p = 0; draw(); };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); });
    pv.addEventListener('click', () => { p--; draw(); }); nx.addEventListener('click', () => { p++; draw(); }); draw(); }
  function wireC(root) { const s = root.querySelector('.sd5C'); if (!s) return; const rd = s.querySelector('.rd7');
    s.querySelectorAll('.nm2').forEach((b) => b.addEventListener('click', () => { s.querySelectorAll('.nm2.on').forEach((x) => x.classList.remove('on')); b.classList.add('on'); rd.innerHTML = `<b>${b.textContent}</b>, ${B().esc(b.dataset.t)}: latest documented siding job ${when(+b.dataset.v)}.`; }));
    s.querySelectorAll('.az a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); const g = s.querySelector(a.getAttribute('href')); if (g) { g.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); const f = g.querySelector('.nm2'); if (f) f.focus({ preventScroll: true }); } })); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
