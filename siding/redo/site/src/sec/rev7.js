/* REVIEWS L (new-versions addendum, pass 2) — "The whole job, in their words". Reference: Scout Motors (sequenced proof,
   set as an honest spec sheet). The 30 reviews published on the firm's site (window.__REV) are split into sentences and
   put in the order a job happens. Every quoted sentence is an exact substring of a review, attributed by name as
   published; cuts ("…") are kept. Each sentence is placed once, at the first stage (in the CHECK order below) whose
   words it uses; that rule is printed on the page. Prerendered at build; wire() only handles "Show more" and arrival. */
window.Rev7 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // stages in the order a job happens
  const SEQ = [['price', 'Getting a price'], ['start', 'Getting started'], ['crew', 'The crew at work'], ['info', 'Kept informed'], ['clean', 'The clean-up'], ['result', 'The result'], ['again', 'Would they hire again']];
  // the order in which a sentence is checked (most specific first, the general "crew" last)
  const CHECK = [
    ['clean', /\b(clean(ed|ing)? ?up|cleaned|cleaner|clean when|clean and|very clean|so clean|swept|debris|picked up|tidy)/i],
    ['info', /\b(communicat\w*|kept (me|us) (informed|updated|in the loop)|updates?\b|explained|answered (all|every|our|my)|walked (me|us) through)/i],
    ['price', /\b(quote[sd]?|estimates?|bid|pricing|priced|affordable|fair price|reasonabl\w*|fraction of the price|budget|competitive)/i],
    ['start', /\b(schedul\w*|on time|timely|promptly|responsive|same day|next day|showed up|arrived|got (us|me) in|right away)/i],
    ['result', /\b(looks? (great|amazing|fantastic|beautiful|incredible|good|wonderful|perfect|brand new|new)|beautiful|gorgeous|stunning|transform\w*|curb appeal|turned out|(love|loving) (the|our|my|how|it)|end product|finished product)/i],
    ['again', /\b(recommend\w*|use them again|would use again|use again|hire them again|wouldn.?t hesitate|go-to|doing business)/i],
    ['crew', /\b(crew|team|installers?|workers|craftsm\w*|worked hard|hard[- ]working|courteous|respectful|attention to detail|professional\w*)/i]];
  const sentences = (t) => t.split(/(?<=[.!?…])\s+/).map((s) => s.trim()).filter(Boolean);
  function sort() {
    const R = window.__REV || [], S = Object.fromEntries(SEQ.map(([k]) => [k, []]));
    R.forEach((r) => sentences(r.text).forEach((s) => { const hit = CHECK.find(([, rx]) => rx.test(s)); if (hit) S[hit[0]].push({ s, who: r.name }); }));
    // lead choice: whole sentences before cut ones, then clean sentences of 60–170 characters, then closest to 130
    const fit = (t) => (/[a-z][.!?,][a-z]/i.test(t) ? 2 : 0) + (t.length >= 60 && t.length <= 170 ? 0 : 1);   // run-together punctuation never leads
    Object.values(S).forEach((a) => a.sort((x, y) => (x.s.endsWith('…') - y.s.endsWith('…')) || (fit(x.s) - fit(y.s)) || (Math.abs(x.s.length - 130) - Math.abs(y.s.length - 130))));
    return { S, N: R.length };
  }
  const q = (x, cls) => `<blockquote class="${cls}"><p>${esc(x.s)}</p><footer>${esc(x.who)}</footer></blockquote>`;

  const L = () => {
    const { S, N } = sort();
    const rows = SEQ.map(([k, name], i) => {
      const a = S[k], who = new Set(a.map((x) => x.who)).size, more = a.slice(3);
      return `<li class="rlr" style="--i:${i};--w:${(who / N).toFixed(3)}">
        <div class="rll"><span class="rln">${String(i + 1).padStart(2, '0')}</span><h3 class="rls">${name}</h3>
          <p class="rlc">In ${who} of the ${N} reviews</p><span class="rlb" aria-hidden="true"><i></i></span></div>
        <div class="rlq">${a[0] ? q(a[0], 'rlq1') : ''}<div class="rlq2">${a.slice(1, 3).map((x) => q(x, 'rlq3')).join('')}</div>
          ${more.length ? `<div class="rlm" id="rlm${i}" hidden>${more.map((x) => q(x, 'rlq3')).join('')}</div>
          <button type="button" class="rlmore" aria-expanded="false" aria-controls="rlm${i}">Show ${more.length} more</button>` : ''}</div></li>`;
    }).join('');
    return `<section class="sec rvL" id="reviews" aria-labelledby="rvL-h">
    <div class="rlh"><h2 class="sec-h" id="rvL-h" data-split>The whole job, in their words.</h2>
      <p class="sec-p">The ${N} reviews published on our site, sentence by sentence, put in the order a job happens. Every line is quoted exactly as published.</p></div>
    <ol class="rlst" data-solid>${rows}</ol>
    <div class="rlft"><p><b>Rated 4.9 from 474 Google reviews.</b> Each sentence sits once, at the first stage whose words it uses (for example "quote", "clean", "recommend"), so a stage's count is the number of reviews that speak to it.</p>
      <a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a></div></section>`;
  };

  function wire(root) {
    const s = root.querySelector('.rvL'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    s.querySelectorAll('.rlmore').forEach((b) => { const n = b.textContent;
      b.addEventListener('click', () => { const on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on);
        s.querySelector('#' + b.getAttribute('aria-controls')).hidden = !on; b.textContent = on ? 'Show fewer' : n; }); });
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (RM) s.classList.add('rlgo');
    else new IntersectionObserver((es, io) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); s.classList.add('rlgo'); } }), { threshold: 0.12 }).observe(s.querySelector('.rlst'));
  }
  return { L, wire };
})();
