/* Elbaz homepage core runtime.
   Image store, section/version manager (the 1·2·3 control), cursor engine with per-element states,
   magnets, weight lens, Lenis, nav, settings (theme + motion), viewer, lazy Three.js.
   Motion values from PLAN §4.4 [S0063 STANDARDS, S0095 §5, S1321, S0652, S1303 §7]. */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement;
  var mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  var mqFine = matchMedia('(hover: hover) and (pointer: fine)');

  var EZ = window.EZ = {
    sections: {},     // id -> {defs, el, current, cleanup, ctx, switchEl}
    order: [],
    booted: false
  };

  /* ---------- environment ---------- */
  EZ.motionOn = function () { return !mqReduce.matches && root.dataset.motion !== 'off'; };
  EZ.fine = function () { return mqFine.matches; };
  EZ.mobile = function () { return innerWidth < 768; };
  EZ.clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  EZ.lerp = function (a, b, t) { return a + (b - a) * t; };
  // frame-rate independent smoothing [threejs-pack §9]
  EZ.damp = function (a, b, lambda, dt) { return EZ.lerp(a, b, 1 - Math.exp(-lambda * dt)); };
  EZ.map = function (v, a, b, c, d) { return c + (d - c) * EZ.clamp((v - a) / (b - a), 0, 1); };

  /* ---------- image store: one Blob URL per photo, reused by every version [PLAN §4.7] ---------- */
  var urls = {};
  function buildImages() {
    var el = doc.getElementById('img-store');
    if (!el) return;
    var store;
    try { store = JSON.parse(el.textContent); } catch (e) { store = {}; }
    Object.keys(store).forEach(function (k) {
      var bin = atob(store[k]), n = bin.length, u8 = new Uint8Array(n);
      for (var i = 0; i < n; i++) u8[i] = bin.charCodeAt(i);
      urls[k] = URL.createObjectURL(new Blob([u8], { type: 'image/webp' }));
    });
    el.textContent = '';
  }
  EZ.img = function (k) { return urls[k] || ''; };
  EZ.applyImages = function (scope) {
    (scope || doc).querySelectorAll('img[data-img]').forEach(function (img) {
      var u = urls[img.dataset.img];
      if (!u || img.src === u) return;
      if (img.dataset.keep === '1' && img.getAttribute('src')) return;   // hero keeps its inline first frame
      img.src = u;
    });
    (scope || doc).querySelectorAll('[data-bg-img]').forEach(function (el) {
      var u = urls[el.dataset.bgImg];
      if (u) el.style.backgroundImage = 'url("' + u + '")';
    });
  };

  /* ---------- traced drawings (lines measured from the photo itself) ---------- */
  EZ.lines = function (key) { return (window.__LINES || {})[key]; };
  EZ.drawing = function (key, opts) {
    opts = opts || {};
    var d = EZ.lines(key);
    if (!d) return '';
    var n = opts.max || d.lines.length, out = [];
    for (var i = 0; i < n && i < d.lines.length; i++) {
      var l = d.lines[i];
      out.push('<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '"/>');
    }
    return '<svg class="draw ' + (opts.cls || '') + '" viewBox="0 0 ' + d.w + ' ' + d.h + '" preserveAspectRatio="' +
      (opts.par || 'xMidYMid slice') + '" aria-hidden="true" focusable="false">' + out.join('') + '</svg>';
  };

  // size a plate (photo + its traced lines, same aspect) to cover a frame at a chosen focal point,
  // so the drawing stays registered to the photograph at every crop
  EZ.cover = function (kit, frame, plate, o) {
    function fit() {
      var fw = frame.clientWidth, fh = frame.clientHeight;
      if (!fw || !fh) return;
      var x = typeof o.x === 'function' ? o.x() : (o.x == null ? .5 : o.x);
      var y = typeof o.y === 'function' ? o.y() : (o.y == null ? .5 : o.y);
      var s = typeof o.scale === 'function' ? o.scale() : (o.scale || 1);
      var w = Math.max(fw, fh * o.ar) * s, h = w / o.ar;
      plate.style.width = w + 'px'; plate.style.height = h + 'px';
      plate.style.left = ((fw - w) * x) + 'px'; plate.style.top = ((fh - h) * y) + 'px';
    }
    kit.ro(frame, fit);
    fit();
    kit.add(function () { plate.style.width = plate.style.height = plate.style.left = plate.style.top = ''; });
    return fit;
  };

  /* ---------- section + version manager [S1303 §9, S0006 §12, S1441] ---------- */
  var LS_KEY = 'ez-versions';
  function readStored() {
    var o = {};
    try { o = JSON.parse(localStorage.getItem(LS_KEY) || '{}') || {}; } catch (e) {}
    var q = new URLSearchParams(location.search);
    Object.keys(EZ.sections).forEach(function (id) {
      var v = parseInt(q.get(id), 10);
      if (v >= 1 && v <= 3) o[id] = v;
    });
    return o;
  }
  function persist() {
    var o = {}, q = new URLSearchParams(location.search);
    EZ.order.forEach(function (id) {
      var v = EZ.sections[id].current;
      o[id] = v;
      if (v !== 1) q.set(id, v); else q.delete(id);
    });
    try { localStorage.setItem(LS_KEY, JSON.stringify(o)); } catch (e) {}
    try {
      var s = q.toString();
      history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + location.hash);
    } catch (e) {}
  }

  EZ.section = function (id, defs) {
    var s = EZ.sections[id] || (EZ.sections[id] = { id: id });
    s.defs = defs;
  };

  // per-activation kit: everything registered here is torn down on swap
  function makeKit(s, verEl) {
    var offs = [], rafs = [], timers = [], obs = [];
    var kit = {
      root: verEl,
      section: s.el,
      motion: EZ.motionOn(),
      fine: EZ.fine(),
      mobile: EZ.mobile(),
      on: function (t, ev, fn, opt) {
        t.addEventListener(ev, fn, opt);
        offs.push(function () { t.removeEventListener(ev, fn, opt); });
        return fn;
      },
      add: function (fn) { offs.push(fn); },
      // fn(dt, now) -> return false to stop
      raf: function (fn) {
        var rec = { id: 0, last: 0, stopped: false };
        function tick(now) {
          if (rec.stopped) return;
          var dt = rec.last ? Math.min((now - rec.last) / 1000, 1 / 30) : 1 / 60;
          rec.last = now;
          if (fn(dt, now) === false) { rec.stopped = true; return; }
          rec.id = requestAnimationFrame(tick);
        }
        rec.id = requestAnimationFrame(tick);
        rafs.push(rec);
        return { stop: function () { rec.stopped = true; cancelAnimationFrame(rec.id); },
                 start: function () { if (rec.stopped) { rec.stopped = false; rec.last = 0; rec.id = requestAnimationFrame(tick); } } };
      },
      io: function (el, fn, opt) {
        var o = new IntersectionObserver(function (es) { es.forEach(fn); }, opt);
        o.observe(el); obs.push(o); return o;
      },
      ro: function (el, fn) {
        var o = new ResizeObserver(fn); o.observe(el); obs.push(o); return o;
      },
      timeout: function (fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; },
      dispose: function () {
        offs.splice(0).reverse().forEach(function (f) { try { f(); } catch (e) { console.error(e); } });
        rafs.splice(0).forEach(function (r) { r.stopped = true; cancelAnimationFrame(r.id); });
        timers.splice(0).forEach(clearTimeout);
        obs.splice(0).forEach(function (o) { o.disconnect(); });
      }
    };
    return kit;
  }

  function activate(id, v, opts) {
    opts = opts || {};
    var s = EZ.sections[id];
    if (!s || !s.el) return;
    v = EZ.clamp(v | 0, 1, 3);
    if (s.kit) s.kit.dispose();
    if (typeof s.cleanup === 'function') { try { s.cleanup(); } catch (e) { console.error(e); } }
    if (s.ctx) s.ctx.revert();
    s.cleanup = null; s.ctx = null; s.kit = null;

    var vers = s.el.querySelectorAll(':scope > .ver, :scope > .sec__body > .ver');
    var verEl = null;
    vers.forEach(function (el) {
      var on = +el.dataset.v === v;
      el.hidden = !on;
      if (on) verEl = el;
    });
    s.current = v;
    s.el.dataset.active = v;
    if (s.switchEl) {
      s.switchEl.querySelectorAll('[role="radio"]').forEach(function (b) {
        var on = +b.dataset.v === v;
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
    }
    if (!verEl) return;
    EZ.applyImages(verEl);
    var def = s.defs && s.defs[v];
    var kit = s.kit = makeKit(s, verEl);
    if (def && def.init) {
      s.ctx = gsap.context(function () {
        try { s.cleanup = def.init(verEl, kit) || null; } catch (e) { console.error('[' + id + ' v' + v + ']', e); }
      }, verEl);
    }
    bindMagnets(verEl, kit);
    bindLens(verEl, kit);
    if (!opts.initial) {
      persist();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }
  }
  EZ.activate = activate;

  var NAMES = { hero: 'Opening', proof: 'Proof', ba: 'Before and after', kitchens: 'Kitchens', room: '3D room',
    baths: 'Bathrooms', work: 'Projects', reviews: 'Reviews', towns: 'Service area', consult: 'Consultation' };

  function buildSwitch(s) {
    var wrap = doc.createElement('div');
    wrap.className = 'vswitch';
    var inner = doc.createElement('div');
    inner.className = 'vswitch__in';
    inner.setAttribute('role', 'radiogroup');
    inner.setAttribute('aria-label', (NAMES[s.id] || s.id) + ': design version');
    for (var i = 1; i <= 3; i++) {
      if (i > 1) {
        var sep = doc.createElement('span');
        sep.className = 'vswitch__sep'; sep.setAttribute('aria-hidden', 'true'); sep.textContent = '·';
        inner.appendChild(sep);
      }
      var b = doc.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-label', 'Version ' + i);
      b.dataset.v = i;
      b.dataset.cursor = 'link';
      b.textContent = i;
      inner.appendChild(b);
    }
    inner.addEventListener('click', function (e) {
      var b = e.target.closest('[role="radio"]');
      if (b && +b.dataset.v !== s.current) activate(s.id, +b.dataset.v);
    });
    inner.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!d) return;
      e.preventDefault(); e.stopPropagation();
      var nv = ((s.current - 1 + d + 3) % 3) + 1;
      activate(s.id, nv);
      inner.querySelector('[data-v="' + nv + '"]').focus();
    });
    wrap.appendChild(inner);
    s.el.insertBefore(wrap, s.el.firstChild);
    s.switchEl = inner;
  }

  // section most in view (for keys 1/2/3, arrows, R)
  var visible = {};
  function sectionInView() {
    var best = null, bestR = 0;
    Object.keys(visible).forEach(function (id) { if (visible[id] > bestR) { bestR = visible[id]; best = id; } });
    return best;
  }
  function bindKeys() {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { visible[e.target.dataset.section] = e.isIntersecting ? e.intersectionRect.height : 0; });
    }, { threshold: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1] });
    EZ.order.forEach(function (id) { io.observe(EZ.sections[id].el); });
    doc.addEventListener('keydown', function (e) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (t && t.closest && t.closest('[role="slider"], .viewer, .sheet, [data-keys]')) return;
      var id = sectionInView();
      if (!id) return;
      var s = EZ.sections[id];
      if (e.key === '1' || e.key === '2' || e.key === '3') { activate(id, +e.key); }
      else if (e.key === 'r' || e.key === 'R') { activate(id, s.current); }
      else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && (!t || t === doc.body || t.closest('.vswitch'))) {
        activate(id, ((s.current - 1 + (e.key === 'ArrowRight' ? 1 : -1) + 3) % 3) + 1);
      }
    });
  }

  /* ---------- Lenis [S1321, S0095 §5: lerp 0.1; off on touch, reduced motion, motion off (S1209)] ---------- */
  var lenis = null, lenisTick = null;
  function startLenis() {
    stopLenis();
    if (!EZ.motionOn() || !EZ.fine() || typeof Lenis === 'undefined') return;
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    lenisTick = function (t) { lenis && lenis.raf(t * 1000); };
    gsap.ticker.add(lenisTick);
    EZ.lenis = lenis;
  }
  function stopLenis() {
    if (lenisTick) gsap.ticker.remove(lenisTick);
    if (lenis) lenis.destroy();
    lenis = null; lenisTick = null; EZ.lenis = null;
  }
  EZ.scrollTo = function (target, opts) {
    var el = typeof target === 'string' ? doc.querySelector(target) : target;
    if (!el) return;
    var off = -(parseFloat(getComputedStyle(root).getPropertyValue('--nav-h')) || 68);
    if (el.id === 'top') off = 0;
    if (lenis) lenis.scrollTo(el, { offset: off, duration: 1.2, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
    else {
      var y = el.getBoundingClientRect().top + scrollY + off;
      scrollTo({ top: y, behavior: EZ.motionOn() ? 'smooth' : 'auto' });
    }
  };
  function bindAnchors() {
    doc.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var el = doc.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeSheet();
      EZ.scrollTo(el);
      // move focus for keyboard and screen-reader users
      var f = el.matches('section, main, span') ? el : el;
      if (!f.hasAttribute('tabindex')) f.setAttribute('tabindex', '-1');
      setTimeout(function () { f.focus({ preventScroll: true }); }, lenis ? 900 : 50);
      try { history.replaceState(null, '', location.pathname + location.search + id); } catch (er) {}
    });
  }

  /* ---------- cursor engine [S1321 cursor lag .35, S0634 §A, S0652 §3, PLAN §4.6] ---------- */
  var cur = { el: null, ring: null, dot: null, label: null, glyph: null, x: -100, y: -100, on: false,
    rx: null, ry: null, dx: null, dy: null, lockY: null, target: null };
  var GLYPHS = {
    'drag-x': '<svg viewBox="-18 -18 36 36"><path d="M-9 0h18M-9 0l4-4M-9 0l4 4M9 0l-4-4M9 0l-4 4" fill="none" stroke="#0B1418" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'orbit': '<svg viewBox="-18 -18 36 36"><path d="M-11 4a12 7 0 0 0 22 0M-11 4l1-4M-11 4l4 1M11 -4a12 7 0 0 0-22 0M11 -4l-1 4M11 -4l-4 -1" fill="none" stroke="#e8e4dc" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" transform="scale(.82)"/></svg>',
    'quote': '<svg viewBox="-18 -18 36 36"><text x="0" y="9" text-anchor="middle" font-family="Archivo, sans-serif" font-size="26" font-weight="800" fill="#0B1418">“</text></svg>'
  };
  function cursorEnabled() { return EZ.fine() && EZ.motionOn(); }
  function setupCursor() {
    cur.el = doc.getElementById('cursor');
    if (!cur.el) return;
    cur.ring = cur.el.querySelector('.cursor__ring');
    cur.dot = cur.el.querySelector('.cursor__dot');
    cur.label = cur.el.querySelector('.cursor__label');
    cur.glyph = cur.el.querySelector('.cursor__glyph');
    cur.rx = gsap.quickTo(cur.ring, 'x', { duration: .35, ease: 'power3.out' });
    cur.ry = gsap.quickTo(cur.ring, 'y', { duration: .35, ease: 'power3.out' });
    cur.dx = gsap.quickTo(cur.dot, 'x', { duration: .12, ease: 'power3.out' });
    cur.dy = gsap.quickTo(cur.dot, 'y', { duration: .12, ease: 'power3.out' });

    doc.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      cur.x = e.clientX; cur.y = e.clientY;
      if (!cur.on) return;
      cur.el.classList.remove('is-hidden');
      var ry = cur.lockY != null ? cur.lockY : cur.y;
      if (!cur.pinned) { cur.rx(cur.x); cur.ry(ry); }
      cur.dx(cur.x); cur.dy(cur.y);
    }, { passive: true });
    doc.addEventListener('pointerover', function (e) {
      if (!cur.on) return;
      var t = e.target.closest ? e.target.closest('[data-cursor]') : null;
      setState(t);
    });
    doc.addEventListener('pointerleave', function () { cur.el.classList.add('is-hidden'); });
    window.addEventListener('blur', function () { cur.el.classList.add('is-hidden'); });
    doc.addEventListener('pointerdown', function () { if (cur.on) gsap.to(cur.ring, { scale: .86, duration: .12, overwrite: 'auto' }); });
    doc.addEventListener('pointerup', function () { if (cur.on) gsap.to(cur.ring, { scale: 1, duration: .3, ease: 'power3.out', overwrite: 'auto' }); });
    refreshCursor();
  }
  function setState(t) {
    if (t === cur.target) return;
    cur.target = t;
    var st = t ? t.dataset.cursor : '';
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) st = 'none';
    cur.el.dataset.state = st || '';
    var label = t ? (t.dataset.cursorLabel || '') : '';
    cur.label.textContent = label;
    cur.el.dataset.label = label ? '1' : '';
    var g = GLYPHS[st] && !label ? GLYPHS[st] : (st === 'orbit' ? '' : '');
    cur.glyph.innerHTML = g || '';
    cur.el.dataset.glyph = g ? '1' : '';
    cur.el.style.setProperty('--sw', t && t.dataset.sw ? t.dataset.sw : '');
    var cw = '';
    if (st === 'magnet-wide' && t) {
      // ring grows to wrap the button [PLAN §4.6]
      var r = t.getBoundingClientRect();
      cw = (Math.max(r.width, r.height) / 36 * 1.08).toFixed(2);
    }
    cur.el.style.setProperty('--cw', cw);
    cur.lockY = null;
    if (st === 'drag-x' && t && t.dataset.cursorLock === 'y') {
      var rr = t.getBoundingClientRect();
      cur.lockY = rr.top + rr.height / 2;
    }
  }
  EZ.cursorState = function (el) { if (cur.on) { cur.target = undefined; setState(el); } };
  EZ.cursorPin = function (x, y) {
    // magnets pull the ring onto the button centre
    if (!cur.on) return;
    if (x == null) { cur.pinned = false; cur.rx(cur.x); cur.ry(cur.y); return; }
    cur.pinned = true; cur.rx(x); cur.ry(y);
  };
  function refreshCursor() {
    cur.on = cursorEnabled();
    root.classList.toggle('has-cursor', cur.on);
    if (!cur.on && cur.el) { cur.el.dataset.state = ''; cur.target = null; cur.pinned = false; }
  }

  /* ---------- magnets [S0634 magnetic-button, S1321 magnetic .3/.15, S1375 #12 strong] ---------- */
  var MAG = {
    wide: { radius: 80, f: .3, fl: .15 },
    'in': { radius: 0, f: .4, fl: .2 },
    strong: { radius: 120, f: .35, fl: .18 }
  };
  function bindMagnets(scope, kit) {
    if (!kit.fine || !kit.motion) return;
    scope.querySelectorAll('[data-magnet]').forEach(function (el) { magnet(el, kit); });
  }
  function magnet(el, kit) {
    var cfg = MAG[el.dataset.magnet] || MAG.wide;
    var inner = el.querySelector('.btn__label') || null;
    var qx = gsap.quickTo(el, 'x', { duration: .45, ease: 'power3.out' });
    var qy = gsap.quickTo(el, 'y', { duration: .45, ease: 'power3.out' });
    var lx = inner && gsap.quickTo(inner, 'x', { duration: .45, ease: 'power3.out' });
    var ly = inner && gsap.quickTo(inner, 'y', { duration: .45, ease: 'power3.out' });
    var active = false;
    kit.on(window, 'pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = el.getBoundingClientRect();
      var cx = r.left + r.width / 2 - (gsap.getProperty(el, 'x') || 0), cy = r.top + r.height / 2 - (gsap.getProperty(el, 'y') || 0);
      var dx = e.clientX - cx, dy = e.clientY - cy;
      var inside = Math.abs(dx) < r.width / 2 + cfg.radius && Math.abs(dy) < r.height / 2 + cfg.radius;
      if (inside) {
        active = true;
        qx(dx * cfg.f); qy(dy * cfg.f);
        if (lx) { lx(dx * cfg.fl); ly(dy * cfg.fl); }
        if (el.dataset.magnet !== 'in') EZ.cursorPin(cx + dx * cfg.f, cy + dy * cfg.f);
      } else if (active) {
        active = false;
        qx(0); qy(0); if (lx) { lx(0); ly(0); }
        EZ.cursorPin(null);
      }
    }, { passive: true });
    kit.add(function () { gsap.set([el, inner].filter(Boolean), { x: 0, y: 0 }); if (active) EZ.cursorPin(null); });
  }

  /* ---------- weight lens: text responds as the pointer passes [S0652 §8 falloff, S0634 hover-magnetic-text] ---------- */
  EZ.splitChars = function (el) {
    if (el.dataset.split === '1') return el.querySelectorAll('.ch');
    var text = el.textContent.replace(/\s+/g, ' ').trim();
    var words = text.split(/(\s+)/);
    // the readable copy stays as real text for assistive tech; the split letters are presentation
    el.innerHTML = '<span class="sr-only">' + text.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span><span aria-hidden="true">' + words.map(function (w) {
      if (/^\s+$/.test(w)) return ' ';
      return '<span class="wd">' + w.split('').map(function (c) { return '<span class="ch">' + c + '</span>'; }).join('') + '</span>';
    }).join('') + '</span>';
    el.dataset.split = '1';
    return el.querySelectorAll('.ch');
  };
  function bindLens(scope, kit) {
    if (!kit.fine || !kit.motion) return;
    scope.querySelectorAll('[data-lens]').forEach(function (el) { lens(el, kit); });
  }
  function lens(el, kit) {
    var cs = getComputedStyle(el);
    var baseW = parseFloat(el.dataset.lensW || cs.fontWeight) || 600;
    var baseS = parseFloat(el.dataset.lensS || cs.fontStretch) || 80;
    var addW = +(el.dataset.lensAddW || 260), addS = +(el.dataset.lensAddS || 14), reach = +(el.dataset.lensReach || 120);
    var orig = el.innerHTML, wasSplit = el.dataset.split === '1';
    var chars = Array.prototype.slice.call(EZ.splitChars(el));
    var cache = [], px = -1e4, py = -1e4, dirty = true, idle = 0;
    chars.forEach(function (c) { c.style.transition = 'font-weight 320ms var(--ease-out), font-stretch 320ms var(--ease-out)'; c.style.display = 'inline-block'; });
    function measure() { cache = chars.map(function (c) { var r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); }
    var near = false;
    kit.on(window, 'pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      px = e.clientX; py = e.clientY;
      var r = el.getBoundingClientRect();
      var n = px > r.left - reach && px < r.right + reach && py > r.top - reach && py < r.bottom + reach;
      if (n || near) { dirty = true; if (!loop) start(); }
      near = n;
    }, { passive: true });
    kit.on(window, 'scroll', function () { cache = []; }, { passive: true });
    kit.on(window, 'resize', function () { cache = []; });
    var loop = null;
    function start() {
      loop = kit.raf(function () {
        if (!dirty) { if (++idle > 30) { loop = null; return false; } return; }
        idle = 0; dirty = false;
        if (!cache.length) measure();
        for (var i = 0; i < chars.length; i++) {
          var dx = cache[i][0] - px, dy = cache[i][1] - py, d = Math.sqrt(dx * dx + dy * dy);
          var k = d > reach ? 0 : Math.pow(.45, d / 60);
          chars[i].style.fontWeight = Math.round(baseW + addW * k);
          chars[i].style.fontStretch = (baseS + addS * k).toFixed(1) + '%';
        }
      });
    }
    kit.add(function () { if (!wasSplit) { el.innerHTML = orig; delete el.dataset.split; } });
  }

  /* ---------- nav [S0095 §3, S1303 N2] + progress tape ---------- */
  var sheet, menuBtn, lastFocus;
  function setupNav() {
    var nav = doc.getElementById('nav'), tape = doc.getElementById('tape');
    var lastY = scrollY;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: function (self) {
        var y = self.scroll();
        nav.classList.toggle('is-solid', y > 120);
        var down = y > lastY + 2, up = y < lastY - 2;
        if (down && y > 320 && !nav.contains(doc.activeElement)) nav.classList.add('is-hidden');
        else if (up || y <= 320) nav.classList.remove('is-hidden');
        lastY = y;
        tape.style.transform = 'scaleX(' + self.progress.toFixed(4) + ')';
      }
    });
    nav.addEventListener('focusin', function () { nav.classList.remove('is-hidden'); });

    sheet = doc.getElementById('sheet');
    menuBtn = nav.querySelector('.nav__menu');
    menuBtn.addEventListener('click', openSheet);
    sheet.querySelector('.sheet__close').addEventListener('click', closeSheet);
    sheet.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeSheet(); return; }
      trapTab(e, sheet);
    });
  }
  function openSheet() {
    lastFocus = doc.activeElement;
    sheet.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    doc.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
    if (EZ.motionOn()) gsap.from(sheet.querySelectorAll('li'), { y: 24, opacity: 0, duration: .5, stagger: .05, ease: 'expo.out' });
    sheet.querySelector('a, button').focus();
  }
  function closeSheet() {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    doc.body.style.overflow = '';
    if (lenis) lenis.start();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function trapTab(e, box) {
    if (e.key !== 'Tab') return;
    var f = box.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])');
    f = Array.prototype.filter.call(f, function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  EZ.trapTab = trapTab;

  /* ---------- settings: theme + motion [S1303 §4, S1169, S1209] ---------- */
  function setupSettings() {
    var box = doc.getElementById('settings'), btn = box.querySelector('.settings__btn'), panel = doc.getElementById('settings-panel');
    function sync() {
      doc.querySelectorAll('[data-setting="theme"] button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.value === (root.dataset.theme || 'evening') ? 'true' : 'false'); });
      var m = root.dataset.motion === 'off' ? 'off' : 'on';
      doc.querySelectorAll('[data-setting="motion"] button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.value === m ? 'true' : 'false'); });
      var meta = doc.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = root.dataset.theme === 'daylight' ? '#EEF2F1' : '#0B1418';
    }
    function toggle(open) {
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) { panel.classList.remove('is-in'); void panel.offsetWidth; panel.classList.add('is-in'); }
    }
    btn.addEventListener('click', function () { toggle(panel.hidden); });
    doc.addEventListener('click', function (e) { if (!panel.hidden && !box.contains(e.target)) toggle(false); });
    box.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { toggle(false); btn.focus(); } });
    // the same controls live in the floating panel (desktop) and the menu sheet (phone)
    doc.addEventListener('click', function (e) {
      var b = e.target.closest('.seg button');
      if (!b || !b.parentNode.dataset.setting) return;
      var kind = b.parentNode.dataset.setting, val = b.dataset.value;
      if (kind === 'theme') {
        root.dataset.theme = val;
        try { localStorage.setItem('ez-theme', val); } catch (er) {}
        doc.dispatchEvent(new CustomEvent('ez:theme', { detail: val }));
      } else {
        if (val === 'off') root.dataset.motion = 'off'; else delete root.dataset.motion;
        try { localStorage.setItem('ez-motion', val); } catch (er) {}
        motionChanged();
      }
      sync();
    });
    sync();
  }
  function motionChanged() {
    refreshCursor();
    startLenis();
    EZ.order.forEach(function (id) { activate(id, EZ.sections[id].current, { initial: true }); });
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }

  /* ---------- viewer: Flip lightbox [S0184 Flip, pack pick #8] ---------- */
  EZ.viewer = (function () {
    var box, img, title, count, closeBtn, items = [], idx = 0, from = null, prevFocus = null;
    function init() {
      box = doc.getElementById('viewer');
      img = box.querySelector('.viewer__img'); title = box.querySelector('.viewer__title');
      count = box.querySelector('.viewer__count'); closeBtn = box.querySelector('.viewer__close');
      closeBtn.addEventListener('click', close);
      box.addEventListener('click', function (e) { if (e.target === box) close(); });
      box.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowRight') show(idx + 1);
        else if (e.key === 'ArrowLeft') show(idx - 1);
        else trapTab(e, box);
      });
    }
    function show(i) {
      idx = (i + items.length) % items.length;
      var it = items[idx];
      img.src = EZ.img(it.key); img.alt = it.alt || it.title || '';
      title.textContent = it.title || '';
      count.textContent = (idx + 1) + ' of ' + items.length;
    }
    function open(list, i, fromEl) {
      items = list; from = fromEl || null; prevFocus = doc.activeElement;
      show(i);
      box.hidden = false;
      doc.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      if (EZ.motionOn() && from) {
        var fi = from.tagName === 'IMG' ? from : from.querySelector('img');
        if (fi) {
          var a = fi.getBoundingClientRect(), b = img.getBoundingClientRect();
          gsap.fromTo(img, { x: a.left + a.width / 2 - (b.left + b.width / 2), y: a.top + a.height / 2 - (b.top + b.height / 2), scale: Math.max(a.width / b.width, .2) },
            { x: 0, y: 0, scale: 1, duration: .6, ease: 'power2.inOut', clearProps: 'transform' });
        }
        gsap.fromTo(box, { backgroundColor: 'rgba(8,14,17,0)' }, { backgroundColor: 'rgba(8,14,17,.94)', duration: .4, clearProps: 'backgroundColor' });
      }
      closeBtn.focus();
    }
    function close() {
      if (box.hidden) return;
      box.hidden = true;
      doc.body.style.overflow = '';
      if (lenis) lenis.start();
      if (prevFocus && prevFocus.focus) prevFocus.focus({ preventScroll: true });
    }
    return { init: init, open: open, close: close };
  })();

  /* ---------- Three.js, evaluated only when the 3D section asks [threejs-pack §0] ---------- */
  var threeP = null;
  EZ.loadThree = function () {
    if (window.THREE) return Promise.resolve(window.THREE);
    if (threeP) return threeP;
    threeP = new Promise(function (res, rej) {
      var src = doc.getElementById('three-src');
      if (!src) return rej(new Error('three source missing'));
      var s = doc.createElement('script');
      s.textContent = src.textContent;
      doc.head.appendChild(s);
      src.textContent = '';
      if (window.THREE && window.THREE.REVISION === '159') res(window.THREE);
      else rej(new Error('three failed'));
    });
    return threeP;
  };

  /* ---------- shared motion helpers ---------- */
  // mask-rise lines: wraps each line of a SplitText in an overflow mask [S1321 line reveal]
  EZ.riseLines = function (el, opts) {
    opts = opts || {};
    var split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'ln' });
    var tw = gsap.from(split.lines, {
      yPercent: 105, duration: opts.duration || .8, ease: opts.ease || 'expo.out',
      stagger: opts.stagger || .09, delay: opts.delay || 0,
      scrollTrigger: opts.trigger ? { trigger: opts.trigger, start: 'top 82%', once: true } : undefined,
      onComplete: function () { if (opts.revert !== false) split.revert(); }
    });
    return { split: split, tween: tw };
  };

  // clip-path inset tween through a proxy: browsers collapse "inset(0% 0% 0% 0%)" to "inset(0%)", which makes
  // string interpolation pair the wrong numbers. from/to are [top, right, bottom, left] in %, from may be a function.
  EZ.clip = function (kit, el, from, to, vars) {
    var o = { p: 0 };
    function set() {
      var a = typeof from === 'function' ? from() : from, p = o.p, s = [];
      for (var i = 0; i < 4; i++) s.push((a[i] + (to[i] - a[i]) * p).toFixed(3) + '%');
      el.style.clipPath = 'inset(' + s.join(' ') + ')';
    }
    vars = vars || {};
    var ou = vars.onUpdate;
    var v = {};
    for (var key in vars) v[key] = vars[key];
    v.p = 1;
    v.onUpdate = function () { set(); if (ou) ou.apply(this, arguments); };
    v.onStart = function () { set(); };
    set();
    if (kit) kit.add(function () { el.style.clipPath = ''; });
    return gsap.fromTo(o, { p: 0 }, v);
  };

  /* ---------- boot ---------- */
  EZ.boot = function () {
    if (EZ.booted) return;
    EZ.booted = true;
    buildImages();
    gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin, Draggable, InertiaPlugin, Flip, MotionPathPlugin);
    gsap.defaults({ ease: 'power3.out', duration: .85 });
    ScrollTrigger.config({ ignoreMobileResize: true });

    doc.querySelectorAll('[data-section]').forEach(function (el) {
      var id = el.dataset.section;
      var s = EZ.sections[id] || (EZ.sections[id] = { id: id });
      s.el = el;
      EZ.order.push(id);
    });
    var stored = readStored();
    EZ.order.forEach(function (id) {
      var s = EZ.sections[id];
      buildSwitch(s);
      activate(id, stored[id] || 1, { initial: true });
    });
    EZ.applyImages(doc.querySelector('.foot'));

    startLenis();
    setupCursor();
    setupNav();
    setupSettings();
    EZ.viewer.init();
    bindAnchors();
    bindKeys();
    persist();

    function refresh() { ScrollTrigger.sort(); ScrollTrigger.refresh(); }
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    var onMQ = function () { motionChanged(); };
    if (mqReduce.addEventListener) { mqReduce.addEventListener('change', onMQ); mqFine.addEventListener('change', onMQ); }
    var rw = innerWidth, rt;
    window.addEventListener('resize', function () {
      // re-init versions when crossing the phone breakpoint (layouts differ) [S0652 §6]
      clearTimeout(rt);
      rt = setTimeout(function () {
        if ((rw < 768) !== (innerWidth < 768)) { rw = innerWidth; motionChanged(); }
        rw = innerWidth;
      }, 200);
    });
    if (location.hash && location.hash.length > 1) {
      var t = doc.querySelector(location.hash);
      if (t) setTimeout(function () { EZ.scrollTo(t); }, 60);
    }
  };
})();
