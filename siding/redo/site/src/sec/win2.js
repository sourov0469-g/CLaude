/* WINDOWS, new versions for upgrade Round 3.
   C — one window, taken apart (Apple AirPods Pro: a pinned stage where scroll takes the product apart and the numbers arrive
       as events; Ever, craft note only: an exploded visualisation that reads like a drawing, not a render). A single-hung
       replacement window as the firm fits it, in five real parts: trim and sill, frame, lower sash, upper sash, insect screen.
       Small 3D-feel on one element only (no big 3D). Parts and figures: FACTS.md.
   D — window jobs, on record (Lando Norris: a bespoke archive gallery). The firm's own published window projects, each
       photo captioned with its recorded place, month and trades, linked to the project page. */
window.Win2 = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BOOK = 'https://www.austinprosiding.com/schedule-appointment';
  const CAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4"/></svg>';
  const book = `<a class="btn key" href="${BOOK}">Book a free inspection<span class="tab">${CAL}</span></a>`;
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------- C ---------- */
  const PARTS = [
    ['Trim and sill', 'Our casing closes the gap between the new frame and your siding, with a sill to shed water.'],
    ['Frame', 'Set into the old opening, squared, and sealed to the wall.'],
    ['Lower sash', 'The half that opens: it lifts, sliding up behind the upper sash.'],
    ['Upper sash', 'Fixed, to the outside. Each sash holds two panes on a sealed spacer, with a Low-E coat; grilles, if you want them, sit between the panes.'],
    ['Insect screen', 'Outside, over the half that opens.']];
  const EV = [['388', 388, 'documented window jobs'], ['330', 330, 'of 376 priced jobs used NT Windows, Simonton or Andersen'],
    ['2 days', 2, 'on site for most window-only jobs'], ['$10k–$15k', 0, 'median band across 376 priced window jobs'], ['Premier', 0, 'Andersen Certified Premier contractor']];
  const glassX = () => `<svg class="gx" viewBox="0 0 260 170" role="img" aria-label="Section through the glass: outer pane, Low-E coat on its inner face, sealed spacer, inner pane.">
      <rect x="70" y="14" width="14" height="136" class="pane"/><rect x="146" y="14" width="14" height="136" class="pane"/>
      <path class="lowe" d="M84 18V146" pathLength="1"/><rect x="88" y="14" width="54" height="12" class="sp"/><rect x="88" y="138" width="54" height="12" class="sp"/>
      <path class="ld" d="M70 40H22M84 70H22M115 20V4H200M160 110H238" pathLength="1"/>
      <text x="20" y="36" text-anchor="end">Out</text><text x="240" y="106" text-anchor="end">In</text>
      <text x="20" y="66" text-anchor="end" class="lw">Low-E</text><text x="204" y="8">Sealed spacer</text></svg>`;
  const C = () => `<section class="sec wnC" id="windows" aria-labelledby="wnC-h"><div class="stage">
    <div class="cp"><h2 class="sec-h" id="wnC-h" data-split>One window, taken apart.</h2>
      <p class="sec-p">A single-hung replacement window as we fit it, part by part.</p>
      <ol class="pl">${PARTS.map(([n, d], i) => `<li><button type="button" data-i="${i}" aria-pressed="${!i}"><span class="no">${i + 1}</span><span class="tx"><b>${n}</b><span>${d}</span></span></button></li>`).join('')}</ol>
      <div class="ev" aria-live="polite">${EV.map(([b, n, s], i) => `<p class="e${i ? '' : ' on'}" data-i="${i}"><b ${n ? `data-n="${n}"` : ''} data-t="${b}">${b}</b><span>${s}</span></p>`).join('')}</div>
      ${book}</div>
    <div class="view" role="img" aria-label="A single-hung window in a lap-sided wall; scrolling separates it into trim and sill, frame, lower sash, upper sash and insect screen.">
      <div class="rig"><div class="obj">
        <div class="pt p0" data-i="0"><i class="wall"></i><i class="cas"></i><i class="sill"></i><span class="tg">1</span></div>
        <div class="pt p1" data-i="1"><i class="fr"></i><span class="tg">2</span></div>
        <div class="pt p2" data-i="2"><i class="sa lo"><i class="gl"></i><i class="lift"></i></i><span class="tg">3</span></div>
        <div class="pt p3" data-i="3"><i class="sa up"><i class="gl"><i class="gr"></i></i></i><span class="tg">4</span></div>
        <div class="pt p4" data-i="4"><i class="scr"></i><span class="tg">5</span></div>
      </div></div>${glassX()}
      <span class="hint" aria-hidden="true">Scroll to take it apart</span></div>
    <div class="prog" aria-hidden="true"><i></i></div></div></section>`;

  function wireC(root) {
    const s = root.querySelector('.wnC'); if (!s) return;
    const obj = s.querySelector('.obj'), view = s.querySelector('.view'), pts = [...s.querySelectorAll('.pt')], btns = [...s.querySelectorAll('.pl button')], evs = [...s.querySelectorAll('.ev .e')], bar = s.querySelector('.prog i');
    const flow = () => innerWidth <= 860 || RM; const sm = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    let act = 0, raf = 0;
    const count = (b) => { const n = +b.dataset.n; if (!n || RM) { b.textContent = b.dataset.t; return; } const t0 = performance.now(), u = b.dataset.t.replace(/^[\d,]+/, '');
      const st = (now) => { const k = Math.min(1, (now - t0) / 700), v = Math.round(n * (1 - Math.pow(1 - k, 3))); b.textContent = v.toLocaleString('en-US') + u; if (k < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); };
    function setAct(i) { if (i === act) return; act = i; btns.forEach((b, k) => b.setAttribute('aria-pressed', k === i)); evs.forEach((e, k) => e.classList.toggle('on', k === i)); count(evs[i].querySelector('b'));
      pts.forEach((p, k) => p.classList.toggle('on', k === i)); s.classList.toggle('glass', i === 3); }
    function pose(e, ry, rx) { obj.style.setProperty('--e', e.toFixed(3)); obj.style.setProperty('--ry', ry.toFixed(2) + 'deg'); obj.style.setProperty('--rx', rx.toFixed(2) + 'deg'); }
    const fit = () => { const r = view.getBoundingClientRect(); view.style.setProperty('--s', Math.min(r.width / 700, r.height / 700).toFixed(3)); };
    function upd() { raf = 0; fit();
      if (flow()) { s.classList.add('flow'); const on = RM || view.classList.contains('in'); pose(on ? 0.8 : 0, on ? -30 : 0, on ? 8 : 0); pts.forEach((p, k) => p.classList.toggle('on', k === act)); return; }
      s.classList.remove('flow'); const r = s.getBoundingClientRect(), tot = s.offsetHeight - innerHeight, p = Math.max(0, Math.min(1, -r.top / Math.max(1, tot)));
      const e = sm(0.04, 0.2, p) * (1 - sm(0.88, 0.98, p)); pose(e, -30 * e, 10 * e); bar.style.transform = `scaleX(${p.toFixed(3)})`;
      s.classList.toggle('apart', e > 0.5); setAct(Math.max(0, Math.min(4, Math.floor((p - 0.2) / 0.66 * 5)))); }
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd); new ResizeObserver(() => fit()).observe(view);
    // the list is also the way in: on the pinned stage it scrolls to the part; in flow it shows the part
    btns.forEach((b, i) => b.addEventListener('click', () => { if (flow()) { setAct(i); return; } const tot = s.offsetHeight - innerHeight;
      scrollTo({ top: s.offsetTop + tot * (0.2 + 0.66 * (i + 0.5) / 5), behavior: RM ? 'auto' : 'smooth' }); }));
    pts[0].classList.add('on'); upd();
    // in flow the window opens out once, as it arrives
    if (!RM) new IntersectionObserver((es, io) => es.forEach((en) => { if (en.isIntersecting && flow()) { io.disconnect(); view.classList.add('in'); upd(); } }), { threshold: 0.4 }).observe(view);
  }

  /* ---------- D ---------- */
  const D = () => { const J = window.__WINP || [];
    let yr = '';
    const rows = J.map((j, i) => { const y = j.when.slice(-4), head = y !== yr ? `<li class="yr" aria-hidden="true"><span>${(yr = y)}</span></li>` : '';
      return `${head}<li class="row" data-only="${j.trades === 'Windows' ? 1 : 0}"><button type="button" data-i="${i}" aria-pressed="${!i}" aria-controls="wnD-vw">
        <span class="no">${String(i + 1).padStart(2, '0')}</span><span class="pl">${esc(j.place)}</span><span class="wh">${esc(j.when)}</span><span class="tr">${esc(j.trades)}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></li>`; }).join('');
    const figs = J.map((j, i) => `<figure class="ph${i ? '' : ' on'}" data-i="${i}" ${i ? 'aria-hidden="true"' : ''}>${j.photos.map((p, k) => `<img src="${p.src}" alt="${esc(p.alt)}" class="${k ? 'alt' : ''}" decoding="async" loading="lazy">`).join('')}
        <figcaption><b>${esc(j.place)}</b><span>${esc(j.when)} · ${esc(j.trades)}</span>${j.photos.length > 1 ? `<button type="button" class="nx">Photo <i>1</i> of ${j.photos.length}</button>` : ''}<a href="${j.href}" target="_blank" rel="noopener">See the project</a></figcaption></figure>`).join('');
    const nOnly = J.filter((j) => j.trades === 'Windows').length;
    return `<section class="sec wnD" id="windows" aria-labelledby="wnD-h">
      <div class="hd"><h2 class="sec-h" id="wnD-h" data-split>Window jobs, on record.</h2>
        <p class="sec-p">${J.length} window projects from the ones we publish, each with the place and month it was done. Pick a row to see it.</p>
        <div class="flt" role="group" aria-label="Show"><button type="button" aria-pressed="true" data-f="all">All ${J.length}</button><button type="button" aria-pressed="false" data-f="1">Windows only, ${nOnly}</button><button type="button" aria-pressed="false" data-f="0">With other trades, ${J.length - nOnly}</button></div></div>
      <div class="arc"><div class="vw" id="wnD-vw" aria-live="polite">${figs}<span class="wipe" aria-hidden="true"></span></div>
        <ol class="idx" aria-label="Window projects">${rows}</ol></div>
      <div class="sft"><p><b>388</b> documented window jobs in all. These photographs are our own, from the project pages on this site.</p>${book}</div></section>`; };

  function wireD(root) {
    const s = root.querySelector('.wnD'); if (!s) return;
    const btns = [...s.querySelectorAll('.idx .row button')], figs = [...s.querySelectorAll('.vw .ph')], vw = s.querySelector('.vw');
    let cur = 0;
    function show(i, from) { if (i === cur) return; const old = figs[cur]; old.classList.remove('on'); old.classList.add('out'); old.setAttribute('aria-hidden', 'true'); setTimeout(() => old.classList.remove('out'), 700);
      figs[i].style.setProperty('--dir', i > cur ? 1 : -1); void figs[i].offsetWidth; figs[i].classList.add('on'); figs[i].removeAttribute('aria-hidden');
      btns.forEach((b, k) => b.setAttribute('aria-pressed', k === i)); cur = i; }
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    btns.forEach((b, i) => { b.addEventListener('click', () => show(i)); b.addEventListener('focus', () => show(i)); if (fine) b.addEventListener('pointerenter', () => show(i)); });
    // a project with two photographs: step between them
    s.querySelectorAll('.nx').forEach((n) => n.addEventListener('click', () => { const f = n.closest('.ph'), im = [...f.querySelectorAll('img')]; const k = im.findIndex((x) => !x.classList.contains('alt'));
      im[k].classList.add('alt'); const nk = (k + 1) % im.length; im[nk].classList.remove('alt'); n.querySelector('i').textContent = nk + 1; }));
    // filter: rows stay in order; year markers follow what is shown
    s.querySelectorAll('.flt button').forEach((f) => f.addEventListener('click', () => { const v = f.dataset.f; s.querySelectorAll('.flt button').forEach((x) => x.setAttribute('aria-pressed', x === f));
      let first = -1; s.querySelectorAll('.idx .row').forEach((r, k) => { const on = v === 'all' || r.dataset.only === v; r.hidden = !on; if (on && first < 0) first = k; });
      s.querySelectorAll('.idx .yr').forEach((y) => { let n = y.nextElementSibling, any = false; while (n && !n.classList.contains('yr')) { if (!n.hidden) any = true; n = n.nextElementSibling; } y.hidden = !any; });
      if (first >= 0 && btns[cur].closest('.row').hidden) show(first); }));
    // the photo leans with the pointer: a slow parallax, image against caption
    if (fine && !RM) { let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
      const tick = () => { x += (tx - x) * 0.08; y += (ty - y) * 0.08; vw.style.setProperty('--px', x.toFixed(2)); vw.style.setProperty('--py', y.toFixed(2)); raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.002 ? requestAnimationFrame(tick) : 0; };
      vw.addEventListener('pointermove', (e) => { const r = vw.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5; if (!raf) raf = requestAnimationFrame(tick); });
      vw.addEventListener('pointerleave', () => { tx = ty = 0; if (!raf) raf = requestAnimationFrame(tick); }); }
  }
  return { C, D, wire(root) { wireC(root); wireD(root); } };
})();
