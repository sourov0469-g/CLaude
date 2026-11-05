/* SIDING PAGE · 6 Book the siding inspection (the page's close). Locks verbatim: (512) 550-0000 · info@austinprosiding.com
   · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5. Inspection copy from the homepage: a
   project manager walks every side of the house (siding, trim, windows, roof and gutters); one visit covers every trade.
   Nothing here is sent or saved.
   A — phone first (Dropbox Brand: one number, big). The number set huge, the booking button beside it.
   B — what the inspection covers (Cowboy: a warm checklist card). The five things the project manager walks, as a card
       you can tick through; then book.
   C — the status band (Cash App Brand Guidelines: one bold band). A full-width green band: open or closed right now, phone,
       booking, hours, address and email in one row. */
window.PSd6 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const st = () => (window.Cta && Cta.status ? Cta.status() : { open: false, t: '' });
  const contact = () => `<p class="ctl2">${L().hours} · ${L().addr} · <a href="mailto:${L().mail}">${L().mail}</a></p>`;

  /* ---------- A ---------- */
  const A = () => `<section class="sec sd6A" id="siding-book" aria-labelledby="sd6A-h">
    <h2 class="sec-h" id="sd6A-h" data-split>Book the siding inspection.</h2>
    <a class="bign" href="tel:+15125500000">${B().PH}<span>(512) 550-0000</span></a>
    <div class="row3"><p>Free, and one visit covers every trade on the house. Or book online any time.</p>${B().book()}</div>${contact()}</section>`;

  /* ---------- B ---------- */
  const COV = ['Siding', 'Trim', 'Windows', 'Roof', 'Gutters'];
  const Bv = () => `<section class="sec sd6B" id="siding-book" aria-labelledby="sd6B-h">
    <div class="wrap"><div class="txt"><h2 class="sec-h" id="sd6B-h" data-split>One visit, every side of the house.</h2>
        <p class="sec-p">The free inspection: a project manager walks every side of the house. One visit covers every trade.</p><div class="pacts">${B().book()}${B().call()}</div>${contact()}</div>
      <div class="card5"><p class="pkick">The inspection walks</p><ul>${COV.map((c) => `<li><button type="button" role="checkbox" aria-checked="false"><i aria-hidden="true"></i>${c}</button></li>`).join('')}</ul><p class="sm3">Tick them off as you read. Nothing here is saved or sent.</p></div></div></section>`;

  /* ---------- C ---------- */
  const C = () => `<section class="sec sd6C" id="siding-book" aria-labelledby="sd6C-h">
    <div class="band2"><div class="b1"><p class="stt" aria-live="polite"></p><h2 class="sec-h" id="sd6C-h">Book the siding inspection.</h2></div>
      <div class="b2"><a class="nb" href="tel:+15125500000">${B().PH}<span>(512) 550-0000</span></a>${B().book('Book online')}</div>
      <dl class="b3"><div><dt>Hours</dt><dd>${L().hours}</dd></div><div><dt>Office</dt><dd>${L().addr}</dd></div><div><dt>Email</dt><dd><a href="mailto:${L().mail}">${L().mail}</a></dd></div></dl></div></section>`;

  function wireB(root) { const s = root.querySelector('.sd6B'); if (!s) return; s.querySelectorAll('[role=checkbox]').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'))); }
  function wireC(root) { const s = root.querySelector('.sd6C'); if (!s) return; const e = s.querySelector('.stt'); const u = () => { const x = st(); e.textContent = x.t; e.classList.toggle('open', !!x.open); }; u(); setInterval(u, 60000); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
