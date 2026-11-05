/* WINDOWS N (new-versions addendum, pass 4) — "The window issue". Reference: Ever, verified craft only (the case page's
   magazine narrative; not its pairs, which the annex bars). The eight window answers published on the firm's site
   (faq.json), questions and answers verbatim, as articles in a magazine spread; each faces a plate: a published Austin Pro
   window job (photos.json) captioned only with its own record. Next turns the right-hand page over like paper.
   Pull-quotes are exact substrings of their answers ([before, figure, after]). Plates resolve at runtime: J:n from
   window.__JOBS, S:n from window.__SVCK.emb, E:n from window.__WINN.emb (embedded once, here only). */
window.Win9 = (function () {
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  // [kicker, question, answer, pull-quote] — question and answer verbatim from faq.json, in its published order
  const ART = [["Cost", "How much does window replacement cost in Austin?", "Across the 376 priced window jobs we documented from 2022–2026, the middle half landed between $5,000 and $25,000, and the median fell in the $10,000–$15,000 band. Your price depends on how many windows you replace and how big they are, the brand and line, and the color and glass you choose. The inspection and estimate are free.", ["the median fell in the ", "$10,000–$15,000", " band"]], ["Brands", "Which window brands does Austin Pro install?", "NT Windows, built in Texas, is on 238 of our 376 priced window jobs. Pella (31), Simonton (54) and Andersen (38) cover most of the rest, and we’re an Andersen Certified Contractor at the Premier level.", ["NT Windows, built in Texas, is on ", "238", " of our 376 priced window jobs"]], ["Frames", "Vinyl, aluminum or fiberglass: what do Austin homes usually get?", "Mostly vinyl. 214 of our 376 priced window jobs were vinyl, 64 were NT’s Twinsulator aluminum and 33 were Andersen’s Fibrex composite. Pella’s Impervia fiberglass is also available.", ["", "214", " of our 376 priced window jobs were vinyl"]], ["Siding too", "Should I replace windows and siding at the same time?", "Often, yes. The siding was replaced on 36% of our priced window jobs. When we do both, the windows usually go in first, so the new siding and trim seal cleanly around each opening.", ["The siding was replaced on ", "36%", " of our priced window jobs"]], ["Installers", "Are you actual window installers or a sales company?", "We’re an exterior contractor, in business since 2009, at 7801 N Lamar Blvd in Austin. We measure, order and install the windows you choose, and we back the labor with a lifetime workmanship warranty.", ["We ", "measure, order and install", " the windows you choose"]], ["Timing", "How long does window replacement take?", "Most of the window-only jobs in our files took two days on site. The windows themselves are built to order for your openings, so the order comes first; we’ll give you the schedule at your inspection.", ["Most of the window-only jobs in our files took ", "two days", " on site"]], ["Warranties", "What warranties come with new windows?", "Each brand carries its own manufacturer warranty. Simonton’s DaylightMax, for example, has a transferable lifetime limited warranty on parts and labor, and Andersen covers the 100 Series 20 years on glass and 10 years on other parts. Austin Pro adds a lifetime workmanship warranty on labor.", ["Austin Pro adds a ", "lifetime workmanship warranty", " on labor"]], ["Financing", "Can I finance new windows?", "Yes, on approved credit: 0% APR for 24 months, 4.99% APR for 60 months or 7.99% APR for 120 months. Ask about financing at your free inspection.", ["Yes, on approved credit: ", "0% APR for 24 months", ""]]];
  const n = ART.length, pad = (k) => String(k + 1).padStart(2, '0');
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const PL = () => (window.__WINN && window.__WINN.pl) || [];
  const src = (r) => { const [t, i] = r.split(':'); try {
    if (t === 'J') return window.__JOBS[+i].src; if (t === 'S') return window.__SVCK.emb[i]; if (t === 'E') return window.__WINN.emb[i]; } catch (e) { /* no image: the caption still stands */ }
    return ''; };
  const plate = (k, live) => { const p = PL()[k] || {}; const s = live ? src(p.r || '') : '';
    return `<figure class="wnplate"><div class="wnimg"><img ${s ? `src="${s}"` : ''} data-r="${p.r || ''}" alt="${esc(p.alt || '')}" decoding="async"></div>
      <figcaption><span class="wnpl">Plate ${pad(k)}</span><b>${esc(p.p || '')}</b><span class="wnmeta">${esc(p.w || '')} · ${esc(p.t || '')}</span><a href="${p.h || '#'}" target="_blank" rel="noopener">See the project</a></figcaption></figure>`; };
  // drop cap: the first letter, or the whole first word when it is an acronym ("NT Windows"), so no word is split; the text is unchanged
  const drop = (a) => { const w = a.split(/\s/)[0]; const d = /^[A-Z]{2,}$/.test(w) ? w : a[0]; return `<span class="wndc">${d}</span>${a.slice(d.length)}`; };
  const article = (k) => { const [kk, q, a, pq] = ART[k];
    return `<article class="wnart"><p class="wnrun"><span>The window issue</span><b>${pad(k)}</b> ${kk}</p><h3 class="wnq">${q}</h3>
      <blockquote class="wnpq"><p>${pq[0] ? '“' + pq[0] : '“'}<b>${pq[1]}</b>${pq[2]}”</p></blockquote><p class="wna">${drop(a)}</p><p class="wnfol">${pad(k)} / ${pad(n - 1)}</p></article>`; };

  const N = () => `<section class="sec wnN" id="windows" aria-labelledby="wnN-h">
    <div class="wnhd"><h2 class="sec-h" id="wnN-h" data-split>The window issue.</h2>
      <p class="sec-p">Eight questions about replacement windows, answered in the words we publish, beside windows we have put in. Turn the pages, or open one from the contents.</p></div>
    <div class="wnstage" data-solid>
      <nav class="wntoc" aria-label="Contents">
        <p class="wnmast"><b>The window issue</b><span>From 388 documented window jobs</span></p>
        <ol>${ART.map((t, k) => `<li><button type="button" class="wnc" data-k="${k}"${k ? '' : ' aria-current="true"'} tabindex="${k ? -1 : 0}"><b>${pad(k)}</b><span>${t[0]}</span><i>${t[1]}</i></button></li>`).join('')}</ol>
      </nav>
      <div class="wnbook" tabindex="0" role="group" aria-roledescription="magazine spread" aria-label="Page 1 of ${n}: ${esc(ART[0][1])}">
        <div class="wnpg wnpL">${plate(0, false)}</div><div class="wnpg wnpR">${article(0)}</div><i class="wnspine" aria-hidden="true"></i>
      </div>
    </div>
    <div class="wnbar">
      <div class="wnnav"><button type="button" class="wnb" data-d="-1" disabled>‹ Previous page</button><span class="wnpos" aria-hidden="true">Page <b>1</b> of ${n}</span><button type="button" class="wnb" data-d="1">Next page ›</button></div>
      <div class="wncta"><a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>
        <p>Answers as published on our site. Each plate is a window job from our published projects, captioned with that job’s own record.</p></div>
    </div>
    <p class="vh wnlive" aria-live="polite"></p></section>`;

  function wire(root) {
    const s = root.querySelector('.wnN'); if (!s || s.dataset.w) return; s.dataset.w = 1;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, TWO = matchMedia('(min-width:901px)');
    const book = s.querySelector('.wnbook'), L = s.querySelector('.wnpL'), R = s.querySelector('.wnpR'), cs = [...s.querySelectorAll('.wnc')];
    const prev = s.querySelector('.wnb[data-d="-1"]'), next = s.querySelector('.wnb[data-d="1"]'), pos = s.querySelector('.wnpos b'), live = s.querySelector('.wnlive');
    let cur = 0, leaf = null, done = null;
    // fill the first plate's image now that the runtime photos exist
    const img = L.querySelector('img'); const s0 = src(img.dataset.r); if (s0) img.src = s0;
    const chrome = (say) => { cs.forEach((c, k) => { if (k === cur) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current'); });
      prev.disabled = cur === 0; next.disabled = cur === n - 1; pos.textContent = cur + 1;
      book.setAttribute('aria-label', `Page ${cur + 1} of ${n}: ${ART[cur][1]}`);
      if (say) live.textContent = `Page ${cur + 1} of ${n}: ${ART[cur][1]}`; };
    const finish = () => { if (done) { const f = done; done = null; f(); } };
    const go = (k, say) => { finish(); k = Math.max(0, Math.min(n - 1, k)); if (k === cur) return; const fwd = k > cur; cur = k; chrome(say);
      if (RM) { L.innerHTML = plate(k, true); R.innerHTML = article(k); return; }
      if (!TWO.matches) { // one page at a time: a short slide
        L.innerHTML = plate(k, true); R.innerHTML = article(k);
        s.classList.remove('wnsf', 'wnsb'); void book.offsetWidth; s.classList.add(fwd ? 'wnsf' : 'wnsb');
        // the new page starts with its plate: bring the top of the page into view if it has scrolled away
        if (say && book.getBoundingClientRect().top < 64) book.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
      // the turn: a leaf whose front is the page being turned and whose back is the page it becomes
      leaf = document.createElement('div'); leaf.className = 'wnleaf ' + (fwd ? 'wnfw' : 'wnbw'); leaf.setAttribute('aria-hidden', 'true'); leaf.inert = true;
      leaf.innerHTML = fwd ? `<div class="wnface wnfront">${R.innerHTML}</div><div class="wnface wnback">${plate(k, true)}</div>`
                           : `<div class="wnface wnfront">${L.innerHTML}</div><div class="wnface wnback">${article(k)}</div>`;
      if (fwd) R.innerHTML = article(k); else L.innerHTML = plate(k, true);
      book.appendChild(leaf); const lf = leaf; let t = 0;
      done = () => { clearTimeout(t); if (fwd) L.innerHTML = plate(k, true); else R.innerHTML = article(k); lf.remove(); if (leaf === lf) leaf = null; };
      requestAnimationFrame(() => requestAnimationFrame(() => lf.classList.add('wngo')));
      lf.addEventListener('transitionend', (e) => { if (e.target === lf && done) finish(); });
      t = setTimeout(() => { if (lf.isConnected) finish(); }, 1100); };
    next.addEventListener('click', () => go(cur + 1, true)); prev.addEventListener('click', () => go(cur - 1, true));
    cs.forEach((c, k) => { c.addEventListener('click', () => go(k, true));
      c.addEventListener('keydown', (e) => { const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; let m = -1;
        if (d) m = (k + d + n) % n; else if (e.key === 'Home') m = 0; else if (e.key === 'End') m = n - 1;
        if (m >= 0) { e.preventDefault(); cs.forEach((b, j) => { b.tabIndex = j === m ? 0 : -1; }); cs[m].focus(); } }); });
    book.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1, true); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1, true); } });
    // swipe on touch: a clear sideways stroke turns the page; vertical scroll is left to the browser
    let sx = null, sy = 0;
    book.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') return; sx = e.clientX; sy = e.clientY; });
    book.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dy) < 40) go(cur + (dx < 0 ? 1 : -1), true); });
    book.addEventListener('pointercancel', () => { sx = null; });
    chrome(false);
  }
  return { N, wire, ART };
})();
