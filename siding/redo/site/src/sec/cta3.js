/* BOOKING E and F (overnight ladder, Round 29). Locks verbatim: (512) 550-0000 · info@austinprosiding.com ·
   7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5. Nothing here is sent or saved: booking
   finishes on the firm's own scheduling page or by phone.
   E — the week, at a glance (Cash App Brand Guidelines: one clear grid). The real hours as a weekly timetable, with a
       "now" line in Austin time; choose a day to see when to call that day.
   F — come by the office (Cowboy: warmth, a real place). The office as a felt letterboard in the lobby: name, suite,
       address, phone, email and hours, each line with its honest action (call, email, directions, copy). */
window.Cta3 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const PH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const call = '<a class="cl2" href="tel:+15125500000">' + PH + '<span>(512) 550-0000</span></a>';
  const ADDR = '7801 N Lamar Blvd Suite C70, Austin TX 78752', MAIL = 'info@austinprosiding.com';
  const status = () => (window.Cta && Cta.status ? Cta.status() : { open: false, t: '' });
  const now = () => { const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    return { wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(f.find((p) => p.type === 'weekday').value), h: (+f.find((p) => p.type === 'hour').value % 24) + +f.find((p) => p.type === 'minute').value / 60 }; };

  /* ---------- E ---------- */
  // [weekday index (Sun = 0), name, open, close]
  const DAYS = [[1, 'Monday', 8, 20], [2, 'Tuesday', 8, 20], [3, 'Wednesday', 8, 20], [4, 'Thursday', 8, 20], [5, 'Friday', 8, 20], [6, 'Saturday', 8, 18], [0, 'Sunday', 12, 17]];
  const H0 = 6, H1 = 22; const pct = (h) => (((h - H0) / (H1 - H0)) * 100).toFixed(2) + '%';
  const fmt = (x) => (x > 12 ? x - 12 + ' pm' : x === 12 ? '12 pm' : x + ' am');
  const E = () => `<section class="sec ctE" id="booking" aria-labelledby="ctE-h">
    <div class="hd"><h2 class="sec-h" id="ctE-h" data-split>The week, at a glance.</h2><p class="sec-p">When we answer the phone, every day. Booking online is open any time; the inspection is free and one visit covers every trade.</p></div>
    <div class="wrap"><div class="tt">
        <div class="hrs2" aria-hidden="true">${[8, 12, 16, 20].map((h) => `<span style="left:${pct(h)}">${fmt(h)}</span>`).join('')}</div>
        <ol class="dys">${DAYS.map(([w, n, a, b]) => `<li><button type="button" class="dy" data-w="${w}" aria-pressed="false"><span class="dn">${n.slice(0, 3)}<i>${n.slice(3)}</i></span>
          <span class="ln"><i class="op" style="left:${pct(a)};width:calc(${pct(b)} - ${pct(a)})"><b>${fmt(a)} – ${fmt(b)}</b></i><i class="nw" hidden></i></span></button></li>`).join('')}</ol>
        <p class="legend">Mon–Fri 8–8 · Sat 8–6 · Sun 12–5 · Austin time</p></div>
      <div class="side"><p class="st2" aria-live="polite"></p><div class="dd" aria-live="polite"></div>
        <div class="two">${call}${book}</div>
        <p class="adr">${ADDR}<br><a href="mailto:${MAIL}">${MAIL}</a></p></div></div></section>`;

  function wireE(root) {
    const s = root.querySelector('.ctE'); if (!s) return; const bs = [...s.querySelectorAll('.dy')], dd = s.querySelector('.dd'), st = s.querySelector('.st2');
    const show = (b) => { const d = DAYS.find((x) => x[0] === +b.dataset.w); bs.forEach((x) => x.setAttribute('aria-pressed', x === b));
      const n = now(), today = d[0] === n.wd; dd.innerHTML = `<h3>${d[1]}${today ? ' <small>today</small>' : ''}</h3><p>We answer ${fmt(d[2])} – ${fmt(d[3])}. Call <a href="tel:+15125500000">(512) 550-0000</a> then, or book online now and choose a time.</p>`; };
    const tick = () => { const n = now(), ss = status(); st.textContent = ss.t; st.classList.toggle('open', !!ss.open);
      bs.forEach((b) => { const w = +b.dataset.w, nw = b.querySelector('.nw'); b.classList.toggle('today', w === n.wd); nw.hidden = w !== n.wd || n.h < H0 || n.h > H1; nw.style.left = pct(Math.max(H0, Math.min(H1, n.h))); }); };
    bs.forEach((b) => b.addEventListener('click', () => show(b)));
    tick(); show(bs.find((b) => b.classList.contains('today')) || bs[0]); setInterval(tick, 60000);
  }

  /* ---------- F ---------- */
  const MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ADDR);
  const ROWS = [['Austin Pro', 'Siding, Windows & Roofing', ''], ['Suite C70', '7801 N Lamar Blvd, Austin TX 78752', 'addr'], ['(512) 550-0000', 'Call', 'tel'], ['info@<wbr>austinprosiding.com', 'Email', 'mail'], ['Mon–Fri 8–8', 'Sat 8–6 · Sun 12–5', '']];
  const F = () => `<section class="sec ctF" id="booking" aria-labelledby="ctF-h">
    <div class="hd"><h2 class="sec-h" id="ctF-h" data-split>Come by the office.</h2><p class="sec-p">Or let us come to you: the inspection is free, and one visit covers every trade.</p></div>
    <div class="wrap"><div class="lb"><div class="felt">
        ${ROWS.map(([a, b], i) => `<p class="row2" style="--i:${i}"><b>${a}</b><small>${b}</small></p>`).join('')}
        <p class="sm2">Since 2009 · merged with Sanders Roofing &amp; Exteriors in 2018</p></div><i class="frm" aria-hidden="true"></i></div>
      <div class="side"><ul class="acts2">
          <li><a class="ac" href="tel:+15125500000">${PH}<span><b>Call</b>(512) 550-0000</span></a></li>
          <li><a class="ac" href="mailto:${MAIL}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg><span><b>Email</b>${MAIL}</span></a></li>
          <li><a class="ac" href="${MAPS}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg><span><b>Directions</b>Opens Google Maps</span></a></li>
          <li><button type="button" class="ac cp"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg><span><b>Copy the address</b>${ADDR}</span></button></li></ul>
        <p class="cpm" aria-live="polite"></p><p class="st2" aria-live="polite"></p>${book}</div></div></section>`;

  function wireF(root) {
    const s = root.querySelector('.ctF'); if (!s) return; const m = s.querySelector('.cpm'), st = s.querySelector('.st2');
    const ss = status(); st.textContent = ss.t; st.classList.toggle('open', !!ss.open);
    s.querySelector('.cp').addEventListener('click', () => { const ok = () => (m.textContent = 'Address copied.'), no = () => (m.textContent = 'Could not copy here. The address is: ' + ADDR + '.');
      try { navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(ADDR).then(ok, no) : no(); } catch (e) { no(); } });
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('set'); } }), { threshold: 0.3 }).observe(s.querySelector('.lb'));
  }
  return { E, F, wire(root) { wireE(root); wireF(root); } };
})();
