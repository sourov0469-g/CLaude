/* ==========================================================================
   THE DECK
   Slide-by-slide navigation, the slide DOM, and the choreography that ties a
   text reveal to the camera move happening on the bench behind it.
   ========================================================================== */

const Deck = (function () {
  const gsap = window.gsap;
  const byKey = {};
  PRESENTERS.forEach(function (p) { byKey[p.key] = p; });

  /* which photograph sits, heavily blurred, behind the bench */
  const BACKDROPS = {
    cover: 'stock-chefs-kitchen-modern',
    intro: 'stock-storefront-pizzeria-sunny',
    method: 'interview-wide',
    planning: 'stock-counter-cashier-restaurant',
    recruit: 'stock-cooks-preparing-dough-team',
    turnover: 'stock-sous-chefs-kitchen',
    welfare: 'stock-canteen-group-eating',
    performance: 'stock-pizza-peel-oven-baked',
    discipline: 'stock-pizza-in-oven',
    findings: 'stock-archive-stacks-paper-string',
    recommendations: 'stock-whiteboard-presenting-team',
    conclusion: 'pizzaburg-dailyasianage-feature',
    thanks: 'hero-pizzas',
  };

  let idx = 0, prevIdx = -1, started = false, animating = null, reduced = false;
  const nodes = [];
  const dom = {};

  function presenterColor(p) { return 'hsl(' + p.hue + ' 60% 42%)'; }

  /* ---------------------------------------------------------------- build */

  function buildSlide(s, i) {
    const text = el('div', { class: 'col-text' });

    text.appendChild(el('p', { class: 'kicker rv', text: s.kicker }));

    const h = el('h1', { class: 'title' });
    s.title.split(' ').forEach(function (w, k) {
      if (k) h.appendChild(document.createTextNode(' '));
      h.appendChild(el('span', { class: 'w', text: w }));
    });
    text.appendChild(h);

    if (s.titleSub) text.appendChild(el('p', { class: 'title-sub rv', text: s.titleSub }));
    if (s.lede) text.appendChild(el('p', { class: 'lede rv', text: s.lede }));

    if (s.stats) {
      text.appendChild(el('div', { class: 'stats' }, s.stats.map(function (c) {
        return el('div', { class: 'stat rv' }, [
          el('span', { class: 'v', text: c.value }),
          el('span', { class: 'l', text: c.label }),
        ]);
      })));
    }

    if (s.meta) {
      text.appendChild(el('div', { class: 'meta' }, s.meta.map(function (m) {
        return el('div', { class: 'rv' }, [
          el('span', { class: 'k', text: m.k }),
          el('span', { class: 'v', text: m.v }),
        ]);
      })));
    }

    if (s.bullets) {
      text.appendChild(el('ul', { class: 'points' }, s.bullets.map(function (b) {
        return el('li', { class: 'rv' }, el('span', {}, rich(b)));
      })));
    }

    const notes = [s.note, s.note2].filter(Boolean);
    if (notes.length) {
      text.appendChild(el('div', { class: 'notes' + (notes.length > 1 ? ' two' : '') }, notes.map(function (n) {
        return el('div', { class: 'note rv ' + n.tone }, [
          el('span', { class: 'nt', text: n.title }),
          el('span', { class: 'nb', text: n.body }),
        ]);
      })));
    }

    const asideNode = buildAside(s.aside);
    const aside = el('div', { class: 'col-aside' }, asideNode);

    const node = el('section', {
      class: 'slide', id: 'sl-' + s.id, 'aria-label': s.title, 'data-i': i, hidden: 'hidden',
    }, [text, aside]);
    return node;
  }

  function groupTitleWords(h) {
    const words = Array.prototype.slice.call(h.querySelectorAll('span.w'));
    const rows = [];
    let top = null, row = null;
    words.forEach(function (w) {
      const t = Math.round(w.offsetTop);
      if (top === null || Math.abs(t - top) > 4) { row = []; rows.push(row); top = t; }
      row.push(w);
    });
    return rows;
  }

  /* --------------------------------------------------------------- chrome */

  function buildChrome() {
    dom.segments.innerHTML = '';
    PRESENTERS.forEach(function (p) {
      const first = SLIDES.findIndex(function (s) { return s.by === p.key; });
      const seg = el('button', {
        class: 'seg', style: '--segc:' + presenterColor(p), title: p.name,
        'aria-label': 'Jump to ' + p.name,
        onclick: function () { go(first); },
      }, [el('div', { class: 'bar' }, el('i')), el('span', { class: 'nm', text: p.short })]);
      dom.segments.appendChild(seg);
      p._seg = seg;
    });

    dom.grid.innerHTML = '';
    SLIDES.forEach(function (s, i) {
      const p = byKey[s.by];
      dom.grid.appendChild(el('button', {
        class: 'gcard', onclick: function () { closePanels(); go(i); },
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

    PRESENTERS.forEach(function (q) {
      const list = [];
      SLIDES.forEach(function (x, i) { if (x.by === q.key) list.push(i); });
      const done = list.filter(function (i) { return i <= idx; }).length;
      q._seg.querySelector('i').style.right = (100 - (done / list.length) * 100) + '%';
      q._seg.classList.toggle('active', q.key === s.by);
    });

    dom.counter.innerHTML = '<b>' + String(idx + 1).padStart(2, '0') + '</b> / ' + SLIDES.length;
    dom.crumb.textContent = p.name;
    dom.crumb.style.color = presenterColor(p);

    Array.prototype.forEach.call(dom.grid.children, function (c, i) { c.classList.toggle('current', i === idx); });

    const next = SLIDES[idx + 1];
    dom.notesSlide.textContent = s.title;
    dom.notesWho.textContent = p.name;
    dom.notesWho.style.color = presenterColor(p);
    dom.notesBody.textContent = s.notes || '';
    dom.notesNext.textContent = next
      ? 'Next — ' + next.title + (next.by !== s.by ? '   ·   hand over to ' + byKey[next.by].short : '')
      : 'Last slide. Open the floor for questions.';

    document.body.className = 'lay-' + s.layout;

    const bd = BACKDROPS[s.id];
    if (bd && Media.has(bd)) {
      dom.backdrop.style.setProperty('--bd-img', 'url("' + Media.src(bd) + '")');
    }

    if (location.hash !== '#' + s.id) history.replaceState(null, '', '#' + s.id);
  }

  /* ------------------------------------------------------------------ fit */

  const FITS = ['fit1', 'fit2', 'fit3'];
  function fit(node) {
    FITS.forEach(function (c) { node.classList.remove(c); });
    const avail = dom.slidewrap.clientHeight;
    function measure() {
      let top = Infinity, bot = -Infinity;
      Array.prototype.forEach.call(node.children, function (c) {
        const r = c.getBoundingClientRect();
        if (r.height === 0) return;
        top = Math.min(top, r.top); bot = Math.max(bot, r.bottom);
      });
      return bot - top;
    }
    for (let i = 0; i < FITS.length; i++) {
      if (measure() <= avail - 4) return;
      node.classList.add(FITS[i]);
    }
  }

  /* ------------------------------------------------------------ animation */

  function reveal(node, dir) {
    if (animating) { animating.progress(1).kill(); animating = null; }
    const title = node.querySelector('h1.title');
    const rows = title ? groupTitleWords(title) : [];
    const others = Array.prototype.slice.call(node.querySelectorAll('.rv'));
    const sign = dir < 0 ? -1 : 1;

    gsap.set(node, { autoAlpha: 1 });
    const flat = [];
    rows.forEach(function (r) { r.forEach(function (w) { flat.push(w); }); });

    if (reduced) {
      gsap.set(flat, { clearProps: 'all' });
      gsap.set(others, { clearProps: 'all' });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: function () { animating = null; },
    });

    rows.forEach(function (row, i) {
      gsap.set(row, { yPercent: 106 * sign, opacity: 0 });
      tl.to(row, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.01 }, 0.04 + i * 0.06);
    });
    gsap.set(others, { y: 15 * sign, opacity: 0 });
    tl.to(others, {
      y: 0, opacity: 1, duration: 0.5,
      stagger: { amount: Math.min(0.55, others.length * 0.045) },
    }, 0.2);

    animating = tl;
  }

  function hide(node, dir) {
    if (reduced) { node.hidden = true; return; }
    gsap.to(node, {
      autoAlpha: 0, y: -12 * (dir < 0 ? -1 : 1), duration: 0.32, ease: 'power2.in',
      onComplete: function () { node.hidden = true; gsap.set(node, { y: 0 }); },
    });
  }

  function handoverCue(p) {
    if (reduced) return;
    dom.hoWho.textContent = p.short;
    dom.hoRole.textContent = 'over to ' + p.name;
    gsap.killTweensOf(dom.handover);
    gsap.fromTo(dom.handover, { opacity: 0, scale: 0.94, y: 14 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    gsap.to(dom.handover, { opacity: 0, y: -12, duration: 0.5, ease: 'power2.in', delay: 1.3 });
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

    if (started && s.handover && SLIDES[prevIdx] && SLIDES[prevIdx].by !== s.by) {
      handoverCue(byKey[s.by]);
    }

    nodes.forEach(function (nd, i) {
      const v = nd.querySelector('video');
      if (!v) return;
      if (i === idx) { const pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      else v.pause();
    });

    const ahead = SLIDES[idx + 1];
    if (ahead) {
      const names = [];
      if (ahead.aside && ahead.aside.src) names.push(ahead.aside.src);
      if (ahead.aside && ahead.aside.poster) names.push(ahead.aside.poster);
      if (BACKDROPS[ahead.id]) names.push(BACKDROPS[ahead.id]);
      Media.preload(names);
    }
  }

  const next = function () { go(idx + 1); };
  const prev = function () { go(idx - 1); };

  /* --------------------------------------------------------------- panels */

  function closePanels() {
    ['grid', 'notes', 'help'].forEach(function (k) { dom['p_' + k].classList.remove('open'); });
    ['btnGrid', 'btnNotes', 'btnHelp'].forEach(function (k) { if (dom[k]) dom[k].classList.remove('on'); });
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

  /* ----------------------------------------------------------------- init */

  function start() {
    if (started) return;
    started = true;
    dom.entry.classList.add('gone');
    const fromHash = SLIDES.findIndex(function (s) { return '#' + s.id === location.hash; });
    idx = -1;
    go(fromHash > 0 ? fromHash : 0, true);
  }

  function init() {
    gsap.ticker.lagSmoothing(0);
    if (location.hash === '#projector') document.documentElement.dataset.contrast = 'high';
    reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    World.setReduced(reduced);

    [['stage', 'stage'], ['backdrop', 'backdrop'], ['entry', 'entry'], ['slidewrap', 'slidewrap'],
     ['segments', 'segments'], ['counter', 'counter'], ['crumb', 'crumb'], ['handover', 'handover'],
     ['p_grid', 'panel-grid'], ['p_notes', 'panel-notes'], ['p_help', 'panel-help'], ['grid', 'grid'],
     ['notesSlide', 'notes-slide'], ['notesWho', 'notes-who'], ['notesBody', 'notes-body'],
     ['notesNext', 'notes-next'], ['hoWho', 'ho-who'], ['hoRole', 'ho-role'],
     ['btnGrid', 'btn-grid'], ['btnNotes', 'btn-notes'], ['btnHelp', 'btn-help'], ['btnFs', 'btn-fs'],
     ['btnPrev', 'btn-prev'], ['btnNext', 'btn-next'], ['entryGo', 'entry-go'], ['entryLoad', 'entry-load'],
    ].forEach(function (pair) { dom[pair[0]] = document.getElementById(pair[1]); });

    /* paper grain, generated once */
    const gc = document.createElement('canvas');
    gc.width = gc.height = 220;
    const g2 = gc.getContext('2d');
    const im = g2.createImageData(220, 220);
    for (let i = 0; i < im.data.length; i += 4) {
      const v = 224 + Math.random() * 31;
      im.data[i] = im.data[i + 1] = im.data[i + 2] = v;
      im.data[i + 3] = 255;
    }
    g2.putImageData(im, 0, 0);
    document.documentElement.style.setProperty('--grain-url', 'url(' + gc.toDataURL('image/png') + ')');

    SLIDES.forEach(function (s, i) {
      const n = buildSlide(s, i);
      nodes.push(n);
      dom.slidewrap.appendChild(n);
    });
    buildChrome();

    const ok = World.init(dom.stage);
    if (!ok) document.body.classList.add('no3d');

    window.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
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
      else if (k === 'F5') e.preventDefault();
      else if (k >= '1' && k <= '6') {
        const p = PRESENTERS[+k - 1];
        if (p) go(SLIDES.findIndex(function (s) { return s.by === p.key; }));
      }
    });

    let wheelLock = 0;
    window.addEventListener('wheel', function (e) {
      if (!started) return;
      if (e.target.closest && e.target.closest('.panel-full.open')) return;
      const now = Date.now();
      if (now < wheelLock || Math.abs(e.deltaY) < 14) return;
      wheelLock = now + 640;
      if (e.deltaY > 0) next(); else prev();
    }, { passive: true });

    let tx = 0, ty = 0;
    window.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchend', function (e) {
      if (!started) { start(); return; }
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) < 44 && Math.abs(dy) < 44) return;
      if (Math.abs(dx) > Math.abs(dy)) { if (dx < 0) next(); else prev(); }
      else { if (dy < 0) next(); else prev(); }
    }, { passive: true });

    window.addEventListener('pointermove', function (e) {
      World.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    });
    window.addEventListener('resize', function () {
      World.resize();
      if (started && nodes[idx]) fit(nodes[idx]);
    });
    document.addEventListener('visibilitychange', function () { World.pause(document.hidden); });

    dom.btnGrid.onclick = function () { togglePanel('grid'); };
    dom.btnNotes.onclick = function () { togglePanel('notes'); };
    dom.btnHelp.onclick = function () { togglePanel('help'); };
    dom.btnFs.onclick = fullscreen;
    dom.btnPrev.onclick = prev;
    dom.btnNext.onclick = next;
    dom.entryGo.onclick = start;
    Array.prototype.forEach.call(document.querySelectorAll('.panel-full .close'), function (b) { b.onclick = closePanels; });

    /* park the bench on slide one so the entry card has flour behind it */
    World.goTo(SLIDES[0], true);
    if (BACKDROPS.cover && Media.has(BACKDROPS.cover)) {
      dom.backdrop.style.setProperty('--bd-img', 'url("' + Media.src(BACKDROPS.cover) + '")');
    }
    Media.preload([BACKDROPS.cover, BACKDROPS.intro, 'outlet-sign', 'team-group']);
    dom.entryLoad.textContent = ok ? 'ready' : 'running without 3d';
  }

  return { init: init, go: go, next: next, prev: prev, current: function () { return idx; } };
})();

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', Deck.init);
else Deck.init();

/* `const` at script scope does not land on window, and the screenshot harness
   and the presenter console both need a handle on the deck. */
window.Deck = Deck;
window.World = World;
window.Media = Media;
window.SLIDES = SLIDES;
window.PRESENTERS = PRESENTERS;
