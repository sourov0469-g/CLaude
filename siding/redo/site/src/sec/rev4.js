/* REVIEWS G and H (overnight ladder, Round 18). Source: the 30 published Google reviews (window.__REV), verbatim; short
   excerpts are whole sentences cut from them and checked at build time. No per-review stars; 4.9 from 474 only.
   G — a steady stream (Lusion: flow). Three columns of short verbatim lines drift slowly upward at different speeds,
       like a feed you can read; hover, focus or the Pause button stops them; reduced motion shows them still.
   H — letters from homeowners (Cowboy: warmth). The longest published reviews set as letters on paper, in a stack;
       next and previous slide the top letter away and bring the next one up. */
window.Rev4 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const R = () => window.__REV || [];
  const STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>';
  const agg = `<p class="ag3"><b>4.9</b><span class="stz">${STAR.repeat(5)}</span>from 474 Google reviews</p>`;
  // [review index, a whole sentence from it, verbatim]
  const LINES = [[0, 'Fast, affordable & beautiful work.'], [1, 'The communication was great.'], [2, 'The new doors look fantastic and operate perfectly.'], [3, 'These guys are AMAZING!'],
    [4, 'It’s a breath of fresh air for a contractor to really do what they say!'], [6, 'Austin Pro arrived in a timely manner, went over our project with us, gave us a great quote and did a phenomenal job on our fireplace exterior.'],
    [7, 'They gave a great quote and did phenomenal work.'], [9, 'Communication was great and prompt.'], [10, 'I did not expect that extra touch.'], [12, 'They were very professional and clean.'],
    [13, 'They are top notch in terms of quality, timeliness, safety and overall performance!'], [14, 'There was no pressure.'], [15, 'The site was clean when they left and the new roof looks great.'],
    [16, 'Very happy we went with Austin Pro'], [17, 'Wow what a difference our new windows have made, our home is so QUIET!'], [18, 'The quote process was easy and everything explained thoroughly.'],
    [20, 'The team scheduled a free estimate the day after I requested assistance.'], [22, 'Quick service and quality of work was excellent.'], [23, 'Very professional staff, easy process and work was completed on schedule.'],
    [25, 'We’re very pleased with the siding work.'], [26, 'Replacing siding is a huge investment, but Austin Pro made it seamless.'], [27, 'Build quality was top notch, and install was fast and efficient.'],
    [28, 'Austin pro just finished my windows in one day!'], [29, 'Austin Pro was definitely the right choice for the work.']];

  /* ---------- G ---------- */
  const G = () => { const cols = [[], [], []]; LINES.forEach((l, i) => cols[i % 3].push(l));
    const card = ([i, t]) => { const r = R()[i] || {}; return `<li><blockquote><p>“${esc(t)}”</p></blockquote><span>${esc(r.name || '')}</span></li>`; };
    return `<section class="sec rvG" id="reviews" aria-labelledby="rvG-h">
      <div class="hd"><div><h2 class="sec-h" id="rvG-h" data-split>A steady stream.</h2><p class="sec-p">${LINES.length} lines from ${R().length} published reviews, in their own words.</p></div><div class="r">${agg}<button type="button" class="pz" aria-pressed="false">Pause</button></div></div>
      <div class="cols">${cols.map((c, k) => `<div class="col c${k}"><ul class="run">${c.map(card).join('')}</ul><ul class="run" aria-hidden="true">${c.map(card).join('')}</ul></div>`).join('')}</div></section>`; };

  function wireG(root) {
    const s = root.querySelector('.rvG'); if (!s) return; const pz = s.querySelector('.pz'), cols = s.querySelector('.cols');
    // copies for the seamless loop are inert for keyboards and screen readers
    s.querySelectorAll('.run[aria-hidden]').forEach((u) => u.setAttribute('inert', ''));
    let user = false; const set = (p) => { cols.classList.toggle('paused', p); pz.setAttribute('aria-pressed', p); pz.textContent = p ? 'Play' : 'Pause'; };
    pz.addEventListener('click', () => { user = !cols.classList.contains('paused'); set(user); });
    cols.addEventListener('pointerenter', () => set(true)); cols.addEventListener('pointerleave', () => set(user)); cols.addEventListener('focusin', () => set(true)); cols.addEventListener('focusout', () => set(user));
    if (RM) set(true);
    new IntersectionObserver((es) => es.forEach((e) => cols.classList.toggle('off', !e.isIntersecting))).observe(cols);
  }

  /* ---------- H ---------- */
  const H = () => { const L = R().map((r, i) => [i, r]).sort((a, b) => b[1].text.length - a[1].text.length).slice(0, 6);
    return `<section class="sec rvH" id="reviews" aria-labelledby="rvH-h">
      <div class="hd"><div><h2 class="sec-h" id="rvH-h" data-split>Letters from homeowners.</h2><p class="sec-p">Six of the longest reviews on our site, read whole, as written.</p></div>${agg}</div>
      <div class="wrap"><div class="stack" aria-live="polite">${L.map(([i, r], k) => `<article class="lt" data-k="${k}" style="--k:${k}" ${k ? 'aria-hidden="true"' : ''}><p class="dear">${esc(r.source)}</p><blockquote><p>${esc(r.text)}</p></blockquote><p class="sig">${esc(r.name)}</p></article>`).join('')}</div>
        <div class="nav"><button type="button" class="arw" data-d="-1" aria-label="Previous letter"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button><span class="ct"><b>1</b> of ${L.length}</span><button type="button" class="arw" data-d="1" aria-label="Next letter"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button></div></div>
      <p class="note">Each letter is the review exactly as published on our site; where the site cuts a review short, the letter ends there too.</p></section>`; };

  function wireH(root) {
    const s = root.querySelector('.rvH'); if (!s) return; const lts = [...s.querySelectorAll('.lt')], n = lts.length, ct = s.querySelector('.ct b');
    let cur = 0;
    const lay = () => lts.forEach((l, k) => { const pos = (k - cur + n) % n; l.style.setProperty('--p', pos); l.classList.toggle('top', pos === 0); l.setAttribute('aria-hidden', pos !== 0); });
    const go = (d) => { const old = lts[cur]; if (d > 0 && !RM) { old.classList.add('away'); setTimeout(() => old.classList.remove('away'), 520); } cur = (cur + d + n) % n; lay(); ct.textContent = cur + 1; };
    s.querySelectorAll('.arw').forEach((b) => b.addEventListener('click', () => go(+b.dataset.d)));
    s.querySelector('.stack').addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); });
    lay();
  }
  return { G, H, wire(root) { wireG(root); wireH(root); }, LINES };
})();
