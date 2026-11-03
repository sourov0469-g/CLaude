/* Services markup (A and B) + behaviour. All figures are the firm's documented-project records (FACTS.md). */
window.Services = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const T = [
    { id: 'siding', name: 'Siding', scene: () => Scenes.siding(), count: '431', countL: 'documented siding projects',
      lead: 'James Hardie fiber cement on every priced job, replaced by the full wall or the whole house. No patch repairs.',
      figs: [['$10k–$15k', 'median band, 415 priced jobs'], ['1–2 weeks', 'on site, including paint'], ['30 years', 'James Hardie non-prorated warranty']] },
    { id: 'svc-windows', name: 'Windows', scene: () => Scenes.windows(), count: '388', countL: 'documented window projects',
      lead: 'NT Windows, Simonton and Andersen fitted on 330 of 376 priced jobs. Most window-only jobs take two days on site.',
      figs: [['$10k–$15k', 'median band, 376 priced jobs'], ['2 days', 'on site for most window-only jobs'], ['238', 'jobs with NT Windows, made in Texas']] },
    { id: 'roofing', name: 'Roofing', scene: () => Scenes.roofing(), count: '241', countL: 'shingle and metal roofs documented',
      lead: 'Shingle roofs on 210 documented projects and metal roofs on 31, from a GAF Master Elite contractor.',
      figs: [['$10k–$15k', 'shingle median band, 204 priced'], ['$20k–$25k', 'metal median band, 29 priced'], ['GAF', 'Master Elite']] },
  ];
  const MORE = [['Exterior painting', 320], ['Gutters', 121], ['Exterior doors', 109], ['Patio covers', 34], ['Garage doors', 9]];
  const more = () => `<div class="more" aria-label="More trades">${MORE.map(([n, c]) => `<a href="#booking" data-trade="${n}">${n} <i>${c}</i></a>`).join('')}</div>`;
  const figs = (t) => `<div class="figs">${t.figs.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>`;
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;

  const A = () => `<section class="sec svA" id="services" aria-labelledby="svA-h"><div class="pin">
    <div class="head"><h2 id="svA-h">Every trade on the house</h2><div class="rail" role="tablist" aria-label="Trades">
      ${T.map((t, i) => `<button type="button" role="tab" data-i="${i}" aria-current="${i === 0}">${t.name}<i></i></button>`).join('')}</div></div>
    <div class="track">${T.map((t) => `<article class="slide" id="${t.id}" aria-label="${t.name}"><div class="copy">
      <p class="k">${t.count} ${t.countL}</p><h3>${t.name}</h3><p>${t.lead}</p>${figs(t)}${book}
      ${t.id === 'roofing' ? more() : ''}</div><div class="stage">${t.scene()}</div></article>`).join('')}</div></div></section>`;

  const B = () => `<section class="sec svB" id="services" aria-labelledby="svB-h"><div>
    <h2 class="sr" id="svB-h">Every trade on the house</h2>
    <div class="words" role="tablist" aria-label="Trades">${T.map((t, i) => `<button type="button" role="tab" id="tb-${t.id}" aria-controls="pn-${t.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${t.name}<sup>${t.count}</sup></button>`).join('')}</div>
    <div class="info" aria-live="polite">${T.map((t, i) => `<div data-info="${i}" ${i ? 'hidden' : ''}><p>${t.lead}</p>${figs(t)}${book}</div>`).join('')}</div>${more()}</div>
    <div class="stagewrap">${T.map((t, i) => `<div class="panel${i ? '' : ' on'}" id="pn-${t.id}" role="tabpanel" aria-labelledby="tb-${t.id}">
      <div class="count"><b>${t.count}</b><span>${t.countL}</span></div>${t.scene()}</div>`).join('')}</div></section>`;

  function wireA(root) {
    const sec = root.querySelector('.svA'); if (!sec) return; const track = sec.querySelector('.track'), btns = sec.querySelectorAll('.rail button');
    let raf = 0; const mobile = () => innerWidth <= 860;
    function update() { raf = 0; if (mobile()) return;
      const r = sec.getBoundingClientRect(), total = sec.offsetHeight - innerHeight, p = Math.min(1, Math.max(0, -r.top / total));
      // each trade rests full view for half its share of the scroll, then the next slides in (eased): never parked half-cut
      const n = T.length - 1, raw = p * n, seg = Math.min(n - 1, Math.floor(raw)), t = Math.max(0, Math.min(1, (raw - seg - 0.25) / 0.5)), e = t * t * (3 - 2 * t);
      const f = seg + e, max = track.scrollWidth - track.clientWidth; track.style.transform = `translate3d(${(-(f / n) * max).toFixed(1)}px,0,0)`; btns.forEach((b, i) => { b.setAttribute('aria-current', Math.round(f) === i); b.querySelector('i').style.setProperty('--p', Math.max(0, Math.min(1, 1 - Math.abs(f - i)))); }); }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true }); addEventListener('resize', update); update();
    // header and in-page links to a trade land on that trade's resting view, not inside the moving track
    document.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a || mobile()) return;
      const i = T.findIndex((t) => '#' + t.id === a.getAttribute('href')); if (i < 0) return; e.preventDefault(); btns[i].click(); });
    track.addEventListener('focusin', (e) => { if (mobile()) return; const sl = e.target.closest('.slide'); if (!sl) return; const i = [...track.children].indexOf(sl), total = sec.offsetHeight - innerHeight;
      sec.querySelector('.pin').scrollLeft = 0; const y = sec.offsetTop + total * i / (T.length - 1) + 2; if (Math.abs(scrollY - y) > 4) scrollTo({ top: y, behavior: 'auto' }); });
    btns.forEach((b, i) => b.addEventListener('click', () => { const total = sec.offsetHeight - innerHeight; scrollTo({ top: sec.offsetTop + total * i / (T.length - 1) + 2, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }));
  }
  function wireB(root) {
    const sec = root.querySelector('.svB'); if (!sec) return; const tabs = [...sec.querySelectorAll('[role=tab]')], panels = [...sec.querySelectorAll('.panel')], infos = [...sec.querySelectorAll('[data-info]')];
    let cur = 0;
    function go(i, focus) { if (i === cur) return; const old = panels[cur]; old.classList.remove('on'); old.classList.add('out'); setTimeout(() => old.classList.remove('out'), 600);
      panels[i].classList.add('on'); tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
      infos.forEach((n, k) => (n.hidden = k !== i)); cur = i; if (focus) tabs[i].focus(); }
    tabs.forEach((t, i) => { t.addEventListener('click', () => go(i)); t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); go((cur + 1) % tabs.length, true); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); go((cur + tabs.length - 1) % tabs.length, true); } }); });
  }
  return { A, B, wire(root) { wireA(root); wireB(root); }, T };
})();
