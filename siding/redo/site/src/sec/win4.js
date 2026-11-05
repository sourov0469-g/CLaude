/* WINDOWS G and H (overnight ladder, Round 15). Frame colours: each maker's published exterior colours as the firm lists
   them (work/data/window_colours.json, injected as window.__WCOL). Nothing here prices a job or sends anything.
   G — frame colours, by maker (Cash App Brand Guidelines: colour as content). Choose a maker, then a frame colour; a
       drawn window in a lap wall takes it. Counts beside each maker are its priced jobs (FACTS.md).
   H — count your windows (Quiet Cubes: the service structure — the visit, prepared). A room-by-room tally a homeowner
       can do before calling; the total is for their own notes and can be copied. No price, no form, nothing sent. */
window.Win4 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const W = () => window.__WCOL || {};
  const JOBS = { 'NT Windows': 238, Simonton: 54, Andersen: 38, Pella: 31 };
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  /* ---------- G ---------- */
  const win = () => { let lap = ''; for (let y = 0; y < 420; y += 21) lap += `<path d="M0 ${y + 20}H600"/>`;
    return `<svg class="gw" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="600" height="420" class="wall"/><g class="lp">${lap}</g>
      <rect x="196" y="70" width="208" height="290" class="cas"/><rect x="210" y="84" width="180" height="262" class="fr"/><rect x="222" y="96" width="156" height="114" class="gl"/><rect x="222" y="222" width="156" height="112" class="gl"/>
      <rect x="216" y="208" width="168" height="16" class="fr"/><path d="M232 104L262 96M232 140L300 98" class="sh"/><rect x="186" y="358" width="228" height="12" class="sill"/></svg>`; };
  const G = () => { const w = W(), ms = Object.keys(w);
    return `<section class="sec wnG" id="windows" aria-labelledby="wnG-h">
      <div class="hd"><h2 class="sec-h" id="wnG-h" data-split>Frame colours, by maker.</h2><p class="sec-p">The exterior colours each maker offers, as we list them. Choose a maker, then a colour.</p></div>
      <div class="wrap"><div class="pv">${win()}<p class="nm" aria-live="polite"><b></b><span></span></p></div>
        <div class="side"><div class="mk" role="tablist" aria-label="Maker">${ms.map((m, i) => `<button type="button" role="tab" id="wnG-t${i}" aria-selected="${!i}" aria-controls="wnG-p${i}">${m}<small>${JOBS[m] ? JOBS[m] + ' priced jobs' : ''}</small></button>`).join('')}</div>
          ${ms.map((m, i) => `<div class="cl" role="tabpanel" id="wnG-p${i}" aria-labelledby="wnG-t${i}" ${i ? 'hidden' : ''}><p class="k">${w[m].length} exterior colours</p><div class="sws" role="radiogroup" aria-label="${m} frame colour">${w[m].map(([n, h], k) => `<button type="button" role="radio" aria-checked="${!k}" aria-label="${esc(n)}" data-m="${i}" data-k="${k}" style="--c:${h}"><span>${esc(n)}</span></button>`).join('')}</div></div>`).join('')}
          <p class="note">Colours as listed by each maker. Screens show colour a little differently; see the real frame samples at the free inspection.</p>${book}</div></div></section>`; };

  function wireG(root) {
    const s = root.querySelector('.wnG'); if (!s) return; const w = W(), ms = Object.keys(w), pv = s.querySelector('.pv'), tabs = [...s.querySelectorAll('.mk [role=tab]')], pans = [...s.querySelectorAll('.cl')];
    const paint = (mi, k) => { const [n, h] = w[ms[mi]][k]; pv.style.setProperty('--f', h); s.querySelector('.nm b').textContent = n; s.querySelector('.nm span').textContent = `${ms[mi]} · ${h}`;
      pans[mi].querySelectorAll('[role=radio]').forEach((b, j) => { b.setAttribute('aria-checked', j === k); b.tabIndex = j === k ? 0 : -1; }); };
    const tab = (i, f) => { tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; pans[k].hidden = k !== i; }); const sel = pans[i].querySelector('[aria-checked=true]'); paint(i, sel ? +sel.dataset.k : 0); if (f) tabs[i].focus(); };
    tabs.forEach((t, i) => { t.addEventListener('click', () => tab(i)); t.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); tab((i + d + tabs.length) % tabs.length, true); } }); });
    s.querySelectorAll('.sws [role=radio]').forEach((b) => { b.addEventListener('click', () => paint(+b.dataset.m, +b.dataset.k));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); const m = +b.dataset.m, n = w[ms[m]].length, k = (+b.dataset.k + d + n) % n; paint(m, k); pans[m].querySelectorAll('[role=radio]')[k].focus(); }); });
    tab(0);
  }

  /* ---------- H ---------- */
  const ROOMS = ['Living room', 'Kitchen', 'Dining', 'Bedrooms', 'Bathrooms', 'Stairs and halls', 'Other'];
  const H = () => `<section class="sec wnH" id="windows" aria-labelledby="wnH-h">
    <div class="hd"><h2 class="sec-h" id="wnH-h" data-split>Count your windows.</h2><p class="sec-p">A quick tally to have to hand when you book. It stays on this page; nothing is sent.</p></div>
    <div class="wrap"><ul class="rooms">${ROOMS.map((r, i) => `<li><span class="rn" id="wnH-r${i}">${r}</span><div class="stp" role="group" aria-labelledby="wnH-r${i}"><button type="button" data-d="-1" aria-label="One fewer in ${r}">−</button><output aria-live="polite" data-i="${i}">0</output><button type="button" data-d="1" aria-label="One more in ${r}">+</button></div></li>`).join('')}</ul>
      <div class="sum"><p class="k">Your tally</p><p class="tot"><b>0</b> windows</p><div class="glyphs" aria-hidden="true"></div><p class="lst"></p>
        <div class="acts"><button type="button" class="btn light cp">Copy my tally</button>${book}</div><p class="ok" aria-live="polite"></p>
        <p class="sm">We measure every opening at the free inspection. Most window-only jobs take 2 days.</p></div></div></section>`;

  function wireH(root) {
    const s = root.querySelector('.wnH'); if (!s) return; const outs = [...s.querySelectorAll('output')], n = ROOMS.map(() => 0), gl = s.querySelector('.glyphs');
    const upd = () => { const t = n.reduce((a, b) => a + b, 0); outs.forEach((o, i) => (o.value = o.textContent = n[i])); s.querySelector('.tot b').textContent = t;
      s.querySelector('.lst').textContent = n.map((c, i) => (c ? `${ROOMS[i]} ${c}` : '')).filter(Boolean).join(' · ');
      while (gl.children.length < t) { const g = document.createElement('i'); gl.append(g); } while (gl.children.length > t) gl.lastChild.remove(); };
    s.querySelectorAll('.stp button').forEach((b) => b.addEventListener('click', () => { const i = +b.parentElement.querySelector('output').dataset.i; n[i] = Math.max(0, Math.min(40, n[i] + +b.dataset.d)); upd(); }));
    s.querySelector('.cp').addEventListener('click', async () => { const t = n.reduce((a, b) => a + b, 0), txt = `Windows to replace: ${t}${t ? ' (' + n.map((c, i) => (c ? `${ROOMS[i]} ${c}` : '')).filter(Boolean).join(', ') + ')' : ''}`;
      const ok = s.querySelector('.ok'); try { await navigator.clipboard.writeText(txt); ok.textContent = 'Copied to your clipboard. Paste it when you book or call.'; } catch (e) { ok.textContent = txt; } });
    upd();
  }
  return { G, H, wire(root) { wireG(root); wireH(root); } };
})();
