/* REVIEWS PAGE · 2 The reviews. All thirty published Google reviews (window.__REV), each with its text exactly as
   published and the reviewer's name as published; where the published excerpt stops mid-sentence it ends with "…". No
   per-review stars, no dates (none are published with them), no edits.
   A — the full wall (Cowboy: everything on the wall). All thirty in columns, full published text.
   B — sorted your way (Cash App Brand Guidelines: one control, one list). Shortest first, longest first, or by name.
   C — index and reader (Apple AirPods Pro: one at a time). The names down one side; the chosen review in a reading pane. */
window.PRv2 = (function () {
  const B = () => window.PB;
  const R = () => (window.__REV || []).map((r, i) => ({ i, name: String(r.name).trim(), text: String(r.text).trim() }));
  const body = (t) => `${B().esc(t)}${/[.!?)"”']$/.test(t) ? '' : '…'}`;
  const card = (r) => `<figure class="rc2"><blockquote><p>${body(r.text)}</p></blockquote><figcaption><b>${B().esc(r.name)}</b><span>Google review</span></figcaption></figure>`;

  const A = () => `<section class="sec rv2A" id="reviews-all" aria-labelledby="rv2A-h">
    <div class="hd"><h2 class="sec-h" id="rv2A-h" data-split>All thirty, as published.</h2><p class="sec-p">474 reviews. 30 of them here, word for word. 4.9 from 474 Google reviews.</p></div>
    <div class="wall3">${R().map(card).join('')}</div></section>`;

  const SORTS = [['Shortest first', (a, b) => a.text.length - b.text.length], ['Longest first', (a, b) => b.text.length - a.text.length], ['By name', (a, b) => a.name.localeCompare(b.name)]];
  const Bv = () => `<section class="sec rv2B" id="reviews-all" aria-labelledby="rv2B-h">
    <div class="hd"><h2 class="sec-h" id="rv2B-h" data-split>Read them your way.</h2><p class="sec-p">All 30 published reviews, word for word.</p></div>
    <div class="srt2" role="radiogroup" aria-label="Order">${SORTS.map(([t], k) => `<button type="button" role="radio" aria-checked="${!k}" tabindex="${k ? -1 : 0}" data-k="${k}">${t}</button>`).join('')}</div>
    <div class="lst7" aria-live="polite">${R().sort(SORTS[0][1]).map(card).join('')}</div></section>`;

  const C = () => { const L = R().sort((a, b) => a.name.localeCompare(b.name));
    return `<section class="sec rv2C" id="reviews-all" aria-labelledby="rv2C-h">
    <div class="hd"><h2 class="sec-h" id="rv2C-h" data-split>Thirty reviewers. Choose one.</h2><p class="sec-p">Word for word, as published. 4.9 from 474 Google reviews.</p></div>
    <div class="wrap"><div class="idx" role="listbox" aria-label="Reviewers" tabindex="0" aria-activedescendant="rv2C-o0">${L.map((r, k) => `<div role="option" id="rv2C-o${k}" aria-selected="${!k}" data-k="${k}">${B().esc(r.name)}</div>`).join('')}</div>
      <div class="rdr" aria-live="polite">${card(L[0])}</div></div></section>`; };

  function wireB(root) { const s = root.querySelector('.rv2B'); if (!s) return; const bs = [...s.querySelectorAll('.srt2 button')], box = s.querySelector('.lst7');
    const set = (k, f) => { bs.forEach((b, j) => { b.setAttribute('aria-checked', j === k); b.tabIndex = j === k ? 0 : -1; }); if (f) bs[k].focus(); box.innerHTML = R().sort(SORTS[k][1]).map(card).join(''); };
    bs.forEach((b, k) => { b.addEventListener('click', () => set(k)); b.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set((k + d + bs.length) % bs.length, true); } }); }); }
  function wireC(root) { const s = root.querySelector('.rv2C'); if (!s) return; const L = R().sort((a, b) => a.name.localeCompare(b.name)), lb = s.querySelector('.idx'), os = [...lb.children], rd = s.querySelector('.rdr'); let k = 0;
    const set = (n, scroll) => { k = Math.max(0, Math.min(os.length - 1, n)); os.forEach((o, j) => o.setAttribute('aria-selected', j === k)); lb.setAttribute('aria-activedescendant', 'rv2C-o' + k); rd.innerHTML = card(L[k]); if (scroll) os[k].scrollIntoView({ block: 'nearest' }); };
    os.forEach((o, j) => o.addEventListener('click', () => { set(j); lb.focus(); }));
    lb.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowUp: -1 }[e.key]; if (d) { e.preventDefault(); set(k + d, true); } if (e.key === 'Home') { e.preventDefault(); set(0, true); } if (e.key === 'End') { e.preventDefault(); set(os.length - 1, true); } }); }
  return { A, B: Bv, C, wire(root) { wireB(root); wireC(root); } };
})();
