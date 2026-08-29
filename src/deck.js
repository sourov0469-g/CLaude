/* ==========================================================================
   THE DECK
   Navigation, the slide DOM, and the choreography that ties a 2D reveal to
   the camera flight happening behind it.
   ========================================================================== */

const Deck = (function () {
  const gsap = window.gsap;
  const byKey = {};
  PRESENTERS.forEach((p) => { byKey[p.key] = p; });

  let idx = 0, prevIdx = -1, started = false, animating = null;
  let reduced = false;
  const nodes = [];   // one built slide per index
  const dom = {};

  /* ------------------------------------------------------------ building */

  function presenterColor(p) { return `hsl(${p.hue} 62% 44%)`; }

  function buildSlide(s, i) {
    const who = byKey[s.by];
    const head = el('div', { class: 'text-head' });
    const body = el('div', { class: 'text-body' });

    head.appendChild(el('p', { class: 'kicker rv', text: s.kicker }));

    const h = el('h1', { class: 'title' });
    splitLines(h, s.title);
    head.appendChild(h);

    if (s.titleSub) head.appendChild(el('p', { class: 'title-sub rv', text: s.titleSub }));
    if (s.lede) head.appendChild(el('p', { class: 'lede rv', text: s.lede }));

    if (s.stats && s.stats.length) {
      body.appendChild(el('div', { class: 'chips' }, s.stats.map((c) =>
        el('div', { class: 'chip rv' }, [el('span', { class: 'v', text: c.value }), el('span', { class: 'l', text: c.label })])
      )));
    }
    if (s.bullets && s.bullets.length) {
      body.appendChild(el('ul', { class: 'bullets' }, s.bullets.map((b) =>
        /* head and body share one grid cell, so the marker column cannot
           swallow the body text */
        el('li', { class: 'rv' }, el('div', { class: 'bl' }, [
          el('b', { text: b.head }), el('span', { text: b.body }),
        ]))
      )));
    }

    const text = el('div', { class: 'col-text' }, [head, body]);

    const visKids = [el('div', { class: 'visual' }, buildVisual(s.visual))];
    if (s.photos && s.photos.length) {
      visKids.push(el('figure', { class: 'photostrip rv' }, [
        el('div', { class: 'ps' }, s.photos.map((n) =>
          el('img', { src: Media.src(n), alt: '', loading: 'lazy', decoding: 'async' })
        )),
        s.photoCaption ? el('figcaption', { text: s.photoCaption }) : null,
      ]));
    }
    const vis = el('div', { class: 'col-vis' }, visKids);

    const node = el('section', {
      class: 'slide', id: 'sl-' + s.id, 'aria-label': s.title,
      'data-i': i, hidden: 'hidden',
    }, [text, vis]);
    node.dataset.presenter = s.by;
    return node;
  }

  /* Wrap each rendered line of the title in a clipping box so it can sweep
     up on reveal. Word-level split, measured after layout. */
  function splitLines(h, str) {
    str.split(' ').forEach((w, i) => {
      if (i) h.appendChild(document.createTextNode(' '));
      h.appendChild(el('span', { class: 'w', text: w }));
    });
  }

  function groupTitleWords(h) {
    const words = Array.from(h.querySelectorAll('span.w'));
    if (!words.length) return [];
    const rows = [];
    let top = null, row = null;
    words.forEach((w) => {
      const t = Math.round(w.offsetTop);
      if (top === null || Math.abs(t - top) > 4) { row = []; rows.push(row); top = t; }
      row.push(w);
    });
    return rows;
  }

  /* ---------------------------------------------------------------- chrome */

  function buildChrome() {
    dom.segments.innerHTML = '';
    PRESENTERS.forEach((p, i) => {
      const first = SLIDES.findIndex((s) => s.by === p.key);
      const seg = el('div', {
        class: 'seg', 'data-key': p.key, style: '--segc:' + presenterColor(p),
        title: p.name, onclick: () => go(first),
      }, [
        el('div', { class: 'bar' }, el('i')),
        el('span', { class: 'nm', text: p.short }),
      ]);
      dom.segments.appendChild(seg);
      p._seg = seg;
    });

    dom.grid.innerHTML = '';
    SLIDES.forEach((s, i) => {
      const p = byKey[s.by];
      dom.grid.appendChild(el('button', {
        class: 'gcard', 'data-i': i, onclick: () => { closePanels(); go(i); },
      }, [
        el('span', { class: 'n', text: String(i + 1).padStart(2, '0') }),
        el('span', { class: 't', text: s.title }),
        el('span', { class: 'p', style: 'color:' + presenterColor(p), text: p.short }),
      ]));
    });
  }

  function updateChrome() {
    const s = SLIDES[idx];
    const p = byKey[s.by];

    PRESENTERS.forEach((q) => {
      const list = SLIDES.map((x, i) => (x.by === q.key ? i : -1)).filter((i) => i >= 0);
      const done = list.filter((i) => i <= idx).length;
      const pct = list.length ? (done / list.length) * 100 : 0;
      q._seg.querySelector('i').style.right = (100 - pct) + '%';
      q._seg.classList.toggle('active', q.key === s.by);
      q._seg.classList.toggle('done', list[list.length - 1] < idx);
    });

    dom.counter.innerHTML = '<b>' + String(idx + 1).padStart(2, '0') + '</b> / ' + SLIDES.length;
    dom.crumb.textContent = p.name;
    dom.crumb.style.color = presenterColor(p);

    Array.from(dom.grid.children).forEach((c, i) => c.classList.toggle('current', i === idx));

    const next = SLIDES[idx + 1];
    dom.notesSlide.textContent = s.title;
    dom.notesWho.textContent = p.name;
    dom.notesWho.style.color = presenterColor(p);
    dom.notesBody.textContent = s.notes || '';
    dom.notesNext.textContent = next
      ? 'Next — ' + next.title + (next.by !== s.by ? '  ·  hand over to ' + byKey[next.by].short : '')
      : 'Last slide. Open the floor for questions.';

    document.body.className = 'lay-' + s.layout;
    location.replace('#' + s.id);
  }

  /* ------------------------------------------------------------ animation */

  /* Step the slide's scale down until its content fits the stage. Cheap: at
     most four measured passes, and only on a slide change. */
  const FITS = ['fit1', 'fit2', 'fit3'];
  function fit(node) {
    FITS.forEach((c) => node.classList.remove(c));
    const avail = dom.slidewrap.clientHeight;
    const measure = () => {
      let top = Infinity, bot = -Infinity;
      Array.from(node.children).forEach((c) => {
        const r = c.getBoundingClientRect();
        if (r.height === 0) return;
        top = Math.min(top, r.top); bot = Math.max(bot, r.bottom);
      });
      return bot - top;
    };
    for (let i = 0; i < FITS.length; i++) {
      if (measure() <= avail - 4) return;
      node.classList.add(FITS[i]);
    }
  }

  function reveal(node, dir) {
    if (animating) animating.progress(1).kill();
    const title = node.querySelector('h1.title');
    const rows = title ? groupTitleWords(title) : [];
    const others = Array.from(node.querySelectorAll('.rv'));
    const sign = dir < 0 ? -1 : 1;

    gsap.set(node, { autoAlpha: 1 });
    if (reduced) {
      gsap.set(rows.flat(), { y: 0, autoAlpha: 1 });
      gsap.set(others, { y: 0, autoAlpha: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { animating = null; } });
    if (rows.length) {
      rows.forEach((row, i) => {
        gsap.set(row, { yPercent: 108 * sign, opacity: 0 });
        tl.to(row, { yPercent: 0, opacity: 1, duration: 0.72, stagger: 0.01 }, 0.04 + i * 0.06);
      });
    }
    gsap.set(others, { y: 16 * sign, opacity: 0 });
    tl.to(others, { y: 0, opacity: 1, duration: 0.5, stagger: { each: 0.018, amount: Math.min(0.62, others.length * 0.018) } }, 0.18);

    /* SVG lines draw themselves in */
    const draws = Array.from(node.querySelectorAll('svg .draw'));
    draws.forEach((p, i) => {
      let L = 0;
      try { L = p.getTotalLength(); } catch (e) { return; }
      gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut', delay: 0.4 + i * 0.12 });
    });

    animating = tl;
    return tl;
  }

  function hide(node, dir) {
    const sign = dir < 0 ? -1 : 1;
    if (reduced) { node.hidden = true; return; }
    gsap.to(node, {
      autoAlpha: 0, y: -14 * sign, duration: 0.34, ease: 'power2.in',
      onComplete: () => { node.hidden = true; gsap.set(node, { y: 0 }); },
    });
  }

  function handoverCue(name, role) {
    if (reduced) return;
    dom.hoWho.textContent = name;
    dom.hoRole.textContent = role;
    gsap.killTweensOf(dom.handover);
    gsap.fromTo(dom.handover,
      { opacity: 0, scale: 0.94, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
    gsap.to(dom.handover, { opacity: 0, y: -10, duration: 0.5, ease: 'power2.in', delay: 1.35 });
  }

  /* --------------------------------------------------------------- moving */

  function go(n, instant) {
    n = Math.max(0, Math.min(SLIDES.length - 1, n));
    if (n === idx && started) return;
    const dir = n > idx ? 1 : -1;
    prevIdx = idx;
    idx = n;
    const s = SLIDES[idx];

    if (nodes[prevIdx] && prevIdx !== idx && started) {
      nodes[prevIdx].inert = true;
      hide(nodes[prevIdx], dir);
    }

    const node = nodes[idx];
    node.hidden = false;
    node.inert = false;
    World.goTo(s, instant);
    updateChrome();
    fit(node);
    reveal(node, dir);

    /* announce a change of speaker */
    if (started && s.handover && (!SLIDES[prevIdx] || SLIDES[prevIdx].by !== s.by)) {
      const p = byKey[s.by];
      handoverCue(p.short, 'over to ' + p.name.split(' ').slice(-1)[0]);
    }

    const ahead = SLIDES[idx + 1];
    if (ahead) {
      const names = (ahead.photos || []).slice();
      if (ahead.visual && ahead.visual.src) names.push(ahead.visual.src);
      if (ahead.visual && ahead.visual.poster) names.push(ahead.visual.poster);
      Media.preload(names);
    }

    /* keep the video paused unless it is on screen */
    nodes.forEach((nd, i) => {
      const v = nd.querySelector('video');
      if (!v) return;
      if (i === idx) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); }
      else v.pause();
    });
  }

  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  /* ---------------------------------------------------------------- panels */

  function closePanels() {
    ['grid', 'notes', 'help'].forEach((k) => dom['p_' + k].classList.remove('open'));
    ['btnGrid', 'btnNotes', 'btnHelp'].forEach((k) => dom[k] && dom[k].classList.remove('on'));
  }
  function togglePanel(k) {
    const open = dom['p_' + k].classList.contains('open');
    closePanels();
    if (!open) {
      dom['p_' + k].classList.add('open');
      const b = { grid: 'btnGrid', notes: 'btnNotes', help: 'btnHelp' }[k];
      if (dom[b]) dom[b].classList.add('on');
    }
  }

  function fullscreen() {
    const d = document;
    if (!d.fullscreenElement) (d.documentElement.requestFullscreen || d.documentElement.webkitRequestFullscreen || function () {}).call(d.documentElement);
    else (d.exitFullscreen || d.webkitExitFullscreen || function () {}).call(d);
  }

  /* ------------------------------------------------------------------ init */

  function start() {
    if (started) return;
    started = true;
    dom.entry.classList.add('gone');
    const fromHash = SLIDES.findIndex((s) => '#' + s.id === location.hash);
    idx = -1;
    go(fromHash > 0 ? fromHash : 0, true);
    setTimeout(() => { document.body.classList.add('live'); }, 60);
  }

  function init() {
    /* Without this, a slow frame makes GSAP assume a lag spike and clamp its
       delta — on a weak laptop the reveal stalls and text stays invisible.
       A presentation would rather jump than freeze. */
    gsap.ticker.lagSmoothing(0);

    if (location.hash === '#projector') document.documentElement.dataset.contrast = 'high';

    reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    World.setReduced(reduced);

    [
      ['stage', 'stage'], ['entry', 'entry'], ['slidewrap', 'slidewrap'],
      ['segments', 'segments'], ['counter', 'counter'], ['crumb', 'crumb'],
      ['handover', 'handover'], ['p_grid', 'panel-grid'], ['p_notes', 'panel-notes'],
      ['p_help', 'panel-help'], ['grid', 'grid'], ['notesSlide', 'notes-slide'],
      ['notesWho', 'notes-who'], ['notesBody', 'notes-body'], ['notesNext', 'notes-next'],
      ['hoWho', 'ho-who'], ['hoRole', 'ho-role'], ['btnGrid', 'btn-grid'],
      ['btnNotes', 'btn-notes'], ['btnHelp', 'btn-help'], ['btnFs', 'btn-fs'],
      ['btnPrev', 'btn-prev'], ['btnNext', 'btn-next'], ['entryGo', 'entry-go'],
      ['entryLoad', 'entry-load'],
    ].forEach(([k, id]) => { dom[k] = document.getElementById(id); });

    /* paper grain, generated once */
    const gc = document.createElement('canvas');
    gc.width = gc.height = 220;
    const g2 = gc.getContext('2d');
    const im = g2.createImageData(220, 220);
    for (let i = 0; i < im.data.length; i += 4) {
      const v = 226 + Math.random() * 29;
      im.data[i] = im.data[i + 1] = im.data[i + 2] = v;
      im.data[i + 3] = 255;
    }
    g2.putImageData(im, 0, 0);
    document.documentElement.style.setProperty('--grain-url', 'url(' + gc.toDataURL('image/png') + ')');

    SLIDES.forEach((s, i) => {
      const n = buildSlide(s, i);
      nodes.push(n);
      dom.slidewrap.appendChild(n);
    });
    buildChrome();

    const ok = World.init(dom.stage);
    if (!ok) {
      document.body.classList.add('no3d');
      console.warn('WebGL unavailable — running flat.');
    }

    /* controls */
    window.addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (!started) {
        if (k === 'Enter' || k === ' ' || k === 'ArrowRight' || k === 'PageDown') { e.preventDefault(); start(); }
        return;
      }
      if (k === 'Escape') { closePanels(); return; }
      if (k === 'ArrowRight' || k === 'ArrowDown' || k === ' ' || k === 'PageDown' || k === 'Enter') { e.preventDefault(); next(); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
      else if (k === 'Home') { e.preventDefault(); go(0); }
      else if (k === 'End') { e.preventDefault(); go(SLIDES.length - 1); }
      else if (k === 'o' || k === 'O') togglePanel('grid');
      else if (k === 'n' || k === 'N') togglePanel('notes');
      else if (k === '?' || k === '/') togglePanel('help');
      else if (k === 'f' || k === 'F') fullscreen();
      else if (k === 'c' || k === 'C') {
        const d = document.documentElement;
        d.dataset.contrast = d.dataset.contrast === 'high' ? '' : 'high';
      }
      else if (k === '.' || k === 'b' || k === 'B') document.body.classList.toggle('blank');
      else if (k === 'F5') e.preventDefault();   /* clickers send this to "start the show" */
      else if (k >= '1' && k <= '6') { const p = PRESENTERS[+k - 1]; if (p) go(SLIDES.findIndex((s) => s.by === p.key)); }
    });

    /* wheel, throttled so one flick is one slide */
    let wheelLock = 0;
    window.addEventListener('wheel', (e) => {
      if (!started) return;
      if (e.target.closest && e.target.closest('.panel.open')) return;
      const now = Date.now();
      if (now < wheelLock) return;
      if (Math.abs(e.deltaY) < 14) return;
      wheelLock = now + 620;
      e.deltaY > 0 ? next() : prev();
    }, { passive: true });

    /* touch */
    let tx = 0, ty = 0;
    window.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchend', (e) => {
      if (!started) { start(); return; }
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) < 44 && Math.abs(dy) < 44) return;
      if (Math.abs(dx) > Math.abs(dy)) dx < 0 ? next() : prev();
      else dy < 0 ? next() : prev();
    }, { passive: true });

    window.addEventListener('pointermove', (e) => {
      World.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    });
    window.addEventListener('resize', () => {
      World.resize();
      if (started && nodes[idx]) fit(nodes[idx]);
    });
    document.addEventListener('visibilitychange', () => World.pause(document.hidden));

    dom.btnGrid.onclick = () => togglePanel('grid');
    dom.btnNotes.onclick = () => togglePanel('notes');
    dom.btnHelp.onclick = () => togglePanel('help');
    dom.btnFs.onclick = fullscreen;
    dom.btnPrev.onclick = prev;
    dom.btnNext.onclick = next;
    dom.entryGo.onclick = start;
    dom.entry.addEventListener('click', (e) => { if (e.target === dom.entry) start(); });
    Array.from(document.querySelectorAll('.panel .close')).forEach((b) => { b.onclick = closePanels; });

    /* park the world on the cover so the entry card has something behind it */
    World.goTo(SLIDES[0], true);
    Media.preload(['hero-pizzas', 'outlet-sign', 'interview-wide', 'team-group']);

    dom.entryLoad.textContent = ok ? 'ready' : 'running without 3d';
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { dom.entryLoad.textContent = ok ? 'ready' : 'running without 3d'; });
    }
  }

  return { init, go, next, prev, current: () => idx };
})();

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', Deck.init);
else Deck.init();

/* `const` at script scope does not land on window, and the presenter console
   (plus the screenshot harness) needs a handle on the deck. */
window.Deck = Deck;
window.World = World;
window.Media = Media;
window.SLIDES = SLIDES;
window.PRESENTERS = PRESENTERS;
