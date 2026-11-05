/* BOOKING L — "Everything, then one step" (new-versions addendum, pass 2; Dropbox Brand, which the annex names for the
   subtraction-discipline closing). A pinned stage holds a poster wall of the twelve locked facts the page has made.
   Scrolling subtracts them one by one: each tile shrinks and travels into its own place in one quiet line of type,
   and a counter counts down 12 … 1. When the wall is empty one sentence stands in its place. The Book button and the
   phone sit under the line from the start. Locked facts only, verbatim. No form: nothing is sent or saved. */
window.Cta7 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';
  const status = () => (window.Cta && Cta.status ? Cta.status() : { open: true, t: '' });
  // [big figure, the rest of the fact] — read together, each is a locked fact verbatim
  const F = [
    ['4.9', 'from 474 Google reviews'],
    ['Since 2009,', 'merged with Sanders Roofing & Exteriors 2018'],
    ['886', 'documented projects since 2018 · 312 on the map with photos + 574 more counted'],
    ['431', 'documented siding jobs'],
    ['388', 'documented window jobs'],
    ['177', 'before-and-after pairs'],
    ['$10k–$15k', 'median band (415 priced)'],
    ['30-year', 'James Hardie non-prorated warranty'],
    ['GAF', 'Master Elite'],
    ['James Hardie', 'Elite Preferred + President’s Club 2025'],
    ['Andersen', 'Certified Premier'],
    ['BBB', 'A+'],
  ];
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const L = () => `<section class="sec bkL" id="booking" aria-labelledby="bkL-h"><div class="ltrack"><div class="lstage">
      <div class="lhd"><div><p class="lkk">Booking · everything, then one step</p><h2 class="sec-h" id="bkL-h">Everything, then one step.</h2></div>
        <p class="lcount" aria-hidden="true"><b>12</b><span>reasons on the wall</span></p></div>
      <div class="lbody">
        <ul class="lwall" aria-label="What this page has shown, in twelve facts">${F.map((f, i) => `<li class="ltile" data-i="${i}" style="--i:${i}"><b>${esc(f[0])}</b> <span>${esc(f[1])}</span></li>`).join('')}</ul>
        <div class="lend"><p class="lsay">That is all of it, in one line.<br><em>What is left is one visit.</em></p>
          <p class="lsay2">A free inspection at your house, every trade in one visit. Call the office or book online.</p></div>
      </div>
      <p class="lline" aria-hidden="true">${F.map((f, i) => `<span class="lsl" data-i="${i}">${esc(f[0])} ${esc(f[1])}</span>`).join('<i> · </i>')}</p>
      <div class="lcta"><div class="ctas"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a><a class="callx" href="tel:+15125500000">${PHONE}(512) 550-0000</a></div>
        <div class="lmeta"><p class="lnow" aria-live="polite"></p><p>Mon–Fri 8–8, Sat 8–6, Sun 12–5 · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · <a href="mailto:info@austinprosiding.com">info@austinprosiding.com</a></p>
          <p class="lno">No form: nothing here is sent or saved.</p></div></div>
    </div></div></section>`;

  const clamp = (x) => Math.max(0, Math.min(1, x));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const S0 = 0.1, STEP = 0.05, DUR = 0.12;   // tile i folds over [S0 + i*STEP, S0 + i*STEP + DUR] of the pinned scroll

  function wire(root) {
    const sec = root.querySelector('.bkL'); if (!sec || sec.dataset.w) return; sec.dataset.w = '1';
    const now = sec.querySelector('.lnow');
    const tick = () => { const s = status(); now.textContent = s.t; now.classList.toggle('open', !!s.open); }; tick(); setInterval(tick, 60000);
    const track = sec.querySelector('.ltrack'), tiles = [...sec.querySelectorAll('.ltile')], slots = [...sec.querySelectorAll('.lsl')];
    const cnt = sec.querySelector('.lcount b'), cntS = sec.querySelector('.lcount span'), end = sec.querySelector('.lend');
    if (RM) { sec.classList.add('lrm'); cnt.textContent = '1'; cntS.textContent = 'step left'; return; }
    sec.classList.add('lpin');
    // phones: the pinned stage holds the wall and the line; the button row follows the stage (the bar at the foot of
    // the screen keeps Call and Book in reach throughout), so nothing in the stage is ever pushed below the fold
    const cta = sec.querySelector('.lcta'), stage = sec.querySelector('.lstage'), mq = matchMedia('(max-width: 760px)');
    const place = () => { if (mq.matches) { if (cta.parentNode !== sec) sec.appendChild(cta); } else if (cta.parentNode !== stage) stage.appendChild(cta); };
    place(); mq.addEventListener('change', () => { place(); requestAnimationFrame(measure); });
    let D = [], raf = 0, last = -1;
    // where each tile must travel: from its own centre to its slot's centre in the line (measured with no transform)
    const measure = () => {
      tiles.forEach((t) => { t.style.transform = ''; });
      D = tiles.map((t, i) => { const a = t.getBoundingClientRect(), b = slots[i].getBoundingClientRect();
        return { dx: b.left + b.width / 2 - (a.left + a.width / 2), dy: b.top + b.height / 2 - (a.top + a.height / 2), s: Math.max(0.12, Math.min(0.5, b.height / a.height)) }; });
      last = -1; frame();
    };
    const progress = () => { const r = track.getBoundingClientRect(), span = r.height - innerHeight; return span > 0 ? clamp(-r.top / span) : 1; };
    function frame() {
      raf = 0; const p = progress(); if (Math.abs(p - last) < 0.0005) return; last = p;
      let left = 0;
      tiles.forEach((t, i) => {
        const k = clamp((p - (S0 + i * STEP)) / DUR), e = ease(k), d = D[i];
        if (k < 1) left++;
        t.style.transform = k ? `translate(${(d.dx * e).toFixed(1)}px,${(d.dy * e).toFixed(1)}px) scale(${(1 - (1 - d.s) * e).toFixed(3)})` : '';
        t.style.opacity = (1 - sstep(0.62, 1, k)).toFixed(3);
        slots[i].style.opacity = (0.16 + 0.84 * sstep(0.7, 1, k)).toFixed(3);   // a ghost of the line waits from the start
      });
      cnt.textContent = left || 1; cntS.textContent = left ? (left === 1 ? 'reason on the wall' : 'reasons on the wall') : 'step left';
      sec.classList.toggle('ldone', !left);
      end.style.opacity = sstep(S0 + 11 * STEP + DUR, S0 + 11 * STEP + DUR + 0.1, p).toFixed(3);
    }
    const ask = () => { if (!raf) raf = requestAnimationFrame(frame); };
    addEventListener('scroll', ask, { passive: true });
    addEventListener('resize', () => requestAnimationFrame(measure));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => requestAnimationFrame(measure));
    requestAnimationFrame(measure);
  }
  return { L, wire };
})();
