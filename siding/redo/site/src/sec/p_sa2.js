/* SERVICE AREA PAGE · 2 Towns. The real town tallies: the firm's own per-town counts of documented projects (the finder's
   tallies, as On your street D on the homepage). Never added up anywhere: the tallies come from the finder and do not
   carry the locked 886 total.
   A — the town directory (Scout Motors: a directory board). Every town A–Z with its tally on a dotted leader.
   B — six big, the rest small (Dropbox Brand: hierarchy as the design). The six largest tallies set large; every other town
       in a compact list.
   C — sort it yourself (Cash App Brand Guidelines: one tidy table). A table you can sort by name or by documented
       projects, with a filter box. */
window.PSa2 = (function () {
  const B = () => window.PB;
  const T = () => ((window.__NEAR || {}).towns || []).filter((t) => t[1] > 0).map((t) => [t[0], t[1]]);
  const NOTE = 'Documented projects per town, from our own records.';

  const A = () => { const L = T().slice().sort((a, b) => a[0].localeCompare(b[0]));
    return `<section class="sec sa2A" id="area-towns" aria-labelledby="sa2A-h">
    <div class="hd"><h2 class="sec-h" id="sa2A-h" data-split>Every town on our books.</h2><p class="sec-p">${NOTE}</p></div>
    <ul class="dir">${L.map(([n, k]) => `<li><span>${B().esc(n)}</span><i aria-hidden="true"></i><b>${k}</b></li>`).join('')}</ul></section>`; };

  const Bv = () => { const L = T(); return `<section class="sec sa2B" id="area-towns" aria-labelledby="sa2B-h">
    <div class="hd"><h2 class="sec-h" id="sa2B-h" data-split>Where we work most.</h2><p class="sec-p">${NOTE}</p></div>
    <ol class="big6">${L.slice(0, 6).map(([n, k], i) => `<li><b>${k}</b><span>${B().esc(n)}</span><small>${String(i + 1).padStart(2, '0')}</small></li>`).join('')}</ol>
    <p class="also">Also on our books: ${L.slice(6).map(([n, k]) => `<span>${B().esc(n)} <i>${k}</i></span>`).join(', ')}.</p></section>`; };

  const C = () => { const L = T(); return `<section class="sec sa2C" id="area-towns" aria-labelledby="sa2C-h">
    <div class="hd"><h2 class="sec-h" id="sa2C-h" data-split>Find your town.</h2><p class="sec-p">${NOTE} Sort by either column, or type to filter.</p></div>
    <label class="flt"><span>Filter towns</span><input type="search" placeholder="e.g. Kyle" autocomplete="off"></label>
    <div class="tw4"><table class="tt3"><thead><tr><th scope="col" aria-sort="none"><button type="button" data-k="0">Town</button></th><th scope="col" aria-sort="descending"><button type="button" data-k="1">Documented projects</button></th></tr></thead>
      <tbody>${L.map(([n, k]) => `<tr data-n="${B().esc(n.toLowerCase())}"><th scope="row">${B().esc(n)}</th><td>${k}</td></tr>`).join('')}</tbody></table></div>
    <p class="cn4" aria-live="polite">${L.length} towns listed.</p></section>`; };

  function wireC(root) { const s = root.querySelector('.sa2C'); if (!s) return; const tb = s.querySelector('tbody'), ths = [...s.querySelectorAll('thead th')], q = s.querySelector('input'), cn = s.querySelector('.cn4');
    let key = 1, dir = -1;
    const rows = () => [...tb.querySelectorAll('tr')];
    const sort = () => { const r = rows().sort((a, b) => { const x = key ? +a.children[1].textContent : a.children[0].textContent, y = key ? +b.children[1].textContent : b.children[0].textContent; return (key ? x - y : String(x).localeCompare(y)) * dir; }); r.forEach((x) => tb.appendChild(x));
      ths.forEach((t, i) => t.setAttribute('aria-sort', i === key ? (dir > 0 ? 'ascending' : 'descending') : 'none')); };
    ths.forEach((t, i) => t.querySelector('button').addEventListener('click', () => { if (key === i) dir = -dir; else { key = i; dir = i ? -1 : 1; } sort(); }));
    q.addEventListener('input', () => { const v = q.value.trim().toLowerCase(); let n = 0; rows().forEach((r) => { const on = !v || r.dataset.n.includes(v); r.hidden = !on; n += on; }); cn.textContent = n ? `${n} town${n === 1 ? '' : 's'} listed.` : 'No town by that name in our records yet. Call (512) 550-0000 to ask.'; }); }
  return { A, B: Bv, C, wire(root) { wireC(root); } };
})();
