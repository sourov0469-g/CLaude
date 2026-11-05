/* ROOFING PAGE · 5 Book the roof inspection (the page's close). Locks verbatim: (512) 550-0000 · info@austinprosiding.com ·
   7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5 · GAF Master Elite. Nothing is sent or saved.
   A — shingle tabs (Cowboy: the trade's own shapes). The three ways to book as one course of shingle tabs.
   B — the inspection card (Scout Motors: a plain printed card). "Free roof inspection" on a card with the GAF Master Elite
       line and the four contact lines.
   C — this week (Cash App Brand Guidelines: one compact row). The week's hours as seven pills, today marked, with the
       open-now line and the two actions. */
window.PRf5 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const st = () => (window.Cta && Cta.status ? Cta.status() : { open: false, t: '' });
  const foot = () => `<p class="cf">${L().hours} · ${L().addr} · <a href="mailto:${L().mail}">${L().mail}</a></p>`;

  const A = () => `<section class="sec rf5A" id="roofing-book" aria-labelledby="rf5A-h">
    <h2 class="sec-h" id="rf5A-h" data-split>Book the roof inspection.</h2><p class="sec-p">Free, from a GAF Master Elite contractor, and one visit covers every trade on the house.</p>
    <ul class="tabs3"><li><a href="tel:+15125500000"><small>Call</small><b>${L().phone}</b></a></li><li class="k"><a href="${B().BOOK}"><small>Book online</small><b>Any time</b></a></li><li><a href="mailto:${L().mail}"><small>Email</small><b>Write to us</b></a></li></ul>${foot()}</section>`;

  const Bv = () => `<section class="sec rf5B" id="roofing-book" aria-labelledby="rf5B-h">
    <div class="pcard"><div class="top"><p class="pkick">Austin Pro · Roofing</p><h2 class="sec-h" id="rf5B-h">Free roof inspection.</h2><p class="gaf">GAF Master Elite contractor</p></div>
      <dl class="lines"><div><dt>Call</dt><dd><a href="tel:+15125500000">${L().phone}</a></dd></div><div><dt>Hours</dt><dd>${L().hours}</dd></div><div><dt>Email</dt><dd><a href="mailto:${L().mail}">${L().mail}</a></dd></div><div><dt>Office</dt><dd>${L().addr}</dd></div></dl>
      <div class="pacts">${B().book()}</div></div></section>`;

  const WEEK = [[1, 'Mon', '8–8'], [2, 'Tue', '8–8'], [3, 'Wed', '8–8'], [4, 'Thu', '8–8'], [5, 'Fri', '8–8'], [6, 'Sat', '8–6'], [0, 'Sun', '12–5']];
  const C = () => `<section class="sec rf5C" id="roofing-book" aria-labelledby="rf5C-h">
    <div class="hd"><h2 class="sec-h" id="rf5C-h" data-split>Book the roof inspection.</h2><p class="stt3" aria-live="polite"></p></div>
    <ol class="wk3" aria-label="Hours">${WEEK.map(([d, n, h]) => `<li data-d="${d}"><b>${n}</b><span>${h}</span></li>`).join('')}</ol>
    <div class="pacts">${B().book()}${B().call()}</div>${foot()}</section>`;

  function wireC(root) { const s = root.querySelector('.rf5C'); if (!s) return; const e = s.querySelector('.stt3');
    const u = () => { const x = st(); e.textContent = x.t; e.classList.toggle('open', !!x.open);
      const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short' }).format(new Date()));
      s.querySelectorAll('.wk3 li').forEach((li) => { const on = +li.dataset.d === wd; li.classList.toggle('today', on); if (on) li.setAttribute('aria-current', 'date'); else li.removeAttribute('aria-current'); }); };
    u(); setInterval(u, 60000); }
  return { A, B: Bv, C, wire(root) { wireC(root); } };
})();
