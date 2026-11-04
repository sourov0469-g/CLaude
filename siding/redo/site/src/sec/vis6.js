/* VISUALISER K — "Open a colour" (new-versions addendum; Dropbox Brand: subtraction, the tile becomes the page).
   The 17 published James Hardie ColorPlus values for Austin (Vis2.CP) sit as a plain grid of colour tiles. Opening one
   grows that tile (clip-path from its own rectangle) until it fills the stage: the colour becomes the field, a house is
   drawn tone-on-tone in it (body a shade deeper, Arctic White trim), and the name is set large. ‹ › and the arrow keys
   step through the colours inside the open view; Esc or "All colours" shrinks it back into the tile of the colour shown.
   The drawing is an interface graphic, not a photograph of a job. */
window.Vis6 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const AR = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const CP = () => (window.Vis2 ? Vis2.CP : []);
  const ink = (h) => (window.Vis2 ? Vis2.ink(h) : '#16191D');
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  // a single-storey Austin ranch elevation: hip roof, a front gable over the door, lap courses, two windows
  function house() {
    let lap = ''; for (let y = 182; y < 330; y += 9) lap += `<path d="M70 ${y}h500" stroke="rgba(0,0,0,.2)" stroke-width="1.4"/><path d="M70 ${y + 1.4}h500" stroke="rgba(255,255,255,.1)"/>`;
    let gl = ''; for (let y = 124; y < 172; y += 9) { const hw = (y - 104) * (80 / 68); gl += `<path d="M${320 - hw} ${y}h${hw * 2}" stroke="rgba(0,0,0,.2)" stroke-width="1.4"/>`; }
    const win = (x) => `<rect class="ktr" x="${x - 8}" y="200" width="106" height="96" rx="1"/><rect x="${x}" y="208" width="90" height="80" fill="#2B3A44"/><path d="M${x} 208h90v34H${x}z" fill="#8FA6B4" opacity=".55"/><rect class="ktr" x="${x}" y="245" width="90" height="5"/><rect class="ktr" x="${x - 12}" y="294" width="114" height="7"/>`;
    return `<svg class="khs" viewBox="0 0 640 360" role="img" aria-label="A drawn single-storey house in the chosen colour with Arctic White trim">
      <defs><clipPath id="viK-b"><path d="M70 330V172H240L320 104L400 172H570V330Z"/></clipPath></defs>
      <ellipse cx="320" cy="338" rx="300" ry="10" fill="rgba(0,0,0,.14)"/>
      <path d="M38 176L150 98H490L602 176Z" fill="#2F3437"/>
      <path class="kbd" d="M70 330V172H240L320 104L400 172H570V330Z"/>
      <g clip-path="url(#viK-b)">${lap}${gl}<rect x="70" y="172" width="500" height="14" fill="rgba(0,0,0,.16)"/></g>
      <path d="M226 178L320 96L414 178L404 182L320 110L236 182Z" fill="#2F3437"/><path class="ktr" d="M226 178L320 96L414 178L410 181L320 102L230 181Z"/>
      <rect class="ktr" x="40" y="172" width="560" height="5"/><rect class="ktr" x="70" y="177" width="500" height="6"/>
      <rect class="ktr" x="64" y="177" width="10" height="153"/><rect class="ktr" x="566" y="177" width="10" height="153"/>
      ${win(116)}${win(434)}
      <rect class="ktr" x="288" y="214" width="64" height="116"/><rect x="296" y="222" width="48" height="108" fill="#26302D"/><circle cx="336" cy="280" r="2.4" fill="#C9B98A"/>
      <rect class="ktr" x="300" y="136" width="40" height="26"/><rect x="305" y="141" width="30" height="16" fill="#2B3A44"/>
      <rect x="58" y="330" width="524" height="8" fill="rgba(255,255,255,.35)"/></svg>`;
  }

  const K = () => {
    const L = CP(), [n0, h0] = L[0] || ['', '#888'];
    const tiles = L.map(([n, h], i) => `<li><button type="button" class="ktile" data-i="${i}" aria-expanded="false" aria-controls="viK-open" style="--c:${h};--t:${ink(h)}"><span class="tn">${esc(n)}</span><span class="th">${h}</span></button></li>`).join('');
    return `<section class="sec viK" id="colours" aria-labelledby="viK-h">
      <div class="hd"><p class="kk">Colours</p><h2 class="sec-h" id="viK-h" data-split>17 colours. Open one.</h2>
        <p class="sec-p">James Hardie ColorPlus, baked on at the factory: the 17 colours for Austin. Open one to see it on a house.</p></div>
      <div class="stg"><ul class="tg">${tiles}</ul>
        <div class="vo" id="viK-open" role="region" aria-labelledby="viK-n" hidden style="--c:${h0};--t:${ink(h0)}">
          <div class="vtx"><p class="vk">ColorPlus · <span class="vh">${h0}</span> · <span class="vc">1 of ${L.length}</span></p>
            <h3 class="vn" id="viK-n" tabindex="-1">${esc(n0)}</h3>
            <p class="vt">Shown with Arctic White trim, the ColorPlus trim colour. Screens show colour a little differently; see real samples at the free inspection.</p>
            <div class="vnv"><button type="button" class="vg" data-go="-1" aria-label="Previous colour">${AR(-1)}</button><button type="button" class="vg" data-go="1" aria-label="Next colour">${AR(1)}</button>
              <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div></div>
          <div class="vhs">${house()}</div>
          <button type="button" class="vx">All colours <span aria-hidden="true">×</span></button></div>
        <p class="vlive" aria-live="polite"></p></div></section>`;
  };

  function wire(root) {
    const s = root.querySelector('.viK'); if (!s) return;
    const L = CP(), stg = s.querySelector('.stg'), vo = s.querySelector('.vo'), tiles = [...s.querySelectorAll('.ktile')], live = s.querySelector('.vlive');
    let cur = 0, open = false, busy = 0;
    const DUR = 620, EASE = 'cubic-bezier(.7,0,.2,1)';
    const rectOf = (t) => { const a = stg.getBoundingClientRect(), b = t.getBoundingClientRect(); return `inset(${b.top - a.top}px ${a.right - b.right}px ${a.bottom - b.bottom}px ${b.left - a.left}px round 12px)`; };
    function paint(i) {
      const [n, h] = L[i]; cur = i; vo.style.setProperty('--c', h); vo.style.setProperty('--t', ink(h));
      if (open) tiles.forEach((x, k2) => x.setAttribute('aria-expanded', k2 === i)); vo.querySelector('.vn').textContent = n; vo.querySelector('.vh').textContent = h; vo.querySelector('.vc').textContent = `${i + 1} of ${L.length}`; live.textContent = `${n}, ${i + 1} of ${L.length}`;
    }
    function show(i) {
      if (open || Date.now() < busy) return; open = true; paint(i); const t = tiles[i]; tiles.forEach((x) => x.setAttribute('aria-expanded', x === t));
      vo.hidden = false; vo.classList.remove('on');
      if (RM) { vo.style.clipPath = 'none'; vo.classList.add('on'); }
      else { vo.style.transition = 'none'; vo.style.clipPath = rectOf(t); vo.getBoundingClientRect(); vo.style.transition = `clip-path ${DUR}ms ${EASE}`; vo.style.clipPath = 'inset(0px 0px 0px 0px round 22px)'; setTimeout(() => open && vo.classList.add('on'), DUR * 0.55); }
      busy = Date.now() + (RM ? 0 : DUR); setTimeout(() => vo.querySelector('.vn').focus({ preventScroll: true }), RM ? 0 : DUR * 0.6);
    }
    function hide() {
      if (!open || Date.now() < busy) return; open = false; const t = tiles[cur]; vo.classList.remove('on'); tiles.forEach((x) => x.setAttribute('aria-expanded', 'false'));
      const end = () => { vo.hidden = true; vo.style.clipPath = ''; t.focus({ preventScroll: true }); };
      if (RM) end(); else { vo.style.transition = `clip-path ${DUR * 0.85}ms ${EASE}`; vo.style.clipPath = rectOf(t); setTimeout(end, DUR * 0.85); }
      busy = Date.now() + (RM ? 0 : DUR);
    }
    const step = (d) => paint((cur + d + L.length) % L.length);
    tiles.forEach((t, i) => {
      t.addEventListener('click', () => show(i));
      t.addEventListener('keydown', (e) => { const cols = getComputedStyle(s.querySelector('.tg')).gridTemplateColumns.split(' ').length;
        const n = { ArrowRight: i + 1, ArrowLeft: i - 1, ArrowDown: i + cols, ArrowUp: i - cols, Home: 0, End: L.length - 1 }[e.key];
        if (n === undefined) return; e.preventDefault(); tiles[Math.max(0, Math.min(L.length - 1, n))].focus(); });
    });
    vo.querySelectorAll('.vg').forEach((b) => b.addEventListener('click', () => step(+b.dataset.go)));
    vo.querySelector('.vx').addEventListener('click', hide);
    vo.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); hide(); } else if (e.target.closest('.vn,.vg') || e.target === vo) { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); step(d); } } });
  }
  return { K, wire };
})();
