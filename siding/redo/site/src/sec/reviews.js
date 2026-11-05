/* PROOF / REVIEWS (sheet: ONLY the big 4.9 arriving as a reveal, and the rating shown as hanging tags; no map, no video wall).
   Every quote is a verbatim excerpt of a Google review published on the firm's site (work/data/reviews.json, injected as
   window.__REV). No per-review stars are shown: the records carry none. The only rating is the locked 4.9 from 474. */
window.Rev = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>';
  // [index in reviews.json, verbatim excerpt, trade]
  const PICK = [[17, 'Wow what a difference our new windows have made, our home is so QUIET!', 'Windows'],
    [0, 'Fast, affordable & beautiful work. 10/10 Would use again.', 'Roofing'],
    [7, 'I hired Austin Pro to redo my house\'s 80s era masonite siding with Hardie Board. They gave a great quote and did phenomenal work.', 'Siding'],
    [15, 'They ripped off the old roof and put on a new one in one day.', 'Roofing'],
    [10, 'Also special shout out to Garrett who finished up and also swept the pollen off my deck!', 'Door & siding'],
    [26, 'Replacing siding is a huge investment, but Austin Pro made it seamless.', 'Siding'],
    [28, 'Austin pro just finished my windows in one day!', 'Windows'],
    [14, 'They only took 15 minutes to measure and understand the job rather than taking hours of my time', 'Estimate']];
  const R = () => (window.__REV || []);
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const q = (p) => { const r = R()[p[0]] || {}; return { text: p[1], full: r.text || p[1], name: r.name || '', src: r.source || 'Google review', trade: p[2], cut: !(r.text || '').startsWith(p[1]) || (r.text || '').length > p[1].length + 1 }; };
  const dots = (t) => (/[.!?]$/.test(t) ? '' : '…');
  const stars5 = (fill) => `<span class="st5" style="--f:${fill}%" aria-hidden="true"><span class="bg">${STAR.repeat(5)}</span><span class="fg">${STAR.repeat(5)}</span></span>`;

  /* ---------- A: the 4.9, laid course by course; a quote reader beside it ---------- */
  function monument() {
    let c = ''; const n = 15, h = 28;
    for (let i = 0; i < n; i++) { const y = 30 + i * h, dir = i % 2 ? 1 : -1, tone = i % 3 === 0 ? '#14523C' : i % 3 === 1 ? '#0E3B2C' : '#1B5E45';
      c += `<g class="crs" style="--dx:${dir * 115}%;--d:${(n - 1 - i) * 0.055}s"><rect x="0" y="${y}" width="760" height="${h + 2}" fill="${tone}"/><rect x="0" y="${y + h - 1}" width="760" height="3" fill="rgba(0,0,0,.35)"/><rect x="0" y="${y}" width="760" height="2" fill="#B5DB6E" opacity=".55"/></g>`; }
    return `<svg class="mono" viewBox="0 0 760 470" aria-hidden="true"><defs><clipPath id="revNum"><text x="380" y="430" text-anchor="middle" font-family="Montserrat,system-ui,sans-serif" font-weight="800" font-size="520" letter-spacing="-28">4.9</text></clipPath></defs>
      <g class="sh" clip-path="url(#revNum)" transform="translate(10 14)"><rect width="760" height="470" fill="rgba(22,25,29,.12)"/></g>
      <g clip-path="url(#revNum)">${c}</g></svg>`;
  }
  const A = () => { const Q = PICK.map(q);
    return `<section class="sec rvA" id="reviews" aria-labelledby="rvA-h">
      <div class="num"><h2 class="sr" id="rvA-h">Rated 4.9 out of 5 from 474 Google reviews</h2>${monument()}
        <div class="under">${stars5(98)}<p><b>4.9</b> from <b>474</b> Google reviews</p></div></div>
      <div class="reader"><p class="k">In their words</p>
        <div class="qs" aria-live="polite">${Q.map((x, i) => `<figure class="qq${i ? '' : ' on'}" ${i ? 'hidden' : ''}><blockquote><p>${esc(x.text)}${x.cut ? dots(x.text) : ''}</p></blockquote>
          <figcaption><b>${esc(x.name)}</b><span>${esc(x.src)} · ${x.trade}</span></figcaption>
          ${x.cut ? `<details><summary>Read the whole review</summary><p>${esc(x.full)}</p></details>` : ''}</figure>`).join('')}</div>
        <div class="nav"><button type="button" class="arw" data-d="-1" aria-label="Previous review"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <span class="ct"><b>1</b> / ${Q.length}</span>
          <button type="button" class="arw" data-d="1" aria-label="Next review"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <span class="bar" aria-hidden="true"><i></i></span></div></div></section>`; };

  function wireA(root) {
    const s = root.querySelector('.rvA'); if (!s) return; const qs = [...s.querySelectorAll('.qq')], ct = s.querySelector('.ct b'), bar = s.querySelector('.bar i');
    let cur = 0, timer = 0, hold = false;
    function show(i) { qs[cur].classList.remove('on'); qs[cur].hidden = true; cur = (i + qs.length) % qs.length; qs[cur].hidden = false; void qs[cur].offsetWidth; qs[cur].classList.add('on'); ct.textContent = cur + 1; arm(); }
    function arm() { clearTimeout(timer); bar.style.animation = 'none'; void bar.offsetWidth; if (RM || hold) return; bar.style.animation = ''; timer = setTimeout(() => show(cur + 1), 7000); }
    s.querySelectorAll('.arw').forEach((b) => b.addEventListener('click', () => show(cur + +b.dataset.d)));
    const reader = s.querySelector('.reader');
    const pause = (v) => { hold = v; reader.classList.toggle('held', v); arm(); };
    reader.addEventListener('pointerenter', () => pause(true)); reader.addEventListener('pointerleave', () => pause(false));
    reader.addEventListener('focusin', () => pause(true)); reader.addEventListener('focusout', (e) => { if (!reader.contains(e.relatedTarget)) pause(false); });
    reader.addEventListener('toggle', () => pause(true), true);
    // reveal once in view; the courses then lean away from the cursor like loose boards
    const num = s.querySelector('.num'), crs = [...s.querySelectorAll('.crs')];
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { num.classList.add('in'); io.disconnect(); setTimeout(() => num.classList.add('settled'), 1500); arm(); } }), { threshold: 0.35 });
    if (RM) num.classList.add('in', 'settled'); else io.observe(num);
    let raf = 0, py = -1e4, px = 0;
    const svg = s.querySelector('.mono');
    const ap = () => { raf = 0; if (!num.classList.contains('settled')) return; const r = svg.getBoundingClientRect(), k = r.height / 470;
      crs.forEach((g, i) => { const cy = r.top + (30 + i * 28 + 14) * k, d = Math.abs(cy - py), w = d < 70 ? Math.cos(d / 70 * Math.PI / 2) : 0; g.style.setProperty('--nx', (w * 14 * (i % 2 ? 1 : -1) * (px > 0 ? 1 : -1)).toFixed(1) + 'px'); }); };
    num.addEventListener('pointermove', (e) => { if (RM) return; const r = svg.getBoundingClientRect(); py = e.clientY; px = e.clientX - (r.left + r.width / 2); if (!raf) raf = requestAnimationFrame(ap); });
    num.addEventListener('pointerleave', () => { py = -1e4; if (!raf) raf = requestAnimationFrame(ap); });
  }

  /* ---------- B: the rating as hanging tags on a line; the cursor is the breeze ---------- */
  const B = () => { const Q = PICK.map(q); const mid = 2;
    const tags = Q.map((x, i) => `<button type="button" class="tag" data-i="${i}" aria-haspopup="dialog"><i class="peg" aria-hidden="true"></i><span class="tx">${esc(x.text.length > 74 ? x.text.slice(0, x.text.lastIndexOf(' ', 70)) + '…' : x.text + (x.cut ? dots(x.text) : ''))}</span><span class="nm">${esc(x.name)}</span><span class="tr">${x.trade}</span></button>`);
    tags.splice(mid, 0, `<div class="tag big" data-i="-1"><i class="peg" aria-hidden="true"></i><b>4.9</b>${stars5(98)}<span>474 Google reviews</span></div>`);
    return `<section class="sec rvB" id="reviews" aria-labelledby="rvB-h">
      <div class="hd"><h2 class="sec-h" id="rvB-h">4.9, hung out to read.</h2><p class="sec-p">474 Google reviews, rated 4.9. A few in their own words; tap a tag to read the whole review.</p></div>
      <div class="lineview"><div class="track"><i class="post l" aria-hidden="true"></i><i class="post r" aria-hidden="true"></i><svg class="rope" aria-hidden="true"><path/><path/></svg>${tags.join('')}</div></div>
      <div class="dlg rvdlg" role="dialog" aria-modal="true" aria-labelledby="rvB-dn" hidden><div class="card"><button type="button" class="x" aria-label="Close">×</button>
        <p class="tr"></p><blockquote><p class="full"></p></blockquote><p class="who"><b id="rvB-dn"></b><span></span></p></div></div></section>`; };

  function wireB(root) {
    const s = root.querySelector('.rvB'); if (!s) return; const Q = PICK.map(q);
    const view = s.querySelector('.lineview'), track = s.querySelector('.track'), paths = [...s.querySelectorAll('.rope path')], svg = s.querySelector('.rope');
    const tags = [...s.querySelectorAll('.tag')];
    const st = tags.map(() => ({ a: 0, v: 0, y: 0, vy: 0 })); let W = 0, H = 0, raf = 0, lastX = null, lastT = 0, vis = false;
    let U = [], ROW = [], rows = 1;
    const base = (r) => (r ? Math.min(H * 0.52, 330) : 40);
    function plan() { rows = innerWidth > 860 ? 2 : 1; const n = tags.length;
      if (rows === 1) { ROW = tags.map(() => 0); U = tags.map((_, i) => 0.05 + 0.9 * i / (n - 1)); }
      else { const top = Math.ceil(n / 2); ROW = tags.map((_, i) => (i < top ? 0 : 1)); U = tags.map((_, i) => (i < top ? 0.1 + 0.8 * i / (top - 1) : 0.16 + 0.68 * (i - top) / (n - top - 1))); } }
    const lineY = (u, i, r) => base(r) + 46 * (1 - Math.pow(2 * u - 1, 2)) + (i == null ? 0 : st[i].y);
    function layout() { W = track.clientWidth; H = track.clientHeight; plan(); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); s.dataset.rows = rows; draw(); }
    function draw() {
      const P = U.map((u, i) => [u * W, lineY(u, i, ROW[i])]);
      paths.forEach((path, r) => { if (r >= rows) { path.setAttribute('d', ''); return; } let d = `M${W * 0.02} ${base(r) - 2}`;
        P.forEach(([x, y], i) => { if (ROW[i] === r) d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; }); path.setAttribute('d', d + ` L${W * 0.98} ${base(r) - 2}`); });
      tags.forEach((t, i) => { t.style.left = P[i][0] + 'px'; t.style.top = P[i][1] + 'px'; t.style.transform = `translateX(-50%) rotate(${st[i].a.toFixed(2)}deg)`; });
    }
    function step() { raf = 0; let e = 0;
      st.forEach((p, i) => { const k = tags[i].classList.contains('big') ? 0.5 : 1; p.v += (-p.a * 0.045 * k) - p.v * 0.045; p.a += p.v; p.vy += -p.y * 0.12 - p.vy * 0.16; p.y += p.vy; e += Math.abs(p.a) + Math.abs(p.v) + Math.abs(p.y) + Math.abs(p.vy); });
      draw(); if (e > 0.02 && vis) raf = requestAnimationFrame(step); else if (e <= 0.02) { st.forEach((p) => (p.a = p.v = p.y = p.vy = 0)); draw(); } }
    const kick = () => { if (!raf && !RM) raf = requestAnimationFrame(step); };
    // the breeze: the pointer pushes the tags it passes and dips the line
    view.addEventListener('pointermove', (e) => { const r = track.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, now = performance.now();
      if (lastX != null) { const vx = (x - lastX) / Math.max(8, now - lastT) * 16; U.forEach((u, i) => { const dx = Math.abs(u * W - x); const ly = lineY(u, i, ROW[i]); if (dx < 90 && y > ly - 30 && y < ly + 240) { st[i].v += vx * 0.05 * (1 - dx / 90); if (Math.abs(y - ly) < 40) st[i].vy += 1.2 * (1 - dx / 90); } }); kick(); }
      lastX = x; lastT = now; });
    view.addEventListener('pointerleave', () => (lastX = null));
    // entrance: the tags are pegged on, one after another, each with a swing
    const io = new IntersectionObserver((es) => es.forEach((e) => { vis = e.isIntersecting; if (vis && !s.classList.contains('in')) { s.classList.add('in'); tags.forEach((t, i) => setTimeout(() => { st[i].v += (i % 2 ? 1 : -1) * 1.6; kick(); }, 120 + i * 90)); } if (vis) kick(); }), { threshold: 0.2 });
    if (RM) s.classList.add('in'); io.observe(s);
    // open a tag: the whole review, verbatim
    // the dialog lives at the page root so its backdrop covers the fixed header and the phone bar too
    const dlg = s.querySelector('.dlg'); document.body.append(dlg); let opener = null;
    function open(i, t) { const x = Q[i]; opener = t; dlg.querySelector('.tr').textContent = x.trade + ' · ' + x.src; dlg.querySelector('.full').textContent = x.full; dlg.querySelector('#rvB-dn').textContent = x.name;
      dlg.hidden = false; requestAnimationFrame(() => dlg.classList.add('on')); dlg.querySelector('.x').focus(); }
    function close() { dlg.classList.remove('on'); setTimeout(() => (dlg.hidden = true), RM ? 0 : 220); if (opener) opener.focus(); }
    tags.forEach((t, i) => { if (t.dataset.i !== '-1') t.addEventListener('click', () => { st[i].v += 3; kick(); open(+t.dataset.i, t); }); });
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('.x')) close(); });
    dlg.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); if (e.key === 'Tab') { e.preventDefault(); dlg.querySelector('.x').focus(); } });
    layout(); addEventListener('resize', layout); new ResizeObserver(layout).observe(track);
  }
  return { A, B, wire(root) { wireA(root); wireB(root); }, PICK };
})();
