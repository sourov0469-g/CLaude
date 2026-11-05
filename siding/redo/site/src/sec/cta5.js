/* BOOKING I and J (overnight ladder, Round 31). Locks verbatim: (512) 550-0000 · info@austinprosiding.com ·
   7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5 · 4.9 from 474 Google reviews · since 2009 ·
   30-year James Hardie non-prorated. Nothing here is sent or saved.
   I — day and night (Apple AirPods Pro: one state-driven stage). The section follows the office: by day (open, Austin time)
       the phone leads; by night (closed) the online booking leads and the next opening time is stated. A switch previews
       the other state.
   J — the receipt (Cash App Brand Guidelines: the receipt as the brand object). What the free inspection gets you, printed
       line by line, totalled at $0, with a tear-off stub to call or book. */
window.Cta5 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const ADDR = '7801 N Lamar Blvd Suite C70, Austin TX 78752', MAIL = 'info@austinprosiding.com';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const PH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
  const status = () => (window.Cta && Cta.status ? Cta.status() : { open: true, t: '' });

  /* ---------- I ---------- */
  const house = () => `<svg class="hs2" viewBox="0 0 600 220" aria-hidden="true"><path d="M0 220V150L60 110L120 150V220M140 220V120L250 50L360 120V220M380 220V140L470 85L560 140V220H600" class="sil"/>
    ${[[30, 165], [80, 165], [175, 140], [215, 140], [285, 140], [325, 140], [175, 180], [325, 180], [410, 160], [450, 160], [510, 160]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="22" height="26" rx="2" class="wn2" style="--i:${i}"/>`).join('')}
    <rect x="236" y="170" width="28" height="50" class="dr5"/></svg>`;
  const I = () => `<section class="sec ctI" id="booking" data-mode="day" aria-labelledby="ctI-h">
    <div class="sky" aria-hidden="true"><i class="orb"></i><i class="stars"></i></div>${house()}
    <div class="in4"><div class="sw2" role="radiogroup" aria-label="Show the page"><button type="button" role="radio" data-m="live" aria-checked="true">Right now</button><button type="button" role="radio" data-m="day" aria-checked="false" tabindex="-1">By day</button><button type="button" role="radio" data-m="night" aria-checked="false" tabindex="-1">By night</button></div>
      <p class="k2">We're in</p><h2 class="sec-h" id="ctI-h">Call us now.</h2>
      <div class="dy2">
        <a class="big2" href="tel:+15125500000">${PH}<span>(512) 550-0000</span></a>
        <p class="ln3">A person at the office answers. Or <a href="${BOOK}">book the free inspection online</a>.</p></div>
      <div class="nt" hidden>
        <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
        <p class="ln3"><span class="nx2"></span> Then call <a href="tel:+15125500000">(512) 550-0000</a>.</p></div>
      <p class="ft3"><span class="st3" aria-live="polite"></span> Mon–Fri 8–8 · Sat 8–6 · Sun 12–5 · ${ADDR} · <a href="mailto:${MAIL}">${MAIL}</a></p></div></section>`;

  function wireI(root) {
    const s = root.querySelector('.ctI'); if (!s) return; const bs = [...s.querySelectorAll('.sw2 button')], st = s.querySelector('.st3'), nx = s.querySelector('.nx2');
    let pick = 'live';
    const apply = () => { const ss = status(); st.textContent = ss.t; st.classList.toggle('open', !!ss.open);
      nx.textContent = ss.open ? 'Our next opening is in the hours below.' : ss.t.replace('Closed now. ', '').replace(/^Opens/, 'We open') + '.';
      const m = pick === 'live' ? (ss.open ? 'day' : 'night') : pick; s.dataset.mode = m;
      s.querySelector('.dy2').toggleAttribute('hidden', m !== 'day'); s.querySelector('.nt').toggleAttribute('hidden', m !== 'night');
      s.querySelector('.k2').textContent = m === 'day' ? 'We’re in' : 'We’re out'; s.querySelector('#ctI-h').textContent = m === 'day' ? 'Call us now.' : 'Book online tonight.'; };
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); pick = bs[i].dataset.m; apply(); };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); });
    apply(); setInterval(apply, 60000);
  }

  /* ---------- J ---------- */
  const LINES = [['h', 'Austin Pro', 'Siding, Windows & Roofing'], ['s', ADDR], ['s', '(512) 550-0000 · ' + MAIL], ['r'],
    ['i', 'Free inspection', '$0'], ['i', 'One visit, every trade', 'included'], ['i', 'Itemised proposal', 'after the visit'], ['i', 'Workmanship warranty', 'lifetime, labor'], ['i', 'James Hardie warranty', '30-year non-prorated'], ['r'],
    ['t', 'To find out', '$0'], ['r'], ['s', 'Rated 4.9 from 474 Google reviews'], ['s', 'Mon–Fri 8–8 · Sat 8–6 · Sun 12–5'], ['s', 'Thank you. Since 2009.']];
  const line = ([k, a, b], i) => k === 'r' ? `<li class="rl2" style="--i:${i}" aria-hidden="true"></li>` : k === 'h' ? `<li class="lh2" style="--i:${i}"><b>${a}</b><small>${b}</small></li>` : k === 's' ? `<li class="ls" style="--i:${i}">${a}</li>`
    : `<li class="${k === 't' ? 'lt2' : 'li2'}" style="--i:${i}"><span>${a}</span><i aria-hidden="true"></i><b>${b}</b></li>`;
  const J = () => `<section class="sec ctJ" id="booking" aria-labelledby="ctJ-h">
    <div class="hd"><h2 class="sec-h" id="ctJ-h" data-split>Here is your receipt.</h2><p class="sec-p">Everything the free inspection gets you, before you spend a cent.</p></div>
    <div class="pr"><div class="slot2" aria-hidden="true"></div>
      <div class="rc"><ol class="rcl">${LINES.map(line).join('')}</ol>
        <div class="stub"><p>Tear here and</p><div class="two2"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a><a class="cl3" href="tel:+15125500000">${PH}<span>(512) 550-0000</span></a></div></div></div></div>
    <button type="button" class="rp">Print it again</button></section>`;

  function wireJ(root) {
    const s = root.querySelector('.ctJ'); if (!s) return;
    const go = () => { s.classList.remove('pr2'); void s.offsetWidth; s.classList.add('pr2'); };
    if (RM) s.classList.add('pr2'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); go(); } }), { threshold: 0.25 }).observe(s.querySelector('.pr'));
    s.querySelector('.rp').addEventListener('click', go);
  }
  return { I, J, wire(root) { wireI(root); wireJ(root); } };
})();
