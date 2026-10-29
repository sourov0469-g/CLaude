/* Austin Pro homepage v2 (DIRECTION-HOME-V2.md). One live version per section; the others wait in <template>s.
   Motion rules from the Skill Pack: GSAP + ScrollTrigger, Lenis on desktop only, reduced motion = finished states
   (S0400/S0652), UI under 300 ms, reveals once (S1321), pins desktop only, every drag has a key/tap path (S0070). */
(() => {
  'use strict';
  const d = document, root = d.documentElement;
  const $ = (s, el = d) => el.querySelector(s);
  const $$ = (s, el = d) => Array.from(el.querySelectorAll(s));
  const G = window.gsap, ST = window.ScrollTrigger, FL = window.Flip;
  if (G) G.registerPlugin(...[ST, FL].filter(Boolean));
  const DATA = JSON.parse($('#home-data').textContent);
  const PINS = DATA.map.pins;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: picks still work for this visit */ } }
  };
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  const mqDesk = matchMedia('(min-width: 900px)');
  let userMotion = store.get('ap-motion');
  const motionOK = () => !!G && (userMotion ? userMotion === 'on' : !mqReduce.matches);
  const setMotionClass = () => root.classList.toggle('motion', motionOK());
  setMotionClass();

  const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const usd2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pmt = (P, apr, n) => apr === 0 ? P / n : P * (apr / 12) / (1 - Math.pow(1 + apr / 12, -n));
  const pv = (M, apr, n) => apr === 0 ? M * n : M * (1 - Math.pow(1 + apr / 12, -n)) / (apr / 12);
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const ym = m => `${MONTHS[m % 100 - 1]} 20${String(Math.floor(m / 100)).padStart(2, '0')}`;
  const hdH = () => ($('.hd') || { offsetHeight: 0 }).offsetHeight;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const CREW_RX = /\b(Kevin(?: Harris)?|Garret{1,2}|Tracy|Paul Hale|Paul Schantz(?:'s)?|Taylor(?: Anderson)?|Jake|Jerry|Maria|Shorty)\b/g;
  const markNames = s => esc(s).replace(CREW_RX, '<mark>$1</mark>');
  const tradesOf = bits => DATA.map.sv.filter((_, i) => bits & (1 << i)).join(', ');
  const ease = { out: 'power3.out', x: 'expo.out', io: 'power4.inOut' };

  /* a bag of listeners, observers and timers, cleared when a version is switched out (S1315 leak rules) */
  function bag() {
    const fns = [];
    return {
      on(el, ev, fn, opt) { el.addEventListener(ev, fn, opt); fns.push(() => el.removeEventListener(ev, fn, opt)); },
      io(el, cb, opt) { const o = new IntersectionObserver(cb, opt); o.observe(el); fns.push(() => o.disconnect()); return o; },
      ro(el, cb) { if (!window.ResizeObserver) return; const o = new ResizeObserver(cb); o.observe(el); fns.push(() => o.disconnect()); },
      add(fn) { fns.push(fn); },
      clear() { while (fns.length) { try { fns.pop()(); } catch (e) { /* already gone */ } } }
    };
  }

  /* ---------- smooth scroll: Lenis, desktop pointer only, never under reduced motion (S0403, S1209) ---------- */
  let lenis = null;
  const lenisTick = t => lenis && lenis.raf(t * 1000);
  function lenisSync() {
    const want = motionOK() && mqFine.matches && mqDesk.matches && !!window.Lenis && !!ST;
    if (want && !lenis) {
      lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
      lenis.on('scroll', ST.update);
      G.ticker.add(lenisTick);
      G.ticker.lagSmoothing(0);
    } else if (!want && lenis) {
      G.ticker.remove(lenisTick);
      lenis.destroy();
      lenis = null;
    }
  }
  function syncFx() { if (window.APFX) { window.APFX.motion = motionOK(); window.APFX.sync(); } }
  function jumpBy(dy) { if (!dy) return; if (lenis) lenis.scrollTo(window.scrollY + dy, { immediate: true, force: true }); else window.scrollBy(0, dy); }
  function goTo(el) {
    const y = el.getBoundingClientRect().top + window.scrollY - hdH();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: motionOK() ? 'smooth' : 'auto' });
  }

  /* ---------- words: masked rise for headings (S0451); accessible name kept on the heading ---------- */
  function splitWords(el) {
    if (el.dataset.splitDone) return $$('.w', el);
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    const walker = d.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const frag = d.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(p)); return; }
        const m = d.createElement('span'); m.className = 'wm'; m.setAttribute('aria-hidden', 'true');
        const w = d.createElement('span'); w.className = 'w'; w.textContent = p;
        m.appendChild(w); frag.appendChild(m);
      });
      n.replaceWith(frag);
    });
    el.dataset.splitDone = '1';
    return $$('.w', el);
  }
  /* ---------- headings: each section enters its own way (PLAN-HOME-V3 G3); the phrase stays in aria-label ---------- */
  const once = (el, start = 'top 86%') => ({ trigger: el, start, once: true });
  function heads(rootEl, s) {
    $$('[data-split]', rootEl).forEach(el => {
      if (!motionOK()) { el.classList.add('is-split'); return; }
      const words = splitWords(el);
      el.classList.add('is-split');
      const first = s.key === 'hero' && !s.switched;
      const st = first ? undefined : once(el);
      switch (s.key) {
        case 'hero':      // S1321 line reveal: rise with blur
          G.from(words, { yPercent: 100, filter: 'blur(8px)', duration: 1, ease: 'power4.out', stagger: 0.06, delay: first ? 0.12 : 0, scrollTrigger: st, clearProps: 'filter' }); break;
        case 'services':  // boards hinging up into place
          G.from(words, { rotationX: -95, yPercent: 30, transformOrigin: '50% 100%', duration: 0.75, ease: 'power3.out', stagger: 0.05, scrollTrigger: st }); break;
        case 'work':      // words slide in under their mask
          G.from(words, { xPercent: -110, duration: 0.8, ease: 'expo.out', stagger: 0.045, scrollTrigger: st }); break;
        case 'built': {   // S0411 drafted: outline first, then the ink fills left to right
          el.classList.add('is-draft');
          G.fromTo(el, { '--fill': '0%' }, { '--fill': '100%', duration: 1.3, ease: 'power2.inOut', scrollTrigger: st, onComplete: () => el.classList.remove('is-draft') });
          break;
        }
        case 'colour':    // words arrive in paint and dry to ink
          G.from(words, { color: '#D42125', yPercent: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06, scrollTrigger: st }); break;
        case 'near':      // letters resolve like place names on a survey
          words.forEach((w, k) => { const t = w.textContent; G.to(w, { scrambleText: { text: t, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', speed: 0.6, revealDelay: 0.2 }, duration: 0.9, delay: k * 0.08, scrollTrigger: st }); });
          break;
        case 'reviews':   // S1329 staggered words: opacity and 12 px, 0.05 s apart
          G.from(words, { autoAlpha: 0, y: 12, duration: 0.6, ease: 'power2.out', stagger: 0.05, scrollTrigger: st }); break;
        case 'money':     // figures drop in from above
          G.from(words, { yPercent: -110, duration: 0.8, ease: 'power3.out', stagger: 0.035, scrollTrigger: st }); break;
        case 'book':      // S1334: words about 72 ms apart, settling from a little large
          G.from(words, { scale: 1.18, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.072, transformOrigin: '0% 100%', scrollTrigger: st }); break;
        default:          // S0451 masked rise
          G.from(words, { yPercent: 110, duration: 0.8, ease: ease.out, stagger: 0.035, scrollTrigger: st });
      }
    });
  }
  function riseIn(els, opts = {}) {
    if (!motionOK() || !els.length) return;
    G.from(els, Object.assign({ y: 16, autoAlpha: 0, duration: 0.6, ease: ease.out, stagger: 0.08 }, opts));
  }

  /* ---------- odometer: only changed digits roll, 260 ms (S0652) ---------- */
  function Odo(el) {
    let cur = '';
    const strip = c => `<span class="oc"><span class="os" style="transform:translateY(-${c * 10}%)">${'0123456789'.split('').map(n => `<span>${n}</span>`).join('')}</span></span>`;
    return text => {
      if (text === cur) return;
      if (text.length !== cur.length || !motionOK()) {
        el.innerHTML = [...text].map(c => /\d/.test(c) ? strip(c) : `<span class="ox">${esc(c)}</span>`).join('');
      } else {
        const slots = el.children;
        [...text].forEach((c, i) => {
          if (c === cur[i]) return;
          const slot = slots[i];
          if (/\d/.test(c) && slot && slot.classList.contains('oc')) slot.firstChild.style.transform = `translateY(-${c * 10}%)`;
          else if (slot) slot.outerHTML = /\d/.test(c) ? strip(c) : `<span class="ox">${esc(c)}</span>`;
        });
      }
      cur = text;
    };
  }

  /* ---------- rolling figures for the proof index: two turns of the drum, 1.1 s expo, columns 70 ms apart ---------- */
  function rollIn(el, delay) {
    const val = el.dataset.roll;
    if (!motionOK()) return;
    const drum = '01234567890123456789'.split('').map(n => `<span>${n}</span>`).join('');
    el.innerHTML = `<span aria-hidden="true" style="display:inline-flex">${[...val].map(c => /\d/.test(c) ? `<span class="rc"><span class="rs" data-to="${c}">${drum}</span></span>` : `<span class="rx">${esc(c)}</span>`).join('')}</span><span class="sr-only">${esc(val)}</span>`;
    const strips = $$('.rs', el);
    G.fromTo(strips, { yPercent: 0 }, { yPercent: i => -(10 + +strips[i].dataset.to) * 5, duration: 1.1, ease: ease.x, stagger: 0.07, delay, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  }

  /* ---------- the logo's 2x2 window: four panes open from the centre cross (house motif) ---------- */
  function panesOpen(panes, delay = 0) {
    if (!motionOK()) { panes.forEach(p => G && G.set(p, { scale: 0 })); return null; }
    G.set(panes, { scale: 1 });
    return G.to(panes, { scale: 0, duration: 1, ease: ease.io, stagger: { each: 0.06, from: 'center' }, delay });
  }

  /* ---------- drag helper: pointer capture, 10 px direction lock so vertical page scroll is never trapped (S1443) ---------- */
  function hdrag(el, b, { onMove, onStart, onEnd, handle }) {
    let sx = 0, sy = 0, id = null, live = false;
    b.on(el, 'pointerdown', e => {
      if (e.button > 0 || e.target.closest('button:not(.cmp-handle):not(.c3-handle), a')) return;
      sx = e.clientX; sy = e.clientY; id = e.pointerId; live = false;
      if ((handle && e.target.closest(handle)) || e.pointerType === 'mouse') { live = true; el.setPointerCapture(id); onStart && onStart(e); onMove(e); }
    });
    b.on(el, 'pointermove', e => {
      if (e.pointerId !== id) return;
      if (!live) {
        const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy);
        if (dx < 10 && dy < 10) return;
        if (dx > dy) { live = true; el.setPointerCapture(id); onStart && onStart(e); } else { id = null; return; }
      }
      onMove(e);
    });
    const end = e => { if (e.pointerId !== id) return; if (live) onEnd && onEnd(e); id = null; live = false; };
    b.on(el, 'pointerup', end); b.on(el, 'pointercancel', end); b.on(el, 'lostpointercapture', end);
  }
  function sliderKeys(handle, b, get, set) {
    b.on(handle, 'keydown', e => {
      const step = e.shiftKey ? 10 : 5;
      const map = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step };
      if (e.key in map) { e.preventDefault(); set(get() + map[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); set(0); }
      else if (e.key === 'End') { e.preventDefault(); set(100); }
    });
  }

  /* ---------- radio groups: one Tab stop, arrows move and select (S0070) ---------- */
  function radios(group, b, onPick, sel = '[role="radio"]') {
    const items = () => $$(sel, group).filter(x => !x.hidden && !x.closest('[hidden]'));
    const pick = (it, focus) => {
      items().forEach(x => { const on = x === it; x.setAttribute('aria-checked', on); x.tabIndex = on ? 0 : -1; });
      if (focus) it.focus();
      onPick(it);
    };
    const all = items();
    const cur = all.find(x => x.getAttribute('aria-checked') === 'true') || all[0];
    all.forEach(x => { x.tabIndex = x === cur ? 0 : -1; });
    b.on(group, 'click', e => { const it = e.target.closest(sel); if (it && group.contains(it)) pick(it); });
    b.on(group, 'keydown', e => {
      const list = items(); const i = list.indexOf(d.activeElement); if (i < 0) return;
      let n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = list[(i + 1) % list.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = list[(i - 1 + list.length) % list.length];
      else if (e.key === 'Home') n = list[0]; else if (e.key === 'End') n = list[list.length - 1];
      if (n) { e.preventDefault(); pick(n, true); }
    });
    return pick;
  }

  /* ========================================================================================
     VERSIONS
     ======================================================================================== */
  const V = {};

  /* HERO 1: the after photo installs over the before in lap courses, bottom-up (PLAN.md blind mask: 30 strips,
     stagger 0.02, 0.9 s power3.out, about 1.5 s); pointer depth from fx.js (S1330); scroll parallax 0.18 (S1321) */
  V.hero1 = (r, b) => {
    const fr = $('.h1-frame', r), crs = $$('.crs', fr), btn = $('.h1-replay', r);
    const order = crs.slice().reverse();
    const shut = 'inset(0% 100% 0% 0%)', open = 'inset(0% 0% 0% 0%)';
    const play = delay => G.fromTo(order, { clipPath: shut }, { clipPath: open, duration: 0.9, ease: 'power3.out', stagger: 0.02, delay, overwrite: true });
    if (!motionOK()) { btn.hidden = true; return; }
    G.set(order, { clipPath: shut });
    play(0.55);
    G.from($('.h1-b', fr), { scale: 1.06, duration: 1.8, ease: ease.x });
    riseIn($$('.lead, .ctas', r), { delay: 0.5 });
    b.on(btn, 'click', () => { G.set(order, { clipPath: shut }); play(0.1); });
    if (mqDesk.matches && ST) G.to($$('.h1-b, .h1-courses', fr), { yPercent: 9, ease: 'none', scrollTrigger: { trigger: r, start: 'top top', end: 'bottom top', scrub: 1.2 } });
  };

  /* HERO 2: drawn, then built. The traced elevation draws in construction order (S0407: grade, wall, courses
     bottom-up, trim, windows, roof), a scan line wipes the drawing into the job photo (S0468), and scrolling on
     desktop runs the scan back up toward the drawing. Line layers float at different depths (S1330). */
  V.hero2 = (r, b) => {
    const fig = $('.h2-fig', r), svg = $('svg', fig);
    const set = p => { fig.style.setProperty('--scan', (p * 100).toFixed(2) + '%'); fig.classList.toggle('is-scan', p > 0.002 && p < 0.998); };
    riseIn($$('.lead, .ctas', r), { delay: 0.5 });
    if (!motionOK() || !window.DrawSVGPlugin) { set(1); return; }
    set(0);
    const tl = G.timeline({ delay: 0.25 });
    ['grade', 'wall', 'siding', 'wingc', 'trim', 'windows', 'gable', 'roof', 'wing', 'doors', 'deck'].forEach((n, i) => {
      const g = $(`[data-g="${n}"]`, svg); if (!g) return;
      let paths = $$('path', g);
      if (n === 'siding' || n === 'wingc') paths = paths.slice();        // generated bottom-up already
      tl.from(paths, { drawSVG: '0%', duration: n === 'siding' ? 0.35 : 0.55, ease: 'power2.inOut', stagger: n === 'siding' || n === 'wingc' ? 0.03 : 0.04 }, i === 0 ? 0 : '-=0.42');
    });
    const st = { p: 0 };
    tl.to(st, { p: 1, duration: 1.4, ease: 'power2.inOut', onUpdate: () => set(st.p) }, '+=0.25');
    ['roof', 'gable', 'windows', 'trim'].forEach((n, k) => { const g = $(`[data-g="${n}"]`, svg); if (g) g.dataset.depth = [0.6, 0.45, 0.3, 0.2][k]; });
    if (mqDesk.matches && ST) ST.create({ trigger: r, start: 'top top', end: 'bottom top', onUpdate: self => { if (tl.progress() === 1) set(1 - self.progress * 0.9); } });
  };
  /* HERO 3: WebGL brush paints the after photo over the before; tap button for touch, keyboard and fallback */
  V.hero3 = (r, b) => {
    const fig = $('.h3-stage', r), cv = $('.h3-gl', fig), imgB = $('.h3-b', fig), imgA = $('.h3-a', fig), btn = $('.h3-toggle', fig);
    if (motionOK()) riseIn($$('.lead, .ctas', r), { delay: 0.5 });
    let gl = null, after = false;
    const label = () => { btn.textContent = after ? 'Show the old siding' : 'Show the new siding'; btn.setAttribute('aria-pressed', after); };
    b.on(btn, 'click', () => {
      after = !after; label();
      if (gl) gl.show(after);
      else fig.classList.toggle('is-after', after);
    });
    if (!motionOK()) return;
    const start = () => { if (gl || !imgA.complete || !imgB.complete) return; gl = paintGL(fig, cv, imgB, imgA, b); if (gl) { fig.classList.add('gl-on'); gl.demo(); } };
    b.io(fig, ([en]) => { if (en.isIntersecting) { if (imgA.complete && imgB.complete) start(); else { imgA.decode().then(start, () => {}); imgB.decode().then(start, () => {}); } } }, { rootMargin: '200px' });
  };

  function paintGL(fig, cv, imgB, imgA, b) {
    let g;
    try { g = cv.getContext('webgl', { premultipliedAlpha: false, antialias: false, failIfMajorPerformanceCaveat: true }); } catch (e) { g = null; }
    if (!g) return null;
    const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
    const FS_BRUSH = 'precision mediump float;varying vec2 v;uniform vec2 uPos;uniform float uR,uAsp,uK;void main(){vec2 q=v-uPos;q.x*=uAsp;float a=smoothstep(uR,uR*.3,length(q))*uK;gl_FragColor=vec4(a);}';
    const FS = `precision mediump float;varying vec2 v;uniform sampler2D uB,uA,uP;uniform vec4 uC;uniform float uProg;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
      void main(){vec2 uv=vec2(v.x,1.-v.y);vec2 t=uv*uC.xy+uC.zw;
        float nn=n(uv*vec2(9.,6.))*.6+n(uv*vec2(24.,16.))*.4;
        float m=texture2D(uP,v).r+uProg*1.5;
        float k=smoothstep(.42,.62,m+(nn-.5)*.4);float e=k*(1.-k)*4.;vec2 o=vec2(nn-.5)*.014*e;
        vec3 cb=texture2D(uB,t+o).rgb,ca=texture2D(uA,t-o).rgb;
        gl_FragColor=vec4(clamp(mix(cb,ca,k)+e*.05,0.,1.),1.);}`;
    const sh = (type, src) => { const s = g.createShader(type); g.shaderSource(s, src); g.compileShader(s); if (!g.getShaderParameter(s, g.COMPILE_STATUS)) { console.warn(g.getShaderInfoLog(s)); return null; } return s; };
    const prog = (fs) => { const p = g.createProgram(); const a = sh(g.VERTEX_SHADER, VS), c = sh(g.FRAGMENT_SHADER, fs); if (!a || !c) return null; g.attachShader(p, a); g.attachShader(p, c); g.bindAttribLocation(p, 0, 'p'); g.linkProgram(p); return g.getProgramParameter(p, g.LINK_STATUS) ? p : null; };
    const P1 = prog(FS_BRUSH), P2 = prog(FS);
    if (!P1 || !P2) return null;
    const buf = g.createBuffer(); g.bindBuffer(g.ARRAY_BUFFER, buf); g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), g.STATIC_DRAW);
    g.enableVertexAttribArray(0); g.vertexAttribPointer(0, 2, g.FLOAT, false, 0, 0);
    const tex = (src) => { const t = g.createTexture(); g.bindTexture(g.TEXTURE_2D, t); [g.TEXTURE_WRAP_S, g.TEXTURE_WRAP_T].forEach(k => g.texParameteri(g.TEXTURE_2D, k, g.CLAMP_TO_EDGE)); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR); if (src) g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, src); return t; };
    let tB, tA;
    try { tB = tex(imgB); tA = tex(imgA); } catch (e) { return null; }
    const PW = 512, PH = 320;
    const tP = tex(null); g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, PW, PH, 0, g.RGBA, g.UNSIGNED_BYTE, null);
    const fb = g.createFramebuffer(); g.bindFramebuffer(g.FRAMEBUFFER, fb); g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, tP, 0);
    const clearPaint = () => { g.bindFramebuffer(g.FRAMEBUFFER, fb); g.viewport(0, 0, PW, PH); g.clearColor(0, 0, 0, 0); g.clear(g.COLOR_BUFFER_BIT); };
    clearPaint();
    const U = (p, n) => g.getUniformLocation(p, n);
    const st = { prog: 0 };
    let W = 1, H = 1, frame = 0, lost = false;
    const size = () => { const rc = fig.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 1.5); W = Math.max(1, Math.round(rc.width * dpr)); H = Math.max(1, Math.round(rc.height * dpr)); cv.width = W; cv.height = H; draw(); };
    function draw() {
      frame = 0; if (lost) return;
      g.bindFramebuffer(g.FRAMEBUFFER, null); g.viewport(0, 0, W, H); g.disable(g.BLEND); g.useProgram(P2);
      const ca = W / H, ia = 1280 / 800;
      const c = ca > ia ? [1, ia / ca, 0, (1 - ia / ca) / 2] : [ca / ia, 1, (1 - ca / ia) / 2, 0];
      g.uniform4f(U(P2, 'uC'), c[0], c[1], c[2], c[3]); g.uniform1f(U(P2, 'uProg'), st.prog);
      [[tB, 'uB'], [tA, 'uA'], [tP, 'uP']].forEach(([t, n], i) => { g.activeTexture(g.TEXTURE0 + i); g.bindTexture(g.TEXTURE_2D, t); g.uniform1i(U(P2, n), i); });
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
    }
    const ask = () => { if (!frame) frame = requestAnimationFrame(draw); };
    function stamp(x, y, k = 1) {
      g.bindFramebuffer(g.FRAMEBUFFER, fb); g.viewport(0, 0, PW, PH); g.useProgram(P1);
      g.enable(g.BLEND); g.blendFunc(g.ONE, g.ONE);
      g.uniform2f(U(P1, 'uPos'), x, 1 - y); g.uniform1f(U(P1, 'uR'), 0.11); g.uniform1f(U(P1, 'uAsp'), W / H); g.uniform1f(U(P1, 'uK'), 0.45 * k);
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4); g.disable(g.BLEND);
    }
    let last = null;
    function strokeTo(x, y) {
      if (!last) { stamp(x, y); last = [x, y]; ask(); return; }
      const dx = x - last[0], dy = y - last[1], dist = Math.hypot(dx * W / H, dy), steps = Math.min(24, Math.ceil(dist / 0.025));
      for (let i = 1; i <= steps; i++) stamp(last[0] + dx * i / steps, last[1] + dy * i / steps);
      last = [x, y]; ask();
    }
    const pos = e => { const rc = fig.getBoundingClientRect(); return [(e.clientX - rc.left) / rc.width, (e.clientY - rc.top) / rc.height]; };
    let demoTl = null;
    const stopDemo = () => { if (demoTl) { demoTl.kill(); demoTl = null; } };
    if (mqFine.matches) {
      b.on(fig, 'pointermove', e => { if (e.pointerType !== 'mouse') return; stopDemo(); const [x, y] = pos(e); strokeTo(x, y); });
      b.on(fig, 'pointerleave', () => { last = null; });
    }
    hdrag(fig, b, { onMove: e => { if (e.pointerType === 'mouse') return; stopDemo(); const [x, y] = pos(e); strokeTo(x, y); }, onEnd: () => { last = null; } });
    b.on(cv, 'webglcontextlost', e => { e.preventDefault(); lost = true; fig.classList.remove('gl-on'); });
    b.ro(fig, size);
    size();
    b.add(() => { if (frame) cancelAnimationFrame(frame); stopDemo(); G.killTweensOf(st); [tB, tA, tP].forEach(t => g.deleteTexture(t)); g.deleteFramebuffer(fb); g.deleteBuffer(buf); g.deleteProgram(P1); g.deleteProgram(P2); const ext = g.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); });
    return {
      show(on) {
        stopDemo(); G.killTweensOf(st);
        G.to(st, { prog: on ? 1 : 0, duration: 1.2, ease: 'power2.inOut', onUpdate: ask, onComplete: () => { if (!on) { clearPaint(); ask(); } } });
      },
      demo() {
        const p = { t: 0 };
        last = null;
        demoTl = G.to(p, { t: 1, duration: 1.6, delay: 0.6, ease: 'power2.inOut', onUpdate: () => { const x = 0.18 + p.t * 0.55, y = 0.55 + Math.sin(p.t * Math.PI * 2) * 0.12; strokeTo(x, y); }, onComplete: () => { last = null; demoTl = null; } });
      }
    };
  }

  /* PROOF 1: the record resolves (S0184 ScrambleText digits, revealDelay 0.3); 4.9 as a ring drawn to 98 % (S0197:
     r 40, stroke 8, round cap, -90 deg); credentials rise like dominoes 0.1 s apart (S0222) */
  V.proof1 = (r, b) => {
    const nums = $$('[data-scr]', r), ring = $('.r49-v', r), ghost = $('.p1-ghost', r);
    nums.forEach(el => { const sr = d.createElement('span'); sr.className = 'sr-only'; sr.textContent = el.dataset.scr + ' '; el.before(sr); el.setAttribute('aria-hidden', 'true'); });
    if (!motionOK()) return;
    nums.forEach((el, k) => {
      const final = el.dataset.scr;
      el.textContent = final.replace(/\d/g, '0');
      G.to(el, { scrambleText: { text: final, chars: '0123456789', revealDelay: 0.3, speed: 0.5 }, duration: 1.3, delay: k * 0.12, scrollTrigger: once(el, 'top 92%') });
    });
    if (ring) G.fromTo(ring, { strokeDashoffset: () => ring.style.getPropertyValue('--c') }, { strokeDashoffset: () => ring.style.getPropertyValue('--off'), duration: 1.4, ease: ease.x, scrollTrigger: once(ring, 'top 92%') });
    G.from($$('.creds li, .p1-foot .btn-alt', r), { y: 24, autoAlpha: 0, duration: 0.6, ease: ease.out, stagger: 0.1, scrollTrigger: once($('.p1-foot', r), 'top 92%') });
    if (ghost && mqDesk.matches && ST) G.to(ghost, { yPercent: -22, ease: 'none', scrollTrigger: { trigger: r, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
  };
  /* PROOF 2: the wall of jobs is a field: tiles near the pointer lift and turn toward it, under 4 deg (S1321
     magnetic cards); credentials on an isometric plane rotateX(60) rotateZ(-45) that lift on hover (S0222) */
  V.proof2 = (r, b) => {
    const tiles = $$('.wt', r).filter(t => t.offsetParent !== null), wall = $('.wall', r);
    if (motionOK()) {
      G.from(tiles, { autoAlpha: 0, scale: 0.9, duration: 0.7, ease: ease.out, stagger: { each: 0.014, from: 'center', grid: 'auto' }, scrollTrigger: once(r, 'top 75%') });
      G.from($$('.creds-iso li', r), { y: -40, autoAlpha: 0, duration: 0.6, ease: ease.out, stagger: 0.1, scrollTrigger: once($('.cred-iso', r), 'top 90%') });
    }
    if (!mqFine.matches || !motionOK()) return;
    const Q = tiles.map(t => ({ t, rx: G.quickTo(t, 'rotationX', { duration: 0.5, ease: 'power3' }), ry: G.quickTo(t, 'rotationY', { duration: 0.5, ease: 'power3' }), z: G.quickTo(t, 'z', { duration: 0.5, ease: 'power3' }) }));
    let rects = [];
    const measure = () => { rects = Q.map(q => { const rc = q.t.getBoundingClientRect(); return [rc.left + rc.width / 2, rc.top + rc.height / 2]; }); };
    let raf = 0, px = 0, py = 0;
    b.on(wall, 'pointerenter', measure);
    b.on(wall, 'pointermove', e => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(() => { raf = 0; Q.forEach((q, i) => { const [cx, cy] = rects[i] || [0, 0]; const dx = px - cx, dy = py - cy, k = Math.max(0, 1 - Math.hypot(dx, dy) / 280); q.ry(clamp(dx / 280, -1, 1) * 4 * k); q.rx(clamp(-dy / 280, -1, 1) * 4 * k); q.z(36 * k); }); }); });
    b.on(wall, 'pointerleave', () => Q.forEach(q => { q.rx(0); q.ry(0); q.z(0); }));
    b.on(window, 'scroll', () => { rects = []; }, { passive: true });
    b.add(() => cancelAnimationFrame(raf));
  };
  /* PROOF 3: one sentence lit word by word on scroll (S1327), then the credentials press in like stamps */
  V.proof3 = (r, b) => {
    const p = $('.statement', r);
    if (!motionOK()) return;
    const walker = d.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => { const f = d.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(t => { if (!t) return; if (/^\s+$/.test(t)) f.appendChild(d.createTextNode(t)); else { const s = d.createElement('span'); s.className = 't'; s.textContent = t; f.appendChild(s); } }); n.replaceWith(f); });
    G.fromTo($$('.t, .ipill', p), { opacity: 0.18 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 50%', scrub: 0.4 } });
    G.from($$('.creds-stamp li', r), { scale: 1.5, rotation: -6, autoAlpha: 0, duration: 0.32, ease: 'power4.out', stagger: 0.12, scrollTrigger: once($('.stamps', r), 'top 88%') });
  };
  /* SERVICES 1: point at the house. Each part of the traced Rob Roy elevation opens its trade; the part becomes the
     one lit red part and the rest steps down (S0526 selection). Hover previews, press commits; the radio buttons are
     the DOM mirror of every hit area (S1334, 44 px). */
  V.services1 = (r, b) => {
    const svg = $('.pt-el', r), card = $('.pt-card', r), D = JSON.parse($('.pt-data', r).textContent), seg = $('.pt-parts', r);
    const out = k => $(`[data-pt="${k}"]`, card), book = $('.pt-book', card);
    let committed = 'siding', shown = '';
    const show = (part, anim) => {
      const d0 = D[part]; if (!d0 || part === shown) return;
      shown = part;
      svg.dataset.on = part;
      $$('[data-part]', svg).forEach(g => g.classList.toggle('is-on', g.dataset.part === part));
      out('trade').textContent = d0.trade; out('med').textContent = d0.med; out('cnt').textContent = d0.cnt;
      const ex = out('extra'); ex.hidden = !d0.extra; ex.textContent = d0.extra;
      const im = out('img'), ph = im.parentElement;
      if (d0.img) { im.src = d0.img; im.alt = d0.cap; ph.hidden = false; if (window.__apAsset) window.__apAsset(ph); } else ph.hidden = true;
      book.dataset.trade = d0.trade; book.textContent = `Book a ${d0.trade.toLowerCase()} inspection`;
      if (anim && motionOK()) {
        G.fromTo([out('trade'), out('med')], { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: ease.out, stagger: 0.05, overwrite: true });
        if (window.DrawSVGPlugin) G.fromTo($$(`g[data-part="${part}"] path`, svg), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.inOut', stagger: 0.01, overwrite: true });
      }
    };
    const pick = radios(seg, b, it => { committed = it.dataset.part; show(committed, true); });
    $$('[data-hit]', svg).forEach(h => {
      b.on(h, 'pointerenter', e => { if (e.pointerType === 'mouse') show(h.dataset.hit, true); });
      b.on(h, 'click', () => { const it = $(`[data-part="${h.dataset.hit}"]`, seg); if (it) pick(it, false); });
    });
    b.on(svg, 'pointerleave', e => { if (e.pointerType === 'mouse') show(committed, true); });
    show('siding', false);
    if (motionOK() && window.DrawSVGPlugin) G.from($$('[data-g] path', svg), { drawSVG: '0%', duration: 0.9, ease: 'power2.inOut', stagger: 0.004, scrollTrigger: once(svg, 'top 80%') });
  };

  /* SERVICES 2: the index. Trade names answer the cursor on Mona Sans's weight and width axes, letter by letter
     (S0184 split + variable axes); a photo follows the pointer (S1321 hover: zoom 1 to 1.06 in 0.7 s). */
  V.services2 = (r, b) => {
    const list = $('.ix', r), rows = $$('.ix-row', r);
    if (motionOK()) G.from(rows, { yPercent: 40, autoAlpha: 0, duration: 0.7, ease: ease.out, stagger: 0.04, scrollTrigger: once(list, 'top 85%') });
    if (!(mqFine.matches && mqDesk.matches) || !G || !motionOK()) return;
    const names = $$('[data-chars]', r);
    names.forEach(n => {
      if (n.dataset.done) return;
      n.dataset.done = '1';
      n.innerHTML = [...n.textContent].map(c => c === ' ' ? ' ' : `<span class="ch" aria-hidden="true">${esc(c)}</span>`).join('');
    });
    let raf = 0, px = -999, py = -999;
    const chars = () => $$('.ch', list);
    const field = () => { raf = 0; chars().forEach(ch => { const rc = ch.getBoundingClientRect(); const k = Math.max(0, 1 - Math.hypot(px - (rc.left + rc.width / 2), py - (rc.top + rc.height / 2)) / 150); ch.style.setProperty('--k', k.toFixed(3)); }); };
    b.on(list, 'pointermove', e => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(field); });
    b.on(list, 'pointerleave', () => { px = py = -999; if (!raf) raf = requestAnimationFrame(field); });
    b.add(() => cancelAnimationFrame(raf));
    const peek = $('.ix-peek', r), pim = $('img', peek);
    const qx = G.quickTo(peek, 'x', { duration: 0.45, ease: 'power3' }), qy = G.quickTo(peek, 'y', { duration: 0.45, ease: 'power3' });
    let src = '';
    b.on(list, 'pointermove', e => { const rc = r.getBoundingClientRect(); qx(e.clientX - rc.left + 28); qy(e.clientY - rc.top - peek.offsetHeight * 0.5); });
    rows.forEach(row => b.on(row, 'pointerenter', () => {
      const s = row.dataset.img;
      if (!s) { G.to(peek, { autoAlpha: 0, duration: 0.2 }); return; }
      if (s !== src) { pim.src = window.__apUrl ? window.__apUrl(s) : s; src = s; }
      G.fromTo(pim, { scale: 1 }, { scale: 1.06, duration: 0.7, ease: ease.out });
      G.to(peek, { autoAlpha: 1, scale: 1, duration: 0.3, ease: ease.out });
    }));
    b.on(list, 'pointerleave', () => G.to(peek, { autoAlpha: 0, scale: 0.96, duration: 0.2 }));
  };

  /* SERVICES 3: a tape measure from $0 to $50k. Pull it (Draggable x with Inertia, snapping to $500, S0184; edge
     resistance 0.85), keys step $500 (Shift $5,000); trades whose middle half covers the mark light up. */
  V.services3 = (r, b) => {
    const tape = $('.tape', r), strip = $('.tape-strip', r), band = $('.tape-band', r), list = $('.tm-list', r), rows = $$('.tm-t', r);
    const vOut = $('[data-tm-v]', r), nOut = $('[data-tm-n]', r);
    const PX = () => strip.offsetWidth / 50;
    const xOf = v => band.clientWidth / 2 - v / 1000 * PX();
    const vOf = x => clamp((band.clientWidth / 2 - x) / PX() * 1000, 0, 50000);
    let val = 15000;
    const upd = v => {
      val = Math.round(v / 500) * 500;
      const f = usd.format(val); vOut.textContent = f;
      tape.setAttribute('aria-valuenow', val); tape.setAttribute('aria-valuetext', f);
      list.style.setProperty('--v', (val / 50000).toFixed(4));
      let n = 0; rows.forEach(rw => { const on = val >= +rw.dataset.lo * 1000 && val <= +rw.dataset.hi * 1000; rw.classList.toggle('is-on', on); if (on) n++; });
      nOut.textContent = n === 1 ? `1 of ${rows.length} trades usually lands here.` : `${n} of ${rows.length} trades usually land here.`;
    };
    let drag = null;
    if (window.Draggable) {
      drag = window.Draggable.create(strip, {
        type: 'x', edgeResistance: 0.85, inertia: !!window.InertiaPlugin && motionOK(), zIndexBoost: false,
        bounds: { minX: xOf(50000), maxX: xOf(0) },
        snap: x => xOf(Math.round(vOf(x) / 500) * 500),
        onDrag() { upd(vOf(this.x)); }, onThrowUpdate() { upd(vOf(this.x)); }, onDragEnd() { upd(vOf(this.x)); }
      })[0];
      b.add(() => drag.kill());
    }
    const setV = (v, anim) => {
      v = clamp(v, 0, 50000);
      if (anim && motionOK()) G.to(strip, { x: xOf(v), duration: 0.35, ease: ease.out, overwrite: true, onUpdate: () => upd(vOf(G.getProperty(strip, 'x'))), onComplete: () => drag && drag.update() });
      else { G.set(strip, { x: xOf(v) }); upd(v); if (drag) drag.update(); }
    };
    b.on(tape, 'keydown', e => {
      const st = e.shiftKey ? 5000 : 500, m = { ArrowRight: st, ArrowUp: st, ArrowLeft: -st, ArrowDown: -st };
      if (e.key in m) { e.preventDefault(); setV(val + m[e.key], true); }
      else if (e.key === 'Home') { e.preventDefault(); setV(0, true); }
      else if (e.key === 'End') { e.preventDefault(); setV(50000, true); }
    });
    b.ro(band, () => { if (drag) drag.applyBounds({ minX: xOf(50000), maxX: xOf(0) }); setV(val); });
    setV(15000);
    if (motionOK()) { const o = { v: 0 }; G.to(o, { v: 15000, duration: 1.6, ease: ease.x, scrollTrigger: once(tape, 'top 85%'), onStart: () => setV(0), onUpdate: () => setV(o.v) }); }
  };
  /* WORK 1: drag the divider; a flick past 300 px/s or a release 50 px from an edge commits to that side (S0197);
     arrows step 5 % (Shift 10 %); pairs change through the logo window panes. */
  V.work1 = (r, b) => {
    const fig = $('.cmp', r), A = $('.cmp-a', fig), B = $('.cmp-b', fig), h = $('.cmp-handle', fig), info = $('.cmp-info', r);
    const P = JSON.parse($('.pairs-data', r).textContent);
    const panes = $$('.pane', fig);
    const st = { v: 50 };
    const set = v => { st.v = clamp(v, 0, 100); fig.style.setProperty('--split', st.v + '%'); h.setAttribute('aria-valuenow', Math.round(st.v)); h.setAttribute('aria-valuetext', `${Math.round(st.v)}% of the before photo showing`); };
    const toX = e => { const rc = fig.getBoundingClientRect(); return (e.clientX - rc.left) / rc.width * 100; };
    let vx = 0, lx = 0, lt = 0;
    hdrag(fig, b, {
      handle: '.cmp-handle',
      onStart: e => { G && G.killTweensOf(st); lx = e.clientX; lt = performance.now(); vx = 0; },
      onMove: e => { const t = performance.now(), dt = Math.max(1, t - lt); vx = (e.clientX - lx) / dt * 1000; lx = e.clientX; lt = t; set(toX(e)); },
      onEnd: () => {
        const w = fig.getBoundingClientRect().width, edge = 50 / w * 100;
        let to = null;
        if (Math.abs(vx) > 300) to = vx > 0 ? 100 : 0;
        else if (st.v < edge) to = 0; else if (st.v > 100 - edge) to = 100;
        if (to !== null) { if (motionOK()) G.to(st, { v: to, duration: 0.55, ease: ease.x, onUpdate: () => set(st.v) }); else set(to); }
      }
    });
    sliderKeys(h, b, () => st.v, set);
    if (motionOK()) { set(100); G.to(st, { v: 50, duration: 1.3, ease: ease.io, onUpdate: () => set(st.v), scrollTrigger: once(fig, 'top 70%') }); }
    let cur = 0, busy = false;
    const fill = p => {
      A.src = `assets/img/h/work-${p.id}-a-1000.webp`; A.alt = p.aa; B.src = `assets/img/h/work-${p.id}-b-1000.webp`; B.alt = p.ab;
      $('.cmp-price', info).textContent = p.band;
      $('.cmp-what', info).innerHTML = `<b>${esc(p.bl)}, ${esc(p.place)}</b><span>${esc(p.what)}, ${esc(p.when)}. <a class="tlink" href="${esc(p.href)}" target="_blank" rel="noopener">Job file</a></span>`;
      if (window.__apAsset) window.__apAsset(fig);
    };
    $$('.fs', r).forEach(btn => b.on(btn, 'click', () => {
      const k = +btn.dataset.i; if (k === cur || busy) return;
      $$('.fs', r).forEach(x => x.setAttribute('aria-pressed', x === btn)); cur = k;
      if (!motionOK()) { fill(P[k]); set(50); return; }
      busy = true;
      G.timeline({ onComplete: () => { busy = false; } })
        .to(panes, { scale: 1, duration: 0.42, ease: 'power4.in', stagger: 0.04 })
        .add(() => { fill(P[k]); set(50); return null; })
        .add(() => Promise.all([A, B].map(i => i.decode ? i.decode().catch(() => {}) : 0)))
        .to(panes, { scale: 0, duration: 0.6, ease: 'power4.out', stagger: 0.04 }, '+=0.12');
    }));
  };

  /* WORK 2: survey, draw, rebuild (S0468). For each job: the old house; a scan line turns it into the drawing
     (edge lines from the firm's own photo); one dimension label draws; a second scan builds the finished wall.
     Photos swap only under the drawing. Auto-advances while in view, stops for good once you pick a job. */
  V.work2 = (r, b) => {
    const P = JSON.parse($('.pairs-data', r).textContent), fig = $('.bp-fig', r);
    const B = $('.bp-b', fig), Pl = $('.bp-p', fig), A = $('.bp-a', fig), dim = $('.bp-dim', fig), dimT = $('[data-bp-dim]', fig);
    const kEl = $('[data-bp-k]', r), nmEl = $('[data-bp-name]', r), fxEl = $('[data-bp-fix]', r), tabs = $$('.bp-step', r);
    let i = 0, tl = null, next = null, auto = true, seen = false;
    const S = { a: 0, c: 0, s: 0 };
    const paint = () => { fig.style.setProperty('--s1', S.a + '%'); fig.style.setProperty('--s2', S.c + '%'); fig.style.setProperty('--scan', S.s + '%'); };
    const load = k => {
      const p = P[k];
      B.src = `assets/img/h/work-${p.id}-b-1000.webp`; B.alt = p.ab; Pl.src = `assets/img/h/bp-${p.id}-1000.webp`;
      A.src = `assets/img/h/work-${p.id}-a-1000.webp`; A.alt = p.aa;
      if (window.__apAsset) window.__apAsset(fig);
      dimT.textContent = `${p.bl} · ${p.band}`.toUpperCase();
      kEl.textContent = '0' + (k + 1); nmEl.textContent = p.place; fxEl.textContent = `${p.what}, ${p.when}. ${p.bl} ${p.band}.`;
      tabs.forEach((t, n) => { t.setAttribute('aria-checked', n === k); t.tabIndex = n === k ? 0 : -1; });
    };
    const play = k => {
      if (tl) tl.kill(); if (next) next.kill();
      i = k;
      if (!motionOK()) { load(k); S.a = 100; S.c = 100; S.s = 0; paint(); return; }
      const K = 1.4;   // S0468: everything plays 1.4x slower than its authored seconds
      tl = G.timeline({ onComplete: () => { if (auto && seen) next = G.delayedCall(2.2, () => play((i + 1) % P.length)); } })
        .add(() => { S.a = 0; S.c = 0; S.s = 0; paint(); load(k); G.set(dim, { autoAlpha: 0 }); })
        .to({}, { duration: 0.6 })
        .to(S, { a: 100, s: 100, duration: 0.8 * K, ease: 'power1.inOut', onUpdate: paint })
        .to(dim, { autoAlpha: 1, duration: 0.4 }, '+=0.1')
        .add(() => { S.s = 0; paint(); }, '+=0.5')
        .to(S, { c: 100, s: 100, duration: 0.8 * K, ease: 'power1.inOut', onUpdate: paint })
        .to(dim, { autoAlpha: 0, duration: 0.35 }, '-=0.3')
        .add(() => { S.s = 0; paint(); });
    };
    const takeOver = k => { auto = false; play(k); };
    radios($('.bp-steps', r), b, it => takeOver(+it.dataset.k), '.bp-step');
    b.io(fig, ([en]) => { seen = en.isIntersecting; if (seen && !tl) play(0); else if (!seen && next) { next.kill(); next = null; } else if (seen && tl && !tl.isActive() && auto && !next) next = G.delayedCall(1.2, () => play((i + 1) % P.length)); }, { threshold: 0.35 });
    b.add(() => { if (tl) tl.kill(); if (next) next.kill(); });
    load(0); S.a = motionOK() ? 0 : 100; S.c = motionOK() ? 0 : 100; paint();
  };
  V.work3 = (r, b) => {
    $$('.sp-fig', r).forEach(fig => {
      const btn = $('.sp-toggle', fig);
      b.on(btn, 'click', () => { const on = fig.classList.toggle('is-before'); btn.setAttribute('aria-pressed', on); btn.textContent = on ? 'Show after' : 'Show before'; });
      if (!mqFine.matches) return;
      let tx = 0, ty = 0, x = 0, y = 0, tr = 0, rr = 0, raf = 0;
      const R = () => Math.min(260, Math.max(140, fig.clientWidth * 0.22));
      const loop = () => {
        const k1 = motionOK() ? 0.1 : 1, k2 = motionOK() ? 0.14 : 1;
        x += (tx - x) * k1; y += (ty - y) * k1; rr += (tr - rr) * k2;
        fig.style.setProperty('--x', x.toFixed(1) + 'px'); fig.style.setProperty('--y', y.toFixed(1) + 'px'); fig.style.setProperty('--r', rr.toFixed(1) + 'px');
        raf = (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 || Math.abs(tr - rr) > 0.1) ? requestAnimationFrame(loop) : 0;
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
      const move = e => { const rc = fig.getBoundingClientRect(); tx = e.clientX - rc.left; ty = e.clientY - rc.top; if (rr < 0.5) { x = tx; y = ty; } tr = R(); kick(); };
      b.on(fig, 'pointerenter', move); b.on(fig, 'pointermove', move);
      ['pointerleave', 'pointercancel'].forEach(ev => b.on(fig, ev, () => { tr = 0; kick(); }));
      b.on(window, 'blur', () => { tr = 0; kick(); });
      b.add(() => cancelAnimationFrame(raf));
    });
    if (motionOK()) G.from($$('.sp', r), { y: 40, autoAlpha: 0, duration: 0.8, ease: ease.out, stagger: 0.08, scrollTrigger: { trigger: $('.spots', r), start: 'top 80%', once: true } });
  };

  /* BUILT 1: the wall, taken apart (S0526 exploded view): one spring per layer, stiffness 64, drag 14.2, 4 sub-steps,
     35 ms stagger, outermost leaves first and closes last; the selected layer is the one lit part, the rest step
     down; idle tour after 1.4 s in view, resumes 3.6 s after the last input; transforms removed at rest. */
  V.built1 = (r, b) => {
    const svg = $('svg.iso', r), asm = $$('.asm', svg), btns = $$('.lg-b', r), ex = $('[data-explode]', r), read = $('[data-readout]', r);
    const R = JSON.parse($('.b1x-data', r).textContent), ORDER = ['trim', 'siding', 'wrap', 'sheath', 'studs'];
    const sp = {};
    asm.forEach(g => { sp[g.dataset.asm] = { x: 0, v: 0, t: 0, at: 0, el: g, mx: +g.dataset.mx, my: +g.dataset.my }; });
    let apart = false, clock = 0, raf = 0, last = 0, sel = '', tour = null, idle = null;
    const write = s => { if (Math.abs(s.x) < 1e-4) s.el.removeAttribute('transform'); else s.el.setAttribute('transform', `translate(${(s.mx * s.x).toFixed(2)} ${(s.my * s.x).toFixed(2)})`); };
    const tick = now => {
      const dt = last ? Math.min(1 / 30, (now - last) / 1000) : 1 / 60; last = now; clock += dt;
      let moving = false;
      Object.values(sp).forEach(s => {
        const tgt = clock >= s.at ? s.t : s.x;
        const h = dt / 4;
        for (let k = 0; k < 4; k++) { const a = 64 * (tgt - s.x) - 14.2 * s.v; s.v += a * h; s.x += s.v * h; }
        if (Math.abs(tgt - s.x) < 1e-4 && Math.abs(s.v) < 1e-4 && clock >= s.at) { s.x = tgt; s.v = 0; } else moving = true;
        write(s);
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
      if (!moving) last = 0;
    };
    const kick = () => { if (!raf) { last = 0; raf = requestAnimationFrame(tick); } };
    const say = () => { read.textContent = sel ? R[sel] : (apart ? 'Apart · 5 layers' : 'Assembled · 5 layers'); };
    const go = on => {
      apart = on;
      ex.setAttribute('aria-pressed', on); ex.textContent = on ? 'Put it back together' : 'Take it apart';
      (on ? ORDER : ORDER.slice().reverse()).forEach((k, n) => { sp[k].t = on ? 1 : 0; sp[k].at = clock + n * 0.035; });
      if (!motionOK()) { Object.values(sp).forEach(s => { s.x = s.t; s.v = 0; write(s); }); } else kick();
      say();
    };
    const select = k => {
      sel = k;
      svg.toggleAttribute('data-focus', !!k);
      asm.forEach(g => g.toggleAttribute('data-on', g.dataset.asm === k));
      btns.forEach(x => x.setAttribute('aria-pressed', x.dataset.asm === k));
      say();
    };
    const stopTour = () => { if (tour) { tour.kill(); tour = null; } if (idle) { idle.kill(); idle = null; } if (motionOK()) idle = G.delayedCall(3.6, startTour); };
    function startTour() {
      if (!motionOK()) return;
      tour = G.timeline({ repeat: -1, repeatDelay: 1.2 })
        .add(() => go(true)).add(() => select('siding'), '+=1.2').add(() => select('wrap'), '+=1.6').add(() => select('sheath'), '+=1.6')
        .add(() => select(''), '+=1.6').add(() => go(false), '+=0.3');
    }
    btns.forEach(x => b.on(x, 'click', () => { stopTour(); const k = x.dataset.asm; if (!apart) go(true); select(sel === k ? '' : k); }));
    b.on(ex, 'click', () => { stopTour(); go(!apart); if (!apart) select(''); });
    asm.forEach(g => {
      b.on(g, 'pointerenter', e => { if (e.pointerType !== 'mouse' || !apart) return; stopTour(); select(g.dataset.asm); });
      b.on(g, 'click', () => { stopTour(); if (!apart) go(true); select(g.dataset.asm); });
    });
    b.io(svg, ([en]) => { if (en.isIntersecting && !tour && !idle && motionOK()) idle = G.delayedCall(1.4, startTour); else if (!en.isIntersecting) { if (tour) { tour.kill(); tour = null; } if (idle) { idle.kill(); idle = null; } } }, { rootMargin: '120px 0px' });
    b.add(() => { cancelAnimationFrame(raf); if (tour) tour.kill(); if (idle) idle.kill(); });
    if (motionOK()) G.from(asm.slice().reverse(), { y: -30, autoAlpha: 0, duration: 0.7, ease: ease.out, stagger: 0.09, scrollTrigger: once(svg, 'top 80%') });
  };

  /* BUILT 2: a window drawn in one line that answers the pointer (S0425 hairline): pointer x tilts the sash out,
     pointer y draws the 3/4 in glass unit out of it; the read-out under it names what you see; no labels on lines.
     Follow by exponential easing, tau 0.18 s (S0526); one range is the keyboard and touch path; tour of 3 stops. */
  V.built2 = (r, b) => {
    const svg = $('svg.hw', r), fig = $('.b2x-fig', r), rng = $('[data-hw-range]', r), playBtn = $('[data-hw-play]', r), read = $('[data-hw-read]', r);
    const NS = 'http://www.w3.org/2000/svg';
    const k = 7.2, ox = 214, oy = 438;
    const P = (x, y, z) => [ox + k * (0.94 * x - 0.34 * y), oy + k * (0.17 * x + 0.47 * y - z)];
    const path = cls => { const p = d.createElementNS(NS, 'path'); p.setAttribute('class', cls); svg.appendChild(p); return p; };
    const ring = pts => 'M' + pts.map(p => p.map(v => v.toFixed(1)).join(' ')).join('L') + 'Z';
    const W = 32, HH = 50, FD = 3.25, FW = 2.6;    // FD: the published 3-1/4 in frame depth; outer size is a schematic
    const els = { back: path('hw-f'), side: path('hw-s'), front: path('hw-f hw-fr'), open: path('hw-l'), upper: path('hw-l'), sash: path('hw-f hw-sash'), sashIn: path('hw-l'), g1: path('hw-g'), g2: path('hw-g hw-g2') };
    const st = { t: 0, g: 0 }, tg = { t: 0, g: 0 };
    let last = 0, raf = 0, tour = null;
    const draw = () => {
      // frame: back ring, the visible depth side, front ring with its opening
      els.back.setAttribute('d', ring([P(0, 0, 0), P(W, 0, 0), P(W, 0, HH), P(0, 0, HH)]));
      els.side.setAttribute('d', ring([P(W, 0, 0), P(W, FD, 0), P(W, FD, HH), P(W, 0, HH)]) + ring([P(0, FD, HH), P(W, FD, HH), P(W, 0, HH), P(0, 0, HH)]));
      els.front.setAttribute('d', ring([P(0, FD, 0), P(W, FD, 0), P(W, FD, HH), P(0, FD, HH)]) + ring([P(FW, FD, FW), P(W - FW, FD, FW), P(W - FW, FD, HH - FW), P(FW, FD, HH - FW)]));
      els.upper.setAttribute('d', ring([P(FW + 1, FD - 1.2, HH / 2), P(W - FW - 1, FD - 1.2, HH / 2), P(W - FW - 1, FD - 1.2, HH - FW - 1), P(FW + 1, FD - 1.2, HH - FW - 1)]));
      // lower sash: hinged at its bottom edge, tilting out toward you by angle th
      const th = st.t * 42 * Math.PI / 180, ys = FD - 0.6, z0 = FW, h = HH / 2 - FW + 0.6;
      const S = (x, zz, dy = 0) => P(x, ys + dy + zz * Math.sin(th), z0 + zz * Math.cos(th));
      const sw = 2.2;
      els.sash.setAttribute('d', ring([S(FW, 0), S(W - FW, 0), S(W - FW, h), S(FW, h)]));
      els.sashIn.setAttribute('d', ring([S(FW + sw, sw), S(W - FW - sw, sw), S(W - FW - sw, h - sw), S(FW + sw, h - sw)]));
      // the dual-pane unit, 3/4 in overall (published), drawn as two panes that slide out of the sash along its normal
      const out = st.g * 9, nx = Math.sin(th), nz = Math.cos(th);
      const G2 = (x, zz, off) => P(x, ys + zz * nx + off * nz * 1 + 0, z0 + zz * nz - off * nx);
      const pane = off => ring([G2(FW + sw, sw, off), G2(W - FW - sw, sw, off), G2(W - FW - sw, h - sw, off), G2(FW + sw, h - sw, off)]);
      els.g1.setAttribute('d', pane(out));
      els.g2.setAttribute('d', pane(out + 0.75));
    };
    const words = () => {
      const t = Math.round(st.t * 42);
      return st.g > 0.5 ? `Glass unit out of the sash · 3/4 in dual-pane` : t > 3 ? `Sash tilted out ${t} degrees · 3-1/4 in multi-chambered vinyl frame` : `Closed · 3-1/4 in multi-chambered vinyl frame · 3/4 in dual-pane glass`;
    };
    let said = '';
    const tick = now => {
      const dt = last ? Math.min(1 / 30, (now - last) / 1000) : 1 / 60; last = now;
      const a = motionOK() ? 1 - Math.exp(-dt / 0.18) : 1;
      st.t += (tg.t - st.t) * a; st.g += (tg.g - st.g) * a;
      draw();
      const w = words(); if (w !== said) { said = w; read.textContent = w; }
      const moving = Math.abs(tg.t - st.t) > 1e-3 || Math.abs(tg.g - st.g) > 1e-3;
      raf = moving ? requestAnimationFrame(tick) : 0; if (!moving) last = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const fromRange = v => { tg.t = clamp(v / 60, 0, 1); tg.g = clamp((v - 60) / 40, 0, 1); kick(); };
    const toRange = () => Math.round(tg.g > 0 ? 60 + tg.g * 40 : tg.t * 60);
    const stopTour = () => { if (tour) { tour.kill(); tour = null; } };
    b.on(rng, 'input', () => { stopTour(); fromRange(+rng.value); rng.setAttribute('aria-valuetext', words()); });
    if (mqFine.matches) {
      b.on(fig, 'pointermove', e => { if (e.pointerType !== 'mouse') return; stopTour(); const rc = fig.getBoundingClientRect(); tg.t = clamp((e.clientX - rc.left) / rc.width * 1.3 - 0.15, 0, 1); tg.g = clamp(((e.clientY - rc.top) / rc.height - 0.35) / 0.5, 0, 1) * (tg.t > 0.55 ? 1 : 0); rng.value = toRange(); kick(); });
      b.on(fig, 'pointerleave', () => { tg.t = 0; tg.g = 0; rng.value = 0; kick(); });
    }
    b.on(playBtn, 'click', () => {
      stopTour();
      const stops = [[0.55, 0], [1, 0], [1, 1], [0, 0]];
      tour = G.timeline();
      stops.forEach(([t, g], n) => tour.add(() => { tg.t = t; tg.g = g; rng.value = toRange(); kick(); }, n ? '+=1.6' : 0));
    });
    b.add(() => { cancelAnimationFrame(raf); stopTour(); });
    draw(); read.textContent = said = words();
    if (motionOK() && window.DrawSVGPlugin) G.from($$('path', svg), { drawSVG: '0%', duration: 1.1, ease: 'power2.inOut', stagger: 0.08, scrollTrigger: once(svg, 'top 82%') });
  };

  /* BUILT 3: the dimensioned sheet (S0361) with a split spec panel (S1361): lap or board and batten swap by a
     MorphSVG of one outline (S0184, 0.8 s power2.inOut); a spec row in focus or under the pointer turns its
     dimension red and draws it again (accent only on the active detail). */
  V.built3 = (r, b) => {
    const svg = $('svg.sheet', r), morph = $('.sh-morph', svg), lap = $('.sh-lap', svg), bb = $('.sh-bb', svg), rows = $$('.spec-r', r);
    const setStyle = (style, anim) => {
      lap.toggleAttribute('hidden', style !== 'lap'); bb.toggleAttribute('hidden', style !== 'bb');
      rows.forEach(rw => { rw.hidden = rw.dataset.set !== style; });
      const to = style === 'lap' ? morph.dataset.lap : morph.dataset.bb;
      if (anim && motionOK() && window.MorphSVGPlugin) G.to(morph, { morphSVG: { shape: to, type: 'linear', map: 'position' }, duration: 0.8, ease: 'power2.inOut', overwrite: true });
      else morph.setAttribute('d', to);
      if (anim && motionOK()) G.from($$('.dim, .xl, .cl, .vt, .vs, .sh-face', style === 'lap' ? lap : bb), { autoAlpha: 0, duration: 0.4, stagger: 0.03, delay: 0.5 });
    };
    radios($('.b3x-seg', r), b, it => setStyle(it.dataset.style, true));
    const hi = (code, on) => {
      $$(`.dim[data-code="${code}"]`, svg).forEach(dm => { dm.classList.toggle('on', on); if (on && motionOK() && window.DrawSVGPlugin) G.fromTo($$('path', dm), { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 0.45, ease: 'power2.out', overwrite: true }); });
      rows.forEach(rw => rw.classList.toggle('on', on && rw.dataset.code === code));
    };
    rows.forEach(rw => { ['pointerenter', 'focus'].forEach(ev => b.on(rw, ev, () => hi(rw.dataset.code, true))); ['pointerleave', 'blur'].forEach(ev => b.on(rw, ev, () => hi(rw.dataset.code, false))); });
    if (motionOK() && window.DrawSVGPlugin) G.from($$('.sh-lap path, .sh-morph', svg), { drawSVG: '0%', duration: 0.9, ease: 'power2.inOut', stagger: 0.02, scrollTrigger: once(svg, 'top 82%') });
  };

  /* COLOUR: one studio engine over the photo-traced masks (S0006: masks from the photo, never polygons) */
  function Studio(frame) {
    const zones = Object.fromEntries($$('.zone', frame).map(z => [z.dataset.zone, z]));
    const state = {};
    function paint(zone, hex, how = {}) {
      const z = zones[zone]; if (!z) return;
      const p0 = $('.p0', z), p1 = $('.p1', z);
      state[zone] = hex;
      const anim = motionOK() && G;
      const shape0 = how.x != null ? `circle(0% at ${how.x}px ${how.y}px)` : 'inset(0% 100% 0% 0%)';
      const shape1 = how.x != null ? `circle(150% at ${how.x}px ${how.y}px)` : 'inset(0% 0% 0% 0%)';
      if (!z.classList.contains('is-painted')) {
        p0.style.setProperty('--c', hex); z.classList.add('is-painted');
        if (anim) { G.killTweensOf(z); G.fromTo(z, { clipPath: shape0 }, { clipPath: shape1, duration: 0.7, ease: ease.io, onComplete: () => G.set(z, { clearProps: 'clipPath' }) }); }
        return;
      }
      if (!anim) { p0.style.setProperty('--c', hex); return; }
      G.killTweensOf(p1);
      p1.style.setProperty('--c', hex);
      G.fromTo(p1, { clipPath: shape0 }, { clipPath: shape1, duration: 0.6, ease: ease.io, onComplete: () => { p0.style.setProperty('--c', hex); G.set(p1, { clipPath: 'inset(0% 100% 0% 0%)' }); } });
    }
    function reset() { Object.values(zones).forEach(z => { z.classList.remove('is-painted'); if (G) G.set(z, { clearProps: 'clipPath' }); }); Object.keys(state).forEach(k => delete state[k]); }
    return { paint, reset, state, zones };
  }
  /* which painted zone lies under a point: alpha of the traced masks, trim over gable over siding */
  function zoneSampler(frame) {
    const masks = {};
    $$('.zone', frame).forEach(z => {
      const url = getComputedStyle(z).maskImage || getComputedStyle(z).webkitMaskImage || '';
      const m = url.match(/url\(["']?(.*?)["']?\)/); if (!m) return;
      const im = new Image(); im.src = m[1];
      masks[z.dataset.zone] = { im, cx: null };
    });
    return (x, y) => {
      const rc = frame.getBoundingClientRect();
      const u = (x - rc.left) / rc.width, v = (y - rc.top) / rc.height;
      if (u < 0 || v < 0 || u > 1 || v > 1) return null;
      for (const z of ['trim', 'gable', 'body']) {
        const M = masks[z]; if (!M || !M.im.complete || !M.im.naturalWidth) continue;
        if (!M.cx) { const c = d.createElement('canvas'); c.width = M.im.naturalWidth; c.height = M.im.naturalHeight; const cx = c.getContext('2d', { willReadFrequently: true }); cx.drawImage(M.im, 0, 0); M.cx = cx; }
        const px = M.cx.getImageData(Math.floor(u * (M.im.naturalWidth - 1)), Math.floor(v * (M.im.naturalHeight - 1)), 1, 1).data;
        if (px[3] > 110) return z;
      }
      return null;
    };
  }
  const ZNAME = { body: 'siding', gable: 'gable', trim: 'trim' };

  V.colour1 = (r, b) => {
    const frame = $('.st-frame', r), S = Studio(frame), now = $('.c1-now', r);
    let part = 'body';
    radios($('.seg:not(.seg-set)', r), b, it => { part = it.dataset.part; });
    const docks = $$('.dock', r);
    radios($('.seg-set', r), b, it => { docks.forEach(dk => { dk.hidden = dk.dataset.setList !== it.dataset.set; }); });
    docks.forEach(dk => {
      radios(dk, b, it => { S.paint(part, it.dataset.hex); now.innerHTML = `<b>${esc(it.dataset.name)}</b> <span>${esc(it.dataset.code)} on the ${ZNAME[part]}</span>`; });
      if (mqFine.matches && motionOK()) {
        const sws = $$('.sw', dk);
        b.on(dk, 'pointermove', e => sws.forEach(s => { const rc = s.getBoundingClientRect(); const dist = Math.abs(e.clientX - (rc.left + rc.width / 2)); G.to(s, { scale: 1 + 0.28 * Math.max(0, 1 - dist / 110), duration: 0.18, ease: ease.out, overwrite: 'auto' }); }));
        b.on(dk, 'pointerleave', () => G.to(sws, { scale: 1, duration: 0.24, ease: ease.out }));
      }
    });
    if (motionOK()) G.from(frame, { clipPath: 'inset(8% 6% 8% 6%)', duration: 1.1, ease: ease.io, scrollTrigger: { trigger: frame, start: 'top 80%', once: true } });
  };

  V.colour2 = (r, b) => {
    const frame = $('.st-frame', r), S = Studio(frame), house = $('.c2-house', r), how = $('.c2-how', r), zb = $$('[data-zone-btn]', r);
    const at = zoneSampler(frame);
    let sel = null;
    const select = chip => {
      $$('.chip-paint', r).forEach(c => c.setAttribute('aria-pressed', c === chip));
      sel = chip; zb.forEach(x => { x.disabled = !chip; });
      how.textContent = chip ? `${chip.dataset.name} picked. Tap the siding, gable or trim, or use the buttons under the photo.` : 'Drag a chip onto the siding, gable or trim. Or tap a chip, then tap the house.';
    };
    zb.forEach(x => { x.disabled = true; b.on(x, 'click', () => { if (sel) { S.paint(x.dataset.zoneBtn, sel.dataset.hex); how.textContent = `${sel.dataset.name} on the ${ZNAME[x.dataset.zoneBtn]}.`; } }); });
    const drop = (chip, x, y) => {
      const z = at(x, y);
      if (!z) { how.textContent = 'That spot is not siding, gable or trim. Try the wall.'; return false; }
      const rc = frame.getBoundingClientRect();
      S.paint(z, chip.dataset.hex, { x: x - rc.left, y: y - rc.top });
      how.textContent = `${chip.dataset.name} on the ${ZNAME[z]}.`;
      return true;
    };
    b.on(frame, 'click', e => { if (sel) drop(sel, e.clientX, e.clientY); });
    $$('.chip-paint', r).forEach(chip => {
      let ghost = null, sx = 0, sy = 0, dragging = false, pid = null;
      b.on(chip, 'pointerdown', e => { if (e.button > 0) return; sx = e.clientX; sy = e.clientY; pid = e.pointerId; dragging = false; chip.setPointerCapture(pid); });
      b.on(chip, 'pointermove', e => {
        if (e.pointerId !== pid) return;
        if (!dragging && Math.hypot(e.clientX - sx, e.clientY - sy) > 6) {
          dragging = true; ghost = d.createElement('span'); ghost.className = 'c2-ghost'; ghost.style.background = chip.dataset.hex; d.body.appendChild(ghost);
          if (motionOK()) G.from(ghost, { scale: 0.6, duration: 0.2, ease: ease.out });
        }
        if (dragging) {
          ghost.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          house.classList.toggle('is-over', !!at(e.clientX, e.clientY));
        }
      });
      const end = e => {
        if (e.pointerId !== pid) return;
        pid = null; house.classList.remove('is-over');
        if (dragging) {
          const ok = e.type === 'pointerup' && drop(chip, e.clientX, e.clientY);
          const g = ghost; ghost = null;
          if (motionOK() && g) G.to(g, { scale: ok ? 1.6 : 0.4, autoAlpha: 0, duration: 0.3, ease: ease.out, onComplete: () => g.remove() }); else if (g) g.remove();
          chip.dataset.dragged = '1'; setTimeout(() => { delete chip.dataset.dragged; }, 50);
        }
        dragging = false;
      };
      b.on(chip, 'pointerup', end); b.on(chip, 'pointercancel', end);
      b.on(chip, 'click', () => { if (chip.dataset.dragged) return; select(sel === chip ? null : chip); });
      b.add(() => { if (ghost) ghost.remove(); });
    });
    b.on($('.c2-reset', r), 'click', () => { S.reset(); select(null); });
  };

  /* COLOUR 3: turn a dial (Draggable rotation with Inertia, snapping to the 12 published Sherwin-Williams colours,
     S0184); the house repaints, the cursor carries the colour; arrows turn it one stop. */
  V.colour3 = (r, b) => {
    const frame = $('.st-frame', r), S = Studio(frame), dial = $('.dial', r), rot = $('.dial-rot', dial), segs = $$('.dial-seg', dial);
    const C = JSON.parse($('.dial-data', r).textContent), nm = $('[data-dial-name]', r), cd = $('[data-dial-code]', r), n = C.length, step = 360 / n;
    const arc = (a0, a1, r0, r1) => { const p = (a, rr) => [Math.sin(a * Math.PI / 180) * rr, -Math.cos(a * Math.PI / 180) * rr].map(v => v.toFixed(2)).join(' '); return `M${p(a0, r1)}A${r1} ${r1} 0 0 1 ${p(a1, r1)}L${p(a1, r0)}A${r0} ${r0} 0 0 0 ${p(a0, r0)}Z`; };
    segs.forEach((p, k) => p.setAttribute('d', arc(k * step - step / 2 + 1.2, k * step + step / 2 - 1.2, 58, 102)));
    let idx = -1;
    const apply = (k, paint = true) => {
      k = ((k % n) + n) % n; if (k === idx) return; idx = k;
      const c = C[k];
      if (paint) { S.paint('body', c.h); S.paint('gable', c.h); }
      nm.textContent = c.n; cd.textContent = c.c;
      dial.setAttribute('aria-valuenow', k + 1); dial.setAttribute('aria-valuetext', `${c.n}, ${c.c}`);
      segs.forEach((s, j) => s.classList.toggle('on', j === k));
      if (window.APFX) window.APFX.setPaint(c.h);
    };
    const angle = () => +G.getProperty(rot, 'rotation') || 0;
    const kOf = a => Math.round(-a / step);
    const turn = (k, anim) => { if (anim && motionOK()) G.to(rot, { rotation: -k * step, duration: 0.45, ease: ease.out, svgOrigin: '0 0', onUpdate: () => apply(kOf(angle())) }); else { G.set(rot, { rotation: -k * step, svgOrigin: '0 0' }); apply(k); } };
    G.set(rot, { rotation: -10 * step, svgOrigin: '0 0' });
    apply(10, false); nm.textContent = 'The real job'; cd.textContent = 'Turn the dial';
    if (window.Draggable) {
      const dr = window.Draggable.create(rot, { type: 'rotation', inertia: !!window.InertiaPlugin && motionOK(), snap: v => Math.round(v / step) * step,
        onDrag() { apply(kOf(this.rotation)); }, onThrowUpdate() { apply(kOf(this.rotation)); } })[0];
      b.add(() => dr.kill());
    }
    b.on(dial, 'keydown', e => {
      const m = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };
      if (e.key in m) { e.preventDefault(); turn(kOf(angle()) + m[e.key], true); }
    });
  };

  /* NEAR YOU: shared map + finder */
  function MapView(svg) {
    const pins = $$('.m-pins circle', svg), ring = $('.m-ring', svg);
    return {
      pins,
      hot(set) { pins.forEach((c, i) => { const h = set.has(i); c.classList.toggle('hot', h); c.classList.toggle('dim', set.size > 0 && !h); }); },
      ring(x, y, rad) { if (x < 0 || y < 0 || x > 566 || y > 640) { ring.classList.remove('on'); return; } ring.setAttribute('cx', x); ring.setAttribute('cy', y); ring.setAttribute('r', Math.max(10, rad)); ring.classList.add('on'); },
      clear() { pins.forEach(c => c.classList.remove('hot', 'dim')); ring.classList.remove('on'); }
    };
  }
  const placeOf = i => DATA.map.names[PINS[i][4]];
  function Finder(box, M, n, b, onPick) {
    const inp = $('input', box), list = $('.fd-list', box), out = $('.fd-out', box), clr = $('.fd-clear', box);
    const places = DATA.map.places;
    let opts = [], act = -1;
    const close = () => { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); inp.removeAttribute('aria-activedescendant'); act = -1; };
    const render = () => {
      const q = inp.value.trim().toLowerCase();
      clr.hidden = !q;
      if (q.length < 2) { close(); return; }
      opts = places.filter(p => p[0].toLowerCase().includes(q)).sort((a, z) => (a[0].toLowerCase().startsWith(q) ? 0 : 1) - (z[0].toLowerCase().startsWith(q) ? 0 : 1) || a[0].length - z[0].length).slice(0, 6);
      if (!opts.length) { close(); out.innerHTML = `<p>No place called “${esc(inp.value.trim())}” in the project file.</p><p class="fine">Try a town, like Round Rock, Cedar Park or Georgetown.</p>`; return; }
      list.innerHTML = opts.map((p, i) => { const k = p[0].toLowerCase().indexOf(q); return `<li role="option" id="${inp.id}-o${i}" aria-selected="false">${esc(p[0].slice(0, k))}<mark>${esc(p[0].slice(k, k + q.length))}</mark>${esc(p[0].slice(k + q.length))}</li>`; }).join('');
      list.hidden = false; inp.setAttribute('aria-expanded', 'true'); act = -1;
    };
    const mark = i => { $$('li', list).forEach((li, k) => li.setAttribute('aria-selected', k === i)); act = i; if (i >= 0) inp.setAttribute('aria-activedescendant', `${inp.id}-o${i}`); };
    function pick(p) {
      inp.value = p[0]; close(); clr.hidden = false;
      const [, x, y] = p;
      const near = PINS.map((q, i) => [Math.hypot(q[0] - x, q[1] - y), i]).sort((a, z) => a[0] - z[0]).slice(0, n);
      const ppm = DATA.map.ppm;
      out.innerHTML = `<p>Nearest documented jobs to ${esc(p[0])}</p><ol>${near.map(([dd, i]) => `<li><span><b>${esc(placeOf(i))}</b><br>${esc(tradesOf(PINS[i][3]))}, ${ym(PINS[i][2])}</span><span class="num">${(dd / ppm).toFixed(1)}&nbsp;mi</span></li>`).join('')}</ol>`;
      M.hot(new Set(near.map(a => a[1]))); M.ring(x, y, near[near.length - 1][0] + 6);
      if (onPick) onPick(p);
    }
    b.on(inp, 'input', render);
    b.on(inp, 'keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) render(); mark(Math.min(act + 1, opts.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); mark(Math.max(act - 1, 0)); }
      else if (e.key === 'Enter') { if (!list.hidden && opts.length) { e.preventDefault(); pick(opts[act >= 0 ? act : 0]); } }
      else if (e.key === 'Escape') close();
    });
    b.on(list, 'pointerdown', e => { const li = e.target.closest('li'); if (!li) return; e.preventDefault(); pick(opts[$$('li', list).indexOf(li)]); });
    b.on(inp, 'blur', () => setTimeout(close, 120));
    b.on(clr, 'click', () => { inp.value = ''; out.innerHTML = ''; clr.hidden = true; M.clear(); inp.focus(); });
    $$('[data-try]', box).forEach(t => b.on(t, 'click', () => { const p = places.find(q => q[0] === t.dataset.try); if (p) pick(p); }));
  }
  function tips(svg, tip, b) {
    if (!mqFine.matches) return;
    b.on(svg, 'pointerover', e => {
      const c = e.target.closest('circle[data-i]'); if (!c || c.classList.contains('off')) { tip.hidden = true; return; }
      const i = +c.dataset.i, p = PINS[i];
      tip.innerHTML = `<b>${esc(placeOf(i))}</b>${esc(tradesOf(p[3]))}, ${ym(p[2])}`;
      tip.hidden = false;
      const rc = svg.getBoundingClientRect(), cr = c.getBoundingClientRect(), host = tip.parentElement.getBoundingClientRect();
      tip.style.left = Math.min(cr.left - host.left + 12, host.width - tip.offsetWidth - 4) + 'px';
      tip.style.top = (cr.top - host.top - tip.offsetHeight - 8) + 'px';
      void rc;
    });
    b.on(svg, 'pointerleave', () => { tip.hidden = true; });
  }

  /* survey trail for the map (S1323): motes emitted by distance travelled (step about 1.4 % of the map height), at most
     14 per frame, the ring slot taken before it advances, an idle mote every 0.42 s while the pointer rests; touch
     only while dragging; one loop that stops when the last mote fades. Decorative: the map works without it. */
  function surveyTrail(fig, cv, b) {
    if (!motionOK()) return;
    const cx = cv.getContext('2d'); if (!cx) return;
    const N = 160, M = Array.from({ length: N }, () => ({ x: 0, y: 0, t: -9, s: 1 }));
    let head = 0, acc = 0, lx = null, ly = null, ex = 0, ey = 0, raf = 0, last = 0, now = 0, idle = 0, inside = false, down = false, W = 0, H = 0, dpr = 1;
    const size = () => { const rc = fig.getBoundingClientRect(); dpr = Math.min(1.5, devicePixelRatio || 1); W = rc.width; H = rc.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); };
    const spawn = (x, y, s = 1) => { const i = head; head = (head + 1) % N; const m = M[i]; m.x = x; m.y = y; m.t = now; m.s = s; };
    const frame = t => {
      const dt = last ? Math.min(1 / 30, (t - last) / 1000) : 1 / 60; last = t; now += dt;
      if (inside && lx !== null) {
        ex += (lx - ex) * (1 - Math.exp(-16 * dt)); ey += (ly - ey) * (1 - Math.exp(-16 * dt));
        idle += dt; if (idle > 0.42) { idle = 0; spawn(ex, ey, 0.6); }
      }
      cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, W, H);
      let alive = false;
      M.forEach(m => { const age = now - m.t; if (age > 2.2) return; alive = true; const u = age / 2.2; const a = (u < 0.12 ? u / 0.12 : 1 - (u - 0.12) / 0.88) * 0.9; cx.globalAlpha = a; cx.fillStyle = '#EA3C39'; cx.beginPath(); cx.arc(m.x, m.y, 1.7 * m.s * (1 + u * 0.55), 0, 6.283); cx.fill(); });
      cx.globalAlpha = 1;
      raf = (alive || inside) ? requestAnimationFrame(frame) : 0; if (!raf) last = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const move = e => {
      if (e.pointerType !== 'mouse' && !down) return;
      const rc = fig.getBoundingClientRect(), x = e.clientX - rc.left, y = e.clientY - rc.top;
      if (lx === null) { lx = ex = x; ly = ey = y; }
      const step = Math.max(4, H * 0.014), dx = x - lx, dy = y - ly, moved = Math.hypot(dx, dy);
      acc += moved; let guard = 0;
      while (acc >= step && guard++ < 14) { acc -= step; const t = moved > 1e-6 ? Math.min(1, guard * step / moved) : 0; spawn(lx + dx * t, ly + dy * t); }
      lx = x; ly = y; idle = 0; inside = true; kick();
    };
    size(); b.ro(fig, size);
    b.on(fig, 'pointermove', move);
    b.on(fig, 'pointerdown', e => { down = true; lx = null; move(e); });
    ['pointerup', 'pointercancel'].forEach(ev => b.on(fig, ev, () => { down = false; }));
    b.on(fig, 'pointerleave', () => { inside = false; lx = ly = null; acc = 0; });
    b.add(() => cancelAnimationFrame(raf));
  }
  V.near1 = (r, b) => {
    const svg = $('.map-svg', r), M = MapView(svg), cnt = $('[data-count]', r), when = $('[data-when]', r);
    Finder($('[data-finder]', r), M, 3, b);
    tips(svg, $('.m-tip', r), b);
    if (mqFine.matches) surveyTrail($('.n1-map', r), $('.n1-trail', r), b);
    if (!motionOK() || !ST) return;
    const months = Array.from(new Set(PINS.map(p => p[2])));
    M.pins.forEach(c => c.classList.add('off'));
    G.set($('.m-hq', svg), { scale: 0, transformOrigin: '50% 50%' });
    const st = { k: 0 };
    let shown = 0;
    const tl = G.timeline({ paused: true });
    tl.to($('.m-hq', svg), { scale: 1, duration: 0.5, ease: 'back.out(1.6)' })
      .to(st, { k: months.length - 1, duration: 2.8, ease: 'power1.inOut', onUpdate: () => {
        const lim = months[Math.round(st.k)];
        while (shown < PINS.length && PINS[shown][2] <= lim) { M.pins[shown].classList.remove('off'); shown++; }
        while (shown > 0 && PINS[shown - 1][2] > lim) { shown--; M.pins[shown].classList.add('off'); }
        cnt.textContent = shown; when.textContent = `jobs, Mar 2022 to ${ym(lim)}`;
      } }, 0.2);
    ST.create({ trigger: svg, start: 'top 72%', once: true, onEnter: () => tl.play() });
  };

  V.near2 = (r, b) => {
    const svg = $('.map-svg', r), M = MapView(svg), cap = $('.n2-cap', r), cities = DATA.map.cities;
    const btns = $$('.tw', r);
    const show = btn => {
      btns.forEach(x => x.setAttribute('aria-pressed', x === btn && btn.getAttribute('aria-pressed') !== 'true'));
      if (btn.getAttribute('aria-pressed') !== 'true') { M.clear(); cap.textContent = '312 photographed jobs shown'; return; }
      const ci = cities.indexOf(btn.dataset.town);
      const set = new Set(PINS.map((p, i) => p[5] === ci ? i : -1).filter(i => i >= 0));
      M.hot(set); M.ring(+btn.dataset.x, +btn.dataset.y, 26);
      const n = +$('.tw-c', btn).textContent;
      cap.textContent = `${btn.dataset.town}: ${n} documented jobs, ${set.size} of them photographed on this map`;
    };
    btns.forEach(btn => b.on(btn, 'click', () => show(btn)));
    if (motionOK()) G.from($$('.tw i', r), { scaleX: 0, duration: 0.9, ease: ease.out, stagger: 0.06, scrollTrigger: { trigger: $('.towns', r), start: 'top 80%', once: true } });
  };

  /* NEAR 3: type your area; the map frames it and a ring you drag (or arrow) sets the miles; the count of
     photographed jobs inside updates. Same Finder and map engine as the other versions, a new entry point. */
  V.near3 = (r, b) => {
    const svg = $('.map-svg', r), M = MapView(svg), fig = $('.n3-map', r), knob = $('.n3-knob', r), say = $('[data-n3-say]', r);
    const ppm = DATA.map.ppm;
    let at = null, miles = 5;
    const ringR = () => miles * ppm;
    const place = () => {
      if (!at) return;
      const rc = svg.getBoundingClientRect(), fr = fig.getBoundingClientRect(), s = rc.width / 566;
      knob.style.left = (rc.left - fr.left + (at.x + ringR()) * s) + 'px';
      knob.style.top = (rc.top - fr.top + at.y * s) + 'px';
    };
    const count = () => {
      if (!at) return;
      const inside = new Set(PINS.map((p, i) => Math.hypot(p[0] - at.x, p[1] - at.y) <= ringR() ? i : -1).filter(i => i >= 0));
      M.hot(inside); M.ring(at.x, at.y, ringR());
      knob.setAttribute('aria-valuenow', miles); knob.setAttribute('aria-valuetext', `${miles} miles`);
      say.textContent = `${inside.size} photographed jobs within ${miles} miles of ${at.name}.`;
      place();
    };
    Finder($('[data-finder]', r), M, 5, b, p => { at = { name: p[0], x: p[1], y: p[2] }; knob.hidden = false; count(); if (motionOK()) G.from(knob, { scale: 0, duration: 0.4, ease: ease.out }); });
    let drag = false;
    b.on(knob, 'pointerdown', e => { drag = true; knob.setPointerCapture(e.pointerId); });
    b.on(knob, 'pointermove', e => {
      if (!drag || !at) return;
      const rc = svg.getBoundingClientRect(), s = rc.width / 566;
      const x = (e.clientX - rc.left) / s, y = (e.clientY - rc.top) / s;
      miles = clamp(Math.round(Math.hypot(x - at.x, y - at.y) / ppm), 1, 15); count();
    });
    ['pointerup', 'pointercancel'].forEach(ev => b.on(knob, ev, () => { drag = false; }));
    b.on(knob, 'keydown', e => { const m = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }; if (e.key in m) { e.preventDefault(); miles = clamp(miles + m[e.key], 1, 15); count(); } });
    b.ro(fig, place);
  };

  /* REVIEWS */
  /* REVIEWS 1: two rows run as a marquee; their speed and lean answer how fast you scroll (scroll velocity), so
     the wall feels pushed by the page; edges fade 15/85 (S1348); a pause button (WCAG 2.2.2). */
  V.reviews1 = (r, b) => {
    const tracks = $$('.mq-track', r), mqs = $('.mqs', r), btn = $('.mq-pause', r);
    if (!motionOK()) { btn.hidden = true; return; }
    tracks.forEach((t, k) => {
      [...t.children].forEach(c => { const cl = c.cloneNode(true); cl.setAttribute('aria-hidden', 'true'); cl.setAttribute('inert', ''); t.appendChild(cl); });
      t.style.setProperty('--dur', (k ? 95 : 80) + 's'); t.classList.add('is-loop');
    });
    b.on(btn, 'click', () => { const on = !mqs.classList.contains('is-paused'); mqs.classList.toggle('is-paused', on); btn.setAttribute('aria-pressed', on); btn.textContent = on ? 'Play' : 'Pause'; });
    b.io(r, ([en]) => r.classList.toggle('is-offscreen', !en.isIntersecting), { threshold: 0.01 });
    if (!ST) return;
    const anims = () => tracks.map(t => t.getAnimations ? t.getAnimations()[0] : null).filter(Boolean);
    const skew = tracks.map(t => G.quickTo(t.parentElement, 'skewX', { duration: 0.5, ease: 'power3' }));
    const st = ST.create({ trigger: r, start: 'top bottom', end: 'bottom top', onUpdate: self => {
      if (mqs.classList.contains('is-paused')) return;
      const v = clamp(self.getVelocity() / 1200, -3, 3);
      anims().forEach(a => { a.playbackRate = 1 + Math.abs(v) * 1.6; });
      skew.forEach((q, k) => q((k ? -1 : 1) * v * 1.6));
      clearTimeout(st._t); st._t = setTimeout(() => { anims().forEach(a => { a.playbackRate = 1; }); skew.forEach(q => q(0)); }, 180);
    } });
    b.add(() => { clearTimeout(st._t); st.kill(); });
  };

  /* REVIEWS 2: one big quote; swipe it (Observer, type touch and pointer, tolerance 10, S0184) or use the arrows;
     the new quote's words rise in; the plain text goes to a polite live region. */
  V.reviews2 = (r, b) => {
    const Q = JSON.parse($('.one-data', r).textContent), q = $('.one-q', r), name = $('.one-n', r), k = $('.one-k span', r), say = $('[data-one-say]', r);
    let i = 0;
    const go = dir => {
      i = (i + dir + Q.length) % Q.length;
      q.innerHTML = `<p>“${markNames(Q[i].q)}”</p>`;
      name.innerHTML = `${esc(Q[i].n)}<span>Google review, 2026</span>`;
      k.textContent = i + 1;
      say.textContent = `Review ${i + 1} of ${Q.length}, ${Q[i].n}: ${Q[i].q}`;
      if (motionOK()) {
        const p = $('p', q);
        p.setAttribute('aria-hidden', 'true');
        G.from(splitWords(p), { xPercent: dir * 40, autoAlpha: 0, duration: 0.5, ease: ease.out, stagger: 0.012 });
        G.fromTo(name, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: ease.out, delay: 0.2, overwrite: true });
      }
    };
    $$('.rb', r).forEach(btn => b.on(btn, 'click', () => go(+btn.dataset.dir)));
    if (window.Observer) {
      const ob = window.Observer.create({ target: $('.one', r), type: 'touch,pointer', tolerance: 10, dragMinimum: 40, onLeft: () => go(1), onRight: () => go(-1) });
      b.add(() => ob.kill());
    }
  };

  /* REVIEWS 3: four cards at a time so the wall never turns into a document; "Show more" adds four */
  V.reviews3 = (r, b) => {
    const cards = $$('.nw', r), more = $('.nw-more', r), say = $('.nw-say', r), STEP = 4;
    let pool = cards, lim = STEP, who = '';
    const lay = fresh => {
      cards.forEach(c => c.classList.toggle('is-out', pool.indexOf(c) < 0 || pool.indexOf(c) >= lim));
      const shown = Math.min(lim, pool.length), left = pool.length - shown;
      more.hidden = left <= 0;
      more.textContent = `Show ${Math.min(STEP, left)} more`;
      say.textContent = `${shown} of ${pool.length} reviews${who ? ' naming ' + who : ''}`;
      if (fresh && motionOK()) G.fromTo(fresh, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: ease.out, stagger: 0.05, overwrite: true });
    };
    radios($('.names', r), b, it => {
      who = it.dataset.name;
      pool = cards.filter(c => !who || c.dataset.names.split('|').includes(who));
      lim = STEP; lay(pool.slice(0, lim));
    });
    b.on(more, 'click', () => {
      const from = lim; lim += STEP; lay(pool.slice(from, lim));
      const f = pool[from] && $('blockquote', pool[from]);
      if (f) { f.tabIndex = -1; f.focus({ preventScroll: true }); }
    });
    lay(null);
  };

  /* MONEY */
  function srSay(el, text) { clearTimeout(el._t); el._t = setTimeout(() => { el.textContent = text; }, 450); }
  V.money1 = (r, b) => {
    const inp = $('#m1-amt', r), out = $('output', r), sub = $('[data-m1-sub]', r), sr = $('[data-sr]', r);
    const odo = Odo($('[data-odo]', r));
    let apr = 0.0799, n = 120;
    const upd = () => {
      const A = +inp.value, m = pmt(A, apr, n), f = usd.format(A);
      out.textContent = f; inp.setAttribute('aria-valuetext', f);
      odo(usd2.format(m));
      sub.textContent = `${f} over ${n} months at ${apr ? (apr * 100).toFixed(2) + '%' : '0%'} APR`;
      srSay(sr, `${usd2.format(m)} a month`);
    };
    radios($('.terms', r), b, it => { apr = +it.dataset.apr; n = +it.dataset.n; upd(); });
    b.on(inp, 'input', upd);
    upd();
  };
  /* MONEY 2: tap a monthly budget; the three project sizes count up to their new values (S0197 crawl, 1.2 s) */
  V.money2 = (r, b) => {
    const cols = $$('.m2-cols li', r);
    let M = 250;
    const upd = anim => cols.forEach(li => {
      const v = Math.floor(pv(M, +li.dataset.apr, +li.dataset.n) / 100) * 100, el = $('.m2-amt', li);
      if (anim && motionOK()) { const o = { v: +el.dataset.v || 0 }; G.to(o, { v, duration: 1.2, ease: 'power3.out', overwrite: true, onUpdate: () => { el.textContent = usd.format(Math.round(o.v / 100) * 100); } }); }
      else el.textContent = usd.format(v);
      el.dataset.v = v;
    });
    radios($('.mo-chips', r), b, it => { M = +it.dataset.mo; upd(true); });
    upd(false);
    if (motionOK()) G.from(cols, { y: 30, autoAlpha: 0, duration: 0.7, ease: ease.out, stagger: 0.1, scrollTrigger: once($('.m2-cols', r), 'top 85%') });
  };
  V.money3 = (r, b) => {
    const amt = $('.rc-amt input', r), boxes = $$('input[type="checkbox"]', r), odo = Odo($('[data-odo]', r)), was = $('[data-was]', r), save = $('[data-save]', r);
    const lines = { 5: $('[data-line="5"]', r), p: $('[data-line="p"]', r) };
    const upd = () => {
      const A = Math.min(500000, +amt.value.replace(/[^\d]/g, '') || 0);
      const heroes = boxes[0].checked, full = boxes[1].checked;
      lines[5].classList.toggle('is-off', !heroes); lines.p.classList.toggle('is-off', !full);
      const pct = 10 + (heroes ? 5 : 0) + (full ? 10 : 0), price = Math.round(A * (100 - pct) / 100);
      was.textContent = usd.format(A); odo(usd.format(price)); save.textContent = usd.format(A - price);
    };
    b.on(amt, 'input', upd); b.on(amt, 'blur', () => { const v = +amt.value.replace(/[^\d]/g, '') || 0; amt.value = v.toLocaleString('en-US'); upd(); });
    boxes.forEach(x => b.on(x, 'change', upd));
    upd();
    if (motionOK()) G.from($$('.rc-h, .rc-line, .rc-tot, .rc-save', r), { clipPath: 'inset(0% 0% 100% 0%)', y: -6, duration: 0.45, ease: ease.out, stagger: 0.12, scrollTrigger: { trigger: $('.receipt', r), start: 'top 75%', once: true }, clearProps: 'clipPath' });
  };

  /* BOOK: one form engine for all three versions (S1442, S0661: validate on Continue, then live; focus first invalid) */
  function Form(form, b) {
    const steps = $$('.bk-step', form), kEl = $('.bk-k', form), k = $('.bk-k span', form), next = $('.bk-next', form), back = $('.bk-back', form), send = $('.bk-send', form), done = $('.bk-done', form);
    let i = 0;
    const err = (id, on) => { const e = $('#' + id, form) || $(`[id="${id}"]`, form); if (e) e.hidden = !on; };
    const fid = $('.bk-err', form).id.replace(/-e1$/, '');
    function valid(n, focus) {
      if (n === 0) { const ok = $$('input[name="trade"]:checked', form).length > 0; err(`${fid}-e1`, !ok); if (!ok && focus) $('input[name="trade"]', form).focus(); return ok; }
      if (n === 1) { const ok = !!$(`input[type="radio"]:checked`, form); err(`${fid}-e2`, !ok); if (!ok && focus) $('input[type="radio"]', form).focus(); return ok; }
      const f = [['name', v => v.trim().length > 0], ['tel', v => v.replace(/\D/g, '').length === 10], ['zip', v => /^\d{5}$/.test(v.trim())]];
      let first = null;
      f.forEach(([nm, test]) => { const inp = $(`input[name="${nm}"]`, form), ok = test(inp.value); inp.setAttribute('aria-invalid', !ok); err(inp.getAttribute('aria-describedby'), !ok); if (!ok && !first) first = inp; });
      if (first && focus) first.focus();
      return !first;
    }
    function shake() { if (motionOK()) G.fromTo(steps[i], { x: 0 }, { keyframes: { x: [0, -6, 6, -4, 4, 0] }, duration: 0.32, ease: 'none' }); }
    function show(n, dir) {
      steps[i].hidden = true; steps[n].hidden = false; i = n; k.textContent = n + 1;
      back.hidden = n === 0; next.hidden = n === 2; send.hidden = n !== 2;
      if (motionOK()) G.fromTo(steps[n], { x: 36 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.3, ease: ease.out, overwrite: true });
      const f = $('input', steps[n]); if (f) f.focus({ preventScroll: true });
    }
    b.on(next, 'click', () => { if (valid(i, true)) show(i + 1, 1); else shake(); });
    b.on(back, 'click', () => show(i - 1, -1));
    b.on(form, 'change', () => { if (i < 2) { const e = $$('.bk-err', steps[i])[0]; if (e && !e.hidden) valid(i, false); } });
    $$('input[name="name"], input[name="tel"], input[name="zip"]', form).forEach(inp => b.on(inp, 'input', () => { if (inp.getAttribute('aria-invalid') === 'true') valid(2, false); }));
    const tel = $('input[name="tel"]', form);
    b.on(tel, 'input', () => { const v = tel.value.replace(/\D/g, '').slice(0, 10); tel.value = v.length > 6 ? `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}` : v.length > 3 ? `(${v.slice(0, 3)}) ${v.slice(3)}` : v; });
    b.on(form, 'submit', e => {
      e.preventDefault();
      if (!valid(2, true)) { shake(); return; }
      $('[data-done-name]', form).textContent = $('input[name="name"]', form).value.trim() || 'thanks';
      steps.forEach(s => { s.hidden = true; }); [kEl, $('.bk-nav', form)].forEach(x => { x.hidden = true; });
      done.hidden = false; done.focus();
      if (motionOK()) { const p = $('path', done), L = p.getTotalLength(); G.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.55, ease: ease.out, delay: 0.1 }); G.from($$('p', done), { y: 10, autoAlpha: 0, duration: 0.4, ease: ease.out, stagger: 0.06 }); }
    });
    return trade => {
      const box = $$('input[name="trade"]', form).find(x => x.value.toLowerCase() === String(trade).toLowerCase());
      if (box) box.checked = true;
    };
  }
  /* light folds behind the call (S1364): tall bands drifting on slow sines, screen-blended so overlaps brighten,
     brightest toward the lower right, leaning toward the pointer; DPR 1.5; stops off screen; still under reduced motion */
  function folds(cv, host, b) {
    const cx = cv.getContext('2d'); if (!cx) return;
    let W = 0, H = 0, dpr = 1, raf = 0, t0 = 0, on = false, lean = 0, leanT = 0;
    const size = () => { const rc = host.getBoundingClientRect(); dpr = Math.min(1.5, devicePixelRatio || 1); W = rc.width; H = rc.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); draw(t0); };
    const BANDS = Array.from({ length: 18 }, (_, i) => ({ x: (i + 0.5) / 18, w: 0.05 + ((i * 37) % 7) / 70, ph: i * 1.7, sp: 0.06 + ((i * 13) % 5) / 90, a: 0.05 + ((i * 29) % 6) / 70 }));
    function draw(t) {
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.globalCompositeOperation = 'source-over'; cx.clearRect(0, 0, W, H);
      cx.globalCompositeOperation = 'screen';
      lean += (leanT - lean) * 0.04;
      BANDS.forEach(bd => {
        const x = (bd.x + Math.sin(t * bd.sp + bd.ph) * 0.03 + lean * 0.05 * bd.x) * W, w = bd.w * W;
        const g = cx.createLinearGradient(0, 0, 0, H);
        const near = 0.5 + 0.5 * bd.x;
        g.addColorStop(0, 'rgba(255,120,110,0)'); g.addColorStop(0.55, `rgba(255,140,120,${(bd.a * near).toFixed(3)})`); g.addColorStop(1, `rgba(255,190,170,${(bd.a * 1.6 * near).toFixed(3)})`);
        cx.fillStyle = g; cx.fillRect(x - w / 2, 0, w, H);
      });
      const rg = cx.createRadialGradient(W * 0.86, H * 0.95, 0, W * 0.86, H * 0.95, Math.max(W, H) * 0.6);
      rg.addColorStop(0, 'rgba(255,170,150,0.22)'); rg.addColorStop(1, 'rgba(255,170,150,0)');
      cx.fillStyle = rg; cx.fillRect(0, 0, W, H);
    }
    const loop = t => { t0 = t / 1000; draw(t0); raf = on ? requestAnimationFrame(loop) : 0; };
    size(); b.ro(host, size);
    if (!motionOK()) return;
    b.io(host, ([en]) => { on = en.isIntersecting && !d.hidden; if (on && !raf) raf = requestAnimationFrame(loop); }, { threshold: 0 });
    b.on(d, 'visibilitychange', () => { on = !d.hidden && on; if (on && !raf) raf = requestAnimationFrame(loop); });
    if (mqFine.matches) b.on(host, 'pointermove', e => { const rc = host.getBoundingClientRect(); leanT = (e.clientX - rc.left) / rc.width * 2 - 1; });
    b.add(() => { on = false; cancelAnimationFrame(raf); });
  }
  V.book1 = (r, b, s) => {
    const cv = $('.b1-folds', r); if (cv) folds(cv, r, b);
    const open = $('.b1-open', r), panel = $('#b1-panel', r), pre = Form($('form', r), b);
    const toggle = (on, focus) => {
      open.setAttribute('aria-expanded', on); panel.hidden = !on; open.textContent = on ? 'Hide the form' : 'Book free inspection online';
      if (on && motionOK()) G.fromTo(panel, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: ease.out, overwrite: true });
      if (on && focus) { const f = $('input', panel); if (f) f.focus({ preventScroll: true }); }
    };
    b.on(open, 'click', () => toggle(open.getAttribute('aria-expanded') !== 'true', true));
    s.api.book = trade => { if (trade) pre(trade); toggle(true, true); };
    if (motionOK()) G.from($('.b1-tel', r), { yPercent: 40, autoAlpha: 0, duration: 0.9, ease: ease.x, scrollTrigger: { trigger: r, start: 'top 70%', once: true } });
  };
  V.book2 = (r, b, s) => {
    const pre = Form($('form', r), b);
    s.api.book = trade => { if (trade) pre(trade); const f = $('input', $('form', r)); if (f) setTimeout(() => f.focus({ preventScroll: true }), 600); };
    if (motionOK()) G.from($('.b2-ph img', r), { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.08, duration: 1.1, ease: ease.io, scrollTrigger: { trigger: r, start: 'top 75%', once: true } });
  };
  V.book3 = (r, b, s) => {
    const pre = Form($('form', r), b);
    s.api.book = trade => { if (trade) pre(trade); const f = $('input', $('form', r)); if (f) setTimeout(() => f.focus({ preventScroll: true }), 600); };
  };

  /* ========================================================================================
     SECTION CONTROLLER: 1/2/3 tabs, keys, picks panel, persistence (S0067, S0082, S1246)
     ======================================================================================== */
  const SECS = $$('.sec').map(el => ({ el, key: el.dataset.sec, stage: $('.stage', el), tabs: $$('.vsw-b', el), label: $('.vsw-l span', el), names: el.dataset.names.split('|'), tpls: $$('template', el), v: 1, b: null, ctx: null, api: {}, switched: false }));
  const BY = Object.fromEntries(SECS.map(s => [s.key, s]));

  function unmount(s) {
    if (s.b) s.b.clear();
    if (s.ctx) s.ctx.revert();
    s.b = s.ctx = null; s.api = {};
  }
  function mount(s, v, initial) {
    if (!initial) {
      unmount(s);
      s.stage.replaceChildren(s.tpls[v - 1].content.cloneNode(true));
      if (window.__apAsset) window.__apAsset(s.stage);
    }
    s.v = v; s.el.dataset.v = v;
    s.tabs.forEach(t => { const on = +t.dataset.v === v; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    s.stage.setAttribute('aria-labelledby', s.tabs[v - 1].id);
    s.label.textContent = s.names[v - 1];
    const vr = s.stage.firstElementChild;
    s.b = bag();
    const run = () => { heads(vr, s); const fn = V[s.key + v]; if (fn) fn(vr, s.b, s); if (window.APFX) s.b.add(window.APFX.depth(vr)); };
    try {
      if (G) { s.ctx = G.context(() => {}); s.ctx.add(run); } else run();
    } catch (err) { console.error(s.key + v, err); }
  }
  const code = () => SECS.map(s => s.v).join('');
  const pretty = () => { const c = code(); return `${c.slice(0, 3)} ${c.slice(3, 6)} ${c.slice(6)}`; };
  function save() {
    store.set('ap-picks', code());
    try { const u = new URL(location.href); u.searchParams.set('v', code()); history.replaceState(null, '', u); } catch (e) { /* file URL or sandbox: the panel still shows the picks */ }
    syncPicks();
  }
  function switchTo(s, v, opts = {}) {
    v = clamp(v | 0, 1, 3);
    if (v === s.v) return;
    const y0 = s.el.getBoundingClientRect().top;
    s.switched = true;
    mount(s, v);
    if (ST) ST.refresh();
    jumpBy(s.el.getBoundingClientRect().top - y0);
    if (opts.focusTab) s.tabs[v - 1].focus();
    save();
  }
  SECS.forEach(s => {
    const list = $('.vsw', s.el);
    list.addEventListener('click', e => { const t = e.target.closest('.vsw-b'); if (t) switchTo(s, +t.dataset.v); });
    list.addEventListener('keydown', e => {
      const i = s.v - 1; let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % 3; else if (e.key === 'ArrowLeft') n = (i + 2) % 3; else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = 2;
      if (n !== null) { e.preventDefault(); switchTo(s, n + 1, { focusTab: true }); }
    });
  });

  /* keys 1, 2, 3 switch the section in view; never inside fields or with modifiers */
  d.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || !/^[123]$/.test(e.key)) return;
    const t = e.target;
    if (t.closest && t.closest('input, textarea, select, [contenteditable="true"], [role="slider"]')) return;
    const mid = window.innerHeight * 0.45;
    const s = SECS.find(x => { const rc = x.el.getBoundingClientRect(); return rc.top <= mid && rc.bottom >= mid; });
    if (s) { e.preventDefault(); switchTo(s, +e.key); }
  });

  /* picks panel */
  const pkBtn = $('.pk-btn'), pkPanel = $('#pk-panel'), pkCode = $('[data-pk-code]'), pkMsg = $('.pk-msg');
  function syncPicks() {
    pkCode.textContent = pretty();
    $$('.pk-seg').forEach(g => { const s = BY[g.dataset.for]; $$('button', g).forEach(x => { const on = +x.dataset.v === s.v; x.setAttribute('aria-checked', on); x.tabIndex = on ? 0 : -1; }); });
  }
  const pkOpen = on => { pkPanel.hidden = !on; pkBtn.setAttribute('aria-expanded', on); if (on) { syncPicks(); const f = $('.pk-seg [aria-checked="true"]', pkPanel); if (f) f.focus(); } };
  pkBtn.addEventListener('click', () => pkOpen(pkPanel.hidden));
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && !pkPanel.hidden) { pkOpen(false); pkBtn.focus(); } });
  d.addEventListener('pointerdown', e => { if (!pkPanel.hidden && !e.target.closest('.picks')) pkOpen(false); });
  $$('.pk-seg').forEach(g => {
    const s = BY[g.dataset.for];
    g.addEventListener('click', e => { const x = e.target.closest('button'); if (x) switchTo(s, +x.dataset.v); });
    g.addEventListener('keydown', e => {
      let n = null; const i = s.v - 1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % 3; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i + 2) % 3;
      if (n !== null) { e.preventDefault(); switchTo(s, n + 1); $(`button[data-v="${n + 1}"]`, g).focus(); }
    });
  });
  $('[data-copy]').addEventListener('click', () => {
    const text = 'My picks: ' + SECS.map(s => `${s.el.getAttribute('aria-label')} ${s.v} (${s.names[s.v - 1]})`).join(', ');
    const ok = () => { pkMsg.textContent = 'Copied. Paste it into your message.'; };
    const fallback = () => { const t = d.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0'; d.body.appendChild(t); t.select(); let done = false; try { done = d.execCommand('copy'); } catch (e) { done = false; } t.remove(); pkMsg.textContent = done ? 'Copied. Paste it into your message.' : text; };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
  });
  $('[data-reset]').addEventListener('click', () => { SECS.forEach(s => switchTo(s, 1)); pkMsg.textContent = 'Every section is back to version 1.'; });
  const motionBox = $('[data-motion]');
  motionBox.checked = motionOK();
  function remountAll() { SECS.forEach(s => { const v = s.v; s.switched = true; mount(s, v, false); }); if (ST) ST.refresh(); }
  motionBox.addEventListener('change', () => {
    userMotion = motionBox.checked ? 'on' : 'off'; store.set('ap-motion', userMotion);
    setMotionClass(); lenisSync(); syncFx(); remountAll();
    pkMsg.textContent = motionBox.checked ? 'Motion on.' : 'Motion off: every section shows its finished state.';
  });
  mqReduce.addEventListener('change', () => { if (userMotion) return; motionBox.checked = motionOK(); setMotionClass(); lenisSync(); syncFx(); remountAll(); });

  /* in-page links: smooth with Lenis, focus moves to the target (S0915); booking links can preselect a trade */
  d.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const t = id ? d.getElementById(id) : null;
    if (!t) return;
    e.preventDefault();
    closeSheet();
    goTo(t);
    t.setAttribute('tabindex', '-1');
    setTimeout(() => t.focus({ preventScroll: true }), lenis ? 900 : 50);
    if (a.hasAttribute('data-book') && BY.book && BY.book.api.book) BY.book.api.book(a.dataset.trade || '');
  });

  /* mobile menu sheet */
  const menu = $('.hd-menu'), sheet = $('#sheet');
  function closeSheet() { if (!sheet.hidden) { sheet.hidden = true; menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu'; if (lenis) lenis.start(); } }
  menu.addEventListener('click', () => {
    const on = sheet.hidden; sheet.hidden = !on; menu.setAttribute('aria-expanded', on); menu.textContent = on ? 'Close' : 'Menu';
    if (on) { const f = $('a', sheet); if (f) f.focus(); }
  });
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { closeSheet(); menu.focus(); } });

  /* boot: picks from ?v=, then saved picks, else all version 1 */
  let picks = null;
  try { picks = new URL(location.href).searchParams.get('v'); } catch (e) { picks = null; }
  if (!/^[123]{10}$/.test(picks || '')) picks = store.get('ap-picks');
  if (!/^[123]{10}$/.test(picks || '')) picks = '1111111111';
  lenisSync(); syncFx();
  SECS.forEach((s, k) => mount(s, +picks[k], +picks[k] === 1));
  syncPicks();
  if (ST) {
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => ST.refresh());
    window.addEventListener('load', () => ST.refresh());
  }
  mqDesk.addEventListener('change', () => { lenisSync(); remountAll(); });
})();
