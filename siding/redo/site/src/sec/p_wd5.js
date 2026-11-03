/* WINDOWS & DOORS PAGE · 5 Doors. As published on the homepage: Exterior doors 109 documented jobs; Garage doors 9. No door
   price band is published on the homepage, so none is shown. Records: the firm's documented projects whose trades
   include Doors or Garage Doors (window.__NEAR). Review lines verbatim (checked at build): Jason Eternick, Katie
   Littleton, Karen Hibpshman.
   A — two doors, two counts (Cowboy: warm, drawn objects). A drawn front door and a drawn garage door, each with its count.
   B — door hangers (Quiet Cubes: calm, tactile). The latest door jobs on record as hanging door tags; turn one to read
       what else was done that visit.
   C — in their words (Dropbox Brand: type as the design). Three homeowners on their doors, set large. */
window.PWd5 = (function () {
  const B = () => window.PB;
  const N = () => window.__NEAR || { sv: [], ct: [], pl: [], p: [] };
  const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const when = (m) => `${MO[(m % 100) - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const DOOR = (q) => (q[3] & (1 << 6)) || (q[3] & (1 << 7));
  const town = (q) => N().ct[q[4]] || '', hood = (q) => (q[5] >= 0 ? N().pl[q[5]].split(',')[0].trim() : '');
  const trades = (q) => N().sv.filter((_, i) => q[3] & (1 << i));

  const front = `<svg viewBox="0 0 200 300" aria-hidden="true"><rect x="20" y="10" width="160" height="290" class="fr5"/><rect x="36" y="26" width="128" height="274" class="sl"/>
    <rect x="52" y="44" width="96" height="70" rx="2" class="lite"/><rect x="52" y="132" width="40" height="70" class="pn2"/><rect x="108" y="132" width="40" height="70" class="pn2"/><rect x="52" y="214" width="40" height="70" class="pn2"/><rect x="108" y="214" width="40" height="70" class="pn2"/><circle cx="146" cy="174" r="6" class="kb2"/></svg>`;
  const garage = `<svg viewBox="0 0 320 300" aria-hidden="true"><rect x="10" y="40" width="300" height="260" class="fr5"/>${[0, 1, 2, 3].map((i) => `<rect x="24" y="${54 + i * 60}" width="272" height="56" class="gp"/>${[0, 1, 2, 3].map((k) => `<rect x="${32 + k * 67}" y="${62 + i * 60}" width="58" height="40" class="${i ? 'pn2' : 'lite'}"/>`).join('')}`).join('')}</svg>`;
  const A = () => `<section class="sec wd5A" id="windows-doors" aria-labelledby="wd5A-h">
    <div class="hd"><h2 class="sec-h" id="wd5A-h" data-split>Doors, too.</h2><p class="sec-p">Exterior doors and garage doors, on the same free inspection as the windows.</p></div>
    <div class="dd2"><figure class="d1">${front}<figcaption><b>109</b><span>documented exterior-door jobs</span></figcaption></figure><figure class="d1 g">${garage}<figcaption><b>9</b><span>documented garage-door jobs</span></figcaption></figure>
      <div class="q3">${B().quote(10, 'I had Austin Pro replace my door & siding and it looks so much better.')}<div class="pacts">${B().book()}</div></div></div></section>`;

  const recent = () => N().p.filter(DOOR).slice().sort((a, b) => b[2] - a[2]).slice(0, 8);
  const Bv = () => `<section class="sec wd5B" id="windows-doors" aria-labelledby="wd5B-h">
    <div class="hd"><h2 class="sec-h" id="wd5B-h" data-split>On the door, lately.</h2><p class="sec-p">Our latest documented door jobs. Turn a tag over to see what else was done on the visit. 109 exterior-door jobs and 9 garage-door jobs on record.</p></div>
    <ul class="hg">${recent().map((q, i) => { const h = hood(q), t = town(q), hh = h && h.toLowerCase() !== t.toLowerCase(); return `<li style="--r:${[-3, 2, -1.5, 3, -2, 1.5, -3, 2.5][i]}deg"><button type="button" class="tg" aria-pressed="false">
      <span class="f5 a"><i class="ho"></i><small>${when(q[2])}</small><b>${B().esc(hh ? h : t)}</b><span>${hh ? B().esc(t) : '&nbsp;'}</span></span>
      <span class="f5 b"><i class="ho"></i><small>That visit</small><b>${trades(q).map(B().esc).join(', ')}</b></span></button></li>`; }).join('')}</ul></section>`;

  const C = () => `<section class="sec wd5C" id="windows-doors" aria-labelledby="wd5C-h">
    <h2 class="pkick" id="wd5C-h">Doors, in their words</h2>
    <div class="qs2">${B().quote(2, 'Austin Pro did an outstanding job installing our new oversized 16ft sliding doors leading out to our patio.', 'pq2 big')}
      ${B().quote(10, 'I had Austin Pro replace my door & siding and it looks so much better.', 'pq2 big')}${B().quote(11, 'From the start of ordering new windows and back doors, to the installation.', 'pq2 big')}</div>
    <div class="ft9"><p><b>109</b> documented exterior-door jobs · <b>9</b> garage-door jobs</p><div class="pacts">${B().book()}${B().call()}</div></div></section>`;

  function wireB(root) { const s = root.querySelector('.wd5B'); if (!s) return; s.querySelectorAll('.tg').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'))); }
  return { A, B: Bv, C, wire(root) { wireB(root); } };
})();
