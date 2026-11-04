/* WINDOWS K — "376 jobs, set in type" (new-versions addendum; Dropbox Brand: subtraction, type as the interface).
   The firm's 376 priced window jobs (windows cost guide, 2022–2026; FACTS.md, sum verified) set as one column of type,
   one row per price band. Each band's type size is scaled so its AREA is proportional to its number of jobs
   (size ∝ √count), so the column itself is the distribution. Middle half $5k–$25k and median band $10k–$15k as published;
   median bands by maker as published. Shares are computed from the published counts and always shown with n. */
window.Win6 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const B = [['Under $2k', 12], ['$2k–$5k', 40], ['$5k–$10k', 96], ['$10k–$15k', 79], ['$15k–$20k', 50], ['$20k–$25k', 30], ['$25k–$30k', 19], ['$30k–$40k', 30], ['$40k–$50k', 13], ['$50k–$60k', 4], ['$75k–$100k', 2], ['$100k+', 1]];
  const N = 376, MAX = 96, MED = 3, TOP = 2, MH = [2, 5];   // median band index, most-common index, middle half rows
  const MK = [['NT Windows', 238, 3], ['Simonton', 54, 3], ['Andersen', 38, 5], ['Pella', 31, 2]];
  const share = (n) => { const p = n / N * 100; return p < 1 ? 'under 1%' : `${Math.round(p)}%`; };
  const note = (i) => { const [b, n] = B[i];
    let t = `<b>${n} of ${N}</b> priced window jobs (${share(n)}) landed at <b>${b}</b>.`;
    if (i === MED) t += ' It is the median band: half the jobs cost less, half cost more.';
    else if (i === TOP) t += ' The most common band.';
    if (i >= MH[0] && i <= MH[1]) t += ' It sits inside the middle half ($5k–$25k), where half of all jobs fall.';
    return t; };

  const K = () => `<section class="sec wnK" id="windows" aria-labelledby="wnK-h">
    <div class="hd"><p class="kk">Windows · what they cost</p><h2 class="sec-h" id="wnK-h" data-split>376 window jobs, priced.</h2>
      <p class="sec-p">Every priced window job of ours since 2022, by what it cost. The bigger the type, the more jobs: each band's area is proportional to its number of jobs.</p></div>
    <div class="bdy">
      <ol class="col" aria-label="Priced window jobs by price band. Arrow keys move between bands.">${B.map(([b, n], i) => `<li class="${i >= MH[0] && i <= MH[1] ? 'mh' : ''}${i === MH[0] ? ' mh0' : ''}${i === MH[1] ? ' mh1' : ''}" style="--r:${Math.sqrt(n / MAX).toFixed(4)};--k:${i}">
        <button type="button" class="bnd" data-i="${i}" aria-pressed="${i === MED}" tabindex="${i === MED ? 0 : -1}" aria-label="${b}: ${n} of ${N} jobs, ${share(n)}${i === MED ? ', median band' : i === TOP ? ', most common' : ''}">
          <span class="bl">${b}</span><span class="bc">${n}</span>${i === MED ? '<span class="tg md">median band</span>' : ''}${i === TOP ? '<span class="tg mc">most common</span>' : ''}<span class="mkr" aria-hidden="true"></span></button>${i === MH[0] ? '<span class="mhl" aria-hidden="true">Middle half · $5k–$25k</span>' : ''}</li>`).join('')}</ol>
      <aside class="wsd">
        <p class="nt" aria-live="polite">${note(MED)}</p>
        <div class="mk"><p class="ml" id="wnK-ml">Median band, by maker</p><div class="mbs" role="group" aria-labelledby="wnK-ml">${MK.map(([m, n, i], k) => `<button type="button" class="mb" data-k="${k}" aria-pressed="false">${m}<small>${n} jobs</small></button>`).join('')}</div>
          <p class="mo" aria-live="polite">Choose a maker to mark its median band.</p></div>
        <dl class="fx"><div><dt>388</dt><dd>documented window jobs</dd></div><div><dt>2 days</dt><dd>most window-only jobs</dd></div></dl>
        <p class="sm">We measure every opening at the free inspection.</p><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
        <p class="sc">Type size ∝ √jobs, so each band's area is proportional to its count (the smallest bands are held at a readable minimum). Source: the firm's windows cost guide, 376 priced jobs, 2022–2026.</p>
      </aside></div></section>`;

  function wire(root) {
    const s = root.querySelector('.wnK'); if (!s) return;
    const btns = [...s.querySelectorAll('.bnd')], nt = s.querySelector('.nt'), mo = s.querySelector('.mo'), mbs = [...s.querySelectorAll('.mb')];
    const sel = (i, focus) => { i = Math.max(0, Math.min(B.length - 1, i)); btns.forEach((b, k) => { b.setAttribute('aria-pressed', k === i); b.tabIndex = k === i ? 0 : -1; }); nt.innerHTML = note(i); if (focus) btns[i].focus(); };
    btns.forEach((b, i) => { b.addEventListener('click', () => sel(i));
      b.addEventListener('keydown', (e) => { const n = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: B.length - 1 }[e.key]; if (n === undefined) return; e.preventDefault(); sel(n, true); }); });
    mbs.forEach((b, k) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true'; mbs.forEach((x) => x.setAttribute('aria-pressed', x === b && on));
      btns.forEach((x) => { const m = x.querySelector('.mkr'); m.textContent = ''; x.classList.remove('mkd'); });
      if (!on) { mo.textContent = 'Choose a maker to mark its median band.'; return; }
      const [m, n, i] = MK[k], t = btns[i]; t.classList.add('mkd'); t.querySelector('.mkr').textContent = `◂ ${m}`;
      mo.textContent = `${m}: median band ${B[i][0]}, across ${n} priced jobs.`; }));
    // rows rise in once, top to bottom
    if (!RM && 'IntersectionObserver' in window) { s.classList.add('pre'); const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { s.classList.add('in9'); io.disconnect(); } }, { threshold: 0.15 }); io.observe(s.querySelector('.col')); }
  }
  return { K, wire };
})();
