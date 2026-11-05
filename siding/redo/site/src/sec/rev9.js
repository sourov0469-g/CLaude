/* REVIEWS N (new-versions addendum, pass 4) — "Your worry, their words". Reference: Ever, verified craft only (the
   apartment selection and filtering presentation: filters above, the result set re-flowing beneath with every item
   gliding to its place, a live count). Not its pairs, which the annex bars. Six worries homeowners have about hiring a
   contractor; pick one and the published reviews that speak to it glide forward, each showing the sentence that answers
   it with the exact words highlighted. Source: the 30 Google reviews published on the firm's site (window.__REV),
   verbatim. Every evidence phrase is hand-checked, occurs once in its review, and is in the build's verbatim lock
   (Rev9.PICK). No per-review stars; the only rating is 4.9 from 474. */
window.Rev9 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  // [worry label, [[review index, exact phrase], …]] in the order the reviews are published
  const W = [
    ['The mess they leave', [[2, 'made sure everything was clean before they left'], [10, 'swept the pollen off my deck'], [11, 'the work site was all cleaned up'], [12, 'They were very professional and clean.'],
      [15, 'The site was clean when they left'], [18, 'took care of the space'], [19, 'Clean up and walk through was great'], [21, 'they kept the job site clean each day after working'],
      [28, 'The house and yard was cleaner when they left than it was when they got here.']]],
    ['Being kept in the dark', [[1, 'The communication was great.'], [7, 'regularly reached out to me'], [8, 'They kept the communication open the whole time'], [9, 'Communication was great and prompt.'],
      [16, 'Communication was great throughout the whole process'], [17, 'He followed up and answered many questions.'], [20, 'sent me photos immediately to reassure me'], [29, 'walking us through every question that came up']]],
    ['Sales pressure', [[14, 'There was no pressure.'], [26, 'without any high-pressure sales tactics'], [29, 'a great, no pressure estimate']]],
    ['A job that drags on', [[0, 'Fast, affordable & beautiful work.'], [2, 'completed professionally and quickly'], [3, 'fix everything WITHIN DAYS'], [6, 'arrived in a timely manner'], [9, 'within 24 hours'],
      [15, 'put on a new one in one day'], [19, 'getting the job done very quickly'], [20, 'scheduled a free estimate the day after I requested assistance'], [22, 'He responded fast'],
      [23, 'work was completed on schedule'], [27, 'install was fast and efficient'], [28, 'just finished my windows in one day']]],
    ['Paying too much', [[0, 'affordable'], [1, 'for a fraction of the price as compared to the next guy'], [3, 'Pricing is affordable'], [6, 'gave us a great quote'], [7, 'They gave a great quote'],
      [14, 'at half the price of the others'], [19, 'the most affordable quote I received for very high quality windows'], [26, 'a fair and transparent estimate'], [27, 'pricing was very competitive']]],
    ['Loose ends at the end', [[1, 'Garret did a good job on the punch out.'], [5, 'they are most willing and able to address them'], [11, 'all the punch list items were done'],
      [13, 'Garrett was extremely thorough with punch out'], [25, 'they made sure to take care of any problems they ran across']]]];
  const PICK = W.flatMap((w) => w[1]);
  const REV = () => globalThis.__REV || [];
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const mark = (t, ph) => { const i = t.indexOf(ph); return i < 0 ? esc(t) : esc(t.slice(0, i)) + '<mark>' + esc(ph) + '</mark>' + esc(t.slice(i + ph.length)); };
  // the sentence that holds the phrase: back to the previous ". ", "! " or "? ", on to the next . ! ? or …
  const sentence = (t, ph) => { const i = t.indexOf(ph); if (i < 0) return ph;
    let a = 0; for (const m of t.slice(0, i).matchAll(/[.!?…]\s+/g)) a = m.index + m[0].length;
    const rest = t.slice(i + ph.length), m = /[.!?…]/.exec(rest); const b = m ? i + ph.length + m.index + 1 : t.length; return t.slice(a, b); };
  const card = (k, ev) => { const r = REV()[k] || { text: '', name: '', source: '' };
    return `<li class="rncard" data-k="${k}"${ev ? '' : ' hidden'}><blockquote class="rnev"><p>${ev ? '“' + ev[0] + '”' : ''}</p></blockquote>
      <p class="rnwho"><b>${esc(r.name)}</b><span>${esc(r.source)}</span></p>
      <button type="button" class="rnmore" aria-expanded="false" aria-controls="rnf-${k}">Read the whole review</button>
      <p class="rnfull" id="rnf-${k}" hidden></p></li>`; };
  const fill = (w) => { const out = {}; W[w][1].forEach(([k, ph]) => { const t = (REV()[k] || {}).text || ''; out[k] = [mark(sentence(t, ph), ph), mark(t, ph)]; }); return out; };

  const N = () => { const f0 = fill(0), total = REV().length;
    const cards = REV().map((_, k) => card(k, f0[k])).join('');
    return `<section class="sec rnN" id="reviews" aria-labelledby="rnN-h">
    <div class="rnhd"><h2 class="sec-h" id="rnN-h" data-split>Your worry, their words.</h2>
      <p class="sec-p">Pick what worries you most about hiring a contractor. These are the homeowners, among the ${total} reviews we publish, who wrote about exactly that.</p></div>
    <div class="rnstage" data-solid>
      <div class="rnask"><p class="rnq" id="rnN-q">What worries you most about hiring a contractor?</p>
        <div class="rnws" role="radiogroup" aria-labelledby="rnN-q">${W.map((w, i) => `<button type="button" role="radio" class="rnw" data-w="${i}" aria-checked="${!i}" tabindex="${i ? -1 : 0}"><span>${w[0]}</span><b>${w[1].length}</b></button>`).join('')}</div>
        <p class="rnct"><b class="rnn">${W[0][1].length}</b> <span>of the ${total} reviews we publish speak to it.</span></p>
        <p class="rnrate">4.9 from 474 Google reviews</p></div>
      <ul class="rngrid" aria-label="Reviews that speak to it">${cards}</ul>
    </div>
    <div class="rnbar"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
      <p>Every word is from a published Google review, unedited; the highlight marks the words that answer the worry. Excerpts that end in “…” are cut where our site cuts them.</p></div>
    <p class="rnlive" aria-live="polite"></p></section>`; };

  function wire(root) {
    const s = root.querySelector('.rnN'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ws = [...s.querySelectorAll('.rnw')], grid = s.querySelector('.rngrid'), cards = new Map([...s.querySelectorAll('.rncard')].map((c) => [+c.dataset.k, c]));
    const num = s.querySelector('.rnn'), live = s.querySelector('.rnlive'), total = REV().length;
    let cur = 0;
    const close = (c) => { const b = c.querySelector('.rnmore'), f = c.querySelector('.rnfull'); b.setAttribute('aria-expanded', 'false'); b.textContent = 'Read the whole review'; f.hidden = true; };
    const apply = (w) => { const f = fill(w);
      cards.forEach((c, k) => { const on = k in f; c.hidden = !on; close(c);
        if (on) { c.querySelector('.rnev p').innerHTML = '“' + f[k][0] + '”'; c.querySelector('.rnfull').innerHTML = '“' + f[k][1] + '”'; } }); };
    const pick = (w, focus, say) => { if (w === cur && !say) return; cur = w;
      ws.forEach((b, i) => { b.setAttribute('aria-checked', i === w); b.tabIndex = i === w ? 0 : -1; if (i === w && focus) b.focus(); });
      // FLIP: remember where every visible card is, change the set, then glide each from there to here
      const first = new Map(); if (!RM) cards.forEach((c, k) => { if (!c.hidden) first.set(k, c.getBoundingClientRect()); });
      apply(w); const n = W[w][1].length; num.textContent = n;
      if (say) live.textContent = `${W[w][0]}: ${n} of the ${total} reviews we publish speak to it.`;
      if (RM) return; let j = 0;
      cards.forEach((c, k) => { if (c.hidden) return; const r = c.getBoundingClientRect(), f0 = first.get(k);
        if (f0) { const dx = f0.left - r.left, dy = f0.top - r.top; if (Math.abs(dx) + Math.abs(dy) > 1) c.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 560, easing: 'cubic-bezier(.22,1,.36,1)' }); }
        else c.animate([{ opacity: 0, transform: 'translateY(14px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 70 + 45 * j++, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }); });
      num.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' }); };
    ws.forEach((b, i) => { b.addEventListener('click', () => pick(i, false, true));
      b.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; let m = -1;
        if (d) m = (i + d + W.length) % W.length; else if (e.key === 'Home') m = 0; else if (e.key === 'End') m = W.length - 1;
        if (m >= 0) { e.preventDefault(); pick(m, true, true); } }); });
    grid.addEventListener('click', (e) => { const b = e.target.closest('.rnmore'); if (!b) return; const c = b.closest('.rncard'), f = c.querySelector('.rnfull'), open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', open); b.textContent = open ? 'Close the review' : 'Read the whole review'; f.hidden = !open; });
    apply(0);
  }
  return { N, wire, W, PICK };
})();
