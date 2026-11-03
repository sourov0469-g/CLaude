/* SERVICES G and H (overnight ladder, Round 9). Facts from Svc2.T and FACTS.md only; a figure the records do not hold is
   shown as not recorded, never filled in.
   G — side by side (Dropbox Brand: subtraction). The three trades in one comparison table with plain bars; sort by a
       column; open a row for its lead and booking. On phones each row becomes a card.
   H — pull a board (Graza: the custom-animation bar). Three lap boards stacked on a wall, one per trade, overlapping as
       real courses do; pull one and it swings up on its top edge to show the trade behind it. */
window.Svc4 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const T = () => (window.Svc2 ? Svc2.T : []);
  // per trade: documented, priced, median band, time on site, maker / warranty (FACTS.md)
  const ROW = [[431, 415, '$10k–$15k', '1–2 weeks, paint included', '30-year James Hardie, non-prorated'],
    [388, 376, '$10k–$15k', '2 days, most window-only jobs', 'NT Windows, Simonton or Andersen on 330 of 376'],
    [241, 233, '$10k–$15k shingle · $20k–$25k metal', null, 'GAF Master Elite contractor']];
  const COLS = [['Documented jobs', 0], ['Priced jobs', 1]];

  /* ---------- G ---------- */
  const G = () => { const t = T(), max = 431;
    return `<section class="sec svG" id="services" aria-labelledby="svG-h">
      <div class="hd"><h2 class="sec-h" id="svG-h" data-split>The three trades, side by side.</h2><p class="sec-p">What our records show for each. Sort a column, or open a row.</p></div>
      <div class="tbw" data-solid><table class="cmp"><caption class="sr">Siding, windows and roofing compared from the firm's documented jobs</caption>
        <thead><tr><th scope="col">Trade</th>${COLS.map(([n, k]) => `<th scope="col" aria-sort="none"><button type="button" data-k="${k}">${n}<i aria-hidden="true"></i></button></th>`).join('')}<th scope="col">Median band</th><th scope="col">Time on site</th><th scope="col">Maker or warranty</th><th scope="col"><span class="sr">Details</span></th></tr></thead>
        ${t.map((x, i) => { const r = ROW[i]; return `<tbody class="rw" data-a="${r[0]}" data-b="${r[1]}"><tr><th scope="row"><b>${x.name}</b></th>
          <td data-l="Documented jobs"><span class="v">${r[0]}</span><span class="bar" aria-hidden="true"><i style="--w:${(r[0] / max).toFixed(3)}"></i></span></td>
          <td data-l="Priced jobs"><span class="v">${r[1]}</span><span class="bar" aria-hidden="true"><i style="--w:${(r[1] / max).toFixed(3)}"></i></span></td>
          <td data-l="Median band">${r[2]}</td><td data-l="Time on site">${r[3] || '<span class="nr">Not recorded</span>'}</td><td data-l="Maker or warranty">${r[4]}</td>
          <td><button type="button" class="op" aria-expanded="false" aria-controls="svG-d${i}">Open<span class="sr"> ${x.name}</span></button></td></tr>
          <tr class="dt" id="svG-d${i}" hidden><td colspan="7"><div class="dti"><p>${x.lead}</p>${book}</div></td></tr></tbody>`; }).join('')}</table></div>
      <p class="note">Priced jobs are those with a recorded price. Roofing's 233 are 204 shingle roofs and 29 metal roofs.</p></section>`; };

  function wireG(root) {
    const s = root.querySelector('.svG'); if (!s) return; const tb = s.querySelector('table'), ths = [...s.querySelectorAll('thead th[aria-sort]')];
    s.querySelectorAll('thead button').forEach((b, j) => b.addEventListener('click', () => { const th = ths[j], dir = th.getAttribute('aria-sort') === 'descending' ? 'ascending' : 'descending';
      ths.forEach((x) => x.setAttribute('aria-sort', 'none')); th.setAttribute('aria-sort', dir); const key = b.dataset.k === '0' ? 'a' : 'b';
      const rows = [...tb.querySelectorAll('tbody.rw')]; const first = rows.map((r) => r.getBoundingClientRect().top);
      rows.sort((x, y) => (dir === 'descending' ? y.dataset[key] - x.dataset[key] : x.dataset[key] - y.dataset[key])).forEach((r) => tb.append(r));
      if (!RM) rows.forEach((r, i) => { const d = first[[...tb.querySelectorAll('tbody.rw')].indexOf(r)] - r.getBoundingClientRect().top; r.animate([{ transform: `translateY(${-d}px)` }, { transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.16,1,.3,1)' }); }); }));
    s.querySelectorAll('.op').forEach((b) => b.addEventListener('click', () => { const on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); b.firstChild.textContent = on ? 'Close' : 'Open'; const d = s.querySelector('#' + b.getAttribute('aria-controls')); d.hidden = !on; b.closest('tbody').classList.toggle('open', on); }));
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.3 }).observe(tb);
  }

  /* ---------- H ---------- */
  const H = () => `<section class="sec svH" id="services" aria-labelledby="svH-h">
    <div class="hd"><h2 class="sec-h" id="svH-h" data-split>Pull a board.</h2><p class="sec-p">Three trades, laid like courses on a wall. Pull one to see what's behind it.</p></div>
    <div class="wall3">${T().map((t, i) => `<div class="bd3 b${i}" style="--i:${i}"><h3><button type="button" class="face" aria-expanded="false" aria-controls="svH-p${i}"><span class="nm">${t.name}</span><span class="n">${t.n}</span><span class="u">${t.unit}</span><span class="pull" aria-hidden="true">Pull <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button></h3>
      <div class="under" id="svH-p${i}" role="region" aria-label="${t.name}"><div class="ui"><p class="ld">${t.lead}</p><dl class="figs2">${t.figs.map(([b, x]) => `<div><dt>${b}</dt><dd>${x}</dd></div>`).join('')}</dl>${book}</div></div></div>`).join('')}</div></section>`;

  function wireH(root) {
    const s = root.querySelector('.svH'); if (!s) return; const bds = [...s.querySelectorAll('.bd3')];
    bds.forEach((bd) => { const f = bd.querySelector('.face'); f.addEventListener('click', () => { const on = !bd.classList.contains('open');
      bds.forEach((x) => { x.classList.toggle('open', x === bd && on); x.querySelector('.face').setAttribute('aria-expanded', x === bd && on); }); }); });
    // the boards are nailed up one after another as the wall arrives
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.3 }).observe(s.querySelector('.wall3'));
  }
  return { G, H, wire(root) { wireG(root); wireH(root); } };
})();
