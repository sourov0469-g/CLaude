/* ON YOUR STREET E and F (overnight ladder, Round 26). Data: the firm's documented-project records (window.__NEAR, from
   the site's own project finder): month, trades, town and neighbourhood of each record; town tallies are the finder's
   own (as Area D). No map, no dots, and no total is claimed; the locked 886 wording stays verbatim.
   E — is your street on our books? (Erie Home, note only: the service-area lookup grammar). One search box over the
       towns and neighbourhoods in the records; the answer is a plain yes or not-yet, with the work and the latest month.
   F — the job board (Lando Norris: the timing board). The most recent documented jobs as a departures board, newest
       first: month, place, work. Filter by trade; page back through earlier months. */
window.Area3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = () => window.__NEAR || { sv: [], ct: [], pl: [], p: [], towns: [] };
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const when = (m) => `${MO[(m % 100) - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const LOCKS = '<b>886</b> documented projects since 2018 · 312 on the map with photos + 574 more counted.';
  const trades = (mask) => N().sv.filter((_, i) => mask & (1 << i));
  const hoodOf = (q) => (q[5] >= 0 ? N().pl[q[5]].split(',')[0].trim() : '');
  const townOf = (q) => N().ct[q[4]] || '';

  /* ---------- E ---------- */
  // the index: every town with a tally, and every neighbourhood named in the records
  function index() { const d = N(), out = [], seen = new Set();
    d.towns.forEach((t) => { out.push({ k: 't', n: t[0], town: t[0], c: t[1] }); seen.add(t[0].toLowerCase()); });
    const hc = {}; d.p.forEach((q) => { if (q[5] < 0) return; const h = hoodOf(q), t = townOf(q); if (!h || h.toLowerCase() === t.toLowerCase()) return; const key = h + '|' + t; hc[key] = (hc[key] || 0) + 1; });
    Object.keys(hc).forEach((key) => { const [h, t] = key.split('|'); if (!seen.has(h.toLowerCase())) out.push({ k: 'h', n: h, town: t, c: hc[key] }); });
    return out; }
  const POP = ['Austin', 'Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown'];
  const E = () => `<section class="sec arE" id="area" aria-labelledby="arE-h">
    <div class="in2"><h2 class="sec-h" id="arE-h" data-split>Is your street on our books?</h2><p class="sec-p">Type your town or neighbourhood. The answer comes from our documented jobs.</p>
      <div class="cb"><label for="arE-q" class="vh">Town or neighbourhood</label>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></svg>
        <input id="arE-q" type="text" role="combobox" autocomplete="off" spellcheck="false" aria-autocomplete="list" aria-expanded="false" aria-controls="arE-l" placeholder="e.g. Circle C Ranch, or Leander">
        <ul id="arE-l" role="listbox" aria-label="Places in our records" hidden></ul></div>
      <p class="pop">Or try: ${POP.map((t) => `<button type="button" class="pq2" data-n="${esc(t)}">${t}</button>`).join('')}</p>
      <div class="ans" aria-live="polite"></div>
      <p class="lk">${LOCKS}</p></div></section>`;

  function wireE(root) {
    const s = root.querySelector('.arE'); if (!s) return; const d = N(), idx = index(), q = s.querySelector('input'), ul = s.querySelector('[role=listbox]'), ans = s.querySelector('.ans');
    let opts = [], act = -1;
    const close = () => { ul.hidden = true; q.setAttribute('aria-expanded', 'false'); q.removeAttribute('aria-activedescendant'); act = -1; };
    const list = () => { const v = q.value.trim().toLowerCase(); if (!v) { close(); return; }
      opts = idx.filter((o) => o.n.toLowerCase().includes(v)).sort((a, b) => (b.n.toLowerCase().startsWith(v) - a.n.toLowerCase().startsWith(v)) || (a.k === 't' ? -1 : 1) - (b.k === 't' ? -1 : 1) || b.c - a.c).slice(0, 8);
      ul.innerHTML = opts.length ? opts.map((o, i) => `<li role="option" id="arE-o${i}" aria-selected="false" data-i="${i}"><b>${esc(o.n)}</b><span>${o.k === 't' ? 'Town' : esc(o.town)}</span></li>`).join('') : `<li class="none" role="option" aria-disabled="true">Not in our records yet</li>`;
      ul.hidden = false; q.setAttribute('aria-expanded', 'true'); act = -1; };
    const mark = (i) => { act = i; [...ul.children].forEach((li, k) => li.setAttribute('aria-selected', k === i)); if (i >= 0) q.setAttribute('aria-activedescendant', 'arE-o' + i); };
    const answer = (o) => { close(); q.value = o.n; const recs = d.p.filter((r) => (o.k === 't' ? townOf(r) === o.town : hoodOf(r) === o.n && townOf(r) === o.town));
      const last = recs.reduce((m, r) => Math.max(m, r[2]), 0), tc = {}; recs.forEach((r) => trades(r[3]).forEach((t) => (tc[t] = (tc[t] || 0) + 1)));
      const work = Object.entries(tc).sort((a, b) => b[1] - a[1]).slice(0, 4); const hoods = o.k === 't' ? (d.towns.find((t) => t[0] === o.town) || [, , , , []])[4].filter((h) => h[0].toLowerCase() !== o.town.toLowerCase()).slice(0, 8) : [];
      ans.innerHTML = `<div class="card5"><p class="yes">Yes.</p><div><h3>${esc(o.n)}${o.k === 'h' ? `<small>${esc(o.town)}</small>` : ''}</h3>
        <p class="big"><b>${o.c}</b> documented project${o.c === 1 ? '' : 's'}${last ? ` · latest ${when(last)}` : ''}</p>
        ${work.length ? `<p class="wk">${work.map(([t, n]) => `<span>${esc(t)} <b>${n}</b></span>`).join('')}</p>` : ''}
        ${hoods.length ? `<p class="hd5">Neighbourhoods on the books: ${hoods.map((h) => `<button type="button" class="hq" data-n="${esc(h[0])}" data-t="${esc(o.town)}">${esc(h[0])}</button>`).join('')}</p>` : ''}
        <p class="nx">Next step: a free inspection. Call <a href="tel:+15125500000">(512) 550-0000</a>, Mon–Fri 8–8, Sat 8–6, Sun 12–5.</p></div></div>`;
      ans.querySelectorAll('.hq').forEach((b) => b.addEventListener('click', () => { const h = idx.find((x) => x.k === 'h' && x.n === b.dataset.n && x.town === b.dataset.t); if (h) answer(h); })); };
    const none = (v) => { close(); ans.innerHTML = `<div class="card5 no5"><p class="yes">Not yet.</p><div><h3>${esc(v)}</h3><p class="big">No documented project there in our records yet.</p>
      <p class="nx">That does not mean we cannot come. Call <a href="tel:+15125500000">(512) 550-0000</a> or visit 7801 N Lamar Blvd Suite C70, Austin TX 78752.</p></div></div>`; };
    q.addEventListener('input', list); q.addEventListener('focus', () => q.value && list());
    q.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); if (ul.hidden) list(); if (opts.length) mark(Math.min(opts.length - 1, act + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (opts.length) mark(Math.max(0, act - 1)); }
      else if (e.key === 'Enter') { e.preventDefault(); const v = q.value.trim(); if (!v) return; if (act >= 0) answer(opts[act]); else { const ex = idx.find((o) => o.n.toLowerCase() === v.toLowerCase()) || (opts.length === 1 ? opts[0] : null); ex ? answer(ex) : opts.length ? mark(0) : none(v); } }
      else if (e.key === 'Escape') close(); });
    ul.addEventListener('pointerdown', (e) => { const li = e.target.closest('li[data-i]'); if (li) { e.preventDefault(); answer(opts[+li.dataset.i]); } });
    q.addEventListener('blur', () => setTimeout(close, 120));
    s.querySelectorAll('.pq2').forEach((b) => b.addEventListener('click', () => { const o = idx.find((x) => x.k === 't' && x.n === b.dataset.n); if (o) answer(o); }));
  }

  /* ---------- F ---------- */
  const FIL = [['All', -1], ['Siding', [0]], ['Windows', [1]], ['Roofing', [2, 3]], ['Painting', [4]], ['Gutters', [5]], ['Doors', [6, 7]]];
  const PER = 10;
  const rowsH = (sl) => sl.map((q, i) => { const h = hoodOf(q), t = townOf(q), hh = h && h.toLowerCase() !== t.toLowerCase(); return `<li style="--i:${i}"><span class="wh">${when(q[2])}</span><span class="wr2"><b>${esc(hh ? h : t)}</b>${hh ? `<small>${esc(t)}</small>` : ''}</span><span class="wk2">${trades(q[3]).map(esc).join(' · ') || '—'}</span></li>`; }).join('');
  const first = () => N().p.slice().sort((a, b) => b[2] - a[2]).slice(0, PER);
  const F = () => `<section class="sec arF" id="area" aria-labelledby="arF-h">
    <div class="hd"><h2 class="sec-h" id="arF-h" data-split>The job board.</h2><p class="sec-p">Our most recent documented jobs, newest first. Filter by the work; page back through the months.</p></div>
    <div class="fl2" role="radiogroup" aria-label="Work">${FIL.map(([n], i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-f="${i}">${n}</button>`).join('')}</div>
    <div class="board"><div class="bh" aria-hidden="true"><span>When</span><span>Where</span><span>Work</span></div>
      <ol class="rows" aria-live="polite">${rowsH(first())}</ol>
      <div class="bf"><button type="button" class="pg2 prev" disabled>Later</button><span class="pgn"></span><button type="button" class="pg2 next">Earlier</button></div></div>
    <p class="lk">${LOCKS}</p></section>`;

  function wireF(root) {
    const s = root.querySelector('.arF'); if (!s) return; const d = N(), rows = s.querySelector('.rows'), fb = [...s.querySelectorAll('.fl2 button')], pv = s.querySelector('.prev'), nx = s.querySelector('.next'), pgn = s.querySelector('.pgn');
    const all = d.p.slice().sort((a, b) => b[2] - a[2]); let f = 0, pg = 0, list = all;
    const draw = () => { const n = Math.max(1, Math.ceil(list.length / PER)); pg = Math.max(0, Math.min(n - 1, pg)); const sl = list.slice(pg * PER, pg * PER + PER);
      rows.innerHTML = rowsH(sl);
      if (!RM) { rows.classList.remove('flip'); void rows.offsetWidth; rows.classList.add('flip'); }
      pv.disabled = pg === 0; nx.disabled = pg >= n - 1; const a = sl[0], z = sl[sl.length - 1]; pgn.textContent = a ? (when(a[2]) === when(z[2]) ? when(a[2]) : `${when(a[2])} – ${when(z[2])}`) : ''; };
    const setF = (i, focus) => { f = i; fb.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (focus) fb[i].focus();
      const m = FIL[i][1]; list = m === -1 ? all : all.filter((q) => m.some((b) => q[3] & (1 << b))); pg = 0; draw(); };
    fb.forEach((b, i) => { b.addEventListener('click', () => setF(i)); b.addEventListener('keydown', (e) => { const dd = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (dd) { e.preventDefault(); setF((i + dd + fb.length) % fb.length, true); } }); });
    pv.addEventListener('click', () => { pg--; draw(); }); nx.addEventListener('click', () => { pg++; draw(); });
    draw();
  }
  return { E, F, wire(root) { wireE(root); wireF(root); } };
})();
