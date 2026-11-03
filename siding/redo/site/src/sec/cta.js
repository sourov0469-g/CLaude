/* CTA + FOOTER (sheet: the booking panel as a designed object, plus the stacked-course footer). Locks verbatim:
   (512) 550-0000 · info@austinprosiding.com · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5.
   Nothing on this page is sent or saved: booking finishes on the firm's own scheduling page or by phone. */
window.Cta = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const I = { cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>',
    ph: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    tick: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>' };
  const HOURS = [[1, 5, 8, 20, 'Mon–Fri 8–8'], [6, 6, 8, 18, 'Sat 8–6'], [0, 0, 12, 17, 'Sun 12–5']];
  const TRADES = ['Siding', 'Windows', 'Shingle roofing', 'Metal roofing', 'Gutters', 'Exterior painting', 'Exterior doors', 'Garage doors', 'Patio covers'];
  // open or closed right now, in Austin time
  function status() { const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(f.find((p) => p.type === 'weekday').value), h = +f.find((p) => p.type === 'hour').value % 24 + +f.find((p) => p.type === 'minute').value / 60;
    const row = HOURS.find((r) => wd >= r[0] && wd <= r[1]); const fmt = (x) => (x > 12 ? x - 12 + ' pm' : x === 12 ? '12 pm' : x + ' am');
    return h >= row[2] && h < row[3] ? { open: true, t: `Open now, until ${fmt(row[3])} Austin time` } : { open: false, t: `Closed now. ${h < row[2] ? `Opens ${fmt(row[2])} today` : 'Opens tomorrow'} (Austin time)` }; }

  const A = () => `<section class="sec ctA" id="booking" aria-labelledby="ctA-h"><div class="txt"><h2 class="sec-h" id="ctA-h">Write up your work order.</h2>
      <p class="sec-p">Tick what the house needs and when suits you. Then book the free inspection online or call; one visit covers every trade.</p>
      <p class="st" aria-live="polite"></p></div>
    <div class="pad" data-solid><div class="padhd"><b>Work order</b><span>Austin Pro · free inspection</span></div>
      <fieldset><legend>What needs doing?</legend><div class="tk">${TRADES.map((t) => `<label><input type="checkbox" value="${t}"><i>${I.tick}</i>${t}</label>`).join('')}</div></fieldset>
      <fieldset><legend>When suits you?</legend><div class="dy">${HOURS.map((r) => `<label><input type="radio" name="ctA-d" value="${r[4]}"><span>${r[4]}</span></label>`).join('')}</div></fieldset>
      <p class="sum" aria-live="polite">Nothing ticked yet.</p>
      <div class="acts"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${I.cal}</span></a><a class="btn light" href="tel:+15125500000">${I.ph}(512) 550-0000</a></div>
      <p class="note">Nothing is sent from this page. Mention your list when you book or call.</p></div></section>`;
  function wireA(root) { const s = root.querySelector('.ctA'); if (!s) return; const sum = s.querySelector('.sum');
    const upd = () => { const t = [...s.querySelectorAll('.tk input:checked')].map((x) => x.value), d = s.querySelector('.dy input:checked');
      sum.innerHTML = t.length || d ? `<b>Your list:</b> ${t.length ? t.join(', ') : 'any trade'}${d ? ` · ${d.value}` : ''}` : 'Nothing ticked yet.'; s.classList.toggle('filled', t.length > 0); };
    s.addEventListener('change', upd);
    // a trade chip anywhere on the page ticks that trade on the work order
    document.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a[data-trade]'); if (!a) return; const box = s.querySelector(`.tk input[value="${a.dataset.trade}"]`); if (box && !box.checked) { box.checked = true; upd(); } });
    s.querySelector('.st').textContent = status().t; s.querySelector('.st').classList.toggle('open', status().open); }

  const B = () => `<section class="sec ctB" id="booking" aria-labelledby="ctB-h"><div class="txt"><h2 class="sec-h" id="ctB-h">Schedule your free inspection.</h2>
      <p class="sec-p">One visit, every trade on the house. Press the board.</p></div>
    <div class="band" data-solid><i class="lb b1"></i><i class="lb b2"></i><i class="lb b3"></i><i class="lb b4"></i>
      <a class="press" href="${BOOK}" aria-label="Book a free inspection">${I.cal}<span>Book</span></a></div>
    <div class="info"><p class="st" aria-live="polite"></p><p class="hrs">${HOURS.map((r) => `<span>${r[4]}</span>`).join('')}</p><a class="callx" href="tel:+15125500000">${I.ph}(512) 550-0000</a></div></section>`;
  function wireB(root) { const s = root.querySelector('.ctB'); if (!s) return; const st = status(); const e = s.querySelector('.st'); e.textContent = st.t; e.classList.toggle('open', st.open);
    const band = s.querySelector('.band'), p = s.querySelector('.press');
    band.addEventListener('pointermove', (ev) => { if (RM || ev.pointerType !== 'mouse') return; const r = band.getBoundingClientRect(); band.style.setProperty('--x', ((ev.clientX - r.left) / r.width - 0.5).toFixed(3)); });
    band.addEventListener('pointerleave', () => band.style.setProperty('--x', 0));
    p.addEventListener('pointerdown', () => band.classList.add('down')); addEventListener('pointerup', () => band.classList.remove('down')); }

  // the stacked-course footer: board-and-batten columns standing on a sill; a small house at the end
  const FOOT = () => `<footer class="ft" aria-labelledby="ft-h"><h2 class="sr" id="ft-h">Austin Pro Siding, Windows &amp; Roofing</h2><div class="boards">
    <section class="bd"><h3>Contact</h3><a href="tel:+15125500000">(512) 550-0000</a><a class="em" href="mailto:info@austinprosiding.com">info@<wbr>austinprosiding.com</a><p>7801 N Lamar Blvd Suite C70<br>Austin TX 78752</p></section>
    <section class="bd"><h3>Hours</h3>${HOURS.map((r) => `<p>${r[4]}</p>`).join('')}<a class="bk" href="${BOOK}">Book a free inspection</a></section>
    <section class="bd"><h3>Services</h3><a href="#siding">Siding</a><a href="#windows">Windows</a><a href="#roofing">Roofing</a><a href="#process">How a job runs</a><a href="#try">Try the job</a></section>
    <section class="bd"><h3>Area</h3><a href="#area">On your street</a><p>Austin, Round Rock, Cedar Park, Leander, Pflugerville, Georgetown, Buda</p></section>
    <section class="bd"><h3>About</h3><p>Since 2009; merged with Sanders Roofing &amp; Exteriors in 2018.</p><a href="#reviews">4.9 from 474 Google reviews</a></section>
    <section class="bd cr"><h3>Credentials</h3><p>GAF Master Elite</p><p>James Hardie Elite Preferred</p><p>President's Club 2025</p><p>Andersen Certified Premier</p><p>BBB A+</p></section>
    <div class="hs" aria-hidden="true"><svg viewBox="0 0 120 110"><path d="M10 50L60 12L110 50V104H10Z" fill="#E9E2CF"/>${Array.from({ length: 6 }, (_, i) => `<path d="M10 ${56 + i * 8}H110" stroke="rgba(0,0,0,.14)" stroke-width="2"/>`).join('')}<path d="M2 54L60 8L118 54" fill="none" stroke="#0E3B2C" stroke-width="8" stroke-linejoin="round"/><rect x="50" y="70" width="20" height="34" fill="#0E3B2C"/><rect x="22" y="62" width="18" height="16" fill="#8FA7BA" stroke="#E0E0D8" stroke-width="3"/><rect x="80" y="62" width="18" height="16" fill="#8FA7BA" stroke="#E0E0D8" stroke-width="3"/></svg></div>
    </div><div class="sill"><span>© Austin Pro Siding, Windows &amp; Roofing</span><a href="#top">Back to top</a></div></footer>`;
  return { A, B, FOOT, status, wire(root) { wireA(root); wireB(root); } };
})();
