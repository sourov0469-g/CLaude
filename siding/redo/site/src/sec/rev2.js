/* REVIEWS, new versions for upgrade Round 3. Every quote is a verbatim excerpt of a Google review published on the firm's
   site (work/data/reviews.json as window.__REV), checked at build time. No per-review stars; the only rating is 4.9 from 474.
   C — read at reading pace (Apple AirPods Pro: a pinned stage where scroll paces the words; S1327 scroll-scrubbed word
       reveal): four reviews, one at a time, each becoming readable word by word as the visitor scrolls.
   D — ask the neighbours (Cowboy: warm, restrained, family-fronted trust; Erie Home, note only: FAQ grammar): five common
       questions, each answered only by what reviewers wrote. */
window.Rev2 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>';
  const stars5 = (fill) => `<span class="st5" style="--f:${fill}%" aria-hidden="true"><span class="bg">${STAR.repeat(5)}</span><span class="fg">${STAR.repeat(5)}</span></span>`;
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const R = () => (window.__REV || []);
  const who = (i) => { const r = R()[i] || {}; return { name: r.name || '', src: r.source || 'Google review' }; };
  const agg = () => `<div class="agg"><b>4.9</b>${stars5(98)}<span>from 474 Google reviews</span></div>`;

  /* ---------- C ---------- */
  const CQ = [[14, 'They only took 15 minutes to measure and understand the job rather than taking hours of my time, gave me a detailed estimate about an hour later at half the price of the others. There was no pressure.', 'Estimate'],
    [28, 'The house and yard was cleaner when they left than it was when they got here.', 'Windows'],
    [23, 'Very professional staff, easy process and work was completed on schedule.', 'Windows'],
    [4, 'It’s a breath of fresh air for a contractor to really do what they say!', 'Siding, paint, deck & gutters']];
  const words = (t) => t.split(/(\s+)/).map((w) => (w.trim() ? `<span class="wd">${esc(w)}</span>` : w)).join('');
  const C = () => `<section class="sec rvC" id="reviews" aria-labelledby="rvC-h" style="--n:${CQ.length}"><div class="stage">
      <div class="top"><h2 class="sec-h" id="rvC-h" data-split>In their words, read slowly.</h2>${agg()}
        <div class="ct" aria-hidden="true"><b>01</b> / ${String(CQ.length).padStart(2, '0')}<span class="seg">${CQ.map(() => '<i><u></u></i>').join('')}</span></div></div>
      <div class="qs">${CQ.map(([i, t, tr], k) => { const w = who(i); return `<figure class="q${k ? '' : ' on'}" data-k="${k}">
        <svg class="mk" viewBox="0 0 80 60" aria-hidden="true"><path d="M30 6C14 12 6 24 6 38c0 9 6 16 14 16s13-6 13-13-6-12-13-12c0-8 5-15 13-19M72 6C56 12 48 24 48 38c0 9 6 16 14 16s13-6 13-13-6-12-13-12c0-8 5-15 13-19" pathLength="1"/></svg>
        <blockquote><p>${words(t)}</p></blockquote><figcaption><b>${esc(w.name)}</b><span>${esc(w.src)} · ${tr}</span></figcaption></figure>`; }).join('')}</div>
      <p class="note">Excerpts, verbatim, from reviews published on our site.</p></div></section>`;

  function wireC(root) {
    const s = root.querySelector('.rvC'); if (!s) return;
    const qs = [...s.querySelectorAll('.q')], segs = [...s.querySelectorAll('.seg u')], ct = s.querySelector('.ct b');
    const W = qs.map((q) => [...q.querySelectorAll('.wd')]);
    const flow = () => innerWidth <= 860 || RM; let raf = 0, cur = -1;
    const paint = (k, r) => { const ws = W[k], n = ws.length; ws.forEach((w, i) => { const v = Math.max(0, Math.min(1, r * (n + 2) - i)); if (w._v !== v) { w._v = v; w.style.setProperty('--w', v.toFixed(3)); } });
      qs[k].classList.toggle('read', r >= 1); qs[k].style.setProperty('--r', r.toFixed(3)); };
    function upd() { raf = 0;
      if (flow()) { s.classList.add('flow'); qs.forEach((q, k) => { const t = q.getBoundingClientRect().top; paint(k, RM ? 1 : Math.max(0, Math.min(1, (innerHeight * 0.9 - t) / (innerHeight * 0.5)))); q.classList.add('on'); }); return; }
      s.classList.remove('flow'); const r = s.getBoundingClientRect(), tot = s.offsetHeight - innerHeight, p = Math.max(0, Math.min(0.9999, -r.top / Math.max(1, tot))), f = p * qs.length, k = Math.floor(f), l = f - k;
      if (k !== cur) { qs.forEach((q, j) => { q.classList.toggle('on', j === k); q.classList.toggle('past', j < k); }); ct.textContent = String(k + 1).padStart(2, '0'); cur = k; }
      qs.forEach((q, j) => paint(j, j < k ? 1 : j > k ? 0 : Math.min(1, l / 0.66)));
      segs.forEach((u, j) => u.style.transform = `scaleX(${Math.max(0, Math.min(1, f - j)).toFixed(3)})`); }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd); upd();
  }

  /* ---------- D ---------- */
  const DQ = [
    ['Will I get a sales pitch at the estimate?', [[14, 'After contacting other businesses and getting high-pressure sales tactics with zero details in their estimates, we reached out to Austin Pro.'],
      [26, 'Jake handled our initial bid and was incredibly thorough, providing a fair and transparent estimate without any high-pressure sales tactics.'],
      [29, 'Tracy provided us with a great, no pressure estimate along with a comprehensive package of info that detailed the entire process.']]],
    ['How long will the work take?', [[28, 'Austin pro just finished my windows in one day!'], [15, 'They ripped off the old roof and put on a new one in one day.'],
      [19, 'It took about 6 weeks for measuring, ordering and installing.']]],
    ['Will they clean up after themselves?', [[21, 'There crews were professional and they kept the job site clean each day after working.'],
      [10, 'Also special shout out to Garrett who finished up and also swept the pollen off my deck!'],
      [11, 'Once all the new windows were installed, siding, painting and all the punch list items were done, the work site was all cleaned up.']]],
    ['Will I hear from them while it’s happening?', [[7, 'Garrett and Kevin were both very responsive to my concerns and regularly reached out to me, which is not a guarantee with contractors or vendors.'],
      [8, 'They kept the communication open the whole time and I was truly impressed by the professionalism and attention to details with this job.'],
      [16, 'Communication was great throughout the whole process and the end product looks amazing!']]],
    ['What difference do new windows make?', [[17, 'Wow what a difference our new windows have made, our home is so QUIET!'],
      [19, 'They were also the most affordable quote I received for very high quality windows.']]]];
  const MARK = '<svg class="mk" viewBox="0 0 80 60" aria-hidden="true"><path d="M30 6C14 12 6 24 6 38c0 9 6 16 14 16s13-6 13-13-6-12-13-12c0-8 5-15 13-19M72 6C56 12 48 24 48 38c0 9 6 16 14 16s13-6 13-13-6-12-13-12c0-8 5-15 13-19" pathLength="1"/></svg>';
  const D = () => `<section class="sec rvD" id="reviews" aria-labelledby="rvD-h">
      <div class="hd"><div><h2 class="sec-h" id="rvD-h" data-split>Ask the neighbours.</h2><p class="sec-p">Common questions, answered only in the words of Google reviewers. Every excerpt is verbatim.</p></div>${agg()}</div>
      <div class="qa" style="--q:${DQ.length}">${DQ.map(([q, A], k) => `<h3 class="qh"><button type="button" id="rvD-b${k}" aria-expanded="${!k}" aria-controls="rvD-p${k}"><span class="no">${String(k + 1).padStart(2, '0')}</span><span class="qt">${q}</span><i class="pm" aria-hidden="true"></i></button></h3>
        <div class="pan${k ? '' : ' on'}" id="rvD-p${k}" role="region" aria-labelledby="rvD-b${k}" ${k ? 'hidden' : ''}><div class="in"><p class="pq" aria-hidden="true">${q}</p>${MARK}
          ${A.map(([i, t], j) => { const w = who(i); return `<figure class="cd" style="--i:${j}"><blockquote><p>${esc(t)}</p></blockquote><figcaption><b>${esc(w.name)}</b><span>${esc(w.src)}</span></figcaption></figure>`; }).join('')}</div></div>`).join('')}</div></section>`;

  function wireD(root) {
    const s = root.querySelector('.rvD'); if (!s) return;
    const bs = [...s.querySelectorAll('.qh button')], ps = [...s.querySelectorAll('.pan')];
    const wide = () => innerWidth > 860;
    function open(k, toggle) {
      const was = bs[k].getAttribute('aria-expanded') === 'true';
      if (wide()) { if (was) return; bs.forEach((b, j) => { b.setAttribute('aria-expanded', j === k); ps[j].classList.toggle('on', j === k); ps[j].hidden = j !== k; }); return; }
      const on = toggle ? !was : true; bs[k].setAttribute('aria-expanded', on); ps[k].hidden = !on; requestAnimationFrame(() => ps[k].classList.toggle('on', on));
    }
    bs.forEach((b, k) => { b.addEventListener('click', () => open(k, true));
      b.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowUp: -1 }[e.key]; if (!d) return; e.preventDefault(); const n = (k + d + bs.length) % bs.length; bs[n].focus(); if (wide()) open(n); }); });
    // leaving the wide layout keeps one answer open; returning to it closes any extra
    addEventListener('resize', () => { if (!wide()) return; const k = Math.max(0, bs.findIndex((b) => b.getAttribute('aria-expanded') === 'true')); bs.forEach((b, j) => { b.setAttribute('aria-expanded', j === k); ps[j].classList.toggle('on', j === k); ps[j].hidden = j !== k; }); });
  }
  return { C, D, wire(root) { wireC(root); wireD(root); }, PICK: [...CQ, ...DQ.flatMap(([, A]) => A)] };
})();
