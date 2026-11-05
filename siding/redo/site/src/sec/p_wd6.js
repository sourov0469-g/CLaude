/* WINDOWS & DOORS PAGE · 6 Book the window inspection (the page's close). Locks verbatim: (512) 550-0000 ·
   info@austinprosiding.com · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5. Nothing here is
   sent or saved.
   A — on the tape (Scout Motors: honest tools). The contact lines printed along a tape measure that pulls out on arrival.
   B — in the window (Apple AirPods Pro: one object). The close set in a drawn double-hung window: the phone in the upper
       sash, booking in the lower.
   C — the contact sheet (Cash App Brand Guidelines: one tidy grid). Four tiles, phone, book, email, visit, each with
       its one action, and the open-now line. */
window.PWd6 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const st = () => (window.Cta && Cta.status ? Cta.status() : { open: false, t: '' });

  const A = () => `<section class="sec wd6A" id="windows-book" aria-labelledby="wd6A-h">
    <h2 class="sec-h" id="wd6A-h" data-split>Book the window inspection.</h2><p class="sec-p">Every opening gets measured. The visit is free, and it covers doors and every other trade on the house.</p>
    <div class="tape"><span class="case" aria-hidden="true"></span><div class="bl3"><a href="tel:+15125500000">${L().phone}</a><span>${L().hours}</span><a href="mailto:${L().mail}">${L().mail}</a><span>${L().addr}</span></div></div>
    <div class="pacts">${B().book()}${B().call()}</div></section>`;

  const Bv = () => `<section class="sec wd6B" id="windows-book" aria-labelledby="wd6B-h">
    <div class="dh"><div class="us"><p class="pkick">Call</p><a class="ph4" href="tel:+15125500000">${B().PH}<span>${L().phone}</span></a><p>${L().hours}</p></div>
      <div class="ls2"><h2 class="sec-h" id="wd6B-h">Book the window inspection.</h2>${B().book('Book online')}<p>${L().addr} · <a href="mailto:${L().mail}">${L().mail}</a></p></div></div></section>`;

  const C = () => `<section class="sec wd6C" id="windows-book" aria-labelledby="wd6C-h">
    <div class="hd"><h2 class="sec-h" id="wd6C-h" data-split>Book the window inspection.</h2><p class="stt2" aria-live="polite"></p></div>
    <ul class="tiles">
      <li><a href="tel:+15125500000"><small>Call</small><b>${L().phone}</b><span>${L().hours}</span></a></li>
      <li class="k"><a href="${B().BOOK}"><small>Book online</small><b>Free inspection</b><span>Any time</span></a></li>
      <li><a href="mailto:${L().mail}"><small>Email</small><b class="em3">info@<wbr>austinprosiding.com</b><span>Photos of the windows help</span></a></li>
      <li><a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(L().addr)}" target="_blank" rel="noopener"><small>Visit</small><b>Suite C70</b><span>${L().addr}</span></a></li></ul></section>`;

  function wireA(root) { const s = root.querySelector('.wd6A'); if (!s) return; if (matchMedia('(prefers-reduced-motion: reduce)').matches) { s.classList.add('out'); return; }
    new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('out'); } }), { threshold: 0.4 }).observe(s.querySelector('.tape')); }
  function wireC(root) { const s = root.querySelector('.wd6C'); if (!s) return; const e = s.querySelector('.stt2'); const u = () => { const x = st(); e.textContent = x.t; e.classList.toggle('open', !!x.open); }; u(); setInterval(u, 60000); }
  return { A, B: Bv, C, wire(root) { wireA(root); wireC(root); } };
})();
