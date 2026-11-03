/* NAV POLISH: the phone menu sheet (Header 4's Menu end), scroll-spy on the header, and the cursor companion
   (completion standard: animated SVG companion, per-element reactions, 2–3 switchable variants, flawless click states,
   clean touch disable). The native cursor always stays; the companion rides beside it and never blocks a click. */
window.Nav = (function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const LINKS = [['#services', 'Services'], ['#colours', 'Colours'], ['#windows', 'Windows'], ['#reviews', 'Reviews'], ['#process', 'How a job runs'], ['#try', 'Try the job'], ['#area', 'On your street'], ['#booking', 'Book']];

  function menu() {
    const sheet = document.createElement('div'); sheet.className = 'msheet'; sheet.id = 'menu'; sheet.hidden = true; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-label', 'Menu');
    sheet.innerHTML = `<div class="mcard"><div class="mtop"><b>Menu</b><button type="button" class="mx" aria-label="Close menu">×</button></div>
      <nav aria-label="Sections">${LINKS.map(([h, t], i) => `<a href="${h}" style="--i:${i}">${t}</a>`).join('')}</nav>
      <div class="mfoot"><a class="btn key" href="https://www.austinprosiding.com/schedule-appointment">Book a free inspection</a><a class="btn light" href="tel:+15125500000">Call (512) 550-0000</a>
      <p>Mon–Fri 8–8 · Sat 8–6 · Sun 12–5</p></div></div>`;
    document.body.appendChild(sheet);
    const opener = document.querySelector('.mbar a[href="#menu"]'); if (!opener) return;
    opener.setAttribute('role', 'button'); opener.setAttribute('aria-expanded', 'false'); opener.setAttribute('aria-controls', 'menu');
    const open = () => { sheet.hidden = false; requestAnimationFrame(() => sheet.classList.add('on')); opener.setAttribute('aria-expanded', 'true'); sheet.querySelector('.mx').focus(); document.documentElement.classList.add('locked'); };
    const close = (focus = true) => { sheet.classList.remove('on'); opener.setAttribute('aria-expanded', 'false'); document.documentElement.classList.remove('locked'); setTimeout(() => (sheet.hidden = true), RM ? 0 : 260); if (focus) opener.focus(); };
    opener.addEventListener('click', (e) => { e.preventDefault(); sheet.hidden ? open() : close(); });
    sheet.addEventListener('click', (e) => { if (e.target === sheet || e.target.closest('.mx')) close(); if (e.target.closest('nav a')) close(false); });
    sheet.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); if (e.key === 'Tab') { const f = [...sheet.querySelectorAll('a,button')], a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } } });
  }

  function spy() {
    const map = { siding: 'Siding', 'svc-windows': 'Siding', roofing: 'Roofing', services: 'Siding', windows: 'Windows', area: 'Our work' };
    const items = [...document.querySelectorAll('.menu > li > a, .menu > li > button')];
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; const want = map[e.target.id];
      items.forEach((it) => it.toggleAttribute('aria-current', !!want && it.textContent.trim().startsWith(want))); }), { rootMargin: '-45% 0px -50% 0px' });
    ['services', 'windows', 'area', 'reviews', 'process', 'try', 'booking', 'colours'].forEach((id) => { const n = document.getElementById(id); if (n) io.observe(n); });
  }

  /* ---------- cursor companion ---------- */
  const VAR = {
    board: `<svg viewBox="0 0 64 64" aria-hidden="true"><g class="cbody"><rect x="8" y="24" width="48" height="13" rx="2" fill="#0E3B2C"/><rect x="8" y="34" width="48" height="3" fill="#061A13"/><rect x="8" y="24" width="48" height="2" fill="#B5DB6E"/><circle cx="16" cy="30.5" r="1.6" fill="#B5DB6E"/><circle cx="48" cy="30.5" r="1.6" fill="#B5DB6E"/></g></svg>`,
    nail: `<svg viewBox="0 0 64 64" aria-hidden="true"><g class="cbody"><rect x="22" y="12" width="20" height="5" rx="2" fill="#0E3B2C"/><path d="M29 17h6v26l-3 7-3-7z" fill="#5B636B"/><path d="M29 17h2v28l-2-2z" fill="#8A9399"/></g></svg>`,
    chip: `<svg viewBox="0 0 64 64" aria-hidden="true"><g class="cbody"><rect x="16" y="14" width="30" height="38" rx="5" fill="var(--cc,#B5DB6E)" stroke="#0E3B2C" stroke-width="3"/><rect x="16" y="42" width="30" height="10" rx="0" fill="rgba(0,0,0,.14)"/></g></svg>`,
  };
  function companion() {
    const sw = document.createElement('div'); sw.className = 'cswitch'; sw.setAttribute('role', 'radiogroup'); sw.setAttribute('aria-label', 'Cursor companion');
    sw.innerHTML = `<span>Cursor</span>${['board', 'nail', 'chip', 'off'].map((v) => `<button type="button" role="radio" aria-checked="false" data-v="${v}">${{ board: 'Board', nail: 'Nail', chip: 'Swatch', off: 'Off' }[v]}</button>`).join('')}`;
    const sill = document.querySelector('.ft .sill'); if (sill) sill.insertBefore(sw, sill.lastElementChild);
    if (!FINE) { sw.hidden = true; return; }   // touch and coarse pointers: no companion at all
    let stored = null; try { stored = localStorage.getItem('ap-cursor'); } catch (e) {}
    let v = stored || (RM ? 'off' : 'board');   // reduced motion: off unless the visitor turned it on
    const el = document.createElement('div'); el.className = 'comp'; el.setAttribute('aria-hidden', 'true'); el.innerHTML = `<div class="cv"></div><span class="ctag"></span>`; document.body.appendChild(el);
    const cv = el.querySelector('.cv'), tag = el.querySelector('.ctag');
    const set = (nv) => { v = nv; try { localStorage.setItem('ap-cursor', v); } catch (e) {} sw.querySelectorAll('button').forEach((b) => b.setAttribute('aria-checked', b.dataset.v === v)); el.hidden = v === 'off'; if (v !== 'off') cv.innerHTML = VAR[v]; };
    sw.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => set(b.dataset.v))); set(v);
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, vx = 0, vy = 0, rot = 0, raf = 0, seen = false, state = '';
    // what is under the cursor decides the companion's reaction
    const react = (t) => {
      if (!t || !t.closest) return 'idle';
      if (t.closest('canvas.pc2, .gc svg, input, textarea, select, [role=combobox]')) return 'hide';        // painting, caulking, typing: get out of the way
      if (t.closest('.loose:not(.placed), .trough:not(.hung), .arB .pc.top')) return 'grab';
      if (t.closest('.btn.key, .press, .book-btn, a[href*="schedule-appointment"]')) return 'book';
      if (t.closest('a[href^="tel:"]')) return 'call';
      if (t.closest('.sw, .chip, .fc button, .sw3 button, .book a i')) return 'swatch';
      if (t.closest('a, button, [role=button], [role=tab], [role=radio], [role=checkbox], summary, label, .tag')) return 'point';
      if (t.closest('.stage, .gst, .scene, .board, .lineview, .deck, .wallbox, .band')) return 'look';
      return 'idle'; };
    const LBL = { book: 'Book', call: 'Call', grab: 'Drag', look: '', point: '', swatch: '', idle: '', hide: '' };
    addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse') return; tx = e.clientX; ty = e.clientY; if (!seen) { x = tx; y = ty; seen = true; el.classList.add('on'); }
      const s = react(e.target); if (s !== state) { state = s; el.dataset.s = s; tag.textContent = LBL[s] || ''; }
      if (s === 'swatch' && v === 'chip') { const c = e.target.closest('[style*="--c"]'); if (c) el.style.setProperty('--cc', getComputedStyle(c).getPropertyValue('--c').trim() || '#B5DB6E'); }
      if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
    document.addEventListener('pointerleave', () => el.classList.remove('on')); document.addEventListener('pointerenter', () => seen && el.classList.add('on'));
    addEventListener('blur', () => el.classList.remove('on'));
    addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') { el.classList.remove('press'); void el.offsetWidth; el.classList.add('press'); } });
    addEventListener('pointerup', () => setTimeout(() => el.classList.remove('press'), 160));
    function tick() { raf = 0; const k = RM ? 1 : 0.2; const nx = x + (tx + 22 - x) * k, ny = y + (ty + 20 - y) * k; vx = nx - x; vy = ny - y; x = nx; y = ny;
      rot += ((v === 'board' ? vx * 1.6 : v === 'nail' ? vx * 2.4 : vx * 1.2) - rot) * 0.2; rot = Math.max(-35, Math.min(35, rot));
      el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`; cv.style.transform = `rotate(${rot.toFixed(1)}deg)`;
      if (Math.abs(tx + 22 - x) + Math.abs(ty + 20 - y) + Math.abs(rot) > 0.3) raf = requestAnimationFrame(tick); }
  }
  /* PAGE VIEWS. On a subpage the homepage anchors in the header, menu and footer have no target, so they are pointed at
     the page views (or back to the homepage section). On the homepage the default header is unchanged; ?hnav=pages is the
     switchable alternative that points it at the page views. Links keep ?review and ?hnav so the audit view carries over. */
  function pages() {
    const q = new URLSearchParams(location.search), PG = window.__PAGES || [], cur = (document.querySelector('main') || {}).dataset?.page || 'home';
    const PV = cur !== 'home' || q.get('hnav') === 'pages'; if (!PV || !PG.length) return false;
    const href = (pg, hash = '') => { const p = []; if (q.has('review')) p.push('review'); if (q.get('hnav') === 'pages') p.push('hnav=pages'); if (pg) p.push('page=' + pg); return '?' + p.join('&') + hash; };
    const NAME = Object.fromEntries(PG);
    // header: the four items go to their pages, and "More" holds the other four
    const menuEl = document.querySelector('.hdr .menu'); if (menuEl) {
      const sid = menuEl.querySelector('li > button'); menuEl.querySelectorAll('.book a').forEach((a) => (a.href = href('siding')));
      const fan = menuEl.querySelector('.book'); if (fan && !fan.querySelector('.all9')) fan.insertAdjacentHTML('beforeend', `<a class="all9" href="${href('siding')}">The Siding page →</a>`);
      const T = { Windows: 'windows', Roofing: 'roofing', 'Our work': 'work' };
      menuEl.querySelectorAll(':scope > li > a').forEach((a) => { const k = T[a.textContent.trim()]; if (k) { a.href = href(k); if (k === cur) a.setAttribute('aria-current', 'page'); } });
      if (sid && cur === 'siding') sid.setAttribute('aria-current', 'page');
      const rest = ['reviews', 'about', 'area', 'contact'].filter((k) => NAME[k]);
      const li = document.createElement('li'); li.className = 'pm9';
      li.innerHTML = `<button type="button" aria-expanded="false" aria-controls="pm9">More <svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
        <div class="pm9d" id="pm9">${rest.map((k) => `<a href="${href(k)}"${k === cur ? ' aria-current="page"' : ''}>${NAME[k]}</a>`).join('')}</div>`;
      menuEl.append(li); const b = li.querySelector('button'), d = li.querySelector('.pm9d');
      if (rest.includes(cur)) b.setAttribute('aria-current', 'page');
      const set = (o) => { b.setAttribute('aria-expanded', o); d.classList.toggle('open', o); };
      b.addEventListener('click', () => set(b.getAttribute('aria-expanded') !== 'true'));
      li.addEventListener('mouseenter', () => matchMedia('(hover:hover)').matches && set(true)); li.addEventListener('mouseleave', () => set(false));
      li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) set(false); });
      addEventListener('keydown', (e) => { if (e.key === 'Escape' && b.getAttribute('aria-expanded') === 'true') { set(false); b.focus(); } });
    }
    // the brand goes home
    if (cur !== 'home') { const br = document.querySelector('.hdr .brand'); if (br) br.href = href(''); }
    // the phone menu: every page, then (on the homepage) its sections
    const nav = document.querySelector('#menu nav'); if (nav) {
      const pl = [['', 'Homepage'], ...PG].map(([k, n], i) => `<a href="${href(k)}" style="--i:${i}"${k === (cur === 'home' ? '' : cur) ? ' aria-current="page"' : ''}>${n}</a>`).join('');
      if (cur !== 'home') { nav.setAttribute('aria-label', 'Pages'); nav.innerHTML = pl; }
      else nav.insertAdjacentHTML('beforebegin', `<nav class="pg9" aria-label="Pages">${pl}</nav>`);
    }
    // anything left that points at a missing homepage anchor: its page if it has one, else the homepage section
    const TO = { siding: 'siding', windows: 'windows', roofing: 'roofing', reviews: 'reviews', area: 'area' };
    document.querySelectorAll('a[href^="#"]').forEach((a) => { const id = a.getAttribute('href').slice(1); if (!id || document.getElementById(id)) return; a.href = TO[id] ? href(TO[id]) : href('', '#' + id); });
    return true;
  }

  return { wire() { menu(); const pv = pages(); if (!pv || (document.querySelector('main') || {}).dataset?.page === 'home') spy(); companion(); } };
})();
