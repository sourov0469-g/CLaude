/* SERVICE AREA, "On your street" (sheet: pinned photo cards by neighbourhood, rippling thread, board-end signs; MORE interactivity;
   NO drawn map). Photos are the firm's own published project photos with their recorded place and date (photos.json);
   city counts are the firm's documented-project tallies (finder dataset); the 886 wording is locked verbatim. */
window.Area = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D = () => window.__AREA || { cards: [], cities: [], places: [] };
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const LOCK = '312 on the map with photos + 574 more counted';
  const city = (pl) => (pl.includes(',') ? pl.split(',').pop().trim() : pl.trim());
  const card = (c, i) => `<a class="pc" href="${esc(c.href)}" data-city="${esc(city(c.place))}" style="--r:${[-4, 3, -2, 5, -3, 2, -5, 4][i % 8]}deg" target="_blank" rel="noopener">
    <i class="pin" aria-hidden="true"></i><span class="ph"><img src="${c.src}" alt="${esc(c.alt)}" loading="lazy" decoding="async"></span>
    <span class="cap"><b>${esc(c.place.split(',')[0])}</b><small>${esc(city(c.place) !== c.place.split(',')[0] ? city(c.place) + ' · ' : '')}${esc(c.when)}</small><small class="tr">${esc(c.trades)}</small></span></a>`;
  const signs = (cls) => D().cities.map(([n, k], i) => `<button type="button" class="sign ${cls}" data-city="${esc(n)}" aria-pressed="false" style="--o:${[0, 10, -6, 8, -10, 4][i % 6]}px"><b>${esc(n)}</b><i>${k}</i></button>`).join('');

  /* ---------- A: photo cards pinned along a thread that ripples; the signs filter by town ---------- */
  const A = () => `<section class="sec arA" id="area" aria-labelledby="arA-h">
    <div class="hd"><h2 class="sec-h" id="arA-h">On your street.</h2>
      <p class="sec-p">Real jobs, pinned where they happened. 886 documented projects since 2018: ${LOCK}.</p></div>
    <div class="board"><svg class="thread" aria-hidden="true"><path/></svg><div class="cards">${D().cards.map(card).join('')}</div>
      <div class="post" role="group" aria-label="Filter by town">${signs('a')}<p class="pn">Projects documented per town</p></div></div></section>`;

  function wireA(root) {
    const s = root.querySelector('.arA'); if (!s) return;
    const board = s.querySelector('.board'), wrap = s.querySelector('.cards'), cards = [...s.querySelectorAll('.pc')], path = s.querySelector('.thread path'), svg = s.querySelector('.thread');
    const N = 48; let pts = [], W = 0, H = 0, raf = 0, ptr = null, vis = false;
    function anchors() { const b = wrap.getBoundingClientRect(), o = board.getBoundingClientRect();
      return cards.map((c) => { const r = c.querySelector('.pin').getBoundingClientRect(); return [r.left + r.width / 2 - o.left, r.top + r.height / 2 - o.top]; }); }
    function layout() { const o = board.getBoundingClientRect(); W = o.width; H = o.height; svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const A = anchors(); if (!A.length) return; const xs = [A[0][0] - 60, ...A.map((a) => a[0]), A[A.length - 1][0] + 60], ys = [A[0][1] - 30, ...A.map((a) => a[1]), A[A.length - 1][1] + 30];
      pts = []; for (let i = 0; i < N; i++) { const t = i / (N - 1) * (xs.length - 1), k = Math.min(xs.length - 2, Math.floor(t)), f = t - k, e = f * f * (3 - 2 * f);
        const x = xs[k] + (xs[k + 1] - xs[k]) * f, y = ys[k] + (ys[k + 1] - ys[k]) * e + Math.sin(f * Math.PI) * 26; pts.push({ x, y, y0: y, x0: x, v: 0, vx: 0 }); } draw(); }
    function draw() { let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`; for (let i = 1; i < pts.length - 1; i++) { const m = pts[i], n = pts[i + 1]; d += ` Q${m.x.toFixed(1)} ${m.y.toFixed(1)} ${((m.x + n.x) / 2).toFixed(1)} ${((m.y + n.y) / 2).toFixed(1)}`; } path.setAttribute('d', d); }
    // the thread: a damped string; the cursor drags across it and the ripple runs along
    function step() { raf = 0; let e = 0;
      pts.forEach((p, i) => { if (i === 0 || i === pts.length - 1) return; const l = pts[i - 1], r = pts[i + 1];
        const f = ((l.y + r.y) / 2 - p.y) * 0.5 + (p.y0 - p.y) * 0.02; p.v = (p.v + f) * 0.9;
        if (ptr) { const dx = p.x - ptr.x, dy = p.y - ptr.y, d = Math.hypot(dx, dy); if (d < 70) p.v += (dy / (d || 1)) * (70 - d) * 0.06; } });
      pts.forEach((p) => { p.y += p.v; e += Math.abs(p.v) + Math.abs(p.y - p.y0) * 0.02; }); draw();
      if (vis && (e > 0.05 || ptr)) raf = requestAnimationFrame(step); }
    const kick = () => { if (!raf && !RM && vis) raf = requestAnimationFrame(step); };
    board.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; const o = board.getBoundingClientRect(); ptr = { x: e.clientX - o.left, y: e.clientY - o.top }; kick(); });
    board.addEventListener('pointerleave', () => { ptr = null; kick(); });
    // a card picked up tugs its pin on the thread
    cards.forEach((c, i) => { const tug = (v) => { const a = anchors()[i]; if (!a) return; pts.forEach((p) => { const d = Math.abs(p.x - a[0]); if (d < 120) p.v += v * (1 - d / 120); }); kick(); };
      c.addEventListener('pointerenter', () => tug(-5)); c.addEventListener('focus', () => tug(-5)); });
    // signs: filter the board to one town; press again for all
    const sg = [...s.querySelectorAll('.sign')];
    sg.forEach((b) => b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; sg.forEach((x) => x.setAttribute('aria-pressed', x === b && on));
      const town = on ? b.dataset.city : null; cards.forEach((c) => c.classList.toggle('dim', !!town && c.dataset.city !== town)); board.classList.toggle('filtered', !!town);
      cards.forEach((c, i) => { if (town && c.dataset.city === town) { const a = anchors()[i]; pts.forEach((p) => { const d = Math.abs(p.x - a[0]); if (d < 140) p.v -= 7 * (1 - d / 140); }); } }); kick(); }));
    new IntersectionObserver((es) => es.forEach((e) => { vis = e.isIntersecting; if (vis) { s.classList.add('in'); layout(); pts.forEach((p, i) => (p.v += Math.sin(i * 0.5) * 3)); kick(); } }), { threshold: 0.15 }).observe(board);
    addEventListener('resize', layout); new ResizeObserver(layout).observe(board); wrap.addEventListener('scroll', () => { layout(); }, { passive: true });
    s.querySelectorAll('img').forEach((im) => im.addEventListener('load', layout)); layout();
  }

  /* ---------- B: "Is my street on the list?": type your neighbourhood or town; the sign post turns to it ---------- */
  const B = () => `<section class="sec arB" id="area" aria-labelledby="arB-h">
    <div class="lft"><h2 class="sec-h" id="arB-h">Is your street on our list?</h2>
      <p class="sec-p">Type your neighbourhood or town. 886 documented projects since 2018: ${LOCK}.</p>
      <div class="find"><label for="arB-q" class="sr">Neighbourhood or town</label><input id="arB-q" type="search" autocomplete="off" placeholder="Try Round Rock or Maple Run" role="combobox" aria-expanded="false" aria-controls="arB-l" aria-autocomplete="list">
        <ul id="arB-l" role="listbox" hidden></ul></div>
      <p class="ans" aria-live="polite"></p>
      <div class="post2" role="group" aria-label="Towns">${signs('b')}</div></div>
    <div class="deck">${D().cards.map(card).join('')}<p class="dhint" aria-hidden="true">Drag the top photo away</p></div></section>`;

  function wireB(root) {
    const s = root.querySelector('.arB'); if (!s) return; const d = D();
    const q = s.querySelector('#arB-q'), lb = s.querySelector('#arB-l'), ans = s.querySelector('.ans'), deck = s.querySelector('.deck'), sg = [...s.querySelectorAll('.sign')];
    let order = [...deck.querySelectorAll('.pc')];
    const lay = () => order.forEach((c, i) => { c.style.zIndex = order.length - i; c.style.setProperty('--n', i); c.classList.toggle('top', i === 0); c.tabIndex = i === 0 ? 0 : -1; });
    const front = (pred) => { const hit = order.filter(pred); if (!hit.length) return 0; order = [...hit, ...order.filter((c) => !pred(c))]; lay(); return hit.length; };
    const all = [...new Set([...d.cities.map((c) => c[0]), ...d.places])];
    function choose(name) { q.value = name; lb.hidden = true; q.setAttribute('aria-expanded', 'false');
      const town = city(name), row = d.cities.find((c) => c[0].toLowerCase() === town.toLowerCase());
      const n = front((c) => c.dataset.city.toLowerCase() === town.toLowerCase() || c.querySelector('.cap b').textContent.toLowerCase() === name.split(',')[0].trim().toLowerCase());
      sg.forEach((b) => b.setAttribute('aria-pressed', !!row && b.dataset.city === row[0]));
      ans.innerHTML = row ? `<b>Yes.</b> ${row[1]} documented project${row[1] === 1 ? '' : 's'} in ${esc(row[0])}${n ? `; ${n} pinned here with photos` : ''}.` : `<b>Yes,</b> ${esc(name)} is in our project records.`; }
    let act = -1;
    function list() { const v = q.value.trim().toLowerCase(); act = -1; if (v.length < 2) { lb.hidden = true; q.setAttribute('aria-expanded', 'false'); return; }
      const m = all.filter((n) => n.toLowerCase().includes(v)).slice(0, 7);
      lb.innerHTML = m.length ? m.map((n, i) => `<li role="option" id="arB-o${i}" aria-selected="false">${esc(n)}</li>`).join('') : `<li class="none" aria-disabled="true">Not in our records yet. Call (512) 550-0000 and ask.</li>`;
      lb.hidden = false; q.setAttribute('aria-expanded', 'true'); lb.querySelectorAll('[role=option]').forEach((o) => o.addEventListener('mousedown', (e) => { e.preventDefault(); choose(o.textContent); })); }
    q.addEventListener('input', list);
    q.addEventListener('keydown', (e) => { const os = [...lb.querySelectorAll('[role=option]')]; if (!os.length) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); act = (act + (e.key === 'ArrowDown' ? 1 : -1) + os.length) % os.length; os.forEach((o, i) => o.setAttribute('aria-selected', i === act)); q.setAttribute('aria-activedescendant', os[act].id); }
      if (e.key === 'Enter' && act >= 0) { e.preventDefault(); choose(os[act].textContent); } if (e.key === 'Escape') { lb.hidden = true; q.setAttribute('aria-expanded', 'false'); } });
    q.addEventListener('blur', () => setTimeout(() => (lb.hidden = true), 120));
    sg.forEach((b) => b.addEventListener('click', () => choose(b.dataset.city)));
    // the deck: drag (or flick) the top photo away and it goes to the back
    let drag = null;
    deck.addEventListener('pointerdown', (e) => { const c = e.target.closest('.pc.top'); if (!c) return; e.preventDefault(); drag = { c, x: e.clientX, y: e.clientY, moved: false }; c.setPointerCapture(e.pointerId); c.classList.add('drag'); });
    deck.addEventListener('pointermove', (e) => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.hypot(dx, dy) > 6) drag.moved = true; drag.c.style.transform = `translate(${dx}px,${dy}px) rotate(${dx / 14}deg)`; });
    const end = (e) => { if (!drag) return; const { c, moved } = drag, dx = e.clientX - drag.x; drag = null; c.classList.remove('drag'); c.style.transform = '';
      if (Math.abs(dx) > 90) { order.push(order.shift()); lay(); } else if (!moved) window.open(c.href, '_blank', 'noopener'); };
    deck.addEventListener('pointerup', end); deck.addEventListener('pointercancel', end);
    deck.addEventListener('click', (e) => { if (e.target.closest('.pc') && e.detail) e.preventDefault(); });   // a pointer click is handled on release; a keyboard Enter follows the link
    deck.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); if (e.key === 'ArrowRight') order.push(order.shift()); else order.unshift(order.pop()); lay(); order[0].focus(); } });
    lay();
  }
  return { A, B, wire(root) { wireA(root); wireB(root); }, LOCK };
})();
