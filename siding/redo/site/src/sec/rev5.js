/* REVIEWS I and J (overnight ladder, Round 19 — Reviews reaches 10). Source: the published reviews (window.__REV) and
   the verbatim lines already checked for Reviews G (Rev4.LINES). The only rating is 4.9 from 474; nothing here suggests
   how the 474 split by stars.
   I — one line, poster size (Dropbox Brand: type as the image). A single customer line set across the section at poster
       scale, words rising in; "Another" brings the next one.
   J — 474, and the 30 we show (Apple AirPods Pro: numbers as events). 474 small marks, one per Google review; the 30
       published on our site are lit, and choosing one opens it. */
window.Rev5 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const R = () => window.__REV || [];
  const L = () => (window.Rev4 ? Rev4.LINES : []);
  const STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>';
  const agg = `<p class="ag3"><b>4.9</b><span class="stz">${STAR.repeat(5)}</span>from 474 Google reviews</p>`;

  /* ---------- I ---------- */
  const PICK = [14, 21, 4, 17, 12, 22]; // indices into Rev4.LINES: short, strong lines
  const I = () => `<section class="sec rvI" id="reviews" aria-labelledby="rvI-h">
    <h2 class="sr" id="rvI-h">One customer's line</h2>
    <figure class="pst" aria-live="polite"><blockquote><p class="q"></p></blockquote><figcaption><b class="nm"></b><span class="sc"></span></figcaption></figure>
    <div class="bar">${agg}<button type="button" class="nx">Another<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button><span class="ct" aria-hidden="true"></span></div></section>`;

  function wireI(root) {
    const s = root.querySelector('.rvI'); if (!s) return; const q = s.querySelector('.q'), lines = PICK.map((k) => L()[k]).filter(Boolean); let cur = -1;
    const show = (i) => { cur = (i + lines.length) % lines.length; const [ri, t] = lines[cur], r = R()[ri] || {}; q.setAttribute('aria-label', t); q.textContent = '';
      ('“' + t + '”').split(/(\s+)/).forEach((w, k) => { if (!w.trim()) { q.append(w); return; } const sp = document.createElement('span'); sp.className = 'w'; sp.setAttribute('aria-hidden', 'true'); const i2 = document.createElement('span'); i2.textContent = w; i2.style.setProperty('--i', k); sp.append(i2); q.append(sp); });
      s.querySelector('figcaption .nm').textContent = r.name || ''; s.querySelector('figcaption .sc').textContent = r.source || ''; s.querySelector('.ct').textContent = `${cur + 1} / ${lines.length}`;
      q.classList.remove('in'); void q.offsetWidth; requestAnimationFrame(() => q.classList.add('in')); };
    s.querySelector('.nx').addEventListener('click', () => show(cur + 1)); show(0);
  }

  /* ---------- J ---------- */
  const J = () => { const n = R().length, total = 474; let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const lit = new Set(); while (lit.size < n) lit.add(Math.floor(rnd() * total)); const order = [...lit].sort((a, b) => a - b);
    let marks = ''; for (let i = 0; i < total; i++) { const k = order.indexOf(i); marks += k >= 0 ? `<button type="button" class="m lit" data-r="${k}" aria-label="Open the review by ${esc((R()[k] || {}).name || '')}" style="--d:${i}"></button>` : `<i class="m" style="--d:${i}"></i>`; }
    return `<section class="sec rvJ" id="reviews" aria-labelledby="rvJ-h">
      <div class="hd"><div><h2 class="sec-h" id="rvJ-h" data-split>474 reviews. ${n} of them here.</h2><p class="sec-p">Each mark is one Google review. The ${n} lit ones are published on our site; choose one to read it.</p></div>${agg}</div>
      <div class="wrap"><div class="grid" data-solid role="group" aria-label="${total} reviews, ${n} of them published here">${marks}</div>
        <figure class="op" aria-live="polite"><p class="k">Choose a lit mark</p><blockquote><p></p></blockquote><figcaption></figcaption></figure></div>
      <p class="note">The marks are not ordered by rating or date; the overall rating, 4.9 from 474, is the only figure shown.</p></section>`; };

  function wireJ(root) {
    const s = root.querySelector('.rvJ'); if (!s) return; const op = s.querySelector('.op'), lits = [...s.querySelectorAll('.m.lit')];
    const open = (b) => { lits.forEach((x) => x.classList.toggle('on', x === b)); const r = R()[+b.dataset.r] || {}; op.querySelector('.k').textContent = 'Published on our site';
      op.querySelector('blockquote p').textContent = r.text || ''; op.querySelector('figcaption').textContent = `${r.name || ''}, ${r.source || ''}`; op.classList.remove('in'); void op.offsetWidth; op.classList.add('in'); };
    lits.forEach((b) => { b.addEventListener('click', () => open(b)); b.addEventListener('focus', () => open(b)); });
    open(lits[0]);
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.25 }).observe(s.querySelector('.grid'));
  }
  return { I, J, wire(root) { wireI(root); wireJ(root); } };
})();
