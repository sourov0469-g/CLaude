/* UAV Aerial Solutions: immersive motion layer.
   GSAP + ScrollTrigger drive reveals, scrubbed scenes, parallax, counters, marquee and magnetic UI;
   Lenis supplies smooth scrolling (driven by the GSAP ticker). Pointer effects (cursor, trail, aura,
   lens, drone) are fine-pointer only. Everything is skipped under prefers-reduced-motion, and the
   page is complete without any of it. Page-level setup lives in one gsap.context that the router
   reverts before it swaps content. */
(function () {
  'use strict';
  var doc = document, html = doc.documentElement, body = doc.body;
  var U = window.UAV = window.UAV || {};
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (!gsap || !ST) { html.classList.add('no-gsap'); return; }
  gsap.registerPlugin(ST);
  gsap.defaults({ ease: 'power3.out' });
  html.classList.add('has-gsap');

  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fineMQ = window.matchMedia('(hover: hover) and (pointer: fine)');
  var M = U.motion = {};
  var DARK = '.sec--dark,.cta,.phero--dark,.site-footer,.marquee,.m-menu';
  var SECTIONS = '.sec,.cta,.hero,.phero,.facts,.statement,.site-footer';

  function qs(s, r) { return (r || doc).querySelector(s); }
  function qsa(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function reduced() { return reduceMQ.matches; }
  function fine() { return fineMQ.matches && !reduced(); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function headH() { var h = qs('[data-header]'); return h ? h.offsetHeight : 0; }
  function on(el, ev, fn, opts) { el.addEventListener(ev, fn, opts); return function () { el.removeEventListener(ev, fn, opts); }; }

  /* ================= smooth scroll (Lenis on the GSAP ticker) ================= */
  var lenis = null;
  function lenisTick(t) { if (lenis) lenis.raf(t * 1000); }
  function startLenis() {
    if (lenis || reduced() || typeof window.Lenis !== 'function') return;
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 0.95, anchors: false });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(lenisTick);
    gsap.ticker.lagSmoothing(0);
  }
  function stopLenis() {
    if (!lenis) return;
    gsap.ticker.remove(lenisTick); lenis.destroy(); lenis = null; gsap.ticker.lagSmoothing(500, 33);
  }
  /** Menus lock the page; pause smooth scrolling while they do. */
  M.hold = function (on_) { if (!lenis) return; if (on_) lenis.stop(); else lenis.start(); };
  M.scrollTo = function (target, immediate) {
    var top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY - headH() - 16;
    if (lenis) lenis.scrollTo(top, { immediate: !!immediate, duration: 1.15 });
    else window.scrollTo({ top: top, left: 0, behavior: immediate || reduced() ? 'auto' : 'smooth' });
  };
  U.scrollTo = M.scrollTo;

  /* ================= global (once per document) ================= */
  var globalCleanups = [], globalOn = false, trailKick = null, trailBurst = null;
  var cursorEl = null;

  function buildCursor() {
    var el = cursorEl = doc.createElement('div');
    el.className = 'cur'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="cur-p"><i class="cur-ring"><span class="cur-label"></span></i></div><div class="cur-q"><i class="cur-dot"></i></div>';
    body.appendChild(el);
    var ringP = qs('.cur-p', el), dotQ = qs('.cur-q', el), label = qs('.cur-label', el);
    var rx = gsap.quickTo(ringP, 'x', { duration: 0.38, ease: 'power3.out' }), ry = gsap.quickTo(ringP, 'y', { duration: 0.38, ease: 'power3.out' });
    var dx = gsap.quickSetter(dotQ, 'x', 'px'), dy = gsap.quickSetter(dotQ, 'y', 'px');
    function move(e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (!el.classList.contains('is-vis')) { gsap.set(ringP, { x: e.clientX, y: e.clientY }); el.classList.add('is-vis'); }
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
    }
    function over(e) {
      var t = e.target; if (!t || !t.closest) return;
      var s = '', lab = t.closest('[data-cursor]');
      if (lab) { s = 'label'; label.textContent = lab.getAttribute('data-cursor'); }
      else if (t.closest('input:not([type=checkbox]):not([type=radio]):not([type=range]),textarea')) s = 'text';
      else if (t.closest('a[href],button,[role=tab],summary,label,select,.mesh input')) s = 'link';
      el.setAttribute('data-s', s);
      el.setAttribute('data-t', t.closest(DARK) ? 'dark' : '');
    }
    var off = [
      on(doc, 'pointermove', move, { passive: true }),
      on(doc, 'pointerover', over, { passive: true }),
      on(doc, 'pointerdown', function () { el.classList.add('is-down'); }),
      on(doc, 'pointerup', function () { el.classList.remove('is-down'); }),
      on(html, 'pointerleave', function () { el.classList.remove('is-vis'); }),
      on(window, 'blur', function () { el.classList.remove('is-vis', 'is-down'); })
    ];
    return function () { off.forEach(function (f) { f(); }); el.remove(); cursorEl = null; };
  }

  /* Pointer trail: motes laid by distance travelled (not by time), so a flick and a crawl draw the
     same ribbon; a ring buffer recycles them. Idle breath once every ~0.42s; keyboard focus bursts. */
  function buildTrail() {
    var cv = doc.createElement('canvas'); cv.className = 'trail'; cv.setAttribute('aria-hidden', 'true'); body.appendChild(cv);
    var c = cv.getContext('2d'); if (!c) { cv.remove(); return function () {}; }
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0;
    function size() { W = window.innerWidth; H = window.innerHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); c.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size();
    var N = 150, STEP = 15;
    var X = new Float32Array(N), Y = new Float32Array(N), VX = new Float32Array(N), VY = new Float32Array(N), AGE = new Float32Array(N), LIFE = new Float32Array(N), SZ = new Float32Array(N), PH = new Float32Array(N), DK = new Uint8Array(N);
    for (var i = 0; i < N; i++) { LIFE[i] = 1; AGE[i] = 2; }
    var head = 0, E = { x: 0, y: 0, lx: 0, ly: 0, acc: 0, has: false, idle: 0 }, tx = 0, ty = 0, raf = 0, last = 0, lastMove = 0, now = 0;
    function spawn(x, y, ang, burst) {
      var k = head; head = (head + 1) % N;
      var a = ang + Math.PI + (Math.random() - 0.5) * 1.7, sp = (burst ? 30 : 12) + Math.random() * (burst ? 50 : 22);
      X[k] = x + (Math.random() - 0.5) * (burst ? 8 : 12); Y[k] = y + (Math.random() - 0.5) * (burst ? 8 : 12);
      VX[k] = Math.cos(a) * sp; VY[k] = Math.sin(a) * sp;
      AGE[k] = 0; LIFE[k] = 1.1 + Math.random() * 0.9; SZ[k] = 1.1 + Math.random() * 1.9; PH[k] = Math.random() * 6.283;
      DK[k] = cursorEl && cursorEl.getAttribute('data-t') === 'dark' ? 1 : 0;
    }
    function ss(a, b, v) { v = clamp((v - a) / (b - a), 0, 1); return v * v * (3 - 2 * v); }
    function frame(ts) {
      raf = 0;
      if (doc.hidden) { last = 0; return; }
      var dt = last ? Math.min((ts - last) / 1000, 1 / 30) : 1 / 60; last = ts; now += dt;
      var k = 1 - Math.exp(-16 * dt); E.x += (tx - E.x) * k; E.y += (ty - E.y) * k;
      if (E.has) {
        var dx = E.x - E.lx, dy = E.y - E.ly, moved = Math.sqrt(dx * dx + dy * dy);
        if (moved > 1e-4) {
          E.acc += moved; var g = 0, ang = Math.atan2(dy, dx);
          while (E.acc >= STEP && g < 14) { E.acc -= STEP; g++; var t = moved > 1e-6 ? Math.min(1, g * STEP / moved) : 0; spawn(E.lx + dx * t, E.ly + dy * t, ang, false); }
          if (g >= 14) E.acc = 0;
          E.lx = E.x; E.ly = E.y; E.idle = 0;
        } else if (now - lastMove < 6) {
          E.idle += dt; if (E.idle > 0.42) { E.idle = 0; spawn(E.x, E.y, Math.random() * 6.283, false); }
        }
      }
      c.clearRect(0, 0, W, H);
      var alive = 0, damp = 1 - 0.5 * dt;
      for (var i = 0; i < N; i++) {
        if (AGE[i] >= LIFE[i]) continue;
        AGE[i] += dt; var u = AGE[i] / LIFE[i]; if (u >= 1) continue; alive++;
        VX[i] = VX[i] * damp + Math.sin(now * 1.3 + PH[i]) * 5 * dt; VY[i] = VY[i] * damp + Math.cos(now * 1.1 + PH[i] * 1.7) * 4 * dt - 7 * dt;
        X[i] += VX[i] * dt; Y[i] += VY[i] * dt;
        var a = ss(0, 0.12, u) * (1 - ss(0.22, 1, u)) * 0.62, r = SZ[i] * (1 + 0.55 * u), col = DK[i] ? '223,194,164' : '143,98,68';
        c.fillStyle = 'rgba(' + col + ',' + (a * 0.28).toFixed(3) + ')'; c.beginPath(); c.arc(X[i], Y[i], r * 2.6, 0, 6.283); c.fill();
        c.fillStyle = 'rgba(' + col + ',' + a.toFixed(3) + ')'; c.beginPath(); c.arc(X[i], Y[i], r, 0, 6.283); c.fill();
      }
      if (alive || now - lastMove < 6) raf = requestAnimationFrame(frame); else last = 0;
    }
    function kick() { if (!raf && !doc.hidden) raf = requestAnimationFrame(frame); }
    function move(e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      if (!E.has) { E.has = true; E.x = E.lx = tx; E.y = E.ly = ty; }
      lastMove = now; kick();
    }
    function burst(el) {
      var r = el.getBoundingClientRect(); if (!r.width) return;
      for (var i = 0; i < 16; i++) spawn(r.left + Math.random() * r.width, r.top + Math.random() * r.height, Math.random() * 6.283, true);
      lastMove = now; kick();
    }
    function focusin(e) { var t = e.target; if (t && t.matches && t.matches(':focus-visible')) burst(t); }
    trailBurst = burst; trailKick = kick;
    var off = [
      on(doc, 'pointermove', move, { passive: true }),
      on(doc, 'focusin', focusin),
      on(html, 'pointerleave', function () { E.has = false; }),
      on(window, 'resize', size),
      on(doc, 'visibilitychange', function () { if (!doc.hidden) { last = 0; kick(); } })
    ];
    return function () { off.forEach(function (f) { f(); }); if (raf) cancelAnimationFrame(raf); cv.remove(); trailBurst = trailKick = null; };
  }

  /* Section aura: a soft copper spotlight follows the pointer inside whichever section it is in,
     and the section takes a faint wash. Low alpha on purpose. */
  function buildAura() {
    var curSec = null, tx = 0, ty = 0, raf = 0, st = new WeakMap(), lastEv = null;
    function auraOf(sec) {
      var a = sec._aura; if (a && a.isConnected) return a;
      a = sec._aura = doc.createElement('i'); a.className = 'aura'; a.setAttribute('aria-hidden', 'true'); sec.appendChild(a); st.set(sec, { x: 0, y: 0, init: false }); return a;
    }
    function tick() {
      raf = 0; if (!curSec) return;
      var s = st.get(curSec), a = curSec._aura; if (!s || !a) return;
      var r = curSec.getBoundingClientRect(); tx = lastEv.clientX - r.left; ty = lastEv.clientY - r.top;
      if (!s.init) { s.x = tx; s.y = ty; s.init = true; }
      s.x += (tx - s.x) * 0.14; s.y += (ty - s.y) * 0.14;
      a.style.setProperty('--mx', s.x.toFixed(1)); a.style.setProperty('--my', s.y.toFixed(1));
      if (Math.abs(tx - s.x) > 0.4 || Math.abs(ty - s.y) > 0.4) raf = requestAnimationFrame(tick);
    }
    function move(e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      var t = e.target, sec = t && t.closest ? t.closest(SECTIONS) : null;
      if (sec !== curSec) {
        if (curSec && curSec._aura) curSec._aura.classList.remove('is-on');
        curSec = sec;
        if (sec) { auraOf(sec).classList.add('is-on'); st.get(sec).init = false; }
      }
      lastEv = e;
      if (sec && !raf) raf = requestAnimationFrame(tick);
      var mark = t && t.closest ? t.closest('.foot-mark') : null;
      if (mark) mark.style.setProperty('--mx', (e.clientX - mark.getBoundingClientRect().left).toFixed(0));
    }
    function leave() { if (curSec && curSec._aura) curSec._aura.classList.remove('is-on'); curSec = null; }
    var off = [on(doc, 'pointermove', move, { passive: true }), on(html, 'pointerleave', leave), on(window, 'blur', leave)];
    return function () { off.forEach(function (f) { f(); }); if (raf) cancelAnimationFrame(raf); qsa('.aura').forEach(function (a) { a.remove(); }); };
  }

  function buildGlobal() {
    if (globalOn) return; globalOn = true;
    if (fine()) { globalCleanups.push(buildCursor(), buildTrail(), buildAura()); }
    var bar = qs('.nav-progress');
    if (bar) {
      var set = gsap.quickSetter(bar, 'scaleX');
      var pst = ST.create({ start: 0, end: 'max', onUpdate: function (s) { set(s.progress); } });
      globalCleanups.push(function () { pst.kill(); gsap.set(bar, { scaleX: 0 }); });
    }
    startLenis();
    globalCleanups.push(function () { stopLenis(); });
  }
  function teardownGlobal() { globalOn = false; globalCleanups.splice(0).forEach(function (f) { f(); }); }

  /* ================= atmosphere: drifting light folds on dark sections ================= */
  var atmoses = [];
  function Atmos(sec) {
    var cv = doc.createElement('canvas'); cv.className = 'atmos'; cv.setAttribute('aria-hidden', 'true'); sec.insertBefore(cv, sec.firstChild);
    var c = cv.getContext('2d'), w = 2, h = 2, vis = false, raf = 0, frameN = 0, S = 0.34, self = this;
    var N = 7, seeds = []; for (var i = 0; i < N; i++) seeds.push({ p: i * 1.7, s: 0.05 + 0.012 * i, bw: 0.1 + 0.05 * (((i * 37) % 5) / 5), o: 0.9 + ((i * 13) % 7) / 20 });
    function draw(t) {
      c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, w, h);
      c.globalCompositeOperation = 'lighter';
      for (var i = 0; i < N; i++) {
        var d = seeds[i], cx = ((i + 0.5) / N + Math.sin(t * d.s + d.p) * 0.05) * w, bw = w * d.bw, a = (0.06 + 0.035 * Math.sin(t * 0.3 + i)) * d.o;
        var g = c.createLinearGradient(cx - bw, 0, cx + bw, 0);
        g.addColorStop(0, 'rgba(204,152,101,0)'); g.addColorStop(0.5, 'rgba(204,152,101,' + a.toFixed(3) + ')'); g.addColorStop(1, 'rgba(204,152,101,0)');
        c.fillStyle = g; c.fillRect(cx - bw, 0, bw * 2, h);
      }
      c.globalCompositeOperation = 'destination-in';
      var v = c.createLinearGradient(0, 0, 0, h); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(0.55, 'rgba(0,0,0,.45)'); v.addColorStop(1, 'rgba(0,0,0,1)');
      c.fillStyle = v; c.fillRect(0, 0, w, h);
      c.globalCompositeOperation = 'lighter';
      var r = c.createRadialGradient(w * 0.88, h * 1.02, 0, w * 0.88, h * 1.02, Math.max(w, h) * 0.6);
      r.addColorStop(0, 'rgba(204,152,101,.2)'); r.addColorStop(1, 'rgba(204,152,101,0)'); c.fillStyle = r; c.fillRect(0, 0, w, h);
    }
    function loop() { raf = 0; if (!vis || doc.hidden || reduced()) return; if ((frameN++ & 1) === 0) draw(performance.now() / 1000); raf = requestAnimationFrame(loop); }
    function sync() { if (vis && !doc.hidden && !reduced() && !raf) raf = requestAnimationFrame(loop); if ((!vis || reduced()) && raf) { cancelAnimationFrame(raf); raf = 0; } }
    function fit() { var r = sec.getBoundingClientRect(); w = Math.max(2, Math.round(r.width * S)); h = Math.max(2, Math.round(r.height * S)); cv.width = w; cv.height = h; draw(reduced() ? 14 : performance.now() / 1000); }
    var ro = 'ResizeObserver' in window ? new ResizeObserver(fit) : null; if (ro) ro.observe(sec); else fit();
    var io = new IntersectionObserver(function (en) { vis = en[0].isIntersecting; sync(); }); io.observe(sec);
    var vc = function () { sync(); }; doc.addEventListener('visibilitychange', vc);
    this.sec = sec; this.sync = sync;
    this.destroy = function () { if (raf) cancelAnimationFrame(raf); if (ro) ro.disconnect(); io.disconnect(); doc.removeEventListener('visibilitychange', vc); cv.remove(); sec._atmos = null; };
    sec._atmos = self;
  }
  function initAtmos() {
    atmoses = atmoses.filter(function (a) { if (!a.sec.isConnected) { a.destroy(); return false; } return true; });
    qsa('.sec--dark,.cta,.phero--dark,.site-footer').forEach(function (sec) { if (!sec._atmos) atmoses.push(new Atmos(sec)); });
  }

  /* ================= page-level (reverted by the router) ================= */
  var ctx = null, mm = null, cleanups = [], pageRoot = doc;

  function splitWords(el) {
    if (el.classList.contains('is-split')) return null;
    if (el.children.length) { el.classList.add('is-split'); return null; }   // never split links or inline markup
    var text = el.textContent.replace(/[ \t\r\n]+/g, ' ').trim(); if (!text) { el.classList.add('is-split'); return null; }
    el.setAttribute('aria-label', text); el.textContent = '';
    var parts = text.split(' '), words = [];
    parts.forEach(function (w, i) {
      var m = doc.createElement('span'), s = doc.createElement('span');
      m.className = 'sw'; m.setAttribute('aria-hidden', 'true'); s.className = 'sw-i'; s.textContent = w; m.appendChild(s); el.appendChild(m);
      if (i < parts.length - 1) el.appendChild(doc.createTextNode(' '));
      words.push(s);
    });
    el.classList.add('is-split'); return words;
  }

  function initHeadings(root) {
    qsa('[data-split],.h2', root).forEach(function (el) {
      if (el.closest('.m-menu,.mega')) return;
      var words = splitWords(el); if (!words) return;
      var hero = !!el.closest('.hero,.phero');
      gsap.set(words, { yPercent: 112 });
      if (hero) gsap.to(words, { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.06, delay: 0.12 });
      else gsap.to(words, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.045, scrollTrigger: { trigger: el, start: 'top 87%', once: true } });
    });
  }

  function initStatement(root) {
    qsa('[data-scrub-words]', root).forEach(function (el) {
      var text = el.textContent.replace(/[ \t\r\n]+/g, ' ').trim(), parts = text.split(' ');
      el.textContent = '';
      var words = parts.map(function (w, i) {
        var s = doc.createElement('span'); s.className = 'sv'; s.textContent = w; el.appendChild(s);
        if (i < parts.length - 1) el.appendChild(doc.createTextNode(' ')); return s;
      });
      gsap.to(words, { opacity: 1, ease: 'none', duration: 0.4, stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 55%', scrub: 0.6 } });
    });
  }

  function initCounters(root) {
    qsa('[data-facts] b', root).forEach(function (b) {
      var m = b.textContent.match(/^(\d+)(.*)$/); if (!m) return;
      var to = +m[1], rest = m[2];
      b.innerHTML = '<span class="num" aria-hidden="true" style="min-width:' + String(to).length + 'ch">0</span><span class="sr-only">' + to + '</span>' + rest;
      var num = qs('.num', b), o = { v: 0 };
      gsap.to(o, { v: to, duration: 1.7, ease: 'power3.out', onUpdate: function () { num.textContent = Math.round(o.v); }, scrollTrigger: { trigger: b, start: 'top 92%', once: true } });
    });
  }

  function initFx(root) {
    qsa('.fx', root).forEach(function (fxEl) {
      var host = fxEl.parentNode, layers = qsa('.fx-l', fxEl);
      var io = new IntersectionObserver(function (en) { host.classList.toggle('is-off', !en[0].isIntersecting); }); io.observe(host);
      cleanups.push(function () { io.disconnect(); });
      if (reduced()) return;
      layers.forEach(function (l) {
        var sp = Math.abs(+l.getAttribute('data-speed') || 0.1);
        gsap.fromTo(l, { y: function () { return clamp(sp * window.innerHeight * 0.4, 0, host.offsetHeight * 0.085); } },
          { y: function () { return -clamp(sp * window.innerHeight * 0.4, 0, host.offsetHeight * 0.085); }, ease: 'none',
            scrollTrigger: { trigger: host, start: 'top bottom', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true } });
      });
      if (fine()) {
        var setters = layers.map(function (l) {
          var d = (+l.getAttribute('data-depth') || 0.03) * 100;
          return { d: d, x: gsap.quickTo(l, 'xPercent', { duration: 0.9, ease: 'power3.out' }), y: gsap.quickTo(l, 'yPercent', { duration: 0.9, ease: 'power3.out' }) };
        });
        cleanups.push(on(host, 'pointermove', function (e) {
          if (e.pointerType && e.pointerType !== 'mouse') return;
          var r = host.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
          setters.forEach(function (s) { s.x(-nx * s.d); s.y(-ny * s.d * 0.6); });
        }, { passive: true }));
        cleanups.push(on(host, 'pointerleave', function () { setters.forEach(function (s) { s.x(0); s.y(0); }); }));
      }
      // a marker patrols the flight path (always something happening)
      var path = qs('[data-flight]', fxEl), mark = qs('[data-drone-mark]', fxEl);
      if (path && mark) {
        var len = path.getTotalLength(), o = { p: 0.3 };
        function place() { var pt = path.getPointAtLength(o.p * len); mark.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')'); }
        place();
        var tw = gsap.to(o, { p: 1, duration: 26, ease: 'none', repeat: -1, onUpdate: place, paused: true });
        tw.progress(0.3);
        ST.create({ trigger: host, start: 'top bottom', end: 'bottom top', onToggle: function (s) { tw.paused(!s.isActive); } });
      }
    });
  }

  function initParallaxImages(root) {
    if (reduced()) return;
    qsa('[data-parallax-img]', root).forEach(function (el) {
      gsap.fromTo(el, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    qsa('.hero-plate img', root).forEach(function (img) { gsap.from(img, { scale: 1.14, duration: 2.4, ease: 'power3.out' }); });
    qsa('[data-parallax-float]', root).forEach(function (el) {
      gsap.to(el, { yPercent: -16, ease: 'none', scrollTrigger: { trigger: el.closest('.hero'), start: 'top top', end: 'bottom top', scrub: 0.8 } });
    });
  }

  function initMarquee(root) {
    if (reduced()) return;
    qsa('[data-marquee]', root).forEach(function (sec) {
      var track = qs('.marquee-track', sec); if (!track || track.getAttribute('data-ready')) return;
      track.setAttribute('data-ready', '1');
      var items = Array.prototype.slice.call(track.children), w0 = track.scrollWidth || 1;
      var reps = Math.max(1, Math.ceil(window.innerWidth / w0)), sets = reps * 2;
      for (var s = 1; s < sets; s++) items.forEach(function (li) { var cl = li.cloneNode(true); cl.setAttribute('aria-hidden', 'true'); track.appendChild(cl); });
      var tw = gsap.to(track, { xPercent: -50, ease: 'none', duration: (w0 * reps) / 62, repeat: -1 });
      ST.create({
        trigger: sec, start: 'top bottom', end: 'bottom top',
        onToggle: function (self) { tw.paused(!self.isActive); },
        onUpdate: function (self) {
          var v = Math.abs(self.getVelocity()); if (v < 40) return;
          tw.timeScale((self.direction < 0 ? -1 : 1) * (1 + Math.min(v / 260, 6)));
          gsap.to(tw, { timeScale: 1, duration: 1.2, ease: 'power2.out', overwrite: true });
        }
      });
    });
  }

  function initStory(root) {
    var stages = qsa('[data-story]', root); if (!stages.length) return;
    mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', function () {
      stages.forEach(function (stage) {
        stage.classList.add('is-live');
        var steps = qsa('[data-story-step]', stage), fill = qs('[data-story-fill]', stage);
        var s1 = qs('.sv-s1', stage), s2 = qs('.sv-s2', stage), s3 = qs('.sv-s3', stage);
        var pass = qs('.sv-pass', stage), dr = qs('.sv-dr', stage), len = pass.getTotalLength(), o = { p: 0 };
        function fly() { var pt = pass.getPointAtLength(o.p * len); dr.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')'); }
        gsap.set([s2, s3], { autoAlpha: 0 });
        gsap.set(qsa('.sv-handles rect', stage), { scale: 0, transformOrigin: '50% 50%', transformBox: 'fill-box' });
        gsap.set(qsa('.sv-tiles rect', stage), { autoAlpha: 0, scale: 0.86, transformOrigin: '50% 50%', transformBox: 'fill-box' });
        gsap.set(qsa('.sv-chips g', stage), { autoAlpha: 0, y: 10 });
        gsap.set(qs('.sv-qm', stage), { autoAlpha: 0 }); gsap.set(qs('.sv-q', stage), { autoAlpha: 0 });
        fly();
        var tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage, start: function () { return 'center center+=' + Math.round(headH() / 2); }, end: function () { return '+=' + Math.round(window.innerHeight * 2.3); },
            scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: function (self) {
              var i = self.progress < 0.34 ? 0 : self.progress < 0.67 ? 1 : 2;
              steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
              if (fill) fill.style.transform = 'scaleX(' + self.progress.toFixed(3) + ')';
            }
          }
        });
        tl.to(qs('.sv-site', stage), { strokeDashoffset: 0, duration: 0.55 }, 0)
          .to(qsa('.sv-handles rect', stage), { scale: 1, duration: 0.2, stagger: 0.07 }, 0.35)
          .to([qs('.sv-q', stage), qs('.sv-qm', stage)], { autoAlpha: 1, duration: 0.2 }, 0.6)
          .to([qs('.sv-q', stage), qs('.sv-qm', stage)], { autoAlpha: 0, duration: 0.2 }, 0.95)
          .to(s1.querySelector('.sv-site'), { fillOpacity: 0.4, duration: 0.1 }, 1)
          .to(s2, { autoAlpha: 1, duration: 0.15 }, 1)
          .to(pass, { strokeDashoffset: 0, duration: 0.85 }, 1.05)
          .to(o, { p: 1, duration: 0.85, onUpdate: fly }, 1.05)
          .to(s2, { opacity: 0.35, duration: 0.2 }, 2)
          .to(s3, { autoAlpha: 1, duration: 0.05 }, 2)
          .to(qsa('.sv-tiles rect', stage), { autoAlpha: 1, scale: 1, duration: 0.25, stagger: 0.06 }, 2.05)
          .to(qsa('.sv-chips g', stage), { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.12 }, 2.6)
          .to({}, { duration: 0.15 }, 3);
        steps[0].classList.add('is-active');
      });
      return function () { stages.forEach(function (st) { st.classList.remove('is-live'); qsa('[data-story-step]', st).forEach(function (s) { s.classList.remove('is-active'); }); }); };
    });
  }

  function initMagnetic(root) {
    if (!fine()) return;
    qsa('.btn,[data-magnetic]', root).forEach(function (el) {
      if (el.closest('.m-menu')) return;
      el.classList.add('is-mag');
      var xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' }), yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
      cleanups.push(on(el, 'pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.2); yTo((e.clientY - r.top - r.height / 2) * 0.28);
      }, { passive: true }));
      cleanups.push(on(el, 'pointerleave', function () { xTo(0); yTo(0); }));
      cleanups.push(on(el, 'pointerdown', function () { gsap.to(el, { scale: 0.965, duration: 0.14, overwrite: 'auto' }); }));
      cleanups.push(on(el, 'pointerup', function () { gsap.to(el, { scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' }); }));
      cleanups.push(on(el, 'pointerleave', function () { gsap.to(el, { scale: 1, duration: 0.3, overwrite: 'auto' }); }));
    });
  }

  function initCards(root) {
    if (!fine()) return;
    qsa('.card,.icard--link', root).forEach(function (el) {
      el.classList.add('is-tilt'); gsap.set(el, { transformPerspective: 1000 });
      var rX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' }), rY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' }), yy = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      cleanups.push(on(el, 'pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = el.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        rY(nx * 5); rX(-ny * 4); yy(-4);
        el.style.setProperty('--px', ((nx + 0.5) * 100).toFixed(1) + '%'); el.style.setProperty('--py', ((ny + 0.5) * 100).toFixed(1) + '%');
      }, { passive: true }));
      cleanups.push(on(el, 'pointerleave', function () { rX(0); rY(0); yy(0); }));
    });
    qsa('.row', root).forEach(function (el) {
      cleanups.push(on(el, 'pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = el.getBoundingClientRect();
        el.style.setProperty('--px', (e.clientX - r.left).toFixed(0) + 'px'); el.style.setProperty('--py', (e.clientY - r.top).toFixed(0) + 'px');
      }, { passive: true }));
    });
  }

  /* inspection lens: a feathered circle through which the same image is shown richer */
  function initLens(root) {
    if (!fine()) return;
    qsa('[data-lens]', root).forEach(function (el) {
      var lens = doc.createElement('i'), ring = doc.createElement('i');
      lens.className = 'lens'; ring.className = 'lens-ring'; lens.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
      el.appendChild(lens); el.appendChild(ring);
      var s = { x: 0, y: 0, tx: 0, ty: 0, r: 0, tr: 0, raf: 0 };
      function radius() { return clamp(el.clientWidth * 0.2, 110, 170); }
      function tick() {
        s.raf = 0;
        s.x += (s.tx - s.x) * 0.16; s.y += (s.ty - s.y) * 0.16; s.r += (s.tr - s.r) * 0.14;
        lens.style.setProperty('--lx', s.x.toFixed(1) + 'px'); lens.style.setProperty('--ly', s.y.toFixed(1) + 'px'); lens.style.setProperty('--lr', s.r.toFixed(1) + 'px');
        ring.style.transform = 'translate3d(' + s.x.toFixed(1) + 'px,' + s.y.toFixed(1) + 'px,0) scale(' + (s.r / 100).toFixed(3) + ')';
        var onNow = s.r > 3; lens.classList.toggle('is-on', onNow); ring.classList.toggle('is-on', onNow);
        if (Math.abs(s.tx - s.x) > 0.2 || Math.abs(s.ty - s.y) > 0.2 || Math.abs(s.tr - s.r) > 0.2) s.raf = requestAnimationFrame(tick);
      }
      function at(e) { var r = el.getBoundingClientRect(); s.tx = e.clientX - r.left; s.ty = e.clientY - r.top; }
      cleanups.push(on(el, 'pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        at(e); if (s.r < 1) { s.x = s.tx; s.y = s.ty; } s.tr = radius(); if (!s.raf) s.raf = requestAnimationFrame(tick);
      }, { passive: true }));
      cleanups.push(on(el, 'pointerleave', function () { s.tr = 0; if (!s.raf) s.raf = requestAnimationFrame(tick); }));
      cleanups.push(function () { if (s.raf) cancelAnimationFrame(s.raf); lens.remove(); ring.remove(); });
    });
  }

  /* home hero: a small drone shadows the pointer (or patrols when idle); capture a frame */
  function initDrone(root) {
    qsa('[data-drone-zone]', root).forEach(function (zone) {
      var d = qs('[data-drone]', zone); if (!d) return;
      var btn = qs('[data-capture]', zone), count = qs('[data-frames]', zone), live = qs('[data-frames-live]', zone), stage = qs('.hero-stage', zone);
      var n = 0, mode = 'idle', lastMove = 0, px = 0, t0 = 0, vis = false;
      function size() { var r = zone.getBoundingClientRect(); return { w: r.width, h: r.height, l: r.left, t: r.top }; }
      var z = size(); gsap.set(d, { x: z.w * 0.72, y: z.h * 0.52 });
      d.classList.add('is-on');
      var xTo = gsap.quickTo(d, 'x', { duration: 1.1, ease: 'power3.out' }), yTo = gsap.quickTo(d, 'y', { duration: 1.1, ease: 'power3.out' }), rTo = gsap.quickTo(d, 'rotation', { duration: 0.7, ease: 'power3.out' });
      function idleTick(time) {
        if (!vis) return;
        if (mode === 'follow' && time - lastMove > 3) mode = 'idle';
        if (mode !== 'idle') return;
        var r = size(), t = time - t0, x = r.w * 0.64 + Math.sin(t * 0.33) * r.w * 0.2, y = r.h * 0.5 + Math.sin(t * 0.47 + 1) * r.h * 0.17;
        rTo(clamp((x - px) * 0.9, -18, 18)); px = x; xTo(x); yTo(y);
      }
      if (!reduced()) {
        t0 = gsap.ticker.time;
        gsap.ticker.add(idleTick); cleanups.push(function () { gsap.ticker.remove(idleTick); });
        ST.create({ trigger: zone, start: 'top bottom', end: 'bottom top', onToggle: function (s) { vis = s.isActive; } });
        if (fine()) cleanups.push(on(zone, 'pointermove', function (e) {
          if (e.pointerType !== 'mouse') return;
          var r = size(), x = e.clientX - r.l + 44, y = e.clientY - r.t + 34;
          rTo(clamp((x - px) * 0.7, -22, 22)); px = x; mode = 'follow'; lastMove = gsap.ticker.time; xTo(x); yTo(y);
        }, { passive: true }));
      }
      function capture(x, y) {
        n++; if (count) count.textContent = (n < 10 ? '0' : '') + n; if (live) live.textContent = 'Frame ' + n + ' captured';
        if (reduced()) return;
        var shot = doc.createElement('i'), flash = doc.createElement('i'); shot.className = 'shot'; flash.className = 'flash'; shot.setAttribute('aria-hidden', 'true'); flash.setAttribute('aria-hidden', 'true');
        shot.style.left = x + 'px'; shot.style.top = y + 'px'; zone.appendChild(flash); zone.appendChild(shot);
        gsap.fromTo(shot, { scale: 1.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power3.out' });
        gsap.to(shot, { opacity: 0, duration: 0.5, delay: 0.5, onComplete: function () { shot.remove(); } });
        gsap.fromTo(flash, { opacity: 0.4 }, { opacity: 0, duration: 0.45, ease: 'power2.out', onComplete: function () { flash.remove(); } });
        gsap.fromTo(d, { scale: 1.2 }, { scale: 1, duration: 0.55, ease: 'power3.out' });
        if (trailBurst) trailBurst(shot);
      }
      if (stage) cleanups.push(on(stage, 'click', function (e) { if (e.target.closest('a,button')) return; var r = size(); capture(e.clientX - r.l, e.clientY - r.t); }));
      if (btn) cleanups.push(on(btn, 'click', function () { var r = size(), b = d.getBoundingClientRect(); capture(b.left + b.width / 2 - r.l, b.top + b.height / 2 - r.t); }));
    });
  }

  function pageInit(root) {
    if (reduced()) { initFx(root); return; }                 // static scenes only; reveals fall back to CSS
    initHeadings(root); initStatement(root); initCounters(root); initFx(root); initParallaxImages(root);
    initMarquee(root); initStory(root); initMagnetic(root); initCards(root); initLens(root); initDrone(root);
  }

  function kill() {
    cleanups.splice(0).forEach(function (f) { try { f(); } catch (e) { /* element already gone */ } });
    if (mm) { mm.revert(); mm = null; }
    if (ctx) { ctx.revert(); ctx = null; }
  }

  var refreshT = 0;
  function refreshSoon() { clearTimeout(refreshT); refreshT = setTimeout(function () { ST.refresh(); }, 120); }

  M.init = function (root) {
    root = root && root.querySelector ? root : doc; pageRoot = root;
    kill();
    html.classList.toggle('motion-on', !reduced());
    buildGlobal();
    ctx = gsap.context(function () { pageInit(root); }, root === doc ? undefined : root);
    initAtmos();
    refreshSoon();
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(refreshSoon);
  };
  M.kill = kill;

  /* route change curtain (single-file edition) */
  var curtain = null;
  M.leave = function (cb) {
    if (reduced()) { cb(); return; }
    if (!curtain) { curtain = doc.createElement('div'); curtain.className = 'curtain'; curtain.setAttribute('aria-hidden', 'true'); body.appendChild(curtain); }
    gsap.killTweensOf(curtain);
    gsap.set(curtain, { transformOrigin: 'bottom' });
    gsap.to(curtain, { scaleY: 1, duration: 0.32, ease: 'power3.in', onComplete: function () {
      cb(); curtain.classList.add('is-up'); gsap.set(curtain, { transformOrigin: 'top' });
      gsap.to(curtain, { scaleY: 0, duration: 0.55, delay: 0.14, ease: 'power3.out', onComplete: function () { curtain.classList.remove('is-up'); } });
    } });
  };

  /* in-page anchors on the multi-page site: glide instead of jump */
  doc.addEventListener('click', function (e) {
    if (U.single || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || !lenis) return;
    var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    var h = a.getAttribute('href'); if (h.length < 2 || h === '#main') return;
    var el; try { el = doc.getElementById(decodeURIComponent(h.slice(1))); } catch (x) { return; }
    if (!el) return;
    e.preventDefault(); M.scrollTo(el); history.pushState(null, '', h);
    el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true });
  });

  window.addEventListener('load', refreshSoon);
  var mqChange = function () { teardownGlobal(); M.init(pageRoot); };
  if (reduceMQ.addEventListener) { reduceMQ.addEventListener('change', mqChange); fineMQ.addEventListener('change', mqChange); }

  if (!U.single) M.init(doc);   // single-file edition: the router calls initPage, which calls this
})();
