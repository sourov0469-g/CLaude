/* BOOKING G and H (overnight ladder, Round 30). Locks verbatim: (512) 550-0000 · info@austinprosiding.com ·
   7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5. Nothing here is sent or saved.
   G — three doors (Graza: the custom-animation bar). Three ways in: call, book online, email. Each is a door; open it to
       see what really happens next, and go through.
   H — write us a postcard (Quiet Cubes: calm, tactile). A postcard addressed to the office. Write a note on it; the button
       opens the visitor's own email app with the note filled in. The page sends nothing and says so. */
window.Cta4 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const ADDR = '7801 N Lamar Blvd Suite C70, Austin TX 78752', MAIL = 'info@austinprosiding.com';
  const status = () => (window.Cta && Cta.status ? Cta.status() : { open: false, t: '' });
  const ICO = { call: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>', book: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>' };
  const ico = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICO[k]}</svg>`;

  /* ---------- G ---------- */
  const DOORS = [['call', 'Call us', 'A person at our office answers.', 'Mon–Fri 8–8, Sat 8–6, Sun 12–5.', 'tel:+15125500000', '(512) 550-0000'],
    ['book', 'Book online', 'Choose a time on our scheduling page. A project manager comes out for the free inspection.', 'One visit covers every trade.', BOOK, 'Book a free inspection'],
    ['mail', 'Email us', 'Write with your address and what the house needs.', 'Photos help.', 'mailto:' + MAIL, MAIL]];
  const G = () => `<section class="sec ctG" id="booking" aria-labelledby="ctG-h">
    <div class="hd"><h2 class="sec-h" id="ctG-h" data-split>Three ways in.</h2><p class="sec-p">Open a door to see what happens next. <span class="st2" aria-live="polite"></span></p></div>
    <ul class="drs">${DOORS.map(([k, t, a, b, href, lab], i) => `<li class="dw2" data-k="${k}" style="--i:${i}">
      <div class="in3" id="ctG-${k}" inert>${ico(k)}<h3>${t}</h3><p>${a}</p><p class="b2">${b}</p><a class="go" href="${href}"${k === 'book' ? '' : ''}>${lab}</a></div>
      <button type="button" class="door2" aria-expanded="false" aria-controls="ctG-${k}"><span class="pn"></span><span class="pn"></span><span class="lbl">${ico(k)}<b>${t}</b><small>Open</small></span><i class="kb"></i></button></li>`).join('')}</ul>
    <p class="adr2">${ADDR} · <a href="mailto:${MAIL}">${MAIL}</a> · <a href="tel:+15125500000">(512) 550-0000</a></p></section>`;

  function wireG(root) {
    const s = root.querySelector('.ctG'); if (!s) return; const ss = status(), st = s.querySelector('.st2'); st.textContent = ss.t; st.classList.toggle('open', !!ss.open);
    const ds = [...s.querySelectorAll('.dw2')];
    const set = (li, open) => { const b = li.querySelector('.door2'), inn = li.querySelector('.in3'); li.classList.toggle('op2', open); b.setAttribute('aria-expanded', open); b.querySelector('small').textContent = open ? 'Close' : 'Open'; inn.inert = !open; };
    ds.forEach((li) => { const b = li.querySelector('.door2');
      b.addEventListener('click', () => { const open = !li.classList.contains('op2'); ds.forEach((x) => x !== li && set(x, false)); set(li, open); if (open) setTimeout(() => li.querySelector('.go').focus({ preventScroll: true }), 450); });
      li.addEventListener('keydown', (e) => { if (e.key === 'Escape' && li.classList.contains('op2')) { set(li, false); b.focus(); } }); });
  }

  /* ---------- H ---------- */
  const TOPICS = ['Siding', 'Windows', 'Roofing', 'Gutters', 'Painting', 'Doors'];
  const H = () => `<section class="sec ctH" id="booking" aria-labelledby="ctH-h">
    <div class="hd"><h2 class="sec-h" id="ctH-h" data-split>Write us a postcard.</h2><p class="sec-p">A few lines about the house. The button opens your own email app with the note filled in; nothing is sent from this page.</p></div>
    <div class="pcd" data-solid><div class="lf"><p class="ttl">About my house</p>
        <div class="tps" role="group" aria-label="It is about">${TOPICS.map((t) => `<button type="button" class="tp2" aria-pressed="false">${t}</button>`).join('')}</div>
        <label class="vh3" for="ctH-m">Your note</label><textarea id="ctH-m" rows="6" maxlength="900" placeholder="Hello, the siding on the north side is soft near the ground, and two windows fog up in winter…"></textarea>
        <label class="ln2"><span>Street and town</span><input type="text" autocomplete="street-address" placeholder="So the inspection can be planned"></label></div>
      <div class="rt2"><div class="stp3" aria-hidden="true"><b>AP</b><small>Austin</small></div><i class="pm" aria-hidden="true"></i>
        <div class="to"><p>To</p><p class="tl2">Austin Pro</p><p>${ADDR.replace(', ', '<br>')}</p><p class="em2"><a href="mailto:${MAIL}">${MAIL}</a></p></div></div></div>
    <div class="ft2"><a class="btn key snd" href="mailto:${MAIL}">Open in my email app<span class="tab">${ico('mail')}</span></a><p class="hnt" aria-live="polite">Opens your email app. Nothing is sent until you send it there.</p></div>
    <p class="alt">Rather talk? <a href="tel:+15125500000">(512) 550-0000</a>, Mon–Fri 8–8, Sat 8–6, Sun 12–5. Or <a href="${BOOK}">book the free inspection online</a>.</p></section>`;

  function wireH(root) {
    const s = root.querySelector('.ctH'); if (!s) return; const tps = [...s.querySelectorAll('.tp2')], ta = s.querySelector('textarea'), adr = s.querySelector('.ln2 input'), snd = s.querySelector('.snd'), hint = s.querySelector(".hnt");
    const build = () => { const on = tps.filter((b) => b.getAttribute('aria-pressed') === 'true').map((b) => b.textContent);
      const subj = 'Free inspection' + (on.length ? ': ' + on.join(', ') : ''); const body = [ta.value.trim(), adr.value.trim() ? 'Address: ' + adr.value.trim() : ''].filter(Boolean).join('\n\n');
      snd.href = `mailto:${MAIL}?subject=${encodeURIComponent(subj)}${body ? '&body=' + encodeURIComponent(body) : ''}`; };
    tps.forEach((b) => b.addEventListener('click', () => { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); build(); }));
    ta.addEventListener('input', build); adr.addEventListener('input', build);
    snd.addEventListener('click', () => { hint.textContent = 'Your email app should open with the note. Nothing has been sent from this page.'; });
    build();
  }
  return { G, H, wire(root) { wireG(root); wireH(root); } };
})();
