/* OUR WORK PAGE · 5 Book (the page's close). Locks verbatim: (512) 550-0000 · info@austinprosiding.com · 7801 N Lamar Blvd
   Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5. Nothing is sent or saved; the blank record line in A is a
   drawing, not a form.
   A — your line on the list (Scout Motors: the honest record). The records' own format with one blank line left for
       the visitor's house, and the ways to book under it.
   B — one job, one invitation (Cowboy: a real house, warmly). One of the firm's job photos with the booking card set over it.
   C — two halves (Dropbox Brand: one split). Call on one half, book online on the other. */
window.POw5 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const foot = () => `<p class="cf2">${L().hours} · ${L().addr} · <a href="mailto:${L().mail}">${L().mail}</a></p>`;

  const A = () => `<section class="sec ow5A" id="work-book" aria-labelledby="ow5A-h">
    <h2 class="sec-h" id="ow5A-h" data-split>Your house, on the list.</h2>
    <div class="rec" aria-hidden="true"><p><span>Month</span><span>Neighbourhood, town</span><span>Work</span></p><p class="bl4"><span>—</span><span>Your street</span><span>The work you want</span></p></div>
    <p class="sec-p">Every job on our list started with one free inspection. One visit covers every trade on the house.</p>
    <div class="pacts">${B().book()}${B().call()}</div>${foot()}</section>`;

  const Bv = () => `<section class="sec ow5B" id="work-book" aria-labelledby="ow5B-h">
    <div class="bgp">${B().img(2)}</div>
    <div class="cardx"><p class="pkick">Free inspection</p><h2 class="sec-h" id="ow5B-h">Start your own job.</h2><p>${B().cap(2)}</p>
      <div class="pacts">${B().book()}${B().call()}</div>${foot()}</div></section>`;

  const C = () => `<section class="sec ow5C" id="work-book" aria-labelledby="ow5C-h">
    <h2 class="vh10" id="ow5C-h">Book a free inspection</h2>
    <div class="halves"><a class="hf1" href="tel:+15125500000"><small>Talk to us</small><b>${L().phone}</b><span>${L().hours}</span></a>
      <a class="hf2" href="${B().BOOK}"><small>Book online</small><b>Free inspection</b><span>Any time. One visit covers every trade.</span></a></div>${foot()}</section>`;

  return { A, B: Bv, C, wire() {} };
})();
