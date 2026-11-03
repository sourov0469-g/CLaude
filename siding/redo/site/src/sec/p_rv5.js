/* REVIEWS PAGE · 5 Book (the page's close). Locks verbatim: 4.9 from 474 Google reviews · (512) 550-0000 ·
   info@austinprosiding.com · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5. One verbatim
   line (build-checked). Nothing is sent or saved.
   A — your turn (Dropbox Brand: the shortest close). The rating, one line, the two actions.
   B — one more voice (Cowboy: a neighbour's words, then the door). A verbatim recommendation beside the booking card.
   C — the rating band (Cash App Brand Guidelines: one band, every fact). The rating, the open-now line and the four
       contact facts in one green band. */
window.PRv5 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const st = () => (window.Cta && Cta.status ? Cta.status() : { open: false, t: '' });
  const foot = () => `<p class="cf3">${L().hours} · ${L().addr} · <a href="mailto:${L().mail}">${L().mail}</a></p>`;

  const A = () => `<section class="sec rv5A" id="reviews-book" aria-labelledby="rv5A-h">
    <p class="r4">4.9 <span>from 474 Google reviews</span></p><h2 class="sec-h" id="rv5A-h" data-split>Your turn.</h2>
    <p class="sec-p">Book the free inspection. One visit covers every trade on the house.</p><div class="pacts">${B().book()}${B().call()}</div>${foot()}</section>`;

  const Bv = () => `<section class="sec rv5B" id="reviews-book" aria-labelledby="rv5B-h">
    <div class="wrap">${B().quote(24, 'I would highly recommend them to anybody looking for siding, windows or roofing!', 'pq2 bigq')}
      <div class="bk4"><h2 class="sec-h" id="rv5B-h">Book the free inspection.</h2><p>4.9 from 474 Google reviews.</p><div class="pacts">${B().book()}${B().call()}</div>${foot()}</div></div></section>`;

  const C = () => `<section class="sec rv5C" id="reviews-book" aria-labelledby="rv5C-h">
    <div class="band4"><div class="t1"><p class="r5">4.9</p><p class="r6">from 474 Google reviews</p></div>
      <div class="t2"><h2 class="sec-h" id="rv5C-h">Book the free inspection.</h2><p class="stt4" aria-live="polite"></p><div class="pacts">${B().book()}</div></div>
      <dl class="t3"><div><dt>Call</dt><dd><a href="tel:+15125500000">${L().phone}</a></dd></div><div><dt>Hours</dt><dd>${L().hours}</dd></div><div><dt>Email</dt><dd><a href="mailto:${L().mail}">info@<wbr>austinprosiding.com</a></dd></div><div><dt>Office</dt><dd>${L().addr}</dd></div></dl></div></section>`;

  function wireC(root) { const s = root.querySelector('.rv5C'); if (!s) return; const e = s.querySelector('.stt4'); const u = () => { const x = st(); e.textContent = x.t; e.classList.toggle('open', !!x.open); }; u(); setInterval(u, 60000); }
  return { A, B: Bv, C, wire(root) { wireC(root); } };
})();
