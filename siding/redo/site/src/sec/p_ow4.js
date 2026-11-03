/* OUR WORK PAGE · 4 The latest jobs. The firm's documented-project records (window.__NEAR), newest first: month, place,
   trades. No total and no per-month count is stated.
   A — by the month (Quiet Cubes: calm columns). The three latest months as three columns, each month's records listed
       under it; step back a month at a time.
   B — the front page (Scout Motors: the record as print). The latest records set like a newspaper's front page: a lead
       job, then columns of short entries.
   C — trades at a glance (Cash App Brand Guidelines: one tidy matrix). The fifteen latest jobs as rows, the trades as
       columns; a mark where the record includes that trade. */
window.POw4 = (function () {
  const B = () => window.PB;
  const N = () => window.__NEAR || { sv: [], ct: [], pl: [], p: [] };
  const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const mon = (m) => `${MO[(m % 100) - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const short = (m) => `${MO[(m % 100) - 1].slice(0, 3)} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const town = (q) => N().ct[q[4]] || '', hood = (q) => (q[5] >= 0 ? N().pl[q[5]].split(',')[0].trim() : '');
  const place = (q) => { const h = hood(q), t = town(q); return h && h.toLowerCase() !== t.toLowerCase() ? `${h}, ${t}` : t; };
  const trades = (q) => N().sv.filter((_, i) => q[3] & (1 << i));
  const all = () => N().p.slice().sort((a, b) => b[2] - a[2]);
  const months = () => [...new Set(all().map((q) => q[2]))];

  const col = (m) => `<div class="mc2"><h3>${mon(m)}</h3><ul>${all().filter((q) => q[2] === m).map((q) => `<li><b>${B().esc(place(q))}</b><span>${trades(q).map(B().esc).join(' · ')}</span></li>`).join('')}</ul></div>`;
  const A = () => { const M = months(); return `<section class="sec ow4A" id="work-latest" aria-labelledby="ow4A-h">
    <div class="hd"><h2 class="sec-h" id="ow4A-h" data-split>The latest jobs, by the month.</h2><p class="sec-p">From our documented records, newest first.</p></div>
    <div class="cols3" aria-live="polite">${M.slice(0, 3).map(col).join('')}</div>
    <div class="nav5"><button type="button" class="nw3" disabled>Newer months</button><button type="button" class="ol3">Older months</button></div></section>`; };

  const Bv = () => { const L = all().slice(0, 13), lead = L[0];
    return `<section class="sec ow4B" id="work-latest" aria-labelledby="ow4B-h">
    <div class="mast"><p>Austin Pro · The record</p><p>${short(lead[2])}</p></div>
    <div class="fp"><article class="lead2"><p class="pkick">Latest documented job</p><h2 class="sec-h" id="ow4B-h">${B().esc(place(lead))}</h2><p class="dk">${trades(lead).map(B().esc).join(', ')}. ${mon(lead[2])}.</p></article>
      <div class="cols4">${L.slice(1).map((q) => `<p><b>${B().esc(place(q))}</b> ${trades(q).map(B().esc).join(', ')}. <i>${short(q[2])}.</i></p>`).join('')}</div></div>
    <p class="ftn">From our documented records, newest first. 886 documented projects since 2018: 312 on the map with photos + 574 more counted.</p></section>`; };

  const COLS = [['Siding', [0]], ['Windows', [1]], ['Roofing', [2, 3]], ['Painting', [4]], ['Gutters', [5]], ['Doors', [6, 7]], ['Other', [8, 9]]];
  const C = () => `<section class="sec ow4C" id="work-latest" aria-labelledby="ow4C-h">
    <div class="hd"><h2 class="sec-h" id="ow4C-h" data-split>The latest fifteen, at a glance.</h2><p class="sec-p">Each row is one documented job. A mark means the record includes that work. "Other" is patio covers or decking.</p></div>
    <div class="mxw"><table class="mx3"><caption class="vh9">The fifteen latest documented jobs and their trades</caption><thead><tr><th scope="col">Job</th>${COLS.map(([c]) => `<th scope="col">${c}</th>`).join('')}</tr></thead>
      <tbody>${all().slice(0, 15).map((q) => `<tr><th scope="row"><b>${B().esc(place(q))}</b><small>${short(q[2])}</small></th>${COLS.map(([c, bits]) => { const on = bits.some((b) => q[3] & (1 << b)); return `<td>${on ? `<span class="mk2" role="img" aria-label="${c}: yes"></span>` : '<span class="vh9">no</span>'}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div></section>`;

  function wireA(root) { const s = root.querySelector('.ow4A'); if (!s) return; const M = months(), wrap = s.querySelector('.cols3'), nw = s.querySelector('.nw3'), ol = s.querySelector('.ol3'); let o = 0;
    const draw = () => { wrap.innerHTML = M.slice(o, o + 3).map(col).join(''); nw.disabled = o === 0; ol.disabled = o + 3 >= M.length; };
    nw.addEventListener('click', () => { o = Math.max(0, o - 3); draw(); }); ol.addEventListener('click', () => { o = Math.min(M.length - 1, o + 3); draw(); }); }
  return { A, B: Bv, C, wire(root) { wireA(root); } };
})();
