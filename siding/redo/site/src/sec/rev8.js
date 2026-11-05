/* REVIEWS M (new-versions addendum, pass 3) — "Their before, their after". Reference: MERSI (the infinite split-slider:
   two halves moving in opposite directions, a central label cycling in sync; MERSI's seam is the annex's source for any
   before/after). Twelve of the 30 published Google reviews describe both what the homeowner had and how it ended. The left
   half holds the before, the right half the after, both exact excerpts of the same review (checked verbatim at build), and
   the full review is one click away. Nothing game-like, no configurator. */
window.Rev8 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  // [review index, before (verbatim), after (verbatim)]
  const PAIRS = [
    [7, "I hired Austin Pro to redo my house's 80s era masonite siding with Hardie Board.", 'They gave a great quote and did phenomenal work.'],
    [14, 'After contacting other businesses and getting high-pressure sales tactics with zero details in their estimates, we reached out to Austin Pro.', 'There was no pressure.'],
    [0, "I wish I would've replaced my roof years ago instead of doing more damage waiting.", 'Such a relief having it done.'],
    [3, 'We lost some shingles in one of the bigger storms that passed through', 'Austin Pro was able to fix everything WITHIN DAYS and it mattered because another big storm came through two days later!'],
    [29, 'We finally got around to having our old original siding replaced', 'Austin Pro was definitely the right choice for the work.'],
    [8, 'the replacement of the original 1984 siding was very labor intensive because of the way it was installed, and we were not in Austin.', 'They kept the communication open the whole time and I was truly impressed by the professionalism and attention to details with this job.'],
    [15, 'They ripped off the old roof', 'and put on a new one in one day. The site was clean when they left and the new roof looks great.'],
    [26, 'Replacing siding is a huge investment', 'but Austin Pro made it seamless.'],
    [23, 'One right after a major hailstorm where insurance replaced all windows on front', 'Very professional staff, easy process and work was completed on schedule.'],
    [4, 'Austin Pro replaced our old, damaged siding in several places on our house and painted our entire house.', 'All I can say is their service and work is impeccable!'],
    [20, 'as I was closing on a new home', 'Very detailed and sent me photos immediately to reassure me that everything was in great condition.'],
    [21, 'I had several windows replaced and all of my siding as well as a portion of my house demoed so I could add to the house.', 'There crews were professional and they kept the job site clean each day after working.']];
  const REV = () => globalThis.__REV;
  // for the build's verbatim lock: [index, text] for every half
  const PICK = PAIRS.flatMap((p) => [[p[0], p[1]], [p[0], p[2]]]);
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const N = PAIRS.length;
  // tracks carry one clone so the halves wrap without a jump: before = [0..N-1, 0], after = reversed order with the clone in front
  const bTrack = () => [...PAIRS, PAIRS[0]].map((p) => `<div class="rmsl"><p class="rmq">“${esc(p[1])}”</p></div>`).join('');
  const aTrack = () => [PAIRS[0], ...PAIRS.slice().reverse()].map((p) => `<div class="rmsl"><p class="rmq">“${esc(p[2])}”</p></div>`).join('');

  const M = () => { const R = REV(), first = R[PAIRS[0][0]];
    return `<section class="sec rvM" id="reviews" aria-labelledby="rvM-h">
    <div class="rmhd"><h2 class="sec-h" id="rvM-h" data-split>Their before, their after.</h2>
      <p class="sec-p">Rated 4.9 from 474 Google reviews. In twelve of the reviews we publish, the homeowner tells both halves: what they had, and how it ended. Each half below is their own words, from the same review.</p></div>
    <div class="rmcover" data-solid role="group" aria-roledescription="carousel" aria-label="Before and after, in homeowners’ words" tabindex="0">
      <div class="rmhalf rmb"><span class="rmtag">Before</span><div class="rmview"><div class="rmtrack">${bTrack()}</div></div></div>
      <div class="rmhalf rma"><span class="rmtag">After</span><div class="rmview"><div class="rmtrack">${aTrack()}</div></div></div>
      <div class="rmseam" aria-hidden="true"><span class="rmname"><span class="rmnm">${esc(first.name)}</span></span></div>
    </div>
    <div class="rmbar" data-solid>
      <div class="rmnav"><button type="button" class="rmbtn" data-d="-1" aria-label="Previous review"><span aria-hidden="true">←</span></button>
        <span class="rmcount"><b>1</b> of ${N}</span>
        <button type="button" class="rmbtn" data-d="1" aria-label="Next review"><span aria-hidden="true">→</span></button>
        <button type="button" class="rmplay" aria-pressed="false">Pause</button></div>
      <p class="rmwho"><b>${esc(first.name)}</b> · ${esc(first.source)}</p>
      <button type="button" class="rmmore" aria-expanded="false" aria-controls="rvM-full">Read the whole review</button>
    </div>
    <div class="rmfull" id="rvM-full" data-solid hidden><p>${esc(first.text)}</p></div>
    <p class="rmlive" aria-live="polite"></p>
    <div class="rmcta" data-solid><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
      <p>Excerpts are exact. Every review is a published Google review, 2026.</p></div>
  </section>`; };

  function wire(root) {
    const s = root.querySelector('.rvM'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, PH = matchMedia('(max-width:760px)');
    const bT = s.querySelector('.rmb .rmtrack'), aT = s.querySelector('.rma .rmtrack'), nm = s.querySelector('.rmname'), cover = s.querySelector('.rmcover');
    const cnt = s.querySelector('.rmcount b'), who = s.querySelector('.rmwho'), more = s.querySelector('.rmmore'), full = s.querySelector('.rmfull'), live = s.querySelector('.rmlive'), play = s.querySelector('.rmplay');
    let i = 0, bPos = 0, aPos = N, busy = false, timer = 0, paused = false, hold = false, inView = false;
    const ax = () => (PH.matches ? 'X' : 'Y');
    const put = (el, pos, anim) => { el.style.transition = anim && !RM ? 'transform .9s cubic-bezier(.65,0,.35,1)' : 'none'; el.style.transform = `translate${ax()}(${-pos * 100}%)`; };
    const R = () => globalThis.__REV;
    const meta = (k, say) => { const r = R()[PAIRS[k][0]]; cnt.textContent = k + 1; who.innerHTML = `<b>${esc(r.name)}</b> · ${esc(r.source)}`; full.querySelector('p').textContent = r.text;
      if (say) live.textContent = `Before: ${PAIRS[k][1]} After: ${PAIRS[k][2]} ${r.name}, ${r.source}.`; };
    const cv = document.createElement('canvas').getContext('2d'); const measure = (t) => { cv.font = '700 14px ' + getComputedStyle(nm).fontFamily; return cv.measureText(t).width; };
    const label = (k) => { const r = R()[PAIRS[k][0]], old = nm.querySelector('.rmnm');
      if (RM) { old.textContent = r.name; nm.style.width = Math.ceil(measure(r.name)) + 40 + 'px'; return; }
      const nw = document.createElement('span'); nw.className = 'rmnm rmin'; nw.textContent = r.name; nm.appendChild(nw);
      nm.style.width = Math.ceil(measure(r.name)) + 40 + 'px'; old.classList.add('rmout'); setTimeout(() => old.remove(), 900); requestAnimationFrame(() => requestAnimationFrame(() => nw.classList.remove('rmin'))); };
    // step: the before track moves one way, the after track the other; clones let the ends wrap without a jump
    const go = (d, say) => { if (busy) return; const k = (i + d + N) % N;
      if (d > 0) { if (i === N - 1) { bPos = N; aPos = 0; } else { bPos = k; aPos = N - k; } }
      else { if (i === 0) { put(bT, N, false); put(aT, 0, false); void bT.offsetWidth; } bPos = k; aPos = N - k; }
      busy = !RM; put(bT, bPos, true); put(aT, aPos, true); label(k); meta(k, say); i = k;
      const done = () => { busy = false; if (bPos === N) { bPos = 0; aPos = N; put(bT, 0, false); put(aT, N, false); } };
      if (RM) done(); else setTimeout(done, 920); };
    const tick = () => { clearTimeout(timer); if (RM || paused || hold || !inView) return; timer = setTimeout(() => { go(1, false); tick(); }, 7000); };
    s.querySelectorAll('.rmbtn').forEach((b) => b.addEventListener('click', () => { go(+b.dataset.d, true); tick(); }));
    cover.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); go(d, true); tick(); } });
    play.addEventListener('click', () => { paused = !paused; play.setAttribute('aria-pressed', paused); play.textContent = paused ? 'Play' : 'Pause'; tick(); });
    more.addEventListener('click', () => { const o = more.getAttribute('aria-expanded') !== 'true'; more.setAttribute('aria-expanded', o); full.hidden = !o; more.textContent = o ? 'Hide the whole review' : 'Read the whole review'; });
    // pause while the pointer or focus is inside; swipe sideways on touch
    s.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hold = true; tick(); } });
    s.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hold = false; tick(); } });
    s.addEventListener('focusin', () => { hold = true; tick(); }); s.addEventListener('focusout', (e) => { if (!s.contains(e.relatedTarget)) { hold = false; tick(); } });
    let sx = null; cover.addEventListener('touchstart', (e) => { sx = [e.touches[0].clientX, e.touches[0].clientY]; }, { passive: true });
    cover.addEventListener('touchend', (e) => { if (!sx) return; const dx = e.changedTouches[0].clientX - sx[0], dy = e.changedTouches[0].clientY - sx[1]; sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) { go(dx < 0 ? 1 : -1, true); tick(); } }, { passive: true });
    PH.addEventListener('change', () => { put(bT, bPos, false); put(aT, aPos, false); });
    new IntersectionObserver((es) => es.forEach((e) => { inView = e.isIntersecting; tick(); }), { threshold: 0.35 }).observe(cover);
    if (RM) { paused = true; play.hidden = true; }
    put(bT, 0, false); put(aT, N, false); nm.style.width = Math.ceil(measure(R()[PAIRS[0][0]].name)) + 40 + 'px';
  }
  return { M, wire, PICK, PAIRS };
})();
