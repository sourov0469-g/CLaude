/* CONTACT PAGE · 2 The office. Locks verbatim: 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6,
   Sun 12–5 · (512) 550-0000. No drawn map: directions are a Google Maps search for the locked address. Nothing about
   parking, the building or the neighbourhood is stated, because none of it is documented.
   A — today at the office (Cash App Brand Guidelines: one live number). Today's hours set large in Austin time, the
       open/closed line, then the whole week with today marked.
   B — the door plate (Scout Motors: a plain made object). "Suite C70" set as a plate; the address, hours and two links
       beneath it.
   C — three things for your phone (Dropbox Brand: steps as type). 1 copy the address, 2 open it in Maps, 3 call ahead. */
window.PCt2 = (function () {
  const B = () => window.PB;
  const L = () => B().LOCK;
  const st = () => (window.Cta && Cta.status ? Cta.status() : { open: false, t: '' });
  const MAPS = () => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(L().addr);
  // the locked hours, one row per day (Sun first, as Date.getDay)
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const HRS = ['12\u00a0pm – 5\u00a0pm', '8\u00a0am – 8\u00a0pm', '8\u00a0am – 8\u00a0pm', '8\u00a0am – 8\u00a0pm', '8\u00a0am – 8\u00a0pm', '8\u00a0am – 8\u00a0pm', '8\u00a0am – 6\u00a0pm'];
  const today = () => { const w = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'long' }).format(new Date()); return Math.max(0, DAYS.indexOf(w)); };
  const dirs = (cls = 'btn key') => `<a class="${cls}" href="${MAPS()}" target="_blank" rel="noopener">Directions in Google Maps<span class="tab">${B().CAL}</span></a>`;

  const order = [1, 2, 3, 4, 5, 6, 0];
  const A = () => `<section class="sec ct2A" id="office" aria-labelledby="ct2A-h">
    <div class="tdy"><p class="pkick">The office · Austin time</p><h2 class="sec-h" id="ct2A-h"><span class="dn">Opening hours</span></h2><p class="hr9">${L().hours}</p><p class="stt6" aria-live="polite"></p>
      <p class="ad6"><a href="${MAPS()}" target="_blank" rel="noopener">${L().addr}</a></p><div class="pacts">${dirs()}${B().call()}</div></div>
    <ol class="wk6" aria-label="Opening hours by day">${order.map((d) => `<li data-d="${d}"><span>${DAYS[d]}</span><b>${HRS[d]}</b></li>`).join('')}</ol></section>`;

  const Bv = () => `<section class="sec ct2B" id="office" aria-labelledby="ct2B-h">
    <div class="plt" aria-hidden="true"><small>Suite</small><b>C70</b><span>Austin Pro Siding, Windows &amp; Roofing</span></div>
    <div class="pt6"><p class="pkick">The office</p><h2 class="sec-h" id="ct2B-h">Suite C70, 7801 N Lamar Blvd.</h2>
      <dl class="of6"><div><dt>Address</dt><dd>${L().addr}</dd></div><div><dt>Hours</dt><dd>${L().hours}</dd></div><div><dt>Phone</dt><dd><a href="tel:+15125500000">${L().phone}</a></dd></div></dl>
      <div class="pacts">${dirs()}</div></div></section>`;

  const C = () => `<section class="sec ct2C" id="office" aria-labelledby="ct2C-h">
    <p class="pkick">The office</p><h2 class="sec-h" id="ct2C-h" data-split>Three things for your phone.</h2>
    <ol class="th6">
      <li><i>1</i><div><h3>Copy the address</h3><p class="cp6" id="ct2C-ad">${L().addr}</p><button type="button" class="btn light cpy" hidden>Copy address</button><p class="cpm" role="status"></p></div></li>
      <li><i>2</i><div><h3>Open it in Maps</h3><p>Google Maps finds the suite from the address and gives you the route.</p>${dirs('btn light')}</div></li>
      <li><i>3</i><div><h3>Call ahead</h3><p>${L().hours}.</p>${B().call()}</div></li>
    </ol></section>`;

  function wireA(root) { const s = root.querySelector('.ct2A'); if (!s) return; const t = today(), e = s.querySelector('.stt6');
    s.querySelector('.dn').innerHTML = `${DAYS[t]}: <br>${HRS[t]}`; s.querySelector('.hr9').textContent = 'Every week: ' + L().hours;
    s.querySelectorAll('.wk6 li').forEach((li) => { const on = +li.dataset.d === t; li.classList.toggle('on', on); if (on) li.setAttribute('aria-current', 'date'); });
    const u = () => { const x = st(); e.textContent = x.t; e.classList.toggle('open', !!x.open); }; u(); setInterval(u, 60000); }
  function wireC(root) { const s = root.querySelector('.ct2C'); if (!s) return; const b = s.querySelector('.cpy'), m = s.querySelector('.cpm');
    if (!(navigator.clipboard && navigator.clipboard.writeText)) return; b.hidden = false;
    b.addEventListener('click', () => navigator.clipboard.writeText(L().addr).then(() => { m.textContent = 'Address copied to your clipboard.'; }, () => { m.textContent = 'Could not copy. Press and hold the address to copy it.'; })); }
  return { A, B: Bv, C, wire(root) { wireA(root); wireC(root); } };
})();
