/* ROOFING PAGE · 3 Roofing jobs on record. The firm's documented-project records whose trades include Shingle Roofing or
   Metal Roofing (window.__NEAR), and its own roof-job photos (PB.img 6 Ashford Park, Buda; 1 Fairview, Round Rock). Only
   the homepage counts are stated (210 shingle, 31 metal); no record total or per-town figure is derived.
   A — the latest roofs (Scout Motors: the record, plainly). One real roof photo beside the six newest roof records.
   B — shingle or metal (Cash App Brand Guidelines: tidy tiles). Record tiles with a drawn roof badge; filter by kind;
       page back through the months.
   C — a street of roofs (Cowboy: warm, drawn). The 24 newest roof jobs as a skyline of small drawn houses, each with its
       kind of roof; choose a house to read its record. */
window.PRf3 = (function () {
  const B = () => window.PB;
  const N = () => window.__NEAR || { sv: [], ct: [], pl: [], p: [] };
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const when = (m) => `${MO[(m % 100) - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const SH = (q) => q[3] & (1 << 2), MT = (q) => q[3] & (1 << 3);
  const ROOF = (q) => SH(q) || MT(q);
  const town = (q) => N().ct[q[4]] || '', hood = (q) => (q[5] >= 0 ? N().pl[q[5]].split(',')[0].trim() : '');
  const place = (q) => { const h = hood(q), t = town(q); return h && h.toLowerCase() !== t.toLowerCase() ? [h, t] : [t, '']; };
  const kind = (q) => (SH(q) && MT(q) ? 'Shingle and metal' : MT(q) ? 'Metal roof' : 'Shingle roof');
  const recs = () => N().p.filter(ROOF).slice().sort((a, b) => b[2] - a[2]);

  const A = () => `<section class="sec rf3A" id="roofing-jobs" aria-labelledby="rf3A-h">
    <div class="hd"><h2 class="sec-h" id="rf3A-h" data-split>The latest roofs.</h2><p class="sec-p">Shingle roofs on 210 documented projects and metal roofs on 31. The newest six, from our records.</p></div>
    <div class="wrap"><figure class="ph5">${B().img(6)}<figcaption>${B().cap(6)}</figcaption></figure>
      <ol class="stk2">${recs().slice(0, 6).map((q) => { const [a, b] = place(q); return `<li><span class="m4">${when(q[2])}</span><span class="p4"><b>${B().esc(a)}</b>${b ? `<small>${B().esc(b)}</small>` : ''}</span><span class="k4 ${MT(q) ? 'mt2' : ''}">${kind(q)}</span></li>`; }).join('')}</ol></div></section>`;

  const FIL = [['Both', ROOF], ['Shingle', SH], ['Metal', MT]];
  const badge = (q) => MT(q) ? '<svg viewBox="0 0 40 28" aria-hidden="true"><path d="M2 14L20 2l18 12v12H2z" class="bm"/><path d="M8 10v16M14 6v20M20 3v23M26 6v20M32 10v16" class="bms"/></svg>' : '<svg viewBox="0 0 40 28" aria-hidden="true"><path d="M2 14L20 2l18 12v12H2z" class="bs2"/><path d="M6 16h28M4 21h32" class="bss"/></svg>';
  const tiles = (l) => l.map((q) => { const [a, b] = place(q); return `<li>${badge(q)}<div><small>${when(q[2])} · ${kind(q)}</small><b>${B().esc(a)}</b>${b ? `<span>${B().esc(b)}</span>` : ''}</div></li>`; }).join('');
  const Bv = () => `<section class="sec rf3B" id="roofing-jobs" aria-labelledby="rf3B-h">
    <div class="hd"><h2 class="sec-h" id="rf3B-h" data-split>Shingle or metal, on record.</h2><p class="sec-p">Our documented roof jobs, newest first. 210 shingle, 31 metal.</p></div>
    <div class="fl3" role="radiogroup" aria-label="Kind of roof">${FIL.map(([t], i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-i="${i}">${t}</button>`).join('')}</div>
    <ul class="tl4" aria-live="polite">${tiles(recs().slice(0, 9))}</ul>
    <div class="pg4"><button type="button" class="pv2" disabled>Newer</button><span></span><button type="button" class="nx5">Older</button></div></section>`;

  const house = (q, i) => { const h = 70 + ((i * 37) % 40), w = 60 + ((i * 23) % 30); return `<button type="button" class="hz ${MT(q) ? 'met' : ''}" data-i="${i}" style="--h:${h}px;--w:${w}px" aria-label="${when(q[2])}, ${B().esc(place(q).filter(Boolean).join(', '))}, ${kind(q)}"><i class="rfx"></i><i class="bd6"></i></button>`; };
  const C = () => { const L = recs().slice(0, 24); return `<section class="sec rf3C" id="roofing-jobs" aria-labelledby="rf3C-h">
    <div class="hd"><h2 class="sec-h" id="rf3C-h" data-split>A street of new roofs.</h2><p class="sec-p">Our 24 newest roof jobs, drawn as a street. Dark roofs are shingle; seamed roofs are metal. Choose a house.</p></div>
    <div class="sky2"><div class="row4">${L.map(house).join('')}</div><i class="kerb"></i></div>
    <p class="rd10" aria-live="polite">Choose a house to read its record.</p></section>`; };

  function wireB(root) { const s = root.querySelector('.rf3B'); if (!s) return; const bs = [...s.querySelectorAll('.fl3 button')], ul = s.querySelector('.tl4'), pv = s.querySelector('.pv2'), nx = s.querySelector('.nx5'), lab = s.querySelector('.pg4 span');
    const all = recs(); let list = all, p = 0; const PER = 9;
    const draw = () => { const n = Math.max(1, Math.ceil(list.length / PER)); p = Math.max(0, Math.min(n - 1, p)); const sl = list.slice(p * PER, p * PER + PER); ul.innerHTML = tiles(sl); pv.disabled = !p; nx.disabled = p >= n - 1; lab.textContent = sl.length ? `${when(sl[0][2])} – ${when(sl[sl.length - 1][2])}` : ''; };
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); list = all.filter(FIL[i][1]); p = 0; draw(); };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); });
    pv.addEventListener('click', () => { p--; draw(); }); nx.addEventListener('click', () => { p++; draw(); }); draw(); }
  function wireC(root) { const s = root.querySelector('.rf3C'); if (!s) return; const L = recs().slice(0, 24), rd = s.querySelector('.rd10');
    s.querySelectorAll('.hz').forEach((b) => b.addEventListener('click', () => { s.querySelectorAll('.hz.on').forEach((x) => x.classList.remove('on')); b.classList.add('on'); const q = L[+b.dataset.i], [a, c] = place(q);
      rd.innerHTML = `<b>${when(q[2])}</b> · ${B().esc(a)}${c ? ', ' + B().esc(c) : ''} · ${kind(q)}`; })); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
