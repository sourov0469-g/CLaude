/* BOOKING, new versions for upgrade Round 5. Locks verbatim; nothing on this page is sent or saved: booking finishes on the
   firm's own scheduling page or by phone.
   C — the record, then the call (Scout Motors: heritage told as a film roll, sequenced proof). A strip of frames runs up
       through a gate as the visitor scrolls: since 2009, the 2018 merger, the 886 wording, the credentials, the rating,
       and last, your house. Beside it, the two ways to book stay in reach the whole time.
   D — one number (Dropbox Brand: the subtraction-discipline closing). Almost nothing on the page but the phone number,
       set as large as the width allows, one plain line and the booking button. */
window.Cta2 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const PH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
  const STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>';
  const book = (c) => `<a class="btn key${c ? ' ' + c : ''}" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const call = `<a class="btn light" href="tel:+15125500000">${PH}(512) 550-0000</a>`;
  const status = () => (window.Cta && Cta.status ? Cta.status() : null);
  const FR = [['2009', 'Since 2009', 'Working on Austin homes, one house at a time.'], ['2018', 'Merged', 'With Sanders Roofing &amp; Exteriors.'],
    ['886', 'Documented projects since 2018', '312 on the map with photos + 574 more counted.'],
    ['GAF · Hardie · Andersen', 'Credentials', 'GAF Master Elite · James Hardie Elite Preferred + President’s Club 2025 · Andersen Certified Premier · BBB A+'],
    ['4.9', 'From 474 Google reviews', `<span class="st5r" aria-hidden="true">${STAR.repeat(5)}</span>`], ['Next', 'Your house', 'One free inspection covers every trade on it.']];

  /* ---------- C ---------- */
  const C = () => `<section class="sec ctC" id="booking" aria-labelledby="ctC-h" style="--n:${FR.length}"><div class="stage">
    <div class="txt"><h2 class="sec-h" id="ctC-h" data-split>The record, then the call.</h2><p class="sec-p">Book the free inspection online, or call. One visit covers every trade on the house.</p>
      <p class="sts" aria-live="polite"></p><div class="acts">${book()}${call}</div><p class="note">Nothing is sent from this page. Booking finishes on our scheduling page, or by phone.</p></div>
    <div class="gate" data-solid aria-hidden="false"><div class="roll"><ol class="strip">${FR.map(([b, k, t], i) => `<li class="fr${i === FR.length - 1 ? ' last' : ''}"><div class="in"><p class="k">${k}</p><b class="${b.length > 6 ? 'sm' : ''}">${b}</b><p class="t">${t}</p></div></li>`).join('')}</ol></div>
      <i class="lens" aria-hidden="true"></i><span class="cn" aria-hidden="true"><b>01</b>/${String(FR.length).padStart(2, '0')}</span></div></div></section>`;

  function wireC(root) {
    const s = root.querySelector('.ctC'); if (!s) return; const st = status(), e = s.querySelector('.sts'); if (st) { e.textContent = st.t; e.classList.toggle('open', st.open); }
    const strip = s.querySelector('.strip'), frs = [...strip.children], cn = s.querySelector('.cn b'), gate = s.querySelector('.gate');
    const flow = () => innerWidth <= 860 || RM; let raf = 0, lastY = 0, lastT = 0, blur = 0;
    function upd(now) { raf = 0; if (flow()) { s.classList.add('flow'); strip.style.transform = ''; return; } s.classList.remove('flow');
      const r = s.getBoundingClientRect(), tot = s.offsetHeight - innerHeight, p = Math.max(0, Math.min(1, -r.top / Math.max(1, tot))), m = frs.length - 1;
      // rest on each frame, then advance (a film gate holds a frame, then pulls the next)
      const raw = p * m, k = Math.min(m - 1, Math.floor(raw)), t = Math.max(0, Math.min(1, (raw - k - 0.35) / 0.3)), f = k + t * t * (3 - 2 * t);
      const fh = frs[0].offsetHeight + 18; strip.style.transform = `translate3d(0,${(-f * fh).toFixed(1)}px,0)`;
      const v = Math.abs(f * fh - lastY) / Math.max(8, (now || performance.now()) - lastT); lastY = f * fh; lastT = now || performance.now(); blur += (Math.min(6, v * 2.2) - blur) * 0.5; gate.style.setProperty('--b', blur.toFixed(2) + 'px');
      const c = Math.round(f); frs.forEach((x, i) => x.classList.toggle('on', i === c)); cn.textContent = String(c + 1).padStart(2, '0');
      if (blur > 0.05) raf = requestAnimationFrame(upd); }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', () => upd()); upd();
    if (flow()) frs.forEach((x) => x.classList.add('on'));
  }

  /* ---------- D ---------- */
  const D = () => `<section class="sec ctD" id="booking" aria-labelledby="ctD-h">
    <h2 class="sr" id="ctD-h">Call or book a free inspection</h2>
    <p class="k">One call, or one click.</p>
    <a class="num" href="tel:+15125500000" aria-label="Call (512) 550-0000">${'(512) 550-0000'.split('').map((c, i) => `<span style="--i:${i}" aria-hidden="true">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</a>
    <svg class="crs" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6H1000" pathLength="1"/><path d="M0 18H1000" pathLength="1"/></svg>
    <div class="row"><p class="ln">Or book the free inspection online. One visit covers every trade on the house.</p>${book('big')}</div>
    <p class="meta"><span class="sts" aria-live="polite"></span><span>Mon–Fri 8–8 · Sat 8–6 · Sun 12–5</span><span>7801 N Lamar Blvd Suite C70, Austin TX 78752</span><a href="mailto:info@austinprosiding.com">info@austinprosiding.com</a></p></section>`;

  function wireD(root) {
    const s = root.querySelector('.ctD'); if (!s) return; const st = status(), e = s.querySelector('.sts'); if (st) { e.textContent = st.t; e.classList.toggle('open', st.open); }
    const num = s.querySelector('.num'), ds = [...num.children];
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((x) => { if (x.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.3 }).observe(num);
    // each figure rises toward the pointer as it passes over the number (a field, not a single magnet)
    if (!RM && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let raf = 0, px = -1e4; const ap = () => { raf = 0; ds.forEach((d) => { const r = d.getBoundingClientRect(), dx = Math.abs(r.left + r.width / 2 - px), k = dx < 160 ? Math.cos(dx / 160 * Math.PI / 2) : 0; d.style.setProperty('--k', k.toFixed(3)); }); };
      num.addEventListener('pointermove', (ev) => { px = ev.clientX; if (!raf) raf = requestAnimationFrame(ap); }); num.addEventListener('pointerleave', () => { px = -1e4; if (!raf) raf = requestAnimationFrame(ap); }); }
  }
  return { C, D, wire(root) { wireC(root); wireD(root); } };
})();
