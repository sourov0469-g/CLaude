/* OUR WORK PAGE (#/our-work). Prefix po-. The firm's documented-project record, drawn from its published data (data-pod on .po): a count wall (886 squares; 312 with photos + 574 more counted), a trade ledger,
   the towns as a bar list (no geographic layout), the job file APS-4867 with a drag-through timeline, a trade-filtered gallery with a before/after wipe viewer (a real <dialog>: focus trap, Esc, arrow keys,
   focus returns), and 'how to read a price band'. DOM is built in wire() while the page is hidden; anything that needs layout waits for the 'fpage' event.
   Reduced motion: no autoplay and no easing (values snap). Touch: drag areas use touch-action:pan-y so vertical scrolling is never blocked. */
window.FPWork = (function () {
  const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t, ease = (t) => 1 - Math.pow(1 - t, 3);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  let ROOT, D, shown = false; const onShow = [];
  const $ = (s, r) => (r || ROOT).querySelector(s), $$ = (s, r) => Array.from((r || ROOT).querySelectorAll(s));
  function tween(o, k, to, ms, fn, done) {
    if (o['_c' + k]) o['_c' + k](); if (RM() || ms <= 0) { o[k] = to; fn(); done && done(); return () => {}; }
    const from = o[k], t0 = performance.now(); let id = 0, dead = false;
    const step = (now) => { if (dead) return; const t = clamp((now - t0) / ms, 0, 1); o[k] = lerp(from, to, ease(t)); fn(); if (t < 1) id = requestAnimationFrame(step); else { o['_c' + k] = null; done && done(); } };
    id = requestAnimationFrame(step); o['_c' + k] = () => { dead = true; cancelAnimationFrame(id); o['_c' + k] = null; }; return o['_c' + k];
  }
  function drag(node, onMove, onStart, onEnd, lazy) {   // drag with pointer capture; vertical scroll is left to the browser (touch-action: pan-y on the node). lazy: a press on a button only becomes a drag after 6 px, so a plain click still reaches the button
    let on = false, pend = null;
    const begin = (e) => { on = true; try { node.setPointerCapture(e.pointerId); } catch (_) {} onStart && onStart(e); };
    node.addEventListener('pointerdown', (e) => { if (e.button > 0) return; const b = e.target.closest('input,button,a'); if (b && !(lazy && b.tagName === 'BUTTON')) return; if (b) { pend = { x: e.clientX, y: e.clientY }; return; } begin(e); onMove(e); });
    node.addEventListener('pointermove', (e) => { if (pend && Math.abs(e.clientX - pend.x) > 6) { pend = null; begin(e); node._moved = true; } if (on) onMove(e); });
    const up = (e) => { pend = null; if (!on) return; on = false; onEnd && onEnd(e); if (node._moved) setTimeout(() => { node._moved = false; }, 60); };
    node.addEventListener('pointerup', up); node.addEventListener('pointercancel', up);
  }
  function radios(box, items, label, pick, start) {
    let cur = start || 0; box.innerHTML = '';
    const btns = items.map((it, i) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'radio'); b.innerHTML = label(it, i); b.addEventListener('click', () => set(i, true)); box.append(b); return b; });
    function set(i, user) { cur = i; btns.forEach((b, j) => { b.setAttribute('aria-checked', j === i ? 'true' : 'false'); b.tabIndex = j === i ? 0 : -1; }); pick(items[i], i, user); }
    box.addEventListener('keydown', (e) => { const k = e.key; let n = null; if (k === 'ArrowRight' || k === 'ArrowDown') n = (cur + 1) % items.length; else if (k === 'ArrowLeft' || k === 'ArrowUp') n = (cur + items.length - 1) % items.length; else if (k === 'Home') n = 0; else if (k === 'End') n = items.length - 1; if (n !== null) { e.preventDefault(); set(n, true); btns[n].focus(); } });
    set(cur, false); return { set, get: () => cur };
  }

  /* ================= 1. the count wall ================= */
  function wall() {
    const svg = $('.po-wsvg'), rng = $('#po-cnt'), out = $('.po-cout'), COLS = 38, TOT = 886, WITH = 312; const S = { n: 0 }; let ran = false, last = 0;
    let s = ''; for (let i = 0; i < TOT; i++) { const c = i % COLS, r = Math.floor(i / COLS); s += `<rect class="po-c" x="${(c * 10.5 + .4).toFixed(1)}" y="${r * 10 + .5}" width="8.4" height="8.4" rx="1.6"/>`; }
    svg.innerHTML = s; const cells = $$('.po-c', svg);
    function setN(n) {
      n = Math.round(clamp(n, 0, TOT)); const a = Math.min(last, n), b = Math.max(last, n);
      for (let i = a; i < b; i++) cells[i].setAttribute('class', 'po-c' + (i < n ? (i < WITH ? ' p' : ' q') : ''));
      last = n; S.n = n; rng.value = n;
      out.textContent = n === 0 ? '0' : n <= WITH ? n + ' with photos' : n < TOT ? WITH + ' with photos + ' + (n - WITH) + ' more counted' : '312 with photos + 574 more counted';
      rng.setAttribute('aria-valuetext', out.textContent);
    }
    rng.addEventListener('input', () => { if (S._cn) S._cn(); setN(+rng.value); });
    onShow.push(() => { if (ran) return; ran = true; if (RM()) { setN(TOT); return; } setTimeout(() => { if (S.n === 0) S._cn = tween(S, 'n', TOT, 2600, () => setN(S.n)); }, 500); });
    setN(0);
  }

  /* ================= 2. the trade ledger ================= */
  function trades() {
    const T = D.trades, box = $('.po-ledger'), AX = 50; let sel = null;
    const medLo = (t) => parseFloat(t.med.replace('$', '')); const maxDoc = Math.max(...T.map((t) => t.doc || 0)), maxPr = Math.max(...T.map((t) => t.pr));
    const hasPhotos = (k) => $$('.po-gi').some((li) => li.dataset.tags.split(',').includes(k));
    box.innerHTML = `<div class="po-trh" aria-hidden="true"><span>Trade</span><span>Documented · priced</span><span class="po-ax">${[0, 10, 20, 30, 40, 50].map((v) => `<em style="left:${v / AX * 100}%">$${v}k</em>`).join('')}</span></div>` + T.map((t) => {
      const mlo = medLo(t), mhi = parseFloat(t.med.split('–')[1].replace('$', ''));
      return `<div class="po-tr" role="listitem" data-k="${t.k}" tabindex="0" aria-label="${esc(t.l)}: ${t.doc ? t.doc + ' documented, ' : 'no documented count shown, '}${t.pr} priced; middle half ${t.lo === 0 ? 'under $5k' : '$' + t.lo + 'k to $' + t.hi + 'k'}; median band ${esc(t.med)}"><b class="po-tn">${esc(t.l)}</b>
<span class="po-tc"><span class="po-cl"><u><i style="--w:${t.doc ? (t.doc / maxDoc * 100).toFixed(1) : 0}%"></i></u><em>${t.doc ? t.doc : 'no count'}<small> documented</small></em></span><span class="po-cl"><u><i class="p2" style="--w:${(t.pr / maxPr * 100).toFixed(1)}%"></i></u><em>${t.pr}<small> priced</small></em></span></span>
<span class="po-ru"><i class="mh" style="left:${t.lo / AX * 100}%;width:${(t.hi - t.lo) / AX * 100}%"></i><i class="md" style="left:${mlo / AX * 100}%;width:${(mhi - mlo) / AX * 100}%"></i></span></div>`; }).join('');
    const rows = $$('.po-tr', box); const byK = (k) => T.find((t) => t.k === k);
    function reorder(by) {
      const first = rows.map((r) => r.getBoundingClientRect().top); const ord = rows.slice().sort((a, b) => { const x = byK(a.dataset.k), y = byK(b.dataset.k); if (by === 'med') return medLo(y) - medLo(x) || (y.doc || 0) - (x.doc || 0); if (by === 'pr') return y.pr - x.pr; return (y.doc || 0) - (x.doc || 0) || y.pr - x.pr; });
      ord.forEach((r) => box.append(r)); if (RM()) return;
      rows.forEach((r, i) => { const d = first[i] - r.getBoundingClientRect().top; if (d) { r.style.transition = 'none'; r.style.transform = `translateY(${d}px)`; requestAnimationFrame(() => requestAnimationFrame(() => { r.style.transition = ''; r.style.transform = ''; })); } });
    }
    radios($('.po-seg'), [['doc', 'Documented'], ['pr', 'Priced'], ['med', 'Median band']], (o) => o[1], (o, i, user) => { if (user) reorder(o[0]); }, 0); reorder('doc');
    const read = document.createElement('p'); read.className = 'po-tread'; read.setAttribute('aria-live', 'polite'); box.after(read);
    function show(r) { if (!r) return; sel = r.dataset.k; rows.forEach((x) => x.classList.toggle('on', x === r)); const t = byK(sel);
      read.innerHTML = `<b>${esc(t.l)}</b>: ${t.doc ? '<b>' + t.doc + '</b> documented projects' : 'no documented count shown'}, <b>${t.pr}</b> priced. Middle half of the priced jobs: ${t.lo === 0 ? 'under $5k' : '$' + t.lo + 'k–$' + t.hi + 'k'}. Median band: <b>${esc(t.med)}</b>.` + (hasPhotos(t.k) ? ` <button type="button" class="po-lk" data-k="${t.k}">See ${esc(t.l.toLowerCase())} photos</button>` : ''); }
    rows.forEach((r) => { r.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') show(r); }); r.addEventListener('focus', () => show(r)); r.addEventListener('click', () => show(r)); });
    read.addEventListener('click', (e) => { const b = e.target.closest('.po-lk'); if (b) FPWork.filter(b.dataset.k, true); });
    show(rows.find((r) => r.dataset.k === 'windows'));
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { box.classList.add('po-seen'); io.disconnect(); } }), { threshold: .15 }) : null; if (io && !RM()) io.observe(box); else box.classList.add('po-seen');
  }

  /* ================= 3. towns (a bar list; no geographic layout) ================= */
  function towns() {
    const all = D.towns, bars = all.filter((t) => t[1] >= D.townmin), box = $('.po-bars'); let mode = 0;
    box.innerHTML = bars.map((t, i) => `<div class="po-br" role="listitem" data-i="${i}"><span class="po-bn">${esc(t[0])}</span><u><i style="--w:0%"></i></u><b>${t[1]}</b></div>`).join('');
    const rows = $$('.po-br', box);
    function draw() { const m = mode ? Math.max(...bars.slice(1).map((t) => t[1])) : bars[0][1]; rows.forEach((r, i) => { const v = bars[i][1]; const off = mode && i === 0; r.classList.toggle('off', off); r.querySelector('i').style.setProperty('--w', off ? '0%' : (v / m * 100).toFixed(1) + '%'); r.querySelector('u').classList.toggle('x', off); }); }
    radios($('.po-seg2'), ['All towns', 'Without Austin'], (o) => o, (o, i) => { mode = i; draw(); }, 0);
    const fi = $('#po-fi'), fl = $('.po-fl'), fo = $('.po-fo');
    function find() { const q = fi.value.trim().toLowerCase(); fl.innerHTML = ''; if (!q) { fo.textContent = ''; return; }
      const m = all.filter((t) => t[0].toLowerCase().includes(q)).slice(0, 8);
      if (!m.length) { fo.textContent = 'No documented projects recorded in a town called “' + fi.value.trim() + '”.'; return; }
      const ex = all.find((t) => t[0].toLowerCase() === q); fo.textContent = ex ? ex[0] + ': ' + ex[1] + ' documented project' + (ex[1] === 1 ? '' : 's') + '.' : m.length + ' town' + (m.length === 1 ? '' : 's') + ' match.';
      fl.innerHTML = m.map((t) => `<li><span>${esc(t[0])}</span><b>${t[1]}</b></li>`).join(''); }
    fi.addEventListener('input', find);
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { box.classList.add('po-seen'); draw(); io.disconnect(); } }), { threshold: .2 }) : null; if (io && !RM()) io.observe(box); else { box.classList.add('po-seen'); draw(); }
  }

  /* ================= 4. the job file: a timeline you drag through ================= */
  function casefile() {
    const st = D.steps, trk = $('.po-trk'), hd = $('.po-hd2'), rf = $('.po-rf'), ev = $('.po-ev'), card = { n: $('.po-cn'), h: $('.po-ch'), d: $('.po-cd'), p: $('.po-cp2') }, imgA = $('.po-ci-a'), imgB = $('.po-ci-b'), lab = $('.po-cil'), days = $$('.po-cdays i');
    const POS = [.035, .095, .43, .74, .975]; const DAY0 = .74, DAYW = .06; const S = { v: POS[0] }; let step = -1, srcs = null;
    const hotspots = [.035, .095, .43, .74, .975];
    ev.innerHTML = st.map((s, i) => `<li style="left:${POS[i] * 100}%"><button type="button" aria-label="Go to: ${esc(s[0])}, ${esc(s[1])}"><i>${i + 1}</i><span><b>${esc(s[0])}</b><em>${esc(s[1].replace('August 31 – September 3, 2026', 'Aug 31 – Sep 3').replace(', 2026', ''))}</em></span></button></li>`).join('');
    $$('button', ev).forEach((b, i) => b.addEventListener('click', () => { if (trk._moved) return; go(POS[i]); }));
    const dayEls = [0, 1, 2, 3].map((i) => { const d = document.createElement('i'); d.style.left = ((DAY0 + i * DAYW) * 100) + '%'; d.style.width = (DAYW * 100) + '%'; d.className = 'po-dy'; d.setAttribute('aria-hidden', 'true'); d.textContent = ['Aug 31', 'Sep 1', 'Sep 2', 'Sep 3'][i]; return d; });
    const band = document.createElement('div'); band.className = 'po-onsite'; band.style.left = (DAY0 * 100) + '%'; band.style.width = (4 * DAYW * 100) + '%'; band.setAttribute('aria-hidden', 'true'); dayEls.forEach((d) => band.append(d)); $('.po-rail').after(band);
    function imgs() { if (srcs) return srcs; const li = $$('.po-gi').find((x) => x.dataset.place === 'Village at Western Oaks, Austin'); const j6 = $('.po-cp[data-i="6"] img'); if (!li) return null; srcs = { before: li.dataset.b, after: li.querySelector('img').src, mid: j6 ? j6.src : li.dataset.b, ba: li.dataset.ba, aa: li.querySelector('img').alt, ma: j6 ? j6.alt : '' }; return srcs; }
    const stepAt = (v) => { let k = 0; POS.forEach((p, i) => { if (v >= p - .004) k = i; }); return k; };
    function render() {
      const v = S.v; hd.style.left = (v * 100) + '%'; rf.style.width = (v * 100) + '%'; const k = stepAt(v);
      const dn = v >= DAY0 ? clamp(Math.floor((v - DAY0) / DAYW) + 1, 1, 4) : 0; dayEls.forEach((d, i) => d.classList.toggle('on', i < dn)); days.forEach((d, i) => d.classList.toggle('on', i < dn));
      hd.setAttribute('aria-valuenow', Math.round(v * 100)); hd.setAttribute('aria-valuetext', (k + 1) + ' of 5: ' + st[k][0] + ', ' + st[k][1] + (dn ? ', on-site day ' + dn + ' of 4' : ''));
      $$('button', ev).forEach((b, i) => { b.classList.toggle('on', i === k); b.classList.toggle('past', i < k); });
      const key = k + ':' + dn; if (key !== render.key) { render.key = key; const im = imgs();
        if (k !== step) { step = k; card.n.textContent = 'Step ' + (k + 1) + ' of 5'; card.h.textContent = st[k][0]; card.d.textContent = st[k][1]; card.p.textContent = st[k][2];
          if (im) { const useB = k < 3, useM = k === 3; const cur = useM ? im.mid : useB ? im.before : im.after; imgB.src = imgA.src || cur; imgB.alt = imgA.alt; imgA.src = cur; imgA.alt = useM ? im.ma : useB ? im.ba : im.aa; imgA.classList.remove('po-fade'); void imgA.offsetWidth; imgA.classList.add('po-fade'); lab.textContent = useM ? 'On site · a photo from this job' : useB ? 'Before' : 'After'; } }
      }
    }
    function go(v) { tween(S, 'v', clamp(v, 0, 1), 600, render); }
    drag(trk, (e) => { const r = trk.getBoundingClientRect(); S.v = clamp((e.clientX - r.left) / r.width, 0, 1); render(); }, () => { if (S._cv) S._cv(); }, null, true);
    hd.addEventListener('keydown', (e) => { const k = e.key; const cur = stepAt(S.v); let t = null; if (k === 'ArrowRight' || k === 'ArrowUp') { if (S.v >= DAY0 && S.v < .975) t = Math.min(.975, S.v + DAYW); else t = POS[Math.min(4, cur + 1)]; } else if (k === 'ArrowLeft' || k === 'ArrowDown') { if (S.v > DAY0 + .001) t = Math.max(DAY0, S.v - DAYW); else t = POS[Math.max(0, cur - 1)]; } else if (k === 'Home') t = 0; else if (k === 'End') t = 1; if (t !== null) { e.preventDefault(); if (t === POS[4] || k === 'End') t = .975; go(t); } });
    render(); onShow.push(() => { if (!srcs) { render.key = null; step = -1; render(); } });
  }

  /* ================= 5. the gallery and its wipe viewer ================= */
  function gallery() {
    const chips = $('.po-chips'), lis = $$('.po-gi'), stat = $('.po-gst'), dlg = $('.po-dlg'); const names = D.tagnames; let f = 'all', list = [], idx = 0, opener = null, wipe = 50, wo = null;
    const count = (k) => lis.filter((li) => k === 'all' || li.dataset.tags.split(',').includes(k)).length;
    const keys = ['all'].concat(Object.keys(names).filter((k) => count(k)));
    chips.innerHTML = keys.map((k) => `<button type="button" class="po-chip" data-k="${k}" aria-pressed="${k === 'all'}">${k === 'all' ? 'All' : esc(names[k])} <small>${count(k)}</small></button>`).join('');
    function apply(k, scroll) { f = k; $$('.po-chip', chips).forEach((c) => c.setAttribute('aria-pressed', c.dataset.k === k ? 'true' : 'false'));
      let n = 0, pr = 0; lis.forEach((li) => { const on = k === 'all' || li.dataset.tags.split(',').includes(k); li.hidden = !on; if (on) { n++; if (li.dataset.kind === 'pair') pr++; li.style.setProperty('--d', Math.min(n, 12) * 35 + 'ms'); li.classList.remove('po-pop'); void li.offsetWidth; li.classList.add('po-pop'); } });
      stat.textContent = (k === 'all' ? 'Showing all ' + n : 'Showing ' + n + ' ' + names[k].toLowerCase()) + ' item' + (n === 1 ? '' : 's') + ': ' + pr + ' before-and-after pair' + (pr === 1 ? '' : 's') + ' and ' + (n - pr) + ' photo' + (n - pr === 1 ? '' : 's') + '.';
      if (scroll) { const g = $('#po-gal'); g.scrollIntoView({ block: 'start', behavior: RM() ? 'instant' : 'smooth' }); } }
    chips.addEventListener('click', (e) => { const c = e.target.closest('.po-chip'); if (c) apply(c.dataset.k); }); apply('all');
    FPWork.filter = (k, s) => { if (keys.includes(k)) apply(k, s); };
    // viewer
    const dst = $('.po-dst'), ia = $('.po-di-a'), ib = $('.po-di-b'), dl = $('.po-dl'), tb = $('.po-dtb'), ta = $('.po-dta'), dtt = $('#po-dt'), ddd = $('#po-dd'), dc = $('.po-dc');
    const stopWipe = () => { if (wo && wo._cw) wo._cw(); };
    function setWipe(p) { wipe = clamp(p, 0, 100); ia.style.clipPath = `inset(0 0 0 ${wipe}%)`; dl.style.left = wipe + '%'; dl.setAttribute('aria-valuenow', Math.round(wipe)); tb.style.opacity = wipe > 14 ? 1 : 0; ta.style.opacity = wipe < 86 ? 1 : 0; }
    function fill() { const it = list[idx]; const pair = it.kind === 'pair'; ia.src = it.a; ia.alt = it.aa; ib.src = pair ? it.b : ''; ib.alt = pair ? it.ba : ''; dst.classList.toggle('po-single', !pair);
      dl.hidden = !pair; tb.hidden = ta.hidden = !pair; dtt.textContent = it.title; ddd.textContent = it.desc; dc.textContent = (idx + 1) + ' of ' + list.length; $('.po-dp', dlg).disabled = idx === 0; $('.po-dn', dlg).disabled = idx === list.length - 1;
      if (wo && wo._cw) wo._cw(); if (pair) { setWipe(50); if (!RM()) { setWipe(100); wo = { w: 100 }; tween(wo, 'w', 50, 900, () => setWipe(wo.w)); } } else ia.style.clipPath = 'none'; }
    const fromLi = (li) => { const im = li.querySelector('img'); const pair = li.dataset.kind === 'pair'; return pair ? { kind: 'pair', a: im.src, aa: im.alt, b: li.dataset.b, ba: li.dataset.ba, title: li.dataset.place + ' · ' + li.dataset.when, desc: 'Installed: ' + li.dataset.inst + ' · ' + li.dataset.band } : { kind: 'photo', a: im.src, aa: im.alt, title: li.dataset.place + ' · ' + li.dataset.when, desc: li.dataset.trades }; };
    function open(items, i, from) { list = items; idx = i; opener = from; fill(); if (!dlg.open) { dlg.showModal(); document.documentElement.classList.add('po-lock'); } setTimeout(() => $('.po-dx', dlg).focus(), 0); }
    function close() { if (dlg.open) dlg.close(); }
    dlg.addEventListener('close', () => { document.documentElement.classList.remove('po-lock'); if (opener && opener.isConnected) opener.focus({ preventScroll: true }); });
    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); }); $('.po-dx', dlg).addEventListener('click', close);
    $('.po-dp', dlg).addEventListener('click', () => { if (idx > 0) { idx--; fill(); } }); $('.po-dn', dlg).addEventListener('click', () => { if (idx < list.length - 1) { idx++; fill(); } });
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') { const fs = $$('button:not([disabled]),[tabindex="0"]', dlg).filter((x) => !x.hidden && x.offsetParent !== null); if (!fs.length) return; const a = fs[0], z = fs[fs.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } return; }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { if (e.target === dl) { e.preventDefault(); stopWipe(); setWipe(wipe + (e.key === 'ArrowRight' ? 5 : -5)); return; } e.preventDefault(); if (e.key === 'ArrowLeft' && idx > 0) { idx--; fill(); } if (e.key === 'ArrowRight' && idx < list.length - 1) { idx++; fill(); } }
      if (e.target === dl) { stopWipe(); const d = { PageUp: 20, PageDown: -20 }[e.key]; if (e.key === 'Home') { e.preventDefault(); setWipe(0); } else if (e.key === 'End') { e.preventDefault(); setWipe(100); } else if (d) { e.preventDefault(); setWipe(wipe + d); } } });
    drag(dst, (e) => { if (dst.classList.contains('po-single')) return; const r = dst.getBoundingClientRect(); setWipe((e.clientX - r.left) / r.width * 100); }, stopWipe);
    $('.po-grid').addEventListener('click', (e) => { const b = e.target.closest('.po-card'); if (!b) return; const vis = lis.filter((li) => !li.hidden); const li = b.closest('.po-gi'); open(vis.map(fromLi), vis.indexOf(li), b); });
    // the eight job photos (same viewer)
    const cps = $$('.po-cp'); $('.po-cphl').addEventListener('click', (e) => { const b = e.target.closest('.po-cp'); if (!b) return; open(cps.map((x, i) => { const im = x.querySelector('img'); return { kind: 'photo', a: im.src, aa: im.alt, title: 'Job APS-4867 · photo ' + (i + 1) + ' of 8', desc: 'Village At Western Oaks, Austin · shot on site by the crew' }; }), cps.indexOf(b), b); });
  }

  /* ================= 6. how to read a price band ================= */
  function band() {
    const B = ['Under $2k', '$2k–$5k', '$5k–$10k', '$10k–$15k', '$15k–$20k', '$20k–$25k', '$25k–$30k', '$30k–$40k', '$40k–$50k', '$50k–$60k', '$60k–$75k', '$75k–$100k', '$100k+'];
    const L = [{ n: 'Siding portion', band: '$25k–$30k', what: 'James Hardie 8.25″ Smooth fiber cement siding' }, { n: 'Exterior painting portion', band: '$5k–$10k', what: 'Sherwin Williams SuperPaint exterior finish' }];
    const lad = $('.po-ladder'), rd = $('.po-lread');
    lad.innerHTML = '<i class="po-mk" aria-hidden="true"></i>' + B.slice().reverse().map((b, i) => `<div class="po-rg" data-b="${esc(b)}"><span>${esc(b)}</span></div>`).join('');
    const mk = $('.po-mk', lad), rungs = $$('.po-rg', lad);
    function place(bn) { const r = rungs.find((x) => x.dataset.b === bn); rungs.forEach((x) => x.classList.toggle('on', x === r)); if (r) { mk.style.height = r.offsetHeight + 'px'; mk.style.transform = `translateY(${r.offsetTop}px)`; } }
    radios($('.po-wl'), L, (l) => `<small>${esc(l.n)}</small><b>${esc(l.band)}</b><span>${esc(l.what)}</span>`, (l) => { rd.innerHTML = `<b>${esc(l.n)}: ${esc(l.band)}.</b> Materials and labor for this trade on this job, before discounts, excluding tax. A band is a range, not a quote: your own price comes at the free inspection.`; mk.dataset.b = l.band; place(l.band); }, 0);
    const redo = () => place($('.po-wl [aria-checked="true"]') ? L[$$('.po-wl [role="radio"]').findIndex((b) => b.getAttribute('aria-checked') === 'true')].band : L[0].band); onShow.push(redo); addEventListener('resize', () => shown && redo());
  }

  function parallax() {
    const bgs = $$('.po-bg'); let tick = 0;
    function run() { tick = 0; if (!shown || RM()) return; const vh = innerHeight; bgs.forEach((bg) => { const r = bg.parentNode.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; bg.style.setProperty('--p', clamp((vh - r.top) / (vh + r.height), 0, 1).toFixed(3)); }); }
    addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(run); }, { passive: true }); addEventListener('resize', run); onShow.push(run);
  }

  function wire(root) {
    ROOT = root.querySelector ? (root.querySelector('.po') || null) : null; if (!ROOT) return; D = JSON.parse(ROOT.dataset.pod);
    wall(); gallery(); trades(); towns(); casefile(); band(); parallax();
    document.addEventListener('fpage', (e) => { shown = e.detail === 'our-work'; if (shown) onShow.forEach((f) => f()); });
    const rv = $$('.po-hd,.po-tctl,.po-ledger,.po-tg,.po-cgrid,.po-meta,.po-scope,.po-cph-w,.po-chips,.po-grid,.po-bgrid,.po-lock,.po-close'); rv.forEach((n) => n.classList.add('po-rv'));
    if ('IntersectionObserver' in window && !RM()) { const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('po-in-v'); io.unobserve(x.target); } }), { threshold: .08 }); rv.forEach((n) => io.observe(n)); } else rv.forEach((n) => n.classList.add('po-in-v'));
  }
  return { wire, filter() {} };
})();
