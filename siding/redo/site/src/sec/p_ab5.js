/* ABOUT PAGE · 5 Book (the page's close). Locks verbatim: (512) 550-0000 · info@austinprosiding.com · 7801 N Lamar Blvd
   Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5 · since 2009. Nothing is sent or saved.
   A — come say hello (Cowboy: a real place). The office address set large, with directions, hours and the two actions.
   B — since 2009, on the phone (Dropbox Brand: one line). "Since 2009" and the number, nothing else but the hours and book.
   C — the business card (Scout Motors: a printed object). A business card; turn it over for the other side. */
window.PAb5 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const MAPS = () => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(L().addr);

  const A = () => `<section class="sec ab5A" id="about-book" aria-labelledby="ab5A-h">
    <p class="pkick">Come say hello</p><h2 class="sec-h" id="ab5A-h">7801 N Lamar Blvd, Suite C70.</h2><p class="cty">Austin TX 78752 · <a href="${MAPS()}" target="_blank" rel="noopener">Directions</a></p>
    <p class="hrs3">${L().hours}</p><div class="pacts">${B().book()}${B().call()}</div><p class="ml"><a href="mailto:${L().mail}">${L().mail}</a></p></section>`;

  const Bv = () => `<section class="sec ab5B" id="about-book" aria-labelledby="ab5B-h">
    <p class="pkick">Since 2009</p><h2 class="vh11" id="ab5B-h">Call Austin Pro</h2><a class="ph5" href="tel:+15125500000">${L().phone}</a>
    <p class="hrs3">${L().hours}. Or book the free inspection online, any time.</p><div class="pacts">${B().book()}</div><p class="ml">${L().addr} · <a href="mailto:${L().mail}">${L().mail}</a></p></section>`;

  const C = () => `<section class="sec ab5C" id="about-book" aria-labelledby="ab5C-h">
    <h2 class="sec-h" id="ab5C-h" data-split>Take our card.</h2>
    <div class="cw"><button type="button" class="bc" aria-pressed="false" aria-label="Business card. Turn over.">
      <span class="f6 fr6"><b>AUSTIN PRO</b><small>Siding, Windows &amp; Roofing</small><em>Since 2009</em></span>
      <span class="f6 bk6"><span>${L().phone}</span><span>${L().mail}</span><span>${L().addr}</span><span>${L().hours}</span></span></button></div>
    <p class="hint2">Turn the card over. Or call <a href="tel:+15125500000">${L().phone}</a>.</p><div class="pacts">${B().book()}</div></section>`;

  function wireC(root) { const s = root.querySelector('.ab5C'); if (!s) return; const b = s.querySelector('.bc');
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? `Business card, back: ${L().phone}, ${L().mail}, ${L().addr}, ${L().hours}. Turn over.` : 'Business card. Turn over.'); }); }
  return { A, B: Bv, C, wire(root) { wireC(root); } };
})();
