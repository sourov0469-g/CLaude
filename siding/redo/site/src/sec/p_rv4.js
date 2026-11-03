/* REVIEWS PAGE · 4 By the work done. The thirty published reviews (window.__REV) grouped by the work their own words
   mention (siding, windows, roofs, doors, gutters, paint). Text verbatim; a review that mentions two kinds of work sits
   in both. Counts read "mention it in N of the 30 published reviews".
   A — tabs by trade (Cash App Brand Guidelines: one control). ARIA tabs; each panel holds the full reviews that mention it.
   B — six columns (Dropbox Brand: one grid). Six columns, one per kind of work; under each, the reviewer and the sentence
       that mentions it.
   C — what's your project? (Cowboy: a plain question). Choose your project; read how many of the 30 mention it and the
       sentences from three of them. */
window.PRv4 = (function () {
  const B = () => window.PB;
  const R = () => (window.__REV || []).map((r, i) => ({ i, name: String(r.name).trim(), text: String(r.text).trim() }));
  const G = [['siding', 'Siding', /siding|hardie/i], ['windows', 'Windows', /window/i], ['roofs', 'Roofs', /roof|shingle/i], ['doors', 'Doors', /\bdoors?\b/i], ['gutters', 'Gutters', /gutter/i], ['paint', 'Paint', /\bpaint/i]];
  const of = (re) => R().filter((r) => re.test(r.text));
  const sent = (r, re) => (r.text.split(/(?<=[.!?])\s+/).find((s) => re.test(s)) || '').trim();
  const body = (t) => `${B().esc(t)}${/[.!?)"”']$/.test(t) ? '' : '…'}`;
  const full = (r) => `<figure class="rf3"><blockquote><p>${body(r.text)}</p></blockquote><figcaption><b>${B().esc(r.name)}</b> · Google review</figcaption></figure>`;

  const A = () => `<section class="sec rv4A" id="reviews-work" aria-labelledby="rv4A-h">
    <div class="hd"><h2 class="sec-h" id="rv4A-h" data-split>Reviews, by the work done.</h2><p class="sec-p">Grouped by what each review mentions, in its own words. A review that mentions two things sits under both.</p></div>
    <div class="tbl2" role="tablist" aria-label="Work">${G.map(([k, t, re], i) => `<button type="button" role="tab" id="rv4A-t${i}" aria-controls="rv4A-p${i}" aria-selected="${!i}" tabindex="${i ? -1 : 0}">${t} <span>${of(re).length}</span></button>`).join('')}</div>
    ${G.map(([k, t, re], i) => `<div class="tp5" role="tabpanel" id="rv4A-p${i}" aria-labelledby="rv4A-t${i}" ${i ? 'hidden' : ''}><p class="k7">${t}: mentioned in ${of(re).length} of the 30 published reviews.</p><div class="g6">${of(re).map(full).join('')}</div></div>`).join('')}</section>`;

  const Bv = () => `<section class="sec rv4B" id="reviews-work" aria-labelledby="rv4B-h">
    <div class="hd"><h2 class="sec-h" id="rv4B-h" data-split>Six kinds of work, in their words.</h2><p class="sec-p">Under each, the reviewer and the sentence that mentions it.</p></div>
    <div class="cols5">${G.map(([k, t, re]) => `<div class="c6"><h3>${t}<span>${of(re).length} of 30</span></h3><ul>${of(re).map((r) => `<li><p>“${body(sent(r, re))}”</p><b>${B().esc(r.name)}</b></li>`).join('')}</ul></div>`).join('')}</div></section>`;

  const C = () => `<section class="sec rv4C" id="reviews-work" aria-labelledby="rv4C-h">
    <div class="hd"><h2 class="sec-h" id="rv4C-h" data-split>What's your project?</h2></div>
    <div class="ask" role="radiogroup" aria-label="Your project">${G.map(([k, t], i) => `<button type="button" role="radio" aria-checked="${!i}" tabindex="${i ? -1 : 0}" data-i="${i}">${t}</button>`).join('')}</div>
    <div class="ans2" aria-live="polite"></div></section>`;

  function wireA(root) { const s = root.querySelector('.rv4A'); if (!s) return; const ts = [...s.querySelectorAll('[role=tab]')], ps = [...s.querySelectorAll('[role=tabpanel]')];
    const set = (i, f) => { ts.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; }); ps.forEach((p, k) => (p.hidden = k !== i)); if (f) ts[i].focus(); };
    ts.forEach((t, i) => { t.addEventListener('click', () => set(i)); t.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + ts.length) % ts.length, true); } if (e.key === 'Home') { e.preventDefault(); set(0, true); } if (e.key === 'End') { e.preventDefault(); set(ts.length - 1, true); } }); }); }
  function wireC(root) { const s = root.querySelector('.rv4C'); if (!s) return; const bs = [...s.querySelectorAll('.ask button')], out = s.querySelector('.ans2');
    const set = (i, f) => { bs.forEach((b, k) => { b.setAttribute('aria-checked', k === i); b.tabIndex = k === i ? 0 : -1; }); if (f) bs[i].focus(); const [, t, re] = G[i], L = of(re).sort((a, b) => b.text.length - a.text.length).slice(0, 3);
      out.innerHTML = `<p class="big5"><b>${of(re).length}</b> of our 30 published reviews mention ${t.toLowerCase()}.</p><div class="three">${L.map((r) => `<figure><blockquote><p>“${body(sent(r, re))}”</p></blockquote><figcaption>${B().esc(r.name)}</figcaption></figure>`).join('')}</div>`; };
    bs.forEach((b, i) => { b.addEventListener('click', () => set(i)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((i + d + bs.length) % bs.length, true); } }); }); set(0); }
  return { A, B: Bv, C, wire(root) { wireA(root); wireC(root); } };
})();
