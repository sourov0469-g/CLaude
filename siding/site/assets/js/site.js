/* Austin Pro concept site. Motion values from the bank's animation-parameter-library (cited per block). */
(() => {
  'use strict';
  const d = document, root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const mq = q => window.matchMedia(q);
  const mqReduce = mq('(prefers-reduced-motion: reduce)');
  const mqFine = mq('(hover: hover) and (pointer: fine)');
  const mqDesk = mq('(min-width: 900px)');
  const reduce = () => mqReduce.matches;
  const G = window.gsap;
  const ST = window.ScrollTrigger;
  if (G && ST) G.registerPlugin(ST);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const money = n => '$' + Math.round(n).toLocaleString('en-US');
  const money2 = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pmt = (P, apr, n) => apr === 0 ? P / n : P * (apr / 12) / (1 - Math.pow(1 + apr / 12, -n));
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const onEnter = (el, fn, margin = '0px 0px -12% 0px') => {
    if (!('IntersectionObserver' in window)) return fn();
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.disconnect(); fn(); } }), { rootMargin: margin });
    io.observe(el);
  };

  /* ---------------- header: scrolled state, progress, mega menu, sheet ---------------- */
  const header = $('.site-header');
  const prog = $('.scroll-prog');
  if (G && ST) {
    ST.create({
      start: 0, end: 'max',
      onUpdate: self => {
        if (prog) prog.style.transform = `scaleX(${self.progress.toFixed(4)})`;
        if (header) header.classList.toggle('is-scrolled', self.scroll() > 8);
      }
    });
  }

  const megaWrap = $('.mega-wrap');
  if (megaWrap) {
    const btn = $('button', megaWrap);
    let t;
    const set = open => { megaWrap.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    megaWrap.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { clearTimeout(t); t = setTimeout(() => set(true), 80); } });
    megaWrap.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { clearTimeout(t); t = setTimeout(() => set(false), 150); } });
    megaWrap.addEventListener('focusout', e => { if (!megaWrap.contains(e.relatedTarget)) set(false); });
    d.addEventListener('keydown', e => { if (e.key === 'Escape' && megaWrap.classList.contains('is-open')) { set(false); btn.focus(); } });
    d.addEventListener('click', e => { if (!megaWrap.contains(e.target)) set(false); });
  }

  const trapFocus = (box, e) => {
    const f = $$('a[href], button:not([disabled]), input:not([type=hidden]), textarea, [tabindex]:not([tabindex="-1"])', box).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const sheet = $('#sheet');
  const menuBtn = $('.menu-btn');
  if (sheet && menuBtn) {
    const open = () => {
      sheet.classList.add('is-open'); menuBtn.setAttribute('aria-expanded', 'true'); d.body.classList.add('is-locked');
      setTimeout(() => $('.sheet-close', sheet).focus(), 30);
    };
    const close = () => {
      sheet.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); d.body.classList.remove('is-locked'); menuBtn.focus();
    };
    menuBtn.addEventListener('click', open);
    $('.sheet-close', sheet).addEventListener('click', close);
    sheet.addEventListener('keydown', e => { if (e.key === 'Escape') close(); if (e.key === 'Tab') trapFocus(sheet, e); });
    $$('a', sheet).forEach(a => a.addEventListener('click', () => { sheet.classList.remove('is-open'); d.body.classList.remove('is-locked'); menuBtn.setAttribute('aria-expanded', 'false'); }));
  }

  /* ---------------- booking form (Iper #561 steps, #348 progress button, S0661 validation) ---------------- */
  function bookingForm(form) {
    const steps = $$('.fstep', form);
    const ind = $('.steps-ind b', form);
    const bar = $('.steps-bar i', form);
    const next = $('.btn-next', form), back = $('.back', form), submit = $('.prog-btn', form);
    const summary = $('.form-summary', form);
    let cur = 0;
    const show = i => {
      cur = i;
      steps.forEach((s, k) => s.classList.toggle('is-current', k === i));
      ind.textContent = `0${i + 1}/0${steps.length}`;
      bar.style.setProperty('--p', ((i + 1) / steps.length).toFixed(4));
      back.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      submit.hidden = i !== steps.length - 1;
      summary.classList.remove('is-on');
    };
    const stepOk = i => {
      const s = steps[i];
      const err = $('.step-err', s);
      if (!err) return true;
      const ok = $$('input', s).some(x => x.checked);
      err.hidden = ok;
      if (!ok) err.focus();
      return ok;
    };
    $$('.fstep input[type=checkbox], .fstep input[type=radio]', form).forEach(x => x.addEventListener('change', () => {
      const err = $('.step-err', x.closest('.fstep')); if (err) err.hidden = true;
    }));
    next.addEventListener('click', () => { if (stepOk(cur)) { show(cur + 1); $('legend', steps[cur]).setAttribute('tabindex', '-1'); $('legend', steps[cur]).focus(); } });
    back.addEventListener('click', () => show(cur - 1));

    const tel = $('input[type=tel]', form);
    tel.addEventListener('input', () => {
      const v = tel.value.replace(/\D/g, '').replace(/^1(?=\d{10})/, '').slice(0, 10);
      if (!v) return;
      tel.value = v.length < 4 ? `(${v}` : v.length < 7 ? `(${v.slice(0, 3)}) ${v.slice(3)}` : `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
    });
    const msg = inp => inp.validity.valueMissing ? inp.dataset.msgMissing : inp.validity.patternMismatch ? inp.dataset.msgPattern : '';
    const check = inp => {
      const f = inp.closest('.field'); const m = msg(inp);
      f.classList.toggle('is-invalid', !!m);
      inp.setAttribute('aria-invalid', m ? 'true' : 'false');
      if (m) $('.err', f).textContent = m;
      return !m;
    };
    $$('.field input[required]', form).forEach(inp => {
      inp.addEventListener('blur', () => { if (inp.value || inp.dataset.touched) check(inp); inp.dataset.touched = '1'; });
      inp.addEventListener('input', () => { if (inp.closest('.field').classList.contains('is-invalid')) check(inp); });
    });
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (cur !== steps.length - 1) { next.click(); return; }
      const bad = $$('.field input[required]', steps[cur]).filter(inp => !check(inp));
      if (bad.length) {
        $('ul', summary).innerHTML = bad.map(b => `<li><a href="#${b.id}">${msg(b)}</a></li>`).join('');
        summary.classList.add('is-on');
        $$('a', summary).forEach(a => a.addEventListener('click', ev => { ev.preventDefault(); d.getElementById(a.hash.slice(1)).focus(); }));
        summary.focus();
        return;
      }
      summary.classList.remove('is-on');
      $('.done-name', form).textContent = $('#f-name', form).value.trim() || 'there';
      const finish = () => { form.classList.add('is-done'); $('.form-done', form).focus(); };
      if (reduce()) return finish();
      submit.classList.add('is-loading');
      setTimeout(() => submit.classList.add('is-done'), 1400);
      setTimeout(finish, 1900);
    });
    show(0);
  }
  $$('form.booking').forEach(bookingForm);

  /* booking dialog: the page's own form card moves in, so there is one form and one set of ids */
  const dlg = $('#book-dialog');
  const card = $('#book .form-card');
  if (dlg && card && typeof dlg.showModal === 'function') {
    const inner = $('.dialog-inner', dlg);
    const mark = d.createComment('form-card');
    let opener = null;
    const close = () => {
      if (!dlg.open) return;
      dlg.classList.add('is-closing');
      setTimeout(() => { dlg.classList.remove('is-closing'); dlg.close(); }, reduce() ? 0 : 150);
    };
    dlg.addEventListener('close', () => { mark.replaceWith(card); d.body.classList.remove('is-locked'); if (opener) opener.focus(); });
    dlg.addEventListener('cancel', e => { e.preventDefault(); close(); });
    dlg.addEventListener('click', e => { if (e.target === dlg) close(); });
    $('.dialog-close', dlg).addEventListener('click', close);
    d.addEventListener('click', e => {
      const a = e.target.closest('[data-book]');
      if (!a) return;
      const bookSec = $('#book');
      // if the inline form is already on screen, just go there
      if (bookSec) { const r = bookSec.getBoundingClientRect(); if (r.top < innerHeight * .5 && r.bottom > innerHeight * .5) return; }
      e.preventDefault();
      opener = a;
      card.replaceWith(mark);
      inner.appendChild(card);
      d.body.classList.add('is-locked');
      dlg.showModal();
      const first = $('.fstep.is-current input, .form-done', card);
      if (first) first.focus();
    });
    window.apBook = { open: el => el.click() };
  }

  /* ---------------- reveals ---------------- */
  function splitWords(el) {
    if (el.dataset.split === 'done') return $$('.wi', el);
    const walker = d.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const frag = d.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(tok => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { frag.appendChild(d.createTextNode(tok)); return; }
        const w = d.createElement('span'); w.className = 'w';
        const wi = d.createElement('span'); wi.className = 'wi'; wi.textContent = tok;
        w.appendChild(wi); frag.appendChild(w);
      });
      n.replaceWith(frag);
    });
    el.dataset.split = 'done';
    return $$('.wi', el);
  }

  // Masked word reveal (Nick Ho): 0.6s expo.out, stagger 0.05, words from y 66px under mask
  const wordReveal = (el, delay = 0) => {
    const words = splitWords(el);
    if (!G) return;
    if (reduce()) { G.from(el, { opacity: 0, duration: .15, delay }); return; }
    return G.from(words, { y: 66, duration: .6, ease: 'expo.out', stagger: .05, delay, clearProps: 'transform' });
  };
  $$('[data-split]').forEach(el => {
    if (el.closest('.hero')) return;
    if (!G) return;
    splitWords(el);
    if (reduce()) { onEnter(el, () => G.from(el, { opacity: 0, duration: .15 })); return; }
    G.set($$('.wi', el), { y: 66 });
    onEnter(el, () => G.to($$('.wi', el), { y: 0, duration: .6, ease: 'expo.out', stagger: .05, clearProps: 'transform' }), '0px 0px -10% 0px');
  });

  // Hero: role-grouped entrance (builder brief R5): title -> body -> media, beats 0.1s apart
  const hero = $('.hero [data-roles]');
  if (hero) {
    const title = $('[data-role=title]', hero);
    const bodies = $$('[data-role=body]', hero);
    const media = $$('[data-role=media]', hero);
    if (G && !reduce()) {
      const words = splitWords(title);
      G.set(words, { y: 66 });
      G.set(bodies.concat(media), { autoAlpha: 0, yPercent: 12 });
      root.classList.add('hero-go');
      const tl = G.timeline({ delay: .05 });
      tl.to(words, { y: 0, duration: .6, ease: 'expo.out', stagger: .05, clearProps: 'transform' })
        .to(bodies, { autoAlpha: 1, yPercent: 0, duration: .8, ease: 'power2.out', stagger: .1, clearProps: 'transform,opacity,visibility' }, '-=.35')
        .to(media, { autoAlpha: 1, yPercent: 0, duration: .8, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, '-=.6');
    } else {
      root.classList.add('hero-go');
    }
  }

  // Slide-up block (Heron AI): 0.8s power2.out, stagger 0.02, autoAlpha + yPercent 12
  $$('[data-rise]').forEach(group => {
    const kids = group.matches('[data-rise=self]') ? [group] : Array.from(group.children);
    if (!G || reduce()) return;
    G.set(kids, { autoAlpha: 0, yPercent: 12 });
    onEnter(group, () => G.to(kids, { autoAlpha: 1, yPercent: 0, duration: .8, ease: 'power2.out', stagger: .02, clearProps: 'transform,opacity,visibility' }));
  });

  // Direction-aware entrance (deep-read #40): +/-100px desktop, +/-50px phone, 1.25s expo, overwrite auto
  if (G && ST && !reduce()) {
    $$('[data-dir]').forEach(el => {
      const dx = () => (mqDesk.matches ? 100 : 50);
      G.set(el, { autoAlpha: 0 });
      ST.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: self => G.fromTo(el, { x: self.direction >= 0 ? dx() : -dx(), autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.25, ease: 'expo.out', overwrite: 'auto', clearProps: 'transform' })
      });
    });
  }

  /* ---------------- odometer count (React Bits Count Up roll mode #279) ---------------- */
  // 2s, easeOut cubic-bezier(0.33,1,0.68,1) (in CSS), column stagger 0.07s capped at 40% of the duration
  $$('[data-odo]').forEach(el => {
    const value = el.dataset.odo;
    if (reduce() || !/^\d+$/.test(value)) return;
    el.setAttribute('aria-label', value);
    const digits = value.split('');
    const box = d.createElement('span'); box.className = 'odo'; box.setAttribute('aria-hidden', 'true');
    const cols = digits.map((dg, i) => {
      const col = d.createElement('span'); col.className = 'odo-col';
      const stack = d.createElement('span');
      stack.innerHTML = Array.from({ length: 10 }, (_, k) => `<span>${k}</span>`).join('');
      stack.style.transitionDelay = Math.min(i * .07, .8) + 's';
      col.appendChild(stack); box.appendChild(col);
      return [stack, +dg];
    });
    el.textContent = '';
    el.appendChild(box);
    onEnter(el, () => requestAnimationFrame(() => cols.forEach(([s, dg]) => { s.style.transform = `translateY(${-dg * 10}%)`; })));
  });

  /* ---------------- trades ledger: bars grow, median draws after ---------------- */
  const ledger = $('.ledger');
  if (ledger && G && !reduce()) {
    const mids = $$('.track-mid', ledger), meds = $$('.track-med', ledger);
    G.set(mids.concat(meds), { scaleX: 0 });
    onEnter(ledger, () => {
      G.to(mids, { scaleX: 1, duration: .8, ease: 'power2.out', stagger: i => Math.min(i, 7) * .04 });
      G.to(meds, { scaleX: 1, duration: .5, ease: 'power2.out', stagger: i => Math.min(i, 7) * .04, delay: .45 });
    }, '0px 0px -20% 0px');
  }

  /* ---------------- hero: re-sided in front of you (Codrops SVG blind mask, as lap courses) ---------------- */
  function courseFrame(frame) {
    const after = $('.course-after', frame), wrap = $('.course-strips', frame);
    const line = $('.course-line', frame), handle = $('.course-handle', frame), countB = $('.course-count b', frame);
    const countEl = $('.course-count', frame);
    const tagB = $('.tag-before', frame), tagA = $('.tag-after', frame);
    const startPct = +(frame.dataset.start || 58) / 100;
    const X = frame.dataset.axis === 'x';  // x: sash columns installing from the right, each dropping top to bottom
    const [nDesk, nPhone] = (frame.dataset.n || '30,18').split(',').map(Number);
    const unit = frame.dataset.unit || 'courses of new siding';
    let N = 0, k = 0, strips = [], url = '';

    const clipFor = (i, on) => {
      const a = (i / N * 100).toFixed(3), b = Math.max(0, 100 - (i + 1) / N * 100 - .04).toFixed(3);
      return X ? `inset(0% ${b}% ${on ? 0 : 100}% ${a}%)` : `inset(${a}% ${on ? 0 : 100}% ${b}% 0%)`;
    };
    const place = () => {
      const size = X ? frame.clientWidth : frame.clientHeight;
      const p = (N - k) / N * size;
      line.style.transform = X ? `translateX(${p.toFixed(1)}px)` : `translateY(${p.toFixed(1)}px)`;
      const hp = clamp(p, 30, size - 30).toFixed(1);
      handle.style.transform = X ? `translateX(${hp}px)` : `translateY(${hp}px)`;
      if (countB) { countB.textContent = k; countEl.style.opacity = k === 0 ? 0 : 1; }
      handle.setAttribute('aria-valuenow', String(k));
      handle.setAttribute('aria-valuemax', String(N));
      handle.setAttribute('aria-valuetext', `${k} of ${N} ${unit}`);
      tagB.classList.toggle('is-hidden', (N - k) / N < .14);
      tagA.classList.toggle('is-hidden', k / N < .14);
    };
    const build = () => {
      N = mqDesk.matches ? nDesk : nPhone;
      wrap.innerHTML = '';
      strips = Array.from({ length: N }, (_, i) => {
        const s = d.createElement('i');
        s.style.backgroundImage = `url("${url}")`;
        s.style.clipPath = clipFor(i, false);
        wrap.appendChild(s);
        return s;
      });
      if (countEl) countEl.lastChild.textContent = ` of ${N} courses`;
    };
    const setK = (nk, animate = true) => {
      nk = clamp(Math.round(nk), 0, N);
      if (nk === k && animate) return;
      const prev = k; k = nk;
      strips.forEach((s, i) => {
        const on = i >= N - k;
        const dist = on ? (N - 1 - i) - (N - prev) : (N - prev - 1) - i;
        s.style.transitionDelay = animate ? Math.max(0, Math.min(dist, 12)) * .014 + 's' : '0s';
        s.style.transition = animate && !reduce() ? 'clip-path .28s cubic-bezier(.23,1,.32,1)' : 'none';
        s.style.clipPath = clipFor(i, on);
      });
      place();
    };
    const intro = () => {
      const k0 = Math.round(N * startPct);
      frame.classList.add('is-live');
      if (!G || reduce()) { setK(k0, false); return; }
      k = 0; place();
      const order = strips.slice(N - k0).reverse(); // bottom course (or right-hand sash) first
      const proxy = { k: 0 };
      // 30 strips (18 phone), stagger 0.02, 0.9s power3.out each, sequence ~1.5s
      G.to(order, {
        clipPath: (i, el) => clipFor(strips.indexOf(el), true),
        duration: .9, ease: 'power3.out', stagger: .02,
        onComplete: () => { k = k0; place(); }
      });
      G.to(proxy, { k: k0, duration: .9 + (k0 - 1) * .02, ease: 'power2.out', onUpdate: () => { k = Math.round(proxy.k); place(); } });
    };
    const fromY = (clientX, clientY) => {
      const r = frame.getBoundingClientRect();
      return X ? (1 - (clientX - r.left) / r.width) * N : (1 - (clientY - r.top) / r.height) * N;
    };
    handle.addEventListener('pointerdown', e => {
      e.preventDefault(); handle.setPointerCapture(e.pointerId);
      const move = ev => setK(fromY(ev.clientX, ev.clientY));
      const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up); };
      handle.addEventListener('pointermove', move); handle.addEventListener('pointerup', up); handle.addEventListener('pointercancel', up);
    });
    frame.addEventListener('click', e => { if (!handle.contains(e.target) && frame.classList.contains('is-live')) setK(fromY(e.clientX, e.clientY)); });
    handle.addEventListener('keydown', e => {
      const map = X ? { ArrowLeft: 1, ArrowUp: 1, ArrowRight: -1, ArrowDown: -1, PageUp: 5, PageDown: -5 } : { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 5, PageDown: -5 };
      if (e.key in map) { e.preventDefault(); setK(k + map[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); setK(0); }
      else if (e.key === 'End') { e.preventDefault(); setK(N); }
    });
    const ready = () => {
      url = after.currentSrc || after.src;
      build();
      intro();
      new ResizeObserver(place).observe(frame);
      mqDesk.addEventListener('change', () => { const r = k / N; build(); setK(Math.round(r * N), false); });
    };
    const go = () => (after.decode ? after.decode().catch(() => {}) : Promise.resolve()).then(ready);
    if (after.complete && after.naturalWidth) go(); else after.addEventListener('load', go, { once: true });
  }
  $$('[data-course]').forEach(courseFrame);

  /* ---------------- before/after pairs with price band (R28 + square lens #125) ---------------- */
  function pairsBlock(box) {
    const fig = $('.compare', box);
    const imgB = $('.c-before', fig), imgA = $('.c-after', fig), lens = $('.c-lens', fig), lbox = $('.c-lensbox', fig), lboxLabel = $('.c-lensbox span', fig);
    const handle = $('.c-handle', fig), price = $('.pair-price', fig);
    const picks = $$('.pick', box), chips = $$('.filters .chip', box);
    const link = $('.pair-link', box);
    let pos = 50;
    const setPos = p => { pos = clamp(p, 0, 100); fig.style.setProperty('--pos', pos + '%'); handle.setAttribute('aria-valuenow', String(Math.round(pos))); handle.setAttribute('aria-valuetext', `${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`); };
    const fromX = x => { const r = fig.getBoundingClientRect(); return (x - r.left) / r.width * 100; };
    handle.addEventListener('pointerdown', e => {
      e.preventDefault(); handle.setPointerCapture(e.pointerId);
      const move = ev => setPos(fromX(ev.clientX));
      const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); handle.removeEventListener('pointercancel', up); };
      handle.addEventListener('pointermove', move); handle.addEventListener('pointerup', up); handle.addEventListener('pointercancel', up);
    });
    handle.addEventListener('keydown', e => {
      const m = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 };
      if (e.key in m) { e.preventDefault(); setPos(pos + m[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); setPos(0); }
      else if (e.key === 'End') { e.preventDefault(); setPos(100); }
    });
    fig.addEventListener('click', e => { if (!handle.contains(e.target)) setPos(fromX(e.clientX)); });

    // lens: fine pointers only. Square side 0.4 x min(w,h), pointer ease 0.1 per frame
    let lensOn = false, raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, side = 'before';
    const lensFrame = () => {
      cx += (tx - cx) * .1; cy += (ty - cy) * .1;
      const w = fig.clientWidth, h = fig.clientHeight, s = .4 * Math.min(w, h);
      const x = clamp(cx - s / 2, 0, w - s), y = clamp(cy - s / 2, 0, h - s);
      fig.style.setProperty('--ls', s + 'px');
      fig.style.setProperty('--lx', x + 'px'); fig.style.setProperty('--ly', y + 'px');
      fig.style.setProperty('--lt', y + 'px'); fig.style.setProperty('--ll', x + 'px');
      fig.style.setProperty('--lr', (w - x - s) + 'px'); fig.style.setProperty('--lb', (h - y - s) + 'px');
      const want = (cx / w * 100) < pos ? 'after' : 'before';
      if (want !== side) {
        side = want;
        const src = want === 'after' ? imgA : imgB;
        lens.srcset = src.srcset; lens.src = src.currentSrc || src.src;
        lboxLabel.textContent = want === 'after' ? 'After' : 'Before';
      }
      if (lensOn && (Math.abs(tx - cx) > .3 || Math.abs(ty - cy) > .3)) raf = requestAnimationFrame(lensFrame); else raf = 0;
    };
    if (mqFine.matches && !reduce()) {
      fig.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse' || handle.contains(e.target)) { if (lensOn) { lensOn = false; fig.classList.remove('is-lens'); } return; }
        const r = fig.getBoundingClientRect();
        tx = e.clientX - r.left; ty = e.clientY - r.top;
        if (!lensOn) { lensOn = true; cx = tx; cy = ty; side = ''; fig.classList.add('is-lens'); }
        if (!raf) raf = requestAnimationFrame(lensFrame);
      });
      fig.addEventListener('pointerleave', () => { lensOn = false; fig.classList.remove('is-lens'); });
    }

    const choose = (btn, focus) => {
      picks.forEach(p => p.setAttribute('aria-pressed', String(p === btn)));
      const D = btn.dataset;
      const swap = () => {
        imgB.srcset = D.bset; imgB.src = D.b; imgB.alt = D.balt;
        imgA.srcset = D.aset; imgA.src = D.a; imgA.alt = D.aalt;
        side = '';
        $('small', price).textContent = D.bandl; $('b', price).textContent = D.band;
        const set = (k, v) => { const el = $(`[data-k=${k}]`, box); if (el) el.textContent = v; };
        set('place', D.place); set('when', D.when); set('product', D.product); set('bandl', D.bandl); set('band', D.band);
        if (link) link.href = D.href;
        setPos(50);
      };
      const pre = [D.b, D.a].map(src => { const im = new Image(); im.src = src; return im.decode ? im.decode().catch(() => {}) : Promise.resolve(); });
      if (G && !reduce()) {
        Promise.all(pre).then(() => G.to([imgB, imgA], { opacity: 0, duration: .15, ease: 'power1.out', onComplete: () => { swap(); G.to([imgB, imgA], { opacity: 1, duration: .25, ease: 'power2.out', clearProps: 'opacity' }); } }));
      } else Promise.all(pre).then(swap);
    };
    picks.forEach(p => p.addEventListener('click', () => choose(p)));
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.setAttribute('aria-pressed', String(x === c)));
      const f = c.dataset.f;
      picks.forEach(p => { p.hidden = !(f === 'all' || p.dataset.trade === f); });
      const curp = picks.find(p => p.getAttribute('aria-pressed') === 'true');
      if (curp && curp.hidden) choose(picks.find(p => !p.hidden));
    }));
    setPos(50);
  }
  $$('[data-pairs]').forEach(pairsBlock);

  // a single compare outside a pairs block (page heroes): drag, keys, tap
  $$('[data-compare]').forEach(fig => {
    const handle = $('.c-handle', fig);
    let pos = 50;
    const setPos = p => { pos = clamp(p, 0, 100); fig.style.setProperty('--pos', pos + '%'); handle.setAttribute('aria-valuenow', String(Math.round(pos))); handle.setAttribute('aria-valuetext', `${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`); };
    const fromX = x => { const r = fig.getBoundingClientRect(); return (x - r.left) / r.width * 100; };
    handle.addEventListener('pointerdown', e => {
      e.preventDefault(); handle.setPointerCapture(e.pointerId);
      const move = ev => setPos(fromX(ev.clientX));
      const up = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('pointerup', up); };
      handle.addEventListener('pointermove', move); handle.addEventListener('pointerup', up);
    });
    handle.addEventListener('keydown', e => {
      const m = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 };
      if (e.key in m) { e.preventDefault(); setPos(pos + m[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); setPos(0); } else if (e.key === 'End') { e.preventDefault(); setPos(100); }
    });
    fig.addEventListener('click', e => { if (!handle.contains(e.target)) setPos(fromX(e.clientX)); });
    setPos(50);
  });

  // Scale container on scroll (#154): 0.86 -> 1, scrub 1, no pin
  if (G && ST && !reduce()) {
    $$('[data-scale]').forEach(el => {
      G.fromTo(el, { scale: .86 }, { scale: 1, ease: 'none', force3D: true, scrollTrigger: { trigger: el, start: 'clamp(top 80%)', end: 'clamp(top 15%)', scrub: 1 } });
    });
  }

  // The wall, layer by layer: assembled, then scrubbed apart along the depth axis (ease none). Desktop and tall screens only.
  $$('[data-wall]').forEach(sec => {
    const layers = $$('.w-layer', sec), labels = $$('.w-label', sec);
    const set = t => {
      layers.forEach(l => { const i = +l.dataset.i; l.setAttribute('transform', `translate(${(-46 * i * t).toFixed(2)} ${(30 * i * t).toFixed(2)})`); });
      labels.forEach(l => {
        const i = +l.dataset.i, ax = +l.dataset.x - 46 * i * t, y = +l.dataset.y;
        l.setAttribute('transform', `translate(0 ${(30 * i * t).toFixed(2)})`);
        $('path', l).setAttribute('d', `M${ax.toFixed(2)} ${y}H${+$('text', l).getAttribute('x') - 8}`);
        $('circle', l).setAttribute('cx', ax.toFixed(2));
      });
    };
    // phone: crop to the drawing (labels become the list under it) so the codes stay legible
    const svg = $('.wall-svg', sec), full = svg.getAttribute('viewBox');
    const frame = () => svg.setAttribute('viewBox', mqDesk.matches ? full : '20 60 530 500');
    frame(); mqDesk.addEventListener('change', frame);
    if (!G || !ST || reduce()) return;
    const mm = G.matchMedia();
    mm.add('(min-width: 900px) and (min-height: 760px)', () => {
      sec.classList.add('is-pinned');
      ST.refresh();
      set(0);
      const st = ST.create({
        trigger: $('.wall-track', sec), start: 'top top', end: 'bottom bottom', scrub: true,
        onUpdate: self => set(clamp((self.progress - .12) / .55, 0, 1))
      });
      return () => { st.kill(); sec.classList.remove('is-pinned'); set(1); };
    });
  });

  // Horizontal pin + pagination (#270), desktop only: x = -(scrollWidth - viewport), ease none, scrub, end matched to travel 1:1
  $$('[data-hscroll]').forEach(sec => {
    const track = $('.brands-track', sec), pin = $('.brands-pin', sec), dots = $$('.hdot', sec);
    if (!G || !ST || reduce()) return;
    G.matchMedia().add('(min-width: 900px) and (min-height: 700px)', () => {
      sec.classList.add('is-h');
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      const mark = p => { const i = Math.round(p * (dots.length - 1)); dots.forEach((d, k) => d.classList.toggle('is-on', k === i)); };
      mark(0);
      G.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: true, invalidateOnRefresh: true, onUpdate: self => mark(self.progress) }
      });
      return () => { sec.classList.remove('is-h'); G.set(track, { clearProps: 'transform' }); };
    });
  });

  // share bars grow (0.8s power2.out, stagger 0.04)
  if (G && !reduce()) {
    $$('.hbars').forEach(list => {
      const bars = $$('.hb-track i', list);
      G.set(bars, { scaleX: 0 });
      onEnter(list, () => G.to(bars, { scaleX: 1, duration: .8, ease: 'power2.out', stagger: .04 }));
    });
  }

  /* ---------------- colour studio (Codrops customizer #140 + BLK live zones #531, 400ms repaint) ---------------- */
  function studio(box) {
    const zones = Object.fromEntries($$('.zone', box).map(z => [z.dataset.zone, z]));
    const segs = $$('[data-zone-btn]', box);
    const sw = $$('.swatch', box);
    const original = $('[data-original]', box);
    const state = { body: box.dataset.body || null, gable: box.dataset.gable || null, trim: box.dataset.trim || null, active: 'body', original: false };
    const names = Object.fromEntries(sw.map(s => [s.dataset.hex.toUpperCase(), s.getAttribute('aria-label')]));
    const paint = () => {
      const fill = { body: state.body, gable: state.gable || state.body, trim: state.trim };
      Object.entries(zones).forEach(([z, el]) => {
        const c = fill[z];
        el.classList.toggle('is-painted', !!c && !state.original);
        if (c) el.style.setProperty('--c', c);
      });
      $$('[data-read]', box).forEach(r => {
        const z = r.dataset.read; const c = z === 'gable' ? (state.gable || state.body) : state[z];
        r.style.setProperty('--c', c || 'transparent');
        $('i', r).style.setProperty('--c', c || 'transparent');
        $('span', r).textContent = c ? (names[c.toUpperCase()] || c) : 'Original';
      });
      const curHex = (state.active === 'gable' ? (state.gable || state.body) : state[state.active]) || '';
      sw.forEach(s => {
        const on = s.dataset.hex.toUpperCase() === curHex.toUpperCase();
        s.setAttribute('aria-checked', String(on));
        s.tabIndex = on ? 0 : -1;
      });
      if (!sw.some(s => s.tabIndex === 0) && sw[0]) sw[0].tabIndex = 0;
      box.dispatchEvent(new CustomEvent('studio:change', { detail: state, bubbles: true }));
    };
    sw.forEach((s, i) => {
      s.addEventListener('click', () => {
        state[state.active] = s.dataset.hex;
        if (state.original) { state.original = false; if (original) { original.setAttribute('aria-pressed', 'false'); original.textContent = original.dataset.on || 'Show the real navy'; } }
        paint();
      });
      s.addEventListener('keydown', e => {
        const cols = getComputedStyle(s.parentElement).gridTemplateColumns.split(' ').length;
        const m = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols };
        if (!(e.key in m)) return;
        e.preventDefault();
        const vis = sw.filter(x => x.offsetParent !== null);
        const j = clamp(vis.indexOf(s) + m[e.key], 0, vis.length - 1);
        vis[j].focus(); vis[j].click();
      });
    });
    segs.forEach(b => b.addEventListener('click', () => {
      state.active = b.dataset.zoneBtn;
      segs.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      paint();
    }));
    if (original) {
      original.dataset.on = original.textContent;
      original.addEventListener('click', () => {
        state.original = !state.original;
        original.setAttribute('aria-pressed', String(state.original));
        original.textContent = state.original ? 'Show my colours' : original.dataset.on;
        paint();
      });
    }
    box.apStudio = { state, paint };
    paint();
  }
  $$('[data-studio]').forEach(studio);

  /* ---------------- one job, start to finish (S1325 scroll progress timeline, scrub ease none) ---------------- */
  $$('[data-timeline]').forEach(tl => {
    const track = $('.tl-track', tl), fill = $('.tl-fill', tl), steps = $$('.tl-step', tl);
    const bars = $$('.tl-span-bar i', tl);
    const activate = p => {
      const h = track.clientHeight;
      steps.forEach(s => s.classList.toggle('is-active', (s.offsetTop + 14) / h <= p + .001));
    };
    if (!G || !ST || reduce()) { fill.style.setProperty('--p', 1); steps.forEach(s => s.classList.add('is-active')); return; }
    fill.style.setProperty('--p', 0);
    ST.create({
      trigger: track, start: 'top 72%', end: 'bottom 60%', scrub: true,
      onUpdate: self => { fill.style.setProperty('--p', self.progress.toFixed(4)); activate(self.progress); }
    });
    steps.forEach(s => {
      const kids = [$('.tl-date', s), $('.tl-gap', s), $('h3', s), $('p', s)].filter(Boolean);
      G.set(kids, { autoAlpha: 0, yPercent: 12 });
      onEnter(s, () => G.to(kids, { autoAlpha: 1, yPercent: 0, duration: .8, ease: 'power2.out', stagger: .02, clearProps: 'transform,opacity,visibility' }), '0px 0px -18% 0px');
    });
    G.set(bars, { scaleX: 0 });
    onEnter($('.tl-span', tl) || tl, () => G.to(bars, { scaleX: 1, duration: .8, ease: 'power2.out', stagger: .12 }));
  });

  /* ---------------- project map ---------------- */
  function mapBlock(sec) {
    const pins = $$('.map-pins circle', sec);
    const months = Array.from(new Set(pins.map(p => +p.dataset.m))).sort((a, b) => a - b);
    const range = $('#map-range', sec), when = $('[data-map-when]', sec), count = $('[data-map-count]', sec);
    const play = $('[data-map-play]', sec), chips = $$('.filters .chip', sec);
    const tip = $('.map-tip', sec), fig = $('.map-figure', sec);
    let mask = -1, idx = months.length - 1, timer = 0;
    const label = m => `${MONTHS[m % 100 - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
    range.max = String(months.length - 1); range.value = String(idx);
    const render = () => {
      const lim = months[idx];
      let n = 0;
      pins.forEach(p => {
        const later = +p.dataset.m > lim;
        const off = mask >= 0 && !(+p.dataset.t & mask);
        p.classList.toggle('is-later', later);
        p.classList.toggle('is-off', !later && off);
        if (!later && !off) n++;
      });
      count.textContent = n;
      when.textContent = idx === months.length - 1 ? 'all dates, through ' + label(lim) : 'through ' + label(lim);
      range.style.setProperty('--fill', (idx / (months.length - 1) * 100).toFixed(2) + '%');
      range.setAttribute('aria-valuetext', label(lim));
    };
    range.addEventListener('input', () => { idx = +range.value; stop(); render(); });
    chips.forEach(c => c.addEventListener('click', () => { chips.forEach(x => x.setAttribute('aria-pressed', String(x === c))); mask = +c.dataset.trade; render(); }));
    const stop = () => { if (timer) { clearInterval(timer); timer = 0; play.setAttribute('aria-pressed', 'false'); $('span', play).textContent = 'Play 2022 to now'; } };
    play.addEventListener('click', () => {
      if (timer) return stop();
      if (reduce()) { idx = months.length - 1; range.value = String(idx); render(); return; }
      if (idx >= months.length - 1) idx = 0;
      play.setAttribute('aria-pressed', 'true'); $('span', play).textContent = 'Pause';
      timer = setInterval(() => { idx++; range.value = String(idx); render(); if (idx >= months.length - 1) stop(); }, 60);
    });
    // place names and the finder's data live in one file, fetched as the map comes near (inlined in the standalone build)
    let dataP = null;
    const getData = () => dataP || (dataP = (() => {
      const inline = $('#near-data');
      if (inline) return Promise.resolve(JSON.parse(inline.textContent));
      return fetch(sec.dataset.src || 'assets/data/near.json').then(r => r.json());
    })());
    onEnter(sec, () => getData().catch(() => {}), '600px 0px 600px 0px');
    const placeOf = (D, p) => D.names[+p.dataset.p] || '';
    if (mqFine.matches) {
      sec.addEventListener('pointerover', e => {
        const p = e.target.closest('.map-pins circle');
        if (!p || p.classList.contains('is-later')) { tip.hidden = true; return; }
        getData().then(D => {
          const r = fig.getBoundingClientRect(), b = p.getBoundingClientRect();
          tip.textContent = `${placeOf(D, p)}, ${label(+p.dataset.m)}`;
          tip.style.left = (b.left + b.width / 2 - r.left) + 'px'; tip.style.top = (b.top - r.top) + 'px';
          tip.hidden = false;
        });
      });
      sec.addEventListener('pointerout', e => { if (e.target.closest('.map-pins circle')) tip.hidden = true; });
    }
    // near-you finder: the firm's own place list; counts documented jobs within 1.5 miles (8.3 px per mile)
    const input = $('#near-in', sec), list = $('#near-list', sec), outN = $('.near-out', sec);
    const ring = $('.map-ring', sec);
    if (input) {
      let opts = [], act = -1;
      const close = () => { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); act = -1; };
      const mark = i => {
        act = i;
        $$('li', list).forEach((li, k) => li.setAttribute('aria-selected', String(k === i)));
        if (i >= 0) input.setAttribute('aria-activedescendant', `near-opt-${i}`);
      };
      const pick = (D, pl) => {
        input.value = pl[0]; close();
        const [, x, y] = pl, R = 1.5 * D.ppm;
        const dist = (a, b) => Math.hypot(a - x, b - y);
        const docs = D.pt.filter(p => dist(p[0], p[1]) <= R).length;
        const near = pins.map(p => ({ p, d: dist(+p.getAttribute('cx'), +p.getAttribute('cy')) })).sort((a, b) => a.d - b.d);
        const inR = near.filter(o => o.d <= R);
        pins.forEach(p => p.classList.remove('is-hit'));
        inR.forEach(o => o.p.classList.add('is-hit'));
        ring.setAttribute('cx', x); ring.setAttribute('cy', y); ring.setAttribute('r', R); ring.style.display = '';
        const top = near.slice(0, 3).map(o => `<li>${placeOf(D, o.p)}, ${label(+o.p.dataset.m)} <span>(${(o.d / D.ppm).toFixed(1)} mi)</span></li>`).join('');
        outN.innerHTML = `<p style="margin:0">Within 1.5 miles of ${pl[0]}: <b>${docs} documented ${docs === 1 ? 'project' : 'projects'}</b>, ${inR.length} of them photographed and lit on the map.</p><p style="margin:8px 0 0">Nearest photographed jobs:</p><ol>${top}</ol>`;
      };
      const render = (D, q) => {
        q = q.trim().toLowerCase();
        if (q.length < 2) { close(); return; }
        const starts = D.pl.filter(p => p[0].toLowerCase().startsWith(q));
        const has = D.pl.filter(p => !p[0].toLowerCase().startsWith(q) && p[0].toLowerCase().includes(q));
        opts = starts.concat(has).slice(0, 8);
        list.innerHTML = opts.length ? opts.map((p, i) => `<li role="option" id="near-opt-${i}" aria-selected="false">${p[0]}</li>`).join('') : '<li role="option" aria-disabled="true">Not in the firm\'s place list. Try a town.</li>';
        list.hidden = false; input.setAttribute('aria-expanded', 'true'); act = -1;
        $$('li', list).forEach((li, i) => li.addEventListener('mousedown', e => { e.preventDefault(); if (opts[i]) pick(D, opts[i]); }));
      };
      input.addEventListener('input', () => getData().then(D => render(D, input.value)));
      input.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' && opts.length) { e.preventDefault(); mark(Math.min(act + 1, opts.length - 1)); }
        else if (e.key === 'ArrowUp' && opts.length) { e.preventDefault(); mark(Math.max(act - 1, 0)); }
        else if (e.key === 'Enter') { e.preventDefault(); const o = opts[act >= 0 ? act : 0]; if (o && !list.hidden) getData().then(D => pick(D, o)); }
        else if (e.key === 'Escape') close();
      });
      input.addEventListener('blur', () => setTimeout(close, 120));
      $$('[data-try]', sec).forEach(b => b.addEventListener('click', () => getData().then(D => { const pl = D.pl.find(p => p[0] === b.dataset.try); if (pl) pick(D, pl); })));
    }

    // small screens: zoom to the metro (where ~95% of the dots are) and say how many are in view
    const svg = $('.map-svg', sec), note = $('.map-crop-note', sec);
    const full = svg.getAttribute('viewBox'), crop = [180, 70, 330, 420];
    const frameTo = () => {
      if (mqDesk.matches) { svg.setAttribute('viewBox', full); if (note) note.hidden = true; return; }
      svg.setAttribute('viewBox', crop.join(' '));
      const inView = pins.filter(p => { const x = +p.getAttribute('cx'), y = +p.getAttribute('cy'); return x >= crop[0] && x <= crop[0] + crop[2] && y >= crop[1] && y <= crop[1] + crop[3]; }).length;
      if (note) { note.hidden = false; note.textContent = `Zoomed to the Austin metro on this screen: ${inView} of the 312 dots are in view.`; }
    };
    frameTo();
    mqDesk.addEventListener('change', frameTo);
    render();
    if (G && !reduce()) {
      const g = $('.map-pins', sec);
      G.set(g, { opacity: 0 });
      onEnter(fig, () => G.to(g, { opacity: 1, duration: .8, ease: 'power2.out' }));
    }
  }
  $$('[data-map]').forEach(mapBlock);

  /* ---------------- financing, worked ---------------- */
  $$('[data-money]').forEach(box => {
    const amt = $('#amt', box) || $('input[type=range]', box), out = $('output', box);
    const plans = $$('[data-plan]', box);
    const stack = $('[data-stack]', box.parentElement) || $('[data-stack]');
    const render = () => {
      const P = +amt.value;
      out.textContent = money(P);
      amt.style.setProperty('--fill', ((P - amt.min) / (amt.max - amt.min) * 100).toFixed(2) + '%');
      amt.setAttribute('aria-valuetext', money(P));
      plans.forEach(pl => { $('.pay span', pl).textContent = money2(pmt(P, +pl.dataset.apr, +pl.dataset.n)); });
      if (stack) {
        const pct = 10 + ($('#stack-heroes', stack).checked ? 5 : 0) + ($('#stack-full', stack).checked ? 10 : 0);
        $('[data-stack-pct]', stack).textContent = pct + '%';
        $('[data-stack-save]', stack).textContent = money(P * pct / 100);
        $('[data-stack-price]', stack).textContent = money(P * (1 - pct / 100));
      }
    };
    amt.addEventListener('input', render);
    if (stack) $$('input', stack).forEach(i => i.addEventListener('change', render));
    render();
  });

  /* ---------------- histograms (inner pages) ---------------- */
  $$('[data-hist]').forEach(h => {
    const bars = $$('.hbar', h), out = $('.hist-readout', h);
    const say = b => { bars.forEach(x => x.setAttribute('aria-pressed', String(x === b))); out.textContent = b.dataset.say || b.getAttribute('aria-label'); };
    bars.forEach(b => { b.addEventListener('click', () => say(b)); if (mqFine.matches) b.addEventListener('pointerenter', () => say(b)); b.setAttribute('aria-pressed', 'false'); });
    if (G && !reduce()) {
      const fills = $$('.hbar i', h);
      G.set(fills, { scaleY: 0 });
      onEnter(h, () => G.to(fills, { scaleY: 1, duration: .8, ease: 'power2.out', stagger: i => Math.min(i, 7) * .04 }));
    }
  });

  /* ---------------- mobile action bar ---------------- */
  const mbar = $('.mbar');
  if (mbar && 'IntersectionObserver' in window) {
    const seen = new Map();
    const watch = [$('.hero') || $('main > section'), $('#book'), $('.site-footer')].filter(Boolean);
    const update = () => {
      const heroVis = seen.get(watch[0]);
      const other = watch.slice(1).some(w => seen.get(w));
      mbar.classList.toggle('is-on', !heroVis && !other && !(dlg && dlg.open));
    };
    const io = new IntersectionObserver(es => { es.forEach(e => seen.set(e.target, e.isIntersecting)); update(); }, { threshold: 0 });
    watch.forEach(w => io.observe(w));
    if (dlg) { dlg.addEventListener('close', update); new MutationObserver(update).observe(dlg, { attributes: true, attributeFilter: ['open'] }); }
  }

  if (d.fonts && ST) d.fonts.ready.then(() => ST.refresh());
})();
