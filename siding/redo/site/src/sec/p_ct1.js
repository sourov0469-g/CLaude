/* CONTACT PAGE · 1 Ways to reach us (the page's one h1). Locks verbatim: (512) 550-0000 · info@austinprosiding.com ·
   7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5. Every action is a real link (tel:, mailto:,
   the booking page, Google Maps). There is no form here, so nothing can claim to have been sent or saved.
   A — four lines, set large (Dropbox Brand: type as the interface). Phone, email, address and hours as four big lines,
       each the link itself.
   B — the contact card (Scout Motors: a printed card). One card with the four facts and the open-now line.
   C — pick a way (Cash App Brand Guidelines: one choice at a time). Choose call, email, visit or book; the panel shows that
       one way and its link. */
window.PCt1 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const st = () => (window.Cta && Cta.status ? Cta.status() : { open: false, t: '' });
  const MAPS = () => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(L().addr);

  const A = () => `<section class="sec ct1A" id="contact-top" aria-labelledby="ct1A-h">
    <p class="pkick">Contact</p><h1 class="sec-h" id="ct1A-h" data-split>Reach Austin Pro.</h1>
    <ul class="big7"><li><small>Call</small><a href="tel:+15125500000">${L().phone}</a></li><li><small>Email</small><a class="em4" href="mailto:${L().mail}">info@<wbr>austinprosiding.com</a></li>
      <li><small>Visit</small><a href="${MAPS()}" target="_blank" rel="noopener">7801 N Lamar Blvd Suite C70, Austin TX 78752</a></li><li><small>Hours</small><span>${L().hours}</span></li></ul>
    <div class="pacts">${B().book()}</div></section>`;

  const Bv = () => `<section class="sec ct1B" id="contact-top" aria-labelledby="ct1B-h">
    <div class="ccard"><div class="cl4"><p class="pkick">Contact</p><h1 class="sec-h" id="ct1B-h">Austin Pro Siding, Windows &amp; Roofing</h1><p class="stt5" aria-live="polite"></p></div>
      <dl class="cr4"><div><dt>Phone</dt><dd><a href="tel:+15125500000">${L().phone}</a></dd></div><div><dt>Email</dt><dd><a href="mailto:${L().mail}">info@<wbr>austinprosiding.com</a></dd></div>
        <div><dt>Office</dt><dd><a href="${MAPS()}" target="_blank" rel="noopener">${L().addr}</a></dd></div><div><dt>Hours</dt><dd>${L().hours}</dd></div></dl>
      <div class="pacts">${B().book()}</div></div></section>`;

  const WAYS = [['call', 'Call'], ['mail', 'Email'], ['visit', 'Visit'], ['book', 'Book online']];
  const panel = (k) => k === 'call' ? `<p class="w1">${L().phone}</p><p>${L().hours}</p><a class="btn key" href="tel:+15125500000">Call now<span class="tab">${B().PH}</span></a>`
    : k === 'mail' ? `<p class="w1 em4">info@<wbr>austinprosiding.com</p><p>Write with your address and what the house needs.</p><a class="btn key" href="mailto:${L().mail}">Write an email<span class="tab">${B().CAL}</span></a>`
    : k === 'visit' ? `<p class="w1">7801 N Lamar Blvd, Suite C70</p><p>Austin TX 78752 · ${L().hours}</p><a class="btn key" href="${MAPS()}" target="_blank" rel="noopener">Directions<span class="tab">${B().CAL}</span></a>`
    : `<p class="w1">Free inspection</p><p>Online, any time. One visit covers every trade on the house.</p>${B().book()}`;
  const C = () => `<section class="sec ct1C" id="contact-top" aria-labelledby="ct1C-h">
    <p class="pkick">Contact</p><h1 class="sec-h" id="ct1C-h" data-split>How would you like to reach us?</h1>
    <div class="ways" role="radiogroup" aria-label="Way to reach us">${WAYS.map(([k, t], i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-k="${k}">${t}</button>`).join('')}</div>
    <div class="wp" aria-live="polite">${panel('call')}</div></section>`;

  function wireB(root) { const s = root.querySelector('.ct1B'); if (!s) return; const e = s.querySelector('.stt5'); const u = () => { const x = st(); e.textContent = x.t; e.classList.toggle('open', !!x.open); }; u(); setInterval(u, 60000); }
  function wireC(root) { const s = root.querySelector('.ct1C'); if (!s) return; const bs = [...s.querySelectorAll('.ways button')], wp = s.querySelector('.wp');
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); wp.innerHTML = panel(bs[i].dataset.k); };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); }); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
