/* REVIEWS PAGE · 3 People they name. The names homeowners use in the thirty published reviews (window.__REV), and the
   sentences they use them in, verbatim (split from the published text, never edited). No roles are given: the reviews do
   not state them. "Paul" alone is ambiguous (reviewers name both Paul Hale and Paul Schantz), so a bare "Paul" is not
   counted under either. Counts are "named in N of the 30 published reviews".
   A — name cards (Cash App Brand Guidelines: one card per person). Each name, how many of the 30 name them, and one line.
   B — hello, my name is (Cowboy: warm, the crew's own badges). Name badges; choose one to read every line naming them.
   C — names in the sentence (Dropbox Brand: type first). Every sentence that names someone, names highlighted; filter by
       name. */
window.PRv3 = (function () {
  const B = () => window.PB;
  const R = () => window.__REV || [];
  const P = [['Kevin', /\bKevin\b/], ['Garrett', /\bGarrett?\b/], ['Tracy', /\bTracy\b/], ['Paul Hale', /\bPaul Hale\b/], ['Paul Schantz', /\bPaul Schantz/], ['Taylor', /\bTaylor\b/], ['Jake', /\bJake\b/], ['Jerry', /\bJerry\b/], ['Maria', /\bMaria\b/], ['Shorty', /\bShorty\b/]];
  const sents = () => { const out = []; R().forEach((r, i) => String(r.text).split(/(?<=[.!?])\s+/).forEach((s) => { const t = s.trim(); if (P.some(([, re]) => re.test(t))) out.push({ i, name: String(r.name).trim(), t }); })); return out; };
  const who = () => P.map(([n, re]) => { const rs = R().map((r, i) => (re.test(r.text) ? i : -1)).filter((i) => i >= 0); const S = sents().filter((s) => re.test(s.t)); return { n, re, k: rs.length, S }; }).filter((x) => x.k);
  const line = (s) => `<figure class="nl2"><blockquote><p>“${B().esc(s.t)}”</p></blockquote><figcaption>${B().esc(s.name)} · Google review</figcaption></figure>`;
  const hl = (t) => P.reduce((a, [n, re]) => a.replace(new RegExp(re.source, 'g'), (m) => `<mark>${m}</mark>`), B().esc(t));

  const A = () => `<section class="sec rv3A" id="reviews-names" aria-labelledby="rv3A-h">
    <div class="hd"><h2 class="sec-h" id="rv3A-h" data-split>The people they name.</h2><p class="sec-p">Names as homeowners wrote them, in our 30 published reviews. A plain "Paul" is not counted, because reviewers name both Paul Hale and Paul Schantz.</p></div>
    <ul class="nc">${who().map((x) => `<li><p class="nm3">${x.n}</p><p class="k5">Named in <b>${x.k}</b> of the 30</p>${line(x.S[0])}</li>`).join('')}</ul></section>`;

  const Bv = () => `<section class="sec rv3B" id="reviews-names" aria-labelledby="rv3B-h">
    <div class="hd"><h2 class="sec-h" id="rv3B-h" data-split>Hello, my name is…</h2><p class="sec-p">Choose a name to read every line that names them, word for word.</p></div>
    <div class="bdg" role="radiogroup" aria-label="Name">${who().map((x, i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-i="${i}"><small>Hello, my name is</small><b>${x.n}</b></button>`).join('')}</div>
    <div class="out3" aria-live="polite"></div></section>`;

  const C = () => { const S = sents(); return `<section class="sec rv3C" id="reviews-names" aria-labelledby="rv3C-h">
    <div class="hd"><h2 class="sec-h" id="rv3C-h" data-split>Names, in their sentences.</h2><p class="sec-p">Every sentence in our 30 published reviews that names someone. Filter by name.</p></div>
    <div class="fl4" role="radiogroup" aria-label="Name">${['All', ...who().map((x) => x.n)].map((n, i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-n="${n}">${n}</button>`).join('')}</div>
    <ol class="sn2">${S.map((s) => `<li data-t="${B().esc(s.t)}"><p>“${hl(s.t)}”</p><span>${B().esc(s.name)}</span></li>`).join('')}</ol></section>`; };

  function wireB(root) { const s = root.querySelector('.rv3B'); if (!s) return; const W = who(), bs = [...s.querySelectorAll('.bdg button')], out = s.querySelector('.out3');
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); out.innerHTML = `<p class="k6"><b>${W[i].n}</b>: named in ${W[i].k} of the 30 published reviews.</p>${W[i].S.map(line).join('')}`; };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); }); set(0); }
  function wireC(root) { const s = root.querySelector('.rv3C'); if (!s) return; const bs = [...s.querySelectorAll('.fl4 button')], li = [...s.querySelectorAll('.sn2 li')];
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); const n = bs[i].dataset.n, re = (P.find((p) => p[0] === n) || [])[1]; li.forEach((x) => (x.hidden = !!re && !re.test(x.dataset.t))); };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); }); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
