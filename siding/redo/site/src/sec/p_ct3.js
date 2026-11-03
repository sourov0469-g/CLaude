/* CONTACT PAGE · 3 Book the inspection (the page's close). Booking happens on the firm's own scheduling page or by
   phone; this page has no form, so nothing here can say a message was sent or saved. The words about the inspection are
   the homepage's own: a project manager walks every side of the house (siding, trim, windows, roof and gutters); one visit
   covers every trade; then a detailed proposal, an itemised price for the work you want, nothing else.
   A — one big button (Dropbox Brand: one action, set huge). The whole green slab is the link to the booking page.
   B — online or by phone (Cash App Brand Guidelines: two equal choices). Two halves; the phone half carries the live
       open/closed line.
   C — what booking gets you (Erie Home, note only: plain steps). Three numbered stops from booking to the proposal. */
window.PCt3 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const st = () => (window.Cta && Cta.status ? Cta.status() : { open: false, t: '' });
  const ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const NOTE = '<p class="nt7">Booking happens on our scheduling page or by phone. Nothing is sent from this page.</p>';

  const A = () => `<section class="sec ct3A" id="contact-book" aria-labelledby="ct3A-h">
    <a class="slab" href="${B().BOOK}"><span class="sk">Free inspection</span><span class="sh" id="ct3A-h" role="heading" aria-level="2">Book it online.</span><span class="ss">One visit covers every trade on the house.</span><i class="go">${ARR}</i></a>
    <p class="or7">Rather talk? Call <a href="tel:+15125500000">${L().phone}</a> · ${L().hours}</p>${NOTE}</section>`;

  const Bv = () => `<section class="sec ct3B" id="contact-book" aria-labelledby="ct3B-h">
    <h2 class="sec-h" id="ct3B-h">Book the free inspection, your way.</h2>
    <div class="hv7"><div class="h1x"><p class="pkick">Online</p><p class="big">Any time, day or night.</p><p>Pick a time on our scheduling page.</p>${B().book('Open the booking page')}</div>
      <div class="h2x"><p class="pkick">By phone</p><p class="big"><a href="tel:+15125500000">${L().phone}</a></p><p class="stt7" aria-live="polite">${L().hours}</p>${B().call('pcall lt7')}</div></div>
    ${NOTE}</section>`;

  const STOPS = [['You book', 'Online any time, or call during opening hours.'], ['A project manager comes out', 'They walk every side of the house (siding, trim, windows, roof and gutters). One visit covers every trade.'], ['A detailed proposal', 'An itemised price for the work you want, nothing else.']];
  const C = () => `<section class="sec ct3C" id="contact-book" aria-labelledby="ct3C-h">
    <p class="pkick">Book the inspection</p><h2 class="sec-h" id="ct3C-h" data-split>What booking gets you.</h2>
    <ol class="sp7">${STOPS.map(([h, p], i) => `<li><span class="n7">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
    <div class="pacts">${B().book()}${B().call()}</div>${NOTE}</section>`;

  function wireB(root) { const s = root.querySelector('.ct3B'); if (!s) return; const e = s.querySelector('.stt7'); const u = () => { const x = st(); if (x.t) { e.textContent = x.t; e.classList.toggle('open', !!x.open); } }; u(); setInterval(u, 60000); }
  return { A, B: Bv, C, wire(root) { wireB(root); } };
})();
