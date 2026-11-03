/* REVIEWS E and F (overnight ladder, Round 17). Source: the 30 Google reviews published on the firm's site
   (window.__REV), verbatim. Nothing is paraphrased; excerpts that end in "…" are cut exactly where the site cuts them.
   No per-review stars; the only rating is 4.9 from 474.
   E — the names they mention (Cowboy: family-fronted warmth — the people). The staff names customers mention, counted
       across the published reviews; choose a name to read the exact sentences that mention it.
   F — all 30, searchable (Lando Norris: the archive, presented whole). Every published excerpt as a wall of cards;
       search the words, or filter by the trade a review mentions. */
window.Rev3 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const R = () => window.__REV || [];
  const STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>';
  const agg = `<p class="ag3"><b>4.9</b><span class="stz">${STAR.repeat(5)}</span>from 474 Google reviews</p>`;
  // a name and the spellings customers used for it
  const NAMES = [['Garrett', /\bGarrett?\b/], ['Kevin', /\bKevin\b/], ['Paul', /\bPaul\b/], ['Tracy', /\bTracy\b/], ['Taylor', /\bTaylor\b/], ['Jerry', /\bJerry\b/], ['Jake', /\bJake\b/], ['Maria', /\bMaria\b/], ['Shorty', /\bShorty\b/]];
  const sentences = (t) => t.match(/[^.!?…]+(?:[.!?…]+|$)/g) || [t];
  function mentions() { return NAMES.map(([n, re]) => { const hits = []; R().forEach((r) => { const ss = sentences(r.text).map((x) => x.trim()).filter((x) => re.test(x)); if (ss.length) hits.push({ who: r.name, src: r.source, ss }); }); return { n, hits }; }).filter((x) => x.hits.length).sort((a, b) => b.hits.length - a.hits.length); }

  /* ---------- E ---------- */
  const E = () => { const M = mentions(), max = M.length ? M[0].hits.length : 1;
    return `<section class="sec rvE" id="reviews" aria-labelledby="rvE-h">
      <div class="hd"><div><h2 class="sec-h" id="rvE-h" data-split>The names they mention.</h2><p class="sec-p">Customers often name the people who did their job. Counted across the ${R().length} reviews published on our site; choose a name to read what was said.</p></div>${agg}</div>
      <div class="wrap"><ol class="nl">${M.map((m, i) => `<li><button type="button" data-i="${i}" aria-pressed="${!i}"><span class="nm">${m.n}</span><span class="bar" aria-hidden="true"><i style="--w:${(m.hits.length / max).toFixed(3)}"></i></span><span class="c">${m.hits.length}<small> review${m.hits.length > 1 ? 's' : ''}</small></span></button></li>`).join('')}</ol>
        <div class="said" data-solid aria-live="polite">${M.map((m, i) => `<div class="pg" data-i="${i}" ${i ? 'hidden' : ''}><p class="k">What customers said about ${m.n}</p>${m.hits.map((h) => `<figure><blockquote>${h.ss.map((x) => `<p>${esc(x)}</p>`).join('')}</blockquote><figcaption>${esc(h.who)}, ${esc(h.src)}</figcaption></figure>`).join('')}</div>`).join('')}</div></div>
      <p class="note">Counted by first name as customers wrote it, so one name can cover more than one person (three reviewers name Paul Hale and two name Paul Schantz). Sentences are quoted exactly as published, including customers' own spellings.</p></section>`; };

  function wireE(root) {
    const s = root.querySelector('.rvE'); if (!s) return; const bs = [...s.querySelectorAll('.nl button')], pgs = [...s.querySelectorAll('.pg')];
    const go = (i) => { bs.forEach((b, k) => b.setAttribute('aria-pressed', k === i)); pgs.forEach((p, k) => { p.hidden = k !== i; if (k === i) { p.classList.remove('in'); void p.offsetWidth; p.classList.add('in'); } }); };
    bs.forEach((b, i) => { b.addEventListener('click', () => go(i)); b.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); const n = (i + d + bs.length) % bs.length; bs[n].focus(); go(n); } }); });
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.3 }).observe(s.querySelector('.nl'));
  }

  /* ---------- F ---------- */
  const TR = [['all', 'All'], ['siding', 'Siding', /siding|hardie/i], ['windows', 'Windows', /window/i], ['roof', 'Roofing', /roof|shingle/i], ['clean', 'Clean-up', /clean|swept/i]];
  const F = () => `<section class="sec rvF" id="reviews" aria-labelledby="rvF-h">
    <div class="hd"><div><h2 class="sec-h" id="rvF-h" data-split>All ${R().length}, in their words.</h2><p class="sec-p">Every review published on our site, as published. Search the words or filter by what a review mentions.</p></div>${agg}</div>
    <div class="tools"><label class="srch"><span class="sr">Search the reviews</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg><input type="search" placeholder="Search: quiet, clean, Garrett…" autocomplete="off"></label>
      <div class="flt" role="group" aria-label="Mentions">${TR.map(([k, n], i) => `<button type="button" data-f="${k}" aria-pressed="${!i}">${n}</button>`).join('')}</div><p class="ct" aria-live="polite"></p></div>
    <ul class="wall">${R().map((r, i) => `<li class="cd" data-i="${i}"><blockquote><p>${esc(r.text)}</p></blockquote><p class="who"><b>${esc(r.name)}</b><span>${esc(r.source)}</span></p></li>`).join('')}</ul>
    <p class="none" hidden>No review mentions that. Try another word.</p></section>`;

  function wireF(root) {
    const s = root.querySelector('.rvF'); if (!s) return; const cds = [...s.querySelectorAll('.cd')], q = s.querySelector('input'), ct = s.querySelector('.ct'), none = s.querySelector('.none');
    const base = cds.map((c) => ({ c, p: c.querySelector('blockquote p'), t: R()[+c.dataset.i].text }));
    let f = 'all', raf = 0;
    const run = () => { raf = 0; const w = q.value.trim().toLowerCase(), re = (TR.find((x) => x[0] === f) || [])[2]; let n = 0;
      base.forEach(({ c, p, t }) => { const ok = (!re || re.test(t)) && (!w || t.toLowerCase().includes(w)); c.hidden = !ok; if (ok) n++;
        if (w && ok) { const i = t.toLowerCase().indexOf(w); p.innerHTML = esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + w.length)) + '</mark>' + esc(t.slice(i + w.length)); } else p.textContent = t; });
      ct.textContent = `${n} of ${base.length} reviews`; none.hidden = n > 0; };
    q.addEventListener('input', () => { if (!raf) raf = requestAnimationFrame(run); });
    s.querySelectorAll('.flt button').forEach((b) => b.addEventListener('click', () => { f = b.dataset.f; s.querySelectorAll('.flt button').forEach((x) => x.setAttribute('aria-pressed', x === b)); run(); }));
    run();
    if (RM) s.classList.add('in'); else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('in'); } }), { threshold: 0.1 }).observe(s.querySelector('.wall'));
  }
  return { E, F, wire(root) { wireE(root); wireF(root); } };
})();
