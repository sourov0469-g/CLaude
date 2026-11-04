/* REVIEWS K — "Marked up by hand" (new-versions addendum; Graza: the custom-animation quality bar).
   All 30 published review excerpts (window.__REV), verbatim, set as one printed page in narrow columns; each ends with the
   writer's name as published. Pick a theme and lime highlighter strokes sweep across the exact phrases where homeowners
   said it, in reading order; reviews that don't say it fade back. Every marked phrase is an exact substring of its review
   (the build throws otherwise), so the marks are verbatim by construction. Counts are computed: "n of the 30 shown". */
window.Rev6 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const R = () => window.__REV || [];
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const TH = [
    ['clean', 'Kept clean', [[2, 'made sure everything was clean before they left'], [11, 'the work site was all cleaned up'], [12, 'professional and clean'], [15, 'The site was clean when they left'], [18, 'took care of the space'], [19, 'Clean up and walk through was great'], [21, 'kept the job site clean each day after working'], [28, 'cleaner when they left than it was when they got here'], [10, 'swept the pollen off my deck']]],
    ['quick', 'Quick', [[0, 'Fast'], [2, 'completed professionally and quickly'], [3, 'So fast!'], [3, 'WITHIN DAYS'], [6, 'arrived in a timely manner'], [9, 'within 24 hours'], [13, 'timeliness'], [15, 'put on a new one in one day'], [17, 'timely'], [18, 'Worked efficiently'], [19, 'getting the job done very quickly'], [20, 'the day after I requested assistance'], [22, 'He responded fast'], [22, 'Quick service'], [23, 'completed on schedule'], [27, 'install was fast and efficient'], [28, 'finished my windows in one day'], [29, 'they were fast and efficient']]],
    ['price', 'Fair price', [[0, 'affordable'], [1, 'for a fraction of the price as compared to the next guy'], [3, 'Pricing is affordable'], [6, 'gave us a great quote'], [7, 'They gave a great quote'], [14, 'at half the price of the others'], [19, 'the most affordable quote I received'], [26, 'providing a fair and transparent estimate'], [27, 'pricing was very competitive']]],
    ['nopress', 'No pressure', [[14, 'There was no pressure'], [26, 'without any high-pressure sales tactics'], [29, 'no pressure estimate']]],
    ['informed', 'Kept informed', [[1, 'The communication was great'], [1, 'Maria was very patient with all my questions'], [7, 'very responsive to my concerns and regularly reached out to me'], [8, 'They kept the communication open the whole time'], [9, 'Communication was great and prompt'], [11, 'Very responsive'], [16, 'Communication was great throughout the whole process'], [17, 'explained the process, the windows and the costs'], [17, 'He followed up and answered many questions'], [18, 'everything explained thoroughly'], [29, 'walking us through every question']]],
    ['pro', 'Professional', 're']];
  const DEF = 'clean';

  // per review: the character ranges each theme marks (phrases located exactly; "Professional" by the word itself)
  function ranges() {
    const out = R().map(() => []);
    TH.forEach(([k, , ph]) => {
      if (ph === 're') { R().forEach((r, i) => { const re = /professional(?:ly|ism)?/gi; let m; while ((m = re.exec(r.text))) out[i].push([m.index, m.index + m[0].length, k]); }); return; }
      ph.forEach(([i, p]) => { const at = (R()[i] || { text: '' }).text.indexOf(p); if (at < 0) throw new Error('not verbatim: ' + p); out[i].push([at, at + p.length, k]); });
    });
    return out;
  }
  function marked(t, rg) {   // split the text into runs with the same set of themes; wrap themed runs in <mark>
    const cut = new Set([0, t.length]); rg.forEach(([a, b]) => { cut.add(a); cut.add(b); }); const pts = [...cut].sort((x, y) => x - y);
    let h = ''; for (let j = 0; j < pts.length - 1; j++) { const a = pts[j], b = pts[j + 1], seg = esc(t.slice(a, b)), ks = [...new Set(rg.filter(([x, y]) => x <= a && y >= b).map((r) => r[2]))];
      h += ks.length ? `<mark data-t="${ks.join(' ')}">${seg}</mark>` : seg; }
    return h;
  }
  const count = () => { const rg = ranges(); return Object.fromEntries(TH.map(([k]) => [k, rg.filter((x) => x.some((r) => r[2] === k)).length])); };
  const say = (k, c) => { const t = TH.find((x) => x[0] === k); return `${t[1]}: said in ${c[k]} of the 30 reviews shown.`; };

  const K = () => {
    const rg = ranges(), c = count();
    const page = R().map((r, i) => `<p class="rvp" data-r="${[...new Set(rg[i].map((x) => x[2]))].join(' ')}">${marked(r.text, rg[i])} <span class="nm">${esc(r.name.trim())}</span></p>`).join('');
    return `<section class="sec rvK" id="reviews" aria-labelledby="rvK-h" data-th="${DEF}" data-sel="${DEF}">
      <div class="hd"><p class="kk">Reviews · in their words</p><h2 class="sec-h" id="rvK-h" data-split>What homeowners keep saying.</h2>
        <p class="sec-p">All 30 reviews we show, set as one page. Pick a theme to mark every place they said it.</p>
        <p class="rt"><b>4.9</b> from 474 Google reviews · 474 reviews. 30 of them here.</p></div>
      <div class="ths" role="group" aria-label="Mark a theme">${TH.map(([k, l]) => `<button type="button" class="th" data-k="${k}" aria-pressed="${k === DEF}" tabindex="${k === DEF ? 0 : -1}">${l}<b>${c[k]}</b></button>`).join('')}</div>
      <p class="say" aria-live="polite">${say(DEF, c)}</p>
      <div class="pg">${page}</div>
      <button type="button" class="all" aria-expanded="false">Show all 30 reviews</button>
      <p class="src">Excerpts as published on Google, unedited; "…" marks where the published excerpt ends. Highlights mark the exact words.</p></section>`;
  };

  function wire(root) {
    const s = root.querySelector('.rvK'); if (!s) return;
    const c = count(), bs = [...s.querySelectorAll('.th')], say2 = s.querySelector('.say'), all = s.querySelector('.all');
    const order = (k) => { let n = 0; s.querySelectorAll('mark').forEach((m) => { if ((m.dataset.t || '').split(' ').includes(k)) m.style.setProperty('--o', Math.min(n++, 40)); }); };
    const set = (k, focus) => { bs.forEach((b) => { const on = b.dataset.k === k; b.setAttribute('aria-pressed', on); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
      s.dataset.sel = k; s.dataset.th = ''; order(k); requestAnimationFrame(() => requestAnimationFrame(() => { s.dataset.th = k; })); say2.textContent = say(k, c); };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(b.dataset.k));
      b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); set(bs[(i + d + bs.length) % bs.length].dataset.k, true); }); });
    all.addEventListener('click', () => { const on = s.classList.toggle('showall'); all.setAttribute('aria-expanded', on); all.textContent = on ? 'Show only the marked reviews' : 'Show all 30 reviews'; });
    // the first marks sweep in when the page arrives
    order(DEF);
    if (!RM && 'IntersectionObserver' in window) { s.dataset.th = ''; const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { s.dataset.th = bs.find((b) => b.getAttribute('aria-pressed') === 'true').dataset.k; io.disconnect(); } }, { threshold: 0.2 }); io.observe(s.querySelector('.pg')); }
  }
  return { K, wire, TH };
})();
