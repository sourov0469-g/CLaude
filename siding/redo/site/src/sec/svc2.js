/* SERVICES, new versions for upgrade Round 2. Neither uses a sideways rhythm (that belongs to "Try the job").
   C — counted chapters: a pinned stage where scroll (the only source of truth, S1326) runs three colour-field chapters
       vertically; each trade's documented count arrives as a numeral event (Apple AirPods Pro: numbers as events) while a
       lap course draws itself under it (Cash App: colour as content, on light brand tints only — no dark fields).
   D — split cover (MERSI): the firm's own job photograph and the trade's facts meet at a seam; a central label cycles the
       trades and both halves wipe in sync; the seam can be dragged or moved with the keyboard.
   Figures: FACTS.md. Photos: the firm's own published jobs, captioned with their recorded place and date. */
window.Svc2 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const T = [
    { id: 'siding', name: 'Siding', n: 431, unit: 'documented siding jobs', field: 'f1', scene: 'siding',
      lead: 'James Hardie fiber cement, replaced by the full wall or the whole house. No patch repairs.',
      figs: [['$10k–$15k', 'median band, 415 priced'], ['1–2 weeks', 'on site, paint included'], ['30 years', 'Hardie non-prorated warranty']] },
    { id: 'svc-windows', name: 'Windows', n: 388, unit: 'documented window jobs', field: 'f2', scene: 'windows',
      lead: 'NT Windows, Simonton and Andersen on 330 of 376 priced jobs. Most window-only jobs take two days.',
      figs: [['$10k–$15k', 'median band, 376 priced'], ['2 days', 'most window-only jobs'], ['238', 'jobs with NT Windows']] },
    { id: 'roofing', name: 'Roofing', n: 241, unit: 'shingle and metal roofs', field: 'f3', scene: 'roofing',
      lead: 'Shingle roofs on 210 documented projects and metal on 31, from a GAF Master Elite contractor.',
      figs: [['$10k–$15k', 'shingle median, 204 priced'], ['$20k–$25k', 'metal median, 29 priced'], ['GAF', 'Master Elite']] },
  ];
  const figs = (t) => `<dl class="figs2">${t.figs.map(([b, s]) => `<div><dt>${b}</dt><dd>${s}</dd></div>`).join('')}</dl>`;
  const course = () => `<svg class="course" viewBox="0 0 600 40" aria-hidden="true" preserveAspectRatio="none"><path d="M0 8H600" pathLength="1"/><path d="M0 20H600" pathLength="1"/><path d="M0 32H600" pathLength="1"/></svg>`;

  /* ---------- C ---------- */
  const C = () => `<section class="sec svC" id="services" aria-labelledby="svC-h"><div class="stage">
    <div class="rail" aria-hidden="true">${T.map((t, i) => `<span data-i="${i}"><i></i>${t.name}</span>`).join('')}</div>
    <h2 class="sec-h" id="svC-h" data-split>Three trades, counted job by job.</h2>
    ${T.map((t, i) => `<article class="ch ${t.field}" id="${t.id}" data-i="${i}" aria-labelledby="svC-${i}">
      <div class="num"><b class="n" data-n="${t.n}">${t.n}</b><span>${t.unit}</span>${course()}</div>
      <div class="txt"><h3 id="svC-${i}">${t.name}</h3><p>${t.lead}</p>${figs(t)}${book}</div>
      <div class="obj" data-scene="${t.scene}"></div></article>`).join('')}
    </div></section>`;

  function wireC(root) {
    const s = root.querySelector('.svC'); if (!s) return; const chs = [...s.querySelectorAll('.ch')], rail = [...s.querySelectorAll('.rail span')];
    chs.forEach((c) => { const o = c.querySelector('.obj'); if (!o.firstChild && window.Scenes) { o.innerHTML = Scenes[o.dataset.scene](); if (Scenes.wire) Scenes.wire(o); } });
    const mob = () => innerWidth <= 860 || RM; let raf = 0;
    const count = (el, k) => { const n = +el.dataset.n; el.textContent = Math.round(n * k).toLocaleString('en-US'); };
    function upd() { raf = 0;
      if (mob()) { s.classList.add('flow'); return; } s.classList.remove('flow');
      const r = s.getBoundingClientRect(), tot = s.offsetHeight - innerHeight, p = Math.max(0, Math.min(1, -r.top / Math.max(1, tot))), f = p * T.length;
      chs.forEach((c, i) => { const local = Math.max(0, Math.min(1, f - i)), on = f >= i && f < i + 1 || (i === T.length - 1 && f >= T.length);
        c.classList.toggle('on', on); const k = Math.min(1, local * 2.5); c.style.setProperty('--k', k.toFixed(3)); count(c.querySelector('.n'), 1 - Math.pow(1 - k, 3)); });
      rail.forEach((d, i) => { d.classList.toggle('on', Math.min(T.length - 1, Math.floor(f)) === i); d.style.setProperty('--p', Math.max(0, Math.min(1, f - i)).toFixed(3)); }); }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd); upd();
    // phones / reduced motion: chapters in flow, each count runs once when it arrives
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting || !s.classList.contains('flow')) return; io.unobserve(e.target);
      const el = e.target.querySelector('.n'); e.target.classList.add('on'); e.target.style.setProperty('--k', 1); if (RM) { count(el, 1); return; }
      const t0 = performance.now(), st = (now) => { const k = Math.min(1, (now - t0) / 1100), ez = 1 - Math.pow(1 - k, 3); count(el, ez); if (k < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); }), { threshold: 0.4 });
    chs.forEach((c) => io.observe(c));
    // rail is also a way in: clicking a dot scrolls to that chapter's start
    s.querySelector('.rail').addEventListener('click', (e) => { const d = e.target.closest('span'); if (!d || mob()) return; const tot = s.offsetHeight - innerHeight; scrollTo({ top: s.offsetTop + tot * (+d.dataset.i + 0.15) / T.length, behavior: RM ? 'auto' : 'smooth' }); });
  }

  /* ---------- D ---------- */
  const D = () => { const P = window.__SVCP || {};
    return `<section class="sec svD" id="services" aria-labelledby="svD-h"><h2 class="sec-h" id="svD-h" data-split>Pick a trade. See a real job.</h2><span class="anc" id="siding" data-i="0"></span><span class="anc" id="roofing" data-i="2"></span>
    <div class="split" style="--seam:52%" data-solid>
      <div class="side ph2" aria-live="polite">${T.map((t, i) => { const p = P[t.scene] || {}; return `<figure class="cv${i ? '' : ' on'}" data-i="${i}">${p.src ? `<img src="${p.src}" alt="${p.alt || ''}" decoding="async">` : ''}
        <figcaption><b>${p.place || ''}</b><span>${p.when || ''} · ${p.trades || ''}</span><a href="${p.href || '#'}" target="_blank" rel="noopener">See the project</a></figcaption></figure>`; }).join('')}</div>
      <div class="side tx2">${T.map((t, i) => `<div class="cv${i ? '' : ' on'}" data-i="${i}" ${i ? 'aria-hidden="true"' : ''}><p class="cnt"><b>${t.n}</b> ${t.unit}</p><h3>${t.name}</h3><p class="ld">${t.lead}</p>${figs(t)}${book}</div>`).join('')}</div>
      <div class="seam" role="slider" tabindex="0" aria-label="Move the divide between the photo and the facts" aria-valuemin="30" aria-valuemax="70" aria-valuenow="52">
        <div class="label" role="tablist" aria-label="Trades">${T.map((t, i) => `<button type="button" role="tab" aria-selected="${!i}" data-i="${i}">${t.name}</button>`).join('')}</div>
        <span class="grip" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 6l-5 6 5 6M15 6l5 6-5 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
      <span class="bar" aria-hidden="true"><i></i></span>
    </div></section>`; };

  function wireD(root) {
    const s = root.querySelector('.svD'); if (!s) return; const sp = s.querySelector('.split'), seam = s.querySelector('.seam'), tabs = [...s.querySelectorAll('.label [role=tab]')];
    const L = [...s.querySelectorAll('.ph2 .cv')], R = [...s.querySelectorAll('.tx2 .cv')], bar = s.querySelector('.bar i');
    let cur = 0, timer = 0, hold = false, pct = 52;
    function go(i, user) { if (i === cur) return; const dir = i > cur || (cur === T.length - 1 && i === 0) ? 1 : -1;
      [L, R].forEach((set, side) => { set[cur].classList.remove('on'); set[cur].classList.add(dir * (side ? -1 : 1) > 0 ? 'outU' : 'outD'); const old = set[cur]; setTimeout(() => old.classList.remove('outU', 'outD'), 900);
        set[i].classList.remove('outU', 'outD'); set[i].style.setProperty('--from', (dir * (side ? -1 : 1) > 0 ? 100 : -100) + '%'); void set[i].offsetWidth; set[i].classList.add('on'); });
      R.forEach((r, k) => r.setAttribute('aria-hidden', k !== i)); tabs.forEach((t, k) => t.setAttribute('aria-selected', k === i)); cur = i; if (user) hold = true; arm(); }
    function arm() { clearTimeout(timer); bar.style.animation = 'none'; void bar.offsetWidth; if (RM || hold) return; bar.style.animation = ''; timer = setTimeout(() => go((cur + 1) % T.length), 6500); }
    tabs.forEach((t, i) => { t.addEventListener('click', () => go(i, true)); t.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); go((cur + d + T.length) % T.length, true); tabs[cur].focus(); } }); });
    const setSeam = (v) => { pct = Math.max(30, Math.min(70, v)); sp.style.setProperty('--seam', pct + '%'); seam.setAttribute('aria-valuenow', Math.round(pct)); };
    let drag = null;
    seam.addEventListener('pointerdown', (e) => { if (e.target.closest('[role=tab]')) return; drag = true; seam.setPointerCapture(e.pointerId); e.preventDefault(); });
    seam.addEventListener('pointermove', (e) => { if (!drag) return; const r = sp.getBoundingClientRect(); setSeam(innerWidth <= 860 ? (e.clientY - r.top) / r.height * 100 : (e.clientX - r.left) / r.width * 100); });
    seam.addEventListener('pointerup', () => (drag = null)); seam.addEventListener('pointercancel', () => (drag = null));
    seam.addEventListener('keydown', (e) => { if (e.target !== seam) return; const d = { ArrowLeft: -4, ArrowRight: 4, Home: -100, End: 100 }[e.key]; if (d) { e.preventDefault(); setSeam(pct + d); } });
    sp.addEventListener('pointerenter', () => { hold = true; arm(); }); sp.addEventListener('pointerleave', () => { hold = false; arm(); });
    sp.addEventListener('focusin', () => { hold = true; arm(); });
    new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) arm(); else clearTimeout(timer); }), { threshold: 0.4 }).observe(sp);
    // the menu's Siding / Roofing links land here and open that trade
    const fromHash = () => { const a = s.querySelector('.anc' + (location.hash ? `[id="${location.hash.slice(1)}"]` : '[data-none]')); if (a) go(+a.dataset.i, true); };
    addEventListener('hashchange', fromHash); document.addEventListener('click', (e) => { const l = e.target.closest && e.target.closest('a[href="#siding"],a[href="#roofing"]'); if (l) setTimeout(fromHash, 0); }); fromHash();
  }
  return { C, D, wire(root) { wireC(root); wireD(root); }, T };
})();
