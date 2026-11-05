/* SECTION 9 — Area, "On your street" (Thread board).
   Sixteen of the firm's own photos hang from pins on a board; one thread (a damped string) runs through every pin and is drawn as you scroll, each card dropping
   in as the thread reaches it; the cards sway, and the pointer swings them and plucks the thread. The street-sign post lists the towns with the firm's own
   documented-project tallies: hover, focus or click a sign and that town's threads are pulled from the sign to its photos while the rest dim; the trade chips
   filter the same board; a card opens an in-page viewer (focus-trapped, Esc, prev/next, swipe) with the record exactly as the data has it.
   Reduced motion: no sway, no drop, no string, no flip; everything is simply there. Touch: no hover dependence; a tap opens the viewer or picks the sign. */
window.FArea = (function () {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), lerp = (a, b, t) => a + (b - a) * t, ease = (t) => 1 - Math.pow(1 - t, 3);
  const NS = 'http://www.w3.org/2000/svg';
  const mq = matchMedia('(prefers-reduced-motion: reduce)'), RM = () => mq.matches;
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const cityOf = (pl) => (pl.includes(',') ? pl.split(',').pop().trim() : pl.trim());

  function wire(root) {
    const s = root.querySelector('.ar'); if (!s || s.dataset.wired) return; s.dataset.wired = '1';
    s.classList.add('ar-js');
    const $ = (q, r = s) => r.querySelector(q), $$ = (q, r = s) => [...r.querySelectorAll(q)];
    const D = JSON.parse($('#ar-data').textContent);
    const board = $('.ar-board'), svg = $('.ar-threads'), main = $('.ar-main'), shadow = $('.ar-ms'), fanG = $('.ar-fan');
    const lis = $$('.ar-c'), btns = lis.map((l) => l.querySelector('.ar-card')), signs = $$('.ar-sign'), chips = $$('.ar-chip'), read = $('.ar-read');
    const cityN = new Map(D.cities.map((c) => [c[0].toLowerCase(), c[1]])), cityName = new Map(D.cities.map((c) => [c[0].toLowerCase(), c[0]]));
    const S = { lock: null, hover: null, card: null, trade: 'all', found: null };
    let vis = false, W = 0, H = 0, ptr = null, raf = 0, last = 0;
    const tradesOf = (li) => li.dataset.tr.split('|');
    const activeTown = () => S.hover || S.lock;
    const match = (li) => { const t = activeTown(); return (!t || li.dataset.town === t) && (S.trade === 'all' || tradesOf(li).includes(S.trade)); };
    const signOf = (t) => signs.find((b) => b.dataset.town === t);

    /* ================= the filter state: signs, chips, cards ================= */
    let fanSet = [], fanTown = null;
    const fp = lis.map(() => { const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'ar-fg'); g.innerHTML = '<path class="halo" pathLength="1"/><path class="line" pathLength="1"/>'; fanG.appendChild(g); return g; });
    const pinPos = (li, o) => { const r = li.querySelector('.ar-pin').getBoundingClientRect(); return { x: r.left + r.width / 2 - o.left, y: r.top + r.height / 2 - o.top }; };
    function fanGeom() {
      if (!fanSet.length || !fanTown) return; const sg = signOf(fanTown); if (!sg) return;
      const o = board.getBoundingClientRect(), nr = sg.querySelector('.ar-nail').getBoundingClientRect();
      const phone = getComputedStyle(sg.querySelector('.ar-nail')).display === 'none';
      if (phone) { fanSet.forEach((li) => fp[lis.indexOf(li)].querySelectorAll('path').forEach((p) => p.removeAttribute('d'))); return; }
      const nx = nr.left + nr.width / 2 - o.left, ny = nr.top + nr.height / 2 - o.top;
      fanSet.forEach((li) => { const a = pinPos(li, o), d = Math.hypot(nx - a.x, ny - a.y), mx = (nx + a.x) / 2, my = (ny + a.y) / 2 + Math.min(80, d * .16);
        const dd = `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`; fp[lis.indexOf(li)].querySelectorAll('path').forEach((p) => p.setAttribute('d', dd)); });
    }
    function fan() {
      const t = activeTown(); let set = [], ft = null;
      if (t) { set = lis.filter(match); ft = t; } else if (S.card && S.trade === 'all') { set = [S.card]; ft = S.card.dataset.town; }
      fanSet = set; fanTown = ft;
      lis.forEach((li, i) => { const on = set.includes(li); if (on) fp[i].style.setProperty('--fd', (RM() ? 0 : set.indexOf(li) * 55) + 'ms'); fp[i].classList.toggle('show', on); });
      fanGeom();
      const lit = ft; signs.forEach((b) => b.classList.toggle('lit', b.dataset.town === lit));
    }
    let rdT = 0;
    function readout() {
      const t = activeTown(), hasT = !!t, tr = S.trade; let h = '';
      const n = hasT ? (+signOf(t).dataset.n) : 0, pinned = lis.filter(match).length, all = lis.filter((l) => !hasT || l.dataset.town === t).length;
      if (S.found) { const f = S.found; h = `<b>${esc(f.name)}</b><span class="rn">${f.n != null ? f.n : ''}<small>${f.n != null ? 'documented project' + (f.n === 1 ? '' : 's') : 'in our project records'}</small></span><span class="rh">${f.note}</span>`; }
      else if (hasT) {
        let hoods = []; try { hoods = JSON.parse(signOf(t).dataset.hoods); } catch (e) {}
        h = `<b>${esc(t)}</b><span class="rn">${n}<small>documented project${n === 1 ? '' : 's'}</small></span>`
          + `<span class="rh">${tr === 'all' ? `${all} photo${all === 1 ? '' : 's'} pinned here.` : (pinned ? `${pinned} pinned photo${pinned === 1 ? '' : 's'} with ${esc(tr.toLowerCase())}.` : `No pinned photo of ${esc(tr.toLowerCase())} here yet.`)}</span>`
          + (hoods.length && tr === 'all' ? `<span class="rh">In our records: ${esc(hoods.slice(0, 5).join(', '))}${hoods.length > 5 ? ' and more' : ''}.</span>` : '');
      } else if (tr !== 'all') h = `<b>${esc(tr)}</b><span class="rh">${pinned} of the ${lis.length} pinned photos. Pick a town sign to narrow it.</span>`;
      else h = '<b>Pick a town sign</b><span class="rh">to pull its threads, or type your town below.</span>';
      read.innerHTML = h;
    }
    function apply() {
      const t = activeTown(), filt = !!t || S.trade !== 'all';
      s.classList.toggle('ar-filt', filt);
      lis.forEach((li) => { const on = match(li); li.classList.toggle('on', filt && on); li.classList.toggle('off', filt && !on); });
      signs.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.town === S.lock)));
      chips.forEach((c) => { const on = c.dataset.t === S.trade; c.setAttribute('aria-checked', String(on)); });
      fan(); clearTimeout(rdT); rdT = setTimeout(readout, 40);
    }
    function revealAll() { if (!forced) { forced = true; reveal(); } }
    function setLock(t, from) {
      const was = S.lock; S.lock = (t && was === t) ? null : t; S.found = null; if (S.lock) revealAll();
      apply();
      if (S.lock) { const b = signOf(S.lock); if (!RM() && from !== 'quiet') { b.classList.remove('swing'); void b.offsetWidth; b.classList.add('swing'); }
        lis.filter(match).forEach((li) => tugAt(li, -6));
        if (matchMedia('(max-width:900px)').matches && from !== 'quiet') { const first = lis.find(match); if (first) { const r = first.getBoundingClientRect(); if (r.top < 90 || r.bottom > innerHeight - 20) first.scrollIntoView({ behavior: RM() ? 'auto' : 'smooth', block: 'center' }); } } }
    }
    function setTrade(t) { S.trade = t; S.found = null; if (t !== 'all') revealAll(); apply(); }
    signs.forEach((b) => {
      b.addEventListener('click', () => setLock(b.dataset.town));
      b.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; S.hover = b.dataset.town; apply(); });
      b.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'mouse') return; if (S.hover === b.dataset.town) { S.hover = null; apply(); } });
      b.addEventListener('focus', () => { if (b.matches(':focus-visible')) { S.hover = b.dataset.town; apply(); } });
      b.addEventListener('blur', () => { if (S.hover === b.dataset.town) { S.hover = null; apply(); } });
      b.addEventListener('keydown', (e) => { const k = e.key; if (k === 'ArrowDown' || k === 'ArrowUp') { e.preventDefault(); const i = signs.indexOf(b), n = signs[(i + (k === 'ArrowDown' ? 1 : -1) + signs.length) % signs.length]; n.focus(); } });
    });
    chips.forEach((c) => {
      c.addEventListener('click', () => setTrade(c.dataset.t));
      c.addEventListener('keydown', (e) => { const k = e.key, i = chips.indexOf(c); let n = null; if (k === 'ArrowRight' || k === 'ArrowDown') n = chips[(i + 1) % chips.length]; else if (k === 'ArrowLeft' || k === 'ArrowUp') n = chips[(i - 1 + chips.length) % chips.length]; else if (k === 'Home') n = chips[0]; else if (k === 'End') n = chips[chips.length - 1];
        if (n) { e.preventDefault(); chips.forEach((x) => (x.tabIndex = x === n ? 0 : -1)); n.focus(); setTrade(n.dataset.t); } });
    });
    s.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !dlg.open && (S.lock || S.trade !== 'all' || S.found)) { S.lock = null; S.trade = 'all'; S.found = null; q.value = ''; closeList(); chips.forEach((x) => (x.tabIndex = x.dataset.t === 'all' ? 0 : -1)); apply(); } });

    /* ================= the thread: a damped string through every pin ================= */
    let pts = [], order = [], pinIdx = [], pinFrac = [], forced = RM(), maxP = RM() ? 1 : 0, cards = lis.map(() => ({ k: 0, v: 0 }));
    function layout() {
      const o = board.getBoundingClientRect(); W = o.width; H = o.height; if (!W) return; svg.setAttribute('viewBox', `0 0 ${W.toFixed(0)} ${H.toFixed(0)}`);
      const A = lis.map((li) => Object.assign({ li }, pinPos(li, o)));
      const rows = []; [...A].sort((a, b) => a.y - b.y).forEach((a) => { const r = rows.find((r) => Math.abs(r.y - a.y) < 64); if (r) { r.a.push(a); r.y = (r.y * (r.a.length - 1) + a.y) / r.a.length; } else rows.push({ y: a.y, a: [a] }); });
      order = []; rows.sort((a, b) => a.y - b.y).forEach((r, ri) => { r.a.sort((p, q) => p.x - q.x); if (ri % 2) r.a.reverse(); order.push(...r.a); });
      pts = []; pinIdx = [];
      const add = (x, y, fixed) => pts.push({ x, y, x0: x, y0: y, vx: 0, vy: 0, fixed });
      const seg = (a, b, n) => { const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), horiz = Math.abs(dx) >= Math.abs(dy) * .8; const sag = clamp(d * .09, 8, 26), bow = clamp(d * .1, 8, 24) * (((a.x + b.x) / 2) < W / 2 ? -1 : 1);
        for (let j = 1; j <= n; j++) { const f = j / n, bump = Math.sin(Math.PI * f); add(a.x + dx * f + (horiz ? 0 : bow * bump), a.y + dy * f + (horiz ? sag * bump : 0), j === n); } };
      const first = order[0], lastP = order[order.length - 1];
      add(first.x - 80, first.y - 34, true); seg({ x: first.x - 80, y: first.y - 34 }, first, 6); pinIdx.push(pts.length - 1);
      for (let i = 1; i < order.length; i++) { seg(order[i - 1], order[i], 8); pinIdx.push(pts.length - 1); }
      seg(lastP, { x: lastP.x + 90, y: lastP.y + 30 }, 6);
      let tot = 0; const cum = [0]; for (let i = 1; i < pts.length; i++) { tot += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); cum.push(tot); }
      pinFrac = pinIdx.map((i) => cum[i] / tot);
      cards.forEach((c) => { c.k = 0; c.v = 0; }); draw(); reveal(); fanGeom();
    }
    function draw() {
      if (pts.length < 3) return; let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length - 1; i++) { const m = pts[i], n = pts[i + 1]; d += `Q${m.x.toFixed(1)} ${m.y.toFixed(1)} ${((m.x + n.x) / 2).toFixed(1)} ${((m.y + n.y) / 2).toFixed(1)}`; }
      d += `L${pts[pts.length - 1].x.toFixed(1)} ${pts[pts.length - 1].y.toFixed(1)}`; main.setAttribute('d', d); shadow.setAttribute('d', d);
    }
    function step(now) {
      raf = 0; const dt = Math.min(2.2, ((now - last) || 16.7) / 16.7); last = now; let e = 0;
      for (let i = 1; i < pts.length - 1; i++) { const p = pts[i]; if (p.fixed) continue; const l = pts[i - 1], r = pts[i + 1];
        let fx = ((l.x + r.x) / 2 - p.x) * .42 + (p.x0 - p.x) * .035, fy = ((l.y + r.y) / 2 - p.y) * .42 + (p.y0 - p.y) * .035;
        if (ptr) { const dx = p.x - ptr.x, dy = p.y - ptr.y, d = Math.hypot(dx, dy); if (d < 76) { const k = (76 - d) * .05 / (d || 1); fx += dx * k; fy += dy * k; } }
        p.vx = (p.vx + fx * dt) * .9; p.vy = (p.vy + fy * dt) * .9; }
      pts.forEach((p) => { if (p.fixed) return; p.x += p.vx * dt; p.y += p.vy * dt; e += Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.x - p.x0) * .01 + Math.abs(p.y - p.y0) * .01; });
      cards.forEach((c, i) => { c.v += (-c.k * .07 - c.v * .09) * dt; c.k += c.v * dt; e += Math.abs(c.k) * .3 + Math.abs(c.v); lis[i].style.setProperty('--k', Math.abs(c.k) < .004 ? '0' : c.k.toFixed(3)); });
      draw(); if (vis && (e > .08 || ptr)) raf = requestAnimationFrame(step); else cards.forEach((c, i) => { c.k = c.v = 0; lis[i].style.setProperty('--k', '0'); });
    }
    const kick = () => { if (!raf && !RM() && vis) { last = performance.now(); raf = requestAnimationFrame(step); } };
    function tugAt(li, v) { if (RM()) return; const i = order.findIndex((a) => a.li === li); if (i < 0) return; const pi = pinIdx[i], span = 9; pts.forEach((p, j) => { const d = Math.abs(j - pi); if (d < span && !p.fixed) p.vy += v * (1 - d / span); }); cards[lis.indexOf(li)].v += v * .18; kick(); }
    /* the pointer (mouse only): plucks the thread, swings the cards it moves past */
    let pv = 0;
    board.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse' || RM()) return; const o = board.getBoundingClientRect(), x = e.clientX - o.left, y = e.clientY - o.top; pv = ptr ? x - ptr.x : 0; ptr = { x, y };
      lis.forEach((li, i) => { const r = li.getBoundingClientRect(); if (e.clientX > r.left - 10 && e.clientX < r.right + 10 && e.clientY > r.top && e.clientY < r.bottom + 10) cards[i].v += clamp(pv * .045, -1.6, 1.6); }); kick(); });
    board.addEventListener('pointerleave', () => { ptr = null; kick(); });
    lis.forEach((li) => {
      const b = li.querySelector('.ar-card');
      b.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; S.card = li; fan(); tugAt(li, -4.5); });
      b.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'mouse') return; if (S.card === li) { S.card = null; fan(); } });
      b.addEventListener('focus', () => { if (b.matches(':focus-visible')) { S.card = li; fan(); tugAt(li, -4.5); } });
      b.addEventListener('blur', () => { if (S.card === li) { S.card = null; fan(); } });
    });

    /* ================= drawn on scroll: the thread, then each card as it is reached ================= */
    function reveal() {
      if (!order.length) return; const o = board.getBoundingClientRect();
      const y0 = order[0].y - 40, y1 = Math.max.apply(null, order.map((a) => a.y)) + 150, revealY = innerHeight * .8 - o.top;
      let p = forced ? 1 : clamp((revealY - y0) / (y1 - y0)); const np = Math.max(maxP, p), grew = np > maxP; maxP = np;
      const frac = RM() ? 1 : maxP; const off = ((1 - frac) * 1000).toFixed(1); main.style.strokeDashoffset = off; shadow.style.strokeDashoffset = off;
      order.forEach((a, k) => { if (!a.li.classList.contains('in') && maxP >= pinFrac[k] - .012) { a.li.classList.add('in'); } });
      if (grew && maxP >= 1 && !s.dataset.rippled) { s.dataset.rippled = '1'; if (!RM()) { pts.forEach((p, i) => { if (!p.fixed) p.vy += Math.sin(i * .35) * 3.2; }); kick(); } }
    }
    const bgs = $('.ar-bg'); let tick = false;
    function onScroll() { tick = false; const r = s.getBoundingClientRect(), p = clamp((r.top + r.height / 2 - innerHeight / 2) / (innerHeight * .9), -1, 1);
      if (!RM()) { bgs.firstElementChild.style.setProperty('--py', (p * -26).toFixed(1) + 'px'); bgs.lastElementChild.style.setProperty('--py', (p * -64).toFixed(1) + 'px'); }
      reveal(); if (fanSet.length) fanGeom(); }
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
    new ResizeObserver(() => { requestAnimationFrame(() => { layout(); }); }).observe(board);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => layout());

    /* ================= counting up and visibility ================= */
    function countUp(el) { const to = +el.dataset.cu; if (RM() || !isFinite(to)) return; const t0 = performance.now(), dur = 700 + Math.min(700, to * .9); el.textContent = '0';
      (function f(t) { const k = clamp((t - t0) / dur); el.textContent = String(Math.round(to * ease(k))); if (k < 1) requestAnimationFrame(f); })(t0); }
    const counted = new Set(); const cio = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting && !counted.has(en.target)) { counted.add(en.target); $$('[data-cu]', en.target).forEach(countUp); cio.unobserve(en.target); } }), { threshold: .35 });
    cio.observe($('.ar-lock')); cio.observe($('.ar-pole'));
    new IntersectionObserver((es) => es.forEach((en) => { vis = en.isIntersecting; s.classList.toggle('ar-off', !vis); if (vis) { s.classList.add('ar-seen'); onScroll(); kick(); } }), { rootMargin: '80px 0px' }).observe(s);

    /* ================= keyboard: arrows move through the photos ================= */
    function focusCard(li) { btns.forEach((b) => (b.tabIndex = -1)); const b = li.querySelector('.ar-card'); b.tabIndex = 0; b.focus(); }
    btns.forEach((b, i) => b.addEventListener('keydown', (e) => {
      const k = e.key, li = lis[i]; if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(k)) return; e.preventDefault();
      const rc = (l) => { const r = l.querySelector('.ar-pin').getBoundingClientRect(); return { x: r.left, y: r.top }; }, me = rc(li); let n = null;
      if (k === 'ArrowRight') n = lis[Math.min(lis.length - 1, i + 1)]; else if (k === 'ArrowLeft') n = lis[Math.max(0, i - 1)]; else if (k === 'Home') n = lis[0]; else if (k === 'End') n = lis[lis.length - 1];
      else { const dir = k === 'ArrowDown' ? 1 : -1; let best = 1e9; lis.forEach((l) => { const c = rc(l), dy = (c.y - me.y) * dir; if (dy > 40) { const sc = Math.abs(c.x - me.x) * 2 + dy; if (sc < best) { best = sc; n = l; } } }); }
      if (n && n !== li) { focusCard(n); const r = n.getBoundingClientRect(); if (r.top < 90 || r.bottom > innerHeight - 10) n.scrollIntoView({ block: 'center', behavior: RM() ? 'auto' : 'smooth' }); }
    }));
    btns.forEach((b) => b.addEventListener('click', () => openDlg(lis[btns.indexOf(b)])));

    /* ================= the in-page viewer ================= */
    const dlg = $('.ar-dlg'), wrap = $('.ar-dwrap', dlg), dimg = $('.ar-dfig img', dlg), dfig = $('.ar-dfig', dlg), dk = $('.ar-dk', dlg), dt = $('.ar-dt', dlg), dr = $('.ar-dr', dlg), dtn = $('.ar-dtn', dlg), dshow = $('.ar-dshow', dlg);
    let navSet = [], cur = 0, closing = false, startPt = null;
    const dFocusables = () => $$('button:not([disabled]),a[href]', dlg).filter((x) => x.offsetParent !== null || x === dlg);
    function fill(li, dir) {
      const b = li.querySelector('.ar-card'), town = li.dataset.town, n = cityN.get(town.toLowerCase());
      dimg.src = li.querySelector('img').src; dimg.alt = b.dataset.alt + ' (Austin Pro)'; dt.textContent = b.dataset.hood;
      dr.innerHTML = `${esc(b.dataset.place)} · ${esc(b.dataset.when)} · ${esc(b.dataset.trades)}`;
      dk.textContent = `Photo ${cur + 1} of ${navSet.length}`;
      dtn.innerHTML = n != null ? `<b>${esc(town)}</b>: ${n} documented project${n === 1 ? '' : 's'} in our records.` : '';
      dshow.textContent = `Show ${town} on the board`; dshow.dataset.town = town;
      if (dir && !RM() && dfig.animate) { dfig.animate([{ opacity: 0, transform: `translateX(${dir * 36}px)` }, { opacity: 1, transform: 'none' }], { duration: 360, easing: 'cubic-bezier(.23,1,.32,1)' }); [dt, dr].forEach((x) => x.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: 40, easing: 'ease-out', fill: 'backwards' })); }
      btns.forEach((x) => (x.tabIndex = -1)); b.tabIndex = 0; lastLi = li;
    }
    let lastLi = null;
    function openDlg(li) {
      if (dlg.open) return; const all = lis.filter(match); navSet = all.includes(li) ? all : lis; cur = navSet.indexOf(li); closing = false;
      const from = li.querySelector('.ar-sw').getBoundingClientRect(); fill(li, 0); dlg.showModal();
      if (!RM() && wrap.animate) { const to = wrap.getBoundingClientRect(), dx = from.left + from.width / 2 - (to.left + to.width / 2), dy = from.top + from.height / 2 - (to.top + to.height / 2), sc = clamp(from.width / to.width, .2, 1);
        wrap.animate([{ transform: `translate(${dx}px,${dy}px) scale(${sc}) rotate(${getComputedStyle(li.querySelector('.ar-card')).getPropertyValue('--r') || '0deg'})`, opacity: .2 }, { transform: 'translate(0,0) scale(1.012) rotate(-.6deg)', opacity: 1, offset: .72 }, { transform: 'none', opacity: 1 }], { duration: 560, easing: 'cubic-bezier(.22,1,.36,1)' }); }
      $('.ar-dx', dlg).focus({ preventScroll: true });
    }
    function stepDlg(d) { if (navSet.length < 2) return; cur = (cur + d + navSet.length) % navSet.length; fill(navSet[cur], d); }
    function closeDlg() { if (!dlg.open || closing) return; closing = true;
      const done = () => { dlg.close(); closing = false; };
      if (!RM() && wrap.animate) { const a = wrap.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(14px) scale(.97)' }], { duration: 180, easing: 'ease-in', fill: 'forwards' }); a.onfinish = () => { done(); a.cancel(); }; } else done(); }
    dlg.addEventListener('close', () => { if (lastLi) { const b = lastLi.querySelector('.ar-card'); b.tabIndex = 0; b.focus({ preventScroll: false }); } });
    dlg.addEventListener('cancel', (e) => { e.preventDefault(); closeDlg(); });
    dlg.addEventListener('click', (e) => { if (e.target === dlg) closeDlg(); });
    $('.ar-dx', dlg).addEventListener('click', closeDlg); $('.ar-dp', dlg).addEventListener('click', () => stepDlg(-1)); $('.ar-dn', dlg).addEventListener('click', () => stepDlg(1));
    dshow.addEventListener('click', () => { const t = dshow.dataset.town; S.trade = 'all'; chips.forEach((x) => (x.tabIndex = x.dataset.t === 'all' ? 0 : -1)); S.lock = null; setLock(t, 'quiet'); lastLi = lis.find((l) => l.dataset.town === t) || lastLi; closeDlg();
      setTimeout(() => { const f = lis.find(match); if (f) { const r = f.getBoundingClientRect(); if (r.top < 90 || r.bottom > innerHeight - 20) f.scrollIntoView({ block: 'center', behavior: RM() ? 'auto' : 'smooth' }); } }, 230); });
    $('.ar-dbook', dlg).addEventListener('click', () => { closeDlg(); });
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); stepDlg(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); stepDlg(-1); }
      else if (e.key === 'Tab') { const f = dFocusables(); if (!f.length) return; const i = f.indexOf(document.activeElement); if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && (i === f.length - 1 || i < 0)) { e.preventDefault(); f[0].focus(); } } });
    dlg.addEventListener('wheel', (e) => { if (!e.target.closest('.ar-dwrap') || wrap.scrollHeight <= wrap.clientHeight) e.preventDefault(); }, { passive: false });
    dlg.addEventListener('touchmove', (e) => { if (wrap.scrollHeight <= wrap.clientHeight) e.preventDefault(); }, { passive: false });
    dfig.addEventListener('pointerdown', (e) => { startPt = { x: e.clientX, y: e.clientY, t: performance.now() }; });
    dfig.addEventListener('pointerup', (e) => { if (!startPt) return; const dx = e.clientX - startPt.x, dy = e.clientY - startPt.y; startPt = null; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) stepDlg(dx < 0 ? 1 : -1); });
    dfig.addEventListener('pointercancel', () => { startPt = null; });
    dfig.style.touchAction = 'pan-y';

    /* ================= the town finder (type-ahead over the firm's own cities and places) ================= */
    const q = $('#ar-q'), lb = $('#ar-lb'); let act = -1, items = [];
    const all = [...D.cities.map((c) => ({ label: c[0], n: c[1], city: c[0] })), ...D.places.map((p) => ({ label: p, n: null, city: cityOf(p) }))];
    function closeList() { lb.hidden = true; q.setAttribute('aria-expanded', 'false'); q.removeAttribute('aria-activedescendant'); act = -1; }
    function listOpts() { const v = q.value.trim().toLowerCase(); act = -1; if (v.length < 2) { closeList(); return; }
      const starts = all.filter((a) => a.label.toLowerCase().startsWith(v)), inc = all.filter((a) => !a.label.toLowerCase().startsWith(v) && a.label.toLowerCase().includes(v));
      items = [...starts, ...inc].slice(0, 7);
      lb.innerHTML = items.length ? items.map((a, i) => `<li role="option" id="ar-o${i}" aria-selected="false" data-i="${i}">${esc(a.label)}${a.n != null ? `<i>${a.n}</i>` : ''}</li>`).join('') : '<li class="none" role="presentation">Not in our records yet. Call (512) 550-0000 and ask.</li>';
      lb.hidden = false; q.setAttribute('aria-expanded', 'true'); }
    function choose(a) { q.value = a.label; closeList(); const name = cityName.get(a.city.toLowerCase()) || a.city, n = cityN.get(a.city.toLowerCase()), sign = signOf(name);
      S.card = null;
      if (sign) { S.found = null; S.lock = null; setLock(name, 'quiet'); if (a.n == null) { read.innerHTML = `<b>${esc(a.label)}</b><span class="rn">${n}<small>documented projects in ${esc(name)}</small></span><span class="rh">${esc(a.label.split(',')[0])} is in our project records.</span>`; } }
      else { S.lock = null; S.found = { name: a.label, n: a.n != null ? a.n : (n != null ? n : null), note: n != null && a.n == null ? `${esc(a.label.split(',')[0])} is in our project records (${esc(name)}: ${n}).` : 'No photo pinned for it on this board yet.' }; apply(); readout(); } }
    q.addEventListener('input', listOpts);
    q.addEventListener('focus', () => { if (q.value.trim().length >= 2) listOpts(); });
    q.addEventListener('keydown', (e) => { const os = $$('[role=option]', lb);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { if (!os.length) return; e.preventDefault(); act = (act + (e.key === 'ArrowDown' ? 1 : -1) + os.length) % os.length; os.forEach((o, i) => o.setAttribute('aria-selected', String(i === act))); q.setAttribute('aria-activedescendant', os[act].id); os[act].scrollIntoView({ block: 'nearest' }); }
      else if (e.key === 'Enter') { e.preventDefault(); if (act >= 0) choose(items[act]); else if (items[0] && !lb.hidden) choose(items[0]); }
      else if (e.key === 'Escape') { if (!lb.hidden) { e.stopPropagation(); closeList(); } } });
    lb.addEventListener('pointerdown', (e) => { const o = e.target.closest('[role=option]'); if (o) { e.preventDefault(); choose(items[+o.dataset.i]); } });
    q.addEventListener('blur', () => setTimeout(closeList, 140));
    $('.ar-find').addEventListener('submit', (e) => e.preventDefault());

    layout(); apply(); readout(); onScroll();
    s.__ar = { S, lis, signs, chips, fp, get pts() { return pts; }, get order() { return order; }, openDlg, closeDlg, layout, setLock, setTrade };
  }
  return { wire };
})();
