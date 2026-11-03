/* SERVICE AREA PAGE · 5 Book (the page's close). Locks verbatim; the six towns with the most documented work, from the
   records. No claim about where the firm will or will not go: "not sure? call and ask". Nothing is sent or saved.
   A — not sure? ask (Erie Home, note only: the plain answer). One plain question and its answer: call and ask.
   B — we've worked in… (Cowboy: warm, local). A green panel naming the six towns with the most documented work, then book.
   C — two lines (Dropbox Brand: the shortest close). Call, or book online; the address strip under them. */
window.PSa5 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const top6 = () => ((window.__NEAR || {}).towns || []).filter((t) => t[1] > 0).slice(0, 6).map((t) => t[0]);
  const foot = () => `<p class="cf4">${L().hours} · ${L().addr} · <a href="mailto:${L().mail}">${L().mail}</a></p>`;

  const A = () => `<section class="sec sa5A" id="area-book" aria-labelledby="sa5A-h">
    <h2 class="sec-h" id="sa5A-h" data-split>Not sure we come to your street?</h2><p class="ans3">Call <a href="tel:+15125500000">${L().phone}</a> and ask. Or book the free inspection online and tell us where you are.</p>
    <div class="pacts">${B().book()}${B().call()}</div>${foot()}</section>`;

  const Bv = () => `<section class="sec sa5B" id="area-book" aria-labelledby="sa5B-h">
    <div class="gp2"><p class="pkick">We have documented work in</p><p class="tw5">${top6().map((t) => B().esc(t)).join(' · ')}</p><p class="and">and the towns around them.</p>
      <h2 class="sec-h" id="sa5B-h">Book the free inspection.</h2><div class="pacts">${B().book()}${B().call('pcall lt2')}</div>${foot()}</div></section>`;

  const C = () => `<section class="sec sa5C" id="area-book" aria-labelledby="sa5C-h">
    <h2 class="vh12" id="sa5C-h">Book a free inspection</h2>
    <a class="l8" href="tel:+15125500000"><small>Call</small><span>${L().phone}</span></a><a class="l8 b8" href="${B().BOOK}"><small>Or book online</small><span>Free inspection</span></a>
    <p class="strip2">${L().addr} · ${L().hours} · <a href="mailto:${L().mail}">${L().mail}</a></p></section>`;

  return { A, B: Bv, C, wire() {} };
})();
