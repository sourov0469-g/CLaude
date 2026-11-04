/* BOOKING K (new-versions addendum, pass 1) — "Next stop: your house". Reference: Lusion (flow: the carrying thread that
   makes the sections one journey). One route line comes down into the section as if it had carried the visitor through the
   page, turns, and runs through the stops between this page and a free inspection; a lime bead rides it with the reader's
   scroll and lights each stop as it arrives (⟦S1325⟧ scroll-progress-timeline on a real <ol>). The line ends at the one
   filled Book button. Locks verbatim: (512) 550-0000 · info@austinprosiding.com · 7801 N Lamar Blvd Suite C70, Austin TX
   78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5 · 4.9 from 474 Google reviews · since 2009, merged with Sanders Roofing &
   Exteriors 2018 · 30-year James Hardie non-prorated warranty. No form: nothing here is sent or saved. */
window.Cta6 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const ADDR = '7801 N Lamar Blvd Suite C70, Austin TX 78752', MAIL = 'info@austinprosiding.com';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const PH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
  const status = () => (window.Cta && Cta.status ? Cta.status() : { open: true, t: '' });

  const stop = (i, kick, h, body, cls = '') => `<li class="tkst${cls}" style="--i:${i}"><i class="tkdt" aria-hidden="true"></i><p class="tkk">${kick}</p><h3 class="tkh">${h}</h3>${body}</li>`;
  const K = () => `<section class="sec bkK" id="booking" aria-labelledby="bkK-h">
    <div class="tkhd"><h2 class="sec-h" id="bkK-h" data-split>Next stop: your house.</h2>
      <p class="sec-p">The whole way from this page to a free inspection, in three stops.</p></div>
    <div class="tkln"><svg class="tksv" aria-hidden="true"><path class="tktr"/><path class="tkdr"/><circle class="tkbd" r="9"/></svg>
      <p class="tkp" aria-hidden="true">You are here</p>
      <ol class="tkol">
        ${stop(0, 'Today', 'Call, or book online.', `<a class="tkbig" href="tel:+15125500000">${PH}<span>(512) 550-0000</span></a>
          <p class="tkt">A person at the office answers.</p>
          <p class="tknow" aria-live="polite"></p><p class="tkhr">Mon–Fri 8–8 · Sat 8–6 · Sun 12–5</p>`)}
        ${stop(1, 'At your house', 'The free inspection.', `<p class="tkt">One visit, every trade.</p>
          <p class="tkt tks">Since 2009; merged with Sanders Roofing &amp; Exteriors in 2018.</p>`)}
        ${stop(2, 'After the visit', 'An itemised proposal.', `<p class="tkt">Nothing to pay to find out.</p>
          <p class="tkt tks">For James Hardie siding: the 30-year James Hardie non-prorated warranty.</p>`)}
        ${stop(3, 'Your stop', 'Book it.', `<a class="btn key tkgo" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
          <p class="tkt tks">or email <a href="mailto:${MAIL}">${MAIL}</a></p>`, ' tkend')}
      </ol></div>
    <p class="tkft">${ADDR} · Rated 4.9 from 474 Google reviews</p></section>`;

  function wire(root) {
    const s = root.querySelector('.bkK'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ln = s.querySelector('.tkln'), sv = s.querySelector('.tksv'), tr = s.querySelector('.tktr'), dr = s.querySelector('.tkdr'), bd = s.querySelector('.tkbd');
    const sts = [...s.querySelectorAll('.tkst')], dots = sts.map((li) => li.querySelector('.tkdt')), now = s.querySelector('.tknow'), lab = s.querySelector('.tkp');
    let L = 1, at = [], vert = false, cur = RM ? 1 : 0, tgt = cur, raf = 0, prevT = 0;

    const tick = () => { const ss = status(); now.textContent = ss.t; now.classList.toggle('open', !!ss.open); };
    tick(); setInterval(tick, 60000);

    // geometry: the route through the stop centres, measured from the DOM (re-measured on resize and font load)
    function measure() {
      const b = ln.getBoundingClientRect(); if (!b.width) return;
      const c = dots.map((d) => { const r = d.getBoundingClientRect(); return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top]; });
      vert = Math.abs(c[c.length - 1][1] - c[0][1]) > 8;
      sv.setAttribute('width', b.width); sv.setAttribute('height', b.height); sv.setAttribute('viewBox', `0 0 ${b.width} ${b.height}`);
      let d;
      if (vert) d = `M${c[0][0]} 0V${c[c.length - 1][1]}`;                              // one left rail, entering from the top
      else { const r = 40, x0 = Math.max(8, c[0][0] - 90), y = c[0][1];                     // down from above, a round turn, then the run
        d = `M${x0} 0V${y - r}A${r} ${r} 0 0 0 ${x0 + r} ${y}H${c[c.length - 1][0]}`; }
      tr.setAttribute('d', d); dr.setAttribute('d', d); L = dr.getTotalLength();
      dr.style.strokeDasharray = `${L} ${L}`;
      at = c.map(([x, y]) => { let best = 0, bd2 = 1e9; for (let k = 0; k <= 400; k++) { const p = dr.getPointAtLength(L * k / 400), q = (p.x - x) ** 2 + (p.y - y) ** 2; if (q < bd2) { bd2 = q; best = L * k / 400; } } return best; });
      lab.style.left = (vert ? c[0][0] + 22 : Math.max(8, c[0][0] - 90) + 16) + 'px';
      target(); draw();
    }
    // progress: rail = the 60% viewport anchor along the line; run = the section's travel through the viewport
    function target() {
      if (RM) { tgt = 1; return; }
      const vh = innerHeight, b = ln.getBoundingClientRect();
      if (vert) { const a = vh * 0.6 - b.top; tgt = Math.min(1, Math.max(0, a / Math.max(1, at[at.length - 1]))); }
      else { const sb = s.getBoundingClientRect(); tgt = Math.min(1, Math.max(0, (vh * 0.8 - sb.top) / (vh * 0.65))); }   // starts with the section top at 80% of the viewport, arrives at 15%
    }
    function draw() {
      const len = L * cur; dr.style.strokeDashoffset = L - len;
      const p = dr.getPointAtLength(Math.max(0.01, len)); bd.setAttribute('cx', p.x); bd.setAttribute('cy', p.y);
      sts.forEach((li, i) => li.classList.toggle('on', len >= at[i] - 2));
    }
    function frame(t) {
      raf = 0; const dm = Math.min(3, prevT ? (t - prevT) / 16.67 : 1); prevT = t;
      cur += (tgt - cur) * (1 - Math.pow(1 - 0.18, dm)); if (Math.abs(tgt - cur) < 0.0008) cur = tgt;
      draw(); if (cur !== tgt) raf = requestAnimationFrame(frame); else prevT = 0;
    }
    const kick = () => { target(); if (!raf && cur !== tgt) raf = requestAnimationFrame(frame); };
    if (!RM) addEventListener('scroll', kick, { passive: true });
    new ResizeObserver(() => { measure(); kick(); }).observe(ln);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); kick(); });
    // arrival: the stops enter once, decelerating, 90 ms apart in reading order
    if (RM) s.classList.add('tkin');
    else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('tkin'); } }), { threshold: 0.15 }).observe(ln);
    measure();
  }
  return { K, wire };
})();
