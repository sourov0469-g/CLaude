/* VISUALISER M (new-versions addendum, pass 3) — "Pull a colour through". Reference: Lusion (flow: the carrying thread,
   one continuous journey). All 17 published ColorPlus colours for Austin on one continuous ribbon, lightest to darkest,
   drawn through a fixed eye under a lap-sided house. Pull it and the colour under the eye runs down the boards: the top
   course follows the ribbon and every course below follows the one above it, a beat behind (a chain of followers).
   Every course always shows a real published colour, never a blend. Let go and the ribbon settles on the nearest colour.
   Colours and names exactly as published (the same list A–L use). Configurator only; no score, goal or timer. */
window.Vis8 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const CP0 = [['Arctic White', '#E0E0D8'], ['Cobble Stone', '#C6BEB0'], ['Navajo Beige', '#D5C9B2'], ['Khaki Brown', '#A28F7D'], ['Timber Bark', '#7B7064'],
    ['Rich Espresso', '#5F5A55'], ['Mountain Sage', '#706F5E'], ['Light Mist', '#B6BAB5'], ['Pearl Gray', '#B2AEA9'], ['Gray Slate', '#898A87'], ['Boothbay Blue', '#778184'],
    ['Evening Blue', '#5F696D'], ['Deep Ocean', '#49545C'], ['Aged Pewter', '#7D7974'], ['Night Gray', '#6A6D6F'], ['Iron Gray', '#575B59'], ['Countrylane Red', '#714D47']];
  const TRIM = '#E0E0D8';
  // order: lightest to darkest by perceptual lightness (OKLab L) of the published hex
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const rgb = (h) => [1, 3, 5].map((k) => lin(parseInt(h.slice(k, k + 2), 16) / 255));
  const okL = (h) => { const [r, g, b] = rgb(h); const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b); return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s; };
  const CP = CP0.slice().sort((a, b) => okL(b[1]) - okL(a[1]));
  const lum = (h) => { const [r, g, b] = rgb(h); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ink = (h) => (lum(h) > 0.28 ? '#16191D' : '#FFFFFF');
  const DEF = CP.findIndex((c) => c[0] === 'Boothbay Blue');
  const N = 20, Y0 = 104, CH = (480 - Y0) / N;

  const house = () => {
    let c = '', sh = '';
    for (let i = 0; i < N; i++) { const y = (Y0 + i * CH).toFixed(1);
      c += `<rect class="vmc" x="150" y="${y}" width="500" height="${(CH + 0.6).toFixed(1)}" fill="${CP[0][1]}"/>`;
      sh += `<rect x="150" y="${(Y0 + (i + 1) * CH - 3).toFixed(1)}" width="500" height="3" fill="rgba(10,22,17,.17)"/><rect x="150" y="${y}" width="500" height="1.5" fill="rgba(255,255,255,.32)"/>`; }
    const win = (x, y, w, h) => `<rect x="${x - 9}" y="${y - 9}" width="${w + 18}" height="${h + 18}" fill="${TRIM}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#9FB4BC"/>`
      + `<path d="M${x} ${y}h${w}L${x} ${y + h * 0.8}z" fill="rgba(255,255,255,.2)"/><rect x="${x + w / 2 - 2}" y="${y}" width="4" height="${h}" fill="${TRIM}"/><rect x="${x}" y="${y + h / 2 - 2}" width="${w}" height="4" fill="${TRIM}"/>`
      + `<rect x="${x - 14}" y="${y + h + 7}" width="${w + 28}" height="9" fill="${TRIM}"/>`;
    return `<svg class="vmhouse" viewBox="70 70 660 456" role="img" aria-label="A gabled house with lap siding, two windows, a gable window and a door; the siding shows the colour under the eye.">
      <defs><clipPath id="vmClip"><path d="M150 480V236L400 104L650 236V480Z"/></clipPath></defs>
      <rect x="40" y="480" width="720" height="40" rx="6" fill="#E4EAE5"/>
      <g clip-path="url(#vmClip)">${c}${sh}</g>
      <rect x="150" y="236" width="13" height="244" fill="${TRIM}"/><rect x="637" y="236" width="13" height="244" fill="${TRIM}"/>
      <path d="M150 248L400 116L650 248" fill="none" stroke="${TRIM}" stroke-width="9"/>
      <path d="M108 254L400 90L692 254L672 266L400 113L128 266Z" fill="#3B4043"/>
      ${win(210, 300, 96, 112)}${win(494, 300, 96, 112)}
      <rect x="372" y="160" width="56" height="56" rx="28" fill="${TRIM}"/><circle cx="400" cy="188" r="20" fill="#9FB4BC"/><rect x="398" y="168" width="4" height="40" fill="${TRIM}"/>
      <rect x="356" y="340" width="88" height="140" fill="${TRIM}"/><rect x="366" y="350" width="68" height="130" fill="#4E5458"/><circle cx="424" cy="418" r="3.5" fill="#D9DDD8"/>
      <rect x="340" y="474" width="120" height="8" fill="#CCD3CE"/></svg>`;
  };
  const chips = () => CP.map((c, i) => `<span class="vmchip" data-i="${i}" style="--c:${c[1]};--k:${ink(c[1])}"><span>${c[0]}</span></span>`).join('');

  const M = () => `<section class="sec viM" id="colours" aria-labelledby="viM-h">
    <div class="vmgrid"><div class="vmhd"><h2 class="sec-h" id="viM-h" data-split>Pull a colour through.</h2>
      <p class="sec-p">All 17 ColorPlus colours for Austin, lightest to darkest, on one ribbon. Pull it and the colour runs down the boards. Let go and the wall settles on a real colour.</p></div>
    <div class="vmstage">${house()}</div>
    <div class="vmside">
      <div class="vmread"><p class="vmn"><b>${CP[DEF][0]}</b> · ColorPlus · ${CP[DEF][1]}</p>
        <p class="vmt">Colour ${DEF + 1} of 17, lightest to darkest. Trim in Arctic White, the ColorPlus trim colour.</p></div>
      <div class="vmcta"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
        <p>Screens show colour a little differently; see real samples at the free inspection.</p></div>
      <span class="vmlive" aria-live="polite"></span></div>
    <div class="vmrow">
      <button type="button" class="vmstep" data-d="-1" aria-label="Lighter colour"><span aria-hidden="true">‹</span> Lighter</button>
      <div class="vmrib" role="slider" tabindex="0" aria-label="ColorPlus colour, lightest to darkest" aria-valuemin="1" aria-valuemax="17" aria-valuenow="${DEF + 1}" aria-valuetext="${CP[DEF][0]}, ${DEF + 1} of 17">
        <span class="vmeye" aria-hidden="true"></span><div class="vmtrack">${chips()}</div></div>
      <button type="button" class="vmstep" data-d="1" aria-label="Darker colour">Darker <span aria-hidden="true">›</span></button>
    </div>
    </div></section>`;

  function wire(root) {
    const s = root.querySelector('.viM'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cs = [...s.querySelectorAll('.vmc')], rib = s.querySelector('.vmrib'), track = s.querySelector('.vmtrack'), chipEls = [...s.querySelectorAll('.vmchip')];
    const nm = s.querySelector('.vmn'), tx = s.querySelector('.vmt'), live = s.querySelector('.vmlive'), steps = [...s.querySelectorAll('.vmstep')];
    const MAX = CP.length - 1, clampI = (v) => Math.max(0, Math.min(MAX, v));
    let p = 0, pt = 0, c = new Array(N).fill(0), shown = new Array(N).fill(0), raf = 0, last = 0, rate = 12, drag = null, said = -1, vis = -1, seen = false, user = false;
    const W = () => chipEls[0].getBoundingClientRect().width || 120;
    const place = () => { track.style.transform = `translateX(${(rib.clientWidth / 2 - (p + 0.5) * W()).toFixed(1)}px)`;
      const k = clampI(Math.round(p)); chipEls.forEach((e, i) => e.classList.toggle('on', i === k));
      rib.setAttribute('aria-valuenow', k + 1); rib.setAttribute('aria-valuetext', `${CP[k][0]}, ${k + 1} of 17`); show(k); };
    // the visible readout follows the eye; the live region speaks only once the ribbon settles
    const show = (k) => { if (k === vis) return; vis = k;
      nm.innerHTML = `<b>${CP[k][0]}</b> · ColorPlus · ${CP[k][1]}`; tx.textContent = `Colour ${k + 1} of 17, lightest to darkest. Trim in Arctic White, the ColorPlus trim colour.`; };
    const paint = () => { for (let i = 0; i < N; i++) { const k = clampI(Math.round(c[i])); if (k !== shown[i]) { shown[i] = k; cs[i].setAttribute('fill', CP[k][1]); } } };
    const read = (k) => { show(k); if (k === said) return; said = k; if (user) live.textContent = `${CP[k][0]}, ColorPlus, colour ${k + 1} of 17.`; };
    const busy = () => drag || Math.abs(pt - p) > 0.002 || Math.abs(c[0] - p) > 0.004 || c.some((v, i) => i && Math.abs(v - c[i - 1]) > 0.004);
    function frame(t) {
      const dt = Math.min(0.05, last ? (t - last) / 1000 : 1 / 60); last = t;
      if (!drag) p += (pt - p) * (1 - Math.exp(-dt * rate));
      const f = 1 - Math.exp(-dt * 22);
      c[0] += (p - c[0]) * f; for (let i = 1; i < N; i++) c[i] += (c[i - 1] - c[i]) * f;
      place(); paint();
      if (busy()) raf = requestAnimationFrame(frame);
      else { raf = 0; last = 0; p = pt; c.fill(pt); place(); paint(); read(pt); rate = 12; }
    }
    const go = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const jump = (k) => { p = pt = k; c.fill(k); place(); paint(); read(k); };
    const to = (k) => { user = true; pt = clampI(k); if (RM) { jump(pt); return; } go(); };

    // drag, with a flick carrying on; a click on a chip pulls that colour to the eye
    rib.addEventListener('pointerdown', (e) => { if (e.button) return; rib.setPointerCapture(e.pointerId);
      drag = { x: e.clientX, p0: p, moved: 0, hist: [[e.timeStamp, e.clientX]], chip: e.target.closest('.vmchip') }; go(); });
    rib.addEventListener('pointermove', (e) => { if (!drag) return; const dx = e.clientX - drag.x; drag.moved = Math.max(drag.moved, Math.abs(dx));
      let q = drag.p0 - dx / W(); if (q < 0) q = -Math.sqrt(-q) * 0.35; if (q > MAX) q = MAX + Math.sqrt(q - MAX) * 0.35;
      p = RM ? clampI(Math.round(q)) : q; drag.hist.push([e.timeStamp, e.clientX]); if (drag.hist.length > 6) drag.hist.shift();
      if (RM) { pt = p; c.fill(p); place(); paint(); } });
    const up = (e) => { if (!drag) return; const d = drag; drag = null;
      if (d.moved < 5) { if (d.chip) to(+d.chip.dataset.i); else to(Math.round(p)); return; }
      const h = d.hist, a = h[0], b = h[h.length - 1], v = b[0] > a[0] ? -(b[1] - a[1]) / W() / ((b[0] - a[0]) / 1000) : 0;
      to(Math.round(clampI(p + Math.max(-6, Math.min(6, v * 0.22))))); };
    rib.addEventListener('pointerup', up); rib.addEventListener('pointercancel', up);
    rib.addEventListener('wheel', (e) => { if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; e.preventDefault();
      clearTimeout(rib._w); p = clampI(p + e.deltaX / W()); pt = p; if (RM) jump(Math.round(p)); else go();
      rib._w = setTimeout(() => to(Math.round(p)), 140); }, { passive: false });
    rib.addEventListener('keydown', (e) => { const k = Math.round(pt);
      const n = { ArrowRight: k + 1, ArrowUp: k + 1, ArrowLeft: k - 1, ArrowDown: k - 1, PageUp: k + 4, PageDown: k - 4, Home: 0, End: MAX }[e.key];
      if (n === undefined) return; e.preventDefault(); to(n); });
    steps.forEach((b) => b.addEventListener('click', () => to(Math.round(pt) + +b.dataset.d)));
    addEventListener('resize', () => place());

    // arrival: once, on entering view, the ribbon pulls from Arctic White to the default colour
    jump(0);
    if (RM) jump(DEF);
    else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting && !seen) { seen = true; io.disconnect(); rate = 3.2; pt = DEF; go(); } }), { threshold: 0.35 }).observe(s.querySelector('.vmhouse'));
  }
  return { M, wire, CP };
})();
