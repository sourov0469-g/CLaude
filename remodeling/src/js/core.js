/* Elbaz homepage core runtime.
   Image store, section/version manager (the 1·2·3 control), cursor engine with per-element states,
   reactions, Lenis, nav, settings (theme + motion), viewer, lazy Three.js.
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
  // cubic-bezier(x1,y1,x2,y2) as a GSAP ease (no CustomEase in the bundle): Newton + bisection on x(t)
  EZ.bezier = function (x1, y1, x2, y2) {
    function a(p1, p2) { return 1 - 3 * p2 + 3 * p1; }
    function b(p1, p2) { return 3 * p2 - 6 * p1; }
    function c(p1) { return 3 * p1; }
    function at(t, p1, p2) { return ((a(p1, p2) * t + b(p1, p2)) * t + c(p1)) * t; }
    function slope(t, p1, p2) { return 3 * a(p1, p2) * t * t + 2 * b(p1, p2) * t + c(p1); }
    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      var t = x;
      for (var i = 0; i < 6; i++) { var sl = slope(t, x1, x2); if (Math.abs(sl) < 1e-6) break; t -= (at(t, x1, x2) - x) / sl; }
      if (t < 0 || t > 1 || Math.abs(at(t, x1, x2) - x) > 1e-4) {
        var lo = 0, hi = 1; t = x;
        for (var j = 0; j < 30; j++) { var v = at(t, x1, x2); if (Math.abs(v - x) < 1e-5) break; if (v < x) lo = t; else hi = t; t = (lo + hi) / 2; }
      }
      return at(t, y1, y2);
    };
  };
  EZ.map = function (v, a, b, c, d) { return c + (d - c) * EZ.clamp((v - a) / (b - a), 0, 1); };

  /* ---------- image store: one Blob URL per photo, reused by every version [PLAN §4.7] ---------- */
  var urls = {};
  function buildImages() {
    var el = doc.getElementById('img-store');
    if (!el) return;
    var store;
    try { store = JSON.parse(el.textContent); } catch (e) { store = {}; }
    Object.keys(store).forEach(function (k) {
      var s = store[k], bin = atob(s.slice(1)), n = bin.length, u8 = new Uint8Array(n);
      for (var i = 0; i < n; i++) u8[i] = bin.charCodeAt(i);
      urls[k] = URL.createObjectURL(new Blob([u8], { type: s.charAt(0) === 'a' ? 'image/avif' : 'image/webp' }));
    });
    el.textContent = '';
    // the logo ships once (nav); the menu sheet and footer copy it
    var logo = doc.querySelector('.nav__logo img');
    if (logo) doc.querySelectorAll('img[data-logo]').forEach(function (im) { im.src = logo.src; });
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
  // slots: visible versions are "1".."5", hidden backups "b1".."b3" (AUDIT-01 A.2: today's visible set becomes the backups)
  function slotsOf(s) {
    s.vis = []; s.bk = [];
    s.el.querySelectorAll(':scope > .ver, :scope > .sec__body > .ver').forEach(function (el) {
      var v = el.dataset.v;
      (v.charAt(0) === 'b' ? s.bk : s.vis).push(v);
    });
  }
  function valid(s, v) { v = String(v); return s.vis.indexOf(v) > -1 || s.bk.indexOf(v) > -1 ? v : null; }
  function readStored() {
    var o = {}, st = {};
    try { st = JSON.parse(localStorage.getItem(LS_KEY) || '{}') || {}; } catch (e) {}
    var q = new URLSearchParams(location.search);
    Object.keys(EZ.sections).forEach(function (id) {
      var s = EZ.sections[id];
      var v = valid(s, q.get(id)) || (st[id] != null && s.vis.indexOf(String(st[id])) > -1 ? String(st[id]) : null);
      if (v) o[id] = v;
    });
    return o;
  }
  function persist() {
    var o = {}, q = new URLSearchParams(location.search);
    EZ.order.forEach(function (id) {
      var v = EZ.sections[id].current;
      o[id] = v;
      if (v !== EZ.sections[id].vis[0]) q.set(id, v); else q.delete(id);
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
    v = valid(s, v) || s.vis[0];
    if (s.kit) s.kit.dispose();
    if (typeof s.cleanup === 'function') { try { s.cleanup(); } catch (e) { console.error(e); } }
    if (s.ctx) { try { s.ctx.revert(); } catch (e) { console.error('[' + id + '] revert', e); } }
    s.cleanup = null; s.ctx = null; s.kit = null;

    var vers = s.el.querySelectorAll(':scope > .ver, :scope > .sec__body > .ver');
    var verEl = null;
    vers.forEach(function (el) {
      var on = el.dataset.v === v;
      el.hidden = !on;
      if (on) verEl = el;
    });
    s.current = v;
    s.el.dataset.active = v;
    radios(s, v);
    if (!verEl) return;
    // the section is named by the heading of the version on show (backups keep their own ids) [AUDIT-01 A.2]
    var hd = verEl.querySelector('h1[id], h2[id]');
    if (hd) s.el.setAttribute('aria-labelledby', hd.id);
    EZ.applyImages(verEl);
    var def = s.defs && s.defs[v];
    var kit = s.kit = makeKit(s, verEl);
    // every GSAP tween/ScrollTrigger made in init (or later via kit.ctx.add) is reverted on swap
    s.ctx = kit.ctx = gsap.context(function () {}, verEl);
    if (def && def.init) {
      s.ctx.add(function () {
        try { s.cleanup = def.init(verEl, kit) || null; } catch (e) { console.error('[' + id + ' v' + v + ']', e); }
      });
    }
    bindMagnets(verEl, kit);
    if (!opts.initial) {
      persist();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }
  }
  EZ.activate = activate;
  function radios(s, v) {
    if (!s.switchEl) return;
    s.switchEl.querySelectorAll('[role="radio"]').forEach(function (b) {
      var on = b.dataset.v === v;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    // a backup in use stays visible in its switch even when the backup row is folded away
    s.switchEl.classList.toggle('is-bk', v.charAt(0) === 'b');
    if (s.stepNow) s.stepNow.textContent = v.charAt(0) === 'b' ? 'B' + v.slice(1) : v + '/' + s.vis.length;
  }
  // user-driven swap [AUDIT-01 D.6; S0405, S0089, S0083]: outgoing fades + rises 4px in 120ms ease-in, incoming
  // arrives from 6px below in 180ms ease-out (<= 300ms total); a second click finishes the running swap first, so
  // input is never blocked; reduced motion and Motion: Off keep the instant swap
  function swap(id, v) {
    var s = EZ.sections[id];
    v = valid(s, v); if (!v) return;
    if (s.swapTl) s.swapTl.progress(1);
    if (v === s.current) return;
    var old = s.el.querySelector('.ver[data-v="' + s.current + '"]');
    if (!EZ.motionOn() || !old || old.hidden) { activate(id, v); return; }
    radios(s, v);
    s.swapTl = gsap.to(old, { opacity: 0, y: -4, duration: .12, ease: 'power1.in', onComplete: function () {
      s.swapTl = null;
      gsap.set(old, { clearProps: 'opacity,transform' });
      activate(id, v);
      var nw = s.el.querySelector('.ver[data-v="' + v + '"]');
      if (nw) gsap.fromTo(nw, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .18, ease: 'power2.out', clearProps: 'opacity,transform' });
    } });
  }
  EZ.swap = swap;

  var NAMES = { hero: 'Opening', proof: 'Proof', services: 'Services', ba: 'Before and after', process: 'Process',
    financing: 'Financing', work: 'Projects', reviews: 'Reviews', towns: 'Service area', consult: 'Consultation',
    // inner pages (OWNER ORDER: full site), each section with its own five versions
    'kitchen-intro': 'Kitchens', 'kitchen-scope': 'Kitchen scope', 'kitchen-work': 'Kitchen projects',
    'bath-intro': 'Bathrooms', 'bath-build': 'How a bath is built', 'bath-work': 'Bath projects',
    'reno-intro': 'Whole home', 'reno-services': 'Services', 'reno-permits': 'Permits and approvals',
    'contact-form': 'Consultation', 'contact-visit': 'Visit and call', 'contact-area': 'Service area' };

  // each section's switcher digits arrive by their own carrier, so no two switch buttons react alike [FULL Phase 3]
  var SW_RX = { hero: 'drop', proof: 'swing', services: 'spin', ba: 'jack', process: 'hinge', financing: 'roll',
    work: 'lid', reviews: 'zip', towns: 'unfold', consult: 'hoist',
    'kitchen-intro': 'drop', 'kitchen-scope': 'swing', 'kitchen-work': 'lid', 'bath-intro': 'drop', 'bath-build': 'hinge', 'bath-work': 'lid',
    'reno-intro': 'drop', 'reno-services': 'spin', 'reno-permits': 'roll', 'contact-form': 'hoist', 'contact-visit': 'jack', 'contact-area': 'unfold' };
  function buildSwitch(s) {
    var wrap = doc.createElement('div');
    wrap.className = 'vswitch';
    wrap.dataset.for = s.id;
    var inner = doc.createElement('div');
    inner.className = 'vswitch__in';
    inner.setAttribute('role', 'radiogroup');
    inner.setAttribute('aria-label', (NAMES[s.id] || s.id) + ': design version');
    var nm = doc.createElement('span');
    nm.className = 'vswitch__name'; nm.setAttribute('aria-hidden', 'true'); nm.textContent = NAMES[s.id] || s.id;
    inner.appendChild(nm);
    function digit(v, label, text, cls) {
      var b = doc.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-label', label);
      b.dataset.v = v;
      b.dataset.rx = '~t:' + text + '/' + (SW_RX[s.id] || 'pop') + '/hop/b';
      b.dataset.buddySig = 'flip';
      if (cls) b.className = cls;
      b.textContent = text;
      return b;
    }
    s.vis.forEach(function (v, i) {
      if (i) {
        var sep = doc.createElement('span');
        sep.className = 'vswitch__sep'; sep.setAttribute('aria-hidden', 'true'); sep.textContent = '·';
        inner.appendChild(sep);
      }
      inner.appendChild(digit(v, 'Version ' + v, v));
    });
    // phones (OWNER MASTER DIRECTIVE, 8 visible versions): the digits collapse to a stepper, prev / current of total / next
    var stepWrap = doc.createElement('span'); stepWrap.className = 'vswitch__step';
    function stepBtn(dir, label, text) {
      var b = doc.createElement('button'); b.type = 'button'; b.className = 'vswitch__st'; b.setAttribute('aria-label', label); b.textContent = text;
      b.dataset.rx = 'native:vswitch-step';
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var list = s.current.charAt(0) === 'b' ? s.vis.concat(s.bk) : s.vis, i = list.indexOf(s.current);
        swap(s.id, list[(i + dir + list.length) % list.length]);
      });
      return b;
    }
    var stNow = doc.createElement('span'); stNow.className = 'vswitch__now nums'; stNow.setAttribute('aria-live', 'polite');
    stepWrap.appendChild(stepBtn(-1, 'Previous version', '\u2039')); stepWrap.appendChild(stNow); stepWrap.appendChild(stepBtn(1, 'Next version', '\u203A'));
    s.stepNow = stNow;
    // hidden backup slots: reachable (B key, ?backups=1, or a backup in the URL), never the default view
    if (s.bk.length) {
      var bk = doc.createElement('span');
      bk.className = 'vswitch__bks';
      s.bk.forEach(function (v) { bk.appendChild(digit(v, 'Backup ' + v.slice(1), 'B' + v.slice(1), 'vswitch__bk')); });
      inner.appendChild(bk);
    }
    inner.addEventListener('click', function (e) {
      var b = e.target.closest('[role="radio"]');
      if (b && b.dataset.v !== s.current) swap(s.id, b.dataset.v);
    });
    inner.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!d) return;
      e.preventDefault(); e.stopPropagation();
      var list = root.classList.contains('show-backups') || s.current.charAt(0) === 'b' ? s.vis.concat(s.bk) : s.vis;
      var i = list.indexOf(s.current), nv = list[(i + d + list.length) % list.length];
      swap(s.id, nv);
      var nb = inner.querySelector('[data-v="' + nv + '"]');
      if (nb) nb.focus();
    });
    wrap.appendChild(inner);
    wrap.appendChild(stepWrap);
    // docked in the nav's free centre: the switch of the section in view is the one shown, and it covers no content
    (doc.querySelector('.nav__vs') || s.el).appendChild(wrap);
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
      if (/^[1-9]$/.test(e.key) && s.vis.indexOf(e.key) > -1) { swap(id, e.key); }
      else if (e.key === 'b' || e.key === 'B') { root.classList.toggle('show-backups'); }
      else if (e.key === 'r' || e.key === 'R') { activate(id, s.current); }
      else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && (!t || t === doc.body || t.closest('.vswitch'))) {
        var i = s.vis.indexOf(s.current), n = s.vis.length;
        swap(id, s.vis[((i < 0 ? 0 : i) + (e.key === 'ArrowRight' ? 1 : -1) + n) % n]);
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

  /* ---------- the companion lives in buddy.js; the retired cursor layer is deleted (AUDIT-01 D.2.5) ---------- */
  function refreshCursor() {
    if (EZ.buddy) EZ.buddy.refresh();
    if (EZ.fields) EZ.fields.refresh();
  }
  EZ.cursorState = function () { if (EZ.buddy) EZ.buddy.retarget(); };

  /* ---------- per-element reactions (buttons never move; the old magnets are gone) ---------- */
  function bindMagnets(scope, kit) {
    if (EZ.bindReactions) EZ.bindReactions(scope, kit);
  }

  /* ---------- character split (used by heroes) ---------- */
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
        // the header stays: it carries the phone, Book and the version switch (sticky contact, Anatomy §6)
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
    if (EZ.motionOn()) gsap.from(sheet.querySelectorAll('li'), { y: 16, opacity: 0, duration: .25, stagger: .03, ease: 'power2.out' });
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
      if (meta) meta.content = root.dataset.theme === 'daylight' ? '#F1ECE4' : '#121212';
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
    if (EZ.dividers) EZ.dividers.refresh();
    if (EZ.bindChromeReactions) EZ.bindChromeReactions();
    startLenis();
    EZ.order.forEach(function (id) { activate(id, EZ.sections[id].current, { initial: true }); });
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }

  /* ---------- press state, page-wide [AUDIT-01 D.7; S0083 physics-active-state, S0063 scale(0.97)] ----------
     Web Animations on the individual 'scale' property, so it composes with any transform GSAP or CSS already owns.
     Down 60ms ease-out to .97 (switch digits .94 in 100ms, D.6), release 160ms ease-out. Off under reduced motion. */
  function setupPress() {
    var SEL = '.btn, button, [role="tab"], [role="radio"], [role="button"], summary, .chip, [data-press]';
    var held = null;
    function release() {
      if (!held) return;
      var el = held; held = null;
      if (el._pa) el._pa.cancel();
      el.animate([{ scale: el._ps }, { scale: '1' }], { duration: 160, easing: 'ease-out' });
    }
    doc.addEventListener('pointerdown', function (e) {
      if (!EZ.motionOn() || e.button > 0) return;
      var el = e.target.closest && e.target.closest(SEL);
      if (!el || el.disabled || el.closest('[data-nopress], [role="application"]') || el.getBoundingClientRect().width > 640) return;
      release();
      held = el;
      var sw = !!el.closest('.vswitch');
      el._ps = sw ? '.94' : '.97';
      el._pa = el.animate([{ scale: '1' }, { scale: el._ps }], { duration: sw ? 100 : 60, easing: 'ease-out', fill: 'forwards' });
    }, { passive: true });
    ['pointerup', 'pointercancel', 'dragstart'].forEach(function (ev) { doc.addEventListener(ev, release, { passive: true }); });
    window.addEventListener('blur', release);
  }

  /* ---------- viewer: Flip lightbox [S0184 Flip, pack pick #8] ---------- */
  EZ.viewer = (function () {
    // [AUDIT-01 F7.3] visible Previous / Next (44px); no "4 of 26" count, the title alone names the photo
    var box, img, title, nav, closeBtn, items = [], idx = 0, from = null, prevFocus = null;
    function init() {
      box = doc.getElementById('viewer');
      img = box.querySelector('.viewer__img'); title = box.querySelector('.viewer__title');
      nav = box.querySelector('.viewer__nav'); closeBtn = box.querySelector('.viewer__close');
      closeBtn.addEventListener('click', close);
      box.querySelector('.viewer__prev').addEventListener('click', function () { show(idx - 1); });
      box.querySelector('.viewer__next').addEventListener('click', function () { show(idx + 1); });
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
      nav.hidden = items.length < 2;
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
            { x: 0, y: 0, scale: 1, duration: .3, ease: 'power2.inOut', clearProps: 'transform' });
        }
        gsap.fromTo(box, { backgroundColor: 'rgba(18, 18, 18, 0)' }, { backgroundColor: 'rgba(18, 18, 18, .94)', duration: .25, clearProps: 'backgroundColor' });
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

  /* ---------- shared motion helpers ---------- */
  // GreenSock's official horizontalLoop helper (bank 361 / Q161), draggable path removed (Club plugins not used)
  EZ.horizontalLoop = function (items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    var onChange = config.onChange, lastIndex = 0,
      tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: 'none' },
        onUpdate: onChange && function () { var i = tl.closestIndex(); if (lastIndex !== i) { lastIndex = i; onChange(items[i], i); } },
        onReverseComplete: function () { tl.totalTime(tl.rawTime() + tl.duration() * 100); } }),
      length = items.length, startX = items[0].offsetLeft, times = [], widths = [], spaceBefore = [], xPercents = [],
      curIndex = 0, center = config.center, pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? function (v) { return v; } : gsap.utils.snap(config.snap || 1),
      timeOffset = 0, container = items[0].parentNode, totalWidth, timeWrap;
    function getTotalWidth() {
      return items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + spaceBefore[0] +
        items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') + (parseFloat(config.paddingRight) || 0);
    }
    function populateWidths() {
      var b1 = container.getBoundingClientRect(), b2;
      items.forEach(function (el, i) {
        widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'));
        xPercents[i] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / widths[i] * 100 + gsap.getProperty(el, 'xPercent'));
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, { xPercent: function (i) { return xPercents[i]; } });
      totalWidth = getTotalWidth();
    }
    function populateOffsets() {
      timeOffset = center ? tl.duration() * (container.parentNode.offsetWidth / 2) / totalWidth : 0;
      if (center) times.forEach(function (t, i) { times[i] = timeWrap(tl.labels['label' + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset); });
    }
    function getClosest(values, value, wrap) {
      var i = values.length, closest = 1e10, index = 0, d;
      while (i--) { d = Math.abs(values[i] - value); if (d > wrap / 2) d = wrap - d; if (d < closest) { closest = d; index = i; } }
      return index;
    }
    function populateTimeline() {
      var i, item, curX, distanceToStart, distanceToLoop;
      tl.clear();
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
        tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
          .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) },
            { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
          .add('label' + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    }
    function refresh(deep) {
      var progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      if (deep) populateTimeline();
      populateOffsets();
      tl.progress(progress, true);
    }
    gsap.set(items, { x: 0 });
    populateWidths(); populateTimeline(); populateOffsets();
    function toIndex(index, vars) {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) index += index > curIndex ? -length : length;
      var newIndex = gsap.utils.wrap(0, length, index), time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) time += tl.duration() * (index > curIndex ? 1 : -1);
      if (time < 0 || time > tl.duration()) vars.modifiers = { time: timeWrap };
      curIndex = newIndex;
      vars.overwrite = true;
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
    }
    tl.toIndex = toIndex;
    tl.closestIndex = function (setCurrent) { var index = getClosest(times, tl.time(), tl.duration()); if (setCurrent) curIndex = index; return index; };
    tl.current = function () { return tl.closestIndex(true); };
    tl.next = function (vars) { return toIndex(tl.current() + 1, vars); };
    tl.previous = function (vars) { return toIndex(tl.current() - 1, vars); };
    tl.refresh = refresh;
    tl.progress(1, true).progress(0, true);   // pre-render so the wrap never flashes
    tl.closestIndex(true);
    lastIndex = curIndex;
    if (onChange) onChange(items[curIndex], curIndex);
    return tl;
  };


  // default section entrance, copied from the bank's Q40 pen (GreenSock pojzxwZ): content arrives from the direction
  // of travel, fromTo +-100px (50px on phones), autoAlpha 0->1, 1.25s "expo", overwrite "auto"; hidden again on leave.
  // data-reveal="left|right" enters sideways as in the pen's gs_reveal_fromLeft/Right.
  EZ.reveal = function (kit, targets) {
    if (!kit.motion) return;
    var d = kit.mobile ? 16 : 24;   // §4 dosing: reveal-level travel, .3s ease-out (Q40 direction kept, its 1.25s/100px dropped)
    gsap.utils.toArray(targets, kit.root).forEach(function (el) {
      function from(dir) {
        var x = 0, y = dir * d, side = el.dataset.reveal;
        if (side === 'left') { x = -d; y = 0; } else if (side === 'right') { x = d; y = 0; }
        kit.ctx.add(function () {
          gsap.fromTo(el, { x: x, y: y, autoAlpha: 0 }, { duration: .3, x: 0, y: 0, autoAlpha: 1, ease: 'power2.out', overwrite: 'auto' });
        });
      }
      gsap.set(el, { autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: el,
        onEnter: function () { from(1); },
        onEnterBack: function () { from(-1); },
        // sticky columns stay on screen after their trigger "leaves": only hide what has really gone
        onLeave: function () { if (el.getBoundingClientRect().bottom < 0) gsap.set(el, { autoAlpha: 0 }); }
      });
    });
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
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, Flip, MotionPathPlugin);
    gsap.defaults({ ease: 'power3.out', duration: .3 });   // §4 dosing default
    ScrollTrigger.config({ ignoreMobileResize: true });

    doc.querySelectorAll('[data-section]').forEach(function (el) {
      var id = el.dataset.section;
      var s = EZ.sections[id] || (EZ.sections[id] = { id: id });
      s.el = el;
      slotsOf(s);
      EZ.order.push(id);
    });
    if (new URLSearchParams(location.search).get('backups') === '1') root.classList.add('show-backups');
    var stored = readStored();
    EZ.order.forEach(function (id) {
      var s = EZ.sections[id];
      buildSwitch(s);
      activate(id, stored[id] || s.vis[0], { initial: true });
    });
    setupPress();
    EZ.applyImages(doc.querySelector('.foot'));
    // the floating switch shows the section that holds the viewport's middle line
    var swIO = new IntersectionObserver(function (ens) {
      ens.forEach(function (en) { var s = EZ.sections[en.target.dataset.section]; if (s && s.switchEl) s.switchEl.parentNode.classList.toggle('is-current', en.isIntersecting); });
    }, { rootMargin: '-49% 0px -50% 0px' });
    EZ.order.forEach(function (id) { swIO.observe(EZ.sections[id].el); });

    startLenis();
    if (EZ.systemsBoot) EZ.systemsBoot();
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
